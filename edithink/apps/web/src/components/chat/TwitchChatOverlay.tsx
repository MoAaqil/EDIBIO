'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMeetingStore, type Message } from '@/store/meeting';
import { useAuthStore } from '@/store/auth';
import { getAvatarColor } from '@/lib/utils';
import { Send, Maximize2, Crown, Shield } from 'lucide-react';
import type { Socket } from 'socket.io-client';

interface TwitchChatOverlayProps {
  roomId: string;
  socket: Socket | null;
}

interface DisplayMessage extends Message {
  id: string;
}

export function TwitchChatOverlay({ roomId, socket }: TwitchChatOverlayProps) {
  const { messages, chatFadeSeconds, setChatMode } = useMeetingStore();
  const { user } = useAuthStore();
  const [displayMessages, setDisplayMessages] = useState<DisplayMessage[]>([]);
  const [input, setInput] = useState('');
  const [fading, setFading] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync new messages from store
  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (!lastMsg) return;
    
    // Avoid duplicates
    setDisplayMessages(prev => {
      if (prev.find(m => m._id === lastMsg._id)) return prev;
      const newMsg: DisplayMessage = { ...lastMsg, id: lastMsg._id };
      
      // Schedule fade-out
      if (lastMsg.twitchStyle && chatFadeSeconds > 0) {
        setTimeout(() => {
          setFading(f => new Set([...f, lastMsg._id]));
          setTimeout(() => {
            setDisplayMessages(d => d.filter(m => m._id !== lastMsg._id));
            setFading(f => { const next = new Set(f); next.delete(lastMsg._id); return next; });
          }, 500); // Fade duration
        }, chatFadeSeconds * 1000);
      }
      
      // Keep max 20 messages for clean overlay flow
      return [...prev.slice(-19), newMsg];
    });
  }, [messages, chatFadeSeconds]);

  const sendMessage = useCallback(() => {
    if (!input.trim() || !socket) return;
    socket.emit('send-message', { content: input.trim(), type: 'text' });
    setInput('');
  }, [input, socket]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="absolute left-4 bottom-24 w-80 max-h-[35vh] flex flex-col pointer-events-none z-20 gap-2">
      {/* Messages column - bottom aligned, Twitch style */}
      <div
        ref={containerRef}
        className="flex-1 flex flex-col justify-end gap-1.5 p-1 overflow-hidden"
      >
        <AnimatePresence mode="popLayout">
          {displayMessages.map(msg => {
            const isBroadcaster = msg.user.name.toLowerCase().includes('host') || msg.userId === user?._id; // simple mock for broadcaster badge
            
            return (
              <motion.div
                key={msg.id}
                layout
                initial={{ opacity: 0, x: -20, y: 8 }}
                animate={{ 
                  opacity: fading.has(msg._id) ? 0 : 0.95, 
                  x: 0, 
                  y: 0 
                }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="pointer-events-auto flex items-start"
              >
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-3 py-1.5 text-xs max-w-full shadow-lg flex items-center gap-1.5 flex-wrap">
                  {/* Streaming Badges */}
                  {isBroadcaster ? (
                    <span className="bg-brand-primary text-white p-0.5 rounded flex items-center justify-center" title="Broadcaster">
                      <Crown className="w-3 h-3" />
                    </span>
                  ) : (
                    <span className="bg-success text-white p-0.5 rounded flex items-center justify-center" title="Moderator">
                      <Shield className="w-3 h-3" />
                    </span>
                  )}
                  
                  {/* Colored Name */}
                  <span className={`font-extrabold truncate max-w-[100px] ${getAvatarColor(msg.user.name).replace('bg-', 'text-')}`}>
                    {msg.user.name}
                  </span>
                  
                  {/* Chat Content */}
                  <span className="text-white/90 break-all leading-normal font-medium">{msg.content}</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Input bar */}
      <div className="p-1 pointer-events-auto">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl flex items-center px-3 py-2 gap-2 shadow-lg focus-within:border-brand-primary/40 transition-colors">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Send a chat message…"
              className="flex-1 bg-transparent text-white text-xs placeholder-white/50 outline-none min-w-0"
              maxLength={500}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="text-brand-primary hover:text-brand-accent transition-colors disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => setChatMode('panel')}
            className="bg-black/60 backdrop-blur-md border border-white/10 p-2 rounded-xl text-white/70 hover:text-white hover:border-white/20 transition-all shadow-lg flex-shrink-0"
            title="Expand to sidebar panel"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
