'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, FileText, Users, Package, DollarSign,
    BarChart3, Settings, Warehouse, Zap, Crown, Activity, Layers, Briefcase, ShieldCheck, Lock, BookOpen, Percent
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
    const { activeCompanyId, user, aiApiKey, isDemo, isSubBranchLogin } = useStore();
    const company = useActiveCompany();
    const isAgency = company?.type === 'Digital Agency';
    const hasAnalytics = canAccess('ai_analytics', user, isDemo);

    const isOwner = !user?.role || user?.role === 'co_owner' || user?.role === 'owner';
    const isManager = user?.role === 'manager';
    const isStaff = user?.role === 'staff';
    const isChef = user?.role === 'chef_atelier';
    const isServer = user?.role === 'server';
    const isCashier = user?.role === 'cashier';
    const isWarehouse = user?.role === 'warehouse';
    const isAccountant = user?.role === 'accountant';

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
            <aside className="app-sidebar" style={{ background: 'white', borderRight: '1px solid #E2E8F0', zIndex: 50 }}>
                {/* Logo */}
                <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid #E2E8F0' }} className="brand-logo-panel-container">
                    <Link href="/companies" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', justifyContent: isCollapsed ? 'center' : 'flex-start' }}>
                        <div className="brand-logo-wrapper" style={{ width: 44, height: 44, borderRadius: 12, overflow: 'hidden', flexShrink: 0, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4, border: '1px solid #E2E8F0' }}>
                            <Image src="/logo.png" alt="Edibio" width={40} height={40} priority className="brand-logo-img" style={{ width: '100%', height: '100%', objectFit: isCollapsed ? 'cover' : 'contain', objectPosition: isCollapsed ? 'left center' : 'center' }} />
                        </div>
                        {!isCollapsed && (
                            <div className="sidebar-label-area">
                                <p style={{ color: '#1A1A2E', fontWeight: 900, fontSize: 22, lineHeight: 1 }}>Edibio</p>
                                <p style={{ color: '#718096', fontSize: 11, marginTop: 4 }}>ERP Suite</p>
                            </div>
                        )}
                    </Link>
                </div>

                {/* Company indicator */}
                {company && !isCollapsed && (
                    <div style={{ margin: '10px 10px 4px', padding: '10px 12px', background: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0' }}>
                        <p style={{ color: '#718096', fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 5 }}>Manage Company</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 10, background: (company.colorAccent || '#4285F4') + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', color: company.colorAccent || '#4285F4', fontWeight: 900, fontSize: 18 }}>
                                {company.name[0]}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ color: '#1A1A2E', fontSize: 13, fontWeight: 800, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{company.name}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                                    <div className="status-dot" style={{ width: 6, height: 6, borderRadius: 99, background: '#10B981' }} />
                                    <span style={{ color: '#10B981', fontSize: 10, fontWeight: 700 }}>Cloud Synchronized</span>
                                </div>
                                {user?.role && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                                        <span style={{ background: 'rgba(0,0,0,0.05)', color: '#7C3AED', fontSize: 9, fontWeight: 800, padding: '1px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>
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
                            style={{ display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'flex-start', gap: 10, padding: '10px 12px', borderRadius: 10, background: 'linear-gradient(135deg,#EA4335,#FBBC04)', textDecoration: 'none', boxShadow: '0 2px 8px rgba(234,67,53,0.35)' }}>
                            <Zap size={16} color="white" style={{ flexShrink: 0 }} />
                            {!isCollapsed && (
                                <span className="sidebar-label-area" style={{ color: 'white', fontWeight: 800, fontSize: 13 }}>
                                    {company.type === 'Restaurant' ? 'Restaurant POS' : company.type === 'Bakery' ? 'Bakery POS' : 'Quick Billing'}
                                </span>
                            )}
                        </Link>
                    </div>
                )}

                {/* Nav */}
                <nav style={{ flex: 1, padding: '4px 10px', overflowY: 'auto', scrollbarWidth: 'none' }} className="sidebar-nav no-scrollbar">
                    {NAV.filter(n => {
                        if (isChef || isServer) {
                            return false; 
                        }
                        if (isSubBranchLogin && n.label === 'Audit Trail') {
                            return false;
                        }
                        if (isCashier) {
                            return ['Billing'].includes(n.label);
                        }
                        if (isWarehouse) {
                            return ['Inventory'].includes(n.label);
                        }
                        if (isAccountant) {
                            return ['Reports', 'Expenses', 'Settings', 'Help Center'].includes(n.label);
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
                                    background: active ? 'rgba(0,0,0,0.04)' : 'transparent',
                                    textDecoration: 'none', transition: 'background 0.15s',
                                    position: 'relative',
                                    justifyContent: isCollapsed ? 'center' : 'flex-start',
                                }}
                                className="sidebar-nav-item"
                                title={label}>
                                <div style={{
                                    width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                                    background: active ? color : '#F8FAFC',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    transition: 'background 0.15s',
                                    border: active ? 'none' : '1px solid #E2E8F0',
                                }}>
                                    <Icon size={15} color={active ? 'white' : '#64748B'} />
                                </div>
                                {!isCollapsed && (
                                    <span className="sidebar-label-area" style={{
                                        fontSize: 13, fontWeight: active ? 700 : 500,
                                        color: active ? '#1A1A2E' : '#4A5568',
                                        flex: 1,
                                    }}>{
                                        label === 'Inventory' ? (
                                            company?.type === 'Restaurant' ? 'Food Items' :
                                            company?.type === 'Bakery' ? 'Bakes & Menu' :
                                            company?.type === 'Logistics' ? 'Fleet & Assets' :
                                            company?.type === 'Ecommerce' ? 'Store Catalog' : 'Inventory'
                                        ) : label
                                    }</span>
                                )}
                                {label === 'AI Analytics' && !hasAnalytics && !isCollapsed && (
                                    <Lock size={11} color="#A0AEC0" />
                                )}
                                {active && !isCollapsed && <div style={{ width: 3, height: 18, borderRadius: 99, background: color, flexShrink: 0 }} />}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom: Switch company + Upgrade */}
                <div style={{ padding: '10px', borderTop: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {isOwner && (
                        <Link href="/subscription" style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            padding: '9px 12px', borderRadius: 10, textDecoration: 'none',
                            background: 'linear-gradient(135deg,rgba(147,51,234,0.06),rgba(66,133,244,0.06))',
                            border: '1px solid rgba(147,51,234,0.2)',
                            justifyContent: isCollapsed ? 'center' : 'flex-start',
                        }}
                        title="Upgrade Plan">
                            <Crown size={15} color="#9333EA" style={{ flexShrink: 0 }} />
                            {!isCollapsed && <span className="sidebar-label-area" style={{ fontSize: 12, color: '#9333EA', fontWeight: 700 }}>Upgrade Plan</span>}
                        </Link>
                    )}
                    {aiApiKey && (
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            padding: '9px 12px', borderRadius: 10, textDecoration: 'none',
                            background: '#E8F0FE',
                            border: '1px solid #ADCAFD',
                            justifyContent: isCollapsed ? 'center' : 'flex-start',
                        }}
                        title="Exclusive AI Enabled">
                            <ShieldCheck size={15} color="#4285F4" style={{ flexShrink: 0 }} />
                            {!isCollapsed && <span className="sidebar-label-area" style={{ fontSize: 11, color: '#1A73E8', fontWeight: 800 }}>Exclusive AI Enabled</span>}
                        </div>
                    )}
                    <Link href="/companies" style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '9px 12px', borderRadius: 10, textDecoration: 'none',
                        background: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        justifyContent: isCollapsed ? 'center' : 'flex-start',
                    }}
                    title="Switch Company">
                        <Warehouse size={15} color="#718096" style={{ flexShrink: 0 }} />
                        {!isCollapsed && <span className="sidebar-label-area" style={{ fontSize: 12, color: '#718096', fontWeight: 500 }}>Switch Company</span>}
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
          .brand-logo-img { object-fit: cover !important; object-position: left center !important; }
          .brand-logo-wrapper { width: 36px !important; height: 36px !important; }
          .brand-logo-panel-container { padding: 15px 8px !important; display: flex; justify-content: center !important; }
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
