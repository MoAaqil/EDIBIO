'use client';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStore, useCompanyData, useActiveCompany } from '@/lib/store';
import type { Product } from '@/lib/types';
import {
    Search, Bell, Settings, LayoutDashboard, UtensilsCrossed,
    ClipboardList, FileText, LogOut, Plus, Minus, Printer,
    CheckCircle, X, Trash2, Clock, ChefHat, Tag, Truck,
    Timer, RefreshCw, ChevronLeft, ChevronRight, Edit2, Save
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
    const { addInvoice, nextInvoiceNumber, addProduct, deleteProduct } = useStore();
    const router = useRouter();

    // ── POS State ──
    const [activeTab, setActiveTab] = useState('Pos');
    const [activeCat, setActiveCat] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [orderType, setOrderType] = useState('Dining');
    const [tableNumber, setTableNumber] = useState('Table 1');
    const [cart, setCart] = useState<{ item: Product; qty: number }[]>([]);
    const invoices = useCompanyData('invoices') as any[];

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
    });
    const [settingsForm, setSettingsForm] = useState<RestSettings>({
        deliveryCharge: 0,
        takeawayCharge: 0,
        numberOfTables: 12,
    });

    // ── Kitchen Orders ──
    const [kitchenOrders, setKitchenOrders] = useState<KitchenOrder[]>([]);

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
                setRestSettings(parsed);
                setSettingsForm(parsed);
            }
        } catch { }
        try {
            const k = localStorage.getItem('restaurant_kitchen_orders');
            if (k) setKitchenOrders(JSON.parse(k));
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
    const tax = cart.reduce((acc, c) => {
        if (!c.item.taxIncluded) {
            return acc + (c.item.sellingPrice * (c.item.gstRate as number) / 100) * c.qty;
        }
        return acc;
    }, 0);
    const extraCharge =
        orderType === 'Takeaway' ? restSettings.takeawayCharge :
            orderType === 'Delivery' ? restSettings.deliveryCharge : 0;
    const total = subTotal + tax + extraCharge;

    const numTables = restSettings.numberOfTables || 12;
    const tableOptions = Array.from({ length: numTables }, (_, i) => `Table ${i + 1}`);

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
        tableNumber,
        orderType,
        items: cart.map(c => ({ name: c.item.name, qty: c.qty })),
        status,
        createdAt: new Date().toISOString(),
    });

    // ── Send to Kitchen ──
    const handleSendToKitchen = () => {
        if (cart.length === 0) return toast.error('Cart is empty!');
        const order = createKitchenOrder('new');
        setKitchenOrders(prev => [order, ...prev]);
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
                const ta = c.item.taxIncluded ? c.item.sellingPrice / (1 + tr / 100) : c.item.sellingPrice;
                const amt = c.item.taxIncluded ? c.item.sellingPrice : ta * (1 + tr / 100);
                return {
                    productId: c.item.id, name: c.item.name, qty: c.qty, unit: c.item.unit,
                    rate: c.item.sellingPrice, discount: 0, discountAmt: 0,
                    taxableAmt: ta * c.qty, gstRate: tr as any,
                    cgst: tr / 2, sgst: tr / 2, igst: 0, cess: 0,
                    totalGst: (amt - ta) * c.qty, amount: amt * c.qty, hsnCode: c.item.hsnCode,
                };
            }),
            subTotal,
            totalDiscount: 0,
            taxableAmount: subTotal,
            totalCgst: tax / 2, totalSgst: tax / 2, totalIgst: 0, totalCess: 0, totalGst: tax,
            shippingCharges: orderType === 'Delivery' ? restSettings.deliveryCharge : 0,
            packingCharges: orderType === 'Takeaway' ? restSettings.takeawayCharge : 0,
            adjustmentAmount: 0, roundOff: 0,
            grandTotal: total,
            paymentStatus: 'paid', amountPaid: total, balanceDue: 0,
            payments: [{ method: 'cash', amount: total, date: new Date().toISOString().split('T')[0] }],
            paymentMethod: 'cash',
            partyName: orderType === 'Dining' ? `Dining - ${tableNumber}` : orderType,
            counter: `${orderType} - ${tableNumber}`,
            notes: `${orderType} Order`,
            isGstBill: true, isHidden: false, isPrivate: false,
            createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        });

        // Also create kitchen order
        const kitOrder = createKitchenOrder('new');
        setKitchenOrders(prev => [kitOrder, ...prev]);

        setCart([]);
        window.open(`/company/billing/invoice?id=${newId}&print=true`, '_blank');
        toast.success(`Order billed! ${tableNumber}`);
    };

    // ── Settings Save ──
    const handleSaveSettings = () => {
        localStorage.setItem('restaurant_settings', JSON.stringify(settingsForm));
        setRestSettings(settingsForm);
        toast.success('Settings saved!');
    };

    // ── Kitchen Move ──
    const moveKitchenOrder = (id: string, status: KitchenOrder['status']) => {
        setKitchenOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    };

    const removeKitchenOrder = (id: string) => {
        setKitchenOrders(prev => prev.filter(o => o.id !== id));
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
                .kit-card { background: white; border: 1px solid #E2E8F0; border-radius: 12px; padding: 14px; margin-bottom: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
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
                        <div className="pos-search-wrapper">
                            <Search size={15} color="#94A3B8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                style={{ width: '100%', background: '#F8FAFC', padding: '10px 14px 10px 38px', borderRadius: 99, border: '1px solid #E2E8F0', outline: 'none', fontSize: 13, color: '#1A202C', fontWeight: 500 }}
                            />
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
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
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
                                <div>
                                    <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                                        <button onClick={() => setKitchenOrders(prev => prev.filter(o => o.status !== 'served'))}
                                            style={{ padding: '7px 14px', borderRadius: 8, background: '#F8FAFC', border: '1px solid #E2E8F0', fontSize: 12, fontWeight: 700, color: '#64748B', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <Trash2 size={13} /> Clear Served
                                        </button>
                                        <span style={{ marginLeft: 'auto', fontSize: 12, color: '#94A3B8', alignSelf: 'center' }}>{kitchenOrders.length} total orders</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                                        {/* NEW */}
                                        <div className="kit-col">
                                            <div style={{ background: '#FBBC04', borderRadius: 10, padding: '10px 16px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <Timer size={16} color="white" />
                                                <span style={{ color: 'white', fontWeight: 800, fontSize: 14 }}>NEW TICKETS</span>
                                                <span style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.3)', color: 'white', borderRadius: 99, padding: '2px 8px', fontSize: 12, fontWeight: 700 }}>{kitchenOrders.filter(o => o.status === 'new').length}</span>
                                            </div>
                                            {kitchenOrders.filter(o => o.status === 'new').map(order => (
                                                <div key={order.id} className="kit-card">
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                                        <span style={{ fontWeight: 800, fontSize: 13, color: '#1A202C' }}>{order.tableNumber}</span>
                                                        <span style={{ fontSize: 11, color: '#94A3B8' }}>{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                    </div>
                                                    <span style={{ fontSize: 11, background: '#EBF5FB', color: '#4285F4', borderRadius: 6, padding: '2px 8px', fontWeight: 700 }}>{order.orderType}</span>
                                                    <div style={{ marginTop: 10, marginBottom: 10 }}>
                                                        {order.items.map((it, j) => (
                                                            <div key={j} style={{ fontSize: 12, color: '#64748B', padding: '3px 0', borderBottom: '1px dashed #F1F5F9' }}>
                                                                <span style={{ fontWeight: 700, color: '#1A202C' }}>{it.qty}x</span> {it.name}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <button onClick={() => moveKitchenOrder(order.id, 'cooking')}
                                                        style={{ width: '100%', padding: '8px', background: '#4285F4', color: 'white', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
                                                        Start Cooking →
                                                    </button>
                                                </div>
                                            ))}
                                            {kitchenOrders.filter(o => o.status === 'new').length === 0 && (
                                                <div style={{ textAlign: 'center', color: '#CBD5E0', padding: '24px 0', fontSize: 13 }}>No new tickets</div>
                                            )}
                                        </div>

                                        {/* COOKING */}
                                        <div className="kit-col">
                                            <div style={{ background: '#4285F4', borderRadius: 10, padding: '10px 16px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <ChefHat size={16} color="white" />
                                                <span style={{ color: 'white', fontWeight: 800, fontSize: 14 }}>COOKING NOW</span>
                                                <span style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.3)', color: 'white', borderRadius: 99, padding: '2px 8px', fontSize: 12, fontWeight: 700 }}>{kitchenOrders.filter(o => o.status === 'cooking').length}</span>
                                            </div>
                                            {kitchenOrders.filter(o => o.status === 'cooking').map(order => (
                                                <div key={order.id} className="kit-card">
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                                        <span style={{ fontWeight: 800, fontSize: 13, color: '#1A202C' }}>{order.tableNumber}</span>
                                                        <span style={{ fontSize: 11, color: '#94A3B8' }}>{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                    </div>
                                                    <span style={{ fontSize: 11, background: '#EBF5FB', color: '#4285F4', borderRadius: 6, padding: '2px 8px', fontWeight: 700 }}>{order.orderType}</span>
                                                    <div style={{ marginTop: 10, marginBottom: 10 }}>
                                                        {order.items.map((it, j) => (
                                                            <div key={j} style={{ fontSize: 12, color: '#64748B', padding: '3px 0', borderBottom: '1px dashed #F1F5F9' }}>
                                                                <span style={{ fontWeight: 700, color: '#1A202C' }}>{it.qty}x</span> {it.name}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div style={{ display: 'flex', gap: 8 }}>
                                                        <button onClick={() => moveKitchenOrder(order.id, 'new')}
                                                            style={{ flex: 1, padding: '7px', background: '#F8FAFC', color: '#64748B', border: '1px solid #E2E8F0', borderRadius: 8, fontWeight: 700, fontSize: 11, cursor: 'pointer' }}>
                                                            ← Back
                                                        </button>
                                                        <button onClick={() => moveKitchenOrder(order.id, 'ready')}
                                                            style={{ flex: 2, padding: '7px', background: '#34A853', color: 'white', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 11, cursor: 'pointer' }}>
                                                            Ready to Serve →
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            {kitchenOrders.filter(o => o.status === 'cooking').length === 0 && (
                                                <div style={{ textAlign: 'center', color: '#CBD5E0', padding: '24px 0', fontSize: 13 }}>Nothing cooking</div>
                                            )}
                                        </div>

                                        {/* READY */}
                                        <div className="kit-col">
                                            <div style={{ background: '#34A853', borderRadius: 10, padding: '10px 16px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <CheckCircle size={16} color="white" />
                                                <span style={{ color: 'white', fontWeight: 800, fontSize: 14 }}>READY TO SERVE</span>
                                                <span style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.3)', color: 'white', borderRadius: 99, padding: '2px 8px', fontSize: 12, fontWeight: 700 }}>{kitchenOrders.filter(o => o.status === 'ready').length}</span>
                                            </div>
                                            {kitchenOrders.filter(o => o.status === 'ready').map(order => (
                                                <div key={order.id} className="kit-card" style={{ borderLeft: '3px solid #34A853' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                                        <span style={{ fontWeight: 800, fontSize: 13, color: '#1A202C' }}>{order.tableNumber}</span>
                                                        <span style={{ fontSize: 11, color: '#94A3B8' }}>{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                    </div>
                                                    <span style={{ fontSize: 11, background: '#E8F5E9', color: '#34A853', borderRadius: 6, padding: '2px 8px', fontWeight: 700 }}>{order.orderType}</span>
                                                    <div style={{ marginTop: 10, marginBottom: 10 }}>
                                                        {order.items.map((it, j) => (
                                                            <div key={j} style={{ fontSize: 12, color: '#64748B', padding: '3px 0', borderBottom: '1px dashed #F1F5F9' }}>
                                                                <span style={{ fontWeight: 700, color: '#1A202C' }}>{it.qty}x</span> {it.name}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div style={{ display: 'flex', gap: 8 }}>
                                                        <button onClick={() => moveKitchenOrder(order.id, 'cooking')}
                                                            style={{ flex: 1, padding: '7px', background: '#F8FAFC', color: '#64748B', border: '1px solid #E2E8F0', borderRadius: 8, fontWeight: 700, fontSize: 11, cursor: 'pointer' }}>
                                                            ← Back
                                                        </button>
                                                        <button onClick={() => { moveKitchenOrder(order.id, 'served'); toast.success('Marked as served!'); }}
                                                            style={{ flex: 2, padding: '7px', background: '#1A202C', color: 'white', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 11, cursor: 'pointer' }}>
                                                            ✓ Served
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
                                <div style={{ maxWidth: 480 }}>
                                    <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 16, padding: '28px 28px' }}>
                                        <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1A202C', marginBottom: 22 }}>Restaurant Settings</h3>

                                        <div style={{ marginBottom: 18 }}>
                                            <label style={{ fontSize: 12, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Delivery Charge (₹)</label>
                                            <input type="number" value={settingsForm.deliveryCharge} onChange={e => setSettingsForm(s => ({ ...s, deliveryCharge: parseFloat(e.target.value) || 0 }))}
                                                style={{ width: '100%', padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14, color: '#1A202C', outline: 'none', background: '#F8FAFC', boxSizing: 'border-box' }} />
                                        </div>

                                        <div style={{ marginBottom: 18 }}>
                                            <label style={{ fontSize: 12, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Takeaway Charge (₹)</label>
                                            <input type="number" value={settingsForm.takeawayCharge} onChange={e => setSettingsForm(s => ({ ...s, takeawayCharge: parseFloat(e.target.value) || 0 }))}
                                                style={{ width: '100%', padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14, color: '#1A202C', outline: 'none', background: '#F8FAFC', boxSizing: 'border-box' }} />
                                        </div>

                                        <div style={{ marginBottom: 24 }}>
                                            <label style={{ fontSize: 12, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Number of Tables</label>
                                            <input type="number" min={1} max={100} value={settingsForm.numberOfTables} onChange={e => setSettingsForm(s => ({ ...s, numberOfTables: parseInt(e.target.value) || 12 }))}
                                                style={{ width: '100%', padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14, color: '#1A202C', outline: 'none', background: '#F8FAFC', boxSizing: 'border-box' }} />
                                        </div>

                                        <button onClick={handleSaveSettings}
                                            style={{ width: '100%', padding: '13px', background: '#4285F4', color: 'white', border: 'none', borderRadius: 10, fontWeight: 800, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                            <Save size={16} /> Save Settings
                                        </button>
                                    </div>
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
                                    <select value={tableNumber} onChange={e => setTableNumber(e.target.value)}
                                        style={{ flex: 1, padding: '9px 10px', background: '#F8FAFC', borderRadius: 8, color: '#1A202C', fontSize: 13, fontWeight: 700, border: '1px solid #E2E8F0', outline: 'none', cursor: 'pointer' }}>
                                        {tableOptions.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                )}
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
                                <button onClick={handleCheckout}
                                    style={{ width: '100%', padding: '14px', background: '#34A853', color: 'white', borderRadius: 10, border: 'none', fontWeight: 800, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                    <CheckCircle size={16} /> BILL & PAY
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

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
        </>
    );
}
