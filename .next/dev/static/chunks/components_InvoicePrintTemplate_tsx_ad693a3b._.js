(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.ts [app-client] (ecmascript)");
;
;
;
;
;
const InvoicePrintTemplate = ({ invoice, company, copies = 1, previewMode = false, themeOverride })=>{
    if (!invoice) return null;
    const templates = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"].getState().templates;
    const activeTemplate = templates?.find((t)=>t.id === company?.templateId) || templates?.[0];
    const theme = themeOverride || company?.templateTheme || 'classic';
    const showColumns = company?.templateColumns || {
        sn: true,
        hsn: true,
        discount: true,
        tax: true,
        rate: true
    };
    const themeColor = company?.templateThemeColor || '';
    const showLogo = company?.templateColumns?.showLogo !== false;
    const showQrCode = (!!company?.bankDetails?.upiId || !!company?.bankDetails?.qrCodeUrl) && (company?.templateColumns?.showQrCode !== undefined ? company.templateColumns.showQrCode : activeTemplate ? activeTemplate.showQrCode : true // default to true if template showQrCode is not explicitly false
    );
    const labels = company?.customLabels || {};
    const upiLink = showQrCode && company?.bankDetails?.upiId ? `upi://pay?pa=${company.bankDetails.upiId}&pn=${encodeURIComponent(company.name)}&am=${invoice.grandTotal.toFixed(2)}&cu=INR` : null;
    const qrUrl = company?.bankDetails?.qrCodeUrl || (upiLink ? `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(upiLink)}` : null);
    let lTitle = labels.invoiceTitle || 'TAX INVOICE';
    let lNo = labels.invoiceNo || 'Invoice No';
    let lDate = labels.date || 'Date';
    let lDueDate = labels.dueDate || 'Due Date';
    if (invoice.invoiceType) {
        if (invoice.invoiceType === 'sale') {
            lTitle = labels.invoiceTitle || 'TAX INVOICE';
        } else {
            const typeLabels = {
                estimate: 'ESTIMATE',
                proforma: 'PROFORMA INVOICE',
                delivery_challan: 'DELIVERY CHALLAN',
                purchase: 'PURCHASE BILL',
                sale_return: 'CREDIT NOTE',
                purchase_return: 'DEBIT NOTE',
                credit_note: 'CREDIT NOTE',
                debit_note: 'DEBIT NOTE'
            };
            lTitle = typeLabels[invoice.invoiceType] || invoice.invoiceType.toUpperCase();
            const typeNoLabels = {
                estimate: 'Estimate No',
                proforma: 'Proforma No',
                delivery_challan: 'Challan No',
                purchase: 'Bill No',
                sale_return: 'Return No',
                purchase_return: 'Return No',
                credit_note: 'Note No',
                debit_note: 'Note No'
            };
            lNo = typeNoLabels[invoice.invoiceType] || 'No';
            const typeDateLabels = {
                estimate: 'Estimate Date',
                proforma: 'Proforma Date',
                delivery_challan: 'Challan Date',
                purchase: 'Bill Date',
                sale_return: 'Return Date',
                purchase_return: 'Return Date',
                credit_note: 'Note Date',
                debit_note: 'Note Date'
            };
            lDate = typeDateLabels[invoice.invoiceType] || 'Date';
            const typeDueDateLabels = {
                estimate: 'Validity Date',
                proforma: 'Validity Date'
            };
            lDueDate = typeDueDateLabels[invoice.invoiceType] || 'Due Date';
        }
    }
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
                                marginBottom: 12
                            },
                            children: defaultFooter
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 86,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/logo.png",
                            alt: "Edibio",
                            style: {
                                height: 120,
                                width: 'auto',
                                objectFit: 'contain',
                                display: 'block'
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 87,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 85,
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
                        lineNumber: 90,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 89,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 84,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    // Split payment display helper
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
    const PaymentMethodDisplay = ({ style })=>{
        if (invoice.splitPayments && invoice.splitPayments.length > 1) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: style,
                children: invoice.splitPayments.map((sp, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            display: 'inline-block',
                            marginRight: 6,
                            fontSize: 12,
                            fontWeight: 700
                        },
                        children: [
                            METHOD_ICONS[sp.method] || '💰',
                            " ",
                            sp.method.charAt(0).toUpperCase() + sp.method.slice(1),
                            " ₹",
                            sp.amount.toLocaleString('en-IN'),
                            i < invoice.splitPayments.length - 1 ? ' +' : ''
                        ]
                    }, i, true, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 102,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                lineNumber: 100,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0));
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            style: style,
            children: [
                METHOD_ICONS[invoice.paymentMethod] || '',
                " ",
                invoice.paymentMethod || 'Cash'
            ]
        }, void 0, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 110,
            columnNumber: 16
        }, ("TURBOPACK compile-time value", void 0));
    };
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
                                lineNumber: 120,
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
                                lineNumber: 121,
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
                                lineNumber: 122,
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
                                lineNumber: 123,
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
                                lineNumber: 124,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 119,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 118,
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
                                    lineNumber: 130,
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
                                    lineNumber: 131,
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
                                    lineNumber: 132,
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
                                    lineNumber: 133,
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
                                    lineNumber: 134,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, i, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 129,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 127,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 117,
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
                                lineNumber: 148,
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
                                lineNumber: 149,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 147,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 145,
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
                                    lineNumber: 155,
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
                                    lineNumber: 156,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 154,
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
                                            lineNumber: 161,
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
                                            lineNumber: 162,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 160,
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
                                            lineNumber: 165,
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
                                            lineNumber: 166,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 164,
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
                                    lineNumber: 171,
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
                                    lineNumber: 172,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 170,
                            columnNumber: 48
                        }, ("TURBOPACK compile-time value", void 0)),
                        invoice.pointsValueRedeemed > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: 8,
                                color: '#E53E3E',
                                fontWeight: 600
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Loyalty Redeem"
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 175,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "-₹",
                                        invoice.pointsValueRedeemed.toFixed(2)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 176,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 174,
                            columnNumber: 57
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
                                    lineNumber: 179,
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
                                    lineNumber: 180,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 178,
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
                            lineNumber: 182,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 153,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 144,
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
                        borderBottom: `2px solid ${themeColor || 'black'}`,
                        paddingBottom: 16,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    },
                    children: [
                        showLogo && (company?.logoUrl || company?.logo) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: company.logoUrl || company.logo,
                            alt: "Logo",
                            style: {
                                height: 60,
                                objectFit: 'contain',
                                marginBottom: 8
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 196,
                            columnNumber: 69
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            style: {
                                fontSize: 26,
                                fontWeight: 'bold',
                                margin: '0 0 8px 0',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                color: themeColor || 'black'
                            },
                            children: company?.name || 'Company Name'
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 197,
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
                            lineNumber: 198,
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
                            lineNumber: 199,
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
                            lineNumber: 200,
                            columnNumber: 40
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 195,
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
                            margin: 0,
                            color: themeColor || 'black'
                        },
                        children: lTitle
                    }, void 0, false, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 204,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 203,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 24,
                        fontSize: 12,
                        border: `1px solid ${themeColor || 'black'}`,
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
                                    lineNumber: 209,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        margin: '0 0 4px'
                                    },
                                    children: invoice.partyName || 'Cash Customer'
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 210,
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
                                    lineNumber: 211,
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
                                    lineNumber: 212,
                                    columnNumber: 48
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 208,
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
                                                    lineNumber: 217,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        textAlign: 'right'
                                                    },
                                                    children: invoice.invoiceNumber
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 217,
                                                    columnNumber: 116
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 217,
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
                                                    lineNumber: 218,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        textAlign: 'right'
                                                    },
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(invoice.date)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 218,
                                                    columnNumber: 118
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 218,
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
                                                    lineNumber: 219,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        textAlign: 'right'
                                                    },
                                                    children: invoice.paymentMethod || 'Cash'
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 219,
                                                    columnNumber: 121
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 219,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 216,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 215,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 214,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 207,
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
                                        lineNumber: 228,
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
                                        lineNumber: 229,
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
                                        lineNumber: 230,
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
                                        lineNumber: 231,
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
                                        lineNumber: 232,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 227,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 226,
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
                                            lineNumber: 238,
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
                                            lineNumber: 239,
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
                                            lineNumber: 240,
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
                                            lineNumber: 241,
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
                                            lineNumber: 242,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, i, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 237,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 235,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 225,
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
                                            lineNumber: 250,
                                            columnNumber: 106
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["amountInWords"])(invoice.grandTotal)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 250,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                qrUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: '6px',
                                        background: 'white',
                                        borderRadius: 8,
                                        border: '1.5px solid black',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        width: 'fit-content',
                                        margin: '12px 0 0'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: qrUrl,
                                            alt: "UPI QR Code",
                                            style: {
                                                width: 90,
                                                height: 90,
                                                marginBottom: 4
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 253,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 9,
                                                fontWeight: 'bold',
                                                color: 'black'
                                            },
                                            children: "SCAN TO PAY (UPI)"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 254,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 252,
                                    columnNumber: 25
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
                                            lineNumber: 258,
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
                                            lineNumber: 259,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 257,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 249,
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
                                                    lineNumber: 265,
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
                                                    lineNumber: 265,
                                                    columnNumber: 128
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 265,
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
                                                            lineNumber: 268,
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
                                                            lineNumber: 268,
                                                            columnNumber: 126
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 268,
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
                                                            lineNumber: 269,
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
                                                            lineNumber: 269,
                                                            columnNumber: 126
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 269,
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
                                                    lineNumber: 272,
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
                                                    lineNumber: 272,
                                                    columnNumber: 136
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 272,
                                            columnNumber: 56
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        invoice.pointsValueRedeemed > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '6px 8px',
                                                        border: '1px solid black',
                                                        color: '#DC2626',
                                                        fontWeight: 'bold'
                                                    },
                                                    children: "Loyalty Redeem"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 273,
                                                    columnNumber: 69
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '6px 8px',
                                                        border: '1px solid black',
                                                        textAlign: 'right',
                                                        color: '#DC2626',
                                                        fontWeight: 'bold'
                                                    },
                                                    children: [
                                                        "-₹",
                                                        invoice.pointsValueRedeemed.toFixed(2)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 273,
                                                    columnNumber: 188
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 273,
                                            columnNumber: 65
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
                                                    lineNumber: 274,
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
                                                    lineNumber: 274,
                                                    columnNumber: 145
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 274,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 264,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 263,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 262,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 248,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterBrand, {}, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 280,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, `classic-${copyIndex}`, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 194,
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
                            background: themeColor || '#1A202C',
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
                                lineNumber: 291,
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
                                lineNumber: 292,
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
                                lineNumber: 293,
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
                                lineNumber: 294,
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
                                lineNumber: 295,
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
                                lineNumber: 296,
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
                                lineNumber: 297,
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
                                                lineNumber: 298,
                                                columnNumber: 129
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true),
                                    invoice.billingAddress
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 298,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 290,
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
                                                    margin: '0 0 4px 0',
                                                    color: themeColor || '#1A202C'
                                                },
                                                children: company?.name || 'Your Company Name'
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 303,
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
                                                lineNumber: 304,
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
                                                lineNumber: 305,
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
                                                lineNumber: 306,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 302,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    showLogo && (company?.logoUrl || company?.logo) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: company.logoUrl || company.logo,
                                        alt: "Logo",
                                        style: {
                                            height: 50,
                                            objectFit: 'contain'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 308,
                                        columnNumber: 77
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 301,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontSize: 36,
                                    fontWeight: 900,
                                    margin: '10px 0 0',
                                    letterSpacing: '-1px',
                                    color: themeColor || '#1A202C'
                                },
                                children: lTitle
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 310,
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
                                lineNumber: 311,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: 'white',
                                    minHeight: 200,
                                    padding: '24px',
                                    borderRadius: 12,
                                    borderTop: `4px solid ${themeColor || '#1A202C'}`,
                                    overflowX: 'auto'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ItemsTableModern, {
                                        headerColor: "#F7FAFC",
                                        textColor: "#4A5568"
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 313,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TotalsBlock, {}, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 314,
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
                                            lineNumber: 316,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 315,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 312,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: 'auto',
                                    paddingTop: 40
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterBrand, {}, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 321,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 320,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 300,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                lineNumber: 289,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        }, `creative-${copyIndex}`, false, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 288,
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
                        background: themeColor || '#4285F4',
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
                                    lineNumber: 335,
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
                                            lineNumber: 336,
                                            columnNumber: 81
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 336,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 334,
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
                                            lineNumber: 340,
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
                                            lineNumber: 341,
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
                                            lineNumber: 342,
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
                                            lineNumber: 343,
                                            columnNumber: 48
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 339,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                showLogo && (company?.logoUrl || company?.logo) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: company.logoUrl || company.logo,
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
                                    lineNumber: 345,
                                    columnNumber: 73
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 338,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 333,
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
                                        color: themeColor || '#4285F4',
                                        textTransform: 'uppercase',
                                        marginBottom: 8,
                                        margin: 0
                                    },
                                    children: lBilledTo
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 351,
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
                                    lineNumber: 352,
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
                                    lineNumber: 353,
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
                                    lineNumber: 354,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 350,
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
                                                color: themeColor || '#4285F4',
                                                textTransform: 'uppercase',
                                                marginBottom: 8,
                                                margin: 0
                                            },
                                            children: lDate
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 358,
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
                                            lineNumber: 359,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 357,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 12,
                                                fontWeight: 800,
                                                color: themeColor || '#4285F4',
                                                textTransform: 'uppercase',
                                                marginBottom: 8,
                                                margin: 0
                                            },
                                            children: lPayment
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 362,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PaymentMethodDisplay, {
                                            style: {
                                                fontSize: 15,
                                                fontWeight: 700
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 363,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 361,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 356,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 349,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '0 40px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ItemsTableModern, {
                            headerColor: themeColor ? themeColor + '15' : '#E8F0FE',
                            textColor: themeColor || '#1967D2'
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 369,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TotalsBlock, {}, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 370,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginTop: 40,
                                padding: 24,
                                background: '#F8FAFC',
                                borderRadius: 8,
                                borderLeft: `4px solid ${themeColor || '#4285F4'}`
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 12,
                                        fontWeight: 800,
                                        color: themeColor || '#4285F4',
                                        margin: '0 0 8px 0'
                                    },
                                    children: "Terms & Remarks"
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 372,
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
                                    lineNumber: 373,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 371,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 368,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '0 40px',
                        marginTop: 'auto'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterBrand, {}, void 0, false, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 378,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 377,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, `modern-${copyIndex}`, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 332,
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
                        background: themeColor ? `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}CC 100%)` : 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
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
                                    showLogo && (company?.logoUrl || company?.logo) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: company.logoUrl || company.logo,
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
                                        lineNumber: 391,
                                        columnNumber: 77
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
                                                lineNumber: 393,
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
                                                lineNumber: 394,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 392,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 390,
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
                                        lineNumber: 398,
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
                                        lineNumber: 399,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 397,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 389,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 388,
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
                                                color: themeColor || '#FF6B6B',
                                                textTransform: 'uppercase',
                                                fontWeight: 800,
                                                margin: '0 0 8px 0'
                                            },
                                            children: lBilledTo
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 407,
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
                                            lineNumber: 408,
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
                                            lineNumber: 409,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 406,
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
                                                    lineNumber: 413,
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
                                                    lineNumber: 414,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 412,
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
                                                    lineNumber: 417,
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
                                                    lineNumber: 418,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 416,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 411,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 405,
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
                                    headerColor: themeColor ? themeColor + '15' : '#FFF5F5',
                                    textColor: themeColor || '#E53E3E'
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 424,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TotalsBlock, {}, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 425,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 423,
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
                                lineNumber: 429,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 428,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 404,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '0 40px',
                        marginTop: 'auto'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterBrand, {}, void 0, false, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 434,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 433,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, `waves-${copyIndex}`, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 387,
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
                        border: `1px solid ${themeColor || 'black'}`,
                        display: 'inline-block',
                        padding: '2px 8px',
                        position: 'absolute',
                        top: 40,
                        right: 40,
                        textTransform: 'uppercase',
                        color: themeColor || 'black'
                    },
                    children: printTitle
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 448,
                    columnNumber: 39
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        textAlign: 'center',
                        marginBottom: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    },
                    children: [
                        showLogo && (company?.logoUrl || company?.logo) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: company.logoUrl || company.logo,
                            alt: "Logo",
                            style: {
                                height: 50,
                                objectFit: 'contain',
                                marginBottom: 8
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 451,
                            columnNumber: 73
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            style: {
                                fontSize: 24,
                                fontWeight: 'bold',
                                margin: 0,
                                textTransform: 'uppercase',
                                color: themeColor || 'black'
                            },
                            children: company?.name || 'Your Company'
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 452,
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
                            lineNumber: 453,
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
                            lineNumber: 454,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 14,
                                fontWeight: 'bold',
                                margin: '8px 0 0',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                color: themeColor || 'black'
                            },
                            children: lTitle
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 455,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 450,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderTop: `2px solid ${themeColor || 'black'}`,
                        borderBottom: `2px solid ${themeColor || 'black'}`,
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
                                            lineNumber: 460,
                                            columnNumber: 28
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " ",
                                        invoice.partyName || 'Cash / Walk-in'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 460,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                invoice.partyPhone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "Phone: ",
                                        invoice.partyPhone
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 461,
                                    columnNumber: 48
                                }, ("TURBOPACK compile-time value", void 0)),
                                invoice.billingAddress && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "Address: ",
                                        invoice.billingAddress
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 462,
                                    columnNumber: 52
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 459,
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
                                            lineNumber: 465,
                                            columnNumber: 28
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " ",
                                        invoice.invoiceNumber
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 465,
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
                                            lineNumber: 466,
                                            columnNumber: 28
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " ",
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(invoice.date)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 466,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                invoice.stateOfSupply && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                            children: "State of Supply:"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 467,
                                            columnNumber: 54
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " ",
                                        invoice.stateOfSupply
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 467,
                                    columnNumber: 51
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 464,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 458,
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
                                    borderBottom: `1px solid ${themeColor || 'black'}`
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
                                        lineNumber: 474,
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
                                        lineNumber: 475,
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
                                        lineNumber: 476,
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
                                        lineNumber: 477,
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
                                        lineNumber: 478,
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
                                        lineNumber: 479,
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
                                        lineNumber: 480,
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
                                        lineNumber: 481,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 473,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 472,
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
                                            lineNumber: 487,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: '8px 4px'
                                            },
                                            children: item.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 488,
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
                                            lineNumber: 489,
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
                                            lineNumber: 490,
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
                                            lineNumber: 491,
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
                                            lineNumber: 492,
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
                                            lineNumber: 493,
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
                                            lineNumber: 494,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, i, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 486,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 484,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 471,
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
                                            lineNumber: 503,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                textAlign: 'right'
                                            },
                                            children: invoice.subTotal.toFixed(2)
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 503,
                                            columnNumber: 52
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 503,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                invoice.totalDiscount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: "Discount:"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 504,
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
                                            lineNumber: 504,
                                            columnNumber: 81
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 504,
                                    columnNumber: 59
                                }, ("TURBOPACK compile-time value", void 0)),
                                invoice.totalGst > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: "GST:"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 505,
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
                                            lineNumber: 505,
                                            columnNumber: 71
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 505,
                                    columnNumber: 54
                                }, ("TURBOPACK compile-time value", void 0)),
                                invoice.roundOff !== 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: "Round Off:"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 506,
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
                                            lineNumber: 506,
                                            columnNumber: 79
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 506,
                                    columnNumber: 56
                                }, ("TURBOPACK compile-time value", void 0)),
                                invoice.pointsValueRedeemed > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                color: '#DC2626',
                                                fontWeight: 'bold'
                                            },
                                            children: "Loyalty Redeem:"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 507,
                                            columnNumber: 69
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                textAlign: 'right',
                                                color: '#DC2626',
                                                fontWeight: 'bold'
                                            },
                                            children: [
                                                "-",
                                                invoice.pointsValueRedeemed.toFixed(2)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 507,
                                            columnNumber: 142
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 507,
                                    columnNumber: 65
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
                                            lineNumber: 508,
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
                                            lineNumber: 508,
                                            columnNumber: 99
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 508,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 502,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 501,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 500,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: 40,
                        fontSize: 11,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                qrUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: '6px',
                                        background: 'white',
                                        borderRadius: 6,
                                        border: '1px solid black',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        width: 'fit-content',
                                        marginBottom: 12
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: qrUrl,
                                            alt: "UPI QR Code",
                                            style: {
                                                width: 85,
                                                height: 85,
                                                marginBottom: 4
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 517,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 8,
                                                fontWeight: 'bold',
                                                color: 'black'
                                            },
                                            children: "SCAN TO PAY (UPI)"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 518,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 516,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "Terms & Conditions:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 521,
                                        columnNumber: 28
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 521,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "1. Goods once sold will not be taken back."
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 522,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "2. Subject to local jurisdiction."
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 523,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 514,
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
                                    lineNumber: 526,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        marginTop: 40
                                    },
                                    children: "Authorized Signatory"
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 527,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 525,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 513,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                previewMode ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        height: 40
                    }
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 530,
                    columnNumber: 39
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, `quick_bill-${titleIndex}`, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 447,
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
                                        color: themeColor || '#718096'
                                    },
                                    children: lTitle
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 542,
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
                                    lineNumber: 543,
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
                                    lineNumber: 544,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 541,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'right'
                            },
                            children: [
                                showLogo && (company?.logoUrl || company?.logo) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: company.logoUrl || company.logo,
                                    alt: "Logo",
                                    style: {
                                        height: 40,
                                        objectFit: 'contain',
                                        marginBottom: 12
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 547,
                                    columnNumber: 73
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    style: {
                                        fontSize: 22,
                                        fontWeight: 800,
                                        margin: '0 0 12px 0',
                                        color: themeColor || '#1A202C'
                                    },
                                    children: company?.name
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 548,
                                    columnNumber: 21
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
                                    lineNumber: 549,
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
                                    lineNumber: 550,
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
                                    lineNumber: 551,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 546,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 540,
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
                                    color: themeColor || '#A0AEC0',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    marginBottom: 8
                                },
                                children: lBilledTo
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 557,
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
                                lineNumber: 558,
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
                                lineNumber: 559,
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
                                lineNumber: 560,
                                columnNumber: 48
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 556,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 555,
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
                                                lineNumber: 568,
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
                                                lineNumber: 569,
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
                                                lineNumber: 570,
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
                                                lineNumber: 571,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 567,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 566,
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
                                                    lineNumber: 577,
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
                                                    lineNumber: 578,
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
                                                    lineNumber: 579,
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
                                                    lineNumber: 580,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 576,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 574,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 565,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TotalsBlock, {}, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 585,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 564,
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
                            lineNumber: 589,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterBrand, {}, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 590,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 588,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, `minimalist-${copyIndex}`, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 539,
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
                                    lineNumber: 602,
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
                                    lineNumber: 603,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 601,
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
                            lineNumber: 605,
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
                            lineNumber: 605,
                            columnNumber: 169
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 600,
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
                                    lineNumber: 610,
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
                                    lineNumber: 611,
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
                                    lineNumber: 612,
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
                                    lineNumber: 613,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 609,
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
                                    lineNumber: 616,
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
                                    lineNumber: 617,
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
                                    lineNumber: 618,
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
                                    lineNumber: 619,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 615,
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
                        padding: '40px 50px',
                        flex: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ItemsTableModern, {
                            headerColor: "#FBD38D",
                            textColor: "#9C4221"
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 624,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TotalsBlock, {}, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 625,
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
                                lineNumber: 630,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterBrand, {}, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 631,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 629,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 628,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, copyIndex, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 599,
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
                                    lineNumber: 641,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 14,
                                        margin: 0,
                                        opacity: 0.8
                                    },
                                    children: [
                                        lNo === 'Invoice No' ? 'No.' : lNo,
                                        " ",
                                        invoice.invoiceNumber,
                                        " | ",
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(invoice.date)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 642,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 640,
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
                                    lineNumber: 645,
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
                                    lineNumber: 646,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 644,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 639,
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
                                        lineNumber: 652,
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
                                        lineNumber: 653,
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
                                        lineNumber: 654,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 651,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 650,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ItemsTableModern, {
                            headerColor: "#1F2937",
                            textColor: "#FFFFFF"
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 657,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TotalsBlock, {}, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 658,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 649,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '0 50px 40px'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterBrand, {}, void 0, false, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 661,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 660,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, copyIndex, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 638,
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
                color: themeColor || '#1E3A8A',
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
                        background: themeColor ? themeColor + '10' : '#EFF6FF',
                        padding: '50px',
                        borderBottom: `4px solid ${themeColor || '#3B82F6'}`,
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
                                        color: themeColor || '#1E40AF',
                                        margin: '0 0 8px 0'
                                    },
                                    children: lTitle
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 670,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'inline-block',
                                        background: themeColor || '#3B82F6',
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
                                    lineNumber: 671,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 669,
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
                                showLogo && (company?.logoUrl || company?.logo) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: company.logoUrl || company.logo,
                                    alt: "Logo",
                                    style: {
                                        height: 50,
                                        objectFit: 'contain'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 674,
                                    columnNumber: 73
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
                                                color: themeColor || '#1E40AF',
                                                margin: '0 0 4px 0'
                                            },
                                            children: company?.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 676,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 13,
                                                color: themeColor || '#60A5FA'
                                            },
                                            children: company?.phone
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 677,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 675,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 673,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 668,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '50px',
                        flex: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ItemsTableModern, {
                            headerColor: themeColor ? themeColor + '15' : '#DBEAFE',
                            textColor: themeColor || '#1E40AF'
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 682,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TotalsBlock, {}, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 683,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 681,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '0 50px 40px'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterBrand, {}, void 0, false, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 686,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 685,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, `vibrant-${copyIndex}`, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 667,
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
                            lineNumber: 694,
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
                            lineNumber: 695,
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
                            lineNumber: 696,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 14,
                                fontWeight: 'bold',
                                margin: '10px 0 0',
                                textTransform: 'uppercase'
                            },
                            children: [
                                "*** ",
                                lTitle,
                                " ***"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 697,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 693,
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
                                    lineNumber: 701,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "PH: ",
                                        invoice.partyPhone
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 702,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 700,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'right'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        lNo.toUpperCase(),
                                        ": ",
                                        invoice.invoiceNumber
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 705,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        lDate.toUpperCase(),
                                        ": ",
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(invoice.date)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 706,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 704,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 699,
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
                                        lineNumber: 712,
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
                                        lineNumber: 713,
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
                                        lineNumber: 714,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 711,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 710,
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
                                            lineNumber: 720,
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
                                            lineNumber: 721,
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
                                            lineNumber: 722,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, i, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 719,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 717,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 709,
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
                        lineNumber: 728,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 727,
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
                        lineNumber: 731,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 730,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, copyIndex, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 692,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    const pageSize = company?.templatePageSize || 'A4';
    const getPageSizeStyles = ()=>{
        switch(pageSize){
            case 'A5':
                return {
                    width: '148mm',
                    minHeight: '210mm',
                    padding: '20px',
                    fontSize: '11px'
                };
            case 'A6':
                return {
                    width: '105mm',
                    minHeight: '148mm',
                    padding: '12px',
                    fontSize: '9px'
                };
            case '3inch':
                return {
                    width: '80mm',
                    minHeight: 'auto',
                    padding: '8px',
                    fontSize: '10px'
                };
            case 'A4':
            default:
                return {
                    width: '210mm',
                    minHeight: '297mm',
                    padding: '40px',
                    fontSize: '13px'
                };
        }
    };
    const sizeConfig = getPageSizeStyles();
    const renderCopyRaw = (copyIndex)=>{
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
    const renderCopy = (copyIndex)=>{
        const element = renderCopyRaw(copyIndex);
        if (!element) return null;
        const mergedStyle = {
            ...element.props.style,
            maxWidth: sizeConfig.width,
            width: '100%',
            minHeight: sizeConfig.minHeight
        };
        if (pageSize === 'A5') {
            mergedStyle.padding = '20px';
        } else if (pageSize === 'A6') {
            mergedStyle.padding = '12px';
        } else if (pageSize === '3inch') {
            mergedStyle.padding = '8px';
        }
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].cloneElement(element, {
            style: mergedStyle,
            className: `${element.props.className || ''} page-size-${pageSize.toLowerCase()}`
        });
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
                                    lineNumber: 823,
                                    columnNumber: 38
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 24,
                                        fontWeight: 900
                                    },
                                    children: company?.name
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 823,
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
                                    lineNumber: 824,
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
                                                        lineNumber: 827,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: invoice.invoiceNumber
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                        lineNumber: 827,
                                                        columnNumber: 77
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 827,
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
                                                        lineNumber: 828,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(invoice.date)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                        lineNumber: 828,
                                                        columnNumber: 79
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 828,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 826,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 825,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 822,
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
                                    lineNumber: 833,
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
                                    lineNumber: 834,
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
                                    lineNumber: 835,
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
                                    lineNumber: 836,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 832,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 821,
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
                                                lineNumber: 844,
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
                                                lineNumber: 845,
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
                                                lineNumber: 846,
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
                                                lineNumber: 847,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 843,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 842,
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
                                                    lineNumber: 853,
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
                                                    lineNumber: 854,
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
                                                    lineNumber: 855,
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
                                                    lineNumber: 856,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 852,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 850,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 841,
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
                                            children: "Payment Method"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 864,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PaymentMethodDisplay, {
                                            style: {
                                                fontSize: 12,
                                                margin: '0 0 4px 0',
                                                display: 'block'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 865,
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
                                            lineNumber: 866,
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
                                            lineNumber: 867,
                                            columnNumber: 57
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 863,
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
                                                    lineNumber: 871,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: invoice.subTotal.toFixed(2)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 871,
                                                    columnNumber: 52
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 870,
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
                                                    lineNumber: 874,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: invoice.totalGst.toFixed(2)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 874,
                                                    columnNumber: 50
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 873,
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
                                                    lineNumber: 877,
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
                                                    lineNumber: 878,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 876,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 869,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 862,
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
                                            lineNumber: 887,
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
                                            lineNumber: 888,
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
                                            lineNumber: 889,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 886,
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
                                            lineNumber: 892,
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
                                            lineNumber: 893,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 891,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 885,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 840,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '0 50px 30px'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterBrand, {}, void 0, false, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 899,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 898,
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
                    lineNumber: 903,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, copyIndex, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 820,
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
                        background: themeColor || '#45C4A0',
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
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 16
                                },
                                children: [
                                    showLogo && (company?.logoUrl || company?.logo) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: company.logoUrl || company.logo,
                                        alt: "Logo",
                                        style: {
                                            height: 50,
                                            objectFit: 'contain',
                                            background: 'white',
                                            padding: 4,
                                            borderRadius: 8
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 912,
                                        columnNumber: 77
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 18,
                                                    fontWeight: 800,
                                                    marginBottom: 4
                                                },
                                                children: company?.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 914,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                style: {
                                                    fontSize: 40,
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
                                                lineNumber: 915,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 16,
                                                    fontWeight: 600
                                                },
                                                children: [
                                                    lNo === 'Invoice No' ? 'No.' : lNo,
                                                    " ",
                                                    invoice.invoiceNumber
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 916,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 913,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 911,
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
                                        children: [
                                            lDate,
                                            ":"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 920,
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
                                        lineNumber: 921,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 919,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 910,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 909,
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
                                                color: themeColor || '#45C4A0',
                                                textTransform: 'uppercase',
                                                marginBottom: 8
                                            },
                                            children: [
                                                lBilledTo,
                                                ":"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 929,
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
                                            lineNumber: 930,
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
                                                    lineNumber: 931,
                                                    columnNumber: 113
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                " ",
                                                invoice.partyPhone || '-'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 931,
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
                                                    lineNumber: 932,
                                                    columnNumber: 96
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                " ",
                                                invoice.billingAddress || '-'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 932,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 928,
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
                                                color: themeColor || '#45C4A0',
                                                textTransform: 'uppercase',
                                                marginBottom: 8
                                            },
                                            children: "Payment Info:"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 935,
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
                                            lineNumber: 936,
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
                                                    lineNumber: 937,
                                                    columnNumber: 145
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                " ",
                                                company.bankDetails.upiId
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 937,
                                            columnNumber: 57
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                background: themeColor ? themeColor + '15' : '#E8F6F3',
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
                                                        color: themeColor || '#45C4A0',
                                                        marginRight: 10
                                                    },
                                                    children: "Amount Due:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 940,
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
                                                    lineNumber: 941,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 939,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 934,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 927,
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
                                                    background: themeColor || '#45C4A0',
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
                                                        lineNumber: 950,
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
                                                        lineNumber: 951,
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
                                                        lineNumber: 952,
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
                                                        lineNumber: 953,
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
                                                        lineNumber: 954,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 949,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 948,
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
                                                            lineNumber: 960,
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
                                                            lineNumber: 961,
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
                                                            lineNumber: 962,
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
                                                            lineNumber: 963,
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
                                                            lineNumber: 964,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 959,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 957,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 947,
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
                                            background: themeColor || '#45C4A0',
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
                                                lineNumber: 971,
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
                                                lineNumber: 972,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 970,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 969,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 946,
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
                                        background: themeColor || '#45C4A0',
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
                                            lineNumber: 979,
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
                                            lineNumber: 980,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 978,
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
                                            lineNumber: 983,
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
                                            lineNumber: 984,
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
                                            lineNumber: 985,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 982,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 977,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 926,
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
                        lineNumber: 991,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 990,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        height: 20,
                        background: themeColor || '#45C4A0',
                        width: '100%'
                    }
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 993,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, `sea_green-${copyIndex}`, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 908,
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
                                showLogo && (company?.logoUrl || company?.logo) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: company.logoUrl || company.logo,
                                    alt: "Logo",
                                    style: {
                                        height: 60,
                                        marginBottom: 10,
                                        objectFit: 'contain'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 1001,
                                    columnNumber: 73
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    style: {
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        margin: '0 0 10px 0',
                                        color: themeColor || 'black'
                                    },
                                    children: company?.name || '[Company Name]'
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 1002,
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
                                    lineNumber: 1003,
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
                                    lineNumber: 1004,
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
                                    lineNumber: 1005,
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
                                    lineNumber: 1006,
                                    columnNumber: 44
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 1000,
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
                                        color: themeColor || '#1F2937',
                                        margin: '0 0 20px 0',
                                        letterSpacing: '1px'
                                    },
                                    children: lTitle
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 1009,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    style: {
                                        borderCollapse: 'collapse',
                                        fontSize: 12,
                                        float: 'right',
                                        width: 250,
                                        border: `1px solid ${themeColor || 'black'}`
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        style: {
                                                            border: `1px solid ${themeColor || 'black'}`,
                                                            padding: '6px',
                                                            fontWeight: 'bold',
                                                            background: themeColor ? themeColor + '20' : '#E5E7EB',
                                                            width: '50%',
                                                            color: themeColor || 'black'
                                                        },
                                                        children: [
                                                            lNo,
                                                            " #"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                        lineNumber: 1013,
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
                                                        lineNumber: 1014,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 1012,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        style: {
                                                            border: `1px solid ${themeColor || 'black'}`,
                                                            padding: '6px',
                                                            fontWeight: 'bold',
                                                            background: themeColor ? themeColor + '20' : '#E5E7EB',
                                                            color: themeColor || 'black'
                                                        },
                                                        children: "DATE"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                        lineNumber: 1017,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        style: {
                                                            border: `1px solid ${themeColor || 'black'}`,
                                                            padding: '6px',
                                                            textAlign: 'center'
                                                        },
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(invoice.date)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                        lineNumber: 1018,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 1016,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        style: {
                                                            border: `1px solid ${themeColor || 'black'}`,
                                                            padding: '6px',
                                                            fontWeight: 'bold',
                                                            background: themeColor ? themeColor + '20' : '#E5E7EB',
                                                            color: themeColor || 'black'
                                                        },
                                                        children: "CUSTOMER ID"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                        lineNumber: 1021,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        style: {
                                                            border: `1px solid ${themeColor || 'black'}`,
                                                            padding: '6px',
                                                            textAlign: 'center'
                                                        },
                                                        children: invoice.partyId || 'CASH'
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                        lineNumber: 1022,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 1020,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        style: {
                                                            border: `1px solid ${themeColor || 'black'}`,
                                                            padding: '6px',
                                                            fontWeight: 'bold',
                                                            background: themeColor ? themeColor + '20' : '#E5E7EB',
                                                            color: themeColor || 'black'
                                                        },
                                                        children: "VALID UNTIL"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                        lineNumber: 1025,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        style: {
                                                            border: `1px solid ${themeColor || 'black'}`,
                                                            padding: '6px',
                                                            textAlign: 'center'
                                                        },
                                                        children: invoice.dueDate ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(invoice.dueDate) : '-'
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                        lineNumber: 1026,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 1024,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 1011,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 1010,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 1008,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 999,
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
                                        background: themeColor ? themeColor + '20' : '#E5E7EB',
                                        padding: '6px 10px',
                                        fontWeight: 'bold',
                                        border: `1px solid ${themeColor || 'black'}`,
                                        borderBottom: 'none',
                                        fontSize: 12,
                                        color: themeColor || 'black'
                                    },
                                    children: "CUSTOMER INFO"
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 1035,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        border: `1px solid ${themeColor || 'black'}`,
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
                                            lineNumber: 1037,
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
                                            lineNumber: 1038,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                margin: '0 0 4px'
                                            },
                                            children: invoice.billingAddress || '[Address]'
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 1039,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 1036,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 1034,
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
                                lineNumber: 1043,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 1042,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 1033,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                invoice.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: 30
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                background: themeColor ? themeColor + '20' : '#E5E7EB',
                                padding: '6px 10px',
                                fontWeight: 'bold',
                                border: `1px solid ${themeColor || 'black'}`,
                                borderBottom: 'none',
                                fontSize: 12,
                                color: themeColor || 'black'
                            },
                            children: "DESCRIPTION OF WORK / NOTES"
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 1051,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                border: `1px solid ${themeColor || 'black'}`,
                                padding: '10px',
                                fontSize: 12,
                                minHeight: 60,
                                whiteSpace: 'pre-wrap'
                            },
                            children: invoice.notes
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 1052,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 1050,
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
                            border: `1px solid ${themeColor || 'black'}`
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    style: {
                                        background: themeColor ? themeColor + '20' : '#E5E7EB',
                                        color: themeColor || 'black'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            style: {
                                                border: `1px solid ${themeColor || 'black'}`,
                                                padding: '8px 10px',
                                                textAlign: 'left'
                                            },
                                            children: "ITEMIZED COSTS"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 1062,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            style: {
                                                border: `1px solid ${themeColor || 'black'}`,
                                                padding: '8px 10px',
                                                textAlign: 'center',
                                                width: '10%'
                                            },
                                            children: "QTY"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 1063,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            style: {
                                                border: `1px solid ${themeColor || 'black'}`,
                                                padding: '8px 10px',
                                                textAlign: 'right',
                                                width: '15%'
                                            },
                                            children: "UNIT PRICE"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 1064,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            style: {
                                                border: `1px solid ${themeColor || 'black'}`,
                                                padding: '8px 10px',
                                                textAlign: 'right',
                                                width: '15%'
                                            },
                                            children: "AMOUNT"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 1065,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 1061,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 1060,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: [
                                    invoice.items.map((it, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        border: `1px solid ${themeColor || 'black'}`,
                                                        borderBottom: 'none',
                                                        borderTop: 'none',
                                                        padding: '6px 10px'
                                                    },
                                                    children: it.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 1071,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        border: `1px solid ${themeColor || 'black'}`,
                                                        borderBottom: 'none',
                                                        borderTop: 'none',
                                                        padding: '6px 10px',
                                                        textAlign: 'center'
                                                    },
                                                    children: it.qty
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 1072,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        border: `1px solid ${themeColor || 'black'}`,
                                                        borderBottom: 'none',
                                                        borderTop: 'none',
                                                        padding: '6px 10px',
                                                        textAlign: 'right'
                                                    },
                                                    children: it.rate.toFixed(2)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 1073,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        border: `1px solid ${themeColor || 'black'}`,
                                                        borderBottom: 'none',
                                                        borderTop: 'none',
                                                        padding: '6px 10px',
                                                        textAlign: 'right'
                                                    },
                                                    children: it.amount.toFixed(2)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 1074,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 1070,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))),
                                    Array.from({
                                        length: Math.max(0, 10 - invoice.items.length)
                                    }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        borderLeft: `1px solid ${themeColor || 'black'}`,
                                                        borderRight: `1px solid ${themeColor || 'black'}`,
                                                        padding: '12px'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 1080,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        borderLeft: `1px solid ${themeColor || 'black'}`,
                                                        borderRight: `1px solid ${themeColor || 'black'}`,
                                                        padding: '12px'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 1081,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        borderLeft: `1px solid ${themeColor || 'black'}`,
                                                        borderRight: `1px solid ${themeColor || 'black'}`,
                                                        padding: '12px'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 1082,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        borderLeft: `1px solid ${themeColor || 'black'}`,
                                                        borderRight: `1px solid ${themeColor || 'black'}`,
                                                        padding: '12px'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                    lineNumber: 1083,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, 'empty-' + i, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 1079,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 1068,
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
                                                    border: `1px solid ${themeColor || 'black'}`,
                                                    padding: '10px',
                                                    textAlign: 'center',
                                                    fontStyle: 'italic',
                                                    fontSize: 13,
                                                    verticalAlign: 'middle'
                                                },
                                                children: "Thank you for your business!"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 1089,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    border: `1px solid ${themeColor || 'black'}`,
                                                    padding: '8px 10px',
                                                    fontWeight: 'bold'
                                                },
                                                children: "SUBTOTAL"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 1092,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    border: `1px solid ${themeColor || 'black'}`,
                                                    padding: '8px 10px',
                                                    textAlign: 'right',
                                                    fontWeight: 'bold'
                                                },
                                                children: invoice.subTotal.toFixed(2)
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 1093,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 1088,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    border: `1px solid ${themeColor || 'black'}`,
                                                    padding: '8px 10px',
                                                    fontWeight: 'bold',
                                                    background: themeColor ? themeColor + '20' : '#E5E7EB',
                                                    color: themeColor || 'black'
                                                },
                                                children: "CGST / SGST"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 1096,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    border: `1px solid ${themeColor || 'black'}`,
                                                    padding: '8px 10px',
                                                    textAlign: 'right',
                                                    background: themeColor ? themeColor + '20' : '#E5E7EB'
                                                },
                                                children: invoice.totalGst.toFixed(2)
                                            }, void 0, false, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 1097,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 1095,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    border: `1px solid ${themeColor || 'black'}`,
                                                    padding: '10px',
                                                    fontWeight: 'bold',
                                                    fontSize: 14,
                                                    color: themeColor || 'black'
                                                },
                                                children: [
                                                    "TOTAL ",
                                                    lTitle
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 1100,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    border: `1px solid ${themeColor || 'black'}`,
                                                    padding: '10px',
                                                    textAlign: 'right',
                                                    fontWeight: 'bold',
                                                    fontSize: 14,
                                                    color: themeColor || 'black'
                                                },
                                                children: [
                                                    "₹",
                                                    invoice.grandTotal.toLocaleString('en-IN')
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                                lineNumber: 1101,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 1099,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 1087,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 1059,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 1058,
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
                            lineNumber: 1108,
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
                            lineNumber: 1109,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            style: {
                                width: '100%',
                                borderCollapse: 'collapse',
                                border: `1px solid ${themeColor || 'black'}`
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                border: `1px solid ${themeColor || 'black'}`,
                                                height: 40,
                                                width: '40%',
                                                verticalAlign: 'bottom',
                                                padding: 4
                                            },
                                            children: "Signature"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 1113,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                border: `1px solid ${themeColor || 'black'}`,
                                                height: 40,
                                                width: '40%',
                                                verticalAlign: 'bottom',
                                                padding: 4
                                            },
                                            children: "Printed Name"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 1114,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                border: `1px solid ${themeColor || 'black'}`,
                                                height: 40,
                                                width: '20%',
                                                verticalAlign: 'bottom',
                                                padding: 4
                                            },
                                            children: "Date"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 1115,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 1112,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 1111,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 1110,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 1107,
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
                                    lineNumber: 1123,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/logo.png",
                                    alt: "Edibio",
                                    style: {
                                        height: 44,
                                        width: 'auto',
                                        objectFit: 'contain',
                                        display: 'block'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 1124,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 1122,
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
                                lineNumber: 1127,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 1126,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 1121,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, `formal_quote-${copyIndex}`, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 998,
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
                                        lineNumber: 1139,
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
                                        lineNumber: 1140,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 1138,
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
                                        lineNumber: 1143,
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
                                        lineNumber: 1144,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 1142,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                        lineNumber: 1137,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 1136,
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
                                            lineNumber: 1151,
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
                                            lineNumber: 1152,
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
                                            lineNumber: 1153,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 1150,
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
                                            lineNumber: 1156,
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
                                                    lineNumber: 1157,
                                                    columnNumber: 79
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 1157,
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
                                            lineNumber: 1158,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 1155,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 1149,
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
                                                lineNumber: 1164,
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
                                                lineNumber: 1165,
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
                                                lineNumber: 1166,
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
                                                lineNumber: 1167,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 1163,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 1162,
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
                                                    lineNumber: 1173,
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
                                                    lineNumber: 1174,
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
                                                    lineNumber: 1175,
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
                                                    lineNumber: 1176,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                            lineNumber: 1172,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                    lineNumber: 1170,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 1161,
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
                                                lineNumber: 1184,
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
                                                lineNumber: 1185,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 1183,
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
                                                lineNumber: 1188,
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
                                                lineNumber: 1189,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                        lineNumber: 1187,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                                lineNumber: 1182,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 1181,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 1148,
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
                            lineNumber: 1195,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterBrand, {}, void 0, false, {
                            fileName: "[project]/components/InvoicePrintTemplate.tsx",
                            lineNumber: 1196,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 1194,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, copyIndex, true, {
            fileName: "[project]/components/InvoicePrintTemplate.tsx",
            lineNumber: 1135,
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
                            lineNumber: 1206,
                            columnNumber: 40
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, `${theme}-${i}`, true, {
                    fileName: "[project]/components/InvoicePrintTemplate.tsx",
                    lineNumber: 1204,
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
                   @page {
                      size: ${pageSize === '3inch' ? '80mm auto' : pageSize};
                      margin: 0;
                   }
                   body {
                      margin: 0;
                      padding: 0;
                   }
                }
                
                /* Size overrides */
                .page-size-a5, .page-size-a5 * {
                    font-size: 11px !important;
                }
                .page-size-a5 td, .page-size-a5 th {
                    padding: 8px 6px !important;
                }
                .page-size-a5 h1, .page-size-a5 h1 * {
                    font-size: 24px !important;
                }
                .page-size-a5 h2, .page-size-a5 h2 * {
                    font-size: 18px !important;
                }
                .page-size-a5 h3, .page-size-a5 h3 * {
                    font-size: 14px !important;
                }
                .page-size-a5 .theme-container, .page-size-a5 [style*="padding: 50px"], .page-size-a5 [style*="padding: 40px"] {
                    padding: 20px !important;
                }
                
                .page-size-a6, .page-size-a6 * {
                    font-size: 9px !important;
                }
                .page-size-a6 td, .page-size-a6 th {
                    padding: 4px 2px !important;
                }
                .page-size-a6 h1, .page-size-a6 h1 * {
                    font-size: 16px !important;
                }
                .page-size-a6 h2, .page-size-a6 h2 * {
                    font-size: 13px !important;
                }
                .page-size-a6 h3, .page-size-a6 h3 * {
                    font-size: 11px !important;
                }
                .page-size-a6 img, .page-size-a6 svg {
                    max-height: 40px !important;
                }
                .page-size-a6 .theme-container, .page-size-a6 [style*="padding: 50px"], .page-size-a6 [style*="padding: 40px"], .page-size-a6 [style*="padding: 30px"] {
                    padding: 10px !important;
                }
                
                .page-size-3inch, .page-size-3inch * {
                    font-size: 10px !important;
                    font-family: monospace !important;
                }
                .page-size-3inch td, .page-size-3inch th {
                    padding: 4px 2px !important;
                }
                .page-size-3inch h1, .page-size-3inch h1 * {
                    font-size: 14px !important;
                }
                .page-size-3inch h2, .page-size-3inch h2 * {
                    font-size: 12px !important;
                }
                .page-size-3inch h3, .page-size-3inch h3 * {
                    font-size: 11px !important;
                }
                .page-size-3inch img, .page-size-3inch svg {
                    max-height: 35px !important;
                }
                .page-size-3inch .creative-layout, .page-size-3inch .elegant-layout, .page-size-3inch .modern-layout {
                    flex-direction: column !important;
                }
                .page-size-3inch .creative-sidebar {
                    width: 100% !important;
                    padding: 10px !important;
                    margin-bottom: 10px !important;
                }
                .page-size-3inch .theme-container, .page-size-3inch [style*="padding: 50px"], .page-size-3inch [style*="padding: 40px"], .page-size-3inch [style*="padding: 30px"], .page-size-3inch [style*="padding: 20px"] {
                    padding: 6px !important;
                }
            `
            }, void 0, false, {
                fileName: "[project]/components/InvoicePrintTemplate.tsx",
                lineNumber: 1210,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/InvoicePrintTemplate.tsx",
        lineNumber: 1202,
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
]);

//# sourceMappingURL=components_InvoicePrintTemplate_tsx_ad693a3b._.js.map