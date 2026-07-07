'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PRODUCT_CATEGORIES, INDIAN_STATES } from '@/lib/types';
import { Store, User, Building, MapPin, Landmark, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { auth, googleProvider, signInWithPopup } from '@/lib/firebase';

export default function SellerRegisterPage() {
  const router = useRouter();
  const [formStep, setFormStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [googleUid, setGoogleUid] = useState('');

  const handleGoogleRegisterFill = async () => {
    setLoading(true);
    const toastId = toast.loading('Connecting Google account...');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      setGoogleUid(user.uid);
      setFullName(user.displayName || '');
      setEmail(user.email || '');
      // Set a temporary strong password so both options work
      setPassword('GooglePass_' + Math.random().toString(36).slice(-8));
      
      toast.success('Google profile details loaded successfully!', { id: toastId });
    } catch (err: any) {
      toast.error('Google link failed: ' + err.message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const [storeName, setStoreName] = useState('');
  const [storeDesc, setStoreDesc] = useState('');
  const [category, setCategory] = useState('grocery');
  const [gstNumber, setGSTNumber] = useState('');

  const [city, setCity] = useState('');
  const [state, setState] = useState('Karnataka');

  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifsc, setIFSC] = useState('');
  const [upiId, setUPIId] = useState('');

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formStep < 3) {
      setFormStep(prev => prev + 1);
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Submitting partner application...');

    try {
      const res = await fetch('/api/seller/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName, email, password, phone,
          storeName, storeDesc, category, city, state, gstNumber,
          bankName, accountNumber, ifsc, upiId,
          uid: googleUid || undefined
        })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Store application submitted and approved successfully!', { id: toastId });
        router.push('/seller/login');
      } else {
        toast.error(data.error || 'Submission failed.', { id: toastId });
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
        {/* Back navigation */}
        {formStep > 1 && (
          <button onClick={() => setFormStep(prev => prev - 1)} style={backButtonStyle}>
            <ArrowLeft size={16} />
            <span>Step {formStep - 1}</span>
          </button>
        )}

        <div style={headerStyle}>
          <div style={iconWrapperStyle}>
            <Store size={24} color="#4f46e5" />
          </div>
          <h1 style={titleStyle}>Partner Registration</h1>
          <p style={subTitleStyle}>Step {formStep} of 3: {formStep === 1 ? 'Personal details' : formStep === 2 ? 'Store profile' : 'Bank Settlements Details'}</p>
        </div>

        <form onSubmit={handleRegisterSubmit} style={formStyle}>
          {formStep === 1 && (
            <>
              <button 
                type="button" 
                disabled={loading}
                onClick={handleGoogleRegisterFill} 
                style={googleButtonStyle}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ width: '18px', height: '18px', marginRight: '10px' }}>
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.5 24c0-1.63-.15-3.2-.43-4.72H24v9h12.75c-.55 2.92-2.2 5.4-4.67 7.07l7.23 5.61C43.56 36.56 46.5 30.77 46.5 24z"/>
                  <path fill="#FBBC05" d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.98-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.23-5.61c-2.11 1.42-4.8 2.27-8.66 2.27-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                <span>Prefill with Google</span>
              </button>

              <div style={footerDividerStyle}>
                <span style={dividerTextStyle}>OR</span>
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Partner Full Name *</label>
                <input type="text" className="input" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Raj Kumar" required />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}> helpline Phone Number *</label>
                <input type="tel" className="input" value={phone} onChange={e => setPhone(e.target.value)} placeholder="9876543210" required />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Partner Email Address *</label>
                <input type="email" className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="partner@example.com" required />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Dashboard Password *</label>
                <input type="password" className="input" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
              </div>
            </>
          )}

          {formStep === 2 && (
            <>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Store Trade Name *</label>
                <input type="text" className="input" value={storeName} onChange={e => setStoreName(e.target.value)} placeholder="Raj Supermarket" required />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Store Description *</label>
                <textarea className="input" value={storeDesc} onChange={e => setStoreDesc(e.target.value)} placeholder="Neighborhood supermarket organic food grains store..." required />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Operating Category *</label>
                <select className="input" value={category} onChange={e => setCategory(e.target.value)}>
                  {PRODUCT_CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div style={rowGridStyle}>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>City *</label>
                  <input type="text" className="input" value={city} onChange={e => setCity(e.target.value)} placeholder="Bangalore" required />
                </div>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>State *</label>
                  <select className="input" value={state} onChange={e => setState(e.target.value)}>
                    {INDIAN_STATES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>GSTIN Number (Optional)</label>
                <input type="text" className="input" value={gstNumber} onChange={e => setGSTNumber(e.target.value)} placeholder="29ABCDE1234F1Z5" />
              </div>
            </>
          )}

          {formStep === 3 && (
            <>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Bank Name *</label>
                <input type="text" className="input" value={bankName} onChange={e => setBankName(e.target.value)} placeholder="HDFC Bank" required />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Bank Account Number *</label>
                <input type="text" className="input" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} placeholder="5010029382104" required />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>IFSC Code *</label>
                <input type="text" className="input" value={ifsc} onChange={e => setIFSC(e.target.value)} placeholder="HDFC0001203" required />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>UPI ID for Settlements *</label>
                <input type="text" className="input" value={upiId} onChange={e => setUPIId(e.target.value)} placeholder="rajsuper@okhdfc" required />
              </div>
            </>
          )}

          <button type="submit" disabled={loading} style={submitButtonStyle}>
            <span>{formStep === 3 ? (loading ? 'Submitting Application...' : 'Submit Application') : 'Continue'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div style={footerStyle}>
          <p style={footerTextStyle}>
            Already have a store account approved? 
            <Link href="/seller/login" style={loginLinkStyle}>Seller Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// Styles
const containerStyle: React.CSSProperties = {
  width: '100vw',
  minHeight: '100vh',
  backgroundColor: '#0f172a',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 20px',
};

const cardStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '480px',
  backgroundColor: '#ffffff',
  borderRadius: '24px',
  padding: '40px',
  boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)',
};

const backButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  backgroundColor: 'transparent',
  color: '#64748b',
  fontSize: '13px',
  fontWeight: '600',
  marginBottom: '20px',
  cursor: 'pointer',
};

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '28px',
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
};

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
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

const rowGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '12px',
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

const loginLinkStyle: React.CSSProperties = {
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
  marginBottom: '20px',
};
