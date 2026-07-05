(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/company/parties/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PartiesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pen.js [app-client] (ecmascript) <export default as Edit2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-down.js [app-client] (ecmascript) <export default as TrendingDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$indian$2d$rupee$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IndianRupee$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/indian-rupee.js [app-client] (ecmascript) <export default as IndianRupee>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/history.js [app-client] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ConfirmDialog.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function PartiesPage() {
    _s();
    const { activeCompanyId, addParty, updateParty, deleteParty, addBalancePayment, deleteBalancePayment } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const companyId = activeCompanyId;
    const company = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActiveCompany"])();
    const parties = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"])('parties');
    const invoices = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"])('invoices');
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [typeFilter, setTypeFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [showAdd, setShowAdd] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editParty, setEditParty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [paymentParty, setPaymentParty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [payForm, setPayForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        amount: '',
        type: 'received',
        method: 'cash',
        date: new Date().toLocaleDateString('sv-SE'),
        note: ''
    });
    const [historyParty, setHistoryParty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [historyTab, setHistoryTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('payments');
    // Loyalty Adjustment States
    const [loyaltyAdjustParty, setLoyaltyAdjustParty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [adjustPointsVal, setAdjustPointsVal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [adjustPointsType, setAdjustPointsType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('add');
    const [adjustPointsReason, setAdjustPointsReason] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const openPaymentModal = (p)=>{
        const defaultType = p.balance < 0 ? 'paid' : 'received';
        setPayForm({
            amount: '',
            type: defaultType,
            method: 'cash',
            date: new Date().toLocaleDateString('sv-SE'),
            note: ''
        });
        setPaymentParty(p);
    };
    const emptyForm = {
        name: '',
        phone: '',
        email: '',
        gstNumber: '',
        address: '',
        city: '',
        state: 'Tamil Nadu',
        type: 'customer',
        openingBalance: '',
        balance: '',
        creditLimit: '',
        creditDays: '',
        loyaltyPoints: ''
    };
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(emptyForm);
    const up = (k, v)=>setForm((f)=>{
            const next = {
                ...f,
                [k]: v
            };
            if (k === 'openingBalance' && !editParty) {
                next.balance = v;
            }
            return next;
        });
    const filtered = parties.filter((p)=>{
        if (typeFilter !== 'all' && p.type !== typeFilter && p.type !== 'both') return false;
        if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.phone.includes(search)) return false;
        return true;
    });
    const totalReceivable = parties.filter((p)=>p.balance > 0).reduce((a, p)=>a + p.balance, 0);
    const totalPayable = parties.filter((p)=>p.balance < 0).reduce((a, p)=>a + Math.abs(p.balance), 0);
    const customerLoyaltyInvoices = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PartiesPage.useMemo[customerLoyaltyInvoices]": ()=>{
            if (!historyParty) return [];
            // Invoice-based loyalty entries
            const invoiceEntries = invoices.filter({
                "PartiesPage.useMemo[customerLoyaltyInvoices].invoiceEntries": (inv)=>inv.companyId === companyId && inv.invoiceType === 'sale' && (inv.partyId === historyParty.id || historyParty.phone && inv.partyPhone === historyParty.phone) && ((inv.pointsEarned || 0) > 0 || (inv.pointsRedeemed || 0) > 0)
            }["PartiesPage.useMemo[customerLoyaltyInvoices].invoiceEntries"]).map({
                "PartiesPage.useMemo[customerLoyaltyInvoices].invoiceEntries": (inv)=>({
                        id: inv.id,
                        date: inv.date,
                        time: inv.time || '00:00',
                        pointsEarned: inv.pointsEarned || 0,
                        pointsRedeemed: inv.pointsRedeemed || 0,
                        title: `Invoice ${inv.invoiceNumber}`,
                        subTitle: `Bill Amount: ₹${inv.grandTotal.toLocaleString('en-IN')}`
                    })
            }["PartiesPage.useMemo[customerLoyaltyInvoices].invoiceEntries"]);
            // Manual adjustment entries
            const adjustmentEntries = (historyParty.loyaltyAdjustments || []).map({
                "PartiesPage.useMemo[customerLoyaltyInvoices].adjustmentEntries": (adj)=>({
                        id: adj.id,
                        date: adj.date,
                        time: adj.time || '00:00',
                        pointsEarned: adj.points > 0 ? adj.points : 0,
                        pointsRedeemed: adj.points < 0 ? -adj.points : 0,
                        title: 'Manual Adjustment',
                        subTitle: adj.reason || 'Manual points adjustment'
                    })
            }["PartiesPage.useMemo[customerLoyaltyInvoices].adjustmentEntries"]);
            // Merge and sort chronologically (newest first)
            return [
                ...invoiceEntries,
                ...adjustmentEntries
            ].sort({
                "PartiesPage.useMemo[customerLoyaltyInvoices]": (a, b)=>{
                    const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
                    if (dateDiff !== 0) return dateDiff;
                    return (b.time || '').localeCompare(a.time || '');
                }
            }["PartiesPage.useMemo[customerLoyaltyInvoices]"]);
        }
    }["PartiesPage.useMemo[customerLoyaltyInvoices]"], [
        invoices,
        historyParty,
        companyId
    ]);
    const handleSave = ()=>{
        if (!form.name || !form.phone) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Name and phone are required');
            return;
        }
        const balanceValue = parseFloat(form.balance) || 0;
        const openingBalanceValue = parseFloat(form.openingBalance) || 0;
        const data = {
            companyId: companyId,
            type: form.type,
            name: form.name,
            phone: form.phone,
            email: form.email,
            gstNumber: form.gstNumber,
            address: form.address,
            city: form.city,
            state: form.state,
            openingBalance: openingBalanceValue,
            balance: editParty ? balanceValue : openingBalanceValue,
            creditLimit: parseFloat(form.creditLimit) || undefined,
            creditDays: parseFloat(form.creditDays) || undefined,
            loyaltyPoints: parseInt(form.loyaltyPoints) || 0
        };
        if (editParty) {
            const oldPoints = editParty.loyaltyPoints || 0;
            const newPoints = parseInt(form.loyaltyPoints) || 0;
            const diff = newPoints - oldPoints;
            let updatedAdjustments = editParty.loyaltyAdjustments || [];
            if (diff !== 0) {
                updatedAdjustments = [
                    {
                        id: 'ladj_' + Date.now().toString(36),
                        date: new Date().toISOString().slice(0, 10),
                        time: new Date().toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                        }),
                        points: diff,
                        reason: 'Profile manual edit'
                    },
                    ...updatedAdjustments
                ];
            }
            updateParty(editParty.id, {
                ...data,
                loyaltyAdjustments: updatedAdjustments
            });
            setEditParty(null);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Party updated');
        } else {
            const newPoints = parseInt(form.loyaltyPoints) || 0;
            const initialAdjustments = newPoints > 0 ? [
                {
                    id: 'ladj_' + Date.now().toString(36),
                    date: new Date().toISOString().slice(0, 10),
                    time: new Date().toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    }),
                    points: newPoints,
                    reason: 'Opening loyalty points balance'
                }
            ] : [];
            addParty({
                ...data,
                loyaltyAdjustments: initialAdjustments
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Party added');
        }
        setShowAdd(false);
        setForm(emptyForm);
    };
    const openEdit = (p)=>{
        setEditParty(p);
        setForm({
            ...p,
            openingBalance: String(p.openingBalance),
            balance: String(p.balance),
            creditLimit: String(p.creditLimit || ''),
            creditDays: String(p.creditDays || ''),
            loyaltyPoints: String(p.loyaltyPoints || '0')
        });
        setShowAdd(true);
    };
    const handleAddPayment = ()=>{
        if (!paymentParty) return;
        const amt = parseFloat(payForm.amount);
        if (!amt || amt <= 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Enter a valid amount');
            return;
        }
        addBalancePayment(paymentParty.id, {
            type: payForm.type,
            amount: amt,
            method: payForm.method,
            date: payForm.date,
            note: payForm.note || undefined
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success(`Payment of ₹${amt.toLocaleString('en-IN')} recorded`);
        setPaymentParty(null);
        setPayForm({
            amount: '',
            type: 'received',
            method: 'cash',
            date: new Date().toLocaleDateString('sv-SE'),
            note: ''
        });
    };
    const handleAddLoyaltyAdjustment = ()=>{
        if (!loyaltyAdjustParty) return;
        const pts = parseInt(adjustPointsVal);
        if (!pts || pts <= 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Enter a valid points amount');
            return;
        }
        const diff = adjustPointsType === 'add' ? pts : -pts;
        const currentPoints = loyaltyAdjustParty.loyaltyPoints || 0;
        const newPoints = Math.max(0, currentPoints + diff);
        const adj = {
            id: 'ladj_' + Date.now().toString(36),
            date: new Date().toISOString().slice(0, 10),
            time: new Date().toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }),
            points: diff,
            reason: adjustPointsReason.trim() || 'Manual adjustment'
        };
        const updatedAdjustments = [
            adj,
            ...loyaltyAdjustParty.loyaltyAdjustments || []
        ];
        updateParty(loyaltyAdjustParty.id, {
            loyaltyPoints: newPoints,
            loyaltyAdjustments: updatedAdjustments
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success(`Loyalty points adjusted: ${diff > 0 ? '+' : ''}${diff} pts`);
        // Update both drawer states to keep them in sync
        setHistoryParty((p)=>p && p.id === loyaltyAdjustParty.id ? {
                ...p,
                loyaltyPoints: newPoints,
                loyaltyAdjustments: updatedAdjustments
            } : p);
        // Reset states
        setLoyaltyAdjustParty(null);
        setAdjustPointsVal('');
        setAdjustPointsType('add');
        setAdjustPointsReason('');
    };
    const handleDelete = async (id)=>{
        const yes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["confirm"])({
            message: 'This party and all their ledger data will be removed.',
            danger: true
        });
        if (yes) {
            deleteParty(id);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Party deleted');
        }
    };
    const exportCSV = ()=>{
        const header = 'Name,Phone,Email,GST,Type,Address,City,State,Opening Balance\n';
        const rows = parties.map((p)=>`"${p.name}","${p.phone}","${p.email || ''}","${p.gstNumber || ''}","${p.type}","${p.address || ''}","${p.city || ''}","${p.state || ''}",${p.openingBalance}`).join('\n');
        const blob = new Blob([
            '\uFEFF' + header + rows
        ], {
            type: 'text/csv;charset=utf-8'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'edibio_parties.csv';
        a.click();
        URL.revokeObjectURL(url);
    };
    const importRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleImport = (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev)=>{
            const text = ev.target?.result;
            const rows = text.split('\n').slice(1).filter(Boolean);
            rows.forEach((row)=>{
                const cols = row.split(',').map((c)=>c.replace(/^"|"$/g, '').trim());
                if (!cols[0]) return;
                addParty({
                    companyId: companyId,
                    name: cols[0],
                    phone: cols[1],
                    email: cols[2],
                    gstNumber: cols[3],
                    type: cols[4] || 'customer',
                    address: cols[5],
                    city: cols[6],
                    state: cols[7],
                    openingBalance: parseFloat(cols[8]) || 0,
                    balance: parseFloat(cols[8]) || 0
                });
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success(`Imported ${rows.length} parties`);
        };
        reader.readAsText(file);
        e.target.value = '';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: 1100,
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: 14
                        },
                        children: [
                            {
                                l: 'Total Parties',
                                v: String(parties.length),
                                color: '#4285F4',
                                Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
                            },
                            {
                                l: 'To Receive',
                                v: `₹${totalReceivable.toLocaleString('en-IN')}`,
                                color: '#34A853',
                                Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"]
                            },
                            {
                                l: 'To Pay',
                                v: `₹${totalPayable.toLocaleString('en-IN')}`,
                                color: '#EA4335',
                                Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__["TrendingDown"]
                            }
                        ].map(({ l, v, color, Icon })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card",
                                style: {
                                    padding: '16px 20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 42,
                                            height: 42,
                                            borderRadius: 12,
                                            background: color + '15',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            size: 19,
                                            color: color
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/parties/page.tsx",
                                            lineNumber: 263,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/parties/page.tsx",
                                        lineNumber: 262,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 10,
                                                    fontWeight: 700,
                                                    color: '#A0AEC0',
                                                    textTransform: 'uppercase',
                                                    marginBottom: 3
                                                },
                                                children: l
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/parties/page.tsx",
                                                lineNumber: 266,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 18,
                                                    fontWeight: 900,
                                                    color: '#1A1A2E'
                                                },
                                                children: v
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/parties/page.tsx",
                                                lineNumber: 267,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/parties/page.tsx",
                                        lineNumber: 265,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, l, true, {
                                fileName: "[project]/app/company/parties/page.tsx",
                                lineNumber: 261,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/company/parties/page.tsx",
                        lineNumber: 255,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: 10,
                            flexWrap: 'wrap'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    minWidth: 200,
                                    position: 'relative'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        size: 15,
                                        style: {
                                            position: 'absolute',
                                            left: 11,
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: '#A0AEC0'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/parties/page.tsx",
                                        lineNumber: 276,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "e-input",
                                        placeholder: "Search name or phone…",
                                        value: search,
                                        onChange: (e)=>setSearch(e.target.value),
                                        style: {
                                            paddingLeft: 34
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/parties/page.tsx",
                                        lineNumber: 277,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/parties/page.tsx",
                                lineNumber: 275,
                                columnNumber: 21
                            }, this),
                            [
                                'all',
                                'customer',
                                'supplier'
                            ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setTypeFilter(t),
                                    style: {
                                        padding: '9px 16px',
                                        borderRadius: 10,
                                        border: '1.5px solid',
                                        cursor: 'pointer',
                                        textTransform: 'capitalize',
                                        fontWeight: 700,
                                        fontSize: 12,
                                        transition: 'all 0.15s',
                                        borderColor: typeFilter === t ? '#4285F4' : '#E1E4E8',
                                        background: typeFilter === t ? '#4285F4' : 'white',
                                        color: typeFilter === t ? 'white' : '#718096'
                                    },
                                    children: t
                                }, t, false, {
                                    fileName: "[project]/app/company/parties/page.tsx",
                                    lineNumber: 280,
                                    columnNumber: 25
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: exportCSV,
                                className: "btn btn-outline btn-sm",
                                style: {
                                    gap: 5
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                        size: 13
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/parties/page.tsx",
                                        lineNumber: 285,
                                        columnNumber: 103
                                    }, this),
                                    " Export"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/parties/page.tsx",
                                lineNumber: 285,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>importRef.current?.click(),
                                className: "btn btn-outline btn-sm",
                                style: {
                                    gap: 5
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                        size: 13
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/parties/page.tsx",
                                        lineNumber: 286,
                                        columnNumber: 126
                                    }, this),
                                    " Import"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/parties/page.tsx",
                                lineNumber: 286,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setEditParty(null);
                                    setForm(emptyForm);
                                    setShowAdd(true);
                                },
                                className: "btn btn-blue btn-sm",
                                style: {
                                    gap: 5
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        size: 13
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/parties/page.tsx",
                                        lineNumber: 288,
                                        columnNumber: 25
                                    }, this),
                                    " Add Party"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/parties/page.tsx",
                                lineNumber: 287,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: importRef,
                                type: "file",
                                accept: ".csv",
                                onChange: handleImport,
                                style: {
                                    display: 'none'
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/company/parties/page.tsx",
                                lineNumber: 290,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/parties/page.tsx",
                        lineNumber: 274,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card",
                        style: {
                            overflow: 'hidden'
                        },
                        children: filtered.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'center',
                                padding: '56px 20px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                    size: 44,
                                    style: {
                                        color: '#E1E4E8',
                                        margin: '0 auto 12px'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/company/parties/page.tsx",
                                    lineNumber: 296,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        color: '#A0AEC0',
                                        fontWeight: 600,
                                        fontSize: 14
                                    },
                                    children: "No parties yet"
                                }, void 0, false, {
                                    fileName: "[project]/app/company/parties/page.tsx",
                                    lineNumber: 297,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowAdd(true),
                                    className: "btn btn-blue btn-sm",
                                    style: {
                                        display: 'inline-flex',
                                        marginTop: 12,
                                        gap: 5
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                            size: 13
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/parties/page.tsx",
                                            lineNumber: 299,
                                            columnNumber: 33
                                        }, this),
                                        " Add Party"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/parties/page.tsx",
                                    lineNumber: 298,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/parties/page.tsx",
                            lineNumber: 295,
                            columnNumber: 25
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "desktop-table",
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
                                                            children: "Name"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/parties/page.tsx",
                                                            lineNumber: 306,
                                                            columnNumber: 48
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            children: "Phone"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/parties/page.tsx",
                                                            lineNumber: 306,
                                                            columnNumber: 61
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            children: "GST"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/parties/page.tsx",
                                                            lineNumber: 306,
                                                            columnNumber: 75
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            children: "Type"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/parties/page.tsx",
                                                            lineNumber: 306,
                                                            columnNumber: 87
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            children: "City"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/parties/page.tsx",
                                                            lineNumber: 306,
                                                            columnNumber: 100
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            children: "Balance"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/parties/page.tsx",
                                                            lineNumber: 306,
                                                            columnNumber: 113
                                                        }, this),
                                                        company?.loyaltyPointsEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            children: "Loyalty Points"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/parties/page.tsx",
                                                            lineNumber: 306,
                                                            columnNumber: 163
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            children: "Actions"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/parties/page.tsx",
                                                            lineNumber: 306,
                                                            columnNumber: 187
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                    lineNumber: 306,
                                                    columnNumber: 44
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/parties/page.tsx",
                                                lineNumber: 306,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                children: filtered.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    fontWeight: 700,
                                                                    color: '#1A1A2E'
                                                                },
                                                                children: p.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/parties/page.tsx",
                                                                lineNumber: 310,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                    href: `tel:${p.phone}`,
                                                                    style: {
                                                                        color: '#4285F4',
                                                                        textDecoration: 'none',
                                                                        fontSize: 13
                                                                    },
                                                                    children: p.phone
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                                    lineNumber: 311,
                                                                    columnNumber: 53
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/parties/page.tsx",
                                                                lineNumber: 311,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    fontFamily: 'monospace',
                                                                    fontSize: 11,
                                                                    color: '#718096'
                                                                },
                                                                children: p.gstNumber || '—'
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/parties/page.tsx",
                                                                lineNumber: 312,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: `badge ${p.type === 'customer' ? 'badge-green' : p.type === 'supplier' ? 'badge-blue' : 'badge-gray'}`,
                                                                    style: {
                                                                        textTransform: 'capitalize'
                                                                    },
                                                                    children: p.type
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                                    lineNumber: 314,
                                                                    columnNumber: 53
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/parties/page.tsx",
                                                                lineNumber: 313,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    fontSize: 12,
                                                                    color: '#718096'
                                                                },
                                                                children: p.city || '—'
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/parties/page.tsx",
                                                                lineNumber: 316,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    fontWeight: 800,
                                                                    color: p.balance > 0 ? '#34A853' : p.balance < 0 ? '#EA4335' : '#CBD5E0'
                                                                },
                                                                children: p.balance > 0 ? `↑ ₹${p.balance.toLocaleString('en-IN')}` : p.balance < 0 ? `↓ ₹${Math.abs(p.balance).toLocaleString('en-IN')}` : '—'
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/parties/page.tsx",
                                                                lineNumber: 317,
                                                                columnNumber: 49
                                                            }, this),
                                                            company?.loyaltyPointsEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    fontWeight: 700,
                                                                    color: '#2F855A'
                                                                },
                                                                children: [
                                                                    p.loyaltyPoints || 0,
                                                                    " pts"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/parties/page.tsx",
                                                                lineNumber: 321,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        display: 'flex',
                                                                        gap: 8
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                            href: `tel:${p.phone}`,
                                                                            className: "btn btn-ghost",
                                                                            style: {
                                                                                padding: 0,
                                                                                width: 36,
                                                                                height: 36,
                                                                                display: 'inline-flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'center',
                                                                                background: '#E6F4EA',
                                                                                borderRadius: '50%',
                                                                                minWidth: 'auto'
                                                                            },
                                                                            title: "Call",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                                                size: 16,
                                                                                color: "#34A853"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/company/parties/page.tsx",
                                                                                lineNumber: 325,
                                                                                columnNumber: 303
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/company/parties/page.tsx",
                                                                            lineNumber: 325,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                            href: `https://wa.me/91${p.phone.replace(/\D/g, '')}`,
                                                                            target: "_blank",
                                                                            className: "btn btn-ghost",
                                                                            style: {
                                                                                padding: 0,
                                                                                width: 36,
                                                                                height: 36,
                                                                                display: 'inline-flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'center',
                                                                                background: '#E6F4EA',
                                                                                borderRadius: '50%',
                                                                                minWidth: 'auto'
                                                                            },
                                                                            title: "WhatsApp",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                                                size: 16,
                                                                                color: "#25D366"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/company/parties/page.tsx",
                                                                                lineNumber: 326,
                                                                                columnNumber: 354
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/company/parties/page.tsx",
                                                                            lineNumber: 326,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>openPaymentModal(p),
                                                                            className: "btn btn-ghost",
                                                                            style: {
                                                                                padding: 0,
                                                                                width: 36,
                                                                                height: 36,
                                                                                display: 'inline-flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'center',
                                                                                background: '#F3E8FF',
                                                                                borderRadius: '50%',
                                                                                minWidth: 'auto'
                                                                            },
                                                                            title: "Record Payment",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$indian$2d$rupee$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IndianRupee$3e$__["IndianRupee"], {
                                                                                size: 16,
                                                                                color: "#9333EA"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/company/parties/page.tsx",
                                                                                lineNumber: 327,
                                                                                columnNumber: 330
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/company/parties/page.tsx",
                                                                            lineNumber: 327,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>{
                                                                                setHistoryParty(p);
                                                                                setHistoryTab('payments');
                                                                            },
                                                                            className: "btn btn-ghost",
                                                                            style: {
                                                                                padding: 0,
                                                                                width: 36,
                                                                                height: 36,
                                                                                display: 'inline-flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'center',
                                                                                background: '#FEF3C7',
                                                                                borderRadius: '50%',
                                                                                minWidth: 'auto'
                                                                            },
                                                                            title: "Payment History",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
                                                                                size: 16,
                                                                                color: "#F59E0B"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/company/parties/page.tsx",
                                                                                lineNumber: 328,
                                                                                columnNumber: 362
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/company/parties/page.tsx",
                                                                            lineNumber: 328,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>openEdit(p),
                                                                            className: "btn btn-ghost",
                                                                            style: {
                                                                                padding: 0,
                                                                                width: 36,
                                                                                height: 36,
                                                                                display: 'inline-flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'center',
                                                                                background: '#E8F0FE',
                                                                                borderRadius: '50%',
                                                                                minWidth: 'auto'
                                                                            },
                                                                            title: "Edit",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__["Edit2"], {
                                                                                size: 16,
                                                                                color: "#4285F4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/company/parties/page.tsx",
                                                                                lineNumber: 329,
                                                                                columnNumber: 312
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/company/parties/page.tsx",
                                                                            lineNumber: 329,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>handleDelete(p.id),
                                                                            className: "btn btn-ghost",
                                                                            style: {
                                                                                padding: 0,
                                                                                width: 36,
                                                                                height: 36,
                                                                                display: 'inline-flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'center',
                                                                                background: '#FCE8E6',
                                                                                borderRadius: '50%',
                                                                                minWidth: 'auto'
                                                                            },
                                                                            title: "Delete",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                                size: 16,
                                                                                color: "#EA4335"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/company/parties/page.tsx",
                                                                                lineNumber: 330,
                                                                                columnNumber: 321
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/company/parties/page.tsx",
                                                                            lineNumber: 330,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                                    lineNumber: 324,
                                                                    columnNumber: 53
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/parties/page.tsx",
                                                                lineNumber: 323,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, p.id, true, {
                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                        lineNumber: 309,
                                                        columnNumber: 45
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/parties/page.tsx",
                                                lineNumber: 307,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/parties/page.tsx",
                                        lineNumber: 305,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/company/parties/page.tsx",
                                    lineNumber: 304,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mobile-list",
                                    children: filtered.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 12,
                                                padding: '13px 16px',
                                                borderBottom: '1px solid #F8F9FA'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        width: 42,
                                                        height: 42,
                                                        borderRadius: 12,
                                                        background: p.type === 'customer' ? '#E6F4EA' : '#E8F0FE',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontWeight: 900,
                                                        fontSize: 16,
                                                        color: p.type === 'customer' ? '#137333' : '#1967D2',
                                                        flexShrink: 0
                                                    },
                                                    children: p.name[0]
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                    lineNumber: 341,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        flex: 1,
                                                        minWidth: 0
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            style: {
                                                                fontWeight: 700,
                                                                fontSize: 13,
                                                                color: '#1A1A2E',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                whiteSpace: 'nowrap'
                                                            },
                                                            children: p.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/parties/page.tsx",
                                                            lineNumber: 345,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                gap: 6,
                                                                alignItems: 'center'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontSize: 11,
                                                                        color: '#A0AEC0'
                                                                    },
                                                                    children: p.phone
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                                    lineNumber: 347,
                                                                    columnNumber: 49
                                                                }, this),
                                                                company?.loyaltyPointsEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontSize: 11,
                                                                        color: '#2F855A',
                                                                        fontWeight: 600
                                                                    },
                                                                    children: [
                                                                        "🌟 ",
                                                                        p.loyaltyPoints || 0,
                                                                        " pts"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                                    lineNumber: 349,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/parties/page.tsx",
                                                            lineNumber: 346,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                    lineNumber: 344,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        textAlign: 'right',
                                                        flexShrink: 0
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            style: {
                                                                fontWeight: 800,
                                                                fontSize: 13,
                                                                color: p.balance > 0 ? '#34A853' : p.balance < 0 ? '#EA4335' : '#CBD5E0'
                                                            },
                                                            children: p.balance !== 0 ? `₹${Math.abs(p.balance).toLocaleString('en-IN')}` : '—'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/parties/page.tsx",
                                                            lineNumber: 354,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                gap: 8,
                                                                marginTop: 6,
                                                                justifyContent: 'flex-end',
                                                                alignItems: 'center'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                    href: `tel:${p.phone}`,
                                                                    style: {
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        background: '#E6F4EA',
                                                                        border: 'none',
                                                                        padding: 0,
                                                                        borderRadius: '50%',
                                                                        width: 32,
                                                                        height: 32
                                                                    },
                                                                    title: "Call",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                                        size: 15,
                                                                        color: "#34A853"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                                        lineNumber: 358,
                                                                        columnNumber: 260
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                                    lineNumber: 358,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                    href: `https://wa.me/91${p.phone.replace(/\D/g, '')}`,
                                                                    target: "_blank",
                                                                    style: {
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        background: '#E6F4EA',
                                                                        border: 'none',
                                                                        padding: 0,
                                                                        borderRadius: '50%',
                                                                        width: 32,
                                                                        height: 32
                                                                    },
                                                                    title: "WhatsApp",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                                        size: 15,
                                                                        color: "#25D366"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                                        lineNumber: 359,
                                                                        columnNumber: 311
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                                    lineNumber: 359,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>openPaymentModal(p),
                                                                    style: {
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        background: '#F3E8FF',
                                                                        border: 'none',
                                                                        cursor: 'pointer',
                                                                        padding: 0,
                                                                        borderRadius: '50%',
                                                                        width: 32,
                                                                        height: 32
                                                                    },
                                                                    title: "Record Payment",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$indian$2d$rupee$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IndianRupee$3e$__["IndianRupee"], {
                                                                        size: 15,
                                                                        color: "#9333EA"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                                        lineNumber: 360,
                                                                        columnNumber: 306
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                                    lineNumber: 360,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>{
                                                                        setHistoryParty(p);
                                                                        setHistoryTab('payments');
                                                                    },
                                                                    style: {
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        background: '#FEF3C7',
                                                                        border: 'none',
                                                                        cursor: 'pointer',
                                                                        padding: 0,
                                                                        borderRadius: '50%',
                                                                        width: 32,
                                                                        height: 32
                                                                    },
                                                                    title: "Payment History",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
                                                                        size: 15,
                                                                        color: "#F59E0B"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                                        lineNumber: 361,
                                                                        columnNumber: 338
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                                    lineNumber: 361,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>openEdit(p),
                                                                    style: {
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        background: '#E8F0FE',
                                                                        border: 'none',
                                                                        cursor: 'pointer',
                                                                        padding: 0,
                                                                        borderRadius: '50%',
                                                                        width: 32,
                                                                        height: 32
                                                                    },
                                                                    title: "Edit",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__["Edit2"], {
                                                                        size: 15,
                                                                        color: "#4285F4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                                        lineNumber: 362,
                                                                        columnNumber: 288
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                                    lineNumber: 362,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/parties/page.tsx",
                                                            lineNumber: 357,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                    lineNumber: 353,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, p.id, true, {
                                            fileName: "[project]/app/company/parties/page.tsx",
                                            lineNumber: 340,
                                            columnNumber: 37
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/company/parties/page.tsx",
                                    lineNumber: 338,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/app/company/parties/page.tsx",
                        lineNumber: 293,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/parties/page.tsx",
                lineNumber: 253,
                columnNumber: 13
            }, this),
            paymentParty && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "modal-overlay",
                onClick: ()=>setPaymentParty(null),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modal-box",
                    onClick: (e)=>e.stopPropagation(),
                    style: {
                        maxWidth: 420
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '16px 20px 12px',
                                borderBottom: '1px solid #E1E4E8',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            style: {
                                                fontWeight: 900,
                                                fontSize: 16,
                                                color: '#1A1A2E',
                                                margin: 0
                                            },
                                            children: "Record Payment"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/parties/page.tsx",
                                            lineNumber: 379,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 12,
                                                color: '#718096',
                                                margin: '2px 0 0'
                                            },
                                            children: [
                                                paymentParty.name,
                                                " — Balance: ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    style: {
                                                        color: paymentParty.balance > 0 ? '#34A853' : paymentParty.balance < 0 ? '#EA4335' : '#718096'
                                                    },
                                                    children: paymentParty.balance > 0 ? `↑ ₹${paymentParty.balance.toLocaleString('en-IN')}` : paymentParty.balance < 0 ? `↓ ₹${Math.abs(paymentParty.balance).toLocaleString('en-IN')}` : 'Settled'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                    lineNumber: 381,
                                                    columnNumber: 68
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/parties/page.tsx",
                                            lineNumber: 380,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/parties/page.tsx",
                                    lineNumber: 378,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setPaymentParty(null),
                                    className: "btn btn-ghost btn-icon",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/parties/page.tsx",
                                        lineNumber: 384,
                                        columnNumber: 110
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/company/parties/page.tsx",
                                    lineNumber: 384,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/parties/page.tsx",
                            lineNumber: 377,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '16px 20px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 14
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                fontSize: 11,
                                                fontWeight: 700,
                                                color: '#4A5568',
                                                textTransform: 'uppercase',
                                                display: 'block',
                                                marginBottom: 6
                                            },
                                            children: "Payment Type"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/parties/page.tsx",
                                            lineNumber: 388,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                gap: 8,
                                                background: '#EDF2F7',
                                                padding: 4,
                                                borderRadius: 10
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setPayForm((f)=>({
                                                                ...f,
                                                                type: 'received'
                                                            })),
                                                    style: {
                                                        flex: 1,
                                                        padding: '8px',
                                                        borderRadius: 8,
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        fontWeight: 800,
                                                        fontSize: 12,
                                                        background: payForm.type === 'received' ? '#10B981' : 'transparent',
                                                        color: payForm.type === 'received' ? 'white' : '#718096',
                                                        transition: 'all 0.15s'
                                                    },
                                                    children: "Received (Cash In)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                    lineNumber: 390,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setPayForm((f)=>({
                                                                ...f,
                                                                type: 'paid'
                                                            })),
                                                    style: {
                                                        flex: 1,
                                                        padding: '8px',
                                                        borderRadius: 8,
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        fontWeight: 800,
                                                        fontSize: 12,
                                                        background: payForm.type === 'paid' ? '#EF4444' : 'transparent',
                                                        color: payForm.type === 'paid' ? 'white' : '#718096',
                                                        transition: 'all 0.15s'
                                                    },
                                                    children: "Paid (Cash Out)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                    lineNumber: 394,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/parties/page.tsx",
                                            lineNumber: 389,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/parties/page.tsx",
                                    lineNumber: 387,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: 12
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: {
                                                        fontSize: 11,
                                                        fontWeight: 700,
                                                        color: '#4A5568',
                                                        textTransform: 'uppercase',
                                                        display: 'block',
                                                        marginBottom: 5
                                                    },
                                                    children: "Amount ₹ *"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                    lineNumber: 402,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    className: "e-input",
                                                    placeholder: "0.00",
                                                    value: payForm.amount,
                                                    onChange: (e)=>setPayForm((f)=>({
                                                                ...f,
                                                                amount: e.target.value
                                                            })),
                                                    style: {
                                                        padding: '10px 12px'
                                                    },
                                                    autoFocus: true
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                    lineNumber: 403,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/parties/page.tsx",
                                            lineNumber: 401,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: {
                                                        fontSize: 11,
                                                        fontWeight: 700,
                                                        color: '#4A5568',
                                                        textTransform: 'uppercase',
                                                        display: 'block',
                                                        marginBottom: 5
                                                    },
                                                    children: "Date *"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                    lineNumber: 406,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "date",
                                                    className: "e-input",
                                                    value: payForm.date,
                                                    onChange: (e)=>setPayForm((f)=>({
                                                                ...f,
                                                                date: e.target.value
                                                            })),
                                                    style: {
                                                        padding: '10px 12px'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                    lineNumber: 407,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/parties/page.tsx",
                                            lineNumber: 405,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/parties/page.tsx",
                                    lineNumber: 400,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                fontSize: 11,
                                                fontWeight: 700,
                                                color: '#4A5568',
                                                textTransform: 'uppercase',
                                                display: 'block',
                                                marginBottom: 6
                                            },
                                            children: "Method"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/parties/page.tsx",
                                            lineNumber: 411,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                gap: 6,
                                                flexWrap: 'wrap'
                                            },
                                            children: [
                                                'cash',
                                                'upi',
                                                'bank',
                                                'cheque',
                                                'neft',
                                                'rtgs',
                                                'other'
                                            ].map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setPayForm((f)=>({
                                                                ...f,
                                                                method: m
                                                            })),
                                                    style: {
                                                        padding: '6px 12px',
                                                        borderRadius: 8,
                                                        border: '1.5px solid',
                                                        fontSize: 11,
                                                        fontWeight: 700,
                                                        cursor: 'pointer',
                                                        textTransform: 'uppercase',
                                                        background: payForm.method === m ? '#9333EA' : 'white',
                                                        color: payForm.method === m ? 'white' : '#718096',
                                                        borderColor: payForm.method === m ? '#9333EA' : '#E2E8F0'
                                                    },
                                                    children: m
                                                }, m, false, {
                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                    lineNumber: 414,
                                                    columnNumber: 41
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/parties/page.tsx",
                                            lineNumber: 412,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/parties/page.tsx",
                                    lineNumber: 410,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                fontSize: 11,
                                                fontWeight: 700,
                                                color: '#4A5568',
                                                textTransform: 'uppercase',
                                                display: 'block',
                                                marginBottom: 5
                                            },
                                            children: "Note"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/parties/page.tsx",
                                            lineNumber: 422,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            className: "e-input",
                                            placeholder: "e.g. Cheque no. 123456",
                                            value: payForm.note,
                                            onChange: (e)=>setPayForm((f)=>({
                                                        ...f,
                                                        note: e.target.value
                                                    })),
                                            style: {
                                                padding: '10px 12px'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/parties/page.tsx",
                                            lineNumber: 423,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/parties/page.tsx",
                                    lineNumber: 421,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/parties/page.tsx",
                            lineNumber: 386,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '12px 20px 16px',
                                borderTop: '1px solid #E1E4E8',
                                display: 'flex',
                                gap: 8,
                                justifyContent: 'flex-end'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setPaymentParty(null),
                                    className: "btn btn-outline",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/company/parties/page.tsx",
                                    lineNumber: 427,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleAddPayment,
                                    style: {
                                        background: 'linear-gradient(135deg,#7C3AED,#9333EA)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: 10,
                                        padding: '10px 20px',
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                            size: 14
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/parties/page.tsx",
                                            lineNumber: 429,
                                            columnNumber: 33
                                        }, this),
                                        " Save Payment"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/parties/page.tsx",
                                    lineNumber: 428,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/parties/page.tsx",
                            lineNumber: 426,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/company/parties/page.tsx",
                    lineNumber: 376,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/company/parties/page.tsx",
                lineNumber: 375,
                columnNumber: 17
            }, this),
            historyParty && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "modal-overlay",
                onClick: ()=>setHistoryParty(null),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: (e)=>e.stopPropagation(),
                    style: {
                        position: 'fixed',
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: '100%',
                        maxWidth: 460,
                        background: 'white',
                        boxShadow: '-8px 0 40px rgba(0,0,0,0.12)',
                        display: 'flex',
                        flexDirection: 'column',
                        zIndex: 60
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '20px 24px 16px',
                                background: 'linear-gradient(135deg,#1E293B,#0F172A)',
                                color: 'white'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        marginBottom: 16
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontSize: 11,
                                                        fontWeight: 700,
                                                        color: '#94A3B8',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.06em',
                                                        margin: '0 0 4px'
                                                    },
                                                    children: "Customer Ledger & History"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                    lineNumber: 443,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    style: {
                                                        fontSize: 20,
                                                        fontWeight: 900,
                                                        margin: '0 0 2px'
                                                    },
                                                    children: historyParty.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                    lineNumber: 444,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontSize: 12,
                                                        color: '#94A3B8',
                                                        margin: 0
                                                    },
                                                    children: historyParty.phone
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                    lineNumber: 445,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/parties/page.tsx",
                                            lineNumber: 442,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setHistoryParty(null),
                                            style: {
                                                background: 'rgba(255,255,255,0.1)',
                                                border: 'none',
                                                borderRadius: 8,
                                                padding: 8,
                                                cursor: 'pointer',
                                                color: 'white',
                                                display: 'flex'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/parties/page.tsx",
                                                lineNumber: 447,
                                                columnNumber: 224
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/parties/page.tsx",
                                            lineNumber: 447,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/parties/page.tsx",
                                    lineNumber: 441,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: 10
                                    },
                                    children: [
                                        {
                                            label: 'Current Balance',
                                            value: `₹${Math.abs(historyParty.balance).toLocaleString('en-IN')}`,
                                            sub: historyParty.balance > 0 ? 'To Receive' : historyParty.balance < 0 ? 'To Pay' : 'Settled',
                                            color: historyParty.balance > 0 ? '#4ADE80' : historyParty.balance < 0 ? '#F87171' : '#94A3B8'
                                        },
                                        {
                                            label: 'Total Repaid',
                                            value: `₹${(historyParty.paymentHistory || []).reduce((a, h)=>a + h.amount, 0).toLocaleString('en-IN')}`,
                                            sub: `${(historyParty.paymentHistory || []).length} entries`,
                                            color: '#4ADE80'
                                        }
                                    ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                background: 'rgba(255,255,255,0.08)',
                                                borderRadius: 12,
                                                padding: '10px 14px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontSize: 10,
                                                        color: '#94A3B8',
                                                        fontWeight: 700,
                                                        textTransform: 'uppercase',
                                                        margin: '0 0 3px'
                                                    },
                                                    children: s.label
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                    lineNumber: 453,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontSize: 18,
                                                        fontWeight: 900,
                                                        margin: 0,
                                                        color: s.color
                                                    },
                                                    children: s.value
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                    lineNumber: 454,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontSize: 10,
                                                        color: '#64748B',
                                                        margin: '2px 0 0',
                                                        fontWeight: 600
                                                    },
                                                    children: s.sub
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                    lineNumber: 455,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, s.label, true, {
                                            fileName: "[project]/app/company/parties/page.tsx",
                                            lineNumber: 452,
                                            columnNumber: 37
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/company/parties/page.tsx",
                                    lineNumber: 450,
                                    columnNumber: 29
                                }, this),
                                company?.loyaltyPointsEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                                        marginTop: 16
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setHistoryTab('payments'),
                                            style: {
                                                flex: 1,
                                                padding: '10px 0',
                                                border: 'none',
                                                background: 'transparent',
                                                color: historyTab === 'payments' ? '#4ADE80' : '#94A3B8',
                                                fontWeight: 800,
                                                borderBottom: historyTab === 'payments' ? '3px solid #4ADE80' : 'none',
                                                cursor: 'pointer',
                                                fontSize: 12
                                            },
                                            children: "💳 Payments"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/parties/page.tsx",
                                            lineNumber: 462,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setHistoryTab('loyalty'),
                                            style: {
                                                flex: 1,
                                                padding: '10px 0',
                                                border: 'none',
                                                background: 'transparent',
                                                color: historyTab === 'loyalty' ? '#FBBF24' : '#94A3B8',
                                                fontWeight: 800,
                                                borderBottom: historyTab === 'loyalty' ? '3px solid #FBBF24' : 'none',
                                                cursor: 'pointer',
                                                fontSize: 12
                                            },
                                            children: "🌟 Loyalty History"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/parties/page.tsx",
                                            lineNumber: 472,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/parties/page.tsx",
                                    lineNumber: 461,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/parties/page.tsx",
                            lineNumber: 440,
                            columnNumber: 25
                        }, this),
                        historyTab === 'loyalty' && company?.loyaltyPointsEnabled ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    overflowY: 'auto'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            margin: '16px 20px',
                                            padding: '16px',
                                            background: '#FEF3C7',
                                            borderRadius: 14,
                                            border: '1px solid #FDE68A',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 10,
                                                            color: '#D97706',
                                                            fontWeight: 800,
                                                            textTransform: 'uppercase',
                                                            margin: '0 0 3px'
                                                        },
                                                        children: "Current Loyalty Points"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                        lineNumber: 491,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 24,
                                                            fontWeight: 900,
                                                            color: '#92400E',
                                                            margin: 0
                                                        },
                                                        children: [
                                                            historyParty.loyaltyPoints || 0,
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: 13,
                                                                    fontWeight: 700
                                                                },
                                                                children: "pts"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/parties/page.tsx",
                                                                lineNumber: 493,
                                                                columnNumber: 83
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                        lineNumber: 492,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/parties/page.tsx",
                                                lineNumber: 490,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setLoyaltyAdjustParty(historyParty),
                                                style: {
                                                    padding: '8px 14px',
                                                    background: '#D97706',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: 10,
                                                    fontSize: 12,
                                                    fontWeight: 800,
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 4,
                                                    transition: 'background 0.15s'
                                                },
                                                children: "Adjust Points"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/parties/page.tsx",
                                                lineNumber: 496,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/parties/page.tsx",
                                        lineNumber: 489,
                                        columnNumber: 37
                                    }, this),
                                    customerLoyaltyInvoices.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            textAlign: 'center',
                                            padding: '60px 20px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
                                                size: 40,
                                                style: {
                                                    color: '#E2E8F0',
                                                    margin: '0 auto 12px'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/parties/page.tsx",
                                                lineNumber: 508,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    color: '#A0AEC0',
                                                    fontSize: 14,
                                                    fontWeight: 600,
                                                    margin: '0 0 4px'
                                                },
                                                children: "No loyalty points transactions"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/parties/page.tsx",
                                                lineNumber: 509,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    color: '#CBD5E0',
                                                    fontSize: 12
                                                },
                                                children: "Points are earned or redeemed during sales billing"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/parties/page.tsx",
                                                lineNumber: 510,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/parties/page.tsx",
                                        lineNumber: 507,
                                        columnNumber: 41
                                    }, this) : customerLoyaltyInvoices.map((inv)=>{
                                        const earned = inv.pointsEarned || 0;
                                        const redeemed = inv.pointsRedeemed || 0;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                padding: '14px 20px',
                                                borderBottom: '1px solid #F8FAFC',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            style: {
                                                                fontSize: 13,
                                                                fontWeight: 700,
                                                                color: '#1E293B',
                                                                margin: '0 0 2px'
                                                            },
                                                            children: inv.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/parties/page.tsx",
                                                            lineNumber: 519,
                                                            columnNumber: 57
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            style: {
                                                                fontSize: 11,
                                                                color: '#64748B',
                                                                margin: '0 0 4px',
                                                                fontWeight: 600
                                                            },
                                                            children: [
                                                                new Date(inv.date).toLocaleDateString('en-IN', {
                                                                    weekday: 'short',
                                                                    day: 'numeric',
                                                                    month: 'short',
                                                                    year: 'numeric'
                                                                }),
                                                                " ",
                                                                inv.time && inv.time !== '00:00' ? `· ${inv.time}` : ''
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/parties/page.tsx",
                                                            lineNumber: 522,
                                                            columnNumber: 57
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            style: {
                                                                fontSize: 11,
                                                                color: '#94A3B8',
                                                                margin: 0
                                                            },
                                                            children: inv.subTitle
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/parties/page.tsx",
                                                            lineNumber: 525,
                                                            columnNumber: 57
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                    lineNumber: 518,
                                                    columnNumber: 53
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        textAlign: 'right'
                                                    },
                                                    children: [
                                                        earned > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            style: {
                                                                fontSize: 14,
                                                                fontWeight: 900,
                                                                color: '#059669',
                                                                margin: 0
                                                            },
                                                            children: [
                                                                "+",
                                                                earned,
                                                                " pts"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/parties/page.tsx",
                                                            lineNumber: 531,
                                                            columnNumber: 61
                                                        }, this),
                                                        redeemed > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            style: {
                                                                fontSize: 14,
                                                                fontWeight: 900,
                                                                color: '#DC2626',
                                                                margin: 0
                                                            },
                                                            children: [
                                                                "-",
                                                                redeemed,
                                                                " pts"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/parties/page.tsx",
                                                            lineNumber: 536,
                                                            columnNumber: 61
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                    lineNumber: 529,
                                                    columnNumber: 53
                                                }, this)
                                            ]
                                        }, inv.id, true, {
                                            fileName: "[project]/app/company/parties/page.tsx",
                                            lineNumber: 517,
                                            columnNumber: 49
                                        }, this);
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/parties/page.tsx",
                                lineNumber: 488,
                                columnNumber: 33
                            }, this)
                        }, void 0, false) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: '10px 16px',
                                        borderBottom: '1px solid #F1F5F9',
                                        background: '#FAFBFF'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            openPaymentModal(historyParty);
                                            setHistoryParty(null);
                                        },
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 6,
                                            padding: '9px 16px',
                                            borderRadius: 10,
                                            background: '#9333EA',
                                            color: 'white',
                                            border: 'none',
                                            fontWeight: 800,
                                            fontSize: 12,
                                            cursor: 'pointer'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$indian$2d$rupee$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IndianRupee$3e$__["IndianRupee"], {
                                                size: 13
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/parties/page.tsx",
                                                lineNumber: 551,
                                                columnNumber: 41
                                            }, this),
                                            " Record New Payment"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/parties/page.tsx",
                                        lineNumber: 550,
                                        columnNumber: 37
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/company/parties/page.tsx",
                                    lineNumber: 549,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        flex: 1,
                                        overflowY: 'auto'
                                    },
                                    children: (historyParty.paymentHistory || []).length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            textAlign: 'center',
                                            padding: '60px 20px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
                                                size: 40,
                                                style: {
                                                    color: '#E2E8F0',
                                                    margin: '0 auto 12px'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/parties/page.tsx",
                                                lineNumber: 557,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    color: '#A0AEC0',
                                                    fontSize: 14,
                                                    fontWeight: 600,
                                                    margin: '0 0 4px'
                                                },
                                                children: "No payment history yet"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/parties/page.tsx",
                                                lineNumber: 558,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    color: '#CBD5E0',
                                                    fontSize: 12
                                                },
                                                children: "Record the first payment above"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/parties/page.tsx",
                                                lineNumber: 559,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/parties/page.tsx",
                                        lineNumber: 556,
                                        columnNumber: 41
                                    }, this) : (historyParty.paymentHistory || []).map((entry, idx, arr)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                padding: '14px 20px',
                                                borderBottom: '1px solid #F8FAFC',
                                                display: 'flex',
                                                gap: 12,
                                                alignItems: 'flex-start'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        paddingTop: 3,
                                                        flexShrink: 0
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                width: 10,
                                                                height: 10,
                                                                borderRadius: '50%',
                                                                background: (entry.type || 'received') === 'received' ? '#10B981' : '#EF4444'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/parties/page.tsx",
                                                            lineNumber: 564,
                                                            columnNumber: 49
                                                        }, this),
                                                        idx < arr.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                width: 2,
                                                                background: '#F1F5F9',
                                                                flex: 1,
                                                                minHeight: 28,
                                                                marginTop: 4
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/parties/page.tsx",
                                                            lineNumber: 565,
                                                            columnNumber: 74
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                    lineNumber: 563,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        flex: 1
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'flex-start'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        style: {
                                                                            fontSize: 16,
                                                                            fontWeight: 900,
                                                                            color: (entry.type || 'received') === 'received' ? '#059669' : '#DC2626',
                                                                            margin: '0 0 2px'
                                                                        },
                                                                        children: [
                                                                            (entry.type || 'received') === 'received' ? '+' : '-',
                                                                            "₹",
                                                                            entry.amount.toLocaleString('en-IN')
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                                        lineNumber: 570,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        style: {
                                                                            fontSize: 11,
                                                                            fontWeight: 800,
                                                                            color: (entry.type || 'received') === 'received' ? '#10B981' : '#EF4444',
                                                                            textTransform: 'uppercase',
                                                                            margin: '0 0 4px',
                                                                            letterSpacing: '0.03em'
                                                                        },
                                                                        children: (entry.type || 'received') === 'received' ? 'Received (Cash In)' : 'Paid (Cash Out)'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                                        lineNumber: 573,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        style: {
                                                                            fontSize: 12,
                                                                            color: '#64748B',
                                                                            margin: '0 0 5px',
                                                                            fontWeight: 600
                                                                        },
                                                                        children: new Date(entry.date).toLocaleDateString('en-IN', {
                                                                            weekday: 'short',
                                                                            day: 'numeric',
                                                                            month: 'short',
                                                                            year: 'numeric'
                                                                        })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                                        lineNumber: 576,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            background: '#F3E8FF',
                                                                            color: '#7C3AED',
                                                                            fontSize: 10,
                                                                            fontWeight: 800,
                                                                            padding: '2px 8px',
                                                                            borderRadius: 6,
                                                                            textTransform: 'uppercase'
                                                                        },
                                                                        children: entry.method
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                                        lineNumber: 577,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    entry.note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        style: {
                                                                            fontSize: 11,
                                                                            color: '#94A3B8',
                                                                            margin: '5px 0 0',
                                                                            fontStyle: 'italic'
                                                                        },
                                                                        children: [
                                                                            '"',
                                                                            entry.note,
                                                                            '"'
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                                        lineNumber: 578,
                                                                        columnNumber: 72
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/parties/page.tsx",
                                                                lineNumber: 569,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    textAlign: 'right',
                                                                    flexShrink: 0
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        style: {
                                                                            fontSize: 10,
                                                                            color: '#CBD5E0',
                                                                            fontWeight: 600,
                                                                            margin: '0 0 1px'
                                                                        },
                                                                        children: "Balance after"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                                        lineNumber: 581,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        style: {
                                                                            fontSize: 13,
                                                                            fontWeight: 800,
                                                                            color: '#1E293B',
                                                                            margin: '0 0 4px'
                                                                        },
                                                                        children: [
                                                                            "₹",
                                                                            Math.abs(entry.balanceAfter).toLocaleString('en-IN')
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                                        lineNumber: 582,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: async ()=>{
                                                                            const { confirm } = await __turbopack_context__.A("[project]/components/ConfirmDialog.tsx [app-client] (ecmascript, async loader)");
                                                                            const ok = await confirm({
                                                                                message: 'Delete entry? Balance will be reversed.',
                                                                                danger: true
                                                                            });
                                                                            if (ok) {
                                                                                deleteBalancePayment(historyParty.id, entry.id);
                                                                                const adjusted = (entry.type || 'received') === 'received' ? historyParty.balance + entry.amount : historyParty.balance - entry.amount;
                                                                                setHistoryParty((prev)=>prev ? {
                                                                                        ...prev,
                                                                                        balance: adjusted,
                                                                                        paymentHistory: (prev.paymentHistory || []).filter((h)=>h.id !== entry.id)
                                                                                    } : null);
                                                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Entry deleted');
                                                                            }
                                                                        },
                                                                        style: {
                                                                            background: 'none',
                                                                            border: 'none',
                                                                            cursor: 'pointer',
                                                                            opacity: 0.45,
                                                                            padding: 2
                                                                        },
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                            size: 11,
                                                                            color: "#EA4335"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/company/parties/page.tsx",
                                                                            lineNumber: 583,
                                                                            columnNumber: 719
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                                        lineNumber: 583,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/parties/page.tsx",
                                                                lineNumber: 580,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                        lineNumber: 568,
                                                        columnNumber: 49
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                    lineNumber: 567,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, entry.id, true, {
                                            fileName: "[project]/app/company/parties/page.tsx",
                                            lineNumber: 562,
                                            columnNumber: 41
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/company/parties/page.tsx",
                                    lineNumber: 554,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/company/parties/page.tsx",
                    lineNumber: 439,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/company/parties/page.tsx",
                lineNumber: 438,
                columnNumber: 17
            }, this),
            showAdd && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "modal-overlay",
                onClick: ()=>setShowAdd(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modal-box",
                    onClick: (e)=>e.stopPropagation(),
                    style: {
                        maxWidth: 540,
                        maxHeight: '90dvh',
                        display: 'flex',
                        flexDirection: 'column'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '18px 24px 14px',
                                borderBottom: '1px solid #E1E4E8',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    style: {
                                        fontWeight: 900,
                                        fontSize: 17,
                                        color: '#1A1A2E'
                                    },
                                    children: editParty ? 'Edit Party' : 'Add New Party'
                                }, void 0, false, {
                                    fileName: "[project]/app/company/parties/page.tsx",
                                    lineNumber: 601,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setShowAdd(false);
                                        setEditParty(null);
                                    },
                                    className: "btn btn-ghost btn-icon",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/parties/page.tsx",
                                        lineNumber: 602,
                                        columnNumber: 131
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/company/parties/page.tsx",
                                    lineNumber: 602,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/parties/page.tsx",
                            lineNumber: 600,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                overflowY: 'auto',
                                flex: 1,
                                padding: '18px 24px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 14
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            fontSize: 11,
                                            fontWeight: 700,
                                            color: '#4A5568',
                                            display: 'block',
                                            marginBottom: 8,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em'
                                        },
                                        children: "Party Type *"
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/parties/page.tsx",
                                        lineNumber: 606,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            gap: 8,
                                            background: '#EDF2F7',
                                            padding: 4,
                                            borderRadius: 10,
                                            marginBottom: 16
                                        },
                                        children: [
                                            'customer',
                                            'supplier',
                                            'both'
                                        ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>up('type', t),
                                                style: {
                                                    flex: 1,
                                                    padding: '8px',
                                                    borderRadius: 8,
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    textTransform: 'capitalize',
                                                    fontWeight: 800,
                                                    fontSize: 13,
                                                    transition: 'all 0.15s',
                                                    background: form.type === t ? 'white' : 'transparent',
                                                    color: form.type === t ? '#1967D2' : '#718096',
                                                    boxShadow: form.type === t ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
                                                },
                                                children: t
                                            }, t, false, {
                                                fileName: "[project]/app/company/parties/page.tsx",
                                                lineNumber: 609,
                                                columnNumber: 41
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/parties/page.tsx",
                                        lineNumber: 607,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                                            gap: 16
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: {
                                                            fontSize: 11,
                                                            fontWeight: 700,
                                                            color: '#4A5568',
                                                            display: 'block',
                                                            marginBottom: 5,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.05em'
                                                        },
                                                        children: "Name *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                        lineNumber: 617,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "e-input",
                                                        placeholder: "Full name",
                                                        value: form.name,
                                                        onChange: (e)=>up('name', e.target.value),
                                                        style: {
                                                            padding: '10px 14px'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                        lineNumber: 618,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/parties/page.tsx",
                                                lineNumber: 616,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: {
                                                            fontSize: 11,
                                                            fontWeight: 700,
                                                            color: '#4A5568',
                                                            display: 'block',
                                                            marginBottom: 5,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.05em'
                                                        },
                                                        children: "Phone *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                        lineNumber: 621,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "e-input",
                                                        placeholder: "+91 98765 43210",
                                                        value: form.phone,
                                                        onChange: (e)=>up('phone', e.target.value),
                                                        style: {
                                                            padding: '10px 14px'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                        lineNumber: 622,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/parties/page.tsx",
                                                lineNumber: 620,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: {
                                                            fontSize: 11,
                                                            fontWeight: 700,
                                                            color: '#4A5568',
                                                            display: 'block',
                                                            marginBottom: 5,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.05em'
                                                        },
                                                        children: "Email"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                        lineNumber: 625,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "email",
                                                        className: "e-input",
                                                        placeholder: "email@example.com",
                                                        value: form.email,
                                                        onChange: (e)=>up('email', e.target.value),
                                                        style: {
                                                            padding: '10px 14px'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                        lineNumber: 626,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/parties/page.tsx",
                                                lineNumber: 624,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    gridColumn: '1/-1'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: {
                                                            fontSize: 11,
                                                            fontWeight: 700,
                                                            color: '#4A5568',
                                                            display: 'block',
                                                            marginBottom: 5,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.05em'
                                                        },
                                                        children: "GST Number"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                        lineNumber: 629,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "e-input",
                                                        placeholder: "22AAAAA0000A1Z5",
                                                        value: form.gstNumber,
                                                        onChange: (e)=>up('gstNumber', e.target.value.toUpperCase()),
                                                        style: {
                                                            fontFamily: 'monospace',
                                                            letterSpacing: '0.08em',
                                                            padding: '10px 14px'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                        lineNumber: 630,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/parties/page.tsx",
                                                lineNumber: 628,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    gridColumn: '1/-1'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: {
                                                            fontSize: 11,
                                                            fontWeight: 700,
                                                            color: '#4A5568',
                                                            display: 'block',
                                                            marginBottom: 5,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.05em'
                                                        },
                                                        children: "Address"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                        lineNumber: 633,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "e-input",
                                                        placeholder: "Street address",
                                                        value: form.address,
                                                        onChange: (e)=>up('address', e.target.value),
                                                        style: {
                                                            padding: '10px 14px'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                        lineNumber: 634,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/parties/page.tsx",
                                                lineNumber: 632,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: {
                                                            fontSize: 11,
                                                            fontWeight: 700,
                                                            color: '#4A5568',
                                                            display: 'block',
                                                            marginBottom: 5,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.05em'
                                                        },
                                                        children: "City"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                        lineNumber: 637,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "e-input",
                                                        placeholder: "Chennai",
                                                        value: form.city,
                                                        onChange: (e)=>up('city', e.target.value),
                                                        style: {
                                                            padding: '10px 14px'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                        lineNumber: 638,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/parties/page.tsx",
                                                lineNumber: 636,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: {
                                                            fontSize: 11,
                                                            fontWeight: 700,
                                                            color: '#4A5568',
                                                            display: 'block',
                                                            marginBottom: 5,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.05em'
                                                        },
                                                        children: "State"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                        lineNumber: 641,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        className: "e-select",
                                                        value: form.state,
                                                        onChange: (e)=>up('state', e.target.value),
                                                        style: {
                                                            padding: '10px 14px'
                                                        },
                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INDIAN_STATES"].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                children: s
                                                            }, s, false, {
                                                                fileName: "[project]/app/company/parties/page.tsx",
                                                                lineNumber: 643,
                                                                columnNumber: 69
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                        lineNumber: 642,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/parties/page.tsx",
                                                lineNumber: 640,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: {
                                                            fontSize: 11,
                                                            fontWeight: 700,
                                                            color: '#4A5568',
                                                            display: 'block',
                                                            marginBottom: 5,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.05em'
                                                        },
                                                        children: "Opening Balance ₹"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                        lineNumber: 647,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        className: "e-input",
                                                        placeholder: "0.00 (+ rec, - pay)",
                                                        value: form.openingBalance,
                                                        onChange: (e)=>up('openingBalance', e.target.value),
                                                        style: {
                                                            padding: '10px 14px'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                        lineNumber: 648,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/parties/page.tsx",
                                                lineNumber: 646,
                                                columnNumber: 37
                                            }, this),
                                            editParty && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: {
                                                            fontSize: 11,
                                                            fontWeight: 700,
                                                            color: '#4A5568',
                                                            display: 'block',
                                                            marginBottom: 5,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.05em'
                                                        },
                                                        children: "Current Running Balance ₹"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                        lineNumber: 652,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        className: "e-input",
                                                        placeholder: "0.00 (+ rec, - pay)",
                                                        value: form.balance,
                                                        onChange: (e)=>up('balance', e.target.value),
                                                        style: {
                                                            padding: '10px 14px'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                        lineNumber: 653,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/parties/page.tsx",
                                                lineNumber: 651,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: {
                                                            fontSize: 11,
                                                            fontWeight: 700,
                                                            color: '#4A5568',
                                                            display: 'block',
                                                            marginBottom: 5,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.05em'
                                                        },
                                                        children: "Credit Limit ₹"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                        lineNumber: 657,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        className: "e-input",
                                                        placeholder: "Optional",
                                                        value: form.creditLimit,
                                                        onChange: (e)=>up('creditLimit', e.target.value),
                                                        style: {
                                                            padding: '10px 14px'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                        lineNumber: 658,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/parties/page.tsx",
                                                lineNumber: 656,
                                                columnNumber: 37
                                            }, this),
                                            company?.loyaltyPointsEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: {
                                                            fontSize: 11,
                                                            fontWeight: 700,
                                                            color: '#4A5568',
                                                            display: 'block',
                                                            marginBottom: 5,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.05em'
                                                        },
                                                        children: "Loyalty Points"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                        lineNumber: 662,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        className: "e-input",
                                                        placeholder: "0",
                                                        value: form.loyaltyPoints,
                                                        onChange: (e)=>up('loyaltyPoints', e.target.value),
                                                        style: {
                                                            padding: '10px 14px'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/parties/page.tsx",
                                                        lineNumber: 663,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/parties/page.tsx",
                                                lineNumber: 661,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/parties/page.tsx",
                                        lineNumber: 615,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/parties/page.tsx",
                                lineNumber: 605,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/company/parties/page.tsx",
                            lineNumber: 604,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '14px 24px',
                                borderTop: '1px solid #E1E4E8',
                                display: 'flex',
                                gap: 10,
                                justifyContent: 'flex-end',
                                background: 'white',
                                borderRadius: '0 0 16px 16px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setShowAdd(false);
                                        setEditParty(null);
                                    },
                                    className: "btn btn-outline",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/company/parties/page.tsx",
                                    lineNumber: 670,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleSave,
                                    className: "btn btn-blue",
                                    children: editParty ? 'Update Party' : 'Add Party'
                                }, void 0, false, {
                                    fileName: "[project]/app/company/parties/page.tsx",
                                    lineNumber: 671,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/parties/page.tsx",
                            lineNumber: 669,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/company/parties/page.tsx",
                    lineNumber: 599,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/company/parties/page.tsx",
                lineNumber: 598,
                columnNumber: 17
            }, this),
            loyaltyAdjustParty && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "modal-overlay",
                onClick: ()=>setLoyaltyAdjustParty(null),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modal-box",
                    onClick: (e)=>e.stopPropagation(),
                    style: {
                        maxWidth: 400
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '16px 20px',
                                borderBottom: '1px solid #E1E4E8',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    style: {
                                        fontWeight: 800,
                                        fontSize: 16,
                                        color: '#1A1A2E'
                                    },
                                    children: "Adjust Loyalty Points"
                                }, void 0, false, {
                                    fileName: "[project]/app/company/parties/page.tsx",
                                    lineNumber: 682,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setLoyaltyAdjustParty(null),
                                    className: "btn btn-ghost btn-icon",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/parties/page.tsx",
                                        lineNumber: 683,
                                        columnNumber: 116
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/company/parties/page.tsx",
                                    lineNumber: 683,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/parties/page.tsx",
                            lineNumber: 681,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 16
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 12,
                                                fontWeight: 700,
                                                color: '#4A5568',
                                                marginBottom: 6
                                            },
                                            children: "Action"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/parties/page.tsx",
                                            lineNumber: 687,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'grid',
                                                gridTemplateColumns: '1fr 1fr',
                                                gap: 10
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setAdjustPointsType('add'),
                                                    style: {
                                                        padding: '10px',
                                                        borderRadius: 10,
                                                        border: '2px solid',
                                                        borderColor: adjustPointsType === 'add' ? '#10B981' : '#E2E8F0',
                                                        background: adjustPointsType === 'add' ? '#ECFDF5' : 'white',
                                                        color: adjustPointsType === 'add' ? '#047857' : '#4A5568',
                                                        fontWeight: 800,
                                                        cursor: 'pointer'
                                                    },
                                                    children: "➕ Add Points"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                    lineNumber: 689,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setAdjustPointsType('deduct'),
                                                    style: {
                                                        padding: '10px',
                                                        borderRadius: 10,
                                                        border: '2px solid',
                                                        borderColor: adjustPointsType === 'deduct' ? '#EF4444' : '#E2E8F0',
                                                        background: adjustPointsType === 'deduct' ? '#FEF2F2' : 'white',
                                                        color: adjustPointsType === 'deduct' ? '#B91C1C' : '#4A5568',
                                                        fontWeight: 800,
                                                        cursor: 'pointer'
                                                    },
                                                    children: "➖ Deduct Points"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/parties/page.tsx",
                                                    lineNumber: 701,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/parties/page.tsx",
                                            lineNumber: 688,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/parties/page.tsx",
                                    lineNumber: 686,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                fontSize: 12,
                                                fontWeight: 700,
                                                color: '#4A5568',
                                                display: 'block',
                                                marginBottom: 6
                                            },
                                            children: "Points Amount"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/parties/page.tsx",
                                            lineNumber: 717,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            className: "e-input",
                                            placeholder: "e.g. 50",
                                            value: adjustPointsVal,
                                            onChange: (e)=>setAdjustPointsVal(e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/parties/page.tsx",
                                            lineNumber: 718,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/parties/page.tsx",
                                    lineNumber: 716,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                fontSize: 12,
                                                fontWeight: 700,
                                                color: '#4A5568',
                                                display: 'block',
                                                marginBottom: 6
                                            },
                                            children: "Reason / Note"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/parties/page.tsx",
                                            lineNumber: 728,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            className: "e-input",
                                            placeholder: "e.g. Birthday bonus, mistake correction...",
                                            value: adjustPointsReason,
                                            onChange: (e)=>setAdjustPointsReason(e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/parties/page.tsx",
                                            lineNumber: 729,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/parties/page.tsx",
                                    lineNumber: 727,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/parties/page.tsx",
                            lineNumber: 685,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '12px 20px 16px',
                                borderTop: '1px solid #E1E4E8',
                                display: 'flex',
                                gap: 8,
                                justifyContent: 'flex-end'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setLoyaltyAdjustParty(null),
                                    className: "btn btn-outline",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/company/parties/page.tsx",
                                    lineNumber: 739,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleAddLoyaltyAdjustment,
                                    style: {
                                        background: adjustPointsType === 'add' ? '#10B981' : '#EF4444',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: 10,
                                        padding: '10px 20px',
                                        fontWeight: 800,
                                        cursor: 'pointer'
                                    },
                                    children: "Confirm Adjustment"
                                }, void 0, false, {
                                    fileName: "[project]/app/company/parties/page.tsx",
                                    lineNumber: 740,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/parties/page.tsx",
                            lineNumber: 738,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/company/parties/page.tsx",
                    lineNumber: 680,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/company/parties/page.tsx",
                lineNumber: 679,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
                .desktop-table { display: none; }
                .mobile-list { display: block; }
                @media (min-width: 768px) { .desktop-table { display: block; } .mobile-list { display: none; } }
            `
            }, void 0, false, {
                fileName: "[project]/app/company/parties/page.tsx",
                lineNumber: 748,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
_s(PartiesPage, "/c7XOP+AzlhqKeNA4QVeFDXmWSY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActiveCompany"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"]
    ];
});
_c = PartiesPage;
var _c;
__turbopack_context__.k.register(_c, "PartiesPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_company_parties_page_tsx_ef4d6545._.js.map