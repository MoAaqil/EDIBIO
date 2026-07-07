'use client';

import { useEffect, useRef } from 'react';
import { useStore } from '@/lib/store';

// Helper to push a system notification if permitted
export function sendSystemNotification(title: string, options: NotificationOptions = {}) {
    if (!('Notification' in window)) return;
    if (Notification.permission === 'granted') {
        try {
            new Notification(title, {
                icon: '/logo.png', // Uses Edibio logo
                badge: '/logo.png',
                ...options,
            });
        } catch (e) {
            // Android Chrome blocks the Notification constructor when installed as PWA
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.ready.then(registration => {
                    registration.showNotification(title, {
                        icon: '/logo.png',
                        badge: '/logo.png',
                        ...options,
                    }).catch(console.error);
                }).catch(console.error);
            }
        }
    }
}

export default function SystemNotifications() {
    const { user, companies } = useStore();
    const hasRequestedRef = useRef(false);
    const notificationsSentRef = useRef<Record<string, boolean>>({});

    useEffect(() => {
        // Only ask if downloaded as app (standalone) or manually requested later.
        // Doing it right away on mobile downloaded apps requires a smart PWA approach.
        // Let's ask once if the app is standalone (PWA/Android).
        const isStandalone = typeof window !== 'undefined' &&
            (window.matchMedia('(display-mode: standalone)').matches || ('standalone' in navigator && (navigator as any).standalone));

        if (isStandalone && !hasRequestedRef.current && 'Notification' in window && Notification.permission === 'default') {
            hasRequestedRef.current = true;
            // Delay permission request slightly to not aggressively block initial render
            setTimeout(() => {
                Notification.requestPermission();
            }, 3000);
        }
    }, []);

    // Effect to check conditions and trigger notifications
    useEffect(() => {
        if (!user || !('Notification' in window) || Notification.permission !== 'granted') return;

        // 1. FREE TRIAL ENDING
        if (user.trialExpiresAt) {
            const expiresDate = new Date(user.trialExpiresAt);
            const now = new Date();
            const daysLeft = Math.ceil((expiresDate.getTime() - now.getTime()) / (1000 * 3600 * 24));

            if (daysLeft <= 3 && daysLeft > 0) {
                const notifKey = `trial_${daysLeft}`;
                if (!notificationsSentRef.current[notifKey]) {
                    sendSystemNotification(`Free Trial Ending Soon`, {
                        body: `Your Edibio free trial ends in ${daysLeft} day(s). Upgrade to keep using all features.`,
                    });
                    notificationsSentRef.current[notifKey] = true;
                }
            } else if (daysLeft <= 0) {
                const notifKey = 'trial_expired';
                if (!notificationsSentRef.current[notifKey]) {
                    sendSystemNotification(`Trial Expired`, {
                        body: `Your Edibio free trial has expired. Subscribe to unlock access.`,
                    });
                    notificationsSentRef.current[notifKey] = true;
                }
            }
        }

        // 2. BILLING INTIMATION (Example: High balance amount due for customers, etc.)
        // This is a broad case, but we can set up periodic checks or listen for unread notifications from a DB eventually.
        // For now, if there's a company with a pending subscription renewal...
        if (user.role === 'owner') {
            companies.forEach(company => {
                const co = company as any;
                if (co.subscriptionEndsAt) {
                    const subEnds = new Date(co.subscriptionEndsAt);
                    const now = new Date();
                    const daysLeft = Math.ceil((subEnds.getTime() - now.getTime()) / (1000 * 3600 * 24));

                    if (daysLeft === 1) {
                        const notifKey = `sub_${company.id}_${daysLeft}`;
                        if (!notificationsSentRef.current[notifKey]) {
                            sendSystemNotification(`Subscription Renewing Tomorrow`, {
                                body: `Your subscription for ${company.name} is renewing tomorrow.`,
                            });
                            notificationsSentRef.current[notifKey] = true;
                        }
                    }
                }
            });
        }
    }, [user, companies]);

    return <></>; // Purely logical component
}
