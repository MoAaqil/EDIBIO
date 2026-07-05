'use client';
import { useStore } from '@/lib/store';
import Link from 'next/link';
import { Lock } from 'lucide-react';

// ─── Feature definitions by plan ────────────────────────────────────────────
export type Feature =
    | 'ai_scanner'
    | 'ai_analytics'
    | 'whatsapp'
    | 'gst_reports'
    | 'multi_company'   // > 1 company
    | 'cloud_backup'
    | 'school_erp'
    | 'agency_module'
    | 'restaurant_pos'
    | 'unlimited_companies'
    | 'quick_billing_only';

const PLAN_FEATURES: Record<string, Feature[]> = {
    free: ['cloud_backup'],
    mobile: ['cloud_backup', 'quick_billing_only'],
    standard: ['cloud_backup', 'gst_reports', 'restaurant_pos'],
    premium: ['ai_scanner', 'ai_analytics', 'whatsapp', 'gst_reports', 'multi_company', 'cloud_backup', 'school_erp', 'agency_module', 'restaurant_pos', 'unlimited_companies'],
    // Demo gets premium-level access so visitors can explore
    demo: ['ai_scanner', 'ai_analytics', 'whatsapp', 'gst_reports', 'multi_company', 'cloud_backup', 'restaurant_pos'],
};

import { EdibioUser } from '@/lib/types';

export function canAccess(feature: Feature, user: EdibioUser | null, isDemo?: boolean): boolean {
    if (isDemo) return PLAN_FEATURES.demo.includes(feature);
    if (!user) return false;

    // Active trials get full Premium access until they expire/upgrade
    const isTrialActive = user.trialExpiresAt && new Date(user.trialExpiresAt).getTime() > Date.now();
    if (isTrialActive && !user.subscriptionType) {
        // Only grant access if the feature exists in the premium array
        return PLAN_FEATURES.premium.includes(feature);
    }

    const plan = user.subscriptionType?.toLowerCase() || 'free';
    return (PLAN_FEATURES[plan] || PLAN_FEATURES.free).includes(feature);
}

interface FeatureGateProps {
    feature: Feature;
    children: React.ReactNode;
    /** If true, renders a blurred/locked overlay rather than hiding the child entirely */
    overlay?: boolean;
    /** Short description shown in the upgrade prompt */
    description?: string;
}

export default function FeatureGate({ feature, children, overlay = false, description }: FeatureGateProps) {
    const { user, isDemo } = useStore();
    const hasAccess = canAccess(feature, user, isDemo);

    if (hasAccess) return <>{children}</>;

    const lockEl = (
        <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 10, padding: '20px 16px', textAlign: 'center',
        }}>
            <div style={{
                width: 48, height: 48, borderRadius: 14, background: '#F1F3F5',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                <Lock size={22} color="#718096" />
            </div>
            <p style={{ fontWeight: 700, fontSize: 13, color: '#2D3748', margin: 0 }}>
                {description || 'Pro Feature'}
            </p>
            <p style={{ fontSize: 12, color: '#A0AEC0', margin: 0, lineHeight: 1.4 }}>
                Upgrade your plan to unlock this feature.
            </p>
            <Link href="/subscription" style={{
                marginTop: 4, padding: '8px 20px', background: 'linear-gradient(135deg, #4285F4, #9333EA)',
                color: 'white', borderRadius: 10, fontWeight: 700, fontSize: 12, textDecoration: 'none',
                display: 'inline-block', boxShadow: '0 4px 12px rgba(66,133,244,0.3)',
            }}>
                Upgrade Now →
            </Link>
        </div>
    );

    if (overlay) {
        return (
            <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ filter: 'blur(4px)', pointerEvents: 'none', userSelect: 'none', opacity: 0.4 }}>
                    {children}
                </div>
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(2px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    {lockEl}
                </div>
            </div>
        );
    }

    return (
        <div className="card" style={{ border: '1.5px dashed #E2E8F0' }}>
            {lockEl}
        </div>
    );
}
