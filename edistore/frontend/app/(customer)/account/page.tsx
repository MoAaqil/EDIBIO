'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCustomerStore } from '@/lib/store/customer';
import { User, MapPin, Heart, ShoppingBag, Plus, Trash2, ArrowRight, Store } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AccountPage() {
  const router = useRouter();
  const { user, setUser } = useCustomerStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses'>('profile');
  const [ediPoints, setEdiPoints] = useState(0);

  useEffect(() => {
    async function fetchPoints() {
      if (user?.uid) {
        try {
          const res = await fetch(`/api/users/${user.uid}`);
          if (res.ok) {
            const data = await res.json();
            setEdiPoints(data.ediPoints || 0);
          }
        } catch {}
      }
    }
    fetchPoints();
  }, [user]);

  // Address form fields
  const [label, setLabel] = useState('Home');
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [line1, setLine1] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  const [addresses, setAddresses] = useState<any[]>(user?.addresses || [
    { id: 'addr_1', label: 'Home', name: 'Mo Aaqil', phone: '9876543210', line1: 'Flat 402, Green Glen Layout', city: 'Bangalore', state: 'Karnataka', pincode: '560103', isDefault: true }
  ]);

  const handleLogout = () => {
    setUser(null);
    toast.success('Logged out successfully');
    router.push('/');
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!line1 || !city || !state || !pincode || !name || !phone) {
      toast.error('Please enter all address details');
      return;
    }

    const newAddr = {
      id: 'addr_' + Math.random().toString(36).slice(2),
      label,
      name,
      phone,
      line1,
      city,
      state,
      pincode,
      isDefault: addresses.length === 0
    };

    const updated = [...addresses, newAddr];
    setAddresses(updated);
    
    if (user) {
      setUser({ ...user, addresses: updated });
    }

    // Reset fields
    setLine1('');
    setCity('');
    setState('');
    setPincode('');
    toast.success('New delivery address saved');
  };

  const handleDeleteAddress = (id: string) => {
    const updated = addresses.filter(a => a.id !== id);
    setAddresses(updated);
    if (user) {
      setUser({ ...user, addresses: updated });
    }
    toast.success('Address removed');
  };

  if (!user) {
    return (
      <div style={centerWrapperStyle}>
        <User size={64} color="#94a3b8" />
        <h1 style={{ fontSize: '24px', fontWeight: '800', marginTop: '16px' }}>My Account</h1>
        <p style={{ color: '#64748b', margin: '8px 0 24px' }}>Please login to view your profile settings.</p>
        <button onClick={() => router.push('/login')} className="btn btn-primary" style={{ padding: '12px 24px' }}>
          Login Now
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={wrapperStyle}>
      <h1 style={titleStyle}>My Account</h1>

      <div style={layoutGridStyle}>
        {/* Left Side: Sidebar navigation */}
        <div style={sidebarColumnStyle}>
          <div className="card" style={{ padding: '16px' }}>
            <div style={userBlockStyle}>
              <div style={userAvatarStyle}>
                <span style={{ fontSize: '24px' }}>👤</span>
              </div>
              <div>
                <h3 style={userNameStyle}>{user.name}</h3>
                <span style={userEmailStyle}>{user.email}</span>
                <div style={pointsBadgeStyle}>⭐ {ediPoints} Edi Points</div>
              </div>
            </div>

            <div style={dividerStyle}></div>

            <div style={navLinksStyle}>
              <button 
                onClick={() => setActiveTab('profile')} 
                style={navButtonStyle(activeTab === 'profile')}
              >
                <User size={18} />
                <span>Profile Info</span>
              </button>
              <button 
                onClick={() => setActiveTab('addresses')} 
                style={navButtonStyle(activeTab === 'addresses')}
              >
                <MapPin size={18} />
                <span>Saved Addresses</span>
              </button>
              <button onClick={() => router.push('/orders')} style={navLinkButtonStyle}>
                <ShoppingBag size={18} />
                <span>My Orders</span>
                <ArrowRight size={14} style={{ marginLeft: 'auto' }} />
              </button>
              <button onClick={() => router.push('/account/wishlist')} style={navLinkButtonStyle}>
                <Heart size={18} />
                <span>My Wishlist</span>
                <ArrowRight size={14} style={{ marginLeft: 'auto' }} />
              </button>
              {user.role !== 'seller' && user.role !== 'admin' && (
                <button onClick={() => router.push('/seller/register')} style={navLinkButtonStyle}>
                  <Store size={18} />
                  <span>Become a Seller</span>
                  <ArrowRight size={14} style={{ marginLeft: 'auto' }} />
                </button>
              )}
              {user.role === 'seller' && (
                <button onClick={() => router.push('/seller/dashboard')} style={navLinkButtonStyle}>
                  <Store size={18} />
                  <span>Seller Dashboard</span>
                  <ArrowRight size={14} style={{ marginLeft: 'auto' }} />
                </button>
              )}
            </div>

            <div style={dividerStyle}></div>

            <button onClick={handleLogout} style={logoutButtonStyle}>
              Logout Account
            </button>
          </div>
        </div>

        {/* Right Side: Tab Panel Content */}
        <div style={panelColumnStyle}>
          {activeTab === 'profile' ? (
            <div className="card" style={cardPaddingStyle}>
              <h2 style={sectionTitleStyle}>Profile Information</h2>
              <div style={profileFormStyle}>
                <div style={fieldGroupStyle}>
                  <label style={fieldLabelStyle}>Full Name</label>
                  <input type="text" className="input" value={user.name} disabled />
                </div>
                <div style={fieldGroupStyle}>
                  <label style={fieldLabelStyle}>Email Address</label>
                  <input type="email" className="input" value={user.email} disabled />
                </div>
                <div style={fieldGroupStyle}>
                  <label style={fieldLabelStyle}>Phone Number</label>
                  <input type="text" className="input" value={user.phone || 'Not configured'} disabled />
                </div>
                <div style={fieldGroupStyle}>
                  <label style={fieldLabelStyle}>Edi Points Balance</label>
                  <input type="text" className="input" value={`${ediPoints} points (Redeemable for discount)`} disabled style={{ fontWeight: '700', color: '#4f46e5' }} />
                </div>
                <div style={fieldGroupStyle}>
                  <label style={fieldLabelStyle}>Account Created</label>
                  <input type="text" className="input" value={new Date(user.createdAt).toLocaleDateString()} disabled />
                </div>
              </div>
            </div>
          ) : (
            <div style={addressesPanelStyle}>
              <div className="card" style={cardPaddingStyle}>
                <h2 style={sectionTitleStyle}>Saved Addresses</h2>
                <div style={addressListStyle}>
                  {addresses.map((addr) => (
                    <div key={addr.id} style={addressCardStyle}>
                      <div style={addressHeaderStyle}>
                        <span style={labelBadgeStyle}>{addr.label}</span>
                        {addr.isDefault && <span style={defaultBadgeStyle}>DEFAULT</span>}
                        <button onClick={() => handleDeleteAddress(addr.id)} style={deleteAddrButtonStyle}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p style={addrNameStyle}><strong>{addr.name}</strong></p>
                      <p style={addrLineStyle}>{addr.line1}</p>
                      <p style={addrLineStyle}>{addr.city}, {addr.state} - {addr.pincode}</p>
                      <p style={addrPhoneStyle}>Phone: {addr.phone}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card" style={{ ...cardPaddingStyle, marginTop: '24px' }}>
                <h2 style={sectionTitleStyle}>Add New Address</h2>
                <form onSubmit={handleAddAddress} style={formGridStyle}>
                  <div style={inputGroupStyle}>
                    <label style={fieldLabelStyle}>Address Label (e.g. Home, Office)</label>
                    <input type="text" className="input" value={label} onChange={e => setLabel(e.target.value)} required />
                  </div>
                  <div style={inputGroupStyle}>
                    <label style={fieldLabelStyle}>Receiver Name</label>
                    <input type="text" className="input" value={name} onChange={e => setName(e.target.value)} required />
                  </div>
                  <div style={inputGroupStyle}>
                    <label style={fieldLabelStyle}>Phone Number</label>
                    <input type="tel" className="input" value={phone} onChange={e => setPhone(e.target.value)} required />
                  </div>
                  <div style={{ ...inputGroupStyle, gridColumn: 'span 2' }}>
                    <label style={fieldLabelStyle}>Address Line 1</label>
                    <input type="text" className="input" value={line1} onChange={e => setLine1(e.target.value)} placeholder="Flat, House no, Building, Street..." required />
                  </div>
                  <div style={inputGroupStyle}>
                    <label style={fieldLabelStyle}>City</label>
                    <input type="text" className="input" value={city} onChange={e => setCity(e.target.value)} required />
                  </div>
                  <div style={inputGroupStyle}>
                    <label style={fieldLabelStyle}>State</label>
                    <input type="text" className="input" value={state} onChange={e => setState(e.target.value)} required />
                  </div>
                  <div style={inputGroupStyle}>
                    <label style={fieldLabelStyle}>Pincode</label>
                    <input type="text" className="input" value={pincode} onChange={e => setPincode(e.target.value)} required />
                  </div>
                  <div style={{ gridColumn: 'span 2', marginTop: '8px' }}>
                    <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Plus size={18} />
                      <span>Save Address</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
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
  paddingTop: '40px',
  paddingBottom: '80px',
  flex: 1,
};

const titleStyle: React.CSSProperties = {
  fontSize: '28px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: '900',
  marginBottom: '32px',
};

const layoutGridStyle: React.CSSProperties = {
  display: 'flex',
  gap: '32px',
  flexWrap: 'wrap',
};

const sidebarColumnStyle: React.CSSProperties = {
  flex: 1,
  minWidth: '280px',
};

const panelColumnStyle: React.CSSProperties = {
  flex: 2.2,
  minWidth: '320px',
};

const cardPaddingStyle: React.CSSProperties = {
  padding: '28px',
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '20px',
};

const userBlockStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '8px',
};

const userAvatarStyle: React.CSSProperties = {
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  backgroundColor: '#f1f5f9',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const userNameStyle: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: '700',
  fontFamily: "'Outfit', sans-serif",
};

const userEmailStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#64748b',
};

const pointsBadgeStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: '800',
  color: '#6d28d9',
  backgroundColor: '#f5f3ff',
  padding: '2px 8px',
  borderRadius: '6px',
  marginTop: '4px',
  display: 'inline-block',
  width: 'fit-content',
};

const navLinksStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const navButtonStyle = (active: boolean): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 16px',
  borderRadius: '10px',
  fontSize: '14px',
  fontWeight: '600',
  backgroundColor: active ? '#f5f3ff' : 'transparent',
  color: active ? '#4f46e5' : '#475569',
  cursor: 'pointer',
  textAlign: 'left',
  width: '100%',
});

const navLinkButtonStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 16px',
  borderRadius: '10px',
  fontSize: '14px',
  fontWeight: '600',
  backgroundColor: 'transparent',
  color: '#475569',
  cursor: 'pointer',
  textAlign: 'left',
  width: '100%',
};

const logoutButtonStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  backgroundColor: 'transparent',
  border: '1px solid #fee2e2',
  color: '#ef4444',
  borderRadius: '10px',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
};

// Panel content
const sectionTitleStyle: React.CSSProperties = {
  fontSize: '18px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: '800',
  marginBottom: '24px',
};

const profileFormStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '20px',
};

const fieldGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
};

const fieldLabelStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: '700',
  color: '#64748b',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

// Addresses
const addressesPanelStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const addressListStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: '20px',
};

const addressCardStyle: React.CSSProperties = {
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  padding: '16px',
  position: 'relative',
};

const addressHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '12px',
};

const labelBadgeStyle: React.CSSProperties = {
  backgroundColor: '#f1f5f9',
  color: '#475569',
  padding: '4px 10px',
  borderRadius: '6px',
  fontSize: '11px',
  fontWeight: '700',
};

const defaultBadgeStyle: React.CSSProperties = {
  backgroundColor: '#d1fae5',
  color: '#059669',
  padding: '4px 10px',
  borderRadius: '6px',
  fontSize: '10px',
  fontWeight: '800',
};

const deleteAddrButtonStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  color: '#94a3b8',
  cursor: 'pointer',
  marginLeft: 'auto',
};

const addrNameStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#0f172a',
  marginBottom: '6px',
};

const addrLineStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#475569',
  lineHeight: '1.4',
};

const addrPhoneStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#64748b',
  marginTop: '8px',
};

// Form address
const formGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '20px',
};

const inputGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
};

const dividerStyle: React.CSSProperties = {
  borderBottom: '1px solid #f1f5f9',
  margin: '16px 0',
};
