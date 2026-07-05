'use client';
import { useState, useMemo, memo, useCallback, Suspense, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useStore, useActiveCompany, useCompanyData } from '@/lib/store';
import { calcLineItem, r2, roundOff, amountInWords, PAYMENT_METHODS, GST_RATES, UNITS, formatDate } from '@/lib/utils';
import type { InvoiceLineItem, InvoiceType, PaymentMethod, PaymentStatus, AgencyClient, AgencyProject } from '@/lib/types';
import { Plus, Trash2, Search, X, User, Package, ChevronDown, Check, Repeat, Upload, Paperclip } from 'lucide-react';
import toast from 'react-hot-toast';

const ItemRow = memo(function ItemRow({ item, idx, onUpdate, onRemove }: {
    item: InvoiceLineItem; idx: number;
    onUpdate: (idx: number, k: string, v: any) => void;
    onRemove: (idx: number) => void;
}) {
    const [localQty, setLocalQty] = useState(String(item.qty ?? 1));
    const [localRate, setLocalRate] = useState(String(item.rate ?? 0));
    const [localDiscount, setLocalDiscount] = useState(String(item.discount ?? 0));
    const [localName, setLocalName] = useState(item.name ?? '');

    // Sync state when item changes (e.g. loaded from database or other item)
    const [prevItem, setPrevItem] = useState(item);
    if (item !== prevItem) {
        setPrevItem(item);
        setLocalQty(String(item.qty ?? 1));
        setLocalRate(String(item.rate ?? 0));
        setLocalDiscount(String(item.discount ?? 0));
        setLocalName(item.name ?? '');
    }

    return (
        <div style={{ padding: '14px 18px', borderBottom: '1px solid #F1F3F5', animation: 'fadeUp 0.2s ease' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 10 }}>
                <input type="text" value={localName} placeholder="Item name *"
                    onChange={e => setLocalName(e.target.value)}
                    onBlur={() => onUpdate(idx, 'name', localName)}
                    className="e-input" style={{ flex: 1, fontWeight: 600 }} />
                <button onClick={() => onRemove(idx)} className="btn btn-ghost btn-icon"
                    style={{ marginTop: 2, color: '#EA4335', flexShrink: 0 }}>
                    <Trash2 size={15} />
                </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }} className="item-row-grid">
                <div style={{ gridColumn: 'span 1' }}>
                    <p style={{ fontSize: 9, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', marginBottom: 4 }}>Qty</p>
                    <input type="number" min="0.01" step="any" value={localQty}
                        onChange={e => setLocalQty(e.target.value)}
                        onBlur={() => onUpdate(idx, 'qty', parseFloat(localQty) || 1)}
                        className="e-input" style={{ textAlign: 'center', fontSize: 13, padding: '8px' }}
                        inputMode="decimal" />
                </div>
                <div style={{ gridColumn: 'span 1' }}>
                    <p style={{ fontSize: 9, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', marginBottom: 4 }}>Unit</p>
                    <select value={item.unit ?? 'pcs'} onChange={e => onUpdate(idx, 'unit', e.target.value)} className="e-select" style={{ fontSize: 12, height: '100%', padding: '0 8px' }}>
                        {UNITS.map(u => <option key={u}>{u}</option>)}
                    </select>
                </div>
                <div style={{ gridColumn: 'span 1' }}>
                    <p style={{ fontSize: 9, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Rate ₹</p>
                    <input type="number" min="0" step="any" value={localRate}
                        onChange={e => setLocalRate(e.target.value)}
                        onBlur={() => onUpdate(idx, 'rate', parseFloat(localRate) || 0)}
                        className="e-input" style={{ fontSize: 13, padding: '8px' }}
                        inputMode="decimal" />
                </div>
                <div style={{ gridColumn: 'span 1' }}>
                    <p style={{ fontSize: 9, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Disc%</p>
                    <input type="number" min="0" max="100" step="any" value={localDiscount}
                        onChange={e => setLocalDiscount(e.target.value)}
                        onBlur={() => onUpdate(idx, 'discount', parseFloat(localDiscount) || 0)}
                        className="e-input" style={{ fontSize: 13, padding: '8px' }}
                        inputMode="decimal" />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                    <p style={{ fontSize: 9, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>GST%</p>
                    <select value={item.gstRate ?? 0} onChange={e => onUpdate(idx, 'gstRate', Number(e.target.value))} className="e-select" style={{ fontSize: 12, height: '100%', padding: '0 8px' }}>
                        {GST_RATES.map(r => <option key={r} value={r}>{r}%</option>)}
                    </select>
                </div>
            </div>
            {((item.qty ?? 0) * (item.rate ?? 0)) > 0 && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8, padding: '6px 10px', background: '#F8F9FA', borderRadius: 8 }}>
                    {(item.gstRate ?? 0) > 0 && <span style={{ fontSize: 11, color: '#718096' }}>Tax: ₹{(item.totalGst ?? 0).toFixed(2)}</span>}
                    <span style={{ fontSize: 12, fontWeight: 800, color: '#1A1A2E' }}>= ₹{(item.amount ?? 0).toFixed(2)}</span>
                </div>
            )}
        </div>
    );
});

function NewBillContent() {
    const { activeCompanyId, addInvoice, nextInvoiceNumber, adjustStock, addProduct, addParty } = useStore();
    const companyId = activeCompanyId;
    const sp = useSearchParams();
    const router = useRouter();
    const [invoiceType, setInvoiceType] = useState<InvoiceType>('sale');
    const company = useActiveCompany();
    const parties = useCompanyData('parties') as any[];
    const products = useCompanyData('products') as any[];
    const invoices = useCompanyData('invoices') as any[];
    const agencyClients = useCompanyData('agencyClients') as AgencyClient[];
    const agencyProjects = useCompanyData('agencyProjects') as AgencyProject[];
    const isAgency = company?.type === 'Digital Agency';

    const godowns = company?.godowns && company.godowns.length > 0 ? company.godowns : [{ id: 'main', name: 'Main Kitchen' }];
    const [selectedGodownId, setSelectedGodownId] = useState(company?.godowns?.[0]?.id || 'main');

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
    const [isSplitPayment, setIsSplitPayment] = useState(false);
    const [splitAmounts, setSplitAmounts] = useState<Record<string, string>>({
        cash: '',
        upi: '',
        bank: '',
        card: '',
        cheque: '',
    });
    const [isHidden, setIsHidden] = useState(false);
    const [showPartyModal, setShowPartyModal] = useState(false);
    const [showItemModal, setShowItemModal] = useState(false);
    const [showRecurringModal, setShowRecurringModal] = useState(false);
    const [partySearch, setPartySearch] = useState('');
    const [itemSearch, setItemSearch] = useState('');
    const [receiptUrl, setReceiptUrl] = useState('');
    const [showQuickAdd, setShowQuickAdd] = useState(false);
    const [quickName, setQuickName] = useState('');
    const [quickPhone, setQuickPhone] = useState('');
    const [quickGst, setQuickGst] = useState('');

    const isPurchaseFlow = ['purchase', 'purchase_return', 'debit_note'].includes(invoiceType);

    const handleQuickAddParty = () => {
        if (!quickName.trim()) {
            toast.error('Party name is required');
            return;
        }
        const newP = addParty({
            companyId: companyId!,
            type: isPurchaseFlow ? 'supplier' : 'customer',
            name: quickName.trim(),
            phone: quickPhone.trim(),
            gstNumber: quickGst.trim().toUpperCase(),
            openingBalance: 0,
            balance: 0,
        });
        setPartyId(newP.id);
        setPartyName(newP.name);
        setPartyPhone(newP.phone);
        setPartyGst(newP.gstNumber || '');
        setShowPartyModal(false);
        setShowQuickAdd(false);
        setQuickName('');
        setQuickPhone('');
        setQuickGst('');
        toast.success(`${isPurchaseFlow ? 'Supplier' : 'Customer'} added & selected!`);
    };

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
            const qty = parseFloat(upd.qty as any) || 0;
            const rate = parseFloat(upd.rate as any) || 0;
            const discount = parseFloat(upd.discount as any) || 0;
            const gstRate = parseFloat(upd.gstRate as any) || 0;
            const calc = calcLineItem(qty, rate, discount, gstRate as any);
            return { ...upd, ...calc, qty, rate, discount, gstRate: gstRate as any };
        }));
    }, []);

    const handleRemoveItem = useCallback((idx: number) => {
        setItems(prev => prev.filter((_, i) => i !== idx));
    }, []);

    const addFromProduct = (p: any) => {
        const rate = (isPurchaseFlow ? p.purchasePrice : p.sellingPrice) || 0;
        const gstRate = (p.gstRate || 0) as any;
        const calc = calcLineItem(1, rate, 0, gstRate);
        setItems(prev => [...prev, {
            productId: p.id, name: p.name, hsnCode: p.hsnCode,
            unit: p.unit, gstRate, ...calc,
        }]);
        setShowItemModal(false);
        setItemSearch('');
    };

    const addBlankItem = () => {
        setItems(prev => [...prev, { name: '', qty: 1, unit: 'pcs', rate: 0, discount: 0, gstRate: 0, discountAmt: 0, taxableAmt: 0, cgst: 0, sgst: 0, igst: 0, cess: 0, totalGst: 0, amount: 0 }]);
    };

    const taxableAmount = r2(items.reduce((a, i) => a + (i.taxableAmt || 0), 0));
    const totalGst = r2(items.reduce((a, i) => a + (i.totalGst || 0), 0));
    const totalCgst = r2(items.reduce((a, i) => a + (i.cgst || 0), 0));
    const totalSgst = r2(items.reduce((a, i) => a + (i.sgst || 0), 0));
    const totalDiscount = r2(items.reduce((a, i) => a + (i.discountAmt || 0), 0));
    const sub = r2(taxableAmount + totalGst + (shipping || 0));
    const ro = roundOff(sub) || 0;
    const grandTotal = r2(sub + ro) || 0;
    const paid = isSplitPayment
        ? Object.values(splitAmounts).reduce((a, b) => a + (parseFloat(b) || 0), 0)
        : (parseFloat(amountPaid) || 0);
    const balanceDue = r2(grandTotal - paid);
    const paymentStatus: PaymentStatus = paid >= grandTotal && grandTotal > 0 ? 'paid' : paid > 0 ? 'partial' : 'unpaid';
    const hasGst = items.some(i => i.gstRate > 0 && i.totalGst > 0);

    const handleSave = () => {
        if (items.length === 0) { toast.error('Add at least one item to the invoice'); return; }
        const id = 'inv_' + Date.now().toString(36);

        const savedItems = items.map(item => {
            const copy = { ...item };
            if (['sale', 'purchase_return', 'debit_note'].includes(invoiceType)) {
                if (copy.productId) adjustStock(copy.productId, -copy.qty, 'skip');
            } else if (['purchase', 'sale_return', 'credit_note'].includes(invoiceType)) {
                if (invoiceType === 'purchase') {
                    const allProducts = useStore.getState().products;
                    let matchedProduct = copy.productId ? allProducts.find(p => p.id === copy.productId) : null;
                    
                    if (!matchedProduct && copy.name && copy.name.trim()) {
                        matchedProduct = allProducts.find(p => 
                            p.name.toLowerCase().trim() === copy.name.toLowerCase().trim() &&
                            (p.godownId || company?.godowns?.[0]?.id || 'main') === selectedGodownId
                        );
                    }
                    
                    if (matchedProduct) {
                        const productGodownId = matchedProduct.godownId || company?.godowns?.[0]?.id || 'main';
                        if (productGodownId === selectedGodownId) {
                            adjustStock(matchedProduct.id, copy.qty, 'skip');
                            copy.productId = matchedProduct.id;
                        } else {
                            const destProduct = allProducts.find(p => {
                                const pGodownId = p.godownId || company?.godowns?.[0]?.id || 'main';
                                return pGodownId === selectedGodownId && (p.name.toLowerCase() === matchedProduct!.name.toLowerCase() || p.barcode === matchedProduct!.barcode);
                            });
                            if (destProduct) {
                                adjustStock(destProduct.id, copy.qty, 'skip');
                                copy.productId = destProduct.id;
                            } else {
                                const { id, ...cloneInfo } = matchedProduct;
                                const newP = addProduct({
                                    ...cloneInfo,
                                    godownId: selectedGodownId,
                                    stockQty: copy.qty,
                                    stockLogs: []
                                });
                                copy.productId = newP.id;
                            }
                        }
                    } else if (copy.name && copy.name.trim()) {
                        const newP = addProduct({
                            companyId: companyId!,
                            godownId: selectedGodownId,
                            name: copy.name.trim(),
                            unit: copy.unit || 'pcs',
                            purchasePrice: copy.rate || 0,
                            sellingPrice: copy.rate || 0,
                            stockQty: copy.qty || 0,
                            lowStockAlertQty: 5,
                            gstRate: copy.gstRate as any || 0,
                            taxIncluded: false,
                        });
                        copy.productId = newP.id;
                    }
                } else {
                    if (copy.productId) adjustStock(copy.productId, copy.qty, 'skip');
                }
            }
            return copy;
        });

        addInvoice({
            id, companyId: companyId!, invoiceType, isGstBill: hasGst, isHidden,
            invoiceNumber: nextInvoiceNumber(companyId!),
            date, dueDate: dueDate || undefined, partyId: partyId || undefined,
            partyName: partyName || undefined, partyPhone: partyPhone || undefined, partyGst: partyGst || undefined,
            items: savedItems, subTotal: taxableAmount + totalGst, totalDiscount, taxableAmount,
            totalCgst, totalSgst, totalIgst: 0, totalCess: 0, totalGst,
            shippingCharges: shipping, packingCharges: 0, adjustmentAmount: 0, roundOff: ro, grandTotal,
            paymentStatus, amountPaid: paid, balanceDue,
            payments: isSplitPayment
                ? Object.entries(splitAmounts)
                    .filter(([_, val]) => (parseFloat(val) || 0) > 0)
                    .map(([method, val]) => ({
                        method: method as PaymentMethod,
                        amount: parseFloat(val) || 0,
                        date,
                    }))
                : (paid > 0 ? [{ method: paymentMethod, amount: paid, date }] : []),
            paymentMethod: isSplitPayment
                ? (Object.entries(splitAmounts)
                    .filter(([_, val]) => (parseFloat(val) || 0) > 0)
                    .sort((a, b) => (parseFloat(b[1]) || 0) - (parseFloat(a[1]) || 0))[0]?.[0] as PaymentMethod || 'cash')
                : paymentMethod,
            isPrivate: false, notes,
            projectId: projectId || undefined,
            currency, exchangeRate,
            receiptUrl: receiptUrl || undefined,
            createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        } as any);

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

    const activeParties = isAgency
        ? agencyClients.map(c => ({ id: c.id, name: c.clientName, phone: c.phone || '', gstNumber: c.gstNumber || '', balance: 0 }))
        : parties.filter(p => isPurchaseFlow ? (p.type === 'supplier' || p.type === 'both') : (p.type === 'customer' || p.type === 'both'));
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
                            {partyId ? (() => {
                                const selParty = activeParties.find(p => p.id === partyId);
                                return (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: '#E8F0FE', borderRadius: 12 }}>
                                        <div style={{ width: 36, height: 36, borderRadius: 10, background: '#4285F4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, flexShrink: 0 }}>
                                            {partyName[0]}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontWeight: 700, fontSize: 13, color: '#1A1A2E' }}>{partyName}</p>
                                            <p style={{ fontSize: 11, color: '#718096' }}>{partyPhone}</p>
                                        </div>
                                        {selParty && (
                                            <span style={{
                                                fontSize: 11,
                                                fontWeight: 800,
                                                color: selParty.balance > 0 ? '#10B981' : selParty.balance < 0 ? '#EF4444' : '#718096',
                                                background: selParty.balance > 0 ? '#E6F4EA' : selParty.balance < 0 ? '#FCE8E6' : '#EDF2F7',
                                                padding: '4px 10px',
                                                borderRadius: 8,
                                                marginRight: 4
                                            }}>
                                                {selParty.balance > 0 ? 'To Receive: ' : selParty.balance < 0 ? 'To Pay: ' : ''}₹{Math.abs(selParty.balance).toLocaleString('en-IN')}
                                            </span>
                                        )}
                                        <button onClick={() => { setPartyId(''); setPartyName(''); setPartyPhone(''); setPartyGst(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 4 }}>
                                            <X size={15} color="#A0AEC0" />
                                        </button>
                                    </div>
                                );
                            })() : (
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
                                {invoiceType === 'purchase' && (
                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>Storage Godown</label>
                                        <select className="e-select" value={selectedGodownId} onChange={e => setSelectedGodownId(e.target.value)}>
                                            {godowns.map(g => (
                                                <option key={g.id} value={g.id}>{g.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
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
                                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                    <button onClick={() => setShowRecurringModal(true)} className="btn btn-outline btn-sm" style={{ borderColor: '#4285F4', color: '#4285F4', background: '#F4F8FF', gap: 4 }}>
                                        <Repeat size={12} /> Recurring
                                    </button>
                                    <button onClick={() => setShowItemModal(true)} className="btn btn-outline btn-sm" style={{ gap: 4 }}>
                                        <Search size={12} /> Search Item
                                    </button>
                                    <button onClick={addBlankItem} className="btn btn-ghost btn-sm" style={{ gap: 4 }}>
                                        <Plus size={12} /> Add Row
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
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                <p style={{ fontSize: 11, fontWeight: 800, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>Payment</p>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 12, fontWeight: 700, color: '#4285F4' }}>
                                    <input type="checkbox" checked={isSplitPayment} onChange={e => setIsSplitPayment(e.target.checked)} style={{ width: 14, height: 14, cursor: 'pointer' }} />
                                    Split Payment
                                </label>
                            </div>

                            {!isSplitPayment ? (
                                <>
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
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>
                                            {['purchase', 'purchase_return', 'debit_note'].includes(invoiceType) ? 'Amount Paid (₹)' : 'Amount Received (₹)'}
                                        </label>
                                        <input type="number" min="0" value={amountPaid} onChange={e => setAmountPaid(e.target.value)}
                                            placeholder={grandTotal > 0 ? `Full: ₹${grandTotal.toFixed(2)}` : '0.00'}
                                            className="e-input" inputMode="decimal" />
                                    </div>
                                </>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
                                    {PAYMENT_METHODS.slice(0, 5).map(m => (
                                        <div key={m.value} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <span style={{ fontSize: 14, width: 20, textAlign: 'center' }}>{m.emoji}</span>
                                            <span style={{ fontSize: 12, fontWeight: 600, color: '#4A5568', width: 90, flexShrink: 0 }}>{m.label}</span>
                                            <input type="number" min="0" value={splitAmounts[m.value] || ''}
                                                onChange={e => setSplitAmounts(prev => ({ ...prev, [m.value]: e.target.value }))}
                                                placeholder="0.00" className="e-input" style={{ padding: '6px 10px', fontSize: 13 }}
                                                inputMode="decimal" />
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div style={{ marginTop: 10 }}>
                                {balanceDue > 0 && <p style={{ fontSize: 11, color: '#EA4335', fontWeight: 700, margin: 0 }}>⚠ Balance Due: ₹{balanceDue.toFixed(2)}</p>}
                                {balanceDue < 0 && <p style={{ fontSize: 11, color: '#34A853', fontWeight: 700, margin: 0 }}>✓ Advance/Excess Payment: ₹{Math.abs(balanceDue).toFixed(2)}</p>}
                                {balanceDue === 0 && grandTotal > 0 && <p style={{ fontSize: 11, color: '#34A853', fontWeight: 700, margin: 0 }}>✓ Fully Paid</p>}
                            </div>

                            <div style={{ marginTop: 14, padding: '10px 12px', borderRadius: 10, background: '#F8F9FA', display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ width: 8, height: 8, borderRadius: 999, background: paymentStatus === 'paid' ? '#34A853' : paymentStatus === 'partial' ? '#FBBC04' : '#EA4335', flexShrink: 0 }} />
                                <span style={{ fontSize: 12, fontWeight: 700, color: '#1A1A2E', textTransform: 'capitalize' }}>{paymentStatus}</span>
                            </div>

                            {(() => {
                                const party = parties.find(p => p.id === partyId);
                                if (!party) return null;
                                const prevBalance = party.balance || 0;
                                const prevDue = isPurchaseFlow ? (prevBalance < 0 ? Math.abs(prevBalance) : 0) : (prevBalance > 0 ? prevBalance : 0);
                                const prevCredit = isPurchaseFlow ? (prevBalance > 0 ? prevBalance : 0) : (prevBalance < 0 ? Math.abs(prevBalance) : 0);
                                if (prevDue === 0 && prevCredit === 0) return null;
                                const totalOwed = grandTotal + prevDue - prevCredit;
                                const remainingDue = totalOwed - paid;

                                return (
                                    <div style={{ marginTop: 14, padding: 12, background: '#F0F4F8', borderRadius: 12, border: '1px solid #E2E8F0', animation: 'fadeUp 0.15s ease' }}>
                                        <p style={{ fontWeight: 800, color: '#2B6CB0', fontSize: 12, marginBottom: 8, marginTop: 0 }}>Account Balance Tally</p>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, color: '#4A5568', fontSize: 12 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span>This Bill Total:</span>
                                                <span style={{ fontWeight: 700 }}>₹{grandTotal.toFixed(2)}</span>
                                            </div>
                                            {prevDue > 0 && (
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span>Previous Outstanding Due:</span>
                                                    <span style={{ color: '#E53E3E', fontWeight: 700 }}>+₹{prevDue.toFixed(2)}</span>
                                                </div>
                                            )}
                                            {prevCredit > 0 && (
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span>Previous Advance Credit:</span>
                                                    <span style={{ color: '#38A169', fontWeight: 700 }}>-₹{prevCredit.toFixed(2)}</span>
                                                </div>
                                            )}
                                            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1.5px solid #CBD5E0', paddingTop: 6, marginTop: 2 }}>
                                                <span style={{ fontWeight: 700 }}>Total Net Owed:</span>
                                                <span style={{ fontWeight: 800 }}>₹{totalOwed.toFixed(2)}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span>Total Paid Now:</span>
                                                <span style={{ color: '#3182CE', fontWeight: 700 }}>-₹{paid.toFixed(2)}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1.5px solid #CBD5E0', paddingTop: 6, marginTop: 2 }}>
                                                <span style={{ fontWeight: 800, color: '#1A202C' }}>
                                                    {remainingDue >= 0
                                                        ? (isPurchaseFlow ? 'Remaining Balance We Owe:' : 'Remaining Balance Customer Owes:')
                                                        : (isPurchaseFlow ? 'Our Net Advance Credit:' : 'Customer Net Advance Credit:')}
                                                </span>
                                                <span style={{
                                                    fontWeight: 900,
                                                    color: remainingDue >= 0 ? (remainingDue === 0 ? '#4A5568' : '#E53E3E') : '#38A169',
                                                    fontSize: 13
                                                }}>
                                                    ₹{Math.abs(remainingDue).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>

                        {invoiceType === 'purchase' && (
                            <div className="card" style={{ padding: 20 }}>
                                <p style={{ fontSize: 11, fontWeight: 800, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Supplier Bill Attachment</p>
                                {receiptUrl ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, background: '#F8FAFC', borderRadius: 8, border: '1px dashed #CBD5E0' }}>
                                            <div style={{ width: 36, height: 36, borderRadius: 6, background: '#E8F0FE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Paperclip size={18} color="#4285F4" />
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <p style={{ fontSize: 12, fontWeight: 700, color: '#2D3748', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {receiptUrl.startsWith('data:application/pdf') ? 'Attached PDF Document' : 'Attached Photo Document'}
                                                </p>
                                                <p style={{ fontSize: 10, color: '#A0AEC0' }}>Saved locally</p>
                                            </div>
                                            <button onClick={() => setReceiptUrl('')} className="btn btn-ghost btn-icon" style={{ color: '#EA4335', padding: 4 }}>
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                        {receiptUrl.startsWith('data:image/') && (
                                            <img src={receiptUrl} style={{ width: '100%', maxHeight: 120, objectFit: 'contain', borderRadius: 8, border: '1px solid #E2E8F0' }} alt="receipt" />
                                        )}
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        <input type="file" accept="image/*,application/pdf" style={{ display: 'none' }} id="purchase-bill-upload" onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onload = ev => setReceiptUrl(ev.target?.result as string);
                                                reader.readAsDataURL(file);
                                            }
                                        }} />
                                        <label htmlFor="purchase-bill-upload" style={{
                                            width: '100%', padding: '16px 14px', border: '1.5px dashed #CBD5E0', borderRadius: 10,
                                            background: '#F8FAFC', cursor: 'pointer', fontSize: 13, color: '#718096',
                                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, transition: 'all 0.15s',
                                        }}>
                                            <Upload size={20} color="#718096" />
                                            <span style={{ fontWeight: 700 }}>Upload Supplier Bill (Photo/PDF)</span>
                                            <span style={{ fontSize: 10, color: '#A0AEC0' }}>Supports JPG, PNG, PDF</span>
                                        </label>
                                    </div>
                                )}
                            </div>
                        )}

                        <button onClick={handleSave} className="btn btn-blue btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                            💾 Save Invoice
                        </button>
                    </div>
                </div>
            </div>

            {showPartyModal && (
                <div className="modal-overlay" onClick={() => { setShowPartyModal(false); setShowQuickAdd(false); }}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 480 }}>
                        <div style={{ padding: '16px 20px', borderBottom: '1px solid #E1E4E8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h3 style={{ fontWeight: 900, fontSize: 17, color: '#1A1A2E' }}>Select Party</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <button onClick={() => { setShowQuickAdd(!showQuickAdd); setPartySearch(''); }} className="btn btn-ghost btn-sm" style={{ color: '#4285F4', fontWeight: 800, padding: '4px 8px', fontSize: 12 }}>
                                    {showQuickAdd ? 'Search List' : `+ Add ${isPurchaseFlow ? 'Supplier' : 'Customer'}`}
                                </button>
                                <button onClick={() => { setShowPartyModal(false); setShowQuickAdd(false); }} className="btn btn-ghost btn-icon"><X size={18} /></button>
                            </div>
                        </div>
                        {showQuickAdd ? (
                            <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
                                <h4 style={{ fontWeight: 800, fontSize: 14, color: '#1A1A2E', margin: 0 }}>Add New {isPurchaseFlow ? 'Supplier' : 'Customer'}</h4>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#718096', display: 'block', marginBottom: 4 }}>Name *</label>
                                    <input className="e-input" placeholder="Enter name" value={quickName} onChange={e => setQuickName(e.target.value)} />
                                </div>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#718096', display: 'block', marginBottom: 4 }}>Phone</label>
                                    <input className="e-input" placeholder="Enter phone number" value={quickPhone} onChange={e => setQuickPhone(e.target.value)} />
                                </div>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#718096', display: 'block', marginBottom: 4 }}>GST Number (Optional)</label>
                                    <input className="e-input" placeholder="Enter GSTIN" value={quickGst} onChange={e => setQuickGst(e.target.value.toUpperCase())} style={{ fontFamily: 'monospace', letterSpacing: '0.08em' }} />
                                </div>
                                <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                                    <button onClick={() => { setShowQuickAdd(false); setQuickName(''); setQuickPhone(''); setQuickGst(''); }} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                                    <button onClick={handleQuickAddParty} className="btn btn-blue" style={{ flex: 1 }}>Save &amp; Select</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div style={{ padding: '14px 20px', borderBottom: '1px solid #F1F3F5' }}>
                                    <div style={{ position: 'relative' }}>
                                        <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#A0AEC0' }} />
                                        <input className="e-input" autoFocus placeholder="Search name or phone…" value={partySearch} onChange={e => setPartySearch(e.target.value)} style={{ paddingLeft: 34 }} />
                                    </div>
                                </div>
                                <div style={{ overflowY: 'auto', flex: 1 }} className="modal-scroll-body">
                                    {filteredParties.map((p: any) => {
                                        const charCodeSum = p.name.split('').reduce((sum: number, char: string) => sum + char.charCodeAt(0), 0);
                                        const bgColors = ['#E8F0FE', '#E6F4EA', '#FCE8E6', '#FEF7E0', '#F3E8FF', '#E1F5FE'];
                                        const textColors = ['#1967D2', '#137333', '#C5221F', '#B06000', '#7C3AED', '#0288D1'];
                                        const colorIdx = charCodeSum % bgColors.length;
                                        return (
                                            <button key={p.id} onClick={() => { setPartyId(p.id); setPartyName(p.name); setPartyPhone(p.phone); setPartyGst(p.gstNumber || ''); setShowPartyModal(false); }}
                                                className="party-select-row"
                                                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', background: 'none', border: 'none', borderBottom: '1px solid #F8F9FA', cursor: 'pointer', textAlign: 'left', transition: 'background 0.12s' }}>
                                                <div style={{ width: 36, height: 36, borderRadius: 10, background: bgColors[colorIdx], display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: textColors[colorIdx], flexShrink: 0 }}>{p.name[0]}</div>
                                                <div style={{ flex: 1 }}>
                                                    <p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A2E' }}>{p.name}</p>
                                                    <p style={{ fontSize: 11, color: '#A0AEC0' }}>{p.phone}</p>
                                                </div>
                                                <span style={{
                                                    fontSize: 11,
                                                    fontWeight: 800,
                                                    color: p.balance > 0 ? '#10B981' : p.balance < 0 ? '#EF4444' : '#718096',
                                                    background: p.balance > 0 ? '#E6F4EA' : p.balance < 0 ? '#FCE8E6' : '#EDF2F7',
                                                    padding: '4px 10px',
                                                    borderRadius: 8,
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: 4
                                                }}>
                                                    {p.balance > 0 ? `To Receive: ₹${p.balance.toLocaleString('en-IN')}` : p.balance < 0 ? `To Pay: ₹${Math.abs(p.balance).toLocaleString('en-IN')}` : '₹0'}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </>
                        )}
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

            {showRecurringModal && (() => {
                const recurringTypeToShow = isPurchaseFlow ? 'purchase' : 'sale';
                const recurringInvoices = invoices.filter((inv: any) => inv.companyId === companyId && inv.invoiceType === recurringTypeToShow);
                return (
                    <div className="modal-overlay" onClick={() => setShowRecurringModal(false)}>
                        <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 520 }}>
                            <div style={{ padding: '16px 20px', borderBottom: '1px solid #E1E4E8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <h3 style={{ fontWeight: 900, fontSize: 17, color: '#1A1A2E' }}>Recurring Bills ({isPurchaseFlow ? 'Purchase Bills' : 'Sales Invoices'})</h3>
                                <button onClick={() => setShowRecurringModal(false)} className="btn btn-ghost btn-icon"><X size={18} /></button>
                            </div>
                            <div style={{ overflowY: 'auto', flex: 1, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }} className="modal-scroll-body">
                                {recurringInvoices.length === 0 ? (
                                    <div style={{ textAlign: 'center', color: '#A0AEC0', padding: '30px 20px', fontSize: 13 }}>No previous {isPurchaseFlow ? 'purchase bills' : 'sales invoices'} found.</div>
                                ) : (
                                    recurringInvoices
                                        .slice(0, 15)
                                        .map((inv: any) => (
                                            <div key={inv.id} style={{ padding: 12, border: '1px solid #E2E8F0', borderRadius: 10, display: 'flex', flexDirection: 'column', gap: 6, background: '#FAFAFA' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                    <div>
                                                        <span style={{ fontWeight: 800, fontSize: 13, color: '#1A1A2E' }}>{inv.partyName || 'Walk-in'}</span>
                                                        {inv.partyPhone && <span style={{ fontSize: 11, color: '#718096', marginLeft: 6 }}>({inv.partyPhone})</span>}
                                                    </div>
                                                    <span style={{ fontSize: 12, fontWeight: 900, color: '#4285F4' }}>₹{inv.grandTotal.toLocaleString('en-IN')}</span>
                                                </div>
                                                <div style={{ fontSize: 11, color: '#718096', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {inv.items.map((it: any) => `${it.name} (${it.qty} ${it.unit})`).join(', ')}
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, paddingTop: 6, borderTop: '1px solid #F1F3F5' }}>
                                                    <div style={{ display: 'flex', gap: 6 }}>
                                                        <span className={`badge ${inv.paymentStatus === 'paid' ? 'badge-green' : inv.paymentStatus === 'partial' ? 'badge-yellow' : 'badge-red'}`} style={{ fontSize: 9 }}>
                                                            {inv.paymentStatus}
                                                        </span>
                                                        {inv.balanceDue > 0 && (
                                                            <span style={{ fontSize: 10, color: '#EA4335', fontWeight: 700 }}>
                                                                Due: ₹{inv.balanceDue.toLocaleString('en-IN')}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <button onClick={() => {
                                                        setItems(inv.items.map((it: any) => ({ ...it })));
                                                        if (inv.partyId) setPartyId(inv.partyId);
                                                        setPartyName(inv.partyName || '');
                                                        setPartyPhone(inv.partyPhone || '');
                                                        setPartyGst(inv.partyGst || '');
                                                        setNotes(inv.notes || '');
                                                        setShowRecurringModal(false);
                                                        toast.success('Bill items and party details loaded!');
                                                    }} className="btn btn-blue btn-sm" style={{ padding: '4px 10px', fontSize: 11 }}>
                                                        Load Bill
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                )}
                            </div>
                        </div>
                    </div>
                );
            })()}

            <style>{`
                .party-select-row:hover { background: #F4F6F9 !important; }
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
