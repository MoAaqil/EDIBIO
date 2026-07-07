'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useStore } from '@/lib/store';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Cloud, CloudOff, RefreshCw, Check, AlertCircle } from 'lucide-react';
import LZString from 'lz-string';
import toast from 'react-hot-toast';

const SYNC_INTERVAL = 60000;

export default function CloudSync() {
    const {
        user, isAuthenticated, isDemo, setIsHydrating,
        syncStatus, setSyncStatus,
        lastSyncedAt, setLastSyncedAt,
        syncError, setSyncError
    } = useStore();

    const hasHydrated = useRef(false);
    const prevStateStr = useRef('');

    const sync = useCallback(async (isManual = false) => {
        const _s = useStore.getState();
        if (_s.isHydrating && !isManual) return; // Wait! Don't sync while data is still coming down from the cloud.

        if (!isAuthenticated || !user?.uid || isDemo || user.uid === 'demo_user_123') {
            setIsHydrating(false);
            return;
        }
        if (!navigator.onLine) { setSyncStatus('offline'); setIsHydrating(false); return; }

        if (isManual) setSyncStatus('syncing');

        try {
            const s = useStore.getState();
            const payload = {
                user: s.user || null,
                aiApiKey: s.aiApiKey || '',
                aiUsageCount: s.aiUsageCount || 0,
                primarySwapCount: s.primarySwapCount || 0,
                companies: s.companies || [],
                parties: s.parties || [],
                products: s.products || [],
                invoices: s.invoices || [],
                expenses: s.expenses || [],
                purchaseOrders: s.purchaseOrders || [],
                agencyClients: s.agencyClients || [],
                agencyProjects: s.agencyProjects || [],
                templates: s.templates || [],
                stockTransfers: s.stockTransfers || [],
                hsnCache: (s.hsnCache || []).slice(0, 50),
            };

            const compressed = LZString.compressToUTF16(JSON.stringify(payload));
            const now = Date.now();

            const docRef = doc(db, 'userStores', user.uid);

            // Concurrency Protection check before blind overwrite
            const snap = await getDoc(docRef);
            if (snap.exists() && !isManual) {
                const cloudTime = snap.data().updatedAt || 0;
                const localTime = parseInt(localStorage.getItem(`sync_ts_${user.uid}`) || '0', 10);
                if (cloudTime > localTime + 2000) { // Tiny 2s buffer for clock drift
                    console.warn('[Sync] Blocked! Cloud is newer. Use Force Cloud Sync.');
                    setSyncStatus('error');
                    setSyncError('Conflict: Updated elsewhere. Go to Companies -> Force Cloud Sync.');
                    return;
                }
            }

            await setDoc(docRef, {
                compressedState: compressed,
                updatedAt: now,
                version: 10, // Bumped to 10
                email: user.email || user.phone || '',
            }, { merge: true });

            localStorage.setItem(`sync_ts_${user.uid}`, now.toString());
            setLastSyncedAt(now);
            setSyncStatus('saved');
            setIsHydrating(false);
            if (isManual) toast.success('Sync Successful (v10)');
            setTimeout(() => setSyncStatus('idle'), 2000);
            setSyncError(null);
        } catch (err: any) {
            console.error('[Sync] Fail:', err);
            setSyncStatus('error');
            setSyncError(err.code === 'permission-denied' ? 'Sync blocked by Cloud Rules. Please fix in Firebase console.' : 'Sync Failed');
            setIsHydrating(false);
            if (isManual) toast.error('Sync failed. Check connection.');
        }
    }, [isAuthenticated, user?.uid, isDemo, setIsHydrating, setSyncStatus, setLastSyncedAt, setSyncError]);

    // Initial Hydrate
    useEffect(() => {
        if (!isAuthenticated || !user?.uid || isDemo) {
            hasHydrated.current = false; // Reset on logout so next login fetches!
            if (isAuthenticated && !hasHydrated.current) setIsHydrating(false);
            return;
        }

        if (hasHydrated.current) return;
        hasHydrated.current = true;

        (async () => {
            try {
                const snap = await getDoc(doc(db, 'userStores', user.uid));
                if (!snap.exists()) { sync(); return; }

                const data = snap.data();
                if (!data.compressedState) { setIsHydrating(false); return; }

                const cloudTime = data.updatedAt || 0;
                const localTime = parseInt(localStorage.getItem(`sync_ts_${user.uid}`) || '0', 10);

                if (cloudTime > localTime) {
                    const cloudState = JSON.parse(LZString.decompressFromUTF16(data.compressedState) || '{}');
                    const local = useStore.getState();

                    const keys = ['companies', 'parties', 'products', 'invoices', 'expenses', 'purchaseOrders', 'agencyClients', 'agencyProjects', 'templates', 'stockTransfers'];
                    const merged: any = {};
                    keys.forEach(k => {
                        merged[k] = cloudState[k] || [];
                    });

                    if (cloudState.user) merged.user = cloudState.user;
                    if (cloudState.aiApiKey) merged.aiApiKey = cloudState.aiApiKey;
                    if (cloudState.aiUsageCount) merged.aiUsageCount = cloudState.aiUsageCount;
                    if (cloudState.primarySwapCount) merged.primarySwapCount = cloudState.primarySwapCount;

                    useStore.setState(merged);
                    toast.success('Data recovered from cloud ☁️');
                }
                setLastSyncedAt(cloudTime);
                localStorage.setItem(`sync_ts_${user.uid}`, cloudTime.toString());
                setIsHydrating(false);
            } catch (err: any) {
                console.error('[Sync] Restore failed:', err);
                setSyncStatus('error');
                setSyncError('Cloud Restore Failed');
                setIsHydrating(false);
            }
        })();
    }, [isAuthenticated, user?.uid, isDemo, sync, setIsHydrating, setLastSyncedAt, setSyncStatus, setSyncError]);

    // Auto sync on change
    useEffect(() => {
        if (!isAuthenticated || isDemo) return;
        const sub = useStore.subscribe(state => {
            if (state.isHydrating) return; // Wait until initial fetch finishes completely
            const sig = `${state.lastModified}`;
            if (sig !== prevStateStr.current) {
                prevStateStr.current = sig;
                const t = setTimeout(() => sync(), 5000);
                return () => clearTimeout(t);
            }
        });
        return () => sub();
    }, [isAuthenticated, isDemo, sync]);

    // Periodic sync
    useEffect(() => {
        const t = setInterval(() => sync(), SYNC_INTERVAL);
        return () => clearInterval(t);
    }, [sync]);

    useEffect(() => {
        (window as any).forceEdibioCloudSync = async () => {
            if (!isAuthenticated || !user?.uid || isDemo) return;
            setIsHydrating(true);
            toast.loading('Forcing Cloud Sync...', { id: 'forcesync' });
            try {
                const snap = await getDoc(doc(db, 'userStores', user.uid));
                if (snap.exists() && snap.data().compressedState) {
                    const data = snap.data();
                    const cloudState = JSON.parse(LZString.decompressFromUTF16(data.compressedState) || '{}');
                    const local = useStore.getState();
                    const keys = ['companies', 'parties', 'products', 'invoices', 'expenses', 'purchaseOrders', 'agencyClients', 'agencyProjects', 'templates'];
                    const merged: any = {};
                    keys.forEach(k => {
                        merged[k] = cloudState[k] || [];
                    });
                    if (cloudState.user) merged.user = cloudState.user;
                    if (cloudState.aiApiKey) merged.aiApiKey = cloudState.aiApiKey;
                    if (cloudState.aiUsageCount) merged.aiUsageCount = cloudState.aiUsageCount;
                    if (cloudState.primarySwapCount) merged.primarySwapCount = cloudState.primarySwapCount;
                    useStore.setState(merged);
                    setLastSyncedAt(data.updatedAt || Date.now());
                    localStorage.setItem(`sync_ts_${user.uid}`, (data.updatedAt || Date.now()).toString());
                    toast.success('Force Sync Complete!', { id: 'forcesync' });
                } else {
                    toast.error('No cloud data found.', { id: 'forcesync' });
                }
            } catch (err) {
                toast.error('Sync failed', { id: 'forcesync' });
            }
            setIsHydrating(false);
        };
        return () => { (window as any).forceEdibioCloudSync = null; };
    }, [isAuthenticated, user?.uid, isDemo, setIsHydrating, setLastSyncedAt]);

    if (!isAuthenticated || isDemo) return null;
    return null; // UI is now handled by SyncIndicator in Topbar
}
