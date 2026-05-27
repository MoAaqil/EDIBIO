// ─────────────────────────────────────────────────────────────────────────────
// Edibio — Core TypeScript Types
// ─────────────────────────────────────────────────────────────────────────────

// ── Auth ─────────────────────────────────────────────────────────────────────
export interface EdibioUser {
    uid: string;
    email: string;
    name: string;
    phone?: string;
    photoUrl?: string;
    createdAt: string;
    trialExpiresAt?: string;
    trialClaimed?: boolean;
    subscriptionType?: 'free' | 'mobile' | 'standard' | 'premium';
    subscriptionExpiresAt?: string;
    paymentHistory?: { plan: string; amount: number; date: string; billingCycle: string; status: string; id?: string; }[];
    role?: string;
}

export interface Company {
    id: string;
    userId?: string; // tied to specific user
    name: string;
    type: string;          // Supermarket | Restaurant | Retail | Digital Agency | ...
    gstNumber?: string;
    panNumber?: string;
    phone: string;
    email?: string;
    address: string;
    city: string;
    state: string;
    pincode?: string;
    logoUrl?: string;
    colorAccent: string;   // per-company accent color
    godowns: Godown[];     // max 2
    currency: 'INR';
    financialYear: string; // "2024-25"
    invoicePrefix: string;
    invoiceCounter: number;
    templateId: string;    // active invoice template
    templateTheme?: string; // Standard / Manual Invoice theme
    quickBillingTheme?: string; // Theme for Quick Billing
    posTheme?: string; // Theme for POS Billing
    templatePageSize?: string; // Page size
    templateColumns?: { sn: boolean; hsn: boolean; rate: boolean; discount: boolean; tax: boolean };
    quickBillingColumns?: { barcode: boolean; hsn: boolean; mfgDate: boolean; mrp: boolean; size: boolean; discount: boolean; tax: boolean };
    customLabels?: { invoiceTitle: string; invoiceNo: string; date: string; dueDate: string; billedTo: string; paymentMethod: string; footerTerms: string; };
    invoicePassword?: string; // password to view hidden invoices
    whatsappEnabled?: boolean;  // WhatsApp invoice sending toggle
    autoBackupEnabled?: boolean; // auto-save local backup file
    bankDetails?: { bankName: string; accountName: string; accountNumber: string; ifsc: string; upiId: string; qrCodeUrl?: string };
    team?: { id: string; contact: string; name: string; role: 'co_owner' | 'manager' | 'staff' | 'principal' | 'accountant' | 'teacher' | 'receptionist' | 'chef_atelier' | 'server'; code?: string; password?: string; counter?: string; }[];
    licenseNo?: string;
    auditLogs?: AuditLog[]; // Enterprise Audit Trail
    loyaltyPointsEnabled?: boolean;
    loyaltyEarningRatio?: number;
    loyaltyRedemptionValue?: number;
    loyaltyMinRedeemPoints?: number;
    offers?: OfferScheme[];
    // Restaurant-specific sync fields
    tableCarts?: Record<string, { cart: { item: Product; qty: number; sentQty?: number }[]; orderType: string; customerId?: string; notes?: string; status?: 'active' | 'completed' }>;
    dirtyTables?: Record<string, boolean>;
    tableConfig?: Record<string, number>;
    customAreas?: string[];
    kitchenOrders?: { id: string; tableNum: string; area: string; items: { name: string; qty: number; notes?: string }[]; status: 'new' | 'preparing' | 'ready'; orderedAt: string; servedBy?: string }[];
    deals?: { id: string; name: string; description: string; items: { name: string; qty: number; price: number }[]; dealPrice: number; emoji: string; type: 'combo' | 'offer' | 'special'; validFor: 'All' | 'Breakfast' | 'Lunch' | 'Dinner' }[];
    deliveryIntegrations?: { platform: string; apiKey: string; restaurantId: string; enabled: boolean; color: string; icon: string }[];
    recentZReports?: any[];
    appOrders?: any[];
    bulkOrders?: any[];
    registerOpen?: boolean;
    openingFloat?: number;
    openingTime?: string;
    createdAt: string;
}

// ── Enterprise Audit Trail ────────────────────────────────────────────────────
export interface AuditLog {
    id: string;
    timestamp: string;
    userId: string;
    userName: string;
    userRole: string;
    action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'EXPORT' | 'IMPORT';
    entityType: 'INVOICE' | 'PRODUCT' | 'PARTY' | 'SETTINGS' | 'SYSTEM';
    entityId?: string;
    details: string;
}

// ── Godown (max 2 per company) ────────────────────────────────────────────────
export interface Godown {
    id: string;
    name: string;
    address?: string;
}

// ── Balance Payment History ───────────────────────────────────────────────────
export interface BalancePayment {
    id: string;
    type: 'received' | 'paid';
    date: string;           // YYYY-MM-DD
    amount: number;         // amount of repayment
    method: 'cash' | 'upi' | 'bank' | 'cheque' | 'neft' | 'rtgs' | 'other';
    note?: string;
    balanceBefore: number;  // party balance before this payment
    balanceAfter: number;   // party balance after this payment
    recordedAt: string;     // ISO timestamp
}

// ── Party (Customer / Supplier) ───────────────────────────────────────────────
export type PartyType = 'customer' | 'supplier' | 'both';

export interface Party {
    id: string;
    companyId: string;
    type: PartyType;
    name: string;
    phone: string;
    email?: string;
    gstNumber?: string;
    address?: string;
    city?: string;
    state?: string;
    openingBalance: number;  // + = receivable, - = payable
    balance: number;         // current running balance
    creditLimit?: number;
    creditDays?: number;
    assignedProductIds?: string[]; // IDs of products this supplier provides
    paymentHistory?: BalancePayment[]; // repayment ledger
    loyaltyPoints?: number;
    loyaltyAdjustments?: LoyaltyAdjustment[];
}

export interface LoyaltyAdjustment {
    id: string;
    date: string;          // YYYY-MM-DD
    time?: string;         // HH:MM
    points: number;        // positive = add, negative = deduct
    reason: string;
}


// ── Stock Movement Log ───────────────────────────────────────────────────────
export interface StockLog {
    id: string;
    date: string;          // YYYY-MM-DD
    time?: string;         // HH:MM
    type: 'in' | 'out' | 'adjust' | 'opening';
    qty: number;
    reason: string;        // e.g. 'Sale Invoice', 'Purchase', 'Manual Adjust'
    invoiceId?: string;
    invoiceNumber?: string;
    partyName?: string;
    balanceAfter: number;  // stock qty after this movement
}

// ── Batch / Expiry Tracking ───────────────────────────────────────────────────
export interface Batch {
    id: string;
    batchNo: string;
    mfgDate?: string;      // YYYY-MM-DD
    expiryDate?: string;   // YYYY-MM-DD
    qty: number;
    purchasePrice: number;
    supplierId?: string;
    supplierName?: string;
    addedAt: string;       // ISO timestamp
}

// ── Product / Item ────────────────────────────────────────────────────────────
export type GstRate = 0 | 0.1 | 0.25 | 1 | 1.5 | 3 | 5 | 7.5 | 12 | 18 | 28;

export interface Product {
    id: string;
    companyId: string;
    godownId?: string;
    name: string;
    imageUrl?: string;
    barcode?: string;
    category?: string;
    brand?: string;
    hsnCode?: string;
    hsnFetched?: boolean;     // true if fetched from API
    unit: string;
    purchasePrice: number;
    sellingPrice: number;
    mrp?: number;
    stockQty: number;
    lowStockAlertQty: number;
    gstRate: GstRate;
    cessRate?: number;
    taxIncluded: boolean;     // is GST included in selling price?
    description?: string;
    isBulkImported?: boolean; // flag for tracking bulk uploads
    stockLogs?: StockLog[];   // movement history
    batches?: Batch[];        // batch/expiry tracking
    expiryDate?: string;      // YYYY-MM-DD (Product Expiry Date)
}

// ── Digital Agency CRM & Projects ───────────────────────────────────────────────
export interface AgencyClient {
    id: string;
    companyId: string;
    clientName: string;
    businessName?: string;
    email?: string;
    phone?: string;
    whatsapp?: string;
    country?: string;
    address?: string;
    gstNumber?: string;
    notes?: string;
    contractValue?: number;
    paymentTerms?: string; // e.g., Net 30
    createdAt: string;
}

export interface ProjectMilestone {
    id: string;
    title: string;
    amount: number;
    dueDate: string;
    status: 'pending' | 'invoiced' | 'paid';
    invoiceId?: string;
}

export type ProjectStatus = 'ongoing' | 'completed' | 'on_hold';
export type BillingType = 'one_time' | 'milestone' | 'retainer' | 'hourly';

export interface AgencyProject {
    id: string;
    companyId: string;
    clientId: string;
    projectName: string;
    serviceType: string;      // web dev, app dev, seo, etc.
    billingType: BillingType;
    projectPrice: number;     // Or monthly retainer amount, hourly rate
    startDate: string;
    deadline?: string;
    assignedTeamMemberId?: string;
    status: ProjectStatus;
    milestones: ProjectMilestone[];
    // For retainer
    hasRetainer?: boolean;
    retainerAmount?: number;
    retainerFrequency?: 'monthly' | 'yearly';
    createdAt: string;
}

// ── Invoice ───────────────────────────────────────────────────────────────────
export type InvoiceType = 'sale' | 'purchase' | 'sale_return' | 'purchase_return'
    | 'estimate' | 'proforma' | 'delivery_challan' | 'credit_note' | 'debit_note';

export type PaymentMethod = 'cash' | 'upi' | 'bank' | 'cheque' | 'credit' | 'card' | 'neft' | 'rtgs';
export type PaymentStatus = 'paid' | 'partial' | 'unpaid' | 'overdue';

export interface InvoiceLineItem {
    productId?: string;
    name: string;
    hsnCode?: string;
    qty: number;
    unit: string;
    rate: number;
    discount: number;       // percentage
    discountAmt: number;
    taxableAmt: number;
    gstRate: GstRate;
    cgst: number;
    sgst: number;
    igst: number;
    cess: number;
    totalGst: number;
    amount: number;         // including GST
    isService?: boolean;
}

export interface PaymentEntry {
    method: PaymentMethod;
    amount: number;
    reference?: string;
    date: string;
}

export interface Invoice {
    id: string;
    companyId: string;
    invoiceType: InvoiceType;
    invoiceNumber: string;
    date: string;
    time?: string;
    dueDate?: string;
    partyId?: string;
    partyName?: string;
    partyPhone?: string;
    partyGst?: string;
    partyAddress?: string;
    isInterState?: boolean;
    items: InvoiceLineItem[];
    projectId?: string; // For Agency projects
    currency?: string; // For international billing (USD, AED)
    exchangeRate?: number; // to INR
    // Totals
    subTotal: number;
    totalDiscount: number;
    taxableAmount: number;
    totalCgst: number;
    totalSgst: number;
    totalIgst: number;
    totalCess: number;
    totalGst: number;
    shippingCharges: number;
    packingCharges: number;
    adjustmentAmount: number;
    roundOff: number;
    grandTotal: number;
    // Payment
    paymentStatus: PaymentStatus;
    amountPaid: number;
    balanceDue: number;
    payments: PaymentEntry[];
    paymentMethod: PaymentMethod;
    splitPayments?: { method: PaymentMethod; amount: number; label?: string }[]; // e.g. [{method:'cash',amount:200},{method:'upi',amount:300}]

    // Flags
    isGstBill: boolean;       // has GST? if false, hidden from normal view
    isHidden: boolean;        // requires password
    isPrivate: boolean;       // completely hidden from reports
    // Meta
    notes?: string;
    counter?: string;
    termsConditions?: string;
    signature?: string;
    templateId?: string;
    godownId?: string;
    pointsEarned?: number;
    pointsRedeemed?: number;
    pointsValueRedeemed?: number;
    createdAt: string;
    updatedAt: string;
}

// ── Expense ───────────────────────────────────────────────────────────────────
export interface Expense {
    id: string;
    companyId: string;
    category: string;
    description?: string;
    amount: number;
    gstAmount?: number;
    date: string;
    paymentMethod: PaymentMethod;
    partyId?: string;
    projectId?: string; // link expense to project
    receiptUrl?: string;
    createdAt: string;
}

// ── Invoice Template ──────────────────────────────────────────────────────────
export type PaperSize = 'A4' | 'A5' | 'A6' | 'thermal_80' | 'thermal_58' | 'letter';
export type TemplateLayout = 'classic' | 'modern' | 'minimal' | 'colorful' | 'custom';

export interface InvoiceTemplate {
    id: string;
    name: string;
    layout: TemplateLayout;
    paperSize: PaperSize;
    // Colors
    headerBg: string;
    headerText: string;
    accentColor: string;
    tableHeaderBg: string;
    tableHeaderText: string;
    bodyBg: string;
    bodyText: string;
    // Font
    fontFamily: string;
    fontSize: number;
    // Show/hide fields
    showLogo: boolean;
    showGstNumber: boolean;
    showHsn: boolean;
    showTaxBreakdown: boolean;
    showSignature: boolean;
    showTerms: boolean;
    showAmountInWords: boolean;
    showQrCode: boolean;
    showBalanceDue: boolean;
    showPaymentHistory: boolean;
    // Content
    headerText2?: string;
    footerText?: string;
    terms?: string;
    // Alignment
    logoAlign: 'left' | 'center' | 'right';
    amountAlign: 'left' | 'right';
}

export interface HsnCode {
    code: string;
    description: string;
    gstRate: GstRate;
    source: 'api' | 'manual' | 'cache';
}

// ── Purchase Order ────────────────────────────────────────────────────────────
export interface PurchaseOrderItem {
    productId?: string;
    name: string;
    qty: number;
    unit: string;
    rate: number;
    amount: number;
    hsnCode?: string;
}

export type POStatus = 'draft' | 'sent' | 'received' | 'cancelled';

export interface PurchaseOrder {
    id: string;
    companyId: string;
    poNumber: string;
    supplierId?: string;
    supplierName: string;
    supplierPhone?: string;
    items: PurchaseOrderItem[];
    status: POStatus;
    date: string;          // YYYY-MM-DD
    expectedDate?: string; // expected delivery date
    notes?: string;
    grandTotal: number;
    convertedInvoiceId?: string; // set when PO is converted to purchase invoice
    createdAt: string;
    updatedAt: string;
}

export interface OfferScheme {
    id: string;
    type: 'bogo' | 'discount' | 'combo';
    name: string;
    buyProductId?: string;
    buyQty?: number;
    getProductId?: string;
    getQty?: number;
    discountPercent?: number; // e.g., 50 for 50% off
    comboProductIds?: string[];
    comboPrice?: number;
    isActive: boolean;
}

