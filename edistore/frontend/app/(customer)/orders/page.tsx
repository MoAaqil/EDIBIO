'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCustomerStore } from '@/lib/store/customer';
import { formatPrice, formatDate, getStatusColor, getStatusLabel } from '@/lib/utils';
import { ShoppingBag, ArrowRight, Package } from 'lucide-react';
import toast from 'react-hot-toast';

// ── Mock Order Data ──────────────────────────────────────────────────────────
const MOCK_ORDERS = [
  {
    _id: 'ord_1',
    orderNumber: 'EDI-2026-94812',
    storeName: 'Raj Supermarket',
    createdAt: new Date().toISOString(),
    totalAmount: 330,
    status: 'placed' as const,
    items: [
      { name: 'Organic Premium Basmati Rice', qty: 2, price: 145, image: '🌾' },
      { name: 'Cold Pressed Sunflower Oil 1L', qty: 1, price: 185, image: '🌻' }
    ]
  },
  {
    _id: 'ord_2',
    orderNumber: 'EDI-2026-10492',
    storeName: 'Elite Electronics',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    totalAmount: 1499,
    status: 'delivered' as const,
    items: [
      { name: 'Wireless Bluetooth Headset v5.3', qty: 1, price: 1499, image: '🎧' }
    ]
  }
];

export default function OrdersPage() {
  const router = useRouter();
  const { user } = useCustomerStore();
  const [orders, setOrders] = useState<any[]>(MOCK_ORDERS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/orders?customerId=${user.uid}`);
        const data = await res.json();
        if (data && data.length > 0) {
          setOrders(data);
        }
      } catch (err) {
        console.warn('Backend API error, using mock orders');
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <div style={centerWrapperStyle}>
        <div className="spinner"></div>
        <p style={{ marginTop: '16px', color: '#64748b' }}>Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="container" style={wrapperStyle}>
      <h1 style={titleStyle}>My Orders</h1>

      {orders.length === 0 ? (
        <div style={emptyStateStyle}>
          <Package size={64} color="#94a3b8" />
          <h3 style={emptyTitleStyle}>No orders found</h3>
          <p style={emptyDescStyle}>You haven't placed any orders yet on EdiStore.</p>
          <Link href="/" className="btn btn-primary" style={{ padding: '12px 24px' }}>
            Go Shopping
          </Link>
        </div>
      ) : (
        <div style={ordersListStyle}>
          {orders.map((order) => (
            <div key={order._id} className="card" style={orderCardStyle}>
              <div style={orderHeaderStyle}>
                <div>
                  <span style={orderNumberStyle}>{order.orderNumber}</span>
                  <span style={orderDateStyle}>Placed on {formatDate(order.createdAt)}</span>
                </div>
                <span style={statusBadgeStyle(getStatusColor(order.status))}>
                  {getStatusLabel(order.status)}
                </span>
              </div>

              <div style={dividerStyle}></div>

              <div style={storeInfoRowStyle}>
                <span style={storeNameLabelStyle}>Store: <strong>{order.storeName}</strong></span>
              </div>

              <div style={itemsContainerStyle}>
                {order.items.map((item: any, idx: number) => (
                  <div key={idx} style={itemRowStyle}>
                    <div style={itemIconWrapperStyle}>
                      <span style={{ fontSize: '24px' }}>{item.image || '📦'}</span>
                    </div>
                    <div style={itemMetaStyle}>
                      <p style={itemNameStyle}>{item.name}</p>
                      <p style={itemQtyPriceStyle}>Qty: {item.qty} • {formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={dividerStyle}></div>

              <div style={orderFooterStyle}>
                <div>
                  <span style={totalLabelStyle}>Total Paid:</span>
                  <span style={totalAmountStyle}>{formatPrice(order.totalAmount)}</span>
                </div>
                <Link href={`/orders/${order._id}`} className="btn btn-outline" style={trackButtonStyle}>
                  <span>Track Package</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Styles
const centerWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  padding: '80px 0',
};

const wrapperStyle: React.CSSProperties = {
  paddingTop: '40px',
  paddingBottom: '80px',
  flex: 1,
  maxWidth: '800px',
};

const titleStyle: React.CSSProperties = {
  fontSize: '28px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: '900',
  marginBottom: '32px',
};

const emptyStateStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '64px 20px',
  textAlign: 'center',
  backgroundColor: '#ffffff',
  borderRadius: '24px',
  border: '1px solid #e2e8f0',
};

const emptyTitleStyle: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: '800',
  fontFamily: "'Outfit', sans-serif",
  marginTop: '16px',
  marginBottom: '8px',
};

const emptyDescStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#64748b',
  marginBottom: '24px',
};

const ordersListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

const orderCardStyle: React.CSSProperties = {
  padding: '24px',
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '20px',
};

const orderHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '12px',
};

const orderNumberStyle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: '800',
  color: '#0f172a',
  display: 'block',
};

const orderDateStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#64748b',
  marginTop: '4px',
  display: 'block',
};

const statusBadgeStyle = (color: string): React.CSSProperties => ({
  backgroundColor: color + '15',
  color: color,
  padding: '6px 14px',
  borderRadius: '9999px',
  fontSize: '12px',
  fontWeight: '700',
});

const storeInfoRowStyle: React.CSSProperties = {
  marginBottom: '16px',
};

const storeNameLabelStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#475569',
};

const itemsContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginBottom: '16px',
};

const itemRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

const itemIconWrapperStyle: React.CSSProperties = {
  width: '48px',
  height: '48px',
  borderRadius: '8px',
  backgroundColor: '#f8fafc',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const itemMetaStyle: React.CSSProperties = {
  flex: 1,
};

const itemNameStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#1e293b',
};

const itemQtyPriceStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#64748b',
  marginTop: '2px',
};

const orderFooterStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '16px',
};

const totalLabelStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#64748b',
  marginRight: '6px',
};

const totalAmountStyle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: '800',
  color: '#0f172a',
};

const trackButtonStyle: React.CSSProperties = {
  padding: '8px 16px',
  borderRadius: '10px',
  fontSize: '13px',
  fontWeight: '700',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
};

const dividerStyle: React.CSSProperties = {
  borderBottom: '1px solid #f1f5f9',
  margin: '16px 0',
};
