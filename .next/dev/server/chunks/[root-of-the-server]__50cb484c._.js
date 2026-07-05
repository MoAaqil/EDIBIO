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
    },
    expiryDate: {
        type: String
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
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/app/api/payments/verify/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mongodb.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/models.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
;
;
;
const dynamic = 'force-dynamic';
async function POST(req) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan, amount, billingCycle, userId, simulated } = await req.json();
        if (!userId || !plan || !amount || !billingCycle) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Missing logic fields'
            }, {
                status: 400
            });
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        // If simulated, bypass signature check and perform the DB update
        if (!simulated) {
            const key_secret = process.env.RAZORPAY_KEY_SECRET;
            if (!key_secret) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Server configuration error'
                }, {
                    status: 500
                });
            }
            const body = razorpay_order_id + '|' + razorpay_payment_id;
            const expectedSignature = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHmac('sha256', key_secret).update(body.toString()).digest('hex');
            if (expectedSignature !== razorpay_signature) {
                console.error('[Verify] Signature mismatch! Expected:', expectedSignature, 'Got:', razorpay_signature);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Payment signature invalid. Please contact support.'
                }, {
                    status: 400
                });
            }
        }
        // Calculate new expiry date based on the plan
        const currentDate = new Date();
        const expiryDate = new Date();
        if (billingCycle === 'yearly') {
            expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        } else {
            expiryDate.setMonth(expiryDate.getMonth() + 1);
        }
        const newPayment = {
            plan,
            amount,
            date: currentDate.toISOString(),
            billingCycle,
            status: 'paid',
            id: razorpay_payment_id || `simulated_${Date.now()}`
        };
        // Securely update the User document in MongoDB.
        // upsert: true — creates the user document if they haven't synced to MongoDB yet
        // (e.g. they registered via Firebase Auth but haven't triggered a full data sync)
        const updatedUser = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UserData"].findByIdAndUpdate(userId, {
            $set: {
                _id: userId,
                subscriptionType: plan.toLowerCase(),
                subscriptionExpiresAt: expiryDate.toISOString(),
                trialExpiresAt: null
            },
            $push: {
                paymentHistory: {
                    $each: [
                        newPayment
                    ],
                    $position: 0
                }
            }
        }, {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true
        }).lean();
        if (!updatedUser) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Database error: could not update user'
            }, {
                status: 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: 'Payment verified successfully and plan updated.',
            updatedUser
        });
    } catch (error) {
        console.error('Verify Payment Error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__50cb484c._.js.map