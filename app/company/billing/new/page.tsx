'use client';
import { useState, useMemo, memo, useCallback, Suspense, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useStore, useActiveCompany, useCompanyData } from '@/lib/store';
import { calcLineItem, r2, roundOff, amountInWords, PAYMENT_METHODS, GST_RATES, UNITS, formatDate } from '@/lib/utils';
import type { InvoiceLineItem, InvoiceType, PaymentMethod, PaymentStatus, AgencyClient, AgencyProject } from '@/lib/types';
import { Plus, Trash2, Search, X, User, Package, ChevronDown, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const ItemRow = memo(function ItemRow({ item, idx, onUpdate, onRemove }: {
    item: InvoiceLineItem; idx: number;
    onUpdate: (idx: number, k: string, v: any) => void;
    onRemove: (idx: number) => void;
}) {
    return (
        <div style={{ padding: '14px 18px', borderBottom: '1px solid #F1F3F5', animation: 'fadeUp 0.2s ease' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 10 }}>
                <input type="text" defaultValue={item.name} placeholder="Item name *"
                    onBlur={e => onUpdate(idx, 'name', e.target.value)}
                    className="e-input" style={{ flex: 1, fontWeight: 600 }} />
                <button onClick={() => onRemove(idx)} className="btn btn-ghost btn-icon"
                    style={{ marginTop: 2, color: '#EA4335', flexShrink: 0 }}>
                    <Trash2 size={15} />
                </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }} className="item-row-grid">
                <div style={{ gridColumn: 'span 1' }}>
                    <p style={{ fontSize: 9, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', marginBottom: 4 }}>Qty</p>
                    <input type="number" min="0.01" step="any" defaultValue={item.qty}
                        onBlur={e => onUpdate(idx, 'qty', parseFloat(e.target.value) || 1)}
                        className="e-input" style={{ textAlign: 'center', fontSize: 13, padding: '8px' }}
                        inputMode="decimal" />
                </div>
                <div style={{ gridColumn: 'span 1' }}>
                    <p style={{ fontSize: 9, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', marginBottom: 4 }}>Unit</p>
                    <select defaultValue={item.unit} onChange={e => onUpdate(idx, 'unit', e.target.value)} className="e-select" style={{ fontSize: 12, height: '100%', padding: '0 8px' }}>
                        {UNITS.map(u => <option key={u}>{u}</option>)}
                    </select>
                </div>
                <div style={{ gridColumn: 'span 1' }}>
                    <p style={{ fontSize: 9, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Rate ₹</p>
                    <input type="number" min="0" step="any" defaultValue={item.rate}
                        onBlur={e => onUpdate(idx, 'rate', parseFloat(e.target.value) || 0)}
                        className="e-input" style={{ fontSize: 13, padding: '8px' }}
                        inputMode="decimal" />
                </div>
                <div style={{ gridColumn: 'span 1' }}>
                    <p style={{ fontSize: 9, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Disc%</p>
                    <input type="number" min="0" max="100" step="any" defaultValue={item.discount}
                        onBlur={e => onUpdate(idx, 'discount', parseFloat(e.target.value) || 0)}
                        className="e-input" style={{ fontSize: 13, padding: '8px' }}
                        inputMode="decimal" />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                    <p style={{ fontSize: 9, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>GST%</p>
                    <select defaultValue={item.gstRate} onChange={e => onUpdate(idx, 'gstRate', Number(e.target.value))} className="e-select" style={{ fontSize: 12, height: '100%', padding: '0 8px' }}>
                        {GST_RATES.map(r => <option key={r} value={r}>{r}%</option>)}
                    </select>
                </div>
            </div>
            {(item.qty * item.rate) > 0 && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8, padding: '6px 10px', background: '#F8F9FA', borderRadius: 8 }}>
                    {item.gstRate > 0 && <span style={{ fontSize: 11, color: '#718096' }}>Tax: ₹{item.totalGst.toFixed(2)}</span>}
                    <span style={{ fontSize: 12, fontWeight: 800, color: '#1A1A2E' }}>= ₹{item.amount.toFixed(2)}</span>
                </div>
            )}
        </div>
    );
});

function NewBillContent() {
    const { activeCompanyId, addInvoice, nextInvoiceNumber, adjustStock } = useStore();
    const companyId = activeCompanyId;
    const sp = useSearchParams();
    const router = useRouter();
    const [invoiceType, setInvoiceType] = useState<InvoiceType>('sale');
    const company = useActiveCompany();
    const parties = useCompanyData('parties') as any[];
    const products = useCompanyData('products') as any[];
    const agencyClients = useCompanyData('agencyClients') as AgencyClient[];
    const agencyProjects = useCompanyData('agencyProjects') as AgencyProject[];
    const isAgency = company?.type === 'Digital Agency';

    const [items, setItems] = useState<InvoiceLineItem[]>([]);
    const [partyId, setPartyId] = useState('');
    const [projectId, setProjectId] = useState('');
    const [currency, setCurrency] = useState('INR');
    const [exchangeRate, setExchangeRate] = useState(1);
    const [partyName, setPartyName] = useState('');
    const [partyPhone, setPartyPhone] = useState('');
    const [partyGst, setPartyGst] = useState('');
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [dueDate, setDueDate] = useState('');
    const [notes, setNotes] = useState('');
    const [shipping, setShipping] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
    const [amountPaid, setAmountPaid] = useState('');
    const [isHidden, setIsHidden] = useState(false);
    const [showPartyModal, setShowPartyModal] = useState(false);
    const [showItemModal, setShowItemModal] = useState(false);
    const [partySearch, setPartySearch] = useState('');
    const [itemSearch, setItemSearch] = useState('');

    useEffect(() => {
        const t = sp.get('type');
        if (t) setInvoiceType(t as InvoiceType);

        const cid = sp.get('client');
        const pid = sp.get('project');
        const dupId = sp.get('duplicateId');
        if (pid) setProjectId(pid);
        if (cid && isAgency && agencyClients?.length) {
            const c = agencyClients.find(x => x.id === cid);
            if (c) {
                setPartyId(c.id);
                setPartyName(c.clientName);
                setPartyPhone(c.phone || '');
                setPartyGst(c.gstNumber || '');
            }
        }
        if (dupId) {
            const allInvoices = (useStore.getState() as any).invoices || [];
            const original = allInvoices.find((inv: any) => inv.id === dupId);
            if (original) {
                setItems(original.items.map((it: any) => ({ ...it })));
                if (original.partyId) setPartyId(original.partyId);
                setPartyName(original.partyName || '');
                setPartyPhone(original.partyPhone || '');
                setPartyGst(original.partyGst || '');
                setNotes(original.notes || '');
                if (original.currency) setCurrency(original.currency);
                if (original.exchangeRate) setExchangeRate(original.exchangeRate);
            }
        }
    }, [sp, isAgency, agencyClients]);

    const handleUpdateItem = useCallback((idx: number, k: string, v: any) => {
        setItems(prev => prev.map((item, i) => {
            if (i !== idx) return item;
            const upd = { ...item, [k]: v };
            const calc = calcLineItem(+upd.qty, +upd.rate, +upd.discount, upd.gstRate as any);
            return { ...upd, ...calc };
        }));
    }, []);

    const handleRemoveItem = useCallback((idx: number) => {
        setItems(prev => prev.filter((_, i) => i !== idx));
    }, []);

    const addFromProduct = (p: any) => {
        const calc = calcLineItem(1, p.sellingPrice, 0, p.gstRate);
        setItems(prev => [...prev, {
            productId: p.id, name: p.name, hsnCode: p.hsnCode,
            unit: p.unit, gstRate: p.gstRate, ...calc,
        }]);
        setShowItemModal(false);
        setItemSearch('');
    };

    const addBlankItem = () => {
        setItems(prev => [...prev, { name: '', qty: 1, unit: 'pcs', rate: 0, discount: 0, gstRate: 0, discountAmt: 0, taxableAmt: 0, cgst: 0, sgst: 0, igst: 0, cess: 0, totalGst: 0, amount: 0 }]);
    };

    const taxableAmount = r2(items.reduce((a, i) => a + i.taxableAmt, 0));
    const totalGst = r2(items.reduce((a, i) => a + i.totalGst, 0));
    const totalCgst = r2(items.reduce((a, i) => a + i.cgst, 0));
    const totalSgst = r2(items.reduce((a, i) => a + i.sgst, 0));
    const totalDiscount = r2(items.reduce((a, i) => a + i.discountAmt, 0));
    const sub = r2(taxableAmount + totalGst + shipping);
    const ro = roundOff(sub);
    const grandTotal = r2(sub + ro);
    const paid = parseFloat(amountPaid) || 0;
    const balanceDue = r2(grandTotal - paid);
    const paymentStatus: PaymentStatus = paid >= grandTotal && grandTotal > 0 ? 'paid' : paid > 0 ? 'partial' : 'unpaid';
    const hasGst = items.some(i => i.gstRate > 0 && i.totalGst > 0);

    const handleSave = () => {
        if (items.length === 0) { toast.error('Add at least one item to the invoice'); return; }
        const id = 'inv_' + Date.now().toString(36);
        addInvoice({
            id, companyId: companyId!, invoiceType, isGstBill: hasGst, isHidden,
            invoiceNumber: nextInvoiceNumber(companyId!),
            date, dueDate: dueDate || undefined, partyId: partyId || undefined,
            partyName: partyName || undefined, partyPhone: partyPhone || undefined, partyGst: partyGst || undefined,
            items, subTotal: taxableAmount + totalGst, totalDiscount, taxableAmount,
            totalCgst, totalSgst, totalIgst: 0, totalCess: 0, totalGst,
            shippingCharges: shipping, packingCharges: 0, adjustmentAmount: 0, roundOff: ro, grandTotal,
            paymentStatus, amountPaid: paid, balanceDue,
            payments: paid > 0 ? [{ method: paymentMethod, amount: paid, date }] : [],
            paymentMethod, isPrivate: false, notes,
            projectId: projectId || undefined,
            currency, exchangeRate,
            createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        } as any);
        if (['sale', 'purchase_return', 'debit_note'].includes(invoiceType)) {
            items.forEach(item => { if (item.productId) adjustStock(item.productId, -item.qty); });
        } else if (['purchase', 'sale_return', 'credit_note'].includes(invoiceType)) {
            items.forEach(item => { if (item.productId) adjustStock(item.productId, item.qty); });
        }
        toast.success('Invoice saved! 📝', { duration: 2500 });
        router.replace(`/company/billing`);
    };

    const TYPE_LABELS: Record<string, string> = {
        sale: 'Tax Invoice', 
        purchase: 'Purchase Bill', 
        estimate: 'Estimate',
        proforma: 'Proforma Invoice', 
        delivery_challan: 'Delivery Challan', 
        credit_note: 'Credit Note',
        debit_note: 'Debit Note',
        sale_return: 'Return Bill (Sale Return)',
        purchase_return: 'Purchase Return'
    };

    const activeParties = isAgency ? agencyClients.map(c => ({ id: c.id, name: c.clientName, phone: c.phone || '', gstNumber: c.gstNumber || '', balance: 0 })) : parties;
    const filteredParties = activeParties.filter(p => !partySearch || p.name.toLowerCase().includes(partySearch.toLowerCase()) || p.phone?.includes(partySearch));
    const filteredProducts = products.filter(p => !itemSearch || p.name.toLowerCase().includes(itemSearch.toLowerCase()) || (p.barcode || '').includes(itemSearch));

    return (
        <>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <div>
                        <h2 style={{ fontSize: 20, fontWeight: 900, color: '#1A1A2E' }}>{TYPE_LABELS[invoiceType]}</h2>
                        <p style={{ fontSize: 12, color: '#A0AEC0', marginTop: 2 }}>{nextInvoiceNumber(companyId!)}</p>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => router.back()} className="btn btn-outline">Cancel</button>
                        <button onClick={handleSave} className="btn btn-blue">Save Invoice</button>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }} className="bill-grid">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        <div className="card" style={{ padding: 20 }}>
                            <p style={{ fontSize: 11, fontWeight: 800, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
                                {['purchase', 'purchase_return', 'debit_note'].includes(invoiceType) ? 'Supplier' : 'Customer / Party'}
                            </p>
                            {partyId ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: '#E8F0FE', borderRadius: 12 }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 10, background: '#4285F4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, flexShrink: 0 }}>
                                        {partyName[0]}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontWeight: 700, fontSize: 13, color: '#1A1A2E' }}>{partyName}</p>
                                        <p style={{ fontSize: 11, color: '#718096' }}>{partyPhone}</p>
                                    </div>
                                    <button onClick={() => { setPartyId(''); setPartyName(''); setPartyPhone(''); setPartyGst(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                        <X size={15} color="#A0AEC0" />
                                    </button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    <button onClick={() => setShowPartyModal(true)} style={{
                                        width: '100%', padding: '10px 14px', border: '1.5px dashed #CBD5E0', borderRadius: 10,
                                        background: 'none', cursor: 'pointer', fontSize: 13, color: '#A0AEC0',
                                        display: 'flex', alignItems: 'center', gap: 8, transition: 'border-color 0.15s',
                                    }}>
                                        <User size={15} /> Select from party list
                                    </button>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 8 }}>
                                        <input className="e-input" placeholder="Customer name" value={partyName} onChange={e => setPartyName(e.target.value)} />
                                        <input className="e-input" placeholder="Phone" value={partyPhone} onChange={e => setPartyPhone(e.target.value)} />
                                    </div>
                                    <input className="e-input" placeholder="GST Number (if registered)" value={partyGst} onChange={e => setPartyGst(e.target.value.toUpperCase())} style={{ fontFamily: 'monospace', letterSpacing: '0.08em' }} />
                                </div>
                            )}
                        </div>

                        <div className="card" style={{ padding: 20 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 14 }}>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>Bill Type</label>
                                    <select className="e-select" value={invoiceType} onChange={e => setInvoiceType(e.target.value as InvoiceType)}>
                                        <option value="sale">Tax Invoice</option>
                                        <option value="proforma">Proforma Invoice</option>
                                        <option value="sale_return">Return Bill (Sale Return)</option>
                                        <option value="estimate">Estimate</option>
                                        <option value="delivery_challan">Delivery Challan</option>
                                        <option value="purchase">Purchase Bill</option>
                                        <option value="purchase_return">Purchase Return</option>
                                        <option value="credit_note">Credit Note</option>
                                        <option value="debit_note">Debit Note</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>Date</label>
                                    <input type="date" className="e-input" value={date} onChange={e => setDate(e.target.value)} />
                                </div>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>Due Date</label>
                                    <input type="date" className="e-input" value={dueDate} onChange={e => setDueDate(e.target.value)} />
                                </div>
                                {isAgency && (
                                    <div style={{ gridColumn: '1 / -1' }}>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>Link to Project</label>
                                        <select className="e-select" value={projectId} onChange={e => setProjectId(e.target.value)}>
                                            <option value="">No Project</option>
                                            {agencyProjects.filter(p => !partyId || p.clientId === partyId).map(p => (
                                                <option key={p.id} value={p.id}>{p.projectName} ({p.serviceType})</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="card" style={{ overflow: 'hidden' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderBottom: '1px solid #F1F3F5' }}>
                                <p style={{ fontWeight: 800, fontSize: 14, color: '#1A1A2E' }}>Items &amp; Products</p>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button onClick={() => setShowItemModal(true)} className="btn btn-outline btn-sm">
                                        <Search size={13} /> Search Item
                                    </button>
                                    <button onClick={addBlankItem} className="btn btn-ghost btn-sm">
                                        <Plus size={13} /> Add Row
                                    </button>
                                </div>
                            </div>
                            {items.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '48px 20px' }}>
                                    <Package size={36} style={{ color: '#E1E4E8', margin: '0 auto 10px' }} />
                                    <p style={{ color: '#A0AEC0', fontSize: 13 }}>No items yet — search or add manually</p>
                                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 14 }}>
                                        <button onClick={() => setShowItemModal(true)} className="btn btn-blue btn-sm"><Search size={13} /> Search</button>
                                        <button onClick={addBlankItem} className="btn btn-outline btn-sm"><Plus size={13} /> Add Row</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {items.map((item, idx) => (
                                        <ItemRow key={`row-${idx}`} item={item} idx={idx} onUpdate={handleUpdateItem} onRemove={handleRemoveItem} />
                                    ))}
                                    <div style={{ padding: '12px 18px', background: '#F8F9FA', borderTop: '1px solid #F1F3F5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <button onClick={addBlankItem} className="btn btn-ghost btn-sm" style={{ color: '#4285F4', fontWeight: 700 }}>
                                            <Plus size={13} /> Add another item
                                        </button>
                                        <p style={{ fontSize: 12, fontWeight: 700, color: '#718096' }}>{items.length} item{items.length !== 1 ? 's' : ''}</p>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="card" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A2E' }}>Password-Protected Invoice</p>
                                <p style={{ fontSize: 11, color: '#A0AEC0', marginTop: 2 }}>This invoice will be hidden from normal view and requires a password to access</p>
                            </div>
                            <button onClick={() => setIsHidden(v => !v)}
                                style={{ width: 42, height: 24, borderRadius: 999, border: 'none', cursor: 'pointer', background: isHidden ? '#34A853' : '#CBD5E0', position: 'relative', flexShrink: 0, transition: 'background 0.2s' }}>
                                <span style={{ position: 'absolute', top: 2, left: isHidden ? 20 : 2, width: 20, height: 20, background: 'white', borderRadius: 999, boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 0.2s' }} />
                            </button>
                        </div>

                        <div className="card" style={{ padding: 20 }}>
                            <label style={{ fontSize: 11, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 8 }}>Notes / Terms</label>
                            <textarea className="e-input" rows={2} placeholder="Payment terms, bank details, thank you message…"
                                value={notes} onChange={e => setNotes(e.target.value)} style={{ resize: 'none' }} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {items.length > 0 && !hasGst && (
                            <div style={{ background: '#FEF7E0', border: '1.5px solid #FBBC04', borderRadius: 12, padding: '12px 16px', fontSize: 12, color: '#92400E', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                                <span style={{ fontWeight: 800 }}>⚠</span>
                                <p><span style={{ fontWeight: 700 }}>No GST on any item.</span> This invoice will be hidden from normal bill view.</p>
                            </div>
                        )}

                        <div className="card" style={{ padding: 20 }}>
                            <p style={{ fontSize: 11, fontWeight: 800, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>Bill Summary</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
                                {[
                                    { label: 'Sub Total', value: `₹${(items.reduce((a, i) => a + i.qty * i.rate, 0)).toFixed(2)}`, muted: true },
                                    ...(totalDiscount > 0 ? [{ label: 'Discount', value: `-₹${totalDiscount.toFixed(2)}`, muted: false, red: true }] : []),
                                    { label: 'Taxable Amount', value: `₹${taxableAmount.toFixed(2)}`, muted: true },
                                    ...(totalCgst > 0 ? [
                                        { label: '+ CGST', value: `₹${totalCgst.toFixed(2)}`, muted: true, indent: true },
                                        { label: '+ SGST', value: `₹${totalSgst.toFixed(2)}`, muted: true, indent: true },
                                    ] : []),
                                    ...(shipping > 0 ? [{ label: 'Shipping', value: `₹${shipping.toFixed(2)}`, muted: true }] : []),
                                    ...(ro !== 0 ? [{ label: 'Round Off', value: `${ro > 0 ? '+' : ''}₹${ro.toFixed(2)}`, muted: true, small: true }] : []),
                                ].map(({ label, value, muted, red, indent, small }) => (
                                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: indent ? '#A0AEC0' : muted ? '#718096' : '#1A1A2E', paddingLeft: indent ? 12 : 0, fontSize: small ? 11 : 13 }}>{label}</span>
                                        <span style={{ color: red ? '#EA4335' : muted ? '#718096' : '#1A1A2E' }}>{value}</span>
                                    </div>
                                ))}
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1.5px solid #E1E4E8', paddingTop: 10, marginTop: 4 }}>
                                    <span style={{ fontSize: 16, fontWeight: 900, color: '#1A1A2E' }}>Grand Total</span>
                                    <span style={{ fontSize: 18, fontWeight: 900, color: '#4285F4' }}>₹{grandTotal.toLocaleString('en-IN')}</span>
                                </div>
                                {grandTotal > 0 && (
                                    <p style={{ fontSize: 10, color: '#A0AEC0', borderTop: '1px solid #F1F3F5', paddingTop: 6 }}>{amountInWords(grandTotal)}</p>
                                )}
                            </div>
                        </div>

                        <div className="card" style={{ padding: 20 }}>
                            <p style={{ fontSize: 11, fontWeight: 800, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Payment</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginBottom: 14 }}>
                                {PAYMENT_METHODS.slice(0, 4).map(m => (
                                    <button key={m.value} onClick={() => setPaymentMethod(m.value as PaymentMethod)}
                                        style={{
                                            padding: '8px 4px', borderRadius: 10, border: '1.5px solid',
                                            borderColor: paymentMethod === m.value ? '#4285F4' : '#E1E4E8',
                                            background: paymentMethod === m.value ? '#E8F0FE' : 'white',
                                            cursor: 'pointer', fontSize: 10, fontWeight: 700,
                                            color: paymentMethod === m.value ? '#1967D2' : '#718096',
                                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, transition: 'all 0.15s',
                                        }}>
                                        <span style={{ fontSize: 16 }}>{m.emoji}</span>
                                        {m.label}
                                    </button>
                                ))}
                            </div>
                            <div>
                                <label style={{ fontSize: 11, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>Amount Received (₹)</label>
                                <input type="number" min="0" value={amountPaid} onChange={e => setAmountPaid(e.target.value)}
                                    placeholder={grandTotal > 0 ? `Full: ₹${grandTotal.toFixed(2)}` : '0.00'}
                                    className="e-input" inputMode="decimal" />
                                {balanceDue > 0 && <p style={{ fontSize: 11, color: '#EA4335', fontWeight: 700, marginTop: 6 }}>⚠ Balance Due: ₹{balanceDue.toFixed(2)}</p>}
                                {paid >= grandTotal && grandTotal > 0 && <p style={{ fontSize: 11, color: '#34A853', fontWeight: 700, marginTop: 6 }}>✓ Fully Paid</p>}
                            </div>
                            <div style={{ marginTop: 14, padding: '10px 12px', borderRadius: 10, background: '#F8F9FA', display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ width: 8, height: 8, borderRadius: 999, background: paymentStatus === 'paid' ? '#34A853' : paymentStatus === 'partial' ? '#FBBC04' : '#EA4335', flexShrink: 0 }} />
                                <span style={{ fontSize: 12, fontWeight: 700, color: '#1A1A2E', textTransform: 'capitalize' }}>{paymentStatus}</span>
                            </div>
                        </div>

                        <button onClick={handleSave} className="btn btn-blue btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                            💾 Save Invoice
                        </button>
                    </div>
                </div>
            </div>

            {showPartyModal && (
                <div className="modal-overlay" onClick={() => setShowPartyModal(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()}>
                        <div style={{ padding: '16px 20px', borderBottom: '1px solid #E1E4E8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h3 style={{ fontWeight: 800, fontSize: 16, color: '#1A1A2E' }}>Select Party</h3>
                            <button onClick={() => setShowPartyModal(false)} className="btn btn-ghost btn-icon"><X size={18} /></button>
                        </div>
                        <div style={{ padding: '12px 16px', borderBottom: '1px solid #F1F3F5' }}>
                            <input className="e-input" autoFocus placeholder="Search name or phone…" value={partySearch} onChange={e => setPartySearch(e.target.value)} />
                        </div>
                        <div style={{ overflowY: 'auto', flex: 1 }}>
                            {filteredParties.map((p: any) => (
                                <button key={p.id} onClick={() => { setPartyId(p.id); setPartyName(p.name); setPartyPhone(p.phone); setPartyGst(p.gstNumber || ''); setShowPartyModal(false); }}
                                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', background: 'none', border: 'none', borderBottom: '1px solid #F8F9FA', cursor: 'pointer', textAlign: 'left', transition: 'background 0.12s' }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 10, background: '#E8F0FE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#4285F4', flexShrink: 0 }}>{p.name[0]}</div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A2E' }}>{p.name}</p>
                                        <p style={{ fontSize: 11, color: '#A0AEC0' }}>{p.phone}</p>
                                    </div>
                                    <span style={{ fontSize: 12, fontWeight: 800, color: p.balance >= 0 ? '#34A853' : '#EA4335' }}>
                                        {p.balance >= 0 ? '↑' : '↓'} ₹{Math.abs(p.balance).toLocaleString('en-IN')}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {showItemModal && (
                <div className="modal-overlay" onClick={() => setShowItemModal(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()}>
                        <div style={{ padding: '16px 20px', borderBottom: '1px solid #E1E4E8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h3 style={{ fontWeight: 800, fontSize: 16, color: '#1A1A2E' }}>Select Item</h3>
                            <button onClick={() => setShowItemModal(false)} className="btn btn-ghost btn-icon"><X size={18} /></button>
                        </div>
                        <div style={{ padding: '12px 16px', borderBottom: '1px solid #F1F3F5' }}>
                            <div style={{ position: 'relative' }}>
                                <Search size={15} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#A0AEC0' }} />
                                <input className="e-input" autoFocus placeholder="Search item name or barcode…" value={itemSearch} onChange={e => setItemSearch(e.target.value)} style={{ paddingLeft: 34 }} />
                            </div>
                        </div>
                        <div style={{ overflowY: 'auto', flex: 1 }}>
                            {filteredProducts.map((p: any) => (
                                <button key={p.id} onClick={() => addFromProduct(p)}
                                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', background: 'none', border: 'none', borderBottom: '1px solid #F8F9FA', cursor: 'pointer', textAlign: 'left' }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 10, background: '#FEF7E0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#B45309', flexShrink: 0 }}>{p.name[0]}</div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A2E', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</p>
                                        <p style={{ fontSize: 11, color: '#A0AEC0' }}>Stock: {p.stockQty} {p.unit} · GST {p.gstRate}%{p.hsnCode ? ` · HSN: ${p.hsnCode}` : ''}</p>
                                    </div>
                                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                        <p style={{ fontSize: 14, fontWeight: 900, color: '#1A1A2E' }}>₹{p.sellingPrice}</p>
                                        {p.stockQty <= p.lowStockAlertQty && <p style={{ fontSize: 9, color: '#EA4335', fontWeight: 700 }}>LOW STOCK</p>}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @media (min-width: 600px) {
                  .item-row-grid { grid-template-columns: repeat(5, 1fr) !important; }
                  .item-row-grid div { grid-column: auto !important; }
                }
                @media (min-width: 900px) {
                  .bill-grid { grid-template-columns: 2fr 1fr !important; }
                }
                @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
            `}</style>
        </>
    );
}

export default function NewBillPage() {
    return <Suspense><NewBillContent /></Suspense>;
}
