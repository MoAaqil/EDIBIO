'use client';

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useMeetingStore } from '@/store/meeting';
import { useAuthStore } from '@/store/auth';

export function useSocket(roomId: string, displayName?: string, profileColor?: string) {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  // socketState is reactive: components re-render when socket connects/disconnects
  const [socketState, setSocketState] = useState<Socket | null>(null);
  const { user } = useAuthStore();
  const { addParticipant, removeParticipant, updateParticipant, addMessage } = useMeetingStore();

  useEffect(() => {
    if (!roomId) return;

    const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';
    const token = localStorage.getItem('accessToken');
    
    const socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    
    socketRef.current = socket;
    // Make the socket available reactively so components like ChatPanel can use socket.id
    setSocketState(socket);

    socket.on('connect', () => {
      setIsConnected(true);
      socket.emit('join-room', roomId, displayName || user?.name, profileColor);
    });

    socket.on('disconnect', () => setIsConnected(false));

    // Room events
    socket.on('room:joined', ({ participants }: any) => {
      participants.forEach((p: any) => {
        if (p.socketId !== socket.id) {
          addParticipant(p);
        }
      });
    });

    socket.on('participant:joined', (participant: any) => {
      if (participant.socketId !== socket.id) {
        addParticipant(participant);
      }
    });

    socket.on('participant:left', ({ socketId }: any) => {
      removeParticipant(socketId);
    });

    // Chat events - message includes senderSocketId so isOwn detection works
    socket.on('message:new', (message: any) => {
      addMessage({
        _id: message._id,
        userId: message.userId?._id || message.userId,
        senderSocketId: message.senderSocketId,
        content: message.content,
        type: message.type,
        user: { 
          name: message.userId?.name || message.guestSender?.name || message.senderName || 'Unknown',
          avatar: message.userId?.avatar || message.guestSender?.avatar,
        },
        createdAt: message.createdAt,
        twitchStyle: message.twitchStyle,
        fadeAfterSeconds: message.fadeAfterSeconds || 30,
      });
    });

    // Media state events
    socket.on('media:mute-changed', ({ socketId, isMuted }: any) => {
      updateParticipant(socketId, { isMuted });
    });

    socket.on('media:camera-changed', ({ socketId, isCameraOff }: any) => {
      updateParticipant(socketId, { isCameraOff });
    });

    socket.on('hand:raised', ({ socketId }: any) => {
      updateParticipant(socketId, { isHandRaised: true });
    });

    socket.on('hand:lowered', ({ socketId }: any) => {
      updateParticipant(socketId, { isHandRaised: false });
    });

    socket.on('screen-share:started', ({ socketId }: any) => {
      updateParticipant(socketId, { isScreenSharing: true });
    });

    socket.on('screen-share:stopped', ({ socketId }: any) => {
      updateParticipant(socketId, { isScreenSharing: false });
    });

    return () => {
      socket.emit('leave-room');
      socket.disconnect();
      socketRef.current = null;
      setSocketState(null);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, displayName]);
  // Note: addParticipant, removeParticipant, updateParticipant, addMessage are
  // stable Zustand actions — they don't change between renders, so it's safe
  // to omit them from deps to avoid unnecessary reconnects.

  // socketRef is stable for callbacks that need the live socket without re-render
  // socketState is reactive so React components get the live Socket after connect
  return { socket: socketState, isConnected, socketRef };
}
