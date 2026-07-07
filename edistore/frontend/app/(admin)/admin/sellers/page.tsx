'use client';

import { useState } from 'react';
import { ShieldAlert, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminSellersPage() {
  const [sellers, setSellers] = useState<any[]>([
    { id: 's_01', storeName: 'Gourmet Greens Organic', category: 'grocery', phone: '9827103829', city: 'Mumbai', gst: '27ABCDE1234F1Z1', status: 'pending' },
    { id: 's_02', storeName: 'TechHub Devices', category: 'electronics', phone: '8172938190', city: 'Delhi', gst: '07ABCDE1234F1Z0', status: 'pending' },
    { id: 's_03', storeName: 'Urban Loom Apparel', category: 'fashion', phone: '9928104820', city: 'Bangalore', gst: '29ABCDE1234F1Z8', status: 'pending' }
  ]);

  const handleApprove = (id: string, name: string) => {
    setSellers(prev => prev.filter(s => s.id !== id));
    toast.success(`Store "${name}" has been approved successfully!`);
  };

  const handleReject = (id: string, name: string) => {
    setSellers(prev => prev.filter(s => s.id !== id));
    toast.error(`Store "${name}" application rejected`);
  };

  return (
    <div style={containerStyle}>
      <div>
        <h2 style={titleStyle}>Pending Store Applications ({sellers.length})</h2>
        <p style={subTitleStyle}>Verify credentials and approve/reject partner retail store requests.</p>
      </div>

      <div style={listStyle}>
        {sellers.length === 0 ? (
          <div className="card" style={emptyStateStyle}>
            <CheckCircle size={48} color="#10b981" />
            <p style={{ marginTop: '12px', color: '#64748b', fontWeight: '600' }}>No pending applications to review!</p>
          </div>
        ) : (
          sellers.map((s) => (
            <div key={s.id} className="card" style={sellerCardStyle}>
              <div>
                <h3 style={storeTitleStyle}>{s.storeName}</h3>
                <div style={metaGridStyle}>
                  <p style={metaItemStyle}>Category: <strong>{s.category.toUpperCase()}</strong></p>
                  <p style={metaItemStyle}>Helpline: <strong>{s.phone}</strong></p>
                  <p style={metaItemStyle}>Region: <strong>{s.city}</strong></p>
                  <p style={metaItemStyle}>GSTIN: <strong>{s.gst || 'Not submitted'}</strong></p>
                </div>
              </div>

              <div style={actionsRowStyle}>
                <button onClick={() => handleApprove(s.id, s.storeName)} className="btn btn-primary" style={approveButtonStyle}>
                  <CheckCircle size={16} />
                  <span>Approve</span>
                </button>
                <button onClick={() => handleReject(s.id, s.storeName)} className="btn btn-outline" style={rejectButtonStyle}>
                  <XCircle size={16} />
                  <span>Reject</span>
                </button>
              </div>
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

const listStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const emptyStateStyle: React.CSSProperties = {
  padding: '64px',
  textAlign: 'center',
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const sellerCardStyle: React.CSSProperties = {
  padding: '24px',
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '20px',
};

const storeTitleStyle: React.CSSProperties = {
  fontSize: '16px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: '800',
  color: '#0f172a',
};

const metaGridStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  marginTop: '8px',
};

const metaItemStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#64748b',
};

const actionsRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
};

const approveButtonStyle: React.CSSProperties = {
  backgroundColor: '#10b981',
  color: '#ffffff',
  padding: '8px 16px',
  borderRadius: '8px',
  fontSize: '12px',
  fontWeight: '600',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  cursor: 'pointer',
};

const rejectButtonStyle: React.CSSProperties = {
  color: '#ef4444',
  border: '1px solid #fee2e2',
  padding: '8px 16px',
  borderRadius: '8px',
  fontSize: '12px',
  fontWeight: '600',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  cursor: 'pointer',
};
