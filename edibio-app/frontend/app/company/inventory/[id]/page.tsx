'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useStore, useCompanyData, useActiveCompany } from '@/lib/store';
import type { Product, Batch } from '@/lib/types';
import { ArrowLeft, ArrowDown, ArrowUp, Package, Plus, Trash2, X, AlertTriangle, QrCode } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';
import QrLabelModal from '@/components/QrLabelModal';

const TYPE_STYLES = {
    in:      { color: '#16A34A', bg: '#DCFCE7', label: 'STOCK IN',  icon: <ArrowUp size={11} style={{ marginRight: 4 }} />, rowBg: 'rgba(22, 163, 74, 0.02)' },
    out:     { color: '#DC2626', bg: '#FEE2E2', label: 'STOCK OUT', icon: <ArrowDown size={11} style={{ marginRight: 4 }} />, rowBg: 'rgba(220, 38, 38, 0.02)' },
    adjust:  { color: '#D97706', bg: '#FEF3C7', label: 'ADJUSTED',  icon: null, rowBg: 'rgba(217, 119, 6, 0.02)' },
    opening: { color: '#2563EB', bg: '#DBEAFE', label: 'OPENING',   icon: null, rowBg: 'rgba(37, 99, 235, 0.02)' },
};

export default function ProductDetailPage() {
    const router = useRouter();
    const params = useParams();
    const productId = params.id as string;

    const products = useCompanyData('products') as Product[];
    const product = products.find(p => p.id === productId);
    const company = useActiveCompany();

    const { updateProduct } = useStore();

    useEffect(() => {
        if (!product || !product.batches || product.batches.length === 0) return;
        const batchSum = product.batches.reduce((sum, b) => sum + b.qty, 0);
        if (product.stockQty !== batchSum) {
            const log = {
                id: 'log_' + Date.now().toString(36),
                date: new Date().toISOString().slice(0, 10),
                time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false }),
                type: 'adjust' as const,
                qty: batchSum - product.stockQty,
                reason: 'Auto-reconciled stock with batch sum',
                balanceAfter: batchSum,
            };
            updateProduct(product.id, {
                stockQty: batchSum,
                batches: product.batches,
                stockLogs: [log, ...(product.stockLogs || [])]
            });
            toast.success('Product stock auto-reconciled with batch quantities!');
        }
    }, [product?.id, product?.batches, product?.stockQty]);

    const [tab, setTab] = useState<'history' | 'batches'>('history');
    const [showBatchModal, setShowBatchModal] = useState(false);
    const [showQrModal, setShowQrModal] = useState(false);
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

    const siblingProducts = products.filter(p => p.name.trim().toLowerCase() === product.name.trim().toLowerCase());
    const combinedStockQty = siblingProducts.reduce((sum, p) => sum + p.stockQty, 0);

    const stockByGodown = siblingProducts.map(p => {
        const gId = p.godownId || company?.godowns?.[0]?.id;
        const gName = company?.godowns?.find(g => g.id === gId)?.name || '—';
        return { godownName: gName, qty: p.stockQty, unit: p.unit };
    });

    const logs = siblingProducts.flatMap(p => {
        const gId = p.godownId || company?.godowns?.[0]?.id;
        const gName = company?.godowns?.find(g => g.id === gId)?.name || '—';
        return (p.stockLogs || []).map(log => ({
            ...log,
            godownName: gName
        }));
    }).sort((a, b) => b.date.localeCompare(a.date) || (b.time || '').localeCompare(a.time || ''));

    const batches = siblingProducts.flatMap(p => {
        const gId = p.godownId || company?.godowns?.[0]?.id;
        const gName = company?.godowns?.find(g => g.id === gId)?.name || '—';
        return (p.batches || []).map(b => ({
            ...b,
            godownName: gName
        }));
    });

    const today = new Date().toISOString().slice(0, 10);
    const expiredBatches = batches.filter(b => b.expiryDate && b.expiryDate < today);
    const soonBatches = batches.filter(b => b.expiryDate && b.expiryDate >= today && new Date(b.expiryDate) <= new Date(Date.now() + 30 * 86400000));

    const saveBatch = () => {
        if (!batchForm.batchNo) { toast.error('Batch number required'); return; }
        const batchQty = parseFloat(batchForm.qty) || 0;
        const batch: Batch = {
            id: Math.random().toString(36).slice(2) + Date.now().toString(36),
            batchNo: batchForm.batchNo,
            mfgDate: batchForm.mfgDate || undefined,
            expiryDate: batchForm.expiryDate || undefined,
            qty: batchQty,
            purchasePrice: parseFloat(batchForm.purchasePrice) || product.purchasePrice,
            addedAt: new Date().toISOString(),
        };
        const newBatches = [batch, ...(product.batches || [])];
        const newStockQty = newBatches.reduce((a, b) => a + b.qty, 0);

        const log = {
            id: 'log_' + Date.now().toString(36),
            date: new Date().toISOString().slice(0, 10),
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false }),
            type: 'adjust' as const,
            qty: batchQty,
            reason: `Batch ${batch.batchNo} added`,
            balanceAfter: newStockQty,
        };

        updateProduct(product.id, { 
            batches: newBatches,
            stockLogs: [log, ...(product.stockLogs || [])]
        });
        setBatchForm({ batchNo: '', mfgDate: '', expiryDate: '', qty: '', purchasePrice: '' });
        setShowBatchModal(false);
        toast.success('Batch added!');
    };

    const deleteBatch = (id: string) => {
        const targetBatch = (product.batches || []).find(b => b.id === id);
        if (!targetBatch) return;

        const newBatches = (product.batches || []).filter(b => b.id !== id);
        const newStockQty = newBatches.reduce((a, b) => a + b.qty, 0);

        const log = {
            id: 'log_' + Date.now().toString(36),
            date: new Date().toISOString().slice(0, 10),
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false }),
            type: 'adjust' as const,
            qty: -targetBatch.qty,
            reason: `Batch ${targetBatch.batchNo} deleted`,
            balanceAfter: newStockQty,
        };

        updateProduct(product.id, { 
            batches: newBatches,
            stockLogs: [log, ...(product.stockLogs || [])]
        });
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <button 
                        onClick={() => setShowQrModal(true)} 
                        className="btn" 
                        style={{ 
                            gap: 8, 
                            background: 'linear-gradient(135deg, #7C3AED, #4285F4)', 
                            border: 'none', 
                            color: 'white',
                            padding: '10px 16px', 
                            borderRadius: 12, 
                            fontWeight: 800, 
                            fontSize: 13, 
                            display: 'flex', 
                            alignItems: 'center',
                            boxShadow: '0 4px 12px rgba(124, 58, 237, 0.15)',
                            cursor: 'pointer'
                        }}
                    >
                        <QrCode size={16} />
                        Print QR Sticker
                    </button>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: 22, fontWeight: 900, color: combinedStockQty <= product.lowStockAlertQty ? '#EA4335' : '#34A853', margin: 0 }}>{combinedStockQty} {product.unit}</p>
                        <p style={{ fontSize: 11, color: '#718096', margin: 0 }}>total stock</p>
                        <p style={{ fontSize: 10, color: '#94A3B8', margin: '4px 0 0', fontFamily: 'monospace' }}>ID: {product.id}</p>
                    </div>
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

            {/* Stock Breakdown by Godown */}
            <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 16, padding: '18px 20px', marginBottom: 20 }}>
                <h3 style={{ fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: 12, letterSpacing: '0.05em' }}>📍 Stock Breakdown by Godown</h3>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    {stockByGodown.map((sg, idx) => (
                        <div key={idx} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '10px 14px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: sg.qty > 0 ? '#34A853' : '#EA4335' }} />
                            <div>
                                <span style={{ fontWeight: 800, color: '#4A5568', fontSize: 12 }}>{sg.godownName}: </span>
                                <span style={{ fontWeight: 900, color: '#1A1E3B', fontSize: 13 }}>{sg.qty} {sg.unit}</span>
                            </div>
                        </div>
                    ))}
                </div>
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
                                        {['Date', 'Type', 'Godown', 'Qty', 'Reason', 'Party', 'Balance After'].map(h => (
                                            <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', borderBottom: '1px solid #E2E8F0' }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.map(log => {
                                        const s = TYPE_STYLES[log.type] || TYPE_STYLES.adjust;
                                        return (
                                            <tr key={log.id} style={{ borderBottom: '1px solid #F1F5F9', background: s.rowBg }}>
                                                <td style={{ padding: '10px 16px', color: '#718096' }}>{formatDate(log.date)}{log.time && ` ${log.time}`}</td>
                                                <td style={{ padding: '10px 16px' }}>
                                                    <span style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        padding: '4px 10px',
                                                        borderRadius: 6,
                                                        fontSize: 11,
                                                        fontWeight: 800,
                                                        background: s.bg,
                                                        color: s.color
                                                    }}>
                                                        {s.icon}
                                                        {s.label}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '10px 16px', fontWeight: 700, color: '#475569' }}>
                                                    {log.godownName || '—'}
                                                </td>
                                                <td style={{ padding: '10px 16px', fontWeight: 900, color: log.type === 'out' ? '#DC2626' : '#16A34A' }}>
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
                                                <span style={{ fontSize: 10, color: '#718096', background: '#F1F5F9', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>📍 {b.godownName}</span>
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
            {showQrModal && (
                <QrLabelModal
                    product={product}
                    company={company}
                    onClose={() => setShowQrModal(false)}
                />
            )}
        </div>
    );
}
