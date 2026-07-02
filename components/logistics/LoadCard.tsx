import React from 'react';
import { StatusBadge } from './StatusBadge';
import { Truck, MapPin, Calendar, Navigation } from 'lucide-react';
import { LoadDocument } from '@/lib/logistics/types';

interface LoadCardProps {
  load: LoadDocument;
  selected: boolean;
  onClick: () => void;
}

export function LoadCard({ load, selected, onClick }: LoadCardProps) {
  return (
    <div
      onClick={onClick}
      className={`ls-card`}
      style={{
        marginBottom: '12px',
        cursor: 'pointer',
        border: selected ? '1px solid var(--ls-primary)' : '1px solid var(--ls-border-color)',
        boxShadow: selected ? '0 0 15px rgba(59, 130, 246, 0.25)' : 'var(--ls-shadow)',
        background: selected ? 'var(--ls-bg-active)' : 'var(--ls-bg-card)',
        padding: '16px',
        transition: 'all 0.2s ease',
        display: 'block',
        textAlign: 'left'
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-black text-white">
          {load.loadNumber}
        </span>
        <StatusBadge status={load.status} />
      </div>

      {/* Origin -> Destination */}
      <div className="space-y-2 mb-4">
        <div className="flex items-start gap-2.5">
          <div className="flex flex-col items-center mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" style={{ boxShadow: '0 0 6px var(--ls-success)' }} />
            <span className="w-0.5 h-5 bg-white/10 my-0.5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider leading-none">Origin</p>
            <p className="text-xs font-bold text-slate-200 truncate mt-1">
              {load.pickupCity}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5" style={{ boxShadow: '0 0 6px var(--ls-danger)' }} />
          <div className="flex-1 min-w-0">
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider leading-none">Destination</p>
            <p className="text-xs font-bold text-slate-200 truncate mt-1">
              {load.deliveryCity}
            </p>
          </div>
        </div>
      </div>

      {/* Driver & Truck Info */}
      <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[10px] text-slate-500">
        <div className="flex items-center gap-1.5 min-w-0">
          <Truck size={12} className="text-slate-500 shrink-0" />
          <span className="truncate font-semibold text-slate-300">
            {load.driverName || 'Unassigned'}
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0 text-slate-500 font-medium">
          <Calendar size={12} />
          <span>
            {new Date(load.pickupDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>
    </div>
  );
}
