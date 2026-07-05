(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/QrLabelModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>QrLabelModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QrCode$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/qr-code.js [app-client] (ecmascript) <export default as QrCode>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function QrLabelModal({ product, company, onClose }) {
    _s();
    const [downloading, setDownloading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const qrData = product.name;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&ecc=H&data=${encodeURIComponent(qrData)}`;
    // Draw preview on component mount or data changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QrLabelModal.useEffect": ()=>{
            drawPreview();
        }
    }["QrLabelModal.useEffect"], [
        product,
        company
    ]);
    const drawPreview = ()=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Fill background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Draw dashed sticker border
        ctx.strokeStyle = '#94A3B8';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([
            5,
            3
        ]);
        ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);
        ctx.setLineDash([]); // Reset line dash
        // Draw Company Name
        ctx.fillStyle = '#64748B';
        ctx.font = '800 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(company?.name?.toUpperCase() || 'EDIBIO STORE', canvas.width / 2, 28);
        // Draw Product Name
        ctx.fillStyle = '#1E293B';
        ctx.font = 'bold 13px sans-serif';
        const name = product.name || 'Product Name';
        const truncatedName = name.length > 25 ? name.substring(0, 23) + '...' : name;
        ctx.fillText(truncatedName, canvas.width / 2, 48);
        // Draw Price
        ctx.fillStyle = '#16A34A';
        ctx.font = '900 16px sans-serif';
        ctx.fillText(`₹${product.sellingPrice}`, canvas.width / 2, 72);
        // Load QR Code image
        const qrImg = new Image();
        qrImg.crossOrigin = 'anonymous';
        qrImg.src = qrUrl;
        qrImg.onload = ()=>{
            const qrSize = 130;
            const qrX = (canvas.width - qrSize) / 2;
            const qrY = 88;
            ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);
            // Draw Logo background (white rounded rect with smooth border)
            const logoBgSize = 36;
            const logoBgX = qrX + (qrSize - logoBgSize) / 2;
            const logoBgY = qrY + (qrSize - logoBgSize) / 2;
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.roundRect(logoBgX, logoBgY, logoBgSize, logoBgSize, 8);
            ctx.fill();
            ctx.strokeStyle = '#E2E8F0';
            ctx.lineWidth = 1;
            ctx.stroke();
            // Load Logo
            const logoImg = new Image();
            logoImg.crossOrigin = 'anonymous';
            logoImg.src = '/logo.png';
            logoImg.onload = ()=>{
                const logoSize = 28;
                const logoX = qrX + (qrSize - logoSize) / 2;
                const logoY = qrY + (qrSize - logoSize) / 2;
                ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
                // Draw label/barcode text below QR
                const labelText = product.barcode || product.name;
                const truncatedLabel = labelText.length > 25 ? labelText.substring(0, 23) + '...' : labelText;
                ctx.fillStyle = '#334155';
                ctx.font = 'bold 10px monospace';
                ctx.fillText(truncatedLabel, canvas.width / 2, qrY + qrSize + 18);
                // Footer
                ctx.fillStyle = '#94A3B8';
                ctx.font = '800 7px sans-serif';
                ctx.fillText('POWERED BY EDIBIO ERP', canvas.width / 2, canvas.height - 18);
            };
            logoImg.onerror = ()=>{
                // If logo fails, still draw fallback text
                const labelText = product.barcode || product.name;
                const truncatedLabel = labelText.length > 25 ? labelText.substring(0, 23) + '...' : labelText;
                ctx.fillStyle = '#334155';
                ctx.font = 'bold 10px monospace';
                ctx.fillText(truncatedLabel, canvas.width / 2, qrY + qrSize + 18);
            };
        };
    };
    const handleDownload = ()=>{
        setDownloading(true);
        const previewCanvas = canvasRef.current;
        if (!previewCanvas) {
            setDownloading(false);
            return;
        }
        // Create high-res canvas for printing (300 DPI scale)
        const scale = 2; // double resolution for printing
        const printCanvas = document.createElement('canvas');
        printCanvas.width = previewCanvas.width * scale;
        printCanvas.height = previewCanvas.height * scale;
        const ctx = printCanvas.getContext('2d');
        if (!ctx) {
            setDownloading(false);
            return;
        }
        // Fill background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, printCanvas.width, printCanvas.height);
        // Dash Border
        ctx.strokeStyle = '#64748B';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([
            10,
            6
        ]);
        ctx.strokeRect(16, 16, printCanvas.width - 32, printCanvas.height - 32);
        ctx.setLineDash([]);
        // Company Name
        ctx.fillStyle = '#64748B';
        ctx.font = '800 20px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(company?.name?.toUpperCase() || 'EDIBIO STORE', printCanvas.width / 2, 56);
        // Product Name
        ctx.fillStyle = '#1E293B';
        ctx.font = 'bold 26px sans-serif';
        const name = product.name || 'Product Name';
        const truncatedName = name.length > 25 ? name.substring(0, 23) + '...' : name;
        ctx.fillText(truncatedName, printCanvas.width / 2, 96);
        // Selling Price
        ctx.fillStyle = '#16A34A';
        ctx.font = '900 32px sans-serif';
        ctx.fillText(`₹${product.sellingPrice}`, printCanvas.width / 2, 144);
        // Draw QR
        const qrImg = new Image();
        qrImg.crossOrigin = 'anonymous';
        qrImg.src = qrUrl;
        qrImg.onload = ()=>{
            const qrSize = 260;
            const qrX = (printCanvas.width - qrSize) / 2;
            const qrY = 176;
            ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);
            // Logo Background
            const logoBgSize = 72;
            const logoBgX = qrX + (qrSize - logoBgSize) / 2;
            const logoBgY = qrY + (qrSize - logoBgSize) / 2;
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.roundRect(logoBgX, logoBgY, logoBgSize, logoBgSize, 16);
            ctx.fill();
            ctx.strokeStyle = '#E2E8F0';
            ctx.lineWidth = 2;
            ctx.stroke();
            // Logo
            const logoImg = new Image();
            logoImg.crossOrigin = 'anonymous';
            logoImg.src = '/logo.png';
            logoImg.onload = ()=>{
                const logoSize = 56;
                const logoX = qrX + (qrSize - logoSize) / 2;
                const logoY = qrY + (qrSize - logoSize) / 2;
                ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
                // Barcode/Name text
                const labelText = product.barcode || product.name;
                const truncatedLabel = labelText.length > 25 ? labelText.substring(0, 23) + '...' : labelText;
                ctx.fillStyle = '#1E293B';
                ctx.font = 'bold 20px monospace';
                ctx.fillText(truncatedLabel, printCanvas.width / 2, qrY + qrSize + 36);
                // Footer
                ctx.fillStyle = '#94A3B8';
                ctx.font = '800 14px sans-serif';
                ctx.fillText('POWERED BY EDIBIO ERP', printCanvas.width / 2, printCanvas.height - 36);
                // Trigger Download
                const link = document.createElement('a');
                link.download = `QR_Sticker_${product.name.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
                link.href = printCanvas.toDataURL('image/png');
                link.click();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Sticker downloaded!');
                setDownloading(false);
            };
            logoImg.onerror = ()=>{
                // If logo fails, complete without logo overlay
                const labelText = product.barcode || product.name;
                const truncatedLabel = labelText.length > 25 ? labelText.substring(0, 23) + '...' : labelText;
                ctx.fillStyle = '#1E293B';
                ctx.font = 'bold 20px monospace';
                ctx.fillText(truncatedLabel, printCanvas.width / 2, qrY + qrSize + 36);
                const link = document.createElement('a');
                link.download = `QR_Sticker_${product.name.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
                link.href = printCanvas.toDataURL('image/png');
                link.click();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Sticker downloaded!');
                setDownloading(false);
            };
        };
        qrImg.onerror = ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Failed to load QR code image. Please try again.');
            setDownloading(false);
        };
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "modal-overlay",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "modal-box",
            onClick: (e)=>e.stopPropagation(),
            style: {
                maxWidth: 360,
                padding: 0,
                borderRadius: 20
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px 20px',
                        borderBottom: '1px solid #E2E8F0'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QrCode$3e$__["QrCode"], {
                                    size: 18,
                                    color: "#9333EA"
                                }, void 0, false, {
                                    fileName: "[project]/components/QrLabelModal.tsx",
                                    lineNumber: 240,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontWeight: 900,
                                        fontSize: 15,
                                        color: '#1A1A2E'
                                    },
                                    children: "QR sticker generator"
                                }, void 0, false, {
                                    fileName: "[project]/components/QrLabelModal.tsx",
                                    lineNumber: 241,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/QrLabelModal.tsx",
                            lineNumber: 239,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "btn btn-ghost btn-icon",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/components/QrLabelModal.tsx",
                                lineNumber: 243,
                                columnNumber: 82
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/QrLabelModal.tsx",
                            lineNumber: 243,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/QrLabelModal.tsx",
                    lineNumber: 238,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '24px 20px',
                        background: '#F8FAFC',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'white',
                            padding: 8,
                            borderRadius: 16,
                            boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
                            border: '1px solid #E2E8F0'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                            ref: canvasRef,
                            width: 260,
                            height: 360,
                            style: {
                                display: 'block',
                                borderRadius: 8
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/QrLabelModal.tsx",
                            lineNumber: 249,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/QrLabelModal.tsx",
                        lineNumber: 248,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/QrLabelModal.tsx",
                    lineNumber: 247,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '16px 20px',
                        borderTop: '1px solid #E2E8F0',
                        display: 'flex',
                        gap: 10
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "btn btn-outline",
                            style: {
                                flex: 1
                            },
                            children: "Close"
                        }, void 0, false, {
                            fileName: "[project]/components/QrLabelModal.tsx",
                            lineNumber: 255,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleDownload,
                            disabled: downloading,
                            className: "btn btn-blue",
                            style: {
                                flex: 2,
                                gap: 6,
                                background: 'linear-gradient(135deg, #7C3AED, #4285F4)',
                                border: 'none',
                                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.25)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                    size: 15
                                }, void 0, false, {
                                    fileName: "[project]/components/QrLabelModal.tsx",
                                    lineNumber: 257,
                                    columnNumber: 25
                                }, this),
                                downloading ? 'Downloading...' : 'Download Sticker'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/QrLabelModal.tsx",
                            lineNumber: 256,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/QrLabelModal.tsx",
                    lineNumber: 254,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/QrLabelModal.tsx",
            lineNumber: 236,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/QrLabelModal.tsx",
        lineNumber: 235,
        columnNumber: 9
    }, this);
}
_s(QrLabelModal, "qNX7tStLb53NyjZGawfKeO5oLm4=");
_c = QrLabelModal;
var _c;
__turbopack_context__.k.register(_c, "QrLabelModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/company/inventory/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-down.js [app-client] (ecmascript) <export default as ArrowDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up.js [app-client] (ecmascript) <export default as ArrowUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QrCode$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/qr-code.js [app-client] (ecmascript) <export default as QrCode>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$QrLabelModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/QrLabelModal.tsx [app-client] (ecmascript)");
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
const TYPE_STYLES = {
    in: {
        color: '#16A34A',
        bg: '#DCFCE7',
        label: 'STOCK IN',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__["ArrowUp"], {
            size: 11,
            style: {
                marginRight: 4
            }
        }, void 0, false, {
            fileName: "[project]/app/company/inventory/[id]/page.tsx",
            lineNumber: 12,
            columnNumber: 75
        }, ("TURBOPACK compile-time value", void 0)),
        rowBg: 'rgba(22, 163, 74, 0.02)'
    },
    out: {
        color: '#DC2626',
        bg: '#FEE2E2',
        label: 'STOCK OUT',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__["ArrowDown"], {
            size: 11,
            style: {
                marginRight: 4
            }
        }, void 0, false, {
            fileName: "[project]/app/company/inventory/[id]/page.tsx",
            lineNumber: 13,
            columnNumber: 75
        }, ("TURBOPACK compile-time value", void 0)),
        rowBg: 'rgba(220, 38, 38, 0.02)'
    },
    adjust: {
        color: '#D97706',
        bg: '#FEF3C7',
        label: 'ADJUSTED',
        icon: null,
        rowBg: 'rgba(217, 119, 6, 0.02)'
    },
    opening: {
        color: '#2563EB',
        bg: '#DBEAFE',
        label: 'OPENING',
        icon: null,
        rowBg: 'rgba(37, 99, 235, 0.02)'
    }
};
function ProductDetailPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const productId = params.id;
    const products = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"])('products');
    const product = products.find((p)=>p.id === productId);
    const company = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActiveCompany"])();
    const { updateProduct } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('history');
    const [showBatchModal, setShowBatchModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showQrModal, setShowQrModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [batchForm, setBatchForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        batchNo: '',
        mfgDate: '',
        expiryDate: '',
        qty: '',
        purchasePrice: ''
    });
    if (!product) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                textAlign: 'center',
                padding: '80px 20px'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                    size: 48,
                    style: {
                        color: '#E2E8F0',
                        margin: '0 auto 16px'
                    }
                }, void 0, false, {
                    fileName: "[project]/app/company/inventory/[id]/page.tsx",
                    lineNumber: 37,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        fontSize: 16,
                        color: '#A0AEC0',
                        fontWeight: 700
                    },
                    children: "Product not found"
                }, void 0, false, {
                    fileName: "[project]/app/company/inventory/[id]/page.tsx",
                    lineNumber: 38,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>router.back(),
                    style: {
                        marginTop: 16,
                        padding: '10px 24px',
                        borderRadius: 10,
                        border: 'none',
                        background: '#1A1A2E',
                        color: 'white',
                        fontWeight: 700,
                        cursor: 'pointer'
                    },
                    children: "← Back"
                }, void 0, false, {
                    fileName: "[project]/app/company/inventory/[id]/page.tsx",
                    lineNumber: 39,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/company/inventory/[id]/page.tsx",
            lineNumber: 36,
            columnNumber: 13
        }, this);
    }
    const logs = (product.stockLogs || []).slice().sort((a, b)=>b.date.localeCompare(a.date));
    const batches = product.batches || [];
    const today = new Date().toISOString().slice(0, 10);
    const expiredBatches = batches.filter((b)=>b.expiryDate && b.expiryDate < today);
    const soonBatches = batches.filter((b)=>b.expiryDate && b.expiryDate >= today && new Date(b.expiryDate) <= new Date(Date.now() + 30 * 86400000));
    const saveBatch = ()=>{
        if (!batchForm.batchNo) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Batch number required');
            return;
        }
        const batch = {
            id: Math.random().toString(36).slice(2) + Date.now().toString(36),
            batchNo: batchForm.batchNo,
            mfgDate: batchForm.mfgDate || undefined,
            expiryDate: batchForm.expiryDate || undefined,
            qty: parseFloat(batchForm.qty) || 0,
            purchasePrice: parseFloat(batchForm.purchasePrice) || product.purchasePrice,
            addedAt: new Date().toISOString()
        };
        updateProduct(product.id, {
            batches: [
                batch,
                ...batches
            ]
        });
        setBatchForm({
            batchNo: '',
            mfgDate: '',
            expiryDate: '',
            qty: '',
            purchasePrice: ''
        });
        setShowBatchModal(false);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Batch added!');
    };
    const deleteBatch = (id)=>{
        updateProduct(product.id, {
            batches: batches.filter((b)=>b.id !== id)
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Batch removed');
    };
    const daysUntil = (date)=>Math.floor((new Date(date).getTime() - Date.now()) / 86400000);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            maxWidth: 900,
            margin: '0 auto',
            paddingBottom: 40
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    marginBottom: 24
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.back(),
                        style: {
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#718096',
                            display: 'flex'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                            size: 20
                        }, void 0, false, {
                            fileName: "[project]/app/company/inventory/[id]/page.tsx",
                            lineNumber: 80,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/company/inventory/[id]/page.tsx",
                        lineNumber: 79,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: 48,
                            height: 48,
                            borderRadius: 14,
                            background: 'linear-gradient(135deg,#FEF7E0,#FDE68A)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 900,
                            fontSize: 20,
                            color: '#B45309',
                            flexShrink: 0
                        },
                        children: product.name[0]
                    }, void 0, false, {
                        fileName: "[project]/app/company/inventory/[id]/page.tsx",
                        lineNumber: 82,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontSize: 20,
                                    fontWeight: 900,
                                    color: '#1A1A2E',
                                    margin: 0
                                },
                                children: product.name
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                lineNumber: 86,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 12,
                                    color: '#718096',
                                    margin: '2px 0 0'
                                },
                                children: [
                                    product.category || '—',
                                    " · HSN ",
                                    product.hsnCode || '—'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                lineNumber: 87,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/inventory/[id]/page.tsx",
                        lineNumber: 85,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 16
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowQrModal(true),
                                className: "btn",
                                style: {
                                    gap: 8,
                                    background: 'linear-gradient(135deg, #7C3AED, #4285F4)',
                                    border: 'none',
                                    color: 'white',
                                    padding: '10px 16px',
                                    borderRadius: 12,
                                    fontWeight: 800,
                                    fontSize: 13,
                                    display: 'flex',
                                    alignItems: 'center',
                                    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.15)',
                                    cursor: 'pointer'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QrCode$3e$__["QrCode"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                        lineNumber: 108,
                                        columnNumber: 25
                                    }, this),
                                    "Print QR Sticker"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                lineNumber: 90,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: 'right'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 22,
                                            fontWeight: 900,
                                            color: product.stockQty <= product.lowStockAlertQty ? '#EA4335' : '#34A853',
                                            margin: 0
                                        },
                                        children: [
                                            product.stockQty,
                                            " ",
                                            product.unit
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                        lineNumber: 112,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 11,
                                            color: '#718096',
                                            margin: 0
                                        },
                                        children: "in stock"
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                        lineNumber: 113,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 10,
                                            color: '#94A3B8',
                                            margin: '4px 0 0',
                                            fontFamily: 'monospace'
                                        },
                                        children: [
                                            "ID: ",
                                            product.id
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                        lineNumber: 114,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                lineNumber: 111,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/inventory/[id]/page.tsx",
                        lineNumber: 89,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                lineNumber: 78,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))',
                    gap: 12,
                    marginBottom: 20
                },
                children: [
                    {
                        l: 'Purchase Price',
                        v: `₹${product.purchasePrice}`
                    },
                    {
                        l: 'Selling Price',
                        v: `₹${product.sellingPrice}`,
                        bold: true
                    },
                    {
                        l: 'MRP',
                        v: product.mrp ? `₹${product.mrp}` : '—'
                    },
                    {
                        l: 'GST Rate',
                        v: `${product.gstRate}%`
                    },
                    {
                        l: 'Low Stock Alert',
                        v: `< ${product.lowStockAlertQty}`
                    },
                    {
                        l: 'Batches',
                        v: `${batches.length}`,
                        warn: expiredBatches.length > 0
                    }
                ].map((card)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'white',
                            border: '1px solid #E2E8F0',
                            borderRadius: 14,
                            padding: '14px 16px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 10,
                                    fontWeight: 800,
                                    color: '#94A3B8',
                                    textTransform: 'uppercase',
                                    marginBottom: 4
                                },
                                children: card.l
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                lineNumber: 130,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 16,
                                    fontWeight: 900,
                                    color: card.warn ? '#EA4335' : '#1A1A2E'
                                },
                                children: card.v
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                lineNumber: 131,
                                columnNumber: 25
                            }, this)
                        ]
                    }, card.l, true, {
                        fileName: "[project]/app/company/inventory/[id]/page.tsx",
                        lineNumber: 129,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                lineNumber: 120,
                columnNumber: 13
            }, this),
            expiredBatches.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: '#FEE2E2',
                    border: '1.5px solid #FCA5A5',
                    borderRadius: 12,
                    padding: '12px 18px',
                    marginBottom: 14,
                    display: 'flex',
                    gap: 10,
                    alignItems: 'center'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                        size: 16,
                        color: "#DC2626"
                    }, void 0, false, {
                        fileName: "[project]/app/company/inventory/[id]/page.tsx",
                        lineNumber: 139,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontWeight: 700,
                            fontSize: 13,
                            color: '#DC2626'
                        },
                        children: [
                            expiredBatches.length,
                            " batch(es) expired — check your inventory!"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/inventory/[id]/page.tsx",
                        lineNumber: 140,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                lineNumber: 138,
                columnNumber: 17
            }, this),
            soonBatches.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: '#FEF3C7',
                    border: '1.5px solid #FDE68A',
                    borderRadius: 12,
                    padding: '12px 18px',
                    marginBottom: 14,
                    display: 'flex',
                    gap: 10,
                    alignItems: 'center'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                        size: 16,
                        color: "#D97706"
                    }, void 0, false, {
                        fileName: "[project]/app/company/inventory/[id]/page.tsx",
                        lineNumber: 145,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontWeight: 700,
                            fontSize: 13,
                            color: '#D97706'
                        },
                        children: [
                            soonBatches.length,
                            " batch(es) expiring within 30 days"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/inventory/[id]/page.tsx",
                        lineNumber: 146,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                lineNumber: 144,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: 6,
                    marginBottom: 16
                },
                children: [
                    'history',
                    'batches'
                ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setTab(t),
                        style: {
                            padding: '8px 20px',
                            borderRadius: 10,
                            border: '1.5px solid',
                            borderColor: tab === t ? '#4285F4' : '#E2E8F0',
                            background: tab === t ? '#4285F4' : 'white',
                            color: tab === t ? 'white' : '#4A5568',
                            fontWeight: 700,
                            fontSize: 13,
                            cursor: 'pointer'
                        },
                        children: t === 'history' ? `📋 Stock History (${logs.length})` : `📦 Batches (${batches.length})`
                    }, t, false, {
                        fileName: "[project]/app/company/inventory/[id]/page.tsx",
                        lineNumber: 153,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                lineNumber: 151,
                columnNumber: 13
            }, this),
            tab === 'history' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: 'white',
                    borderRadius: 16,
                    border: '1px solid #E2E8F0',
                    overflow: 'hidden'
                },
                children: logs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '60px 20px',
                        textAlign: 'center',
                        color: '#A0AEC0'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                            size: 40,
                            style: {
                                margin: '0 auto 12px',
                                opacity: 0.3
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/company/inventory/[id]/page.tsx",
                            lineNumber: 164,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontWeight: 700
                            },
                            children: "No movement recorded yet"
                        }, void 0, false, {
                            fileName: "[project]/app/company/inventory/[id]/page.tsx",
                            lineNumber: 165,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 12
                            },
                            children: "Stock movements will appear here automatically when you create sale/purchase bills."
                        }, void 0, false, {
                            fileName: "[project]/app/company/inventory/[id]/page.tsx",
                            lineNumber: 166,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/company/inventory/[id]/page.tsx",
                    lineNumber: 163,
                    columnNumber: 25
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        overflowX: 'auto'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        style: {
                            width: '100%',
                            borderCollapse: 'collapse',
                            fontSize: 13
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    style: {
                                        background: '#F8FAFC'
                                    },
                                    children: [
                                        'Date',
                                        'Type',
                                        'Qty',
                                        'Reason',
                                        'Party',
                                        'Balance After'
                                    ].map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            style: {
                                                padding: '10px 16px',
                                                textAlign: 'left',
                                                fontSize: 10,
                                                fontWeight: 800,
                                                color: '#64748B',
                                                textTransform: 'uppercase',
                                                borderBottom: '1px solid #E2E8F0'
                                            },
                                            children: h
                                        }, h, false, {
                                            fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                            lineNumber: 174,
                                            columnNumber: 45
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                    lineNumber: 172,
                                    columnNumber: 37
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                lineNumber: 171,
                                columnNumber: 33
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: logs.map((log)=>{
                                    const s = TYPE_STYLES[log.type] || TYPE_STYLES.adjust;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        style: {
                                            borderBottom: '1px solid #F1F5F9',
                                            background: s.rowBg
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    padding: '10px 16px',
                                                    color: '#718096'
                                                },
                                                children: [
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(log.date),
                                                    log.time && ` ${log.time}`
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                                lineNumber: 183,
                                                columnNumber: 49
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    padding: '10px 16px'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        padding: '4px 10px',
                                                        borderRadius: 6,
                                                        fontSize: 11,
                                                        fontWeight: 800,
                                                        background: s.bg,
                                                        color: s.color
                                                    },
                                                    children: [
                                                        s.icon,
                                                        s.label
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                                    lineNumber: 185,
                                                    columnNumber: 53
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                                lineNumber: 184,
                                                columnNumber: 49
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    padding: '10px 16px',
                                                    fontWeight: 900,
                                                    color: log.type === 'out' ? '#DC2626' : '#16A34A'
                                                },
                                                children: [
                                                    log.type === 'out' ? '−' : '+',
                                                    log.qty,
                                                    " ",
                                                    product.unit
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                                lineNumber: 199,
                                                columnNumber: 49
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    padding: '10px 16px',
                                                    color: '#334155'
                                                },
                                                children: log.reason
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                                lineNumber: 202,
                                                columnNumber: 49
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    padding: '10px 16px',
                                                    color: '#718096'
                                                },
                                                children: log.partyName || '—'
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                                lineNumber: 203,
                                                columnNumber: 49
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    padding: '10px 16px',
                                                    fontWeight: 800
                                                },
                                                children: [
                                                    log.balanceAfter,
                                                    " ",
                                                    product.unit
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                                lineNumber: 204,
                                                columnNumber: 49
                                            }, this)
                                        ]
                                    }, log.id, true, {
                                        fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                        lineNumber: 182,
                                        columnNumber: 45
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                lineNumber: 178,
                                columnNumber: 33
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/inventory/[id]/page.tsx",
                        lineNumber: 170,
                        columnNumber: 29
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/company/inventory/[id]/page.tsx",
                    lineNumber: 169,
                    columnNumber: 25
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                lineNumber: 161,
                columnNumber: 17
            }, this),
            tab === 'batches' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginBottom: 12
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setShowBatchModal(true),
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6,
                                padding: '9px 20px',
                                borderRadius: 10,
                                border: 'none',
                                background: '#1A1A2E',
                                color: 'white',
                                fontWeight: 800,
                                fontSize: 13,
                                cursor: 'pointer'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    size: 14
                                }, void 0, false, {
                                    fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                    lineNumber: 220,
                                    columnNumber: 29
                                }, this),
                                " Add Batch"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/inventory/[id]/page.tsx",
                            lineNumber: 219,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/company/inventory/[id]/page.tsx",
                        lineNumber: 218,
                        columnNumber: 21
                    }, this),
                    batches.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'white',
                            borderRadius: 16,
                            border: '1px solid #E2E8F0',
                            padding: '60px 20px',
                            textAlign: 'center',
                            color: '#A0AEC0'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontWeight: 700
                            },
                            children: "No batches added yet"
                        }, void 0, false, {
                            fileName: "[project]/app/company/inventory/[id]/page.tsx",
                            lineNumber: 225,
                            columnNumber: 29
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/company/inventory/[id]/page.tsx",
                        lineNumber: 224,
                        columnNumber: 25
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 10
                        },
                        children: batches.map((b)=>{
                            const isExpired = b.expiryDate && b.expiryDate < today;
                            const isSoon = b.expiryDate && !isExpired && daysUntil(b.expiryDate) <= 30;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: 'white',
                                    border: `1.5px solid ${isExpired ? '#FCA5A5' : isSoon ? '#FDE68A' : '#E2E8F0'}`,
                                    borderRadius: 14,
                                    padding: '16px 20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 16
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            flex: 1
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    gap: 10,
                                                    alignItems: 'center',
                                                    marginBottom: 4
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontWeight: 900,
                                                            fontSize: 15,
                                                            color: '#1A1A2E'
                                                        },
                                                        children: b.batchNo
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                                        lineNumber: 236,
                                                        columnNumber: 49
                                                    }, this),
                                                    isExpired && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            padding: '2px 8px',
                                                            borderRadius: 6,
                                                            background: '#FEE2E2',
                                                            color: '#DC2626',
                                                            fontSize: 10,
                                                            fontWeight: 800
                                                        },
                                                        children: "EXPIRED"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                                        lineNumber: 237,
                                                        columnNumber: 63
                                                    }, this),
                                                    isSoon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            padding: '2px 8px',
                                                            borderRadius: 6,
                                                            background: '#FEF3C7',
                                                            color: '#D97706',
                                                            fontSize: 10,
                                                            fontWeight: 800
                                                        },
                                                        children: [
                                                            "EXPIRING SOON (",
                                                            daysUntil(b.expiryDate),
                                                            "d)"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                                        lineNumber: 238,
                                                        columnNumber: 60
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                                lineNumber: 235,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    gap: 20,
                                                    fontSize: 12,
                                                    color: '#718096'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Qty:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                                                lineNumber: 241,
                                                                columnNumber: 55
                                                            }, this),
                                                            " ",
                                                            b.qty,
                                                            " ",
                                                            product.unit
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                                        lineNumber: 241,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Purchase:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                                                lineNumber: 242,
                                                                columnNumber: 55
                                                            }, this),
                                                            " ₹",
                                                            b.purchasePrice
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                                        lineNumber: 242,
                                                        columnNumber: 49
                                                    }, this),
                                                    b.mfgDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Mfg:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                                                lineNumber: 243,
                                                                columnNumber: 69
                                                            }, this),
                                                            " ",
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(b.mfgDate)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                                        lineNumber: 243,
                                                        columnNumber: 63
                                                    }, this),
                                                    b.expiryDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Exp:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                                                lineNumber: 244,
                                                                columnNumber: 72
                                                            }, this),
                                                            " ",
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(b.expiryDate)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                                        lineNumber: 244,
                                                        columnNumber: 66
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                                lineNumber: 240,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                        lineNumber: 234,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>deleteBatch(b.id),
                                        style: {
                                            color: '#EA4335',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: 6,
                                            borderRadius: 8,
                                            display: 'flex'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                            size: 15
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                            lineNumber: 248,
                                            columnNumber: 45
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                        lineNumber: 247,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, b.id, true, {
                                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                lineNumber: 233,
                                columnNumber: 37
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/company/inventory/[id]/page.tsx",
                        lineNumber: 228,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                lineNumber: 217,
                columnNumber: 17
            }, this),
            showBatchModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "modal-overlay",
                onClick: ()=>setShowBatchModal(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modal-box",
                    onClick: (e)=>e.stopPropagation(),
                    style: {
                        maxWidth: 440
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '18px 24px 14px',
                                borderBottom: '1px solid #E1E4E8',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    style: {
                                        fontWeight: 900,
                                        fontSize: 17
                                    },
                                    children: "Add Batch"
                                }, void 0, false, {
                                    fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                    lineNumber: 263,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowBatchModal(false),
                                    style: {
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#718096'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                        lineNumber: 264,
                                        columnNumber: 162
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                    lineNumber: 264,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/inventory/[id]/page.tsx",
                            lineNumber: 262,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '20px 24px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 14
                            },
                            children: [
                                [
                                    {
                                        label: 'Batch No *',
                                        key: 'batchNo',
                                        type: 'text',
                                        placeholder: 'e.g. B2024-001'
                                    },
                                    {
                                        label: 'Qty',
                                        key: 'qty',
                                        type: 'number',
                                        placeholder: '0'
                                    },
                                    {
                                        label: 'Purchase Price ₹',
                                        key: 'purchasePrice',
                                        type: 'number',
                                        placeholder: String(product.purchasePrice)
                                    },
                                    {
                                        label: 'Mfg Date',
                                        key: 'mfgDate',
                                        type: 'date',
                                        placeholder: ''
                                    },
                                    {
                                        label: 'Expiry Date',
                                        key: 'expiryDate',
                                        type: 'date',
                                        placeholder: ''
                                    }
                                ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                style: {
                                                    fontSize: 11,
                                                    fontWeight: 700,
                                                    color: '#4A5568',
                                                    display: 'block',
                                                    marginBottom: 5,
                                                    textTransform: 'uppercase'
                                                },
                                                children: f.label
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                                lineNumber: 275,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "e-input",
                                                type: f.type,
                                                placeholder: f.placeholder,
                                                value: batchForm[f.key],
                                                onChange: (e)=>setBatchForm((p)=>({
                                                            ...p,
                                                            [f.key]: e.target.value
                                                        }))
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                                lineNumber: 276,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, f.key, true, {
                                        fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                        lineNumber: 274,
                                        columnNumber: 33
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: 10,
                                        marginTop: 4
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowBatchModal(false),
                                            className: "btn btn-outline",
                                            style: {
                                                flex: 1
                                            },
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                            lineNumber: 282,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: saveBatch,
                                            className: "btn btn-blue",
                                            style: {
                                                flex: 1
                                            },
                                            children: "Save Batch"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                            lineNumber: 283,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/inventory/[id]/page.tsx",
                                    lineNumber: 281,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/inventory/[id]/page.tsx",
                            lineNumber: 266,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/company/inventory/[id]/page.tsx",
                    lineNumber: 261,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                lineNumber: 260,
                columnNumber: 17
            }, this),
            showQrModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$QrLabelModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                product: product,
                company: company,
                onClose: ()=>setShowQrModal(false)
            }, void 0, false, {
                fileName: "[project]/app/company/inventory/[id]/page.tsx",
                lineNumber: 290,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/company/inventory/[id]/page.tsx",
        lineNumber: 76,
        columnNumber: 9
    }, this);
}
_s(ProductDetailPage, "EOVBNd8nt+A1FUdqpHshvoJ56iw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActiveCompany"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c = ProductDetailPage;
var _c;
__turbopack_context__.k.register(_c, "ProductDetailPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ArrowLeft
]);
/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m12 19-7-7 7-7",
            key: "1l729n"
        }
    ],
    [
        "path",
        {
            d: "M19 12H5",
            key: "x3x0zl"
        }
    ]
];
const ArrowLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("arrow-left", __iconNode);
;
 //# sourceMappingURL=arrow-left.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrowLeft",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/arrow-down.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ArrowDown
]);
/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12 5v14",
            key: "s699le"
        }
    ],
    [
        "path",
        {
            d: "m19 12-7 7-7-7",
            key: "1idqje"
        }
    ]
];
const ArrowDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("arrow-down", __iconNode);
;
 //# sourceMappingURL=arrow-down.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/arrow-down.js [app-client] (ecmascript) <export default as ArrowDown>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrowDown",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-down.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/arrow-up.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ArrowUp
]);
/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m5 12 7-7 7 7",
            key: "hav0vg"
        }
    ],
    [
        "path",
        {
            d: "M12 19V5",
            key: "x0mq9r"
        }
    ]
];
const ArrowUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("arrow-up", __iconNode);
;
 //# sourceMappingURL=arrow-up.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/arrow-up.js [app-client] (ecmascript) <export default as ArrowUp>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrowUp",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Plus
]);
/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M5 12h14",
            key: "1ays0h"
        }
    ],
    [
        "path",
        {
            d: "M12 5v14",
            key: "s699le"
        }
    ]
];
const Plus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("plus", __iconNode);
;
 //# sourceMappingURL=plus.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Plus",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/qr-code.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>QrCode
]);
/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "rect",
        {
            width: "5",
            height: "5",
            x: "3",
            y: "3",
            rx: "1",
            key: "1tu5fj"
        }
    ],
    [
        "rect",
        {
            width: "5",
            height: "5",
            x: "16",
            y: "3",
            rx: "1",
            key: "1v8r4q"
        }
    ],
    [
        "rect",
        {
            width: "5",
            height: "5",
            x: "3",
            y: "16",
            rx: "1",
            key: "1x03jg"
        }
    ],
    [
        "path",
        {
            d: "M21 16h-3a2 2 0 0 0-2 2v3",
            key: "177gqh"
        }
    ],
    [
        "path",
        {
            d: "M21 21v.01",
            key: "ents32"
        }
    ],
    [
        "path",
        {
            d: "M12 7v3a2 2 0 0 1-2 2H7",
            key: "8crl2c"
        }
    ],
    [
        "path",
        {
            d: "M3 12h.01",
            key: "nlz23k"
        }
    ],
    [
        "path",
        {
            d: "M12 3h.01",
            key: "n36tog"
        }
    ],
    [
        "path",
        {
            d: "M12 16v.01",
            key: "133mhm"
        }
    ],
    [
        "path",
        {
            d: "M16 12h1",
            key: "1slzba"
        }
    ],
    [
        "path",
        {
            d: "M21 12v.01",
            key: "1lwtk9"
        }
    ],
    [
        "path",
        {
            d: "M12 21v-1",
            key: "1880an"
        }
    ]
];
const QrCode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("qr-code", __iconNode);
;
 //# sourceMappingURL=qr-code.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/qr-code.js [app-client] (ecmascript) <export default as QrCode>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QrCode",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/qr-code.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Download
]);
/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12 15V3",
            key: "m9g1x1"
        }
    ],
    [
        "path",
        {
            d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
            key: "ih7n3h"
        }
    ],
    [
        "path",
        {
            d: "m7 10 5 5 5-5",
            key: "brsn70"
        }
    ]
];
const Download = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("download", __iconNode);
;
 //# sourceMappingURL=download.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Download",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_23b15403._.js.map