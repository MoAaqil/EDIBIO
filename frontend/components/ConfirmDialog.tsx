'use client';
import { useState, useCallback, useEffect } from 'react';
import { AlertTriangle, Trash2, Check, X } from 'lucide-react';

interface ConfirmOptions {
    title?: string;
    message: string;
    confirmLabel?: string;
    danger?: boolean;
    success?: boolean;
}

// Global singleton state
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

    useEffect(() => {
        setDialogFn = setOpts;
        return () => {
            if (setDialogFn === setOpts) {
                setDialogFn = null;
            }
        };
    }, []);

    const handle = useCallback((yes: boolean) => {
        resolveRef?.(yes);
        resolveRef = null;
        setOpts(null);
    }, []);

    if (!opts) return null;

    const getIconColor = () => {
        if (opts.danger) return '#EF4444'; // modern red
        if (opts.success) return '#10B981'; // modern green
        return '#F59E0B'; // modern amber
    };

    const getIconBg = () => {
        if (opts.danger) return '#FEF2F2';
        if (opts.success) return '#ECFDF5';
        return '#FFFBEB';
    };

    const getButtonBg = () => {
        if (opts.danger) return 'linear-gradient(135deg, #EF4444, #DC2626)';
        if (opts.success) return 'linear-gradient(135deg, #10B981, #059669)';
        return 'linear-gradient(135deg, #3B82F6, #2563EB)';
    };

    return (
        <div
            style={{
                position: 'fixed', 
                inset: 0, 
                background: 'rgba(15, 23, 42, 0.45)', // dark slate overlay
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                zIndex: 99999, 
                padding: 20, 
                backdropFilter: 'blur(8px)',
                animation: 'confirmFadeIn 0.2s ease-out'
            }}
            onClick={() => handle(false)}
        >
            <div
                style={{
                    background: 'white', 
                    borderRadius: 24, 
                    padding: '32px 28px 24px',
                    width: '100%', 
                    maxWidth: 360, 
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    animation: 'confirmScaleIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    position: 'relative',
                    border: '1px solid #F1F5F9'
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={() => handle(false)}
                    style={{
                        position: 'absolute',
                        top: 18,
                        right: 18,
                        background: '#F8FAFC',
                        border: 'none',
                        borderRadius: '50%',
                        width: 30,
                        height: 30,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#94A3B8',
                        cursor: 'pointer',
                        transition: 'all 0.15s'
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = '#F1F5F9';
                        e.currentTarget.style.color = '#64748B';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = '#F8FAFC';
                        e.currentTarget.style.color = '#94A3B8';
                    }}
                >
                    <X size={14} />
                </button>

                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <div style={{
                        width: 60, height: 60, borderRadius: '50%',
                        background: getIconBg(),
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 18px',
                    }}>
                        {opts.danger ? (
                            <Trash2 size={26} color={getIconColor()} />
                        ) : opts.success ? (
                            <Check size={26} color={getIconColor()} />
                        ) : (
                            <AlertTriangle size={26} color={getIconColor()} />
                        )}
                    </div>
                    <h3 style={{ fontWeight: 900, fontSize: 18, color: '#0F172A', margin: '0 0 10px', fontFamily: "'Outfit', sans-serif" }}>
                        {opts.title || (opts.danger ? 'Confirm Delete' : opts.success ? 'Confirm Action' : 'Are you sure?')}
                    </h3>
                    <p style={{ fontSize: 13.5, color: '#475569', lineHeight: 1.5, margin: 0, padding: '0 8px' }}>
                        {opts.message}
                    </p>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                    <button
                        onClick={() => handle(false)}
                        style={{ 
                            flex: 1, 
                            padding: '12px 16px', 
                            background: 'white', 
                            color: '#475569', 
                            border: '1px solid #E2E8F0', 
                            borderRadius: 14, 
                            fontWeight: 700, 
                            cursor: 'pointer', 
                            fontSize: 14,
                            transition: 'all 0.15s'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = '#F8FAFC';
                            e.currentTarget.style.borderColor = '#CBD5E1';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = 'white';
                            e.currentTarget.style.borderColor = '#E2E8F0';
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => handle(true)}
                        style={{
                            flex: 1, 
                            padding: '12px 16px',
                            background: getButtonBg(),
                            color: 'white', 
                            border: 'none', 
                            borderRadius: 14,
                            fontWeight: 700, 
                            cursor: 'pointer', 
                            fontSize: 14,
                            boxShadow: opts.danger ? '0 4px 14px rgba(239, 68, 68, 0.3)' : opts.success ? '0 4px 14px rgba(16, 185, 129, 0.3)' : '0 4px 14px rgba(59, 130, 246, 0.3)',
                            transition: 'all 0.15s'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            e.currentTarget.style.boxShadow = opts.danger ? '0 6px 18px rgba(239, 68, 68, 0.4)' : opts.success ? '0 6px 18px rgba(16, 185, 129, 0.4)' : '0 6px 18px rgba(59, 130, 246, 0.4)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'none';
                            e.currentTarget.style.boxShadow = opts.danger ? '0 4px 14px rgba(239, 68, 68, 0.3)' : opts.success ? '0 4px 14px rgba(16, 185, 129, 0.3)' : '0 4px 14px rgba(59, 130, 246, 0.3)';
                        }}
                    >
                        {opts.confirmLabel || (opts.danger ? 'Delete' : opts.success ? 'Settle' : 'Confirm')}
                    </button>
                </div>
            </div>
            <style>{`
                @keyframes confirmFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes confirmScaleIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
}
