'use client';
import { useState } from 'react';
import { useCompanyData, useActiveCompany } from '@/lib/store';
import { formatDate, r2 } from '@/lib/utils';
import { BarChart3, TrendingUp, TrendingDown, FileText, DollarSign, Calendar, Download } from 'lucide-react';
import { downloadGSTR1 } from '@/lib/gst-utils';

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
    const invoices = useCompanyData('invoices') as any[];
    const expenses = useCompanyData('expenses') as any[];
    const products = useCompanyData('products') as any[];

    const [activeTab, setActiveTab] = useState<'overview' | 'pnl' | 'balance'>('overview');

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

    const KPI = ({ label, value, sub, color, Icon }: any) => (
        <div className="card" style={{ padding: '18px 20px', display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={22} color={color} />
            </div>
            <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase' }}>{label}</p>
                <p style={{ fontSize: 20, fontWeight: 900, color: '#1A1A2E' }}>{value}</p>
                {sub && <p style={{ fontSize: 11, color: '#718096' }}>{sub}</p>}
            </div>
        </div>
    );

    const FinancialRow = ({ label, amount, isTotal = false, isSub = false }: any) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: isTotal ? '16px 0' : '12px 0', borderBottom: isTotal ? 'none' : '1px solid #F1F5F9', borderTop: isTotal ? '2px solid #E2E8F0' : 'none', fontWeight: isTotal ? 800 : (isSub ? 500 : 700), fontSize: isTotal ? 16 : 14, color: isTotal ? '#1A1A2E' : (isSub ? '#64748B' : '#334155'), paddingLeft: isSub ? 20 : 0 }}>
            <span>{label}</span>
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
                        <button onClick={handleGSTR1} className="btn btn-green btn-sm" style={{ gap: 5 }}>
                            <FileText size={13} /> GSTR-1 (JSON)
                        </button>
                        <button onClick={exportReport} className="btn btn-outline btn-sm" style={{ gap: 5 }}>
                            <Download size={13} /> Export CSV
                        </button>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 10, borderBottom: '1px solid #E2E8F0', paddingBottom: 0 }}>
                    {[
                        { id: 'overview', label: 'Overview' },
                        { id: 'pnl', label: 'Profit & Loss Statement' },
                        { id: 'balance', label: 'Balance Sheet' }
                    ].map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} style={{ background: 'none', border: 'none', padding: '12px 20px', fontWeight: activeTab === tab.id ? 800 : 600, color: activeTab === tab.id ? '#4285F4' : '#64748B', borderBottom: activeTab === tab.id ? '3px solid #4285F4' : '3px solid transparent', cursor: 'pointer', fontSize: 14, transition: 'all 0.2s', marginBottom: -1 }}>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {activeTab === 'overview' && (
                    <>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
                            <KPI label="Total Sales" value={`₹${(totalSales / 1000).toFixed(1)}K`} sub="GST Bills Only" color="#34A853" Icon={TrendingUp} />
                            <KPI label="Total Purchase" value={`₹${(totalPurchase / 1000).toFixed(1)}K`} color="#4285F4" Icon={TrendingDown} />
                            <KPI label="Net Profit" value={`₹${(netProfit / 1000).toFixed(1)}K`} color={netProfit >= 0 ? '#34A853' : '#EA4335'} Icon={BarChart3} />
                            <KPI label="GST Liability" value={`₹${(gstLiability / 1000).toFixed(1)}K`} color="#FBBC04" Icon={FileText} />
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
                        <FinancialRow label="Total Billed Revenue (Sales)" amount={totalSales} />
                        <FinancialRow label="Less: Sale Returns" amount={0} isSub />
                        <FinancialRow label="Net Sales" amount={totalSales} isTotal />

                        <div style={{ height: 24 }} />

                        <h4 style={{ color: '#1E40AF', fontSize: 14, fontWeight: 800, textTransform: 'uppercase', marginBottom: 16 }}>2. Cost of Goods Sold</h4>
                        <FinancialRow label="Opening Stock" amount={0} isSub />
                        <FinancialRow label="Add: Purchases" amount={totalPurchase} isSub />
                        <FinancialRow label="Less: Closing Stock" amount={closingStockValue} isSub />
                        <FinancialRow label="Cost of Goods Sold (Calculated)" amount={totalPurchase - closingStockValue} isTotal />

                        <div style={{ height: 24 }} />

                        <div style={{ background: '#F0FDF4', padding: '16px 20px', borderRadius: 8, display: 'flex', justifyContent: 'space-between', fontWeight: 900, fontSize: 16, color: '#166534', border: '1px solid #BBF7D0' }}>
                            <span>GROSS PROFIT</span>
                            <span>₹{(totalSales - (totalPurchase - closingStockValue)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                        </div>

                        <div style={{ height: 24 }} />

                        <h4 style={{ color: '#1E40AF', fontSize: 14, fontWeight: 800, textTransform: 'uppercase', marginBottom: 16 }}>3. Operating Expenses</h4>
                        {expenses.length === 0 ? (
                            <FinancialRow label="General Expenses" amount={0} isSub />
                        ) : (
                            expenses.map((e: any) => <FinancialRow key={e.id} label={e.title} amount={e.amount} isSub />)
                        )}
                        <FinancialRow label="Total Operating Expenses" amount={totalExpenses} isTotal />

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
                                <FinancialRow label="Opening Capital / Funds" amount={50000} isSub />
                                <FinancialRow label="Add: Net Profit/(Loss) for the period" amount={netProfit} isSub />
                                <FinancialRow label="Total Equity" amount={50000 + netProfit} isTotal />

                                <div style={{ height: 24 }} />

                                <h4 style={{ color: '#1E40AF', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', marginBottom: 12 }}>Current Liabilities</h4>
                                <FinancialRow label="Sundry Creditors (Accounts Payable)" amount={accountsPayable} isSub />
                                <FinancialRow label="GST Payable (Liability)" amount={Math.max(0, gstLiability)} isSub />
                                <FinancialRow label="Total Current Liabilities" amount={accountsPayable + Math.max(0, gstLiability)} isTotal />

                                <div style={{ height: 32 }} />

                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 900, fontSize: 16, color: '#0F172A', borderTop: '3px double #0F172A', paddingTop: 16 }}>
                                    <span>TOTAL LIABILITIES & EQUITY</span>
                                    <span>₹{(50000 + netProfit + accountsPayable + Math.max(0, gstLiability)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                                </div>
                            </div>

                            <div style={{ background: '#F8FAFC', padding: 24, borderRadius: 16, border: '1px solid #E2E8F0' }}>
                                <h3 style={{ fontSize: 16, fontWeight: 900, color: '#0F172A', marginBottom: 20, borderBottom: '2px solid #CBD5E1', paddingBottom: 8 }}>Assets</h3>

                                <h4 style={{ color: '#1E40AF', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', marginBottom: 12 }}>Current Assets</h4>
                                <FinancialRow label="Cash & Bank Balances" amount={Math.max(0, cashInBank)} isSub />
                                <FinancialRow label="Sundry Debtors (Accounts Receivable)" amount={accountsReceivable} isSub />
                                <FinancialRow label="Closing Stock (Inventory)" amount={closingStockValue} isSub />
                                <FinancialRow label="GST Input Credit" amount={Math.max(0, -gstLiability)} isSub />
                                <FinancialRow label="Total Current Assets" amount={Math.max(0, cashInBank) + accountsReceivable + closingStockValue + Math.max(0, -gstLiability)} isTotal />

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
            </div>
            <style>{`.reports-grid { grid-template-columns: 1fr !important; } @media (min-width: 768px) { .reports-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
        </>
    );
}
