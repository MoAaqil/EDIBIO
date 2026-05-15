'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { confirm } from '@/components/ConfirmDialog';
import {
    Store, Building2, Search, X, RefreshCw, CheckCircle2,
    Clock, AlertTriangle, TrendingUp, FileText, Wifi, WifiOff,
    Star, Mail, Phone, Bell, Download, ChevronDown, Trash2, CreditCard, PowerOff, ShieldAlert,
} from 'lucide-react';

type StoreEntry = {
    docId: string;
    email: string;
    name: string;
    phone: string;
    plan: string;
    lastActive: string;
    companiesCount: number;
    invoicesCount: number;
    companies: { id: string; name: string; type: string; city?: string; invoices: number }[];
    isActive: boolean;
    daysInactive: number;
    revenue: number;
    fullState: any;
};

const getPlanBadge = (plan: string) => {
    const p = plan?.toLowerCase();
    if (p === 'premium') return { bg: '#FEF3C7', color: '#B45309', label: '⭐ Premium' };
    if (p === 'standard') return { bg: '#EEF2FF', color: '#4338CA', label: '🔵 Standard' };
    if (p === 'expired_subscription' || p === 'expired') return { bg: '#FEE2E2', color: '#B91C1C', label: '❌ Expired' };
    return { bg: '#F1F5F9', color: '#64748B', label: '🆓 Free' };
};

const getActivityDot = (days: number) => {
    if (days === 0) return '#10B981';
    if (days <= 3) return '#3B82F6';
    if (days <= 14) return '#F59E0B';
    return '#EF4444';
};

export default function RegisteredStoresPage() {
    const [loading, setLoading] = useState(true);
    const [stores, setStores] = useState<StoreEntry[]>([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<'all' | 'active' | 'inactive' | 'paid' | 'free' | 'new'>('all');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [stats, setStats] = useState({ total: 0, active: 0, paid: 0, newThisWeek: 0 });
    const [notifications, setNotifications] = useState<{ msg: string; type: 'new' | 'inactive' | 'expired' }[]>([]);
    const [showNotifs, setShowNotifs] = useState(false);
    const [promotingUser, setPromotingUser] = useState<any>(null);
    const [selectedPlan, setSelectedPlan] = useState<string>('standard');
    const [renewMonths, setRenewMonths] = useState(12);
    const [saving, setSaving] = useState(false);
    const [otpModal, setOtpModal] = useState<{ isOpen: boolean, companyId: string, docId: string, phone: string, entityLabel: string } | null>(null);
    const [otpInput, setOtpInput] = useState('');

    useEffect(() => { fetchStores(); }, []);

    const fetchStores = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/data');
            if (!res.ok) throw new Error('Failed to fetch stores from MongoDB');
            const { accounts } = await res.json();
            
            const list: StoreEntry[] = [];
            const notifs: typeof notifications = [];
            let active = 0, paid = 0, newWeek = 0;
            const now = Date.now();

            accounts.forEach((userObj: any) => {
                const plan = userObj.plan;
                const updatedAt = userObj.updatedAt ? new Date(userObj.updatedAt).getTime() : 0;
                const days = updatedAt ? Math.floor((now - updatedAt) / 86400000) : 999;
                const isActiveStore = days <= 7;

                const isPaid = plan !== 'free' && plan !== 'Free Trial' && plan !== 'expired_subscription';
                if (isPaid) paid++;
                if (isActiveStore) active++;
                if (days <= 7) newWeek++;

                if (days <= 7) notifs.push({ msg: `🆕 New: ${userObj.name}`, type: 'new' });
                if (days > 30) notifs.push({ msg: `😴 Idle 30d+: ${userObj.name}`, type: 'inactive' });
                if (plan === 'expired_subscription') notifs.push({ msg: `❌ Expired: ${userObj.name}`, type: 'expired' });

                list.push({
                    docId: userObj.uid, // MongoDB userId
                    email: userObj.email,
                    name: userObj.name,
                    phone: userObj.phone,
                    plan,
                    lastActive: userObj.updatedAt || '',
                    companiesCount: userObj.companies.length,
                    invoicesCount: userObj.totalInvoices,
                    companies: userObj.companies.map((co: any) => ({
                        id: co.id, // Transformed company id
                        name: co.name || 'Unnamed',
                        type: co.type || 'N/A',
                        invoices: co.invoices || 0,
                    })),
                    isActive: isActiveStore,
                    daysInactive: days,
                    revenue: userObj.revenue,
                    fullState: { user: userObj, companies: userObj.companies },
                });
            });

            setStores(list.sort((a, b) => a.daysInactive - b.daysInactive));
            setStats({ total: list.length, active, paid, newThisWeek: newWeek });
            setNotifications(notifs.slice(0, 20));
        } catch (err) {
            console.error('Error fetching stores:', err);
            toast.error('Failed to load stores');
        } finally {
            setLoading(false);
        }
    };

    const handleApplyPlan = async () => {
        if (!promotingUser) return;
        setSaving(true);
        try {
            const expiry = selectedPlan !== 'free'
                ? new Date(Date.now() + renewMonths * 30 * 86400000).toISOString()
                : null;
            
            const res = await fetch('/api/admin/update', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: promotingUser.docId,
                    plan: selectedPlan,
                    expiry
                })
            });

            if (!res.ok) throw new Error('Failed to update MongoDB');

            toast.success(`Plan updated to ${selectedPlan} for ${promotingUser.name}`);
            setPromotingUser(null);
            fetchStores();
        } catch { toast.error('Failed to update plan'); }
        finally { setSaving(false); }
    };

    const requestDeleteOTP = async (docId: string, companyId: string, companyName: string, userPhone: string) => {
        const yes = await confirm({ message: `Delete company "${companyName}"? Send OTP to ${userPhone}?`, danger: true });
        if (!yes) return;
        toast.success(`OTP sent to ${userPhone}. Simulation: 123456`);
        setOtpModal({ isOpen: true, companyId, docId, phone: userPhone, entityLabel: companyName });
    };

    const confirmDelete = async () => {
        if (otpInput !== '123456') { toast.error('Invalid OTP'); return; }
        const { docId, companyId, entityLabel } = otpModal!;
        try {
            setLoading(true);
            setOtpModal(null);
            setOtpInput('');

            const res = await fetch('/api/admin/action', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'DELETE_COMPANY', userId: docId, companyId: companyId })
            });

            if (!res.ok) throw new Error('Action failed');

            toast.success(`Company ${entityLabel} deleted.`);
            fetchStores();
        } catch { toast.error('Failed to delete'); }
        finally { setLoading(false); }
    };

    const filtered = stores.filter(s => {
        const q = search.toLowerCase();
        const mQ = !q || s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.phone.includes(q);
        const mF = filter === 'all' ? true
            : filter === 'active' ? s.isActive
            : filter === 'inactive' ? !s.isActive
            : filter === 'paid' ? (s.plan !== 'free' && s.plan !== 'Free Trial' && s.plan !== 'expired_subscription')
            : filter === 'free' ? (s.plan === 'free' || s.plan === 'Free Trial')
            : s.daysInactive <= 7;
        return mQ && mF;
    });

    const exportCSV = () => {
        const rows = [['Name', 'Email', 'Phone', 'Plan', 'Companies', 'Invoices', 'Last Active']];
        filtered.forEach(s => rows.push([s.name, s.email, s.phone, s.plan, String(s.companiesCount), String(s.invoicesCount), s.lastActive ? new Date(s.lastActive).toLocaleDateString() : 'N/A']));
        const a = document.createElement('a');
        a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(rows.map(r => r.join(',')).join('\n'));
        a.download = `stores_${Date.now()}.csv`; a.click();
    };

    const FILTERS: { id: typeof filter; label: string }[] = [
        { id: 'all', label: `All (${stores.length})` },
        { id: 'active', label: `🟢 Active` },
        { id: 'inactive', label: `🔴 Idle` },
        { id: 'paid', label: `⭐ Paid` },
        { id: 'free', label: `🆓 Free` },
        { id: 'new', label: `🆕 New` },
    ];

    return (
        <div>
            <style>{`
                .rs-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; }
                .rs-title { font-size: 22px; font-weight: 900; color: #1A1A2E; display: flex; align-items: center; gap: 8px; }
                .rs-btns { display: flex; gap: 8px; flex-wrap: wrap; }
                .rs-stat-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 10px; margin-bottom: 20px; }
                .rs-stat { background: white; padding: 14px; border-radius: 14px; border: 1px solid #F1F5F9; box-shadow: 0 2px 6px rgba(0,0,0,0.04); }
                .rs-stat-icon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; }
                .rs-stat-label { font-size: 10px; color: #64748B; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
                .rs-stat-value { font-size: 24px; font-weight: 900; color: #0F172A; margin-top: 2px; }
                .rs-filter-row { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px; }
                .rs-filter-btn { padding: 6px 12px; border-radius: 20px; border: 1.5px solid #E2E8F0; background: white; font-size: 11px; font-weight: 700; cursor: pointer; transition: all 0.15s; white-space: nowrap; color: #475569; }
                .rs-filter-btn:hover { border-color: #93C5FD; background: #EFF6FF; color: #1D4ED8; }
                .rs-filter-active { background: #1D4ED8 !important; color: white !important; border-color: #1D4ED8 !important; }
                .rs-count { font-size: 11px; color: #94A3B8; margin-bottom: 12px; }
                .rs-row { background: white; border-radius: 14px; border: 1px solid #F1F5F9; box-shadow: 0 1px 6px rgba(0,0,0,0.04); overflow: hidden; transition: box-shadow 0.2s; margin-bottom: 8px; }
                .rs-row:hover { box-shadow: 0 4px 18px rgba(0,0,0,0.08); }
                .rs-row-header { display: flex; align-items: center; gap: 12px; padding: 14px 16px; cursor: pointer; }
                .rs-avatar { width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(135deg,#1A1A2E,#4285F4); color: white; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 16px; flex-shrink: 0; }
                .rs-row-info { flex: 1; min-width: 0; }
                .rs-row-name { font-size: 14px; font-weight: 800; color: #1A1A2E; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                .rs-row-sub { font-size: 11px; color: #94A3B8; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-top: 2px; }
                .rs-row-chips { display: flex; gap: 5px; flex-shrink: 0; align-items: center; flex-wrap: wrap; justify-content: flex-end; }
                .rs-chip { padding: 3px 8px; border-radius: 99px; font-size: 10px; font-weight: 700; white-space: nowrap; }
                .rs-expand { background: #F8FAFC; border-top: 1px solid #F1F5F9; padding: 14px 16px; }
                .rs-expand-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 8px; margin-bottom: 12px; }
                .rs-expand-cell { background: white; padding: 10px 12px; border-radius: 10px; border: 1px solid #E2E8F0; }
                .rs-co-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(150px,1fr)); gap: 8px; }
                .rs-co-card { background: white; padding: 10px 12px; border-radius: 10px; border: 1px solid #E2E8F0; }
                .notif-popup { position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 500; display: flex; align-items: flex-end; justify-content: center; padding: 16px; background: rgba(0,0,0,0.4); }
                .notif-sheet { background: white; border-radius: 20px 20px 16px 16px; width: 100%; max-width: 480px; max-height: 70vh; display: flex; flex-direction: column; box-shadow: 0 -8px 32px rgba(0,0,0,0.15); }
                @media (min-width: 640px) {
                    .rs-stat-grid { grid-template-columns: repeat(4,1fr); }
                    .rs-title { font-size: 26px; }
                    .rs-expand-grid { grid-template-columns: repeat(4,1fr); }
                    .notif-popup { align-items: center; }
                    .notif-sheet { border-radius: 20px; }
                }
            `}</style>

            {/* Header */}
            <div className="rs-header">
                <div>
                    <h1 className="rs-title"><Store size={22} color="#4285F4" /> Registered Stores</h1>
                    <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 3 }}>Monitor activity, plan status, and store health.</p>
                </div>
                <div className="rs-btns">
                    <button onClick={fetchStores} className="btn btn-outline btn-sm" style={{ gap: 5 }}><RefreshCw size={13} /> Refresh</button>
                    <button onClick={exportCSV} className="btn btn-outline btn-sm" style={{ gap: 5 }}><Download size={13} /> CSV</button>
                    <button onClick={() => setShowNotifs(true)} className="btn btn-blue btn-sm" style={{ gap: 5, position: 'relative' }}>
                        <Bell size={13} /> Alerts
                        {notifications.length > 0 && (
                            <span style={{ position: 'absolute', top: -7, right: -7, width: 16, height: 16, background: '#EF4444', borderRadius: 99, fontSize: 8, color: 'white', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>
                                {notifications.length > 9 ? '9+' : notifications.length}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="rs-stat-grid">
                {[
                    { label: 'Total', value: stats.total, icon: Store, bg: '#EEF2FF', c: '#4338CA' },
                    { label: 'Active (7d)', value: stats.active, icon: Wifi, bg: '#DCFCE7', c: '#16A34A' },
                    { label: 'Paid Plans', value: stats.paid, icon: Star, bg: '#FEF3C7', c: '#D97706' },
                    { label: 'New Week', value: stats.newThisWeek, icon: TrendingUp, bg: '#F3E8FF', c: '#7C3AED' },
                ].map(({ label, value, icon: Icon, bg, c }) => (
                    <div key={label} className="rs-stat">
                        <div className="rs-stat-icon" style={{ background: bg }}><Icon size={18} color={c} /></div>
                        <p className="rs-stat-label">{label}</p>
                        <p className="rs-stat-value">{value}</p>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div style={{ position: 'relative', marginBottom: 12 }}>
                <Search style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={14} />
                <input className="e-input" placeholder="Search by name, email, phone…" value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 36, height: 40 }} />
                {search && <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}><X size={13} color="#94A3B8" /></button>}
            </div>

            {/* Filters */}
            <div className="rs-filter-row">
                {FILTERS.map(f => (
                    <button key={f.id} onClick={() => setFilter(f.id)} className={`rs-filter-btn${filter === f.id ? ' rs-filter-active' : ''}`}>{f.label}</button>
                ))}
            </div>

            <p className="rs-count">Showing <strong>{filtered.length}</strong> of <strong>{stores.length}</strong> stores</p>

            {/* List */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: 48, color: '#94A3B8', fontSize: 13 }}>Loading stores…</div>
            ) : filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 40, color: '#CBD5E1' }}>
                    <Store size={40} style={{ margin: '0 auto 8px', display: 'block', opacity: 0.3 }} />
                    <p style={{ fontSize: 13 }}>No stores match your filter.</p>
                </div>
            ) : filtered.map(store => {
                const pb = getPlanBadge(store.plan);
                const dot = getActivityDot(store.daysInactive);
                const isExp = expandedId === store.docId;

                return (
                    <div key={store.docId} className="rs-row">
                        <div className="rs-row-header" onClick={() => setExpandedId(isExp ? null : store.docId)}>
                            <div className="rs-avatar">{store.name.charAt(0).toUpperCase()}</div>
                            <div className="rs-row-info">
                                <p className="rs-row-name">{store.name}</p>
                                <p className="rs-row-sub">{store.email}</p>
                            </div>
                            <div className="rs-row-chips">
                                <button onClick={() => { setPromotingUser(store); setSelectedPlan(store.plan === 'expired_subscription' ? 'standard' : store.plan); }} className="btn btn-outline btn-xs" style={{ fontSize: 9, padding: '2px 6px', height: 'auto', gap: 3 }}><CreditCard size={10} /> Plan</button>
                                <span className="rs-chip" style={{ background: pb.bg, color: pb.color }}>{pb.label}</span>
                                <span style={{ width: 8, height: 8, borderRadius: 99, background: dot, display: 'inline-block', flexShrink: 0 }} title={`${store.daysInactive}d inactive`} />
                                <ChevronDown size={15} color="#CBD5E1" style={{ transform: isExp ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                            </div>
                        </div>

                        {isExp && (
                            <div className="rs-expand">
                                <div className="rs-expand-grid">
                                    <div className="rs-expand-cell">
                                        <p style={{ fontSize: 9, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>Last Active</p>
                                        <p style={{ fontSize: 12, fontWeight: 700, color: dot, marginTop: 2 }}>
                                            {store.lastActive ? new Date(store.lastActive).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : '—'}
                                            {' '}· {store.daysInactive === 0 ? 'Today' : `${store.daysInactive}d ago`}
                                        </p>
                                    </div>
                                    <div className="rs-expand-cell">
                                        <p style={{ fontSize: 9, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>Phone</p>
                                        <p style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginTop: 2 }}>{store.phone}</p>
                                    </div>
                                    <div className="rs-expand-cell">
                                        <p style={{ fontSize: 9, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>Invoices</p>
                                        <p style={{ fontSize: 14, fontWeight: 900, color: '#4285F4', marginTop: 2 }}>{store.invoicesCount}</p>
                                    </div>
                                    <div className="rs-expand-cell">
                                        <p style={{ fontSize: 9, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>Revenue</p>
                                        <p style={{ fontSize: 12, fontWeight: 800, color: '#059669', marginTop: 2 }}>₹{store.revenue.toLocaleString('en-IN')}</p>
                                    </div>
                                </div>

                                {store.companies.length > 0 ? (
                                    <>
                                        <p style={{ fontSize: 11, fontWeight: 800, color: '#374151', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
                                            <Building2 size={12} /> Companies ({store.companies.length})
                                        </p>
                                        <div className="rs-co-grid">
                                            {store.companies.map(co => (
                                                <div key={co.id} className="rs-co-card">
                                                    <p style={{ fontWeight: 700, fontSize: 12, color: '#1A1A2E', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{co.name}</p>
                                                    <p style={{ fontSize: 10, color: '#94A3B8' }}>{co.type}</p>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                                                        <p style={{ fontSize: 11, color: '#4285F4', fontWeight: 700 }}>{co.invoices} invoices</p>
                                                        <button onClick={() => requestDeleteOTP(store.docId, co.id, co.name, store.phone)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: 4 }}><Trash2 size={12} /></button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div style={{ fontSize: 11, color: '#F59E0B', background: '#FFFBEB', padding: '8px 12px', borderRadius: 8, border: '1px solid #FDE68A' }}>
                                        ⚠️ No companies created yet.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}

            {/* Notifications Sheet */}
            {showNotifs && (
                <div className="notif-popup" onClick={() => setShowNotifs(false)}>
                    <div className="notif-sheet" onClick={e => e.stopPropagation()}>
                        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                            <p style={{ fontWeight: 800, fontSize: 15 }}>Store Alerts ({notifications.length})</p>
                            <button onClick={() => setShowNotifs(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} color="#94A3B8" /></button>
                        </div>
                        <div style={{ overflowY: 'auto', flex: 1 }}>
                            {notifications.length === 0 ? (
                                <p style={{ textAlign: 'center', padding: 24, color: '#94A3B8', fontSize: 13 }}>No alerts 🎉</p>
                            ) : notifications.map((n, i) => (
                                <div key={i} style={{ padding: '10px 20px', borderBottom: '1px solid #F8FAFC', display: 'flex', gap: 10, alignItems: 'center' }}>
                                    <div style={{ width: 28, height: 28, borderRadius: 8, background: n.type === 'new' ? '#DCFCE7' : n.type === 'expired' ? '#FEE2E2' : '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        {n.type === 'new' ? <CheckCircle2 size={14} color="#16A34A" /> : n.type === 'expired' ? <AlertTriangle size={14} color="#B91C1C" /> : <Clock size={14} color="#D97706" />}
                                    </div>
                                    <p style={{ fontSize: 12, color: '#374151' }}>{n.msg}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Plan Modal */}
            {promotingUser && (
                <div className="modal-overlay" onClick={() => setPromotingUser(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ background: 'white', borderRadius: 16, width: '100%', maxWidth: 440, overflow: 'hidden' }}>
                        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p style={{ fontWeight: 800 }}>Change Subscription</p>
                            <button onClick={() => setPromotingUser(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
                        </div>
                        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 15 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                                {['free', 'standard', 'premium'].map(p => (
                                    <button key={p} onClick={() => setSelectedPlan(p)} style={{ padding: 10, borderRadius: 10, border: `2px solid ${selectedPlan === p ? '#4285F4' : '#F1F5F9'}`, background: selectedPlan === p ? '#E8F0FE' : 'white', fontSize: 11, fontWeight: 700, textTransform: 'capitalize' }}>{p}</button>
                                ))}
                            </div>
                            {selectedPlan !== 'free' && (
                                <div>
                                    <p style={{ fontSize: 10, fontWeight: 700, marginBottom: 8 }}>Duration (Months)</p>
                                    <div style={{ display: 'flex', gap: 5 }}>
                                        {[1, 3, 6, 12].map(m => (
                                            <button key={m} onClick={() => setRenewMonths(m)} style={{ flex: 1, padding: 8, borderRadius: 8, border: `1px solid ${renewMonths === m ? '#4285F4' : '#E2E8F0'}`, background: renewMonths === m ? '#E8F0FE' : 'white', fontSize: 11, fontWeight: 700 }}>{m}M</button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <button onClick={handleApplyPlan} className="btn btn-blue w-full" style={{ marginTop: 10 }}>{saving ? 'Saving...' : 'Apply Changes'}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* OTP Modal */}
            {otpModal && (
                <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={() => setOtpModal(null)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ background: 'white', borderRadius: 20, width: '100%', maxWidth: 400, padding: 30, textAlign: 'center' }}>
                        <ShieldAlert color="#DC2626" size={48} style={{ margin: '0 auto 15px' }} />
                        <h3 style={{ fontWeight: 900, fontSize: 18 }}>Delete Company</h3>
                        <p style={{ fontSize: 13, color: '#64748B', margin: '8px 0 20px' }}>Enter OTP sent to {otpModal.phone}</p>
                        <input className="e-input" value={otpInput} onChange={e => setOtpInput(e.target.value)} placeholder="123456" style={{ textAlign: 'center', fontSize: 24, letterSpacing: 8 }} />
                        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                            <button onClick={() => setOtpModal(null)} className="btn btn-outline flex-1">Cancel</button>
                            <button onClick={confirmDelete} className="btn btn-blue flex-1" style={{ background: '#DC2626' }}>Erase</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
