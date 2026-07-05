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
"[project]/lib/logistics/models.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LsDriver",
    ()=>LsDriver,
    "LsFuel",
    ()=>LsFuel,
    "LsInvoice",
    ()=>LsInvoice,
    "LsLoad",
    ()=>LsLoad,
    "LsLoadEvent",
    ()=>LsLoadEvent,
    "LsMaintenance",
    ()=>LsMaintenance,
    "LsTracking",
    ()=>LsTracking,
    "LsVehicle",
    ()=>LsVehicle
]);
// ============================================================
// LoadSwift — MongoDB Models (separate ls_ collections)
// Uses same MongoDB Atlas connection via lib/mongodb.ts
// ============================================================
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
// ── Load / Shipment ─────────────────────────────────────────
const LoadSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    loadNumber: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: [
            'upcoming',
            'in_transit',
            'delivered',
            'delayed',
            'cancelled'
        ],
        default: 'upcoming'
    },
    customerId: String,
    customerName: {
        type: String,
        required: true
    },
    customerCompany: String,
    customerPhone: String,
    customerEmail: String,
    pickupAddress: {
        type: String,
        required: true
    },
    pickupCity: {
        type: String,
        required: true
    },
    pickupLat: Number,
    pickupLng: Number,
    pickupDate: {
        type: String,
        required: true
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    deliveryCity: {
        type: String,
        required: true
    },
    deliveryLat: Number,
    deliveryLng: Number,
    deliveryDate: {
        type: String,
        required: true
    },
    commodity: {
        type: String,
        required: true
    },
    weightKg: {
        type: Number,
        required: true
    },
    volumeCbm: Number,
    specialInstructions: String,
    driverId: String,
    driverName: String,
    vehicleId: String,
    vehicleNumber: String,
    baseRate: {
        type: Number,
        default: 0
    },
    fuelCost: {
        type: Number,
        default: 0
    },
    fuelRebate: {
        type: Number,
        default: 0
    },
    tollCost: {
        type: Number,
        default: 0
    },
    taxes: {
        type: Number,
        default: 0
    },
    commission: {
        type: Number,
        default: 0
    },
    netPayout: {
        type: Number,
        default: 0
    },
    grossRevenue: {
        type: Number,
        default: 0
    },
    profitMargin: {
        type: Number,
        default: 0
    },
    distanceKm: Number,
    etaHours: Number,
    currentEta: String,
    currentLat: Number,
    currentLng: Number,
    lastPing: String,
    companyId: {
        type: String,
        required: true,
        index: true
    },
    notes: String
}, {
    timestamps: true,
    collection: 'ls_loads'
});
// ── Load Event / Timeline ───────────────────────────────────
const LoadEventSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    loadId: {
        type: String,
        required: true,
        index: true
    },
    type: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    },
    lat: Number,
    lng: Number,
    locationName: String,
    driverId: String,
    driverName: String,
    notes: String,
    photos: [
        String
    ],
    createdBy: String
}, {
    timestamps: true,
    collection: 'ls_events'
});
// ── GPS Tracking ────────────────────────────────────────────
const TrackingSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    loadId: {
        type: String,
        required: true,
        index: true
    },
    driverId: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    speed: {
        type: Number,
        default: 0
    },
    heading: {
        type: Number,
        default: 0
    },
    battery: Number,
    network: String,
    accuracy: Number,
    timestamp: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: 'ls_tracking'
});
// ── Driver Profile ──────────────────────────────────────────
const DriverSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: String,
    photoUrl: String,
    licenseNumber: {
        type: String,
        required: true
    },
    licenseExpiry: {
        type: String,
        required: true
    },
    insuranceExpiry: String,
    medicalExpiry: String,
    status: {
        type: String,
        enum: [
            'available',
            'on_trip',
            'off_duty',
            'suspended'
        ],
        default: 'available'
    },
    rating: {
        type: Number,
        default: 4.5
    },
    totalLoads: {
        type: Number,
        default: 0
    },
    totalKm: {
        type: Number,
        default: 0
    },
    companyId: {
        type: String,
        required: true,
        index: true
    },
    currentLoadId: String,
    currentLat: Number,
    currentLng: Number
}, {
    timestamps: true,
    collection: 'ls_drivers'
});
// ── Vehicle / Fleet ─────────────────────────────────────────
const VehicleSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    vehicleNumber: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    vin: String,
    registrationNumber: String,
    registrationExpiry: String,
    insuranceExpiry: String,
    capacityTons: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: [
            'active',
            'maintenance',
            'idle',
            'retired'
        ],
        default: 'active'
    },
    currentDriverId: String,
    currentDriverName: String,
    currentLoadId: String,
    odometerKm: {
        type: Number,
        default: 0
    },
    fuelType: {
        type: String,
        default: 'diesel'
    },
    fuelEfficiency: Number,
    companyId: {
        type: String,
        required: true,
        index: true
    },
    nextMaintenanceDue: String,
    nextMaintenanceKm: Number
}, {
    timestamps: true,
    collection: 'ls_vehicles'
});
// ── Fuel Transaction ────────────────────────────────────────
const FuelTransactionSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    vehicleId: {
        type: String,
        required: true
    },
    vehicleNumber: {
        type: String,
        required: true
    },
    driverId: String,
    driverName: String,
    loadId: String,
    liters: {
        type: Number,
        required: true
    },
    pricePerLiter: {
        type: Number,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    odometer: {
        type: Number,
        required: true
    },
    station: String,
    paymentMethod: String,
    receiptUrl: String,
    date: {
        type: String,
        required: true
    },
    companyId: {
        type: String,
        required: true,
        index: true
    }
}, {
    timestamps: true,
    collection: 'ls_fuel'
});
// ── Maintenance Record ──────────────────────────────────────
const MaintenanceSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    vehicleId: {
        type: String,
        required: true
    },
    vehicleNumber: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    odometer: Number,
    serviceCenter: String,
    date: {
        type: String,
        required: true
    },
    nextDueDate: String,
    nextDueOdometer: Number,
    status: {
        type: String,
        enum: [
            'scheduled',
            'in_progress',
            'completed'
        ],
        default: 'scheduled'
    },
    companyId: {
        type: String,
        required: true,
        index: true
    }
}, {
    timestamps: true,
    collection: 'ls_maintenance'
});
// ── Invoice ─────────────────────────────────────────────────
const InvoiceSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    invoiceNumber: {
        type: String,
        required: true,
        unique: true
    },
    loadId: {
        type: String,
        required: true
    },
    loadNumber: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerCompany: String,
    customerEmail: String,
    amount: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: [
            'draft',
            'sent',
            'paid',
            'overdue'
        ],
        default: 'draft'
    },
    dueDate: {
        type: String,
        required: true
    },
    paidDate: String,
    companyId: {
        type: String,
        required: true,
        index: true
    }
}, {
    timestamps: true,
    collection: 'ls_invoices'
});
const LsLoad = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["models"].LsLoad || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["model"])('LsLoad', LoadSchema);
const LsLoadEvent = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["models"].LsLoadEvent || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["model"])('LsLoadEvent', LoadEventSchema);
const LsTracking = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["models"].LsTracking || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["model"])('LsTracking', TrackingSchema);
const LsDriver = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["models"].LsDriver || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["model"])('LsDriver', DriverSchema);
const LsVehicle = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["models"].LsVehicle || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["model"])('LsVehicle', VehicleSchema);
const LsFuel = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["models"].LsFuel || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["model"])('LsFuel', FuelTransactionSchema);
const LsMaintenance = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["models"].LsMaintenance || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["model"])('LsMaintenance', MaintenanceSchema);
const LsInvoice = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["models"].LsInvoice || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["model"])('LsInvoice', InvoiceSchema);
}),
"[project]/app/api/logistics/drivers/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mongodb.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logistics$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/logistics/models.ts [app-route] (ecmascript)");
;
;
;
async function GET(req) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const { searchParams } = new URL(req.url);
        const companyId = searchParams.get('companyId') || 'default';
        const status = searchParams.get('status');
        const query = {
            companyId
        };
        if (status) query.status = status;
        const drivers = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logistics$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LsDriver"].find(query).sort({
            name: 1
        }).lean();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            drivers
        });
    } catch (err) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err.message
        }, {
            status: 500
        });
    }
}
async function POST(req) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const body = await req.json();
        const { companyId = 'default', ...data } = body;
        const driver = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logistics$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LsDriver"].create({
            ...data,
            companyId
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            driver
        }, {
            status: 201
        });
    } catch (err) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__790a299c._.js.map