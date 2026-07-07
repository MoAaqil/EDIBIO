'use client';

import { usePathname } from 'next/navigation';
import { useSellerStore } from '@/lib/store/seller';
import { Bell, User, Search, Store } from 'lucide-react';
import Link from 'next/link';

export default function SellerTopbar() {
  const pathname = usePathname();
  const { store, user } = useSellerStore();

  const getPageTitle = () => {
    const parts = pathname.split('/');
    const last = parts[parts.length - 1];
    if (last === 'dashboard') return 'Dashboard Overview';
    if (last === 'products') return 'Inventory Products';
    if (last === 'orders') return 'Customer Orders';
    if (last === 'analytics') return 'Performance Analytics';
    if (last === 'reviews') return 'Product Reviews';
    if (last === 'payments') return 'Payout Financials';
    if (last === 'notifications') return 'Seller Notifications';
    if (last === 'store-settings') return 'Store Profile settings';
    return 'Seller Dashboard';
  };

  return (
    <header style={topbarStyle}>
      {/* Page Title */}
      <h1 style={titleStyle}>{getPageTitle()}</h1>

      {/* Right controls */}
      <div style={controlsStyle}>
        {/* Store Name Badge */}
        {store ? (
          <div style={storeBadgeStyle}>
            <Store size={16} color="#4f46e5" />
            <span style={storeNameStyle}>{store.name}</span>
          </div>
        ) : (
          <div style={storeBadgeStyle}>
            <Store size={16} color="#94a3b8" />
            <span style={{ ...storeNameStyle, color: '#94a3b8' }}>No active store</span>
          </div>
        )}

        {/* Notifications Icon Link */}
        <Link href="/seller/notifications" style={iconLinkStyle}>
          <Bell size={20} />
          {/* Mock notification badge */}
          <span style={badgeStyle}>3</span>
        </Link>

        {/* Vertical divider */}
        <div style={dividerStyle}></div>

        {/* User profile dropdown button */}
        <div style={userProfileStyle}>
          <div style={avatarStyle}>
            <span>👤</span>
          </div>
          <div>
            <p style={userNameStyle}>{user?.name || 'Seller Partner'}</p>
            <p style={userRoleStyle}>Authorized Seller</p>
          </div>
        </div>
      </div>
    </header>
  );
}

// Styles
const topbarStyle: React.CSSProperties = {
  height: '72px',
  backgroundColor: '#ffffff',
  borderBottom: '1px solid #e2e8f0',
  padding: '0 32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'fixed',
  top: 0,
  right: 0,
  left: '260px',
  zIndex: 9,
};

const titleStyle: React.CSSProperties = {
  fontSize: '20px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: '800',
  color: '#0f172a',
};

const controlsStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
};

const storeBadgeStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: '#f5f3ff',
  padding: '6px 14px',
  borderRadius: '8px',
  border: '1px solid #e0e7ff',
};

const storeNameStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: '700',
  color: '#4f46e5',
};

const iconLinkStyle: React.CSSProperties = {
  color: '#64748b',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const badgeStyle: React.CSSProperties = {
  position: 'absolute',
  top: '-6px',
  right: '-6px',
  backgroundColor: '#ef4444',
  color: '#ffffff',
  fontSize: '9px',
  fontWeight: '700',
  borderRadius: '50%',
  width: '16px',
  height: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const dividerStyle: React.CSSProperties = {
  width: '1px',
  height: '32px',
  backgroundColor: '#e2e8f0',
};

const userProfileStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const avatarStyle: React.CSSProperties = {
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  backgroundColor: '#f1f5f9',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const userNameStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: '700',
  color: '#0f172a',
};

const userRoleStyle: React.CSSProperties = {
  fontSize: '11px',
  color: '#64748b',
  marginTop: '1px',
};
