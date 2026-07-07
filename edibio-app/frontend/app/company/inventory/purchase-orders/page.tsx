'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore, useCompanyData, useActiveCompany } from '@/lib/store';
import type { PurchaseOrder, PurchaseOrderItem, POStatus } from '@/lib/types';
import { ArrowLeft, Plus, Trash2, X, FileText, ChevronRight, CheckCircle, Send, Package } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';
import Link from 'next/link';

const STATUS_STYLES: Record<POStatus, { label: string; color: string; bg: string }> = {
    draft:     { label: '📝 Draft',     color: '#4A5568', bg: '#F1F5F9' },
    sent:      { label: '📤 Sent',      color: '#4285F4', bg: '#DBEAFE' },
    received:  { label: '✅ Received',  color: '#34A853', bg: '#DCFCE7' },
    cancelled: { label: '❌ Cancelled', color: '#EA4335', bg: '#FEE2E2' },
};

const emptyItem = (): PurchaseOrderItem => ({ name: '', qty: 1, unit: 'pcs', rate: 0, amount: 0 });

export default function PurchaseOrdersPage() {
    const router = useRouter();
    const company = useActiveCompany();
    const { activeCompanyId } = useStore();
    const { addPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder, addInvoice, nextInvoiceNumber, adjustStock } = useStore();
    const purchaseOrders = useCompanyData('purchaseOrders') as PurchaseOrder[];
    const parties = useCompanyData('parties') as any[];

    const suppliers = parties.filter(p => p.type === 'supplier' || p.type === 'both');

    const [showForm, setShowForm] = useState(false);
    const [editPO, setEditPO] = useState<PurchaseOrder | null>(null);
    const [filterStatus, setFilterStatus] = useState<POStatus | 'all'>('all');

    const emptyForm = {
        supplierId: '', supplierName: '', supplierPhone: '',
        date: new Date().toISOString().slice(0, 10),
        expectedDate: '', notes: '', status: 'draft' as POStatus,
        items: [emptyItem()],
    };
    const [form, setForm] = useState(emptyForm);

    const filtered = purchaseOrders.filter(po => filterStatus === 'all' || po.status === filterStatus);

    const grandTotal = form.items.reduce((a, i) => a + i.qty * i.rate, 0);

    const up = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));
    const upItem = (i: number, k: string, v: any) => {
        const items = [...form.items];
        items[i] = { ...items[i], [k]: v };
        items[i].amount = items[i].qty * items[i].rate;
        setForm(f => ({ ...f, items }));
    };

    const openCreate = () => { setEditPO(null); setForm(emptyForm); setShowForm(true); };
    const openEdit = (po: PurchaseOrder) => {
        setEditPO(po);
        setForm({ supplierId: po.supplierId || '', supplierName: po.supplierName, supplierPhone: po.supplierPhone || '', date: po.date, expectedDate: po.expectedDate || '', notes: po.notes || '', status: po.status, items: po.items });
        setShowForm(true);
    };

    const handleSave = () => {
        if (!form.supplierName) { toast.error('Supplier name required'); return; }
        if (form.items.length === 0 || !form.items[0].name) { toast.error('Add at least one item'); return; }
        const poNumber = editPO?.poNumber || `PO-${String(purchaseOrders.length + 1).padStart(4, '0')}`;
        const items = form.items.map(i => ({ ...i, amount: i.qty * i.rate }));
        const total = items.reduce((a, i) => a + i.amount, 0);
        if (editPO) {
            updatePurchaseOrder(editPO.id, { ...form, items, grandTotal: total, poNumber });
            toast.success('Purchase Order updated!');
        } else {
            addPurchaseOrder({ companyId: activeCompanyId!, ...form, items, grandTotal: total, poNumber });
            toast.success('Purchase Order created!');
        }
        setShowForm(false);
    };

    const handleConvert = async (po: PurchaseOrder) => {
        if (po.convertedInvoiceId) { toast('Already converted to invoice'); return; }
        const invNo = nextInvoiceNumber(activeCompanyId!, 'PO');
        const now = new Date().toISOString();
        const inv = {
            id: Math.random().toString(36).slice(2) + Date.now().toString(36),
            companyId: activeCompanyId!,
            invoiceType: 'purchase' as any,
            invoiceNumber: invNo,
            date: new Date().toISOString().slice(0, 10),
            time: new Date().toTimeString().slice(0, 5),
            partyId: po.supplierId,
            partyName: po.supplierName,
            partyPhone: po.supplierPhone,
            items: po.items.map(i => ({
                productId: i.productId,
                name: i.name,
                hsnCode: i.hsnCode,
                qty: i.qty,
                unit: i.unit,
                rate: i.rate,
                discount: 0, discountAmt: 0,
                taxableAmt: i.amount, totalGst: 0,
                cgst: 0, sgst: 0, igst: 0, cess: 0,
                amount: i.amount,
                gstRate: 0 as any,
            })),
            subTotal: po.grandTotal, totalDiscount: 0, taxableAmount: po.grandTotal,
            totalCgst: 0, totalSgst: 0, totalIgst: 0, totalCess: 0, totalGst: 0,
            shippingCharges: 0, packingCharges: 0, adjustmentAmount: 0, roundOff: 0,
            grandTotal: po.grandTotal,
            paymentStatus: 'unpaid' as any,
            amountPaid: 0, balanceDue: po.grandTotal,
            payments: [], paymentMethod: 'credit' as any,
            isGstBill: false, isHidden: false, isPrivate: false,
            notes: `Converted from PO ${po.poNumber}`,
            createdAt: now, updatedAt: now,
        };
        // Adjust stock of products (skip log as addInvoice will generate the clear Purchase - invoice log)
        inv.items.forEach(item => {
            if (item.productId) {
                adjustStock(item.productId, item.qty, 'skip');
            }
        });
        addInvoice(inv);
        updatePurchaseOrder(po.id, { status: 'received', convertedInvoiceId: inv.id });
        toast.success(`✅ Converted to Purchase Invoice ${invNo}`);
    };

    const handleDelete = (id: string) => {
        if (!confirm('Delete this Purchase Order?')) return;
        deletePurchaseOrder(id);
        toast.success('Purchase Order deleted');
    };

    return (
        <div style={{ maxWidth: 980, margin: '0 auto', paddingBottom: 40 }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#718096', display: 'flex' }}><ArrowLeft size={20} /></button>
                <div style={{ flex: 1 }}>
                    <h1 style={{ fontSize: 22, fontWeight: 900, color: '#1A1A2E', margin: 0 }}>Purchase Orders</h1>
                    <p style={{ fontSize: 12, color: '#718096', margin: '2px 0 0' }}>Create POs for suppliers before stock arrives · convert to invoices instantly</p>
                </div>
                <button onClick={openCreate} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 12, border: 'none', background: '#1A1A2E', color: 'white', fontWeight: 800, fontSize: 13, cursor: 'pointer' }}>
                    <Plus size={14} /> New PO
                </button>
            </div>

            {/* Summary strip */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: 12, marginBottom: 20 }}>
                {(['all', 'draft', 'sent', 'received', 'cancelled'] as const).map(s => {
                    const count = s === 'all' ? purchaseOrders.length : purchaseOrders.filter(p => p.status === s).length;
                    const style = s === 'all' ? { color: '#1A1A2E', bg: '#F1F5F9' } : STATUS_STYLES[s as POStatus];
                    return (
                        <button key={s} onClick={() => setFilterStatus(s)} style={{ padding: '12px 14px', borderRadius: 12, border: '2px solid', borderColor: filterStatus === s ? (style.color) : '#E2E8F0', background: filterStatus === s ? style.bg : 'white', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}>
                            <p style={{ fontSize: 18, fontWeight: 900, color: style.color, margin: 0 }}>{count}</p>
                            <p style={{ fontSize: 11, fontWeight: 700, color: '#64748B', margin: '2px 0 0', textTransform: 'capitalize' }}>{s}</p>
                        </button>
                    );
                })}
            </div>

            {/* PO List */}
            <div style={{ background: 'white', borderRadius: 16, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                {filtered.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 20px', color: '#A0AEC0' }}>
                        <FileText size={44} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
                        <p style={{ fontWeight: 700, fontSize: 15 }}>No purchase orders yet</p>
                        <button onClick={openCreate} style={{ marginTop: 14, padding: '10px 24px', borderRadius: 10, border: 'none', background: '#1A1A2E', color: 'white', fontWeight: 700, cursor: 'pointer' }}>Create your first PO</button>
                    </div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead>
                            <tr style={{ background: '#F8FAFC' }}>
                                {['PO No', 'Supplier', 'Date', 'Expected', 'Items', 'Total', 'Status', 'Actions'].map(h => (
                                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', borderBottom: '1px solid #E2E8F0' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(po => {
                                const s = STATUS_STYLES[po.status];
                                return (
                                    <tr key={po.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                                        <td style={{ padding: '12px 16px', fontWeight: 800, color: '#4285F4', fontFamily: 'monospace' }}>{po.poNumber}</td>
                                        <td style={{ padding: '12px 16px', fontWeight: 600 }}>{po.supplierName}</td>
                                        <td style={{ padding: '12px 16px', color: '#718096', fontSize: 12 }}>{formatDate(po.date)}</td>
                                        <td style={{ padding: '12px 16px', color: '#718096', fontSize: 12 }}>{po.expectedDate ? formatDate(po.expectedDate) : '—'}</td>
                                        <td style={{ padding: '12px 16px', color: '#718096' }}>{po.items.length} items</td>
                                        <td style={{ padding: '12px 16px', fontWeight: 900 }}>₹{po.grandTotal.toLocaleString('en-IN')}</td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <span style={{ padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 800, background: s.bg, color: s.color }}>{s.label}</span>
                                        </td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                                                <button onClick={() => openEdit(po)} style={{ padding: '5px 10px', borderRadius: 7, border: '1px solid #E2E8F0', background: 'white', cursor: 'pointer', fontSize: 11, fontWeight: 700, color: '#4A5568' }}>Edit</button>
                                                {po.status !== 'received' && !po.convertedInvoiceId && (
                                                    <button onClick={() => handleConvert(po)} style={{ padding: '5px 10px', borderRadius: 7, border: 'none', background: '#DCFCE7', cursor: 'pointer', fontSize: 11, fontWeight: 800, color: '#166534' }}>→ Invoice</button>
                                                )}
                                                {po.convertedInvoiceId && <span style={{ fontSize: 11, color: '#34A853', fontWeight: 700 }}>✓ Invoiced</span>}
                                                <button onClick={() => handleDelete(po.id)} style={{ padding: '5px 8px', borderRadius: 7, border: 'none', background: '#FEE2E2', cursor: 'pointer', color: '#DC2626', display: 'flex', alignItems: 'center' }}>
                                                    <Trash2 size={12} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Create/Edit Modal */}
            {showForm && (
                <div className="modal-overlay" onClick={() => setShowForm(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 640, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '18px 24px 14px', borderBottom: '1px solid #E1E4E8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                            <h3 style={{ fontWeight: 900, fontSize: 17 }}>{editPO ? 'Edit Purchase Order' : 'New Purchase Order'}</h3>
                            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#718096' }}><X size={18} /></button>
                        </div>
                        <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {/* Supplier */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <div style={{ gridColumn: '1/-1' }}>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase' }}>Supplier *</label>
                                    {suppliers.length > 0 ? (
                                        <select className="e-select" value={form.supplierId} onChange={e => {
                                            const s = suppliers.find(p => p.id === e.target.value);
                                            setForm(f => ({ ...f, supplierId: e.target.value, supplierName: s?.name || '', supplierPhone: s?.phone || '' }));
                                        }}>
                                            <option value="">-- Select Supplier --</option>
                                            {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                        </select>
                                    ) : (
                                        <input className="e-input" placeholder="Supplier name" value={form.supplierName} onChange={e => up('supplierName', e.target.value)} />
                                    )}
                                    {form.supplierId && <input className="e-input" style={{ marginTop: 6 }} placeholder="Supplier name override" value={form.supplierName} onChange={e => up('supplierName', e.target.value)} />}
                                </div>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase' }}>PO Date</label>
                                    <input type="date" className="e-input" value={form.date} onChange={e => up('date', e.target.value)} />
                                </div>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase' }}>Expected Delivery</label>
                                    <input type="date" className="e-input" value={form.expectedDate} onChange={e => up('expectedDate', e.target.value)} />
                                </div>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase' }}>Status</label>
                                    <select className="e-select" value={form.status} onChange={e => up('status', e.target.value)}>
                                        {Object.keys(STATUS_STYLES).map(s => <option key={s} value={s}>{STATUS_STYLES[s as POStatus].label}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase' }}>Notes</label>
                                    <input className="e-input" placeholder="Optional notes" value={form.notes} onChange={e => up('notes', e.target.value)} />
                                </div>
                            </div>

                            {/* Items */}
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                    <p style={{ fontSize: 12, fontWeight: 800, color: '#4A5568', textTransform: 'uppercase' }}>Items</p>
                                    <button onClick={() => setForm(f => ({ ...f, items: [...f.items, emptyItem()] }))} style={{ padding: '5px 12px', borderRadius: 8, border: '1.5px dashed #CBD5E0', background: 'white', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: '#4A5568' }}>
                                        + Add Row
                                    </button>
                                </div>
                                <div style={{ border: '1px solid #E2E8F0', borderRadius: 10, overflow: 'hidden' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                                        <thead>
                                            <tr style={{ background: '#F8FAFC' }}>
                                                {['Item Name', 'Qty', 'Unit', 'Rate ₹', 'Amount', ''].map(h => (
                                                    <th key={h} style={{ padding: '8px 10px', textAlign: 'left', fontSize: 10, fontWeight: 800, color: '#64748B', borderBottom: '1px solid #E2E8F0' }}>{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {form.items.map((item, i) => (
                                                <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                                                    <td style={{ padding: '6px 8px' }}><input className="e-input" style={{ padding: '5px 8px', fontSize: 12 }} placeholder="Item name" value={item.name} onChange={e => upItem(i, 'name', e.target.value)} /></td>
                                                    <td style={{ padding: '6px 8px', width: 70 }}><input type="number" className="e-input" style={{ padding: '5px 8px', fontSize: 12 }} value={item.qty} onChange={e => upItem(i, 'qty', parseFloat(e.target.value) || 0)} /></td>
                                                    <td style={{ padding: '6px 8px', width: 70 }}><input className="e-input" style={{ padding: '5px 8px', fontSize: 12 }} value={item.unit} onChange={e => upItem(i, 'unit', e.target.value)} /></td>
                                                    <td style={{ padding: '6px 8px', width: 90 }}><input type="number" className="e-input" style={{ padding: '5px 8px', fontSize: 12 }} value={item.rate} onChange={e => upItem(i, 'rate', parseFloat(e.target.value) || 0)} /></td>
                                                    <td style={{ padding: '6px 10px', fontWeight: 800, whiteSpace: 'nowrap' }}>₹{(item.qty * item.rate).toLocaleString('en-IN')}</td>
                                                    <td style={{ padding: '6px 8px' }}>
                                                        {form.items.length > 1 && <button onClick={() => setForm(f => ({ ...f, items: f.items.filter((_, j) => j !== i) }))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EA4335', display: 'flex', padding: 2 }}><X size={13} /></button>}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div style={{ textAlign: 'right', marginTop: 8, fontWeight: 900, fontSize: 16, color: '#1A1A2E' }}>
                                    Total: ₹{grandTotal.toLocaleString('en-IN')}
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: '14px 24px', borderTop: '1px solid #E1E4E8', display: 'flex', gap: 10, justifyContent: 'flex-end', flexShrink: 0 }}>
                            <button onClick={() => setShowForm(false)} className="btn btn-outline">Cancel</button>
                            <button onClick={handleSave} className="btn btn-blue">{editPO ? 'Update PO' : 'Create PO'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
