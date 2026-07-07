'use client';
import { useState, useEffect } from 'react';
import { Check, ShieldCheck, Zap, ArrowRight, MessageCircle, Gift, KeySquare, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import toast from 'react-hot-toast';
import Script from 'next/script';

export default function SubscriptionPage() {
    const { user, updateUser, activeCompanyId, companies } = useStore();
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    // Claim 28 days states
    const [claimInput, setClaimInput] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [claimSuccess, setClaimSuccess] = useState('');
    const [claimError, setClaimError] = useState('');
    const [expectedOtp, setExpectedOtp] = useState('');

    // Redeem code states
    const [redeemCode, setRedeemCode] = useState('');
    const [redeemSuccess, setRedeemSuccess] = useState('');
    const [redeemError, setRedeemError] = useState('');

    const [daysLeft, setDaysLeft] = useState(0);

    useEffect(() => {
        if (user?.trialExpiresAt) {
            const ms = new Date(user.trialExpiresAt).getTime() - Date.now();
            setDaysLeft(Math.max(0, Math.ceil(ms / 86400000)));
        }
    }, [user]);


    const handleSendOTP = () => {
        setClaimError('');
        if (!claimInput) { setClaimError('Please enter email or phone'); return; }

        const generated = Math.floor(100000 + Math.random() * 900000).toString();
        setExpectedOtp(generated);
        setOtpSent(true);

        // Output OTP so user can actually copy and test it
        setTimeout(() => {
            toast.success(`SYSTEM VERIFICATION\nOTP: ${generated}\n(Mocking Email/SMS)`, { duration: 6000 });
        }, 300);
    };

    const handleVerifyClaim = () => {
        if (!otp) { setClaimError('Please enter OTP'); return; }
        if (otp !== expectedOtp) { setClaimError('Invalid OTP entered. Please try again.'); return; }
        // Simulate OTP verification success for +28 days = 31 days total since creation
        const createdAt = new Date(user?.createdAt || Date.now());
        const newExpires = new Date(createdAt);
        newExpires.setDate(newExpires.getDate() + 31); // 3 + 28 = 31

        updateUser({ trialExpiresAt: newExpires.toISOString(), trialClaimed: true });
        setClaimSuccess('Claimed! Your trial has been extended to 31 days from creation.');
        setOtpSent(false);
        setClaimInput('');
        setTimeout(() => setClaimSuccess(''), 5000);
    };

    const handleRedeem = () => {
        setRedeemError('');
        setRedeemSuccess('');
        if (!redeemCode) return;

        let addDays = 0;
        if (redeemCode === 'EdibioFor3Days') addDays = 3;
        else if (redeemCode === 'EdibioFor15Days') addDays = 15;
        else if (redeemCode === 'EdibioAt28DaysSecure') addDays = 28;
        else {
            setRedeemError('Invalid redeem code. Please contact support.');
            return;
        }

        const currentExpires = user?.trialExpiresAt ? new Date(user.trialExpiresAt) : new Date();
        if (currentExpires.getTime() < Date.now()) {
            currentExpires.setTime(Date.now()); // reset from today if expired
        }
        currentExpires.setDate(currentExpires.getDate() + addDays);

        updateUser({ trialExpiresAt: currentExpires.toISOString() });
        setRedeemSuccess(`Successfully extended trial by ${addDays} days!`);
        setRedeemCode('');
        setTimeout(() => setRedeemSuccess(''), 5000);
    };

    const handlePaymentSuccess = (plan: string, amount: number, paymentId: string = 'demo_txn') => {
        const currentDate = new Date();
        const expiryDate = new Date();
        if (billingCycle === 'yearly') {
            expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        } else {
            expiryDate.setMonth(expiryDate.getMonth() + 1);
        }

        const newPayment = {
            plan,
            amount,
            date: currentDate.toISOString(),
            billingCycle,
            status: 'paid',
            id: paymentId
        };

        const existingHistory = user?.paymentHistory || [];

        updateUser({
            subscriptionType: plan.toLowerCase() as any,
            subscriptionExpiresAt: expiryDate.toISOString(),
            trialExpiresAt: undefined,
            paymentHistory: [newPayment, ...existingHistory]
        });
        toast.success(`Payment successful! Upgraded to ${plan} Plan.`);
    };

    const initiateRazorpayPayment = async (plan: string, amount: number) => {
        const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '';
        const isSimulated = !key || key.includes('MOCK_KEY');

        const toastId = toast.loading('Creating Secure Order...');

        try {
            // 1. Create order on backend
            const orderRes = await fetch('/api/payments/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    plan,
                    amount,
                    billingCycle,
                    userId: user?.uid 
                })
            });

            if (!orderRes.ok) {
                throw new Error('Failed to create order. Please try again.');
            }

            const orderData = await orderRes.json();
            toast.dismiss(toastId);

            if (orderData.simulated || isSimulated) {
                // Instantly Verify Sandbox
                const simVerifyId = toast.loading('Verifying Sandbox Payment...');
                const verifyRes = await fetch('/api/payments/verify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        plan, amount, billingCycle, userId: user?.uid, simulated: true, razorpay_payment_id: 'sim_txn_' + Date.now()
                    })
                });

                if (verifyRes.ok) {
                    const data = await verifyRes.json();
                    // Only update subscription-related fields — never pass the full MongoDB doc
                    // to updateUser as it has _id (not uid) and could corrupt local Zustand state
                    updateUser({
                        subscriptionType: data.updatedUser.subscriptionType,
                        subscriptionExpiresAt: data.updatedUser.subscriptionExpiresAt,
                        trialExpiresAt: data.updatedUser.trialExpiresAt ?? undefined,
                        paymentHistory: data.updatedUser.paymentHistory
                    });
                    toast.success(`🎉 Payment successful! Upgraded to ${plan} Plan.`, { id: simVerifyId });
                } else {
                    const errData = await verifyRes.json().catch(() => ({}));
                    toast.error(errData.error || 'Simulation Verify Failed', { id: simVerifyId });
                }
                return;
            }

            // 2. Open Razorpay Widget for real order
            if (!(window as any).Razorpay) {
                toast.error('Payment gateway failed to load. Please check your connection.');
                return;
            }

            const options = {
                key: key,
                amount: orderData.amount, 
                currency: orderData.currency,
                name: 'Edibio',
                description: `${plan} Plan - ${billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1)} Subscription`,
                image: '/logo.png',
                order_id: orderData.order_id, // Crucial: use backend generated order ID
                handler: async function (response: any) {
                    const verifyToastId = toast.loading('Verifying Payment Signature...');
                    try {
                        // 3. Verify on backend securely
                        const verifyRes = await fetch('/api/payments/verify', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                plan,
                                amount,
                                billingCycle,
                                userId: user?.uid,
                                simulated: false
                            })
                        });

                        if (!verifyRes.ok) {
                            const errData = await verifyRes.json().catch(() => ({}));
                            throw new Error(errData.error || 'Payment Verification Failed');
                        }

                        const verifyData = await verifyRes.json();
                        // 4. Update local Zustand store to match MongoDB state
                        updateUser({
                            subscriptionType: verifyData.updatedUser.subscriptionType,
                            subscriptionExpiresAt: verifyData.updatedUser.subscriptionExpiresAt,
                            trialExpiresAt: verifyData.updatedUser.trialExpiresAt,
                            paymentHistory: verifyData.updatedUser.paymentHistory
                        });

                        toast.success(`🎉 Payment successful! Upgraded to ${plan} Plan.`, { id: verifyToastId });

                    } catch (verifyErr: any) {
                        console.error('[Payment] Verify error:', verifyErr);
                        toast.error(verifyErr.message || 'Verification Error', { id: verifyToastId });
                    }
                },
                prefill: {
                    name: user?.name || '',
                    email: user?.email || '',
                },
                theme: { color: '#4285F4' },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.on('payment.failed', function (response: any) {
                toast.error(response.error.description || 'Payment Failed');
            });
            rzp.open();

        } catch (err: any) {
            toast.error(err.message || 'Checkout completely failed', { id: toastId });
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#F8F9FA', fontFamily: 'Inter, sans-serif' }}>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <div style={{ background: '#1A1A2E', padding: '60px 20px', textAlign: 'center', color: 'white' }}>
                <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 12 }}>Upgrade your Business</h1>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, maxWidth: 500, margin: '0 auto 16px' }}>
                    Get advanced features designed for growing supermarkets and retail shops.
                </p>
                {user?.trialExpiresAt && (
                    <div style={{ display: 'inline-block', background: daysLeft > 0 ? 'rgba(52, 168, 83, 0.2)' : 'rgba(234, 67, 53, 0.2)', padding: '8px 16px', borderRadius: 12, marginBottom: 30, border: `1px solid ${daysLeft > 0 ? '#34A853' : '#EA4335'}` }}>
                        <p style={{ color: daysLeft > 0 ? '#A2E9B4' : '#FCE8E6', fontWeight: 700, fontSize: 14 }}>
                            {daysLeft > 0 ? `Your free trial expires in ${daysLeft} days` : 'Your free trial has expired!'}
                        </p>
                    </div>
                )}
                <div style={{ display: 'flex', background: 'rgba(255,255,255,0.1)', padding: 4, borderRadius: 12, width: 'fit-content', margin: '0 auto' }}>
                    <button
                        onClick={() => setBillingCycle('monthly')}
                        style={{ padding: '8px 20px', borderRadius: 8, border: 'none', background: billingCycle === 'monthly' ? '#4285F4' : 'transparent', color: 'white', fontWeight: 800, cursor: 'pointer', transition: '0.2s' }}>
                        Monthly
                    </button>
                    <button
                        onClick={() => setBillingCycle('yearly')}
                        style={{ padding: '8px 20px', borderRadius: 8, border: 'none', background: billingCycle === 'yearly' ? '#4285F4' : 'transparent', color: 'white', fontWeight: 800, cursor: 'pointer', transition: '0.2s', display: 'flex', alignItems: 'center', gap: 6 }}>
                        Yearly <span style={{ background: '#FBBC04', color: '#1A1A2E', fontSize: 10, padding: '2px 6px', borderRadius: 4, fontWeight: 900 }}>SAVE 33%</span>
                    </button>
                </div>
            </div>

            <div style={{ maxWidth: 1000, margin: '-40px auto 40px', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>

                {/* Free Trial / Redeem Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    <div style={{ background: 'white', borderRadius: 20, padding: 32, boxShadow: '0 8px 32px rgba(0,0,0,0.05)', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
                        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1A1A2E', display: 'flex', alignItems: 'center', gap: 8 }}><Gift size={20} color="#4285F4" /> Claim 28 Days Free Trial</h2>
                        <p style={{ color: '#718096', fontSize: 13, marginTop: 4, marginBottom: 16, lineHeight: 1.5 }}>
                            Enter your email or phone number to extend your initial 3-day trial to 31 days.
                        </p>

                        {!user?.trialClaimed ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {!otpSent ? (
                                    <>
                                        <input className="e-input" placeholder="Email or Phone number" value={claimInput} onChange={e => setClaimInput(e.target.value)} />
                                        <button onClick={handleSendOTP} className="btn btn-blue" style={{ width: '100%', justifyContent: 'center' }}>Send OTP</button>
                                    </>
                                ) : (
                                    <>
                                        <input className="e-input" placeholder="Enter OTP sent to you" value={otp} onChange={e => setOtp(e.target.value)} />
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <button onClick={() => setOtpSent(false)} className="btn btn-outline" style={{ flex: 1 }}>Back</button>
                                            <button onClick={handleVerifyClaim} className="btn btn-blue" style={{ flex: 1, justifyContent: 'center' }}>Verify & Claim</button>
                                        </div>
                                    </>
                                )}
                                {claimError && <p style={{ color: '#E53E3E', fontSize: 12, fontWeight: 600 }}>{claimError}</p>}
                            </div>
                        ) : (
                            <div style={{ background: '#F0FFF4', border: '1px solid #C6F6D5', padding: '12px', borderRadius: 8 }}>
                                <p style={{ color: '#276749', fontSize: 13, fontWeight: 700 }}>✅ You have already claimed your initial 28-day extension.</p>
                            </div>
                        )}
                        {claimSuccess && <p style={{ color: '#38A169', fontSize: 13, fontWeight: 700, marginTop: 12 }}>{claimSuccess}</p>}
                    </div>

                    <div style={{ background: 'white', borderRadius: 20, padding: 32, boxShadow: '0 8px 32px rgba(0,0,0,0.05)', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
                        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1A1A2E', display: 'flex', alignItems: 'center', gap: 8 }}><KeySquare size={20} color="#9333EA" /> Redeem Code</h2>
                        <p style={{ color: '#718096', fontSize: 13, marginTop: 4, marginBottom: 16 }}>
                            Have a redeem code from our team to extend your trial? Enter it below.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <input className="e-input" placeholder="Enter redeem code" value={redeemCode} onChange={e => setRedeemCode(e.target.value)} />
                            <button onClick={handleRedeem} className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', color: '#9333EA', borderColor: '#9333EA' }}>Redeem to Extend</button>
                        </div>
                        {redeemError && <p style={{ color: '#E53E3E', fontSize: 12, fontWeight: 600, marginTop: 12 }}>{redeemError}</p>}
                        {redeemSuccess && <p style={{ color: '#38A169', fontSize: 13, fontWeight: 700, marginTop: 12 }}>{redeemSuccess}</p>}
                    </div>
                </div>

                {/* Premium */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    <div style={{ background: '#1A1A2E', borderRadius: 20, padding: 32, boxShadow: '0 16px 40px rgba(66, 133, 244, 0.2)', border: '2px solid #4285F4', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #4285F4, #9333EA)', color: 'white', padding: '6px 16px', borderRadius: 20, fontSize: 12, fontWeight: 900, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
                            <Zap size={14} fill="currentColor" /> Premium (Best Value)
                        </div>
                        <h2 style={{ fontSize: 20, fontWeight: 800, color: 'white', marginTop: 12 }}>Premium Plan</h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: 4 }}>For power users & agencies</p>
                        <div style={{ margin: '24px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 24 }}>
                            <span style={{ fontSize: 40, fontWeight: 900, color: 'white' }}>₹{billingCycle === 'monthly' ? '400' : '4000'}</span>
                            <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>/{billingCycle}</span>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
                            <li style={{ display: 'flex', gap: 10, alignItems: 'center', color: 'white', fontSize: 14, fontWeight: 600 }}><Check size={18} color="#34A853" style={{ flexShrink: 0 }} /> Up to 5 Companies & 3 Godowns</li>
                            <li style={{ display: 'flex', gap: 10, alignItems: 'center', color: 'white', fontSize: 14, fontWeight: 600 }}><Zap size={18} color="#9333EA" style={{ flexShrink: 0 }} /> AI Analytics & Smart Scanners</li>
                            <li style={{ display: 'flex', gap: 10, alignItems: 'center', color: 'white', fontSize: 14, fontWeight: 600 }}><MessageCircle size={18} color="#34A853" style={{ flexShrink: 0 }} /> WhatsApp Auto-Messaging</li>
                        </ul>
                        <button onClick={() => initiateRazorpayPayment('Premium', billingCycle === 'monthly' ? 400 : 4000)} style={{ background: 'linear-gradient(135deg, #4285F4, #34A853)', color: 'white', padding: '14px', borderRadius: 10, border: 'none', fontWeight: 900, fontSize: 15, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, boxShadow: '0 4px 14px rgba(66,133,244,0.4)' }}>
                            Choose Premium <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Other Plans in a full width grid */}
            <div style={{ maxWidth: 1000, margin: '0 auto 40px', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
                {/* 80 rs Plan */}
                <div style={{ background: 'white', borderRadius: 20, padding: 32, boxShadow: '0 8px 32px rgba(0,0,0,0.05)', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1A1A2E' }}>Mobile Plan</h2>
                    <p style={{ color: '#718096', fontSize: 14, marginTop: 4 }}>For mobile quick billing</p>
                    <div style={{ margin: '24px 0', borderBottom: '1px solid #E2E8F0', paddingBottom: 24 }}>
                        <span style={{ fontSize: 40, fontWeight: 900, color: '#1A1A2E' }}>₹{billingCycle === 'monthly' ? '80' : '800'}</span>
                        <span style={{ color: '#A0AEC0', fontWeight: 600 }}>/{billingCycle}</span>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
                        <li style={{ display: 'flex', gap: 10, alignItems: 'center', color: '#4A5568', fontSize: 14, fontWeight: 600 }}><Check size={18} color="#34A853" style={{ flexShrink: 0 }} /> Mobile Devices Only</li>
                        <li style={{ display: 'flex', gap: 10, alignItems: 'center', color: '#4A5568', fontSize: 14, fontWeight: 600 }}><Check size={18} color="#34A853" style={{ flexShrink: 0 }} /> Quick POS Billing</li>
                        <li style={{ display: 'flex', gap: 10, alignItems: 'center', color: '#4A5568', fontSize: 14, fontWeight: 600 }}><Check size={18} color="#34A853" style={{ flexShrink: 0 }} /> 1 Company</li>
                    </ul>
                    <button onClick={() => initiateRazorpayPayment('Mobile', billingCycle === 'monthly' ? 80 : 800)} className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', borderColor: '#4285F4', color: '#4285F4' }}>Choose Mobile</button>
                </div>

                {/* 200 rs Plan */}
                <div style={{ background: 'white', borderRadius: 20, padding: 32, boxShadow: '0 8px 32px rgba(0,0,0,0.05)', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1A1A2E' }}>Standard Plan</h2>
                    <p style={{ color: '#718096', fontSize: 14, marginTop: 4 }}>For growing businesses</p>
                    <div style={{ margin: '24px 0', borderBottom: '1px solid #E2E8F0', paddingBottom: 24 }}>
                        <span style={{ fontSize: 40, fontWeight: 900, color: '#1A1A2E' }}>₹{billingCycle === 'monthly' ? '200' : '2000'}</span>
                        <span style={{ color: '#A0AEC0', fontWeight: 600 }}>/{billingCycle}</span>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
                        <li style={{ display: 'flex', gap: 10, alignItems: 'center', color: '#4A5568', fontSize: 14, fontWeight: 600 }}><Check size={18} color="#34A853" style={{ flexShrink: 0 }} /> Access on Any Device</li>
                        <li style={{ display: 'flex', gap: 10, alignItems: 'center', color: '#4A5568', fontSize: 14, fontWeight: 600 }}><Check size={18} color="#34A853" style={{ flexShrink: 0 }} /> Standard Billing & Inventory</li>
                        <li style={{ display: 'flex', gap: 10, alignItems: 'center', color: '#4A5568', fontSize: 14, fontWeight: 600 }}><ShieldCheck size={18} color="#34A853" style={{ flexShrink: 0 }} /> Cloud Backup</li>
                    </ul>
                    <button onClick={() => initiateRazorpayPayment('Standard', billingCycle === 'monthly' ? 200 : 2000)} className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', borderColor: '#9333EA', color: '#9333EA' }}>Choose Standard</button>
                </div>
            </div>

            {/* Payment History & Current Plan Info */}
            <div style={{ maxWidth: 1000, margin: '0 auto 60px', padding: '0 20px' }}>
                <div style={{ background: 'white', borderRadius: 20, padding: 32, boxShadow: '0 8px 32px rgba(0,0,0,0.05)', border: '1px solid #E2E8F0' }}>
                    <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1A1A2E', marginBottom: 20, borderBottom: '1px solid #edf2f7', paddingBottom: 16 }}>Your Current Subscription Info</h2>

                    <div style={{ display: 'flex', gap: 40, marginBottom: 40, flexWrap: 'wrap' }}>
                        <div>
                            <p style={{ fontSize: 13, color: '#718096', fontWeight: 600, marginBottom: 4 }}>Active Plan</p>
                            <p style={{ fontSize: 18, fontWeight: 900, color: '#1A1A2E', textTransform: 'capitalize' }}>{user?.subscriptionType || 'Free Trial'}</p>
                        </div>
                        <div>
                            <p style={{ fontSize: 13, color: '#718096', fontWeight: 600, marginBottom: 4 }}>Expires On</p>
                            <p style={{ fontSize: 18, fontWeight: 900, color: '#1A1A2E' }}>
                                {user?.subscriptionExpiresAt
                                    ? new Date(user.subscriptionExpiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                                    : user?.trialExpiresAt
                                        ? new Date(user.trialExpiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                                        : 'Never'}
                            </p>
                        </div>
                    </div>

                    <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1A1A2E', marginBottom: 16 }}>Payment History</h3>
                    {(!user?.paymentHistory || user.paymentHistory.length === 0) ? (
                        <p style={{ color: '#718096', fontSize: 13 }}>No previous payments found.</p>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid #edf2f7', color: '#718096' }}>
                                        <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>Date</th>
                                        <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>Plan</th>
                                        <th style={{ textAlign: 'center', padding: '12px 16px', fontWeight: 700 }}>Cycle</th>
                                        <th style={{ textAlign: 'right', padding: '12px 16px', fontWeight: 700 }}>Amount Paid</th>
                                        <th style={{ textAlign: 'center', padding: '12px 16px', fontWeight: 700 }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.paymentHistory.map((pmt, i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid #edf2f7' }}>
                                            <td style={{ padding: '16px' }}>{new Date(pmt.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                            <td style={{ padding: '16px', fontWeight: 700, color: '#1A1A2E' }}>{pmt.plan}</td>
                                            <td style={{ padding: '16px', textAlign: 'center', textTransform: 'capitalize' }}>{pmt.billingCycle}</td>
                                            <td style={{ padding: '16px', textAlign: 'right', fontWeight: 800 }}>₹{pmt.amount.toLocaleString()}</td>
                                            <td style={{ padding: '16px', textAlign: 'center' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                                                    <span style={{ background: pmt.status === 'paid' ? '#E8F5E9' : '#FCE8E6', color: pmt.status === 'paid' ? '#2E7D32' : '#C62828', padding: '4px 8px', borderRadius: 6, fontSize: 11, fontWeight: 800, textTransform: 'uppercase' }}>
                                                        {pmt.status}
                                                    </span>
                                                    {pmt.id && <span style={{ fontSize: 10, color: '#A0AEC0', fontFamily: 'monospace' }}>{pmt.id}</span>}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {(user?.trialExpiresAt || user?.subscriptionExpiresAt) && (
                <Link href="/companies" style={{ position: 'absolute', top: 20, left: 20, color: 'white', textDecoration: 'none', fontWeight: 700 }}>
                    ← Back
                </Link>
            )}
        </div>
    );
}
