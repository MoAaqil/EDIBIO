'use client';
import { useState, useRef, useEffect, useCallback, Suspense, memo, useMemo } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useStore, useActiveCompany, useCompanyData } from '@/lib/store';
import { calcLineItem, r2, roundOff, INDIAN_STATES } from '@/lib/utils';
import type { InvoiceLineItem } from '@/lib/types';
import { Search, Plus, Trash2, X, RefreshCw, Printer, ChevronDown, Check, FileText, Image as ImageIcon, Calendar, Clock, Download, TrendingUp, Repeat, PauseCircle, PlayCircle, Wallet, AlertCircle, Settings } from 'lucide-react';
import toast from 'react-hot-toast';
import { InvoicePrintTemplate } from '@/components/InvoicePrintTemplate';
import { confirm, ConfirmDialog } from '@/components/ConfirmDialog';

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
    const { addInvoice, nextInvoiceNumber, adjustStock, addParty, updateParty, updateInvoice, addBalancePayment, updateCompany } = useStore();

    const normPhone = useCallback((ph: string) => {
        const d = (ph || '').replace(/\D/g, '');
        return d.startsWith('91') && d.length > 10 ? d.slice(2) : d;
    }, []);

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
    const [showColumnConfig, setShowColumnConfig] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [tallyWithBalance, setTallyWithBalance] = useState(true);

    useEffect(() => {
        if (user && company?.team) {
            const matchingTeamMember = company.team.find(t => 
                t.contact === user.email || t.name === user.name
            );
            if (matchingTeamMember?.counter) {
                setCounter(matchingTeamMember.counter);
            }
        }
    }, [user, company?.team]);

    const cols = company?.quickBillingColumns || {
        barcode: true,
        hsn: true,
        mfgDate: true,
        mrp: true,
        size: true,
        discount: true,
        tax: true,
    };

    // Split payments
    const SPLIT_METHODS = [
        { key: 'cash', label: '💵 Cash', color: '#38A169' },
        { key: 'upi', label: '📱 UPI', color: '#6B46C1' },
        { key: 'card', label: '💳 Card', color: '#2B6CB0' },
        { key: 'bank', label: '🏦 Bank', color: '#C05621' },
        { key: 'cheque', label: '📝 Cheque', color: '#718096' },
    ] as const;
    const [splitPayments, setSplitPayments] = useState<{ method: string; amount: string }[]>([{ method: 'cash', amount: '' }]);
    const [useSplitPayment, setUseSplitPayment] = useState(false);


    // Custom Suggestions State
    const [activeRowIdx, setActiveRowIdx] = useState<number | null>(null);
    const [activeSuggestionIdx, setActiveSuggestionIdx] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

    const [actionModal, setActionModal] = useState<{ isOpen: boolean, isRefund: boolean }>({ isOpen: false, isRefund: false });
    const [actionQuery, setActionQuery] = useState('');
    const [recurringModalOpen, setRecurringModalOpen] = useState(false);

    const filteredPreviousInvoices = useMemo(() => {
        const list = invoices.filter(inv => inv.companyId === companyId);
        list.sort((a, b) => {
            const dateA = new Date(a.date).getTime() || 0;
            const dateB = new Date(b.date).getTime() || 0;
            if (dateB !== dateA) return dateB - dateA;
            return (b.invoiceNumber || '').localeCompare(a.invoiceNumber || '');
        });

        const q = actionQuery.trim().toLowerCase();
        if (!q) return list.slice(0, 10);

        return list.filter(inv => 
            inv.invoiceNumber.toLowerCase().includes(q) ||
            inv.partyName.toLowerCase().includes(q) ||
            (inv.partyPhone && inv.partyPhone.includes(q))
        ).slice(0, 10);
    }, [invoices, companyId, actionQuery]);

    // Suspended bills
    const [suspendedBills, setSuspendedBills] = useState<any[]>(() => {
        if (typeof window !== 'undefined') {
            try { return JSON.parse(localStorage.getItem('edibio_suspended_bills') || '[]'); } catch { return []; }
        }
        return [];
    });
    const [showSuspendModal, setShowSuspendModal] = useState(false);

    // Balance modal
    const [showBalanceModal, setShowBalanceModal] = useState(false);
    const [customPayments, setCustomPayments] = useState<Record<string, string>>({});
    const [balanceSearchQuery, setBalanceSearchQuery] = useState('');
    const [redeemPointsAmount, setRedeemPointsAmount] = useState('');

    const outstandingBalanceCount = useMemo(() => {
        const DRAFT = ['estimate', 'proforma', 'delivery_challan'];
        const trackerMap = new Map<string, { party: any; computedBalance: number }>();
        // Build map from parties
        parties.filter((p: any) => p.companyId === companyId).forEach((p: any) => {
            const key = normPhone(p.phone) || p.id;
            if (!trackerMap.has(key)) trackerMap.set(key, { party: p, computedBalance: 0 });
        });
        // Sum up unpaid invoice balanceDue per party key
        invoices
            .filter((i: any) => i.invoiceType === 'sale' && !DRAFT.includes(i.invoiceType) && i.paymentStatus !== 'paid' && (i.balanceDue ?? 0) > 0)
            .forEach((i: any) => {
                const key = normPhone(i.partyPhone) || i.partyId || '';
                if (!key) return;
                if (trackerMap.has(key)) {
                    trackerMap.get(key)!.computedBalance += i.balanceDue;
                } else {
                    const p = parties.find((p: any) => p.id === i.partyId) ||
                              parties.find((p: any) => normPhone(p.phone) === key);
                    if (p) trackerMap.set(key, { party: p, computedBalance: i.balanceDue });
                    else trackerMap.set(key, { party: { id: i.partyId, name: i.partyName, phone: i.partyPhone }, computedBalance: i.balanceDue });
                }
            });
        return Array.from(trackerMap.values()).filter(e => e.computedBalance > 0).length;
    }, [parties, invoices, companyId, normPhone]);

    const saveSuspendedBills = (bills: any[]) => {
        setSuspendedBills(bills);
        if (typeof window !== 'undefined') localStorage.setItem('edibio_suspended_bills', JSON.stringify(bills));
    };



    const handleFetchBill = (isRefund = false) => {
        setActionModal({ isOpen: true, isRefund });
        setActionQuery('');
    };

    const selectInvoice = (inv: any) => {
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

        if (actionModal.isRefund) {
            setAmountGiven('');
            setSavedBill(null);
            setDate(new Date().toISOString().slice(0, 10));
            setTime(new Date().toTimeString().slice(0, 5));
        } else {
            setAmountGiven(inv.amountPaid !== undefined && inv.amountPaid !== null ? inv.amountPaid.toString() : '');
            setSavedBill(inv);
            setDate(inv.date || new Date().toISOString().slice(0, 10));
            setTime(inv.time || new Date().toTimeString().slice(0, 5));
        }

        toast.success(`Bill ${actionModal.isRefund ? 'refunded' : 'fetched'} successfully!`);
        setActionModal({ isOpen: false, isRefund: false });
    };

    const executeAction = () => {
        const q = actionQuery.trim();
        if (!q) return;
        const inv = invoices.find(i => i.invoiceNumber.toLowerCase() === q.toLowerCase() || i.id === q);
        if (inv) {
            selectInvoice(inv);
        } else {
            toast.error('Invoice not found!');
        }
    };


    const updateItem = (idx: number, k: string, v: any) => {
        setItems(prev => {
            let bogoToAdd: any = null;
            const nextItems = prev.map((item, i) => {
                if (i !== idx) return item;
                const upd = { ...item, [k]: v };

                // Auto complete product if entering name or barcode
                if (k === 'name' || k === 'barcode') {
                    if (typeof v === 'string' && v.trim() !== '') {
                        // Filter suggestions (including combo offers)
                        const searchTerm = v.toLowerCase();
                        const matches = products.filter(p => 
                            p.name.toLowerCase().includes(searchTerm) || 
                            (p.barcode && p.barcode.includes(searchTerm)) ||
                            (p.category && p.category.toLowerCase().includes(searchTerm))
                        );
                        
                        const comboMatches = (company?.offers || []).filter(o => 
                            o.isActive && o.type === 'combo' && o.name.toLowerCase().includes(searchTerm)
                        ).map(o => ({
                            id: o.id,
                            name: o.name,
                            isComboOffer: true,
                            comboOffer: o
                        }));
                        
                        const combined = [...matches, ...comboMatches].slice(0, 10);
                        
                        if (k === 'name') {
                            setFilteredProducts(combined);
                            setShowSuggestions(combined.length > 0);
                            setActiveRowIdx(idx);
                            setActiveSuggestionIdx(0);
                        }

                        const prod = products.find(p => (k === 'name' && p.name.toLowerCase() === v.toLowerCase()) || (k === 'barcode' && p.barcode === v));
                        if (prod) {
                            upd.productId = prod.id;
                            upd.name = prod.name;
                            upd.barcode = prod.barcode || '';
                            upd.hsnCode = prod.hsnCode || '';
                            upd.mrp = prod.mrp || prod.sellingPrice || 0;
                            upd.gstRate = prod.gstRate || 0;
                            upd.unit = prod.unit || 'Pcs';
                            
                            // Check for active flat discount offer on this item
                            const discountOffer = company?.offers?.find(o => o.isActive && o.type === 'discount' && o.buyProductId === prod.id);
                            if (discountOffer) {
                                const percent = discountOffer.discountPercent || 50;
                                upd.rate = prod.sellingPrice * (1 - percent / 100);
                                upd.originalPrice = prod.sellingPrice;
                            } else {
                                upd.rate = prod.sellingPrice || 0;
                                upd.originalPrice = undefined;
                            }
                            
                            // Check for active BOGO offer on this item
                            const bogoOffer = company?.offers?.find(o => o.isActive && o.type === 'bogo' && o.buyProductId === prod.id);
                            if (bogoOffer && !upd.bogoTriggered && !upd.isFree) {
                                upd.bogoTriggered = true;
                                const getProd = products.find(p => p.id === bogoOffer.getProductId) || prod;
                                bogoToAdd = {
                                    name: `[FREE] ${getProd.name}`,
                                    barcode: getProd.barcode || '',
                                    hsnCode: getProd.hsnCode || '',
                                    mfgDate: '',
                                    mrp: getProd.mrp || getProd.sellingPrice || 0,
                                    size: '',
                                    qty: bogoOffer.getQty || 1,
                                    unit: getProd.unit || 'Pcs',
                                    rate: 0, // Free!
                                    isFree: true,
                                    originalPrice: getProd.sellingPrice,
                                    gstRate: getProd.gstRate || 0,
                                    productId: getProd.id,
                                    discount: 0,
                                    discountAmt: 0,
                                    taxableAmt: 0,
                                    cgst: 0,
                                    sgst: 0,
                                    igst: 0,
                                    cess: 0,
                                    totalGst: 0,
                                    amount: 0,
                                };
                                const calcFree = calcLineItem(bogoToAdd.qty, 0, 0, getProd.gstRate as any);
                                bogoToAdd = { ...bogoToAdd, ...calcFree };
                            }
                            
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
            });

            if (bogoToAdd) {
                const next = [...nextItems];
                next.splice(idx + 1, 0, bogoToAdd);
                return next;
            }
            return nextItems;
        });
    };

    const selectProduct = (idx: number, prod: any) => {
        if (prod.isComboOffer) {
            const combo = prod.comboOffer;
            const comboPids = combo.comboProductIds || [];
            const comboProds = comboPids.map((pid: any) => products.find((p: any) => p.id === pid)).filter(Boolean);
            if (comboProds.length > 0) {
                const normalPriceSum = comboProds.reduce((sum: number, p: any) => sum + (p.sellingPrice || 0), 0);
                const factor = normalPriceSum > 0 ? (combo.comboPrice / normalPriceSum) : 1;
                
                setItems(prev => {
                    const next = [...prev];
                    // Remove the current search/input row
                    next.splice(idx, 1);
                    
                    comboProds.forEach((p: any, cIdx: number) => {
                        const calculatedRate = p.sellingPrice * factor;
                        const itemRow = {
                            name: `${p.name} (${combo.name})`,
                            barcode: p.barcode || '',
                            hsnCode: p.hsnCode || '',
                            mfgDate: '',
                            mrp: p.mrp || p.sellingPrice || 0,
                            size: '',
                            qty: 1,
                            unit: p.unit || 'Pcs',
                            rate: calculatedRate,
                            originalPrice: p.sellingPrice,
                            isComboItem: true,
                            comboOfferId: combo.id,
                            gstRate: p.gstRate || 0,
                            productId: p.id,
                            discount: 0,
                            discountAmt: 0,
                            taxableAmt: 0,
                            cgst: 0,
                            sgst: 0,
                            igst: 0,
                            cess: 0,
                            totalGst: 0,
                            amount: 0,
                        };
                        const calc = calcLineItem(1, calculatedRate, 0, p.gstRate as any);
                        next.splice(idx + cIdx, 0, { ...itemRow, ...calc });
                    });
                    
                    if (next.length === 0) {
                        next.push(emptyRow());
                    }
                    return next;
                });
            }
        } else {
            updateItem(idx, 'name', prod.name);
        }
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

    // Offers Engine Calculations
    const { bogoDiscountsSum, comboDiscountsSum, activeOfferLogs } = useMemo(() => {
        let bogoTotalDiscount = 0;
        let comboTotalDiscount = 0;
        const logs: string[] = [];
        
        const offers = company?.offers || [];
        if (offers.length === 0 || validItems.length === 0) {
            return { bogoDiscountsSum: 0, comboDiscountsSum: 0, activeOfferLogs: [] };
        }

        const flatDiscounts = offers.filter(o => o.isActive && o.type === 'discount');
        const bogoOffers = offers.filter(o => o.isActive && o.type === 'bogo');
        const productDiscounts = new Map<string, number>();

        validItems.forEach(item => {
            if (!item.productId) return;
            // Exclude items already handled by line-level discount/BOGO/combo offers
            if (item.originalPrice || item.isFree || item.isComboItem || item.bogoTriggered) return;
            const pid = item.productId;
            const itemPrice = item.rate || 0;
            const itemQty = item.qty || 0;

            const flat = flatDiscounts.find(o => o.buyProductId === pid);
            if (flat) {
                const discountVal = itemPrice * itemQty * ((flat.discountPercent || 0) / 100);
                productDiscounts.set(pid, (productDiscounts.get(pid) || 0) + discountVal);
                logs.push(`Flat ${flat.discountPercent}% off applied to ${item.name}`);
            }

            const bogo = bogoOffers.find(o => o.buyProductId === pid || o.getProductId === pid);
            if (bogo) {
                const buyPid = bogo.buyProductId;
                const getPid = bogo.getProductId;
                const buyQtyRule = bogo.buyQty || 1;
                const getQtyRule = bogo.getQty || 1;
                const discPercent = bogo.discountPercent || 100;

                if (buyPid === getPid && buyPid === pid) {
                    const bundleSize = buyQtyRule + getQtyRule;
                    const bundles = Math.floor(itemQty / bundleSize);
                    const freeQty = bundles * getQtyRule;
                    if (freeQty > 0) {
                        const discountVal = freeQty * itemPrice * (discPercent / 100);
                        productDiscounts.set(pid, (productDiscounts.get(pid) || 0) + discountVal);
                        logs.push(`BOGO: ${freeQty} free/discounted units of ${item.name}`);
                    }
                } else {
                    const getProductInCart = validItems.find(it => it.productId === getPid);
                    if (getPid && getProductInCart && pid === buyPid) {
                        const buyItemQty = itemQty;
                        const getItemQty = getProductInCart.qty;
                        const getPrice = getProductInCart.rate || 0;

                        const eligibleBundles = Math.floor(buyItemQty / buyQtyRule);
                        const discountQty = Math.min(eligibleBundles * getQtyRule, getItemQty);
                        if (discountQty > 0) {
                            const discountVal = discountQty * getPrice * (discPercent / 100);
                            productDiscounts.set(getPid, (productDiscounts.get(getPid) || 0) + discountVal);
                            logs.push(`BOGO: ${discountQty} units of ${getProductInCart.name} discounted by ${item.name} purchase`);
                        }
                    }
                }
            }
        });

        bogoTotalDiscount = Array.from(productDiscounts.values()).reduce((a, b) => a + b, 0);

        const comboOffers = offers.filter(o => o.isActive && o.type === 'combo');
        comboOffers.forEach(combo => {
            const pids = combo.comboProductIds || [];
            if (pids.length < 2) return;

            const cartItemsForCombo = pids.map(pid => validItems.find(it => it.productId === pid));
            const allPresent = cartItemsForCombo.every(it => it !== undefined);
            if (allPresent) {
                const qtys = cartItemsForCombo.map(it => it!.qty);
                const comboSets = Math.min(...qtys);

                if (comboSets > 0) {
                    const regularPriceSum = cartItemsForCombo.reduce((sum, it) => sum + (it!.rate || 0), 0);
                    const comboPriceRule = combo.comboPrice || 0;
                    const comboDiscountPerSet = Math.max(0, regularPriceSum - comboPriceRule);
                    
                    const discountVal = comboSets * comboDiscountPerSet;
                    comboTotalDiscount += discountVal;
                    logs.push(`Combo: "${combo.name}" bundle applied x${comboSets} (saved ₹${discountVal.toFixed(2)})`);
                }
            }
        });

        return { bogoDiscountsSum: bogoTotalDiscount, comboDiscountsSum: comboTotalDiscount, activeOfferLogs: logs };
    }, [company, validItems]);

    const preDiscountSum = Math.max(0, subTotal + totalGst - bogoDiscountsSum - comboDiscountsSum);

    const dVal = parseFloat(discountVal) || 0;
    const globalDiscount = discountType === '%' ? r2(preDiscountSum * dVal / 100) : dVal;

    const afterDiscount = preDiscountSum - globalDiscount;
    const roCalculated = roundOffEnabled ? roundOff(afterDiscount) : parseFloat(roundOffVal) || 0;

    // Effect to auto update roundOffVal display to match auto calc if enabled
    useEffect(() => {
        if (roundOffEnabled) setRoundOffVal(roCalculated.toFixed(2));
    }, [roCalculated, roundOffEnabled]);

    const grandTotalBeforePointsDiscount = r2(afterDiscount + (parseFloat(roundOffVal) || 0));

    // Loyalty points calculations
    const selectedCustomer = useMemo(() => {
        const phoneTarget = partyPhone.trim() ? normPhone(partyPhone) : '';
        const nameTarget = partyName.trim().toLowerCase();

        if (!phoneTarget && !nameTarget) return null;

        let foundParty = null;
        if (phoneTarget) {
            foundParty = parties.find(p => 
                (p.phone && normPhone(p.phone) === phoneTarget) || 
                (p.mobile && normPhone(p.mobile) === phoneTarget)
            );
        }
        if (!foundParty && nameTarget) {
            foundParty = parties.find(p => 
                p.name && p.name.toLowerCase().trim() === nameTarget
            );
        }

        if (!foundParty) return null;

        // Compute balance dynamically to avoid corruption issues
        const DRAFT = ['estimate', 'proforma', 'delivery_challan'];
        const unpaidInvoices = invoices.filter((i: any) => 
            i.invoiceType === 'sale' && 
            !DRAFT.includes(i.invoiceType) && 
            i.paymentStatus !== 'paid' && 
            (i.balanceDue ?? 0) > 0 &&
            (i.partyId === foundParty.id || 
             (foundParty.phone && normPhone(i.partyPhone) === normPhone(foundParty.phone)) ||
             (foundParty.mobile && normPhone(i.partyPhone) === normPhone(foundParty.mobile)))
        );
        const computedBalance = unpaidInvoices.reduce((sum: number, i: any) => sum + i.balanceDue, 0);

        return {
            ...foundParty,
            balance: computedBalance
        };
    }, [parties, invoices, partyPhone, partyName, normPhone]);

    const loyaltyPointsAvailable = selectedCustomer?.loyaltyPoints || 0;
    const pointsEarningRatio = company?.loyaltyEarningRatio || 100;
    const pointsRedemptionValue = company?.loyaltyRedemptionValue || 1;
    const minPointsToRedeem = company?.loyaltyMinRedeemPoints || 10;
    const loyaltyEnabled = company?.loyaltyPointsEnabled && pointsEarningRatio > 0 && pointsRedemptionValue > 0;

    const canRedeemPoints = loyaltyEnabled && loyaltyPointsAvailable >= minPointsToRedeem;
    const maxPointsForBill = Math.floor(grandTotalBeforePointsDiscount / pointsRedemptionValue);
    const pointsToRedeemLimit = Math.min(loyaltyPointsAvailable, maxPointsForBill);
    const pointsToRedeemAmount = Math.min(Math.max(0, isNaN(parseInt(redeemPointsAmount)) ? 0 : parseInt(redeemPointsAmount)), pointsToRedeemLimit);
    const pointsDiscountValue = pointsToRedeemAmount * pointsRedemptionValue;

    const grandTotal = r2(grandTotalBeforePointsDiscount - pointsDiscountValue);
    const pointsEarned = loyaltyEnabled ? Math.floor(grandTotal / pointsEarningRatio) : 0;

    const handleSave = async (isPrintFlow: boolean | React.MouseEvent<any> = false) => {
        const isPrint = isPrintFlow === true;
        if (validItems.length === 0) { toast.error('Add at least one complete row (Name, Qty, Price)'); return false; }

        if (!useSplitPayment && (amountGiven === null || amountGiven === undefined || amountGiven.trim() === '')) {
            toast.error('Please enter Amount Given (enter 0 if no payment was received)');
            return false;
        }

        const finalPartyName = partyName.trim() || 'Cash / Walk-in Customer';

        // --- Split payment calculations ---
        let calculatedAmountPaid = 0;
        let calculatedBalanceDue = grandTotal;
        let calculatedPaymentStatus: 'paid' | 'partial' | 'unpaid' = 'unpaid';
        let finalSplitPayments: { method: string; amount: number }[] | undefined;
        let finalPaymentMethod = 'cash';

        if (useSplitPayment) {
            const entries = splitPayments
                .map(s => ({ method: s.method, amount: parseFloat(s.amount) || 0 }))
                .filter(s => s.amount > 0);
            const totalSplit = entries.reduce((a, s) => a + s.amount, 0);
            calculatedAmountPaid = Math.min(totalSplit, grandTotal);
            calculatedBalanceDue = Math.max(0, grandTotal - totalSplit);
            calculatedPaymentStatus = calculatedBalanceDue === 0 ? 'paid' : calculatedAmountPaid > 0 ? 'partial' : 'unpaid';
            finalSplitPayments = entries.length > 0 ? entries : undefined;
            // Dominant method = the one with highest amount
            const dominant = entries.sort((a, b) => b.amount - a.amount)[0];
            finalPaymentMethod = dominant?.method || 'cash';
        } else {
            const parsedAmountGiven = (amountGiven && typeof amountGiven === 'string' && amountGiven.trim() !== '') 
                ? parseFloat(amountGiven) || 0 
                : (typeof amountGiven === 'number' ? amountGiven : null);

            if (parsedAmountGiven !== null) {
                if (parsedAmountGiven >= grandTotal) {
                    calculatedAmountPaid = grandTotal;
                    calculatedBalanceDue = 0;
                    calculatedPaymentStatus = 'paid';
                } else {
                    calculatedAmountPaid = parsedAmountGiven;
                    calculatedBalanceDue = grandTotal - parsedAmountGiven;
                    calculatedPaymentStatus = parsedAmountGiven > 0 ? 'partial' : 'unpaid';
                }
            } else {
                if (billType === 'CASH') {
                    calculatedAmountPaid = grandTotal;
                    calculatedBalanceDue = 0;
                    calculatedPaymentStatus = 'paid';
                } else {
                    calculatedAmountPaid = 0;
                    calculatedBalanceDue = grandTotal;
                    calculatedPaymentStatus = 'unpaid';
                }
            }
            finalPaymentMethod = 'cash';
        }


        let finalPartyId = undefined;
        let finalPartyNameUsed = finalPartyName;
        if (finalPartyName !== 'Cash / Walk-in Customer' || (partyPhone && partyPhone.trim() !== '')) {
            const searchPhone = partyPhone ? partyPhone.trim() : '';
            const searchName = finalPartyName !== 'Cash / Walk-in Customer' ? finalPartyName.toLowerCase().trim() : '';

            const matchingParty = parties.find(p =>
                (searchPhone && (String(p.phone).trim() === searchPhone || String(p.mobile).trim() === searchPhone)) ||
                (searchName && p.name.toLowerCase().trim() === searchName)
            );

            if (matchingParty) {
                finalPartyId = matchingParty.id;
                finalPartyNameUsed = matchingParty.name;
            } else {
                const newName = finalPartyName !== 'Cash / Walk-in Customer' ? finalPartyName : `Cust - ${searchPhone}`;
                const newParty = addParty({
                    companyId: companyId!,
                    type: 'customer',
                    name: newName,
                    phone: searchPhone,
                    address: billingAddress || '',
                    openingBalance: 0,
                    balance: 0,
                });
                finalPartyId = newParty.id;
                finalPartyNameUsed = newName;
            }
        }

        const isUpdate = !!savedBill;
        const oldInvoice = savedBill;

        let invoice: any;

        if (isUpdate && oldInvoice) {
            // Revert any old excess payment applied to this invoice from the customer's balance/history
            if (oldInvoice.partyId) {
                const party = useStore.getState().parties.find((p: any) => p.id === oldInvoice.partyId);
                if (party && party.paymentHistory) {
                    const searchNote = `on invoice #${oldInvoice.invoiceNumber}`;
                    const oldPayment = party.paymentHistory.find((p: any) => p.note && p.note.includes(searchNote));
                    if (oldPayment) {
                        const revertedBalance = (party.balance || 0) + oldPayment.amount;
                        const updatedHistory = party.paymentHistory.filter((p: any) => p.id !== oldPayment.id);
                        
                        updateParty(oldInvoice.partyId, {
                            balance: revertedBalance,
                            paymentHistory: updatedHistory
                        });

                        // Revert the deduction from past invoices' balanceDue
                        let remainingRevert = oldPayment.amount;
                        const currentInvoices = useStore.getState().invoices;
                        const customerInvoices = currentInvoices.filter((inv: any) => 
                            inv.id !== oldInvoice.id &&
                            (inv.partyId === oldInvoice.partyId || (party.phone && inv.partyPhone === party.phone))
                        );
                        
                        for (const inv of customerInvoices) {
                            if (remainingRevert <= 0) break;
                            const maxRestore = inv.amountPaid;
                            if (maxRestore > 0) {
                                const restoreAmt = Math.min(maxRestore, remainingRevert);
                                const newPaid = inv.amountPaid - restoreAmt;
                                const newDue = inv.balanceDue + restoreAmt;
                                updateInvoice(inv.id, {
                                    amountPaid: newPaid,
                                    balanceDue: newDue,
                                    paymentStatus: newDue === 0 ? 'paid' : newPaid === 0 ? 'unpaid' : 'partial'
                                });
                                remainingRevert -= restoreAmt;
                            }
                        }
                    }
                }
            }

            // 1. Revert old stock changes
            if (oldInvoice.invoiceType === 'sale') {
                oldInvoice.items.forEach((item: any) => {
                    if (item.productId) adjustStock(item.productId, item.qty, 'skip');
                });
            } else if (oldInvoice.invoiceType === 'purchase') {
                oldInvoice.items.forEach((item: any) => {
                    if (item.productId) adjustStock(item.productId, -item.qty, 'skip');
                });
            }

            // 2. Revert old party balance
            if (oldInvoice.partyId && oldInvoice.balanceDue > 0) {
                const party = parties.find((p: any) => p.id === oldInvoice.partyId);
                if (party) {
                    updateParty(oldInvoice.partyId, {
                        balance: (party.balance || 0) - oldInvoice.balanceDue
                    });
                }
            }

            // 3. Revert old loyalty points
            if (oldInvoice.partyId && oldInvoice.invoiceType === 'sale') {
                const earned = oldInvoice.pointsEarned || 0;
                const redeemed = oldInvoice.pointsRedeemed || 0;
                if (earned !== 0 || redeemed !== 0) {
                    const party = parties.find((p: any) => p.id === oldInvoice.partyId);
                    if (party) {
                        updateParty(oldInvoice.partyId, {
                            loyaltyPoints: Math.max(0, (party.loyaltyPoints || 0) - earned + redeemed)
                        });
                    }
                }
            }

            // Construct invoice object preserving id, invoiceNumber, and createdAt
            invoice = {
                id: oldInvoice.id,
                companyId: companyId!,
                invoiceType: 'sale',
                invoiceNumber: oldInvoice.invoiceNumber,
                date, time,
                stateOfSupply,
                partyId: finalPartyId,
                partyName: finalPartyNameUsed, partyPhone, billingAddress,
                items: validItems,
                subTotal, taxableAmount: subTotal,
                totalCgst: r2(validItems.reduce((a, i) => a + i.cgst, 0)),
                totalSgst: r2(validItems.reduce((a, i) => a + i.sgst, 0)),
                totalIgst: 0, totalCess: 0, totalGst,
                totalDiscount: globalDiscount + r2(validItems.reduce((a, i) => a + i.discountAmt, 0)),
                roundOff: parseFloat(roundOffVal) || 0,
                grandTotal,
                paymentStatus: calculatedPaymentStatus,
                amountPaid: calculatedAmountPaid,
                balanceDue: calculatedBalanceDue,
                paymentMethod: finalPaymentMethod,
                splitPayments: finalSplitPayments,

                isGstBill: validItems.some(i => i.gstRate > 0),
                isHidden: false,
                notes: description,
                counter,
                pointsEarned,
                pointsRedeemed: pointsToRedeemAmount,
                pointsValueRedeemed: pointsDiscountValue,
                createdAt: oldInvoice.createdAt,
                updatedAt: new Date().toISOString(),
            };

            // Save the update
            updateInvoice(oldInvoice.id, invoice);

            // 4. Apply new stock changes
            if (invoice.invoiceType === 'sale') {
                validItems.forEach(item => { if (item.productId) adjustStock(item.productId, -item.qty, `Sale - ${invoice.invoiceNumber}`); });
            } else if (invoice.invoiceType === 'purchase') {
                validItems.forEach(item => { if (item.productId) adjustStock(item.productId, item.qty, `Purchase - ${invoice.invoiceNumber}`); });
            }

            // 5. Apply new party balance (use getState to get the updated party balance)
            if (invoice.partyId && invoice.balanceDue > 0) {
                const latestParty = useStore.getState().parties.find((p: any) => p.id === invoice.partyId);
                if (latestParty) {
                    updateParty(invoice.partyId, {
                        balance: (latestParty.balance || 0) + invoice.balanceDue
                    });
                }
            }

            // 6. Apply new loyalty points
            if (invoice.partyId && invoice.invoiceType === 'sale') {
                if (pointsEarned !== 0 || pointsToRedeemAmount !== 0) {
                    const latestParty = useStore.getState().parties.find((p: any) => p.id === invoice.partyId);
                    if (latestParty) {
                        updateParty(invoice.partyId, {
                            loyaltyPoints: Math.max(0, (latestParty.loyaltyPoints || 0) + pointsEarned - pointsToRedeemAmount)
                        });
                    }
                }
            }
        } else {
            const invNo = nextInvoiceNumber(companyId!, 'MN');
            invoice = {
                id: 'mb_' + Date.now().toString(36),
                companyId: companyId!,
                invoiceType: 'sale',
                invoiceNumber: invNo,
                date, time,
                stateOfSupply,
                partyId: finalPartyId,
                partyName: finalPartyNameUsed, partyPhone, billingAddress,
                items: validItems,
                subTotal, taxableAmount: subTotal,
                totalCgst: r2(validItems.reduce((a, i) => a + i.cgst, 0)),
                totalSgst: r2(validItems.reduce((a, i) => a + i.sgst, 0)),
                totalIgst: 0, totalCess: 0, totalGst,
                totalDiscount: globalDiscount + r2(validItems.reduce((a, i) => a + i.discountAmt, 0)),
                roundOff: parseFloat(roundOffVal) || 0,
                grandTotal,
                paymentStatus: calculatedPaymentStatus,
                amountPaid: calculatedAmountPaid,
                balanceDue: calculatedBalanceDue,
                paymentMethod: finalPaymentMethod,
                splitPayments: finalSplitPayments,

                isGstBill: validItems.some(i => i.gstRate > 0),
                isHidden: false,
                notes: description,
                counter,
                pointsEarned,
                pointsRedeemed: pointsToRedeemAmount,
                pointsValueRedeemed: pointsDiscountValue,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            // Adjust stock based on transaction type (run before addInvoice so balanceAfter is resolved correctly)
            if (invoice.invoiceType === 'sale') {
                validItems.forEach(item => { if (item.productId) adjustStock(item.productId, -item.qty, 'skip'); });
            } else if (invoice.invoiceType === 'purchase') {
                validItems.forEach(item => { if (item.productId) adjustStock(item.productId, item.qty, 'skip'); });
            }

            addInvoice(invoice as any);
        }

        // Calculate and apply excess payment to outstanding balance in the store
        const parsedAmountGiven = (amountGiven && typeof amountGiven === 'string' && amountGiven.trim() !== '') 
            ? parseFloat(amountGiven) || 0 
            : (typeof amountGiven === 'number' ? amountGiven : null);

        let excessAppliedToBalance = 0;
        let latestSelectedCustomerBalance = 0;
        const latestSelectedCustomer = finalPartyId 
            ? useStore.getState().parties.find((p: any) => p.id === finalPartyId)
            : null;

        if (latestSelectedCustomer) {
            const DRAFT = ['estimate', 'proforma', 'delivery_challan'];
            const unpaidInvoices = useStore.getState().invoices.filter((i: any) => 
                i.invoiceType === 'sale' && 
                !DRAFT.includes(i.invoiceType) && 
                i.paymentStatus !== 'paid' && 
                (i.balanceDue ?? 0) > 0 &&
                (i.partyId === finalPartyId || 
                 (latestSelectedCustomer.phone && normPhone(i.partyPhone) === normPhone(latestSelectedCustomer.phone)) ||
                 ((latestSelectedCustomer as any).mobile && normPhone(i.partyPhone) === normPhone((latestSelectedCustomer as any).mobile)))
            );
            latestSelectedCustomerBalance = unpaidInvoices.reduce((sum: number, i: any) => sum + i.balanceDue, 0);
        }

        if (parsedAmountGiven !== null && finalPartyId && latestSelectedCustomerBalance > 0 && tallyWithBalance && !useSplitPayment) {
            if (parsedAmountGiven > grandTotal) {
                excessAppliedToBalance = Math.min(parsedAmountGiven - grandTotal, latestSelectedCustomerBalance);
            }
        }

        if (finalPartyId && excessAppliedToBalance > 0) {
            addBalancePayment(finalPartyId, {
                type: 'received',
                amount: excessAppliedToBalance,
                method: finalPaymentMethod as any,
                date,
                note: `Adjusted from excess payment on invoice #${invoice.invoiceNumber}`
            });

            // Update past invoices' balanceDue
            let remainingPayment = excessAppliedToBalance;
            const currentInvoices = useStore.getState().invoices;
            const sortedInvoices = [...currentInvoices].reverse();
            sortedInvoices.forEach((inv: any) => {
                if (remainingPayment <= 0) return;
                // Exclude the current invoice we just saved
                if (inv.id === invoice.id) return;
                if (inv.partyId === finalPartyId || (latestSelectedCustomer && latestSelectedCustomer.phone && inv.partyPhone === latestSelectedCustomer.phone)) {
                    if (inv.balanceDue > 0) {
                        const deduction = Math.min(inv.balanceDue, remainingPayment);
                        const newPaid = inv.amountPaid + deduction;
                        const newDue = inv.balanceDue - deduction;
                        updateInvoice(inv.id, {
                            amountPaid: newPaid,
                            balanceDue: newDue,
                            paymentStatus: newDue === 0 ? 'paid' : 'partial'
                        });
                        remainingPayment -= deduction;
                    }
                }
            });
        }

        setRedeemPointsAmount('');
        setSavedBill(invoice as any);

        if (!isPrint) {
            // Save-only flow: await browser PDF download capture before resetting the UI state
            await handleDownloadPDF(invoice);
        }

        // Reset the inputs immediately after PDF generation/download starts
        setItems([emptyRow()]);
        setPartyName('');
        setPartyPhone('');
        setBillingAddress('');
        setDiscountVal('');
        setAmountGiven('');
        setUseSplitPayment(false);
        setSplitPayments([{ method: 'cash', amount: '' }]);
        setDate(new Date().toISOString().slice(0, 10));
        setTime(new Date().toTimeString().slice(0, 5));

        if (!isPrint) {
            setSavedBill(null);
        } else {
            // Schedule clearing savedBill after a delay
            setTimeout(() => {
                setSavedBill(null);
                setShowSuccess(false);
            }, 5000);
        }

        return invoice;
    };

    const handleSuspend = () => {
        if (validItems.length === 0) { toast.error('No items to suspend.'); return; }
        const suspended = {
            id: 'sus_' + Date.now().toString(36),
            suspendedAt: new Date().toISOString(),
            partyName, partyPhone, billingAddress, stateOfSupply, billType, counter,
            items, discountType, discountVal, roundOffEnabled, roundOffVal, description, date, time,
            grandTotal, label: partyName || `Bill #${suspendedBills.length + 1}`,
        };
        const updated = [suspended, ...suspendedBills];
        saveSuspendedBills(updated);
        setItems([emptyRow()]); setPartyName(''); setPartyPhone(''); setBillingAddress('');
        setDiscountVal(''); setDescription(''); setAmountGiven('');
        toast.success(`Bill for "${suspended.label}" suspended! Resume anytime.`);
        setShowSuspendModal(false);
    };

    const handleResumeSuspended = (sus: any) => {
        setPartyName(sus.partyName); setPartyPhone(sus.partyPhone);
        setBillingAddress(sus.billingAddress); setStateOfSupply(sus.stateOfSupply || 'Tamil Nadu');
        setBillType(sus.billType || 'CASH'); setCounter(sus.counter || 'Counter 1');
        setItems(sus.items); setDiscountType(sus.discountType || '%');
        setDiscountVal(sus.discountVal || ''); setRoundOffEnabled(sus.roundOffEnabled ?? true);
        setRoundOffVal(sus.roundOffVal || '0.00'); setDescription(sus.description || '');
        setDate(sus.date || new Date().toISOString().slice(0, 10));
        setTime(sus.time || new Date().toTimeString().slice(0, 5));
        const updated = suspendedBills.filter((b: any) => b.id !== sus.id);
        saveSuspendedBills(updated);
        setShowSuspendModal(false);
        toast.success(`Resumed bill for "${sus.label}".`);
    };

    const handleDeleteSuspended = (id: string) => {
        saveSuspendedBills(suspendedBills.filter((b: any) => b.id !== id));
        toast.success('Suspended bill removed.');
    };

    const handlePrintRequest = useCallback(() => {
        if (validItems.length === 0) { toast.error('Add items first!'); return; }
        if (!useSplitPayment && (amountGiven === null || amountGiven === undefined || amountGiven.trim() === '')) {
            toast.error('Please enter Amount Given (enter 0 if no payment was received) before printing');
            return;
        }
        setCopies(2); // Request specifies print 2 copies
        setShowPrintModal(true);
    }, [validItems, amountGiven, useSplitPayment]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'F12') {
                e.preventDefault();
                handlePrintRequest();
            }
            if (e.key === 'Enter' && e.shiftKey) {
                e.preventDefault();
                setItems(prev => [...prev, emptyRow()]);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handlePrintRequest]);

    const executePrint = async () => {
        const inputsModified = savedBill && (
            (savedBill.partyName || 'Cash / Walk-in Customer') !== (partyName.trim() || 'Cash / Walk-in Customer') ||
            (savedBill.partyPhone || '') !== partyPhone.trim() ||
            (savedBill.billingAddress || '') !== billingAddress.trim() ||
            (savedBill.totalDiscount?.toString() || '0') !== (discountVal.trim() || '0') ||
            (savedBill.amountPaid?.toString() || '0') !== (amountGiven.trim() || '0') ||
            savedBill.items.length !== validItems.length ||
            savedBill.items.some((it: any, idx: number) => {
                const cur = validItems[idx];
                return !cur || cur.name !== it.name || Number(cur.qty) !== Number(it.qty) || Number(cur.rate) !== Number(it.rate);
            })
        );

        let billToPrint = savedBill;
        if (!billToPrint || inputsModified) {
            const result = await handleSave(true);
            if (!result) return;
            billToPrint = result;
        }

        const partyPhoneToUse = billToPrint.partyPhone;
        const currentBill = billToPrint;

        if (company?.whatsappEnabled && partyPhoneToUse) {
            let itemsText = '';
            currentBill.items.forEach((item: any) => {
                itemsText += `• ${item.name} (${item.qty} ${item.unit}) - ₹${item.amount.toLocaleString('en-IN')}\n`;
            });
            const bal = currentBill.balanceDue || 0;
            const msg = `*${company?.name || 'Tax Invoice'}*\n\nHello ${billToPrint.partyName || 'Customer'},\nHere is your bill summary (Inv: ${billToPrint.invoiceNumber}):\nDate: ${billToPrint.date} ${billToPrint.time || ''}\n\n*Items Purchased:*\n${itemsText}\n*Total Amount:* ₹${billToPrint.grandTotal.toLocaleString('en-IN')}\n${bal > 0 ? `\n*Please clear the due balance:* ₹${bal.toLocaleString('en-IN')}\n` : ''}\nThanks for shopping with us!\n\n_Powered by Edibio_`;

            setTimeout(() => {
                window.open(`https://wa.me/91${partyPhoneToUse.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
            }, 300);
        }

        setShowPrintModal(false);
        setShowSuccess(true);
        setTimeout(() => window.print(), (company?.whatsappEnabled && partyPhoneToUse) ? 800 : 300);
    };

    const handleDownloadPDF = async (invoiceToDownload?: any) => {
        const invoice = invoiceToDownload || savedBill;
        if (!invoice) return;

        // Await a minimal delay (0ms) to allow React to flush state updates to the DOM
        await new Promise(resolve => setTimeout(resolve, 0));

        const loadToast = toast.loading('Generating PDF...');
        const element = document.getElementById('quick-invoice-print');
        if (!element) {
            toast.error('Invoice print element not found', { id: loadToast });
            return;
        }

        // Temporarily replace min-height with auto to avoid vertical page splits/blank pages
        const vhElements = element.querySelectorAll('[style*="min-height"], [style*="minHeight"]');
        const originalMinHeights: { el: Element; style: string | null }[] = [];
        vhElements.forEach(el => {
            originalMinHeights.push({ el, style: el.getAttribute('style') });
            const currStyle = el.getAttribute('style') || '';
            const replaced = currStyle
                .replace(/min-height\s*:\s*[^;]+/gi, 'min-height: auto')
                .replace(/minHeight\s*:\s*[^;]+/gi, 'min-height: auto');
            el.setAttribute('style', replaced);
        });

        const triggerVirtualDownload = (blob: Blob, filename: string) => {
            const downloadUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(downloadUrl);
            toast.success('PDF downloaded successfully!', { id: loadToast });
        };

        try {
            const html2pdf = (await import('html2pdf.js')).default;

            const opt: any = {
                margin: 0, // Set to 0 to prevent template scaling/shifting
                filename: `${invoice.invoiceNumber || 'Invoice'}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2, 
                    useCORS: true, 
                    logging: false,
                    letterRendering: true,
                    scrollX: 0,
                    scrollY: 0
                },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
                pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
            };

            const worker = html2pdf().set(opt).from(element);
            const pdfBlob = await worker.output('blob');
            const fileName = `${invoice.invoiceNumber || 'Invoice'}.pdf`;

            // Use browser File System Access API if supported to allow selecting folder
            if (typeof window !== 'undefined' && 'showSaveFilePicker' in window) {
                try {
                    const handle = await (window as any).showSaveFilePicker({
                        suggestedName: fileName,
                        types: [{
                            description: 'PDF Document',
                            accept: { 'application/pdf': ['.pdf'] }
                        }]
                    });
                    const writable = await handle.createWritable();
                    await writable.write(pdfBlob);
                    await writable.close();
                    toast.success('PDF saved successfully!', { id: loadToast });
                } catch (err: any) {
                    if (err.name !== 'AbortError') {
                        console.error('File System Access API failed, falling back:', err);
                        triggerVirtualDownload(pdfBlob, fileName);
                    } else {
                        toast.dismiss(loadToast);
                    }
                }
            } else {
                triggerVirtualDownload(pdfBlob, fileName);
            }
        } catch (err: any) {
            console.error('PDF generation failed:', err);
            toast.error('Failed to generate PDF. Try printing instead.', { id: loadToast });
        } finally {
            // Restore original min-height styles
            originalMinHeights.forEach(item => {
                if (item.style !== null) item.el.setAttribute('style', item.style);
                else item.el.removeAttribute('style');
            });
        }
    };

    const getPaymentStatusColor = (status: string) => {
        if (status === 'paid') return { bg: '#E6FFFA', text: '#319795', border: '#B2F5EA' };
        if (status === 'partial') return { bg: '#FEFCBF', text: '#B7791F', border: '#FEEBC8' };
        return { bg: '#FFF5F5', text: '#E53E3E', border: '#FED7D7' };
    };

    return (
        <div style={{ minHeight: '100dvh', background: '#F8F9FA', fontFamily: 'Inter, sans-serif' }}>
            {/* Print template (hidden normally) */}
            <div className="print-only-container" id="quick-invoice-print-container">
                <div id="quick-invoice-print" style={{ width: 800, background: 'white', padding: '20px', boxSizing: 'border-box' }}>
                    {savedBill ? <InvoicePrintTemplate invoice={savedBill} company={company} copies={copies} themeOverride={company?.quickBillingTheme || company?.templateTheme || 'classic'} previewMode={true} /> :
                        (validItems.length > 0 ? <InvoicePrintTemplate invoice={{
                            partyName: partyName || 'Cash / Walk-in Customer', partyPhone, billingAddress, date, invoiceNumber: nextInvoiceNumber(companyId as string, 'MN'),
                            items: validItems, grandTotal, totalDiscount: globalDiscount, roundOff: parseFloat(roundOffVal) || 0, subTotal, totalGst
                        }} company={company} copies={copies} themeOverride={company?.quickBillingTheme || company?.templateTheme || 'classic'} previewMode={true} /> : null)}
                </div>
            </div>

            <style>{`
        @media print {
            .app-sidebar, .topbar, .bottom-nav, .demo-banner, .no-print, aside, header, nav, footer, .sidebar, .navbar {
                display: none !important;
            }
            html, body, .app-shell, .app-main, .app-content, .app-content-inner {
                display: block !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
                height: auto !important;
                min-height: auto !important;
                background: white !important;
                border: none !important;
                box-shadow: none !important;
            }
            .print-only-container, .print-only-container * {
                visibility: visible !important;
            }
            .print-only-container {
                display: block !important;
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                height: auto !important;
                margin: 0 !important;
                padding: 0 !important;
                z-index: 9999999 !important;
                background: white !important;
            }
        }
        .print-only-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 800px;
            z-index: -9999;
            pointer-events: none;
            background: white;
        }
        
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

            {savedBill && showSuccess ? (() => {
                const payStatus = getPaymentStatusColor(savedBill.paymentStatus);
                return (
                    <div style={{ background: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)', minHeight: '100dvh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: 'Inter, sans-serif', padding: '24px', boxSizing: 'border-box' }} className="no-print">
                        {/* Premium Receipt Card */}
                        <div style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '24px', boxShadow: '0 20px 45px rgba(0, 0, 0, 0.05), 0 10px 20px rgba(0, 0, 0, 0.03)', padding: '40px', width: '100%', maxWidth: '520px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', boxSizing: 'border-box' }}>
                            
                            {/* Floating Success Indicator */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '72px', height: '72px', borderRadius: '50%', background: '#DEF7EC', border: '3px solid #10B981', color: '#10B981', marginBottom: '20px', boxShadow: '0 10px 20px rgba(16, 185, 129, 0.2)' }}>
                                <Check size={36} strokeWidth={3} />
                            </div>

                            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#1E293B', margin: '0 0 4px 0', textAlign: 'center' }}>Bill Generated Successfully!</h2>
                            <p style={{ fontSize: '14px', color: '#64748B', margin: '0 0 32px 0', textAlign: 'center' }}>
                                Invoice <strong style={{ color: '#0F172A' }}>{savedBill.invoiceNumber}</strong> has been saved and is ready.
                            </p>

                            {/* Quick Amount Section */}
                            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '28px', boxSizing: 'border-box' }}>
                                <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Grand Total</span>
                                <span style={{ fontSize: '32px', fontWeight: 950, color: '#0F172A', fontFamily: 'monospace' }}>
                                    ₹{savedBill.grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                </span>
                            </div>

                            {/* Receipt Metadata Grid */}
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '36px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #E2E8F0', paddingBottom: '12px' }}>
                                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>Customer</span>
                                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>{savedBill.partyName || 'Cash / Walk-in Customer'}</span>
                                </div>
                                {savedBill.partyPhone && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #E2E8F0', paddingBottom: '12px' }}>
                                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>Phone / ID</span>
                                        <span style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>{savedBill.partyPhone}</span>
                                    </div>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #E2E8F0', paddingBottom: '12px' }}>
                                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>Date & Time</span>
                                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#334155' }}>{savedBill.date} {savedBill.time || ''}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>Payment Status</span>
                                    <span style={{ fontSize: '12px', fontWeight: 800, color: payStatus.text, background: payStatus.bg, border: `1px solid ${payStatus.border}`, borderRadius: '999px', padding: '4px 12px', textTransform: 'uppercase' }}>
                                        {savedBill.paymentStatus}
                                    </span>
                                </div>
                            </div>

                            {/* Elegant Button Group */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                                <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                                    <button onClick={() => handleDownloadPDF(savedBill)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px 20px', borderRadius: '12px', border: 'none', background: '#34A853', color: 'white', fontSize: '14px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 12px rgba(52, 168, 83, 0.25)', transition: 'transform 0.1s, opacity 0.1s' }} className="btn-scale">
                                        <Download size={16} /> Download PDF
                                    </button>
                                    <button onClick={() => setShowPrintModal(true)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px 20px', borderRadius: '12px', border: '1px solid #CBD5E0', background: 'white', color: '#334155', fontSize: '14px', fontWeight: 800, cursor: 'pointer', transition: 'background 0.15s' }} className="btn-hover-gray">
                                        <Printer size={16} /> Print
                                    </button>
                                </div>

                                <button onClick={() => { setSavedBill(null); setShowSuccess(false); setItems([emptyRow()]); setPartyName(''); setPartyPhone(''); setBillingAddress(''); setDiscountVal(''); setAmountGiven(''); setDate(new Date().toISOString().slice(0, 10)); setTime(new Date().toTimeString().slice(0, 5)); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px 20px', borderRadius: '12px', border: 'none', background: '#4285F4', color: 'white', fontSize: '14px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 12px rgba(66, 133, 244, 0.25)' }} className="btn-scale">
                                    <Plus size={16} /> New Bill
                                </button>
                                
                                <button onClick={() => router.push(`/company/dashboard`)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 20px', borderRadius: '12px', border: 'none', background: 'transparent', color: '#64748B', fontSize: '14px', fontWeight: 700, cursor: 'pointer', textDecoration: 'none' }}>
                                    Back to Dashboard
                                </button>
                            </div>
                        </div>

                        {/* Micro animation styles */}
                        <style>{`
                            .btn-scale:active { transform: scale(0.98); }
                            .btn-hover-gray:hover { background: #F8FAFC !important; border-color: #A0AEC0 !important; }
                            .btn-scale:hover { opacity: 0.95; }
                        `}</style>
                    </div>
                );
            })() : (
                <div className="no-print" style={{ padding: '24px 32px', maxWidth: 1440, margin: '0 auto' }}>
                    <datalist id="parties-list">
                        {parties.map(p => <option key={p.id || p.name} value={p.name}>{p.phone || p.id || ''}</option>)}
                    </datalist>



                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', flex: 1 }}>
                        <h1 style={{ fontSize: 20, fontWeight: 900, color: '#1A202C', margin: 0, minWidth: '140px' }}>Manual Invoice</h1>

                        {(!user?.role || user?.role === 'owner' || user?.role === 'co_owner') && (
                            <button onClick={() => setShowColumnConfig(true)} className="mi-btn" style={{ padding: '6px 12px', fontSize: 12, background: 'white', border: '1px solid #E2E8F0', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                                <Settings size={14} color="#718096" /> Edit Columns
                            </button>
                        )}

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
                        <button onClick={() => setRecurringModalOpen(true)} className="mi-btn" style={{ border: '1px solid transparent', background: '#EBF4FF', color: '#3182CE', padding: '6px 14px' }}><Repeat size={14} /> Recurring</button>
                        <button onClick={() => router.push(`${activeCompanyId ? '/company' : ''}/billing/expenditure`)} className="mi-btn" style={{ border: '1px solid transparent', background: '#FEEBC8', color: '#DD6B20', padding: '6px 14px' }}>
                            <TrendingUp size={14} /> Expenditure
                        </button>
                        {/* Balance Button */}
                        <button onClick={() => setShowBalanceModal(true)} className="mi-btn" style={{ border: '1px solid transparent', background: '#E6FFFA', color: '#2C7A7B', padding: '6px 14px', position: 'relative' }}>
                            <Wallet size={14} /> Balance
                            {outstandingBalanceCount > 0 && (
                                <span style={{ position: 'absolute', top: -4, right: -4, background: '#E53E3E', color: 'white', borderRadius: '50%', width: 16, height: 16, fontSize: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>
                                    {outstandingBalanceCount}
                                </span>
                            )}
                        </button>
                        {/* Suspend Button */}
                        <button onClick={() => setShowSuspendModal(true)} className="mi-btn" style={{ border: '1px solid #FEB2B2', background: '#FFF5F5', color: '#E53E3E', padding: '6px 14px', position: 'relative' }}>
                            <PauseCircle size={14} /> Suspend
                            {suspendedBills.length > 0 && (
                                <span style={{ position: 'absolute', top: -4, right: -4, background: '#E53E3E', color: 'white', borderRadius: '50%', width: 16, height: 16, fontSize: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>
                                    {suspendedBills.length}
                                </span>
                            )}
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
                                {cols.barcode && <th>BARCODE</th>}
                                {cols.hsn && <th>HSN</th>}
                                {cols.mfgDate && <th>MFG. DATE</th>}
                                {cols.mrp && <th style={{ textAlign: 'right' }}>MRP</th>}
                                {cols.size && <th style={{ textAlign: 'center' }}>SIZE</th>}
                                <th style={{ textAlign: 'center', width: 60 }}>QTY</th>
                                <th style={{ textAlign: 'center', width: 60 }}>UNIT</th>
                                <th style={{ textAlign: 'right', width: 80 }}>PRICE</th>
                                {cols.discount && <th style={{ textAlign: 'center', color: '#4285F4' }}>DISCOUNT<br />%<span style={{ display: 'inline-block', width: 20 }} />AMT</th>}
                                {cols.tax && <th style={{ textAlign: 'center', color: '#4285F4' }}>TAX<br />%<span style={{ display: 'inline-block', width: 20 }} />AMT</th>}
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
                                                            <span style={{ fontWeight: 700, fontSize: 13, color: p.isComboOffer ? '#7C3AED' : '#2D3748' }}>
                                                                {p.isComboOffer ? `🎁 [COMBO] ${p.name}` : p.name}
                                                            </span>
                                                            <span style={{ fontSize: 10, opacity: activeSuggestionIdx === pIdx ? 0.8 : 0.5 }}>
                                                                {p.isComboOffer ? `Combo Price: ₹${p.comboOffer.comboPrice}` : `₹${p.sellingPrice} • ${p.stockQty} in stock`}
                                                             </span>
                                                        </div>
                                                        {p.barcode && <span style={{ fontSize: 9, fontFamily: 'monospace', background: activeSuggestionIdx === pIdx ? 'rgba(255,255,255,0.2)' : '#F1F5F9', padding: '2px 4px', borderRadius: 4 }}>{p.barcode}</span>}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </td>
                                    {cols.barcode && (
                                        <td>
                                            <input id={`barcode-input-${i}`} value={item.barcode ?? ''} autoComplete="off" onChange={e => updateItem(i, 'barcode', e.target.value)} onKeyDown={e => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    if (i === items.length - 1) {
                                                        setItems(prev => {
                                                            const nextRows = [...prev, emptyRow()];
                                                            setTimeout(() => { document.getElementById(`barcode-input-${i + 1}`)?.focus(); }, 100);
                                                            return nextRows;
                                                        });
                                                    } else {
                                                        setTimeout(() => { document.getElementById(`barcode-input-${i + 1}`)?.focus(); }, 50);
                                                    }
                                                }
                                            }} />
                                        </td>
                                    )}
                                    {cols.hsn && <td><input value={item.hsnCode ?? ''} onChange={e => updateItem(i, 'hsnCode', e.target.value)} /></td>}
                                    {cols.mfgDate && <td><input type="date" value={item.mfgDate ?? ''} onChange={e => updateItem(i, 'mfgDate', e.target.value)} style={{ padding: '8px 2px' }} /></td>}
                                    {cols.mrp && <td><input type="number" value={item.mrp || ''} onChange={e => updateItem(i, 'mrp', parseFloat(e.target.value) || 0)} style={{ textAlign: 'right' }} /></td>}
                                    {cols.size && <td><input value={item.size ?? ''} onChange={e => updateItem(i, 'size', e.target.value)} style={{ textAlign: 'center' }} /></td>}
                                    <td><input type="number" min="0" value={item.qty ?? 1} onChange={e => updateItem(i, 'qty', e.target.value)} style={{ textAlign: 'center', fontWeight: 'bold' }} /></td>
                                    <td><input value={item.unit ?? 'Pcs'} onChange={e => updateItem(i, 'unit', e.target.value)} style={{ textAlign: 'center' }} /></td>
                                    <td>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                            {item.originalPrice && item.originalPrice !== item.rate && (
                                                <span style={{ fontSize: 10, textDecoration: 'line-through', color: '#EA4335', marginRight: 4 }}>
                                                    ₹{item.originalPrice.toFixed(2)}
                                                </span>
                                            )}
                                            <input 
                                                type="number" 
                                                min="0" 
                                                value={item.rate || ''} 
                                                onChange={e => updateItem(i, 'rate', e.target.value)} 
                                                style={{ textAlign: 'right', color: item.isFree ? '#2F855A' : 'inherit', fontWeight: item.isFree ? 'bold' : 'normal' }}
                                                readOnly={item.isFree}
                                            />
                                            {item.isFree && <span style={{ fontSize: 9, color: '#34A853', fontWeight: 800 }}>FREE ITEM</span>}
                                        </div>
                                    </td>
                                    {cols.discount && (
                                        <td style={{ textAlign: 'center' }}>
                                            <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                                                <input type="number" value={item.discount} onChange={e => updateItem(i, 'discount', e.target.value)} style={{ width: 40, padding: '4px', textAlign: 'center', borderBottom: '1px solid #ddd' }} />
                                                <input readOnly value={item.discountAmt.toFixed(2)} style={{ width: 50, padding: '4px', textAlign: 'center', color: '#A0AEC0' }} />
                                            </div>
                                        </td>
                                    )}
                                    {cols.tax && (
                                        <td style={{ textAlign: 'center' }}>
                                            <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                                                <input type="number" value={item.gstRate} onChange={e => updateItem(i, 'gstRate', e.target.value)} style={{ width: 40, padding: '4px', textAlign: 'center', borderBottom: '1px solid #ddd' }} />
                                                <input readOnly value={item.totalGst.toFixed(2)} style={{ width: 50, padding: '4px', textAlign: 'center', color: '#A0AEC0' }} />
                                            </div>
                                        </td>
                                    )}
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

                        {/* Grand Total + Payment Section */}
                        {grandTotalBeforePointsDiscount > 0 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                 {/* Grand Total */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
                                    <span style={{ fontSize: 16, fontWeight: 900, color: '#1A202C' }}>GRAND TOTAL</span>
                                    <span style={{ fontSize: 26, fontWeight: 900, color: '#1A202C' }}>
                                        ₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                    </span>
                                </div>

                                {/* Promo Offers Summary */}
                                {(bogoDiscountsSum > 0 || comboDiscountsSum > 0) && (
                                    <div style={{ background: '#FFF5F5', borderRadius: 8, padding: '10px 12px', border: '1px solid #FED7D7', fontSize: 13, display: 'flex', flexDirection: 'column', gap: 4 }}>
                                        <span style={{ fontWeight: 800, color: '#C53030', display: 'flex', alignItems: 'center', gap: 5 }}>🎁 Schemes/Offers Applied:</span>
                                        {activeOfferLogs.map((log, idx) => (
                                            <div key={idx} style={{ color: '#E53E3E', fontSize: 12, fontWeight: 600 }}>• {log}</div>
                                        ))}
                                    </div>
                                )}

                                {/* Loyalty Points Panel */}
                                {loyaltyEnabled && (partyPhone.trim() !== '' || selectedCustomer) && (
                                    <div style={{ background: '#F0FFF4', border: '1.5px solid #C6F6D5', borderRadius: 12, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: 13, fontWeight: 800, color: '#22543D', display: 'flex', alignItems: 'center', gap: 6 }}>
                                                🌟 Loyalty Points:
                                            </span>
                                            <span style={{ fontSize: 14, fontWeight: 900, color: '#22543D' }}>{loyaltyPointsAvailable}</span>
                                        </div>
                                        {canRedeemPoints ? (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                                                <span style={{ fontSize: 12, fontWeight: 700, color: '#276749' }}>
                                                    Redeem Points:
                                                </span>
                                                <input 
                                                    type="number"
                                                    value={redeemPointsAmount}
                                                    onChange={e => {
                                                        const rawVal = e.target.value;
                                                        if (rawVal === '') {
                                                            setRedeemPointsAmount('');
                                                            return;
                                                        }
                                                        const val = Math.min(Math.max(0, parseInt(rawVal) || 0), pointsToRedeemLimit);
                                                        setRedeemPointsAmount(String(val));
                                                    }}
                                                    placeholder="0"
                                                    style={{
                                                        width: 70,
                                                        padding: '3px 8px',
                                                        border: '1.5px solid #C6F6D5',
                                                        borderRadius: 8,
                                                        fontSize: 12,
                                                        fontWeight: 800,
                                                        color: '#276749',
                                                        textAlign: 'center',
                                                        outline: 'none',
                                                        background: 'white'
                                                    }}
                                                    max={pointsToRedeemLimit}
                                                    min={0}
                                                />
                                                <button
                                                    onClick={() => setRedeemPointsAmount(String(pointsToRedeemLimit))}
                                                    style={{
                                                        padding: '3px 8px',
                                                        borderRadius: 6,
                                                        border: '1px solid #38A169',
                                                        background: '#E6F4EA',
                                                        color: '#276749',
                                                        fontSize: 11,
                                                        fontWeight: 800,
                                                        cursor: 'pointer',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        transition: 'background 0.15s'
                                                    }}
                                                >
                                                    Max
                                                </button>
                                                <span style={{ fontSize: 12, fontWeight: 700, color: '#276749', marginLeft: 2 }}>
                                                    (Up to {pointsToRedeemLimit} pts · save ₹{(pointsToRedeemAmount * pointsRedemptionValue).toFixed(2)})
                                                </span>
                                            </div>
                                        ) : (
                                            <p style={{ fontSize: 11, color: '#718096', margin: 0 }}>
                                                Need at least {minPointsToRedeem} points to redeem (Current: {loyaltyPointsAvailable}).
                                            </p>
                                        )}
                                        
                                        {/* Detailed Points Ledger Breakdown */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, borderTop: '1px dashed #C6F6D5', paddingTop: 8, marginTop: 4, fontSize: 12 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4A5568', fontWeight: 600 }}>
                                                <span>Current Balance:</span>
                                                <span>{loyaltyPointsAvailable} pts</span>
                                            </div>
                                            {pointsToRedeemAmount > 0 && (
                                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#E53E3E', fontWeight: 800 }}>
                                                    <span>Points to Deduct:</span>
                                                    <span>-{pointsToRedeemAmount} pts (-₹{pointsDiscountValue.toFixed(2)})</span>
                                                </div>
                                            )}
                                            {pointsEarned > 0 && (
                                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2F855A', fontWeight: 700 }}>
                                                    <span>Points to Earn:</span>
                                                    <span>+{pointsEarned} pts</span>
                                                </div>
                                            )}
                                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#22543D', fontWeight: 900, borderTop: '1.5px solid #C6F6D5', paddingTop: 6, marginTop: 2 }}>
                                                <span>Remaining Balance (after save):</span>
                                                <span>{Math.max(0, loyaltyPointsAvailable - pointsToRedeemAmount + pointsEarned)} pts</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Payment mode toggle */}
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button
                                        onClick={() => setUseSplitPayment(false)}
                                        style={{ flex: 1, padding: '9px', borderRadius: 8, border: '2px solid', borderColor: !useSplitPayment ? '#4285F4' : '#E2E8F0', background: !useSplitPayment ? '#E8F0FE' : '#F8FAFC', fontWeight: 800, fontSize: 12, cursor: 'pointer', color: !useSplitPayment ? '#1967D2' : '#718096', transition: 'all 0.15s' }}
                                    >
                                        💵 Single Payment
                                    </button>
                                    <button
                                        onClick={() => setUseSplitPayment(true)}
                                        style={{ flex: 1, padding: '9px', borderRadius: 8, border: '2px solid', borderColor: useSplitPayment ? '#6B46C1' : '#E2E8F0', background: useSplitPayment ? '#EDE9FE' : '#F8FAFC', fontWeight: 800, fontSize: 12, cursor: 'pointer', color: useSplitPayment ? '#553C9A' : '#718096', transition: 'all 0.15s' }}
                                    >
                                        ✂️ Split Payment
                                    </button>
                                </div>

                                {/* Single Payment */}
                                {!useSplitPayment && (
                                    <div style={{ background: '#F8FAFC', borderRadius: 10, border: '1.5px solid #E2E8F0', padding: '10px 14px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ fontSize: 13, fontWeight: 700, color: '#4A5568' }}>Amount Given (₹)</span>
                                            <input
                                                type="number"
                                                value={amountGiven}
                                                onChange={e => setAmountGiven(e.target.value)}
                                                style={{ width: 130, border: '1.5px solid #CBD5E0', borderRadius: 8, outline: 'none', padding: '8px 12px', textAlign: 'right', fontSize: 16, fontWeight: 800 }}
                                                placeholder="0.00"
                                            />
                                        </div>
                                        {amountGiven && parseFloat(amountGiven) > 0 && (() => {
                                            const amountGivenVal = parseFloat(amountGiven) || 0;
                                            const excess = Math.max(0, amountGivenVal - grandTotal);
                                            const excessApplied = selectedCustomer && selectedCustomer.balance > 0 && tallyWithBalance ? Math.min(excess, selectedCustomer.balance) : 0;
                                            const changeToReturn = excess - excessApplied;

                                            return (
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 14, fontWeight: 900 }}>
                                                    <span style={{ color: '#4A5568' }}>Balance Return (Change):</span>
                                                    <span style={{ color: amountGivenVal >= grandTotal ? '#38A169' : '#E53E3E' }}>
                                                        {amountGivenVal >= grandTotal ? '+' : ''}
                                                        ₹{changeToReturn.toFixed(2)}
                                                    </span>
                                                </div>
                                            );
                                        })()}

                                        {selectedCustomer && selectedCustomer.balance > 0 && (
                                            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6, borderTop: '1.5px dashed #E2E8F0', paddingTop: 10 }}>
                                                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, color: '#2B6CB0', cursor: 'pointer' }}>
                                                    <input
                                                        type="checkbox"
                                                        checked={tallyWithBalance}
                                                        onChange={e => setTallyWithBalance(e.target.checked)}
                                                        style={{ width: 16, height: 16, cursor: 'pointer' }}
                                                    />
                                                    Adjust excess payment to clear outstanding balance (Current: ₹{selectedCustomer.balance.toFixed(2)})
                                                </label>
                                                
                                                {amountGiven && parseFloat(amountGiven) > grandTotal && tallyWithBalance && (() => {
                                                    const amountGivenVal = parseFloat(amountGiven) || 0;
                                                    const excess = amountGivenVal - grandTotal;
                                                    const excessApplied = Math.min(excess, selectedCustomer.balance);
                                                    const newOldBalance = selectedCustomer.balance - excessApplied;
                                                    return (
                                                        <div style={{ background: '#EBF8FF', padding: '8px 12px', borderRadius: 8, fontSize: 12, color: '#2B6CB0', display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4 }}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <span>Deducted from Old Balance:</span>
                                                                <span style={{ fontWeight: 800 }}>-₹{excessApplied.toFixed(2)}</span>
                                                            </div>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <span>Remaining Old Balance:</span>
                                                                <span style={{ fontWeight: 800 }}>₹{newOldBalance.toFixed(2)}</span>
                                                            </div>
                                                        </div>
                                                    );
                                                })()}

                                                {amountGiven && parseFloat(amountGiven) < grandTotal && (() => {
                                                    const amountGivenVal = parseFloat(amountGiven) || 0;
                                                    const dueToday = grandTotal - amountGivenVal;
                                                    const newBalance = selectedCustomer.balance + dueToday;
                                                    return (
                                                        <div style={{ background: '#FFF5F5', padding: '8px 12px', borderRadius: 8, fontSize: 12, color: '#C53030', display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4 }}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <span>Today's Unpaid (Added to Balance):</span>
                                                                <span style={{ fontWeight: 800 }}>+₹{dueToday.toFixed(2)}</span>
                                                            </div>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <span>New Outstanding Balance:</span>
                                                                <span style={{ fontWeight: 800 }}>₹{newBalance.toFixed(2)}</span>
                                                            </div>
                                                        </div>
                                                    );
                                                })()}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Split Payment Panel */}
                                {useSplitPayment && (
                                    <div style={{ background: '#FAFBFF', border: '1.5px solid #C3B8F8', borderRadius: 12, padding: '14px 16px' }}>
                                        <div style={{ fontSize: 11, fontWeight: 800, color: '#553C9A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Split Payment Breakdown</div>
                                        {splitPayments.map((sp, idx) => {
                                            const methodInfo = SPLIT_METHODS.find(m => m.key === sp.method);
                                            return (
                                                <div key={idx} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
                                                    <select
                                                        value={sp.method}
                                                        onChange={e => setSplitPayments(prev => prev.map((p, i) => i === idx ? { ...p, method: e.target.value } : p))}
                                                        style={{ flex: 1, padding: '9px 10px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 13, fontWeight: 700, color: methodInfo?.color || '#4A5568', background: 'white', outline: 'none' }}
                                                    >
                                                        {SPLIT_METHODS.map(m => <option key={m.key} value={m.key}>{m.label}</option>)}
                                                    </select>
                                                    <div style={{ position: 'relative', flex: 1 }}>
                                                        <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 14, fontWeight: 800, color: '#4A5568' }}>₹</span>
                                                        <input
                                                            type="number"
                                                            placeholder="0.00"
                                                            value={sp.amount}
                                                            onChange={e => setSplitPayments(prev => prev.map((p, i) => i === idx ? { ...p, amount: e.target.value } : p))}
                                                            style={{ width: '100%', padding: '9px 8px 9px 24px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 14, fontWeight: 800, outline: 'none', textAlign: 'right' }}
                                                        />
                                                    </div>
                                                    {idx > 0 && (
                                                        <button onClick={() => setSplitPayments(prev => prev.filter((_, i) => i !== idx))} style={{ background: '#FEE2E2', border: 'none', borderRadius: 8, width: 34, height: 38, cursor: 'pointer', color: '#C53030', fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>×</button>
                                                    )}
                                                </div>
                                            );
                                        })}
                                        {splitPayments.length < 4 && (
                                            <button
                                                onClick={() => setSplitPayments(prev => [...prev, { method: prev[0]?.method === 'cash' ? 'upi' : 'cash', amount: '' }])}
                                                style={{ width: '100%', padding: '8px', borderRadius: 8, border: '1.5px dashed #C3B8F8', background: 'white', color: '#6B46C1', fontWeight: 800, fontSize: 12, cursor: 'pointer', marginTop: 2 }}
                                            >+ Add Payment Method</button>
                                        )}
                                        {/* Live totals summary */}
                                        {(() => {
                                            const totalSplit = splitPayments.reduce((a, s) => a + (parseFloat(s.amount) || 0), 0);
                                            const remaining = grandTotal - totalSplit;
                                            return (
                                                <div style={{ marginTop: 10, padding: '10px 12px', background: remaining > 0.01 ? '#FFF5F5' : '#F0FFF4', borderRadius: 8, border: `1.5px solid ${remaining > 0.01 ? '#FED7D7' : '#9AE6B4'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{ fontSize: 12, fontWeight: 800, color: remaining > 0.01 ? '#C53030' : '#276749' }}>
                                                        {remaining > 0.01 ? `⚠️ Remaining: ₹${remaining.toFixed(2)}` : '✅ Fully covered'}
                                                    </span>
                                                    <span style={{ fontSize: 12, fontWeight: 700, color: '#4A5568' }}>Collected: ₹{Math.min(totalSplit, grandTotal).toFixed(2)}</span>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                )}
                            </div>
                        )}

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
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
                        <div onClick={e => e.stopPropagation()} style={{ background: 'white', padding: 28, borderRadius: 16, width: 460, maxHeight: '80vh', display: 'flex', flexDirection: 'column', animation: 'fadeUp 0.2s ease', boxSizing: 'border-box' }}>
                            <h3 style={{ fontWeight: 900, fontSize: 18, marginBottom: 4, color: '#1A202C' }}>
                                {actionModal.isRefund ? 'Refund Invoice' : 'Fetch Invoice'}
                            </h3>
                            <p style={{ fontSize: 13, color: '#718096', marginBottom: 16 }}>
                                Select a previous bill below or search by invoice number / customer.
                            </p>
                            
                            {/* Search Input */}
                            <div style={{ position: 'relative', marginBottom: 16 }}>
                                <input
                                    autoFocus
                                    value={actionQuery}
                                    onChange={e => setActionQuery(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && executeAction()}
                                    placeholder="Search invoice number, name, or phone..."
                                    className="mi-input"
                                    style={{ paddingLeft: '36px', paddingRight: '12px', fontSize: 14, height: '40px', boxSizing: 'border-box', fontWeight: 600 }}
                                />
                                <Search size={16} color="#A0AEC0" style={{ position: 'absolute', left: 12, top: 12 }} />
                            </div>

                            {/* Scrollable Bills List */}
                            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20, paddingRight: 4 }} className="custom-scrollbar">
                                {filteredPreviousInvoices.length === 0 ? (
                                    <div style={{ textAlign: 'center', color: '#A0AEC0', padding: '24px 0', fontSize: 13 }}>
                                        No invoices found matching query.
                                    </div>
                                ) : (
                                    filteredPreviousInvoices.map((inv: any) => (
                                        <div 
                                            key={inv.id} 
                                            onClick={() => selectInvoice(inv)}
                                            style={{ 
                                                padding: '12px 14px', 
                                                border: '1px solid #E2E8F0', 
                                                borderRadius: '10px', 
                                                display: 'flex', 
                                                justifyContent: 'space-between', 
                                                alignItems: 'center', 
                                                cursor: 'pointer',
                                                transition: 'all 0.15s ease',
                                            }}
                                            className="fetch-row-hover"
                                        >
                                            <div>
                                                <div style={{ fontWeight: 800, fontSize: 14, color: '#1A202C', display: 'flex', alignItems: 'center', gap: 6 }}>
                                                    <FileText size={14} color="#718096" />
                                                    {inv.invoiceNumber}
                                                </div>
                                                <div style={{ fontSize: 12, color: '#4A5568', fontWeight: 600, marginTop: 2 }}>
                                                    {inv.partyName || 'Cash / Walk-in Customer'}
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontWeight: 800, fontSize: 14, color: '#2D3748', fontFamily: 'monospace' }}>
                                                    ₹{inv.grandTotal.toFixed(2)}
                                                </div>
                                                <div style={{ fontSize: 11, color: '#718096', marginTop: 2 }}>
                                                    {inv.date} {inv.time || ''}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div style={{ display: 'flex', gap: 12 }}>
                                <button onClick={() => setActionModal({ isOpen: false, isRefund: false })} style={{ flex: 1, padding: '10px', borderRadius: 8, background: 'white', border: '1px solid #E2E8F0', fontWeight: 700, color: '#4A5568', cursor: 'pointer' }}>Cancel</button>
                                <button onClick={executeAction} style={{ flex: 1, padding: '10px', borderRadius: 8, background: '#4285F4', border: 'none', fontWeight: 700, color: 'white', cursor: 'pointer' }}>Confirm</button>
                            </div>

                            <style>{`
                                .fetch-row-hover:hover {
                                    background: #F7FAFC;
                                    border-color: #CBD5E0 !important;
                                    transform: translateY(-1px);
                                    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
                                }
                                .custom-scrollbar::-webkit-scrollbar {
                                    width: 5px;
                                }
                                .custom-scrollbar::-webkit-scrollbar-track {
                                    background: #F7FAFC;
                                    border-radius: 4px;
                                }
                                .custom-scrollbar::-webkit-scrollbar-thumb {
                                    background: #CBD5E0;
                                    border-radius: 4px;
                                }
                                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                                    background: #A0AEC0;
                                }
                            `}</style>
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

                {/* Column Configuration Modal */}
                {showColumnConfig && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }} onClick={() => setShowColumnConfig(false)}>
                        <div onClick={e => e.stopPropagation()} style={{ background: 'white', padding: 24, borderRadius: 16, width: 360, display: 'flex', flexDirection: 'column', animation: 'fadeUp 0.2s ease' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                <h3 style={{ fontWeight: 900, fontSize: 18, color: '#1A202C', margin: 0 }}>Configure Billing Columns</h3>
                                <button onClick={() => setShowColumnConfig(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                                    <X size={20} color="#718096" />
                                </button>
                            </div>
                            <p style={{ fontSize: 13, color: '#718096', marginBottom: 20 }}>
                                Toggle billing columns on or off. These changes will be applied to all staff and role logins instantly.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                                {[
                                    { key: 'barcode', label: 'Barcode' },
                                    { key: 'hsn', label: 'HSN / SAC Code' },
                                    { key: 'mfgDate', label: 'Mfg Date' },
                                    { key: 'mrp', label: 'MRP' },
                                    { key: 'size', label: 'Size' },
                                    { key: 'discount', label: 'Discount Columns' },
                                    { key: 'tax', label: 'Tax Columns' }
                                ].map(col => {
                                    const isChecked = cols[col.key as keyof typeof cols] ?? true;
                                    return (
                                        <label key={col.key} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, fontWeight: 700, color: '#2D3748', cursor: 'pointer', userSelect: 'none' }}>
                                            <input 
                                                type="checkbox" 
                                                checked={isChecked}
                                                onChange={e => {
                                                    const updatedCols = {
                                                        ...cols,
                                                        [col.key]: e.target.checked
                                                    };
                                                    updateCompany(companyId!, { quickBillingColumns: updatedCols });
                                                }}
                                                style={{ width: 18, height: 18, cursor: 'pointer' }}
                                            />
                                            {col.label}
                                        </label>
                                    );
                                })}
                            </div>

                            <button onClick={() => setShowColumnConfig(false)} className="mi-btn" style={{ background: '#4285F4', color: 'white', border: 'none', width: '100%', padding: '12px', borderRadius: 10, justifyContent: 'center', fontSize: 14, fontWeight: 800 }}>
                                Save Settings
                            </button>
                        </div>
                    </div>
                )}

                {/* Suspend Modal */}
                {showSuspendModal && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }} onClick={() => setShowSuspendModal(false)}>
                        <div onClick={e => e.stopPropagation()} style={{ background: 'white', padding: 32, borderRadius: 16, width: 500, maxHeight: '80vh', display: 'flex', flexDirection: 'column', animation: 'fadeUp 0.2s ease' }}>
                            <h3 style={{ fontWeight: 900, fontSize: 18, marginBottom: 8, color: '#1A202C' }}>Suspend / Hold Bills</h3>
                            <p style={{ fontSize: 13, color: '#718096', marginBottom: 20 }}>
                                Suspend the current active bill to serve another customer, or resume a previously suspended bill.
                            </p>

                            {/* Suspend Current Bill Section */}
                            {validItems.length > 0 ? (
                                <div style={{ background: '#F7FAFC', border: '1px solid #E2E8F0', padding: 16, borderRadius: 12, marginBottom: 20 }}>
                                    <h4 style={{ fontWeight: 800, fontSize: 13, color: '#4A5568', marginBottom: 8 }}>Suspend Active Bill</h4>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <span style={{ fontWeight: 700, fontSize: 14 }}>{partyName || 'Walk-in Customer'}</span>
                                            <span style={{ fontSize: 12, color: '#718096', marginLeft: 8 }}>({validItems.length} items - ₹{grandTotal})</span>
                                        </div>
                                        <button onClick={handleSuspend} className="mi-btn" style={{ background: '#E53E3E', color: 'white', border: 'none' }}>
                                            <PauseCircle size={14} /> Suspend Bill
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#FFF5F5', border: '1px solid #FED7D7', color: '#C53030', padding: '12px 16px', borderRadius: 8, fontSize: 12, fontWeight: 700, marginBottom: 20 }}>
                                    <AlertCircle size={16} />
                                    No items in current active bill to suspend.
                                </div>
                            )}

                            {/* Suspended Bills List */}
                            <h4 style={{ fontWeight: 800, fontSize: 13, color: '#4A5568', marginBottom: 10 }}>Suspended Bills ({suspendedBills.length})</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto', flex: 1 }}>
                                {suspendedBills.length === 0 ? (
                                    <div style={{ textAlign: 'center', color: '#A0AEC0', padding: '20px 0', fontSize: 13 }}>No suspended bills on hold.</div>
                                ) : (
                                    suspendedBills.map((sus: any) => (
                                        <div key={sus.id} style={{ padding: 14, border: '1px solid #E2E8F0', borderRadius: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8FAFC' }}>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: 800, fontSize: 14, color: '#2D3748' }}>{sus.label}</div>
                                                <div style={{ fontSize: 11, color: '#A0AEC0', marginTop: 2 }}>{new Date(sus.suspendedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {sus.items.length} items</div>
                                                <div style={{ fontSize: 12, color: '#718096', marginTop: 4 }}>
                                                    {sus.items.map((it: any) => `${it.name} x${it.qty}`).join(', ')}
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                                <span style={{ fontWeight: 800, color: '#1A202C', fontSize: 14, marginRight: 8 }}>₹{sus.grandTotal}</span>
                                                <button onClick={() => handleResumeSuspended(sus)} className="mi-btn" style={{ background: '#4285F4', color: 'white', border: 'none', padding: '6px 12px' }}>
                                                    <PlayCircle size={14} /> Resume
                                                </button>
                                                <button onClick={() => handleDeleteSuspended(sus.id)} className="mi-btn" style={{ background: 'transparent', color: '#E53E3E', border: 'none', padding: '6px 8px' }}>
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                                <button onClick={() => setShowSuspendModal(false)} style={{ flex: 1, padding: '10px', borderRadius: 8, background: 'white', border: '1px solid #E2E8F0', fontWeight: 700, color: '#4A5568', cursor: 'pointer' }}>Close</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Balance Modal */}
                {showBalanceModal && (() => {
                    // Compute accurate balances from actual unpaid invoices (not party.balance which can be corrupted)
                    const DRAFT = ['estimate', 'proforma', 'delivery_challan'];
                    type TrackerEntry = { party: any; computedBalance: number; };
                    const trackerMap = new Map<string, TrackerEntry>();
                    // Build map from parties
                    parties.filter((p: any) => p.companyId === companyId).forEach((p: any) => {
                        const key = normPhone(p.phone) || p.id;
                        if (!trackerMap.has(key)) trackerMap.set(key, { party: p, computedBalance: 0 });
                    });
                    // Sum up unpaid invoice balanceDue per party key
                    invoices
                        .filter((i: any) => i.invoiceType === 'sale' && !DRAFT.includes(i.invoiceType) && i.paymentStatus !== 'paid' && (i.balanceDue ?? 0) > 0)
                        .forEach((i: any) => {
                            const key = normPhone(i.partyPhone) || i.partyId || '';
                            if (!key) return;
                            if (trackerMap.has(key)) {
                                trackerMap.get(key)!.computedBalance += i.balanceDue;
                            } else {
                                // Invoice references a party not in parties list — find by id or phone
                                const p = parties.find((p: any) => p.id === i.partyId) ||
                                          parties.find((p: any) => normPhone(p.phone) === key);
                                if (p) {
                                    const pKey = normPhone(p.phone) || p.id;
                                    if (trackerMap.has(pKey)) {
                                        trackerMap.get(pKey)!.computedBalance += i.balanceDue;
                                    } else {
                                        trackerMap.set(pKey, { party: p, computedBalance: i.balanceDue });
                                    }
                                } else {
                                    trackerMap.set(key, { party: { id: i.partyId, name: i.partyName, phone: i.partyPhone }, computedBalance: i.balanceDue });
                                }
                            }
                        });
                    const trackerEntries = Array.from(trackerMap.entries())
                        .map(([mapKey, value]) => ({ mapKey, ...value }))
                        .filter(e => e.computedBalance > 0)
                        .filter(e => {
                            if (!balanceSearchQuery) return true;
                            const q = balanceSearchQuery.toLowerCase().trim();
                            return e.party.name?.toLowerCase().includes(q) || (e.party.phone || '').includes(q);
                        })
                        .sort((a, b) => b.computedBalance - a.computedBalance);
                    const grandTotal = trackerEntries.reduce((a, e) => a + e.computedBalance, 0);
                    return (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }} onClick={() => setShowBalanceModal(false)}>
                    <div onClick={e => e.stopPropagation()} style={{ background: 'white', padding: 32, borderRadius: 16, width: 600, maxHeight: '85vh', display: 'flex', flexDirection: 'column', animation: 'fadeUp 0.2s ease' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                            <h3 style={{ fontWeight: 900, fontSize: 18, color: '#1A202C', margin: 0 }}>Customer Balance Tracker</h3>
                            <span style={{ background: '#E6FFFA', color: '#2C7A7B', padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 800 }}>
                                Total Pending: ₹{grandTotal.toLocaleString('en-IN')}
                            </span>
                        </div>
                        <p style={{ fontSize: 13, color: '#718096', marginBottom: 16 }}>
                            View pending balance amounts from each customer. Click a customer to quickly auto-populate details.
                        </p>

                        {/* Search bar */}
                        <div style={{ position: 'relative', marginBottom: 16 }}>
                            <input
                                type="text"
                                placeholder="Search customer by name or phone..."
                                value={balanceSearchQuery}
                                onChange={e => setBalanceSearchQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 14px 10px 36px',
                                    borderRadius: 8,
                                    border: '1px solid #CBD5E0',
                                    fontSize: 13,
                                    outline: 'none',
                                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)'
                                }}
                            />
                            <Search size={16} color="#A0AEC0" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                            {balanceSearchQuery && (
                                <button
                                    onClick={() => setBalanceSearchQuery('')}
                                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#A0AEC0' }}
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto', flex: 1 }}>
                            {trackerEntries.length === 0 ? (
                                <div style={{ textAlign: 'center', color: '#A0AEC0', padding: '40px 0', fontSize: 13 }}>No customers with outstanding balance.</div>
                            ) : trackerEntries.map(({ mapKey, party, computedBalance }) => (
                                <div key={mapKey} style={{ padding: 14, border: '1px solid #E2E8F0', borderRadius: 10, display: 'flex', flexDirection: 'column', gap: 10, background: '#F8FAFC' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <div style={{ fontWeight: 800, fontSize: 14, color: '#2D3748' }}>{party.name}</div>
                                            <div style={{ fontSize: 11, color: '#A0AEC0', marginTop: 2 }}>{party.phone || 'No phone'}</div>
                                        </div>
                                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                            <span style={{ fontWeight: 900, color: '#E53E3E', fontSize: 15 }}>₹{computedBalance.toLocaleString('en-IN')}</span>
                                            <button onClick={() => {
                                                setPartyName(party.name);
                                                setPartyPhone(party.phone || '');
                                                setBillingAddress(party.billingAddress || party.address || '');
                                                setShowBalanceModal(false);
                                                toast.success(`Selected customer "${party.name}"`);
                                                    }} className="mi-btn" style={{ background: '#E6FFFA', color: '#2C7A7B', border: 'none', padding: '6px 12px', fontSize: 12 }}>
                                                        Select
                                                    </button>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: 8, alignItems: 'center', borderTop: '1px solid #EDF2F7', paddingTop: 10, flexWrap: 'wrap' }}>
                                                <span style={{ fontSize: 12, color: '#718096', fontWeight: 600 }}>Amount Paid:</span>
                                                 <input
                                                     type="number"
                                                     placeholder="0.00"
                                                     value={customPayments[party.id] || ''}
                                                     onChange={e => setCustomPayments(prev => ({ ...prev, [party.id]: e.target.value }))}
                                                     style={{ width: 90, padding: '4px 8px', border: '1px solid #CBD5E0', borderRadius: 6, fontSize: 12, outline: 'none' }}
                                                 />
                                                 <button onClick={() => {
                                                    const amt = parseFloat(customPayments[party.id]) || 0;
                                                    if (amt <= 0) {
                                                        toast.error('Please enter a valid amount greater than 0');
                                                        return;
                                                    }
                                                    if (amt > computedBalance) {
                                                        toast.error(`Amount exceeds pending balance of ₹${computedBalance.toLocaleString('en-IN')}`);
                                                        return;
                                                    }

                                                    // addBalancePayment handles the balance update + records into paymentHistory
                                                    addBalancePayment(party.id, {
                                                        type: 'received',
                                                        amount: amt,
                                                        method: 'cash',
                                                        date: new Date().toLocaleDateString('sv-SE'),
                                                        note: 'Recorded via Balance Tracker'
                                                    });

                                                    let remainingPayment = amt;
                                                    const sortedInvoices = [...invoices].reverse();
                                                    sortedInvoices.forEach((inv: any) => {
                                                        if (remainingPayment <= 0) return;
                                                        if (inv.partyId === party.id || (party.phone && inv.partyPhone === party.phone)) {
                                                            if (inv.balanceDue > 0) {
                                                                const deduction = Math.min(inv.balanceDue, remainingPayment);
                                                                const newPaid = inv.amountPaid + deduction;
                                                                const newDue = inv.balanceDue - deduction;
                                                                updateInvoice(inv.id, {
                                                                    amountPaid: newPaid,
                                                                    balanceDue: newDue,
                                                                    paymentStatus: newDue === 0 ? 'paid' : 'partial'
                                                                });
                                                                remainingPayment -= deduction;
                                                            }
                                                        }
                                                    });
                                                    
                                                    setCustomPayments(prev => ({ ...prev, [party.id]: '' }));
                                                    toast.success(`Received ₹${amt.toLocaleString('en-IN')} payment from "${party.name}"`);
                                                }} className="mi-btn" style={{ background: '#EBF8FF', color: '#2B6CB0', border: 'none', padding: '4px 10px', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                                                    <Check size={12} /> Record Payment
                                                </button>
                                                <button onClick={async () => {
                                                    const confirmed = await confirm({
                                                        title: 'Clear Outstanding Balance',
                                                        message: `Are you sure you want to mark the balance of ₹${computedBalance.toLocaleString('en-IN')} as fully paid for "${party.name}"?`,
                                                        confirmLabel: 'Mark Fully Paid',
                                                        success: true
                                                    });
                                                    if (confirmed) {
                                                        const fullAmt = computedBalance;
                                                        // addBalancePayment handles the balance update (sets to 0) + records history
                                                        addBalancePayment(party.id, {
                                                            type: 'received',
                                                            amount: fullAmt,
                                                            method: 'cash',
                                                            date: new Date().toLocaleDateString('sv-SE'),
                                                            note: 'Marked fully paid via Balance Tracker'
                                                        });
                                                        invoices.forEach((inv: any) => {
                                                            if (inv.partyId === party.id || (party.phone && inv.partyPhone === party.phone)) {
                                                                if (inv.balanceDue > 0) {
                                                                    updateInvoice(inv.id, {
                                                                        paymentStatus: 'paid',
                                                                        amountPaid: inv.grandTotal,
                                                                        balanceDue: 0
                                                                    });
                                                                }
                                                            }
                                                        });
                                                        toast.success(`Cleared balance for "${party.name}"`);
                                                    }
                                                }} className="mi-btn" style={{ background: '#F0FFF4', color: '#38A169', border: 'none', padding: '4px 10px', fontSize: 12, fontWeight: 700, marginLeft: 'auto' }}>
                                                    Paid Fully
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                                    <button onClick={() => setShowBalanceModal(false)} style={{ flex: 1, padding: '10px', borderRadius: 8, background: 'white', border: '1px solid #E2E8F0', fontWeight: 700, color: '#4A5568', cursor: 'pointer' }}>Close</button>
                                </div>
                            </div>
                        </div>
                    );
                })()}
            </div>
            )}
            <ConfirmDialog />
        </div>
    );
}

export default function NewBillPage() {
    return <Suspense><QuickBillingContent /></Suspense>;
}
