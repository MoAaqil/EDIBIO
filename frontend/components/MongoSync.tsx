'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useStore } from '@/lib/store';
import toast from 'react-hot-toast';

export default function MongoSync() {
    const { 
        isHydrating, isAuthenticated, user, isDemo, setIsHydrating, 
        setLastSyncedAt, setSyncStatus, setSyncError 
    } = useStore();
    
    const prevStateStr = useRef<string>('');
    const hasHydrated = useRef(false);

    const pull = useCallback(async () => {
        if (!isAuthenticated || !user?.uid || isDemo) return;
        try {
            const s = useStore.getState();
            const role = s.user?.role || 'owner';
            const activeCompanyId = s.activeCompanyId;
            const isOwner = !role || role === 'owner' || role === 'co_owner';
            const isStaff = !isOwner;
            if (isStaff && !activeCompanyId) {
                return;
            }

            const qs = `?userId=${user.uid}&role=${role}&companyId=${activeCompanyId || ''}`;
            
            const res = await fetch(`/api/sync${qs}`);
            if (!res.ok) {
                if (res.status === 404) {
                    // New user or wiped account
                    return;
                }
                throw new Error('Cloud fetch failed');
            }

            const data = await res.json();
            const cloudState = data.payload;
            const cloudTime = data.updatedAt || 0;
            const localTime = parseInt(localStorage.getItem(`sync_ts_${user.uid}`) || '0', 10);

            // Always pull if:
            //  - This is a new/fresh device (localTime === 0)
            //  - Cloud data is newer than local data
            //  - We have no local companies but cloud has them
            const shouldPull = localTime === 0 || cloudTime > localTime || (s.companies.length === 0 && (cloudState.companies?.length ?? 0) > 0);
            if (shouldPull && cloudState) {
                const keys = ['companies', 'parties', 'products', 'invoices', 'expenses', 'agencyClients', 'agencyProjects', 'templates', 'purchaseOrders', 'stockTransfers'];
                const merged: any = {};
                
                keys.forEach(k => merged[k] = cloudState[k] || []);
                if (cloudState.user) merged.user = cloudState.user;
                if (cloudState.aiApiKey) merged.aiApiKey = cloudState.aiApiKey;
                if (cloudState.aiUsageCount !== undefined) merged.aiUsageCount = cloudState.aiUsageCount;
                if (cloudState.primarySwapCount !== undefined) merged.primarySwapCount = cloudState.primarySwapCount;

                useStore.setState(merged);
                setLastSyncedAt(cloudTime);
                localStorage.setItem(`sync_ts_${user.uid}`, cloudTime.toString());
                
                // Auto-set activeCompanyId on new device if not already set
                const currentState = useStore.getState();
                if (!currentState.activeCompanyId && (merged.companies?.length ?? 0) > 0) {
                    useStore.setState({ activeCompanyId: merged.companies[0].id });
                }
            }
        } catch (err) {
            console.error('[MongoSync] Pull error:', err);
        }
    }, [isAuthenticated, user?.uid, isDemo, setLastSyncedAt]);

    const sync = useCallback(async (showToast = true) => {
        if (!isAuthenticated || !user?.uid || isDemo) return;
        
        const localTime = parseInt(localStorage.getItem(`sync_ts_${user.uid}`) || '0', 10);
        if (localTime === 0) {
            console.log('[MongoSync] Skipping push sync since first pull is pending');
            return;
        }

        try {
            setSyncStatus('syncing');
            const state = useStore.getState();
            
            const payload = {
                user: state.user,
                companies: state.companies,
                parties: state.parties,
                products: state.products,
                invoices: state.invoices,
                expenses: state.expenses,
                agencyClients: state.agencyClients,
                agencyProjects: state.agencyProjects,
                templates: state.templates,
                purchaseOrders: state.purchaseOrders,
                stockTransfers: state.stockTransfers,
                aiApiKey: state.aiApiKey,
                aiUsageCount: state.aiUsageCount,
                primarySwapCount: state.primarySwapCount
            };

            const role = state.user?.role || 'owner';
            const activeCompanyId = state.activeCompanyId;

            const isOwner = !role || role === 'owner' || role === 'co_owner';
            const isStaff = !isOwner;
            if (isStaff && !activeCompanyId) {
                setSyncStatus('saved');
                return;
            }

            const res = await fetch('/api/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.uid,
                    role,
                    companyId: activeCompanyId,
                    localTime,
                    payload
                })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Sync Failed');
            }

            const { updatedAt } = await res.json();
            setLastSyncedAt(updatedAt);
            localStorage.setItem(`sync_ts_${user.uid}`, updatedAt.toString());
            setSyncStatus('saved');
            if (showToast) toast.success('Cloud Synced');
        } catch (err: any) {
            console.error('[MongoSync] Sync error:', err);
            setSyncStatus('error');
            setSyncError(err.message);
            if (showToast) toast.error(err.message.includes('Conflict') ? 'Sync Conflict: Use Force Sync' : 'Sync Error');
        }
    }, [isAuthenticated, user?.uid, isDemo, setLastSyncedAt, setSyncStatus, setSyncError]);

    // Initial cloud pull (only runs AFTER local hydration completes)
    useEffect(() => {
        if (isHydrating) return; // Wait until local IndexedDB is fully loaded!

        if (!isAuthenticated || !user?.uid || isDemo) {
            hasHydrated.current = false;
            return;
        }

        if (hasHydrated.current) return;
        hasHydrated.current = true;

        (async () => {
             if (navigator.onLine) {
                 await pull();
             }
        })();
    }, [isHydrating, isAuthenticated, user?.uid, isDemo, pull]);

    // Live Update Polling (Check Cloud every 20s)
    useEffect(() => {
        if (!isAuthenticated || isDemo) return;
        const interval = setInterval(() => pull(), 20000);
        return () => clearInterval(interval);
    }, [isAuthenticated, isDemo, pull]);

    // Auto sync on change
    useEffect(() => {
        if (!isAuthenticated || isDemo) return;
        let t: any;
        const sub = useStore.subscribe(state => {
            if (state.isHydrating) return;
            const sig = `${state.lastModified}`;
            if (sig !== prevStateStr.current) {
                prevStateStr.current = sig;
                if (t) clearTimeout(t);
                t = setTimeout(() => sync(), 5000);
            }
        });
        return () => {
            sub();
            if (t) clearTimeout(t);
        };
    }, [isAuthenticated, isDemo, sync]);

    // Force Sync Global helper — ONLY pulls from cloud (does NOT push local state)
    useEffect(() => {
        (window as any).forceEdibioCloudSync = async () => {
            if (!isAuthenticated || !user?.uid) return;
            toast.loading('Pulling from Cloud...', { id: 'forcesync' });
            
            try {
                const s = useStore.getState();
                const role = s.user?.role || 'owner';
                const activeCompanyId = s.activeCompanyId;
                
                const isOwner = !role || role === 'owner' || role === 'co_owner';
                const isStaff = !isOwner;
                if (isStaff && !activeCompanyId) {
                    toast.error('No active company selected for staff sync', { id: 'forcesync' });
                    return;
                }

                const qs = `?userId=${user.uid}&role=${role}&companyId=${activeCompanyId || ''}`;
                
                const res = await fetch(`/api/sync${qs}`);
                if (!res.ok) throw new Error('No cloud data found');
                
                const data = await res.json();
                const cloudState = data.payload;
                
                if (!cloudState) {
                    toast.error('No cloud data found.', { id: 'forcesync' });
                    return;
                }

                const merged: any = {};
                const keys = ['companies', 'parties', 'products', 'invoices', 'expenses', 'agencyClients', 'agencyProjects', 'templates', 'purchaseOrders', 'stockTransfers'];
                keys.forEach(k => merged[k] = cloudState[k] || []);
                
                if (cloudState.user) merged.user = cloudState.user;
                if (cloudState.aiApiKey) merged.aiApiKey = cloudState.aiApiKey;
                if (cloudState.aiUsageCount !== undefined) merged.aiUsageCount = cloudState.aiUsageCount;
                if (cloudState.primarySwapCount !== undefined) merged.primarySwapCount = cloudState.primarySwapCount;
                
                useStore.setState(merged);
                
                const serverTime = data.updatedAt || Date.now();
                setLastSyncedAt(serverTime);
                localStorage.setItem(`sync_ts_${user.uid}`, serverTime.toString());
                
                toast.success('Force Sync Complete! ☁️', { id: 'forcesync' });
            } catch (err) {
                console.error('[MongoSync] Force sync failed:', err);
                toast.error('Sync failed. Check your connection.', { id: 'forcesync' });
            }
        };
        return () => { (window as any).forceEdibioCloudSync = null; };
    }, [isAuthenticated, user?.uid, setLastSyncedAt]);

    useEffect(() => {
        (window as any).triggerEdibioCloudSync = () => {
            if (!isAuthenticated || !user?.uid || isDemo) return;
            sync(false);
        };
        return () => { (window as any).triggerEdibioCloudSync = null; };
    }, [isAuthenticated, user?.uid, isDemo, sync]);

    return null;
}
