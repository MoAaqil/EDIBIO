'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function KeyboardShortcuts() {
    const router = useRouter();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore if typing in input/textarea/editable
            const target = e.target as HTMLElement;
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable) {
                // Allow some global overrides like Escape
                if (e.key === 'Escape') {
                    target.blur(); // Unfocus inputs on escape
                }
                return;
            }

            // Ctrl/Cmd + Shift + N = New Invoice
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'n') {
                e.preventDefault();
                router.push('/company/billing/new');
                toast('Opening Quick Billing...', { icon: '⚡' });
            }

            // Ctrl/Cmd + Shift + I = Inventory
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'i') {
                e.preventDefault();
                router.push('/company/inventory');
                toast('Opening Inventory...', { icon: '📦' });
            }

            // Ctrl/Cmd + Shift + P = Parties
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'p') {
                e.preventDefault();
                router.push('/company/parties');
                toast('Opening Parties Directory...', { icon: '👥' });
            }

            // Ctrl/Cmd + Shift + S = Settings
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 's') {
                e.preventDefault();
                router.push('/company/settings');
                toast('Opening Settings...', { icon: '⚙️' });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [router]);

    return null;
}
