'use client';
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStore, useCompanyData, useActiveCompany } from '@/lib/store';
import type { Product } from '@/lib/types';
import {
    Search, Bell, Settings, LayoutDashboard, UtensilsCrossed, Users,
    ClipboardList, Truck, CreditCard, User, FileText, BarChart3,
    LogOut, Plus, Minus, Printer, CheckCircle, X, Trash2
} from 'lucide-react';
import toast from 'react-hot-toast';
import { confirm } from '@/components/ConfirmDialog';

export default function RestaurantPOS() {
    const company = useActiveCompany();
    const products = useCompanyData('products') as Product[];
    const { addInvoice, nextInvoiceNumber, addProduct, deleteProduct } = useStore();
    const router = useRouter();

    const [showAdd, setShowAdd] = useState(false);
    const [form, setForm] = useState({ name: '', category: '', sellingPrice: '', imageUrl: '' });

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setForm(f => ({ ...f, imageUrl: ev.target?.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProduct = () => {
        if (!company) return;
        if (!form.name || !form.sellingPrice) return toast.error("Name and price required");
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
            cessRate: 0
        });
        setShowAdd(false);
        setForm({ name: '', category: '', sellingPrice: '', imageUrl: '' });
        setActiveCat('All');
    };

    const [activeTab, setActiveTab] = useState('Pos');
    const [activeCat, setActiveCat] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [orderType, setOrderType] = useState('Dining');
    const [tableNumber, setTableNumber] = useState('Table 1');
    const [fetchModal, setFetchModal] = useState(false);
    const [fetchQuery, setFetchQuery] = useState('');
    const [fetchedInv, setFetchedInv] = useState<any>(null);
    const invoices = useCompanyData('invoices') as any[];
    const [cart, setCart] = useState<{ item: Product, qty: number }[]>([]);

    const handleFetchBill = () => {
        const inv = invoices.find(i => i.invoiceNumber.toLowerCase() === fetchQuery.toLowerCase() || i.id === fetchQuery);
        if (inv) {
            setFetchedInv(inv);
        } else {
            toast.error('Invoice not found!');
        }
    };

    const categories = useMemo(() => {
        const cats = Array.from(new Set(products.map(p => p.category).filter(Boolean)));
        return ['All', ...cats] as string[];
    }, [products]);

    const filteredItems = useMemo(() => {
        let items = products;
        if (activeCat !== 'All') {
            items = items.filter(i => i.category === activeCat);
        }
        if (searchQuery) {
            items = items.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        return items;
    }, [products, activeCat, searchQuery]);

    const addToCart = (item: Product) => {
        setCart(prev => {
            const ex = prev.find(p => p.item.id === item.id);
            if (ex) return prev.map(p => p.item.id === item.id ? { ...p, qty: p.qty + 1 } : p);
            return [...prev, { item, qty: 1 }];
        });
    };

    const updateQty = (id: string, delta: number) => {
        setCart(prev => prev.map(p => {
            if (p.item.id === id) {
                const newQty = Math.max(0, p.qty + delta);
                return { ...p, qty: newQty };
            }
            return p;
        }).filter(p => p.qty > 0));
    };

    const subTotal = cart.reduce((acc, c) => acc + (c.item.sellingPrice * c.qty), 0);
    const tax = cart.reduce((acc, c) => {
        if (!c.item.taxIncluded) {
            return acc + ((c.item.sellingPrice * c.item.gstRate / 100) * c.qty);
        }
        return acc;
    }, 0);
    const total = subTotal + tax;

    const handleCheckout = () => {
        if (!company) return;
        if (cart.length === 0) return toast.error('Cart is empty!');

        const invNum = nextInvoiceNumber(company.id, company.invoicePrefix);
        const newId = Math.random().toString(36).slice(2) + Date.now().toString(36);

        addInvoice({
            id: newId,
            companyId: company.id,
            invoiceType: 'sale',
            invoiceNumber: invNum,
            date: new Date().toISOString().split('T')[0],
            items: cart.map(c => {
                const tr = c.item.gstRate as number;
                const ta = c.item.taxIncluded ? c.item.sellingPrice / (1 + (tr / 100)) : c.item.sellingPrice;
                const amt = c.item.taxIncluded ? c.item.sellingPrice : ta * (1 + (tr / 100));
                return {
                    productId: c.item.id, name: c.item.name, qty: c.qty, unit: c.item.unit,
                    rate: c.item.sellingPrice,
                    discount: 0, discountAmt: 0,
                    taxableAmt: ta * c.qty,
                    gstRate: tr as any,
                    cgst: (tr / 2), sgst: (tr / 2), igst: 0, cess: 0, totalGst: (amt - ta) * c.qty,
                    amount: amt * c.qty,
                    hsnCode: c.item.hsnCode
                }
            }),
            subTotal: subTotal,
            totalDiscount: 0,
            taxableAmount: subTotal,
            totalCgst: tax / 2, totalSgst: tax / 2, totalIgst: 0, totalCess: 0, totalGst: tax,
            shippingCharges: 0, packingCharges: 0, adjustmentAmount: 0, roundOff: 0,
            grandTotal: total,
            paymentStatus: 'paid',
            amountPaid: total,
            balanceDue: 0,
            payments: [{ method: 'cash', amount: total, date: new Date().toISOString().split('T')[0] }],
            paymentMethod: 'cash',
            partyName: orderType === 'Dining' ? `Dining - ${tableNumber}` : 'Takeaway',
            counter: `${orderType} - ${tableNumber}`,
            notes: `${orderType} Order`,
            isGstBill: true, isHidden: false, isPrivate: false,
            createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        });

        setCart([]);
        router.push(`/company/billing/invoice?id=${newId}&print=true`);
    };

    // Left Sidebar Navigation Items
    const NAV = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/company/dashboard', tab: null },
        { icon: UtensilsCrossed, label: 'Pos', href: '#', tab: 'Pos' },
        { icon: ClipboardList, label: 'Table', href: '#', tab: 'Table' },
        { icon: Users, label: 'Reservations', href: '#', tab: 'Reservations' },
        { icon: Truck, label: 'Delivery Executive', href: '#', tab: 'Delivery' },
        { icon: CreditCard, label: 'Payments', href: '#', tab: 'Payments' },
        { icon: User, label: 'Customer', href: '#', tab: 'Customer' },
        { icon: FileText, label: 'Invoice', href: '/company/billing', tab: null },
        { icon: BarChart3, label: 'Reports', href: '/company/analytics', tab: null },
        { icon: Settings, label: 'Setting', href: '#', tab: 'Setting' },
    ];

    return (
        <>
            <style>{`
                .pos-container { display: flex; height: 100vh; background: #F5F6F8; font-family: 'Inter', sans-serif; overflow: hidden; }
                .pos-sidebar { width: 260px; background: white; display: flex; flex-direction: column; border-right: 1px solid #E2E8F0; flex-shrink: 0; }
                .pos-main { flex: 1; display: flex; flex-direction: column; height: 100%; overflow: hidden; }
                .pos-topbar { height: 80px; background: white; border-bottom: 1px solid #E2E8F0; display: flex; align-items: center; justify-content: space-between; padding: 0 32px; flex-shrink: 0; }
                .pos-content-wrapper { flex: 1; display: flex; overflow: hidden; }
                .pos-grid-area { flex: 1; padding: 32px; overflow-y: auto; display: flex; flex-direction: column; }
                .pos-cart-panel { width: 380px; background: white; border-left: 1px solid #E2E8F0; display: flex; flex-direction: column; flex-shrink: 0; }
                .pos-search-wrapper { position: relative; width: 400px; }
                
                /* Tablet Styles */
                @media (max-width: 1024px) {
                    .pos-cart-panel { width: 320px; }
                }

                /* Mobile Styles */
                @media (max-width: 768px) {
                    .pos-container { flex-direction: column; overflow-y: auto; height: auto; min-height: 100vh; }
                    .pos-sidebar { display: none; }
                    .pos-topbar { padding: 0 16px; padding-top: 10px; padding-bottom: 10px; height: auto; flex-wrap: wrap; gap: 12px; }
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
                    {/* Logo Area */}
                    <div style={{ padding: '24px 24px 32px', display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 36, height: 36, background: '#FF7F50', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                            {company?.logoUrl ? <img src={company.logoUrl} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <UtensilsCrossed size={20} color="white" />}
                        </div>
                        <span style={{ fontSize: 20, fontWeight: 800, color: '#2D3748', letterSpacing: '-0.5px' }}>{company?.name || 'Restaurant'}</span>
                    </div>

                    {/* Navigation Links */}
                    <nav style={{ flex: 1, padding: '0 16px', overflowY: 'auto' }} className="no-scrollbar">
                        {NAV.map((nav, i) => {
                            const isNavActive = nav.tab ? activeTab === nav.tab : false;
                            return (
                                nav.tab ? (
                                    <button key={i} onClick={() => setActiveTab(nav.tab)} style={{
                                        display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', width: '100%', border: 'none', cursor: 'pointer',
                                        borderRadius: 12, marginBottom: 4, textDecoration: 'none',
                                        background: isNavActive ? '#FFF5F2' : 'transparent',
                                        color: isNavActive ? '#FF7F50' : '#4A5568',
                                        transition: 'all 0.2s', fontWeight: isNavActive ? 700 : 500
                                    }}>
                                        <nav.icon size={18} color={isNavActive ? '#FF7F50' : '#A0AEC0'} />
                                        <span style={{ fontSize: 14 }}>{nav.label}</span>
                                    </button>
                                ) : (
                                    <Link key={i} href={nav.href} style={{
                                        display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px',
                                        borderRadius: 12, marginBottom: 4, textDecoration: 'none',
                                        background: 'transparent', color: '#4A5568',
                                        transition: 'all 0.2s', fontWeight: 500
                                    }}>
                                        <nav.icon size={18} color={'#A0AEC0'} />
                                        <span style={{ fontSize: 14 }}>{nav.label}</span>
                                    </Link>
                                )
                            );
                        })}
                    </nav>

                    {/* Bottom Log out */}
                    <div style={{ padding: '24px' }}>
                        <Link href="/companies" style={{ display: 'flex', alignItems: 'center', gap: 14, color: '#718096', textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>
                            <LogOut size={18} /> Exit POS
                        </Link>
                    </div>
                </aside>

                {/* ── MAIN CONTENT ── */}
                <main className="pos-main">

                    {/* Top Navbar */}
                    <header className="pos-topbar">
                        <div className="pos-search-wrapper">
                            <Search size={16} color="#A0AEC0" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                placeholder="Search in products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ width: '100%', background: '#F8FAFC', padding: '12px 16px 12px 42px', borderRadius: 99, border: '1px solid #E2E8F0', outline: 'none', fontSize: 14, color: '#2D3748', fontWeight: 500 }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                            <button onClick={() => setFetchModal(true)} style={{ padding: '10px 16px', borderRadius: 99, background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#4A5568', fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Search size={14} /> Scan Bill
                            </button>
                            <button style={{ width: 40, height: 40, borderRadius: 99, background: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                <Bell size={18} color="#4A5568" />
                            </button>
                        </div>
                    </header>

                    {/* Content Area */}
                    <div className="pos-content-wrapper">

                        {/* Items Grid (Left Side of Main) */}
                        <div className="pos-grid-area no-scrollbar">

                            {/* Headers */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                                <div>
                                    <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1A202C', margin: '0 0 4px 0' }}>{activeTab === 'Pos' ? 'Point of Sale (POS)' : activeTab}</h2>
                                    <p style={{ fontSize: 13, color: '#718096', margin: 0 }}>Dashboard • {activeTab}</p>
                                </div>
                                {activeTab === 'Pos' && (
                                    <div style={{ display: 'flex', gap: 12 }}>
                                        <button onClick={() => setShowAdd(true)} className="btn" style={{ background: 'white', color: '#1A202C', padding: '10px 20px', borderRadius: 8, border: '1px solid #E2E8F0', fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                            <Plus size={16} /> Add Item
                                        </button>
                                        <button onClick={() => setCart([])} className="btn" style={{ background: '#FF7F50', color: 'white', padding: '10px 20px', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                            <Plus size={16} /> New Order
                                        </button>
                                    </div>
                                )}
                            </div>

                            {activeTab === 'Pos' ? (
                                <>
                                    {/* Filters Category Ribbon */}
                                    <div style={{ display: 'flex', gap: 12, marginBottom: 32, overflowX: 'auto', paddingBottom: 8, minHeight: 46 }} className="no-scrollbar">
                                        {categories.map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => setActiveCat(cat)}
                                                style={{
                                                    padding: '8px 20px', borderRadius: 99, fontWeight: 700, fontSize: 13, cursor: 'pointer', flexShrink: 0,
                                                    border: 'none', transition: 'all 0.2s',
                                                    background: activeCat === cat ? '#FF7F50' : 'white',
                                                    color: activeCat === cat ? 'white' : '#718096',
                                                    boxShadow: activeCat === cat ? '0 4px 12px rgba(255,127,80,0.3)' : '0 2px 4px rgba(0,0,0,0.02)'
                                                }}
                                            >
                                                {cat === 'All' ? 'Show All' : cat}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Items Grid */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
                                        {filteredItems.length === 0 ? (
                                            <div style={{ padding: 40, textAlign: 'center', gridColumn: '1/-1', color: '#A0AEC0' }}>No products found. Add products in the inventory with optional Image URLs!</div>
                                        ) : filteredItems.map(item => (
                                            <div key={item.id} onClick={() => addToCart(item)} style={{ background: 'white', borderRadius: 16, padding: '16px', border: '1px solid #E2E8F0', cursor: 'pointer', transition: 'transform 0.1s, box-shadow 0.1s', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                                                <button onClick={async (e) => {
                                                    e.stopPropagation();
                                                    const yes = await confirm({ message: `Delete ${item.name}?`, danger: true });
                                                    if (yes) {
                                                        deleteProduct(item.id);
                                                        setCart(prev => prev.filter(c => c.item.id !== item.id));
                                                        toast.success('Item deleted');
                                                    }
                                                }} style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: 8, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EA4335', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 10 }}>
                                                    <Trash2 size={14} />
                                                </button>
                                                <div style={{ width: '100%', aspectRatio: '1/1', borderRadius: 12, background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, marginBottom: 16, overflow: 'hidden', border: '1px solid #E1E4E8', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)' }}>
                                                    {item.imageUrl ? <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (item.name[0]?.toUpperCase() || '🥘')}
                                                </div>
                                                <p style={{ fontSize: 14, fontWeight: 700, color: '#2D3748', textAlign: 'center', marginBottom: 4 }}>{item.name}</p>
                                                <p style={{ fontSize: 15, fontWeight: 800, color: '#FF7F50' }}>₹{item.sellingPrice.toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : activeTab === 'Table' ? (
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#A0AEC0', border: '2px dashed #E2E8F0', borderRadius: 20 }}>
                                    <ClipboardList size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
                                    <h3>Table Management</h3>
                                    <p>Interactive table maps and ordering coming soon.</p>
                                </div>
                            ) : activeTab === 'Reservations' ? (
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#A0AEC0', border: '2px dashed #E2E8F0', borderRadius: 20 }}>
                                    <Users size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
                                    <h3>Reservations & Walk-Ins</h3>
                                    <p>Manage upcoming bookings and waitlists.</p>
                                </div>
                            ) : activeTab === 'Delivery' ? (
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#A0AEC0', border: '2px dashed #E2E8F0', borderRadius: 20 }}>
                                    <Truck size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
                                    <h3>Delivery Executives</h3>
                                    <p>Assign orders to Swiggy/Zomato or internal drivers.</p>
                                </div>
                            ) : activeTab === 'Payments' ? (
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#A0AEC0', border: '2px dashed #E2E8F0', borderRadius: 20 }}>
                                    <CreditCard size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
                                    <h3>Digital Payments</h3>
                                    <div style={{ width: 200, height: 200, background: '#E2E8F0', borderRadius: 24, marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ fontWeight: 800, color: '#4A5568' }}>STORE QR</span>
                                    </div>
                                    <p style={{ marginTop: 16 }}>Scan to Pay directly to the account</p>
                                </div>
                            ) : (
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#A0AEC0', border: '2px dashed #E2E8F0', borderRadius: 20 }}>
                                    <h3>{activeTab} Module</h3>
                                    <p>This module is currently under development.</p>
                                </div>
                            )}
                        </div>

                        {/* ── RIGHT CART PANEL ── */}
                        <div className="pos-cart-panel">

                            {/* Cart Header Tabs */}
                            <div style={{ display: 'flex', padding: '16px 24px', borderBottom: '1px solid #E2E8F0', gap: 12 }}>
                                <select value={orderType} onChange={e => setOrderType(e.target.value)} style={{ flex: 1, padding: '10px', background: '#F8FAFC', borderRadius: 8, color: '#2D3748', fontSize: 13, fontWeight: 700, border: '1px solid #E2E8F0', outline: 'none', cursor: 'pointer' }}>
                                    <option value="Dining">Dining</option>
                                    <option value="Takeaway">Takeaway</option>
                                </select>
                                {orderType === 'Dining' && (
                                    <select value={tableNumber} onChange={e => setTableNumber(e.target.value)} style={{ flex: 1, padding: '10px', background: '#F8FAFC', borderRadius: 8, color: '#2D3748', fontSize: 13, fontWeight: 700, border: '1px solid #E2E8F0', outline: 'none', cursor: 'pointer' }}>
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => <option key={n} value={`Table ${n}`}>Table {n}</option>)}
                                    </select>
                                )}
                            </div>

                            {/* Order Title */}
                            <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1A202C', margin: 0 }}>Current Order</h3>
                                <button style={{ background: 'none', border: 'none', color: '#FF7F50', fontWeight: 700, fontSize: 13, cursor: 'pointer' }} onClick={() => setCart([])}>Clear</button>
                            </div>

                            {/* Cart Items List */}
                            <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px' }} className="no-scrollbar">
                                {cart.length === 0 ? (
                                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#A0AEC0' }}>
                                        <UtensilsCrossed size={48} style={{ opacity: 0.2, marginBottom: 16 }} />
                                        <p style={{ fontWeight: 600, fontSize: 14 }}>Cart is empty</p>
                                        <p style={{ fontSize: 12, marginTop: 4 }}>Add items from the menu</p>
                                    </div>
                                ) : (
                                    cart.map((c) => (
                                        <div key={c.item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px dashed #E2E8F0' }}>
                                            <div style={{ flex: 1 }}>
                                                <p style={{ fontSize: 14, fontWeight: 700, color: '#2D3748', margin: '0 0 6px 0' }}>{c.item.name}</p>
                                                <p style={{ fontSize: 13, fontWeight: 600, color: '#FF7F50', margin: 0 }}>₹{c.item.sellingPrice.toFixed(2)}</p>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                <button onClick={() => updateQty(c.item.id, -1)} style={{ width: 28, height: 28, borderRadius: 8, border: '1px solid #E2E8F0', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                                    <Minus size={14} color="#718096" />
                                                </button>
                                                <span style={{ fontSize: 14, fontWeight: 800, color: '#2D3748', minWidth: 20, textAlign: 'center' }}>{c.qty}</span>
                                                <button onClick={() => updateQty(c.item.id, 1)} style={{ width: 28, height: 28, borderRadius: 8, border: '1px solid #E2E8F0', background: '#FF7F50', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                                    <Plus size={14} color="white" />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Cart Summary */}
                            <div style={{ padding: '24px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0', marginTop: 'auto' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                                    <span style={{ fontSize: 13, color: '#718096', fontWeight: 600 }}>Sub total :</span>
                                    <span style={{ fontSize: 14, color: '#2D3748', fontWeight: 800 }}>₹{subTotal.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                                    <span style={{ fontSize: 13, color: '#718096', fontWeight: 600 }}>Tax / GST :</span>
                                    <span style={{ fontSize: 14, color: '#2D3748', fontWeight: 800 }}>₹{tax.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                                    <span style={{ fontSize: 13, color: '#718096', fontWeight: 600 }}>Extra Discount :</span>
                                    <span style={{ fontSize: 14, color: '#38A169', fontWeight: 800 }}>- ₹0.00</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0', paddingTop: 16, borderTop: '2px dashed #E2E8F0' }}>
                                    <span style={{ fontSize: 18, color: '#1A202C', fontWeight: 900 }}>Total :</span>
                                    <span style={{ fontSize: 22, color: '#FF7F50', fontWeight: 900 }}>₹{total.toFixed(2)}</span>
                                </div>

                                {/* Buttons */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    <button style={{ padding: '16px', background: '#1A202C', color: 'white', borderRadius: 12, border: 'none', fontWeight: 800, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                        <Printer size={16} /> KOT SCAN
                                    </button>
                                    <button onClick={handleCheckout} style={{ padding: '16px', background: '#FF7F50', color: 'white', borderRadius: 12, border: 'none', fontWeight: 800, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                        <CheckCircle size={16} /> BILL & PAY
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </main>
            </div>

            {
                showAdd && (
                    <div className="modal-overlay" onClick={() => setShowAdd(false)}>
                        <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 500 }}>
                            <div style={{ padding: '18px 24px 14px', borderBottom: '1px solid #E1E4E8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <h3 style={{ fontWeight: 900, fontSize: 17, color: '#1A1A2E' }}>Add New Item</h3>
                                <button onClick={() => setShowAdd(false)} className="btn btn-ghost btn-icon"><X size={18} /></button>
                            </div>
                            <div style={{ padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Item Name *</label>
                                    <input className="e-input" placeholder="e.g. Farmhouse Pizza" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</label>
                                        <input className="e-input" placeholder="e.g. Pizza" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Price ₹ *</label>
                                        <input type="number" className="e-input" placeholder="0.00" value={form.sellingPrice} onChange={e => setForm(f => ({ ...f, sellingPrice: e.target.value }))} />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Item Image</label>
                                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                        {form.imageUrl && <img src={form.imageUrl} style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }} />}
                                        <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} id="pos-img-upload" />
                                        <label htmlFor="pos-img-upload" className="btn btn-outline btn-sm" style={{ cursor: 'pointer', flexShrink: 0 }}>Choose File</label>
                                        <input className="e-input" placeholder="Or paste image URL" value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} style={{ flex: 1 }} />
                                    </div>
                                </div>
                            </div>
                            <div style={{ padding: '14px 24px', borderTop: '1px solid #E1E4E8', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                                <button onClick={() => setShowAdd(false)} className="btn btn-outline">Cancel</button>
                                <button onClick={handleSaveProduct} className="btn btn-blue">Save Item</button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Fecth Bill Modal */}
            {
                fetchModal && (
                    <div className="modal-overlay" onClick={() => setFetchModal(false)}>
                        <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 440 }}>
                            <div style={{ padding: '18px 24px 14px', borderBottom: '1px solid #E1E4E8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <h3 style={{ fontWeight: 900, fontSize: 17, color: '#1A1A2E' }}>Scan / Fetch Bill</h3>
                                <button onClick={() => setFetchModal(false)} className="btn btn-ghost btn-icon"><X size={18} /></button>
                            </div>
                            <div style={{ padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                                <input autoFocus value={fetchQuery} onChange={e => setFetchQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleFetchBill()} placeholder="Scan Barcode or Enter Invoice Number" className="e-input" style={{ fontSize: 15, padding: 12, fontWeight: 700 }} />

                                {fetchedInv && (
                                    <div style={{ background: '#F7FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: 16, marginTop: 8 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                                            <span style={{ fontWeight: 800, color: '#2D3748' }}>{fetchedInv.invoiceNumber}</span>
                                            <span style={{ fontWeight: 800, color: '#4285F4' }}>₹{fetchedInv.grandTotal.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div style={{ height: 1, background: '#E2E8F0', margin: '12px 0' }} />
                                        <div style={{ maxHeight: 150, overflowY: 'auto' }}>
                                            {fetchedInv.items.map((it: any, j: number) => (
                                                <div key={j} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
                                                    <span style={{ color: '#4A5568' }}>{it.qty}x {it.name}</span>
                                                    <span style={{ fontWeight: 700, color: '#2D3748' }}>₹{it.amount.toFixed(2)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div style={{ padding: '14px 24px', borderTop: '1px solid #E1E4E8', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                                <button onClick={() => setFetchModal(false)} className="btn btn-outline">Close</button>
                                {!fetchedInv && <button onClick={handleFetchBill} className="btn btn-blue">Search</button>}
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}
