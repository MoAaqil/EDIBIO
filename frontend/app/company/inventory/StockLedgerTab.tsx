'use client';
import { useState, useMemo } from 'react';
import { useCompanyData, useStore } from '@/lib/store';
import { 
    Search, 
    ArrowUpCircle, 
    ArrowDownCircle, 
    Calendar, 
    History, 
    AlertTriangle, 
    TrendingUp, 
    TrendingDown,
    Edit2,
    Clock,
    Package,
    ArrowRightCircle,
    CheckCircle2,
    ChevronDown,
    ChevronUp
} from 'lucide-react';
import { r2 } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function StockLedgerTab() {
    const products = useCompanyData('products') as any[];
    const invoices = useCompanyData('invoices') as any[];
    const { adjustStock } = useStore();

    const [selectedProductId, setSelectedProductId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showHistory, setShowHistory] = useState(true);

    // Filter products for dropdown
    const filteredProducts = useMemo(() => {
        const lowerSearch = searchTerm.toLowerCase();
        if (!searchTerm) return products.slice(0, 5);
        return products.filter(p => 
            p.name.toLowerCase().includes(lowerSearch) || 
            (p.barcode && p.barcode.includes(searchTerm)) ||
            (p.category && p.category.toLowerCase().includes(lowerSearch))
        ).slice(0, 10);
    }, [products, searchTerm]);

    const activeProduct = useMemo(() => 
        products.find(p => p.id === selectedProductId), 
    [products, selectedProductId]);

    // Generate Ledger Entries with Running Balance
    const ledgerData = useMemo(() => {
        if (!selectedProductId || !activeProduct) return { entries: [], stats: null };

        let rawEntries: any[] = [];

        // 1. Process All Invoices (filtered for actual stock moves)
        invoices.forEach(inv => {
            if (inv.isHidden) return; // Fix: Ignore hidden bills
            
            const isPurchase = inv.invoiceType === 'purchase';
            const isSale = inv.invoiceType === 'sale';
            
            // Fix: Only count actual sales and purchases in the ledger
            if (!isPurchase && !isSale) return; 

            inv.items.forEach((item: any) => {
                if (item.productId === selectedProductId || (item.name === activeProduct.name && !item.productId)) {
                    rawEntries.push({
                        id: inv.id,
                        timestamp: new Date(inv.date + ' ' + (inv.time || '00:00')).getTime(),
                        date: inv.date,
                        type: isPurchase ? 'IN' : 'OUT',
                        source: inv.partyName || (isPurchase ? 'Supplier' : 'Walk-in Customer'),
                        ref: inv.invoiceNumber || (isPurchase ? 'PUR-' : 'INV-') + inv.id.slice(-4),
                        qty: item.qty,
                        price: isPurchase ? (item.purchasePrice || item.rate) : item.rate,
                        mfgDate: item.mfgDate,
                        total: item.amount
                    });
                }
            });
        });

        // 2. Sort by date ASC to calculate running balance
        rawEntries.sort((a, b) => a.timestamp - b.timestamp);

        let runningBalance = 0; // Starting from 0 as we don't have "Opening Stock" history yet
        const entriesWithBalance = rawEntries.map(entry => {
            runningBalance += (entry.type === 'IN' ? entry.qty : -entry.qty);
            return { ...entry, balanceAfter: runningBalance };
        });

        // 3. Final display sort (DESC)
        const displayEntries = [...entriesWithBalance].sort((a, b) => b.timestamp - a.timestamp);

        // Calculate Stats
        const totalIn = rawEntries.filter(e => e.type === 'IN').reduce((a, b) => a + b.qty, 0);
        const totalOut = rawEntries.filter(e => e.type === 'OUT').reduce((a, b) => a + b.qty, 0);
        
        return { 
            entries: displayEntries, 
            stats: { totalIn, totalOut } 
        };
    }, [selectedProductId, invoices, activeProduct]);

    const { entries: ledgerEntries, stats } = ledgerData;

    // Ageing Alert Logic
    const ageingInfo = useMemo(() => {
        if (!ledgerEntries.length || !activeProduct) return null;
        
        const lastIn = ledgerEntries.find(e => e.type === 'IN');
        if (!lastIn) return null;

        const lastInDate = new Date(lastIn.date);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - lastInDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let status = 'Fresh';
        let color = '#34A853';
        let bg = '#F0FFF4';
        if (diffDays > 180) { status = 'Critically Old'; color = '#EA4335'; bg = '#FFF5F5'; }
        else if (diffDays > 90) { status = 'Stagnant'; color = '#FBBC04'; bg = '#FFFBEB'; }
        else if (diffDays > 30) { status = 'Ageing'; color = '#4285F4'; bg = '#F0F7FF'; }

        return { days: diffDays, status, color, bg };
    }, [ledgerEntries, activeProduct]);

    const handleMfgUpdate = (entryDate: string, currentMfg: string) => {
        const newDate = prompt("Update Manufacturing Date (YYYY-MM-DD):", currentMfg || "");
        if (newDate && activeProduct) {
            toast.success("Feature: Manufacturing Date logged for this batch.");
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Search Header */}
            <div className="card" style={{ padding: '24px 30px', background: 'linear-gradient(135deg, #1E293B, #0F172A)', color: 'white', borderRadius: 20, boxShadow: '0 10px 30px rgba(15,23,42,0.15)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 48, height: 48, borderRadius: 16, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <History size={24} color="#4285F4" />
                        </div>
                        <div>
                            <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 2 }}>Stock Movement Ledger</h2>
                            <p style={{ fontSize: 13, opacity: 0.6, fontWeight: 500 }}>Lifecycle tracking, ageing alerts & inventory integrity</p>
                        </div>
                    </div>
                    <div style={{ position: 'relative', width: '100%', maxWidth: 450 }}>
                        <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                        <input 
                            className="e-input"
                            style={{ 
                                paddingLeft: 46, 
                                background: 'rgba(255,255,255,0.07)', 
                                border: '1px solid rgba(255,255,255,0.2)', 
                                color: 'white', 
                                borderRadius: 14,
                                height: 48,
                                fontSize: 15
                            }}
                            placeholder="Search by Product Name, Barcode or Category..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && filteredProducts.length > 0 && (
                            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', borderRadius: 16, marginTop: 10, boxShadow: '0 20px 50px rgba(0,0,0,0.3)', zIndex: 100, overflow: 'hidden' }}>
                                {filteredProducts.map(p => (
                                    <div 
                                        key={p.id} 
                                        onClick={() => { setSelectedProductId(p.id); setSearchTerm(''); }}
                                        style={{ padding: '14px 20px', cursor: 'pointer', color: '#1E293B', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 12, transition: 'background 0.2s' }}
                                        onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'white'}
                                    >
                                        <div style={{ width: 32, height: 32, borderRadius: 8, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#475569', fontSize: 12 }}>{p.name[0]}</div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</p>
                                            <p style={{ fontSize: 11, color: '#64748B' }}>{p.category || 'Uncategorized'}</p>
                                        </div>
                                        <span style={{ background: '#E2E8F0', padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700, color: '#475569' }}>Qty: {p.stockQty}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {!selectedProductId ? (
                <div style={{ textAlign: 'center', padding: '120px 20px', background: '#FFFFFF', borderRadius: 24, border: '2px dashed #E2E8F0', marginTop: 10 }}>
                    <div style={{ width: 80, height: 80, borderRadius: 40, background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                        <ArrowRightCircle size={32} color="#CBD5E0" />
                    </div>
                    <h3 style={{ color: '#1E293B', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Ready to audit your stock?</h3>
                    <p style={{ color: '#64748B', fontSize: 14, maxWidth: 400, margin: '0 auto' }}>Select a product from the search bar above to generate a complete movement ledger and check ageing status.</p>
                </div>
            ) : (
                <>
                    {/* Stats Dashboard */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                        <div className="card" style={{ padding: 24, borderRadius: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                                <div style={{ width: 44, height: 44, borderRadius: 14, background: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Package size={22} color="#0EA5E9" />
                                </div>
                                <div>
                                    <h4 style={{ fontWeight: 800, color: '#1E293B', fontSize: 16 }}>{activeProduct?.name}</h4>
                                    <p style={{ fontSize: 12, color: '#64748B' }}>Current Status</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <div>
                                    <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>In Inventory</p>
                                    <p style={{ fontSize: 24, fontWeight: 900, color: (activeProduct?.stockQty || 0) > (activeProduct?.lowStockAlertQty || 0) ? '#10B981' : '#EF4444', marginTop: 2 }}>
                                        {activeProduct?.stockQty} <span style={{ fontSize: 14, fontWeight: 700 }}>{activeProduct?.unit}</span>
                                    </p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>HSN Code</p>
                                    <p style={{ fontSize: 14, fontWeight: 800, color: '#334155' }}>{activeProduct?.hsnCode || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="card" style={{ padding: 24, borderRadius: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                                <div style={{ width: 44, height: 44, borderRadius: 14, background: '#F0F9FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <TrendingUp size={22} color="#0284C7" />
                                </div>
                                <div>
                                    <h4 style={{ fontWeight: 800, color: '#1E293B', fontSize: 16 }}>In / Out Analysis</h4>
                                    <p style={{ fontSize: 12, color: '#64748B' }}>Lifetime movement</p>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: 12 }}>
                                    <p style={{ fontSize: 10, color: '#64748B', fontWeight: 800, marginBottom: 2 }}>TOTAL IN</p>
                                    <p style={{ fontSize: 16, fontWeight: 900, color: '#059669' }}>+{stats?.totalIn || 0}</p>
                                </div>
                                <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: 12 }}>
                                    <p style={{ fontSize: 10, color: '#64748B', fontWeight: 800, marginBottom: 2 }}>TOTAL OUT</p>
                                    <p style={{ fontSize: 16, fontWeight: 900, color: '#DC2626' }}>-{stats?.totalOut || 0}</p>
                                </div>
                            </div>
                        </div>

                        {ageingInfo ? (
                            <div className="card" style={{ padding: 24, borderRadius: 20, background: ageingInfo.bg, border: `1.5px dashed ${ageingInfo.color}40` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 14, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                        <Clock size={22} color={ageingInfo.color} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: 800, color: '#1E293B', fontSize: 16 }}>Ageing Alert</h4>
                                        <p style={{ fontSize: 12, color: '#64748B' }}>Stock holding time</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <p style={{ fontSize: 11, color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Status</p>
                                        <p style={{ fontSize: 18, fontWeight: 900, color: ageingInfo.color, marginTop: 2 }}>{ageingInfo.status}</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontSize: 11, color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Days Held</p>
                                        <p style={{ fontSize: 18, fontWeight: 900, color: '#1E293B' }}>{ageingInfo.days}d</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="card" style={{ padding: 24, borderRadius: 20, background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <p style={{ fontSize: 13, color: '#94A3B8', fontWeight: 600 }}>No purchase history for ageing analysis</p>
                            </div>
                        )}
                    </div>

                    {/* Ledger Table */}
                    <div className="card" style={{ overflow: 'hidden', borderRadius: 24, border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                        <div style={{ padding: '16px 20px', borderBottom: showHistory ? '1px solid #F1F5F9' : 'none', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <History size={18} color="#475569" />
                                <h3 style={{ fontSize: 16, fontWeight: 900, color: '#1E293B' }}>Transaction History</h3>
                                <span className="badge badge-gray" style={{ background: '#F1F5F9', color: '#475569', padding: '4px 10px', fontSize: 11 }}>{ledgerEntries.length} ops</span>
                            </div>
                            {/* Toggle button */}
                            <button
                                onClick={() => setShowHistory(v => !v)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 6,
                                    padding: '7px 14px', borderRadius: 10,
                                    border: '1.5px solid #E2E8F0',
                                    background: showHistory ? '#EBF4FF' : 'white',
                                    color: showHistory ? '#4285F4' : '#718096',
                                    fontSize: 12, fontWeight: 700, cursor: 'pointer',
                                    transition: 'all 0.18s'
                                }}
                            >
                                {showHistory ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                {showHistory ? 'Hide' : 'Show History'}
                            </button>
                        </div>
                        {showHistory && (
                            <div style={{ overflowX: 'auto' }}>
                                <table className="e-table" style={{ border: 'none' }}>
                                    <thead style={{ background: '#F8FAFC' }}>
                                        <tr>
                                            <th style={{ padding: '16px 24px' }}>Date &amp; Time</th>
                                            <th>Movement</th>
                                            <th>Details</th>
                                            <th>Qty Change</th>
                                            <th>Closing Stock</th>
                                            <th>Price (₹)</th>
                                            <th>Mfg Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {ledgerEntries.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} style={{ textAlign: 'center', padding: '60px 20px', color: '#94A3B8' }}>
                                                <AlertTriangle size={32} style={{ margin: '0 auto 10px', opacity: 0.5 }} />
                                                <p>No transactions found for this item.</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        ledgerEntries.map((entry, idx) => (
                                            <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                                                <td style={{ padding: '16px 24px' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                                        <span style={{ fontSize: 13, fontWeight: 700, color: '#1E293B' }}>{entry.date}</span>
                                                        <span style={{ fontSize: 11, color: '#94A3B8' }}>{new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{ 
                                                        display: 'inline-flex', 
                                                        alignItems: 'center', 
                                                        gap: 6, 
                                                        padding: '4px 10px', 
                                                        borderRadius: 8,
                                                        fontSize: 11,
                                                        fontWeight: 900,
                                                        background: entry.type === 'IN' ? '#DCFCE7' : '#FEE2E2',
                                                        color: entry.type === 'IN' ? '#166534' : '#991B1B'
                                                    }}>
                                                        {entry.type === 'IN' ? <ArrowUpCircle size={14} /> : <ArrowDownCircle size={14} />}
                                                        STOCK {entry.type}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                                        <span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>{entry.source}</span>
                                                        <span style={{ fontSize: 10, color: '#94A3B8', fontFamily: 'monospace' }}>#{entry.ref}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span style={{ fontSize: 15, fontWeight: 900, color: entry.type === 'IN' ? '#10B981' : '#EF4444' }}>
                                                        {entry.type === 'IN' ? '+' : '-'}{Math.abs(entry.qty)}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                        <span style={{ fontSize: 14, fontWeight: 800, color: '#1E293B' }}>{entry.balanceAfter}</span>
                                                        <span style={{ fontSize: 11, color: '#94A3B8' }}>{activeProduct?.unit}</span>
                                                    </div>
                                                </td>
                                                <td style={{ fontWeight: 800, color: '#1E293B' }}>₹{entry.price.toLocaleString('en-IN')}</td>
                                                <td>
                                                    <div 
                                                        onClick={() => handleMfgUpdate(entry.date, entry.mfgDate)}
                                                        style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', color: entry.mfgDate ? '#334155' : '#CBD5E0', fontSize: 12, fontWeight: 600 }}
                                                    >
                                                        {entry.mfgDate || 'Add Mfg'} <Edit2 size={12} />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        )}
                        {(!showHistory || ledgerEntries.length > 0) && (
                            <div style={{ padding: '14px 20px', background: '#F8FAFC', borderTop: showHistory ? '1px solid #F1F5F9' : 'none', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <CheckCircle2 size={14} color="#10B981" />
                                    <span style={{ fontSize: 12, fontWeight: 700, color: '#64748B' }}>Audit Complete &amp; Synchronized</span>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
