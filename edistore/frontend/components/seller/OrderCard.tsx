'use client';

import { Order } from '@/lib/types';
import { formatPrice, formatDate, getStatusColor, getStatusLabel } from '@/lib/utils';
import { Truck, Printer, Eye, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface OrderCardProps {
  order: Order;
  onUpdateStatus: (id: string, newStatus: string) => void;
}

export default function OrderCard({ order, onUpdateStatus }: OrderCardProps) {
  return (
    <div className="card" style={cardStyle}>
      <div style={headerStyle}>
        <div>
          <span style={orderNumberStyle}>{order.orderNumber}</span>
          <span style={orderDateStyle}>Ordered: {formatDate(order.createdAt)}</span>
        </div>
        <span style={statusBadgeStyle(getStatusColor(order.status))}>
          {getStatusLabel(order.status)}
        </span>
      </div>

      <div style={dividerStyle}></div>

      {/* Customer Info */}
      <div style={customerInfoStyle}>
        <p style={customerLabelStyle}>Customer:</p>
        <p style={customerNameStyle}>
          <strong>{order.customerName}</strong> ({order.customerPhone})
        </p>
        <p style={addressStyle}>
          {order.shippingAddress.line1}, {order.shippingAddress.city}, {order.shippingAddress.pincode}
        </p>
      </div>

      {/* Items list */}
      <div style={itemsContainerStyle}>
        {order.items.map((item, idx) => (
          <div key={idx} style={itemRowStyle}>
            <span style={{ fontSize: '18px' }}>{item.image || '📦'}</span>
            <span style={itemNameStyle}>{item.name}</span>
            <span style={itemQtyPriceStyle}>
              {item.qty} x {formatPrice(item.price)}
            </span>
          </div>
        ))}
      </div>

      <div style={dividerStyle}></div>

      {/* Card Footer with total & actions */}
      <div style={footerStyle}>
        <div>
          <span style={totalLabelStyle}>Revenue:</span>
          <span style={totalAmountStyle}>{formatPrice(order.totalAmount)}</span>
        </div>

        <div style={actionsContainerStyle}>
          <Link href={`/seller/orders/${order._id}`} className="btn btn-outline" style={iconButtonStyle}>
            <Eye size={16} />
            <span>Details</span>
          </Link>

          {order.status === 'placed' && (
            <button 
              onClick={() => onUpdateStatus(order._id, 'confirmed')} 
              style={acceptButtonStyle}
            >
              <CheckCircle2 size={16} />
              <span>Accept Order</span>
            </button>
          )}

          {order.status === 'confirmed' && (
            <button 
              onClick={() => onUpdateStatus(order._id, 'packed')} 
              style={packButtonStyle}
            >
              <Truck size={16} />
              <span>Ship Order</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Styles
const cardStyle: React.CSSProperties = {
  padding: '20px',
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const orderNumberStyle: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: '800',
  color: '#0f172a',
  display: 'block',
};

const orderDateStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#64748b',
  marginTop: '2px',
  display: 'block',
};

const statusBadgeStyle = (color: string): React.CSSProperties => ({
  backgroundColor: color + '15',
  color: color,
  padding: '4px 12px',
  borderRadius: '9999px',
  fontSize: '11px',
  fontWeight: '750',
});

const customerInfoStyle: React.CSSProperties = {
  marginBottom: '16px',
};

const customerLabelStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: '700',
  color: '#64748b',
  textTransform: 'uppercase',
  marginBottom: '4px',
};

const customerNameStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#1e293b',
};

const addressStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#64748b',
  lineHeight: '1.4',
  marginTop: '2px',
};

const itemsContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  marginBottom: '16px',
};

const itemRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: '13px',
  color: '#334155',
};

const itemNameStyle: React.CSSProperties = {
  flex: 1,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const itemQtyPriceStyle: React.CSSProperties = {
  color: '#64748b',
  fontWeight: '500',
};

const footerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const totalLabelStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#64748b',
  marginRight: '6px',
};

const totalAmountStyle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: '800',
  color: '#0f172a',
};

const actionsContainerStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
};

const iconButtonStyle: React.CSSProperties = {
  padding: '6px 12px',
  fontSize: '12px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
};

const acceptButtonStyle: React.CSSProperties = {
  backgroundColor: '#10b981',
  color: '#ffffff',
  padding: '6px 14px',
  borderRadius: '8px',
  fontSize: '12px',
  fontWeight: '600',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  cursor: 'pointer',
};

const packButtonStyle: React.CSSProperties = {
  backgroundColor: '#4f46e5',
  color: '#ffffff',
  padding: '6px 14px',
  borderRadius: '8px',
  fontSize: '12px',
  fontWeight: '600',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  cursor: 'pointer',
};

const dividerStyle: React.CSSProperties = {
  borderBottom: '1px solid #f1f5f9',
  margin: '16px 0',
};
