'use client';
import { useStore, useActiveCompany, useCompanyData } from '@/lib/store';
import { formatShort, formatDate } from '@/lib/utils';
import Link from 'next/link';
import { useMemo } from 'react';
import { Invoice, Product, Party, Expense } from '@/lib/types';
import {
    Plus, TrendingUp, TrendingDown, Package, Users, AlertTriangle,
    ChevronRight, FileText, DollarSign, ArrowUpRight, ArrowDownRight,
    Warehouse, Zap, BarChart3, ShoppingCart, MessageCircle, Lightbulb,
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { SkeletonDashboard } from '@/components/Skeleton';

function KPICard({ label, value, icon: Icon, color, trend, sub }: any) {
    return (
        <div className="card" style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={18} color={color} />
                </div>
            </div>
            <p style={{ fontSize: 24, fontWeight: 900, color: '#1A1A2E', marginBottom: 4 }}>{value}</p>
            {sub && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: trend === 'up' ? '#34A853' : '#EA4335', fontWeight: 600 }}>
                    {trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {sub}
                </div>
            )}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: color, opacity: 0.6 }} />
        </div>
    );
}

export default function DashboardPage() {
    const { isHydrating } = useStore();
    const company = useActiveCompany();
    const invoices = useCompanyData('invoices') as Invoice[];
    const parties = useCompanyData('parties') as Party[];
    const products = useCompanyData('products') as Product[];

    // These types are NOT real confirmed sales — exclude from all revenue stats
    const DRAFT_TYPES = ['estimate', 'proforma', 'delivery_challan'];

    const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
    const todayInv = invoices.filter(i => i.date === today && i.invoiceType === 'sale' && !DRAFT_TYPES.includes(i.invoiceType) && (i.isGstBill || i.grandTotal > 0));
    const recentInvoices = invoices.filter(i => i.isGstBill).length > 0
        ? invoices.filter(i => i.isGstBill).slice(0, 6)
        : invoices.slice(0, 6);

    const trendData = useMemo(() => {
        const data = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().slice(0, 10);
            const dayTotal = invoices
                .filter(inv => inv.date === dateStr && inv.invoiceType === 'sale' && !DRAFT_TYPES.includes(inv.invoiceType))
                .reduce((sum, inv) => sum + (inv.grandTotal || 0), 0);
            data.push({
                name: date.toLocaleDateString('en-IN', { weekday: 'short' }),
                sales: dayTotal
            });
        }
        return data;
    }, [invoices]);

    const greeting = useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    }, []);

    const totalReceivable = useMemo(() => parties.filter(p => p.balance > 0).reduce((a: number, p: Party) => a + p.balance, 0), [parties]);
    const totalPayable = useMemo(() => parties.filter(p => p.balance < 0).reduce((a: number, p: Party) => a + Math.abs(p.balance), 0), [parties]);
    const lowStock = useMemo(() => products.filter((p: Product) => p.stockQty <= (p.lowStockAlertQty || 5)), [products]);
    const stockValue = useMemo(() => products.reduce((a: number, p: Product) => a + p.stockQty * p.purchasePrice, 0), [products]);

    const insights = useMemo(() => {
        const calculated: { emoji: string; text: string; color: string }[] = [];
        const saleInvs = invoices.filter((i: any) => i.invoiceType === 'sale' && !DRAFT_TYPES.includes(i.invoiceType));
        const itemMap: Record<string, { qty: number; name: string }> = {};
        saleInvs.forEach((inv: any) => (inv.items || []).forEach((it: any) => { if (!itemMap[it.name]) itemMap[it.name] = { qty: 0, name: it.name }; itemMap[it.name].qty += it.qty; }));
        const topItem = Object.values(itemMap).sort((a, b) => b.qty - a.qty)[0];
        if (topItem) calculated.push({ emoji: '📈', text: `<b>${topItem.name}</b> is your top-selling product (${topItem.qty} units sold).`, color: '#34A853' });
        const oos = products.filter((p: any) => p.stockQty <= 0);
        if (oos.length) calculated.push({ emoji: '🚨', text: `<b>${oos.length} item${oos.length > 1 ? 's' : ''}</b> are out of stock — reorder now to avoid lost sales.`, color: '#EA4335' });
        if (totalReceivable > 0) calculated.push({ emoji: '💰', text: `You have <b>₹${totalReceivable.toLocaleString('en-IN')}</b> in outstanding receivables from customers.`, color: '#FBBC04' });
        const lowStockCount = products.filter((p: any) => p.stockQty > 0 && p.stockQty <= (p.lowStockAlertQty || 5)).length;
        if (lowStockCount > 0) calculated.push({ emoji: '⚠️', text: `<b>${lowStockCount} product${lowStockCount > 1 ? 's are' : ' is'}</b> running low on stock. Consider reordering soon.`, color: '#F59E0B' });
        if (!calculated.length) calculated.push({ emoji: '✅', text: 'All systems look good! Stock is healthy and no outstanding payments.', color: '#34A853' });
        return calculated;
    }, [invoices, products, totalReceivable]);

    const quickLinks = [
        { label: 'Sale Invoice', href: `/company/billing/new?type=sale`, color: '#EA4335', icon: FileText },
        { label: 'Purchase', href: `/company/billing/new?type=purchase`, color: '#4285F4', icon: ShoppingCart },
        { label: 'Add Item', href: `/company/inventory/add`, color: '#FBBC04', icon: Package },
        { label: 'Add Party', href: `/company/parties/add`, color: '#34A853', icon: Users },
        { label: 'Add Expense', href: `/company/expenses/add`, color: '#EA4335', icon: DollarSign },
        { label: 'Quick Bill', href: `/company/billing/quick`, color: '#4285F4', icon: Zap },
        { label: 'Reports', href: `/company/reports`, color: '#34A853', icon: BarChart3 },
        { label: 'Estimate', href: `/company/billing/new?type=estimate`, color: '#9333EA', icon: FileText },
    ];

    if (!company) return null;
    if (isHydrating) return <SkeletonDashboard />;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1200 }}>
            {/* Welcome & System Health */}
            <div style={{
                background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
                borderRadius: 20, padding: '28px 28px 24px', position: 'relative', overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg,#4285F4 25%,#34A853 25% 50%,#FBBC04 50% 75%,#EA4335 75%)' }} />
                <div style={{ position: 'absolute', right: -20, top: -20, width: 140, height: 140, borderRadius: 999, background: `${company.colorAccent}20` }} />

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, position: 'relative', zIndex: 1, gap: 16 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>
                            {greeting} 👋 {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </p>
                        <h2 style={{ color: 'white', fontWeight: 900, fontSize: 24, marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{company.name}</h2>
                        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#34A853', flexShrink: 0 }}></span>
                            {company.type} · {company.city} · Secure Multi-Device Sync Active
                        </p>
                    </div>
                    <Link href={`/company/billing/new?type=sale`} style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        background: company.colorAccent, color: 'white',
                        padding: '10px 18px', borderRadius: 12, textDecoration: 'none',
                        fontWeight: 700, fontSize: 13, boxShadow: `0 4px 16px ${company.colorAccent}50`, flexShrink: 0
                    }}>
                        <Plus size={16} /> New Invoice
                    </Link>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 14 }} className="stats-grid">
                    {[
                        { label: "Today's Sales", value: formatShort(todayInv.reduce((a, i) => a + i.grandTotal, 0)), sub: `${todayInv.length} bills` },
                        { label: 'Collected', value: formatShort(todayInv.reduce((a, i) => a + i.amountPaid, 0)), sub: 'cash + UPI' },
                        { label: 'Pending', value: formatShort(todayInv.reduce((a, i) => a + i.balanceDue, 0)), sub: 'to collect' },
                    ].map(({ label, value, sub }) => (
                        <div key={label} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '14px 12px', textAlign: 'center' }}>
                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>{label}</p>
                            <p style={{ color: 'white', fontWeight: 900, fontSize: 20 }}>{value}</p>
                            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, marginTop: 3 }}>{sub}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sales Chart Section */}
            <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 20, padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <TrendingUp size={18} color="#4285F4" />
                        </div>
                        <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1A1A2E', margin: 0 }}>Sales Performance</h3>
                    </div>
                    <p style={{ fontSize: 11, color: '#A0AEC0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Weekly View</p>
                </div>

                <div style={{ height: 220, width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                        <AreaChart data={trendData}>
                            <defs>
                                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4285F4" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#4285F4" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fontWeight: 600, fill: '#A0AEC0' }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fontWeight: 600, fill: '#A0AEC0' }}
                                tickFormatter={(val) => formatShort(val)}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', fontWeight: 700, fontSize: 12 }}
                                formatter={(val: any) => [`₹${(val || 0).toLocaleString()}`, 'Sales']}
                            />
                            <Area
                                type="monotone"
                                dataKey="sales"
                                stroke="#4285F4"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorSales)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {lowStock.length > 0 && (
                <Link href={`/company/inventory?filter=low`} style={{
                    display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none',
                    background: '#FEF7E0', border: '1px solid #FBBC04', borderRadius: 14, padding: '14px 18px',
                }}>
                    <AlertTriangle size={18} color="#B06000" />
                    <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 13, fontWeight: 700, color: '#92400E' }}>Low Stock Alert — {lowStock.length} item{lowStock.length !== 1 ? 's' : ''}</p>
                        <p style={{ fontSize: 11, color: '#B45309' }}>{lowStock.slice(0, 3).map((p: any) => p.name).join(', ')}{lowStock.length > 3 ? ` +${lowStock.length - 3} more` : ''}</p>
                    </div>
                    <ChevronRight size={16} color="#B06000" />
                </Link>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }} className="kpi-grid">
                <KPICard label="To Receive" value={formatShort(totalReceivable)} icon={TrendingUp} color="#34A853" trend="up" sub="from customers" />
                <KPICard label="To Pay" value={formatShort(totalPayable)} icon={TrendingDown} color="#EA4335" trend="down" sub="to suppliers" />
                <KPICard label="Stock Value" value={formatShort(stockValue)} icon={Package} color="#FBBC04" />
                <KPICard label="Total Parties" value={String(parties.length)} icon={Users} color="#4285F4" />
            </div>

            {insights.length > 0 && (
                <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F3F5', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg,#4285F4,#9333EA)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Lightbulb size={16} color="white" />
                        </div>
                        <div>
                            <p style={{ fontWeight: 800, fontSize: 14, color: '#1A1A2E', margin: 0 }}>Smart Business Insights</p>
                            <p style={{ fontSize: 10, color: '#A0AEC0', margin: 0, fontWeight: 600 }}>Powered by your store data</p>
                        </div>
                        <Link href="/company/analytics" style={{ marginLeft: 'auto', fontSize: 11, color: '#4285F4', fontWeight: 700, textDecoration: 'none' }}>Full Analytics →</Link>
                    </div>
                    <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {insights.slice(0, 3).map((ins, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px', borderRadius: 12, background: ins.color + '10', border: `1px solid ${ins.color}25` }}>
                                <span style={{ fontSize: 16, flexShrink: 0 }}>{ins.emoji}</span>
                                <p style={{ fontSize: 12, color: '#374151', fontWeight: 600, margin: 0, lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: ins.text }} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="card" style={{ padding: '20px 24px' }}>
                <p style={{ fontSize: 12, fontWeight: 800, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>Quick Actions</p>
                {/* Mobile: horizontal scroll row; Tablet+: 4-col grid; Desktop: 8-col grid */}
                <div className="quick-grid-wrapper">
                    <div className="quick-grid">
                        {quickLinks.map(({ label, href, color, icon: Icon }) => (
                            <Link key={href} href={href} style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                                textDecoration: 'none', padding: '14px 8px', borderRadius: 14,
                                border: '1.5px solid #F1F3F5', background: '#FAFAFA',
                                minWidth: 76, flex: '0 0 auto',
                            }} className="quick-action-item">
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 12px ${color}35` }}>
                                    <Icon size={20} color="white" />
                                </div>
                                <span style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', textAlign: 'center', lineHeight: 1.3 }}>{label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="card" style={{ overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #F1F3F5' }}>
                    <p style={{ fontWeight: 800, fontSize: 15, color: '#1A1A2E' }}>Recent Bills</p>
                    <Link href={`/company/billing`} style={{ fontSize: 12, color: '#4285F4', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 3 }}>
                        All bills <ChevronRight size={13} />
                    </Link>
                </div>
                {recentInvoices.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                        <FileText size={40} style={{ color: '#E1E4E8', margin: '0 auto 12px' }} />
                        <p style={{ color: '#A0AEC0', fontSize: 14 }}>No invoices yet</p>
                        <Link href={`/company/billing/new?type=sale`} className="btn btn-blue btn-sm" style={{ marginTop: 12, display: 'inline-flex', textDecoration: 'none' }}>
                            Create First Invoice
                        </Link>
                    </div>
                ) : (
                    <div>
                        {recentInvoices.map((inv: Invoice) => (
                            <Link key={inv.id} href={`/company/billing/invoice?id=${inv.id}`} style={{
                                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px',
                                borderBottom: '1px solid #F8F9FA', textDecoration: 'none', transition: 'background 0.12s',
                            }} className="hover-bg">
                                <div style={{
                                    width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                                    background: inv.invoiceType === 'sale' ? '#FCE8E6' : '#E8F0FE',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <FileText size={18} color={inv.invoiceType === 'sale' ? '#EA4335' : '#4285F4'} />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A2E', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {inv.partyName || 'Walk-in Customer'}
                                    </p>
                                    <p style={{ fontSize: 11, color: '#A0AEC0' }}>{inv.invoiceNumber} · {formatDate(inv.date)}</p>
                                </div>
                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                    <p style={{ fontSize: 14, fontWeight: 900, color: '#1A1A2E' }}>₹{inv.grandTotal.toLocaleString('en-IN')}</p>
                                    <span className={`badge ${inv.paymentStatus === 'paid' ? 'badge-green' : inv.paymentStatus === 'partial' ? 'badge-yellow' : 'badge-red'}`}>
                                        {inv.paymentStatus}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
            <style>{`
                /* Quick Actions — mobile: horizontal scroll; tablet+: grid */
                .quick-grid-wrapper { overflow-x: auto; -webkit-overflow-scrolling: touch; }
                .quick-grid-wrapper::-webkit-scrollbar { display: none; }
                .quick-grid {
                    display: flex;
                    flex-direction: row;
                    gap: 10px;
                    padding-bottom: 4px;
                }
                @media (min-width: 640px) {
                    .quick-grid-wrapper { overflow-x: visible; }
                    .quick-grid {
                        display: grid !important;
                        grid-template-columns: repeat(4, 1fr);
                        gap: 12px;
                    }
                    .quick-action-item { min-width: unset !important; flex: unset !important; }
                }
                @media (min-width: 768px) {
                    .kpi-grid { grid-template-columns: repeat(4, 1fr) !important; }
                    .quick-grid { grid-template-columns: repeat(8, 1fr) !important; }
                }
                .quick-action-item:hover { border-color: #CBD5E0 !important; box-shadow: 0 4px 12px rgba(0,0,0,0.06) !important; }
                .hover-bg:hover { background: #F8F9FA; }
            `}</style>
        </div>
    );
}
