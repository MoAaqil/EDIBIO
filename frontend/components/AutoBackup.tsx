'use client';
import { useEffect, useRef, useState } from 'react';
import { useStore } from '@/lib/store';
import toast from 'react-hot-toast';

const BACKUP_KEY = 'edibio_auto_backup';
const BACKUP_META_KEY = 'edibio_auto_backup_meta';
const INTERVAL_KEY = 'edibio_backup_interval';
const DEBOUNCE_MS = 5000; // debounce rapid changes

export const BACKUP_INTERVAL_OPTIONS = [
    { label: '5 minutes',  value: 5 * 60 * 1000 },
    { label: '30 minutes', value: 30 * 60 * 1000 },
    { label: '1 hour',     value: 60 * 60 * 1000 },
    { label: '6 hours',    value: 6 * 60 * 60 * 1000 },
    { label: 'Daily',      value: 24 * 60 * 60 * 1000 },
] as const;

export const DEFAULT_BACKUP_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes default

/** Read the user-configured backup interval from localStorage */
export function getBackupIntervalMs(): number {
    if (typeof window === 'undefined') return DEFAULT_BACKUP_INTERVAL_MS;
    try {
        const raw = localStorage.getItem(INTERVAL_KEY);
        if (raw) {
            const n = parseInt(raw, 10);
            if (!isNaN(n) && n > 0) return n;
        }
    } catch {}
    return DEFAULT_BACKUP_INTERVAL_MS;
}

/** Save user-chosen backup interval */
export function setBackupIntervalMs(ms: number): void {
    try {
        localStorage.setItem(INTERVAL_KEY, String(ms));
    } catch {}
}

interface BackupMeta {
    savedAt: string;
    version: number;
    invoiceCount: number;
    partyCount: number;
    productCount: number;
}

function saveBackup(state: ReturnType<typeof useStore.getState>) {
    try {
        const backup = {
            version: 3,
            savedAt: new Date().toISOString(),
            user: state.user,
            companies: state.companies,
            parties: state.parties,
            products: state.products,
            invoices: state.invoices,
            expenses: state.expenses,
            agencyClients: state.agencyClients,
            agencyProjects: state.agencyProjects,
            hsnCache: state.hsnCache,
            aiApiKey: state.aiApiKey,
            activeCompanyId: state.activeCompanyId,
        };
        const json = JSON.stringify(backup);
        localStorage.setItem(BACKUP_KEY, json);
        const meta: BackupMeta = {
            savedAt: backup.savedAt,
            version: 3,
            invoiceCount: state.invoices.length,
            partyCount: state.parties.length,
            productCount: state.products.length,
        };
        localStorage.setItem(BACKUP_META_KEY, JSON.stringify(meta));
    } catch (e) {
        console.warn('[AutoBackup] Save failed (storage full?):', e);
    }
}

export function getAutoBackup(): any | null {
    try {
        const raw = localStorage.getItem(BACKUP_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

export function getAutoBackupMeta(): BackupMeta | null {
    try {
        const raw = localStorage.getItem(BACKUP_META_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

export function restoreFromAutoBackup(): boolean {
    const backup = getAutoBackup();
    if (!backup || !backup.companies) return false;
    try {
        useStore.setState({
            companies: backup.companies || [],
            parties: backup.parties || [],
            products: backup.products || [],
            invoices: backup.invoices || [],
            expenses: backup.expenses || [],
            agencyClients: backup.agencyClients || [],
            agencyProjects: backup.agencyProjects || [],
            hsnCache: backup.hsnCache || [],
            aiApiKey: backup.aiApiKey || null,
            user: backup.user || null,
            isAuthenticated: !!backup.user,
            activeCompanyId: backup.activeCompanyId || null,
            lastModified: Date.now()
        });
        return true;
    } catch {
        return false;
    }
}

export default function AutoBackup() {
    const lastModified = useStore(s => s.lastModified);
    const isAuthenticated = useStore(s => s.isAuthenticated);
    const isHydrating = useStore(s => s.isHydrating);
    const isDemo = useStore(s => s.isDemo);

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [restored, setRestored] = useState(false);

    // On mount: check if IndexedDB data is missing but localStorage backup exists
    useEffect(() => {
        if (isHydrating || restored) return;
        setRestored(true);

        const state = useStore.getState();
        const hasData = state.companies.length > 0 || state.invoices.length > 0 || state.parties.length > 0;

        if (!hasData && state.isAuthenticated) {
            const backup = getAutoBackup();
            if (backup && backup.companies?.length > 0) {
                const ok = restoreFromAutoBackup();
                if (ok) {
                    const meta = getAutoBackupMeta();
                    toast.success(
                        `✅ Data restored from auto-backup (${meta?.invoiceCount ?? 0} bills, ${meta?.partyCount ?? 0} parties)`,
                        { duration: 6000, id: 'auto-restore' }
                    );
                }
            }
        }
    }, [isHydrating, isAuthenticated, restored]);

    // Debounced save on every store change
    useEffect(() => {
        if (isDemo || isHydrating || !isAuthenticated) return;

        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            const state = useStore.getState();
            if (state.companies.length > 0 || state.invoices.length > 0) {
                saveBackup(state);
            }
        }, DEBOUNCE_MS);

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [lastModified, isDemo, isHydrating, isAuthenticated]);

    // Periodic save using user-configured interval (reads from localStorage dynamically)
    useEffect(() => {
        if (isDemo || !isAuthenticated) return;

        const startInterval = () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            const ms = getBackupIntervalMs();
            intervalRef.current = setInterval(() => {
                const state = useStore.getState();
                if (!state.isDemo && state.isAuthenticated && state.companies.length > 0) {
                    saveBackup(state);
                }
                // Re-read the interval in case user changed it while running
                const newMs = getBackupIntervalMs();
                if (newMs !== ms) startInterval(); // restart with updated interval
            }, ms);
        };

        startInterval();

        // Also listen for storage changes (in case interval was updated in settings)
        const handleStorage = (e: StorageEvent) => {
            if (e.key === INTERVAL_KEY) startInterval();
        };
        window.addEventListener('storage', handleStorage);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            window.removeEventListener('storage', handleStorage);
        };
    }, [isDemo, isAuthenticated]);

    return null; // invisible component
}
