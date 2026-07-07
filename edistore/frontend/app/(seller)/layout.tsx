'use client';

import SellerSidebar from '@/components/seller/SellerSidebar';
import SellerTopbar from '@/components/seller/SellerTopbar';
import { useSellerStore } from '@/lib/store/seller';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, store, setUser, setStore } = useSellerStore();
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    // Check if seller is logged in
    async function verifyAuth() {
      // Avoid checking on public seller register/login pages
      if (pathname === '/seller/login' || pathname === '/seller/register') {
        setAuthChecking(false);
        return;
      }

      if (!user) {
        router.replace('/seller/login');
        return;
      }

      try {
        const res = await fetch(`/api/stores?sellerId=${user.uid}`);
        const stores = await res.json();
        if (stores && stores.length > 0) {
          setStore(stores[0]);
          
          const [prodRes, ordRes] = await Promise.all([
            fetch(`/api/products?sellerId=${user.uid}`).then(r => r.json()),
            fetch(`/api/orders?sellerId=${user.uid}`).then(r => r.json())
          ]);
          
          if (Array.isArray(prodRes)) useSellerStore.getState().setProducts(prodRes);
          if (Array.isArray(ordRes)) useSellerStore.getState().setOrders(ordRes);
        } else {
          toast.error('No store connected to this partner account.');
          router.replace('/seller/register');
          return;
        }
      } catch (err: any) {
        console.error('Error fetching seller store:', err);
      }
      setAuthChecking(false);
    }
    verifyAuth();
  }, [user, pathname, router, setUser, setStore]);

  if (authChecking) {
    return (
      <div style={loadingWrapperStyle}>
        <div className="spinner"></div>
        <p style={{ marginTop: '16px', color: '#64748b' }}>Authorizing seller dashboard...</p>
      </div>
    );
  }

  // If on login/register pages, do not render topbar/sidebar wrapper
  if (pathname === '/seller/login' || pathname === '/seller/register') {
    return <>{children}</>;
  }

  return (
    <div style={layoutWrapperStyle}>
      <SellerSidebar />
      <div style={mainContentWrapperStyle}>
        <SellerTopbar />
        <main style={viewportStyle}>
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

const mainContentWrapperStyle: React.CSSProperties = {
  flex: 1,
  paddingLeft: '260px', // matches sidebar width
  display: 'flex',
  flexDirection: 'column',
};

const viewportStyle: React.CSSProperties = {
  flex: 1,
  padding: '104px 32px 32px 32px', // Top padding accounts for topbar (72px + 32px)
};
