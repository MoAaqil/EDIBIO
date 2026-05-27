import mongoose, { Schema } from 'mongoose';

// ── USER ─────────────────────────────────────────────────────────────
const UserSchema = new Schema({
    _id: { type: String, required: true }, // mapped from uid
    email: { type: String, required: true, index: true },
    name: { type: String },
    phone: { type: String },
    photoUrl: { type: String },
    createdAt: { type: String },
    trialExpiresAt: { type: String },
    trialClaimed: { type: Boolean },
    subscriptionType: { type: String },
    subscriptionExpiresAt: { type: String },
    paymentHistory: { type: Array, default: [] },
    role: { type: String },
}, { timestamps: true });

// ── COMPANY ──────────────────────────────────────────────────────────
const CompanySchema = new Schema({
    _id: { type: String, required: true }, // mapped from id
    userId: { type: String, ref: 'User', index: true },
    name: { type: String, required: true },
    type: { type: String },
    gstNumber: { type: String },
    panNumber: { type: String },
    phone: { type: String },
    email: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
    logoUrl: { type: String },
    colorAccent: { type: String },
    godowns: { type: Array, default: [] },
    currency: { type: String, default: 'INR' },
    financialYear: { type: String },
    invoicePrefix: { type: String },
    invoiceCounter: { type: Number, default: 1 },
    templateId: { type: String },
    templateTheme: { type: String },
    quickBillingTheme: { type: String },
    posTheme: { type: String },
    templateColumns: { type: Object },
    customLabels: { type: Object },
    invoicePassword: { type: String },
    whatsappEnabled: { type: Boolean },
    autoBackupEnabled: { type: Boolean },
    bankDetails: { type: Object },
    team: { type: Array, default: [] },
    licenseNo: { type: String },
    auditLogs: { type: Array, default: [] },
    // Restaurant-specific sync fields
    tableCarts: { type: Object, default: {} },
    dirtyTables: { type: Object, default: {} },
    tableConfig: { type: Object, default: {} },
    customAreas: { type: Array, default: [] },
    kitchenOrders: { type: Array, default: [] },
    deals: { type: Array, default: [] },
    deliveryIntegrations: { type: Array, default: [] },
    recentZReports: { type: Array, default: [] },
    appOrders: { type: Array, default: [] },
    bulkOrders: { type: Array, default: [] },
    registerOpen: { type: Boolean, default: false },
    openingFloat: { type: Number, default: 0 },
    openingTime: { type: String },
    createdAt: { type: String },
}, { timestamps: true });

// ── PARTY ────────────────────────────────────────────────────────────
const PartySchema = new Schema({
    _id: { type: String, required: true }, // mapped from id
    companyId: { type: String, ref: 'Company', index: true },
    type: { type: String },
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    gstNumber: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    openingBalance: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
    creditLimit: { type: Number },
    creditDays: { type: Number },
    assignedProductIds: { type: [String], default: [] },
}, { timestamps: true });

// ── PRODUCT ──────────────────────────────────────────────────────────
const ProductSchema = new Schema({
    _id: { type: String, required: true }, // mapped from id
    companyId: { type: String, ref: 'Company', index: true },
    godownId: { type: String },
    name: { type: String, required: true },
    imageUrl: { type: String },
    barcode: { type: String },
    category: { type: String },
    brand: { type: String },
    hsnCode: { type: String },
    hsnFetched: { type: Boolean },
    unit: { type: String },
    purchasePrice: { type: Number, default: 0 },
    sellingPrice: { type: Number, default: 0 },
    mrp: { type: Number },
    stockQty: { type: Number, default: 0 },
    lowStockAlertQty: { type: Number, default: 5 },
    gstRate: { type: Number, default: 0 },
    cessRate: { type: Number },
    taxIncluded: { type: Boolean, default: false },
    description: { type: String },
    isBulkImported: { type: Boolean },
    expiryDate: { type: String },
}, { timestamps: true });

// ── INVOICE ──────────────────────────────────────────────────────────
const InvoiceSchema = new Schema({
    _id: { type: String, required: true }, // mapped from id
    companyId: { type: String, ref: 'Company', index: true },
    invoiceType: { type: String, required: true },
    invoiceNumber: { type: String, required: true },
    date: { type: String, required: true, index: true },
    time: { type: String },
    dueDate: { type: String },
    partyId: { type: String },
    partyName: { type: String },
    partyPhone: { type: String },
    partyGst: { type: String },
    partyAddress: { type: String },
    isInterState: { type: Boolean },
    items: { type: Array, default: [] },
    projectId: { type: String },
    currency: { type: String },
    exchangeRate: { type: Number },
    
    subTotal: { type: Number, default: 0 },
    totalDiscount: { type: Number, default: 0 },
    taxableAmount: { type: Number, default: 0 },
    totalCgst: { type: Number, default: 0 },
    totalSgst: { type: Number, default: 0 },
    totalIgst: { type: Number, default: 0 },
    totalCess: { type: Number, default: 0 },
    totalGst: { type: Number, default: 0 },
    shippingCharges: { type: Number, default: 0 },
    packingCharges: { type: Number, default: 0 },
    adjustmentAmount: { type: Number, default: 0 },
    roundOff: { type: Number, default: 0 },
    grandTotal: { type: Number, default: 0 },
    
    paymentStatus: { type: String },
    amountPaid: { type: Number, default: 0 },
    balanceDue: { type: Number, default: 0 },
    payments: { type: Array, default: [] },
    paymentMethod: { type: String },
    
    isGstBill: { type: Boolean, default: false },
    isHidden: { type: Boolean, default: false },
    isPrivate: { type: Boolean, default: false },
    
    notes: { type: String },
    counter: { type: String },
    termsConditions: { type: String },
    signature: { type: String },
    templateId: { type: String },
    godownId: { type: String },
    createdAt: { type: String },
    updatedAt: { type: String },
}, { timestamps: true });

// ── EXPENSE ──────────────────────────────────────────────────────────
const ExpenseSchema = new Schema({
    _id: { type: String, required: true }, // mapped from id
    companyId: { type: String, ref: 'Company', index: true },
    category: { type: String },
    description: { type: String },
    amount: { type: Number, default: 0 },
    gstAmount: { type: Number },
    date: { type: String, required: true },
    paymentMethod: { type: String },
    partyId: { type: String },
    projectId: { type: String },
    receiptUrl: { type: String },
    createdAt: { type: String },
}, { timestamps: true });

// Export Models
export const UserData = mongoose.models.User || mongoose.model('User', UserSchema);
export const CompanyData = mongoose.models.Company || mongoose.model('Company', CompanySchema);
export const PartyData = mongoose.models.Party || mongoose.model('Party', PartySchema);
export const ProductData = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export const InvoiceData = mongoose.models.Invoice || mongoose.model('Invoice', InvoiceSchema);
export const ExpenseData = mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);
