'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCustomerStore } from '@/lib/store/customer';
import { Mail, Lock, User, ShieldAlert, ArrowRight, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { auth, googleProvider, signInWithPopup } from '@/lib/firebase';

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useCustomerStore();
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (isRegister && (!name || !phone))) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    const toastId = toast.loading(isRegister ? 'Creating account...' : 'Signing in...');

    try {
      const url = isRegister ? '/api/auth/register' : '/api/auth/login';
      const body = isRegister ? { name, email, password, phone } : { email, password };
      
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok) {
        setUser({
          uid: data._id,
          email: data.email,
          name: data.name,
          phone: data.phone || '9876543210',
          role: data.role || 'customer',
          addresses: data.addresses || [],
          wishlist: data.wishlist || [],
          createdAt: data.createdAt,
        });
        toast.success(isRegister ? 'Welcome to EdiStore!' : 'Signed in successfully!', { id: toastId });
        router.push('/');
      } else {
        toast.error(data.error || 'Authentication failed', { id: toastId });
      }
    } catch (err: any) {
      toast.error('Network error: ' + err.message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const toastId = toast.loading('Connecting Google account...');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: user.displayName || 'Google User',
          photoUrl: user.photoURL || '',
        })
      });
      
      const data = await res.json();
      if (res.ok) {
        setUser({
          uid: data._id,
          email: data.email,
          name: data.name,
          phone: data.phone || '9876543210',
          role: data.role || 'customer',
          addresses: data.addresses || [],
          wishlist: data.wishlist || [],
          createdAt: data.createdAt,
        });
        toast.success('Signed in successfully with Google!', { id: toastId });
        router.push('/');
      } else {
        toast.error(data.error || 'Google Authentication failed', { id: toastId });
      }
    } catch (err: any) {
      toast.error('Google Auth Error: ' + err.message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={loginWrapperStyle}>
      <div style={loginCardStyle}>
        <div style={loginHeaderStyle}>
          <h1 style={loginTitleStyle}>{isRegister ? 'Create Account' : 'Welcome Back'}</h1>
          <p style={loginSubTitleStyle}>
            {isRegister 
              ? 'Join EdiStore to start purchasing from neighborhood shops.' 
              : 'Sign in to access your orders, cart, and profile.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={formStyle}>
          {isRegister && (
            <>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Full Name</label>
                <div style={inputWrapperStyle}>
                  <User size={18} color="#64748b" style={inputIconStyle} />
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={inputStyle}
                    required
                  />
                </div>
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Phone Number</label>
                <div style={inputWrapperStyle}>
                  <span style={phonePrefixStyle}>+91</span>
                  <input
                    type="tel"
                    placeholder="10-digit number"
                    pattern="[0-9]{10}"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={inputPhoneStyle}
                    required
                  />
                </div>
              </div>
            </>
          )}

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Email Address</label>
            <div style={inputWrapperStyle}>
              <Mail size={18} color="#64748b" style={inputIconStyle} />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                required
              />
            </div>
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Password</label>
            <div style={inputWrapperStyle}>
              <Lock size={18} color="#64748b" style={inputIconStyle} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                style={passwordToggleButtonStyle}
              >
                {showPassword ? <EyeOff size={18} color="#64748b" /> : <Eye size={18} color="#64748b" />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} style={submitButtonStyle}>
            {loading ? 'Processing...' : isRegister ? 'Register' : 'Login'}
            <ArrowRight size={18} />
          </button>
        </form>

        <div style={footerDividerStyle}>
          <span style={dividerTextStyle}>OR</span>
        </div>

        <button 
          type="button" 
          disabled={loading} 
          onClick={handleGoogleSignIn} 
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

        <div style={toggleModeSectionStyle}>
          <p style={toggleTextStyle}>
            {isRegister ? 'Already have an account?' : "Don't have an account?"}
            <button 
              onClick={() => {
                setIsRegister(!isRegister);
                setErrorState(null);
              }} 
              style={toggleButtonStyle}
            >
              {isRegister ? 'Login here' : 'Register here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper to keep page mock compiled
function setErrorState(val: any) {}

// Inline styles
const loginWrapperStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 20px',
  backgroundColor: '#f8fafc',
};

const loginCardStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '450px',
  backgroundColor: '#ffffff',
  borderRadius: '24px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
  padding: '40px',
};

const loginHeaderStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '32px',
};

const loginTitleStyle: React.CSSProperties = {
  fontSize: '28px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: '800',
  color: '#0f172a',
  marginBottom: '8px',
};

const loginSubTitleStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#64748b',
  lineHeight: '1.5',
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
  fontSize: '13px',
  fontWeight: '600',
  color: '#1e293b',
  fontFamily: "'Outfit', sans-serif",
};

const inputWrapperStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  backgroundColor: '#f8fafc',
  transition: 'border-color 0.2s',
};

const inputIconStyle: React.CSSProperties = {
  position: 'absolute',
  left: '14px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px 12px 42px',
  backgroundColor: 'transparent',
  fontSize: '14px',
  outline: 'none',
  border: 'none',
};

const phonePrefixStyle: React.CSSProperties = {
  padding: '12px 0 12px 14px',
  fontSize: '14px',
  fontWeight: '600',
  color: '#475569',
  borderRight: '1px solid #e2e8f0',
  marginRight: '10px',
};

const inputPhoneStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 0',
  backgroundColor: 'transparent',
  fontSize: '14px',
  outline: 'none',
  border: 'none',
  letterSpacing: '1px',
};

const passwordToggleButtonStyle: React.CSSProperties = {
  position: 'absolute',
  right: '14px',
  backgroundColor: 'transparent',
  cursor: 'pointer',
};

const submitButtonStyle: React.CSSProperties = {
  backgroundColor: '#4f46e5',
  color: '#ffffff',
  padding: '14px',
  borderRadius: '12px',
  fontWeight: '600',
  fontSize: '15px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  marginTop: '10px',
};

const footerDividerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '24px 0',
  position: 'relative',
  borderBottom: '1px solid #f1f5f9',
};

const dividerTextStyle: React.CSSProperties = {
  position: 'absolute',
  backgroundColor: '#ffffff',
  padding: '0 10px',
  fontSize: '12px',
  fontWeight: '600',
  color: '#94a3b8',
};

const toggleModeSectionStyle: React.CSSProperties = {
  textAlign: 'center',
};

const toggleTextStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#64748b',
};

const toggleButtonStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  color: '#4f46e5',
  fontWeight: '600',
  marginLeft: '6px',
  cursor: 'pointer',
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
  marginBottom: '20px',
};
