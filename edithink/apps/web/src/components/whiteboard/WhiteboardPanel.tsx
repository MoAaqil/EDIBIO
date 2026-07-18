'use client';

import { X } from 'lucide-react';
import { useMeetingStore } from '@/store/meeting';

export function WhiteboardPanel() {
  const { toggleWhiteboard } = useMeetingStore();

  return (
    <div className="h-full flex flex-col bg-white border-l border-slate-200 w-96 max-w-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
        <span className="text-slate-800 font-bold text-sm">Collaborative Whiteboard</span>
        <button
          onClick={toggleWhiteboard}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-slate-50/50">
        <div className="text-4xl mb-4">🎨</div>
        <h3 className="text-slate-800 font-bold mb-2">Whiteboard coming soon</h3>
        <p className="text-slate-500 text-xs leading-relaxed max-w-[240px]">
          A fully featured real-time collaborative whiteboard with infinite canvas is being built.
        </p>
      </div>
    </div>
  );
}
