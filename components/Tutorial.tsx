'use client';
import { useState, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS, Step, TooltipRenderProps } from 'react-joyride';

const TOTAL_STEPS = 11;

const CustomTooltip = ({ index, step, backProps, primaryProps, skipProps, tooltipProps, isLastStep }: TooltipRenderProps) => (
    <div {...tooltipProps} style={{ background: 'white', border: '1px solid rgba(0,0,0,0.05)', borderRadius: 24, width: 350, padding: 0, overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)' }}>
        <div style={{ padding: '24px 24px 4px' }}>
            {step.content}
        </div>
        <div style={{ padding: '16px 24px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', maxWidth: 160 }}>
                {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                    <div key={i} style={{ width: index === i ? 18 : 5, height: 5, borderRadius: 3, background: index === i ? '#4285F4' : i < index ? '#BBD4FE' : '#E2E8F0', transition: 'all 0.3s ease-out' }} />
                ))}
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: '#A0AEC0', fontWeight: 700 }}>{index + 1}/{TOTAL_STEPS}</span>
                {index > 0 && <button {...backProps} style={{ padding: '8px 14px', border: 'none', background: 'transparent', color: '#718096', fontWeight: 700, fontSize: 12, cursor: 'pointer', borderRadius: 10, transition: 'background 0.15s' }} onMouseOver={e => e.currentTarget.style.background = '#F7FAFC'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>Back</button>}
                <button {...primaryProps} style={{ padding: '8px 18px', border: 'none', background: isLastStep ? 'linear-gradient(135deg, #34A853, #1E7E34)' : '#4285F4', color: 'white', fontWeight: 800, fontSize: 13, cursor: 'pointer', borderRadius: 12, boxShadow: isLastStep ? '0 4px 14px rgba(52,168,83,0.4)' : '0 4px 14px rgba(66,133,244,0.4)', transition: 'transform 0.1s' }} onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'} onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}>
                    {isLastStep ? '🚀 Got it!' : 'Next →'}
                </button>
            </div>
        </div>
        {index === 0 && (
            <button {...skipProps} style={{ position: 'absolute', top: 14, right: 14, border: 'none', background: 'rgba(0,0,0,0.05)', color: '#4A5568', cursor: 'pointer', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 99 }}>Skip Tour</button>
        )}
    </div>
);

export default function Tutorial() {
    const [run, setRun] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const hasSeenTutorial = localStorage.getItem('edibio_tutorial_completed');
        if (!hasSeenTutorial) {
            setTimeout(() => setRun(true), 1500);
        }
        const handleStartTutorial = () => {
            localStorage.removeItem('edibio_tutorial_completed');
            setRun(false);
            setTimeout(() => setRun(true), 100);
        };
        window.addEventListener('start-edibio-tutorial', handleStartTutorial);
        return () => window.removeEventListener('start-edibio-tutorial', handleStartTutorial);
    }, []);

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { status } = data;
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status as any)) {
            setRun(false);
            localStorage.setItem('edibio_tutorial_completed', 'true');
        }
    };

    const isMobile = mounted && typeof window !== 'undefined' ? window.innerWidth <= 768 : false;

    const steps: Step[] = [
        // 0 — Welcome
        {
            target: 'body',
            content: (
                <div style={{ textAlign: 'center' }}>
                    <div style={{ width: 72, height: 72, borderRadius: 20, background: 'linear-gradient(135deg, #E8F0FE, #E8F5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 36 }}>👋</div>
                    <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 8, color: '#1A1A2E', lineHeight: 1.2 }}>Welcome to <span style={{ color: '#4285F4' }}>Edibio</span>!</h2>
                    <p style={{ fontSize: 14, color: '#4A5568', lineHeight: 1.6, margin: 0 }}>Let's take a quick tour of your ERP. This covers all the key features so you can start billing and managing stock in minutes.</p>
                </div>
            ),
            placement: 'center',
            disableBeacon: true,
        },
        // 1 — Quick Billing
        {
            target: isMobile ? '.bottom-nav-billing' : '.quick-billing-btn',
            content: (
                <div>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>⚡</div>
                    <h3 style={{ fontSize: 16, fontWeight: 900, marginBottom: 6, color: '#1A202C' }}>Quick Billing</h3>
                    <p style={{ fontSize: 13, color: '#4A5568', lineHeight: 1.6, margin: 0 }}>Your fastest billing window. Type a customer name, scan or search products, enter the amount paid, and hit <strong>F12</strong> to save. The invoice auto-numbers itself.</p>
                    <div style={{ marginTop: 10, padding: '8px 12px', background: '#EBF3FF', borderRadius: 10, fontSize: 12, color: '#3B82F6', fontWeight: 700 }}>
                        💡 Tip: Press Ctrl+B to open Quick Billing anytime
                    </div>
                </div>
            ),
            placement: isMobile ? 'top' : 'right',
        },
        // 2 — Split Payment
        {
            target: isMobile ? '.bottom-nav-billing' : '.quick-billing-btn',
            content: (
                <div>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>💳</div>
                    <h3 style={{ fontSize: 16, fontWeight: 900, marginBottom: 6, color: '#1A202C' }}>Split Payments</h3>
                    <p style={{ fontSize: 13, color: '#4A5568', lineHeight: 1.6, margin: 0 }}>A customer can pay part in <strong>Cash</strong> and part via <strong>UPI</strong> on the same bill. Click <strong>Split Payment</strong> in the billing footer, enter each method's amount, and both are recorded.</p>
                </div>
            ),
            placement: isMobile ? 'top' : 'right',
        },
        // 3 — Balance Tracker
        {
            target: isMobile ? '.bottom-nav-billing' : '.quick-billing-btn',
            content: (
                <div>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>💰</div>
                    <h3 style={{ fontSize: 16, fontWeight: 900, marginBottom: 6, color: '#1A202C' }}>Customer Balance Tracker</h3>
                    <p style={{ fontSize: 13, color: '#4A5568', lineHeight: 1.6, margin: 0 }}>Click <strong>Balance</strong> at the top of Quick Billing to see all customers with outstanding dues. Enter the amount they're paying and click <strong>Record Payment</strong>. This updates both their balance and the Daily Report.</p>
                    <div style={{ marginTop: 10, padding: '8px 12px', background: '#FFF3E0', borderRadius: 10, fontSize: 12, color: '#E65100', fontWeight: 700 }}>
                        ⚠️ Same phone = same customer, even if names differ
                    </div>
                </div>
            ),
            placement: isMobile ? 'top' : 'right',
        },
        // 4 — Inventory
        {
            target: isMobile ? '.bottom-nav-inventory' : '.sidebar-nav-item[href*="/inventory"]',
            content: (
                <div>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>📦</div>
                    <h3 style={{ fontSize: 16, fontWeight: 900, marginBottom: 6, color: '#1A202C' }}>Inventory Hub</h3>
                    <p style={{ fontSize: 13, color: '#4A5568', lineHeight: 1.6, margin: 0 }}>Add and manage all your products. Each sale <strong>automatically deducts</strong> stock. Set a <strong>Low Stock Alert</strong> level to get notified before you run out.</p>
                </div>
            ),
            placement: isMobile ? 'top' : 'right',
        },
        // 5 — Expiry & Batch
        {
            target: isMobile ? '.bottom-nav-inventory' : '.sidebar-nav-item[href*="/inventory"]',
            content: (
                <div>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>🗓️</div>
                    <h3 style={{ fontSize: 16, fontWeight: 900, marginBottom: 6, color: '#1A202C' }}>Batch & Expiry Tracking</h3>
                    <p style={{ fontSize: 13, color: '#4A5568', lineHeight: 1.6, margin: 0 }}>For food or pharma products, track <strong>Batch Numbers</strong> and <strong>Expiry Dates</strong>. The Expiry Calendar shows red for expired, yellow for expiring within 30 days.</p>
                </div>
            ),
            placement: isMobile ? 'top' : 'right',
        },
        // 6 — Purchase Orders
        {
            target: isMobile ? '.bottom-nav-inventory' : '.sidebar-nav-item[href*="/inventory"]',
            content: (
                <div>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>🛒</div>
                    <h3 style={{ fontSize: 16, fontWeight: 900, marginBottom: 6, color: '#1A202C' }}>Purchase Orders</h3>
                    <p style={{ fontSize: 13, color: '#4A5568', lineHeight: 1.6, margin: 0 }}>Create <strong>POs</strong> for suppliers before stock arrives. When goods come in, convert the PO to a <strong>Purchase Invoice</strong> with one click — stock adds automatically.</p>
                </div>
            ),
            placement: isMobile ? 'top' : 'right',
        },
        // 7 — Parties
        {
            target: isMobile ? '.bottom-nav-parties' : '.sidebar-nav-item[href*="/parties"]',
            content: (
                <div>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>👥</div>
                    <h3 style={{ fontSize: 16, fontWeight: 900, marginBottom: 6, color: '#1A202C' }}>Parties — Customers & Suppliers</h3>
                    <p style={{ fontSize: 13, color: '#4A5568', lineHeight: 1.6, margin: 0 }}>View all your contacts with their outstanding balance. Click the <strong>💹 icon</strong> on any customer to record a payment — it shows up in today's Daily Report.</p>
                </div>
            ),
            placement: isMobile ? 'top' : 'right',
        },
        // 8 — Reports
        {
            target: isMobile ? '.bottom-nav-reports' : '.sidebar-nav-item[href*="/reports"]',
            content: (
                <div>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>📊</div>
                    <h3 style={{ fontSize: 16, fontWeight: 900, marginBottom: 6, color: '#1A202C' }}>Reports & Daily Close</h3>
                    <p style={{ fontSize: 13, color: '#4A5568', lineHeight: 1.6, margin: 0 }}>
                        The <strong>Daily Closing Report</strong> gives you: total sales, collected cash, outstanding dues (grouped by customer phone), balance repayments for today, and a Net Cash figure.
                    </p>
                    <div style={{ marginTop: 10, padding: '8px 12px', background: '#F0FDF4', borderRadius: 10, fontSize: 12, color: '#15803D', fontWeight: 700 }}>
                        📅 Pick any past date to view historical reports
                    </div>
                </div>
            ),
            placement: isMobile ? 'top' : 'right',
        },
        // 9 — Templates
        {
            target: isMobile ? '.bottom-nav-settings' : '.sidebar-nav-item[href*="/templates"]',
            content: (
                <div>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>🎨</div>
                    <h3 style={{ fontSize: 16, fontWeight: 900, marginBottom: 6, color: '#1A202C' }}>Invoice Templates</h3>
                    <p style={{ fontSize: 13, color: '#4A5568', lineHeight: 1.6, margin: 0 }}>Customize your invoice layout — logo, colors, which columns to show, GST format, and thermal/A4 size. Changes preview live before you save.</p>
                </div>
            ),
            placement: isMobile ? 'top' : 'right',
        },
        // 10 — Help & Account
        {
            target: '.topbar-user',
            content: (
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>🎉</div>
                    <h3 style={{ fontSize: 16, fontWeight: 900, marginBottom: 6, color: '#1A202C' }}>You're all set!</h3>
                    <p style={{ fontSize: 13, color: '#4A5568', lineHeight: 1.6, margin: 0 }}>Need help anytime? Visit <strong>Help Center</strong> in the sidebar. To replay this tour, click your name in the top-right → <strong>Replay Tutorial</strong>.</p>
                    <div style={{ marginTop: 12, padding: '10px 14px', background: 'linear-gradient(135deg, #E8F0FE, #E8F5E9)', borderRadius: 12, fontSize: 13, color: '#1A202C', fontWeight: 700 }}>
                        💪 Start with Quick Billing — create your first invoice!
                    </div>
                </div>
            ),
            placement: 'bottom-end',
        },
    ];

    if (!mounted) return null;

    return (
        <Joyride
            steps={steps}
            run={run}
            continuous={true}
            showSkipButton={true}
            showProgress={false}
            floaterProps={{ disableAnimation: false, styles: { floater: { filter: 'drop-shadow(0px 8px 24px rgba(0,0,0,0.12))' } } }}
            tooltipComponent={CustomTooltip}
            styles={{
                options: { zIndex: 10000, arrowColor: '#fff' },
                spotlight: { borderRadius: 12 },
                overlay: { backgroundColor: 'rgba(15, 23, 42, 0.6)' }
            }}
            callback={handleJoyrideCallback}
        />
    );
}
