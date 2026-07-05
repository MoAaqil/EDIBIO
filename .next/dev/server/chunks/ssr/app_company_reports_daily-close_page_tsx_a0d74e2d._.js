module.exports = [
"[project]/app/company/reports/daily-close/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DailyCloseReport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-ssr] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-down.js [app-ssr] (ecmascript) <export default as TrendingDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wallet.js [app-ssr] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-ssr] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/printer.js [app-ssr] (ecmascript) <export default as Printer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-ssr] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Unlock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock-open.js [app-ssr] (ecmascript) <export default as Unlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-ssr] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
const METHOD_ICONS = {
    cash: '💵',
    upi: '📱',
    card: '💳',
    bank: '🏦',
    cheque: '📝',
    neft: '🔁',
    rtgs: '🔄',
    credit: '🤝'
};
function DailyCloseReport() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const company = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useActiveCompany"])();
    const invoices = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompanyData"])('invoices');
    const expenses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompanyData"])('expenses');
    const parties = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompanyData"])('parties');
    const todayISO = new Date().toISOString().slice(0, 10);
    const [selectedDate, setSelectedDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(todayISO);
    const [closedDays, setClosedDays] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return [];
    });
    const isClosed = closedDays.includes(selectedDate);
    const closeDay = ()=>{
        if (isClosed) return;
        const updated = [
            ...closedDays,
            selectedDate
        ];
        setClosedDays(updated);
        localStorage.setItem('edibio_closed_days', JSON.stringify(updated));
    };
    const reopenDay = ()=>{
        const updated = closedDays.filter((d)=>d !== selectedDate);
        setClosedDays(updated);
        localStorage.setItem('edibio_closed_days', JSON.stringify(updated));
    };
    // --- Filter data for selected date ---
    const DRAFT_TYPES = [
        'estimate',
        'proforma',
        'delivery_challan'
    ];
    const dayInvoices = invoices.filter((i)=>i.date === selectedDate && !DRAFT_TYPES.includes(i.invoiceType));
    const daySales = dayInvoices.filter((i)=>i.invoiceType === 'sale');
    const daySaleReturns = dayInvoices.filter((i)=>i.invoiceType === 'sale_return');
    const dayPurchases = dayInvoices.filter((i)=>i.invoiceType === 'purchase');
    const dayExpenses = expenses.filter((e)=>e.date === selectedDate);
    const totalSales = daySales.reduce((a, i)=>a + i.grandTotal, 0);
    const totalReturns = daySaleReturns.reduce((a, i)=>a + Math.abs(i.grandTotal), 0);
    const totalPurchases = dayPurchases.reduce((a, i)=>a + i.grandTotal, 0);
    const totalExpenses = dayExpenses.reduce((a, e)=>a + e.amount, 0);
    const totalReceived = daySales.reduce((a, i)=>a + i.amountPaid, 0);
    const totalPending = daySales.reduce((a, i)=>a + (i.balanceDue || 0), 0);
    const netCash = totalReceived - totalPurchases - totalExpenses;
    const totalGstCollected = daySales.reduce((a, i)=>a + (i.totalGst || 0), 0);
    // Payment method breakdown
    const paymentBreakdown = {};
    daySales.forEach((inv)=>{
        if (inv.splitPayments && inv.splitPayments.length > 0) {
            inv.splitPayments.forEach((sp)=>{
                paymentBreakdown[sp.method] = (paymentBreakdown[sp.method] || 0) + sp.amount;
            });
        } else {
            const m = inv.paymentMethod || 'cash';
            paymentBreakdown[m] = (paymentBreakdown[m] || 0) + inv.amountPaid;
        }
    });
    // Top items sold
    const itemMap = {};
    daySales.forEach((inv)=>{
        (inv.items || []).forEach((item)=>{
            if (!itemMap[item.name]) itemMap[item.name] = {
                name: item.name,
                qty: 0,
                revenue: 0
            };
            itemMap[item.name].qty += item.qty;
            itemMap[item.name].revenue += item.amount;
        });
    });
    const topItems = Object.values(itemMap).sort((a, b)=>b.revenue - a.revenue).slice(0, 8);
    const maxItemRevenue = Math.max(...topItems.map((i)=>i.revenue), 1);
    const fmt = (n)=>`₹${n.toLocaleString('en-IN', {
            minimumFractionDigits: 2
        })}`;
    // Due payments — all unpaid/partial sale invoices, grouped by phone number
    const DRAFT_TYPES2 = [
        'estimate',
        'proforma',
        'delivery_challan'
    ];
    const rawDues = invoices.filter((i)=>i.invoiceType === 'sale' && !DRAFT_TYPES2.includes(i.invoiceType) && i.paymentStatus !== 'paid' && i.balanceDue > 0).sort((a, b)=>a.date.localeCompare(b.date));
    // Normalize phone: strip non-digits, remove leading country code 91
    const normalizePhone = (ph)=>{
        const d = (ph || '').replace(/\D/g, '');
        return d.startsWith('91') && d.length > 10 ? d.slice(2) : d;
    };
    const dueMap = new Map();
    rawDues.forEach((inv)=>{
        const normPhone = normalizePhone(inv.partyPhone || '');
        const key = normPhone || inv.partyId || inv.partyName || 'unknown';
        // Try to resolve canonical name from parties list
        const matchedParty = normPhone ? parties.find((p)=>normalizePhone(p.phone) === normPhone) : parties.find((p)=>p.id === inv.partyId);
        if (dueMap.has(key)) {
            const g = dueMap.get(key);
            g.totalDue += inv.balanceDue;
            g.invoices.push(inv);
            if (inv.date < g.oldestDate) g.oldestDate = inv.date;
        } else {
            dueMap.set(key, {
                key,
                displayName: matchedParty?.name || inv.partyName || 'Walk-in',
                phone: normPhone || inv.partyPhone || '',
                totalDue: inv.balanceDue,
                invoices: [
                    inv
                ],
                oldestDate: inv.date,
                partyId: matchedParty?.id || inv.partyId
            });
        }
    });
    const dueGroups = Array.from(dueMap.values()).sort((a, b)=>a.oldestDate.localeCompare(b.oldestDate));
    const totalDueOutstanding = dueGroups.reduce((a, g)=>a + g.totalDue, 0);
    const dayRepayments = [];
    parties.forEach((p)=>{
        (p.paymentHistory || []).forEach((pay)=>{
            if (pay.date === selectedDate) {
                dayRepayments.push({
                    partyId: p.id,
                    partyName: p.name,
                    type: pay.type,
                    amount: pay.amount,
                    method: pay.method,
                    note: pay.note,
                    recordedAt: pay.recordedAt
                });
            }
        });
    });
    dayRepayments.sort((a, b)=>b.recordedAt.localeCompare(a.recordedAt));
    const totalRepaidReceived = dayRepayments.filter((r)=>r.type === 'received').reduce((a, r)=>a + r.amount, 0);
    const totalRepaidPaid = dayRepayments.filter((r)=>r.type === 'paid').reduce((a, r)=>a + r.amount, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            maxWidth: 900,
            margin: '0 auto',
            padding: '0 0 40px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; }
                }
                .stat-card {
                    background: white;
                    border-radius: 16px;
                    padding: 20px;
                    border: 1px solid #E2E8F0;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .method-bar {
                    height: 8px;
                    border-radius: 4px;
                    transition: width 0.5s ease;
                }
            `
            }, void 0, false, {
                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                lineNumber: 153,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "no-print",
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    marginBottom: 24
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.back(),
                        style: {
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 8,
                            borderRadius: 8,
                            display: 'flex',
                            color: '#4A5568'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                            size: 20
                        }, void 0, false, {
                            fileName: "[project]/app/company/reports/daily-close/page.tsx",
                            lineNumber: 177,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                        lineNumber: 176,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontSize: 22,
                                    fontWeight: 900,
                                    color: '#1A1A2E',
                                    margin: 0
                                },
                                children: "Daily Closing Report"
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                lineNumber: 180,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 13,
                                    color: '#718096',
                                    marginTop: 2
                                },
                                children: [
                                    company?.name,
                                    " · End-of-day summary"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                lineNumber: 181,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                        lineNumber: 179,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: 10,
                            alignItems: 'center'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "date",
                                value: selectedDate,
                                max: todayISO,
                                onChange: (e)=>setSelectedDate(e.target.value),
                                style: {
                                    padding: '8px 12px',
                                    borderRadius: 8,
                                    border: '1.5px solid #CBD5E0',
                                    fontSize: 14,
                                    fontWeight: 700,
                                    outline: 'none'
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                lineNumber: 184,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>window.print(),
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 6,
                                    padding: '9px 16px',
                                    borderRadius: 8,
                                    border: '1.5px solid #CBD5E0',
                                    background: 'white',
                                    cursor: 'pointer',
                                    fontWeight: 700,
                                    fontSize: 13,
                                    color: '#4A5568'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__["Printer"], {
                                        size: 15
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                        lineNumber: 192,
                                        columnNumber: 25
                                    }, this),
                                    " Print"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                lineNumber: 191,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                        lineNumber: 183,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                lineNumber: 175,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'none'
                },
                className: "print-header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: [
                            company?.name,
                            " — Daily Closing Report"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                        lineNumber: 199,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "Date: ",
                            selectedDate,
                            " | Printed: ",
                            new Date().toLocaleString('en-IN')
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                        lineNumber: 200,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                lineNumber: 198,
                columnNumber: 13
            }, this),
            isClosed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: 'linear-gradient(135deg, #1A1A2E, #2D3748)',
                    color: 'white',
                    borderRadius: 16,
                    padding: '16px 24px',
                    marginBottom: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                size: 20,
                                color: "#FBBF24"
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                lineNumber: 207,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontWeight: 900,
                                            fontSize: 15,
                                            margin: 0
                                        },
                                        children: "Day Closed & Locked"
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                        lineNumber: 209,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 12,
                                            color: 'rgba(255,255,255,0.6)',
                                            margin: 0
                                        },
                                        children: [
                                            selectedDate,
                                            " has been closed. No new entries should be recorded."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                        lineNumber: 210,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                lineNumber: 208,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                        lineNumber: 206,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: reopenDay,
                        className: "no-print",
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            padding: '8px 14px',
                            borderRadius: 8,
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: 13,
                            fontWeight: 700
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Unlock$3e$__["Unlock"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                lineNumber: 214,
                                columnNumber: 25
                            }, this),
                            " Reopen"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                        lineNumber: 213,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                lineNumber: 205,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                    gap: 14,
                    marginBottom: 20
                },
                children: [
                    {
                        label: 'Total Sales',
                        value: fmt(totalSales),
                        sub: `${daySales.length} bills`,
                        color: '#34A853',
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                            size: 20,
                            color: "#34A853"
                        }, void 0, false, {
                            fileName: "[project]/app/company/reports/daily-close/page.tsx",
                            lineNumber: 222,
                            columnNumber: 142
                        }, this)
                    },
                    {
                        label: 'Collected',
                        value: fmt(totalReceived),
                        sub: `${fmt(totalPending)} pending`,
                        color: '#4285F4',
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                            size: 20,
                            color: "#4285F4"
                        }, void 0, false, {
                            fileName: "[project]/app/company/reports/daily-close/page.tsx",
                            lineNumber: 223,
                            columnNumber: 144
                        }, this)
                    },
                    {
                        label: 'Repaid Today',
                        value: fmt(totalRepaidReceived),
                        sub: `${dayRepayments.filter((r)=>r.type === 'received').length} entries`,
                        color: '#0EA5E9',
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                            size: 20,
                            color: "#0EA5E9"
                        }, void 0, false, {
                            fileName: "[project]/app/company/reports/daily-close/page.tsx",
                            lineNumber: 224,
                            columnNumber: 178
                        }, this)
                    },
                    {
                        label: 'Outstanding Due',
                        value: fmt(totalDueOutstanding),
                        sub: `${dueGroups.length} customer${dueGroups.length !== 1 ? 's' : ''}`,
                        color: dueGroups.length > 0 ? '#DC2626' : '#34A853',
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__["TrendingDown"], {
                            size: 20,
                            color: dueGroups.length > 0 ? '#DC2626' : '#34A853'
                        }, void 0, false, {
                            fileName: "[project]/app/company/reports/daily-close/page.tsx",
                            lineNumber: 225,
                            columnNumber: 215
                        }, this)
                    },
                    {
                        label: 'Purchases',
                        value: fmt(totalPurchases),
                        sub: `${dayPurchases.length} bills`,
                        color: '#EA4335',
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__["TrendingDown"], {
                            size: 20,
                            color: "#EA4335"
                        }, void 0, false, {
                            fileName: "[project]/app/company/reports/daily-close/page.tsx",
                            lineNumber: 226,
                            columnNumber: 144
                        }, this)
                    },
                    {
                        label: 'Expenses',
                        value: fmt(totalExpenses),
                        sub: `${dayExpenses.length} entries`,
                        color: '#FBBC04',
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"], {
                            size: 20,
                            color: "#FBBC04"
                        }, void 0, false, {
                            fileName: "[project]/app/company/reports/daily-close/page.tsx",
                            lineNumber: 227,
                            columnNumber: 145
                        }, this)
                    },
                    {
                        label: 'Net Cash',
                        value: fmt(netCash),
                        sub: 'Collected − Exp − Purchase',
                        color: netCash >= 0 ? '#34A853' : '#EA4335',
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                            size: 20,
                            color: netCash >= 0 ? '#34A853' : '#EA4335'
                        }, void 0, false, {
                            fileName: "[project]/app/company/reports/daily-close/page.tsx",
                            lineNumber: 228,
                            columnNumber: 170
                        }, this)
                    },
                    {
                        label: 'GST Collected',
                        value: fmt(totalGstCollected),
                        sub: 'From sales',
                        color: '#6B46C1',
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                            size: 20,
                            color: "#6B46C1"
                        }, void 0, false, {
                            fileName: "[project]/app/company/reports/daily-close/page.tsx",
                            lineNumber: 229,
                            columnNumber: 143
                        }, this)
                    }
                ].map((card)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "stat-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 40,
                                    height: 40,
                                    borderRadius: 12,
                                    background: card.color + '15',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 8
                                },
                                children: card.icon
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                lineNumber: 232,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 10,
                                    fontWeight: 800,
                                    color: '#A0AEC0',
                                    textTransform: 'uppercase',
                                    margin: 0
                                },
                                children: card.label
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                lineNumber: 235,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 20,
                                    fontWeight: 900,
                                    color: '#1A1A2E',
                                    margin: '2px 0'
                                },
                                children: card.value
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                lineNumber: 236,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 11,
                                    color: '#718096',
                                    margin: 0
                                },
                                children: card.sub
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                lineNumber: 237,
                                columnNumber: 25
                            }, this)
                        ]
                    }, card.label, true, {
                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                        lineNumber: 231,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                lineNumber: 220,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 16,
                    marginBottom: 20
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'white',
                            borderRadius: 16,
                            padding: 24,
                            border: '1px solid #E2E8F0'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    fontSize: 15,
                                    fontWeight: 800,
                                    color: '#1A1A2E',
                                    marginBottom: 16
                                },
                                children: "💳 Payment Method Breakdown"
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                lineNumber: 245,
                                columnNumber: 21
                            }, this),
                            Object.keys(paymentBreakdown).length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: '#A0AEC0',
                                    fontSize: 13
                                },
                                children: "No sales recorded for this date."
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                lineNumber: 247,
                                columnNumber: 25
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 12
                                },
                                children: Object.entries(paymentBreakdown).sort((a, b)=>b[1] - a[1]).map(([method, amount])=>{
                                    const pct = totalReceived > 0 ? amount / totalReceived * 100 : 0;
                                    const colors = {
                                        cash: '#38A169',
                                        upi: '#6B46C1',
                                        card: '#2B6CB0',
                                        bank: '#C05621',
                                        cheque: '#718096'
                                    };
                                    const color = colors[method] || '#4A5568';
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    marginBottom: 4
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: 13,
                                                            fontWeight: 700,
                                                            color: '#334155'
                                                        },
                                                        children: [
                                                            METHOD_ICONS[method] || '💰',
                                                            " ",
                                                            method.charAt(0).toUpperCase() + method.slice(1)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                        lineNumber: 257,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            textAlign: 'right'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: 13,
                                                                    fontWeight: 800
                                                                },
                                                                children: [
                                                                    "₹",
                                                                    amount.toLocaleString('en-IN')
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                                lineNumber: 261,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: 11,
                                                                    color: '#94A3B8',
                                                                    marginLeft: 6
                                                                },
                                                                children: [
                                                                    pct.toFixed(0),
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                                lineNumber: 262,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                        lineNumber: 260,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                lineNumber: 256,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    height: 8,
                                                    background: '#F1F5F9',
                                                    borderRadius: 4,
                                                    overflow: 'hidden'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "method-bar",
                                                    style: {
                                                        width: `${pct}%`,
                                                        background: color,
                                                        height: '100%'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                    lineNumber: 266,
                                                    columnNumber: 45
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                lineNumber: 265,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, method, true, {
                                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                        lineNumber: 255,
                                        columnNumber: 37
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                lineNumber: 249,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                        lineNumber: 244,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'white',
                            borderRadius: 16,
                            padding: 24,
                            border: '1px solid #E2E8F0'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    fontSize: 15,
                                    fontWeight: 800,
                                    color: '#1A1A2E',
                                    marginBottom: 16
                                },
                                children: "📋 Day Summary"
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                lineNumber: 277,
                                columnNumber: 21
                            }, this),
                            [
                                {
                                    label: 'Gross Sales',
                                    val: totalSales,
                                    color: '#1A1A2E'
                                },
                                {
                                    label: 'Less: Sale Returns',
                                    val: -totalReturns,
                                    color: '#E53E3E'
                                },
                                {
                                    label: 'Net Sales',
                                    val: totalSales - totalReturns,
                                    bold: true,
                                    color: '#1A1A2E'
                                },
                                null,
                                {
                                    label: 'Cash Collected',
                                    val: totalReceived,
                                    color: '#38A169'
                                },
                                {
                                    label: 'Credit Pending',
                                    val: totalPending,
                                    color: '#E53E3E'
                                },
                                null,
                                {
                                    label: 'Purchases',
                                    val: totalPurchases,
                                    color: '#E53E3E'
                                },
                                {
                                    label: 'Expenses',
                                    val: totalExpenses,
                                    color: '#E53E3E'
                                },
                                null,
                                {
                                    label: 'NET CASH IN HAND',
                                    val: netCash,
                                    bold: true,
                                    big: true,
                                    color: netCash >= 0 ? '#38A169' : '#E53E3E'
                                }
                            ].map((row, i)=>row === null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        height: 1,
                                        background: '#E2E8F0',
                                        margin: '8px 0'
                                    }
                                }, i, false, {
                                    fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                    lineNumber: 291,
                                    columnNumber: 25
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '5px 0',
                                        fontWeight: row.bold ? 900 : 600,
                                        fontSize: row.big ? 15 : 13,
                                        borderTop: row.big ? '2px solid #E2E8F0' : 'none',
                                        marginTop: row.big ? 4 : 0,
                                        paddingTop: row.big ? 10 : 5
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: '#4A5568'
                                            },
                                            children: row.label
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                            lineNumber: 294,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: row.color
                                            },
                                            children: [
                                                fmt(Math.abs(row.val)),
                                                row.val < 0 ? ' (CR)' : ''
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                            lineNumber: 295,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, row.label, true, {
                                    fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                    lineNumber: 293,
                                    columnNumber: 25
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                        lineNumber: 276,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                lineNumber: 242,
                columnNumber: 13
            }, this),
            topItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: 'white',
                    borderRadius: 16,
                    padding: 24,
                    border: '1px solid #E2E8F0',
                    marginBottom: 20
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        style: {
                            fontSize: 15,
                            fontWeight: 800,
                            color: '#1A1A2E',
                            marginBottom: 16
                        },
                        children: "🏆 Top Items Sold Today"
                    }, void 0, false, {
                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                        lineNumber: 304,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '8px 24px'
                        },
                        children: topItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            fontSize: 12,
                                            marginBottom: 3
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontWeight: 600,
                                                    color: '#334155'
                                                },
                                                children: item.name
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                lineNumber: 309,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontWeight: 800
                                                },
                                                children: [
                                                    "₹",
                                                    item.revenue.toLocaleString('en-IN'),
                                                    " ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            color: '#94A3B8',
                                                            fontWeight: 500
                                                        },
                                                        children: [
                                                            "×",
                                                            item.qty
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                        lineNumber: 310,
                                                        columnNumber: 111
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                lineNumber: 310,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                        lineNumber: 308,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            height: 6,
                                            background: '#F1F5F9',
                                            borderRadius: 3,
                                            overflow: 'hidden'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: `${item.revenue / maxItemRevenue * 100}%`,
                                                height: '100%',
                                                background: 'linear-gradient(to right, #4285F4, #34A853)',
                                                borderRadius: 3,
                                                transition: 'width 0.5s ease'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                            lineNumber: 313,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                        lineNumber: 312,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, item.name, true, {
                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                lineNumber: 307,
                                columnNumber: 29
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                        lineNumber: 305,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                lineNumber: 303,
                columnNumber: 17
            }, this),
            daySales.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: 'white',
                    borderRadius: 16,
                    border: '1px solid #E2E8F0',
                    overflow: 'hidden',
                    marginBottom: 20
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '16px 24px',
                            borderBottom: '1px solid #E2E8F0'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            style: {
                                fontSize: 15,
                                fontWeight: 800,
                                color: '#1A1A2E',
                                margin: 0
                            },
                            children: [
                                "🧾 Sale Invoices — ",
                                selectedDate
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/reports/daily-close/page.tsx",
                            lineNumber: 325,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                        lineNumber: 324,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            overflowX: 'auto'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            style: {
                                width: '100%',
                                borderCollapse: 'collapse',
                                fontSize: 13
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        style: {
                                            background: '#F8FAFC'
                                        },
                                        children: [
                                            'Invoice No',
                                            'Customer',
                                            'Time',
                                            'Amount',
                                            'Paid',
                                            'Status',
                                            'Method'
                                        ].map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    padding: '10px 16px',
                                                    textAlign: 'left',
                                                    fontWeight: 800,
                                                    fontSize: 11,
                                                    color: '#64748B',
                                                    textTransform: 'uppercase',
                                                    borderBottom: '1px solid #E2E8F0'
                                                },
                                                children: h
                                            }, h, false, {
                                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                lineNumber: 332,
                                                columnNumber: 41
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                        lineNumber: 330,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                    lineNumber: 329,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: daySales.map((inv)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            style: {
                                                borderBottom: '1px solid #F1F5F9'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '10px 16px',
                                                        fontWeight: 700,
                                                        color: '#4285F4'
                                                    },
                                                    children: inv.invoiceNumber
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                    lineNumber: 339,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '10px 16px',
                                                        fontWeight: 600
                                                    },
                                                    children: inv.partyName || 'Walk-in'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                    lineNumber: 340,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '10px 16px',
                                                        color: '#718096'
                                                    },
                                                    children: inv.time || '—'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                    lineNumber: 341,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '10px 16px',
                                                        fontWeight: 800
                                                    },
                                                    children: [
                                                        "₹",
                                                        inv.grandTotal?.toLocaleString('en-IN')
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                    lineNumber: 342,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '10px 16px',
                                                        color: '#38A169',
                                                        fontWeight: 700
                                                    },
                                                    children: [
                                                        "₹",
                                                        inv.amountPaid?.toLocaleString('en-IN')
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                    lineNumber: 343,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '10px 16px'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            padding: '3px 8px',
                                                            borderRadius: 6,
                                                            fontSize: 11,
                                                            fontWeight: 800,
                                                            background: inv.paymentStatus === 'paid' ? '#DCFCE7' : inv.paymentStatus === 'partial' ? '#FEF3C7' : '#FEE2E2',
                                                            color: inv.paymentStatus === 'paid' ? '#166534' : inv.paymentStatus === 'partial' ? '#92400E' : '#991B1B'
                                                        },
                                                        children: inv.paymentStatus?.toUpperCase()
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                        lineNumber: 345,
                                                        columnNumber: 45
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                    lineNumber: 344,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '10px 16px',
                                                        color: '#718096'
                                                    },
                                                    children: inv.splitPayments?.length > 1 ? inv.splitPayments.map((sp)=>`${METHOD_ICONS[sp.method] || ''}${sp.method}`).join('+') : (METHOD_ICONS[inv.paymentMethod] || '') + ' ' + (inv.paymentMethod || 'cash')
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                    lineNumber: 349,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, inv.id, true, {
                                            fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                            lineNumber: 338,
                                            columnNumber: 37
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                    lineNumber: 336,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/reports/daily-close/page.tsx",
                            lineNumber: 328,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                        lineNumber: 327,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                lineNumber: 323,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: 'white',
                    borderRadius: 16,
                    border: '1.5px solid #BAE6FD',
                    overflow: 'hidden',
                    marginBottom: 20
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '16px 24px',
                            borderBottom: '1px solid #E0F2FE',
                            background: '#F0F9FF',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: 8
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    fontSize: 15,
                                    fontWeight: 800,
                                    color: '#0369A1',
                                    margin: 0
                                },
                                children: [
                                    "💸 Balance Repayments — ",
                                    selectedDate
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                lineNumber: 363,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: 14
                                },
                                children: [
                                    totalRepaidReceived > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 13,
                                            fontWeight: 800,
                                            color: '#34A853'
                                        },
                                        children: [
                                            "▲ Received: ",
                                            fmt(totalRepaidReceived)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                        lineNumber: 365,
                                        columnNumber: 53
                                    }, this),
                                    totalRepaidPaid > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 13,
                                            fontWeight: 800,
                                            color: '#EA4335'
                                        },
                                        children: [
                                            "▼ Paid Out: ",
                                            fmt(totalRepaidPaid)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                        lineNumber: 366,
                                        columnNumber: 49
                                    }, this),
                                    dayRepayments.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 12,
                                            color: '#94A3B8'
                                        },
                                        children: "No repayments on this date"
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                        lineNumber: 367,
                                        columnNumber: 56
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                lineNumber: 364,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                        lineNumber: 362,
                        columnNumber: 17
                    }, this),
                    dayRepayments.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '28px 24px',
                            textAlign: 'center',
                            color: '#94A3B8'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontWeight: 700,
                                    fontSize: 13
                                },
                                children: [
                                    "No balance repayments recorded on ",
                                    selectedDate
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                lineNumber: 372,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 12,
                                    marginTop: 4
                                },
                                children: [
                                    "Go to ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Parties"
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                        lineNumber: 373,
                                        columnNumber: 73
                                    }, this),
                                    " → click the 💹 icon to record a payment against a party's balance."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                lineNumber: 373,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                        lineNumber: 371,
                        columnNumber: 21
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            overflowX: 'auto'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            style: {
                                width: '100%',
                                borderCollapse: 'collapse',
                                fontSize: 13
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        style: {
                                            background: '#F0F9FF'
                                        },
                                        children: [
                                            'Party',
                                            'Type',
                                            'Method',
                                            'Amount',
                                            'Note',
                                            'Time'
                                        ].map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    padding: '8px 16px',
                                                    textAlign: 'left',
                                                    fontWeight: 800,
                                                    fontSize: 10,
                                                    color: '#0369A1',
                                                    textTransform: 'uppercase',
                                                    borderBottom: '1px solid #BAE6FD'
                                                },
                                                children: h
                                            }, h, false, {
                                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                lineNumber: 381,
                                                columnNumber: 41
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                        lineNumber: 379,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                    lineNumber: 378,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: dayRepayments.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            style: {
                                                borderBottom: '1px solid #F0F9FF'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '10px 16px',
                                                        fontWeight: 700
                                                    },
                                                    children: r.partyName
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                    lineNumber: 388,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '10px 16px'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            padding: '3px 10px',
                                                            borderRadius: 6,
                                                            fontSize: 11,
                                                            fontWeight: 800,
                                                            background: r.type === 'received' ? '#DCFCE7' : '#FEE2E2',
                                                            color: r.type === 'received' ? '#166534' : '#991B1B'
                                                        },
                                                        children: r.type === 'received' ? '▲ Received' : '▼ Paid Out'
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                        lineNumber: 390,
                                                        columnNumber: 45
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                    lineNumber: 389,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '10px 16px',
                                                        color: '#718096'
                                                    },
                                                    children: [
                                                        METHOD_ICONS[r.method] || '💰',
                                                        " ",
                                                        r.method
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                    lineNumber: 394,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '10px 16px',
                                                        fontWeight: 900,
                                                        color: r.type === 'received' ? '#34A853' : '#EA4335'
                                                    },
                                                    children: fmt(r.amount)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                    lineNumber: 395,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '10px 16px',
                                                        color: '#718096',
                                                        fontSize: 12
                                                    },
                                                    children: r.note || '—'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                    lineNumber: 396,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '10px 16px',
                                                        color: '#94A3B8',
                                                        fontSize: 11
                                                    },
                                                    children: r.recordedAt ? new Date(r.recordedAt).toLocaleTimeString('en-IN', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    }) : '—'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                    lineNumber: 397,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                            lineNumber: 387,
                                            columnNumber: 37
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                    lineNumber: 385,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/reports/daily-close/page.tsx",
                            lineNumber: 377,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                        lineNumber: 376,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                lineNumber: 361,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: 'white',
                    borderRadius: 16,
                    border: `1.5px solid ${dueGroups.length > 0 ? '#FCA5A5' : '#BBF7D0'}`,
                    overflow: 'hidden',
                    marginBottom: 20
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '16px 24px',
                            borderBottom: `1px solid ${dueGroups.length > 0 ? '#FEE2E2' : '#DCFCE7'}`,
                            background: dueGroups.length > 0 ? '#FEF2F2' : '#F0FDF4',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    fontSize: 15,
                                    fontWeight: 800,
                                    color: dueGroups.length > 0 ? '#DC2626' : '#166534',
                                    margin: 0
                                },
                                children: dueGroups.length > 0 ? `⚠️ Outstanding Due Payments (${dueGroups.length} customer${dueGroups.length > 1 ? 's' : ''})` : '✅ No Outstanding Dues'
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                lineNumber: 409,
                                columnNumber: 21
                            }, this),
                            dueGroups.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontWeight: 900,
                                    fontSize: 15,
                                    color: '#DC2626'
                                },
                                children: [
                                    "Total Due: ",
                                    fmt(totalDueOutstanding)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                lineNumber: 412,
                                columnNumber: 46
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                        lineNumber: 408,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            overflowX: 'auto'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            style: {
                                width: '100%',
                                borderCollapse: 'collapse',
                                fontSize: 13
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        style: {
                                            background: dueGroups.length > 0 ? '#FFF5F5' : '#F0FDF4'
                                        },
                                        children: [
                                            'Customer',
                                            'Phone',
                                            'Bills',
                                            'Since',
                                            'Total Due',
                                            'Remind'
                                        ].map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    padding: '8px 14px',
                                                    textAlign: 'left',
                                                    fontWeight: 800,
                                                    fontSize: 10,
                                                    color: '#64748B',
                                                    textTransform: 'uppercase',
                                                    borderBottom: `1px solid ${dueGroups.length > 0 ? '#FEE2E2' : '#DCFCE7'}`
                                                },
                                                children: h
                                            }, h, false, {
                                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                lineNumber: 419,
                                                columnNumber: 37
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                        lineNumber: 417,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                    lineNumber: 416,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: dueGroups.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            colSpan: 6,
                                            style: {
                                                padding: '28px 20px',
                                                textAlign: 'center',
                                                color: '#34A853',
                                                fontWeight: 700,
                                                fontSize: 14
                                            },
                                            children: "All bills are paid up — great work! 🎉"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                            lineNumber: 426,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                        lineNumber: 425,
                                        columnNumber: 33
                                    }, this) : dueGroups.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            style: {
                                                borderBottom: '1px solid #FEF2F2'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '10px 14px'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontWeight: 700
                                                            },
                                                            children: g.displayName
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                            lineNumber: 433,
                                                            columnNumber: 41
                                                        }, this),
                                                        g.invoices.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: 10,
                                                                color: '#94A3B8',
                                                                marginTop: 2
                                                            },
                                                            children: g.invoices.map((i)=>i.invoiceNumber).join(', ')
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                            lineNumber: 435,
                                                            columnNumber: 45
                                                        }, this),
                                                        g.invoices.length === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: 10,
                                                                color: '#94A3B8',
                                                                marginTop: 2
                                                            },
                                                            children: g.invoices[0].invoiceNumber
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                            lineNumber: 440,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                    lineNumber: 432,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '10px 14px',
                                                        color: '#718096',
                                                        fontSize: 12
                                                    },
                                                    children: g.phone || '—'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                    lineNumber: 443,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '10px 14px',
                                                        textAlign: 'center'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            padding: '2px 8px',
                                                            borderRadius: 20,
                                                            fontSize: 11,
                                                            fontWeight: 800,
                                                            background: '#FEE2E2',
                                                            color: '#DC2626'
                                                        },
                                                        children: g.invoices.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                        lineNumber: 445,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                    lineNumber: 444,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '10px 14px',
                                                        color: '#718096',
                                                        fontSize: 12
                                                    },
                                                    children: g.oldestDate
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                    lineNumber: 449,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '10px 14px',
                                                        fontWeight: 900,
                                                        color: '#DC2626',
                                                        fontSize: 14
                                                    },
                                                    children: [
                                                        "₹",
                                                        g.totalDue.toLocaleString('en-IN')
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                    lineNumber: 450,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '10px 14px'
                                                    },
                                                    className: "no-print",
                                                    children: g.phone ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildWhatsAppReminderUrl"])({
                                                            partyPhone: g.phone,
                                                            partyName: g.displayName,
                                                            balanceDue: g.totalDue,
                                                            invoiceNumber: g.invoices.map((i)=>i.invoiceNumber).join(', ')
                                                        }),
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        style: {
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: 4,
                                                            padding: '4px 10px',
                                                            borderRadius: 6,
                                                            background: '#F0FDF4',
                                                            border: '1px solid #BBF7D0',
                                                            color: '#25D366',
                                                            textDecoration: 'none',
                                                            fontWeight: 800,
                                                            fontSize: 11
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                                                size: 11
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                                lineNumber: 455,
                                                                columnNumber: 49
                                                            }, this),
                                                            " WA"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                        lineNumber: 453,
                                                        columnNumber: 45
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            color: '#CBD5E0',
                                                            fontSize: 11
                                                        },
                                                        children: "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                        lineNumber: 457,
                                                        columnNumber: 45
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                                    lineNumber: 451,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, g.key, true, {
                                            fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                            lineNumber: 431,
                                            columnNumber: 33
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                    lineNumber: 423,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/reports/daily-close/page.tsx",
                            lineNumber: 415,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                        lineNumber: 414,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                lineNumber: 407,
                columnNumber: 13
            }, this),
            !isClosed && selectedDate === todayISO && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "no-print",
                style: {
                    background: 'linear-gradient(135deg, #1A1A2E 0%, #2D3748 100%)',
                    borderRadius: 20,
                    padding: '24px 32px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 8
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            color: 'white'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontWeight: 900,
                                    fontSize: 16,
                                    margin: 0
                                },
                                children: "Ready to close today?"
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                lineNumber: 470,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 12,
                                    color: 'rgba(255,255,255,0.6)',
                                    margin: '4px 0 0'
                                },
                                children: "Locking the day marks it as final. You can still reopen it."
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                lineNumber: 471,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                        lineNumber: 469,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: closeDay,
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            padding: '12px 28px',
                            borderRadius: 12,
                            background: 'linear-gradient(135deg, #34A853, #1E7E34)',
                            border: 'none',
                            color: 'white',
                            fontWeight: 900,
                            fontSize: 14,
                            cursor: 'pointer',
                            boxShadow: '0 4px 20px rgba(52,168,83,0.4)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                                lineNumber: 477,
                                columnNumber: 25
                            }, this),
                            " Close Day"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                        lineNumber: 473,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                lineNumber: 468,
                columnNumber: 17
            }, this),
            daySales.length === 0 && dayPurchases.length === 0 && dayExpenses.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: 'center',
                    padding: '60px 20px',
                    color: '#A0AEC0'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                        size: 40,
                        style: {
                            marginBottom: 12,
                            opacity: 0.3
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                        lineNumber: 484,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 16,
                            fontWeight: 700
                        },
                        children: [
                            "No transactions on ",
                            selectedDate
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                        lineNumber: 485,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 13
                        },
                        children: "Select a different date or add some bills."
                    }, void 0, false, {
                        fileName: "[project]/app/company/reports/daily-close/page.tsx",
                        lineNumber: 486,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/reports/daily-close/page.tsx",
                lineNumber: 483,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/company/reports/daily-close/page.tsx",
        lineNumber: 152,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=app_company_reports_daily-close_page_tsx_a0d74e2d._.js.map