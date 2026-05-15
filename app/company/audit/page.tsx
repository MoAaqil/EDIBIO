'use client';
import { useActiveCompany } from '@/lib/store';
import { formatDate } from '@/lib/utils';
import { Shield, Clock, Database, FileText, AlertCircle, Eye, LogIn, Trash2 } from 'lucide-react';
import { useState } from 'react';

const ACTION_ICONS: Record<string, any> = {
    'login': LogIn,
    'create': FileText,
    'update': Database,
    'delete': AlertCircle,
    'view': Eye
};

export default function AuditTrailPage() {
    const company = useActiveCompany();
    const logs = company?.auditLogs || [];

    const [search, setSearch] = useState('');
    const [filterAction, setFilterAction] = useState('all');

    const filteredLogs = logs.filter((log: any) => {
        if (filterAction !== 'all' && log.action !== filterAction) return false;
        if (search) {
            const term = search.toLowerCase();
            return log.userEmail.toLowerCase().includes(term) ||
                log.resource.toLowerCase().includes(term) ||
                log.details.toLowerCase().includes(term);
        }
        return true;
    });

    return (
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Header */}
            <div className="audit-header" style={{ display: 'flex', gap: 16, alignItems: 'center', background: 'linear-gradient(135deg, #1A1A2E, #2A2A4A)', padding: '24px 30px', borderRadius: 16, color: 'white', border: '1px solid #3A3A5A' }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(66, 133, 244, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Shield size={28} color="#4285F4" />
                </div>
                <div style={{ flex: 1 }}>
                    <h1 style={{ fontSize: 24, fontWeight: 900, margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>Security Audit Trail</h1>
                    <p style={{ fontSize: 13, margin: 0, opacity: 0.8, fontWeight: 500 }}>
                        Track, monitor, and view all operational actions for <span style={{ color: '#FDE047' }}>{company?.name}</span>
                    </p>
                </div>
                <div className="audit-stats" style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: 12, opacity: 0.6, margin: '0 0 2px 0' }}>Total Events</p>
                            <p style={{ fontSize: 24, fontWeight: 900, margin: 0, color: '#4285F4' }}>{logs.length}</p>
                        </div>
                    </div>
                    <button onClick={() => {
                        if (window.confirm('Are you sure you want to clear all audit logs? This action cannot be undone.')) {
                            import('@/lib/store').then(({ useStore }) => {
                                if (company?.id) useStore.getState().updateCompany(company.id, { auditLogs: [] });
                            });
                        }
                    }} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#FCA5A5', padding: '6px 12px', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 8, fontSize: 12, fontWeight: 800, cursor: 'pointer', display: 'flex', gap: 6, alignItems: 'center' }}>
                        <Trash2 size={14} /> Clear Logs
                    </button>
                </div>
            </div>

            <style>{`
                @media (max-width: 639px) {
                    .audit-header { flex-direction: column !important; text-align: center !important; padding: 24px 20px !important; }
                    .audit-stats { align-items: center !important; text-align: center !important; width: 100% !important; border-top: 1px solid rgba(255,255,255,0.1); paddingTop: 16px !important; }
                    .audit-stats div { text-align: center !important; }
                    h1 { font-size: 20px !important; }
                }
            `}</style>

            {/* Controls */}
            <div className="card" style={{ padding: '16px 20px', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                    <input
                        className="e-input"
                        placeholder="Search logs by user, resource, or details..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                    {['all', 'login', 'create', 'update', 'delete'].map(act => (
                        <button
                            key={act}
                            onClick={() => setFilterAction(act)}
                            className={`godown-chip ${filterAction === act ? 'active' : ''}`}
                            style={{
                                border: filterAction === act ? '1px solid #4285F4' : '1px solid #E2E8F0',
                                background: filterAction === act ? '#EFF6FF' : 'white',
                                color: filterAction === act ? '#1E40AF' : '#64748B',
                                padding: '6px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                                textTransform: 'capitalize'
                            }}
                        >
                            {act}
                        </button>
                    ))}
                </div>
            </div>

            {/* Timeline List */}
            <div className="card" style={{ padding: '0 20px', overflow: 'hidden' }}>
                {filteredLogs.length === 0 ? (
                    <div style={{ padding: '60px 20px', textAlign: 'center' }}>
                        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#F1F5F9', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Shield size={32} color="#CBD5E1" />
                        </div>
                        <h3 style={{ fontSize: 16, fontWeight: 800, color: '#475569', marginBottom: 4 }}>No audit logs found</h3>
                        <p style={{ fontSize: 13, color: '#94A3B8' }}>Start performing actions in the ERP to see them tracked here.</p>
                    </div>
                ) : (
                    <div style={{ padding: '20px 0' }}>
                        {filteredLogs.map((log: any, index: number) => {
                            const Icon = ACTION_ICONS[log.action] || FileText;
                            const isDestructive = log.action === 'delete';

                            return (
                                <div key={log.id} style={{ display: 'flex', gap: 16, position: 'relative', paddingBottom: index === filteredLogs.length - 1 ? 0 : 24 }}>
                                    {/* Activity Line */}
                                    {index !== filteredLogs.length - 1 && (
                                        <div style={{ position: 'absolute', left: 20, top: 40, bottom: 0, width: 2, background: '#E2E8F0' }} />
                                    )}

                                    {/* Icon */}
                                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: isDestructive ? '#FEF2F2' : '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1, border: `2px solid ${isDestructive ? '#FECACA' : '#BFDBFE'}` }}>
                                        <Icon size={16} color={isDestructive ? '#EF4444' : '#3B82F6'} />
                                    </div>

                                    {/* Content */}
                                    <div style={{ flex: 1, background: '#F8FAFC', padding: 16, borderRadius: 12, border: '1px solid #F1F5F9' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                                            <div>
                                                <p style={{ fontSize: 14, fontWeight: 700, color: '#1E293B', marginBottom: 2 }}>
                                                    <span style={{ textTransform: 'capitalize', color: isDestructive ? '#EF4444' : '#3B82F6' }}>{log.action}</span>
                                                    {' '}{log.resource}
                                                </p>
                                                <p style={{ fontSize: 13, color: '#64748B' }}>{log.details}</p>
                                            </div>
                                            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                                                <span style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', display: 'flex', alignItems: 'center', gap: 4, background: 'white', padding: '4px 8px', borderRadius: 12, border: '1px solid #E2E8F0' }}>
                                                    <Clock size={12} />
                                                    {formatDate(log.timestamp)}
                                                </span>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12, paddingTop: 12, borderTop: '1px dashed #E2E8F0' }}>
                                            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: '#475569' }}>
                                                {log.userName[0]}
                                            </div>
                                            <span style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>{log.userName}</span>
                                            <span style={{ fontSize: 12, color: '#94A3B8' }}>({log.userEmail})</span>
                                            <span style={{ fontSize: 11, color: '#CBD5E1', marginLeft: 'auto' }}>IP: {log.ipAddress}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
