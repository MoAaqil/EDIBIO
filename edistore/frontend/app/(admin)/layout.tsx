'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCustomerStore } from '@/lib/store/customer';
import { ShieldCheck, LogOut, LayoutDashboard, UserCheck, ShoppingBag, User } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, setUser } = useCustomerStore();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // If user is not logged in or is not an admin, authorize them for mock display
    if (!user || user.role !== 'admin') {
      const mockAdmin = {
        uid: 'admin_007',
        email: 'admin@edistore.in',
        name: 'Super Admin',
        role: 'admin' as const,
        addresses: [],
        wishlist: [],
        createdAt: new Date().toISOString()
      };
      setUser(mockAdmin);
    }
    setChecking(false);
  }, [user, setUser]);

  if (checking) {
    return (
      <div style={loadingWrapperStyle}>
        <div className="spinner"></div>
        <p style={{ marginTop: '16px', color: '#64748b' }}>Authorizing Admin Console...</p>
      </div>
    );
  }

  return (
    <div style={layoutWrapperStyle}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <div style={brandStyle}>
          <ShieldCheck size={20} color="#10b981" />
          <span>EdiAdmin</span>
        </div>

        <nav style={navStyle}>
          <Link href="/admin" style={navLinkStyle}>
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/sellers" style={navLinkStyle}>
            <UserCheck size={16} />
            <span>Seller Requests</span>
          </Link>
          <Link href="/admin/profile" style={navLinkStyle}>
            <User size={16} />
            <span>Admin Profile</span>
          </Link>
        </nav>

        <button onClick={() => {
          setUser(null);
          router.push('/');
        }} style={logoutButtonStyle}>
          <LogOut size={16} />
          <span>Exit Admin</span>
        </button>
      </aside>

      {/* Main Viewport */}
      <div style={mainWrapperStyle}>
        <header style={headerStyle}>
          <h2>Platform Management System</h2>
          <span style={roleBadgeStyle}>Super User</span>
        </header>

        <main style={{ padding: '32px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}

// Styles
const loadingWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100vw',
  height: '100vh',
  backgroundColor: '#f8fafc',
};

const layoutWrapperStyle: React.CSSProperties = {
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: '#f8fafc',
};

const sidebarStyle: React.CSSProperties = {
  width: '240px',
  height: '100vh',
  backgroundColor: '#0f172a',
  color: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  left: 0,
  top: 0,
  borderRight: '1px solid #1e293b',
};

const brandStyle: React.CSSProperties = {
  height: '72px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  paddingLeft: '24px',
  borderBottom: '1px solid #1e293b',
  fontFamily: "'Outfit', sans-serif",
  fontSize: '20px',
  fontWeight: '800',
};

const navStyle: React.CSSProperties = {
  flex: 1,
  padding: '24px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
};

const navLinkStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 16px',
  borderRadius: '8px',
  fontSize: '13px',
  fontWeight: '600',
  color: '#cbd5e1',
};

const logoutButtonStyle: React.CSSProperties = {
  margin: '20px 16px',
  padding: '12px',
  backgroundColor: 'transparent',
  border: '1px solid #ef4444',
  color: '#ef4444',
  borderRadius: '8px',
  fontSize: '13px',
  fontWeight: '600',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  cursor: 'pointer',
};

const mainWrapperStyle: React.CSSProperties = {
  flex: 1,
  paddingLeft: '240px',
};

const headerStyle: React.CSSProperties = {
  height: '72px',
  backgroundColor: '#ffffff',
  borderBottom: '1px solid #e2e8f0',
  padding: '0 32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const roleBadgeStyle: React.CSSProperties = {
  backgroundColor: '#d1fae5',
  color: '#065f46',
  padding: '4px 10px',
  borderRadius: '6px',
  fontSize: '11px',
  fontWeight: '750',
};
