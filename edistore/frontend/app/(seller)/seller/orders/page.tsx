'use client';

import { useEffect, useState } from 'react';
import OrderCard from '@/components/seller/OrderCard';
import { useSellerStore } from '@/lib/store/seller';
import toast from 'react-hot-toast';

export default function SellerOrdersPage() {
  const { orders, setOrders, updateOrder } = useSellerStore();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    const toastId = toast.loading(`Updating order status to ${newStatus}...`);
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok) {
        updateOrder(id, data);
        toast.success(`Order status updated to ${newStatus} in database`, { id: toastId });
      } else {
        toast.error(data.error || 'Failed to update order status.', { id: toastId });
      }
    } catch (err: any) {
      toast.error('Network error: ' + err.message, { id: toastId });
    }
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(o => o.status === filterStatus);

  const filterTabs = [
    { id: 'all', label: 'All Orders' },
    { id: 'placed', label: 'New / Pending' },
    { id: 'confirmed', label: 'Confirmed' },
    { id: 'packed', label: 'Packed' },
    { id: 'shipped', label: 'Shipped' },
    { id: 'delivered', label: 'Delivered' },
  ];

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h2 style={titleStyle}>Manage Store Orders</h2>
          <p style={subTitleStyle}>Accept purchase orders, print shipment forms, and track deliveries.</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={tabsRowStyle}>
        {filterTabs.map(tab => (
          <button 
            key={tab.id}
            onClick={() => setFilterStatus(tab.id)}
            style={tabButtonStyle(filterStatus === tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders Grid */}
      {filteredOrders.length === 0 ? (
        <div className="card" style={emptyStateStyle}>
          <p style={{ color: '#64748b' }}>No orders found matching the filter criteria.</p>
        </div>
      ) : (
        <div style={gridStyle}>
          {filteredOrders.map(order => (
            <OrderCard 
              key={order._id}
              order={order}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Styles
const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
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

const tabsRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
  borderBottom: '1px solid #e2e8f0',
  paddingBottom: '12px',
};

const tabButtonStyle = (isActive: boolean): React.CSSProperties => ({
  padding: '8px 16px',
  borderRadius: '8px',
  fontSize: '13px',
  fontWeight: '600',
  backgroundColor: isActive ? '#f5f3ff' : 'transparent',
  color: isActive ? '#4f46e5' : '#64748b',
  border: isActive ? '1px solid #4f46e5' : '1px solid transparent',
  cursor: 'pointer',
  transition: 'all 0.2s',
});

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
  gap: '24px',
};

const emptyStateStyle: React.CSSProperties = {
  padding: '48px',
  textAlign: 'center',
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
};
