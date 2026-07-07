'use client';
import { useStore, useActiveCompany, useCompanyData } from '@/lib/store';
import { formatShort, formatDate } from '@/lib/utils';
import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Invoice, Product, Party, Expense, BalancePayment } from '@/lib/types';
import {
    Plus, TrendingUp, TrendingDown, Package, Users, AlertTriangle,
    ChevronRight, FileText, DollarSign, ArrowUpRight, ArrowDownRight,
    Warehouse, Zap, BarChart3, ShoppingCart, MessageCircle, Lightbulb,
    BookOpen, Search, Bell, UtensilsCrossed, Settings, LogOut, Minus, Crown,
    Trash2, CreditCard, ChevronLeft, Map, Clock, CheckCircle2, Navigation,
    PlusCircle, Info, Star, Heart, MapPin, Layers, RefreshCw, Compass, Edit2
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Legend, Cell
} from 'recharts';
import { SkeletonDashboard } from '@/components/Skeleton';
import toast from 'react-hot-toast';

// ============================================================================
// 1. FOODDESK DASHBOARD & PORTAL (FOR RESTAURANT & BAKERY)
// ============================================================================
function RestaurantBakeryDashboard({ company }: { company: any }) {
    const isBakery = company.type === 'Bakery';
    
    // Strawberry Pink Theme for Bakery vs Orange Theme for Restaurant
    const primaryColor = isBakery ? '#DB2777' : '#FF7F50';
    const primaryHoverColor = isBakery ? '#BE185D' : '#E05A2B';
    const secondaryBg = isBakery ? '#FDF2F8' : '#FFF5F2';
    const accentBorder = isBakery ? 'rgba(219,39,119,0.3)' : 'rgba(255,127,80,0.3)';
    const bannerBg = isBakery 
        ? 'linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)' 
        : 'linear-gradient(135deg, #FFF5F2 0%, #FFE4E1 100%)';
        
    const bannerTitle = isBakery ? 'Premium Fresh Bakes' : 'Special Delicious Burger';
    const bannerSub = isBakery ? 'Handcrafted daily with organic love & fresh berries' : 'Double cheese, fresh lettuce, and our secret recipe sauce';
    const bannerOffer = isBakery ? 'Buy 2 Get 1 Free on all cupcakes!' : 'Grab 15% Off today!';
    const bannerIcon = isBakery ? '🧁' : '🍔';

    const products = useCompanyData('products') as Product[];
    const invoices = useCompanyData('invoices') as Invoice[];
    const expenses = useCompanyData('expenses') as Expense[];
    const parties = useCompanyData('parties') as Party[] || [];
    const templates = useStore(state => state.templates) || [];
    const { 
        addInvoice, nextInvoiceNumber, addProduct, deleteProduct, updateProduct, 
        addExpense, deleteExpense, updateCompany, addParty, updateParty, deleteParty,
        addGodown, removeGodown, updateTemplate, exportBackup, importBackup, user,
        updateUser
    } = useStore();
    const router = useRouter();

    // Derived states from company for restaurant synchronization
    const tableCarts = company.tableCarts || {};
    const setTableCarts = (newCarts: any) => {
        const next = typeof newCarts === 'function' ? newCarts(tableCarts) : newCarts;
        updateCompany(company.id, { tableCarts: next });
    };

    const dirtyTables = company.dirtyTables || {};
    const setDirtyTables = (newDirty: any) => {
        const next = typeof newDirty === 'function' ? newDirty(dirtyTables) : newDirty;
        updateCompany(company.id, { dirtyTables: next });
    };

    const tableConfig = company.tableConfig || {};
    const setTableConfig = (newCfg: any) => {
        const next = typeof newCfg === 'function' ? newCfg(tableConfig) : newCfg;
        updateCompany(company.id, { tableConfig: next });
    };

    const customAreas = company.customAreas || [];
    const setCustomAreas = (newAreas: any) => {
        const next = typeof newAreas === 'function' ? newAreas(customAreas) : newAreas;
        updateCompany(company.id, { customAreas: next });
    };

    const kitchenOrders = company.kitchenOrders || [];
    const setKitchenOrders = (newOrders: any) => {
        const next = typeof newOrders === 'function' ? newOrders(kitchenOrders) : newOrders;
        updateCompany(company.id, { kitchenOrders: next });
    };

    const deals = company.deals || [];
    const setDeals = (newDeals: any) => {
        const next = typeof newDeals === 'function' ? newDeals(deals) : newDeals;
        updateCompany(company.id, { deals: next });
    };

    const deliveryIntegrations = company.deliveryIntegrations || [
        { platform: 'Zomato', apiKey: '', restaurantId: '', enabled: false, color: '#CB202D', icon: '🍽️' },
        { platform: 'Swiggy', apiKey: '', restaurantId: '', enabled: false, color: '#FC8019', icon: '🛵' },
        { platform: 'Dunzo', apiKey: '', restaurantId: '', enabled: false, color: '#00C9A7', icon: '📦' },
        { platform: 'Direct', apiKey: '', restaurantId: '', enabled: true, color: '#3B82F6', icon: '📱' },
    ];
    const setDeliveryIntegrations = (newInts: any) => {
        const next = typeof newInts === 'function' ? newInts(deliveryIntegrations) : newInts;
        updateCompany(company.id, { deliveryIntegrations: next });
    };

    const recentZReports = company.recentZReports || [];
    const setRecentZReports = (newReports: any) => {
        const next = typeof newReports === 'function' ? newReports(recentZReports) : newReports;
        updateCompany(company.id, { recentZReports: next });
    };

    const appOrders = company.appOrders || [];
    const setAppOrders = (newOrders: any) => {
        const next = typeof newOrders === 'function' ? newOrders(appOrders) : newOrders;
        updateCompany(company.id, { appOrders: next });
    };

    const bulkOrders = company.bulkOrders || [];
    const setBulkOrders = (newOrders: any) => {
        const next = typeof newOrders === 'function' ? newOrders(bulkOrders) : newOrders;
        updateCompany(company.id, { bulkOrders: next });
    };

    const registerOpen = company.registerOpen || false;
    const setRegisterOpen = (val: boolean) => updateCompany(company.id, { registerOpen: val });

    const openingFloat = company.openingFloat || 0;
    const setOpeningFloat = (val: number) => updateCompany(company.id, { openingFloat: val });

    const openingTime = company.openingTime || '';
    const setOpeningTime = (val: string) => updateCompany(company.id, { openingTime: val });

    // Internal navigation state
    const [activeView, setActiveView] = useState<'dashboard' | 'inventory' | 'billing' | 'expenses' | 'reports' | 'settings' | 'app-orders' | 'bulk-orders' | 'parties' | 'invoice-template' | 'kitchen' | 'deals'>('dashboard');

    useEffect(() => {
        if (company?.id) {
            const saved = localStorage.getItem(`edibio_dashboard_active_view_${company.id}`);
            if (saved) {
                const validViews = ['dashboard', 'inventory', 'billing', 'expenses', 'reports', 'settings', 'app-orders', 'bulk-orders', 'parties', 'invoice-template', 'kitchen', 'deals'];
                if (validViews.includes(saved)) {
                    setActiveView(saved as any);
                }
            }
        }
    }, [company?.id]);

    useEffect(() => {
        if (company?.id) {
            localStorage.setItem(`edibio_dashboard_active_view_${company.id}`, activeView);
        }
    }, [activeView, company?.id]);

    // Theme color mapping: Red, Blue, Green, Yellow for different page sections
    const viewThemeColor = 
        ['dashboard', 'app-orders', 'expenses'].includes(activeView) ? '#EF4444' :
        ['inventory', 'invoice-template', 'settings'].includes(activeView) ? '#3B82F6' :
        ['billing', 'reports'].includes(activeView) ? '#22C55E' :
        ['parties', 'bulk-orders'].includes(activeView) ? '#F59E0B' :
        ['kitchen'].includes(activeView) ? '#8B5CF6' :
        ['deals'].includes(activeView) ? '#EC4899' :
        primaryColor;

    const viewThemeSecondaryBg = 
        ['dashboard', 'app-orders', 'expenses'].includes(activeView) ? '#FEF2F2' :
        ['inventory', 'invoice-template', 'settings'].includes(activeView) ? '#EFF6FF' :
        ['billing', 'reports'].includes(activeView) ? '#F0FDF4' :
        ['parties', 'bulk-orders'].includes(activeView) ? '#FEF3C7' :
        ['kitchen'].includes(activeView) ? '#F5F3FF' :
        ['deals'].includes(activeView) ? '#FDF2F8' :
        secondaryBg;

    // Collapsible sidebars & custom form states
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [cartCollapsed, setCartCollapsed] = useState(false);
    const [showNewCatInput, setShowNewCatInput] = useState(false);
    const [newCatName, setNewCatName] = useState('');

    // Search and filters
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCat, setSelectedCat] = useState('All');
    
    // Cart / POS state
    const [cart, setCart] = useState<{ item: Product; qty: number }[]>([]);
    const [orderType, setOrderType] = useState('Dining');
    const [tableNumber, setTableNumber] = useState('Indoor - Table 1');
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'upi' | 'card' | 'credit'>('cash');
    const [customerAddress, setCustomerAddress] = useState('Elm Street, 23');
    const [notesText, setNotesText] = useState('');
    const [selectedParty, setSelectedParty] = useState<Party | null>(null);

    // Modal forms
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [newProductForm, setNewProductForm] = useState({ name: '', category: '', price: '', imageUrl: '', barcode: '', hsnCode: '', expiryDate: '' });

    // Active receipt viewer modal
    const [viewingReceipt, setViewingReceipt] = useState<Invoice | null>(null);

    // Expense Form State
    const [expenseForm, setExpenseForm] = useState({ category: 'Food Stock', description: '', amount: '', paymentMethod: 'cash' });

    // Settings Sub-Tab State
    const [settingsTab, setSettingsTab] = useState('Business Profile');
    const [settingsForm, setSettingsForm] = useState({
        name: company.name || '',
        phone: company.phone || '',
        email: company.email || '',
        address: company.address || '',
        city: company.city || '',
        state: company.state || '',
        pincode: company.pincode || '',
        licenseNo: company.licenseNo || '',
        panNumber: company.panNumber || '',
        gstNumber: company.gstNumber || '',
        invoicePrefix: company.invoicePrefix || 'INV',
        kitchenDisplayEnabled: company.kitchenDisplayEnabled !== false
    });

    const [bankForm, setBankForm] = useState({
        bankName: company.bankDetails?.bankName || '',
        accountName: company.bankDetails?.accountName || '',
        accountNumber: company.bankDetails?.accountNumber || '',
        ifsc: company.bankDetails?.ifsc || '',
        upiId: company.bankDetails?.upiId || '',
        qrCodeUrl: company.bankDetails?.qrCodeUrl || ''
    });


    const [userForm, setUserForm] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        photoUrl: user?.photoUrl || ''
    });

    useEffect(() => {
        if (user) {
            setUserForm({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                photoUrl: user.photoUrl || ''
            });
        }
    }, [user]);


    const handleSaveUserProfile = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser(userForm);
        toast.success('Personal profile details updated!');
    };

    const [loyaltyForm, setLoyaltyForm] = useState({
        loyaltyPointsEnabled: company.loyaltyPointsEnabled || false,
        loyaltyEarningRatio: company.loyaltyEarningRatio || 1,
        loyaltyRedemptionValue: company.loyaltyRedemptionValue || 1,
        loyaltyMinRedeemPoints: company.loyaltyMinRedeemPoints || 10
    });

    // Dynamic Category Creation States
    const [customCategories, setCustomCategories] = useState<string[]>([]);    
    const [activeArea, setActiveArea] = useState<string>('');
    const [selectedTable, setSelectedTable] = useState<string | null>(null);
    const [showTableConfigModal, setShowTableConfigModal] = useState(false);
    const [actionTable, setActionTable] = useState<{ tableNum: string; area: string } | null>(null);

    // Sync activeArea to first available customArea if empty or invalid
    useEffect(() => {
        if (customAreas.length > 0 && (!activeArea || !customAreas.includes(activeArea))) {
            setActiveArea(customAreas[0]);
        } else if (customAreas.length === 0 && activeArea !== '') {
            setActiveArea('');
        }
    }, [customAreas, activeArea]);

    // Force views based on role logins
    useEffect(() => {
        if (user?.role === 'chef_atelier') {
            setActiveView('kitchen');
        } else if (user?.role === 'server') {
            setActiveView('dashboard');
        }
    }, [user?.role]);


    const [isMuted, setIsMuted] = useState(false);
    const newCount = kitchenOrders.filter((o: any) => o.status === 'new').length;
    const [lastNewCount, setLastNewCount] = useState(newCount);
    useEffect(() => {
        if (newCount > lastNewCount) {
            if (!isMuted) {
                playBeep();
            }
        }
        setLastNewCount(newCount);
    }, [newCount, lastNewCount, isMuted]);

    const [timeTicker, setTimeTicker] = useState(Date.now());
    useEffect(() => {
        const interval = setInterval(() => setTimeTicker(Date.now()), 10000);
        return () => clearInterval(interval);
    }, []);

    const getSafeElapsedMins = (orderedAt: any) => {
        if (!orderedAt) return 0;
        const t = new Date(orderedAt).getTime();
        if (isNaN(t)) return 0;
        const diff = timeTicker - t;
        return Math.max(0, Math.floor(diff / 60000));
    };

    const getSafeTimeString = (orderedAt: any) => {
        if (!orderedAt) return 'N/A';
        const d = new Date(orderedAt);
        if (isNaN(d.getTime())) return 'N/A';
        return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    };

    // Swiggy/Zomato live webhook orders polling
    useEffect(() => {
        if (!company?.id || activeView !== 'app-orders') return;

        const poll = async () => {
            try {
                const res = await fetch(`/api/webhooks/delivery?companyId=${company.id}`);
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data.appOrders)) {
                        // Check if we have new orders compared to our local state
                        const localIds = new Set(appOrders.map((o: any) => o.id));
                        let hasNew = false;
                        let lastChannel = '';
                        let lastCustomer = '';

                        data.appOrders.forEach((o: any) => {
                            if (!localIds.has(o.id) && o.status === 'pending') {
                                hasNew = true;
                                lastChannel = o.channel;
                                lastCustomer = o.customer;
                            }
                        });

                        if (hasNew) {
                            toast.success(`New order received from ${lastChannel} for ${lastCustomer}!`);
                            playBeep();
                            addNotification(`🛵 New ${lastChannel} order from ${lastCustomer}`, 'order');
                        }

                        // Sync to database if different
                        if (JSON.stringify(data.appOrders) !== JSON.stringify(appOrders)) {
                            setAppOrders(data.appOrders);
                        }
                    }
                }
            } catch (err) {
                console.error('Failed to poll delivery webhook orders:', err);
            }
        };

        poll();
        const interval = setInterval(poll, 7000);
        return () => clearInterval(interval);
    }, [company?.id, activeView, appOrders]);

    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    // Dynamic tax/service charge states
    const [serviceCharge, setServiceCharge] = useState(10);
    const [gstRate, setGstRate] = useState(5);

    useEffect(() => {
        try {
            const s = localStorage.getItem('restaurant_settings');
            if (s) {
                const parsed = JSON.parse(s);
                if (parsed.serviceCharge !== undefined) setServiceCharge(parsed.serviceCharge);
                if (parsed.defaultGstRate !== undefined) setGstRate(parsed.defaultGstRate);
            }
        } catch {}
    }, []);

    // Interactive profile modal states
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [profileForm, setProfileForm] = useState({
        companyName: company.name,
        companyAddress: company.address || '',
        companyPhone: company.phone || '',
        avatar: company.imageUrl || '👨‍🍳',
        userName: user?.name || '',
        serviceCharge: 10,
        gstRate: 5
    });

    useEffect(() => {
        if (showProfileModal) {
            const settings = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('restaurant_settings') || '{}') : {};
            setProfileForm({
                companyName: company.name,
                companyAddress: company.address || '',
                companyPhone: company.phone || '',
                avatar: company.imageUrl || '👨‍🍳',
                userName: user?.name || '',
                serviceCharge: settings.serviceCharge !== undefined ? settings.serviceCharge : 10,
                gstRate: settings.defaultGstRate !== undefined ? settings.defaultGstRate : 5
            });
        }
    }, [showProfileModal, company, user]);

    // Menu Inventory Bulk Selection
    const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);


    // Meal Time Menu Filter (Breakfast/Lunch/Dinner)
    const [mealTimeFilter, setMealTimeFilter] = useState<'All' | 'Breakfast' | 'Lunch' | 'Dinner'>(() => {
        const hour = new Date().getHours();
        if (hour < 11) return 'Breakfast';
        if (hour < 16) return 'Lunch';
        return 'Dinner';
    });

    // Notification System
    const [notifications, setNotifications] = useState<{ id: string; message: string; type: 'order' | 'billing' | 'info'; time: string; read: boolean }[]>([]);
    const [showNotifPanel, setShowNotifPanel] = useState(false);
    const addNotification = (message: string, type: 'order' | 'billing' | 'info') => {
        const notif = { id: Math.random().toString(36).slice(2), message, type, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }), read: false };
        setNotifications(prev => [notif, ...prev].slice(0, 50));
        playBeep();
    };
    const unreadCount = notifications.filter(n => !n.read).length;

    const [showPlaceOrderModal, setShowPlaceOrderModal] = useState(false); // Server places order modal
    const [showAddDealModal, setShowAddDealModal] = useState(false);
    const [dealForm, setDealForm] = useState({ name: '', description: '', dealPrice: '', emoji: '🎁', type: 'combo' as 'combo' | 'offer' | 'special', validFor: 'All' as 'All' | 'Breakfast' | 'Lunch' | 'Dinner', startDate: '', endDate: '', isPromo: true });
    const [showDeliverySettings, setShowDeliverySettings] = useState(false);

    const [cashDrawerFloatInput, setCashDrawerFloatInput] = useState('100.00');
    const [countedCashInput, setCountedCashInput] = useState('');
    const [showCloseShiftModal, setShowCloseShiftModal] = useState(false);

    // Customer Repayments & Ledger
    const [billingTab, setBillingTab] = useState<'invoices' | 'customers' | 'daily'>('invoices');
    const [selectedCustomerLedger, setSelectedCustomerLedger] = useState<Party | null>(null);
    const [repaymentAmount, setRepaymentAmount] = useState('');
    const [repaymentMethod, setRepaymentMethod] = useState<'cash' | 'upi' | 'bank'>('cash');
    const [repaymentNote, setRepaymentNote] = useState('');

    // Inline POS Checkout Editors (Replacing browser prompts)
    const [isEditingTable, setIsEditingTable] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [isEditingTakeaway, setIsEditingTakeaway] = useState(false);
    const [isEditingNote, setIsEditingNote] = useState(false);
    const [isSelectingParty, setIsSelectingParty] = useState(false);
    const [showQuickAddParty, setShowQuickAddParty] = useState(false);
    const [quickPartyName, setQuickPartyName] = useState('');
    const [quickPartyPhone, setQuickPartyPhone] = useState('');
    const [partySearchQuery, setPartySearchQuery] = useState('');
    const [showAddBulkModal, setShowAddBulkModal] = useState(false);
    const [bulkForm, setBulkForm] = useState({
        customerName: '',
        customerPhone: '',
        eventDate: '',
        guestCount: '',
        totalDeal: '',
        advancePaid: '',
        notes: ''
    });

    // Mobile UX toggles
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
    const [newCustomerForm, setNewCustomerForm] = useState({ name: '', phone: '', creditLimit: '50000', openingBalance: '0' });

    const [newGodownName, setNewGodownName] = useState('');
    const [newTeamForm, setNewTeamForm] = useState({ name: '', password: '', role: 'staff', counter: '' });

    // Seed default items if catalog is empty
    const handleSeedData = () => {
        const seedItems = isBakery ? [
            { name: 'Red Velvet Cake', category: 'Cakes', price: 499, emoji: '🍰' },
            { name: 'Butter Croissant', category: 'Pastries', price: 89, emoji: '🥐' },
            { name: 'Whole Wheat Bread', category: 'Bread', price: 65, emoji: '🍞' },
            { name: 'Choco Chip Cookies', category: 'Cookies', price: 150, emoji: '🍪' },
            { name: 'Caramel Macchiato', category: 'Coffee', price: 180, emoji: '☕' },
            { name: 'Blueberry Muffin', category: 'Cupcakes', price: 110, emoji: '🧁' }
        ] : [
            { name: 'Double Cheese Burger', category: 'Burgers', price: 149, emoji: '🍔' },
            { name: 'Pepperoni Pizza', category: 'Pizza', price: 349, emoji: '🍕' },
            { name: 'French Fries', category: 'Sides', price: 99, emoji: '🍟' },
            { name: 'Iced Lemon Tea', category: 'Drinks', price: 89, emoji: '🥤' },
            { name: 'Chocolate Brownie', category: 'Desserts', price: 129, emoji: '🍰' },
            { name: 'Crunchy Onion Rings', category: 'Sides', price: 119, emoji: '🧅' }
        ];

        seedItems.forEach(item => {
            addProduct({
                companyId: company.id,
                name: item.name,
                category: item.category,
                sellingPrice: item.price,
                purchasePrice: item.price * 0.4,
                stockQty: 999,
                lowStockAlertQty: 0,
                gstRate: 5 as any,
                taxIncluded: true,
                unit: 'pcs',
                imageUrl: item.emoji,
                cessRate: 0
            });
        });
        toast.success('Sample menu seeded successfully!');
    };

    // Audio Notification beep (synthesized via Web Audio API)
    const playBeep = () => {
        try {
            const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
            oscillator.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15); // A5
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.4);
        } catch (e) {}
    };

    // Sync current cart into active selected table state
    useEffect(() => {
        if (!selectedTable) return;
        const key = `${activeArea}-${selectedTable}`;
        const existing = tableCarts[key];
        const currentCartStr = JSON.stringify(cart);
        const existingCartStr = existing ? JSON.stringify(existing.cart) : '';
        
        if (cart.length > 0) {
            if (
                !existing ||
                existingCartStr !== currentCartStr ||
                existing.orderType !== orderType ||
                existing.customerId !== selectedParty?.id ||
                existing.notes !== notesText
            ) {
                updateCompany(company.id, {
                    tableCarts: {
                        ...tableCarts,
                        [key]: { cart, orderType, customerId: selectedParty?.id, notes: notesText }
                    }
                });
            }
        } else {
            if (existing) {
                const next = { ...tableCarts };
                delete next[key];
                updateCompany(company.id, { tableCarts: next });
            }
        }
    }, [cart, selectedTable, activeArea, orderType, selectedParty, notesText, company.id]);

    // Filtered categories
    const categories = useMemo(() => {
        const dbCats = Array.from(new Set(products.map(p => p.category).filter(Boolean)));
        const allCats = Array.from(new Set([...dbCats, ...customCategories]));
        return ['All', ...allCats] as string[];
    }, [products, customCategories]);

    // Filtered products list (supporting Name, Barcode and HSN searches)
    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const matchesCat = selectedCat === 'All' || p.category === selectedCat;
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (p.barcode && p.barcode.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (p.hsnCode && p.hsnCode.toLowerCase().includes(searchQuery.toLowerCase()));
            // Meal time filter — products can have optional mealTime field
            const productMealTime = (p as any).mealTime as string | undefined;
            const matchesMealTime = mealTimeFilter === 'All' || !productMealTime || productMealTime === mealTimeFilter;
            return matchesCat && matchesSearch && matchesMealTime;
        });
    }, [products, selectedCat, searchQuery, mealTimeFilter]);

    // Get all valid promo deals
    const promoDeals = useMemo(() => {
        if (!deals || deals.length === 0) return [];
        const today = new Date().toISOString().slice(0, 10);
        return deals.filter((d: any) => {
            if (d.isPromo === false) return false;
            const start = d.startDate;
            const end = d.endDate;
            if (start && today < start) return false;
            if (end && today > end) return false;
            return true;
        });
    }, [deals]);

    // Track active promo index
    const [promoIndex, setPromoIndex] = useState(0);

    // Rotate promo deals every 5 seconds
    useEffect(() => {
        if (promoDeals.length <= 1) return;
        const interval = setInterval(() => {
            setPromoIndex(prev => (prev + 1) % promoDeals.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [promoDeals.length]);

    // Ensure promoIndex is within bounds
    const activePromoIndex = promoDeals.length > 0 ? promoIndex % promoDeals.length : 0;
    const activeDeal = promoDeals.length > 0 ? promoDeals[activePromoIndex] : null;

    const activeBannerTitle = activeDeal ? activeDeal.name : bannerTitle;
    const activeBannerSub = activeDeal ? activeDeal.description : bannerSub;
    const activeBannerOffer = activeDeal ? `Special Price: ₹${activeDeal.dealPrice.toFixed(2)}!` : bannerOffer;
    const activeBannerIcon = activeDeal ? activeDeal.emoji : bannerIcon;

    // Today's total sales
    const todaySales = useMemo(() => {
        const todayStr = new Date().toISOString().slice(0, 10);
        return invoices
            .filter(inv => inv.date === todayStr && inv.invoiceType === 'sale')
            .reduce((sum, inv) => sum + inv.grandTotal, 0);
    }, [invoices]);

    // Add item to cart
    const addToCart = (item: Product) => {
        setCart(prev => {
            const ex = prev.find(p => p.item.id === item.id);
            if (ex) return prev.map(p => p.item.id === item.id ? { ...p, qty: p.qty + 1 } : p);
            return [...prev, { item, qty: 1 }];
        });
    };

    // Update cart quantity
    const updateQty = (id: string, delta: number) => {
        setCart(prev => prev.map(p => {
            if (p.item.id === id) {
                const newQty = Math.max(0, p.qty + delta);
                return { ...p, qty: newQty };
            }
            return p;
        }).filter(p => p.qty > 0));
    };

    // Total cost calculations
    const subTotal = cart.reduce((acc, c) => acc + (c.item.sellingPrice * c.qty), 0);
    const tax = subTotal * (gstRate / 100);
    const total = subTotal > 0 ? subTotal + tax + serviceCharge : 0;

    // Send new items to kitchen (KOT)
    const handleSendToKitchen = () => {
        if (!selectedTable) return toast.error('Please select a dining table first!');
        if (cart.length === 0) return toast.error('Cart is empty!');

        const key = `${activeArea}-${selectedTable}`;
        const existing = tableCarts[key];
        
        // Find newly added items that haven't been sent to kitchen yet
        const itemsToSend: { name: string; qty: number; notes?: string }[] = [];
        
        const updatedCart = cart.map(cartItem => {
            const existingItem = existing?.cart?.find((ex: any) => ex.item.id === cartItem.item.id);
            const sentQty = existingItem?.sentQty || 0;
            const unsentQty = cartItem.qty - sentQty;
            
            if (unsentQty > 0) {
                itemsToSend.push({
                    name: cartItem.item.name,
                    qty: unsentQty,
                    notes: notesText || undefined
                });
            }
            
            return {
                ...cartItem,
                sentQty: cartItem.qty // Mark all current quantity as sent
            };
        });

        if (itemsToSend.length === 0) {
            return toast.error('All items in the cart have already been sent to the kitchen!');
        }

        // Create KDS order
        const kdsOrder = {
            id: Math.random().toString(36).slice(2) + Date.now().toString(36),
            tableNum: selectedTable,
            area: activeArea,
            items: itemsToSend,
            status: 'new' as const,
            orderedAt: new Date().toISOString(),
            servedBy: user?.name || 'Server'
        };

        // Update kitchenOrders
        setKitchenOrders((prev: any) => [kdsOrder, ...prev].slice(0, 100));

        // Save table cart with updatedCart and sent items
        setTableCarts((prev: any) => ({
            ...prev,
            [key]: {
                cart: updatedCart,
                orderType,
                customerId: selectedParty?.id,
                notes: notesText,
                status: 'active'
            }
        }));

        toast.success('KOT sent to kitchen!');
        playBeep();
    };

    // Mark table order as completed (pending biller checkout)
    const handleCompleteTableOrder = () => {
        if (!selectedTable) return toast.error('Please select a dining table!');
        const key = `${activeArea}-${selectedTable}`;
        const existing = tableCarts[key];
        if (!existing || !existing.cart || existing.cart.length === 0) {
            return toast.error('Table has no active orders to complete!');
        }

        // Set status to completed
        setTableCarts((prev: any) => ({
            ...prev,
            [key]: {
                ...prev[key],
                status: 'completed'
            }
        }));

        // Clear local active cart state
        setCart([]);
        setSelectedTable(null);
        setSelectedParty(null);
        setNotesText('');
        toast.success(`Table ${selectedTable} marked as completed! Bill is pending at cash counter.`);
    };

    // Cart checkout
    const handleCheckout = () => {
        if (cart.length === 0) return toast.error('Cart is empty!');
        const invNum = nextInvoiceNumber(company.id, company.invoicePrefix || 'INV');
        const newId = Math.random().toString(36).slice(2) + Date.now().toString(36);

        if (paymentMethod === 'credit') {
            if (!selectedParty) return toast.error('Please select a customer to pay on credit/loan!');
            const remainingLimit = (selectedParty.creditLimit || 50000) - selectedParty.balance;
            if (total > remainingLimit) {
                return toast.error(`Credit limit exceeded! Customer's remaining credit is ₹${remainingLimit.toFixed(2)}`);
            }
        }

        const isCredit = paymentMethod === 'credit';
        const finalPaid = isCredit ? 0 : total;
        const finalDue = isCredit ? total : 0;

        addInvoice({
            id: newId,
            companyId: company.id,
            invoiceType: 'sale',
            invoiceNumber: invNum,
            date: new Date().toISOString().slice(0, 10),
            items: cart.map(c => {
                const gst = c.item.gstRate || 5;
                const baseRate = c.item.sellingPrice / (1 + gst / 100);
                return {
                    productId: c.item.id,
                    name: c.item.name,
                    qty: c.qty,
                    unit: c.item.unit || 'pcs',
                    rate: c.item.sellingPrice,
                    discount: 0,
                    discountAmt: 0,
                    taxableAmt: baseRate * c.qty,
                    gstRate: gst as any,
                    cgst: gst / 2,
                    sgst: gst / 2,
                    igst: 0,
                    cess: 0,
                    totalGst: (c.item.sellingPrice - baseRate) * c.qty,
                    amount: c.item.sellingPrice * c.qty
                };
            }),
            subTotal: subTotal,
            totalDiscount: 0,
            taxableAmount: subTotal - tax,
            totalCgst: tax / 2,
            totalSgst: tax / 2,
            totalIgst: 0,
            totalCess: 0,
            totalGst: tax,
            shippingCharges: 0,
            packingCharges: 0,
            adjustmentAmount: 0,
            roundOff: 0,
            grandTotal: total,
            paymentStatus: isCredit ? 'unpaid' : 'paid',
            amountPaid: finalPaid,
            balanceDue: finalDue,
            payments: isCredit ? [] : [{ method: paymentMethod as any, amount: total, date: new Date().toISOString().slice(0, 10) }],
            paymentMethod: paymentMethod as any,
            partyId: selectedParty?.id || undefined,
            partyName: selectedParty?.name || (orderType === 'Dining' ? `Dining - ${tableNumber}` : `Delivery - ${customerAddress}`),
            partyPhone: selectedParty?.phone || '',
            counter: `${orderType} - ${tableNumber}`,
            notes: notesText || `${orderType} Order via FoodDesk POS`,
            isGstBill: true,
            isHidden: false,
            isPrivate: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });

        // Update customer balance if paying on credit
        if (isCredit && selectedParty) {
            updateParty(selectedParty.id, {
                balance: selectedParty.balance + total
            });
        }

        // Clear active table cart and mark as dirty
        if (selectedTable) {
            const key = `${activeArea}-${selectedTable}`;
            setTableCarts((prev: any) => {
                const next = { ...prev };
                delete next[key];
                return next;
            });
            setDirtyTables((prev: any) => ({ ...prev, [key]: true }));
            setSelectedTable(null);
        }

        // Push to Kitchen Display System
        const kdsOrder = {
            id: newId,
            tableNum: selectedTable || 'T',
            area: activeArea,
            items: cart.map(c => ({ name: c.item.name, qty: c.qty, notes: notesText })),
            status: 'new' as const,
            orderedAt: new Date().toISOString(),
            servedBy: 'Cashier'
        };
        setKitchenOrders((prev: any) => [kdsOrder, ...prev].slice(0, 100));

        setCart([]);
        setSelectedParty(null);
        setNotesText('');
        toast.success('Order processed & sent to kitchen!');
        addNotification(`🧾 Bill #${invNum} of ₹${total.toFixed(2)} processed — ${orderType} ${orderType === 'Dining' ? `(Table ${tableNumber})` : ''}`, 'billing');
        
        // Open receipt modal automatically
        const newInv = useStore.getState().invoices.find(i => i.id === newId);
        if (newInv) setViewingReceipt(newInv);
    };

    // Save added menu item
    const handleSaveProduct = () => {
        if (!newProductForm.name || !newProductForm.price) return toast.error('Name and price are required');
        addProduct({
            companyId: company.id,
            name: newProductForm.name,
            category: newProductForm.category || 'Menu',
            sellingPrice: parseFloat(newProductForm.price) || 0,
            purchasePrice: (parseFloat(newProductForm.price) || 0) * 0.4,
            stockQty: 999,
            lowStockAlertQty: 0,
            gstRate: 5 as any,
            taxIncluded: true,
            unit: 'pcs',
            imageUrl: newProductForm.imageUrl || '🥘',
            barcode: newProductForm.barcode || '',
            hsnCode: newProductForm.hsnCode || '',
            cessRate: 0,
            expiryDate: newProductForm.expiryDate || ''
        });
        setShowAddItemModal(false);
        setNewProductForm({ name: '', category: '', price: '', imageUrl: '', barcode: '', hsnCode: '', expiryDate: '' });
        toast.success('Menu item added!');
    };

    // Save profile and shop settings
    const handleSaveProfile = () => {
        if (!profileForm.companyName) return toast.error('Shop name is required');
        
        // 1. Update company in store
        updateCompany(company.id, {
            name: profileForm.companyName,
            address: profileForm.companyAddress,
            phone: profileForm.companyPhone,
            logoUrl: profileForm.avatar
        });
        
        // 2. Save settings to localStorage
        const settings = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('restaurant_settings') || '{}') : {};
        const newSettings = {
            ...settings,
            serviceCharge: parseFloat(profileForm.serviceCharge as any) || 0,
            defaultGstRate: parseFloat(profileForm.gstRate as any) || 0
        };
        localStorage.setItem('restaurant_settings', JSON.stringify(newSettings));
        
        // 3. Update local state
        setServiceCharge(newSettings.serviceCharge);
        setGstRate(newSettings.defaultGstRate);
        
        // 4. Update user profile name if changed
        if (user && profileForm.userName && profileForm.userName !== user.name) {
            updateUser({ name: profileForm.userName });
        }
        
        setShowProfileModal(false);
        toast.success('Profile & Shop Settings updated!');
    };

    // Bulk delete menu items
    const handleBulkDelete = () => {
        if (selectedProductIds.length === 0) return;
        const yes = window.confirm(`Delete ${selectedProductIds.length} item(s)? This cannot be undone.`);
        if (yes) {
            selectedProductIds.forEach(id => deleteProduct(id));
            setSelectedProductIds([]);
            toast.success(`Successfully deleted ${selectedProductIds.length} dish(es)`);
        }
    };

    // Save edited menu item
    const handleUpdateProduct = () => {
        if (!editingProduct) return;
        updateProduct(editingProduct.id, {
            name: editingProduct.name,
            category: editingProduct.category,
            sellingPrice: editingProduct.sellingPrice,
            imageUrl: editingProduct.imageUrl,
            barcode: editingProduct.barcode,
            hsnCode: editingProduct.hsnCode,
            expiryDate: editingProduct.expiryDate || ''
        });
        setEditingProduct(null);
        toast.success('Menu item updated!');
    };

    // Add Expense
    const handleAddExpense = (e: React.FormEvent) => {
        e.preventDefault();
        if (!expenseForm.amount || !expenseForm.description) return toast.error('Description and amount required');
        addExpense({
            companyId: company.id,
            category: expenseForm.category,
            description: expenseForm.description,
            amount: parseFloat(expenseForm.amount) || 0,
            date: new Date().toISOString().slice(0, 10),
            paymentMethod: expenseForm.paymentMethod as any
        });
        setExpenseForm({ category: 'Food Stock', description: '', amount: '', paymentMethod: 'cash' });
        toast.success('Expense recorded!');
    };

    // Save Company Settings
    const handleSaveSettings = (e: React.FormEvent) => {
        e.preventDefault();
        updateCompany(company.id, settingsForm);
        toast.success('Settings updated!');
    };

    // Save Bank Details
    const handleSaveBankDetails = (e: React.FormEvent) => {
        e.preventDefault();
        updateCompany(company.id, { bankDetails: bankForm });
        toast.success('Bank & UPI details updated!');
    };

    // Save Loyalty & Credit Settings
    const handleSaveLoyaltySettings = (e: React.FormEvent) => {
        e.preventDefault();
        updateCompany(company.id, {
            loyaltyPointsEnabled: loyaltyForm.loyaltyPointsEnabled,
            loyaltyEarningRatio: loyaltyForm.loyaltyEarningRatio,
            loyaltyRedemptionValue: loyaltyForm.loyaltyRedemptionValue,
            loyaltyMinRedeemPoints: loyaltyForm.loyaltyMinRedeemPoints
        });
        toast.success('Loyalty & Credit parameters updated!');
    };

    // Open Register Shift
    const handleOpenShift = () => {
        const floatVal = parseFloat(cashDrawerFloatInput) || 0;
        const timeStr = new Date().toISOString();
        updateCompany(company.id, {
            registerOpen: true,
            openingFloat: floatVal,
            openingTime: timeStr
        });
        toast.success('Cash register opened! Shift started.');
    };

    // Close Register Shift and generate Z-Report
    const handleCloseShift = () => {
        const countedCash = parseFloat(countedCashInput) || 0;
        
        // Filter shift invoices
        const shiftInvoices = invoices.filter(inv => {
            return inv.invoiceType === 'sale' && inv.createdAt >= openingTime;
        });

        const cashSales = shiftInvoices
            .filter(inv => inv.paymentMethod === 'cash')
            .reduce((sum, inv) => sum + inv.grandTotal, 0);

        const cardSales = shiftInvoices
            .filter(inv => inv.paymentMethod === 'card')
            .reduce((sum, inv) => sum + inv.grandTotal, 0);

        const upiSales = shiftInvoices
            .filter(inv => inv.paymentMethod === 'upi')
            .reduce((sum, inv) => sum + inv.grandTotal, 0);

        const creditSales = shiftInvoices
            .filter(inv => inv.paymentMethod === 'credit')
            .reduce((sum, inv) => sum + inv.grandTotal, 0);

        const totalSales = cashSales + cardSales + upiSales + creditSales;
        const expectedCash = openingFloat + cashSales;
        const discrepancy = countedCash - expectedCash;

        const report = {
            id: Math.random().toString(36).slice(2) + Date.now().toString(36),
            openingTime,
            closingTime: new Date().toISOString(),
            openingFloat,
            cashSales,
            cardSales,
            upiSales,
            creditSales,
            totalSales,
            expectedCash,
            countedCash,
            discrepancy,
            biller: company.name
        };

        const updatedZ = [report, ...recentZReports].slice(0, 30);
        setRecentZReports(updatedZ);

        // Reset shift states
        updateCompany(company.id, {
            registerOpen: false,
            openingFloat: 100.00,
            openingTime: ''
        });
        setCountedCashInput('');
        setShowCloseShiftModal(false);
        
        toast.success('Shift closed successfully! Z-Report generated.');
        // Trigger print of Z-report modal
        setViewingReceipt({
            id: report.id,
            companyId: company.id,
            invoiceType: 'estimate',
            invoiceNumber: 'Z-REPORT-' + new Date(report.closingTime).toISOString().slice(0,10),
            date: new Date().toISOString().slice(0, 10),
            items: [
                { name: 'Opening Cash Float', qty: 1, unit: 'pcs', rate: openingFloat, discount: 0, discountAmt: 0, taxableAmt: 0, gstRate: 0 as any, cgst: 0, sgst: 0, igst: 0, cess: 0, totalGst: 0, amount: openingFloat },
                { name: 'Cash Sales', qty: 1, unit: 'pcs', rate: cashSales, discount: 0, discountAmt: 0, taxableAmt: 0, gstRate: 0 as any, cgst: 0, sgst: 0, igst: 0, cess: 0, totalGst: 0, amount: cashSales },
                { name: 'UPI/Card Sales', qty: 1, unit: 'pcs', rate: upiSales + cardSales, discount: 0, discountAmt: 0, taxableAmt: 0, gstRate: 0 as any, cgst: 0, sgst: 0, igst: 0, cess: 0, totalGst: 0, amount: upiSales + cardSales },
                { name: 'Credit/Loan Sales', qty: 1, unit: 'pcs', rate: creditSales, discount: 0, discountAmt: 0, taxableAmt: 0, gstRate: 0 as any, cgst: 0, sgst: 0, igst: 0, cess: 0, totalGst: 0, amount: creditSales }
            ],
            subTotal: totalSales,
            totalDiscount: 0,
            taxableAmount: totalSales,
            totalCgst: 0, totalSgst: 0, totalIgst: 0, totalCess: 0, totalGst: 0,
            shippingCharges: 0, packingCharges: 0, adjustmentAmount: 0, roundOff: 0,
            grandTotal: expectedCash, // expected drawer cash
            paymentStatus: 'paid',
            amountPaid: countedCash, // counted drawer cash
            balanceDue: discrepancy, // discrepancy
            payments: [],
            paymentMethod: 'cash',
            partyName: 'Daily Closing Z-Report',
            notes: `Expected: ₹${expectedCash.toFixed(2)} || Actual: ₹${countedCash.toFixed(2)} || Diff: ₹${discrepancy.toFixed(2)}`,
            isGstBill: false, isHidden: false, isPrivate: false,
            createdAt: report.closingTime, updatedAt: report.closingTime
        });
    };

    // Save customer repayment
    const handleRecordRepayment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCustomerLedger || !repaymentAmount) return toast.error('Repayment amount required');
        const amount = parseFloat(repaymentAmount) || 0;
        const balanceBefore = selectedCustomerLedger.balance;
        const balanceAfter = balanceBefore - amount;

        const repayment: BalancePayment = {
            id: Math.random().toString(36).slice(2) + Date.now().toString(36),
            type: 'received',
            date: new Date().toISOString().slice(0, 10),
            amount: amount,
            method: repaymentMethod as any,
            note: repaymentNote || 'POS Loan Repayment',
            balanceBefore,
            balanceAfter,
            recordedAt: new Date().toISOString()
        };

        const updatedHistory = [...(selectedCustomerLedger.paymentHistory || []), repayment];
        updateParty(selectedCustomerLedger.id, {
            balance: balanceAfter,
            paymentHistory: updatedHistory
        });

        // Add a zero-total sync dummy invoice or sync directly
        setRepaymentAmount('');
        setRepaymentNote('');
        toast.success(`Repayment of ₹${amount.toFixed(2)} recorded!`);
        
        // Refresh active selected customer ledger details
        const updatedCustomer = parties.find(p => p.id === selectedCustomerLedger.id);
        if (updatedCustomer) {
            setSelectedCustomerLedger({
                ...updatedCustomer,
                balance: balanceAfter,
                paymentHistory: updatedHistory
            });
        }
    };

    // Save Bulk catering Booking
    const handleSaveBulkOrder = (e: React.FormEvent) => {
        e.preventDefault();
        if (!bulkForm.customerName || !bulkForm.eventDate || !bulkForm.totalDeal) {
            return toast.error('Customer, Event Date, and Deal total required');
        }

        const booking = {
            id: Math.random().toString(36).slice(2) + Date.now().toString(36),
            customerName: bulkForm.customerName,
            customerPhone: bulkForm.customerPhone,
            eventDate: bulkForm.eventDate,
            guestCount: parseInt(bulkForm.guestCount) || 50,
            totalDeal: parseFloat(bulkForm.totalDeal) || 0,
            advancePaid: parseFloat(bulkForm.advancePaid) || 0,
            notes: bulkForm.notes,
            status: 'booked',
            createdAt: new Date().toISOString()
        };

        // Create standard estimate invoice to persist in database sync!
        const invNum = 'BULK-' + Math.floor(Math.random() * 9000 + 1000);
        addInvoice({
            id: booking.id,
            companyId: company.id,
            invoiceType: 'estimate',
            invoiceNumber: invNum,
            date: new Date().toISOString().slice(0, 10),
            items: [{
                name: `Catering Booking - ${booking.notes || 'Event Function'}`,
                qty: booking.guestCount,
                unit: 'guest',
                rate: booking.totalDeal / booking.guestCount,
                discount: 0, discountAmt: 0, taxableAmt: booking.totalDeal,
                gstRate: 5 as any, cgst: 0, sgst: 0, igst: 0, cess: 0, totalGst: 0, amount: booking.totalDeal
            }],
            subTotal: booking.totalDeal,
            totalDiscount: 0, taxableAmount: booking.totalDeal,
            totalCgst: 0, totalSgst: 0, totalIgst: 0, totalCess: 0, totalGst: 0,
            shippingCharges: 0, packingCharges: 0, adjustmentAmount: 0, roundOff: 0,
            grandTotal: booking.totalDeal,
            paymentStatus: 'partial',
            amountPaid: booking.advancePaid,
            balanceDue: booking.totalDeal - booking.advancePaid,
            payments: [{ method: 'cash', amount: booking.advancePaid, date: new Date().toISOString().slice(0,10) }],
            paymentMethod: 'cash',
            partyName: booking.customerName,
            partyPhone: booking.customerPhone,
            notes: `Event Date: ${booking.eventDate} || Guests: ${booking.guestCount} || Advance: ₹${booking.advancePaid} || Venue: ${booking.notes} || Status: Booked`,
            isGstBill: false, isHidden: false, isPrivate: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });

        // Save local copy
        const updatedBulk = [booking, ...bulkOrders];
        setBulkOrders(updatedBulk);

        setShowAddBulkModal(false);
        setBulkForm({ customerName: '', customerPhone: '', eventDate: '', guestCount: '', totalDeal: '', advancePaid: '', notes: '' });
        toast.success('Bulk Catering Booking registered!');
    };

    // Analytics details
    const totalExpenses = useMemo(() => expenses.reduce((sum, exp) => sum + exp.amount, 0), [expenses]);
    const totalEarnings = useMemo(() => invoices.filter(i => i.invoiceType === 'sale').reduce((sum, i) => sum + i.grandTotal, 0), [invoices]);
    const topDishes = useMemo(() => {
        const itemMap: Record<string, number> = {};
        invoices.filter(i => i.invoiceType === 'sale').forEach(inv => {
            (inv.items || []).forEach(it => {
                itemMap[it.name] = (itemMap[it.name] || 0) + it.qty;
            });
        });
        return Object.entries(itemMap)
            .map(([name, qty]) => ({ name, qty }))
            .sort((a, b) => b.qty - a.qty)
            .slice(0, 5);
    }, [invoices]);

    return (
        <>
            {sidebarOpen && (
                <div 
                    onClick={() => setSidebarOpen(false)} 
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000 }} 
                />
            )}
            {cartOpen && (
                <div 
                    onClick={() => setCartOpen(false)} 
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000 }} 
                />
            )}

            <button 
                className="mobile-cart-toggle-btn"
                onClick={() => setCartOpen(!cartOpen)}
                style={{
                    background: primaryColor, color: 'white', border: 'none', borderRadius: '50%',
                    width: '48px', height: '48px', position: 'fixed', bottom: '24px', right: '24px',
                    display: 'none', zIndex: 999, alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)', cursor: 'pointer'
                }}
            >
                <ShoppingCart size={20} />
                {cart.length > 0 && (
                    <span style={{
                        position: 'absolute', top: '2px', right: '2px', background: 'white', color: primaryColor,
                        borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px', fontWeight: 900,
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        {cart.reduce((sum, c) => sum + c.qty, 0)}
                    </span>
                )}
            </button>

            <div className="fooddesk-shell">
                
                {/* --- Bespoke Sidebar (Edibio Logo inside Red Box, Navigation in Blue Box) --- */}
                <aside 
                    className={`fooddesk-sidebar ${sidebarOpen ? 'mobile-open' : ''} ${sidebarCollapsed ? 'collapsed' : ''}`}
                    style={{ 
                        width: sidebarCollapsed ? '80px' : '250px', 
                        transition: 'width 0.3s ease',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        backgroundColor: 'white',
                        borderRight: '1px solid #E2E8F0'
                    }}
                >
                    <Link 
                        href="/companies"
                        className="brand-logo-panel" 
                        style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '12px', 
                            padding: sidebarCollapsed ? '20px 10px' : '24px 20px', 
                            justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                            textDecoration: 'none',
                            color: '#1A1A2E',
                            cursor: 'pointer'
                        }}
                    >
                        {/* Red Box Wrapping the Logo */}
                        <div className="brand-logo-img-wrapper" style={{ flexShrink: 0, width: '48px', height: '48px', border: 'none', background: 'white', padding: '4px' }}>
                            <img src="/logo.png" alt="Edibio Logo" className="brand-logo-img" style={{ width: '100%', height: '100%', objectFit: sidebarCollapsed ? 'cover' : 'contain', objectPosition: sidebarCollapsed ? 'left center' : 'center' }} />
                        </div>
                        {!sidebarCollapsed && (
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p className="brand-name" style={{ fontSize: '16px', fontWeight: 900, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{company.name}</p>
                                <p className="brand-mode">{isBakery ? 'Bakery Admin' : 'Restaurant Admin'}</p>
                            </div>
                        )}
                    </Link>

                    {/* Blue Box Wrapping Navigation Links */}
                    <nav className="sidebar-links-panel no-scrollbar" style={{ border: `1px solid ${accentBorder}`, borderRadius: '16px', margin: sidebarCollapsed ? '12px 6px' : '12px', padding: sidebarCollapsed ? '12px 6px' : '16px 12px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, overflowY: 'auto' }}>
                        {(!user?.role || ['owner', 'co_owner', 'manager', 'staff', 'server'].includes(user.role)) && (
                            <button 
                                onClick={() => { setActiveView('dashboard'); setSidebarOpen(false); }} 
                                className={`sidebar-tab-btn ${activeView === 'dashboard' ? 'active' : ''}`}
                                style={{ 
                                    background: activeView === 'dashboard' ? '#EF4444' : 'transparent',
                                    justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                                    padding: sidebarCollapsed ? '12px 0' : '12px 16px'
                                }}
                                title="Dashboard / POS"
                            >
                                <UtensilsCrossed size={16} style={{ flexShrink: 0 }} /> {!sidebarCollapsed && <span>Dashboard / POS</span>}
                            </button>
                        )}
                        {(!user?.role || ['owner', 'co_owner', 'manager', 'staff'].includes(user.role)) && (
                            <>
                                <button 
                                    onClick={() => { setActiveView('inventory'); setSidebarOpen(false); }} 
                                    className={`sidebar-tab-btn ${activeView === 'inventory' ? 'active' : ''}`}
                                    style={{ 
                                        background: activeView === 'inventory' ? '#3B82F6' : 'transparent',
                                        justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                                        padding: sidebarCollapsed ? '12px 0' : '12px 16px'
                                    }}
                                    title="Menu Inventory"
                                >
                                    <Package size={16} style={{ flexShrink: 0 }} /> {!sidebarCollapsed && <span>Menu Inventory</span>}
                                </button>
                                <button 
                                    onClick={() => { setActiveView('billing'); setSidebarOpen(false); }} 
                                    className={`sidebar-tab-btn ${activeView === 'billing' ? 'active' : ''}`}
                                    style={{ 
                                        background: activeView === 'billing' ? '#22C55E' : 'transparent',
                                        justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                                        padding: sidebarCollapsed ? '12px 0' : '12px 16px'
                                    }}
                                    title="Bills & Sales"
                                >
                                    <FileText size={16} style={{ flexShrink: 0 }} /> {!sidebarCollapsed && <span>Bills & Sales</span>}
                                </button>
                                <button 
                                    onClick={() => { setActiveView('parties'); setSidebarOpen(false); }} 
                                    className={`sidebar-tab-btn ${activeView === 'parties' ? 'active' : ''}`}
                                    style={{ 
                                        background: activeView === 'parties' ? '#F59E0B' : 'transparent',
                                        justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                                        padding: sidebarCollapsed ? '12px 0' : '12px 16px'
                                    }}
                                    title="Customers / Parties"
                                >
                                    <Users size={16} style={{ flexShrink: 0 }} /> {!sidebarCollapsed && <span>Customers / Parties</span>}
                                </button>
                                <button 
                                    onClick={() => { setActiveView('invoice-template'); setSidebarOpen(false); }} 
                                    className={`sidebar-tab-btn ${activeView === 'invoice-template' ? 'active' : ''}`}
                                    style={{ 
                                        background: activeView === 'invoice-template' ? '#3B82F6' : 'transparent',
                                        justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                                        padding: sidebarCollapsed ? '12px 0' : '12px 16px'
                                    }}
                                    title="Invoice Templates"
                                >
                                    <CreditCard size={16} style={{ flexShrink: 0 }} /> {!sidebarCollapsed && <span>Invoice Templates</span>}
                                </button>
                                <button 
                                    onClick={() => { setActiveView('app-orders'); setSidebarOpen(false); }} 
                                    className={`sidebar-tab-btn ${activeView === 'app-orders' ? 'active' : ''}`}
                                    style={{ 
                                        background: activeView === 'app-orders' ? '#EF4444' : 'transparent',
                                        justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                                        padding: sidebarCollapsed ? '12px 0' : '12px 16px'
                                    }}
                                    title="App Orders"
                                >
                                    <Bell size={16} style={{ flexShrink: 0 }} /> {!sidebarCollapsed && <span>App Orders</span>}
                                </button>
                            </>
                        )}
                        {company.kitchenDisplayEnabled !== false && (!user?.role || ['owner', 'co_owner', 'manager', 'staff', 'chef_atelier'].includes(user.role)) && (
                            <button 
                                onClick={() => { setActiveView('kitchen'); setSidebarOpen(false); }} 
                                className={`sidebar-tab-btn ${activeView === 'kitchen' ? 'active' : ''}`}
                                style={{ 
                                    background: activeView === 'kitchen' ? '#8B5CF6' : 'transparent',
                                    justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                                    padding: sidebarCollapsed ? '12px 0' : '12px 16px',
                                    position: 'relative'
                                }}
                                title="Kitchen Display (KDS)"
                            >
                                <UtensilsCrossed size={16} style={{ flexShrink: 0 }} /> 
                                {!sidebarCollapsed && <span>Kitchen Display</span>}
                                {kitchenOrders.filter((o: any) => o.status === 'new').length > 0 && (
                                    <span style={{ 
                                        background: '#EF4444', color: 'white', borderRadius: '50%',
                                        width: '16px', height: '16px', fontSize: '9px', fontWeight: 900,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        marginLeft: 'auto', flexShrink: 0
                                    }}>
                                        {kitchenOrders.filter((o: any) => o.status === 'new').length}
                                    </span>
                                )}
                            </button>
                        )}
                        {(!user?.role || ['owner', 'co_owner', 'manager', 'staff'].includes(user.role)) && (
                            <>
                                <button 
                                    onClick={() => { setActiveView('deals'); setSidebarOpen(false); }} 
                                    className={`sidebar-tab-btn ${activeView === 'deals' ? 'active' : ''}`}
                                    style={{ 
                                        background: activeView === 'deals' ? '#EC4899' : 'transparent',
                                        justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                                        padding: sidebarCollapsed ? '12px 0' : '12px 16px'
                                    }}
                                    title="Deals & Combos"
                                >
                                    <Zap size={16} style={{ flexShrink: 0 }} /> {!sidebarCollapsed && <span>Deals & Combos</span>}
                                </button>
                                <button 
                                    onClick={() => { setActiveView('bulk-orders'); setSidebarOpen(false); }} 
                                    className={`sidebar-tab-btn ${activeView === 'bulk-orders' ? 'active' : ''}`}
                                    style={{ 
                                        background: activeView === 'bulk-orders' ? '#F59E0B' : 'transparent',
                                        justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                                        padding: sidebarCollapsed ? '12px 0' : '12px 16px'
                                    }}
                                    title="Bulk Bookings"
                                >
                                    <Clock size={16} style={{ flexShrink: 0 }} /> {!sidebarCollapsed && <span>Bulk Bookings</span>}
                                </button>
                                <button 
                                    onClick={() => { setActiveView('expenses'); setSidebarOpen(false); }} 
                                    className={`sidebar-tab-btn ${activeView === 'expenses' ? 'active' : ''}`}
                                    style={{ 
                                        background: activeView === 'expenses' ? '#EF4444' : 'transparent',
                                        justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                                        padding: sidebarCollapsed ? '12px 0' : '12px 16px'
                                    }}
                                    title="Expenses"
                                >
                                    <DollarSign size={16} style={{ flexShrink: 0 }} /> {!sidebarCollapsed && <span>Expenses</span>}
                                </button>
                                <button 
                                    onClick={() => { setActiveView('reports'); setSidebarOpen(false); }} 
                                    className={`sidebar-tab-btn ${activeView === 'reports' ? 'active' : ''}`}
                                    style={{ 
                                        background: activeView === 'reports' ? '#22C55E' : 'transparent',
                                        justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                                        padding: sidebarCollapsed ? '12px 0' : '12px 16px'
                                    }}
                                    title="Reports"
                                >
                                    <BarChart3 size={16} style={{ flexShrink: 0 }} /> {!sidebarCollapsed && <span>Reports</span>}
                                </button>
                                <button 
                                    onClick={() => { setActiveView('settings'); setSidebarOpen(false); }} 
                                    className={`sidebar-tab-btn ${activeView === 'settings' ? 'active' : ''}`}
                                    style={{ 
                                        background: activeView === 'settings' ? '#3B82F6' : 'transparent',
                                        justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                                        padding: sidebarCollapsed ? '12px 0' : '12px 16px'
                                    }}
                                    title="Settings"
                                >
                                    <Settings size={16} style={{ flexShrink: 0 }} /> {!sidebarCollapsed && <span>Settings</span>}
                                </button>
                            </>
                        )}
                    </nav>

                    <div className="sidebar-exit-area" style={{ 
                        padding: sidebarCollapsed ? '12px 6px' : '16px 12px', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '8px', 
                        borderTop: '1px solid #E2E8F0',
                        marginTop: 'auto'
                    }}>
                        {/* Subscription Link */}
                        {(!user?.role || ['owner', 'co_owner', 'manager'].includes(user.role)) && (
                            <Link 
                                href="/subscription" 
                                style={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '9px 12px',
                                    borderRadius: '10px',
                                    textDecoration: 'none',
                                    background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.15), rgba(66, 133, 244, 0.15))',
                                    border: '1px solid rgba(147, 51, 234, 0.3)',
                                    justifyContent: sidebarCollapsed ? 'center' : 'flex-start'
                                }} 
                                title="Subscription"
                            >
                                <Crown size={15} color="#9333EA" style={{ flexShrink: 0 }} /> 
                                {!sidebarCollapsed && (
                                    <span style={{ fontSize: '12px', color: '#9333EA', fontWeight: 700 }}>
                                        Subscription
                                    </span>
                                )}
                            </Link>
                        )}

                        {/* Close Shift Button */}
                        {registerOpen && (
                            <button
                                onClick={() => setShowCloseShiftModal(true)}
                                style={{
                                    width: '100%', background: '#E53E3E', color: 'white', border: 'none',
                                    padding: '10px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: 800,
                                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                                    justifyContent: sidebarCollapsed ? 'center' : 'flex-start', marginBottom: '12px',
                                    boxShadow: '0 4px 12px rgba(229,62,62,0.2)'
                                }}
                                title="Close Shift"
                            >
                                <span>🔒</span> {!sidebarCollapsed && <span>Close Shift</span>}
                            </button>
                        )}

                        {/* Interactive Profile/Shop Settings Panel */}
                        <div 
                            onClick={() => setShowProfileModal(true)} 
                            style={{
                                display: 'flex', alignItems: 'center', gap: '12px',
                                padding: '12px', borderRadius: '12px', background: '#F8FAFC',
                                border: '1px solid #E2E8F0', cursor: 'pointer', marginBottom: '12px',
                                transition: 'all 0.2s', justifyContent: sidebarCollapsed ? 'center' : 'flex-start'
                            }}
                            title="Shop & Profile Settings"
                            className="sidebar-profile-panel"
                        >
                            <div style={{
                                width: '36px', height: '36px', borderRadius: '50%',
                                background: primaryColor, color: 'white', display: 'flex',
                                alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0
                            }}>
                                {company.logoUrl || company.imageUrl || '👨‍🍳'}
                            </div>
                            {!sidebarCollapsed && (
                                <div style={{ minWidth: 0, flex: 1 }}>
                                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: '#1A1A2E', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {company.name}
                                    </p>
                                    <p style={{ margin: '2px 0 0', fontSize: '10px', color: '#718096', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {user?.name || 'Administrator'}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Exit Portal Link */}
                        <Link 
                            href="/companies" 
                            className="exit-link" 
                            style={{ 
                                justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                                padding: '9px 12px'
                            }} 
                            title="Exit Portal"
                        >
                            <LogOut size={16} style={{ flexShrink: 0 }} /> 
                            {!sidebarCollapsed && <span>Exit Portal</span>}
                        </Link>
                    </div>
                </aside>

                {/* --- Main Middle Content Panel --- */}
                <main className="fooddesk-main">
                    {/* Top Search Bar & Profile */}
                    <header className="fooddesk-topbar">
                        <div className="topbar-left-section" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <button 
                                className="mobile-hamburger-btn" 
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                style={{
                                    background: 'none', border: 'none', cursor: 'pointer', padding: '8px',
                                    display: 'none'
                                }}
                            >
                                <Layers size={22} color={primaryColor} />
                            </button>
                            <button 
                                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                                style={{
                                    background: 'none', border: 'none', cursor: 'pointer', padding: '8px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: primaryColor
                                }}
                                title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                                className="desktop-sidebar-toggle-btn"
                            >
                                <Layers size={22} />
                            </button>
                        </div>
                        <div className="search-box-wrapper" style={{ display: 'flex', gap: '8px', width: '100%', maxWidth: '450px' }}>
                            <div style={{ position: 'relative', flex: 1 }}>
                                <Search size={16} color="#A0AEC0" className="search-icon" />
                                <input
                                    placeholder="Search by name, barcode or HSN code..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input"
                                    style={{ paddingRight: searchQuery ? '40px' : '16px' }}
                                />
                                {searchQuery && (
                                    <button 
                                        onClick={() => setSearchQuery('')}
                                        style={{
                                            position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                                            background: 'none', border: 'none', cursor: 'pointer', color: '#A0AEC0',
                                            fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            padding: '4px'
                                        }}
                                        title="Clear search"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                            <button 
                                style={{
                                    border: 'none', background: primaryColor, color: 'white',
                                    borderRadius: '20px', padding: '0 16px', fontSize: '13px', fontWeight: 800, cursor: 'pointer'
                                }}
                                onClick={() => toast.success(`Searching: ${searchQuery}`)}
                            >
                                Search
                            </button>
                        </div>
                        <div className="topbar-user-area">
                            <div style={{ position: 'relative' }}>
                                <button className="notif-btn" onClick={() => { setShowNotifPanel(!showNotifPanel); setNotifications(prev => prev.map(n => ({ ...n, read: true }))); }} style={{ position: 'relative' }}>
                                    <Bell size={18} />
                                    {unreadCount > 0 && (
                                        <span style={{
                                            position: 'absolute', top: '-2px', right: '-2px',
                                            background: '#EF4444', color: 'white', borderRadius: '50%',
                                            width: '16px', height: '16px', fontSize: '9px', fontWeight: 900,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>{unreadCount > 9 ? '9+' : unreadCount}</span>
                                    )}
                                </button>
                                {showNotifPanel && (
                                    <div style={{
                                        position: 'absolute', top: '48px', right: 0, width: '320px',
                                        background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px',
                                        boxShadow: '0 16px 40px rgba(0,0,0,0.12)', zIndex: 9999, overflow: 'hidden'
                                    }}>
                                        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <strong style={{ fontSize: '13px' }}>Notifications</strong>
                                            <button onClick={() => setNotifications([])} style={{ border: 'none', background: 'none', color: '#94A3B8', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>Clear all</button>
                                        </div>
                                        <div style={{ maxHeight: '300px', overflowY: 'auto' }} className="no-scrollbar">
                                            {notifications.length === 0 ? (
                                                <div style={{ padding: '24px', textAlign: 'center', color: '#A0AEC0', fontSize: '12px' }}>No notifications yet</div>
                                            ) : (
                                                notifications.map(notif => (
                                                    <div key={notif.id} style={{
                                                        padding: '12px 20px', borderBottom: '1px solid #F8FAFC',
                                                        display: 'flex', gap: '10px', alignItems: 'flex-start',
                                                        background: notif.read ? 'white' : '#F0FDF4'
                                                    }}>
                                                        <span style={{ fontSize: '18px', flexShrink: 0 }}>
                                                            {notif.type === 'billing' ? '🧾' : notif.type === 'order' ? '🛵' : 'ℹ️'}
                                                        </span>
                                                        <div style={{ flex: 1, minWidth: 0 }}>
                                                            <p style={{ fontSize: '12px', color: '#1A1A2E', margin: 0, lineHeight: 1.4 }}>{notif.message}</p>
                                                            <p style={{ fontSize: '10px', color: '#94A3B8', margin: '2px 0 0', fontWeight: 600 }}>{notif.time}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="user-avatar-circle" style={{ background: primaryColor, color: 'white' }}>
                                {company.imageUrl || '👨‍🍳'}
                            </div>
                        </div>
                    </header>

                    {/* Conditional Body Render based on activeView */}
                    <div className="fooddesk-body no-scrollbar">
                        
                        {/* VIEW 1: DASHBOARD / POS */}
                        {activeView === 'dashboard' && !registerOpen && (
                            <div className="open-shift-splash-card" style={{ maxWidth: '440px', margin: '40px auto', background: 'white', border: `1px solid ${accentBorder}`, borderRadius: '24px', padding: '32px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                                <div style={{ fontSize: '48px', marginBottom: '16px' }}>💰</div>
                                <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#1A1A2E', margin: '0 0 8px 0' }}>Shift Register Closed</h3>
                                <p style={{ fontSize: '13px', color: '#718096', margin: '0 0 24px 0', lineHeight: 1.5 }}>Please open the cash register with an opening cash float to begin taking sales orders today.</p>
                                <div className="form-group" style={{ textAlign: 'left', marginBottom: '20px' }}>
                                    <label style={{ fontSize: '11px', fontWeight: 700, color: '#4A5568' }}>Opening Cash Float (₹)</label>
                                    <input
                                        type="number"
                                        className="modal-input"
                                        placeholder="100.00"
                                        value={cashDrawerFloatInput}
                                        onChange={(e) => setCashDrawerFloatInput(e.target.value)}
                                        style={{ width: '100%', marginTop: '6px' }}
                                    />
                                </div>
                                <button
                                    className="checkout-btn"
                                    style={{ background: primaryColor, margin: 0 }}
                                    onClick={handleOpenShift}
                                >
                                    Open Register & Start Shift
                                </button>
                            </div>
                        )}

                        {activeView === 'dashboard' && registerOpen && (
                            <>
                                {user?.role !== 'server' && Object.keys(tableCarts).some(key => tableCarts[key]?.status === 'completed') && (
                                    <div style={{ background: '#FFFDF5', border: '1px solid #FCD34D', borderRadius: '16px', padding: '16px', marginBottom: '20px', boxShadow: '0 4px 12px rgba(252,211,77,0.1)' }}>
                                        <h5 style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: 900, color: '#D97706', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            📥 Pending Table Bills ({Object.keys(tableCarts).filter(key => tableCarts[key]?.status === 'completed').length})
                                        </h5>
                                        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '6px' }} className="no-scrollbar">
                                            {Object.keys(tableCarts).map(key => {
                                                const tableOrder = tableCarts[key];
                                                if (tableOrder?.status !== 'completed') return null;
                                                const [area, table] = key.split('-');
                                                const totalAmt = tableOrder.cart.reduce((sum: number, c: any) => sum + (c.item.sellingPrice * c.qty), 0);
                                                return (
                                                    <button
                                                        key={key}
                                                        onClick={() => {
                                                            setActiveArea(area);
                                                            setSelectedTable(table);
                                                            setTableNumber(`${area} - Table ${table}`);
                                                            setCart(tableOrder.cart);
                                                            if (tableOrder.notes) setNotesText(tableOrder.notes);
                                                            if (tableOrder.customerId) {
                                                                const partyObj = parties.find(p => p.id === tableOrder.customerId);
                                                                if (partyObj) setSelectedParty(partyObj);
                                                            }
                                                            toast.success(`Loaded bill for ${area} Table ${table}`);
                                                        }}
                                                        style={{
                                                            background: 'white', border: '2px solid #FCD34D', borderRadius: '12px', padding: '8px 14px', fontSize: '12px', fontWeight: 700, color: '#1A1A2E', cursor: 'pointer', textAlign: 'left', flexShrink: 0, transition: 'all 0.15s', boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                                                        }}
                                                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                                                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
                                                    >
                                                        <p style={{ margin: 0, fontWeight: 900, color: '#1A1A2E' }}>{area} — Table {table}</p>
                                                        <p style={{ margin: '3px 0 0 0', color: '#D97706', fontSize: '11px', fontWeight: 800 }}>₹{totalAmt.toFixed(2)}</p>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {customAreas.length === 0 ? (
                                    <div style={{
                                        background: 'white',
                                        borderRadius: '20px',
                                        padding: '50px 30px',
                                        textAlign: 'center',
                                        border: '2px dashed #E2E8F0',
                                        margin: '24px 0',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '16px',
                                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)'
                                    }}>
                                        <div style={{ fontSize: '48px' }}>🪑</div>
                                        <div>
                                            <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1A1A2E', margin: '0 0 6px 0' }}>Configure Dining Layout</h3>
                                            <p style={{ fontSize: '13px', color: '#718096', margin: 0, maxWidth: '400px', lineHeight: 1.5 }}>
                                                Set up your seating areas (e.g., Indoor, Garden Patio, VIP Lounge) and tables to start serving dine-in customers.
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setShowTableConfigModal(true)}
                                            style={{
                                                background: primaryColor,
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '12px',
                                                padding: '12px 28px',
                                                fontWeight: 800,
                                                fontSize: '13px',
                                                cursor: 'pointer',
                                                boxShadow: `0 4px 12px ${primaryColor}40`,
                                                transition: 'transform 0.15s'
                                            }}
                                        >
                                            ⚙️ Create Dining Areas & Tables
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        {/* Table Selection Grid - Customizable */}
                                        <div className="section-header" style={{ marginTop: '10px' }}>
                                            <h3>Dining Tables - {activeArea} Area ({tableConfig[activeArea] || 0} tables)</h3>
                                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                                {customAreas.map((area: any) => (
                                                    <button
                                                        key={area}
                                                        onClick={() => setActiveArea(area)}
                                                        className="area-tab-btn"
                                                        style={{
                                                            background: activeArea === area ? primaryColor : 'white',
                                                            color: activeArea === area ? 'white' : '#718096',
                                                            border: `1px solid ${activeArea === area ? primaryColor : '#E2E8F0'}`,
                                                            padding: '6px 12px',
                                                            borderRadius: '8px',
                                                            fontSize: '12px',
                                                            fontWeight: 700,
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        {area}
                                                    </button>
                                                ))}
                                                <button
                                                    onClick={() => setShowTableConfigModal(true)}
                                                    style={{
                                                        background: '#F8FAFC', color: '#718096',
                                                        border: '1px dashed #CBD5E0',
                                                        padding: '6px 12px', borderRadius: '8px',
                                                        fontSize: '11px', fontWeight: 700, cursor: 'pointer'
                                                    }}
                                                >
                                                    ⚙️ Manage Tables
                                                </button>
                                            </div>
                                        </div>
                                        <div className="tables-layout-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px', marginBottom: '24px' }}>
                                            {Array.from({ length: tableConfig[activeArea] || 0 }, (_, i) => {
                                                const tableNum = String(i + 1);
                                                const key = `${activeArea}-${tableNum}`;
                                                const cached = tableCarts[key];
                                                const isOccupied = !!(cached && cached.cart && cached.cart.length > 0);
                                                const isDirty = dirtyTables[key];
                                                const isSelected = selectedTable === tableNum;
                                                const isCompleted = cached && cached.status === 'completed';
                                                
                                                // Check if this table has a KDS order pending
                                                const hasKdsReady = kitchenOrders.some((o: any) => o.tableNum === tableNum && o.area === activeArea && o.status === 'ready');
                                                
                                                // Default: Vacant (Green)
                                                let bg = '#E6F4EA';
                                                let text = '#137333';
                                                let border = '#34A853';
                                                let stateLabel = 'Vacant';
                                                
                                                if (isCompleted) {
                                                    // Yellow for Eat Done / Bill Pending
                                                    bg = '#FEF7E0';
                                                    text = '#B06000';
                                                    border = '#FBBC04';
                                                    stateLabel = 'Eat Done';
                                                } else if (isOccupied) {
                                                    // Red for Occupied
                                                    bg = '#FCE8E6';
                                                    text = '#C5221F';
                                                    border = '#EA4335';
                                                    stateLabel = 'Occupied';
                                                } else if (isDirty) {
                                                    // Grey for Dirty
                                                    bg = '#F1F3F4';
                                                    text = '#5F6368';
                                                    border = '#BDC1C6';
                                                    stateLabel = 'Dirty';
                                                }
                                                
                                                const displayBorder = isSelected ? '#1A73E8' : (hasKdsReady ? '#22C55E' : border);
                                                const displayBorderWidth = isSelected ? '3px' : '2px';

                                                return (
                                                    <div
                                                        key={tableNum}
                                                        onClick={() => {
                                                            if (isDirty) {
                                                                setDirtyTables((prev: any) => ({ ...prev, [key]: false }));
                                                                toast.success(`Table ${tableNum} cleaned & ready!`);
                                                                return;
                                                            }
                                                            setSelectedTable(tableNum);
                                                            setTableNumber(`${activeArea} - Table ${tableNum}`);
                                                            setOrderType('Dining');
                                                            if (isOccupied || isCompleted) {
                                                                setCart(cached.cart);
                                                                if (cached.notes) setNotesText(cached.notes);
                                                                if (cached.customerId) {
                                                                    const partyObj = parties.find(p => p.id === cached.customerId);
                                                                    if (partyObj) setSelectedParty(partyObj);
                                                                }
                                                                toast.success(`Loaded active order for Table ${tableNum}`);
                                                            } else {
                                                                setCart([]);
                                                                setSelectedParty(null);
                                                                setNotesText('');
                                                            }
                                                        }}
                                                        className="table-card-item"
                                                        style={{
                                                            background: bg,
                                                            color: text,
                                                            border: `${displayBorderWidth} solid ${displayBorder}`,
                                                            borderRadius: '16px',
                                                            padding: '12px',
                                                            textAlign: 'center',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s',
                                                            boxShadow: isSelected ? '0 4px 12px rgba(26,115,232,0.15)' : hasKdsReady ? '0 0 0 3px rgba(34,197,94,0.2)' : 'none',
                                                            position: 'relative'
                                                        }}
                                                    >
                                                        {hasKdsReady && (
                                                            <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#22C55E', color: 'white', borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>✓</span>
                                                        )}
                                                        {isCompleted && !hasKdsReady && (
                                                            <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#F59E0B', color: 'white', borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>🏁</span>
                                                        )}
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setActionTable({ tableNum, area: activeArea });
                                                            }}
                                                            style={{
                                                                position: 'absolute',
                                                                top: '4px',
                                                                right: '4px',
                                                                background: 'rgba(255, 255, 255, 0.7)',
                                                                border: 'none',
                                                                borderRadius: '4px',
                                                                width: '20px',
                                                                height: '20px',
                                                                fontSize: '12px',
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                fontWeight: 'bold',
                                                                color: '#1E293B',
                                                                boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
                                                            }}
                                                            title="Table Actions"
                                                        >
                                                            ⋮
                                                        </button>
                                                        <p style={{ margin: 0, fontSize: '13px', fontWeight: 800 }}>Table {tableNum}</p>
                                                        <p style={{ margin: '4px 0 0 0', fontSize: '10px', fontWeight: 600, opacity: 0.8 }}>
                                                            {isOccupied || isCompleted ? `₹${cached.cart.reduce((sum: number, c: any) => sum + (c.item.sellingPrice * c.qty), 0).toFixed(2)}` : hasKdsReady ? '🍽️ Ready!' : stateLabel}
                                                        </p>
                                                    </div>
                                                );
                                            })}
                                            {(tableConfig[activeArea] || 0) === 0 && (
                                                <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#A0AEC0', fontSize: '13px', padding: '20px' }}>
                                                    No tables configured for this area. Click "Manage Tables" to add.
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}

                                {/* Promo Hero Banner */}
                                <div className="promo-banner" style={{ background: bannerBg }}>
                                    <div className="promo-content promo-animate" key={activeDeal?.id || 'default'}>
                                        <span className="promo-tag" style={{ background: primaryColor }}>
                                            {promoDeals.length > 1 ? `PROMO ${activePromoIndex + 1}/${promoDeals.length}` : 'PROMO'}
                                        </span>
                                        <h1 className="promo-title">{activeBannerTitle}</h1>
                                        <p className="promo-subtitle">{activeBannerSub}</p>
                                        <p className="promo-offer" style={{ color: primaryColor }}>{activeBannerOffer}</p>
                                        <button className="order-now-btn" style={{ background: primaryColor }} onClick={() => {
                                            if (activeDeal) {
                                                const dealProduct: Product = {
                                                    id: `deal-${activeDeal.id}`,
                                                    companyId: company.id,
                                                    name: activeDeal.name,
                                                    category: 'Deals',
                                                    sellingPrice: activeDeal.dealPrice,
                                                    purchasePrice: activeDeal.dealPrice * 0.4,
                                                    stockQty: 999,
                                                    lowStockAlertQty: 0,
                                                    gstRate: 5,
                                                    taxIncluded: true,
                                                    unit: 'combo',
                                                    imageUrl: activeDeal.emoji,
                                                    cessRate: 0
                                                };
                                                addToCart(dealProduct);
                                                toast.success(`Added ${activeDeal.name} combo to cart!`);
                                            } else {
                                                if (products.length > 0) {
                                                    addToCart(products[0]);
                                                    toast.success(`Added ${products[0].name} to cart!`);
                                                }
                                            }
                                        }}>Order Now</button>
                                    </div>
                                    <div className="promo-graphic promo-animate" key={(activeDeal?.id || 'default') + '-icon'}>{activeBannerIcon}</div>
                                </div>

                                {/* Meal Time Filter */}
                                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#718096' }}>🕐 Menu Time:</span>
                                    {(['All', 'Breakfast', 'Lunch', 'Dinner'] as const).map(time => (
                                        <button
                                            key={time}
                                            onClick={() => setMealTimeFilter(time)}
                                            style={{
                                                background: mealTimeFilter === time ? primaryColor : '#F8FAFC',
                                                color: mealTimeFilter === time ? 'white' : '#718096',
                                                border: `1px solid ${mealTimeFilter === time ? primaryColor : '#E2E8F0'}`,
                                                padding: '5px 12px', borderRadius: '20px',
                                                fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                                                display: 'flex', alignItems: 'center', gap: '4px'
                                            }}
                                        >
                                            {time === 'Breakfast' ? '🌅' : time === 'Lunch' ? '☀️' : time === 'Dinner' ? '🌙' : '🍽️'} {time}
                                        </button>
                                    ))}
                                </div>

                                {/* Deals & Combos Quick-Add */}
                                {deals.filter((d: any) => d.validFor === 'All' || d.validFor === mealTimeFilter).length > 0 && (
                                    <div style={{ marginBottom: '20px' }}>
                                        <div className="section-header" style={{ marginBottom: '10px' }}>
                                            <h3 style={{ fontSize: '14px' }}>🎁 Deals & Combos</h3>
                                            <button style={{ color: '#EC4899', background: 'none', border: 'none', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }} onClick={() => setActiveView('deals')}>Manage Deals</button>
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px' }} className="no-scrollbar">
                                            {deals.filter((d: any) => d.validFor === 'All' || d.validFor === mealTimeFilter).map((deal: any) => (
                                                <button
                                                    key={deal.id}
                                                    onClick={() => {
                                                        // Add all deal items to cart (as a single product at deal price)
                                                        const dealProduct: Product = {
                                                            id: 'deal_' + deal.id,
                                                            companyId: company.id,
                                                            name: `${deal.emoji} ${deal.name}`,
                                                            category: 'Deals',
                                                            sellingPrice: deal.dealPrice,
                                                            purchasePrice: deal.dealPrice * 0.6,
                                                            stockQty: 999,
                                                            lowStockAlertQty: 0,
                                                            unit: 'set',
                                                            barcode: '',
                                                            hsnCode: '',
                                                            gstRate: 5,
                                                            taxIncluded: false
                                                        };
                                                        addToCart(dealProduct);
                                                        toast.success(`${deal.name} deal added to cart!`);
                                                    }}
                                                    style={{
                                                        flexShrink: 0, background: 'linear-gradient(135deg, #FDF2F8, #FCE7F3)',
                                                        border: '1.5px solid #EC4899', borderRadius: '16px',
                                                        padding: '12px 16px', cursor: 'pointer', textAlign: 'left',
                                                        minWidth: '160px', transition: 'transform 0.2s'
                                                    }}
                                                    onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                                                    onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
                                                >
                                                    <div style={{ fontSize: '22px', marginBottom: '4px' }}>{deal.emoji}</div>
                                                    <p style={{ margin: 0, fontSize: '12px', fontWeight: 800, color: '#1A1A2E' }}>{deal.name}</p>
                                                    <p style={{ margin: '2px 0 0', fontSize: '10px', color: '#718096' }}>{deal.description.slice(0, 30)}{deal.description.length > 30 ? '...' : ''}</p>
                                                    <p style={{ margin: '6px 0 0', fontSize: '14px', fontWeight: 900, color: '#EC4899' }}>₹{deal.dealPrice}</p>
                                                    <span style={{ fontSize: '10px', fontWeight: 700, background: '#EC4899', color: 'white', borderRadius: '4px', padding: '2px 6px' }}>{deal.type.toUpperCase()}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Category Chip Ribbon */}
                                <div className="section-header">
                                    <h3>Category</h3>
                                </div>
                                <div className="categories-ribbon no-scrollbar">
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCat(cat)}
                                            className={`category-chip ${selectedCat === cat ? 'active' : ''}`}
                                            style={{
                                                borderColor: selectedCat === cat ? primaryColor : '#E2E8F0',
                                                background: selectedCat === cat ? secondaryBg : 'white',
                                                color: selectedCat === cat ? primaryColor : '#718096'
                                            }}
                                        >
                                            <span className="category-emoji">
                                                {cat === 'All' ? '🍽️' : cat === 'Burgers' ? '🍔' : cat === 'Pizza' ? '🍕' : cat === 'Cakes' ? '🎂' : cat === 'Pastries' ? '🥐' : cat === 'Bread' ? '🍞' : cat === 'Coffee' ? '☕' : '🍲'}
                                            </span>
                                            <span>{cat}</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Popular Dishes */}
                                <div className="section-header">
                                    <h3>
                                        {mealTimeFilter !== 'All' ? `${mealTimeFilter === 'Breakfast' ? '🌅' : mealTimeFilter === 'Lunch' ? '☀️' : '🌙'} ${mealTimeFilter} Menu` : 'Popular Dishes'}
                                    </h3>
                                    {products.length === 0 && (
                                        <button className="seed-btn" style={{ background: primaryColor }} onClick={handleSeedData}>
                                            🔮 Seed Menu Items
                                        </button>
                                    )}
                                    <button className="add-dish-btn" style={{ color: primaryColor }} onClick={() => setShowAddItemModal(true)}>
                                        ➕ Add Item
                                    </button>
                                </div>

                                {filteredProducts.length === 0 ? (
                                    <div className="empty-catalog-card">
                                        <p>No items found. Seed sample menu items or add a product to get started!</p>
                                    </div>
                                ) : (
                                    <div className="dishes-grid">
                                        {filteredProducts.map(item => (
                                            <div key={item.id} className="dish-card" onClick={() => addToCart(item)}>
                                                <div className="dish-card-image-box">
                                                    {item.imageUrl && (item.imageUrl.startsWith('http') || item.imageUrl.startsWith('/')) ? (
                                                        <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
                                                    ) : (
                                                        <span style={{ fontSize: 48 }}>{item.imageUrl || '🥘'}</span>
                                                    )}
                                                    <button className="wishlist-btn" onClick={(e) => { e.stopPropagation(); toast.success('Added to favorites!'); }}>
                                                        <Heart size={14} color="#EA4335" fill="#EA4335" />
                                                    </button>
                                                </div>
                                                <div className="dish-card-details">
                                                    <div className="rating-row">
                                                        <Star size={12} color="#FBBC04" fill="#FBBC04" />
                                                        <span>4.8</span>
                                                    </div>
                                                    <p className="dish-name">{item.name}</p>
                                                    <div className="price-row">
                                                        <span className="dish-price">₹{item.sellingPrice.toFixed(2)}</span>
                                                        <button className="add-to-cart-btn" style={{ background: primaryColor }}>
                                                            <Plus size={16} color="white" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Recent Order Section (Populated dynamically) */}
                                <div className="section-header" style={{ marginTop: '32px' }}>
                                    <h3>Recent Orders</h3>
                                    <button className="add-dish-btn" style={{ color: viewThemeColor }} onClick={() => setActiveView('billing')}>View all &gt;</button>
                                </div>
                                {invoices.filter(i => i.invoiceType === 'sale').length === 0 ? (
                                    <div className="empty-catalog-card" style={{ padding: '24px' }}>
                                        No recent orders placed yet. Placed orders will appear here automatically.
                                    </div>
                                ) : (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
                                        {[...invoices]
                                            .filter(i => i.invoiceType === 'sale')
                                            .sort((a, b) => {
                                                const dateCompare = (b.date || '').localeCompare(a.date || '');
                                                if (dateCompare !== 0) return dateCompare;
                                                const timeCompare = (b.time || '00:00').localeCompare(a.time || '00:00');
                                                if (timeCompare !== 0) return timeCompare;
                                                return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
                                            })
                                            .slice(0, 3)
                                            .map(inv => {
                                                const itemsSummary = inv.items.map(it => `${it.qty}x ${it.name}`).join(', ');
                                                return (
                                                    <div 
                                                        key={inv.id} 
                                                        className="dish-card" 
                                                        style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '16px', borderRadius: '16px', background: 'white', border: '1px solid #E2E8F0', cursor: 'default' }}
                                                    >
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <span style={{ fontSize: '11px', fontWeight: 800, padding: '4px 8px', borderRadius: '8px', background: '#F1F5F9', color: '#475569' }}>
                                                                #{inv.invoiceNumber}
                                                            </span>
                                                            <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600 }}>
                                                                {inv.time || 'N/A'} • {inv.date}
                                                            </span>
                                                        </div>
                                                        <div style={{ flex: 1 }}>
                                                            <p style={{ fontSize: '13px', fontWeight: 800, color: '#1A1A2E', margin: '4px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '36px', lineHeight: '18px' }} title={itemsSummary}>
                                                                {itemsSummary || 'Custom Order'}
                                                            </p>
                                                            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: '6px' }}>
                                                                <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', background: viewThemeSecondaryBg, color: viewThemeColor }}>
                                                                    {inv.counter || 'POS Sale'}
                                                                </span>
                                                                {inv.partyName && (
                                                                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', background: '#EFF6FF', color: '#2563EB', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                                        👤 {inv.partyName}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed #E2E8F0', paddingTop: '10px', marginTop: '4px' }}>
                                                            <span style={{ fontSize: '14px', fontWeight: 900, color: viewThemeColor }}>
                                                                ₹{inv.grandTotal.toFixed(2)}
                                                            </span>
                                                            <button 
                                                                className="add-dish-btn" 
                                                                style={{ color: '#3B82F6', fontSize: '11px', fontWeight: 'bold', padding: '4px 8px', background: '#EFF6FF', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                                                                onClick={() => setViewingReceipt(inv)}
                                                            >
                                                                Receipt 📄
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                )}
                            </>
                        )}

                        {/* VIEW 2: MENU INVENTORY */}
                        {activeView === 'inventory' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div className="custom-view-container">
                                    <div className="view-title-row">
                                        <h2>Menu Items Catalog</h2>
                                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                            {selectedProductIds.length > 0 && (
                                                <button
                                                    className="view-action-btn"
                                                    style={{ background: '#EF4444' }}
                                                    onClick={handleBulkDelete}
                                                >
                                                    🗑 Delete Selected ({selectedProductIds.length})
                                                </button>
                                            )}
                                            <button className="view-action-btn" style={{ background: viewThemeColor }} onClick={() => setShowAddItemModal(true)}>
                                                ➕ Add New Dish
                                            </button>
                                        </div>
                                    </div>

                                    <div className="custom-table-wrapper">
                                        <table className="custom-table">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: '40px' }}>
                                                        <input
                                                            type="checkbox"
                                                            checked={products.length > 0 && selectedProductIds.length === products.length}
                                                            onChange={e => setSelectedProductIds(e.target.checked ? products.map(p => p.id) : [])}
                                                            style={{ cursor: 'pointer', accentColor: viewThemeColor }}
                                                            title="Select All"
                                                        />
                                                    </th>
                                                    <th>Dish</th>
                                                    <th>Category</th>
                                                    <th>Price</th>
                                                    <th>Estimated Cost</th>
                                                    <th>Expiry Date</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {products.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={6} style={{ textAlign: 'center', color: '#A0AEC0', padding: '30px' }}>No items in menu card.</td>
                                                    </tr>
                                                ) : (
                                                    products.map(p => {
                                                        const isExpired = p.expiryDate ? new Date(p.expiryDate).getTime() < new Date().getTime() : false;
                                                        return (
                                                            <tr key={p.id} style={{ background: selectedProductIds.includes(p.id) ? '#EFF6FF' : undefined }}>
                                                                <td style={{ width: '40px' }}>
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={selectedProductIds.includes(p.id)}
                                                                        onChange={e => setSelectedProductIds(prev =>
                                                                            e.target.checked ? [...prev, p.id] : prev.filter(id => id !== p.id)
                                                                        )}
                                                                        style={{ cursor: 'pointer', accentColor: viewThemeColor }}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                                        {p.imageUrl && (p.imageUrl.startsWith('http') || p.imageUrl.startsWith('/')) ? (
                                                                            <img src={p.imageUrl} alt={p.name} style={{ width: '32px', height: '32px', objectFit: 'cover', borderRadius: '6px' }} />
                                                                        ) : (
                                                                            <span style={{ fontSize: 24 }}>{p.imageUrl || '🥘'}</span>
                                                                        )}
                                                                        <strong>{p.name}</strong>
                                                                    </div>
                                                                </td>
                                                                <td>{p.category}</td>
                                                                <td style={{ color: viewThemeColor, fontWeight: 800 }}>₹{p.sellingPrice.toFixed(2)}</td>
                                                                <td>₹{p.purchasePrice.toFixed(2)}</td>
                                                                <td>
                                                                    {p.expiryDate ? (
                                                                        <span style={{ 
                                                                            color: isExpired ? '#EF4444' : '#475569', 
                                                                            fontWeight: isExpired ? 'bold' : 'normal',
                                                                            background: isExpired ? '#FEF2F2' : 'transparent',
                                                                            padding: isExpired ? '4px 8px' : '0',
                                                                            borderRadius: isExpired ? '6px' : '0',
                                                                            display: 'inline-flex',
                                                                            alignItems: 'center',
                                                                            gap: '4px'
                                                                        }}>
                                                                            {isExpired ? '🚨 ' : ''}
                                                                            {p.expiryDate}
                                                                        </span>
                                                                    ) : (
                                                                        <span style={{ color: '#94A3B8', fontStyle: 'italic' }}>No Expiry</span>
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    <div style={{ display: 'flex', gap: 8 }}>
                                                                        <button onClick={() => setEditingProduct(p)} className="action-icon-btn text-blue">
                                                                            <Edit2 size={14} />
                                                                        </button>
                                                                        <button onClick={() => window.confirm(`Delete ${p.name}?`) && deleteProduct(p.id)} className="action-icon-btn text-red">
                                                                            <Trash2 size={14} />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="custom-view-container">
                                    <div className="view-title-row">
                                        <h2>Daily Stock Movement logs (Today)</h2>
                                    </div>
                                    
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        {/* Items Sold Today */}
                                        <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '20px', border: '1px solid #E2E8F0' }}>
                                            <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#1A1A2E', marginBottom: '12px' }}>Items Sold Today</h4>
                                            <div className="custom-table-wrapper">
                                                <table className="custom-table">
                                                    <thead>
                                                        <tr>
                                                            <th>Item Name</th>
                                                            <th>Qty Sold</th>
                                                            <th>Sales Rev</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {(() => {
                                                            const todayStr = new Date().toISOString().slice(0, 10);
                                                            const soldMap: Record<string, { qty: number; revenue: number }> = {};
                                                            invoices.filter(i => i.invoiceType === 'sale' && i.date === todayStr).forEach(inv => {
                                                                (inv.items || []).forEach(it => {
                                                                    if (!soldMap[it.name]) soldMap[it.name] = { qty: 0, revenue: 0 };
                                                                    soldMap[it.name].qty += it.qty;
                                                                    soldMap[it.name].revenue += it.amount;
                                                                });
                                                            });

                                                            const soldItems = Object.entries(soldMap);
                                                            if (soldItems.length === 0) {
                                                                return (
                                                                    <tr>
                                                                        <td colSpan={3} style={{ textAlign: 'center', color: '#A0AEC0', fontSize: '11px', padding: '12px' }}>No items sold today.</td>
                                                                    </tr>
                                                                );
                                                            }

                                                            return soldItems.map(([name, val], k) => (
                                                                <tr key={k}>
                                                                    <td><strong>{name}</strong></td>
                                                                    <td>{val.qty} pcs</td>
                                                                    <td style={{ color: '#38A169', fontWeight: 700 }}>₹{val.revenue.toFixed(2)}</td>
                                                                </tr>
                                                            ));
                                                        })()}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        {/* Items Purchased Today */}
                                        <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '20px', border: '1px solid #E2E8F0' }}>
                                            <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#1A1A2E', marginBottom: '12px' }}>Items Purchased Today</h4>
                                            <div className="custom-table-wrapper">
                                                <table className="custom-table">
                                                    <thead>
                                                        <tr>
                                                            <th>Ingredient / Item</th>
                                                            <th>Cost</th>
                                                            <th>Method</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {(() => {
                                                            const todayStr = new Date().toISOString().slice(0, 10);
                                                            const purchased = expenses.filter(e => e.date === todayStr && e.category === 'Food Stock');
                                                            if (purchased.length === 0) {
                                                                return (
                                                                    <tr>
                                                                        <td colSpan={3} style={{ textAlign: 'center', color: '#A0AEC0', fontSize: '11px', padding: '12px' }}>No kitchen purchases recorded today.</td>
                                                                    </tr>
                                                                );
                                                            }

                                                            return purchased.map((e, k) => (
                                                                <tr key={k}>
                                                                    <td><strong>{e.description}</strong></td>
                                                                    <td style={{ color: '#E53E3E', fontWeight: 700 }}>₹{e.amount.toFixed(2)}</td>
                                                                    <td style={{ textTransform: 'uppercase', fontSize: '11px' }}>{e.paymentMethod}</td>
                                                                </tr>
                                                            ));
                                                        })()}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* VIEW 3: BILLS & SALES LEDGER */}
                        {activeView === 'billing' && (
                            <div className="custom-view-container">
                                <div className="view-title-row">
                                    <h2>Bills & Sales Registry</h2>
                                </div>

                                {/* Sub-tab selection */}
                                <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px', marginBottom: '20px' }}>
                                    <button
                                        onClick={() => setBillingTab('invoices')}
                                        className={`sub-tab-btn ${billingTab === 'invoices' ? 'active' : ''}`}
                                        style={{
                                            background: billingTab === 'invoices' ? secondaryBg : 'transparent',
                                            color: billingTab === 'invoices' ? primaryColor : '#718096',
                                            border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer'
                                        }}
                                    >
                                        📄 Daily Sales History
                                    </button>
                                    <button
                                        onClick={() => setBillingTab('customers')}
                                        className={`sub-tab-btn ${billingTab === 'customers' ? 'active' : ''}`}
                                        style={{
                                            background: billingTab === 'customers' ? secondaryBg : 'transparent',
                                            color: billingTab === 'customers' ? primaryColor : '#718096',
                                            border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer'
                                        }}
                                    >
                                        👥 Customer Ledgers & Loans
                                    </button>
                                    <button
                                        onClick={() => setBillingTab('daily')}
                                        className={`sub-tab-btn ${billingTab === 'daily' ? 'active' : ''}`}
                                        style={{
                                            background: billingTab === 'daily' ? secondaryBg : 'transparent',
                                            color: billingTab === 'daily' ? primaryColor : '#718096',
                                            border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer'
                                        }}
                                    >
                                        📊 Shift Z-Reports
                                    </button>
                                </div>

                                {billingTab === 'invoices' && (
                                    <div className="custom-table-wrapper">
                                        <table className="custom-table">
                                            <thead>
                                                <tr>
                                                    <th>Bill No</th>
                                                    <th>Date</th>
                                                    <th>Customer / Loc</th>
                                                    <th>Payment</th>
                                                    <th>Grand Total</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {invoices.filter(i => i.invoiceType === 'sale').length === 0 ? (
                                                    <tr>
                                                        <td colSpan={6} style={{ textAlign: 'center', color: '#A0AEC0', padding: '30px' }}>No completed orders found.</td>
                                                    </tr>
                                                ) : (
                                                    invoices.filter(i => i.invoiceType === 'sale').map(inv => (
                                                        <tr key={inv.id}>
                                                            <td><strong>{inv.invoiceNumber}</strong></td>
                                                            <td>{formatDate(inv.date)}</td>
                                                            <td>{inv.partyName}</td>
                                                            <td style={{ textTransform: 'uppercase', fontWeight: 700 }}>{inv.paymentMethod}</td>
                                                            <td style={{ color: primaryColor, fontWeight: 800 }}>₹{inv.grandTotal.toFixed(2)}</td>
                                                            <td>
                                                                <button onClick={() => setViewingReceipt(inv)} className="view-receipt-action-btn" style={{ borderColor: primaryColor, color: primaryColor }}>
                                                                    📜 View Receipt
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {billingTab === 'customers' && (
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '20px' }}>
                                        {/* Customer selection list */}
                                        <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                                            <h4 style={{ fontSize: '13px', fontWeight: 800, margin: '0 0 12px 0' }}>Outstanding Loan Balances</h4>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '350px', overflowY: 'auto' }} className="no-scrollbar">
                                                {parties.length === 0 ? (
                                                    <p style={{ color: '#A0AEC0', fontSize: '12px', padding: '10px' }}>No customers registered. Create one in the settings Counter/Party lists.</p>
                                                ) : (
                                                    parties.map(p => (
                                                        <div 
                                                            key={p.id}
                                                            onClick={() => setSelectedCustomerLedger(p)}
                                                            style={{
                                                                background: selectedCustomerLedger?.id === p.id ? secondaryBg : 'white',
                                                                borderColor: selectedCustomerLedger?.id === p.id ? primaryColor : '#E2E8F0',
                                                                borderWidth: '1.5px', borderStyle: 'solid',
                                                                padding: '12px', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s'
                                                            }}
                                                        >
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <strong>{p.name}</strong>
                                                                <span style={{ color: p.balance > 0 ? '#E53E3E' : '#718096', fontWeight: 800 }}>₹{p.balance.toFixed(2)}</span>
                                                            </div>
                                                            <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#718096' }}>Phone: {p.phone || 'N/A'} || Limit: ₹{p.creditLimit || 50000}</p>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>

                                        {/* Ledger repayer details */}
                                        {selectedCustomerLedger ? (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                                <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                                                    <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#1A1A2E', margin: '0 0 8px 0' }}>{selectedCustomerLedger.name} Ledger</h3>
                                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px', margin: '12px 0' }}>
                                                        <div>Outstanding Balance: <strong style={{ color: '#E53E3E' }}>₹{selectedCustomerLedger.balance.toFixed(2)}</strong></div>
                                                        <div>Credit Limit: <strong>₹{selectedCustomerLedger.creditLimit || 50000}</strong></div>
                                                        <div>Loyalty Points: <strong style={{ color: primaryColor }}>{selectedCustomerLedger.loyaltyPoints || 0} pts</strong></div>
                                                        <div>Phone: <strong>{selectedCustomerLedger.phone || 'N/A'}</strong></div>
                                                    </div>
                                                    
                                                    {/* Record repayment form */}
                                                    <form onSubmit={handleRecordRepayment} style={{ background: 'white', padding: '12px', borderRadius: '12px', border: '1px solid #E2E8F0', marginTop: '12px' }}>
                                                        <h5 style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 800 }}>Record Customer Repayment</h5>
                                                        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                                            <input 
                                                                type="number"
                                                                placeholder="Amount paid (₹)"
                                                                className="modal-input"
                                                                value={repaymentAmount}
                                                                onChange={e => setRepaymentAmount(e.target.value)}
                                                                style={{ flex: 1 }}
                                                            />
                                                            <select 
                                                                value={repaymentMethod}
                                                                onChange={e => setRepaymentMethod(e.target.value as any)}
                                                                className="modal-input"
                                                                style={{ width: '100px' }}
                                                            >
                                                                <option value="cash">Cash</option>
                                                                <option value="upi">UPI</option>
                                                                <option value="bank">Bank</option>
                                                            </select>
                                                        </div>
                                                        <input 
                                                            placeholder="Repayment details (optional)"
                                                            className="modal-input"
                                                            value={repaymentNote}
                                                            onChange={e => setRepaymentNote(e.target.value)}
                                                            style={{ width: '100%', marginBottom: '8px' }}
                                                        />
                                                        <button 
                                                            type="submit" 
                                                            className="save-btn" 
                                                            style={{ background: primaryColor, width: '100%' }}
                                                        >
                                                            Submit Repayment
                                                        </button>
                                                    </form>
                                                </div>

                                                {/* Repayments History */}
                                                <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                                                    <h4 style={{ fontSize: '13px', fontWeight: 800, margin: '0 0 10px 0' }}>Repayments Log</h4>
                                                    <div className="custom-table-wrapper" style={{ maxHeight: '180px', overflowY: 'auto' }}>
                                                        <table className="custom-table" style={{ background: 'white', borderRadius: '8px' }}>
                                                            <thead>
                                                                <tr>
                                                                    <th>Date</th>
                                                                    <th>Paid</th>
                                                                    <th>Method</th>
                                                                    <th>Balance</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {(!selectedCustomerLedger.paymentHistory || selectedCustomerLedger.paymentHistory.length === 0) ? (
                                                                    <tr>
                                                                        <td colSpan={4} style={{ textAlign: 'center', fontSize: '11px', color: '#A0AEC0', padding: '10px' }}>No repayments recorded.</td>
                                                                    </tr>
                                                                ) : (
                                                                    selectedCustomerLedger.paymentHistory.map((rep: any, idx: number) => (
                                                                        <tr key={idx}>
                                                                            <td>{formatDate(rep.date)}</td>
                                                                            <td style={{ color: '#38A169', fontWeight: 700 }}>₹{rep.amount.toFixed(2)}</td>
                                                                            <td style={{ textTransform: 'uppercase', fontSize: '10px' }}>{rep.method}</td>
                                                                            <td>₹{rep.balanceAfter.toFixed(2)}</td>
                                                                        </tr>
                                                                    ))
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px', background: '#FAFAFA', borderRadius: '16px', border: '1px dashed #CBD5E0', color: '#718096', fontSize: '13px' }}>
                                                Select a customer card from the ledger list to manage credit loans.
                                            </div>
                                        )}
                                    </div>
                                )}

                                {billingTab === 'daily' && (
                                    <div className="custom-table-wrapper">
                                        <table className="custom-table">
                                            <thead>
                                                <tr>
                                                    <th>Biller</th>
                                                    <th>Closing Time</th>
                                                    <th>Opening Float</th>
                                                    <th>Live Cash Sales</th>
                                                    <th>Expected Drawer</th>
                                                    <th>Counted Drawer</th>
                                                    <th>Discrepancy</th>
                                                    <th>Print Z-Report</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {recentZReports.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={8} style={{ textAlign: 'center', color: '#A0AEC0', padding: '30px' }}>No shift closing Z-Reports found. Close a register shift to generate one.</td>
                                                    </tr>
                                                ) : (
                                                    recentZReports.map((rep: any, idx: number) => (
                                                        <tr key={idx}>
                                                            <td><strong>{rep.biller}</strong></td>
                                                            <td>{new Date(rep.closingTime).toLocaleString()}</td>
                                                            <td>₹{rep.openingFloat.toFixed(2)}</td>
                                                            <td>₹{rep.cashSales.toFixed(2)}</td>
                                                            <td><strong>₹{rep.expectedCash.toFixed(2)}</strong></td>
                                                            <td style={{ color: primaryColor, fontWeight: 800 }}>₹{rep.countedCash.toFixed(2)}</td>
                                                            <td style={{ color: rep.discrepancy < 0 ? '#E53E3E' : '#38A169', fontWeight: 800 }}>
                                                                {rep.discrepancy === 0 ? '₹0.00' : rep.discrepancy > 0 ? `+₹${rep.discrepancy.toFixed(2)}` : `-₹${Math.abs(rep.discrepancy).toFixed(2)}`}
                                                            </td>
                                                            <td>
                                                                <button 
                                                                    onClick={() => {
                                                                        setViewingReceipt({
                                                                            id: rep.id,
                                                                            companyId: company.id,
                                                                            invoiceType: 'estimate',
                                                                            invoiceNumber: 'Z-REPORT-' + new Date(rep.closingTime).toISOString().slice(0,10),
                                                                            date: new Date().toISOString().slice(0, 10),
                                                                            items: [
                                                                                { name: 'Opening Cash Float', qty: 1, unit: 'pcs', rate: rep.openingFloat, discount: 0, discountAmt: 0, taxableAmt: 0, gstRate: 0 as any, cgst: 0, sgst: 0, igst: 0, cess: 0, totalGst: 0, amount: rep.openingFloat },
                                                                                { name: 'Cash Sales', qty: 1, unit: 'pcs', rate: rep.cashSales, discount: 0, discountAmt: 0, taxableAmt: 0, gstRate: 0 as any, cgst: 0, sgst: 0, igst: 0, cess: 0, totalGst: 0, amount: rep.cashSales },
                                                                                { name: 'UPI/Card Sales', qty: 1, unit: 'pcs', rate: rep.upiSales + rep.cardSales, discount: 0, discountAmt: 0, taxableAmt: 0, gstRate: 0 as any, cgst: 0, sgst: 0, igst: 0, cess: 0, totalGst: 0, amount: rep.upiSales + rep.cardSales },
                                                                                { name: 'Credit/Loan Sales', qty: 1, unit: 'pcs', rate: rep.creditSales, discount: 0, discountAmt: 0, taxableAmt: 0, gstRate: 0 as any, cgst: 0, sgst: 0, igst: 0, cess: 0, totalGst: 0, amount: rep.creditSales }
                                                                            ],
                                                                            subTotal: rep.totalSales,
                                                                            totalDiscount: 0, taxableAmount: rep.totalSales,
                                                                            totalCgst: 0, totalSgst: 0, totalIgst: 0, totalCess: 0, totalGst: 0,
                                                                            shippingCharges: 0, packingCharges: 0, adjustmentAmount: 0, roundOff: 0,
                                                                            grandTotal: rep.expectedCash,
                                                                            paymentStatus: 'paid', amountPaid: rep.countedCash, balanceDue: rep.discrepancy,
                                                                            payments: [], paymentMethod: 'cash',
                                                                            partyName: 'Daily Closing Z-Report',
                                                                            notes: `Expected: ₹${rep.expectedCash.toFixed(2)} || Counted: ₹${rep.countedCash.toFixed(2)} || Diff: ₹${rep.discrepancy.toFixed(2)}`,
                                                                            isGstBill: false, isHidden: false, isPrivate: false,
                                                                            createdAt: rep.closingTime, updatedAt: rep.closingTime
                                                                        });
                                                                    }}
                                                                    className="view-receipt-action-btn"
                                                                    style={{ borderColor: primaryColor, color: primaryColor }}
                                                                >
                                                                    📜 Print report
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* VIEW 4: EXPENSES LOGGER */}
                        {activeView === 'expenses' && (
                            <div className="custom-view-container">
                                <div className="view-title-row">
                                    <h2>Expense Management</h2>
                                    <span style={{ color: '#E53E3E', fontWeight: 800 }}>Total Costs: ₹{totalExpenses.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                                </div>

                                <div className="expense-logger-grid">
                                    {/* Expense Form */}
                                    <form onSubmit={handleAddExpense} className="expense-form-card" style={{ border: `1px solid ${accentBorder}` }}>
                                        <h4>Log Food Cost / Operations Expense</h4>
                                        <div className="form-group">
                                            <label>Expense Category</label>
                                            <select value={expenseForm.category} onChange={e => setExpenseForm(f => ({ ...f, category: e.target.value }))} className="modal-input">
                                                <option value="Food Stock">Food Stock (Ingredients)</option>
                                                <option value="Staff Salaries">Staff Salaries</option>
                                                <option value="Rent & Utilities">Rent & Utilities</option>
                                                <option value="Marketing">Marketing / Vouchers</option>
                                                <option value="Other">Other Operational Cost</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Description *</label>
                                            <input 
                                                placeholder="e.g. Bought fresh organic berries" 
                                                value={expenseForm.description} 
                                                onChange={e => setExpenseForm(f => ({ ...f, description: e.target.value }))}
                                                className="modal-input"
                                            />
                                        </div>
                                        <div className="form-row-grid">
                                            <div className="form-group">
                                                <label>Amount (₹) *</label>
                                                <input 
                                                    type="number" 
                                                    placeholder="0.00" 
                                                    value={expenseForm.amount} 
                                                    onChange={e => setExpenseForm(f => ({ ...f, amount: e.target.value }))}
                                                    className="modal-input"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Method</label>
                                                <select value={expenseForm.paymentMethod} onChange={e => setExpenseForm(f => ({ ...f, paymentMethod: e.target.value }))} className="modal-input">
                                                    <option value="cash">Cash</option>
                                                    <option value="upi">UPI</option>
                                                    <option value="card">Card</option>
                                                </select>
                                            </div>
                                        </div>
                                        <button type="submit" className="save-btn" style={{ background: primaryColor, width: '100%', marginTop: '10px' }}>
                                            Record Expense
                                        </button>
                                    </form>

                                    {/* Expense List */}
                                    <div className="expense-list-card">
                                        <h4>Recent Outlays</h4>
                                        <div className="expense-items-scroll no-scrollbar">
                                            {expenses.length === 0 ? (
                                                <p style={{ color: '#A0AEC0', fontSize: 13, textAlign: 'center', padding: '20px' }}>No expenses logged yet.</p>
                                            ) : (
                                                expenses.map(exp => (
                                                    <div key={exp.id} className="expense-item-row-card">
                                                        <div>
                                                            <p style={{ fontWeight: 800, fontSize: 13, color: '#1A1A2E', margin: 0 }}>{exp.description}</p>
                                                            <p style={{ fontSize: 11, color: '#A0AEC0', margin: '2px 0 0' }}>{exp.category} • {formatDate(exp.date)}</p>
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                            <span style={{ fontWeight: 800, color: '#E53E3E' }}>- ₹{exp.amount.toFixed(2)}</span>
                                                            <button onClick={() => confirm('Delete expense?') && deleteExpense(exp.id)} className="action-icon-btn text-red">
                                                                <Trash2 size={13} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* VIEW 5: REPORTS & CHARTS */}
                        {activeView === 'reports' && (
                            <div className="custom-view-container">
                                <div className="view-title-row">
                                    <h2>Sales & Revenue Analytics</h2>
                                </div>

                                <div className="analytics-kpi-grid">
                                    <div className="analytics-card" style={{ borderLeft: `4px solid ${primaryColor}` }}>
                                        <p className="kpi-lbl">Total Earned Revenue</p>
                                        <h3>₹{totalEarnings.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h3>
                                    </div>
                                    <div className="analytics-card" style={{ borderLeft: `4px solid #10B981` }}>
                                        <p className="kpi-lbl">Net Operational Costs</p>
                                        <h3 style={{ color: '#E53E3E' }}>₹{totalExpenses.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h3>
                                    </div>
                                    <div className="analytics-card" style={{ borderLeft: `4px solid #FBBC04` }}>
                                        <p className="kpi-lbl">Completed Orders</p>
                                        <h3>{invoices.filter(i => i.invoiceType === 'sale').length} tickets</h3>
                                    </div>
                                </div>

                                {/* Daily Sales Trend Chart */}
                                {(() => {
                                    const salesMap: Record<string, number> = {};
                                    // Get last 7 days
                                    for (let i = 6; i >= 0; i--) {
                                        const d = new Date();
                                        d.setDate(d.getDate() - i);
                                        const dateStr = d.toISOString().slice(0, 10);
                                        salesMap[dateStr] = 0;
                                    }
                                    
                                    invoices.filter(i => i.invoiceType === 'sale').forEach(inv => {
                                        if (salesMap[inv.date] !== undefined) {
                                            salesMap[inv.date] += inv.grandTotal;
                                        }
                                    });
                                    
                                    const chartData = Object.entries(salesMap).map(([date, amount]) => ({
                                        name: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                                        Sales: amount
                                    }));

                                    return (
                                        <div style={{ background: '#FAFAFA', borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
                                            <h4 style={{ margin: '0 0 16px 0', fontSize: '13px', fontWeight: 800, color: '#1E293B' }}>Weekly POS Sales Revenue Trend</h4>
                                            <div style={{ width: '100%', height: 200 }}>
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                                        <defs>
                                                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="5%" stopColor={primaryColor} stopOpacity={0.4}/>
                                                                <stop offset="95%" stopColor={primaryColor} stopOpacity={0.0}/>
                                                            </linearGradient>
                                                        </defs>
                                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                                        <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#718096' }} axisLine={false} tickLine={false} />
                                                        <YAxis tick={{ fontSize: 10, fill: '#718096' }} axisLine={false} tickLine={false} />
                                                        <Tooltip contentStyle={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '11px' }} />
                                                        <Area type="monotone" dataKey="Sales" stroke={primaryColor} strokeWidth={2.5} fillOpacity={1} fill="url(#colorSales)" />
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    );
                                })()}

                                <div className="top-selling-dishes-card">
                                    <h4>Top Selling Menu Items</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
                                        {topDishes.length === 0 ? (
                                            <p style={{ color: '#A0AEC0', fontSize: 13 }}>Seeding menu sales data is required to compute rankings.</p>
                                        ) : (
                                            topDishes.map((dish, i) => {
                                                const maxQty = topDishes[0]?.qty || 1;
                                                const percentage = (dish.qty / maxQty) * 100;
                                                return (
                                                    <div key={i}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
                                                            <span>{dish.name}</span>
                                                            <span style={{ color: primaryColor }}>{dish.qty} units sold</span>
                                                        </div>
                                                        <div className="progress-bar-bg">
                                                            <div className="progress-bar-fill" style={{ width: `${percentage}%`, background: primaryColor }} />
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* VIEW: APP ORDERS (Direct + Delivery Partners) */}
                        {activeView === 'app-orders' && (
                            <div className="custom-view-container">
                                <div className="view-title-row">
                                    <div>
                                        <h2>📱 App & Delivery Orders</h2>
                                        <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#718096' }}>
                                            Manage incoming orders from Direct App, Zomato, Swiggy & other platforms
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        {/* Platform badges */}
                                        {deliveryIntegrations.map((di: any) => (
                                            <span key={di.platform} style={{
                                                display: 'flex', alignItems: 'center', gap: '4px',
                                                background: di.enabled ? di.color + '15' : '#F1F5F9',
                                                border: `1px solid ${di.enabled ? di.color + '40' : '#E2E8F0'}`,
                                                padding: '4px 10px', borderRadius: '20px',
                                                fontSize: '11px', fontWeight: 700,
                                                color: di.enabled ? di.color : '#94A3B8'
                                            }}>
                                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: di.enabled ? '#22C55E' : '#CBD5E0', flexShrink: 0 }} />
                                                {di.icon} {di.platform}
                                            </span>
                                        ))}
                                        <button
                                            onClick={() => setShowDeliverySettings(!showDeliverySettings)}
                                            className="view-action-btn"
                                            style={{ background: '#64748B', padding: '8px 14px' }}
                                        >
                                            ⚙️ API Settings
                                        </button>
                                    </div>
                                </div>

                                {/* Delivery API Settings Panel */}
                                {showDeliverySettings && (
                                    <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '20px', marginBottom: '20px', border: '1px solid #E2E8F0' }}>
                                        <h4 style={{ margin: '0 0 16px 0', fontSize: '13px', fontWeight: 800 }}>🔌 Delivery Platform API Integration</h4>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                                            {deliveryIntegrations.map((di: any, idx: number) => (
                                                <div key={di.platform} style={{ background: 'white', borderRadius: '12px', padding: '16px', border: `1px solid ${di.enabled ? di.color + '30' : '#E2E8F0'}` }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                            <span style={{ fontSize: '20px' }}>{di.icon}</span>
                                                            <strong style={{ fontSize: '13px', color: di.color }}>{di.platform}</strong>
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                            <span style={{ fontSize: '11px', color: di.enabled ? '#22C55E' : '#94A3B8', fontWeight: 700 }}>{di.enabled ? 'Active' : 'Inactive'}</span>
                                                            <button
                                                                onClick={() => {
                                                                    const updated = deliveryIntegrations.map((d: any, i: number) => i === idx ? { ...d, enabled: !d.enabled } : d);
                                                                    setDeliveryIntegrations(updated);
                                                                    toast.success(`${di.platform} ${!di.enabled ? 'enabled' : 'disabled'}!`);
                                                                }}
                                                                style={{
                                                                    width: '36px', height: '20px', borderRadius: '10px',
                                                                    background: di.enabled ? di.color : '#E2E8F0',
                                                                    border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s'
                                                                }}
                                                            >
                                                                <span style={{
                                                                    position: 'absolute', top: '2px',
                                                                    left: di.enabled ? '18px' : '2px',
                                                                    width: '16px', height: '16px', borderRadius: '50%',
                                                                    background: 'white', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                                                                }} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                        <input
                                                            placeholder="Restaurant ID / Branch Code"
                                                            value={di.restaurantId}
                                                            onChange={e => {
                                                                const updated = deliveryIntegrations.map((d: any, i: number) => i === idx ? { ...d, restaurantId: e.target.value } : d);
                                                                setDeliveryIntegrations(updated);
                                                            }}
                                                            className="modal-input"
                                                            style={{ fontSize: '12px', padding: '8px 12px' }}
                                                        />
                                                        <input
                                                            placeholder={di.platform === 'Direct' ? 'App Store ID / URL' : 'API Key / Access Token'}
                                                            value={di.apiKey}
                                                            type={di.platform === 'Direct' ? 'text' : 'password'}
                                                            onChange={e => {
                                                                const updated = deliveryIntegrations.map((d: any, i: number) => i === idx ? { ...d, apiKey: e.target.value } : d);
                                                                setDeliveryIntegrations(updated);
                                                            }}
                                                            className="modal-input"
                                                            style={{ fontSize: '12px', padding: '8px 12px' }}
                                                        />
                                                        <button
                                                            onClick={() => {
                                                                toast.success(`${di.platform} settings saved!`);
                                                            }}
                                                            style={{ background: di.color, color: 'white', border: 'none', borderRadius: '8px', padding: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                                                        >
                                                            Save {di.platform} Config
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <p style={{ margin: '12px 0 0', fontSize: '11px', color: '#94A3B8' }}>
                                            ⚠️ Zomato, Swiggy & Dunzo APIs require business approval. Contact your account manager to get API credentials. Direct orders work without API keys.
                                        </p>
                                        <div style={{ marginTop: '16px', background: '#EFF6FF', border: '1px dashed #BFDBFE', padding: '12px 16px', borderRadius: '12px' }}>
                                            <p style={{ margin: '0 0 6px 0', fontSize: '11px', fontWeight: 800, color: '#1E40AF' }}>📥 Live Delivery Webhook URL (POST):</p>
                                            <code style={{ fontSize: '10px', wordBreak: 'break-all', display: 'block', background: 'white', padding: '8px', borderRadius: '6px', border: '1px solid #D1E2FF', color: '#1A1A2E' }}>
                                                {typeof window !== 'undefined' ? window.location.origin : ''}/api/webhooks/delivery?companyId={company.id}
                                            </code>
                                        </div>
                                    </div>
                                )}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', minHeight: '400px' }} className="app-orders-kanban">
                                    {/* Column 1: Incoming / Pending */}
                                    <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '16px', border: '1px solid #E2E8F0' }}>
                                        <h4 style={{ fontSize: '13px', fontWeight: 900, color: 'white', background: '#718096', padding: '6px 12px', borderRadius: '8px', margin: '0 0 16px 0', textAlign: 'center' }}>INCOMING ({appOrders.filter((o: any) => o.status === 'pending').length})</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            {appOrders.filter((o: any) => o.status === 'pending').map((order: any) => {
                                                const plat = deliveryIntegrations.find((d: any) => d.platform === order.channel);
                                                return (
                                                    <div key={order.id} style={{ background: 'white', borderRadius: '12px', padding: '12px', border: '1.5px solid #CBD5E0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                                            <span style={{ fontSize: '11px', fontWeight: 900, color: 'white', background: plat?.color || '#718096', padding: '2px 8px', borderRadius: '6px' }}>
                                                                {plat?.icon} {order.channel}
                                                             </span>
                                                             <span style={{ fontSize: '10px', color: '#A0AEC0' }}>{order.time}</span>
                                                        </div>
                                                        <p style={{ fontSize: '12px', fontWeight: 800, color: '#1A1A2E', margin: '0 0 2px 0' }}>{order.customer}</p>
                                                        {order.phone && <p style={{ fontSize: '10px', color: '#94A3B8', margin: '0 0 4px 0' }}>📞 {order.phone}</p>}
                                                        <p style={{ fontSize: '11px', color: '#718096', margin: '0 0 8px 0' }}>{order.items.map((i: any) => `${i.qty}x ${i.name}`).join(', ')}</p>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <span style={{ fontSize: '13px', fontWeight: 900, color: primaryColor }}>₹{order.total.toFixed(2)}</span>
                                                            <button 
                                                                onClick={() => {
                                                                    const updated = appOrders.map((o: any) => o.id === order.id ? { ...o, status: 'preparing' } : o);
                                                                    setAppOrders(updated);
                                                                    // Push to KDS
                                                                    const kdsOrd = { id: order.id, tableNum: 'Delivery', area: order.channel, items: order.items, status: 'new' as const, orderedAt: new Date().toISOString(), servedBy: order.channel };
                                                                    setKitchenOrders((prev: any) => [kdsOrd, ...prev]);
                                                                    toast.success('Order accepted! Moved to kitchen.');
                                                                }}
                                                                style={{ border: 'none', background: primaryColor, color: 'white', padding: '5px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 800, cursor: 'pointer' }}
                                                            >
                                                                ✓ Accept
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                            {appOrders.filter((o: any) => o.status === 'pending').length === 0 && (
                                                <div style={{ textAlign: 'center', color: '#A0AEC0', fontSize: '12px', padding: '20px' }}>No incoming orders</div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Column 2: Preparing */}
                                    <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '16px', border: '1px solid #E2E8F0' }}>
                                        <h4 style={{ fontSize: '13px', fontWeight: 900, color: 'white', background: '#ED8936', padding: '6px 12px', borderRadius: '8px', margin: '0 0 16px 0', textAlign: 'center' }}>PREPARING ({appOrders.filter((o: any) => o.status === 'preparing').length})</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            {appOrders.filter((o: any) => o.status === 'preparing').map((order: any) => (
                                                <div key={order.id} style={{ background: 'white', borderRadius: '12px', padding: '12px', border: '1.5px solid #ED8936', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                                                    <p style={{ fontSize: '12px', fontWeight: 800, color: '#1A1A2E', margin: '0 0 4px 0' }}>{order.customer}</p>
                                                    <p style={{ fontSize: '11px', color: '#718096', margin: '0 0 8px 0' }}>{order.items.map((i: any) => `${i.qty}x ${i.name}`).join(', ')}</p>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <span style={{ fontSize: '13px', fontWeight: 900, color: primaryColor }}>₹{order.total.toFixed(2)}</span>
                                                        <button 
                                                            onClick={() => {
                                                                const updated = appOrders.map((o: any) => o.id === order.id ? { ...o, status: 'dispatched' } : o);
                                                                setAppOrders(updated);
                                                                toast.success('Food ready! Order dispatched.');
                                                            }}
                                                            style={{ border: 'none', background: '#ED8936', color: 'white', padding: '5px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 800, cursor: 'pointer' }}
                                                        >
                                                            🚀 Dispatch
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Column 3: Dispatched */}
                                    <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '16px', border: '1px solid #E2E8F0' }}>
                                        <h4 style={{ fontSize: '13px', fontWeight: 900, color: 'white', background: '#4299E1', padding: '6px 12px', borderRadius: '8px', margin: '0 0 16px 0', textAlign: 'center' }}>OUT FOR DELIVERY ({appOrders.filter((o: any) => o.status === 'dispatched').length})</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            {appOrders.filter((o: any) => o.status === 'dispatched').map((order: any) => (
                                                <div key={order.id} style={{ background: 'white', borderRadius: '12px', padding: '12px', border: '1.5px solid #4299E1' }}>
                                                    <p style={{ fontSize: '12px', fontWeight: 800, color: '#1A1A2E', margin: '0 0 4px 0' }}>{order.customer}</p>
                                                    {order.address && <p style={{ fontSize: '10px', color: '#94A3B8', margin: '0 0 4px 0' }}>📍 {order.address}</p>}
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <span style={{ fontSize: '13px', fontWeight: 900, color: primaryColor }}>₹{order.total.toFixed(2)}</span>
                                                        <button 
                                                            onClick={() => {
                                                                const invNum = order.id.toUpperCase();
                                                                const newId = Math.random().toString(36).slice(2) + Date.now().toString(36);
                                                                addInvoice({
                                                                    id: newId, companyId: company.id, invoiceType: 'sale',
                                                                    invoiceNumber: invNum, date: new Date().toISOString().slice(0, 10),
                                                                    items: order.items.map((i: any) => ({ productId: '', name: i.name, qty: i.qty, unit: 'pcs', rate: i.price, discount: 0, discountAmt: 0, taxableAmt: i.price * i.qty, gstRate: 5 as any, cgst: 0, sgst: 0, igst: 0, cess: 0, totalGst: 0, amount: i.price * i.qty })),
                                                                    subTotal: order.total, totalDiscount: 0, taxableAmount: order.total,
                                                                    totalCgst: 0, totalSgst: 0, totalIgst: 0, totalCess: 0, totalGst: 0,
                                                                    shippingCharges: 0, packingCharges: 0, adjustmentAmount: 0, roundOff: 0,
                                                                    grandTotal: order.total, paymentStatus: 'paid', amountPaid: order.total, balanceDue: 0,
                                                                    payments: [{ method: 'upi', amount: order.total, date: new Date().toISOString().slice(0, 10) }],
                                                                    paymentMethod: 'upi', partyName: `${order.channel} - ${order.customer}`,
                                                                    notes: `App Order Delivery to ${order.address}`,
                                                                    isGstBill: false, isHidden: false, isPrivate: false,
                                                                    createdAt: new Date().toISOString(),
                                                                    updatedAt: new Date().toISOString()
                                                                });
                                                                const updated = appOrders.map((o: any) => o.id === order.id ? { ...o, status: 'completed' } : o);
                                                                setAppOrders(updated);
                                                                addNotification(`\u2705 Delivery Order #${order.id} completed — ₹${order.total} from ${order.channel}`, 'billing');
                                                                toast.success('Order completed and added to sales ledger!');
                                                            }}
                                                            style={{ border: 'none', background: '#38A169', color: 'white', padding: '5px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 800, cursor: 'pointer' }}
                                                        >
                                                            ✓ Complete
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Column 4: Completed */}
                                    <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '16px', border: '1px solid #E2E8F0' }}>
                                        <h4 style={{ fontSize: '13px', fontWeight: 900, color: 'white', background: '#38A169', padding: '6px 12px', borderRadius: '8px', margin: '0 0 16px 0', textAlign: 'center' }}>COMPLETED TODAY ({appOrders.filter((o: any) => o.status === 'completed').length})</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            {appOrders.filter((o: any) => o.status === 'completed').map((order: any) => (
                                                <div key={order.id} style={{ background: 'white', borderRadius: '10px', padding: '10px', border: '1px solid #E2E8F0', opacity: 0.8 }}>
                                                    <p style={{ fontSize: '11px', fontWeight: 800, color: '#718096', textDecoration: 'line-through', margin: '0 0 2px 0' }}>{order.customer}</p>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#A0AEC0' }}>₹{order.total.toFixed(2)}</span>
                                                        <span style={{ fontSize: '10px', color: '#38A169', fontWeight: 800 }}>✓ Delivered</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* VIEW: KITCHEN DISPLAY SYSTEM (KDS) */}
                        {activeView === 'kitchen' && (
                            <div className="custom-view-container" style={{ background: '#F1F5F9', padding: '24px', borderRadius: '24px', minHeight: '80vh' }}>
                                <style>{`
                                    @keyframes kds-urgency { 0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,0.4)} 70%{box-shadow:0 0 0 8px rgba(239,68,68,0)} }
                                    @keyframes kds-fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
                                    .kds-card { animation: kds-fadeIn 0.22s ease; transition: transform 0.15s, box-shadow 0.15s !important; }
                                    .kds-card:hover { transform: translateY(-2px) !important; box-shadow: 0 8px 24px rgba(0,0,0,0.09) !important; }
                                    .kds-item-row:hover { background: #F8FAFC !important; }
                                    .kds-btn:hover { filter: brightness(1.07); transform: translateY(-1px); }
                                `}</style>

                                {/* KDS Header */}
                                <div style={{ background: 'white', borderRadius: '20px', padding: '20px 24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #E2E8F0' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                        <div style={{ width: 50, height: 50, background: 'linear-gradient(135deg, #EF4444 0%, #3B82F6 50%, #22C55E 100%)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>👨‍🍳</div>
                                        <div>
                                            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 900, color: '#0F172A' }}>Kitchen Display System</h2>
                                            <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#94A3B8' }}>Real-time order queue — mark items as cooking and ready to serve</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <div style={{ background: '#FFF1F2', border: '1.5px solid #FECDD3', borderRadius: '12px', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#EF4444', display: 'inline-block' }} />
                                            <span style={{ fontSize: '12px', fontWeight: 800, color: '#EF4444' }}>New: {kitchenOrders.filter((o: any) => o.status === 'new').length}</span>
                                        </div>
                                        <div style={{ background: '#EFF6FF', border: '1.5px solid #BFDBFE', borderRadius: '12px', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#3B82F6', display: 'inline-block' }} />
                                            <span style={{ fontSize: '12px', fontWeight: 800, color: '#3B82F6' }}>Cooking: {kitchenOrders.filter((o: any) => o.status === 'preparing').length}</span>
                                        </div>
                                        <div style={{ background: '#F0FDF4', border: '1.5px solid #BBF7D0', borderRadius: '12px', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} />
                                            <span style={{ fontSize: '12px', fontWeight: 800, color: '#22C55E' }}>Ready: {kitchenOrders.filter((o: any) => o.status === 'ready').length}</span>
                                        </div>
                                        <button onClick={() => setIsMuted(!isMuted)}
                                            style={{ background: isMuted ? '#FEE2E2' : '#DCFCE7', color: isMuted ? '#EF4444' : '#16A34A', border: 'none', borderRadius: '12px', padding: '8px 16px', fontSize: '12px', fontWeight: 800, cursor: 'pointer' }}>
                                            {isMuted ? '🔇 Muted' : '🔊 Sound On'}
                                        </button>
                                        <button onClick={() => setKitchenOrders((prev: any) => prev.filter((o: any) => o.status !== 'ready'))}
                                            style={{ background: 'white', color: '#64748B', border: '1.5px solid #E2E8F0', borderRadius: '12px', padding: '8px 16px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                                            🗑 Clear Served
                                        </button>
                                    </div>
                                </div>

                                {/* KDS Kanban Grid */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '20px', alignItems: 'start' }}>

                                    {/* ─── Column 1: NEW ORDERS (Red) ─── */}
                                    <div style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(239,68,68,0.08)', border: '1px solid #FECDD3' }}>
                                        <div style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{ width: 34, height: 34, background: 'rgba(255,255,255,0.22)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🔔</div>
                                                <div>
                                                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 900, color: 'white', letterSpacing: '0.5px' }}>NEW TICKETS</p>
                                                    <p style={{ margin: 0, fontSize: '10px', color: 'rgba(255,255,255,0.75)' }}>Awaiting chef</p>
                                                </div>
                                            </div>
                                            <span style={{ background: 'white', color: '#EF4444', borderRadius: '20px', padding: '4px 12px', fontSize: '14px', fontWeight: 900 }}>{kitchenOrders.filter((o: any) => o.status === 'new').length}</span>
                                        </div>
                                        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '160px' }}>
                                            {kitchenOrders.filter((o: any) => o.status === 'new').map((order: any) => {
                                                const elapsedMins = getSafeElapsedMins(order.orderedAt);
                                                const timeBg = elapsedMins >= 20 ? '#EF4444' : elapsedMins >= 10 ? '#F59E0B' : '#22C55E';
                                                const isUrgent = elapsedMins >= 20;
                                                return (
                                                    <div key={order.id} className="kds-card" style={{
                                                        background: 'white', borderRadius: '16px', padding: '16px',
                                                        border: '1px solid #FECDD3', borderLeft: '5px solid #EF4444',
                                                        boxShadow: isUrgent ? '0 0 0 0 rgba(239,68,68,0.4)' : '0 2px 10px rgba(239,68,68,0.06)',
                                                        animation: isUrgent ? 'kds-urgency 1.5s infinite' : 'none'
                                                    }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                                                            <div>
                                                                <p style={{ margin: 0, fontSize: '14px', fontWeight: 900, color: '#0F172A' }}>
                                                                    🪑 {order.area} {order.tableNum !== 'Delivery' ? `· T${order.tableNum}` : '· 🛵 Delivery'}
                                                                </p>
                                                                <p style={{ margin: '3px 0 0', fontSize: '10px', color: '#94A3B8', fontWeight: 600 }}>
                                                                    {getSafeTimeString(order.orderedAt)}
                                                                    {order.servedBy && ` · ${order.servedBy}`}
                                                                </p>
                                                            </div>
                                                            <span style={{ background: timeBg, color: 'white', fontSize: '10px', fontWeight: 800, padding: '4px 9px', borderRadius: '8px' }}>⏱ {elapsedMins}m</span>
                                                        </div>
                                                        <div style={{ background: '#FFF5F5', borderRadius: '12px', padding: '10px 12px', marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                            {order.items.map((item: any, idx: number) => {
                                                                const itemKey = `${order.id}-${idx}`;
                                                                const isChecked = !!checkedItems[itemKey];
                                                                return (
                                                                    <div key={idx} className="kds-item-row"
                                                                        onClick={() => setCheckedItems((prev: any) => ({ ...prev, [itemKey]: !isChecked }))}
                                                                        style={{ display: 'flex', alignItems: 'center', gap: '9px', background: isChecked ? '#F1F5F9' : 'transparent', borderRadius: '8px', padding: '5px 8px', cursor: 'pointer', transition: 'background 0.15s', opacity: isChecked ? 0.5 : 1 }}>
                                                                        <input type="checkbox" checked={isChecked} readOnly style={{ accentColor: '#EF4444', cursor: 'pointer', flexShrink: 0 }} />
                                                                        <span style={{ background: '#EF4444', color: 'white', borderRadius: '6px', padding: '2px 8px', fontSize: '11px', fontWeight: 900, flexShrink: 0 }}>×{item.qty}</span>
                                                                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B', textDecoration: isChecked ? 'line-through' : 'none' }}>{item.name}</span>
                                                                        {item.notes && <span style={{ fontSize: '10px', color: '#F59E0B', marginLeft: 'auto', fontWeight: 700 }}>📝 {item.notes}</span>}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                        <button className="kds-btn"
                                                            onClick={() => { const updated = kitchenOrders.map((o: any) => o.id === order.id ? { ...o, status: 'preparing' as const } : o); setKitchenOrders(updated); toast.success('Order started cooking!'); }}
                                                            style={{ width: '100%', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', border: 'none', borderRadius: '12px', padding: '11px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', transition: 'all 0.15s' }}>
                                                            🍳 Start Cooking
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                            {kitchenOrders.filter((o: any) => o.status === 'new').length === 0 && (
                                                <div style={{ textAlign: 'center', padding: '36px 20px' }}>
                                                    <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎉</div>
                                                    <p style={{ fontWeight: 700, color: '#94A3B8', margin: '0 0 4px', fontSize: '14px' }}>All caught up!</p>
                                                    <p style={{ fontSize: '12px', color: '#CBD5E1', margin: 0 }}>No new tickets right now</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* ─── Column 2: COOKING (Yellow/Amber) ─── */}
                                    <div style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(245,158,11,0.08)', border: '1px solid #FDE68A' }}>
                                        <div style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{ width: 34, height: 34, background: 'rgba(255,255,255,0.22)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🍳</div>
                                                <div>
                                                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 900, color: 'white', letterSpacing: '0.5px' }}>COOKING NOW</p>
                                                    <p style={{ margin: 0, fontSize: '10px', color: 'rgba(255,255,255,0.75)' }}>Being prepared</p>
                                                </div>
                                            </div>
                                            <span style={{ background: 'white', color: '#D97706', borderRadius: '20px', padding: '4px 12px', fontSize: '14px', fontWeight: 900 }}>{kitchenOrders.filter((o: any) => o.status === 'preparing').length}</span>
                                        </div>
                                        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '160px' }}>
                                            {kitchenOrders.filter((o: any) => o.status === 'preparing').map((order: any) => {
                                                const elapsedMins = getSafeElapsedMins(order.orderedAt);
                                                const timeBg = elapsedMins >= 20 ? '#EF4444' : elapsedMins >= 10 ? '#F59E0B' : '#22C55E';
                                                return (
                                                    <div key={order.id} className="kds-card" style={{ background: 'white', borderRadius: '16px', padding: '16px', border: '1px solid #FDE68A', borderLeft: '5px solid #F59E0B', boxShadow: '0 2px 10px rgba(245,158,11,0.06)' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                                                            <div>
                                                                <p style={{ margin: 0, fontSize: '14px', fontWeight: 900, color: '#0F172A' }}>
                                                                    🪑 {order.area} {order.tableNum !== 'Delivery' ? `· T${order.tableNum}` : '· 🛵 Delivery'}
                                                                </p>
                                                                <p style={{ margin: '3px 0 0', fontSize: '10px', color: '#94A3B8', fontWeight: 600 }}>{getSafeTimeString(order.orderedAt)}</p>
                                                            </div>
                                                            <span style={{ background: timeBg, color: 'white', fontSize: '10px', fontWeight: 800, padding: '4px 9px', borderRadius: '8px' }}>⏱ {elapsedMins}m</span>
                                                        </div>
                                                        <div style={{ background: '#FFFDF5', borderRadius: '12px', padding: '10px 12px', marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                            {order.items.map((item: any, idx: number) => {
                                                                const itemKey = `${order.id}-${idx}`;
                                                                const isChecked = !!checkedItems[itemKey];
                                                                return (
                                                                    <div key={idx} className="kds-item-row"
                                                                        onClick={() => setCheckedItems((prev: any) => ({ ...prev, [itemKey]: !isChecked }))}
                                                                        style={{ display: 'flex', alignItems: 'center', gap: '9px', background: isChecked ? '#F1F5F9' : 'transparent', borderRadius: '8px', padding: '5px 8px', cursor: 'pointer', transition: 'background 0.15s', opacity: isChecked ? 0.5 : 1 }}>
                                                                        <input type="checkbox" checked={isChecked} readOnly style={{ accentColor: '#F59E0B', cursor: 'pointer', flexShrink: 0 }} />
                                                                        <span style={{ background: '#F59E0B', color: 'white', borderRadius: '6px', padding: '2px 8px', fontSize: '11px', fontWeight: 900, flexShrink: 0 }}>×{item.qty}</span>
                                                                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B', textDecoration: isChecked ? 'line-through' : 'none' }}>{item.name}</span>
                                                                        {item.notes && <span style={{ fontSize: '10px', color: '#EA580C', marginLeft: 'auto', fontWeight: 700 }}>📝 {item.notes}</span>}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                        <button className="kds-btn"
                                                            onClick={() => { const updated = kitchenOrders.map((o: any) => o.id === order.id ? { ...o, status: 'ready' as const } : o); setKitchenOrders(updated); addNotification(`✅ Table ${order.tableNum} (${order.area}) order is READY to serve!`, 'order'); toast.success(`Order ready! Table ${order.tableNum} notified.`); }}
                                                            style={{ width: '100%', background: 'linear-gradient(135deg, #22C55E, #16A34A)', color: 'white', border: 'none', borderRadius: '12px', padding: '11px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', transition: 'all 0.15s' }}>
                                                            ✅ Mark Ready to Serve
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                            {kitchenOrders.filter((o: any) => o.status === 'preparing').length === 0 && (
                                                <div style={{ textAlign: 'center', padding: '36px 20px' }}>
                                                    <div style={{ fontSize: '40px', marginBottom: '10px' }}>🍽️</div>
                                                    <p style={{ fontWeight: 700, color: '#94A3B8', margin: '0 0 4px', fontSize: '14px' }}>Kitchen is quiet...</p>
                                                    <p style={{ fontSize: '12px', color: '#CBD5E1', margin: 0 }}>Accept a ticket to start cooking</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* ─── Column 3: READY TO SERVE (Green) ─── */}
                                    <div style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(34,197,94,0.08)', border: '1px solid #BBF7D0' }}>
                                        <div style={{ background: 'linear-gradient(135deg, #22C55E, #16A34A)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{ width: 34, height: 34, background: 'rgba(255,255,255,0.22)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>✅</div>
                                                <div>
                                                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 900, color: 'white', letterSpacing: '0.5px' }}>READY TO SERVE</p>
                                                    <p style={{ margin: 0, fontSize: '10px', color: 'rgba(255,255,255,0.75)' }}>Awaiting delivery</p>
                                                </div>
                                            </div>
                                            <span style={{ background: 'white', color: '#16A34A', borderRadius: '20px', padding: '4px 12px', fontSize: '14px', fontWeight: 900 }}>{kitchenOrders.filter((o: any) => o.status === 'ready').length}</span>
                                        </div>
                                        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '160px' }}>
                                            {kitchenOrders.filter((o: any) => o.status === 'ready').map((order: any) => (
                                                <div key={order.id} className="kds-card" style={{ background: 'white', borderRadius: '16px', padding: '16px', border: '1px solid #BBF7D0', borderLeft: '5px solid #22C55E', boxShadow: '0 2px 10px rgba(34,197,94,0.06)' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                                                        <div>
                                                            <p style={{ margin: 0, fontSize: '14px', fontWeight: 900, color: '#16A34A' }}>
                                                                🪑 {order.area} {order.tableNum !== 'Delivery' ? `· T${order.tableNum}` : '· 🛵 Delivery'}
                                                            </p>
                                                            <p style={{ margin: '3px 0 0', fontSize: '10px', color: '#94A3B8', fontWeight: 600 }}>{getSafeTimeString(order.orderedAt)}</p>
                                                        </div>
                                                        <span style={{ background: '#DCFCE7', color: '#16A34A', fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '8px', border: '1px solid #BBF7D0' }}>✓ READY</span>
                                                    </div>
                                                    <div style={{ background: '#F0FDF4', borderRadius: '12px', padding: '10px 12px', marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                                        {order.items.map((item: any, idx: number) => (
                                                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '3px 0' }}>
                                                                <span style={{ background: '#22C55E', color: 'white', borderRadius: '6px', padding: '2px 8px', fontSize: '11px', fontWeight: 900, flexShrink: 0 }}>×{item.qty}</span>
                                                                <span style={{ fontSize: '13px', fontWeight: 700, color: '#166534' }}>{item.name}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <button className="kds-btn"
                                                        onClick={() => {
                                                            setKitchenOrders((prev: any) => prev.filter((o: any) => o.id !== order.id));
                                                            if (order.tableNum !== 'Delivery') {
                                                                const key = `${order.area}-${order.tableNum}`;
                                                                setDirtyTables((prev: any) => ({ ...prev, [key]: true }));
                                                            }
                                                            toast.success('🎉 Order served! Table cleared.');
                                                        }}
                                                        style={{ width: '100%', background: 'linear-gradient(135deg, #FBBF24, #F59E0B)', color: 'white', border: 'none', borderRadius: '12px', padding: '11px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', transition: 'all 0.15s' }}>
                                                        🍽️ Served — Close Order
                                                    </button>
                                                </div>
                                            ))}
                                            {kitchenOrders.filter((o: any) => o.status === 'ready').length === 0 && (
                                                <div style={{ textAlign: 'center', padding: '36px 20px' }}>
                                                    <div style={{ fontSize: '40px', marginBottom: '10px' }}>⏳</div>
                                                    <p style={{ fontWeight: 700, color: '#94A3B8', margin: '0 0 4px', fontSize: '14px' }}>Waiting for chefs...</p>
                                                    <p style={{ fontSize: '12px', color: '#CBD5E1', margin: 0 }}>Mark orders ready to see here</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}

                        {/* VIEW: DEALS & COMBOS MANAGEMENT */}
                        {activeView === 'deals' && (
                            <div className="custom-view-container">
                                <div className="view-title-row">
                                    <div>
                                        <h2>🎁 Deals & Combo Manager</h2>
                                        <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#718096' }}>
                                            Create combo meals and special offers that appear in the billing page for quick ordering
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setDealForm({ name: '', description: '', dealPrice: '', emoji: '🎁', type: 'combo', validFor: 'All', startDate: '', endDate: '', isPromo: true });
                                            setShowAddDealModal(true);
                                        }}
                                        className="view-action-btn"
                                        style={{ background: '#EC4899' }}
                                    >
                                        ➕ Create New Deal
                                    </button>
                                </div>

                                {deals.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94A3B8' }}>
                                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎁</div>
                                        <h3 style={{ color: '#1A1A2E', margin: '0 0 8px' }}>No deals created yet</h3>
                                        <p style={{ margin: '0 0 20px', fontSize: '13px' }}>Create combo meals like "Family Feast" or special offers like "Breakfast Special"</p>
                                        <button onClick={() => setShowAddDealModal(true)} style={{ background: '#EC4899', color: 'white', border: 'none', borderRadius: '12px', padding: '12px 24px', fontSize: '13px', fontWeight: 800, cursor: 'pointer' }}>
                                            + Create First Deal
                                        </button>
                                    </div>
                                ) : (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                                        {deals.map((deal: any) => (
                                            <div key={deal.id} style={{
                                                background: 'white', borderRadius: '20px', padding: '20px',
                                                border: deal.isPromo !== false ? '1.5px solid #EC4899' : '1.5px solid #E2E8F0',
                                                boxShadow: deal.isPromo !== false ? '0 4px 16px rgba(236,72,153,0.12)' : '0 4px 16px rgba(0,0,0,0.03)',
                                                transition: 'transform 0.2s',
                                                position: 'relative'
                                            }}
                                                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                                                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
                                            >
                                                {deal.isPromo !== false && (
                                                    <div style={{
                                                        position: 'absolute', top: '-8px', left: '16px',
                                                        background: 'linear-gradient(135deg, #EC4899, #BE185D)',
                                                        color: 'white', fontSize: '9px', fontWeight: 900,
                                                        padding: '3px 10px', borderRadius: '99px',
                                                        letterSpacing: '0.08em'
                                                    }}>🌟 PROMO</div>
                                                )}
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <span style={{ fontSize: '28px' }}>{deal.emoji}</span>
                                                        <div>
                                                            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 900, color: '#1A1A2E' }}>{deal.name}</h4>
                                                            <span style={{
                                                                fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px',
                                                                background: deal.type === 'combo' ? '#FDF2F8' : deal.type === 'offer' ? '#FEF3C7' : '#EFF6FF',
                                                                color: deal.type === 'combo' ? '#EC4899' : deal.type === 'offer' ? '#D97706' : '#3B82F6'
                                                            }}>
                                                                {deal.type.toUpperCase()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            if (window.confirm(`Delete "${deal.name}"?`)) {
                                                                const updated = deals.filter((d: any) => d.id !== deal.id);
                                                                setDeals(updated);
                                                                toast.success('Deal deleted');
                                                            }
                                                        }}
                                                        style={{ border: 'none', background: '#FEF2F2', color: '#EF4444', borderRadius: '8px', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                                <p style={{ fontSize: '12px', color: '#718096', margin: '0 0 10px' }}>{deal.description}</p>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderTop: '1px solid #F1F5F9' }}>
                                                    <div>
                                                        <p style={{ margin: 0, fontSize: '20px', fontWeight: 900, color: '#EC4899' }}>₹{deal.dealPrice}</p>
                                                        <p style={{ margin: '2px 0 0', fontSize: '10px', color: '#94A3B8' }}>
                                                            Valid for: {deal.validFor}
                                                            {deal.startDate || deal.endDate ? ` (${deal.startDate || 'Anytime'} to ${deal.endDate || 'Anytime'})` : ''}
                                                        </p>
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
                                                        <button
                                                            onClick={() => {
                                                                const updated = deals.map((d: any) =>
                                                                    d.id === deal.id ? { ...d, isPromo: d.isPromo === false ? true : false } : d
                                                                );
                                                                setDeals(updated);
                                                                toast.success(deal.isPromo === false ? `${deal.name} added to promo banner!` : `${deal.name} removed from promo`);
                                                            }}
                                                            style={{
                                                                background: deal.isPromo !== false ? '#FDF2F8' : '#F1F5F9',
                                                                color: deal.isPromo !== false ? '#EC4899' : '#94A3B8',
                                                                border: deal.isPromo !== false ? '1px solid #FBCFE8' : '1px solid #E2E8F0',
                                                                borderRadius: '8px', padding: '4px 10px', fontSize: '10px', fontWeight: 800,
                                                                cursor: 'pointer', transition: 'all 0.2s'
                                                            }}
                                                            title={deal.isPromo !== false ? 'Click to remove from promo' : 'Click to add to promo banner'}
                                                        >
                                                            {deal.isPromo !== false ? '🌟 In Promo' : '☆ Set Promo'}
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                const dealProduct: Product = {
                                                                    id: 'deal_' + deal.id, companyId: company.id,
                                                                    name: `${deal.emoji} ${deal.name}`, category: 'Deals',
                                                                    sellingPrice: deal.dealPrice, purchasePrice: deal.dealPrice * 0.6,
                                                                    stockQty: 999, lowStockAlertQty: 0, unit: 'set',
                                                                    barcode: '', hsnCode: '', gstRate: 5, taxIncluded: false,
                                                                    
                                                                };
                                                                addToCart(dealProduct);
                                                                setActiveView('dashboard');
                                                                toast.success(`${deal.name} added to cart!`);
                                                            }}
                                                            style={{ background: '#EC4899', color: 'white', border: 'none', borderRadius: '10px', padding: '8px 14px', fontSize: '11px', fontWeight: 800, cursor: 'pointer' }}
                                                        >
                                                            + Add to Order
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* VIEW: BULK CATERING BOOKINGS */}
                        {activeView === 'bulk-orders' && (
                            <div className="custom-view-container">
                                <div className="view-title-row">
                                    <h2>Bulk Catering & Function Bookings</h2>
                                    <button 
                                        onClick={() => setShowAddBulkModal(true)} 
                                        className="view-action-btn" 
                                        style={{ background: primaryColor }}
                                    >
                                        ➕ Create Catering Booking
                                    </button>
                                </div>

                                <div className="custom-table-wrapper">
                                    <table className="custom-table">
                                        <thead>
                                            <tr>
                                                <th>Customer</th>
                                                <th>Event Date</th>
                                                <th>Guests</th>
                                                <th>Total Deal</th>
                                                <th>Advance Paid</th>
                                                <th>Due Balance</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bulkOrders.length === 0 ? (
                                                <tr>
                                                    <td colSpan={8} style={{ textAlign: 'center', color: '#A0AEC0', padding: '30px' }}>No caterings or festival booking orders logged.</td>
                                                </tr>
                                            ) : (
                                                bulkOrders.map((b: any) => (
                                                    <tr key={b.id}>
                                                        <td>
                                                            <strong>{b.customerName}</strong>
                                                            <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#718096' }}>{b.customerPhone}</p>
                                                        </td>
                                                        <td><strong>{formatDate(b.eventDate)}</strong></td>
                                                        <td>{b.guestCount} guests</td>
                                                        <td><strong>₹{b.totalDeal.toFixed(2)}</strong></td>
                                                        <td style={{ color: '#38A169', fontWeight: 700 }}>₹{b.advancePaid.toFixed(2)}</td>
                                                        <td style={{ color: '#E53E3E', fontWeight: 700 }}>₹{(b.totalDeal - b.advancePaid).toFixed(2)}</td>
                                                        <td>
                                                            <span style={{
                                                                fontSize: '11px',
                                                                fontWeight: 800,
                                                                padding: '4px 8px',
                                                                borderRadius: '6px',
                                                                color: b.status === 'completed' ? 'white' : '#B7791F',
                                                                background: b.status === 'completed' ? '#38A169' : '#FEFCBF'
                                                            }}>
                                                                {b.status === 'completed' ? 'Delivered & Paid' : 'Booked'}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {b.status !== 'completed' && (
                                                                <button
                                                                    onClick={() => {
                                                                        const invNum = 'CATER-' + Math.floor(Math.random() * 9000 + 1000);
                                                                        const newId = Math.random().toString(36).slice(2) + Date.now().toString(36);
                                                                        
                                                                        addInvoice({
                                                                            id: newId,
                                                                            companyId: company.id,
                                                                            invoiceType: 'sale',
                                                                            invoiceNumber: invNum,
                                                                            date: new Date().toISOString().slice(0, 10),
                                                                            items: [{
                                                                                productId: '',
                                                                                name: b.notes || 'Function Catering Services',
                                                                                qty: b.guestCount,
                                                                                unit: 'guest',
                                                                                rate: b.totalDeal / b.guestCount,
                                                                                discount: 0, discountAmt: 0, taxableAmt: b.totalDeal,
                                                                                gstRate: 5 as any, cgst: 0, sgst: 0, igst: 0, cess: 0, totalGst: 0, amount: b.totalDeal
                                                                            }],
                                                                            subTotal: b.totalDeal,
                                                                            totalDiscount: 0, taxableAmount: b.totalDeal,
                                                                            totalCgst: 0, totalSgst: 0, totalIgst: 0, totalCess: 0, totalGst: 0,
                                                                            shippingCharges: 0, packingCharges: 0, adjustmentAmount: 0, roundOff: 0,
                                                                            grandTotal: b.totalDeal,
                                                                            paymentStatus: 'paid',
                                                                            amountPaid: b.totalDeal,
                                                                            balanceDue: 0,
                                                                            payments: [
                                                                                { method: 'cash', amount: b.advancePaid, date: new Date().toISOString().slice(0,10) },
                                                                                { method: 'cash', amount: b.totalDeal - b.advancePaid, date: new Date().toISOString().slice(0,10) }
                                                                            ],
                                                                            paymentMethod: 'cash',
                                                                            partyName: b.customerName,
                                                                            partyPhone: b.customerPhone,
                                                                            notes: `Event Date: ${b.eventDate} || Guests: ${b.guestCount} || Fully Paid Sale`,
                                                                            isGstBill: false, isHidden: false, isPrivate: false,
                                                                            createdAt: new Date().toISOString(),
                                                                            updatedAt: new Date().toISOString()
                                                                        });

                                                                        const updated = bulkOrders.map((o: any) => o.id === b.id ? { ...o, status: 'completed' } : o);
                                                                        setBulkOrders(updated);
                                                                        toast.success('Catering Event marked completed and final sale generated!');
                                                                    }}
                                                                    style={{ border: 'none', background: primaryColor, color: 'white', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 800, cursor: 'pointer' }}
                                                                >
                                                                    Convert to Sale
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* VIEW 6: PORTAL CONFIG SETTINGS */}
                        {activeView === 'settings' && (
                            <div className="custom-view-container">
                                <div className="view-title-row">
                                    <h2>Portal Settings - {settingsTab}</h2>
                                </div>

                                <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #E2E8F0', paddingBottom: '10px', marginBottom: '20px', overflowX: 'auto' }} className="no-scrollbar">
                                    {['Profile', 'User Profile', 'Templates', 'Godowns', 'Banking', 'Team', 'Backup', 'Loyalty'].map(t => (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => setSettingsTab(t)}
                                            className={`category-chip ${settingsTab === t ? 'active' : ''}`}
                                            style={{
                                                borderColor: settingsTab === t ? primaryColor : '#E2E8F0',
                                                background: settingsTab === t ? secondaryBg : 'white',
                                                color: settingsTab === t ? primaryColor : '#718096',
                                                padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer'
                                            }}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>

                                {settingsTab === 'Profile' && (
                                    <form onSubmit={handleSaveSettings} className="settings-form-card" style={{ border: `1px solid ${accentBorder}` }}>
                                        <div className="form-group">
                                            <label>Restaurant / Bakery Name *</label>
                                            <input 
                                                value={settingsForm.name} 
                                                onChange={e => setSettingsForm(s => ({ ...s, name: e.target.value }))}
                                                className="modal-input"
                                            />
                                        </div>
                                        <div className="form-row-grid">
                                            <div className="form-group">
                                                <label>Contact Phone</label>
                                                <input 
                                                    value={settingsForm.phone} 
                                                    onChange={e => setSettingsForm(s => ({ ...s, phone: e.target.value }))}
                                                    className="modal-input"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Invoice Prefix</label>
                                                <input 
                                                    value={settingsForm.invoicePrefix} 
                                                    onChange={e => setSettingsForm(s => ({ ...s, invoicePrefix: e.target.value }))}
                                                    className="modal-input"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row-grid">
                                            <div className="form-group">
                                                <label>GST Number (GSTIN)</label>
                                                <input 
                                                    value={settingsForm.gstNumber} 
                                                    onChange={e => setSettingsForm(s => ({ ...s, gstNumber: e.target.value }))}
                                                    className="modal-input"
                                                    placeholder="e.g. 07AAAAA1111A1Z1"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>PAN Number</label>
                                                <input 
                                                    value={settingsForm.panNumber} 
                                                    onChange={e => setSettingsForm(s => ({ ...s, panNumber: e.target.value }))}
                                                    className="modal-input"
                                                    placeholder="e.g. ABCDE1234F"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row-grid">
                                            <div className="form-group">
                                                <label>FSSAI / License Number</label>
                                                <input 
                                                    value={settingsForm.licenseNo} 
                                                    onChange={e => setSettingsForm(s => ({ ...s, licenseNo: e.target.value }))}
                                                    className="modal-input"
                                                    placeholder="e.g. 12345678901234"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Email Address</label>
                                                <input 
                                                    value={settingsForm.email} 
                                                    onChange={e => setSettingsForm(s => ({ ...s, email: e.target.value }))}
                                                    className="modal-input"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Street Address</label>
                                            <input 
                                                value={settingsForm.address} 
                                                onChange={e => setSettingsForm(s => ({ ...s, address: e.target.value }))}
                                                className="modal-input"
                                            />
                                        </div>
                                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', marginTop: '15px', marginBottom: '15px' }}>
                                            <input 
                                                type="checkbox"
                                                id="kds-toggle"
                                                checked={settingsForm.kitchenDisplayEnabled} 
                                                onChange={e => setSettingsForm(s => ({ ...s, kitchenDisplayEnabled: e.target.checked }))}
                                                style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: primaryColor }}
                                            />
                                            <label htmlFor="kds-toggle" style={{ margin: 0, fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}>Enable Kitchen Display System (KDS)</label>
                                        </div>
                                        <button type="submit" className="save-btn" style={{ background: primaryColor, marginTop: 10 }}>
                                            Save Profile Settings
                                        </button>
                                    </form>
                                )}

                                {settingsTab === 'User Profile' && (
                                    <form onSubmit={handleSaveUserProfile} className="settings-form-card" style={{ border: `1px solid ${accentBorder}` }}>
                                        <h4>User Personal Profile Configurations</h4>
                                        <div className="form-group">
                                            <label>Full Name *</label>
                                            <input 
                                                value={userForm.name || ''} 
                                                onChange={e => setUserForm(s => ({ ...s, name: e.target.value }))}
                                                className="modal-input"
                                                placeholder="e.g. Navneet Kumar"
                                            />
                                        </div>
                                        <div className="form-row-grid">
                                            <div className="form-group">
                                                <label>Email Address</label>
                                                <input 
                                                    value={userForm.email || ''} 
                                                    onChange={e => setUserForm(s => ({ ...s, email: e.target.value }))}
                                                    className="modal-input"
                                                    placeholder="e.g. navneet@example.com"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Phone Number</label>
                                                <input 
                                                    value={userForm.phone || ''} 
                                                    onChange={e => setUserForm(s => ({ ...s, phone: e.target.value }))}
                                                    className="modal-input"
                                                    placeholder="e.g. +91 9876543210"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Profile Picture URL</label>
                                            <input 
                                                value={userForm.photoUrl || ''} 
                                                onChange={e => setUserForm(s => ({ ...s, photoUrl: e.target.value }))}
                                                className="modal-input"
                                                placeholder="e.g. https://example.com/avatar.jpg"
                                            />
                                        </div>
                                        <button type="submit" className="save-btn" style={{ background: primaryColor, marginTop: 10 }}>
                                            Save Personal Profile
                                        </button>
                                    </form>
                                )}

                                {settingsTab === 'Templates' && (
                                    <div className="settings-form-card" style={{ border: `1px solid ${accentBorder}` }}>
                                        <h4>Print Template Layout Size</h4>
                                        <div style={{ display: 'flex', gap: '12px', margin: '8px 0 16px 0' }}>
                                            {['Thermal 80mm', 'Thermal 58mm', 'A4 Paper', 'A5 Paper'].map(size => {
                                                const isSelected = (company.paperSize || 'Thermal 80mm') === size;
                                                return (
                                                    <button
                                                        key={size}
                                                        onClick={() => {
                                                            updateCompany(company.id, { paperSize: size } as any);
                                                            toast.success(`Print layout set to ${size}`);
                                                        }}
                                                        style={{
                                                            background: isSelected ? primaryColor : 'white',
                                                            color: isSelected ? 'white' : '#718096',
                                                            border: `1px solid ${isSelected ? primaryColor : '#E2E8F0'}`,
                                                            padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, flex: 1
                                                        }}
                                                    >
                                                        {size}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        <div className="form-group">
                                            <label>Custom Invoice Terms / Greeting</label>
                                            <textarea
                                                className="modal-input"
                                                value={company.invoiceTerms || 'Thank you for your visit!'}
                                                onChange={(e) => updateCompany(company.id, { invoiceTerms: e.target.value } as any)}
                                                style={{ height: '80px', resize: 'vertical' }}
                                            />
                                        </div>
                                        <p style={{ fontSize: '11px', color: '#718096', margin: 0 }}>Select paper layout options to adjust thermal print formats automatically.</p>
                                    </div>
                                )}

                                {settingsTab === 'Godowns' && (
                                    <div className="settings-form-card" style={{ border: `1px solid ${accentBorder}` }}>
                                        <h4>Godown / Warehouse Storage Assignment</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '8px 0' }}>
                                            {(company.godowns || [{ id: 'main', name: 'Main Kitchen' }]).map((g: any) => (
                                                <div key={g.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '12px 16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                                                    <span><strong>{g.name}</strong></span>
                                                    {g.id !== 'main' && (
                                                        <button 
                                                            onClick={() => {
                                                                if(confirm(`Remove godown ${g.name}?`)) {
                                                                    removeGodown(company.id, g.id);
                                                                    toast.success('Godown removed');
                                                                }
                                                            }} 
                                                            className="action-icon-btn text-red"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                                            <input
                                                placeholder="Enter new godown name (e.g. Cold Storage)"
                                                value={newGodownName}
                                                onChange={e => setNewGodownName(e.target.value)}
                                                className="modal-input"
                                                style={{ flex: 1 }}
                                            />
                                            <button 
                                                onClick={() => {
                                                    if(!newGodownName) return;
                                                    addGodown(company.id, { name: newGodownName });
                                                    setNewGodownName('');
                                                    toast.success(`Godown "${newGodownName}" registered!`);
                                                }}
                                                className="save-btn"
                                                style={{ background: primaryColor }}
                                            >
                                                Add Godown
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {settingsTab === 'Banking' && (
                                    <form onSubmit={handleSaveBankDetails} className="settings-form-card" style={{ border: `1px solid ${accentBorder}` }}>
                                        <h4>Bank Account & UPI QR configurations</h4>
                                        <div className="form-row-grid">
                                            <div className="form-group">
                                                <label>Bank Name</label>
                                                <input 
                                                    value={bankForm.bankName} 
                                                    onChange={e => setBankForm(s => ({ ...s, bankName: e.target.value }))}
                                                    className="modal-input"
                                                    placeholder="e.g. HDFC Bank"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Account Holder Name</label>
                                                <input 
                                                    value={bankForm.accountName} 
                                                    onChange={e => setBankForm(s => ({ ...s, accountName: e.target.value }))}
                                                    className="modal-input"
                                                    placeholder="e.g. FoodDesk Pvt Ltd"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row-grid">
                                            <div className="form-group">
                                                <label>Account Number</label>
                                                <input 
                                                    value={bankForm.accountNumber} 
                                                    onChange={e => setBankForm(s => ({ ...s, accountNumber: e.target.value }))}
                                                    className="modal-input"
                                                    placeholder="e.g. 50100293849102"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>IFSC Code</label>
                                                <input 
                                                    value={bankForm.ifsc} 
                                                    onChange={e => setBankForm(s => ({ ...s, ifsc: e.target.value }))}
                                                    className="modal-input"
                                                    placeholder="e.g. HDFC0001234"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>UPI ID (For automatic QR Code generation)</label>
                                            <input 
                                                value={bankForm.upiId} 
                                                onChange={e => setBankForm(s => ({ ...s, upiId: e.target.value }))}
                                                className="modal-input"
                                                placeholder="e.g. fooddesk@ybl"
                                            />
                                        </div>
                                        <button type="submit" className="save-btn" style={{ background: primaryColor, marginTop: 10 }}>
                                            Save Banking Details
                                        </button>
                                    </form>
                                )}

                                {settingsTab === 'Team' && (
                                    <div className="settings-form-card" style={{ border: `1px solid ${accentBorder}` }}>
                                        <h4>Team Roles & Access</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '8px 0' }}>
                                            {(company.team || []).map((member: any) => (
                                                <div key={member.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '12px 16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                                                    <div>
                                                        <p style={{ margin: 0, fontWeight: 800 }}>{member.name}</p>
                                                        <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#718096' }}>Username: {member.contact} || Role: {member.role}</p>
                                                    </div>
                                                    <button 
                                                        onClick={() => {
                                                            const updatedTeam = (company.team || []).filter((m: any) => m.id !== member.id);
                                                            updateCompany(company.id, { team: updatedTeam });
                                                            toast.success('Team member removed');
                                                        }} 
                                                        className="action-icon-btn text-red"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        <div style={{ background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', marginTop: '16px' }}>
                                            <h5 style={{ margin: '0 0 12px 0', fontSize: '12px', fontWeight: 800 }}>Add Counter/Staff Member</h5>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                <input
                                                    placeholder="Staff Name"
                                                    value={newTeamForm.name}
                                                    onChange={e => setNewTeamForm(f => ({ ...f, name: e.target.value }))}
                                                    className="modal-input"
                                                />
                                                <input
                                                    type="password"
                                                    placeholder="Login Password"
                                                    value={newTeamForm.password}
                                                    onChange={e => setNewTeamForm(f => ({ ...f, password: e.target.value }))}
                                                    className="modal-input"
                                                />
                                                <div style={{ display: 'flex', gap: '10px' }}>
                                                    <select
                                                        value={newTeamForm.role}
                                                        onChange={e => setNewTeamForm(f => ({ ...f, role: e.target.value }))}
                                                        className="modal-input"
                                                        style={{ flex: 1 }}
                                                    >
                                                        <option value="staff">Staff / Waiter</option>
                                                        <option value="manager">Manager</option>
                                                        <option value="co_owner">Co-Owner</option>
                                                    </select>
                                                    <select
                                                        value={newTeamForm.counter}
                                                        onChange={e => setNewTeamForm(f => ({ ...f, counter: e.target.value }))}
                                                        className="modal-input"
                                                        style={{ flex: 1 }}
                                                    >
                                                        <option value="">No Counter</option>
                                                        <option value="Counter 1">Counter 1</option>
                                                        <option value="Counter 2">Counter 2</option>
                                                        <option value="Counter 3">Counter 3</option>
                                                    </select>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        if(!newTeamForm.name || !newTeamForm.password) return toast.error('Name and password required');
                                                        const cleanShopName = (company.name || 'shop').replace(/\s+/g, '').toLowerCase();
                                                        const randomNum = Math.floor(Math.random() * 999);
                                                        const generatedUsername = `${cleanShopName}${randomNum}@edibio.${newTeamForm.role}`;
                                                        const newMember = {
                                                            id: Math.random().toString(),
                                                            name: newTeamForm.name,
                                                            contact: generatedUsername,
                                                            password: newTeamForm.password,
                                                            role: newTeamForm.role,
                                                            counter: newTeamForm.counter || undefined
                                                        };
                                                        const updatedTeam = [...(company.team || []), newMember];
                                                        updateCompany(company.id, { team: updatedTeam });
                                                        setNewTeamForm({ name: '', password: '', role: 'staff', counter: '' });
                                                        toast.success(`User created successfully!\nUsername: ${generatedUsername}`);
                                                    }}
                                                    className="save-btn"
                                                    style={{ background: primaryColor }}
                                                >
                                                    Register Team Member
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {settingsTab === 'Backup' && (
                                    <div className="settings-form-card" style={{ border: `1px solid ${accentBorder}` }}>
                                        <h4>JSON Database Import / Export Backups</h4>
                                        <p style={{ fontSize: '12px', color: '#718096', lineHeight: 1.5 }}>
                                            Export your local sales registry, catalog, expenses, and settings to a JSON format. You can restore this file on another machine to sync records.
                                        </p>
                                        <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                                            <button
                                                onClick={() => {
                                                    exportBackup();
                                                    toast.success('Backup export initiated');
                                                }}
                                                className="save-btn"
                                                style={{ background: primaryColor, flex: 1 }}
                                            >
                                                📥 Export Backup File
                                            </button>
                                            <button
                                                onClick={() => {
                                                    const el = document.createElement('input');
                                                    el.type = 'file';
                                                    el.accept = '.json';
                                                    el.onchange = (e: any) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            const reader = new FileReader();
                                                            reader.onload = (evt: any) => {
                                                                try {
                                                                    importBackup(JSON.parse(evt.target.result));
                                                                    toast.success('Database restored successfully!');
                                                                    window.location.reload();
                                                                } catch(err) {
                                                                    toast.error('Invalid backup file structure!');
                                                                }
                                                            };
                                                            reader.readAsText(file);
                                                        }
                                                    };
                                                    el.click();
                                                }}
                                                className="cancel-btn"
                                                style={{ flex: 1, border: `1px solid ${primaryColor}`, color: primaryColor }}
                                            >
                                                📤 Restore Backup File
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {settingsTab === 'Loyalty' && (
                                    <form onSubmit={handleSaveLoyaltySettings} className="settings-form-card" style={{ border: `1px solid ${accentBorder}` }}>
                                        <h4>Client Loyalty Parameters & Outstanding Credit Limit</h4>
                                        <div className="form-row-grid">
                                            <div className="form-group">
                                                <label>Credit / Outstanding Loan Limit (₹)</label>
                                                <input 
                                                    type="number"
                                                    value={company.creditLimit || 50000} 
                                                    onChange={e => updateCompany(company.id, { creditLimit: parseFloat(e.target.value) || 50000 } as any)}
                                                    className="modal-input"
                                                />
                                            </div>
                                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', marginTop: '22px' }}>
                                                <input 
                                                    type="checkbox"
                                                    checked={loyaltyForm.loyaltyPointsEnabled} 
                                                    onChange={e => setLoyaltyForm(s => ({ ...s, loyaltyPointsEnabled: e.target.checked }))}
                                                    style={{ width: '18px', height: '18px' }}
                                                />
                                                <label style={{ margin: 0 }}>Enable Loyalty Program</label>
                                            </div>
                                        </div>
                                        <div className="form-row-grid">
                                            <div className="form-group">
                                                <label>Point Earning Ratio (Spend ₹1 = X points)</label>
                                                <input 
                                                    type="number"
                                                    value={loyaltyForm.loyaltyEarningRatio} 
                                                    onChange={e => setLoyaltyForm(s => ({ ...s, loyaltyEarningRatio: parseFloat(e.target.value) || 1 }))}
                                                    className="modal-input"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Point Redemption Value (1 point = ₹Y)</label>
                                                <input 
                                                    type="number"
                                                    value={loyaltyForm.loyaltyRedemptionValue} 
                                                    onChange={e => setLoyaltyForm(s => ({ ...s, loyaltyRedemptionValue: parseFloat(e.target.value) || 1 }))}
                                                    className="modal-input"
                                                />
                                            </div>
                                        </div>
                                        <button type="submit" className="save-btn" style={{ background: primaryColor, marginTop: 10 }}>
                                            Save Loyalty Rules
                                        </button>
                                    </form>
                                )}
                            </div>
                        )}

                        {/* VIEW: CUSTOMER PARTIES */}
                        {activeView === 'parties' && (
                            <div className="custom-view-container">
                                <div className="view-title-row">
                                    <h2>Customers & Parties Database</h2>
                                    <button 
                                        onClick={() => setShowAddCustomerModal(true)} 
                                        className="view-action-btn" 
                                        style={{ background: primaryColor }}
                                    >
                                        ➕ Add New Customer Party
                                    </button>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
                                    {/* Left: Customer List */}
                                    <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                                        <h4 style={{ fontSize: '14px', fontWeight: 800, margin: '0 0 12px 0', color: '#1A1A2E' }}>Customer Accounts</h4>
                                        <div className="custom-table-wrapper" style={{ maxHeight: '480px', overflowY: 'auto' }}>
                                            <table className="custom-table" style={{ background: 'white', borderRadius: '12px' }}>
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Phone</th>
                                                        <th>Outstanding Loan</th>
                                                        <th>Points</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {parties.length === 0 ? (
                                                        <tr>
                                                            <td colSpan={4} style={{ textAlign: 'center', color: '#A0AEC0', padding: '20px' }}>No customers found. Click Add New Party above to get started.</td>
                                                        </tr>
                                                    ) : (
                                                        parties.map(p => (
                                                            <tr 
                                                                key={p.id} 
                                                                onClick={() => setSelectedCustomerLedger(p)}
                                                                style={{ 
                                                                    cursor: 'pointer', 
                                                                    background: selectedCustomerLedger?.id === p.id ? secondaryBg : 'transparent',
                                                                    transition: 'background 0.2s'
                                                                }}
                                                            >
                                                                <td><strong>{p.name}</strong></td>
                                                                <td>{p.phone || 'N/A'}</td>
                                                                <td style={{ color: p.balance > 0 ? '#E53E3E' : '#22C55E', fontWeight: 800 }}>₹{p.balance.toFixed(2)}</td>
                                                                <td style={{ color: primaryColor, fontWeight: 700 }}>{p.loyaltyPoints || 0} pts</td>
                                                            </tr>
                                                        ))
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Right: Selected Customer Ledger Card */}
                                    {selectedCustomerLedger ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                                                <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#1A1A2E', margin: '0 0 12px 0' }}>{selectedCustomerLedger.name} Details</h3>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13px', margin: '12px 0', borderBottom: '1px solid #E2E8F0', paddingBottom: '16px' }}>
                                                    <div>Outstanding Credit: <strong style={{ color: '#E53E3E', fontSize: '14px' }}>₹{selectedCustomerLedger.balance.toFixed(2)}</strong></div>
                                                    <div>Credit Limit: <strong>₹{selectedCustomerLedger.creditLimit || 50000}</strong></div>
                                                    <div>Loyalty Points: <strong style={{ color: primaryColor }}>{selectedCustomerLedger.loyaltyPoints || 0} points</strong></div>
                                                    <div>Contact Phone: <strong>{selectedCustomerLedger.phone || 'N/A'}</strong></div>
                                                </div>

                                                {/* Record repayment form */}
                                                <form onSubmit={handleRecordRepayment} style={{ background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                                                    <h5 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 800 }}>Record Loan Repayment / Credit Payment</h5>
                                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                                        <input 
                                                            type="number"
                                                            placeholder="Amount paid (₹)"
                                                            className="modal-input"
                                                            value={repaymentAmount}
                                                            onChange={e => setRepaymentAmount(e.target.value)}
                                                            style={{ flex: 1 }}
                                                            required
                                                        />
                                                        <select 
                                                            value={repaymentMethod}
                                                            onChange={e => setRepaymentMethod(e.target.value as any)}
                                                            className="modal-input"
                                                            style={{ width: '110px' }}
                                                        >
                                                            <option value="cash">Cash</option>
                                                            <option value="upi">UPI</option>
                                                            <option value="bank">Bank</option>
                                                        </select>
                                                    </div>
                                                    <input 
                                                        placeholder="Notes/Reference details"
                                                        className="modal-input"
                                                        value={repaymentNote}
                                                        onChange={e => setRepaymentNote(e.target.value)}
                                                        style={{ width: '100%', marginBottom: '12px' }}
                                                    />
                                                    <button 
                                                        type="submit" 
                                                        className="save-btn" 
                                                        style={{ background: primaryColor, width: '100%', padding: '10px', fontSize: '12px' }}
                                                    >
                                                        Submit Repayment & Clear Ledger
                                                    </button>
                                                </form>
                                            </div>

                                            {/* Repayment log history list */}
                                            <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                                                <h4 style={{ fontSize: '13px', fontWeight: 800, margin: '0 0 10px 0' }}>Ledger Payments history</h4>
                                                <div className="custom-table-wrapper" style={{ maxHeight: '180px', overflowY: 'auto' }}>
                                                    <table className="custom-table" style={{ background: 'white', borderRadius: '8px' }}>
                                                        <thead>
                                                            <tr>
                                                                <th>Date</th>
                                                                <th>Amount</th>
                                                                <th>Method</th>
                                                                <th>Ref</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {(!selectedCustomerLedger.paymentHistory || selectedCustomerLedger.paymentHistory.length === 0) ? (
                                                                <tr>
                                                                    <td colSpan={4} style={{ textAlign: 'center', fontSize: '11px', color: '#A0AEC0', padding: '10px' }}>No payments logged.</td>
                                                                </tr>
                                                            ) : (
                                                                selectedCustomerLedger.paymentHistory.map((rep: any, idx: number) => (
                                                                    <tr key={idx}>
                                                                        <td>{formatDate(rep.date)}</td>
                                                                        <td style={{ color: '#38A169', fontWeight: 700 }}>₹{rep.amount.toFixed(2)}</td>
                                                                        <td style={{ textTransform: 'uppercase', fontSize: '10px' }}>{rep.method}</td>
                                                                        <td>₹{rep.balanceAfter.toFixed(2)}</td>
                                                                    </tr>
                                                                ))
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '350px', background: '#FAFAFA', borderRadius: '16px', border: '1.5px dashed #CBD5E0', color: '#718096', fontSize: '13px', width: '100%' }}>
                                            Select a customer row from the left panel list to view ledger, repayment records, and points.
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* VIEW: INVOICE TEMPLATES & PRINT CUSTOMIZER */}
                        {activeView === 'invoice-template' && (
                            <div className="custom-view-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '24px' }}>
                                {/* Left Side: Layout Settings */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div className="view-title-row" style={{ marginBottom: '10px' }}>
                                        <h2>Invoice Customizer</h2>
                                    </div>
                                    <div className="settings-form-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: '#F8FAFC', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                                        <div className="form-group">
                                            <label>Invoice Size / Format</label>
                                            <select 
                                                value={settingsForm.invoicePrefix} 
                                                onChange={(e) => {
                                                    toast.success(`Template format changed to: ${e.target.value}`);
                                                }}
                                                className="modal-input"
                                            >
                                                <option value="Thermal 80mm">Thermal Receipt (80mm POS)</option>
                                                <option value="Thermal 58mm">Thermal Receipt (58mm POS)</option>
                                                <option value="A4 Standard">Standard A4 Tax Invoice</option>
                                                <option value="A5 Medium">Standard A5 Bill Slip</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Header Custom Title</label>
                                            <input 
                                                placeholder="e.g. TAX INVOICE / RETAIL RECEIPT" 
                                                className="modal-input"
                                                defaultValue="RETAIL INVOICE"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Terms & Conditions</label>
                                            <textarea 
                                                placeholder="Thank you for dining with us! Items sold are non-refundable." 
                                                className="modal-input"
                                                style={{ minHeight: '80px', resize: 'vertical' }}
                                                defaultValue="Thank you for dining with us! FSSAI License: 12345678901234. All prices are inclusive of GST. Have a wonderful day!"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Invoice Footer Note</label>
                                            <input 
                                                placeholder="Visit us again!" 
                                                className="modal-input"
                                                defaultValue="Visit us again! Powered by Edibio App"
                                            />
                                        </div>
                                        <button 
                                            onClick={() => toast.success("Invoice template settings updated successfully!")}
                                            className="save-btn" 
                                            style={{ background: primaryColor, width: '100%', padding: '12px', fontSize: '13px', fontWeight: 'bold' }}
                                        >
                                            Save Template Customizations
                                        </button>
                                    </div>
                                </div>

                                {/* Right Side: Interactive Real-Time Receipt Preview */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <div className="view-title-row" style={{ marginBottom: '10px' }}>
                                        <h2>Live Printed Preview</h2>
                                    </div>
                                    <div 
                                        className="thermal-receipt-preview-box" 
                                        style={{ 
                                            background: 'white', 
                                            border: '1.5px solid #CBD5E0', 
                                            boxShadow: '0 10px 25px rgba(0,0,0,0.05)', 
                                            borderRadius: '16px', 
                                            padding: '24px', 
                                            fontFamily: 'monospace', 
                                            fontSize: '12px', 
                                            color: '#1A1A2E',
                                            lineHeight: 1.5,
                                            maxWidth: '380px',
                                            margin: '0 auto',
                                            width: '100%'
                                        }}
                                    >
                                        <div style={{ textAlign: 'center', borderBottom: '1px dashed #CBD5E0', paddingBottom: '12px', marginBottom: '12px' }}>
                                            <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 4px 0', fontFamily: 'monospace' }}>{company.name || 'Edibio Outlet'}</h3>
                                            <p style={{ margin: '0 0 2px 0' }}>FSSAI No: 12345678901234</p>
                                            <p style={{ margin: '0' }}>Tel: {company.phone || '9876543210'}</p>
                                            <p style={{ margin: '4px 0 0 0', fontWeight: 'bold', textTransform: 'uppercase' }}>RETAIL INVOICE</p>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', borderBottom: '1px dashed #CBD5E0', paddingBottom: '10px', marginBottom: '10px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span>Bill No: FD-2026-0924</span>
                                                <span>Date: 26-May-2026</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span>Time: 06:45 PM</span>
                                                <span>Cashier: Owner</span>
                                            </div>
                                            <div>Mode: Dine-in (Indoor - Table 4)</div>
                                        </div>
                                        <table style={{ width: '100%', borderCollapse: 'collapse', borderBottom: '1px dashed #CBD5E0', paddingBottom: '10px', marginBottom: '10px' }}>
                                            <thead>
                                                <tr style={{ borderBottom: '1px solid #1A1A2E' }}>
                                                    <th style={{ textAlign: 'left', padding: '4px 0' }}>Item</th>
                                                    <th style={{ textAlign: 'center', padding: '4px 0' }}>Qty</th>
                                                    <th style={{ textAlign: 'right', padding: '4px 0' }}>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style={{ padding: '6px 0' }}>{isBakery ? 'Red Velvet Cake' : 'Double Cheese Burger'}</td>
                                                    <td style={{ textAlign: 'center', padding: '6px 0' }}>2</td>
                                                    <td style={{ textAlign: 'right', padding: '6px 0' }}>₹{isBakery ? '998.00' : '298.00'}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ padding: '6px 0' }}>{isBakery ? 'Caramel Macchiato' : 'French Fries'}</td>
                                                    <td style={{ textAlign: 'center', padding: '6px 0' }}>1</td>
                                                    <td style={{ textAlign: 'right', padding: '6px 0' }}>₹{isBakery ? '180.00' : '99.00'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderBottom: '1px dashed #CBD5E0', paddingBottom: '10px', marginBottom: '10px', alignItems: 'flex-end' }}>
                                            <div>Subtotal: ₹{isBakery ? '1,178.00' : '397.00'}</div>
                                            <div>GST (5% Included): ₹{isBakery ? '56.10' : '18.90'}</div>
                                            <div>Service Charge: ₹10.00</div>
                                            <div style={{ fontWeight: 'bold', fontSize: '13px' }}>GRAND TOTAL: ₹{isBakery ? '1,188.00' : '407.00'}</div>
                                        </div>
                                        {company?.bankDetails?.upiId && (
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '12px 0', borderTop: '1px dashed #CBD5E0', paddingTop: '10px' }}>
                                                <img 
                                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(`upi://pay?pa=${company.bankDetails.upiId}&pn=${encodeURIComponent(company.name)}&am=${isBakery ? '1188.00' : '407.00'}&cu=INR`)}`} 
                                                    alt="UPI QR Code" 
                                                    style={{ width: '90px', height: '90px', marginBottom: '4px' }} 
                                                />
                                                <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#000000' }}>SCAN TO PAY (UPI)</span>
                                            </div>
                                        )}
                                        <div style={{ textAlign: 'center', fontSize: '10px', color: '#718096' }}>
                                            <p style={{ margin: '0 0 4px 0' }}>Thank you for dining with us! FSSAI License: 12345678901234. All prices are inclusive of GST. Have a wonderful day!</p>
                                            <p style={{ margin: '0', fontWeight: 'bold' }}>Visit us again! Powered by Edibio App</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>

                {/* --- Right Cart & Summary Panel (Exact Copy of second image) --- */}
                {activeView === 'dashboard' && !cartCollapsed && (
                    <aside className={`fooddesk-cart-panel ${cartOpen ? 'mobile-open' : ''}`}>

                        {/* Your Address Block */}
                        <div className="address-widget-copy" style={{ background: viewThemeSecondaryBg, borderRadius: '16px', padding: '16px 20px', margin: '24px 24px 20px 24px', border: `1px solid ${accentBorder}` }}>
                            {/* Takeover/Delivery Type Chips */}
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                                {(['Dining', 'Takeaway', 'Delivery'] as const).map(type => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => {
                                            setOrderType(type);
                                            setIsEditingTable(false);
                                            setIsEditingAddress(false);
                                            setIsEditingTakeaway(false);
                                        }}
                                        style={{
                                            flex: 1,
                                            background: orderType === type ? viewThemeColor : 'white',
                                            color: orderType === type ? 'white' : '#718096',
                                            border: `1px solid ${orderType === type ? viewThemeColor : '#E2E8F0'}`,
                                            padding: '6px 4px',
                                            borderRadius: '8px',
                                            fontSize: '11px',
                                            fontWeight: 800,
                                            cursor: 'pointer',
                                            textAlign: 'center',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {type === 'Dining' ? '🍽️ Dine-in' : type === 'Takeaway' ? '🥡 Takeaway' : '🛵 Delivery'}
                                    </button>
                                ))}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <span className="address-lbl" style={{ color: '#718096', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>
                                    {orderType === 'Dining' ? 'Table Assignment' : orderType === 'Takeaway' ? 'Customer Details' : 'Delivery Address'}
                                </span>
                                <button 
                                    className="change-btn" 
                                    style={{ color: viewThemeColor, background: 'none', border: 'none', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }} 
                                    onClick={() => {
                                        if (orderType === 'Dining') {
                                            setIsEditingTable(!isEditingTable);
                                        } else if (orderType === 'Delivery') {
                                            setIsEditingAddress(!isEditingAddress);
                                        } else {
                                            setIsEditingTakeaway(!isEditingTakeaway);
                                        }
                                    }}
                                >
                                    { (orderType === 'Dining' ? isEditingTable : orderType === 'Delivery' ? isEditingAddress : isEditingTakeaway) ? 'Done' : 'Edit' }
                                </button>
                            </div>

                            {/* Inline Form Fields replacing browser prompt alerts */}
                            {orderType === 'Dining' && (
                                isEditingTable ? (
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', margin: '6px 0' }}>
                                        <input
                                            type="text"
                                            value={tableNumber}
                                            onChange={(e) => setTableNumber(e.target.value)}
                                            className="modal-input"
                                            style={{ flex: 1, padding: '6px 10px', fontSize: '12px' }}
                                            placeholder="e.g. Table 5"
                                            autoFocus
                                            onKeyDown={(e) => { if (e.key === 'Enter') setIsEditingTable(false); }}
                                        />
                                        <button 
                                            onClick={() => setIsEditingTable(false)}
                                            style={{ background: '#22C55E', color: 'white', border: 'none', borderRadius: '6px', padding: '6px 10px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}
                                        >
                                            ✓
                                        </button>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '4px 0' }}>
                                        <span style={{ color: viewThemeColor, fontSize: '14px' }}>🍽️</span>
                                        <p className="address-val" style={{ fontSize: '13px', fontWeight: 800, color: '#1A1A2E', margin: 0, cursor: 'pointer' }} onClick={() => setIsEditingTable(true)}>
                                            Table: {tableNumber}
                                        </p>
                                    </div>
                                )
                            )}

                            {orderType === 'Takeaway' && (
                                isEditingTakeaway ? (
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', margin: '6px 0' }}>
                                        <input
                                            type="text"
                                            value={notesText}
                                            onChange={(e) => setNotesText(e.target.value)}
                                            className="modal-input"
                                            style={{ flex: 1, padding: '6px 10px', fontSize: '12px' }}
                                            placeholder="e.g. Pick-up at 8 PM"
                                            autoFocus
                                            onKeyDown={(e) => { if (e.key === 'Enter') setIsEditingTakeaway(false); }}
                                        />
                                        <button 
                                            onClick={() => setIsEditingTakeaway(false)}
                                            style={{ background: '#22C55E', color: 'white', border: 'none', borderRadius: '6px', padding: '6px 10px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}
                                        >
                                            ✓
                                        </button>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '4px 0' }}>
                                        <span style={{ color: viewThemeColor, fontSize: '14px' }}>🥡</span>
                                        <p className="address-val" style={{ fontSize: '13px', fontWeight: 800, color: '#1A1A2E', margin: 0, cursor: 'pointer' }} onClick={() => setIsEditingTakeaway(true)}>
                                            {notesText ? `Takeaway - ${notesText}` : 'Click to add pick-up details'}
                                        </p>
                                    </div>
                                )
                            )}

                            {orderType === 'Delivery' && (
                                isEditingAddress ? (
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', margin: '6px 0' }}>
                                        <input
                                            type="text"
                                            value={customerAddress}
                                            onChange={(e) => setCustomerAddress(e.target.value)}
                                            className="modal-input"
                                            style={{ flex: 1, padding: '6px 10px', fontSize: '12px' }}
                                            placeholder="e.g. Elm Street, 23"
                                            autoFocus
                                            onKeyDown={(e) => { if (e.key === 'Enter') setIsEditingAddress(false); }}
                                        />
                                        <button 
                                            onClick={() => setIsEditingAddress(false)}
                                            style={{ background: '#22C55E', color: 'white', border: 'none', borderRadius: '6px', padding: '6px 10px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}
                                        >
                                            ✓
                                        </button>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '4px 0' }}>
                                        <span style={{ color: viewThemeColor, fontSize: '14px' }}>📍</span>
                                        <p className="address-val" style={{ fontSize: '13px', fontWeight: 800, color: '#1A1A2E', margin: 0, cursor: 'pointer' }} onClick={() => setIsEditingAddress(true)}>
                                            {customerAddress || 'Click to add delivery address'}
                                        </p>
                                    </div>
                                )
                            )}

                            <p className="address-meta-desc" style={{ fontSize: '11px', color: '#A0AEC0', margin: '4px 0 12px 0', lineHeight: 1.4 }}>
                                {orderType === 'Dining' 
                                    ? 'Dining order mapped to the active floor table card cache.' 
                                    : orderType === 'Takeaway' 
                                        ? 'Pick-up order details customizable for client billing.' 
                                        : 'Delivery orders synced with delivery personnel dispatch tags.'}
                            </p>

                            {/* Attach Party and Note Actions */}
                            <div style={{ display: 'flex', gap: 10, position: 'relative' }}>
                                <div style={{ flex: 1, position: 'relative' }}>
                                    {isSelectingParty && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '8px', position: 'absolute', bottom: '40px', left: 0, zIndex: 100, boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '220px' }}>
                                            <div style={{ display: 'flex', gap: '4px' }}>
                                                <input
                                                    type="text"
                                                    placeholder="Search customer..."
                                                    value={partySearchQuery}
                                                    onChange={(e) => setPartySearchQuery(e.target.value)}
                                                    className="modal-input"
                                                    style={{ flex: 1, padding: '4px 8px', fontSize: '11px' }}
                                                    autoFocus
                                                />
                                                <button onClick={() => { setIsSelectingParty(false); setPartySearchQuery(''); }} style={{ border: 'none', background: '#F1F5F9', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', fontSize: '11px' }}>✕</button>
                                            </div>
                                            <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2px', maxHeight: '120px' }} className="no-scrollbar">
                                                {parties
                                                    .filter(p => p.name.toLowerCase().includes(partySearchQuery.toLowerCase()))
                                                    .slice(0, 5)
                                                    .map(p => (
                                                        <button
                                                            key={p.id}
                                                            onClick={() => {
                                                                setSelectedParty(p);
                                                                setIsSelectingParty(false);
                                                                setPartySearchQuery('');
                                                                toast.success(`Attached Customer: ${p.name}`);
                                                            }}
                                                            style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '6px 8px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
                                                            className="party-dropdown-item"
                                                        >
                                                            <span>{p.name}</span>
                                                            <span style={{ color: '#94A3B8' }}>{p.phone || ''}</span>
                                                        </button>
                                                    ))}
                                                {parties.filter(p => p.name.toLowerCase().includes(partySearchQuery.toLowerCase())).length === 0 && (
                                                    <span style={{ fontSize: '10px', color: '#94A3B8', padding: '6px 8px' }}>No matches found</span>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setShowQuickAddParty(true);
                                                    setIsSelectingParty(false);
                                                }}
                                                style={{ border: 'none', background: viewThemeSecondaryBg, color: viewThemeColor, borderRadius: '6px', padding: '6px', cursor: 'pointer', fontSize: '10px', fontWeight: 'bold', textAlign: 'center', marginTop: '4px' }}
                                            >
                                                + Quick Add Customer
                                            </button>
                                        </div>
                                    )}
                                    <button 
                                        className="address-action-btn" 
                                        style={{ background: selectedParty ? '#10B981' : viewThemeColor, color: 'white', border: 'none', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', fontWeight: 700, width: '100%', cursor: 'pointer' }}
                                        onClick={() => setIsSelectingParty(!isSelectingParty)}
                                    >
                                        {selectedParty ? `👤 ${selectedParty.name}` : 'Attach Party'}
                                    </button>
                                </div>

                                <div style={{ flex: 1, position: 'relative' }}>
                                    {isEditingNote && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '8px', position: 'absolute', bottom: '40px', right: 0, zIndex: 100, boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '220px' }}>
                                            <textarea
                                                placeholder="Enter order notes..."
                                                value={notesText}
                                                onChange={(e) => setNotesText(e.target.value)}
                                                className="modal-input"
                                                style={{ width: '100%', minHeight: '60px', padding: '6px', fontSize: '11px', resize: 'vertical' }}
                                                autoFocus
                                            />
                                            <button 
                                                onClick={() => setIsEditingNote(false)}
                                                style={{ background: '#22C55E', color: 'white', border: 'none', borderRadius: '6px', padding: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}
                                            >
                                                Save Note
                                            </button>
                                        </div>
                                    )}
                                    <button 
                                        className="address-action-btn" 
                                        style={{ background: notesText ? '#10B981' : viewThemeColor, color: 'white', border: 'none', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', fontWeight: 700, width: '100%', cursor: 'pointer' }}
                                        onClick={() => setIsEditingNote(!isEditingNote)}
                                    >
                                        {notesText ? '📝 Note Active' : 'Note'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Cart Items List */}
                        <div className="cart-items-wrapper">
                            <h4>ORDER ITEMS</h4>
                            <div className="cart-items-scroller no-scrollbar">
                                {cart.length === 0 ? (
                                    <div className="cart-empty-panel">
                                        <ShoppingCart size={32} color="#CBD5E0" />
                                        <p>Cart is empty</p>
                                    </div>
                                ) : (
                                    cart.map(c => (
                                        <div key={c.item.id} className="cart-item-row">
                                            <span className="cart-item-emoji">
                                                {c.item.imageUrl && c.item.imageUrl.length < 5 ? c.item.imageUrl : '🍔'}
                                            </span>
                                            <div className="cart-item-info">
                                                <p className="cart-item-name">{c.item.name}</p>
                                                <p className="cart-item-price">+₹{c.item.sellingPrice.toFixed(2)}</p>
                                            </div>
                                            <div className="cart-qty-ctrl" style={{ display: 'flex', alignItems: 'center', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '2px', background: '#FAFAFA' }}>
                                                <button className="qty-btn" style={{ border: 'none', background: 'transparent', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', color: '#718096' }} onClick={() => updateQty(c.item.id, -1)}>-</button>
                                                <span className="qty-val" style={{ fontSize: '12px', fontWeight: 800, color: '#1A1A2E', minWidth: '18px', textAlign: 'center' }}>{c.qty}</span>
                                                <button className="qty-btn" style={{ border: 'none', background: primaryColor, color: 'white', borderRadius: '6px', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }} onClick={() => updateQty(c.item.id, 1)}>+</button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Calculations Summary */}
                        <div className="cart-totals-area">
                            <div className="total-row-item">
                                <span>Service Charge</span>
                                <strong>+₹{serviceCharge.toFixed(2)}</strong>
                            </div>
                            <div className="total-row-item">
                                <span>Subtotal</span>
                                <strong>₹{subTotal.toFixed(2)}</strong>
                            </div>
                            <div className="total-row-grand" style={{ borderTop: `2px dashed ${primaryColor}` }}>
                                <span>Total</span>
                                <strong style={{ color: primaryColor }}>₹{total.toFixed(2)}</strong>
                            </div>
                            {selectedTable && (
                                <button 
                                    className="checkout-btn" 
                                    style={{ background: '#8B5CF6', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }} 
                                    onClick={handleSendToKitchen}
                                >
                                    👨‍🍳 Send to Kitchen (KOT)
                                </button>
                            )}

                            {user?.role === 'server' ? (
                                <button 
                                    className="checkout-btn" 
                                    style={{ background: '#E2E8F0', color: '#1A1A2E', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }} 
                                    onClick={handleCompleteTableOrder}
                                    disabled={!selectedTable}
                                >
                                    🏁 Complete Table Order
                                </button>
                            ) : (
                                <button 
                                    className="checkout-btn" 
                                    style={{ background: primaryColor }} 
                                    onClick={handleCheckout}
                                >
                                    Checkout
                                </button>
                            )}
                        </div>

                        {/* Discount Voucher Up to 20% */}
                        <div className="discount-voucher-banner" style={{
                            position: 'relative',
                            margin: '16px 24px 24px',
                            borderRadius: '16px',
                            padding: '16px 20px',
                            background: isBakery 
                                ? 'linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)' 
                                : 'linear-gradient(135deg, #FFF5F2 0%, #FFE4E1 100%)',
                            border: `1.5px dashed ${primaryColor}40`,
                            overflow: 'hidden',
                            minHeight: '95px'
                        }}>
                            <div style={{ width: '60%' }}>
                                <h5 className="voucher-title" style={{ fontSize: '13px', fontWeight: 900, color: '#1A1A2E', margin: 0, lineHeight: '1.3' }}>Get Discount Voucher Up To 20%</h5>
                                <p className="voucher-desc" style={{ fontSize: '10px', color: '#718096', margin: '6px 0 0 0', lineHeight: '1.4' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                            <img 
                                src="/voucher-girl.png" 
                                alt="Voucher Girl" 
                                style={{
                                    position: 'absolute',
                                    right: '-5px',
                                    bottom: '-5px',
                                    height: '110px',
                                    width: 'auto',
                                    objectFit: 'contain',
                                    zIndex: 1
                                }}
                            />
                        </div>
                    </aside>
                )}

                {/* Floating Checkout Sidebar Toggle Button */}
                {activeView === 'dashboard' && (
                    <button
                        className="desktop-cart-toggle-btn"
                        onClick={() => setCartCollapsed(!cartCollapsed)}
                        style={{
                            position: 'fixed',
                            right: cartCollapsed ? '0px' : '380px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 1000,
                            background: primaryColor,
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px 0 0 12px',
                            width: '28px',
                            height: '64px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '-2px 4px 12px rgba(0,0,0,0.15)',
                            transition: 'right 0.3s ease',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            gap: '4px'
                        }}
                        title={cartCollapsed ? "Open checkout drawer" : "Collapse checkout drawer"}
                    >
                        <span>{cartCollapsed ? '◀' : '▶'}</span>
                        <span style={{ fontSize: '10px' }}>🛒</span>
                    </button>
                )}
            </div>

            {/* --- Add New Item Modal --- */}
            {showAddItemModal && (
                <div className="fooddesk-modal-overlay" onClick={() => setShowAddItemModal(false)}>
                    <div className="fooddesk-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Add New Menu Item</h3>
                            <button className="close-btn" onClick={() => setShowAddItemModal(false)}>×</button>
                        </div>
                        <div className="modal-body-content">
                            <div className="form-group">
                                <label>Item Name *</label>
                                <input
                                    placeholder="e.g. Farmhouse Special"
                                    value={newProductForm.name}
                                    onChange={(e) => setNewProductForm(p => ({ ...p, name: e.target.value }))}
                                    className="modal-input"
                                />
                            </div>
                            <div className="form-row-grid">
                                <div className="form-group">
                                    <label>Category *</label>
                                    {showNewCatInput ? (
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                            <input 
                                                type="text" 
                                                placeholder="New category name"
                                                value={newCatName}
                                                onChange={(e) => setNewCatName(e.target.value)}
                                                className="modal-input"
                                                style={{ flex: 1 }}
                                                autoFocus
                                            />
                                            <button
                                                type="button"
                                                style={{ background: '#22C55E', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 14px', cursor: 'pointer', fontWeight: 'bold' }}
                                                onClick={() => {
                                                    if (newCatName.trim()) {
                                                        setCustomCategories(prev => Array.from(new Set([...prev, newCatName.trim()])));
                                                        setNewProductForm(p => ({ ...p, category: newCatName.trim() }));
                                                        setNewCatName('');
                                                        setShowNewCatInput(false);
                                                        toast.success(`Category "${newCatName.trim()}" added!`);
                                                    } else {
                                                        toast.error("Category name cannot be empty");
                                                    }
                                                }}
                                            >
                                                ✓
                                            </button>
                                            <button
                                                type="button"
                                                style={{ background: '#EF4444', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 14px', cursor: 'pointer', fontWeight: 'bold' }}
                                                onClick={() => {
                                                    setShowNewCatInput(false);
                                                    setNewCatName('');
                                                }}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <select
                                                value={newProductForm.category}
                                                onChange={(e) => setNewProductForm(p => ({ ...p, category: e.target.value }))}
                                                className="modal-input"
                                                style={{ flex: 1 }}
                                            >
                                                <option value="">Select Category</option>
                                                {categories.filter(c => c !== 'All').map(c => (
                                                    <option key={c} value={c}>{c}</option>
                                                ))}
                                            </select>
                                            <button
                                                type="button"
                                                onClick={() => setShowNewCatInput(true)}
                                                style={{
                                                    background: secondaryBg, color: primaryColor, border: `1px solid ${primaryColor}`,
                                                    borderRadius: '10px', padding: '0 10px', fontWeight: 800, cursor: 'pointer'
                                                }}
                                            >
                                                + New
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Price (₹) *</label>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        value={newProductForm.price}
                                        onChange={(e) => setNewProductForm(p => ({ ...p, price: e.target.value }))}
                                        className="modal-input"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Image Link / URL or Emoji</label>
                                <input
                                    placeholder="e.g. https://domain.com/dish.jpg or 🍔"
                                    value={newProductForm.imageUrl}
                                    onChange={(e) => setNewProductForm(p => ({ ...p, imageUrl: e.target.value }))}
                                    className="modal-input"
                                />
                            </div>
                            <div className="form-row-grid">
                                <div className="form-group">
                                    <label>Barcode / GTIN</label>
                                    <input
                                        placeholder="e.g. 8901020304"
                                        value={newProductForm.barcode}
                                        onChange={(e) => setNewProductForm(p => ({ ...p, barcode: e.target.value }))}
                                        className="modal-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>HSN Code</label>
                                    <input
                                        placeholder="e.g. 2106"
                                        value={newProductForm.hsnCode}
                                        onChange={(e) => setNewProductForm(p => ({ ...p, hsnCode: e.target.value }))}
                                        className="modal-input"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Expiry Date</label>
                                <input
                                    type="date"
                                    value={newProductForm.expiryDate}
                                    onChange={(e) => setNewProductForm(p => ({ ...p, expiryDate: e.target.value }))}
                                    className="modal-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>🕐 Meal Time (for time-based menu filtering)</label>
                                <select
                                    value={(newProductForm as any).mealTime || ''}
                                    onChange={(e) => setNewProductForm(p => ({ ...p, mealTime: e.target.value } as any))}
                                    className="modal-input"
                                >
                                    <option value="">All Day (always visible)</option>
                                    <option value="Breakfast">🌅 Breakfast Only (before 11 AM)</option>
                                    <option value="Lunch">☀️ Lunch Only (11 AM – 4 PM)</option>
                                    <option value="Dinner">🌙 Dinner Only (after 4 PM)</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="cancel-btn" onClick={() => setShowAddItemModal(false)}>Cancel</button>
                            <button className="save-btn" style={{ background: viewThemeColor }} onClick={handleSaveProduct}>Save Item</button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- Edit Item Modal --- */}
            {editingProduct && (
                <div className="fooddesk-modal-overlay" onClick={() => setEditingProduct(null)}>
                    <div className="fooddesk-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Edit Menu Item</h3>
                            <button className="close-btn" onClick={() => setEditingProduct(null)}>×</button>
                        </div>
                        <div className="modal-body-content">
                            <div className="form-group">
                                <label>Item Name *</label>
                                <input
                                    value={editingProduct.name}
                                    onChange={(e) => setEditingProduct(p => p ? ({ ...p, name: e.target.value }) : null)}
                                    className="modal-input"
                                />
                            </div>
                            <div className="form-row-grid">
                                <div className="form-group">
                                    <label>Category *</label>
                                    {showNewCatInput ? (
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                            <input 
                                                type="text" 
                                                placeholder="New category name"
                                                value={newCatName}
                                                onChange={(e) => setNewCatName(e.target.value)}
                                                className="modal-input"
                                                style={{ flex: 1 }}
                                                autoFocus
                                            />
                                            <button
                                                type="button"
                                                style={{ background: '#22C55E', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 14px', cursor: 'pointer', fontWeight: 'bold' }}
                                                onClick={() => {
                                                    if (newCatName.trim()) {
                                                        setCustomCategories(prev => Array.from(new Set([...prev, newCatName.trim()])));
                                                        setEditingProduct(p => p ? ({ ...p, category: newCatName.trim() }) : null);
                                                        setNewCatName('');
                                                        setShowNewCatInput(false);
                                                        toast.success(`Category "${newCatName.trim()}" added!`);
                                                    } else {
                                                        toast.error("Category name cannot be empty");
                                                    }
                                                }}
                                            >
                                                ✓
                                            </button>
                                            <button
                                                type="button"
                                                style={{ background: '#EF4444', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 14px', cursor: 'pointer', fontWeight: 'bold' }}
                                                onClick={() => {
                                                    setShowNewCatInput(false);
                                                    setNewCatName('');
                                                }}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <select
                                                value={editingProduct.category}
                                                onChange={(e) => setEditingProduct(p => p ? ({ ...p, category: e.target.value }) : null)}
                                                className="modal-input"
                                                style={{ flex: 1 }}
                                            >
                                                <option value="">Select Category</option>
                                                {categories.filter(c => c !== 'All').map(c => (
                                                    <option key={c} value={c}>{c}</option>
                                                ))}
                                            </select>
                                            <button
                                                type="button"
                                                onClick={() => setShowNewCatInput(true)}
                                                style={{
                                                    background: secondaryBg, color: primaryColor, border: `1px solid ${primaryColor}`,
                                                    borderRadius: '10px', padding: '0 10px', fontWeight: 800, cursor: 'pointer'
                                                }}
                                            >
                                                + New
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Price (₹) *</label>
                                    <input
                                        type="number"
                                        value={editingProduct.sellingPrice}
                                        onChange={(e) => setEditingProduct(p => p ? ({ ...p, sellingPrice: parseFloat(e.target.value) || 0 }) : null)}
                                        className="modal-input"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Image Link / URL or Emoji</label>
                                <input
                                    placeholder="e.g. https://domain.com/dish.jpg or 🍔"
                                    value={editingProduct.imageUrl || ''}
                                    onChange={(e) => setEditingProduct(p => p ? ({ ...p, imageUrl: e.target.value }) : null)}
                                    className="modal-input"
                                />
                            </div>
                            <div className="form-row-grid">
                                <div className="form-group">
                                    <label>Barcode / GTIN</label>
                                    <input
                                        placeholder="e.g. 8901020304"
                                        value={editingProduct.barcode || ''}
                                        onChange={(e) => setEditingProduct(p => p ? ({ ...p, barcode: e.target.value }) : null)}
                                        className="modal-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>HSN Code</label>
                                    <input
                                        placeholder="e.g. 2106"
                                        value={editingProduct.hsnCode || ''}
                                        onChange={(e) => setEditingProduct(p => p ? ({ ...p, hsnCode: e.target.value }) : null)}
                                        className="modal-input"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Expiry Date</label>
                                <input
                                    type="date"
                                    value={editingProduct.expiryDate || ''}
                                    onChange={(e) => setEditingProduct(p => p ? ({ ...p, expiryDate: e.target.value }) : null)}
                                    className="modal-input"
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="cancel-btn" onClick={() => setEditingProduct(null)}>Cancel</button>
                            <button className="save-btn" style={{ background: viewThemeColor }} onClick={handleUpdateProduct}>Save Updates</button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- Quick Add Party Modal --- */}
            {showQuickAddParty && (
                <div className="fooddesk-modal-overlay" onClick={() => setShowQuickAddParty(false)}>
                    <div className="fooddesk-modal" onClick={(e) => e.stopPropagation()} style={{ width: '320px' }}>
                        <div className="modal-header">
                            <h3>Quick Add Customer</h3>
                            <button className="close-btn" onClick={() => setShowQuickAddParty(false)}>×</button>
                        </div>
                        <div className="modal-body-content" style={{ gap: '12px' }}>
                            <div className="form-group">
                                <label>Customer Name *</label>
                                <input
                                    placeholder="e.g. John Doe"
                                    value={quickPartyName}
                                    onChange={(e) => setQuickPartyName(e.target.value)}
                                    className="modal-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    placeholder="e.g. 9876543210"
                                    value={quickPartyPhone}
                                    onChange={(e) => setQuickPartyPhone(e.target.value)}
                                    className="modal-input"
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="cancel-btn" onClick={() => setShowQuickAddParty(false)}>Cancel</button>
                            <button className="save-btn" style={{ background: viewThemeColor }} onClick={() => {
                                if (!quickPartyName.trim()) return toast.error('Customer name is required');
                                const created = addParty({
                                    companyId: company.id,
                                    name: quickPartyName.trim(),
                                    phone: quickPartyPhone.trim(),
                                    type: 'customer',
                                    balance: 0,
                                    openingBalance: 0
                                });
                                setSelectedParty(created);
                                setQuickPartyName('');
                                setQuickPartyPhone('');
                                setShowQuickAddParty(false);
                                setIsSelectingParty(false);
                                toast.success(`Customer ${created.name} created and attached!`);
                            }}>Save & Attach</button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- Close Shift Modal --- */}
            {showCloseShiftModal && (
                <div className="fooddesk-modal-overlay" onClick={() => setShowCloseShiftModal(false)}>
                    <div className="fooddesk-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Close Cash Register Shift</h3>
                            <button className="close-btn" onClick={() => setShowCloseShiftModal(false)}>×</button>
                        </div>
                        <div className="modal-body-content">
                            <p style={{ fontSize: '12px', color: '#718096', margin: 0 }}>Shift started: <strong>{new Date(openingTime).toLocaleString()}</strong></p>
                            
                            {/* Live calculations */}
                            {(() => {
                                const shiftInvoices = invoices.filter(inv => inv.invoiceType === 'sale' && inv.createdAt >= openingTime);
                                const cashSales = shiftInvoices.filter(i => i.paymentMethod === 'cash').reduce((sum, i) => sum + i.grandTotal, 0);
                                const upiSales = shiftInvoices.filter(i => i.paymentMethod === 'upi').reduce((sum, i) => sum + i.grandTotal, 0);
                                const cardSales = shiftInvoices.filter(i => i.paymentMethod === 'card').reduce((sum, i) => sum + i.grandTotal, 0);
                                const creditSales = shiftInvoices.filter(i => i.paymentMethod === 'credit').reduce((sum, i) => sum + i.grandTotal, 0);
                                const expectedCash = openingFloat + cashSales;
                                
                                return (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #E2E8F0', fontSize: '13px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span>Opening Float:</span>
                                            <span><strong>₹{openingFloat.toFixed(2)}</strong></span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span>Cash Sales Today:</span>
                                            <span><strong>+₹{cashSales.toFixed(2)}</strong></span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span>UPI / Card Sales Today:</span>
                                            <span><strong>+₹{(upiSales + cardSales).toFixed(2)}</strong></span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span>Credit (Loan) Sales Today:</span>
                                            <span><strong>+₹{creditSales.toFixed(2)}</strong></span>
                                        </div>
                                        <hr style={{ border: 'none', borderTop: '1.5px dashed #E2E8F0', margin: '6px 0' }} />
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 800, color: primaryColor }}>
                                            <span>Expected Drawer Cash:</span>
                                            <span>₹{expectedCash.toFixed(2)}</span>
                                        </div>
                                    </div>
                                );
                            })()}

                            <div className="form-group">
                                <label>Actual Cash Counted in Drawer (₹) *</label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    className="modal-input"
                                    value={countedCashInput}
                                    onChange={(e) => setCountedCashInput(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="cancel-btn" onClick={() => setShowCloseShiftModal(false)}>Cancel</button>
                            <button className="save-btn" style={{ background: '#E53E3E' }} onClick={handleCloseShift}>Confirm & Close Shift</button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- Table Configuration Modal --- */}
            {showTableConfigModal && (
                <div className="fooddesk-modal-overlay" onClick={() => setShowTableConfigModal(false)}>
                    <div className="fooddesk-modal" style={{ maxWidth: '540px', width: '90%' }} onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>⚙️ Manage Tables & Areas</h3>
                            <button className="close-btn" onClick={() => setShowTableConfigModal(false)}>×</button>
                        </div>
                        <div className="modal-body" style={{ padding: '20px 24px' }}>
                            <p style={{ fontSize: '12px', color: '#718096', marginBottom: '20px' }}>
                                Configure the number of tables in each seating area. Changes are saved automatically.
                            </p>
                            {customAreas.map((area: any) => (
                                <div key={area} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #F1F5F9' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ fontSize: '18px' }}>
                                            {area === 'Indoor' ? '🏠' : area === 'Outdoor' ? '🌿' : area === 'Rooftop' ? '🌇' : '🪑'}
                                        </span>
                                        <div>
                                            <p style={{ margin: 0, fontWeight: 700, fontSize: '13px', color: '#1A1A2E' }}>{area}</p>
                                            <p style={{ margin: 0, fontSize: '11px', color: '#94A3B8' }}>{tableConfig[area] || 0} tables</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <button
                                            onClick={() => {
                                                const current = tableConfig[area] || 0;
                                                if (current > 0) {
                                                    const updated = { ...tableConfig, [area]: current - 1 };
                                                    setTableConfig(updated);
                                                    toast.success(`Removed a table from ${area}`);
                                                }
                                            }}
                                            style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FEF2F2', color: '#EF4444', border: '1px solid #FECACA', cursor: 'pointer', fontWeight: 900, fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        >−</button>
                                        <span style={{ minWidth: '32px', textAlign: 'center', fontWeight: 900, fontSize: '16px', color: '#1A1A2E' }}>{tableConfig[area] || 0}</span>
                                        <button
                                            onClick={() => {
                                                const updated = { ...tableConfig, [area]: (tableConfig[area] || 0) + 1 };
                                                setTableConfig(updated);
                                                toast.success(`Added a table to ${area}`);
                                            }}
                                            style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F0FDF4', color: '#22C55E', border: '1px solid #BBF7D0', cursor: 'pointer', fontWeight: 900, fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        >+</button>
                                        <button
                                            onClick={() => {
                                                const updated = customAreas.filter((a: any) => a !== area);
                                                const updatedCounts = { ...tableConfig };
                                                delete updatedCounts[area];
                                                setCustomAreas(updated);
                                                setTableConfig(updatedCounts);
                                                toast.success(`${area} removed`);
                                            }}
                                            style={{ border: 'none', background: '#FEF2F2', color: '#EF4444', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
                                <input
                                    placeholder="New area name (e.g. VIP Lounge)"
                                    className="modal-input"
                                    id="new-area-input"
                                    style={{ flex: 1 }}
                                />
                                <button
                                    onClick={() => {
                                        const input = document.getElementById('new-area-input') as HTMLInputElement;
                                        const areaName = input?.value?.trim();
                                        if (!areaName) return toast.error('Enter an area name');
                                        if (customAreas.includes(areaName)) return toast.error('Area already exists');
                                        const updatedAreas = [...customAreas, areaName];
                                        const updatedCounts = { ...tableConfig, [areaName]: 4 };
                                        setCustomAreas(updatedAreas);
                                        setTableConfig(updatedCounts);
                                        if (input) input.value = '';
                                        toast.success(`${areaName} area added with 4 tables!`);
                                    }}
                                    style={{ background: primaryColor, color: 'white', border: 'none', borderRadius: '10px', padding: '10px 16px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}
                                >
                                    + Add Area
                                </button>
                            </div>
                        </div>
                        <div style={{ padding: '16px 24px', borderTop: '1px solid #F1F5F9', textAlign: 'right' }}>
                            <button onClick={() => setShowTableConfigModal(false)} style={{ background: primaryColor, color: 'white', border: 'none', borderRadius: '10px', padding: '10px 24px', fontWeight: 800, cursor: 'pointer' }}>Done</button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- Shop & Profile Settings Modal --- */}
            {showProfileModal && (
                <div className="fooddesk-modal-overlay" onClick={() => setShowProfileModal(false)}>
                    <div className="fooddesk-modal" style={{ maxWidth: '520px', width: '90%' }} onClick={e => e.stopPropagation()}>
                        <div className="modal-header" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryHoverColor})`, color: 'white', borderRadius: '20px 20px 0 0' }}>
                            <h3 style={{ color: 'white' }}>⚙️ Shop & Profile Settings</h3>
                            <button className="close-btn" style={{ color: 'white', background: 'rgba(255,255,255,0.2)' }} onClick={() => setShowProfileModal(false)}>×</button>
                        </div>
                        <div className="modal-body" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '14px', alignItems: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                                    <label style={{ fontSize: '10px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Avatar</label>
                                    <input
                                        value={profileForm.avatar}
                                        onChange={e => setProfileForm(prev => ({ ...prev, avatar: e.target.value }))}
                                        className="modal-input"
                                        style={{ textAlign: 'center', fontSize: '24px', padding: '8px', width: '60px' }}
                                        maxLength={2}
                                        placeholder="👨‍🍳"
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#4A5568', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Shop Name</label>
                                    <input
                                        placeholder="e.g. My Cafe"
                                        value={profileForm.companyName}
                                        onChange={e => setProfileForm(prev => ({ ...prev, companyName: e.target.value }))}
                                        className="modal-input"
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ fontSize: '11px', fontWeight: 800, color: '#4A5568', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Shop Address</label>
                                <input
                                    placeholder="e.g. 12 Main St, City"
                                    value={profileForm.companyAddress}
                                    onChange={e => setProfileForm(prev => ({ ...prev, companyAddress: e.target.value }))}
                                    className="modal-input"
                                    style={{ width: '100%' }}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div>
                                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#4A5568', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Shop Phone</label>
                                    <input
                                        placeholder="e.g. +919988776655"
                                        value={profileForm.companyPhone}
                                        onChange={e => setProfileForm(prev => ({ ...prev, companyPhone: e.target.value }))}
                                        className="modal-input"
                                        style={{ width: '100%' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#4A5568', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Cashier Name</label>
                                    <input
                                        placeholder="e.g. Alex"
                                        value={profileForm.userName}
                                        onChange={e => setProfileForm(prev => ({ ...prev, userName: e.target.value }))}
                                        className="modal-input"
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
                                <div>
                                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#4A5568', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Default Service Charge (₹)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="10.00"
                                        value={profileForm.serviceCharge}
                                        onChange={e => setProfileForm(prev => ({ ...prev, serviceCharge: parseFloat(e.target.value) || 0 }))}
                                        className="modal-input"
                                        style={{ width: '100%' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#4A5568', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Default Tax / GST (%)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        placeholder="5"
                                        value={profileForm.gstRate}
                                        onChange={e => setProfileForm(prev => ({ ...prev, gstRate: parseFloat(e.target.value) || 0 }))}
                                        className="modal-input"
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleSaveProfile}
                                style={{ width: '100%', background: `linear-gradient(135deg, ${primaryColor}, ${primaryHoverColor})`, color: 'white', border: 'none', borderRadius: '12px', padding: '14px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', marginTop: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            >
                                ✓ Save Profile & Shop Details
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- Create Deal / Combo Modal --- */}
            {showAddDealModal && (
                <div className="fooddesk-modal-overlay" onClick={() => setShowAddDealModal(false)}>
                    <div className="fooddesk-modal" style={{ maxWidth: '480px', width: '90%' }} onClick={e => e.stopPropagation()}>
                        <div className="modal-header" style={{ background: 'linear-gradient(135deg, #EC4899, #BE185D)', color: 'white', borderRadius: '20px 20px 0 0' }}>
                            <h3 style={{ color: 'white' }}>🎁 Create Deal / Combo</h3>
                            <button className="close-btn" style={{ color: 'white', background: 'rgba(255,255,255,0.2)' }} onClick={() => setShowAddDealModal(false)}>×</button>
                        </div>
                        <div className="modal-body" style={{ padding: '24px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
                                <input
                                    value={dealForm.emoji}
                                    onChange={e => setDealForm(prev => ({ ...prev, emoji: e.target.value }))}
                                    className="modal-input"
                                    style={{ textAlign: 'center', fontSize: '24px', padding: '8px' }}
                                    maxLength={2}
                                    placeholder="🎁"
                                />
                                <input
                                    placeholder="Deal Name (e.g. Family Feast Combo)"
                                    value={dealForm.name}
                                    onChange={e => setDealForm(prev => ({ ...prev, name: e.target.value }))}
                                    className="modal-input"
                                />
                            </div>
                            <input
                                placeholder="Description (e.g. Rice + Dal + 2 Rotis + Salad)"
                                value={dealForm.description}
                                onChange={e => setDealForm(prev => ({ ...prev, description: e.target.value }))}
                                className="modal-input"
                                style={{ marginBottom: '12px', width: '100%' }}
                            />
                            <input
                                type="number"
                                placeholder="Deal Price (₹)"
                                value={dealForm.dealPrice}
                                onChange={e => setDealForm(prev => ({ ...prev, dealPrice: e.target.value }))}
                                className="modal-input"
                                style={{ marginBottom: '12px', width: '100%' }}
                            />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                                <div>
                                    <label style={{ fontSize: '11px', fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: '6px' }}>Deal Type</label>
                                    <select
                                        value={dealForm.type}
                                        onChange={e => setDealForm(prev => ({ ...prev, type: e.target.value as any }))}
                                        className="modal-input"
                                        style={{ width: '100%' }}
                                    >
                                        <option value="combo">Combo Meal</option>
                                        <option value="offer">Special Offer</option>
                                        <option value="special">Chef's Special</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ fontSize: '11px', fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: '6px' }}>Meal Time</label>
                                    <select
                                        value={dealForm.validFor}
                                        onChange={e => setDealForm(prev => ({ ...prev, validFor: e.target.value as any }))}
                                        className="modal-input"
                                        style={{ width: '100%' }}
                                    >
                                        <option value="All">All Day</option>
                                        <option value="Breakfast">Breakfast Only</option>
                                        <option value="Lunch">Lunch Only</option>
                                        <option value="Dinner">Dinner Only</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                                <div>
                                    <label style={{ fontSize: '11px', fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: '6px' }}>Start Date</label>
                                    <input
                                        type="date"
                                        value={dealForm.startDate}
                                        onChange={e => setDealForm(prev => ({ ...prev, startDate: e.target.value }))}
                                        className="modal-input"
                                        style={{ width: '100%' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '11px', fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: '6px' }}>End Date</label>
                                    <input
                                        type="date"
                                        value={dealForm.endDate}
                                        onChange={e => setDealForm(prev => ({ ...prev, endDate: e.target.value }))}
                                        className="modal-input"
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', background: dealForm.isPromo ? '#FDF2F8' : '#F8FAFC', borderRadius: '10px', border: dealForm.isPromo ? '1px solid #FBCFE8' : '1px solid #E2E8F0', cursor: 'pointer', transition: 'all 0.2s', userSelect: 'none' }} onClick={() => setDealForm(prev => ({ ...prev, isPromo: !prev.isPromo }))}>
                                <div style={{ width: '36px', height: '20px', borderRadius: '99px', background: dealForm.isPromo ? '#EC4899' : '#CBD5E1', position: 'relative', transition: 'all 0.2s', flexShrink: 0 }}>
                                    <div style={{ position: 'absolute', width: '16px', height: '16px', borderRadius: '50%', background: 'white', top: '2px', left: dealForm.isPromo ? '18px' : '2px', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                                </div>
                                <div>
                                    <p style={{ margin: 0, fontSize: '12px', fontWeight: 800, color: dealForm.isPromo ? '#EC4899' : '#4A5568' }}>🌟 Show in Promotional Banner</p>
                                    <p style={{ margin: 0, fontSize: '10px', color: '#94A3B8', fontWeight: 500 }}>When active, this deal appears in the dashboard promo carousel</p>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    if (!dealForm.name || !dealForm.dealPrice) return toast.error('Name and price are required');
                                    const newDeal = {
                                        id: Math.random().toString(36).slice(2), name: dealForm.name,
                                        description: dealForm.description, items: [],
                                        dealPrice: parseFloat(dealForm.dealPrice), emoji: dealForm.emoji || '🎁',
                                        type: dealForm.type, validFor: dealForm.validFor,
                                        startDate: dealForm.startDate || null,
                                        endDate: dealForm.endDate || null,
                                        isPromo: dealForm.isPromo
                                    };
                                    const updated = [...deals, newDeal];
                                    setDeals(updated);
                                    setShowAddDealModal(false);
                                    toast.success(`${dealForm.emoji} ${dealForm.name} created!`);
                                }}
                                style={{ width: '100%', background: 'linear-gradient(135deg, #EC4899, #BE185D)', color: 'white', border: 'none', borderRadius: '12px', padding: '14px', fontSize: '13px', fontWeight: 800, cursor: 'pointer' }}
                            >
                                🎁 Save Deal
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- Add Bulk Booking Modal --- */}
            {showAddBulkModal && (
                <div className="fooddesk-modal-overlay" onClick={() => setShowAddBulkModal(false)}>
                    <div className="fooddesk-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Create Bulk Event Catering Booking</h3>
                            <button className="close-btn" onClick={() => setShowAddBulkModal(false)}>×</button>
                        </div>
                        <div className="modal-body-content">
                            <div className="form-group">
                                <label>Customer Name *</label>
                                <input
                                    placeholder="e.g. Ritesh Deshmukh"
                                    value={bulkForm.customerName}
                                    onChange={(e) => setBulkForm(b => ({ ...b, customerName: e.target.value }))}
                                    className="modal-input"
                                />
                            </div>
                            <div className="form-row-grid">
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        placeholder="e.g. 9812345678"
                                        value={bulkForm.customerPhone}
                                        onChange={(e) => setBulkForm(b => ({ ...b, customerPhone: e.target.value }))}
                                        className="modal-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Event Date *</label>
                                    <input
                                        type="date"
                                        value={bulkForm.eventDate}
                                        onChange={(e) => setBulkForm(b => ({ ...b, eventDate: e.target.value }))}
                                        className="modal-input"
                                    />
                                </div>
                            </div>
                            <div className="form-row-grid">
                                <div className="form-group">
                                    <label>Expected Guest Count</label>
                                    <input
                                        type="number"
                                        placeholder="100"
                                        value={bulkForm.guestCount}
                                        onChange={(e) => setBulkForm(b => ({ ...b, guestCount: e.target.value }))}
                                        className="modal-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Total Deal Value (₹) *</label>
                                    <input
                                        type="number"
                                        placeholder="1500.00"
                                        value={bulkForm.totalDeal}
                                        onChange={(e) => setBulkForm(b => ({ ...b, totalDeal: e.target.value }))}
                                        className="modal-input"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Advance Deposit Paid (₹)</label>
                                <input
                                    type="number"
                                    placeholder="500.00"
                                    value={bulkForm.advancePaid}
                                    onChange={(e) => setBulkForm(b => ({ ...b, advancePaid: e.target.value }))}
                                    className="modal-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Catering Details (Venue & Menu notes)</label>
                                <textarea
                                    placeholder="e.g. Garden Party, Starter Veg-Platter, Main Course paneer/butter chicken, Gulab Jamun dessert"
                                    value={bulkForm.notes}
                                    onChange={(e) => setBulkForm(b => ({ ...b, notes: e.target.value }))}
                                    className="modal-input"
                                    style={{ height: '80px', resize: 'vertical' }}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="cancel-btn" onClick={() => setShowAddBulkModal(false)}>Cancel</button>
                            <button className="save-btn" style={{ background: primaryColor }} onClick={handleSaveBulkOrder}>Register Booking</button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- Table Actions Modal --- */}
            {actionTable && (() => {
                const key = `${actionTable.area}-${actionTable.tableNum}`;
                const cached = tableCarts[key];
                const isOccupied = !!(cached && cached.cart && cached.cart.length > 0);
                const isDirty = dirtyTables[key];
                const isCompleted = cached && cached.status === 'completed';

                let statusText = 'Vacant';
                let statusBg = '#E6F4EA';
                let statusColor = '#137333';
                if (isCompleted) {
                    statusText = 'Completed (Eat Done / Pending Bill)';
                    statusBg = '#FEF7E0';
                    statusColor = '#B06000';
                } else if (isOccupied) {
                    statusText = 'Occupied';
                    statusBg = '#FCE8E6';
                    statusColor = '#C5221F';
                } else if (isDirty) {
                    statusText = 'Dirty (Needs Cleaning)';
                    statusBg = '#F1F3F4';
                    statusColor = '#5F6368';
                }

                return (
                    <div className="fooddesk-modal-overlay" onClick={() => setActionTable(null)}>
                        <div className="fooddesk-modal" style={{ maxWidth: '400px', width: '95%' }} onClick={e => e.stopPropagation()}>
                            <div className="modal-header" style={{ borderBottom: '1px solid #F1F5F9' }}>
                                <h3>🪑 Table {actionTable.tableNum} Actions</h3>
                                <button className="close-btn" onClick={() => setActionTable(null)}>×</button>
                            </div>
                            <div className="modal-body" style={{ padding: '20px 24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px dashed #E2E8F0' }}>
                                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#718096' }}>Seating Area:</span>
                                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#1A1A2E' }}>{actionTable.area}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#718096' }}>Current Status:</span>
                                    <span style={{
                                        fontSize: '11px',
                                        fontWeight: 900,
                                        padding: '4px 10px',
                                        borderRadius: '20px',
                                        background: statusBg,
                                        color: statusColor,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>{statusText}</span>
                                </div>

                                {isOccupied && cached.cart && (
                                    <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #E2E8F0' }}>
                                        <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 800, color: '#1A1A2E' }}>Active Order Items:</p>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '120px', overflowY: 'auto' }}>
                                            {cached.cart.map((cartItem: any, idx: number) => (
                                                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 500 }}>
                                                    <span style={{ color: '#4A5568' }}>{cartItem.item.name} <span style={{ fontWeight: 800, color: '#1A1A2E' }}>× {cartItem.qty}</span></span>
                                                    <span style={{ fontWeight: 700, color: '#1A1A2E' }}>₹{(cartItem.item.sellingPrice * cartItem.qty).toFixed(2)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {/* Action: Take or Edit Order */}
                                    <button
                                        style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                            background: '#F0FDF4', color: '#166534', border: '1px solid #BBF7D0',
                                            borderRadius: '12px', padding: '12px', fontWeight: 800, fontSize: '13px',
                                            cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s'
                                        }}
                                        onClick={() => {
                                            setSelectedTable(actionTable.tableNum);
                                            setTableNumber(`${actionTable.area} - Table ${actionTable.tableNum}`);
                                            setOrderType('Dining');
                                            if (isOccupied || isCompleted) {
                                                setCart(cached.cart);
                                                if (cached.notes) setNotesText(cached.notes);
                                                if (cached.customerId) {
                                                    const partyObj = parties.find(p => p.id === cached.customerId);
                                                    if (partyObj) setSelectedParty(partyObj);
                                                }
                                            } else {
                                                setCart([]);
                                                setSelectedParty(null);
                                                setNotesText('');
                                            }
                                            setActionTable(null);
                                            toast.success(`Active POS Cart switched to Table ${actionTable.tableNum}`);
                                        }}
                                    >
                                        📝 {isOccupied ? 'Edit Order / Add Items' : 'Take Order (Open POS Cart)'}
                                    </button>

                                    {/* Action: Mark Eat Done (Only for Occupied) */}
                                    {isOccupied && !isCompleted && (
                                        <button
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '10px',
                                                background: '#FEF3C7', color: '#B45309', border: '1px solid #FDE68A',
                                                borderRadius: '12px', padding: '12px', fontWeight: 800, fontSize: '13px',
                                                cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s'
                                            }}
                                            onClick={() => {
                                                setTableCarts((prev: any) => ({
                                                    ...prev,
                                                    [key]: {
                                                        ...prev[key],
                                                        status: 'completed'
                                                    }
                                                }));
                                                toast.success(`Table ${actionTable.tableNum} marked Done (Dining Completed)!`);
                                                setActionTable(null);
                                            }}
                                        >
                                            🏁 Mark Eat Done (Dining Completed)
                                        </button>
                                    )}

                                    {/* Action: Checkout & Bill */}
                                    {(isOccupied || isCompleted) && (
                                        <button
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '10px',
                                                background: `linear-gradient(135deg, ${primaryColor}, ${primaryHoverColor})`, color: 'white', border: 'none',
                                                borderRadius: '12px', padding: '12px', fontWeight: 800, fontSize: '13px',
                                                cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s', boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                                            }}
                                            onClick={() => {
                                                // Load to cart first
                                                setSelectedTable(actionTable.tableNum);
                                                setTableNumber(`${actionTable.area} - Table ${actionTable.tableNum}`);
                                                setOrderType('Dining');
                                                setCart(cached.cart);
                                                if (cached.notes) setNotesText(cached.notes);
                                                if (cached.customerId) {
                                                    const partyObj = parties.find(p => p.id === cached.customerId);
                                                    if (partyObj) setSelectedParty(partyObj);
                                                }
                                                setActionTable(null);
                                                // Scroll to checkout section / alert
                                                toast.success(`Loaded Table ${actionTable.tableNum} cart. Click 'Checkout & Print' to bill.`);
                                            }}
                                        >
                                            🧾 Checkout & Bill (₹{cached.cart.reduce((sum: number, c: any) => sum + (c.item.sellingPrice * c.qty), 0).toFixed(2)})
                                        </button>
                                    )}

                                    {/* Action: Send KOT to Kitchen (Only if occupied) */}
                                    {isOccupied && (
                                        <button
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '10px',
                                                background: '#EFF6FF', color: '#1E40AF', border: '1px solid #BFDBFE',
                                                borderRadius: '12px', padding: '12px', fontWeight: 800, fontSize: '13px',
                                                cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s'
                                            }}
                                            onClick={() => {
                                                setSelectedTable(actionTable.tableNum);
                                                setTableNumber(`${actionTable.area} - Table ${actionTable.tableNum}`);
                                                setOrderType('Dining');
                                                setCart(cached.cart);
                                                if (cached.notes) setNotesText(cached.notes);
                                                if (cached.customerId) {
                                                    const partyObj = parties.find(p => p.id === cached.customerId);
                                                    if (partyObj) setSelectedParty(partyObj);
                                                }
                                                setActionTable(null);
                                                // Send KOT directly
                                                setTimeout(() => {
                                                    handleSendToKitchen();
                                                }, 100);
                                            }}
                                        >
                                            🍳 Send KOT to Kitchen
                                        </button>
                                    )}

                                    {/* Action: Clean / Reset Table */}
                                    {(isOccupied || isCompleted || isDirty) && (
                                        <button
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '10px',
                                                background: '#FEF2F2', color: '#991B1B', border: '1px solid #FCA5A5',
                                                borderRadius: '12px', padding: '12px', fontWeight: 800, fontSize: '13px',
                                                cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s'
                                            }}
                                            onClick={() => {
                                                // Clear table cart
                                                setTableCarts((prev: any) => {
                                                    const next = { ...prev };
                                                    delete next[key];
                                                    return next;
                                                });
                                                setDirtyTables((prev: any) => ({
                                                    ...prev,
                                                    [key]: false
                                                }));
                                                if (selectedTable === actionTable.tableNum) {
                                                    setCart([]);
                                                    setSelectedTable(null);
                                                    setSelectedParty(null);
                                                    setNotesText('');
                                                }
                                                toast.success(`Table ${actionTable.tableNum} has been fully cleared & set to Vacant!`);
                                                setActionTable(null);
                                            }}
                                        >
                                            🧹 Clean & Vacate Table
                                        </button>
                                    )}

                                    {/* Action: Just mark clean (Only if Dirty) */}
                                    {isDirty && !isOccupied && !isCompleted && (
                                        <button
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '10px',
                                                background: '#F1F5F9', color: '#334155', border: '1px solid #CBD5E1',
                                                borderRadius: '12px', padding: '12px', fontWeight: 800, fontSize: '13px',
                                                cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s'
                                            }}
                                            onClick={() => {
                                                setDirtyTables((prev: any) => ({
                                                    ...prev,
                                                    [key]: false
                                                }));
                                                toast.success(`Table ${actionTable.tableNum} marked Clean.`);
                                                setActionTable(null);
                                            }}
                                        >
                                            🧹 Mark Table as Cleaned
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })()}

            {/* --- Thermal Receipt Modal --- */}
            {viewingReceipt && (
                <div className="fooddesk-modal-overlay" onClick={() => setViewingReceipt(null)}>
                    <div className="fooddesk-modal" style={{ width: '380px', fontFamily: 'monospace' }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ padding: '24px', background: '#FFFDF9', color: '#000000', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
                            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                                <h3 style={{ margin: '0 0 4px', fontWeight: 'bold' }}>{company.name}</h3>
                                <p style={{ margin: 0, fontSize: '11px' }}>{company.address || 'India'}</p>
                                <p style={{ margin: '2px 0 0', fontSize: '11px' }}>Phone: {company.phone || '9876543210'}</p>
                            </div>
                            
                            <div style={{ borderTop: '1px dashed #000', borderBottom: '1px dashed #000', padding: '10px 0', margin: '12px 0', fontSize: '12px' }}>
                                <p style={{ margin: '0 0 4px' }}>Ticket: <strong>{viewingReceipt.invoiceNumber}</strong></p>
                                <p style={{ margin: '0 0 4px' }}>Date: {formatDate(viewingReceipt.date)}</p>
                                <p style={{ margin: 0 }}>Loc: {viewingReceipt.partyName}</p>
                            </div>

                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #000' }}>
                                        <th style={{ textAlign: 'left', padding: '4px 0' }}>Item</th>
                                        <th style={{ textAlign: 'center', padding: '4px 0' }}>Qty</th>
                                        <th style={{ textAlign: 'right', padding: '4px 0' }}>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {viewingReceipt.items.map((it: any, k) => (
                                        <tr key={k}>
                                            <td style={{ padding: '4px 0' }}>{it.name}</td>
                                            <td style={{ textAlign: 'center', padding: '4px 0' }}>{it.qty}</td>
                                            <td style={{ textAlign: 'right', padding: '4px 0' }}>₹{it.amount.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div style={{ borderTop: '1px dashed #000', paddingTop: '10px', marginTop: '12px', fontSize: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <span>Subtotal:</span>
                                    <span>₹{viewingReceipt.subTotal.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <span>CGST / SGST (5%):</span>
                                    <span>₹{viewingReceipt.totalGst.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 'bold', marginTop: '8px', borderTop: '1px solid #000', paddingTop: '8px' }}>
                                    <span>Grand Total:</span>
                                    <span>₹{viewingReceipt.grandTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            {company?.bankDetails?.upiId && (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '16px 0', borderTop: '1px dashed #000', paddingTop: '12px' }}>
                                    <img 
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(`upi://pay?pa=${company.bankDetails.upiId}&pn=${encodeURIComponent(company.name)}&am=${viewingReceipt.grandTotal.toFixed(2)}&cu=INR`)}`} 
                                        alt="UPI QR Code" 
                                        style={{ width: '100px', height: '100px', marginBottom: '4px' }} 
                                    />
                                    <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#000000' }}>SCAN TO PAY (UPI)</span>
                                </div>
                            )}


                            <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '11px' }}>
                                <p style={{ margin: 0 }}>Thank you for your visit!</p>
                                <p style={{ margin: '4px 0 0', fontWeight: 'bold' }}>Powered by Edibio ERP</p>
                                <button 
                                    onClick={() => { window.print(); }} 
                                    className="checkout-btn" 
                                    style={{ background: '#000000', color: '#FFFFFF', padding: '8px', fontSize: '12px', marginTop: '16px', width: '100%' }}
                                >
                                    Print Receipt
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* FOODDESK PORTAL STYLES */}
            <style>{`
                .fooddesk-shell { display: flex; height: 100vh; width: 100vw; background: #F8FAFC; overflow: hidden; font-family: 'Outfit', 'Inter', sans-serif; }
                .fooddesk-sidebar { width: 250px; background: white; color: #1E293B; display: flex; flex-direction: column; flex-shrink: 0; box-shadow: 4px 0 24px rgba(0,0,0,0.05); border-right: 1px solid #E2E8F0; }
                
                .brand-logo-panel { padding: 24px 20px; border-bottom: 1px solid #E2E8F0; display: flex; align-items: center; gap: 12px; }
                .brand-logo-img-wrapper { width: 44px; height: 44px; border-radius: 12px; overflow: hidden; background: white; padding: 4px; display: flex; align-items: center; justify-content: center; border: 1px solid #E2E8F0; }
                .brand-logo-img { width: 100%; height: 100%; object-fit: contain; }
                .brand-name { font-weight: 900; font-size: 20px; margin: 0; color: #1A1A2E; }
                .brand-mode { font-size: 11px; margin: 2px 0 0; color: #64748B; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
                
                .sidebar-links-panel { display: flex; flex-direction: column; gap: 6px; }
                .sidebar-tab-btn { border: none; background: none; display: flex; align-items: center; gap: 14px; padding: 12px 16px; border-radius: 12px; color: #475569; text-decoration: none; font-size: 14px; font-weight: 600; transition: all 0.2s; cursor: pointer; text-align: left; width: 100%; }
                .sidebar-tab-btn:hover { background: rgba(0,0,0,0.04); color: #1E293B; }
                .sidebar-tab-btn.active { color: white !important; box-shadow: 0 8px 16px rgba(0,0,0,0.1); }
                
                .sidebar-exit-area { padding: 20px 16px; margin-top: auto; border-top: 1px solid #E2E8F0; }
                .exit-link { display: flex; align-items: center; gap: 12px; color: #64748B; text-decoration: none; font-size: 13px; font-weight: 700; transition: color 0.2s; }
                .exit-link:hover { color: #EF4444; }
                
                .fooddesk-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
                .fooddesk-topbar { height: 75px; background: white; border-bottom: 1px solid #E2E8F0; display: flex; align-items: center; justify-content: space-between; padding: 0 32px; flex-shrink: 0; }
                .search-box-wrapper { position: relative; width: 450px; }
                .search-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); }
                .search-input { width: 100%; border: 1px solid #E2E8F0; background: #F8FAFC; padding: 12px 16px 12px 46px; border-radius: 99px; font-size: 14px; font-weight: 500; outline: none; transition: border-color 0.2s; }
                .search-input:focus { border-color: ${primaryColor}; }
                .topbar-user-area { display: flex; align-items: center; gap: 20px; }
                .location-selector { font-size: 13px; color: #4A5568; display: flex; align-items: center; gap: 6px; }
                .notif-btn { width: 40px; height: 40px; border-radius: 50%; border: 1px solid #E2E8F0; background: white; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #4A5568; }
                .notif-btn:hover { background: #F8FAFC; }
                .user-avatar-circle { width: 40px; height: 40px; border-radius: 50%; font-size: 20px; display: flex; align-items: center; justify-content: center; font-weight: bold; }
                .mobile-hamburger-btn { display: none; }
                .desktop-sidebar-toggle-btn { display: flex; }
                .mobile-cart-toggle-btn { display: none; }

                .fooddesk-body { flex: 1; padding: 24px 32px; overflow-y: auto; }
                .promo-banner { border-radius: 24px; padding: 28px 36px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 10px 30px rgba(0,0,0,0.02); margin-bottom: 28px; position: relative; overflow: hidden; }
                .promo-content { max-width: 60%; position: relative; z-index: 2; }
                .promo-tag { color: white; font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 20px; letter-spacing: 0.05em; }
                .promo-title { font-size: 28px; font-weight: 900; color: #1A1A2E; margin: 12px 0 6px; }
                .promo-subtitle { color: #4A5568; font-size: 13px; margin: 0 0 12px; font-weight: 500; }
                .promo-offer { font-weight: 800; font-size: 14px; margin: 0 0 20px; }
                .order-now-btn { color: white; border: none; font-weight: 800; font-size: 13px; padding: 10px 24px; border-radius: 12px; cursor: pointer; box-shadow: 0 8px 16px rgba(0,0,0,0.08); transition: transform 0.2s; }
                .order-now-btn:hover { transform: translateY(-1px); }
                .promo-graphic { font-size: 96px; position: absolute; right: 36px; top: 50%; transform: translateY(-50%); opacity: 0.95; user-select: none; }
                .sidebar-profile-panel:hover { background: #F1F5F9 !important; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }

                @keyframes promoFadeIn {
                    from { opacity: 0; transform: translateX(16px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .promo-animate { animation: promoFadeIn 0.45s cubic-bezier(0.22, 1, 0.36, 1); }

                .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; margin-top: 12px; }
                .section-header h3 { font-size: 18px; font-weight: 900; color: #1A1A2E; margin: 0; }
                .add-dish-btn { background: none; border: none; font-weight: 700; font-size: 13px; cursor: pointer; }
                .add-dish-btn:hover { text-decoration: underline; }
                .seed-btn { border: none; color: white; padding: 6px 14px; border-radius: 8px; font-weight: 700; font-size: 11px; cursor: pointer; }

                .categories-ribbon { display: flex; gap: 12px; overflow-x: auto; padding-bottom: 10px; margin-bottom: 24px; }
                .category-chip { display: flex; align-items: center; gap: 8px; border: 1px solid #E2E8F0; padding: 10px 20px; border-radius: 99px; font-size: 13px; font-weight: 700; cursor: pointer; flex-shrink: 0; transition: all 0.2s; }
                .category-chip:hover { border-color: ${primaryColor}; }
                .category-emoji { font-size: 16px; }

                .empty-catalog-card { background: white; border: 2px dashed #E2E8F0; border-radius: 20px; padding: 40px; text-align: center; color: #A0AEC0; font-size: 14px; font-weight: 600; }
                .dishes-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 20px; }
                .dish-card { background: white; border: 1px solid #E2E8F0; border-radius: 20px; padding: 16px; position: relative; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
                .dish-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.04); }
                .dish-card-image-box { width: 100%; height: 110px; border-radius: 16px; background: #F8FAFC; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; position: relative; border: 1px solid #EFF2F5; }
                .wishlist-btn { position: absolute; top: 8px; right: 8px; border: none; background: white; border-radius: 50%; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.05); }
                .rating-row { display: flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 800; color: #4A5568; margin-bottom: 6px; }
                .dish-name { font-size: 14px; font-weight: 800; color: #1A1A2E; margin: 0 0 10px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                .price-row { display: flex; justify-content: space-between; align-items: center; }
                .dish-price { font-weight: 900; font-size: 15px; color: #1A1A2E; }
                .add-to-cart-btn { border: none; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; }

                .fooddesk-cart-panel { width: 380px; background: white; border-left: 1px solid #E2E8F0; display: flex; flex-direction: column; flex-shrink: 0; }
                .balance-card-widget { margin: 24px; padding: 24px; border-radius: 24px; color: white; display: flex; flex-direction: column; justify-content: space-between; min-height: 150px; box-shadow: 0 10px 24px rgba(0,0,0,0.06); }
                .bal-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.6; margin: 0; }
                .bal-amount { font-size: 24px; font-weight: 900; margin: 6px 0; }
                .bal-logo { font-size: 11px; font-weight: 800; font-style: italic; opacity: 0.8; }
                .bal-card-actions { display: flex; gap: 10px; margin-top: auto; }
                .bal-action-btn { flex: 1; border: none; background: rgba(255,255,255,0.15); color: white; border-radius: 8px; padding: 8px; font-size: 11px; font-weight: 700; cursor: pointer; transition: background 0.2s; }
                .bal-action-btn:hover { background: rgba(255,255,255,0.25); }

                .address-widget-copy { padding: 0 24px; display: flex; flex-direction: column; margin-bottom: 20px; }
                .address-lbl { font-size: 11px; font-weight: 700; color: #A0AEC0; text-transform: uppercase; letter-spacing: 0.05em; }
                .change-btn { background: none; border: none; color: ${primaryColor}; font-weight: 700; font-size: 11px; cursor: pointer; }
                .change-btn:hover { text-decoration: underline; }
                .address-val { font-size: 13px; font-weight: 800; color: #1A1A2E; margin: 6px 0 2px 0; }
                .address-meta-desc { font-size: 11px; color: #A0AEC0; margin: 0; line-height: 1.4; }
                .address-action-btn { flex: 1; background: white; border: 1.5px solid; border-radius: 8px; padding: 8px; font-size: 11px; font-weight: 700; cursor: pointer; }
                .address-action-btn:hover { opacity: 0.8; }
                
                .cart-items-wrapper { flex: 1; padding: 0 24px; display: flex; flex-direction: column; min-height: 180px; }
                .cart-items-wrapper h4 { font-size: 12px; font-weight: 800; color: #1A1A2E; text-transform: uppercase; margin: 0 0 12px; letter-spacing: 0.05em; }
                .cart-items-scroller { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; }
                .cart-item-row { display: flex; align-items: center; gap: 12px; border-bottom: 1px dashed #E2E8F0; padding: 12px 0; }
                .cart-item-emoji { font-size: 24px; }
                .cart-item-info { flex: 1; min-width: 0; }
                .cart-item-name { font-size: 12px; font-weight: 800; color: #1A1A2E; margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                .cart-item-price { font-size: 12px; font-weight: 800; color: ${primaryColor}; margin: 2px 0 0; }
                .cart-qty-ctrl { display: flex; align-items: center; gap: 8px; }
                .qty-btn { width: 24px; height: 24px; border-radius: 5px; border: 1px solid #E2E8F0; background: white; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #718096; }
                .qty-btn.active { color: white; border: none; }
                .qty-val { font-size: 13px; font-weight: 800; color: #1A1A2E; min-width: 14px; text-align: center; }
                .cart-empty-panel { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #A0AEC0; font-size: 12px; font-weight: 700; gap: 8px; }

                .cart-totals-area { background: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 24px; }
                .total-row-item { display: flex; justify-content: space-between; font-size: 12px; color: #718096; margin-bottom: 10px; font-weight: 600; }
                .total-row-item strong { color: #1A1A2E; }
                .total-row-grand { display: flex; justify-content: space-between; align-items: center; padding-top: 16px; margin-top: 10px; font-size: 15px; color: #1A1A2E; font-weight: 900; }
                .checkout-btn { width: 100%; border: none; color: white; font-weight: 900; font-size: 13px; padding: 14px; border-radius: 12px; cursor: pointer; margin-top: 16px; box-shadow: 0 8px 16px rgba(0,0,0,0.05); }

                .discount-voucher-banner { margin: 16px 24px 24px; border-radius: 16px; padding: 14px 20px; display: flex; align-items: center; gap: 12px; border: 1.5px dashed ${primaryColor}40; }
                .voucher-title { font-size: 12px; font-weight: 900; color: #1A1A2E; margin: 0; }
                .voucher-desc { font-size: 10px; color: #718096; margin: 2px 0 0; font-weight: 500; }
                .voucher-graphic-circle { width: 36px; height: 36px; border-radius: 50%; font-size: 18px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }

                /* CUSTOM SUBPAGES STYLING */
                .custom-view-container { background: white; border: 1px solid #E2E8F0; border-radius: 20px; padding: 24px; box-shadow: 0 4px 16px rgba(0,0,0,0.02); }
                .view-title-row { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F5F9; padding-bottom: 16px; margin-bottom: 20px; }
                .view-title-row h2 { font-size: 18px; font-weight: 900; color: #1E293B; margin: 0; }
                .view-action-btn { color: white; border: none; font-weight: 700; font-size: 12px; padding: 8px 16px; border-radius: 8px; cursor: pointer; }
                
                .custom-table-wrapper { overflow-x: auto; }
                .custom-table { width: 100%; border-collapse: collapse; text-align: left; }
                .custom-table th { font-size: 11px; font-weight: 700; color: #94A3B8; text-transform: uppercase; padding: 12px 16px; border-bottom: 2px solid #F1F5F9; }
                .custom-table td { padding: 16px; border-bottom: 1px solid #F1F5F9; font-size: 13px; color: #334155; }
                .action-icon-btn { border: none; background: #F8FAFC; border-radius: 6px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
                .action-icon-btn.text-blue { color: #2563EB; }
                .action-icon-btn.text-red { color: #DC2626; }
                .action-icon-btn:hover { background: #E2E8F0; }
                .view-receipt-action-btn { background: white; border: 1.5px solid; border-radius: 8px; padding: 6px 12px; font-size: 11px; font-weight: 700; cursor: pointer; }

                .expense-logger-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 20px; }
                .expense-form-card { background: #FAFAFA; border-radius: 16px; padding: 20px; display: flex; flex-direction: column; gap: 12px; }
                .expense-form-card h4 { font-size: 13px; font-weight: 800; color: #1E293B; margin: 0 0 6px 0; }
                .expense-list-card { display: flex; flex-direction: column; min-height: 300px; }
                .expense-list-card h4 { font-size: 13px; font-weight: 800; color: #1E293B; margin: 0 0 12px 0; }
                .expense-items-scroll { flex: 1; overflow-y: auto; max-height: 320px; display: flex; flex-direction: column; gap: 8px; }
                .expense-item-row-card { background: white; border: 1px solid #E2E8F0; padding: 12px 16px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; }

                .analytics-kpi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
                .analytics-card { background: #FAFAFA; border-radius: 16px; padding: 20px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.01); }
                .kpi-lbl { font-size: 11px; font-weight: 700; color: #94A3B8; text-transform: uppercase; margin: 0; }
                .analytics-card h3 { font-size: 20px; font-weight: 900; color: #1E293B; margin: 8px 0 0 0; }
                .top-selling-dishes-card { background: #FAFAFA; border-radius: 16px; padding: 20px; }
                .top-selling-dishes-card h4 { font-size: 13px; font-weight: 800; color: #1E293B; margin: 0 0 16px 0; }
                .progress-bar-bg { background: #E2E8F0; height: 8px; border-radius: 99px; overflow: hidden; margin-top: 4px; }
                .progress-bar-fill { height: 100%; border-radius: 99px; transition: width 0.3s ease; }

                .settings-form-card { background: #FAFAFA; border-radius: 16px; padding: 24px; display: flex; flex-direction: column; gap: 16px; }

                /* MODAL OVERLAYS */
                .fooddesk-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); z-index: 1000; display: flex; align-items: center; justify-content: center; }
                .fooddesk-modal { background: white; border-radius: 24px; width: 450px; max-width: 90vw; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.1); }
                .modal-header { padding: 20px 24px; border-bottom: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center; }
                .modal-header h3 { font-size: 15px; font-weight: 900; color: #1A1A2E; margin: 0; }
                .close-btn { background: none; border: none; font-size: 24px; color: #A0AEC0; cursor: pointer; line-height: 1; }
                .modal-body-content { padding: 24px; display: flex; flex-direction: column; gap: 16px; }
                .form-group { display: flex; flex-direction: column; gap: 6px; }
                .form-group label { font-size: 11px; font-weight: 700; color: #4A5568; text-transform: uppercase; }
                .form-row-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
                .modal-input { border: 1px solid #E2E8F0; background: #F8FAFC; padding: 10px 14px; border-radius: 10px; font-size: 13px; font-weight: 500; outline: none; }
                .modal-input:focus { border-color: ${primaryColor}; }
                .modal-footer { padding: 16px 24px; border-top: 1px solid #E2E8F0; display: flex; justify-content: flex-end; gap: 10px; }
                .cancel-btn { border: 1px solid #E2E8F0; background: white; color: #718096; font-weight: 700; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 12px; }
                .save-btn { border: none; color: white; font-weight: 700; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 12px; }

                /* RESPONSIVE MOBILE MEDIA QUERIES */
                @media (max-width: 1024px) {
                    .fooddesk-sidebar {
                        position: fixed;
                        top: 0;
                        left: -250px;
                        height: 100vh;
                        z-index: 1001;
                        transition: left 0.3s ease;
                    }
                    .fooddesk-sidebar.mobile-open {
                        left: 0;
                    }
                    .fooddesk-cart-panel {
                        position: fixed;
                        top: 0;
                        right: -380px;
                        height: 100vh;
                        z-index: 1001;
                        transition: right 0.3s ease;
                    }
                    .fooddesk-cart-panel.mobile-open {
                        right: 0;
                    }
                    .mobile-hamburger-btn {
                        display: flex !important;
                    }
                    .mobile-cart-toggle-btn {
                        display: flex !important;
                    }
                    .desktop-sidebar-toggle-btn {
                        display: none !important;
                    }
                    .desktop-cart-toggle-btn {
                        display: none !important;
                    }
                }
                @media (max-width: 768px) {
                    .fooddesk-topbar {
                        padding: 0 16px;
                    }
                    .fooddesk-body {
                        padding: 16px;
                    }
                    .analytics-kpi-grid {
                        grid-template-columns: 1fr;
                    }
                    .expense-logger-grid {
                        grid-template-columns: 1fr;
                    }
                    .dishes-grid {
                        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
                        gap: 12px;
                    }
                    .tables-layout-grid {
                        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)) !important;
                    }
                    .promo-banner {
                        padding: 16px;
                        flex-direction: column;
                        align-items: flex-start;
                    }
                    .promo-content {
                        max-width: 100%;
                    }
                    .promo-graphic {
                        position: static;
                        transform: none;
                        font-size: 48px;
                        margin-top: 12px;
                    }
                }
            `}</style>
        </>
    );
}

// ============================================================================
// 2. LOADSWIFT LOGISTICS DASHBOARD
// ============================================================================
function LogisticsDashboard({ company }: { company: any }) {
    const invoices = useCompanyData('invoices') as Invoice[];
    const { addInvoice, nextInvoiceNumber } = useStore();
    const router = useRouter();

    useEffect(() => {
        if (company && company.type === 'Logistics') {
            router.replace('/logistics/tracking');
        }
    }, [company, router]);

    const [searchQuery, setSearchQuery] = useState('');
    const [activeStatus, setActiveStatus] = useState('All');
    const [selectedLoad, setSelectedLoad] = useState<any>(null);
    const [showAddLoadModal, setShowAddLoadModal] = useState(false);
    const [loadForm, setLoadForm] = useState({
        loadNumber: '', customerName: '', driverName: '',
        pickup: '', delivery: '', price: '', status: 'in-transit'
    });

    // Extract loads from invoices
    const loads = useMemo(() => {
        return invoices.filter((inv: any) => inv.invoiceType === 'load');
    }, [invoices]);

    // Select first load initially if nothing is selected
    useEffect(() => {
        if (loads.length > 0 && !selectedLoad) {
            setSelectedLoad(loads[0]);
        }
    }, [loads, selectedLoad]);

    // Seed default loads if none exist
    const handleSeedLoads = () => {
        const defaultLoads = [
            {
                number: '#41239110',
                customer: 'David Martinez',
                driver: 'Carlos Perez',
                price: 4500,
                status: 'in-transit',
                timeline: [
                    { name: 'Pick up', address: '362 Cast Avenue, Seattle WA', date: '2026-05-24 at 10:00 AM', status: 'completed' },
                    { name: 'On the way', address: '789 Highway Dr, Spokane WA', date: '2026-05-25 at 03:30 PM', status: 'completed' },
                    { name: 'Delivered', address: '789 Pine Street, Chicago IL', date: 'Estimated: 2026-05-28', status: 'pending' }
                ]
            },
            {
                number: '#3568129',
                customer: 'Jessica Turner',
                driver: 'Sarah Jenkins',
                price: 3200,
                status: 'delivered',
                timeline: [
                    { name: 'Pick up', address: '123 Main Street, Dallas TX', date: '2026-05-20 at 09:00 AM', status: 'completed' },
                    { name: 'On the way', address: '789 Central Ave, Little Rock AR', date: '2026-05-22 at 01:40 PM', status: 'completed' },
                    { name: 'Delivered', address: '163 Pine St, Chicago IL', date: '2026-05-24 at 05:00 PM', status: 'completed' }
                ]
            },
            {
                number: '#1248075',
                customer: 'Robert Chen',
                driver: 'Marcus Vance',
                price: 5200,
                status: 'upcoming',
                timeline: [
                    { name: 'Pick up', address: '456 Oak Avenue, Houston TX', date: 'Scheduled: 2026-05-29 at 08:00 AM', status: 'pending' },
                    { name: 'On the way', address: 'Pending Route Dispatch', date: 'TBD', status: 'pending' },
                    { name: 'Delivered', address: '789 Pine Street, Chicago IL', date: 'TBD', status: 'pending' }
                ]
            }
        ];

        defaultLoads.forEach(load => {
            addInvoice({
                id: Math.random().toString(36).slice(2) + Date.now().toString(36),
                companyId: company.id,
                invoiceType: 'load' as any,
                invoiceNumber: load.number,
                date: new Date().toISOString().slice(0, 10),
                items: load.timeline.map(t => ({
                    name: t.name,
                    hsnCode: t.status, // completed / pending
                    qty: 1,
                    unit: 'leg',
                    rate: 0,
                    discount: 0,
                    discountAmt: 0,
                    taxableAmt: 0,
                    gstRate: 0 as any,
                    cgst: 0, sgst: 0, igst: 0, cess: 0, totalGst: 0,
                    amount: 0,
                    description: `${t.address} || ${t.date}`
                })),
                subTotal: load.price,
                totalDiscount: 0,
                taxableAmount: load.price,
                totalCgst: 0, totalSgst: 0, totalIgst: 0, totalCess: 0, totalGst: 0,
                shippingCharges: 0, packingCharges: 0, adjustmentAmount: 0, roundOff: 0,
                grandTotal: load.price,
                paymentStatus: load.status as any,
                amountPaid: load.status === 'delivered' ? load.price : 0,
                balanceDue: load.status === 'delivered' ? 0 : load.price,
                payments: load.status === 'delivered' ? [{ method: 'bank', amount: load.price, date: new Date().toISOString().slice(0, 10) }] : [],
                paymentMethod: 'bank',
                partyName: load.customer,
                notes: `${load.driver}`,
                isGstBill: false, isHidden: false, isPrivate: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
        });
        toast.success('Sample loads seeded!');
    };

    // Filter loads
    const filteredLoads = useMemo(() => {
        return loads.filter(l => {
            const matchesSearch = l.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (l.partyName && l.partyName.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesStatus = activeStatus === 'All' || l.paymentStatus === activeStatus.toLowerCase();
            return matchesSearch && matchesStatus;
        });
    }, [loads, searchQuery, activeStatus]);

    // Save added load
    const handleSaveLoad = () => {
        if (!loadForm.loadNumber || !loadForm.customerName || !loadForm.price) {
            return toast.error('Load ID, Customer, and Price are required');
        }

        const newId = Math.random().toString(36).slice(2) + Date.now().toString(36);
        const timeline = [
            { name: 'Pick up', address: loadForm.pickup || 'Address TBD', date: 'Pending Dispatch', status: 'pending' },
            { name: 'On the way', address: 'Route in Progress', date: 'TBD', status: 'pending' },
            { name: 'Delivered', address: loadForm.delivery || 'Address TBD', date: 'TBD', status: 'pending' }
        ];

        addInvoice({
            id: newId,
            companyId: company.id,
            invoiceType: 'load' as any,
            invoiceNumber: loadForm.loadNumber.startsWith('#') ? loadForm.loadNumber : `#${loadForm.loadNumber}`,
            date: new Date().toISOString().slice(0, 10),
            items: timeline.map(t => ({
                name: t.name,
                hsnCode: t.status,
                qty: 1,
                unit: 'leg',
                rate: 0,
                discount: 0,
                discountAmt: 0,
                taxableAmt: 0,
                gstRate: 0 as any,
                cgst: 0, sgst: 0, igst: 0, cess: 0, totalGst: 0,
                amount: 0,
                description: `${t.address} || ${t.date}`
            })),
            subTotal: parseFloat(loadForm.price) || 0,
            totalDiscount: 0,
            taxableAmount: parseFloat(loadForm.price) || 0,
            totalCgst: 0, totalSgst: 0, totalIgst: 0, totalCess: 0, totalGst: 0,
            shippingCharges: 0, packingCharges: 0, adjustmentAmount: 0, roundOff: 0,
            grandTotal: parseFloat(loadForm.price) || 0,
            paymentStatus: loadForm.status as any,
            amountPaid: loadForm.status === 'delivered' ? (parseFloat(loadForm.price) || 0) : 0,
            balanceDue: loadForm.status === 'delivered' ? 0 : (parseFloat(loadForm.price) || 0),
            payments: loadForm.status === 'delivered' ? [{ method: 'bank', amount: parseFloat(loadForm.price) || 0, date: new Date().toISOString().slice(0, 10) }] : [],
            paymentMethod: 'bank',
            partyName: loadForm.customerName,
            notes: loadForm.driverName || 'Unassigned',
            isGstBill: false, isHidden: false, isPrivate: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });

        setShowAddLoadModal(false);
        setLoadForm({
            loadNumber: '', customerName: '', driverName: '',
            pickup: '', delivery: '', price: '', status: 'in-transit'
        });
        toast.success('Load added!');
    };

    // Parse timeline points from Invoice items
    const selectedLoadTimeline = useMemo(() => {
        if (!selectedLoad) return [];
        return (selectedLoad.items || []).map((it: any) => {
            const parts = (it.description || '').split(' || ');
            return {
                name: it.name,
                address: parts[0] || '',
                date: parts[1] || '',
                status: it.hsnCode || 'pending'
            };
        });
    }, [selectedLoad]);

    // Summary counts
    const counts = useMemo(() => {
        return {
            all: loads.length,
            inTransit: loads.filter(l => (l.paymentStatus as any) === 'in-transit').length,
            delivered: loads.filter(l => (l.paymentStatus as any) === 'delivered').length,
            upcoming: loads.filter(l => (l.paymentStatus as any) === 'upcoming').length,
        };
    }, [loads]);

    return (
        <>
            <div className="logistics-shell">
                {/* --- Bespoke Sidebar (LoadSwift) --- */}
                <aside className="logistics-sidebar">
                    <div className="logistics-brand-area">
                        <div className="logistics-logo">
                            🚚
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <p className="logistics-name">LoadSwift</p>
                            <p className="logistics-subtext">{company.name}</p>
                        </div>
                    </div>

                    <nav className="logistics-nav-menu">
                        <Link href="/company/dashboard" className="logistics-link active">
                            <Navigation size={15} /> <span>Tracking Loads</span>
                        </Link>
                        <Link href="/company/inventory" className="logistics-link">
                            <Warehouse size={15} /> <span>Maintenance / Assets</span>
                        </Link>
                        <Link href="/company/expenses" className="logistics-link">
                            <DollarSign size={15} /> <span>Fuel & Expenses</span>
                        </Link>
                        <Link href="/company/parties" className="logistics-link">
                            <Users size={15} /> <span>Drivers & Clients</span>
                        </Link>
                        <Link href="/company/reports" className="logistics-link">
                            <BarChart3 size={15} /> <span>Analytics</span>
                        </Link>
                        <Link href="/company/settings" className="logistics-link">
                            <Settings size={15} /> <span>Settings</span>
                        </Link>
                    </nav>

                    <div className="logistics-exit-area">
                        <Link href="/companies" className="logistics-exit-link">
                            <LogOut size={15} /> <span>Exit Broker Portal</span>
                        </Link>
                    </div>
                </aside>

                {/* --- Loads tracking list panel --- */}
                <section className="loads-list-panel">
                    <div className="loads-header">
                        <h2>Tracking loads</h2>
                        <div className="filter-row">
                            <Search size={14} color="#A0AEC0" className="list-search-icon" />
                            <input
                                placeholder="Search loads or customer..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="list-search-input"
                            />
                        </div>
                        <div className="status-tabs-row">
                            {['All', 'In-transit', 'Delivered', 'Upcoming'].map(st => {
                                const countVal = st === 'All' ? counts.all : st === 'In-transit' ? counts.inTransit : st === 'Delivered' ? counts.delivered : counts.upcoming;
                                return (
                                    <button
                                        key={st}
                                        onClick={() => setActiveStatus(st)}
                                        className={`status-tab ${activeStatus === st ? 'active' : ''}`}
                                    >
                                        <span>{st}</span>
                                        <span className="tab-count">{countVal}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="loads-scroll-area no-scrollbar">
                        {loads.length === 0 && (
                            <div style={{ padding: 40, textAlign: 'center' }}>
                                <p style={{ color: '#A0AEC0', fontSize: 13, fontWeight: 500 }}>No loads in system.</p>
                                <button className="seed-btn-cargo" onClick={handleSeedLoads}>
                                    📦 Seed Mock Cargo Loads
                                </button>
                            </div>
                        )}
                        {filteredLoads.map(load => {
                            const isSelected = selectedLoad?.id === load.id;
                            const pickupPoint = ((load.items?.[0] as any)?.description || '').split(' || ')[0] || 'Unknown';
                            const deliverPoint = ((load.items?.[load.items.length - 1] as any)?.description || '').split(' || ')[0] || 'Unknown';
                            return (
                                <div
                                    key={load.id}
                                    onClick={() => setSelectedLoad(load)}
                                    className={`load-item-card ${isSelected ? 'active' : ''}`}
                                >
                                    <div className="load-card-header">
                                        <span className="load-number">{load.invoiceNumber}</span>
                                        <span className={`load-badge ${load.paymentStatus}`}>
                                            {load.paymentStatus}
                                        </span>
                                    </div>
                                    <div className="load-route-line-area">
                                        <div className="dot green-dot" />
                                        <div className="connector" />
                                        <div className="dot blue-dot" />
                                        <div className="load-route-texts">
                                            <p className="route-p">{pickupPoint}</p>
                                            <p className="route-d">{deliverPoint}</p>
                                        </div>
                                    </div>
                                    <div className="load-card-footer">
                                        <div className="driver-info">
                                            <div className="driver-avatar-mini">👤</div>
                                            <div>
                                                <p className="driver-lbl">Driver</p>
                                                <p className="driver-val">{load.notes || 'Unassigned'}</p>
                                            </div>
                                        </div>
                                        <div className="load-price-val">
                                            ₹{load.grandTotal.toLocaleString('en-IN')}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="loads-add-footer">
                        <button className="add-load-big-btn" onClick={() => setShowAddLoadModal(true)}>
                            ➕ Add load
                        </button>
                    </div>
                </section>

                {/* --- Details slide-over panel --- */}
                <section className="load-detail-panel">
                    {selectedLoad ? (
                        <div className="detail-panel-inner no-scrollbar">
                            <div className="detail-panel-header">
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <h3>No: {selectedLoad.invoiceNumber}</h3>
                                </div>
                                <span className={`load-badge ${selectedLoad.paymentStatus}`}>
                                    {selectedLoad.paymentStatus}
                                </span>
                            </div>

                            <div className="detail-tabs-row">
                                <button className="detail-tab active">Load info</button>
                                <button className="detail-tab">Tracking</button>
                                <button className="detail-tab">Docs</button>
                            </div>

                            <div className="detail-scrollable">
                                <div className="customer-broker-card">
                                    <div className="avatar-broker">👨‍💼</div>
                                    <div style={{ flex: 1 }}>
                                        <p className="broker-title">Shipper / Customer</p>
                                        <p className="broker-name">{selectedLoad.partyName || 'Global Logistics Client'}</p>
                                    </div>
                                    <button className="msg-btn">💬</button>
                                    <button className="call-btn">📞</button>
                                </div>

                                <div className="tracking-timeline-widget">
                                    <h4>Transit Timeline</h4>
                                    <div className="timeline-items-column">
                                        {selectedLoadTimeline.map((timePt: any, idx: number) => {
                                            const isCompleted = timePt.status === 'completed';
                                            return (
                                                <div key={idx} className="timeline-row-item">
                                                    <div className="timeline-node-dot">
                                                        <div className={`node-inner ${isCompleted ? 'completed' : ''}`}>
                                                            {isCompleted ? '✓' : ''}
                                                        </div>
                                                        {idx < selectedLoadTimeline.length - 1 && <div className="node-line" />}
                                                    </div>
                                                    <div className="timeline-node-content">
                                                        <p className="node-title">{timePt.name}</p>
                                                        <p className="node-addr">{timePt.address}</p>
                                                        <p className="node-time">{timePt.date}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="pricing-summary-card">
                                    <div className="summary-row">
                                        <span>Fuel Card Rebate</span>
                                        <strong>- ₹1,500.00</strong>
                                    </div>
                                    <div className="summary-row">
                                        <span>Dispatch Base Rate</span>
                                        <strong>₹{selectedLoad.grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong>
                                    </div>
                                    <div className="summary-row-total">
                                        <span>Estimated Payout</span>
                                        <strong>₹{(selectedLoad.grandTotal - 1500).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="no-load-selected-splash">
                            <Compass size={40} color="#CBD5E0" />
                            <p>Select a load to view transit timeline and shipping documents.</p>
                        </div>
                    )}
                </section>

                {/* --- USA / Regional interactive SVG Route Map (Right) --- */}
                <aside className="logistics-map-panel">
                    <div className="map-controls">
                        <div className="map-view-toggle">
                            <button className="view-btn active">Map</button>
                            <button className="view-btn">Satellite</button>
                            <button className="view-btn">Layers</button>
                        </div>
                        <div className="map-zoom-ctrl">
                            <button className="zoom-btn">+</button>
                            <button className="zoom-btn">-</button>
                        </div>
                    </div>

                    <div className="map-canvas-container">
                        {/* Interactive SVG Road/Highway mockup */}
                        <svg className="highway-svg-canvas" viewBox="0 0 500 500" width="100%" height="100%">
                            {/* Grids and Road Networks */}
                            <path d="M 50,150 Q 150,100 250,220 T 450,180" fill="none" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" />
                            <path d="M 80,380 Q 220,300 320,400 T 450,300" fill="none" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
                            <path d="M 120,50 L 120,450" fill="none" stroke="#F1F5F9" strokeWidth="2" strokeDasharray="5,5" />
                            <path d="M 380,50 L 380,450" fill="none" stroke="#F1F5F9" strokeWidth="2" strokeDasharray="5,5" />
                            
                            {/* Selected Route Path */}
                            {selectedLoad && (
                                <>
                                    <path
                                        d="M 100,180 Q 220,120 300,280 T 400,220"
                                        fill="none"
                                        stroke="#3B82F6"
                                        strokeWidth="5"
                                        strokeLinecap="round"
                                        className="active-route-line"
                                    />
                                    {/* Moving Truck along route */}
                                    <circle cx="280" cy="220" r="10" fill="#3B82F6" className="pulsing-truck-dot" />
                                    <text x="275" y="224" fill="white" fontSize="10" fontWeight="900">🚚</text>

                                    {/* Pickup Pin */}
                                    <circle cx="100" cy="180" r="6" fill="#10B981" />
                                    <text x="85" y="165" fill="#10B981" fontSize="9" fontWeight="800">Pick up</text>

                                    {/* Delivery Pin */}
                                    <circle cx="400" cy="220" r="6" fill="#EA4335" />
                                    <text x="390" y="240" fill="#EA4335" fontSize="9" fontWeight="800">Deliver</text>
                                </>
                            )}

                            {/* Pinned Fuel Stations (matching LoadSwift UI) */}
                            <g className="fuel-station-pin" transform="translate(180, 100)">
                                <circle cx="0" cy="0" r="4" fill="#1A1A2E" />
                                <rect x="-35" y="-28" width="70" height="20" rx="6" fill="black" />
                                <text x="0" y="-14" fill="white" fontSize="9" fontWeight="800" textAnchor="middle">⛽ Jacks stop</text>
                                <text x="0" y="-4" fill="#10B981" fontSize="8" fontWeight="700" textAnchor="middle">₹3.07</text>
                            </g>

                            <g className="fuel-station-pin" transform="translate(320, 180)">
                                <circle cx="0" cy="0" r="4" fill="#1A1A2E" />
                                <rect x="-42" y="-28" width="84" height="20" rx="6" fill="black" />
                                <text x="0" y="-14" fill="white" fontSize="9" fontWeight="800" textAnchor="middle">⛽ Speedway #45</text>
                                <text x="0" y="-4" fill="#FFB020" fontSize="8" fontWeight="700" textAnchor="middle">₹3.21 New</text>
                            </g>

                            <g className="fuel-station-pin" transform="translate(250, 320)">
                                <circle cx="0" cy="0" r="4" fill="#1A1A2E" />
                                <rect x="-35" y="-28" width="70" height="20" rx="6" fill="black" />
                                <text x="0" y="-14" fill="white" fontSize="9" fontWeight="800" textAnchor="middle">⛽ Fastbreak</text>
                                <text x="0" y="-4" fill="#10B981" fontSize="8" fontWeight="700" textAnchor="middle">₹3.10</text>
                            </g>

                            <g className="fuel-station-pin" transform="translate(420, 350)">
                                <circle cx="0" cy="0" r="4" fill="#1A1A2E" />
                                <rect x="-35" y="-28" width="70" height="20" rx="6" fill="black" />
                                <text x="0" y="-14" fill="white" fontSize="9" fontWeight="800" textAnchor="middle">⛽ Speedway</text>
                                <text x="0" y="-4" fill="#10B981" fontSize="8" fontWeight="700" textAnchor="middle">₹3.18</text>
                            </g>
                        </svg>

                        {/* Floating HUD info */}
                        {selectedLoad && (
                            <div className="map-hud-info">
                                <p className="hud-label">Current Route</p>
                                <p className="hud-value">Seattle, WA ➔ Chicago, IL</p>
                                <div className="hud-row">
                                    <span>Remaining: <strong>540 mi</strong></span>
                                    <span>ETA: <strong>14 hrs</strong></span>
                                </div>
                            </div>
                        )}
                    </div>
                </aside>
            </div>

            {/* --- Add Load Modal --- */}
            {showAddLoadModal && (
                <div className="fooddesk-modal-overlay" onClick={() => setShowAddLoadModal(false)}>
                    <div className="fooddesk-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Add New Transport Cargo Load</h3>
                            <button className="close-btn" onClick={() => setShowAddLoadModal(false)}>×</button>
                        </div>
                        <div className="modal-body-content">
                            <div className="form-row-grid">
                                <div className="form-group">
                                    <label>Load Number *</label>
                                    <input
                                        placeholder="e.g. #3568129"
                                        value={loadForm.loadNumber}
                                        onChange={(e) => setLoadForm(l => ({ ...l, loadNumber: e.target.value }))}
                                        className="modal-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Dispatch Rate (₹) *</label>
                                    <input
                                        type="number"
                                        placeholder="Price in INR"
                                        value={loadForm.price}
                                        onChange={(e) => setLoadForm(l => ({ ...l, price: e.target.value }))}
                                        className="modal-input"
                                    />
                                </div>
                            </div>
                            <div className="form-row-grid">
                                <div className="form-group">
                                    <label>Shipper / Customer *</label>
                                    <input
                                        placeholder="Customer Name"
                                        value={loadForm.customerName}
                                        onChange={(e) => setLoadForm(l => ({ ...l, customerName: e.target.value }))}
                                        className="modal-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Assigned Driver</label>
                                    <input
                                        placeholder="Driver Name"
                                        value={loadForm.driverName}
                                        onChange={(e) => setLoadForm(l => ({ ...l, driverName: e.target.value }))}
                                        className="modal-input"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Pickup Address *</label>
                                <input
                                    placeholder="e.g. 123 Main Street, Dallas TX"
                                    value={loadForm.pickup}
                                    onChange={(e) => setLoadForm(l => ({ ...l, pickup: e.target.value }))}
                                    className="modal-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Delivery Address *</label>
                                <input
                                    placeholder="e.g. 789 Pine Street, Chicago IL"
                                    value={loadForm.delivery}
                                    onChange={(e) => setLoadForm(l => ({ ...l, delivery: e.target.value }))}
                                    className="modal-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Initial Status</label>
                                <select value={loadForm.status} onChange={(e) => setLoadForm(l => ({ ...l, status: e.target.value }))} className="modal-input">
                                    <option value="in-transit">In-Transit</option>
                                    <option value="upcoming">Upcoming</option>
                                    <option value="delivered">Delivered</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="cancel-btn" onClick={() => setShowAddLoadModal(false)}>Cancel</button>
                            <button className="save-btn" style={{ background: '#11111F' }} onClick={handleSaveLoad}>Save Load</button>
                        </div>
                    </div>
                </div>
            )}

            {/* LOGISTICS STYLES */}
            <style>{`
                .logistics-shell { display: flex; height: 100vh; width: 100vw; background: #F8FAFC; overflow: hidden; font-family: 'Inter', sans-serif; }
                .logistics-sidebar { width: 250px; background: #11111F; color: white; display: flex; flex-direction: column; flex-shrink: 0; }
                .logistics-brand-area { padding: 24px 20px; border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; gap: 12px; }
                .logistics-logo { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 20px; background: rgba(255,255,255,0.1); }
                .logistics-name { font-weight: 800; font-size: 16px; margin: 0; color: white; }
                .logistics-subtext { font-size: 11px; margin: 2px 0 0; color: rgba(255,255,255,0.3); font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                .logistics-nav-menu { flex: 1; padding: 24px 16px; display: flex; flex-direction: column; gap: 6px; }
                .logistics-link { display: flex; align-items: center; gap: 14px; padding: 12px 16px; border-radius: 10px; color: rgba(255,255,255,0.5); text-decoration: none; font-size: 13px; font-weight: 600; transition: all 0.2s; }
                .logistics-link:hover { background: rgba(255,255,255,0.03); color: white; }
                .logistics-link.active { background: #1A1A2E; border: 1px solid rgba(255,255,255,0.08); color: white; }
                .logistics-exit-area { padding: 20px 16px; border-top: 1px solid rgba(255,255,255,0.06); }
                .logistics-exit-link { display: flex; align-items: center; gap: 12px; color: rgba(255,255,255,0.3); text-decoration: none; font-size: 13px; font-weight: 700; transition: color 0.2s; }
                .logistics-exit-link:hover { color: #EA4335; }

                .loads-list-panel { width: 340px; background: white; border-right: 1px solid #E2E8F0; display: flex; flex-direction: column; flex-shrink: 0; }
                .loads-header { padding: 24px 20px 16px; border-bottom: 1px solid #E2E8F0; }
                .loads-header h2 { font-size: 18px; font-weight: 800; color: #1E293B; margin: 0 0 16px 0; }
                .filter-row { position: relative; margin-bottom: 16px; }
                .list-search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); }
                .list-search-input { width: 100%; border: 1px solid #E2E8F0; background: #F8FAFC; padding: 8px 12px 8px 36px; border-radius: 8px; font-size: 13px; outline: none; }
                .status-tabs-row { display: flex; gap: 4px; overflow-x: auto; padding-bottom: 4px; }
                .status-tab { display: flex; align-items: center; gap: 6px; border: none; background: none; padding: 6px 12px; border-radius: 6px; font-size: 11px; font-weight: 700; color: #64748B; cursor: pointer; flex-shrink: 0; }
                .status-tab.active { background: #F1F5F9; color: #1E293B; }
                .tab-count { background: #E2E8F0; color: #475569; padding: 2px 6px; border-radius: 20px; font-size: 9px; }
                .status-tab.active .tab-count { background: #CBD5E1; }
                
                .loads-scroll-area { flex: 1; overflow-y: auto; padding: 16px 20px; display: flex; flex-direction: column; gap: 12px; }
                .load-item-card { background: white; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; cursor: pointer; transition: all 0.2s; }
                .load-item-card:hover { border-color: #3B82F6; box-shadow: 0 4px 12px rgba(59,130,246,0.04); }
                .load-item-card.active { border-color: #3B82F6; background: #F8FAFC; box-shadow: 0 4px 12px rgba(59,130,246,0.06); }
                .load-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
                .load-number { font-weight: 800; font-size: 14px; color: #1E293B; }
                .load-badge { font-size: 10px; font-weight: 800; text-transform: uppercase; padding: 2px 8px; border-radius: 20px; }
                .load-badge.in-transit { color: #2563EB; background: #DBEAFE; }
                .load-badge.delivered { color: #16A34A; background: #DCFCE7; }
                .load-badge.upcoming { color: #D97706; background: #FEF3C7; }
                
                .load-route-line-area { display: flex; gap: 12px; position: relative; margin-bottom: 14px; }
                .dot { width: 8px; height: 8px; border-radius: 50%; z-index: 2; margin-top: 4px; }
                .green-dot { background: #10B981; }
                .blue-dot { background: #3B82F6; }
                .connector { position: absolute; left: 3px; top: 12px; bottom: 8px; width: 2px; background: #E2E8F0; z-index: 1; }
                .load-route-texts { display: flex; flex-direction: column; gap: 14px; min-width: 0; }
                .route-p, .route-d { font-size: 12px; font-weight: 600; color: #475569; margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                .route-d { color: #1E293B; }

                .load-card-footer { border-top: 1px solid #F1F5F9; padding-top: 10px; display: flex; justify-content: space-between; align-items: center; }
                .driver-info { display: flex; align-items: center; gap: 8px; }
                .driver-avatar-mini { width: 24px; height: 24px; border-radius: 50%; background: #E2E8F0; font-size: 11px; display: flex; align-items: center; justify-content: center; }
                .driver-lbl { font-size: 9px; font-weight: 700; color: #94A3B8; text-transform: uppercase; margin: 0; }
                .driver-val { font-size: 11px; font-weight: 700; color: #475569; margin: 1px 0 0; }
                .load-price-val { font-weight: 800; font-size: 13px; color: #1E293B; }
                .loads-add-footer { padding: 16px 20px; border-top: 1px solid #E2E8F0; }
                .add-load-big-btn { width: 100%; border: none; background: #11111F; color: white; font-weight: 700; padding: 12px; border-radius: 8px; cursor: pointer; }
                .add-load-big-btn:hover { background: #1A1A2E; }
                .seed-btn-cargo { width: 100%; margin-top: 12px; background: #2563EB; border: none; color: white; padding: 8px; border-radius: 6px; font-weight: 700; font-size: 11px; cursor: pointer; }

                .load-detail-panel { width: 340px; background: white; border-right: 1px solid #E2E8F0; display: flex; flex-direction: column; flex-shrink: 0; }
                .detail-panel-inner { flex: 1; display: flex; flex-direction: column; overflow-y: auto; }
                .detail-panel-header { padding: 24px 20px 16px; border-bottom: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center; }
                .detail-panel-header h3 { font-size: 16px; font-weight: 800; color: #1E293B; margin: 0; }
                .detail-tabs-row { display: flex; border-bottom: 1px solid #E2E8F0; padding: 0 10px; }
                .detail-tab { border: none; background: none; flex: 1; padding: 12px; font-size: 12px; font-weight: 700; color: #64748B; cursor: pointer; border-bottom: 2px solid transparent; }
                .detail-tab.active { color: #1E293B; border-bottom-color: #1E293B; }
                .detail-scrollable { padding: 20px; display: flex; flex-direction: column; gap: 20px; }
                .customer-broker-card { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 14px; display: flex; align-items: center; gap: 10px; }
                .avatar-broker { width: 36px; height: 36px; border-radius: 50%; background: #E2E8F0; font-size: 18px; display: flex; align-items: center; justify-content: center; }
                .broker-title { font-size: 9px; font-weight: 700; color: #94A3B8; text-transform: uppercase; margin: 0; }
                .broker-name { font-size: 12px; font-weight: 800; color: #1E293B; margin: 2px 0 0; }
                .msg-btn, .call-btn { border: 1px solid #E2E8F0; background: white; border-radius: 8px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
                .msg-btn:hover, .call-btn:hover { background: #F1F5F9; }

                .tracking-timeline-widget h4 { font-size: 12px; font-weight: 800; color: #1E293B; text-transform: uppercase; margin: 0 0 14px 0; }
                .timeline-items-column { display: flex; flex-direction: column; }
                .timeline-row-item { display: flex; gap: 16px; margin-bottom: 20px; }
                .timeline-node-dot { display: flex; flex-direction: column; align-items: center; position: relative; }
                .node-inner { width: 18px; height: 18px; border-radius: 50%; border: 2px solid #E2E8F0; background: white; font-size: 9px; font-weight: 900; display: flex; align-items: center; justify-content: center; color: #94A3B8; z-index: 2; }
                .node-inner.completed { background: #10B981; border-color: #10B981; color: white; }
                .node-line { position: absolute; top: 18px; bottom: -24px; width: 2px; background: #E2E8F0; z-index: 1; }
                .timeline-node-content { min-width: 0; }
                .node-title { font-size: 12px; font-weight: 800; color: #1E293B; margin: 0; }
                .node-addr { font-size: 11px; color: #64748B; margin: 2px 0 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                .node-time { font-size: 10px; color: #94A3B8; margin: 2px 0 0; font-weight: 500; }

                .pricing-summary-card { border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 10px; }
                .summary-row { display: flex; justify-content: space-between; font-size: 12px; color: #64748B; font-weight: 600; }
                .summary-row strong { color: #1E293B; }
                .summary-row-total { display: flex; justify-content: space-between; border-top: 1px dashed #E2E8F0; padding-top: 10px; margin-top: 2px; font-size: 13px; font-weight: 800; color: #1E293B; }
                .summary-row-total strong { color: #2563EB; }
                .no-load-selected-splash { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px; color: #94A3B8; font-size: 13px; font-weight: 600; gap: 12px; }

                .logistics-map-panel { flex: 1; height: 100%; position: relative; background: #E5E9F0; }
                .map-controls { position: absolute; top: 20px; right: 20px; display: flex; flex-direction: column; gap: 10px; z-index: 10; }
                .map-view-toggle { display: flex; gap: 2px; background: white; padding: 3px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
                .view-btn { border: none; background: none; font-size: 11px; font-weight: 700; color: #64748B; padding: 6px 12px; border-radius: 6px; cursor: pointer; }
                .view-btn.active { background: #11111F; color: white; }
                .map-zoom-ctrl { display: flex; flex-direction: column; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.06); overflow: hidden; align-self: flex-end; }
                .zoom-btn { border: none; background: none; width: 32px; height: 32px; font-size: 16px; font-weight: 800; color: #475569; cursor: pointer; display: flex; align-items: center; justify-content: center; }
                .zoom-btn:hover { background: #F1F5F9; }
                
                .map-canvas-container { width: 100%; height: 100%; position: relative; background: radial-gradient(circle, #F1F5F9 20%, #E2E8F0 100%); }
                .highway-svg-canvas { width: 100%; height: 100%; }
                .active-route-line { stroke-dasharray: 8,4; animation: dash 20s linear infinite; }
                @keyframes dash { to { stroke-dashoffset: -100; } }
                .pulsing-truck-dot { animation: pulseGreen 2s infinite; transform-origin: center; }
                @keyframes pulseGreen { 0% { r: 9; opacity: 1; } 50% { r: 14; opacity: 0.7; } 100% { r: 9; opacity: 1; } }

                .map-hud-info { position: absolute; bottom: 20px; left: 20px; background: #11111F; color: white; padding: 14px 20px; border-radius: 12px; box-shadow: 0 10px 24px rgba(0,0,0,0.15); width: 240px; z-index: 10; border: 1px solid rgba(255,255,255,0.05); }
                .hud-label { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.5; margin: 0; }
                .hud-value { font-size: 12px; font-weight: 800; margin: 4px 0 8px 0; }
                .hud-row { display: flex; justify-content: space-between; font-size: 11px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 8px; }
            `}</style>
        </>
    );
}

// ============================================================================
// 3. DEFAULT GENERAL RETAIL DASHBOARD (SUPERMARKET, OTHERS)
// ============================================================================
function RetailDashboard({ company }: { company: any }) {
    const invoices = useCompanyData('invoices') as Invoice[];
    const parties = useCompanyData('parties') as Party[];
    const products = useCompanyData('products') as Product[];

    const DRAFT_TYPES = ['estimate', 'proforma', 'delivery_challan'];
    const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
    const todayInv = invoices.filter(inv => inv.date === today && inv.invoiceType === 'sale' && !DRAFT_TYPES.includes(inv.invoiceType) && (inv.isGstBill || inv.grandTotal > 0));
    const recentInvoices = invoices.filter(i => i.isGstBill).length > 0
        ? invoices.filter(i => i.isGstBill).slice(0, 6)
        : invoices.slice(0, 6);

    const trendData = useMemo(() => {
        const data = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().slice(0, 10);
            const dayTotal = invoices
                .filter(inv => inv.date === dateStr && inv.invoiceType === 'sale' && !DRAFT_TYPES.includes(inv.invoiceType))
                .reduce((sum, inv) => sum + (inv.grandTotal || 0), 0);
            data.push({
                name: date.toLocaleDateString('en-IN', { weekday: 'short' }),
                sales: dayTotal
            });
        }
        return data;
    }, [invoices]);

    const greeting = useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    }, []);

    const totalReceivable = useMemo(() => parties.filter(p => p.balance > 0).reduce((a: number, p: Party) => a + p.balance, 0), [parties]);
    const totalPayable = useMemo(() => parties.filter(p => p.balance < 0).reduce((a: number, p: Party) => a + Math.abs(p.balance), 0), [parties]);
    const lowStock = useMemo(() => products.filter((p: Product) => p.stockQty <= (p.lowStockAlertQty || 5)), [products]);
    const stockValue = useMemo(() => products.reduce((a: number, p: Product) => a + p.stockQty * p.purchasePrice, 0), [products]);

    const insights = useMemo(() => {
        const calculated: { emoji: string; text: string; color: string }[] = [];
        const saleInvs = invoices.filter((i: any) => i.invoiceType === 'sale' && !DRAFT_TYPES.includes(i.invoiceType));
        const itemMap: Record<string, { qty: number; name: string }> = {};
        saleInvs.forEach((inv: any) => (inv.items || []).forEach((it: any) => { if (!itemMap[it.name]) itemMap[it.name] = { qty: 0, name: it.name }; itemMap[it.name].qty += it.qty; }));
        const topItem = Object.values(itemMap).sort((a, b) => b.qty - a.qty)[0];
        if (topItem) calculated.push({ emoji: '📈', text: `<b>${topItem.name}</b> is your top-selling product (${topItem.qty} units sold).`, color: '#34A853' });
        const oos = products.filter((p: any) => p.stockQty <= 0);
        if (oos.length) calculated.push({ emoji: '🚨', text: `<b>${oos.length} item${oos.length > 1 ? 's' : ''}</b> are out of stock — reorder now to avoid lost sales.`, color: '#EA4335' });
        if (totalReceivable > 0) calculated.push({ emoji: '💰', text: `You have <b>₹${totalReceivable.toLocaleString('en-IN')}</b> in outstanding receivables from customers.`, color: '#FBBC04' });
        const lowStockCount = products.filter((p: any) => p.stockQty > 0 && p.stockQty <= (p.lowStockAlertQty || 5)).length;
        if (lowStockCount > 0) calculated.push({ emoji: '⚠️', text: `<b>${lowStockCount} product${lowStockCount > 1 ? 's are' : ' is'}</b> running low on stock. Consider reordering soon.`, color: '#F59E0B' });
        if (!calculated.length) calculated.push({ emoji: '✅', text: 'All systems look good! Stock is healthy and no outstanding payments.', color: '#34A853' });
        return calculated;
    }, [invoices, products, totalReceivable]);

    const quickLinks = [
        { label: 'Sale Invoice', href: `/company/billing/new?type=sale`, color: '#EA4335', icon: FileText },
        { label: 'Purchase', href: `/company/billing/new?type=purchase`, color: '#4285F4', icon: ShoppingCart },
        { label: 'Add Item', href: `/company/inventory/add`, color: '#FBBC04', icon: Package },
        { label: 'Add Party', href: `/company/parties/add`, color: '#34A853', icon: Users },
        { label: 'Add Expense', href: `/company/expenses/add`, color: '#EA4335', icon: DollarSign },
        { label: 'Quick Bill', href: `/company/billing/quick`, color: '#4285F4', icon: Zap },
        { label: 'Reports', href: `/company/reports`, color: '#34A853', icon: BarChart3 },
        { label: 'Estimate', href: `/company/billing/new?type=estimate`, color: '#9333EA', icon: FileText },
    ];

    function KPICard({ label, value, icon: Icon, color, trend, sub }: any) {
        return (
            <div className="card" style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={18} color={color} />
                    </div>
                </div>
                <p style={{ fontSize: 24, fontWeight: 900, color: '#1A1A2E', marginBottom: 4 }}>{value}</p>
                {sub && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: trend === 'up' ? '#34A853' : '#EA4335', fontWeight: 600 }}>
                        {trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                        {sub}
                    </div>
                )}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: color, opacity: 0.6 }} />
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1200, padding: 32 }}>
            {/* Welcome & System Health */}
            <div style={{
                background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
                borderRadius: 20, padding: '28px 28px 24px', position: 'relative', overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg,#4285F4 25%,#34A853 25% 50%,#FBBC04 50% 75%,#EA4335 75%)' }} />
                <div style={{ position: 'absolute', right: -20, top: -20, width: 140, height: 140, borderRadius: 999, background: `${company.colorAccent}20` }} />

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, position: 'relative', zIndex: 1, gap: 16 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>
                            {greeting} 👋 {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </p>
                        <h2 style={{ color: 'white', fontWeight: 900, fontSize: 24, marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{company.name}</h2>
                        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#34A853', flexShrink: 0 }}></span>
                            {company.type} · {company.city} · Secure Multi-Device Sync Active
                        </p>
                    </div>
                    <Link href={`/company/billing/new?type=sale`} style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        background: company.colorAccent, color: 'white',
                        padding: '10px 18px', borderRadius: 12, textDecoration: 'none',
                        fontWeight: 700, fontSize: 13, boxShadow: `0 4px 16px ${company.colorAccent}50`, flexShrink: 0
                    }}>
                        <Plus size={16} /> New Invoice
                    </Link>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 14 }} className="stats-grid">
                    {[
                        { label: "Today's Sales", value: formatShort(todayInv.reduce((a, i) => a + i.grandTotal, 0)), sub: `${todayInv.length} bills` },
                        { label: 'Collected', value: formatShort(todayInv.reduce((a, i) => a + i.amountPaid, 0)), sub: 'cash + UPI' },
                        { label: 'Pending', value: formatShort(todayInv.reduce((a, i) => a + i.balanceDue, 0)), sub: 'to collect' },
                    ].map(({ label, value, sub }) => (
                        <div key={label} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '14px 12px', textAlign: 'center' }}>
                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>{label}</p>
                            <p style={{ color: 'white', fontWeight: 900, fontSize: 20 }}>{value}</p>
                            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, marginTop: 3 }}>{sub}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sales Chart Section */}
            <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 20, padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <TrendingUp size={18} color="#4285F4" />
                        </div>
                        <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1A1A2E', margin: 0 }}>Sales Performance</h3>
                    </div>
                    <p style={{ fontSize: 11, color: '#A0AEC0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Weekly View</p>
                </div>

                <div style={{ height: 220, width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                        <AreaChart data={trendData}>
                            <defs>
                                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4285F4" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#4285F4" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fontWeight: 600, fill: '#A0AEC0' }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fontWeight: 600, fill: '#A0AEC0' }}
                                tickFormatter={(val) => formatShort(val)}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', fontWeight: 700, fontSize: 12 }}
                                formatter={(val: any) => [`₹${(val || 0).toLocaleString()}`, 'Sales']}
                            />
                            <Area
                                type="monotone"
                                dataKey="sales"
                                stroke="#4285F4"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorSales)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {lowStock.length > 0 && (
                <Link href={`/company/inventory?filter=low`} style={{
                    display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none',
                    background: '#FEF7E0', border: '1px solid #FBBC04', borderRadius: 14, padding: '14px 18px',
                }}>
                    <AlertTriangle size={18} color="#B06000" />
                    <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 13, fontWeight: 700, color: '#92400E' }}>Low Stock Alert — {lowStock.length} item{lowStock.length !== 1 ? 's' : ''}</p>
                        <p style={{ fontSize: 11, color: '#B45309' }}>{lowStock.slice(0, 3).map((p: any) => p.name).join(', ')}{lowStock.length > 3 ? ` +${lowStock.length - 3} more` : ''}</p>
                    </div>
                    <ChevronRight size={16} color="#B06000" />
                </Link>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }} className="kpi-grid">
                <KPICard label="To Receive" value={formatShort(totalReceivable)} icon={TrendingUp} color="#34A853" trend="up" sub="from customers" />
                <KPICard label="To Pay" value={formatShort(totalPayable)} icon={TrendingDown} color="#EA4335" trend="down" sub="to suppliers" />
                <KPICard label="Stock Value" value={formatShort(stockValue)} icon={Package} color="#FBBC04" />
                <KPICard label="Total Parties" value={String(parties.length)} icon={Users} color="#4285F4" />
            </div>

            {insights.length > 0 && (
                <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F3F5', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg,#4285F4,#9333EA)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Lightbulb size={16} color="white" />
                        </div>
                        <div>
                            <p style={{ fontWeight: 800, fontSize: 14, color: '#1A1A2E', margin: 0 }}>Smart Business Insights</p>
                            <p style={{ fontSize: 10, color: '#A0AEC0', margin: 0, fontWeight: 600 }}>Powered by your store data</p>
                        </div>
                        <Link href="/company/analytics" style={{ marginLeft: 'auto', fontSize: 11, color: '#4285F4', fontWeight: 700, textDecoration: 'none' }}>Full Analytics →</Link>
                    </div>
                    <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {insights.slice(0, 3).map((ins, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px', borderRadius: 12, background: ins.color + '10', border: `1px solid ${ins.color}25` }}>
                                <span style={{ fontSize: 16, flexShrink: 0 }}>{ins.emoji}</span>
                                <p style={{ fontSize: 12, color: '#374151', fontWeight: 600, margin: 0, lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: ins.text }} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Quick Actions */}
            <div className="card" style={{ padding: '20px 24px' }}>
                <p style={{ fontSize: 12, fontWeight: 800, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>Quick Actions</p>
                <div className="quick-grid-wrapper">
                    <div className="quick-grid">
                        {quickLinks.map(({ label, href, color, icon: Icon }) => (
                            <Link key={href} href={href} style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                                textDecoration: 'none', padding: '14px 8px', borderRadius: 14,
                                border: '1.5px solid #F1F3F5', background: '#FAFAFA',
                                minWidth: 76, flex: '0 0 auto',
                            }} className="quick-action-item">
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 12px ${color}35` }}>
                                    <Icon size={20} color="white" />
                                </div>
                                <span style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', textAlign: 'center', lineHeight: 1.3 }}>{label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Bills */}
            <div className="card" style={{ overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #F1F3F5' }}>
                    <p style={{ fontWeight: 800, fontSize: 15, color: '#1A1A2E', margin: 0 }}>Recent Bills</p>
                    <Link href={`/company/billing`} style={{ fontSize: 12, color: '#4285F4', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 3 }}>
                        All bills <ChevronRight size={13} />
                    </Link>
                </div>
                {recentInvoices.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                        <FileText size={40} style={{ color: '#E1E4E8', margin: '0 auto 12px' }} />
                        <p style={{ color: '#A0AEC0', fontSize: 14 }}>No invoices yet</p>
                        <Link href={`/company/billing/new?type=sale`} className="btn btn-blue btn-sm" style={{ marginTop: 12, display: 'inline-flex', textDecoration: 'none' }}>
                            Create First Invoice
                        </Link>
                    </div>
                ) : (
                    <div>
                        {recentInvoices.map((inv: Invoice) => (
                            <Link key={inv.id} href={`/company/billing/invoice?id=${inv.id}`} style={{
                                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px',
                                borderBottom: '1px solid #F8F9FA', textDecoration: 'none', transition: 'background 0.12s',
                            }} className="hover-bg">
                                <div style={{
                                    width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                                    background: inv.invoiceType === 'sale' ? '#FCE8E6' : '#E8F0FE',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <FileText size={18} color={inv.invoiceType === 'sale' ? '#EA4335' : '#4285F4'} />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A2E', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {inv.partyName || 'Walk-in Customer'}
                                    </p>
                                    <p style={{ fontSize: 11, color: '#A0AEC0' }}>{inv.invoiceNumber} · {formatDate(inv.date)}</p>
                                </div>
                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                    <p style={{ fontSize: 14, fontWeight: 900, color: '#1A1A2E' }}>₹{inv.grandTotal.toLocaleString('en-IN')}</p>
                                    <span className={`badge ${inv.paymentStatus === 'paid' ? 'badge-green' : inv.paymentStatus === 'partial' ? 'badge-yellow' : 'badge-red'}`}>
                                        {inv.paymentStatus}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
            
            <style>{`
                .quick-grid-wrapper { overflow-x: auto; -webkit-overflow-scrolling: touch; }
                .quick-grid-wrapper::-webkit-scrollbar { display: none; }
                .quick-grid { display: flex; flex-direction: row; gap: 10px; padding-bottom: 4px; }
                @media (min-width: 640px) {
                    .quick-grid-wrapper { overflow-x: visible; }
                    .quick-grid { display: grid !important; grid-template-columns: repeat(4, 1fr); gap: 12px; }
                    .quick-action-item { min-width: unset !important; flex: unset !important; }
                }
                @media (min-width: 768px) {
                    .kpi-grid { grid-template-columns: repeat(4, 1fr) !important; }
                    .quick-grid { grid-template-columns: repeat(8, 1fr) !important; }
                }
                .quick-action-item:hover { border-color: #CBD5E0 !important; box-shadow: 0 4px 12px rgba(0,0,0,0.06) !important; }
                .hover-bg:hover { background: #F8F9FA; }
            `}</style>
        </div>
    );
}

// ============================================================================
// 4. FRANCHISE CONSOLIDATED DASHBOARD (HEAD OFFICE MAIN VIEW)
// ============================================================================
function FranchiseConsolidatedDashboard({ company }: { company: any }) {
    const invoices = useCompanyData('invoices') as Invoice[];
    const expenses = useCompanyData('expenses') as Expense[];
    const products = useCompanyData('products') as Product[];
    const stockTransfers = useStore(state => state.stockTransfers) || [];

    const DRAFT_TYPES = ['estimate', 'proforma', 'delivery_challan'];
    const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
    
    const todayInv = useMemo(() => {
        return invoices.filter(inv => inv.date === today && inv.invoiceType === 'sale' && !DRAFT_TYPES.includes(inv.invoiceType));
    }, [invoices, today]);

    const todayConsolidatedSales = useMemo(() => {
        return todayInv.reduce((sum, inv) => sum + (inv.grandTotal || 0), 0);
    }, [todayInv]);

    const totalConsolidatedStockValue = useMemo(() => {
        return products.reduce((acc, p) => {
            const hoStock = p.branchStock?.head_office ?? p.stockQty ?? 0;
            let otherStockSum = 0;
            if (p.branchStock) {
                otherStockSum = Object.entries(p.branchStock)
                    .filter(([key]) => key !== 'head_office')
                    .reduce((sum, [_, q]) => sum + (parseFloat(q as any) || 0), 0);
            }
            const totalProductStock = hoStock + otherStockSum;
            return acc + (totalProductStock * (p.purchasePrice || 0));
        }, 0);
    }, [products]);

    const pendingTransfersCount = useMemo(() => {
        return stockTransfers.filter(t => t.status === 'pending').length;
    }, [stockTransfers]);

    const outletStatsData = useMemo(() => {
        const hoSales = invoices.filter(i => (!i.branchId || i.branchId === 'head_office') && i.invoiceType === 'sale' && !DRAFT_TYPES.includes(i.invoiceType)).reduce((sum, i) => sum + (i.grandTotal || 0), 0);
        const hoPurchases = invoices.filter(i => (!i.branchId || i.branchId === 'head_office') && i.invoiceType === 'purchase').reduce((sum, i) => sum + (i.grandTotal || 0), 0);
        const hoExpenses = expenses.filter(e => !e.branchId || e.branchId === 'head_office').reduce((sum, e) => sum + (e.amount || 0), 0);
        const hoProfit = hoSales - hoPurchases - hoExpenses;
        const hoStockValue = products.reduce((acc, p) => {
            const qty = p.branchStock?.head_office ?? p.stockQty ?? 0;
            return acc + (qty * (p.purchasePrice || 0));
        }, 0);

        const hoTodaySales = invoices.filter(i => (!i.branchId || i.branchId === 'head_office') && i.date === today && i.invoiceType === 'sale' && !DRAFT_TYPES.includes(i.invoiceType)).reduce((sum, i) => sum + (i.grandTotal || 0), 0);

        const data = [
            {
                name: 'Head Office',
                sales: hoSales,
                profit: hoProfit,
                stockValue: hoStockValue,
                todaySales: hoTodaySales,
                manager: company.managerName || 'Owner',
                color: '#4F46E5',
                target: company.dailyTarget || 50000
            }
        ];

        const colors = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6'];

        (company.branches || []).forEach((b: any, index: number) => {
            const bSales = invoices.filter(i => i.branchId === b.id && i.invoiceType === 'sale' && !DRAFT_TYPES.includes(i.invoiceType)).reduce((sum, i) => sum + (i.grandTotal || 0), 0);
            const bPurchases = invoices.filter(i => i.branchId === b.id && i.invoiceType === 'purchase').reduce((sum, i) => sum + (i.grandTotal || 0), 0);
            const bExpenses = expenses.filter(e => e.branchId === b.id).reduce((sum, e) => sum + (e.amount || 0), 0);
            const bProfit = bSales - bPurchases - bExpenses;
            const bStockValue = products.reduce((acc, p) => {
                const qty = p.branchStock?.[b.id] ?? 0;
                return acc + (qty * (p.purchasePrice || 0));
            }, 0);

            const bTodaySales = invoices.filter(i => i.branchId === b.id && i.date === today && i.invoiceType === 'sale' && !DRAFT_TYPES.includes(i.invoiceType)).reduce((sum, i) => sum + (i.grandTotal || 0), 0);

            data.push({
                name: b.name,
                sales: bSales,
                profit: bProfit,
                stockValue: bStockValue,
                todaySales: bTodaySales,
                manager: b.managerName || 'Staff',
                color: colors[index % colors.length],
                target: b.dailyTarget || company.dailyTarget || 25000
            });
        });

        return data;
    }, [company.branches, invoices, expenses, products, company.managerName, today, company.dailyTarget]);

    const bestSellersData = useMemo(() => {
        const saleInvs = invoices.filter(i => i.invoiceType === 'sale' && !DRAFT_TYPES.includes(i.invoiceType));
        const itemMap: Record<string, { name: string; qty: number; value: number }> = {};
        saleInvs.forEach((inv) => {
            (inv.items || []).forEach((it) => {
                if (!itemMap[it.name]) {
                    itemMap[it.name] = { name: it.name, qty: 0, value: 0 };
                }
                itemMap[it.name].qty += it.qty;
                itemMap[it.name].value += it.amount;
            });
        });
        return Object.values(itemMap)
            .sort((a, b) => b.qty - a.qty)
            .slice(0, 5);
    }, [invoices]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1200, padding: 32 }} className="franchise-dash">
            {/* Header Banner */}
            <div style={{
                background: 'linear-gradient(135deg, #4F46E5 0%, #312E81 100%)',
                borderRadius: 24, padding: '32px 32px 28px', position: 'relative', overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(79, 70, 229, 0.15)', border: '1px solid rgba(255,255,255,0.1)'
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #10B981, #3B82F6, #F59E0B, #EF4444)' }} />
                <div style={{ position: 'absolute', right: -30, bottom: -30, width: 200, height: 200, borderRadius: 999, background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, position: 'relative', zIndex: 1, gap: 16 }}>
                    <div>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </p>
                        <h1 style={{ color: 'white', fontWeight: 900, fontSize: 28, margin: 0, letterSpacing: '-0.02em' }}>Consolidated Dashboard</h1>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }}></span>
                            Head Office Portal · {company.name} · {company.branches?.length || 0} Outlets Online
                        </p>
                    </div>
                    <Link href="/company/settings?tab=franchise" style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        background: 'white', color: '#4F46E5',
                        padding: '10px 20px', borderRadius: 12, textDecoration: 'none',
                        fontWeight: 700, fontSize: 13, boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        transition: 'transform 0.2s, box-shadow 0.2s'
                    }} className="hover-scale">
                        <Settings size={14} /> Manage Outlets
                    </Link>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 16 }}>
                    {[
                        { label: 'Total Branches', value: String(company.branches?.length || 0), desc: 'Connected nodes' },
                        { label: "Today's Consolidated Sales", value: `₹${todayConsolidatedSales.toLocaleString('en-IN')}`, desc: `${todayInv.length} total bills today` },
                        { label: 'Consolidated Stock Value', value: `₹${totalConsolidatedStockValue.toLocaleString('en-IN')}`, desc: 'Across all warehouses' },
                    ].map(({ label, value, desc }) => (
                        <div key={label} style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', borderRadius: 16, padding: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
                            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{label}</p>
                            <p style={{ color: 'white', fontWeight: 900, fontSize: 22, margin: 0 }}>{value}</p>
                            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, marginTop: 4, margin: 0 }}>{desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* KPI Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
                <div className="kpi-card" style={{ borderLeft: '4px solid #4F46E5' }}>
                    <div className="kpi-card-header">
                        <span>ACTIVE OUTLETS</span>
                        <Warehouse size={18} color="#4F46E5" />
                    </div>
                    <div className="kpi-card-body">
                        <h2 className="kpi-val">{company.branches?.length || 0} Outlets</h2>
                        <p style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>Active franchise licenses</p>
                    </div>
                </div>

                <div className="kpi-card" style={{ borderLeft: '4px solid #10B981' }}>
                    <div className="kpi-card-header">
                        <span>TODAY'S SALES</span>
                        <DollarSign size={18} color="#10B981" />
                    </div>
                    <div className="kpi-card-body">
                        <h2 className="kpi-val">₹{todayConsolidatedSales.toLocaleString('en-IN')}</h2>
                        <p style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>Combined network revenue</p>
                    </div>
                </div>

                <div className="kpi-card" style={{ borderLeft: '4px solid #F59E0B' }}>
                    <div className="kpi-card-header">
                        <span>CONSOLIDATED INVENTORY</span>
                        <Package size={18} color="#F59E0B" />
                    </div>
                    <div className="kpi-card-body">
                        <h2 className="kpi-val">₹{totalConsolidatedStockValue.toLocaleString('en-IN')}</h2>
                        <p style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>Total asset valuation</p>
                    </div>
                </div>

                <Link href="/company/inventory?tab=transfers" style={{ textDecoration: 'none', color: 'inherit' }} className="kpi-card-link">
                    <div className="kpi-card" style={{ borderLeft: `4px solid ${pendingTransfersCount > 0 ? '#EF4444' : '#6366F1'}`, cursor: 'pointer', height: '100%' }}>
                        <div className="kpi-card-header">
                            <span>PENDING TRANSFERS</span>
                            <RefreshCw size={18} color={pendingTransfersCount > 0 ? '#EF4444' : '#6366F1'} className={pendingTransfersCount > 0 ? 'spin-slow' : ''} />
                        </div>
                        <div className="kpi-card-body">
                            <h2 className="kpi-val" style={{ color: pendingTransfersCount > 0 ? '#EF4444' : 'inherit' }}>{pendingTransfersCount} Requests</h2>
                            <p style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>
                                {pendingTransfersCount > 0 ? '⚠️ Action required to approve' : 'All stock transfers resolved'}
                            </p>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Charts Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: 24 }} className="charts-grid">
                {/* Sales & Profit Chart */}
                <div className="card" style={{ padding: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1A1A2E', margin: 0 }}>Sales & Net Profit by Outlet</h3>
                        <span style={{ fontSize: 10, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>All-Time Performance</span>
                    </div>
                    <div style={{ height: 260, width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={outletStatsData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#64748B' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#64748B' }} tickFormatter={formatShort} />
                                <Tooltip formatter={(val: any) => [`₹${(val || 0).toLocaleString()}`]} contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', fontWeight: 700 }} />
                                <Legend wrapperStyle={{ fontSize: 11, fontWeight: 600 }} />
                                <Bar dataKey="sales" name="Sales Revenue" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="profit" name="Net Profit" fill="#10B981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Stock Value Distribution */}
                <div className="card" style={{ padding: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1A1A2E', margin: 0 }}>Inventory Valuation by Outlet</h3>
                        <span style={{ fontSize: 10, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>Warehouse Value</span>
                    </div>
                    <div style={{ height: 260, width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={outletStatsData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#64748B' }} tickFormatter={formatShort} />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#64748B' }} />
                                <Tooltip formatter={(val: any) => [`₹${(val || 0).toLocaleString()}`]} contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', fontWeight: 700 }} />
                                <Bar dataKey="stockValue" name="Stock Value" radius={[0, 4, 4, 0]}>
                                    {outletStatsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Bottom Row: Outlet Targets & Top Products */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: 24 }}>
                {/* Outlets Performance Tracker */}
                <div className="card" style={{ padding: 24 }}>
                    <div style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: 16, marginBottom: 16 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1A1A2E', margin: 0 }}>Outlet Daily Target Tracker</h3>
                        <p style={{ fontSize: 11, color: '#94A3B8', margin: '4px 0 0', fontWeight: 600 }}>Tracking today's sales progress against set daily targets</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {outletStatsData.map((outlet) => {
                            const percent = Math.min(100, Math.round((outlet.todaySales / outlet.target) * 100));
                            return (
                                <div key={outlet.name} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div style={{ width: 10, height: 10, borderRadius: '50%', background: outlet.color }} />
                                            <span style={{ fontSize: 13, fontWeight: 800, color: '#1E293B' }}>{outlet.name}</span>
                                            <span style={{ fontSize: 10, color: '#64748B', fontWeight: 600 }}>({outlet.manager})</span>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <span style={{ fontSize: 12, fontWeight: 900, color: '#1E293B' }}>₹{outlet.todaySales.toLocaleString('en-IN')}</span>
                                            <span style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}> / ₹{outlet.target.toLocaleString('en-IN')}</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <div style={{ flex: 1, height: 8, background: '#E2E8F0', borderRadius: 99, overflow: 'hidden' }}>
                                            <div style={{ width: `${percent}%`, height: '100%', background: outlet.color, borderRadius: 99, transition: 'width 0.4s ease' }} />
                                        </div>
                                        <span style={{ fontSize: 11, fontWeight: 800, color: '#475569', minWidth: 32, textAlign: 'right' }}>{percent}%</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Best Selling Products */}
                <div className="card" style={{ padding: 24 }}>
                    <div style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: 16, marginBottom: 16 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1A1A2E', margin: 0 }}>Top Selling Products across Franchise</h3>
                        <p style={{ fontSize: 11, color: '#94A3B8', margin: '4px 0 0', fontWeight: 600 }}>Highest unit volume products sold throughout the network</p>
                    </div>
                    {bestSellersData.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94A3B8' }}>
                            <Package size={32} style={{ margin: '0 auto 8px' }} />
                            <p style={{ fontSize: 12, fontWeight: 600 }}>No sales data available yet</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {bestSellersData.map((item, index) => (
                                <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: '#FAFAFA', borderRadius: 12, border: '1px solid #F1F5F9' }}>
                                    <div style={{ width: 28, height: 28, borderRadius: 8, background: '#EFF6FF', color: '#1E40AF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 12 }}>
                                        #{index + 1}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <h4 style={{ fontSize: 13, fontWeight: 800, color: '#1E293B', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</h4>
                                        <span style={{ fontSize: 10, color: '#64748B', fontWeight: 600 }}>{item.qty} units sold</span>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ fontSize: 13, fontWeight: 900, color: '#10B981', display: 'block' }}>₹{item.value.toLocaleString('en-IN')}</span>
                                        <span style={{ fontSize: 9, color: '#94A3B8', fontWeight: 700 }}>REVENUE</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .franchise-dash .kpi-card { background: white; border: 1px solid #E2E8F0; padding: 20px; border-radius: 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.02); display: flex; flex-direction: column; gap: 12px; }
                .franchise-dash .kpi-card-header { display: flex; justify-content: space-between; align-items: center; }
                .franchise-dash .kpi-card-header span { font-size: 10px; font-weight: 800; color: #64748B; letter-spacing: 0.05em; }
                .franchise-dash .kpi-val { font-size: 22px; font-weight: 900; color: #1E293B; margin: 0; }
                .franchise-dash .kpi-card-link { transition: transform 0.15s; }
                .franchise-dash .kpi-card-link:hover { transform: translateY(-2px); }
                @keyframes spinSlow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .spin-slow { animation: spinSlow 8s linear infinite; }
                .hover-scale:hover { transform: scale(1.02); box-shadow: 0 6px 16px rgba(0,0,0,0.12) !important; }
                @media (max-width: 768px) {
                    .charts-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
}

// ============================================================================
// 5. MAIN ENTRY POINT SWITCH ROUTER
// ============================================================================
export default function DashboardPage() {
    const { isHydrating, activeBranchId, isSubBranchLogin } = useStore();
    const company = useActiveCompany();

    if (isHydrating) return <SkeletonDashboard />;
    if (!company) return null;

    // Head office franchise consolidated dashboard
    if (company.franchiseEnabled && !isSubBranchLogin && !activeBranchId) {
        return <FranchiseConsolidatedDashboard company={company} />;
    }

    if (company.type === 'Restaurant' || company.type === 'Bakery') {
        return <RestaurantBakeryDashboard company={company} />;
    } else if (company.type === 'Logistics') {
        return <LogisticsDashboard company={company} />;
    } else {
        return <RetailDashboard company={company} />;
    }
}

