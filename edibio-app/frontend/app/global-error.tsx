'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        // Log the error
        console.error("Critical Global Error Caught:", error);

        // Let the user know
        setTimeout(() => {
            toast.error("Critical System Error: " + (error.message || 'Fatal crash'), {
                duration: 6000,
                position: 'top-center',
                style: { background: '#DC2626', color: 'white', fontWeight: 600, borderRadius: 12 }
            });
        }, 100);
    }, [error]);

    return (
        <html lang="en">
            <body>
                <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1A1A2E', padding: 20 }}>
                    <div style={{ maxWidth: 450, width: '100%', padding: '40px 30px', textAlign: 'center', background: 'white', borderRadius: 20, boxShadow: '0 20px 40px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: 64, height: 64, borderRadius: 20, background: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: '0 8px 16px rgba(220, 38, 38, 0.3)' }}>
                            <AlertTriangle size={32} color="#FFFFFF" />
                        </div>

                        <h1 style={{ fontSize: 24, fontWeight: 900, color: '#1A1A2E', marginBottom: 12 }}>Critical System Error</h1>
                        <p style={{ fontSize: 13, color: '#718096', marginBottom: 24, lineHeight: 1.5 }}>
                            The application encountered a fatal error and could not continue.
                            <br />
                            <span style={{ fontSize: 11, display: 'inline-block', marginTop: 12, padding: '8px 12px', background: '#FEF2F2', borderRadius: 8, color: '#991B1B', wordBreak: 'break-word', border: '1px solid #FCA5A5' }}>
                                {error.message || "Unknown Application Crash"}
                            </span>
                        </p>

                        <button onClick={() => window.location.reload()} style={{ width: '100%', padding: '14px', background: '#1A1A2E', color: 'white', border: 'none', borderRadius: 12, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer', transition: 'all 0.15s', boxShadow: '0 8px 16px rgba(26,26,46,0.3)' }}>
                            <RefreshCcw size={16} /> Hard Restart Application
                        </button>
                    </div>
                </div>
            </body>
        </html>
    );
}
