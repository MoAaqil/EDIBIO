'use client';
/**
 * Offline Detection & Subscription Guard
 * - Warns after 10 days offline (notification)
 * - Locks app after 20 days offline  
 * - Stores last-online timestamp in localStorage
 */
import { useEffect, useState, useCallback } from 'react';
import { useStore } from '@/lib/store';
import { Wifi, WifiOff } from 'lucide-react';
import Image from 'next/image';

const WARN_DAYS = 10;
const LOCK_DAYS = 20;
const SYNC_INTERVAL_DAYS = 3;
const LS_LAST_ONLINE = 'edibio_last_online';
const LS_LAST_SYNC = 'edibio_last_sync';

function daysSince(iso: string | null) {
    if (!iso) return 0;
    return Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
}

export default function OfflineGuard({ children }: { children: React.ReactNode }) {
    const [isLocked, setIsLocked] = useState(false);
    const [showWarn, setShowWarn] = useState(false);
    const [isOnline, setIsOnline] = useState(true);
    const { isAuthenticated } = useStore();

    const syncToCloud = useCallback(() => {
        // In a real implementation this would push to Firebase/MongoDB
        localStorage.setItem(LS_LAST_SYNC, new Date().toISOString());
        console.log('[Edibio] Data synced to cloud');
    }, []);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            const now = new Date().toISOString();
            localStorage.setItem(LS_LAST_ONLINE, now);
            setIsLocked(false);
            setShowWarn(false);
            // Sync if it's been 3+ days
            const lastSync = localStorage.getItem(LS_LAST_SYNC);
            if (!lastSync || daysSince(lastSync) >= SYNC_INTERVAL_DAYS) {
                syncToCloud();
            }
        };

        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Initial check
        if (navigator.onLine) {
            const now = new Date().toISOString();
            localStorage.setItem(LS_LAST_ONLINE, now);
            const lastSync = localStorage.getItem(LS_LAST_SYNC);
            if (!lastSync || daysSince(lastSync) >= SYNC_INTERVAL_DAYS) syncToCloud();
        } else {
            setIsOnline(false);
            const lastOnline = localStorage.getItem(LS_LAST_ONLINE);
            const days = daysSince(lastOnline);
            if (days >= LOCK_DAYS && isAuthenticated) setIsLocked(true);
            else if (days >= WARN_DAYS && isAuthenticated) setShowWarn(true);
        }

        // Request notification permission
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [isAuthenticated, syncToCloud]);

    // Offline lock screen
    if (isLocked) {
        return (
            <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#1A1A2E', padding: 24, textAlign: 'center' }}>
                <div style={{ width: 80, height: 80, borderRadius: 999, background: 'rgba(234,67,53,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <WifiOff size={36} color="#EA4335" />
                </div>
                <h1 style={{ color: 'white', fontSize: 24, fontWeight: 900, marginBottom: 12 }}>App Locked — No Internet</h1>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 32, maxWidth: 320 }}>
                    Edibio has been offline for {LOCK_DAYS}+ days. Please connect to the internet to continue using the app and sync your data to the cloud.
                </p>
                <button onClick={() => window.location.reload()} style={{ padding: '14px 32px', borderRadius: 14, background: '#4285F4', color: 'white', border: 'none', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
                    🔄 Retry Connection
                </button>
            </div>
        );
    }

    return (
        <>
            {children}
            {/* Offline banner */}
            {!isOnline && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, background: '#EA4335', color: 'white', textAlign: 'center', fontSize: 12, fontWeight: 700, padding: '6px', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <WifiOff size={13} /> Working Offline — Data saved locally
                </div>
            )}
            {/* 10-day warning */}
            {showWarn && (
                <div style={{ position: 'fixed', bottom: 90, left: 16, right: 16, background: '#FBBC04', borderRadius: 14, padding: '14px 18px', zIndex: 999, boxShadow: '0 8px 32px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <WifiOff size={18} color="#92400E" />
                    <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 800, color: '#92400E', fontSize: 13 }}>Please connect to internet</p>
                        <p style={{ fontSize: 11, color: '#B45309' }}>App will lock after 20 days offline. Connect to sync your data.</p>
                    </div>
                    <button onClick={() => setShowWarn(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#92400E', fontWeight: 800 }}>✕</button>
                </div>
            )}
        </>
    );
}
