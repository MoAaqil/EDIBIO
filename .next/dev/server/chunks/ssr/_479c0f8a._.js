module.exports = [
"[project]/lib/gst-utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "downloadGSTR1",
    ()=>downloadGSTR1,
    "generateGSTR1",
    ()=>generateGSTR1
]);
function generateGSTR1(invoices) {
    const saleInvoices = invoices.filter((i)=>i.invoiceType === 'sale' && i.isGstBill);
    // B2B: Registered parties (have GSTIN)
    const b2b = saleInvoices.filter((i)=>i.partyGst).map((i)=>({
            ctin: i.partyGst,
            inv: [
                {
                    inum: i.invoiceNumber,
                    dt: i.date.split('-').reverse().join('-'),
                    val: i.grandTotal,
                    pos: i.isInterState ? "99" : "33",
                    rchrg: "N",
                    inv_typ: "R",
                    itms: i.items.map((it)=>({
                            num: 1,
                            itm_det: {
                                ty: it.hsnCode || "S",
                                hsn_sc: it.hsnCode || "0000",
                                txval: it.taxableAmt,
                                rt: it.gstRate,
                                iamt: it.igst || 0,
                                camt: it.cgst || 0,
                                samt: it.sgst || 0,
                                csamt: it.cess || 0
                            }
                        }))
                }
            ]
        }));
    // B2CS: Unregistered parties (Consumer Small)
    const b2cs = saleInvoices.filter((i)=>!i.partyGst).map((i)=>({
            sply_ty: i.isInterState ? "INTER" : "INTRA",
            rt: i.items[0]?.gstRate || 0,
            typ: "OE",
            pos: i.isInterState ? "99" : "33",
            txval: i.taxableAmount,
            iamt: i.totalIgst || 0,
            camt: i.totalCgst || 0,
            samt: i.totalSgst || 0,
            csamt: i.totalCess || 0
        }));
    return {
        gstin: "YOUR_GSTIN",
        fp: new Date().toISOString().slice(5, 7) + new Date().getFullYear(),
        gt: 0.0,
        cur_gt: 0.0,
        b2b,
        b2cs
    };
}
function downloadGSTR1(invoices, companyName, gstin) {
    const data = generateGSTR1(invoices);
    data.gstin = gstin || "GSTIN_REQUIRED";
    const blob = new Blob([
        JSON.stringify(data, null, 2)
    ], {
        type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GSTR1_${companyName.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 7)}.json`;
    a.click();
    URL.revokeObjectURL(url);
}
}),
"[project]/app/company/reports/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ReportsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-ssr] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-ssr] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-down.js [app-ssr] (ecmascript) <export default as TrendingDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-ssr] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-ssr] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-question-mark.js [app-ssr] (ecmascript) <export default as HelpCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$gst$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/gst-utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function InfoTooltip({ text, title }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        }
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return ()=>document.removeEventListener('mousedown', handleClickOutside);
    }, [
        open
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ref: ref,
        style: {
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            marginLeft: 6,
            verticalAlign: 'middle'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: (e)=>{
                    e.stopPropagation();
                    setOpen(!open);
                },
                style: {
                    background: 'none',
                    border: 'none',
                    padding: 2,
                    cursor: 'pointer',
                    color: open ? '#4285F4' : '#A0AEC0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    transition: 'all 0.2s',
                    outline: 'none'
                },
                onMouseEnter: (e)=>e.currentTarget.style.color = '#4285F4',
                onMouseLeave: (e)=>{
                    if (!open) e.currentTarget.style.color = '#A0AEC0';
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"], {
                    size: 13
                }, void 0, false, {
                    fileName: "[project]/app/company/reports/page.tsx",
                    lineNumber: 46,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/company/reports/page.tsx",
                lineNumber: 27,
                columnNumber: 13
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginBottom: 8,
                    width: 240,
                    background: 'white',
                    border: '1px solid #E2E8F0',
                    borderRadius: 12,
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                    padding: '12px 14px',
                    zIndex: 999,
                    textAlign: 'left',
                    color: '#4A5568',
                    animation: 'fadeIn 0.15s ease-out',
                    display: 'block',
                    lineHeight: 1.4
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 6,
                            borderBottom: '1px solid #F1F5F9',
                            paddingBottom: 4
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontWeight: 800,
                                    fontSize: 10,
                                    color: '#1A202C',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                },
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 69,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    setOpen(false);
                                },
                                style: {
                                    background: 'none',
                                    border: 'none',
                                    padding: 0,
                                    cursor: 'pointer',
                                    color: '#A0AEC0',
                                    display: 'flex',
                                    alignItems: 'center'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 12
                                }, void 0, false, {
                                    fileName: "[project]/app/company/reports/page.tsx",
                                    lineNumber: 74,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 70,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/reports/page.tsx",
                        lineNumber: 68,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 11,
                            fontWeight: 500,
                            display: 'block',
                            color: '#4A5568'
                        },
                        children: text
                    }, void 0, false, {
                        fileName: "[project]/app/company/reports/page.tsx",
                        lineNumber: 77,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            position: 'absolute',
                            top: '100%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 0,
                            height: 0,
                            borderLeft: '6px solid transparent',
                            borderRight: '6px solid transparent',
                            borderTop: '6px solid white',
                            zIndex: 1000,
                            display: 'block'
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/company/reports/page.tsx",
                        lineNumber: 78,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            position: 'absolute',
                            top: '100%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 0,
                            height: 0,
                            borderLeft: '7px solid transparent',
                            borderRight: '7px solid transparent',
                            borderTop: '7px solid #E2E8F0',
                            zIndex: 998,
                            marginTop: 1,
                            display: 'block'
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/company/reports/page.tsx",
                        lineNumber: 91,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/reports/page.tsx",
                lineNumber: 49,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/company/reports/page.tsx",
        lineNumber: 26,
        columnNumber: 9
    }, this);
}
function MiniBar({ value, max, color }) {
    const pct = max > 0 ? Math.min(100, value / max * 100) : 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            height: 8,
            background: '#F1F3F5',
            borderRadius: 4,
            overflow: 'hidden'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                height: '100%',
                width: `${pct}%`,
                background: color,
                borderRadius: 4,
                transition: 'width 0.6s ease'
            }
        }, void 0, false, {
            fileName: "[project]/app/company/reports/page.tsx",
            lineNumber: 115,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/company/reports/page.tsx",
        lineNumber: 114,
        columnNumber: 9
    }, this);
}
function ReportsPage() {
    const company = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useActiveCompany"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const invoices = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompanyData"])('invoices');
    const expenses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompanyData"])('expenses');
    const products = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompanyData"])('products');
    const { isSubBranchLogin, invoices: allInvoices = [], expenses: allExpenses = [], products: allProducts = [] } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])();
    const [showConsolidatedModal, setShowConsolidatedModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const DRAFT_TYPES = [
        'estimate',
        'proforma',
        'delivery_challan'
    ];
    const consolidatedInvoices = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return allInvoices.filter((i)=>i.companyId === company?.id);
    }, [
        allInvoices,
        company?.id
    ]);
    const consolidatedExpensesList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return allExpenses.filter((e)=>e.companyId === company?.id);
    }, [
        allExpenses,
        company?.id
    ]);
    const consolidatedProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return allProducts.filter((p)=>p.companyId === company?.id);
    }, [
        allProducts,
        company?.id
    ]);
    const consolidatedSales = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return consolidatedInvoices.filter((i)=>i.invoiceType === 'sale' && !DRAFT_TYPES.includes(i.invoiceType) && i.isGstBill).reduce((a, i)=>a + (i.grandTotal || 0), 0);
    }, [
        consolidatedInvoices
    ]);
    const consolidatedPurchase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return consolidatedInvoices.filter((i)=>i.invoiceType === 'purchase').reduce((a, i)=>a + (i.grandTotal || 0), 0);
    }, [
        consolidatedInvoices
    ]);
    const consolidatedExpenses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return consolidatedExpensesList.reduce((a, e)=>a + (e.amount || 0), 0);
    }, [
        consolidatedExpensesList
    ]);
    const consolidatedNetProfit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return consolidatedSales - consolidatedPurchase - consolidatedExpenses;
    }, [
        consolidatedSales,
        consolidatedPurchase,
        consolidatedExpenses
    ]);
    const consolidatedStockValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return consolidatedProducts.reduce((a, p)=>{
            const hoStock = p.branchStock?.head_office ?? p.stockQty ?? 0;
            let otherStockSum = 0;
            if (p.branchStock) {
                otherStockSum = Object.entries(p.branchStock).filter(([key])=>key !== 'head_office').reduce((sum, [_, q])=>sum + (parseFloat(q) || 0), 0);
            }
            const totalStock = hoStock + otherStockSum;
            return a + totalStock * (p.purchasePrice || 0);
        }, 0);
    }, [
        consolidatedProducts
    ]);
    const consolidatedGstCollected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return consolidatedInvoices.filter((i)=>i.invoiceType === 'sale' && !DRAFT_TYPES.includes(i.invoiceType) && i.isGstBill).reduce((a, i)=>a + (i.totalGst || 0), 0);
    }, [
        consolidatedInvoices
    ]);
    const consolidatedGstPaid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return consolidatedInvoices.filter((i)=>i.invoiceType === 'purchase').reduce((a, i)=>a + (i.totalGst || 0), 0);
    }, [
        consolidatedInvoices
    ]);
    const consolidatedGstLiability = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return consolidatedGstCollected - consolidatedGstPaid;
    }, [
        consolidatedGstCollected,
        consolidatedGstPaid
    ]);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('overview');
    const [selectedCustomerKey, setSelectedCustomerKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedWaiterKey, setSelectedWaiterKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const parties = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompanyData"])('parties');
    const [showGuide, setShowGuide] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const val = localStorage.getItem('edibio_reports_guide_visible');
        setShowGuide(val !== 'false');
        setMounted(true);
    }, []);
    const toggleGuide = (visible)=>{
        setShowGuide(visible);
        localStorage.setItem('edibio_reports_guide_visible', String(visible));
    };
    const calculateAvgDaysBetweenVisits = (custInvoices)=>{
        if (custInvoices.length < 2) return '—';
        const sorted = [
            ...custInvoices
        ].sort((a, b)=>new Date(a.date).getTime() - new Date(b.date).getTime());
        let totalDays = 0;
        let intervals = 0;
        for(let i = 1; i < sorted.length; i++){
            const d1 = new Date(sorted[i - 1].date);
            const d2 = new Date(sorted[i].date);
            const diffTime = Math.abs(d2.getTime() - d1.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            totalDays += diffDays;
            intervals++;
        }
        return intervals > 0 ? (totalDays / intervals).toFixed(1) + ' days' : '—';
    };
    const customerInsights = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const normPhone = (ph)=>{
            const d = (ph || '').replace(/\D/g, '');
            return d.startsWith('91') && d.length > 10 ? d.slice(2) : d;
        };
        const customerMap = new Map();
        const DRAFT = [
            'estimate',
            'proforma',
            'delivery_challan'
        ];
        const saleInvoices = invoices.filter((i)=>i.invoiceType === 'sale' && !DRAFT.includes(i.invoiceType));
        saleInvoices.forEach((inv)=>{
            const phoneKey = normPhone(inv.partyPhone || '');
            const key = phoneKey || inv.partyName || 'Cash / Walk-in Customer';
            if (!customerMap.has(key)) {
                customerMap.set(key, {
                    name: inv.partyName || 'Walk-in Customer',
                    phone: inv.partyPhone || '',
                    partyId: inv.partyId,
                    totalSpent: 0,
                    invoiceCount: 0,
                    lastVisitDate: inv.date,
                    balanceDue: 0,
                    invoices: []
                });
            }
            const entry = customerMap.get(key);
            entry.totalSpent += inv.grandTotal || 0;
            entry.invoiceCount += 1;
            entry.balanceDue += inv.balanceDue || 0;
            entry.invoices.push(inv);
            if (new Date(inv.date) > new Date(entry.lastVisitDate)) {
                entry.lastVisitDate = inv.date;
            }
        });
        const list = Array.from(customerMap.values()).map((cust)=>{
            const party = parties.find((p)=>{
                if (cust.partyId && p.id === cust.partyId) return true;
                if (cust.phone && normPhone(p.phone) === normPhone(cust.phone)) return true;
                return false;
            });
            return {
                ...cust,
                loyaltyPoints: party?.loyaltyPoints || 0,
                partyId: party?.id || cust.partyId,
                name: party?.name || cust.name,
                phone: party?.phone || cust.phone
            };
        });
        return list.sort((a, b)=>b.totalSpent - a.totalSpent);
    }, [
        invoices,
        parties
    ]);
    const activeCustomerKey = selectedCustomerKey || (customerInsights[0] ? customerInsights[0].phone || customerInsights[0].name : null);
    const selectedCustomerDetail = customerInsights.find((c)=>(c.phone || c.name) === activeCustomerKey);
    const waiterInsights = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const waiterMap = new Map();
        const DRAFT = [
            'estimate',
            'proforma',
            'delivery_challan'
        ];
        const saleInvoices = invoices.filter((i)=>i.invoiceType === 'sale' && !DRAFT.includes(i.invoiceType));
        saleInvoices.forEach((inv)=>{
            const waiterName = inv.servedBy || 'Self Service';
            if (!waiterMap.has(waiterName)) {
                waiterMap.set(waiterName, {
                    name: waiterName,
                    totalSpent: 0,
                    invoiceCount: 0,
                    serviceCharges: 0,
                    invoices: []
                });
            }
            const entry = waiterMap.get(waiterName);
            entry.totalSpent += inv.grandTotal || 0;
            entry.invoiceCount += 1;
            entry.serviceCharges += inv.adjustmentAmount || 0;
            entry.invoices.push(inv);
        });
        const list = Array.from(waiterMap.values()).map((w)=>({
                ...w,
                averageBillValue: w.invoiceCount > 0 ? w.totalSpent / w.invoiceCount : 0,
                estimatedCommission: w.totalSpent * 0.05
            }));
        return list.sort((a, b)=>b.totalSpent - a.totalSpent);
    }, [
        invoices
    ]);
    const activeWaiterKey = selectedWaiterKey || (waiterInsights[0] ? waiterInsights[0].name : null);
    const selectedWaiterDetail = waiterInsights.find((w)=>w.name === activeWaiterKey);
    const now = new Date();
    const thisMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const prevMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonth = `${prevMonthDate.getFullYear()}-${String(prevMonthDate.getMonth() + 1).padStart(2, '0')}`;
    const saleInvoices = invoices.filter((i)=>i.invoiceType === 'sale' && !DRAFT_TYPES.includes(i.invoiceType) && i.isGstBill);
    const purchaseInvoices = invoices.filter((i)=>i.invoiceType === 'purchase');
    const totalSales = saleInvoices.reduce((a, i)=>a + i.grandTotal, 0);
    const totalPurchase = purchaseInvoices.reduce((a, i)=>a + i.grandTotal, 0);
    const totalExpenses = expenses.reduce((a, e)=>a + e.amount, 0);
    const netProfit = totalSales - totalPurchase - totalExpenses;
    const totalGstCollected = saleInvoices.reduce((a, i)=>a + i.totalGst, 0);
    const totalGstPaid = purchaseInvoices.reduce((a, i)=>a + i.totalGst, 0);
    const gstLiability = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["r2"])(totalGstCollected - totalGstPaid);
    const accountsReceivable = saleInvoices.reduce((a, i)=>a + i.balanceDue, 0);
    const accountsPayable = purchaseInvoices.reduce((a, i)=>a + i.balanceDue, 0);
    const closingStockValue = products.reduce((a, p)=>a + p.stockQty * p.purchasePrice, 0);
    const cashInBank = netProfit - accountsReceivable + accountsPayable - closingStockValue + 50000;
    const thisMonthSales = saleInvoices.filter((i)=>i.date?.slice(0, 7) === thisMonthKey).reduce((a, i)=>a + i.grandTotal, 0);
    const lastMonthSales = saleInvoices.filter((i)=>i.date?.slice(0, 7) === lastMonth).reduce((a, i)=>a + i.grandTotal, 0);
    const months = [];
    for(let i = 5; i >= 0; i--){
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        const label = d.toLocaleString('en-IN', {
            month: 'short',
            year: '2-digit'
        });
        const s = saleInvoices.filter((inv)=>inv.date?.slice(0, 7) === key).reduce((a, inv)=>a + inv.grandTotal, 0);
        months.push({
            key,
            label,
            sales: s
        });
    }
    const maxMonthSale = Math.max(...months.map((m)=>m.sales), 1);
    const customerMap = {};
    saleInvoices.forEach((inv)=>{
        const k = inv.partyName || 'Walk-in';
        if (!customerMap[k]) customerMap[k] = {
            name: k,
            total: 0
        };
        customerMap[k].total += inv.grandTotal;
    });
    const topCustomers = Object.values(customerMap).sort((a, b)=>b.total - a.total).slice(0, 8);
    const itemMap = {};
    saleInvoices.forEach((inv)=>{
        (inv.items || []).forEach((item)=>{
            const k = item.name;
            if (!itemMap[k]) itemMap[k] = {
                name: k,
                qty: 0,
                revenue: 0
            };
            itemMap[k].qty += item.qty;
            itemMap[k].revenue += item.amount;
        });
    });
    const topItems = Object.values(itemMap).sort((a, b)=>b.revenue - a.revenue).slice(0, 8);
    const maxItemRevenue = Math.max(...topItems.map((i)=>i.revenue), 1);
    const exportReport = ()=>{
        const csv = [
            `Total Sales,₹${totalSales}`,
            `Total Purchase,₹${totalPurchase}`,
            `Profit,₹${netProfit}`
        ].join('\n');
        const blob = new Blob([
            csv
        ], {
            type: 'text/csv'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'business_report.csv';
        a.click();
    };
    const handleGSTR1 = ()=>{
        if (!company?.gstNumber) {
            alert("GST Number required for GSTR-1 export.");
            return;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$gst$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["downloadGSTR1"])(invoices, company.name, company.gstNumber);
    };
    const KPI = ({ label, value, sub, color, Icon, tooltipText })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "card",
            style: {
                padding: '18px 20px',
                display: 'flex',
                gap: 14,
                alignItems: 'center',
                position: 'relative'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        width: 48,
                        height: 48,
                        borderRadius: 14,
                        background: color + '15',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                        size: 22,
                        color: color
                    }, void 0, false, {
                        fileName: "[project]/app/company/reports/page.tsx",
                        lineNumber: 416,
                        columnNumber: 17
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/company/reports/page.tsx",
                    lineNumber: 415,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        flex: 1,
                        minWidth: 0
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 10,
                                fontWeight: 700,
                                color: '#A0AEC0',
                                textTransform: 'uppercase',
                                display: 'flex',
                                alignItems: 'center',
                                margin: 0
                            },
                            children: [
                                label,
                                tooltipText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoTooltip, {
                                    text: tooltipText,
                                    title: label
                                }, void 0, false, {
                                    fileName: "[project]/app/company/reports/page.tsx",
                                    lineNumber: 421,
                                    columnNumber: 37
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/reports/page.tsx",
                            lineNumber: 419,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 20,
                                fontWeight: 900,
                                color: '#1A1A2E',
                                margin: '2px 0 0'
                            },
                            children: value
                        }, void 0, false, {
                            fileName: "[project]/app/company/reports/page.tsx",
                            lineNumber: 423,
                            columnNumber: 17
                        }, this),
                        sub && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 11,
                                color: '#718096',
                                margin: '2px 0 0'
                            },
                            children: sub
                        }, void 0, false, {
                            fileName: "[project]/app/company/reports/page.tsx",
                            lineNumber: 424,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/company/reports/page.tsx",
                    lineNumber: 418,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/company/reports/page.tsx",
            lineNumber: 414,
            columnNumber: 9
        }, this);
    const FinancialRow = ({ label, amount, isTotal = false, isSub = false, tooltipText })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                display: 'flex',
                justifyContent: 'space-between',
                padding: isTotal ? '16px 0' : '12px 0',
                borderBottom: isTotal ? 'none' : '1px solid #F1F5F9',
                borderTop: isTotal ? '2px solid #E2E8F0' : 'none',
                fontWeight: isTotal ? 800 : isSub ? 500 : 700,
                fontSize: isTotal ? 16 : 14,
                color: isTotal ? '#1A1A2E' : isSub ? '#64748B' : '#334155',
                paddingLeft: isSub ? 20 : 0,
                position: 'relative'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        display: 'inline-flex',
                        alignItems: 'center'
                    },
                    children: [
                        label,
                        tooltipText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoTooltip, {
                            text: tooltipText,
                            title: label
                        }, void 0, false, {
                            fileName: "[project]/app/company/reports/page.tsx",
                            lineNumber: 433,
                            columnNumber: 33
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/company/reports/page.tsx",
                    lineNumber: 431,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: [
                        "₹",
                        amount.toLocaleString('en-IN', {
                            minimumFractionDigits: 2
                        })
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/company/reports/page.tsx",
                    lineNumber: 435,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/company/reports/page.tsx",
            lineNumber: 430,
            columnNumber: 9
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: 1200,
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: 10
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        style: {
                                            fontWeight: 900,
                                            fontSize: 22
                                        },
                                        children: "Financial Reports"
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 444,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 13,
                                            color: '#718096'
                                        },
                                        children: [
                                            company?.name,
                                            " · Enterprise Reporting"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 445,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 443,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: 10
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>toggleGuide(!showGuide),
                                        className: "btn btn-outline btn-sm",
                                        style: {
                                            gap: 5,
                                            color: '#4285F4',
                                            borderColor: '#4285F4'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                size: 13
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 449,
                                                columnNumber: 29
                                            }, this),
                                            " ",
                                            showGuide ? 'Hide Guide' : 'Learn Reports'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 448,
                                        columnNumber: 25
                                    }, this),
                                    !isSubBranchLogin && company?.franchiseEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowConsolidatedModal(true),
                                        className: "btn btn-sm",
                                        style: {
                                            gap: 5,
                                            background: 'linear-gradient(135deg, #7C3AED, #9333EA)',
                                            color: 'white',
                                            border: 'none'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"], {
                                                size: 13
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 453,
                                                columnNumber: 33
                                            }, this),
                                            " Consolidated Reports"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 452,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleGSTR1,
                                        className: "btn btn-green btn-sm",
                                        style: {
                                            gap: 5
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                size: 13
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 457,
                                                columnNumber: 29
                                            }, this),
                                            " GSTR-1 (JSON)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 456,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: exportReport,
                                        className: "btn btn-outline btn-sm",
                                        style: {
                                            gap: 5
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                size: 13
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 460,
                                                columnNumber: 29
                                            }, this),
                                            " Export CSV"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 459,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 447,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/reports/page.tsx",
                        lineNumber: 442,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: 10,
                            borderBottom: '1px solid #E2E8F0',
                            paddingBottom: 0,
                            overflowX: 'auto',
                            whiteSpace: 'nowrap'
                        },
                        className: "no-scrollbar",
                        children: [
                            {
                                id: 'overview',
                                label: 'Overview'
                            },
                            {
                                id: 'pnl',
                                label: 'Profit & Loss Statement'
                            },
                            {
                                id: 'balance',
                                label: 'Balance Sheet'
                            },
                            {
                                id: 'customer-insights',
                                label: 'Customer Value Insights'
                            },
                            {
                                id: 'waiter-analytics',
                                label: 'Waiter Analytics'
                            }
                        ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab(tab.id),
                                style: {
                                    background: 'none',
                                    border: 'none',
                                    padding: '12px 20px',
                                    fontWeight: activeTab === tab.id ? 800 : 600,
                                    color: activeTab === tab.id ? '#4285F4' : '#64748B',
                                    borderBottom: activeTab === tab.id ? '3px solid #4285F4' : '3px solid transparent',
                                    cursor: 'pointer',
                                    fontSize: 14,
                                    transition: 'all 0.2s',
                                    marginBottom: -1
                                },
                                children: tab.label
                            }, tab.id, false, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 473,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/company/reports/page.tsx",
                        lineNumber: 465,
                        columnNumber: 17
                    }, this),
                    mounted && showGuide && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card",
                        style: {
                            padding: '20px 24px',
                            background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)',
                            border: '1px solid #BFDBFE',
                            borderRadius: 16,
                            position: 'relative',
                            animation: 'slideDown 0.3s ease-out',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>toggleGuide(false),
                                style: {
                                    position: 'absolute',
                                    top: 16,
                                    right: 16,
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#64748B',
                                    padding: 4,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'background-color 0.2s'
                                },
                                onMouseEnter: (e)=>e.currentTarget.style.backgroundColor = '#E2E8F0',
                                onMouseLeave: (e)=>e.currentTarget.style.backgroundColor = 'transparent',
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/app/company/reports/page.tsx",
                                    lineNumber: 509,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 489,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: 12,
                                    alignItems: 'center',
                                    marginBottom: 12
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                        size: 20,
                                        color: "#3B82F6"
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 512,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            fontWeight: 800,
                                            fontSize: 15,
                                            color: '#1E3A8A',
                                            margin: 0
                                        },
                                        children: [
                                            "Guide: ",
                                            activeTab === 'overview' ? 'Reports Overview & KPIs' : activeTab === 'pnl' ? 'Understanding Profit & Loss' : activeTab === 'balance' ? 'Understanding Balance Sheets' : activeTab === 'customer-insights' ? 'Understanding Customer Value Insights' : 'Understanding Waiter Analytics'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 513,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 511,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 13,
                                    color: '#334155',
                                    lineHeight: 1.6
                                },
                                children: [
                                    activeTab === 'overview' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    margin: '0 0 8px'
                                                },
                                                children: [
                                                    "The ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Overview Dashboard"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                        lineNumber: 522,
                                                        columnNumber: 45
                                                    }, this),
                                                    " provides a high-level summary of your company's performance. It pulls data from all your finalized sales bills, purchase orders, expenses, and inventory values."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 521,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                style: {
                                                    margin: 0,
                                                    paddingLeft: 20
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Daily Closing Report:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/reports/page.tsx",
                                                                lineNumber: 525,
                                                                columnNumber: 45
                                                            }, this),
                                                            " Run a daily register count to audit your cash drawer, bank collections, and match expected cash against physical cash."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                        lineNumber: 525,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Net Profit vs GST Liability:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/reports/page.tsx",
                                                                lineNumber: 526,
                                                                columnNumber: 45
                                                            }, this),
                                                            " Net Profit is calculated as ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                                children: "Sales - Purchases - Expenses"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/reports/page.tsx",
                                                                lineNumber: 526,
                                                                columnNumber: 119
                                                            }, this),
                                                            ". GST Liability shows the net GST collected from sales minus the GST paid on purchases (Input Tax Credit)."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                        lineNumber: 526,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 524,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    activeTab === 'pnl' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    margin: '0 0 8px'
                                                },
                                                children: [
                                                    "The ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Profit & Loss Statement (P&L)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                        lineNumber: 533,
                                                        columnNumber: 45
                                                    }, this),
                                                    " measures your business revenues and expenses over time. It answers the fundamental question: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                        children: '"Is the business making money?"'
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                        lineNumber: 533,
                                                        columnNumber: 185
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 532,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                style: {
                                                    margin: 0,
                                                    paddingLeft: 20
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Cost of Goods Sold (COGS):"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/reports/page.tsx",
                                                                lineNumber: 536,
                                                                columnNumber: 45
                                                            }, this),
                                                            " Calculated as ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                                children: "Opening Stock + Purchases - Closing Stock"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/reports/page.tsx",
                                                                lineNumber: 536,
                                                                columnNumber: 103
                                                            }, this),
                                                            ". It reflects the direct cost of producing/buying the items you sold."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                        lineNumber: 536,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Gross Profit:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/reports/page.tsx",
                                                                lineNumber: 537,
                                                                columnNumber: 45
                                                            }, this),
                                                            " Revenue minus COGS. This represents your core markup before accounting for overhead expenses like rent or utilities."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                        lineNumber: 537,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Net Profit:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/reports/page.tsx",
                                                                lineNumber: 538,
                                                                columnNumber: 45
                                                            }, this),
                                                            " Gross Profit minus Operating Expenses. If positive, your business is profitable; if negative, it is running at a loss."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                        lineNumber: 538,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 535,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    activeTab === 'balance' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    margin: '0 0 8px'
                                                },
                                                children: [
                                                    "The ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Balance Sheet"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                        lineNumber: 545,
                                                        columnNumber: 45
                                                    }, this),
                                                    " is a financial snapshot showing what your business owns (Assets) and owes (Liabilities) at a specific point in time. It must always balance: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Assets = Liabilities + Equity"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                        lineNumber: 545,
                                                        columnNumber: 217
                                                    }, this),
                                                    "."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 544,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                style: {
                                                    margin: 0,
                                                    paddingLeft: 20
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Owner's Equity:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/reports/page.tsx",
                                                                lineNumber: 548,
                                                                columnNumber: 45
                                                            }, this),
                                                            " The initial funds/capital invested by the owners, adjusted by the cumulative Net Profit or Loss generated over time."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                        lineNumber: 548,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Assets:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/reports/page.tsx",
                                                                lineNumber: 549,
                                                                columnNumber: 45
                                                            }, this),
                                                            " Includes Cash & Bank Balances, Accounts Receivable (debts due from customers), Inventory value (closing stock), and unused GST Input Tax Credit."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                        lineNumber: 549,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Liabilities:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/reports/page.tsx",
                                                                lineNumber: 550,
                                                                columnNumber: 45
                                                            }, this),
                                                            " Includes Accounts Payable (dues owed to suppliers) and GST Payable (GST collected from customers but not yet paid to the government)."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                        lineNumber: 550,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 547,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    activeTab === 'customer-insights' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                margin: '0 0 8px'
                                            },
                                            children: [
                                                "The ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Customer Value Insights"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                    lineNumber: 557,
                                                    columnNumber: 45
                                                }, this),
                                                " dashboard highlights your most valuable customers, their purchase frequency, outstanding balances, and average days between visits."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/reports/page.tsx",
                                            lineNumber: 556,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false),
                                    activeTab === 'waiter-analytics' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                margin: '0 0 8px'
                                            },
                                            children: [
                                                "The ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Waiter Analytics"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                    lineNumber: 564,
                                                    columnNumber: 45
                                                }, this),
                                                " dashboard tracks the performance of your servers and waiters. It aggregates total revenue generated, orders count, service charges collected, and computes estimated commissions."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/reports/page.tsx",
                                            lineNumber: 563,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 518,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/reports/page.tsx",
                        lineNumber: 480,
                        columnNumber: 21
                    }, this),
                    activeTab === 'overview' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>router.push('/company/reports/daily-close'),
                                style: {
                                    background: 'linear-gradient(135deg, #1A1A2E 0%, #2D3748 100%)',
                                    borderRadius: 20,
                                    padding: '20px 28px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    transition: 'transform 0.15s',
                                    border: '1px solid rgba(255,255,255,0.08)'
                                },
                                onMouseEnter: (e)=>e.currentTarget.style.transform = 'scale(1.01)',
                                onMouseLeave: (e)=>e.currentTarget.style.transform = 'scale(1)',
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 16
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: 14,
                                                    background: 'rgba(52,168,83,0.15)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    border: '1px solid rgba(52,168,83,0.3)'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                    size: 22,
                                                    color: "#34A853"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                    lineNumber: 583,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 582,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontWeight: 900,
                                                            fontSize: 16,
                                                            color: 'white',
                                                            margin: 0
                                                        },
                                                        children: "📊 Daily Closing Report"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                        lineNumber: 586,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 12,
                                                            color: 'rgba(255,255,255,0.55)',
                                                            margin: '3px 0 0'
                                                        },
                                                        children: [
                                                            "Today · ",
                                                            new Date().toLocaleDateString('en-IN', {
                                                                weekday: 'long',
                                                                day: 'numeric',
                                                                month: 'short'
                                                            }),
                                                            " · ",
                                                            invoices.filter((i)=>i.date === new Date().toISOString().slice(0, 10) && i.invoiceType === 'sale').length,
                                                            " sale bills"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                        lineNumber: 587,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 585,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 581,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 12
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    textAlign: 'right'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 22,
                                                            fontWeight: 900,
                                                            color: '#34A853',
                                                            margin: 0
                                                        },
                                                        children: [
                                                            "₹",
                                                            invoices.filter((i)=>i.date === new Date().toISOString().slice(0, 10) && i.invoiceType === 'sale').reduce((a, i)=>a + i.grandTotal, 0).toLocaleString('en-IN')
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                        lineNumber: 594,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 11,
                                                            color: 'rgba(255,255,255,0.4)',
                                                            margin: 0
                                                        },
                                                        children: "today's sales"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                        lineNumber: 597,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 593,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: '#34A853',
                                                    color: 'white',
                                                    padding: '8px 18px',
                                                    borderRadius: 10,
                                                    fontWeight: 800,
                                                    fontSize: 13,
                                                    whiteSpace: 'nowrap'
                                                },
                                                children: "Open Report →"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 599,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 592,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 575,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                                    gap: 14
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KPI, {
                                        label: "Total Sales",
                                        value: `₹${(totalSales / 1000).toFixed(1)}K`,
                                        sub: "GST Bills Only",
                                        color: "#34A853",
                                        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"],
                                        tooltipText: "Cumulative value of all finalized sales invoices that are marked as GST Bills."
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 606,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KPI, {
                                        label: "Total Purchase",
                                        value: `₹${(totalPurchase / 1000).toFixed(1)}K`,
                                        color: "#4285F4",
                                        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__["TrendingDown"],
                                        tooltipText: "Cumulative value of all purchase invoices/bills logged in the system."
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 607,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KPI, {
                                        label: "Net Profit",
                                        value: `₹${(netProfit / 1000).toFixed(1)}K`,
                                        color: netProfit >= 0 ? '#34A853' : '#EA4335',
                                        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"],
                                        tooltipText: "Calculated as (Total Sales - Total Purchase - Operating Expenses). Represents the business's net earnings."
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 608,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KPI, {
                                        label: "GST Liability",
                                        value: `₹${(gstLiability / 1000).toFixed(1)}K`,
                                        color: "#FBBC04",
                                        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
                                        tooltipText: "Calculated as (GST Collected on Sales - GST Paid on Purchases). A positive amount is payable to the government."
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 609,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 605,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card",
                                style: {
                                    padding: 24
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            fontWeight: 800,
                                            fontSize: 16,
                                            marginBottom: 20
                                        },
                                        children: "Revenue Trend (Last 6 Months)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 613,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            gap: 8,
                                            alignItems: 'flex-end',
                                            height: 160
                                        },
                                        children: months.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    flex: 1,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    gap: 6
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            width: '100%',
                                                            height: maxMonthSale > 0 ? m.sales / maxMonthSale * 120 : 0,
                                                            background: 'linear-gradient(to top, #34A853, #81C995)',
                                                            borderRadius: '4px 4px 0 0'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                        lineNumber: 617,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 10,
                                                            color: '#718096',
                                                            fontWeight: 600
                                                        },
                                                        children: m.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                        lineNumber: 618,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, m.key, true, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 616,
                                                columnNumber: 37
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 614,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 612,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: 16
                                },
                                className: "reports-grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "card",
                                        style: {
                                            padding: 20
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                style: {
                                                    fontWeight: 800,
                                                    fontSize: 15,
                                                    marginBottom: 16
                                                },
                                                children: "Top Customers by Revenue"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 626,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 10
                                                },
                                                children: topCustomers.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    fontSize: 12,
                                                                    marginBottom: 4
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontWeight: 600
                                                                        },
                                                                        children: c.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                                        lineNumber: 631,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontWeight: 800,
                                                                            color: '#334155'
                                                                        },
                                                                        children: [
                                                                            "₹",
                                                                            c.total.toLocaleString()
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                                        lineNumber: 632,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/reports/page.tsx",
                                                                lineNumber: 630,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniBar, {
                                                                value: c.total,
                                                                max: topCustomers[0].total,
                                                                color: "#4285F4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/reports/page.tsx",
                                                                lineNumber: 634,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, c.name, true, {
                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                        lineNumber: 629,
                                                        columnNumber: 41
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 627,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 625,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "card",
                                        style: {
                                            padding: 20
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                style: {
                                                    fontWeight: 800,
                                                    fontSize: 15,
                                                    marginBottom: 16
                                                },
                                                children: "Top Performing Items"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 640,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 10
                                                },
                                                children: topItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    fontSize: 12,
                                                                    marginBottom: 4
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontWeight: 600
                                                                        },
                                                                        children: item.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                                        lineNumber: 645,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontWeight: 800,
                                                                            color: '#334155'
                                                                        },
                                                                        children: [
                                                                            "₹",
                                                                            item.revenue.toLocaleString()
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                                        lineNumber: 646,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/reports/page.tsx",
                                                                lineNumber: 644,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniBar, {
                                                                value: item.revenue,
                                                                max: maxItemRevenue,
                                                                color: "#34A853"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/reports/page.tsx",
                                                                lineNumber: 648,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, item.name, true, {
                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                        lineNumber: 643,
                                                        columnNumber: 41
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 641,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 639,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 624,
                                columnNumber: 25
                            }, this),
                            !isSubBranchLogin && company?.franchiseEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card",
                                style: {
                                    padding: 24
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            fontWeight: 800,
                                            fontSize: 16,
                                            marginBottom: 16
                                        },
                                        children: "📍 Outlet Performance Breakdown"
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 657,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            overflowX: 'auto'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                            className: "e-table",
                                            style: {
                                                minWidth: 600
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                children: "Outlet Name"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/reports/page.tsx",
                                                                lineNumber: 662,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                children: "GSTIN"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/reports/page.tsx",
                                                                lineNumber: 663,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                children: "Sales Revenue"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/reports/page.tsx",
                                                                lineNumber: 664,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                children: "Purchases"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/reports/page.tsx",
                                                                lineNumber: 665,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                children: "Expenses"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/reports/page.tsx",
                                                                lineNumber: 666,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                children: "Net Profit"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/reports/page.tsx",
                                                                lineNumber: 667,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                        lineNumber: 661,
                                                        columnNumber: 45
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                    lineNumber: 660,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                    children: [
                                                        (()=>{
                                                            const hoSales = allInvoices.filter((i)=>(!i.branchId || i.branchId === 'head_office') && i.invoiceType === 'sale' && !DRAFT_TYPES.includes(i.invoiceType) && i.isGstBill).reduce((a, i)=>a + i.grandTotal, 0);
                                                            const hoPurchases = allInvoices.filter((i)=>(!i.branchId || i.branchId === 'head_office') && i.invoiceType === 'purchase').reduce((a, i)=>a + i.grandTotal, 0);
                                                            const hoExpenses = allExpenses.filter((e)=>!e.branchId || e.branchId === 'head_office').reduce((a, e)=>a + e.amount, 0);
                                                            const hoProfit = hoSales - hoPurchases - hoExpenses;
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        style: {
                                                                            fontWeight: 700
                                                                        },
                                                                        children: "Head Office"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                                        lineNumber: 678,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        children: company?.gstNumber || '—'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                                        lineNumber: 679,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        style: {
                                                                            fontWeight: 700
                                                                        },
                                                                        children: [
                                                                            "₹",
                                                                            hoSales.toLocaleString('en-IN')
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                                        lineNumber: 680,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        children: [
                                                                            "₹",
                                                                            hoPurchases.toLocaleString('en-IN')
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                                        lineNumber: 681,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        children: [
                                                                            "₹",
                                                                            hoExpenses.toLocaleString('en-IN')
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                                        lineNumber: 682,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        style: {
                                                                            fontWeight: 800,
                                                                            color: hoProfit >= 0 ? '#34A853' : '#EA4335'
                                                                        },
                                                                        children: [
                                                                            "₹",
                                                                            hoProfit.toLocaleString('en-IN')
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                                        lineNumber: 683,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/reports/page.tsx",
                                                                lineNumber: 677,
                                                                columnNumber: 53
                                                            }, this);
                                                        })(),
                                                        (company?.branches || []).map((b)=>{
                                                            const bSales = allInvoices.filter((i)=>i.branchId === b.id && i.invoiceType === 'sale' && !DRAFT_TYPES.includes(i.invoiceType) && i.isGstBill).reduce((a, i)=>a + i.grandTotal, 0);
                                                            const bPurchases = allInvoices.filter((i)=>i.branchId === b.id && i.invoiceType === 'purchase').reduce((a, i)=>a + i.grandTotal, 0);
                                                            const bExpenses = allExpenses.filter((e)=>e.branchId === b.id).reduce((a, e)=>a + e.amount, 0);
                                                            const bProfit = bSales - bPurchases - bExpenses;
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        style: {
                                                                            fontWeight: 700
                                                                        },
                                                                        children: b.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                                        lineNumber: 696,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        children: b.gstin || '—'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                                        lineNumber: 697,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        style: {
                                                                            fontWeight: 700
                                                                        },
                                                                        children: [
                                                                            "₹",
                                                                            bSales.toLocaleString('en-IN')
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                                        lineNumber: 698,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        children: [
                                                                            "₹",
                                                                            bPurchases.toLocaleString('en-IN')
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                                        lineNumber: 699,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        children: [
                                                                            "₹",
                                                                            bExpenses.toLocaleString('en-IN')
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                                        lineNumber: 700,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        style: {
                                                                            fontWeight: 800,
                                                                            color: bProfit >= 0 ? '#34A853' : '#EA4335'
                                                                        },
                                                                        children: [
                                                                            "₹",
                                                                            bProfit.toLocaleString('en-IN')
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                                        lineNumber: 701,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                ]
                                                            }, b.id, true, {
                                                                fileName: "[project]/app/company/reports/page.tsx",
                                                                lineNumber: 695,
                                                                columnNumber: 53
                                                            }, this);
                                                        })
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                    lineNumber: 670,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/reports/page.tsx",
                                            lineNumber: 659,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 658,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 656,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true),
                    activeTab === 'pnl' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card",
                        style: {
                            padding: 32,
                            maxWidth: 800,
                            margin: '0 auto',
                            width: '100%'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: 'center',
                                    marginBottom: 32
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        style: {
                                            fontSize: 20,
                                            fontWeight: 900,
                                            marginBottom: 4
                                        },
                                        children: "Profit and Loss Statement"
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 718,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 13,
                                            color: '#64748B'
                                        },
                                        children: [
                                            "For the period all-time to ",
                                            new Date().toLocaleDateString('en-IN')
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 719,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 717,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                style: {
                                    color: '#1E40AF',
                                    fontSize: 14,
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    marginBottom: 16
                                },
                                children: "1. Sales Account"
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 722,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FinancialRow, {
                                label: "Total Billed Revenue (Sales)",
                                amount: totalSales,
                                tooltipText: "Sum of all sales invoices created, reflecting the total gross sales."
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 723,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FinancialRow, {
                                label: "Less: Sale Returns",
                                amount: 0,
                                isSub: true,
                                tooltipText: "Total value of credit notes / returned goods from customers (currently zero)."
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 724,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FinancialRow, {
                                label: "Net Sales",
                                amount: totalSales,
                                isTotal: true,
                                tooltipText: "Total Sales minus Sales Returns. Represents the net revenue generated by selling goods."
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 725,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    height: 24
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 727,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                style: {
                                    color: '#1E40AF',
                                    fontSize: 14,
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    marginBottom: 16
                                },
                                children: "2. Cost of Goods Sold"
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 729,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FinancialRow, {
                                label: "Opening Stock",
                                amount: 0,
                                isSub: true,
                                tooltipText: "The value of inventory held at the beginning of the accounting period."
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 730,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FinancialRow, {
                                label: "Add: Purchases",
                                amount: totalPurchase,
                                isSub: true,
                                tooltipText: "The value of new inventory purchased during the accounting period."
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 731,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FinancialRow, {
                                label: "Less: Closing Stock",
                                amount: closingStockValue,
                                isSub: true,
                                tooltipText: "The value of unsold inventory remaining at the end of the accounting period."
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 732,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FinancialRow, {
                                label: "Cost of Goods Sold (Calculated)",
                                amount: totalPurchase - closingStockValue,
                                isTotal: true,
                                tooltipText: "Calculated as (Opening Stock + Purchases - Closing Stock). It is the direct cost of items sold."
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 733,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    height: 24
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 735,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: '#F0FDF4',
                                    padding: '16px 20px',
                                    borderRadius: 8,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontWeight: 900,
                                    fontSize: 16,
                                    color: '#166534',
                                    border: '1px solid #BBF7D0'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "GROSS PROFIT"
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 738,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "₹",
                                            (totalSales - (totalPurchase - closingStockValue)).toLocaleString('en-IN', {
                                                minimumFractionDigits: 2
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 739,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 737,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    height: 24
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 742,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                style: {
                                    color: '#1E40AF',
                                    fontSize: 14,
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    marginBottom: 16
                                },
                                children: "3. Operating Expenses"
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 744,
                                columnNumber: 25
                            }, this),
                            expenses.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FinancialRow, {
                                label: "General Expenses",
                                amount: 0,
                                isSub: true,
                                tooltipText: "General company expenses logged when no specific entries are present."
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 746,
                                columnNumber: 29
                            }, this) : expenses.map((e)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FinancialRow, {
                                    label: e.title,
                                    amount: e.amount,
                                    isSub: true,
                                    tooltipText: `Operational expense logged for: ${e.title}`
                                }, e.id, false, {
                                    fileName: "[project]/app/company/reports/page.tsx",
                                    lineNumber: 748,
                                    columnNumber: 54
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FinancialRow, {
                                label: "Total Operating Expenses",
                                amount: totalExpenses,
                                isTotal: true,
                                tooltipText: "Sum of all indirect operational expenditures (e.g. rent, salaries, utilities) not directly tied to purchasing stock."
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 750,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    height: 32
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 752,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: netProfit >= 0 ? '#1E293B' : '#7F1D1D',
                                    padding: '20px',
                                    borderRadius: 12,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontWeight: 900,
                                    fontSize: 18,
                                    color: 'white'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "NET ",
                                            netProfit >= 0 ? 'PROFIT' : 'LOSS'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 755,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "₹",
                                            Math.abs(netProfit).toLocaleString('en-IN', {
                                                minimumFractionDigits: 2
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 756,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 754,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/reports/page.tsx",
                        lineNumber: 716,
                        columnNumber: 21
                    }, this),
                    activeTab === 'balance' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card",
                        style: {
                            padding: 32,
                            maxWidth: 900,
                            margin: '0 auto',
                            width: '100%'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: 'center',
                                    marginBottom: 32
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        style: {
                                            fontSize: 20,
                                            fontWeight: 900,
                                            marginBottom: 4
                                        },
                                        children: "Balance Sheet"
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 764,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 13,
                                            color: '#64748B'
                                        },
                                        children: [
                                            "As on ",
                                            new Date().toLocaleDateString('en-IN')
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 765,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 763,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
                                    gap: 32,
                                    alignItems: 'flex-start'
                                },
                                className: "reports-grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: '#F8FAFC',
                                            padding: 24,
                                            borderRadius: 16,
                                            border: '1px solid #E2E8F0'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                style: {
                                                    fontSize: 16,
                                                    fontWeight: 900,
                                                    color: '#0F172A',
                                                    marginBottom: 20,
                                                    borderBottom: '2px solid #CBD5E1',
                                                    paddingBottom: 8
                                                },
                                                children: "Liabilities & Equity"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 770,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                style: {
                                                    color: '#1E40AF',
                                                    fontSize: 13,
                                                    fontWeight: 800,
                                                    textTransform: 'uppercase',
                                                    marginBottom: 12
                                                },
                                                children: "Owner's Equity"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 772,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FinancialRow, {
                                                label: "Opening Capital / Funds",
                                                amount: 50000,
                                                isSub: true,
                                                tooltipText: "The initial investment or retained earnings brought forward to start the period."
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 773,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FinancialRow, {
                                                label: "Add: Net Profit/(Loss) for the period",
                                                amount: netProfit,
                                                isSub: true,
                                                tooltipText: "The net profit or loss generated by the business during this period, which increases or decreases equity."
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 774,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FinancialRow, {
                                                label: "Total Equity",
                                                amount: 50000 + netProfit,
                                                isTotal: true,
                                                tooltipText: "The owner's net stake in the business, calculated as Capital + Net Profit."
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 775,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    height: 24
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 777,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                style: {
                                                    color: '#1E40AF',
                                                    fontSize: 13,
                                                    fontWeight: 800,
                                                    textTransform: 'uppercase',
                                                    marginBottom: 12
                                                },
                                                children: "Current Liabilities"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 779,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FinancialRow, {
                                                label: "Sundry Creditors (Accounts Payable)",
                                                amount: accountsPayable,
                                                isSub: true,
                                                tooltipText: "Total amount owed to suppliers/vendors for purchases made on credit."
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 780,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FinancialRow, {
                                                label: "GST Payable (Liability)",
                                                amount: Math.max(0, gstLiability),
                                                isSub: true,
                                                tooltipText: "The net GST collected from customers that needs to be paid to the tax authority."
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 781,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FinancialRow, {
                                                label: "Total Current Liabilities",
                                                amount: accountsPayable + Math.max(0, gstLiability),
                                                isTotal: true,
                                                tooltipText: "Short-term obligations due within one year, including trade payables and tax liabilities."
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 782,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    height: 32
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 784,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    fontWeight: 900,
                                                    fontSize: 16,
                                                    color: '#0F172A',
                                                    borderTop: '3px double #0F172A',
                                                    paddingTop: 16
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "TOTAL LIABILITIES & EQUITY"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                        lineNumber: 787,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "₹",
                                                            (50000 + netProfit + accountsPayable + Math.max(0, gstLiability)).toLocaleString('en-IN', {
                                                                minimumFractionDigits: 2
                                                            })
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                        lineNumber: 788,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 786,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 769,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: '#F8FAFC',
                                            padding: 24,
                                            borderRadius: 16,
                                            border: '1px solid #E2E8F0'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                style: {
                                                    fontSize: 16,
                                                    fontWeight: 900,
                                                    color: '#0F172A',
                                                    marginBottom: 20,
                                                    borderBottom: '2px solid #CBD5E1',
                                                    paddingBottom: 8
                                                },
                                                children: "Assets"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 793,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                style: {
                                                    color: '#1E40AF',
                                                    fontSize: 13,
                                                    fontWeight: 800,
                                                    textTransform: 'uppercase',
                                                    marginBottom: 12
                                                },
                                                children: "Current Assets"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 795,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FinancialRow, {
                                                label: "Cash & Bank Balances",
                                                amount: Math.max(0, cashInBank),
                                                isSub: true,
                                                tooltipText: "Total liquid cash available in hand and in the company's bank accounts."
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 796,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FinancialRow, {
                                                label: "Sundry Debtors (Accounts Receivable)",
                                                amount: accountsReceivable,
                                                isSub: true,
                                                tooltipText: "Total outstanding payments due from customers for sales made on credit."
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 797,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FinancialRow, {
                                                label: "Closing Stock (Inventory)",
                                                amount: closingStockValue,
                                                isSub: true,
                                                tooltipText: "The cost value of unsold stock remaining in your inventory."
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 798,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FinancialRow, {
                                                label: "GST Input Credit",
                                                amount: Math.max(0, -gstLiability),
                                                isSub: true,
                                                tooltipText: "GST paid on business purchases that can be offset against GST collected on sales."
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 799,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FinancialRow, {
                                                label: "Total Current Assets",
                                                amount: Math.max(0, cashInBank) + accountsReceivable + closingStockValue + Math.max(0, -gstLiability),
                                                isTotal: true,
                                                tooltipText: "Short-term assets that are cash or can be converted to cash within a year."
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 800,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    height: 32
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 802,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    height: 110
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 803,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    fontWeight: 900,
                                                    fontSize: 16,
                                                    color: '#0F172A',
                                                    borderTop: '3px double #0F172A',
                                                    paddingTop: 16
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "TOTAL ASSETS"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                        lineNumber: 806,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "₹",
                                                            (Math.max(0, cashInBank) + accountsReceivable + closingStockValue + Math.max(0, -gstLiability)).toLocaleString('en-IN', {
                                                                minimumFractionDigits: 2
                                                            })
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                        lineNumber: 807,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 805,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 792,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 768,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/reports/page.tsx",
                        lineNumber: 762,
                        columnNumber: 21
                    }, this),
                    activeTab === 'customer-insights' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: '1.2fr 1.8fr',
                            gap: 20
                        },
                        className: "reports-grid",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card",
                                style: {
                                    padding: 24,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 16
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                style: {
                                                    fontSize: 16,
                                                    fontWeight: 900,
                                                    color: '#0F172A',
                                                    margin: 0
                                                },
                                                children: "🏆 Highest Spenders Leaderboard"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 819,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 12,
                                                    color: '#718096',
                                                    margin: '4px 0 0'
                                                },
                                                children: "Customers ranked by total purchase volume."
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 820,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 818,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 8,
                                            maxHeight: 600,
                                            overflowY: 'auto',
                                            paddingRight: 4
                                        },
                                        children: customerInsights.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                textAlign: 'center',
                                                padding: '40px 0',
                                                color: '#A0AEC0',
                                                fontWeight: 600
                                            },
                                            children: "No customer transactions found."
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/reports/page.tsx",
                                            lineNumber: 825,
                                            columnNumber: 37
                                        }, this) : customerInsights.map((cust, idx)=>{
                                            const isSelected = (cust.phone || cust.name) === activeCustomerKey;
                                            const rankBadge = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                onClick: ()=>setSelectedCustomerKey(cust.phone || cust.name),
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    padding: '12px 14px',
                                                    borderRadius: 12,
                                                    border: isSelected ? '2px solid #4285F4' : '1px solid #E2E8F0',
                                                    background: isSelected ? '#EBF8FF' : 'white',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.15s',
                                                    transform: isSelected ? 'scale(1.02)' : 'none',
                                                    boxShadow: isSelected ? '0 4px 6px -1px rgba(66, 133, 244, 0.1)' : 'none'
                                                },
                                                onMouseEnter: (e)=>{
                                                    if (!isSelected) e.currentTarget.style.borderColor = '#CBD5E0';
                                                },
                                                onMouseLeave: (e)=>{
                                                    if (!isSelected) e.currentTarget.style.borderColor = '#E2E8F0';
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 10,
                                                            minWidth: 0,
                                                            flex: 1
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: 13,
                                                                    fontWeight: 900,
                                                                    color: '#4A5568',
                                                                    width: 28,
                                                                    textAlign: 'center'
                                                                },
                                                                children: rankBadge
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/reports/page.tsx",
                                                                lineNumber: 851,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    minWidth: 0,
                                                                    flex: 1
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        style: {
                                                                            fontSize: 13,
                                                                            fontWeight: 800,
                                                                            color: '#1A202C',
                                                                            margin: 0,
                                                                            overflow: 'hidden',
                                                                            textOverflow: 'ellipsis',
                                                                            whiteSpace: 'nowrap'
                                                                        },
                                                                        children: cust.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                                        lineNumber: 853,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        style: {
                                                                            fontSize: 11,
                                                                            color: '#718096',
                                                                            margin: '2px 0 0'
                                                                        },
                                                                        children: cust.phone || 'No phone'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                                        lineNumber: 854,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/reports/page.tsx",
                                                                lineNumber: 852,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                        lineNumber: 850,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            textAlign: 'right',
                                                            flexShrink: 0
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: 13,
                                                                    fontWeight: 900,
                                                                    color: '#34A853',
                                                                    margin: 0
                                                                },
                                                                children: [
                                                                    "₹",
                                                                    cust.totalSpent.toLocaleString('en-IN')
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/reports/page.tsx",
                                                                lineNumber: 858,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: 10,
                                                                    color: '#718096',
                                                                    margin: '2px 0 0',
                                                                    fontWeight: 600
                                                                },
                                                                children: [
                                                                    cust.invoiceCount,
                                                                    " visits"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/reports/page.tsx",
                                                                lineNumber: 859,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                        lineNumber: 857,
                                                        columnNumber: 49
                                                    }, this)
                                                ]
                                            }, cust.phone || cust.name, true, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 831,
                                                columnNumber: 45
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 823,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 817,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 20
                                },
                                children: selectedCustomerDetail ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "card",
                                            style: {
                                                padding: 24,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 16
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'flex-start',
                                                        flexWrap: 'wrap',
                                                        gap: 12
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        background: '#EBF8FF',
                                                                        color: '#2B6CB0',
                                                                        fontSize: 10,
                                                                        fontWeight: 900,
                                                                        padding: '3px 8px',
                                                                        borderRadius: 6,
                                                                        textTransform: 'uppercase',
                                                                        letterSpacing: '0.05em'
                                                                    },
                                                                    children: "Customer Profile"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 876,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    style: {
                                                                        fontSize: 18,
                                                                        fontWeight: 900,
                                                                        color: '#1A202C',
                                                                        margin: '6px 0 2px'
                                                                    },
                                                                    children: selectedCustomerDetail.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 877,
                                                                    columnNumber: 49
                                                                }, this),
                                                                selectedCustomerDetail.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    style: {
                                                                        fontSize: 12,
                                                                        color: '#718096',
                                                                        margin: 0
                                                                    },
                                                                    children: [
                                                                        "📞 ",
                                                                        selectedCustomerDetail.phone
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 878,
                                                                    columnNumber: 82
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                            lineNumber: 875,
                                                            columnNumber: 45
                                                        }, this),
                                                        company?.loyaltyPointsEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                background: '#E6FFFA',
                                                                border: '1px solid #B2F5EA',
                                                                borderRadius: 12,
                                                                padding: '8px 16px',
                                                                textAlign: 'right'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    style: {
                                                                        fontSize: 10,
                                                                        color: '#00A389',
                                                                        fontWeight: 800,
                                                                        textTransform: 'uppercase',
                                                                        margin: '0 0 2px'
                                                                    },
                                                                    children: "🌟 loyalty points"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 883,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    style: {
                                                                        fontSize: 18,
                                                                        fontWeight: 900,
                                                                        color: '#007766',
                                                                        margin: 0
                                                                    },
                                                                    children: [
                                                                        selectedCustomerDetail.loyaltyPoints,
                                                                        " pts"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 884,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                            lineNumber: 882,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                    lineNumber: 874,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'grid',
                                                        gridTemplateColumns: 'repeat(3, 1fr)',
                                                        gap: 12
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                background: '#F7FAFC',
                                                                borderRadius: 12,
                                                                padding: '12px 14px',
                                                                border: '1px solid #EDF2F7'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    style: {
                                                                        fontSize: 10,
                                                                        color: '#718096',
                                                                        fontWeight: 700,
                                                                        textTransform: 'uppercase',
                                                                        margin: '0 0 4px'
                                                                    },
                                                                    children: "Visit Frequency"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 892,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    style: {
                                                                        fontSize: 18,
                                                                        fontWeight: 900,
                                                                        color: '#1A202C',
                                                                        margin: 0
                                                                    },
                                                                    children: [
                                                                        selectedCustomerDetail.invoiceCount,
                                                                        " orders"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 893,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                            lineNumber: 891,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                background: '#FFF5F5',
                                                                borderRadius: 12,
                                                                padding: '12px 14px',
                                                                border: '1px solid #FED7D7'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    style: {
                                                                        fontSize: 10,
                                                                        color: '#C53030',
                                                                        fontWeight: 700,
                                                                        textTransform: 'uppercase',
                                                                        margin: '0 0 4px'
                                                                    },
                                                                    children: "Outstanding Dues"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 896,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    style: {
                                                                        fontSize: 18,
                                                                        fontWeight: 900,
                                                                        color: '#9B2C2C',
                                                                        margin: 0
                                                                    },
                                                                    children: [
                                                                        "₹",
                                                                        selectedCustomerDetail.balanceDue.toLocaleString('en-IN')
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 897,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                            lineNumber: 895,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                background: '#FAF5FF',
                                                                borderRadius: 12,
                                                                padding: '12px 14px',
                                                                border: '1px solid #E9D8FD'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    style: {
                                                                        fontSize: 10,
                                                                        color: '#6B46C1',
                                                                        fontWeight: 700,
                                                                        textTransform: 'uppercase',
                                                                        margin: '0 0 4px'
                                                                    },
                                                                    children: "Avg Visit Interval"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 900,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    style: {
                                                                        fontSize: 18,
                                                                        fontWeight: 900,
                                                                        color: '#553C9A',
                                                                        margin: 0
                                                                    },
                                                                    children: calculateAvgDaysBetweenVisits(selectedCustomerDetail.invoices)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 901,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                            lineNumber: 899,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                    lineNumber: 890,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/reports/page.tsx",
                                            lineNumber: 873,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "card",
                                            style: {
                                                padding: 24
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    style: {
                                                        fontSize: 14,
                                                        fontWeight: 900,
                                                        color: '#0F172A',
                                                        marginBottom: 16,
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.04em'
                                                    },
                                                    children: "📅 Periodical Purchase History"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                    lineNumber: 910,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: 12,
                                                        maxHeight: 400,
                                                        overflowY: 'auto',
                                                        paddingRight: 4
                                                    },
                                                    children: [
                                                        ...selectedCustomerDetail.invoices
                                                    ].sort((a, b)=>{
                                                        const dateCompare = (b.date || '').localeCompare(a.date || '');
                                                        if (dateCompare !== 0) return dateCompare;
                                                        const timeCompare = (b.time || '00:00').localeCompare(a.time || '00:00');
                                                        if (timeCompare !== 0) return timeCompare;
                                                        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
                                                    }).map((inv)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center',
                                                                padding: '12px 16px',
                                                                borderRadius: 10,
                                                                border: '1px solid #E2E8F0',
                                                                background: '#F8FAFC'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            style: {
                                                                                fontSize: 13,
                                                                                fontWeight: 800,
                                                                                color: '#1A202C',
                                                                                margin: 0
                                                                            },
                                                                            children: [
                                                                                "Invoice #",
                                                                                inv.invoiceNumber
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                                            lineNumber: 934,
                                                                            columnNumber: 61
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                display: 'flex',
                                                                                gap: 8,
                                                                                alignItems: 'center',
                                                                                marginTop: 4
                                                                            },
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    style: {
                                                                                        fontSize: 11,
                                                                                        color: '#718096',
                                                                                        fontWeight: 600
                                                                                    },
                                                                                    children: [
                                                                                        inv.date,
                                                                                        " ",
                                                                                        inv.time || ''
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                                    lineNumber: 936,
                                                                                    columnNumber: 65
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: `badge ${inv.paymentStatus === 'paid' ? 'badge-green' : inv.paymentStatus === 'partial' ? 'badge-blue' : 'badge-red'}`,
                                                                                    style: {
                                                                                        fontSize: 9
                                                                                    },
                                                                                    children: inv.paymentStatus
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                                    lineNumber: 937,
                                                                                    columnNumber: 65
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                                            lineNumber: 935,
                                                                            columnNumber: 61
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 933,
                                                                    columnNumber: 57
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        textAlign: 'right'
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            style: {
                                                                                fontSize: 14,
                                                                                fontWeight: 900,
                                                                                color: '#1A202C',
                                                                                margin: 0
                                                                            },
                                                                            children: [
                                                                                "₹",
                                                                                inv.grandTotal.toLocaleString('en-IN')
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                                            lineNumber: 943,
                                                                            columnNumber: 61
                                                                        }, this),
                                                                        inv.pointsEarned !== undefined && inv.pointsEarned > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            style: {
                                                                                fontSize: 10,
                                                                                color: '#2F855A',
                                                                                fontWeight: 700
                                                                            },
                                                                            children: [
                                                                                "+",
                                                                                inv.pointsEarned,
                                                                                " pts"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                                            lineNumber: 945,
                                                                            columnNumber: 65
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 942,
                                                                    columnNumber: 57
                                                                }, this)
                                                            ]
                                                        }, inv.id, true, {
                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                            lineNumber: 921,
                                                            columnNumber: 53
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                    lineNumber: 911,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/reports/page.tsx",
                                            lineNumber: 909,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "card",
                                    style: {
                                        padding: 40,
                                        textAlign: 'center',
                                        color: '#A0AEC0',
                                        fontWeight: 600
                                    },
                                    children: "Select a customer from the leaderboard to view purchase frequency and timeline."
                                }, void 0, false, {
                                    fileName: "[project]/app/company/reports/page.tsx",
                                    lineNumber: 954,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 869,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/reports/page.tsx",
                        lineNumber: 815,
                        columnNumber: 21
                    }, this),
                    activeTab === 'waiter-analytics' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: '1.2fr 1.8fr',
                            gap: 20
                        },
                        className: "reports-grid",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card",
                                style: {
                                    padding: 24,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 16
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                style: {
                                                    fontSize: 16,
                                                    fontWeight: 900,
                                                    color: '#0F172A',
                                                    margin: 0
                                                },
                                                children: "👤 Server & Waiter Leaderboard"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 967,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 12,
                                                    color: '#718096',
                                                    margin: '4px 0 0'
                                                },
                                                children: "Ranked by total sales revenue attributed."
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 968,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 966,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 8,
                                            maxHeight: 600,
                                            overflowY: 'auto',
                                            paddingRight: 4
                                        },
                                        children: waiterInsights.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                textAlign: 'center',
                                                padding: '40px 0',
                                                color: '#A0AEC0',
                                                fontWeight: 600
                                            },
                                            children: "No waiter transactions found."
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/reports/page.tsx",
                                            lineNumber: 973,
                                            columnNumber: 37
                                        }, this) : waiterInsights.map((waiter, idx)=>{
                                            const isSelected = waiter.name === activeWaiterKey;
                                            const rankBadge = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`;
                                            const maxSales = waiterInsights[0]?.totalSpent || 1;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                onClick: ()=>setSelectedWaiterKey(waiter.name),
                                                style: {
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 8,
                                                    padding: '12px 14px',
                                                    borderRadius: 12,
                                                    border: isSelected ? '2px solid #4285F4' : '1px solid #E2E8F0',
                                                    background: isSelected ? '#EBF8FF' : 'white',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.15s',
                                                    transform: isSelected ? 'scale(1.02)' : 'none',
                                                    boxShadow: isSelected ? '0 4px 6px -1px rgba(66, 133, 244, 0.1)' : 'none'
                                                },
                                                onMouseEnter: (e)=>{
                                                    if (!isSelected) e.currentTarget.style.borderColor = '#CBD5E0';
                                                },
                                                onMouseLeave: (e)=>{
                                                    if (!isSelected) e.currentTarget.style.borderColor = '#E2E8F0';
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: 10,
                                                                    minWidth: 0,
                                                                    flex: 1
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontSize: 13,
                                                                            fontWeight: 900,
                                                                            color: '#4A5568',
                                                                            width: 28,
                                                                            textAlign: 'center'
                                                                        },
                                                                        children: rankBadge
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                                        lineNumber: 1001,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            minWidth: 0,
                                                                            flex: 1
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                style: {
                                                                                    fontSize: 13,
                                                                                    fontWeight: 800,
                                                                                    color: '#1A202C',
                                                                                    margin: 0,
                                                                                    overflow: 'hidden',
                                                                                    textOverflow: 'ellipsis',
                                                                                    whiteSpace: 'nowrap'
                                                                                },
                                                                                children: waiter.name
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/company/reports/page.tsx",
                                                                                lineNumber: 1003,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                style: {
                                                                                    fontSize: 11,
                                                                                    color: '#718096',
                                                                                    margin: '2px 0 0'
                                                                                },
                                                                                children: [
                                                                                    waiter.invoiceCount,
                                                                                    " orders served"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/company/reports/page.tsx",
                                                                                lineNumber: 1004,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                                        lineNumber: 1002,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/reports/page.tsx",
                                                                lineNumber: 1000,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    textAlign: 'right',
                                                                    flexShrink: 0
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        style: {
                                                                            fontSize: 13,
                                                                            fontWeight: 900,
                                                                            color: '#34A853',
                                                                            margin: 0
                                                                        },
                                                                        children: [
                                                                            "₹",
                                                                            waiter.totalSpent.toLocaleString('en-IN')
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                                        lineNumber: 1008,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    waiter.serviceCharges > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        style: {
                                                                            fontSize: 10,
                                                                            color: '#718096',
                                                                            margin: '2px 0 0',
                                                                            fontWeight: 600
                                                                        },
                                                                        children: [
                                                                            "₹",
                                                                            waiter.serviceCharges.toLocaleString('en-IN'),
                                                                            " tips"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                                        lineNumber: 1010,
                                                                        columnNumber: 61
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/reports/page.tsx",
                                                                lineNumber: 1007,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                        lineNumber: 999,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            marginTop: 4
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniBar, {
                                                            value: waiter.totalSpent,
                                                            max: maxSales,
                                                            color: "#4285F4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                            lineNumber: 1015,
                                                            columnNumber: 53
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/reports/page.tsx",
                                                        lineNumber: 1014,
                                                        columnNumber: 49
                                                    }, this)
                                                ]
                                            }, waiter.name, true, {
                                                fileName: "[project]/app/company/reports/page.tsx",
                                                lineNumber: 980,
                                                columnNumber: 45
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 971,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 965,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 20
                                },
                                children: selectedWaiterDetail ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "card",
                                            style: {
                                                padding: 24,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 16
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'flex-start',
                                                        flexWrap: 'wrap',
                                                        gap: 12
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 12
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        width: 48,
                                                                        height: 48,
                                                                        borderRadius: '50%',
                                                                        background: '#EBF8FF',
                                                                        border: '1px solid #BFDBFE',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        fontWeight: 900,
                                                                        fontSize: 18,
                                                                        color: '#2B6CB0'
                                                                    },
                                                                    children: selectedWaiterDetail.name.split(' ').map((n)=>n[0]).join('').toUpperCase().slice(0, 2)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 1032,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            style: {
                                                                                background: '#EBF8FF',
                                                                                color: '#2B6CB0',
                                                                                fontSize: 10,
                                                                                fontWeight: 900,
                                                                                padding: '3px 8px',
                                                                                borderRadius: 6,
                                                                                textTransform: 'uppercase',
                                                                                letterSpacing: '0.05em'
                                                                            },
                                                                            children: "Server Profile"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                                            lineNumber: 1048,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                            style: {
                                                                                fontSize: 18,
                                                                                fontWeight: 900,
                                                                                color: '#1A202C',
                                                                                margin: '4px 0 2px'
                                                                            },
                                                                            children: selectedWaiterDetail.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                                            lineNumber: 1049,
                                                                            columnNumber: 53
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 1047,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                            lineNumber: 1031,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                background: '#E6FFFA',
                                                                border: '1px solid #B2F5EA',
                                                                borderRadius: 12,
                                                                padding: '8px 16px',
                                                                textAlign: 'right'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    style: {
                                                                        fontSize: 10,
                                                                        color: '#00A389',
                                                                        fontWeight: 800,
                                                                        textTransform: 'uppercase',
                                                                        margin: '0 0 2px'
                                                                    },
                                                                    children: "💰 Sales Commission (5%)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 1054,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    style: {
                                                                        fontSize: 18,
                                                                        fontWeight: 900,
                                                                        color: '#007766',
                                                                        margin: 0
                                                                    },
                                                                    children: [
                                                                        "₹",
                                                                        selectedWaiterDetail.estimatedCommission.toLocaleString('en-IN', {
                                                                            maximumFractionDigits: 2
                                                                        })
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 1055,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                            lineNumber: 1053,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                    lineNumber: 1030,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'grid',
                                                        gridTemplateColumns: 'repeat(3, 1fr)',
                                                        gap: 12
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                background: '#F7FAFC',
                                                                borderRadius: 12,
                                                                padding: '12px 14px',
                                                                border: '1px solid #EDF2F7'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    style: {
                                                                        fontSize: 10,
                                                                        color: '#718096',
                                                                        fontWeight: 700,
                                                                        textTransform: 'uppercase',
                                                                        margin: '0 0 4px'
                                                                    },
                                                                    children: "Total Revenue"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 1062,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    style: {
                                                                        fontSize: 18,
                                                                        fontWeight: 900,
                                                                        color: '#1A202C',
                                                                        margin: 0
                                                                    },
                                                                    children: [
                                                                        "₹",
                                                                        selectedWaiterDetail.totalSpent.toLocaleString('en-IN')
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 1063,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                            lineNumber: 1061,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                background: '#F7FAFC',
                                                                borderRadius: 12,
                                                                padding: '12px 14px',
                                                                border: '1px solid #EDF2F7'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    style: {
                                                                        fontSize: 10,
                                                                        color: '#718096',
                                                                        fontWeight: 700,
                                                                        textTransform: 'uppercase',
                                                                        margin: '0 0 4px'
                                                                    },
                                                                    children: "Orders Served"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 1066,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    style: {
                                                                        fontSize: 18,
                                                                        fontWeight: 900,
                                                                        color: '#1A202C',
                                                                        margin: 0
                                                                    },
                                                                    children: [
                                                                        selectedWaiterDetail.invoiceCount,
                                                                        " bills"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 1067,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                            lineNumber: 1065,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                background: '#FAF5FF',
                                                                borderRadius: 12,
                                                                padding: '12px 14px',
                                                                border: '1px solid #E9D8FD'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    style: {
                                                                        fontSize: 10,
                                                                        color: '#6B46C1',
                                                                        fontWeight: 700,
                                                                        textTransform: 'uppercase',
                                                                        margin: '0 0 4px'
                                                                    },
                                                                    children: "Avg Bill Value"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 1070,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    style: {
                                                                        fontSize: 18,
                                                                        fontWeight: 900,
                                                                        color: '#553C9A',
                                                                        margin: 0
                                                                    },
                                                                    children: [
                                                                        "₹",
                                                                        selectedWaiterDetail.averageBillValue.toLocaleString('en-IN', {
                                                                            maximumFractionDigits: 1
                                                                        })
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 1071,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                            lineNumber: 1069,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                    lineNumber: 1060,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/reports/page.tsx",
                                            lineNumber: 1029,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "card",
                                            style: {
                                                padding: 24,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 16
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    style: {
                                                        fontSize: 14,
                                                        fontWeight: 900,
                                                        color: '#0F172A',
                                                        margin: 0,
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.04em'
                                                    },
                                                    children: "💵 Commission & Tips Summary"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                    lineNumber: 1080,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: 10
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                paddingBottom: 10,
                                                                borderBottom: '1px solid #F1F5F9',
                                                                fontSize: 13
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        color: '#4A5568',
                                                                        fontWeight: 600
                                                                    },
                                                                    children: "5% Sales Commission"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 1083,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontWeight: 800
                                                                    },
                                                                    children: [
                                                                        "₹",
                                                                        selectedWaiterDetail.estimatedCommission.toLocaleString('en-IN', {
                                                                            maximumFractionDigits: 2
                                                                        })
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 1084,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                            lineNumber: 1082,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                paddingBottom: 10,
                                                                borderBottom: '1px solid #F1F5F9',
                                                                fontSize: 13
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        color: '#4A5568',
                                                                        fontWeight: 600
                                                                    },
                                                                    children: "Service Charges (Tips Collected)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 1087,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontWeight: 800
                                                                    },
                                                                    children: [
                                                                        "₹",
                                                                        selectedWaiterDetail.serviceCharges.toLocaleString('en-IN')
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 1088,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                            lineNumber: 1086,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                paddingTop: 4,
                                                                fontSize: 15,
                                                                fontWeight: 900,
                                                                color: '#1A202C'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Total Dues Owed"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 1091,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        color: '#34A853'
                                                                    },
                                                                    children: [
                                                                        "₹",
                                                                        (selectedWaiterDetail.estimatedCommission + selectedWaiterDetail.serviceCharges).toLocaleString('en-IN', {
                                                                            maximumFractionDigits: 2
                                                                        })
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 1092,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                            lineNumber: 1090,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                    lineNumber: 1081,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/reports/page.tsx",
                                            lineNumber: 1079,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "card",
                                            style: {
                                                padding: 24
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    style: {
                                                        fontSize: 14,
                                                        fontWeight: 900,
                                                        color: '#0F172A',
                                                        marginBottom: 16,
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.04em'
                                                    },
                                                    children: "📋 Recent Orders Handled"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                    lineNumber: 1099,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: 12,
                                                        maxHeight: 400,
                                                        overflowY: 'auto',
                                                        paddingRight: 4
                                                    },
                                                    children: [
                                                        ...selectedWaiterDetail.invoices
                                                    ].sort((a, b)=>{
                                                        const dateCompare = (b.date || '').localeCompare(a.date || '');
                                                        if (dateCompare !== 0) return dateCompare;
                                                        const timeCompare = (b.time || '00:00').localeCompare(a.time || '00:00');
                                                        if (timeCompare !== 0) return timeCompare;
                                                        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
                                                    }).map((inv)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center',
                                                                padding: '12px 16px',
                                                                borderRadius: 10,
                                                                border: '1px solid #E2E8F0',
                                                                background: '#F8FAFC'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            style: {
                                                                                fontSize: 13,
                                                                                fontWeight: 800,
                                                                                color: '#1A202C',
                                                                                margin: 0
                                                                            },
                                                                            children: [
                                                                                "Invoice #",
                                                                                inv.invoiceNumber
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                                            lineNumber: 1123,
                                                                            columnNumber: 61
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                display: 'flex',
                                                                                gap: 8,
                                                                                alignItems: 'center',
                                                                                marginTop: 4
                                                                            },
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    style: {
                                                                                        fontSize: 11,
                                                                                        color: '#718096',
                                                                                        fontWeight: 600
                                                                                    },
                                                                                    children: [
                                                                                        inv.date,
                                                                                        " ",
                                                                                        inv.time || ''
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                                    lineNumber: 1125,
                                                                                    columnNumber: 65
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    style: {
                                                                                        fontSize: 10,
                                                                                        color: '#4B5563',
                                                                                        background: '#E5E7EB',
                                                                                        padding: '2px 6px',
                                                                                        borderRadius: 4,
                                                                                        fontWeight: 700
                                                                                    },
                                                                                    children: inv.partyName || 'Dining'
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                                    lineNumber: 1126,
                                                                                    columnNumber: 65
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                                            lineNumber: 1124,
                                                                            columnNumber: 61
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 1122,
                                                                    columnNumber: 57
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        textAlign: 'right'
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            style: {
                                                                                fontSize: 14,
                                                                                fontWeight: 900,
                                                                                color: '#1A202C',
                                                                                margin: 0
                                                                            },
                                                                            children: [
                                                                                "₹",
                                                                                inv.grandTotal.toLocaleString('en-IN')
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                                            lineNumber: 1132,
                                                                            columnNumber: 61
                                                                        }, this),
                                                                        inv.adjustmentAmount !== undefined && inv.adjustmentAmount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            style: {
                                                                                fontSize: 10,
                                                                                color: '#2F855A',
                                                                                fontWeight: 700
                                                                            },
                                                                            children: [
                                                                                "+₹",
                                                                                inv.adjustmentAmount,
                                                                                " tip"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                                            lineNumber: 1134,
                                                                            columnNumber: 65
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 1131,
                                                                    columnNumber: 57
                                                                }, this)
                                                            ]
                                                        }, inv.id, true, {
                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                            lineNumber: 1110,
                                                            columnNumber: 53
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                    lineNumber: 1100,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/reports/page.tsx",
                                            lineNumber: 1098,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "card",
                                    style: {
                                        padding: 40,
                                        textAlign: 'center',
                                        color: '#A0AEC0',
                                        fontWeight: 600
                                    },
                                    children: "Select a server from the leaderboard to view statistics and order history."
                                }, void 0, false, {
                                    fileName: "[project]/app/company/reports/page.tsx",
                                    lineNumber: 1143,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 1025,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/reports/page.tsx",
                        lineNumber: 963,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/reports/page.tsx",
                lineNumber: 441,
                columnNumber: 13
            }, this),
            showConsolidatedModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "modal-overlay",
                onClick: ()=>setShowConsolidatedModal(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modal-box",
                    onClick: (e)=>e.stopPropagation(),
                    style: {
                        maxWidth: 800,
                        maxHeight: '90vh',
                        display: 'flex',
                        flexDirection: 'column'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '18px 24px 14px',
                                borderBottom: '1px solid #E1E4E8',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexShrink: 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            style: {
                                                fontWeight: 900,
                                                fontSize: 18,
                                                color: '#1A1A2E',
                                                margin: 0
                                            },
                                            children: "📊 Consolidated Financial Reports (All Outlets)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/reports/page.tsx",
                                            lineNumber: 1156,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 11,
                                                color: '#718096',
                                                margin: '2px 0 0'
                                            },
                                            children: "Aggregated across all branches and head office"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/reports/page.tsx",
                                            lineNumber: 1157,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/reports/page.tsx",
                                    lineNumber: 1155,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowConsolidatedModal(false),
                                    className: "btn btn-ghost btn-icon",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/reports/page.tsx",
                                        lineNumber: 1159,
                                        columnNumber: 120
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/company/reports/page.tsx",
                                    lineNumber: 1159,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/reports/page.tsx",
                            lineNumber: 1154,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                overflowY: 'auto',
                                padding: '24px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 24
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                                        gap: 12
                                    },
                                    children: [
                                        {
                                            l: 'Consolidated Sales',
                                            v: `₹${consolidatedSales.toLocaleString('en-IN')}`,
                                            color: '#34A853'
                                        },
                                        {
                                            l: 'Consolidated Purchases',
                                            v: `₹${consolidatedPurchase.toLocaleString('en-IN')}`,
                                            color: '#4285F4'
                                        },
                                        {
                                            l: 'Consolidated Net Profit',
                                            v: `₹${consolidatedNetProfit.toLocaleString('en-IN')}`,
                                            color: consolidatedNetProfit >= 0 ? '#34A853' : '#EA4335'
                                        },
                                        {
                                            l: 'Consolidated Stock Value',
                                            v: `₹${consolidatedStockValue.toLocaleString('en-IN')}`,
                                            color: '#9333EA'
                                        }
                                    ].map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                background: '#F8FAFC',
                                                padding: 12,
                                                borderRadius: 10,
                                                border: '1px solid #E2E8F0'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 9,
                                                        fontWeight: 700,
                                                        color: '#A0AEC0',
                                                        textTransform: 'uppercase',
                                                        marginBottom: 4
                                                    },
                                                    children: k.l
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                    lineNumber: 1171,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 15,
                                                        fontWeight: 900,
                                                        color: k.color
                                                    },
                                                    children: k.v
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                    lineNumber: 1172,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, k.l, true, {
                                            fileName: "[project]/app/company/reports/page.tsx",
                                            lineNumber: 1170,
                                            columnNumber: 37
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/company/reports/page.tsx",
                                    lineNumber: 1163,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: 'white',
                                        border: '1px solid #E2E8F0',
                                        padding: 20,
                                        borderRadius: 12
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            style: {
                                                color: '#1E40AF',
                                                fontSize: 13,
                                                fontWeight: 900,
                                                textTransform: 'uppercase',
                                                marginBottom: 12,
                                                borderBottom: '1px solid #F1F5F9',
                                                paddingBottom: 6
                                            },
                                            children: "Consolidated Profit & Loss"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/reports/page.tsx",
                                            lineNumber: 1179,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FinancialRow, {
                                            label: "Total Billed Revenue (Sales)",
                                            amount: consolidatedSales
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/reports/page.tsx",
                                            lineNumber: 1180,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FinancialRow, {
                                            label: "Less: Cost of Goods Sold",
                                            amount: consolidatedPurchase - consolidatedStockValue,
                                            isSub: true
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/reports/page.tsx",
                                            lineNumber: 1181,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FinancialRow, {
                                            label: "Less: Total Operating Expenses",
                                            amount: consolidatedExpenses,
                                            isSub: true
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/reports/page.tsx",
                                            lineNumber: 1182,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                height: 12
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/reports/page.tsx",
                                            lineNumber: 1183,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                background: consolidatedNetProfit >= 0 ? '#F0FDF4' : '#FEF2F2',
                                                padding: '10px 14px',
                                                borderRadius: 8,
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                fontWeight: 900,
                                                fontSize: 14,
                                                color: consolidatedNetProfit >= 0 ? '#15803D' : '#B91C1C',
                                                border: `1px solid ${consolidatedNetProfit >= 0 ? '#BBF7D0' : '#FCA5A5'}`
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "CONSOLIDATED NET PROFIT"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                    lineNumber: 1185,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "₹",
                                                        consolidatedNetProfit.toLocaleString('en-IN')
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                    lineNumber: 1186,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/reports/page.tsx",
                                            lineNumber: 1184,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/reports/page.tsx",
                                    lineNumber: 1178,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: 'white',
                                        border: '1px solid #E2E8F0',
                                        padding: 20,
                                        borderRadius: 12
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            style: {
                                                color: '#1E40AF',
                                                fontSize: 13,
                                                fontWeight: 900,
                                                textTransform: 'uppercase',
                                                marginBottom: 12,
                                                borderBottom: '1px solid #F1F5F9',
                                                paddingBottom: 6
                                            },
                                            children: "Consolidated Balance Sheet Snapshot"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/reports/page.tsx",
                                            lineNumber: 1192,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'grid',
                                                gridTemplateColumns: '1fr 1fr',
                                                gap: 16
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: 11,
                                                                fontWeight: 800,
                                                                color: '#4A5568',
                                                                textTransform: 'uppercase',
                                                                marginBottom: 6
                                                            },
                                                            children: "Assets"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                            lineNumber: 1195,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: 12,
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                borderBottom: '1px solid #F1F5F9',
                                                                padding: '4px 0'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Cash & Bank"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 1197,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        "₹",
                                                                        Math.max(0, consolidatedNetProfit + 50000).toLocaleString('en-IN')
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 1198,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                            lineNumber: 1196,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: 12,
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                borderBottom: '1px solid #F1F5F9',
                                                                padding: '4px 0'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Closing Stock"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 1201,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        "₹",
                                                                        consolidatedStockValue.toLocaleString('en-IN')
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 1202,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                            lineNumber: 1200,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                    lineNumber: 1194,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: 11,
                                                                fontWeight: 800,
                                                                color: '#4A5568',
                                                                textTransform: 'uppercase',
                                                                marginBottom: 6
                                                            },
                                                            children: "Liabilities & Equity"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                            lineNumber: 1206,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: 12,
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                borderBottom: '1px solid #F1F5F9',
                                                                padding: '4px 0'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Equity"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 1208,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        "₹",
                                                                        (50000 + consolidatedNetProfit).toLocaleString('en-IN')
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 1209,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                            lineNumber: 1207,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: 12,
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                borderBottom: '1px solid #F1F5F9',
                                                                padding: '4px 0'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "GST Liability"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 1212,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        "₹",
                                                                        Math.max(0, consolidatedGstLiability).toLocaleString('en-IN')
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                                    lineNumber: 1213,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/reports/page.tsx",
                                                            lineNumber: 1211,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/reports/page.tsx",
                                                    lineNumber: 1205,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/reports/page.tsx",
                                            lineNumber: 1193,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/reports/page.tsx",
                                    lineNumber: 1191,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/reports/page.tsx",
                            lineNumber: 1161,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '14px 24px',
                                borderTop: '1px solid #E1E4E8',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                flexShrink: 0
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowConsolidatedModal(false),
                                className: "btn btn-outline",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/app/company/reports/page.tsx",
                                lineNumber: 1220,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/company/reports/page.tsx",
                            lineNumber: 1219,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/company/reports/page.tsx",
                    lineNumber: 1153,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/company/reports/page.tsx",
                lineNumber: 1152,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
                .reports-grid { grid-template-columns: 1fr !important; }
                @media (min-width: 768px) { .reports-grid { grid-template-columns: 1fr 1fr !important; } }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateX(-50%) translateY(4px); }
                    to { opacity: 1; transform: translateX(-50%) translateY(0); }
                }
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `
            }, void 0, false, {
                fileName: "[project]/app/company/reports/page.tsx",
                lineNumber: 1225,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=_479c0f8a._.js.map