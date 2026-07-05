(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GST_RATES",
    ()=>GST_RATES,
    "INDIAN_STATES",
    ()=>INDIAN_STATES,
    "INVOICE_TYPE_LABELS",
    ()=>INVOICE_TYPE_LABELS,
    "PAYMENT_METHODS",
    ()=>PAYMENT_METHODS,
    "UNITS",
    ()=>UNITS,
    "amountInWords",
    ()=>amountInWords,
    "calcLineItem",
    ()=>calcLineItem,
    "cn",
    ()=>cn,
    "fetchHsnOnline",
    ()=>fetchHsnOnline,
    "formatDate",
    ()=>formatDate,
    "formatINR",
    ()=>formatINR,
    "formatShort",
    ()=>formatShort,
    "isOverdue",
    ()=>isOverdue,
    "predictStockDays",
    ()=>predictStockDays,
    "r2",
    ()=>r2,
    "roundOff",
    ()=>roundOff,
    "todayISO",
    ()=>todayISO
]);
const r2 = (n)=>Math.round(n * 100) / 100;
function calcLineItem(qty, rate, discount, gstRate, taxIncluded = false, cessRate = 0) {
    const baseAmt = qty * rate;
    const discAmt = r2(baseAmt * discount / 100);
    const postDiscount = r2(baseAmt - discAmt);
    let taxableAmt, totalGst;
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
        qty,
        rate,
        discount,
        discountAmt: discAmt,
        taxableAmt,
        totalGst,
        cgst: half,
        sgst: half,
        igst: 0,
        cess,
        amount: r2(amount)
    };
}
function roundOff(n) {
    const frac = n - Math.floor(n);
    return frac < 0.5 ? -r2(frac) : r2(1 - frac);
}
function formatINR(n) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2
    }).format(n);
}
function formatShort(n) {
    if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)}Cr`;
    if (n >= 100000) return `₹${(n / 100000).toFixed(2)}L`;
    if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
    return `₹${n.toFixed(0)}`;
}
function amountInWords(n) {
    const units = [
        '',
        'One',
        'Two',
        'Three',
        'Four',
        'Five',
        'Six',
        'Seven',
        'Eight',
        'Nine',
        'Ten',
        'Eleven',
        'Twelve',
        'Thirteen',
        'Fourteen',
        'Fifteen',
        'Sixteen',
        'Seventeen',
        'Eighteen',
        'Nineteen'
    ];
    const tens = [
        '',
        '',
        'Twenty',
        'Thirty',
        'Forty',
        'Fifty',
        'Sixty',
        'Seventy',
        'Eighty',
        'Ninety'
    ];
    const toWords = (num)=>{
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
function formatDate(d) {
    const dt = new Date(d);
    return dt.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}
function todayISO() {
    return new Date().toISOString().slice(0, 10);
}
function isOverdue(dueDate) {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
}
const INVOICE_TYPE_LABELS = {
    sale: 'Tax Invoice',
    purchase: 'Purchase Bill',
    sale_return: 'Credit Note',
    purchase_return: 'Debit Note',
    estimate: 'Estimate / Quotation',
    proforma: 'Proforma Invoice',
    delivery_challan: 'Delivery Challan',
    credit_note: 'Credit Note',
    debit_note: 'Debit Note'
};
const GST_RATES = [
    0,
    0.1,
    0.25,
    1,
    1.5,
    3,
    5,
    7.5,
    12,
    18,
    28
];
const UNITS = [
    'pcs',
    'kg',
    'g',
    'mg',
    'l',
    'ml',
    'box',
    'pack',
    'dozen',
    'pair',
    'set',
    'bag',
    'can',
    'bottle',
    'sachet',
    'roll',
    'meter',
    'sqft'
];
const INDIAN_STATES = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Delhi',
    'Puducherry',
    'Chandigarh',
    'Jammu & Kashmir',
    'Ladakh'
];
const PAYMENT_METHODS = [
    {
        value: 'cash',
        label: 'Cash',
        emoji: '💵'
    },
    {
        value: 'upi',
        label: 'UPI',
        emoji: '📱'
    },
    {
        value: 'bank',
        label: 'Bank Transfer',
        emoji: '🏦'
    },
    {
        value: 'card',
        label: 'Card',
        emoji: '💳'
    },
    {
        value: 'cheque',
        label: 'Cheque',
        emoji: '📄'
    },
    {
        value: 'credit',
        label: 'Credit',
        emoji: '🤝'
    },
    {
        value: 'neft',
        label: 'NEFT',
        emoji: '🔄'
    },
    {
        value: 'rtgs',
        label: 'RTGS',
        emoji: '⚡'
    }
];
async function fetchHsnOnline(code) {
    try {
        // Using Open Government Data API (India) — no key needed
        const res = await fetch(`https://data.gov.in/api/datastore/resource.json?resource_id=6b6e3b52-6c9f-4b7b-9a3f-9e4b4f4b6e3b&filters[hsn_code]=${code}&limit=1`, {
            signal: AbortSignal.timeout(4000)
        });
        if (res.ok) {
            const data = await res.json();
            if (data.records?.[0]) {
                return {
                    description: data.records[0].commodity_description || '',
                    gstRate: parseFloat(data.records[0].gst_rate) || 0
                };
            }
        }
    } catch (e) {}
    // Fallback: well-known HSN codes
    const known = {
        '0101': {
            description: 'Live horses, asses, mules',
            gstRate: 0
        },
        '1006': {
            description: 'Rice',
            gstRate: 5
        },
        '1001': {
            description: 'Wheat',
            gstRate: 5
        },
        '0402': {
            description: 'Milk, cream, concentrated',
            gstRate: 5
        },
        '1701': {
            description: 'Cane sugar / beet sugar',
            gstRate: 5
        },
        '2106': {
            description: 'Food preparations NEC',
            gstRate: 18
        },
        '2106909': {
            description: 'Ready-to-eat food',
            gstRate: 12
        },
        '0804': {
            description: 'Dates, figs, pineapples, avocados (fresh/dried)',
            gstRate: 0
        },
        '0901': {
            description: 'Coffee',
            gstRate: 5
        },
        '0902': {
            description: 'Tea',
            gstRate: 5
        },
        '2009': {
            description: 'Fruit juices',
            gstRate: 12
        },
        '3304': {
            description: 'Beauty/cosmetic preparations',
            gstRate: 18
        },
        '8517': {
            description: 'Telephone sets (smartphones)',
            gstRate: 18
        },
        '8528': {
            description: 'Televisions',
            gstRate: 28
        },
        '4403': {
            description: 'Wood lumber',
            gstRate: 12
        },
        '6211': {
            description: 'Track suits / garments',
            gstRate: 12
        },
        '9403': {
            description: 'Other furniture',
            gstRate: 18
        }
    };
    return known[code] ?? null;
}
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
function predictStockDays(stockQty, invoices, productId) {
    // Look at last 30 days of sales
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    let totalSold = 0;
    invoices.filter((i)=>i.invoiceType === 'sale' && new Date(i.date) >= thirtyDaysAgo).forEach((inv)=>{
        inv.items.forEach((it)=>{
            if (it.productId === productId) totalSold += it.qty;
        });
    });
    if (totalSold === 0) return null; // No sales data
    const dailyAvg = totalSold / 30;
    return Math.floor(stockQty / dailyAvg);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/InvoicePrintTemplate.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InvoicePrintTemplate",
    ()=>InvoicePrintTemplate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$barcode$2f$lib$2f$react$2d$barcode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-barcode/lib/react-barcode.js [app-client] (ecmascript)");
;
;
;
;
const InvoicePrintTemplate = ({ invoice, company, copies = 1, previewMode = false, themeOverride })=>{
    if (!invoice) return null;
    const theme = themeOverride || company?.templateTheme || 'classic';
    const showColumns = company?.templateColumns || {
        sn: true,
        hsn: true,
        discount: true,
        tax: true,
        rate: true
    };
    const showQrCode = invoice.paymentStatus !== 'paid' && company?.bankDetails?.upiId && company?.templateColumns?.showQrCode !== false;
    const labels = company?.customLabels || {};
    const upiLink = showQrCode ? `upi://pay?pa=${company.bankDetails.upiId}&pn=${encodeURIComponent(company.name)}&am=${invoice.grandTotal.toFixed(2)}&cu=INR` : null;
    const qrUrl = upiLink ? `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(upiLink)}` : null;
    const lTitle = labels.invoiceTitle || 'INVOICE';
    const lNo = labels.invoiceNo || 'Invoice No';
    const lDate = labels.date || 'Date';
    const lDueDate = labels.dueDate || 'Due Date';
    const lBilledTo = labels.billedTo || 'Billed To';
    const lPayment = labels.paymentMethod || 'Payment Method';
    const defaultFooter = labels.footerTerms || 'Thank you for your business!';
    const FooterBrand = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "invoice-footer",
            style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                paddingTop: 20,
                borderTop: '3px solid #E2E8F0',
                paddingBottom: 10,
                pageBreakInside: 'avoid',
                background: 'transparent'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 11,
                                color: '#A0AEC0',
                                marginBottom: 16
                            },
                            children: defaultFooter
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 27,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "32",
                                    height: "32",
                                    viewBox: "0 0 100 100",
                                    fill: "none",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M10 25 h15 a5 5 0 0 1 4.5 3 l4 12",
                                            stroke: "#34A853",
                                            strokeWidth: "8",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 30,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M28 40 h26 v22 h-20 z",
                                            fill: "#34A853"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 31,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M54 40 h24 a8 8 0 0 1 8 8 v14 h-32 z",
                                            fill: "#FBBC04"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 32,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M34 62 h20 v20 h-10 a10 10 0 0 1 -10 -10 z",
                                            fill: "#4285F4"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 33,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M54 62 h32 v10 a10 10 0 0 1 -10 10 h-22 z",
                                            fill: "#EA4335"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 34,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "42",
                                            cy: "88",
                                            r: "7",
                                            fill: "#4285F4"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 35,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "70",
                                            cy: "88",
                                            r: "7",
                                            fill: "#4285F4"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 36,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 29,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 24,
                                        fontWeight: 900,
                                        letterSpacing: '-1px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontFamily: "'Inter', sans-serif"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: '#EA4335'
                                            },
                                            children: "E"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 39,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: '#34A853'
                                            },
                                            children: "d"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 40,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: '#FBBC04'
                                            },
                                            children: "i"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 41,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: '#4285F4'
                                            },
                                            children: "b"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 42,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: '#34A853'
                                            },
                                            children: "i"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 43,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: '#EA4335'
                                            },
                                            children: "o"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 44,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 38,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 28,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 26,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        paddingBottom: 4
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$barcode$2f$lib$2f$react$2d$barcode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        value: invoice.invoiceNumber || 'INV-000',
                        width: 1.2,
                        height: 40,
                        fontSize: 12,
                        fontWeight: "bold",
                        displayValue: true,
                        margin: 0,
                        background: "transparent"
                    }, void 0, false, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 49,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 48,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 25,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    const ItemsTableModern = ({ headerColor, textColor = 'white' })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            style: {
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: 13
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        style: {
                            background: headerColor,
                            color: textColor
                        },
                        children: [
                            showColumns.sn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                style: {
                                    textAlign: 'left',
                                    padding: '12px 14px',
                                    borderTopLeftRadius: 6,
                                    borderBottomLeftRadius: 6
                                },
                                children: "SN"
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 59,
                                columnNumber: 40
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                style: {
                                    textAlign: 'left',
                                    padding: '12px 14px'
                                },
                                children: "Item Description"
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 60,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            showColumns.rate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                style: {
                                    textAlign: 'right',
                                    padding: '12px 14px'
                                },
                                children: "Rate"
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 61,
                                columnNumber: 42
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                style: {
                                    textAlign: 'center',
                                    padding: '12px 14px'
                                },
                                children: "Qty"
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 62,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                style: {
                                    textAlign: 'right',
                                    padding: '12px 14px',
                                    borderTopRightRadius: 6,
                                    borderBottomRightRadius: 6
                                },
                                children: "Amount"
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 63,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 58,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 57,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                    children: invoice.items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            style: {
                                borderBottom: '1px solid #E2E8F0',
                                color: '#1A202C'
                            },
                            children: [
                                showColumns.sn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    style: {
                                        padding: '16px 14px',
                                        color: '#718096'
                                    },
                                    children: i + 1
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 69,
                                    columnNumber: 44
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    style: {
                                        padding: '16px 14px',
                                        fontWeight: 700
                                    },
                                    children: item.name
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 70,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                showColumns.rate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    style: {
                                        padding: '16px 14px',
                                        textAlign: 'right'
                                    },
                                    children: item.rate.toFixed(2)
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 71,
                                    columnNumber: 46
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    style: {
                                        padding: '16px 14px',
                                        textAlign: 'center',
                                        fontWeight: 600
                                    },
                                    children: [
                                        item.qty,
                                        " ",
                                        item.unit
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 72,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    style: {
                                        padding: '16px 14px',
                                        textAlign: 'right',
                                        fontWeight: 900
                                    },
                                    children: item.amount.toFixed(2)
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 73,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, i, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 68,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 66,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 56,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    const TotalsBlock = ()=>{
        const gstHalf = invoice.totalGst > 0 ? invoice.totalGst / 2 : 0;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginTop: 16
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: qrUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '10px',
                            background: 'white',
                            borderRadius: 8,
                            border: '1px solid #E2E8F0',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: 'fit-content'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: qrUrl,
                                alt: "UPI QR Code",
                                style: {
                                    width: 100,
                                    height: 100,
                                    marginBottom: 4
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 87,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 10,
                                    fontWeight: 800,
                                    color: '#4A5568'
                                },
                                children: "SCAN TO PAY"
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 88,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 86,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 84,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "totals-block",
                    style: {
                        width: '100%',
                        maxWidth: 280,
                        fontSize: 13,
                        background: 'transparent',
                        padding: '16px 0',
                        borderRadius: 8
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: 8
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: '#4A5568'
                                    },
                                    children: "Subtotal"
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 94,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontWeight: 700
                                    },
                                    children: [
                                        "₹",
                                        invoice.subTotal.toFixed(2)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 95,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 93,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        invoice.totalGst > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: 4
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: '#4A5568',
                                                fontSize: 12
                                            },
                                            children: "CGST"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 100,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontWeight: 600,
                                                fontSize: 12
                                            },
                                            children: [
                                                "+₹",
                                                gstHalf.toFixed(2)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 101,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 99,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: 8
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: '#4A5568',
                                                fontSize: 12
                                            },
                                            children: "SGST"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 104,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontWeight: 600,
                                                fontSize: 12
                                            },
                                            children: [
                                                "+₹",
                                                gstHalf.toFixed(2)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 105,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 103,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true),
                        invoice.roundOff !== 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: 8
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: '#4A5568'
                                    },
                                    children: "Round Off"
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 110,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontWeight: 700
                                    },
                                    children: [
                                        invoice.roundOff > 0 ? '+' : '',
                                        "₹",
                                        invoice.roundOff.toFixed(2)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 111,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 109,
                            columnNumber: 48
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginTop: 12,
                                paddingTop: 12,
                                borderTop: '2px dashed #E2E8F0'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontWeight: 900,
                                        fontSize: 18
                                    },
                                    children: "Total"
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 114,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontWeight: 900,
                                        fontSize: 18,
                                        color: '#2D3748'
                                    },
                                    children: [
                                        "₹",
                                        invoice.grandTotal.toLocaleString('en-IN', {
                                            minimumFractionDigits: 2
                                        })
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 115,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 113,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 10,
                                color: '#A0AEC0',
                                fontStyle: 'italic',
                                textAlign: 'right',
                                marginTop: 6,
                                lineHeight: 1.4
                            },
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["amountInWords"])(invoice.grandTotal)
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 117,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 92,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 83,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0));
    };
    // ==========================================
    // THEME 1: CLASSIC (Traditional & Professional)
    // ==========================================
    const renderClassic = (copyIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                fontFamily: 'Arial, sans-serif',
                width: '100%',
                maxWidth: '210mm',
                minHeight: '100vh',
                margin: '0 auto',
                background: 'white',
                color: 'black',
                position: 'relative',
                overflow: 'hidden',
                padding: '40px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        textAlign: 'center',
                        marginBottom: 24,
                        borderBottom: '2px solid black',
                        paddingBottom: 16,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    },
                    children: [
                        company?.logo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: company.logo,
                            alt: "Logo",
                            style: {
                                height: 60,
                                objectFit: 'contain',
                                marginBottom: 8
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 131,
                            columnNumber: 35
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            style: {
                                fontSize: 26,
                                fontWeight: 'bold',
                                margin: '0 0 8px 0',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            },
                            children: company?.name || 'Company Name'
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 132,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 12,
                                margin: '0 0 4px 0'
                            },
                            children: [
                                company?.address || 'Address Line 1',
                                ", ",
                                company?.city || 'City'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 133,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 12,
                                margin: '0 0 4px 0'
                            },
                            children: [
                                "Phone: ",
                                company?.phone || 'N/A'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 134,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        company?.gstNumber && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 12,
                                margin: '0 0 4px 0',
                                fontWeight: 'bold'
                            },
                            children: [
                                "GSTIN: ",
                                company.gstNumber
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 135,
                            columnNumber: 40
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 130,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        textAlign: 'center',
                        marginBottom: 24
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: {
                            fontSize: 18,
                            fontWeight: 'bold',
                            textDecoration: 'underline',
                            textTransform: 'uppercase',
                            margin: 0
                        },
                        children: lTitle
                    }, void 0, false, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 139,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 138,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 24,
                        fontSize: 12,
                        border: '1px solid black',
                        padding: 12
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                flex: 1
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        margin: '0 0 6px',
                                        fontWeight: 'bold'
                                    },
                                    children: [
                                        lBilledTo,
                                        ":"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 144,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        margin: '0 0 4px'
                                    },
                                    children: invoice.partyName || 'Cash Customer'
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 145,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                invoice.partyPhone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        margin: '0 0 4px'
                                    },
                                    children: [
                                        "Phone: ",
                                        invoice.partyPhone
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 146,
                                    columnNumber: 44
                                }, ("TURBOPACK compile-time value", void 0)),
                                invoice.billingAddress && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        margin: '0 0 4px'
                                    },
                                    children: [
                                        "Address: ",
                                        invoice.billingAddress
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 147,
                                    columnNumber: 48
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 143,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                flex: 1,
                                textAlign: 'right'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                style: {
                                    width: '100%',
                                    maxWidth: 220,
                                    marginLeft: 'auto'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        fontWeight: 'bold',
                                                        textAlign: 'left',
                                                        padding: '2px 0'
                                                    },
                                                    children: [
                                                        lNo,
                                                        ":"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 152,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        textAlign: 'right'
                                                    },
                                                    children: invoice.invoiceNumber
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 152,
                                                    columnNumber: 116
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 152,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        fontWeight: 'bold',
                                                        textAlign: 'left',
                                                        padding: '2px 0'
                                                    },
                                                    children: [
                                                        lDate,
                                                        ":"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 153,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        textAlign: 'right'
                                                    },
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(invoice.date)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 153,
                                                    columnNumber: 118
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 153,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        fontWeight: 'bold',
                                                        textAlign: 'left',
                                                        padding: '2px 0'
                                                    },
                                                    children: [
                                                        lPayment,
                                                        ":"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 154,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        textAlign: 'right'
                                                    },
                                                    children: invoice.paymentMethod || 'Cash'
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 154,
                                                    columnNumber: 121
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 154,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 151,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 150,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 149,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 142,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    style: {
                        width: '100%',
                        borderCollapse: 'collapse',
                        fontSize: 13,
                        border: '1px solid black'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                style: {
                                    background: '#f5f5f5'
                                },
                                children: [
                                    showColumns.sn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            border: '1px solid black',
                                            padding: '12px 4px',
                                            textAlign: 'center'
                                        },
                                        children: "SN"
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 163,
                                        columnNumber: 44
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            border: '1px solid black',
                                            padding: '12px 10px',
                                            textAlign: 'left'
                                        },
                                        children: "Description of Goods"
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 164,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    showColumns.rate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            border: '1px solid black',
                                            padding: '12px 4px',
                                            textAlign: 'right'
                                        },
                                        children: "Rate"
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 165,
                                        columnNumber: 46
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            border: '1px solid black',
                                            padding: '12px 4px',
                                            textAlign: 'center'
                                        },
                                        children: "Qty"
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 166,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            border: '1px solid black',
                                            padding: '12px 10px',
                                            textAlign: 'right'
                                        },
                                        children: "Amount"
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 167,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 162,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 161,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: invoice.items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        showColumns.sn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                border: '1px solid black',
                                                padding: '12px 4px',
                                                textAlign: 'center'
                                            },
                                            children: i + 1
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 173,
                                            columnNumber: 48
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                border: '1px solid black',
                                                padding: '12px 10px',
                                                fontWeight: 'bold'
                                            },
                                            children: item.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 174,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        showColumns.rate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                border: '1px solid black',
                                                padding: '12px 4px',
                                                textAlign: 'right'
                                            },
                                            children: item.rate.toFixed(2)
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 175,
                                            columnNumber: 50
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                border: '1px solid black',
                                                padding: '12px 4px',
                                                textAlign: 'center'
                                            },
                                            children: [
                                                item.qty,
                                                " ",
                                                item.unit
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 176,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                border: '1px solid black',
                                                padding: '12px 10px',
                                                textAlign: 'right',
                                                fontWeight: 'bold'
                                            },
                                            children: item.amount.toFixed(2)
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 177,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, i, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 172,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 170,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 160,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: 16
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: '45%'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        margin: '0 0 8px',
                                        fontSize: 11,
                                        fontStyle: 'italic'
                                    },
                                    children: [
                                        "Amount in Words: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 185,
                                            columnNumber: 106
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["amountInWords"])(invoice.grandTotal)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 185,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        border: '1px solid black',
                                        padding: 8,
                                        marginTop: 16
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                margin: '0 0 4px',
                                                fontWeight: 'bold',
                                                fontSize: 11
                                            },
                                            children: "Terms & Conditions:"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 187,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                margin: 0,
                                                fontSize: 10,
                                                whiteSpace: 'pre-wrap'
                                            },
                                            children: invoice.notes || defaultFooter
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 188,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 186,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 184,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: '40%'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                style: {
                                    width: '100%',
                                    borderCollapse: 'collapse',
                                    fontSize: 13
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '6px 8px',
                                                        border: '1px solid black',
                                                        fontWeight: 'bold'
                                                    },
                                                    children: "Subtotal"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 194,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '6px 8px',
                                                        border: '1px solid black',
                                                        textAlign: 'right'
                                                    },
                                                    children: invoice.subTotal.toFixed(2)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 194,
                                                    columnNumber: 128
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 194,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        invoice.totalGst > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                padding: '4px 8px',
                                                                border: '1px solid black',
                                                                fontSize: 11
                                                            },
                                                            children: "CGST"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                            lineNumber: 197,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                padding: '4px 8px',
                                                                border: '1px solid black',
                                                                textAlign: 'right',
                                                                fontSize: 11
                                                            },
                                                            children: [
                                                                "+",
                                                                (invoice.totalGst / 2).toFixed(2)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                            lineNumber: 197,
                                                            columnNumber: 126
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 197,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                padding: '4px 8px',
                                                                border: '1px solid black',
                                                                fontSize: 11
                                                            },
                                                            children: "SGST"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                            lineNumber: 198,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                padding: '4px 8px',
                                                                border: '1px solid black',
                                                                textAlign: 'right',
                                                                fontSize: 11
                                                            },
                                                            children: [
                                                                "+",
                                                                (invoice.totalGst / 2).toFixed(2)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                            lineNumber: 198,
                                                            columnNumber: 126
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 198,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true),
                                        invoice.roundOff !== 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '6px 8px',
                                                        border: '1px solid black'
                                                    },
                                                    children: "Round Off"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 201,
                                                    columnNumber: 60
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '6px 8px',
                                                        border: '1px solid black',
                                                        textAlign: 'right'
                                                    },
                                                    children: invoice.roundOff.toFixed(2)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 201,
                                                    columnNumber: 136
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 201,
                                            columnNumber: 56
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '8px 8px',
                                                        border: '1px solid black',
                                                        fontWeight: 'bold',
                                                        fontSize: 16
                                                    },
                                                    children: "Grand Total"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 202,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '8px 8px',
                                                        border: '1px solid black',
                                                        textAlign: 'right',
                                                        fontWeight: 'bold',
                                                        fontSize: 16
                                                    },
                                                    children: [
                                                        "₹",
                                                        invoice.grandTotal.toLocaleString('en-IN', {
                                                            minimumFractionDigits: 2
                                                        })
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 202,
                                                    columnNumber: 145
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 202,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 193,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 192,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 191,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 183,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterBrand, {}, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 208,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, copyIndex, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 129,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    // ==========================================
    // THEME 2: CREATIVE (Dark Left Column)
    // ==========================================
    const renderCreative = (copyIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "theme-container theme-creative",
            style: {
                fontFamily: "'Inter', sans-serif",
                width: '100%',
                maxWidth: '210mm',
                minHeight: '100vh',
                margin: '0 auto',
                background: '#F8FAFC',
                color: '#1A202C',
                position: 'relative',
                overflow: 'hidden',
                padding: '24px',
                boxSizing: 'border-box',
                WebkitPrintColorAdjust: 'exact',
                printColorAdjust: 'exact',
                display: 'flex',
                flexDirection: 'column'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "creative-layout",
                style: {
                    display: 'flex',
                    gap: 24,
                    flexWrap: 'wrap'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "creative-sidebar",
                        style: {
                            width: 130,
                            flexShrink: 0,
                            background: '#1A202C',
                            color: 'white',
                            padding: '40px 16px 24px',
                            borderRadius: '12px',
                            wordBreak: 'break-word'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: '#A0AEC0',
                                    marginBottom: 2
                                },
                                children: lDate
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 219,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 12,
                                    fontWeight: 600,
                                    marginBottom: 20
                                },
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(invoice.date)
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 220,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: '#A0AEC0',
                                    marginBottom: 2
                                },
                                children: lDueDate
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 221,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 12,
                                    fontWeight: 600,
                                    marginBottom: 32
                                },
                                children: invoice.paymentStatus === 'paid' ? 'Paid' : 'Upon Receipt'
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 222,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 24,
                                    height: 1,
                                    background: '#4A5568',
                                    marginBottom: 32
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 223,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: '#A0AEC0',
                                    marginBottom: 2
                                },
                                children: lBilledTo
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 224,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 13,
                                    fontWeight: 700,
                                    marginBottom: 6
                                },
                                children: invoice.partyName || 'Cash Customer'
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 225,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 11,
                                    color: '#CBD5E0',
                                    lineHeight: 1.5
                                },
                                children: [
                                    invoice.partyPhone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            invoice.partyPhone,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 226,
                                                columnNumber: 129
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true),
                                    invoice.billingAddress
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 226,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 218,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            minWidth: 280,
                            paddingTop: 0,
                            display: 'flex',
                            flexDirection: 'column'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: 'right',
                                    marginBottom: 20,
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    gap: 16
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            textAlign: 'right'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 20,
                                                    fontWeight: 900,
                                                    margin: '0 0 4px 0'
                                                },
                                                children: company?.name || 'Your Company Name'
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 231,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 11,
                                                    color: '#718096',
                                                    margin: 0
                                                },
                                                children: company?.city
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 232,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 11,
                                                    color: '#718096',
                                                    margin: 0
                                                },
                                                children: company?.phone
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 233,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 11,
                                                    color: '#718096',
                                                    margin: 0
                                                },
                                                children: company?.gstNumber ? `GSTIN: ${company.gstNumber}` : ''
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 234,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 230,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    company?.logo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: company.logo,
                                        alt: "Logo",
                                        style: {
                                            height: 50,
                                            objectFit: 'contain'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 236,
                                        columnNumber: 43
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 229,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontSize: 36,
                                    fontWeight: 900,
                                    margin: '10px 0 0',
                                    letterSpacing: '-1px'
                                },
                                children: lTitle
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 238,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: '#A0AEC0',
                                    marginBottom: 24
                                },
                                children: [
                                    "#",
                                    invoice.invoiceNumber
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 239,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: 'white',
                                    minHeight: 200,
                                    padding: '24px',
                                    borderRadius: 12,
                                    borderTop: '4px solid #1A202C',
                                    overflowX: 'auto'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ItemsTableModern, {
                                        headerColor: "#F7FAFC",
                                        textColor: "#4A5568"
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 241,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TotalsBlock, {}, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 242,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: 24,
                                            paddingTop: 16,
                                            borderTop: '1px solid #E2E8F0'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 11,
                                                color: '#A0AEC0',
                                                whiteSpace: 'pre-wrap'
                                            },
                                            children: invoice.notes || defaultFooter
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 244,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 243,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 240,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: 'auto',
                                    paddingTop: 40
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterBrand, {}, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 249,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 248,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 228,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                lineNumber: 217,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        }, copyIndex, false, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 216,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    // ==========================================
    // THEME 3: MODERN EDGE (Blue Accents)
    // ==========================================
    const renderModern = (copyIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                fontFamily: "'Inter', sans-serif",
                width: '100%',
                maxWidth: '210mm',
                minHeight: '100vh',
                margin: '0 auto',
                background: 'white',
                color: '#2D3748',
                position: 'relative',
                overflow: 'hidden',
                padding: '0 0 24px 0',
                boxSizing: 'border-box',
                WebkitPrintColorAdjust: 'exact',
                printColorAdjust: 'exact',
                display: 'flex',
                flexDirection: 'column'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        background: '#4285F4',
                        color: 'white',
                        padding: '40px 40px',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    style: {
                                        fontSize: 40,
                                        fontWeight: 900,
                                        margin: '0 0 8px 0',
                                        letterSpacing: '-1px'
                                    },
                                    children: lTitle
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 263,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 15,
                                        margin: 0,
                                        opacity: 0.9
                                    },
                                    children: [
                                        lNo,
                                        ": ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                            children: invoice.invoiceNumber
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 264,
                                            columnNumber: 81
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 264,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 262,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'right',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 16
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        textAlign: 'right'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 22,
                                                fontWeight: 800,
                                                margin: '0 0 4px 0'
                                            },
                                            children: company?.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 268,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 12,
                                                margin: 0,
                                                opacity: 0.8
                                            },
                                            children: [
                                                company?.address,
                                                ", ",
                                                company?.city
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 269,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 12,
                                                margin: 0,
                                                opacity: 0.8
                                            },
                                            children: company?.phone
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 270,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        company?.gstNumber && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 12,
                                                margin: 0,
                                                opacity: 0.8
                                            },
                                            children: [
                                                "GSTIN: ",
                                                company.gstNumber
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 271,
                                            columnNumber: 48
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 267,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                company?.logo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: company.logo,
                                    alt: "Logo",
                                    style: {
                                        height: 60,
                                        objectFit: 'contain',
                                        background: 'white',
                                        padding: 4,
                                        borderRadius: 8
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 273,
                                    columnNumber: 39
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 266,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 261,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '40px 40px',
                        display: 'flex',
                        justifyContent: 'space-between'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 12,
                                        fontWeight: 800,
                                        color: '#4285F4',
                                        textTransform: 'uppercase',
                                        marginBottom: 8,
                                        margin: 0
                                    },
                                    children: lBilledTo
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 279,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 16,
                                        fontWeight: 800,
                                        margin: '0 0 4px 0'
                                    },
                                    children: invoice.partyName || 'Cash Customer'
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 280,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 13,
                                        color: '#718096',
                                        margin: 0
                                    },
                                    children: invoice.partyPhone
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 281,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 13,
                                        color: '#718096',
                                        margin: 0
                                    },
                                    children: invoice.billingAddress
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 282,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 278,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'right',
                                display: 'flex',
                                gap: 40
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 12,
                                                fontWeight: 800,
                                                color: '#4285F4',
                                                textTransform: 'uppercase',
                                                marginBottom: 8,
                                                margin: 0
                                            },
                                            children: lDate
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 286,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 15,
                                                fontWeight: 700,
                                                margin: 0
                                            },
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(invoice.date)
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 287,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 285,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 12,
                                                fontWeight: 800,
                                                color: '#4285F4',
                                                textTransform: 'uppercase',
                                                marginBottom: 8,
                                                margin: 0
                                            },
                                            children: lPayment
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 290,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 15,
                                                fontWeight: 700,
                                                margin: 0
                                            },
                                            children: invoice.paymentMethod || 'Cash'
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 291,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 289,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 284,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 277,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '0 40px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ItemsTableModern, {
                            headerColor: "#E8F0FE",
                            textColor: "#1967D2"
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 297,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TotalsBlock, {}, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 298,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginTop: 40,
                                padding: 24,
                                background: '#F8FAFC',
                                borderRadius: 8,
                                borderLeft: '4px solid #4285F4'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 12,
                                        fontWeight: 800,
                                        color: '#4285F4',
                                        margin: '0 0 8px 0'
                                    },
                                    children: "Terms & Remarks"
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 300,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 12,
                                        color: '#4A5568',
                                        margin: 0,
                                        whiteSpace: 'pre-wrap'
                                    },
                                    children: invoice.notes || defaultFooter
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 301,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 299,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 296,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '0 40px',
                        marginTop: 'auto'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterBrand, {}, void 0, false, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 306,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 305,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, copyIndex, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 260,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    // ==========================================
    // THEME 4: WAVES (Playful & Smooth)
    // ==========================================
    const renderWaves = (copyIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                fontFamily: "'Inter', sans-serif",
                width: '100%',
                maxWidth: '210mm',
                minHeight: '100vh',
                margin: '0 auto',
                background: '#FAFAFA',
                color: '#1A202C',
                position: 'relative',
                overflow: 'hidden',
                padding: '0 0 24px 0',
                boxSizing: 'border-box',
                WebkitPrintColorAdjust: 'exact',
                printColorAdjust: 'exact',
                display: 'flex',
                flexDirection: 'column'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
                        color: 'white',
                        padding: '40px 40px 60px',
                        borderBottomLeftRadius: '50% 20%',
                        borderBottomRightRadius: '50% 20%'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 280,
                                    background: 'rgba(255,255,255,0.2)',
                                    padding: 20,
                                    borderRadius: 16,
                                    backdropFilter: 'blur(10px)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12
                                },
                                children: [
                                    company?.logo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: company.logo,
                                        alt: "Logo",
                                        style: {
                                            height: 40,
                                            objectFit: 'contain',
                                            background: 'white',
                                            padding: 4,
                                            borderRadius: 8
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 319,
                                        columnNumber: 43
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 16,
                                                    fontWeight: 900,
                                                    margin: '0 0 4px 0'
                                                },
                                                children: company?.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 321,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 11,
                                                    margin: 0
                                                },
                                                children: [
                                                    company?.city,
                                                    " • ",
                                                    company?.phone
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 322,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 320,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 318,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: 'right'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        style: {
                                            fontSize: 32,
                                            fontWeight: 900,
                                            margin: '0 0 4px 0',
                                            textShadow: '0 2px 10px rgba(0,0,0,0.1)'
                                        },
                                        children: lTitle
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 326,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 16,
                                            fontWeight: 700,
                                            margin: 0
                                        },
                                        children: [
                                            lNo,
                                            ": ",
                                            invoice.invoiceNumber
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 327,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 325,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 317,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 316,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '40px',
                        marginTop: -20
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                gap: 24,
                                marginBottom: 32
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        flex: 1,
                                        background: 'white',
                                        padding: 20,
                                        borderRadius: 16,
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 11,
                                                color: '#A0AEC0',
                                                textTransform: 'uppercase',
                                                fontWeight: 800,
                                                margin: '0 0 8px 0'
                                            },
                                            children: lBilledTo
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 335,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 16,
                                                fontWeight: 800,
                                                margin: '0 0 4px 0',
                                                color: '#2D3748'
                                            },
                                            children: invoice.partyName || 'Cash / Walk-in Customer'
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 336,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 13,
                                                color: '#718096',
                                                margin: 0
                                            },
                                            children: invoice.partyPhone
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 337,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 334,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        flex: 1,
                                        background: 'white',
                                        padding: 20,
                                        borderRadius: 16,
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 12
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 12,
                                                        color: '#A0AEC0',
                                                        fontWeight: 800
                                                    },
                                                    children: lDate
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 341,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 14,
                                                        fontWeight: 700
                                                    },
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(invoice.date)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 342,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 340,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 12,
                                                        color: '#A0AEC0',
                                                        fontWeight: 800
                                                    },
                                                    children: lPayment
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 345,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 14,
                                                        fontWeight: 700
                                                    },
                                                    children: invoice.paymentMethod || 'Cash'
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 346,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 344,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 339,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 333,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                background: 'white',
                                padding: 24,
                                borderRadius: 16,
                                boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ItemsTableModern, {
                                    headerColor: "#FFF5F5",
                                    textColor: "#E53E3E"
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 352,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TotalsBlock, {}, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 353,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 351,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginTop: 24,
                                textAlign: 'center'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 11,
                                    color: '#718096',
                                    fontStyle: 'italic'
                                },
                                children: invoice.notes || defaultFooter
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 357,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 356,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 332,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '0 40px',
                        marginTop: 'auto'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterBrand, {}, void 0, false, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 362,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 361,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, copyIndex, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 315,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    // ==========================================
    // THEME 5: QUICK BILL (Simple, Space-efficient)
    // ==========================================
    const renderQuickBill = (titleIndex)=>{
        const titles = [
            'ORIGINAL FOR RECIPIENT',
            'DUPLICATE FOR SUPPLIER',
            'TRIPLICATE FOR TRANSPORT'
        ];
        const printTitle = titles[titleIndex] || titles[0];
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                padding: '40px',
                background: 'white',
                color: 'black',
                fontFamily: 'Arial, sans-serif',
                width: '100%',
                maxWidth: '210mm',
                minHeight: '100vh',
                margin: '0 auto',
                boxSizing: 'border-box',
                position: 'relative'
            },
            children: [
                previewMode ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        textAlign: 'center',
                        fontSize: 10,
                        fontWeight: 'bold',
                        border: '1px solid black',
                        display: 'inline-block',
                        padding: '2px 8px',
                        position: 'absolute',
                        top: 40,
                        right: 40,
                        textTransform: 'uppercase'
                    },
                    children: printTitle
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 376,
                    columnNumber: 39
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        textAlign: 'center',
                        marginBottom: 20
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            style: {
                                fontSize: 24,
                                fontWeight: 'bold',
                                margin: 0,
                                textTransform: 'uppercase'
                            },
                            children: company?.name || 'Tax Invoice'
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 379,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 12,
                                margin: '4px 0 0'
                            },
                            children: [
                                company?.address || 'Shop Address',
                                ", ",
                                company?.city || ''
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 380,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 12,
                                margin: '2px 0 0'
                            },
                            children: [
                                "Phone: ",
                                company?.phone,
                                " ",
                                company?.gstNumber ? `| GSTIN: ${company?.gstNumber}` : ''
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 381,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 378,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderTop: '2px solid black',
                        borderBottom: '2px solid black',
                        padding: '10px 0',
                        fontSize: 12
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                            children: [
                                                lBilledTo,
                                                ":"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 386,
                                            columnNumber: 28
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " ",
                                        invoice.partyName || 'Cash / Walk-in'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 386,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                invoice.partyPhone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "Phone: ",
                                        invoice.partyPhone
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 387,
                                    columnNumber: 48
                                }, ("TURBOPACK compile-time value", void 0)),
                                invoice.billingAddress && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "Address: ",
                                        invoice.billingAddress
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 388,
                                    columnNumber: 52
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 385,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'right'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                            children: [
                                                lNo,
                                                ":"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 391,
                                            columnNumber: 28
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " ",
                                        invoice.invoiceNumber
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 391,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                            children: [
                                                lDate,
                                                ":"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 392,
                                            columnNumber: 28
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " ",
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(invoice.date)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 392,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                invoice.stateOfSupply && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                            children: "State of Supply:"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 393,
                                            columnNumber: 54
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " ",
                                        invoice.stateOfSupply
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 393,
                                    columnNumber: 51
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 390,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 384,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    style: {
                        width: '100%',
                        borderCollapse: 'collapse',
                        marginTop: 16,
                        fontSize: 12
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                style: {
                                    borderBottom: '1px solid black'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            textAlign: 'left',
                                            padding: '8px 4px'
                                        },
                                        children: "SN"
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 400,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            textAlign: 'left',
                                            padding: '8px 4px'
                                        },
                                        children: "Description of Goods"
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 401,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    showColumns.hsn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            textAlign: 'center',
                                            padding: '8px 4px'
                                        },
                                        children: "HSN"
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 402,
                                        columnNumber: 49
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            textAlign: 'right',
                                            padding: '8px 4px'
                                        },
                                        children: "Qty"
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 403,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    showColumns.rate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            textAlign: 'right',
                                            padding: '8px 4px'
                                        },
                                        children: "Rate"
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 404,
                                        columnNumber: 50
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    showColumns.discount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            textAlign: 'right',
                                            padding: '8px 4px'
                                        },
                                        children: "Disc"
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 405,
                                        columnNumber: 54
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    showColumns.tax && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            textAlign: 'right',
                                            padding: '8px 4px'
                                        },
                                        children: "Tax"
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 406,
                                        columnNumber: 49
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            textAlign: 'right',
                                            padding: '8px 4px'
                                        },
                                        children: "Amount"
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 407,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 399,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 398,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: invoice.items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    style: {
                                        borderBottom: '1px solid #ddd'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: '8px 4px'
                                            },
                                            children: i + 1
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 413,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: '8px 4px'
                                            },
                                            children: item.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 414,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        showColumns.hsn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                textAlign: 'center',
                                                padding: '8px 4px'
                                            },
                                            children: item.hsnCode
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 415,
                                            columnNumber: 53
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                textAlign: 'right',
                                                padding: '8px 4px'
                                            },
                                            children: [
                                                item.qty,
                                                " ",
                                                item.unit
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 416,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        showColumns.rate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                textAlign: 'right',
                                                padding: '8px 4px'
                                            },
                                            children: item.rate.toFixed(2)
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 417,
                                            columnNumber: 54
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        showColumns.discount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                textAlign: 'right',
                                                padding: '8px 4px'
                                            },
                                            children: item.discountAmt.toFixed(2)
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 418,
                                            columnNumber: 58
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        showColumns.tax && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                textAlign: 'right',
                                                padding: '8px 4px'
                                            },
                                            children: item.totalGst.toFixed(2)
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 419,
                                            columnNumber: 53
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                textAlign: 'right',
                                                padding: '8px 4px'
                                            },
                                            children: item.amount.toFixed(2)
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 420,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, i, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 412,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 410,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 397,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: 20,
                        fontSize: 12
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        style: {
                            width: 300
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: "Sub Total:"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 429,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                textAlign: 'right'
                                            },
                                            children: invoice.subTotal.toFixed(2)
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 429,
                                            columnNumber: 52
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 429,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                invoice.totalDiscount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: "Discount:"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 430,
                                            columnNumber: 63
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                textAlign: 'right'
                                            },
                                            children: [
                                                "-",
                                                invoice.totalDiscount.toFixed(2)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 430,
                                            columnNumber: 81
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 430,
                                    columnNumber: 59
                                }, ("TURBOPACK compile-time value", void 0)),
                                invoice.totalGst > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: "GST:"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 431,
                                            columnNumber: 58
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                textAlign: 'right'
                                            },
                                            children: [
                                                "+",
                                                invoice.totalGst.toFixed(2)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 431,
                                            columnNumber: 71
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 431,
                                    columnNumber: 54
                                }, ("TURBOPACK compile-time value", void 0)),
                                invoice.roundOff !== 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: "Round Off:"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 432,
                                            columnNumber: 60
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                textAlign: 'right'
                                            },
                                            children: [
                                                invoice.roundOff > 0 ? '+' : '',
                                                invoice.roundOff.toFixed(2)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 432,
                                            columnNumber: 79
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 432,
                                    columnNumber: 56
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    style: {
                                        fontWeight: 'bold',
                                        fontSize: 14
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: "Grand Total:"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 433,
                                            columnNumber: 78
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                textAlign: 'right'
                                            },
                                            children: invoice.grandTotal.toLocaleString('en-IN', {
                                                minimumFractionDigits: 2
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 433,
                                            columnNumber: 99
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 433,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 428,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 427,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 426,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: 40,
                        fontSize: 11,
                        display: 'flex',
                        justifyContent: 'space-between'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "Terms & Conditions:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 440,
                                        columnNumber: 28
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 440,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "1. Goods once sold will not be taken back."
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 441,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "2. Subject to local jurisdiction."
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 442,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 439,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'center',
                                marginTop: 20
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "For ",
                                        company?.name
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 445,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        marginTop: 40
                                    },
                                    children: "Authorized Signatory"
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 446,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 444,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 438,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                previewMode ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        height: 40
                    }
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 449,
                    columnNumber: 39
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, titleIndex, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 375,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0));
    };
    // ==========================================
    // THEME 6: MINIMALIST (Clean & Spaced)
    // ==========================================
    const renderMinimalist = (copyIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                fontFamily: "'Inter', sans-serif",
                width: '100%',
                maxWidth: '210mm',
                minHeight: '100vh',
                margin: '0 auto',
                background: 'white',
                color: '#1A202C',
                position: 'relative',
                overflow: 'hidden',
                padding: '60px 50px',
                boxSizing: 'border-box',
                WebkitPrintColorAdjust: 'exact',
                printColorAdjust: 'exact',
                display: 'flex',
                flexDirection: 'column'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: 60
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    style: {
                                        fontSize: 28,
                                        fontWeight: 300,
                                        letterSpacing: '4px',
                                        margin: '0 0 16px 0',
                                        textTransform: 'uppercase',
                                        color: '#718096'
                                    },
                                    children: lTitle
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 461,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 13,
                                        margin: '0 0 4px',
                                        fontWeight: 600
                                    },
                                    children: [
                                        lNo,
                                        ": ",
                                        invoice.invoiceNumber
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 462,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 13,
                                        margin: 0,
                                        color: '#718096'
                                    },
                                    children: [
                                        lDate,
                                        ": ",
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(invoice.date)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 463,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 460,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'right'
                            },
                            children: [
                                company?.logo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: company.logo,
                                    alt: "Logo",
                                    style: {
                                        height: 40,
                                        objectFit: 'contain',
                                        marginBottom: 12
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 466,
                                    columnNumber: 38
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    style: {
                                        fontSize: 22,
                                        fontWeight: 800,
                                        margin: '0 0 12px 0'
                                    },
                                    children: company?.name
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 466,
                                    columnNumber: 141
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 12,
                                        margin: '0 0 4px',
                                        color: '#4A5568'
                                    },
                                    children: company?.address
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 467,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 12,
                                        margin: '0 0 4px',
                                        color: '#4A5568'
                                    },
                                    children: company?.city
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 468,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 12,
                                        margin: '0',
                                        color: '#4A5568'
                                    },
                                    children: company?.phone
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 469,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 465,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 459,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        gap: 60,
                        marginBottom: 50
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 10,
                                    fontWeight: 700,
                                    color: '#A0AEC0',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    marginBottom: 8
                                },
                                children: lBilledTo
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 475,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 16,
                                    fontWeight: 600,
                                    margin: '0 0 4px 0'
                                },
                                children: invoice.partyName || 'Walk-in Customer'
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 476,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            invoice.partyPhone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 13,
                                    margin: '0 0 4px',
                                    color: '#718096'
                                },
                                children: invoice.partyPhone
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 477,
                                columnNumber: 44
                            }, ("TURBOPACK compile-time value", void 0)),
                            invoice.billingAddress && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 13,
                                    margin: 0,
                                    color: '#718096'
                                },
                                children: invoice.billingAddress
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 478,
                                columnNumber: 48
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 474,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 473,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        flex: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            style: {
                                width: '100%',
                                borderCollapse: 'collapse',
                                fontSize: 13
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        style: {
                                            borderBottom: '2px solid #E2E8F0'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    textAlign: 'left',
                                                    padding: '16px 0',
                                                    color: '#A0AEC0',
                                                    fontWeight: 600,
                                                    textTransform: 'uppercase',
                                                    fontSize: 11,
                                                    letterSpacing: '1px'
                                                },
                                                children: "Description"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 486,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    textAlign: 'center',
                                                    padding: '16px 0',
                                                    color: '#A0AEC0',
                                                    fontWeight: 600,
                                                    textTransform: 'uppercase',
                                                    fontSize: 11,
                                                    letterSpacing: '1px'
                                                },
                                                children: "Qty"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 487,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            showColumns.rate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    textAlign: 'right',
                                                    padding: '16px 0',
                                                    color: '#A0AEC0',
                                                    fontWeight: 600,
                                                    textTransform: 'uppercase',
                                                    fontSize: 11,
                                                    letterSpacing: '1px'
                                                },
                                                children: "Rate"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 488,
                                                columnNumber: 50
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    textAlign: 'right',
                                                    padding: '16px 0',
                                                    color: '#A0AEC0',
                                                    fontWeight: 600,
                                                    textTransform: 'uppercase',
                                                    fontSize: 11,
                                                    letterSpacing: '1px'
                                                },
                                                children: "Amount"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 489,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 485,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 484,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: invoice.items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            style: {
                                                borderBottom: '1px solid #F7FAFC'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '20px 0',
                                                        fontWeight: 500
                                                    },
                                                    children: item.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 495,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '20px 0',
                                                        textAlign: 'center',
                                                        color: '#718096'
                                                    },
                                                    children: [
                                                        item.qty,
                                                        " ",
                                                        item.unit
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 496,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                showColumns.rate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '20px 0',
                                                        textAlign: 'right',
                                                        color: '#718096'
                                                    },
                                                    children: item.rate.toFixed(2)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 497,
                                                    columnNumber: 54
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '20px 0',
                                                        textAlign: 'right',
                                                        fontWeight: 600
                                                    },
                                                    children: item.amount.toFixed(2)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 498,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 494,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 492,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 483,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TotalsBlock, {}, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 503,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 482,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: 60,
                        paddingTop: 30,
                        borderTop: '1px solid #E2E8F0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 11,
                                color: '#A0AEC0',
                                width: '60%',
                                lineHeight: 1.6
                            },
                            children: invoice.notes || defaultFooter
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 507,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterBrand, {}, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 508,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 506,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, copyIndex, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 458,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    // ==========================================
    // THEME 7: BOLD RETAIL (Orange/Dark Contrast)
    // ==========================================
    const renderBoldOrange = (copyIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                fontFamily: "'Inter', sans-serif",
                width: '100%',
                maxWidth: '210mm',
                minHeight: '100vh',
                margin: '0 auto',
                background: '#FFFAFA',
                color: '#1A202C',
                position: 'relative',
                overflow: 'hidden',
                padding: '0',
                boxSizing: 'border-box',
                WebkitPrintColorAdjust: 'exact',
                printColorAdjust: 'exact',
                display: 'flex',
                flexDirection: 'column'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: '#DD6B20',
                        color: 'white',
                        padding: '40px 50px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    style: {
                                        fontSize: 36,
                                        fontWeight: 900,
                                        margin: '0 0 8px 0',
                                        textTransform: 'uppercase',
                                        letterSpacing: '-1px'
                                    },
                                    children: lTitle
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 520,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 16,
                                        margin: 0,
                                        fontWeight: 700,
                                        opacity: 0.9
                                    },
                                    children: [
                                        "#",
                                        invoice.invoiceNumber
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 521,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 519,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        company?.logo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: company.logo,
                            alt: "Logo",
                            style: {
                                height: 50,
                                objectFit: 'contain',
                                background: 'white',
                                padding: 8,
                                borderRadius: 8
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 523,
                            columnNumber: 34
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                fontSize: 24,
                                fontWeight: 900,
                                margin: 0
                            },
                            children: company?.name
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 523,
                            columnNumber: 169
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 518,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '40px 50px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderBottom: '2px solid #FEEBC8'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: '45%'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 12,
                                        fontWeight: 800,
                                        color: '#DD6B20',
                                        textTransform: 'uppercase',
                                        marginBottom: 8,
                                        margin: 0
                                    },
                                    children: lBilledTo
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 528,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 18,
                                        fontWeight: 800,
                                        margin: '0 0 4px 0'
                                    },
                                    children: invoice.partyName || 'Cash Customer'
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 529,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 13,
                                        color: '#718096',
                                        margin: 0
                                    },
                                    children: invoice.partyPhone
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 530,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 13,
                                        color: '#718096',
                                        margin: 0
                                    },
                                    children: invoice.billingAddress
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 531,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 527,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: '45%',
                                textAlign: 'right'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 12,
                                        fontWeight: 800,
                                        color: '#DD6B20',
                                        textTransform: 'uppercase',
                                        marginBottom: 8,
                                        margin: 0
                                    },
                                    children: "Company details"
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 534,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 14,
                                        fontWeight: 700,
                                        margin: '0 0 4px 0'
                                    },
                                    children: company?.name
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 535,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 13,
                                        color: '#718096',
                                        margin: 0
                                    },
                                    children: [
                                        company?.address,
                                        ", ",
                                        company?.city
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 536,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 13,
                                        color: '#718096',
                                        margin: 0
                                    },
                                    children: company?.phone
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 537,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 533,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 526,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '40px 50px',
                        flex: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ItemsTableModern, {
                            headerColor: "#FBD38D",
                            textColor: "#9C4221"
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 542,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TotalsBlock, {}, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 543,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 541,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: '#2D3748',
                        color: 'white',
                        padding: '30px 50px',
                        marginTop: 'auto'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 11,
                                    color: '#A0AEC0',
                                    margin: 0,
                                    maxWidth: '60%'
                                },
                                children: invoice.notes || defaultFooter
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 548,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterBrand, {}, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 549,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 547,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 546,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, copyIndex, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 517,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    const renderElegant = (copyIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                fontFamily: "'Outfit', sans-serif",
                width: '100%',
                maxWidth: '210mm',
                minHeight: '100vh',
                margin: '0 auto',
                background: 'white',
                color: '#111827',
                position: 'relative',
                overflow: 'hidden',
                padding: '0',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: '#111827',
                        color: 'white',
                        padding: '60px 50px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    style: {
                                        fontSize: 44,
                                        fontWeight: 300,
                                        margin: '0 0 10px 0',
                                        letterSpacing: '2px'
                                    },
                                    children: lTitle
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 559,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 14,
                                        margin: 0,
                                        opacity: 0.8
                                    },
                                    children: [
                                        "No. ",
                                        invoice.invoiceNumber,
                                        " | ",
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(invoice.date)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 560,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 558,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'right'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    style: {
                                        fontSize: 24,
                                        fontWeight: 800,
                                        margin: '0 0 4px 0'
                                    },
                                    children: company?.name
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 563,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 12,
                                        opacity: 0.7
                                    },
                                    children: company?.city
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 564,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 562,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 557,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '50px',
                        flex: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: 40
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 10,
                                            fontWeight: 900,
                                            color: '#9CA3AF',
                                            textTransform: 'uppercase',
                                            marginBottom: 12
                                        },
                                        children: lBilledTo
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 570,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 20,
                                            fontWeight: 700,
                                            marginBottom: 4
                                        },
                                        children: invoice.partyName || 'Valued Customer'
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 571,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 13,
                                            color: '#6B7280'
                                        },
                                        children: invoice.partyPhone
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 572,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 569,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 568,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ItemsTableModern, {
                            headerColor: "#1F2937",
                            textColor: "#FFFFFF"
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 575,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TotalsBlock, {}, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 576,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 567,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '0 50px 40px'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterBrand, {}, void 0, false, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 579,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 578,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, copyIndex, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 556,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    const renderVibrant = (copyIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                fontFamily: "'Inter', sans-serif",
                width: '100%',
                maxWidth: '210mm',
                minHeight: '100vh',
                margin: '0 auto',
                background: '#FFFFFF',
                color: '#1E3A8A',
                position: 'relative',
                overflow: 'hidden',
                padding: '0',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: '#EFF6FF',
                        padding: '50px',
                        borderBottom: '4px solid #3B82F6',
                        display: 'flex',
                        justifyContent: 'space-between'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    style: {
                                        fontSize: 40,
                                        fontWeight: 900,
                                        color: '#1E40AF',
                                        margin: '0 0 8px 0'
                                    },
                                    children: lTitle
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 588,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'inline-block',
                                        background: '#3B82F6',
                                        color: 'white',
                                        padding: '4px 12px',
                                        borderRadius: 20,
                                        fontSize: 12,
                                        fontWeight: 700
                                    },
                                    children: [
                                        "#",
                                        invoice.invoiceNumber
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 589,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 587,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'right'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 24,
                                        fontWeight: 900,
                                        color: '#1E40AF',
                                        margin: '0 0 4px 0'
                                    },
                                    children: company?.name
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 592,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 13,
                                        color: '#60A5FA'
                                    },
                                    children: company?.phone
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 593,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 591,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 586,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '50px',
                        flex: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ItemsTableModern, {
                            headerColor: "#DBEAFE",
                            textColor: "#1E40AF"
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 597,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TotalsBlock, {}, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 598,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 596,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '0 50px 40px'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterBrand, {}, void 0, false, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 601,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 600,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, copyIndex, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 585,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    const renderRetro = (copyIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                fontFamily: "'Courier Prime', monospace",
                width: '100%',
                maxWidth: '210mm',
                minHeight: '100vh',
                margin: '0 auto',
                background: '#FDFCF0',
                color: '#000000',
                padding: '60px',
                boxSizing: 'border-box',
                position: 'relative',
                border: '1px solid #D1D5DB'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        textAlign: 'center',
                        marginBottom: 40,
                        borderBottom: '2px dashed #000'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            style: {
                                fontSize: 24,
                                fontWeight: 'bold',
                                margin: '0 0 10px'
                            },
                            children: company?.name
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 609,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 14
                            },
                            children: [
                                company?.address,
                                ", ",
                                company?.city
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 610,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 14
                            },
                            children: [
                                "TEL: ",
                                company?.phone
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 611,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 608,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 30
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "TO: ",
                                        invoice.partyName
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 615,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "PH: ",
                                        invoice.partyPhone
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 616,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 614,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'right'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "NO: ",
                                        invoice.invoiceNumber
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 619,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "DATE: ",
                                        invoice.date
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 620,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 618,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 613,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    style: {
                        width: '100%',
                        borderCollapse: 'collapse',
                        marginBottom: 30
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                style: {
                                    borderBottom: '1px solid #000',
                                    borderTop: '1px solid #000'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            textAlign: 'left',
                                            padding: '10px'
                                        },
                                        children: "ITEM"
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 626,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            textAlign: 'center',
                                            padding: '10px'
                                        },
                                        children: "QTY"
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 627,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            textAlign: 'right',
                                            padding: '10px'
                                        },
                                        children: "PRICE"
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 628,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 625,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 624,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: invoice.items.map((it, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: '8px 10px'
                                            },
                                            children: it.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 634,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: '8px 10px',
                                                textAlign: 'center'
                                            },
                                            children: it.qty
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 635,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: '8px 10px',
                                                textAlign: 'right'
                                            },
                                            children: it.amount.toFixed(2)
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 636,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, i, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 633,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 631,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 623,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        textAlign: 'right',
                        borderTop: '2px solid #000',
                        paddingTop: 10
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 20,
                            fontWeight: 'bold'
                        },
                        children: [
                            "TOTAL: INR ",
                            invoice.grandTotal.toFixed(2)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 642,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 641,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: 50
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "SIGNATURE: ____________________"
                    }, void 0, false, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 645,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 644,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, copyIndex, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 607,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    const renderCopy = (copyIndex)=>{
        switch(theme){
            case 'quick_bill':
                return renderQuickBill(copyIndex);
            case 'minimalist':
                return renderMinimalist(copyIndex);
            case 'bold_orange':
                return renderBoldOrange(copyIndex);
            case 'elegant':
                return renderElegant(copyIndex);
            case 'vibrant':
                return renderVibrant(copyIndex);
            case 'retro':
                return renderRetro(copyIndex);
            case 'classic':
                return renderClassic(copyIndex);
            case 'modern':
                return renderModern(copyIndex);
            case 'waves':
                return renderWaves(copyIndex);
            case 'luxe_gold':
                return renderLuxeGold(copyIndex);
            case 'beige_dark':
                return renderBeigeDark(copyIndex);
            case 'sea_green':
                return renderSeaGreen(copyIndex);
            case 'formal_quote':
                return renderFormalQuote(copyIndex);
            case 'creative':
            default:
                return renderCreative(copyIndex);
        }
    };
    const renderBeigeDark = (copyIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                fontFamily: "'Inter', sans-serif",
                width: '100%',
                maxWidth: '210mm',
                minHeight: '100vh',
                margin: '0 auto',
                background: '#D9CDB8',
                color: '#1B2129',
                position: 'relative',
                overflow: 'hidden',
                padding: '0',
                boxSizing: 'border-box',
                WebkitPrintColorAdjust: 'exact',
                printColorAdjust: 'exact',
                display: 'flex',
                flexDirection: 'column'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '50px 50px 20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                company?.logo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: company.logo,
                                    alt: "Logo",
                                    style: {
                                        height: 60,
                                        marginBottom: 10
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 674,
                                    columnNumber: 38
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 24,
                                        fontWeight: 900
                                    },
                                    children: company?.name
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 674,
                                    columnNumber: 119
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    style: {
                                        fontSize: 52,
                                        fontWeight: 900,
                                        margin: '20px 0 10px 0',
                                        letterSpacing: '-1px'
                                    },
                                    children: lTitle
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 675,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    style: {
                                        fontSize: 13,
                                        fontWeight: 700
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        style: {
                                                            paddingRight: 10
                                                        },
                                                        children: [
                                                            lNo,
                                                            "."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                        lineNumber: 678,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: invoice.invoiceNumber
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                        lineNumber: 678,
                                                        columnNumber: 77
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 678,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        style: {
                                                            paddingRight: 10
                                                        },
                                                        children: [
                                                            lDate,
                                                            "."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                        lineNumber: 679,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(invoice.date)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                        lineNumber: 679,
                                                        columnNumber: 79
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 679,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 677,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 676,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 673,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'right',
                                marginTop: 80
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 13,
                                        fontWeight: 800,
                                        margin: '0 0 4px 0'
                                    },
                                    children: [
                                        lBilledTo,
                                        "."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 684,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 18,
                                        fontWeight: 900,
                                        margin: '0 0 8px 0'
                                    },
                                    children: invoice.partyName || 'Cash Customer'
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 685,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 12,
                                        margin: 0
                                    },
                                    children: invoice.partyPhone
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 686,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 12,
                                        margin: 0,
                                        maxWidth: 200,
                                        display: 'inline-block'
                                    },
                                    children: invoice.billingAddress
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 687,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 683,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 672,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '20px 50px',
                        flex: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            style: {
                                width: '100%',
                                borderCollapse: 'separate',
                                borderSpacing: 0,
                                fontSize: 13,
                                borderRadius: '12px',
                                overflow: 'hidden',
                                border: '1px solid rgba(0,0,0,0.1)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        style: {
                                            background: '#1B2129',
                                            color: 'white'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    textAlign: 'center',
                                                    padding: '16px',
                                                    width: '10%'
                                                },
                                                children: "Qty"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 695,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    textAlign: 'left',
                                                    padding: '16px'
                                                },
                                                children: "Item Description"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 696,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    textAlign: 'right',
                                                    padding: '16px'
                                                },
                                                children: "Price"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 697,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    textAlign: 'right',
                                                    padding: '16px'
                                                },
                                                children: "Total"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 698,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 694,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 693,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: invoice.items.map((it, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            style: {
                                                background: i % 2 === 0 ? '#EADDC4' : '#D9CDB8'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '14px 16px',
                                                        textAlign: 'center',
                                                        fontWeight: 800
                                                    },
                                                    children: it.qty
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 704,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '14px 16px',
                                                        fontWeight: 700
                                                    },
                                                    children: it.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 705,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '14px 16px',
                                                        textAlign: 'right'
                                                    },
                                                    children: it.rate.toFixed(2)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 706,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '14px 16px',
                                                        textAlign: 'right',
                                                        fontWeight: 800
                                                    },
                                                    children: it.amount.toFixed(2)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 707,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 703,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 701,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 692,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '40px 0 20px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: '45%'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 14,
                                                fontWeight: 900,
                                                margin: '0 0 10px 0'
                                            },
                                            children: "Payment Method."
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 715,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 12,
                                                margin: '0 0 4px 0'
                                            },
                                            children: [
                                                "Status: ",
                                                (invoice.paymentStatus || 'unpaid').toUpperCase()
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 716,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 12,
                                                margin: '0 0 4px 0'
                                            },
                                            children: [
                                                "Method: ",
                                                invoice.paymentMethod || 'Cash / Bank Transfer'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 717,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        company?.bankDetails?.upiId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 12,
                                                margin: '0 0 4px 0'
                                            },
                                            children: [
                                                "UPI: ",
                                                company.bankDetails.upiId
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 718,
                                            columnNumber: 57
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 714,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: '45%'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginBottom: 8,
                                                fontSize: 14,
                                                fontWeight: 700
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Sub-Total:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 722,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: invoice.subTotal.toFixed(2)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 722,
                                                    columnNumber: 52
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 721,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        invoice.totalGst > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginBottom: 16,
                                                fontSize: 14,
                                                fontWeight: 700
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Tax Vat:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 725,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: invoice.totalGst.toFixed(2)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 725,
                                                    columnNumber: 50
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 724,
                                            columnNumber: 50
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 16,
                                                        fontWeight: 900
                                                    },
                                                    children: "Total:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 728,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 18,
                                                        fontWeight: 900,
                                                        background: '#1B2129',
                                                        color: 'white',
                                                        padding: '10px 24px',
                                                        borderRadius: '30px'
                                                    },
                                                    children: invoice.grandTotal.toLocaleString('en-IN')
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 729,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 727,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 720,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 713,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-end',
                                marginTop: 40,
                                borderTop: '1px solid rgba(0,0,0,0.2)',
                                paddingTop: 20
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: '45%',
                                        fontSize: 12,
                                        lineHeight: 1.6
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                margin: '0 0 4px',
                                                fontWeight: 800
                                            },
                                            children: company?.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 738,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                margin: '0 0 4px'
                                            },
                                            children: [
                                                "TEL: ",
                                                company?.phone
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 739,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                margin: 0
                                            },
                                            children: [
                                                company?.address,
                                                ", ",
                                                company?.city
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 740,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 737,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: '45%',
                                        textAlign: 'right'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 14,
                                                fontWeight: 900,
                                                margin: '0 0 4px'
                                            },
                                            children: "Terms & Condition."
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 743,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 10,
                                                margin: 0
                                            },
                                            children: invoice.notes || defaultFooter
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 744,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 742,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 736,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 691,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '0 50px 30px'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterBrand, {}, void 0, false, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 750,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 749,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        height: 40,
                        background: '#1B2129',
                        width: '100%'
                    }
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 754,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, copyIndex, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 671,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    const renderSeaGreen = (copyIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                fontFamily: "'Inter', sans-serif",
                width: '100%',
                maxWidth: '210mm',
                minHeight: '100vh',
                margin: '0 auto',
                background: '#F1F5F9',
                color: '#1E293B',
                position: 'relative',
                overflow: 'hidden',
                padding: '0',
                boxSizing: 'border-box',
                WebkitPrintColorAdjust: 'exact',
                printColorAdjust: 'exact',
                display: 'flex',
                flexDirection: 'column'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: '#45C4A0',
                        color: 'white',
                        padding: '50px 40px',
                        paddingBottom: '70px'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 18,
                                            fontWeight: 800,
                                            marginBottom: 20
                                        },
                                        children: company?.name
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 763,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        style: {
                                            fontSize: 56,
                                            fontWeight: 900,
                                            margin: '0 0 10px',
                                            letterSpacing: '-2px'
                                        },
                                        children: [
                                            lTitle,
                                            "."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 764,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 16,
                                            fontWeight: 600
                                        },
                                        children: [
                                            "No. ",
                                            invoice.invoiceNumber
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 765,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 762,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: 'right',
                                    paddingTop: 40
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 14,
                                            fontWeight: 600,
                                            opacity: 0.9,
                                            margin: '0 0 4px'
                                        },
                                        children: "Invoice Date:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 768,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 16,
                                            fontWeight: 800,
                                            margin: 0
                                        },
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(invoice.date)
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 769,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 767,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 761,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 760,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '0 40px',
                        flex: 1,
                        marginTop: '-40px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                gap: 20,
                                marginBottom: 30
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: 'white',
                                        padding: '24px',
                                        borderRadius: '16px',
                                        flex: 1,
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 13,
                                                fontWeight: 800,
                                                color: '#45C4A0',
                                                textTransform: 'uppercase',
                                                marginBottom: 8
                                            },
                                            children: [
                                                lBilledTo,
                                                ":"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 777,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 18,
                                                fontWeight: 800,
                                                color: '#1E293B',
                                                marginBottom: 12
                                            },
                                            children: invoice.partyName || 'Customer'
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 778,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 12,
                                                color: '#64748B',
                                                display: 'flex',
                                                gap: 8,
                                                marginBottom: 4
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    style: {
                                                        width: 60
                                                    },
                                                    children: "Phone:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 779,
                                                    columnNumber: 113
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                " ",
                                                invoice.partyPhone || '-'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 779,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 12,
                                                color: '#64748B',
                                                display: 'flex',
                                                gap: 8
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    style: {
                                                        width: 60
                                                    },
                                                    children: "Addr:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 780,
                                                    columnNumber: 96
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                " ",
                                                invoice.billingAddress || '-'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 780,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 776,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: 'white',
                                        padding: '24px',
                                        borderRadius: '16px',
                                        flex: 0.8,
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 13,
                                                fontWeight: 800,
                                                color: '#45C4A0',
                                                textTransform: 'uppercase',
                                                marginBottom: 8
                                            },
                                            children: "Payment Info:"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 783,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 14,
                                                fontWeight: 700,
                                                color: '#1E293B',
                                                marginBottom: 12
                                            },
                                            children: invoice.paymentMethod || 'Cash'
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 784,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        company?.bankDetails?.upiId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 12,
                                                color: '#64748B',
                                                display: 'flex',
                                                gap: 8,
                                                marginBottom: 4
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    style: {
                                                        width: 40
                                                    },
                                                    children: "UPI:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 785,
                                                    columnNumber: 145
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                " ",
                                                company.bankDetails.upiId
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 785,
                                            columnNumber: 57
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                background: '#E8F6F3',
                                                padding: '10px 16px',
                                                borderRadius: '10px',
                                                display: 'inline-block',
                                                marginTop: 10
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 12,
                                                        fontWeight: 800,
                                                        color: '#45C4A0',
                                                        marginRight: 10
                                                    },
                                                    children: "Amount Due:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 788,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 18,
                                                        fontWeight: 900,
                                                        color: '#1E293B'
                                                    },
                                                    children: [
                                                        "₹",
                                                        invoice.grandTotal.toLocaleString('en-IN')
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 789,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 787,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 782,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 775,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                background: 'white',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    style: {
                                        width: '100%',
                                        borderCollapse: 'collapse',
                                        fontSize: 13
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                style: {
                                                    background: '#45C4A0',
                                                    color: 'white'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        style: {
                                                            textAlign: 'center',
                                                            padding: '14px',
                                                            width: '10%'
                                                        },
                                                        children: "No."
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                        lineNumber: 798,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        style: {
                                                            textAlign: 'left',
                                                            padding: '14px'
                                                        },
                                                        children: "Product Description"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                        lineNumber: 799,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        style: {
                                                            textAlign: 'right',
                                                            padding: '14px'
                                                        },
                                                        children: "Price"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                        lineNumber: 800,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        style: {
                                                            textAlign: 'center',
                                                            padding: '14px'
                                                        },
                                                        children: "Qty"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                        lineNumber: 801,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        style: {
                                                            textAlign: 'right',
                                                            padding: '14px'
                                                        },
                                                        children: "Total"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                        lineNumber: 802,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 797,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 796,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: invoice.items.map((it, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    style: {
                                                        borderBottom: '1px solid #F1F5F9'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                padding: '14px',
                                                                textAlign: 'center',
                                                                color: '#64748B'
                                                            },
                                                            children: (i + 1).toString().padStart(2, '0')
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                            lineNumber: 808,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                padding: '14px',
                                                                fontWeight: 700
                                                            },
                                                            children: it.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                            lineNumber: 809,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                padding: '14px',
                                                                textAlign: 'right',
                                                                color: '#64748B'
                                                            },
                                                            children: it.rate.toFixed(2)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                            lineNumber: 810,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                padding: '14px',
                                                                textAlign: 'center'
                                                            },
                                                            children: it.qty
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                            lineNumber: 811,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                padding: '14px',
                                                                textAlign: 'right',
                                                                fontWeight: 700
                                                            },
                                                            children: it.amount.toFixed(2)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                            lineNumber: 812,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 807,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 805,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 795,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        padding: '20px 24px',
                                        background: '#F8FAFC'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: '#45C4A0',
                                            color: 'white',
                                            padding: '10px 24px',
                                            borderRadius: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 16
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 14,
                                                    fontWeight: 600
                                                },
                                                children: "Total Due:"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 819,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 20,
                                                    fontWeight: 900
                                                },
                                                children: [
                                                    "₹",
                                                    invoice.grandTotal.toLocaleString('en-IN')
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 820,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 818,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 817,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 794,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                gap: 20,
                                marginTop: 30
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: '#45C4A0',
                                        color: 'white',
                                        padding: '20px',
                                        borderRadius: '16px',
                                        flex: 1
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            style: {
                                                fontSize: 14,
                                                fontWeight: 800,
                                                margin: '0 0 8px 0'
                                            },
                                            children: "Terms & Conditions:"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 827,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 11,
                                                lineHeight: 1.5,
                                                margin: 0,
                                                opacity: 0.9
                                            },
                                            children: invoice.notes || defaultFooter
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 828,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 826,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        flex: 1,
                                        padding: '20px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-end',
                                        justifyContent: 'flex-end'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                borderBottom: '2px solid #CBD5E1',
                                                width: 200,
                                                marginBottom: 10
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 831,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 14,
                                                fontWeight: 800,
                                                color: '#1E293B',
                                                margin: '0 0 2px'
                                            },
                                            children: company?.name || 'Administrator'
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 832,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 12,
                                                color: '#64748B',
                                                margin: 0
                                            },
                                            children: "Authorized Signatory"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 833,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 830,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 825,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 774,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '30px 40px',
                        background: 'white',
                        marginTop: 40
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterBrand, {}, void 0, false, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 839,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 838,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        height: 20,
                        background: '#45C4A0',
                        width: '100%'
                    }
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 841,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, copyIndex, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 759,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    const renderFormalQuote = (copyIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                fontFamily: "Arial, sans-serif",
                width: '100%',
                maxWidth: '210mm',
                minHeight: '100vh',
                margin: '0 auto',
                background: 'white',
                color: 'black',
                position: 'relative',
                overflow: 'hidden',
                padding: '50px',
                boxSizing: 'border-box',
                WebkitPrintColorAdjust: 'exact',
                printColorAdjust: 'exact',
                display: 'flex',
                flexDirection: 'column'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: 40
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                (company?.logoUrl || company?.logo) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: company.logoUrl || company.logo,
                                    alt: "Logo",
                                    style: {
                                        height: 60,
                                        marginBottom: 10,
                                        objectFit: 'contain'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 849,
                                    columnNumber: 61
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    style: {
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        margin: '0 0 10px 0'
                                    },
                                    children: company?.name || '[Company Name]'
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 850,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 12,
                                        margin: '0 0 4px 0'
                                    },
                                    children: company?.address || '[Street Address]'
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 851,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 12,
                                        margin: '0 0 4px 0'
                                    },
                                    children: company?.city || '[City, ST ZIP]'
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 852,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 12,
                                        margin: '0 0 4px 0'
                                    },
                                    children: [
                                        "Phone: ",
                                        company?.phone || '(000) 000-0000'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 853,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                company?.gstNumber && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 12,
                                        margin: '0 0 4px 0'
                                    },
                                    children: [
                                        "GSTIN: ",
                                        company?.gstNumber
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 854,
                                    columnNumber: 44
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 848,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'right'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    style: {
                                        fontSize: 36,
                                        fontWeight: 'bold',
                                        color: '#1F2937',
                                        margin: '0 0 20px 0',
                                        letterSpacing: '1px'
                                    },
                                    children: lTitle
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 857,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    style: {
                                        borderCollapse: 'collapse',
                                        fontSize: 12,
                                        float: 'right',
                                        width: 250
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        style: {
                                                            border: '1px solid black',
                                                            padding: '6px',
                                                            fontWeight: 'bold',
                                                            background: '#E5E7EB',
                                                            width: '50%'
                                                        },
                                                        children: [
                                                            lNo,
                                                            " #"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                        lineNumber: 861,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        style: {
                                                            border: '1px solid black',
                                                            padding: '6px',
                                                            textAlign: 'center'
                                                        },
                                                        children: invoice.invoiceNumber
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                        lineNumber: 862,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 860,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        style: {
                                                            border: '1px solid black',
                                                            padding: '6px',
                                                            fontWeight: 'bold',
                                                            background: '#E5E7EB'
                                                        },
                                                        children: "DATE"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                        lineNumber: 865,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        style: {
                                                            border: '1px solid black',
                                                            padding: '6px',
                                                            textAlign: 'center'
                                                        },
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(invoice.date)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                        lineNumber: 866,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 864,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        style: {
                                                            border: '1px solid black',
                                                            padding: '6px',
                                                            fontWeight: 'bold',
                                                            background: '#E5E7EB'
                                                        },
                                                        children: "CUSTOMER ID"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                        lineNumber: 869,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        style: {
                                                            border: '1px solid black',
                                                            padding: '6px',
                                                            textAlign: 'center'
                                                        },
                                                        children: invoice.partyId || 'CASH'
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                        lineNumber: 870,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 868,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        style: {
                                                            border: '1px solid black',
                                                            padding: '6px',
                                                            fontWeight: 'bold',
                                                            background: '#E5E7EB'
                                                        },
                                                        children: "VALID UNTIL"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                        lineNumber: 873,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        style: {
                                                            border: '1px solid black',
                                                            padding: '6px',
                                                            textAlign: 'center'
                                                        },
                                                        children: invoice.dueDate ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(invoice.dueDate) : '-'
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                        lineNumber: 874,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 872,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 859,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 858,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 856,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 847,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 30
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: '45%'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: '#E5E7EB',
                                        padding: '6px 10px',
                                        fontWeight: 'bold',
                                        border: '1px solid black',
                                        borderBottom: 'none',
                                        fontSize: 12
                                    },
                                    children: "CUSTOMER INFO"
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 883,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        border: '1px solid black',
                                        padding: '10px',
                                        fontSize: 12,
                                        minHeight: 80
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                margin: '0 0 4px',
                                                fontWeight: 'bold'
                                            },
                                            children: invoice.partyName || '[Name]'
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 885,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                margin: '0 0 4px'
                                            },
                                            children: [
                                                "Phone: ",
                                                invoice.partyPhone || '[Phone]'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 886,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                margin: '0 0 4px'
                                            },
                                            children: invoice.billingAddress || '[Address]'
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 887,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 884,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 882,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: '45%'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    paddingTop: 30,
                                    textAlign: 'right',
                                    fontSize: 12,
                                    fontStyle: 'italic'
                                },
                                children: "Prepared By: ____________________"
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 891,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 890,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 881,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                invoice.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: 30
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                background: '#E5E7EB',
                                padding: '6px 10px',
                                fontWeight: 'bold',
                                border: '1px solid black',
                                borderBottom: 'none',
                                fontSize: 12
                            },
                            children: "DESCRIPTION OF WORK / NOTES"
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 899,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                border: '1px solid black',
                                padding: '10px',
                                fontSize: 12,
                                minHeight: 60,
                                whiteSpace: 'pre-wrap'
                            },
                            children: invoice.notes
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 900,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 898,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        flex: 1
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        style: {
                            width: '100%',
                            borderCollapse: 'collapse',
                            fontSize: 12,
                            border: '1px solid black'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    style: {
                                        background: '#E5E7EB'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            style: {
                                                border: '1px solid black',
                                                padding: '8px 10px',
                                                textAlign: 'left'
                                            },
                                            children: "ITEMIZED COSTS"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 910,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            style: {
                                                border: '1px solid black',
                                                padding: '8px 10px',
                                                textAlign: 'center',
                                                width: '10%'
                                            },
                                            children: "QTY"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 911,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            style: {
                                                border: '1px solid black',
                                                padding: '8px 10px',
                                                textAlign: 'right',
                                                width: '15%'
                                            },
                                            children: "UNIT PRICE"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 912,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            style: {
                                                border: '1px solid black',
                                                padding: '8px 10px',
                                                textAlign: 'right',
                                                width: '15%'
                                            },
                                            children: "AMOUNT"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 913,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 909,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 908,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: [
                                    invoice.items.map((it, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        border: '1px solid black',
                                                        borderBottom: 'none',
                                                        borderTop: 'none',
                                                        padding: '6px 10px'
                                                    },
                                                    children: it.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 919,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        border: '1px solid black',
                                                        borderBottom: 'none',
                                                        borderTop: 'none',
                                                        padding: '6px 10px',
                                                        textAlign: 'center'
                                                    },
                                                    children: it.qty
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 920,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        border: '1px solid black',
                                                        borderBottom: 'none',
                                                        borderTop: 'none',
                                                        padding: '6px 10px',
                                                        textAlign: 'right'
                                                    },
                                                    children: it.rate.toFixed(2)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 921,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        border: '1px solid black',
                                                        borderBottom: 'none',
                                                        borderTop: 'none',
                                                        padding: '6px 10px',
                                                        textAlign: 'right'
                                                    },
                                                    children: it.amount.toFixed(2)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 922,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 918,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))),
                                    Array.from({
                                        length: Math.max(0, 10 - invoice.items.length)
                                    }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        borderLeft: '1px solid black',
                                                        borderRight: '1px solid black',
                                                        padding: '12px'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 928,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        borderLeft: '1px solid black',
                                                        borderRight: '1px solid black',
                                                        padding: '12px'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 929,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        borderLeft: '1px solid black',
                                                        borderRight: '1px solid black',
                                                        padding: '12px'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 930,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        borderLeft: '1px solid black',
                                                        borderRight: '1px solid black',
                                                        padding: '12px'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 931,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, 'empty-' + i, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 927,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 916,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tfoot", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                colSpan: 2,
                                                rowSpan: 3,
                                                style: {
                                                    border: '1px solid black',
                                                    padding: '10px',
                                                    textAlign: 'center',
                                                    fontStyle: 'italic',
                                                    fontSize: 13,
                                                    verticalAlign: 'middle'
                                                },
                                                children: "Thank you for your business!"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 937,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    border: '1px solid black',
                                                    padding: '8px 10px',
                                                    fontWeight: 'bold'
                                                },
                                                children: "SUBTOTAL"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 940,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    border: '1px solid black',
                                                    padding: '8px 10px',
                                                    textAlign: 'right',
                                                    fontWeight: 'bold'
                                                },
                                                children: invoice.subTotal.toFixed(2)
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 941,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 936,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    border: '1px solid black',
                                                    padding: '8px 10px',
                                                    fontWeight: 'bold',
                                                    background: '#E5E7EB'
                                                },
                                                children: "CGST / SGST"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 944,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    border: '1px solid black',
                                                    padding: '8px 10px',
                                                    textAlign: 'right',
                                                    background: '#E5E7EB'
                                                },
                                                children: invoice.totalGst.toFixed(2)
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 945,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 943,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    border: '1px solid black',
                                                    padding: '10px',
                                                    fontWeight: 'bold',
                                                    fontSize: 14
                                                },
                                                children: [
                                                    "TOTAL ",
                                                    lTitle
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 948,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    border: '1px solid black',
                                                    padding: '10px',
                                                    textAlign: 'right',
                                                    fontWeight: 'bold',
                                                    fontSize: 14
                                                },
                                                children: [
                                                    "₹",
                                                    invoice.grandTotal.toLocaleString('en-IN')
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 949,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 947,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 935,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 907,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 906,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: 30,
                        fontSize: 11
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                margin: '0 0 10px 0'
                            },
                            children: "This quotation is not a contract or a bill. It is our best guess at the total price for the service and goods described above. The customer will be billed after indicating acceptance of this quote. Payment will be due prior to the delivery of service and goods."
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 956,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontWeight: 'bold',
                                marginBottom: 4
                            },
                            children: "Customer Acceptance"
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 957,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            style: {
                                width: '100%',
                                borderCollapse: 'collapse',
                                border: '1px solid black'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                border: '1px solid black',
                                                height: 40,
                                                width: '40%',
                                                verticalAlign: 'bottom',
                                                padding: 4
                                            },
                                            children: "Signature"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 961,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                border: '1px solid black',
                                                height: 40,
                                                width: '40%',
                                                verticalAlign: 'bottom',
                                                padding: 4
                                            },
                                            children: "Printed Name"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 962,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                border: '1px solid black',
                                                height: 40,
                                                width: '20%',
                                                verticalAlign: 'bottom',
                                                padding: 4
                                            },
                                            children: "Date"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 963,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 960,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 959,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 958,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 955,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: 30,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        paddingTop: 20,
                        borderTop: '3px solid #E2E8F0',
                        paddingBottom: 10,
                        pageBreakInside: 'avoid'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 11,
                                        color: '#A0AEC0',
                                        marginBottom: 16
                                    },
                                    children: defaultFooter
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 971,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 10
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "32",
                                            height: "32",
                                            viewBox: "0 0 100 100",
                                            fill: "none",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M10 25 h15 a5 5 0 0 1 4.5 3 l4 12",
                                                    stroke: "#34A853",
                                                    strokeWidth: "8",
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 974,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M28 40 h26 v22 h-20 z",
                                                    fill: "#34A853"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 975,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M54 40 h24 a8 8 0 0 1 8 8 v14 h-32 z",
                                                    fill: "#FBBC04"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 976,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M34 62 h20 v20 h-10 a10 10 0 0 1 -10 -10 z",
                                                    fill: "#4285F4"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 977,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M54 62 h32 v10 a10 10 0 0 1 -10 10 h-22 z",
                                                    fill: "#EA4335"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 978,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    cx: "42",
                                                    cy: "88",
                                                    r: "7",
                                                    fill: "#4285F4"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 979,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    cx: "70",
                                                    cy: "88",
                                                    r: "7",
                                                    fill: "#4285F4"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 980,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 973,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 24,
                                                fontWeight: 900,
                                                letterSpacing: '-1px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                fontFamily: "'Inter', sans-serif"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: '#EA4335'
                                                    },
                                                    children: "E"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 983,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: '#34A853'
                                                    },
                                                    children: "d"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 984,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: '#FBBC04'
                                                    },
                                                    children: "i"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 985,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: '#4285F4'
                                                    },
                                                    children: "b"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 986,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: '#34A853'
                                                    },
                                                    children: "i"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 987,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: '#EA4335'
                                                    },
                                                    children: "o"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 988,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 982,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 972,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 970,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                paddingBottom: 4
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$barcode$2f$lib$2f$react$2d$barcode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                value: invoice.invoiceNumber || 'INV-000',
                                width: 1.2,
                                height: 40,
                                fontSize: 12,
                                fontWeight: "bold",
                                displayValue: true,
                                margin: 0,
                                background: "transparent"
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 993,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 992,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 969,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, copyIndex, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 846,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    const renderLuxeGold = (copyIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                fontFamily: "'Inter', sans-serif",
                width: '100%',
                maxWidth: '210mm',
                minHeight: '100vh',
                margin: '0 auto',
                background: '#0F172A',
                color: '#F1F5F9',
                position: 'relative',
                overflow: 'hidden',
                padding: '0',
                boxSizing: 'border-box',
                WebkitPrintColorAdjust: 'exact',
                printColorAdjust: 'exact',
                display: 'flex',
                flexDirection: 'column'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
                        padding: '60px 40px',
                        borderBottom: '2px solid #CA8A04'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        style: {
                                            fontSize: 44,
                                            fontWeight: 900,
                                            background: 'linear-gradient(to right, #FDE047, #CA8A04)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            margin: '0 0 10px 0'
                                        },
                                        children: lTitle
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 1005,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 16,
                                            color: '#94A3B8'
                                        },
                                        children: [
                                            "#",
                                            invoice.invoiceNumber,
                                            " | ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(invoice.date)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 1006,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 1004,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: 'right'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        style: {
                                            fontSize: 28,
                                            fontWeight: 200,
                                            letterSpacing: '2px',
                                            color: '#FDE047'
                                        },
                                        children: company?.name
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 1009,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 13,
                                            color: '#94A3B8'
                                        },
                                        children: company?.city
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 1010,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 1008,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 1003,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 1002,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '40px',
                        flex: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: 40,
                                background: 'rgba(255,255,255,0.03)',
                                padding: 24,
                                borderRadius: 16,
                                border: '1px solid rgba(255,255,255,0.05)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 11,
                                                fontWeight: 800,
                                                color: '#CA8A04',
                                                textTransform: 'uppercase',
                                                marginBottom: 12
                                            },
                                            children: lBilledTo
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 1017,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 20,
                                                fontWeight: 800,
                                                color: 'white'
                                            },
                                            children: invoice.partyName || 'Premium Client'
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 1018,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 13,
                                                color: '#94A3B8'
                                            },
                                            children: invoice.partyPhone
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 1019,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 1016,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        textAlign: 'right'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 11,
                                                fontWeight: 800,
                                                color: '#CA8A04',
                                                textTransform: 'uppercase',
                                                marginBottom: 12
                                            },
                                            children: "Invoice Summary"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 1022,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 13,
                                                color: '#94A3B8'
                                            },
                                            children: [
                                                "Status: ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: '#FDE047'
                                                    },
                                                    children: (invoice.paymentStatus || 'unpaid').toUpperCase()
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 1023,
                                                    columnNumber: 79
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 1023,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 13,
                                                color: '#94A3B8'
                                            },
                                            children: [
                                                "Method: ",
                                                invoice.paymentMethod
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 1024,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 1021,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 1015,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            style: {
                                width: '100%',
                                borderCollapse: 'collapse',
                                fontSize: 13
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        style: {
                                            color: '#CA8A04',
                                            borderBottom: '2px solid #CA8A04'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    textAlign: 'left',
                                                    padding: '16px 0'
                                                },
                                                children: "DESCRIPTION"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 1030,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    textAlign: 'center',
                                                    padding: '16px 0'
                                                },
                                                children: "QTY"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 1031,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    textAlign: 'right',
                                                    padding: '16px 0'
                                                },
                                                children: "RATE"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 1032,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    textAlign: 'right',
                                                    padding: '16px 0'
                                                },
                                                children: "TOTAL"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 1033,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 1029,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 1028,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: invoice.items.map((it, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            style: {
                                                borderBottom: '1px solid rgba(255,255,255,0.05)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '20px 0',
                                                        fontWeight: 600,
                                                        color: 'white'
                                                    },
                                                    children: it.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 1039,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '20px 0',
                                                        textAlign: 'center'
                                                    },
                                                    children: it.qty
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 1040,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '20px 0',
                                                        textAlign: 'right'
                                                    },
                                                    children: it.rate.toFixed(2)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 1041,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '20px 0',
                                                        textAlign: 'right',
                                                        fontWeight: 900,
                                                        color: '#FDE047'
                                                    },
                                                    children: it.amount.toFixed(2)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 1042,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 1038,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 1036,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 1027,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginTop: 32
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 300,
                                    background: 'rgba(255,255,255,0.03)',
                                    padding: 24,
                                    borderRadius: 16
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginBottom: 16
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: '#94A3B8'
                                                },
                                                children: "Subtotal"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 1050,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: 'white'
                                                },
                                                children: [
                                                    "₹",
                                                    invoice.subTotal.toFixed(2)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 1051,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 1049,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            paddingTop: 16,
                                            borderTop: '1px solid rgba(255,255,255,0.1)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 18,
                                                    fontWeight: 900,
                                                    color: 'white'
                                                },
                                                children: "TOTAL"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 1054,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 18,
                                                    fontWeight: 900,
                                                    color: '#FDE047'
                                                },
                                                children: [
                                                    "₹",
                                                    invoice.grandTotal.toLocaleString('en-IN')
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 1055,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 1053,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 1048,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 1047,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 1014,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '40px',
                        background: '#1E293B',
                        borderTop: '4px solid #CA8A04',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 11,
                                color: '#94A3B8',
                                margin: 0
                            },
                            children: invoice.notes || defaultFooter
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 1061,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterBrand, {}, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 1062,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 1060,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, copyIndex, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 1001,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: previewMode ? '' : 'print-only',
        style: {
            width: '100%'
        },
        children: [
            Array.from({
                length: copies
            }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                    children: [
                        renderCopy(i),
                        i < copies - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                pageBreakBefore: 'always'
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 1072,
                            columnNumber: 40
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, i, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 1070,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
                @media (max-width: 768px) {
                    .theme-container { padding: 15px !important; }
                    .creative-layout { flex-direction: column !important; }
                    .creative-sidebar { width: 100% !important; border-radius: 12px !important; margin-bottom: 20px; }
                    .totals-block { max-width: 100% !important; margin-top: 10px !important; }
                    h1 { fontSize: 28px !important; }
                    .invoice-footer { flex-direction: column !important; align-items: center !important; gap: 20px; text-align: center; }
                    .theme-creative .creative-sidebar { padding: 20px !important; }
                }
                @media print {
                   .invoice-footer { position: fixed; bottom: 10px; left: 40px; right: 40px; background: white !important; }
                }
            `
            }, void 0, false, {
                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                lineNumber: 1076,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/InvoicePrintTemplate.tsx",
        lineNumber: 1068,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = InvoicePrintTemplate;
var _c;
__turbopack_context__.k.register(_c, "InvoicePrintTemplate");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/company/billing/quick/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NewBillPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/printer.js [app-client] (ecmascript) <export default as Printer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$repeat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Repeat$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/repeat.js [app-client] (ecmascript) <export default as Repeat>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InvoicePrintTemplate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/InvoicePrintTemplate.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
const emptyRow = ()=>({
        name: '',
        barcode: '',
        hsnCode: '',
        mfgDate: '',
        mrp: 0,
        size: '',
        qty: 1,
        unit: 'Pcs',
        rate: 0,
        discount: 0,
        gstRate: 0,
        taxableAmt: 0,
        cgst: 0,
        sgst: 0,
        igst: 0,
        cess: 0,
        totalGst: 0,
        discountAmt: 0,
        amount: 0
    });
function QuickBillingContent() {
    _s();
    const { activeCompanyId, logout, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const companyId = activeCompanyId;
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const company = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActiveCompany"])();
    const products = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"])('products');
    const invoices = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"])('invoices');
    const parties = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"])('parties');
    const { addInvoice, nextInvoiceNumber, adjustStock } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuickBillingContent.useEffect": ()=>{
            const handlePopState = {
                "QuickBillingContent.useEffect.handlePopState": ()=>{
                    if (user?.role === 'staff') {
                    // logout();
                    // router.replace('/login');
                    }
                }
            }["QuickBillingContent.useEffect.handlePopState"];
            window.addEventListener('popstate', handlePopState);
            return ({
                "QuickBillingContent.useEffect": ()=>window.removeEventListener('popstate', handlePopState)
            })["QuickBillingContent.useEffect"];
        }
    }["QuickBillingContent.useEffect"], [
        user,
        logout,
        router
    ]);
    const [billType, setBillType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('CASH');
    const [partyName, setPartyName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [partyPhone, setPartyPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [billingAddress, setBillingAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [stateOfSupply, setStateOfSupply] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Tamil Nadu');
    const [counter, setCounter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Counter 1');
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        emptyRow()
    ]);
    const [discountType, setDiscountType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('%');
    const [discountVal, setDiscountVal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [roundOffEnabled, setRoundOffEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [roundOffVal, setRoundOffVal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('0.00');
    const [description, setDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showDesc, setShowDesc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Time & date
    const [date, setDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date().toISOString().slice(0, 10));
    const [time, setTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date().toTimeString().slice(0, 5));
    const [savedBill, setSavedBill] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [copies, setCopies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [showPrintModal, setShowPrintModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [amountGiven, setAmountGiven] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Custom Suggestions State
    const [activeRowIdx, setActiveRowIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeSuggestionIdx, setActiveSuggestionIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [showSuggestions, setShowSuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [filteredProducts, setFilteredProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Action modal (Fetch/Refund)
    const [actionModal, setActionModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        isOpen: false,
        isRefund: false
    });
    const [actionQuery, setActionQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [recurringModalOpen, setRecurringModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuickBillingContent.useEffect": ()=>{
            const handleKeyDown = {
                "QuickBillingContent.useEffect.handleKeyDown": (e)=>{
                    if (e.key === 'F12') {
                        e.preventDefault();
                        setShowPrintModal(true);
                    }
                    if (e.key === 'Enter' && e.shiftKey) {
                        e.preventDefault();
                        setItems({
                            "QuickBillingContent.useEffect.handleKeyDown": (prev)=>[
                                    ...prev,
                                    emptyRow()
                                ]
                        }["QuickBillingContent.useEffect.handleKeyDown"]);
                    }
                }
            }["QuickBillingContent.useEffect.handleKeyDown"];
            window.addEventListener('keydown', handleKeyDown);
            return ({
                "QuickBillingContent.useEffect": ()=>window.removeEventListener('keydown', handleKeyDown)
            })["QuickBillingContent.useEffect"];
        }
    }["QuickBillingContent.useEffect"], []);
    const handleFetchBill = (isRefund = false)=>{
        setActionModal({
            isOpen: true,
            isRefund
        });
        setActionQuery('');
    };
    const executeAction = ()=>{
        const q = actionQuery.trim();
        if (!q) return;
        const inv = invoices.find((i)=>i.invoiceNumber.toLowerCase() === q.toLowerCase() || i.id === q);
        if (inv) {
            setPartyName(inv.partyName);
            setPartyPhone(inv.partyPhone || '');
            setBillingAddress(inv.billingAddress || '');
            setStateOfSupply(inv.stateOfSupply || 'Tamil Nadu');
            setItems(inv.items.map((it)=>({
                    ...it,
                    qty: actionModal.isRefund ? -Math.abs(it.qty) : Math.abs(it.qty),
                    amount: actionModal.isRefund ? -Math.abs(it.amount) : Math.abs(it.amount)
                })));
            setDiscountVal(inv.totalDiscount.toString());
            setDiscountType('Amt');
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success(`Bill ${actionModal.isRefund ? 'refunded' : 'fetched'} successfully!`);
            setActionModal({
                isOpen: false,
                isRefund: false
            });
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Invoice not found!');
        }
    };
    const updateItem = (idx, k, v)=>{
        setItems((prev)=>prev.map((item, i)=>{
                if (i !== idx) return item;
                const upd = {
                    ...item,
                    [k]: v
                };
                // Auto complete product if entering name or barcode
                if (k === 'name' || k === 'barcode') {
                    if (typeof v === 'string' && v.trim() !== '') {
                        // Filter suggestions
                        const searchTerm = v.toLowerCase();
                        const matches = products.filter((p)=>p.name.toLowerCase().includes(searchTerm) || p.barcode && p.barcode.includes(searchTerm) || p.category && p.category.toLowerCase().includes(searchTerm)).slice(0, 10);
                        if (k === 'name') {
                            setFilteredProducts(matches);
                            setShowSuggestions(matches.length > 0);
                            setActiveRowIdx(idx);
                            setActiveSuggestionIdx(0);
                        }
                        const prod = products.find((p)=>k === 'name' && p.name.toLowerCase() === v.toLowerCase() || k === 'barcode' && p.barcode === v);
                        if (prod) {
                            upd.name = prod.name;
                            upd.barcode = prod.barcode || '';
                            upd.hsnCode = prod.hsnCode || '';
                            upd.mrp = prod.mrp || prod.sellingPrice || 0;
                            upd.rate = prod.sellingPrice || 0;
                            upd.gstRate = prod.gstRate || 0;
                            upd.unit = prod.unit || 'Pcs';
                            setShowSuggestions(false);
                        }
                    } else if (k === 'name') {
                        setShowSuggestions(false);
                    }
                }
                const q = parseFloat(upd.qty) || 0;
                const r = parseFloat(upd.rate) || 0;
                const d = parseFloat(upd.discount) || 0;
                const g = parseFloat(upd.gstRate) || 0;
                const calc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcLineItem"])(q, r, d, g);
                return {
                    ...upd,
                    ...calc
                };
            }));
    };
    const selectProduct = (idx, prod)=>{
        updateItem(idx, 'name', prod.name);
        setShowSuggestions(false);
    };
    const addRow = ()=>setItems((prev)=>[
                ...prev,
                emptyRow()
            ]);
    const removeRow = (idx)=>{
        if (items.length > 1) {
            setItems((prev)=>prev.filter((_, i)=>i !== idx));
        } else {
            setItems([
                emptyRow()
            ]);
        }
    };
    const validItems = items.filter((i)=>i.name.trim() !== '' && i.qty > 0 && i.rate > 0);
    const subTotal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["r2"])(validItems.reduce((a, i)=>a + i.taxableAmt, 0));
    const totalGst = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["r2"])(validItems.reduce((a, i)=>a + i.totalGst, 0));
    const preDiscountSum = subTotal + totalGst;
    const dVal = parseFloat(discountVal) || 0;
    const globalDiscount = discountType === '%' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["r2"])(preDiscountSum * dVal / 100) : dVal;
    const afterDiscount = preDiscountSum - globalDiscount;
    const roCalculated = roundOffEnabled ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundOff"])(afterDiscount) : parseFloat(roundOffVal) || 0;
    // Effect to auto update roundOffVal display to match auto calc if enabled
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuickBillingContent.useEffect": ()=>{
            if (roundOffEnabled) setRoundOffVal(roCalculated.toFixed(2));
        }
    }["QuickBillingContent.useEffect"], [
        roCalculated,
        roundOffEnabled
    ]);
    const grandTotal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["r2"])(afterDiscount + (parseFloat(roundOffVal) || 0));
    const handleSave = ()=>{
        if (validItems.length === 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Add at least one complete row (Name, Qty, Price)');
            return false;
        }
        const finalPartyName = partyName.trim() || 'Cash / Walk-in Customer';
        const invNo = nextInvoiceNumber(companyId, 'MN');
        const invoice = {
            id: 'mb_' + Date.now().toString(36),
            companyId: companyId,
            invoiceType: 'sale',
            invoiceNumber: invNo,
            date,
            time,
            stateOfSupply,
            partyName: finalPartyName,
            partyPhone,
            billingAddress,
            items: validItems,
            subTotal,
            taxableAmount: subTotal,
            totalCgst: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["r2"])(validItems.reduce((a, i)=>a + i.cgst, 0)),
            totalSgst: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["r2"])(validItems.reduce((a, i)=>a + i.sgst, 0)),
            totalIgst: 0,
            totalCess: 0,
            totalGst,
            totalDiscount: globalDiscount + (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["r2"])(validItems.reduce((a, i)=>a + i.discountAmt, 0)),
            roundOff: parseFloat(roundOffVal) || 0,
            grandTotal,
            paymentStatus: billType === 'CASH' ? 'paid' : 'unpaid',
            amountPaid: billType === 'CASH' ? grandTotal : 0,
            balanceDue: billType === 'CASH' ? 0 : grandTotal,
            paymentMethod: 'cash',
            isGstBill: validItems.some((i)=>i.gstRate > 0),
            isHidden: false,
            notes: description,
            counter,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        addInvoice(invoice);
        // Adjust stock based on transaction type
        if (invoice.invoiceType === 'sale') {
            validItems.forEach((item)=>{
                if (item.productId) adjustStock(item.productId, -item.qty);
            });
        } else if (invoice.invoiceType === 'purchase') {
            validItems.forEach((item)=>{
                if (item.productId) adjustStock(item.productId, item.qty);
            });
        }
        setSavedBill(invoice);
        return true;
    };
    const handlePrintRequest = ()=>{
        if (validItems.length === 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Add items first!');
            return;
        }
        setCopies(2); // Request specifies print 2 copies
        setShowPrintModal(true);
    };
    const executePrint = ()=>{
        if (!savedBill) {
            const success = handleSave();
            if (!success) return;
        }
        const partyPhoneToUse = savedBill?.partyPhone || partyPhone;
        const currentBill = savedBill || invoices.find((i)=>i.invoiceNumber === nextInvoiceNumber(companyId, 'MN')) || {
            items: validItems,
            invoiceNumber: nextInvoiceNumber(companyId, 'MN'),
            grandTotal,
            balanceDue: billType === 'CASH' ? 0 : grandTotal
        };
        if (partyPhoneToUse) {
            let itemsText = '';
            currentBill.items.forEach((item)=>{
                itemsText += `• ${item.name} (${item.qty} ${item.unit}) - ₹${item.amount.toLocaleString('en-IN')}\n`;
            });
            const bal = currentBill.balanceDue || 0;
            const msg = `*${company?.name || 'Tax Invoice'}*\n\nHello ${partyName || 'Customer'},\nHere is your bill summary (Inv: ${currentBill.invoiceNumber}):\nDate: ${date} ${time}\n\n*Items Purchased:*\n${itemsText}\n*Total Amount:* ₹${currentBill.grandTotal.toLocaleString('en-IN')}\n${bal > 0 ? `\n*Please clear the due balance:* ₹${bal.toLocaleString('en-IN')}\n` : ''}\nThanks for shopping with us!\n\n_Powered by Edibio_`;
            setTimeout(()=>{
                window.open(`https://wa.me/91${partyPhoneToUse.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
            }, 300);
        }
        setShowPrintModal(false);
        setTimeout(()=>window.print(), partyPhoneToUse ? 800 : 300);
    };
    if (savedBill && !showPrintModal) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                background: '#f8f9fa',
                minHeight: '100dvh'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "print-only",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InvoicePrintTemplate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvoicePrintTemplate"], {
                        invoice: savedBill,
                        company: company,
                        copies: copies,
                        themeOverride: company?.quickBillingTheme || 'quick_bill'
                    }, void 0, false, {
                        fileName: "[project]/app/company/billing/quick/page.tsx",
                        lineNumber: 278,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/company/billing/quick/page.tsx",
                    lineNumber: 277,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "no-print",
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '80vh',
                        padding: 20
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                fontSize: 28,
                                fontWeight: 900,
                                marginBottom: 12,
                                color: '#1A202C'
                            },
                            children: "Bill Generated Successfully!"
                        }, void 0, false, {
                            fileName: "[project]/app/company/billing/quick/page.tsx",
                            lineNumber: 282,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 16,
                                color: '#718096',
                                marginBottom: 32
                            },
                            children: [
                                "Invoice ",
                                savedBill.invoiceNumber,
                                " has been saved to the database."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/billing/quick/page.tsx",
                            lineNumber: 283,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                gap: 24,
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                maxWidth: 900
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: 320,
                                        background: 'white',
                                        borderRadius: 20,
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        overflow: 'hidden',
                                        border: '1px solid #E2E8F0'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                height: 160,
                                                background: '#F7FAFC',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderBottom: '1px solid #E2E8F0'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: '#A0AEC0',
                                                    fontWeight: 700,
                                                    fontSize: 13,
                                                    letterSpacing: 1
                                                },
                                                children: "ADVERTISEMENT"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 289,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 288,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                padding: 20
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    style: {
                                                        fontSize: 17,
                                                        fontWeight: 800,
                                                        marginBottom: 8,
                                                        color: '#2D3748'
                                                    },
                                                    children: "Grow Your Business Locally"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 292,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontSize: 13,
                                                        color: '#718096',
                                                        lineHeight: 1.5
                                                    },
                                                    children: "Reach more customers in your area with Google Ads. Start now and get $500 free ad credit."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 293,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    style: {
                                                        marginTop: 16,
                                                        width: '100%',
                                                        padding: '10px',
                                                        background: '#4285F4',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: 8,
                                                        fontWeight: 700,
                                                        cursor: 'pointer'
                                                    },
                                                    children: "Start Advertising"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 294,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 291,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 287,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: 320,
                                        padding: 32,
                                        background: 'linear-gradient(135deg, #1A1A2E, #FF7F50)',
                                        borderRadius: 20,
                                        boxShadow: '0 20px 40px rgba(255,127,80,0.2)',
                                        textAlign: 'center',
                                        color: 'white',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: 'absolute',
                                                top: -40,
                                                right: -40,
                                                width: 120,
                                                height: 120,
                                                background: 'rgba(255,255,255,0.1)',
                                                borderRadius: '50%'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 300,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 32,
                                                fontWeight: 900,
                                                letterSpacing: '-1px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: 6,
                                                marginBottom: 16
                                            },
                                            children: [
                                                "edibio",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: '#2D3748'
                                                    },
                                                    children: "."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 302,
                                                    columnNumber: 39
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 301,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            style: {
                                                fontSize: 20,
                                                fontWeight: 900,
                                                marginBottom: 12,
                                                lineHeight: 1.2
                                            },
                                            children: "Upgrade to Edibio Pro"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 304,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 13,
                                                color: 'rgba(255,255,255,0.8)',
                                                lineHeight: 1.5,
                                                margin: 0
                                            },
                                            children: "Unlock deeper analytics, AI insights, unlimited staff accounts, and priority VIP support today."
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 305,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            style: {
                                                marginTop: 24,
                                                width: '100%',
                                                padding: '12px',
                                                background: 'white',
                                                color: '#1A1A2E',
                                                border: 'none',
                                                borderRadius: 8,
                                                fontWeight: 800,
                                                cursor: 'pointer'
                                            },
                                            children: "Upgrade Now"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 308,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 299,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/billing/quick/page.tsx",
                            lineNumber: 285,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/company/billing/quick/page.tsx",
                    lineNumber: 281,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "no-print",
                    style: {
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: 20,
                        background: 'white',
                        borderTop: '1px solid #ddd',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 16
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setShowPrintModal(true),
                            className: "mi-btn",
                            style: {
                                border: '1px solid #E2E8F0',
                                padding: '10px 20px',
                                background: 'white',
                                cursor: 'pointer'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__["Printer"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 314,
                                    columnNumber: 190
                                }, this),
                                " Print"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/billing/quick/page.tsx",
                            lineNumber: 314,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                setSavedBill(null);
                                setItems([
                                    emptyRow(),
                                    emptyRow()
                                ]);
                                setPartyName('');
                                setPartyPhone('');
                                setBillingAddress('');
                                setDiscountVal('');
                            },
                            className: "mi-btn",
                            style: {
                                background: '#4285F4',
                                color: 'white',
                                border: 'none',
                                padding: '10px 20px',
                                cursor: 'pointer'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 315,
                                    columnNumber: 311
                                }, this),
                                " New Bill"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/billing/quick/page.tsx",
                            lineNumber: 315,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>router.push(`/company/dashboard`),
                            className: "mi-btn",
                            style: {
                                background: 'transparent',
                                padding: '10px 20px',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: 700
                            },
                            children: "Back to Dashboard"
                        }, void 0, false, {
                            fileName: "[project]/app/company/billing/quick/page.tsx",
                            lineNumber: 316,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/company/billing/quick/page.tsx",
                    lineNumber: 313,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                    children: `
            @media print {
              body * { visibility: hidden; }
              .print-only, .print-only * { visibility: visible; }
              .print-only { position: absolute; left: 0; top: 0; width: 100%; display: block !important; }
              .no-print { display: none !important; }
            }
            .print-only { display: none; }
          `
                }, void 0, false, {
                    fileName: "[project]/app/company/billing/quick/page.tsx",
                    lineNumber: 318,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/company/billing/quick/page.tsx",
            lineNumber: 276,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: '100dvh',
            background: '#F8F9FA',
            fontFamily: 'Inter, sans-serif'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "print-only",
                children: savedBill ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InvoicePrintTemplate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvoicePrintTemplate"], {
                    invoice: savedBill,
                    company: company,
                    copies: copies,
                    themeOverride: company?.quickBillingTheme || 'quick_bill'
                }, void 0, false, {
                    fileName: "[project]/app/company/billing/quick/page.tsx",
                    lineNumber: 335,
                    columnNumber: 30
                }, this) : validItems.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InvoicePrintTemplate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvoicePrintTemplate"], {
                    invoice: {
                        partyName: partyName || 'Cash / Walk-in Customer',
                        partyPhone,
                        billingAddress,
                        date,
                        invoiceNumber: nextInvoiceNumber(companyId, 'MN'),
                        items: validItems,
                        grandTotal,
                        totalDiscount: globalDiscount,
                        roundOff: parseFloat(roundOffVal) || 0,
                        subTotal,
                        totalGst
                    },
                    company: company,
                    copies: copies,
                    themeOverride: company?.quickBillingTheme || 'quick_bill'
                }, void 0, false, {
                    fileName: "[project]/app/company/billing/quick/page.tsx",
                    lineNumber: 336,
                    columnNumber: 46
                }, this) : null
            }, void 0, false, {
                fileName: "[project]/app/company/billing/quick/page.tsx",
                lineNumber: 334,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @media print {
            body * { visibility: hidden; }
            .print-only, .print-only * { visibility: visible; }
            .print-only { position: absolute; left: 0; top: 0; width: 100%; display: block !important; }
            .no-print { display: none !important; }
        }
        .print-only { display: none; }
        
        .mi-input {
            border: 1px solid #E2E8F0;
            border-radius: 6px;
            padding: 8px 12px;
            font-size: 13px;
            outline: none;
            width: 100%;
            transition: border-color 0.2s;
            color: #1A202C;
        }
        .mi-input:focus { border-color: #4285F4; }
        .mi-input.error { border-color: #FC8181; background: #FFF5F5; }
        
        .mi-table { width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
        .mi-table th { background: white; border-bottom: 1.5px solid #EDF2F7; padding: 12px 8px; font-size: 11px; font-weight: 800; color: #4A5568; text-transform: uppercase; text-align: left; }
        .mi-table td { padding: 4px; border-bottom: 1px solid #EDF2F7; }
        .mi-table input { width: 100%; border: none; background: transparent; outline: none; padding: 8px 4px; font-size: 13px; color: #1A202C; }
        .mi-table input:focus { background: #EBF8FF; border-radius: 4px; }
        
        .mi-btn { padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 700; cursor: pointer; display: inline-flex; items: center; gap: 6px; border: 1px solid transparent; background: white; color: 4A5568; }
        .mi-btn:hover { background: #F7FAFC; }

        @media (max-width: 768px) {
            .mobile-flex-col { flex-direction: column !important; }
            .mobile-w-full { width: 100% !important; }
            .mobile-hide { display: none !important; }
            .no-print { padding: 16px !important; }
            .mi-table input { min-width: 60px; }
            .mi-table input[placeholder="Search..."] { min-width: 140px; }
        }
      `
            }, void 0, false, {
                fileName: "[project]/app/company/billing/quick/page.tsx",
                lineNumber: 341,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "no-print",
                style: {
                    padding: '24px 32px',
                    maxWidth: 1440,
                    margin: '0 auto'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("datalist", {
                        id: "parties-list",
                        children: parties.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: p.name,
                                children: p.phone || p.id || ''
                            }, p.id || p.name, false, {
                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                lineNumber: 386,
                                columnNumber: 39
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/company/billing/quick/page.tsx",
                        lineNumber: 385,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            marginBottom: 24,
                            flexWrap: 'wrap',
                            gap: 12
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12,
                                    flexWrap: 'wrap',
                                    flex: 1
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        style: {
                                            fontSize: 20,
                                            fontWeight: 900,
                                            color: '#1A202C',
                                            margin: 0,
                                            minWidth: '140px'
                                        },
                                        children: "Manual Invoice"
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 391,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: counter,
                                        onChange: (e)=>setCounter(e.target.value),
                                        className: "e-select",
                                        style: {
                                            width: 'auto',
                                            padding: '6px 10px',
                                            fontSize: 13,
                                            background: 'white',
                                            borderRadius: 8
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                children: "Counter 1"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 394,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                children: "Counter 2"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 395,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                children: "Counter 3"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 396,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                children: "Counter 4"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 397,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 393,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            background: '#EDF2F7',
                                            borderRadius: 8,
                                            padding: 4
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setBillType('CASH'),
                                                style: {
                                                    padding: '6px 16px',
                                                    borderRadius: 6,
                                                    border: 'none',
                                                    background: billType === 'CASH' ? 'white' : 'transparent',
                                                    color: billType === 'CASH' ? '#38A169' : '#718096',
                                                    fontWeight: 800,
                                                    fontSize: 12,
                                                    cursor: 'pointer',
                                                    boxShadow: billType === 'CASH' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                                                },
                                                children: "CASH"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 401,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setBillType('CREDIT'),
                                                style: {
                                                    padding: '6px 16px',
                                                    borderRadius: 6,
                                                    border: 'none',
                                                    background: billType === 'CREDIT' ? 'white' : 'transparent',
                                                    color: billType === 'CREDIT' ? '#1A202C' : '#718096',
                                                    fontWeight: 800,
                                                    fontSize: 12,
                                                    cursor: 'pointer',
                                                    boxShadow: billType === 'CREDIT' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                                                },
                                                children: "CREDIT"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 402,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 400,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleFetchBill(true),
                                        className: "mi-btn",
                                        style: {
                                            border: '1px solid #E2E8F0',
                                            padding: '6px 14px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 405,
                                                columnNumber: 151
                                            }, this),
                                            " Refund"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 405,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleFetchBill(false),
                                        className: "mi-btn",
                                        style: {
                                            border: '1px solid #E2E8F0',
                                            padding: '6px 14px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 406,
                                                columnNumber: 152
                                            }, this),
                                            " Fetch"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 406,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setRecurringModalOpen(true),
                                        className: "mi-btn",
                                        style: {
                                            border: '1px solid transparent',
                                            background: '#EBF4FF',
                                            color: '#3182CE',
                                            padding: '6px 14px',
                                            marginLeft: 8
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$repeat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Repeat$3e$__["Repeat"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 407,
                                                columnNumber: 217
                                            }, this),
                                            " Recurring Bill"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 407,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>router.push(`${activeCompanyId ? '/company' : ''}/billing/expenditure`),
                                        className: "mi-btn",
                                        style: {
                                            border: '1px solid transparent',
                                            background: '#FEEBC8',
                                            color: '#DD6B20',
                                            padding: '6px 14px',
                                            marginLeft: 8
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 409,
                                                columnNumber: 29
                                            }, this),
                                            " Expenditure"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 408,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                lineNumber: 390,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "mobile-hide",
                                onClick: ()=>router.back(),
                                style: {
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 8
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 20,
                                    color: "#718096"
                                }, void 0, false, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 414,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                lineNumber: 413,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/billing/quick/page.tsx",
                        lineNumber: 389,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mobile-flex-col",
                        style: {
                            display: 'flex',
                            gap: 24,
                            marginBottom: 24
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 12
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            gap: 12
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                list: "parties-list",
                                                value: partyName,
                                                onChange: (e)=>{
                                                    const val = e.target.value;
                                                    setPartyName(val);
                                                    const p = parties.find((pt)=>String(pt.name).toLowerCase() === val.toLowerCase());
                                                    if (p) {
                                                        setPartyPhone(p.phone || p.mobile || p.id || '');
                                                        setBillingAddress(p.billingAddress || p.address || '');
                                                    }
                                                },
                                                placeholder: "Customer Name *",
                                                className: `mi-input ${!partyName ? 'error' : ''}`,
                                                style: {
                                                    flex: 1
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 423,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: partyPhone,
                                                onChange: (e)=>{
                                                    const val = e.target.value;
                                                    setPartyPhone(val);
                                                    const searchVal = val.toLowerCase().trim();
                                                    const p = parties.find((p)=>String(p.phone).toLowerCase() === searchVal || String(p.mobile).toLowerCase() === searchVal || String(p.id).toLowerCase() === searchVal);
                                                    if (p) {
                                                        setPartyName(p.name || '');
                                                        setBillingAddress(p.billingAddress || p.address || '');
                                                    } else {
                                                        const inv = invoices.find((i)=>String(i.partyPhone).toLowerCase() === searchVal || String(i.partyId).toLowerCase() === searchVal);
                                                        if (inv) {
                                                            setPartyName(inv.partyName);
                                                            setBillingAddress(inv.billingAddress || '');
                                                        }
                                                    }
                                                },
                                                placeholder: "Phone No. or ID",
                                                className: "mi-input",
                                                style: {
                                                    flex: 1
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 432,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 422,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            gap: 12,
                                            alignItems: 'center'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: billingAddress,
                                                onChange: (e)=>setBillingAddress(e.target.value),
                                                placeholder: "Billing Address",
                                                className: "mi-input",
                                                style: {
                                                    resize: 'none',
                                                    height: 40,
                                                    flex: 1
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 450,
                                                columnNumber: 29
                                            }, this),
                                            partyName && invoices.some((i)=>i.partyName === partyName || i.partyPhone === partyPhone) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setRecurringModalOpen(true),
                                                className: "mi-btn",
                                                style: {
                                                    height: 40,
                                                    background: '#EBF4FF',
                                                    color: '#3182CE',
                                                    border: 'none',
                                                    whiteSpace: 'nowrap'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$repeat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Repeat$3e$__["Repeat"], {
                                                        size: 14
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 453,
                                                        columnNumber: 37
                                                    }, this),
                                                    " Last Purchases"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 452,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 449,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                lineNumber: 421,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mobile-w-full",
                                style: {
                                    width: 320,
                                    background: 'transparent',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 10,
                                    justifyContent: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 12,
                                                    color: '#718096',
                                                    fontWeight: 600
                                                },
                                                children: "Invoice Number"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 462,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 13,
                                                    color: '#A0AEC0',
                                                    fontWeight: 700
                                                },
                                                children: nextInvoiceNumber(companyId, 'MN')
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 463,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 461,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 12,
                                                    color: '#718096',
                                                    fontWeight: 600
                                                },
                                                children: "Invoice Date"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 466,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    position: 'relative'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "date",
                                                        value: date,
                                                        onChange: (e)=>setDate(e.target.value),
                                                        className: "mi-input",
                                                        style: {
                                                            padding: '4px 8px',
                                                            width: 130,
                                                            paddingRight: 30
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 468,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                        size: 14,
                                                        color: "#A0AEC0",
                                                        style: {
                                                            position: 'absolute',
                                                            right: 8,
                                                            top: '50%',
                                                            transform: 'translateY(-50%)',
                                                            pointerEvents: 'none'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 469,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 467,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 465,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 12,
                                                    color: '#718096',
                                                    fontWeight: 600
                                                },
                                                children: "Time"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 473,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    position: 'relative'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "time",
                                                        value: time,
                                                        onChange: (e)=>setTime(e.target.value),
                                                        className: "mi-input",
                                                        style: {
                                                            padding: '4px 8px',
                                                            width: 130,
                                                            paddingRight: 30
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 475,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                        size: 14,
                                                        color: "#A0AEC0",
                                                        style: {
                                                            position: 'absolute',
                                                            right: 8,
                                                            top: '50%',
                                                            transform: 'translateY(-50%)',
                                                            pointerEvents: 'none'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 476,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 474,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 472,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 12,
                                                    color: '#718096',
                                                    fontWeight: 600
                                                },
                                                children: "State of supply"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 480,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: stateOfSupply,
                                                onChange: (e)=>setStateOfSupply(e.target.value),
                                                className: "mi-input",
                                                style: {
                                                    padding: '4px 8px',
                                                    width: 130
                                                },
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INDIAN_STATES"].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        children: s
                                                    }, s, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 482,
                                                        columnNumber: 57
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 481,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 479,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                lineNumber: 460,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/billing/quick/page.tsx",
                        lineNumber: 419,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            border: '1px solid #E2E8F0',
                            borderRadius: 12,
                            background: 'white',
                            overflowX: 'auto',
                            WebkitOverflowScrolling: 'touch',
                            paddingBottom: 16
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "mi-table",
                                style: {
                                    border: 'none',
                                    borderRadius: 0,
                                    boxShadow: 'none'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    style: {
                                                        width: 40,
                                                        textAlign: 'center'
                                                    },
                                                    children: "#"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 493,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    style: {
                                                        width: '15%'
                                                    },
                                                    children: "ITEM"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 494,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "BARCODE"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 495,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "HSN"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 496,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "MFG. DATE"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 497,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    style: {
                                                        textAlign: 'right'
                                                    },
                                                    children: "MRP"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 498,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    style: {
                                                        textAlign: 'center'
                                                    },
                                                    children: "SIZE"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 499,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    style: {
                                                        textAlign: 'center',
                                                        width: 60
                                                    },
                                                    children: "QTY"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 500,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    style: {
                                                        textAlign: 'center',
                                                        width: 60
                                                    },
                                                    children: "UNIT"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 501,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    style: {
                                                        textAlign: 'right',
                                                        width: 80
                                                    },
                                                    children: "PRICE"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 502,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    style: {
                                                        textAlign: 'center',
                                                        color: '#4285F4'
                                                    },
                                                    children: [
                                                        "DISCOUNT",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 503,
                                                            columnNumber: 95
                                                        }, this),
                                                        "%",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                display: 'inline-block',
                                                                width: 20
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 503,
                                                            columnNumber: 102
                                                        }, this),
                                                        "AMT"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 503,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    style: {
                                                        textAlign: 'center',
                                                        color: '#4285F4'
                                                    },
                                                    children: [
                                                        "TAX",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 504,
                                                            columnNumber: 90
                                                        }, this),
                                                        "%",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                display: 'inline-block',
                                                                width: 20
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 504,
                                                            columnNumber: 97
                                                        }, this),
                                                        "AMT"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 504,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    style: {
                                                        textAlign: 'right',
                                                        width: 100
                                                    },
                                                    children: "AMOUNT"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 505,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    style: {
                                                        textAlign: 'center',
                                                        width: 40
                                                    },
                                                    children: "ACT"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 506,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 492,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 491,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        children: items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        style: {
                                                            textAlign: 'center',
                                                            fontSize: 12,
                                                            color: '#A0AEC0'
                                                        },
                                                        children: i + 1
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 512,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        style: {
                                                            position: 'relative'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                id: `name-input-${i}`,
                                                                value: item.name,
                                                                autoComplete: "off",
                                                                onChange: (e)=>updateItem(i, 'name', e.target.value),
                                                                onFocus: ()=>{
                                                                    if (item.name.trim()) {
                                                                        const matches = products.filter((p)=>p.name.toLowerCase().includes(item.name.toLowerCase())).slice(0, 10);
                                                                        setFilteredProducts(matches);
                                                                        setShowSuggestions(matches.length > 0);
                                                                        setActiveRowIdx(i);
                                                                    }
                                                                },
                                                                onBlur: ()=>setTimeout(()=>{
                                                                        if (activeRowIdx === i) setShowSuggestions(false);
                                                                    }, 200),
                                                                onKeyDown: (e)=>{
                                                                    if (showSuggestions && activeRowIdx === i) {
                                                                        if (e.key === 'ArrowDown') {
                                                                            e.preventDefault();
                                                                            setActiveSuggestionIdx((s)=>(s + 1) % filteredProducts.length);
                                                                        } else if (e.key === 'ArrowUp') {
                                                                            e.preventDefault();
                                                                            setActiveSuggestionIdx((s)=>(s - 1 + filteredProducts.length) % filteredProducts.length);
                                                                        } else if (e.key === 'Enter' || e.key === 'Tab') {
                                                                            if (filteredProducts[activeSuggestionIdx]) {
                                                                                e.preventDefault();
                                                                                selectProduct(i, filteredProducts[activeSuggestionIdx]);
                                                                                return;
                                                                            }
                                                                        } else if (e.key === 'Escape') {
                                                                            setShowSuggestions(false);
                                                                        }
                                                                    }
                                                                    if (e.key === 'Enter') {
                                                                        e.preventDefault();
                                                                        if (i === items.length - 1) {
                                                                            setItems((prev)=>{
                                                                                const nextRows = [
                                                                                    ...prev,
                                                                                    emptyRow()
                                                                                ];
                                                                                setTimeout(()=>{
                                                                                    document.getElementById(`name-input-${i + 1}`)?.focus();
                                                                                }, 100);
                                                                                return nextRows;
                                                                            });
                                                                        } else {
                                                                            setTimeout(()=>{
                                                                                document.getElementById(`name-input-${i + 1}`)?.focus();
                                                                            }, 50);
                                                                        }
                                                                    }
                                                                },
                                                                placeholder: "Search product..."
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                lineNumber: 514,
                                                                columnNumber: 41
                                                            }, this),
                                                            showSuggestions && activeRowIdx === i && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "custom-dropdown",
                                                                style: {
                                                                    position: 'absolute',
                                                                    top: '100%',
                                                                    left: 0,
                                                                    width: '280px',
                                                                    background: 'white',
                                                                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                                                                    borderRadius: '12px',
                                                                    zIndex: 100,
                                                                    marginTop: 4,
                                                                    overflow: 'hidden',
                                                                    border: '1px solid #E2E8F0',
                                                                    padding: '6px'
                                                                },
                                                                children: filteredProducts.map((p, pIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        onClick: ()=>selectProduct(i, p),
                                                                        onMouseEnter: ()=>setActiveSuggestionIdx(pIdx),
                                                                        style: {
                                                                            padding: '10px 14px',
                                                                            cursor: 'pointer',
                                                                            borderRadius: '8px',
                                                                            background: activeSuggestionIdx === pIdx ? '#4285F4' : 'transparent',
                                                                            color: activeSuggestionIdx === pIdx ? 'white' : '#1A202C',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'space-between',
                                                                            transition: 'all 0.1s'
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                style: {
                                                                                    display: 'flex',
                                                                                    flexDirection: 'column',
                                                                                    gap: 2
                                                                                },
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        style: {
                                                                                            fontWeight: 700,
                                                                                            fontSize: 13
                                                                                        },
                                                                                        children: p.name
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                                        lineNumber: 582,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        style: {
                                                                                            fontSize: 10,
                                                                                            opacity: activeSuggestionIdx === pIdx ? 0.8 : 0.5
                                                                                        },
                                                                                        children: [
                                                                                            "₹",
                                                                                            p.sellingPrice,
                                                                                            " • ",
                                                                                            p.stockQty,
                                                                                            " in stock"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                                        lineNumber: 583,
                                                                                        columnNumber: 61
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                                lineNumber: 581,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            p.barcode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                style: {
                                                                                    fontSize: 9,
                                                                                    fontFamily: 'monospace',
                                                                                    background: activeSuggestionIdx === pIdx ? 'rgba(255,255,255,0.2)' : '#F1F5F9',
                                                                                    padding: '2px 4px',
                                                                                    borderRadius: 4
                                                                                },
                                                                                children: p.barcode
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                                lineNumber: 585,
                                                                                columnNumber: 71
                                                                            }, this)
                                                                        ]
                                                                    }, p.id || p.name, true, {
                                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                        lineNumber: 570,
                                                                        columnNumber: 53
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                lineNumber: 564,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 513,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            id: `barcode-input-${i}`,
                                                            value: item.barcode,
                                                            autoComplete: "off",
                                                            onChange: (e)=>updateItem(i, 'barcode', e.target.value),
                                                            onKeyDown: (e)=>{
                                                                if (e.key === 'Enter') {
                                                                    e.preventDefault();
                                                                    if (i === items.length - 1) {
                                                                        setItems((prev)=>{
                                                                            const nextRows = [
                                                                                ...prev,
                                                                                emptyRow()
                                                                            ];
                                                                            // use a slightly longer timeout to guarantee render is complete
                                                                            setTimeout(()=>{
                                                                                document.getElementById(`barcode-input-${i + 1}`)?.focus();
                                                                            }, 100);
                                                                            return nextRows;
                                                                        });
                                                                    } else {
                                                                        setTimeout(()=>{
                                                                            document.getElementById(`barcode-input-${i + 1}`)?.focus();
                                                                        }, 50);
                                                                    }
                                                                }
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 591,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 591,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            value: item.hsnCode,
                                                            onChange: (e)=>updateItem(i, 'hsnCode', e.target.value)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 606,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 606,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "date",
                                                            value: item.mfgDate,
                                                            onChange: (e)=>updateItem(i, 'mfgDate', e.target.value),
                                                            style: {
                                                                padding: '8px 2px'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 607,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 607,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            value: item.mrp || '',
                                                            onChange: (e)=>updateItem(i, 'mrp', parseFloat(e.target.value) || 0),
                                                            style: {
                                                                textAlign: 'right'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 608,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 608,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            value: item.size,
                                                            onChange: (e)=>updateItem(i, 'size', e.target.value),
                                                            style: {
                                                                textAlign: 'center'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 609,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 609,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            min: "0",
                                                            value: item.qty,
                                                            onChange: (e)=>updateItem(i, 'qty', e.target.value),
                                                            style: {
                                                                textAlign: 'center',
                                                                fontWeight: 'bold'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 610,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 610,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            value: item.unit,
                                                            onChange: (e)=>updateItem(i, 'unit', e.target.value),
                                                            style: {
                                                                textAlign: 'center'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 611,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 611,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            min: "0",
                                                            value: item.rate || '',
                                                            onChange: (e)=>updateItem(i, 'rate', e.target.value),
                                                            style: {
                                                                textAlign: 'right'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 612,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 612,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        style: {
                                                            textAlign: 'center'
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                gap: 4,
                                                                justifyContent: 'center'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "number",
                                                                    value: item.discount,
                                                                    onChange: (e)=>updateItem(i, 'discount', e.target.value),
                                                                    style: {
                                                                        width: 40,
                                                                        padding: '4px',
                                                                        textAlign: 'center',
                                                                        borderBottom: '1px solid #ddd'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                    lineNumber: 615,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    readOnly: true,
                                                                    value: item.discountAmt.toFixed(2),
                                                                    style: {
                                                                        width: 50,
                                                                        padding: '4px',
                                                                        textAlign: 'center',
                                                                        color: '#A0AEC0'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                    lineNumber: 616,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 614,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 613,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        style: {
                                                            textAlign: 'center'
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                gap: 4,
                                                                justifyContent: 'center'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "number",
                                                                    value: item.gstRate,
                                                                    onChange: (e)=>updateItem(i, 'gstRate', e.target.value),
                                                                    style: {
                                                                        width: 40,
                                                                        padding: '4px',
                                                                        textAlign: 'center',
                                                                        borderBottom: '1px solid #ddd'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                    lineNumber: 621,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    readOnly: true,
                                                                    value: item.totalGst.toFixed(2),
                                                                    style: {
                                                                        width: 50,
                                                                        padding: '4px',
                                                                        textAlign: 'center',
                                                                        color: '#A0AEC0'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                    lineNumber: 622,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 620,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 619,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        style: {
                                                            textAlign: 'right',
                                                            fontWeight: 800,
                                                            paddingRight: 16
                                                        },
                                                        children: item.amount.toFixed(2)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 625,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        style: {
                                                            textAlign: 'center'
                                                        },
                                                        children: items.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>removeRow(i),
                                                            className: "btn btn-ghost btn-icon",
                                                            style: {
                                                                padding: 4,
                                                                color: '#EA4335'
                                                            },
                                                            title: "Remove item",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                size: 14
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                lineNumber: 629,
                                                                columnNumber: 49
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 628,
                                                            columnNumber: 45
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 626,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 511,
                                                columnNumber: 33
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 509,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                lineNumber: 490,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: '16px 20px 0'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: addRow,
                                    className: "mi-btn",
                                    style: {
                                        border: '2px solid #2D3748',
                                        color: '#2D3748',
                                        borderRadius: 8,
                                        padding: '6px 16px',
                                        fontWeight: 800
                                    },
                                    children: "+ ADD ROW"
                                }, void 0, false, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 638,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                lineNumber: 637,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/billing/quick/page.tsx",
                        lineNumber: 489,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mobile-flex-col",
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: 24,
                            gap: 24
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: 12,
                                    alignItems: 'flex-start'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 8
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setShowDesc(!showDesc),
                                                className: "mi-btn",
                                                style: {
                                                    border: '1px solid #E2E8F0',
                                                    padding: '10px 16px',
                                                    background: 'white'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 648,
                                                        columnNumber: 178
                                                    }, this),
                                                    " ADD DESCRIPTION"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 648,
                                                columnNumber: 29
                                            }, this),
                                            showDesc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: description,
                                                onChange: (e)=>setDescription(e.target.value),
                                                placeholder: "Invoice Desc / Notes...",
                                                className: "mi-input",
                                                style: {
                                                    width: 200,
                                                    height: 80,
                                                    resize: 'none'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 649,
                                                columnNumber: 42
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 647,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "mi-btn",
                                        style: {
                                            border: '1px solid #E2E8F0',
                                            padding: '10px 16px',
                                            background: 'white'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 651,
                                                columnNumber: 135
                                            }, this),
                                            " ADD IMAGE"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 651,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                lineNumber: 646,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mobile-w-full",
                                style: {
                                    background: 'white',
                                    borderRadius: 12,
                                    border: '1px solid #E2E8F0',
                                    padding: 20,
                                    width: 380,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 16
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 13,
                                                    fontWeight: 700,
                                                    color: '#4A5568'
                                                },
                                                children: "Discount"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 656,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 8
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            border: '1px solid #E2E8F0',
                                                            borderRadius: 6,
                                                            display: 'flex',
                                                            overflow: 'hidden'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                value: discountType,
                                                                onChange: (e)=>setDiscountType(e.target.value),
                                                                style: {
                                                                    border: 'none',
                                                                    background: '#F7FAFC',
                                                                    outline: 'none',
                                                                    padding: '4px 8px',
                                                                    fontSize: 12,
                                                                    borderRight: '1px solid #E2E8F0',
                                                                    cursor: 'pointer'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        children: "%"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                        lineNumber: 660,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        children: "Amt"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                        lineNumber: 660,
                                                                        columnNumber: 59
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                lineNumber: 659,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                value: discountVal,
                                                                onChange: (e)=>setDiscountVal(e.target.value),
                                                                style: {
                                                                    width: 80,
                                                                    border: 'none',
                                                                    outline: 'none',
                                                                    padding: '4px 8px',
                                                                    textAlign: 'right',
                                                                    fontSize: 13
                                                                },
                                                                placeholder: "0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                lineNumber: 662,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 658,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            width: 60,
                                                            textAlign: 'right',
                                                            fontWeight: 800
                                                        },
                                                        children: globalDiscount.toFixed(2)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 664,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 657,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 655,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 8
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setRoundOffEnabled(!roundOffEnabled),
                                                        style: {
                                                            width: 22,
                                                            height: 22,
                                                            borderRadius: 6,
                                                            border: roundOffEnabled ? 'none' : '1px solid #CBD5E0',
                                                            background: roundOffEnabled ? '#4285F4' : 'transparent',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            cursor: 'pointer'
                                                        },
                                                        children: roundOffEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                            size: 14,
                                                            color: "white"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 671,
                                                            columnNumber: 57
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 670,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: 13,
                                                            fontWeight: 700,
                                                            color: '#4A5568'
                                                        },
                                                        children: "Round Off"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 673,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 669,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 8
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: roundOffVal,
                                                        onChange: (e)=>{
                                                            setRoundOffEnabled(false);
                                                            setRoundOffVal(e.target.value);
                                                        },
                                                        style: {
                                                            width: 120,
                                                            border: '1px solid #E2E8F0',
                                                            borderRadius: 6,
                                                            outline: 'none',
                                                            padding: '4px 8px',
                                                            textAlign: 'right',
                                                            fontSize: 13
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 676,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            width: 60,
                                                            textAlign: 'right',
                                                            fontWeight: 800
                                                        },
                                                        children: parseFloat(roundOffVal || '0').toFixed(2)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 677,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 675,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 668,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: '#E2E8F0',
                                            height: 1,
                                            margin: '4px 0'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 681,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
                                            gap: 12
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    border: '1.5px solid #CBD5E0',
                                                    borderRadius: 8,
                                                    overflow: 'hidden'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: handlePrintRequest,
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 6,
                                                            padding: '12px 20px',
                                                            background: 'white',
                                                            border: 'none',
                                                            color: '#4285F4',
                                                            fontWeight: 800,
                                                            cursor: 'pointer',
                                                            fontSize: 14
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__["Printer"], {
                                                                size: 16
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                lineNumber: 685,
                                                                columnNumber: 37
                                                            }, this),
                                                            " PRINT (F12)"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 684,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            width: 1,
                                                            background: '#CBD5E0'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 687,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        style: {
                                                            padding: '0 10px',
                                                            background: 'white',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            color: '#4A5568'
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                            size: 14
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 689,
                                                            columnNumber: 37
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 688,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 683,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleSave,
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 6,
                                                    padding: '14px 32px',
                                                    background: '#4285F4',
                                                    color: 'white',
                                                    borderRadius: 8,
                                                    border: 'none',
                                                    fontWeight: 900,
                                                    fontSize: 14,
                                                    cursor: 'pointer',
                                                    boxShadow: '0 4px 12px rgba(66,133,244,0.3)'
                                                },
                                                children: "💾 SAVE INVOICE"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 692,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 682,
                                        columnNumber: 25
                                    }, this),
                                    grandTotal > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    textAlign: 'right',
                                                    fontSize: 24,
                                                    fontWeight: 900,
                                                    color: '#1A202C',
                                                    marginTop: 8
                                                },
                                                children: [
                                                    "₹",
                                                    grandTotal.toLocaleString('en-IN', {
                                                        minimumFractionDigits: 2
                                                    })
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 698,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    marginTop: 12,
                                                    padding: '12px',
                                                    background: '#F8FAFC',
                                                    borderRadius: 8,
                                                    border: '1px solid #E2E8F0'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: 14,
                                                            fontWeight: 800,
                                                            color: '#4A5568'
                                                        },
                                                        children: "Amount Given"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 702,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 8
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            value: amountGiven,
                                                            onChange: (e)=>setAmountGiven(e.target.value),
                                                            style: {
                                                                width: 120,
                                                                border: 'none',
                                                                borderRadius: 6,
                                                                outline: 'none',
                                                                padding: '8px 12px',
                                                                textAlign: 'right',
                                                                fontSize: 16,
                                                                fontWeight: 800,
                                                                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)'
                                                            },
                                                            placeholder: "0.00"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 704,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 703,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 701,
                                                columnNumber: 33
                                            }, this),
                                            amountGiven && parseFloat(amountGiven) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    marginTop: 12,
                                                    fontSize: 15,
                                                    fontWeight: 900,
                                                    padding: '0 12px'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            color: '#4A5568'
                                                        },
                                                        children: "Balance:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 715,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            color: parseFloat(amountGiven) >= grandTotal ? '#38A169' : '#E53E3E'
                                                        },
                                                        children: [
                                                            parseFloat(amountGiven) >= grandTotal ? '+' : '',
                                                            (parseFloat(amountGiven) - grandTotal).toFixed(2)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 716,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 714,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                lineNumber: 654,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/billing/quick/page.tsx",
                        lineNumber: 645,
                        columnNumber: 17
                    }, this),
                    showPrintModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 9999
                        },
                        onClick: ()=>setShowPrintModal(false),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: (e)=>e.stopPropagation(),
                            style: {
                                background: 'white',
                                padding: 32,
                                borderRadius: 16,
                                width: 360
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    style: {
                                        fontWeight: 900,
                                        fontSize: 20,
                                        marginBottom: 24,
                                        textAlign: 'center'
                                    },
                                    children: "Print Setup"
                                }, void 0, false, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 731,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: 24
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                display: 'block',
                                                fontSize: 12,
                                                fontWeight: 800,
                                                color: '#4A5568',
                                                marginBottom: 12,
                                                textTransform: 'uppercase'
                                            },
                                            children: "Number of Copies"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 733,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                gap: 12
                                            },
                                            children: [
                                                1,
                                                2,
                                                3
                                            ].map((num)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setCopies(num),
                                                    style: {
                                                        flex: 1,
                                                        padding: '12px',
                                                        borderRadius: 12,
                                                        border: '2px solid',
                                                        borderColor: copies === num ? '#4285F4' : '#E2E8F0',
                                                        background: copies === num ? '#E8F0FE' : 'white',
                                                        cursor: 'pointer',
                                                        fontWeight: 900,
                                                        fontSize: 16,
                                                        color: copies === num ? '#1967D2' : '#4A5568'
                                                    },
                                                    children: num
                                                }, num, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 736,
                                                    columnNumber: 41
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 734,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 732,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: 12
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowPrintModal(false),
                                            style: {
                                                flex: 1,
                                                padding: '12px',
                                                borderRadius: 12,
                                                background: 'white',
                                                border: '2px solid #E2E8F0',
                                                fontWeight: 800,
                                                color: '#4A5568',
                                                cursor: 'pointer'
                                            },
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 745,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: executePrint,
                                            style: {
                                                flex: 1,
                                                padding: '12px',
                                                borderRadius: 12,
                                                background: '#4285F4',
                                                border: 'none',
                                                fontWeight: 800,
                                                color: 'white',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: 8
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__["Printer"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 746,
                                                    columnNumber: 283
                                                }, this),
                                                " Print"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 746,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 744,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/billing/quick/page.tsx",
                            lineNumber: 730,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/company/billing/quick/page.tsx",
                        lineNumber: 729,
                        columnNumber: 21
                    }, this),
                    actionModal.isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 9999
                        },
                        onClick: ()=>setActionModal({
                                isOpen: false,
                                isRefund: false
                            }),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: (e)=>e.stopPropagation(),
                            style: {
                                background: 'white',
                                padding: 32,
                                borderRadius: 16,
                                width: 360,
                                animation: 'fadeUp 0.2s ease'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    style: {
                                        fontWeight: 900,
                                        fontSize: 18,
                                        marginBottom: 8,
                                        color: '#1A202C'
                                    },
                                    children: actionModal.isRefund ? 'Refund Invoice' : 'Fetch Invoice'
                                }, void 0, false, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 756,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 13,
                                        color: '#718096',
                                        marginBottom: 20
                                    },
                                    children: [
                                        "Enter the Invoice Number to proceed with ",
                                        actionModal.isRefund ? 'refund' : 'fetching',
                                        "."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 759,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    autoFocus: true,
                                    value: actionQuery,
                                    onChange: (e)=>setActionQuery(e.target.value),
                                    onKeyDown: (e)=>e.key === 'Enter' && executeAction(),
                                    placeholder: "e.g. MN1001",
                                    className: "mi-input",
                                    style: {
                                        marginBottom: 20,
                                        fontSize: 15,
                                        padding: '12px',
                                        fontWeight: 700
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 762,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: 12
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setActionModal({
                                                    isOpen: false,
                                                    isRefund: false
                                                }),
                                            style: {
                                                flex: 1,
                                                padding: '10px',
                                                borderRadius: 8,
                                                background: 'white',
                                                border: '1px solid #E2E8F0',
                                                fontWeight: 700,
                                                color: '#4A5568',
                                                cursor: 'pointer'
                                            },
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 772,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: executeAction,
                                            style: {
                                                flex: 1,
                                                padding: '10px',
                                                borderRadius: 8,
                                                background: '#4285F4',
                                                border: 'none',
                                                fontWeight: 700,
                                                color: 'white',
                                                cursor: 'pointer'
                                            },
                                            children: "Confirm"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 773,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 771,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/billing/quick/page.tsx",
                            lineNumber: 755,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/company/billing/quick/page.tsx",
                        lineNumber: 754,
                        columnNumber: 21
                    }, this),
                    recurringModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 9999
                        },
                        onClick: ()=>setRecurringModalOpen(false),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: (e)=>e.stopPropagation(),
                            style: {
                                background: 'white',
                                padding: 32,
                                borderRadius: 16,
                                width: 500,
                                animation: 'fadeUp 0.2s ease',
                                maxHeight: '80vh',
                                display: 'flex',
                                flexDirection: 'column'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    style: {
                                        fontWeight: 900,
                                        fontSize: 18,
                                        marginBottom: 8,
                                        color: '#1A202C'
                                    },
                                    children: "Recurring Bills"
                                }, void 0, false, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 783,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 13,
                                        color: '#718096',
                                        marginBottom: 20
                                    },
                                    children: "Select a previous customer to quickly load their usual bill items."
                                }, void 0, false, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 784,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 12,
                                        overflowY: 'auto',
                                        flex: 1
                                    },
                                    children: [
                                        invoices.filter((v, i, a)=>a.findIndex((t)=>t.partyPhone === v.partyPhone && v.partyPhone) === i).length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                textAlign: 'center',
                                                color: '#A0AEC0',
                                                padding: 20
                                            },
                                            children: "No previous bills found."
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 790,
                                            columnNumber: 37
                                        }, this),
                                        invoices.filter((v, i, a)=>a.findIndex((t)=>t.partyPhone === v.partyPhone && v.partyPhone) === i).slice(0, 15).map((inv)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    padding: 12,
                                                    border: '1px solid #E2E8F0',
                                                    borderRadius: 8,
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            flex: 1
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontWeight: 800,
                                                                    fontSize: 14
                                                                },
                                                                children: [
                                                                    inv.partyName,
                                                                    " ",
                                                                    inv.partyPhone ? `(${inv.partyPhone})` : ''
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                lineNumber: 795,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontSize: 12,
                                                                    color: '#718096',
                                                                    marginTop: 4
                                                                },
                                                                children: inv.items.map((it)=>it.name).join(', ')
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                lineNumber: 796,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 794,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setPartyName(inv.partyName);
                                                            setPartyPhone(inv.partyPhone || '');
                                                            setBillingAddress(inv.billingAddress || '');
                                                            setStateOfSupply(inv.stateOfSupply || 'Tamil Nadu');
                                                            setItems(inv.items.map((it)=>({
                                                                    ...it,
                                                                    qty: Math.abs(it.qty),
                                                                    amount: Math.abs(it.amount)
                                                                })));
                                                            setDiscountVal(inv.totalDiscount.toString());
                                                            setDiscountType('Amt');
                                                            setRecurringModalOpen(false);
                                                        },
                                                        className: "mi-btn",
                                                        style: {
                                                            background: '#4285F4',
                                                            color: 'white',
                                                            border: 'none',
                                                            marginLeft: 12
                                                        },
                                                        children: "Load Items"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 800,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, inv.id, true, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 793,
                                                columnNumber: 37
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 788,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: 12,
                                        marginTop: 24
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setRecurringModalOpen(false),
                                        style: {
                                            flex: 1,
                                            padding: '10px',
                                            borderRadius: 8,
                                            background: 'white',
                                            border: '1px solid #E2E8F0',
                                            fontWeight: 700,
                                            color: '#4A5568',
                                            cursor: 'pointer'
                                        },
                                        children: "Close"
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 815,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 814,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/billing/quick/page.tsx",
                            lineNumber: 782,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/company/billing/quick/page.tsx",
                        lineNumber: 781,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/billing/quick/page.tsx",
                lineNumber: 382,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/company/billing/quick/page.tsx",
        lineNumber: 332,
        columnNumber: 9
    }, this);
}
_s(QuickBillingContent, "0lIYKA40WCSC6MzbN7esDPD8f7w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActiveCompany"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c = QuickBillingContent;
function NewBillPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QuickBillingContent, {}, void 0, false, {
            fileName: "[project]/app/company/billing/quick/page.tsx",
            lineNumber: 826,
            columnNumber: 22
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/company/billing/quick/page.tsx",
        lineNumber: 826,
        columnNumber: 12
    }, this);
}
_c1 = NewBillPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "QuickBillingContent");
__turbopack_context__.k.register(_c1, "NewBillPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_bcd47140._.js.map