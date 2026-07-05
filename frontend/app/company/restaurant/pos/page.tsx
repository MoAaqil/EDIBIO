'use client';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStore, useCompanyData, useActiveCompany } from '@/lib/store';
import type { Product, PaymentEntry, PaymentMethod } from '@/lib/types';
import {
    Search, Bell, Settings, LayoutDashboard, UtensilsCrossed,
    ClipboardList, FileText, LogOut, Plus, Minus, Printer,
    CheckCircle, X, Trash2, Clock, ChefHat, Tag, Truck,
    Timer, RefreshCw, ChevronLeft, ChevronRight, Edit2, Save, User
} from 'lucide-react';
import toast from 'react-hot-toast';
import { confirm } from '@/components/ConfirmDialog';

// ─── Types ───────────────────────────────────────────────────────────────────

interface KitchenOrder {
    id: string;
    tableNumber: string;
    orderType: string;
    items: { name: string; qty: number }[];
    status: 'new' | 'cooking' | 'ready' | 'served';
    createdAt: string;
    servedBy?: string;
}

interface Deal {
    id: string;
    title: string;
    description: string;
    discount: number;
    type: 'percent' | 'flat';
    validUntil: string;
    emoji: string;
}

interface TimeMenuSlot {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
}

interface RestSettings {
    deliveryCharge: number;
    takeawayCharge: number;
    numberOfTables: number;
    upiId: string;
    invoiceNote: string;
    invoicePrefix: string;
    customWaiters?: string[];
    serviceCharge?: number;
    defaultGstRate?: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getMealSlot(): { slot: 'breakfast' | 'lunch' | 'dinner' | null; label: string } {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 11) return { slot: 'breakfast', label: 'Breakfast Menu Active 🌅' };
    if (hour >= 11 && hour < 16) return { slot: 'lunch', label: 'Lunch Menu Active ☀️' };
    if (hour >= 16 && hour < 23) return { slot: 'dinner', label: 'Dinner Menu Active 🌙' };
    return { slot: null, label: '' };
}

function uid() {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function RestaurantPOS() {
    const company = useActiveCompany();
    const products = useCompanyData('products') as Product[];
    const { addInvoice, nextInvoiceNumber, addProduct, deleteProduct, updateCompany } = useStore();
    const router = useRouter();

    // ── POS State ──
    const [activeTab, setActiveTab] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('edibio_pos_active_tab');
            const validTabs = ['Pos', 'MenuTime', 'Kitchen', 'Deals', 'Table', 'RestSettings'];
            if (saved && validTabs.includes(saved)) return saved;
        }
        return 'Pos';
    });
    const [activeCat, setActiveCat] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [orderType, setOrderType] = useState('Dining');
    const [tableNumber, setTableNumber] = useState('Table 1');
    const [cart, setCart] = useState<{ item: Product; qty: number }[]>([]);
    const invoices = useCompanyData('invoices') as any[];

    // ── Enhancements State ──
    const [showTableMapModal, setShowTableMapModal] = useState(false);
    const [dirtyTables, setDirtyTables] = useState<string[]>([]);
    const [selectedWaiter, setSelectedWaiter] = useState('Self Service');
    const [cartDiscountPercent, setCartDiscountPercent] = useState(0);
    const [customServiceCharge, setCustomServiceCharge] = useState(10);

    // ── Split Billing State ──
    const [showSplitModal, setShowSplitModal] = useState(false);
    const [splitCash, setSplitCash] = useState(0);
    const [splitUpi, setSplitUpi] = useState(0);
    const [splitCard, setSplitCard] = useState(0);
    const [splitShares, setSplitShares] = useState(2);

    // ── Add Item Modal ──
    const [showAdd, setShowAdd] = useState(false);
    const [form, setForm] = useState({ name: '', category: '', sellingPrice: '', imageUrl: '' });

    // ── Fetch Bill Modal ──
    const [fetchModal, setFetchModal] = useState(false);
    const [fetchQuery, setFetchQuery] = useState('');
    const [fetchedInv, setFetchedInv] = useState<any>(null);

    // ── Settings ──
    const [restSettings, setRestSettings] = useState<RestSettings>({
        deliveryCharge: 0,
        takeawayCharge: 0,
        numberOfTables: 12,
        upiId: '',
        invoiceNote: '',
        invoicePrefix: 'INV',
        customWaiters: [],
        serviceCharge: 10,
        defaultGstRate: 5,
    });
    const [settingsForm, setSettingsForm] = useState<RestSettings>({
        deliveryCharge: 0,
        takeawayCharge: 0,
        numberOfTables: 12,
        upiId: '',
        invoiceNote: '',
        invoicePrefix: 'INV',
        customWaiters: [],
        serviceCharge: 10,
        defaultGstRate: 5,
    });

    // ── Kitchen Orders ──
    const [kitchenOrders, setKitchenOrders] = useState<KitchenOrder[]>([]);

    // ── Derived/Synced State ──
    const waiterList = useMemo(() => {
        let servers: string[] = [];
        if (company?.team && Array.isArray(company.team)) {
            servers = company.team.filter((member: any) =>
                member.role === 'server' || member.role === 'staff' || member.role === 'waiter'
            ).map((member: any) => member.name);
        }
        const customs = restSettings.customWaiters || [];
        const combined = Array.from(new Set(['Self Service', ...servers, ...customs]));
        return combined;
    }, [company?.team, restSettings.customWaiters]);

    const occupiedTables = useMemo(() => {
        return new Set(
            kitchenOrders
                .filter(o => o.orderType === 'Dining' && ['new', 'cooking', 'ready'].includes(o.status))
                .map(o => o.tableNumber)
        );
    }, [kitchenOrders]);

    // Sync kitchenOrders wrapper to also update store
    const updateKitchenOrders = (nextOrders: KitchenOrder[] | ((prev: KitchenOrder[]) => KitchenOrder[])) => {
        const next = typeof nextOrders === 'function' ? nextOrders(kitchenOrders) : nextOrders;
        setKitchenOrders(next);
        if (company) {
            const mappedForCompany = next.map(o => ({
                id: o.id,
                tableNum: o.tableNumber ? o.tableNumber.replace('Table ', '') : '1',
                area: o.orderType || 'Dining',
                orderedAt: o.createdAt,
                status: (o.status === 'cooking' ? 'preparing' : o.status) as 'new' | 'preparing' | 'ready',
                servedBy: o.servedBy || '',
                items: o.items
            }));
            updateCompany(company.id, { kitchenOrders: mappedForCompany });
        }
    };

    // Sync company kitchen orders into local state
    useEffect(() => {
        if (company?.kitchenOrders && Array.isArray(company.kitchenOrders)) {
            const mappedForLocal = company.kitchenOrders.map((o: any) => ({
                id: o.id || Math.random().toString(),
                tableNumber: o.tableNum ? (o.tableNum.startsWith('Table ') ? o.tableNum : `Table ${o.tableNum}`) : 'Table 1',
                orderType: o.area || 'Dining',
                items: o.items || [],
                status: o.status === 'preparing' ? 'cooking' : o.status,
                createdAt: o.orderedAt || new Date().toISOString(),
                servedBy: o.servedBy || '',
            }));
            
            const localStr = JSON.stringify(kitchenOrders);
            const incomingStr = JSON.stringify(mappedForLocal);
            if (localStr !== incomingStr) {
                setKitchenOrders(mappedForLocal);
            }
        }
    }, [company?.kitchenOrders]);

    // ── Deals ──
    const [deals, setDeals] = useState<Deal[]>([]);
    const [carouselIdx, setCarouselIdx] = useState(0);
    const [showDealForm, setShowDealForm] = useState(false);
    const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
    const [dealForm, setDealForm] = useState<Omit<Deal, 'id'>>({
        title: '', description: '', discount: 0, type: 'percent', validUntil: '', emoji: '🎉'
    });

    // ── Time Menu ──
    const [timeMenu, setTimeMenu] = useState<TimeMenuSlot>({ breakfast: [], lunch: [], dinner: [] });
    const [filterByTime, setFilterByTime] = useState(false);
    const { slot: currentSlot, label: slotLabel } = getMealSlot();

    // ── Load from localStorage ──
    useEffect(() => {
        try {
            const s = localStorage.getItem('restaurant_settings');
            if (s) {
                const parsed = JSON.parse(s);
                // Merge company UPI into settings if not already set
                if (!parsed.upiId && company?.bankDetails?.upiId) {
                    parsed.upiId = company.bankDetails.upiId;
                }
                setRestSettings(parsed);
                setSettingsForm(parsed);
                if (parsed.serviceCharge !== undefined) {
                    setCustomServiceCharge(parsed.serviceCharge);
                }
            } else if (company?.bankDetails?.upiId) {
                // No saved settings yet, pre-fill UPI from company
                setSettingsForm(prev => ({ ...prev, upiId: company.bankDetails?.upiId || '' }));
                setRestSettings(prev => ({ ...prev, upiId: company.bankDetails?.upiId || '' }));
            }
        } catch { }
        try {
            const k = localStorage.getItem('restaurant_kitchen_orders');
            if (k) setKitchenOrders(JSON.parse(k));
        } catch { }
        try {
            const dt = localStorage.getItem('restaurant_dirty_tables');
            if (dt) setDirtyTables(JSON.parse(dt));
        } catch { }
        try {
            const d = localStorage.getItem('restaurant_deals');
            if (d) setDeals(JSON.parse(d));
        } catch { }
        try {
            const tm = localStorage.getItem('restaurant_time_menu');
            if (tm) setTimeMenu(JSON.parse(tm));
        } catch { }
    }, []);

    // ── Persist kitchen orders ──
    useEffect(() => {
        localStorage.setItem('restaurant_kitchen_orders', JSON.stringify(kitchenOrders));
    }, [kitchenOrders]);

    // ── Persist active tab ──
    useEffect(() => {
        localStorage.setItem('edibio_pos_active_tab', activeTab);
    }, [activeTab]);

    // ── Persist dirty tables ──
    useEffect(() => {
        localStorage.setItem('restaurant_dirty_tables', JSON.stringify(dirtyTables));
    }, [dirtyTables]);

    // ── Persist deals ──
    useEffect(() => {
        localStorage.setItem('restaurant_deals', JSON.stringify(deals));
    }, [deals]);

    // ── Persist time menu ──
    useEffect(() => {
        localStorage.setItem('restaurant_time_menu', JSON.stringify(timeMenu));
    }, [timeMenu]);

    // ── Auto carousel ──
    const activeDeals = useMemo(() =>
        deals.filter(d => !d.validUntil || new Date(d.validUntil) >= new Date()),
        [deals]
    );
    useEffect(() => {
        if (activeDeals.length < 2) return;
        const t = setInterval(() => setCarouselIdx(i => (i + 1) % activeDeals.length), 3000);
        return () => clearInterval(t);
    }, [activeDeals.length]);

    // ── Categories ──
    const categories = useMemo(() => {
        const cats = Array.from(new Set(products.map(p => p.category).filter(Boolean)));
        return ['All', ...cats] as string[];
    }, [products]);

    // ── Filtered Items ──
    const filteredItems = useMemo(() => {
        let items = products;
        if (filterByTime && currentSlot && timeMenu[currentSlot].length > 0) {
            items = items.filter(i => timeMenu[currentSlot].includes(i.id));
        }
        if (activeCat !== 'All') {
            items = items.filter(i => i.category === activeCat);
        }
        if (searchQuery) {
            items = items.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        return items;
    }, [products, activeCat, searchQuery, filterByTime, currentSlot, timeMenu]);

    // ── Cart Math ──
    const subTotal = cart.reduce((acc, c) => acc + c.item.sellingPrice * c.qty, 0);
    const discountAmount = subTotal * (cartDiscountPercent / 100);
    const discountFactor = 1 - (cartDiscountPercent / 100);
    const tax = cart.reduce((acc, c) => {
        if (!c.item.taxIncluded) {
            const discountedPrice = c.item.sellingPrice * discountFactor;
            const rate = typeof c.item.gstRate === 'number' ? c.item.gstRate : (typeof restSettings.defaultGstRate === 'number' ? restSettings.defaultGstRate : 5);
            return acc + (discountedPrice * rate / 100) * c.qty;
        }
        return acc;
    }, 0);
    const extraCharge =
        orderType === 'Takeaway' ? restSettings.takeawayCharge :
            orderType === 'Delivery' ? restSettings.deliveryCharge : 0;
    const total = (subTotal - discountAmount) + tax + extraCharge + customServiceCharge;

    const numTables = restSettings.numberOfTables || 12;
    const tableOptions = Array.from({ length: numTables }, (_, i) => `Table ${i + 1}`);

    // ── Table Layout Positions State ──
    const [tablePositions, setTablePositions] = useState<Record<string, number>>({});
    const [editLayoutMode, setEditLayoutMode] = useState(false);
    const [selectedTableForMove, setSelectedTableForMove] = useState<string | null>(null);

    // Sync table positions when restSettings.numberOfTables changes
    useEffect(() => {
        try {
            const stored = localStorage.getItem('restaurant_table_positions');
            const currentPositions = stored ? JSON.parse(stored) : {};
            const updated: Record<string, number> = { ...currentPositions };
            
            // Find occupied indices
            const occupiedIndices = new Set<number>(Object.values(updated) as number[]);
            
            // Find next free index helper
            const getNextFreeIndex = () => {
                for (let idx = 0; idx < 36; idx++) {
                    if (!occupiedIndices.has(idx)) {
                        return idx;
                    }
                }
                return 35; // Fallback
            };

            let changed = false;
            // 1. Add missing tables
            for (let i = 0; i < numTables; i++) {
                const name = `Table ${i + 1}`;
                if (updated[name] === undefined) {
                    const freeIdx = getNextFreeIndex();
                    updated[name] = freeIdx;
                    occupiedIndices.add(freeIdx);
                    changed = true;
                }
            }
            // 2. Remove obsolete tables (if table count is reduced)
            Object.keys(updated).forEach(k => {
                const tableNum = parseInt(k.replace('Table ', ''));
                if (tableNum > numTables) {
                    delete updated[k];
                    changed = true;
                }
            });

            if (changed || !stored) {
                setTablePositions(updated);
                localStorage.setItem('restaurant_table_positions', JSON.stringify(updated));
            } else {
                setTablePositions(currentPositions);
            }
        } catch { }
    }, [numTables]);

    // ── Image Upload ──
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => setForm(f => ({ ...f, imageUrl: ev.target?.result as string }));
            reader.readAsDataURL(file);
        }
    };

    // ── Save Product ──
    const handleSaveProduct = () => {
        if (!company) return;
        if (!form.name || !form.sellingPrice) return toast.error('Name and price required');
        addProduct({
            companyId: company.id,
            name: form.name,
            category: form.category || 'Uncategorized',
            sellingPrice: parseFloat(form.sellingPrice) || 0,
            purchasePrice: 0,
            stockQty: 9999,
            lowStockAlertQty: 0,
            gstRate: 0 as any,
            taxIncluded: true,
            unit: 'pcs',
            imageUrl: form.imageUrl,
            cessRate: 0,
        });
        setShowAdd(false);
        setForm({ name: '', category: '', sellingPrice: '', imageUrl: '' });
        setActiveCat('All');
    };

    // ── Cart Ops ──
    const addToCart = (item: Product) => {
        setCart(prev => {
            const ex = prev.find(p => p.item.id === item.id);
            if (ex) return prev.map(p => p.item.id === item.id ? { ...p, qty: p.qty + 1 } : p);
            return [...prev, { item, qty: 1 }];
        });
    };

    const updateQty = (id: string, delta: number) => {
        setCart(prev =>
            prev.map(p => p.item.id === id ? { ...p, qty: Math.max(0, p.qty + delta) } : p)
                .filter(p => p.qty > 0)
        );
    };

    // ── Fetch Bill ──
    const handleFetchBill = () => {
        const inv = invoices.find(i =>
            i.invoiceNumber.toLowerCase() === fetchQuery.toLowerCase() || i.id === fetchQuery
        );
        if (inv) setFetchedInv(inv);
        else toast.error('Invoice not found!');
    };

    // ── Create Kitchen Order ──
    const createKitchenOrder = (status: 'new' | 'cooking' = 'new'): KitchenOrder => ({
        id: uid(),
        tableNumber: orderType === 'Dining' ? tableNumber : '',
        orderType,
        items: cart.map(c => ({ name: c.item.name, qty: c.qty })),
        status,
        createdAt: new Date().toISOString(),
        servedBy: selectedWaiter,
    });

    // ── Send to Kitchen ──
    const handleSendToKitchen = () => {
        if (cart.length === 0) return toast.error('Cart is empty!');
        const order = createKitchenOrder('new');
        updateKitchenOrders(prev => [order, ...prev]);
        toast.success('Order sent to kitchen! 🍳');
    };

    // ── Checkout ──
    const handleCheckout = () => {
        if (!company) return;
        if (cart.length === 0) return toast.error('Cart is empty!');

        const invNum = nextInvoiceNumber(company.id, company.invoicePrefix);
        const newId = uid();

        addInvoice({
            id: newId,
            companyId: company.id,
            invoiceType: 'sale',
            invoiceNumber: invNum,
            date: new Date().toISOString().split('T')[0],
            items: cart.map(c => {
                const tr = c.item.gstRate as number;
                const origRate = c.item.sellingPrice;
                const discAmt = origRate * (cartDiscountPercent / 100);
                const effectiveRate = origRate - discAmt;
                const ta = c.item.taxIncluded ? effectiveRate / (1 + tr / 100) : effectiveRate;
                const amt = c.item.taxIncluded ? effectiveRate : ta * (1 + tr / 100);
                return {
                    productId: c.item.id,
                    name: c.item.name,
                    qty: c.qty,
                    unit: c.item.unit,
                    rate: origRate,
                    discount: cartDiscountPercent,
                    discountAmt: discAmt * c.qty,
                    taxableAmt: ta * c.qty,
                    gstRate: tr as any,
                    cgst: tr / 2, sgst: tr / 2, igst: 0, cess: 0,
                    totalGst: (amt - ta) * c.qty,
                    amount: amt * c.qty,
                    hsnCode: c.item.hsnCode,
                };
            }),
            subTotal,
            totalDiscount: discountAmount,
            taxableAmount: subTotal - discountAmount,
            totalCgst: tax / 2, totalSgst: tax / 2, totalIgst: 0, totalCess: 0, totalGst: tax,
            shippingCharges: orderType === 'Delivery' ? restSettings.deliveryCharge : 0,
            packingCharges: orderType === 'Takeaway' ? restSettings.takeawayCharge : 0,
            adjustmentAmount: customServiceCharge,
            roundOff: 0,
            grandTotal: total,
            paymentStatus: 'paid', amountPaid: total, balanceDue: 0,
            payments: [{ method: 'cash', amount: total, date: new Date().toISOString().split('T')[0] }],
            paymentMethod: 'cash',
            partyName: orderType === 'Dining' ? `Dining - ${tableNumber}` : orderType,
            counter: `${orderType} - ${tableNumber}`,
            notes: `${orderType} Order`,
            isGstBill: true, isHidden: false, isPrivate: false,
            createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
            servedBy: selectedWaiter,
        });

        // Also create kitchen order
        const kitOrder = createKitchenOrder('new');
        updateKitchenOrders(prev => [kitOrder, ...prev]);

        setCart([]);
        setCartDiscountPercent(0);
        setCustomServiceCharge(0);
        window.open(`/company/billing/invoice?id=${newId}&print=true`, '_blank');
        toast.success(`Order billed! ${tableNumber}`);
    };

    // ── Split/Multi-Payment Checkout ──
    const handleSplitCheckout = () => {
        if (!company) return;
        const paidSum = splitCash + splitUpi + splitCard;
        if (Math.abs(paidSum - total) > 0.01) {
            return toast.error(`Payments must total exactly ₹${total.toFixed(2)}. Current total: ₹${paidSum.toFixed(2)}`);
        }

        const invNum = nextInvoiceNumber(company.id, company.invoicePrefix);
        const newId = uid();

        // Build payments array
        const paymentsList: PaymentEntry[] = [];
        const today = new Date().toISOString().split('T')[0];
        if (splitCash > 0) paymentsList.push({ method: 'cash', amount: splitCash, date: today });
        if (splitUpi > 0) paymentsList.push({ method: 'upi', amount: splitUpi, date: today });
        if (splitCard > 0) paymentsList.push({ method: 'card', amount: splitCard, date: today });

        // Determine primary method name
        const methodNames = paymentsList.map(p => p.method.toUpperCase()).join(' + ');

        addInvoice({
            id: newId,
            companyId: company.id,
            invoiceType: 'sale',
            invoiceNumber: invNum,
            date: today,
            items: cart.map(c => {
                const tr = c.item.gstRate as number;
                const origRate = c.item.sellingPrice;
                const discAmt = origRate * (cartDiscountPercent / 100);
                const effectiveRate = origRate - discAmt;
                const ta = c.item.taxIncluded ? effectiveRate / (1 + tr / 100) : effectiveRate;
                const amt = c.item.taxIncluded ? effectiveRate : ta * (1 + tr / 100);
                return {
                    productId: c.item.id,
                    name: c.item.name,
                    qty: c.qty,
                    unit: c.item.unit,
                    rate: origRate,
                    discount: cartDiscountPercent,
                    discountAmt: discAmt * c.qty,
                    taxableAmt: ta * c.qty,
                    gstRate: tr as any,
                    cgst: tr / 2, sgst: tr / 2, igst: 0, cess: 0,
                    totalGst: (amt - ta) * c.qty,
                    amount: amt * c.qty,
                    hsnCode: c.item.hsnCode,
                };
            }),
            subTotal,
            totalDiscount: discountAmount,
            taxableAmount: subTotal - discountAmount,
            totalCgst: tax / 2, totalSgst: tax / 2, totalIgst: 0, totalCess: 0, totalGst: tax,
            shippingCharges: orderType === 'Delivery' ? restSettings.deliveryCharge : 0,
            packingCharges: orderType === 'Takeaway' ? restSettings.takeawayCharge : 0,
            adjustmentAmount: customServiceCharge,
            roundOff: 0,
            grandTotal: total,
            paymentStatus: 'paid', amountPaid: total, balanceDue: 0,
            payments: paymentsList,
            paymentMethod: (paymentsList[0]?.method || 'cash') as PaymentMethod,
            splitPayments: paymentsList.map(p => ({ method: p.method, amount: p.amount })),
            partyName: orderType === 'Dining' ? `Dining - ${tableNumber}` : orderType,
            counter: `${orderType} - ${tableNumber}`,
            notes: `${orderType} Order (Split Pay: ${methodNames})`,
            isGstBill: true, isHidden: false, isPrivate: false,
            createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
            servedBy: selectedWaiter,
        });

        // Also create kitchen order
        const kitOrder = createKitchenOrder('new');
        updateKitchenOrders(prev => [kitOrder, ...prev]);

        setCart([]);
        setCartDiscountPercent(0);
        setCustomServiceCharge(0);
        setShowSplitModal(false);
        window.open(`/company/billing/invoice?id=${newId}&print=true`, '_blank');
        toast.success(`Order split-billed! ${tableNumber}`);
    };

    // ── Settings Save ──
    const handleSaveSettings = () => {
        localStorage.setItem('restaurant_settings', JSON.stringify(settingsForm));
        setRestSettings(settingsForm);
        // Also update company bankDetails with UPI ID so it shows on invoices
        if (company && settingsForm.upiId !== undefined) {
            updateCompany(company.id, {
                bankDetails: {
                    bankName: company.bankDetails?.bankName || '',
                    accountName: company.bankDetails?.accountName || '',
                    accountNumber: company.bankDetails?.accountNumber || '',
                    ifsc: company.bankDetails?.ifsc || '',
                    upiId: settingsForm.upiId || '',
                    qrCodeUrl: company.bankDetails?.qrCodeUrl,
                },
            });
        }
        toast.success('Settings saved! ✓');
    };

    // ── Kitchen Move ──
    const moveKitchenOrder = (id: string, status: KitchenOrder['status']) => {
        updateKitchenOrders(prev => {
            const updated = prev.map(o => o.id === id ? { ...o, status } : o);
            if (status === 'served') {
                const order = prev.find(o => o.id === id);
                if (order && order.orderType === 'Dining' && order.tableNumber) {
                    setDirtyTables(d => [...new Set([...d, order.tableNumber])]);
                }
            }
            return updated;
        });
    };

    const removeKitchenOrder = (id: string) => {
        updateKitchenOrders(prev => prev.filter(o => o.id !== id));
    };

    // ── Deal Ops ──
    const openAddDeal = () => {
        setEditingDeal(null);
        setDealForm({ title: '', description: '', discount: 0, type: 'percent', validUntil: '', emoji: '🎉' });
        setShowDealForm(true);
    };

    const openEditDeal = (deal: Deal) => {
        setEditingDeal(deal);
        setDealForm({ title: deal.title, description: deal.description, discount: deal.discount, type: deal.type, validUntil: deal.validUntil, emoji: deal.emoji });
        setShowDealForm(true);
    };

    const handleSaveDeal = () => {
        if (!dealForm.title) return toast.error('Title required');
        if (editingDeal) {
            setDeals(prev => prev.map(d => d.id === editingDeal.id ? { ...editingDeal, ...dealForm } : d));
            toast.success('Deal updated!');
        } else {
            setDeals(prev => [{ id: uid(), ...dealForm }, ...prev]);
            toast.success('Deal added!');
        }
        setShowDealForm(false);
    };

    const handleDeleteDeal = async (id: string) => {
        const yes = await confirm({ message: 'Delete this deal?', danger: true });
        if (yes) {
            setDeals(prev => prev.filter(d => d.id !== id));
            toast.success('Deal deleted');
        }
    };

    // ── Time Menu Ops ──
    const toggleTimeMenuProduct = (slot: keyof TimeMenuSlot, productId: string) => {
        setTimeMenu(prev => {
            const current = prev[slot];
            const next = current.includes(productId) ? current.filter(id => id !== productId) : [...current, productId];
            return { ...prev, [slot]: next };
        });
    };

    // ── NAV ──
    const NAV = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/company/dashboard', tab: null },
        { icon: UtensilsCrossed, label: 'POS', href: '#', tab: 'Pos' },
        { icon: Clock, label: 'Menu Time', href: '#', tab: 'MenuTime' },
        { icon: ChefHat, label: 'Kitchen', href: '#', tab: 'Kitchen' },
        { icon: Tag, label: 'Deals', href: '#', tab: 'Deals' },
        { icon: ClipboardList, label: 'Tables', href: '#', tab: 'Table' },
        { icon: FileText, label: 'Invoices', href: '/company/billing', tab: null },
        { icon: Settings, label: 'Settings', href: '#', tab: 'RestSettings' },
    ];

    // ─────────────────────────────────────────────────────────────────────────
    // RENDER
    // ─────────────────────────────────────────────────────────────────────────
    return (
        <>
            <style>{`
                .pos-container { display: flex; height: 100vh; background: #F0F4F8; font-family: 'Inter', sans-serif; overflow: hidden; }
                .pos-sidebar { width: 220px; background: white; display: flex; flex-direction: column; border-right: 1px solid #E2E8F0; flex-shrink: 0; }
                .pos-main { flex: 1; display: flex; flex-direction: column; height: 100%; overflow: hidden; }
                .pos-topbar { height: 72px; background: white; border-bottom: 1px solid #E2E8F0; display: flex; align-items: center; justify-content: space-between; padding: 0 28px; flex-shrink: 0; }
                .pos-content-wrapper { flex: 1; display: flex; overflow: hidden; }
                .pos-grid-area { flex: 1; padding: 28px; overflow-y: auto; display: flex; flex-direction: column; }
                .pos-cart-panel { width: 360px; background: white; border-left: 1px solid #E2E8F0; display: flex; flex-direction: column; flex-shrink: 0; }
                .pos-search-wrapper { position: relative; width: 380px; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .kit-col { flex: 1; min-width: 0; display: flex; flex-direction: column; }
                .kit-card { background: white; border-radius: 16px; padding: 16px; margin-bottom: 14px; box-shadow: 0 2px 12px rgba(0,0,0,0.07); transition: transform 0.15s, box-shadow 0.15s; border: 1px solid transparent; }
                .kit-card:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(0,0,0,0.1); }
                .kit-card-new { border-left: 4px solid #EF4444; }
                .kit-card-cooking { border-left: 4px solid #3B82F6; }
                .kit-card-ready { border-left: 4px solid #22C55E; }
                .kit-col-header { border-radius: 14px; padding: 14px 18px; margin-bottom: 14px; display: flex; align-items: center; gap: 10; position: relative; overflow: hidden; }
                .kit-col-header::after { content: ''; position: absolute; right: -20px; top: -20px; width: 80px; height: 80px; border-radius: 50%; background: rgba(255,255,255,0.12); }
                .kit-empty { text-align: center; padding: 40px 0; color: #CBD5E0; font-size: 13px; }
                @keyframes kitPulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
                .kit-pulse { animation: kitPulse 1.5s ease-in-out infinite; }
                .kit-item-row { display: flex; align-items: center; gap: 8px; padding: 6px 0; border-bottom: 1px dashed #F1F5F9; }
                .kit-item-row:last-child { border-bottom: none; }
                .deal-carousel-track { display: flex; transition: transform 0.5s cubic-bezier(.4,0,.2,1); }
                .deal-carousel-viewport { overflow: hidden; border-radius: 16px; }
                .time-slot-section { background: white; border: 1px solid #E2E8F0; border-radius: 16px; padding: 20px; margin-bottom: 20px; }
                .product-check-item { display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-radius: 8px; cursor: pointer; transition: background 0.15s; }
                .product-check-item:hover { background: #EBF5FB; }
                @media (max-width: 1024px) { .pos-cart-panel { width: 300px; } }
                @media (max-width: 768px) {
                    .pos-container { flex-direction: column; overflow-y: auto; height: auto; min-height: 100vh; }
                    .pos-sidebar { display: none; }
                    .pos-topbar { padding: 0 16px; height: auto; flex-wrap: wrap; gap: 12px; padding-top: 10px; padding-bottom: 10px; }
                    .pos-search-wrapper { width: 100%; }
                    .pos-content-wrapper { flex-direction: column; overflow: visible; }
                    .pos-main { overflow: visible; }
                    .pos-grid-area { padding: 16px; flex: none; overflow: visible; }
                    .pos-cart-panel { width: 100%; border-left: none; border-top: 2px solid #E2E8F0; flex: none; }
                    .pos-mobile-back-btn { display: flex !important; }
                    .pos-mobile-cart-float { display: flex !important; }
                }
            `}</style>

            <div className="pos-container">

                {/* ── LEFT SIDEBAR ── */}
                <aside className="pos-sidebar">
                    {/* Logo */}
                    <div style={{ padding: '20px 18px 24px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid #E2E8F0' }}>
                        <div style={{ width: 34, height: 34, background: '#4285F4', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                            {company?.logoUrl
                                ? <img src={company.logoUrl} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                : <UtensilsCrossed size={18} color="white" />}
                        </div>
                        <span style={{ fontSize: 15, fontWeight: 800, color: '#1A202C', letterSpacing: '-0.3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {company?.name || 'Restaurant'}
                        </span>
                    </div>

                    {/* Nav */}
                    <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }} className="no-scrollbar">
                        {NAV.map((nav, i) => {
                            const isActive = nav.tab ? activeTab === nav.tab : false;
                            const style: React.CSSProperties = {
                                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                                width: '100%', border: 'none', cursor: 'pointer', borderRadius: 10,
                                marginBottom: 2, textDecoration: 'none',
                                background: isActive ? '#EBF5FB' : 'transparent',
                                color: isActive ? '#4285F4' : '#64748B',
                                fontWeight: isActive ? 700 : 500, fontSize: 13,
                                transition: 'all 0.15s',
                            };
                            return nav.tab ? (
                                <button key={i} onClick={() => setActiveTab(nav.tab!)} style={style}>
                                    <nav.icon size={16} color={isActive ? '#4285F4' : '#94A3B8'} />
                                    <span>{nav.label}</span>
                                </button>
                            ) : (
                                <Link key={i} href={nav.href} style={style}>
                                    <nav.icon size={16} color="#94A3B8" />
                                    <span>{nav.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Exit */}
                    <div style={{ padding: '16px 18px', borderTop: '1px solid #E2E8F0' }}>
                        <Link href="/companies" style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#94A3B8', textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
                            <LogOut size={15} /> Exit POS
                        </Link>
                    </div>
                </aside>

                {/* ── MAIN CONTENT ── */}
                <main className="pos-main">

                    {/* Topbar */}
                    <header className="pos-topbar">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, width: '100%', maxWidth: '380px' }}>
                            <button
                                onClick={() => router.push('/company/dashboard')}
                                className="pos-mobile-back-btn"
                                style={{
                                    display: 'none',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 38,
                                    height: 38,
                                    borderRadius: 99,
                                    background: '#F8FAFC',
                                    border: '1px solid #E2E8F0',
                                    cursor: 'pointer',
                                    color: '#64748B',
                                    flexShrink: 0
                                }}
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <div className="pos-search-wrapper" style={{ flex: 1 }}>
                                <Search size={15} color="#94A3B8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    style={{ width: '100%', background: '#F8FAFC', padding: '10px 14px 10px 38px', borderRadius: 99, border: '1px solid #E2E8F0', outline: 'none', fontSize: 13, color: '#1A202C', fontWeight: 500 }}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                            <button onClick={() => { setFetchQuery(''); setFetchedInv(null); setFetchModal(true); }}
                                style={{ padding: '9px 16px', borderRadius: 99, background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#64748B', fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Search size={13} /> Scan Bill
                            </button>
                            <button style={{ width: 38, height: 38, borderRadius: 99, background: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                <Bell size={16} color="#64748B" />
                            </button>
                        </div>
                    </header>

                    {/* Content wrapper */}
                    <div className="pos-content-wrapper">

                        {/* ── GRID AREA ── */}
                        <div className="pos-grid-area no-scrollbar">

                            {/* Page Header */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                <div>
                                    <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1A202C', margin: '0 0 2px 0' }}>
                                        {activeTab === 'Pos' ? 'Point of Sale' : activeTab === 'MenuTime' ? 'Menu Time' : activeTab === 'Kitchen' ? 'Kitchen Display' : activeTab === 'Deals' ? 'Deals & Promos' : activeTab === 'Table' ? 'Table Management' : activeTab === 'RestSettings' ? 'Settings' : activeTab}
                                    </h2>
                                    <p style={{ fontSize: 12, color: '#94A3B8', margin: 0 }}>Dashboard • {activeTab}</p>
                                </div>
                                {activeTab === 'Pos' && (
                                    <div style={{ display: 'flex', gap: 10 }}>
                                        <button onClick={() => setShowAdd(true)}
                                            style={{ background: 'white', color: '#1A202C', padding: '9px 18px', borderRadius: 8, border: '1px solid #E2E8F0', fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer' }}>
                                            <Plus size={15} /> Add Item
                                        </button>
                                        <button onClick={async () => {
                                            if (cart.length === 0) { setCart([]); return; }
                                            const yes = await confirm({ message: 'Start a new order? Current order will be cleared.', danger: false });
                                            if (yes) setCart([]);
                                        }} style={{ background: '#EA4335', color: 'white', padding: '9px 18px', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer' }}>
                                            <Plus size={15} /> New Order
                                        </button>
                                    </div>
                                )}
                                {activeTab === 'Deals' && (
                                    <button onClick={openAddDeal}
                                        style={{ background: '#4285F4', color: 'white', padding: '9px 18px', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer' }}>
                                        <Plus size={15} /> Add Deal
                                    </button>
                                )}
                            </div>

                            {/* ══ POS TAB ══ */}
                            {activeTab === 'Pos' && (
                                <>
                                    {/* Meal slot banner */}
                                    {currentSlot && (
                                        <div style={{ background: '#EBF5FB', border: '1px solid #4285F4', borderRadius: 10, padding: '10px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                                            <span style={{ fontSize: 13, fontWeight: 700, color: '#4285F4' }}>{slotLabel}</span>
                                            <button onClick={() => setFilterByTime(f => !f)}
                                                style={{ background: filterByTime ? '#4285F4' : 'white', color: filterByTime ? 'white' : '#4285F4', border: '1px solid #4285F4', borderRadius: 8, padding: '5px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                                                {filterByTime ? 'Showing Time Menu' : 'Filter by Time Menu'}
                                            </button>
                                        </div>
                                    )}

                                    {/* Category Pills */}
                                    <div style={{ display: 'flex', gap: 10, marginBottom: 24, overflowX: 'auto', paddingBottom: 4 }} className="no-scrollbar">
                                        {categories.map(cat => (
                                            <button key={cat} onClick={() => setActiveCat(cat)} style={{
                                                padding: '7px 18px', borderRadius: 99, fontWeight: 700, fontSize: 12, cursor: 'pointer', flexShrink: 0, border: 'none', transition: 'all 0.15s',
                                                background: activeCat === cat ? '#4285F4' : 'white',
                                                color: activeCat === cat ? 'white' : '#64748B',
                                                boxShadow: activeCat === cat ? '0 4px 12px rgba(66,133,244,0.25)' : '0 1px 4px rgba(0,0,0,0.06)',
                                            }}>
                                                {cat === 'All' ? 'Show All' : cat}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Items Grid */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 16 }}>
                                        {filteredItems.length === 0 ? (
                                            <div style={{ padding: 40, textAlign: 'center', gridColumn: '1/-1', color: '#94A3B8' }}>
                                                No products found. Add products in inventory!
                                            </div>
                                        ) : filteredItems.map(item => (
                                            <div key={item.id} onClick={() => addToCart(item)}
                                                style={{ background: 'white', borderRadius: 14, padding: '14px', border: '1px solid #E2E8F0', cursor: 'pointer', transition: 'transform 0.1s, box-shadow 0.1s', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}
                                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)'; }}
                                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                                                <button onClick={async e => {
                                                    e.stopPropagation();
                                                    const yes = await confirm({ message: `Delete ${item.name}?`, danger: true });
                                                    if (yes) { deleteProduct(item.id); setCart(prev => prev.filter(c => c.item.id !== item.id)); toast.success('Item deleted'); }
                                                }} style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(255,255,255,0.92)', border: 'none', borderRadius: 7, width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EA4335', cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', zIndex: 10 }}>
                                                    <Trash2 size={13} />
                                                </button>
                                                <div style={{ width: '100%', aspectRatio: '1/1', borderRadius: 10, background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, marginBottom: 12, overflow: 'hidden', border: '1px solid #E2E8F0' }}>
                                                    {item.imageUrl ? <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (item.name[0]?.toUpperCase() || '🥘')}
                                                </div>
                                                <p style={{ fontSize: 13, fontWeight: 700, color: '#1A202C', textAlign: 'center', marginBottom: 4 }}>{item.name}</p>
                                                <p style={{ fontSize: 14, fontWeight: 800, color: '#4285F4', margin: 0 }}>₹{item.sellingPrice.toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* ══ MENU TIME TAB ══ */}
                            {activeTab === 'MenuTime' && (
                                <div>
                                    <p style={{ fontSize: 13, color: '#64748B', marginBottom: 20 }}>
                                        Configure which products are available for each meal slot. The POS will show a banner when a meal slot is active.
                                    </p>
                                    {(['breakfast', 'lunch', 'dinner'] as const).map(slot => {
                                        const slotMeta = {
                                            breakfast: { label: 'Breakfast', time: '6:00 AM – 11:00 AM', color: '#FBBC04', emoji: '🌅' },
                                            lunch: { label: 'Lunch', time: '11:00 AM – 4:00 PM', color: '#4285F4', emoji: '☀️' },
                                            dinner: { label: 'Dinner', time: '4:00 PM – 11:00 PM', color: '#EA4335', emoji: '🌙' },
                                        }[slot];
                                        const groupedByCategory: Record<string, Product[]> = {};
                                        products.forEach(p => {
                                            const cat = p.category || 'Uncategorized';
                                            if (!groupedByCategory[cat]) groupedByCategory[cat] = [];
                                            groupedByCategory[cat].push(p);
                                        });
                                        return (
                                            <div key={slot} className="time-slot-section">
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                                                    <span style={{ fontSize: 22 }}>{slotMeta.emoji}</span>
                                                    <div>
                                                        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#1A202C' }}>{slotMeta.label}</h3>
                                                        <span style={{ fontSize: 12, color: '#94A3B8' }}>{slotMeta.time}</span>
                                                    </div>
                                                    <span style={{ marginLeft: 'auto', background: slotMeta.color, color: 'white', borderRadius: 99, padding: '3px 12px', fontSize: 12, fontWeight: 700 }}>
                                                        {timeMenu[slot].length} selected
                                                    </span>
                                                </div>
                                                {products.length === 0 ? (
                                                    <p style={{ color: '#94A3B8', fontSize: 13 }}>No products yet.</p>
                                                ) : (
                                                    <div>
                                                        {Object.entries(groupedByCategory).map(([cat, prods]) => (
                                                            <div key={cat} style={{ marginBottom: 12 }}>
                                                                <p style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>{cat}</p>
                                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 6 }}>
                                                                    {prods.map(p => {
                                                                        const checked = timeMenu[slot].includes(p.id);
                                                                        return (
                                                                            <div key={p.id} className="product-check-item"
                                                                                onClick={() => toggleTimeMenuProduct(slot, p.id)}
                                                                                style={{ background: checked ? '#EBF5FB' : 'transparent', border: `1px solid ${checked ? '#4285F4' : '#E2E8F0'}`, borderRadius: 8 }}>
                                                                                <div style={{ width: 18, height: 18, borderRadius: 5, border: `2px solid ${checked ? '#4285F4' : '#CBD5E0'}`, background: checked ? '#4285F4' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                                                    {checked && <CheckCircle size={12} color="white" />}
                                                                                </div>
                                                                                <span style={{ fontSize: 12, fontWeight: 600, color: checked ? '#4285F4' : '#1A202C' }}>{p.name}</span>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* ══ KITCHEN DISPLAY TAB ══ */}
                            {activeTab === 'Kitchen' && (
                                <div style={{ background: '#F8FAFC', borderRadius: 20, padding: 24, minHeight: 500 }}>
                                    {/* Header */}
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg, #EF4444, #3B82F6)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <ChefHat size={22} color="white" />
                                            </div>
                                            <div>
                                                <h2 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: '#1A202C' }}>Kitchen Display System</h2>
                                                <p style={{ margin: 0, fontSize: 12, color: '#94A3B8' }}>Real-time order tracking</p>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                            <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 10, padding: '6px 14px', fontSize: 12, fontWeight: 700, color: '#64748B' }}>
                                                📋 {kitchenOrders.length} orders today
                                            </div>
                                            <button onClick={() => setKitchenOrders(prev => prev.filter(o => o.status !== 'served'))}
                                                style={{ padding: '8px 16px', borderRadius: 10, background: '#FEE2E2', border: 'none', fontSize: 12, fontWeight: 700, color: '#EF4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <Trash2 size={13} /> Clear Served
                                            </button>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                                        {/* NEW TICKETS - RED */}
                                        <div className="kit-col">
                                            <div className="kit-col-header" style={{ background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)' }}>
                                                <div style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.25)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Timer size={16} color="white" />
                                                </div>
                                                <div>
                                                    <span style={{ color: 'white', fontWeight: 900, fontSize: 13, display: 'block', letterSpacing: '0.5px' }}>🔴 NEW TICKETS</span>
                                                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11 }}>Waiting to cook</span>
                                                </div>
                                                <span style={{ marginLeft: 'auto', background: 'white', color: '#EF4444', borderRadius: 99, padding: '3px 10px', fontSize: 13, fontWeight: 900 }}>
                                                    {kitchenOrders.filter(o => o.status === 'new').length}
                                                </span>
                                            </div>
                                            {kitchenOrders.filter(o => o.status === 'new').map(order => (
                                                <div key={order.id} className="kit-card kit-card-new">
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                                                        <div>
                                                            <span style={{ fontWeight: 900, fontSize: 15, color: '#1A202C', display: 'block' }}>🪑 {order.tableNumber || 'Takeaway/Delivery'}</span>
                                                            {order.servedBy && <span style={{ fontSize: 11, color: '#4B5563', display: 'block', fontWeight: 600, marginTop: 2 }}>👤 {order.servedBy}</span>}
                                                            <span style={{ fontSize: 11, color: '#94A3B8', display: 'block', marginTop: 2 }}>{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                        </div>
                                                        <span style={{ fontSize: 10, background: '#FEE2E2', color: '#EF4444', borderRadius: 6, padding: '3px 8px', fontWeight: 800, textTransform: 'uppercase' }}>{order.orderType}</span>
                                                    </div>
                                                    <div style={{ marginBottom: 12, background: '#FFF5F5', borderRadius: 10, padding: '10px 12px' }}>
                                                        {order.items.map((it, j) => (
                                                            <div key={j} className="kit-item-row">
                                                                <span style={{ background: '#EF4444', color: 'white', borderRadius: 6, padding: '2px 8px', fontWeight: 900, fontSize: 12, minWidth: 28, textAlign: 'center', flexShrink: 0 }}>{it.qty}x</span>
                                                                <span style={{ fontSize: 13, color: '#1A202C', fontWeight: 600 }}>{it.name}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <button onClick={() => moveKitchenOrder(order.id, 'cooking')}
                                                        style={{ width: '100%', padding: '10px', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', border: 'none', borderRadius: 10, fontWeight: 800, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                                                        <ChefHat size={14} /> Start Cooking →
                                                    </button>
                                                </div>
                                            ))}
                                            {kitchenOrders.filter(o => o.status === 'new').length === 0 && (
                                                <div className="kit-empty">
                                                    <div style={{ fontSize: 36, marginBottom: 8 }}>🎉</div>
                                                    <p style={{ fontWeight: 600, color: '#94A3B8' }}>No new tickets</p>
                                                    <p style={{ fontSize: 11, color: '#CBD5E0' }}>All caught up!</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* COOKING - BLUE */}
                                        <div className="kit-col">
                                            <div className="kit-col-header" style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)' }}>
                                                <div style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.25)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <ChefHat size={16} color="white" />
                                                </div>
                                                <div>
                                                    <span style={{ color: 'white', fontWeight: 900, fontSize: 13, display: 'block', letterSpacing: '0.5px' }}>🔵 COOKING NOW</span>
                                                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11 }}>In the kitchen</span>
                                                </div>
                                                <span style={{ marginLeft: 'auto', background: 'white', color: '#3B82F6', borderRadius: 99, padding: '3px 10px', fontSize: 13, fontWeight: 900 }}>
                                                    {kitchenOrders.filter(o => o.status === 'cooking').length}
                                                </span>
                                            </div>
                                            {kitchenOrders.filter(o => o.status === 'cooking').map(order => (
                                                <div key={order.id} className="kit-card kit-card-cooking">
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                                                        <div>
                                                            <span style={{ fontWeight: 900, fontSize: 15, color: '#1A202C', display: 'block' }}>🪑 {order.tableNumber || 'Takeaway/Delivery'}</span>
                                                            {order.servedBy && <span style={{ fontSize: 11, color: '#4B5563', display: 'block', fontWeight: 600, marginTop: 2 }}>👤 {order.servedBy}</span>}
                                                            <span style={{ fontSize: 11, color: '#94A3B8', display: 'block', marginTop: 2 }}>{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                        </div>
                                                        <span style={{ fontSize: 10, background: '#EFF6FF', color: '#3B82F6', borderRadius: 6, padding: '3px 8px', fontWeight: 800, textTransform: 'uppercase' }}>{order.orderType}</span>
                                                    </div>
                                                    <div style={{ marginBottom: 12, background: '#EFF6FF', borderRadius: 10, padding: '10px 12px' }}>
                                                        {order.items.map((it, j) => (
                                                            <div key={j} className="kit-item-row">
                                                                <span style={{ background: '#3B82F6', color: 'white', borderRadius: 6, padding: '2px 8px', fontWeight: 900, fontSize: 12, minWidth: 28, textAlign: 'center', flexShrink: 0 }}>{it.qty}x</span>
                                                                <span style={{ fontSize: 13, color: '#1A202C', fontWeight: 600 }}>{it.name}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div style={{ display: 'flex', gap: 8 }}>
                                                        <button onClick={() => moveKitchenOrder(order.id, 'new')}
                                                            style={{ flex: 1, padding: '9px', background: '#F8FAFC', color: '#64748B', border: '1px solid #E2E8F0', borderRadius: 10, fontWeight: 700, fontSize: 11, cursor: 'pointer' }}>
                                                            ← Back
                                                        </button>
                                                        <button onClick={() => moveKitchenOrder(order.id, 'ready')}
                                                            style={{ flex: 2, padding: '9px', background: 'linear-gradient(135deg, #22C55E, #16A34A)', color: 'white', border: 'none', borderRadius: 10, fontWeight: 800, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                                                            <CheckCircle size={13} /> Ready to Serve →
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            {kitchenOrders.filter(o => o.status === 'cooking').length === 0 && (
                                                <div className="kit-empty">
                                                    <div style={{ fontSize: 36, marginBottom: 8 }}>🍳</div>
                                                    <p style={{ fontWeight: 600, color: '#94A3B8' }}>Nothing cooking</p>
                                                    <p style={{ fontSize: 11, color: '#CBD5E0' }}>Move orders here to start</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* READY - GREEN */}
                                        <div className="kit-col">
                                            <div className="kit-col-header" style={{ background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)' }}>
                                                <div style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.25)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <CheckCircle size={16} color="white" />
                                                </div>
                                                <div>
                                                    <span style={{ color: 'white', fontWeight: 900, fontSize: 13, display: 'block', letterSpacing: '0.5px' }}>🟢 READY TO SERVE</span>
                                                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11 }}>Awaiting delivery</span>
                                                </div>
                                                <span style={{ marginLeft: 'auto', background: 'white', color: '#22C55E', borderRadius: 99, padding: '3px 10px', fontSize: 13, fontWeight: 900 }}>
                                                    {kitchenOrders.filter(o => o.status === 'ready').length}
                                                </span>
                                            </div>
                                            {kitchenOrders.filter(o => o.status === 'ready').map(order => (
                                                <div key={order.id} className="kit-card kit-card-ready">
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                                                        <div>
                                                            <span style={{ fontWeight: 900, fontSize: 15, color: '#1A202C', display: 'block' }}>🪑 {order.tableNumber || 'Takeaway/Delivery'}</span>
                                                            {order.servedBy && <span style={{ fontSize: 11, color: '#4B5563', display: 'block', fontWeight: 600, marginTop: 2 }}>👤 {order.servedBy}</span>}
                                                            <span style={{ fontSize: 11, color: '#94A3B8', display: 'block', marginTop: 2 }}>{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                        </div>
                                                        <span style={{ fontSize: 10, background: '#F0FDF4', color: '#22C55E', borderRadius: 6, padding: '3px 8px', fontWeight: 800, textTransform: 'uppercase' }}>{order.orderType}</span>
                                                    </div>
                                                    <div style={{ marginBottom: 12, background: '#F0FDF4', borderRadius: 10, padding: '10px 12px' }}>
                                                        {order.items.map((it, j) => (
                                                            <div key={j} className="kit-item-row">
                                                                <span style={{ background: '#22C55E', color: 'white', borderRadius: 6, padding: '2px 8px', fontWeight: 900, fontSize: 12, minWidth: 28, textAlign: 'center', flexShrink: 0 }}>{it.qty}x</span>
                                                                <span style={{ fontSize: 13, color: '#1A202C', fontWeight: 600 }}>{it.name}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div style={{ display: 'flex', gap: 8 }}>
                                                        <button onClick={() => moveKitchenOrder(order.id, 'cooking')}
                                                            style={{ flex: 1, padding: '9px', background: '#F8FAFC', color: '#64748B', border: '1px solid #E2E8F0', borderRadius: 10, fontWeight: 700, fontSize: 11, cursor: 'pointer' }}>
                                                            ← Back
                                                        </button>
                                                        <button onClick={() => { moveKitchenOrder(order.id, 'served'); toast.success('Marked as served! 🎉'); }}
                                                            style={{ flex: 2, padding: '9px', background: 'linear-gradient(135deg, #FBBC04, #F59E0B)', color: 'white', border: 'none', borderRadius: 10, fontWeight: 800, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                                                            ✓ Mark Served
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            {kitchenOrders.filter(o => o.status === 'ready').length === 0 && (
                                                <div style={{ textAlign: 'center', color: '#CBD5E0', padding: '24px 0', fontSize: 13 }}>Nothing ready yet</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ══ DEALS TAB ══ */}
                            {activeTab === 'Deals' && (
                                <div>
                                    {/* Carousel for active deals */}
                                    {activeDeals.length >= 2 && (
                                        <div style={{ marginBottom: 28 }}>
                                            <p style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Active Deals Carousel</p>
                                            <div className="deal-carousel-viewport" style={{ position: 'relative', background: 'white', border: '1px solid #E2E8F0' }}>
                                                <div className="deal-carousel-track" style={{ transform: `translateX(-${carouselIdx * 100}%)` }}>
                                                    {activeDeals.map((deal, i) => (
                                                        <div key={deal.id} style={{ minWidth: '100%', padding: '28px 32px', display: 'flex', alignItems: 'center', gap: 20 }}>
                                                            <span style={{ fontSize: 52 }}>{deal.emoji}</span>
                                                            <div>
                                                                <h3 style={{ margin: '0 0 6px 0', fontSize: 20, fontWeight: 900, color: '#1A202C' }}>{deal.title}</h3>
                                                                <p style={{ margin: '0 0 8px 0', color: '#64748B', fontSize: 14 }}>{deal.description}</p>
                                                                <span style={{ background: deal.type === 'percent' ? '#EBF5FB' : '#E8F5E9', color: deal.type === 'percent' ? '#4285F4' : '#34A853', borderRadius: 99, padding: '4px 14px', fontWeight: 800, fontSize: 15 }}>
                                                                    {deal.type === 'percent' ? `${deal.discount}% OFF` : `₹${deal.discount} OFF`}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                {/* Dots */}
                                                <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
                                                    {activeDeals.map((_, i) => (
                                                        <button key={i} onClick={() => setCarouselIdx(i)}
                                                            style={{ width: i === carouselIdx ? 18 : 8, height: 8, borderRadius: 99, border: 'none', background: i === carouselIdx ? '#4285F4' : '#CBD5E0', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Single active deal (no carousel) */}
                                    {activeDeals.length === 1 && (
                                        <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 16, padding: '24px 28px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 20 }}>
                                            <span style={{ fontSize: 48 }}>{activeDeals[0].emoji}</span>
                                            <div>
                                                <h3 style={{ margin: '0 0 4px 0', fontSize: 18, fontWeight: 900, color: '#1A202C' }}>{activeDeals[0].title}</h3>
                                                <p style={{ margin: '0 0 8px 0', color: '#64748B', fontSize: 13 }}>{activeDeals[0].description}</p>
                                                <span style={{ background: '#EBF5FB', color: '#4285F4', borderRadius: 99, padding: '3px 12px', fontWeight: 800, fontSize: 14 }}>
                                                    {activeDeals[0].type === 'percent' ? `${activeDeals[0].discount}% OFF` : `₹${activeDeals[0].discount} OFF`}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* All deals list */}
                                    <p style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>All Deals ({deals.length})</p>
                                    {deals.length === 0 && (
                                        <div style={{ textAlign: 'center', padding: '48px 0', color: '#CBD5E0' }}>
                                            <Tag size={40} style={{ opacity: 0.3, marginBottom: 12 }} />
                                            <p style={{ fontWeight: 600 }}>No deals yet. Click "Add Deal" to create one.</p>
                                        </div>
                                    )}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
                                        {deals.map(deal => {
                                            const expired = deal.validUntil && new Date(deal.validUntil) < new Date();
                                            return (
                                                <div key={deal.id} style={{ background: 'white', border: `1px solid ${expired ? '#FEE2E2' : '#E2E8F0'}`, borderRadius: 14, padding: '16px 18px', opacity: expired ? 0.6 : 1 }}>
                                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
                                                        <span style={{ fontSize: 28 }}>{deal.emoji}</span>
                                                        <div style={{ flex: 1 }}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <h4 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: '#1A202C' }}>{deal.title}</h4>
                                                                {expired && <span style={{ fontSize: 10, background: '#FEE2E2', color: '#EA4335', borderRadius: 6, padding: '2px 8px', fontWeight: 700 }}>EXPIRED</span>}
                                                            </div>
                                                            <p style={{ margin: '4px 0 6px', fontSize: 12, color: '#64748B' }}>{deal.description}</p>
                                                            <span style={{ fontSize: 13, fontWeight: 800, color: deal.type === 'percent' ? '#4285F4' : '#34A853' }}>
                                                                {deal.type === 'percent' ? `${deal.discount}% OFF` : `₹${deal.discount} OFF`}
                                                            </span>
                                                            {deal.validUntil && <span style={{ fontSize: 11, color: '#94A3B8', marginLeft: 10 }}>Until {deal.validUntil}</span>}
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', gap: 8 }}>
                                                        <button onClick={() => openEditDeal(deal)}
                                                            style={{ flex: 1, padding: '7px', background: '#EBF5FB', color: '#4285F4', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                                                            <Edit2 size={12} /> Edit
                                                        </button>
                                                        <button onClick={() => handleDeleteDeal(deal.id)}
                                                            style={{ flex: 1, padding: '7px', background: '#FEE2E2', color: '#EA4335', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                                                            <Trash2 size={12} /> Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* ══ TABLE TAB ══ */}
                            {activeTab === 'Table' && (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 14 }}>
                                    {tableOptions.map((t, i) => (
                                        <div key={i} style={{ background: 'white', border: '2px solid #E2E8F0', borderRadius: 14, padding: '20px 12px', textAlign: 'center', cursor: 'pointer' }}
                                            onClick={() => { setTableNumber(t); setOrderType('Dining'); setActiveTab('Pos'); }}>
                                            <div style={{ fontSize: 28, marginBottom: 6 }}>🪑</div>
                                            <div style={{ fontWeight: 800, fontSize: 13, color: '#1A202C' }}>{t}</div>
                                            <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>Tap to order</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* ══ SETTINGS TAB ══ */}
                            {activeTab === 'RestSettings' && (
                                <div style={{ maxWidth: 680 }}>
                                    {/* Charges Card */}
                                    <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 16, padding: '24px', marginBottom: 20 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                                            <div style={{ width: 36, height: 36, background: '#EFF6FF', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Truck size={18} color="#3B82F6" />
                                            </div>
                                            <div>
                                                <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1A202C', margin: 0 }}>Order Charges</h3>
                                                <p style={{ fontSize: 12, color: '#94A3B8', margin: 0 }}>Set delivery & takeaway charges</p>
                                            </div>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                                            <div>
                                                <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Delivery Charge (₹)</label>
                                                <input type="number" value={settingsForm.deliveryCharge} onChange={e => setSettingsForm(s => ({ ...s, deliveryCharge: parseFloat(e.target.value) || 0 }))}
                                                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14, color: '#1A202C', outline: 'none', background: '#F8FAFC', boxSizing: 'border-box' }} />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Takeaway Charge (₹)</label>
                                                <input type="number" value={settingsForm.takeawayCharge} onChange={e => setSettingsForm(s => ({ ...s, takeawayCharge: parseFloat(e.target.value) || 0 }))}
                                                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14, color: '#1A202C', outline: 'none', background: '#F8FAFC', boxSizing: 'border-box' }} />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Number of Tables</label>
                                                <input type="number" min={1} max={100} value={settingsForm.numberOfTables} onChange={e => setSettingsForm(s => ({ ...s, numberOfTables: parseInt(e.target.value) || 12 }))}
                                                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14, color: '#1A202C', outline: 'none', background: '#F8FAFC', boxSizing: 'border-box' }} />
                                            </div>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginTop: 14 }}>
                                            <div>
                                                <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Default Service Charge (₹)</label>
                                                <input type="number" min={0} value={settingsForm.serviceCharge !== undefined ? settingsForm.serviceCharge : ''} onChange={e => setSettingsForm(s => ({ ...s, serviceCharge: parseFloat(e.target.value) || 0 }))}
                                                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14, color: '#1A202C', outline: 'none', background: '#F8FAFC', boxSizing: 'border-box' }} />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Default Tax / GST (%)</label>
                                                <input type="number" min={0} max={100} value={settingsForm.defaultGstRate !== undefined ? settingsForm.defaultGstRate : ''} onChange={e => setSettingsForm(s => ({ ...s, defaultGstRate: parseFloat(e.target.value) || 0 }))}
                                                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14, color: '#1A202C', outline: 'none', background: '#F8FAFC', boxSizing: 'border-box' }} />
                                            </div>
                                            <div style={{ visibility: 'hidden' }} />
                                        </div>
                                    </div>

                                    {/* Invoice Customization Card */}
                                    <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 16, padding: '24px', marginBottom: 20 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                                            <div style={{ width: 36, height: 36, background: '#F0FDF4', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <FileText size={18} color="#22C55E" />
                                            </div>
                                            <div>
                                                <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1A202C', margin: 0 }}>Invoice Customisation</h3>
                                                <p style={{ fontSize: 12, color: '#94A3B8', margin: 0 }}>Prefix, footer note & UPI QR for invoices</p>
                                            </div>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                                            <div>
                                                <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Invoice Prefix</label>
                                                <input value={settingsForm.invoicePrefix} onChange={e => setSettingsForm(s => ({ ...s, invoicePrefix: e.target.value }))}
                                                    placeholder="e.g. REST, INV"
                                                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14, color: '#1A202C', outline: 'none', background: '#F8FAFC', boxSizing: 'border-box' }} />
                                                <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>e.g. {settingsForm.invoicePrefix || 'INV'}-001</p>
                                            </div>
                                            <div>
                                                <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Invoice Footer Note</label>
                                                <input value={settingsForm.invoiceNote} onChange={e => setSettingsForm(s => ({ ...s, invoiceNote: e.target.value }))}
                                                    placeholder="Thank you for dining with us!"
                                                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14, color: '#1A202C', outline: 'none', background: '#F8FAFC', boxSizing: 'border-box' }} />
                                            </div>
                                        </div>

                                        {/* UPI QR Section */}
                                        <div style={{ background: 'linear-gradient(135deg, #F8FAFC, #EFF6FF)', borderRadius: 14, padding: '18px', border: '1.5px dashed #93C5FD' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                                                <span style={{ fontSize: 18 }}>📱</span>
                                                <div>
                                                    <p style={{ fontSize: 13, fontWeight: 800, color: '#1A202C', margin: 0 }}>UPI Payment ID</p>
                                                    <p style={{ fontSize: 11, color: '#64748B', margin: 0 }}>Paste your UPI ID — auto QR on every invoice</p>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                                                <div style={{ flex: 1 }}>
                                                    <input value={settingsForm.upiId} onChange={e => setSettingsForm(s => ({ ...s, upiId: e.target.value }))}
                                                        placeholder="yourname@gpay   or   shop@paytm   or   9876543210@upi"
                                                        style={{ width: '100%', padding: '12px 14px', border: '2px solid #BFDBFE', borderRadius: 10, fontSize: 13, color: '#1A202C', outline: 'none', background: 'white', boxSizing: 'border-box', fontFamily: 'monospace' }} />
                                                    <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
                                                        <p style={{ fontSize: 11, color: '#64748B', margin: 0 }}>✅ GPay • PhonePe • Paytm • BHIM • All UPI apps</p>
                                                        {settingsForm.upiId && (
                                                            <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 8, padding: '7px 12px', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                                                <span style={{ fontSize: 14 }}>✓</span>
                                                                <span style={{ fontSize: 12, color: '#16A34A', fontWeight: 700, fontFamily: 'monospace' }}>{settingsForm.upiId}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                {settingsForm.upiId && (
                                                    <div style={{ textAlign: 'center', flexShrink: 0 }}>
                                                        <div style={{ position: 'relative', width: 96, height: 96, display: 'inline-block' }}>
                                                            <img
                                                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&ecc=H&data=${encodeURIComponent(`upi://pay?pa=${settingsForm.upiId}&pn=${encodeURIComponent(company?.name || 'Shop')}&cu=INR`)}`}
                                                                alt="UPI QR"
                                                                style={{ width: 96, height: 96, borderRadius: 10, border: '2px solid #BFDBFE', display: 'block' }}
                                                            />
                                                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 24, height: 24, background: 'white', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2, boxShadow: '0 0 0 2px white' }}>
                                                                <img src="/logo.png" alt="E" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                                            </div>
                                                        </div>
                                                        <p style={{ fontSize: 10, color: '#3B82F6', marginTop: 5, fontWeight: 800 }}>LIVE PREVIEW ✦</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Waiters Card */}
                                    <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 16, padding: '24px', marginBottom: 20 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                                            <div style={{ width: 36, height: 36, background: '#F5F3FF', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <User size={18} color="#7C3AED" />
                                            </div>
                                            <div>
                                                <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1A202C', margin: 0 }}>Custom Waiters</h3>
                                                <p style={{ fontSize: 12, color: '#94A3B8', margin: 0 }}>Manage custom servers for order attribution</p>
                                            </div>
                                        </div>
                                        
                                        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                                            <input
                                                id="new-waiter-input"
                                                placeholder="e.g. Ramesh Kumar"
                                                style={{ flex: 1, padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14, color: '#1A202C', outline: 'none', background: '#F8FAFC', boxSizing: 'border-box' }}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        const val = (e.target as HTMLInputElement).value.trim();
                                                        if (val) {
                                                            setSettingsForm(s => ({
                                                                ...s,
                                                                customWaiters: [...(s.customWaiters || []), val]
                                                            }));
                                                            (e.target as HTMLInputElement).value = '';
                                                        }
                                                    }
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const input = document.getElementById('new-waiter-input') as HTMLInputElement;
                                                    const val = input?.value.trim();
                                                    if (val) {
                                                        setSettingsForm(s => ({
                                                            ...s,
                                                            customWaiters: [...(s.customWaiters || []), val]
                                                        }));
                                                        input.value = '';
                                                    }
                                                }}
                                                style={{ padding: '10px 16px', background: '#7C3AED', color: 'white', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
                                            >
                                                Add Waiter
                                            </button>
                                        </div>

                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                            {(settingsForm.customWaiters || []).map((w, index) => (
                                                <div key={index} style={{ background: '#F3E8FF', border: '1px solid #C084FC', borderRadius: 20, padding: '4px 12px', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#6B21A8' }}>
                                                    <span>{w}</span>
                                                    <span
                                                        onClick={() => {
                                                            setSettingsForm(s => ({
                                                                ...s,
                                                                customWaiters: (s.customWaiters || []).filter((_, idx) => idx !== index)
                                                            }));
                                                        }}
                                                        style={{ cursor: 'pointer', fontWeight: 900, color: '#B7791F' }}
                                                    >
                                                        ×
                                                    </span>
                                                </div>
                                            ))}
                                            {(settingsForm.customWaiters || []).length === 0 && (
                                                <p style={{ fontSize: 12, color: '#94A3B8', margin: 0, fontStyle: 'italic' }}>No custom waiters added yet. Default ones will be shown.</p>
                                            )}
                                        </div>
                                    </div>

                                    <button onClick={handleSaveSettings}
                                        style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #4285F4, #2563EB)', color: 'white', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 16px rgba(66,133,244,0.3)' }}>
                                        <Save size={18} /> Save All Settings
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* ── RIGHT CART PANEL ── */}
                        <div className="pos-cart-panel">

                            {/* Order Type + Table */}
                            <div style={{ display: 'flex', padding: '14px 18px', borderBottom: '1px solid #E2E8F0', gap: 10 }}>
                                <select value={orderType} onChange={e => setOrderType(e.target.value)}
                                    style={{ flex: 1, padding: '9px 10px', background: '#F8FAFC', borderRadius: 8, color: '#1A202C', fontSize: 13, fontWeight: 700, border: '1px solid #E2E8F0', outline: 'none', cursor: 'pointer' }}>
                                    <option value="Dining">🪑 Dining</option>
                                    <option value="Takeaway">🥡 Takeaway</option>
                                    <option value="Delivery">🚚 Delivery</option>
                                </select>
                                {orderType === 'Dining' && (
                                    <button onClick={() => setShowTableMapModal(true)}
                                        type="button"
                                        style={{ flex: 1, padding: '9px 10px', background: '#F8FAFC', borderRadius: 8, color: '#1A202C', fontSize: 13, fontWeight: 700, border: '1px solid #E2E8F0', outline: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'all 0.2s' }}>
                                        🪑 {tableNumber} <span style={{ color: '#94A3B8', fontSize: 10 }}>▼</span>
                                    </button>
                                )}
                            </div>

                            {/* Waiter Selection Row */}
                            <div style={{ display: 'flex', flexDirection: 'column', padding: '0 18px 14px 18px', borderBottom: '1px solid #E2E8F0', gap: 6 }}>
                                <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 10 }}>Assigned Waiter / Server</label>
                                <select value={selectedWaiter} onChange={e => setSelectedWaiter(e.target.value)}
                                    style={{ width: '100%', padding: '9px 10px', background: '#F8FAFC', borderRadius: 8, color: '#1A202C', fontSize: 13, fontWeight: 700, border: '1px solid #E2E8F0', outline: 'none', cursor: 'pointer' }}>
                                    {waiterList.map(w => <option key={w} value={w}>👤 {w}</option>)}
                                </select>
                            </div>

                            {/* Cart Header */}
                            <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0' }}>
                                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1A202C', margin: 0 }}>Current Order</h3>
                                <button style={{ background: 'none', border: 'none', color: '#EA4335', fontWeight: 700, fontSize: 13, cursor: 'pointer' }} onClick={async () => {
                                    if (cart.length === 0) return;
                                    const yes = await confirm({ message: 'Clear all items from the current order?', danger: true });
                                    if (yes) setCart([]);
                                }}>Clear</button>
                            </div>

                            {/* Cart Items */}
                            <div style={{ flex: 1, overflowY: 'auto', padding: '0 18px' }} className="no-scrollbar">
                                {cart.length === 0 ? (
                                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#CBD5E0' }}>
                                        <UtensilsCrossed size={44} style={{ opacity: 0.2, marginBottom: 12 }} />
                                        <p style={{ fontWeight: 600, fontSize: 13 }}>Cart is empty</p>
                                        <p style={{ fontSize: 12, marginTop: 4 }}>Add items from the menu</p>
                                    </div>
                                ) : cart.map(c => (
                                    <div key={c.item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 0', borderBottom: '1px dashed #E2E8F0' }}>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: 13, fontWeight: 700, color: '#1A202C', margin: '0 0 4px 0' }}>{c.item.name}</p>
                                            <p style={{ fontSize: 13, fontWeight: 700, color: '#4285F4', margin: 0 }}>₹{c.item.sellingPrice.toFixed(2)}</p>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <button onClick={() => updateQty(c.item.id, -1)} style={{ width: 26, height: 26, borderRadius: 7, border: '1px solid #E2E8F0', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                                <Minus size={12} color="#64748B" />
                                            </button>
                                            <span style={{ fontSize: 14, fontWeight: 800, color: '#1A202C', minWidth: 18, textAlign: 'center' }}>{c.qty}</span>
                                            <button onClick={() => updateQty(c.item.id, 1)} style={{ width: 26, height: 26, borderRadius: 7, border: 'none', background: '#4285F4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                                <Plus size={12} color="white" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Cart Summary */}
                            <div style={{ padding: '18px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>Sub Total</span>
                                    <span style={{ fontSize: 13, color: '#1A202C', fontWeight: 800 }}>₹{subTotal.toFixed(2)}</span>
                                </div>

                                {/* Instant Discounts Selection */}
                                <div style={{ margin: '10px 0 12px 0', borderBottom: '1px dashed #E2E8F0', paddingBottom: 10 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                        <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Apply Discount</span>
                                        {cartDiscountPercent > 0 && (
                                            <span style={{ fontSize: 12, color: '#EA4335', fontWeight: 700 }}>
                                                -₹{discountAmount.toFixed(2)} ({cartDiscountPercent}%)
                                            </span>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', gap: 6 }}>
                                        {[5, 10, 15].map(pct => (
                                            <button key={pct}
                                                type="button"
                                                onClick={() => setCartDiscountPercent(pct)}
                                                style={{
                                                    flex: 1,
                                                    padding: '6px 0',
                                                    border: '1px solid #E2E8F0',
                                                    borderRadius: 6,
                                                    fontSize: 11,
                                                    fontWeight: 800,
                                                    cursor: 'pointer',
                                                    background: cartDiscountPercent === pct ? 'linear-gradient(135deg, #34A853, #2E7D32)' : 'white',
                                                    color: cartDiscountPercent === pct ? 'white' : '#64748B',
                                                    transition: 'all 0.2s'
                                                }}>
                                                {pct}%
                                            </button>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => setCartDiscountPercent(0)}
                                            style={{
                                                padding: '6px 10px',
                                                border: '1px solid #E2E8F0',
                                                borderRadius: 6,
                                                fontSize: 11,
                                                fontWeight: 800,
                                                cursor: 'pointer',
                                                background: cartDiscountPercent === 0 ? '#F1F5F9' : 'white',
                                                color: '#EA4335',
                                            }}>
                                            Reset
                                        </button>
                                    </div>
                                </div>

                                {/* Custom Service Charges Input */}
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, borderBottom: '1px dashed #E2E8F0', paddingBottom: 10 }}>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Service Charge (₹)</span>
                                    <input
                                        type="number"
                                        min="0"
                                        value={customServiceCharge || ''}
                                        onChange={e => setCustomServiceCharge(Math.max(0, parseFloat(e.target.value) || 0))}
                                        placeholder="0.00"
                                        style={{
                                            width: 80,
                                            padding: '5px 8px',
                                            border: '1px solid #E2E8F0',
                                            borderRadius: 6,
                                            fontSize: 12,
                                            fontWeight: 700,
                                            color: '#1A202C',
                                            textAlign: 'right',
                                            background: 'white',
                                            outline: 'none'
                                        }}
                                    />
                                </div>

                                {cartDiscountPercent > 0 && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                        <span style={{ fontSize: 12, color: '#EA4335', fontWeight: 600 }}>Discount ({cartDiscountPercent}%)</span>
                                        <span style={{ fontSize: 13, color: '#EA4335', fontWeight: 800 }}>-₹{discountAmount.toFixed(2)}</span>
                                    </div>
                                )}
                                {customServiceCharge > 0 && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                        <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>Service Charge</span>
                                        <span style={{ fontSize: 13, color: '#1A202C', fontWeight: 800 }}>₹{customServiceCharge.toFixed(2)}</span>
                                    </div>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>Tax / GST</span>
                                    <span style={{ fontSize: 13, color: '#1A202C', fontWeight: 800 }}>₹{tax.toFixed(2)}</span>
                                </div>
                                {orderType === 'Takeaway' && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                        <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>Takeaway Charge</span>
                                        <span style={{ fontSize: 13, color: '#1A202C', fontWeight: 800 }}>₹{restSettings.takeawayCharge.toFixed(2)}</span>
                                    </div>
                                )}
                                {orderType === 'Delivery' && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                        <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>Delivery Charge</span>
                                        <span style={{ fontSize: 13, color: '#1A202C', fontWeight: 800 }}>₹{restSettings.deliveryCharge.toFixed(2)}</span>
                                    </div>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '14px 0', paddingTop: 12, borderTop: '2px dashed #E2E8F0' }}>
                                    <span style={{ fontSize: 16, color: '#1A202C', fontWeight: 900 }}>Total</span>
                                    <span style={{ fontSize: 20, color: '#4285F4', fontWeight: 900 }}>₹{total.toFixed(2)}</span>
                                </div>

                                {/* Action Buttons */}
                                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                                    <button style={{ flex: 1, padding: '12px', background: '#F1F5F9', color: '#64748B', borderRadius: 10, border: 'none', fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                                        <Printer size={14} /> KOT SCAN
                                    </button>
                                    <button onClick={handleSendToKitchen}
                                        style={{ flex: 1, padding: '12px', background: '#4285F4', color: 'white', borderRadius: 10, border: 'none', fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                                        <ChefHat size={14} /> Send to Kitchen
                                    </button>
                                </div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button onClick={handleCheckout}
                                        style={{ flex: 3, padding: '14px', background: '#34A853', color: 'white', borderRadius: 10, border: 'none', fontWeight: 800, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                                        <CheckCircle size={15} /> BILL & PAY
                                    </button>
                                    <button onClick={() => {
                                        if (cart.length === 0) return toast.error('Cart is empty!');
                                        // Reset split inputs
                                        setSplitCash(total);
                                        setSplitUpi(0);
                                        setSplitCard(0);
                                        setSplitShares(2);
                                        setShowSplitModal(true);
                                    }}
                                        type="button"
                                        style={{ flex: 2, padding: '14px', background: '#4285F4', color: 'white', borderRadius: 10, border: 'none', fontWeight: 800, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                                        🥞 SPLIT PAY
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* ── SPLIT PAYMENT MODAL ── */}
            {showSplitModal && (
                <div className="modal-overlay" onClick={() => setShowSplitModal(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 480, width: '90%' }}>
                        <div style={{ padding: '18px 24px 14px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <h3 style={{ fontWeight: 900, fontSize: 18, color: '#1A202C', margin: 0 }}>🥞 Split & Multi-Payment</h3>
                                <p style={{ fontSize: 12, color: '#64748B', margin: '4px 0 0' }}>Configure payments for total ₹{total.toFixed(2)}</p>
                            </div>
                            <button onClick={() => setShowSplitModal(false)} className="btn btn-ghost btn-icon"><X size={18} /></button>
                        </div>
                        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
                            {/* Equal splits options */}
                            <div style={{ background: '#F8FAFC', padding: 14, borderRadius: 12, border: '1px solid #E2E8F0' }}>
                                <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Equal Split Calculator</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: '#1A202C' }}>Split Bill:</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <button onClick={() => setSplitShares(prev => Math.max(2, prev - 1))}
                                            style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid #CBD5E1', background: 'white', fontWeight: 800, cursor: 'pointer' }}>-</button>
                                        <span style={{ fontSize: 14, fontWeight: 800, color: '#1A202C', minWidth: 20, textAlign: 'center' }}>{splitShares}</span>
                                        <button onClick={() => setSplitShares(prev => Math.min(10, prev + 1))}
                                            style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid #CBD5E1', background: 'white', fontWeight: 800, cursor: 'pointer' }}>+</button>
                                    </div>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: '#1A202C' }}>shares</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '10px 14px', borderRadius: 8, border: '1px solid #E2E8F0' }}>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: '#64748B' }}>Each Share:</span>
                                    <span style={{ fontSize: 15, fontWeight: 900, color: '#4285F4' }}>₹{(total / splitShares).toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                                    <button onClick={() => {
                                        const share = parseFloat((total / splitShares).toFixed(2));
                                        setSplitCash(share);
                                        setSplitUpi(parseFloat((total - share).toFixed(2))); // rest to UPI
                                        setSplitCard(0);
                                        toast.success(`Split loaded! Cash: ₹${share}, UPI: ₹${(total - share).toFixed(2)}`);
                                    }}
                                        style={{ flex: 1, padding: '8px', background: 'white', border: '1px solid #CBD5E1', borderRadius: 8, fontSize: 11, fontWeight: 700, color: '#4A5568', cursor: 'pointer' }}>
                                        Load Cash + UPI Split
                                    </button>
                                    <button onClick={() => {
                                        // 50/50 Cash & UPI
                                        const half = parseFloat((total / 2).toFixed(2));
                                        setSplitCash(half);
                                        setSplitUpi(parseFloat((total - half).toFixed(2)));
                                        setSplitCard(0);
                                        toast.success("Loaded 50/50 Cash & UPI Split!");
                                    }}
                                        style={{ flex: 1, padding: '8px', background: 'white', border: '1px solid #CBD5E1', borderRadius: 8, fontSize: 11, fontWeight: 700, color: '#4A5568', cursor: 'pointer' }}>
                                        50/50 Cash & UPI
                                    </button>
                                </div>
                            </div>

                            {/* Split Inputs */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Enter Payment Amounts</p>
                                
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: '#1A202C' }}>💵 Cash Amount (₹)</span>
                                    <input type="number" min="0" step="any" value={splitCash || ''}
                                        onChange={e => setSplitCash(Math.max(0, parseFloat(e.target.value) || 0))}
                                        style={{ width: 120, padding: '8px 12px', border: '1px solid #CBD5E0', borderRadius: 8, fontSize: 13, fontWeight: 800, color: '#1A202C', textAlign: 'right' }} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: '#1A202C' }}>📱 UPI Amount (₹)</span>
                                    <input type="number" min="0" step="any" value={splitUpi || ''}
                                        onChange={e => setSplitUpi(Math.max(0, parseFloat(e.target.value) || 0))}
                                        style={{ width: 120, padding: '8px 12px', border: '1px solid #CBD5E0', borderRadius: 8, fontSize: 13, fontWeight: 800, color: '#1A202C', textAlign: 'right' }} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: '#1A202C' }}>💳 Card Amount (₹)</span>
                                    <input type="number" min="0" step="any" value={splitCard || ''}
                                        onChange={e => setSplitCard(Math.max(0, parseFloat(e.target.value) || 0))}
                                        style={{ width: 120, padding: '8px 12px', border: '1px solid #CBD5E0', borderRadius: 8, fontSize: 13, fontWeight: 800, color: '#1A202C', textAlign: 'right' }} />
                                </div>
                            </div>

                            {/* Verification Block */}
                            {(() => {
                                const paidSum = splitCash + splitUpi + splitCard;
                                const remaining = total - paidSum;
                                const isMatched = Math.abs(remaining) < 0.02;

                                return (
                                    <div style={{
                                        background: isMatched ? '#F0FDF4' : '#FEF2F2',
                                        border: `1.5px solid ${isMatched ? '#86EFAC' : '#FCA5A5'}`,
                                        borderRadius: 12,
                                        padding: '12px 14px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 6
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                            <span style={{ fontWeight: 600, color: '#4A5568' }}>Total Paid:</span>
                                            <span style={{ fontWeight: 800, color: '#1A202C' }}>₹{paidSum.toFixed(2)}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                            <span style={{ fontWeight: 600, color: '#4A5568' }}>Remaining Due:</span>
                                            <span style={{ fontWeight: 800, color: isMatched ? '#16A34A' : '#EF4444' }}>
                                                {isMatched ? "₹0.00 (Fully Settled ✓)" : `₹${remaining.toFixed(2)}`}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>
                        <div style={{ padding: '14px 24px', borderTop: '1px solid #E2E8F0', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                            <button onClick={() => setShowSplitModal(false)} className="btn btn-outline">Cancel</button>
                            <button onClick={handleSplitCheckout}
                                disabled={Math.abs((splitCash + splitUpi + splitCard) - total) > 0.02}
                                style={{
                                    padding: '10px 18px',
                                    background: Math.abs((splitCash + splitUpi + splitCard) - total) <= 0.02 ? '#34A853' : '#A0AEC0',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: 8,
                                    fontWeight: 800,
                                    fontSize: 13,
                                    cursor: Math.abs((splitCash + splitUpi + splitCard) - total) <= 0.02 ? 'pointer' : 'not-allowed'
                                }}>
                                Process Split Checkout →
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── TABLE MAP MODAL ── */}
            {showTableMapModal && (
                <div className="modal-overlay" onClick={() => setShowTableMapModal(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 700, width: '95%' }}>
                        <div style={{ padding: '18px 24px 14px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                            <div>
                                <h3 style={{ fontWeight: 900, fontSize: 18, color: '#1A202C', margin: 0 }}>🪑 Interactive Table Map</h3>
                                <p style={{ fontSize: 12, color: '#64748B', margin: '4px 0 0 0' }}>
                                    {editLayoutMode ? "🛠 Click a table, then click any cell to place/swap it." : "Select a table or manage statuses."}
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <button 
                                    onClick={() => {
                                        setEditLayoutMode(!editLayoutMode);
                                        setSelectedTableForMove(null);
                                    }} 
                                    className="btn btn-sm"
                                    style={{
                                        background: editLayoutMode ? '#7C3AED' : 'white',
                                        color: editLayoutMode ? 'white' : '#64748B',
                                        border: '1px solid #E2E8F0',
                                        borderRadius: 8,
                                        fontWeight: 700,
                                        fontSize: 12,
                                        cursor: 'pointer',
                                        padding: '6px 12px'
                                    }}
                                >
                                    🛠 {editLayoutMode ? "Finish Layout" : "Edit Layout Grid"}
                                </button>
                                <button onClick={() => setShowTableMapModal(false)} className="btn btn-ghost btn-icon"><X size={18} /></button>
                            </div>
                        </div>
                        <div style={{ padding: '20px 24px', maxHeight: '70vh', overflowY: 'auto' }}>
                            {/* Legend / Guide */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, padding: '12px 14px', background: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0', flexWrap: 'wrap', gap: 10 }}>
                                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700 }}>
                                        <span style={{ width: 10, height: 10, background: '#4ade80', borderRadius: 3, border: '1px solid #22c55e' }}></span>
                                        <span style={{ color: '#16a34a' }}>Free</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700 }}>
                                        <span style={{ width: 10, height: 10, background: '#fca5a5', borderRadius: 3, border: '1px solid #ef4444' }}></span>
                                        <span style={{ color: '#dc2626' }}>Occupied</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700 }}>
                                        <span style={{ width: 10, height: 10, background: '#fef08a', borderRadius: 3, border: '1px solid #eab308' }}></span>
                                        <span style={{ color: '#ca8a04' }}>Dirty</span>
                                    </div>
                                </div>
                                {editLayoutMode && selectedTableForMove && (
                                    <span style={{ fontSize: 11, fontWeight: 800, color: '#3B82F6', background: '#EFF6FF', padding: '4px 10px', borderRadius: 6, border: '1px solid #BFDBFE' }}>
                                        Moving: {selectedTableForMove} 🚀
                                    </span>
                                )}
                            </div>

                            {/* 6x6 Floor Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10, background: '#F1F5F9', padding: 14, borderRadius: 16, border: '1px solid #E2E8F0' }}>
                                {Array.from({ length: 36 }).map((_, cellIdx) => {
                                    const tableName = Object.keys(tablePositions).find(k => tablePositions[k] === cellIdx);
                                    
                                    if (tableName) {
                                        const isSelectedForMove = selectedTableForMove === tableName;
                                        const isOccupied = occupiedTables.has(tableName);
                                        const isDirty = dirtyTables.includes(tableName);
                                        
                                        let bg = '#F0FDF4';
                                        let border = '2px solid #22C55E';
                                        let color = '#15803D';
                                        let statusLabel = 'Free';

                                        if (isOccupied) {
                                            bg = '#FEF2F2';
                                            border = '2px solid #EF4444';
                                            color = '#B91C1C';
                                            statusLabel = 'Eating';
                                        } else if (isDirty) {
                                            bg = '#FEFCE8';
                                            border = '2px solid #EAB308';
                                            color = '#A16207';
                                            statusLabel = 'Dirty';
                                        }

                                        return (
                                            <div key={cellIdx}
                                                onClick={() => {
                                                    if (editLayoutMode) {
                                                        if (selectedTableForMove && selectedTableForMove !== tableName) {
                                                            // Swap positions!
                                                            const prevIdx = tablePositions[selectedTableForMove];
                                                            setTablePositions(prev => {
                                                                const next = { ...prev, [selectedTableForMove]: cellIdx, [tableName]: prevIdx };
                                                                localStorage.setItem('restaurant_table_positions', JSON.stringify(next));
                                                                return next;
                                                            });
                                                            setSelectedTableForMove(null);
                                                            toast.success(`Swapped ${selectedTableForMove} and ${tableName}! 🔄`);
                                                        } else {
                                                            setSelectedTableForMove(isSelectedForMove ? null : tableName);
                                                        }
                                                    } else {
                                                        setTableNumber(tableName);
                                                        setOrderType('Dining');
                                                        setActiveTab('Pos');
                                                        setShowTableMapModal(false);
                                                    }
                                                }}
                                                style={{
                                                    background: bg,
                                                    border: isSelectedForMove ? '2px solid #3B82F6' : border,
                                                    borderRadius: 12,
                                                    padding: '10px 4px',
                                                    textAlign: 'center',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: 4,
                                                    aspectRatio: '1',
                                                    boxShadow: isSelectedForMove ? '0 0 0 4px rgba(59, 130, 246, 0.4), 0 8px 16px rgba(59, 130, 246, 0.2)' : '0 2px 4px rgba(0,0,0,0.02)',
                                                    transform: isSelectedForMove ? 'scale(1.05)' : 'none',
                                                    position: 'relative'
                                                }}>
                                                <p style={{ margin: 0, fontSize: 13, fontWeight: 900, color: color }}>
                                                    T-{tableName.replace('Table ', '')}
                                                </p>
                                                <span style={{ fontSize: 9, fontWeight: 700, opacity: 0.8, color: color }}>
                                                    {statusLabel}
                                                </span>
                                                {isDirty && !editLayoutMode && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setDirtyTables(prev => prev.filter(dt => dt !== tableName));
                                                            toast.success(`${tableName} marked as clean! ✨`);
                                                        }}
                                                        style={{
                                                            position: 'absolute',
                                                            bottom: 4,
                                                            padding: '2px 4px',
                                                            background: 'white',
                                                            border: '1px solid #EAB308',
                                                            borderRadius: 4,
                                                            fontSize: 8,
                                                            fontWeight: 800,
                                                            color: '#A16207',
                                                            cursor: 'pointer'
                                                        }}>
                                                        🧹 Clean
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    } else {
                                        // Empty Grid Cell
                                        return (
                                            <div key={cellIdx}
                                                onClick={() => {
                                                    if (editLayoutMode && selectedTableForMove) {
                                                        setTablePositions(prev => {
                                                            const next = { ...prev, [selectedTableForMove]: cellIdx };
                                                            localStorage.setItem('restaurant_table_positions', JSON.stringify(next));
                                                            return next;
                                                        });
                                                        setSelectedTableForMove(null);
                                                        toast.success(`Moved table to slot ${cellIdx + 1}! 📍`);
                                                    }
                                                }}
                                                style={{
                                                    border: editLayoutMode ? '1.5px dashed #CBD5E1' : 'none',
                                                    borderRadius: 12,
                                                    aspectRatio: '1',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    background: editLayoutMode ? (selectedTableForMove ? 'rgba(59, 130, 246, 0.08)' : 'rgba(255,255,255,0.4)') : 'transparent',
                                                    cursor: editLayoutMode && selectedTableForMove ? 'pointer' : 'default',
                                                    transition: 'all 0.2s',
                                                    color: '#94A3B8'
                                                }}
                                            >
                                                {editLayoutMode && selectedTableForMove && (
                                                    <span style={{ fontSize: 16, fontWeight: 900 }}>+</span>
                                                )}
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                        <div style={{ padding: '14px 24px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <button 
                                onClick={() => {
                                    if (window.confirm("Reset floor plan to default layout?")) {
                                        const defaultPos: Record<string, number> = {};
                                        for (let i = 0; i < numTables; i++) {
                                            defaultPos[`Table ${i + 1}`] = i;
                                        }
                                        setTablePositions(defaultPos);
                                        localStorage.setItem('restaurant_table_positions', JSON.stringify(defaultPos));
                                        toast.success("Table layout reset! 🔄");
                                    }
                                }} 
                                className="btn btn-outline"
                                style={{ color: '#EA4335', borderColor: '#FCA5A5' }}
                            >
                                Reset Layout
                            </button>
                            <button onClick={() => setShowTableMapModal(false)} className="btn btn-outline">Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── ADD ITEM MODAL ── */}
            {showAdd && (
                <div className="modal-overlay" onClick={() => setShowAdd(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 500 }}>
                        <div style={{ padding: '18px 24px 14px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h3 style={{ fontWeight: 900, fontSize: 17, color: '#1A202C', margin: 0 }}>Add New Item</h3>
                            <button onClick={() => setShowAdd(false)} className="btn btn-ghost btn-icon"><X size={18} /></button>
                        </div>
                        <div style={{ padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <div>
                                <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Item Name *</label>
                                <input className="e-input" placeholder="e.g. Farmhouse Pizza" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</label>
                                    <input className="e-input" placeholder="e.g. Pizza" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
                                </div>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Price ₹ *</label>
                                    <input type="number" className="e-input" placeholder="0.00" value={form.sellingPrice} onChange={e => setForm(f => ({ ...f, sellingPrice: e.target.value }))} />
                                </div>
                            </div>
                            <div>
                                <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Item Image</label>
                                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                    {form.imageUrl && <img src={form.imageUrl} style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }} />}
                                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} id="pos-img-upload" />
                                    <label htmlFor="pos-img-upload" className="btn btn-outline btn-sm" style={{ cursor: 'pointer', flexShrink: 0 }}>Choose File</label>
                                    <input className="e-input" placeholder="Or paste image URL" value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} style={{ flex: 1 }} />
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: '14px 24px', borderTop: '1px solid #E2E8F0', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                            <button onClick={() => setShowAdd(false)} className="btn btn-outline">Cancel</button>
                            <button onClick={handleSaveProduct} className="btn btn-blue">Save Item</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── FETCH BILL MODAL ── */}
            {fetchModal && (
                <div className="modal-overlay" onClick={() => setFetchModal(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 440 }}>
                        <div style={{ padding: '18px 24px 14px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h3 style={{ fontWeight: 900, fontSize: 17, color: '#1A202C', margin: 0 }}>Scan / Fetch Bill</h3>
                            <button onClick={() => setFetchModal(false)} className="btn btn-ghost btn-icon"><X size={18} /></button>
                        </div>
                        <div style={{ padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <input autoFocus value={fetchQuery} onChange={e => setFetchQuery(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleFetchBill()}
                                placeholder="Scan Barcode or Enter Invoice Number"
                                className="e-input" style={{ fontSize: 15, padding: 12, fontWeight: 700 }} />
                            {fetchedInv && (
                                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: 16, marginTop: 8 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                                        <span style={{ fontWeight: 800, color: '#1A202C' }}>{fetchedInv.invoiceNumber}</span>
                                        <span style={{ fontWeight: 800, color: '#4285F4' }}>₹{fetchedInv.grandTotal.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div style={{ height: 1, background: '#E2E8F0', margin: '10px 0' }} />
                                    <div style={{ maxHeight: 150, overflowY: 'auto' }}>
                                        {fetchedInv.items.map((it: any, j: number) => (
                                            <div key={j} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
                                                <span style={{ color: '#64748B' }}>{it.qty}x {it.name}</span>
                                                <span style={{ fontWeight: 700, color: '#1A202C' }}>₹{it.amount.toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div style={{ padding: '14px 24px', borderTop: '1px solid #E2E8F0', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                            <button onClick={() => setFetchModal(false)} className="btn btn-outline">Close</button>
                            {!fetchedInv && <button onClick={handleFetchBill} className="btn btn-blue">Search</button>}
                        </div>
                    </div>
                </div>
            )}

            {/* ── DEAL FORM MODAL ── */}
            {showDealForm && (
                <div className="modal-overlay" onClick={() => setShowDealForm(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 480 }}>
                        <div style={{ padding: '18px 24px 14px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h3 style={{ fontWeight: 900, fontSize: 17, color: '#1A202C', margin: 0 }}>{editingDeal ? 'Edit Deal' : 'Add New Deal'}</h3>
                            <button onClick={() => setShowDealForm(false)} className="btn btn-ghost btn-icon"><X size={18} /></button>
                        </div>
                        <div style={{ padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 10, alignItems: 'end' }}>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Deal Title *</label>
                                    <input className="e-input" placeholder="e.g. Happy Hour Special" value={dealForm.title} onChange={e => setDealForm(d => ({ ...d, title: e.target.value }))} />
                                </div>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Emoji</label>
                                    <input className="e-input" style={{ width: 60, textAlign: 'center', fontSize: 20 }} value={dealForm.emoji} onChange={e => setDealForm(d => ({ ...d, emoji: e.target.value }))} />
                                </div>
                            </div>
                            <div>
                                <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description</label>
                                <input className="e-input" placeholder="Brief description of the deal" value={dealForm.description} onChange={e => setDealForm(d => ({ ...d, description: e.target.value }))} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Discount Type</label>
                                    <select className="e-input" value={dealForm.type} onChange={e => setDealForm(d => ({ ...d, type: e.target.value as 'percent' | 'flat' }))}>
                                        <option value="percent">Percent (%)</option>
                                        <option value="flat">Flat (₹)</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Discount Value</label>
                                    <input type="number" className="e-input" placeholder="0" value={dealForm.discount} onChange={e => setDealForm(d => ({ ...d, discount: parseFloat(e.target.value) || 0 }))} />
                                </div>
                            </div>
                            <div>
                                <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Valid Until (optional)</label>
                                <input type="date" className="e-input" value={dealForm.validUntil} onChange={e => setDealForm(d => ({ ...d, validUntil: e.target.value }))} />
                            </div>
                        </div>
                        <div style={{ padding: '14px 24px', borderTop: '1px solid #E2E8F0', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                            <button onClick={() => setShowDealForm(false)} className="btn btn-outline">Cancel</button>
                            <button onClick={handleSaveDeal} className="btn btn-blue">
                                {editingDeal ? 'Update Deal' : 'Save Deal'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Floating Mobile Cart Indicator */}
            {cart.length > 0 && (
                <div 
                    className="pos-mobile-cart-float"
                    style={{
                        position: 'fixed',
                        bottom: 20,
                        left: 20,
                        right: 20,
                        background: 'linear-gradient(135deg, #34A853, #2E7D32)',
                        color: 'white',
                        borderRadius: 14,
                        padding: '14px 20px',
                        display: 'none',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: '0 8px 30px rgba(46,125,50,0.3)',
                        zIndex: 99,
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        const cartEl = document.querySelector('.pos-cart-panel');
                        if (cartEl) {
                            cartEl.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 18 }}>🛒</span>
                        <div style={{ textAlign: 'left' }}>
                            <span style={{ fontWeight: 800, fontSize: 14, display: 'block' }}>{cart.length} item{cart.length > 1 ? 's' : ''} added</span>
                            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>Tap to checkout</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontWeight: 900, fontSize: 16 }}>₹{total.toFixed(2)}</span>
                        <ChevronRight size={16} />
                    </div>
                </div>
            )}
        </>
    );
}
