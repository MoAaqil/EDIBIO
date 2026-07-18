'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Home, Video, Calendar, Clock, Settings,
  LogOut, Plus, Search, Bell, BellOff, ChevronRight, Download
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { getInitials, getAvatarColor, cn } from '@/lib/utils';
import api from '@/lib/api';
import { toast } from '@/components/ui/toaster';

const NAV_GROUPS = [
  {
    label: 'General',
    items: [
      { icon: Home,     label: 'Home',       href: '/home' },
      { icon: Video,    label: 'Meetings',   href: '/home/meetings' },
      { icon: Calendar, label: 'Calendar',   href: '/home/calendar' },
      { icon: Clock,    label: 'Recordings', href: '/home/recordings' },
    ],
  },
];

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading, refreshUser, logout } = useAuthStore();

  const [notifications, setNotifications]   = useState<any[]>([]);
  const [unreadCount, setUnreadCount]        = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifiedMeetingsRef = useRef<Record<string, boolean>>({});

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstallable(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install: ${outcome}`);
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  /* ── Notifications ── */
  const fetchNotifications = async () => {
    try {
      const res  = await api.get('/notifications');
      const list = res.data.notifications || [];
      setNotifications(list);
      setUnreadCount(list.filter((n: any) => !n.isRead).length);
    } catch { /* silent */ }
  };

  const markAllAsRead = async () => {
    try {
      await api.patch('/notifications/read-all');
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch { /* silent */ }
  };

  const markAsRead = async (id: string) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch { /* silent */ }
  };

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setShowNotifications(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchNotifications();
    const iv = setInterval(fetchNotifications, 45000);
    return () => clearInterval(iv);
  }, [isAuthenticated]);

  /* ── Upcoming meeting reminders ── */
  useEffect(() => {
    if (!isAuthenticated) return;
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default')
      Notification.requestPermission();

    const check = async () => {
      try {
        const res = await api.get('/meetings?status=scheduled');
        const now = Date.now();
        (res.data.meetings || []).forEach((m: any) => {
          if (!m.scheduledAt) return;
          const diff = (new Date(m.scheduledAt).getTime() - now) / 60000;
          if (diff > 0 && diff <= 5 && !notifiedMeetingsRef.current[m._id]) {
            notifiedMeetingsRef.current[m._id] = true;
            toast({ title: '📅 Meeting Reminder', description: `"${m.title}" starts in ${Math.ceil(diff)} min!` });
            if ('Notification' in window && Notification.permission === 'granted')
              new window.Notification('Meeting Reminder', { body: `"${m.title}" starts in ${Math.ceil(diff)} min!`, icon: '/favicon.ico' });
          }
        });
      } catch { /* silent */ }
    };
    check();
    const iv = setInterval(check, 30000);
    return () => clearInterval(iv);
  }, [isAuthenticated]);

  /* ── Auth guard ── */
  useEffect(() => {
    if (!isAuthenticated && !isLoading)
      refreshUser().then(() => {
        if (!useAuthStore.getState().isAuthenticated) router.push('/login');
      });
  }, [isAuthenticated, isLoading, router, refreshUser]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F8FAFC' }}>
        <div className="w-10 h-10 border-[3px] border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#FAFAFB' }}>

      {/* ══════════════════ SIDEBAR ══════════════════ */}
      <aside
        className="hidden md:flex flex-col flex-shrink-0"
        style={{
          width: 240,
          background: '#FFFFFF',
          borderRight: '1px solid #ECECEC',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5" style={{ borderBottom: '1px solid #ECECEC' }}>
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none" className="flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="url(#et-g)"/>
            <path d="M9 9h14v3H12v2.5h9v3h-9V20h11v3H9Z" fill="white"/>
            <defs>
              <linearGradient id="et-g" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#3B82F6"/>
                <stop offset="100%" stopColor="#6366F1"/>
              </linearGradient>
            </defs>
          </svg>
          <span className="font-bold text-base" style={{ color: '#0F172A', letterSpacing: '-0.02em' }}>EdiThink</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
          {NAV_GROUPS.map(group => (
            <div key={group.label}>
              <p className="section-label mb-2">{group.label}</p>
              <div className="space-y-0.5">
                {group.items.map(item => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn('nav-item', active && 'nav-item-active')}
                    >
                      <item.icon size={18} fill={active ? 'currentColor' : 'none'} strokeWidth={active ? 2.2 : 1.8} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom — User + Actions */}
        <div className="p-4" style={{ borderTop: '1px solid #ECECEC' }}>
          <div className="p-3 bg-white border border-[#ECECEC] rounded-[18px] shadow-sm flex flex-col gap-3 transition-all duration-200 hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className={cn(
                'w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0',
                getAvatarColor(user.name)
              )}>
                {user.avatar
                  ? <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                  : getInitials(user.name)
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: '#0F172A' }}>{user.name}</p>
                <p className="text-xs truncate" style={{ color: '#64748B' }}>{user.email}</p>
              </div>
            </div>

            <div className="flex gap-2" style={{ borderTop: '1px solid #ECECEC', paddingTop: '10px' }}>
              <Link
                href="/home/settings"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[14px] text-xs font-semibold transition-all hover:bg-gray-50 border border-transparent hover:border-[#ECECEC]"
                style={{ color: '#64748B' }}
              >
                <Settings size={14} />
                Settings
              </Link>
              <button
                onClick={logout}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[14px] text-xs font-semibold transition-all hover:bg-red-50 border border-transparent hover:border-red-100"
                style={{ color: '#EF4444' }}
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* ══════════════════ MAIN ══════════════════ */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* ── Top Bar ── */}
        <header
          className="flex-shrink-0 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30"
          style={{
            height: 72,
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid #ECECEC',
          }}
        >
          {/* Logo on Mobile */}
          <div className="flex md:hidden items-center gap-2 mr-2">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="url(#et-g-m)"/>
              <path d="M9 9h14v3H12v2.5h9v3h-9V20h11v3H9Z" fill="white"/>
              <defs>
                <linearGradient id="et-g-m" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#3B82F6"/>
                  <stop offset="100%" stopColor="#6366F1"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="font-bold text-sm" style={{ color: '#0F172A', letterSpacing: '-0.02em' }}>EdiThink</span>
          </div>

          {/* Search */}
          <div className="relative flex-1 hidden sm:block" style={{ maxWidth: 480 }}>
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#64748B' }} />
            <input
              placeholder="Search meetings, recordings…"
              className="w-full pl-11 pr-4 text-sm transition-all outline-none"
              style={{
                background: '#FAFAFB',
                border: '1px solid #ECECEC',
                borderRadius: 16,
                height: 48,
                color: '#0F172A',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
              onFocus={e => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.borderColor = '#2563EB';
                e.currentTarget.style.boxShadow = '0 0 0 4px rgba(37,99,235,0.08)';
              }}
              onBlur={e => {
                e.currentTarget.style.background = '#FAFAFB';
                e.currentTarget.style.borderColor = '#ECECEC';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
              }}
            />
          </div>

          {/* Right side items */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto sm:ml-0">
            {/* Install App Button */}
            {isInstallable && (
              <button
                onClick={handleInstallClick}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-600 rounded-full text-xs font-semibold shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Download size={14} />
                <span className="hidden sm:inline">Install App</span>
              </button>
            )}

            {/* Workspace Badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-white border border-[#ECECEC] rounded-full text-xs font-semibold shadow-sm" style={{ color: '#64748B' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse-soft" />
              <span>Personal Workspace</span>
            </div>

            {/* Bell */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => { setShowNotifications(!showNotifications); if (!showNotifications) fetchNotifications(); }}
                className="relative flex items-center justify-center rounded-xl transition-colors border border-transparent hover:border-[#ECECEC] hover:bg-gray-50"
                style={{ width: 40, height: 40, background: showNotifications ? '#EEF4FF' : 'transparent' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#F3F4F6')}
                onMouseLeave={e => (e.currentTarget.style.background = showNotifications ? '#EEF4FF' : 'transparent')}
              >
                <Bell size={19} style={{ color: '#64748B' }} />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 text-white text-[9px] font-bold flex items-center justify-center rounded-full"
                    style={{ background: '#2563EB', fontSize: 9 }}>
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.13 }}
                    className="absolute right-0 mt-2 overflow-hidden shadow-card"
                    style={{
                      width: 320,
                      background: '#FFFFFF',
                      border: '1px solid #ECECEC',
                      borderRadius: 16,
                      zIndex: 50,
                    }}
                  >
                    <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid #F3F4F6' }}>
                      <span className="text-sm font-semibold" style={{ color: '#0F172A' }}>Notifications</span>
                      {unreadCount > 0 && (
                        <button onClick={markAllAsRead} className="text-xs font-semibold" style={{ color: '#2563EB' }}>
                          Mark all read
                        </button>
                      )}
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="py-10 flex flex-col items-center gap-2">
                          <BellOff size={28} style={{ color: '#D1D5DB' }} />
                          <p className="text-sm" style={{ color: '#9CA3AF' }}>All caught up!</p>
                        </div>
                      ) : notifications.map(n => (
                        <div
                          key={n._id}
                          onClick={() => { if (!n.isRead) markAsRead(n._id); if (n.link) { router.push(n.link); setShowNotifications(false); } }}
                          className="flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors"
                          style={{ background: n.isRead ? 'transparent' : '#F8FBFF', borderBottom: '1px solid #F9FAFB' }}
                          onMouseEnter={e => (e.currentTarget.style.background = '#F9FAFB')}
                          onMouseLeave={e => (e.currentTarget.style.background = n.isRead ? 'transparent' : '#F8FBFF')}
                        >
                          {!n.isRead && <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#2563EB' }} />}
                          <div className={cn('flex-1 min-w-0', !n.isRead && 'pl-0', n.isRead && 'pl-[10px]')}>
                            <p className="text-sm font-semibold truncate" style={{ color: '#0F172A' }}>{n.title}</p>
                            <p className="text-xs mt-0.5 line-clamp-2" style={{ color: '#64748B' }}>{n.body}</p>
                          </div>
                          <span className="text-xs flex-shrink-0 mt-0.5" style={{ color: '#9CA3AF' }}>
                            {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Profile Link */}
            <Link
              href="/home/settings"
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0 cursor-pointer transition-transform hover:scale-105 border border-[#ECECEC] shadow-sm',
                getAvatarColor(user.name)
              )}
            >
              {user.avatar
                ? <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                : getInitials(user.name)
              }
            </Link>

            {/* New Meeting */}
            <button
              onClick={() => router.push('/home/calendar')}
              className="btn-primary hidden sm:inline-flex"
              style={{ height: 40, padding: '0 16px', fontSize: 13 }}
            >
              <Plus size={16} />
              New Meeting
            </button>
          </div>
        </header>

        {/* ── Page Content ── */}
        <div className="flex-1 overflow-y-auto px-4 py-6 md:p-8 pb-20 md:pb-8">
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            {children}
          </div>
        </div>
      </main>

      {/* ══════════════════ MOBILE BOTTOM TAB BAR ══════════════════ */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden flex items-center justify-around bg-white/95 backdrop-blur-md border-t border-[#ECECEC] px-2 shadow-lg"
        style={{ height: 64 }}
      >
        {[
          { icon: Home,     label: 'Home',       href: '/home' },
          { icon: Video,    label: 'Meetings',   href: '/home/meetings' },
          { icon: Calendar, label: 'Calendar',   href: '/home/calendar' },
          { icon: Clock,    label: 'Recordings', href: '/home/recordings' },
          { icon: Settings, label: 'Settings',   href: '/home/settings' },
        ].map(item => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1.5 flex-1 py-1 text-center"
              style={{ color: active ? '#2563EB' : '#64748B' }}
            >
              <item.icon size={20} fill={active ? 'currentColor' : 'none'} strokeWidth={active ? 2.2 : 1.8} />
              <span style={{ fontSize: 10, fontWeight: active ? 600 : 500 }}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
