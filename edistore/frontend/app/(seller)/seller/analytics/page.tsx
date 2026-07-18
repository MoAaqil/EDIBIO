'use client';

import { useState } from 'react';
import { formatPrice } from '@/lib/utils';
import { TrendingUp, ShoppingBag, Award, ArrowUpRight, BarChart3 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SellerAnalyticsPage() {
  const [salesPeriod, setSalesPeriod] = useState<'week' | 'month' | 'year'>('month');

  // Mock analytics data
  const monthlyRevenueData = [
    { label: 'Jan', value: 8200 },
    { label: 'Feb', value: 9400 },
    { label: 'Mar', value: 12500 },
    { label: 'Apr', value: 11000 },
    { label: 'May', value: 14500 },
    { label: 'Jun', value: 18200 }
  ];

  const topProducts = [
    { name: 'Organic Premium Basmati Rice', units: 48, revenue: 6960 },
    { name: 'Cold Pressed Sunflower Oil 1L', units: 85, revenue: 15725 },
    { name: 'Wireless Bluetooth Headset v5.3', units: 12, revenue: 17988 },
  ];

  return (
    <div style={containerStyle}>
      <div style={headerRowStyle}>
        <div>
          <h2 style={titleStyle}>Performance Analytics</h2>
          <p style={subTitleStyle}>Monitor your stores revenue growth, best-selling categories and traffic logs.</p>
        </div>
        <div style={periodButtonsStyle}>
          <button onClick={() => setSalesPeriod('week')} style={periodButtonStyle(salesPeriod === 'week')}>This Week</button>
          <button onClick={() => setSalesPeriod('month')} style={periodButtonStyle(salesPeriod === 'month')}>This Month</button>
          <button onClick={() => setSalesPeriod('year')} style={periodButtonStyle(salesPeriod === 'year')}>This Year</button>
        </div>
      </div>

      <div style={gridRowStyle}>
        {/* Sales charts */}
        <div className="card" style={chartCardStyle}>
          <h3 style={cardTitleStyle}>Monthly Revenue Graph (INR)</h3>
          <div style={{ height: '260px', width: '100%', marginTop: '16px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="label" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none' }}
                  labelStyle={{ color: '#94a3b8', fontSize: '11px', fontWeight: '600' }}
                  itemStyle={{ color: '#ffffff', fontSize: '13px', fontWeight: '800' }}
                  formatter={(val) => [`₹${val}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* top items */}
        <div className="card" style={topItemsCardStyle}>
          <h3 style={cardTitleStyle}>Top Performing Items</h3>
          <div style={itemsListStyle}>
            {topProducts.map((p, idx) => (
              <div key={idx} style={itemRowStyle}>
                <div style={itemIconWrapperStyle}>
                  <Award size={18} color="#4f46e5" />
                </div>
                <div style={itemMetaStyle}>
                  <p style={itemNameStyle}>{p.name}</p>
                  <span style={itemSalesLabelStyle}>{p.units} units sold</span>
                </div>
                <span style={itemRevenueStyle}>{formatPrice(p.revenue)}</span>
              </div>
            ))}
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

const periodButtonsStyle: React.CSSProperties = {
  display: 'flex',
  backgroundColor: '#e2e8f0',
  padding: '4px',
  borderRadius: '8px',
};

const periodButtonStyle = (active: boolean): React.CSSProperties => ({
  padding: '6px 12px',
  borderRadius: '6px',
  fontSize: '12px',
  fontWeight: '600',
  backgroundColor: active ? '#ffffff' : 'transparent',
  color: active ? '#4f46e5' : '#64748b',
  cursor: 'pointer',
});

const gridRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '24px',
  flexWrap: 'wrap',
};

const chartCardStyle: React.CSSProperties = {
  flex: 1.8,
  minWidth: '320px',
  padding: '24px',
};

const topItemsCardStyle: React.CSSProperties = {
  flex: 1.2,
  minWidth: '300px',
  padding: '24px',
};

const cardTitleStyle: React.CSSProperties = {
  fontSize: '15px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: '800',
  color: '#0f172a',
  marginBottom: '24px',
};

// Custom CSS Chart
const chartWrapperStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'flex-end',
  height: '240px',
  paddingTop: '20px',
  borderBottom: '2px solid #e2e8f0',
  marginBottom: '10px',
};

const chartBarContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1,
  height: '100%',
  justifyContent: 'flex-end',
};

const chartBarLabelValueStyle: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: '700',
  color: '#4f46e5',
  marginBottom: '6px',
};

const chartBarInnerWrapperStyle: React.CSSProperties = {
  width: '32px',
  height: '160px',
  backgroundColor: '#f1f5f9',
  borderRadius: '8px 8px 0 0',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  overflow: 'hidden',
};

const chartBarFillStyle = (pct: number): React.CSSProperties => ({
  height: `${pct}%`,
  backgroundColor: '#4f46e5',
  width: '100%',
  borderRadius: '8px 8px 0 0',
  transition: 'height 0.6s ease',
});

const chartBarLabelStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: '600',
  color: '#64748b',
  marginTop: '8px',
};

// Items List
const itemsListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const itemRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

const itemIconWrapperStyle: React.CSSProperties = {
  width: '36px',
  height: '36px',
  borderRadius: '8px',
  backgroundColor: '#e0e7ff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const itemMetaStyle: React.CSSProperties = {
  flex: 1,
};

const itemNameStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: '750',
  color: '#1e293b',
};

const itemSalesLabelStyle: React.CSSProperties = {
  fontSize: '11px',
  color: '#64748b',
  marginTop: '1px',
};

const itemRevenueStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: '800',
  color: '#0f172a',
};
