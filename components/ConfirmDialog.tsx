'use client';
import { useState, useCallback } from 'react';
import { AlertTriangle, Trash2, Check } from 'lucide-react';

interface ConfirmOptions {
    title?: string;
    message: string;
    confirmLabel?: string;
    danger?: boolean;
    success?: boolean;
}

// Global singleton state — works without prop drilling
let resolveRef: ((v: boolean) => void) | null = null;
let setDialogFn: ((o: ConfirmOptions | null) => void) | null = null;

export function confirm(opts: ConfirmOptions): Promise<boolean> {
    return new Promise(resolve => {
        resolveRef = resolve;
        setDialogFn?.(opts);
    });
}

export function ConfirmDialog() {
    const [opts, setOpts] = useState<ConfirmOptions | null>(null);
    setDialogFn = setOpts;

    const handle = useCallback((yes: boolean) => {
        resolveRef?.(yes);
        resolveRef = null;
        setOpts(null);
    }, []);

    if (!opts) return null;

    const getIconColor = () => {
        if (opts.danger) return '#DC2626';
        if (opts.success) return '#38A169';
        return '#D97706';
    };

    const getIconBg = () => {
        if (opts.danger) return '#FEF2F2';
        if (opts.success) return '#F0FFF4';
        return '#FEF7E0';
    };

    const getButtonBg = () => {
        if (opts.danger) return '#DC2626';
        if (opts.success) return '#38A169';
        return '#4285F4';
    };

    return (
        <div
            style={{
                position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 9999, padding: 20, backdropFilter: 'blur(4px)',
            }}
            onClick={() => handle(false)}
        >
            <div
                style={{
                    background: 'white', borderRadius: 20, padding: '32px 28px',
                    width: '100%', maxWidth: 380, boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                    animation: 'scaleIn 0.15s ease',
                }}
                onClick={e => e.stopPropagation()}
            >
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <div style={{
                        width: 56, height: 56, borderRadius: '50%',
                        background: getIconBg(),
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 16px',
                    }}>
                        {opts.danger ? (
                            <Trash2 size={24} color={getIconColor()} />
                        ) : opts.success ? (
                            <Check size={24} color={getIconColor()} />
                        ) : (
                            <AlertTriangle size={24} color={getIconColor()} />
                        )}
                    </div>
                    <h3 style={{ fontWeight: 900, fontSize: 17, color: '#1A1A2E', margin: '0 0 8px' }}>
                        {opts.title || (opts.danger ? 'Confirm Delete' : opts.success ? 'Confirm Action' : 'Are you sure?')}
                    </h3>
                    <p style={{ fontSize: 13, color: '#718096', lineHeight: 1.6, margin: 0 }}>{opts.message}</p>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button
                        onClick={() => handle(false)}
                        style={{ flex: 1, padding: '12px', background: '#F1F5F9', color: '#4A5568', border: 'none', borderRadius: 12, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => handle(true)}
                        style={{
                            flex: 1, padding: '12px',
                            background: getButtonBg(),
                            color: 'white', border: 'none', borderRadius: 12,
                            fontWeight: 700, cursor: 'pointer', fontSize: 14,
                        }}
                    >
                        {opts.confirmLabel || (opts.danger ? 'Delete' : opts.success ? 'Settle' : 'Confirm')}
                    </button>
                </div>
            </div>
            <style>{`@keyframes scaleIn { from { opacity:0; transform: scale(0.92); } to { opacity:1; transform: scale(1); } }`}</style>
        </div>
    );
}
