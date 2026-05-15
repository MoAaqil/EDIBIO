'use client';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import BottomNav from './BottomNav';
import Tutorial from './Tutorial';
import KeyboardShortcuts from './KeyboardShortcuts';
import { ConfirmDialog } from './ConfirmDialog';
import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import Link from 'next/link';
import { X, Lock, Smartphone, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AppLayoutProps {
    children: React.ReactNode;
    title?: string;
}

function DemoBanner() {
    const { isDemo, demoExpiresAt } = useStore();
    const [dismissed, setDismissed] = useState(false);
    const [minsLeft, setMinsLeft] = useState(60);

    useEffect(() => {
        if (!isDemo || !demoExpiresAt) return;
        const tick = () => {
            const ms = new Date(demoExpiresAt).getTime() - Date.now();
            setMinsLeft(Math.max(0, Math.ceil(ms / 60000)));
        };
        tick();
        const id = setInterval(tick, 30000);
        return () => clearInterval(id);
    }, [isDemo, demoExpiresAt]);

    if (!isDemo || dismissed) return null;

    return (
        <div style={{
            background: 'linear-gradient(135deg, #065F46 0%, #047857 100%)',
            color: 'white', padding: '10px 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
            fontSize: 13, fontWeight: 600,
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>🎯</span>
                <span>Demo Mode — <strong>{minsLeft} min{minsLeft !== 1 ? 's' : ''} remaining</strong>. Your data won't be saved.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Link href="/subscription" style={{
                    background: 'rgba(255,255,255,0.15)', color: 'white',
                    padding: '5px 14px', borderRadius: 8, textDecoration: 'none',
                    fontWeight: 700, fontSize: 12, border: '1px solid rgba(255,255,255,0.3)',
                    whiteSpace: 'nowrap',
                }}>
                    Sign Up Free →
                </Link>
                <button onClick={() => setDismissed(true)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', padding: 2 }}>
                    <X size={14} />
                </button>
            </div>
        </div>
    );
}

function SubscriptionGuard({ children }: { children: React.ReactNode }) {
    const { user, isDemo } = useStore();
    const router = useRouter();
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        setIsDesktop(window.innerWidth > 768);
        const handleResize = () => setIsDesktop(window.innerWidth > 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (isDemo || !user || user.role === 'admin') return <>{children}</>;

    const expiryStr = user.subscriptionExpiresAt || user.trialExpiresAt;
    const isExpired = expiryStr ? new Date(expiryStr).getTime() < Date.now() : false;

    let daysLeft = 0;
    if (expiryStr) {
        const ms = new Date(expiryStr).getTime() - Date.now();
        daysLeft = Math.ceil(ms / 86400000);
    }

    // Is it entirely expired?
    if (isExpired) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#F8F9FA', padding: 20, textAlign: 'center' }}>
                <ShieldAlert size={64} color="#E53E3E" style={{ marginBottom: 20 }} />
                <h1 style={{ fontSize: 28, fontWeight: 900, color: '#1A1A2E', marginBottom: 12 }}>Your Access has Expired!</h1>
                <p style={{ color: '#718096', maxWidth: 400, marginBottom: 24, lineHeight: 1.5 }}>
                    Your free trial or subscription plan has come to an end. Upgrade your plan now to regain access to your dashboard and generate invoices.
                </p>
                <button onClick={() => router.push('/subscription')} style={{ background: '#4285F4', color: 'white', padding: '12px 24px', borderRadius: 8, border: 'none', fontWeight: 800, cursor: 'pointer', fontSize: 16 }}>
                    View Subscription Plans
                </button>
            </div>
        );
    }

    // Is it mobile plan trying to use desktop?
    if (user.subscriptionType === 'mobile' && isDesktop) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#F8F9FA', padding: 20, textAlign: 'center' }}>
                <Smartphone size={64} color="#D69E2E" style={{ marginBottom: 20 }} />
                <h1 style={{ fontSize: 28, fontWeight: 900, color: '#1A1A2E', marginBottom: 12 }}>Mobile Plan Restricted</h1>
                <p style={{ color: '#718096', maxWidth: 400, marginBottom: 24, lineHeight: 1.5 }}>
                    Your current ₹80 Mobile Plan only allows access via mobile devices (phones/tablets). You cannot manage your store from a Desktop/Laptop under this tier.
                </p>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={() => router.push('/subscription')} style={{ background: '#9333EA', color: 'white', padding: '12px 24px', borderRadius: 8, border: 'none', fontWeight: 800, cursor: 'pointer', fontSize: 15 }}>
                        Upgrade to Standard
                    </button>
                    <button onClick={() => router.push('/companies')} style={{ background: 'white', color: '#1A1A2E', padding: '12px 24px', borderRadius: 8, border: '1px solid #E2E8F0', fontWeight: 800, cursor: 'pointer', fontSize: 15 }}>
                        Back to Portal
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Show an automatic payment alert 5 days prior */}
            {(daysLeft > 0 && daysLeft <= 5) && (
                <div style={{ background: '#FEF3C7', color: '#92400E', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 13, fontWeight: 700 }}>
                    <Lock size={16} /> Subscription expiring in {daysLeft} days. Don't lose access! <Link href="/subscription" style={{ color: '#D97706', textDecoration: 'underline' }}>Renew Now</Link>
                </div>
            )}
            {children}
        </>
    );
}

export default function AppLayout({ children, title }: AppLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('sidebar_collapsed') === 'true';
        }
        return false;
    });

    const toggleDesktopSidebar = () => {
        const next = !sidebarCollapsed;
        setSidebarCollapsed(next);
        if (typeof window !== 'undefined') {
            localStorage.setItem('sidebar_collapsed', String(next));
        }
    };

    return (
        <div className={`app-shell${sidebarCollapsed ? ' sidebar-is-collapsed' : ''}`}>
            <KeyboardShortcuts />
            <Tutorial />
            <ConfirmDialog />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} isCollapsed={sidebarCollapsed} />
            <main className="app-main">
                <DemoBanner />
                <Topbar
                    title={title}
                    onMenuOpen={() => setSidebarOpen(true)}
                    onDesktopToggle={toggleDesktopSidebar}
                    isSidebarCollapsed={sidebarCollapsed}
                />
                <div className="app-content" style={{ padding: 0 }}>
                    <SubscriptionGuard>
                        <div className="app-content-inner">
                            {children}
                        </div>
                    </SubscriptionGuard>
                </div>
            </main>
            <BottomNav isHidden={sidebarOpen} />
        </div>
    );
}
