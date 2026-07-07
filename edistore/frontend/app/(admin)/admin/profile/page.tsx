'use client';

import { useState } from 'react';
import { useCustomerStore } from '@/lib/store/customer';
import { User, Mail, ShieldAlert, Award, Save, KeyRound } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminProfilePage() {
  const { user, setUser } = useCustomerStore();

  const [name, setName] = useState(user?.name || 'Super Admin');
  const [email, setEmail] = useState(user?.email || 'admin@edistore.in');
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error('Name and Email cannot be empty.');
      return;
    }

    setLoading(true);
    // Update local store state
    if (user) {
      setUser({
        ...user,
        name,
        email,
      });
      toast.success('Admin profile details updated successfully!');
    }
    setLoading(false);
  };

  return (
    <div style={containerStyle}>
      <div>
        <h2 style={titleStyle}>Admin Account Settings</h2>
        <p style={subTitleStyle}>Manage your administrative name, contact email, and platform credentials.</p>
      </div>

      <div style={layoutFlexStyle}>
        {/* Left Side: General Profile Card */}
        <div style={leftColStyle}>
          <form onSubmit={handleUpdateProfile} className="card" style={cardPaddingStyle}>
            <h3 style={sectionTitleStyle}>Admin Profile Information</h3>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Full Name</label>
              <div style={inputWrapperStyle}>
                <User size={16} color="#64748b" />
                <input 
                  type="text" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  className="input" 
                  style={{ border: 'none', padding: '0', outline: 'none', flex: 1 }}
                  required 
                />
              </div>
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Administrative Email Address</label>
              <div style={inputWrapperStyle}>
                <Mail size={16} color="#64748b" />
                <input 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className="input" 
                  style={{ border: 'none', padding: '0', outline: 'none', flex: 1 }}
                  required 
                />
              </div>
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Access Level</label>
              <input type="text" className="input" value="Super Administrator (Root)" disabled style={disabledInputStyle} />
            </div>

            <button type="submit" disabled={loading} style={saveButtonStyle}>
              <Save size={16} />
              <span>{loading ? 'Saving Details...' : 'Save Profile Changes'}</span>
            </button>
          </form>
        </div>

        {/* Right Side: Credentials & Badges */}
        <div style={rightColStyle}>
          <div className="card" style={cardPaddingStyle}>
            <h3 style={sectionTitleStyle}>Platform Permissions</h3>
            <div style={badgeContainerStyle}>
              <div style={badgeStyle}>
                <ShieldAlert size={16} />
                <div>
                  <strong style={{ display: 'block', fontSize: '13px', color: '#0f172a' }}>Full Write Access</strong>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Authorized to approve stores, modify plans, and delete catalogs.</span>
                </div>
              </div>

              <div style={badgeStyleGreen}>
                <Award size={16} />
                <div>
                  <strong style={{ display: 'block', fontSize: '13px', color: '#065f46' }}>Auditing Systems Verified</strong>
                  <span style={{ fontSize: '11px', color: '#047857' }}>Permitted to fetch and archive GSTR filings records.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ ...cardPaddingStyle, marginTop: '24px' }}>
            <h3 style={sectionTitleStyle}>Access Keys & Logs</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b', fontSize: '13px' }}>
              <KeyRound size={16} />
              <span>Session Key: active_root_session</span>
            </div>
            <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '10px', lineHeight: '1.4' }}>
              Your session is securely authenticated via Firebase. Pushes are live-synced to MongoDB cluster databases automatically.
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

const layoutFlexStyle: React.CSSProperties = {
  display: 'flex',
  gap: '24px',
  flexWrap: 'wrap',
};

const leftColStyle: React.CSSProperties = {
  flex: 1.5,
  minWidth: '320px',
};

const rightColStyle: React.CSSProperties = {
  flex: 1,
  minWidth: '280px',
};

const cardPaddingStyle: React.CSSProperties = {
  padding: '24px',
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '15px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: '800',
  color: '#0f172a',
  marginBottom: '20px',
};

const inputGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  marginBottom: '16px',
};

const labelStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: '700',
  color: '#334155',
  fontFamily: "'Outfit', sans-serif",
};

const inputWrapperStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  border: '1px solid #cbd5e1',
  borderRadius: '10px',
  padding: '10px 14px',
  backgroundColor: '#ffffff',
  fontSize: '14px',
};

const disabledInputStyle: React.CSSProperties = {
  backgroundColor: '#f1f5f9',
  color: '#64748b',
  border: '1px solid #cbd5e1',
  cursor: 'not-allowed',
};

const saveButtonStyle: React.CSSProperties = {
  backgroundColor: '#4f46e5',
  color: '#ffffff',
  border: 'none',
  padding: '12px',
  borderRadius: '10px',
  fontWeight: '700',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  cursor: 'pointer',
  width: '100%',
  marginTop: '10px',
};

const badgeContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const badgeStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  padding: '12px',
  backgroundColor: '#fef2f2',
  border: '1px solid #fee2e2',
  color: '#ef4444',
  borderRadius: '10px',
};

const badgeStyleGreen: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  padding: '12px',
  backgroundColor: '#ecfdf5',
  border: '1px solid #d1fae5',
  color: '#10b981',
  borderRadius: '10px',
};
