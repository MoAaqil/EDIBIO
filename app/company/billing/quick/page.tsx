'use client';
import { useState, useRef, useEffect, useCallback, Suspense, memo } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useStore, useActiveCompany, useCompanyData } from '@/lib/store';
import { calcLineItem, r2, roundOff, INDIAN_STATES } from '@/lib/utils';
import type { InvoiceLineItem } from '@/lib/types';
import { Search, Plus, Trash2, X, RefreshCw, Printer, ChevronDown, Check, FileText, Image as ImageIcon, Calendar, Clock, Download, TrendingUp, Repeat } from 'lucide-react';
import toast from 'react-hot-toast';
import { InvoicePrintTemplate } from '@/components/InvoicePrintTemplate';
import { confirm } from '@/components/ConfirmDialog';

const emptyRow = (): InvoiceLineItem & { mfgDate?: string; mrp?: number; size?: string; barcode?: string } => ({
    name: '', barcode: '', hsnCode: '', mfgDate: '', mrp: 0, size: '',
    qty: 1, unit: 'Pcs', rate: 0, discount: 0, gstRate: 0,
    taxableAmt: 0, cgst: 0, sgst: 0, igst: 0, cess: 0, totalGst: 0, discountAmt: 0, amount: 0,
});


function QuickBillingContent() {
    const { activeCompanyId, logout, user } = useStore();
    const companyId = activeCompanyId;
    const router = useRouter();
    const company = useActiveCompany();
    const products = useCompanyData('products') as any[];
    const invoices = useCompanyData('invoices') as any[];
    const parties = useCompanyData('parties') as any[];
    const { addInvoice, nextInvoiceNumber, adjustStock } = useStore();

    useEffect(() => {
        const handlePopState = () => {
            if (user?.role === 'staff') {
                // logout();
                // router.replace('/login');
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [user, logout, router]);

    const [billType, setBillType] = useState<'CASH' | 'CREDIT'>('CASH');
    const [partyName, setPartyName] = useState('');
    const [partyPhone, setPartyPhone] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    const [stateOfSupply, setStateOfSupply] = useState('Tamil Nadu');
    const [counter, setCounter] = useState('Counter 1');

    const [items, setItems] = useState<any[]>([emptyRow()]);
    const [discountType, setDiscountType] = useState<'%' | 'Amt'>('%');
    const [discountVal, setDiscountVal] = useState('');
    const [roundOffEnabled, setRoundOffEnabled] = useState(true);
    const [roundOffVal, setRoundOffVal] = useState('0.00');
    const [description, setDescription] = useState('');
    const [showDesc, setShowDesc] = useState(false);

    // Time & date
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [time, setTime] = useState(new Date().toTimeString().slice(0, 5));

    const [savedBill, setSavedBill] = useState<any>(null);
    const [copies, setCopies] = useState(1);
    const [showPrintModal, setShowPrintModal] = useState(false);
    const [amountGiven, setAmountGiven] = useState('');

    // Custom Suggestions State
    const [activeRowIdx, setActiveRowIdx] = useState<number | null>(null);
    const [activeSuggestionIdx, setActiveSuggestionIdx] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

    // Action modal (Fetch/Refund)
    const [actionModal, setActionModal] = useState<{ isOpen: boolean, isRefund: boolean }>({ isOpen: false, isRefund: false });
    const [actionQuery, setActionQuery] = useState('');
    const [recurringModalOpen, setRecurringModalOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'F12') {
                e.preventDefault();
                setShowPrintModal(true);
            }
            if (e.key === 'Enter' && e.shiftKey) {
                e.preventDefault();
                setItems(prev => [...prev, emptyRow()]);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleFetchBill = (isRefund = false) => {
        setActionModal({ isOpen: true, isRefund });
        setActionQuery('');
    };

    const executeAction = () => {
        const q = actionQuery.trim();
        if (!q) return;
        const inv = invoices.find(i => i.invoiceNumber.toLowerCase() === q.toLowerCase() || i.id === q);
        if (inv) {
            setPartyName(inv.partyName);
            setPartyPhone(inv.partyPhone || '');
            setBillingAddress(inv.billingAddress || '');
            setStateOfSupply(inv.stateOfSupply || 'Tamil Nadu');
            setItems(inv.items.map((it: any) => ({
                ...it,
                qty: actionModal.isRefund ? -Math.abs(it.qty) : Math.abs(it.qty), // Negative qty for refund
                amount: actionModal.isRefund ? -Math.abs(it.amount) : Math.abs(it.amount)
            })));
            setDiscountVal(inv.totalDiscount.toString());
            setDiscountType('Amt');
            toast.success(`Bill ${actionModal.isRefund ? 'refunded' : 'fetched'} successfully!`);
            setActionModal({ isOpen: false, isRefund: false });
        } else {
            toast.error('Invoice not found!');
        }
    };


    const updateItem = (idx: number, k: string, v: any) => {
        setItems(prev => prev.map((item, i) => {
            if (i !== idx) return item;
            const upd = { ...item, [k]: v };

            // Auto complete product if entering name or barcode
            if (k === 'name' || k === 'barcode') {
                if (typeof v === 'string' && v.trim() !== '') {
                    // Filter suggestions
                    const searchTerm = v.toLowerCase();
                    const matches = products.filter(p => 
                        p.name.toLowerCase().includes(searchTerm) || 
                        (p.barcode && p.barcode.includes(searchTerm)) ||
                        (p.category && p.category.toLowerCase().includes(searchTerm))
                    ).slice(0, 10);
                    
                    if (k === 'name') {
                        setFilteredProducts(matches);
                        setShowSuggestions(matches.length > 0);
                        setActiveRowIdx(idx);
                        setActiveSuggestionIdx(0);
                    }

                    const prod = products.find(p => (k === 'name' && p.name.toLowerCase() === v.toLowerCase()) || (k === 'barcode' && p.barcode === v));
                    if (prod) {
                        upd.name = prod.name;
                        upd.barcode = prod.barcode || '';
                        upd.hsnCode = prod.hsnCode || '';
                        upd.mrp = prod.mrp || prod.sellingPrice || 0;
                        upd.rate = prod.sellingPrice || 0;
                        upd.gstRate = prod.gstRate || 0;
                        upd.unit = prod.unit || 'Pcs';
                        setShowSuggestions(false);
                    }
                } else if (k === 'name') {
                    setShowSuggestions(false);
                }
            }

            const q = parseFloat(upd.qty) || 0;
            const r = parseFloat(upd.rate) || 0;
            const d = parseFloat(upd.discount) || 0;
            const g = parseFloat(upd.gstRate) || 0;
            const calc = calcLineItem(q, r, d, g as any);
            return { ...upd, ...calc };
        }));
    };

    const selectProduct = (idx: number, prod: any) => {
        updateItem(idx, 'name', prod.name);
        setShowSuggestions(false);
    };

    const addRow = () => setItems(prev => [...prev, emptyRow()]);
    const removeRow = (idx: number) => {
        if (items.length > 1) {
            setItems(prev => prev.filter((_, i) => i !== idx));
        } else {
            setItems([emptyRow()]);
        }
    };

    const validItems = items.filter(i => i.name.trim() !== '' && i.qty > 0 && i.rate > 0);
    const subTotal = r2(validItems.reduce((a, i) => a + i.taxableAmt, 0));
    const totalGst = r2(validItems.reduce((a, i) => a + i.totalGst, 0));
    const preDiscountSum = subTotal + totalGst;

    const dVal = parseFloat(discountVal) || 0;
    const globalDiscount = discountType === '%' ? r2(preDiscountSum * dVal / 100) : dVal;

    const afterDiscount = preDiscountSum - globalDiscount;
    const roCalculated = roundOffEnabled ? roundOff(afterDiscount) : parseFloat(roundOffVal) || 0;

    // Effect to auto update roundOffVal display to match auto calc if enabled
    useEffect(() => {
        if (roundOffEnabled) setRoundOffVal(roCalculated.toFixed(2));
    }, [roCalculated, roundOffEnabled]);

    const grandTotal = r2(afterDiscount + (parseFloat(roundOffVal) || 0));

    const handleSave = () => {
        if (validItems.length === 0) { toast.error('Add at least one complete row (Name, Qty, Price)'); return false; }

        const finalPartyName = partyName.trim() || 'Cash / Walk-in Customer';

        const invNo = nextInvoiceNumber(companyId!, 'MN');
        const invoice = {
            id: 'mb_' + Date.now().toString(36),
            companyId: companyId!,
            invoiceType: 'sale',
            invoiceNumber: invNo,
            date, time,
            stateOfSupply,
            partyName: finalPartyName, partyPhone, billingAddress,
            items: validItems,
            subTotal, taxableAmount: subTotal,
            totalCgst: r2(validItems.reduce((a, i) => a + i.cgst, 0)),
            totalSgst: r2(validItems.reduce((a, i) => a + i.sgst, 0)),
            totalIgst: 0, totalCess: 0, totalGst,
            totalDiscount: globalDiscount + r2(validItems.reduce((a, i) => a + i.discountAmt, 0)), // global + line items
            roundOff: parseFloat(roundOffVal) || 0,
            grandTotal,
            paymentStatus: billType === 'CASH' ? 'paid' : 'unpaid',
            amountPaid: billType === 'CASH' ? grandTotal : 0,
            balanceDue: billType === 'CASH' ? 0 : grandTotal,
            paymentMethod: 'cash',
            isGstBill: validItems.some(i => i.gstRate > 0),
            isHidden: false,
            notes: description,
            counter,
            createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        };
        addInvoice(invoice as any);
        // Adjust stock based on transaction type
        if (invoice.invoiceType === 'sale') {
            validItems.forEach(item => { if (item.productId) adjustStock(item.productId, -item.qty); });
        } else if (invoice.invoiceType === 'purchase') {
            validItems.forEach(item => { if (item.productId) adjustStock(item.productId, item.qty); });
        }
        setSavedBill(invoice as any);
        return true;
    };

    const handlePrintRequest = () => {
        if (validItems.length === 0) { toast.error('Add items first!'); return; }
        setCopies(2); // Request specifies print 2 copies
        setShowPrintModal(true);
    };

    const executePrint = () => {
        if (!savedBill) {
            const success = handleSave();
            if (!success) return;
        }

        const partyPhoneToUse = savedBill?.partyPhone || partyPhone;
        const currentBill = savedBill || invoices.find(i => i.invoiceNumber === nextInvoiceNumber(companyId!, 'MN')) || { items: validItems, invoiceNumber: nextInvoiceNumber(companyId!, 'MN'), grandTotal, balanceDue: billType === 'CASH' ? 0 : grandTotal };

        if (partyPhoneToUse) {
            let itemsText = '';
            currentBill.items.forEach((item: any) => {
                itemsText += `• ${item.name} (${item.qty} ${item.unit}) - ₹${item.amount.toLocaleString('en-IN')}\n`;
            });
            const bal = currentBill.balanceDue || 0;
            const msg = `*${company?.name || 'Tax Invoice'}*\n\nHello ${partyName || 'Customer'},\nHere is your bill summary (Inv: ${currentBill.invoiceNumber}):\nDate: ${date} ${time}\n\n*Items Purchased:*\n${itemsText}\n*Total Amount:* ₹${currentBill.grandTotal.toLocaleString('en-IN')}\n${bal > 0 ? `\n*Please clear the due balance:* ₹${bal.toLocaleString('en-IN')}\n` : ''}\nThanks for shopping with us!\n\n_Powered by Edibio_`;

            setTimeout(() => {
                window.open(`https://wa.me/91${partyPhoneToUse.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
            }, 300);
        }

        setShowPrintModal(false);
        setTimeout(() => window.print(), partyPhoneToUse ? 800 : 300);
    };

    if (savedBill && !showPrintModal) {
        return (
            <div style={{ background: '#f8f9fa', minHeight: '100dvh' }}>
                <div className="print-only">
                    <InvoicePrintTemplate invoice={savedBill} company={company} copies={copies} themeOverride={company?.quickBillingTheme || 'quick_bill'} />
                </div>

                <div className="no-print" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: 20 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 12, color: '#1A202C' }}>Bill Generated Successfully!</h2>
                    <p style={{ fontSize: 16, color: '#718096', marginBottom: 32 }}>Invoice {savedBill.invoiceNumber} has been saved to the database.</p>

                    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 900 }}>
                        {/* Google Ad Simulator / Space */}
                        <div style={{ width: 320, background: 'white', borderRadius: 20, boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
                            <div style={{ height: 160, background: '#F7FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #E2E8F0' }}>
                                <span style={{ color: '#A0AEC0', fontWeight: 700, fontSize: 13, letterSpacing: 1 }}>ADVERTISEMENT</span>
                            </div>
                            <div style={{ padding: 20 }}>
                                <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 8, color: '#2D3748' }}>Grow Your Business Locally</h3>
                                <p style={{ fontSize: 13, color: '#718096', lineHeight: 1.5 }}>Reach more customers in your area with Google Ads. Start now and get $500 free ad credit.</p>
                                <button style={{ marginTop: 16, width: '100%', padding: '10px', background: '#4285F4', color: 'white', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Start Advertising</button>
                            </div>
                        </div>

                        {/* Edibio Premium Poster */}
                        <div style={{ width: 320, padding: 32, background: 'linear-gradient(135deg, #1A1A2E, #FF7F50)', borderRadius: 20, boxShadow: '0 20px 40px rgba(255,127,80,0.2)', textAlign: 'center', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
                            <span style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-1px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 16 }}>
                                edibio<span style={{ color: '#2D3748' }}>.</span>
                            </span>
                            <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 12, lineHeight: 1.2 }}>Upgrade to Edibio Pro</h2>
                            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, margin: 0 }}>
                                Unlock deeper analytics, AI insights, unlimited staff accounts, and priority VIP support today.
                            </p>
                            <button style={{ marginTop: 24, width: '100%', padding: '12px', background: 'white', color: '#1A1A2E', border: 'none', borderRadius: 8, fontWeight: 800, cursor: 'pointer' }}>Upgrade Now</button>
                        </div>
                    </div>
                </div>

                <div className="no-print" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: 20, background: 'white', borderTop: '1px solid #ddd', display: 'flex', justifyContent: 'center', gap: 16 }}>
                    <button onClick={() => setShowPrintModal(true)} className="mi-btn" style={{ border: '1px solid #E2E8F0', padding: '10px 20px', background: 'white', cursor: 'pointer' }}><Printer size={16} /> Print</button>
                    <button onClick={() => { setSavedBill(null); setItems([emptyRow(), emptyRow()]); setPartyName(''); setPartyPhone(''); setBillingAddress(''); setDiscountVal(''); }} className="mi-btn" style={{ background: '#4285F4', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer' }}><Plus size={16} /> New Bill</button>
                    <button onClick={() => router.push(`/company/dashboard`)} className="mi-btn" style={{ background: 'transparent', padding: '10px 20px', border: 'none', cursor: 'pointer', fontWeight: 700 }}>Back to Dashboard</button>
                </div>
                <style>{`
            @media print {
              body * { visibility: hidden; }
              .print-only, .print-only * { visibility: visible; }
              .print-only { position: absolute; left: 0; top: 0; width: 100%; display: block !important; }
              .no-print { display: none !important; }
            }
            .print-only { display: none; }
          `}</style>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100dvh', background: '#F8F9FA', fontFamily: 'Inter, sans-serif' }}>
            {/* Print template (hidden normally) */}
            <div className="print-only">
                {savedBill ? <InvoicePrintTemplate invoice={savedBill} company={company} copies={copies} themeOverride={company?.quickBillingTheme || 'quick_bill'} /> :
                    (validItems.length > 0 ? <InvoicePrintTemplate invoice={{
                        partyName: partyName || 'Cash / Walk-in Customer', partyPhone, billingAddress, date, invoiceNumber: nextInvoiceNumber(companyId as string, 'MN'),
                        items: validItems, grandTotal, totalDiscount: globalDiscount, roundOff: parseFloat(roundOffVal) || 0, subTotal, totalGst
                    }} company={company} copies={copies} themeOverride={company?.quickBillingTheme || 'quick_bill'} /> : null)}
            </div>
            <style>{`
        @media print {
            body * { visibility: hidden; }
            .print-only, .print-only * { visibility: visible; }
            .print-only { position: absolute; left: 0; top: 0; width: 100%; display: block !important; }
            .no-print { display: none !important; }
        }
        .print-only { display: none; }
        
        .mi-input {
            border: 1px solid #E2E8F0;
            border-radius: 6px;
            padding: 8px 12px;
            font-size: 13px;
            outline: none;
            width: 100%;
            transition: border-color 0.2s;
            color: #1A202C;
        }
        .mi-input:focus { border-color: #4285F4; }
        .mi-input.error { border-color: #FC8181; background: #FFF5F5; }
        
        .mi-table { width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
        .mi-table th { background: white; border-bottom: 1.5px solid #EDF2F7; padding: 12px 8px; font-size: 11px; font-weight: 800; color: #4A5568; text-transform: uppercase; text-align: left; }
        .mi-table td { padding: 4px; border-bottom: 1px solid #EDF2F7; }
        .mi-table input { width: 100%; border: none; background: transparent; outline: none; padding: 8px 4px; font-size: 13px; color: #1A202C; }
        .mi-table input:focus { background: #EBF8FF; border-radius: 4px; }
        
        .mi-btn { padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 700; cursor: pointer; display: inline-flex; items: center; gap: 6px; border: 1px solid transparent; background: white; color: 4A5568; }
        .mi-btn:hover { background: #F7FAFC; }

        @media (max-width: 768px) {
            .mobile-flex-col { flex-direction: column !important; }
            .mobile-w-full { width: 100% !important; }
            .mobile-hide { display: none !important; }
            .no-print { padding: 16px !important; }
            .mi-table input { min-width: 60px; }
            .mi-table input[placeholder="Search..."] { min-width: 140px; }
        }
      `}</style>

            <div className="no-print" style={{ padding: '24px 32px', maxWidth: 1440, margin: '0 auto' }}>

                {/* Top Header */}
                <datalist id="parties-list">
                    {parties.map(p => <option key={p.id || p.name} value={p.name}>{p.phone || p.id || ''}</option>)}
                </datalist>

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', flex: 1 }}>
                        <h1 style={{ fontSize: 20, fontWeight: 900, color: '#1A202C', margin: 0, minWidth: '140px' }}>Manual Invoice</h1>

                        <select value={counter} onChange={e => setCounter(e.target.value)} className="e-select" style={{ width: 'auto', padding: '6px 10px', fontSize: 13, background: 'white', borderRadius: 8 }}>
                            <option>Counter 1</option>
                            <option>Counter 2</option>
                            <option>Counter 3</option>
                            <option>Counter 4</option>
                        </select>

                        <div style={{ display: 'flex', background: '#EDF2F7', borderRadius: 8, padding: 4 }}>
                            <button onClick={() => setBillType('CASH')} style={{ padding: '6px 16px', borderRadius: 6, border: 'none', background: billType === 'CASH' ? 'white' : 'transparent', color: billType === 'CASH' ? '#38A169' : '#718096', fontWeight: 800, fontSize: 12, cursor: 'pointer', boxShadow: billType === 'CASH' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>CASH</button>
                            <button onClick={() => setBillType('CREDIT')} style={{ padding: '6px 16px', borderRadius: 6, border: 'none', background: billType === 'CREDIT' ? 'white' : 'transparent', color: billType === 'CREDIT' ? '#1A202C' : '#718096', fontWeight: 800, fontSize: 12, cursor: 'pointer', boxShadow: billType === 'CREDIT' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>CREDIT</button>
                        </div>

                        <button onClick={() => handleFetchBill(true)} className="mi-btn" style={{ border: '1px solid #E2E8F0', padding: '6px 14px' }}><RefreshCw size={14} /> Refund</button>
                        <button onClick={() => handleFetchBill(false)} className="mi-btn" style={{ border: '1px solid #E2E8F0', padding: '6px 14px' }}><Search size={14} /> Fetch</button>
                        <button onClick={() => setRecurringModalOpen(true)} className="mi-btn" style={{ border: '1px solid transparent', background: '#EBF4FF', color: '#3182CE', padding: '6px 14px', marginLeft: 8 }}><Repeat size={14} /> Recurring Bill</button>
                        <button onClick={() => router.push(`${activeCompanyId ? '/company' : ''}/billing/expenditure`)} className="mi-btn" style={{ border: '1px solid transparent', background: '#FEEBC8', color: '#DD6B20', padding: '6px 14px', marginLeft: 8 }}>
                            <TrendingUp size={14} /> Expenditure
                        </button>
                    </div>

                    <button className="mobile-hide" onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
                        <X size={20} color="#718096" />
                    </button>
                </div>

                {/* Form area */}
                <div className="mobile-flex-col" style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
                    {/* Left info */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={{ display: 'flex', gap: 12 }}>
                            <input list="parties-list" value={partyName} onChange={e => {
                                const val = e.target.value;
                                setPartyName(val);
                                const p = parties.find(pt => String(pt.name).toLowerCase() === val.toLowerCase());
                                if (p) {
                                    setPartyPhone(p.phone || p.mobile || p.id || '');
                                    setBillingAddress(p.billingAddress || p.address || '');
                                }
                            }} placeholder="Customer Name *" className={`mi-input ${!partyName ? 'error' : ''}`} style={{ flex: 1 }} />
                            <input value={partyPhone} onChange={e => {
                                const val = e.target.value;
                                setPartyPhone(val);
                                const searchVal = val.toLowerCase().trim();
                                const p = parties.find((p: any) => String(p.phone).toLowerCase() === searchVal || String(p.mobile).toLowerCase() === searchVal || String(p.id).toLowerCase() === searchVal);
                                if (p) {
                                    setPartyName(p.name || '');
                                    setBillingAddress(p.billingAddress || p.address || '');
                                } else {
                                    const inv = invoices.find((i: any) => String(i.partyPhone).toLowerCase() === searchVal || String(i.partyId).toLowerCase() === searchVal);
                                    if (inv) {
                                        setPartyName(inv.partyName);
                                        setBillingAddress(inv.billingAddress || '');
                                    }
                                }
                            }} placeholder="Phone No. or ID" className="mi-input" style={{ flex: 1 }} />
                        </div>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                            <textarea value={billingAddress} onChange={e => setBillingAddress(e.target.value)} placeholder="Billing Address" className="mi-input" style={{ resize: 'none', height: 40, flex: 1 }} />
                            {partyName && invoices.some(i => i.partyName === partyName || i.partyPhone === partyPhone) && (
                                <button onClick={() => setRecurringModalOpen(true)} className="mi-btn" style={{ height: 40, background: '#EBF4FF', color: '#3182CE', border: 'none', whiteSpace: 'nowrap' }}>
                                    <Repeat size={14} /> Last Purchases
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Right info */}
                    <div className="mobile-w-full" style={{ width: 320, background: 'transparent', display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 12, color: '#718096', fontWeight: 600 }}>Invoice Number</span>
                            <span style={{ fontSize: 13, color: '#A0AEC0', fontWeight: 700 }}>{nextInvoiceNumber(companyId as string, 'MN')}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 12, color: '#718096', fontWeight: 600 }}>Invoice Date</span>
                            <div style={{ position: 'relative' }}>
                                <input type="date" value={date} onChange={e => setDate(e.target.value)} className="mi-input" style={{ padding: '4px 8px', width: 130, paddingRight: 30 }} />
                                <Calendar size={14} color="#A0AEC0" style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 12, color: '#718096', fontWeight: 600 }}>Time</span>
                            <div style={{ position: 'relative' }}>
                                <input type="time" value={time} onChange={e => setTime(e.target.value)} className="mi-input" style={{ padding: '4px 8px', width: 130, paddingRight: 30 }} />
                                <Clock size={14} color="#A0AEC0" style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 12, color: '#718096', fontWeight: 600 }}>State of supply</span>
                            <select value={stateOfSupply} onChange={e => setStateOfSupply(e.target.value)} className="mi-input" style={{ padding: '4px 8px', width: 130 }}>
                                {INDIAN_STATES.map(s => <option key={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table area */}
                <div style={{ border: '1px solid #E2E8F0', borderRadius: 12, background: 'white', overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 16 }}>
                    <table className="mi-table" style={{ border: 'none', borderRadius: 0, boxShadow: 'none' }}>
                        <thead>
                            <tr>
                                <th style={{ width: 40, textAlign: 'center' }}>#</th>
                                <th style={{ width: '15%' }}>ITEM</th>
                                <th>BARCODE</th>
                                <th>HSN</th>
                                <th>MFG. DATE</th>
                                <th style={{ textAlign: 'right' }}>MRP</th>
                                <th style={{ textAlign: 'center' }}>SIZE</th>
                                <th style={{ textAlign: 'center', width: 60 }}>QTY</th>
                                <th style={{ textAlign: 'center', width: 60 }}>UNIT</th>
                                <th style={{ textAlign: 'right', width: 80 }}>PRICE</th>
                                <th style={{ textAlign: 'center', color: '#4285F4' }}>DISCOUNT<br />%<span style={{ display: 'inline-block', width: 20 }} />AMT</th>
                                <th style={{ textAlign: 'center', color: '#4285F4' }}>TAX<br />%<span style={{ display: 'inline-block', width: 20 }} />AMT</th>
                                <th style={{ textAlign: 'right', width: 100 }}>AMOUNT</th>
                                <th style={{ textAlign: 'center', width: 40 }}>ACT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, i) => (
                                <tr key={i}>
                                    <td style={{ textAlign: 'center', fontSize: 12, color: '#A0AEC0' }}>{i + 1}</td>
                                    <td style={{ position: 'relative' }}>
                                        <input 
                                            id={`name-input-${i}`} 
                                            value={item.name} 
                                            autoComplete="off"
                                            onChange={e => updateItem(i, 'name', e.target.value)} 
                                            onFocus={() => {
                                                if (item.name.trim()) {
                                                    const matches = products.filter(p => p.name.toLowerCase().includes(item.name.toLowerCase())).slice(0, 10);
                                                    setFilteredProducts(matches);
                                                    setShowSuggestions(matches.length > 0);
                                                    setActiveRowIdx(i);
                                                }
                                            }}
                                            onBlur={() => setTimeout(() => { if (activeRowIdx === i) setShowSuggestions(false); }, 200)}
                                            onKeyDown={e => {
                                                if (showSuggestions && activeRowIdx === i) {
                                                    if (e.key === 'ArrowDown') {
                                                        e.preventDefault();
                                                        setActiveSuggestionIdx(s => (s + 1) % filteredProducts.length);
                                                    } else if (e.key === 'ArrowUp') {
                                                        e.preventDefault();
                                                        setActiveSuggestionIdx(s => (s - 1 + filteredProducts.length) % filteredProducts.length);
                                                    } else if (e.key === 'Enter' || e.key === 'Tab') {
                                                        if (filteredProducts[activeSuggestionIdx]) {
                                                            e.preventDefault();
                                                            selectProduct(i, filteredProducts[activeSuggestionIdx]);
                                                            return;
                                                        }
                                                    } else if (e.key === 'Escape') {
                                                        setShowSuggestions(false);
                                                    }
                                                }

                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    if (i === items.length - 1) {
                                                        setItems(prev => {
                                                            const nextRows = [...prev, emptyRow()];
                                                            setTimeout(() => { document.getElementById(`name-input-${i + 1}`)?.focus(); }, 100);
                                                            return nextRows;
                                                        });
                                                    } else {
                                                        setTimeout(() => { document.getElementById(`name-input-${i + 1}`)?.focus(); }, 50);
                                                    }
                                                }
                                            }} 
                                            placeholder="Search product..." 
                                        />
                                        
                                        {showSuggestions && activeRowIdx === i && (
                                            <div className="custom-dropdown" style={{
                                                position: 'absolute', top: '100%', left: 0, width: '280px', background: 'white',
                                                boxShadow: '0 10px 25px rgba(0,0,0,0.15)', borderRadius: '12px', zIndex: 100,
                                                marginTop: 4, overflow: 'hidden', border: '1px solid #E2E8F0', padding: '6px'
                                            }}>
                                                {filteredProducts.map((p, pIdx) => (
                                                    <div 
                                                        key={p.id || p.name} 
                                                        onClick={() => selectProduct(i, p)}
                                                        onMouseEnter={() => setActiveSuggestionIdx(pIdx)}
                                                        style={{
                                                            padding: '10px 14px', cursor: 'pointer', borderRadius: '8px',
                                                            background: activeSuggestionIdx === pIdx ? '#4285F4' : 'transparent',
                                                            color: activeSuggestionIdx === pIdx ? 'white' : '#1A202C',
                                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.1s'
                                                        }}
                                                    >
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                                            <span style={{ fontWeight: 700, fontSize: 13 }}>{p.name}</span>
                                                            <span style={{ fontSize: 10, opacity: activeSuggestionIdx === pIdx ? 0.8 : 0.5 }}>₹{p.sellingPrice} • {p.stockQty} in stock</span>
                                                        </div>
                                                        {p.barcode && <span style={{ fontSize: 9, fontFamily: 'monospace', background: activeSuggestionIdx === pIdx ? 'rgba(255,255,255,0.2)' : '#F1F5F9', padding: '2px 4px', borderRadius: 4 }}>{p.barcode}</span>}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </td>
                                    <td><input id={`barcode-input-${i}`} value={item.barcode} autoComplete="off" onChange={e => updateItem(i, 'barcode', e.target.value)} onKeyDown={e => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            if (i === items.length - 1) {
                                                setItems(prev => {
                                                    const nextRows = [...prev, emptyRow()];
                                                    // use a slightly longer timeout to guarantee render is complete
                                                    setTimeout(() => { document.getElementById(`barcode-input-${i + 1}`)?.focus(); }, 100);
                                                    return nextRows;
                                                });
                                            } else {
                                                setTimeout(() => { document.getElementById(`barcode-input-${i + 1}`)?.focus(); }, 50);
                                            }
                                        }
                                    }} /></td>
                                    <td><input value={item.hsnCode} onChange={e => updateItem(i, 'hsnCode', e.target.value)} /></td>
                                    <td><input type="date" value={item.mfgDate} onChange={e => updateItem(i, 'mfgDate', e.target.value)} style={{ padding: '8px 2px' }} /></td>
                                    <td><input type="number" value={item.mrp || ''} onChange={e => updateItem(i, 'mrp', parseFloat(e.target.value) || 0)} style={{ textAlign: 'right' }} /></td>
                                    <td><input value={item.size} onChange={e => updateItem(i, 'size', e.target.value)} style={{ textAlign: 'center' }} /></td>
                                    <td><input type="number" min="0" value={item.qty} onChange={e => updateItem(i, 'qty', e.target.value)} style={{ textAlign: 'center', fontWeight: 'bold' }} /></td>
                                    <td><input value={item.unit} onChange={e => updateItem(i, 'unit', e.target.value)} style={{ textAlign: 'center' }} /></td>
                                    <td><input type="number" min="0" value={item.rate || ''} onChange={e => updateItem(i, 'rate', e.target.value)} style={{ textAlign: 'right' }} /></td>
                                    <td style={{ textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                                            <input type="number" value={item.discount} onChange={e => updateItem(i, 'discount', e.target.value)} style={{ width: 40, padding: '4px', textAlign: 'center', borderBottom: '1px solid #ddd' }} />
                                            <input readOnly value={item.discountAmt.toFixed(2)} style={{ width: 50, padding: '4px', textAlign: 'center', color: '#A0AEC0' }} />
                                        </div>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                                            <input type="number" value={item.gstRate} onChange={e => updateItem(i, 'gstRate', e.target.value)} style={{ width: 40, padding: '4px', textAlign: 'center', borderBottom: '1px solid #ddd' }} />
                                            <input readOnly value={item.totalGst.toFixed(2)} style={{ width: 50, padding: '4px', textAlign: 'center', color: '#A0AEC0' }} />
                                        </div>
                                    </td>
                                    <td style={{ textAlign: 'right', fontWeight: 800, paddingRight: 16 }}>{item.amount.toFixed(2)}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        {items.length > 1 && (
                                            <button onClick={() => removeRow(i)} className="btn btn-ghost btn-icon" style={{ padding: 4, color: '#EA4335' }} title="Remove item">
                                                <Trash2 size={14} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ padding: '16px 20px 0' }}>
                        <button onClick={addRow} className="mi-btn" style={{ border: '2px solid #2D3748', color: '#2D3748', borderRadius: 8, padding: '6px 16px', fontWeight: 800 }}>
                            + ADD ROW
                        </button>
                    </div>
                </div>

                {/* Bottom controls */}
                <div className="mobile-flex-col" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24, gap: 24 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <button onClick={() => setShowDesc(!showDesc)} className="mi-btn" style={{ border: '1px solid #E2E8F0', padding: '10px 16px', background: 'white' }}><FileText size={16} /> ADD DESCRIPTION</button>
                            {showDesc && <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Invoice Desc / Notes..." className="mi-input" style={{ width: 200, height: 80, resize: 'none' }} />}
                        </div>
                        <button className="mi-btn" style={{ border: '1px solid #E2E8F0', padding: '10px 16px', background: 'white' }}><ImageIcon size={16} /> ADD IMAGE</button>
                    </div>

                    <div className="mobile-w-full" style={{ background: 'white', borderRadius: 12, border: '1px solid #E2E8F0', padding: 20, width: 380, display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 13, fontWeight: 700, color: '#4A5568' }}>Discount</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ border: '1px solid #E2E8F0', borderRadius: 6, display: 'flex', overflow: 'hidden' }}>
                                    <select value={discountType} onChange={e => setDiscountType(e.target.value as any)} style={{ border: 'none', background: '#F7FAFC', outline: 'none', padding: '4px 8px', fontSize: 12, borderRight: '1px solid #E2E8F0', cursor: 'pointer' }}>
                                        <option>%</option><option>Amt</option>
                                    </select>
                                    <input type="number" value={discountVal} onChange={e => setDiscountVal(e.target.value)} style={{ width: 80, border: 'none', outline: 'none', padding: '4px 8px', textAlign: 'right', fontSize: 13 }} placeholder="0" />
                                </div>
                                <span style={{ width: 60, textAlign: 'right', fontWeight: 800 }}>{globalDiscount.toFixed(2)}</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <button onClick={() => setRoundOffEnabled(!roundOffEnabled)} style={{ width: 22, height: 22, borderRadius: 6, border: roundOffEnabled ? 'none' : '1px solid #CBD5E0', background: roundOffEnabled ? '#4285F4' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    {roundOffEnabled && <Check size={14} color="white" />}
                                </button>
                                <span style={{ fontSize: 13, fontWeight: 700, color: '#4A5568' }}>Round Off</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <input value={roundOffVal} onChange={e => { setRoundOffEnabled(false); setRoundOffVal(e.target.value); }} style={{ width: 120, border: '1px solid #E2E8F0', borderRadius: 6, outline: 'none', padding: '4px 8px', textAlign: 'right', fontSize: 13 }} />
                                <span style={{ width: 60, textAlign: 'right', fontWeight: 800 }}>{parseFloat(roundOffVal || '0').toFixed(2)}</span>
                            </div>
                        </div>

                        <div style={{ background: '#E2E8F0', height: 1, margin: '4px 0' }} />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12 }}>
                            <div style={{ display: 'flex', border: '1.5px solid #CBD5E0', borderRadius: 8, overflow: 'hidden' }}>
                                <button onClick={handlePrintRequest} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 20px', background: 'white', border: 'none', color: '#4285F4', fontWeight: 800, cursor: 'pointer', fontSize: 14 }}>
                                    <Printer size={16} /> PRINT (F12)
                                </button>
                                <div style={{ width: 1, background: '#CBD5E0' }} />
                                <button style={{ padding: '0 10px', background: 'white', border: 'none', cursor: 'pointer', color: '#4A5568' }}>
                                    <ChevronDown size={14} />
                                </button>
                            </div>
                            <button onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '14px 32px', background: '#4285F4', color: 'white', borderRadius: 8, border: 'none', fontWeight: 900, fontSize: 14, cursor: 'pointer', boxShadow: '0 4px 12px rgba(66,133,244,0.3)' }}>
                                💾 SAVE INVOICE
                            </button>
                        </div>
                        {grandTotal > 0 && (
                            <>
                                <div style={{ textAlign: 'right', fontSize: 24, fontWeight: 900, color: '#1A202C', marginTop: 8 }}>
                                    ₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, padding: '12px', background: '#F8FAFC', borderRadius: 8, border: '1px solid #E2E8F0' }}>
                                    <span style={{ fontSize: 14, fontWeight: 800, color: '#4A5568' }}>Amount Given</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <input
                                            type="number"
                                            value={amountGiven}
                                            onChange={e => setAmountGiven(e.target.value)}
                                            style={{ width: 120, border: 'none', borderRadius: 6, outline: 'none', padding: '8px 12px', textAlign: 'right', fontSize: 16, fontWeight: 800, boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)' }}
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>
                                {amountGiven && parseFloat(amountGiven) > 0 && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 15, fontWeight: 900, padding: '0 12px' }}>
                                        <span style={{ color: '#4A5568' }}>Balance:</span>
                                        <span style={{ color: parseFloat(amountGiven) >= grandTotal ? '#38A169' : '#E53E3E' }}>
                                            {parseFloat(amountGiven) >= grandTotal ? '+' : ''}
                                            {(parseFloat(amountGiven) - grandTotal).toFixed(2)}
                                        </span>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Print Modal */}
                {showPrintModal && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }} onClick={() => setShowPrintModal(false)}>
                        <div onClick={e => e.stopPropagation()} style={{ background: 'white', padding: 32, borderRadius: 16, width: 360 }}>
                            <h3 style={{ fontWeight: 900, fontSize: 20, marginBottom: 24, textAlign: 'center' }}>Print Setup</h3>
                            <div style={{ marginBottom: 24 }}>
                                <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: '#4A5568', marginBottom: 12, textTransform: 'uppercase' }}>Number of Copies</label>
                                <div style={{ display: 'flex', gap: 12 }}>
                                    {[1, 2, 3].map(num => (
                                        <button key={num} onClick={() => setCopies(num)}
                                            style={{ flex: 1, padding: '12px', borderRadius: 12, border: '2px solid', borderColor: copies === num ? '#4285F4' : '#E2E8F0', background: copies === num ? '#E8F0FE' : 'white', cursor: 'pointer', fontWeight: 900, fontSize: 16, color: copies === num ? '#1967D2' : '#4A5568' }}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <button onClick={() => setShowPrintModal(false)} style={{ flex: 1, padding: '12px', borderRadius: 12, background: 'white', border: '2px solid #E2E8F0', fontWeight: 800, color: '#4A5568', cursor: 'pointer' }}>Cancel</button>
                                <button onClick={executePrint} style={{ flex: 1, padding: '12px', borderRadius: 12, background: '#4285F4', border: 'none', fontWeight: 800, color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><Printer size={16} /> Print</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Modal */}
                {actionModal.isOpen && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }} onClick={() => setActionModal({ isOpen: false, isRefund: false })}>
                        <div onClick={e => e.stopPropagation()} style={{ background: 'white', padding: 32, borderRadius: 16, width: 360, animation: 'fadeUp 0.2s ease' }}>
                            <h3 style={{ fontWeight: 900, fontSize: 18, marginBottom: 8, color: '#1A202C' }}>
                                {actionModal.isRefund ? 'Refund Invoice' : 'Fetch Invoice'}
                            </h3>
                            <p style={{ fontSize: 13, color: '#718096', marginBottom: 20 }}>
                                Enter the Invoice Number to proceed with {actionModal.isRefund ? 'refund' : 'fetching'}.
                            </p>
                            <input
                                autoFocus
                                value={actionQuery}
                                onChange={e => setActionQuery(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && executeAction()}
                                placeholder="e.g. MN1001"
                                className="mi-input"
                                style={{ marginBottom: 20, fontSize: 15, padding: '12px', fontWeight: 700 }}
                            />
                            <div style={{ display: 'flex', gap: 12 }}>
                                <button onClick={() => setActionModal({ isOpen: false, isRefund: false })} style={{ flex: 1, padding: '10px', borderRadius: 8, background: 'white', border: '1px solid #E2E8F0', fontWeight: 700, color: '#4A5568', cursor: 'pointer' }}>Cancel</button>
                                <button onClick={executeAction} style={{ flex: 1, padding: '10px', borderRadius: 8, background: '#4285F4', border: 'none', fontWeight: 700, color: 'white', cursor: 'pointer' }}>Confirm</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Recurring Bills Modal */}
                {recurringModalOpen && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }} onClick={() => setRecurringModalOpen(false)}>
                        <div onClick={e => e.stopPropagation()} style={{ background: 'white', padding: 32, borderRadius: 16, width: 500, animation: 'fadeUp 0.2s ease', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ fontWeight: 900, fontSize: 18, marginBottom: 8, color: '#1A202C' }}>Recurring Bills</h3>
                            <p style={{ fontSize: 13, color: '#718096', marginBottom: 20 }}>
                                Select a previous customer to quickly load their usual bill items.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto', flex: 1 }}>
                                {invoices.filter((v, i, a) => a.findIndex(t => (t.partyPhone === v.partyPhone && v.partyPhone)) === i).length === 0 && (
                                    <div style={{ textAlign: 'center', color: '#A0AEC0', padding: 20 }}>No previous bills found.</div>
                                )}
                                {invoices.filter((v, i, a) => a.findIndex(t => (t.partyPhone === v.partyPhone && v.partyPhone)) === i).slice(0, 15).map((inv: any) => (
                                    <div key={inv.id} style={{ padding: 12, border: '1px solid #E2E8F0', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 800, fontSize: 14 }}>{inv.partyName} {inv.partyPhone ? `(${inv.partyPhone})` : ''}</div>
                                            <div style={{ fontSize: 12, color: '#718096', marginTop: 4 }}>
                                                {inv.items.map((it: any) => it.name).join(', ')}
                                            </div>
                                        </div>
                                        <button onClick={() => {
                                            setPartyName(inv.partyName);
                                            setPartyPhone(inv.partyPhone || '');
                                            setBillingAddress(inv.billingAddress || '');
                                            setStateOfSupply(inv.stateOfSupply || 'Tamil Nadu');
                                            setItems(inv.items.map((it: any) => ({ ...it, qty: Math.abs(it.qty), amount: Math.abs(it.amount) })));
                                            setDiscountVal(inv.totalDiscount.toString());
                                            setDiscountType('Amt');
                                            setRecurringModalOpen(false);
                                        }} className="mi-btn" style={{ background: '#4285F4', color: 'white', border: 'none', marginLeft: 12 }}>Load Items</button>
                                    </div>
                                ))}
                            </div>

                            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                                <button onClick={() => setRecurringModalOpen(false)} style={{ flex: 1, padding: '10px', borderRadius: 8, background: 'white', border: '1px solid #E2E8F0', fontWeight: 700, color: '#4A5568', cursor: 'pointer' }}>Close</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function NewBillPage() {
    return <Suspense><QuickBillingContent /></Suspense>;
}
