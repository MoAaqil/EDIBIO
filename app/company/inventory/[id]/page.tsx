'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useStore, useCompanyData } from '@/lib/store';
import type { Product, Batch } from '@/lib/types';
import { ArrowLeft, ArrowDown, ArrowUp, Package, Plus, Trash2, X, AlertTriangle } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';

const TYPE_STYLES = {
    in:      { color: '#34A853', bg: '#DCFCE7', label: '▲ IN',     icon: <ArrowDown size={12} /> },
    out:     { color: '#EA4335', bg: '#FEE2E2', label: '▼ OUT',    icon: <ArrowUp size={12} /> },
    adjust:  { color: '#FBBC04', bg: '#FEF3C7', label: '⇅ ADJUST', icon: null },
    opening: { color: '#4285F4', bg: '#DBEAFE', label: '◎ OPEN',   icon: null },
};

export default function ProductDetailPage() {
    const router = useRouter();
    const params = useParams();
    const productId = params.id as string;

    const products = useCompanyData('products') as Product[];
    const product = products.find(p => p.id === productId);

    const { updateProduct } = useStore();

    const [tab, setTab] = useState<'history' | 'batches'>('history');
    const [showBatchModal, setShowBatchModal] = useState(false);
    const [batchForm, setBatchForm] = useState({ batchNo: '', mfgDate: '', expiryDate: '', qty: '', purchasePrice: '' });

    if (!product) {
        return (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                <Package size={48} style={{ color: '#E2E8F0', margin: '0 auto 16px' }} />
                <p style={{ fontSize: 16, color: '#A0AEC0', fontWeight: 700 }}>Product not found</p>
                <button onClick={() => router.back()} style={{ marginTop: 16, padding: '10px 24px', borderRadius: 10, border: 'none', background: '#1A1A2E', color: 'white', fontWeight: 700, cursor: 'pointer' }}>← Back</button>
            </div>
        );
    }

    const logs = (product.stockLogs || []).slice().sort((a, b) => b.date.localeCompare(a.date));
    const batches = product.batches || [];

    const today = new Date().toISOString().slice(0, 10);
    const expiredBatches = batches.filter(b => b.expiryDate && b.expiryDate < today);
    const soonBatches = batches.filter(b => b.expiryDate && b.expiryDate >= today && new Date(b.expiryDate) <= new Date(Date.now() + 30 * 86400000));

    const saveBatch = () => {
        if (!batchForm.batchNo) { toast.error('Batch number required'); return; }
        const batch: Batch = {
            id: Math.random().toString(36).slice(2) + Date.now().toString(36),
            batchNo: batchForm.batchNo,
            mfgDate: batchForm.mfgDate || undefined,
            expiryDate: batchForm.expiryDate || undefined,
            qty: parseFloat(batchForm.qty) || 0,
            purchasePrice: parseFloat(batchForm.purchasePrice) || product.purchasePrice,
            addedAt: new Date().toISOString(),
        };
        updateProduct(product.id, { batches: [batch, ...batches] });
        setBatchForm({ batchNo: '', mfgDate: '', expiryDate: '', qty: '', purchasePrice: '' });
        setShowBatchModal(false);
        toast.success('Batch added!');
    };

    const deleteBatch = (id: string) => {
        updateProduct(product.id, { batches: batches.filter(b => b.id !== id) });
        toast.success('Batch removed');
    };

    const daysUntil = (date: string) => Math.floor((new Date(date).getTime() - Date.now()) / 86400000);

    return (
        <div style={{ maxWidth: 900, margin: '0 auto', paddingBottom: 40 }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#718096', display: 'flex' }}>
                    <ArrowLeft size={20} />
                </button>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg,#FEF7E0,#FDE68A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 20, color: '#B45309', flexShrink: 0 }}>
                    {product.name[0]}
                </div>
                <div style={{ flex: 1 }}>
                    <h1 style={{ fontSize: 20, fontWeight: 900, color: '#1A1A2E', margin: 0 }}>{product.name}</h1>
                    <p style={{ fontSize: 12, color: '#718096', margin: '2px 0 0' }}>{product.category || '—'} · HSN {product.hsnCode || '—'}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 22, fontWeight: 900, color: product.stockQty <= product.lowStockAlertQty ? '#EA4335' : '#34A853', margin: 0 }}>{product.stockQty} {product.unit}</p>
                    <p style={{ fontSize: 11, color: '#718096', margin: 0 }}>in stock</p>
                </div>
            </div>

            {/* KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: 12, marginBottom: 20 }}>
                {[
                    { l: 'Purchase Price', v: `₹${product.purchasePrice}` },
                    { l: 'Selling Price', v: `₹${product.sellingPrice}`, bold: true },
                    { l: 'MRP', v: product.mrp ? `₹${product.mrp}` : '—' },
                    { l: 'GST Rate', v: `${product.gstRate}%` },
                    { l: 'Low Stock Alert', v: `< ${product.lowStockAlertQty}` },
                    { l: 'Batches', v: `${batches.length}`, warn: expiredBatches.length > 0 },
                ].map(card => (
                    <div key={card.l} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 14, padding: '14px 16px' }}>
                        <p style={{ fontSize: 10, fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', marginBottom: 4 }}>{card.l}</p>
                        <p style={{ fontSize: 16, fontWeight: 900, color: card.warn ? '#EA4335' : '#1A1A2E' }}>{card.v}</p>
                    </div>
                ))}
            </div>

            {/* Expiry alerts */}
            {expiredBatches.length > 0 && (
                <div style={{ background: '#FEE2E2', border: '1.5px solid #FCA5A5', borderRadius: 12, padding: '12px 18px', marginBottom: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
                    <AlertTriangle size={16} color="#DC2626" />
                    <p style={{ fontWeight: 700, fontSize: 13, color: '#DC2626' }}>{expiredBatches.length} batch(es) expired — check your inventory!</p>
                </div>
            )}
            {soonBatches.length > 0 && (
                <div style={{ background: '#FEF3C7', border: '1.5px solid #FDE68A', borderRadius: 12, padding: '12px 18px', marginBottom: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
                    <AlertTriangle size={16} color="#D97706" />
                    <p style={{ fontWeight: 700, fontSize: 13, color: '#D97706' }}>{soonBatches.length} batch(es) expiring within 30 days</p>
                </div>
            )}

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                {(['history', 'batches'] as const).map(t => (
                    <button key={t} onClick={() => setTab(t)} style={{ padding: '8px 20px', borderRadius: 10, border: '1.5px solid', borderColor: tab === t ? '#4285F4' : '#E2E8F0', background: tab === t ? '#4285F4' : 'white', color: tab === t ? 'white' : '#4A5568', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                        {t === 'history' ? `📋 Stock History (${logs.length})` : `📦 Batches (${batches.length})`}
                    </button>
                ))}
            </div>

            {/* Stock History Tab */}
            {tab === 'history' && (
                <div style={{ background: 'white', borderRadius: 16, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                    {logs.length === 0 ? (
                        <div style={{ padding: '60px 20px', textAlign: 'center', color: '#A0AEC0' }}>
                            <Package size={40} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
                            <p style={{ fontWeight: 700 }}>No movement recorded yet</p>
                            <p style={{ fontSize: 12 }}>Stock movements will appear here automatically when you create sale/purchase bills.</p>
                        </div>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                                <thead>
                                    <tr style={{ background: '#F8FAFC' }}>
                                        {['Date', 'Type', 'Qty', 'Reason', 'Party', 'Balance After'].map(h => (
                                            <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', borderBottom: '1px solid #E2E8F0' }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.map(log => {
                                        const s = TYPE_STYLES[log.type] || TYPE_STYLES.adjust;
                                        return (
                                            <tr key={log.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                                                <td style={{ padding: '10px 16px', color: '#718096' }}>{formatDate(log.date)}{log.time && ` ${log.time}`}</td>
                                                <td style={{ padding: '10px 16px' }}>
                                                    <span style={{ padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 800, background: s.bg, color: s.color }}>{s.label}</span>
                                                </td>
                                                <td style={{ padding: '10px 16px', fontWeight: 900, color: log.type === 'out' ? '#EA4335' : '#34A853' }}>
                                                    {log.type === 'out' ? '−' : '+'}{log.qty} {product.unit}
                                                </td>
                                                <td style={{ padding: '10px 16px', color: '#334155' }}>{log.reason}</td>
                                                <td style={{ padding: '10px 16px', color: '#718096' }}>{log.partyName || '—'}</td>
                                                <td style={{ padding: '10px 16px', fontWeight: 800 }}>{log.balanceAfter} {product.unit}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {/* Batches Tab */}
            {tab === 'batches' && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
                        <button onClick={() => setShowBatchModal(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 20px', borderRadius: 10, border: 'none', background: '#1A1A2E', color: 'white', fontWeight: 800, fontSize: 13, cursor: 'pointer' }}>
                            <Plus size={14} /> Add Batch
                        </button>
                    </div>
                    {batches.length === 0 ? (
                        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #E2E8F0', padding: '60px 20px', textAlign: 'center', color: '#A0AEC0' }}>
                            <p style={{ fontWeight: 700 }}>No batches added yet</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {batches.map(b => {
                                const isExpired = b.expiryDate && b.expiryDate < today;
                                const isSoon = b.expiryDate && !isExpired && daysUntil(b.expiryDate) <= 30;
                                return (
                                    <div key={b.id} style={{ background: 'white', border: `1.5px solid ${isExpired ? '#FCA5A5' : isSoon ? '#FDE68A' : '#E2E8F0'}`, borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4 }}>
                                                <p style={{ fontWeight: 900, fontSize: 15, color: '#1A1A2E' }}>{b.batchNo}</p>
                                                {isExpired && <span style={{ padding: '2px 8px', borderRadius: 6, background: '#FEE2E2', color: '#DC2626', fontSize: 10, fontWeight: 800 }}>EXPIRED</span>}
                                                {isSoon && <span style={{ padding: '2px 8px', borderRadius: 6, background: '#FEF3C7', color: '#D97706', fontSize: 10, fontWeight: 800 }}>EXPIRING SOON ({daysUntil(b.expiryDate!)}d)</span>}
                                            </div>
                                            <div style={{ display: 'flex', gap: 20, fontSize: 12, color: '#718096' }}>
                                                <span><strong>Qty:</strong> {b.qty} {product.unit}</span>
                                                <span><strong>Purchase:</strong> ₹{b.purchasePrice}</span>
                                                {b.mfgDate && <span><strong>Mfg:</strong> {formatDate(b.mfgDate)}</span>}
                                                {b.expiryDate && <span><strong>Exp:</strong> {formatDate(b.expiryDate)}</span>}
                                            </div>
                                        </div>
                                        <button onClick={() => deleteBatch(b.id)} style={{ color: '#EA4335', background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 8, display: 'flex' }}>
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* Batch Modal */}
            {showBatchModal && (
                <div className="modal-overlay" onClick={() => setShowBatchModal(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 440 }}>
                        <div style={{ padding: '18px 24px 14px', borderBottom: '1px solid #E1E4E8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontWeight: 900, fontSize: 17 }}>Add Batch</h3>
                            <button onClick={() => setShowBatchModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#718096' }}><X size={18} /></button>
                        </div>
                        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                            {[
                                { label: 'Batch No *', key: 'batchNo', type: 'text', placeholder: 'e.g. B2024-001' },
                                { label: 'Qty', key: 'qty', type: 'number', placeholder: '0' },
                                { label: 'Purchase Price ₹', key: 'purchasePrice', type: 'number', placeholder: String(product.purchasePrice) },
                                { label: 'Mfg Date', key: 'mfgDate', type: 'date', placeholder: '' },
                                { label: 'Expiry Date', key: 'expiryDate', type: 'date', placeholder: '' },
                            ].map(f => (
                                <div key={f.key}>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase' }}>{f.label}</label>
                                    <input className="e-input" type={f.type} placeholder={f.placeholder}
                                        value={(batchForm as any)[f.key]}
                                        onChange={e => setBatchForm(p => ({ ...p, [f.key]: e.target.value }))} />
                                </div>
                            ))}
                            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                                <button onClick={() => setShowBatchModal(false)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                                <button onClick={saveBatch} className="btn btn-blue" style={{ flex: 1 }}>Save Batch</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
