'use client';
import { Search, Bell, ChevronDown, Menu, Store, Crown, PanelLeftClose, PanelLeftOpen, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useStore, useActiveCompany, useCompanyData } from '@/lib/store';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import SyncIndicator from './SyncIndicator';
import { deriveTitleFromPath } from '@/lib/utils';

interface TopbarProps {
    title?: string;
    onMenuOpen?: () => void;
    onDesktopToggle?: () => void;
    isSidebarCollapsed?: boolean;
}

export default function Topbar({ title, onMenuOpen, onDesktopToggle, isSidebarCollapsed }: TopbarProps) {
    const { user, resetAll } = useStore();
    const company = useActiveCompany();
    const products = useCompanyData('products') as any[] || [];
    const parties = useCompanyData('parties') as any[] || [];

    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const displayTitle = title || deriveTitleFromPath(pathname);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            if (user?.uid) {
                localStorage.removeItem(`sync_${user.uid}`);
                localStorage.removeItem(`sync_ts_${user.uid}`);
            }
            resetAll();
            router.push('/');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const daysLeft = useMemo(() => {
        if (!user?.trialExpiresAt) return 0;
        return Math.max(0, Math.ceil((new Date(user.trialExpiresAt).getTime() - Date.now()) / 86400000));
    }, [user?.trialExpiresAt]);

    const notifications = useMemo(() => {
        const notifs = [];

        // 1. Stock Alerts
        const lowStockCount = products.filter(p => p.stockQty <= (p.lowStockAlertQty || 5)).length;
        if (lowStockCount > 0) {
            notifs.push({
                id: 'stock', title: 'Low Stock Alert',
                desc: `${lowStockCount} items are running low. Please reorder.`,
                time: 'Just now', type: 'warning', link: '/company/inventory?filter=low'
            });
        }

        // 2. Pending Receivables
        const overdue = parties.filter(p => p.balance > 0);
        const totalReceivable = overdue.reduce((a, b) => a + b.balance, 0);
        if (totalReceivable > 0) {
            notifs.push({
                id: 'payments', title: 'Receivables Due',
                desc: `You have ₹${totalReceivable.toLocaleString('en-IN')} pending from ${overdue.length} parties.`,
                time: 'Today', type: 'info', link: '/company/parties'
            });
        }

        // 3. System / Trial
        if (daysLeft > 0 && daysLeft <= 3) {
            notifs.push({
                id: 'trial', title: 'Trial Ending Soon',
                desc: `Your Pro trial ends in ${daysLeft} days. Upgrade now.`,
                time: 'System', type: 'critical', link: '/subscription'
            });
        }

        return notifs;
    }, [products, parties, daysLeft]);

    return (
        <header className="app-topbar">
            {/* Desktop sidebar toggle — hidden on mobile */}
            <button
                onClick={onDesktopToggle}
                className="btn btn-ghost btn-icon desktop-sidebar-toggle"
                title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
                {isSidebarCollapsed
                    ? <PanelLeftOpen size={18} color="#4A5568" />
                    : <PanelLeftClose size={18} color="#4A5568" />}
            </button>

            {/* Mobile hamburger — hidden on desktop */}
            <button
                onClick={onMenuOpen}
                className="btn btn-ghost btn-icon"
                style={{ display: 'none', marginRight: 8 }}
                id="mobile-menu-btn"
            >
                <Menu size={20} color="#4A5568" />
            </button>

            {/* Edibio logo — mobile only (centered in topbar) */}
            <div className="mobile-topbar-logo" id="mobile-logo">
                <Image src="/logo-full.jpg" alt="Edibio" width={90} height={28} style={{ objectFit: 'contain', width: 'auto', height: 28 }} priority />
            </div>

            {/* Page title (desktop) */}
            {displayTitle && (
                <h1 style={{ fontSize: 18, fontWeight: 800, color: '#1A1A2E', flex: 1 }}>{displayTitle}</h1>
            )}

            {/* Godown selector */}
            {company && company.godowns.length > 1 && (
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }} className="godown-selector">
                    <Store size={14} color="#718096" />
                    <select className="e-select" style={{ width: 'auto', padding: '6px 10px', fontSize: 12 }}>
                        {company.godowns.map(g => (
                            <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* Spacer */}
            <div style={{ flex: 1 }} className="mobile-hide" />

            {/* Trial Alert */}
            {user?.trialExpiresAt && daysLeft > 0 && user?.role !== 'staff' && user?.role !== 'manager' && (
                <div style={{
                    marginRight: 12, background: 'linear-gradient(135deg, rgba(234,67,53,0.1), rgba(234,67,53,0.05))',
                    border: '1px solid rgba(234,67,53,0.3)', padding: '6px 12px', borderRadius: '20px',
                    display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap'
                }} className="trial-alert-badge">
                    <span style={{ fontSize: 12, fontWeight: 800, color: '#DC2626' }}>
                        Trial: {daysLeft} Days Left
                    </span>
                    <Link href="/subscription" style={{ background: '#EA4335', color: 'white', textDecoration: 'none', padding: '4px 10px', borderRadius: '12px', fontSize: 10, fontWeight: 900, boxShadow: '0 2px 8px rgba(234,67,53,0.3)' }}>
                        UPGRADE
                    </Link>
                </div>
            )}

            {/* Right side actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {/* Sync indicator */}
                <SyncIndicator />

                {/* Search (desktop) */}
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }} className="topbar-search">
                    <Search size={15} style={{ position: 'absolute', left: 10, color: '#A0AEC0' }} />
                    <input
                        type="text"
                        placeholder="Search…"
                        style={{
                            paddingLeft: 32, paddingRight: 12, paddingTop: 7, paddingBottom: 7,
                            border: '1.5px solid #E1E4E8', borderRadius: 10, fontSize: 13,
                            background: '#F8F9FA', color: '#1A1A2E', outline: 'none', width: 160,
                        }}
                    />
                </div>

                {/* Switch Company */}
                <Link href="/companies" className="btn btn-ghost btn-icon mobile-hide" title="Switch Company">
                    <Store size={18} color="#4A5568" />
                </Link>

                {/* Keyboard Shortcuts Trigger */}
                <button
                    onClick={() => window.dispatchEvent(new Event('open-shortcuts-guide'))}
                    className="btn btn-ghost btn-icon mobile-hide"
                    title="Keyboard Shortcuts (Press ?)"
                >
                    <HelpCircle size={18} color="#4A5568" />
                </button>

                {/* Notifications */}
                <div style={{ position: 'relative' }}>
                    <button onClick={() => setShowNotifications(v => !v)} className="btn btn-ghost btn-icon" style={{ position: 'relative' }}>
                        <Bell size={18} color="#4A5568" />
                        {notifications.length > 0 && (
                            <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, background: '#EA4335', borderRadius: 999, border: '1.5px solid white' }} />
                        )}
                    </button>

                    {showNotifications && (
                        <div className="notification-dropdown" style={{ position: 'absolute', top: 48, background: 'white', border: '1px solid #E2E8F0', borderRadius: 16, boxShadow: '0 20px 40px rgba(0,0,0,0.15)', zIndex: 60, overflow: 'hidden' }}>
                            <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F3F5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC' }}>
                                <h4 style={{ fontWeight: 800, fontSize: 14, color: '#1A1A2E', margin: 0 }}>Notifications</h4>
                                <span style={{ background: '#E2E8F0', color: '#4A5568', padding: '2px 8px', borderRadius: 99, fontSize: 10, fontWeight: 700 }}>{notifications.length} New</span>
                            </div>
                            <div style={{ maxHeight: 340, overflowY: 'auto' }}>
                                {notifications.length === 0 ? (
                                    <div style={{ padding: '30px 20px', textAlign: 'center' }}>
                                        <Bell size={24} color="#CBD5E0" style={{ margin: '0 auto 10px' }} />
                                        <p style={{ fontSize: 13, color: '#718096', fontWeight: 600 }}>You're all caught up!</p>
                                    </div>
                                ) : (
                                    notifications.map(n => (
                                        <div key={n.id} onClick={() => { setShowNotifications(false); if (n.link) router.push(n.link); }} style={{ padding: '14px 20px', borderBottom: '1px solid #F1F3F5', cursor: 'pointer', transition: 'background 0.1s' }} className="user-menu-item">
                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                                                <div style={{ width: 8, height: 8, borderRadius: 99, background: n.type === 'warning' ? '#FBBC04' : n.type === 'critical' ? '#EA4335' : '#4285F4', marginTop: 6 }} />
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                                        <p style={{ fontSize: 13, fontWeight: 800, color: '#1A1A2E', margin: 0 }}>{n.title}</p>
                                                        <span style={{ fontSize: 10, color: '#A0AEC0', fontWeight: 600 }}>{n.time}</span>
                                                    </div>
                                                    <p style={{ fontSize: 12, color: '#4A5568', margin: 0, lineHeight: 1.4 }}>{n.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* User avatar */}
                <button
                    onClick={() => setShowUserMenu(v => !v)}
                    className="topbar-user"
                    style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px', borderRadius: 10 }}
                >
                    <div style={{
                        width: 32, height: 32, borderRadius: 999, overflow: 'hidden',
                        background: 'linear-gradient(135deg,#4285F4,#34A853)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontWeight: 800, fontSize: 13,
                    }}>
                        {user?.photoUrl ? (
                            <Image src={user.photoUrl} alt="" width={32} height={32} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            (user?.name || 'U')[0]
                        )}
                    </div>
                    <div style={{ textAlign: 'left' }} className="topbar-userinfo">
                        <p style={{ fontSize: 12, fontWeight: 700, color: '#1A1A2E', lineHeight: 1 }}>{user?.name?.split(' ')[0] || 'User'}</p>
                        <p style={{ fontSize: 10, color: '#A0AEC0', lineHeight: 1, marginTop: 2 }}>PRO Plan</p>
                    </div>
                    <ChevronDown size={12} color="#A0AEC0" />
                </button>

                {showUserMenu && (
                    <div style={{ position: 'absolute', top: 56, right: 20, width: 200, background: 'white', border: '1px solid #E2E8F0', borderRadius: 12, boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: 8, zIndex: 60, display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <button onClick={() => { setShowUserMenu(false); window.dispatchEvent(new Event('start-edibio-tutorial')); }} style={{ padding: '10px 12px', background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer', borderRadius: 8, fontSize: 13, fontWeight: 700, color: '#4A5568' }} className="user-menu-item">
                            🎓 Play Tutorial
                        </button>
                        <button onClick={() => { setShowUserMenu(false); router.push('/subscription'); }} className="mobile-only-menu-item user-menu-item" style={{ padding: '10px 12px', background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer', borderRadius: 8, fontSize: 13, fontWeight: 700, color: '#9333EA', display: 'none' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Crown size={14} /> Upgrade Plan</span>
                        </button>
                        <button onClick={handleLogout} style={{ padding: '10px 12px', background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer', borderRadius: 8, fontSize: 13, fontWeight: 700, color: '#E53E3E' }} className="user-menu-item">
                            Log out
                        </button>
                    </div>
                )}
            </div>

            <style>{`
          .user-menu-item:hover { background: #F7FAFC !important; }
          .notification-dropdown { right: 0; width: 320px; }
          @media (max-width: 639px) {
            .notification-dropdown {
                position: fixed !important;
                top: 56px !important;
                left: 10px !important;
                right: 10px !important;
                width: auto !important;
                z-index: 100 !important;
            }
            #mobile-menu-btn { display: flex !important; margin-right: 0 !important; }
            /* Mobile logo: absolute centre, won't overflow */
            .mobile-topbar-logo {
                display: flex !important;
                position: absolute !important;
                left: 50% !important;
                top: 50% !important;
                transform: translate(-50%, -50%) !important;
                align-items: center !important;
                justify-content: center !important;
                pointer-events: none;
            }
            .mobile-topbar-logo img {
                height: 26px !important;
                width: auto !important;
                max-width: 110px !important;
            }
            .topbar-search { display: none !important; }
            .topbar-userinfo { display: none !important; }
            .app-topbar h1 { display: none !important; }
            .trial-alert-badge { display: none !important; }
            .mobile-only-menu-item { display: block !important; }
            .godown-selector, .mobile-hide { display: none !important; }
          }
          /* Hide logo on desktop */
          @media (min-width: 640px) {
            .mobile-topbar-logo { display: none !important; }
          }
      `}</style>
        </header>
    );
}
