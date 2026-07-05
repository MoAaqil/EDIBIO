'use client';
import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import FeatureGate from '@/components/FeatureGate';
import { useCompanyData, useActiveCompany } from '@/lib/store';
import { formatDate } from '@/lib/utils';
import { TrendingUp, TrendingDown, BarChart3, PackageSearch, AlertTriangle, Lightbulb, Activity, Download, Zap, PieChart as PieIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

export default function AnalyticsReportsPage() {
    const company = useActiveCompany();
    const invoices = useCompanyData('invoices') as any[];
    const expenses = useCompanyData('expenses') as any[];
    const products = useCompanyData('products') as any[];
    const formatDateLocal = (d: Date) => {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [isCustomHistory, setIsCustomHistory] = useState(false);
    const [showDailyHistory, setShowDailyHistory] = useState(false);
    const [startDate, setStartDate] = useState(() => {
        const d = new Date();
        d.setDate(d.getDate() - 30);
        return formatDateLocal(d);
    });
    const [endDate, setEndDate] = useState(() => formatDateLocal(new Date()));

    const saleInvoices = invoices.filter(i => i.invoiceType === 'sale');
    const purchaseInvoices = invoices.filter(i => i.invoiceType === 'purchase');

    const totalSales = saleInvoices.reduce((a: number, i: any) => a + i.grandTotal, 0);
    const totalPurchase = purchaseInvoices.reduce((a: number, i: any) => a + i.grandTotal, 0);
    const totalExpenses = expenses.reduce((a: number, e: any) => a + e.amount, 0);
    const netProfit = totalSales - totalPurchase - totalExpenses;

    const itemMap: Record<string, { name: string; qty: number; revenue: number }> = {};
    saleInvoices.forEach((inv: any) => {
        (inv.items || []).forEach((item: any) => {
            const k = item.name;
            if (!itemMap[k]) itemMap[k] = { name: k, qty: 0, revenue: 0 };
            itemMap[k].qty += item.qty;
            itemMap[k].revenue += item.amount;
        });
    });

    const enrichedProducts = products.map(p => {
        const soldData = itemMap[p.name] || { qty: 0, revenue: 0 };
        const profitMargin = p.sellingPrice && p.purchasePrice ? ((p.sellingPrice - p.purchasePrice) / p.sellingPrice) * 100 : 0;
        return {
            ...p,
            soldQty: soldData.qty,
            revenue: soldData.revenue,
            profitMargin,
            isLowStock: p.stockQty <= (p.minStock || 5)
        };
    });

    // Monthly revenue vs purchase (last 6 months)
    const monthlyData = (() => {
        const result: Record<string, { month: string; sales: number; purchase: number }> = {};
        const now = new Date();
        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            const label = d.toLocaleString('en-IN', { month: 'short' });
            result[key] = { month: label, sales: 0, purchase: 0 };
        }
        invoices.forEach((inv: any) => {
            const key = (inv.date || '').slice(0, 7);
            if (result[key]) {
                if (inv.invoiceType === 'sale') result[key].sales += inv.grandTotal || 0;
                if (inv.invoiceType === 'purchase') result[key].purchase += inv.grandTotal || 0;
            }
        });
        return Object.values(result);
    })();

    // Daily History for the last 30 days (or custom range)
    const dailyHistory = (() => {
        const result = [];
        const start = isCustomHistory && startDate ? new Date(startDate) : new Date(new Date().setDate(new Date().getDate() - 30));
        const end = isCustomHistory && endDate ? new Date(endDate) : new Date();
        
        // Limit to prevent massive loops (max 365 days)
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const maxDays = Math.min(diffDays + 1, 365); 
        
        for (let i = 0; i < maxDays; i++) {
            const d = new Date(end.getFullYear(), end.getMonth(), end.getDate() - i);
            const key = formatDateLocal(d); // YYYY-MM-DD local
            
            let dailySales = 0;
            let dailyProfit = 0;
            let invoicesCount = 0;
            
            saleInvoices.forEach((inv: any) => {
                if (inv.date === key) {
                    dailySales += inv.grandTotal || 0;
                    invoicesCount++;
                    let cost = 0;
                    (inv.items || []).forEach((item: any) => {
                         const p = products.find((prod: any) => prod.id === item.productId || prod.name === item.name);
                         const buyPrice = p ? (p.purchasePrice || 0) : 0;
                         cost += buyPrice * (item.qty || 0);
                    });
                    dailyProfit += (inv.grandTotal || 0) - cost;
                }
            });
            
            result.push({
                dateKey: key,
                dateLabel: d.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }),
                sales: dailySales,
                profit: dailyProfit,
                invoices: invoicesCount
            });
        }
        return result;
    })();

    const totalStocksLeft = products.reduce((acc, p) => acc + (p.stockQty || 0), 0);

    // Top 5 products by revenue
    const topProductsPie = Object.values(itemMap)
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5)
        .map(p => ({ name: p.name.length > 14 ? p.name.slice(0, 14) + '…' : p.name, value: Math.round(p.revenue) }));
    const PIE_COLORS = ['#4285F4', '#34A853', '#FBBC04', '#EA4335', '#9333EA'];

    const lowStockAlerts = enrichedProducts.filter(p => p.isLowStock && p.stockQty > 0).sort((a, b) => a.stockQty - b.stockQty);
    const outOfStock = enrichedProducts.filter(p => p.stockQty <= 0);
    const highProfitStars = enrichedProducts.filter(p => p.profitMargin > 30 && p.soldQty > 0).sort((a, b) => b.revenue - a.revenue);
    const deadStock = enrichedProducts.filter(p => p.stockQty > 20 && p.soldQty === 0).sort((a, b) => b.stockQty - a.stockQty);

    const exportReport = () => {
        const lines = [
            `Edibio Analytics & Strategy Report`,
            `Generated: ${new Date().toLocaleString()}`,
            ``,
            `Total Sales, ₹${totalSales.toFixed(2)}`,
            `Total Purchase, ₹${totalPurchase.toFixed(2)}`,
            `Net Profit, ₹${netProfit.toFixed(2)}`,
            ``,
            `ACTION REQUIRED: Out of Stock`,
        ];
        outOfStock.forEach(p => lines.push(`${p.name},0 units left`));
        lines.push(``);
        lines.push(`ACTION REQUIRED: Low Stock`);
        lowStockAlerts.forEach(p => lines.push(`${p.name},${p.stockQty} units left`));

        const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
        const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'business_analytics.csv'; a.click(); URL.revokeObjectURL(url);
    };

    return (
        <FeatureGate feature="ai_analytics" description="AI Business Analytics is a Pro feature">
                <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 40 }}>

                    {/* Header */}
                    <div style={{ position: 'relative', overflow: 'hidden', padding: '40px 48px', borderRadius: 24, color: 'white', background: '#0F172A', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
                        {/* Background Gradients */}
                        <div style={{ position: 'absolute', top: -100, right: -50, width: 400, height: 400, background: 'radial-gradient(circle, rgba(66,133,244,0.15) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', bottom: -50, left: 100, width: 300, height: 300, background: 'radial-gradient(circle, rgba(147,51,234,0.15) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

                        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
                            <div style={{ flex: '1 1 400px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                                    <div style={{ background: 'linear-gradient(135deg, #4285F4, #9333EA)', padding: 8, borderRadius: 12 }}>
                                        <Activity size={24} color="white" />
                                    </div>
                                    <span style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, color: '#94A3B8' }}>Edibio Intelligence</span>
                                </div>
                                <h1 style={{ fontWeight: 900, fontSize: 36, margin: '0 0 8px 0', letterSpacing: '-1px' }}>AI Business Analytics</h1>
                                <p style={{ fontSize: 15, color: '#94A3B8', margin: 0, maxWidth: 500, lineHeight: 1.5 }}>Advanced real-time stock tracking, profit optimization strategies, and automated insights derived from your billing data.</p>
                            </div>
                            <button onClick={exportReport} style={{ background: 'white', color: '#0F172A', padding: '14px 28px', borderRadius: 16, fontWeight: 800, border: 'none', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 15, boxShadow: '0 8px 16px rgba(255,255,255,0.1)', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={e => e.currentTarget.style.transform = 'none'}>
                                <Download size={18} /> Export CSV Intel
                            </button>
                        </div>
                    </div>

                    {/* ── Charts Row ── */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="charts-grid">
                        {/* Bar chart: Monthly Revenue */}
                        <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 20, padding: '24px', overflow: 'hidden' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                                <BarChart3 size={18} color="#4285F4" />
                                <div>
                                    <p style={{ fontWeight: 800, fontSize: 15, color: '#1A1A2E', margin: 0 }}>Monthly Revenue</p>
                                    <p style={{ fontSize: 11, color: '#A0AEC0', margin: 0 }}>Sales vs Purchase — last 6 months</p>
                                </div>
                            </div>
                            <ResponsiveContainer width="100%" height={220} minWidth={0} minHeight={0}>
                                <BarChart data={monthlyData} barCategoryGap="30%" barGap={4}>
                                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8', fontWeight: 600 }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)} />
                                    <Tooltip formatter={(v: any) => [`₹${Number(v).toLocaleString('en-IN')}`, '']} contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', fontSize: 12 }} />
                                    <Bar dataKey="sales" fill="#4285F4" radius={[6, 6, 0, 0]} name="Sales" />
                                    <Bar dataKey="purchase" fill="#E8F0FE" radius={[6, 6, 0, 0]} name="Purchase" />
                                </BarChart>
                            </ResponsiveContainer>
                            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 8 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#718096' }}><div style={{ width: 10, height: 10, borderRadius: 3, background: '#4285F4' }} /> Sales</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#718096' }}><div style={{ width: 10, height: 10, borderRadius: 3, background: '#E8F0FE', border: '1px solid #CBD5E0' }} /> Purchase</div>
                            </div>
                        </div>

                        {/* Pie chart: Top products */}
                        <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 20, padding: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                                <PieIcon size={18} color="#9333EA" />
                                <div>
                                    <p style={{ fontWeight: 800, fontSize: 15, color: '#1A1A2E', margin: 0 }}>Top Products</p>
                                    <p style={{ fontSize: 11, color: '#A0AEC0', margin: 0 }}>Revenue share by product</p>
                                </div>
                            </div>
                            {topProductsPie.length > 0 ? (
                                <ResponsiveContainer width="100%" height={220} minWidth={0} minHeight={0}>
                                    <PieChart>
                                        <Pie data={topProductsPie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={45} paddingAngle={3}>
                                            {topProductsPie.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                                        </Pie>
                                        <Tooltip formatter={(v: any) => [`₹${Number(v).toLocaleString('en-IN')}`, 'Revenue']} contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', fontSize: 12 }} />
                                        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <div style={{ height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A0AEC0', fontSize: 13 }}>
                                    No sales data yet — create invoices to see chart
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Power Metrics Dashboard */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                        <div style={{ background: 'white', border: '1px solid #E2E8F0', padding: 24, borderRadius: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.02)', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, right: 0, width: 100, height: 100, background: 'radial-gradient(circle, rgba(52,168,83,0.1) 0%, transparent 70%)', borderRadius: '50%', transform: 'translate(30%, -30%)' }} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                                <div style={{ background: '#E6F4EA', width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><TrendingUp size={24} color="#34A853" /></div>
                                <div>
                                    <p style={{ fontSize: 12, fontWeight: 800, color: '#718096', textTransform: 'uppercase', marginBottom: 2 }}>Volume</p>
                                    <p style={{ fontSize: 14, fontWeight: 700, color: '#2D3748', margin: 0 }}>Total Sales Turnover</p>
                                </div>
                            </div>
                            <h2 style={{ fontSize: 32, fontWeight: 900, margin: 0, color: '#1A202C' }}>₹{totalSales.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</h2>
                        </div>

                        <div style={{ background: 'white', border: '1px solid #E2E8F0', padding: 24, borderRadius: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.02)', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, right: 0, width: 100, height: 100, background: `radial-gradient(circle, ${netProfit >= 0 ? 'rgba(66,133,244,0.1)' : 'rgba(234,67,53,0.1)'} 0%, transparent 70%)`, borderRadius: '50%', transform: 'translate(30%, -30%)' }} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                                <div style={{ background: netProfit >= 0 ? '#E8F0FE' : '#FCE8E6', width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BarChart3 size={24} color={netProfit >= 0 ? '#4285F4' : '#EA4335'} /></div>
                                <div>
                                    <p style={{ fontSize: 12, fontWeight: 800, color: '#718096', textTransform: 'uppercase', marginBottom: 2 }}>Profitability</p>
                                    <p style={{ fontSize: 14, fontWeight: 700, color: '#2D3748', margin: 0 }}>Net Profit Estimate</p>
                                </div>
                            </div>
                            <h2 style={{ fontSize: 32, fontWeight: 900, margin: 0, color: netProfit >= 0 ? '#1967D2' : '#C53030' }}>₹{netProfit.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</h2>
                        </div>

                        <div style={{ background: 'white', border: '1px solid #E2E8F0', padding: 24, borderRadius: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.02)', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, right: 0, width: 100, height: 100, background: 'radial-gradient(circle, rgba(251,188,4,0.1) 0%, transparent 70%)', borderRadius: '50%', transform: 'translate(30%, -30%)' }} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                                <div style={{ background: '#FEF7E0', width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><PackageSearch size={24} color="#F9AB00" /></div>
                                <div>
                                    <p style={{ fontSize: 12, fontWeight: 800, color: '#718096', textTransform: 'uppercase', marginBottom: 2 }}>Inventory</p>
                                    <p style={{ fontSize: 14, fontWeight: 700, color: '#2D3748', margin: 0 }}>Total Stocks Left</p>
                                </div>
                            </div>
                            <h2 style={{ fontSize: 32, fontWeight: 900, margin: 0, color: '#1A202C' }}>{totalStocksLeft.toLocaleString('en-IN')} <span style={{ fontSize: 18, color: '#A0AEC0', fontWeight: 600 }}>Units</span></h2>
                            <p style={{ fontSize: 12, color: '#A0AEC0', marginTop: 4, fontWeight: 600 }}>Across {products.length} catalog items</p>
                        </div>
                    </div>

                    {/* Daily History Table */}
                    <div style={{ background: 'white', borderRadius: 24, border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                        <div style={{ padding: '20px 28px', borderBottom: showDailyHistory ? '1px solid #E2E8F0' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ background: '#F3E8FF', width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Activity size={20} color="#9333EA" />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: 16, fontWeight: 900, margin: 0, color: '#1A202C' }}>Daily Sales History</h3>
                                    <p style={{ fontSize: 12, color: '#718096', margin: 0, fontWeight: 600 }}>{isCustomHistory ? 'Custom Date Range' : 'Performance over the last 30 days'}</p>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                                {/* Show date range controls only when expanded */}
                                {showDailyHistory && (
                                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 700, color: '#4A5568', cursor: 'pointer' }}>
                                        <input type="checkbox" checked={isCustomHistory} onChange={e => setIsCustomHistory(e.target.checked)} style={{ width: 16, height: 16, accentColor: '#9333EA' }} />
                                        Custom Range
                                    </label>
                                )}
                                {showDailyHistory && isCustomHistory && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={{ padding: '6px 10px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 12, fontWeight: 600, color: '#1A202C' }} />
                                        <span style={{ fontSize: 12, color: '#A0AEC0', fontWeight: 600 }}>to</span>
                                        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={{ padding: '6px 10px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 12, fontWeight: 600, color: '#1A202C' }} />
                                    </div>
                                )}
                                {/* Toggle button */}
                                <button
                                    onClick={() => setShowDailyHistory(v => !v)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 6,
                                        padding: '8px 16px', borderRadius: 10,
                                        border: '1.5px solid #E2E8F0',
                                        background: showDailyHistory ? '#F3E8FF' : 'white',
                                        color: showDailyHistory ? '#9333EA' : '#718096',
                                        fontSize: 12, fontWeight: 700, cursor: 'pointer',
                                        transition: 'all 0.18s'
                                    }}
                                >
                                    {showDailyHistory ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                    {showDailyHistory ? 'Hide History' : 'Show History'}
                                </button>
                            </div>
                        </div>
                        {showDailyHistory && (() => {
                            const totalInvoices = dailyHistory.reduce((a, d) => a + d.invoices, 0);
                            const totalSalesAmt = dailyHistory.reduce((a, d) => a + d.sales, 0);
                            const totalProfitAmt = dailyHistory.reduce((a, d) => a + d.profit, 0);
                            const activeDays = dailyHistory.filter(d => d.invoices > 0).length;
                            return (
                                <>
                                    {/* Period Summary Cards */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, padding: '16px 20px', background: '#FAFBFF', borderBottom: '1px solid #E2E8F0' }}>
                                        {[
                                            {
                                                label: 'Total Bills',
                                                value: totalInvoices.toLocaleString('en-IN'),
                                                sub: `${activeDays} active day${activeDays !== 1 ? 's' : ''}`,
                                                color: '#9333EA', bg: '#F3E8FF'
                                            },
                                            {
                                                label: 'Total Sales',
                                                value: `₹${totalSalesAmt.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
                                                sub: activeDays > 0 ? `Avg ₹${Math.round(totalSalesAmt / activeDays).toLocaleString('en-IN')}/day` : 'No sales yet',
                                                color: '#1967D2', bg: '#E8F0FE'
                                            },
                                            {
                                                label: 'Est. Profit',
                                                value: `₹${totalProfitAmt.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
                                                sub: totalSalesAmt > 0 ? `${((totalProfitAmt / totalSalesAmt) * 100).toFixed(1)}% margin` : '—',
                                                color: totalProfitAmt >= 0 ? '#16A34A' : '#DC2626',
                                                bg: totalProfitAmt >= 0 ? '#F0FDF4' : '#FEF2F2'
                                            },
                                        ].map(({ label, value, sub, color, bg }) => (
                                            <div key={label} style={{ background: bg, borderRadius: 14, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                                                <p style={{ fontSize: 10, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>{label}</p>
                                                <p style={{ fontSize: 20, fontWeight: 900, color, margin: 0, letterSpacing: '-0.5px' }}>{value}</p>
                                                <p style={{ fontSize: 11, color: '#718096', fontWeight: 600, margin: 0 }}>{sub}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Daily Table */}
                                    <div style={{ overflowX: 'auto' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
                                            <thead>
                                                <tr style={{ background: '#F8FAFC', color: '#64748B' }}>
                                                    <th style={{ padding: '13px 24px', fontWeight: 800 }}>Date</th>
                                                    <th style={{ padding: '13px 24px', fontWeight: 800 }}>Invoices</th>
                                                    <th style={{ padding: '13px 24px', fontWeight: 800 }}>Total Sales</th>
                                                    <th style={{ padding: '13px 24px', fontWeight: 800 }}>Est. Profit</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dailyHistory.map((day, i) => (
                                                    <tr key={i} style={{ borderBottom: '1px solid #F1F5F9', opacity: day.invoices === 0 ? 0.45 : 1 }}>
                                                        <td style={{ padding: '11px 24px', fontWeight: 700, color: '#1E293B' }}>{day.dateLabel}</td>
                                                        <td style={{ padding: '11px 24px', color: '#64748B', fontWeight: 600 }}>
                                                            {day.invoices === 0 ? <span style={{ color: '#CBD5E0' }}>—</span> : `${day.invoices} bill${day.invoices !== 1 ? 's' : ''}`}
                                                        </td>
                                                        <td style={{ padding: '11px 24px', fontWeight: 800, color: '#1E293B' }}>₹{day.sales.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                                                        <td style={{ padding: '11px 24px', fontWeight: 800, color: day.profit >= 0 ? '#16A34A' : '#DC2626' }}>₹{day.profit.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            {/* Pinned totals footer row */}
                                            <tfoot>
                                                <tr style={{ background: 'linear-gradient(135deg, #1E293B, #0F172A)', color: 'white' }}>
                                                    <td style={{ padding: '14px 24px', fontWeight: 900, fontSize: 13 }}>
                                                        Period Total <span style={{ fontSize: 10, opacity: 0.6, fontWeight: 600 }}>({dailyHistory.length} days)</span>
                                                    </td>
                                                    <td style={{ padding: '14px 24px', fontWeight: 900 }}>{totalInvoices} bills</td>
                                                    <td style={{ padding: '14px 24px', fontWeight: 900, fontSize: 15 }}>₹{totalSalesAmt.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                                                    <td style={{ padding: '14px 24px', fontWeight: 900, fontSize: 15, color: totalProfitAmt >= 0 ? '#4ADE80' : '#F87171' }}>₹{totalProfitAmt.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </>
                            );
                        })()}
                    </div>

                    {/* Next-Gen Strategy Framework */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 5fr) minmax(0, 7fr)', gap: 24 }} className="analytics-grid">

                        {/* Left Panel: Inventory Crisis Center */}
                        <div style={{ background: 'white', borderRadius: 24, border: '1px solid #E2E8F0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ background: '#FFF5F5', padding: '24px 32px', borderBottom: '1px solid #FEB2B2', display: 'flex', alignItems: 'center', gap: 16 }}>
                                <div style={{ width: 48, height: 48, background: 'white', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(229,62,62,0.15)' }}>
                                    <AlertTriangle size={24} color="#E53E3E" />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: 20, fontWeight: 900, margin: 0, color: '#9B2C2C' }}>Urgent Action Center</h3>
                                    <p style={{ fontSize: 13, color: '#C53030', margin: '4px 0 0', fontWeight: 600 }}>Critical inventory warnings</p>
                                </div>
                            </div>

                            <div style={{ padding: 32, flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
                                {outOfStock.length > 0 ? (
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                            <h4 style={{ fontSize: 14, fontWeight: 800, color: '#1A202C', margin: 0, textTransform: 'uppercase', letterSpacing: 0.5 }}>Restock Immediately</h4>
                                            <span style={{ background: '#E53E3E', color: 'white', fontSize: 11, fontWeight: 800, padding: '2px 8px', borderRadius: 12 }}>{outOfStock.length} Items Empty</span>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                            {outOfStock.slice(0, 6).map(p => (
                                                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#F8FAFC', borderRadius: 12, borderLeft: '4px solid #E53E3E' }}>
                                                    <span style={{ fontWeight: 700, color: '#2D3748', fontSize: 14 }}>{p.name}</span>
                                                    <span style={{ fontWeight: 800, color: '#E53E3E', fontSize: 14 }}>0 Units</span>
                                                </div>
                                            ))}
                                            {outOfStock.length > 6 && <div style={{ textAlign: 'center', paddingTop: 8, fontSize: 12, fontWeight: 700, color: '#A0AEC0' }}>+ {outOfStock.length - 6} more out of stock items...</div>}
                                        </div>
                                    </div>
                                ) : null}

                                {lowStockAlerts.length > 0 ? (
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                            <h4 style={{ fontSize: 14, fontWeight: 800, color: '#1A202C', margin: 0, textTransform: 'uppercase', letterSpacing: 0.5 }}>Running Low</h4>
                                            <span style={{ background: '#DD6B20', color: 'white', fontSize: 11, fontWeight: 800, padding: '2px 8px', borderRadius: 12 }}>{lowStockAlerts.length} Warnings</span>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                            {lowStockAlerts.slice(0, 5).map(p => (
                                                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#F8FAFC', borderRadius: 12, borderLeft: '4px solid #DD6B20' }}>
                                                    <span style={{ fontWeight: 600, color: '#4A5568', fontSize: 14 }}>{p.name}</span>
                                                    <span style={{ fontWeight: 800, color: '#DD6B20', fontSize: 14 }}>{p.stockQty} Left</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: '#F8FAFC', borderRadius: 16, border: '2px dashed #E2E8F0', padding: 32 }}>
                                        <div style={{ background: '#E6F4EA', padding: 16, borderRadius: '50%', marginBottom: 16 }}><Activity size={32} color="#34A853" /></div>
                                        <h4 style={{ margin: '0 0 8px 0', color: '#1A202C', fontSize: 16, fontWeight: 800 }}>Supply Chain is Optimal</h4>
                                        <p style={{ margin: 0, color: '#718096', fontSize: 14 }}>No low stock or out of stock items currently detected. You're doing great!</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Panel: Growth Opportunities */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            <div style={{ background: 'white', padding: 32, borderRadius: 24, border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                                    <div style={{ width: 48, height: 48, background: '#F0FDF4', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Lightbulb size={24} color="#38A169" />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: 20, fontWeight: 900, margin: 0, color: '#1A202C' }}>AI Growth Drivers</h3>
                                        <p style={{ fontSize: 13, color: '#718096', margin: '4px 0 0', fontWeight: 600 }}>Actionable tips based on robust sales algorithms</p>
                                    </div>
                                    <span style={{ background: '#E8F0FE', color: '#1967D2', fontSize: 12, fontWeight: 800, padding: '4px 12px', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 6 }}><Zap size={14} /> Active Intel</span>
                                </div>

                                {highProfitStars.length > 0 ? (
                                    <div style={{ background: 'linear-gradient(to right, #F0FDF4, white)', padding: 24, borderRadius: 16, border: '1px solid #9AE6B4', marginBottom: 20 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                                            <PieIcon size={18} color="#2F855A" />
                                            <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: '#276749' }}>Highlight these VIP Products</h4>
                                        </div>
                                        <p style={{ fontSize: 14, color: '#4A5568', marginBottom: 16, lineHeight: 1.6 }}>These products yield a high return rate (&gt;30% Margin). Prioritize keeping them visible near the checkout counter and heavily restocked.</p>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                            {highProfitStars.slice(0, 4).map((p, i) => (
                                                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '12px 16px', borderRadius: 12, border: '1px solid #E2E8F0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                                                    <span style={{ fontWeight: 700, color: '#1A202C', fontSize: 13, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</span>
                                                    <span style={{ fontWeight: 900, color: '#38A169', fontSize: 13, background: '#F0FDF4', padding: '4px 8px', borderRadius: 6 }}>{p.profitMargin.toFixed(0)}%</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ padding: 24, background: '#F8FAFC', borderRadius: 16, marginBottom: 20 }}>
                                        <p style={{ margin: 0, color: '#718096', fontSize: 14, fontWeight: 600 }}>Algorithm analyzing profit margins to determine high-yield candidates...</p>
                                    </div>
                                )}

                                {deadStock.length > 0 && (
                                    <div style={{ background: '#F8FAFC', padding: 24, borderRadius: 16, border: '1px solid #E2E8F0' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                                            <TrendingDown size={18} color="#718096" />
                                            <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: '#4A5568' }}>Reduce Re-Ordering Volume (Dead Stock)</h4>
                                        </div>
                                        <p style={{ fontSize: 14, color: '#718096', marginBottom: 16, lineHeight: 1.6 }}>You are currently holding excess stock (&gt;20) of these items, but they haven't sold recently. Consider implementing automated discounts or 1+1 bundle offers to clear shelf space.</p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                                            {deadStock.slice(0, 8).map(p => (
                                                <span key={p.id} style={{ background: 'white', border: '1px solid #CBD5E0', padding: '6px 12px', borderRadius: 8, fontSize: 13, fontWeight: 700, color: '#4A5568', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                                                    {p.name} <span style={{ color: '#A0AEC0', fontWeight: 600 }}>({p.stockQty})</span>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>

                    <style>{`
                    @media (max-width: 1024px) {
                        .analytics-grid {
                            grid-template-columns: 1fr !important;
                        }
                        .charts-grid {
                            grid-template-columns: 1fr !important;
                        }
                    }
                    @media (min-width: 768px) {
                        .charts-grid { grid-template-columns: 1fr 1fr !important; }
                    }
                `}</style>
                </div>
            </FeatureGate>
    );
}
