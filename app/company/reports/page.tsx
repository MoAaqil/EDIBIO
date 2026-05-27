'use client';
import { useState, useRef, useEffect, useMemo } from 'react';
import { useCompanyData, useActiveCompany } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { formatDate, r2 } from '@/lib/utils';
import { BarChart3, TrendingUp, TrendingDown, FileText, DollarSign, Calendar, Download, Lock, BookOpen, HelpCircle, X } from 'lucide-react';
import { downloadGSTR1 } from '@/lib/gst-utils';

function InfoTooltip({ text, title }: { text: string; title: string }) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    return (
        <span ref={ref} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', marginLeft: 6, verticalAlign: 'middle' }}>
            <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
                style={{
                    background: 'none',
                    border: 'none',
                    padding: 2,
                    cursor: 'pointer',
                    color: open ? '#4285F4' : '#A0AEC0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    transition: 'all 0.2s',
                    outline: 'none'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#4285F4'}
                onMouseLeave={e => { if (!open) e.currentTarget.style.color = '#A0AEC0'; }}
            >
                <HelpCircle size={13} />
            </button>
            {open && (
                <span style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginBottom: 8,
                    width: 240,
                    background: 'white',
                    border: '1px solid #E2E8F0',
                    borderRadius: 12,
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                    padding: '12px 14px',
                    zIndex: 999,
                    textAlign: 'left',
                    color: '#4A5568',
                    animation: 'fadeIn 0.15s ease-out',
                    display: 'block',
                    lineHeight: 1.4
                }}>
                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, borderBottom: '1px solid #F1F5F9', paddingBottom: 4 }}>
                        <span style={{ fontWeight: 800, fontSize: 10, color: '#1A202C', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</span>
                        <button 
                            onClick={(e) => { e.stopPropagation(); setOpen(false); }} 
                            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#A0AEC0', display: 'flex', alignItems: 'center' }}
                        >
                            <X size={12} />
                        </button>
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 500, display: 'block', color: '#4A5568' }}>{text}</span>
                    <span style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '6px solid transparent',
                        borderRight: '6px solid transparent',
                        borderTop: '6px solid white',
                        zIndex: 1000,
                        display: 'block'
                    }} />
                    <span style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '7px solid transparent',
                        borderRight: '7px solid transparent',
                        borderTop: '7px solid #E2E8F0',
                        zIndex: 998,
                        marginTop: 1,
                        display: 'block'
                    }} />
                </span>
            )}
        </span>
    );
}

function MiniBar({ value, max, color }: { value: number; max: number; color: string }) {
    const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
    return (
        <div style={{ height: 8, background: '#F1F3F5', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 4, transition: 'width 0.6s ease' }} />
        </div>
    );
}

export default function ReportsPage() {
    const company = useActiveCompany();
    const router = useRouter();
    const invoices = useCompanyData('invoices') as any[];
    const expenses = useCompanyData('expenses') as any[];
    const products = useCompanyData('products') as any[];

    const [activeTab, setActiveTab] = useState<'overview' | 'pnl' | 'balance' | 'customer-insights'>('overview');
    const [selectedCustomerKey, setSelectedCustomerKey] = useState<string | null>(null);
    const parties = useCompanyData('parties') as any[];
    const [showGuide, setShowGuide] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const val = localStorage.getItem('edibio_reports_guide_visible');
        setShowGuide(val !== 'false');
        setMounted(true);
    }, []);

    const toggleGuide = (visible: boolean) => {
        setShowGuide(visible);
        localStorage.setItem('edibio_reports_guide_visible', String(visible));
    };

    const calculateAvgDaysBetweenVisits = (custInvoices: any[]) => {
        if (custInvoices.length < 2) return '—';
        const sorted = [...custInvoices].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        let totalDays = 0;
        let intervals = 0;
        for (let i = 1; i < sorted.length; i++) {
            const d1 = new Date(sorted[i - 1].date);
            const d2 = new Date(sorted[i].date);
            const diffTime = Math.abs(d2.getTime() - d1.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            totalDays += diffDays;
            intervals++;
        }
        return intervals > 0 ? (totalDays / intervals).toFixed(1) + ' days' : '—';
    };

    const customerInsights = useMemo(() => {
        const normPhone = (ph: string) => {
            const d = (ph || '').replace(/\D/g, '');
            return d.startsWith('91') && d.length > 10 ? d.slice(2) : d;
        };

        const customerMap = new Map<string, {
            name: string;
            phone: string;
            partyId?: string;
            totalSpent: number;
            invoiceCount: number;
            lastVisitDate: string;
            balanceDue: number;
            invoices: any[];
        }>();

        const DRAFT = ['estimate', 'proforma', 'delivery_challan'];
        const saleInvoices = invoices.filter(i => i.invoiceType === 'sale' && !DRAFT.includes(i.invoiceType));

        saleInvoices.forEach(inv => {
            const phoneKey = normPhone(inv.partyPhone || '');
            const key = phoneKey || inv.partyName || 'Cash / Walk-in Customer';
            
            if (!customerMap.has(key)) {
                customerMap.set(key, {
                    name: inv.partyName || 'Walk-in Customer',
                    phone: inv.partyPhone || '',
                    partyId: inv.partyId,
                    totalSpent: 0,
                    invoiceCount: 0,
                    lastVisitDate: inv.date,
                    balanceDue: 0,
                    invoices: [],
                });
            }
            
            const entry = customerMap.get(key)!;
            entry.totalSpent += inv.grandTotal || 0;
            entry.invoiceCount += 1;
            entry.balanceDue += inv.balanceDue || 0;
            entry.invoices.push(inv);
            if (new Date(inv.date) > new Date(entry.lastVisitDate)) {
                entry.lastVisitDate = inv.date;
            }
        });

        const list = Array.from(customerMap.values()).map(cust => {
            const party = parties.find(p => {
                if (cust.partyId && p.id === cust.partyId) return true;
                if (cust.phone && normPhone(p.phone) === normPhone(cust.phone)) return true;
                return false;
            });

            return {
                ...cust,
                loyaltyPoints: party?.loyaltyPoints || 0,
                partyId: party?.id || cust.partyId,
                name: party?.name || cust.name,
                phone: party?.phone || cust.phone,
            };
        });

        return list.sort((a, b) => b.totalSpent - a.totalSpent);
    }, [invoices, parties]);

    const activeCustomerKey = selectedCustomerKey || (customerInsights[0] ? (customerInsights[0].phone || customerInsights[0].name) : null);
    const selectedCustomerDetail = customerInsights.find(c => (c.phone || c.name) === activeCustomerKey);

    const now = new Date();
    const thisMonthKey = now.toISOString().slice(0, 7);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().slice(0, 7);

    const DRAFT_TYPES = ['estimate', 'proforma', 'delivery_challan'];
    const saleInvoices = invoices.filter(i => i.invoiceType === 'sale' && !DRAFT_TYPES.includes(i.invoiceType) && i.isGstBill);
    const purchaseInvoices = invoices.filter(i => i.invoiceType === 'purchase');

    const totalSales = saleInvoices.reduce((a: number, i: any) => a + i.grandTotal, 0);
    const totalPurchase = purchaseInvoices.reduce((a: number, i: any) => a + i.grandTotal, 0);
    const totalExpenses = expenses.reduce((a: number, e: any) => a + e.amount, 0);
    const netProfit = totalSales - totalPurchase - totalExpenses;
    const totalGstCollected = saleInvoices.reduce((a: number, i: any) => a + i.totalGst, 0);
    const totalGstPaid = purchaseInvoices.reduce((a: number, i: any) => a + i.totalGst, 0);
    const gstLiability = r2(totalGstCollected - totalGstPaid);

    const accountsReceivable = saleInvoices.reduce((a: number, i: any) => a + i.balanceDue, 0);
    const accountsPayable = purchaseInvoices.reduce((a: number, i: any) => a + i.balanceDue, 0);
    const closingStockValue = products.reduce((a: number, p: any) => a + p.stockQty * p.purchasePrice, 0);
    const cashInBank = netProfit - accountsReceivable + accountsPayable - closingStockValue + 50000; 

    const thisMonthSales = saleInvoices.filter((i: any) => i.date?.slice(0, 7) === thisMonthKey).reduce((a: number, i: any) => a + i.grandTotal, 0);
    const lastMonthSales = saleInvoices.filter((i: any) => i.date?.slice(0, 7) === lastMonth).reduce((a: number, i: any) => a + i.grandTotal, 0);

    const months: any[] = [];
    for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = d.toISOString().slice(0, 7);
        const label = d.toLocaleString('en-IN', { month: 'short', year: '2-digit' });
        const s = saleInvoices.filter((inv: any) => inv.date?.slice(0, 7) === key).reduce((a: number, inv: any) => a + inv.grandTotal, 0);
        months.push({ key, label, sales: s });
    }
    const maxMonthSale = Math.max(...months.map(m => m.sales), 1);

    const customerMap: Record<string, any> = {};
    saleInvoices.forEach((inv: any) => {
        const k = inv.partyName || 'Walk-in';
        if (!customerMap[k]) customerMap[k] = { name: k, total: 0 };
        customerMap[k].total += inv.grandTotal;
    });
    const topCustomers = Object.values(customerMap).sort((a, b) => b.total - a.total).slice(0, 8);

    const itemMap: Record<string, any> = {};
    saleInvoices.forEach((inv: any) => {
        (inv.items || []).forEach((item: any) => {
            const k = item.name;
            if (!itemMap[k]) itemMap[k] = { name: k, qty: 0, revenue: 0 };
            itemMap[k].qty += item.qty;
            itemMap[k].revenue += item.amount;
        });
    });
    const topItems = Object.values(itemMap).sort((a, b) => b.revenue - a.revenue).slice(0, 8);
    const maxItemRevenue = Math.max(...topItems.map(i => i.revenue), 1);

    const exportReport = () => {
        const csv = [`Total Sales,₹${totalSales}`, `Total Purchase,₹${totalPurchase}`, `Profit,₹${netProfit}`].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'business_report.csv'; a.click();
    };

    const handleGSTR1 = () => {
        if (!company?.gstNumber) {
            alert("GST Number required for GSTR-1 export.");
            return;
        }
        downloadGSTR1(invoices, company.name, company.gstNumber);
    };

    const KPI = ({ label, value, sub, color, Icon, tooltipText }: any) => (
        <div className="card" style={{ padding: '18px 20px', display: 'flex', gap: 14, alignItems: 'center', position: 'relative' }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={22} color={color} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', display: 'flex', alignItems: 'center', margin: 0 }}>
                    {label}
                    {tooltipText && <InfoTooltip text={tooltipText} title={label} />}
                </p>
                <p style={{ fontSize: 20, fontWeight: 900, color: '#1A1A2E', margin: '2px 0 0' }}>{value}</p>
                {sub && <p style={{ fontSize: 11, color: '#718096', margin: '2px 0 0' }}>{sub}</p>}
            </div>
        </div>
    );

    const FinancialRow = ({ label, amount, isTotal = false, isSub = false, tooltipText }: any) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: isTotal ? '16px 0' : '12px 0', borderBottom: isTotal ? 'none' : '1px solid #F1F5F9', borderTop: isTotal ? '2px solid #E2E8F0' : 'none', fontWeight: isTotal ? 800 : (isSub ? 500 : 700), fontSize: isTotal ? 16 : 14, color: isTotal ? '#1A1A2E' : (isSub ? '#64748B' : '#334155'), paddingLeft: isSub ? 20 : 0, position: 'relative' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                {label}
                {tooltipText && <InfoTooltip text={tooltipText} title={label} />}
            </span>
            <span>₹{amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
        </div>
    );

    return (
        <>
            <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                    <div>
                        <h1 style={{ fontWeight: 900, fontSize: 22 }}>Financial Reports</h1>
                        <p style={{ fontSize: 13, color: '#718096' }}>{company?.name} · Enterprise Reporting</p>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <button onClick={() => toggleGuide(!showGuide)} className="btn btn-outline btn-sm" style={{ gap: 5, color: '#4285F4', borderColor: '#4285F4' }}>
                            <BookOpen size={13} /> {showGuide ? 'Hide Guide' : 'Learn Reports'}
                        </button>
                        <button onClick={handleGSTR1} className="btn btn-green btn-sm" style={{ gap: 5 }}>
                            <FileText size={13} /> GSTR-1 (JSON)
                        </button>
                        <button onClick={exportReport} className="btn btn-outline btn-sm" style={{ gap: 5 }}>
                            <Download size={13} /> Export CSV
                        </button>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 10, borderBottom: '1px solid #E2E8F0', paddingBottom: 0, overflowX: 'auto', whiteSpace: 'nowrap' }} className="no-scrollbar">
                    {[
                        { id: 'overview', label: 'Overview' },
                        { id: 'pnl', label: 'Profit & Loss Statement' },
                        { id: 'balance', label: 'Balance Sheet' },
                        { id: 'customer-insights', label: 'Customer Value Insights' }
                    ].map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} style={{ background: 'none', border: 'none', padding: '12px 20px', fontWeight: activeTab === tab.id ? 800 : 600, color: activeTab === tab.id ? '#4285F4' : '#64748B', borderBottom: activeTab === tab.id ? '3px solid #4285F4' : '3px solid transparent', cursor: 'pointer', fontSize: 14, transition: 'all 0.2s', marginBottom: -1 }}>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {mounted && showGuide && (
                    <div className="card" style={{
                        padding: '20px 24px',
                        background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)',
                        border: '1px solid #BFDBFE',
                        borderRadius: 16,
                        position: 'relative',
                        animation: 'slideDown 0.3s ease-out',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
                    }}>
                        <button
                            onClick={() => toggleGuide(false)}
                            style={{
                                position: 'absolute',
                                top: 16,
                                right: 16,
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#64748B',
                                padding: 4,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#E2E8F0'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <X size={16} />
                        </button>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                            <BookOpen size={20} color="#3B82F6" />
                            <h3 style={{ fontWeight: 800, fontSize: 15, color: '#1E3A8A', margin: 0 }}>
                                Guide: {activeTab === 'overview' ? 'Reports Overview & KPIs' : activeTab === 'pnl' ? 'Understanding Profit & Loss' : 'Understanding Balance Sheets'}
                            </h3>
                        </div>
                        
                        <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.6 }}>
                            {activeTab === 'overview' && (
                                <>
                                    <p style={{ margin: '0 0 8px' }}>
                                        The <strong>Overview Dashboard</strong> provides a high-level summary of your company's performance. It pulls data from all your finalized sales bills, purchase orders, expenses, and inventory values.
                                    </p>
                                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                                        <li><strong>Daily Closing Report:</strong> Run a daily register count to audit your cash drawer, bank collections, and match expected cash against physical cash.</li>
                                        <li><strong>Net Profit vs GST Liability:</strong> Net Profit is calculated as <em>Sales - Purchases - Expenses</em>. GST Liability shows the net GST collected from sales minus the GST paid on purchases (Input Tax Credit).</li>
                                    </ul>
                                </>
                            )}
                            {activeTab === 'pnl' && (
                                <>
                                    <p style={{ margin: '0 0 8px' }}>
                                        The <strong>Profit & Loss Statement (P&L)</strong> measures your business revenues and expenses over time. It answers the fundamental question: <em>"Is the business making money?"</em>
                                    </p>
                                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                                        <li><strong>Cost of Goods Sold (COGS):</strong> Calculated as <em>Opening Stock + Purchases - Closing Stock</em>. It reflects the direct cost of producing/buying the items you sold.</li>
                                        <li><strong>Gross Profit:</strong> Revenue minus COGS. This represents your core markup before accounting for overhead expenses like rent or utilities.</li>
                                        <li><strong>Net Profit:</strong> Gross Profit minus Operating Expenses. If positive, your business is profitable; if negative, it is running at a loss.</li>
                                    </ul>
                                </>
                            )}
                            {activeTab === 'balance' && (
                                <>
                                    <p style={{ margin: '0 0 8px' }}>
                                        The <strong>Balance Sheet</strong> is a financial snapshot showing what your business owns (Assets) and owes (Liabilities) at a specific point in time. It must always balance: <strong>Assets = Liabilities + Equity</strong>.
                                    </p>
                                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                                        <li><strong>Owner's Equity:</strong> The initial funds/capital invested by the owners, adjusted by the cumulative Net Profit or Loss generated over time.</li>
                                        <li><strong>Assets:</strong> Includes Cash & Bank Balances, Accounts Receivable (debts due from customers), Inventory value (closing stock), and unused GST Input Tax Credit.</li>
                                        <li><strong>Liabilities:</strong> Includes Accounts Payable (dues owed to suppliers) and GST Payable (GST collected from customers but not yet paid to the government).</li>
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'overview' && (
                    <>
                        {/* Daily Closing Report Banner */}
                        <div
                            onClick={() => router.push('/company/reports/daily-close')}
                            style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #2D3748 100%)', borderRadius: 20, padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'transform 0.15s', border: '1px solid rgba(255,255,255,0.08)' }}
                            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.01)')}
                            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(52,168,83,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(52,168,83,0.3)' }}>
                                    <Lock size={22} color="#34A853" />
                                </div>
                                <div>
                                    <p style={{ fontWeight: 900, fontSize: 16, color: 'white', margin: 0 }}>📊 Daily Closing Report</p>
                                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', margin: '3px 0 0' }}>
                                        Today · {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })} · {invoices.filter(i => i.date === new Date().toISOString().slice(0, 10) && i.invoiceType === 'sale').length} sale bills
                                    </p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontSize: 22, fontWeight: 900, color: '#34A853', margin: 0 }}>
                                        ₹{invoices.filter(i => i.date === new Date().toISOString().slice(0, 10) && i.invoiceType === 'sale').reduce((a, i) => a + i.grandTotal, 0).toLocaleString('en-IN')}
                                    </p>
                                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: 0 }}>today's sales</p>
                                </div>
                                <div style={{ background: '#34A853', color: 'white', padding: '8px 18px', borderRadius: 10, fontWeight: 800, fontSize: 13, whiteSpace: 'nowrap' }}>
                                    Open Report →
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
                            <KPI label="Total Sales" value={`₹${(totalSales / 1000).toFixed(1)}K`} sub="GST Bills Only" color="#34A853" Icon={TrendingUp} tooltipText="Cumulative value of all finalized sales invoices that are marked as GST Bills." />
                            <KPI label="Total Purchase" value={`₹${(totalPurchase / 1000).toFixed(1)}K`} color="#4285F4" Icon={TrendingDown} tooltipText="Cumulative value of all purchase invoices/bills logged in the system." />
                            <KPI label="Net Profit" value={`₹${(netProfit / 1000).toFixed(1)}K`} color={netProfit >= 0 ? '#34A853' : '#EA4335'} Icon={BarChart3} tooltipText="Calculated as (Total Sales - Total Purchase - Operating Expenses). Represents the business's net earnings." />
                            <KPI label="GST Liability" value={`₹${(gstLiability / 1000).toFixed(1)}K`} color="#FBBC04" Icon={FileText} tooltipText="Calculated as (GST Collected on Sales - GST Paid on Purchases). A positive amount is payable to the government." />
                        </div>

                        <div className="card" style={{ padding: 24 }}>
                            <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 20 }}>Revenue Trend (Last 6 Months)</h3>
                            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 160 }}>
                                {months.map(m => (
                                    <div key={m.key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                                        <div style={{ width: '100%', height: maxMonthSale > 0 ? (m.sales / maxMonthSale) * 120 : 0, background: 'linear-gradient(to top, #34A853, #81C995)', borderRadius: '4px 4px 0 0' }} />
                                        <p style={{ fontSize: 10, color: '#718096', fontWeight: 600 }}>{m.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="reports-grid">
                            <div className="card" style={{ padding: 20 }}>
                                <h3 style={{ fontWeight: 800, fontSize: 15, marginBottom: 16 }}>Top Customers by Revenue</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {topCustomers.map(c => (
                                        <div key={c.name}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                                                <span style={{ fontWeight: 600 }}>{c.name}</span>
                                                <span style={{ fontWeight: 800, color: '#334155' }}>₹{c.total.toLocaleString()}</span>
                                            </div>
                                            <MiniBar value={c.total} max={topCustomers[0].total} color="#4285F4" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="card" style={{ padding: 20 }}>
                                <h3 style={{ fontWeight: 800, fontSize: 15, marginBottom: 16 }}>Top Performing Items</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {topItems.map(item => (
                                        <div key={item.name}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                                                <span style={{ fontWeight: 600 }}>{item.name}</span>
                                                <span style={{ fontWeight: 800, color: '#334155' }}>₹{item.revenue.toLocaleString()}</span>
                                            </div>
                                            <MiniBar value={item.revenue} max={maxItemRevenue} color="#34A853" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'pnl' && (
                    <div className="card" style={{ padding: 32, maxWidth: 800, margin: '0 auto', width: '100%' }}>
                        <div style={{ textAlign: 'center', marginBottom: 32 }}>
                            <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 4 }}>Profit and Loss Statement</h2>
                            <p style={{ fontSize: 13, color: '#64748B' }}>For the period all-time to {new Date().toLocaleDateString('en-IN')}</p>
                        </div>

                        <h4 style={{ color: '#1E40AF', fontSize: 14, fontWeight: 800, textTransform: 'uppercase', marginBottom: 16 }}>1. Sales Account</h4>
                        <FinancialRow label="Total Billed Revenue (Sales)" amount={totalSales} tooltipText="Sum of all sales invoices created, reflecting the total gross sales." />
                        <FinancialRow label="Less: Sale Returns" amount={0} isSub tooltipText="Total value of credit notes / returned goods from customers (currently zero)." />
                        <FinancialRow label="Net Sales" amount={totalSales} isTotal tooltipText="Total Sales minus Sales Returns. Represents the net revenue generated by selling goods." />

                        <div style={{ height: 24 }} />

                        <h4 style={{ color: '#1E40AF', fontSize: 14, fontWeight: 800, textTransform: 'uppercase', marginBottom: 16 }}>2. Cost of Goods Sold</h4>
                        <FinancialRow label="Opening Stock" amount={0} isSub tooltipText="The value of inventory held at the beginning of the accounting period." />
                        <FinancialRow label="Add: Purchases" amount={totalPurchase} isSub tooltipText="The value of new inventory purchased during the accounting period." />
                        <FinancialRow label="Less: Closing Stock" amount={closingStockValue} isSub tooltipText="The value of unsold inventory remaining at the end of the accounting period." />
                        <FinancialRow label="Cost of Goods Sold (Calculated)" amount={totalPurchase - closingStockValue} isTotal tooltipText="Calculated as (Opening Stock + Purchases - Closing Stock). It is the direct cost of items sold." />

                        <div style={{ height: 24 }} />

                        <div style={{ background: '#F0FDF4', padding: '16px 20px', borderRadius: 8, display: 'flex', justifyContent: 'space-between', fontWeight: 900, fontSize: 16, color: '#166534', border: '1px solid #BBF7D0' }}>
                            <span>GROSS PROFIT</span>
                            <span>₹{(totalSales - (totalPurchase - closingStockValue)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                        </div>

                        <div style={{ height: 24 }} />

                        <h4 style={{ color: '#1E40AF', fontSize: 14, fontWeight: 800, textTransform: 'uppercase', marginBottom: 16 }}>3. Operating Expenses</h4>
                        {expenses.length === 0 ? (
                            <FinancialRow label="General Expenses" amount={0} isSub tooltipText="General company expenses logged when no specific entries are present." />
                        ) : (
                            expenses.map((e: any) => <FinancialRow key={e.id} label={e.title} amount={e.amount} isSub tooltipText={`Operational expense logged for: ${e.title}`} />)
                        )}
                        <FinancialRow label="Total Operating Expenses" amount={totalExpenses} isTotal tooltipText="Sum of all indirect operational expenditures (e.g. rent, salaries, utilities) not directly tied to purchasing stock." />

                        <div style={{ height: 32 }} />

                        <div style={{ background: netProfit >= 0 ? '#1E293B' : '#7F1D1D', padding: '20px', borderRadius: 12, display: 'flex', justifyContent: 'space-between', fontWeight: 900, fontSize: 18, color: 'white' }}>
                            <span>NET {netProfit >= 0 ? 'PROFIT' : 'LOSS'}</span>
                            <span>₹{Math.abs(netProfit).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                        </div>
                    </div>
                )}

                {activeTab === 'balance' && (
                    <div className="card" style={{ padding: 32, maxWidth: 900, margin: '0 auto', width: '100%' }}>
                        <div style={{ textAlign: 'center', marginBottom: 32 }}>
                            <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 4 }}>Balance Sheet</h2>
                            <p style={{ fontSize: 13, color: '#64748B' }}>As on {new Date().toLocaleDateString('en-IN')}</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 32, alignItems: 'flex-start' }} className="reports-grid">
                            <div style={{ background: '#F8FAFC', padding: 24, borderRadius: 16, border: '1px solid #E2E8F0' }}>
                                <h3 style={{ fontSize: 16, fontWeight: 900, color: '#0F172A', marginBottom: 20, borderBottom: '2px solid #CBD5E1', paddingBottom: 8 }}>Liabilities & Equity</h3>

                                <h4 style={{ color: '#1E40AF', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', marginBottom: 12 }}>Owner's Equity</h4>
                                <FinancialRow label="Opening Capital / Funds" amount={50000} isSub tooltipText="The initial investment or retained earnings brought forward to start the period." />
                                <FinancialRow label="Add: Net Profit/(Loss) for the period" amount={netProfit} isSub tooltipText="The net profit or loss generated by the business during this period, which increases or decreases equity." />
                                <FinancialRow label="Total Equity" amount={50000 + netProfit} isTotal tooltipText="The owner's net stake in the business, calculated as Capital + Net Profit." />

                                <div style={{ height: 24 }} />

                                <h4 style={{ color: '#1E40AF', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', marginBottom: 12 }}>Current Liabilities</h4>
                                <FinancialRow label="Sundry Creditors (Accounts Payable)" amount={accountsPayable} isSub tooltipText="Total amount owed to suppliers/vendors for purchases made on credit." />
                                <FinancialRow label="GST Payable (Liability)" amount={Math.max(0, gstLiability)} isSub tooltipText="The net GST collected from customers that needs to be paid to the tax authority." />
                                <FinancialRow label="Total Current Liabilities" amount={accountsPayable + Math.max(0, gstLiability)} isTotal tooltipText="Short-term obligations due within one year, including trade payables and tax liabilities." />

                                <div style={{ height: 32 }} />

                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 900, fontSize: 16, color: '#0F172A', borderTop: '3px double #0F172A', paddingTop: 16 }}>
                                    <span>TOTAL LIABILITIES & EQUITY</span>
                                    <span>₹{(50000 + netProfit + accountsPayable + Math.max(0, gstLiability)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                                </div>
                            </div>

                            <div style={{ background: '#F8FAFC', padding: 24, borderRadius: 16, border: '1px solid #E2E8F0' }}>
                                <h3 style={{ fontSize: 16, fontWeight: 900, color: '#0F172A', marginBottom: 20, borderBottom: '2px solid #CBD5E1', paddingBottom: 8 }}>Assets</h3>

                                <h4 style={{ color: '#1E40AF', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', marginBottom: 12 }}>Current Assets</h4>
                                <FinancialRow label="Cash & Bank Balances" amount={Math.max(0, cashInBank)} isSub tooltipText="Total liquid cash available in hand and in the company's bank accounts." />
                                <FinancialRow label="Sundry Debtors (Accounts Receivable)" amount={accountsReceivable} isSub tooltipText="Total outstanding payments due from customers for sales made on credit." />
                                <FinancialRow label="Closing Stock (Inventory)" amount={closingStockValue} isSub tooltipText="The cost value of unsold stock remaining in your inventory." />
                                <FinancialRow label="GST Input Credit" amount={Math.max(0, -gstLiability)} isSub tooltipText="GST paid on business purchases that can be offset against GST collected on sales." />
                                <FinancialRow label="Total Current Assets" amount={Math.max(0, cashInBank) + accountsReceivable + closingStockValue + Math.max(0, -gstLiability)} isTotal tooltipText="Short-term assets that are cash or can be converted to cash within a year." />

                                <div style={{ height: 32 }} />
                                <div style={{ height: 110 }} />

                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 900, fontSize: 16, color: '#0F172A', borderTop: '3px double #0F172A', paddingTop: 16 }}>
                                    <span>TOTAL ASSETS</span>
                                    <span>₹{(Math.max(0, cashInBank) + accountsReceivable + closingStockValue + Math.max(0, -gstLiability)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'customer-insights' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: 20 }} className="reports-grid">
                        {/* Left Column: Spenders Leaderboard */}
                        <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div>
                                <h3 style={{ fontSize: 16, fontWeight: 900, color: '#0F172A', margin: 0 }}>🏆 Highest Spenders Leaderboard</h3>
                                <p style={{ fontSize: 12, color: '#718096', margin: '4px 0 0' }}>Customers ranked by total purchase volume.</p>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 600, overflowY: 'auto', paddingRight: 4 }}>
                                {customerInsights.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '40px 0', color: '#A0AEC0', fontWeight: 600 }}>No customer transactions found.</div>
                                ) : (
                                    customerInsights.map((cust, idx) => {
                                        const isSelected = (cust.phone || cust.name) === activeCustomerKey;
                                        const rankBadge = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`;
                                        return (
                                            <div 
                                                key={cust.phone || cust.name} 
                                                onClick={() => setSelectedCustomerKey(cust.phone || cust.name)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    padding: '12px 14px',
                                                    borderRadius: 12,
                                                    border: isSelected ? '2px solid #4285F4' : '1px solid #E2E8F0',
                                                    background: isSelected ? '#EBF8FF' : 'white',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.15s',
                                                    transform: isSelected ? 'scale(1.02)' : 'none',
                                                    boxShadow: isSelected ? '0 4px 6px -1px rgba(66, 133, 244, 0.1)' : 'none'
                                                }}
                                                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.borderColor = '#CBD5E0'; }}
                                                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.borderColor = '#E2E8F0'; }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flex: 1 }}>
                                                    <span style={{ fontSize: 13, fontWeight: 900, color: '#4A5568', width: 28, textAlign: 'center' }}>{rankBadge}</span>
                                                    <div style={{ minWidth: 0, flex: 1 }}>
                                                        <p style={{ fontSize: 13, fontWeight: 800, color: '#1A202C', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cust.name}</p>
                                                        <p style={{ fontSize: 11, color: '#718096', margin: '2px 0 0' }}>{cust.phone || 'No phone'}</p>
                                                    </div>
                                                </div>
                                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                                    <p style={{ fontSize: 13, fontWeight: 900, color: '#34A853', margin: 0 }}>₹{cust.totalSpent.toLocaleString('en-IN')}</p>
                                                    <p style={{ fontSize: 10, color: '#718096', margin: '2px 0 0', fontWeight: 600 }}>{cust.invoiceCount} visits</p>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>

                        {/* Right Column: Periodical Repeat Tracker & Timeline */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            {selectedCustomerDetail ? (
                                <>
                                    {/* Customer Profile Summary */}
                                    <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                                            <div>
                                                <span style={{ background: '#EBF8FF', color: '#2B6CB0', fontSize: 10, fontWeight: 900, padding: '3px 8px', borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Customer Profile</span>
                                                <h3 style={{ fontSize: 18, fontWeight: 900, color: '#1A202C', margin: '6px 0 2px' }}>{selectedCustomerDetail.name}</h3>
                                                {selectedCustomerDetail.phone && <p style={{ fontSize: 12, color: '#718096', margin: 0 }}>📞 {selectedCustomerDetail.phone}</p>}
                                            </div>
                                            
                                            {company?.loyaltyPointsEnabled && (
                                                <div style={{ background: '#E6FFFA', border: '1px solid #B2F5EA', borderRadius: 12, padding: '8px 16px', textAlign: 'right' }}>
                                                    <p style={{ fontSize: 10, color: '#00A389', fontWeight: 800, textTransform: 'uppercase', margin: '0 0 2px' }}>🌟 loyalty points</p>
                                                    <p style={{ fontSize: 18, fontWeight: 900, color: '#007766', margin: 0 }}>{selectedCustomerDetail.loyaltyPoints} pts</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Frequency Dues & Interval Metrics */}
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                                            <div style={{ background: '#F7FAFC', borderRadius: 12, padding: '12px 14px', border: '1px solid #EDF2F7' }}>
                                                <p style={{ fontSize: 10, color: '#718096', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 4px' }}>Visit Frequency</p>
                                                <p style={{ fontSize: 18, fontWeight: 900, color: '#1A202C', margin: 0 }}>{selectedCustomerDetail.invoiceCount} orders</p>
                                            </div>
                                            <div style={{ background: '#FFF5F5', borderRadius: 12, padding: '12px 14px', border: '1px solid #FED7D7' }}>
                                                <p style={{ fontSize: 10, color: '#C53030', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 4px' }}>Outstanding Dues</p>
                                                <p style={{ fontSize: 18, fontWeight: 900, color: '#9B2C2C', margin: 0 }}>₹{selectedCustomerDetail.balanceDue.toLocaleString('en-IN')}</p>
                                            </div>
                                            <div style={{ background: '#FAF5FF', borderRadius: 12, padding: '12px 14px', border: '1px solid #E9D8FD' }}>
                                                <p style={{ fontSize: 10, color: '#6B46C1', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 4px' }}>Avg Visit Interval</p>
                                                <p style={{ fontSize: 18, fontWeight: 900, color: '#553C9A', margin: 0 }}>
                                                    {calculateAvgDaysBetweenVisits(selectedCustomerDetail.invoices)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Timeline List */}
                                    <div className="card" style={{ padding: 24 }}>
                                        <h4 style={{ fontSize: 14, fontWeight: 900, color: '#0F172A', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.04em' }}>📅 Periodical Purchase History</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 400, overflowY: 'auto', paddingRight: 4 }}>
                                            {[...selectedCustomerDetail.invoices]
                                                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                                .map((inv) => (
                                                    <div 
                                                        key={inv.id} 
                                                        style={{ 
                                                            display: 'flex', 
                                                            justifyContent: 'space-between', 
                                                            alignItems: 'center', 
                                                            padding: '12px 16px', 
                                                            borderRadius: 10, 
                                                            border: '1px solid #E2E8F0', 
                                                            background: '#F8FAFC' 
                                                        }}
                                                    >
                                                        <div>
                                                            <p style={{ fontSize: 13, fontWeight: 800, color: '#1A202C', margin: 0 }}>Invoice #{inv.invoiceNumber}</p>
                                                            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
                                                                <span style={{ fontSize: 11, color: '#718096', fontWeight: 600 }}>{inv.date} {inv.time || ''}</span>
                                                                <span className={`badge ${inv.paymentStatus === 'paid' ? 'badge-green' : inv.paymentStatus === 'partial' ? 'badge-blue' : 'badge-red'}`} style={{ fontSize: 9 }}>
                                                                    {inv.paymentStatus}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div style={{ textAlign: 'right' }}>
                                                            <p style={{ fontSize: 14, fontWeight: 900, color: '#1A202C', margin: 0 }}>₹{inv.grandTotal.toLocaleString('en-IN')}</p>
                                                            {inv.pointsEarned !== undefined && inv.pointsEarned > 0 && (
                                                                <span style={{ fontSize: 10, color: '#2F855A', fontWeight: 700 }}>+{inv.pointsEarned} pts</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="card" style={{ padding: 40, textAlign: 'center', color: '#A0AEC0', fontWeight: 600 }}>
                                    Select a customer from the leaderboard to view purchase frequency and timeline.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <style>{`
                .reports-grid { grid-template-columns: 1fr !important; }
                @media (min-width: 768px) { .reports-grid { grid-template-columns: 1fr 1fr !important; } }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateX(-50%) translateY(4px); }
                    to { opacity: 1; transform: translateX(-50%) translateY(0); }
                }
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
}
