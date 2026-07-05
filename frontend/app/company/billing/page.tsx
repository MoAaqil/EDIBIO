'use client';
import { useState, useMemo, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useStore, useCompanyData, useActiveCompany } from '@/lib/store';
import { formatDate, formatShort, buildWhatsAppReminderUrl, buildWhatsAppInvoiceUrl } from '@/lib/utils';
import Link from 'next/link';
import {
    Plus, Search, FileText, ChevronRight, Filter, Download, EyeOff,
    ShoppingCart, FileCheck, FileX, Truck, MessageCircle
} from 'lucide-react';

import toast from 'react-hot-toast';

const TABS = ['All GST Bills', 'Sale', 'Purchase', 'Estimate', 'Due', 'Returns'];

export default function BillingListPage() {
    const { activeCompanyId } = useStore();
    const router = useRouter();
    const companyId = activeCompanyId;
    const company = useActiveCompany();
    const allInvoicesRaw = useCompanyData('invoices') as any[];
    const [sortBy, setSortBy] = useState<'date' | 'amount' | 'invoiceNumber' | 'partyName'>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const allInvoices = useMemo(() => {
        return allInvoicesRaw.slice().sort((a, b) => {
            let comparison = 0;
            if (sortBy === 'date') {
                const dateA = a.date || '';
                const dateB = b.date || '';
                comparison = dateA.localeCompare(dateB);
                if (comparison === 0) {
                    const timeA = a.time || '00:00';
                    const timeB = b.time || '00:00';
                    comparison = timeA.localeCompare(timeB);
                }
            } else if (sortBy === 'amount') {
                const amtA = a.grandTotal || 0;
                const amtB = b.grandTotal || 0;
                comparison = amtA - amtB;
            } else if (sortBy === 'invoiceNumber') {
                const noA = a.invoiceNumber || '';
                const noB = b.invoiceNumber || '';
                comparison = noA.localeCompare(noB);
            } else if (sortBy === 'partyName') {
                const nameA = a.partyName || '';
                const nameB = b.partyName || '';
                comparison = nameA.localeCompare(nameB);
            }

            if (comparison === 0) {
                const dateA = a.date || '';
                const dateB = b.date || '';
                const dateComp = dateA.localeCompare(dateB);
                if (dateComp !== 0) return sortOrder === 'desc' ? -dateComp : dateComp;

                const createA = a.createdAt || '';
                const createB = b.createdAt || '';
                return sortOrder === 'desc' ? createB.localeCompare(createA) : createA.localeCompare(createB);
            }

            return sortOrder === 'desc' ? -comparison : comparison;
        });
    }, [allInvoicesRaw, sortBy, sortOrder]);

    const [tab, setTab] = useState('All GST Bills');
    const [search, setSearch] = useState('');
    const showHidden = company?.showHiddenInvoices || false;

    useEffect(() => {
        const handlePopState = () => {
            const user = useStore.getState().user;
            if (user?.role === 'staff') {
                useStore.getState().logout();
                window.location.href = '/login';
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // Non-GST sale/purchase bills are auto-hidden — only visible via "View Hidden"
    // Other types (estimate, return, proforma, etc.) always show regardless of GST
    const AUTO_HIDDEN_TYPES = ['sale', 'purchase'];
    const isAutoHidden = (i: any) =>
        !i.isGstBill && AUTO_HIDDEN_TYPES.includes(i.invoiceType);

    // Explicitly hidden (password-protected) + auto-hidden (non-GST sale/purchase)
    const hiddenInvoices = allInvoices.filter(i => i.isHidden || isAutoHidden(i));

    // Main visible list: non-private, not explicitly hidden, not auto-hidden
    const mainInvoices = allInvoices.filter(i => !i.isPrivate && !i.isHidden && !isAutoHidden(i));

    const candidateInvoices = useMemo(() => {
        return allInvoices.filter(i => {
            if (i.isPrivate) return false;
            const isHiddenVal = i.isHidden || isAutoHidden(i);
            if (isHiddenVal && !showHidden) return false;
            return true;
        });
    }, [allInvoices, showHidden]);

    const filtered = useMemo(() => {
        let list = candidateInvoices;
        if (tab === 'All GST Bills') list = list.filter(i => i.isGstBill || showHidden);
        else if (tab === 'Sale') list = list.filter(i => i.invoiceType === 'sale');
        else if (tab === 'Purchase') list = list.filter(i => i.invoiceType === 'purchase');
        else if (tab === 'Estimate') list = list.filter(i => ['estimate', 'proforma'].includes(i.invoiceType));
        else if (tab === 'Due') list = list.filter(i => i.paymentStatus !== 'paid' && i.balanceDue > 0);
        else if (tab === 'Returns') list = list.filter(i => ['sale_return', 'purchase_return', 'credit_note', 'debit_note'].includes(i.invoiceType));

        if (search) list = list.filter(i =>
            (i.partyName || '').toLowerCase().includes(search.toLowerCase()) ||
            i.invoiceNumber.toLowerCase().includes(search.toLowerCase())
        );
        return list;
    }, [candidateInvoices, tab, search, showHidden]);

    // Estimate / Proforma / Delivery Challan are NOT confirmed — exclude from revenue totals
    // Also only count GST bills (non-GST are hidden, so they shouldn't count)
    const DRAFT_TYPES = ['estimate', 'proforma', 'delivery_challan'];
    const canSeeHidden = showHidden;
    // When "View Hidden" is active, include hidden sale bills in totals too
    const hiddenSaleInvoices = canSeeHidden
        ? hiddenInvoices.filter(i => i.invoiceType === 'sale' && !DRAFT_TYPES.includes(i.invoiceType))
        : [];
    const confirmedSales = mainInvoices.filter(i => i.invoiceType === 'sale' && i.isGstBill && !DRAFT_TYPES.includes(i.invoiceType));
    const allCountedSales = [...confirmedSales, ...hiddenSaleInvoices];
    const totalSales = allCountedSales.reduce((a: number, i: any) => a + i.grandTotal, 0);
    const totalReceived = allCountedSales.reduce((a: number, i: any) => a + i.amountPaid, 0);
    const totalDue = allCountedSales.reduce((a: number, i: any) => a + i.balanceDue, 0);

    const typeIcon = (type: string) => {
        if (type === 'purchase') return ShoppingCart;
        if (type?.includes('return') || type?.includes('note')) return FileX;
        if (type === 'estimate' || type === 'proforma') return FileCheck;
        if (type === 'delivery_challan') return Truck;
        return FileText;
    };
    const typeColor = (type: string) => {
        if (type === 'purchase') return '#4285F4';
        if (type?.includes('return') || type?.includes('note')) return '#EA4335';
        if (type === 'estimate' || type === 'proforma') return '#9333EA';
        return '#34A853';
    };

    const QUICK_TYPES = [
        { label: '+ Sale Invoice', href: `/company/billing/new?type=sale`, color: '#EA4335', bg: '#FCE8E6' },
        { label: '+ Purchase Bill', href: `/company/billing/new?type=purchase`, color: '#4285F4', bg: '#E8F0FE' },
        { label: '+ Estimate', href: `/company/billing/new?type=estimate`, color: '#9333EA', bg: '#F3E8FF' },
        { label: '+ Delivery Challan', href: `/company/billing/new?type=delivery_challan`, color: '#34A853', bg: '#E6F4EA' },
        { label: '+ Credit Note', href: `/company/billing/new?type=credit_note`, color: '#FBBC04', bg: '#FEF7E0' },
        { label: '+ Proforma', href: `/company/billing/new?type=proforma`, color: '#718096', bg: '#F1F3F5' },
    ];

    return (
        <>
            <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>

                {/* Summary Banner */}
                <div style={{ background: 'linear-gradient(135deg,#1A1A2E,#16213E)', borderRadius: 20, padding: '24px 28px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg,#4285F4 25%,#34A853 25% 50%,#FBBC04 50% 75%,#EA4335 75%)' }} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                        <h1 style={{ color: 'white', fontWeight: 900, fontSize: 22 }}>Bills &amp; Invoices</h1>
                        <Link href={`/company/billing/new?type=sale`}
                            style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#EA4335', color: 'white', padding: '10px 18px', borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: 13, boxShadow: '0 4px 16px rgba(234,67,53,0.4)' }}>
                            <Plus size={15} /> New Bill
                        </Link>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
                        {[
                            { l: 'Total Sales', v: formatShort(totalSales), c: '#4285F4' },
                            { l: 'Received', v: formatShort(totalReceived), c: '#34A853' },
                            { l: 'Due', v: formatShort(totalDue), c: '#FBBC04' },
                        ].map(({ l, v, c }) => (
                            <div key={l} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: '12px 14px', textAlign: 'center' }}>
                                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>{l}</p>
                                <p style={{ color: 'white', fontWeight: 900, fontSize: 20 }}>{v}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick type buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }} className="quick-type-grid">
                    {QUICK_TYPES.map(({ label, href, color, bg }) => (
                        <Link key={href} href={href}
                            style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, padding: '10px 8px', borderRadius: 12, background: bg, color, textDecoration: 'none', border: `1.5px solid ${color}30`, transition: 'box-shadow 0.15s' }}>
                            {label}
                        </Link>
                    ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
                            <Search size={15} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#A0AEC0' }} />
                            <input className="e-input" placeholder="Search party name or invoice number…"
                                value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 34 }} />
                        </div>
                        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                            <select 
                                className="e-select" 
                                style={{ width: 140, padding: '9px 12px', fontSize: 12, fontWeight: 700, borderRadius: 10, cursor: 'pointer' }}
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value as any)}
                            >
                                <option value="date">📅 Date</option>
                                <option value="amount">💰 Amount</option>
                                <option value="invoiceNumber">🧾 Invoice No</option>
                                <option value="partyName">👤 Party Name</option>
                            </select>
                            <select 
                                className="e-select" 
                                style={{ width: 130, padding: '9px 12px', fontSize: 12, fontWeight: 700, borderRadius: 10, cursor: 'pointer' }}
                                value={sortOrder}
                                onChange={e => setSortOrder(e.target.value as any)}
                            >
                                <option value="desc">Desc ⬇️</option>
                                <option value="asc">Asc ⬆️</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }} className="no-scrollbar">
                        {TABS.map(t => (
                            <button key={t} onClick={() => setTab(t)}
                                style={{
                                    padding: '8px 16px', borderRadius: 10, border: '1.5px solid', whiteSpace: 'nowrap',
                                    borderColor: tab === t ? '#4285F4' : '#E1E4E8',
                                    background: tab === t ? '#4285F4' : 'white',
                                    color: tab === t ? 'white' : '#4A5568',
                                    fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s',
                                }}>
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Invoices list */}
                <div className="card" style={{ overflow: 'hidden' }}>
                    {/* Hidden bills section */}
                    {showHidden && hiddenInvoices.length > 0 && (
                        <div style={{ background: '#F3E8FF', borderBottom: '1px solid #E9D5FF', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <EyeOff size={14} color="#7C3AED" />
                            <p style={{ fontSize: 12, fontWeight: 700, color: '#7C3AED' }}>Showing {hiddenInvoices.length} hidden invoice{hiddenInvoices.length !== 1 ? 's' : ''}</p>
                        </div>
                    )}

                    {filtered.length === 0 && !(showHidden && hiddenInvoices.length > 0) ? (
                        <div style={{ textAlign: 'center', padding: '56px 20px' }}>
                            <FileText size={44} style={{ color: '#E1E4E8', margin: '0 auto 12px' }} />
                            <p style={{ color: '#A0AEC0', fontWeight: 600, fontSize: 14 }}>No invoices found</p>
                            <p style={{ color: '#CBD5E0', fontSize: 12, marginTop: 4 }}>
                                {tab === 'All GST Bills' ? 'No GST bills yet. Switch tabs to see all bills.' : `No ${tab.toLowerCase()} found yet.`}
                            </p>
                            <Link href={`/company/billing/new?type=sale`} className="btn btn-blue btn-sm" style={{ marginTop: 16, display: 'inline-flex', textDecoration: 'none' }}>
                                <Plus size={13} /> Create Invoice
                            </Link>
                        </div>
                    ) : (
                        <>
                            {/* Desktop table */}
                            <div className="desktop-table">
                                <table className="e-table">
                                    <thead>
                                        <tr>
                                            <th>Invoice #</th>
                                            <th>Party</th>
                                            <th>Type</th>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Paid</th>
                                            <th>Balance</th>
                                            <th>Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                                                        {filtered.map((inv: any) => {
                                            const Icon = typeIcon(inv.invoiceType);
                                            const c = typeColor(inv.invoiceType);
                                            return (
                                                <tr key={inv.id}>
                                                    <td>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                            <div style={{ width: 28, height: 28, borderRadius: 7, background: c + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                                <Icon size={13} color={c} />
                                                            </div>
                                                            <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 12, color: '#2D3748' }}>{inv.invoiceNumber}</span>
                                                            {inv.isHidden && <EyeOff size={11} color="#9333EA" />}
                                                        </div>
                                                    </td>
                                                    <td style={{ fontWeight: 600, color: '#1A1A2E' }}>{inv.partyName || 'Walk-in'}</td>
                                                    <td><span className="badge badge-gray" style={{ textTransform: 'capitalize' }}>{inv.invoiceType.replace('_', ' ')}</span></td>
                                                    <td style={{ fontSize: 12, color: '#718096' }}>{formatDate(inv.date)}</td>
                                                    <td style={{ fontWeight: 900, color: '#1A1A2E' }}>₹{inv.grandTotal.toLocaleString('en-IN')}</td>
                                                    <td style={{ fontWeight: 700, color: '#34A853' }}>₹{inv.amountPaid.toLocaleString('en-IN')}</td>
                                                    <td style={{ fontWeight: 700, color: inv.balanceDue > 0 ? '#EA4335' : '#CBD5E0' }}>
                                                        {inv.balanceDue > 0 ? `₹${inv.balanceDue.toLocaleString('en-IN')}` : '—'}
                                                    </td>
                                                    <td>
                                                        <span className={`badge ${inv.paymentStatus === 'paid' ? 'badge-green' : inv.paymentStatus === 'partial' ? 'badge-yellow' : 'badge-red'}`}>
                                                            {inv.paymentStatus}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                            <Link href={`/company/billing/invoice?id=${inv.id}`} style={{ fontSize: 12, color: '#4285F4', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 2 }}>
                                                                View <ChevronRight size={12} />
                                                            </Link>
                                                            <a
                                                                href={buildWhatsAppInvoiceUrl(inv, company)}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                title={`Send WhatsApp invoice to ${inv.partyName || 'customer'}`}
                                                                style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 700, color: '#25D366', textDecoration: 'none', padding: '4px 8px', borderRadius: 6, background: '#F0FDF4', border: '1px solid #BBF7D0', whiteSpace: 'nowrap' }}
                                                            >
                                                                <MessageCircle size={12} /> WA
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile list */}
                            <div className="mobile-list">
                                                                        {filtered.map((inv: any) => {
                                    const c = typeColor(inv.invoiceType);
                                    return (
                                        <div key={inv.id} onClick={() => router.push(`/company/billing/invoice?id=${inv.id}`)}
                                            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: '1px solid #F8F9FA', cursor: 'pointer' }}>
                                            <div style={{ width: 42, height: 42, borderRadius: 12, background: c + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 15, color: c, flexShrink: 0 }}>
                                                {(inv.partyName || '#')[0]}
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A2E', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inv.partyName || 'Walk-in Customer'}</p>
                                                <p style={{ fontSize: 11, color: '#A0AEC0' }}>{inv.invoiceNumber} · {formatDate(inv.date)}</p>
                                            </div>
                                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                                <p style={{ fontSize: 14, fontWeight: 900, color: '#1A1A2E' }}>₹{inv.grandTotal.toLocaleString('en-IN')}</p>
                                                <div style={{ display: 'flex', gap: 6, alignItems: 'center', justifyContent: 'flex-end', marginTop: 2 }}>
                                                    <span className={`badge ${inv.paymentStatus === 'paid' ? 'badge-green' : inv.paymentStatus === 'partial' ? 'badge-yellow' : 'badge-red'}`}>{inv.paymentStatus}</span>
                                                        <a
                                                            href={buildWhatsAppInvoiceUrl(inv, company)}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={e => e.stopPropagation()}
                                                            style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, fontWeight: 800, color: '#25D366', textDecoration: 'none', padding: '3px 7px', borderRadius: 5, background: '#F0FDF4', border: '1px solid #BBF7D0' }}
                                                        >
                                                            <MessageCircle size={11} /> WA
                                                        </a>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
            </div>


            <style>{`
        .desktop-table { display: none; }
        .mobile-list { display: block; }
        @media (min-width: 768px) {
          .desktop-table { display: block; }
          .mobile-list { display: none; }
          .quick-type-grid { grid-template-columns: repeat(6,1fr) !important; }
        }
            `}</style>
        </>
    );
}
