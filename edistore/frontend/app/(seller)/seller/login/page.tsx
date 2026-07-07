'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSellerStore } from '@/lib/store/seller';
import { Mail, Lock, ArrowRight, Store } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { auth, googleProvider, signInWithPopup } from '@/lib/firebase';

export default function SellerLoginPage() {
  const router = useRouter();
  const { setUser, setStore } = useSellerStore();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleLogin = async () => {
    setLoading(true);
    const toastId = toast.loading('Connecting Google account...');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const res = await fetch('/api/seller/login/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: user.displayName || 'Google Seller',
          photoUrl: user.photoURL || '',
        })
      });
      
      const data = await res.json();
      if (res.ok) {
        setUser({
          uid: data.user._id,
          email: data.user.email,
          name: data.user.name,
          role: 'seller',
          addresses: data.user.addresses || [],
          wishlist: data.user.wishlist || [],
          createdAt: data.user.createdAt,
        });
        setStore(data.store);
        toast.success('Signed in successfully with Google!', { id: toastId });
        router.push('/seller/dashboard');
      } else {
        toast.error(data.error || 'Google Login failed', { id: toastId });
      }
    } catch (err: any) {
      toast.error('Google Auth Error: ' + err.message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Signing into partner dashboard...');

    try {
      const res = await fetch('/api/seller/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser({
          uid: data.user._id,
          email: data.user.email,
          name: data.user.name,
          role: 'seller',
          addresses: data.user.addresses || [],
          wishlist: data.user.wishlist || [],
          createdAt: data.user.createdAt,
        });
        setStore(data.store);
        toast.success('Signed in successfully!', { id: toastId });
        router.push('/seller/dashboard');
      } else {
        toast.error(data.error || 'Authentication failed', { id: toastId });
      }
    } catch (err: any) {
      toast.error('Network error: ' + err.message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <div style={iconWrapperStyle}>
            <Store size={24} color="#6366f1" />
          </div>
          <h1 style={titleStyle}>Partner Console</h1>
          <p style={subTitleStyle}>Access your store inventory listings, payouts settlements and customer orders ledger.</p>
        </div>

        <form onSubmit={handleLogin} style={formStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Partner Email Address</label>
            <div style={fieldWrapperStyle}>
              <Mail size={16} color="#64748b" style={inputIconStyle} />
              <input 
                type="email" 
                className="input" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="partner@example.com" 
                style={fieldStyle}
                required 
              />
            </div>
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Access Password</label>
            <div style={fieldWrapperStyle}>
              <Lock size={16} color="#64748b" style={inputIconStyle} />
              <input 
                type="password" 
                className="input" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="••••••••" 
                style={fieldStyle}
                required 
              />
            </div>
          </div>

          <button type="submit" disabled={loading} style={submitButtonStyle}>
            <span>Sign In to Dashboard</span>
            <ArrowRight size={18} />
          </button>

          <div style={footerDividerStyle}>
            <span style={dividerTextStyle}>OR</span>
          </div>

          <button 
            type="button" 
            disabled={loading} 
            onClick={handleGoogleLogin} 
            style={googleButtonStyle}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ width: '18px', height: '18px', marginRight: '10px' }}>
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.5 24c0-1.63-.15-3.2-.43-4.72H24v9h12.75c-.55 2.92-2.2 5.4-4.67 7.07l7.23 5.61C43.56 36.56 46.5 30.77 46.5 24z"/>
              <path fill="#FBBC05" d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.98-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.23-5.61c-2.11 1.42-4.8 2.27-8.66 2.27-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            <span>Continue with Google</span>
          </button>
        </form>

        <div style={footerStyle}>
          <p style={footerTextStyle}>
            Don't have a retail store connected yet? 
            <Link href="/seller/register" style={registerLinkStyle}>Request store approval</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// Styles
const containerStyle: React.CSSProperties = {
  width: '100vw',
  height: '100vh',
  backgroundColor: '#0f172a',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
};

const cardStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '440px',
  backgroundColor: '#ffffff',
  borderRadius: '24px',
  padding: '40px',
  boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)',
};

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '32px',
};

const iconWrapperStyle: React.CSSProperties = {
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  backgroundColor: '#f5f3ff',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '16px',
};

const titleStyle: React.CSSProperties = {
  fontSize: '24px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: '800',
  color: '#0f172a',
  marginBottom: '6px',
};

const subTitleStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#64748b',
  lineHeight: '1.4',
};

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const inputGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
};

const labelStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: '700',
  color: '#334155',
  fontFamily: "'Outfit', sans-serif",
};

const fieldWrapperStyle: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
};

const inputIconStyle: React.CSSProperties = {
  position: 'absolute',
  left: '14px',
};

const fieldStyle: React.CSSProperties = {
  paddingLeft: '40px',
};

const submitButtonStyle: React.CSSProperties = {
  backgroundColor: '#4f46e5',
  color: '#ffffff',
  padding: '12px',
  borderRadius: '12px',
  fontWeight: '700',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  cursor: 'pointer',
  marginTop: '10px',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginTop: '24px',
  borderTop: '1px solid #e2e8f0',
  paddingTop: '20px',
};

const footerTextStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#64748b',
  lineHeight: '1.4',
};

const registerLinkStyle: React.CSSProperties = {
  color: '#4f46e5',
  fontWeight: '700',
  marginLeft: '6px',
};

const footerDividerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '10px 0',
  borderBottom: '1px solid #e2e8f0',
  height: '10px',
  marginBottom: '20px',
};

const dividerTextStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '0 10px',
  color: '#94a3b8',
  fontSize: '11px',
  fontWeight: '700',
  zIndex: 1,
};

const googleButtonStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  color: '#334155',
  border: '1.5px solid #e2e8f0',
  padding: '12px',
  borderRadius: '12px',
  fontWeight: '600',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'background-color 0.2s, border-color 0.2s',
  width: '100%',
};
