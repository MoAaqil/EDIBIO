'use client';

import { Monitor, X, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

interface ScreenShareOverlayProps {
  onStop: () => void;
  onMore?: () => void;
}

export function ScreenShareOverlay({ onStop, onMore }: ScreenShareOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-brand-primary rounded-2xl px-4.5 py-3 shadow-premium-lg border border-blue-450 pointer-events-auto"
    >
      <div className="flex items-center gap-2 text-white font-bold text-xs">
        <Monitor className="w-4 h-4 animate-pulse" />
        You are sharing your screen
      </div>
      <div className="w-px h-4 bg-white/30" />
      <button
        onClick={onStop}
        className="flex items-center gap-1.5 bg-white text-blue-600 hover:bg-slate-100 text-xs font-bold px-3 py-1.5 rounded-xl transition-all duration-200"
      >
        <X className="w-3.5 h-3.5" />
        Stop Sharing
      </button>
      {onMore && (
        <>
          <div className="w-px h-4 bg-white/30" />
          <button
            onClick={onMore}
            className="flex items-center justify-center text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-lg transition-colors"
            title="More Options"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </>
      )}
    </motion.div>
  );
}
