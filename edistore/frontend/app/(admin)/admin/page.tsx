'use client';

import { formatPrice } from '@/lib/utils';
import { IndianRupee, Store, Users, DollarSign, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const stats = [
    { title: 'Platform GMV (Sales)', value: formatPrice(185000), icon: IndianRupee, color: '#10b981' },
    { title: 'Registered Sellers', value: '18', icon: Store, color: '#3b82f6' },
    { title: 'Platform Commissions (Net profit)', value: formatPrice(14800), icon: DollarSign, color: '#f59e0b' },
    { title: 'Total Buyers Registered', value: '482', icon: Users, color: '#8b5cf6' },
  ];

  return (
    <div style={containerStyle}>
      <div style={statsGridStyle}>
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="card" style={statCardStyle}>
              <div>
                <span style={statTitleStyle}>{s.title}</span>
                <p style={statValueStyle}>{s.value}</p>
              </div>
              <div style={iconWrapperStyle(s.color)}>
                <Icon size={20} color={s.color} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="card" style={{ padding: '28px', marginTop: '24px' }}>
        <div style={sectionHeaderStyle}>
          <h3 style={sectionTitleStyle}>Seller Approvals Pipeline</h3>
          <Link href="/admin/sellers" style={reviewLinkStyle}>
            Review Applications →
          </Link>
        </div>
        <p style={sectionDescStyle}>
          There are currently <strong>3 partner store applications</strong> waiting for review. Verify business licensing numbers, PAN cards, and operating areas.
        </p>
      </div>
    </div>
  );
}

// Styles
const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const statsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '20px',
};

const statCardStyle: React.CSSProperties = {
  padding: '24px',
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const statTitleStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: '700',
  color: '#64748b',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const statValueStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: '800',
  color: '#0f172a',
  marginTop: '6px',
  fontFamily: "'Outfit', sans-serif",
};

const iconWrapperStyle = (color: string): React.CSSProperties => ({
  width: '44px',
  height: '44px',
  borderRadius: '10px',
  backgroundColor: color + '12',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const sectionHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '16px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: '800',
};

const reviewLinkStyle: React.CSSProperties = {
  color: '#4f46e5',
  fontWeight: '700',
  fontSize: '13px',
};

const sectionDescStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#475569',
  lineHeight: '1.5',
};
