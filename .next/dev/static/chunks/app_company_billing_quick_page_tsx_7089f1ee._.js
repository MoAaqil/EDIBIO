(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$repeat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Repeat$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/repeat.js [app-client] (ecmascript) <export default as Repeat>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PauseCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-pause.js [app-client] (ecmascript) <export default as PauseCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-play.js [app-client] (ecmascript) <export default as PlayCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InvoicePrintTemplate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/InvoicePrintTemplate.tsx [app-client] (ecmascript)");
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
    const { addInvoice, nextInvoiceNumber, adjustStock, addParty, updateParty, updateInvoice, addBalancePayment, updateCompany } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const normPhone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "QuickBillingContent.useCallback[normPhone]": (ph)=>{
            const d = (ph || '').replace(/\D/g, '');
            return d.startsWith('91') && d.length > 10 ? d.slice(2) : d;
        }
    }["QuickBillingContent.useCallback[normPhone]"], []);
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
    const [showColumnConfig, setShowColumnConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSuccess, setShowSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [tallyWithBalance, setTallyWithBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuickBillingContent.useEffect": ()=>{
            if (user && company?.team) {
                const matchingTeamMember = company.team.find({
                    "QuickBillingContent.useEffect.matchingTeamMember": (t)=>t.contact === user.email || t.name === user.name
                }["QuickBillingContent.useEffect.matchingTeamMember"]);
                if (matchingTeamMember?.counter) {
                    setCounter(matchingTeamMember.counter);
                }
            }
        }
    }["QuickBillingContent.useEffect"], [
        user,
        company?.team
    ]);
    const cols = company?.quickBillingColumns || {
        barcode: true,
        hsn: true,
        mfgDate: true,
        mrp: true,
        size: true,
        discount: true,
        tax: true
    };
    // Split payments
    const SPLIT_METHODS = [
        {
            key: 'cash',
            label: '💵 Cash',
            color: '#38A169'
        },
        {
            key: 'upi',
            label: '📱 UPI',
            color: '#6B46C1'
        },
        {
            key: 'card',
            label: '💳 Card',
            color: '#2B6CB0'
        },
        {
            key: 'bank',
            label: '🏦 Bank',
            color: '#C05621'
        },
        {
            key: 'cheque',
            label: '📝 Cheque',
            color: '#718096'
        }
    ];
    const [splitPayments, setSplitPayments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            method: 'cash',
            amount: ''
        }
    ]);
    const [useSplitPayment, setUseSplitPayment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Custom Suggestions State
    const [activeRowIdx, setActiveRowIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeSuggestionIdx, setActiveSuggestionIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [showSuggestions, setShowSuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [filteredProducts, setFilteredProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [actionModal, setActionModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        isOpen: false,
        isRefund: false
    });
    const [actionQuery, setActionQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [recurringModalOpen, setRecurringModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const filteredPreviousInvoices = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "QuickBillingContent.useMemo[filteredPreviousInvoices]": ()=>{
            const list = invoices.filter({
                "QuickBillingContent.useMemo[filteredPreviousInvoices].list": (inv)=>inv.companyId === companyId
            }["QuickBillingContent.useMemo[filteredPreviousInvoices].list"]);
            list.sort({
                "QuickBillingContent.useMemo[filteredPreviousInvoices]": (a, b)=>{
                    const dateA = new Date(a.date).getTime() || 0;
                    const dateB = new Date(b.date).getTime() || 0;
                    if (dateB !== dateA) return dateB - dateA;
                    return (b.invoiceNumber || '').localeCompare(a.invoiceNumber || '');
                }
            }["QuickBillingContent.useMemo[filteredPreviousInvoices]"]);
            const q = actionQuery.trim().toLowerCase();
            if (!q) return list.slice(0, 10);
            return list.filter({
                "QuickBillingContent.useMemo[filteredPreviousInvoices]": (inv)=>inv.invoiceNumber.toLowerCase().includes(q) || inv.partyName.toLowerCase().includes(q) || inv.partyPhone && inv.partyPhone.includes(q)
            }["QuickBillingContent.useMemo[filteredPreviousInvoices]"]).slice(0, 10);
        }
    }["QuickBillingContent.useMemo[filteredPreviousInvoices]"], [
        invoices,
        companyId,
        actionQuery
    ]);
    // Suspended bills
    const [suspendedBills, setSuspendedBills] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "QuickBillingContent.useState": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                try {
                    return JSON.parse(localStorage.getItem('edibio_suspended_bills') || '[]');
                } catch  {
                    return [];
                }
            }
            return [];
        }
    }["QuickBillingContent.useState"]);
    const [showSuspendModal, setShowSuspendModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Balance modal
    const [showBalanceModal, setShowBalanceModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [customPayments, setCustomPayments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [balanceSearchQuery, setBalanceSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [redeemPointsAmount, setRedeemPointsAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const outstandingBalanceCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "QuickBillingContent.useMemo[outstandingBalanceCount]": ()=>{
            const DRAFT = [
                'estimate',
                'proforma',
                'delivery_challan'
            ];
            const trackerMap = new Map();
            // Build map from parties
            parties.filter({
                "QuickBillingContent.useMemo[outstandingBalanceCount]": (p)=>p.companyId === companyId
            }["QuickBillingContent.useMemo[outstandingBalanceCount]"]).forEach({
                "QuickBillingContent.useMemo[outstandingBalanceCount]": (p)=>{
                    const key = normPhone(p.phone) || p.id;
                    if (!trackerMap.has(key)) trackerMap.set(key, {
                        party: p,
                        computedBalance: 0
                    });
                }
            }["QuickBillingContent.useMemo[outstandingBalanceCount]"]);
            // Sum up unpaid invoice balanceDue per party key
            invoices.filter({
                "QuickBillingContent.useMemo[outstandingBalanceCount]": (i)=>i.invoiceType === 'sale' && !DRAFT.includes(i.invoiceType) && i.paymentStatus !== 'paid' && (i.balanceDue ?? 0) > 0
            }["QuickBillingContent.useMemo[outstandingBalanceCount]"]).forEach({
                "QuickBillingContent.useMemo[outstandingBalanceCount]": (i)=>{
                    const key = normPhone(i.partyPhone) || i.partyId || '';
                    if (!key) return;
                    if (trackerMap.has(key)) {
                        trackerMap.get(key).computedBalance += i.balanceDue;
                    } else {
                        const p = parties.find({
                            "QuickBillingContent.useMemo[outstandingBalanceCount]": (p)=>p.id === i.partyId
                        }["QuickBillingContent.useMemo[outstandingBalanceCount]"]) || parties.find({
                            "QuickBillingContent.useMemo[outstandingBalanceCount]": (p)=>normPhone(p.phone) === key
                        }["QuickBillingContent.useMemo[outstandingBalanceCount]"]);
                        if (p) trackerMap.set(key, {
                            party: p,
                            computedBalance: i.balanceDue
                        });
                        else trackerMap.set(key, {
                            party: {
                                id: i.partyId,
                                name: i.partyName,
                                phone: i.partyPhone
                            },
                            computedBalance: i.balanceDue
                        });
                    }
                }
            }["QuickBillingContent.useMemo[outstandingBalanceCount]"]);
            return Array.from(trackerMap.values()).filter({
                "QuickBillingContent.useMemo[outstandingBalanceCount]": (e)=>e.computedBalance > 0
            }["QuickBillingContent.useMemo[outstandingBalanceCount]"]).length;
        }
    }["QuickBillingContent.useMemo[outstandingBalanceCount]"], [
        parties,
        invoices,
        companyId,
        normPhone
    ]);
    const saveSuspendedBills = (bills)=>{
        setSuspendedBills(bills);
        if ("TURBOPACK compile-time truthy", 1) localStorage.setItem('edibio_suspended_bills', JSON.stringify(bills));
    };
    const handleFetchBill = (isRefund = false)=>{
        setActionModal({
            isOpen: true,
            isRefund
        });
        setActionQuery('');
    };
    const selectInvoice = (inv)=>{
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
        if (actionModal.isRefund) {
            setAmountGiven('');
            setSavedBill(null);
            setDate(new Date().toISOString().slice(0, 10));
            setTime(new Date().toTimeString().slice(0, 5));
        } else {
            setAmountGiven(inv.amountPaid !== undefined && inv.amountPaid !== null ? inv.amountPaid.toString() : '');
            setSavedBill(inv);
            setDate(inv.date || new Date().toISOString().slice(0, 10));
            setTime(inv.time || new Date().toTimeString().slice(0, 5));
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success(`Bill ${actionModal.isRefund ? 'refunded' : 'fetched'} successfully!`);
        setActionModal({
            isOpen: false,
            isRefund: false
        });
    };
    const executeAction = ()=>{
        const q = actionQuery.trim();
        if (!q) return;
        const inv = invoices.find((i)=>i.invoiceNumber.toLowerCase() === q.toLowerCase() || i.id === q);
        if (inv) {
            selectInvoice(inv);
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Invoice not found!');
        }
    };
    const updateItem = (idx, k, v)=>{
        setItems((prev)=>{
            let bogoToAdd = null;
            const nextItems = prev.map((item, i)=>{
                if (i !== idx) return item;
                const upd = {
                    ...item,
                    [k]: v
                };
                // Auto complete product if entering name or barcode
                if (k === 'name' || k === 'barcode') {
                    if (typeof v === 'string' && v.trim() !== '') {
                        // Filter suggestions (including combo offers)
                        const searchTerm = v.toLowerCase();
                        const matches = products.filter((p)=>p.name.toLowerCase().includes(searchTerm) || p.barcode && p.barcode.includes(searchTerm) || p.category && p.category.toLowerCase().includes(searchTerm));
                        const comboMatches = (company?.offers || []).filter((o)=>o.isActive && o.type === 'combo' && o.name.toLowerCase().includes(searchTerm)).map((o)=>({
                                id: o.id,
                                name: o.name,
                                isComboOffer: true,
                                comboOffer: o
                            }));
                        const combined = [
                            ...matches,
                            ...comboMatches
                        ].slice(0, 10);
                        if (k === 'name') {
                            setFilteredProducts(combined);
                            setShowSuggestions(combined.length > 0);
                            setActiveRowIdx(idx);
                            setActiveSuggestionIdx(0);
                        }
                        const prod = products.find((p)=>k === 'name' && p.name.toLowerCase() === v.toLowerCase() || k === 'barcode' && p.barcode === v);
                        if (prod) {
                            upd.productId = prod.id;
                            upd.name = prod.name;
                            upd.barcode = prod.barcode || '';
                            upd.hsnCode = prod.hsnCode || '';
                            upd.mrp = prod.mrp || prod.sellingPrice || 0;
                            upd.gstRate = prod.gstRate || 0;
                            upd.unit = prod.unit || 'Pcs';
                            // Check for active flat discount offer on this item
                            const discountOffer = company?.offers?.find((o)=>o.isActive && o.type === 'discount' && o.buyProductId === prod.id);
                            if (discountOffer) {
                                const percent = discountOffer.discountPercent || 50;
                                upd.rate = prod.sellingPrice * (1 - percent / 100);
                                upd.originalPrice = prod.sellingPrice;
                            } else {
                                upd.rate = prod.sellingPrice || 0;
                                upd.originalPrice = undefined;
                            }
                            // Check for active BOGO offer on this item
                            const bogoOffer = company?.offers?.find((o)=>o.isActive && o.type === 'bogo' && o.buyProductId === prod.id);
                            if (bogoOffer && !upd.bogoTriggered && !upd.isFree) {
                                upd.bogoTriggered = true;
                                const getProd = products.find((p)=>p.id === bogoOffer.getProductId) || prod;
                                bogoToAdd = {
                                    name: `[FREE] ${getProd.name}`,
                                    barcode: getProd.barcode || '',
                                    hsnCode: getProd.hsnCode || '',
                                    mfgDate: '',
                                    mrp: getProd.mrp || getProd.sellingPrice || 0,
                                    size: '',
                                    qty: bogoOffer.getQty || 1,
                                    unit: getProd.unit || 'Pcs',
                                    rate: 0,
                                    isFree: true,
                                    originalPrice: getProd.sellingPrice,
                                    gstRate: getProd.gstRate || 0,
                                    productId: getProd.id,
                                    discount: 0,
                                    discountAmt: 0,
                                    taxableAmt: 0,
                                    cgst: 0,
                                    sgst: 0,
                                    igst: 0,
                                    cess: 0,
                                    totalGst: 0,
                                    amount: 0
                                };
                                const calcFree = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcLineItem"])(bogoToAdd.qty, 0, 0, getProd.gstRate);
                                bogoToAdd = {
                                    ...bogoToAdd,
                                    ...calcFree
                                };
                            }
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
            });
            if (bogoToAdd) {
                const next = [
                    ...nextItems
                ];
                next.splice(idx + 1, 0, bogoToAdd);
                return next;
            }
            return nextItems;
        });
    };
    const selectProduct = (idx, prod)=>{
        if (prod.isComboOffer) {
            const combo = prod.comboOffer;
            const comboPids = combo.comboProductIds || [];
            const comboProds = comboPids.map((pid)=>products.find((p)=>p.id === pid)).filter(Boolean);
            if (comboProds.length > 0) {
                const normalPriceSum = comboProds.reduce((sum, p)=>sum + (p.sellingPrice || 0), 0);
                const factor = normalPriceSum > 0 ? combo.comboPrice / normalPriceSum : 1;
                setItems((prev)=>{
                    const next = [
                        ...prev
                    ];
                    // Remove the current search/input row
                    next.splice(idx, 1);
                    comboProds.forEach((p, cIdx)=>{
                        const calculatedRate = p.sellingPrice * factor;
                        const itemRow = {
                            name: `${p.name} (${combo.name})`,
                            barcode: p.barcode || '',
                            hsnCode: p.hsnCode || '',
                            mfgDate: '',
                            mrp: p.mrp || p.sellingPrice || 0,
                            size: '',
                            qty: 1,
                            unit: p.unit || 'Pcs',
                            rate: calculatedRate,
                            originalPrice: p.sellingPrice,
                            isComboItem: true,
                            comboOfferId: combo.id,
                            gstRate: p.gstRate || 0,
                            productId: p.id,
                            discount: 0,
                            discountAmt: 0,
                            taxableAmt: 0,
                            cgst: 0,
                            sgst: 0,
                            igst: 0,
                            cess: 0,
                            totalGst: 0,
                            amount: 0
                        };
                        const calc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcLineItem"])(1, calculatedRate, 0, p.gstRate);
                        next.splice(idx + cIdx, 0, {
                            ...itemRow,
                            ...calc
                        });
                    });
                    if (next.length === 0) {
                        next.push(emptyRow());
                    }
                    return next;
                });
            }
        } else {
            updateItem(idx, 'name', prod.name);
        }
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
    // Offers Engine Calculations
    const { bogoDiscountsSum, comboDiscountsSum, activeOfferLogs } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "QuickBillingContent.useMemo": ()=>{
            let bogoTotalDiscount = 0;
            let comboTotalDiscount = 0;
            const logs = [];
            const offers = company?.offers || [];
            if (offers.length === 0 || validItems.length === 0) {
                return {
                    bogoDiscountsSum: 0,
                    comboDiscountsSum: 0,
                    activeOfferLogs: []
                };
            }
            const flatDiscounts = offers.filter({
                "QuickBillingContent.useMemo.flatDiscounts": (o)=>o.isActive && o.type === 'discount'
            }["QuickBillingContent.useMemo.flatDiscounts"]);
            const bogoOffers = offers.filter({
                "QuickBillingContent.useMemo.bogoOffers": (o)=>o.isActive && o.type === 'bogo'
            }["QuickBillingContent.useMemo.bogoOffers"]);
            const productDiscounts = new Map();
            validItems.forEach({
                "QuickBillingContent.useMemo": (item)=>{
                    if (!item.productId) return;
                    // Exclude items already handled by line-level discount/BOGO/combo offers
                    if (item.originalPrice || item.isFree || item.isComboItem || item.bogoTriggered) return;
                    const pid = item.productId;
                    const itemPrice = item.rate || 0;
                    const itemQty = item.qty || 0;
                    const flat = flatDiscounts.find({
                        "QuickBillingContent.useMemo.flat": (o)=>o.buyProductId === pid
                    }["QuickBillingContent.useMemo.flat"]);
                    if (flat) {
                        const discountVal = itemPrice * itemQty * ((flat.discountPercent || 0) / 100);
                        productDiscounts.set(pid, (productDiscounts.get(pid) || 0) + discountVal);
                        logs.push(`Flat ${flat.discountPercent}% off applied to ${item.name}`);
                    }
                    const bogo = bogoOffers.find({
                        "QuickBillingContent.useMemo.bogo": (o)=>o.buyProductId === pid || o.getProductId === pid
                    }["QuickBillingContent.useMemo.bogo"]);
                    if (bogo) {
                        const buyPid = bogo.buyProductId;
                        const getPid = bogo.getProductId;
                        const buyQtyRule = bogo.buyQty || 1;
                        const getQtyRule = bogo.getQty || 1;
                        const discPercent = bogo.discountPercent || 100;
                        if (buyPid === getPid && buyPid === pid) {
                            const bundleSize = buyQtyRule + getQtyRule;
                            const bundles = Math.floor(itemQty / bundleSize);
                            const freeQty = bundles * getQtyRule;
                            if (freeQty > 0) {
                                const discountVal = freeQty * itemPrice * (discPercent / 100);
                                productDiscounts.set(pid, (productDiscounts.get(pid) || 0) + discountVal);
                                logs.push(`BOGO: ${freeQty} free/discounted units of ${item.name}`);
                            }
                        } else {
                            const getProductInCart = validItems.find({
                                "QuickBillingContent.useMemo.getProductInCart": (it)=>it.productId === getPid
                            }["QuickBillingContent.useMemo.getProductInCart"]);
                            if (getPid && getProductInCart && pid === buyPid) {
                                const buyItemQty = itemQty;
                                const getItemQty = getProductInCart.qty;
                                const getPrice = getProductInCart.rate || 0;
                                const eligibleBundles = Math.floor(buyItemQty / buyQtyRule);
                                const discountQty = Math.min(eligibleBundles * getQtyRule, getItemQty);
                                if (discountQty > 0) {
                                    const discountVal = discountQty * getPrice * (discPercent / 100);
                                    productDiscounts.set(getPid, (productDiscounts.get(getPid) || 0) + discountVal);
                                    logs.push(`BOGO: ${discountQty} units of ${getProductInCart.name} discounted by ${item.name} purchase`);
                                }
                            }
                        }
                    }
                }
            }["QuickBillingContent.useMemo"]);
            bogoTotalDiscount = Array.from(productDiscounts.values()).reduce({
                "QuickBillingContent.useMemo": (a, b)=>a + b
            }["QuickBillingContent.useMemo"], 0);
            const comboOffers = offers.filter({
                "QuickBillingContent.useMemo.comboOffers": (o)=>o.isActive && o.type === 'combo'
            }["QuickBillingContent.useMemo.comboOffers"]);
            comboOffers.forEach({
                "QuickBillingContent.useMemo": (combo)=>{
                    const pids = combo.comboProductIds || [];
                    if (pids.length < 2) return;
                    const cartItemsForCombo = pids.map({
                        "QuickBillingContent.useMemo.cartItemsForCombo": (pid)=>validItems.find({
                                "QuickBillingContent.useMemo.cartItemsForCombo": (it)=>it.productId === pid
                            }["QuickBillingContent.useMemo.cartItemsForCombo"])
                    }["QuickBillingContent.useMemo.cartItemsForCombo"]);
                    const allPresent = cartItemsForCombo.every({
                        "QuickBillingContent.useMemo.allPresent": (it)=>it !== undefined
                    }["QuickBillingContent.useMemo.allPresent"]);
                    if (allPresent) {
                        const qtys = cartItemsForCombo.map({
                            "QuickBillingContent.useMemo.qtys": (it)=>it.qty
                        }["QuickBillingContent.useMemo.qtys"]);
                        const comboSets = Math.min(...qtys);
                        if (comboSets > 0) {
                            const regularPriceSum = cartItemsForCombo.reduce({
                                "QuickBillingContent.useMemo.regularPriceSum": (sum, it)=>sum + (it.rate || 0)
                            }["QuickBillingContent.useMemo.regularPriceSum"], 0);
                            const comboPriceRule = combo.comboPrice || 0;
                            const comboDiscountPerSet = Math.max(0, regularPriceSum - comboPriceRule);
                            const discountVal = comboSets * comboDiscountPerSet;
                            comboTotalDiscount += discountVal;
                            logs.push(`Combo: "${combo.name}" bundle applied x${comboSets} (saved ₹${discountVal.toFixed(2)})`);
                        }
                    }
                }
            }["QuickBillingContent.useMemo"]);
            return {
                bogoDiscountsSum: bogoTotalDiscount,
                comboDiscountsSum: comboTotalDiscount,
                activeOfferLogs: logs
            };
        }
    }["QuickBillingContent.useMemo"], [
        company,
        validItems
    ]);
    const preDiscountSum = Math.max(0, subTotal + totalGst - bogoDiscountsSum - comboDiscountsSum);
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
    const grandTotalBeforePointsDiscount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["r2"])(afterDiscount + (parseFloat(roundOffVal) || 0));
    // Loyalty points calculations
    const selectedCustomer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "QuickBillingContent.useMemo[selectedCustomer]": ()=>{
            const phoneTarget = partyPhone.trim() ? normPhone(partyPhone) : '';
            const nameTarget = partyName.trim().toLowerCase();
            if (!phoneTarget && !nameTarget) return null;
            let foundParty = null;
            if (phoneTarget) {
                foundParty = parties.find({
                    "QuickBillingContent.useMemo[selectedCustomer]": (p)=>p.phone && normPhone(p.phone) === phoneTarget || p.mobile && normPhone(p.mobile) === phoneTarget
                }["QuickBillingContent.useMemo[selectedCustomer]"]);
            }
            if (!foundParty && nameTarget) {
                foundParty = parties.find({
                    "QuickBillingContent.useMemo[selectedCustomer]": (p)=>p.name && p.name.toLowerCase().trim() === nameTarget
                }["QuickBillingContent.useMemo[selectedCustomer]"]);
            }
            if (!foundParty) return null;
            // Compute balance dynamically to avoid corruption issues
            const DRAFT = [
                'estimate',
                'proforma',
                'delivery_challan'
            ];
            const unpaidInvoices = invoices.filter({
                "QuickBillingContent.useMemo[selectedCustomer].unpaidInvoices": (i)=>i.invoiceType === 'sale' && !DRAFT.includes(i.invoiceType) && i.paymentStatus !== 'paid' && (i.balanceDue ?? 0) > 0 && (i.partyId === foundParty.id || foundParty.phone && normPhone(i.partyPhone) === normPhone(foundParty.phone) || foundParty.mobile && normPhone(i.partyPhone) === normPhone(foundParty.mobile))
            }["QuickBillingContent.useMemo[selectedCustomer].unpaidInvoices"]);
            const computedBalance = unpaidInvoices.reduce({
                "QuickBillingContent.useMemo[selectedCustomer].computedBalance": (sum, i)=>sum + i.balanceDue
            }["QuickBillingContent.useMemo[selectedCustomer].computedBalance"], 0);
            return {
                ...foundParty,
                balance: computedBalance
            };
        }
    }["QuickBillingContent.useMemo[selectedCustomer]"], [
        parties,
        invoices,
        partyPhone,
        partyName,
        normPhone
    ]);
    const loyaltyPointsAvailable = selectedCustomer?.loyaltyPoints || 0;
    const pointsEarningRatio = company?.loyaltyEarningRatio || 100;
    const pointsRedemptionValue = company?.loyaltyRedemptionValue || 1;
    const minPointsToRedeem = company?.loyaltyMinRedeemPoints || 10;
    const loyaltyEnabled = company?.loyaltyPointsEnabled && pointsEarningRatio > 0 && pointsRedemptionValue > 0;
    const canRedeemPoints = loyaltyEnabled && loyaltyPointsAvailable >= minPointsToRedeem;
    const maxPointsForBill = Math.floor(grandTotalBeforePointsDiscount / pointsRedemptionValue);
    const pointsToRedeemLimit = Math.min(loyaltyPointsAvailable, maxPointsForBill);
    const pointsToRedeemAmount = Math.min(Math.max(0, isNaN(parseInt(redeemPointsAmount)) ? 0 : parseInt(redeemPointsAmount)), pointsToRedeemLimit);
    const pointsDiscountValue = pointsToRedeemAmount * pointsRedemptionValue;
    const grandTotal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["r2"])(grandTotalBeforePointsDiscount - pointsDiscountValue);
    const pointsEarned = loyaltyEnabled ? Math.floor(grandTotal / pointsEarningRatio) : 0;
    const handleSave = async (isPrintFlow = false)=>{
        const isPrint = isPrintFlow === true;
        if (validItems.length === 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Add at least one complete row (Name, Qty, Price)');
            return false;
        }
        if (!useSplitPayment && (amountGiven === null || amountGiven === undefined || amountGiven.trim() === '')) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Please enter Amount Given (enter 0 if no payment was received)');
            return false;
        }
        const finalPartyName = partyName.trim() || 'Cash / Walk-in Customer';
        // --- Split payment calculations ---
        let calculatedAmountPaid = 0;
        let calculatedBalanceDue = grandTotal;
        let calculatedPaymentStatus = 'unpaid';
        let finalSplitPayments;
        let finalPaymentMethod = 'cash';
        if (useSplitPayment) {
            const entries = splitPayments.map((s)=>({
                    method: s.method,
                    amount: parseFloat(s.amount) || 0
                })).filter((s)=>s.amount > 0);
            const totalSplit = entries.reduce((a, s)=>a + s.amount, 0);
            calculatedAmountPaid = Math.min(totalSplit, grandTotal);
            calculatedBalanceDue = Math.max(0, grandTotal - totalSplit);
            calculatedPaymentStatus = calculatedBalanceDue === 0 ? 'paid' : calculatedAmountPaid > 0 ? 'partial' : 'unpaid';
            finalSplitPayments = entries.length > 0 ? entries : undefined;
            // Dominant method = the one with highest amount
            const dominant = entries.sort((a, b)=>b.amount - a.amount)[0];
            finalPaymentMethod = dominant?.method || 'cash';
        } else {
            const parsedAmountGiven = amountGiven && typeof amountGiven === 'string' && amountGiven.trim() !== '' ? parseFloat(amountGiven) || 0 : typeof amountGiven === 'number' ? amountGiven : null;
            if (parsedAmountGiven !== null) {
                if (parsedAmountGiven >= grandTotal) {
                    calculatedAmountPaid = grandTotal;
                    calculatedBalanceDue = 0;
                    calculatedPaymentStatus = 'paid';
                } else {
                    calculatedAmountPaid = parsedAmountGiven;
                    calculatedBalanceDue = grandTotal - parsedAmountGiven;
                    calculatedPaymentStatus = parsedAmountGiven > 0 ? 'partial' : 'unpaid';
                }
            } else {
                if (billType === 'CASH') {
                    calculatedAmountPaid = grandTotal;
                    calculatedBalanceDue = 0;
                    calculatedPaymentStatus = 'paid';
                } else {
                    calculatedAmountPaid = 0;
                    calculatedBalanceDue = grandTotal;
                    calculatedPaymentStatus = 'unpaid';
                }
            }
            finalPaymentMethod = 'cash';
        }
        let finalPartyId = undefined;
        let finalPartyNameUsed = finalPartyName;
        if (finalPartyName !== 'Cash / Walk-in Customer' || partyPhone && partyPhone.trim() !== '') {
            const searchPhone = partyPhone ? partyPhone.trim() : '';
            const searchName = finalPartyName !== 'Cash / Walk-in Customer' ? finalPartyName.toLowerCase().trim() : '';
            const matchingParty = parties.find((p)=>searchPhone && (String(p.phone).trim() === searchPhone || String(p.mobile).trim() === searchPhone) || searchName && p.name.toLowerCase().trim() === searchName);
            if (matchingParty) {
                finalPartyId = matchingParty.id;
                finalPartyNameUsed = matchingParty.name;
            } else {
                const newName = finalPartyName !== 'Cash / Walk-in Customer' ? finalPartyName : `Cust - ${searchPhone}`;
                const newParty = addParty({
                    companyId: companyId,
                    type: 'customer',
                    name: newName,
                    phone: searchPhone,
                    address: billingAddress || '',
                    openingBalance: 0,
                    balance: 0
                });
                finalPartyId = newParty.id;
                finalPartyNameUsed = newName;
            }
        }
        const isUpdate = !!savedBill;
        const oldInvoice = savedBill;
        let invoice;
        if (isUpdate && oldInvoice) {
            // Revert any old excess payment applied to this invoice from the customer's balance/history
            if (oldInvoice.partyId) {
                const party = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"].getState().parties.find((p)=>p.id === oldInvoice.partyId);
                if (party && party.paymentHistory) {
                    const searchNote = `on invoice #${oldInvoice.invoiceNumber}`;
                    const oldPayment = party.paymentHistory.find((p)=>p.note && p.note.includes(searchNote));
                    if (oldPayment) {
                        const revertedBalance = (party.balance || 0) + oldPayment.amount;
                        const updatedHistory = party.paymentHistory.filter((p)=>p.id !== oldPayment.id);
                        updateParty(oldInvoice.partyId, {
                            balance: revertedBalance,
                            paymentHistory: updatedHistory
                        });
                        // Revert the deduction from past invoices' balanceDue
                        let remainingRevert = oldPayment.amount;
                        const currentInvoices = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"].getState().invoices;
                        const customerInvoices = currentInvoices.filter((inv)=>inv.id !== oldInvoice.id && (inv.partyId === oldInvoice.partyId || party.phone && inv.partyPhone === party.phone));
                        for (const inv of customerInvoices){
                            if (remainingRevert <= 0) break;
                            const maxRestore = inv.amountPaid;
                            if (maxRestore > 0) {
                                const restoreAmt = Math.min(maxRestore, remainingRevert);
                                const newPaid = inv.amountPaid - restoreAmt;
                                const newDue = inv.balanceDue + restoreAmt;
                                updateInvoice(inv.id, {
                                    amountPaid: newPaid,
                                    balanceDue: newDue,
                                    paymentStatus: newDue === 0 ? 'paid' : newPaid === 0 ? 'unpaid' : 'partial'
                                });
                                remainingRevert -= restoreAmt;
                            }
                        }
                    }
                }
            }
            // 1. Revert old stock changes
            if (oldInvoice.invoiceType === 'sale') {
                oldInvoice.items.forEach((item)=>{
                    if (item.productId) adjustStock(item.productId, item.qty, 'skip');
                });
            } else if (oldInvoice.invoiceType === 'purchase') {
                oldInvoice.items.forEach((item)=>{
                    if (item.productId) adjustStock(item.productId, -item.qty, 'skip');
                });
            }
            // 2. Revert old party balance
            if (oldInvoice.partyId && oldInvoice.balanceDue > 0) {
                const party = parties.find((p)=>p.id === oldInvoice.partyId);
                if (party) {
                    updateParty(oldInvoice.partyId, {
                        balance: (party.balance || 0) - oldInvoice.balanceDue
                    });
                }
            }
            // 3. Revert old loyalty points
            if (oldInvoice.partyId && oldInvoice.invoiceType === 'sale') {
                const earned = oldInvoice.pointsEarned || 0;
                const redeemed = oldInvoice.pointsRedeemed || 0;
                if (earned !== 0 || redeemed !== 0) {
                    const party = parties.find((p)=>p.id === oldInvoice.partyId);
                    if (party) {
                        updateParty(oldInvoice.partyId, {
                            loyaltyPoints: Math.max(0, (party.loyaltyPoints || 0) - earned + redeemed)
                        });
                    }
                }
            }
            // Construct invoice object preserving id, invoiceNumber, and createdAt
            invoice = {
                id: oldInvoice.id,
                companyId: companyId,
                invoiceType: 'sale',
                invoiceNumber: oldInvoice.invoiceNumber,
                date,
                time,
                stateOfSupply,
                partyId: finalPartyId,
                partyName: finalPartyNameUsed,
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
                paymentStatus: calculatedPaymentStatus,
                amountPaid: calculatedAmountPaid,
                balanceDue: calculatedBalanceDue,
                paymentMethod: finalPaymentMethod,
                splitPayments: finalSplitPayments,
                isGstBill: validItems.some((i)=>i.gstRate > 0),
                isHidden: false,
                notes: description,
                counter,
                pointsEarned,
                pointsRedeemed: pointsToRedeemAmount,
                pointsValueRedeemed: pointsDiscountValue,
                createdAt: oldInvoice.createdAt,
                updatedAt: new Date().toISOString()
            };
            // Save the update
            updateInvoice(oldInvoice.id, invoice);
            // 4. Apply new stock changes
            if (invoice.invoiceType === 'sale') {
                validItems.forEach((item)=>{
                    if (item.productId) adjustStock(item.productId, -item.qty, `Sale - ${invoice.invoiceNumber}`);
                });
            } else if (invoice.invoiceType === 'purchase') {
                validItems.forEach((item)=>{
                    if (item.productId) adjustStock(item.productId, item.qty, `Purchase - ${invoice.invoiceNumber}`);
                });
            }
            // 5. Apply new party balance (use getState to get the updated party balance)
            if (invoice.partyId && invoice.balanceDue > 0) {
                const latestParty = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"].getState().parties.find((p)=>p.id === invoice.partyId);
                if (latestParty) {
                    updateParty(invoice.partyId, {
                        balance: (latestParty.balance || 0) + invoice.balanceDue
                    });
                }
            }
            // 6. Apply new loyalty points
            if (invoice.partyId && invoice.invoiceType === 'sale') {
                if (pointsEarned !== 0 || pointsToRedeemAmount !== 0) {
                    const latestParty = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"].getState().parties.find((p)=>p.id === invoice.partyId);
                    if (latestParty) {
                        updateParty(invoice.partyId, {
                            loyaltyPoints: Math.max(0, (latestParty.loyaltyPoints || 0) + pointsEarned - pointsToRedeemAmount)
                        });
                    }
                }
            }
        } else {
            const invNo = nextInvoiceNumber(companyId, 'MN');
            invoice = {
                id: 'mb_' + Date.now().toString(36),
                companyId: companyId,
                invoiceType: 'sale',
                invoiceNumber: invNo,
                date,
                time,
                stateOfSupply,
                partyId: finalPartyId,
                partyName: finalPartyNameUsed,
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
                paymentStatus: calculatedPaymentStatus,
                amountPaid: calculatedAmountPaid,
                balanceDue: calculatedBalanceDue,
                paymentMethod: finalPaymentMethod,
                splitPayments: finalSplitPayments,
                isGstBill: validItems.some((i)=>i.gstRate > 0),
                isHidden: false,
                notes: description,
                counter,
                pointsEarned,
                pointsRedeemed: pointsToRedeemAmount,
                pointsValueRedeemed: pointsDiscountValue,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            // Adjust stock based on transaction type (run before addInvoice so balanceAfter is resolved correctly)
            if (invoice.invoiceType === 'sale') {
                validItems.forEach((item)=>{
                    if (item.productId) adjustStock(item.productId, -item.qty, 'skip');
                });
            } else if (invoice.invoiceType === 'purchase') {
                validItems.forEach((item)=>{
                    if (item.productId) adjustStock(item.productId, item.qty, 'skip');
                });
            }
            addInvoice(invoice);
        }
        // Calculate and apply excess payment to outstanding balance in the store
        const parsedAmountGiven = amountGiven && typeof amountGiven === 'string' && amountGiven.trim() !== '' ? parseFloat(amountGiven) || 0 : typeof amountGiven === 'number' ? amountGiven : null;
        let excessAppliedToBalance = 0;
        let latestSelectedCustomerBalance = 0;
        const latestSelectedCustomer = finalPartyId ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"].getState().parties.find((p)=>p.id === finalPartyId) : null;
        if (latestSelectedCustomer) {
            const DRAFT = [
                'estimate',
                'proforma',
                'delivery_challan'
            ];
            const unpaidInvoices = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"].getState().invoices.filter((i)=>i.invoiceType === 'sale' && !DRAFT.includes(i.invoiceType) && i.paymentStatus !== 'paid' && (i.balanceDue ?? 0) > 0 && (i.partyId === finalPartyId || latestSelectedCustomer.phone && normPhone(i.partyPhone) === normPhone(latestSelectedCustomer.phone) || latestSelectedCustomer.mobile && normPhone(i.partyPhone) === normPhone(latestSelectedCustomer.mobile)));
            latestSelectedCustomerBalance = unpaidInvoices.reduce((sum, i)=>sum + i.balanceDue, 0);
        }
        if (parsedAmountGiven !== null && finalPartyId && latestSelectedCustomerBalance > 0 && tallyWithBalance && !useSplitPayment) {
            if (parsedAmountGiven > grandTotal) {
                excessAppliedToBalance = Math.min(parsedAmountGiven - grandTotal, latestSelectedCustomerBalance);
            }
        }
        if (finalPartyId && excessAppliedToBalance > 0) {
            addBalancePayment(finalPartyId, {
                type: 'received',
                amount: excessAppliedToBalance,
                method: finalPaymentMethod,
                date,
                note: `Adjusted from excess payment on invoice #${invoice.invoiceNumber}`
            });
            // Update past invoices' balanceDue
            let remainingPayment = excessAppliedToBalance;
            const currentInvoices = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"].getState().invoices;
            const sortedInvoices = [
                ...currentInvoices
            ].reverse();
            sortedInvoices.forEach((inv)=>{
                if (remainingPayment <= 0) return;
                // Exclude the current invoice we just saved
                if (inv.id === invoice.id) return;
                if (inv.partyId === finalPartyId || latestSelectedCustomer && latestSelectedCustomer.phone && inv.partyPhone === latestSelectedCustomer.phone) {
                    if (inv.balanceDue > 0) {
                        const deduction = Math.min(inv.balanceDue, remainingPayment);
                        const newPaid = inv.amountPaid + deduction;
                        const newDue = inv.balanceDue - deduction;
                        updateInvoice(inv.id, {
                            amountPaid: newPaid,
                            balanceDue: newDue,
                            paymentStatus: newDue === 0 ? 'paid' : 'partial'
                        });
                        remainingPayment -= deduction;
                    }
                }
            });
        }
        setRedeemPointsAmount('');
        setSavedBill(invoice);
        if (!isPrint) {
            // Save-only flow: await browser PDF download capture before resetting the UI state
            await handleDownloadPDF(invoice);
        }
        // Reset the inputs immediately after PDF generation/download starts
        setItems([
            emptyRow()
        ]);
        setPartyName('');
        setPartyPhone('');
        setBillingAddress('');
        setDiscountVal('');
        setAmountGiven('');
        setUseSplitPayment(false);
        setSplitPayments([
            {
                method: 'cash',
                amount: ''
            }
        ]);
        setDate(new Date().toISOString().slice(0, 10));
        setTime(new Date().toTimeString().slice(0, 5));
        if (!isPrint) {
            setSavedBill(null);
        } else {
            // Schedule clearing savedBill after a delay
            setTimeout(()=>{
                setSavedBill(null);
                setShowSuccess(false);
            }, 5000);
        }
        return invoice;
    };
    const handleSuspend = ()=>{
        if (validItems.length === 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('No items to suspend.');
            return;
        }
        const suspended = {
            id: 'sus_' + Date.now().toString(36),
            suspendedAt: new Date().toISOString(),
            partyName,
            partyPhone,
            billingAddress,
            stateOfSupply,
            billType,
            counter,
            items,
            discountType,
            discountVal,
            roundOffEnabled,
            roundOffVal,
            description,
            date,
            time,
            grandTotal,
            label: partyName || `Bill #${suspendedBills.length + 1}`
        };
        const updated = [
            suspended,
            ...suspendedBills
        ];
        saveSuspendedBills(updated);
        setItems([
            emptyRow()
        ]);
        setPartyName('');
        setPartyPhone('');
        setBillingAddress('');
        setDiscountVal('');
        setDescription('');
        setAmountGiven('');
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success(`Bill for "${suspended.label}" suspended! Resume anytime.`);
        setShowSuspendModal(false);
    };
    const handleResumeSuspended = (sus)=>{
        setPartyName(sus.partyName);
        setPartyPhone(sus.partyPhone);
        setBillingAddress(sus.billingAddress);
        setStateOfSupply(sus.stateOfSupply || 'Tamil Nadu');
        setBillType(sus.billType || 'CASH');
        setCounter(sus.counter || 'Counter 1');
        setItems(sus.items);
        setDiscountType(sus.discountType || '%');
        setDiscountVal(sus.discountVal || '');
        setRoundOffEnabled(sus.roundOffEnabled ?? true);
        setRoundOffVal(sus.roundOffVal || '0.00');
        setDescription(sus.description || '');
        setDate(sus.date || new Date().toISOString().slice(0, 10));
        setTime(sus.time || new Date().toTimeString().slice(0, 5));
        const updated = suspendedBills.filter((b)=>b.id !== sus.id);
        saveSuspendedBills(updated);
        setShowSuspendModal(false);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success(`Resumed bill for "${sus.label}".`);
    };
    const handleDeleteSuspended = (id)=>{
        saveSuspendedBills(suspendedBills.filter((b)=>b.id !== id));
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Suspended bill removed.');
    };
    const handlePrintRequest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "QuickBillingContent.useCallback[handlePrintRequest]": ()=>{
            if (validItems.length === 0) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Add items first!');
                return;
            }
            if (!useSplitPayment && (amountGiven === null || amountGiven === undefined || amountGiven.trim() === '')) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Please enter Amount Given (enter 0 if no payment was received) before printing');
                return;
            }
            setCopies(2); // Request specifies print 2 copies
            setShowPrintModal(true);
        }
    }["QuickBillingContent.useCallback[handlePrintRequest]"], [
        validItems,
        amountGiven,
        useSplitPayment
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuickBillingContent.useEffect": ()=>{
            const handleKeyDown = {
                "QuickBillingContent.useEffect.handleKeyDown": (e)=>{
                    if (e.key === 'F12') {
                        e.preventDefault();
                        handlePrintRequest();
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
    }["QuickBillingContent.useEffect"], [
        handlePrintRequest
    ]);
    const executePrint = async ()=>{
        const inputsModified = savedBill && ((savedBill.partyName || 'Cash / Walk-in Customer') !== (partyName.trim() || 'Cash / Walk-in Customer') || (savedBill.partyPhone || '') !== partyPhone.trim() || (savedBill.billingAddress || '') !== billingAddress.trim() || (savedBill.totalDiscount?.toString() || '0') !== (discountVal.trim() || '0') || (savedBill.amountPaid?.toString() || '0') !== (amountGiven.trim() || '0') || savedBill.items.length !== validItems.length || savedBill.items.some((it, idx)=>{
            const cur = validItems[idx];
            return !cur || cur.name !== it.name || Number(cur.qty) !== Number(it.qty) || Number(cur.rate) !== Number(it.rate);
        }));
        let billToPrint = savedBill;
        if (!billToPrint || inputsModified) {
            const result = await handleSave(true);
            if (!result) return;
            billToPrint = result;
        }
        const partyPhoneToUse = billToPrint.partyPhone;
        const currentBill = billToPrint;
        if (company?.whatsappEnabled && partyPhoneToUse) {
            let itemsText = '';
            currentBill.items.forEach((item)=>{
                itemsText += `• ${item.name} (${item.qty} ${item.unit}) - ₹${item.amount.toLocaleString('en-IN')}\n`;
            });
            const bal = currentBill.balanceDue || 0;
            const msg = `*${company?.name || 'Tax Invoice'}*\n\nHello ${billToPrint.partyName || 'Customer'},\nHere is your bill summary (Inv: ${billToPrint.invoiceNumber}):\nDate: ${billToPrint.date} ${billToPrint.time || ''}\n\n*Items Purchased:*\n${itemsText}\n*Total Amount:* ₹${billToPrint.grandTotal.toLocaleString('en-IN')}\n${bal > 0 ? `\n*Please clear the due balance:* ₹${bal.toLocaleString('en-IN')}\n` : ''}\nThanks for shopping with us!\n\n_Powered by Edibio_`;
            setTimeout(()=>{
                window.open(`https://wa.me/91${partyPhoneToUse.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
            }, 300);
        }
        setShowPrintModal(false);
        setShowSuccess(true);
        setTimeout(()=>window.print(), company?.whatsappEnabled && partyPhoneToUse ? 800 : 300);
    };
    const handleDownloadPDF = async (invoiceToDownload)=>{
        const invoice = invoiceToDownload || savedBill;
        if (!invoice) return;
        // Await a minimal delay (0ms) to allow React to flush state updates to the DOM
        await new Promise((resolve)=>setTimeout(resolve, 0));
        const loadToast = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].loading('Generating PDF...');
        const element = document.getElementById('quick-invoice-print');
        if (!element) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Invoice print element not found', {
                id: loadToast
            });
            return;
        }
        // Temporarily replace min-height with auto to avoid vertical page splits/blank pages
        const vhElements = element.querySelectorAll('[style*="min-height"], [style*="minHeight"]');
        const originalMinHeights = [];
        vhElements.forEach((el)=>{
            originalMinHeights.push({
                el,
                style: el.getAttribute('style')
            });
            const currStyle = el.getAttribute('style') || '';
            const replaced = currStyle.replace(/min-height\s*:\s*[^;]+/gi, 'min-height: auto').replace(/minHeight\s*:\s*[^;]+/gi, 'min-height: auto');
            el.setAttribute('style', replaced);
        });
        const triggerVirtualDownload = (blob, filename)=>{
            const downloadUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(downloadUrl);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('PDF downloaded successfully!', {
                id: loadToast
            });
        };
        try {
            const html2pdf = (await __turbopack_context__.A("[project]/node_modules/html2pdf.js/dist/html2pdf.js [app-client] (ecmascript, async loader)")).default;
            const opt = {
                margin: 0,
                filename: `${invoice.invoiceNumber || 'Invoice'}.pdf`,
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    letterRendering: true,
                    scrollX: 0,
                    scrollY: 0
                },
                jsPDF: {
                    unit: 'mm',
                    format: 'a4',
                    orientation: 'portrait'
                },
                pagebreak: {
                    mode: [
                        'avoid-all',
                        'css',
                        'legacy'
                    ]
                }
            };
            const worker = html2pdf().set(opt).from(element);
            const pdfBlob = await worker.output('blob');
            const fileName = `${invoice.invoiceNumber || 'Invoice'}.pdf`;
            // Use browser File System Access API if supported to allow selecting folder
            if (("TURBOPACK compile-time value", "object") !== 'undefined' && 'showSaveFilePicker' in window) {
                try {
                    const handle = await window.showSaveFilePicker({
                        suggestedName: fileName,
                        types: [
                            {
                                description: 'PDF Document',
                                accept: {
                                    'application/pdf': [
                                        '.pdf'
                                    ]
                                }
                            }
                        ]
                    });
                    const writable = await handle.createWritable();
                    await writable.write(pdfBlob);
                    await writable.close();
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('PDF saved successfully!', {
                        id: loadToast
                    });
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        console.error('File System Access API failed, falling back:', err);
                        triggerVirtualDownload(pdfBlob, fileName);
                    } else {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dismiss(loadToast);
                    }
                }
            } else {
                triggerVirtualDownload(pdfBlob, fileName);
            }
        } catch (err) {
            console.error('PDF generation failed:', err);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Failed to generate PDF. Try printing instead.', {
                id: loadToast
            });
        } finally{
            // Restore original min-height styles
            originalMinHeights.forEach((item)=>{
                if (item.style !== null) item.el.setAttribute('style', item.style);
                else item.el.removeAttribute('style');
            });
        }
    };
    const getPaymentStatusColor = (status)=>{
        if (status === 'paid') return {
            bg: '#E6FFFA',
            text: '#319795',
            border: '#B2F5EA'
        };
        if (status === 'partial') return {
            bg: '#FEFCBF',
            text: '#B7791F',
            border: '#FEEBC8'
        };
        return {
            bg: '#FFF5F5',
            text: '#E53E3E',
            border: '#FED7D7'
        };
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: '100dvh',
            background: '#F8F9FA',
            fontFamily: 'Inter, sans-serif'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "print-only-container",
                id: "quick-invoice-print-container",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    id: "quick-invoice-print",
                    style: {
                        width: 800,
                        background: 'white',
                        padding: '20px',
                        boxSizing: 'border-box'
                    },
                    children: savedBill ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InvoicePrintTemplate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvoicePrintTemplate"], {
                        invoice: savedBill,
                        company: company,
                        copies: copies,
                        themeOverride: company?.quickBillingTheme || company?.templateTheme || 'classic',
                        previewMode: true
                    }, void 0, false, {
                        fileName: "[project]/app/company/billing/quick/page.tsx",
                        lineNumber: 1172,
                        columnNumber: 34
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
                        themeOverride: company?.quickBillingTheme || company?.templateTheme || 'classic',
                        previewMode: true
                    }, void 0, false, {
                        fileName: "[project]/app/company/billing/quick/page.tsx",
                        lineNumber: 1173,
                        columnNumber: 50
                    }, this) : null
                }, void 0, false, {
                    fileName: "[project]/app/company/billing/quick/page.tsx",
                    lineNumber: 1171,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/company/billing/quick/page.tsx",
                lineNumber: 1170,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @media print {
            .app-sidebar, .topbar, .bottom-nav, .demo-banner, .no-print, aside, header, nav, footer, .sidebar, .navbar {
                display: none !important;
            }
            html, body, .app-shell, .app-main, .app-content, .app-content-inner {
                display: block !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
                height: auto !important;
                min-height: auto !important;
                background: white !important;
                border: none !important;
                box-shadow: none !important;
            }
            .print-only-container, .print-only-container * {
                visibility: visible !important;
            }
            .print-only-container {
                display: block !important;
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                height: auto !important;
                margin: 0 !important;
                padding: 0 !important;
                z-index: 9999999 !important;
                background: white !important;
            }
        }
        .print-only-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 800px;
            z-index: -9999;
            pointer-events: none;
            background: white;
        }
        
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
                lineNumber: 1180,
                columnNumber: 13
            }, this),
            savedBill && showSuccess ? (()=>{
                const payStatus = getPaymentStatusColor(savedBill.paymentStatus);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
                        minHeight: '100dvh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontFamily: 'Inter, sans-serif',
                        padding: '24px',
                        boxSizing: 'border-box'
                    },
                    className: "no-print",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                background: 'rgba(255, 255, 255, 0.85)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.4)',
                                borderRadius: '24px',
                                boxShadow: '0 20px 45px rgba(0, 0, 0, 0.05), 0 10px 20px rgba(0, 0, 0, 0.03)',
                                padding: '40px',
                                width: '100%',
                                maxWidth: '520px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                position: 'relative',
                                boxSizing: 'border-box'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '72px',
                                        height: '72px',
                                        borderRadius: '50%',
                                        background: '#DEF7EC',
                                        border: '3px solid #10B981',
                                        color: '#10B981',
                                        marginBottom: '20px',
                                        boxShadow: '0 10px 20px rgba(16, 185, 129, 0.2)'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                        size: 36,
                                        strokeWidth: 3
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 1263,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 1262,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    style: {
                                        fontSize: '24px',
                                        fontWeight: 900,
                                        color: '#1E293B',
                                        margin: '0 0 4px 0',
                                        textAlign: 'center'
                                    },
                                    children: "Bill Generated Successfully!"
                                }, void 0, false, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 1266,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: '14px',
                                        color: '#64748B',
                                        margin: '0 0 32px 0',
                                        textAlign: 'center'
                                    },
                                    children: [
                                        "Invoice ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            style: {
                                                color: '#0F172A'
                                            },
                                            children: savedBill.invoiceNumber
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 1268,
                                            columnNumber: 41
                                        }, this),
                                        " has been saved and is ready."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 1267,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: '#F8FAFC',
                                        border: '1px solid #E2E8F0',
                                        borderRadius: '16px',
                                        padding: '20px',
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        marginBottom: '28px',
                                        boxSizing: 'border-box'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: '11px',
                                                fontWeight: 800,
                                                color: '#64748B',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em',
                                                marginBottom: '4px'
                                            },
                                            children: "Grand Total"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 1273,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: '32px',
                                                fontWeight: 950,
                                                color: '#0F172A',
                                                fontFamily: 'monospace'
                                            },
                                            children: [
                                                "₹",
                                                savedBill.grandTotal.toLocaleString('en-IN', {
                                                    minimumFractionDigits: 2
                                                })
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 1274,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 1272,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '14px',
                                        marginBottom: '36px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                borderBottom: '1px dashed #E2E8F0',
                                                paddingBottom: '12px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: '13px',
                                                        fontWeight: 600,
                                                        color: '#64748B'
                                                    },
                                                    children: "Customer"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 1282,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: '14px',
                                                        fontWeight: 800,
                                                        color: '#0F172A'
                                                    },
                                                    children: savedBill.partyName || 'Cash / Walk-in Customer'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 1283,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 1281,
                                            columnNumber: 33
                                        }, this),
                                        savedBill.partyPhone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                borderBottom: '1px dashed #E2E8F0',
                                                paddingBottom: '12px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: '13px',
                                                        fontWeight: 600,
                                                        color: '#64748B'
                                                    },
                                                    children: "Phone / ID"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 1287,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: '14px',
                                                        fontWeight: 800,
                                                        color: '#0F172A'
                                                    },
                                                    children: savedBill.partyPhone
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 1288,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 1286,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                borderBottom: '1px dashed #E2E8F0',
                                                paddingBottom: '12px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: '13px',
                                                        fontWeight: 600,
                                                        color: '#64748B'
                                                    },
                                                    children: "Date & Time"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 1292,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: '14px',
                                                        fontWeight: 700,
                                                        color: '#334155'
                                                    },
                                                    children: [
                                                        savedBill.date,
                                                        " ",
                                                        savedBill.time || ''
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 1293,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 1291,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: '13px',
                                                        fontWeight: 600,
                                                        color: '#64748B'
                                                    },
                                                    children: "Payment Status"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 1296,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: '12px',
                                                        fontWeight: 800,
                                                        color: payStatus.text,
                                                        background: payStatus.bg,
                                                        border: `1px solid ${payStatus.border}`,
                                                        borderRadius: '999px',
                                                        padding: '4px 12px',
                                                        textTransform: 'uppercase'
                                                    },
                                                    children: savedBill.paymentStatus
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 1297,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 1295,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 1280,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '12px',
                                        width: '100%'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                gap: '12px',
                                                width: '100%'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleDownloadPDF(savedBill),
                                                    style: {
                                                        flex: 1,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: '8px',
                                                        padding: '14px 20px',
                                                        borderRadius: '12px',
                                                        border: 'none',
                                                        background: '#34A853',
                                                        color: 'white',
                                                        fontSize: '14px',
                                                        fontWeight: 800,
                                                        cursor: 'pointer',
                                                        boxShadow: '0 4px 12px rgba(52, 168, 83, 0.25)',
                                                        transition: 'transform 0.1s, opacity 0.1s'
                                                    },
                                                    className: "btn-scale",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                            size: 16
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 1307,
                                                            columnNumber: 41
                                                        }, this),
                                                        " Download PDF"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 1306,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setShowPrintModal(true),
                                                    style: {
                                                        flex: 1,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: '8px',
                                                        padding: '14px 20px',
                                                        borderRadius: '12px',
                                                        border: '1px solid #CBD5E0',
                                                        background: 'white',
                                                        color: '#334155',
                                                        fontSize: '14px',
                                                        fontWeight: 800,
                                                        cursor: 'pointer',
                                                        transition: 'background 0.15s'
                                                    },
                                                    className: "btn-hover-gray",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__["Printer"], {
                                                            size: 16
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 1310,
                                                            columnNumber: 41
                                                        }, this),
                                                        " Print"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 1309,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 1305,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setSavedBill(null);
                                                setShowSuccess(false);
                                                setItems([
                                                    emptyRow()
                                                ]);
                                                setPartyName('');
                                                setPartyPhone('');
                                                setBillingAddress('');
                                                setDiscountVal('');
                                                setAmountGiven('');
                                                setDate(new Date().toISOString().slice(0, 10));
                                                setTime(new Date().toTimeString().slice(0, 5));
                                            },
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                padding: '14px 20px',
                                                borderRadius: '12px',
                                                border: 'none',
                                                background: '#4285F4',
                                                color: 'white',
                                                fontSize: '14px',
                                                fontWeight: 800,
                                                cursor: 'pointer',
                                                boxShadow: '0 4px 12px rgba(66, 133, 244, 0.25)'
                                            },
                                            className: "btn-scale",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 1315,
                                                    columnNumber: 37
                                                }, this),
                                                " New Bill"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 1314,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>router.push(`/company/dashboard`),
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: '12px 20px',
                                                borderRadius: '12px',
                                                border: 'none',
                                                background: 'transparent',
                                                color: '#64748B',
                                                fontSize: '14px',
                                                fontWeight: 700,
                                                cursor: 'pointer',
                                                textDecoration: 'none'
                                            },
                                            children: "Back to Dashboard"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 1318,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 1304,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/billing/quick/page.tsx",
                            lineNumber: 1259,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                            children: `
                            .btn-scale:active { transform: scale(0.98); }
                            .btn-hover-gray:hover { background: #F8FAFC !important; border-color: #A0AEC0 !important; }
                            .btn-scale:hover { opacity: 0.95; }
                        `
                        }, void 0, false, {
                            fileName: "[project]/app/company/billing/quick/page.tsx",
                            lineNumber: 1325,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/company/billing/quick/page.tsx",
                    lineNumber: 1257,
                    columnNumber: 21
                }, this);
            })() : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                lineNumber: 1335,
                                columnNumber: 43
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/company/billing/quick/page.tsx",
                        lineNumber: 1334,
                        columnNumber: 21
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
                                        lineNumber: 1342,
                                        columnNumber: 25
                                    }, this),
                                    (!user?.role || user?.role === 'owner' || user?.role === 'co_owner') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowColumnConfig(true),
                                        className: "mi-btn",
                                        style: {
                                            padding: '6px 12px',
                                            fontSize: 12,
                                            background: 'white',
                                            border: '1px solid #E2E8F0',
                                            borderRadius: 8,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 6,
                                            cursor: 'pointer'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                                size: 14,
                                                color: "#718096"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 1346,
                                                columnNumber: 33
                                            }, this),
                                            " Edit Columns"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 1345,
                                        columnNumber: 29
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
                                                lineNumber: 1351,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                children: "Counter 2"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 1352,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                children: "Counter 3"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 1353,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                children: "Counter 4"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 1354,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 1350,
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
                                                lineNumber: 1358,
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
                                                lineNumber: 1359,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 1357,
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
                                                lineNumber: 1362,
                                                columnNumber: 151
                                            }, this),
                                            " Refund"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 1362,
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
                                                lineNumber: 1363,
                                                columnNumber: 152
                                            }, this),
                                            " Fetch"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 1363,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setRecurringModalOpen(true),
                                        className: "mi-btn",
                                        style: {
                                            border: '1px solid transparent',
                                            background: '#EBF4FF',
                                            color: '#3182CE',
                                            padding: '6px 14px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$repeat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Repeat$3e$__["Repeat"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 1364,
                                                columnNumber: 202
                                            }, this),
                                            " Recurring"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 1364,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>router.push(`${activeCompanyId ? '/company' : ''}/billing/expenditure`),
                                        className: "mi-btn",
                                        style: {
                                            border: '1px solid transparent',
                                            background: '#FEEBC8',
                                            color: '#DD6B20',
                                            padding: '6px 14px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 1366,
                                                columnNumber: 29
                                            }, this),
                                            " Expenditure"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 1365,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowBalanceModal(true),
                                        className: "mi-btn",
                                        style: {
                                            border: '1px solid transparent',
                                            background: '#E6FFFA',
                                            color: '#2C7A7B',
                                            padding: '6px 14px',
                                            position: 'relative'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 1370,
                                                columnNumber: 29
                                            }, this),
                                            " Balance",
                                            outstandingBalanceCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    position: 'absolute',
                                                    top: -4,
                                                    right: -4,
                                                    background: '#E53E3E',
                                                    color: 'white',
                                                    borderRadius: '50%',
                                                    width: 16,
                                                    height: 16,
                                                    fontSize: 9,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontWeight: 900
                                                },
                                                children: outstandingBalanceCount
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 1372,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 1369,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowSuspendModal(true),
                                        className: "mi-btn",
                                        style: {
                                            border: '1px solid #FEB2B2',
                                            background: '#FFF5F5',
                                            color: '#E53E3E',
                                            padding: '6px 14px',
                                            position: 'relative'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PauseCircle$3e$__["PauseCircle"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 1379,
                                                columnNumber: 29
                                            }, this),
                                            " Suspend",
                                            suspendedBills.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    position: 'absolute',
                                                    top: -4,
                                                    right: -4,
                                                    background: '#E53E3E',
                                                    color: 'white',
                                                    borderRadius: '50%',
                                                    width: 16,
                                                    height: 16,
                                                    fontSize: 9,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontWeight: 900
                                                },
                                                children: suspendedBills.length
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 1381,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 1378,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                lineNumber: 1341,
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
                                    lineNumber: 1389,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                lineNumber: 1388,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/billing/quick/page.tsx",
                        lineNumber: 1340,
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
                                                lineNumber: 1398,
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
                                                lineNumber: 1407,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 1397,
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
                                                lineNumber: 1425,
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
                                                        lineNumber: 1428,
                                                        columnNumber: 37
                                                    }, this),
                                                    " Last Purchases"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 1427,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 1424,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                lineNumber: 1396,
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
                                                lineNumber: 1437,
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
                                                lineNumber: 1438,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 1436,
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
                                                lineNumber: 1441,
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
                                                        lineNumber: 1443,
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
                                                        lineNumber: 1444,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 1442,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 1440,
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
                                                lineNumber: 1448,
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
                                                        lineNumber: 1450,
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
                                                        lineNumber: 1451,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 1449,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 1447,
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
                                                lineNumber: 1455,
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
                                                        lineNumber: 1457,
                                                        columnNumber: 57
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 1456,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 1454,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                lineNumber: 1435,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/billing/quick/page.tsx",
                        lineNumber: 1394,
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
                                                    lineNumber: 1468,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    style: {
                                                        width: '15%'
                                                    },
                                                    children: "ITEM"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 1469,
                                                    columnNumber: 33
                                                }, this),
                                                cols.barcode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "BARCODE"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 1470,
                                                    columnNumber: 50
                                                }, this),
                                                cols.hsn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "HSN"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 1471,
                                                    columnNumber: 46
                                                }, this),
                                                cols.mfgDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "MFG. DATE"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 1472,
                                                    columnNumber: 50
                                                }, this),
                                                cols.mrp && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    style: {
                                                        textAlign: 'right'
                                                    },
                                                    children: "MRP"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 1473,
                                                    columnNumber: 46
                                                }, this),
                                                cols.size && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    style: {
                                                        textAlign: 'center'
                                                    },
                                                    children: "SIZE"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 1474,
                                                    columnNumber: 47
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    style: {
                                                        textAlign: 'center',
                                                        width: 60
                                                    },
                                                    children: "QTY"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 1475,
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
                                                    lineNumber: 1476,
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
                                                    lineNumber: 1477,
                                                    columnNumber: 33
                                                }, this),
                                                cols.discount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    style: {
                                                        textAlign: 'center',
                                                        color: '#4285F4'
                                                    },
                                                    children: [
                                                        "DISCOUNT",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 1478,
                                                            columnNumber: 113
                                                        }, this),
                                                        "%",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                display: 'inline-block',
                                                                width: 20
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 1478,
                                                            columnNumber: 120
                                                        }, this),
                                                        "AMT"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 1478,
                                                    columnNumber: 51
                                                }, this),
                                                cols.tax && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    style: {
                                                        textAlign: 'center',
                                                        color: '#4285F4'
                                                    },
                                                    children: [
                                                        "TAX",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 1479,
                                                            columnNumber: 103
                                                        }, this),
                                                        "%",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                display: 'inline-block',
                                                                width: 20
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 1479,
                                                            columnNumber: 110
                                                        }, this),
                                                        "AMT"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 1479,
                                                    columnNumber: 46
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    style: {
                                                        textAlign: 'right',
                                                        width: 100
                                                    },
                                                    children: "AMOUNT"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 1480,
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
                                                    lineNumber: 1481,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 1467,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 1466,
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
                                                        lineNumber: 1487,
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
                                                                lineNumber: 1489,
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
                                                                                            fontSize: 13,
                                                                                            color: p.isComboOffer ? '#7C3AED' : '#2D3748'
                                                                                        },
                                                                                        children: p.isComboOffer ? `🎁 [COMBO] ${p.name}` : p.name
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                                        lineNumber: 1557,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        style: {
                                                                                            fontSize: 10,
                                                                                            opacity: activeSuggestionIdx === pIdx ? 0.8 : 0.5
                                                                                        },
                                                                                        children: p.isComboOffer ? `Combo Price: ₹${p.comboOffer.comboPrice}` : `₹${p.sellingPrice} • ${p.stockQty} in stock`
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                                        lineNumber: 1560,
                                                                                        columnNumber: 61
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                                lineNumber: 1556,
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
                                                                                lineNumber: 1564,
                                                                                columnNumber: 71
                                                                            }, this)
                                                                        ]
                                                                    }, p.id || p.name, true, {
                                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                        lineNumber: 1545,
                                                                        columnNumber: 53
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                lineNumber: 1539,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 1488,
                                                        columnNumber: 37
                                                    }, this),
                                                    cols.barcode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            id: `barcode-input-${i}`,
                                                            value: item.barcode ?? '',
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
                                                            lineNumber: 1572,
                                                            columnNumber: 45
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 1571,
                                                        columnNumber: 41
                                                    }, this),
                                                    cols.hsn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            value: item.hsnCode ?? '',
                                                            onChange: (e)=>updateItem(i, 'hsnCode', e.target.value)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 1588,
                                                            columnNumber: 54
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 1588,
                                                        columnNumber: 50
                                                    }, this),
                                                    cols.mfgDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "date",
                                                            value: item.mfgDate ?? '',
                                                            onChange: (e)=>updateItem(i, 'mfgDate', e.target.value),
                                                            style: {
                                                                padding: '8px 2px'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 1589,
                                                            columnNumber: 58
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 1589,
                                                        columnNumber: 54
                                                    }, this),
                                                    cols.mrp && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            value: item.mrp || '',
                                                            onChange: (e)=>updateItem(i, 'mrp', parseFloat(e.target.value) || 0),
                                                            style: {
                                                                textAlign: 'right'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 1590,
                                                            columnNumber: 54
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 1590,
                                                        columnNumber: 50
                                                    }, this),
                                                    cols.size && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            value: item.size ?? '',
                                                            onChange: (e)=>updateItem(i, 'size', e.target.value),
                                                            style: {
                                                                textAlign: 'center'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 1591,
                                                            columnNumber: 55
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 1591,
                                                        columnNumber: 51
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            min: "0",
                                                            value: item.qty ?? 1,
                                                            onChange: (e)=>updateItem(i, 'qty', e.target.value),
                                                            style: {
                                                                textAlign: 'center',
                                                                fontWeight: 'bold'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 1592,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 1592,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            value: item.unit ?? 'Pcs',
                                                            onChange: (e)=>updateItem(i, 'unit', e.target.value),
                                                            style: {
                                                                textAlign: 'center'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 1593,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 1593,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                alignItems: 'flex-end'
                                                            },
                                                            children: [
                                                                item.originalPrice && item.originalPrice !== item.rate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontSize: 10,
                                                                        textDecoration: 'line-through',
                                                                        color: '#EA4335',
                                                                        marginRight: 4
                                                                    },
                                                                    children: [
                                                                        "₹",
                                                                        item.originalPrice.toFixed(2)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                    lineNumber: 1597,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "number",
                                                                    min: "0",
                                                                    value: item.rate || '',
                                                                    onChange: (e)=>updateItem(i, 'rate', e.target.value),
                                                                    style: {
                                                                        textAlign: 'right',
                                                                        color: item.isFree ? '#2F855A' : 'inherit',
                                                                        fontWeight: item.isFree ? 'bold' : 'normal'
                                                                    },
                                                                    readOnly: item.isFree
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                    lineNumber: 1601,
                                                                    columnNumber: 45
                                                                }, this),
                                                                item.isFree && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontSize: 9,
                                                                        color: '#34A853',
                                                                        fontWeight: 800
                                                                    },
                                                                    children: "FREE ITEM"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                    lineNumber: 1609,
                                                                    columnNumber: 61
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 1595,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 1594,
                                                        columnNumber: 37
                                                    }, this),
                                                    cols.discount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
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
                                                                    lineNumber: 1615,
                                                                    columnNumber: 49
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
                                                                    lineNumber: 1616,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 1614,
                                                            columnNumber: 45
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 1613,
                                                        columnNumber: 41
                                                    }, this),
                                                    cols.tax && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
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
                                                                    lineNumber: 1623,
                                                                    columnNumber: 49
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
                                                                    lineNumber: 1624,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 1622,
                                                            columnNumber: 45
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 1621,
                                                        columnNumber: 41
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
                                                        lineNumber: 1628,
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
                                                                lineNumber: 1632,
                                                                columnNumber: 49
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 1631,
                                                            columnNumber: 45
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 1629,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 1486,
                                                columnNumber: 33
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 1484,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                lineNumber: 1465,
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
                                    lineNumber: 1641,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                lineNumber: 1640,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/billing/quick/page.tsx",
                        lineNumber: 1464,
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
                                                        lineNumber: 1651,
                                                        columnNumber: 178
                                                    }, this),
                                                    " ADD DESCRIPTION"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 1651,
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
                                                lineNumber: 1652,
                                                columnNumber: 42
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 1650,
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
                                                lineNumber: 1654,
                                                columnNumber: 135
                                            }, this),
                                            " ADD IMAGE"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 1654,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                lineNumber: 1649,
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
                                                lineNumber: 1659,
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
                                                                        lineNumber: 1663,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        children: "Amt"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                        lineNumber: 1663,
                                                                        columnNumber: 59
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                lineNumber: 1662,
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
                                                                lineNumber: 1665,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 1661,
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
                                                        lineNumber: 1667,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 1660,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 1658,
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
                                                            lineNumber: 1674,
                                                            columnNumber: 57
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 1673,
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
                                                        lineNumber: 1676,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 1672,
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
                                                        lineNumber: 1679,
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
                                                        lineNumber: 1680,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 1678,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 1671,
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
                                        lineNumber: 1684,
                                        columnNumber: 25
                                    }, this),
                                    grandTotalBeforePointsDiscount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 10
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    padding: '8px 0'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: 16,
                                                            fontWeight: 900,
                                                            color: '#1A202C'
                                                        },
                                                        children: "GRAND TOTAL"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 1691,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: 26,
                                                            fontWeight: 900,
                                                            color: '#1A202C'
                                                        },
                                                        children: [
                                                            "₹",
                                                            grandTotal.toLocaleString('en-IN', {
                                                                minimumFractionDigits: 2
                                                            })
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 1692,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 1690,
                                                columnNumber: 33
                                            }, this),
                                            (bogoDiscountsSum > 0 || comboDiscountsSum > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: '#FFF5F5',
                                                    borderRadius: 8,
                                                    padding: '10px 12px',
                                                    border: '1px solid #FED7D7',
                                                    fontSize: 13,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 4
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontWeight: 800,
                                                            color: '#C53030',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 5
                                                        },
                                                        children: "🎁 Schemes/Offers Applied:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 1700,
                                                        columnNumber: 41
                                                    }, this),
                                                    activeOfferLogs.map((log, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                color: '#E53E3E',
                                                                fontSize: 12,
                                                                fontWeight: 600
                                                            },
                                                            children: [
                                                                "• ",
                                                                log
                                                            ]
                                                        }, idx, true, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 1702,
                                                            columnNumber: 45
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 1699,
                                                columnNumber: 37
                                            }, this),
                                            loyaltyEnabled && (partyPhone.trim() !== '' || selectedCustomer) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: '#F0FFF4',
                                                    border: '1.5px solid #C6F6D5',
                                                    borderRadius: 12,
                                                    padding: '14px 16px',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 10
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: 13,
                                                                    fontWeight: 800,
                                                                    color: '#22543D',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: 6
                                                                },
                                                                children: "🌟 Loyalty Points:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                lineNumber: 1711,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: 14,
                                                                    fontWeight: 900,
                                                                    color: '#22543D'
                                                                },
                                                                children: loyaltyPointsAvailable
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                lineNumber: 1714,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 1710,
                                                        columnNumber: 41
                                                    }, this),
                                                    canRedeemPoints ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 8,
                                                            flexWrap: 'wrap'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: 12,
                                                                    fontWeight: 700,
                                                                    color: '#276749'
                                                                },
                                                                children: "Redeem Points:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                lineNumber: 1718,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                value: redeemPointsAmount,
                                                                onChange: (e)=>{
                                                                    const rawVal = e.target.value;
                                                                    if (rawVal === '') {
                                                                        setRedeemPointsAmount('');
                                                                        return;
                                                                    }
                                                                    const val = Math.min(Math.max(0, parseInt(rawVal) || 0), pointsToRedeemLimit);
                                                                    setRedeemPointsAmount(String(val));
                                                                },
                                                                placeholder: "0",
                                                                style: {
                                                                    width: 70,
                                                                    padding: '3px 8px',
                                                                    border: '1.5px solid #C6F6D5',
                                                                    borderRadius: 8,
                                                                    fontSize: 12,
                                                                    fontWeight: 800,
                                                                    color: '#276749',
                                                                    textAlign: 'center',
                                                                    outline: 'none',
                                                                    background: 'white'
                                                                },
                                                                max: pointsToRedeemLimit,
                                                                min: 0
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                lineNumber: 1721,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>setRedeemPointsAmount(String(pointsToRedeemLimit)),
                                                                style: {
                                                                    padding: '3px 8px',
                                                                    borderRadius: 6,
                                                                    border: '1px solid #38A169',
                                                                    background: '#E6F4EA',
                                                                    color: '#276749',
                                                                    fontSize: 11,
                                                                    fontWeight: 800,
                                                                    cursor: 'pointer',
                                                                    display: 'inline-flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    transition: 'background 0.15s'
                                                                },
                                                                children: "Max"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                lineNumber: 1749,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: 12,
                                                                    fontWeight: 700,
                                                                    color: '#276749',
                                                                    marginLeft: 2
                                                                },
                                                                children: [
                                                                    "(Up to ",
                                                                    pointsToRedeemLimit,
                                                                    " pts · save ₹",
                                                                    (pointsToRedeemAmount * pointsRedemptionValue).toFixed(2),
                                                                    ")"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                lineNumber: 1768,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 1717,
                                                        columnNumber: 45
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 11,
                                                            color: '#718096',
                                                            margin: 0
                                                        },
                                                        children: [
                                                            "Need at least ",
                                                            minPointsToRedeem,
                                                            " points to redeem (Current: ",
                                                            loyaltyPointsAvailable,
                                                            ")."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 1773,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            gap: 6,
                                                            borderTop: '1px dashed #C6F6D5',
                                                            paddingTop: 8,
                                                            marginTop: 4,
                                                            fontSize: 12
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    color: '#4A5568',
                                                                    fontWeight: 600
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "Current Balance:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                        lineNumber: 1781,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            loyaltyPointsAvailable,
                                                                            " pts"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                        lineNumber: 1782,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                lineNumber: 1780,
                                                                columnNumber: 45
                                                            }, this),
                                                            pointsToRedeemAmount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    color: '#E53E3E',
                                                                    fontWeight: 800
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "Points to Deduct:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                        lineNumber: 1786,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            "-",
                                                                            pointsToRedeemAmount,
                                                                            " pts (-₹",
                                                                            pointsDiscountValue.toFixed(2),
                                                                            ")"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                        lineNumber: 1787,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                lineNumber: 1785,
                                                                columnNumber: 49
                                                            }, this),
                                                            pointsEarned > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    color: '#2F855A',
                                                                    fontWeight: 700
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "Points to Earn:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                        lineNumber: 1792,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            "+",
                                                                            pointsEarned,
                                                                            " pts"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                        lineNumber: 1793,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                lineNumber: 1791,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    color: '#22543D',
                                                                    fontWeight: 900,
                                                                    borderTop: '1.5px solid #C6F6D5',
                                                                    paddingTop: 6,
                                                                    marginTop: 2
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "Remaining Balance (after save):"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                        lineNumber: 1797,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            Math.max(0, loyaltyPointsAvailable - pointsToRedeemAmount + pointsEarned),
                                                                            " pts"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                        lineNumber: 1798,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                lineNumber: 1796,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 1779,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 1709,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    gap: 8
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setUseSplitPayment(false),
                                                        style: {
                                                            flex: 1,
                                                            padding: '9px',
                                                            borderRadius: 8,
                                                            border: '2px solid',
                                                            borderColor: !useSplitPayment ? '#4285F4' : '#E2E8F0',
                                                            background: !useSplitPayment ? '#E8F0FE' : '#F8FAFC',
                                                            fontWeight: 800,
                                                            fontSize: 12,
                                                            cursor: 'pointer',
                                                            color: !useSplitPayment ? '#1967D2' : '#718096',
                                                            transition: 'all 0.15s'
                                                        },
                                                        children: "💵 Single Payment"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 1806,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setUseSplitPayment(true),
                                                        style: {
                                                            flex: 1,
                                                            padding: '9px',
                                                            borderRadius: 8,
                                                            border: '2px solid',
                                                            borderColor: useSplitPayment ? '#6B46C1' : '#E2E8F0',
                                                            background: useSplitPayment ? '#EDE9FE' : '#F8FAFC',
                                                            fontWeight: 800,
                                                            fontSize: 12,
                                                            cursor: 'pointer',
                                                            color: useSplitPayment ? '#553C9A' : '#718096',
                                                            transition: 'all 0.15s'
                                                        },
                                                        children: "✂️ Split Payment"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 1812,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 1805,
                                                columnNumber: 33
                                            }, this),
                                            !useSplitPayment && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: '#F8FAFC',
                                                    borderRadius: 10,
                                                    border: '1.5px solid #E2E8F0',
                                                    padding: '10px 14px'
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
                                                                children: "Amount Given (₹)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                lineNumber: 1824,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                value: amountGiven,
                                                                onChange: (e)=>setAmountGiven(e.target.value),
                                                                style: {
                                                                    width: 130,
                                                                    border: '1.5px solid #CBD5E0',
                                                                    borderRadius: 8,
                                                                    outline: 'none',
                                                                    padding: '8px 12px',
                                                                    textAlign: 'right',
                                                                    fontSize: 16,
                                                                    fontWeight: 800
                                                                },
                                                                placeholder: "0.00"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                lineNumber: 1825,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 1823,
                                                        columnNumber: 41
                                                    }, this),
                                                    amountGiven && parseFloat(amountGiven) > 0 && (()=>{
                                                        const amountGivenVal = parseFloat(amountGiven) || 0;
                                                        const excess = Math.max(0, amountGivenVal - grandTotal);
                                                        const excessApplied = selectedCustomer && selectedCustomer.balance > 0 && tallyWithBalance ? Math.min(excess, selectedCustomer.balance) : 0;
                                                        const changeToReturn = excess - excessApplied;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                marginTop: 8,
                                                                fontSize: 14,
                                                                fontWeight: 900
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        color: '#4A5568'
                                                                    },
                                                                    children: "Balance Return (Change):"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                    lineNumber: 1841,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        color: amountGivenVal >= grandTotal ? '#38A169' : '#E53E3E'
                                                                    },
                                                                    children: [
                                                                        amountGivenVal >= grandTotal ? '+' : '',
                                                                        "₹",
                                                                        changeToReturn.toFixed(2)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                    lineNumber: 1842,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 1840,
                                                            columnNumber: 49
                                                        }, this);
                                                    })(),
                                                    selectedCustomer && selectedCustomer.balance > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            marginTop: 10,
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            gap: 6,
                                                            borderTop: '1.5px dashed #E2E8F0',
                                                            paddingTop: 10
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                style: {
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: 8,
                                                                    fontSize: 12,
                                                                    fontWeight: 700,
                                                                    color: '#2B6CB0',
                                                                    cursor: 'pointer'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "checkbox",
                                                                        checked: tallyWithBalance,
                                                                        onChange: (e)=>setTallyWithBalance(e.target.checked),
                                                                        style: {
                                                                            width: 16,
                                                                            height: 16,
                                                                            cursor: 'pointer'
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                        lineNumber: 1853,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    "Adjust excess payment to clear outstanding balance (Current: ₹",
                                                                    selectedCustomer.balance.toFixed(2),
                                                                    ")"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                lineNumber: 1852,
                                                                columnNumber: 49
                                                            }, this),
                                                            amountGiven && parseFloat(amountGiven) > grandTotal && tallyWithBalance && (()=>{
                                                                const amountGivenVal = parseFloat(amountGiven) || 0;
                                                                const excess = amountGivenVal - grandTotal;
                                                                const excessApplied = Math.min(excess, selectedCustomer.balance);
                                                                const newOldBalance = selectedCustomer.balance - excessApplied;
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        background: '#EBF8FF',
                                                                        padding: '8px 12px',
                                                                        borderRadius: 8,
                                                                        fontSize: 12,
                                                                        color: '#2B6CB0',
                                                                        display: 'flex',
                                                                        flexDirection: 'column',
                                                                        gap: 4,
                                                                        marginTop: 4
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                display: 'flex',
                                                                                justifyContent: 'space-between'
                                                                            },
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: "Deducted from Old Balance:"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                                    lineNumber: 1870,
                                                                                    columnNumber: 65
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    style: {
                                                                                        fontWeight: 800
                                                                                    },
                                                                                    children: [
                                                                                        "-₹",
                                                                                        excessApplied.toFixed(2)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                                    lineNumber: 1871,
                                                                                    columnNumber: 65
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                            lineNumber: 1869,
                                                                            columnNumber: 61
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                display: 'flex',
                                                                                justifyContent: 'space-between'
                                                                            },
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: "Remaining Old Balance:"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                                    lineNumber: 1874,
                                                                                    columnNumber: 65
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    style: {
                                                                                        fontWeight: 800
                                                                                    },
                                                                                    children: [
                                                                                        "₹",
                                                                                        newOldBalance.toFixed(2)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                                    lineNumber: 1875,
                                                                                    columnNumber: 65
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                            lineNumber: 1873,
                                                                            columnNumber: 61
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                    lineNumber: 1868,
                                                                    columnNumber: 57
                                                                }, this);
                                                            })(),
                                                            amountGiven && parseFloat(amountGiven) < grandTotal && (()=>{
                                                                const amountGivenVal = parseFloat(amountGiven) || 0;
                                                                const dueToday = grandTotal - amountGivenVal;
                                                                const newBalance = selectedCustomer.balance + dueToday;
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        background: '#FFF5F5',
                                                                        padding: '8px 12px',
                                                                        borderRadius: 8,
                                                                        fontSize: 12,
                                                                        color: '#C53030',
                                                                        display: 'flex',
                                                                        flexDirection: 'column',
                                                                        gap: 4,
                                                                        marginTop: 4
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                display: 'flex',
                                                                                justifyContent: 'space-between'
                                                                            },
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: "Today's Unpaid (Added to Balance):"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                                    lineNumber: 1888,
                                                                                    columnNumber: 65
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    style: {
                                                                                        fontWeight: 800
                                                                                    },
                                                                                    children: [
                                                                                        "+₹",
                                                                                        dueToday.toFixed(2)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                                    lineNumber: 1889,
                                                                                    columnNumber: 65
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                            lineNumber: 1887,
                                                                            columnNumber: 61
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                display: 'flex',
                                                                                justifyContent: 'space-between'
                                                                            },
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: "New Outstanding Balance:"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                                    lineNumber: 1892,
                                                                                    columnNumber: 65
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    style: {
                                                                                        fontWeight: 800
                                                                                    },
                                                                                    children: [
                                                                                        "₹",
                                                                                        newBalance.toFixed(2)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                                    lineNumber: 1893,
                                                                                    columnNumber: 65
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                            lineNumber: 1891,
                                                                            columnNumber: 61
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                    lineNumber: 1886,
                                                                    columnNumber: 57
                                                                }, this);
                                                            })()
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 1851,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 1822,
                                                columnNumber: 37
                                            }, this),
                                            useSplitPayment && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: '#FAFBFF',
                                                    border: '1.5px solid #C3B8F8',
                                                    borderRadius: 12,
                                                    padding: '14px 16px'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: 11,
                                                            fontWeight: 800,
                                                            color: '#553C9A',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.05em',
                                                            marginBottom: 10
                                                        },
                                                        children: "Split Payment Breakdown"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 1906,
                                                        columnNumber: 41
                                                    }, this),
                                                    splitPayments.map((sp, idx)=>{
                                                        const methodInfo = SPLIT_METHODS.find((m)=>m.key === sp.method);
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                gap: 8,
                                                                marginBottom: 8,
                                                                alignItems: 'center'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                    value: sp.method,
                                                                    onChange: (e)=>setSplitPayments((prev)=>prev.map((p, i)=>i === idx ? {
                                                                                    ...p,
                                                                                    method: e.target.value
                                                                                } : p)),
                                                                    style: {
                                                                        flex: 1,
                                                                        padding: '9px 10px',
                                                                        borderRadius: 8,
                                                                        border: '1.5px solid #E2E8F0',
                                                                        fontSize: 13,
                                                                        fontWeight: 700,
                                                                        color: methodInfo?.color || '#4A5568',
                                                                        background: 'white',
                                                                        outline: 'none'
                                                                    },
                                                                    children: SPLIT_METHODS.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: m.key,
                                                                            children: m.label
                                                                        }, m.key, false, {
                                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                            lineNumber: 1916,
                                                                            columnNumber: 81
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                    lineNumber: 1911,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        position: 'relative',
                                                                        flex: 1
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            style: {
                                                                                position: 'absolute',
                                                                                left: 10,
                                                                                top: '50%',
                                                                                transform: 'translateY(-50%)',
                                                                                fontSize: 14,
                                                                                fontWeight: 800,
                                                                                color: '#4A5568'
                                                                            },
                                                                            children: "₹"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                            lineNumber: 1919,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "number",
                                                                            placeholder: "0.00",
                                                                            value: sp.amount,
                                                                            onChange: (e)=>setSplitPayments((prev)=>prev.map((p, i)=>i === idx ? {
                                                                                            ...p,
                                                                                            amount: e.target.value
                                                                                        } : p)),
                                                                            style: {
                                                                                width: '100%',
                                                                                padding: '9px 8px 9px 24px',
                                                                                borderRadius: 8,
                                                                                border: '1.5px solid #E2E8F0',
                                                                                fontSize: 14,
                                                                                fontWeight: 800,
                                                                                outline: 'none',
                                                                                textAlign: 'right'
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                            lineNumber: 1920,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                    lineNumber: 1918,
                                                                    columnNumber: 53
                                                                }, this),
                                                                idx > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>setSplitPayments((prev)=>prev.filter((_, i)=>i !== idx)),
                                                                    style: {
                                                                        background: '#FEE2E2',
                                                                        border: 'none',
                                                                        borderRadius: 8,
                                                                        width: 34,
                                                                        height: 38,
                                                                        cursor: 'pointer',
                                                                        color: '#C53030',
                                                                        fontWeight: 900,
                                                                        fontSize: 18,
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        flexShrink: 0
                                                                    },
                                                                    children: "×"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                    lineNumber: 1929,
                                                                    columnNumber: 57
                                                                }, this)
                                                            ]
                                                        }, idx, true, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 1910,
                                                            columnNumber: 49
                                                        }, this);
                                                    }),
                                                    splitPayments.length < 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setSplitPayments((prev)=>[
                                                                    ...prev,
                                                                    {
                                                                        method: prev[0]?.method === 'cash' ? 'upi' : 'cash',
                                                                        amount: ''
                                                                    }
                                                                ]),
                                                        style: {
                                                            width: '100%',
                                                            padding: '8px',
                                                            borderRadius: 8,
                                                            border: '1.5px dashed #C3B8F8',
                                                            background: 'white',
                                                            color: '#6B46C1',
                                                            fontWeight: 800,
                                                            fontSize: 12,
                                                            cursor: 'pointer',
                                                            marginTop: 2
                                                        },
                                                        children: "+ Add Payment Method"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 1935,
                                                        columnNumber: 45
                                                    }, this),
                                                    (()=>{
                                                        const totalSplit = splitPayments.reduce((a, s)=>a + (parseFloat(s.amount) || 0), 0);
                                                        const remaining = grandTotal - totalSplit;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                marginTop: 10,
                                                                padding: '10px 12px',
                                                                background: remaining > 0.01 ? '#FFF5F5' : '#F0FFF4',
                                                                borderRadius: 8,
                                                                border: `1.5px solid ${remaining > 0.01 ? '#FED7D7' : '#9AE6B4'}`,
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontSize: 12,
                                                                        fontWeight: 800,
                                                                        color: remaining > 0.01 ? '#C53030' : '#276749'
                                                                    },
                                                                    children: remaining > 0.01 ? `⚠️ Remaining: ₹${remaining.toFixed(2)}` : '✅ Fully covered'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                    lineNumber: 1946,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontSize: 12,
                                                                        fontWeight: 700,
                                                                        color: '#4A5568'
                                                                    },
                                                                    children: [
                                                                        "Collected: ₹",
                                                                        Math.min(totalSplit, grandTotal).toFixed(2)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                    lineNumber: 1949,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 1945,
                                                            columnNumber: 49
                                                        }, this);
                                                    })()
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 1905,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 1688,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
                                            gap: 12,
                                            marginTop: 8
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
                                                                lineNumber: 1961,
                                                                columnNumber: 37
                                                            }, this),
                                                            " PRINT (F12)"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 1960,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            width: 1,
                                                            background: '#CBD5E0'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 1963,
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
                                                            lineNumber: 1965,
                                                            columnNumber: 37
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 1964,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 1959,
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
                                                lineNumber: 1968,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 1958,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                lineNumber: 1657,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/billing/quick/page.tsx",
                        lineNumber: 1648,
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
                                    lineNumber: 1981,
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
                                            lineNumber: 1983,
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
                                                    lineNumber: 1986,
                                                    columnNumber: 41
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 1984,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 1982,
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
                                            lineNumber: 1995,
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
                                                    lineNumber: 1996,
                                                    columnNumber: 283
                                                }, this),
                                                " Print"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 1996,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 1994,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/billing/quick/page.tsx",
                            lineNumber: 1980,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/company/billing/quick/page.tsx",
                        lineNumber: 1979,
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
                                padding: 28,
                                borderRadius: 16,
                                width: 460,
                                maxHeight: '80vh',
                                display: 'flex',
                                flexDirection: 'column',
                                animation: 'fadeUp 0.2s ease',
                                boxSizing: 'border-box'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    style: {
                                        fontWeight: 900,
                                        fontSize: 18,
                                        marginBottom: 4,
                                        color: '#1A202C'
                                    },
                                    children: actionModal.isRefund ? 'Refund Invoice' : 'Fetch Invoice'
                                }, void 0, false, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 2006,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 13,
                                        color: '#718096',
                                        marginBottom: 16
                                    },
                                    children: "Select a previous bill below or search by invoice number / customer."
                                }, void 0, false, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 2009,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        position: 'relative',
                                        marginBottom: 16
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            autoFocus: true,
                                            value: actionQuery,
                                            onChange: (e)=>setActionQuery(e.target.value),
                                            onKeyDown: (e)=>e.key === 'Enter' && executeAction(),
                                            placeholder: "Search invoice number, name, or phone...",
                                            className: "mi-input",
                                            style: {
                                                paddingLeft: '36px',
                                                paddingRight: '12px',
                                                fontSize: 14,
                                                height: '40px',
                                                boxSizing: 'border-box',
                                                fontWeight: 600
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 2015,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                            size: 16,
                                            color: "#A0AEC0",
                                            style: {
                                                position: 'absolute',
                                                left: 12,
                                                top: 12
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 2024,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 2014,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        flex: 1,
                                        overflowY: 'auto',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 8,
                                        marginBottom: 20,
                                        paddingRight: 4
                                    },
                                    className: "custom-scrollbar",
                                    children: filteredPreviousInvoices.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            textAlign: 'center',
                                            color: '#A0AEC0',
                                            padding: '24px 0',
                                            fontSize: 13
                                        },
                                        children: "No invoices found matching query."
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 2030,
                                        columnNumber: 37
                                    }, this) : filteredPreviousInvoices.map((inv)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onClick: ()=>selectInvoice(inv),
                                            style: {
                                                padding: '12px 14px',
                                                border: '1px solid #E2E8F0',
                                                borderRadius: '10px',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                                transition: 'all 0.15s ease'
                                            },
                                            className: "fetch-row-hover",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontWeight: 800,
                                                                fontSize: 14,
                                                                color: '#1A202C',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 6
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                                    size: 14,
                                                                    color: "#718096"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                    lineNumber: 2052,
                                                                    columnNumber: 53
                                                                }, this),
                                                                inv.invoiceNumber
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 2051,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: 12,
                                                                color: '#4A5568',
                                                                fontWeight: 600,
                                                                marginTop: 2
                                                            },
                                                            children: inv.partyName || 'Cash / Walk-in Customer'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 2055,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 2050,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        textAlign: 'right'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontWeight: 800,
                                                                fontSize: 14,
                                                                color: '#2D3748',
                                                                fontFamily: 'monospace'
                                                            },
                                                            children: [
                                                                "₹",
                                                                inv.grandTotal.toFixed(2)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 2060,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: 11,
                                                                color: '#718096',
                                                                marginTop: 2
                                                            },
                                                            children: [
                                                                inv.date,
                                                                " ",
                                                                inv.time || ''
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 2063,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 2059,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, inv.id, true, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 2035,
                                            columnNumber: 41
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 2028,
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
                                            lineNumber: 2073,
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
                                            lineNumber: 2074,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 2072,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                    children: `
                                .fetch-row-hover:hover {
                                    background: #F7FAFC;
                                    border-color: #CBD5E0 !important;
                                    transform: translateY(-1px);
                                    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
                                }
                                .custom-scrollbar::-webkit-scrollbar {
                                    width: 5px;
                                }
                                .custom-scrollbar::-webkit-scrollbar-track {
                                    background: #F7FAFC;
                                    border-radius: 4px;
                                }
                                .custom-scrollbar::-webkit-scrollbar-thumb {
                                    background: #CBD5E0;
                                    border-radius: 4px;
                                }
                                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                                    background: #A0AEC0;
                                }
                            `
                                }, void 0, false, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 2077,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/billing/quick/page.tsx",
                            lineNumber: 2005,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/company/billing/quick/page.tsx",
                        lineNumber: 2004,
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
                                    lineNumber: 2107,
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
                                    lineNumber: 2108,
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
                                            lineNumber: 2114,
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
                                                                lineNumber: 2119,
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
                                                                lineNumber: 2120,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 2118,
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
                                                        lineNumber: 2124,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, inv.id, true, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 2117,
                                                columnNumber: 37
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 2112,
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
                                        lineNumber: 2139,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 2138,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/billing/quick/page.tsx",
                            lineNumber: 2106,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/company/billing/quick/page.tsx",
                        lineNumber: 2105,
                        columnNumber: 21
                    }, this),
                    showColumnConfig && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 9999
                        },
                        onClick: ()=>setShowColumnConfig(false),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: (e)=>e.stopPropagation(),
                            style: {
                                background: 'white',
                                padding: 24,
                                borderRadius: 16,
                                width: 360,
                                display: 'flex',
                                flexDirection: 'column',
                                animation: 'fadeUp 0.2s ease'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: 16
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            style: {
                                                fontWeight: 900,
                                                fontSize: 18,
                                                color: '#1A202C',
                                                margin: 0
                                            },
                                            children: "Configure Billing Columns"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 2150,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowColumnConfig(false),
                                            style: {
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                padding: 4
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                size: 20,
                                                color: "#718096"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 2152,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 2151,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 2149,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 13,
                                        color: '#718096',
                                        marginBottom: 20
                                    },
                                    children: "Toggle billing columns on or off. These changes will be applied to all staff and role logins instantly."
                                }, void 0, false, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 2155,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 12,
                                        marginBottom: 24
                                    },
                                    children: [
                                        {
                                            key: 'barcode',
                                            label: 'Barcode'
                                        },
                                        {
                                            key: 'hsn',
                                            label: 'HSN / SAC Code'
                                        },
                                        {
                                            key: 'mfgDate',
                                            label: 'Mfg Date'
                                        },
                                        {
                                            key: 'mrp',
                                            label: 'MRP'
                                        },
                                        {
                                            key: 'size',
                                            label: 'Size'
                                        },
                                        {
                                            key: 'discount',
                                            label: 'Discount Columns'
                                        },
                                        {
                                            key: 'tax',
                                            label: 'Tax Columns'
                                        }
                                    ].map((col)=>{
                                        const isChecked = cols[col.key] ?? true;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 12,
                                                fontSize: 14,
                                                fontWeight: 700,
                                                color: '#2D3748',
                                                cursor: 'pointer',
                                                userSelect: 'none'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: isChecked,
                                                    onChange: (e)=>{
                                                        const updatedCols = {
                                                            ...cols,
                                                            [col.key]: e.target.checked
                                                        };
                                                        updateCompany(companyId, {
                                                            quickBillingColumns: updatedCols
                                                        });
                                                    },
                                                    style: {
                                                        width: 18,
                                                        height: 18,
                                                        cursor: 'pointer'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 2172,
                                                    columnNumber: 45
                                                }, this),
                                                col.label
                                            ]
                                        }, col.key, true, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 2171,
                                            columnNumber: 41
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 2159,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowColumnConfig(false),
                                    className: "mi-btn",
                                    style: {
                                        background: '#4285F4',
                                        color: 'white',
                                        border: 'none',
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: 10,
                                        justifyContent: 'center',
                                        fontSize: 14,
                                        fontWeight: 800
                                    },
                                    children: "Save Settings"
                                }, void 0, false, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 2190,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/billing/quick/page.tsx",
                            lineNumber: 2148,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/company/billing/quick/page.tsx",
                        lineNumber: 2147,
                        columnNumber: 21
                    }, this),
                    showSuspendModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 9999
                        },
                        onClick: ()=>setShowSuspendModal(false),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: (e)=>e.stopPropagation(),
                            style: {
                                background: 'white',
                                padding: 32,
                                borderRadius: 16,
                                width: 500,
                                maxHeight: '80vh',
                                display: 'flex',
                                flexDirection: 'column',
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
                                    children: "Suspend / Hold Bills"
                                }, void 0, false, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 2201,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 13,
                                        color: '#718096',
                                        marginBottom: 20
                                    },
                                    children: "Suspend the current active bill to serve another customer, or resume a previously suspended bill."
                                }, void 0, false, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 2202,
                                    columnNumber: 29
                                }, this),
                                validItems.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: '#F7FAFC',
                                        border: '1px solid #E2E8F0',
                                        padding: 16,
                                        borderRadius: 12,
                                        marginBottom: 20
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            style: {
                                                fontWeight: 800,
                                                fontSize: 13,
                                                color: '#4A5568',
                                                marginBottom: 8
                                            },
                                            children: "Suspend Active Bill"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 2209,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontWeight: 700,
                                                                fontSize: 14
                                                            },
                                                            children: partyName || 'Walk-in Customer'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 2212,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: 12,
                                                                color: '#718096',
                                                                marginLeft: 8
                                                            },
                                                            children: [
                                                                "(",
                                                                validItems.length,
                                                                " items - ₹",
                                                                grandTotal,
                                                                ")"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 2213,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 2211,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: handleSuspend,
                                                    className: "mi-btn",
                                                    style: {
                                                        background: '#E53E3E',
                                                        color: 'white',
                                                        border: 'none'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PauseCircle$3e$__["PauseCircle"], {
                                                            size: 14
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 2216,
                                                            columnNumber: 45
                                                        }, this),
                                                        " Suspend Bill"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 2215,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 2210,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 2208,
                                    columnNumber: 33
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        background: '#FFF5F5',
                                        border: '1px solid #FED7D7',
                                        color: '#C53030',
                                        padding: '12px 16px',
                                        borderRadius: 8,
                                        fontSize: 12,
                                        fontWeight: 700,
                                        marginBottom: 20
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 2222,
                                            columnNumber: 37
                                        }, this),
                                        "No items in current active bill to suspend."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 2221,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    style: {
                                        fontWeight: 800,
                                        fontSize: 13,
                                        color: '#4A5568',
                                        marginBottom: 10
                                    },
                                    children: [
                                        "Suspended Bills (",
                                        suspendedBills.length,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 2228,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 10,
                                        overflowY: 'auto',
                                        flex: 1
                                    },
                                    children: suspendedBills.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            textAlign: 'center',
                                            color: '#A0AEC0',
                                            padding: '20px 0',
                                            fontSize: 13
                                        },
                                        children: "No suspended bills on hold."
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 2231,
                                        columnNumber: 37
                                    }, this) : suspendedBills.map((sus)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                padding: 14,
                                                border: '1px solid #E2E8F0',
                                                borderRadius: 10,
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                background: '#F8FAFC'
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
                                                                fontSize: 14,
                                                                color: '#2D3748'
                                                            },
                                                            children: sus.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 2236,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: 11,
                                                                color: '#A0AEC0',
                                                                marginTop: 2
                                                            },
                                                            children: [
                                                                new Date(sus.suspendedAt).toLocaleTimeString([], {
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                }),
                                                                " • ",
                                                                sus.items.length,
                                                                " items"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 2237,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: 12,
                                                                color: '#718096',
                                                                marginTop: 4
                                                            },
                                                            children: sus.items.map((it)=>`${it.name} x${it.qty}`).join(', ')
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 2238,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 2235,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        gap: 8,
                                                        alignItems: 'center'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontWeight: 800,
                                                                color: '#1A202C',
                                                                fontSize: 14,
                                                                marginRight: 8
                                                            },
                                                            children: [
                                                                "₹",
                                                                sus.grandTotal
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 2243,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleResumeSuspended(sus),
                                                            className: "mi-btn",
                                                            style: {
                                                                background: '#4285F4',
                                                                color: 'white',
                                                                border: 'none',
                                                                padding: '6px 12px'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__["PlayCircle"], {
                                                                    size: 14
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                    lineNumber: 2245,
                                                                    columnNumber: 53
                                                                }, this),
                                                                " Resume"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 2244,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleDeleteSuspended(sus.id),
                                                            className: "mi-btn",
                                                            style: {
                                                                background: 'transparent',
                                                                color: '#E53E3E',
                                                                border: 'none',
                                                                padding: '6px 8px'
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                size: 14
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                lineNumber: 2248,
                                                                columnNumber: 53
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                                            lineNumber: 2247,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 2242,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, sus.id, true, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 2234,
                                            columnNumber: 41
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 2229,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: 12,
                                        marginTop: 24
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowSuspendModal(false),
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
                                        lineNumber: 2257,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                    lineNumber: 2256,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/billing/quick/page.tsx",
                            lineNumber: 2200,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/company/billing/quick/page.tsx",
                        lineNumber: 2199,
                        columnNumber: 21
                    }, this),
                    showBalanceModal && (()=>{
                        // Compute accurate balances from actual unpaid invoices (not party.balance which can be corrupted)
                        const DRAFT = [
                            'estimate',
                            'proforma',
                            'delivery_challan'
                        ];
                        const trackerMap = new Map();
                        // Build map from parties
                        parties.filter((p)=>p.companyId === companyId).forEach((p)=>{
                            const key = normPhone(p.phone) || p.id;
                            if (!trackerMap.has(key)) trackerMap.set(key, {
                                party: p,
                                computedBalance: 0
                            });
                        });
                        // Sum up unpaid invoice balanceDue per party key
                        invoices.filter((i)=>i.invoiceType === 'sale' && !DRAFT.includes(i.invoiceType) && i.paymentStatus !== 'paid' && (i.balanceDue ?? 0) > 0).forEach((i)=>{
                            const key = normPhone(i.partyPhone) || i.partyId || '';
                            if (!key) return;
                            if (trackerMap.has(key)) {
                                trackerMap.get(key).computedBalance += i.balanceDue;
                            } else {
                                // Invoice references a party not in parties list — find by id or phone
                                const p = parties.find((p)=>p.id === i.partyId) || parties.find((p)=>normPhone(p.phone) === key);
                                if (p) {
                                    const pKey = normPhone(p.phone) || p.id;
                                    if (trackerMap.has(pKey)) {
                                        trackerMap.get(pKey).computedBalance += i.balanceDue;
                                    } else {
                                        trackerMap.set(pKey, {
                                            party: p,
                                            computedBalance: i.balanceDue
                                        });
                                    }
                                } else {
                                    trackerMap.set(key, {
                                        party: {
                                            id: i.partyId,
                                            name: i.partyName,
                                            phone: i.partyPhone
                                        },
                                        computedBalance: i.balanceDue
                                    });
                                }
                            }
                        });
                        const trackerEntries = Array.from(trackerMap.entries()).map(([mapKey, value])=>({
                                mapKey,
                                ...value
                            })).filter((e)=>e.computedBalance > 0).filter((e)=>{
                            if (!balanceSearchQuery) return true;
                            const q = balanceSearchQuery.toLowerCase().trim();
                            return e.party.name?.toLowerCase().includes(q) || (e.party.phone || '').includes(q);
                        }).sort((a, b)=>b.computedBalance - a.computedBalance);
                        const grandTotal = trackerEntries.reduce((a, e)=>a + e.computedBalance, 0);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'fixed',
                                inset: 0,
                                background: 'rgba(0,0,0,0.5)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 9999
                            },
                            onClick: ()=>setShowBalanceModal(false),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: (e)=>e.stopPropagation(),
                                style: {
                                    background: 'white',
                                    padding: 32,
                                    borderRadius: 16,
                                    width: 600,
                                    maxHeight: '85vh',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    animation: 'fadeUp 0.2s ease'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: 8
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                style: {
                                                    fontWeight: 900,
                                                    fontSize: 18,
                                                    color: '#1A202C',
                                                    margin: 0
                                                },
                                                children: "Customer Balance Tracker"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 2312,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    background: '#E6FFFA',
                                                    color: '#2C7A7B',
                                                    padding: '4px 10px',
                                                    borderRadius: 999,
                                                    fontSize: 11,
                                                    fontWeight: 800
                                                },
                                                children: [
                                                    "Total Pending: ₹",
                                                    grandTotal.toLocaleString('en-IN')
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 2313,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 2311,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 13,
                                            color: '#718096',
                                            marginBottom: 16
                                        },
                                        children: "View pending balance amounts from each customer. Click a customer to quickly auto-populate details."
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 2317,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: 'relative',
                                            marginBottom: 16
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Search customer by name or phone...",
                                                value: balanceSearchQuery,
                                                onChange: (e)=>setBalanceSearchQuery(e.target.value),
                                                style: {
                                                    width: '100%',
                                                    padding: '10px 14px 10px 36px',
                                                    borderRadius: 8,
                                                    border: '1px solid #CBD5E0',
                                                    fontSize: 13,
                                                    outline: 'none',
                                                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 2323,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                size: 16,
                                                color: "#A0AEC0",
                                                style: {
                                                    position: 'absolute',
                                                    left: 12,
                                                    top: '50%',
                                                    transform: 'translateY(-50%)'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 2338,
                                                columnNumber: 29
                                            }, this),
                                            balanceSearchQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setBalanceSearchQuery(''),
                                                style: {
                                                    position: 'absolute',
                                                    right: 12,
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    color: '#A0AEC0'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/billing/quick/page.tsx",
                                                    lineNumber: 2344,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 2340,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 2322,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 10,
                                            overflowY: 'auto',
                                            flex: 1
                                        },
                                        children: trackerEntries.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                textAlign: 'center',
                                                color: '#A0AEC0',
                                                padding: '40px 0',
                                                fontSize: 13
                                            },
                                            children: "No customers with outstanding balance."
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/billing/quick/page.tsx",
                                            lineNumber: 2351,
                                            columnNumber: 33
                                        }, this) : trackerEntries.map(({ mapKey, party, computedBalance })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    padding: 14,
                                                    border: '1px solid #E2E8F0',
                                                    borderRadius: 10,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 10,
                                                    background: '#F8FAFC'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            fontWeight: 800,
                                                                            fontSize: 14,
                                                                            color: '#2D3748'
                                                                        },
                                                                        children: party.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                        lineNumber: 2356,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            fontSize: 11,
                                                                            color: '#A0AEC0',
                                                                            marginTop: 2
                                                                        },
                                                                        children: party.phone || 'No phone'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                        lineNumber: 2357,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                lineNumber: 2355,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    gap: 8,
                                                                    alignItems: 'center'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontWeight: 900,
                                                                            color: '#E53E3E',
                                                                            fontSize: 15
                                                                        },
                                                                        children: [
                                                                            "₹",
                                                                            computedBalance.toLocaleString('en-IN')
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                        lineNumber: 2360,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>{
                                                                            setPartyName(party.name);
                                                                            setPartyPhone(party.phone || '');
                                                                            setBillingAddress(party.billingAddress || party.address || '');
                                                                            setShowBalanceModal(false);
                                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success(`Selected customer "${party.name}"`);
                                                                        },
                                                                        className: "mi-btn",
                                                                        style: {
                                                                            background: '#E6FFFA',
                                                                            color: '#2C7A7B',
                                                                            border: 'none',
                                                                            padding: '6px 12px',
                                                                            fontSize: 12
                                                                        },
                                                                        children: "Select"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                        lineNumber: 2361,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                lineNumber: 2359,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 2354,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            gap: 8,
                                                            alignItems: 'center',
                                                            borderTop: '1px solid #EDF2F7',
                                                            paddingTop: 10,
                                                            flexWrap: 'wrap'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: 12,
                                                                    color: '#718096',
                                                                    fontWeight: 600
                                                                },
                                                                children: "Amount Paid:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                lineNumber: 2373,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                placeholder: "0.00",
                                                                value: customPayments[party.id] || '',
                                                                onChange: (e)=>setCustomPayments((prev)=>({
                                                                            ...prev,
                                                                            [party.id]: e.target.value
                                                                        })),
                                                                style: {
                                                                    width: 90,
                                                                    padding: '4px 8px',
                                                                    border: '1px solid #CBD5E0',
                                                                    borderRadius: 6,
                                                                    fontSize: 12,
                                                                    outline: 'none'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                lineNumber: 2374,
                                                                columnNumber: 50
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>{
                                                                    const amt = parseFloat(customPayments[party.id]) || 0;
                                                                    if (amt <= 0) {
                                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Please enter a valid amount greater than 0');
                                                                        return;
                                                                    }
                                                                    if (amt > computedBalance) {
                                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error(`Amount exceeds pending balance of ₹${computedBalance.toLocaleString('en-IN')}`);
                                                                        return;
                                                                    }
                                                                    // addBalancePayment handles the balance update + records into paymentHistory
                                                                    addBalancePayment(party.id, {
                                                                        type: 'received',
                                                                        amount: amt,
                                                                        method: 'cash',
                                                                        date: new Date().toLocaleDateString('sv-SE'),
                                                                        note: 'Recorded via Balance Tracker'
                                                                    });
                                                                    let remainingPayment = amt;
                                                                    const sortedInvoices = [
                                                                        ...invoices
                                                                    ].reverse();
                                                                    sortedInvoices.forEach((inv)=>{
                                                                        if (remainingPayment <= 0) return;
                                                                        if (inv.partyId === party.id || party.phone && inv.partyPhone === party.phone) {
                                                                            if (inv.balanceDue > 0) {
                                                                                const deduction = Math.min(inv.balanceDue, remainingPayment);
                                                                                const newPaid = inv.amountPaid + deduction;
                                                                                const newDue = inv.balanceDue - deduction;
                                                                                updateInvoice(inv.id, {
                                                                                    amountPaid: newPaid,
                                                                                    balanceDue: newDue,
                                                                                    paymentStatus: newDue === 0 ? 'paid' : 'partial'
                                                                                });
                                                                                remainingPayment -= deduction;
                                                                            }
                                                                        }
                                                                    });
                                                                    setCustomPayments((prev)=>({
                                                                            ...prev,
                                                                            [party.id]: ''
                                                                        }));
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success(`Received ₹${amt.toLocaleString('en-IN')} payment from "${party.name}"`);
                                                                },
                                                                className: "mi-btn",
                                                                style: {
                                                                    background: '#EBF8FF',
                                                                    color: '#2B6CB0',
                                                                    border: 'none',
                                                                    padding: '4px 10px',
                                                                    fontSize: 12,
                                                                    fontWeight: 700,
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: 4
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                        size: 12
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                        lineNumber: 2423,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    " Record Payment"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                lineNumber: 2381,
                                                                columnNumber: 50
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: async ()=>{
                                                                    const confirmed = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["confirm"])({
                                                                        title: 'Clear Outstanding Balance',
                                                                        message: `Are you sure you want to mark the balance of ₹${computedBalance.toLocaleString('en-IN')} as fully paid for "${party.name}"?`,
                                                                        confirmLabel: 'Mark Fully Paid',
                                                                        success: true
                                                                    });
                                                                    if (confirmed) {
                                                                        const fullAmt = computedBalance;
                                                                        // addBalancePayment handles the balance update (sets to 0) + records history
                                                                        addBalancePayment(party.id, {
                                                                            type: 'received',
                                                                            amount: fullAmt,
                                                                            method: 'cash',
                                                                            date: new Date().toLocaleDateString('sv-SE'),
                                                                            note: 'Marked fully paid via Balance Tracker'
                                                                        });
                                                                        invoices.forEach((inv)=>{
                                                                            if (inv.partyId === party.id || party.phone && inv.partyPhone === party.phone) {
                                                                                if (inv.balanceDue > 0) {
                                                                                    updateInvoice(inv.id, {
                                                                                        paymentStatus: 'paid',
                                                                                        amountPaid: inv.grandTotal,
                                                                                        balanceDue: 0
                                                                                    });
                                                                                }
                                                                            }
                                                                        });
                                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success(`Cleared balance for "${party.name}"`);
                                                                    }
                                                                },
                                                                className: "mi-btn",
                                                                style: {
                                                                    background: '#F0FFF4',
                                                                    color: '#38A169',
                                                                    border: 'none',
                                                                    padding: '4px 10px',
                                                                    fontSize: 12,
                                                                    fontWeight: 700,
                                                                    marginLeft: 'auto'
                                                                },
                                                                children: "Paid Fully"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                                lineNumber: 2425,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                                        lineNumber: 2372,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, mapKey, true, {
                                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                                lineNumber: 2353,
                                                columnNumber: 33
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 2349,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            gap: 12,
                                            marginTop: 24
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowBalanceModal(false),
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
                                            lineNumber: 2464,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/billing/quick/page.tsx",
                                        lineNumber: 2463,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/billing/quick/page.tsx",
                                lineNumber: 2310,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/company/billing/quick/page.tsx",
                            lineNumber: 2309,
                            columnNumber: 17
                        }, this);
                    })()
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/billing/quick/page.tsx",
                lineNumber: 1333,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConfirmDialog"], {}, void 0, false, {
                fileName: "[project]/app/company/billing/quick/page.tsx",
                lineNumber: 2472,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/company/billing/quick/page.tsx",
        lineNumber: 1168,
        columnNumber: 9
    }, this);
}
_s(QuickBillingContent, "/0+kUX8B9ckPuZNNMYh04RLUY4o=", false, function() {
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
            lineNumber: 2478,
            columnNumber: 22
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/company/billing/quick/page.tsx",
        lineNumber: 2478,
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

//# sourceMappingURL=app_company_billing_quick_page_tsx_7089f1ee._.js.map