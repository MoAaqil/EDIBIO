'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMeetingStore } from '@/store/meeting';
import { useAuthStore } from '@/store/auth';
import { 
  X, Send, Smile, Paperclip, Hash, Pin, 
  MoreHorizontal, Minimize2, Reply, Search
} from 'lucide-react';
import { getInitials, getAvatarColor, formatTime, cn } from '@/lib/utils';
import type { Socket } from 'socket.io-client';

interface ChatPanelProps {
  roomId: string;
  socket: Socket | null;
}

export function ChatPanel({ roomId, socket }: ChatPanelProps) {
  const { messages, chatMode, setChatMode, toggleChat } = useMeetingStore();
  const { user } = useAuthStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!socket) return;
    socket.on('typing:update', ({ name, isTyping: typing }: { name: string; isTyping: boolean }) => {
      setTypingUsers(prev => 
        typing 
          ? [...prev.filter(n => n !== name), name]
          : prev.filter(n => n !== name)
      );
    });
    return () => { socket.off('typing:update'); };
  }, [socket]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    
    if (!isTyping) {
      setIsTyping(true);
      socket?.emit('typing:start');
    }
    
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      setIsTyping(false);
      socket?.emit('typing:stop');
    }, 2000);
  };

  const sendMessage = useCallback(() => {
    if (!input.trim() || !socket) return;
    socket.emit('send-message', { content: input.trim(), type: 'text' });
    setInput('');
    socket.emit('typing:stop');
    setIsTyping(false);
  }, [input, socket]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const filteredMessages = searchQuery 
    ? messages.filter(m => m.content.toLowerCase().includes(searchQuery.toLowerCase()))
    : messages;

  return (
    <div className="h-full flex flex-col bg-white dark:bg-dark-card text-slate-800 dark:text-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-dark-border">
        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-slate-500" />
          <span className="text-slate-800 dark:text-white font-bold text-sm">Meeting Chat</span>
          <span className="text-slate-400 text-xs font-semibold">({messages.length})</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className={cn(
              'p-1.5 rounded-lg transition-colors',
              showSearch 
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-805 dark:text-white' 
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
            )}
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => setChatMode('overlay')}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            title="Minimize to overlay"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={toggleChat}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Search bar */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-3 py-2 border-b border-slate-200 dark:border-dark-border">
              <input
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search messages…"
                className="w-full bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-dark-border text-sm px-3 py-2 rounded-lg placeholder-slate-400 outline-none focus:border-brand-primary"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-hide">
        {filteredMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-3xl mb-3">💬</div>
            <p className="text-slate-600 dark:text-slate-400 text-sm font-semibold">No messages yet</p>
            <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">Start the conversation!</p>
          </div>
        ) : (
          filteredMessages.map((msg, i) => {
            const prevMsg = i > 0 ? filteredMessages[i - 1] : null;
            const isOwn = (socket && msg.senderSocketId === socket.id) || (msg.userId && msg.userId === user?._id);
            const isSameSender = prevMsg && (
              (msg.senderSocketId && prevMsg.senderSocketId === msg.senderSocketId) ||
              (msg.userId && prevMsg.userId === msg.userId)
            );
            const showAvatar = !isSameSender;
            
            return (
              <motion.div
                key={msg._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn('flex gap-2 group', isOwn && 'flex-row-reverse')}
              >
                {/* Avatar */}
                {showAvatar && !isOwn ? (
                  <div className={cn('w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5 shadow-sm', getAvatarColor(msg.user.name))}>
                    {msg.user.avatar ? (
                      <img src={msg.user.avatar} alt={msg.user.name} className="w-full h-full rounded-full object-cover" />
                    ) : getInitials(msg.user.name)}
                  </div>
                ) : (
                  <div className="w-7 flex-shrink-0" />
                )}
                
                <div className={cn('flex flex-col gap-0.5', isOwn && 'items-end')}>
                  {showAvatar && (
                    <div className={cn('flex items-center gap-2', isOwn && 'flex-row-reverse')}>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{isOwn ? 'You' : msg.user.name}</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-550">{formatTime(msg.createdAt)}</span>
                    </div>
                  )}
                  
                  <div className={cn(
                    'px-3 py-2 rounded-2xl text-sm leading-relaxed max-w-[220px] break-words shadow-sm border',
                    isOwn 
                      ? 'bg-brand-primary text-white border-brand-primary/20 rounded-tr-sm' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200/60 dark:border-dark-border/40 rounded-tl-sm',
                  )}>
                    {msg.content}
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
        
        {/* Typing indicator */}
        {typingUsers.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 px-2"
          >
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ y: [-3, 0, -3] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                  className="w-1.5 h-1.5 bg-slate-400 rounded-full"
                />
              ))}
            </div>
            <span className="text-slate-400 dark:text-slate-500 text-xs font-medium">
              {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing…
            </span>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-slate-200 dark:border-dark-border">
        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-dark-border rounded-xl px-3 py-2">
          <input
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Send a message…"
            maxLength={1000}
            className="flex-1 bg-transparent text-slate-800 dark:text-slate-200 text-sm placeholder-slate-400 outline-none"
          />
          <div className="flex items-center gap-1">
            <button className="text-slate-400 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white transition-colors p-1">
              <Smile className="w-4 h-4" />
            </button>
            <button className="text-slate-400 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white transition-colors p-1">
              <Paperclip className="w-4 h-4" />
            </button>
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="text-brand-primary hover:text-brand-accent transition-colors disabled:opacity-40 p-1 ml-1"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
