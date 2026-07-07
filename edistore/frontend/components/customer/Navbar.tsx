'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCustomerStore } from '@/lib/store/customer';
import { ShoppingCart, Heart, Search, User, Menu, Bell, X, LogOut, Store } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function Navbar() {
  const router = useRouter();
  const { user, cart, cartCount, cartTotal, wishlist, setCartOpen, setAuthModalOpen, setUser } = useCustomerStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    setUser(null);
    router.push('/');
  };

  return (
    <header style={headerStyle}>
      <div className="container" style={navContainerStyle}>
        {/* Brand Logo */}
        <Link href="/" style={logoStyle}>
          <span style={{ color: '#EA4335' }}>E</span>
          <span style={{ color: '#FBBC04' }}>d</span>
          <span style={{ color: '#34A853' }}>i</span>
          <span style={{ color: '#4285F4' }}>Store</span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} style={searchFormStyle}>
          <div style={searchWrapperStyle}>
            <input
              type="text"
              placeholder="Search products, brands, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={searchInputStyle}
            />
            <button type="submit" style={searchButtonStyle}>
              <Search size={18} />
            </button>
          </div>
        </form>

        {/* Desktop Navigation Links */}
        <div style={desktopLinksStyle}>
          <Link href="/search?filter=stores" style={linkStyle}>
            <Store size={20} />
            <span>Stores</span>
          </Link>

          {user?.role === 'seller' && (
            <Link href="/seller/dashboard" style={sellerLinkStyle}>
              Dashboard
            </Link>
          )}

          {user?.role === 'admin' && (
            <Link href="/admin" style={adminLinkStyle}>
              Admin Panel
            </Link>
          )}

          {user ? (
            <div style={profileDropdownContainerStyle}>
              <button style={profileButtonStyle} onClick={() => router.push('/account')}>
                <User size={20} />
                <span>Hi, {user.name.split(' ')[0]}</span>
              </button>
            </div>
          ) : (
            <button onClick={() => router.push('/login')} style={loginButtonStyle}>
              <User size={20} />
              <span>Login</span>
            </button>
          )}

          <Link href="/account/wishlist" style={iconLinkStyle}>
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span style={badgeCountStyle}>{wishlist.length}</span>
            )}
          </Link>

          <button onClick={() => router.push('/cart')} style={cartButtonStyle}>
            <div style={{ position: 'relative' }}>
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span style={badgeCountStyle}>{cartCount}</span>
              )}
            </div>
            {cartTotal > 0 && (
              <span style={cartPriceStyle}>{formatPrice(cartTotal)}</span>
            )}
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <button style={mobileTriggerStyle} onClick={() => setMobileMenuOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Sidebar Navigation */}
      {mobileMenuOpen && (
        <div style={mobileOverlayStyle} onClick={() => setMobileMenuOpen(false)}>
          <div style={mobileMenuContentStyle} onClick={(e) => e.stopPropagation()}>
            <div style={mobileMenuHeaderStyle}>
              <Link href="/" style={logoStyle} onClick={() => setMobileMenuOpen(false)}>
                <span style={{ color: '#EA4335' }}>E</span>
                <span style={{ color: '#FBBC04' }}>d</span>
                <span style={{ color: '#34A853' }}>i</span>
                <span style={{ color: '#4285F4' }}>Store</span>
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} style={closeButtonStyle}>
                <X size={24} />
              </button>
            </div>

            <div style={mobileSearchWrapperStyle}>
              <form onSubmit={handleSearchSubmit} style={{ width: '100%' }}>
                <div style={searchWrapperStyle}>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={searchInputStyle}
                  />
                  <button type="submit" style={searchButtonStyle}>
                    <Search size={18} />
                  </button>
                </div>
              </form>
            </div>

            <div style={mobileNavLinksStyle}>
              <Link href="/search?filter=stores" style={mobileNavLinkStyle} onClick={() => setMobileMenuOpen(false)}>
                <Store size={20} />
                <span>Browse Stores</span>
              </Link>

              {user ? (
                <>
                  <Link href="/account" style={mobileNavLinkStyle} onClick={() => setMobileMenuOpen(false)}>
                    <User size={20} />
                    <span>My Account</span>
                  </Link>
                  <Link href="/orders" style={mobileNavLinkStyle} onClick={() => setMobileMenuOpen(false)}>
                    <span>My Orders</span>
                  </Link>
                  <Link href="/account/wishlist" style={mobileNavLinkStyle} onClick={() => setMobileMenuOpen(false)}>
                    <Heart size={20} />
                    <span>Wishlist ({wishlist.length})</span>
                  </Link>
                  {user.role === 'seller' && (
                    <Link href="/seller/dashboard" style={mobileNavLinkStyle} onClick={() => setMobileMenuOpen(false)}>
                      <span>Seller Dashboard</span>
                    </Link>
                  )}
                  <button onClick={handleLogout} style={mobileLogoutButtonStyle}>
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    router.push('/login');
                  }}
                  style={mobileLoginButtonStyle}
                >
                  <User size={20} />
                  <span>Login / Register</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// Inline Styles
const headerStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  color: '#1a1a2e',
  position: 'sticky',
  top: 0,
  zIndex: 100,
  borderBottom: '1px solid #e2e8f0',
  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
};

const navContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '72px',
  gap: '24px',
};

const logoStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  fontSize: '28px',
  fontWeight: '900',
  fontFamily: "'Outfit', sans-serif",
  letterSpacing: '-0.5px',
};

const logoTextMainStyle: React.CSSProperties = {
  color: '#4285F4',
};

const logoTextSubStyle: React.CSSProperties = {
  color: '#1a1a2e',
};

const searchFormStyle: React.CSSProperties = {
  flex: 1,
  maxWidth: '600px',
  display: 'block',
};

const searchWrapperStyle: React.CSSProperties = {
  display: 'flex',
  position: 'relative',
  borderRadius: '12px',
  overflow: 'hidden',
  backgroundColor: '#f8fafc',
  border: '2px solid #4285F4',
};

const searchInputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 16px',
  backgroundColor: 'transparent',
  color: '#1a1a2e',
  fontSize: '14px',
  outline: 'none',
  border: 'none',
};

const searchButtonStyle: React.CSSProperties = {
  backgroundColor: '#FBBC04',
  color: '#1a1a2e',
  padding: '0 18px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  fontWeight: '700',
};

const desktopLinksStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
};

const linkStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '14px',
  fontWeight: '600',
  color: '#4a5568',
  transition: 'color 0.2s',
};

const sellerLinkStyle: React.CSSProperties = {
  backgroundColor: '#E6F4EA',
  color: '#137333',
  padding: '6px 12px',
  borderRadius: '8px',
  fontSize: '13px',
  fontWeight: '600',
};

const adminLinkStyle: React.CSSProperties = {
  backgroundColor: '#FCE8E6',
  color: '#C5221F',
  padding: '6px 12px',
  borderRadius: '8px',
  fontSize: '13px',
  fontWeight: '600',
};

const profileDropdownContainerStyle: React.CSSProperties = {
  position: 'relative',
};

const profileButtonStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  color: '#1a1a2e',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
};

const loginButtonStyle: React.CSSProperties = {
  backgroundColor: '#4285F4',
  color: '#ffffff',
  padding: '8px 16px',
  borderRadius: '10px',
  fontWeight: '600',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
};

const iconLinkStyle: React.CSSProperties = {
  position: 'relative',
  color: '#4a5568',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const cartButtonStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  color: '#1a1a2e',
  padding: '8px 14px',
  borderRadius: '10px',
  fontWeight: '600',
  fontSize: '14px',
  cursor: 'pointer',
};

const cartPriceStyle: React.CSSProperties = {
  color: '#4285F4',
  borderLeft: '1px solid #e2e8f0',
  paddingLeft: '10px',
};

const badgeCountStyle: React.CSSProperties = {
  position: 'absolute',
  top: '-8px',
  right: '-8px',
  backgroundColor: '#ef4444',
  color: '#ffffff',
  fontSize: '10px',
  fontWeight: '700',
  borderRadius: '50%',
  width: '18px',
  height: '18px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const mobileTriggerStyle: React.CSSProperties = {
  display: 'none',
  backgroundColor: 'transparent',
  color: '#ffffff',
  cursor: 'pointer',
};

// Overlay & Mobile Sidebar
const mobileOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  zIndex: 1000,
};

const mobileMenuContentStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '280px',
  height: '100%',
  backgroundColor: '#ffffff',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  borderRight: '1px solid #e2e8f0',
  boxShadow: '4px 0 15px rgba(0,0,0,0.05)',
};

const mobileMenuHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const closeButtonStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  color: '#1a1a2e',
  cursor: 'pointer',
};

const mobileSearchWrapperStyle: React.CSSProperties = {
  margin: '10px 0',
};

const mobileNavLinksStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const mobileNavLinkStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  color: '#4a5568',
  fontSize: '16px',
  padding: '10px 0',
  fontWeight: '500',
};

const mobileLoginButtonStyle: React.CSSProperties = {
  backgroundColor: '#4285F4',
  color: '#ffffff',
  width: '100%',
  padding: '12px',
  borderRadius: '10px',
  fontWeight: '600',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  cursor: 'pointer',
  marginTop: '20px',
};

const mobileLogoutButtonStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  color: '#ef4444',
  border: '1px solid #ef4444',
  padding: '10px',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
  marginTop: 'auto',
};
