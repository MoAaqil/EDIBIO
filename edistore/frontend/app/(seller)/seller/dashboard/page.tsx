'use client';

import { useEffect, useState } from 'react';
import StatsCard from '@/components/seller/StatsCard';
import { useSellerStore } from '@/lib/store/seller';
import { formatPrice, formatDate, getStatusColor, getStatusLabel } from '@/lib/utils';
import { 
  IndianRupee, 
  ShoppingBag, 
  PackageCheck, 
  Clock, 
  ArrowUpRight, 
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export default function SellerDashboardPage() {
  const { store, products, orders } = useSellerStore();

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const activeListingsCount = products.filter(p => p.isActive).length;
  const pendingOrdersCount = orders.filter(o => o.status === 'placed').length;

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayRevenue = orders
    .filter(o => new Date(o.createdAt) >= todayStart && o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const totalSalesVal = orders
    .filter(o => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div style={containerStyle}>
      {/* Promo banner */}
      <div style={alertBannerStyle}>
        <AlertCircle size={20} color="#3b82f6" />
        <span style={alertTextStyle}>
          <strong>Tip:</strong> You can print shipment cards and configure parcel packaging sizes inside the orders details tab.
        </span>
      </div>

      {/* Grid: Stats cards */}
      <div style={statsGridStyle}>
        <StatsCard 
          title="Today's Revenue" 
          value={formatPrice(todayRevenue || 0)} 
          icon={IndianRupee} 
          color="#34A853" 
        />
        <StatsCard 
          title="Active Listings" 
          value={String(activeListingsCount)} 
          icon={ShoppingBag} 
          color="#4285F4" 
        />
        <StatsCard 
          title="Pending Orders" 
          value={String(pendingOrdersCount)} 
          icon={Clock} 
          color="#FBBC04" 
        />
        <StatsCard 
          title="Total Store Sales" 
          value={formatPrice(totalSalesVal || store?.totalSales || 0)} 
          icon={PackageCheck} 
          color="#EA4335" 
        />
      </div>

      {/* Grid: Recent Orders + Quick Actions */}
      <div style={gridStyle}>
        {/* Recent Orders Card */}
        <div className="card" style={recentOrdersCardStyle}>
          <div style={cardHeaderStyle}>
            <h2 style={cardTitleStyle}>Recent Orders</h2>
            <Link href="/seller/orders" style={viewAllLinkStyle}>
              <span>View All</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div style={tableWrapperStyle}>
            <table style={tableStyle}>
              <thead>
                <tr style={tableHeaderRowStyle}>
                  <th style={thStyle}>Order Number</th>
                  <th style={thStyle}>Customer</th>
                  <th style={thStyle}>Items</th>
                  <th style={thStyle}>Revenue</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Ordered At</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((ord) => (
                  <tr key={ord._id} style={tableRowStyle}>
                    <td style={{ ...tdStyle, fontWeight: '700' }}>
                      <Link href={`/seller/orders/${ord._id}`} style={{ color: '#4f46e5' }}>
                        {ord.orderNumber}
                      </Link>
                    </td>
                    <td style={tdStyle}>{ord.customerName}</td>
                    <td style={tdStyle}>{ord.items ? ord.items.reduce((sum: number, item: any) => sum + item.qty, 0) : 0} units</td>
                    <td style={{ ...tdStyle, fontWeight: '600' }}>{formatPrice(ord.totalAmount)}</td>
                    <td style={tdStyle}>
                      <span style={statusBadgeStyle(getStatusColor(ord.status))}>
                        {getStatusLabel(ord.status)}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, color: '#64748b' }}>{formatDate(ord.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick actions panel */}
        <div style={quickActionsColumnStyle}>
          <div className="card" style={{ padding: '24px' }}>
            <h2 style={cardTitleStyle}>Quick Actions</h2>
            <div style={actionsGridStyle}>
              <Link href="/seller/products/new" className="btn btn-primary" style={actionButtonStyle}>
                <span>+ Add Product</span>
              </Link>
              <Link href="/seller/store-settings" className="btn btn-outline" style={actionButtonStyle}>
                <span>Configure Payouts</span>
              </Link>
              <Link href="/seller/analytics" className="btn btn-outline" style={actionButtonStyle}>
                <span>Sales Reports</span>
              </Link>
            </div>
          </div>

          <div className="card" style={tipsCardStyle}>
            <div style={tipsHeaderStyle}>
              <TrendingUp size={20} color="#4f46e5" />
              <h3 style={tipsTitleStyle}>Sell Smarter</h3>
            </div>
            <p style={tipsDescStyle}>
              Keep product pricing competitive to gain high visibility on EdiStore's customer homepage. Products with accurate HSN codes are processed faster.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Styles
const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

const alertBannerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  backgroundColor: '#eff6ff',
  border: '1px solid #bfdbfe',
  borderRadius: '12px',
  padding: '12px 18px',
};

const alertTextStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#1e3a8a',
};

const statsGridStyle: React.CSSProperties = {
  display: 'flex',
  gap: '20px',
  flexWrap: 'wrap',
};

const gridStyle: React.CSSProperties = {
  display: 'flex',
  gap: '24px',
  flexWrap: 'wrap',
};

const recentOrdersCardStyle: React.CSSProperties = {
  flex: 2,
  minWidth: '320px',
  padding: '24px',
};

const cardHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
};

const cardTitleStyle: React.CSSProperties = {
  fontSize: '16px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: '800',
  color: '#0f172a',
};

const viewAllLinkStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '13px',
  fontWeight: '600',
  color: '#4f46e5',
};

const tableWrapperStyle: React.CSSProperties = {
  overflowX: 'auto',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  textAlign: 'left',
};

const tableHeaderRowStyle: React.CSSProperties = {
  borderBottom: '1px solid #e2e8f0',
};

const thStyle: React.CSSProperties = {
  padding: '12px 16px',
  fontSize: '12px',
  fontWeight: '700',
  color: '#64748b',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const tableRowStyle: React.CSSProperties = {
  borderBottom: '1px solid #f1f5f9',
};

const tdStyle: React.CSSProperties = {
  padding: '16px',
  fontSize: '13px',
  color: '#334155',
};

const statusBadgeStyle = (color: string): React.CSSProperties => ({
  backgroundColor: color + '15',
  color: color,
  padding: '4px 10px',
  borderRadius: '9999px',
  fontSize: '11px',
  fontWeight: '700',
  textTransform: 'capitalize',
});

// Quick Actions Column
const quickActionsColumnStyle: React.CSSProperties = {
  flex: 1,
  minWidth: '280px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

const actionsGridStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginTop: '16px',
};

const actionButtonStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  borderRadius: '10px',
  fontSize: '13px',
  fontWeight: '700',
};

const tipsCardStyle: React.CSSProperties = {
  padding: '24px',
  backgroundColor: '#f5f3ff',
  border: '1px solid #e0e7ff',
  borderRadius: '16px',
};

const tipsHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const tipsTitleStyle: React.CSSProperties = {
  fontSize: '15px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: '700',
  color: '#4f46e5',
};

const tipsDescStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#4f46e5',
  lineHeight: '1.5',
  marginTop: '10px',
};
