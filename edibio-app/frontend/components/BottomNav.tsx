'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { LayoutDashboard, FileText, Users, Package, BarChart3, Settings, Layers } from 'lucide-react';
import { useStore, useActiveCompany } from '@/lib/store';

export default function BottomNav({ isHidden = false }: { isHidden?: boolean }) {
    const pathname = usePathname();
    const { activeCompanyId } = useStore();
    const company = useActiveCompany();
    const base = activeCompanyId ? '/company' : '';
    const isAgency = company?.type === 'Digital Agency';

    const [scrolledDown, setScrolledDown] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = (e: Event) => {
            const target = e.target as HTMLElement;
            if (target === document as unknown as HTMLElement || target.tagName === 'BODY' || target.classList?.contains('app-main') || target.classList?.contains('app-content')) {
                const currentScrollY = target.scrollTop || window.scrollY;
                if (currentScrollY > lastScrollY.current + 10) {
                    setScrolledDown(true);
                } else if (currentScrollY < lastScrollY.current - 10) {
                    setScrolledDown(false);
                }
                lastScrollY.current = Math.max(0, currentScrollY);
            }
        };

        window.addEventListener('scroll', handleScroll, true);
        return () => window.removeEventListener('scroll', handleScroll, true);
    }, []);

    const effectiveHidden = isHidden || scrolledDown;

    const ITEMS = [
        { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', color: '#4285F4' },
        { href: '/billing', icon: FileText, label: 'Billing', color: '#EA4335' },
        { href: isAgency ? '/agency-clients' : '/parties', icon: Users, label: isAgency ? 'Clients' : 'Parties', color: '#34A853' },
        { href: '/inventory', icon: isAgency ? Layers : Package, label: isAgency ? 'Services' : 'Inventory', color: '#FBBC04' },
        { href: '/reports', icon: BarChart3, label: 'Reports', color: '#4285F4' },
        { href: '/settings', icon: Settings, label: 'Settings', color: '#718096' },
    ];

    return (
        <nav className={`bottom-nav ${effectiveHidden ? 'hidden' : ''}`} style={{
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
            transform: effectiveHidden ? 'translateY(120%)' : 'translateY(0)',
            opacity: effectiveHidden ? 0 : 1,
            pointerEvents: effectiveHidden ? 'none' : 'auto'
        }}>
            {ITEMS.map(({ href, icon: Icon, label, color }) => {
                const active = pathname.includes(href);
                return (
                    <Link key={href} href={activeCompanyId ? `${base}${href}` : '/companies'}
                        className={`bottom-nav-${label.toLowerCase()}`}
                        style={{
                            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                            justifyContent: 'center', gap: 3, textDecoration: 'none', padding: '6px 4px',
                        }}
                    >
                        <div style={{
                            width: 34, height: 34, borderRadius: 10,
                            background: active ? color + '15' : 'transparent',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'background 0.15s',
                        }}>
                            <Icon size={18} color={active ? color : '#A0AEC0'} strokeWidth={active ? 2.5 : 2} />
                        </div>
                        <span style={{ fontSize: 9, fontWeight: active ? 700 : 500, color: active ? color : '#A0AEC0', lineHeight: 1 }}>
                            {label}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
}
