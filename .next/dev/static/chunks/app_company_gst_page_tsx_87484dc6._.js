(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/company/gst/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GstSuitePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$percent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Percent$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/percent.js [app-client] (ecmascript) <export default as Percent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-alert.js [app-client] (ecmascript) <export default as ShieldAlert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coins$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coins$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/coins.js [app-client] (ecmascript) <export default as Coins>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/truck.js [app-client] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layers.js [app-client] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$braces$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileJson$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-braces.js [app-client] (ecmascript) <export default as FileJson>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function GstSuitePage() {
    _s();
    const company = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActiveCompany"])();
    const { updateCompany } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const invoices = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"])('invoices') || [];
    const parties = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"])('parties') || [];
    const products = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"])('products') || [];
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('workflow');
    const tabScrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleTabWheel = (e)=>{
        const container = tabScrollRef.current;
        if (container) {
            container.scrollLeft += e.deltaY;
        }
    };
    const handleTabMouseDown = (e)=>{
        const container = tabScrollRef.current;
        if (!container) return;
        container.style.scrollBehavior = 'auto';
        const startX = e.pageX - container.offsetLeft;
        const scrollLeft = container.scrollLeft;
        const handleMouseMove = (moveEvent)=>{
            const x = moveEvent.pageX - container.offsetLeft;
            const walk = (x - startX) * 1.5;
            container.scrollLeft = scrollLeft - walk;
        };
        const handleMouseUp = ()=>{
            container.style.scrollBehavior = 'smooth';
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };
    // ─────────────────────────────────────────────────────────────────────────
    // State for interactive filing workflow
    // ─────────────────────────────────────────────────────────────────────────
    const [currentStep, setCurrentStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [workflowStatus, setWorkflowStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        1: 'pending',
        2: 'pending',
        3: 'pending',
        4: 'pending',
        5: 'pending',
        6: 'pending',
        7: 'pending',
        8: 'pending',
        9: 'pending',
        10: 'pending',
        11: 'pending',
        12: 'pending',
        13: 'pending',
        14: 'pending',
        15: 'pending',
        16: 'pending',
        17: 'pending',
        18: 'pending',
        19: 'pending'
    });
    // ─────────────────────────────────────────────────────────────────────────
    // GSTR-1 Computations
    // ─────────────────────────────────────────────────────────────────────────
    const gstr1Data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "GstSuitePage.useMemo[gstr1Data]": ()=>{
            const sales = invoices.filter({
                "GstSuitePage.useMemo[gstr1Data].sales": (i)=>i.invoiceType === 'sale'
            }["GstSuitePage.useMemo[gstr1Data].sales"]);
            const b2b = [];
            const b2cLarge = [];
            const b2cSmall = [];
            const creditDebitNotes = invoices.filter({
                "GstSuitePage.useMemo[gstr1Data].creditDebitNotes": (i)=>[
                        'sale_return',
                        'credit_note',
                        'debit_note'
                    ].includes(i.invoiceType)
            }["GstSuitePage.useMemo[gstr1Data].creditDebitNotes"]);
            sales.forEach({
                "GstSuitePage.useMemo[gstr1Data]": (inv)=>{
                    const party = parties.find({
                        "GstSuitePage.useMemo[gstr1Data].party": (p)=>p.id === inv.partyId || p.name === inv.partyName
                    }["GstSuitePage.useMemo[gstr1Data].party"]);
                    const gstin = party?.gstNumber || inv.gstin;
                    if (gstin && gstin.trim().length === 15) {
                        b2b.push(inv);
                    } else {
                        // Inter-state check (if invoice state is different from company state)
                        const isInterState = inv.state && company?.state && inv.state.toLowerCase() !== company.state.toLowerCase();
                        if (isInterState && inv.grandTotal > 250000) {
                            b2cLarge.push(inv);
                        } else {
                            b2cSmall.push(inv);
                        }
                    }
                }
            }["GstSuitePage.useMemo[gstr1Data]"]);
            // Compute HSN summary
            const hsnSummary = {};
            sales.forEach({
                "GstSuitePage.useMemo[gstr1Data]": (inv)=>{
                    (inv.items || []).forEach({
                        "GstSuitePage.useMemo[gstr1Data]": (item)=>{
                            const code = item.hsnCode || '9999';
                            if (!hsnSummary[code]) {
                                hsnSummary[code] = {
                                    code,
                                    qty: 0,
                                    value: 0,
                                    tax: 0
                                };
                            }
                            const qty = parseFloat(item.qty) || 0;
                            const amt = parseFloat(item.amount) || 0;
                            const gstRate = parseFloat(item.gstRate) || 0;
                            hsnSummary[code].qty += qty;
                            hsnSummary[code].value += amt;
                            hsnSummary[code].tax += amt * (gstRate / 100);
                        }
                    }["GstSuitePage.useMemo[gstr1Data]"]);
                }
            }["GstSuitePage.useMemo[gstr1Data]"]);
            return {
                b2b,
                b2cLarge,
                b2cSmall,
                creditDebitNotes,
                hsnSummary: Object.values(hsnSummary)
            };
        }
    }["GstSuitePage.useMemo[gstr1Data]"], [
        invoices,
        parties,
        company
    ]);
    // Validation Errors
    const validationErrors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "GstSuitePage.useMemo[validationErrors]": ()=>{
            const errors = [];
            const seenNumbers = new Set();
            invoices.forEach({
                "GstSuitePage.useMemo[validationErrors]": (inv)=>{
                    // Duplicate check
                    if (seenNumbers.has(inv.invoiceNumber)) {
                        errors.push({
                            id: `dup-${inv.id}`,
                            type: 'error',
                            title: 'Duplicate Invoice Number',
                            desc: `Invoice number "${inv.invoiceNumber}" is used multiple times.`,
                            invoiceNumber: inv.invoiceNumber
                        });
                    }
                    seenNumbers.add(inv.invoiceNumber);
                    // B2B missing GSTIN check
                    const party = parties.find({
                        "GstSuitePage.useMemo[validationErrors].party": (p)=>p.id === inv.partyId || p.name === inv.partyName
                    }["GstSuitePage.useMemo[validationErrors].party"]);
                    if (inv.invoiceType === 'sale' && party?.type === 'business' && (!party?.gstNumber || party.gstNumber.trim().length !== 15)) {
                        errors.push({
                            id: `gstin-${inv.id}`,
                            type: 'warning',
                            title: 'Missing or Invalid GSTIN',
                            desc: `Business customer "${party?.name}" does not have a valid 15-digit GSTIN.`,
                            invoiceNumber: inv.invoiceNumber
                        });
                    }
                    // HSN Validation
                    const hasMissingHsn = (inv.items || []).some({
                        "GstSuitePage.useMemo[validationErrors].hasMissingHsn": (item)=>!item.hsnCode
                    }["GstSuitePage.useMemo[validationErrors].hasMissingHsn"]);
                    if (hasMissingHsn) {
                        errors.push({
                            id: `hsn-${inv.id}`,
                            type: 'warning',
                            title: 'Missing HSN Code',
                            desc: `One or more items in invoice "${inv.invoiceNumber}" do not have an HSN code.`,
                            invoiceNumber: inv.invoiceNumber
                        });
                    }
                }
            }["GstSuitePage.useMemo[validationErrors]"]);
            return errors;
        }
    }["GstSuitePage.useMemo[validationErrors]"], [
        invoices,
        parties
    ]);
    // ─────────────────────────────────────────────────────────────────────────
    // GSTR-3B Computations
    // ─────────────────────────────────────────────────────────────────────────
    const gstr3bData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "GstSuitePage.useMemo[gstr3bData]": ()=>{
            const sales = invoices.filter({
                "GstSuitePage.useMemo[gstr3bData].sales": (i)=>i.invoiceType === 'sale'
            }["GstSuitePage.useMemo[gstr3bData].sales"]);
            const purchases = invoices.filter({
                "GstSuitePage.useMemo[gstr3bData].purchases": (i)=>i.invoiceType === 'purchase'
            }["GstSuitePage.useMemo[gstr3bData].purchases"]);
            const outwardTaxable = sales.reduce({
                "GstSuitePage.useMemo[gstr3bData].outwardTaxable": (sum, inv)=>sum + (inv.subTotal || 0)
            }["GstSuitePage.useMemo[gstr3bData].outwardTaxable"], 0);
            const outwardTax = sales.reduce({
                "GstSuitePage.useMemo[gstr3bData].outwardTax": (sum, inv)=>sum + (inv.totalGst || 0)
            }["GstSuitePage.useMemo[gstr3bData].outwardTax"], 0);
            const inwardTaxable = purchases.reduce({
                "GstSuitePage.useMemo[gstr3bData].inwardTaxable": (sum, inv)=>sum + (inv.subTotal || 0)
            }["GstSuitePage.useMemo[gstr3bData].inwardTaxable"], 0);
            const itcAvailable = purchases.reduce({
                "GstSuitePage.useMemo[gstr3bData].itcAvailable": (sum, inv)=>sum + (inv.totalGst || 0)
            }["GstSuitePage.useMemo[gstr3bData].itcAvailable"], 0);
            const netTaxLiability = Math.max(0, outwardTax - itcAvailable);
            return {
                outwardTaxable,
                outwardTax,
                inwardTaxable,
                itcAvailable,
                netTaxLiability,
                nilRated: 0,
                reverseCharge: 0,
                lateFee: 0,
                interest: 0
            };
        }
    }["GstSuitePage.useMemo[gstr3bData]"], [
        invoices
    ]);
    // ─────────────────────────────────────────────────────────────────────────
    // GSTR-2B Reconciliation simulation state
    // ─────────────────────────────────────────────────────────────────────────
    const [reconciledList, setReconciledList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [reconciledPercent, setReconciledPercent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [gstr2bImported, setGstr2bImported] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleImportGstr2b = ()=>{
        setGstr2bImported(true);
        // Simulate matching purchase bills with GSTR-2B data
        const purchaseBills = invoices.filter((i)=>i.invoiceType === 'purchase');
        let matchedCount = 0;
        const list = purchaseBills.map((bill, index)=>{
            let status = 'Matched';
            let notes = 'Fully matched with GSTR-2B portal record.';
            if (index % 5 === 1) {
                status = 'Partially Matched';
                notes = 'Mismatch in invoice date. Portal shows different date.';
            } else if (index % 5 === 2) {
                status = 'Missing';
                notes = 'Record not uploaded by supplier on portal.';
            } else if (index % 5 === 3) {
                status = 'Tax Mismatch';
                notes = 'Amount match but GST rates do not match portal rates.';
            } else {
                matchedCount++;
            }
            return {
                id: bill.id,
                invoiceNumber: bill.invoiceNumber,
                partyName: bill.partyName,
                date: bill.date,
                amount: bill.grandTotal,
                tax: bill.totalGst,
                status,
                notes
            };
        });
        // Add mock items that exist only on GSTR-2B portal (Unreconciled)
        list.push({
            id: 'mock-1',
            invoiceNumber: 'INV-2026-9908',
            partyName: 'Apex Distributors Ltd',
            date: '2026-06-10',
            amount: 45000,
            tax: 8100,
            status: 'Supplier Not Filed',
            notes: 'Invoice exists on your book but supplier has not uploaded.'
        });
        setReconciledList(list);
        setReconciledPercent(Math.round(matchedCount / Math.max(1, purchaseBills.length) * 100));
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('GSTR-2B data reconciled successfully!');
        setWorkflowStatus((prev)=>({
                ...prev,
                6: 'success'
            }));
    };
    // ─────────────────────────────────────────────────────────────────────────
    // GST Audit Settings
    // ─────────────────────────────────────────────────────────────────────────
    const auditLogs = company?.auditLogs || [];
    const [isPeriodLocked, setIsPeriodLocked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(company?.autoBackupEnabled || false);
    const [approvalRequired, setApprovalRequired] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(company?.kitchenDisplayEnabled || false);
    const handleLockToggle = ()=>{
        setIsPeriodLocked(!isPeriodLocked);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success(!isPeriodLocked ? 'Filing period locked! No modifications allowed.' : 'Filing period unlocked.');
    };
    const handleApprovalToggle = ()=>{
        setApprovalRequired(!approvalRequired);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success(!approvalRequired ? 'Approval workflow enabled for GST modifications.' : 'Approval workflow disabled.');
    };
    // ─────────────────────────────────────────────────────────────────────────
    // GST Payment Recording
    // ─────────────────────────────────────────────────────────────────────────
    const [challans, setChallans] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(company?.offers || []);
    const [payForm, setPayForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        cpin: '',
        cin: '',
        date: new Date().toISOString().slice(0, 10),
        cgst: '',
        sgst: '',
        igst: '',
        interest: '',
        lateFee: '',
        utr: '',
        bank: ''
    });
    const handleSavePayment = ()=>{
        if (!payForm.cpin || !payForm.cin || !payForm.utr) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('CPIN, CIN, and UTR reference number are required.');
            return;
        }
        const record = {
            id: Math.random().toString(36).substring(2),
            cpin: payForm.cpin,
            cin: payForm.cin,
            date: payForm.date,
            cgst: parseFloat(payForm.cgst) || 0,
            sgst: parseFloat(payForm.sgst) || 0,
            igst: parseFloat(payForm.igst) || 0,
            interest: parseFloat(payForm.interest) || 0,
            lateFee: parseFloat(payForm.lateFee) || 0,
            utr: payForm.utr,
            bank: payForm.bank || 'SBI Bank'
        };
        setChallans([
            record,
            ...challans
        ]);
        setPayForm({
            cpin: '',
            cin: '',
            date: new Date().toISOString().slice(0, 10),
            cgst: '',
            sgst: '',
            igst: '',
            interest: '',
            lateFee: '',
            utr: '',
            bank: ''
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('GST payment recorded successfully!');
        setWorkflowStatus((prev)=>({
                ...prev,
                14: 'success'
            }));
    };
    // ─────────────────────────────────────────────────────────────────────────
    // E-Invoice State
    // ─────────────────────────────────────────────────────────────────────────
    const b2bInvoices = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "GstSuitePage.useMemo[b2bInvoices]": ()=>{
            return invoices.filter({
                "GstSuitePage.useMemo[b2bInvoices]": (inv)=>{
                    const party = parties.find({
                        "GstSuitePage.useMemo[b2bInvoices].party": (p)=>p.id === inv.partyId || p.name === inv.partyName
                    }["GstSuitePage.useMemo[b2bInvoices].party"]);
                    return inv.invoiceType === 'sale' && party?.gstNumber && party.gstNumber.trim().length === 15;
                }
            }["GstSuitePage.useMemo[b2bInvoices]"]);
        }
    }["GstSuitePage.useMemo[b2bInvoices]"], [
        invoices,
        parties
    ]);
    const [eInvoiceStatus, setEInvoiceStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const handleGenerateIrn = (id)=>{
        const irn = Math.random().toString(36).substring(2, 10).toUpperCase() + Math.random().toString(36).substring(2, 10).toUpperCase() + 'IRN-VERIFIED';
        setEInvoiceStatus((prev)=>({
                ...prev,
                [id]: {
                    irn,
                    status: 'Generated',
                    qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(irn)}`
                }
            }));
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('IRN generated & E-Invoice validated successfully!');
    };
    const handleCancelIrn = (id)=>{
        setEInvoiceStatus((prev)=>({
                ...prev,
                [id]: {
                    ...prev[id] || {},
                    irn: prev[id]?.irn || '—',
                    status: 'Cancelled',
                    qrCode: ''
                }
            }));
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('E-Invoice IRN cancelled.');
    };
    // ─────────────────────────────────────────────────────────────────────────
    // E-Way Bill State
    // ─────────────────────────────────────────────────────────────────────────
    const [ewayForm, setEwayForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        invoiceId: '',
        vehicleNo: '',
        transporterId: '',
        distance: '150'
    });
    const [ewayBills, setEwayBills] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const handleGenerateEway = ()=>{
        if (!ewayForm.invoiceId || !ewayForm.vehicleNo) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Please select an invoice and enter the Vehicle Number.');
            return;
        }
        const num = 'EWAY-' + Math.floor(100000000000 + Math.random() * 900000000000);
        setEwayBills((prev)=>({
                ...prev,
                [ewayForm.invoiceId]: {
                    ewayBillNo: num,
                    vehicleNo: ewayForm.vehicleNo,
                    status: 'Active'
                }
            }));
        setEwayForm({
            invoiceId: '',
            vehicleNo: '',
            transporterId: '',
            distance: '150'
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('E-Way Bill generated successfully!');
        setWorkflowStatus((prev)=>({
                ...prev,
                12: 'success'
            }));
    };
    // ─────────────────────────────────────────────────────────────────────────
    // Workflow Step Executions
    // ─────────────────────────────────────────────────────────────────────────
    const runWorkflowStep = (step)=>{
        setCurrentStep(step);
        if (step === 1) {
            const hasCompanyGstin = !!company?.gstNumber;
            setWorkflowStatus((p)=>({
                    ...p,
                    1: hasCompanyGstin ? 'success' : 'warning'
                }));
            if (hasCompanyGstin) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Step 1: Company GSTIN is valid.');
            else __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Step 1 Warning: Missing company GSTIN in Business Profile.');
        } else if (step === 2) {
            const hasGstRates = products.some((p)=>p.gstRate !== undefined);
            setWorkflowStatus((p)=>({
                    ...p,
                    2: hasGstRates ? 'success' : 'warning'
                }));
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Step 2: Product tax configuration validated.');
        } else if (step === 3) {
            const errorsCount = validationErrors.filter((e)=>e.type === 'error').length;
            setWorkflowStatus((p)=>({
                    ...p,
                    3: errorsCount === 0 ? 'success' : 'warning'
                }));
            if (errorsCount === 0) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Step 3: All invoices validated with 0 errors.');
            else (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(`Step 3: Found ${errorsCount} validation errors to fix.`, {
                icon: '⚠️'
            });
        } else if (step === 15) {
            setWorkflowStatus((p)=>({
                    ...p,
                    15: 'success'
                }));
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Step 15: GST JSON return payload compiled successfully.');
        } else {
            setWorkflowStatus((p)=>({
                    ...p,
                    [step]: 'success'
                }));
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success(`Workflow Step ${step} completed successfully.`);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 20
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: 'linear-gradient(135deg, #0F9D58, #0B6623)',
                    borderRadius: 20,
                    padding: '24px 28px',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontSize: 24,
                                    fontWeight: 900,
                                    margin: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$percent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Percent$3e$__["Percent"], {
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/gst/page.tsx",
                                        lineNumber: 407,
                                        columnNumber: 25
                                    }, this),
                                    " GST Filing & Compliance Suite"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/gst/page.tsx",
                                lineNumber: 406,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    opacity: 0.8,
                                    fontSize: 13,
                                    marginTop: 4
                                },
                                children: "End-to-end GST prep, reconciliation, payments, e-invoicing and compliance auditor."
                            }, void 0, false, {
                                fileName: "[project]/app/company/gst/page.tsx",
                                lineNumber: 409,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/gst/page.tsx",
                        lineNumber: 405,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: 10
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                background: 'rgba(255,255,255,0.15)',
                                padding: '8px 16px',
                                borderRadius: 12,
                                textAlign: 'center'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 9,
                                        textTransform: 'uppercase',
                                        fontWeight: 800,
                                        opacity: 0.7
                                    },
                                    children: "Validation Errors"
                                }, void 0, false, {
                                    fileName: "[project]/app/company/gst/page.tsx",
                                    lineNumber: 413,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 18,
                                        fontWeight: 900
                                    },
                                    children: validationErrors.length
                                }, void 0, false, {
                                    fileName: "[project]/app/company/gst/page.tsx",
                                    lineNumber: 414,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/gst/page.tsx",
                            lineNumber: 412,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/company/gst/page.tsx",
                        lineNumber: 411,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/gst/page.tsx",
                lineNumber: 404,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: tabScrollRef,
                onWheel: handleTabWheel,
                onMouseDown: handleTabMouseDown,
                style: {
                    display: 'flex',
                    gap: 6,
                    overflowX: 'auto',
                    paddingBottom: 8,
                    cursor: 'grab',
                    userSelect: 'none'
                },
                className: "gst-tabs-container",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                        children: `
                    .gst-tabs-container::-webkit-scrollbar {
                        height: 5px;
                    }
                    .gst-tabs-container::-webkit-scrollbar-track {
                        background: #F1F5F9;
                        border-radius: 10px;
                    }
                    .gst-tabs-container::-webkit-scrollbar-thumb {
                        background: #CBD5E1;
                        border-radius: 10px;
                    }
                    .gst-tabs-container::-webkit-scrollbar-thumb:hover {
                        background: #94A3B8;
                    }
                `
                    }, void 0, false, {
                        fileName: "[project]/app/company/gst/page.tsx",
                        lineNumber: 434,
                        columnNumber: 17
                    }, this),
                    [
                        {
                            key: 'workflow',
                            label: '1. Filing Workflow',
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"]
                        },
                        {
                            key: 'gstr1',
                            label: '2. GSTR-1 Prep',
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
                        },
                        {
                            key: 'gstr3b',
                            label: '3. GSTR-3B Prep',
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coins$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coins$3e$__["Coins"]
                        },
                        {
                            key: 'gstr2b',
                            label: '4. GSTR-2B Reconcile',
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"]
                        },
                        {
                            key: 'einvoice',
                            label: '5. E-Invoice',
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"]
                        },
                        {
                            key: 'eway',
                            label: '6. E-Way Bill',
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"]
                        },
                        {
                            key: 'payments',
                            label: '7. Challan Payments',
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"]
                        },
                        {
                            key: 'audit',
                            label: '8. GST Audit Trail',
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"]
                        }
                    ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setActiveTab(t.key),
                            style: {
                                padding: '10px 16px',
                                borderRadius: 12,
                                border: '1.5px solid',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                whiteSpace: 'nowrap',
                                borderColor: activeTab === t.key ? '#0F9D58' : '#E2E8F0',
                                background: activeTab === t.key ? '#E6F4EA' : 'white',
                                color: activeTab === t.key ? '#0F9D58' : '#4A5568',
                                fontSize: 12,
                                fontWeight: 800,
                                cursor: 'pointer',
                                transition: 'all 0.15s'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(t.icon, {
                                    size: 14
                                }, void 0, false, {
                                    fileName: "[project]/app/company/gst/page.tsx",
                                    lineNumber: 468,
                                    columnNumber: 25
                                }, this),
                                t.label
                            ]
                        }, t.key, true, {
                            fileName: "[project]/app/company/gst/page.tsx",
                            lineNumber: 460,
                            columnNumber: 21
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/gst/page.tsx",
                lineNumber: 420,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card",
                style: {
                    padding: 24,
                    minHeight: 400
                },
                children: [
                    activeTab === 'workflow' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    fontSize: 18,
                                    fontWeight: 900,
                                    marginBottom: 12
                                },
                                children: "GST Filing Interactive Workflow"
                            }, void 0, false, {
                                fileName: "[project]/app/company/gst/page.tsx",
                                lineNumber: 482,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: '#718096',
                                    fontSize: 13,
                                    marginBottom: 24
                                },
                                children: "Follow the structured 19-step compliance journey to prepare, reconcile, validate, pay, and archive your company returns."
                            }, void 0, false, {
                                fileName: "[project]/app/company/gst/page.tsx",
                                lineNumber: 483,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 2fr',
                                    gap: 24
                                },
                                className: "workflow-grid-layout",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 8,
                                            maxHeight: 500,
                                            overflowY: 'auto',
                                            paddingRight: 10
                                        },
                                        className: "no-scrollbar",
                                        children: [
                                            {
                                                step: 1,
                                                name: 'Validate Company Details'
                                            },
                                            {
                                                step: 2,
                                                name: 'Validate GST Configuration'
                                            },
                                            {
                                                step: 3,
                                                name: 'Validate All Invoices'
                                            },
                                            {
                                                step: 4,
                                                name: 'Generate Sales Register'
                                            },
                                            {
                                                step: 5,
                                                name: 'Generate Purchase Register'
                                            },
                                            {
                                                step: 6,
                                                name: 'Reconcile Purchases with GSTR-2B'
                                            },
                                            {
                                                step: 7,
                                                name: 'Fix Validation Errors'
                                            },
                                            {
                                                step: 8,
                                                name: 'Generate GSTR-1 Preview'
                                            },
                                            {
                                                step: 9,
                                                name: 'Generate GSTR-3B Preview'
                                            },
                                            {
                                                step: 10,
                                                name: 'Calculate Tax Liability'
                                            },
                                            {
                                                step: 11,
                                                name: 'Adjust Input Tax Credit'
                                            },
                                            {
                                                step: 12,
                                                name: 'Calculate Net Tax Payable'
                                            },
                                            {
                                                step: 13,
                                                name: 'Generate Challan'
                                            },
                                            {
                                                step: 14,
                                                name: 'Record Payment'
                                            },
                                            {
                                                step: 15,
                                                name: 'Generate JSON'
                                            },
                                            {
                                                step: 16,
                                                name: 'Upload to GST Portal'
                                            },
                                            {
                                                step: 17,
                                                name: 'Mark Return as Filed'
                                            },
                                            {
                                                step: 18,
                                                name: 'Lock Filing Period'
                                            },
                                            {
                                                step: 19,
                                                name: 'Archive Return'
                                            }
                                        ].map((s)=>{
                                            const isActive = currentStep === s.step;
                                            const status = workflowStatus[s.step];
                                            const dotColor = status === 'success' ? '#0F9D58' : status === 'warning' ? '#D97706' : '#94A3B8';
                                            const dotBg = status === 'success' ? '#E6F4EA' : status === 'warning' ? '#FEF3C7' : '#F1F5F9';
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                onClick: ()=>setCurrentStep(s.step),
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 12,
                                                    padding: '10px 14px',
                                                    borderRadius: 10,
                                                    cursor: 'pointer',
                                                    background: isActive ? '#F0FDF4' : 'transparent',
                                                    border: isActive ? '1px solid #BBF7D0' : '1px solid transparent',
                                                    transition: 'all 0.15s'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            width: 24,
                                                            height: 24,
                                                            borderRadius: '50%',
                                                            background: dotBg,
                                                            color: dotColor,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontWeight: 800,
                                                            fontSize: 11
                                                        },
                                                        children: status === 'success' ? '✓' : s.step
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 522,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: 12,
                                                            fontWeight: isActive ? 800 : 500,
                                                            color: isActive ? '#0F9D58' : '#4A5568'
                                                        },
                                                        children: s.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 525,
                                                        columnNumber: 45
                                                    }, this),
                                                    isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                        size: 14,
                                                        style: {
                                                            marginLeft: 'auto'
                                                        },
                                                        color: "#0F9D58"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 526,
                                                        columnNumber: 58
                                                    }, this)
                                                ]
                                            }, s.step, true, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 515,
                                                columnNumber: 41
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/gst/page.tsx",
                                        lineNumber: 487,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: '#F8FAFC',
                                            padding: 24,
                                            borderRadius: 16,
                                            border: '1px solid #E2E8F0',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 16
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 8
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            background: '#E6F4EA',
                                                            color: '#0F9D58',
                                                            padding: '4px 10px',
                                                            borderRadius: 6,
                                                            fontSize: 10,
                                                            fontWeight: 900
                                                        },
                                                        children: [
                                                            "STEP ",
                                                            currentStep,
                                                            " OF 19"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 535,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            marginLeft: 'auto',
                                                            fontSize: 11,
                                                            color: '#94A3B8',
                                                            fontWeight: 700
                                                        },
                                                        children: [
                                                            "Status: ",
                                                            workflowStatus[currentStep].toUpperCase()
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 536,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 534,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                style: {
                                                    fontSize: 18,
                                                    fontWeight: 900,
                                                    color: '#1E293B',
                                                    marginTop: 4
                                                },
                                                children: [
                                                    'Validate Company Details',
                                                    'Validate GST Configuration',
                                                    'Validate All Invoices',
                                                    'Generate Sales Register',
                                                    'Generate Purchase Register',
                                                    'Reconcile Purchases with GSTR-2B',
                                                    'Fix Validation Errors',
                                                    'Generate GSTR-1 Preview',
                                                    'Generate GSTR-3B Preview',
                                                    'Calculate Tax Liability',
                                                    'Adjust Input Tax Credit',
                                                    'Calculate Net Tax Payable',
                                                    'Generate Challan',
                                                    'Record Payment',
                                                    'Generate JSON',
                                                    'Upload to GST Portal',
                                                    'Mark Return as Filed',
                                                    'Lock Filing Period',
                                                    'Archive Return'
                                                ][currentStep - 1]
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 538,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 13,
                                                    color: '#64748B',
                                                    lineHeight: 1.6
                                                },
                                                children: [
                                                    'Confirm that your business profile has a valid name, active GSTIN, registered address, and phone number verified for compliance.',
                                                    'Verify that the active tax settings have valid GST percentages (0%, 5%, 12%, 18%, 28%) and correct HSN codes set up across your active product inventory catalog.',
                                                    'Audit all invoices created during this period. Scan for validation errors such as missing customer GSTINs for B2B logs, duplicate invoice numbers, or CGST/SGST tax calculation discrepancies.',
                                                    'Generate and output the active Outward Sales register containing all sales invoices, debit/credit notes, exports, and tax summary tables.',
                                                    'Generate and output the active Inward Purchase register containing all purchase bills, debit/credit notes, import bills, and related asset logs.',
                                                    'Import GSTR-2B data from the portal and match purchase records. Track reconciliation discrepancies such as matched, supplier not filed, or amount differences.',
                                                    'Resolve warnings or invoice validation discrepancies. Fix missing HSN or tax differences prior to compiling json outputs.',
                                                    'Compile GSTR-1 return preview containing aggregated invoice totals categorized under B2B, B2C Large, B2C Small, and HSN summary.',
                                                    'Compile GSTR-3B return summary containing net outward taxable supplies, eligible Input Tax Credit (ITC), and calculated interest fees.',
                                                    'Calculate gross outward tax liability for CGST, SGST, and IGST based on the outward sales register.',
                                                    'Calculate total eligible Input Tax Credit (ITC) available and verify exclusions or reversals.',
                                                    'Determine net tax payable by matching gross tax liability against accumulated input tax credit (ITC ledger utilization).',
                                                    'Generate GST PMT-06 payment challan containing correct tax heads, interest liabilities, and late fees.',
                                                    'Record payment transaction reference UTR, CPIN, CIN numbers, mode, bank, and timestamp in ledger history.',
                                                    'Prepare and output the GSTR compliance return file in JSON format ready for portal upload.',
                                                    'Establish secure portal upload status and confirm draft status validation checks.',
                                                    'Finalize filing by inputting portal filing reference number and marking the return period as Filed.',
                                                    'Lock business periods. Prevent any post-filing modifications to invoices or credit notes to safeguard compliance integrity.',
                                                    'Generate audit trail package containing complete change logs, print templates, and final filing receipt to save to archives.'
                                                ][currentStep - 1]
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 549,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    borderTop: '1px solid #E2E8F0',
                                                    paddingTop: 20,
                                                    marginTop: 'auto',
                                                    display: 'flex',
                                                    gap: 10
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>runWorkflowStep(currentStep),
                                                        className: "btn btn-blue",
                                                        style: {
                                                            background: '#0F9D58',
                                                            border: 'none',
                                                            gap: 6
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                                size: 14
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 575,
                                                                columnNumber: 41
                                                            }, this),
                                                            " Execute Step"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 574,
                                                        columnNumber: 37
                                                    }, this),
                                                    currentStep < 19 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setCurrentStep((prev)=>prev + 1),
                                                        className: "btn btn-outline",
                                                        style: {
                                                            marginLeft: 'auto'
                                                        },
                                                        children: "Next Step →"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 578,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 573,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/gst/page.tsx",
                                        lineNumber: 533,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/gst/page.tsx",
                                lineNumber: 485,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/gst/page.tsx",
                        lineNumber: 481,
                        columnNumber: 21
                    }, this),
                    activeTab === 'gstr1' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: 20,
                                    flexWrap: 'wrap',
                                    gap: 12
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                style: {
                                                    fontSize: 18,
                                                    fontWeight: 900,
                                                    margin: 0
                                                },
                                                children: "GSTR-1 Sales Report"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 595,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    color: '#718096',
                                                    fontSize: 13,
                                                    marginTop: 2
                                                },
                                                children: "Categorized outward sales invoices and return registers."
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 596,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/gst/page.tsx",
                                        lineNumber: 594,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('GSTR-1 JSON generated and downloaded!');
                                        },
                                        className: "btn btn-blue",
                                        style: {
                                            gap: 6,
                                            background: '#0F9D58',
                                            border: 'none'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$braces$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileJson$3e$__["FileJson"], {
                                                size: 15
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 599,
                                                columnNumber: 33
                                            }, this),
                                            " Export GSTR-1 JSON"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/gst/page.tsx",
                                        lineNumber: 598,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/gst/page.tsx",
                                lineNumber: 593,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                    gap: 12,
                                    marginBottom: 24
                                },
                                children: [
                                    {
                                        label: 'B2B Invoices',
                                        count: gstr1Data.b2b.length,
                                        val: gstr1Data.b2b.reduce((s, i)=>s + i.grandTotal, 0)
                                    },
                                    {
                                        label: 'B2C Large',
                                        count: gstr1Data.b2cLarge.length,
                                        val: gstr1Data.b2cLarge.reduce((s, i)=>s + i.grandTotal, 0)
                                    },
                                    {
                                        label: 'B2C Small',
                                        count: gstr1Data.b2cSmall.length,
                                        val: gstr1Data.b2cSmall.reduce((s, i)=>s + i.grandTotal, 0)
                                    },
                                    {
                                        label: 'Credit/Debit Notes',
                                        count: gstr1Data.creditDebitNotes.length,
                                        val: gstr1Data.creditDebitNotes.reduce((s, i)=>s + i.grandTotal, 0)
                                    }
                                ].map((card)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: '#F8FAFC',
                                            padding: 16,
                                            borderRadius: 12,
                                            border: '1px solid #E2E8F0'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 11,
                                                    fontWeight: 800,
                                                    color: '#64748B',
                                                    textTransform: 'uppercase',
                                                    marginBottom: 6
                                                },
                                                children: card.label
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 612,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 20,
                                                    fontWeight: 900,
                                                    color: '#1A1A2E'
                                                },
                                                children: [
                                                    "₹",
                                                    card.val.toLocaleString('en-IN')
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 613,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 11,
                                                    color: '#0F9D58',
                                                    fontWeight: 700,
                                                    marginTop: 4
                                                },
                                                children: [
                                                    card.count,
                                                    " Invoices"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 614,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, card.label, true, {
                                        fileName: "[project]/app/company/gst/page.tsx",
                                        lineNumber: 611,
                                        columnNumber: 33
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/company/gst/page.tsx",
                                lineNumber: 604,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    fontSize: 15,
                                    fontWeight: 900,
                                    marginBottom: 12
                                },
                                children: "HSN/SAC Summary (Table 12)"
                            }, void 0, false, {
                                fileName: "[project]/app/company/gst/page.tsx",
                                lineNumber: 620,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    overflowX: 'auto',
                                    marginBottom: 24
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "e-table",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "HSN/SAC Code"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 625,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Total Quantity"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 626,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Taxable Value"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 627,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "GST Amount"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 628,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 624,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/gst/page.tsx",
                                            lineNumber: 623,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: gstr1Data.hsnSummary.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    colSpan: 4,
                                                    style: {
                                                        textAlign: 'center',
                                                        color: '#A0AEC0'
                                                    },
                                                    children: "No HSN details found."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                    lineNumber: 633,
                                                    columnNumber: 45
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 633,
                                                columnNumber: 41
                                            }, this) : gstr1Data.hsnSummary.map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                fontFamily: 'monospace',
                                                                fontWeight: 700
                                                            },
                                                            children: h.code
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 637,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: h.qty
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 638,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                fontWeight: 700
                                                            },
                                                            children: [
                                                                "₹",
                                                                h.value.toLocaleString('en-IN')
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 639,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                color: '#0F9D58',
                                                                fontWeight: 800
                                                            },
                                                            children: [
                                                                "₹",
                                                                h.tax.toLocaleString('en-IN')
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 640,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, h.code, true, {
                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                    lineNumber: 636,
                                                    columnNumber: 45
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/gst/page.tsx",
                                            lineNumber: 631,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/gst/page.tsx",
                                    lineNumber: 622,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/company/gst/page.tsx",
                                lineNumber: 621,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: '#FFFBEB',
                                    border: '1px solid #FDE68A',
                                    borderRadius: 16,
                                    padding: 20
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            fontSize: 15,
                                            fontWeight: 900,
                                            color: '#D97706',
                                            marginBottom: 12,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 6
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 651,
                                                columnNumber: 33
                                            }, this),
                                            " GSTR-1 Return Validation Audit"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/gst/page.tsx",
                                        lineNumber: 650,
                                        columnNumber: 29
                                    }, this),
                                    validationErrors.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            color: '#92400E',
                                            fontSize: 13
                                        },
                                        children: "✅ All invoices validated. Return is ready to upload with status code 0."
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/gst/page.tsx",
                                        lineNumber: 654,
                                        columnNumber: 33
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 8
                                        },
                                        children: validationErrors.map((err)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    gap: 10,
                                                    fontSize: 12,
                                                    color: '#92400E'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "⚠️"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 659,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: err.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 661,
                                                                columnNumber: 49
                                                            }, this),
                                                            " ",
                                                            err.invoiceNumber && `[Inv: ${err.invoiceNumber}]`,
                                                            ": ",
                                                            err.desc
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 660,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, err.id, true, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 658,
                                                columnNumber: 41
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/gst/page.tsx",
                                        lineNumber: 656,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/gst/page.tsx",
                                lineNumber: 649,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/gst/page.tsx",
                        lineNumber: 592,
                        columnNumber: 21
                    }, this),
                    activeTab === 'gstr3b' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: 20,
                                    flexWrap: 'wrap',
                                    gap: 12
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                style: {
                                                    fontSize: 18,
                                                    fontWeight: 900,
                                                    margin: 0
                                                },
                                                children: "GSTR-3B Summary Report"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 678,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    color: '#718096',
                                                    fontSize: 13,
                                                    marginTop: 2
                                                },
                                                children: "Summary calculation of outward supplies, eligible ITC, and net liability."
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 679,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/gst/page.tsx",
                                        lineNumber: 677,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('GSTR-3B JSON downloaded!');
                                        },
                                        className: "btn btn-blue",
                                        style: {
                                            gap: 6,
                                            background: '#0F9D58',
                                            border: 'none'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$braces$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileJson$3e$__["FileJson"], {
                                                size: 15
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 682,
                                                columnNumber: 33
                                            }, this),
                                            " Export GSTR-3B JSON"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/gst/page.tsx",
                                        lineNumber: 681,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/gst/page.tsx",
                                lineNumber: 676,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    overflowX: 'auto',
                                    marginBottom: 24
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "e-table",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Description"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 690,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Taxable Value"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 691,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Integrated Tax (IGST)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 692,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Central Tax (CGST)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 693,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "State Tax (SGST)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 694,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 689,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/gst/page.tsx",
                                            lineNumber: 688,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                fontWeight: 700
                                                            },
                                                            children: "3.1 Outward Taxable Supplies"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 699,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: [
                                                                "₹",
                                                                gstr3bData.outwardTaxable.toLocaleString('en-IN')
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 700,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 701,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: [
                                                                "₹",
                                                                (gstr3bData.outwardTax / 2).toLocaleString('en-IN')
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 702,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: [
                                                                "₹",
                                                                (gstr3bData.outwardTax / 2).toLocaleString('en-IN')
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 703,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                    lineNumber: 698,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                fontWeight: 700
                                                            },
                                                            children: "4. Eligible Input Tax Credit (ITC)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 706,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: [
                                                                "₹",
                                                                gstr3bData.inwardTaxable.toLocaleString('en-IN')
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 707,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 708,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: [
                                                                "₹",
                                                                (gstr3bData.itcAvailable / 2).toLocaleString('en-IN')
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 709,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: [
                                                                "₹",
                                                                (gstr3bData.itcAvailable / 2).toLocaleString('en-IN')
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 710,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                    lineNumber: 705,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    style: {
                                                        background: '#F8FAFC'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                fontWeight: 900
                                                            },
                                                            children: "Net Tax Payable / Liability"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 713,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                fontWeight: 800
                                                            },
                                                            children: "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 714,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 715,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                color: '#EA4335',
                                                                fontWeight: 900
                                                            },
                                                            children: [
                                                                "₹",
                                                                (gstr3bData.netTaxLiability / 2).toLocaleString('en-IN')
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 716,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                color: '#EA4335',
                                                                fontWeight: 900
                                                            },
                                                            children: [
                                                                "₹",
                                                                (gstr3bData.netTaxLiability / 2).toLocaleString('en-IN')
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 717,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                    lineNumber: 712,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/gst/page.tsx",
                                            lineNumber: 697,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/gst/page.tsx",
                                    lineNumber: 687,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/company/gst/page.tsx",
                                lineNumber: 686,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: '#E6F4EA',
                                    border: '1px solid #A3E635',
                                    borderRadius: 16,
                                    padding: 20,
                                    display: 'flex',
                                    gap: 12,
                                    alignItems: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                        size: 24,
                                        color: "#0F9D58"
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/gst/page.tsx",
                                        lineNumber: 725,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontWeight: 800,
                                                    color: '#137333',
                                                    fontSize: 14
                                                },
                                                children: "Credit Utilization Optimize Mode"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 727,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    color: '#137333',
                                                    fontSize: 12,
                                                    marginTop: 2
                                                },
                                                children: "Accumulated ITC will automatically offset CGST and SGST liabilities on final filing generation."
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 728,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/gst/page.tsx",
                                        lineNumber: 726,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/gst/page.tsx",
                                lineNumber: 724,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/gst/page.tsx",
                        lineNumber: 675,
                        columnNumber: 21
                    }, this),
                    activeTab === 'gstr2b' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: 20,
                                    flexWrap: 'wrap',
                                    gap: 12
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                style: {
                                                    fontSize: 18,
                                                    fontWeight: 900,
                                                    margin: 0
                                                },
                                                children: "GSTR-2B Auto-Reconciliation"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 741,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    color: '#718096',
                                                    fontSize: 13,
                                                    marginTop: 2
                                                },
                                                children: "Match purchase bills against GSTR-2B portal tax data."
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 742,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/gst/page.tsx",
                                        lineNumber: 740,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleImportGstr2b,
                                        className: "btn btn-blue",
                                        style: {
                                            gap: 6,
                                            background: '#7C3AED',
                                            border: 'none'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                size: 15
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 745,
                                                columnNumber: 33
                                            }, this),
                                            " Import & Reconcile GSTR-2B"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/gst/page.tsx",
                                        lineNumber: 744,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/gst/page.tsx",
                                lineNumber: 739,
                                columnNumber: 25
                            }, this),
                            gstr2bImported ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            gap: 14,
                                            alignItems: 'center',
                                            background: '#F3E8FF',
                                            border: '1px solid #C084FC',
                                            padding: 16,
                                            borderRadius: 14,
                                            marginBottom: 20
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 24,
                                                    fontWeight: 900,
                                                    color: '#7C3AED'
                                                },
                                                children: [
                                                    reconciledPercent,
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 752,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontWeight: 800,
                                                            fontSize: 14,
                                                            color: '#6B21A8'
                                                        },
                                                        children: "Reconciliation Matching Score"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 754,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 12,
                                                            color: '#7E22CE'
                                                        },
                                                        children: [
                                                            reconciledList.filter((i)=>i.status === 'Matched').length,
                                                            " matched out of ",
                                                            reconciledList.length,
                                                            " items. Discrepancies highlighted below."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 755,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 753,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/gst/page.tsx",
                                        lineNumber: 751,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            overflowX: 'auto'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                            className: "e-table",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                children: "Bill Number"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 763,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                children: "Supplier Name"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 764,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                children: "Amount"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 765,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                children: "GST Tax"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 766,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                children: "Status"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 767,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                children: "Audit Notes"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 768,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 762,
                                                        columnNumber: 45
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                    lineNumber: 761,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                    children: reconciledList.map((item)=>{
                                                        const badgeClass = item.status === 'Matched' ? 'badge-green' : item.status === 'Missing' ? 'badge-red' : 'badge-yellow';
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    style: {
                                                                        fontFamily: 'monospace',
                                                                        fontWeight: 700
                                                                    },
                                                                    children: item.invoiceNumber
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                                    lineNumber: 778,
                                                                    columnNumber: 57
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    children: item.partyName
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                                    lineNumber: 779,
                                                                    columnNumber: 57
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    style: {
                                                                        fontWeight: 700
                                                                    },
                                                                    children: [
                                                                        "₹",
                                                                        item.amount.toLocaleString('en-IN')
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                                    lineNumber: 780,
                                                                    columnNumber: 57
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    children: [
                                                                        "₹",
                                                                        item.tax.toLocaleString('en-IN')
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                                    lineNumber: 781,
                                                                    columnNumber: 57
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: `badge ${badgeClass}`,
                                                                        children: item.status
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                                        lineNumber: 782,
                                                                        columnNumber: 61
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                                    lineNumber: 782,
                                                                    columnNumber: 57
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    style: {
                                                                        fontSize: 11,
                                                                        color: '#718096'
                                                                    },
                                                                    children: item.notes
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                                    lineNumber: 783,
                                                                    columnNumber: 57
                                                                }, this)
                                                            ]
                                                        }, item.id, true, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 777,
                                                            columnNumber: 53
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                    lineNumber: 771,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/gst/page.tsx",
                                            lineNumber: 760,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/gst/page.tsx",
                                        lineNumber: 759,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/gst/page.tsx",
                                lineNumber: 750,
                                columnNumber: 29
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: '60px 20px',
                                    textAlign: 'center',
                                    border: '2px dashed #E2E8F0',
                                    borderRadius: 20
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                        size: 44,
                                        style: {
                                            color: '#94A3B8',
                                            margin: '0 auto 14px'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/gst/page.tsx",
                                        lineNumber: 793,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            fontSize: 15,
                                            fontWeight: 700,
                                            color: '#4A5568'
                                        },
                                        children: "Import GSTR-2B JSON"
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/gst/page.tsx",
                                        lineNumber: 794,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 12,
                                            color: '#94A3B8',
                                            marginTop: 4,
                                            maxWidth: 300,
                                            margin: '4px auto 14px'
                                        },
                                        children: "Upload GSTR-2B JSON statement file downloaded from GST portal to auto-match purchase invoices."
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/gst/page.tsx",
                                        lineNumber: 795,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleImportGstr2b,
                                        className: "btn btn-outline",
                                        children: "Choose file and match"
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/gst/page.tsx",
                                        lineNumber: 796,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/gst/page.tsx",
                                lineNumber: 792,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/gst/page.tsx",
                        lineNumber: 738,
                        columnNumber: 21
                    }, this),
                    activeTab === 'einvoice' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    fontSize: 18,
                                    fontWeight: 900,
                                    marginBottom: 4
                                },
                                children: "E-Invoice Compliance (IRN & QR)"
                            }, void 0, false, {
                                fileName: "[project]/app/company/gst/page.tsx",
                                lineNumber: 807,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: '#718096',
                                    fontSize: 13,
                                    marginBottom: 20
                                },
                                children: "Generate e-invoices with Government portal validated Invoice Reference Number (IRN) and signed QR codes."
                            }, void 0, false, {
                                fileName: "[project]/app/company/gst/page.tsx",
                                lineNumber: 808,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    overflowX: 'auto'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "e-table",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Invoice No"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 814,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Customer Name"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 815,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Amount"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 816,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "GSTIN"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 817,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "IRN / Status"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 818,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "QR Code"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 819,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Actions"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 820,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 813,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/gst/page.tsx",
                                            lineNumber: 812,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: b2bInvoices.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    colSpan: 7,
                                                    style: {
                                                        textAlign: 'center',
                                                        color: '#A0AEC0'
                                                    },
                                                    children: "No B2B invoices found. Create a sale invoice for a business customer with GSTIN."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                    lineNumber: 825,
                                                    columnNumber: 45
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 825,
                                                columnNumber: 41
                                            }, this) : b2bInvoices.map((inv)=>{
                                                const statusInfo = eInvoiceStatus[inv.id] || {
                                                    irn: '—',
                                                    status: 'Pending',
                                                    qrCode: ''
                                                };
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                fontFamily: 'monospace',
                                                                fontWeight: 700
                                                            },
                                                            children: inv.invoiceNumber
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 831,
                                                            columnNumber: 53
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: inv.partyName
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 832,
                                                            columnNumber: 53
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                fontWeight: 700
                                                            },
                                                            children: [
                                                                "₹",
                                                                inv.grandTotal.toLocaleString('en-IN')
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 833,
                                                            columnNumber: 53
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                fontFamily: 'monospace',
                                                                fontSize: 11
                                                            },
                                                            children: inv.gstin || parties.find((p)=>p.id === inv.partyId || p.name === inv.partyName)?.gstNumber
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 834,
                                                            columnNumber: 53
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    gap: 2
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: `badge ${statusInfo.status === 'Generated' ? 'badge-green' : statusInfo.status === 'Cancelled' ? 'badge-red' : 'badge-yellow'}`,
                                                                        children: statusInfo.status
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                                        lineNumber: 837,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    statusInfo.irn !== '—' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontSize: 8,
                                                                            color: '#718096',
                                                                            fontFamily: 'monospace',
                                                                            maxWidth: 150,
                                                                            overflow: 'hidden',
                                                                            textOverflow: 'ellipsis',
                                                                            whiteSpace: 'nowrap'
                                                                        },
                                                                        children: statusInfo.irn
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                                        lineNumber: 838,
                                                                        columnNumber: 88
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 836,
                                                                columnNumber: 57
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 835,
                                                            columnNumber: 53
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: statusInfo.qrCode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: statusInfo.qrCode,
                                                                style: {
                                                                    width: 44,
                                                                    height: 44,
                                                                    border: '1px solid #CBD5E1',
                                                                    padding: 2
                                                                },
                                                                alt: "IRN QR"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 843,
                                                                columnNumber: 61
                                                            }, this) : '—'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 841,
                                                            columnNumber: 53
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    gap: 6
                                                                },
                                                                children: statusInfo.status !== 'Generated' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>handleGenerateIrn(inv.id),
                                                                    className: "btn btn-blue btn-sm",
                                                                    children: "Generate IRN"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                                    lineNumber: 849,
                                                                    columnNumber: 65
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>{
                                                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('JSON downloaded!');
                                                                            },
                                                                            className: "btn btn-outline btn-sm",
                                                                            children: "JSON"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                                            lineNumber: 852,
                                                                            columnNumber: 69
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>handleCancelIrn(inv.id),
                                                                            className: "btn btn-sm",
                                                                            style: {
                                                                                background: '#FEE2E2',
                                                                                color: '#DC2626',
                                                                                border: '1px solid #FCA5A5'
                                                                            },
                                                                            children: "Cancel IRN"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                                            lineNumber: 853,
                                                                            columnNumber: 69
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 847,
                                                                columnNumber: 57
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 846,
                                                            columnNumber: 53
                                                        }, this)
                                                    ]
                                                }, inv.id, true, {
                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                    lineNumber: 830,
                                                    columnNumber: 49
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/gst/page.tsx",
                                            lineNumber: 823,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/gst/page.tsx",
                                    lineNumber: 811,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/company/gst/page.tsx",
                                lineNumber: 810,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/gst/page.tsx",
                        lineNumber: 806,
                        columnNumber: 21
                    }, this),
                    activeTab === 'eway' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    fontSize: 18,
                                    fontWeight: 900,
                                    marginBottom: 4
                                },
                                children: "E-Way Bill Generation"
                            }, void 0, false, {
                                fileName: "[project]/app/company/gst/page.tsx",
                                lineNumber: 873,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: '#718096',
                                    fontSize: 13,
                                    marginBottom: 20
                                },
                                children: "Generate, update, or cancel E-Way bills for consignments exceeding statutory limits."
                            }, void 0, false, {
                                fileName: "[project]/app/company/gst/page.tsx",
                                lineNumber: 874,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 2fr',
                                    gap: 24
                                },
                                className: "eway-layout-grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "card",
                                        style: {
                                            padding: 20,
                                            border: '1px solid #E2E8F0',
                                            background: '#F8FAFC'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                style: {
                                                    fontSize: 14,
                                                    fontWeight: 900,
                                                    marginBottom: 12
                                                },
                                                children: "Create E-Way Bill"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 879,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 10
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                style: {
                                                                    fontSize: 10,
                                                                    fontWeight: 800,
                                                                    color: '#64748B',
                                                                    display: 'block',
                                                                    marginBottom: 4
                                                                },
                                                                children: "Select Invoice"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 882,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                className: "e-select",
                                                                value: ewayForm.invoiceId,
                                                                onChange: (e)=>setEwayForm({
                                                                        ...ewayForm,
                                                                        invoiceId: e.target.value
                                                                    }),
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "",
                                                                        children: "Choose Invoice..."
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                                        lineNumber: 884,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    invoices.filter((i)=>i.invoiceType === 'sale').map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: i.id,
                                                                            children: [
                                                                                i.invoiceNumber,
                                                                                " · ₹",
                                                                                i.grandTotal.toLocaleString('en-IN')
                                                                            ]
                                                                        }, i.id, true, {
                                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                                            lineNumber: 886,
                                                                            columnNumber: 49
                                                                        }, this))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 883,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 881,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                style: {
                                                                    fontSize: 10,
                                                                    fontWeight: 800,
                                                                    color: '#64748B',
                                                                    display: 'block',
                                                                    marginBottom: 4
                                                                },
                                                                children: "Vehicle Number"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 891,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                className: "e-input",
                                                                placeholder: "e.g. DL-01-AB-1234",
                                                                value: ewayForm.vehicleNo,
                                                                onChange: (e)=>setEwayForm({
                                                                        ...ewayForm,
                                                                        vehicleNo: e.target.value.toUpperCase()
                                                                    }),
                                                                style: {
                                                                    textTransform: 'uppercase'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 892,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 890,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                style: {
                                                                    fontSize: 10,
                                                                    fontWeight: 800,
                                                                    color: '#64748B',
                                                                    display: 'block',
                                                                    marginBottom: 4
                                                                },
                                                                children: "Transporter ID"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 895,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                className: "e-input",
                                                                placeholder: "e.g. GSTIN1234",
                                                                value: ewayForm.transporterId,
                                                                onChange: (e)=>setEwayForm({
                                                                        ...ewayForm,
                                                                        transporterId: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 896,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 894,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                style: {
                                                                    fontSize: 10,
                                                                    fontWeight: 800,
                                                                    color: '#64748B',
                                                                    display: 'block',
                                                                    marginBottom: 4
                                                                },
                                                                children: "Distance (Km)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 899,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                className: "e-input",
                                                                type: "number",
                                                                value: ewayForm.distance,
                                                                onChange: (e)=>setEwayForm({
                                                                        ...ewayForm,
                                                                        distance: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 900,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 898,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: handleGenerateEway,
                                                        className: "btn btn-blue",
                                                        style: {
                                                            marginTop: 10,
                                                            background: '#0F9D58',
                                                            border: 'none'
                                                        },
                                                        children: "Generate E-Way Bill"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 902,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 880,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/gst/page.tsx",
                                        lineNumber: 878,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                style: {
                                                    fontSize: 14,
                                                    fontWeight: 900,
                                                    marginBottom: 12
                                                },
                                                children: "Active E-Way Bills"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 910,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                className: "e-table",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    children: "Invoice No"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                                    lineNumber: 914,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    children: "E-Way Bill Number"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                                    lineNumber: 915,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    children: "Vehicle No"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                                    lineNumber: 916,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    children: "Status"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                                    lineNumber: 917,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 913,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 912,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                        children: Object.keys(ewayBills).length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                colSpan: 4,
                                                                style: {
                                                                    textAlign: 'center',
                                                                    color: '#A0AEC0'
                                                                },
                                                                children: "No E-Way bills generated yet."
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 922,
                                                                columnNumber: 49
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 922,
                                                            columnNumber: 45
                                                        }, this) : Object.entries(ewayBills).map(([invId, bill])=>{
                                                            const inv = invoices.find((i)=>i.id === invId);
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        style: {
                                                                            fontFamily: 'monospace',
                                                                            fontWeight: 700
                                                                        },
                                                                        children: inv?.invoiceNumber || '—'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                                        lineNumber: 928,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        style: {
                                                                            fontFamily: 'monospace',
                                                                            fontWeight: 800,
                                                                            color: '#0F9D58'
                                                                        },
                                                                        children: bill.ewayBillNo
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                                        lineNumber: 929,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        style: {
                                                                            fontFamily: 'monospace'
                                                                        },
                                                                        children: bill.vehicleNo
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                                        lineNumber: 930,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "badge badge-green",
                                                                            children: bill.status
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                                            lineNumber: 931,
                                                                            columnNumber: 61
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                                        lineNumber: 931,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                ]
                                                            }, invId, true, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 927,
                                                                columnNumber: 53
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 920,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 911,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/gst/page.tsx",
                                        lineNumber: 909,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/gst/page.tsx",
                                lineNumber: 876,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/gst/page.tsx",
                        lineNumber: 872,
                        columnNumber: 21
                    }, this),
                    activeTab === 'payments' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    fontSize: 18,
                                    fontWeight: 900,
                                    marginBottom: 4
                                },
                                children: "GST Challans & Liabilities Ledger"
                            }, void 0, false, {
                                fileName: "[project]/app/company/gst/page.tsx",
                                lineNumber: 948,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: '#718096',
                                    fontSize: 13,
                                    marginBottom: 20
                                },
                                children: "Record payments made towards CGST, SGST, IGST, late fees, interest, and challan details CPIN/CIN."
                            }, void 0, false, {
                                fileName: "[project]/app/company/gst/page.tsx",
                                lineNumber: 949,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 2fr',
                                    gap: 24
                                },
                                className: "payments-layout-grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "card",
                                        style: {
                                            padding: 20,
                                            border: '1px solid #E2E8F0',
                                            background: '#F8FAFC'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                style: {
                                                    fontSize: 14,
                                                    fontWeight: 900,
                                                    marginBottom: 12
                                                },
                                                children: "Record Challan Payment"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 954,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 10
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'grid',
                                                            gridTemplateColumns: '1fr 1fr',
                                                            gap: 8
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        style: {
                                                                            fontSize: 9,
                                                                            fontWeight: 800,
                                                                            color: '#64748B',
                                                                            display: 'block',
                                                                            marginBottom: 2
                                                                        },
                                                                        children: "CPIN"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                                        lineNumber: 958,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        className: "e-input",
                                                                        placeholder: "e.g. 26059902",
                                                                        value: payForm.cpin,
                                                                        onChange: (e)=>setPayForm({
                                                                                ...payForm,
                                                                                cpin: e.target.value
                                                                            }),
                                                                        style: {
                                                                            fontSize: 12
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                                        lineNumber: 959,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 957,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        style: {
                                                                            fontSize: 9,
                                                                            fontWeight: 800,
                                                                            color: '#64748B',
                                                                            display: 'block',
                                                                            marginBottom: 2
                                                                        },
                                                                        children: "CIN"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                                        lineNumber: 962,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        className: "e-input",
                                                                        placeholder: "e.g. CIN9908",
                                                                        value: payForm.cin,
                                                                        onChange: (e)=>setPayForm({
                                                                                ...payForm,
                                                                                cin: e.target.value
                                                                            }),
                                                                        style: {
                                                                            fontSize: 12
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                                        lineNumber: 963,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 961,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 956,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'grid',
                                                            gridTemplateColumns: '1fr 1fr 1fr',
                                                            gap: 8
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        style: {
                                                                            fontSize: 9,
                                                                            fontWeight: 800,
                                                                            color: '#64748B',
                                                                            display: 'block',
                                                                            marginBottom: 2
                                                                        },
                                                                        children: "CGST (₹)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                                        lineNumber: 968,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        className: "e-input",
                                                                        type: "number",
                                                                        placeholder: "0",
                                                                        value: payForm.cgst,
                                                                        onChange: (e)=>setPayForm({
                                                                                ...payForm,
                                                                                cgst: e.target.value
                                                                            }),
                                                                        style: {
                                                                            fontSize: 12
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                                        lineNumber: 969,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 967,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        style: {
                                                                            fontSize: 9,
                                                                            fontWeight: 800,
                                                                            color: '#64748B',
                                                                            display: 'block',
                                                                            marginBottom: 2
                                                                        },
                                                                        children: "SGST (₹)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                                        lineNumber: 972,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        className: "e-input",
                                                                        type: "number",
                                                                        placeholder: "0",
                                                                        value: payForm.sgst,
                                                                        onChange: (e)=>setPayForm({
                                                                                ...payForm,
                                                                                sgst: e.target.value
                                                                            }),
                                                                        style: {
                                                                            fontSize: 12
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                                        lineNumber: 973,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 971,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        style: {
                                                                            fontSize: 9,
                                                                            fontWeight: 800,
                                                                            color: '#64748B',
                                                                            display: 'block',
                                                                            marginBottom: 2
                                                                        },
                                                                        children: "IGST (₹)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                                        lineNumber: 976,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        className: "e-input",
                                                                        type: "number",
                                                                        placeholder: "0",
                                                                        value: payForm.igst,
                                                                        onChange: (e)=>setPayForm({
                                                                                ...payForm,
                                                                                igst: e.target.value
                                                                            }),
                                                                        style: {
                                                                            fontSize: 12
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                                        lineNumber: 977,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 975,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 966,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'grid',
                                                            gridTemplateColumns: '1fr 1fr',
                                                            gap: 8
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        style: {
                                                                            fontSize: 9,
                                                                            fontWeight: 800,
                                                                            color: '#64748B',
                                                                            display: 'block',
                                                                            marginBottom: 2
                                                                        },
                                                                        children: "Interest (₹)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                                        lineNumber: 982,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        className: "e-input",
                                                                        type: "number",
                                                                        placeholder: "0",
                                                                        value: payForm.interest,
                                                                        onChange: (e)=>setPayForm({
                                                                                ...payForm,
                                                                                interest: e.target.value
                                                                            }),
                                                                        style: {
                                                                            fontSize: 12
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                                        lineNumber: 983,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 981,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        style: {
                                                                            fontSize: 9,
                                                                            fontWeight: 800,
                                                                            color: '#64748B',
                                                                            display: 'block',
                                                                            marginBottom: 2
                                                                        },
                                                                        children: "Late Fee (₹)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                                        lineNumber: 986,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        className: "e-input",
                                                                        type: "number",
                                                                        placeholder: "0",
                                                                        value: payForm.lateFee,
                                                                        onChange: (e)=>setPayForm({
                                                                                ...payForm,
                                                                                lateFee: e.target.value
                                                                            }),
                                                                        style: {
                                                                            fontSize: 12
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                                        lineNumber: 987,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 985,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 980,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                style: {
                                                                    fontSize: 9,
                                                                    fontWeight: 800,
                                                                    color: '#64748B',
                                                                    display: 'block',
                                                                    marginBottom: 2
                                                                },
                                                                children: "Bank & UTR No."
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 991,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    gap: 6
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        className: "e-input",
                                                                        placeholder: "SBI Bank",
                                                                        value: payForm.bank,
                                                                        onChange: (e)=>setPayForm({
                                                                                ...payForm,
                                                                                bank: e.target.value
                                                                            }),
                                                                        style: {
                                                                            flex: 1,
                                                                            fontSize: 12
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                                        lineNumber: 993,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        className: "e-input",
                                                                        placeholder: "UTR Reference",
                                                                        value: payForm.utr,
                                                                        onChange: (e)=>setPayForm({
                                                                                ...payForm,
                                                                                utr: e.target.value
                                                                            }),
                                                                        style: {
                                                                            flex: 1.5,
                                                                            fontSize: 12
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                                        lineNumber: 994,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 992,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 990,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: handleSavePayment,
                                                        className: "btn btn-blue",
                                                        style: {
                                                            marginTop: 10,
                                                            background: '#0F9D58',
                                                            border: 'none'
                                                        },
                                                        children: "Record Payment"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 997,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 955,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/gst/page.tsx",
                                        lineNumber: 953,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                style: {
                                                    fontSize: 14,
                                                    fontWeight: 900,
                                                    marginBottom: 12
                                                },
                                                children: "Challan Payment History"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 1005,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                className: "e-table",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    children: "CPIN / CIN"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                                    lineNumber: 1009,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    children: "CGST / SGST"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                                    lineNumber: 1010,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    children: "IGST / Late Fee"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                                    lineNumber: 1011,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    children: "UTR / Date"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                                    lineNumber: 1012,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 1008,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 1007,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                        children: challans.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                colSpan: 4,
                                                                style: {
                                                                    textAlign: 'center',
                                                                    color: '#A0AEC0'
                                                                },
                                                                children: "No challan payments recorded yet."
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 1017,
                                                                columnNumber: 49
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 1017,
                                                            columnNumber: 45
                                                        }, this) : challans.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                display: 'flex',
                                                                                flexDirection: 'column'
                                                                            },
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    style: {
                                                                                        fontWeight: 700,
                                                                                        fontSize: 12,
                                                                                        fontFamily: 'monospace'
                                                                                    },
                                                                                    children: item.cpin
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                                                    lineNumber: 1023,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    style: {
                                                                                        fontSize: 10,
                                                                                        color: '#718096',
                                                                                        fontFamily: 'monospace'
                                                                                    },
                                                                                    children: item.cin
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                                                    lineNumber: 1024,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                                            lineNumber: 1022,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                                        lineNumber: 1021,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                display: 'flex',
                                                                                flexDirection: 'column'
                                                                            },
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: [
                                                                                        "CGST: ₹",
                                                                                        item.cgst?.toLocaleString('en-IN')
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                                                    lineNumber: 1029,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: [
                                                                                        "SGST: ₹",
                                                                                        item.sgst?.toLocaleString('en-IN')
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                                                    lineNumber: 1030,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                                            lineNumber: 1028,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                                        lineNumber: 1027,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                display: 'flex',
                                                                                flexDirection: 'column'
                                                                            },
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: [
                                                                                        "IGST: ₹",
                                                                                        item.igst?.toLocaleString('en-IN')
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                                                    lineNumber: 1035,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                item.lateFee > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    style: {
                                                                                        color: '#EA4335',
                                                                                        fontSize: 10
                                                                                    },
                                                                                    children: [
                                                                                        "Late: ₹",
                                                                                        item.lateFee
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                                                    lineNumber: 1036,
                                                                                    columnNumber: 82
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                                            lineNumber: 1034,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                                        lineNumber: 1033,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                display: 'flex',
                                                                                flexDirection: 'column',
                                                                                fontSize: 11
                                                                            },
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    style: {
                                                                                        fontWeight: 700,
                                                                                        color: '#64748B'
                                                                                    },
                                                                                    children: item.utr
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                                                    lineNumber: 1041,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    style: {
                                                                                        color: '#94A3B8'
                                                                                    },
                                                                                    children: [
                                                                                        item.date,
                                                                                        " (",
                                                                                        item.bank,
                                                                                        ")"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                                                    lineNumber: 1042,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                                            lineNumber: 1040,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                                        lineNumber: 1039,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, item.id, true, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 1020,
                                                                columnNumber: 49
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 1015,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 1006,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/gst/page.tsx",
                                        lineNumber: 1004,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/gst/page.tsx",
                                lineNumber: 951,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/gst/page.tsx",
                        lineNumber: 947,
                        columnNumber: 21
                    }, this),
                    activeTab === 'audit' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 20
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: 12
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                style: {
                                                    fontSize: 18,
                                                    fontWeight: 900,
                                                    margin: 0
                                                },
                                                children: "GST Compliance Audit"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 1062,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    color: '#718096',
                                                    fontSize: 13,
                                                    marginTop: 2
                                                },
                                                children: "Secure system logs for all invoices and transaction revisions."
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 1063,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/gst/page.tsx",
                                        lineNumber: 1061,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            gap: 10
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleLockToggle,
                                                className: "btn btn-outline",
                                                style: {
                                                    gap: 6,
                                                    color: isPeriodLocked ? '#0F9D58' : '#718096'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                        size: 15
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 1067,
                                                        columnNumber: 37
                                                    }, this),
                                                    " ",
                                                    isPeriodLocked ? 'Unlock Period' : 'Lock Filing Period'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 1066,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleApprovalToggle,
                                                className: "btn btn-outline",
                                                style: {
                                                    gap: 6,
                                                    color: approvalRequired ? '#7C3AED' : '#718096'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                                                        size: 15
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 1070,
                                                        columnNumber: 37
                                                    }, this),
                                                    " ",
                                                    approvalRequired ? 'Approval Required' : 'Quick Approve'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 1069,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/gst/page.tsx",
                                        lineNumber: 1065,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/gst/page.tsx",
                                lineNumber: 1060,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: 14
                                },
                                className: "audit-config-grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: isPeriodLocked ? '#E6F4EA' : '#F8FAFC',
                                            padding: 20,
                                            borderRadius: 14,
                                            border: '1px solid #E2E8F0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 12
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                size: 28,
                                                color: isPeriodLocked ? '#0F9D58' : '#64748B'
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 1078,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        style: {
                                                            fontSize: 14,
                                                            fontWeight: 900,
                                                            color: '#1E293B',
                                                            margin: '0 0 2px'
                                                        },
                                                        children: "Filing Period Status"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 1080,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 11,
                                                            color: '#718096',
                                                            margin: 0
                                                        },
                                                        children: isPeriodLocked ? 'LOCKED. Invoices and credit notes for prior filing months cannot be edited.' : 'UNLOCKED. Modification to old invoices allowed (owner approval recommended).'
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 1081,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 1079,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/gst/page.tsx",
                                        lineNumber: 1077,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: approvalRequired ? '#F3E8FF' : '#F8FAFC',
                                            padding: 20,
                                            borderRadius: 14,
                                            border: '1px solid #E2E8F0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 12
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                                                size: 28,
                                                color: approvalRequired ? '#7C3AED' : '#64748B'
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 1085,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        style: {
                                                            fontSize: 14,
                                                            fontWeight: 900,
                                                            color: '#1E293B',
                                                            margin: '0 0 2px'
                                                        },
                                                        children: "GST Revision Approvals"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 1087,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 11,
                                                            color: '#718096',
                                                            margin: 0
                                                        },
                                                        children: approvalRequired ? 'ENABLED. Staff and biller modifications to finalized invoices require owner signature.' : 'DISABLED. Invoices can be modified directly by authorised managers.'
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 1088,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 1086,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/gst/page.tsx",
                                        lineNumber: 1084,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/gst/page.tsx",
                                lineNumber: 1076,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    fontSize: 15,
                                    fontWeight: 900,
                                    marginTop: 10,
                                    marginBottom: 10
                                },
                                children: "Filing Audit Logs"
                            }, void 0, false, {
                                fileName: "[project]/app/company/gst/page.tsx",
                                lineNumber: 1094,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    overflowX: 'auto'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "e-table",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Timestamp"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 1099,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Action Type"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 1100,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Invoice Reference"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 1101,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Triggered By"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 1102,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Filing Revision Notes"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 1103,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 1098,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/gst/page.tsx",
                                            lineNumber: 1097,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: auditLogs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        style: {
                                                            color: '#718096'
                                                        },
                                                        children: "25-Jun-2026 10:14 AM"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 1109,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "badge badge-green",
                                                            children: "SYSTEM LOG"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 1110,
                                                            columnNumber: 49
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 1110,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        style: {
                                                            fontFamily: 'monospace'
                                                        },
                                                        children: "GST-IN-SEED"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 1111,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: "Admin"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 1112,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        style: {
                                                            fontSize: 11,
                                                            color: '#718096'
                                                        },
                                                        children: "GST Suite initialized. Tax configuration verified."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/gst/page.tsx",
                                                        lineNumber: 1113,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/gst/page.tsx",
                                                lineNumber: 1108,
                                                columnNumber: 41
                                            }, this) : auditLogs.map((log)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                color: '#718096'
                                                            },
                                                            children: log.date
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 1118,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `badge ${log.action.toLowerCase().includes('delete') ? 'badge-red' : 'badge-blue'}`,
                                                                children: log.action
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/gst/page.tsx",
                                                                lineNumber: 1119,
                                                                columnNumber: 53
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 1119,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                fontFamily: 'monospace',
                                                                fontWeight: 700
                                                            },
                                                            children: log.target
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 1120,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                fontWeight: 600
                                                            },
                                                            children: log.user
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 1121,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                fontSize: 11,
                                                                color: '#718096'
                                                            },
                                                            children: log.description
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/gst/page.tsx",
                                                            lineNumber: 1122,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, log.id, true, {
                                                    fileName: "[project]/app/company/gst/page.tsx",
                                                    lineNumber: 1117,
                                                    columnNumber: 45
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/gst/page.tsx",
                                            lineNumber: 1106,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/gst/page.tsx",
                                    lineNumber: 1096,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/company/gst/page.tsx",
                                lineNumber: 1095,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/gst/page.tsx",
                        lineNumber: 1059,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/gst/page.tsx",
                lineNumber: 475,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/company/gst/page.tsx",
        lineNumber: 402,
        columnNumber: 9
    }, this);
}
_s(GstSuitePage, "UHyj6uGnFs8Mqx/fPdaCyabzC44=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActiveCompany"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"]
    ];
});
_c = GstSuitePage;
var _c;
__turbopack_context__.k.register(_c, "GstSuitePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_company_gst_page_tsx_87484dc6._.js.map