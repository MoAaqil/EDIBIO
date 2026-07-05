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
    "CompanyData",
    ()=>CompanyData,
    "ExpenseData",
    ()=>ExpenseData,
    "InvoiceData",
    ()=>InvoiceData,
    "PartyData",
    ()=>PartyData,
    "ProductData",
    ()=>ProductData,
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
    receiptUrl: {
        type: String
    },
    createdAt: {
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
}
const UserData = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.User || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model('User', UserSchema);
const CompanyData = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.Company || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model('Company', CompanySchema);
const PartyData = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.Party || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model('Party', PartySchema);
const ProductData = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.Product || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model('Product', ProductSchema);
const InvoiceData = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.Invoice || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model('Invoice', InvoiceSchema);
const ExpenseData = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.Expense || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model('Expense', ExpenseSchema);
}),
"[project]/app/api/admin/data/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
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
async function GET() {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        // Fetch all users
        const users = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UserData"].find({}).lean();
        // Fetch all companies
        const companies = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CompanyData"].find({}).lean();
        // Fetch invoice counts and totals per company
        // We'll aggregate to avoid massive data transfer
        const invoiceStats = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvoiceData"].aggregate([
            {
                $group: {
                    _id: '$companyId',
                    count: {
                        $sum: 1
                    },
                    total: {
                        $sum: '$grandTotal'
                    }
                }
            }
        ]);
        const statsMap = new Map();
        invoiceStats.forEach((stat)=>{
            statsMap.set(stat._id, {
                count: stat.count,
                total: stat.total
            });
        });
        const usersMap = new Map(users.map((u)=>[
                u._id,
                u
            ]));
        const accounts = users.map((u)=>{
            const userCompanies = companies.filter((c)=>c.userId === u._id);
            return {
                docId: u._id,
                uid: u._id,
                email: u.email,
                name: u.name || 'Unknown',
                phone: u.phone || 'N/A',
                plan: u.subscriptionType || u.plan || 'free',
                planExpiry: u.subscriptionExpiresAt || null,
                updatedAt: u.updatedAt,
                aiApiKey: u.aiApiKey || '',
                companies: userCompanies.map((c)=>({
                        id: c._id,
                        name: c.name,
                        type: c.type,
                        invoices: statsMap.get(c._id)?.count || 0
                    })),
                totalInvoices: userCompanies.reduce((acc, c)=>acc + (statsMap.get(c._id)?.count || 0), 0),
                revenue: userCompanies.reduce((acc, c)=>acc + (statsMap.get(c._id)?.total || 0), 0),
                rawUser: u
            };
        });
        const unlinkedCompanies = companies.filter((c)=>!c.userId || !usersMap.has(c.userId));
        if (unlinkedCompanies.length > 0) {
            accounts.push({
                docId: 'unlinked_stores',
                uid: 'unlinked_stores',
                email: 'unlinked@edibio.app',
                name: 'Unlinked / Orphaned Stores',
                phone: 'N/A',
                plan: 'free',
                planExpiry: null,
                updatedAt: new Date().toISOString(),
                aiApiKey: '',
                companies: unlinkedCompanies.map((c)=>({
                        id: c._id,
                        name: c.name,
                        type: c.type,
                        invoices: statsMap.get(c._id)?.count || 0
                    })),
                totalInvoices: unlinkedCompanies.reduce((acc, c)=>acc + (statsMap.get(c._id)?.count || 0), 0),
                revenue: unlinkedCompanies.reduce((acc, c)=>acc + (statsMap.get(c._id)?.total || 0), 0),
                rawUser: {
                    _id: 'unlinked_stores',
                    email: 'unlinked@edibio.app',
                    name: 'Unlinked Stores'
                }
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            accounts
        });
    } catch (error) {
        console.error('Admin Data Fetch Error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__db16d480._.js.map