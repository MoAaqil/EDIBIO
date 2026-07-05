'use client';
/**
 * Subscription Plan System
 * Plans: Free Trial (21 days), Basic (₹250/mo), Premium (₹2000/yr)
 * Stored locally. In production would verify with backend.
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PlanId = 'trial' | 'basic' | 'premium';

export interface Subscription {
    planId: PlanId;
    startDate: string;
    endDate: string;
    isActive: boolean;
    trialUsed: boolean;
}

interface SubState {
    subscription: Subscription | null;
    initTrial: () => void;
    upgradePlan: (planId: PlanId) => void;
    isFeatureAllowed: (feature: string) => boolean;
}

const PLAN_FEATURES: Record<PlanId, string[]> = {
    trial: ['billing', 'inventory', 'parties', 'reports', 'max_3_companies', 'max_2_godowns'],
    basic: ['billing', 'inventory', 'parties', 'reports', 'expenses', 'templates', 'csv_export', 'max_3_companies', 'max_2_godowns', 'whatsapp_invoice', 'print'],
    premium: ['billing', 'inventory', 'parties', 'reports', 'expenses', 'templates', 'csv_export', 'max_4_companies', 'max_2_godowns', 'whatsapp_invoice', 'print', 'ai_assistant', 'auto_backup', 'barcode_scanner', 'pos_mode', 'multi_counter', 'advanced_reports'],
};

export const useSubscription = create<SubState>()(
    persist(
        (set, get) => ({
            subscription: null,
            initTrial: () => {
                const start = new Date().toISOString();
                const end = new Date(Date.now() + 21 * 86400000).toISOString();
                set({ subscription: { planId: 'trial', startDate: start, endDate: end, isActive: true, trialUsed: true } });
            },
            upgradePlan: (planId) => {
                const start = new Date().toISOString();
                const durationMs = planId === 'premium' ? 365 * 86400000 : 30 * 86400000;
                const end = new Date(Date.now() + durationMs).toISOString();
                set({ subscription: { planId, startDate: start, endDate: end, isActive: true, trialUsed: true } });
            },
            isFeatureAllowed: (feature) => {
                const { subscription } = get();
                if (!subscription) return false;
                const now = new Date();
                const end = new Date(subscription.endDate);
                if (now > end) return false;
                return PLAN_FEATURES[subscription.planId]?.includes(feature) ?? false;
            },
        }),
        { name: 'edibio-subscription' }
    )
);

export const PLANS = [
    {
        id: 'trial' as PlanId, name: 'Free Trial', price: 0, period: '21 days',
        color: '#718096', emoji: '🌱',
        features: ['3 Companies', '2 Godowns each', 'Billing & Inventory', 'Basic Reports', 'CSV Export'],
        limits: ['No Expenses page', 'No AI Assistant', 'No WhatsApp Invoicing'],
    },
    {
        id: 'basic' as PlanId, name: 'Basic', price: 250, period: 'per month',
        yearlyPrice: 2000, yearlyPeriod: 'per year (save ₹1,000)',
        color: '#4285F4', emoji: '⚡',
        features: ['3 Companies', '2 Godowns each', 'Everything in Trial', 'Expenses (password-locked)', 'WhatsApp Invoice', 'Print Invoices', 'Invoice Templates', 'Offline Sync'],
        limits: ['No AI Assistant', 'No POS Counter mode'],
        popular: true,
    },
    {
        id: 'premium' as PlanId, name: 'Premium', price: 500, period: 'per month',
        yearlyPrice: 4999, yearlyPeriod: 'per year',
        color: '#9333EA', emoji: '👑',
        features: ['4 Companies', '2 Godowns each', 'Everything in Basic', 'AI Billing Assistant', 'POS Counter Mode', 'Barcode Scanner', 'Advanced Reports', 'Multi-Counter Billing', 'Priority Support'],
        limits: [],
    },
];
