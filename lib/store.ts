import { useMemo } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type {
    EdibioUser, Company, Party, Product, Invoice, Expense,
    InvoiceTemplate, HsnCode, Godown, AgencyClient, AgencyProject, AuditLog, BalancePayment
} from './types';
import { get, set as idbSet, del } from 'idb-keyval';
import toast from 'react-hot-toast';

const idbStorage = {
    getItem: async (name: string): Promise<string | null> => {
        return (await get(name)) || null;
    },
    setItem: async (name: string, value: string): Promise<void> => {
        await idbSet(name, value);
    },
    removeItem: async (name: string): Promise<void> => {
        await del(name);
    },
};

const syncAfter = (getState: () => any) => {
    // No-op: CloudSync component handles this via store subscription
};

const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

// ── Default templates ─────────────────────────────────────────────────────────
const DEFAULT_TEMPLATES: InvoiceTemplate[] = [
    {
        id: 'classic', name: 'Classic', layout: 'classic', paperSize: 'A4',
        headerBg: '#1A1A2E', headerText: '#FFFFFF', accentColor: '#4285F4',
        tableHeaderBg: '#F8F9FA', tableHeaderText: '#2D3748', bodyBg: '#FFFFFF', bodyText: '#1A1A2E',
        fontFamily: 'Inter', fontSize: 12,
        showLogo: true, showGstNumber: true, showHsn: true, showTaxBreakdown: true,
        showSignature: true, showTerms: true, showAmountInWords: true, showQrCode: false,
        showBalanceDue: true, showPaymentHistory: true, logoAlign: 'left', amountAlign: 'right',
    },
    {
        id: 'modern', name: 'Modern', layout: 'modern', paperSize: 'A4',
        headerBg: '#4285F4', headerText: '#FFFFFF', accentColor: '#34A853',
        tableHeaderBg: '#E8F0FE', tableHeaderText: '#1967D2', bodyBg: '#FAFAFA', bodyText: '#1A1A2E',
        fontFamily: 'Inter', fontSize: 12,
        showLogo: true, showGstNumber: true, showHsn: true, showTaxBreakdown: true,
        showSignature: false, showTerms: true, showAmountInWords: true, showQrCode: true,
        showBalanceDue: true, showPaymentHistory: false, logoAlign: 'center', amountAlign: 'right',
    },
    {
        id: 'minimal', name: 'Minimal', layout: 'minimal', paperSize: 'A4',
        headerBg: '#FFFFFF', headerText: '#1A1A2E', accentColor: '#1A1A2E',
        tableHeaderBg: '#FFFFFF', tableHeaderText: '#4A5568', bodyBg: '#FFFFFF', bodyText: '#1A1A2E',
        fontFamily: 'Inter', fontSize: 11,
        showLogo: true, showGstNumber: true, showHsn: false, showTaxBreakdown: false,
        showSignature: false, showTerms: false, showAmountInWords: false, showQrCode: false,
        showBalanceDue: true, showPaymentHistory: false, logoAlign: 'right', amountAlign: 'right',
    },
    {
        id: 'thermal', name: 'Thermal Receipt', layout: 'minimal', paperSize: 'thermal_80',
        headerBg: '#FFFFFF', headerText: '#000000', accentColor: '#000000',
        tableHeaderBg: '#FFFFFF', tableHeaderText: '#000000', bodyBg: '#FFFFFF', bodyText: '#000000',
        fontFamily: 'monospace', fontSize: 10,
        showLogo: true, showGstNumber: true, showHsn: false, showTaxBreakdown: true,
        showSignature: false, showTerms: false, showAmountInWords: true, showQrCode: false,
        showBalanceDue: true, showPaymentHistory: false, logoAlign: 'center', amountAlign: 'right',
        footerText: 'Thank you! Visit Again.',
    },
    {
        id: 'elegant', name: 'Elegant Dark', layout: 'classic', paperSize: 'A4',
        headerBg: '#111827', headerText: '#F3F4F6', accentColor: '#111827',
        tableHeaderBg: '#1F2937', tableHeaderText: '#FFFFFF', bodyBg: '#FFFFFF', bodyText: '#1F2937',
        fontFamily: 'Outfit', fontSize: 12,
        showLogo: true, showGstNumber: true, showHsn: true, showTaxBreakdown: true,
        showSignature: true, showTerms: true, showAmountInWords: true, showQrCode: true,
        showBalanceDue: true, showPaymentHistory: true, logoAlign: 'left', amountAlign: 'right',
    },
    {
        id: 'vibrant', name: 'Vibrant Blue', layout: 'modern', paperSize: 'A4',
        headerBg: '#EFF6FF', headerText: '#1E40AF', accentColor: '#3B82F6',
        tableHeaderBg: '#DBEAFE', tableHeaderText: '#1E40AF', bodyBg: '#FFFFFF', bodyText: '#1E3A8A',
        fontFamily: 'Inter', fontSize: 12,
        showLogo: true, showGstNumber: true, showHsn: true, showTaxBreakdown: true,
        showSignature: false, showTerms: true, showAmountInWords: true, showQrCode: true,
        showBalanceDue: true, showPaymentHistory: false, logoAlign: 'center', amountAlign: 'right',
    },
    {
        id: 'retro', name: 'Retro Typewriter', layout: 'minimal', paperSize: 'A4',
        headerBg: '#FFFFFF', headerText: '#000000', accentColor: '#000000',
        tableHeaderBg: '#FFFFFF', tableHeaderText: '#000000', bodyBg: '#FDFCF0', bodyText: '#000000',
        fontFamily: 'Courier Prime', fontSize: 11,
        showLogo: false, showGstNumber: true, showHsn: false, showTaxBreakdown: false,
        showSignature: true, showTerms: true, showAmountInWords: false, showQrCode: false,
        showBalanceDue: true, showPaymentHistory: false, logoAlign: 'left', amountAlign: 'right',
    },
    {
        id: 'quick_bill', name: 'Quick Bill (Compact)', layout: 'classic', paperSize: 'A4',
        headerBg: '#FFFFFF', headerText: '#000000', accentColor: '#000000',
        tableHeaderBg: '#F8F9FA', tableHeaderText: '#000000', bodyBg: '#FFFFFF', bodyText: '#000000',
        fontFamily: 'Arial', fontSize: 11,
        showLogo: false, showGstNumber: true, showHsn: true, showTaxBreakdown: false,
        showSignature: true, showTerms: true, showAmountInWords: true, showQrCode: false,
        showBalanceDue: true, showPaymentHistory: false, logoAlign: 'center', amountAlign: 'right',
    },
    {
        id: 'bold_orange', name: 'Bold Retail', layout: 'modern', paperSize: 'A4',
        headerBg: '#DD6B20', headerText: '#FFFFFF', accentColor: '#DD6B20',
        tableHeaderBg: '#FBD38D', tableHeaderText: '#9C4221', bodyBg: '#FFFAFA', bodyText: '#1A202C',
        fontFamily: 'Inter', fontSize: 12,
        showLogo: true, showGstNumber: true, showHsn: true, showTaxBreakdown: true,
        showSignature: true, showTerms: true, showAmountInWords: true, showQrCode: true,
        showBalanceDue: true, showPaymentHistory: true, logoAlign: 'left', amountAlign: 'right',
    },
    {
        id: 'waves', name: 'Waves Playful', layout: 'modern', paperSize: 'A4',
        headerBg: '#FF6B6B', headerText: '#FFFFFF', accentColor: '#FF8E53',
        tableHeaderBg: '#FFF5F5', tableHeaderText: '#E53E3E', bodyBg: '#FAFAFA', bodyText: '#1A202C',
        fontFamily: 'Inter', fontSize: 12,
        showLogo: true, showGstNumber: true, showHsn: true, showTaxBreakdown: true,
        showSignature: false, showTerms: true, showAmountInWords: true, showQrCode: true,
        showBalanceDue: true, showPaymentHistory: false, logoAlign: 'left', amountAlign: 'right',
    },
    {
        id: 'creative', name: 'Creative Portfolio', layout: 'modern', paperSize: 'A4',
        headerBg: '#1A202C', headerText: '#FFFFFF', accentColor: '#4A5568',
        tableHeaderBg: '#F7FAFC', tableHeaderText: '#4A5568', bodyBg: '#F8FAFC', bodyText: '#1A202C',
        fontFamily: 'Inter', fontSize: 13,
        showLogo: true, showGstNumber: true, showHsn: true, showTaxBreakdown: true,
        showSignature: false, showTerms: true, showAmountInWords: true, showQrCode: true,
        showBalanceDue: true, showPaymentHistory: true, logoAlign: 'right', amountAlign: 'right',
    },
    {
        id: 'luxe_gold', name: 'Luxe Gold (Premium)', layout: 'modern', paperSize: 'A4',
        headerBg: '#0F172A', headerText: '#FDE047', accentColor: '#CA8A04',
        tableHeaderBg: '#1E293B', tableHeaderText: '#FDE047', bodyBg: '#0F172A', bodyText: '#F1F5F9',
        fontFamily: 'Inter', fontSize: 12,
        showLogo: true, showGstNumber: true, showHsn: true, showTaxBreakdown: true,
        showSignature: false, showTerms: true, showAmountInWords: true, showQrCode: true,
        showBalanceDue: true, showPaymentHistory: true, logoAlign: 'left', amountAlign: 'right',
    },
];

// ── Store shape ───────────────────────────────────────────────────────────────
interface EdibioState {
    // Auth
    user: EdibioUser | null;
    isAuthenticated: boolean;
    setUser: (u: EdibioUser | null) => void;
    updateUser: (upd: Partial<EdibioUser>) => void;
    logout: () => void;
    lastModified: number;
    bump: () => void;

    // Sync state
    isHydrating: boolean;
    setIsHydrating: (b: boolean) => void;
    syncStatus: 'idle' | 'syncing' | 'saved' | 'error' | 'offline';
    lastSyncedAt: number | null;
    syncError: string | null;
    setSyncStatus: (s: 'idle' | 'syncing' | 'saved' | 'error' | 'offline') => void;
    setLastSyncedAt: (t: number | null) => void;
    setSyncError: (e: string | null) => void;

    // AI
    aiApiKey: string | null;
    aiUsageCount: number;
    setAiApiKey: (key: string | null) => void;

    // Plan limits
    primarySwapCount: number;
    setPrimarySwapCount: (c: number) => void;

    // Active company
    activeCompanyId: string | null;
    setActiveCompany: (id: string | null) => void;

    // Companies (max 3)
    companies: Company[];
    addCompany: (c: Omit<Company, 'id' | 'createdAt' | 'godowns' | 'invoiceCounter'>) => Company;
    updateCompany: (id: string, upd: Partial<Company>) => void;
    deleteCompany: (id: string) => void;

    // Godowns helpers (max 2 per company)
    addGodown: (companyId: string, g: Omit<Godown, 'id'>) => void;
    removeGodown: (companyId: string, godownId: string) => void;

    // Parties
    parties: Party[];
    addParty: (p: Omit<Party, 'id'>) => Party;
    updateParty: (id: string, upd: Partial<Party>) => void;
    deleteParty: (id: string) => void;
    addBalancePayment: (partyId: string, payment: Omit<BalancePayment, 'id' | 'balanceBefore' | 'balanceAfter' | 'recordedAt'>) => void;
    deleteBalancePayment: (partyId: string, paymentId: string) => void;

    // Products
    products: Product[];
    addProduct: (p: Omit<Product, 'id'>) => Product;
    importProductsBulk: (products: Omit<Product, 'id'>[]) => void;
    updateProduct: (id: string, upd: Partial<Product>) => void;
    deleteProduct: (id: string) => void;
    adjustStock: (id: string, delta: number, godownId?: string) => void;

    // Invoices
    invoices: Invoice[];
    addInvoice: (inv: Invoice) => void;
    updateInvoice: (id: string, upd: Partial<Invoice>) => void;
    deleteInvoice: (id: string) => void;
    nextInvoiceNumber: (companyId: string, prefixOverride?: string) => string;

    // Expenses
    expenses: Expense[];
    addExpense: (e: Omit<Expense, 'id' | 'createdAt'>) => void;
    deleteExpense: (id: string) => void;

    // Agency CRM (Clients)
    agencyClients: AgencyClient[];
    addAgencyClient: (c: Omit<AgencyClient, 'id' | 'createdAt'>) => AgencyClient;
    updateAgencyClient: (id: string, upd: Partial<AgencyClient>) => void;
    deleteAgencyClient: (id: string) => void;

    // Agency Projects
    agencyProjects: AgencyProject[];
    addAgencyProject: (p: Omit<AgencyProject, 'id' | 'createdAt'>) => AgencyProject;
    updateAgencyProject: (id: string, upd: Partial<AgencyProject>) => void;
    deleteAgencyProject: (id: string) => void;


    // Templates
    templates: InvoiceTemplate[];
    addTemplate: (t: Omit<InvoiceTemplate, 'id'>) => void;
    updateTemplate: (id: string, upd: Partial<InvoiceTemplate>) => void;
    deleteTemplate: (id: string) => void;

    // HSN cache
    hsnCache: HsnCode[];
    addToHsnCache: (h: HsnCode) => void;

    assignProductsToParty: (partyId: string, productIds: string[]) => void;

    // Demo mode
    isDemo: boolean;
    demoExpiresAt: string | null;
    startDemo: () => void;
    clearDemo: () => void;

    // Reset
    resetAll: () => void;
    exportBackup: () => void;
    importBackup: (json: string) => void;

    // Enterprise Audit
    addAuditLog: (log: Omit<AuditLog, 'id' | 'timestamp'>) => void;
}

// ── getters convenience ───────────────────────────────────────────────────────
export const useActiveCompany = () => {
    const { companies, activeCompanyId } = useStore();
    return companies.find(c => c.id === activeCompanyId) ?? null;
};
export const useCompanyData = (
    type: 'parties' | 'products' | 'invoices' | 'expenses' | 'agencyClients' | 'agencyProjects'
) => {
    const { [type]: items, activeCompanyId } = useStore() as any;
    return useMemo(() => (items as any[] || []).filter((i: any) => i.companyId === activeCompanyId), [items, activeCompanyId]);
};

export const useUserCompanies = () => {
    const { companies, user } = useStore();
    return useMemo(() => companies.filter(c => {
        if (!c.userId) return true; // legacy or demo
        if (c.userId === user?.uid && !user?.role) return true; // owner

        // Check team access
        if (c.team && user) {
            return c.team.some(t => {
                const target = t.contact.toLowerCase().trim();
                return (user.email && user.email.toLowerCase().trim() === target) ||
                    (user.phone && user.phone.trim() === target);
            });
        }
        return false;
    }), [companies, user]);
};

// ── Store ─────────────────────────────────────────────────────────────────────
export const useStore = create<EdibioState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isHydrating: true,
            setIsHydrating: (b) => set({ isHydrating: b }),
            syncStatus: 'idle',
            lastSyncedAt: null,
            syncError: null,
            setSyncStatus: (s) => set({ syncStatus: s }),
            setLastSyncedAt: (t) => set({ lastSyncedAt: t }),
            setSyncError: (e) => set({ syncError: e }),
            setUser: (u) => {
                if (u && !u.trialExpiresAt) {
                    const createdAt = new Date(u.createdAt || Date.now());
                    const expires = new Date(createdAt);
                    expires.setDate(expires.getDate() + 3);
                    u.trialExpiresAt = expires.toISOString();
                    u.trialClaimed = false;
                }
                set({ user: u, isAuthenticated: !!u, lastModified: Date.now() });
            },
            updateUser: (upd) => set(s => ({ user: s.user ? { ...s.user, ...upd } : null, lastModified: Date.now() })),
            logout: () => set({ 
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
            bump: () => set({ lastModified: Date.now() }),

            aiApiKey: null,
            aiUsageCount: 0,
            setAiApiKey: (key) => set({ aiApiKey: key, lastModified: Date.now() }),
            activeCompanyId: null,

            primarySwapCount: 0,
            setPrimarySwapCount: (c) => set({ primarySwapCount: c, lastModified: Date.now() }),

            isDemo: false,
            demoExpiresAt: null,

            startDemo: () => {
                const demoId = 'demo_user_123';
                const demoExpiry = new Date();
                demoExpiry.setHours(demoExpiry.getHours() + 1);

                const demoUser: EdibioUser = {
                    uid: demoId,
                    email: 'demo@edibio.app',
                    name: 'Demo Manager',
                    createdAt: new Date().toISOString(),
                };

                // Check for existing demo company
                const s = get();
                let demoCompany = s.companies.find(c => c.name === 'Edibio Store');

                if (!demoCompany) {
                    const co: Company = {
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

                    const demoProducts: Product[] = [
                        { id: uid(), companyId: co.id, name: 'Amul Milk 1L', category: 'Dairy', unit: 'packet', purchasePrice: 60, sellingPrice: 66, mrp: 66, stockQty: 100, lowStockAlertQty: 10, gstRate: 0, taxIncluded: true },
                        { id: uid(), companyId: co.id, name: 'Parle-G 800g', category: 'Biscuits', unit: 'pack', purchasePrice: 70, sellingPrice: 80, mrp: 80, stockQty: 50, lowStockAlertQty: 5, gstRate: 5, taxIncluded: true },
                        { id: uid(), companyId: co.id, name: 'Basmati Rice 5kg', category: 'Grains', unit: 'bag', purchasePrice: 450, sellingPrice: 550, mrp: 600, stockQty: 20, lowStockAlertQty: 2, gstRate: 5, taxIncluded: true },
                        { id: uid(), companyId: co.id, name: 'Dettol Soap 125g', category: 'Personal Care', unit: 'pcs', purchasePrice: 35, sellingPrice: 42, mrp: 45, stockQty: 40, lowStockAlertQty: 10, gstRate: 18, taxIncluded: true },
                    ];

                    const demoParties: Party[] = [
                        { id: uid(), companyId: co.id, type: 'customer', name: 'Rahul Sharma', phone: '9820012345', address: 'Bandra West', balance: 500, openingBalance: 0 },
                        { id: uid(), companyId: co.id, type: 'customer', name: 'Anita Patel', phone: '9123456789', address: 'Andheri East', balance: 0, openingBalance: 0 },
                        { id: uid(), companyId: co.id, type: 'supplier', name: 'Metro Wholesalers', phone: '022-2445566', address: 'Navi Mumbai', balance: -5000, openingBalance: 0 },
                    ];

                    const demoInvoices: Invoice[] = [];
                    const now = new Date();
                    for (let i = 0; i < 5; i++) {
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
                                { name: 'Demo Item', qty: i + 1, unit: 'pcs', rate: 100, discount: 0, discountAmt: 0, taxableAmt: 100 * (i + 1), gstRate: 18, cgst: 9, sgst: 9, igst: 0, cess: 0, totalGst: 18, amount: 118 * (i + 1) }
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
                            updatedAt: date.toISOString(),
                        });
                    }

                    demoCompany = co;
                    set(state => ({
                        companies: [...state.companies, co],
                        products: [...state.products, ...demoProducts],
                        parties: [...state.parties, ...demoParties],
                        invoices: [...state.invoices, ...demoInvoices],
                    }));
                }

                set({
                    user: demoUser,
                    isAuthenticated: true,
                    activeCompanyId: demoCompany.id,
                    isDemo: true,
                    demoExpiresAt: demoExpiry.toISOString(),
                });
            },

            clearDemo: () => set({ isDemo: false, demoExpiresAt: null }),

            setActiveCompany: (id) => set({ activeCompanyId: id }),

            companies: [],
            addCompany: (c) => {
                const userId = get().user?.uid;
                const co: Company = {
                    ...c as any,
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
                set(s => ({ companies: [...s.companies, co], lastModified: Date.now() }));
                syncAfter(get);
                return co;
            },
            updateCompany: (id, upd) =>
                set(s => ({ companies: s.companies.map(c => c.id === id ? { ...c, ...upd } : c), lastModified: Date.now() })),
            deleteCompany: (id) =>
                set(s => ({
                    companies: s.companies.filter(c => c.id !== id),
                    activeCompanyId: s.activeCompanyId === id ? null : s.activeCompanyId,
                    lastModified: Date.now()
                })),

            addGodown: (companyId, g) =>
                set(s => ({
                    companies: s.companies.map(c => {
                        if (c.id !== companyId) return c;
                        if (c.godowns.length >= 2) return c; // max 2
                        return { ...c, godowns: [...c.godowns, { ...g, id: uid() }] };
                    }),
                    lastModified: Date.now()
                })),
            removeGodown: (companyId, godownId) =>
                set(s => ({
                    companies: s.companies.map(c => c.id !== companyId ? c : {
                        ...c, godowns: c.godowns.filter(g => g.id !== godownId),
                    }),
                    lastModified: Date.now()
                })),

            parties: [],
            addParty: (p) => {
                const party = { ...p, id: uid(), createdAt: new Date().toISOString() };
                set(s => ({ parties: [party, ...s.parties], lastModified: Date.now() }));
                syncAfter(get);
                return party;
            },
            updateParty: (id, upd) =>
                set(s => ({ parties: s.parties.map(p => p.id === id ? { ...p, ...upd } : p), lastModified: Date.now() })),
            deleteParty: (id) =>
                set(s => ({ parties: s.parties.filter(p => p.id !== id), lastModified: Date.now() })),

            addBalancePayment: (partyId, payment) =>
                set(s => ({
                    parties: s.parties.map(p => {
                        if (p.id !== partyId) return p;
                        const balanceBefore = p.balance;
                        const balanceAfter = payment.type === 'received'
                            ? balanceBefore - payment.amount
                            : balanceBefore + payment.amount;
                        const entry: BalancePayment = {
                            ...payment,
                            id: uid(),
                            balanceBefore,
                            balanceAfter,
                            recordedAt: new Date().toISOString(),
                        };
                        return {
                            ...p,
                            balance: balanceAfter,
                            paymentHistory: [entry, ...(p.paymentHistory || [])],
                        };
                    }),
                    lastModified: Date.now()
                })),

            deleteBalancePayment: (partyId, paymentId) =>
                set(s => ({
                    parties: s.parties.map(p => {
                        if (p.id !== partyId) return p;
                        const entry = (p.paymentHistory || []).find(h => h.id === paymentId);
                        if (!entry) return p;
                        // Reverse the balance change
                        const revertedBalance = entry.type === 'received'
                            ? p.balance + entry.amount
                            : p.balance - entry.amount;
                        return {
                            ...p,
                            balance: revertedBalance,
                            paymentHistory: (p.paymentHistory || []).filter(h => h.id !== paymentId),
                        };
                    }),
                    lastModified: Date.now()
                })),

            products: [],
            addProduct: (p) => {
                const prod = { ...p, id: uid(), createdAt: new Date().toISOString() };
                set(s => ({ products: [prod, ...s.products], lastModified: Date.now() }));
                syncAfter(get);
                return prod;
            },
            importProductsBulk: (prods) => {
                const newProds = prods.map(p => ({ ...p as any, id: uid(), createdAt: new Date().toISOString() }));
                set(s => ({ products: [...newProds, ...s.products], lastModified: Date.now() }));
                syncAfter(get);
            },
            updateProduct: (id, upd) =>
                set(s => ({ products: s.products.map(p => p.id === id ? { ...p, ...upd } : p), lastModified: Date.now() })),
            deleteProduct: (id) =>
                set(s => ({ products: s.products.filter(p => p.id !== id), lastModified: Date.now() })),
            adjustStock: (id, delta) =>
                set(s => ({
                    products: s.products.map(p =>
                        p.id === id ? { ...p, stockQty: Math.max(0, p.stockQty + delta) } : p
                    ),
                    lastModified: Date.now()
                })),

            assignProductsToParty: (partyId, productIds) =>
                set(s => ({
                    parties: s.parties.map(p => {
                        if (p.id !== partyId) return p;
                        const existing = p.assignedProductIds || [];
                        const merged = Array.from(new Set([...existing, ...productIds]));
                        return { ...p, assignedProductIds: merged };
                    }),
                    lastModified: Date.now()
                })),

            invoices: [],
            addInvoice: (inv) => {
                set(s => ({
                    invoices: [inv, ...s.invoices],
                    companies: s.companies.map(c =>
                        c.id === inv.companyId ? { ...c, invoiceCounter: c.invoiceCounter + 1 } : c
                    ),
                    lastModified: Date.now()
                }));
                syncAfter(get);

                // Auto-link products to supplier if purchase
                if (inv.invoiceType === 'purchase' && inv.partyId) {
                    const productIds = inv.items.map(i => i.productId).filter(Boolean) as string[];
                    if (productIds.length > 0) {
                        get().assignProductsToParty(inv.partyId, productIds);
                    }
                }
            },
            updateInvoice: (id, upd) =>
                set(s => ({ invoices: s.invoices.map(i => i.id === id ? { ...i, ...upd } : i), lastModified: Date.now() })),
            deleteInvoice: (id) => {
                const inv = get().invoices.find(i => i.id === id);
                if (inv) {
                    // Revert stock changes
                    inv.items.forEach((item: any) => {
                        if (item.productId) {
                            let delta = 0;
                            if (['sale', 'purchase_return', 'debit_note'].includes(inv.invoiceType)) {
                                delta = item.qty;
                            } else if (['purchase', 'sale_return', 'credit_note'].includes(inv.invoiceType)) {
                                delta = -item.qty;
                            }
                            if (delta !== 0) {
                                get().adjustStock(item.productId, delta);
                            }
                        }
                    });
                }
                set(s => ({ invoices: s.invoices.filter(i => i.id !== id), lastModified: Date.now() }));
                syncAfter(get);
            },
            nextInvoiceNumber: (companyId, prefixOverride = 'MN') => {
                const co = get().companies.find(c => c.id === companyId);
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
            addExpense: (e) =>
                set(s => ({ expenses: [{ ...e, id: uid(), createdAt: new Date().toISOString() }, ...s.expenses], lastModified: Date.now() })),
            deleteExpense: (id) =>
                set(s => ({ expenses: s.expenses.filter(x => x.id !== id), lastModified: Date.now() })),

            agencyClients: [],
            addAgencyClient: (c) => {
                const ac = { ...c, id: uid(), createdAt: new Date().toISOString() };
                set(s => ({ agencyClients: [ac, ...s.agencyClients], lastModified: Date.now() }));
                return ac;
            },
            updateAgencyClient: (id, upd) =>
                set(s => ({ agencyClients: s.agencyClients.map(c => c.id === id ? { ...c, ...upd } : c), lastModified: Date.now() })),
            deleteAgencyClient: (id) =>
                set(s => ({ agencyClients: s.agencyClients.filter(c => c.id !== id), lastModified: Date.now() })),

            agencyProjects: [],
            addAgencyProject: (p) => {
                const proj = { ...p, id: uid(), createdAt: new Date().toISOString() };
                set(s => ({ agencyProjects: [proj, ...s.agencyProjects], lastModified: Date.now() }));
                return proj;
            },
            updateAgencyProject: (id, upd) =>
                set(s => ({ agencyProjects: s.agencyProjects.map(p => p.id === id ? { ...p, ...upd } : p), lastModified: Date.now() })),
            deleteAgencyProject: (id) =>
                set(s => ({ agencyProjects: s.agencyProjects.filter(p => p.id !== id), lastModified: Date.now() })),


            templates: DEFAULT_TEMPLATES,
            addTemplate: (t) =>
                set(s => ({ templates: [...s.templates, { ...t, id: uid() }], lastModified: Date.now() })),
            updateTemplate: (id, upd) =>
                set(s => ({ templates: s.templates.map(t => t.id === id ? { ...t, ...upd } : t), lastModified: Date.now() })),
            deleteTemplate: (id) =>
                set(s => ({ templates: s.templates.filter(t => t.id !== id), lastModified: Date.now() })),

            hsnCache: [],
            addToHsnCache: (h) =>
                set(s => ({
                    hsnCache: [h, ...s.hsnCache.filter(x => x.code !== h.code)].slice(0, 200),
                })),

            resetAll: () =>
                set({
                    companies: [], parties: [], products: [], invoices: [], expenses: [],
                    agencyClients: [], agencyProjects: [], hsnCache: [], templates: DEFAULT_TEMPLATES,
                    user: null, isAuthenticated: false, activeCompanyId: null, isHydrating: true, primarySwapCount: 0, aiApiKey: null, aiUsageCount: 0,
                    lastSyncedAt: null, syncStatus: 'idle', syncError: null,
                    lastModified: Date.now(),
                    isDemo: false, demoExpiresAt: null,
                }),

            exportBackup: () => {
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
                    aiApiKey: s.aiApiKey,
                };
                const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `edibio_backup_${new Date().toISOString().slice(0, 10)}.json`;
                a.click();
                URL.revokeObjectURL(url);
            },

            importBackup: (json: string) => {
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
                        aiApiKey: data.aiApiKey || null,
                    });
                    syncAfter(get);
                    toast.success('Backup imported successfully!');
                } catch (e: any) {
                    toast.error('Import failed: ' + e.message);
                }
            },

            addAuditLog: (log) => {
                const { activeCompanyId, user } = get();
                if (!activeCompanyId || !user) return;
                const newLog = {
                    ...log,
                    id: uid(),
                    timestamp: new Date().toISOString(),
                };
                set(s => ({
                    companies: s.companies.map(c =>
                        c.id === activeCompanyId
                            ? { ...c, auditLogs: [newLog, ...(c.auditLogs || [])] }
                            : c
                    ),
                    lastModified: Date.now()
                }));
                syncAfter(get);
            },
        }),
        {
            name: 'edibio-store',
            version: 1,
            storage: typeof window !== 'undefined' ? createJSONStorage(() => idbStorage) : undefined,
        }
    )
);
