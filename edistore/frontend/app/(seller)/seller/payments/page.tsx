'use client';

import { formatPrice } from '@/lib/utils';
import { Landmark, ArrowUpRight, CheckCircle, Info } from 'lucide-react';

export default function SellerPaymentsPage() {
  const payoutHistory = [
    { id: 'p_1', date: '30 Jun 2026', amount: 12500, method: 'IMPS Bank Transfer', status: 'completed' },
    { id: 'p_2', date: '15 Jun 2026', amount: 8400, method: 'UPI Settlement', status: 'completed' },
  ];

  return (
    <div style={containerStyle}>
      <div>
        <h2 style={titleStyle}>Payout Ledger & Billings</h2>
        <p style={subTitleStyle}>Track weekly payouts, platform commission billing, and edit settlement bank accounts.</p>
      </div>

      <div style={gridRowStyle}>
        {/* Ledger overview card */}
        <div style={leftColStyle}>
          <div className="card" style={ledgerCardStyle}>
            <div style={balanceHeaderStyle}>
              <div>
                <span style={balanceLabelStyle}>Unpaid Ledger Balance</span>
                <p style={balanceValueStyle}>{formatPrice(4820)}</p>
              </div>
              <button className="btn btn-primary" style={payoutButtonStyle}>Request Settlement</button>
            </div>
            
            <div style={dividerStyle}></div>
            
            <div style={infoRowStyle}>
              <Info size={16} color="#6366f1" style={{ flexShrink: 0 }} />
              <p style={infoTextStyle}>
                EdiStore settles balances every Sunday automatically once the customer doorstep signature return-window (48 hours) has expired.
              </p>
            </div>
          </div>

          <div className="card" style={{ padding: '24px', marginTop: '24px' }}>
            <h3 style={cardTitleStyle}>Payout Settlement History</h3>
            <div style={tableWrapperStyle}>
              <table style={tableStyle}>
                <thead>
                  <tr style={tableHeaderRowStyle}>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>Amount</th>
                    <th style={thStyle}>Channel</th>
                    <th style={thStyle}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payoutHistory.map((p) => (
                    <tr key={p.id} style={tableRowStyle}>
                      <td style={tdStyle}>{p.date}</td>
                      <td style={{ ...tdStyle, fontWeight: '700' }}>{formatPrice(p.amount)}</td>
                      <td style={tdStyle}>{p.method}</td>
                      <td style={tdStyle}>
                        <span style={statusBadgeStyle}>
                          <CheckCircle size={12} color="#10b981" />
                          <span>{p.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Bank details card */}
        <div style={rightColStyle}>
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={cardTitleStyle}>Active Payout Method</h3>
            <div style={bankBlockStyle}>
              <div style={bankHeaderStyle}>
                <Landmark size={24} color="#4f46e5" />
                <h4 style={bankTitleStyle}>HDFC Bank</h4>
              </div>
              
              <div style={bankMetaGridStyle}>
                <div>
                  <span style={bankLabelStyle}>ACCOUNT NAME</span>
                  <p style={bankValueStyle2}>Raj Supermarket Pvt Ltd</p>
                </div>
                <div>
                  <span style={bankLabelStyle}>ACCOUNT NUMBER</span>
                  <p style={bankValueStyle2}>•••• •••• 82104</p>
                </div>
                <div>
                  <span style={bankLabelStyle}>IFSC CODE</span>
                  <p style={bankValueStyle2}>HDFC0001203</p>
                </div>
                <div>
                  <span style={bankLabelStyle}>SETTLEMENT UPI</span>
                  <p style={bankValueStyle2}>rajsuper@okhdfc</p>
                </div>
              </div>
            </div>
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

const gridRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '24px',
  flexWrap: 'wrap',
};

const leftColStyle: React.CSSProperties = {
  flex: 1.6,
  minWidth: '320px',
};

const rightColStyle: React.CSSProperties = {
  flex: 1,
  minWidth: '280px',
};

const ledgerCardStyle: React.CSSProperties = {
  padding: '24px',
  background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
  color: 'white',
  border: 'none',
};

const balanceHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '16px',
};

const balanceLabelStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: '700',
  color: '#94a3b8',
  textTransform: 'uppercase',
  letterSpacing: '1px',
};

const balanceValueStyle: React.CSSProperties = {
  fontSize: '36px',
  fontWeight: '800',
  color: 'white',
  marginTop: '6px',
  fontFamily: "'Outfit', sans-serif",
};

const payoutButtonStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  color: '#0f172a',
  padding: '10px 18px',
  borderRadius: '8px',
  fontSize: '13px',
  fontWeight: '700',
  cursor: 'pointer',
};

const infoRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
};

const infoTextStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#cbd5e1',
  lineHeight: '1.4',
};

const cardTitleStyle: React.CSSProperties = {
  fontSize: '15px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: '800',
  color: '#0f172a',
  marginBottom: '20px',
};

// Table Payouts
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
  fontSize: '11px',
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

const statusBadgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '12px',
  color: '#10b981',
  fontWeight: '700',
  textTransform: 'capitalize',
};

// Bank Block
const bankBlockStyle: React.CSSProperties = {
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  padding: '20px',
};

const bankHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '20px',
};

const bankTitleStyle: React.CSSProperties = {
  fontSize: '16px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: '800',
  color: '#0f172a',
};

const bankMetaGridStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
};

const bankLabelStyle: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: '700',
  color: '#64748b',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const bankValueStyle2: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: '600',
  color: '#1e293b',
  marginTop: '2px',
};

const dividerStyle: React.CSSProperties = {
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  margin: '16px 0',
};
