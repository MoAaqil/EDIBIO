import { Server as SocketIOServer, Socket } from 'socket.io';
import { verifyAccessToken } from '../../utils/jwt.js';
import { User } from '../../models/User.js';
import { Meeting } from '../../models/Meeting.js';
import { Message } from '../../models/Message.js';
import { getRedis } from '../../config/redis.js';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  userName?: string;
  userAvatar?: string;
  roomId?: string;
}

export function setupSocketHandlers(io: SocketIOServer): void {
  const knockingSockets = new Map<string, { socket: AuthenticatedSocket; roomId: string; displayName: string; profileColor?: string }>();

  // Authentication middleware
  io.use(async (socket: AuthenticatedSocket, next) => {
    try {
      const token = socket.handshake.auth?.token || 
                    socket.handshake.headers?.authorization?.replace('Bearer ', '');
      
      if (token) {
        const payload = verifyAccessToken(token);
        const user = await User.findById(payload.sub).select('name avatar email');
        if (user) {
          socket.userId = user._id.toString();
          socket.userName = user.name;
          socket.userAvatar = user.avatar;
        }
      }
      next();
    } catch {
      next(); // Allow unauthenticated for now, rooms will check
    }
  });

  io.on('connection', (socket: AuthenticatedSocket) => {
    console.log(`Socket connected: ${socket.id} (user: ${socket.userId || 'anonymous'})`);

    async function proceedJoinRoom(
      targetSocket: AuthenticatedSocket, 
      roomId: string, 
      displayName: string, 
      isHostUser: boolean,
      profileColor?: string
    ) {
      targetSocket.roomId = roomId;
      await targetSocket.join(roomId);
      
      const redis = getRedis();
      const participant = {
        socketId: targetSocket.id,
        userId: targetSocket.userId,
        name: displayName,
        avatar: targetSocket.userAvatar,
        profileColor: profileColor || null,
        joinedAt: Date.now(),
        isMuted: false,
        isCameraOff: false,
        isHandRaised: false,
        isScreenSharing: false,
        isHost: isHostUser,
      };
      
      await redis.hset(`room:${roomId}:participants`, targetSocket.id, JSON.stringify(participant));
      
      const allParticipants = await redis.hgetall(`room:${roomId}:participants`);
      const participants = Object.values(allParticipants || {}).map(p => JSON.parse(p));
      
      targetSocket.to(roomId).emit('participant:joined', participant);
      targetSocket.emit('room:joined', { roomId, participants });
      
      io.to(roomId).emit('room:participants-count', participants.length);
      console.log(`User ${targetSocket.userId || 'Guest'} joined room ${roomId} (Host: ${isHostUser})`);
    }

    // ─── ROOM MANAGEMENT ──────────────────────────────────────────────
    socket.on('join-room', async (roomId: string, displayName?: string, profileColor?: string) => {
      try {
        const dbMeeting = await Meeting.findOne({ roomId });
        const isHost = socket.userId && dbMeeting && dbMeeting.hostId.toString() === socket.userId;
        
        const finalName = displayName || socket.userName || 'Guest';
        socket.userName = finalName;
        
        if (isHost) {
          // Host joins immediately
          await proceedJoinRoom(socket, roomId, finalName, true, profileColor || undefined);
          
          // Send all currently knocking users for this room to the host
          for (const [sId, knock] of knockingSockets.entries()) {
            if (knock.roomId === roomId) {
              socket.emit('participant:knocking', {
                socketId: sId,
                name: knock.displayName
              });
            }
          }
        } else {
          // Participant/Guest knocks
          knockingSockets.set(socket.id, { socket, roomId, displayName: finalName, profileColor: profileColor || undefined });
          
          // Notify the room (hosts)
          io.to(roomId).emit('participant:knocking', {
            socketId: socket.id,
            name: finalName
          });
          
          // Notify the knocking socket they are pending
          socket.emit('room:pending', { roomId });
        }
      } catch (err) {
        socket.emit('error', { message: 'Failed to join room' });
      }
    });

    socket.on('moderation:admit-participant', async (guestSocketId: string) => {
      const knock = knockingSockets.get(guestSocketId);
      if (!knock) return;
      
      const dbMeeting = await Meeting.findOne({ roomId: knock.roomId });
      const isHost = socket.userId && dbMeeting && dbMeeting.hostId.toString() === socket.userId;
      if (!isHost) return;
      
      knockingSockets.delete(guestSocketId);
      
      // Proceed with join (pass through the profileColor they chose)
      await proceedJoinRoom(knock.socket, knock.roomId, knock.displayName, false, knock.profileColor);
      knock.socket.emit('room:admitted');
    });

    socket.on('moderation:reject-participant', async (guestSocketId: string) => {
      const knock = knockingSockets.get(guestSocketId);
      if (!knock) return;
      
      const dbMeeting = await Meeting.findOne({ roomId: knock.roomId });
      const isHost = socket.userId && dbMeeting && dbMeeting.hostId.toString() === socket.userId;
      if (!isHost) return;
      
      knockingSockets.delete(guestSocketId);
      
      // Reject and disconnect
      knock.socket.emit('room:rejected');
      knock.socket.disconnect();
    });

    socket.on('leave-room', async () => {
      await handleLeaveRoom(socket, io);
    });

    // ─── CHAT ─────────────────────────────────────────────────────────
    socket.on('send-message', async (data: {
      content: string;
      type?: string;
      threadId?: string;
      fileUrl?: string;
      fileName?: string;
    }) => {
      if (!socket.roomId) return;
      
      try {
        const senderName = socket.userName || 'Guest';
        const senderAvatar = socket.userAvatar;

        const message = await Message.create({
          roomId: socket.roomId,
          userId: socket.userId || null,
          senderName: socket.userId ? null : senderName,
          content: data.content,
          type: data.type || 'text',
          threadId: data.threadId,
          fileUrl: data.fileUrl,
          fileName: data.fileName,
          twitchStyle: true,
          fadeAfterSeconds: 30,
        });
        
        if (socket.userId) {
          await message.populate('userId', 'name avatar');
        }
        
        const messageObject = message.toObject() as any;
        messageObject.senderSocketId = socket.id;
        
        if (!socket.userId) {
          messageObject.guestSender = {
            name: senderName,
            avatar: senderAvatar,
          };
        }
        
        io.to(socket.roomId).emit('message:new', messageObject);
      } catch (err) {
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    socket.on('delete-message', async (messageId: string) => {
      if (!socket.userId) return;
      try {
        const message = await Message.findById(messageId);
        if (!message) return;
        if (message.userId.toString() !== socket.userId) return;
        
        message.isDeleted = true;
        message.deletedAt = new Date();
        await message.save();
        
        io.to(socket.roomId || '').emit('message:deleted', messageId);
      } catch {}
    });

    socket.on('edit-message', async (data: { messageId: string; content: string }) => {
      if (!socket.userId) return;
      try {
        const message = await Message.findById(data.messageId);
        if (!message || message.userId.toString() !== socket.userId) return;
        
        message.content = data.content;
        message.isEdited = true;
        message.editedAt = new Date();
        await message.save();
        
        io.to(socket.roomId || '').emit('message:edited', { 
          messageId: data.messageId, 
          content: data.content,
          editedAt: message.editedAt,
        });
      } catch {}
    });

    socket.on('react-message', async (data: { messageId: string; emoji: string }) => {
      if (!socket.userId) return;
      try {
        const message = await Message.findById(data.messageId);
        if (!message) return;
        
        const existingReaction = message.reactions.find(r => r.emoji === data.emoji);
        if (existingReaction) {
          const userIdx = existingReaction.users.findIndex(
            u => u.toString() === socket.userId
          );
          if (userIdx > -1) {
            existingReaction.users.splice(userIdx, 1);
          } else {
            existingReaction.users.push(socket.userId as any);
          }
        } else {
          message.reactions.push({ emoji: data.emoji, users: [socket.userId as any] });
        }
        
        await message.save();
        io.to(socket.roomId || '').emit('message:reacted', {
          messageId: data.messageId,
          reactions: message.reactions,
        });
      } catch {}
    });

    socket.on('pin-message', async (messageId: string) => {
      if (!socket.userId) return;
      try {
        const message = await Message.findById(messageId);
        if (!message) return;
        message.isPinned = !message.isPinned;
        await message.save();
        io.to(socket.roomId || '').emit('message:pinned', { messageId, isPinned: message.isPinned });
      } catch {}
    });

    // ─── WEBRTC SIGNALING ─────────────────────────────────────────────
    socket.on('webrtc:offer', (data: { targetId: string; offer: any }) => {
      socket.to(data.targetId).emit('webrtc:offer', {
        fromId: socket.id,
        offer: data.offer,
      });
    });

    socket.on('webrtc:answer', (data: { targetId: string; answer: any }) => {
      socket.to(data.targetId).emit('webrtc:answer', {
        fromId: socket.id,
        answer: data.answer,
      });
    });

    socket.on('webrtc:ice-candidate', (data: { targetId: string; candidate: any }) => {
      socket.to(data.targetId).emit('webrtc:ice-candidate', {
        fromId: socket.id,
        candidate: data.candidate,
      });
    });

    // ─── MEDIA STATE ─────────────────────────────────────────────────
    socket.on('media:mute-toggle', async (isMuted: boolean) => {
      if (!socket.roomId) return;
      await updateParticipant(socket, { isMuted });
      socket.to(socket.roomId).emit('media:mute-changed', { socketId: socket.id, isMuted });
    });

    socket.on('media:camera-toggle', async (isCameraOff: boolean) => {
      if (!socket.roomId) return;
      await updateParticipant(socket, { isCameraOff });
      socket.to(socket.roomId).emit('media:camera-changed', { socketId: socket.id, isCameraOff });
    });

    // ─── SCREEN SHARING ───────────────────────────────────────────────
    socket.on('screen-share:start', async (data: { quality?: '1080p' | '4K' }) => {
      if (!socket.roomId) return;
      await updateParticipant(socket, { isScreenSharing: true });
      io.to(socket.roomId).emit('screen-share:started', { 
        socketId: socket.id,
        userId: socket.userId,
        name: socket.userName,
        quality: data.quality || '1080p',
      });
    });

    socket.on('screen-share:stop', async () => {
      if (!socket.roomId) return;
      await updateParticipant(socket, { isScreenSharing: false });
      io.to(socket.roomId).emit('screen-share:stopped', { socketId: socket.id });
    });

    // ─── LASER POINTER / ANNOTATIONS ─────────────────────────────────
    socket.on('laser-pointer:move', (pos: { x: number; y: number }) => {
      if (!socket.roomId) return;
      socket.to(socket.roomId).emit('laser-pointer:update', {
        socketId: socket.id,
        userId: socket.userId,
        name: socket.userName,
        ...pos,
      });
    });

    socket.on('annotation:draw', (data: unknown) => {
      if (!socket.roomId) return;
      socket.to(socket.roomId).emit('annotation:update', { socketId: socket.id, ...data as object });
    });

    // ─── REACTIONS ────────────────────────────────────────────────────
    socket.on('raise-hand', async (isRaised: boolean) => {
      if (!socket.roomId) return;
      await updateParticipant(socket, { isHandRaised: isRaised });
      io.to(socket.roomId).emit(isRaised ? 'hand:raised' : 'hand:lowered', {
        socketId: socket.id,
        userId: socket.userId,
        name: socket.userName,
      });
    });

    socket.on('reaction', (emoji: string) => {
      if (!socket.roomId) return;
      io.to(socket.roomId).emit('reaction:new', {
        socketId: socket.id,
        userId: socket.userId,
        name: socket.userName,
        emoji,
        timestamp: Date.now(),
      });
    });

    // ─── TYPING ───────────────────────────────────────────────────────
    socket.on('typing:start', () => {
      if (!socket.roomId) return;
      socket.to(socket.roomId).emit('typing:update', {
        socketId: socket.id,
        userId: socket.userId,
        name: socket.userName,
        isTyping: true,
      });
    });

    socket.on('typing:stop', () => {
      if (!socket.roomId) return;
      socket.to(socket.roomId).emit('typing:update', {
        socketId: socket.id,
        userId: socket.userId,
        name: socket.userName,
        isTyping: false,
      });
    });

    // ─── WHITEBOARD ───────────────────────────────────────────────────
    socket.on('whiteboard:update', (data: unknown) => {
      if (!socket.roomId) return;
      socket.to(socket.roomId).emit('whiteboard:update', data);
    });

    // ─── RECORDING ────────────────────────────────────────────────────
    socket.on('recording:start', () => {
      if (!socket.roomId) return;
      io.to(socket.roomId).emit('recording:started', {
        startedBy: socket.userId,
        startedByName: socket.userName,
        timestamp: Date.now(),
      });
    });

    socket.on('recording:stop', () => {
      if (!socket.roomId) return;
      io.to(socket.roomId).emit('recording:stopped', { timestamp: Date.now() });
    });

    socket.on('disconnect', async () => {
      knockingSockets.delete(socket.id);
      await handleLeaveRoom(socket, io);
      
      // Update user status
      if (socket.userId) {
        await User.findByIdAndUpdate(socket.userId, { 
          status: 'offline', 
          lastSeen: new Date() 
        });
      }
    });
  });
}

async function handleLeaveRoom(socket: AuthenticatedSocket, io: SocketIOServer) {
  if (!socket.roomId) return;
  
  try {
    const redis = getRedis();
    await redis.hdel(`room:${socket.roomId}:participants`, socket.id);
    
    await socket.leave(socket.roomId);
    
    socket.to(socket.roomId).emit('participant:left', {
      socketId: socket.id,
      userId: socket.userId,
    });
    
    const remaining = await redis.hgetall(`room:${socket.roomId}:participants`);
    const count = Object.keys(remaining || {}).length;
    io.to(socket.roomId).emit('room:participants-count', count);
    
    // Clean up empty rooms
    if (count === 0) {
      await redis.del(`room:${socket.roomId}:participants`);
    }
    
    socket.roomId = undefined;
  } catch (err) {
    console.error('Error leaving room:', err);
  }
}

async function updateParticipant(socket: AuthenticatedSocket, updates: Record<string, unknown>) {
  if (!socket.roomId) return;
  try {
    const redis = getRedis();
    const existing = await redis.hget(`room:${socket.roomId}:participants`, socket.id);
    if (existing) {
      const participant = { ...JSON.parse(existing), ...updates };
      await redis.hset(`room:${socket.roomId}:participants`, socket.id, JSON.stringify(participant));
    }
  } catch {}
}
