'use client';

import { useState } from 'react';
import { X, Zap, Sparkles, FileText, CheckSquare, Search } from 'lucide-react';
import { useMeetingStore } from '@/store/meeting';
import { motion } from 'framer-motion';

interface AIPanelProps {
  meeting: any;
}

export function AIPanel({ meeting }: AIPanelProps) {
  const { toggleAI } = useMeetingStore();
  const [activeTab, setActiveTab] = useState<'summary' | 'transcript' | 'actions'>('summary');

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
        <div className="flex items-center gap-2 text-brand-primary">
          <Zap className="w-4 h-4 fill-brand-primary/10" />
          <span className="font-bold text-sm text-slate-800">EdiThink AI</span>
          <span className="bg-brand-primary/10 text-brand-primary text-[10px] font-bold px-1.5 py-0.5 rounded ml-1">BETA</span>
        </div>
        <button
          onClick={toggleAI}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex px-2 pt-2 border-b border-slate-200">
        {[
          { id: 'summary', icon: Sparkles, label: 'Summary' },
          { id: 'transcript', icon: FileText, label: 'Transcript' },
          { id: 'actions', icon: CheckSquare, label: 'Action Items' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-1.5 pb-2 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-brand-primary text-brand-primary'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50">
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
          <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center shadow-sm">
            <Zap className="w-8 h-8 text-brand-primary animate-pulse" />
          </div>
          <div>
            <h3 className="text-slate-800 font-bold text-sm mb-1">AI Assistant is listening…</h3>
            <p className="text-slate-500 text-xs leading-relaxed max-w-[240px] mx-auto">
              Summaries, transcripts, and action items will appear here automatically as the meeting progresses.
            </p>
          </div>
          
          <div className="w-full bg-white rounded-xl p-3 border border-slate-200 text-left mt-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-700 mb-2">Example questions you can ask:</div>
            <ul className="space-y-2">
              {['What did Maya say about the Q3 roadmap?', 'List all action items mentioned so far', 'Summarize the last 10 minutes'].map((q, i) => (
                <li key={i} className="text-xs text-slate-500 hover:text-brand-primary cursor-pointer transition-colors flex items-center gap-2 font-medium">
                  <div className="w-1.5 h-1.5 bg-brand-primary/60 rounded-full" />
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Input */}
      <div className="p-3 border-t border-slate-200">
        <div className="relative">
          <input
            placeholder="Ask AI a question…"
            className="w-full bg-slate-50 text-slate-800 text-sm pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-primary focus:bg-white transition-all placeholder-slate-400"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-primary p-1.5 hover:bg-brand-primary/10 rounded-lg transition-colors">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
