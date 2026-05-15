'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, RefreshCcw, ArrowLeft, Home } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Log the error to an error reporting service
        console.error("App Error Boundary Caught:", error);

        // Notify the user via toast notification
        setTimeout(() => {
            toast.error("An unexpected error occurred: " + (error.message || 'Unknown error'), {
                duration: 5000,
                position: 'top-center',
                style: { background: '#DC2626', color: 'white', fontWeight: 600, borderRadius: 12 }
            });
        }, 100);
    }, [error]);

    if (!mounted) return null;

    return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F7FAFC', padding: 20 }}>
            <div style={{ maxWidth: 450, width: '100%', padding: '40px 30px', textAlign: 'center', background: 'white', borderRadius: 20, border: '1px solid #F1F3F5', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: 20, background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    <AlertTriangle size={32} color="#DC2626" />
                </div>

                <h1 style={{ fontSize: 22, fontWeight: 900, color: '#1A1A2E', marginBottom: 12 }}>Wait, something went wrong!</h1>
                <p style={{ fontSize: 13, color: '#718096', marginBottom: 24, lineHeight: 1.5 }}>
                    We encountered an unexpected error while trying to load this piece of the application.
                    <br />
                    <span style={{ fontSize: 11, display: 'inline-block', marginTop: 12, padding: '8px 12px', background: '#F1F5F9', borderRadius: 8, color: '#475569', wordBreak: 'break-word', border: '1px solid #E2E8F0', userSelect: 'all' }}>
                        {error.message || "Unknown Runtime Error"}
                    </span>
                </p>

                <div style={{ display: 'flex', gap: 12, width: '100%', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <button onClick={() => router.back()} style={{ flex: 1, padding: '12px', background: 'white', color: '#4A5568', border: '1.5px solid #E2E8F0', borderRadius: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer', transition: 'all 0.15s' }}>
                            <ArrowLeft size={16} /> Go Back
                        </button>
                        <button onClick={() => reset()} style={{ flex: 1, padding: '12px', background: '#DC2626', color: 'white', border: 'none', borderRadius: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer', transition: 'all 0.15s', boxShadow: '0 4px 12px rgba(220,38,38,0.2)' }}>
                            <RefreshCcw size={16} /> Try Again
                        </button>
                    </div>

                    <button onClick={() => router.replace('/company/dashboard')} style={{ width: '100%', padding: '12px', background: 'transparent', color: '#4285F4', border: 'none', borderRadius: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer', transition: 'all 0.15s' }}>
                        <Home size={16} /> Go to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}
