'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCustomerStore } from '@/lib/store/customer';
import { ShoppingCart, Heart, Search, User, Menu, Bell, X, LogOut, Store, Mic, Camera, Package, Star, ChevronDown, ArrowRight, Zap } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';

// Mock notifications
const MOCK_NOTIFICATIONS = [
  { id: 1, icon: '📦', title: 'Your order EDI-2026-94812 has been packed', time: '2 hours ago', read: false },
  { id: 2, icon: '🚚', title: 'Shipped! Arriving Tomorrow by 8 PM', time: '5 hours ago', read: false },
  { id: 3, icon: '⭐', title: 'You earned 50 Edi Points on your last order', time: '1 day ago', read: true },
];

export default function Navbar() {
  const router = useRouter();
  const { user, cart, cartCount, cartTotal, wishlist, setUser } = useCustomerStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Autocomplete & voice
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [listening, setListening] = useState(false);

  // Dropdown panels
  const [accountOpen, setAccountOpen] = useState(false);
  const [cartHover, setCartHover] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const accountRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) setAccountOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSuggestionsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Debounced search suggestions
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (val.trim().length > 1) {
      debounceRef.current = setTimeout(() => {
        fetch(`/api/products/suggestions?q=${encodeURIComponent(val.trim())}`)
          .then(res => res.json())
          .then(data => { if (Array.isArray(data)) { setSuggestions(data); setSuggestionsOpen(true); } })
          .catch(console.error);
      }, 250);
    } else {
      setSuggestions([]);
      setSuggestionsOpen(false);
    }
  };

  const startVoiceRecognition = () => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) { toast.error('Voice search not supported in your browser.'); return; }
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US'; recognition.interimResults = false; recognition.maxAlternatives = 1;
      recognition.onstart = () => { setListening(true); toast.success('Listening...'); };
      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setSearchQuery(text); setListening(false);
        router.push(`/search?q=${encodeURIComponent(text.trim())}`);
      };
      recognition.onerror = () => { setListening(false); toast.error('Voice recognition error.'); };
      recognition.onend = () => setListening(false);
      recognition.start();
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) { setSuggestionsOpen(false); router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`); }
  };

  const handleLogout = () => { setUser(null); setAccountOpen(false); toast.success('Logged out successfully'); router.push('/'); };
  const markAllRead = () => setNotifications(n => n.map(x => ({ ...x, read: true })));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* ── Option 2: Sleek Blue Announcement Bar ── */}
      <div style={announcementBarStyle}>
        <span>🚚 Free Delivery above ₹499 &nbsp;•&nbsp; ⭐ Earn Double Edi Points this Weekend &nbsp;•&nbsp; 🎁 New User gets ₹100 Coupon</span>
      </div>

      <header style={headerStyle}>
        <div className="container" style={navContainerStyle}>

          {/* ── Logo ── */}
          <Link href="/" style={logoStyle}>
            <span style={{ color: '#EA4335' }}>E</span>
            <span style={{ color: '#FBBC04' }}>d</span>
            <span style={{ color: '#34A853' }}>i</span>
            <span style={{ color: '#4285F4' }}>Store</span>
          </Link>

          {/* ── Search Bar ── */}
          <div ref={searchRef} style={{ position: 'relative', flex: 1, maxWidth: '580px' }}>
            <form onSubmit={handleSearchSubmit} style={searchFormStyle}>
              <div style={searchWrapperStyle}>
                <input
                  type="text"
                  placeholder="Search products, brands, categories..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => suggestions.length > 0 && setSuggestionsOpen(true)}
                  style={searchInputStyle}
                />
                <button type="button" onClick={startVoiceRecognition} style={listening ? listeningMicStyle : micButtonStyle} title="Voice Search">
                  <Mic size={16} />
                </button>
                {/* 📷 Image Search */}
                <button type="button" onClick={() => toast.success('Image Search: Upload or drag a photo (Feature coming soon!)', { icon: '📷' })} style={micButtonStyle} title="Image Search">
                  <Camera size={16} />
                </button>
                <button type="submit" style={searchButtonStyle}><Search size={17} /></button>
              </div>
            </form>

            {/* Suggestions dropdown */}
            {suggestionsOpen && suggestions.length > 0 && (
              <div style={suggestionsDropdownStyle}>
                {suggestions.map((item, idx) => (
                  <div key={idx} onClick={() => { setSearchQuery(item.name); setSuggestionsOpen(false); router.push(`/search?q=${encodeURIComponent(item.name)}`); }} style={suggestionItemStyle}>
                    <Search size={13} color="#94a3b8" />
                    <span style={{ fontSize: '13px' }}>{item.name}</span>
                    <span style={suggestionCategoryStyle}>{item.category}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Desktop Nav Links (Richer density matching Amazon review) ── */}
          <div style={desktopLinksStyle}>

            {/* 1. Stores */}
            <Link href="/search?filter=stores" style={navLinkStyle}>
              <span>Stores</span>
            </Link>

            {/* 2. Orders */}
            {user && (
              <Link href="/orders" style={navLinkStyle}>
                <span>Orders</span>
              </Link>
            )}

            {/* 3. ❤️ Wishlist */}
            <Link href="/account/wishlist" style={{ ...navLinkStyle, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>❤️ Wishlist</span>
              {wishlist.length > 0 && <span style={textCountBadgeStyle}>{wishlist.length}</span>}
            </Link>

            {/* 4. 🛒 Cart */}
            <div
              ref={cartRef}
              style={{ position: 'relative' }}
              onMouseEnter={() => setCartHover(true)}
              onMouseLeave={() => setCartHover(false)}
            >
              <button onClick={() => router.push('/cart')} style={{ ...navLinkStyle, background: 'none', border: 'none', cursor: 'pointer', outline: 'none', display: 'flex', alignItems: 'center', gap: '4px', padding: 0 }}>
                <span>🛒 Cart</span>
                <span style={textCountBadgeStyle}>{cartCount}</span>
              </button>

              {/* Mini Cart popup */}
              {cartHover && cart.length > 0 && (
                <div style={miniCartStyle}>
                  <div style={dropdownHeaderStyle}>
                    <span style={dropdownTitleStyle}>My Cart ({cartCount})</span>
                  </div>
                  <div style={{ maxHeight: '220px', overflowY: 'auto' }}>
                    {cart.slice(0, 4).map((item, i) => (
                      <div key={i} style={miniCartItemStyle}>
                        <span style={{ fontSize: '22px' }}>{item.image}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: '12px', fontWeight: '600', color: '#1e293b', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{item.name}</p>
                          <p style={{ fontSize: '11px', color: '#64748b' }}>Qty: {item.qty} · {formatPrice(item.price)}</p>
                        </div>
                      </div>
                    ))}
                    {cart.length > 4 && <p style={{ fontSize: '11px', color: '#94a3b8', padding: '8px 16px' }}>+{cart.length - 4} more items</p>}
                  </div>
                  <div style={{ borderTop: '1px solid #f1f5f9', padding: '12px 16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13px', fontWeight: '700' }}>
                      <span>Subtotal</span><span>{formatPrice(cartTotal)}</span>
                    </div>
                    <Link href="/checkout" style={miniCartCheckoutBtn}>Proceed to Checkout →</Link>
                  </div>
                </div>
              )}
            </div>

            {/* 5. 🔔 Notifications */}
            {user && (
              <div ref={notifRef} style={{ position: 'relative' }}>
                <button onClick={() => setNotifOpen(!notifOpen)} style={{ ...navLinkStyle, background: 'none', border: 'none', cursor: 'pointer', outline: 'none', display: 'flex', alignItems: 'center', gap: '4px', padding: 0 }}>
                  <span>🔔 Notifications</span>
                  {unreadCount > 0 && <span style={textCountBadgeStyle}>{unreadCount}</span>}
                </button>

                {notifOpen && (
                  <div style={dropdownStyle(320)}>
                    <div style={dropdownHeaderStyle}>
                      <span style={dropdownTitleStyle}>Notifications</span>
                      <button onClick={markAllRead} style={markReadBtnStyle}>Mark all read</button>
                    </div>
                    {notifications.map(n => (
                      <div key={n.id} style={{ ...notifItemStyle, backgroundColor: n.read ? 'transparent' : '#f0f9ff' }}>
                        <span style={{ fontSize: '20px', flexShrink: 0 }}>{n.icon}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: '12px', fontWeight: n.read ? '400' : '600', color: '#1e293b', lineHeight: '1.4', marginBottom: '2px' }}>{n.title}</p>
                          <p style={{ fontSize: '10px', color: '#94a3b8' }}>{n.time}</p>
                        </div>
                        {!n.read && <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4285F4', flexShrink: 0 }}></span>}
                      </div>
                    ))}
                    <Link href="/account?tab=notifications" onClick={() => setNotifOpen(false)} style={dropdownFooterLinkStyle}>View all notifications →</Link>
                  </div>
                )}
              </div>
            )}

            {/* 6. Profile Dropdown: Hello, Mohamed ▼ */}
            {user ? (
              <div ref={accountRef} style={{ position: 'relative' }}>
                <button onClick={() => setAccountOpen(!accountOpen)} style={accountButtonStyle}>
                  <div style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>Hello, {user.name?.split(' ')[0]}</span>
                    <ChevronDown size={14} color="#64748b" style={{ transform: accountOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                  </div>
                </button>

                {accountOpen && (
                  <div style={dropdownStyle(220)}>
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', backgroundColor: '#f8fafc' }}>
                      <p style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>{user.name}</p>
                      <p style={{ fontSize: '11px', color: '#64748b' }}>{user.email}</p>
                    </div>
                    {[
                      { href: '/account?tab=profile', icon: <User size={14} />, label: 'My Profile' },
                      { href: '/orders', icon: <Package size={14} />, label: 'My Orders' },
                      { href: '/account/wishlist', icon: <Heart size={14} />, label: 'Wishlist' },
                      { href: '/account?tab=edipoints', icon: <Star size={14} />, label: 'Edi Points' },
                      { href: '/account?tab=coupons', icon: <Zap size={14} />, label: 'Coupons' },
                      { href: '/account?tab=addresses', icon: <MapPinIcon size={14} />, label: 'Addresses' },
                      { href: '/account?tab=settings', icon: <SettingsIcon size={14} />, label: 'Payments' },
                      ...(user.role === 'seller' ? [{ href: '/seller/dashboard', icon: <Store size={14} />, label: 'Seller Dashboard' }] : []),
                      ...(user.role === 'admin' ? [{ href: '/admin', icon: <SettingsIcon size={14} />, label: 'Admin Panel' }] : []),
                    ].map(item => (
                      <Link key={item.label} href={item.href} onClick={() => setAccountOpen(false)} style={accountDropdownItemStyle}>
                        {item.icon}<span>{item.label}</span>
                      </Link>
                    ))}
                    <div style={{ borderTop: '1px solid #f1f5f9' }}>
                      <button onClick={handleLogout} style={{ ...accountDropdownItemStyle, width: '100%', color: '#ef4444' }}>
                        <LogOut size={14} /><span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => router.push('/login')} style={loginButtonStyle}>
                <User size={18} /><span>Login</span>
              </button>
            )}
          </div>

          {/* Mobile hamburger */}
          <button style={mobileTriggerStyle} onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>

        {/* ── Mobile Sidebar ── */}
        {mobileMenuOpen && (
          <div style={mobileOverlayStyle} onClick={() => setMobileMenuOpen(false)}>
            <div style={mobileMenuContentStyle} onClick={e => e.stopPropagation()}>
              <div style={mobileMenuHeaderStyle}>
                <Link href="/" style={logoStyle} onClick={() => setMobileMenuOpen(false)}>
                  <span style={{ color: '#EA4335' }}>E</span><span style={{ color: '#FBBC04' }}>d</span><span style={{ color: '#34A853' }}>i</span><span style={{ color: '#4285F4' }}>Store</span>
                </Link>
                <button onClick={() => setMobileMenuOpen(false)} style={{ backgroundColor: 'transparent', cursor: 'pointer', color: '#64748b', border: 'none' }}><X size={22} /></button>
              </div>

              {user && (
                <div style={mobileUserBlockStyle}>
                  <div style={avatarStyle}>{user.name?.charAt(0).toUpperCase()}</div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{user.name}</p>
                    <p style={{ fontSize: '11px', color: '#64748b' }}>{user.email}</p>
                  </div>
                </div>
              )}

              <form onSubmit={e => { handleSearchSubmit(e); setMobileMenuOpen(false); }} style={{ marginBottom: '8px' }}>
                <div style={searchWrapperStyle}>
                  <input type="text" placeholder="Search..." value={searchQuery} onChange={e => handleSearchChange(e.target.value)} style={searchInputStyle} />
                  <button type="submit" style={searchButtonStyle}><Search size={16} /></button>
                </div>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {[
                  { href: '/search?filter=stores', label: '🏪 Browse Stores' },
                  ...(user ? [
                    { href: '/account?tab=profile', label: '👤 My Profile' },
                    { href: '/orders', label: '📦 My Orders' },
                    { href: '/account/wishlist', label: `❤️ Wishlist (${wishlist.length})` },
                    { href: '/cart', label: `🛒 Cart (${cartCount})` },
                  ] : []),
                  ...(user?.role === 'seller' ? [{ href: '/seller/dashboard', label: '🏪 Seller Dashboard' }] : []),
                  ...(user?.role === 'admin' ? [{ href: '/admin', label: '⚙️ Admin Panel' }] : []),
                ].map(item => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>{item.label}</Link>
                ))}

                {user ? (
                  <button onClick={handleLogout} style={mobileLogoutStyle}>🚪 Logout</button>
                ) : (
                  <button onClick={() => { setMobileMenuOpen(false); router.push('/login'); }} style={mobileLoginStyle}>Login / Register</button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

// ── Custom minimal mock icons to avoid import errors ──
function MapPinIcon(props: any) { return <span style={{ fontSize: '14px' }}>📍</span>; }
function SettingsIcon(props: any) { return <span style={{ fontSize: '14px' }}>⚙️</span>; }

// ══════════════════════════════════════════════════════
// STYLES
// ══════════════════════════════════════════════════════

const announcementBarStyle: React.CSSProperties = {
  backgroundColor: '#4285F4',
  color: '#ffffff',
  fontSize: '12px',
  fontWeight: '700',
  padding: '8px 16px',
  textAlign: 'center',
  letterSpacing: '0.4px',
  fontFamily: "'Inter', sans-serif"
};

const headerStyle: React.CSSProperties = { backgroundColor: '#ffffff', position: 'sticky', top: 0, zIndex: 200, borderBottom: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };
const navContainerStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px', gap: '20px' };
const logoStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', fontSize: '26px', fontWeight: '900', fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.5px', textDecoration: 'none', flexShrink: 0 };

const searchFormStyle: React.CSSProperties = { width: '100%' };
const searchWrapperStyle: React.CSSProperties = { display: 'flex', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#f8fafc', border: '2px solid #4285F4' };
const searchInputStyle: React.CSSProperties = { flex: 1, padding: '10px 14px', backgroundColor: 'transparent', fontSize: '13px', outline: 'none', border: 'none', color: '#1a1a2e' };
const micButtonStyle: React.CSSProperties = { backgroundColor: 'transparent', color: '#64748b', padding: '0 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', border: 'none' };
const listeningMicStyle: React.CSSProperties = { backgroundColor: '#fee2e2', color: '#ef4444', padding: '0 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', border: 'none' };
const searchButtonStyle: React.CSSProperties = { backgroundColor: '#FBBC04', color: '#1a1a2e', padding: '0 16px', cursor: 'pointer', fontWeight: '700', display: 'flex', alignItems: 'center', border: 'none' };

const suggestionsDropdownStyle: React.CSSProperties = { position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', zIndex: 1000, marginTop: '6px', overflow: 'hidden' };
const suggestionItemStyle: React.CSSProperties = { padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', borderBottom: '1px solid #f8fafc', transition: 'background 0.15s' };
const suggestionCategoryStyle: React.CSSProperties = { marginLeft: 'auto', fontSize: '10px', color: '#6366f1', backgroundColor: '#e0e7ff', padding: '2px 7px', borderRadius: '5px', fontWeight: '700', textTransform: 'capitalize' };

const desktopLinksStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '22px', flexShrink: 0 };
const navLinkStyle: React.CSSProperties = { fontSize: '13px', fontWeight: '700', color: '#334155', textDecoration: 'none', transition: 'color 0.2s', fontFamily: "'Inter', sans-serif" };
const sellerBadgeStyle: React.CSSProperties = { backgroundColor: '#E6F4EA', color: '#137333', padding: '5px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', textDecoration: 'none' };
const adminBadgeStyle: React.CSSProperties = { backgroundColor: '#FCE8E6', color: '#C5221F', padding: '5px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', textDecoration: 'none' };

const iconButtonStyle: React.CSSProperties = { backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: '#4a5568', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '4px' };
const badgeStyle: React.CSSProperties = { position: 'absolute', top: '-6px', right: '-6px', backgroundColor: '#ef4444', color: '#ffffff', fontSize: '9px', fontWeight: '800', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' };

const textCountBadgeStyle: React.CSSProperties = { backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', color: '#2563eb', padding: '1px 6px', borderRadius: '12px', fontSize: '11px', fontWeight: '800' };

const accountButtonStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', padding: '6px 10px', borderRadius: '10px', transition: 'background 0.2s' };
const avatarStyle: React.CSSProperties = { width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #4285F4, #34A853)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '13px', flexShrink: 0 };
const loginButtonStyle: React.CSSProperties = { backgroundColor: '#4285F4', color: '#ffffff', padding: '8px 16px', borderRadius: '10px', fontWeight: '600', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', border: 'none' };

// Dropdown panels
const dropdownStyle = (width: number): React.CSSProperties => ({ position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: `${width}px`, backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.12)', zIndex: 500, overflow: 'hidden' });
const dropdownHeaderStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #f1f5f9' };
const dropdownTitleStyle: React.CSSProperties = { fontSize: '13px', fontWeight: '800', color: '#0f172a', fontFamily: "'Outfit', sans-serif" };
const markReadBtnStyle: React.CSSProperties = { fontSize: '11px', color: '#4285F4', fontWeight: '600', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' };
const notifItemStyle: React.CSSProperties = { display: 'flex', gap: '10px', padding: '10px 16px', alignItems: 'flex-start', borderBottom: '1px solid #f8fafc', cursor: 'pointer', transition: 'background 0.15s' };
const dropdownFooterLinkStyle: React.CSSProperties = { display: 'block', padding: '10px 16px', fontSize: '12px', fontWeight: '700', color: '#4285F4', textDecoration: 'none', textAlign: 'center' };
const accountDropdownItemStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', fontSize: '13px', fontWeight: '500', color: '#334155', textDecoration: 'none', cursor: 'pointer', backgroundColor: 'transparent', border: 'none', width: '100%', transition: 'background 0.15s' };

// Mini Cart
const miniCartStyle: React.CSSProperties = { position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: '320px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.12)', zIndex: 500, overflow: 'hidden' };
const miniCartItemStyle: React.CSSProperties = { display: 'flex', gap: '10px', padding: '10px 16px', alignItems: 'center', borderBottom: '1px solid #f8fafc' };
const miniCartCheckoutBtn: React.CSSProperties = { display: 'block', backgroundColor: '#4285F4', color: '#ffffff', padding: '10px', borderRadius: '10px', textAlign: 'center', fontSize: '13px', fontWeight: '700', textDecoration: 'none' };

// Mobile
const mobileTriggerStyle: React.CSSProperties = { display: 'none', backgroundColor: 'transparent', color: '#1a1a2e', cursor: 'pointer', border: 'none' };
const mobileOverlayStyle: React.CSSProperties = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000 };
const mobileMenuContentStyle: React.CSSProperties = { position: 'absolute', top: 0, left: 0, width: '290px', height: '100%', backgroundColor: '#ffffff', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' };
const mobileMenuHeaderStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between' };
const mobileUserBlockStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '12px' };
const mobileNavLinkStyle: React.CSSProperties = { display: 'block', padding: '12px 14px', fontSize: '14px', fontWeight: '600', color: '#334155', textDecoration: 'none', borderRadius: '10px', backgroundColor: 'transparent', transition: 'background 0.15s' };
const mobileLoginStyle: React.CSSProperties = { backgroundColor: '#4285F4', color: '#ffffff', width: '100%', padding: '12px', borderRadius: '10px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', border: 'none', marginTop: '8px' };
const mobileLogoutStyle: React.CSSProperties = { backgroundColor: 'transparent', color: '#ef4444', border: '1.5px solid #ef4444', width: '100%', padding: '11px', borderRadius: '10px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', marginTop: '8px' };
