import type { GstRate, InvoiceLineItem, InvoiceType } from './types';

// ─── Number utils ─────────────────────────────────────────────────────────────
export const r2 = (n: number) => Math.round(n * 100) / 100;

export function calcLineItem(
    qty: number, rate: number, discount: number, gstRate: GstRate,
    taxIncluded = false, cessRate = 0
): Omit<InvoiceLineItem, 'name' | 'hsnCode' | 'unit' | 'productId' | 'isService' | 'gstRate'> {
    const baseAmt = qty * rate;
    const discAmt = r2(baseAmt * discount / 100);
    const postDiscount = r2(baseAmt - discAmt);

    let taxableAmt: number, totalGst: number;

    if (taxIncluded) {
        // Rate already includes GST
        taxableAmt = r2(postDiscount / (1 + gstRate / 100));
        totalGst = r2(postDiscount - taxableAmt);
    } else {
        taxableAmt = postDiscount;
        totalGst = r2(taxableAmt * gstRate / 100);
    }

    const cess = r2(taxableAmt * (cessRate || 0) / 100);
    const half = r2(totalGst / 2);
    const amount = taxIncluded ? postDiscount : r2(taxableAmt + totalGst + cess);

    return {
        qty, rate, discount, discountAmt: discAmt,
        taxableAmt, totalGst,
        cgst: half, sgst: half, igst: 0, cess,
        amount: r2(amount),
    };
}

// ── Round off ─────────────────────────────────────────────────────────────────
export function roundOff(n: number) {
    const frac = n - Math.floor(n);
    return frac < 0.5 ? -r2(frac) : r2(1 - frac);
}

// ── Format ────────────────────────────────────────────────────────────────────
export function formatINR(n: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(n);
}

export function formatShort(n: number) {
    if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)}Cr`;
    if (n >= 100000) return `₹${(n / 100000).toFixed(2)}L`;
    if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
    return `₹${n.toFixed(0)}`;
}

export function amountInWords(n: number): string {
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
        'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
        'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    const toWords = (num: number): string => {
        if (num === 0) return '';
        if (num < 20) return units[num];
        if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + units[num % 10] : '');
        if (num < 1000) return units[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' And ' + toWords(num % 100) : '');
        if (num < 100000) return toWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 ? ' ' + toWords(num % 1000) : '');
        if (num < 10000000) return toWords(Math.floor(num / 100000)) + ' Lakh' + (num % 100000 ? ' ' + toWords(num % 100000) : '');
        return toWords(Math.floor(num / 10000000)) + ' Crore' + (num % 10000000 ? ' ' + toWords(num % 10000000) : '');
    };

    const rupees = Math.floor(n);
    const paise = Math.round((n - rupees) * 100);
    let words = 'Rupees ' + toWords(rupees);
    if (paise > 0) words += ' And ' + toWords(paise) + ' Paise';
    return words + ' Only';
}

// ── Date helpers ──────────────────────────────────────────────────────────────
export function formatDate(d: string) {
    const dt = new Date(d);
    return dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
export function todayISO() { return new Date().toISOString().slice(0, 10); }
export function isOverdue(dueDate?: string) {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
}

// ── Invoice type label ────────────────────────────────────────────────────────
export const INVOICE_TYPE_LABELS: Record<InvoiceType, string> = {
    sale: 'Tax Invoice',
    purchase: 'Purchase Bill',
    sale_return: 'Credit Note',
    purchase_return: 'Debit Note',
    estimate: 'Estimate / Quotation',
    proforma: 'Proforma Invoice',
    delivery_challan: 'Delivery Challan',
    credit_note: 'Credit Note',
    debit_note: 'Debit Note',
};

// ── GST rates ─────────────────────────────────────────────────────────────────
export const GST_RATES: GstRate[] = [0, 0.1, 0.25, 1, 1.5, 3, 5, 7.5, 12, 18, 28];

// ── Units ─────────────────────────────────────────────────────────────────────
export const UNITS = ['pcs', 'kg', 'g', 'mg', 'l', 'ml', 'box', 'pack', 'dozen',
    'pair', 'set', 'bag', 'can', 'bottle', 'sachet', 'roll', 'meter', 'sqft'];

// ── States ────────────────────────────────────────────────────────────────────
export const INDIAN_STATES = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
    'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Puducherry', 'Chandigarh', 'Jammu & Kashmir', 'Ladakh',
];

// ── Payment methods ───────────────────────────────────────────────────────────
export const PAYMENT_METHODS = [
    { value: 'cash', label: 'Cash', emoji: '💵' },
    { value: 'upi', label: 'UPI', emoji: '📱' },
    { value: 'bank', label: 'Bank Transfer', emoji: '🏦' },
    { value: 'card', label: 'Card', emoji: '💳' },
    { value: 'cheque', label: 'Cheque', emoji: '📄' },
    { value: 'credit', label: 'Credit', emoji: '🤝' },
    { value: 'neft', label: 'NEFT', emoji: '🔄' },
    { value: 'rtgs', label: 'RTGS', emoji: '⚡' },
];

// ── HSN fetch ─────────────────────────────────────────────────────────────────
export async function fetchHsnOnline(code: string): Promise<{ description: string; gstRate: number } | null> {
    try {
        // Using Open Government Data API (India) — no key needed
        const res = await fetch(
            `https://data.gov.in/api/datastore/resource.json?resource_id=6b6e3b52-6c9f-4b7b-9a3f-9e4b4f4b6e3b&filters[hsn_code]=${code}&limit=1`,
            { signal: AbortSignal.timeout(4000) }
        );
        if (res.ok) {
            const data = await res.json();
            if (data.records?.[0]) {
                return {
                    description: data.records[0].commodity_description || '',
                    gstRate: parseFloat(data.records[0].gst_rate) || 0,
                };
            }
        }
    } catch (e) { }

    // Fallback: well-known HSN codes
    const known: Record<string, { description: string; gstRate: number }> = {
        '0101': { description: 'Live horses, asses, mules', gstRate: 0 },
        '1006': { description: 'Rice', gstRate: 5 },
        '1001': { description: 'Wheat', gstRate: 5 },
        '0402': { description: 'Milk, cream, concentrated', gstRate: 5 },
        '1701': { description: 'Cane sugar / beet sugar', gstRate: 5 },
        '2106': { description: 'Food preparations NEC', gstRate: 18 },
        '2106909': { description: 'Ready-to-eat food', gstRate: 12 },
        '0804': { description: 'Dates, figs, pineapples, avocados (fresh/dried)', gstRate: 0 },
        '0901': { description: 'Coffee', gstRate: 5 },
        '0902': { description: 'Tea', gstRate: 5 },
        '2009': { description: 'Fruit juices', gstRate: 12 },
        '3304': { description: 'Beauty/cosmetic preparations', gstRate: 18 },
        '8517': { description: 'Telephone sets (smartphones)', gstRate: 18 },
        '8528': { description: 'Televisions', gstRate: 28 },
        '4403': { description: 'Wood lumber', gstRate: 12 },
        '6211': { description: 'Track suits / garments', gstRate: 12 },
        '9403': { description: 'Other furniture', gstRate: 18 },
    };
    return known[code] ?? null;
}

// ── cn ────────────────────────────────────────────────────────────────────────
export function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}

// ── Predictive Stock ──────────────────────────────────────────────────────────
export function predictStockDays(stockQty: number, invoices: any[], productId: string): number | null {
    // Look at last 30 days of sales
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    let totalSold = 0;
    invoices.filter(i => i.invoiceType === 'sale' && new Date(i.date) >= thirtyDaysAgo).forEach(inv => {
        inv.items.forEach((it: any) => {
            if (it.productId === productId) totalSold += it.qty;
        });
    });

    if (totalSold === 0) return null; // No sales data
    const dailyAvg = totalSold / 30;
    return Math.floor(stockQty / dailyAvg);
}
// ── Path utils ──────────────────────────────────────────────────────────────
export function deriveTitleFromPath(path: string): string {
    const parts = path.split('/').filter(Boolean);
    if (parts.length === 0) return 'Dashboard';
    
    // Get the last significant part
    let last = parts[parts.length - 1];
    
    // If it's a UUID or MongoDB ID, get the second-to-last
    if (last.length > 20 || /^[0-9a-fA-F-]+$/.test(last)) {
        last = parts[parts.length - 2] || 'Dashboard';
    }

    const titles: Record<string, string> = {
        'dashboard': 'Dashboard',
        'billing': 'Bills & Invoices',
        'inventory': 'Inventory',
        'parties': 'Parties',
        'expenses': 'Expenses',
        'reports': 'Reports',
        'analytics': 'Analytics',
        'settings': 'Settings',
        'audit': 'Audit Logs',
        'agency-clients': 'Clients',
        'agency-projects': 'Projects',
        'restaurant': 'Restaurant POS',
        'bakery': 'Bakery POS',
        'logistics': 'Logistics Operations',
        'ecommerce': 'Ecommerce Storefront',
    };

    return titles[last] || last.charAt(0).toUpperCase() + last.slice(1);
}

// ── WhatsApp Reminder ────────────────────────────────────────────────────────
/**
 * Builds a wa.me URL with a pre-filled payment reminder message.
 * @param invoice  The invoice object (must have invoiceNumber, grandTotal, balanceDue, partyPhone, partyName)
 * @param party    Optional party record to get a cleaner phone number
 */
export function buildWhatsAppReminderUrl(invoice: any, party?: any): string {
    const phone = (party?.phone || invoice.partyPhone || '').replace(/\D/g, '');
    const name = invoice.partyName || party?.name || 'Customer';
    const invNo = invoice.invoiceNumber || '';
    const total = Number(invoice.grandTotal || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 });
    const due = Number(invoice.balanceDue || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 });
    const dueDate = invoice.dueDate ? ` (due ${formatDate(invoice.dueDate)})` : '';

    const message =
        `Dear ${name},\n\n` +
        `This is a gentle reminder that your invoice *#${invNo}* of *₹${total}* has an outstanding balance of *₹${due}*${dueDate}.\n\n` +
        `Please arrange payment at your earliest convenience.\n\n` +
        `Thank you for your business! 🙏`;

    const encoded = encodeURIComponent(message);
    const base = phone ? `https://wa.me/${phone.startsWith('91') ? phone : '91' + phone}` : 'https://wa.me/';
    return `${base}?text=${encoded}`;
}
