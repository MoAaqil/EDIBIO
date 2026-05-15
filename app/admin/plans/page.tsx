'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { confirm } from '@/components/ConfirmDialog';
import {
    CreditCard, Search, RefreshCw, Users, CheckCircle2,
    AlertTriangle, Edit3, Power, History, Crown,
    Layers, X
} from 'lucide-react';

type PlanTier = 'free' | 'standard' | 'premium';

const PLANS = [
    { id: 'free' as PlanTier, label: 'Free Trial', color: '#64748B', bg: '#F1F5F9', icon: '🆓', features: ['1 Company', 'Basic Billing'] },
    { id: 'standard' as PlanTier, label: 'Standard', color: '#4338CA', bg: '#EEF2FF', icon: '🔵', features: ['3 Companies', 'AI Scanner', 'Unlimited Invoices'] },
    { id: 'premium' as PlanTier, label: 'Premium', color: '#B45309', bg: '#FEF3C7', icon: '⭐', features: ['Unlimited Companies', 'Priority Support', 'Analytics'] },
];

type UserEntry = {
    docId: string;
    name: string;
    email: string;
    phone: string;
    plan: string;
    planExpiry: string | null;
    rawUser: any;
    updatedAt: number;
    isExpired: boolean;
    daysLeft: number | null;
};

export default function ManagePlansPage() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<UserEntry[]>([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<'all' | 'free' | 'paid' | 'expired' | 'expiring'>('all');
    const [editingUser, setEditingUser] = useState<UserEntry | null>(null);
    const [selectedPlan, setSelectedPlan] = useState<PlanTier>('standard');
    const [renewMonths, setRenewMonths] = useState(12);
    const [historyUser, setHistoryUser] = useState<UserEntry | null>(null);
    const [saving, setSaving] = useState(false);
    const [stats, setStats] = useState({ total: 0, free: 0, standard: 0, premium: 0, expiringSoon: 0 });

    useEffect(() => { fetchUsers(); }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/data');
            if (!res.ok) throw new Error('API Failed');
            const data = await res.json();
            
            const list: UserEntry[] = [];
            let freeC = 0, stdC = 0, premC = 0, expiring = 0;
            const now = Date.now();

            data.accounts.forEach((u: any) => {
                const plan = (u.plan || 'free').toLowerCase();
                const expiry = u.planExpiry || null;
                let daysLeft: number | null = null;
                let isExpired = false;
                
                if (expiry) {
                    daysLeft = Math.ceil((new Date(expiry).getTime() - now) / 86400000);
                    isExpired = daysLeft <= 0;
                    if (daysLeft > 0 && daysLeft <= 30) expiring++;
                }

                if (plan === 'free' || plan === 'free trial') freeC++;
                else if (plan === 'standard') stdC++;
                else if (plan === 'premium') premC++;

                list.push({
                    docId: u.docId,
                    name: u.name,
                    email: u.email,
                    phone: u.phone,
                    plan,
                    planExpiry: expiry,
                    rawUser: u.rawUser,
                    updatedAt: new Date(u.updatedAt || 0).getTime(),
                    isExpired,
                    daysLeft,
                });
            });

            setUsers(list.sort((a, b) => b.updatedAt - a.updatedAt));
            setStats({ total: list.length, free: freeC, standard: stdC, premium: premC, expiringSoon: expiring });
        } catch (err) { 
            console.error(err); 
            toast.error('Failed to load user data');
        } finally { 
            setLoading(false); 
        }
    };

    const applyPlan = async () => {
        if (!editingUser) return;
        setSaving(true);
        try {
            const expiry = selectedPlan !== 'free'
                ? new Date(Date.now() + renewMonths * 30 * 86400000).toISOString()
                : null;
            
            const res = await fetch('/api/admin/update', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: editingUser.docId,
                    plan: selectedPlan,
                    expiry
                })
            });

            if (!res.ok) throw new Error('Update failed');

            toast.success(`Plan updated to ${selectedPlan} for ${editingUser.name}`);
            setEditingUser(null);
            fetchUsers();
        } catch { 
            toast.error('Failed to update plan'); 
        } finally { 
            setSaving(false); 
        }
    };

    const revokePlan = async (user: UserEntry) => {
        const yes = await confirm({ message: `Revert ${user.name}'s plan to basic?`, danger: true });
        if (!yes) return;
        try {
            const res = await fetch('/api/admin/update', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.docId,
                    plan: 'free'
                })
            });
            if (!res.ok) throw new Error('Revoke failed');
            toast.success('Plan reverted successfully');
            fetchUsers();
        } catch { toast.error('Failed to revoke plan'); }
    };

    const getPlanStyle = (plan: string) => {
        if (plan === 'premium') return { bg: '#FEF3C7', color: '#B45309', icon: '⭐' };
        if (plan === 'standard') return { bg: '#EEF2FF', color: '#4338CA', icon: '🔵' };
        if (plan === 'expired_subscription' || plan === 'expired') return { bg: '#FEE2E2', color: '#B91C1C', icon: '❌' };
        return { bg: '#F1F5F9', color: '#64748B', icon: '🆓' };
    };

    const filtered = users.filter(u => {
        const q = search.toLowerCase();
        const mQ = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.phone.includes(q);
        const mF = filter === 'all' ? true
            : filter === 'free' ? (u.plan === 'free' || u.plan === 'free trial')
            : filter === 'paid' ? (u.plan === 'standard' || u.plan === 'premium')
            : filter === 'expired' ? u.isExpired
            : (u.daysLeft !== null && u.daysLeft > 0 && u.daysLeft <= 30);
        return mQ && mF;
    });

    return (
        <div>
            <style>{`
                .mp-title { font-size: 22px; font-weight: 900; color: #1A1A2E; display: flex; align-items: center; gap: 8px; }
                .mp-stat-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 10px; margin-bottom: 20px; }
                .mp-stat { background: white; padding: 12px 14px; border-radius: 12px; border: 1px solid #F1F5F9; box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
                .mp-filter-row { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px; }
                .mp-filter-btn { padding: 6px 12px; border-radius: 20px; border: 1.5px solid #E2E8F0; background: white; font-size: 11px; font-weight: 700; cursor: pointer; color: #475569; transition: all 0.15s; white-space: nowrap; }
                .mp-filter-btn:hover { border-color: #A78BFA; color: #7C3AED; }
                .mp-filter-active { background: #7C3AED !important; color: white !important; border-color: #7C3AED !important; }
                .mp-user-row { background: white; border-radius: 14px; border: 1px solid #F1F5F9; padding: 14px 16px; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; transition: box-shadow 0.15s; margin-bottom: 8px; }
                .mp-user-row:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.07); }
                .mp-avatar { width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(135deg,#1A1A2E,#7C3AED); color: white; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 16px; flex-shrink: 0; }
                .mp-info { flex: 1; min-width: 0; }
                .mp-name { font-size: 14px; font-weight: 800; color: #1A1A2E; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                .mp-email { font-size: 11px; color: #94A3B8; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-top: 2px; }
                .mp-plan-badge { padding: 3px 10px; border-radius: 99px; font-size: 10px; font-weight: 800; flex-shrink: 0; }
                .mp-expiry { text-align: right; flex-shrink: 0; min-width: 70px; }
                .mp-actions { display: flex; gap: 6px; width: 100%; }
                .mp-btn { padding: 8px 12px; border-radius: 8px; border: none; cursor: pointer; display: flex; gap: 4px; align-items: center; font-size: 11px; font-weight: 700; flex: 1; justify-content: center; }
                .plan-option { padding: 14px 16px; border-radius: 12px; border: 2px solid; cursor: pointer; transition: all 0.15s; display: flex; align-items: center; justify-content: space-between; }
                .dur-btn { padding: 8px 14px; border-radius: 8px; border: 2px solid; font-weight: 700; font-size: 12px; cursor: pointer; transition: all 0.15s; }
                @media (min-width: 640px) {
                    .mp-stat-grid { grid-template-columns: repeat(5,1fr); }
                    .mp-title { font-size: 26px; }
                    .mp-actions { width: auto; }
                    .mp-btn { flex: none; }
                }
            `}</style>

            <div style={{ marginBottom: 20 }}>
                <h1 className="mp-title"><CreditCard size={22} color="#7C3AED" /> Manage Plans</h1>
                <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 3 }}>Assign, renew, or revoke plans for any account — including hand-paid customers.</p>
            </div>

            <div className="mp-stat-grid">
                {[
                    { label: 'Total', value: stats.total, icon: Users, bg: '#EEF2FF', c: '#4338CA' },
                    { label: 'Free', value: stats.free, icon: RefreshCw, bg: '#F1F5F9', c: '#64748B' },
                    { label: 'Standard', value: stats.standard, icon: Layers, bg: '#EEF2FF', c: '#4338CA' },
                    { label: 'Premium', value: stats.premium, icon: Crown, bg: '#FEF3C7', c: '#D97706' },
                    { label: '⚠️ Expiring', value: stats.expiringSoon, icon: AlertTriangle, bg: '#FEF3C7', c: '#D97706' },
                ].map(({ label, value }) => (
                    <div key={label} className="mp-stat">
                        <p style={{ fontSize: 9, color: '#94A3B8', fontWeight: 800, textTransform: 'uppercase', marginBottom: 4 }}>{label}</p>
                        <p style={{ fontSize: 22, fontWeight: 900, color: '#0F172A' }}>{value}</p>
                    </div>
                ))}
            </div>

            <div style={{ position: 'relative', marginBottom: 12 }}>
                <Search style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={14} />
                <input className="e-input" placeholder="Search user by name or email…" value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 36, height: 40 }} />
            </div>
            <div className="mp-filter-row">
                {(['all', 'free', 'paid', 'expired', 'expiring'] as const).map(f => (
                    <button key={f} onClick={() => setFilter(f)} className={`mp-filter-btn${filter === f ? ' mp-filter-active' : ''}`} style={{ textTransform: 'capitalize' }}>
                        {f === 'expiring' ? '⚠️ Expiring Soon' : f}
                    </button>
                ))}
            </div>

            <p style={{ fontSize: 11, color: '#94A3B8', marginBottom: 12 }}>Showing <strong>{filtered.length}</strong> of <strong>{users.length}</strong> users</p>

            {loading ? <div style={{ textAlign: 'center', padding: 40, color: '#94A3B8', fontSize: 13 }}>Loading…</div>
                : filtered.map(user => {
                    const ps = getPlanStyle(user.plan);
                    return (
                        <div key={user.docId} className="mp-user-row">
                            <div className="mp-avatar">{user.name.charAt(0).toUpperCase()}</div>
                            <div className="mp-info">
                                <p className="mp-name">{user.name}</p>
                                <p className="mp-email">{user.email}</p>
                            </div>
                            <span className="mp-plan-badge" style={{ background: ps.bg, color: ps.color }}>{ps.icon} {user.plan}</span>
                            {user.planExpiry && (
                                <div className="mp-expiry">
                                    <p style={{ fontSize: 9, color: '#94A3B8', fontWeight: 800 }}>EXPIRES</p>
                                    <p style={{ fontSize: 11, fontWeight: 800, color: user.isExpired ? '#EF4444' : user.daysLeft! <= 30 ? '#F59E0B' : '#10B981' }}>
                                        {user.isExpired ? '⛔ Expired' : `${user.daysLeft}d left`}
                                    </p>
                                </div>
                            )}
                            <div className="mp-actions">
                                <button onClick={() => { setEditingUser(user); setSelectedPlan((user.plan as PlanTier) || 'standard'); setRenewMonths(12); }}
                                    className="mp-btn" style={{ background: '#EDE9FE', color: '#7C3AED' }}>
                                    <Edit3 size={12} /> Assign / Renew
                                </button>
                                <button onClick={() => setHistoryUser(user)} className="mp-btn" style={{ background: '#F8FAFC', color: '#64748B', border: '1px solid #E2E8F0' }}>
                                    <History size={12} />
                                </button>
                                {user.plan !== 'free' && user.plan !== 'free trial' && (
                                    <button onClick={() => revokePlan(user)} className="mp-btn" style={{ background: '#FEF2F2', color: '#EF4444', flex: 'none', minWidth: 36 }}>
                                        <Power size={12} />
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}

            {editingUser && (
                <div className="modal-overlay" onClick={() => setEditingUser(null)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 520 }}>
                        <div style={{ padding: '18px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <p style={{ fontWeight: 900, fontSize: 16 }}>Assign / Renew Plan</p>
                                <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{editingUser.name}</p>
                            </div>
                            <button onClick={() => setEditingUser(null)} className="btn btn-ghost btn-icon"><X size={16} /></button>
                        </div>
                        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {PLANS.map(plan => (
                                <div key={plan.id} className="plan-option" onClick={() => setSelectedPlan(plan.id)}
                                    style={{ borderColor: selectedPlan === plan.id ? plan.color : '#E2E8F0', background: selectedPlan === plan.id ? plan.bg : 'white' }}>
                                    <div>
                                        <p style={{ fontWeight: 800, fontSize: 13, color: plan.color }}>{plan.icon} {plan.label}</p>
                                        <p style={{ fontSize: 10, color: '#94A3B8', marginTop: 2 }}>{plan.features.join(' · ')}</p>
                                    </div>
                                    <div style={{ width: 18, height: 18, borderRadius: 99, border: `2px solid ${selectedPlan === plan.id ? plan.color : '#CBD5E1'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {selectedPlan === plan.id && <div style={{ width: 9, height: 9, borderRadius: 99, background: plan.color }} />}
                                    </div>
                                </div>
                            ))}
                            {selectedPlan !== 'free' && (
                                <div>
                                    <p style={{ fontSize: 11, fontWeight: 800, color: '#374151', marginBottom: 8 }}>Duration</p>
                                    <div style={{ display: 'flex', gap: 6 }}>
                                        {[1, 3, 6, 12].map(m => (
                                            <button key={m} onClick={() => setRenewMonths(m)} className="dur-btn"
                                                style={{ flex: 1, borderColor: renewMonths === m ? '#7C3AED' : '#E2E8F0', background: renewMonths === m ? '#EDE9FE' : 'white', color: renewMonths === m ? '#7C3AED' : '#64748B' }}>
                                                {m}M
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div style={{ padding: '16px 20px', borderTop: '1px solid #F1F5F9', display: 'flex', gap: 8 }}>
                            <button onClick={() => setEditingUser(null)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                            <button onClick={applyPlan} disabled={saving} className="btn" style={{ flex: 2, background: '#7C3AED', color: 'white' }}>{saving ? 'Saving…' : 'Apply Plan'}</button>
                        </div>
                    </div>
                </div>
            )}

            {historyUser && (
                <div className="modal-overlay" onClick={() => setHistoryUser(null)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 440 }}>
                        <div style={{ padding: '18px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p style={{ fontWeight: 900 }}>Plan History</p>
                            <button onClick={() => setHistoryUser(null)} className="btn btn-ghost btn-icon"><X size={16} /></button>
                        </div>
                        <div style={{ padding: '20px', maxHeight: 400, overflowY: 'auto' }}>
                            {(historyUser.rawUser?.paymentHistory || []).length === 0 ? (
                                <p style={{ textAlign: 'center', color: '#94A3B8', padding: 20 }}>No records found.</p>
                            ) : historyUser.rawUser.paymentHistory.map((h: any, i: number) => (
                                <div key={i} style={{ padding: 10, borderBottom: '1px solid #F8FAFC' }}>
                                    <p style={{ fontSize: 13, fontWeight: 700 }}>{h.plan} Plan</p>
                                    <p style={{ fontSize: 11, color: '#94A3B8' }}>{h.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
