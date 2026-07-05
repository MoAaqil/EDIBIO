import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  Package,
  Users,
  Truck,
  FileText,
  BarChart3,
  Settings,
  Fuel,
  Wrench,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useLogisticsStore } from '@/lib/logistics/store';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { sidebarCollapsed, setSidebarCollapsed } = useLogisticsStore();

  const NAV_ITEMS = [
    { href: '/logistics/tracking', icon: Compass, label: 'Live Tracking' },
    { href: '/logistics/loads', icon: Package, label: 'Loads' },
    { href: '/logistics/drivers', icon: Users, label: 'Drivers' },
    { href: '/logistics/vehicles', icon: Truck, label: 'Fleet & Assets' },
    { href: '/logistics/fuel', icon: Fuel, label: 'Fuel Expenses' },
    { href: '/logistics/maintenance', icon: Wrench, label: 'Maintenance' },
    { href: '/logistics/invoices', icon: FileText, label: 'Client Invoices' },
    { href: '/logistics/analytics', icon: BarChart3, label: 'Analytics' },
    { href: '/logistics/settings', icon: Settings, label: 'Settings' },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      {/* Sidebar background drawer on mobile */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/60 lg:hidden backdrop-blur-sm"
        />
      )}

      <aside
        className={`ls-sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Header/Logo */}
        <div className="ls-sidebar-brand">
          <Link href="/logistics/tracking" className="flex items-center gap-3 font-semibold overflow-hidden">
            <div className="ls-sidebar-logo shrink-0">
              <Truck size={18} className="text-white" />
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col text-left">
                <span className="text-sm font-black tracking-tight text-white leading-none">LoadSwift</span>
                <span className="text-[9px] text-slate-500 font-bold mt-1.5 uppercase tracking-wider">Logistics ERP</span>
              </div>
            )}
          </Link>
          {!sidebarCollapsed && (
            <button
              onClick={() => setSidebarCollapsed(true)}
              className="hidden lg:flex items-center justify-center w-6 h-6 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white ml-auto"
            >
              <ChevronLeft size={14} />
            </button>
          )}
          {sidebarCollapsed && (
            <button
              onClick={() => setSidebarCollapsed(false)}
              className="hidden lg:flex items-center justify-center w-6 h-6 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white mx-auto mt-2"
            >
              <ChevronRight size={14} />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="ls-sidebar-nav">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onClose()}
                className={`ls-nav-item ${active ? 'active' : ''} ${
                  sidebarCollapsed ? 'justify-center' : ''
                }`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon size={16} className={active ? 'text-blue-500' : 'text-slate-400 group-hover:text-white'} />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer actions: ERP return */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40">
          <Link
            href="/companies"
            className={`ls-nav-item hover:text-rose-400 ${
              sidebarCollapsed ? 'justify-center' : ''
            }`}
            title={sidebarCollapsed ? 'Back to ERP' : undefined}
          >
            <LogOut size={16} className="text-slate-400 rotate-180" />
            {!sidebarCollapsed && <span>Return to ERP</span>}
          </Link>
        </div>
      </aside>
    </>
  );
}
