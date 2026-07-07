'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import Sidebar from '@/components/logistics/Sidebar';
import TopBar from '@/components/logistics/TopBar';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import '@/app/logistics/logistics.css';

export default function LogisticsLayout({ children }: { children: React.ReactNode }) {
  const { activeCompanyId, isAuthenticated, isHydrating } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isHydrating) return;
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, isHydrating, router]);

  // Prevent flash during hydration
  if (isHydrating) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold tracking-wider opacity-75">Loading LoadSwift...</span>
        </div>
      </div>
    );
  }

  // Guard: Must have active company selected
  if (!activeCompanyId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 px-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full text-center shadow-xl shadow-black/40">
          <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldAlert size={32} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">No Active Company Selected</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            LoadSwift logistics runs inside your active ERP company context. Please select a company from your dashboard portal to access logistics tools.
          </p>
          <Link
            href="/companies"
            className="inline-flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-blue-600 hover:bg-blue-750 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 transition-all"
          >
            <ArrowLeft size={16} />
            <span>Select Company</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="ls-dark-theme ls-shell-container min-h-screen flex">
      {/* Sidebar navigation */}
      <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Main content body */}
      <div className="flex-1 flex flex-col lg:pl-64 lg:group-[.sidebar-is-collapsed]:pl-20 transition-all duration-300 min-h-screen">
        {/* Dynamic header content - Page updates this by using layout states, but standard header renders in-place */}
        <TopBar onMenuOpen={() => setMobileMenuOpen(true)} title="LoadSwift Logistics" />

        <main className="flex-1 flex flex-col overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
