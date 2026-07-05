module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

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
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/mongodb.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
let cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose;
if (!cached) {
    cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose = {
        conn: null,
        promise: null
    };
}
async function dbConnect() {
    const MONGODB_URI = process.env.MONGODB_URI?.trim();
    if (!MONGODB_URI) {
        throw new Error('Please define the MONGODB_URI environment variable inside .env.local or Vercel dashboard');
    }
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        };
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].connect(MONGODB_URI, opts).then((mongoose)=>{
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    return cached.conn;
}
const __TURBOPACK__default__export__ = dbConnect;
}),
"[project]/lib/models.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AgencyClientData",
    ()=>AgencyClientData,
    "AgencyProjectData",
    ()=>AgencyProjectData,
    "CompanyData",
    ()=>CompanyData,
    "ExpenseData",
    ()=>ExpenseData,
    "InvoiceData",
    ()=>InvoiceData,
    "InvoiceTemplateData",
    ()=>InvoiceTemplateData,
    "PartyData",
    ()=>PartyData,
    "ProductData",
    ()=>ProductData,
    "PurchaseOrderData",
    ()=>PurchaseOrderData,
    "StockTransferData",
    ()=>StockTransferData,
    "UserData",
    ()=>UserData
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
// ── USER ─────────────────────────────────────────────────────────────
const UserSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    _id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true
    },
    name: {
        type: String
    },
    phone: {
        type: String
    },
    photoUrl: {
        type: String
    },
    createdAt: {
        type: String
    },
    trialExpiresAt: {
        type: String
    },
    trialClaimed: {
        type: Boolean
    },
    subscriptionType: {
        type: String
    },
    subscriptionExpiresAt: {
        type: String
    },
    paymentHistory: {
        type: Array,
        default: []
    },
    role: {
        type: String
    }
}, {
    timestamps: true
});
// ── COMPANY ──────────────────────────────────────────────────────────
const CompanySchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    _id: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        ref: 'User',
        index: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    gstNumber: {
        type: String
    },
    panNumber: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    pincode: {
        type: String
    },
    logoUrl: {
        type: String
    },
    colorAccent: {
        type: String
    },
    godowns: {
        type: Array,
        default: []
    },
    currency: {
        type: String,
        default: 'INR'
    },
    financialYear: {
        type: String
    },
    invoicePrefix: {
        type: String
    },
    invoiceCounter: {
        type: Number,
        default: 1
    },
    templateId: {
        type: String
    },
    templateTheme: {
        type: String
    },
    templateThemeColor: {
        type: String
    },
    quickBillingTheme: {
        type: String
    },
    posTheme: {
        type: String
    },
    templateColumns: {
        type: Object
    },
    quickBillingColumns: {
        type: Object
    },
    loyaltyPointsEnabled: {
        type: Boolean
    },
    loyaltyEarningRatio: {
        type: Number
    },
    loyaltyRedemptionValue: {
        type: Number
    },
    loyaltyMinRedeemPoints: {
        type: Number
    },
    offers: {
        type: Array,
        default: []
    },
    customLabels: {
        type: Object
    },
    invoicePassword: {
        type: String
    },
    showHiddenInvoices: {
        type: Boolean,
        default: false
    },
    whatsappEnabled: {
        type: Boolean
    },
    autoBackupEnabled: {
        type: Boolean
    },
    kitchenDisplayEnabled: {
        type: Boolean,
        default: true
    },
    bankDetails: {
        type: Object
    },
    team: {
        type: Array,
        default: []
    },
    licenseNo: {
        type: String
    },
    auditLogs: {
        type: Array,
        default: []
    },
    franchiseEnabled: {
        type: Boolean,
        default: false
    },
    branches: {
        type: Array,
        default: []
    },
    // Restaurant-specific sync fields
    tableCarts: {
        type: Object,
        default: {}
    },
    dirtyTables: {
        type: Object,
        default: {}
    },
    tableConfig: {
        type: Object,
        default: {}
    },
    customAreas: {
        type: Array,
        default: []
    },
    kitchenOrders: {
        type: Array,
        default: []
    },
    deals: {
        type: Array,
        default: []
    },
    deliveryIntegrations: {
        type: Array,
        default: []
    },
    recentZReports: {
        type: Array,
        default: []
    },
    appOrders: {
        type: Array,
        default: []
    },
    bulkOrders: {
        type: Array,
        default: []
    },
    registerOpen: {
        type: Boolean,
        default: false
    },
    openingFloat: {
        type: Number,
        default: 0
    },
    openingTime: {
        type: String
    },
    createdAt: {
        type: String
    }
}, {
    timestamps: true
});
// ── PARTY ────────────────────────────────────────────────────────────
const PartySchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    _id: {
        type: String,
        required: true
    },
    companyId: {
        type: String,
        ref: 'Company',
        index: true
    },
    type: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    gstNumber: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    openingBalance: {
        type: Number,
        default: 0
    },
    balance: {
        type: Number,
        default: 0
    },
    creditLimit: {
        type: Number
    },
    creditDays: {
        type: Number
    },
    assignedProductIds: {
        type: [
            String
        ],
        default: []
    },
    loyaltyPoints: {
        type: Number,
        default: 0
    },
    loyaltyAdjustments: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});
// ── PRODUCT ──────────────────────────────────────────────────────────
const ProductSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    _id: {
        type: String,
        required: true
    },
    companyId: {
        type: String,
        ref: 'Company',
        index: true
    },
    godownId: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    barcode: {
        type: String
    },
    category: {
        type: String
    },
    brand: {
        type: String
    },
    hsnCode: {
        type: String
    },
    hsnFetched: {
        type: Boolean
    },
    unit: {
        type: String
    },
    purchasePrice: {
        type: Number,
        default: 0
    },
    sellingPrice: {
        type: Number,
        default: 0
    },
    mrp: {
        type: Number
    },
    stockQty: {
        type: Number,
        default: 0
    },
    lowStockAlertQty: {
        type: Number,
        default: 5
    },
    gstRate: {
        type: Number,
        default: 0
    },
    cessRate: {
        type: Number
    },
    taxIncluded: {
        type: Boolean,
        default: false
    },
    description: {
        type: String
    },
    isBulkImported: {
        type: Boolean
    },
    expiryDate: {
        type: String
    },
    stockLogs: {
        type: Array,
        default: []
    },
    batches: {
        type: Array,
        default: []
    },
    branchStock: {
        type: Object,
        default: {}
    },
    branchPrice: {
        type: Object,
        default: {}
    }
}, {
    timestamps: true
});
// ── INVOICE ──────────────────────────────────────────────────────────
const InvoiceSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    _id: {
        type: String,
        required: true
    },
    companyId: {
        type: String,
        ref: 'Company',
        index: true
    },
    invoiceType: {
        type: String,
        required: true
    },
    invoiceNumber: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
        index: true
    },
    time: {
        type: String
    },
    dueDate: {
        type: String
    },
    partyId: {
        type: String
    },
    partyName: {
        type: String
    },
    partyPhone: {
        type: String
    },
    partyGst: {
        type: String
    },
    partyAddress: {
        type: String
    },
    isInterState: {
        type: Boolean
    },
    items: {
        type: Array,
        default: []
    },
    projectId: {
        type: String
    },
    currency: {
        type: String
    },
    exchangeRate: {
        type: Number
    },
    subTotal: {
        type: Number,
        default: 0
    },
    totalDiscount: {
        type: Number,
        default: 0
    },
    taxableAmount: {
        type: Number,
        default: 0
    },
    totalCgst: {
        type: Number,
        default: 0
    },
    totalSgst: {
        type: Number,
        default: 0
    },
    totalIgst: {
        type: Number,
        default: 0
    },
    totalCess: {
        type: Number,
        default: 0
    },
    totalGst: {
        type: Number,
        default: 0
    },
    shippingCharges: {
        type: Number,
        default: 0
    },
    packingCharges: {
        type: Number,
        default: 0
    },
    adjustmentAmount: {
        type: Number,
        default: 0
    },
    roundOff: {
        type: Number,
        default: 0
    },
    grandTotal: {
        type: Number,
        default: 0
    },
    paymentStatus: {
        type: String
    },
    amountPaid: {
        type: Number,
        default: 0
    },
    balanceDue: {
        type: Number,
        default: 0
    },
    payments: {
        type: Array,
        default: []
    },
    paymentMethod: {
        type: String
    },
    splitPayments: {
        type: Array,
        default: []
    },
    servedBy: {
        type: String
    },
    pointsEarned: {
        type: Number
    },
    pointsRedeemed: {
        type: Number
    },
    pointsValueRedeemed: {
        type: Number
    },
    isGstBill: {
        type: Boolean,
        default: false
    },
    isHidden: {
        type: Boolean,
        default: false
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    notes: {
        type: String
    },
    counter: {
        type: String
    },
    termsConditions: {
        type: String
    },
    signature: {
        type: String
    },
    templateId: {
        type: String
    },
    godownId: {
        type: String
    },
    branchId: {
        type: String,
        index: true
    },
    receiptUrl: {
        type: String
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
}, {
    timestamps: true
});
// ── EXPENSE ──────────────────────────────────────────────────────────
const ExpenseSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    _id: {
        type: String,
        required: true
    },
    companyId: {
        type: String,
        ref: 'Company',
        index: true
    },
    category: {
        type: String
    },
    description: {
        type: String
    },
    amount: {
        type: Number,
        default: 0
    },
    gstAmount: {
        type: Number
    },
    date: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String
    },
    partyId: {
        type: String
    },
    projectId: {
        type: String
    },
    branchId: {
        type: String,
        index: true
    },
    receiptUrl: {
        type: String
    },
    createdAt: {
        type: String
    }
}, {
    timestamps: true
});
// ── STOCK TRANSFER ───────────────────────────────────────────────────
const StockTransferSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    _id: {
        type: String,
        required: true
    },
    companyId: {
        type: String,
        ref: 'Company',
        index: true
    },
    fromBranchId: {
        type: String
    },
    toBranchId: {
        type: String
    },
    productId: {
        type: String
    },
    productName: {
        type: String
    },
    qty: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'pending'
    },
    createdAt: {
        type: String
    }
}, {
    timestamps: true
});
// ── AGENCY CLIENT ────────────────────────────────────────────────────
const AgencyClientSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    _id: {
        type: String,
        required: true
    },
    companyId: {
        type: String,
        ref: 'Company',
        index: true
    },
    clientName: {
        type: String,
        required: true
    },
    businessName: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    whatsapp: {
        type: String
    },
    country: {
        type: String
    },
    address: {
        type: String
    },
    gstNumber: {
        type: String
    },
    notes: {
        type: String
    },
    contractValue: {
        type: Number,
        default: 0
    },
    paymentTerms: {
        type: String
    },
    createdAt: {
        type: String
    }
}, {
    timestamps: true
});
// ── AGENCY PROJECT ───────────────────────────────────────────────────
const AgencyProjectSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    _id: {
        type: String,
        required: true
    },
    companyId: {
        type: String,
        ref: 'Company',
        index: true
    },
    clientId: {
        type: String,
        ref: 'AgencyClient',
        index: true
    },
    projectName: {
        type: String,
        required: true
    },
    serviceType: {
        type: String
    },
    billingType: {
        type: String
    },
    projectPrice: {
        type: Number,
        default: 0
    },
    startDate: {
        type: String
    },
    deadline: {
        type: String
    },
    assignedTeamMemberId: {
        type: String
    },
    status: {
        type: String
    },
    milestones: {
        type: Array,
        default: []
    },
    hasRetainer: {
        type: Boolean,
        default: false
    },
    retainerAmount: {
        type: Number,
        default: 0
    },
    retainerFrequency: {
        type: String
    },
    createdAt: {
        type: String
    }
}, {
    timestamps: true
});
// ── INVOICE TEMPLATE ─────────────────────────────────────────────────
const InvoiceTemplateSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    _id: {
        type: String,
        required: true
    },
    companyId: {
        type: String,
        ref: 'Company',
        index: true
    },
    name: {
        type: String,
        required: true
    },
    layout: {
        type: String
    },
    paperSize: {
        type: String
    },
    headerBg: {
        type: String
    },
    headerText: {
        type: String
    },
    accentColor: {
        type: String
    },
    tableHeaderBg: {
        type: String
    },
    tableHeaderText: {
        type: String
    },
    bodyBg: {
        type: String
    },
    bodyText: {
        type: String
    },
    fontFamily: {
        type: String
    },
    fontSize: {
        type: Number
    },
    showLogo: {
        type: Boolean,
        default: true
    },
    showGstNumber: {
        type: Boolean,
        default: true
    },
    showHsn: {
        type: Boolean,
        default: true
    },
    showTaxBreakdown: {
        type: Boolean,
        default: true
    },
    showSignature: {
        type: Boolean,
        default: true
    },
    showTerms: {
        type: Boolean,
        default: true
    },
    showAmountInWords: {
        type: Boolean,
        default: true
    },
    showQrCode: {
        type: Boolean,
        default: true
    },
    showBalanceDue: {
        type: Boolean,
        default: true
    },
    showPaymentHistory: {
        type: Boolean,
        default: true
    },
    headerText2: {
        type: String
    },
    footerText: {
        type: String
    },
    terms: {
        type: String
    },
    logoAlign: {
        type: String
    },
    amountAlign: {
        type: String
    }
}, {
    timestamps: true
});
// ── PURCHASE ORDER ───────────────────────────────────────────────────
const PurchaseOrderSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    _id: {
        type: String,
        required: true
    },
    companyId: {
        type: String,
        ref: 'Company',
        index: true
    },
    poNumber: {
        type: String,
        required: true
    },
    supplierId: {
        type: String
    },
    supplierName: {
        type: String,
        required: true
    },
    supplierPhone: {
        type: String
    },
    items: {
        type: Array,
        default: []
    },
    status: {
        type: String,
        default: 'draft'
    },
    date: {
        type: String,
        required: true
    },
    expectedDate: {
        type: String
    },
    notes: {
        type: String
    },
    grandTotal: {
        type: Number,
        default: 0
    },
    convertedInvoiceId: {
        type: String
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
}, {
    timestamps: true
});
// Clear models cache in development to prevent stale schemas on reload
if ("TURBOPACK compile-time truthy", 1) {
    delete __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.User;
    delete __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.Company;
    delete __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.Party;
    delete __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.Product;
    delete __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.Invoice;
    delete __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.Expense;
    delete __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.StockTransfer;
    delete __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.AgencyClient;
    delete __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.AgencyProject;
    delete __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.InvoiceTemplate;
    delete __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.PurchaseOrder;
}
const UserData = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.User || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model('User', UserSchema);
const CompanyData = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.Company || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model('Company', CompanySchema);
const PartyData = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.Party || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model('Party', PartySchema);
const ProductData = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.Product || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model('Product', ProductSchema);
const InvoiceData = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.Invoice || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model('Invoice', InvoiceSchema);
const ExpenseData = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.Expense || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model('Expense', ExpenseSchema);
const StockTransferData = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.StockTransfer || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model('StockTransfer', StockTransferSchema);
const AgencyClientData = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.AgencyClient || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model('AgencyClient', AgencyClientSchema);
const AgencyProjectData = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.AgencyProject || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model('AgencyProject', AgencyProjectSchema);
const InvoiceTemplateData = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.InvoiceTemplate || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model('InvoiceTemplate', InvoiceTemplateSchema);
const PurchaseOrderData = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.PurchaseOrder || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model('PurchaseOrder', PurchaseOrderSchema);
}),
"[project]/app/api/webhooks/delivery/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mongodb.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/models.ts [app-route] (ecmascript)");
;
;
;
const dynamic = 'force-dynamic';
async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const companyId = searchParams.get('companyId');
        if (!companyId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'companyId is required'
            }, {
                status: 400
            });
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const company = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CompanyData"].findById(companyId).lean();
        if (!company) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Company not found'
            }, {
                status: 404
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            appOrders: company.appOrders || []
        }, {
            status: 200
        });
    } catch (error) {
        console.error('Webhook GET error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal Server Error',
            details: error.message
        }, {
            status: 500
        });
    }
}
async function POST(req) {
    try {
        const payload = await req.json();
        const { companyId, channel, customer, phone, address, items, total } = payload;
        // Basic validation
        if (!companyId || !channel || !customer || !Array.isArray(items) || items.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Missing required fields: companyId, channel, customer, and non-empty items array'
            }, {
                status: 400
            });
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const company = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CompanyData"].findById(companyId);
        if (!company) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Company not found'
            }, {
                status: 404
            });
        }
        // Calculate total if not provided
        const computedTotal = typeof total === 'number' ? total : items.reduce((sum, it)=>sum + (it.price || 0) * (it.qty || 1), 0);
        const newOrder = {
            id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
            channel,
            customer,
            phone: phone || '',
            address: address || '',
            items: items.map((it)=>({
                    name: it.name,
                    qty: it.qty || 1,
                    price: it.price || 0,
                    notes: it.notes || ''
                })),
            total: computedTotal,
            time: new Date().toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit'
            }),
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        // Push new order to MongoDB
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CompanyData"].updateOne({
            _id: companyId
        }, {
            $push: {
                appOrders: newOrder
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            order: newOrder
        }, {
            status: 201
        });
    } catch (error) {
        console.error('Webhook POST error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal Server Error',
            details: error.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7f63c341._.js.map