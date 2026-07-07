'use client';
import { useState, useRef, useMemo } from 'react';
import { useStore, useCompanyData, useActiveCompany } from '@/lib/store';
import { INDIAN_STATES } from '@/lib/utils';
import type { Party } from '@/lib/types';
import Link from 'next/link';
import {
    Plus, Search, Users, Trash2, Edit2, Phone, MessageSquare,
    Download, Upload, X, TrendingUp, TrendingDown,
    IndianRupee, History, ChevronRight, CheckCircle2
} from 'lucide-react';
import toast from 'react-hot-toast';
import { confirm } from '@/components/ConfirmDialog';

export default function PartiesPage() {
    const { activeCompanyId, addParty, updateParty, deleteParty, addBalancePayment, deleteBalancePayment } = useStore();
    const companyId = activeCompanyId;
    const company = useActiveCompany();
    const parties = useCompanyData('parties') as Party[];
    const invoices = useCompanyData('invoices') as any[];

    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState<'all' | 'customer' | 'supplier'>('all');
    const [showAdd, setShowAdd] = useState(false);
    const [editParty, setEditParty] = useState<Party | null>(null);

    const [paymentParty, setPaymentParty] = useState<Party | null>(null);
    const [payForm, setPayForm] = useState({ amount: '', type: 'received' as 'received' | 'paid', method: 'cash', date: new Date().toLocaleDateString('sv-SE'), note: '' });
    const [historyParty, setHistoryParty] = useState<Party | null>(null);
    const [historyTab, setHistoryTab] = useState<'payments' | 'loyalty'>('payments');
    
    // Loyalty Adjustment States
    const [loyaltyAdjustParty, setLoyaltyAdjustParty] = useState<Party | null>(null);
    const [adjustPointsVal, setAdjustPointsVal] = useState('');
    const [adjustPointsType, setAdjustPointsType] = useState<'add' | 'deduct'>('add');
    const [adjustPointsReason, setAdjustPointsReason] = useState('');

    const openPaymentModal = (p: Party) => {
        const defaultType = p.balance < 0 ? 'paid' : 'received';
        setPayForm({
            amount: '',
            type: defaultType,
            method: 'cash',
            date: new Date().toLocaleDateString('sv-SE'),
            note: ''
        });
        setPaymentParty(p);
    };

    const emptyForm = { name: '', phone: '', email: '', gstNumber: '', address: '', city: '', state: 'Tamil Nadu', type: 'customer', openingBalance: '', balance: '', creditLimit: '', creditDays: '', loyaltyPoints: '' };
    const [form, setForm] = useState<any>(emptyForm);
    const up = (k: string, v: any) => setForm((f: any) => {
        const next = { ...f, [k]: v };
        if (k === 'openingBalance' && !editParty) {
            next.balance = v;
        }
        return next;
    });

    const filtered = parties.filter(p => {
        if (typeFilter !== 'all' && p.type !== typeFilter && p.type !== 'both') return false;
        if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.phone.includes(search)) return false;
        return true;
    });

    const totalReceivable = parties.filter(p => p.balance > 0).reduce((a: number, p) => a + p.balance, 0);
    const totalPayable = parties.filter(p => p.balance < 0).reduce((a: number, p) => a + Math.abs(p.balance), 0);

    const customerLoyaltyInvoices = useMemo(() => {
        if (!historyParty) return [];
        
        // Invoice-based loyalty entries
        const invoiceEntries = invoices
            .filter((inv: any) => 
                inv.companyId === companyId && 
                inv.invoiceType === 'sale' && 
                (inv.partyId === historyParty.id || (historyParty.phone && inv.partyPhone === historyParty.phone)) &&
                ((inv.pointsEarned || 0) > 0 || (inv.pointsRedeemed || 0) > 0)
            )
            .map((inv: any) => ({
                id: inv.id,
                date: inv.date,
                time: inv.time || '00:00',
                pointsEarned: inv.pointsEarned || 0,
                pointsRedeemed: inv.pointsRedeemed || 0,
                title: `Invoice ${inv.invoiceNumber}`,
                subTitle: `Bill Amount: ₹${inv.grandTotal.toLocaleString('en-IN')}`,
            }));

        // Manual adjustment entries
        const adjustmentEntries = (historyParty.loyaltyAdjustments || [])
            .map((adj: any) => ({
                id: adj.id,
                date: adj.date,
                time: adj.time || '00:00',
                pointsEarned: adj.points > 0 ? adj.points : 0,
                pointsRedeemed: adj.points < 0 ? -adj.points : 0,
                title: 'Manual Adjustment',
                subTitle: adj.reason || 'Manual points adjustment',
            }));

        // Merge and sort chronologically (newest first)
        return [...invoiceEntries, ...adjustmentEntries].sort((a, b) => {
            const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
            if (dateDiff !== 0) return dateDiff;
            return (b.time || '').localeCompare(a.time || '');
        });
    }, [invoices, historyParty, companyId]);

    const handleSave = () => {
        if (!form.name || !form.phone) { toast.error('Name and phone are required'); return; }
        const balanceValue = parseFloat(form.balance) || 0;
        const openingBalanceValue = parseFloat(form.openingBalance) || 0;
        const data: Omit<Party, 'id'> = {
            companyId: companyId!, type: form.type as any,
            name: form.name, phone: form.phone, email: form.email, gstNumber: form.gstNumber,
            address: form.address, city: form.city, state: form.state,
            openingBalance: openingBalanceValue,
            balance: editParty ? balanceValue : openingBalanceValue,
            creditLimit: parseFloat(form.creditLimit) || undefined,
            creditDays: parseFloat(form.creditDays) || undefined,
            loyaltyPoints: parseInt(form.loyaltyPoints) || 0,
        };
        if (editParty) {
            const oldPoints = editParty.loyaltyPoints || 0;
            const newPoints = parseInt(form.loyaltyPoints) || 0;
            const diff = newPoints - oldPoints;
            let updatedAdjustments = editParty.loyaltyAdjustments || [];
            if (diff !== 0) {
                updatedAdjustments = [
                    {
                        id: 'ladj_' + Date.now().toString(36),
                        date: new Date().toISOString().slice(0, 10),
                        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false }),
                        points: diff,
                        reason: 'Profile manual edit'
                    },
                    ...updatedAdjustments
                ];
            }
            updateParty(editParty.id, { ...data, loyaltyAdjustments: updatedAdjustments });
            setEditParty(null);
            toast.success('Party updated');
        } else {
            const newPoints = parseInt(form.loyaltyPoints) || 0;
            const initialAdjustments = newPoints > 0 ? [
                {
                    id: 'ladj_' + Date.now().toString(36),
                    date: new Date().toISOString().slice(0, 10),
                    time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false }),
                    points: newPoints,
                    reason: 'Opening loyalty points balance'
                }
            ] : [];
            addParty({ ...data, loyaltyAdjustments: initialAdjustments } as any);
            toast.success('Party added');
        }
        setShowAdd(false); setForm(emptyForm);
    };

    const openEdit = (p: Party) => {
        setEditParty(p);
        setForm({ 
            ...p, 
            openingBalance: String(p.openingBalance), 
            balance: String(p.balance),
            creditLimit: String(p.creditLimit || ''), 
            creditDays: String(p.creditDays || ''),
            loyaltyPoints: String(p.loyaltyPoints || '0')
        });
        setShowAdd(true);
    };
    const handleAddPayment = () => {
        if (!paymentParty) return;
        const amt = parseFloat(payForm.amount);
        if (!amt || amt <= 0) { toast.error('Enter a valid amount'); return; }
        addBalancePayment(paymentParty.id, { 
            type: payForm.type,
            amount: amt, 
            method: payForm.method as any, 
            date: payForm.date, 
            note: payForm.note || undefined 
        });
        toast.success(`Payment of ₹${amt.toLocaleString('en-IN')} recorded`);
        setPaymentParty(null);
        setPayForm({ amount: '', type: 'received', method: 'cash', date: new Date().toLocaleDateString('sv-SE'), note: '' });
    };

    const handleAddLoyaltyAdjustment = () => {
        if (!loyaltyAdjustParty) return;
        const pts = parseInt(adjustPointsVal);
        if (!pts || pts <= 0) { toast.error('Enter a valid points amount'); return; }
        const diff = adjustPointsType === 'add' ? pts : -pts;
        const currentPoints = loyaltyAdjustParty.loyaltyPoints || 0;
        const newPoints = Math.max(0, currentPoints + diff);
        const adj = {
            id: 'ladj_' + Date.now().toString(36),
            date: new Date().toISOString().slice(0, 10),
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false }),
            points: diff,
            reason: adjustPointsReason.trim() || 'Manual adjustment'
        };
        const updatedAdjustments = [adj, ...(loyaltyAdjustParty.loyaltyAdjustments || [])];
        updateParty(loyaltyAdjustParty.id, {
            loyaltyPoints: newPoints,
            loyaltyAdjustments: updatedAdjustments
        });
        toast.success(`Loyalty points adjusted: ${diff > 0 ? '+' : ''}${diff} pts`);
        
        // Update both drawer states to keep them in sync
        setHistoryParty(p => p && p.id === loyaltyAdjustParty.id ? { ...p, loyaltyPoints: newPoints, loyaltyAdjustments: updatedAdjustments } : p);
        
        // Reset states
        setLoyaltyAdjustParty(null);
        setAdjustPointsVal('');
        setAdjustPointsType('add');
        setAdjustPointsReason('');
    };

    const handleDelete = async (id: string) => {
        const yes = await confirm({ message: 'This party and all their ledger data will be removed.', danger: true });
        if (yes) { deleteParty(id); toast.success('Party deleted'); }
    };

    const exportCSV = () => {
        const header = 'Name,Phone,Email,GST,Type,Address,City,State,Opening Balance\n';
        const rows = parties.map(p => `"${p.name}","${p.phone}","${p.email || ''}","${p.gstNumber || ''}","${p.type}","${p.address || ''}","${p.city || ''}","${p.state || ''}",${p.openingBalance}`).join('\n');
        const blob = new Blob(['\uFEFF' + header + rows], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'edibio_parties.csv'; a.click(); URL.revokeObjectURL(url);
    };

    const importRef = useRef<HTMLInputElement>(null);
    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => {
            const text = ev.target?.result as string;
            const rows = text.split('\n').slice(1).filter(Boolean);
            rows.forEach(row => {
                const cols = row.split(',').map(c => c.replace(/^"|"$/g, '').trim());
                if (!cols[0]) return;
                addParty({ companyId: companyId!, name: cols[0], phone: cols[1], email: cols[2], gstNumber: cols[3], type: (cols[4] as any) || 'customer', address: cols[5], city: cols[6], state: cols[7], openingBalance: parseFloat(cols[8]) || 0, balance: parseFloat(cols[8]) || 0 });
            });
            toast.success(`Imported ${rows.length} parties`);
        };
        reader.readAsText(file);
        e.target.value = '';
    };

    return (
        <>
            <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                    {[
                        { l: 'Total Parties', v: String(parties.length), color: '#4285F4', Icon: Users },
                        { l: 'To Receive', v: `₹${totalReceivable.toLocaleString('en-IN')}`, color: '#34A853', Icon: TrendingUp },
                        { l: 'To Pay', v: `₹${totalPayable.toLocaleString('en-IN')}`, color: '#EA4335', Icon: TrendingDown },
                    ].map(({ l, v, color, Icon }) => (
                        <div key={l} className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 42, height: 42, borderRadius: 12, background: color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <Icon size={19} color={color} />
                            </div>
                            <div>
                                <p style={{ fontSize: 10, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', marginBottom: 3 }}>{l}</p>
                                <p style={{ fontSize: 18, fontWeight: 900, color: '#1A1A2E' }}>{v}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
                        <Search size={15} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#A0AEC0' }} />
                        <input className="e-input" placeholder="Search name or phone…" value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 34 }} />
                    </div>
                    {['all', 'customer', 'supplier'].map(t => (
                        <button key={t} onClick={() => setTypeFilter(t as any)}
                            style={{ padding: '9px 16px', borderRadius: 10, border: '1.5px solid', cursor: 'pointer', textTransform: 'capitalize', fontWeight: 700, fontSize: 12, transition: 'all 0.15s', borderColor: typeFilter === t ? '#4285F4' : '#E1E4E8', background: typeFilter === t ? '#4285F4' : 'white', color: typeFilter === t ? 'white' : '#718096' }}>
                            {t}
                        </button>
                    ))}
                    <button onClick={exportCSV} className="btn btn-outline btn-sm" style={{ gap: 5 }}><Download size={13} /> Export</button>
                    <button onClick={() => importRef.current?.click()} className="btn btn-outline btn-sm" style={{ gap: 5 }}><Upload size={13} /> Import</button>
                    <button onClick={() => { setEditParty(null); setForm(emptyForm); setShowAdd(true); }} className="btn btn-blue btn-sm" style={{ gap: 5 }}>
                        <Plus size={13} /> Add Party
                    </button>
                    <input ref={importRef} type="file" accept=".csv" onChange={handleImport} style={{ display: 'none' }} />
                </div>

                <div className="card" style={{ overflow: 'hidden' }}>
                    {filtered.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '56px 20px' }}>
                            <Users size={44} style={{ color: '#E1E4E8', margin: '0 auto 12px' }} />
                            <p style={{ color: '#A0AEC0', fontWeight: 600, fontSize: 14 }}>No parties yet</p>
                            <button onClick={() => setShowAdd(true)} className="btn btn-blue btn-sm" style={{ display: 'inline-flex', marginTop: 12, gap: 5 }}>
                                <Plus size={13} /> Add Party
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="desktop-table" style={{ overflowX: 'auto' }}>
                                <table className="e-table">
                                    <thead><tr><th>Name</th><th>Phone</th><th>GST</th><th>Type</th><th>City</th><th>Balance</th>{company?.loyaltyPointsEnabled && <th>Loyalty Points</th>}<th>Actions</th></tr></thead>
                                    <tbody>
                                        {filtered.map(p => (
                                            <tr key={p.id}>
                                                <td style={{ fontWeight: 700, color: '#1A1A2E' }}>{p.name}</td>
                                                <td><a href={`tel:${p.phone}`} style={{ color: '#4285F4', textDecoration: 'none', fontSize: 13 }}>{p.phone}</a></td>
                                                <td style={{ fontFamily: 'monospace', fontSize: 11, color: '#718096' }}>{p.gstNumber || '—'}</td>
                                                <td>
                                                    <span className={`badge ${p.type === 'customer' ? 'badge-green' : p.type === 'supplier' ? 'badge-blue' : 'badge-gray'}`} style={{ textTransform: 'capitalize' }}>{p.type}</span>
                                                </td>
                                                <td style={{ fontSize: 12, color: '#718096' }}>{p.city || '—'}</td>
                                                <td style={{ fontWeight: 800, color: p.balance > 0 ? '#34A853' : p.balance < 0 ? '#EA4335' : '#CBD5E0' }}>
                                                    {p.balance > 0 ? `↑ ₹${p.balance.toLocaleString('en-IN')}` : p.balance < 0 ? `↓ ₹${Math.abs(p.balance).toLocaleString('en-IN')}` : '—'}
                                                </td>
                                                {company?.loyaltyPointsEnabled && (
                                                    <td style={{ fontWeight: 700, color: '#2F855A' }}>{p.loyaltyPoints || 0} pts</td>
                                                )}
                                                <td>
                                                    <div style={{ display: 'flex', gap: 8 }}>
                                                        <a href={`tel:${p.phone}`} className="btn btn-ghost" style={{ padding: 0, width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#E6F4EA', borderRadius: '50%', minWidth: 'auto' }} title="Call"><Phone size={16} color="#34A853" /></a>
                                                        <a href={`https://wa.me/91${p.phone.replace(/\D/g, '')}`} target="_blank" className="btn btn-ghost" style={{ padding: 0, width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#E6F4EA', borderRadius: '50%', minWidth: 'auto' }} title="WhatsApp"><MessageSquare size={16} color="#25D366" /></a>
                                                        <button onClick={() => openPaymentModal(p)} className="btn btn-ghost" style={{ padding: 0, width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#F3E8FF', borderRadius: '50%', minWidth: 'auto' }} title="Record Payment"><IndianRupee size={16} color="#9333EA" /></button>
                                                        <button onClick={() => { setHistoryParty(p); setHistoryTab('payments'); }} className="btn btn-ghost" style={{ padding: 0, width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#FEF3C7', borderRadius: '50%', minWidth: 'auto' }} title="Payment History"><History size={16} color="#F59E0B" /></button>
                                                        <button onClick={() => openEdit(p)} className="btn btn-ghost" style={{ padding: 0, width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#E8F0FE', borderRadius: '50%', minWidth: 'auto' }} title="Edit"><Edit2 size={16} color="#4285F4" /></button>
                                                        <button onClick={() => handleDelete(p.id)} className="btn btn-ghost" style={{ padding: 0, width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#FCE8E6', borderRadius: '50%', minWidth: 'auto' }} title="Delete"><Trash2 size={16} color="#EA4335" /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mobile-list">
                                {filtered.map(p => (
                                    <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderBottom: '1px solid #F8F9FA' }}>
                                        <div style={{ width: 42, height: 42, borderRadius: 12, background: p.type === 'customer' ? '#E6F4EA' : '#E8F0FE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, color: p.type === 'customer' ? '#137333' : '#1967D2', flexShrink: 0 }}>
                                            {p.name[0]}
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p style={{ fontWeight: 700, fontSize: 13, color: '#1A1A2E', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</p>
                                            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                                                <span style={{ fontSize: 11, color: '#A0AEC0' }}>{p.phone}</span>
                                                {company?.loyaltyPointsEnabled && (
                                                    <span style={{ fontSize: 11, color: '#2F855A', fontWeight: 600 }}>🌟 {p.loyaltyPoints || 0} pts</span>
                                                )}
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                            <p style={{ fontWeight: 800, fontSize: 13, color: p.balance > 0 ? '#34A853' : p.balance < 0 ? '#EA4335' : '#CBD5E0' }}>
                                                {p.balance !== 0 ? `₹${Math.abs(p.balance).toLocaleString('en-IN')}` : '—'}
                                            </p>
                                            <div style={{ display: 'flex', gap: 8, marginTop: 6, justifyContent: 'flex-end', alignItems: 'center' }}>
                                                <a href={`tel:${p.phone}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#E6F4EA', border: 'none', padding: 0, borderRadius: '50%', width: 32, height: 32 }} title="Call"><Phone size={15} color="#34A853" /></a>
                                                <a href={`https://wa.me/91${p.phone.replace(/\D/g, '')}`} target="_blank" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#E6F4EA', border: 'none', padding: 0, borderRadius: '50%', width: 32, height: 32 }} title="WhatsApp"><MessageSquare size={15} color="#25D366" /></a>
                                                <button onClick={() => openPaymentModal(p)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F3E8FF', border: 'none', cursor: 'pointer', padding: 0, borderRadius: '50%', width: 32, height: 32 }} title="Record Payment"><IndianRupee size={15} color="#9333EA" /></button>
                                                <button onClick={() => { setHistoryParty(p); setHistoryTab('payments'); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FEF3C7', border: 'none', cursor: 'pointer', padding: 0, borderRadius: '50%', width: 32, height: 32 }} title="Payment History"><History size={15} color="#F59E0B" /></button>
                                                <button onClick={() => openEdit(p)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#E8F0FE', border: 'none', cursor: 'pointer', padding: 0, borderRadius: '50%', width: 32, height: 32 }} title="Edit"><Edit2 size={15} color="#4285F4" /></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* ── Record Payment Modal ── */}
            {paymentParty && (
                <div className="modal-overlay" onClick={() => setPaymentParty(null)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 420 }}>
                        <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid #E1E4E8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ fontWeight: 900, fontSize: 16, color: '#1A1A2E', margin: 0 }}>Record Payment</h3>
                                <p style={{ fontSize: 12, color: '#718096', margin: '2px 0 0' }}>
                                    {paymentParty.name} — Balance: <strong style={{ color: paymentParty.balance > 0 ? '#34A853' : paymentParty.balance < 0 ? '#EA4335' : '#718096' }}>{paymentParty.balance > 0 ? `↑ ₹${paymentParty.balance.toLocaleString('en-IN')}` : paymentParty.balance < 0 ? `↓ ₹${Math.abs(paymentParty.balance).toLocaleString('en-IN')}` : 'Settled'}</strong>
                                </p>
                            </div>
                            <button onClick={() => setPaymentParty(null)} className="btn btn-ghost btn-icon"><X size={16} /></button>
                        </div>
                        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <div>
                                <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Payment Type</label>
                                <div style={{ display: 'flex', gap: 8, background: '#EDF2F7', padding: 4, borderRadius: 10 }}>
                                    <button onClick={() => setPayForm(f => ({ ...f, type: 'received' }))}
                                        style={{ flex: 1, padding: '8px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 800, fontSize: 12, background: payForm.type === 'received' ? '#10B981' : 'transparent', color: payForm.type === 'received' ? 'white' : '#718096', transition: 'all 0.15s' }}>
                                        Received (Cash In)
                                    </button>
                                    <button onClick={() => setPayForm(f => ({ ...f, type: 'paid' }))}
                                        style={{ flex: 1, padding: '8px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 800, fontSize: 12, background: payForm.type === 'paid' ? '#EF4444' : 'transparent', color: payForm.type === 'paid' ? 'white' : '#718096', transition: 'all 0.15s' }}>
                                        Paid (Cash Out)
                                    </button>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', textTransform: 'uppercase', display: 'block', marginBottom: 5 }}>Amount ₹ *</label>
                                    <input type="number" className="e-input" placeholder="0.00" value={payForm.amount} onChange={e => setPayForm(f => ({ ...f, amount: e.target.value }))} style={{ padding: '10px 12px' }} autoFocus />
                                </div>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', textTransform: 'uppercase', display: 'block', marginBottom: 5 }}>Date *</label>
                                    <input type="date" className="e-input" value={payForm.date} onChange={e => setPayForm(f => ({ ...f, date: e.target.value }))} style={{ padding: '10px 12px' }} />
                                </div>
                            </div>
                            <div>
                                <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Method</label>
                                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                    {['cash','upi','bank','cheque','neft','rtgs','other'].map(m => (
                                        <button key={m} onClick={() => setPayForm(f => ({ ...f, method: m }))}
                                            style={{ padding: '6px 12px', borderRadius: 8, border: '1.5px solid', fontSize: 11, fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', background: payForm.method === m ? '#9333EA' : 'white', color: payForm.method === m ? 'white' : '#718096', borderColor: payForm.method === m ? '#9333EA' : '#E2E8F0' }}>
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', textTransform: 'uppercase', display: 'block', marginBottom: 5 }}>Note</label>
                                <input className="e-input" placeholder="e.g. Cheque no. 123456" value={payForm.note} onChange={e => setPayForm(f => ({ ...f, note: e.target.value }))} style={{ padding: '10px 12px' }} />
                            </div>
                        </div>
                        <div style={{ padding: '12px 20px 16px', borderTop: '1px solid #E1E4E8', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <button onClick={() => setPaymentParty(null)} className="btn btn-outline">Cancel</button>
                            <button onClick={handleAddPayment} style={{ background: 'linear-gradient(135deg,#7C3AED,#9333EA)', color: 'white', border: 'none', borderRadius: 10, padding: '10px 20px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                                <CheckCircle2 size={14} /> Save Payment
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Customer History/Ledger Drawer ── */}
            {historyParty && (
                <div className="modal-overlay" onClick={() => setHistoryParty(null)}>
                    <div onClick={e => e.stopPropagation()} style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: '100%', maxWidth: 460, background: 'white', boxShadow: '-8px 0 40px rgba(0,0,0,0.12)', display: 'flex', flexDirection: 'column', zIndex: 60 }}>
                        <div style={{ padding: '20px 24px 16px', background: 'linear-gradient(135deg,#1E293B,#0F172A)', color: 'white' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                                <div>
                                    <p style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 4px' }}>Customer Ledger &amp; History</p>
                                    <h2 style={{ fontSize: 20, fontWeight: 900, margin: '0 0 2px' }}>{historyParty.name}</h2>
                                    <p style={{ fontSize: 12, color: '#94A3B8', margin: 0 }}>{historyParty.phone}</p>
                                </div>
                                <button onClick={() => setHistoryParty(null)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 8, padding: 8, cursor: 'pointer', color: 'white', display: 'flex' }}><X size={16} /></button>
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                {[{ label: 'Current Balance', value: `₹${Math.abs(historyParty.balance).toLocaleString('en-IN')}`, sub: historyParty.balance > 0 ? 'To Receive' : historyParty.balance < 0 ? 'To Pay' : 'Settled', color: historyParty.balance > 0 ? '#4ADE80' : historyParty.balance < 0 ? '#F87171' : '#94A3B8' }, { label: 'Total Repaid', value: `₹${(historyParty.paymentHistory || []).reduce((a, h) => a + h.amount, 0).toLocaleString('en-IN')}`, sub: `${(historyParty.paymentHistory || []).length} entries`, color: '#4ADE80' }].map(s => (
                                    <div key={s.label} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '10px 14px' }}>
                                        <p style={{ fontSize: 10, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 3px' }}>{s.label}</p>
                                        <p style={{ fontSize: 18, fontWeight: 900, margin: 0, color: s.color }}>{s.value}</p>
                                        <p style={{ fontSize: 10, color: '#64748B', margin: '2px 0 0', fontWeight: 600 }}>{s.sub}</p>
                                    </div>
                                ))}
                            </div>

                            {company?.loyaltyPointsEnabled && (
                                <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)', marginTop: 16 }}>
                                    <button 
                                        onClick={() => setHistoryTab('payments')} 
                                        style={{ 
                                            flex: 1, padding: '10px 0', border: 'none', background: 'transparent', 
                                            color: historyTab === 'payments' ? '#4ADE80' : '#94A3B8', 
                                            fontWeight: 800, borderBottom: historyTab === 'payments' ? '3px solid #4ADE80' : 'none', cursor: 'pointer', fontSize: 12
                                        }}
                                    >
                                        💳 Payments
                                    </button>
                                    <button 
                                        onClick={() => setHistoryTab('loyalty')} 
                                        style={{ 
                                            flex: 1, padding: '10px 0', border: 'none', background: 'transparent', 
                                            color: historyTab === 'loyalty' ? '#FBBF24' : '#94A3B8', 
                                            fontWeight: 800, borderBottom: historyTab === 'loyalty' ? '3px solid #FBBF24' : 'none', cursor: 'pointer', fontSize: 12
                                        }}
                                    >
                                        🌟 Loyalty History
                                    </button>
                                </div>
                            )}
                        </div>

                        {historyTab === 'loyalty' && company?.loyaltyPointsEnabled ? (
                            <>
                                <div style={{ flex: 1, overflowY: 'auto' }}>
                                    <div style={{ margin: '16px 20px', padding: '16px', background: '#FEF3C7', borderRadius: 14, border: '1px solid #FDE68A', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <p style={{ fontSize: 10, color: '#D97706', fontWeight: 800, textTransform: 'uppercase', margin: '0 0 3px' }}>Current Loyalty Points</p>
                                            <p style={{ fontSize: 24, fontWeight: 900, color: '#92400E', margin: 0 }}>
                                                {historyParty.loyaltyPoints || 0} <span style={{ fontSize: 13, fontWeight: 700 }}>pts</span>
                                            </p>
                                        </div>
                                        <button 
                                            onClick={() => setLoyaltyAdjustParty(historyParty)}
                                            style={{
                                                padding: '8px 14px', background: '#D97706', color: 'white', border: 'none', borderRadius: 10, fontSize: 12, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, transition: 'background 0.15s'
                                            }}
                                        >
                                            Adjust Points
                                        </button>
                                    </div>

                                    {customerLoyaltyInvoices.length === 0 ? (
                                        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                                            <History size={40} style={{ color: '#E2E8F0', margin: '0 auto 12px' }} />
                                            <p style={{ color: '#A0AEC0', fontSize: 14, fontWeight: 600, margin: '0 0 4px' }}>No loyalty points transactions</p>
                                            <p style={{ color: '#CBD5E0', fontSize: 12 }}>Points are earned or redeemed during sales billing</p>
                                        </div>
                                    ) : (
                                        customerLoyaltyInvoices.map((inv: any) => {
                                            const earned = inv.pointsEarned || 0;
                                            const redeemed = inv.pointsRedeemed || 0;
                                            return (
                                                <div key={inv.id} style={{ padding: '14px 20px', borderBottom: '1px solid #F8FAFC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <div>
                                                        <p style={{ fontSize: 13, fontWeight: 700, color: '#1E293B', margin: '0 0 2px' }}>
                                                            {inv.title}
                                                        </p>
                                                        <p style={{ fontSize: 11, color: '#64748B', margin: '0 0 4px', fontWeight: 600 }}>
                                                            {new Date(inv.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })} {inv.time && inv.time !== '00:00' ? `· ${inv.time}` : ''}
                                                        </p>
                                                        <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>
                                                            {inv.subTitle}
                                                        </p>
                                                    </div>
                                                    <div style={{ textAlign: 'right' }}>
                                                        {earned > 0 && (
                                                            <p style={{ fontSize: 14, fontWeight: 900, color: '#059669', margin: 0 }}>
                                                                +{earned} pts
                                                            </p>
                                                        )}
                                                        {redeemed > 0 && (
                                                            <p style={{ fontSize: 14, fontWeight: 900, color: '#DC2626', margin: 0 }}>
                                                                -{redeemed} pts
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <div style={{ padding: '10px 16px', borderBottom: '1px solid #F1F5F9', background: '#FAFBFF' }}>
                                    <button onClick={() => { openPaymentModal(historyParty); setHistoryParty(null); }} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 10, background: '#9333EA', color: 'white', border: 'none', fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>
                                        <IndianRupee size={13} /> Record New Payment
                                    </button>
                                </div>
                                <div style={{ flex: 1, overflowY: 'auto' }}>
                                    {(historyParty.paymentHistory || []).length === 0 ? (
                                        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                                            <History size={40} style={{ color: '#E2E8F0', margin: '0 auto 12px' }} />
                                            <p style={{ color: '#A0AEC0', fontSize: 14, fontWeight: 600, margin: '0 0 4px' }}>No payment history yet</p>
                                            <p style={{ color: '#CBD5E0', fontSize: 12 }}>Record the first payment above</p>
                                        </div>
                                    ) : (historyParty.paymentHistory || []).map((entry, idx, arr) => (
                                        <div key={entry.id} style={{ padding: '14px 20px', borderBottom: '1px solid #F8FAFC', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 3, flexShrink: 0 }}>
                                                <div style={{ width: 10, height: 10, borderRadius: '50%', background: (entry.type || 'received') === 'received' ? '#10B981' : '#EF4444' }} />
                                                {idx < arr.length - 1 && <div style={{ width: 2, background: '#F1F5F9', flex: 1, minHeight: 28, marginTop: 4 }} />}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                    <div>
                                                        <p style={{ fontSize: 16, fontWeight: 900, color: (entry.type || 'received') === 'received' ? '#059669' : '#DC2626', margin: '0 0 2px' }}>
                                                            {(entry.type || 'received') === 'received' ? '+' : '-'}₹{entry.amount.toLocaleString('en-IN')}
                                                        </p>
                                                        <p style={{ fontSize: 11, fontWeight: 800, color: (entry.type || 'received') === 'received' ? '#10B981' : '#EF4444', textTransform: 'uppercase', margin: '0 0 4px', letterSpacing: '0.03em' }}>
                                                            {(entry.type || 'received') === 'received' ? 'Received (Cash In)' : 'Paid (Cash Out)'}
                                                        </p>
                                                        <p style={{ fontSize: 12, color: '#64748B', margin: '0 0 5px', fontWeight: 600 }}>{new Date(entry.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                                        <span style={{ background: '#F3E8FF', color: '#7C3AED', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 6, textTransform: 'uppercase' }}>{entry.method}</span>
                                                        {entry.note && <p style={{ fontSize: 11, color: '#94A3B8', margin: '5px 0 0', fontStyle: 'italic' }}>"{entry.note}"</p>}
                                                    </div>
                                                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                                        <p style={{ fontSize: 10, color: '#CBD5E0', fontWeight: 600, margin: '0 0 1px' }}>Balance after</p>
                                                        <p style={{ fontSize: 13, fontWeight: 800, color: '#1E293B', margin: '0 0 4px' }}>₹{Math.abs(entry.balanceAfter).toLocaleString('en-IN')}</p>
                                                        <button onClick={async () => { const { confirm } = await import('@/components/ConfirmDialog'); const ok = await confirm({ message: 'Delete entry? Balance will be reversed.', danger: true }); if (ok) { deleteBalancePayment(historyParty.id, entry.id); const adjusted = (entry.type || 'received') === 'received' ? historyParty.balance + entry.amount : historyParty.balance - entry.amount; setHistoryParty(prev => prev ? { ...prev, balance: adjusted, paymentHistory: (prev.paymentHistory || []).filter(h => h.id !== entry.id) } : null); toast.success('Entry deleted'); }}} style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.45, padding: 2 }}><Trash2 size={11} color="#EA4335" /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Add/Edit Party Modal */}
            {showAdd && (
                <div className="modal-overlay" onClick={() => setShowAdd(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 540, maxHeight: '90dvh', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '18px 24px 14px', borderBottom: '1px solid #E1E4E8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h3 style={{ fontWeight: 900, fontSize: 17, color: '#1A1A2E' }}>{editParty ? 'Edit Party' : 'Add New Party'}</h3>
                            <button onClick={() => { setShowAdd(false); setEditParty(null); }} className="btn btn-ghost btn-icon"><X size={18} /></button>
                        </div>
                        <div style={{ overflowY: 'auto', flex: 1, padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <div>
                                <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Party Type *</label>
                                <div style={{ display: 'flex', gap: 8, background: '#EDF2F7', padding: 4, borderRadius: 10, marginBottom: 16 }}>
                                    {['customer', 'supplier', 'both'].map(t => (
                                        <button key={t} onClick={() => up('type', t)}
                                            style={{ flex: 1, padding: '8px', borderRadius: 8, border: 'none', cursor: 'pointer', textTransform: 'capitalize', fontWeight: 800, fontSize: 13, transition: 'all 0.15s', background: form.type === t ? 'white' : 'transparent', color: form.type === t ? '#1967D2' : '#718096', boxShadow: form.type === t ? '0 2px 4px rgba(0,0,0,0.05)' : 'none' }}>
                                            {t}
                                        </button>
                                    ))}
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name *</label>
                                        <input className="e-input" placeholder="Full name" value={form.name} onChange={e => up('name', e.target.value)} style={{ padding: '10px 14px' }} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone *</label>
                                        <input className="e-input" placeholder="+91 98765 43210" value={form.phone} onChange={e => up('phone', e.target.value)} style={{ padding: '10px 14px' }} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
                                        <input type="email" className="e-input" placeholder="email@example.com" value={form.email} onChange={e => up('email', e.target.value)} style={{ padding: '10px 14px' }} />
                                    </div>
                                    <div style={{ gridColumn: '1/-1' }}>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>GST Number</label>
                                        <input className="e-input" placeholder="22AAAAA0000A1Z5" value={form.gstNumber} onChange={e => up('gstNumber', e.target.value.toUpperCase())} style={{ fontFamily: 'monospace', letterSpacing: '0.08em', padding: '10px 14px' }} />
                                    </div>
                                    <div style={{ gridColumn: '1/-1' }}>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Address</label>
                                        <input className="e-input" placeholder="Street address" value={form.address} onChange={e => up('address', e.target.value)} style={{ padding: '10px 14px' }} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>City</label>
                                        <input className="e-input" placeholder="Chennai" value={form.city} onChange={e => up('city', e.target.value)} style={{ padding: '10px 14px' }} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>State</label>
                                        <select className="e-select" value={form.state} onChange={e => up('state', e.target.value)} style={{ padding: '10px 14px' }}>
                                            {INDIAN_STATES.map(s => <option key={s}>{s}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Opening Balance ₹</label>
                                        <input type="number" className="e-input" placeholder="0.00 (+ rec, - pay)" value={form.openingBalance} onChange={e => up('openingBalance', e.target.value)} style={{ padding: '10px 14px' }} />
                                    </div>
                                    {editParty && (
                                        <div>
                                            <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Running Balance ₹</label>
                                            <input type="number" className="e-input" placeholder="0.00 (+ rec, - pay)" value={form.balance} onChange={e => up('balance', e.target.value)} style={{ padding: '10px 14px' }} />
                                        </div>
                                    )}
                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Credit Limit ₹</label>
                                        <input type="number" className="e-input" placeholder="Optional" value={form.creditLimit} onChange={e => up('creditLimit', e.target.value)} style={{ padding: '10px 14px' }} />
                                    </div>
                                    {company?.loyaltyPointsEnabled && (
                                        <div>
                                            <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Loyalty Points</label>
                                            <input type="number" className="e-input" placeholder="0" value={form.loyaltyPoints} onChange={e => up('loyaltyPoints', e.target.value)} style={{ padding: '10px 14px' }} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: '14px 24px', borderTop: '1px solid #E1E4E8', display: 'flex', gap: 10, justifyContent: 'flex-end', background: 'white', borderRadius: '0 0 16px 16px' }}>
                            <button onClick={() => { setShowAdd(false); setEditParty(null); }} className="btn btn-outline">Cancel</button>
                            <button onClick={handleSave} className="btn btn-blue">{editParty ? 'Update Party' : 'Add Party'}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Manual Loyalty Adjustment Modal ── */}
            {loyaltyAdjustParty && (
                <div className="modal-overlay" onClick={() => setLoyaltyAdjustParty(null)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 400 }}>
                        <div style={{ padding: '16px 20px', borderBottom: '1px solid #E1E4E8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h3 style={{ fontWeight: 800, fontSize: 16, color: '#1A1A2E' }}>Adjust Loyalty Points</h3>
                            <button onClick={() => setLoyaltyAdjustParty(null)} className="btn btn-ghost btn-icon"><X size={18} /></button>
                        </div>
                        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div>
                                <p style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', marginBottom: 6 }}>Action</p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                    <button 
                                        onClick={() => setAdjustPointsType('add')} 
                                        style={{ 
                                            padding: '10px', borderRadius: 10, border: '2px solid', 
                                            borderColor: adjustPointsType === 'add' ? '#10B981' : '#E2E8F0',
                                            background: adjustPointsType === 'add' ? '#ECFDF5' : 'white',
                                            color: adjustPointsType === 'add' ? '#047857' : '#4A5568',
                                            fontWeight: 800, cursor: 'pointer'
                                        }}
                                    >
                                        ➕ Add Points
                                    </button>
                                    <button 
                                        onClick={() => setAdjustPointsType('deduct')} 
                                        style={{ 
                                            padding: '10px', borderRadius: 10, border: '2px solid', 
                                            borderColor: adjustPointsType === 'deduct' ? '#EF4444' : '#E2E8F0',
                                            background: adjustPointsType === 'deduct' ? '#FEF2F2' : 'white',
                                            color: adjustPointsType === 'deduct' ? '#B91C1C' : '#4A5568',
                                            fontWeight: 800, cursor: 'pointer'
                                        }}
                                    >
                                        ➖ Deduct Points
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Points Amount</label>
                                <input 
                                    type="number" 
                                    className="e-input" 
                                    placeholder="e.g. 50" 
                                    value={adjustPointsVal} 
                                    onChange={e => setAdjustPointsVal(e.target.value)} 
                                />
                            </div>

                            <div>
                                <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Reason / Note</label>
                                <input 
                                    type="text" 
                                    className="e-input" 
                                    placeholder="e.g. Birthday bonus, mistake correction..." 
                                    value={adjustPointsReason} 
                                    onChange={e => setAdjustPointsReason(e.target.value)} 
                                />
                            </div>
                        </div>
                        <div style={{ padding: '12px 20px 16px', borderTop: '1px solid #E1E4E8', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <button onClick={() => setLoyaltyAdjustParty(null)} className="btn btn-outline">Cancel</button>
                            <button onClick={handleAddLoyaltyAdjustment} style={{ background: adjustPointsType === 'add' ? '#10B981' : '#EF4444', color: 'white', border: 'none', borderRadius: 10, padding: '10px 20px', fontWeight: 800, cursor: 'pointer' }}>
                                Confirm Adjustment
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .desktop-table { display: none; }
                .mobile-list { display: block; }
                @media (min-width: 768px) { .desktop-table { display: block; } .mobile-list { display: none; } }
            `}</style>
        </>
    );
}
