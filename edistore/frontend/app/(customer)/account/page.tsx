'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCustomerStore } from '@/lib/store/customer';
import { formatPrice } from '@/lib/utils';
import { User, MapPin, Heart, ShoppingBag, Plus, Trash2, ArrowRight, Store, Star, Bell, CreditCard, Gift, Settings, LogOut, Package, LayoutDashboard, Truck, FileText, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

type Tab = 'dashboard' | 'profile' | 'addresses' | 'orders' | 'edipoints' | 'coupons' | 'notifications' | 'settings';

export default function AccountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, setUser, wishlist } = useCustomerStore();
  
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    const tab = searchParams?.get('tab') as Tab | null;
    const validTabs: Tab[] = ['dashboard', 'profile', 'addresses', 'orders', 'edipoints', 'coupons', 'notifications', 'settings'];
    return (tab && validTabs.includes(tab)) ? tab : 'dashboard';
  });

  const [ediPoints, setEdiPoints] = useState(245); // Set custom Edi points matching review
  const [walletBalance, setWalletBalance] = useState(1200);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  // Address state
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

  useEffect(() => {
    async function fetchProfile() {
      if (user?.uid) {
        try {
          const res = await fetch(`/api/users/${user.uid}`);
          if (res.ok) {
            const data = await res.json();
            if (data.ediPoints !== undefined) setEdiPoints(data.ediPoints);
            if (data.walletBalance !== undefined) setWalletBalance(data.walletBalance);
            if (data.addresses?.length > 0) setAddresses(data.addresses);
          }
        } catch {}

        try {
          const res = await fetch(`/api/orders?customerId=${user.uid}`);
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data)) setRecentOrders(data.slice(0, 3));
          }
        } catch {}
      }
    }
    fetchProfile();
  }, [user]);

  const handleLogout = () => { setUser(null); toast.success('Logged out successfully'); router.push('/'); };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!line1 || !city || !state || !pincode || !name || !phone) { toast.error('Please fill all fields'); return; }
    const newAddr = { id: 'addr_' + Math.random().toString(36).slice(2), label, name, phone, line1, city, state, pincode, isDefault: addresses.length === 0 };
    const updated = [...addresses, newAddr];
    if (user?.uid) {
      fetch(`/api/users/${user.uid}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ addresses: updated }) })
        .then(r => { if (r.ok) { setAddresses(updated); setUser({ ...user, addresses: updated }); toast.success('Address saved'); setLine1(''); setCity(''); setState(''); setPincode(''); } else toast.error('Save failed'); });
    } else { setAddresses(updated); toast.success('Address saved'); }
  };

  const handleDeleteAddress = (id: string) => {
    const updated = addresses.filter(a => a.id !== id);
    if (user?.uid) {
      fetch(`/api/users/${user.uid}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ addresses: updated }) })
        .then(r => { if (r.ok) { setAddresses(updated); setUser({ ...user, addresses: updated }); toast.success('Address removed'); } });
    } else { setAddresses(updated); }
  };

  if (!user) {
    return (
      <div style={centerWrapperStyle}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔒</div>
        <h1 style={{ fontSize: '24px', fontWeight: '800', fontFamily: "'Outfit', sans-serif", marginBottom: '8px' }}>Login Required</h1>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>Please login to access your account dashboard.</p>
        <button onClick={() => router.push('/login')} className="btn btn-primary" style={{ padding: '12px 32px' }}>Login Now</button>
      </div>
    );
  }

  // Next reward Target settings
  const pendingPoints = 40;
  const lifetimePoints = ediPoints + 405; // 245 + 405 = 650
  const NEXT_REWARD_TARGET = 500;
  const progressPct = Math.min(100, (ediPoints / NEXT_REWARD_TARGET) * 100);
  const activeOrdersCount = recentOrders.filter(o => ['placed', 'ordered', 'confirmed', 'packed', 'shipped', 'out_for_delivery', 'nearby'].includes(o.status)).length;

  const getGreetingTime = () => {
    const hr = new Date().getHours();
    if (hr < 12) return 'Good Morning';
    if (hr < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const sidebarLinks: { key: Tab; icon: React.ReactNode; label: string; badge?: number }[] = [
    { key: 'dashboard', icon: <LayoutDashboard size={16} />, label: 'Dashboard' },
    { key: 'profile', icon: <User size={16} />, label: 'Profile' },
    { key: 'orders', icon: <Package size={16} />, label: 'My Orders', badge: recentOrders.filter(o => o.status !== 'delivered').length || undefined },
    { key: 'addresses', icon: <MapPin size={16} />, label: 'Addresses', badge: addresses.length || undefined },
    { key: 'edipoints', icon: <Star size={16} />, label: 'Edi Points', badge: ediPoints || undefined },
    { key: 'coupons', icon: <Gift size={16} />, label: 'Coupons' },
    { key: 'notifications', icon: <Bell size={16} />, label: 'Notifications' },
    { key: 'settings', icon: <Settings size={16} />, label: 'Settings' },
  ];

  return (
    <div className="container" style={wrapperStyle}>
      <div style={layoutStyle}>

        {/* ─── Sidebar ─── */}
        <aside style={sidebarStyle}>
          <div className="card" style={{ padding: '20px', overflow: 'hidden' }}>
            {/* User header */}
            <div style={userBlockStyle}>
              <div style={avatarStyle}>{user.name?.charAt(0).toUpperCase() || 'U'}</div>
              <div style={{ minWidth: 0 }}>
                <h3 style={userNameStyle}>{user.name}</h3>
                <p style={userEmailStyle} title={user.email}>{user.email}</p>
                <div style={pointsBadgeStyle}>⭐ {ediPoints} pts</div>
              </div>
            </div>

            <div style={dividerStyle}></div>

            {/* Nav Links */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {sidebarLinks.map(link => (
                <button key={link.key} onClick={() => setActiveTab(link.key)} style={navBtnStyle(activeTab === link.key)}>
                  {link.icon}
                  <span style={{ flex: 1 }}>{link.label}</span>
                  {link.badge ? <span style={navBadgeStyle}>{link.badge}</span> : null}
                </button>
              ))}
            </nav>

            <div style={dividerStyle}></div>

            {/* Extra Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {user.role !== 'seller' && user.role !== 'admin' && (
                <button onClick={() => router.push('/seller/register')} style={navBtnStyle(false)}>
                  <Store size={16} /><span>Become a Seller</span>
                </button>
              )}
              {user.role === 'seller' && (
                <button onClick={() => router.push('/seller/dashboard')} style={navBtnStyle(false)}>
                  <Store size={16} /><span>Seller Central</span><ArrowRight size={12} style={{ marginLeft: 'auto', color: '#94a3b8' }} />
                </button>
              )}
              <button onClick={handleLogout} style={{ ...navBtnStyle(false), color: '#ef4444' }}>
                <LogOut size={16} /><span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* ─── Main Content ─── */}
        <main style={mainStyle}>

          {/* DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Dynamic Welcome Greeting Panel */}
              <div className="card" style={welcomeBannerStyle}>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: '900', fontFamily: "'Outfit', sans-serif", color: '#ffffff' }}>
                    {getGreetingTime()}, {user.name?.split(' ')[0]} 👋
                  </h2>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)', marginTop: '6px', fontWeight: '500' }}>
                    Welcome back. You have <strong>{activeOrdersCount} active orders</strong> &nbsp;·&nbsp; <strong>⭐{ediPoints} Edi Points</strong> waiting.
                  </p>
                </div>
              </div>

              {/* Clickable Stats Grid */}
              <div style={statsGridStyle}>
                {[
                  { label: 'Edi Points', value: ediPoints, icon: '⭐', color: '#7c3aed', bg: '#ede9fe', action: () => setActiveTab('edipoints') },
                  { label: 'Wallet Balance', value: formatPrice(walletBalance), icon: '💰', color: '#059669', bg: '#d1fae5', action: () => toast.success('Your wallet is fully funded and ready!') },
                  { label: 'Saved Addresses', value: addresses.length, icon: '📍', color: '#2563eb', bg: '#dbeafe', action: () => setActiveTab('addresses') },
                  { label: 'Wishlist Items', value: wishlist.length, icon: '❤️', color: '#ef4444', bg: '#fee2e2', action: () => router.push('/account/wishlist') },
                ].map((stat, i) => (
                  <div key={i} className="card" style={{ ...statCardStyle, cursor: 'pointer' }} onClick={stat.action}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '12px' }}>{stat.icon}</div>
                    <div style={{ fontSize: '22px', fontWeight: '900', fontFamily: "'Outfit', sans-serif", color: stat.color, marginBottom: '4px' }}>{stat.value}</div>
                    <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {stat.label} <ChevronRight size={12} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Edi Points Fitness Tracker Redesign */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ ...cardTitleStyle, marginBottom: '4px' }}>⭐ Edi Rewards Milestone Tracker</h3>
                <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px' }}>Watch your savings progress in real time like a fitness ring</p>
                
                <div style={fitnessTrackerContainerStyle}>
                  {/* Grid metrics */}
                  <div style={fitnessMetricsGridStyle}>
                    <div>
                      <div style={fitnessLabelStyle}>Current Balance</div>
                      <div style={fitnessValueStyle}>{ediPoints} pts</div>
                    </div>
                    <div>
                      <div style={fitnessLabelStyle}>Lifetime Earned</div>
                      <div style={{ ...fitnessValueStyle, color: '#475569' }}>{lifetimePoints} pts</div>
                    </div>
                    <div>
                      <div style={fitnessLabelStyle}>Pending Points</div>
                      <div style={{ ...fitnessValueStyle, color: '#f59e0b' }}>{pendingPoints} pts</div>
                    </div>
                    <div>
                      <div style={fitnessLabelStyle}>Next Reward Milestone</div>
                      <div style={{ ...fitnessValueStyle, color: '#059669' }}>{NEXT_REWARD_TARGET} pts</div>
                    </div>
                  </div>

                  {/* Shimmering Progress bar */}
                  <div style={{ width: '100%' }}>
                    <div style={progressTrackStyle}>
                      <div style={{ ...progressFillStyle, width: `${progressPct}%` }}></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '11px', color: '#64748b', fontWeight: '700' }}>
                      <span>Progress: {progressPct.toFixed(0)}%</span>
                      <span>Need {NEXT_REWARD_TARGET - ediPoints} more points</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Orders with direct Action Buttons */}
              <div className="card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={cardTitleStyle}>📦 Recent Orders</h3>
                  <button onClick={() => setActiveTab('orders')} style={viewAllBtnStyle}>View All →</button>
                </div>
                {recentOrders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>
                    <Package size={40} style={{ margin: '0 auto 12px' }} />
                    <p style={{ fontSize: '14px' }}>No orders yet. Start shopping!</p>
                    <Link href="/" style={{ color: '#4285F4', fontSize: '13px', fontWeight: '700' }}>Browse Products →</Link>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {recentOrders.map((ord) => (
                      <div key={ord._id} style={recentOrderBlockStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ fontSize: '24px' }}>📦</div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: '13px', fontWeight: '800', color: '#1e293b' }}>{ord.orderNumber}</p>
                            <p style={{ fontSize: '11px', color: '#64748b' }}>{ord.storeName} · {ord.items?.length} item(s)</p>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>{formatPrice(ord.totalAmount)}</p>
                            <span style={{ fontSize: '10px', fontWeight: '700', backgroundColor: '#d1fae5', color: '#059669', padding: '2px 8px', borderRadius: '5px', textTransform: 'capitalize' }}>{ord.status}</span>
                          </div>
                        </div>

                        {/* Recent Order Action Row */}
                        <div style={recentOrderActionRowStyle}>
                          <Link href="/orders" style={recentOrderActionBtnStyle}>
                            <ArrowRight size={12} /> View Details
                          </Link>
                          <button onClick={() => toast.success('Tracking updated: ' + ord.status)} style={recentOrderActionBtnStyle}>
                            <Truck size={12} /> Track Package
                          </button>
                          <button onClick={() => toast.success('Invoice download requested.')} style={recentOrderActionBtnStyle}>
                            <FileText size={12} /> Get Invoice
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PROFILE */}
          {activeTab === 'profile' && (
            <div className="card" style={{ padding: '28px' }}>
              <h2 style={sectionTitleStyle}>Profile Information</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                {[
                  { label: 'Full Name', value: user.name },
                  { label: 'Email Address', value: user.email },
                  { label: 'Phone Number', value: user.phone || 'Not configured' },
                  { label: 'Account Type', value: user.role || 'Customer' },
                  { label: 'Edi Points Balance', value: `${ediPoints} points` },
                  { label: 'Wallet Balance', value: formatPrice(walletBalance) },
                ].map((f, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={fieldLabelStyle}>{f.label}</label>
                    <input type="text" className="input" value={f.value} disabled />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '20px', padding: '14px 16px', backgroundColor: '#fef3c7', border: '1px solid #fde68a', borderRadius: '12px' }}>
                <p style={{ fontSize: '12px', color: '#92400e', fontWeight: '600' }}>💡 To update your profile information, please contact EdiStore support or email us at support@edistore.in</p>
              </div>
            </div>
          )}

          {/* ORDERS */}
          {activeTab === 'orders' && (
            <div className="card" style={{ padding: '28px' }}>
              <h2 style={sectionTitleStyle}>My Orders</h2>
              <Link href="/orders" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#4285F4', color: '#ffffff', padding: '10px 20px', borderRadius: '10px', fontWeight: '700', fontSize: '13px', textDecoration: 'none' }}>
                <Package size={16} /> View All Orders
              </Link>
            </div>
          )}

          {/* ADDRESSES */}
          {activeTab === 'addresses' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="card" style={{ padding: '28px' }}>
                <h2 style={sectionTitleStyle}>Saved Addresses ({addresses.length})</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
                  {addresses.map((addr) => (
                    <div key={addr.id} style={addressCardStyle}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <span style={labelBadgeStyle}>{addr.label}</span>
                        {addr.isDefault && <span style={defaultBadgeStyle}>DEFAULT</span>}
                        <button onClick={() => handleDeleteAddress(addr.id)} style={{ marginLeft: 'auto', backgroundColor: 'transparent', color: '#94a3b8', cursor: 'pointer', border: 'none' }}><Trash2 size={15} /></button>
                      </div>
                      <p style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>{addr.name}</p>
                      <p style={{ fontSize: '12px', color: '#475569', lineHeight: '1.5' }}>{addr.line1}</p>
                      <p style={{ fontSize: '12px', color: '#475569' }}>{addr.city}, {addr.state} - {addr.pincode}</p>
                      <p style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>📞 {addr.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card" style={{ padding: '28px' }}>
                <h2 style={sectionTitleStyle}>Add New Address</h2>
                <form onSubmit={handleAddAddress} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                  <div style={fieldGroupStyle}><label style={fieldLabelStyle}>Label (e.g. Home, Office)</label><input type="text" className="input" value={label} onChange={e => setLabel(e.target.value)} required /></div>
                  <div style={fieldGroupStyle}><label style={fieldLabelStyle}>Receiver Name</label><input type="text" className="input" value={name} onChange={e => setName(e.target.value)} required /></div>
                  <div style={fieldGroupStyle}><label style={fieldLabelStyle}>Phone Number</label><input type="tel" className="input" value={phone} onChange={e => setPhone(e.target.value)} required /></div>
                  <div style={{ ...fieldGroupStyle, gridColumn: 'span 2' }}><label style={fieldLabelStyle}>Full Street Address</label><input type="text" className="input" value={line1} onChange={e => setLine1(e.target.value)} placeholder="House no, Building, Street..." required /></div>
                  <div style={fieldGroupStyle}><label style={fieldLabelStyle}>City</label><input type="text" className="input" value={city} onChange={e => setCity(e.target.value)} required /></div>
                  <div style={fieldGroupStyle}><label style={fieldLabelStyle}>State</label><input type="text" className="input" value={state} onChange={e => setState(e.target.value)} required /></div>
                  <div style={fieldGroupStyle}><label style={fieldLabelStyle}>Pincode</label><input type="text" className="input" value={pincode} onChange={e => setPincode(e.target.value)} required /></div>
                  <div style={{ gridColumn: 'span 2' }}><button type="submit" className="btn btn-primary" style={{ padding: '12px 24px', display: 'flex', gap: '8px', alignItems: 'center' }}><Plus size={16} />Save Address</button></div>
                </form>
              </div>
            </div>
          )}

          {/* EDI POINTS */}
          {activeTab === 'edipoints' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="card" style={{ padding: '28px', background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)', color: '#fff' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '900', fontFamily: "'Outfit', sans-serif", marginBottom: '8px' }}>⭐ Edi Rewards</h2>
                <div style={{ fontSize: '48px', fontWeight: '900', fontFamily: "'Outfit', sans-serif", marginBottom: '4px' }}>{ediPoints}</div>
                <p style={{ fontSize: '13px', opacity: 0.8 }}>Total Edi Points · Redeemable at checkout (1 pt = ₹1)</p>
                <div style={{ ...progressTrackStyle, backgroundColor: 'rgba(255,255,255,0.2)', marginTop: '16px' }}>
                  <div style={{ ...progressFillStyle, backgroundColor: '#FBBC04', width: `${progressPct}%` }}></div>
                </div>
                <p style={{ fontSize: '11px', opacity: 0.7, marginTop: '8px' }}>Need {NEXT_REWARD_TARGET - ediPoints} points to next milestone target reward</p>
              </div>
            </div>
          )}

          {/* COUPONS */}
          {activeTab === 'coupons' && (
            <div className="card" style={{ padding: '28px' }}>
              <h2 style={sectionTitleStyle}>🎁 My Coupons</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginTop: '16px' }}>
                {[
                  { code: 'SAVE20', desc: 'Flat ₹200 off on orders above ₹999', expiry: '31 Jul 2026', color: '#4285F4' },
                  { code: 'FIRST15', desc: '15% off on your first purchase', expiry: '31 Aug 2026', color: '#34A853' },
                  { code: 'ELEC30', desc: '30% off on all Electronics', expiry: '15 Jul 2026', color: '#EA4335' },
                ].map((coupon, i) => (
                  <div key={i} style={{ border: `2px dashed ${coupon.color}`, borderRadius: '14px', padding: '18px', backgroundColor: '#ffffff', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ fontSize: '18px', fontWeight: '900', fontFamily: "'Outfit', sans-serif", color: coupon.color, marginBottom: '6px', letterSpacing: '1px' }}>{coupon.code}</div>
                    <p style={{ fontSize: '13px', color: '#475569', marginBottom: '8px' }}>{coupon.desc}</p>
                    <p style={{ fontSize: '11px', color: '#94a3b8' }}>Expires: {coupon.expiry}</p>
                    <button
                      onClick={() => { navigator.clipboard?.writeText(coupon.code); toast.success(`Copied ${coupon.code}!`); }}
                      style={{ marginTop: '12px', backgroundColor: coupon.color, color: '#ffffff', border: 'none', borderRadius: '8px', padding: '7px 16px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                    >
                      Copy Code
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// STYLES
// ══════════════════════════════════════════════════════

const centerWrapperStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '80px 20px', textAlign: 'center' };
const wrapperStyle: React.CSSProperties = { paddingTop: '32px', paddingBottom: '80px', flex: 1 };
const layoutStyle: React.CSSProperties = { display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' };
const sidebarStyle: React.CSSProperties = { width: '260px', flexShrink: 0, position: 'sticky', top: '88px' };
const mainStyle: React.CSSProperties = { flex: 1, minWidth: '320px' };

const userBlockStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '12px', padding: '4px', marginBottom: '4px' };
const avatarStyle: React.CSSProperties = { width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #4285F4, #34A853)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '18px', flexShrink: 0 };
const userNameStyle: React.CSSProperties = { fontSize: '14px', fontWeight: '800', fontFamily: "'Outfit', sans-serif", color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' };
const userEmailStyle: React.CSSProperties = { fontSize: '11px', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' };
const pointsBadgeStyle: React.CSSProperties = { fontSize: '11px', fontWeight: '800', color: '#7c3aed', backgroundColor: '#ede9fe', padding: '2px 8px', borderRadius: '6px', marginTop: '4px', display: 'inline-block', width: 'fit-content' };
const dividerStyle: React.CSSProperties = { borderTop: '1px solid #f1f5f9', margin: '12px 0' };
const navBtnStyle = (active: boolean): React.CSSProperties => ({ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '10px 12px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', backgroundColor: active ? '#eff6ff' : 'transparent', color: active ? '#4285F4' : '#475569', cursor: 'pointer', border: 'none', textAlign: 'left', transition: 'background 0.15s' });
const navBadgeStyle: React.CSSProperties = { backgroundColor: '#4285F4', color: '#ffffff', fontSize: '10px', fontWeight: '800', borderRadius: '6px', padding: '1px 6px', marginLeft: 'auto' };

const sectionTitleStyle: React.CSSProperties = { fontSize: '18px', fontFamily: "'Outfit', sans-serif", fontWeight: '800', color: '#0f172a', marginBottom: '20px' };
const cardTitleStyle: React.CSSProperties = { fontSize: '16px', fontFamily: "'Outfit', sans-serif", fontWeight: '800', color: '#0f172a' };
const fieldLabelStyle: React.CSSProperties = { fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.4px' };
const fieldGroupStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '6px' };

const welcomeBannerStyle: React.CSSProperties = { padding: '24px 28px', background: 'linear-gradient(135deg, #1e3a8a, #4285F4)', borderRadius: '16px', border: 'none' };
const statsGridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px' };
const statCardStyle: React.CSSProperties = { padding: '20px', display: 'flex', flexDirection: 'column', border: '1px solid #f1f5f9' };

// Fitness Tracker Redesign Styles
const fitnessTrackerContainerStyle: React.CSSProperties = {
  backgroundColor: '#f8fafc',
  border: '1.5px solid #e2e8f0',
  borderRadius: '12px',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
};
const fitnessMetricsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
  gap: '12px'
};
const fitnessLabelStyle: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: '700',
  color: '#64748b',
  textTransform: 'uppercase'
};
const fitnessValueStyle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: '900',
  color: '#7c3aed',
  fontFamily: "'Outfit', sans-serif",
  marginTop: '2px'
};

const progressTrackStyle: React.CSSProperties = { width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' };
const progressFillStyle: React.CSSProperties = { height: '100%', backgroundColor: '#7c3aed', borderRadius: '4px', transition: 'width 0.8s ease' };
const viewAllBtnStyle: React.CSSProperties = { backgroundColor: 'transparent', border: 'none', fontSize: '13px', fontWeight: '700', color: '#4285F4', cursor: 'pointer' };

// Recent Orders with bottom action row
const recentOrderBlockStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  padding: '14px',
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  gap: '12px'
};
const recentOrderActionRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
  borderTop: '1px solid #e2e8f0',
  paddingTop: '10px'
};
const recentOrderActionBtnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  backgroundColor: '#ffffff',
  border: '1px solid #cbd5e1',
  borderRadius: '6px',
  padding: '4px 10px',
  fontSize: '11px',
  fontWeight: '700',
  color: '#475569',
  cursor: 'pointer',
  textDecoration: 'none'
};

const addressCardStyle: React.CSSProperties = { border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px' };
const labelBadgeStyle: React.CSSProperties = { backgroundColor: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: '5px', fontSize: '11px', fontWeight: '700' };
const defaultBadgeStyle: React.CSSProperties = { backgroundColor: '#d1fae5', color: '#059669', padding: '3px 8px', borderRadius: '5px', fontSize: '10px', fontWeight: '800' };
