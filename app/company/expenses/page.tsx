'use client';
import { useState } from 'react';
import { useStore, useCompanyData, useActiveCompany } from '@/lib/store';
import { formatDate, PAYMENT_METHODS } from '@/lib/utils';
import type { Expense, AgencyProject } from '@/lib/types';
import { Plus, Lock, Unlock, DollarSign, TrendingDown, Calendar, Trash2, X, Search, Download, PieChart, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';
import { confirm } from '@/components/ConfirmDialog';

const EXPENSE_CATEGORIES = [
    'Rent', 'Electricity', 'Water', 'Internet', 'Phone Bill', 'Salaries & Wages',
    'Purchase Stock', 'Transport & Delivery', 'Marketing & Ads', 'Equipment & Tools',
    'Maintenance & Repairs', 'Packaging', 'Fuel', 'Office Supplies', 'Bank Charges',
    'Insurance', 'Professional Fees', 'Cleaning', 'Security', 'Miscellaneous',
];

export default function ExpensesPage() {
    const { activeCompanyId, addExpense, deleteExpense } = useStore();
    const companyId = activeCompanyId;
    const company = useActiveCompany();
    const isAgency = company?.type === 'Digital Agency';
    const expenses = useCompanyData('expenses') as Expense[];
    const agencyProjects = useCompanyData('agencyProjects') as AgencyProject[];

    const [isUnlocked, setIsUnlocked] = useState(false);
    const [pwInput, setPwInput] = useState('');
    const [pwError, setPwError] = useState('');

    const [search, setSearch] = useState('');
    const [catFilter, setCatFilter] = useState('');
    const [showAdd, setShowAdd] = useState(false);
    const [form, setForm] = useState({ category: 'Rent', description: '', amount: '', gstAmount: '', date: new Date().toISOString().slice(0, 10), paymentMethod: 'cash', projectId: '' });
    const up = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

    const verifyPw = () => {
        const pw = company?.invoicePassword;
        if (!pw || pwInput === pw) { setIsUnlocked(true); setPwError(''); }
        else { setPwError('Incorrect password. Please try again.'); }
    };

    const filtered = expenses.filter(e => {
        if (catFilter && e.category !== catFilter) return false;
        if (search && !e.category.toLowerCase().includes(search.toLowerCase()) && !(e.description || '').toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    const totalExpenses = expenses.reduce((a, e) => a + e.amount, 0);
    const thisMonth = expenses.filter(e => e.date?.slice(0, 7) === new Date().toISOString().slice(0, 7)).reduce((a, e) => a + e.amount, 0);

    const catTotals: Record<string, number> = {};
    expenses.forEach(e => { catTotals[e.category] = (catTotals[e.category] || 0) + e.amount; });
    const topCats = Object.entries(catTotals).sort((a, b) => b[1] - a[1]).slice(0, 5);

    const handleSave = () => {
        if (!form.amount || parseFloat(form.amount) <= 0) { toast.error('Enter expense amount'); return; }
        addExpense({
            companyId: companyId!, category: form.category,
            description: form.description || undefined,
            amount: parseFloat(form.amount),
            gstAmount: form.gstAmount ? parseFloat(form.gstAmount) : undefined,
            date: form.date, paymentMethod: form.paymentMethod as any,
            projectId: form.projectId || undefined,
        });
        setShowAdd(false);
        setForm({ category: 'Rent', description: '', amount: '', gstAmount: '', date: new Date().toISOString().slice(0, 10), paymentMethod: 'cash', projectId: '' });
    };

    const exportCSV = () => {
        const rows = expenses.map(e => `"${e.date}","${e.category}","${e.description || ''}",${e.amount},"${e.paymentMethod}"`).join('\n');
        const blob = new Blob(['\uFEFFDate,Category,Description,Amount,Payment Method\n' + rows], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'edibio_expenses.csv'; a.click(); URL.revokeObjectURL(url);
    };

    if (!isUnlocked) {
        return (
            <div style={{ maxWidth: 380, margin: '80px auto', textAlign: 'center' }}>
                <div style={{ width: 76, height: 76, borderRadius: 22, background: 'linear-gradient(135deg,#EA4335,#FBBC04)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 8px 24px rgba(234,67,53,0.3)' }}>
                    <Lock size={32} color="white" />
                </div>
                <h2 style={{ fontWeight: 900, fontSize: 22, color: '#1A1A2E', marginBottom: 8 }}>Expenses — Restricted</h2>
                <p style={{ color: '#718096', fontSize: 13, marginBottom: 6 }}>
                    The expenses section is password-protected by the shopkeeper.
                </p>
                {!company?.invoicePassword && (
                    <div style={{ background: '#FEF7E0', border: '1px solid #FBBC04', borderRadius: 10, padding: '10px 14px', marginBottom: 14, fontSize: 12, color: '#B45309' }}>
                        ⚠ No password set. Go to <strong>Settings → Security</strong> to set one, or click Unlock to continue.
                    </div>
                )}
                <input type="password" className="e-input" autoFocus placeholder="Enter shopkeeper password"
                    value={pwInput} onChange={e => { setPwInput(e.target.value); setPwError(''); }}
                    onKeyDown={e => e.key === 'Enter' && verifyPw()} style={{ marginBottom: 8 }} />
                {pwError && <p style={{ color: '#EA4335', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>{pwError}</p>}
                <button onClick={verifyPw} className="btn btn-red" style={{ width: '100%', justifyContent: 'center', marginBottom: 12 }}>
                    <Unlock size={15} /> Unlock Expenses
                </button>
            </div>
        );
    }

    return (
        <>
            <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                    {[
                        { l: 'Total Expenses', v: `₹${totalExpenses.toLocaleString('en-IN')}`, icon: TrendingDown, color: '#EA4335' },
                        { l: 'This Month', v: `₹${thisMonth.toLocaleString('en-IN')}`, icon: Calendar, color: '#FBBC04' },
                        { l: 'Categories', v: String(Object.keys(catTotals).length), icon: PieChart, color: '#4285F4' },
                    ].map(({ l, v, icon: Icon, color }) => (
                        <div key={l} className="card" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <Icon size={20} color={color} />
                            </div>
                            <div>
                                <p style={{ fontSize: 10, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', marginBottom: 4 }}>{l}</p>
                                <p style={{ fontSize: 20, fontWeight: 900, color: '#1A1A2E' }}>{v}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Top categories */}
                {topCats.length > 0 && (
                    <div className="card" style={{ padding: '20px 24px' }}>
                        <p style={{ fontSize: 12, fontWeight: 800, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>Top Expense Categories</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {topCats.map(([cat, amt], idx) => {
                                const pct = Math.round(amt / totalExpenses * 100);
                                const colors = ['#EA4335', '#FBBC04', '#4285F4', '#34A853', '#9333EA'];
                                return (
                                    <div key={cat}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12 }}>
                                            <span style={{ fontWeight: 700, color: '#1A1A2E' }}>{cat}</span>
                                            <span style={{ fontWeight: 800, color: colors[idx] }}>₹{amt.toLocaleString('en-IN')} ({pct}%)</span>
                                        </div>
                                        <div style={{ height: 6, background: '#F1F3F5', borderRadius: 3, overflow: 'hidden' }}>
                                            <div style={{ height: '100%', width: `${pct}%`, background: colors[idx], borderRadius: 3, transition: 'width 0.5s ease' }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Controls */}
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
                        <Search size={15} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#A0AEC0' }} />
                        <input className="e-input" placeholder="Search expenses…" value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 34 }} />
                    </div>
                    <select className="e-select" value={catFilter} onChange={e => setCatFilter(e.target.value)} style={{ width: 'auto', minWidth: 160 }}>
                        <option value="">All Categories</option>
                        {EXPENSE_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                    <button onClick={exportCSV} className="btn btn-outline btn-sm" style={{ gap: 5 }}><Download size={13} /> Export</button>
                    <button onClick={() => setShowAdd(true)} className="btn btn-red btn-sm" style={{ gap: 5 }}>
                        <Plus size={13} /> Add Expense
                    </button>
                </div>

                <div className="card" style={{ overflow: 'hidden' }}>
                    {filtered.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '56px 20px' }}>
                            <DollarSign size={44} style={{ color: '#E1E4E8', margin: '0 auto 12px' }} />
                            <p style={{ color: '#A0AEC0', fontWeight: 600, fontSize: 14 }}>No expenses yet</p>
                            <button onClick={() => setShowAdd(true)} className="btn btn-red btn-sm" style={{ display: 'inline-flex', marginTop: 12, gap: 5 }}>
                                <Plus size={13} /> Add Expense
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="desktop-table" style={{ overflowX: 'auto' }}>
                                <table className="e-table">
                                    <thead><tr><th>Date</th><th>Category</th><th>Description</th><th>Amount</th><th>GST</th><th>Payment</th><th></th></tr></thead>
                                    <tbody>
                                        {filtered.map(e => (
                                            <tr key={e.id}>
                                                <td style={{ fontSize: 12, color: '#718096' }}>{formatDate(e.date)}</td>
                                                <td><span className="badge badge-red">{e.category}</span></td>
                                                <td style={{ color: '#718096', fontSize: 12 }}>
                                                    {e.description || '—'}
                                                    {isAgency && e.projectId && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginLeft: 8, color: '#F59E0B', background: '#FEF3C7', padding: '2px 6px', borderRadius: 4, fontSize: 10 }}><Briefcase size={10} /> Proj {e.projectId.split('_')[1]}</span>}
                                                </td>
                                                <td style={{ fontWeight: 900, color: '#EA4335' }}>₹{e.amount.toLocaleString('en-IN')}</td>
                                                <td style={{ fontSize: 12, color: '#718096' }}>{e.gstAmount ? `₹${e.gstAmount}` : '—'}</td>
                                                <td><span className="badge badge-gray" style={{ textTransform: 'capitalize' }}>{e.paymentMethod}</span></td>
                                                <td><button onClick={async () => {
                                                    const yes = await confirm({ message: 'This expense record will be permanently deleted.', danger: true });
                                                    if (yes) { deleteExpense(e.id); toast.success('Expense deleted'); }
                                                }} className="btn btn-ghost btn-icon" style={{ padding: 6, color: '#EA4335' }}><Trash2 size={13} /></button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mobile-list">
                                {filtered.map(e => (
                                    <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderBottom: '1px solid #F8F9FA' }}>
                                        <div style={{ width: 40, height: 40, borderRadius: 11, background: '#FCE8E6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <DollarSign size={18} color="#EA4335" />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontWeight: 700, fontSize: 13, color: '#1A1A2E' }}>{e.category}</p>
                                            <p style={{ fontSize: 11, color: '#A0AEC0' }}>{formatDate(e.date)}{e.description ? ` · ${e.description}` : ''}</p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ fontWeight: 900, fontSize: 14, color: '#EA4335' }}>₹{e.amount.toLocaleString('en-IN')}</p>
                                            <span className="badge badge-gray" style={{ fontSize: 9 }}>{e.paymentMethod}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Add Expense Modal */}
            {showAdd && (
                <div className="modal-overlay" onClick={() => setShowAdd(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 480 }}>
                        <div style={{ padding: '18px 24px 14px', borderBottom: '1px solid #E1E4E8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontWeight: 900, fontSize: 17, color: '#1A1A2E' }}>Add Expense</h3>
                            <button onClick={() => setShowAdd(false)} className="btn btn-ghost btn-icon"><X size={18} /></button>
                        </div>
                        <div style={{ padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <div>
                                <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</label>
                                <select className="e-select" value={form.category} onChange={e => up('category', e.target.value)}>
                                    {EXPENSE_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description</label>
                                <input className="e-input" placeholder="Optional description" value={form.description} onChange={e => up('description', e.target.value)} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Amount ₹ *</label>
                                    <input type="number" className="e-input" placeholder="0.00" value={form.amount} onChange={e => up('amount', e.target.value)} />
                                </div>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>GST Amount ₹</label>
                                    <input type="number" className="e-input" placeholder="0.00" value={form.gstAmount} onChange={e => up('gstAmount', e.target.value)} />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</label>
                                    <input type="date" className="e-input" value={form.date} onChange={e => up('date', e.target.value)} />
                                </div>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Payment</label>
                                    <select className="e-select" value={form.paymentMethod} onChange={e => up('paymentMethod', e.target.value)}>
                                        {PAYMENT_METHODS.map(m => <option key={m.value} value={m.value}>{m.emoji} {m.label}</option>)}
                                    </select>
                                </div>
                            </div>
                            {isAgency && (
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Link to Project</label>
                                    <select className="e-select" value={form.projectId} onChange={e => up('projectId', e.target.value)}>
                                        <option value="">No Project</option>
                                        {agencyProjects.filter(p => p.status === 'ongoing').map(p => (
                                            <option key={p.id} value={p.id}>{p.projectName}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                        <div style={{ padding: '14px 24px', borderTop: '1px solid #E1E4E8', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                            <button onClick={() => setShowAdd(false)} className="btn btn-outline">Cancel</button>
                            <button onClick={handleSave} className="btn btn-red">Add Expense</button>
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
