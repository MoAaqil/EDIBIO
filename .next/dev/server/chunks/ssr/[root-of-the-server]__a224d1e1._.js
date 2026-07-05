module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/lib/store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useActiveCompany",
    ()=>useActiveCompany,
    "useCompanyData",
    ()=>useCompanyData,
    "useStore",
    ()=>useStore,
    "useUserCompanies",
    ()=>useUserCompanies
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$idb$2d$keyval$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/idb-keyval/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
const idbStorage = {
    getItem: async (name)=>{
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$idb$2d$keyval$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["get"])(name) || null;
    },
    setItem: async (name, value)=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$idb$2d$keyval$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["set"])(name, value);
    },
    removeItem: async (name)=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$idb$2d$keyval$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["del"])(name);
    }
};
const syncAfter = (getState)=>{
// No-op: CloudSync component handles this via store subscription
};
const uid = ()=>Math.random().toString(36).slice(2) + Date.now().toString(36);
// ── Default templates ─────────────────────────────────────────────────────────
const DEFAULT_TEMPLATES = [
    {
        id: 'classic',
        name: 'Classic',
        layout: 'classic',
        paperSize: 'A4',
        headerBg: '#1A1A2E',
        headerText: '#FFFFFF',
        accentColor: '#4285F4',
        tableHeaderBg: '#F8F9FA',
        tableHeaderText: '#2D3748',
        bodyBg: '#FFFFFF',
        bodyText: '#1A1A2E',
        fontFamily: 'Inter',
        fontSize: 12,
        showLogo: true,
        showGstNumber: true,
        showHsn: true,
        showTaxBreakdown: true,
        showSignature: true,
        showTerms: true,
        showAmountInWords: true,
        showQrCode: false,
        showBalanceDue: true,
        showPaymentHistory: true,
        logoAlign: 'left',
        amountAlign: 'right'
    },
    {
        id: 'modern',
        name: 'Modern',
        layout: 'modern',
        paperSize: 'A4',
        headerBg: '#4285F4',
        headerText: '#FFFFFF',
        accentColor: '#34A853',
        tableHeaderBg: '#E8F0FE',
        tableHeaderText: '#1967D2',
        bodyBg: '#FAFAFA',
        bodyText: '#1A1A2E',
        fontFamily: 'Inter',
        fontSize: 12,
        showLogo: true,
        showGstNumber: true,
        showHsn: true,
        showTaxBreakdown: true,
        showSignature: false,
        showTerms: true,
        showAmountInWords: true,
        showQrCode: true,
        showBalanceDue: true,
        showPaymentHistory: false,
        logoAlign: 'center',
        amountAlign: 'right'
    },
    {
        id: 'minimal',
        name: 'Minimal',
        layout: 'minimal',
        paperSize: 'A4',
        headerBg: '#FFFFFF',
        headerText: '#1A1A2E',
        accentColor: '#1A1A2E',
        tableHeaderBg: '#FFFFFF',
        tableHeaderText: '#4A5568',
        bodyBg: '#FFFFFF',
        bodyText: '#1A1A2E',
        fontFamily: 'Inter',
        fontSize: 11,
        showLogo: true,
        showGstNumber: true,
        showHsn: false,
        showTaxBreakdown: false,
        showSignature: false,
        showTerms: false,
        showAmountInWords: false,
        showQrCode: false,
        showBalanceDue: true,
        showPaymentHistory: false,
        logoAlign: 'right',
        amountAlign: 'right'
    },
    {
        id: 'thermal',
        name: 'Thermal Receipt',
        layout: 'minimal',
        paperSize: 'thermal_80',
        headerBg: '#FFFFFF',
        headerText: '#000000',
        accentColor: '#000000',
        tableHeaderBg: '#FFFFFF',
        tableHeaderText: '#000000',
        bodyBg: '#FFFFFF',
        bodyText: '#000000',
        fontFamily: 'monospace',
        fontSize: 10,
        showLogo: true,
        showGstNumber: true,
        showHsn: false,
        showTaxBreakdown: true,
        showSignature: false,
        showTerms: false,
        showAmountInWords: true,
        showQrCode: false,
        showBalanceDue: true,
        showPaymentHistory: false,
        logoAlign: 'center',
        amountAlign: 'right',
        footerText: 'Thank you! Visit Again.'
    },
    {
        id: 'elegant',
        name: 'Elegant Dark',
        layout: 'classic',
        paperSize: 'A4',
        headerBg: '#111827',
        headerText: '#F3F4F6',
        accentColor: '#111827',
        tableHeaderBg: '#1F2937',
        tableHeaderText: '#FFFFFF',
        bodyBg: '#FFFFFF',
        bodyText: '#1F2937',
        fontFamily: 'Outfit',
        fontSize: 12,
        showLogo: true,
        showGstNumber: true,
        showHsn: true,
        showTaxBreakdown: true,
        showSignature: true,
        showTerms: true,
        showAmountInWords: true,
        showQrCode: true,
        showBalanceDue: true,
        showPaymentHistory: true,
        logoAlign: 'left',
        amountAlign: 'right'
    },
    {
        id: 'vibrant',
        name: 'Vibrant Blue',
        layout: 'modern',
        paperSize: 'A4',
        headerBg: '#EFF6FF',
        headerText: '#1E40AF',
        accentColor: '#3B82F6',
        tableHeaderBg: '#DBEAFE',
        tableHeaderText: '#1E40AF',
        bodyBg: '#FFFFFF',
        bodyText: '#1E3A8A',
        fontFamily: 'Inter',
        fontSize: 12,
        showLogo: true,
        showGstNumber: true,
        showHsn: true,
        showTaxBreakdown: true,
        showSignature: false,
        showTerms: true,
        showAmountInWords: true,
        showQrCode: true,
        showBalanceDue: true,
        showPaymentHistory: false,
        logoAlign: 'center',
        amountAlign: 'right'
    },
    {
        id: 'retro',
        name: 'Retro Typewriter',
        layout: 'minimal',
        paperSize: 'A4',
        headerBg: '#FFFFFF',
        headerText: '#000000',
        accentColor: '#000000',
        tableHeaderBg: '#FFFFFF',
        tableHeaderText: '#000000',
        bodyBg: '#FDFCF0',
        bodyText: '#000000',
        fontFamily: 'Courier Prime',
        fontSize: 11,
        showLogo: false,
        showGstNumber: true,
        showHsn: false,
        showTaxBreakdown: false,
        showSignature: true,
        showTerms: true,
        showAmountInWords: false,
        showQrCode: false,
        showBalanceDue: true,
        showPaymentHistory: false,
        logoAlign: 'left',
        amountAlign: 'right'
    },
    {
        id: 'quick_bill',
        name: 'Quick Bill (Compact)',
        layout: 'classic',
        paperSize: 'A4',
        headerBg: '#FFFFFF',
        headerText: '#000000',
        accentColor: '#000000',
        tableHeaderBg: '#F8F9FA',
        tableHeaderText: '#000000',
        bodyBg: '#FFFFFF',
        bodyText: '#000000',
        fontFamily: 'Arial',
        fontSize: 11,
        showLogo: false,
        showGstNumber: true,
        showHsn: true,
        showTaxBreakdown: false,
        showSignature: true,
        showTerms: true,
        showAmountInWords: true,
        showQrCode: false,
        showBalanceDue: true,
        showPaymentHistory: false,
        logoAlign: 'center',
        amountAlign: 'right'
    },
    {
        id: 'bold_orange',
        name: 'Bold Retail',
        layout: 'modern',
        paperSize: 'A4',
        headerBg: '#DD6B20',
        headerText: '#FFFFFF',
        accentColor: '#DD6B20',
        tableHeaderBg: '#FBD38D',
        tableHeaderText: '#9C4221',
        bodyBg: '#FFFAFA',
        bodyText: '#1A202C',
        fontFamily: 'Inter',
        fontSize: 12,
        showLogo: true,
        showGstNumber: true,
        showHsn: true,
        showTaxBreakdown: true,
        showSignature: true,
        showTerms: true,
        showAmountInWords: true,
        showQrCode: true,
        showBalanceDue: true,
        showPaymentHistory: true,
        logoAlign: 'left',
        amountAlign: 'right'
    },
    {
        id: 'waves',
        name: 'Waves Playful',
        layout: 'modern',
        paperSize: 'A4',
        headerBg: '#FF6B6B',
        headerText: '#FFFFFF',
        accentColor: '#FF8E53',
        tableHeaderBg: '#FFF5F5',
        tableHeaderText: '#E53E3E',
        bodyBg: '#FAFAFA',
        bodyText: '#1A202C',
        fontFamily: 'Inter',
        fontSize: 12,
        showLogo: true,
        showGstNumber: true,
        showHsn: true,
        showTaxBreakdown: true,
        showSignature: false,
        showTerms: true,
        showAmountInWords: true,
        showQrCode: true,
        showBalanceDue: true,
        showPaymentHistory: false,
        logoAlign: 'left',
        amountAlign: 'right'
    },
    {
        id: 'creative',
        name: 'Creative Portfolio',
        layout: 'modern',
        paperSize: 'A4',
        headerBg: '#1A202C',
        headerText: '#FFFFFF',
        accentColor: '#4A5568',
        tableHeaderBg: '#F7FAFC',
        tableHeaderText: '#4A5568',
        bodyBg: '#F8FAFC',
        bodyText: '#1A202C',
        fontFamily: 'Inter',
        fontSize: 13,
        showLogo: true,
        showGstNumber: true,
        showHsn: true,
        showTaxBreakdown: true,
        showSignature: false,
        showTerms: true,
        showAmountInWords: true,
        showQrCode: true,
        showBalanceDue: true,
        showPaymentHistory: true,
        logoAlign: 'right',
        amountAlign: 'right'
    },
    {
        id: 'luxe_gold',
        name: 'Luxe Gold (Premium)',
        layout: 'modern',
        paperSize: 'A4',
        headerBg: '#0F172A',
        headerText: '#FDE047',
        accentColor: '#CA8A04',
        tableHeaderBg: '#1E293B',
        tableHeaderText: '#FDE047',
        bodyBg: '#0F172A',
        bodyText: '#F1F5F9',
        fontFamily: 'Inter',
        fontSize: 12,
        showLogo: true,
        showGstNumber: true,
        showHsn: true,
        showTaxBreakdown: true,
        showSignature: false,
        showTerms: true,
        showAmountInWords: true,
        showQrCode: true,
        showBalanceDue: true,
        showPaymentHistory: true,
        logoAlign: 'left',
        amountAlign: 'right'
    }
];
const useActiveCompany = ()=>{
    const { companies, activeCompanyId } = useStore();
    return companies.find((c)=>c.id === activeCompanyId) ?? null;
};
const useCompanyData = (type)=>{
    const { [type]: items, activeCompanyId } = useStore();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(items || []).filter((i)=>i.companyId === activeCompanyId), [
        items,
        activeCompanyId
    ]);
};
const useUserCompanies = ()=>{
    const { companies, user } = useStore();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>companies.filter((c)=>{
            if (!c.userId) return true; // legacy or demo
            const isOwner = !user?.role || user?.role === 'owner' || user?.role === 'co_owner';
            if (c.userId === user?.uid && isOwner) return true; // owner
            // Check team access
            if (c.team && user) {
                return c.team.some((t)=>{
                    const target = t.contact.toLowerCase().trim();
                    return user.email && user.email.toLowerCase().trim() === target || user.phone && user.phone.trim() === target;
                });
            }
            return false;
        }), [
        companies,
        user
    ]);
};
const useStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        user: null,
        isAuthenticated: false,
        isHydrating: true,
        setIsHydrating: (b)=>set({
                isHydrating: b
            }),
        syncStatus: 'idle',
        lastSyncedAt: null,
        syncError: null,
        setSyncStatus: (s)=>set({
                syncStatus: s
            }),
        setLastSyncedAt: (t)=>set({
                lastSyncedAt: t
            }),
        setSyncError: (e)=>set({
                syncError: e
            }),
        setUser: (u)=>{
            if (u && !u.trialExpiresAt) {
                const createdAt = new Date(u.createdAt || Date.now());
                const expires = new Date(createdAt);
                expires.setDate(expires.getDate() + 3);
                u.trialExpiresAt = expires.toISOString();
                u.trialClaimed = false;
            }
            set({
                user: u,
                isAuthenticated: !!u,
                lastModified: Date.now()
            });
        },
        updateUser: (upd)=>set((s)=>({
                    user: s.user ? {
                        ...s.user,
                        ...upd
                    } : null,
                    lastModified: Date.now()
                })),
        logout: ()=>set({
                user: null,
                isAuthenticated: false,
                activeCompanyId: null,
                isDemo: false,
                demoExpiresAt: null,
                companies: [],
                parties: [],
                products: [],
                invoices: [],
                expenses: [],
                agencyClients: [],
                agencyProjects: [],
                hsnCache: [],
                templates: DEFAULT_TEMPLATES,
                isHydrating: true,
                primarySwapCount: 0,
                aiApiKey: null,
                aiUsageCount: 0,
                lastSyncedAt: null,
                syncStatus: 'idle',
                syncError: null,
                lastModified: Date.now()
            }),
        lastModified: Date.now(),
        bump: ()=>set({
                lastModified: Date.now()
            }),
        aiApiKey: null,
        aiUsageCount: 0,
        setAiApiKey: (key)=>set({
                aiApiKey: key,
                lastModified: Date.now()
            }),
        activeCompanyId: null,
        primarySwapCount: 0,
        setPrimarySwapCount: (c)=>set({
                primarySwapCount: c,
                lastModified: Date.now()
            }),
        isDemo: false,
        demoExpiresAt: null,
        startDemo: ()=>{
            const demoId = 'demo_user_123';
            const demoExpiry = new Date();
            demoExpiry.setHours(demoExpiry.getHours() + 1);
            const demoUser = {
                uid: demoId,
                email: 'demo@edibio.app',
                name: 'Demo Manager',
                createdAt: new Date().toISOString()
            };
            // Check for existing demo company
            const s = get();
            let demoCompany = s.companies.find((c)=>c.name === 'Edibio Store');
            if (!demoCompany) {
                const co = {
                    id: 'demo_co_123',
                    userId: demoId,
                    name: 'Edibio Store',
                    type: 'Supermarket',
                    phone: '9876543210',
                    email: 'store@edibio.app',
                    address: 'Market Yard, Shop No 45',
                    city: 'Mumbai',
                    state: 'Maharashtra',
                    pincode: '400001',
                    colorAccent: '#4285F4',
                    godowns: [],
                    currency: 'INR',
                    financialYear: '2024-25',
                    invoicePrefix: 'ES',
                    invoiceCounter: 6,
                    templateId: 'classic',
                    createdAt: new Date().toISOString(),
                    licenseNo: 'DEMO1234'
                };
                const demoProducts = [
                    {
                        id: uid(),
                        companyId: co.id,
                        name: 'Amul Milk 1L',
                        category: 'Dairy',
                        unit: 'packet',
                        purchasePrice: 60,
                        sellingPrice: 66,
                        mrp: 66,
                        stockQty: 100,
                        lowStockAlertQty: 10,
                        gstRate: 0,
                        taxIncluded: true
                    },
                    {
                        id: uid(),
                        companyId: co.id,
                        name: 'Parle-G 800g',
                        category: 'Biscuits',
                        unit: 'pack',
                        purchasePrice: 70,
                        sellingPrice: 80,
                        mrp: 80,
                        stockQty: 50,
                        lowStockAlertQty: 5,
                        gstRate: 5,
                        taxIncluded: true
                    },
                    {
                        id: uid(),
                        companyId: co.id,
                        name: 'Basmati Rice 5kg',
                        category: 'Grains',
                        unit: 'bag',
                        purchasePrice: 450,
                        sellingPrice: 550,
                        mrp: 600,
                        stockQty: 20,
                        lowStockAlertQty: 2,
                        gstRate: 5,
                        taxIncluded: true
                    },
                    {
                        id: uid(),
                        companyId: co.id,
                        name: 'Dettol Soap 125g',
                        category: 'Personal Care',
                        unit: 'pcs',
                        purchasePrice: 35,
                        sellingPrice: 42,
                        mrp: 45,
                        stockQty: 40,
                        lowStockAlertQty: 10,
                        gstRate: 18,
                        taxIncluded: true
                    }
                ];
                const demoParties = [
                    {
                        id: uid(),
                        companyId: co.id,
                        type: 'customer',
                        name: 'Rahul Sharma',
                        phone: '9820012345',
                        address: 'Bandra West',
                        balance: 500,
                        openingBalance: 0
                    },
                    {
                        id: uid(),
                        companyId: co.id,
                        type: 'customer',
                        name: 'Anita Patel',
                        phone: '9123456789',
                        address: 'Andheri East',
                        balance: 0,
                        openingBalance: 0
                    },
                    {
                        id: uid(),
                        companyId: co.id,
                        type: 'supplier',
                        name: 'Metro Wholesalers',
                        phone: '022-2445566',
                        address: 'Navi Mumbai',
                        balance: -5000,
                        openingBalance: 0
                    }
                ];
                const demoInvoices = [];
                const now = new Date();
                for(let i = 0; i < 5; i++){
                    const date = new Date(now);
                    date.setDate(date.getDate() - i);
                    demoInvoices.push({
                        id: 'demo_inv_' + i,
                        companyId: co.id,
                        invoiceType: 'sale',
                        invoiceNumber: 'ES03MN' + (i + 1),
                        date: date.toISOString().split('T')[0],
                        partyId: demoParties[0].id,
                        partyName: demoParties[0].name,
                        items: [
                            {
                                name: 'Demo Item',
                                qty: i + 1,
                                unit: 'pcs',
                                rate: 100,
                                discount: 0,
                                discountAmt: 0,
                                taxableAmt: 100 * (i + 1),
                                gstRate: 18,
                                cgst: 9,
                                sgst: 9,
                                igst: 0,
                                cess: 0,
                                totalGst: 18,
                                amount: 118 * (i + 1)
                            }
                        ],
                        subTotal: 100 * (i + 1),
                        totalDiscount: 0,
                        taxableAmount: 100 * (i + 1),
                        totalCgst: 9 * (i + 1),
                        totalSgst: 9 * (i + 1),
                        totalIgst: 0,
                        totalCess: 0,
                        totalGst: 18 * (i + 1),
                        shippingCharges: 0,
                        packingCharges: 0,
                        adjustmentAmount: 0,
                        roundOff: 0,
                        grandTotal: 118 * (i + 1),
                        paymentStatus: 'paid',
                        amountPaid: 118 * (i + 1),
                        balanceDue: 0,
                        payments: [],
                        paymentMethod: 'cash',
                        isGstBill: true,
                        isHidden: false,
                        isPrivate: false,
                        createdAt: date.toISOString(),
                        updatedAt: date.toISOString()
                    });
                }
                demoCompany = co;
                set((state)=>({
                        companies: [
                            ...state.companies,
                            co
                        ],
                        products: [
                            ...state.products,
                            ...demoProducts
                        ],
                        parties: [
                            ...state.parties,
                            ...demoParties
                        ],
                        invoices: [
                            ...state.invoices,
                            ...demoInvoices
                        ]
                    }));
            }
            set({
                user: demoUser,
                isAuthenticated: true,
                activeCompanyId: demoCompany.id,
                isDemo: true,
                demoExpiresAt: demoExpiry.toISOString()
            });
        },
        clearDemo: ()=>set({
                isDemo: false,
                demoExpiresAt: null
            }),
        setActiveCompany: (id)=>set({
                activeCompanyId: id
            }),
        companies: [],
        addCompany: (c)=>{
            const userId = get().user?.uid;
            const co = {
                ...c,
                id: uid(),
                userId: userId,
                licenseNo: Math.floor(10000000 + Math.random() * 90000000).toString(),
                godowns: [],
                invoiceCounter: 1,
                currency: 'INR',
                templateId: 'classic',
                createdAt: new Date().toISOString(),
                auditLogs: []
            };
            set((s)=>({
                    companies: [
                        ...s.companies,
                        co
                    ],
                    lastModified: Date.now()
                }));
            syncAfter(get);
            return co;
        },
        updateCompany: (id, upd)=>set((s)=>({
                    companies: s.companies.map((c)=>c.id === id ? {
                            ...c,
                            ...upd
                        } : c),
                    lastModified: Date.now()
                })),
        deleteCompany: (id)=>set((s)=>({
                    companies: s.companies.filter((c)=>c.id !== id),
                    activeCompanyId: s.activeCompanyId === id ? null : s.activeCompanyId,
                    lastModified: Date.now()
                })),
        addGodown: (companyId, g)=>set((s)=>({
                    companies: s.companies.map((c)=>{
                        if (c.id !== companyId) return c;
                        if (c.godowns.length >= 2) return c; // max 2
                        return {
                            ...c,
                            godowns: [
                                ...c.godowns,
                                {
                                    ...g,
                                    id: uid()
                                }
                            ]
                        };
                    }),
                    lastModified: Date.now()
                })),
        removeGodown: (companyId, godownId)=>set((s)=>({
                    companies: s.companies.map((c)=>c.id !== companyId ? c : {
                            ...c,
                            godowns: c.godowns.filter((g)=>g.id !== godownId)
                        }),
                    lastModified: Date.now()
                })),
        addOfferScheme: (companyId, offer)=>set((s)=>({
                    companies: s.companies.map((c)=>c.id !== companyId ? c : {
                            ...c,
                            offers: [
                                ...c.offers || [],
                                {
                                    ...offer,
                                    id: uid()
                                }
                            ]
                        }),
                    lastModified: Date.now()
                })),
        updateOfferScheme: (companyId, id, upd)=>set((s)=>({
                    companies: s.companies.map((c)=>c.id !== companyId ? c : {
                            ...c,
                            offers: (c.offers || []).map((o)=>o.id === id ? {
                                    ...o,
                                    ...upd
                                } : o)
                        }),
                    lastModified: Date.now()
                })),
        deleteOfferScheme: (companyId, id)=>set((s)=>({
                    companies: s.companies.map((c)=>c.id !== companyId ? c : {
                            ...c,
                            offers: (c.offers || []).filter((o)=>o.id !== id)
                        }),
                    lastModified: Date.now()
                })),
        parties: [],
        addParty: (p)=>{
            const party = {
                ...p,
                id: uid(),
                createdAt: new Date().toISOString()
            };
            set((s)=>({
                    parties: [
                        party,
                        ...s.parties
                    ],
                    lastModified: Date.now()
                }));
            syncAfter(get);
            return party;
        },
        updateParty: (id, upd)=>set((s)=>({
                    parties: s.parties.map((p)=>p.id === id ? {
                            ...p,
                            ...upd
                        } : p),
                    lastModified: Date.now()
                })),
        deleteParty: (id)=>set((s)=>({
                    parties: s.parties.filter((p)=>p.id !== id),
                    lastModified: Date.now()
                })),
        addBalancePayment: (partyId, payment)=>set((s)=>({
                    parties: s.parties.map((p)=>{
                        if (p.id !== partyId) return p;
                        const balanceBefore = p.balance;
                        const balanceAfter = payment.type === 'received' ? balanceBefore - payment.amount : balanceBefore + payment.amount;
                        const entry = {
                            ...payment,
                            id: uid(),
                            balanceBefore,
                            balanceAfter,
                            recordedAt: new Date().toISOString()
                        };
                        return {
                            ...p,
                            balance: balanceAfter,
                            paymentHistory: [
                                entry,
                                ...p.paymentHistory || []
                            ]
                        };
                    }),
                    lastModified: Date.now()
                })),
        deleteBalancePayment: (partyId, paymentId)=>set((s)=>({
                    parties: s.parties.map((p)=>{
                        if (p.id !== partyId) return p;
                        const entry = (p.paymentHistory || []).find((h)=>h.id === paymentId);
                        if (!entry) return p;
                        // Reverse the balance change
                        const revertedBalance = entry.type === 'received' ? p.balance + entry.amount : p.balance - entry.amount;
                        return {
                            ...p,
                            balance: revertedBalance,
                            paymentHistory: (p.paymentHistory || []).filter((h)=>h.id !== paymentId)
                        };
                    }),
                    lastModified: Date.now()
                })),
        products: [],
        addProduct: (p)=>{
            const prod = {
                ...p,
                id: uid(),
                createdAt: new Date().toISOString()
            };
            set((s)=>({
                    products: [
                        prod,
                        ...s.products
                    ],
                    lastModified: Date.now()
                }));
            syncAfter(get);
            return prod;
        },
        importProductsBulk: (prods)=>{
            const newProds = prods.map((p)=>({
                    ...p,
                    id: uid(),
                    createdAt: new Date().toISOString()
                }));
            set((s)=>({
                    products: [
                        ...newProds,
                        ...s.products
                    ],
                    lastModified: Date.now()
                }));
            syncAfter(get);
        },
        updateProduct: (id, upd)=>set((s)=>({
                    products: s.products.map((p)=>p.id === id ? {
                            ...p,
                            ...upd
                        } : p),
                    lastModified: Date.now()
                })),
        deleteProduct: (id)=>set((s)=>({
                    products: s.products.filter((p)=>p.id !== id),
                    lastModified: Date.now()
                })),
        appendStockLog: (productId, log)=>set((s)=>({
                    products: s.products.map((p)=>p.id === productId ? {
                            ...p,
                            stockLogs: [
                                {
                                    ...log,
                                    id: uid()
                                },
                                ...p.stockLogs || []
                            ].slice(0, 500)
                        } : p),
                    lastModified: Date.now()
                })),
        adjustStock: (id, delta)=>{
            const state = useStore.getState();
            const product = state.products.find((p)=>p.id === id);
            if (!product) return;
            const newQty = Math.max(0, product.stockQty + delta);
            const log = {
                date: new Date().toISOString().slice(0, 10),
                time: new Date().toTimeString().slice(0, 5),
                type: delta > 0 ? 'in' : 'out',
                qty: Math.abs(delta),
                reason: 'Manual Adjust',
                balanceAfter: newQty
            };
            set((s)=>({
                    products: s.products.map((p)=>p.id === id ? {
                            ...p,
                            stockQty: newQty,
                            stockLogs: [
                                {
                                    ...log,
                                    id: uid()
                                },
                                ...p.stockLogs || []
                            ].slice(0, 500)
                        } : p),
                    lastModified: Date.now()
                }));
        },
        assignProductsToParty: (partyId, productIds)=>set((s)=>({
                    parties: s.parties.map((p)=>{
                        if (p.id !== partyId) return p;
                        const existing = p.assignedProductIds || [];
                        const merged = Array.from(new Set([
                            ...existing,
                            ...productIds
                        ]));
                        return {
                            ...p,
                            assignedProductIds: merged
                        };
                    }),
                    lastModified: Date.now()
                })),
        invoices: [],
        addInvoice: (inv)=>{
            set((s)=>({
                    invoices: [
                        inv,
                        ...s.invoices
                    ],
                    companies: s.companies.map((c)=>c.id === inv.companyId ? {
                            ...c,
                            invoiceCounter: c.invoiceCounter + 1
                        } : c),
                    lastModified: Date.now()
                }));
            syncAfter(get);
            // Auto-link products to supplier if purchase
            if (inv.invoiceType === 'purchase' && inv.partyId) {
                const productIds = inv.items.map((i)=>i.productId).filter(Boolean);
                if (productIds.length > 0) {
                    get().assignProductsToParty(inv.partyId, productIds);
                }
            }
            // Append StockLog for each line item
            const STOCK_IN_TYPES = [
                'purchase',
                'sale_return',
                'credit_note'
            ];
            const STOCK_OUT_TYPES = [
                'sale',
                'purchase_return',
                'debit_note'
            ];
            const isStockIn = STOCK_IN_TYPES.includes(inv.invoiceType);
            const isStockOut = STOCK_OUT_TYPES.includes(inv.invoiceType);
            if (isStockIn || isStockOut) {
                const state = useStore.getState();
                inv.items.forEach((item)=>{
                    if (!item.productId) return;
                    const prod = state.products.find((p)=>p.id === item.productId);
                    if (!prod) return;
                    const delta = isStockIn ? item.qty : -item.qty;
                    const balanceAfter = Math.max(0, prod.stockQty + delta);
                    const log = {
                        date: inv.date,
                        time: inv.time,
                        type: isStockIn ? 'in' : 'out',
                        qty: item.qty,
                        reason: isStockIn ? `Purchase - ${inv.invoiceNumber}` : `Sale - ${inv.invoiceNumber}`,
                        invoiceId: inv.id,
                        invoiceNumber: inv.invoiceNumber,
                        partyName: inv.partyName,
                        balanceAfter
                    };
                    get().appendStockLog(item.productId, log);
                });
            }
            // Update party balance based on invoice type
            // Draft types (estimate, proforma, delivery_challan) do NOT affect balance
            const DRAFT_TYPES = [
                'estimate',
                'proforma',
                'delivery_challan'
            ];
            if (inv.partyId && !DRAFT_TYPES.includes(inv.invoiceType) && inv.balanceDue > 0) {
                let balanceDelta = 0;
                if (inv.invoiceType === 'sale') {
                    // Customer owes us → increase their balance (positive = receivable from them)
                    balanceDelta = inv.balanceDue;
                } else if (inv.invoiceType === 'purchase') {
                    // We owe supplier → decrease their balance (negative = payable to them)
                    balanceDelta = -inv.balanceDue;
                } else if ([
                    'sale_return',
                    'credit_note'
                ].includes(inv.invoiceType)) {
                    // Customer return → reduce what they owe us
                    balanceDelta = -inv.grandTotal;
                } else if ([
                    'purchase_return',
                    'debit_note'
                ].includes(inv.invoiceType)) {
                    // Supplier return → reduce what we owe them
                    balanceDelta = inv.grandTotal;
                }
                if (balanceDelta !== 0) {
                    set((s)=>({
                            parties: s.parties.map((p)=>p.id === inv.partyId ? {
                                    ...p,
                                    balance: (p.balance || 0) + balanceDelta
                                } : p),
                            lastModified: Date.now()
                        }));
                }
            }
            // Update party loyalty points for sale invoices
            if (inv.partyId && inv.invoiceType === 'sale') {
                const earned = inv.pointsEarned || 0;
                const redeemed = inv.pointsRedeemed || 0;
                if (earned !== 0 || redeemed !== 0) {
                    set((s)=>({
                            parties: s.parties.map((p)=>p.id === inv.partyId ? {
                                    ...p,
                                    loyaltyPoints: Math.max(0, (p.loyaltyPoints || 0) + earned - redeemed)
                                } : p),
                            lastModified: Date.now()
                        }));
                }
            }
        },
        updateInvoice: (id, upd)=>set((s)=>({
                    invoices: s.invoices.map((i)=>i.id === id ? {
                            ...i,
                            ...upd
                        } : i),
                    lastModified: Date.now()
                })),
        deleteInvoice: (id)=>{
            const inv = get().invoices.find((i)=>i.id === id);
            if (inv) {
                // Revert stock changes
                inv.items.forEach((item)=>{
                    if (item.productId) {
                        let delta = 0;
                        if ([
                            'sale',
                            'purchase_return',
                            'debit_note'
                        ].includes(inv.invoiceType)) {
                            delta = item.qty;
                        } else if ([
                            'purchase',
                            'sale_return',
                            'credit_note'
                        ].includes(inv.invoiceType)) {
                            delta = -item.qty;
                        }
                        if (delta !== 0) {
                            get().adjustStock(item.productId, delta);
                        }
                    }
                });
                // Revert party balance changes
                const DRAFT_TYPES = [
                    'estimate',
                    'proforma',
                    'delivery_challan'
                ];
                if (inv.partyId && !DRAFT_TYPES.includes(inv.invoiceType)) {
                    let revertDelta = 0;
                    if (inv.invoiceType === 'sale') {
                        revertDelta = -inv.balanceDue;
                    } else if (inv.invoiceType === 'purchase') {
                        revertDelta = inv.balanceDue;
                    } else if ([
                        'sale_return',
                        'credit_note'
                    ].includes(inv.invoiceType)) {
                        revertDelta = inv.grandTotal;
                    } else if ([
                        'purchase_return',
                        'debit_note'
                    ].includes(inv.invoiceType)) {
                        revertDelta = -inv.grandTotal;
                    }
                    if (revertDelta !== 0) {
                        set((s)=>({
                                parties: s.parties.map((p)=>p.id === inv.partyId ? {
                                        ...p,
                                        balance: (p.balance || 0) + revertDelta
                                    } : p),
                                lastModified: Date.now()
                            }));
                    }
                }
                // Revert loyalty points
                if (inv.partyId && inv.invoiceType === 'sale') {
                    const earned = inv.pointsEarned || 0;
                    const redeemed = inv.pointsRedeemed || 0;
                    if (earned !== 0 || redeemed !== 0) {
                        set((s)=>({
                                parties: s.parties.map((p)=>p.id === inv.partyId ? {
                                        ...p,
                                        loyaltyPoints: Math.max(0, (p.loyaltyPoints || 0) - earned + redeemed)
                                    } : p),
                                lastModified: Date.now()
                            }));
                    }
                }
            }
            set((s)=>({
                    invoices: s.invoices.filter((i)=>i.id !== id),
                    lastModified: Date.now()
                }));
            syncAfter(get);
        },
        nextInvoiceNumber: (companyId, prefixOverride = 'MN')=>{
            const co = get().companies.find((c)=>c.id === companyId);
            if (!co) return 'INV-001';
            // 3 letters of shop name uppercase
            const shopCode = (co.name.replace(/[^a-zA-Z]/g, '').substring(0, 3) || 'SHP').toUpperCase();
            const d = new Date();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()); // 1 for first day
            const n = String(co.invoiceCounter).padStart(6, '0');
            return `${shopCode}${month}${prefixOverride}${day}${n}`;
        },
        expenses: [],
        addExpense: (e)=>set((s)=>({
                    expenses: [
                        {
                            ...e,
                            id: uid(),
                            createdAt: new Date().toISOString()
                        },
                        ...s.expenses
                    ],
                    lastModified: Date.now()
                })),
        deleteExpense: (id)=>set((s)=>({
                    expenses: s.expenses.filter((x)=>x.id !== id),
                    lastModified: Date.now()
                })),
        agencyClients: [],
        addAgencyClient: (c)=>{
            const ac = {
                ...c,
                id: uid(),
                createdAt: new Date().toISOString()
            };
            set((s)=>({
                    agencyClients: [
                        ac,
                        ...s.agencyClients
                    ],
                    lastModified: Date.now()
                }));
            return ac;
        },
        updateAgencyClient: (id, upd)=>set((s)=>({
                    agencyClients: s.agencyClients.map((c)=>c.id === id ? {
                            ...c,
                            ...upd
                        } : c),
                    lastModified: Date.now()
                })),
        deleteAgencyClient: (id)=>set((s)=>({
                    agencyClients: s.agencyClients.filter((c)=>c.id !== id),
                    lastModified: Date.now()
                })),
        agencyProjects: [],
        addAgencyProject: (p)=>{
            const proj = {
                ...p,
                id: uid(),
                createdAt: new Date().toISOString()
            };
            set((s)=>({
                    agencyProjects: [
                        proj,
                        ...s.agencyProjects
                    ],
                    lastModified: Date.now()
                }));
            return proj;
        },
        updateAgencyProject: (id, upd)=>set((s)=>({
                    agencyProjects: s.agencyProjects.map((p)=>p.id === id ? {
                            ...p,
                            ...upd
                        } : p),
                    lastModified: Date.now()
                })),
        deleteAgencyProject: (id)=>set((s)=>({
                    agencyProjects: s.agencyProjects.filter((p)=>p.id !== id),
                    lastModified: Date.now()
                })),
        purchaseOrders: [],
        addPurchaseOrder: (po)=>{
            const now = new Date().toISOString();
            const full = {
                ...po,
                id: uid(),
                createdAt: now,
                updatedAt: now
            };
            set((s)=>({
                    purchaseOrders: [
                        full,
                        ...s.purchaseOrders
                    ],
                    lastModified: Date.now()
                }));
            return full;
        },
        updatePurchaseOrder: (id, upd)=>set((s)=>({
                    purchaseOrders: s.purchaseOrders.map((po)=>po.id === id ? {
                            ...po,
                            ...upd,
                            updatedAt: new Date().toISOString()
                        } : po),
                    lastModified: Date.now()
                })),
        deletePurchaseOrder: (id)=>set((s)=>({
                    purchaseOrders: s.purchaseOrders.filter((po)=>po.id !== id),
                    lastModified: Date.now()
                })),
        templates: DEFAULT_TEMPLATES,
        addTemplate: (t)=>set((s)=>({
                    templates: [
                        ...s.templates,
                        {
                            ...t,
                            id: uid()
                        }
                    ],
                    lastModified: Date.now()
                })),
        updateTemplate: (id, upd)=>set((s)=>({
                    templates: s.templates.map((t)=>t.id === id ? {
                            ...t,
                            ...upd
                        } : t),
                    lastModified: Date.now()
                })),
        deleteTemplate: (id)=>set((s)=>({
                    templates: s.templates.filter((t)=>t.id !== id),
                    lastModified: Date.now()
                })),
        hsnCache: [],
        addToHsnCache: (h)=>set((s)=>({
                    hsnCache: [
                        h,
                        ...s.hsnCache.filter((x)=>x.code !== h.code)
                    ].slice(0, 200)
                })),
        resetAll: ()=>set({
                companies: [],
                parties: [],
                products: [],
                invoices: [],
                expenses: [],
                agencyClients: [],
                agencyProjects: [],
                hsnCache: [],
                templates: DEFAULT_TEMPLATES,
                user: null,
                isAuthenticated: false,
                activeCompanyId: null,
                isHydrating: true,
                primarySwapCount: 0,
                aiApiKey: null,
                aiUsageCount: 0,
                lastSyncedAt: null,
                syncStatus: 'idle',
                syncError: null,
                lastModified: Date.now(),
                isDemo: false,
                demoExpiresAt: null
            }),
        exportBackup: ()=>{
            const s = useStore.getState();
            const backup = {
                version: 2,
                exportedAt: new Date().toISOString(),
                user: s.user,
                companies: s.companies,
                parties: s.parties,
                products: s.products,
                invoices: s.invoices,
                expenses: s.expenses,
                agencyClients: s.agencyClients,
                agencyProjects: s.agencyProjects,
                hsnCache: s.hsnCache,
                aiApiKey: s.aiApiKey
            };
            const blob = new Blob([
                JSON.stringify(backup, null, 2)
            ], {
                type: 'application/json'
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `edibio_backup_${new Date().toISOString().slice(0, 10)}.json`;
            a.click();
            URL.revokeObjectURL(url);
        },
        importBackup: (json)=>{
            try {
                const data = JSON.parse(json);
                if (!data.companies) throw new Error('Invalid backup file — missing companies data.');
                set({
                    companies: data.companies || [],
                    parties: data.parties || [],
                    products: data.products || [],
                    invoices: data.invoices || [],
                    expenses: data.expenses || [],
                    agencyClients: data.agencyClients || [],
                    agencyProjects: data.agencyProjects || [],
                    hsnCache: data.hsnCache || [],
                    aiApiKey: data.aiApiKey || null
                });
                syncAfter(get);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success('Backup imported successfully!');
            } catch (e) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error('Import failed: ' + e.message);
            }
        },
        addAuditLog: (log)=>{
            const { activeCompanyId, user } = get();
            if (!activeCompanyId || !user) return;
            const newLog = {
                ...log,
                id: uid(),
                timestamp: new Date().toISOString()
            };
            set((s)=>({
                    companies: s.companies.map((c)=>c.id === activeCompanyId ? {
                            ...c,
                            auditLogs: [
                                newLog,
                                ...c.auditLogs || []
                            ]
                        } : c),
                    lastModified: Date.now()
                }));
            syncAfter(get);
        }
    }), {
    name: 'edibio-store',
    version: 1,
    storage: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : undefined
}));
}),
"[project]/components/OfflineGuard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OfflineGuard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * Offline Detection & Subscription Guard
 * - Warns after 10 days offline (notification)
 * - Locks app after 20 days offline  
 * - Stores last-online timestamp in localStorage
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__WifiOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wifi-off.js [app-ssr] (ecmascript) <export default as WifiOff>");
'use client';
;
;
;
;
const WARN_DAYS = 10;
const LOCK_DAYS = 20;
const SYNC_INTERVAL_DAYS = 3;
const LS_LAST_ONLINE = 'edibio_last_online';
const LS_LAST_SYNC = 'edibio_last_sync';
function daysSince(iso) {
    if (!iso) return 0;
    return Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
}
function OfflineGuard({ children }) {
    const [isLocked, setIsLocked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showWarn, setShowWarn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isOnline, setIsOnline] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const { isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])();
    const syncToCloud = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        // In a real implementation this would push to Firebase/MongoDB
        localStorage.setItem(LS_LAST_SYNC, new Date().toISOString());
        console.log('[Edibio] Data synced to cloud');
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleOnline = ()=>{
            setIsOnline(true);
            const now = new Date().toISOString();
            localStorage.setItem(LS_LAST_ONLINE, now);
            setIsLocked(false);
            setShowWarn(false);
            // Sync if it's been 3+ days
            const lastSync = localStorage.getItem(LS_LAST_SYNC);
            if (!lastSync || daysSince(lastSync) >= SYNC_INTERVAL_DAYS) {
                syncToCloud();
            }
        };
        const handleOffline = ()=>setIsOnline(false);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        // Initial check
        if (navigator.onLine) {
            const now = new Date().toISOString();
            localStorage.setItem(LS_LAST_ONLINE, now);
            const lastSync = localStorage.getItem(LS_LAST_SYNC);
            if (!lastSync || daysSince(lastSync) >= SYNC_INTERVAL_DAYS) syncToCloud();
        } else {
            setIsOnline(false);
            const lastOnline = localStorage.getItem(LS_LAST_ONLINE);
            const days = daysSince(lastOnline);
            if (days >= LOCK_DAYS && isAuthenticated) setIsLocked(true);
            else if (days >= WARN_DAYS && isAuthenticated) setShowWarn(true);
        }
        // Request notification permission
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
        return ()=>{
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [
        isAuthenticated,
        syncToCloud
    ]);
    // Offline lock screen
    if (isLocked) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                minHeight: '100dvh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#1A1A2E',
                padding: 24,
                textAlign: 'center'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        width: 80,
                        height: 80,
                        borderRadius: 999,
                        background: 'rgba(234,67,53,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__WifiOff$3e$__["WifiOff"], {
                        size: 36,
                        color: "#EA4335"
                    }, void 0, false, {
                        fileName: "[project]/components/OfflineGuard.tsx",
                        lineNumber: 85,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/OfflineGuard.tsx",
                    lineNumber: 84,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    style: {
                        color: 'white',
                        fontSize: 24,
                        fontWeight: 900,
                        marginBottom: 12
                    },
                    children: "App Locked — No Internet"
                }, void 0, false, {
                    fileName: "[project]/components/OfflineGuard.tsx",
                    lineNumber: 87,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: 14,
                        marginBottom: 32,
                        maxWidth: 320
                    },
                    children: [
                        "Edibio has been offline for ",
                        LOCK_DAYS,
                        "+ days. Please connect to the internet to continue using the app and sync your data to the cloud."
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/OfflineGuard.tsx",
                    lineNumber: 88,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>window.location.reload(),
                    style: {
                        padding: '14px 32px',
                        borderRadius: 14,
                        background: '#4285F4',
                        color: 'white',
                        border: 'none',
                        fontWeight: 700,
                        fontSize: 15,
                        cursor: 'pointer'
                    },
                    children: "🔄 Retry Connection"
                }, void 0, false, {
                    fileName: "[project]/components/OfflineGuard.tsx",
                    lineNumber: 91,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/OfflineGuard.tsx",
            lineNumber: 83,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            children,
            !isOnline && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    background: '#EA4335',
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                    padding: '6px',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__WifiOff$3e$__["WifiOff"], {
                        size: 13
                    }, void 0, false, {
                        fileName: "[project]/components/OfflineGuard.tsx",
                        lineNumber: 104,
                        columnNumber: 21
                    }, this),
                    " Working Offline — Data saved locally"
                ]
            }, void 0, true, {
                fileName: "[project]/components/OfflineGuard.tsx",
                lineNumber: 103,
                columnNumber: 17
            }, this),
            showWarn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    bottom: 90,
                    left: 16,
                    right: 16,
                    background: '#FBBC04',
                    borderRadius: 14,
                    padding: '14px 18px',
                    zIndex: 999,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__WifiOff$3e$__["WifiOff"], {
                        size: 18,
                        color: "#92400E"
                    }, void 0, false, {
                        fileName: "[project]/components/OfflineGuard.tsx",
                        lineNumber: 110,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontWeight: 800,
                                    color: '#92400E',
                                    fontSize: 13
                                },
                                children: "Please connect to internet"
                            }, void 0, false, {
                                fileName: "[project]/components/OfflineGuard.tsx",
                                lineNumber: 112,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 11,
                                    color: '#B45309'
                                },
                                children: "App will lock after 20 days offline. Connect to sync your data."
                            }, void 0, false, {
                                fileName: "[project]/components/OfflineGuard.tsx",
                                lineNumber: 113,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/OfflineGuard.tsx",
                        lineNumber: 111,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowWarn(false),
                        style: {
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#92400E',
                            fontWeight: 800
                        },
                        children: "✕"
                    }, void 0, false, {
                        fileName: "[project]/components/OfflineGuard.tsx",
                        lineNumber: 115,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/OfflineGuard.tsx",
                lineNumber: 109,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true);
}
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/components/TrialGuard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TrialGuard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript) <export default as Lock>");
'use client';
;
;
;
;
;
function TrialGuard({ children }) {
    const { user, isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isExpired, setIsExpired] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isAuthenticated && user) {
            // Bypass for admin and role logins
            if (user.role === 'admin' || user.role === 'staff' || user.role === 'manager') {
                setIsExpired(false);
                return;
            }
            // Check if active subscription
            if (user.subscriptionExpiresAt && new Date(user.subscriptionExpiresAt).getTime() > Date.now()) {
                setIsExpired(false);
                return;
            }
            let expiresAtTime = Date.now() + 86400000; // default 1 day buffer if completely broken
            if (user.trialExpiresAt) {
                expiresAtTime = new Date(user.trialExpiresAt).getTime();
            } else if (user.createdAt) {
                // Legacy users who don't have the explicit trial field mapped yet.
                const expires = new Date(user.createdAt);
                expires.setDate(expires.getDate() + 3);
                expiresAtTime = expires.getTime();
            }
            if (Date.now() > expiresAtTime) {
                setIsExpired(true);
            } else {
                setIsExpired(false);
            }
        } else {
            setIsExpired(false); // If not auth
        }
    }, [
        user,
        isAuthenticated,
        pathname
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            children,
            isExpired && !pathname?.startsWith('/subscription') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    inset: 0,
                    zIndex: 99999,
                    background: 'rgba(26, 26, 46, 0.95)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(10px)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: 'white',
                        padding: '40px',
                        borderRadius: '24px',
                        maxWidth: 440,
                        width: '90%',
                        textAlign: 'center',
                        boxShadow: '0 24px 64px rgba(0,0,0,0.4)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: 80,
                                height: 80,
                                borderRadius: 999,
                                background: '#FEF2F2',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 24px',
                                border: '8px solid #FFF5F5'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                size: 32,
                                color: "#DC2626"
                            }, void 0, false, {
                                fileName: "[project]/components/TrialGuard.tsx",
                                lineNumber: 58,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/TrialGuard.tsx",
                            lineNumber: 57,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                fontSize: 24,
                                fontWeight: 900,
                                color: '#1A1A2E',
                                marginBottom: 12
                            },
                            children: "Trial Expired"
                        }, void 0, false, {
                            fileName: "[project]/components/TrialGuard.tsx",
                            lineNumber: 60,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                color: '#4A5568',
                                fontSize: 15,
                                marginBottom: 32,
                                lineHeight: 1.6
                            },
                            children: "Your free trial is over. Please choose a plan or redeem a code to continue using our service."
                        }, void 0, false, {
                            fileName: "[project]/components/TrialGuard.tsx",
                            lineNumber: 61,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>router.push('/subscription'),
                            style: {
                                background: '#4285F4',
                                color: 'white',
                                padding: '16px 32px',
                                borderRadius: '12px',
                                border: 'none',
                                fontWeight: 800,
                                fontSize: 16,
                                width: '100%',
                                cursor: 'pointer',
                                boxShadow: '0 8px 16px rgba(66, 133, 244, 0.25)'
                            },
                            children: "Go to Subscription Page"
                        }, void 0, false, {
                            fileName: "[project]/components/TrialGuard.tsx",
                            lineNumber: 64,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/TrialGuard.tsx",
                    lineNumber: 56,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/TrialGuard.tsx",
                lineNumber: 52,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/components/MongoSync.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MongoSync
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
function MongoSync() {
    const { isAuthenticated, user, isDemo, setIsHydrating, setLastSyncedAt, setSyncStatus, setSyncError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])();
    const prevStateStr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])('');
    const hasHydrated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const pull = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!isAuthenticated || !user?.uid || isDemo) return;
        try {
            const s = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"].getState();
            const role = s.user?.role || 'owner';
            const activeCompanyId = s.activeCompanyId;
            if ((role === 'staff' || role === 'manager') && !activeCompanyId) {
                return;
            }
            const qs = `?userId=${user.uid}&role=${role}&companyId=${activeCompanyId || ''}`;
            const res = await fetch(`/api/sync${qs}`);
            if (!res.ok) {
                if (res.status === 404) {
                    // New user or wiped account
                    return;
                }
                throw new Error('Cloud fetch failed');
            }
            const data = await res.json();
            const cloudState = data.payload;
            const cloudTime = data.updatedAt || 0;
            const localTime = parseInt(localStorage.getItem(`sync_ts_${user.uid}`) || '0', 10);
            // If cloud is newer OR we have no local companies but cloud has them
            if (cloudTime > localTime || s.companies.length === 0 && cloudState.companies?.length > 0) {
                const keys = [
                    'companies',
                    'parties',
                    'products',
                    'invoices',
                    'expenses',
                    'agencyClients',
                    'agencyProjects',
                    'templates'
                ];
                const merged = {};
                keys.forEach((k)=>merged[k] = cloudState[k] || []);
                if (cloudState.user) merged.user = cloudState.user;
                if (cloudState.aiApiKey) merged.aiApiKey = cloudState.aiApiKey;
                if (cloudState.aiUsageCount) merged.aiUsageCount = cloudState.aiUsageCount;
                if (cloudState.primarySwapCount) merged.primarySwapCount = cloudState.primarySwapCount;
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"].setState(merged);
                setLastSyncedAt(cloudTime);
                localStorage.setItem(`sync_ts_${user.uid}`, cloudTime.toString());
            }
        } catch (err) {
            console.error('[MongoSync] Pull error:', err);
        }
    }, [
        isAuthenticated,
        user?.uid,
        isDemo,
        setLastSyncedAt
    ]);
    const sync = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (showToast = true)=>{
        if (!isAuthenticated || !user?.uid || isDemo) return;
        try {
            setSyncStatus('syncing');
            const state = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"].getState();
            const localTime = parseInt(localStorage.getItem(`sync_ts_${user.uid}`) || '0', 10);
            const payload = {
                user: state.user,
                companies: state.companies,
                parties: state.parties,
                products: state.products,
                invoices: state.invoices,
                expenses: state.expenses,
                agencyClients: state.agencyClients,
                agencyProjects: state.agencyProjects,
                templates: state.templates,
                aiApiKey: state.aiApiKey,
                aiUsageCount: state.aiUsageCount,
                primarySwapCount: state.primarySwapCount
            };
            const role = state.user?.role || 'owner';
            const activeCompanyId = state.activeCompanyId;
            if ((role === 'staff' || role === 'manager') && !activeCompanyId) {
                setSyncStatus('saved');
                return;
            }
            const res = await fetch('/api/sync', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: user.uid,
                    role,
                    companyId: activeCompanyId,
                    localTime,
                    payload
                })
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Sync Failed');
            }
            const { updatedAt } = await res.json();
            setLastSyncedAt(updatedAt);
            localStorage.setItem(`sync_ts_${user.uid}`, updatedAt.toString());
            setSyncStatus('saved');
            if (showToast) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success('Cloud Synced');
        } catch (err) {
            console.error('[MongoSync] Sync error:', err);
            setSyncStatus('error');
            setSyncError(err.message);
            if (showToast) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error(err.message.includes('Conflict') ? 'Sync Conflict: Use Force Sync' : 'Sync Error');
        }
    }, [
        isAuthenticated,
        user?.uid,
        isDemo,
        setLastSyncedAt,
        setSyncStatus,
        setSyncError
    ]);
    // Initial hydration
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isAuthenticated || !user?.uid || isDemo) {
            hasHydrated.current = false;
            if (isAuthenticated) setIsHydrating(false);
            return;
        }
        const hydrationTimeout = setTimeout(()=>{
            if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"].getState().isHydrating) {
                console.warn('[MongoSync] Hydration timed out, forcing false');
                setIsHydrating(false);
            }
        }, 15000);
        if (hasHydrated.current) return;
        hasHydrated.current = true;
        (async ()=>{
            if (!navigator.onLine) {
                setIsHydrating(false);
                return;
            }
            await pull();
            setIsHydrating(false);
            clearTimeout(hydrationTimeout);
        })();
        return ()=>clearTimeout(hydrationTimeout);
    }, [
        isAuthenticated,
        user?.uid,
        isDemo,
        pull,
        setIsHydrating
    ]);
    // Live Update Polling (Check Cloud every 20s)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isAuthenticated || isDemo) return;
        const interval = setInterval(()=>pull(), 20000);
        return ()=>clearInterval(interval);
    }, [
        isAuthenticated,
        isDemo,
        pull
    ]);
    // Auto sync on change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isAuthenticated || isDemo) return;
        const sub = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"].subscribe((state)=>{
            if (state.isHydrating) return;
            const sig = `${state.lastModified}`;
            if (sig !== prevStateStr.current) {
                prevStateStr.current = sig;
                const t = setTimeout(()=>sync(), 5000);
                return ()=>clearTimeout(t);
            }
        });
        return ()=>sub();
    }, [
        isAuthenticated,
        isDemo,
        sync
    ]);
    // Force Sync Global helper
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        window.forceEdibioCloudSync = async ()=>{
            if (!isAuthenticated || !user?.uid) return;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].loading('Force Syncing...', {
                id: 'forcesync'
            });
            try {
                const s = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"].getState();
                const role = s.user?.role || 'owner';
                const activeCompanyId = s.activeCompanyId;
                if ((role === 'staff' || role === 'manager') && !activeCompanyId) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error('No active company selected for staff sync', {
                        id: 'forcesync'
                    });
                    return;
                }
                const qs = `?userId=${user.uid}&role=${role}&companyId=${activeCompanyId || ''}`;
                const res = await fetch(`/api/sync${qs}`);
                if (!res.ok) throw new Error('No cloud data found');
                const data = await res.json();
                const cloudState = data.payload;
                const merged = {};
                const keys = [
                    'companies',
                    'parties',
                    'products',
                    'invoices',
                    'expenses',
                    'agencyClients',
                    'agencyProjects',
                    'templates'
                ];
                keys.forEach((k)=>merged[k] = cloudState[k] || []);
                if (cloudState.user) merged.user = cloudState.user;
                if (cloudState.aiApiKey) merged.aiApiKey = cloudState.aiApiKey;
                if (cloudState.aiUsageCount) merged.aiUsageCount = cloudState.aiUsageCount;
                if (cloudState.primarySwapCount) merged.primarySwapCount = cloudState.primarySwapCount;
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"].setState(merged);
                const serverTime = data.updatedAt || Date.now();
                setLastSyncedAt(serverTime);
                localStorage.setItem(`sync_ts_${user.uid}`, serverTime.toString());
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success('Force Sync Complete!', {
                    id: 'forcesync'
                });
            } catch (err) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error('Sync failed', {
                    id: 'forcesync'
                });
            }
        };
        return ()=>{
            window.forceEdibioCloudSync = null;
        };
    }, [
        isAuthenticated,
        user?.uid,
        setLastSyncedAt
    ]);
    return null;
}
}),
"[project]/components/ConfirmDialog.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConfirmDialog",
    ()=>ConfirmDialog,
    "confirm",
    ()=>confirm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
'use client';
;
;
;
// Global singleton state — works without prop drilling
let resolveRef = null;
let setDialogFn = null;
function confirm(opts) {
    return new Promise((resolve)=>{
        resolveRef = resolve;
        setDialogFn?.(opts);
    });
}
function ConfirmDialog() {
    const [opts, setOpts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    setDialogFn = setOpts;
    const handle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((yes)=>{
        resolveRef?.(yes);
        resolveRef = null;
        setOpts(null);
    }, []);
    if (!opts) return null;
    const getIconColor = ()=>{
        if (opts.danger) return '#DC2626';
        if (opts.success) return '#38A169';
        return '#D97706';
    };
    const getIconBg = ()=>{
        if (opts.danger) return '#FEF2F2';
        if (opts.success) return '#F0FFF4';
        return '#FEF7E0';
    };
    const getButtonBg = ()=>{
        if (opts.danger) return '#DC2626';
        if (opts.success) return '#38A169';
        return '#4285F4';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: 20,
            backdropFilter: 'blur(4px)'
        },
        onClick: ()=>handle(false),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: 'white',
                    borderRadius: 20,
                    padding: '32px 28px',
                    width: '100%',
                    maxWidth: 380,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                    animation: 'scaleIn 0.15s ease'
                },
                onClick: (e)=>e.stopPropagation(),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: 'center',
                            marginBottom: 20
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 56,
                                    height: 56,
                                    borderRadius: '50%',
                                    background: getIconBg(),
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 16px'
                                },
                                children: opts.danger ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                    size: 24,
                                    color: getIconColor()
                                }, void 0, false, {
                                    fileName: "[project]/components/ConfirmDialog.tsx",
                                    lineNumber: 79,
                                    columnNumber: 29
                                }, this) : opts.success ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                    size: 24,
                                    color: getIconColor()
                                }, void 0, false, {
                                    fileName: "[project]/components/ConfirmDialog.tsx",
                                    lineNumber: 81,
                                    columnNumber: 29
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                    size: 24,
                                    color: getIconColor()
                                }, void 0, false, {
                                    fileName: "[project]/components/ConfirmDialog.tsx",
                                    lineNumber: 83,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/ConfirmDialog.tsx",
                                lineNumber: 72,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    fontWeight: 900,
                                    fontSize: 17,
                                    color: '#1A1A2E',
                                    margin: '0 0 8px'
                                },
                                children: opts.title || (opts.danger ? 'Confirm Delete' : opts.success ? 'Confirm Action' : 'Are you sure?')
                            }, void 0, false, {
                                fileName: "[project]/components/ConfirmDialog.tsx",
                                lineNumber: 86,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 13,
                                    color: '#718096',
                                    lineHeight: 1.6,
                                    margin: 0
                                },
                                children: opts.message
                            }, void 0, false, {
                                fileName: "[project]/components/ConfirmDialog.tsx",
                                lineNumber: 89,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ConfirmDialog.tsx",
                        lineNumber: 71,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: 10
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handle(false),
                                style: {
                                    flex: 1,
                                    padding: '12px',
                                    background: '#F1F5F9',
                                    color: '#4A5568',
                                    border: 'none',
                                    borderRadius: 12,
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    fontSize: 14
                                },
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/components/ConfirmDialog.tsx",
                                lineNumber: 92,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handle(true),
                                style: {
                                    flex: 1,
                                    padding: '12px',
                                    background: getButtonBg(),
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: 12,
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    fontSize: 14
                                },
                                children: opts.confirmLabel || (opts.danger ? 'Delete' : opts.success ? 'Settle' : 'Confirm')
                            }, void 0, false, {
                                fileName: "[project]/components/ConfirmDialog.tsx",
                                lineNumber: 98,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ConfirmDialog.tsx",
                        lineNumber: 91,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ConfirmDialog.tsx",
                lineNumber: 63,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `@keyframes scaleIn { from { opacity:0; transform: scale(0.92); } to { opacity:1; transform: scale(1); } }`
            }, void 0, false, {
                fileName: "[project]/components/ConfirmDialog.tsx",
                lineNumber: 111,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ConfirmDialog.tsx",
        lineNumber: 55,
        columnNumber: 9
    }, this);
}
}),
"[project]/components/ErrorBoundary.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ErrorBoundary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.js [app-ssr] (ecmascript) <export default as Home>");
'use client';
;
;
;
class ErrorBoundary extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Component"] {
    state = {
        hasError: false,
        error: null,
        errorInfo: ''
    };
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error
        };
    }
    componentDidCatch(error, info) {
        this.setState({
            errorInfo: info?.componentStack || ''
        });
        console.error('[ErrorBoundary] Caught:', error, info);
    }
    render() {
        if (!this.state.hasError) return this.props.children;
        const msg = this.state.error?.message || 'Unknown error';
        const isDataError = msg.includes('undefined') || msg.includes('null') || msg.includes('Cannot read');
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                minHeight: '100dvh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg,#FFF5F5 0%,#FED7D7 100%)',
                padding: 24
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: 'white',
                    borderRadius: 24,
                    padding: '48px 40px',
                    maxWidth: 480,
                    width: '100%',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                    textAlign: 'center'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: 72,
                            height: 72,
                            borderRadius: '50%',
                            background: '#FEF2F2',
                            border: '8px solid #FFF5F5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                            size: 32,
                            color: "#DC2626"
                        }, void 0, false, {
                            fileName: "[project]/components/ErrorBoundary.tsx",
                            lineNumber: 36,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ErrorBoundary.tsx",
                        lineNumber: 35,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: {
                            fontWeight: 900,
                            fontSize: 22,
                            color: '#1A1A2E',
                            marginBottom: 8
                        },
                        children: "Oops, something crashed"
                    }, void 0, false, {
                        fileName: "[project]/components/ErrorBoundary.tsx",
                        lineNumber: 38,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: '#718096',
                            fontSize: 14,
                            lineHeight: 1.6,
                            marginBottom: 8
                        },
                        children: isDataError ? "A page tried to load data that wasn't ready yet. This usually fixes itself on reload." : 'An unexpected error occurred. Your data is safe — this is just a display issue.'
                    }, void 0, false, {
                        fileName: "[project]/components/ErrorBoundary.tsx",
                        lineNumber: 41,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: '#F8F9FA',
                            borderRadius: 10,
                            padding: '10px 14px',
                            marginBottom: 28,
                            textAlign: 'left'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                            style: {
                                fontSize: 11,
                                color: '#718096',
                                wordBreak: 'break-word'
                            },
                            children: msg.slice(0, 120)
                        }, void 0, false, {
                            fileName: "[project]/components/ErrorBoundary.tsx",
                            lineNumber: 47,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ErrorBoundary.tsx",
                        lineNumber: 46,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: 12,
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            position: 'relative',
                            zIndex: 10
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>window.location.reload(),
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    padding: '12px 24px',
                                    background: '#4285F4',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: 12,
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    fontSize: 14
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/components/ErrorBoundary.tsx",
                                        lineNumber: 54,
                                        columnNumber: 29
                                    }, this),
                                    " Try Again"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ErrorBoundary.tsx",
                                lineNumber: 50,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    window.location.href = '/companies';
                                },
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    padding: '12px 24px',
                                    background: '#F1F5F9',
                                    color: '#1A1A2E',
                                    border: 'none',
                                    borderRadius: 12,
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    fontSize: 14
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/components/ErrorBoundary.tsx",
                                        lineNumber: 60,
                                        columnNumber: 29
                                    }, this),
                                    " Go Home"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ErrorBoundary.tsx",
                                lineNumber: 56,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ErrorBoundary.tsx",
                        lineNumber: 49,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 11,
                            color: '#A0AEC0',
                            marginTop: 20
                        },
                        children: "Your data is stored safely in your browser and the cloud."
                    }, void 0, false, {
                        fileName: "[project]/components/ErrorBoundary.tsx",
                        lineNumber: 63,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ErrorBoundary.tsx",
                lineNumber: 31,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/ErrorBoundary.tsx",
            lineNumber: 27,
            columnNumber: 13
        }, this);
    }
}
}),
"[project]/components/SplashScreen.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SplashScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function SplashScreen({ children }) {
    const { isHydrating } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])();
    const [showSplash, setShowSplash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isFading, setIsFading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Once hydration is complete, let's wait a bit to show our cool animation, then fade it out.
        if (!isHydrating) {
            const timer1 = setTimeout(()=>{
                setIsFading(true);
            }, 800); // Hold the splash text for 0.8s minimum
            const timer2 = setTimeout(()=>{
                setShowSplash(false);
            }, 1200); // 0.4s fade out animation length
            return ()=>{
                clearTimeout(timer1);
                clearTimeout(timer2);
            };
        }
    }, [
        isHydrating
    ]);
    // Safety timeout: if Firebase/hydration takes > 10s, force dismiss the splash
    // This prevents the app from hanging forever on unauthorized domains or slow networks.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const safety = setTimeout(()=>{
            setIsFading(true);
            setTimeout(()=>setShowSplash(false), 500);
        }, 10000);
        return ()=>clearTimeout(safety);
    }, []);
    if (!showSplash) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    visibility: isFading ? 'visible' : 'hidden',
                    opacity: isFading ? 1 : 0,
                    transition: 'opacity 0.4s ease'
                },
                children: children
            }, void 0, false, {
                fileName: "[project]/components/SplashScreen.tsx",
                lineNumber: 45,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    inset: 0,
                    background: '#FFFFFF',
                    zIndex: 99999,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: isFading ? 0 : 1,
                    pointerEvents: isFading ? 'none' : 'auto',
                    transition: 'opacity 0.4s ease-out'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            animation: 'splashBounce 1s cubic-bezier(0.28, 0.84, 0.42, 1) forwards',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 16
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 90,
                                    height: 90,
                                    background: 'white',
                                    borderRadius: 20,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                                    overflow: 'hidden'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/logo.png",
                                    alt: "Edibio Logo",
                                    width: 70,
                                    height: 70,
                                    style: {
                                        objectFit: 'contain'
                                    },
                                    priority: true
                                }, void 0, false, {
                                    fileName: "[project]/components/SplashScreen.tsx",
                                    lineNumber: 80,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/SplashScreen.tsx",
                                lineNumber: 70,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        style: {
                                            color: '#1A1A2E',
                                            fontSize: 32,
                                            fontWeight: 900,
                                            margin: 0,
                                            letterSpacing: '-1px'
                                        },
                                        children: "Edibio"
                                    }, void 0, false, {
                                        fileName: "[project]/components/SplashScreen.tsx",
                                        lineNumber: 84,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            color: '#718096',
                                            fontSize: 13,
                                            marginTop: 2,
                                            fontWeight: 700,
                                            letterSpacing: '1px',
                                            textTransform: 'uppercase'
                                        },
                                        children: "ERP Suite"
                                    }, void 0, false, {
                                        fileName: "[project]/components/SplashScreen.tsx",
                                        lineNumber: 91,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/SplashScreen.tsx",
                                lineNumber: 83,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: 24,
                                    display: 'flex',
                                    gap: 8
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "google-dot",
                                        style: {
                                            backgroundColor: '#4285F4',
                                            animationDelay: '0s'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/SplashScreen.tsx",
                                        lineNumber: 104,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "google-dot",
                                        style: {
                                            backgroundColor: '#EA4335',
                                            animationDelay: '0.15s'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/SplashScreen.tsx",
                                        lineNumber: 105,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "google-dot",
                                        style: {
                                            backgroundColor: '#FBBC05',
                                            animationDelay: '0.3s'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/SplashScreen.tsx",
                                        lineNumber: 106,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "google-dot",
                                        style: {
                                            backgroundColor: '#34A853',
                                            animationDelay: '0.45s'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/SplashScreen.tsx",
                                        lineNumber: 107,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/SplashScreen.tsx",
                                lineNumber: 103,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/SplashScreen.tsx",
                        lineNumber: 63,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                        children: `
                    @keyframes splashBounce {
                        0% { transform: scale(0.8) translateY(20px); opacity: 0; }
                        50% { transform: scale(1.05) translateY(-5px); opacity: 1; }
                        100% { transform: scale(1) translateY(0); opacity: 1; }
                    }
                    .google-dot {
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        animation: googleDotBounce 1.2s infinite cubic-bezier(0.4, 0, 0.2, 1);
                    }
                    @keyframes googleDotBounce {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-10px); }
                    }
                `
                    }, void 0, false, {
                        fileName: "[project]/components/SplashScreen.tsx",
                        lineNumber: 111,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/SplashScreen.tsx",
                lineNumber: 50,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/components/SystemNotifications.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SystemNotifications,
    "sendSystemNotification",
    ()=>sendSystemNotification
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function sendSystemNotification(title, options = {}) {
    if (!('Notification' in window)) return;
    if (Notification.permission === 'granted') {
        try {
            new Notification(title, {
                icon: '/logo.png',
                badge: '/logo.png',
                ...options
            });
        } catch (e) {
            // Android Chrome blocks the Notification constructor when installed as PWA
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.ready.then((registration)=>{
                    registration.showNotification(title, {
                        icon: '/logo.png',
                        badge: '/logo.png',
                        ...options
                    }).catch(console.error);
                }).catch(console.error);
            }
        }
    }
}
function SystemNotifications() {
    const { user, companies } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])();
    const hasRequestedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const notificationsSentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({});
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Only ask if downloaded as app (standalone) or manually requested later.
        // Doing it right away on mobile downloaded apps requires a smart PWA approach.
        // Let's ask once if the app is standalone (PWA/Android).
        const isStandalone = ("TURBOPACK compile-time value", "undefined") !== 'undefined' && (window.matchMedia('(display-mode: standalone)').matches || 'standalone' in navigator && navigator.standalone);
        if (isStandalone && !hasRequestedRef.current && 'Notification' in window && Notification.permission === 'default') //TURBOPACK unreachable
        ;
    }, []);
    // Effect to check conditions and trigger notifications
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!user || !('Notification' in window) || Notification.permission !== 'granted') return;
        // 1. FREE TRIAL ENDING
        if (user.trialExpiresAt) {
            const expiresDate = new Date(user.trialExpiresAt);
            const now = new Date();
            const daysLeft = Math.ceil((expiresDate.getTime() - now.getTime()) / (1000 * 3600 * 24));
            if (daysLeft <= 3 && daysLeft > 0) {
                const notifKey = `trial_${daysLeft}`;
                if (!notificationsSentRef.current[notifKey]) {
                    sendSystemNotification(`Free Trial Ending Soon`, {
                        body: `Your Edibio free trial ends in ${daysLeft} day(s). Upgrade to keep using all features.`
                    });
                    notificationsSentRef.current[notifKey] = true;
                }
            } else if (daysLeft <= 0) {
                const notifKey = 'trial_expired';
                if (!notificationsSentRef.current[notifKey]) {
                    sendSystemNotification(`Trial Expired`, {
                        body: `Your Edibio free trial has expired. Subscribe to unlock access.`
                    });
                    notificationsSentRef.current[notifKey] = true;
                }
            }
        }
        // 2. BILLING INTIMATION (Example: High balance amount due for customers, etc.)
        // This is a broad case, but we can set up periodic checks or listen for unread notifications from a DB eventually.
        // For now, if there's a company with a pending subscription renewal...
        if (user.role === 'owner') {
            companies.forEach((company)=>{
                const co = company;
                if (co.subscriptionEndsAt) {
                    const subEnds = new Date(co.subscriptionEndsAt);
                    const now = new Date();
                    const daysLeft = Math.ceil((subEnds.getTime() - now.getTime()) / (1000 * 3600 * 24));
                    if (daysLeft === 1) {
                        const notifKey = `sub_${company.id}_${daysLeft}`;
                        if (!notificationsSentRef.current[notifKey]) {
                            sendSystemNotification(`Subscription Renewing Tomorrow`, {
                                body: `Your subscription for ${company.name} is renewing tomorrow.`
                            });
                            notificationsSentRef.current[notifKey] = true;
                        }
                    }
                }
            });
        }
    }, [
        user,
        companies
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {}, void 0, false); // Purely logical component
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a224d1e1._.js.map