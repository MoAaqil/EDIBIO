'use client';
import React, { useEffect, useState } from 'react';
import { useActiveCompany } from '@/lib/store';
import { Settings, Save, MapPin, Database, RefreshCw, Key } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const company = useActiveCompany();
  const companyId = company?.id || '';

  const [mapboxToken, setMapboxToken] = useState('');
  const [isSeeding, setIsSeeding] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem('ls_mapbox_token') || '';
      setMapboxToken(savedToken);
    }
  }, []);

  const handleSaveToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('ls_mapbox_token', mapboxToken.trim());
      // Also update process env variable temporarily in-session for Mapbox
      (process.env as any).NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN = mapboxToken.trim();
      toast.success('Mapbox Access Token saved to local storage!');
    }
  };

  const triggerSeed = async () => {
    if (!companyId) {
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
        body: JSON.stringify({ companyId })
      });

      if (!res.ok) {
        throw new Error('Seed request failed');
      }

      toast.success('Logistics demo data seeded successfully!', { id: toastId });
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
    <div className="flex-1 p-6 max-w-4xl mx-auto space-y-6 bg-slate-50 dark:bg-slate-950 overflow-y-auto text-left no-scrollbar">
      {/* Settings Header */}
      <div className="flex items-center gap-2 mb-2">
        <Settings className="text-blue-500" size={22} />
        <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">Module Settings</h2>
      </div>

      {/* Mapbox Token config */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <Key size={16} className="text-blue-500" />
          <span>API Credentials & Maps</span>
        </h3>
        <p className="text-xs text-slate-450 leading-relaxed">
          LoadSwift uses Mapbox GL JS to display real-time vehicle routes. Enter your Mapbox Access Token here. If left blank, LoadSwift falls back to drawing procedural route track paths.
        </p>

        <form onSubmit={handleSaveToken} className="space-y-4 pt-2">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Mapbox Access Token</label>
            <input
              type="password"
              placeholder="pk.eyJ1Ijo..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-755 rounded-xl shadow-sm transition-all"
          >
            <Save size={14} />
            <span>Save Settings</span>
          </button>
        </form>
      </div>

      {/* Database control / seed */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <Database size={16} className="text-blue-500" />
          <span>Database Administration</span>
        </h3>
        <p className="text-xs text-slate-450 leading-relaxed">
          Need sample data to evaluate LoadSwift features? You can populate your active company database with mock loads, drivers, assets, and invoices.
        </p>

        <div className="pt-2">
          <button
            onClick={triggerSeed}
            disabled={isSeeding}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all disabled:opacity-50
              ${isSeeding ? 'animate-pulse' : ''}
            `}
          >
            <Database size={14} />
            <span>{isSeeding ? 'Seeding Database...' : 'Seed Mock Logistics Data'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
