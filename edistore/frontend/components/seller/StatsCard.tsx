'use client';

import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  trend?: string;
  trendUp?: boolean;
}

export default function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  trend, 
  trendUp 
}: StatsCardProps) {
  return (
    <div className="card" style={cardStyle}>
      <div style={contentRowStyle}>
        <div>
          <p style={titleStyle}>{title}</p>
          <p style={valueStyle}>{value}</p>
        </div>
        <div style={iconWrapperStyle(color)}>
          <Icon size={22} color={color} />
        </div>
      </div>
      {trend && (
        <div style={trendStyle}>
          <span style={trendBadgeStyle(trendUp ?? false)}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
          <span style={trendLabelStyle}>vs last month</span>
        </div>
      )}
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  padding: '24px',
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  flex: 1,
  minWidth: '220px',
};

const contentRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
};

const titleStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: '700',
  color: '#64748b',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const valueStyle: React.CSSProperties = {
  fontSize: '28px',
  fontWeight: '800',
  color: '#0f172a',
  marginTop: '8px',
  fontFamily: "'Outfit', sans-serif",
};

const iconWrapperStyle = (color: string): React.CSSProperties => ({
  width: '46px',
  height: '46px',
  borderRadius: '12px',
  backgroundColor: color + '12',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const trendStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginTop: '16px',
  fontSize: '12px',
};

const trendBadgeStyle = (up: boolean): React.CSSProperties => ({
  color: up ? '#059669' : '#ef4444',
  fontWeight: '700',
});

const trendLabelStyle: React.CSSProperties = {
  color: '#94a3b8',
};
