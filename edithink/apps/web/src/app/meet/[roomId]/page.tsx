'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useMeetingStore } from '@/store/meeting';
import { useAuthStore } from '@/store/auth';
import { MeetingControls } from '@/components/meeting/MeetingControls';
import { VideoGrid } from '@/components/meeting/VideoGrid';
import { ChatPanel } from '@/components/chat/ChatPanel';
import { TwitchChatOverlay } from '@/components/chat/TwitchChatOverlay';
import { ParticipantsPanel } from '@/components/meeting/ParticipantsPanel';
import { MeetingHeader } from '@/components/meeting/MeetingHeader';
import { WhiteboardPanel } from '@/components/whiteboard/WhiteboardPanel';

import { useWebRTC } from '@/hooks/useWebRTC';
import { useSocket } from '@/hooks/useSocket';
import { getInitials, getAvatarColor, cn } from '@/lib/utils';
import { Mic, MicOff, Video, VideoOff, Copy, UserPlus, Info, Users } from 'lucide-react';
import { AudioIndicator } from '@/components/meeting/AudioIndicator';
import { useAudioActivity } from '@/hooks/useAudioActivity';
import api from '@/lib/api';

export default function MeetingRoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.roomId as string;
  const { user } = useAuthStore();
  const {
    isChatOpen, isParticipantsOpen, isWhiteboardOpen, isAIOpen,
    isScreenSharing, chatMode, reset, isMuted, isCameraOff,
    toggleMute, toggleCamera, participants
  } = useMeetingStore();
  
  const [meeting, setMeeting] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [joinError, setJoinError] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [isPendingAdmission, setIsPendingAdmission] = useState(false);
  const [knockingRequests, setKnockingRequests] = useState<{ socketId: string; name: string }[]>([]);
  
  const { 
    localStream, 
    screenStream,
    startScreenShare, 
    stopScreenShare,
    createPeerConnection,
    handleOffer,
    handleAnswer,
    handleIceCandidate,
  } = useWebRTC(roomId);
  
  // Lobby camera preview ref
  const lobbyVideoRef = useRef<HTMLVideoElement | null>(null);

  // Audio activity detection for Lobby preview
  const isSpeaking = useAudioActivity(localStream, isMuted);

  // Bind localStream to lobby preview video element
  useEffect(() => {
    if (lobbyVideoRef.current && !hasJoined) {
      if (localStream && !isCameraOff) {
        lobbyVideoRef.current.srcObject = localStream;
      } else {
        lobbyVideoRef.current.srcObject = null;
      }
    }
  }, [localStream, isCameraOff, hasJoined]);

  // Connect socket ONLY after the user clicks "Join Now"
  const { socket } = useSocket(hasJoined ? roomId : '', guestName);

  useEffect(() => {
    async function fetchMeetingDetails() {
      try {
        const res = await api.get(`/meetings/${roomId}`);
        setMeeting(res.data.meeting);
      } catch (err: any) {
        setJoinError(err.response?.data?.error || 'Failed to fetch meeting info');
      } finally {
        setIsLoading(false);
      }
    }
    fetchMeetingDetails();
    
    return () => {
      reset();
    };
  }, [roomId]);

  // Wire up WebRTC signaling events between socket and useWebRTC
  useEffect(() => {
    if (!socket || !hasJoined) return;

    // Handle incoming WebRTC offer
    socket.on('webrtc:offer', async ({ fromId, offer }: any) => {
      await handleOffer(fromId, offer, socket);
    });

    // Handle incoming WebRTC answer
    socket.on('webrtc:answer', async ({ fromId, answer }: any) => {
      await handleAnswer(fromId, answer);
    });

    // Handle incoming ICE candidate
    socket.on('webrtc:ice-candidate', async ({ fromId, candidate }: any) => {
      await handleIceCandidate(fromId, candidate);
    });

    // When a remote participant joins, we initiate the WebRTC connection by sending them an offer
    socket.on('participant:joined', async (participant: any) => {
      if (participant.socketId !== socket.id) {
        const pc = createPeerConnection(participant.socketId, socket);
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit('webrtc:offer', { targetId: participant.socketId, offer });
      }
    });

    // Lobby admission handlers
    socket.on('room:pending', () => {
      setIsPendingAdmission(true);
    });

    socket.on('room:admitted', () => {
      setIsPendingAdmission(false);
    });

    socket.on('room:rejected', () => {
      setJoinError('The host declined your request to join this meeting.');
      setIsPendingAdmission(false);
      setHasJoined(false);
    });

    socket.on('participant:knocking', (req: any) => {
      setKnockingRequests(prev => {
        if (prev.some(p => p.socketId === req.socketId)) return prev;
        return [...prev, req];
      });
    });

    return () => {
      socket.off('webrtc:offer');
      socket.off('webrtc:answer');
      socket.off('webrtc:ice-candidate');
      socket.off('participant:joined');
      socket.off('room:pending');
      socket.off('room:admitted');
      socket.off('room:rejected');
      socket.off('participant:knocking');
    };
  }, [socket, hasJoined, createPeerConnection, handleOffer, handleAnswer, handleIceCandidate]);

  if (isLoading) {
    return (
      <div className="h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-655 text-sm font-semibold">Loading meeting room…</p>
        </div>
      </div>
    );
  }

  if (joinError) {
    return (
      <div className="h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md bg-white p-8 rounded-2xl border border-slate-200 shadow-premium-lg">
          <div className="w-16 h-16 bg-danger/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-danger/25">
            <span className="text-danger text-2xl font-black">!</span>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Can't join meeting</h2>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">{joinError}</p>
          <button onClick={() => { setJoinError(''); router.push('/home'); }} className="bg-brand-primary hover:bg-brand-accent transition-colors text-white px-6 py-3 rounded-xl font-semibold shadow-sm w-full">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Waiting lobby state for Guest users
  if (isPendingAdmission) {
    return (
      <div className="h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center max-w-sm bg-white p-8 rounded-3xl border border-slate-200 shadow-premium-lg flex flex-col items-center">
          <div className="relative w-16 h-16 mb-6 flex items-center justify-center">
            <div className="absolute inset-0 border-4 border-brand-primary/10 rounded-full" />
            <div className="absolute inset-0 border-4 border-t-brand-primary rounded-full animate-spin" />
            <span className="text-xl z-10">⏳</span>
          </div>
          <h2 className="text-lg font-extrabold text-slate-800 mb-1.5">Waiting for host approval</h2>
          <p className="text-slate-500 text-xs leading-relaxed mb-5 px-2">
            The host of the meeting has been notified. We will let you in as soon as they approve.
          </p>
          <div className="bg-slate-50 border border-slate-200/80 px-4 py-2.5 rounded-2xl text-[10px] font-bold text-slate-550 uppercase tracking-wider">
            Joining as: {guestName || user?.name || 'Guest'}
          </div>
        </div>
      </div>
    );
  }

  // LOBBY SETUP SCREEN (Rendered before user joins)
  if (!hasJoined) {
    const inviteLink = `${window.location.origin}/meet/${roomId}`;
    
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="max-w-4xl w-full bg-white rounded-3xl border border-slate-200 shadow-premium-lg overflow-hidden flex flex-col md:flex-row min-h-[480px]">
          {/* Left: Camera Preview Setup */}
          <div className="flex-1 bg-slate-100 p-6 flex flex-col justify-between relative min-h-[300px] md:min-h-auto">
            <div className="flex-1 w-full flex items-center justify-center relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-250 shadow-inner">
              {!isCameraOff && localStream ? (
                <video
                  ref={lobbyVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-x-[-1] absolute inset-0"
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 z-10 text-center px-4">
                  <div className={cn(
                    'w-20 h-20 rounded-full flex items-center justify-center text-white text-xl font-bold border-2 border-white shadow-md',
                    getAvatarColor(user?.name || guestName || 'You')
                  )}>
                    {getInitials(user?.name || guestName || 'You')}
                  </div>
                  <span className="text-white/60 text-xs font-semibold">Camera is turned off</span>
                </div>
              )}

              {/* Speech waves animation for preview */}
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 shadow-md">
                <span className="text-white text-[10px] font-bold">Mic Test:</span>
                <AudioIndicator isMuted={isMuted} isSpeaking={isSpeaking} colorClass="bg-brand-primary" />
              </div>
            </div>

            {/* Lobby Controls */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <button
                onClick={toggleMute}
                className={cn(
                  'p-3.5 rounded-2xl transition-all duration-200 shadow-sm border',
                  isMuted 
                    ? 'bg-danger/10 border-danger/20 text-danger hover:bg-danger/25' 
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                )}
                title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              <button
                onClick={toggleCamera}
                className={cn(
                  'p-3.5 rounded-2xl transition-all duration-200 shadow-sm border',
                  isCameraOff 
                    ? 'bg-danger/10 border-danger/20 text-danger hover:bg-danger/25' 
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                )}
                title={isCameraOff ? 'Start camera' : 'Stop camera'}
              >
                {isCameraOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Right: Join Details & Button */}
          <div className="w-full md:w-[380px] p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-200">
            <div className="space-y-6">
              <div>
                <span className="bg-brand-primary/10 text-brand-primary text-[10px] font-bold px-2 py-0.5 rounded-full border border-brand-primary/20">
                  LOBBY PREVIEW
                </span>
                <h2 className="text-xl font-black text-slate-800 mt-2">Ready to join?</h2>
                <p className="text-slate-500 text-xs mt-1">Check your audio and video before entering.</p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                {/* Guest name input if not logged in */}
                {!user && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Your Display Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Enter your name to join..."
                      value={guestName}
                      onChange={e => setGuestName(e.target.value)}
                      className="w-full bg-white border border-slate-200 text-slate-850 text-xs px-3.5 py-2.5 rounded-xl outline-none focus:border-brand-primary font-bold shadow-sm"
                    />
                  </div>
                )}

                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Meeting Title</div>
                  <div className="text-xs font-bold text-slate-850">{meeting?.title || 'Instant Call'}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Invite link</div>
                  <div className="flex items-center gap-1">
                    <input
                      readOnly
                      value={inviteLink}
                      className="bg-white border border-slate-200 text-slate-550 text-[10px] px-2 py-1.5 rounded-lg flex-1 outline-none font-mono"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(inviteLink);
                        alert('Copied invite link!');
                      }}
                      className="p-1.5 hover:bg-slate-200 border border-slate-250 rounded-lg text-slate-600 transition-colors flex-shrink-0"
                      title="Copy link"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 mt-6">
              <button
                onClick={() => setHasJoined(true)}
                disabled={!user && !guestName.trim()}
                className="w-full bg-brand-primary hover:bg-brand-accent transition-all text-white py-3 rounded-2xl text-xs font-bold shadow-md hover:shadow-brand-primary/10 active:scale-95 duration-150 flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none"
              >
                Join Meeting
              </button>
              <button
                onClick={() => router.push('/home')}
                className="w-full border border-slate-200 text-slate-550 hover:bg-slate-50 py-3 rounded-2xl text-xs font-semibold transition-all"
              >
                Go Back Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const activeSidePanel = isParticipantsOpen 
    ? 'participants' 
    : (isChatOpen && chatMode === 'panel') 
      ? 'chat' 
      : isWhiteboardOpen 
        ? 'whiteboard' 
        : null;

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden relative p-4 pt-16 md:pt-4">
      {/* Floating Header Hover Zone */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-auto md:h-3 md:hover:h-18 group/header flex items-start justify-center pointer-events-none transition-all duration-300">
        <div className="w-full bg-white border-b border-slate-200 pointer-events-auto transform translate-y-0 opacity-100 md:-translate-y-[85%] md:group-hover/header:translate-y-0 md:hover:translate-y-0 md:opacity-0 md:group-hover/header:opacity-100 md:hover:opacity-100 transition-all duration-300 shadow-sm rounded-none">
          <MeetingHeader meeting={meeting} roomId={roomId} />
        </div>
      </div>

      {/* Main Content Area (taking remaining height) */}
      <div className="flex-1 w-full relative overflow-hidden">
        {/* Video Grid Area */}
        <div className="w-full h-full relative bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
          <VideoGrid localStream={localStream} screenStream={screenStream} />
          
          {/* Twitch-style Chat Overlay */}
          {chatMode === 'overlay' && isChatOpen && (
            <TwitchChatOverlay roomId={roomId} socket={socket} />
          )}
          

        </div>

        {/* Side Panel Floating Drawer */}
        <AnimatePresence>
          {activeSidePanel && (
            <motion.div
              initial={{ x: '110%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '110%', opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute right-4 top-4 bottom-4 w-80 bg-white border border-slate-200/80 overflow-hidden z-30 shadow-premium-xl flex flex-col rounded-2xl pointer-events-auto"
            >
              {isParticipantsOpen && <ParticipantsPanel roomId={roomId} socket={socket} />}
              {isChatOpen && chatMode === 'panel' && <ChatPanel roomId={roomId} socket={socket} />}
              {isWhiteboardOpen && <WhiteboardPanel />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Controls Centered at Bottom */}
      <MeetingControls
        roomId={roomId}
        onStartScreenShare={startScreenShare}
        onStopScreenShare={stopScreenShare}
        socket={socket}
      />

      {/* Knocking Requests overlay for host */}
      {knockingRequests.length > 0 && (
        <div className="fixed top-20 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-auto">
          <AnimatePresence>
            {knockingRequests.map(req => (
              <motion.div
                key={req.socketId}
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.9 }}
                className="bg-white border border-slate-200 shadow-premium-xl rounded-2xl p-4 flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-xs">
                    {getInitials(req.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-slate-800 truncate block">{req.name}</span>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Wants to join</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      socket?.emit('moderation:reject-participant', req.socketId);
                      setKnockingRequests(prev => prev.filter(p => p.socketId !== req.socketId));
                    }}
                    className="flex-1 py-1.5 rounded-xl text-[10px] font-bold text-slate-650 border border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    Deny
                  </button>
                  <button
                    onClick={() => {
                      socket?.emit('moderation:admit-participant', req.socketId);
                      setKnockingRequests(prev => prev.filter(p => p.socketId !== req.socketId));
                    }}
                    className="flex-1 py-1.5 rounded-xl text-[10px] font-bold text-white bg-green-500 hover:bg-green-600 transition-colors shadow-sm"
                  >
                    Admit
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
