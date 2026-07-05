(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/company/settings/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SettingsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/store.js [app-client] (ecmascript) <export default as Store>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$warehouse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Warehouse$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/warehouse.js [app-client] (ecmascript) <export default as Warehouse>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$landmark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Landmark$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/landmark.js [app-client] (ecmascript) <export default as Landmark>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/database.js [app-client] (ecmascript) <export default as Database>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cloud$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/cloud.js [app-client] (ecmascript) <export default as Cloud>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/smartphone.js [app-client] (ecmascript) <export default as Smartphone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hard$2d$drive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HardDrive$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hard-drive.js [app-client] (ecmascript) <export default as HardDrive>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gift.js [app-client] (ecmascript) <export default as Gift>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ConfirmDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AutoBackup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AutoBackup.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function AutoBackupStatusCard() {
    _s();
    const meta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AutoBackup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAutoBackupMeta"])();
    const [restoring, setRestoring] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [intervalMs, setIntervalMsState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "AutoBackupStatusCard.useState": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AutoBackup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBackupIntervalMs"])()
    }["AutoBackupStatusCard.useState"]);
    const handleIntervalChange = (ms)=>{
        setIntervalMsState(ms);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AutoBackup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setBackupIntervalMs"])(ms);
        // Broadcast to other tabs so AutoBackup picks it up
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'edibio_backup_interval',
            newValue: String(ms)
        }));
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Backup interval updated!');
    };
    const handleRestore = async ()=>{
        const yes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["confirm"])({
            message: 'Restore all data from your last auto-backup? This will overwrite your current data.',
            danger: true
        });
        if (!yes) return;
        setRestoring(true);
        const ok = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AutoBackup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["restoreFromAutoBackup"])();
        setRestoring(false);
        if (ok) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('✅ Data restored from auto-backup!');
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('No auto-backup found.');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "card",
        style: {
            padding: '24px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    marginBottom: 16
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: 44,
                            height: 44,
                            borderRadius: 12,
                            background: '#FEF3C7',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hard$2d$drive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HardDrive$3e$__["HardDrive"], {
                            size: 20,
                            color: "#D97706"
                        }, void 0, false, {
                            fileName: "[project]/app/company/settings/page.tsx",
                            lineNumber: 51,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/company/settings/page.tsx",
                        lineNumber: 50,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    fontWeight: 800,
                                    fontSize: 16,
                                    color: '#1A1A2E',
                                    margin: 0
                                },
                                children: "Auto-Backup (Local)"
                            }, void 0, false, {
                                fileName: "[project]/app/company/settings/page.tsx",
                                lineNumber: 54,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 12,
                                    color: '#718096',
                                    marginTop: 2
                                },
                                children: "Saved automatically to your browser storage."
                            }, void 0, false, {
                                fileName: "[project]/app/company/settings/page.tsx",
                                lineNumber: 55,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/settings/page.tsx",
                        lineNumber: 53,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/settings/page.tsx",
                lineNumber: 49,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 16
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 11,
                            fontWeight: 800,
                            color: '#64748B',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            marginBottom: 8
                        },
                        children: "Backup Frequency"
                    }, void 0, false, {
                        fileName: "[project]/app/company/settings/page.tsx",
                        lineNumber: 61,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: 8,
                            flexWrap: 'wrap'
                        },
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AutoBackup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BACKUP_INTERVAL_OPTIONS"].map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleIntervalChange(opt.value),
                                style: {
                                    padding: '7px 16px',
                                    borderRadius: 8,
                                    border: '2px solid',
                                    borderColor: intervalMs === opt.value ? '#D97706' : '#E2E8F0',
                                    background: intervalMs === opt.value ? '#FFFBEB' : 'white',
                                    color: intervalMs === opt.value ? '#92400E' : '#64748B',
                                    fontWeight: 800,
                                    fontSize: 12,
                                    cursor: 'pointer',
                                    transition: 'all 0.15s'
                                },
                                children: opt.label
                            }, opt.value, false, {
                                fileName: "[project]/app/company/settings/page.tsx",
                                lineNumber: 64,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/company/settings/page.tsx",
                        lineNumber: 62,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/settings/page.tsx",
                lineNumber: 60,
                columnNumber: 13
            }, this),
            meta ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: '#FFFBEB',
                    border: '1px solid #FDE68A',
                    borderRadius: 12,
                    padding: '14px 16px',
                    marginBottom: 16
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        gap: 20,
                        flexWrap: 'wrap'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 10,
                                        fontWeight: 800,
                                        color: '#92400E',
                                        textTransform: 'uppercase'
                                    },
                                    children: "Last Saved"
                                }, void 0, false, {
                                    fileName: "[project]/app/company/settings/page.tsx",
                                    lineNumber: 84,
                                    columnNumber: 30
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 13,
                                        fontWeight: 700,
                                        color: '#1A1A2E',
                                        marginTop: 2
                                    },
                                    children: new Date(meta.savedAt).toLocaleString()
                                }, void 0, false, {
                                    fileName: "[project]/app/company/settings/page.tsx",
                                    lineNumber: 84,
                                    columnNumber: 135
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/settings/page.tsx",
                            lineNumber: 84,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 10,
                                        fontWeight: 800,
                                        color: '#92400E',
                                        textTransform: 'uppercase'
                                    },
                                    children: "Bills"
                                }, void 0, false, {
                                    fileName: "[project]/app/company/settings/page.tsx",
                                    lineNumber: 85,
                                    columnNumber: 30
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 13,
                                        fontWeight: 700,
                                        color: '#1A1A2E',
                                        marginTop: 2
                                    },
                                    children: meta.invoiceCount
                                }, void 0, false, {
                                    fileName: "[project]/app/company/settings/page.tsx",
                                    lineNumber: 85,
                                    columnNumber: 130
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/settings/page.tsx",
                            lineNumber: 85,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 10,
                                        fontWeight: 800,
                                        color: '#92400E',
                                        textTransform: 'uppercase'
                                    },
                                    children: "Parties"
                                }, void 0, false, {
                                    fileName: "[project]/app/company/settings/page.tsx",
                                    lineNumber: 86,
                                    columnNumber: 30
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 13,
                                        fontWeight: 700,
                                        color: '#1A1A2E',
                                        marginTop: 2
                                    },
                                    children: meta.partyCount
                                }, void 0, false, {
                                    fileName: "[project]/app/company/settings/page.tsx",
                                    lineNumber: 86,
                                    columnNumber: 132
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/settings/page.tsx",
                            lineNumber: 86,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 10,
                                        fontWeight: 800,
                                        color: '#92400E',
                                        textTransform: 'uppercase'
                                    },
                                    children: "Products"
                                }, void 0, false, {
                                    fileName: "[project]/app/company/settings/page.tsx",
                                    lineNumber: 87,
                                    columnNumber: 30
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 13,
                                        fontWeight: 700,
                                        color: '#1A1A2E',
                                        marginTop: 2
                                    },
                                    children: meta.productCount
                                }, void 0, false, {
                                    fileName: "[project]/app/company/settings/page.tsx",
                                    lineNumber: 87,
                                    columnNumber: 133
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/settings/page.tsx",
                            lineNumber: 87,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/company/settings/page.tsx",
                    lineNumber: 83,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/company/settings/page.tsx",
                lineNumber: 82,
                columnNumber: 17
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: '#F1F5F9',
                    borderRadius: 10,
                    padding: '12px 14px',
                    marginBottom: 16,
                    fontSize: 13,
                    color: '#64748B'
                },
                children: "No auto-backup saved yet. It will save automatically once you have data."
            }, void 0, false, {
                fileName: "[project]/app/company/settings/page.tsx",
                lineNumber: 91,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleRestore,
                disabled: restoring || !meta,
                className: "btn btn-outline",
                style: {
                    gap: 8
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hard$2d$drive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HardDrive$3e$__["HardDrive"], {
                        size: 15
                    }, void 0, false, {
                        fileName: "[project]/app/company/settings/page.tsx",
                        lineNumber: 96,
                        columnNumber: 17
                    }, this),
                    " ",
                    restoring ? 'Restoring…' : 'Restore from Auto-Backup'
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/settings/page.tsx",
                lineNumber: 95,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/company/settings/page.tsx",
        lineNumber: 48,
        columnNumber: 9
    }, this);
}
_s(AutoBackupStatusCard, "iEBAZi1jTEn7FOu3NM6PHWfHbGI=");
_c = AutoBackupStatusCard;
function RestaurantChargesPanel({ company, updateCompany, companyId }) {
    _s1();
    const [deliveryCharge, setDeliveryCharge] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(String(company?.restaurantSettings?.deliveryCharge ?? '0'));
    const [takeawayCharge, setTakeawayCharge] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(String(company?.restaurantSettings?.takeawayCharge ?? '0'));
    const [tableCount, setTableCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(String(company?.restaurantSettings?.tableCount ?? '12'));
    const saveCharges = ()=>{
        updateCompany(companyId, {
            restaurantSettings: {
                ...company?.restaurantSettings || {},
                deliveryCharge: parseFloat(deliveryCharge) || 0,
                takeawayCharge: parseFloat(takeawayCharge) || 0,
                tableCount: parseInt(tableCount) || 12
            }
        });
        // Also save to localStorage for POS page
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.setItem('restaurant_settings', JSON.stringify({
                deliveryCharge: parseFloat(deliveryCharge) || 0,
                takeawayCharge: parseFloat(takeawayCharge) || 0,
                tableCount: parseInt(tableCount) || 12
            }));
        }
        __turbopack_context__.A("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript, async loader)").then((m)=>m.default.success('Restaurant charges saved!'));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: '#EFF6FF',
            border: '1.5px solid #BFDBFE',
            borderRadius: 14,
            padding: '18px 20px',
            marginBottom: 24
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 14
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 22
                        },
                        children: "🍽️"
                    }, void 0, false, {
                        fileName: "[project]/app/company/settings/page.tsx",
                        lineNumber: 130,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    fontWeight: 800,
                                    fontSize: 14,
                                    color: '#1E40AF',
                                    margin: 0
                                },
                                children: "Restaurant Settings"
                            }, void 0, false, {
                                fileName: "[project]/app/company/settings/page.tsx",
                                lineNumber: 132,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 11,
                                    color: '#3B82F6',
                                    margin: 0
                                },
                                children: "Configure charges and table layout for your restaurant"
                            }, void 0, false, {
                                fileName: "[project]/app/company/settings/page.tsx",
                                lineNumber: 133,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/settings/page.tsx",
                        lineNumber: 131,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/settings/page.tsx",
                lineNumber: 129,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: 12
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: {
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: '#1E40AF',
                                    display: 'block',
                                    marginBottom: 5,
                                    textTransform: 'uppercase'
                                },
                                children: "Delivery Charge (₹)"
                            }, void 0, false, {
                                fileName: "[project]/app/company/settings/page.tsx",
                                lineNumber: 138,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                className: "e-input",
                                value: deliveryCharge,
                                onChange: (e)=>setDeliveryCharge(e.target.value),
                                placeholder: "0",
                                min: "0"
                            }, void 0, false, {
                                fileName: "[project]/app/company/settings/page.tsx",
                                lineNumber: 139,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/settings/page.tsx",
                        lineNumber: 137,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: {
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: '#1E40AF',
                                    display: 'block',
                                    marginBottom: 5,
                                    textTransform: 'uppercase'
                                },
                                children: "Takeaway Charge (₹)"
                            }, void 0, false, {
                                fileName: "[project]/app/company/settings/page.tsx",
                                lineNumber: 142,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                className: "e-input",
                                value: takeawayCharge,
                                onChange: (e)=>setTakeawayCharge(e.target.value),
                                placeholder: "0",
                                min: "0"
                            }, void 0, false, {
                                fileName: "[project]/app/company/settings/page.tsx",
                                lineNumber: 143,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/settings/page.tsx",
                        lineNumber: 141,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: {
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: '#1E40AF',
                                    display: 'block',
                                    marginBottom: 5,
                                    textTransform: 'uppercase'
                                },
                                children: "Number of Tables"
                            }, void 0, false, {
                                fileName: "[project]/app/company/settings/page.tsx",
                                lineNumber: 146,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                className: "e-input",
                                value: tableCount,
                                onChange: (e)=>setTableCount(e.target.value),
                                placeholder: "12",
                                min: "1",
                                max: "50"
                            }, void 0, false, {
                                fileName: "[project]/app/company/settings/page.tsx",
                                lineNumber: 147,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/settings/page.tsx",
                        lineNumber: 145,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/settings/page.tsx",
                lineNumber: 136,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: saveCharges,
                className: "btn btn-blue",
                style: {
                    marginTop: 14
                },
                children: "Save Restaurant Settings"
            }, void 0, false, {
                fileName: "[project]/app/company/settings/page.tsx",
                lineNumber: 150,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/company/settings/page.tsx",
        lineNumber: 128,
        columnNumber: 9
    }, this);
}
_s1(RestaurantChargesPanel, "//s9wC1xFccBxbErTObM/e3urlU=");
_c1 = RestaurantChargesPanel;
function SettingsPage() {
    _s2();
    const { activeCompanyId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const companyId = activeCompanyId;
    const company = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActiveCompany"])();
    const { updateCompany, addGodown, removeGodown, deleteCompany, exportBackup, importBackup, aiApiKey, setAiApiKey, user, updateUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const invoices = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"])('invoices') || [];
    const [newTeamCounter, setNewTeamCounter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const counterSales = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SettingsPage.useMemo[counterSales]": ()=>{
            const counts = {
                'Counter 1': {
                    count: 0,
                    total: 0
                },
                'Counter 2': {
                    count: 0,
                    total: 0
                },
                'Counter 3': {
                    count: 0,
                    total: 0
                },
                'Counter 4': {
                    count: 0,
                    total: 0
                }
            };
            invoices.forEach({
                "SettingsPage.useMemo[counterSales]": (inv)=>{
                    const c = inv.counter || 'Counter 1';
                    if (counts[c] && inv.invoiceType === 'sale') {
                        counts[c].count += 1;
                        counts[c].total += inv.grandTotal || 0;
                    }
                }
            }["SettingsPage.useMemo[counterSales]"]);
            return counts;
        }
    }["SettingsPage.useMemo[counterSales]"], [
        invoices
    ]);
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('business');
    const importFileRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [deleteStep, setDeleteStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [deleteInput, setDeleteInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const plan = user?.subscriptionType?.toLowerCase();
    const isTrialActive = user?.trialExpiresAt && new Date(user.trialExpiresAt).getTime() > Date.now();
    let MAX_GODOWNS = 1;
    if (isTrialActive && !plan) MAX_GODOWNS = 3;
    else if (plan === 'premium') MAX_GODOWNS = 3;
    else if (plan === 'standard') MAX_GODOWNS = 2;
    else MAX_GODOWNS = 1;
    const [licenseKey, setLicenseKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const handleRedeemLicense = ()=>{
        if (licenseKey.trim() === 'EDIBIOADM') {
            const u = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"].getState().user;
            if (u) {
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"].getState().updateUser({
                    subscriptionType: 'premium',
                    subscriptionExpiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success("Admin License Redeemed! Premium Activated.");
                setLicenseKey('');
            }
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("Invalid or Expired License Key");
        }
    };
    // Bank Details
    const [bank, setBank] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        bankName: company?.bankDetails?.bankName || '',
        accountName: company?.bankDetails?.accountName || '',
        accountNumber: company?.bankDetails?.accountNumber || '',
        ifsc: company?.bankDetails?.ifsc || '',
        upiId: company?.bankDetails?.upiId || ''
    });
    const uBank = (k, v)=>setBank((b)=>({
                ...b,
                [k]: v
            }));
    const saveBank = ()=>{
        updateCompany(companyId, {
            bankDetails: bank
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Bank details saved!');
    };
    // Team Details
    const [newTeamMember, setNewTeamMember] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(''); // We can keep this if needed or repurpose.
    const [newTeamRole, setNewTeamRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('staff');
    const [newTeamName, setNewTeamName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [newTeamPassword, setNewTeamPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Business form
    const [biz, setBiz] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: company?.name || '',
        phone: company?.phone || '',
        email: company?.email || '',
        gstNumber: company?.gstNumber || '',
        address: company?.address || '',
        city: company?.city || '',
        state: company?.state || 'Tamil Nadu',
        invoicePrefix: company?.invoicePrefix || 'INV',
        invoicePassword: company?.invoicePassword || '',
        logoUrl: company?.logoUrl || ''
    });
    const ubiz = (k, v)=>setBiz((f)=>({
                ...f,
                [k]: v
            }));
    const saveBiz = ()=>{
        updateCompany(companyId, biz);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Business profile updated!');
    };
    // Loyalty Program States
    const [loyaltyEnabled, setLoyaltyEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [earnRatio, setEarnRatio] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('100');
    const [redeemValue, setRedeemValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('1');
    const [minRedeem, setMinRedeem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('10');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SettingsPage.useEffect": ()=>{
            if (company) {
                setLoyaltyEnabled(company.loyaltyPointsEnabled ?? false);
                setEarnRatio(company.loyaltyEarningRatio?.toString() ?? '100');
                setRedeemValue(company.loyaltyRedemptionValue?.toString() ?? '1');
                setMinRedeem(company.loyaltyMinRedeemPoints?.toString() ?? '10');
            }
        }
    }["SettingsPage.useEffect"], [
        company
    ]);
    const saveLoyalty = ()=>{
        updateCompany(companyId, {
            loyaltyPointsEnabled: loyaltyEnabled,
            loyaltyEarningRatio: parseFloat(earnRatio) || 100,
            loyaltyRedemptionValue: parseFloat(redeemValue) || 1,
            loyaltyMinRedeemPoints: parseFloat(minRedeem) || 10
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Loyalty settings saved!');
    };
    // Godown management
    const [newGodown, setNewGodown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const handleImportFile = (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (ev)=>{
            const text = ev.target?.result;
            const yes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["confirm"])({
                message: 'This will merge the backup data into your current app. No data will be deleted.',
                title: 'Import Backup?'
            });
            if (yes) {
                importBackup(text);
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    };
    const TABS = [
        {
            id: 'business',
            label: 'Business Profile',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__["Store"]
        },
        {
            id: 'templates',
            label: 'Invoice Templates',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
            href: '/settings/templates'
        },
        {
            id: 'godowns',
            label: 'Godowns',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$warehouse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Warehouse$3e$__["Warehouse"]
        },
        {
            id: 'banking',
            label: 'Bank & UPI',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$landmark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Landmark$3e$__["Landmark"]
        },
        {
            id: 'loyalty',
            label: 'Loyalty Program',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"]
        },
        {
            id: 'communication',
            label: 'Communication',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"]
        },
        {
            id: 'data',
            label: 'Data & Backup',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__["Database"]
        },
        {
            id: 'team',
            label: 'Team & Roles',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
        },
        {
            id: 'security',
            label: 'Security',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"]
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: 1100,
                    margin: '0 auto',
                    display: 'flex',
                    gap: 24
                },
                className: "settings-layout",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        style: {
                            width: 220,
                            flexShrink: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card",
                                style: {
                                    overflow: 'hidden'
                                },
                                children: TABS.map((item)=>{
                                    const Icon = item.icon;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            if (item.href) {
                                                router.push(companyId ? `/company${item.href}` : item.href);
                                            } else {
                                                setTab(item.id);
                                            }
                                        },
                                        className: tab === item.id ? 'active-tab' : '',
                                        style: {
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 10,
                                            padding: '13px 16px',
                                            cursor: 'pointer',
                                            textAlign: 'left'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                size: 16,
                                                color: tab === item.id ? '#4285F4' : '#718096'
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 320,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 13,
                                                    fontWeight: tab === item.id ? 700 : 500,
                                                    color: tab === item.id ? '#1967D2' : '#4A5568'
                                                },
                                                children: item.label
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 321,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 307,
                                        columnNumber: 33
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/app/company/settings/page.tsx",
                                lineNumber: 303,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mobile-tab-bar",
                                children: TABS.map((item)=>{
                                    const Icon = item.icon;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            if (item.href) {
                                                router.push(companyId ? `/company${item.href}` : item.href);
                                            } else {
                                                setTab(item.id);
                                            }
                                        },
                                        className: `mobile-tab-btn${tab === item.id ? ' active' : ''}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                size: 20,
                                                color: tab === item.id ? '#1967D2' : '#A0AEC0'
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 343,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: item.label.replace(' Profile', '').replace(' & ', ' &\n').replace('Invoice ', '').replace('Data & ', '')
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 344,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 332,
                                        columnNumber: 33
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/app/company/settings/page.tsx",
                                lineNumber: 328,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/settings/page.tsx",
                        lineNumber: 301,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            minWidth: 0
                        },
                        children: [
                            tab === 'business' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card",
                                style: {
                                    padding: '24px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        style: {
                                            fontWeight: 900,
                                            fontSize: 18,
                                            color: '#1A1A2E',
                                            marginBottom: 20
                                        },
                                        children: "Business Profile"
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 357,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "settings-biz-grid",
                                        style: {
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr',
                                            gap: 14
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    gridColumn: '1/-1',
                                                    display: 'flex',
                                                    gap: 16,
                                                    alignItems: 'flex-start',
                                                    marginBottom: 4
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            width: 64,
                                                            height: 64,
                                                            borderRadius: 12,
                                                            background: '#F1F5F9',
                                                            border: '1px dashed #CBD5E1',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            overflow: 'hidden',
                                                            flexShrink: 0
                                                        },
                                                        children: biz.logoUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: biz.logoUrl,
                                                            style: {
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'contain'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/settings/page.tsx",
                                                            lineNumber: 361,
                                                            columnNumber: 56
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__["Store"], {
                                                            size: 24,
                                                            color: "#94A3B8"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/settings/page.tsx",
                                                            lineNumber: 361,
                                                            columnNumber: 148
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 360,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            flex: 1
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
                                                                children: "Shop Logo / Image"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 364,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    gap: 10,
                                                                    alignItems: 'center',
                                                                    flexWrap: 'wrap'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "file",
                                                                        accept: "image/*",
                                                                        id: "shop-logo-upload",
                                                                        style: {
                                                                            display: 'none'
                                                                        },
                                                                        onChange: (e)=>{
                                                                            const file = e.target.files?.[0];
                                                                            if (file) {
                                                                                const reader = new FileReader();
                                                                                reader.onload = (ev)=>ubiz('logoUrl', ev.target?.result);
                                                                                reader.readAsDataURL(file);
                                                                            }
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                                        lineNumber: 366,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        htmlFor: "shop-logo-upload",
                                                                        className: "btn btn-outline btn-sm",
                                                                        style: {
                                                                            cursor: 'pointer',
                                                                            padding: '6px 12px',
                                                                            fontSize: 11,
                                                                            margin: 0
                                                                        },
                                                                        children: "Upload Image"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                                        lineNumber: 374,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        className: "e-input",
                                                                        placeholder: "Or enter image URL",
                                                                        value: biz.logoUrl,
                                                                        onChange: (e)=>ubiz('logoUrl', e.target.value),
                                                                        style: {
                                                                            flex: 1,
                                                                            padding: '6px 10px',
                                                                            fontSize: 12
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                                        lineNumber: 375,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    biz.logoUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>ubiz('logoUrl', ''),
                                                                        className: "btn btn-ghost btn-sm",
                                                                        style: {
                                                                            color: '#EA4335'
                                                                        },
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                            size: 14
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/company/settings/page.tsx",
                                                                            lineNumber: 376,
                                                                            columnNumber: 167
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                                        lineNumber: 376,
                                                                        columnNumber: 61
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 365,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 363,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 359,
                                                columnNumber: 33
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
                                                        children: "Company Name"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 381,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "e-input",
                                                        value: biz.name,
                                                        onChange: (e)=>ubiz('name', e.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 382,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 380,
                                                columnNumber: 33
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
                                                        children: "Phone"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 385,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "e-input",
                                                        value: biz.phone,
                                                        onChange: (e)=>ubiz('phone', e.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 386,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 384,
                                                columnNumber: 33
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
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 389,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "email",
                                                        className: "e-input",
                                                        value: biz.email,
                                                        onChange: (e)=>ubiz('email', e.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 390,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 388,
                                                columnNumber: 33
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
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 393,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "e-input",
                                                        value: biz.gstNumber,
                                                        onChange: (e)=>ubiz('gstNumber', e.target.value.toUpperCase()),
                                                        style: {
                                                            fontFamily: 'monospace',
                                                            letterSpacing: '0.08em'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 394,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 392,
                                                columnNumber: 33
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
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 397,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "e-input",
                                                        value: biz.address,
                                                        onChange: (e)=>ubiz('address', e.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 398,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 396,
                                                columnNumber: 33
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
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 401,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "e-input",
                                                        value: biz.city,
                                                        onChange: (e)=>ubiz('city', e.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 402,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 400,
                                                columnNumber: 33
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
                                                        children: "Invoice Prefix"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 405,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "e-input",
                                                        value: biz.invoicePrefix,
                                                        onChange: (e)=>ubiz('invoicePrefix', e.target.value.toUpperCase()),
                                                        style: {
                                                            fontFamily: 'monospace'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 406,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 404,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 358,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: 20,
                                            borderTop: '1px solid #F1F3F5',
                                            paddingTop: 20
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: saveBiz,
                                            className: "btn btn-blue",
                                            children: "Save Business Profile"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/settings/page.tsx",
                                            lineNumber: 410,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 409,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/settings/page.tsx",
                                lineNumber: 356,
                                columnNumber: 25
                            }, this),
                            tab === 'godowns' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card",
                                style: {
                                    padding: '24px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 20
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        style: {
                                            fontWeight: 900,
                                            fontSize: 18,
                                            color: '#1A1A2E'
                                        },
                                        children: "Godown Management"
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 419,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 13,
                                            color: '#718096',
                                            marginTop: -12
                                        },
                                        children: [
                                            "Maximum ",
                                            MAX_GODOWNS,
                                            " godown",
                                            MAX_GODOWNS > 1 ? 's' : '',
                                            " per company on your current plan."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 420,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 10
                                        },
                                        children: [
                                            company?.godowns?.map((g, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 12,
                                                        padding: '14px 16px',
                                                        border: '1.5px solid #E1E4E8',
                                                        borderRadius: 12
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                width: 40,
                                                                height: 40,
                                                                borderRadius: 10,
                                                                background: idx === 0 ? '#E8F0FE' : '#E6F4EA',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                flexShrink: 0
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$warehouse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Warehouse$3e$__["Warehouse"], {
                                                                size: 18,
                                                                color: idx === 0 ? '#4285F4' : '#34A853'
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 426,
                                                                columnNumber: 45
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/settings/page.tsx",
                                                            lineNumber: 425,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                flex: 1
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    style: {
                                                                        fontWeight: 700,
                                                                        fontSize: 14,
                                                                        color: '#1A1A2E'
                                                                    },
                                                                    children: g.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/settings/page.tsx",
                                                                    lineNumber: 429,
                                                                    columnNumber: 45
                                                                }, this),
                                                                g.address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    style: {
                                                                        fontSize: 11,
                                                                        color: '#A0AEC0'
                                                                    },
                                                                    children: g.address
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/settings/page.tsx",
                                                                    lineNumber: 430,
                                                                    columnNumber: 59
                                                                }, this),
                                                                idx === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "badge badge-blue",
                                                                    style: {
                                                                        fontSize: 9,
                                                                        marginTop: 3,
                                                                        display: 'inline-block'
                                                                    },
                                                                    children: "PRIMARY"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/settings/page.tsx",
                                                                    lineNumber: 431,
                                                                    columnNumber: 59
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/settings/page.tsx",
                                                            lineNumber: 428,
                                                            columnNumber: 41
                                                        }, this),
                                                        (company?.godowns?.length || 0) > 1 && idx > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>{
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["confirm"])({
                                                                    message: `Delete godown "${g.name}"? Stock in this godown will not be deleted.`,
                                                                    danger: true
                                                                }).then((yes)=>{
                                                                    if (yes) {
                                                                        removeGodown(companyId, g.id);
                                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Godown removed');
                                                                    }
                                                                });
                                                            },
                                                            className: "btn btn-ghost btn-icon",
                                                            style: {
                                                                color: '#EA4335'
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                size: 15
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 439,
                                                                columnNumber: 49
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/settings/page.tsx",
                                                            lineNumber: 434,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, g.id, true, {
                                                    fileName: "[project]/app/company/settings/page.tsx",
                                                    lineNumber: 424,
                                                    columnNumber: 37
                                                }, this)),
                                            (company?.godowns?.length || 0) < MAX_GODOWNS && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    gap: 10
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "e-input",
                                                        placeholder: "New godown name (e.g. Warehouse 2)",
                                                        value: newGodown,
                                                        onChange: (e)=>setNewGodown(e.target.value),
                                                        style: {
                                                            flex: 1
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 447,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            if (!newGodown) return;
                                                            addGodown(companyId, {
                                                                name: newGodown
                                                            });
                                                            setNewGodown('');
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success(`Godown "${newGodown}" added`);
                                                        },
                                                        className: "btn btn-blue",
                                                        style: {
                                                            gap: 5,
                                                            flexShrink: 0
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                                size: 14
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 450,
                                                                columnNumber: 45
                                                            }, this),
                                                            " Add"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 448,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 446,
                                                columnNumber: 37
                                            }, this),
                                            (company?.godowns?.length || 0) >= MAX_GODOWNS && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 12,
                                                    color: '#A0AEC0',
                                                    textAlign: 'center',
                                                    padding: '8px'
                                                },
                                                children: [
                                                    "Maximum ",
                                                    MAX_GODOWNS,
                                                    " godown",
                                                    MAX_GODOWNS > 1 ? 's' : '',
                                                    " reached for this company."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 455,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 422,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/settings/page.tsx",
                                lineNumber: 418,
                                columnNumber: 25
                            }, this),
                            tab === 'banking' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card",
                                style: {
                                    padding: '24px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        style: {
                                            fontWeight: 900,
                                            fontSize: 18,
                                            color: '#1A1A2E',
                                            marginBottom: 20
                                        },
                                        children: "Bank Details & UPI"
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 464,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 13,
                                            color: '#718096',
                                            marginBottom: 20
                                        },
                                        children: "These details can be displayed on your invoices."
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 465,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "banking-grid",
                                        style: {
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr',
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
                                                            display: 'block',
                                                            marginBottom: 5
                                                        },
                                                        children: "Bank Name"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 468,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "e-input",
                                                        value: bank.bankName,
                                                        onChange: (e)=>uBank('bankName', e.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 469,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 467,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: {
                                                            fontSize: 11,
                                                            fontWeight: 700,
                                                            color: '#4A5568',
                                                            display: 'block',
                                                            marginBottom: 5
                                                        },
                                                        children: "Account Name"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 472,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "e-input",
                                                        value: bank.accountName,
                                                        onChange: (e)=>uBank('accountName', e.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 473,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 471,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: {
                                                            fontSize: 11,
                                                            fontWeight: 700,
                                                            color: '#4A5568',
                                                            display: 'block',
                                                            marginBottom: 5
                                                        },
                                                        children: "Account Number"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 476,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "e-input",
                                                        value: bank.accountNumber,
                                                        onChange: (e)=>uBank('accountNumber', e.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 477,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 475,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: {
                                                            fontSize: 11,
                                                            fontWeight: 700,
                                                            color: '#4A5568',
                                                            display: 'block',
                                                            marginBottom: 5
                                                        },
                                                        children: "IFSC Code"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 480,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "e-input",
                                                        value: bank.ifsc,
                                                        onChange: (e)=>uBank('ifsc', e.target.value.toUpperCase())
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 481,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 479,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    gridColumn: '1/-1',
                                                    borderTop: '1px solid #F1F3F5',
                                                    marginTop: 10,
                                                    paddingTop: 16
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: {
                                                            fontSize: 11,
                                                            fontWeight: 700,
                                                            color: '#4A5568',
                                                            display: 'block',
                                                            marginBottom: 5
                                                        },
                                                        children: "UPI ID"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 484,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "e-input",
                                                        placeholder: "e.g. pay.name@bank",
                                                        value: bank.upiId,
                                                        onChange: (e)=>uBank('upiId', e.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 485,
                                                        columnNumber: 37
                                                    }, this),
                                                    bank.upiId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            marginTop: 14,
                                                            display: 'flex',
                                                            alignItems: 'flex-start',
                                                            gap: 16,
                                                            padding: '16px',
                                                            background: '#E6F4EA',
                                                            borderRadius: 12,
                                                            border: '1px solid #B7DFC4'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    background: 'white',
                                                                    padding: 10,
                                                                    borderRadius: 10,
                                                                    border: '1px solid #E2E8F0',
                                                                    flexShrink: 0
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(`upi://pay?pa=${bank.upiId}&pn=${encodeURIComponent(company?.name || 'Shop')}&cu=INR`)}`,
                                                                    alt: "UPI QR Code Preview",
                                                                    style: {
                                                                        width: 80,
                                                                        height: 80,
                                                                        display: 'block'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/settings/page.tsx",
                                                                    lineNumber: 489,
                                                                    columnNumber: 49
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 488,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        style: {
                                                                            fontWeight: 800,
                                                                            fontSize: 13,
                                                                            color: '#137333',
                                                                            margin: '0 0 4px'
                                                                        },
                                                                        children: "✅ UPI QR will appear on invoices"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                                        lineNumber: 496,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        style: {
                                                                            fontSize: 12,
                                                                            color: '#4A5568',
                                                                            margin: '0 0 4px'
                                                                        },
                                                                        children: [
                                                                            "UPI ID: ",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                children: bank.upiId
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                                lineNumber: 497,
                                                                                columnNumber: 122
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                                        lineNumber: 497,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        style: {
                                                                            fontSize: 11,
                                                                            color: '#718096',
                                                                            margin: 0
                                                                        },
                                                                        children: "Customers can scan this QR to pay directly. This QR appears at the bottom of every invoice when UPI ID is set."
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                                        lineNumber: 498,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 495,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 487,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 483,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 466,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: 24
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: saveBank,
                                            className: "btn btn-blue",
                                            children: "Save Bank Details"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/settings/page.tsx",
                                            lineNumber: 505,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 504,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/settings/page.tsx",
                                lineNumber: 463,
                                columnNumber: 25
                            }, this),
                            tab === 'team' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card",
                                style: {
                                    padding: '24px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: 20
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    style: {
                                                        fontWeight: 900,
                                                        fontSize: 18,
                                                        color: '#1A1A2E'
                                                    },
                                                    children: "Team Roles & Access"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/settings/page.tsx",
                                                    lineNumber: 515,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontSize: 13,
                                                        color: '#718096'
                                                    },
                                                    children: "Invite staff to manage this company."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/settings/page.tsx",
                                                    lineNumber: 516,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/settings/page.tsx",
                                            lineNumber: 514,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 513,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                            gap: 10,
                                            marginBottom: 20
                                        },
                                        children: [
                                            {
                                                role: 'co_owner',
                                                label: 'Co-Owner',
                                                color: '#4285F4',
                                                bg: '#E8F0FE',
                                                icon: '👑',
                                                desc: 'Full access except expenses and account deletion. Can view all data, create invoices, manage products.'
                                            },
                                            {
                                                role: 'manager',
                                                label: 'Manager',
                                                color: '#34A853',
                                                bg: '#E6F4EA',
                                                icon: '🏢',
                                                desc: 'Can manage billing, inventory, parties. No access to settings, cash register, or godowns.'
                                            },
                                            {
                                                role: 'staff',
                                                label: 'Staff / Biller',
                                                color: '#FBBC04',
                                                bg: '#FEF7E0',
                                                icon: '🧾',
                                                desc: 'Only billing and POS access. Can create invoices and process payments. Perfect for cashier counter.'
                                            },
                                            ...company?.type === 'Restaurant' || company?.type === 'Bakery' ? [
                                                {
                                                    role: 'chef_atelier',
                                                    label: 'Chef / Atelier',
                                                    color: '#EA4335',
                                                    bg: '#FCE8E6',
                                                    icon: '👨‍🍳',
                                                    desc: 'Kitchen display ONLY. Can view new orders, mark items as cooking or ready to serve. Cannot access billing or settings.'
                                                },
                                                {
                                                    role: 'server',
                                                    label: 'Waiter / Server',
                                                    color: '#9333EA',
                                                    bg: '#F3E8FF',
                                                    icon: '🍽️',
                                                    desc: 'Can take table orders and send to kitchen. Cannot convert orders to bills — only the Biller/Staff can finalize and print receipts.'
                                                }
                                            ] : []
                                        ].map(({ role, label, color, bg, icon, desc })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    padding: '14px 16px',
                                                    background: bg,
                                                    borderRadius: 12,
                                                    border: `1.5px solid ${color}25`
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 8,
                                                            marginBottom: 6
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: 20
                                                                },
                                                                children: icon
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 533,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontWeight: 800,
                                                                    fontSize: 13,
                                                                    color
                                                                },
                                                                children: label
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 534,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 532,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 11,
                                                            color: '#4A5568',
                                                            lineHeight: 1.5,
                                                            margin: 0
                                                        },
                                                        children: desc
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 536,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, role, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 531,
                                                columnNumber: 37
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 521,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: '#F8F9FA',
                                            padding: 16,
                                            borderRadius: 12,
                                            marginBottom: 24,
                                            border: '1px solid #E2E8F0'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                style: {
                                                    fontSize: 13,
                                                    fontWeight: 800,
                                                    marginBottom: 12
                                                },
                                                children: "Add New Member (Roles Login)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 542,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 12,
                                                    color: '#718096',
                                                    marginBottom: 12
                                                },
                                                children: [
                                                    "Company License No: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontWeight: 800,
                                                            color: '#1A1A2E'
                                                        },
                                                        children: company?.licenseNo || 'Not generated'
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 543,
                                                        columnNumber: 117
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 543,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "team-add-row",
                                                style: {
                                                    display: 'flex',
                                                    gap: 10,
                                                    flexWrap: 'wrap'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "e-input",
                                                        placeholder: "Staff Name",
                                                        value: newTeamName,
                                                        onChange: (e)=>setNewTeamName(e.target.value),
                                                        style: {
                                                            flex: 1,
                                                            minWidth: 150
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 545,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "password",
                                                        className: "e-input",
                                                        placeholder: "Provider User Password",
                                                        value: newTeamPassword,
                                                        onChange: (e)=>setNewTeamPassword(e.target.value),
                                                        style: {
                                                            flex: 1.5,
                                                            minWidth: 180
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 546,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        className: "e-select",
                                                        value: newTeamRole,
                                                        onChange: (e)=>setNewTeamRole(e.target.value),
                                                        style: {
                                                            flex: 1,
                                                            minWidth: 120
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "co_owner",
                                                                children: "Co-Owner (All except expenses)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 548,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "manager",
                                                                children: "Manager (No settings/cash/godown)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 549,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "staff",
                                                                children: "Staff / Biller (Only Billing/POS)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 550,
                                                                columnNumber: 41
                                                            }, this),
                                                            (company?.type === 'Restaurant' || company?.type === 'Bakery') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "chef_atelier",
                                                                        children: "Chef Atelier (Kitchen Display Only)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                                        lineNumber: 553,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "server",
                                                                        children: "Server / Waiter (Table Orders Only)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                                        lineNumber: 554,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 547,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        className: "e-select",
                                                        value: newTeamCounter,
                                                        onChange: (e)=>setNewTeamCounter(e.target.value),
                                                        style: {
                                                            flex: 1,
                                                            minWidth: 120
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "",
                                                                children: "No Counter"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 559,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "Counter 1",
                                                                children: "Counter 1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 560,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "Counter 2",
                                                                children: "Counter 2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 561,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "Counter 3",
                                                                children: "Counter 3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 562,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "Counter 4",
                                                                children: "Counter 4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 563,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 558,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            if (!newTeamPassword || !newTeamName) return;
                                                            const cleanShopName = (company?.name || 'shop').replace(/\s+/g, '').toLowerCase();
                                                            const randomNum = Math.floor(Math.random() * 999);
                                                            const generatedUsername = `${cleanShopName}${randomNum}@edibio.${newTeamRole}`;
                                                            const t = [
                                                                ...company?.team || [],
                                                                {
                                                                    id: Math.random().toString(),
                                                                    name: newTeamName,
                                                                    contact: generatedUsername,
                                                                    password: newTeamPassword,
                                                                    role: newTeamRole,
                                                                    counter: newTeamCounter || undefined
                                                                }
                                                            ];
                                                            updateCompany(companyId, {
                                                                team: t
                                                            });
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success(`User created!\n${generatedUsername}`);
                                                            setNewTeamName('');
                                                            setNewTeamPassword('');
                                                            setNewTeamCounter('');
                                                        },
                                                        className: "btn btn-blue",
                                                        style: {
                                                            flexShrink: 0
                                                        },
                                                        children: "Create User"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 565,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 544,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 541,
                                        columnNumber: 29
                                    }, this),
                                    (company?.type === 'Restaurant' || company?.type === 'Bakery') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RestaurantChargesPanel, {
                                        company: company,
                                        updateCompany: updateCompany,
                                        companyId: companyId
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 581,
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
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 12,
                                                    padding: '14px 16px',
                                                    background: 'white',
                                                    border: '1.5px solid #E1E4E8',
                                                    borderRadius: 12
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            width: 36,
                                                            height: 36,
                                                            borderRadius: 999,
                                                            background: '#1A1A2E',
                                                            color: 'white',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontWeight: 800
                                                        },
                                                        children: "M"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 587,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            flex: 1
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            style: {
                                                                fontWeight: 700,
                                                                fontSize: 14,
                                                                color: '#1A1A2E'
                                                            },
                                                            children: "Main Account (You)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/settings/page.tsx",
                                                            lineNumber: 589,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 588,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "badge badge-gray",
                                                        style: {
                                                            fontSize: 10
                                                        },
                                                        children: "OWNER"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 591,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 586,
                                                columnNumber: 33
                                            }, this),
                                            company?.team?.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 12,
                                                        padding: '14px 16px',
                                                        background: 'white',
                                                        border: '1.5px solid #E1E4E8',
                                                        borderRadius: 12
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                width: 36,
                                                                height: 36,
                                                                borderRadius: 999,
                                                                background: '#E8F0FE',
                                                                color: '#1967D2',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                fontWeight: 800
                                                            },
                                                            children: t.name[0]?.toUpperCase()
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/settings/page.tsx",
                                                            lineNumber: 596,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                flex: 1
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    style: {
                                                                        fontWeight: 700,
                                                                        fontSize: 14,
                                                                        color: '#1A1A2E'
                                                                    },
                                                                    children: t.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/settings/page.tsx",
                                                                    lineNumber: 600,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    style: {
                                                                        fontSize: 12,
                                                                        color: '#718096'
                                                                    },
                                                                    children: t.contact
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/settings/page.tsx",
                                                                    lineNumber: 601,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/settings/page.tsx",
                                                            lineNumber: 599,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 12
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                    value: t.counter || '',
                                                                    onChange: (e)=>{
                                                                        const val = e.target.value;
                                                                        const updatedTeam = company.team.map((member)=>member.id === t.id ? {
                                                                                ...member,
                                                                                counter: val || undefined
                                                                            } : member);
                                                                        updateCompany(companyId, {
                                                                            team: updatedTeam
                                                                        });
                                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success(`Counter assigned for ${t.name}`);
                                                                    },
                                                                    className: "e-select",
                                                                    style: {
                                                                        width: 'auto',
                                                                        padding: '4px 8px',
                                                                        fontSize: 11,
                                                                        background: '#F8F9FA',
                                                                        borderRadius: 6,
                                                                        cursor: 'pointer'
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "",
                                                                            children: "No Counter"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/company/settings/page.tsx",
                                                                            lineNumber: 617,
                                                                            columnNumber: 49
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "Counter 1",
                                                                            children: "Counter 1"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/company/settings/page.tsx",
                                                                            lineNumber: 618,
                                                                            columnNumber: 49
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "Counter 2",
                                                                            children: "Counter 2"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/company/settings/page.tsx",
                                                                            lineNumber: 619,
                                                                            columnNumber: 49
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "Counter 3",
                                                                            children: "Counter 3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/company/settings/page.tsx",
                                                                            lineNumber: 620,
                                                                            columnNumber: 49
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "Counter 4",
                                                                            children: "Counter 4"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/company/settings/page.tsx",
                                                                            lineNumber: 621,
                                                                            columnNumber: 49
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/settings/page.tsx",
                                                                    lineNumber: 604,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "badge badge-blue",
                                                                    style: {
                                                                        fontSize: 10,
                                                                        textTransform: 'uppercase'
                                                                    },
                                                                    children: t.role.replace('_', ' ')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/settings/page.tsx",
                                                                    lineNumber: 623,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/settings/page.tsx",
                                                            lineNumber: 603,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>{
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["confirm"])({
                                                                    message: `Remove ${t.name} from your team?`,
                                                                    danger: true
                                                                }).then((yes)=>{
                                                                    if (yes) updateCompany(companyId, {
                                                                        team: company.team.filter((x)=>x.id !== t.id)
                                                                    });
                                                                });
                                                            },
                                                            className: "btn btn-ghost btn-icon",
                                                            style: {
                                                                color: '#EA4335',
                                                                marginLeft: 10
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                size: 16
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 630,
                                                                columnNumber: 45
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/settings/page.tsx",
                                                            lineNumber: 625,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, t.id, true, {
                                                    fileName: "[project]/app/company/settings/page.tsx",
                                                    lineNumber: 595,
                                                    columnNumber: 37
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 584,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: 32,
                                            borderTop: '1px solid #E2E8F0',
                                            paddingTop: 24
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                style: {
                                                    fontSize: 15,
                                                    fontWeight: 900,
                                                    color: '#1A202C',
                                                    marginBottom: 16
                                                },
                                                children: "Counter Sales Performance"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 638,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'grid',
                                                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                                    gap: 16
                                                },
                                                children: [
                                                    'Counter 1',
                                                    'Counter 2',
                                                    'Counter 3',
                                                    'Counter 4'
                                                ].map((cName)=>{
                                                    const stats = counterSales[cName] || {
                                                        count: 0,
                                                        total: 0
                                                    };
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            padding: 16,
                                                            background: '#F8FAFC',
                                                            border: '1px solid #E2E8F0',
                                                            borderRadius: 12
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: 11,
                                                                    fontWeight: 800,
                                                                    color: '#718096',
                                                                    textTransform: 'uppercase',
                                                                    marginBottom: 8,
                                                                    letterSpacing: '0.05em'
                                                                },
                                                                children: cName
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 644,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: 18,
                                                                    fontWeight: 900,
                                                                    color: '#1A202C',
                                                                    margin: 0
                                                                },
                                                                children: [
                                                                    "₹",
                                                                    stats.total.toLocaleString('en-IN', {
                                                                        minimumFractionDigits: 2
                                                                    })
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 645,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: 11,
                                                                    color: '#A0AEC0',
                                                                    marginTop: 4,
                                                                    margin: 0
                                                                },
                                                                children: [
                                                                    stats.count,
                                                                    " bills generated"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 646,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, cName, true, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 643,
                                                        columnNumber: 45
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 639,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 637,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/settings/page.tsx",
                                lineNumber: 512,
                                columnNumber: 25
                            }, this),
                            tab === 'communication' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card",
                                style: {
                                    padding: '24px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 24
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        style: {
                                            fontWeight: 900,
                                            fontSize: 18,
                                            color: '#1A1A2E'
                                        },
                                        children: "Communication Settings"
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 658,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '16px 20px',
                                            background: '#F0FDF4',
                                            borderRadius: 14,
                                            border: '1.5px solid #BBF7D0'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 14
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            width: 44,
                                                            height: 44,
                                                            borderRadius: 12,
                                                            background: '#25D36615',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                            size: 22,
                                                            color: "#25D366"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/settings/page.tsx",
                                                            lineNumber: 663,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 662,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontWeight: 800,
                                                                    fontSize: 15,
                                                                    color: '#1A1A2E'
                                                                },
                                                                children: "Send Invoice via WhatsApp"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 666,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: 12,
                                                                    color: '#718096',
                                                                    marginTop: 2
                                                                },
                                                                children: "Show a WhatsApp button on every invoice. Opens WhatsApp with a pre-filled message for the customer."
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 667,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 665,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 661,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>updateCompany(companyId, {
                                                        whatsappEnabled: !company?.whatsappEnabled
                                                    }),
                                                style: {
                                                    width: 52,
                                                    height: 28,
                                                    borderRadius: 99,
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    background: company?.whatsappEnabled ? '#25D366' : '#E2E8F0',
                                                    transition: 'background 0.2s',
                                                    position: 'relative',
                                                    flexShrink: 0
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        position: 'absolute',
                                                        top: 3,
                                                        left: company?.whatsappEnabled ? 26 : 3,
                                                        width: 22,
                                                        height: 22,
                                                        borderRadius: '50%',
                                                        background: 'white',
                                                        boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                                                        transition: 'left 0.2s'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/settings/page.tsx",
                                                    lineNumber: 678,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 670,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 660,
                                        columnNumber: 29
                                    }, this),
                                    company?.whatsappEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: '#F8FAFC',
                                            borderRadius: 12,
                                            padding: '16px 20px',
                                            border: '1px solid #E2E8F0'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontWeight: 700,
                                                    fontSize: 13,
                                                    color: '#1A1A2E',
                                                    marginBottom: 8
                                                },
                                                children: "How it works"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 688,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                                                style: {
                                                    listStyle: 'decimal',
                                                    paddingLeft: 20,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 6
                                                },
                                                children: [
                                                    'Open any invoice from the Billing page.',
                                                    'Tap the green \'Send via WhatsApp\' button.',
                                                    'A pre-filled message with invoice details opens in WhatsApp.',
                                                    'Press Send in WhatsApp — no API or cost required!'
                                                ].map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        style: {
                                                            fontSize: 12,
                                                            color: '#4A5568'
                                                        },
                                                        children: s
                                                    }, i, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 695,
                                                        columnNumber: 57
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 689,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    marginTop: 12,
                                                    padding: '10px 14px',
                                                    background: '#FEF7E0',
                                                    borderRadius: 8,
                                                    border: '1px solid #FBBC0440'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontSize: 11,
                                                        color: '#B45309',
                                                        fontWeight: 600
                                                    },
                                                    children: "⚠️ Customer must have WhatsApp installed. PDF must be printed first and shared manually if needed."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/settings/page.tsx",
                                                    lineNumber: 698,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 697,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 687,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/settings/page.tsx",
                                lineNumber: 657,
                                columnNumber: 25
                            }, this),
                            tab === 'data' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 20
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: 'linear-gradient(135deg, #1A1A2E, #16213E)',
                                            borderRadius: 20,
                                            padding: '24px',
                                            color: 'white',
                                            marginBottom: 24,
                                            position: 'relative',
                                            overflow: 'hidden',
                                            border: '1px solid rgba(255,255,255,0.1)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    height: 4,
                                                    background: 'linear-gradient(90deg,#4285F4 25%,#34A853 25% 50%,#FBBC04 50% 75%,#EA4335 75%)'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 710,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                style: {
                                                                    fontSize: 18,
                                                                    fontWeight: 900,
                                                                    marginBottom: 4,
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: 8
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                                        size: 20,
                                                                        color: "#34A853"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                                        lineNumber: 714,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    " System Integrity & Logic Health"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 713,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: 12,
                                                                    color: 'rgba(255,255,255,0.5)',
                                                                    maxWidth: 400
                                                                },
                                                                children: "Advanced Cloud Sync Engine (v10.0) is continuously monitoring data consistency and preventing synchronization conflicts."
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 716,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 712,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            textAlign: 'right'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontSize: 32,
                                                                    fontWeight: 900,
                                                                    color: '#34A853'
                                                                },
                                                                children: [
                                                                    "9.8 ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontSize: 14,
                                                                            color: 'rgba(255,255,255,0.3)'
                                                                        },
                                                                        children: "/ 10"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                                        lineNumber: 721,
                                                                        columnNumber: 110
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 721,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontSize: 10,
                                                                    fontWeight: 800,
                                                                    color: 'rgba(255,255,255,0.4)',
                                                                    textTransform: 'uppercase'
                                                                },
                                                                children: "Optimization Rating"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 722,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 720,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 711,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 709,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "card",
                                        style: {
                                            padding: '24px',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 0,
                                                    padding: '10px 14px',
                                                    background: '#E6F4EA',
                                                    color: '#137333',
                                                    fontSize: 10,
                                                    fontWeight: 900,
                                                    borderRadius: '0 0 0 12px'
                                                },
                                                children: "PRODUCTION READY (v10)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 729,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 14,
                                                    marginBottom: 20
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            width: 44,
                                                            height: 44,
                                                            borderRadius: 12,
                                                            background: '#EEF2FF',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cloud$3e$__["Cloud"], {
                                                            size: 20,
                                                            color: "#4F46E5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/settings/page.tsx",
                                                            lineNumber: 734,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 733,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                style: {
                                                                    fontWeight: 800,
                                                                    fontSize: 16,
                                                                    color: '#1A1A2E',
                                                                    margin: 0
                                                                },
                                                                children: "Advanced Cloud Sync Engine"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 737,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: 12,
                                                                    color: '#718096',
                                                                    marginTop: 2
                                                                },
                                                                children: "Real-time cross-device synchronization and secure offsite storage."
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 738,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 736,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 732,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "sync-info-grid",
                                                style: {
                                                    display: 'grid',
                                                    gridTemplateColumns: '1fr 1fr',
                                                    gap: 12,
                                                    marginBottom: 20
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            padding: '14px',
                                                            borderRadius: 12,
                                                            background: '#F8FAFC',
                                                            border: '1px solid #E2E8F0'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: 9,
                                                                    fontWeight: 800,
                                                                    color: '#64748B',
                                                                    textTransform: 'uppercase',
                                                                    marginBottom: 4
                                                                },
                                                                children: "Sync Status"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 744,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: 6
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            width: 8,
                                                                            height: 8,
                                                                            borderRadius: 99,
                                                                            background: '#10B981',
                                                                            boxShadow: '0 0 8px rgba(16,185,129,0.4)'
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                                        lineNumber: 746,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontSize: 13,
                                                                            fontWeight: 800,
                                                                            color: '#0F172A'
                                                                        },
                                                                        children: "Active & Secure"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                                        lineNumber: 747,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 745,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 743,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            padding: '14px',
                                                            borderRadius: 12,
                                                            background: '#F8FAFC',
                                                            border: '1px solid #E2E8F0'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: 9,
                                                                    fontWeight: 800,
                                                                    color: '#64748B',
                                                                    textTransform: 'uppercase',
                                                                    marginBottom: 4
                                                                },
                                                                children: "Last Backup"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 751,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: 6
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            width: 14,
                                                                            height: 14,
                                                                            borderRadius: 7,
                                                                            background: '#10B981',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center'
                                                                        },
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                            size: 10,
                                                                            color: "white"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/company/settings/page.tsx",
                                                                            lineNumber: 754,
                                                                            columnNumber: 49
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                                        lineNumber: 753,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontSize: 13,
                                                                            fontWeight: 800,
                                                                            color: '#0F172A'
                                                                        },
                                                                        children: "Automated (Real-time)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                                        lineNumber: 756,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 752,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 750,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 742,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    gap: 10
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>window.location.reload(),
                                                        className: "btn btn-blue",
                                                        style: {
                                                            flex: 1,
                                                            gap: 8,
                                                            background: '#4F46E5'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                                size: 16
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 763,
                                                                columnNumber: 41
                                                            }, this),
                                                            " Force Sync Check"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 762,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: exportBackup,
                                                        className: "btn btn-outline",
                                                        style: {
                                                            flex: 1,
                                                            gap: 8
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                                size: 16
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 766,
                                                                columnNumber: 41
                                                            }, this),
                                                            " Download Backup (JSON/Excel Format)"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 765,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 761,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 728,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "card",
                                        style: {
                                            padding: '24px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 14,
                                                    marginBottom: 16
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            width: 44,
                                                            height: 44,
                                                            borderRadius: 12,
                                                            background: '#E6F4EA',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                            size: 20,
                                                            color: "#34A853"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/settings/page.tsx",
                                                            lineNumber: 775,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 774,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                style: {
                                                                    fontWeight: 800,
                                                                    fontSize: 16,
                                                                    color: '#1A1A2E',
                                                                    margin: 0
                                                                },
                                                                children: "Restore from File"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 778,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: 12,
                                                                    color: '#718096',
                                                                    marginTop: 2
                                                                },
                                                                children: "Import a .json backup file to merge data from other devices."
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 779,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 777,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 773,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                ref: importFileRef,
                                                type: "file",
                                                accept: ".json",
                                                onChange: handleImportFile,
                                                style: {
                                                    display: 'none'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 782,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>importFileRef.current?.click(),
                                                className: "btn btn-green",
                                                style: {
                                                    gap: 8
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 784,
                                                        columnNumber: 37
                                                    }, this),
                                                    " Select Backup File"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 783,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 772,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AutoBackupStatusCard, {}, void 0, false, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 789,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "card",
                                        style: {
                                            padding: '24px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 14,
                                                    marginBottom: 16
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            width: 44,
                                                            height: 44,
                                                            borderRadius: 12,
                                                            background: '#F0F9FF',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__["Smartphone"], {
                                                            size: 20,
                                                            color: "#0EA5E9"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/settings/page.tsx",
                                                            lineNumber: 796,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 795,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                style: {
                                                                    fontWeight: 800,
                                                                    fontSize: 16,
                                                                    color: '#1A1A2E',
                                                                    margin: 0
                                                                },
                                                                children: "Mobile Integration"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 799,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: 12,
                                                                    color: '#718096',
                                                                    marginTop: 2
                                                                },
                                                                children: "Open this shop on your phone instantly."
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 800,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 798,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 794,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mobile-integration-card",
                                                style: {
                                                    display: 'flex',
                                                    gap: 20,
                                                    alignItems: 'center',
                                                    background: '#F8FAFC',
                                                    padding: 16,
                                                    borderRadius: 16,
                                                    border: '1px solid #E2E8F0'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            background: 'white',
                                                            padding: 12,
                                                            borderRadius: 12,
                                                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                                            border: '1px solid #E2E8F0',
                                                            flexShrink: 0
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(("TURBOPACK compile-time truthy", 1) ? window.location.origin : "TURBOPACK unreachable")}`,
                                                            alt: "QR Code",
                                                            style: {
                                                                width: 80,
                                                                height: 80
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/settings/page.tsx",
                                                            lineNumber: 805,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 804,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: 13,
                                                                    fontWeight: 700,
                                                                    color: '#1A1A2E'
                                                                },
                                                                children: "Scan to Open"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 812,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: 11,
                                                                    color: '#64748B',
                                                                    marginTop: 4,
                                                                    lineHeight: 1.5
                                                                },
                                                                children: [
                                                                    "Works on any browser. Install as PWA by selecting ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        children: '"Add to Home Screen"'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                                        lineNumber: 814,
                                                                        columnNumber: 95
                                                                    }, this),
                                                                    " in your mobile browser menu."
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 813,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 811,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 803,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 793,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/settings/page.tsx",
                                lineNumber: 707,
                                columnNumber: 25
                            }, this),
                            tab === 'security' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card",
                                style: {
                                    padding: '24px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 20
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        style: {
                                            fontWeight: 900,
                                            fontSize: 18,
                                            color: '#1A1A2E'
                                        },
                                        children: "Security Settings"
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 825,
                                        columnNumber: 29
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
                                                children: "Invoice View Password"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 828,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 12,
                                                    color: '#718096',
                                                    marginBottom: 10
                                                },
                                                children: "Required to view hidden/0-GST invoices. Leave blank to disable password protection."
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 829,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    gap: 10
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "password",
                                                        className: "e-input",
                                                        placeholder: "Set password…",
                                                        value: biz.invoicePassword,
                                                        onChange: (e)=>ubiz('invoicePassword', e.target.value),
                                                        style: {
                                                            flex: 1
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 831,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            updateCompany(companyId, {
                                                                invoicePassword: biz.invoicePassword
                                                            });
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success(biz.invoicePassword ? 'Password set!' : 'Password removed!');
                                                        },
                                                        className: "btn btn-blue",
                                                        style: {
                                                            flexShrink: 0
                                                        },
                                                        children: "Set"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 833,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 830,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 827,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: 10,
                                            padding: '16px',
                                            background: '#F8FAFC',
                                            borderRadius: 12,
                                            border: '1px solid #E2E8F0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontWeight: 800,
                                                            fontSize: 14,
                                                            color: '#1A1A2E',
                                                            margin: '0 0 4px'
                                                        },
                                                        children: "Show Hidden / Non-GST Invoices"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 840,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 11,
                                                            color: '#718096',
                                                            margin: 0
                                                        },
                                                        children: "Reveal non-GST and password-protected invoices in the billing list."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 841,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 839,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    const newVal = !company?.showHiddenInvoices;
                                                    updateCompany(companyId, {
                                                        showHiddenInvoices: newVal
                                                    });
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success(newVal ? 'Hidden invoices revealed!' : 'Hidden invoices hidden.');
                                                },
                                                style: {
                                                    width: 48,
                                                    height: 26,
                                                    borderRadius: 999,
                                                    background: company?.showHiddenInvoices ? '#4285F4' : '#CBD5E0',
                                                    position: 'relative',
                                                    cursor: 'pointer',
                                                    transition: 'background 0.2s',
                                                    border: 'none',
                                                    flexShrink: 0
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        position: 'absolute',
                                                        top: 3,
                                                        left: company?.showHiddenInvoices ? 25 : 3,
                                                        width: 20,
                                                        height: 20,
                                                        background: 'white',
                                                        borderRadius: 999,
                                                        transition: 'left 0.2s',
                                                        boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/settings/page.tsx",
                                                    lineNumber: 861,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 843,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 838,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            borderTop: '1px solid #F1F3F5',
                                            paddingTop: 24
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
                                                children: "Personal Gemini AI Key"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 876,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 12,
                                                    color: '#718096',
                                                    marginBottom: 10
                                                },
                                                children: [
                                                    "Use your own Google Gemini API key to bypass shared limits. Get one for free at ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "https://aistudio.google.com/app/apikey",
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        style: {
                                                            color: '#4285F4',
                                                            fontWeight: 600
                                                        },
                                                        children: "Google AI Studio"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 877,
                                                        columnNumber: 177
                                                    }, this),
                                                    "."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 877,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    gap: 10
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "password",
                                                        className: "e-input",
                                                        placeholder: "AIzaSy...",
                                                        value: aiApiKey || '',
                                                        onChange: (e)=>setAiApiKey(e.target.value),
                                                        style: {
                                                            flex: 1,
                                                            fontFamily: 'monospace'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 879,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Personal AI Key Saved!'),
                                                        className: "btn btn-blue",
                                                        children: "Save AI Key"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 881,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 878,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 875,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            borderTop: '1px solid #F1F3F5',
                                            marginTop: 10,
                                            paddingTop: 24
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                style: {
                                                    fontWeight: 900,
                                                    fontSize: 16,
                                                    color: '#1A1A2E',
                                                    marginBottom: 8
                                                },
                                                children: "Admin License Activation"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 886,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 12,
                                                    color: '#718096',
                                                    marginBottom: 10
                                                },
                                                children: "Redeem a license key provided by the admin to upgrade your account."
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 887,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    gap: 10
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        className: "e-input",
                                                        placeholder: "XXXX-XXXX-XXXX-XXXX",
                                                        value: licenseKey,
                                                        onChange: (e)=>setLicenseKey(e.target.value.toUpperCase()),
                                                        style: {
                                                            flex: 1,
                                                            fontFamily: 'monospace',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.1em'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 889,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: handleRedeemLicense,
                                                        className: "btn btn-green",
                                                        style: {
                                                            flexShrink: 0,
                                                            gap: 5
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                                size: 15
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 892,
                                                                columnNumber: 41
                                                            }, this),
                                                            " Redeem"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 891,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 888,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 885,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            borderTop: '1px solid #F1F3F5',
                                            marginTop: 32,
                                            paddingTop: 24
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                style: {
                                                    fontWeight: 900,
                                                    fontSize: 16,
                                                    color: '#EA4335',
                                                    marginBottom: 8
                                                },
                                                children: "Danger Zone"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 898,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 13,
                                                    color: '#718096',
                                                    marginBottom: 16
                                                },
                                                children: "Permanently delete this company and all its data. Action cannot be undone."
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 899,
                                                columnNumber: 33
                                            }, this),
                                            deleteStep === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setDeleteStep(1),
                                                className: "btn btn-outline",
                                                style: {
                                                    color: '#EA4335',
                                                    borderColor: '#FCE8E6',
                                                    background: '#FCE8E6'
                                                },
                                                children: "Delete Company"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 902,
                                                columnNumber: 37
                                            }, this),
                                            deleteStep === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: '#FFF5F5',
                                                    padding: 16,
                                                    borderRadius: 12,
                                                    border: '1px solid #FEB2B2'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 14,
                                                            fontWeight: 700,
                                                            color: '#C53030',
                                                            marginBottom: 10
                                                        },
                                                        children: "Step 1: Backup Confirmation"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 908,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Backup verification complete. Final confirmation required.');
                                                            setDeleteStep(2);
                                                        },
                                                        className: "btn btn-red",
                                                        children: "Verified. Continue"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 909,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 907,
                                                columnNumber: 37
                                            }, this),
                                            deleteStep === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: '#FFF5F5',
                                                    padding: 16,
                                                    borderRadius: 12,
                                                    border: '1px solid #FEB2B2'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 14,
                                                            fontWeight: 700,
                                                            color: '#C53030',
                                                            marginBottom: 10
                                                        },
                                                        children: "Step 2: Type to Confirm"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 917,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 12,
                                                            color: '#E53E3E',
                                                            marginBottom: 12
                                                        },
                                                        children: [
                                                            "Type ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: company?.name?.toUpperCase()
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 918,
                                                                columnNumber: 110
                                                            }, this),
                                                            " below."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 918,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            gap: 10
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                className: "e-input",
                                                                placeholder: company?.name?.toUpperCase(),
                                                                value: deleteInput,
                                                                onChange: (e)=>setDeleteInput(e.target.value)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 920,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                disabled: deleteInput !== company?.name?.toUpperCase(),
                                                                onClick: ()=>{
                                                                    if (deleteInput === company?.name?.toUpperCase()) {
                                                                        deleteCompany(companyId);
                                                                        router.push('/companies');
                                                                    }
                                                                },
                                                                className: "btn btn-red",
                                                                style: {
                                                                    opacity: deleteInput !== company?.name?.toUpperCase() ? 0.5 : 1
                                                                },
                                                                children: "Forever Delete"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 921,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 919,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setDeleteStep(0);
                                                            setDeleteInput('');
                                                        },
                                                        className: "btn btn-ghost",
                                                        style: {
                                                            marginTop: 10,
                                                            fontSize: 12
                                                        },
                                                        children: "Cancel"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 933,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 916,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 897,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/settings/page.tsx",
                                lineNumber: 824,
                                columnNumber: 25
                            }, this),
                            tab === 'loyalty' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card",
                                style: {
                                    padding: '24px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        style: {
                                            fontWeight: 900,
                                            fontSize: 18,
                                            color: '#1A1A2E',
                                            marginBottom: 20
                                        },
                                        children: "Customer Loyalty Program"
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 943,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 13,
                                            color: '#718096',
                                            marginBottom: 20
                                        },
                                        children: "Configure how customer value points are earned and redeemed in your shop."
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 944,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '16px 20px',
                                            background: '#F0FDF4',
                                            borderRadius: 14,
                                            border: '1.5px solid #BBF7D0',
                                            marginBottom: 24
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 14
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            width: 44,
                                                            height: 44,
                                                            borderRadius: 12,
                                                            background: '#10B98115',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"], {
                                                            size: 22,
                                                            color: "#10B981"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/settings/page.tsx",
                                                            lineNumber: 949,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 948,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontWeight: 800,
                                                                    fontSize: 15,
                                                                    color: '#1A1A2E'
                                                                },
                                                                children: "Enable Loyalty Points"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 952,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: 12,
                                                                    color: '#718096',
                                                                    marginTop: 2
                                                                },
                                                                children: "Allow customers to accumulate value points on their purchases and redeem them for discounts."
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 953,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 951,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 947,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setLoyaltyEnabled(!loyaltyEnabled),
                                                style: {
                                                    width: 52,
                                                    height: 28,
                                                    borderRadius: 99,
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    background: loyaltyEnabled ? '#10B981' : '#E2E8F0',
                                                    transition: 'background 0.2s',
                                                    position: 'relative',
                                                    flexShrink: 0
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        position: 'absolute',
                                                        top: 3,
                                                        left: loyaltyEnabled ? 26 : 3,
                                                        width: 22,
                                                        height: 22,
                                                        borderRadius: '50%',
                                                        background: 'white',
                                                        boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                                                        transition: 'left 0.2s'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/settings/page.tsx",
                                                    lineNumber: 964,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 956,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 946,
                                        columnNumber: 29
                                    }, this),
                                    loyaltyEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 20
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'grid',
                                                    gridTemplateColumns: '1fr 1fr',
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
                                                                    marginBottom: 6,
                                                                    textTransform: 'uppercase',
                                                                    letterSpacing: '0.05em'
                                                                },
                                                                children: "Earning Ratio (₹ per Point)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 976,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: 11,
                                                                    color: '#718096',
                                                                    marginBottom: 8
                                                                },
                                                                children: "Amount spent to earn 1 loyalty point."
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 977,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    position: 'relative'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            position: 'absolute',
                                                                            left: 12,
                                                                            top: '50%',
                                                                            transform: 'translateY(-50%)',
                                                                            fontSize: 13,
                                                                            fontWeight: 700,
                                                                            color: '#4A5568'
                                                                        },
                                                                        children: "₹"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                                        lineNumber: 979,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        className: "e-input",
                                                                        style: {
                                                                            paddingLeft: 28
                                                                        },
                                                                        value: earnRatio,
                                                                        onChange: (e)=>setEarnRatio(e.target.value),
                                                                        placeholder: "100"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                                        lineNumber: 980,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 978,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 975,
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
                                                                    marginBottom: 6,
                                                                    textTransform: 'uppercase',
                                                                    letterSpacing: '0.05em'
                                                                },
                                                                children: "Redemption Value (₹ per Point)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 991,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: 11,
                                                                    color: '#718096',
                                                                    marginBottom: 8
                                                                },
                                                                children: "Discount value of 1 loyalty point in rupees."
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 992,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    position: 'relative'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            position: 'absolute',
                                                                            left: 12,
                                                                            top: '50%',
                                                                            transform: 'translateY(-50%)',
                                                                            fontSize: 13,
                                                                            fontWeight: 700,
                                                                            color: '#4A5568'
                                                                        },
                                                                        children: "₹"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                                        lineNumber: 994,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        step: "0.01",
                                                                        className: "e-input",
                                                                        style: {
                                                                            paddingLeft: 28
                                                                        },
                                                                        value: redeemValue,
                                                                        onChange: (e)=>setRedeemValue(e.target.value),
                                                                        placeholder: "1"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                                        lineNumber: 995,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 993,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 990,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 974,
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
                                                            marginBottom: 6,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.05em'
                                                        },
                                                        children: "Minimum Points to Redeem"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 1009,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 11,
                                                            color: '#718096',
                                                            marginBottom: 8
                                                        },
                                                        children: "Minimum points threshold required before points can be redeemed."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 1010,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        className: "e-input",
                                                        value: minRedeem,
                                                        onChange: (e)=>setMinRedeem(e.target.value),
                                                        placeholder: "10"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 1011,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 1008,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: '#F8FAFC',
                                                    border: '1px dashed #E2E8F0',
                                                    borderRadius: 12,
                                                    padding: '14px 16px',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 4
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: 11,
                                                            fontWeight: 800,
                                                            color: '#475569',
                                                            textTransform: 'uppercase'
                                                        },
                                                        children: "Rule Summary"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 1021,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 12,
                                                            color: '#64748B',
                                                            margin: 0
                                                        },
                                                        children: [
                                                            "Customers will earn ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "1 Point"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 1023,
                                                                columnNumber: 65
                                                            }, this),
                                                            " for every ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: [
                                                                    "₹",
                                                                    parseFloat(earnRatio) || 100
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 1023,
                                                                columnNumber: 100
                                                            }, this),
                                                            " spent."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 1022,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 12,
                                                            color: '#64748B',
                                                            margin: 0
                                                        },
                                                        children: [
                                                            "Each point can be redeemed for ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: [
                                                                    "₹",
                                                                    parseFloat(redeemValue) || 1
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 1026,
                                                                columnNumber: 76
                                                            }, this),
                                                            " discount when they have at least ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: [
                                                                    parseFloat(minRedeem) || 10,
                                                                    " Points"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/settings/page.tsx",
                                                                lineNumber: 1026,
                                                                columnNumber: 158
                                                            }, this),
                                                            "."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/settings/page.tsx",
                                                        lineNumber: 1025,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/settings/page.tsx",
                                                lineNumber: 1020,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 973,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: 24,
                                            borderTop: '1px solid #F1F3F5',
                                            paddingTop: 20
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: saveLoyalty,
                                            className: "btn btn-blue",
                                            children: "Save Loyalty Settings"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/settings/page.tsx",
                                            lineNumber: 1033,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/settings/page.tsx",
                                        lineNumber: 1032,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/settings/page.tsx",
                                lineNumber: 942,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/settings/page.tsx",
                        lineNumber: 352,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/settings/page.tsx",
                lineNumber: 299,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
                /* ── Settings Layout Mobile ── */
                @media (max-width: 639px) {
                    .settings-layout { flex-direction: column !important; gap: 12px !important; }
                    .settings-layout > aside { width: 100% !important; }

                    /* Hide the sidebar card entirely on mobile — we use .mobile-tab-bar instead */
                    .settings-layout > aside .card { display: none !important; }

                    /* Mobile tab bar: 4-column icon grid */
                    .mobile-tab-bar {
                        display: grid !important;
                        grid-template-columns: repeat(4, 1fr) !important;
                        gap: 8px !important;
                        padding: 12px !important;
                        background: white !important;
                        border-radius: 16px !important;
                        box-shadow: 0 2px 12px rgba(0,0,0,0.06) !important;
                    }
                    .mobile-tab-btn {
                        display: flex !important;
                        flex-direction: column !important;
                        align-items: center !important;
                        gap: 4px !important;
                        padding: 10px 4px !important;
                        border-radius: 12px !important;
                        border: none !important;
                        background: transparent !important;
                        cursor: pointer !important;
                        transition: background 0.15s !important;
                    }
                    .mobile-tab-btn.active {
                        background: #E8F0FE !important;
                    }
                    .mobile-tab-btn span {
                        font-size: 10px !important;
                        font-weight: 600 !important;
                        color: #718096 !important;
                        text-align: center !important;
                        line-height: 1.2 !important;
                    }
                    .mobile-tab-btn.active span {
                        color: #1967D2 !important;
                        font-weight: 700 !important;
                    }

                    .settings-biz-grid { grid-template-columns: 1fr !important; }
                    .template-grid { grid-template-columns: 1fr !important; }
                    .paper-size-grid { grid-template-columns: repeat(2, 1fr) !important; }
                    .template-assign-grid { grid-template-columns: 1fr !important; }
                    .banking-grid { grid-template-columns: 1fr !important; }
                    .color-picker-grid { grid-template-columns: 1fr !important; }
                    .sections-toggle-grid { grid-template-columns: 1fr !important; }
                    .sync-info-grid { grid-template-columns: 1fr !important; }
                    .team-add-row { flex-direction: column !important; }
                    .template-preview-wrapper { transform: scale(1) !important; width: 100% !important; }
                }

                /* Mobile tab bar hidden on desktop */
                .mobile-tab-bar { display: none; }

                @media (max-width: 480px) {
                    .template-preview-wrapper { transform: scale(0.6) !important; transform-origin: top center !important; }
                }
                
                .template-grid { grid-template-columns: repeat(2, 1fr) !important; }
                @media (min-width: 600px) {
                    .template-grid { grid-template-columns: repeat(4, 1fr) !important; }
                    .paper-size-grid { grid-template-columns: repeat(3, 1fr) !important; }
                    .banking-grid { grid-template-columns: 1fr 1fr !important; }
                    .color-picker-grid { grid-template-columns: 1fr 1fr !important; }
                    .sections-toggle-grid { grid-template-columns: 1fr 1fr !important; }
                    .sync-info-grid { grid-template-columns: 1fr 1fr !important; }
                }
            `
            }, void 0, false, {
                fileName: "[project]/app/company/settings/page.tsx",
                lineNumber: 1040,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
_s2(SettingsPage, "nQWtvJVNKufJdhvcDasNJ7p7DQs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActiveCompany"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c2 = SettingsPage;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "AutoBackupStatusCard");
__turbopack_context__.k.register(_c1, "RestaurantChargesPanel");
__turbopack_context__.k.register(_c2, "SettingsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_company_settings_page_tsx_33765911._.js.map