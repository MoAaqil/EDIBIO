'use client';

import { useState } from 'react';
import { useSellerStore } from '@/lib/store/seller';
import { formatDate } from '@/lib/utils';
import { Bell, BellOff, ShoppingBag, Landmark, AlertCircle, Info } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SellerNotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([
    { _id: 'n_1', type: 'order_placed', title: 'New Order Received', body: 'Order #EDI-2026-94812 for ₹330 has been placed by Mo Aaqil.', isRead: false, createdAt: new Date().toISOString() },
    { _id: 'n_2', type: 'payment_received', title: 'Payment Settlement Complete', body: 'Sunday payout of ₹12,500 successfully transferred to your HDFC bank account.', isRead: true, createdAt: new Date(Date.now() - 2 * 86400000).toISOString() },
    { _id: 'n_3', type: 'low_stock', title: 'Low Stock Alert', body: 'Classic Leather Casual Shoes is running low (0 units left). Restock inventory listing soon.', isRead: true, createdAt: new Date(Date.now() - 3 * 86400000).toISOString() }
  ]);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    toast.success('All notifications marked as read');
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'order_placed':
        return <ShoppingBag size={20} color="#4f46e5" />;
      case 'payment_received':
        return <Landmark size={20} color="#10b981" />;
      case 'low_stock':
        return <AlertCircle size={20} color="#ef4444" />;
      default:
        return <Bell size={20} color="#64748b" />;
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerRowStyle}>
        <div>
          <h2 style={titleStyle}>Store Notifications</h2>
          <p style={subTitleStyle}>Read all store order notifications, system warnings and payouts settlements alerts.</p>
        </div>
        <button onClick={handleMarkAllRead} className="btn btn-outline" style={headerButtonStyle}>
          Mark All as Read
        </button>
      </div>

      <div style={listStyle}>
        {notifications.length === 0 ? (
          <div className="card" style={emptyStateStyle}>
            <BellOff size={48} color="#94a3b8" />
            <p style={{ marginTop: '12px', color: '#64748b' }}>Your inbox is completely clear!</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div key={n._id} className="card" style={notificationCardStyle(n.isRead)}>
              <div style={iconWrapperStyle(n.type)}>
                {getIcon(n.type)}
              </div>
              <div style={contentStyle}>
                <h3 style={notifTitleStyle}>{n.title}</h3>
                <p style={notifBodyStyle}>{n.body}</p>
                <span style={timeStyle}>{formatDate(n.createdAt)}</span>
              </div>
              {!n.isRead && <div style={unreadDotStyle}></div>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Styles
const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  maxWidth: '800px',
};

const headerRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '16px',
};

const titleStyle: React.CSSProperties = {
  fontSize: '20px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: '800',
  color: '#0f172a',
};

const subTitleStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#64748b',
  marginTop: '2px',
};

const headerButtonStyle: React.CSSProperties = {
  padding: '8px 16px',
  fontSize: '13px',
  borderRadius: '8px',
};

const listStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const emptyStateStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '64px 20px',
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
};

const notificationCardStyle = (isRead: boolean): React.CSSProperties => ({
  display: 'flex',
  gap: '16px',
  alignItems: 'flex-start',
  padding: '18px 24px',
  backgroundColor: isRead ? '#ffffff' : '#f5f3ff',
  border: `1px solid ${isRead ? '#e2e8f0' : '#d8b4fe'}`,
  borderRadius: '16px',
  position: 'relative',
});

const iconWrapperStyle = (type: string): React.CSSProperties => {
  let bg = '#e0e7ff';
  if (type === 'payment_received') bg = '#d1fae5';
  if (type === 'low_stock') bg = '#fee2e2';

  return {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: bg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };
};

const contentStyle: React.CSSProperties = {
  flex: 1,
};

const notifTitleStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: '800',
  color: '#0f172a',
};

const notifBodyStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#475569',
  lineHeight: '1.4',
  marginTop: '2px',
};

const timeStyle: React.CSSProperties = {
  fontSize: '11px',
  color: '#94a3b8',
  marginTop: '6px',
  display: 'block',
};

const unreadDotStyle: React.CSSProperties = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: '#a855f7',
  position: 'absolute',
  top: '24px',
  right: '24px',
};
