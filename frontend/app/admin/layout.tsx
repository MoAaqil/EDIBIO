'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LogOut, LayoutDashboard, Users, CreditCard, Menu, X, Shield } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, logout } = useStore();
    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (!user || user.role !== 'admin') router.replace('/login');
    }, [user, router]);

    // Close sidebar on route change
    useEffect(() => { setOpen(false); }, [pathname]);

    if (!mounted || !user || user.role !== 'admin') return null;

    const handleLogout = () => { logout(); router.replace('/login'); };

    const NAV = [
        { href: '/admin', icon: LayoutDashboard, label: 'Super Dashboard' },
        { href: '/admin/companies', icon: Users, label: 'Registered Stores' },
        { href: '/admin/plans', icon: CreditCard, label: 'Manage Plans' },
    ];

    return (
        <>
            <style>{`
                /* ── Admin Shell ─────────────────────── */
                .adm-shell {
                    display: flex;
                    height: 100dvh;
                    background: #F0F2F8;
                    overflow: hidden;
                }

                /* ── Sidebar ─────────────────────────── */
                .adm-sidebar {
                    width: 240px;
                    background: linear-gradient(175deg, #12122A 0%, #1E1E40 100%);
                    display: flex;
                    flex-direction: column;
                    flex-shrink: 0;
                    border-right: 1px solid rgba(255,255,255,0.05);
                    z-index: 100;
                    transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
                }
                .adm-logo { 
                    padding: 24px 20px 20px; 
                    border-bottom: 1px solid rgba(255,255,255,0.07); 
                    display: flex; align-items: center; justify-content: space-between;
                }
                .adm-logo h2 { font-size: 18px; font-weight: 900; color: white; margin: 0; display: flex; align-items: center; gap: 8px; }
                .adm-nav { flex: 1; padding: 16px 10px; display: flex; flex-direction: column; gap: 2px; overflow-y: auto; }
                .adm-nav-label { font-size: 9px; font-weight: 800; color: rgba(255,255,255,0.2); text-transform: uppercase; letter-spacing: 0.12em; padding: 0 10px; margin-bottom: 8px; }
                .adm-link {
                    display: flex; align-items: center; gap: 10px;
                    padding: 10px 12px; border-radius: 8px;
                    color: rgba(255,255,255,0.5); text-decoration: none;
                    font-size: 13px; font-weight: 600;
                    transition: all 0.15s;
                }
                .adm-link:hover { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.85); }
                .adm-link-active { background: #E53E3E !important; color: white !important; box-shadow: 0 4px 14px rgba(229,62,62,0.35); }
                .adm-footer { padding: 14px; border-top: 1px solid rgba(255,255,255,0.07); }
                .adm-logout {
                    display: flex; align-items: center; gap: 10px;
                    padding: 10px 12px; border-radius: 8px;
                    background: rgba(234,67,53,0.1); border: none;
                    color: #FC8181; cursor: pointer; width: 100%;
                    font-size: 13px; font-weight: 700;
                    transition: background 0.15s;
                }
                .adm-logout:hover { background: rgba(234,67,53,0.2); }
                .adm-ver { color: rgba(255,255,255,0.15); font-size: 10px; text-align: center; margin-top: 10px; }

                /* ── Main ────────────────────────────── */
                .adm-main {
                    flex: 1;
                    min-width: 0;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                /* ── Mobile topbar (inside adm-main) ── */
                .adm-topbar {
                    display: none;
                    height: 52px;
                    background: linear-gradient(90deg, #12122A, #1E1E40);
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 16px;
                    flex-shrink: 0;
                }
                .adm-topbar-brand { display: flex; align-items: center; gap: 8px; color: white; font-size: 15px; font-weight: 900; }
                .adm-menu-btn {
                    width: 36px; height: 36px; border-radius: 8px;
                    background: rgba(255,255,255,0.08); border: none;
                    color: white; cursor: pointer; display: flex;
                    align-items: center; justify-content: center;
                }

                /* ── Scrollable content area ─────────── */
                .adm-body { flex: 1; overflow-y: auto; padding: 28px; }

                /* ── Overlay ─────────────────────────── */
                .adm-overlay {
                    position: fixed; inset: 0;
                    background: rgba(0,0,0,0.55);
                    backdrop-filter: blur(3px);
                    z-index: 90;
                    animation: fadeIn 0.2s ease;
                }

                /* ── Mobile breakpoint ───────────────── */
                @media (max-width: 1023px) {
                    .adm-sidebar {
                        position: fixed;
                        top: 0; left: 0; bottom: 0;
                        transform: translateX(-100%);
                        width: 260px;
                    }
                    .adm-sidebar-open { transform: translateX(0) !important; }
                    .adm-topbar { display: flex !important; }
                    .adm-body { padding: 16px; }
                    .adm-logo .adm-close-btn { display: flex !important; }
                }
                @media (min-width: 1024px) {
                    .adm-logo .adm-close-btn { display: none !important; }
                }

                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            `}</style>

            <div className="adm-shell">
                {/* ── Overlay (click-outside to close) ── */}
                {open && <div className="adm-overlay" onClick={() => setOpen(false)} />}

                {/* ── Sidebar ── */}
                <aside className={`adm-sidebar${open ? ' adm-sidebar-open' : ''}`}>
                    <div className="adm-logo">
                        <h2><Shield size={20} color="#E53E3E" /> Edibio Admin</h2>
                        <button
                            className="adm-menu-btn adm-close-btn"
                            onClick={() => setOpen(false)}
                            style={{ width: 30, height: 30, fontSize: 0 }}
                        >
                            <X size={16} />
                        </button>
                    </div>

                    <nav className="adm-nav">
                        <p className="adm-nav-label">Control Center</p>
                        {NAV.map(n => {
                            const active = pathname === n.href;
                            return (
                                <Link key={n.href} href={n.href} className={`adm-link${active ? ' adm-link-active' : ''}`}>
                                    <n.icon size={16} /> {n.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="adm-footer">
                        <button className="adm-logout" onClick={handleLogout}>
                            <LogOut size={16} /> Exit Admin
                        </button>
                        <p className="adm-ver">Edibio v2.5.0 · Super Admin</p>
                    </div>
                </aside>

                {/* ── Main content ── */}
                <main className="adm-main">
                    {/* Mobile topbar — rendered INSIDE adm-main, not outside */}
                    <div className="adm-topbar">
                        <button className="adm-menu-btn" onClick={() => setOpen(true)}>
                            <Menu size={18} />
                        </button>
                        <div className="adm-topbar-brand">
                            <Shield size={16} color="#E53E3E" /> Super Admin
                        </div>
                        <div style={{ width: 36 }} />
                    </div>

                    <div className="adm-body">
                        {children}
                    </div>
                </main>
            </div>
        </>
    );
}
