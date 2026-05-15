'use client';
import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import { usePathname, useRouter } from 'next/navigation';
import { AlertTriangle, Lock } from 'lucide-react';

export default function TrialGuard({ children }: { children: React.ReactNode }) {
    const { user, isAuthenticated } = useStore();
    const pathname = usePathname();
    const router = useRouter();
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        if (isAuthenticated && user) {
            // Bypass for admin
            if (user.role === 'admin') {
                setIsExpired(false);
                return;
            }

            // Check if active subscription
            if (user.subscriptionExpiresAt && new Date(user.subscriptionExpiresAt).getTime() > Date.now()) {
                setIsExpired(false);
                return;
            }

            let expiresAtTime = Date.now() + 86400000; // default 1 day buffer if completely broken

            if (user.trialExpiresAt) {
                expiresAtTime = new Date(user.trialExpiresAt).getTime();
            } else if (user.createdAt) {
                // Legacy users who don't have the explicit trial field mapped yet.
                const expires = new Date(user.createdAt);
                expires.setDate(expires.getDate() + 3);
                expiresAtTime = expires.getTime();
            }

            if (Date.now() > expiresAtTime) {
                setIsExpired(true);
            } else {
                setIsExpired(false);
            }
        } else {
            setIsExpired(false); // If not auth
        }
    }, [user, isAuthenticated, pathname]);

    return (
        <>
            {children}
            {isExpired && !pathname?.startsWith('/subscription') && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 99999, background: 'rgba(26, 26, 46, 0.95)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)',
                }}>
                    <div style={{ background: 'white', padding: '40px', borderRadius: '24px', maxWidth: 440, width: '90%', textAlign: 'center', boxShadow: '0 24px 64px rgba(0,0,0,0.4)' }}>
                        <div style={{ width: 80, height: 80, borderRadius: 999, background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', border: '8px solid #FFF5F5' }}>
                            <Lock size={32} color="#DC2626" />
                        </div>
                        <h2 style={{ fontSize: 24, fontWeight: 900, color: '#1A1A2E', marginBottom: 12 }}>Trial Expired</h2>
                        <p style={{ color: '#4A5568', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
                            Your free trial is over. Please choose a plan or redeem a code to continue using our service.
                        </p>
                        <button
                            onClick={() => router.push('/subscription')}
                            style={{ background: '#4285F4', color: 'white', padding: '16px 32px', borderRadius: '12px', border: 'none', fontWeight: 800, fontSize: 16, width: '100%', cursor: 'pointer', boxShadow: '0 8px 16px rgba(66, 133, 244, 0.25)' }}>
                            Go to Subscription Page
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
