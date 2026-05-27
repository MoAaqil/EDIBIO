'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, FileText, Users, Package, DollarSign,
    BarChart3, Settings, Warehouse, Zap, Crown, Activity, Layers, Briefcase, ShieldCheck, Lock, BookOpen
} from 'lucide-react';
import { useStore, useActiveCompany } from '@/lib/store';
import { canAccess } from '@/components/FeatureGate';

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
    isCollapsed?: boolean;
}

export default function Sidebar({ isOpen, onClose, isCollapsed }: SidebarProps) {
    const pathname = usePathname();
    const { activeCompanyId, user, aiApiKey, isDemo } = useStore();
    const company = useActiveCompany();
    const isAgency = company?.type === 'Digital Agency';
    const hasAnalytics = canAccess('ai_analytics', user, isDemo);

    const isOwner = !user?.role || user?.role === 'co_owner' || user?.role === 'owner';
    const isManager = user?.role === 'manager';
    const isStaff = user?.role === 'staff';
    const isChef = user?.role === 'chef_atelier';
    const isServer = user?.role === 'server';

    const NAV = [
        { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', color: '#4285F4' },
        ...(isAgency ? [
            { href: '/agency-clients', icon: Users, label: 'Clients', color: '#34A853' },
            { href: '/agency-projects', icon: Briefcase, label: 'Projects', color: '#F59E0B' },
        ] : [
            { href: '/parties', icon: Users, label: 'Parties', color: '#34A853' },
        ]),
        { href: '/billing', icon: FileText, label: 'Billing', color: '#EA4335' },
        { href: '/inventory', icon: isAgency ? Layers : Package, label: isAgency ? 'Services' : 'Inventory', color: '#FBBC04' },
        { href: '/expenses', icon: DollarSign, label: 'Expenses', color: '#EA4335' },
        { href: '/reports', icon: BarChart3, label: 'Reports', color: '#4285F4' },
        { href: '/analytics', icon: Activity, label: 'AI Analytics', color: '#9333EA' },
        { href: '/audit', icon: ShieldCheck, label: 'Audit Trail', color: '#10B981' },
        { href: '/settings', icon: Settings, label: 'Settings', color: '#718096' },
        { href: '/settings/templates', icon: FileText, label: 'Templates', color: '#9333EA' },
        { href: '/help', icon: BookOpen, label: 'Help Center', color: '#0EA5E9' },
    ];

    const base = activeCompanyId ? '/company' : '';
    const isActive = (href: string) => pathname?.endsWith(href) || pathname?.includes(href + '/');

    return (
        <>
            <aside className="app-sidebar" style={{ background: '#1A1A2E', zIndex: 50 }}>
                {/* Logo */}
                <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <Link href="/companies" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
                        <div style={{ width: 48, height: 48, borderRadius: 12, overflow: 'hidden', flexShrink: 0, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
                            <Image src="/logo.png" alt="Edibio" width={44} height={44} priority style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <div className="sidebar-label-area">
                            <p style={{ color: 'white', fontWeight: 900, fontSize: 22, lineHeight: 1 }}>Edibio</p>
                            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, marginTop: 4 }}>ERP Suite</p>
                        </div>
                    </Link>
                </div>

                {/* Company indicator */}
                {company && (
                    <div style={{ margin: '10px 10px 4px', padding: '10px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.03)' }}>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 5 }}>Manage Company</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 10, background: (company.colorAccent || '#4285F4') + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', color: company.colorAccent || '#4285F4', fontWeight: 900, fontSize: 18 }}>
                                {company.name[0]}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ color: 'white', fontSize: 13, fontWeight: 800, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{company.name}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                                    <div className="status-dot" style={{ width: 6, height: 6, borderRadius: 99, background: '#10B981' }} />
                                    <span style={{ color: '#10B981', fontSize: 10, fontWeight: 700 }}>Cloud Synchronized</span>
                                </div>
                                {user?.role && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                                        <span style={{ background: 'rgba(255,255,255,0.1)', color: '#C084FC', fontSize: 9, fontWeight: 800, padding: '1px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>
                                            {user.role.replace('_', ' ')}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {company && (
                    <div style={{ padding: '6px 10px' }}>
                        <Link href={
                            company.type === 'Restaurant' ? `${base}/dashboard` : 
                            company.type === 'Bakery' ? `${base}/dashboard` : 
                            `${base}/billing/quick`
                        }
                            className="quick-billing-btn"
                            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, background: 'linear-gradient(135deg,#EA4335,#FBBC04)', textDecoration: 'none', boxShadow: '0 2px 8px rgba(234,67,53,0.35)' }}>
                            <Zap size={16} color="white" />
                            <span className="sidebar-label-area" style={{ color: 'white', fontWeight: 800, fontSize: 13 }}>
                                {company.type === 'Restaurant' ? 'Restaurant POS' : company.type === 'Bakery' ? 'Bakery POS' : 'Quick Billing'}
                            </span>
                        </Link>
                    </div>
                )}

                {/* Nav */}
                <nav style={{ flex: 1, padding: '4px 10px', overflowY: 'auto', scrollbarWidth: 'none' }} className="sidebar-nav">
                    {NAV.filter(n => {
                        if (isChef || isServer) {
                            return false; // Chefs and Waiters only use the POS dashboard portal
                        }
                        if (isManager) {
                            return !['Dashboard', 'Expenses', 'Settings', 'Templates', 'Custom Invoice', 'Fees & Finance'].includes(n.label);
                        }
                        if (isStaff) {
                            return ['Billing', 'Inventory'].includes(n.label);
                        }
                        if (user?.subscriptionType === 'mobile' && !isDemo) {
                            return !['AI Analytics', 'Audit Trail', 'Expenses'].includes(n.label);
                        }
                        return true;
                    }).map(({ href, icon: Icon, label, color }) => {
                        const active = isActive(href);
                        return (
                            <Link key={href} href={company ? `${base}${href}` : '/companies'}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    padding: '9px 12px', borderRadius: 10, marginBottom: 2,
                                    background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
                                    textDecoration: 'none', transition: 'background 0.15s',
                                    position: 'relative',
                                }}
                                className="sidebar-nav-item">
                                <div style={{
                                    width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                                    background: active ? color : 'rgba(255,255,255,0.07)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    transition: 'background 0.15s',
                                }}>
                                    <Icon size={15} color={active ? 'white' : 'rgba(255,255,255,0.45)'} />
                                </div>
                                <span className="sidebar-label-area" style={{
                                    fontSize: 13, fontWeight: active ? 700 : 500,
                                    color: active ? 'white' : 'rgba(255,255,255,0.55)',
                                    flex: 1,
                                }}>{
                                    label === 'Inventory' ? (
                                        company?.type === 'Restaurant' ? 'Food Items' :
                                        company?.type === 'Bakery' ? 'Bakes & Menu' :
                                        company?.type === 'Logistics' ? 'Fleet & Assets' :
                                        company?.type === 'Ecommerce' ? 'Store Catalog' : 'Inventory'
                                    ) : label
                                }</span>
                                {label === 'AI Analytics' && !hasAnalytics && (
                                    <Lock size={11} color="rgba(255,255,255,0.3)" />
                                )}
                                {active && <div style={{ width: 3, height: 18, borderRadius: 99, background: color, flexShrink: 0 }} />}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom: Switch company + Upgrade */}
                <div style={{ padding: '10px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {isOwner && (
                        <Link href="/subscription" style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            padding: '9px 12px', borderRadius: 10, textDecoration: 'none',
                            background: 'linear-gradient(135deg,rgba(147,51,234,0.15),rgba(66,133,244,0.15))',
                            border: '1px solid rgba(147,51,234,0.3)',
                        }}>
                            <Crown size={15} color="#9333EA" />
                            <span className="sidebar-label-area" style={{ fontSize: 12, color: '#C084FC', fontWeight: 700 }}>Upgrade Plan</span>
                        </Link>
                    )}
                    {aiApiKey && (
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            padding: '9px 12px', borderRadius: 10, textDecoration: 'none',
                            background: 'rgba(66, 133, 244, 0.1)',
                            border: '1px solid rgba(66, 133, 244, 0.3)',
                        }}>
                            <ShieldCheck size={15} color="#4285F4" />
                            <span className="sidebar-label-area" style={{ fontSize: 11, color: '#4285F4', fontWeight: 800 }}>Exclusive AI Enabled</span>
                        </div>
                    )}
                    <Link href="/companies" style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '9px 12px', borderRadius: 10, textDecoration: 'none',
                        background: 'rgba(255,255,255,0.04)',
                    }}>
                        <Warehouse size={15} color="rgba(255,255,255,0.35)" />
                        <span className="sidebar-label-area" style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>Switch Company</span>
                    </Link>
                </div>

                <style>{`
        .sidebar-label-area { display: flex; flex-direction: column; overflow: hidden; }
        .sidebar-nav::-webkit-scrollbar { display: none; }
        .status-dot { animation: pulsate 2s infinite; }
        @keyframes pulsate { 
          0% { opacity: 0.6; transform: scale(1); } 
          50% { opacity: 1; transform: scale(1.1); box-shadow: 0 0 8px #10B981; } 
          100% { opacity: 0.6; transform: scale(1); } 
        }
        /* Tablet: icon only */
        @media (min-width: 640px) and (max-width: 1023px) {
          .sidebar-label-area { display: none !important; }
          .sidebar-nav-item { justify-content: center !important; }
        }
        /* Sidebar slide — mobile: drawer from left, desktop: collapse */
        @media (max-width: 639px) {
          .app-sidebar {
            display: flex !important;
            transform: ${isOpen ? 'translateX(0)' : 'translateX(-100%)'};
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            width: 80vw !important;
            max-width: 320px !important;
            box-shadow: ${isOpen ? '4px 0 32px rgba(0,0,0,0.4)' : 'none'};
          }
        }
        @media (min-width: 640px) {
          .app-sidebar {
            transform: ${isCollapsed ? 'translateX(-100%)' : 'translateX(0)'};
            transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
          }
        }
      `}</style>
            </aside>
            {isOpen && (
                <div
                    onClick={onClose}
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40 }}
                />
            )}
        </>
    );
}
