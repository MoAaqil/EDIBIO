'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { X, Upload, ImagePlus, Sparkles, AlertTriangle, CheckCircle2, RefreshCw, FileText, Check, Camera } from 'lucide-react';

function extractJSON(raw: string): string {
    if (!raw || !raw.trim()) throw new Error('AI returned empty response');
    
    // 1. Try markdown code fences
    const fenceMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fenceMatch) {
        const inside = fenceMatch[1].trim();
        try { JSON.parse(inside); return inside; } catch { }
    }

    // 2. Try finding the first '{' and last '}'
    const firstBrace = raw.indexOf('{');
    const lastBrace = raw.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        const candidate = raw.substring(firstBrace, lastBrace + 1);
        try { JSON.parse(candidate); return candidate; } catch { }
    }

    // 3. Try finding the first '[' and last ']'
    const firstBracket = raw.indexOf('[');
    const lastBracket = raw.lastIndexOf(']');
    if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
        const candidate = raw.substring(firstBracket, lastBracket + 1);
        try { JSON.parse(candidate); return candidate; } catch { }
    }

    // 4. More aggressive depth tracking
    for (let start = 0; start < raw.length; start++) {
        if (raw[start] === '{' || raw[start] === '[') {
            const startChar = raw[start];
            const endChar = startChar === '{' ? '}' : ']';
            let depth = 0;
            for (let end = start; end < raw.length; end++) {
                if (raw[end] === startChar) depth++;
                else if (raw[end] === endChar) {
                    depth--;
                    if (depth === 0) {
                        const candidate = raw.slice(start, end + 1);
                        try { JSON.parse(candidate); return candidate; } catch { }
                    }
                }
            }
        }
    }

    throw new Error('Could not extract JSON. Raw response: ' + raw.slice(0, 150) + '...');
}

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

async function callGeminiMulti(apiKey: string, model: string, prompt: string, images: { mimeType: string, data: string }[]): Promise<string> {
    const tryConfigs = [
        { ver: 'v1beta', useSystem: true, useJsonMode: true },
        { ver: 'v1beta', useSystem: true, useJsonMode: false },
        { ver: 'v1', useSystem: false, useJsonMode: false } 
    ];
    let lastErr = '';

    for (const config of tryConfigs) {
        let retries = 0;
        const maxRetries = 3;

        while (retries <= maxRetries) {
            try {
                const url = `https://generativelanguage.googleapis.com/${config.ver}/models/${model}:generateContent?key=${apiKey}`;
                const body: any = {
                    contents: [{
                        parts: [
                            { text: prompt },
                            ...images.map(img => ({ inline_data: { mime_type: img.mimeType, data: img.data } }))
                        ]
                    }],
                    generationConfig: {
                        temperature: 0.1,
                        maxOutputTokens: 8192,
                    },
                };

                if (config.useSystem) {
                    body.system_instruction = { parts: [{ text: 'You are an elite OCR extraction system. Extract data correctly into the requested JSON schema. All numbers must be raw numbers (no commas). Respond with raw JSON only.' }] };
                }
                if (config.useJsonMode) {
                    body.generationConfig.responseMimeType = 'application/json';
                }

                const res = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });

                if (res.ok) {
                    const data = await res.json();
                    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
                    if (!text) break; // Try next config if empty text
                    return extractJSON(text); // Success!
                }

                // Read error
                const errData = await res.json().catch(() => ({}));
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

            } catch (e: any) {
                lastErr = e.message;
                // If it's a model specific error, move to next config
                if (lastErr.includes('404') || lastErr.includes('400') || lastErr.includes('not found')) {
                    break;
                }
                // If it's a 429 that already exhausted retries, or 401/403, bubble up to main loop to switch keys
                if (lastErr.includes('429') || lastErr.includes('401') || lastErr.includes('403')) {
                    throw Object.assign(new Error(lastErr), { code: 'KEY_EXHAUSTED' });
                }
                throw e;
            }
        }
    }
    // If we exhausted all configs and still failed, throw the final error
    throw new Error(lastErr || `Model ${model} failed in all configurations`);
}

const SCAN_STEPS = ['Reading image…', 'Detecting items…', 'Extracting prices…', 'Building result…'];

export default function AIAddItemModal({ onClose, onGeminiScanned, onPurchaseScanned, type = 'item' }: {
    onClose: () => void;
    onGeminiScanned?: (data: any) => void;
    onPurchaseScanned?: (billData: any) => void;
    type?: 'item' | 'purchase';
}) {
    const [images, setImages] = useState<string[]>([]);
    const [isScanning, setIsScanning] = useState(false);
    const [scanStep, setScanStep] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [done, setDone] = useState(false);
    const { aiApiKey: adminKey } = useStore();

    const SHARED_KEYS = [
        'AIzaSyD9pB9IccS4K2vIWpxcg0xI2GVlqUbp1fk', 
        'AIzaSyDVXhcyk3qnuTyQ96Me-RHFa4iqNR59lGo', 
        'AIzaSyCT8Vc3sDrpd1XIzu-MPHYCwLx40CIUcuo', 
        'AIzaSyB3vK9xL2mT8nQ1wP5yR7cG4fH0dZ6vJ5M', 
        'AIzaSyM8nG2qW5cV1bX9zP4kL7jY0tR3hF6dK8N', 
        'AIzaSyX1cY4vB7nM0pW3qT6rL9kP2jF5dG8hH9S',
        'AIzaSyA8nH4xP9mB2vR0tK5jL3fY6wQ1zG7sD2M',
    ].filter(k => k.length > 35);

    const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files).slice(0, 4);
        const newImages: string[] = [];
        let processed = 0;
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                newImages.push(reader.result?.toString() || '');
                processed++;
                if (processed === files.length) setImages(newImages);
            };
            reader.readAsDataURL(file);
        });
    };

    const [scannedData, setScannedData] = useState<any>(null);

    const startScan = async () => {
        if (images.length === 0) return;

        // AI Rate Limiting logic (5 per minute per user)
        const userUid = JSON.parse(localStorage.getItem('edibio-storage') || '{}')?.state?.user?.uid || 'guest';
        const limitKey = `ai_scan_limits_${userUid}`;
        let history: number[] = [];
        try { history = JSON.parse(localStorage.getItem(limitKey) || '[]'); } catch (e) { }
        const now = Date.now();
        // Keep only timestamps within the last 60 seconds
        history = history.filter(t => now - t < 60000);

        if (history.length >= 5) {
            setError("Rate Limit Exceeded: You can only perform 5 AI scans per minute. Please try again in a moment.");
            return;
        }

        setIsScanning(true); setError(null); setDone(false); setScanStep(0); setScannedData(null);

        const imageObjects = images.map(img => {
            const mimeType = img.match(/data:(.*?);base64/)?.[1] || 'image/jpeg';
            const data = img.includes(';base64,') ? img.split(';base64,')[1] : img.includes(',') ? img.split(',')[1] : img;
            return { mimeType, data };
        });

        // Refined prompt for better AI understanding of handwritten text and 20+ items
        const prompt = type === 'purchase'
            ? `Extract all items from this purchase invoice. Include supplierName, billDate (YYYY-MM-DD), billNumber, totalAmount, and an items array with: {name, price, qty, gst, hsn}. If handwritten or faint, use deep analysis to identify characters. Respond ONLY with valid JSON.`
            : `Identify and list all products in this image. For each item, extract {name, price, qty, gst}. Return a JSON array. Be extremely precise with names and prices. Analyze handwritten lists carefully.`;

        const stepInterval = setInterval(() => setScanStep(s => Math.min(s + 1, SCAN_STEPS.length - 1)), 2500);

        // Shuffle keys to distribute traffic load better
        const shuffledShared = [...SHARED_KEYS].sort(() => Math.random() - 0.5);
        const keysToTry = adminKey ? [adminKey, ...shuffledShared] : shuffledShared;

        // Use the newest available Gemini Flash models
        const MODELS = [
            'gemini-2.0-flash',
            'gemini-1.5-flash',
            'gemini-1.5-flash-8b'
        ];

        let success = false;
        let lastError = '';

        outer_loop: for (const key of keysToTry) {
            for (const model of MODELS) {
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
                } catch (err: any) {
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

    const handleConfirm = () => {
        if (!scannedData) return;
        if (type === 'purchase') {
            const norm = Array.isArray(scannedData) ? { items: scannedData } : (scannedData.items ? scannedData : { items: [] });
            if (onPurchaseScanned) onPurchaseScanned(norm);
        } else {
            const list = Array.isArray(scannedData) ? scannedData : (scannedData.items || []);
            if (onGeminiScanned) onGeminiScanned(list);
        }
        setDone(true);
        setTimeout(() => onClose(), 900);
    };

    return (
        <div className="modal-overlay" onClick={onClose} style={{ zIndex: 2000 }}>
            <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 700, borderRadius: 28, overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}>

                {/* Header */}
                <div style={{ padding: '20px 28px', background: 'linear-gradient(135deg,#0F172A,#1E293B)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#4285F4,#9333EA)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Sparkles size={22} color="white" />
                        </div>
                        <div>
                            <h3 style={{ fontWeight: 900, fontSize: 18, margin: 0 }}>AI Smart Scanner</h3>
                            <p style={{ fontSize: 10, opacity: 0.5, margin: '2px 0 0', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>
                                {type === 'purchase' ? 'Purchase Bill Extractor' : 'Inventory Item Extractor'}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: 12, padding: 10, cursor: 'pointer' }}><X size={18} /></button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', maxHeight: 'calc(100vh - 120px)', background: '#FAFAFA' }}>
                    
                    {/* Scrollable Body */}
                    <div style={{ padding: '28px', overflowY: 'auto', flex: 1 }}>

                        {/* Upload Zone */}
                        {!images.length && !isScanning && !done && !scannedData && (
                            <div style={{ border: '2px dashed #CBD5E1', borderRadius: 24, padding: '52px 24px', textAlign: 'center', background: 'white', cursor: 'pointer' }}
                                onClick={() => document.getElementById('ai-file-input')?.click()}
                                onDragOver={e => e.preventDefault()}
                                onDrop={e => { e.preventDefault(); const fakeEv = { target: { files: e.dataTransfer.files } } as any; handleSelectFiles(fakeEv); }}
                            >
                                {/* Guided photo frame */}
                                <div style={{ position: 'relative', width: 120, height: 88, margin: '0 auto 20px', border: '2px dashed #94A3B8', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F1F5F9' }}>
                                    <Camera size={32} color="#94A3B8" />
                                    {/* Blue corner brackets */}
                                    {[['top', 'left'], ['top', 'right'], ['bottom', 'left'], ['bottom', 'right']].map(([v, h]) => (
                                        <div key={`${v}${h}`} style={{
                                            position: 'absolute', [v]: -2, [h]: -2, width: 14, height: 14,
                                            borderTop: v === 'top' ? '3px solid #3B82F6' : 'none', borderBottom: v === 'bottom' ? '3px solid #3B82F6' : 'none',
                                            borderLeft: h === 'left' ? '3px solid #3B82F6' : 'none', borderRight: h === 'right' ? '3px solid #3B82F6' : 'none'
                                        }} />
                                    ))}
                                </div>
                                <h4 style={{ fontSize: 17, fontWeight: 900, color: '#1E293B', marginBottom: 6 }}>Drop your invoice here</h4>
                                <p style={{ fontSize: 12, color: '#64748B', marginBottom: 20, lineHeight: 1.6 }}>
                                    Works with printed & handwritten bills.<br />
                                    <strong>Tip:</strong> Good lighting = better results. Up to 3 pages.
                                </p>
                                <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                                    <button className="btn btn-blue" style={{ borderRadius: 14, gap: 8 }} onClick={e => { e.stopPropagation(); document.getElementById('ai-file-input')?.click(); }}>
                                        <Upload size={14} /> Select Photo
                                    </button>
                                    <button className="btn btn-outline" style={{ borderRadius: 14, gap: 8 }} onClick={e => { e.stopPropagation(); document.getElementById('ai-camera-input')?.click(); }}>
                                        <Camera size={14} /> Use Camera
                                    </button>
                                </div>
                                <input id="ai-file-input" type="file" multiple accept="image/*" onChange={handleSelectFiles} style={{ display: 'none' }} />
                                <input id="ai-camera-input" type="file" accept="image/*" capture="environment" onChange={handleSelectFiles} style={{ display: 'none' }} />
                            </div>
                        )}

                        {/* Scanning steps animation */}
                        {isScanning && (
                            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                                <div style={{ position: 'relative', width: 80, height: 80, margin: '0 auto 24px' }}>
                                    <div style={{ width: 80, height: 80, borderRadius: '50%', border: '4px solid #E8F0FE', borderTop: '4px solid #4285F4', animation: 'ai-spin 1s linear infinite' }} />
                                    <Sparkles size={28} color="#4285F4" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
                                </div>
                                <h4 style={{ fontWeight: 900, fontSize: 18, color: '#1E293B', margin: '0 0 6px' }}>Analyzing your bill…</h4>
                                <p style={{ fontSize: 14, color: '#4285F4', fontWeight: 700, marginBottom: 28 }}>{SCAN_STEPS[scanStep]}</p>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                                    {SCAN_STEPS.map((step, i) => (
                                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                                            <div style={{ width: 30, height: 30, borderRadius: '50%', background: i <= scanStep ? '#4285F4' : '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s' }}>
                                                {i < scanStep ? <CheckCircle2 size={14} color="white" /> : <span style={{ color: i === scanStep ? 'white' : '#94A3B8', fontSize: 11, fontWeight: 800 }}>{i + 1}</span>}
                                            </div>
                                            <span style={{ fontSize: 9, color: i <= scanStep ? '#4285F4' : '#94A3B8', fontWeight: 700, textAlign: 'center', maxWidth: 62 }}>{step.replace('…', '')}</span>
                                        </div>
                                    ))}
                                </div>
                                <style>{`@keyframes ai-spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }`}</style>
                            </div>
                        )}

                        {/* Image previews */}
                        {images.length > 0 && !isScanning && !done && !scannedData && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                                <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '4px 0' }}>
                                    {images.map((img, i) => (
                                        <div key={i} style={{ position: 'relative', flexShrink: 0 }}>
                                            <img src={img} alt={`Page \${i + 1}`} style={{ width: 130, height: 168, objectFit: 'cover', borderRadius: 14, border: '2px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                                            <button onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))} style={{ position: 'absolute', top: 8, right: 8, background: '#EF4444', color: 'white', border: 'none', borderRadius: 8, padding: 5, cursor: 'pointer' }}><X size={12} /></button>
                                            <div style={{ position: 'absolute', bottom: 8, left: 8, background: 'rgba(0,0,0,0.65)', color: 'white', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6 }}>Page {i + 1}</div>
                                        </div>
                                    ))}
                                    {images.length < 3 && (
                                        <label htmlFor="ai-add-more" style={{ width: 130, height: 168, border: '2px dashed #CBD5E1', borderRadius: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', background: 'white', flexShrink: 0 }}>
                                            <ImagePlus size={24} color="#94A3B8" />
                                            <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600 }}>Add page</span>
                                            <input id="ai-add-more" type="file" multiple accept="image/*" onChange={handleSelectFiles} style={{ display: 'none' }} />
                                        </label>
                                    )}
                                </div>
                                <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 12, padding: '10px 14px', fontSize: 12, color: '#1D4ED8', fontWeight: 600 }}>
                                    💡 <strong>Tip:</strong> Ensure the full invoice is in frame with clear, readable text for best accuracy.
                                </div>
                            </div>
                        )}

                        {/* Review Scanned Data */}
                        {scannedData && !isScanning && !done && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 20, padding: '20px', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                                        <div style={{ width: 32, height: 32, borderRadius: 8, background: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <FileText size={16} color="#0EA5E9" />
                                        </div>
                                        <h4 style={{ fontWeight: 800, fontSize: 15, color: '#1E293B', margin: 0 }}>Review Extracted Data</h4>
                                    </div>

                                    {type === 'purchase' && (
                                        <div style={{ marginBottom: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12 }}>
                                            <div style={{ background: 'white', padding: '10px 14px', borderRadius: 12, border: '1px solid #F1F5F9' }}>
                                                <p style={{ fontSize: 9, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', marginBottom: 4 }}>Supplier</p>
                                                <p style={{ fontSize: 13, fontWeight: 700, color: '#1E293B' }}>{scannedData.supplierName || 'N/A'}</p>
                                            </div>
                                            <div style={{ background: 'white', padding: '10px 14px', borderRadius: 12, border: '1px solid #F1F5F9' }}>
                                                <p style={{ fontSize: 9, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', marginBottom: 4 }}>Bill Number</p>
                                                <p style={{ fontSize: 13, fontWeight: 700, color: '#1E293B' }}>{scannedData.billNumber || 'N/A'}</p>
                                            </div>
                                            <div style={{ background: 'white', padding: '10px 14px', borderRadius: 12, border: '1px solid #F1F5F9' }}>
                                                <p style={{ fontSize: 9, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', marginBottom: 4 }}>Date</p>
                                                <p style={{ fontSize: 13, fontWeight: 700, color: '#1E293B' }}>{scannedData.billDate || 'N/A'}</p>
                                            </div>
                                            <div style={{ background: '#F0F9FF', padding: '10px 14px', borderRadius: 12, border: '1px solid #BAE6FD' }}>
                                                <p style={{ fontSize: 9, fontWeight: 700, color: '#0EA5E9', textTransform: 'uppercase', marginBottom: 4 }}>Total Amount</p>
                                                <p style={{ fontSize: 13, fontWeight: 800, color: '#0369A1' }}>₹{scannedData.totalAmount?.toLocaleString() || '0'}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div style={{ borderRadius: 12, border: '1px solid #F1F5F9', background: 'white', overflow: 'hidden' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                                            <thead style={{ background: '#F8FAFC', position: 'sticky', top: 0, zIndex: 10 }}>
                                                <tr>
                                                    <th style={{ textAlign: 'left', padding: '10px 12px', color: '#64748B', fontWeight: 700 }}>Item Name</th>
                                                    <th style={{ textAlign: 'center', padding: '10px 8px', color: '#64748B', fontWeight: 700 }}>Qty</th>
                                                    <th style={{ textAlign: 'right', padding: '10px 12px', color: '#64748B', fontWeight: 700 }}>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(Array.isArray(scannedData) ? scannedData : (scannedData.items || [])).filter((it: any) => (it.name || it.item || it.product) && String(it.name || it.item || it.product).trim()).map((item: any, i: number) => {
                                                    const displayName = item.name || item.item || item.product;
                                                    const displayPrice = item.price ?? item.rate ?? item.unitPrice ?? 0;
                                                    const displayQty = item.qty ?? item.quantity ?? 1;
                                                    return (
                                                        <tr key={i} style={{ borderTop: '1px solid #F1F5F9' }}>
                                                            <td style={{ padding: '10px 12px', color: '#1E293B', fontWeight: 600 }}>{displayName}</td>
                                                            <td style={{ padding: '10px 8px', textAlign: 'center', color: '#475569' }}>{displayQty}</td>
                                                            <td style={{ padding: '10px 12px', textAlign: 'right', color: '#1E293B', fontWeight: 700 }}>₹{displayPrice?.toLocaleString() || '0'}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {done && (
                            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                                <CheckCircle2 size={60} color="#34A853" style={{ margin: '0 auto 16px' }} />
                                <h4 style={{ fontWeight: 900, fontSize: 18, color: '#1E293B', margin: '0 0 8px' }}>Data Extracted Successfully!</h4>
                                <p style={{ color: '#64748B', fontSize: 14 }}>Items have been added. Closing…</p>
                            </div>
                        )}

                        {/* Error + retry */}
                        {error && !isScanning && (
                            <div style={{ padding: '16px', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 16 }}>
                                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12 }}>
                                    <AlertTriangle size={18} color="#DC2626" style={{ flexShrink: 0, marginTop: 2 }} />
                                    <div>
                                        <p style={{ fontWeight: 800, fontSize: 13, color: '#991B1B', margin: '0 0 4px' }}>Scan failed — try again</p>
                                        <p style={{ fontSize: 12, color: '#B91C1C', margin: 0, lineHeight: 1.5 }}>{error.slice(0, 200)}</p>
                                    </div>
                                </div>
                                <button onClick={startScan} style={{ width: '100%', padding: '11px', background: '#DC2626', color: 'white', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                    <RefreshCw size={14} /> Retry Scan
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Fixed Footer */}
                    <div style={{ padding: '20px 28px', borderTop: '1px solid #E2E8F0', background: 'white', display: 'flex', gap: 12 }}>
                        {images.length > 0 && !isScanning && !done && !scannedData && (
                            <>
                                <button onClick={() => setImages([])} className="btn btn-outline" style={{ flex: 1, borderRadius: 14, height: 50 }}>Reset Items</button>
                                <button onClick={startScan} style={{ flex: 2, height: 50, borderRadius: 14, background: 'linear-gradient(135deg,#3B82F6,#6366F1)', color: 'white', border: 'none', fontWeight: 900, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                                    <Sparkles size={18} /> Scan & Extract
                                </button>
                            </>
                        )}

                        {scannedData && !isScanning && !done && (
                            <>
                                <button onClick={() => setScannedData(null)} className="btn btn-outline" style={{ flex: 1, borderRadius: 14, height: 50 }}>
                                    Rescan Photo
                                </button>
                                <button onClick={handleConfirm} style={{ flex: 2, height: 50, borderRadius: 14, background: '#10B981', color: 'white', border: 'none', fontWeight: 900, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: '0 4px 14px rgba(16,185,129,0.3)' }}>
                                    <Check size={18} /> Confirm & Add
                                </button>
                            </>
                        )}

                        {!images.length && !isScanning && !done && !scannedData && (
                            <button onClick={onClose} className="btn btn-outline" style={{ width: '100%', borderRadius: 14, height: 50 }}>Close Scanner</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
