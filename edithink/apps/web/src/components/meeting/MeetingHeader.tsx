'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Wifi, WifiOff, Users, Video } from 'lucide-react';
import { useMeetingStore } from '@/store/meeting';
import { formatDuration } from '@/lib/utils';

interface MeetingHeaderProps {
  meeting: any;
  roomId: string;
}

export function MeetingHeader({ meeting, roomId }: MeetingHeaderProps) {
  const [duration, setDuration] = useState(0);
  const [startTime] = useState(Date.now());
  const { participants, isRecording, connectionQuality } = useMeetingStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const qualityColor = {
    excellent: 'text-success',
    good: 'text-warning',
    poor: 'text-danger',
    disconnected: 'text-danger',
  }[connectionQuality];

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white/95 backdrop-blur-md border-b border-slate-200 z-30 w-full">
      {/* Left: Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-slate-800 font-semibold text-sm truncate max-w-48">
            {meeting?.title || 'Meeting'}
          </span>
        </div>
        <span className="text-brand-primary text-xs font-semibold font-mono bg-brand-primary/10 px-2 py-0.5 rounded">
          {roomId}
        </span>
      </div>

      {/* Center: Timer */}
      <div className="flex items-center gap-2">
        {isRecording && (
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex items-center gap-1.5 bg-danger/10 text-danger px-3 py-1 rounded-lg text-xs font-semibold border border-danger/20"
          >
            <div className="w-2 h-2 bg-danger rounded-full" />
            REC
          </motion.div>
        )}
        <div className="flex items-center gap-1.5 text-slate-700 text-sm font-mono">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          {formatDuration(duration)}
        </div>
      </div>

      {/* Right: Stats */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-slate-600 text-xs">
          <Users className="w-3.5 h-3.5" />
          <span>{participants.length + 1}</span>
        </div>
        <div className={`flex items-center gap-1 text-xs ${qualityColor}`}>
          {connectionQuality === 'disconnected' ? (
            <WifiOff className="w-3.5 h-3.5" />
          ) : (
            <Wifi className="w-3.5 h-3.5" />
          )}
          <span className="hidden sm:inline capitalize">{connectionQuality}</span>
        </div>
      </div>
    </div>
  );
}
