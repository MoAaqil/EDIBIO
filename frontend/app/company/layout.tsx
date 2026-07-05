'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useStore, useUserCompanies } from '@/lib/store';
import Link from 'next/link';
import AppLayout from '@/components/AppLayout';

export default function CompanyRootLayout({ children }: { children: React.ReactNode }) {
    const { activeCompanyId, setActiveCompany, isAuthenticated, isHydrating, isDemo, demoExpiresAt, logout, user } = useStore();
    const companyId = activeCompanyId;
    const companies = useUserCompanies();
    const router = useRouter();
    const [isMobileDevice, setIsMobileDevice] = useState(true);

    const isExpired = isDemo && demoExpiresAt && new Date() > new Date(demoExpiresAt);

    useEffect(() => {
        setIsMobileDevice(window.innerWidth <= 768);
        const handleResize = () => setIsMobileDevice(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);

        if (isHydrating) return;
        if (!isAuthenticated) { router.replace('/login'); return; }

        const co = companies.find((c: any) => c.id === companyId);
        if (!co) { router.replace('/companies'); return; }
        setActiveCompany(companyId);

        return () => window.removeEventListener('resize', handleResize);
    }, [companyId, isAuthenticated, isHydrating, companies, router, setActiveCompany]);

    if (isExpired) {
        return (
            <div style={{
                height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', background: '#F8F9FA', textAlign: 'center', padding: 20
            }}>
                <div style={{ background: 'white', padding: 40, borderRadius: 24, boxShadow: '0 20px 50px rgba(0,0,0,0.1)', maxWidth: 400 }}>
                    <div style={{ width: 80, height: 80, background: '#FEF2F2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                        <span style={{ fontSize: 40 }}>🔒</span>
                    </div>
                    <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1A1A2E', marginBottom: 16 }}>Demo Session Locked</h2>
                    <p style={{ color: '#718096', lineHeight: 1.6, marginBottom: 32 }}>
                        Your 1-hour demo session has expired. To continue using Edibio, please create a free account or sign in.
                    </p>
                    <button
                        onClick={() => {
                            logout();
                            router.replace('/login');
                        }}
                        style={{
                            width: '100%', padding: '16px', background: '#4285F4', color: 'white',
                            borderRadius: 16, border: 'none', fontWeight: 700, cursor: 'pointer',
                            boxShadow: '0 8px 16px rgba(66, 133, 244, 0.25)'
                        }}
                    >
                        Return to Login
                    </button>
                    <p style={{ marginTop: 24, fontSize: 13, color: '#A0AEC0' }}>
                        All your data is saved locally on this device.
                    </p>
                </div>
            </div>
        );
    }

    const isMobilePlan = user?.subscriptionType === 'mobile' && !isDemo;

    if (isMobilePlan && !isMobileDevice) {
        return (
            <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', textAlign: 'center', padding: 20 }}>
                <div style={{ background: 'white', padding: '40px 30px', borderRadius: 24, boxShadow: '0 20px 50px rgba(0,0,0,0.08)', border: '1px solid #E2E8F0', maxWidth: 440 }}>
                    <div style={{ width: 80, height: 80, background: '#EFF6FF', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: '#3B82F6' }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                    </div>
                    <h2 style={{ fontSize: 22, fontWeight: 900, color: '#1E293B', marginBottom: 16 }}>Mobile App Only</h2>
                    <p style={{ color: '#64748B', lineHeight: 1.6, marginBottom: 32, fontSize: 14 }}>
                        Your current <strong>Mobile Plan</strong> only allows access from a smartphone device. To use Edibio on a Desktop or Tablet PC, please upgrade your plan.
                    </p>
                    <Link href="/subscription" style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>
                        <button style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #3B82F6, #6366F1)', color: 'white', borderRadius: 16, border: 'none', fontWeight: 800, fontSize: 15, cursor: 'pointer', boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)' }}>
                            Upgrade Plan
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return <AppLayout>{children}</AppLayout>;
}
