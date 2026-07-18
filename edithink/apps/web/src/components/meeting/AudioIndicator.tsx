'use client';

import { motion } from 'framer-motion';
import { MicOff } from 'lucide-react';

interface AudioIndicatorProps {
  isMuted: boolean;
  isSpeaking: boolean;
  colorClass?: string;
}

export function AudioIndicator({ isMuted, isSpeaking, colorClass = 'bg-brand-primary' }: AudioIndicatorProps) {
  if (isMuted) {
    return (
      <div className="bg-danger/10 border border-danger/20 rounded-md p-1">
        <MicOff className="w-3 h-3 text-danger" />
      </div>
    );
  }

  if (isSpeaking) {
    return (
      <div className="flex items-center gap-0.5 h-3.5 px-1 bg-brand-primary/10 border border-brand-primary/20 rounded-md">
        {[1, 2, 3, 4].map((bar) => (
          <motion.div
            key={bar}
            animate={{
              height: [4, 14, 2, 11, 4],
            }}
            transition={{
              repeat: Infinity,
              duration: 0.5 + Math.random() * 0.4,
              ease: 'easeInOut',
              delay: bar * 0.1,
            }}
            className={`w-0.5 rounded-full ${colorClass}`}
          />
        ))}
      </div>
    );
  }

  // Unmuted but silent: subtle heartbeat pulse to show mic is active and listening
  return (
    <div className="flex items-center gap-0.5 h-3.5 px-1 bg-brand-primary/5 border border-brand-primary/15 rounded-md">
      {[1, 2, 3].map((bar) => (
        <motion.div
          key={bar}
          animate={{
            height: [2, 5, 2],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            delay: bar * 0.2,
          }}
          className="w-0.5 bg-brand-primary/60 rounded-full"
        />
      ))}
    </div>
  );
}
