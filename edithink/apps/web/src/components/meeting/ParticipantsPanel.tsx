'use client';

import { useState } from 'react';
import { useMeetingStore } from '@/store/meeting';
import { useAuthStore } from '@/store/auth';
import { 
  Users, X, Mic, MicOff, Video, VideoOff, 
  Hand, Shield, Search, MoreHorizontal, UserPlus, Copy
} from 'lucide-react';
import { getInitials, getAvatarColor, cn } from '@/lib/utils';
import type { Socket } from 'socket.io-client';

interface ParticipantsPanelProps {
  roomId: string;
  socket: Socket | null;
}

export function ParticipantsPanel({ roomId, socket }: ParticipantsPanelProps) {
  const { participants, toggleParticipants, pinnedParticipantId, pinParticipant } = useMeetingStore();
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);

  // Extract local user meeting state with proper hook calls at top level
  const localIsMuted = useMeetingStore(s => s.isMuted);
  const localIsCameraOff = useMeetingStore(s => s.isCameraOff);
  const localIsHandRaised = useMeetingStore(s => s.isHandRaised);

  const allParticipants = [
    {
      socketId: 'local',
      name: user?.name || 'You',
      avatar: user?.avatar,
      isMuted: localIsMuted,
      isCameraOff: localIsCameraOff,
      isHandRaised: localIsHandRaised,
      isLocal: true,
      isHost: user?.role === 'admin' || user?.role === 'host',
    },
    ...participants.map(p => ({ ...p, isLocal: false }))
  ];

  const filteredParticipants = searchQuery
    ? allParticipants.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : allParticipants;

  const isLocalHost = user?.role === 'admin' || user?.role === 'host';

  const handleMuteAll = () => {
    if (isLocalHost && socket) {
      socket.emit('moderation:mute-all');
    }
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-dark-card text-slate-800 dark:text-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-dark-border">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-slate-500" />
          <span className="text-slate-800 dark:text-white font-bold text-sm">People</span>
          <span className="text-slate-400 text-xs font-semibold">({allParticipants.length})</span>
        </div>
        <button
          onClick={toggleParticipants}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-305 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      {/* Search and Actions */}
      <div className="p-3 border-b border-slate-200 dark:border-dark-border space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Find someone…"
            className="w-full bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-205 text-sm pl-9 pr-3 py-2 rounded-lg placeholder-slate-400 border border-slate-200 dark:border-dark-border outline-none focus:border-brand-primary transition-shadow"
          />
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setShowInviteModal(true)}
            className="flex-1 flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold py-2 rounded-lg transition-colors border border-slate-200 dark:border-dark-border"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Add People
          </button>
          {isLocalHost && (
            <button
              onClick={handleMuteAll}
              className="flex-1 flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-750 dark:text-slate-300 text-xs font-semibold py-2 rounded-lg transition-colors border border-slate-200 dark:border-dark-border"
            >
              <MicOff className="w-3.5 h-3.5 text-danger" />
              Mute All
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {filteredParticipants.map(p => (
            <div
              key={p.socketId}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={cn('relative w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm', getAvatarColor(p.name))}>
                  {p.avatar ? (
                    <img src={p.avatar} alt={p.name} className="w-full h-full rounded-full object-cover" />
                  ) : getInitials(p.name)}
                  
                  {p.isHandRaised && (
                    <div className="absolute -top-1 -right-1 bg-warning w-4 h-4 rounded-full flex items-center justify-center text-[10px] shadow-sm border border-white">
                      ✋
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {p.name}
                    </span>
                    {p.isLocal && <span className="text-xs text-slate-400 font-medium">(You)</span>}
                    {p.isHost && (
                      <Shield className="w-3 h-3 text-brand-primary" title="Host" />
                    )}
                  </div>
                  <span className="text-xs text-slate-450 dark:text-slate-400 font-medium truncate">
                    {p.isHost ? 'Meeting Host' : 'Participant'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                {p.isMuted ? (
                  <MicOff className="w-4 h-4 text-danger" />
                ) : (
                  <Mic className="w-4 h-4 text-slate-400" />
                )}
                
                {p.isCameraOff ? (
                  <VideoOff className="w-4 h-4 text-danger" />
                ) : (
                  <Video className="w-4 h-4 text-slate-400" />
                )}

                <button
                  onClick={() => pinParticipant(p.socketId === pinnedParticipantId ? null : p.socketId)}
                  className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 opacity-0 group-hover:opacity-100 transition-all focus:opacity-100 ml-1"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          
          {filteredParticipants.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-sm">
              No participants found
            </div>
          )}
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-premium-xl max-w-sm w-full p-6 relative">
            <button
              onClick={() => setShowInviteModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-sm font-bold text-slate-800 mb-1">Add people to meeting</h3>
            <p className="text-slate-500 text-[10px] mb-4">Share this link to invite others to join the call.</p>
            
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl p-2 mb-4">
              <input
                readOnly
                value={`${window.location.origin}/meet/${roomId}`}
                className="bg-transparent text-slate-750 text-[10px] px-2 py-1 outline-none font-mono flex-1 min-w-0"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/meet/${roomId}`);
                  alert('Copied invite link!');
                }}
                className="p-1.5 hover:bg-slate-200 border border-slate-200 rounded-lg text-slate-600 transition-colors flex-shrink-0"
                title="Copy link"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Or share directly via</span>
              <div className="grid grid-cols-3 gap-2">
                {/* WhatsApp */}
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Join my meeting on EdiThink: ${window.location.origin}/meet/${roomId}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-2 bg-[#25D366]/8 hover:bg-[#25D366]/15 border border-[#25D366]/30 rounded-2xl py-3.5 transition-all duration-200 hover:scale-105 hover:shadow-sm group"
                >
                  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="text-[10px] font-bold text-[#128C7E]">WhatsApp</span>
                </a>

                {/* Telegram */}
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(`${window.location.origin}/meet/${roomId}`)}&text=${encodeURIComponent(`Join my meeting on EdiThink!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-2 bg-[#229ED9]/8 hover:bg-[#229ED9]/15 border border-[#229ED9]/30 rounded-2xl py-3.5 transition-all duration-200 hover:scale-105 hover:shadow-sm group"
                >
                  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#229ED9">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  <span className="text-[10px] font-bold text-[#229ED9]">Telegram</span>
                </a>

                {/* Discord */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`Join my meeting on EdiThink: ${window.location.origin}/meet/${roomId}`);
                    alert('Link copied! Paste it in any Discord channel or DM.');
                  }}
                  className="flex flex-col items-center justify-center gap-2 bg-[#5865F2]/8 hover:bg-[#5865F2]/15 border border-[#5865F2]/30 rounded-2xl py-3.5 transition-all duration-200 hover:scale-105 hover:shadow-sm group w-full"
                >
                  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#5865F2">
                    <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
                  </svg>
                  <span className="text-[10px] font-bold text-[#5865F2]">Discord</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
