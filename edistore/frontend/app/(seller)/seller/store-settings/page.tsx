'use client';

import { useState } from 'react';
import { useSellerStore } from '@/lib/store/seller';
import { PRODUCT_CATEGORIES, INDIAN_STATES } from '@/lib/types';
import { Store, Save, ShieldAlert, Award } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SellerStoreSettingsPage() {
  const { store, setStore } = useSellerStore();

  const [name, setName] = useState(store?.name || 'Raj Supermarket');
  const [description, setDescription] = useState(store?.description || 'A neighborhood fresh organic grocery and staples store.');
  const [category, setCategory] = useState(store?.category || 'grocery');
  const [gstNumber, setGSTNumber] = useState(store?.gstNumber || '29ABCDE1234F1Z5');
  const [phone, setPhone] = useState(store?.phone || '9876543210');
  const [email, setEmail] = useState(store?.email || 'partner@supermarket.com');

  const [city, setCity] = useState(store?.city || 'Bangalore');
  const [state, setState] = useState(store?.state || 'Karnataka');

  // Bank details
  const [bankName, setBankName] = useState(store?.bankDetails?.bankName || 'HDFC Bank');
  const [accountName, setAccountName] = useState(store?.bankDetails?.accountName || 'Raj Supermarket Pvt Ltd');
  const [accountNumber, setAccountNumber] = useState(store?.bankDetails?.accountNumber || '5010029382104');
  const [ifsc, setIFSC] = useState(store?.bankDetails?.ifsc || 'HDFC0001203');
  const [upiId, setUPIId] = useState(store?.bankDetails?.upiId || 'rajsuper@okhdfc');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !phone || !email || !city) {
      toast.error('Please enter all required fields.');
      return;
    }

    if (!store?._id) {
      toast.error('No active store profile loaded.');
      return;
    }

    const updatedStore = {
      name,
      description,
      category,
      gstNumber,
      phone,
      email,
      city,
      state,
      bankDetails: {
        bankName,
        accountName,
        accountNumber,
        ifsc,
        upiId
      }
    };

    const toastId = toast.loading('Updating store profile and settlements account...');
    try {
      const res = await fetch(`/api/stores/${store._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStore),
      });
      const data = await res.json();
      if (res.ok) {
        setStore(data);
        toast.success('Store credentials and bank settlements updated successfully!', { id: toastId });
      } else {
        toast.error(data.error || 'Failed to update store settings.', { id: toastId });
      }
    } catch (err: any) {
      toast.error('Network error: ' + err.message, { id: toastId });
    }
  };

  return (
    <div style={containerStyle}>
      <div>
        <h2 style={titleStyle}>Store Profile Credentials</h2>
        <p style={subTitleStyle}>Manage your retail store logo, banners, addresses, and payouts settlements account.</p>
      </div>

      <form onSubmit={handleSave} style={formFlexStyle}>
        <div style={leftColStyle}>
          {/* General credentials */}
          <div className="card" style={cardPaddingStyle}>
            <h3 style={sectionTitleStyle}>General Store Credentials</h3>
            
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Store Trade Name *</label>
              <input type="text" className="input" value={name} onChange={e => setName(e.target.value)} required />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Business Description *</label>
              <textarea 
                className="input" 
                value={description} 
                onChange={e => setDescription(e.target.value)}
                style={{ minHeight: '80px', resize: 'vertical' }}
                required 
              />
            </div>

            <div style={rowGridStyle}>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Primary Category *</label>
                <select className="input" value={category} onChange={e => setCategory(e.target.value)}>
                  {PRODUCT_CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>GSTIN Number (Optional)</label>
                <input type="text" className="input" value={gstNumber} onChange={e => setGSTNumber(e.target.value)} placeholder="29ABCDE1234F1Z5" />
              </div>
            </div>

            <div style={rowGridStyle}>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Support Helpline Phone *</label>
                <input type="tel" className="input" value={phone} onChange={e => setPhone(e.target.value)} required />
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Support Email Address *</label>
                <input type="email" className="input" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>
          </div>

          {/* Store Location */}
          <div className="card" style={{ ...cardPaddingStyle, marginTop: '24px' }}>
            <h3 style={sectionTitleStyle}>Store Location</h3>
            <div style={rowGridStyle}>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Operating City *</label>
                <input type="text" className="input" value={city} onChange={e => setCity(e.target.value)} required />
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Operating State *</label>
                <select className="input" value={state} onChange={e => setState(e.target.value)}>
                  {INDIAN_STATES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right side: settlements bank account */}
        <div style={rightColStyle}>
          <div className="card" style={cardPaddingStyle}>
            <h3 style={sectionTitleStyle}>Settlements Bank Account</h3>
            <p style={labelDescStyle}>All purchase order funds are credited to this account.</p>
            
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Bank Name</label>
              <input type="text" className="input" value={bankName} onChange={e => setBankName(e.target.value)} required />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Beneficiary Account Name</label>
              <input type="text" className="input" value={accountName} onChange={e => setAccountName(e.target.value)} required />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Bank Account Number</label>
              <input type="text" className="input" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} required />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>IFSC Code</label>
              <input type="text" className="input" value={ifsc} onChange={e => setIFSC(e.target.value)} required />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Settlement UPI ID</label>
              <input type="text" className="input" value={upiId} onChange={e => setUPIId(e.target.value)} required />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={saveButtonStyle}>
            <Save size={18} />
            <span>Save Store Settings</span>
          </button>
        </div>
      </form>
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

const formFlexStyle: React.CSSProperties = {
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
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
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

const labelDescStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#64748b',
  marginBottom: '16px',
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

const rowGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '16px',
};

const saveButtonStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  borderRadius: '12px',
  fontSize: '14px',
  fontWeight: '700',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
};
