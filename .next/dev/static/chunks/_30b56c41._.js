(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/AIAddItemModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AIAddItemModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImagePlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image-plus.js [app-client] (ecmascript) <export default as ImagePlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/camera.js [app-client] (ecmascript) <export default as Camera>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function extractJSON(raw) {
    if (!raw || !raw.trim()) throw new Error('AI returned empty response');
    // 1. Try markdown code fences
    const fenceMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fenceMatch) {
        const inside = fenceMatch[1].trim();
        try {
            JSON.parse(inside);
            return inside;
        } catch  {}
    }
    // 2. Try finding the first '{' and last '}'
    const firstBrace = raw.indexOf('{');
    const lastBrace = raw.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        const candidate = raw.substring(firstBrace, lastBrace + 1);
        try {
            JSON.parse(candidate);
            return candidate;
        } catch  {}
    }
    // 3. Try finding the first '[' and last ']'
    const firstBracket = raw.indexOf('[');
    const lastBracket = raw.lastIndexOf(']');
    if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
        const candidate = raw.substring(firstBracket, lastBracket + 1);
        try {
            JSON.parse(candidate);
            return candidate;
        } catch  {}
    }
    // 4. More aggressive depth tracking
    for(let start = 0; start < raw.length; start++){
        if (raw[start] === '{' || raw[start] === '[') {
            const startChar = raw[start];
            const endChar = startChar === '{' ? '}' : ']';
            let depth = 0;
            for(let end = start; end < raw.length; end++){
                if (raw[end] === startChar) depth++;
                else if (raw[end] === endChar) {
                    depth--;
                    if (depth === 0) {
                        const candidate = raw.slice(start, end + 1);
                        try {
                            JSON.parse(candidate);
                            return candidate;
                        } catch  {}
                    }
                }
            }
        }
    }
    throw new Error('Could not extract JSON. Raw response: ' + raw.slice(0, 150) + '...');
}
const sleep = (ms)=>new Promise((res)=>setTimeout(res, ms));
async function callGeminiMulti(apiKey, model, prompt, images) {
    const tryConfigs = [
        {
            ver: 'v1beta',
            useSystem: true,
            useJsonMode: true
        },
        {
            ver: 'v1beta',
            useSystem: true,
            useJsonMode: false
        },
        {
            ver: 'v1',
            useSystem: false,
            useJsonMode: false
        }
    ];
    let lastErr = '';
    for (const config of tryConfigs){
        let retries = 0;
        const maxRetries = 3;
        while(retries <= maxRetries){
            try {
                const url = `https://generativelanguage.googleapis.com/${config.ver}/models/${model}:generateContent?key=${apiKey}`;
                const body = {
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt
                                },
                                ...images.map((img)=>({
                                        inline_data: {
                                            mime_type: img.mimeType,
                                            data: img.data
                                        }
                                    }))
                            ]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.1,
                        maxOutputTokens: 8192
                    }
                };
                if (config.useSystem) {
                    body.system_instruction = {
                        parts: [
                            {
                                text: 'You are an elite OCR extraction system. Extract data correctly into the requested JSON schema. All numbers must be raw numbers (no commas). Respond with raw JSON only.'
                            }
                        ]
                    };
                }
                if (config.useJsonMode) {
                    body.generationConfig.responseMimeType = 'application/json';
                }
                const res = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                });
                if (res.ok) {
                    const data = await res.json();
                    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
                    if (!text) break; // Try next config if empty text
                    return extractJSON(text); // Success!
                }
                // Read error
                const errData = await res.json().catch(()=>({}));
                lastErr = errData?.error?.message || `HTTP ${res.status}`;
                // Handle Quota Error (429) specifically with a wait
                if (res.status === 429) {
                    if (retries < maxRetries) {
                        retries++;
                        const waitTime = Math.pow(2, retries) * 1000 + Math.random() * 500;
                        console.warn(`[AI] Quota 429 hit. Retrying in ${Math.round(waitTime)}ms... (Attempt ${retries}/${maxRetries})`);
                        await sleep(waitTime);
                        continue; // Retry this same config/key
                    }
                    // If exhausted retries, throw so we switch keys
                    throw new Error(`[429] ${lastErr}`);
                }
                // If it's a 404 (model not found) or 400 (Bad Request from API version mismatch)
                // It means this specific model + API version combination doesn't work.
                if (res.status === 404 || res.status === 400) {
                    break; // Move to next config
                }
                // Other errors (403 forbidden, etc)
                throw new Error(`[${res.status}] ${lastErr}`);
            } catch (e) {
                lastErr = e.message;
                // If it's a model specific error, move to next config
                if (lastErr.includes('404') || lastErr.includes('400') || lastErr.includes('not found')) {
                    break;
                }
                // If it's a 429 that already exhausted retries, or 401/403, bubble up to main loop to switch keys
                if (lastErr.includes('429') || lastErr.includes('401') || lastErr.includes('403')) {
                    throw Object.assign(new Error(lastErr), {
                        code: 'KEY_EXHAUSTED'
                    });
                }
                throw e;
            }
        }
    }
    // If we exhausted all configs and still failed, throw the final error
    throw new Error(lastErr || `Model ${model} failed in all configurations`);
}
const SCAN_STEPS = [
    'Reading image…',
    'Detecting items…',
    'Extracting prices…',
    'Building result…'
];
function AIAddItemModal({ onClose, onGeminiScanned, onPurchaseScanned, type = 'item' }) {
    _s();
    const [images, setImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isScanning, setIsScanning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scanStep, setScanStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [done, setDone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { aiApiKey: adminKey } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const SHARED_KEYS = [
        'AIzaSyD9pB9IccS4K2vIWpxcg0xI2GVlqUbp1fk',
        'AIzaSyDVXhcyk3qnuTyQ96Me-RHFa4iqNR59lGo',
        'AIzaSyCT8Vc3sDrpd1XIzu-MPHYCwLx40CIUcuo',
        'AIzaSyB3vK9xL2mT8nQ1wP5yR7cG4fH0dZ6vJ5M',
        'AIzaSyM8nG2qW5cV1bX9zP4kL7jY0tR3hF6dK8N',
        'AIzaSyX1cY4vB7nM0pW3qT6rL9kP2jF5dG8hH9S',
        'AIzaSyA8nH4xP9mB2vR0tK5jL3fY6wQ1zG7sD2M'
    ].filter((k)=>k.length > 35);
    const handleSelectFiles = (e)=>{
        if (!e.target.files) return;
        const files = Array.from(e.target.files).slice(0, 4);
        const newImages = [];
        let processed = 0;
        files.forEach((file)=>{
            const reader = new FileReader();
            reader.onload = ()=>{
                newImages.push(reader.result?.toString() || '');
                processed++;
                if (processed === files.length) setImages(newImages);
            };
            reader.readAsDataURL(file);
        });
    };
    const [scannedData, setScannedData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const startScan = async ()=>{
        if (images.length === 0) return;
        // AI Rate Limiting logic (5 per minute per user)
        const userUid = JSON.parse(localStorage.getItem('edibio-storage') || '{}')?.state?.user?.uid || 'guest';
        const limitKey = `ai_scan_limits_${userUid}`;
        let history = [];
        try {
            history = JSON.parse(localStorage.getItem(limitKey) || '[]');
        } catch (e) {}
        const now = Date.now();
        // Keep only timestamps within the last 60 seconds
        history = history.filter((t)=>now - t < 60000);
        if (history.length >= 5) {
            setError("Rate Limit Exceeded: You can only perform 5 AI scans per minute. Please try again in a moment.");
            return;
        }
        setIsScanning(true);
        setError(null);
        setDone(false);
        setScanStep(0);
        setScannedData(null);
        const imageObjects = images.map((img)=>{
            const mimeType = img.match(/data:(.*?);base64/)?.[1] || 'image/jpeg';
            const data = img.includes(';base64,') ? img.split(';base64,')[1] : img.includes(',') ? img.split(',')[1] : img;
            return {
                mimeType,
                data
            };
        });
        // Refined prompt for better AI understanding of handwritten text and 20+ items
        const prompt = type === 'purchase' ? `Extract all items from this purchase invoice. Include supplierName, billDate (YYYY-MM-DD), billNumber, totalAmount, and an items array with: {name, price, qty, gst, hsn}. If handwritten or faint, use deep analysis to identify characters. Respond ONLY with valid JSON.` : `Identify and list all products in this image. For each item, extract {name, price, qty, gst}. Return a JSON array. Be extremely precise with names and prices. Analyze handwritten lists carefully.`;
        const stepInterval = setInterval(()=>setScanStep((s)=>Math.min(s + 1, SCAN_STEPS.length - 1)), 2500);
        // Shuffle keys to distribute traffic load better
        const shuffledShared = [
            ...SHARED_KEYS
        ].sort(()=>Math.random() - 0.5);
        const keysToTry = adminKey ? [
            adminKey,
            ...shuffledShared
        ] : shuffledShared;
        // Use the newest available Gemini Flash models
        const MODELS = [
            'gemini-2.0-flash',
            'gemini-1.5-flash',
            'gemini-1.5-flash-8b'
        ];
        let success = false;
        let lastError = '';
        outer_loop: for (const key of keysToTry){
            for (const model of MODELS){
                try {
                    console.log(`[AI] Attempting ${model} with key ${key.slice(0, 6)}...`);
                    const resultText = await callGeminiMulti(key, model, prompt, imageObjects);
                    console.log("[AI Raw Output]: ", resultText);
                    const data = JSON.parse(resultText);
                    setScannedData(data);
                    // On success, record timestamp in history
                    history.push(Date.now());
                    localStorage.setItem(limitKey, JSON.stringify(history));
                    success = true;
                    console.log(`[AI] Success with ${model}`);
                    break outer_loop;
                } catch (err) {
                    lastError = err.message || String(err);
                    console.warn(`[AI Scan] Soft Error (${model}):`, lastError);
                    // Key-specific death errors (Quota or Auth)
                    if (err.code === 'KEY_EXHAUSTED' || lastError.includes('429') || lastError.includes('401') || lastError.includes('403')) {
                        console.warn('[AI] Key-level failure. Moving to next provider.');
                        break; // Stop trying this key with other models, move to next key in outer_loop
                    }
                // Model specific error (like 404), continue with next model
                }
            }
        }
        clearInterval(stepInterval);
        if (!success) {
            if (lastError.includes('429')) {
                // Determine if it's generic rate limit vs hard 0 quota
                if (lastError.includes('billing')) {
                    setError("API Key Error: Your API key has ZERO quota. You must enable Billing on your Google Cloud project or use an account with an active free tier.");
                } else {
                    setError("Rate Limit Hit: Google's 15 Requests/Min limit reached on this key. Please wait 60 seconds and try again.");
                }
            } else if (lastError.includes('403')) {
                setError("System Offline: All AI keys have been disabled. Please configure your Personal Gemini API key in Settings -> Security instantly.");
            } else {
                setError(`Scan Failed: ${lastError}`);
            }
        }
        setIsScanning(false);
    };
    const handleConfirm = ()=>{
        if (!scannedData) return;
        if (type === 'purchase') {
            const norm = Array.isArray(scannedData) ? {
                items: scannedData
            } : scannedData.items ? scannedData : {
                items: []
            };
            if (onPurchaseScanned) onPurchaseScanned(norm);
        } else {
            const list = Array.isArray(scannedData) ? scannedData : scannedData.items || [];
            if (onGeminiScanned) onGeminiScanned(list);
        }
        setDone(true);
        setTimeout(()=>onClose(), 900);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "modal-overlay",
        onClick: onClose,
        style: {
            zIndex: 2000
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "modal-box",
            onClick: (e)=>e.stopPropagation(),
            style: {
                maxWidth: 700,
                borderRadius: 28,
                overflow: 'hidden',
                boxShadow: '0 24px 80px rgba(0,0,0,0.5)'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '20px 28px',
                        background: 'linear-gradient(135deg,#0F172A,#1E293B)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
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
                                        background: 'linear-gradient(135deg,#4285F4,#9333EA)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                        size: 22,
                                        color: "white"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AIAddItemModal.tsx",
                                        lineNumber: 305,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/AIAddItemModal.tsx",
                                    lineNumber: 304,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            style: {
                                                fontWeight: 900,
                                                fontSize: 18,
                                                margin: 0
                                            },
                                            children: "AI Smart Scanner"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                            lineNumber: 308,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 10,
                                                opacity: 0.5,
                                                margin: '2px 0 0',
                                                fontWeight: 600,
                                                letterSpacing: 1,
                                                textTransform: 'uppercase'
                                            },
                                            children: type === 'purchase' ? 'Purchase Bill Extractor' : 'Inventory Item Extractor'
                                        }, void 0, false, {
                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                            lineNumber: 309,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AIAddItemModal.tsx",
                                    lineNumber: 307,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AIAddItemModal.tsx",
                            lineNumber: 303,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            style: {
                                background: 'rgba(255,255,255,0.1)',
                                color: 'white',
                                border: 'none',
                                borderRadius: 12,
                                padding: 10,
                                cursor: 'pointer'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/components/AIAddItemModal.tsx",
                                lineNumber: 314,
                                columnNumber: 177
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/AIAddItemModal.tsx",
                            lineNumber: 314,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AIAddItemModal.tsx",
                    lineNumber: 302,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        maxHeight: 'calc(100vh - 120px)',
                        background: '#FAFAFA'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '28px',
                                overflowY: 'auto',
                                flex: 1
                            },
                            children: [
                                !images.length && !isScanning && !done && !scannedData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        border: '2px dashed #CBD5E1',
                                        borderRadius: 24,
                                        padding: '52px 24px',
                                        textAlign: 'center',
                                        background: 'white',
                                        cursor: 'pointer'
                                    },
                                    onClick: ()=>document.getElementById('ai-file-input')?.click(),
                                    onDragOver: (e)=>e.preventDefault(),
                                    onDrop: (e)=>{
                                        e.preventDefault();
                                        const fakeEv = {
                                            target: {
                                                files: e.dataTransfer.files
                                            }
                                        };
                                        handleSelectFiles(fakeEv);
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: 'relative',
                                                width: 120,
                                                height: 88,
                                                margin: '0 auto 20px',
                                                border: '2px dashed #94A3B8',
                                                borderRadius: 10,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                background: '#F1F5F9'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                                    size: 32,
                                                    color: "#94A3B8"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AIAddItemModal.tsx",
                                                    lineNumber: 331,
                                                    columnNumber: 37
                                                }, this),
                                                [
                                                    [
                                                        'top',
                                                        'left'
                                                    ],
                                                    [
                                                        'top',
                                                        'right'
                                                    ],
                                                    [
                                                        'bottom',
                                                        'left'
                                                    ],
                                                    [
                                                        'bottom',
                                                        'right'
                                                    ]
                                                ].map(([v, h])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            position: 'absolute',
                                                            [v]: -2,
                                                            [h]: -2,
                                                            width: 14,
                                                            height: 14,
                                                            borderTop: v === 'top' ? '3px solid #3B82F6' : 'none',
                                                            borderBottom: v === 'bottom' ? '3px solid #3B82F6' : 'none',
                                                            borderLeft: h === 'left' ? '3px solid #3B82F6' : 'none',
                                                            borderRight: h === 'right' ? '3px solid #3B82F6' : 'none'
                                                        }
                                                    }, `${v}${h}`, false, {
                                                        fileName: "[project]/components/AIAddItemModal.tsx",
                                                        lineNumber: 334,
                                                        columnNumber: 41
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                            lineNumber: 330,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            style: {
                                                fontSize: 17,
                                                fontWeight: 900,
                                                color: '#1E293B',
                                                marginBottom: 6
                                            },
                                            children: "Drop your invoice here"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                            lineNumber: 341,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 12,
                                                color: '#64748B',
                                                marginBottom: 20,
                                                lineHeight: 1.6
                                            },
                                            children: [
                                                "Works with printed & handwritten bills.",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                    fileName: "[project]/components/AIAddItemModal.tsx",
                                                    lineNumber: 343,
                                                    columnNumber: 76
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Tip:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AIAddItemModal.tsx",
                                                    lineNumber: 344,
                                                    columnNumber: 37
                                                }, this),
                                                " Good lighting = better results. Up to 3 pages."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                            lineNumber: 342,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                gap: 10,
                                                justifyContent: 'center'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "btn btn-blue",
                                                    style: {
                                                        borderRadius: 14,
                                                        gap: 8
                                                    },
                                                    onClick: (e)=>{
                                                        e.stopPropagation();
                                                        document.getElementById('ai-file-input')?.click();
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                            size: 14
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                                            lineNumber: 348,
                                                            columnNumber: 41
                                                        }, this),
                                                        " Select Photo"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AIAddItemModal.tsx",
                                                    lineNumber: 347,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "btn btn-outline",
                                                    style: {
                                                        borderRadius: 14,
                                                        gap: 8
                                                    },
                                                    onClick: (e)=>{
                                                        e.stopPropagation();
                                                        document.getElementById('ai-camera-input')?.click();
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                                            size: 14
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                                            lineNumber: 351,
                                                            columnNumber: 41
                                                        }, this),
                                                        " Use Camera"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AIAddItemModal.tsx",
                                                    lineNumber: 350,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                            lineNumber: 346,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "ai-file-input",
                                            type: "file",
                                            multiple: true,
                                            accept: "image/*",
                                            onChange: handleSelectFiles,
                                            style: {
                                                display: 'none'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                            lineNumber: 354,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "ai-camera-input",
                                            type: "file",
                                            accept: "image/*",
                                            capture: "environment",
                                            onChange: handleSelectFiles,
                                            style: {
                                                display: 'none'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                            lineNumber: 355,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AIAddItemModal.tsx",
                                    lineNumber: 324,
                                    columnNumber: 29
                                }, this),
                                isScanning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        textAlign: 'center',
                                        padding: '40px 20px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: 'relative',
                                                width: 80,
                                                height: 80,
                                                margin: '0 auto 24px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        width: 80,
                                                        height: 80,
                                                        borderRadius: '50%',
                                                        border: '4px solid #E8F0FE',
                                                        borderTop: '4px solid #4285F4',
                                                        animation: 'ai-spin 1s linear infinite'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AIAddItemModal.tsx",
                                                    lineNumber: 363,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                    size: 28,
                                                    color: "#4285F4",
                                                    style: {
                                                        position: 'absolute',
                                                        top: '50%',
                                                        left: '50%',
                                                        transform: 'translate(-50%,-50%)'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AIAddItemModal.tsx",
                                                    lineNumber: 364,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                            lineNumber: 362,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            style: {
                                                fontWeight: 900,
                                                fontSize: 18,
                                                color: '#1E293B',
                                                margin: '0 0 6px'
                                            },
                                            children: "Analyzing your bill…"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                            lineNumber: 366,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 14,
                                                color: '#4285F4',
                                                fontWeight: 700,
                                                marginBottom: 28
                                            },
                                            children: SCAN_STEPS[scanStep]
                                        }, void 0, false, {
                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                            lineNumber: 367,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'center',
                                                gap: 10
                                            },
                                            children: SCAN_STEPS.map((step, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        gap: 6
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                width: 30,
                                                                height: 30,
                                                                borderRadius: '50%',
                                                                background: i <= scanStep ? '#4285F4' : '#E2E8F0',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                transition: 'background 0.3s'
                                                            },
                                                            children: i < scanStep ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                size: 14,
                                                                color: "white"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AIAddItemModal.tsx",
                                                                lineNumber: 372,
                                                                columnNumber: 65
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    color: i === scanStep ? 'white' : '#94A3B8',
                                                                    fontSize: 11,
                                                                    fontWeight: 800
                                                                },
                                                                children: i + 1
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AIAddItemModal.tsx",
                                                                lineNumber: 372,
                                                                columnNumber: 108
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                                            lineNumber: 371,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: 9,
                                                                color: i <= scanStep ? '#4285F4' : '#94A3B8',
                                                                fontWeight: 700,
                                                                textAlign: 'center',
                                                                maxWidth: 62
                                                            },
                                                            children: step.replace('…', '')
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                                            lineNumber: 374,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/components/AIAddItemModal.tsx",
                                                    lineNumber: 370,
                                                    columnNumber: 41
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                            lineNumber: 368,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                            children: `@keyframes ai-spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }`
                                        }, void 0, false, {
                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                            lineNumber: 378,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AIAddItemModal.tsx",
                                    lineNumber: 361,
                                    columnNumber: 29
                                }, this),
                                images.length > 0 && !isScanning && !done && !scannedData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 18
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                gap: 12,
                                                overflowX: 'auto',
                                                padding: '4px 0'
                                            },
                                            children: [
                                                images.map((img, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            position: 'relative',
                                                            flexShrink: 0
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: img,
                                                                alt: `Page \${i + 1}`,
                                                                style: {
                                                                    width: 130,
                                                                    height: 168,
                                                                    objectFit: 'cover',
                                                                    borderRadius: 14,
                                                                    border: '2px solid #E2E8F0',
                                                                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AIAddItemModal.tsx",
                                                                lineNumber: 388,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>setImages((prev)=>prev.filter((_, idx)=>idx !== i)),
                                                                style: {
                                                                    position: 'absolute',
                                                                    top: 8,
                                                                    right: 8,
                                                                    background: '#EF4444',
                                                                    color: 'white',
                                                                    border: 'none',
                                                                    borderRadius: 8,
                                                                    padding: 5,
                                                                    cursor: 'pointer'
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                    size: 12
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AIAddItemModal.tsx",
                                                                    lineNumber: 389,
                                                                    columnNumber: 277
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AIAddItemModal.tsx",
                                                                lineNumber: 389,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    position: 'absolute',
                                                                    bottom: 8,
                                                                    left: 8,
                                                                    background: 'rgba(0,0,0,0.65)',
                                                                    color: 'white',
                                                                    fontSize: 10,
                                                                    fontWeight: 700,
                                                                    padding: '2px 8px',
                                                                    borderRadius: 6
                                                                },
                                                                children: [
                                                                    "Page ",
                                                                    i + 1
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/AIAddItemModal.tsx",
                                                                lineNumber: 390,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/components/AIAddItemModal.tsx",
                                                        lineNumber: 387,
                                                        columnNumber: 41
                                                    }, this)),
                                                images.length < 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "ai-add-more",
                                                    style: {
                                                        width: 130,
                                                        height: 168,
                                                        border: '2px dashed #CBD5E1',
                                                        borderRadius: 14,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: 8,
                                                        cursor: 'pointer',
                                                        background: 'white',
                                                        flexShrink: 0
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImagePlus$3e$__["ImagePlus"], {
                                                            size: 24,
                                                            color: "#94A3B8"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                                            lineNumber: 395,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: 11,
                                                                color: '#94A3B8',
                                                                fontWeight: 600
                                                            },
                                                            children: "Add page"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                                            lineNumber: 396,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            id: "ai-add-more",
                                                            type: "file",
                                                            multiple: true,
                                                            accept: "image/*",
                                                            onChange: handleSelectFiles,
                                                            style: {
                                                                display: 'none'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                                            lineNumber: 397,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AIAddItemModal.tsx",
                                                    lineNumber: 394,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                            lineNumber: 385,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                background: '#EFF6FF',
                                                border: '1px solid #BFDBFE',
                                                borderRadius: 12,
                                                padding: '10px 14px',
                                                fontSize: 12,
                                                color: '#1D4ED8',
                                                fontWeight: 600
                                            },
                                            children: [
                                                "💡 ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Tip:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AIAddItemModal.tsx",
                                                    lineNumber: 402,
                                                    columnNumber: 40
                                                }, this),
                                                " Ensure the full invoice is in frame with clear, readable text for best accuracy."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                            lineNumber: 401,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AIAddItemModal.tsx",
                                    lineNumber: 384,
                                    columnNumber: 29
                                }, this),
                                scannedData && !isScanning && !done && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 20
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: '#F8FAFC',
                                            border: '1px solid #E2E8F0',
                                            borderRadius: 20,
                                            padding: '20px',
                                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 10,
                                                    marginBottom: 16
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            width: 32,
                                                            height: 32,
                                                            borderRadius: 8,
                                                            background: '#E0F2FE',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                            size: 16,
                                                            color: "#0EA5E9"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                                            lineNumber: 413,
                                                            columnNumber: 45
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AIAddItemModal.tsx",
                                                        lineNumber: 412,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        style: {
                                                            fontWeight: 800,
                                                            fontSize: 15,
                                                            color: '#1E293B',
                                                            margin: 0
                                                        },
                                                        children: "Review Extracted Data"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AIAddItemModal.tsx",
                                                        lineNumber: 415,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AIAddItemModal.tsx",
                                                lineNumber: 411,
                                                columnNumber: 37
                                            }, this),
                                            type === 'purchase' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    marginBottom: 20,
                                                    display: 'grid',
                                                    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                                                    gap: 12
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            background: 'white',
                                                            padding: '10px 14px',
                                                            borderRadius: 12,
                                                            border: '1px solid #F1F5F9'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: 9,
                                                                    fontWeight: 700,
                                                                    color: '#94A3B8',
                                                                    textTransform: 'uppercase',
                                                                    marginBottom: 4
                                                                },
                                                                children: "Supplier"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AIAddItemModal.tsx",
                                                                lineNumber: 421,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: 13,
                                                                    fontWeight: 700,
                                                                    color: '#1E293B'
                                                                },
                                                                children: scannedData.supplierName || 'N/A'
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AIAddItemModal.tsx",
                                                                lineNumber: 422,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/AIAddItemModal.tsx",
                                                        lineNumber: 420,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            background: 'white',
                                                            padding: '10px 14px',
                                                            borderRadius: 12,
                                                            border: '1px solid #F1F5F9'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: 9,
                                                                    fontWeight: 700,
                                                                    color: '#94A3B8',
                                                                    textTransform: 'uppercase',
                                                                    marginBottom: 4
                                                                },
                                                                children: "Bill Number"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AIAddItemModal.tsx",
                                                                lineNumber: 425,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: 13,
                                                                    fontWeight: 700,
                                                                    color: '#1E293B'
                                                                },
                                                                children: scannedData.billNumber || 'N/A'
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AIAddItemModal.tsx",
                                                                lineNumber: 426,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/AIAddItemModal.tsx",
                                                        lineNumber: 424,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            background: 'white',
                                                            padding: '10px 14px',
                                                            borderRadius: 12,
                                                            border: '1px solid #F1F5F9'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: 9,
                                                                    fontWeight: 700,
                                                                    color: '#94A3B8',
                                                                    textTransform: 'uppercase',
                                                                    marginBottom: 4
                                                                },
                                                                children: "Date"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AIAddItemModal.tsx",
                                                                lineNumber: 429,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: 13,
                                                                    fontWeight: 700,
                                                                    color: '#1E293B'
                                                                },
                                                                children: scannedData.billDate || 'N/A'
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AIAddItemModal.tsx",
                                                                lineNumber: 430,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/AIAddItemModal.tsx",
                                                        lineNumber: 428,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            background: '#F0F9FF',
                                                            padding: '10px 14px',
                                                            borderRadius: 12,
                                                            border: '1px solid #BAE6FD'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: 9,
                                                                    fontWeight: 700,
                                                                    color: '#0EA5E9',
                                                                    textTransform: 'uppercase',
                                                                    marginBottom: 4
                                                                },
                                                                children: "Total Amount"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AIAddItemModal.tsx",
                                                                lineNumber: 433,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: 13,
                                                                    fontWeight: 800,
                                                                    color: '#0369A1'
                                                                },
                                                                children: [
                                                                    "₹",
                                                                    scannedData.totalAmount?.toLocaleString() || '0'
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/AIAddItemModal.tsx",
                                                                lineNumber: 434,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/AIAddItemModal.tsx",
                                                        lineNumber: 432,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AIAddItemModal.tsx",
                                                lineNumber: 419,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    borderRadius: 12,
                                                    border: '1px solid #F1F5F9',
                                                    background: 'white',
                                                    overflow: 'hidden'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                    style: {
                                                        width: '100%',
                                                        borderCollapse: 'collapse',
                                                        fontSize: 12
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                            style: {
                                                                background: '#F8FAFC',
                                                                position: 'sticky',
                                                                top: 0,
                                                                zIndex: 10
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        style: {
                                                                            textAlign: 'left',
                                                                            padding: '10px 12px',
                                                                            color: '#64748B',
                                                                            fontWeight: 700
                                                                        },
                                                                        children: "Item Name"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/AIAddItemModal.tsx",
                                                                        lineNumber: 443,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        style: {
                                                                            textAlign: 'center',
                                                                            padding: '10px 8px',
                                                                            color: '#64748B',
                                                                            fontWeight: 700
                                                                        },
                                                                        children: "Qty"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/AIAddItemModal.tsx",
                                                                        lineNumber: 444,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        style: {
                                                                            textAlign: 'right',
                                                                            padding: '10px 12px',
                                                                            color: '#64748B',
                                                                            fontWeight: 700
                                                                        },
                                                                        children: "Price"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/AIAddItemModal.tsx",
                                                                        lineNumber: 445,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/AIAddItemModal.tsx",
                                                                lineNumber: 442,
                                                                columnNumber: 49
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                                            lineNumber: 441,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                            children: (Array.isArray(scannedData) ? scannedData : scannedData.items || []).filter((it)=>(it.name || it.item || it.product) && String(it.name || it.item || it.product).trim()).map((item, i)=>{
                                                                const displayName = item.name || item.item || item.product;
                                                                const displayPrice = item.price ?? item.rate ?? item.unitPrice ?? 0;
                                                                const displayQty = item.qty ?? item.quantity ?? 1;
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                    style: {
                                                                        borderTop: '1px solid #F1F5F9'
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            style: {
                                                                                padding: '10px 12px',
                                                                                color: '#1E293B',
                                                                                fontWeight: 600
                                                                            },
                                                                            children: displayName
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                                                            lineNumber: 455,
                                                                            columnNumber: 61
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            style: {
                                                                                padding: '10px 8px',
                                                                                textAlign: 'center',
                                                                                color: '#475569'
                                                                            },
                                                                            children: displayQty
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                                                            lineNumber: 456,
                                                                            columnNumber: 61
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            style: {
                                                                                padding: '10px 12px',
                                                                                textAlign: 'right',
                                                                                color: '#1E293B',
                                                                                fontWeight: 700
                                                                            },
                                                                            children: [
                                                                                "₹",
                                                                                displayPrice?.toLocaleString() || '0'
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                                                            lineNumber: 457,
                                                                            columnNumber: 61
                                                                        }, this)
                                                                    ]
                                                                }, i, true, {
                                                                    fileName: "[project]/components/AIAddItemModal.tsx",
                                                                    lineNumber: 454,
                                                                    columnNumber: 57
                                                                }, this);
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                                            lineNumber: 448,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AIAddItemModal.tsx",
                                                    lineNumber: 440,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/AIAddItemModal.tsx",
                                                lineNumber: 439,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AIAddItemModal.tsx",
                                        lineNumber: 410,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/AIAddItemModal.tsx",
                                    lineNumber: 409,
                                    columnNumber: 29
                                }, this),
                                done && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        textAlign: 'center',
                                        padding: '40px 20px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                            size: 60,
                                            color: "#34A853",
                                            style: {
                                                margin: '0 auto 16px'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                            lineNumber: 470,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            style: {
                                                fontWeight: 900,
                                                fontSize: 18,
                                                color: '#1E293B',
                                                margin: '0 0 8px'
                                            },
                                            children: "Data Extracted Successfully!"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                            lineNumber: 471,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                color: '#64748B',
                                                fontSize: 14
                                            },
                                            children: "Items have been added. Closing…"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                            lineNumber: 472,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AIAddItemModal.tsx",
                                    lineNumber: 469,
                                    columnNumber: 29
                                }, this),
                                error && !isScanning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: '16px',
                                        background: '#FEF2F2',
                                        border: '1px solid #FCA5A5',
                                        borderRadius: 16
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                gap: 10,
                                                alignItems: 'flex-start',
                                                marginBottom: 12
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                    size: 18,
                                                    color: "#DC2626",
                                                    style: {
                                                        flexShrink: 0,
                                                        marginTop: 2
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AIAddItemModal.tsx",
                                                    lineNumber: 480,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            style: {
                                                                fontWeight: 800,
                                                                fontSize: 13,
                                                                color: '#991B1B',
                                                                margin: '0 0 4px'
                                                            },
                                                            children: "Scan failed — try again"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                                            lineNumber: 482,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            style: {
                                                                fontSize: 12,
                                                                color: '#B91C1C',
                                                                margin: 0,
                                                                lineHeight: 1.5
                                                            },
                                                            children: error.slice(0, 200)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                                            lineNumber: 483,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AIAddItemModal.tsx",
                                                    lineNumber: 481,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                            lineNumber: 479,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: startScan,
                                            style: {
                                                width: '100%',
                                                padding: '11px',
                                                background: '#DC2626',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: 10,
                                                fontWeight: 700,
                                                fontSize: 13,
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: 8
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AIAddItemModal.tsx",
                                                    lineNumber: 487,
                                                    columnNumber: 37
                                                }, this),
                                                " Retry Scan"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                            lineNumber: 486,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AIAddItemModal.tsx",
                                    lineNumber: 478,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AIAddItemModal.tsx",
                            lineNumber: 320,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '20px 28px',
                                borderTop: '1px solid #E2E8F0',
                                background: 'white',
                                display: 'flex',
                                gap: 12
                            },
                            children: [
                                images.length > 0 && !isScanning && !done && !scannedData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setImages([]),
                                            className: "btn btn-outline",
                                            style: {
                                                flex: 1,
                                                borderRadius: 14,
                                                height: 50
                                            },
                                            children: "Reset Items"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                            lineNumber: 497,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: startScan,
                                            style: {
                                                flex: 2,
                                                height: 50,
                                                borderRadius: 14,
                                                background: 'linear-gradient(135deg,#3B82F6,#6366F1)',
                                                color: 'white',
                                                border: 'none',
                                                fontWeight: 900,
                                                fontSize: 15,
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: 10
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AIAddItemModal.tsx",
                                                    lineNumber: 499,
                                                    columnNumber: 37
                                                }, this),
                                                " Scan & Extract"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                            lineNumber: 498,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true),
                                scannedData && !isScanning && !done && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setScannedData(null),
                                            className: "btn btn-outline",
                                            style: {
                                                flex: 1,
                                                borderRadius: 14,
                                                height: 50
                                            },
                                            children: "Rescan Photo"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                            lineNumber: 506,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleConfirm,
                                            style: {
                                                flex: 2,
                                                height: 50,
                                                borderRadius: 14,
                                                background: '#10B981',
                                                color: 'white',
                                                border: 'none',
                                                fontWeight: 900,
                                                fontSize: 15,
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: 10,
                                                boxShadow: '0 4px 14px rgba(16,185,129,0.3)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AIAddItemModal.tsx",
                                                    lineNumber: 510,
                                                    columnNumber: 37
                                                }, this),
                                                " Confirm & Add"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AIAddItemModal.tsx",
                                            lineNumber: 509,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true),
                                !images.length && !isScanning && !done && !scannedData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onClose,
                                    className: "btn btn-outline",
                                    style: {
                                        width: '100%',
                                        borderRadius: 14,
                                        height: 50
                                    },
                                    children: "Close Scanner"
                                }, void 0, false, {
                                    fileName: "[project]/components/AIAddItemModal.tsx",
                                    lineNumber: 516,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AIAddItemModal.tsx",
                            lineNumber: 494,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AIAddItemModal.tsx",
                    lineNumber: 317,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/AIAddItemModal.tsx",
            lineNumber: 299,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/AIAddItemModal.tsx",
        lineNumber: 298,
        columnNumber: 9
    }, this);
}
_s(AIAddItemModal, "K23MrrUOolDGXeX44xApF8wOmxs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c = AIAddItemModal;
var _c;
__turbopack_context__.k.register(_c, "AIAddItemModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/company/inventory/PurchaseBillsTab.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PurchaseBillsTab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.js [app-client] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$repeat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Repeat$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/repeat.js [app-client] (ecmascript) <export default as Repeat>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScanLine$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scan-line.js [app-client] (ecmascript) <export default as ScanLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paperclip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paperclip$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/paperclip.js [app-client] (ecmascript) <export default as Paperclip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ConfirmDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AIAddItemModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AIAddItemModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FeatureGate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/FeatureGate.tsx [app-client] (ecmascript)");
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
;
function PurchaseBillsTab() {
    _s();
    const { activeCompanyId, addInvoice, updateProduct, addProduct, nextInvoiceNumber, user, isDemo } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const companyId = activeCompanyId;
    const company = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActiveCompany"])();
    const allInvoices = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"])('invoices');
    const products = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"])('products');
    const parties = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"])('parties');
    // Only show purchase invoices, sorted by date descending (most recent first)
    const purchaseBills = allInvoices.filter((i)=>i.invoiceType === 'purchase').sort((a, b)=>{
        const dateA = a.date || '';
        const dateB = b.date || '';
        const dateCompare = dateB.localeCompare(dateA);
        if (dateCompare !== 0) return dateCompare;
        const timeA = a.time || '00:00';
        const timeB = b.time || '00:00';
        const timeCompare = timeB.localeCompare(timeA);
        if (timeCompare !== 0) return timeCompare;
        const createA = a.createdAt || '';
        const createB = b.createdAt || '';
        return createB.localeCompare(createA);
    });
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showAdd, setShowAdd] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showAIScan, setShowAIScan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Add Form State
    const [supplierId, setSupplierId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [date, setDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date().toISOString().slice(0, 10));
    const [supplierInvoiceNo, setSupplierInvoiceNo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Recurring State
    const [recurringModalOpen, setRecurringModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const emptyRow = {
        productId: '',
        name: '',
        qty: 1,
        purchasePrice: 0,
        amount: 0
    };
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            ...emptyRow
        }
    ]);
    const [amountPaidInput, setAmountPaidInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [receiptUrl, setReceiptUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const filtered = purchaseBills.filter((b)=>(b.partyName || '').toLowerCase().includes(search.toLowerCase()) || (b.invoiceNumber || '').toLowerCase().includes(search.toLowerCase()));
    const suppliers = parties.filter((p)=>p.type === 'supplier' || p.type === 'both');
    const updateItem = (idx, k, v)=>{
        setItems((prev)=>prev.map((it, i)=>{
                if (i !== idx) return it;
                const up = {
                    ...it,
                    [k]: v
                };
                // Auto complete if product selected
                if (k === 'productId' && v) {
                    const p = products.find((prod)=>prod.id === v);
                    if (p) {
                        up.name = p.name;
                        up.purchasePrice = p.purchasePrice || 0;
                    }
                }
                // Auto calc amount
                const q = parseFloat(up.qty) || 0;
                const r = parseFloat(up.purchasePrice) || 0;
                up.amount = q * r;
                return up;
            }));
    };
    const addRow = ()=>setItems((prev)=>[
                ...prev,
                {
                    ...emptyRow
                }
            ]);
    const removeRow = (idx)=>items.length > 1 && setItems((prev)=>prev.filter((_, i)=>i !== idx));
    const totalAmount = items.reduce((a, b)=>a + (parseFloat(b.amount) || 0), 0);
    const closeAddModal = ()=>{
        setShowAdd(false);
        setSupplierId('');
        setSupplierInvoiceNo('');
        setAmountPaidInput('');
        setReceiptUrl('');
        setItems([
            {
                ...emptyRow
            }
        ]);
    };
    const handleSave = ()=>{
        const validItems = items.filter((i)=>i.name && i.qty > 0);
        if (validItems.length === 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Add at least one complete row');
            return;
        }
        let sName = 'Walk-in Supplier';
        if (supplierId) {
            const s = parties.find((p)=>p.id === supplierId);
            if (s) sName = s.name;
        }
        const invNo = supplierInvoiceNo || nextInvoiceNumber(companyId, 'PUR');
        const paid = amountPaidInput !== '' ? parseFloat(amountPaidInput) || 0 : totalAmount;
        const due = Math.max(0, totalAmount - paid);
        const payStatus = paid >= totalAmount && totalAmount > 0 ? 'paid' : paid > 0 ? 'partial' : 'unpaid';
        // Increase Stock & Update Purchase Price
        // For items WITH a productId → update existing product
        // For items WITHOUT productId but with a name → find by name OR auto-create new product
        const updatedItems = validItems.map((vi)=>{
            let resolvedProductId = vi.productId;
            if (vi.productId) {
                // Existing linked product — just update stock & price
                const prod = products.find((p)=>p.id === vi.productId);
                if (prod) {
                    updateProduct(prod.id, {
                        stockQty: prod.stockQty + parseFloat(vi.qty),
                        purchasePrice: parseFloat(vi.purchasePrice)
                    });
                }
            } else if (vi.name && vi.name.trim()) {
                // No product linked — check if a product with this name already exists
                const existing = products.find((p)=>p.name.toLowerCase().trim() === vi.name.toLowerCase().trim() && p.companyId === companyId);
                if (existing) {
                    // Found by name — update its stock
                    updateProduct(existing.id, {
                        stockQty: existing.stockQty + parseFloat(vi.qty),
                        purchasePrice: parseFloat(vi.purchasePrice)
                    });
                    resolvedProductId = existing.id;
                } else {
                    // Auto-create a new product in inventory
                    const newProd = addProduct({
                        companyId: companyId,
                        name: vi.name.trim(),
                        category: 'AI Scanned',
                        unit: 'pcs',
                        purchasePrice: parseFloat(vi.purchasePrice) || 0,
                        sellingPrice: parseFloat(vi.purchasePrice) || 0,
                        stockQty: parseFloat(vi.qty) || 1,
                        lowStockAlertQty: 5,
                        gstRate: 0,
                        hsnCode: '',
                        barcode: '',
                        description: '',
                        imageUrl: '',
                        taxIncluded: false
                    });
                    resolvedProductId = newProd.id;
                }
            }
            return {
                ...vi,
                productId: resolvedProductId,
                rate: parseFloat(vi.purchasePrice) || 0,
                taxableAmt: vi.amount,
                amount: vi.amount
            };
        });
        const newBill = {
            id: 'pur_' + Date.now().toString(36),
            companyId: companyId,
            invoiceType: 'purchase',
            invoiceNumber: invNo,
            date,
            partyId: supplierId,
            partyName: sName,
            items: updatedItems,
            subTotal: totalAmount,
            taxableAmount: totalAmount,
            totalGst: 0,
            grandTotal: totalAmount,
            paymentStatus: payStatus,
            amountPaid: paid,
            balanceDue: due,
            paymentMethod: 'cash',
            isGstBill: false,
            isHidden: false,
            receiptUrl: receiptUrl || undefined,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        addInvoice(newBill);
        closeAddModal();
    };
    const handleDuplicate = (bill)=>{
        setSupplierId(bill.partyId || '');
        setSupplierInvoiceNo('');
        setDate(new Date().toISOString().slice(0, 10));
        setItems(bill.items.map((i)=>({
                productId: i.productId || '',
                name: i.name,
                qty: i.qty,
                purchasePrice: i.rate || i.purchasePrice,
                amount: i.amount
            })));
        setShowAdd(true);
    };
    const handlePurchaseScanned = (data)=>{
        if (!data) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Could not process bill. Please try a clearer image.');
            setShowAIScan(false);
            return;
        }
        setShowAIScan(false);
        // Ensure the add form is open so the user can review and save
        setShowAdd(true);
        // 1. PARTY EXTRACTION & AUTO-CREATION
        if (data.supplierName && data.supplierName.trim()) {
            const sName = data.supplierName.trim();
            const matchedSupplier = parties.find((p)=>(p.type === 'supplier' || p.type === 'both') && (p.name.toLowerCase() === sName.toLowerCase() || p.name.toLowerCase().includes(sName.toLowerCase())));
            if (matchedSupplier) {
                setSupplierId(matchedSupplier.id);
                console.log('[AI] Matched existing supplier:', matchedSupplier.name);
            } else {
                // Automatically add new supplier with full details from scanned data
                const newS = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"].getState().addParty({
                    companyId: companyId,
                    type: 'supplier',
                    name: sName,
                    phone: data.supplierPhone || '',
                    address: data.supplierAddress || '',
                    gstNumber: data.supplierGst || '',
                    openingBalance: 0,
                    balance: 0
                });
                setSupplierId(newS.id);
                console.log('[AI] Created new supplier:', sName);
            }
        }
        // 2. METADATA (Date and Bill Number)
        if (data.billDate) {
            const d = new Date(data.billDate);
            if (!isNaN(d.getTime())) setDate(data.billDate);
        }
        if (data.billNumber) setSupplierInvoiceNo(String(data.billNumber));
        // 3. ITEM MAPPING
        const rawItems = data.items && Array.isArray(data.items) ? data.items : [];
        if (rawItems.length > 0) {
            const mappedItems = rawItems.map((it)=>{
                const itName = (it.name || it.item || it.product || '').trim();
                // Try to match to an existing product
                const matchedProd = products.find((p)=>p.name.toLowerCase() === itName.toLowerCase() || p.name.toLowerCase().includes(itName.toLowerCase()) || itName.toLowerCase().includes(p.name.toLowerCase()));
                const parseAIPrice = (val)=>{
                    if (val === undefined || val === null) return 0;
                    // Fix: Handle currency symbols, commas, and common OCR noise
                    const s = String(val).replace(/[₹$,\s]/g, '').replace(/[^0-9.]/g, '');
                    return parseFloat(s) || 0;
                };
                const price = parseAIPrice(it.price ?? it.rate ?? it.unitPrice);
                const qty = parseAIPrice(it.qty ?? it.quantity ?? 1) || 1;
                const amount = parseAIPrice(it.amount) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["r2"])(qty * price);
                return {
                    productId: matchedProd?.id || '',
                    name: matchedProd?.name || itName || 'Unknown Item',
                    qty,
                    purchasePrice: price || (qty > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["r2"])(amount / qty) : 0),
                    amount: amount || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["r2"])(qty * price)
                };
            });
            setItems(mappedItems);
            const supplierLabel = data.supplierName || 'invoice';
            const totalLabel = data.totalAmount ? ' | Total: Rs.' + data.totalAmount : '';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success(`Extracted ${mappedItems.length} items from ${supplierLabel}${totalLabel}`, {
                duration: 5000
            });
        } else {
            setItems([
                {
                    ...emptyRow
                }
            ]);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('AI extracted supplier info but line items were unclear. Please add them manually.', {
                icon: 'ℹ️'
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'flex',
            flexDirection: 'column',
            gap: 20
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: 14
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card",
                        style: {
                            padding: '18px 20px',
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
                                    background: '#FEEBC8',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                    size: 20,
                                    color: "#DD6B20"
                                }, void 0, false, {
                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                    lineNumber: 310,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                lineNumber: 309,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 10,
                                            fontWeight: 700,
                                            color: '#A0AEC0',
                                            textTransform: 'uppercase',
                                            marginBottom: 4
                                        },
                                        children: "Total Bills"
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                        lineNumber: 313,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 20,
                                            fontWeight: 900,
                                            color: '#1A1A2E'
                                        },
                                        children: purchaseBills.length
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                        lineNumber: 314,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                lineNumber: 312,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                        lineNumber: 308,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card",
                        style: {
                            padding: '18px 20px',
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
                                    background: '#EBF8FF',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                                    size: 20,
                                    color: "#3182CE"
                                }, void 0, false, {
                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                    lineNumber: 319,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                lineNumber: 318,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 10,
                                            fontWeight: 700,
                                            color: '#A0AEC0',
                                            textTransform: 'uppercase',
                                            marginBottom: 4
                                        },
                                        children: "Suppliers"
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                        lineNumber: 322,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 20,
                                            fontWeight: 900,
                                            color: '#1A1A2E'
                                        },
                                        children: suppliers.length
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                        lineNumber: 323,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                lineNumber: 321,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                        lineNumber: 317,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                lineNumber: 307,
                columnNumber: 13
            }, this),
            recurringModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "modal-overlay",
                onClick: ()=>setRecurringModalOpen(false),
                style: {
                    zIndex: 1000
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modal-box",
                    onClick: (e)=>e.stopPropagation(),
                    style: {
                        maxWidth: 600
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
                                    children: "Past Purchase Bills"
                                }, void 0, false, {
                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                    lineNumber: 333,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setRecurringModalOpen(false),
                                    className: "btn btn-ghost btn-icon",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                        lineNumber: 334,
                                        columnNumber: 117
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                    lineNumber: 334,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                            lineNumber: 332,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '20px 24px',
                                overflowY: 'auto',
                                maxHeight: '60vh'
                            },
                            children: purchaseBills.filter((b)=>b.partyId === supplierId).length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: '#718096',
                                    textAlign: 'center',
                                    padding: '20px 0'
                                },
                                children: "No past bills found for this supplier."
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                lineNumber: 338,
                                columnNumber: 33
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 12
                                },
                                children: purchaseBills.filter((b)=>b.partyId === supplierId).map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            border: '1px solid #E2E8F0',
                                            borderRadius: 8,
                                            padding: 16,
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontWeight: 800,
                                                            color: '#1A1A2E'
                                                        },
                                                        children: [
                                                            b.date,
                                                            " • ",
                                                            b.invoiceNumber
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                        lineNumber: 344,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 12,
                                                            color: '#718096',
                                                            marginTop: 4
                                                        },
                                                        children: b.items?.map((i)=>`${i.qty}x ${i.name}`).join(', ')
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                        lineNumber: 345,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontWeight: 800,
                                                            color: '#38A169',
                                                            marginTop: 4
                                                        },
                                                        children: [
                                                            "₹",
                                                            b.grandTotal
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                        lineNumber: 348,
                                                        columnNumber: 49
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                lineNumber: 343,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    const newItems = b.items?.map((i)=>({
                                                            productId: i.productId || '',
                                                            name: i.name || '',
                                                            qty: i.qty || 1,
                                                            purchasePrice: i.rate || i.purchasePrice || 0,
                                                            amount: i.amount || 0
                                                        })) || [
                                                        {
                                                            ...emptyRow
                                                        }
                                                    ];
                                                    setItems(newItems);
                                                    setRecurringModalOpen(false);
                                                },
                                                className: "btn btn-outline btn-sm",
                                                children: "Load Items"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                lineNumber: 350,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, b.id, true, {
                                        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                        lineNumber: 342,
                                        columnNumber: 41
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                lineNumber: 340,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                            lineNumber: 336,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                    lineNumber: 331,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                lineNumber: 330,
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
                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                lineNumber: 375,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "e-input",
                                placeholder: "Search supplier or bill no…",
                                value: search,
                                onChange: (e)=>setSearch(e.target.value),
                                style: {
                                    paddingLeft: 34
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                lineNumber: 376,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                        lineNumber: 374,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowAdd(true),
                        className: "btn btn-blue btn-sm",
                        style: {
                            gap: 5
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                size: 13
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                lineNumber: 379,
                                columnNumber: 21
                            }, this),
                            " Add Purchase Bill"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                        lineNumber: 378,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                lineNumber: 373,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card",
                style: {
                    overflow: 'hidden'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        overflowX: 'auto'
                    },
                    children: filtered.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: 'center',
                            padding: '56px 20px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                size: 44,
                                style: {
                                    color: '#E1E4E8',
                                    margin: '0 auto 12px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                lineNumber: 388,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: '#A0AEC0',
                                    fontWeight: 600,
                                    fontSize: 14
                                },
                                children: "No purchase bills yet"
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                lineNumber: 389,
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
                                        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                        lineNumber: 391,
                                        columnNumber: 33
                                    }, this),
                                    " Add First Bill"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                lineNumber: 390,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                        lineNumber: 387,
                        columnNumber: 25
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "e-table",
                        style: {
                            width: '100%',
                            minWidth: 600
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            children: "Date"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                            lineNumber: 398,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            children: "Bill No"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                            lineNumber: 399,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            children: "Supplier"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                            lineNumber: 400,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            children: "Items"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                            lineNumber: 401,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            style: {
                                                textAlign: 'right'
                                            },
                                            children: "Total Amount"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                            lineNumber: 402,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            children: "Payment Status"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                            lineNumber: 403,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            children: "Balance Due"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                            lineNumber: 404,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            style: {
                                                width: 100
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                            lineNumber: 405,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                    lineNumber: 397,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                lineNumber: 396,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: filtered.map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    fontSize: 13,
                                                    color: '#4A5568'
                                                },
                                                children: b.date
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                lineNumber: 411,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    fontWeight: 700
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 6
                                                    },
                                                    children: [
                                                        b.invoiceNumber,
                                                        b.receiptUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: b.receiptUrl,
                                                            download: `attached_bill_${b.invoiceNumber}`,
                                                            target: "_blank",
                                                            rel: "noreferrer",
                                                            title: "View Supplier Bill Attachment",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paperclip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paperclip$3e$__["Paperclip"], {
                                                                size: 12,
                                                                color: "#4285F4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                                lineNumber: 417,
                                                                columnNumber: 57
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                            lineNumber: 416,
                                                            columnNumber: 53
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                    lineNumber: 413,
                                                    columnNumber: 45
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                lineNumber: 412,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    fontWeight: 600,
                                                    color: '#2D3748'
                                                },
                                                children: b.partyName
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                lineNumber: 422,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    fontSize: 12,
                                                    color: '#718096'
                                                },
                                                children: b.items?.map((i)=>i.name).join(', ')
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                lineNumber: 423,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    textAlign: 'right',
                                                    fontWeight: 800,
                                                    color: '#38A169'
                                                },
                                                children: [
                                                    "₹",
                                                    b.grandTotal.toLocaleString('en-IN')
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                lineNumber: 424,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `badge ${b.paymentStatus === 'paid' ? 'badge-green' : b.paymentStatus === 'partial' ? 'badge-yellow' : 'badge-red'}`,
                                                    children: b.paymentStatus || 'paid'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                    lineNumber: 426,
                                                    columnNumber: 45
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                lineNumber: 425,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    fontWeight: 700,
                                                    color: b.balanceDue > 0 ? '#EA4335' : '#718096'
                                                },
                                                children: b.balanceDue > 0 ? `₹${b.balanceDue.toLocaleString('en-IN')}` : '—'
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                lineNumber: 430,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    textAlign: 'right'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        gap: 4,
                                                        justifyContent: 'flex-end'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: `/company/billing/invoice?id=${b.id}`,
                                                            className: "btn btn-ghost btn-icon",
                                                            style: {
                                                                padding: 6
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                                size: 14,
                                                                color: "#4285F4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                                lineNumber: 436,
                                                                columnNumber: 53
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                            lineNumber: 435,
                                                            columnNumber: 49
                                                        }, this),
                                                        b.receiptUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: b.receiptUrl,
                                                            download: `attached_bill_${b.invoiceNumber}`,
                                                            target: "_blank",
                                                            rel: "noreferrer",
                                                            title: "View Attachment",
                                                            className: "btn btn-ghost btn-icon",
                                                            style: {
                                                                padding: 6
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paperclip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paperclip$3e$__["Paperclip"], {
                                                                size: 14,
                                                                color: "#4285F4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                                lineNumber: 440,
                                                                columnNumber: 57
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                            lineNumber: 439,
                                                            columnNumber: 53
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleDuplicate(b),
                                                            title: "Duplicate / Recurring",
                                                            className: "btn btn-ghost btn-icon",
                                                            style: {
                                                                padding: 6
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$repeat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Repeat$3e$__["Repeat"], {
                                                                size: 14,
                                                                color: "#34A853"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                                lineNumber: 444,
                                                                columnNumber: 53
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                            lineNumber: 443,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                    lineNumber: 434,
                                                    columnNumber: 45
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                lineNumber: 433,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, b.id, true, {
                                        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                        lineNumber: 410,
                                        columnNumber: 37
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                lineNumber: 408,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                        lineNumber: 395,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                    lineNumber: 385,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                lineNumber: 384,
                columnNumber: 13
            }, this),
            showAdd && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "modal-overlay",
                onClick: closeAddModal,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modal-box",
                    onClick: (e)=>e.stopPropagation(),
                    style: {
                        maxWidth: 800,
                        maxHeight: '90vh',
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
                                justifyContent: 'space-between',
                                background: '#F8FAFC'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 12
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            style: {
                                                fontWeight: 900,
                                                fontSize: 17,
                                                color: '#1A1A2E'
                                            },
                                            children: "Add Purchase Bill"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                            lineNumber: 462,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FeatureGate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canAccess"])('ai_scanner', user, isDemo)) {
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('AI Scanning requires the Premium Plan. Upgrade in Subscription settings.', {
                                                        icon: '🔒'
                                                    });
                                                    return;
                                                }
                                                setShowAIScan(true);
                                            },
                                            className: "btn btn-sm",
                                            style: {
                                                background: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FeatureGate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canAccess"])('ai_scanner', user, isDemo) ? 'linear-gradient(135deg, #1A1A2E, #4285F4)' : '#E2E8F0',
                                                color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FeatureGate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canAccess"])('ai_scanner', user, isDemo) ? 'white' : '#A0AEC0',
                                                border: 'none',
                                                gap: 6,
                                                cursor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FeatureGate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canAccess"])('ai_scanner', user, isDemo) ? 'pointer' : 'not-allowed'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScanLine$3e$__["ScanLine"], {
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                    lineNumber: 470,
                                                    columnNumber: 37
                                                }, this),
                                                " AI Scan Invoice ",
                                                !(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FeatureGate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canAccess"])('ai_scanner', user, isDemo) && '🔒'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                            lineNumber: 463,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                    lineNumber: 461,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: closeAddModal,
                                    className: "btn btn-ghost btn-icon",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                        lineNumber: 473,
                                        columnNumber: 96
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                    lineNumber: 473,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                            lineNumber: 460,
                            columnNumber: 25
                        }, this),
                        showAIScan && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'absolute',
                                inset: 0,
                                zIndex: 100
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AIAddItemModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                type: "purchase",
                                onClose: ()=>setShowAIScan(false),
                                onPurchaseScanned: handlePurchaseScanned
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                lineNumber: 478,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                            lineNumber: 477,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                overflowY: 'auto',
                                flex: 1,
                                padding: '18px 24px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 20
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                        gap: 16
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        gap: 10
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
                                                            children: "Supplier"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                            lineNumber: 486,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                gap: 8
                                                            },
                                                            children: supplierId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>{
                                                                            const s = parties.find((p)=>p.id === supplierId);
                                                                            if (s?.assignedProductIds?.length) {
                                                                                const ap = products.filter((p)=>s.assignedProductIds?.includes(p.id));
                                                                                const newItems = ap.map((p)=>({
                                                                                        productId: p.id,
                                                                                        name: p.name,
                                                                                        qty: 1,
                                                                                        purchasePrice: p.purchasePrice || 0,
                                                                                        amount: p.purchasePrice || 0
                                                                                    }));
                                                                                setItems((prev)=>{
                                                                                    const existing = prev.filter((it)=>it.productId || it.name);
                                                                                    return [
                                                                                        ...existing,
                                                                                        ...newItems
                                                                                    ];
                                                                                });
                                                                            } else {
                                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('No products assigned yet. They link automatically on save.', {
                                                                                    icon: 'ℹ️'
                                                                                });
                                                                            }
                                                                        },
                                                                        style: {
                                                                            fontSize: 10,
                                                                            fontWeight: 700,
                                                                            color: '#16A34A',
                                                                            background: 'none',
                                                                            border: 'none',
                                                                            cursor: 'pointer',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            gap: 4
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                                                size: 12
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                                                lineNumber: 512,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            " Load Items"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                                        lineNumber: 490,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>setRecurringModalOpen(true),
                                                                        style: {
                                                                            fontSize: 10,
                                                                            fontWeight: 700,
                                                                            color: '#4285F4',
                                                                            background: 'none',
                                                                            border: 'none',
                                                                            cursor: 'pointer',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            gap: 4
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$repeat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Repeat$3e$__["Repeat"], {
                                                                                size: 12
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                                                lineNumber: 518,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            " Past Bills"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                                        lineNumber: 514,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                            lineNumber: 487,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                    lineNumber: 485,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: "e-select",
                                                    value: supplierId,
                                                    onChange: (e)=>setSupplierId(e.target.value),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "Walk-in Supplier"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                            lineNumber: 525,
                                                            columnNumber: 41
                                                        }, this),
                                                        suppliers.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: s.id,
                                                                children: s.name
                                                            }, s.id, false, {
                                                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                                lineNumber: 526,
                                                                columnNumber: 61
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                    lineNumber: 524,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                            lineNumber: 484,
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
                                                    children: "Supplier Bill No (Optional)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                    lineNumber: 530,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: "e-input",
                                                    value: supplierInvoiceNo,
                                                    onChange: (e)=>setSupplierInvoiceNo(e.target.value),
                                                    onBlur: (e)=>{
                                                        const val = e.target.value;
                                                        if (!val) return;
                                                        const existing = purchaseBills.find((b)=>b.invoiceNumber === val && b.partyId === supplierId);
                                                        if (existing) {
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["confirm"])({
                                                                message: `A bill with number "${val}" already exists. Load its items for recurring entry?`,
                                                                danger: false
                                                            }).then((yes)=>{
                                                                if (yes) handleDuplicate(existing);
                                                            });
                                                        }
                                                    },
                                                    placeholder: "e.g. INV-202"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                    lineNumber: 531,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                            lineNumber: 529,
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
                                                    children: "Date"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                    lineNumber: 549,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "date",
                                                    className: "e-input",
                                                    value: date,
                                                    onChange: (e)=>setDate(e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                    lineNumber: 550,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                            lineNumber: 548,
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
                                                    children: "Amount Paid (₹)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                    lineNumber: 553,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    min: "0",
                                                    className: "e-input",
                                                    value: amountPaidInput,
                                                    onChange: (e)=>setAmountPaidInput(e.target.value),
                                                    placeholder: `Full: ₹${totalAmount}`
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                    lineNumber: 554,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                            lineNumber: 552,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                    lineNumber: 483,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        overflowX: 'auto',
                                        border: '1px solid #E2E8F0',
                                        borderRadius: 8
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        style: {
                                            width: '100%',
                                            minWidth: 600,
                                            borderCollapse: 'collapse',
                                            tableLayout: 'fixed'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("colgroup", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("col", {}, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                        lineNumber: 561,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("col", {
                                                        style: {
                                                            width: 90
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                        lineNumber: 562,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("col", {
                                                        style: {
                                                            width: 130
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                        lineNumber: 563,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("col", {
                                                        style: {
                                                            width: 100
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                        lineNumber: 564,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("col", {
                                                        style: {
                                                            width: 36
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                        lineNumber: 565,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                lineNumber: 560,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    style: {
                                                        background: '#F7FAFC',
                                                        borderBottom: '1.5px solid #E2E8F0'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            style: {
                                                                padding: '10px 14px',
                                                                textAlign: 'left',
                                                                fontSize: 11,
                                                                fontWeight: 700,
                                                                color: '#718096',
                                                                textTransform: 'uppercase',
                                                                letterSpacing: '0.05em'
                                                            },
                                                            children: "Item / Product"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                            lineNumber: 569,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            style: {
                                                                padding: '10px 14px',
                                                                textAlign: 'left',
                                                                fontSize: 11,
                                                                fontWeight: 700,
                                                                color: '#718096',
                                                                textTransform: 'uppercase',
                                                                letterSpacing: '0.05em'
                                                            },
                                                            children: "Qty"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                            lineNumber: 570,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            style: {
                                                                padding: '10px 14px',
                                                                textAlign: 'left',
                                                                fontSize: 11,
                                                                fontWeight: 700,
                                                                color: '#718096',
                                                                textTransform: 'uppercase',
                                                                letterSpacing: '0.05em'
                                                            },
                                                            children: "Price (₹)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                            lineNumber: 571,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            style: {
                                                                padding: '10px 14px',
                                                                textAlign: 'left',
                                                                fontSize: 11,
                                                                fontWeight: 700,
                                                                color: '#718096',
                                                                textTransform: 'uppercase',
                                                                letterSpacing: '0.05em'
                                                            },
                                                            children: "Amount"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                            lineNumber: 572,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            style: {
                                                                width: 36
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                            lineNumber: 573,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                    lineNumber: 568,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                lineNumber: 567,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                children: items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        style: {
                                                            borderBottom: '1px solid #F1F3F5'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    padding: '8px 14px',
                                                                    verticalAlign: 'middle'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                        className: "e-select",
                                                                        style: {
                                                                            padding: '6px'
                                                                        },
                                                                        value: item.productId,
                                                                        onChange: (e)=>updateItem(i, 'productId', e.target.value),
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "",
                                                                                children: "-- Select/Link Product --"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                                                lineNumber: 581,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            products.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: p.id,
                                                                                    children: [
                                                                                        p.name,
                                                                                        " (Stock: ",
                                                                                        p.stockQty,
                                                                                        ")"
                                                                                    ]
                                                                                }, p.id, true, {
                                                                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                                                    lineNumber: 582,
                                                                                    columnNumber: 83
                                                                                }, this))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                                        lineNumber: 580,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    !item.productId && item.name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        className: "e-input",
                                                                        style: {
                                                                            padding: '4px 6px',
                                                                            marginTop: 4,
                                                                            fontSize: 11,
                                                                            color: '#1D4ED8',
                                                                            background: '#EFF6FF',
                                                                            border: '1px solid #BFDBFE',
                                                                            borderRadius: 4
                                                                        },
                                                                        value: item.name,
                                                                        placeholder: "Item name from scanned bill",
                                                                        onChange: (e)=>setItems((prev)=>prev.map((it, idx)=>idx === i ? {
                                                                                        ...it,
                                                                                        name: e.target.value
                                                                                    } : it))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                                        lineNumber: 585,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                                lineNumber: 579,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    padding: '8px 14px',
                                                                    verticalAlign: 'middle'
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "number",
                                                                    className: "e-input",
                                                                    style: {
                                                                        padding: '6px'
                                                                    },
                                                                    value: item.qty,
                                                                    onChange: (e)=>updateItem(i, 'qty', e.target.value),
                                                                    min: "1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                                    lineNumber: 595,
                                                                    columnNumber: 53
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                                lineNumber: 594,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    padding: '8px 14px',
                                                                    verticalAlign: 'middle'
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "number",
                                                                    className: "e-input",
                                                                    style: {
                                                                        padding: '6px'
                                                                    },
                                                                    value: item.purchasePrice,
                                                                    onChange: (e)=>updateItem(i, 'purchasePrice', e.target.value),
                                                                    min: "0"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                                    lineNumber: 598,
                                                                    columnNumber: 53
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                                lineNumber: 597,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    padding: '8px 14px',
                                                                    fontWeight: 800,
                                                                    color: '#2D3748',
                                                                    verticalAlign: 'middle'
                                                                },
                                                                children: (parseFloat(item.amount) || 0).toFixed(2)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                                lineNumber: 600,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    padding: '8px 4px',
                                                                    verticalAlign: 'middle'
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>removeRow(i),
                                                                    style: {
                                                                        background: 'none',
                                                                        border: 'none',
                                                                        color: '#E53E3E',
                                                                        cursor: 'pointer',
                                                                        padding: 4
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                        size: 14
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                                        lineNumber: 604,
                                                                        columnNumber: 186
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                                    lineNumber: 604,
                                                                    columnNumber: 53
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                                lineNumber: 603,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                        lineNumber: 578,
                                                        columnNumber: 45
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                lineNumber: 576,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tfoot", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    style: {
                                                        background: '#FAFAFA'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        colSpan: 5,
                                                        style: {
                                                            padding: '10px 14px',
                                                            borderTop: '1px solid #E2E8F0'
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: addRow,
                                                                    className: "btn btn-outline btn-sm",
                                                                    children: "+ Add Row"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                                    lineNumber: 613,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontSize: 11,
                                                                        color: '#A0AEC0'
                                                                    },
                                                                    children: [
                                                                        items.length,
                                                                        " item",
                                                                        items.length !== 1 ? 's' : ''
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                                    lineNumber: 614,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                            lineNumber: 612,
                                                            columnNumber: 49
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                        lineNumber: 611,
                                                        columnNumber: 45
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                    lineNumber: 610,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                lineNumber: 609,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                        lineNumber: 559,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                    lineNumber: 558,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginTop: 14,
                                        flexWrap: 'wrap',
                                        gap: 14
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                minWidth: 280,
                                                maxWidth: 400,
                                                flex: 1
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
                                                    children: "Bill Attachment (Photo/PDF)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                    lineNumber: 624,
                                                    columnNumber: 37
                                                }, this),
                                                receiptUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 10,
                                                        padding: '8px 12px',
                                                        background: '#F8FAFC',
                                                        borderRadius: 8,
                                                        border: '1px dashed #CBD5E0'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paperclip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paperclip$3e$__["Paperclip"], {
                                                            size: 16,
                                                            color: "#4285F4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                            lineNumber: 627,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: 11,
                                                                fontWeight: 700,
                                                                color: '#2D3748',
                                                                flex: 1,
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                whiteSpace: 'nowrap'
                                                            },
                                                            children: receiptUrl.startsWith('data:application/pdf') ? 'Attached PDF Document' : 'Attached Photo Document'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                            lineNumber: 628,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setReceiptUrl(''),
                                                            style: {
                                                                background: 'none',
                                                                border: 'none',
                                                                color: '#E53E3E',
                                                                cursor: 'pointer',
                                                                padding: 4
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                size: 14
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                                lineNumber: 631,
                                                                columnNumber: 183
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                            lineNumber: 631,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                    lineNumber: 626,
                                                    columnNumber: 41
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "file",
                                                    accept: "image/*,application/pdf",
                                                    className: "e-input",
                                                    onChange: (e)=>{
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            const reader = new FileReader();
                                                            reader.onload = (ev)=>setReceiptUrl(ev.target?.result);
                                                            reader.readAsDataURL(file);
                                                        }
                                                    },
                                                    style: {
                                                        fontSize: 11,
                                                        padding: '6px 8px'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                    lineNumber: 634,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                            lineNumber: 623,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                textAlign: 'right',
                                                fontSize: 18,
                                                fontWeight: 900
                                            },
                                            children: [
                                                "Grand Total: ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: '#38A169'
                                                    },
                                                    children: [
                                                        "₹",
                                                        totalAmount.toLocaleString('en-IN', {
                                                            minimumFractionDigits: 2
                                                        })
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                                    lineNumber: 645,
                                                    columnNumber: 50
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                            lineNumber: 644,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                    lineNumber: 622,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                            lineNumber: 482,
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
                                    onClick: closeAddModal,
                                    className: "btn btn-outline",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                    lineNumber: 651,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleSave,
                                    className: "btn btn-blue",
                                    style: {
                                        display: 'flex',
                                        gap: 6
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                            lineNumber: 652,
                                            columnNumber: 119
                                        }, this),
                                        " Save & Update Stocks"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                                    lineNumber: 652,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                            lineNumber: 650,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                    lineNumber: 459,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
                lineNumber: 458,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/company/inventory/PurchaseBillsTab.tsx",
        lineNumber: 305,
        columnNumber: 9
    }, this);
}
_s(PurchaseBillsTab, "7z4ygVcMGTah5K33/pvoshpZAGc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActiveCompany"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"]
    ];
});
_c = PurchaseBillsTab;
var _c;
__turbopack_context__.k.register(_c, "PurchaseBillsTab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/company/inventory/StockLedgerTab.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StockLedgerTab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-arrow-up.js [app-client] (ecmascript) <export default as ArrowUpCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-arrow-down.js [app-client] (ecmascript) <export default as ArrowDownCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/history.js [app-client] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pen.js [app-client] (ecmascript) <export default as Edit2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-arrow-right.js [app-client] (ecmascript) <export default as ArrowRightCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function StockLedgerTab() {
    _s();
    const products = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"])('products');
    const invoices = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"])('invoices');
    const { adjustStock } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const [selectedProductId, setSelectedProductId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showHistory, setShowHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Filter products for dropdown
    const filteredProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StockLedgerTab.useMemo[filteredProducts]": ()=>{
            const lowerSearch = searchTerm.toLowerCase();
            if (!searchTerm) return products.slice(0, 5);
            return products.filter({
                "StockLedgerTab.useMemo[filteredProducts]": (p)=>p.name.toLowerCase().includes(lowerSearch) || p.barcode && p.barcode.includes(searchTerm) || p.category && p.category.toLowerCase().includes(lowerSearch)
            }["StockLedgerTab.useMemo[filteredProducts]"]).slice(0, 10);
        }
    }["StockLedgerTab.useMemo[filteredProducts]"], [
        products,
        searchTerm
    ]);
    const activeProduct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StockLedgerTab.useMemo[activeProduct]": ()=>products.find({
                "StockLedgerTab.useMemo[activeProduct]": (p)=>p.id === selectedProductId
            }["StockLedgerTab.useMemo[activeProduct]"])
    }["StockLedgerTab.useMemo[activeProduct]"], [
        products,
        selectedProductId
    ]);
    // Generate Ledger Entries with Running Balance
    const ledgerData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StockLedgerTab.useMemo[ledgerData]": ()=>{
            if (!selectedProductId || !activeProduct) return {
                entries: [],
                stats: null
            };
            let rawEntries = [];
            // 1. Process All Invoices (filtered for actual stock moves)
            invoices.forEach({
                "StockLedgerTab.useMemo[ledgerData]": (inv)=>{
                    if (inv.isHidden) return; // Fix: Ignore hidden bills
                    const isPurchase = inv.invoiceType === 'purchase';
                    const isSale = inv.invoiceType === 'sale';
                    // Fix: Only count actual sales and purchases in the ledger
                    if (!isPurchase && !isSale) return;
                    inv.items.forEach({
                        "StockLedgerTab.useMemo[ledgerData]": (item)=>{
                            if (item.productId === selectedProductId || item.name === activeProduct.name && !item.productId) {
                                rawEntries.push({
                                    id: inv.id,
                                    timestamp: new Date(inv.date + ' ' + (inv.time || '00:00')).getTime(),
                                    date: inv.date,
                                    type: isPurchase ? 'IN' : 'OUT',
                                    source: inv.partyName || (isPurchase ? 'Supplier' : 'Walk-in Customer'),
                                    ref: inv.invoiceNumber || (isPurchase ? 'PUR-' : 'INV-') + inv.id.slice(-4),
                                    qty: item.qty,
                                    price: isPurchase ? item.purchasePrice || item.rate : item.rate,
                                    mfgDate: item.mfgDate,
                                    total: item.amount
                                });
                            }
                        }
                    }["StockLedgerTab.useMemo[ledgerData]"]);
                }
            }["StockLedgerTab.useMemo[ledgerData]"]);
            // 2. Sort by date ASC to calculate running balance
            rawEntries.sort({
                "StockLedgerTab.useMemo[ledgerData]": (a, b)=>a.timestamp - b.timestamp
            }["StockLedgerTab.useMemo[ledgerData]"]);
            let runningBalance = 0; // Starting from 0 as we don't have "Opening Stock" history yet
            const entriesWithBalance = rawEntries.map({
                "StockLedgerTab.useMemo[ledgerData].entriesWithBalance": (entry)=>{
                    runningBalance += entry.type === 'IN' ? entry.qty : -entry.qty;
                    return {
                        ...entry,
                        balanceAfter: runningBalance
                    };
                }
            }["StockLedgerTab.useMemo[ledgerData].entriesWithBalance"]);
            // 3. Final display sort (DESC)
            const displayEntries = [
                ...entriesWithBalance
            ].sort({
                "StockLedgerTab.useMemo[ledgerData].displayEntries": (a, b)=>b.timestamp - a.timestamp
            }["StockLedgerTab.useMemo[ledgerData].displayEntries"]);
            // Calculate Stats
            const totalIn = rawEntries.filter({
                "StockLedgerTab.useMemo[ledgerData].totalIn": (e)=>e.type === 'IN'
            }["StockLedgerTab.useMemo[ledgerData].totalIn"]).reduce({
                "StockLedgerTab.useMemo[ledgerData].totalIn": (a, b)=>a + b.qty
            }["StockLedgerTab.useMemo[ledgerData].totalIn"], 0);
            const totalOut = rawEntries.filter({
                "StockLedgerTab.useMemo[ledgerData].totalOut": (e)=>e.type === 'OUT'
            }["StockLedgerTab.useMemo[ledgerData].totalOut"]).reduce({
                "StockLedgerTab.useMemo[ledgerData].totalOut": (a, b)=>a + b.qty
            }["StockLedgerTab.useMemo[ledgerData].totalOut"], 0);
            return {
                entries: displayEntries,
                stats: {
                    totalIn,
                    totalOut
                }
            };
        }
    }["StockLedgerTab.useMemo[ledgerData]"], [
        selectedProductId,
        invoices,
        activeProduct
    ]);
    const { entries: ledgerEntries, stats } = ledgerData;
    // Ageing Alert Logic
    const ageingInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StockLedgerTab.useMemo[ageingInfo]": ()=>{
            if (!ledgerEntries.length || !activeProduct) return null;
            const lastIn = ledgerEntries.find({
                "StockLedgerTab.useMemo[ageingInfo].lastIn": (e)=>e.type === 'IN'
            }["StockLedgerTab.useMemo[ageingInfo].lastIn"]);
            if (!lastIn) return null;
            const lastInDate = new Date(lastIn.date);
            const today = new Date();
            const diffTime = Math.abs(today.getTime() - lastInDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            let status = 'Fresh';
            let color = '#34A853';
            let bg = '#F0FFF4';
            if (diffDays > 180) {
                status = 'Critically Old';
                color = '#EA4335';
                bg = '#FFF5F5';
            } else if (diffDays > 90) {
                status = 'Stagnant';
                color = '#FBBC04';
                bg = '#FFFBEB';
            } else if (diffDays > 30) {
                status = 'Ageing';
                color = '#4285F4';
                bg = '#F0F7FF';
            }
            return {
                days: diffDays,
                status,
                color,
                bg
            };
        }
    }["StockLedgerTab.useMemo[ageingInfo]"], [
        ledgerEntries,
        activeProduct
    ]);
    const handleMfgUpdate = (entryDate, currentMfg)=>{
        const newDate = prompt("Update Manufacturing Date (YYYY-MM-DD):", currentMfg || "");
        if (newDate && activeProduct) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success("Feature: Manufacturing Date logged for this batch.");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'flex',
            flexDirection: 'column',
            gap: 20
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card",
                style: {
                    padding: '24px 30px',
                    background: 'linear-gradient(135deg, #1E293B, #0F172A)',
                    color: 'white',
                    borderRadius: 20,
                    boxShadow: '0 10px 30px rgba(15,23,42,0.15)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 20
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 16
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: 48,
                                        height: 48,
                                        borderRadius: 16,
                                        background: 'rgba(255,255,255,0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
                                        size: 24,
                                        color: "#4285F4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                        lineNumber: 142,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                    lineNumber: 141,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            style: {
                                                fontSize: 22,
                                                fontWeight: 900,
                                                marginBottom: 2
                                            },
                                            children: "Stock Movement Ledger"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                            lineNumber: 145,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 13,
                                                opacity: 0.6,
                                                fontWeight: 500
                                            },
                                            children: "Lifecycle tracking, ageing alerts & inventory integrity"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                            lineNumber: 146,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                    lineNumber: 144,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                            lineNumber: 140,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'relative',
                                width: '100%',
                                maxWidth: 450
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                    size: 18,
                                    style: {
                                        position: 'absolute',
                                        left: 16,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#94A3B8'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                    lineNumber: 150,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "e-input",
                                    style: {
                                        paddingLeft: 46,
                                        background: 'rgba(255,255,255,0.07)',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        color: 'white',
                                        borderRadius: 14,
                                        height: 48,
                                        fontSize: 15
                                    },
                                    placeholder: "Search by Product Name, Barcode or Category...",
                                    value: searchTerm,
                                    onChange: (e)=>setSearchTerm(e.target.value)
                                }, void 0, false, {
                                    fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                    lineNumber: 151,
                                    columnNumber: 25
                                }, this),
                                searchTerm && filteredProducts.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        position: 'absolute',
                                        top: '100%',
                                        left: 0,
                                        right: 0,
                                        background: 'white',
                                        borderRadius: 16,
                                        marginTop: 10,
                                        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                                        zIndex: 100,
                                        overflow: 'hidden'
                                    },
                                    children: filteredProducts.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onClick: ()=>{
                                                setSelectedProductId(p.id);
                                                setSearchTerm('');
                                            },
                                            style: {
                                                padding: '14px 20px',
                                                cursor: 'pointer',
                                                color: '#1E293B',
                                                borderBottom: '1px solid #F1F5F9',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 12,
                                                transition: 'background 0.2s'
                                            },
                                            onMouseEnter: (e)=>e.currentTarget.style.background = '#F8FAFC',
                                            onMouseLeave: (e)=>e.currentTarget.style.background = 'white',
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        width: 32,
                                                        height: 32,
                                                        borderRadius: 8,
                                                        background: '#F1F5F9',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontWeight: 800,
                                                        color: '#475569',
                                                        fontSize: 12
                                                    },
                                                    children: p.name[0]
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                    lineNumber: 176,
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
                                                                fontSize: 14
                                                            },
                                                            children: p.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                            lineNumber: 178,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            style: {
                                                                fontSize: 11,
                                                                color: '#64748B'
                                                            },
                                                            children: p.category || 'Uncategorized'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                            lineNumber: 179,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                    lineNumber: 177,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        background: '#E2E8F0',
                                                        padding: '2px 8px',
                                                        borderRadius: 6,
                                                        fontSize: 11,
                                                        fontWeight: 700,
                                                        color: '#475569'
                                                    },
                                                    children: [
                                                        "Qty: ",
                                                        p.stockQty
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                    lineNumber: 181,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, p.id, true, {
                                            fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                            lineNumber: 169,
                                            columnNumber: 37
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                    lineNumber: 167,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                            lineNumber: 149,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                    lineNumber: 139,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                lineNumber: 138,
                columnNumber: 13
            }, this),
            !selectedProductId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: 'center',
                    padding: '120px 20px',
                    background: '#FFFFFF',
                    borderRadius: 24,
                    border: '2px dashed #E2E8F0',
                    marginTop: 10
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: 80,
                            height: 80,
                            borderRadius: 40,
                            background: '#F8FAFC',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 20px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightCircle$3e$__["ArrowRightCircle"], {
                            size: 32,
                            color: "#CBD5E0"
                        }, void 0, false, {
                            fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                            lineNumber: 193,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                        lineNumber: 192,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        style: {
                            color: '#1E293B',
                            fontWeight: 800,
                            fontSize: 18,
                            marginBottom: 8
                        },
                        children: "Ready to audit your stock?"
                    }, void 0, false, {
                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                        lineNumber: 195,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: '#64748B',
                            fontSize: 14,
                            maxWidth: 400,
                            margin: '0 auto'
                        },
                        children: "Select a product from the search bar above to generate a complete movement ledger and check ageing status."
                    }, void 0, false, {
                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                        lineNumber: 196,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                lineNumber: 191,
                columnNumber: 17
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: 16
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card",
                                style: {
                                    padding: 24,
                                    borderRadius: 20
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
                                                    borderRadius: 14,
                                                    background: '#E0F2FE',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                    size: 22,
                                                    color: "#0EA5E9"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                    lineNumber: 205,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                lineNumber: 204,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        style: {
                                                            fontWeight: 800,
                                                            color: '#1E293B',
                                                            fontSize: 16
                                                        },
                                                        children: activeProduct?.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                        lineNumber: 208,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 12,
                                                            color: '#64748B'
                                                        },
                                                        children: "Current Status"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                        lineNumber: 209,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                lineNumber: 207,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                        lineNumber: 203,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-end'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 11,
                                                            color: '#94A3B8',
                                                            fontWeight: 700,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.05em'
                                                        },
                                                        children: "In Inventory"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                        lineNumber: 214,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 24,
                                                            fontWeight: 900,
                                                            color: (activeProduct?.stockQty || 0) > (activeProduct?.lowStockAlertQty || 0) ? '#10B981' : '#EF4444',
                                                            marginTop: 2
                                                        },
                                                        children: [
                                                            activeProduct?.stockQty,
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: 14,
                                                                    fontWeight: 700
                                                                },
                                                                children: activeProduct?.unit
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                                lineNumber: 216,
                                                                columnNumber: 67
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                        lineNumber: 215,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                lineNumber: 213,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    textAlign: 'right'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 11,
                                                            color: '#94A3B8',
                                                            fontWeight: 700,
                                                            textTransform: 'uppercase'
                                                        },
                                                        children: "HSN Code"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                        lineNumber: 220,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 14,
                                                            fontWeight: 800,
                                                            color: '#334155'
                                                        },
                                                        children: activeProduct?.hsnCode || 'N/A'
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                        lineNumber: 221,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                lineNumber: 219,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                        lineNumber: 212,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                lineNumber: 202,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card",
                                style: {
                                    padding: 24,
                                    borderRadius: 20
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
                                                    borderRadius: 14,
                                                    background: '#F0F9FF',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                    size: 22,
                                                    color: "#0284C7"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                    lineNumber: 229,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                lineNumber: 228,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        style: {
                                                            fontWeight: 800,
                                                            color: '#1E293B',
                                                            fontSize: 16
                                                        },
                                                        children: "In / Out Analysis"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                        lineNumber: 232,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 12,
                                                            color: '#64748B'
                                                        },
                                                        children: "Lifetime movement"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                        lineNumber: 233,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                lineNumber: 231,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                        lineNumber: 227,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr',
                                            gap: 10
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: '#F8FAFC',
                                                    padding: '10px 14px',
                                                    borderRadius: 12
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 10,
                                                            color: '#64748B',
                                                            fontWeight: 800,
                                                            marginBottom: 2
                                                        },
                                                        children: "TOTAL IN"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                        lineNumber: 238,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 16,
                                                            fontWeight: 900,
                                                            color: '#059669'
                                                        },
                                                        children: [
                                                            "+",
                                                            stats?.totalIn || 0
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                        lineNumber: 239,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                lineNumber: 237,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: '#F8FAFC',
                                                    padding: '10px 14px',
                                                    borderRadius: 12
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 10,
                                                            color: '#64748B',
                                                            fontWeight: 800,
                                                            marginBottom: 2
                                                        },
                                                        children: "TOTAL OUT"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                        lineNumber: 242,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 16,
                                                            fontWeight: 900,
                                                            color: '#DC2626'
                                                        },
                                                        children: [
                                                            "-",
                                                            stats?.totalOut || 0
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                        lineNumber: 243,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                lineNumber: 241,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                        lineNumber: 236,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                lineNumber: 226,
                                columnNumber: 25
                            }, this),
                            ageingInfo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card",
                                style: {
                                    padding: 24,
                                    borderRadius: 20,
                                    background: ageingInfo.bg,
                                    border: `1.5px dashed ${ageingInfo.color}40`
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
                                                    borderRadius: 14,
                                                    background: 'white',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                    size: 22,
                                                    color: ageingInfo.color
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                    lineNumber: 252,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                lineNumber: 251,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        style: {
                                                            fontWeight: 800,
                                                            color: '#1E293B',
                                                            fontSize: 16
                                                        },
                                                        children: "Ageing Alert"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                        lineNumber: 255,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 12,
                                                            color: '#64748B'
                                                        },
                                                        children: "Stock holding time"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                        lineNumber: 256,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                lineNumber: 254,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                        lineNumber: 250,
                                        columnNumber: 33
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
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 11,
                                                            color: '#64748B',
                                                            fontWeight: 700,
                                                            textTransform: 'uppercase'
                                                        },
                                                        children: "Status"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                        lineNumber: 261,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 18,
                                                            fontWeight: 900,
                                                            color: ageingInfo.color,
                                                            marginTop: 2
                                                        },
                                                        children: ageingInfo.status
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                        lineNumber: 262,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                lineNumber: 260,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    textAlign: 'right'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 11,
                                                            color: '#64748B',
                                                            fontWeight: 700,
                                                            textTransform: 'uppercase'
                                                        },
                                                        children: "Days Held"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                        lineNumber: 265,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 18,
                                                            fontWeight: 900,
                                                            color: '#1E293B'
                                                        },
                                                        children: [
                                                            ageingInfo.days,
                                                            "d"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                        lineNumber: 266,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                lineNumber: 264,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                        lineNumber: 259,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                lineNumber: 249,
                                columnNumber: 29
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card",
                                style: {
                                    padding: 24,
                                    borderRadius: 20,
                                    background: '#F8FAFC',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 13,
                                        color: '#94A3B8',
                                        fontWeight: 600
                                    },
                                    children: "No purchase history for ageing analysis"
                                }, void 0, false, {
                                    fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                    lineNumber: 272,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                lineNumber: 271,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                        lineNumber: 201,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card",
                        style: {
                            overflow: 'hidden',
                            borderRadius: 24,
                            border: '1px solid #E2E8F0',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: '16px 20px',
                                    borderBottom: showHistory ? '1px solid #F1F5F9' : 'none',
                                    background: 'white',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 10
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
                                                size: 18,
                                                color: "#475569"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                lineNumber: 281,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                style: {
                                                    fontSize: 16,
                                                    fontWeight: 900,
                                                    color: '#1E293B'
                                                },
                                                children: "Transaction History"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                lineNumber: 282,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "badge badge-gray",
                                                style: {
                                                    background: '#F1F5F9',
                                                    color: '#475569',
                                                    padding: '4px 10px',
                                                    fontSize: 11
                                                },
                                                children: [
                                                    ledgerEntries.length,
                                                    " ops"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                lineNumber: 283,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                        lineNumber: 280,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowHistory((v)=>!v),
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 6,
                                            padding: '7px 14px',
                                            borderRadius: 10,
                                            border: '1.5px solid #E2E8F0',
                                            background: showHistory ? '#EBF4FF' : 'white',
                                            color: showHistory ? '#4285F4' : '#718096',
                                            fontSize: 12,
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            transition: 'all 0.18s'
                                        },
                                        children: [
                                            showHistory ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                lineNumber: 298,
                                                columnNumber: 48
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                lineNumber: 298,
                                                columnNumber: 74
                                            }, this),
                                            showHistory ? 'Hide' : 'Show History'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                        lineNumber: 286,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                lineNumber: 279,
                                columnNumber: 25
                            }, this),
                            showHistory && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    overflowX: 'auto'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "e-table",
                                    style: {
                                        border: 'none'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            style: {
                                                background: '#F8FAFC'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        style: {
                                                            padding: '16px 24px'
                                                        },
                                                        children: "Date & Time"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                        lineNumber: 307,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Movement"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                        lineNumber: 308,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Details"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                        lineNumber: 309,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Qty Change"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                        lineNumber: 310,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Closing Stock"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                        lineNumber: 311,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Price (₹)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                        lineNumber: 312,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Mfg Date"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                        lineNumber: 313,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                lineNumber: 306,
                                                columnNumber: 41
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                            lineNumber: 305,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: ledgerEntries.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    colSpan: 7,
                                                    style: {
                                                        textAlign: 'center',
                                                        padding: '60px 20px',
                                                        color: '#94A3B8'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                            size: 32,
                                                            style: {
                                                                margin: '0 auto 10px',
                                                                opacity: 0.5
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                            lineNumber: 320,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            children: "No transactions found for this item."
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                            lineNumber: 321,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                    lineNumber: 319,
                                                    columnNumber: 45
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                lineNumber: 318,
                                                columnNumber: 41
                                            }, this) : ledgerEntries.map((entry, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    style: {
                                                        borderBottom: '1px solid #F1F5F9'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                padding: '16px 24px'
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    gap: 2
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontSize: 13,
                                                                            fontWeight: 700,
                                                                            color: '#1E293B'
                                                                        },
                                                                        children: entry.date
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                                        lineNumber: 329,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontSize: 11,
                                                                            color: '#94A3B8'
                                                                        },
                                                                        children: new Date(entry.timestamp).toLocaleTimeString([], {
                                                                            hour: '2-digit',
                                                                            minute: '2-digit'
                                                                        })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                                        lineNumber: 330,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                                lineNumber: 328,
                                                                columnNumber: 53
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                            lineNumber: 327,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'inline-flex',
                                                                    alignItems: 'center',
                                                                    gap: 6,
                                                                    padding: '4px 10px',
                                                                    borderRadius: 8,
                                                                    fontSize: 11,
                                                                    fontWeight: 900,
                                                                    background: entry.type === 'IN' ? '#DCFCE7' : '#FEE2E2',
                                                                    color: entry.type === 'IN' ? '#166534' : '#991B1B'
                                                                },
                                                                children: [
                                                                    entry.type === 'IN' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpCircle$3e$__["ArrowUpCircle"], {
                                                                        size: 14
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                                        lineNumber: 345,
                                                                        columnNumber: 80
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownCircle$3e$__["ArrowDownCircle"], {
                                                                        size: 14
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                                        lineNumber: 345,
                                                                        columnNumber: 110
                                                                    }, this),
                                                                    "STOCK ",
                                                                    entry.type
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                                lineNumber: 334,
                                                                columnNumber: 53
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                            lineNumber: 333,
                                                            columnNumber: 49
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
                                                                        style: {
                                                                            fontSize: 13,
                                                                            fontWeight: 700,
                                                                            color: '#334155'
                                                                        },
                                                                        children: entry.source
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                                        lineNumber: 351,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontSize: 10,
                                                                            color: '#94A3B8',
                                                                            fontFamily: 'monospace'
                                                                        },
                                                                        children: [
                                                                            "#",
                                                                            entry.ref
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                                        lineNumber: 352,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                                lineNumber: 350,
                                                                columnNumber: 53
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                            lineNumber: 349,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: 15,
                                                                    fontWeight: 900,
                                                                    color: entry.type === 'IN' ? '#10B981' : '#EF4444'
                                                                },
                                                                children: [
                                                                    entry.type === 'IN' ? '+' : '-',
                                                                    Math.abs(entry.qty)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                                lineNumber: 356,
                                                                columnNumber: 53
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                            lineNumber: 355,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: 6
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontSize: 14,
                                                                            fontWeight: 800,
                                                                            color: '#1E293B'
                                                                        },
                                                                        children: entry.balanceAfter
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                                        lineNumber: 362,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontSize: 11,
                                                                            color: '#94A3B8'
                                                                        },
                                                                        children: activeProduct?.unit
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                                        lineNumber: 363,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                                lineNumber: 361,
                                                                columnNumber: 53
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                            lineNumber: 360,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                fontWeight: 800,
                                                                color: '#1E293B'
                                                            },
                                                            children: [
                                                                "₹",
                                                                entry.price.toLocaleString('en-IN')
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                            lineNumber: 366,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                onClick: ()=>handleMfgUpdate(entry.date, entry.mfgDate),
                                                                style: {
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: 6,
                                                                    cursor: 'pointer',
                                                                    color: entry.mfgDate ? '#334155' : '#CBD5E0',
                                                                    fontSize: 12,
                                                                    fontWeight: 600
                                                                },
                                                                children: [
                                                                    entry.mfgDate || 'Add Mfg',
                                                                    " ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__["Edit2"], {
                                                                        size: 12
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                                        lineNumber: 372,
                                                                        columnNumber: 86
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                                lineNumber: 368,
                                                                columnNumber: 53
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                            lineNumber: 367,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, idx, true, {
                                                    fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                                    lineNumber: 326,
                                                    columnNumber: 45
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                            lineNumber: 316,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                    lineNumber: 304,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                lineNumber: 303,
                                columnNumber: 29
                            }, this),
                            (!showHistory || ledgerEntries.length > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: '14px 20px',
                                    background: '#F8FAFC',
                                    borderTop: showHistory ? '1px solid #F1F5F9' : 'none',
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    gap: 10
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                            size: 14,
                                            color: "#10B981"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                            lineNumber: 385,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 12,
                                                fontWeight: 700,
                                                color: '#64748B'
                                            },
                                            children: "Audit Complete & Synchronized"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                            lineNumber: 386,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                    lineNumber: 384,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                                lineNumber: 383,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
                        lineNumber: 278,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/app/company/inventory/StockLedgerTab.tsx",
        lineNumber: 136,
        columnNumber: 9
    }, this);
}
_s(StockLedgerTab, "MqI7K98j2P/VNHNiQpE2rwO9sOc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c = StockLedgerTab;
var _c;
__turbopack_context__.k.register(_c, "StockLedgerTab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
"[project]/app/company/inventory/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InventoryPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FeatureGate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/FeatureGate.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>"); // Trigger HMR rebuild
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pen.js [app-client] (ecmascript) <export default as Edit2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScanLine$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scan-line.js [app-client] (ecmascript) <export default as ScanLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$warehouse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Warehouse$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/warehouse.js [app-client] (ecmascript) <export default as Warehouse>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up.js [app-client] (ecmascript) <export default as ArrowUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-down.js [app-client] (ecmascript) <export default as ArrowDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right-left.js [app-client] (ecmascript) <export default as ArrowRightLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/history.js [app-client] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gift.js [app-client] (ecmascript) <export default as Gift>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QrCode$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/qr-code.js [app-client] (ecmascript) <export default as QrCode>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$company$2f$inventory$2f$PurchaseBillsTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/company/inventory/PurchaseBillsTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$company$2f$inventory$2f$StockLedgerTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/company/inventory/StockLedgerTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$QrLabelModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/QrLabelModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AIAddItemModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AIAddItemModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ConfirmDialog.tsx [app-client] (ecmascript)");
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
;
;
;
;
;
function InventoryRow({ p, companyId, onDelete, onEdit, godowns, isSelected, onToggle, invoices, offers, onQrSelect, company, isSubBranch }) {
    const isLow = p.stockQty <= p.lowStockAlertQty;
    const daysLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["predictStockDays"])(p.stockQty, invoices, p.id);
    const today = new Date().toISOString().slice(0, 10);
    const in30 = new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10);
    const batches = p.batches || [];
    const hasExpired = batches.some((b)=>b.expiryDate && b.expiryDate < today);
    const expiringSoon = !hasExpired && batches.some((b)=>b.expiryDate && b.expiryDate >= today && b.expiryDate <= in30);
    const matchingOffers = (offers || []).filter((o)=>o.type === 'bogo' && (o.buyProductId === p.id || o.getProductId === p.id) || o.type === 'discount' && o.buyProductId === p.id || o.type === 'combo' && o.comboProductIds?.includes(p.id));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        className: isSelected ? 'selected-row' : '',
        style: {
            backgroundColor: isSelected ? '#F0F4F8' : 'transparent',
            transition: 'all 0.15s'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                onClick: (e)=>e.stopPropagation(),
                style: {
                    width: 40,
                    textAlign: 'center'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "checkbox",
                    checked: isSelected,
                    onChange: ()=>onToggle(p.id),
                    style: {
                        cursor: 'pointer',
                        transform: 'scale(1.2)'
                    }
                }, void 0, false, {
                    fileName: "[project]/app/company/inventory/page.tsx",
                    lineNumber: 38,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/company/inventory/page.tsx",
                lineNumber: 37,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: 36,
                                height: 36,
                                borderRadius: 10,
                                background: '#FEF7E0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 800,
                                color: '#B45309',
                                flexShrink: 0,
                                boxShadow: 'inset 0 0 0 1px rgba(180,83,9,0.1)'
                            },
                            children: p.name[0]
                        }, void 0, false, {
                            fileName: "[project]/app/company/inventory/page.tsx",
                            lineNumber: 42,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/company/inventory/${p.id}`,
                                    style: {
                                        fontWeight: 700,
                                        fontSize: 13,
                                        color: '#1A1A2E',
                                        textDecoration: 'none'
                                    },
                                    children: p.name
                                }, void 0, false, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 46,
                                    columnNumber: 25
                                }, this),
                                p.barcode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 10,
                                        color: '#A0AEC0',
                                        fontFamily: 'monospace'
                                    },
                                    children: p.barcode
                                }, void 0, false, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 49,
                                    columnNumber: 39
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: 4,
                                        marginTop: 2,
                                        flexWrap: 'wrap'
                                    },
                                    children: [
                                        hasExpired && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 9,
                                                fontWeight: 800,
                                                padding: '1px 5px',
                                                borderRadius: 4,
                                                background: '#FEE2E2',
                                                color: '#DC2626'
                                            },
                                            children: "EXPIRED BATCH"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 51,
                                            columnNumber: 44
                                        }, this),
                                        expiringSoon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 9,
                                                fontWeight: 800,
                                                padding: '1px 5px',
                                                borderRadius: 4,
                                                background: '#FEF3C7',
                                                color: '#D97706'
                                            },
                                            children: "EXPIRING SOON"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 52,
                                            columnNumber: 46
                                        }, this),
                                        matchingOffers.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 9,
                                                    fontWeight: 800,
                                                    padding: '1px 5px',
                                                    borderRadius: 4,
                                                    background: '#E6FFFA',
                                                    color: '#00A389',
                                                    border: '1px solid #B2F5EA'
                                                },
                                                children: [
                                                    "🎁 ",
                                                    o.name
                                                ]
                                            }, o.id, true, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 54,
                                                columnNumber: 33
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 50,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/inventory/page.tsx",
                            lineNumber: 45,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/company/inventory/page.tsx",
                    lineNumber: 41,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/company/inventory/page.tsx",
                lineNumber: 40,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                style: {
                    fontSize: 11,
                    color: '#718096',
                    fontFamily: 'monospace'
                },
                children: p.hsnCode || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        color: '#A0AEC0'
                    },
                    children: "—"
                }, void 0, false, {
                    fileName: "[project]/app/company/inventory/page.tsx",
                    lineNumber: 62,
                    columnNumber: 99
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/company/inventory/page.tsx",
                lineNumber: 62,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "badge badge-gray",
                    children: p.category || '—'
                }, void 0, false, {
                    fileName: "[project]/app/company/inventory/page.tsx",
                    lineNumber: 64,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/company/inventory/page.tsx",
                lineNumber: 63,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                children: company?.franchiseEnabled && !isSubBranch ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontWeight: 800,
                                        color: isLow ? '#EA4335' : '#1A1A2E',
                                        fontSize: 13
                                    },
                                    children: [
                                        "Total: ",
                                        p.stockQty
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 70,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 11,
                                        color: '#A0AEC0'
                                    },
                                    children: p.unit
                                }, void 0, false, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 71,
                                    columnNumber: 29
                                }, this),
                                isLow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                    size: 13,
                                    color: "#FBBC04"
                                }, void 0, false, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 72,
                                    columnNumber: 39
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/inventory/page.tsx",
                            lineNumber: 69,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 4,
                                maxWidth: 220
                            },
                            children: (company.branches || []).map((b)=>{
                                const bQty = p.branchStock?.[b.id] ?? 0;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 9,
                                        fontWeight: 700,
                                        padding: '1px 5px',
                                        borderRadius: 4,
                                        background: '#F1F5F9',
                                        color: '#4A5568',
                                        border: '1px solid #E2E8F0',
                                        display: 'inline-block'
                                    },
                                    children: [
                                        b.name,
                                        ": ",
                                        bQty
                                    ]
                                }, b.id, true, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 79,
                                    columnNumber: 37
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/app/company/inventory/page.tsx",
                            lineNumber: 75,
                            columnNumber: 25
                        }, this),
                        daysLeft !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 10,
                                color: daysLeft < 7 ? '#EA4335' : '#34A853',
                                fontWeight: 700
                            },
                            children: [
                                "Est. ",
                                daysLeft,
                                " days left"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/inventory/page.tsx",
                            lineNumber: 87,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/company/inventory/page.tsx",
                    lineNumber: 68,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontWeight: 800,
                                        color: isLow ? '#EA4335' : '#1A1A2E',
                                        fontSize: 14
                                    },
                                    children: p.stockQty
                                }, void 0, false, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 95,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 11,
                                        color: '#A0AEC0'
                                    },
                                    children: p.unit
                                }, void 0, false, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 96,
                                    columnNumber: 29
                                }, this),
                                isLow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                    size: 13,
                                    color: "#FBBC04"
                                }, void 0, false, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 97,
                                    columnNumber: 39
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/inventory/page.tsx",
                            lineNumber: 94,
                            columnNumber: 25
                        }, this),
                        daysLeft !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 10,
                                color: daysLeft < 7 ? '#EA4335' : '#34A853',
                                fontWeight: 700
                            },
                            children: [
                                "Est. ",
                                daysLeft,
                                " days left"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/inventory/page.tsx",
                            lineNumber: 100,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/company/inventory/page.tsx",
                    lineNumber: 93,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/company/inventory/page.tsx",
                lineNumber: 66,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                style: {
                    fontSize: 11,
                    color: '#718096'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$warehouse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Warehouse$3e$__["Warehouse"], {
                            size: 10
                        }, void 0, false, {
                            fileName: "[project]/app/company/inventory/page.tsx",
                            lineNumber: 109,
                            columnNumber: 21
                        }, this),
                        " ",
                        p.godownDisplayList || godowns?.find((g)=>g.id === p.godownId)?.name || godowns?.[0]?.name || '—'
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/company/inventory/page.tsx",
                    lineNumber: 108,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/company/inventory/page.tsx",
                lineNumber: 107,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                style: {
                    fontWeight: 700
                },
                children: [
                    "₹",
                    p.purchasePrice.toLocaleString('en-IN')
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/inventory/page.tsx",
                lineNumber: 112,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                style: {
                    fontWeight: 800,
                    color: '#34A853'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            "₹",
                            p.sellingPrice.toLocaleString('en-IN')
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/inventory/page.tsx",
                        lineNumber: 114,
                        columnNumber: 17
                    }, this),
                    company?.franchiseEnabled && !isSubBranch && p.branchPrice && Object.keys(p.branchPrice).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            marginTop: 4
                        },
                        children: Object.entries(p.branchPrice).map(([bId, price])=>{
                            const branchName = company?.branches?.find((b)=>b.id === bId)?.name || 'Branch';
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 8,
                                    color: '#4A5568',
                                    background: '#E6FFFA',
                                    padding: '1px 4px',
                                    borderRadius: 4,
                                    border: '1px solid #B2F5EA',
                                    display: 'inline-block',
                                    width: 'fit-content'
                                },
                                children: [
                                    branchName,
                                    ": ₹",
                                    price
                                ]
                            }, bId, true, {
                                fileName: "[project]/app/company/inventory/page.tsx",
                                lineNumber: 120,
                                columnNumber: 33
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/company/inventory/page.tsx",
                        lineNumber: 116,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/inventory/page.tsx",
                lineNumber: 113,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "badge badge-blue",
                    children: [
                        p.gstRate,
                        "%"
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/company/inventory/page.tsx",
                    lineNumber: 128,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/company/inventory/page.tsx",
                lineNumber: 128,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        gap: 6
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onQrSelect(p),
                            className: "btn btn-ghost btn-icon",
                            style: {
                                padding: 6,
                                color: '#9333EA'
                            },
                            title: "Generate QR Label",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QrCode$3e$__["QrCode"], {
                                size: 13
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/page.tsx",
                                lineNumber: 131,
                                columnNumber: 161
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/company/inventory/page.tsx",
                            lineNumber: 131,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onEdit(p),
                            className: "btn btn-ghost btn-icon",
                            style: {
                                padding: 6,
                                color: '#4285F4'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__["Edit2"], {
                                size: 13
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/page.tsx",
                                lineNumber: 132,
                                columnNumber: 131
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/company/inventory/page.tsx",
                            lineNumber: 132,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onDelete(p.id),
                            className: "btn btn-ghost btn-icon",
                            style: {
                                padding: 6,
                                color: '#EA4335'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                size: 13
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/page.tsx",
                                lineNumber: 133,
                                columnNumber: 136
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/company/inventory/page.tsx",
                            lineNumber: 133,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/company/inventory/page.tsx",
                    lineNumber: 130,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/company/inventory/page.tsx",
                lineNumber: 129,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/company/inventory/page.tsx",
        lineNumber: 36,
        columnNumber: 9
    }, this);
}
_c = InventoryRow;
function InventoryPage() {
    _s();
    const { activeCompanyId, activeBranchId, isSubBranchLogin, stockTransfers = [], addStockTransfer, approveStockTransfer, rejectStockTransfer, addProduct, updateProduct, deleteProduct, addToHsnCache, appendStockLog } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const companyId = activeCompanyId;
    const company = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActiveCompany"])();
    const products = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"])('products');
    const invoices = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"])('invoices');
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [godownFilter, setGodownFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [showAdd, setShowAdd] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showAIAdd, setShowAIAdd] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Branch transfer modal states
    const [showBranchTransferModal, setShowBranchTransferModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [transferProductId, setTransferProductId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [transferFromBranchId, setTransferFromBranchId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [transferToBranchId, setTransferToBranchId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [transferQty, setTransferQty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('items');
    // Derive canScan once from reactive hook — avoids SSR/hydration mismatch from useStore.getState() in render
    const { user: storeUser, isDemo: storeIsDemo } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const canScan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FeatureGate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canAccess"])('ai_scanner', storeUser, storeIsDemo);
    // Import states
    const [showImport, setShowImport] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [importGodownId, setImportGodownId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(company?.godowns?.[0]?.id || '');
    // Transfer states
    const [showTransfer, setShowTransfer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [transferFrom, setTransferFrom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(company?.godowns?.[0]?.id || '');
    const [transferTo, setTransferTo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(company?.godowns?.[1]?.id || '');
    const [editProduct, setEditProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedQrProduct, setSelectedQrProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [hsnLoading, setHsnLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const emptyForm = {
        name: '',
        barcode: '',
        category: '',
        hsnCode: '',
        unit: 'pcs',
        purchasePrice: '',
        sellingPrice: '',
        mrp: '',
        stockQty: '',
        lowStockAlertQty: '5',
        gstRate: '0',
        taxIncluded: false,
        godownId: company?.godowns?.[0]?.id || '',
        brand: '',
        description: '',
        imageUrl: '',
        branchStock: {},
        branchPrice: {}
    };
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(emptyForm);
    const up = (k, v)=>setForm((f)=>({
                ...f,
                [k]: v
            }));
    const filtered = products.filter((p)=>{
        if (godownFilter !== 'all' && p.godownId !== godownFilter && !(godownFilter === company?.godowns?.[0]?.id && !p.godownId)) return false;
        if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !(p.barcode || '').includes(search) && !(p.category || '').toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });
    // Group products by name to prevent double entries in the list
    const groupedFiltered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "InventoryPage.useMemo[groupedFiltered]": ()=>{
            const groups = {};
            filtered.forEach({
                "InventoryPage.useMemo[groupedFiltered]": (p)=>{
                    const key = p.name.trim().toLowerCase();
                    if (!groups[key]) {
                        const gNames = [];
                        const gId = p.godownId || company?.godowns?.[0]?.id;
                        const gName = company?.godowns?.find({
                            "InventoryPage.useMemo[groupedFiltered]": (g)=>g.id === gId
                        }["InventoryPage.useMemo[groupedFiltered]"])?.name || '—';
                        groups[key] = {
                            primaryProduct: p,
                            allProducts: [
                                p
                            ],
                            combinedQty: p.stockQty,
                            godownNames: [
                                gName
                            ]
                        };
                    } else {
                        groups[key].allProducts.push(p);
                        groups[key].combinedQty += p.stockQty;
                        const gId = p.godownId || company?.godowns?.[0]?.id;
                        const gName = company?.godowns?.find({
                            "InventoryPage.useMemo[groupedFiltered]": (g)=>g.id === gId
                        }["InventoryPage.useMemo[groupedFiltered]"])?.name || '—';
                        if (!groups[key].godownNames.includes(gName)) {
                            groups[key].godownNames.push(gName);
                        }
                    }
                }
            }["InventoryPage.useMemo[groupedFiltered]"]);
            return Object.values(groups).map({
                "InventoryPage.useMemo[groupedFiltered]": (g)=>{
                    return {
                        ...g.primaryProduct,
                        stockQty: g.combinedQty,
                        godownDisplayList: g.godownNames.join(', '),
                        originalProductIds: g.allProducts.map({
                            "InventoryPage.useMemo[groupedFiltered]": (p)=>p.id
                        }["InventoryPage.useMemo[groupedFiltered]"])
                    };
                }
            }["InventoryPage.useMemo[groupedFiltered]"]);
        }
    }["InventoryPage.useMemo[groupedFiltered]"], [
        filtered,
        company
    ]);
    const [selectedItems, setSelectedItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const handleBulkDelete = async ()=>{
        if (selectedItems.length === 0) return;
        const yes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["confirm"])({
            title: `Delete ${selectedItems.length} items?`,
            message: `This will permanently remove ${selectedItems.length} items and their associated stock entries from all godowns. Are you sure?`,
            danger: true
        });
        if (yes) {
            const selectedNames = products.filter((p)=>selectedItems.includes(p.id)).map((p)=>p.name.toLowerCase());
            const allMatchingProducts = products.filter((p)=>selectedNames.includes(p.name.toLowerCase()));
            allMatchingProducts.forEach((p)=>deleteProduct(p.id));
            setSelectedItems([]);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success(`Deleted ${selectedNames.length} items from all godowns`);
        }
    };
    const toggleItemSelection = (id)=>{
        setSelectedItems((prev)=>prev.includes(id) ? prev.filter((i)=>i !== id) : [
                ...prev,
                id
            ]);
    };
    const toggleAllSelection = ()=>{
        if (groupedFiltered.length > 0 && selectedItems.length === groupedFiltered.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(groupedFiltered.map((g)=>g.id));
        }
    };
    const stockValue = products.reduce((a, p)=>a + p.stockQty * p.purchasePrice, 0);
    const lowStock = products.filter((p)=>p.stockQty <= p.lowStockAlertQty);
    const handleHsnFetch = async ()=>{
        if (!form.hsnCode) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Enter HSN code first');
            return;
        }
        setHsnLoading(true);
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchHsnOnline"])(form.hsnCode);
        setHsnLoading(false);
        if (res) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success(`HSN ${form.hsnCode}: ${res.description} · GST ${res.gstRate}%`);
            up('gstRate', String(res.gstRate));
            addToHsnCache({
                code: form.hsnCode,
                description: res.description,
                gstRate: res.gstRate,
                source: 'api'
            });
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('HSN not found online. Please enter GST rate manually.');
        }
    };
    const handleSave = ()=>{
        if (!form.name) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Item name required');
            return;
        }
        const data = {
            companyId: companyId,
            name: form.name,
            barcode: form.barcode,
            category: form.category,
            hsnCode: form.hsnCode,
            unit: form.unit,
            imageUrl: form.imageUrl,
            purchasePrice: parseFloat(form.purchasePrice) || 0,
            sellingPrice: parseFloat(form.sellingPrice) || 0,
            mrp: parseFloat(form.mrp) || 0,
            stockQty: parseFloat(form.stockQty) || 0,
            lowStockAlertQty: parseFloat(form.lowStockAlertQty) || 5,
            gstRate: parseFloat(form.gstRate) || 0,
            cessRate: 0,
            taxIncluded: form.taxIncluded,
            godownId: form.godownId || company?.godowns?.[0]?.id,
            brand: form.brand,
            description: form.description,
            branchStock: form.branchStock || {},
            branchPrice: form.branchPrice || {}
        };
        if (editProduct) {
            const sameNameProducts = products.filter((p)=>p.name.toLowerCase() === editProduct.name.toLowerCase());
            sameNameProducts.forEach((p)=>{
                if (p.id === editProduct.id) {
                    updateProduct(p.id, data);
                } else {
                    const { stockQty, godownId, ...sharedDetails } = data;
                    updateProduct(p.id, sharedDetails);
                }
            });
            setEditProduct(null);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Item details updated across all godowns');
        } else {
            addProduct(data);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Item added to inventory');
        }
        setShowAdd(false);
        setForm(emptyForm);
    };
    const openEdit = (p)=>{
        setEditProduct(p);
        setForm({
            ...p,
            purchasePrice: String(p.purchasePrice),
            sellingPrice: String(p.sellingPrice),
            mrp: String(p.mrp || ''),
            stockQty: String(p.stockQty),
            lowStockAlertQty: String(p.lowStockAlertQty),
            gstRate: String(p.gstRate),
            imageUrl: p.imageUrl || '',
            branchStock: p.branchStock || {},
            branchPrice: p.branchPrice || {}
        });
        setShowAdd(true);
    };
    const handleDelete = async (id)=>{
        const itemToDelete = products.find((p)=>p.id === id);
        if (!itemToDelete) return;
        const yes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["confirm"])({
            message: `All entries for "${itemToDelete.name}" across all godowns will be permanently removed.`,
            danger: true
        });
        if (yes) {
            const sameNameProducts = products.filter((p)=>p.name.toLowerCase() === itemToDelete.name.toLowerCase());
            sameNameProducts.forEach((p)=>deleteProduct(p.id));
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Item deleted from all godowns');
        }
    };
    const handleGeminiScanned = (items)=>{
        setShowAIAdd(false);
        let addedCount = 0;
        const parseNum = (v)=>{
            if (v === undefined || v === null) return 0;
            // Handle currency symbols, commas, and spaces common in OCR
            const s = String(v).replace(/[₹$,\s]/g, '').replace(/[^0-9.]/g, '');
            return parseFloat(s) || 0;
        };
        items.forEach((item)=>{
            const name = item.name || item.item || item.product;
            if (!name) return;
            const price = parseNum(item.price ?? item.rate ?? item.unitPrice ?? 0);
            const qty = parseNum(item.qty ?? item.quantity) || 1;
            const gst = parseNum(item.gst ?? 0);
            addProduct({
                companyId: companyId,
                name: String(name).substring(0, 100),
                barcode: '',
                category: 'AI Scanned',
                hsnCode: item.hsn || '',
                unit: item.unit || 'pcs',
                imageUrl: '',
                purchasePrice: price,
                sellingPrice: price,
                mrp: price,
                stockQty: qty,
                lowStockAlertQty: 5,
                gstRate: gst,
                cessRate: 0,
                taxIncluded: false,
                godownId: company?.godowns?.[0]?.id || '',
                brand: '',
                description: ''
            });
            addedCount++;
        });
        if (addedCount > 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success(`🎉 AI added ${addedCount} items to your inventory!`);
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Could not detect any valid product names or prices. Try a clearer image.');
        }
    };
    const exportCSV = ()=>{
        const header = 'Name,Barcode,Category,HSN,Unit,Purchase Price,Selling Price,MRP,Stock,Low Stock Alert,GST Rate,Image URL\n';
        const rows = products.map((p)=>`"${p.name}","${p.barcode || ''}","${p.category || ''}","${p.hsnCode || ''}","${p.unit}",${p.purchasePrice},${p.sellingPrice},${p.mrp || ''},${p.stockQty},${p.lowStockAlertQty},${p.gstRate},"${p.imageUrl || ''}"`).join('\n');
        const blob = new Blob([
            '\uFEFF' + header + rows
        ], {
            type: 'text/csv;charset=utf-8'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'edibio_inventory.csv';
        a.click();
        URL.revokeObjectURL(url);
    };
    const importRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { importProductsBulk } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const handleImport = (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev)=>{
            const text = ev.target?.result;
            // Native CSV parser handling commas inside quotes
            const parseCSVLine = (line)=>{
                const result = [];
                let current = '';
                let inQuotes = false;
                for(let i = 0; i < line.length; i++){
                    const char = line[i];
                    if (char === '"' && line[i + 1] === '"') {
                        current += '"';
                        i++;
                    } else if (char === '"') inQuotes = !inQuotes; // Toggle quote state
                    else if (char === ',' && !inQuotes) {
                        result.push(current.trim());
                        current = '';
                    } else current += char;
                }
                result.push(current.trim());
                return result;
            };
            const rows = text.split('\n').filter(Boolean).map((r)=>r.trim());
            const parsedData = [];
            // Skip header row
            for(let r = 1; r < rows.length; r++){
                if (!rows[r]) continue;
                const cols = parseCSVLine(rows[r]);
                if (!cols[0]) continue;
                parsedData.push({
                    companyId: companyId,
                    name: cols[0],
                    barcode: cols[1] || '',
                    category: cols[2] || 'Imported',
                    hsnCode: cols[3] || '',
                    unit: cols[4] || 'pcs',
                    purchasePrice: parseFloat(cols[5]) || 0,
                    sellingPrice: parseFloat(cols[6]) || 0,
                    mrp: parseFloat(cols[7]) || 0,
                    stockQty: parseFloat(cols[8]) || 0,
                    lowStockAlertQty: parseFloat(cols[9]) || 5,
                    gstRate: parseFloat(cols[10]) || 0,
                    imageUrl: cols[11] || '',
                    cessRate: 0,
                    taxIncluded: false,
                    godownId: importGodownId
                });
            }
            if (parsedData.length > 0) {
                importProductsBulk(parsedData);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success(`Succesfully imported ${parsedData.length} items in bulk!`);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('No valid valid data found in CSV.');
            }
            setShowImport(false);
        };
        reader.readAsText(file);
        e.target.value = '';
    };
    const transferRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleTransferProcess = (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        if (transferFrom === transferTo) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('From and To godowns cannot be the same');
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev)=>{
            const text = ev.target?.result;
            // Expected CSV format: ItemNameOrBarcode, TransferQty
            const rows = text.split('\n').slice(1).filter(Boolean);
            let successTransfers = 0;
            const missedItems = [];
            rows.forEach((row)=>{
                const cols = row.split(',').map((c)=>c.replace(/^"|"$/g, '').trim());
                const query = cols[0];
                const trfQty = parseFloat(cols[1]);
                if (!query || isNaN(trfQty) || trfQty <= 0) return;
                // Find source product
                const sourceProduct = products.find((p)=>(p.godownId === transferFrom || !p.godownId && transferFrom === company?.godowns?.[0]?.id) && (p.name.toLowerCase() === query.toLowerCase() || p.barcode === query));
                if (sourceProduct && sourceProduct.stockQty >= trfQty) {
                    const fromName = company?.godowns?.find((g)=>g.id === transferFrom)?.name || 'source godown';
                    const toName = company?.godowns?.find((g)=>g.id === transferTo)?.name || 'destination godown';
                    // deduct from source
                    updateProduct(sourceProduct.id, {
                        stockQty: sourceProduct.stockQty - trfQty
                    });
                    appendStockLog(sourceProduct.id, {
                        date: new Date().toISOString().slice(0, 10),
                        time: new Date().toTimeString().slice(0, 5),
                        type: 'out',
                        qty: trfQty,
                        reason: `Transfer to ${toName}`,
                        balanceAfter: sourceProduct.stockQty - trfQty
                    });
                    // Find or create in destination
                    const destProduct = products.find((p)=>p.godownId === transferTo && (p.name.toLowerCase() === sourceProduct.name.toLowerCase() || p.barcode === sourceProduct.barcode));
                    if (destProduct) {
                        updateProduct(destProduct.id, {
                            stockQty: destProduct.stockQty + trfQty
                        });
                        appendStockLog(destProduct.id, {
                            date: new Date().toISOString().slice(0, 10),
                            time: new Date().toTimeString().slice(0, 5),
                            type: 'in',
                            qty: trfQty,
                            reason: `Transfer from ${fromName}`,
                            balanceAfter: destProduct.stockQty + trfQty
                        });
                    } else {
                        // Create clone with opening transfer log
                        const { id: _, ...cloneInfo } = sourceProduct;
                        const initialLogs = [
                            {
                                id: Math.random().toString(36).substring(2),
                                date: new Date().toISOString().slice(0, 10),
                                time: new Date().toTimeString().slice(0, 5),
                                type: 'in',
                                qty: trfQty,
                                reason: `Transfer from ${fromName}`,
                                balanceAfter: trfQty
                            }
                        ];
                        addProduct({
                            ...cloneInfo,
                            godownId: transferTo,
                            stockQty: trfQty,
                            stockLogs: initialLogs
                        });
                    }
                    successTransfers++;
                } else {
                    missedItems.push(query);
                }
            });
            if (missedItems.length > 0) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(`✅ ${successTransfers} transferred. ⚠️ Not found: ${missedItems.slice(0, 3).join(', ')}${missedItems.length > 3 ? '…' : ''}`, {
                    duration: 5000
                });
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success(`Successfully transferred ${successTransfers} items.`);
            }
            setShowTransfer(false);
        };
        reader.readAsText(file);
        e.target.value = '';
    };
    const godowns = company?.godowns || [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: 1200,
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "inv-tab-bar",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab('items'),
                                className: `inv-tab-btn${activeTab === 'items' ? ' inv-tab-active' : ''}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                        size: 13
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/inventory/page.tsx",
                                        lineNumber: 541,
                                        columnNumber: 25
                                    }, this),
                                    "Stock Items"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/inventory/page.tsx",
                                lineNumber: 540,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab('purchases'),
                                className: `inv-tab-btn${activeTab === 'purchases' ? ' inv-tab-active' : ''}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__["ArrowDown"], {
                                        size: 13
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/inventory/page.tsx",
                                        lineNumber: 545,
                                        columnNumber: 25
                                    }, this),
                                    "Purchase Bills"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/inventory/page.tsx",
                                lineNumber: 544,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab('ledger'),
                                className: `inv-tab-btn${activeTab === 'ledger' ? ' inv-tab-active' : ''}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
                                        size: 13
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/inventory/page.tsx",
                                        lineNumber: 549,
                                        columnNumber: 25
                                    }, this),
                                    "Ledger"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/inventory/page.tsx",
                                lineNumber: 548,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab('offers'),
                                className: `inv-tab-btn${activeTab === 'offers' ? ' inv-tab-active' : ''}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"], {
                                        size: 13
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/inventory/page.tsx",
                                        lineNumber: 553,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "desktop-only-inline",
                                        children: "Schemes & Offers"
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/inventory/page.tsx",
                                        lineNumber: 554,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mobile-only-inline",
                                        children: "Offers"
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/inventory/page.tsx",
                                        lineNumber: 555,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/inventory/page.tsx",
                                lineNumber: 552,
                                columnNumber: 21
                            }, this),
                            company?.franchiseEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab('transfers'),
                                className: `inv-tab-btn${activeTab === 'transfers' ? ' inv-tab-active' : ''}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightLeft$3e$__["ArrowRightLeft"], {
                                        size: 13
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/inventory/page.tsx",
                                        lineNumber: 559,
                                        columnNumber: 29
                                    }, this),
                                    "Transfers"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/inventory/page.tsx",
                                lineNumber: 558,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/inventory/page.tsx",
                        lineNumber: 539,
                        columnNumber: 17
                    }, this),
                    activeTab === 'purchases' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$company$2f$inventory$2f$PurchaseBillsTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/app/company/inventory/page.tsx",
                        lineNumber: 566,
                        columnNumber: 21
                    }, this) : activeTab === 'ledger' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$company$2f$inventory$2f$StockLedgerTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/app/company/inventory/page.tsx",
                        lineNumber: 568,
                        columnNumber: 21
                    }, this) : activeTab === 'offers' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OffersTab, {}, void 0, false, {
                        fileName: "[project]/app/company/inventory/page.tsx",
                        lineNumber: 570,
                        columnNumber: 21
                    }, this) : activeTab === 'transfers' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BranchTransfersTab, {}, void 0, false, {
                        fileName: "[project]/app/company/inventory/page.tsx",
                        lineNumber: 572,
                        columnNumber: 21
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 20
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "inv-stats-grid",
                                children: [
                                    {
                                        l: 'Total Items',
                                        v: String(products.length),
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"],
                                        color: '#FBBC04'
                                    },
                                    {
                                        l: 'Stock Value',
                                        v: `₹${stockValue.toLocaleString('en-IN')}`,
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__["ArrowUp"],
                                        color: '#34A853'
                                    },
                                    {
                                        l: 'Low Stock',
                                        v: String(lowStock.length),
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"],
                                        color: '#EA4335'
                                    }
                                ].map(({ l, v, icon: Icon, color })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "card inv-stats-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "inv-stats-icon-wrapper",
                                                style: {
                                                    background: color + '15'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                    size: 14,
                                                    color: color
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 584,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 583,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    minWidth: 0,
                                                    flex: 1,
                                                    width: '100%'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "inv-stats-label",
                                                        children: l
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 587,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "inv-stats-value",
                                                        children: v
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 588,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 586,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, l, true, {
                                        fileName: "[project]/app/company/inventory/page.tsx",
                                        lineNumber: 582,
                                        columnNumber: 33
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/page.tsx",
                                lineNumber: 576,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "controls-container",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "search-bar-wrapper",
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
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 597,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "e-input",
                                                placeholder: "Search items, barcode…",
                                                value: search,
                                                onChange: (e)=>setSearch(e.target.value),
                                                style: {
                                                    paddingLeft: 34,
                                                    width: '100%'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 598,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/inventory/page.tsx",
                                        lineNumber: 596,
                                        columnNumber: 29
                                    }, this),
                                    godowns.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "godown-filters-container",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setGodownFilter('all'),
                                                className: `godown-chip ${godownFilter === 'all' ? 'active' : ''}`,
                                                children: "All"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 604,
                                                columnNumber: 37
                                            }, this),
                                            godowns.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setGodownFilter(g.id),
                                                    className: `godown-chip ${godownFilter === g.id ? 'active' : ''}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$warehouse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Warehouse$3e$__["Warehouse"], {
                                                            size: 11
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/page.tsx",
                                                            lineNumber: 609,
                                                            columnNumber: 45
                                                        }, this),
                                                        " ",
                                                        g.name
                                                    ]
                                                }, g.id, true, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 608,
                                                    columnNumber: 41
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/inventory/page.tsx",
                                        lineNumber: 603,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            exportCSV();
                                        },
                                        className: "btn btn-outline btn-sm btn-sec",
                                        style: {
                                            gap: 5
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                size: 13
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 615,
                                                columnNumber: 132
                                            }, this),
                                            " Export"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/inventory/page.tsx",
                                        lineNumber: 615,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowImport(true),
                                        className: "btn btn-outline btn-sm btn-sec",
                                        style: {
                                            gap: 5
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                size: 13
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 616,
                                                columnNumber: 135
                                            }, this),
                                            " Import CSV"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/inventory/page.tsx",
                                        lineNumber: 616,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/company/inventory/expiry",
                                        className: "btn btn-outline btn-sm btn-sec",
                                        style: {
                                            gap: 5,
                                            color: '#D97706',
                                            borderColor: '#FDE68A',
                                            background: '#FFFBEB',
                                            textDecoration: 'none',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                size: 13
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 619,
                                                columnNumber: 33
                                            }, this),
                                            " Expiry"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/inventory/page.tsx",
                                        lineNumber: 618,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/company/inventory/purchase-orders",
                                        className: "btn btn-outline btn-sm btn-sec",
                                        style: {
                                            gap: 5,
                                            color: '#7C3AED',
                                            borderColor: '#E9D5FF',
                                            background: '#FAF5FF',
                                            textDecoration: 'none',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                                size: 13
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 623,
                                                columnNumber: 33
                                            }, this),
                                            " Purchase Orders"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/inventory/page.tsx",
                                        lineNumber: 622,
                                        columnNumber: 29
                                    }, this),
                                    godowns.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowTransfer(true),
                                        className: "btn btn-outline btn-sm btn-sec",
                                        style: {
                                            gap: 5,
                                            color: '#9333EA',
                                            borderColor: '#E9D8FD',
                                            background: '#FAF5FF'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightLeft$3e$__["ArrowRightLeft"], {
                                                size: 13
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 628,
                                                columnNumber: 37
                                            }, this),
                                            " Transfer"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/inventory/page.tsx",
                                        lineNumber: 627,
                                        columnNumber: 33
                                    }, this),
                                    selectedItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleBulkDelete,
                                        className: "btn btn-sm btn-danger-action",
                                        style: {
                                            gap: 5,
                                            background: '#FEE2E2',
                                            color: '#DC2626',
                                            border: '1px solid #FCA5A5'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                size: 13
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 634,
                                                columnNumber: 37
                                            }, this),
                                            " Delete (",
                                            selectedItems.length,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/inventory/page.tsx",
                                        lineNumber: 633,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            if (!canScan) {
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('AI Scanning requires the Premium Plan. Upgrade in Subscription settings.', {
                                                    icon: '🔒'
                                                });
                                                return;
                                            }
                                            setShowAIAdd(true);
                                        },
                                        className: "btn btn-sm btn-primary-action",
                                        style: {
                                            background: canScan ? 'linear-gradient(135deg, #1A1A2E, #4285F4)' : '#E2E8F0',
                                            color: canScan ? 'white' : '#A0AEC0',
                                            borderColor: canScan ? '#1A1A2E' : '#E2E8F0',
                                            gap: 5,
                                            cursor: canScan ? 'pointer' : 'not-allowed'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScanLine$3e$__["ScanLine"], {
                                                size: 13
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 645,
                                                columnNumber: 33
                                            }, this),
                                            " AI Scan Item ",
                                            !canScan && '🔒'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/inventory/page.tsx",
                                        lineNumber: 638,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setEditProduct(null);
                                            setForm(emptyForm);
                                            setShowAdd(true);
                                        },
                                        className: "btn btn-blue btn-sm btn-primary-action",
                                        style: {
                                            gap: 5
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                size: 13
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 649,
                                                columnNumber: 33
                                            }, this),
                                            " Add Item"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/inventory/page.tsx",
                                        lineNumber: 648,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/inventory/page.tsx",
                                lineNumber: 595,
                                columnNumber: 25
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                            size: 44,
                                            style: {
                                                color: '#E1E4E8',
                                                margin: '0 auto 12px'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 657,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                color: '#A0AEC0',
                                                fontWeight: 600,
                                                fontSize: 14
                                            },
                                            children: "No items yet"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 658,
                                            columnNumber: 37
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
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 660,
                                                    columnNumber: 41
                                                }, this),
                                                " Add First Item"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 659,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 656,
                                    columnNumber: 33
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "desktop-table",
                                            style: {
                                                overflowX: 'auto'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                className: "e-table",
                                                style: {
                                                    minWidth: 800
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
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "checkbox",
                                                                        checked: groupedFiltered.length > 0 && selectedItems.length === groupedFiltered.length,
                                                                        onChange: toggleAllSelection,
                                                                        style: {
                                                                            cursor: 'pointer',
                                                                            transform: 'scale(1.2)'
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                                        lineNumber: 669,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                                    lineNumber: 668,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    children: "Item"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                                    lineNumber: 671,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    children: "HSN"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                                    lineNumber: 671,
                                                                    columnNumber: 62
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    children: "Category"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                                    lineNumber: 671,
                                                                    columnNumber: 74
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    children: "Stock"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                                    lineNumber: 671,
                                                                    columnNumber: 91
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    children: "Godown"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                                    lineNumber: 671,
                                                                    columnNumber: 105
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    children: "Purchase"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                                    lineNumber: 671,
                                                                    columnNumber: 120
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    children: "Selling"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                                    lineNumber: 671,
                                                                    columnNumber: 137
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    children: "GST"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                                    lineNumber: 671,
                                                                    columnNumber: 153
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    children: "Actions"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                                    lineNumber: 671,
                                                                    columnNumber: 165
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/inventory/page.tsx",
                                                            lineNumber: 667,
                                                            columnNumber: 52
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 667,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                        children: groupedFiltered.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InventoryRow, {
                                                                p: p,
                                                                companyId: companyId,
                                                                onDelete: handleDelete,
                                                                onEdit: openEdit,
                                                                godowns: godowns,
                                                                isSelected: selectedItems.includes(p.id),
                                                                onToggle: toggleItemSelection,
                                                                invoices: invoices,
                                                                offers: company?.offers || [],
                                                                onQrSelect: setSelectedQrProduct,
                                                                company: company,
                                                                isSubBranch: isSubBranchLogin
                                                            }, p.id, false, {
                                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                                lineNumber: 674,
                                                                columnNumber: 82
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 673,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 666,
                                                columnNumber: 41
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 665,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mobile-list",
                                            children: [
                                                groupedFiltered.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        padding: '12px 16px',
                                                        background: '#F8FAFC',
                                                        borderBottom: '1px solid #E2E8F0',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 10
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            checked: selectedItems.length === groupedFiltered.length,
                                                            onChange: toggleAllSelection,
                                                            style: {
                                                                cursor: 'pointer',
                                                                transform: 'scale(1.2)'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/page.tsx",
                                                            lineNumber: 681,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: 13,
                                                                fontWeight: 700,
                                                                color: '#4A5568'
                                                            },
                                                            children: "Select All Items"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/page.tsx",
                                                            lineNumber: 682,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 680,
                                                    columnNumber: 45
                                                }, this),
                                                groupedFiltered.map((p)=>{
                                                    const isSelected = selectedItems.includes(p.id);
                                                    const daysLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["predictStockDays"])(p.stockQty, invoices, p.id);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        onClick: ()=>toggleItemSelection(p.id),
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 12,
                                                            padding: '12px 16px',
                                                            borderBottom: '1px solid #F1F3F5',
                                                            background: isSelected ? '#F8FBFF' : 'white',
                                                            cursor: 'pointer',
                                                            transition: 'background 0.2s'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "checkbox",
                                                                checked: isSelected,
                                                                onChange: ()=>{},
                                                                style: {
                                                                    cursor: 'pointer',
                                                                    transform: 'scale(1.1)',
                                                                    flexShrink: 0
                                                                },
                                                                onClick: (e)=>e.stopPropagation()
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                                lineNumber: 690,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    width: 38,
                                                                    height: 38,
                                                                    borderRadius: 10,
                                                                    background: 'linear-gradient(135deg, #FEF7E0, #FFFBEB)',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    fontWeight: 900,
                                                                    color: '#B45309',
                                                                    flexShrink: 0,
                                                                    fontSize: 14
                                                                },
                                                                children: p.name[0]
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                                lineNumber: 691,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    flex: 1,
                                                                    minWidth: 0
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        style: {
                                                                            fontWeight: 800,
                                                                            fontSize: 13,
                                                                            color: '#1A1A2E',
                                                                            marginBottom: 2,
                                                                            overflow: 'hidden',
                                                                            textOverflow: 'ellipsis',
                                                                            whiteSpace: 'nowrap'
                                                                        },
                                                                        children: p.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                                        lineNumber: 693,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            display: 'flex',
                                                                            gap: 5,
                                                                            alignItems: 'center',
                                                                            flexWrap: 'wrap'
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "badge badge-gray",
                                                                                style: {
                                                                                    fontSize: 9,
                                                                                    padding: '1px 4px'
                                                                                },
                                                                                children: p.unit
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                                                lineNumber: 695,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "badge badge-blue",
                                                                                style: {
                                                                                    fontSize: 9,
                                                                                    padding: '1px 4px'
                                                                                },
                                                                                children: [
                                                                                    "GST ",
                                                                                    p.gstRate,
                                                                                    "%"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                                                lineNumber: 696,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            (company?.offers || []).filter((o)=>o.type === 'bogo' && (o.buyProductId === p.id || o.getProductId === p.id) || o.type === 'discount' && o.buyProductId === p.id || o.type === 'combo' && o.comboProductIds?.includes(p.id)).map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    style: {
                                                                                        fontSize: 8,
                                                                                        fontWeight: 800,
                                                                                        padding: '1px 4px',
                                                                                        borderRadius: 4,
                                                                                        background: '#E6FFFA',
                                                                                        color: '#00A389',
                                                                                        border: '1px solid #B2F5EA'
                                                                                    },
                                                                                    children: [
                                                                                        "🎁 ",
                                                                                        o.name
                                                                                    ]
                                                                                }, o.id, true, {
                                                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                                                    lineNumber: 702,
                                                                                    columnNumber: 65
                                                                                }, this))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                                        lineNumber: 694,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    company?.franchiseEnabled && !isSubBranchLogin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            display: 'flex',
                                                                            gap: 4,
                                                                            flexWrap: 'wrap',
                                                                            marginTop: 6
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                style: {
                                                                                    fontSize: 8,
                                                                                    fontWeight: 800,
                                                                                    padding: '2px 5px',
                                                                                    borderRadius: 4,
                                                                                    background: '#F1F5F9',
                                                                                    color: '#475569'
                                                                                },
                                                                                children: [
                                                                                    "Total: ",
                                                                                    p.stockQty
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                                                lineNumber: 709,
                                                                                columnNumber: 65
                                                                            }, this),
                                                                            (company.branches || []).map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    style: {
                                                                                        fontSize: 8,
                                                                                        fontWeight: 700,
                                                                                        padding: '2px 5px',
                                                                                        borderRadius: 4,
                                                                                        background: '#EFF6FF',
                                                                                        color: '#1E40AF',
                                                                                        border: '1px solid #DBEAFE'
                                                                                    },
                                                                                    children: [
                                                                                        "📍 ",
                                                                                        b.name,
                                                                                        ": ",
                                                                                        p.branchStock?.[b.id] ?? 0
                                                                                    ]
                                                                                }, b.id, true, {
                                                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                                                    lineNumber: 713,
                                                                                    columnNumber: 69
                                                                                }, this))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                                        lineNumber: 708,
                                                                        columnNumber: 61
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                                lineNumber: 692,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    textAlign: 'right',
                                                                    flexShrink: 0,
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    alignItems: 'flex-end',
                                                                    justifyContent: 'space-between',
                                                                    minHeight: 48
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                style: {
                                                                                    fontWeight: 900,
                                                                                    fontSize: 14,
                                                                                    color: '#34A853',
                                                                                    margin: 0
                                                                                },
                                                                                children: [
                                                                                    "₹",
                                                                                    p.sellingPrice
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                                                lineNumber: 722,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            (!company?.franchiseEnabled || isSubBranchLogin) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                style: {
                                                                                    fontSize: 10,
                                                                                    fontWeight: 700,
                                                                                    color: p.stockQty <= p.lowStockAlertQty ? '#EA4335' : '#718096',
                                                                                    margin: '2px 0 0'
                                                                                },
                                                                                children: [
                                                                                    p.stockQty,
                                                                                    " in stock"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                                                lineNumber: 724,
                                                                                columnNumber: 65
                                                                            }, this),
                                                                            daysLeft !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                style: {
                                                                                    fontSize: 9,
                                                                                    color: daysLeft < 7 ? '#EA4335' : '#34A853',
                                                                                    fontWeight: 800,
                                                                                    margin: '2px 0 0'
                                                                                },
                                                                                children: [
                                                                                    "Est. ",
                                                                                    daysLeft,
                                                                                    "d"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                                                lineNumber: 726,
                                                                                columnNumber: 83
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                                        lineNumber: 721,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            display: 'flex',
                                                                            gap: 8,
                                                                            marginTop: 4
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: (e)=>{
                                                                                    e.stopPropagation();
                                                                                    openEdit(p);
                                                                                },
                                                                                className: "btn btn-ghost btn-icon",
                                                                                style: {
                                                                                    padding: 4,
                                                                                    color: '#4285F4'
                                                                                },
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__["Edit2"], {
                                                                                    size: 14
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                                                    lineNumber: 729,
                                                                                    columnNumber: 200
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                                                lineNumber: 729,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: (e)=>{
                                                                                    e.stopPropagation();
                                                                                    handleDelete(p.id);
                                                                                },
                                                                                className: "btn btn-ghost btn-icon",
                                                                                style: {
                                                                                    padding: 4,
                                                                                    color: '#EA4335'
                                                                                },
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                                    size: 14
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                                                    lineNumber: 730,
                                                                                    columnNumber: 207
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                                                lineNumber: 730,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                                        lineNumber: 728,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                                lineNumber: 720,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, p.id, true, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 689,
                                                        columnNumber: 49
                                                    }, this);
                                                })
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 678,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/page.tsx",
                                lineNumber: 654,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/inventory/page.tsx",
                        lineNumber: 574,
                        columnNumber: 21
                    }, this),
                    showAdd && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "modal-overlay",
                        onClick: ()=>setShowAdd(false),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "modal-box",
                            onClick: (e)=>e.stopPropagation(),
                            style: {
                                maxWidth: 580
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
                                            children: editProduct ? 'Edit Item' : 'Add New Item'
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 748,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setShowAdd(false);
                                                setEditProduct(null);
                                            },
                                            className: "btn btn-ghost btn-icon",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 749,
                                                columnNumber: 137
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 749,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 747,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        overflowY: 'auto',
                                        padding: '18px 24px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 14
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr',
                                            gap: 12
                                        },
                                        children: [
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
                                                        children: "Item Name *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 754,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "e-input",
                                                        placeholder: "e.g. Basmati Rice (5kg)",
                                                        value: form.name,
                                                        onChange: (e)=>up('name', e.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 755,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 753,
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
                                                        children: "Category"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 758,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "e-input",
                                                        placeholder: "Grocery, Snacks…",
                                                        value: form.category,
                                                        onChange: (e)=>up('category', e.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 759,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 757,
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
                                                        children: "Item Image"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 762,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            gap: 10,
                                                            alignItems: 'center'
                                                        },
                                                        children: [
                                                            form.imageUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: form.imageUrl,
                                                                style: {
                                                                    width: 32,
                                                                    height: 32,
                                                                    borderRadius: 6,
                                                                    objectFit: 'cover'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                                lineNumber: 764,
                                                                columnNumber: 63
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "file",
                                                                accept: "image/*",
                                                                onChange: (e)=>{
                                                                    const file = e.target.files?.[0];
                                                                    if (file) {
                                                                        const reader = new FileReader();
                                                                        reader.onload = (ev)=>up('imageUrl', ev.target?.result);
                                                                        reader.readAsDataURL(file);
                                                                    }
                                                                },
                                                                style: {
                                                                    display: 'none'
                                                                },
                                                                id: "inv-img-upload"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                                lineNumber: 765,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                htmlFor: "inv-img-upload",
                                                                className: "btn btn-outline btn-sm",
                                                                style: {
                                                                    cursor: 'pointer',
                                                                    flexShrink: 0,
                                                                    padding: '0 8px',
                                                                    fontSize: 11
                                                                },
                                                                children: "Upload"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                                lineNumber: 773,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                className: "e-input",
                                                                placeholder: "Or URL",
                                                                value: form.imageUrl,
                                                                onChange: (e)=>up('imageUrl', e.target.value),
                                                                style: {
                                                                    flex: 1,
                                                                    padding: '6px 10px',
                                                                    fontSize: 12
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                                lineNumber: 774,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 763,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 761,
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
                                                        children: "Unit"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 778,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        className: "e-select",
                                                        value: form.unit,
                                                        onChange: (e)=>up('unit', e.target.value),
                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNITS"].map((u)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                children: u
                                                            }, u, false, {
                                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                                lineNumber: 780,
                                                                columnNumber: 61
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 779,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 777,
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
                                                        children: "HSN Code"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 784,
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
                                                                placeholder: "e.g. 1006",
                                                                value: form.hsnCode,
                                                                onChange: (e)=>up('hsnCode', e.target.value),
                                                                style: {
                                                                    flex: 1
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                                lineNumber: 786,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: handleHsnFetch,
                                                                disabled: hsnLoading,
                                                                className: "btn btn-blue btn-sm",
                                                                style: {
                                                                    flexShrink: 0,
                                                                    padding: '0 10px'
                                                                },
                                                                children: hsnLoading ? '…' : 'Fetch'
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                                lineNumber: 787,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 785,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 783,
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
                                                        children: "GST Rate"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 793,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        className: "e-select",
                                                        value: form.gstRate,
                                                        onChange: (e)=>up('gstRate', e.target.value),
                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GST_RATES"].map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: r,
                                                                children: [
                                                                    r,
                                                                    "%"
                                                                ]
                                                            }, r, true, {
                                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                                lineNumber: 795,
                                                                columnNumber: 65
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 794,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 792,
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
                                                        children: "Barcode"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 799,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "e-input",
                                                        placeholder: "Scan or enter barcode",
                                                        value: form.barcode,
                                                        onChange: (e)=>up('barcode', e.target.value),
                                                        style: {
                                                            fontFamily: 'monospace'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 800,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 798,
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
                                                        children: "Purchase Price ₹"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 803,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        className: "e-input",
                                                        placeholder: "0.00",
                                                        value: form.purchasePrice,
                                                        onChange: (e)=>up('purchasePrice', e.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 804,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 802,
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
                                                        children: "Selling Price ₹"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 807,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        className: "e-input",
                                                        placeholder: "0.00",
                                                        value: form.sellingPrice,
                                                        onChange: (e)=>up('sellingPrice', e.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 808,
                                                        columnNumber: 41
                                                    }, this),
                                                    form.purchasePrice && form.sellingPrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 10,
                                                            color: '#34A853',
                                                            fontWeight: 700,
                                                            marginTop: 4
                                                        },
                                                        children: [
                                                            "Margin: ₹",
                                                            (parseFloat(form.sellingPrice) - parseFloat(form.purchasePrice)).toFixed(2),
                                                            " (",
                                                            ((parseFloat(form.sellingPrice) - parseFloat(form.purchasePrice)) / parseFloat(form.purchasePrice) * 100).toFixed(1),
                                                            "%)"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 810,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 806,
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
                                                        children: "Current Stock"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 816,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        className: "e-input",
                                                        placeholder: "0",
                                                        value: form.stockQty,
                                                        onChange: (e)=>up('stockQty', e.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 817,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 815,
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
                                                        children: "Low Stock Alert at"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 820,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        className: "e-input",
                                                        placeholder: "5",
                                                        value: form.lowStockAlertQty,
                                                        onChange: (e)=>up('lowStockAlertQty', e.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 821,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 819,
                                                columnNumber: 37
                                            }, this),
                                            godowns.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                        children: "Godown"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 825,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        className: "e-select",
                                                        value: form.godownId,
                                                        onChange: (e)=>up('godownId', e.target.value),
                                                        children: godowns.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: g.id,
                                                                children: g.name
                                                            }, g.id, false, {
                                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                                lineNumber: 827,
                                                                columnNumber: 67
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 826,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 824,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    gridColumn: '1/-1',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 10
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>up('taxIncluded', !form.taxIncluded),
                                                        style: {
                                                            width: 40,
                                                            height: 22,
                                                            borderRadius: 999,
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            background: form.taxIncluded ? '#34A853' : '#CBD5E0',
                                                            position: 'relative',
                                                            flexShrink: 0,
                                                            transition: 'background 0.2s'
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                position: 'absolute',
                                                                top: 2,
                                                                left: form.taxIncluded ? 18 : 2,
                                                                width: 18,
                                                                height: 18,
                                                                background: 'white',
                                                                borderRadius: 999,
                                                                transition: 'left 0.2s'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/page.tsx",
                                                            lineNumber: 835,
                                                            columnNumber: 45
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 833,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: 12,
                                                            fontWeight: 600,
                                                            color: '#4A5568'
                                                        },
                                                        children: "GST included in selling price"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 837,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 832,
                                                columnNumber: 37
                                            }, this),
                                            company?.franchiseEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    gridColumn: '1/-1',
                                                    borderTop: '1px solid #E2E8F0',
                                                    paddingTop: 14,
                                                    marginTop: 4
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        style: {
                                                            fontSize: 11,
                                                            fontWeight: 800,
                                                            color: '#1A1A2E',
                                                            marginBottom: 10,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.05em'
                                                        },
                                                        children: "Branch Inventory & Price Overrides"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 841,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            gap: 8
                                                        },
                                                        children: (company.branches || []).map((b)=>{
                                                            const bStock = form.branchStock?.[b.id] ?? '';
                                                            const bPrice = form.branchPrice?.[b.id] ?? '';
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'grid',
                                                                    gridTemplateColumns: '1.2fr 1fr 1fr',
                                                                    gap: 10,
                                                                    alignItems: 'center',
                                                                    background: '#F8FAFC',
                                                                    padding: 10,
                                                                    borderRadius: 10,
                                                                    border: '1px solid #E2E8F0'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontSize: 12,
                                                                            fontWeight: 700,
                                                                            color: '#2D3748'
                                                                        },
                                                                        children: [
                                                                            "📍 ",
                                                                            b.name
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                                        lineNumber: 848,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                style: {
                                                                                    fontSize: 9,
                                                                                    fontWeight: 700,
                                                                                    color: '#718096',
                                                                                    display: 'block',
                                                                                    marginBottom: 2
                                                                                },
                                                                                children: "BRANCH STOCK"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                                                lineNumber: 850,
                                                                                columnNumber: 65
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "number",
                                                                                className: "e-input",
                                                                                style: {
                                                                                    padding: '6px 10px',
                                                                                    fontSize: 12
                                                                                },
                                                                                placeholder: "0",
                                                                                value: bStock,
                                                                                onChange: (e)=>{
                                                                                    const nextStock = {
                                                                                        ...form.branchStock || {}
                                                                                    };
                                                                                    nextStock[b.id] = e.target.value === '' ? 0 : parseFloat(e.target.value) || 0;
                                                                                    up('branchStock', nextStock);
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                                                lineNumber: 851,
                                                                                columnNumber: 65
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                                        lineNumber: 849,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                style: {
                                                                                    fontSize: 9,
                                                                                    fontWeight: 700,
                                                                                    color: '#718096',
                                                                                    display: 'block',
                                                                                    marginBottom: 2
                                                                                },
                                                                                children: "SELLING PRICE"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                                                lineNumber: 865,
                                                                                columnNumber: 65
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "number",
                                                                                className: "e-input",
                                                                                style: {
                                                                                    padding: '6px 10px',
                                                                                    fontSize: 12
                                                                                },
                                                                                placeholder: `Default ₹${form.sellingPrice || 0}`,
                                                                                value: bPrice,
                                                                                onChange: (e)=>{
                                                                                    const nextPrice = {
                                                                                        ...form.branchPrice || {}
                                                                                    };
                                                                                    if (e.target.value === '') {
                                                                                        delete nextPrice[b.id];
                                                                                    } else {
                                                                                        nextPrice[b.id] = parseFloat(e.target.value) || 0;
                                                                                    }
                                                                                    up('branchPrice', nextPrice);
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                                                lineNumber: 866,
                                                                                columnNumber: 65
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                                        lineNumber: 864,
                                                                        columnNumber: 61
                                                                    }, this)
                                                                ]
                                                            }, b.id, true, {
                                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                                lineNumber: 847,
                                                                columnNumber: 57
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 842,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 840,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/inventory/page.tsx",
                                        lineNumber: 752,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 751,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: '14px 24px',
                                        borderTop: '1px solid #E1E4E8',
                                        display: 'flex',
                                        gap: 10,
                                        justifyContent: 'flex-end'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setShowAdd(false);
                                                setEditProduct(null);
                                            },
                                            className: "btn btn-outline",
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 892,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleSave,
                                            className: "btn btn-blue",
                                            children: editProduct ? 'Update Item' : 'Add Item'
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 893,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 891,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/inventory/page.tsx",
                            lineNumber: 746,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/company/inventory/page.tsx",
                        lineNumber: 745,
                        columnNumber: 21
                    }, this),
                    showImport && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "modal-overlay",
                        onClick: ()=>setShowImport(false),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "modal-box",
                            onClick: (e)=>e.stopPropagation(),
                            style: {
                                maxWidth: 400
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
                                                fontSize: 17
                                            },
                                            children: "Bulk Import Stocks"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 904,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowImport(false),
                                            className: "btn btn-ghost btn-icon",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 905,
                                                columnNumber: 113
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 905,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 903,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: '20px 24px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 16
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 13,
                                                color: '#718096'
                                            },
                                            children: "Upload a CSV file to add multiple items at once."
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 908,
                                            columnNumber: 33
                                        }, this),
                                        godowns.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: {
                                                        fontSize: 11,
                                                        fontWeight: 700,
                                                        color: '#4A5568',
                                                        display: 'block',
                                                        marginBottom: 5
                                                    },
                                                    children: "Select Godown for Import"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 911,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: "e-select",
                                                    value: importGodownId,
                                                    onChange: (e)=>setImportGodownId(e.target.value),
                                                    children: godowns.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: g.id,
                                                            children: g.name
                                                        }, g.id, false, {
                                                            fileName: "[project]/app/company/inventory/page.tsx",
                                                            lineNumber: 913,
                                                            columnNumber: 63
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 912,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 910,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>importRef.current?.click(),
                                            className: "btn btn-blue",
                                            style: {
                                                width: '100%',
                                                justifyContent: 'center'
                                            },
                                            children: "Choose CSV File"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 917,
                                            columnNumber: 33
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
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 920,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 907,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/inventory/page.tsx",
                            lineNumber: 902,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/company/inventory/page.tsx",
                        lineNumber: 901,
                        columnNumber: 21
                    }, this),
                    showTransfer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "modal-overlay",
                        onClick: ()=>setShowTransfer(false),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "modal-box",
                            onClick: (e)=>e.stopPropagation(),
                            style: {
                                maxWidth: 450
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
                                                fontSize: 17
                                            },
                                            children: "Transfer Stocks"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 931,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowTransfer(false),
                                            className: "btn btn-ghost btn-icon",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 932,
                                                columnNumber: 115
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 932,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 930,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: '20px 24px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 16
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 13,
                                                color: '#718096',
                                                marginBottom: 10
                                            },
                                            children: [
                                                "Transfer quantities from one Godown to another by uploading an excel/CSV sheet. ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 935,
                                                    columnNumber: 177
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 935,
                                                    columnNumber: 183
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Format:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 935,
                                                    columnNumber: 189
                                                }, this),
                                                " Row 1 Headers, Col 1 = Barcode/Name, Col 2 = Transfer Qty."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 935,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'grid',
                                                gridTemplateColumns: '1fr 40px 1fr',
                                                gap: 10,
                                                alignItems: 'center'
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
                                                            children: "From Godown"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/page.tsx",
                                                            lineNumber: 939,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            className: "e-select",
                                                            value: transferFrom,
                                                            onChange: (e)=>setTransferFrom(e.target.value),
                                                            children: godowns.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: g.id,
                                                                    children: g.name
                                                                }, g.id, false, {
                                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                                    lineNumber: 941,
                                                                    columnNumber: 63
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/page.tsx",
                                                            lineNumber: 940,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 938,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        textAlign: 'center',
                                                        marginTop: 18
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightLeft$3e$__["ArrowRightLeft"], {
                                                        size: 16,
                                                        color: "#A0AEC0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 944,
                                                        columnNumber: 89
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 944,
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
                                                                marginBottom: 5
                                                            },
                                                            children: "To Godown"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/page.tsx",
                                                            lineNumber: 946,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            className: "e-select",
                                                            value: transferTo,
                                                            onChange: (e)=>setTransferTo(e.target.value),
                                                            children: godowns.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: g.id,
                                                                    children: g.name
                                                                }, g.id, false, {
                                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                                    lineNumber: 948,
                                                                    columnNumber: 63
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/page.tsx",
                                                            lineNumber: 947,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 945,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 937,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>transferRef.current?.click(),
                                            className: "btn btn-blue",
                                            style: {
                                                width: '100%',
                                                justifyContent: 'center',
                                                marginTop: 10,
                                                background: '#9333EA',
                                                color: '#fff'
                                            },
                                            children: "Upload Transfer CSV"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 953,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            ref: transferRef,
                                            type: "file",
                                            accept: ".csv",
                                            onChange: handleTransferProcess,
                                            style: {
                                                display: 'none'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 956,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 934,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/inventory/page.tsx",
                            lineNumber: 929,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/company/inventory/page.tsx",
                        lineNumber: 928,
                        columnNumber: 21
                    }, this),
                    showAIAdd && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AIAddItemModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        onClose: ()=>setShowAIAdd(false),
                        onGeminiScanned: handleGeminiScanned
                    }, void 0, false, {
                        fileName: "[project]/app/company/inventory/page.tsx",
                        lineNumber: 962,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/inventory/page.tsx",
                lineNumber: 537,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
                .desktop-table { display: none; }
                .mobile-list { display: block; }
                @media (min-width: 768px) {
                  .desktop-table { display: block; }
                  .mobile-list { display: none; }
                }

                /* ── Dynamic responsive label visibility ── */
                .mobile-only-inline { display: inline; }
                .desktop-only-inline { display: none; }
                @media (min-width: 640px) {
                    .mobile-only-inline { display: none; }
                    .desktop-only-inline { display: inline; }
                }

                /* ── Inventory tab bar ─────────────────────────────── */
                .inv-tab-bar {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 6px;
                    background: #F1F5F9;
                    border-radius: 14px;
                    padding: 5px;
                    margin-bottom: 4px;
                }
                .inv-tab-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 5px;
                    padding: 8px 6px;
                    border: none;
                    border-radius: 10px;
                    background: transparent;
                    font-size: 11px;
                    font-weight: 700;
                    color: #718096;
                    cursor: pointer;
                    transition: all 0.18s cubic-bezier(0.4,0,0.2,1);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .inv-tab-active {
                    background: white;
                    color: #1A1A2E;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }

                @media (min-width: 480px) and (max-width: 639px) {
                    .inv-tab-bar {
                        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
                    }
                }

                @media (min-width: 640px) {
                    .inv-tab-bar {
                        display: flex;
                        grid-template-columns: unset;
                        gap: 0;
                        background: transparent;
                        border-radius: 0;
                        padding: 0;
                        border-bottom: 1px solid #E2E8F0;
                        margin-bottom: 8px;
                    }
                    .inv-tab-btn {
                        padding: 10px 20px;
                        border-radius: 0;
                        background: none;
                        font-size: 13px;
                        font-weight: 600;
                        color: #A0AEC0;
                        border-bottom: 3px solid transparent;
                        box-shadow: none;
                        overflow: visible;
                    }
                    .inv-tab-active {
                        background: none;
                        color: #1A1A2E;
                        font-weight: 900;
                        border-bottom: 3px solid #4285F4;
                        box-shadow: none;
                    }
                }

                /* ── Compact Header Stats (Mobile friendly columns) ── */
                .inv-stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 8px;
                    width: 100%;
                }
                .inv-stats-card {
                    padding: 8px 6px !important;
                    display: flex !important;
                    flex-direction: column !important;
                    align-items: center !important;
                    text-align: center;
                    gap: 4px !important;
                    border-radius: 12px !important;
                    min-width: 0;
                }
                .inv-stats-icon-wrapper {
                    width: 28px !important;
                    height: 28px !important;
                    border-radius: 8px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    margin-bottom: 2px;
                }
                .inv-stats-label {
                    font-size: 8px !important;
                    font-weight: 700;
                    color: #A0AEC0;
                    text-transform: uppercase;
                    margin: 0 !important;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    width: 100%;
                }
                .inv-stats-value {
                    font-size: 13px !important;
                    font-weight: 900;
                    color: #1A1A2E;
                    margin: 0 !important;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    width: 100%;
                }

                @media (min-width: 640px) {
                    .inv-stats-grid {
                        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                        gap: 14px;
                    }
                    .inv-stats-card {
                        padding: 18px 20px !important;
                        flex-direction: row !important;
                        align-items: center !important;
                        text-align: left;
                        gap: 14px !important;
                        border-radius: 16px !important;
                    }
                    .inv-stats-icon-wrapper {
                        width: 44px !important;
                        height: 44px !important;
                        border-radius: 12px !important;
                        margin-bottom: 0;
                    }
                    .inv-stats-label {
                        font-size: 10px !important;
                        margin-bottom: 4px !important;
                    }
                    .inv-stats-value {
                        font-size: 20px !important;
                    }
                }

                /* ── Controls & Flat Actions layout ── */
                .controls-container {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 10px;
                }
                .search-bar-wrapper {
                    flex: 1;
                    min-width: 200px;
                    position: relative;
                }
                .godown-filters-container {
                    display: flex;
                    gap: 6px;
                }

                @media (max-width: 767px) {
                    .controls-container {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 8px;
                        width: 100%;
                    }
                    .search-bar-wrapper {
                        grid-column: span 2;
                        width: 100%;
                        min-width: 0;
                    }
                    .godown-filters-container {
                        grid-column: span 2;
                        gap: 8px;
                        overflow-x: auto;
                        padding-bottom: 4px;
                        scrollbar-width: none;
                    }
                    .godown-filters-container::-webkit-scrollbar {
                        display: none;
                    }
                    .btn-primary-action {
                        grid-column: span 1;
                        width: 100%;
                        height: 38px;
                        font-size: 12px !important;
                        justify-content: center;
                    }
                    .btn-danger-action {
                        grid-column: span 2;
                        width: 100%;
                        height: 38px;
                        font-size: 12px !important;
                        justify-content: center;
                    }
                    .btn-sec {
                        grid-column: span 1;
                        width: 100%;
                        height: 34px;
                        font-size: 11px !important;
                        justify-content: center;
                    }
                }

                .godown-chip {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    padding: 5px 12px;
                    border-radius: 20px;
                    border: 1.5px solid #E2E8F0;
                    background: white;
                    font-size: 12px;
                    font-weight: 700;
                    color: #718096;
                    cursor: pointer;
                    transition: all 0.15s;
                }
                .godown-chip.active {
                    background: #EBF4FF;
                    color: #4285F4;
                    border-color: #4285F4;
                }
            `
            }, void 0, false, {
                fileName: "[project]/app/company/inventory/page.tsx",
                lineNumber: 968,
                columnNumber: 13
            }, this),
            selectedQrProduct && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$QrLabelModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                product: selectedQrProduct,
                company: company,
                onClose: ()=>setSelectedQrProduct(null)
            }, void 0, false, {
                fileName: "[project]/app/company/inventory/page.tsx",
                lineNumber: 1215,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true);
}
_s(InventoryPage, "dTRQsC8IDx2l8oLri+r0FSDNhSA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActiveCompany"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c1 = InventoryPage;
function OffersTab() {
    _s1();
    const { activeCompanyId, addOfferScheme, deleteOfferScheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const company = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActiveCompany"])();
    const products = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"])('products');
    const [showAddOffer, setShowAddOffer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [offerType, setOfferType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('bogo');
    const [offerName, setOfferName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // BOGO inputs
    const [buyProduct, setBuyProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [buyQty, setBuyQty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('1');
    const [getProduct, setGetProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [getQty, setGetQty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('1');
    const [bogoDiscount, setBogoDiscount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('100'); // 100% discount on the getProduct
    // Discount inputs
    const [discProduct, setDiscProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [discPercent, setDiscPercent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('50'); // e.g. 50%
    // Combo inputs
    const [comboProducts, setComboProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [comboPrice, setComboPrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const activeOffers = company?.offers || [];
    const handleCreateOffer = ()=>{
        if (!offerName.trim()) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Enter an offer name');
            return;
        }
        let offerData = {
            type: offerType,
            name: offerName,
            isActive: true
        };
        if (offerType === 'bogo') {
            if (!buyProduct || !getProduct) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Please select both buy and get products');
                return;
            }
            offerData.buyProductId = buyProduct;
            offerData.buyQty = parseInt(buyQty) || 1;
            offerData.getProductId = getProduct;
            offerData.getQty = parseInt(getQty) || 1;
            offerData.discountPercent = parseFloat(bogoDiscount) || 100;
        } else if (offerType === 'discount') {
            if (!discProduct) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Please select a product');
                return;
            }
            offerData.buyProductId = discProduct; // reuse buyProductId
            offerData.discountPercent = parseFloat(discPercent) || 50;
        } else if (offerType === 'combo') {
            if (comboProducts.length < 2) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Please select at least 2 products for the combo');
                return;
            }
            if (!comboPrice || parseFloat(comboPrice) <= 0) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Enter a valid combo price');
                return;
            }
            offerData.comboProductIds = comboProducts;
            offerData.comboPrice = parseFloat(comboPrice) || 0;
        }
        addOfferScheme(activeCompanyId, offerData);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success(`Offer "${offerName}" created successfully!`);
        setShowAddOffer(false);
        // Reset form
        setOfferName('');
        setBuyProduct('');
        setBuyQty('1');
        setGetProduct('');
        setGetQty('1');
        setBogoDiscount('100');
        setDiscProduct('');
        setDiscPercent('50');
        setComboProducts([]);
        setComboPrice('');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    alignItems: 'center'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    fontWeight: 900,
                                    fontSize: 18,
                                    color: '#1A1A2E',
                                    margin: 0
                                },
                                children: "Schemes & Offers Manager"
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/page.tsx",
                                lineNumber: 1299,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 13,
                                    color: '#718096',
                                    margin: '4px 0 0'
                                },
                                children: "Configure BOGO, percentage discounts, and combo bundle offers for your catalog."
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/page.tsx",
                                lineNumber: 1300,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/inventory/page.tsx",
                        lineNumber: 1298,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowAddOffer(true),
                        className: "btn btn-blue btn-sm",
                        style: {
                            gap: 5
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                size: 13
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/page.tsx",
                                lineNumber: 1303,
                                columnNumber: 21
                            }, this),
                            " Create Offer"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/inventory/page.tsx",
                        lineNumber: 1302,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/inventory/page.tsx",
                lineNumber: 1297,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card",
                style: {
                    padding: 20
                },
                children: activeOffers.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        textAlign: 'center',
                        padding: '40px 0'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"], {
                            size: 40,
                            style: {
                                color: '#E2E8F0',
                                margin: '0 auto 12px'
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/company/inventory/page.tsx",
                            lineNumber: 1311,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                color: '#A0AEC0',
                                fontWeight: 600,
                                fontSize: 14,
                                margin: 0
                            },
                            children: "No active offers configured yet."
                        }, void 0, false, {
                            fileName: "[project]/app/company/inventory/page.tsx",
                            lineNumber: 1312,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setShowAddOffer(true),
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
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 1314,
                                    columnNumber: 29
                                }, this),
                                " Add Offer"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/inventory/page.tsx",
                            lineNumber: 1313,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/company/inventory/page.tsx",
                    lineNumber: 1310,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                            children: "Offer Name"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 1322,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            children: "Type"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 1323,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            children: "Details"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 1324,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            style: {
                                                width: 100,
                                                textAlign: 'center'
                                            },
                                            children: "Actions"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 1325,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 1321,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/page.tsx",
                                lineNumber: 1320,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: activeOffers.map((o)=>{
                                    let detailsText = '';
                                    if (o.type === 'bogo') {
                                        const buyP = products.find((p)=>p.id === o.buyProductId)?.name || 'Unknown Item';
                                        const getP = products.find((p)=>p.id === o.getProductId)?.name || 'Unknown Item';
                                        detailsText = `Buy ${o.buyQty} of "${buyP}" and get ${o.getQty} of "${getP}" at ${o.discountPercent}% off`;
                                    } else if (o.type === 'discount') {
                                        const buyP = products.find((p)=>p.id === o.buyProductId)?.name || 'Unknown Item';
                                        detailsText = `Flat ${o.discountPercent}% Off on "${buyP}"`;
                                    } else if (o.type === 'combo') {
                                        const itemsText = o.comboProductIds.map((pid)=>products.find((p)=>p.id === pid)?.name || 'Unknown Item').join(' + ');
                                        detailsText = `Get [ ${itemsText} ] together for a combo price of ₹${o.comboPrice}`;
                                    }
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    fontWeight: 800,
                                                    color: '#1A1A2E'
                                                },
                                                children: o.name
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 1345,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `badge ${o.type === 'bogo' ? 'badge-green' : o.type === 'discount' ? 'badge-blue' : 'badge-gray'}`,
                                                    style: {
                                                        textTransform: 'uppercase'
                                                    },
                                                    children: o.type
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 1347,
                                                    columnNumber: 49
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 1346,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    fontSize: 13,
                                                    color: '#4A5568'
                                                },
                                                children: detailsText
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 1351,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    textAlign: 'center'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>deleteOfferScheme(activeCompanyId, o.id),
                                                    className: "btn btn-ghost btn-icon",
                                                    style: {
                                                        color: '#EA4335',
                                                        padding: 6
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                        size: 14
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 1354,
                                                        columnNumber: 53
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 1353,
                                                    columnNumber: 49
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 1352,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, o.id, true, {
                                        fileName: "[project]/app/company/inventory/page.tsx",
                                        lineNumber: 1344,
                                        columnNumber: 41
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/page.tsx",
                                lineNumber: 1328,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/inventory/page.tsx",
                        lineNumber: 1319,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/company/inventory/page.tsx",
                    lineNumber: 1318,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/company/inventory/page.tsx",
                lineNumber: 1308,
                columnNumber: 13
            }, this),
            showAddOffer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "modal-overlay",
                onClick: ()=>setShowAddOffer(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modal-box",
                    onClick: (e)=>e.stopPropagation(),
                    style: {
                        maxWidth: 500,
                        maxHeight: '85vh',
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
                                justifyContent: 'space-between',
                                flexShrink: 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    style: {
                                        fontWeight: 900,
                                        fontSize: 17,
                                        color: '#1A1A2E',
                                        margin: 0
                                    },
                                    children: "Create Promotional Offer"
                                }, void 0, false, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 1371,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowAddOffer(false),
                                    className: "btn btn-ghost btn-icon",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/inventory/page.tsx",
                                        lineNumber: 1372,
                                        columnNumber: 111
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 1372,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/inventory/page.tsx",
                            lineNumber: 1370,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                overflowY: 'auto',
                                padding: '18px 24px',
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
                                                display: 'block',
                                                marginBottom: 5,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em'
                                            },
                                            children: "Offer Name *"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 1376,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            className: "e-input",
                                            placeholder: "e.g. Soap Buy 1 Get 1 Free",
                                            value: offerName,
                                            onChange: (e)=>setOfferName(e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 1377,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 1375,
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
                                                marginBottom: 8,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em'
                                            },
                                            children: "Offer Type"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 1381,
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
                                                {
                                                    key: 'bogo',
                                                    label: 'BOGO / Free'
                                                },
                                                {
                                                    key: 'discount',
                                                    label: 'Flat % Off'
                                                },
                                                {
                                                    key: 'combo',
                                                    label: 'Combo Deal'
                                                }
                                            ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setOfferType(t.key),
                                                    style: {
                                                        flex: 1,
                                                        padding: '8px',
                                                        borderRadius: 8,
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        fontWeight: 800,
                                                        fontSize: 12,
                                                        background: offerType === t.key ? '#4285F4' : 'transparent',
                                                        color: offerType === t.key ? 'white' : '#718096',
                                                        transition: 'all 0.15s'
                                                    },
                                                    children: t.label
                                                }, t.key, false, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 1388,
                                                    columnNumber: 41
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 1382,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 1380,
                                    columnNumber: 29
                                }, this),
                                offerType === 'bogo' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 12
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'grid',
                                                gridTemplateColumns: '2fr 1fr',
                                                gap: 10
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
                                                            children: "Buy Product *"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/page.tsx",
                                                            lineNumber: 1401,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            className: "e-select",
                                                            value: buyProduct,
                                                            onChange: (e)=>setBuyProduct(e.target.value),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    children: "Select Product..."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                                    lineNumber: 1403,
                                                                    columnNumber: 49
                                                                }, this),
                                                                products.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: p.id,
                                                                        children: p.name
                                                                    }, p.id, false, {
                                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                                        lineNumber: 1404,
                                                                        columnNumber: 68
                                                                    }, this))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/inventory/page.tsx",
                                                            lineNumber: 1402,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 1400,
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
                                                                marginBottom: 5
                                                            },
                                                            children: "Qty *"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/page.tsx",
                                                            lineNumber: 1408,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            min: "1",
                                                            className: "e-input",
                                                            value: buyQty,
                                                            onChange: (e)=>setBuyQty(e.target.value)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/page.tsx",
                                                            lineNumber: 1409,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 1407,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 1399,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'grid',
                                                gridTemplateColumns: '2fr 1fr',
                                                gap: 10
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
                                                            children: "Get Product *"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/page.tsx",
                                                            lineNumber: 1415,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            className: "e-select",
                                                            value: getProduct,
                                                            onChange: (e)=>setGetProduct(e.target.value),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    children: "Select Product..."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                                    lineNumber: 1417,
                                                                    columnNumber: 49
                                                                }, this),
                                                                products.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: p.id,
                                                                        children: p.name
                                                                    }, p.id, false, {
                                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                                        lineNumber: 1418,
                                                                        columnNumber: 68
                                                                    }, this))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/company/inventory/page.tsx",
                                                            lineNumber: 1416,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 1414,
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
                                                                marginBottom: 5
                                                            },
                                                            children: "Qty *"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/page.tsx",
                                                            lineNumber: 1422,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            min: "1",
                                                            className: "e-input",
                                                            value: getQty,
                                                            onChange: (e)=>setGetQty(e.target.value)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/page.tsx",
                                                            lineNumber: 1423,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 1421,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 1413,
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
                                                        marginBottom: 5
                                                    },
                                                    children: "Discount % on Free Product (100 = Free) *"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 1428,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    min: "1",
                                                    max: "100",
                                                    className: "e-input",
                                                    value: bogoDiscount,
                                                    onChange: (e)=>setBogoDiscount(e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 1429,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 1427,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 1398,
                                    columnNumber: 33
                                }, this),
                                offerType === 'discount' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        flexDirection: 'column',
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
                                                        display: 'block',
                                                        marginBottom: 5
                                                    },
                                                    children: "Select Product *"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 1438,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: "e-select",
                                                    value: discProduct,
                                                    onChange: (e)=>setDiscProduct(e.target.value),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "Select Product..."
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/page.tsx",
                                                            lineNumber: 1440,
                                                            columnNumber: 45
                                                        }, this),
                                                        products.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: p.id,
                                                                children: p.name
                                                            }, p.id, false, {
                                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                                lineNumber: 1441,
                                                                columnNumber: 64
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 1439,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 1437,
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
                                                        marginBottom: 5
                                                    },
                                                    children: "Discount Percentage (%) *"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 1445,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    min: "1",
                                                    max: "100",
                                                    className: "e-input",
                                                    value: discPercent,
                                                    onChange: (e)=>setDiscPercent(e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 1446,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 1444,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 1436,
                                    columnNumber: 33
                                }, this),
                                offerType === 'combo' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        flexDirection: 'column',
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
                                                        display: 'block',
                                                        marginBottom: 5
                                                    },
                                                    children: "Products in Combo *"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 1455,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontSize: 11,
                                                        color: '#718096',
                                                        marginBottom: 8
                                                    },
                                                    children: "Hold Ctrl (or Cmd) to select multiple products."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 1456,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    multiple: true,
                                                    className: "e-select",
                                                    style: {
                                                        height: 160
                                                    },
                                                    value: comboProducts,
                                                    onChange: (e)=>{
                                                        const opts = Array.from(e.target.selectedOptions, (o)=>o.value);
                                                        setComboProducts(opts);
                                                    },
                                                    children: products.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: p.id,
                                                            children: p.name
                                                        }, p.id, false, {
                                                            fileName: "[project]/app/company/inventory/page.tsx",
                                                            lineNumber: 1467,
                                                            columnNumber: 64
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 1457,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 1454,
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
                                                        marginBottom: 5
                                                    },
                                                    children: "Combo Package Price (₹) *"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 1471,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    min: "1",
                                                    className: "e-input",
                                                    placeholder: "Combo Total Price",
                                                    value: comboPrice,
                                                    onChange: (e)=>setComboPrice(e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 1472,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 1470,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 1453,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/inventory/page.tsx",
                            lineNumber: 1374,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '14px 24px',
                                borderTop: '1px solid #E1E4E8',
                                display: 'flex',
                                gap: 10,
                                justifyContent: 'flex-end',
                                flexShrink: 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowAddOffer(false),
                                    className: "btn btn-outline",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 1478,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleCreateOffer,
                                    className: "btn btn-blue",
                                    children: "Save Offer"
                                }, void 0, false, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 1479,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/inventory/page.tsx",
                            lineNumber: 1477,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/company/inventory/page.tsx",
                    lineNumber: 1369,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/company/inventory/page.tsx",
                lineNumber: 1368,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/company/inventory/page.tsx",
        lineNumber: 1295,
        columnNumber: 9
    }, this);
}
_s1(OffersTab, "3ALchy/ntD4FL5Z1IHSNzI1Vr34=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActiveCompany"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyData"]
    ];
});
_c2 = OffersTab;
function BranchTransfersTab() {
    _s2();
    const { activeCompanyId, activeBranchId, isSubBranchLogin, stockTransfers = [], addStockTransfer, approveStockTransfer, rejectStockTransfer, products } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const company = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActiveCompany"])();
    const companyId = activeCompanyId;
    const [showModal, setShowModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [productId, setProductId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [fromBranchId, setFromBranchId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [toBranchId, setToBranchId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [qty, setQty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const filteredTransfers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BranchTransfersTab.useMemo[filteredTransfers]": ()=>{
            const companyTransfers = (stockTransfers || []).filter({
                "BranchTransfersTab.useMemo[filteredTransfers].companyTransfers": (t)=>t.companyId === companyId
            }["BranchTransfersTab.useMemo[filteredTransfers].companyTransfers"]);
            if (isSubBranchLogin) {
                return companyTransfers.filter({
                    "BranchTransfersTab.useMemo[filteredTransfers]": (t)=>t.fromBranchId === activeBranchId || t.toBranchId === activeBranchId
                }["BranchTransfersTab.useMemo[filteredTransfers]"]);
            }
            return companyTransfers;
        }
    }["BranchTransfersTab.useMemo[filteredTransfers]"], [
        stockTransfers,
        companyId,
        isSubBranchLogin,
        activeBranchId
    ]);
    const handleCreateTransfer = (e)=>{
        e.preventDefault();
        if (!productId || !fromBranchId || !toBranchId || !qty) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('All fields are required');
            return;
        }
        if (fromBranchId === toBranchId) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Source and destination branches cannot be the same');
            return;
        }
        const transferQtyNum = parseFloat(qty);
        if (isNaN(transferQtyNum) || transferQtyNum <= 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Invalid quantity');
            return;
        }
        const selectedProduct = products.find((p)=>p.id === productId);
        if (!selectedProduct) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Product not found');
            return;
        }
        const sourceStock = isSubBranchLogin ? selectedProduct.branchStock?.[fromBranchId] ?? 0 : fromBranchId === 'head_office' ? selectedProduct.stockQty : selectedProduct.branchStock?.[fromBranchId] ?? 0;
        if (sourceStock < transferQtyNum) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error(`Insufficient stock in source branch/office. Available: ${sourceStock}`);
            return;
        }
        addStockTransfer({
            companyId: companyId,
            fromBranchId,
            toBranchId,
            productId,
            productName: selectedProduct.name,
            qty: transferQtyNum
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Stock transfer request submitted!');
        setShowModal(false);
        setProductId('');
        setQty('');
        setToBranchId('');
    };
    const getBranchName = (id)=>{
        if (id === 'head_office' || !id) return 'Head Office';
        return company?.branches?.find((b)=>b.id === id)?.name || 'Unknown Branch';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'flex',
            flexDirection: 'column',
            gap: 16
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        style: {
                            fontSize: 16,
                            fontWeight: 800,
                            color: '#1A1A2E'
                        },
                        children: "Branch Stock Movements"
                    }, void 0, false, {
                        fileName: "[project]/app/company/inventory/page.tsx",
                        lineNumber: 1565,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setShowModal(true);
                            if (isSubBranchLogin) {
                                setFromBranchId(activeBranchId || '');
                            }
                        },
                        className: "btn btn-blue btn-sm",
                        style: {
                            gap: 5
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                size: 13
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/page.tsx",
                                lineNumber: 1572,
                                columnNumber: 21
                            }, this),
                            " Request Transfer"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/inventory/page.tsx",
                        lineNumber: 1566,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/inventory/page.tsx",
                lineNumber: 1564,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card",
                style: {
                    overflow: 'hidden'
                },
                children: filteredTransfers.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        textAlign: 'center',
                        padding: '40px 20px',
                        color: '#A0AEC0'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightLeft$3e$__["ArrowRightLeft"], {
                            size: 36,
                            style: {
                                margin: '0 auto 12px',
                                opacity: 0.5
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/company/inventory/page.tsx",
                            lineNumber: 1579,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontWeight: 600
                            },
                            children: "No stock transfers found"
                        }, void 0, false, {
                            fileName: "[project]/app/company/inventory/page.tsx",
                            lineNumber: 1580,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/company/inventory/page.tsx",
                    lineNumber: 1578,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        overflowX: 'auto'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "e-table",
                        style: {
                            minWidth: 600
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            children: "Date"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 1587,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            children: "Product"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 1588,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            children: "From"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 1589,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            children: "To"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 1590,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            children: "Qty"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 1591,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            children: "Status"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 1592,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            children: "Actions"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 1593,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 1586,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/page.tsx",
                                lineNumber: 1585,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: filteredTransfers.map((t)=>{
                                    const statusColors = {
                                        pending: {
                                            bg: '#FEF3C7',
                                            text: '#D97706'
                                        },
                                        approved: {
                                            bg: '#D1FAE5',
                                            text: '#059669'
                                        },
                                        rejected: {
                                            bg: '#FEE2E2',
                                            text: '#DC2626'
                                        }
                                    };
                                    const colors = statusColors[t.status] || {
                                        bg: '#F3F4F6',
                                        text: '#374151'
                                    };
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    fontSize: 12,
                                                    color: '#718096'
                                                },
                                                children: new Date(t.createdAt).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 1607,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    fontWeight: 700
                                                },
                                                children: t.productName
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 1610,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                children: getBranchName(t.fromBranchId)
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 1611,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                children: getBranchName(t.toBranchId)
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 1612,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    fontWeight: 800
                                                },
                                                children: t.qty
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 1613,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 10,
                                                        fontWeight: 800,
                                                        padding: '3px 8px',
                                                        borderRadius: 999,
                                                        background: colors.bg,
                                                        color: colors.text,
                                                        textTransform: 'uppercase'
                                                    },
                                                    children: t.status
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 1615,
                                                    columnNumber: 49
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 1614,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                children: [
                                                    t.status === 'pending' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            gap: 6
                                                        },
                                                        children: !isSubBranchLogin ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>{
                                                                        approveStockTransfer(t.id);
                                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Transfer request approved!');
                                                                    },
                                                                    className: "btn btn-sm btn-blue",
                                                                    style: {
                                                                        padding: '4px 8px',
                                                                        fontSize: 11,
                                                                        background: '#10B981',
                                                                        border: 'none'
                                                                    },
                                                                    children: "Approve"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                                    lineNumber: 1624,
                                                                    columnNumber: 65
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>{
                                                                        rejectStockTransfer(t.id);
                                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Transfer request rejected');
                                                                    },
                                                                    className: "btn btn-sm btn-outline",
                                                                    style: {
                                                                        padding: '4px 8px',
                                                                        fontSize: 11,
                                                                        color: '#EF4444',
                                                                        borderColor: '#FCA5A5'
                                                                    },
                                                                    children: "Reject"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                                    lineNumber: 1630,
                                                                    columnNumber: 65
                                                                }, this)
                                                            ]
                                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: 11,
                                                                color: '#A0AEC0',
                                                                fontStyle: 'italic'
                                                            },
                                                            children: "Pending HO Approval"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/page.tsx",
                                                            lineNumber: 1638,
                                                            columnNumber: 61
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 1621,
                                                        columnNumber: 53
                                                    }, this),
                                                    t.status !== 'pending' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: 11,
                                                            color: '#A0AEC0'
                                                        },
                                                        children: "Processed"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 1642,
                                                        columnNumber: 76
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                lineNumber: 1619,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, t.id, true, {
                                        fileName: "[project]/app/company/inventory/page.tsx",
                                        lineNumber: 1606,
                                        columnNumber: 41
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/app/company/inventory/page.tsx",
                                lineNumber: 1596,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/inventory/page.tsx",
                        lineNumber: 1584,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/company/inventory/page.tsx",
                    lineNumber: 1583,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/company/inventory/page.tsx",
                lineNumber: 1576,
                columnNumber: 13
            }, this),
            showModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "modal-overlay",
                onClick: ()=>setShowModal(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modal-box",
                    onClick: (e)=>e.stopPropagation(),
                    style: {
                        maxWidth: 450
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
                                        fontSize: 17
                                    },
                                    children: "New Transfer Request"
                                }, void 0, false, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 1657,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowModal(false),
                                    className: "btn btn-ghost btn-icon",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/inventory/page.tsx",
                                        lineNumber: 1658,
                                        columnNumber: 108
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 1658,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/inventory/page.tsx",
                            lineNumber: 1656,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleCreateTransfer,
                            style: {
                                padding: '20px 24px',
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
                                                display: 'block',
                                                marginBottom: 5
                                            },
                                            children: "Select Product"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 1662,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            className: "e-select",
                                            value: productId,
                                            onChange: (e)=>setProductId(e.target.value),
                                            required: true,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "-- Choose Product --"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 1664,
                                                    columnNumber: 37
                                                }, this),
                                                products.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: p.id,
                                                        children: [
                                                            p.name,
                                                            " (Available: ",
                                                            isSubBranchLogin ? p.branchStock?.[activeBranchId || ''] ?? 0 : p.stockQty,
                                                            ")"
                                                        ]
                                                    }, p.id, true, {
                                                        fileName: "[project]/app/company/inventory/page.tsx",
                                                        lineNumber: 1666,
                                                        columnNumber: 41
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 1663,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 1661,
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
                                                        display: 'block',
                                                        marginBottom: 5
                                                    },
                                                    children: "From Branch"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 1675,
                                                    columnNumber: 37
                                                }, this),
                                                isSubBranchLogin ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: "e-input",
                                                    value: getBranchName(activeBranchId || ''),
                                                    disabled: true,
                                                    style: {
                                                        background: '#F3F4F6'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 1677,
                                                    columnNumber: 41
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: "e-select",
                                                    value: fromBranchId,
                                                    onChange: (e)=>setFromBranchId(e.target.value),
                                                    required: true,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "-- Source --"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/page.tsx",
                                                            lineNumber: 1680,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "head_office",
                                                            children: "Head Office"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/page.tsx",
                                                            lineNumber: 1681,
                                                            columnNumber: 45
                                                        }, this),
                                                        (company?.branches || []).map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: b.id,
                                                                children: b.name
                                                            }, b.id, false, {
                                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                                lineNumber: 1683,
                                                                columnNumber: 49
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 1679,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 1674,
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
                                                    children: "To Branch"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 1689,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: "e-select",
                                                    value: toBranchId,
                                                    onChange: (e)=>setToBranchId(e.target.value),
                                                    required: true,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "-- Destination --"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/page.tsx",
                                                            lineNumber: 1691,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "head_office",
                                                            children: "Head Office"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/inventory/page.tsx",
                                                            lineNumber: 1692,
                                                            columnNumber: 41
                                                        }, this),
                                                        (company?.branches || []).map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: b.id,
                                                                children: b.name
                                                            }, b.id, false, {
                                                                fileName: "[project]/app/company/inventory/page.tsx",
                                                                lineNumber: 1694,
                                                                columnNumber: 45
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/inventory/page.tsx",
                                                    lineNumber: 1690,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 1688,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 1673,
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
                                                marginBottom: 5
                                            },
                                            children: "Transfer Quantity"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 1701,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            className: "e-input",
                                            placeholder: "Enter transfer qty",
                                            value: qty,
                                            onChange: (e)=>setQty(e.target.value),
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 1702,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 1700,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: 10,
                                        justifyContent: 'flex-end',
                                        marginTop: 10
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setShowModal(false),
                                            className: "btn btn-outline",
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 1706,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "btn btn-blue",
                                            children: "Submit Request"
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/inventory/page.tsx",
                                            lineNumber: 1707,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/inventory/page.tsx",
                                    lineNumber: 1705,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/inventory/page.tsx",
                            lineNumber: 1660,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/company/inventory/page.tsx",
                    lineNumber: 1655,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/company/inventory/page.tsx",
                lineNumber: 1654,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/company/inventory/page.tsx",
        lineNumber: 1563,
        columnNumber: 9
    }, this);
}
_s2(BranchTransfersTab, "Mz55522TkIobq+P6EE9bvIxKW7Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActiveCompany"]
    ];
});
_c3 = BranchTransfersTab;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "InventoryRow");
__turbopack_context__.k.register(_c1, "InventoryPage");
__turbopack_context__.k.register(_c2, "OffersTab");
__turbopack_context__.k.register(_c3, "BranchTransfersTab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_30b56c41._.js.map