'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCustomerStore } from '@/lib/store/customer';
import { formatPrice, formatDate, getStatusColor, getStatusLabel } from '@/lib/utils';
import { ShoppingBag, Package, ChevronDown, ChevronUp, RotateCcw, MessageCircle, ArrowRight, Download, HelpCircle, Truck, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

// ── Mock Order Data ──────────────────────────────────────────────────────────
const MOCK_ORDERS = [
  {
    _id: 'ord_1',
    orderNumber: 'EDI-2026-94812',
    storeName: 'Raj Supermarket',
    createdAt: new Date().toISOString(),
    totalAmount: 330,
    status: 'packed',
    courierName: 'Delhivery Local',
    trackingId: 'DLV99281738',
    shippingAddress: {
      name: 'Mo Aaqil',
      line1: 'Flat 402, Green Glen Layout',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560103',
      phone: '9876543210'
    },
    paymentMethod: 'Razorpay UPI',
    items: [
      { name: 'Organic Premium Basmati Rice', qty: 2, price: 145, image: '🌾' },
      { name: 'Cold Pressed Sunflower Oil 1L', qty: 1, price: 185, image: '🌻' }
    ],
    statusLog: [
      { status: 'ordered', timestamp: new Date(Date.now() - 8 * 3600000).toISOString(), note: 'Order placed successfully' },
      { status: 'confirmed', timestamp: new Date(Date.now() - 6 * 3600000).toISOString(), note: 'Store confirmed your order' },
      { status: 'packed', timestamp: new Date(Date.now() - 2 * 3600000).toISOString(), note: 'Order is packed and ready to ship' },
    ]
  },
  {
    _id: 'ord_2',
    orderNumber: 'EDI-2026-10492',
    storeName: 'Elite Electronics',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    totalAmount: 1499,
    status: 'delivered',
    courierName: 'BlueDart Express',
    trackingId: 'BD28383929',
    shippingAddress: {
      name: 'Mo Aaqil',
      line1: 'Flat 402, Green Glen Layout',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560103',
      phone: '9876543210'
    },
    paymentMethod: 'Net Banking',
    items: [{ name: 'Wireless Bluetooth Headset v5.3', qty: 1, price: 1499, image: '🎧' }],
    statusLog: [
      { status: 'ordered', timestamp: new Date(Date.now() - 3 * 86400000).toISOString(), note: 'Order placed' },
      { status: 'confirmed', timestamp: new Date(Date.now() - 2.8 * 86400000).toISOString(), note: 'Order confirmed by seller' },
      { status: 'packed', timestamp: new Date(Date.now() - 2.5 * 86400000).toISOString(), note: 'Packed and ready' },
      { status: 'picked_up', timestamp: new Date(Date.now() - 2.2 * 86400000).toISOString(), note: 'Picked up by BlueDart partner' },
      { status: 'shipped', timestamp: new Date(Date.now() - 2 * 86400000).toISOString(), note: 'Shipped via Delhivery. AWB: 4019283716' },
      { status: 'nearby', timestamp: new Date(Date.now() - 86400000).toISOString(), note: 'Out for delivery. Agent: Rajan Kumar' },
      { status: 'delivered', timestamp: new Date(Date.now() - 10 * 3600000).toISOString(), note: 'Delivered successfully' },
    ]
  },
];

// ── Order status steps definition ──────────────────────────────────────────
const ORDER_STEPS = [
  { key: 'ordered', label: 'Ordered', icon: '🛒' },
  { key: 'confirmed', label: 'Confirmed', icon: '✅' },
  { key: 'packed', label: 'Packed', icon: '📦' },
  { key: 'picked_up', label: 'Picked Up', icon: '🏃' },
  { key: 'shipped', label: 'Shipped', icon: '🚢' },
  { key: 'nearby', label: 'Nearby', icon: '🚚' },
  { key: 'delivered', label: 'Delivered', icon: '🎉' },
];

const CANCELLED_STEPS = [
  { key: 'ordered', label: 'Ordered', icon: '🛒' },
  { key: 'cancelled', label: 'Cancelled', icon: '❌' },
];

type FilterTab = 'all' | 'active' | 'delivered' | 'cancelled';

function StatusTimeline({ order }: { order: any }) {
  const isCancelled = order.status === 'cancelled';
  const steps = isCancelled ? CANCELLED_STEPS : ORDER_STEPS;
  const doneStatuses = (order.statusLog || []).map((s: any) => s.status);
  
  // Custom active step resolver to handle status aliases
  let currentStatusKey = order.status;
  if (currentStatusKey === 'placed') currentStatusKey = 'ordered';
  if (currentStatusKey === 'out_for_delivery') currentStatusKey = 'nearby';

  const activeIdx = steps.findIndex(s => s.key === currentStatusKey);

  return (
    <div style={timelineContainerStyle}>
      {steps.map((step, idx) => {
        const isDone = doneStatuses.includes(step.key) || idx <= activeIdx;
        const isActive = step.key === currentStatusKey;
        const isLast = idx === steps.length - 1;
        const logEntry = (order.statusLog || []).find((s: any) => s.status === step.key);

        return (
          <div key={step.key} style={timelineStepStyle}>
            {/* Connector line */}
            {!isLast && (
              <div style={{ ...timelineLineStyle, backgroundColor: idx < activeIdx || (isDone && !isActive) ? '#34A853' : '#e2e8f0' }}></div>
            )}
            {/* Dot */}
            <div style={timelineDotWrapperStyle}>
              <div style={{
                ...timelineDotStyle,
                backgroundColor: isActive ? '#4285F4' : isDone ? '#34A853' : '#e2e8f0',
                boxShadow: isActive ? '0 0 0 4px rgba(66, 133, 244, 0.2)' : 'none',
                border: isActive ? '2px solid #4285F4' : 'none',
              }}>
                <span style={{ fontSize: isActive ? '14px' : '12px' }}>{step.icon}</span>
              </div>
            </div>
            {/* Label */}
            <div style={timelineLabelStyle}>
              <span style={{ fontSize: '11px', fontWeight: isActive ? '800' : isDone ? '700' : '500', color: isActive ? '#4285F4' : isDone ? '#059669' : '#94a3b8' }}>
                {step.label}
              </span>
              {logEntry && (
                <span style={{ fontSize: '9px', color: '#64748b', display: 'block', marginTop: '2px', whiteSpace: 'nowrap' }}>
                  {new Date(logEntry.timestamp).toLocaleDateString([], { day: '2-digit', month: 'short' })}
                  <br />
                  {new Date(logEntry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function OrdersPage() {
  const router = useRouter();
  const { user } = useCustomerStore();
  const [orders, setOrders] = useState<any[]>(MOCK_ORDERS);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<FilterTab>('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/orders?customerId=${user.uid}`);
        const data = await res.json();
        if (data && data.length > 0) setOrders(data);
      } catch {
        // keep mock data
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [user]);

  const ACTIVE_STATUSES = ['placed', 'ordered', 'confirmed', 'packed', 'picked_up', 'shipped', 'out_for_delivery', 'nearby'];

  const filteredOrders = orders.filter(o => {
    if (filter === 'active') return ACTIVE_STATUSES.includes(o.status);
    if (filter === 'delivered') return o.status === 'delivered';
    if (filter === 'cancelled') return o.status === 'cancelled';
    return true;
  });

  const toggleExpand = (id: string) => setExpandedOrder(expandedOrder === id ? null : id);

  const downloadMockInvoice = (orderNumber: string) => {
    toast.success(`Downloading invoice for order ${orderNumber}...`);
  };

  const getLogisticsStatus = (order: any) => {
    if (order.status === 'delivered') return 'Delivered successfully via ' + (order.courierName || 'Partner');
    return 'In transit · ' + (order.courierName || 'Local Shipping') + ' · AWB: ' + (order.trackingId || 'Pending');
  };

  if (loading) {
    return (
      <div style={centerStyle}>
        <div className="spinner"></div>
        <p style={{ marginTop: '16px', color: '#64748b' }}>Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="container" style={wrapperStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>My Orders</h1>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>Track and manage all your EdiStore purchases.</p>
        </div>
        <Link href="/" style={continueBtnStyle}>
          <ShoppingBag size={16} /> Continue Shopping
        </Link>
      </div>

      {/* Filter Tabs */}
      <div style={filterTabsStyle}>
        {(['all', 'active', 'delivered', 'cancelled'] as FilterTab[]).map(tab => (
          <button key={tab} onClick={() => setFilter(tab)} style={filterTabStyle(filter === tab)}>
            {tab === 'all' && `All (${orders.length})`}
            {tab === 'active' && `Active (${orders.filter(o => ACTIVE_STATUSES.includes(o.status)).length})`}
            {tab === 'delivered' && `Delivered (${orders.filter(o => o.status === 'delivered').length})`}
            {tab === 'cancelled' && `Cancelled (${orders.filter(o => o.status === 'cancelled').length})`}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div style={emptyStateStyle}>
          <Package size={56} color="#94a3b8" />
          <h3 style={{ fontSize: '18px', fontWeight: '800', marginTop: '16px', color: '#1e293b' }}>No orders found</h3>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '8px' }}>
            {filter === 'all' ? "You haven't placed any orders yet." : `No ${filter} orders.`}
          </p>
          <Link href="/" style={{ marginTop: '20px', display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#4285F4', color: '#ffffff', padding: '10px 24px', borderRadius: '10px', fontWeight: '700', fontSize: '13px', textDecoration: 'none' }}>
            <ShoppingBag size={16} /> Go Shopping
          </Link>
        </div>
      ) : (
        <div style={ordersListStyle}>
          {filteredOrders.map((order) => {
            const expanded = expandedOrder === order._id;
            const statusClr = order.status === 'delivered' ? '#059669' : order.status === 'cancelled' ? '#ef4444' : '#2563eb';
            const statusBg = order.status === 'delivered' ? '#d1fae5' : order.status === 'cancelled' ? '#fee2e2' : '#dbeafe';

            return (
              <div key={order._id} className="card" style={orderCardStyle}>
                {/* Card Header */}
                <div style={orderHeaderStyle} onClick={() => toggleExpand(order._id)}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1, minWidth: 0 }}>
                    {/* Render actual image icon of first item if available */}
                    <div style={orderIconStyle}>
                      {order.items && order.items[0] ? (
                        <span style={{ fontSize: '24px' }}>{order.items[0].image}</span>
                      ) : '📦'}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <span style={orderNumberStyle}>{order.orderNumber}</span>
                        <span style={{ ...statusBadgeStyle, backgroundColor: statusBg, color: statusClr }}>{getStatusLabel(order.status)}</span>
                      </div>
                      <p style={orderMetaStyle}>
                        🏪 {order.storeName} &nbsp;·&nbsp; Placed on {formatDate(order.createdAt)} &nbsp;·&nbsp; {order.items?.length} item(s)
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '16px', fontWeight: '900', color: '#0f172a', fontFamily: "'Outfit', sans-serif" }}>{formatPrice(order.totalAmount)}</p>
                      <p style={{ fontSize: '10px', color: '#94a3b8' }}>Total paid</p>
                    </div>
                    {expanded ? <ChevronUp size={18} color="#94a3b8" /> : <ChevronDown size={18} color="#94a3b8" />}
                  </div>
                </div>

                {/* ─── Order Status Timeline ─── */}
                <div style={{ borderTop: '1px solid #f1f5f9', padding: '20px 24px', backgroundColor: '#f8fafc' }}>
                  <StatusTimeline order={order} />
                </div>

                {/* Direct Action Buttons on Card */}
                <div style={cardQuickActionsStyle}>
                  <button onClick={() => toast.success('Tracking information refreshed.')} style={quickActionBtnStyle}>
                    <Truck size={14} /> Track Order
                  </button>
                  <button onClick={() => downloadMockInvoice(order.orderNumber)} style={quickActionBtnStyle}>
                    <Download size={14} /> Download Invoice
                  </button>
                  <button onClick={() => toast('Support agents will reach you shortly.')} style={quickActionBtnStyle}>
                    <HelpCircle size={14} /> Need Help
                  </button>
                  {order.status === 'delivered' && (
                    <button onClick={() => toast.success('Return request initiated.')} style={{ ...quickActionBtnStyle, color: '#ef4444' }}>
                      <RotateCcw size={14} /> Return Item
                    </button>
                  )}
                </div>

                {/* ─── Expanded Details ─── */}
                {expanded && (
                  <div style={expandedPanelStyle}>
                    {/* Details Grid */}
                    <div style={detailsGridStyle}>
                      {/* Shipping Info */}
                      <div>
                        <h4 style={expandedHeadingStyle}>Shipping Address</h4>
                        <div style={detailsBlockStyle}>
                          <p style={{ fontWeight: '700' }}>{order.shippingAddress?.name || user?.name || 'Customer'}</p>
                          <p>{order.shippingAddress?.line1 || 'No address configured'}</p>
                          <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}</p>
                          <p style={{ marginTop: '6px', color: '#64748b' }}>📞 Phone: {order.shippingAddress?.phone}</p>
                        </div>
                      </div>

                      {/* Payment Info */}
                      <div>
                        <h4 style={expandedHeadingStyle}>Payment Method</h4>
                        <div style={detailsBlockStyle}>
                          <p style={{ fontWeight: '700' }}>{order.paymentMethod || 'Razorpay UPI'}</p>
                          <p style={{ color: '#059669', fontWeight: '700', marginTop: '4px' }}>Settled Split Commission</p>
                        </div>
                      </div>

                      {/* Logistics Tracking Info */}
                      <div>
                        <h4 style={expandedHeadingStyle}>Courier Tracking</h4>
                        <div style={detailsBlockStyle}>
                          <p style={{ fontWeight: '700' }}>{order.courierName || 'BlueDart'}</p>
                          <p>AWB Tracking ID: <strong>{order.trackingId || 'BD28383929'}</strong></p>
                          <p style={{ marginTop: '4px', fontSize: '11px', color: '#64748b' }}>Status: {getLogisticsStatus(order)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Items List */}
                    <div style={{ marginBottom: '20px', marginTop: '10px' }}>
                      <h4 style={expandedHeadingStyle}>Order Items</h4>
                      {order.items?.map((item: any, idx: number) => (
                        <div key={idx} style={itemRowStyle}>
                          <div style={itemEmojiStyle}>{item.image || '📦'}</div>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{item.name}</p>
                            <p style={{ fontSize: '11px', color: '#64748b' }}>Qty: {item.qty} · Unit Price: {formatPrice(item.price)}</p>
                          </div>
                          <p style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{formatPrice(item.price * item.qty)}</p>
                        </div>
                      ))}
                    </div>

                    {/* Status log */}
                    {order.statusLog && order.statusLog.length > 0 && (
                      <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
                        <h4 style={{ fontSize: '12px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', marginBottom: '12px' }}>Status History Logs</h4>
                        {[...order.statusLog].reverse().map((log: any, idx: number) => (
                          <div key={idx} style={{ display: 'flex', gap: '12px', marginBottom: idx < order.statusLog.length - 1 ? '10px' : '0' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#34A853', flexShrink: 0, marginTop: '4px' }}></div>
                            <div>
                              <p style={{ fontSize: '12px', fontWeight: '700', color: '#334155', textTransform: 'capitalize' }}>{log.status.replace('_', ' ')}</p>
                              <p style={{ fontSize: '11px', color: '#64748b' }}>{log.note}</p>
                              <p style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>{new Date(log.timestamp).toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════
// STYLES
// ══════════════════════════════════════════════════════

const centerStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '80px 0' };
const wrapperStyle: React.CSSProperties = { paddingTop: '36px', paddingBottom: '80px', flex: 1 };
const headerStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' };
const titleStyle: React.CSSProperties = { fontSize: '26px', fontFamily: "'Outfit', sans-serif", fontWeight: '900', color: '#0f172a' };
const continueBtnStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#f8fafc', border: '1.5px solid #e2e8f0', padding: '10px 18px', borderRadius: '10px', fontWeight: '600', fontSize: '13px', color: '#334155', textDecoration: 'none' };

const filterTabsStyle: React.CSSProperties = { display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' };
const filterTabStyle = (active: boolean): React.CSSProperties => ({ padding: '8px 18px', borderRadius: '30px', fontSize: '13px', fontWeight: '700', border: active ? '2px solid #4285F4' : '1.5px solid #e2e8f0', backgroundColor: active ? '#eff6ff' : '#ffffff', color: active ? '#4285F4' : '#64748b', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s' });

const emptyStateStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', textAlign: 'center' };
const ordersListStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '16px' };
const orderCardStyle: React.CSSProperties = { padding: '0', overflow: 'hidden', border: '1px solid #e2e8f0', borderRadius: '16px', backgroundColor: '#ffffff' };

const orderHeaderStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '20px 24px', cursor: 'pointer', flexWrap: 'wrap' };
const orderIconStyle: React.CSSProperties = { width: '42px', height: '42px', borderRadius: '12px', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 };
const orderNumberStyle: React.CSSProperties = { fontSize: '14px', fontWeight: '800', fontFamily: "'Outfit', sans-serif", color: '#0f172a' };
const orderMetaStyle: React.CSSProperties = { fontSize: '12px', color: '#64748b', marginTop: '4px' };
const statusBadgeStyle: React.CSSProperties = { fontSize: '11px', fontWeight: '800', padding: '3px 10px', borderRadius: '6px' };

// Timeline
const timelineContainerStyle: React.CSSProperties = { display: 'flex', alignItems: 'flex-start', gap: '0', overflowX: 'auto' };
const timelineStepStyle: React.CSSProperties = { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', minWidth: '80px' };
const timelineLineStyle: React.CSSProperties = { position: 'absolute', top: '18px', left: '50%', right: '-50%', height: '3px', zIndex: 0 };
const timelineDotWrapperStyle: React.CSSProperties = { position: 'relative', zIndex: 1, marginBottom: '6px' };
const timelineDotStyle: React.CSSProperties = { width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' };
const timelineLabelStyle: React.CSSProperties = { textAlign: 'center', padding: '0 4px' };

// Quick Action Buttons directly on Order Card
const cardQuickActionsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
  padding: '12px 24px',
  borderTop: '1px solid #f1f5f9',
  borderBottom: '1px solid #f1f5f9',
  backgroundColor: '#f8fafc',
  flexWrap: 'wrap'
};
const quickActionBtnStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  backgroundColor: '#ffffff',
  border: '1.5px solid #e2e8f0',
  borderRadius: '8px',
  color: '#475569',
  padding: '6px 12px',
  fontSize: '12px',
  fontWeight: '700',
  cursor: 'pointer'
};

const expandedPanelStyle: React.CSSProperties = { padding: '20px 24px', backgroundColor: '#ffffff' };
const expandedHeadingStyle: React.CSSProperties = { fontSize: '12px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', marginBottom: '8px' };
const detailsGridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' };
const detailsBlockStyle: React.CSSProperties = { padding: '12px', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '12px', color: '#334155', lineHeight: '1.5' };

const itemRowStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid #f8fafc' };
const itemEmojiStyle: React.CSSProperties = { width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 };
