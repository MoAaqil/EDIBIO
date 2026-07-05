'use client';
import { useState, useEffect } from 'react';
import { useCompanyData, useActiveCompany } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { ArrowLeft, TrendingUp, TrendingDown, Wallet, DollarSign, Printer, ShoppingBag, Lock, Unlock, CheckCircle, RefreshCw, MessageCircle } from 'lucide-react';
import { buildWhatsAppReminderUrl } from '@/lib/utils';

const METHOD_ICONS: Record<string, string> = {
    cash: '💵', upi: '📱', card: '💳', bank: '🏦',
    cheque: '📝', neft: '🔁', rtgs: '🔄', credit: '🤝',
};

export default function DailyCloseReport() {
    const router = useRouter();
    const company = useActiveCompany();
    const invoices = useCompanyData('invoices') as any[];
    const expenses = useCompanyData('expenses') as any[];
    const parties  = useCompanyData('parties')  as any[];

    const todayISO = new Date().toISOString().slice(0, 10);
    const [selectedDate, setSelectedDate] = useState(todayISO);
    const [closedDays, setClosedDays] = useState<string[]>(() => {
        if (typeof window !== 'undefined') {
            try { return JSON.parse(localStorage.getItem('edibio_closed_days') || '[]'); } catch { return []; }
        }
        return [];
    });
    const isClosed = closedDays.includes(selectedDate);

    const closeDay = () => {
        if (isClosed) return;
        const updated = [...closedDays, selectedDate];
        setClosedDays(updated);
        localStorage.setItem('edibio_closed_days', JSON.stringify(updated));
    };

    const reopenDay = () => {
        const updated = closedDays.filter(d => d !== selectedDate);
        setClosedDays(updated);
        localStorage.setItem('edibio_closed_days', JSON.stringify(updated));
    };

    // --- Filter data for selected date ---
    const DRAFT_TYPES = ['estimate', 'proforma', 'delivery_challan'];
    const dayInvoices = invoices.filter(i => i.date === selectedDate && !DRAFT_TYPES.includes(i.invoiceType));
    const daySales = dayInvoices.filter(i => i.invoiceType === 'sale');
    const daySaleReturns = dayInvoices.filter(i => i.invoiceType === 'sale_return');
    const dayPurchases = dayInvoices.filter(i => i.invoiceType === 'purchase');
    const dayExpenses = expenses.filter(e => e.date === selectedDate);

    const totalSales = daySales.reduce((a, i) => a + i.grandTotal, 0);
    const totalReturns = daySaleReturns.reduce((a, i) => a + Math.abs(i.grandTotal), 0);
    const totalPurchases = dayPurchases.reduce((a, i) => a + i.grandTotal, 0);
    const totalExpenses = dayExpenses.reduce((a, e) => a + e.amount, 0);
    const totalReceived = daySales.reduce((a, i) => a + i.amountPaid, 0);
    const totalPending = daySales.reduce((a, i) => a + (i.balanceDue || 0), 0);
    const netCash = totalReceived - totalPurchases - totalExpenses;
    const totalGstCollected = daySales.reduce((a, i) => a + (i.totalGst || 0), 0);

    // Payment method breakdown
    const paymentBreakdown: Record<string, number> = {};
    daySales.forEach(inv => {
        if (inv.splitPayments && inv.splitPayments.length > 0) {
            inv.splitPayments.forEach((sp: any) => {
                paymentBreakdown[sp.method] = (paymentBreakdown[sp.method] || 0) + sp.amount;
            });
        } else {
            const m = inv.paymentMethod || 'cash';
            paymentBreakdown[m] = (paymentBreakdown[m] || 0) + inv.amountPaid;
        }
    });

    // Top items sold
    const itemMap: Record<string, { name: string; qty: number; revenue: number }> = {};
    daySales.forEach(inv => {
        (inv.items || []).forEach((item: any) => {
            if (!itemMap[item.name]) itemMap[item.name] = { name: item.name, qty: 0, revenue: 0 };
            itemMap[item.name].qty += item.qty;
            itemMap[item.name].revenue += item.amount;
        });
    });
    const topItems = Object.values(itemMap).sort((a, b) => b.revenue - a.revenue).slice(0, 8);
    const maxItemRevenue = Math.max(...topItems.map(i => i.revenue), 1);

    const fmt = (n: number) => `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

    // Due payments — all unpaid/partial sale invoices, grouped by phone number
    const DRAFT_TYPES2 = ['estimate', 'proforma', 'delivery_challan'];
    const rawDues = invoices
        .filter(i => i.invoiceType === 'sale' && !DRAFT_TYPES2.includes(i.invoiceType) && i.paymentStatus !== 'paid' && i.balanceDue > 0)
        .sort((a, b) => a.date.localeCompare(b.date));

    // Normalize phone: strip non-digits, remove leading country code 91
    const normalizePhone = (ph: string) => {
        const d = (ph || '').replace(/\D/g, '');
        return d.startsWith('91') && d.length > 10 ? d.slice(2) : d;
    };

    // Group by normalized phone (fallback to partyId or partyName if no phone)
    type DueGroup = {
        key: string;
        displayName: string;
        phone: string;
        totalDue: number;
        invoices: any[];
        oldestDate: string;
        partyId?: string;
    };
    const dueMap = new Map<string, DueGroup>();
    rawDues.forEach(inv => {
        const normPhone = normalizePhone(inv.partyPhone || '');
        const key = normPhone || inv.partyId || inv.partyName || 'unknown';
        // Try to resolve canonical name from parties list
        const matchedParty = normPhone
            ? parties.find(p => normalizePhone(p.phone) === normPhone)
            : parties.find(p => p.id === inv.partyId);
        if (dueMap.has(key)) {
            const g = dueMap.get(key)!;
            g.totalDue += inv.balanceDue;
            g.invoices.push(inv);
            if (inv.date < g.oldestDate) g.oldestDate = inv.date;
        } else {
            dueMap.set(key, {
                key,
                displayName: matchedParty?.name || inv.partyName || 'Walk-in',
                phone: normPhone || inv.partyPhone || '',
                totalDue: inv.balanceDue,
                invoices: [inv],
                oldestDate: inv.date,
                partyId: matchedParty?.id || inv.partyId,
            });
        }
    });
    const dueGroups = Array.from(dueMap.values()).sort((a, b) => a.oldestDate.localeCompare(b.oldestDate));
    const totalDueOutstanding = dueGroups.reduce((a, g) => a + g.totalDue, 0);

    // Balance repayments recorded on selected date
    type RepayEntry = { partyId: string; partyName: string; type: 'received' | 'paid'; amount: number; method: string; note?: string; recordedAt: string; };
    const dayRepayments: RepayEntry[] = [];
    parties.forEach(p => {
        (p.paymentHistory || []).forEach((pay: any) => {
            if (pay.date === selectedDate) {
                dayRepayments.push({ partyId: p.id, partyName: p.name, type: pay.type, amount: pay.amount, method: pay.method, note: pay.note, recordedAt: pay.recordedAt });
            }
        });
    });
    dayRepayments.sort((a, b) => b.recordedAt.localeCompare(a.recordedAt));
    const totalRepaidReceived = dayRepayments.filter(r => r.type === 'received').reduce((a, r) => a + r.amount, 0);
    const totalRepaidPaid     = dayRepayments.filter(r => r.type === 'paid').reduce((a, r) => a + r.amount, 0);

    return (
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 0 40px' }}>
            <style>{`
                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; }
                }
                .stat-card {
                    background: white;
                    border-radius: 16px;
                    padding: 20px;
                    border: 1px solid #E2E8F0;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .method-bar {
                    height: 8px;
                    border-radius: 4px;
                    transition: width 0.5s ease;
                }
            `}</style>

            {/* Header */}
            <div className="no-print" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 8, display: 'flex', color: '#4A5568' }}>
                    <ArrowLeft size={20} />
                </button>
                <div style={{ flex: 1 }}>
                    <h1 style={{ fontSize: 22, fontWeight: 900, color: '#1A1A2E', margin: 0 }}>Daily Closing Report</h1>
                    <p style={{ fontSize: 13, color: '#718096', marginTop: 2 }}>{company?.name} · End-of-day summary</p>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <input
                        type="date"
                        value={selectedDate}
                        max={todayISO}
                        onChange={e => setSelectedDate(e.target.value)}
                        style={{ padding: '8px 12px', borderRadius: 8, border: '1.5px solid #CBD5E0', fontSize: 14, fontWeight: 700, outline: 'none' }}
                    />
                    <button onClick={() => window.print()} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 8, border: '1.5px solid #CBD5E0', background: 'white', cursor: 'pointer', fontWeight: 700, fontSize: 13, color: '#4A5568' }}>
                        <Printer size={15} /> Print
                    </button>
                </div>
            </div>

            {/* Print header (only visible on print) */}
            <div style={{ display: 'none' }} className="print-header">
                <h2>{company?.name} — Daily Closing Report</h2>
                <p>Date: {selectedDate} | Printed: {new Date().toLocaleString('en-IN')}</p>
            </div>

            {/* Closed day banner */}
            {isClosed && (
                <div style={{ background: 'linear-gradient(135deg, #1A1A2E, #2D3748)', color: 'white', borderRadius: 16, padding: '16px 24px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <Lock size={20} color="#FBBF24" />
                        <div>
                            <p style={{ fontWeight: 900, fontSize: 15, margin: 0 }}>Day Closed & Locked</p>
                            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: 0 }}>{selectedDate} has been closed. No new entries should be recorded.</p>
                        </div>
                    </div>
                    <button onClick={reopenDay} className="no-print" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>
                        <Unlock size={14} /> Reopen
                    </button>
                </div>
            )}

            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14, marginBottom: 20 }}>
                {[
                    { label: 'Total Sales',      value: fmt(totalSales),         sub: `${daySales.length} bills`,    color: '#34A853', icon: <TrendingUp  size={20} color="#34A853" /> },
                    { label: 'Collected',        value: fmt(totalReceived),       sub: `${fmt(totalPending)} pending`, color: '#4285F4', icon: <Wallet       size={20} color="#4285F4" /> },
                    { label: 'Repaid Today',     value: fmt(totalRepaidReceived), sub: `${dayRepayments.filter(r=>r.type==='received').length} entries`, color: '#0EA5E9', icon: <CheckCircle size={20} color="#0EA5E9" /> },
                    { label: 'Outstanding Due',  value: fmt(totalDueOutstanding), sub: `${dueGroups.length} customer${dueGroups.length !== 1 ? 's' : ''}`, color: dueGroups.length > 0 ? '#DC2626' : '#34A853', icon: <TrendingDown size={20} color={dueGroups.length > 0 ? '#DC2626' : '#34A853'} /> },
                    { label: 'Purchases',        value: fmt(totalPurchases),      sub: `${dayPurchases.length} bills`, color: '#EA4335', icon: <TrendingDown size={20} color="#EA4335" /> },
                    { label: 'Expenses',         value: fmt(totalExpenses),       sub: `${dayExpenses.length} entries`, color: '#FBBC04', icon: <DollarSign  size={20} color="#FBBC04" /> },
                    { label: 'Net Cash',         value: fmt(netCash),             sub: 'Collected − Exp − Purchase',  color: netCash >= 0 ? '#34A853' : '#EA4335', icon: <ShoppingBag size={20} color={netCash >= 0 ? '#34A853' : '#EA4335'} /> },
                    { label: 'GST Collected',    value: fmt(totalGstCollected),   sub: 'From sales',                  color: '#6B46C1', icon: <CheckCircle size={20} color="#6B46C1" /> },
                ].map(card => (
                    <div key={card.label} className="stat-card">
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: card.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                            {card.icon}
                        </div>
                        <p style={{ fontSize: 10, fontWeight: 800, color: '#A0AEC0', textTransform: 'uppercase', margin: 0 }}>{card.label}</p>
                        <p style={{ fontSize: 20, fontWeight: 900, color: '#1A1A2E', margin: '2px 0' }}>{card.value}</p>
                        <p style={{ fontSize: 11, color: '#718096', margin: 0 }}>{card.sub}</p>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                {/* Payment Method Breakdown */}
                <div style={{ background: 'white', borderRadius: 16, padding: 24, border: '1px solid #E2E8F0' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1A1A2E', marginBottom: 16 }}>💳 Payment Method Breakdown</h3>
                    {Object.keys(paymentBreakdown).length === 0 ? (
                        <p style={{ color: '#A0AEC0', fontSize: 13 }}>No sales recorded for this date.</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {Object.entries(paymentBreakdown).sort((a, b) => b[1] - a[1]).map(([method, amount]) => {
                                const pct = totalReceived > 0 ? (amount / totalReceived) * 100 : 0;
                                const colors: Record<string, string> = { cash: '#38A169', upi: '#6B46C1', card: '#2B6CB0', bank: '#C05621', cheque: '#718096' };
                                const color = colors[method] || '#4A5568';
                                return (
                                    <div key={method}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                            <span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>
                                                {METHOD_ICONS[method] || '💰'} {method.charAt(0).toUpperCase() + method.slice(1)}
                                            </span>
                                            <div style={{ textAlign: 'right' }}>
                                                <span style={{ fontSize: 13, fontWeight: 800 }}>₹{amount.toLocaleString('en-IN')}</span>
                                                <span style={{ fontSize: 11, color: '#94A3B8', marginLeft: 6 }}>{pct.toFixed(0)}%</span>
                                            </div>
                                        </div>
                                        <div style={{ height: 8, background: '#F1F5F9', borderRadius: 4, overflow: 'hidden' }}>
                                            <div className="method-bar" style={{ width: `${pct}%`, background: color, height: '100%' }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Summary Table */}
                <div style={{ background: 'white', borderRadius: 16, padding: 24, border: '1px solid #E2E8F0' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1A1A2E', marginBottom: 16 }}>📋 Day Summary</h3>
                    {[
                        { label: 'Gross Sales', val: totalSales, color: '#1A1A2E' },
                        { label: 'Less: Sale Returns', val: -totalReturns, color: '#E53E3E' },
                        { label: 'Net Sales', val: totalSales - totalReturns, bold: true, color: '#1A1A2E' },
                        null,
                        { label: 'Cash Collected', val: totalReceived, color: '#38A169' },
                        { label: 'Credit Pending', val: totalPending, color: '#E53E3E' },
                        null,
                        { label: 'Purchases', val: totalPurchases, color: '#E53E3E' },
                        { label: 'Expenses', val: totalExpenses, color: '#E53E3E' },
                        null,
                        { label: 'NET CASH IN HAND', val: netCash, bold: true, big: true, color: netCash >= 0 ? '#38A169' : '#E53E3E' },
                    ].map((row, i) => row === null ? (
                        <div key={i} style={{ height: 1, background: '#E2E8F0', margin: '8px 0' }} />
                    ) : (
                        <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontWeight: row.bold ? 900 : 600, fontSize: row.big ? 15 : 13, borderTop: row.big ? '2px solid #E2E8F0' : 'none', marginTop: row.big ? 4 : 0, paddingTop: row.big ? 10 : 5 }}>
                            <span style={{ color: '#4A5568' }}>{row.label}</span>
                            <span style={{ color: row.color }}>{fmt(Math.abs(row.val))}{row.val < 0 ? ' (CR)' : ''}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Items Sold */}
            {topItems.length > 0 && (
                <div style={{ background: 'white', borderRadius: 16, padding: 24, border: '1px solid #E2E8F0', marginBottom: 20 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1A1A2E', marginBottom: 16 }}>🏆 Top Items Sold Today</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px' }}>
                        {topItems.map(item => (
                            <div key={item.name}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
                                    <span style={{ fontWeight: 600, color: '#334155' }}>{item.name}</span>
                                    <span style={{ fontWeight: 800 }}>₹{item.revenue.toLocaleString('en-IN')} <span style={{ color: '#94A3B8', fontWeight: 500 }}>×{item.qty}</span></span>
                                </div>
                                <div style={{ height: 6, background: '#F1F5F9', borderRadius: 3, overflow: 'hidden' }}>
                                    <div style={{ width: `${(item.revenue / maxItemRevenue) * 100}%`, height: '100%', background: 'linear-gradient(to right, #4285F4, #34A853)', borderRadius: 3, transition: 'width 0.5s ease' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Invoice List */}
            {daySales.length > 0 && (
                <div style={{ background: 'white', borderRadius: 16, border: '1px solid #E2E8F0', overflow: 'hidden', marginBottom: 20 }}>
                    <div style={{ padding: '16px 24px', borderBottom: '1px solid #E2E8F0' }}>
                        <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1A1A2E', margin: 0 }}>🧾 Sale Invoices — {selectedDate}</h3>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                            <thead>
                                <tr style={{ background: '#F8FAFC' }}>
                                    {['Invoice No', 'Customer', 'Time', 'Amount', 'Paid', 'Status', 'Method'].map(h => (
                                        <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 800, fontSize: 11, color: '#64748B', textTransform: 'uppercase', borderBottom: '1px solid #E2E8F0' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {daySales.map(inv => (
                                    <tr key={inv.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                                        <td style={{ padding: '10px 16px', fontWeight: 700, color: '#4285F4' }}>{inv.invoiceNumber}</td>
                                        <td style={{ padding: '10px 16px', fontWeight: 600 }}>{inv.partyName || 'Walk-in'}</td>
                                        <td style={{ padding: '10px 16px', color: '#718096' }}>{inv.time || '—'}</td>
                                        <td style={{ padding: '10px 16px', fontWeight: 800 }}>₹{inv.grandTotal?.toLocaleString('en-IN')}</td>
                                        <td style={{ padding: '10px 16px', color: '#38A169', fontWeight: 700 }}>₹{inv.amountPaid?.toLocaleString('en-IN')}</td>
                                        <td style={{ padding: '10px 16px' }}>
                                            <span style={{ padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 800, background: inv.paymentStatus === 'paid' ? '#DCFCE7' : inv.paymentStatus === 'partial' ? '#FEF3C7' : '#FEE2E2', color: inv.paymentStatus === 'paid' ? '#166534' : inv.paymentStatus === 'partial' ? '#92400E' : '#991B1B' }}>
                                                {inv.paymentStatus?.toUpperCase()}
                                            </span>
                                        </td>
                                        <td style={{ padding: '10px 16px', color: '#718096' }}>
                                            {inv.splitPayments?.length > 1 ? inv.splitPayments.map((sp: any) => `${METHOD_ICONS[sp.method] || ''}${sp.method}`).join('+') : (METHOD_ICONS[inv.paymentMethod] || '') + ' ' + (inv.paymentMethod || 'cash')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Balance Repayments Today — always visible */}
            <div style={{ background: 'white', borderRadius: 16, border: '1.5px solid #BAE6FD', overflow: 'hidden', marginBottom: 20 }}>
                <div style={{ padding: '16px 24px', borderBottom: '1px solid #E0F2FE', background: '#F0F9FF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0369A1', margin: 0 }}>💸 Balance Repayments — {selectedDate}</h3>
                    <div style={{ display: 'flex', gap: 14 }}>
                        {totalRepaidReceived > 0 && <span style={{ fontSize: 13, fontWeight: 800, color: '#34A853' }}>▲ Received: {fmt(totalRepaidReceived)}</span>}
                        {totalRepaidPaid > 0 && <span style={{ fontSize: 13, fontWeight: 800, color: '#EA4335' }}>▼ Paid Out: {fmt(totalRepaidPaid)}</span>}
                        {dayRepayments.length === 0 && <span style={{ fontSize: 12, color: '#94A3B8' }}>No repayments on this date</span>}
                    </div>
                </div>
                {dayRepayments.length === 0 ? (
                    <div style={{ padding: '28px 24px', textAlign: 'center', color: '#94A3B8' }}>
                        <p style={{ fontWeight: 700, fontSize: 13 }}>No balance repayments recorded on {selectedDate}</p>
                        <p style={{ fontSize: 12, marginTop: 4 }}>Go to <strong>Parties</strong> → click the 💹 icon to record a payment against a party's balance.</p>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                            <thead>
                                <tr style={{ background: '#F0F9FF' }}>
                                    {['Party', 'Type', 'Method', 'Amount', 'Note', 'Time'].map(h => (
                                        <th key={h} style={{ padding: '8px 16px', textAlign: 'left', fontWeight: 800, fontSize: 10, color: '#0369A1', textTransform: 'uppercase', borderBottom: '1px solid #BAE6FD' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {dayRepayments.map((r, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid #F0F9FF' }}>
                                        <td style={{ padding: '10px 16px', fontWeight: 700 }}>{r.partyName}</td>
                                        <td style={{ padding: '10px 16px' }}>
                                            <span style={{ padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 800, background: r.type === 'received' ? '#DCFCE7' : '#FEE2E2', color: r.type === 'received' ? '#166534' : '#991B1B' }}>
                                                {r.type === 'received' ? '▲ Received' : '▼ Paid Out'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '10px 16px', color: '#718096' }}>{METHOD_ICONS[r.method] || '💰'} {r.method}</td>
                                        <td style={{ padding: '10px 16px', fontWeight: 900, color: r.type === 'received' ? '#34A853' : '#EA4335' }}>{fmt(r.amount)}</td>
                                        <td style={{ padding: '10px 16px', color: '#718096', fontSize: 12 }}>{r.note || '—'}</td>
                                        <td style={{ padding: '10px 16px', color: '#94A3B8', fontSize: 11 }}>{r.recordedAt ? new Date(r.recordedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '—'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Due Payments Section — always visible */}
            <div style={{ background: 'white', borderRadius: 16, border: `1.5px solid ${dueGroups.length > 0 ? '#FCA5A5' : '#BBF7D0'}`, overflow: 'hidden', marginBottom: 20 }}>
                <div style={{ padding: '16px 24px', borderBottom: `1px solid ${dueGroups.length > 0 ? '#FEE2E2' : '#DCFCE7'}`, background: dueGroups.length > 0 ? '#FEF2F2' : '#F0FDF4', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: dueGroups.length > 0 ? '#DC2626' : '#166534', margin: 0 }}>
                        {dueGroups.length > 0 ? `⚠️ Outstanding Due Payments (${dueGroups.length} customer${dueGroups.length > 1 ? 's' : ''})` : '✅ No Outstanding Dues'}
                    </h3>
                    {dueGroups.length > 0 && <span style={{ fontWeight: 900, fontSize: 15, color: '#DC2626' }}>Total Due: {fmt(totalDueOutstanding)}</span>}
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead>
                            <tr style={{ background: dueGroups.length > 0 ? '#FFF5F5' : '#F0FDF4' }}>
                                {['Customer', 'Phone', 'Bills', 'Since', 'Total Due', 'Remind'].map(h => (
                                    <th key={h} style={{ padding: '8px 14px', textAlign: 'left', fontWeight: 800, fontSize: 10, color: '#64748B', textTransform: 'uppercase', borderBottom: `1px solid ${dueGroups.length > 0 ? '#FEE2E2' : '#DCFCE7'}` }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {dueGroups.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ padding: '28px 20px', textAlign: 'center', color: '#34A853', fontWeight: 700, fontSize: 14 }}>
                                        All bills are paid up — great work! 🎉
                                    </td>
                                </tr>
                            ) : dueGroups.map(g => (
                                <tr key={g.key} style={{ borderBottom: '1px solid #FEF2F2' }}>
                                    <td style={{ padding: '10px 14px' }}>
                                        <div style={{ fontWeight: 700 }}>{g.displayName}</div>
                                        {g.invoices.length > 1 && (
                                            <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 2 }}>
                                                {g.invoices.map((i: any) => i.invoiceNumber).join(', ')}
                                            </div>
                                        )}
                                        {g.invoices.length === 1 && (
                                            <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 2 }}>{g.invoices[0].invoiceNumber}</div>
                                        )}
                                    </td>
                                    <td style={{ padding: '10px 14px', color: '#718096', fontSize: 12 }}>{g.phone || '—'}</td>
                                    <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                                        <span style={{ padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 800, background: '#FEE2E2', color: '#DC2626' }}>
                                            {g.invoices.length}
                                        </span>
                                    </td>
                                    <td style={{ padding: '10px 14px', color: '#718096', fontSize: 12 }}>{g.oldestDate}</td>
                                    <td style={{ padding: '10px 14px', fontWeight: 900, color: '#DC2626', fontSize: 14 }}>₹{g.totalDue.toLocaleString('en-IN')}</td>
                                    <td style={{ padding: '10px 14px' }} className="no-print">
                                        {g.phone ? (
                                            <a href={buildWhatsAppReminderUrl({ partyPhone: g.phone, partyName: g.displayName, balanceDue: g.totalDue, invoiceNumber: g.invoices.map((i:any)=>i.invoiceNumber).join(', ') })} target="_blank" rel="noopener noreferrer"
                                                style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 6, background: '#F0FDF4', border: '1px solid #BBF7D0', color: '#25D366', textDecoration: 'none', fontWeight: 800, fontSize: 11 }}>
                                                <MessageCircle size={11} /> WA
                                            </a>
                                        ) : <span style={{ color: '#CBD5E0', fontSize: 11 }}>—</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Close Day Button */}
            {!isClosed && selectedDate === todayISO && (
                <div className="no-print" style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #2D3748 100%)', borderRadius: 20, padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                    <div style={{ color: 'white' }}>
                        <p style={{ fontWeight: 900, fontSize: 16, margin: 0 }}>Ready to close today?</p>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: '4px 0 0' }}>Locking the day marks it as final. You can still reopen it.</p>
                    </div>
                    <button
                        onClick={closeDay}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 12, background: 'linear-gradient(135deg, #34A853, #1E7E34)', border: 'none', color: 'white', fontWeight: 900, fontSize: 14, cursor: 'pointer', boxShadow: '0 4px 20px rgba(52,168,83,0.4)' }}
                    >
                        <Lock size={16} /> Close Day
                    </button>
                </div>
            )}

            {daySales.length === 0 && dayPurchases.length === 0 && dayExpenses.length === 0 && (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#A0AEC0' }}>
                    <RefreshCw size={40} style={{ marginBottom: 12, opacity: 0.3 }} />
                    <p style={{ fontSize: 16, fontWeight: 700 }}>No transactions on {selectedDate}</p>
                    <p style={{ fontSize: 13 }}>Select a different date or add some bills.</p>
                </div>
            )}
        </div>
    );
}
