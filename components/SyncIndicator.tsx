'use client';
import { Cloud, CloudOff, RefreshCw, Check, AlertTriangle } from 'lucide-react';
import { useStore } from '@/lib/store';
import toast from 'react-hot-toast';

export default function SyncIndicator() {
    const { syncStatus, lastSyncedAt, syncError, bump } = useStore();

    const getStatusIcon = () => {
        switch (syncStatus) {
            case 'syncing': return <RefreshCw size={15} className="animate-spin" color="#4285F4" />;
            case 'saved': return <Check size={15} color="#34A853" />;
            case 'error': return <AlertTriangle size={15} color="#EA4335" />;
            case 'offline': return <CloudOff size={15} color="#718096" />;
            default: return <Cloud size={15} color="#A0AEC0" />;
        }
    };

    const getStatusText = () => {
        switch (syncStatus) {
            case 'syncing': return 'Syncing...';
            case 'saved': return 'Cloud Synced';
            case 'error': return 'Sync Failed';
            case 'offline': return 'Offline Mode';
            default: return lastSyncedAt
                ? `Synced ${new Date(lastSyncedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                : 'Sync Now';
        }
    };

    return (
        <div
            style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px',
                borderRadius: 20, background: '#F1F3F5', cursor: 'pointer',
                transition: 'all 0.2s', border: '1px solid #E2E8F0'
            }}
            onClick={() => {
                if (syncStatus === 'syncing') return;
                toast.promise(
                    new Promise(async (resolve) => {
                        bump(); // Triggers the auto-sync effect in CloudSync
                        setTimeout(() => resolve(true), 1200);
                    }),
                    { loading: 'Syncing with cloud...', success: 'Cloud Sync Successful', error: 'Sync Failed' }
                );
            }}
            className="sync-indicator-hover"
            title={syncError || 'Click to sync now'}
        >
            {getStatusIcon()}
            <span style={{ fontSize: 11, fontWeight: 700, color: '#4A5568' }} className="sync-text">{getStatusText()}</span>

            <style>{`
                .sync-indicator-hover:hover { background: #E2E8F0; transform: translateY(-1px); }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .animate-spin { animation: spin 1.2s linear infinite; }
                @media (max-width: 639px) {
                    .sync-text { display: none !important; }
                    .sync-indicator-hover { padding: 4px 6px !important; }
                }
            `}</style>
        </div>
    );
}
