'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import Image from 'next/image';

export default function SplashScreen({ children }: { children: React.ReactNode }) {
    const { isHydrating } = useStore();
    const [showSplash, setShowSplash] = useState(true);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        // Once hydration is complete, let's wait a bit to show our cool animation, then fade it out.
        if (!isHydrating) {
            const timer1 = setTimeout(() => {
                setIsFading(true);
            }, 800); // Hold the splash text for 0.8s minimum

            const timer2 = setTimeout(() => {
                setShowSplash(false);
            }, 1200); // 0.4s fade out animation length

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
            };
        }
    }, [isHydrating]);

    // Safety timeout: if Firebase/hydration takes > 10s, force dismiss the splash
    // This prevents the app from hanging forever on unauthorized domains or slow networks.
    useEffect(() => {
        const safety = setTimeout(() => {
            setIsFading(true);
            setTimeout(() => setShowSplash(false), 500);
        }, 10000);
        return () => clearTimeout(safety);
    }, []);

    if (!showSplash) return <>{children}</>;

    return (
        <>
            {/* The main app content loaded underneath, invisible but mounting */}
            <div style={{ visibility: isFading ? 'visible' : 'hidden', opacity: isFading ? 1 : 0, transition: 'opacity 0.4s ease' }}>
                {children}
            </div>

            {/* The actual Splash Screen Overlay */}
            <div style={{
                position: 'fixed',
                inset: 0,
                background: '#FFFFFF',
                zIndex: 99999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: isFading ? 0 : 1,
                pointerEvents: isFading ? 'none' : 'auto',
                transition: 'opacity 0.4s ease-out',
            }}>
                <div style={{
                    animation: 'splashBounce 1s cubic-bezier(0.28, 0.84, 0.42, 1) forwards',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 16
                }}>
                    <div style={{
                        width: 90, height: 90,
                        background: 'white',
                        borderRadius: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                        overflow: 'hidden'
                    }}>
                        <Image src="/logo.png" alt="Edibio Logo" width={70} height={70} style={{ objectFit: 'contain' }} priority />
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <h1 style={{
                            color: '#1A1A2E',
                            fontSize: 32,
                            fontWeight: 900,
                            margin: 0,
                            letterSpacing: '-1px'
                        }}>Edibio</h1>
                        <p style={{
                            color: '#718096',
                            fontSize: 13,
                            marginTop: 2,
                            fontWeight: 700,
                            letterSpacing: '1px',
                            textTransform: 'uppercase'
                        }}>
                            ERP Suite
                        </p>
                    </div>

                    <div style={{ marginTop: 24, display: 'flex', gap: 8 }}>
                        <div className="google-dot" style={{ backgroundColor: '#4285F4', animationDelay: '0s' }}></div>
                        <div className="google-dot" style={{ backgroundColor: '#EA4335', animationDelay: '0.15s' }}></div>
                        <div className="google-dot" style={{ backgroundColor: '#FBBC05', animationDelay: '0.3s' }}></div>
                        <div className="google-dot" style={{ backgroundColor: '#34A853', animationDelay: '0.45s' }}></div>
                    </div>
                </div>

                <style>{`
                    @keyframes splashBounce {
                        0% { transform: scale(0.8) translateY(20px); opacity: 0; }
                        50% { transform: scale(1.05) translateY(-5px); opacity: 1; }
                        100% { transform: scale(1) translateY(0); opacity: 1; }
                    }
                    .google-dot {
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        animation: googleDotBounce 1.2s infinite cubic-bezier(0.4, 0, 0.2, 1);
                    }
                    @keyframes googleDotBounce {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-10px); }
                    }
                `}</style>
            </div>
        </>
    );
}
