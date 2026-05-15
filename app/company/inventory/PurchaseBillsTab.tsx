'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useStore, useCompanyData, useActiveCompany } from '@/lib/store';
import { Plus, Search, Package, Trash2, Edit2, AlertTriangle, FileText, Upload, Calendar, Building2, ChevronDown, X, Repeat, ScanLine, Loader2, ImagePlus } from 'lucide-react';
import { r2 } from '@/lib/utils';
import toast from 'react-hot-toast';
import { confirm } from '@/components/ConfirmDialog';
import AIAddItemModal from '@/components/AIAddItemModal';
import { canAccess } from '@/components/FeatureGate';

export default function PurchaseBillsTab() {
    const { activeCompanyId, addInvoice, updateProduct, addProduct, nextInvoiceNumber, user, isDemo } = useStore();
    const companyId = activeCompanyId;
    const company = useActiveCompany();
    const allInvoices = useCompanyData('invoices') as any[];
    const products = useCompanyData('products') as any[];
    const parties = useCompanyData('parties') as any[];

    // Only show purchase invoices
    const purchaseBills = allInvoices.filter(i => i.invoiceType === 'purchase');

    const [search, setSearch] = useState('');
    const [showAdd, setShowAdd] = useState(false);
    const [showAIScan, setShowAIScan] = useState(false);

    // Add Form State
    const [supplierId, setSupplierId] = useState('');
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [supplierInvoiceNo, setSupplierInvoiceNo] = useState('');

    // Recurring State
    const [recurringModalOpen, setRecurringModalOpen] = useState(false);

    const emptyRow = { productId: '', name: '', qty: 1, purchasePrice: 0, amount: 0 };
    const [items, setItems] = useState<any[]>([{ ...emptyRow }]);

    const filtered = purchaseBills.filter(b =>
        (b.partyName || '').toLowerCase().includes(search.toLowerCase()) ||
        (b.invoiceNumber || '').toLowerCase().includes(search.toLowerCase())
    );

    const suppliers = parties.filter(p => p.type === 'supplier' || p.type === 'both');

    const updateItem = (idx: number, k: string, v: any) => {
        setItems(prev => prev.map((it, i) => {
            if (i !== idx) return it;
            const up = { ...it, [k]: v };

            // Auto complete if product selected
            if (k === 'productId' && v) {
                const p = products.find(prod => prod.id === v);
                if (p) {
                    up.name = p.name;
                    up.purchasePrice = p.purchasePrice || 0;
                }
            }
            // Auto calc amount
            const q = parseFloat(up.qty) || 0;
            const r = parseFloat(up.purchasePrice) || 0;
            up.amount = q * r;

            return up;
        }));
    };

    const addRow = () => setItems(prev => [...prev, { ...emptyRow }]);
    const removeRow = (idx: number) => items.length > 1 && setItems(prev => prev.filter((_, i) => i !== idx));

    const totalAmount = items.reduce((a, b) => a + (parseFloat(b.amount) || 0), 0);

    const handleSave = () => {
        const validItems = items.filter(i => i.name && i.qty > 0);
        if (validItems.length === 0) { toast.error('Add at least one complete row'); return; }

        let sName = 'Walk-in Supplier';
        if (supplierId) {
            const s = parties.find(p => p.id === supplierId);
            if (s) sName = s.name;
        }

        const invNo = supplierInvoiceNo || nextInvoiceNumber(companyId!, 'PUR');

        const newBill = {
            id: 'pur_' + Date.now().toString(36),
            companyId: companyId!,
            invoiceType: 'purchase',
            invoiceNumber: invNo,
            date,
            partyId: supplierId,
            partyName: sName,
            items: validItems.map(vi => ({
                ...vi,
                rate: vi.purchasePrice,
                taxableAmt: vi.amount,
                amount: vi.amount
            })),
            subTotal: totalAmount,
            taxableAmount: totalAmount,
            totalGst: 0,
            grandTotal: totalAmount,
            paymentStatus: 'paid',
            amountPaid: totalAmount,
            balanceDue: 0,
            paymentMethod: 'cash',
            isGstBill: false,
            isHidden: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        // Increase Stock & Update Purchase Price
        // For items WITH a productId → update existing product
        // For items WITHOUT productId but with a name → find by name OR auto-create new product
        const updatedItems = validItems.map(vi => {
            let resolvedProductId = vi.productId;

            if (vi.productId) {
                // Existing linked product — just update stock & price
                const prod = products.find((p: any) => p.id === vi.productId);
                if (prod) {
                    updateProduct(prod.id, {
                        stockQty: prod.stockQty + parseFloat(vi.qty),
                        purchasePrice: parseFloat(vi.purchasePrice)
                    });
                }
            } else if (vi.name && vi.name.trim()) {
                // No product linked — check if a product with this name already exists
                const existing = products.find((p: any) =>
                    p.name.toLowerCase().trim() === vi.name.toLowerCase().trim() &&
                    p.companyId === companyId
                );
                if (existing) {
                    // Found by name — update its stock
                    updateProduct(existing.id, {
                        stockQty: existing.stockQty + parseFloat(vi.qty),
                        purchasePrice: parseFloat(vi.purchasePrice)
                    });
                    resolvedProductId = existing.id;
                } else {
                    // Auto-create a new product in inventory
                    const newProd = addProduct({
                        companyId: companyId!,
                        name: vi.name.trim(),
                        category: 'AI Scanned',
                        unit: 'pcs',
                        purchasePrice: parseFloat(vi.purchasePrice) || 0,
                        sellingPrice: parseFloat(vi.purchasePrice) || 0,
                        stockQty: parseFloat(vi.qty) || 1,
                        lowStockAlertQty: 5,
                        gstRate: 0,
                        hsnCode: '',
                        barcode: '',
                        description: '',
                        imageUrl: '',
                        taxIncluded: false,
                    });
                    resolvedProductId = newProd.id;
                }
            }
            return { ...vi, productId: resolvedProductId };
        });

        addInvoice(newBill as any);
        setShowAdd(false);
        setSupplierId('');
        setSupplierInvoiceNo('');
    };

    const handleDuplicate = (bill: any) => {
        setSupplierId(bill.partyId || '');
        setSupplierInvoiceNo('');
        setDate(new Date().toISOString().slice(0, 10));
        setItems(bill.items.map((i: any) => ({
            productId: i.productId || '',
            name: i.name,
            qty: i.qty,
            purchasePrice: i.rate || i.purchasePrice,
            amount: i.amount
        })));
        setShowAdd(true);
    };

    const handlePurchaseScanned = (data: any) => {
        if (!data) {
            toast.error('Could not process bill. Please try a clearer image.');
            setShowAIScan(false);
            return;
        }

        setShowAIScan(false);
        // Ensure the add form is open so the user can review and save
        setShowAdd(true);

        // 1. PARTY EXTRACTION & AUTO-CREATION
        if (data.supplierName && data.supplierName.trim()) {
            const sName = data.supplierName.trim();
            const matchedSupplier = parties.find((p: any) =>
                (p.type === 'supplier' || p.type === 'both') &&
                (p.name.toLowerCase() === sName.toLowerCase() ||
                    p.name.toLowerCase().includes(sName.toLowerCase()))
            );

            if (matchedSupplier) {
                setSupplierId(matchedSupplier.id);
                console.log('[AI] Matched existing supplier:', matchedSupplier.name);
            } else {
                // Automatically add new supplier with full details from scanned data
                const newS = useStore.getState().addParty({
                    companyId: companyId!,
                    type: 'supplier',
                    name: sName,
                    phone: data.supplierPhone || '',
                    address: data.supplierAddress || '',
                    gstNumber: data.supplierGst || '',
                    openingBalance: 0,
                    balance: 0
                });
                setSupplierId(newS.id);
                console.log('[AI] Created new supplier:', sName);
            }
        }

        // 2. METADATA (Date and Bill Number)
        if (data.billDate) {
            const d = new Date(data.billDate);
            if (!isNaN(d.getTime())) setDate(data.billDate);
        }
        if (data.billNumber) setSupplierInvoiceNo(String(data.billNumber));

        // 3. ITEM MAPPING
        const rawItems = data.items && Array.isArray(data.items) ? data.items : [];

        if (rawItems.length > 0) {
            const mappedItems = rawItems.map((it: any) => {
                const itName = (it.name || it.item || it.product || '').trim();
                // Try to match to an existing product
                const matchedProd = products.find((p: any) =>
                    p.name.toLowerCase() === itName.toLowerCase() ||
                    p.name.toLowerCase().includes(itName.toLowerCase()) ||
                    itName.toLowerCase().includes(p.name.toLowerCase())
                );

                const parseAIPrice = (val: any) => {
                    if (val === undefined || val === null) return 0;
                    // Fix: Handle currency symbols, commas, and common OCR noise
                    const s = String(val).replace(/[₹$,\s]/g, '').replace(/[^0-9.]/g, '');
                    return parseFloat(s) || 0;
                };

                const price = parseAIPrice(it.price ?? it.rate ?? it.unitPrice);
                const qty = parseAIPrice(it.qty ?? it.quantity ?? 1) || 1;
                const amount = parseAIPrice(it.amount) || r2(qty * price);

                return {
                    productId: matchedProd?.id || '',
                    name: matchedProd?.name || itName || 'Unknown Item',
                    qty,
                    purchasePrice: price || (qty > 0 ? r2(amount / qty) : 0),
                    amount: amount || r2(qty * price)
                };
            });

            setItems(mappedItems);
            const supplierLabel = data.supplierName || 'invoice';
            const totalLabel = data.totalAmount ? ' | Total: Rs.' + data.totalAmount : '';
            toast.success(`Extracted ${mappedItems.length} items from ${supplierLabel}${totalLabel}`, { duration: 5000 });
        } else {
            setItems([{ ...emptyRow }]);
            toast('AI extracted supplier info but line items were unclear. Please add them manually.', { icon: 'ℹ️' });
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Header stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14 }}>
                <div className="card" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: '#FEEBC8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <FileText size={20} color="#DD6B20" />
                    </div>
                    <div>
                        <p style={{ fontSize: 10, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', marginBottom: 4 }}>Total Bills</p>
                        <p style={{ fontSize: 20, fontWeight: 900, color: '#1A1A2E' }}>{purchaseBills.length}</p>
                    </div>
                </div>
                <div className="card" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: '#EBF8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Building2 size={20} color="#3182CE" />
                    </div>
                    <div>
                        <p style={{ fontSize: 10, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', marginBottom: 4 }}>Suppliers</p>
                        <p style={{ fontSize: 20, fontWeight: 900, color: '#1A1A2E' }}>{suppliers.length}</p>
                    </div>
                </div>
            </div>

            {/* Recurring Modal */}
            {recurringModalOpen && (
                <div className="modal-overlay" onClick={() => setRecurringModalOpen(false)} style={{ zIndex: 1000 }}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 600 }}>
                        <div style={{ padding: '18px 24px 14px', borderBottom: '1px solid #E1E4E8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h3 style={{ fontWeight: 900, fontSize: 17, color: '#1A1A2E' }}>Past Purchase Bills</h3>
                            <button onClick={() => setRecurringModalOpen(false)} className="btn btn-ghost btn-icon"><X size={18} /></button>
                        </div>
                        <div style={{ padding: '20px 24px', overflowY: 'auto', maxHeight: '60vh' }}>
                            {purchaseBills.filter(b => b.partyId === supplierId).length === 0 ? (
                                <p style={{ color: '#718096', textAlign: 'center', padding: '20px 0' }}>No past bills found for this supplier.</p>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    {purchaseBills.filter(b => b.partyId === supplierId).map(b => (
                                        <div key={b.id} style={{ border: '1px solid #E2E8F0', borderRadius: 8, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <p style={{ fontWeight: 800, color: '#1A1A2E' }}>{b.date} • {b.invoiceNumber}</p>
                                                <p style={{ fontSize: 12, color: '#718096', marginTop: 4 }}>
                                                    {b.items?.map((i: any) => `${i.qty}x ${i.name}`).join(', ')}
                                                </p>
                                                <p style={{ fontWeight: 800, color: '#38A169', marginTop: 4 }}>₹{b.grandTotal}</p>
                                            </div>
                                            <button onClick={() => {
                                                const newItems = b.items?.map((i: any) => ({
                                                    productId: i.productId || '',
                                                    name: i.name || '',
                                                    qty: i.qty || 1,
                                                    purchasePrice: i.rate || i.purchasePrice || 0,
                                                    amount: i.amount || 0
                                                })) || [{ ...emptyRow }];
                                                setItems(newItems);
                                                setRecurringModalOpen(false);
                                            }} className="btn btn-outline btn-sm">
                                                Load Items
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Controls */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
                    <Search size={15} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#A0AEC0' }} />
                    <input className="e-input" placeholder="Search supplier or bill no…" value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 34 }} />
                </div>
                <button onClick={() => setShowAdd(true)} className="btn btn-blue btn-sm" style={{ gap: 5 }}>
                    <Plus size={13} /> Add Purchase Bill
                </button>
            </div>

            {/* Table */}
            <div className="card" style={{ overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    {filtered.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '56px 20px' }}>
                            <FileText size={44} style={{ color: '#E1E4E8', margin: '0 auto 12px' }} />
                            <p style={{ color: '#A0AEC0', fontWeight: 600, fontSize: 14 }}>No purchase bills yet</p>
                            <button onClick={() => setShowAdd(true)} className="btn btn-blue btn-sm" style={{ display: 'inline-flex', marginTop: 12, gap: 5 }}>
                                <Plus size={13} /> Add First Bill
                            </button>
                        </div>
                    ) : (
                        <table className="e-table" style={{ width: '100%', minWidth: 600 }}>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Bill No</th>
                                    <th>Supplier</th>
                                    <th>Items</th>
                                    <th style={{ textAlign: 'right' }}>Total Amount</th>
                                    <th style={{ width: 60 }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(b => (
                                    <tr key={b.id}>
                                        <td style={{ fontSize: 13, color: '#4A5568' }}>{b.date}</td>
                                        <td style={{ fontWeight: 700 }}>{b.invoiceNumber}</td>
                                        <td style={{ fontWeight: 600, color: '#2D3748' }}>{b.partyName}</td>
                                        <td style={{ fontSize: 12, color: '#718096' }}>{b.items?.map((i: any) => i.name).join(', ')}</td>
                                        <td style={{ textAlign: 'right', fontWeight: 800, color: '#38A169' }}>₹{b.grandTotal.toLocaleString('en-IN')}</td>
                                        <td style={{ textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
                                                <Link href={`/company/billing/invoice?id=${b.id}`} className="btn btn-ghost btn-icon" style={{ padding: 6 }}>
                                                    <FileText size={14} color="#4285F4" />
                                                </Link>
                                                <button onClick={() => handleDuplicate(b)} title="Duplicate / Recurring" className="btn btn-ghost btn-icon" style={{ padding: 6 }}>
                                                    <Repeat size={14} color="#34A853" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Add Purchase Bill Modal */}
            {showAdd && (
                <div className="modal-overlay" onClick={() => setShowAdd(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 800, maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '18px 24px 14px', borderBottom: '1px solid #E1E4E8', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <h3 style={{ fontWeight: 900, fontSize: 17, color: '#1A1A2E' }}>Add Purchase Bill</h3>
                                <button onClick={() => {
                                    if (!canAccess('ai_scanner', user, isDemo)) {
                                        toast('AI Scanning requires the Premium Plan. Upgrade in Subscription settings.', { icon: '🔒' });
                                        return;
                                    }
                                    setShowAIScan(true);
                                }} className="btn btn-sm" style={{ background: canAccess('ai_scanner', user, isDemo) ? 'linear-gradient(135deg, #1A1A2E, #4285F4)' : '#E2E8F0', color: canAccess('ai_scanner', user, isDemo) ? 'white' : '#A0AEC0', border: 'none', gap: 6, cursor: canAccess('ai_scanner', user, isDemo) ? 'pointer' : 'not-allowed' }}>
                                    <ScanLine size={14} /> AI Scan Invoice {!canAccess('ai_scanner', user, isDemo) && '🔒'}
                                </button>
                            </div>
                            <button onClick={() => setShowAdd(false)} className="btn btn-ghost btn-icon"><X size={18} /></button>
                        </div>

                        {showAIScan && (
                            <div style={{ position: 'absolute', inset: 0, zIndex: 100 }}>
                                <AIAddItemModal type="purchase" onClose={() => setShowAIScan(false)} onPurchaseScanned={handlePurchaseScanned} />
                            </div>
                        )}

                        <div style={{ overflowY: 'auto', flex: 1, padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5 }}>Supplier</label>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            {supplierId && (
                                                <>
                                                    <button
                                                        onClick={() => {
                                                            const s = parties.find(p => p.id === supplierId);
                                                            if (s?.assignedProductIds?.length) {
                                                                const ap = products.filter(p => s.assignedProductIds?.includes(p.id));
                                                                const newItems = ap.map(p => ({
                                                                    productId: p.id,
                                                                    name: p.name,
                                                                    qty: 1,
                                                                    purchasePrice: p.purchasePrice || 0,
                                                                    amount: p.purchasePrice || 0
                                                                }));
                                                                setItems(prev => {
                                                                    const existing = prev.filter(it => it.productId || it.name);
                                                                    return [...existing, ...newItems];
                                                                });
                                                            } else {
                                                                toast('No products assigned yet. They link automatically on save.', { icon: 'ℹ️' });
                                                            }
                                                        }}
                                                        style={{ fontSize: 10, fontWeight: 700, color: '#16A34A', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                                                    >
                                                        <Package size={12} /> Load Items
                                                    </button>
                                                    <button
                                                        onClick={() => setRecurringModalOpen(true)}
                                                        style={{ fontSize: 10, fontWeight: 700, color: '#4285F4', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                                                    >
                                                        <Repeat size={12} /> Past Bills
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <select className="e-select" value={supplierId} onChange={e => setSupplierId(e.target.value)}>
                                        <option value="">Walk-in Supplier</option>
                                        {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5 }}>Supplier Bill No (Optional)</label>
                                    <input
                                        className="e-input"
                                        value={supplierInvoiceNo}
                                        onChange={e => setSupplierInvoiceNo(e.target.value)}
                                        onBlur={(e) => {
                                            const val = e.target.value;
                                            if (!val) return;
                                            const existing = purchaseBills.find(b => b.invoiceNumber === val && b.partyId === supplierId);
                                            if (existing) {
                                                confirm({ message: `A bill with number "${val}" already exists. Load its items for recurring entry?`, danger: false }).then(yes => {
                                                    if (yes) handleDuplicate(existing);
                                                });
                                            }
                                        }}
                                        placeholder="e.g. INV-202"
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5 }}>Date</label>
                                    <input type="date" className="e-input" value={date} onChange={e => setDate(e.target.value)} />
                                </div>
                            </div>

                            <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: 8 }}>
                                <table style={{ width: '100%', minWidth: 600, borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                                    <colgroup>
                                        <col />
                                        <col style={{ width: 90 }} />
                                        <col style={{ width: 130 }} />
                                        <col style={{ width: 100 }} />
                                        <col style={{ width: 36 }} />
                                    </colgroup>
                                    <thead>
                                        <tr style={{ background: '#F7FAFC', borderBottom: '1.5px solid #E2E8F0' }}>
                                            <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#718096', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Item / Product</th>
                                            <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#718096', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Qty</th>
                                            <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#718096', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Price (₹)</th>
                                            <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#718096', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Amount</th>
                                            <th style={{ width: 36 }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item, i) => (
                                            <tr key={i} style={{ borderBottom: '1px solid #F1F3F5' }}>
                                                <td style={{ padding: '8px 14px', verticalAlign: 'middle' }}>
                                                    <select className="e-select" style={{ padding: '6px' }} value={item.productId} onChange={e => updateItem(i, 'productId', e.target.value)}>
                                                        <option value="">-- Select/Link Product --</option>
                                                        {products.map((p: any) => <option key={p.id} value={p.id}>{p.name} (Stock: {p.stockQty})</option>)}
                                                    </select>
                                                    {!item.productId && item.name && (
                                                        <input
                                                            className="e-input"
                                                            style={{ padding: '4px 6px', marginTop: 4, fontSize: 11, color: '#1D4ED8', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 4 }}
                                                            value={item.name}
                                                            placeholder="Item name from scanned bill"
                                                            onChange={e => setItems(prev => prev.map((it, idx) => idx === i ? { ...it, name: e.target.value } : it))}
                                                        />
                                                    )}
                                                </td>
                                                <td style={{ padding: '8px 14px', verticalAlign: 'middle' }}>
                                                    <input type="number" className="e-input" style={{ padding: '6px' }} value={item.qty} onChange={e => updateItem(i, 'qty', e.target.value)} min="1" />
                                                </td>
                                                <td style={{ padding: '8px 14px', verticalAlign: 'middle' }}>
                                                    <input type="number" className="e-input" style={{ padding: '6px' }} value={item.purchasePrice} onChange={e => updateItem(i, 'purchasePrice', e.target.value)} min="0" />
                                                </td>
                                                <td style={{ padding: '8px 14px', fontWeight: 800, color: '#2D3748', verticalAlign: 'middle' }}>
                                                    {(parseFloat(item.amount) || 0).toFixed(2)}
                                                </td>
                                                <td style={{ padding: '8px 4px', verticalAlign: 'middle' }}>
                                                    <button onClick={() => removeRow(i)} style={{ background: 'none', border: 'none', color: '#E53E3E', cursor: 'pointer', padding: 4 }}><Trash2 size={14} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr style={{ background: '#FAFAFA' }}>
                                            <td colSpan={5} style={{ padding: '10px 14px', borderTop: '1px solid #E2E8F0' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <button onClick={addRow} className="btn btn-outline btn-sm">+ Add Row</button>
                                                    <span style={{ fontSize: 11, color: '#A0AEC0' }}>{items.length} item{items.length !== 1 ? 's' : ''}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                            <div style={{ textAlign: 'right', fontSize: 18, fontWeight: 900 }}>
                                Grand Total: <span style={{ color: '#38A169' }}>₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                            </div>
                        </div>

                        <div style={{ padding: '14px 24px', borderTop: '1px solid #E1E4E8', display: 'flex', gap: 10, justifyContent: 'flex-end', background: 'white', borderRadius: '0 0 16px 16px' }}>
                            <button onClick={() => setShowAdd(false)} className="btn btn-outline">Cancel</button>
                            <button onClick={handleSave} className="btn btn-blue" style={{ display: 'flex', gap: 6 }}><Upload size={16} /> Save & Update Stocks</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
