'use client';
import { useState, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS, Step, TooltipRenderProps } from 'react-joyride';

const CustomTooltip = ({ index, step, backProps, primaryProps, skipProps, tooltipProps, isLastStep }: TooltipRenderProps) => (
    <div {...tooltipProps} style={{ background: 'white', border: '1px solid rgba(0,0,0,0.05)', borderRadius: 24, width: 340, padding: 0, overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)' }}>
        <div style={{ padding: '24px 24px 4px' }}>
            {step.content}
        </div>
        <div style={{ padding: '20px 24px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 6 }}>
                {[0, 1, 2, 3, 4].map(i => (
                    <div key={i} style={{ width: index === i ? 20 : 6, height: 6, borderRadius: 3, background: index === i ? '#4285F4' : '#E2E8F0', transition: 'all 0.3s ease-out' }} />
                ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
                {index > 0 && <button {...backProps} style={{ padding: '8px 14px', border: 'none', background: 'transparent', color: '#718096', fontWeight: 700, fontSize: 12, cursor: 'pointer', borderRadius: 10, transition: 'background 0.15s' }} onMouseOver={e => e.currentTarget.style.background = '#F7FAFC'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>Back</button>}
                <button {...primaryProps} style={{ padding: '8px 18px', border: 'none', background: '#4285F4', color: 'white', fontWeight: 800, fontSize: 13, cursor: 'pointer', borderRadius: 12, boxShadow: '0 4px 14px rgba(66, 133, 244, 0.4)', transition: 'transform 0.1s' }} onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'} onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}>
                    {isLastStep ? '🚀 Finish Setup' : 'Next →'}
                </button>
            </div>
        </div>
        {index === 0 && (
            <button {...skipProps} style={{ position: 'absolute', top: 16, right: 16, border: 'none', background: 'rgba(0,0,0,0.05)', color: '#4A5568', cursor: 'pointer', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 99 }}>Skip Tutorial</button>
        )}
    </div>
);

export default function Tutorial() {
    const [run, setRun] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Run tutorial once automatically if it hasn't been completed before
        const hasSeenTutorial = localStorage.getItem('edibio_tutorial_completed');
        if (!hasSeenTutorial) {
            setTimeout(() => setRun(true), 1500); // Small delay to let UI mount
        }

        // Listen for manual trigger from anywhere in the app
        const handleStartTutorial = () => setRun(true);
        window.addEventListener('start-edibio-tutorial', handleStartTutorial);
        return () => window.removeEventListener('start-edibio-tutorial', handleStartTutorial);
    }, []);

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { status, type } = data;

        // If finished or skipped
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status as any)) {
            setRun(false);
            localStorage.setItem('edibio_tutorial_completed', 'true');
        }
    };

    const isMobile = mounted && typeof window !== 'undefined' ? window.innerWidth <= 768 : false;

    const steps: Step[] = [
        {
            target: 'body',
            content: (
                <div style={{ textAlign: 'center' }}>
                    <div style={{ width: 64, height: 64, borderRadius: 16, background: '#E8F0FE', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 32 }}>👋</div>
                    <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 8, color: '#1A1A2E', lineHeight: 1.2 }}>Welcome to <span style={{ color: '#4285F4' }}>Edibio</span>!</h2>
                    <p style={{ fontSize: 14, color: '#4A5568', lineHeight: 1.5 }}>Let's take a quick 30-second tour to unlock your business's new superpower.</p>
                </div>
            ),
            placement: 'center',
            disableBeacon: true,
        },
        {
            target: isMobile ? '.bottom-nav-billing' : '.quick-billing-btn',
            content: (
                <div>
                    <h3 style={{ fontSize: 16, marginBottom: 4, color: '#1A202C' }}>⚡ Quick Billing</h3>
                    <p style={{ fontSize: 13, color: '#4A5568' }}>Click here to jump into high-speed billing. Sell items, parse barcodes, manage refunds, and apply discounts instantly.</p>
                </div>
            ),
            placement: isMobile ? 'top' : 'right',
        },
        {
            target: isMobile ? '.bottom-nav-inventory' : '.sidebar-nav-item[href*="/inventory"]',
            content: (
                <div>
                    <h3 style={{ fontSize: 16, marginBottom: 4, color: '#1A202C' }}>📦 Inventory Hub</h3>
                    <p style={{ fontSize: 13, color: '#4A5568' }}>Track your stock levels in real-time. Setup low-stock alerts, manage variants, and assign HSN/Barcode tags.</p>
                </div>
            ),
            placement: isMobile ? 'top' : 'right',
        },
        {
            target: isMobile ? '.bottom-nav-settings' : '.sidebar-nav-item[href*="/settings/templates"]',
            content: (
                <div>
                    <h3 style={{ fontSize: 16, marginBottom: 4, color: '#1A202C' }}>🎨 Powerful Templates</h3>
                    <p style={{ fontSize: 13, color: '#4A5568' }}>Customize your invoices! Adjust columns, branding colors, and apply a fresh visual theme with real-time live preview.</p>
                </div>
            ),
            placement: isMobile ? 'top' : 'right',
        },
        {
            target: '.topbar-user',
            content: (
                <div>
                    <h3 style={{ fontSize: 16, marginBottom: 4, color: '#1A202C' }}>👑 Superuser Account</h3>
                    <p style={{ fontSize: 13, color: '#4A5568' }}>Expand this menu to replay this tutorial, configure sync settings, or log out of your workstation safely.</p>
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
            showProgress={true}
            floaterProps={{ disableAnimation: false, styles: { floater: { filter: 'drop-shadow(0px 8px 24px rgba(0,0,0,0.12))' } } }}
            tooltipComponent={CustomTooltip}
            styles={{
                options: {
                    zIndex: 10000,
                    arrowColor: '#fff',
                },
                spotlight: { borderRadius: 12 },
                overlay: { backgroundColor: 'rgba(15, 23, 42, 0.6)' }
            }}
            callback={handleJoyrideCallback}
        />
    );
}
