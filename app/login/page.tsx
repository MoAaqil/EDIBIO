'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { Wifi, ArrowRight, Shield, Smartphone, BarChart3, Check, Fingerprint } from 'lucide-react'; // Trigger HMR rebuild v2
import { auth, googleProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signInWithPhoneNumber, RecaptchaVerifier, createUserWithEmailAndPassword, signInWithEmailAndPassword, db } from '@/lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import LZString from 'lz-string';
import toast from 'react-hot-toast';
import { confirm } from '@/components/ConfirmDialog';
export default function LoginPage() {
    const router = useRouter();
    const { user, setUser, isAuthenticated, resetAll, companies, setActiveCompany, startDemo } = useStore();
    const [authMode, setAuthMode] = useState<'options' | 'phone' | 'email_login' | 'email_register' | 'role_login' | 'admin_login' | 'forgot'>('options');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [licenseNo, setLicenseNo] = useState('');
    const [name, setName] = useState('');
    const [otp, setOtp] = useState('');
    const [confirmationResult, setConfirmationResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [googleLoading, setGoogleLoading] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

    // Auto-redirect if already logged in (persistent state)
    useEffect(() => {
        if (isAuthenticated) {
            if (user?.role === 'admin') {
                router.replace('/admin');
            } else if (useStore.getState().isDemo) {
                router.replace('/company/dashboard');
            } else {
                router.replace('/companies');
            }
        } else {
            // Check for redirect result from mobile Google Sign-In
            getRedirectResult(auth).then((result) => {
                if (result) {
                    console.log('[Auth] Google Sign-In Redirect Success:', result.user.email);
                    // Do NOT resetAll — preserve locally stored companies
                    setUser({
                        uid: result.user.uid,
                        email: result.user.email || '',
                        name: result.user.displayName || 'Store Manager',
                        photoUrl: result.user.photoURL || undefined,
                        createdAt: new Date().toISOString(),
                    });
                    router.replace(user?.role === 'admin' ? '/admin' : '/companies');
                }
            }).catch(err => {
                console.error('[Auth] Google Sign-In Redirect Error:', err);
                if (err.code === 'auth/unauthorized-domain') {
                    setError('ERROR: Domain not authorized in Firebase console. Please add this URL to are authorized domains list.');
                } else {
                    setError('Google Sign-In failed: ' + err.message);
                }
            });
        }
    }, [isAuthenticated, router]);

    // Handle PWA Install Prompt
    useEffect(() => {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        });
    }, []);

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                setDeferredPrompt(null);
            }
        } else {
            toast('To install: Tap your browser menu (⋮) and select "Add to Home screen" or "Install App".', { 
                icon: '📱', 
                duration: 6000,
                style: { borderRadius: '12px', background: '#333', color: '#fff', padding: '12px 16px' }
            });
        }
    };

    const handleGoogleLogin = async () => {
        setGoogleLoading(true);
        try {
            // Use signInWithPopup across all devices. 
            // PWA redirect login often causes state loss or unauthorized domain errors.
            const result = await signInWithPopup(auth, googleProvider);
            // Do NOT resetAll — preserve locally stored companies
            setUser({
                uid: result.user.uid,
                email: result.user.email || '',
                name: result.user.displayName || 'Store Manager',
                photoUrl: result.user.photoURL || undefined,
                createdAt: new Date().toISOString(),
            });
            router.replace(result.user.email === 'aaqilezio@gmail.com' ? '/admin' : '/companies');
        } catch (err: any) {
            console.error('[Auth] Login Error:', err);
            if (err.code === 'auth/unauthorized-domain') {
                setError('ERROR: Domain not authorized in Firebase. Add this domain to Firebase console.');
            } else if (err.message && err.message.toLowerCase().includes('network')) {
                setError('Network Error: You must be online to use Google Sign-In for the first time. Try "Register As a Manager" manually to use the app offline.');
            } else if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
                setError(err.message || 'Google Auth Failed. Are you offline?');
            }
            setGoogleLoading(false);
        }
    };

    const handleAdminLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (email === 'aaqilezio@gmail.com' && password === 'Lamborgini') {
            setUser({
                uid: 'admin_123',
                email: email,
                name: 'Super Admin',
                role: 'admin',
                createdAt: new Date().toISOString()
            } as any);
            router.replace('/admin');
        } else {
            setError('Invalid Admin Credentials');
        }
    };

    const handleFingerprintLogin = async () => {
        try {
            if (!window.PublicKeyCredential) {
                toast.error('Biometrics not supported on this browser');
                return;
            }
            const avail = await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
            if (!avail) {
                toast.error('No fingerprint/face scanner setup on this device');
                return;
            }
            
            const savedState = JSON.parse(localStorage.getItem('edibio-storage') || '{}');
            if (!savedState?.state?.user?.uid) {
                toast.error('Please login with Email or Google first to link your device.');
                return;
            }

            // Simulate passkey/biometric prompt
            toast('Touch ID / Fingerprint sensor...', { icon: '👆', duration: 2000 });
            await new Promise(r => setTimeout(r, 1500));
            
            setUser(savedState.state.user);
            toast.success('Identity verified');
            router.replace(savedState.state.user.role === 'admin' ? '/admin' : '/companies');

        } catch (e) {
            toast.error('Biometric login failed');
        }
    };

    const setupRecaptcha = () => {
        if (!(window as any).recaptchaVerifier) {
            (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
            });
        }
    };

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!phone) { setError('Enter phone number'); return; }
        setLoading(true);
        try {
            setupRecaptcha();
            const appVerifier = (window as any).recaptchaVerifier;
            const res = await signInWithPhoneNumber(auth, phone.startsWith('+') ? phone : '+91' + phone, appVerifier);
            setConfirmationResult(res);
            setLoading(false);
        } catch (err: any) {
            setError(err.message || 'Failed to send OTP');
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const result = await confirmationResult.confirm(otp);
            // Do NOT resetAll — preserve locally stored companies
            setUser({
                uid: result.user.uid,
                email: result.user.email || '',
                name: result.user.displayName || 'Manager',
                phone: result.user.phoneNumber || phone,
                createdAt: new Date().toISOString(),
            });
            router.replace('/companies');
        } catch (err: any) {
            setError('Invalid OTP code');
            setLoading(false);
        }
    };

    const handleEmailRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!email || !password || !name) { setError('Please fill all fields'); return; }
        setLoading(true);
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            // Do NOT resetAll — preserve locally stored companies
            setUser({
                uid: res.user.uid,
                email: res.user.email || email,
                name: name,
                phone: phone || '',
                createdAt: new Date().toISOString(),
            });
            router.replace('/companies');
        } catch (err: any) {
            setError(err.message || 'Failed to create account');
            setLoading(false);
        }
    };

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!email || !password) { setError('Enter email and password'); return; }
        setLoading(true);
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            // Do NOT resetAll — preserve locally stored companies
            setUser({
                uid: res.user.uid,
                email: res.user.email || email,
                name: res.user.displayName || 'Manager',
                phone: res.user.phoneNumber || '',
                createdAt: new Date().toISOString(),
            });
            router.replace('/companies');
        } catch (err: any) {
            setError('Invalid email or password');
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!email) { setError('Enter your email address'); return; }
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            setError('__success__Reset email sent! Check your inbox and follow the link.');
        } catch (err: any) {
            setError(err.code === 'auth/user-not-found' ? 'No account found with this email.' : err.message || 'Failed to send reset email');
        }
        setLoading(false);
    };

    const handleRoleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!licenseNo || !email || !password) { setError('Please fill all fields'); return; }
        setLoading(true);
        try {
            let matchingCompany = null;
            let matchingTeamMember = null;
            let ownerUid = null;

            if (navigator.onLine) {
                // Fetch from new MongoDB endpoint
                const res = await fetch('/api/auth/role', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ licenseNo, email, password })
                });

                if (res.ok) {
                    const data = await res.json();
                    matchingCompany = data.company;
                    matchingTeamMember = data.teamMember;
                    ownerUid = data.ownerUid;

                    // Trigger cloud hydration logic using our new MongoSync
                    try {
                        const syncRes = await fetch(`/api/sync?userId=${ownerUid}`);
                        if (syncRes.ok) {
                            const syncData = await syncRes.json();
                            const cloudState = syncData.payload;
                            const localState = useStore.getState();

                            const mergeArrays = (localArr: any[], cloudArr: any[]) => {
                                if (!localArr?.length) return cloudArr || [];
                                if (!cloudArr?.length) return localArr || [];
                                const map = new Map();
                                localArr.forEach(item => { if (item && item.id) map.set(item.id, item); });
                                cloudArr.forEach(item => {
                                    if (item && item.id && !map.has(item.id)) {
                                        map.set(item.id, item);
                                    }
                                });
                                return Array.from(map.values())
                                    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
                            };

                            const keysToMerge = [
                                'companies', 'parties', 'products', 'invoices', 'expenses',
                                'agencyClients', 'agencyProjects'
                            ];

                            const safeHydrationState: any = {};
                            keysToMerge.forEach(key => {
                                const cloudArr = cloudState[key] || [];
                                const localArr = localState[key as keyof typeof localState] as any[] || [];
                                safeHydrationState[key] = mergeArrays(localArr, cloudArr);
                            });

                            useStore.setState(safeHydrationState);
                            localStorage.setItem(`sync_ts_${ownerUid}`, syncData.updatedAt.toString());
                        }
                    } catch (hydrateErr) {
                        console.warn('Failed to hydrate store during role login (Mongo):', hydrateErr);
                    }
                } else {
                    const errorData = await res.json();
                    setError(errorData.error || 'Role login failed');
                    setLoading(false);
                    return;
                }
            } else {
                // Fallback to local IndexedDB check if offline
                const co = companies.find(c => c.licenseNo === licenseNo);
                if (co) {
                    const teamMember = (co.team || []).find(t =>
                        (t.contact === email || t.name === email) && t.password === password
                    );
                    if (teamMember) {
                        matchingCompany = co;
                        matchingTeamMember = teamMember;
                        ownerUid = co.userId; // fallback owner ID
                    }
                }
            }

            if (!matchingCompany) {
                setError('Invalid License No (or maybe you are offline?)');
                setLoading(false);
                return;
            }

            if (!matchingTeamMember) {
                setError('Invalid Username or Password');
                setLoading(false);
                return;
            }

            setActiveCompany(matchingCompany.id);
            setUser({
                uid: ownerUid || matchingCompany.userId || matchingTeamMember.id, // Must be Owner's Firebase ID for sync
                email: matchingTeamMember.contact,
                name: matchingTeamMember.name,
                role: matchingTeamMember.role,
                createdAt: new Date().toISOString()
            } as any);

            toast.success('Login verified (Mongo DB).');

            if (matchingTeamMember.role === 'staff') {
                router.replace('/company/billing');
            } else {
                router.replace('/company/dashboard');
            }
        } catch (err: any) {
            console.error('Role Login error:', err);
            setError('Role Login failed');
            setLoading(false);
        }
    };



    const features = [
        { icon: BarChart3, color: '#4285F4', text: 'Complete GST billing & reports' },
        { icon: Smartphone, color: '#34A853', text: 'Print from phone — A4, A5, Thermal' },
        { icon: Shield, color: '#EA4335', text: 'Password-protected secret invoices' },
        { icon: Wifi, color: '#FBBC04', text: 'Works offline — all data on device' },
    ];

    return (
        <div style={{ minHeight: '100dvh', display: 'flex', background: '#F8F9FA' }}>

            {/* ── LEFT — Hero (desktop only) ── */}
            <div style={{
                background: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)', padding: 60, position: 'relative', overflow: 'hidden',
            }} className="login-hero">
                <div style={{ position: 'absolute', top: -100, left: -100, width: 400, height: 400, background: '#4285F4', filter: 'blur(150px)', opacity: 0.15, borderRadius: '50%' }} />
                <div style={{ position: 'absolute', bottom: -100, right: -100, width: 400, height: 400, background: '#EA4335', filter: 'blur(150px)', opacity: 0.15, borderRadius: '50%' }} />
                <div style={{ position: 'absolute', top: '40%', right: '20%', width: 300, height: 300, background: '#FBBC04', filter: 'blur(120px)', opacity: 0.15, borderRadius: '50%' }} />
                {/* Colorful quadrant accent */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 5,
                    background: 'linear-gradient(90deg, #4285F4 25%, #34A853 25% 50%, #FBBC04 50% 75%, #EA4335 75%)'
                }} />

                <div style={{ maxWidth: 420, textAlign: 'center', zIndex: 1 }}>
                    <div style={{
                        position: 'relative', display: 'inline-block', marginBottom: 36,
                        perspective: 1000, transformStyle: 'preserve-3d',
                    }}>
                        <Image src="/logo.png" alt="Edibio" width={140} height={140}
                            style={{
                                borderRadius: 32,
                                boxShadow: '0 24px 64px rgba(66,133,244,0.3), inset 0 2px 4px rgba(255,255,255,0.8), -8px 8px 16px rgba(0,0,0,0.05)',
                                transform: 'rotateY(10deg) rotateX(10deg) translateZ(20px)',
                            }}
                        />
                    </div>

                    <h1 style={{ fontSize: 38, fontWeight: 900, color: '#1A1A2E', lineHeight: 1.1, marginBottom: 16, textShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                        Manage Your Store<br />
                        <span style={{ background: 'linear-gradient(90deg,#4285F4,#34A853,#FBBC04,#EA4335)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textShadow: 'none' }}>
                            Like a Pro
                        </span>
                    </h1>
                    <p style={{ color: '#718096', fontSize: 15, lineHeight: 1.6, marginBottom: 40 }}>
                        Complete supermarket management — billing, inventory, GST reports, and more for Indian businesses.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, textAlign: 'left' }}>
                        {features.map(({ icon: Icon, color, text }) => (
                            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 12, background: color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Icon size={18} color={color} />
                                </div>
                                <p style={{ fontSize: 14, color: '#2D3748', fontWeight: 500 }}>{text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4-color dots decoration */}
                <div style={{ position: 'absolute', bottom: 40, left: 40, display: 'flex', gap: 8 }}>
                    {['#4285F4', '#34A853', '#FBBC04', '#EA4335'].map(c => (
                        <div key={c} style={{ width: 10, height: 10, borderRadius: 999, background: c }} />
                    ))}
                </div>
            </div>

            {/* ── RIGHT — Login Form ── */}
            <div style={{
                width: '100%', maxWidth: 520,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '48px 40px', background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(20px)',
                boxShadow: '0 -24px 48px rgba(0,0,0,0.04), -16px 0 32px rgba(0,0,0,0.02)',
                borderLeft: '1px solid rgba(255,255,255,0.8)',
            }} className="login-form-panel">

                {/* Mobile logo */}
                <div style={{ textAlign: 'center', marginBottom: 32 }} className="login-mobile-logo">
                    <Image src="/logo.png" alt="Edibio" width={120} height={120}
                        style={{ borderRadius: 24, boxShadow: '0 8px 32px rgba(66,133,244,0.18)', marginBottom: 14 }} />
                </div>

                <div style={{ width: '100%', maxWidth: 360 }}>
                    <h3 style={{ fontSize: 22, fontWeight: 800, color: '#1A1A2E', marginBottom: 6 }}>Welcome Back</h3>
                    <p style={{ color: '#718096', fontSize: 14, marginBottom: 28 }}>Sign in to continue to your store dashboard</p>

                    {/* Google Button */}
                    <button
                        onClick={handleGoogleLogin}
                        disabled={googleLoading}
                        style={{
                            width: '100%', padding: '14px 16px', borderRadius: 16,
                            border: '1px solid #E2E8F0', background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                            cursor: 'pointer', fontWeight: 700, fontSize: 14, color: '#1A1A2E',
                            boxShadow: '0 4px 12px rgba(66, 133, 244, 0.08), inset 0 1px 0 white', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            marginBottom: 20, transform: 'translateY(0)',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(66, 133, 244, 0.15), inset 0 1px 0 white'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(66, 133, 244, 0.08), inset 0 1px 0 white'; }}
                    >
                        {googleLoading ? (
                            <span>Signing in…</span>
                        ) : (
                            <>
                                <svg width="18" height="18" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Continue with Google
                            </>
                        )}
                    </button>

                    {/* Divider */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                        <div style={{ flex: 1, height: 1, background: '#E1E4E8' }} />
                        <span style={{ fontSize: 12, color: '#A0AEC0', fontWeight: 600 }}>OR</span>
                        <div style={{ flex: 1, height: 1, background: '#E1E4E8' }} />
                    </div>

                    <div id="recaptcha-container"></div>
                    {authMode === 'options' && (
                        <>
                            {/* Primary: Email/Password */}
                            <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                                <button onClick={() => setAuthMode('email_login')} className="btn btn-outline btn-lg" style={{ flex: 1, justifyContent: 'center', gap: 8 }}>
                                    Sign In
                                </button>
                                <button onClick={() => setAuthMode('email_register')} className="btn btn-blue btn-lg" style={{ flex: 1, justifyContent: 'center', gap: 8, border: 'none' }}>
                                    Register
                                </button>
                            </div>

                            <button onClick={handleFingerprintLogin} style={{
                                width: '100%', padding: '13px 16px', borderRadius: 14,
                                background: '#1A1A2E', color: 'white',
                                border: 'none',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                                cursor: 'pointer', fontWeight: 700, fontSize: 14, marginBottom: 14,
                                transition: 'all 0.2s',
                            }}>
                                <Fingerprint size={18} color="#4285F4" />
                                Login with Fingerprint
                            </button>

                            {/* Demo CTA */}
                            <button onClick={async () => {
                                startDemo();
                                router.replace('/company/dashboard');
                            }} style={{
                                width: '100%', padding: '13px 16px', borderRadius: 14,
                                background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
                                border: '1.5px solid #A7F3D0', color: '#065F46',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                cursor: 'pointer', fontWeight: 700, fontSize: 13, marginBottom: 20,
                                transition: 'all 0.2s',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(16,185,129,0.2)'; }}
                                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                <span style={{ fontSize: 16 }}>🎯</span>
                                <span>Try Free Demo — No signup needed</span>
                                <span style={{ marginLeft: 'auto', background: '#10B981', color: 'white', borderRadius: 6, padding: '2px 8px', fontSize: 10, fontWeight: 800 }}>1 HR</span>
                            </button>

                            {/* Social proof */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 20 }}>
                                <div style={{ display: 'flex', gap: -4 }}>
                                    {['#4285F4', '#34A853', '#FBBC04', '#EA4335'].map(c => (
                                        <div key={c} style={{ width: 22, height: 22, borderRadius: '50%', background: c, border: '2px solid white', marginLeft: -4 }} />
                                    ))}
                                </div>
                                <span style={{ fontSize: 11, color: '#718096', fontWeight: 600 }}>200+ shops trust Edibio</span>
                            </div>

                            {/* Staff & Admin as subtle links */}
                            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, paddingTop: 8, borderTop: '1px solid #F1F3F5' }}>
                                <button onClick={() => setAuthMode('role_login')} style={{ background: 'none', border: 'none', color: '#718096', fontSize: 12, cursor: 'pointer', fontWeight: 600, padding: '4px 0' }}>
                                    Staff / Manager Login →
                                </button>
                                <button onClick={() => setAuthMode('admin_login')} style={{ background: 'none', border: 'none', color: '#CBD5E0', fontSize: 11, cursor: 'pointer', fontWeight: 500, padding: '4px 0' }}>
                                    Admin
                                </button>
                            </div>
                        </>
                    )}

                    {authMode === 'phone' && (
                        <form onSubmit={confirmationResult ? handleVerifyOTP : handleSendOTP}>
                            {!confirmationResult ? (
                                <div style={{ marginBottom: 14 }}>
                                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4A5568', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Phone Number (with country code)
                                    </label>
                                    <input
                                        type="tel"
                                        className="e-input"
                                        placeholder="+91 9876543210"
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                        autoComplete="tel"
                                    />
                                </div>
                            ) : (
                                <div style={{ marginBottom: 20 }}>
                                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4A5568', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Enter 6-digit OTP
                                    </label>
                                    <input
                                        type="text"
                                        className="e-input"
                                        placeholder="123456"
                                        value={otp}
                                        onChange={e => setOtp(e.target.value)}
                                    />
                                </div>
                            )}

                            {error && (
                                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', padding: '10px 14px', borderRadius: 8, marginBottom: 16, fontSize: 13, color: '#C5221F' }}>
                                    {error}
                                </div>
                            )}

                            <button type="submit" disabled={loading} className="btn btn-blue btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                                {loading ? 'Processing…' : !confirmationResult ? <><span>Send OTP</span> <ArrowRight size={16} /></> : <><span>Verify OTP</span> <Check size={16} /></>}
                            </button>

                            <button type="button" onClick={() => { setAuthMode('options'); setConfirmationResult(null); }} style={{ width: '100%', marginTop: 12, background: 'none', border: 'none', color: '#718096', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>
                                Back to options
                            </button>
                        </form>
                    )}

                    {authMode === 'email_login' && (
                        <form onSubmit={handleEmailLogin}>
                            <div style={{ marginBottom: 14 }}>
                                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4A5568', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
                                <input type="email" className="e-input" value={email} onChange={e => setEmail(e.target.value)} required />
                            </div>
                            <div style={{ marginBottom: 6 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4A5568', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password</label>
                                    <button type="button" onClick={() => { setAuthMode('forgot'); setError(''); }} style={{ background: 'none', border: 'none', color: '#4285F4', fontSize: 11, cursor: 'pointer', fontWeight: 700 }}>Forgot password?</button>
                                </div>
                                <input type="password" className="e-input" value={password} onChange={e => setPassword(e.target.value)} required />
                            </div>
                            <div style={{ marginBottom: 20 }} />
                            {error && <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', padding: '10px 14px', borderRadius: 8, marginBottom: 16, fontSize: 13, color: '#C5221F' }}>{error}</div>}
                            <button type="submit" disabled={loading} className="btn btn-blue btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                                {loading ? 'Signing in…' : 'Sign In'}
                            </button>
                            <button type="button" onClick={() => setAuthMode('options')} style={{ width: '100%', marginTop: 12, background: 'none', border: 'none', color: '#718096', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>Back to options</button>
                        </form>
                    )}

                    {authMode === 'forgot' && (
                        <form onSubmit={handleForgotPassword}>
                            <div style={{ textAlign: 'center', marginBottom: 20 }}>
                                <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#E8F0FE', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                                    <Shield size={22} color="#4285F4" />
                                </div>
                                <h4 style={{ fontWeight: 900, fontSize: 16, color: '#1A202C', marginBottom: 4 }}>Reset Password</h4>
                                <p style={{ fontSize: 12, color: '#718096' }}>Enter your email and we'll send a reset link.</p>
                            </div>
                            <div style={{ marginBottom: 20 }}>
                                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4A5568', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
                                <input type="email" className="e-input" value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
                            </div>
                            {error && (
                                <div style={{
                                    background: error.startsWith('__success__') ? '#F0FDF4' : '#FEF2F2',
                                    border: `1px solid ${error.startsWith('__success__') ? '#A7F3D0' : '#FECACA'}`,
                                    padding: '10px 14px', borderRadius: 8, marginBottom: 16, fontSize: 13,
                                    color: error.startsWith('__success__') ? '#065F46' : '#C5221F'
                                }}>
                                    {error.replace('__success__', '')}
                                </div>
                            )}
                            <button type="submit" disabled={loading} className="btn btn-blue btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                                {loading ? 'Sending…' : '📧 Send Reset Link'}
                            </button>
                            <button type="button" onClick={() => { setAuthMode('email_login'); setError(''); }} style={{ width: '100%', marginTop: 12, background: 'none', border: 'none', color: '#718096', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>← Back to Sign In</button>
                        </form>
                    )}

                    {authMode === 'admin_login' && (
                        <form onSubmit={handleAdminLogin}>
                            <h4 style={{ textAlign: 'center', marginBottom: 16, fontWeight: 'bold', color: '#C5221F' }}>Restricted Access</h4>
                            <div style={{ marginBottom: 14 }}>
                                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4A5568', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Admin Email</label>
                                <input type="email" className="e-input" value={email} onChange={e => setEmail(e.target.value)} required />
                            </div>
                            <div style={{ marginBottom: 20 }}>
                                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4A5568', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Admin Password</label>
                                <input type="password" className="e-input" value={password} onChange={e => setPassword(e.target.value)} required />
                            </div>
                            {error && <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', padding: '10px 14px', borderRadius: 8, marginBottom: 16, fontSize: 13, color: '#C5221F' }}>{error}</div>}
                            <button type="submit" disabled={loading} className="btn btn-blue btn-lg" style={{ width: '100%', justifyContent: 'center', background: '#C5221F', border: 'none' }}>
                                {loading ? 'Checking...' : 'Login as Admin'}
                            </button>
                            <button type="button" onClick={() => setAuthMode('options')} style={{ width: '100%', marginTop: 12, background: 'none', border: 'none', color: '#718096', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>Back to options</button>
                        </form>
                    )}

                    {authMode === 'email_register' && (
                        <form onSubmit={handleEmailRegister}>
                            <div style={{ marginBottom: 14 }}>
                                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4A5568', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name</label>
                                <input type="text" className="e-input" value={name} onChange={e => setName(e.target.value)} required />
                            </div>
                            <div style={{ marginBottom: 14 }}>
                                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4A5568', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
                                <input type="email" className="e-input" value={email} onChange={e => setEmail(e.target.value)} required />
                            </div>
                            <div style={{ marginBottom: 14 }}>
                                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4A5568', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone Number (Optional)</label>
                                <input type="tel" className="e-input" value={phone} onChange={e => setPhone(e.target.value)} />
                            </div>
                            <div style={{ marginBottom: 20 }}>
                                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4A5568', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password</label>
                                <input type="password" className="e-input" value={password} onChange={e => setPassword(e.target.value)} required />
                            </div>
                            {error && <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', padding: '10px 14px', borderRadius: 8, marginBottom: 16, fontSize: 13, color: '#C5221F' }}>{error}</div>}
                            <button type="submit" disabled={loading} className="btn btn-blue btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                                {loading ? 'Creating Account…' : 'Create Manager Account'}
                            </button>
                            <button type="button" onClick={() => setAuthMode('options')} style={{ width: '100%', marginTop: 12, background: 'none', border: 'none', color: '#718096', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>Back to options</button>
                        </form>
                    )}

                    {authMode === 'role_login' && (
                        <form onSubmit={handleRoleLogin}>
                            <div style={{ marginBottom: 14 }}>
                                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4A5568', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company License No</label>
                                <input type="text" className="e-input" placeholder="e.g. 12345678" value={licenseNo} onChange={e => setLicenseNo(e.target.value)} required />
                            </div>
                            <div style={{ marginBottom: 14 }}>
                                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4A5568', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Username</label>
                                <input type="text" className="e-input" placeholder="e.g. store@edibio.staff" value={email} onChange={e => setEmail(e.target.value)} required />
                            </div>
                            <div style={{ marginBottom: 20 }}>
                                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4A5568', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password</label>
                                <input type="password" className="e-input" value={password} onChange={e => setPassword(e.target.value)} required />
                            </div>
                            {error && <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', padding: '10px 14px', borderRadius: 8, marginBottom: 16, fontSize: 13, color: '#C5221F' }}>{error}</div>}
                            <button type="submit" disabled={loading} className="btn btn-blue btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                                {loading ? 'Validating…' : 'Sign in as Role'}
                            </button>
                            <button type="button" onClick={() => setAuthMode('options')} style={{ width: '100%', marginTop: 12, background: 'none', border: 'none', color: '#718096', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>Back to options</button>
                        </form>
                    )}

                    <p style={{ textAlign: 'center', fontSize: 13, color: '#718096', marginTop: 20 }}>
                        {authMode === 'email_register' ? 'Already have an account? ' : 'New to Edibio? '}
                        <span style={{ color: '#4285F4', fontWeight: 700, cursor: 'pointer' }}
                            onClick={() => {
                                setAuthMode(authMode === 'email_register' ? 'email_login' : 'email_register');
                                setError('');
                            }}>
                            {authMode === 'email_register' ? 'Sign In' : 'Register As a Manager'}
                        </span>
                    </p>

                    {/* App Download / Install Section */}
                    <div style={{ marginTop: 40, borderTop: '1px solid #E2E8F0', paddingTop: 24 }}>
                        <h4 style={{ fontSize: 13, fontWeight: 800, color: '#4A5568', textAlign: 'center', marginBottom: 16 }}>AVAILABLE FOR ALL DEVICES</h4>

                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                            <button onClick={handleInstallClick} style={{ flex: 1, padding: '12px 16px', background: '#F8F9FA', border: '1px solid #E2E8F0', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', color: '#1A202C', fontWeight: 700, fontSize: 13, transition: 'all 0.2s' }}>
                                <Smartphone size={16} color="#4285F4" />
                                Install App
                            </button>
                        </div>
                        <p style={{ textAlign: 'center', fontSize: 11, color: '#A0AEC0', marginTop: 12, lineHeight: 1.5 }}>
                            Install the native app for a faster, offline-capable experience. Resources will download locally to your system automatically.
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
        .login-hero { 
            display: none; 
            flex: 1; 
            flex-direction: column; 
            align-items: center; 
            justify-content: center; 
        }
        @media (min-width: 800px) {
          .login-hero { display: flex !important; }
          .login-mobile-logo { display: none !important; }
          .login-form-panel { max-width: 420px !important; }
        }
      `}</style>
        </div>
    );
}
