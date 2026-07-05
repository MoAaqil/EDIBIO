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
    quickBillingTheme: {
        type: String
    },
    posTheme: {
        type: String
    },
    templateColumns: {
        type: Object
    },
    customLabels: {
        type: Object
    },
    invoicePassword: {
        type: String
    },
    whatsappEnabled: {
        type: Boolean
    },
    autoBackupEnabled: {
        type: Boolean
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
const UserData = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.User || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model('User', UserSchema);
const CompanyData = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.Company || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model('Company', CompanySchema);
const PartyData = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.Party || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model('Party', PartySchema);
const ProductData = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.Product || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model('Product', ProductSchema);
const InvoiceData = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.Invoice || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model('Invoice', InvoiceSchema);
const ExpenseData = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.Expense || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model('Expense', ExpenseSchema);
}),
"[project]/app/api/admin/update/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PATCH",
    ()=>PATCH
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mongodb.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/models.ts [app-route] (ecmascript)");
;
;
;
async function PATCH(req) {
    try {
        const { userId, companyId, plan, expiry, aiApiKey, companyName, companyType, companyPhone, companyGst } = await req.json();
        if (!userId && !companyId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'userId or companyId is required'
            }, {
                status: 400
            });
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        if (companyId) {
            const updateData = {
                updatedAt: new Date().toISOString()
            };
            if (companyName) updateData.name = companyName;
            if (companyType) updateData.type = companyType;
            if (companyPhone !== undefined) updateData.phone = companyPhone;
            if (companyGst !== undefined) updateData.gstNumber = companyGst;
            const comp = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CompanyData"].findByIdAndUpdate(companyId, {
                $set: updateData
            }, {
                new: true
            });
            if (userId) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UserData"].findByIdAndUpdate(userId, {
                    $set: {
                        updatedAt: new Date().toISOString()
                    }
                });
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                company: comp
            });
        }
        const updateData = {
            updatedAt: new Date().toISOString()
        };
        if (plan) {
            updateData.subscriptionType = plan;
            updateData.plan = plan === 'free' ? 'expired_subscription' : plan;
        }
        if (expiry) {
            updateData.subscriptionExpiresAt = expiry;
        }
        if (aiApiKey !== undefined) {
            updateData.aiApiKey = aiApiKey;
        }
        // Update the user document in MongoDB
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UserData"].findByIdAndUpdate(userId, {
            $set: updateData
        }, {
            new: true
        });
        if (!user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'User not found in MongoDB'
            }, {
                status: 404
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Admin Update Error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2c7346a3._.js.map