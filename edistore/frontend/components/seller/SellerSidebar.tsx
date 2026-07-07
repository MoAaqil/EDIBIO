'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  PackageOpen, 
  BarChart3, 
  MessageSquare, 
  CreditCard, 
  Settings, 
  Bell, 
  ArrowLeft 
} from 'lucide-react';

export default function SellerSidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/seller/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/seller/products', label: 'Products', icon: ShoppingBag },
    { href: '/seller/orders', label: 'Orders', icon: PackageOpen },
    { href: '/seller/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/seller/reviews', label: 'Reviews', icon: MessageSquare },
    { href: '/seller/payments', label: 'Payments', icon: CreditCard },
    { href: '/seller/notifications', label: 'Notifications', icon: Bell },
    { href: '/seller/store-settings', label: 'Store Settings', icon: Settings },
  ];

  return (
    <aside style={sidebarStyle}>
      <div style={brandStyle}>
        <span style={brandMainStyle}>Edi</span>
        <span style={brandSubStyle}>Seller</span>
      </div>

      <nav style={navStyle}>
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
          const Icon = link.icon;
          return (
            <Link 
              key={link.href} 
              href={link.href} 
              style={linkItemStyle(isActive)}
            >
              <Icon size={18} color={isActive ? '#ffffff' : '#94a3b8'} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div style={footerStyle}>
        <Link href="/" style={backToShopLinkStyle}>
          <ArrowLeft size={16} />
          <span>Back to Marketplace</span>
        </Link>
      </div>
    </aside>
  );
}

// Styles
const sidebarStyle: React.CSSProperties = {
  width: '260px',
  height: '100vh',
  backgroundColor: '#0f172a',
  color: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  left: 0,
  top: 0,
  borderRight: '1px solid #1e293b',
  zIndex: 10,
};

const brandStyle: React.CSSProperties = {
  height: '72px',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '24px',
  borderBottom: '1px solid #1e293b',
  fontFamily: "'Outfit', sans-serif",
  fontSize: '22px',
  fontWeight: '800',
  letterSpacing: '-0.5px',
};

const brandMainStyle: React.CSSProperties = {
  color: '#6366f1',
};

const brandSubStyle: React.CSSProperties = {
  color: '#ffffff',
};

const navStyle: React.CSSProperties = {
  flex: 1,
  padding: '24px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
};

const linkItemStyle = (active: boolean): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 16px',
  borderRadius: '10px',
  fontSize: '14px',
  fontWeight: '600',
  backgroundColor: active ? '#4f46e5' : 'transparent',
  color: active ? '#ffffff' : '#94a3b8',
  transition: 'all 0.2s',
  cursor: 'pointer',
});

const footerStyle: React.CSSProperties = {
  padding: '20px 16px',
  borderTop: '1px solid #1e293b',
};

const backToShopLinkStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  color: '#94a3b8',
  fontSize: '13px',
  fontWeight: '600',
  transition: 'color 0.2s',
};
