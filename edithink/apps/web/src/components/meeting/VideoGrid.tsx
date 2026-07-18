'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMeetingStore } from '@/store/meeting';
import { useAuthStore } from '@/store/auth';
import { getInitials, getAvatarColor, cn } from '@/lib/utils';
import { Mic, MicOff, Monitor, Pin, Crown, Hand, Video, VideoOff } from 'lucide-react';
import { useAudioActivity } from '@/hooks/useAudioActivity';
import { AudioIndicator } from './AudioIndicator';

interface VideoGridProps {
  localStream: MediaStream | null;
  screenStream: MediaStream | null;
}

export function VideoGrid({ localStream, screenStream }: VideoGridProps) {
  const { participants, viewMode, pinnedParticipantId, isMuted, isCameraOff } = useMeetingStore();
  const { user } = useAuthStore();

  const remoteScreenShare = participants.find(p => p.isScreenSharing);
  const activeScreenStream = screenStream || remoteScreenShare?.stream || null;
  const isAnyScreenSharing = activeScreenStream !== null;

  // Auto-switch to Presentation View if any screen sharing is active
  if (isAnyScreenSharing) {
    return (
      <PresentationView 
        localStream={localStream} 
        screenStream={activeScreenStream}
        participants={participants}
        user={user}
        isMuted={isMuted}
        isCameraOff={isCameraOff}
      />
    );
  }

  if (viewMode === 'speaker' && participants.length > 0) {
    return <SpeakerView localStream={localStream} screenStream={screenStream} />;
  }

  const gridClass = getGridClass(participants.length + 1);

  return (
    <div className={`h-full p-4 grid gap-4 ${gridClass} bg-slate-50/60`}>
      {/* Local video tile */}
      <VideoTile
        name={user?.name || 'You'}
        avatar={user?.avatar}
        isMuted={isMuted}
        isCameraOff={isCameraOff}
        isLocal={true}
        stream={localStream}
      />
      
      {/* Remote participants */}
      {participants.map(p => (
        <VideoTile
          key={p.socketId}
          name={p.name}
          avatar={p.avatar}
          isMuted={p.isMuted}
          isCameraOff={p.isCameraOff}
          isLocal={false}
          stream={p.stream || null}
          isHandRaised={p.isHandRaised}
          isScreenSharing={p.isScreenSharing}
          isHost={p.isHost}
          isPinned={p.socketId === pinnedParticipantId}
        />
      ))}
    </div>
  );
}

interface VideoTileProps {
  name: string;
  avatar?: string;
  isMuted: boolean;
  isCameraOff: boolean;
  isLocal: boolean;
  stream: MediaStream | null;
  isHandRaised?: boolean;
  isScreenSharing?: boolean;
  isHost?: boolean;
  isPinned?: boolean;
  compact?: boolean;
}

const getThemeForName = (name: string) => {
  let hash = 0;
  for (const c of name) hash = (hash * 31 + c.charCodeAt(0)) & 0xffffffff;
  const themes = [
    { border: 'border-blue-200/90', bg: 'bg-blue-50/10', text: 'text-blue-600', ring: 'ring-blue-450', badgeBg: 'bg-blue-100/50', nameBg: 'from-blue-50/60 to-blue-100/30' },
    { border: 'border-indigo-200/90', bg: 'bg-indigo-50/10', text: 'text-indigo-600', ring: 'ring-indigo-450', badgeBg: 'bg-indigo-100/50', nameBg: 'from-indigo-50/60 to-indigo-100/30' },
    { border: 'border-pink-200/90', bg: 'bg-pink-50/10', text: 'text-pink-600', ring: 'ring-pink-450', badgeBg: 'bg-pink-100/50', nameBg: 'from-pink-50/60 to-pink-100/30' },
    { border: 'border-violet-200/90', bg: 'bg-violet-50/10', text: 'text-violet-600', ring: 'ring-violet-450', badgeBg: 'bg-violet-100/50', nameBg: 'from-violet-50/60 to-violet-100/30' },
    { border: 'border-emerald-200/90', bg: 'bg-emerald-50/10', text: 'text-emerald-600', ring: 'ring-emerald-450', badgeBg: 'bg-emerald-100/50', nameBg: 'from-emerald-50/60 to-emerald-100/30' },
    { border: 'border-amber-200/90', bg: 'bg-amber-50/10', text: 'text-amber-600', ring: 'ring-amber-450', badgeBg: 'bg-amber-100/50', nameBg: 'from-amber-50/60 to-amber-100/30' },
  ];
  return themes[Math.abs(hash) % themes.length];
};

function VideoTile({ 
  name, avatar, isMuted, isCameraOff, isLocal, stream, 
  isHandRaised, isScreenSharing, isHost, isPinned, compact = false
}: VideoTileProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
  // Real-time audio activity detection
  const isSpeaking = useAudioActivity(stream, isMuted);

  useEffect(() => {
    if (videoRef.current) {
      if (stream) {
        videoRef.current.srcObject = stream;
      } else {
        videoRef.current.srcObject = null;
      }
    }
  }, [stream, isCameraOff]);

  const nameColor = getAvatarColor(name).replace('bg-', 'text-');
  const theme = getThemeForName(name);

  if (compact) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={cn(
          'flex items-center gap-2.5 bg-white border px-3.5 py-2.5 rounded-2xl shadow-sm transition-all duration-300 w-full h-[58px] relative overflow-hidden',
          theme.border,
          isSpeaking && 'ring-2 ring-green-500 ring-offset-1',
          isPinned && 'ring-2 ring-blue-500',
          isHandRaised && 'ring-2 ring-yellow-450'
        )}
      >
        {/* Left: Avatar / Video */}
        <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 relative bg-slate-100 flex items-center justify-center border border-slate-200/50">
          {!isCameraOff && stream ? (
            <video
              ref={videoRef}
              autoPlay
              muted={isLocal}
              playsInline
              className={cn(
                'w-full h-full object-cover',
                isLocal && 'scale-x-[-1]'
              )}
            />
          ) : (
            avatar ? (
              <img src={avatar} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className={cn(
                'w-full h-full flex items-center justify-center text-white text-[10px] font-extrabold',
                getAvatarColor(name)
              )}>
                {getInitials(name)}
              </div>
            )
          )}
        </div>

        {/* Center: Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <span className="text-slate-800 text-xs font-extrabold truncate leading-tight">
            {isLocal ? 'You' : name}
          </span>
          <span className="text-slate-400 text-[8px] font-bold uppercase tracking-wider leading-none mt-0.5">
            {isHost ? 'Host' : 'User'}
          </span>
        </div>

        {/* Right: Mute/Audio Indicator */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {isScreenSharing && <Monitor className="w-3.5 h-3.5 text-blue-500" />}
          {isMuted ? (
            <MicOff className="w-3.5 h-3.5 text-red-500" />
          ) : (
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          )}
        </div>

        {/* Top-right notification dots for Hand Raised */}
        {isHandRaised && (
          <div className="absolute top-1 right-2 text-xs">✋</div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={cn(
        'relative rounded-2xl overflow-hidden group flex items-center justify-center w-full h-full transition-all duration-300 border-2',
        isSpeaking 
          ? 'bg-green-50/70 border-green-300 shadow-[0_0_15px_rgba(34,197,94,0.15)] ring-2 ring-green-500 ring-offset-2' 
          : `${theme.bg} ${theme.border} shadow-md`,
        isPinned && 'ring-2 ring-blue-500',
        isHandRaised && 'ring-2 ring-yellow-400'
      )}
    >
      {/* Video element */}
      {!isCameraOff && stream ? (
        <video
          ref={videoRef}
          autoPlay
          muted={isLocal}
          playsInline
          className={cn(
            'w-full h-full object-cover rounded-2xl bg-slate-900',
            isLocal && 'scale-x-[-1]'
          )}
        />
      ) : (
        // Camera off — show avatar
        <div className={cn(
          "w-full h-full flex items-center justify-center rounded-2xl relative border transition-colors duration-300 bg-gradient-to-b",
          isSpeaking 
            ? "from-green-50 to-green-100/50 border-green-200" 
            : `${theme.nameBg} ${theme.border}`
        )}>
          {/* Pulsing ring animation when speaking */}
          {isSpeaking && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-24 w-24 rounded-full bg-green-500/20 opacity-75" />
            </div>
          )}
          
          {avatar ? (
            <img src={avatar} alt={name} className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md z-10" />
          ) : (
            <div className={cn(
              'w-20 h-20 rounded-full flex items-center justify-center text-white text-xl font-bold border-2 border-white shadow-md z-10',
              getAvatarColor(name)
            )}>
              {getInitials(name)}
            </div>
          )}
        </div>
      )}

      {/* Bottom info bar */}
      <div className={cn(
        'absolute bottom-3 left-3 right-3 p-2 bg-white/95 backdrop-blur-md border rounded-xl shadow-sm z-10 transition-all text-slate-800',
        theme.border,
        compact && 'bottom-2 left-2 right-2 p-1.5 rounded-lg'
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            {isHost && <Crown className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500/20 flex-shrink-0" />}
            <span className="text-slate-850 text-[10px] font-bold truncate">
              {isLocal ? 'You' : name}
            </span>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {isScreenSharing && <Monitor className="w-3.5 h-3.5 text-blue-500" />}
            <AudioIndicator isMuted={isMuted} isSpeaking={isSpeaking} colorClass={nameColor.replace('text-', 'bg-')} />
          </div>
        </div>
      </div>
      {/* Pinned overlay indicator */}
      {isPinned && (
        <div className="absolute top-3 left-3 bg-blue-500 rounded p-1 border border-white z-10">
          <Pin className="w-3 h-3 text-white" />
        </div>
      )}

      {/* Hand raised overlay badge */}
      {isHandRaised && (
        <div className="absolute top-3 right-3 bg-yellow-500 text-white rounded-xl p-1.5 shadow-md flex items-center justify-center border border-white z-10">
          <Hand className="w-3.5 h-3.5 fill-white text-white" />
        </div>
      )}
    </motion.div>
  );
}

function PresentationView({ 
  localStream, 
  screenStream, 
  participants,
  user,
  isMuted,
  isCameraOff
}: { 
  localStream: MediaStream | null; 
  screenStream: MediaStream | null;
  participants: any[];
  user: any;
  isMuted: boolean;
  isCameraOff: boolean;
}) {
  const screenVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (screenVideoRef.current && screenStream) {
      screenVideoRef.current.srcObject = screenStream;
    }
  }, [screenStream]);

  return (
    <div className="h-full w-full flex flex-col relative bg-slate-50 overflow-hidden">
      {/* Huge Screen Share Canvas */}
      <div className="flex-1 w-full h-full p-4 flex items-center justify-center bg-slate-900">
        <video 
          ref={screenVideoRef} 
          autoPlay 
          muted 
          playsInline 
          className="w-full h-full object-contain rounded-2xl shadow-lg border border-slate-700/50" 
        />
      </div>

      {/* Floating Participant Overlay on the right side (Hover reveal drawer) */}
      <div className="absolute right-4 top-20 bottom-20 w-16 hover:w-52 flex items-center justify-end pointer-events-none z-20 group/participant-sidebar transition-all duration-300">
        <div className="flex flex-col gap-2 p-2.5 bg-slate-105/90 backdrop-blur-md border border-slate-200/80 rounded-2xl pointer-events-auto transform translate-x-full group-hover/participant-sidebar:translate-x-0 opacity-0 group-hover/participant-sidebar:opacity-100 transition-all duration-300 max-h-full overflow-y-auto scrollbar-none shadow-premium-lg w-52">
          {/* Local Participant Tile */}
          <div className="w-full flex-shrink-0 shadow-sm">
            <VideoTile
              name={user?.name || 'You'}
              avatar={user?.avatar}
              isMuted={isMuted}
              isCameraOff={isCameraOff}
              isLocal={true}
              stream={localStream}
              compact={true}
            />
          </div>

          {/* Remote Participant Tiles */}
          {participants.filter(p => !p.isScreenSharing).map(p => (
            <div key={p.socketId} className="w-full flex-shrink-0 shadow-sm">
              <VideoTile
                name={p.name}
                avatar={p.avatar}
                isMuted={p.isMuted}
                isCameraOff={p.isCameraOff}
                isLocal={false}
                stream={p.stream || null}
                isHandRaised={p.isHandRaised}
                isHost={p.isHost}
                compact={true}
              />
            </div>
          ))}
        </div>

        {/* Visual handle to indicate hover area */}
        <div className="w-1.5 h-16 bg-slate-350 rounded-full mr-1 pointer-events-auto cursor-pointer animate-pulse group-hover/participant-sidebar:opacity-0 transition-opacity" />
      </div>
    </div>
  );
}

function ScreenShareTile({ stream }: { stream: MediaStream }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm col-span-2 row-span-2 aspect-video"
    >
      <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-contain" />
      <div className="absolute top-3 left-3 bg-brand-primary text-white text-xs px-2.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 shadow-md border border-white/20">
        <Monitor className="w-3.5 h-3.5 animate-pulse" />
        Screen Share
      </div>
    </motion.div>
  );
}

function SpeakerView({ localStream, screenStream }: { localStream: MediaStream | null; screenStream: MediaStream | null }) {
  const { participants } = useMeetingStore();
  const speakerParticipant = participants[0];
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const speakerVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (speakerVideoRef.current && speakerParticipant && speakerParticipant.stream) {
      speakerVideoRef.current.srcObject = speakerParticipant.stream;
    }
  }, [speakerParticipant]);
  
  return (
    <div className="h-full flex flex-col gap-3 p-3 bg-slate-50/50">
      {/* Main speaker */}
      <div className="flex-1 relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center aspect-video">
        {speakerParticipant ? (
          speakerParticipant.isCameraOff ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className={cn('w-32 h-32 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md border-2 border-white', getAvatarColor(speakerParticipant.name))}>
                {getInitials(speakerParticipant.name)}
              </div>
            </div>
          ) : (
            <video ref={speakerVideoRef} autoPlay playsInline className="w-full h-full object-cover rounded-2xl bg-slate-900" />
          )
        ) : (
          <video ref={localVideoRef} autoPlay muted playsInline className="w-full h-full object-cover scale-x-[-1] rounded-2xl bg-slate-900" />
        )}
      </div>
      {/* Thumbnail strip */}
      <div className="flex gap-3 h-24">
        <div className="w-40 relative rounded-xl overflow-hidden bg-slate-200 border border-slate-200 aspect-video shadow-sm">
          <video ref={localVideoRef} autoPlay muted playsInline className="w-full h-full object-cover scale-x-[-1]" />
        </div>
      </div>
    </div>
  );
}

function getGridClass(count: number): string {
  if (count === 1) return 'grid-cols-1 grid-rows-1';
  if (count === 2) return 'grid-cols-2 grid-rows-1';
  if (count <= 4) return 'grid-cols-2 grid-rows-2';
  if (count <= 6) return 'grid-cols-3 grid-rows-2';
  if (count <= 9) return 'grid-cols-3 grid-rows-3';
  if (count <= 12) return 'grid-cols-4 grid-rows-3';
  return 'grid-cols-4 grid-rows-4';
}
