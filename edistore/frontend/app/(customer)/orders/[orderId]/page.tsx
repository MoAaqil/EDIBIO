'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatPrice, formatDate, formatDateTime, getStatusColor, getStatusLabel, getStatusIcon } from '@/lib/utils';
import { ArrowLeft, MapPin, Truck, Calendar, DollarSign, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

// ── Mock Order Details Map ───────────────────────────────────────────────────
const MOCK_ORDERS_MAP: Record<string, any> = {
  ord_1: {
    _id: 'ord_1',
    orderNumber: 'EDI-2026-94812',
    storeName: 'Raj Supermarket',
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    status: 'placed',
    paymentMethod: 'razorpay',
    paymentStatus: 'paid',
    subtotal: 475,
    shippingCharge: 0,
    discount: 145,
    totalAmount: 330,
    shippingAddress: {
      name: 'Mo Aaqil',
      phone: '9876543210',
      line1: 'Flat 402, Green Glen Layout',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560103'
    },
    items: [
      { productId: 'p1', name: 'Organic Premium Basmati Rice', qty: 2, price: 145, image: '🌾', gstRate: 5, totalPrice: 290 },
      { productId: 'p4', name: 'Cold Pressed Sunflower Oil 1L', qty: 1, price: 185, image: '🌻', gstRate: 5, totalPrice: 185 }
    ],
    tracking: {
      carrier: 'Self Delivery (Seller Courier)',
      awb: 'AWB-84729104',
      trackingUrl: 'https://track.edistore.in',
      events: []
    },
    timeline: [
      { status: 'placed', timestamp: new Date(Date.now() - 3600000).toISOString(), note: 'Order placed by buyer and payment verified' }
    ]
  },
  ord_2: {
    _id: 'ord_2',
    orderNumber: 'EDI-2026-10492',
    storeName: 'Elite Electronics',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    status: 'delivered',
    paymentMethod: 'cod',
    paymentStatus: 'paid',
    subtotal: 1499,
    shippingCharge: 0,
    discount: 0,
    totalAmount: 1499,
    shippingAddress: {
      name: 'Mo Aaqil',
      phone: '9876543210',
      line1: 'Flat 402, Green Glen Layout',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560103'
    },
    items: [
      { productId: 'p2', name: 'Wireless Bluetooth Headset v5.3', qty: 1, price: 1499, image: '🎧', gstRate: 18, totalPrice: 1499 }
    ],
    tracking: {
      carrier: 'BlueDart Courier',
      awb: 'BD-938210482',
      trackingUrl: 'https://track.edistore.in',
      events: [
        { timestamp: new Date(Date.now() - 3 * 86400000 + 3600000).toISOString(), status: 'confirmed', location: 'Elite Electronics Warehouse', description: 'Store accepted the order' },
        { timestamp: new Date(Date.now() - 2 * 86400000).toISOString(), status: 'shipped', location: 'Bangalore Sorting Hub', description: 'Package handed over to BlueDart' },
        { timestamp: new Date(Date.now() - 1 * 86400000).toISOString(), status: 'delivered', location: 'Customer Doorstep', description: 'Delivered and signed by Mo Aaqil' }
      ]
    },
    timeline: [
      { status: 'placed', timestamp: new Date(Date.now() - 3 * 86400000).toISOString(), note: 'COD order placed' },
      { status: 'confirmed', timestamp: new Date(Date.now() - 3 * 86400000 + 3600000).toISOString(), note: 'Store confirmed stock availability' },
      { status: 'shipped', timestamp: new Date(Date.now() - 2 * 86400000).toISOString(), note: 'Shipped via BlueDart' },
      { status: 'delivered', timestamp: new Date(Date.now() - 1 * 86400000).toISOString(), note: 'Package delivered successfully' }
    ]
  }
};

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      setLoading(true);
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        const data = await res.json();
        if (data && data._id) {
          setOrder(data);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Backend API error, fetching mock detail');
      }

      const strId = String(orderId);
      const mock = MOCK_ORDERS_MAP[strId] || MOCK_ORDERS_MAP.ord_1;
      setOrder(mock);
      setLoading(false);
    }
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div style={centerWrapperStyle}>
        <div className="spinner"></div>
        <p style={{ marginTop: '16px', color: '#64748b' }}>Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div style={centerWrapperStyle}>
        <p>Order not found.</p>
        <button onClick={() => router.push('/orders')} className="btn btn-primary" style={{ marginTop: '20px' }}>
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={wrapperStyle}>
      <button onClick={() => router.push('/orders')} style={backButtonStyle}>
        <ArrowLeft size={16} />
        <span>Back to Orders</span>
      </button>

      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Order {order.orderNumber}</h1>
          <p style={subTitleStyle}>Placed on {formatDateTime(order.createdAt)}</p>
        </div>
        <span style={statusBadgeStyle(getStatusColor(order.status))}>
          {getStatusIcon(order.status)} {getStatusLabel(order.status)}
        </span>
      </div>

      <div style={contentGridStyle}>
        {/* Left Side: Items + Bill Details */}
        <div style={detailsColumnStyle}>
          <div className="card" style={cardPaddingStyle}>
            <h2 style={sectionTitleStyle}>Ordered Items</h2>
            <div style={itemsContainerStyle}>
              {order.items.map((item: any, idx: number) => (
                <div key={idx} style={itemRowStyle}>
                  <div style={itemIconWrapperStyle}>
                    <span style={{ fontSize: '32px' }}>{item.image || '📦'}</span>
                  </div>
                  <div style={itemMetaStyle}>
                    <h3 style={itemNameStyle}>{item.name}</h3>
                    <p style={itemPriceQtyStyle}>
                      {formatPrice(item.price)} x {item.qty}
                    </p>
                  </div>
                  <span style={itemTotalStyle}>{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ ...cardPaddingStyle, marginTop: '24px' }}>
            <h2 style={sectionTitleStyle}>Payment Summary</h2>
            <div style={paymentSummaryStyle}>
              <div style={summaryRowStyle}>
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div style={summaryRowStyle}>
                  <span>Discount</span>
                  <span style={{ color: '#ef4444' }}>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div style={summaryRowStyle}>
                <span>Delivery Charge</span>
                <span style={{ color: '#10b981', fontWeight: '600' }}>FREE</span>
              </div>
              <div style={dividerStyle}></div>
              <div style={grandTotalRowStyle}>
                <span>Grand Total</span>
                <span>{formatPrice(order.totalAmount)}</span>
              </div>
              <div style={paymentMethodBadgeRowStyle}>
                <span>Method: <strong>{order.paymentMethod.toUpperCase()}</strong></span>
                <span style={paymentStatusStyle(order.paymentStatus === 'paid')}>
                  {order.paymentStatus.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Delivery Details + Live Tracking Timeline */}
        <div style={trackingColumnStyle}>
          <div className="card" style={cardPaddingStyle}>
            <h2 style={sectionTitleStyle}>Delivery Address</h2>
            <div style={addressBlockStyle}>
              <MapPin size={20} color="#6366f1" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <p style={addressNameStyle}>{order.shippingAddress.name}</p>
                <p style={addressLineStyle}>{order.shippingAddress.line1}</p>
                <p style={addressLineStyle}>
                  {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                </p>
                <p style={addressPhoneStyle}>Phone: {order.shippingAddress.phone}</p>
              </div>
            </div>
          </div>

          {order.tracking?.awb && (
            <div className="card" style={{ ...cardPaddingStyle, marginTop: '24px' }}>
              <h2 style={sectionTitleStyle}>Shipment Details</h2>
              <div style={shipmentBlockStyle}>
                <Truck size={20} color="#4f46e5" />
                <div>
                  <p style={shipmentCarrierStyle}>Courier: {order.tracking.carrier}</p>
                  <p style={shipmentAwbStyle}>AWB Number: <strong>{order.tracking.awb}</strong></p>
                </div>
              </div>
            </div>
          )}

          <div className="card" style={{ ...cardPaddingStyle, marginTop: '24px' }}>
            <h2 style={sectionTitleStyle}>Package Journey</h2>
            <div style={timelineContainerStyle}>
              {order.timeline.map((event: any, idx: number) => {
                const isLast = idx === order.timeline.length - 1;
                return (
                  <div key={idx} style={timelineStepStyle}>
                    <div style={timelineLineWrapperStyle}>
                      <div style={timelineDotStyle(isLast)}>
                        {isLast && <div style={pulseDotStyle}></div>}
                      </div>
                      {!isLast && <div style={timelineVerticalLineStyle}></div>}
                    </div>
                    <div style={timelineContentStyle}>
                      <p style={timelineStatusLabelStyle(isLast)}>
                        {getStatusLabel(event.status)}
                      </p>
                      <p style={timelineTimeStyle}>{formatDateTime(event.timestamp)}</p>
                      {event.note && <p style={timelineNoteStyle}>{event.note}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
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
  paddingTop: '32px',
  paddingBottom: '80px',
  flex: 1,
};

const backButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: 'transparent',
  color: '#64748b',
  fontSize: '14px',
  fontWeight: '600',
  marginBottom: '24px',
  cursor: 'pointer',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '16px',
  marginBottom: '32px',
};

const titleStyle: React.CSSProperties = {
  fontSize: '28px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: '900',
  color: '#0f172a',
};

const subTitleStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#64748b',
  marginTop: '4px',
};

const statusBadgeStyle = (color: string): React.CSSProperties => ({
  backgroundColor: color + '15',
  color: color,
  padding: '8px 16px',
  borderRadius: '9999px',
  fontSize: '13px',
  fontWeight: '700',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
});

const contentGridStyle: React.CSSProperties = {
  display: 'flex',
  gap: '32px',
  flexWrap: 'wrap',
};

const detailsColumnStyle: React.CSSProperties = {
  flex: 1.5,
  minWidth: '320px',
};

const trackingColumnStyle: React.CSSProperties = {
  flex: 1,
  minWidth: '300px',
};

const cardPaddingStyle: React.CSSProperties = {
  padding: '24px',
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '20px',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '16px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: '800',
  marginBottom: '20px',
  color: '#0f172a',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const itemsContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const itemRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

const itemIconWrapperStyle: React.CSSProperties = {
  width: '56px',
  height: '56px',
  borderRadius: '12px',
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

const itemPriceQtyStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#64748b',
  marginTop: '2px',
};

const itemTotalStyle: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: '700',
  color: '#0f172a',
};

const paymentSummaryStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const summaryRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '14px',
  color: '#475569',
};

const grandTotalRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '18px',
  fontWeight: '800',
  color: '#0f172a',
  marginBottom: '8px',
};

const paymentMethodBadgeRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '13px',
  color: '#64748b',
};

const paymentStatusStyle = (isPaid: boolean): React.CSSProperties => ({
  backgroundColor: isPaid ? '#d1fae5' : '#fee2e2',
  color: isPaid ? '#059669' : '#ef4444',
  padding: '3px 8px',
  borderRadius: '6px',
  fontSize: '11px',
  fontWeight: '700',
});

// Address Block
const addressBlockStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
};

const addressNameStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: '700',
  color: '#0f172a',
  marginBottom: '4px',
};

const addressLineStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#475569',
  lineHeight: '1.4',
};

const addressPhoneStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#64748b',
  marginTop: '6px',
};

// Shipment block
const shipmentBlockStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
};

const shipmentCarrierStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#1e293b',
};

const shipmentAwbStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#64748b',
  marginTop: '2px',
};

// Timeline Step
const timelineContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const timelineStepStyle: React.CSSProperties = {
  display: 'flex',
  gap: '16px',
};

const timelineLineWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  width: '16px',
};

const timelineDotStyle = (active: boolean): React.CSSProperties => ({
  width: '14px',
  height: '14px',
  borderRadius: '50%',
  backgroundColor: active ? '#4f46e5' : '#cbd5e1',
  border: active ? '3px solid #e0e7ff' : 'none',
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const pulseDotStyle: React.CSSProperties = {
  width: '6px',
  height: '6px',
  backgroundColor: '#ffffff',
  borderRadius: '50%',
};

const timelineVerticalLineStyle: React.CSSProperties = {
  width: '2px',
  flex: 1,
  backgroundColor: '#e2e8f0',
  position: 'absolute',
  top: '14px',
  bottom: '-14px',
};

const timelineContentStyle: React.CSSProperties = {
  flex: 1,
  paddingBottom: '24px',
};

const timelineStatusLabelStyle = (active: boolean): React.CSSProperties => ({
  fontSize: '14px',
  fontWeight: '700',
  color: active ? '#4f46e5' : '#334155',
});

const timelineTimeStyle: React.CSSProperties = {
  fontSize: '11px',
  color: '#94a3b8',
  marginTop: '2px',
};

const timelineNoteStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#64748b',
  lineHeight: '1.4',
  marginTop: '6px',
  backgroundColor: '#f8fafc',
  padding: '8px 12px',
  borderRadius: '8px',
  border: '1px solid #f1f5f9',
};

const dividerStyle: React.CSSProperties = {
  borderBottom: '1px solid #f1f5f9',
  margin: '16px 0',
};
