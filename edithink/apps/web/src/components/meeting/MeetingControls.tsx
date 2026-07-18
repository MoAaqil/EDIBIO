'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, MicOff, Video, VideoOff, Monitor, MonitorOff,
  MessageSquare, Users, Hand, MoreHorizontal, PhoneOff,
  Radio, Smile, Copy, UserPlus
} from 'lucide-react';
import { useMeetingStore } from '@/store/meeting';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { Socket } from 'socket.io-client';

interface MeetingControlsProps {
  roomId: string;
  onStartScreenShare: () => Promise<MediaStream>;
  onStopScreenShare: () => void;
  socket: Socket | null;
}

export function MeetingControls({ roomId, onStartScreenShare, onStopScreenShare, socket }: MeetingControlsProps) {
  const router = useRouter();
  const {
    isMuted, isCameraOff, isScreenSharing, isRecording, isHandRaised,
    isChatOpen, isParticipantsOpen, isWhiteboardOpen, isAIOpen,
    toggleMute, toggleCamera, toggleScreenShare, toggleRecording,
    toggleHand, toggleChat, toggleParticipants, toggleWhiteboard, toggleAI,
    participants, messages,
  } = useMeetingStore();

  const [showMore, setShowMore] = useState(false);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [showInvite, setShowInvite] = useState(false);

  const inviteLink = typeof window !== 'undefined' ? `${window.location.origin}/meet/${roomId}` : '';

  const handleMute = useCallback(() => {
    toggleMute();
    socket?.emit('media:mute-toggle', !isMuted);
  }, [isMuted, toggleMute, socket]);

  const handleCamera = useCallback(() => {
    toggleCamera();
    socket?.emit('media:camera-toggle', !isCameraOff);
  }, [isCameraOff, toggleCamera, socket]);

  const handleScreenShare = useCallback(async () => {
    if (isScreenSharing) {
      onStopScreenShare();
      socket?.emit('screen-share:stop');
    } else {
      try {
        await onStartScreenShare();
        toggleScreenShare();
        socket?.emit('screen-share:start', { quality: '4K' });
      } catch {
        // User denied or browser error
      }
    }
  }, [isScreenSharing, onStartScreenShare, onStopScreenShare, toggleScreenShare, socket]);

  const handleRaiseHand = useCallback(() => {
    toggleHand();
    socket?.emit('raise-hand', !isHandRaised);
  }, [isHandRaised, toggleHand, socket]);

  const handleReaction = useCallback((emoji: string) => {
    socket?.emit('reaction', emoji);
    setShowReactions(false);
  }, [socket]);

  const handleLeave = () => {
    socket?.emit('leave-room');
    router.push('/home');
  };

  const unreadCount = 0; // TODO: track unread

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex flex-col items-center">
      
      {/* Leave confirmation */}
      <AnimatePresence>
        {showLeaveConfirm && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mb-3 bg-white dark:bg-dark-card rounded-2xl p-4 shadow-premium-xl border border-slate-200 dark:border-dark-border min-w-64 pointer-events-auto"
          >
            <p className="text-slate-850 dark:text-slate-200 text-sm font-semibold mb-3">Leave this meeting?</p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowLeaveConfirm(false)}
                className="flex-1 py-2 rounded-xl text-sm text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-dark-border hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLeave}
                className="flex-1 py-2 rounded-xl text-sm text-white bg-danger hover:bg-red-600 font-semibold transition-colors shadow-md"
              >
                Leave
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emoji reactions popup */}
      <AnimatePresence>
        {showReactions && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mb-3 bg-white dark:bg-dark-card rounded-2xl p-3 shadow-premium-xl border border-slate-200 dark:border-dark-border pointer-events-auto"
          >
            <div className="flex gap-2">
              {['👍', '👏', '❤️', '😂', '😮', '🎉', '🙏', '🔥'].map(emoji => (
                <button
                  key={emoji}
                  onClick={() => handleReaction(emoji)}
                  className="text-2xl hover:scale-125 transition-transform p-1"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* More Options Popover */}
      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mb-3 bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-xl p-2 shadow-premium-xl flex flex-col gap-0.5 z-50 min-w-52 pointer-events-auto"
          >
            {/* Record */}
            <button
              onClick={() => { toggleRecording(); setShowMore(false); }}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors w-full text-left",
                isRecording ? "bg-danger/10 text-danger" : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              )}
            >
              <Radio className={cn("w-4 h-4", isRecording && "animate-pulse")} />
              <span>{isRecording ? 'Stop Recording' : 'Record Meeting'}</span>
            </button>

            {/* Raise Hand */}
            <button
              onClick={() => { handleRaiseHand(); setShowMore(false); }}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors w-full text-left",
                isHandRaised ? "bg-warning/10 text-warning" : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              )}
            >
              <Hand className="w-4 h-4" />
              <span>{isHandRaised ? 'Lower Hand' : 'Raise Hand'}</span>
            </button>

            {/* Reactions */}
            <button
              onClick={() => { setShowReactions(!showReactions); setShowMore(false); }}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors w-full text-left",
                showReactions ? "bg-brand-primary/10 text-brand-primary" : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              )}
            >
              <Smile className="w-4 h-4" />
              <span>Reactions</span>
            </button>

            {/* Invite People — collapsed by default */}
            <div className="h-px bg-slate-100 dark:bg-dark-border my-1" />
            <button
              onClick={() => setShowInvite(v => !v)}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors w-full text-left",
                showInvite ? "bg-brand-primary/10 text-brand-primary" : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              )}
            >
              <UserPlus className="w-4 h-4" />
              <span>Invite People</span>
              <svg className={cn("w-3 h-3 ml-auto transition-transform", showInvite && "rotate-180")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>

            {/* Collapsible invite section */}
            {showInvite && (
              <div className="px-1 pt-1 pb-2">
                {/* Copy link row */}
                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg p-1.5 mb-2">
                  <span className="text-slate-500 text-[10px] font-mono flex-1 truncate px-1">{inviteLink}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(inviteLink)}
                    className="flex items-center gap-1 text-[10px] font-bold text-brand-primary bg-brand-primary/10 hover:bg-brand-primary/20 px-2.5 py-1.5 rounded-md transition-colors flex-shrink-0"
                  >
                    <Copy className="w-3 h-3" />
                    Copy
                  </button>
                </div>

                {/* Platform buttons */}
                <div className="grid grid-cols-3 gap-1">
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Join my meeting on EdiThink: ${inviteLink}`)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1 bg-[#25D366]/8 hover:bg-[#25D366]/15 border border-[#25D366]/20 rounded-lg py-2 transition-all hover:scale-105"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    <span className="text-[9px] font-bold text-[#128C7E]">WhatsApp</span>
                  </a>
                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent('Join my meeting on EdiThink!')}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1 bg-[#229ED9]/8 hover:bg-[#229ED9]/15 border border-[#229ED9]/20 rounded-lg py-2 transition-all hover:scale-105"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#229ED9"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                    <span className="text-[9px] font-bold text-[#229ED9]">Telegram</span>
                  </a>
                  <button
                    onClick={() => { navigator.clipboard.writeText(`Join my EdiThink meeting: ${inviteLink}`); alert('Copied! Paste in Discord.'); }}
                    className="flex flex-col items-center gap-1 bg-[#5865F2]/8 hover:bg-[#5865F2]/15 border border-[#5865F2]/20 rounded-lg py-2 transition-all hover:scale-105 w-full"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#5865F2"><path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/></svg>
                    <span className="text-[9px] font-bold text-[#5865F2]">Discord</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating pill bar */}
      <div className="bg-white/95 dark:bg-dark-card/95 backdrop-blur-md border border-slate-200/85 dark:border-dark-border rounded-2xl p-1.5 shadow-premium-xl pointer-events-auto flex items-center gap-1.5">
        <ControlButton
          icon={isMuted ? MicOff : Mic}
          label=""
          onClick={handleMute}
          active={isMuted}
          danger={isMuted}
          tooltip={isMuted ? 'Unmute microphone' : 'Mute microphone'}
        />
        <ControlButton
          icon={isCameraOff ? VideoOff : Video}
          label=""
          onClick={handleCamera}
          active={isCameraOff}
          danger={isCameraOff}
          tooltip={isCameraOff ? 'Start camera' : 'Stop camera'}
        />
        <ControlButton
          icon={isScreenSharing ? MonitorOff : Monitor}
          label=""
          onClick={handleScreenShare}
          active={isScreenSharing}
          highlight={isScreenSharing}
          tooltip="Share Screen"
        />

        {/* Chat button — directly in navbar */}
        <ControlButton
          icon={MessageSquare}
          label=""
          onClick={toggleChat}
          active={isChatOpen}
          highlight={isChatOpen}
          badge={unreadCount > 0 ? unreadCount : undefined}
          tooltip="Chat"
        />

        <ControlButton
          icon={MoreHorizontal}
          label=""
          onClick={() => setShowMore(!showMore)}
          active={showMore}
          tooltip="More Options"
        />
        
        <div className="w-px h-6 bg-slate-200 dark:bg-dark-border mx-1" />
        
        <button
          onClick={() => setShowLeaveConfirm(true)}
          className="flex items-center justify-center bg-danger hover:bg-red-600 text-white w-10 h-10 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-md shadow-red-500/10"
          title="Leave meeting"
        >
          <PhoneOff className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

interface ControlButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  active?: boolean;
  danger?: boolean;
  highlight?: boolean;
  badge?: number;
  tooltip?: string;
}

function ControlButton({ icon: Icon, label, onClick, active, danger, highlight, badge, tooltip }: ControlButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div className="relative">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-slate-850 dark:bg-slate-800 text-white text-xs rounded-lg whitespace-nowrap pointer-events-none z-50 shadow-md border border-slate-700/30"
          >
            {tooltip}
          </motion.div>
        )}
      </AnimatePresence>
      
      <button
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={cn(
          'relative flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-200 w-10 h-10',
          'hover:scale-105 active:scale-95',
          danger && active ? 'bg-danger/10 text-danger hover:bg-danger/25' :
          highlight && active ? 'bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/25' :
          active ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-105 dark:hover:bg-slate-800/60 hover:text-slate-800 dark:hover:text-white',
        )}
      >
        <Icon className="w-4.5 h-4.5" />
        {badge !== undefined && badge > 0 && (
          <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-[8px] font-black rounded-full min-w-[14px] h-3.5 flex items-center justify-center px-0.5 shadow-sm">
            {badge > 9 ? '9+' : badge}
          </span>
        )}
      </button>
    </div>
  );
}
