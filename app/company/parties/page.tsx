'use client';
import { useState, useRef } from 'react';
import { useStore, useCompanyData } from '@/lib/store';
import { INDIAN_STATES } from '@/lib/utils';
import type { Party } from '@/lib/types';
import Link from 'next/link';
import {
    Plus, Search, Users, Trash2, Edit2, Phone, MessageSquare,
    Download, Upload, X, TrendingUp, TrendingDown
} from 'lucide-react';
import toast from 'react-hot-toast';
import { confirm } from '@/components/ConfirmDialog';

export default function PartiesPage() {
    const { activeCompanyId, addParty, updateParty, deleteParty } = useStore();
    const companyId = activeCompanyId;
    const parties = useCompanyData('parties') as Party[];

    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState<'all' | 'customer' | 'supplier'>('all');
    const [showAdd, setShowAdd] = useState(false);
    const [editParty, setEditParty] = useState<Party | null>(null);

    const emptyForm = { name: '', phone: '', email: '', gstNumber: '', address: '', city: '', state: 'Tamil Nadu', type: 'customer', openingBalance: '', creditLimit: '', creditDays: '' };
    const [form, setForm] = useState<any>(emptyForm);
    const up = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

    const filtered = parties.filter(p => {
        if (typeFilter !== 'all' && p.type !== typeFilter && p.type !== 'both') return false;
        if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.phone.includes(search)) return false;
        return true;
    });

    const totalReceivable = parties.filter(p => p.balance > 0).reduce((a: number, p) => a + p.balance, 0);
    const totalPayable = parties.filter(p => p.balance < 0).reduce((a: number, p) => a + Math.abs(p.balance), 0);

    const handleSave = () => {
        if (!form.name || !form.phone) { toast.error('Name and phone are required'); return; }
        const data: Omit<Party, 'id'> = {
            companyId: companyId!, type: form.type as any,
            name: form.name, phone: form.phone, email: form.email, gstNumber: form.gstNumber,
            address: form.address, city: form.city, state: form.state,
            openingBalance: parseFloat(form.openingBalance) || 0,
            balance: editParty ? editParty.balance + ((parseFloat(form.openingBalance) || 0) - editParty.openingBalance) : parseFloat(form.openingBalance) || 0,
            creditLimit: parseFloat(form.creditLimit) || undefined,
            creditDays: parseFloat(form.creditDays) || undefined,
        };
        if (editParty) { updateParty(editParty.id, data); setEditParty(null); toast.success('Party updated'); }
        else { addParty(data); toast.success('Party added'); }
        setShowAdd(false); setForm(emptyForm);
    };

    const openEdit = (p: Party) => {
        setEditParty(p);
        setForm({ ...p, openingBalance: String(p.openingBalance), creditLimit: String(p.creditLimit || ''), creditDays: String(p.creditDays || '') });
        setShowAdd(true);
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
                                    <thead><tr><th>Name</th><th>Phone</th><th>GST</th><th>Type</th><th>City</th><th>Balance</th><th>Actions</th></tr></thead>
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
                                                <td>
                                                    <div style={{ display: 'flex', gap: 6 }}>
                                                        <a href={`tel:${p.phone}`} className="btn btn-ghost btn-icon" style={{ padding: 6 }}><Phone size={13} color="#34A853" /></a>
                                                        <a href={`https://wa.me/91${p.phone.replace(/\D/g, '')}`} target="_blank" className="btn btn-ghost btn-icon" style={{ padding: 6 }}><MessageSquare size={13} color="#25D366" /></a>
                                                        <button onClick={() => openEdit(p)} className="btn btn-ghost btn-icon" style={{ padding: 6 }}><Edit2 size={13} color="#4285F4" /></button>
                                                        <button onClick={() => handleDelete(p.id)} className="btn btn-ghost btn-icon" style={{ padding: 6 }}><Trash2 size={13} color="#EA4335" /></button>
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
                                            <p style={{ fontSize: 11, color: '#A0AEC0' }}>{p.phone}</p>
                                        </div>
                                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                            <p style={{ fontWeight: 800, fontSize: 13, color: p.balance > 0 ? '#34A853' : p.balance < 0 ? '#EA4335' : '#CBD5E0' }}>
                                                {p.balance !== 0 ? `₹${Math.abs(p.balance).toLocaleString('en-IN')}` : '—'}
                                            </p>
                                            <div style={{ display: 'flex', gap: 6, marginTop: 4, justifyContent: 'flex-end' }}>
                                                <a href={`tel:${p.phone}`} style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none' }}><Phone size={13} color="#34A853" /></a>
                                                <a href={`https://wa.me/91${p.phone.replace(/\D/g, '')}`} target="_blank" style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none' }}><MessageSquare size={13} color="#25D366" /></a>
                                                <button onClick={() => openEdit(p)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Edit2 size={13} color="#4285F4" /></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

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
                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Credit Limit ₹</label>
                                        <input type="number" className="e-input" placeholder="Optional" value={form.creditLimit} onChange={e => up('creditLimit', e.target.value)} style={{ padding: '10px 14px' }} />
                                    </div>
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

            <style>{`
                .desktop-table { display: none; }
                .mobile-list { display: block; }
                @media (min-width: 768px) { .desktop-table { display: block; } .mobile-list { display: none; } }
            `}</style>
        </>
    );
}
