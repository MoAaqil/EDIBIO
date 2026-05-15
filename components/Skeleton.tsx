'use client';

// Reusable skeleton loader components for any data-loading state

interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    radius?: number;
    style?: React.CSSProperties;
}

export function Skeleton({ width = '100%', height = 16, radius = 8, style }: SkeletonProps) {
    return (
        <div style={{
            width, height, borderRadius: radius,
            background: 'linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%)',
            backgroundSize: '200% 100%',
            animation: 'skeleton-shimmer 1.5s infinite',
            ...style,
        }} />
    );
}

export function SkeletonCard({ lines = 3 }: { lines?: number }) {
    return (
        <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Skeleton width="60%" height={18} />
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton key={i} width={i === lines - 1 ? '40%' : '90%'} height={13} />
            ))}
        </div>
    );
}

export function SkeletonRow() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderBottom: '1px solid #F8F9FA' }}>
            <Skeleton width={40} height={40} radius={12} style={{ flexShrink: 0 }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Skeleton width="50%" height={13} />
                <Skeleton width="30%" height={10} />
            </div>
            <Skeleton width={60} height={13} style={{ flexShrink: 0 }} />
        </div>
    );
}

export function SkeletonDashboard() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* KPI row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
                {[1, 2, 3, 4].map(i => <SkeletonCard key={i} lines={2} />)}
            </div>
            {/* Table */}
            <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 20, overflow: 'hidden' }}>
                {[1, 2, 3, 4, 5].map(i => <SkeletonRow key={i} />)}
            </div>
            <style>{`
                @keyframes skeleton-shimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            `}</style>
        </div>
    );
}
