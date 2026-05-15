'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useStore } from '@/lib/store';
import toast from 'react-hot-toast';

export default function MongoSync() {
    const { 
        isAuthenticated, user, isDemo, setIsHydrating, 
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

            // If cloud is newer OR we have no local companies but cloud has them
            if (cloudTime > localTime || (s.companies.length === 0 && cloudState.companies?.length > 0)) {
                const keys = ['companies', 'parties', 'products', 'invoices', 'expenses', 'agencyClients', 'agencyProjects', 'templates'];
                const merged: any = {};
                
                keys.forEach(k => merged[k] = cloudState[k] || []);
                if (cloudState.user) merged.user = cloudState.user;
                if (cloudState.aiApiKey) merged.aiApiKey = cloudState.aiApiKey;
                if (cloudState.aiUsageCount) merged.aiUsageCount = cloudState.aiUsageCount;
                if (cloudState.primarySwapCount) merged.primarySwapCount = cloudState.primarySwapCount;

                useStore.setState(merged);
                setLastSyncedAt(cloudTime);
                localStorage.setItem(`sync_ts_${user.uid}`, cloudTime.toString());
            }
        } catch (err) {
            console.error('[MongoSync] Pull error:', err);
        }
    }, [isAuthenticated, user?.uid, isDemo, setLastSyncedAt]);

    const sync = useCallback(async (showToast = true) => {
        if (!isAuthenticated || !user?.uid || isDemo) return;
        
        try {
            setSyncStatus('syncing');
            const state = useStore.getState();
            const localTime = parseInt(localStorage.getItem(`sync_ts_${user.uid}`) || '0', 10);
            
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
                aiApiKey: state.aiApiKey,
                aiUsageCount: state.aiUsageCount,
                primarySwapCount: state.primarySwapCount
            };

            const role = state.user?.role || 'owner';
            const activeCompanyId = state.activeCompanyId;

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

    // Initial hydration
    useEffect(() => {
        if (!isAuthenticated || !user?.uid || isDemo) {
            hasHydrated.current = false;
            if (isAuthenticated) setIsHydrating(false);
            return;
        }

        const hydrationTimeout = setTimeout(() => {
            if (useStore.getState().isHydrating) {
                console.warn('[MongoSync] Hydration timed out, forcing false');
                setIsHydrating(false);
            }
        }, 15000);

        if (hasHydrated.current) return;
        hasHydrated.current = true;

        (async () => {
             if (!navigator.onLine) {
                 setIsHydrating(false);
                 return;
             }
             await pull();
             setIsHydrating(false);
             clearTimeout(hydrationTimeout);
        })();
        return () => clearTimeout(hydrationTimeout);
    }, [isAuthenticated, user?.uid, isDemo, pull, setIsHydrating]);

    // Live Update Polling (Check Cloud every 20s)
    useEffect(() => {
        if (!isAuthenticated || isDemo) return;
        const interval = setInterval(() => pull(), 20000);
        return () => clearInterval(interval);
    }, [isAuthenticated, isDemo, pull]);

    // Auto sync on change
    useEffect(() => {
        if (!isAuthenticated || isDemo) return;
        const sub = useStore.subscribe(state => {
            if (state.isHydrating) return;
            const sig = `${state.lastModified}`;
            if (sig !== prevStateStr.current) {
                prevStateStr.current = sig;
                const t = setTimeout(() => sync(), 5000);
                return () => clearTimeout(t);
            }
        });
        return () => sub();
    }, [isAuthenticated, isDemo, sync]);

    // Force Sync Global helper
    useEffect(() => {
        (window as any).forceEdibioCloudSync = async () => {
            if (!isAuthenticated || !user?.uid) return;
            toast.loading('Force Syncing...', { id: 'forcesync' });
            
            try {
                const s = useStore.getState();
                const role = s.user?.role || 'owner';
                const activeCompanyId = s.activeCompanyId;
                const qs = `?userId=${user.uid}&role=${role}&companyId=${activeCompanyId || ''}`;
                
                const res = await fetch(`/api/sync${qs}`);
                if (!res.ok) throw new Error('No cloud data found');
                
                const data = await res.json();
                const cloudState = data.payload;
                
                const merged: any = {};
                const keys = ['companies', 'parties', 'products', 'invoices', 'expenses', 'agencyClients', 'agencyProjects', 'templates'];
                keys.forEach(k => merged[k] = cloudState[k] || []);
                
                if (cloudState.user) merged.user = cloudState.user;
                if (cloudState.aiApiKey) merged.aiApiKey = cloudState.aiApiKey;
                if (cloudState.aiUsageCount) merged.aiUsageCount = cloudState.aiUsageCount;
                if (cloudState.primarySwapCount) merged.primarySwapCount = cloudState.primarySwapCount;
                
                useStore.setState(merged);
                
                const serverTime = data.updatedAt || Date.now();
                setLastSyncedAt(serverTime);
                localStorage.setItem(`sync_ts_${user.uid}`, serverTime.toString());
                
                toast.success('Force Sync Complete!', { id: 'forcesync' });
            } catch (err) {
                toast.error('Sync failed', { id: 'forcesync' });
            }
        };
        return () => { (window as any).forceEdibioCloudSync = null; };
    }, [isAuthenticated, user?.uid, setLastSyncedAt]);

    return null;
}
