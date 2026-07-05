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
    templateThemeColor: { type: String },
    quickBillingTheme: { type: String },
    posTheme: { type: String },
    templateColumns: { type: Object },
    quickBillingColumns: { type: Object },
    loyaltyPointsEnabled: { type: Boolean },
    loyaltyEarningRatio: { type: Number },
    loyaltyRedemptionValue: { type: Number },
    loyaltyMinRedeemPoints: { type: Number },
    offers: { type: Array, default: [] },
    customLabels: { type: Object },
    invoicePassword: { type: String },
    showHiddenInvoices: { type: Boolean, default: false },
    whatsappEnabled: { type: Boolean },
    autoBackupEnabled: { type: Boolean },
    kitchenDisplayEnabled: { type: Boolean, default: true },
    bankDetails: { type: Object },
    team: { type: Array, default: [] },
    licenseNo: { type: String },
    auditLogs: { type: Array, default: [] },
    franchiseEnabled: { type: Boolean, default: false },
    branches: { type: Array, default: [] },
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
    loyaltyPoints: { type: Number, default: 0 },
    loyaltyAdjustments: { type: Array, default: [] },
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
    stockLogs: { type: Array, default: [] },
    batches: { type: Array, default: [] },
    branchStock: { type: Object, default: {} },
    branchPrice: { type: Object, default: {} },
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
    splitPayments: { type: Array, default: [] },
    servedBy: { type: String },
    pointsEarned: { type: Number },
    pointsRedeemed: { type: Number },
    pointsValueRedeemed: { type: Number },
    
    isGstBill: { type: Boolean, default: false },
    isHidden: { type: Boolean, default: false },
    isPrivate: { type: Boolean, default: false },
    
    notes: { type: String },
    counter: { type: String },
    termsConditions: { type: String },
    signature: { type: String },
    templateId: { type: String },
    godownId: { type: String },
    branchId: { type: String, index: true },
    receiptUrl: { type: String },
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
    branchId: { type: String, index: true },
    receiptUrl: { type: String },
    createdAt: { type: String },
}, { timestamps: true });

// ── STOCK TRANSFER ───────────────────────────────────────────────────
const StockTransferSchema = new Schema({
    _id: { type: String, required: true }, // mapped from id
    companyId: { type: String, ref: 'Company', index: true },
    fromBranchId: { type: String },
    toBranchId: { type: String },
    productId: { type: String },
    productName: { type: String },
    qty: { type: Number, default: 0 },
    status: { type: String, default: 'pending' },
    createdAt: { type: String },
}, { timestamps: true });

// ── AGENCY CLIENT ────────────────────────────────────────────────────
const AgencyClientSchema = new Schema({
    _id: { type: String, required: true }, // mapped from id
    companyId: { type: String, ref: 'Company', index: true },
    clientName: { type: String, required: true },
    businessName: { type: String },
    email: { type: String },
    phone: { type: String },
    whatsapp: { type: String },
    country: { type: String },
    address: { type: String },
    gstNumber: { type: String },
    notes: { type: String },
    contractValue: { type: Number, default: 0 },
    paymentTerms: { type: String },
    createdAt: { type: String },
}, { timestamps: true });

// ── AGENCY PROJECT ───────────────────────────────────────────────────
const AgencyProjectSchema = new Schema({
    _id: { type: String, required: true }, // mapped from id
    companyId: { type: String, ref: 'Company', index: true },
    clientId: { type: String, ref: 'AgencyClient', index: true },
    projectName: { type: String, required: true },
    serviceType: { type: String },
    billingType: { type: String },
    projectPrice: { type: Number, default: 0 },
    startDate: { type: String },
    deadline: { type: String },
    assignedTeamMemberId: { type: String },
    status: { type: String },
    milestones: { type: Array, default: [] },
    hasRetainer: { type: Boolean, default: false },
    retainerAmount: { type: Number, default: 0 },
    retainerFrequency: { type: String },
    createdAt: { type: String },
}, { timestamps: true });

// ── INVOICE TEMPLATE ─────────────────────────────────────────────────
const InvoiceTemplateSchema = new Schema({
    _id: { type: String, required: true }, // mapped from id
    companyId: { type: String, ref: 'Company', index: true },
    name: { type: String, required: true },
    layout: { type: String },
    paperSize: { type: String },
    headerBg: { type: String },
    headerText: { type: String },
    accentColor: { type: String },
    tableHeaderBg: { type: String },
    tableHeaderText: { type: String },
    bodyBg: { type: String },
    bodyText: { type: String },
    fontFamily: { type: String },
    fontSize: { type: Number },
    showLogo: { type: Boolean, default: true },
    showGstNumber: { type: Boolean, default: true },
    showHsn: { type: Boolean, default: true },
    showTaxBreakdown: { type: Boolean, default: true },
    showSignature: { type: Boolean, default: true },
    showTerms: { type: Boolean, default: true },
    showAmountInWords: { type: Boolean, default: true },
    showQrCode: { type: Boolean, default: true },
    showBalanceDue: { type: Boolean, default: true },
    showPaymentHistory: { type: Boolean, default: true },
    headerText2: { type: String },
    footerText: { type: String },
    terms: { type: String },
    logoAlign: { type: String },
    amountAlign: { type: String },
}, { timestamps: true });

// ── PURCHASE ORDER ───────────────────────────────────────────────────
const PurchaseOrderSchema = new Schema({
    _id: { type: String, required: true }, // mapped from id
    companyId: { type: String, ref: 'Company', index: true },
    poNumber: { type: String, required: true },
    supplierId: { type: String },
    supplierName: { type: String, required: true },
    supplierPhone: { type: String },
    items: { type: Array, default: [] },
    status: { type: String, default: 'draft' },
    date: { type: String, required: true },
    expectedDate: { type: String },
    notes: { type: String },
    grandTotal: { type: Number, default: 0 },
    convertedInvoiceId: { type: String },
    createdAt: { type: String },
    updatedAt: { type: String },
}, { timestamps: true });

// Clear models cache in development to prevent stale schemas on reload
if (process.env.NODE_ENV === 'development') {
    delete mongoose.models.User;
    delete mongoose.models.Company;
    delete mongoose.models.Party;
    delete mongoose.models.Product;
    delete mongoose.models.Invoice;
    delete mongoose.models.Expense;
    delete mongoose.models.StockTransfer;
    delete mongoose.models.AgencyClient;
    delete mongoose.models.AgencyProject;
    delete mongoose.models.InvoiceTemplate;
    delete mongoose.models.PurchaseOrder;
}

// Export Models
export const UserData = mongoose.models.User || mongoose.model('User', UserSchema);
export const CompanyData = mongoose.models.Company || mongoose.model('Company', CompanySchema);
export const PartyData = mongoose.models.Party || mongoose.model('Party', PartySchema);
export const ProductData = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export const InvoiceData = mongoose.models.Invoice || mongoose.model('Invoice', InvoiceSchema);
export const ExpenseData = mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);
export const StockTransferData = mongoose.models.StockTransfer || mongoose.model('StockTransfer', StockTransferSchema);
export const AgencyClientData = mongoose.models.AgencyClient || mongoose.model('AgencyClient', AgencyClientSchema);
export const AgencyProjectData = mongoose.models.AgencyProject || mongoose.model('AgencyProject', AgencyProjectSchema);
export const InvoiceTemplateData = mongoose.models.InvoiceTemplate || mongoose.model('InvoiceTemplate', InvoiceTemplateSchema);
export const PurchaseOrderData = mongoose.models.PurchaseOrder || mongoose.model('PurchaseOrder', PurchaseOrderSchema);
