import React, { useState } from 'react';
import { Menu, Bell, RefreshCw, Plus, CheckCircle, Database } from 'lucide-react';
import { useStore, useActiveCompany } from '@/lib/store';
import toast from 'react-hot-toast';

interface TopBarProps {
  onMenuOpen: () => void;
  title: string;
}

export default function TopBar({ onMenuOpen, title }: TopBarProps) {
  const company = useActiveCompany();
  const { user } = useStore();
  const [isSeeding, setIsSeeding] = useState(false);

  const triggerSeed = async () => {
    if (!company?.id) {
      toast.error('No active company selected');
      return;
    }

    if (!confirm('Are you sure you want to seed logistics demo data? This will clear any existing LoadSwift records for this company and replace them with fresh realistic demo data.')) {
      return;
    }

    setIsSeeding(true);
    const toastId = toast.loading('Seeding realistic logistics demo data...');
    try {
      const res = await fetch('/api/logistics/seed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ companyId: company.id })
      });

      if (!res.ok) {
        throw new Error('Seed request failed');
      }

      toast.success('Logistics demo data seeded! Refreshing page...', { id: toastId });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err: any) {
      toast.error(`Error: ${err.message}`, { id: toastId });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 shrink-0" style={{ background: 'var(--ls-bg-sidebar)', borderBottom: '1px solid var(--ls-border-color)' }}>
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          onClick={onMenuOpen}
          className="p-2 -ml-2 rounded-lg lg:hidden hover:bg-white/5 text-slate-400"
        >
          <Menu size={20} />
        </button>

        {/* Title */}
        <h1 className="text-sm font-black text-white uppercase tracking-wider">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Demo Data Seeder Button */}
        <button
          onClick={triggerSeed}
          disabled={isSeeding}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl text-white bg-indigo-650 hover:bg-indigo-700 shadow-sm transition-all disabled:opacity-50
            ${isSeeding ? 'animate-pulse' : ''}
          `}
          title="Seed realistic logistics mock data"
          style={{ boxShadow: '0 4px 15px rgba(99,102,241,0.2)' }}
        >
          <Database size={13} />
          <span>{isSeeding ? 'Seeding...' : 'Seed Demo Data'}</span>
        </button>

        {/* Active Company Badge */}
        {company && (
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full border" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'var(--ls-border-color)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold text-slate-300 max-w-[140px] truncate">
              {company.name}
            </span>
          </div>
        )}

        {/* Notifications Icon */}
        <button className="p-2 text-slate-400 hover:bg-white/5 rounded-xl relative">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full" />
        </button>

        {/* User profile / Avatar */}
        <div className="flex items-center gap-3 border-l border-white/10 pl-4">
          <div className="flex flex-col text-right hidden md:flex">
            <span className="text-xs font-bold text-white leading-none">
              {user?.name || 'Dispatcher'}
            </span>
            <span className="text-[9px] text-slate-500 font-bold mt-1 uppercase tracking-wide">
              {user?.role?.replace('_', ' ') || 'Admin'}
            </span>
          </div>
          <div 
            className="w-8.5 h-8.5 rounded-xl flex items-center justify-center font-bold text-xs shrink-0"
            style={{ background: 'var(--ls-bg-active)', color: 'var(--ls-primary)', border: '1px solid rgba(59,130,246,0.2)' }}
          >
            {(user?.name || 'D')[0].toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
