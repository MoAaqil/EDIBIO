'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useStore } from '@/lib/store';
import { X, Play, BookOpen, Keyboard } from 'lucide-react';

export default function KeyboardShortcuts() {
    const router = useRouter();
    const { activeCompanyId } = useStore();
    const [isOpen, setIsOpen] = useState(false);

    const base = activeCompanyId ? '/company' : '';

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore if typing in input/textarea/editable
            const target = e.target as HTMLElement;
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable) {
                if (e.key === 'Escape') {
                    target.blur(); // Unfocus inputs on escape
                }
                return;
            }

            // '?' = Open Shortcuts Modal
            if (e.key === '?') {
                e.preventDefault();
                setIsOpen(prev => !prev);
                return;
            }

            // Ctrl/Cmd + Shift + N = New Invoice
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'n') {
                e.preventDefault();
                router.push(`${base}/billing/new`);
                toast('Opening Quick Billing...', { icon: '⚡' });
            }

            // Ctrl/Cmd + Shift + I = Inventory
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'i') {
                e.preventDefault();
                router.push(`${base}/inventory`);
                toast('Opening Inventory...', { icon: '📦' });
            }

            // Ctrl/Cmd + Shift + P = Parties
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'p') {
                e.preventDefault();
                router.push(`${base}/parties`);
                toast('Opening Parties Directory...', { icon: '👥' });
            }

            // Ctrl/Cmd + Shift + S = Settings
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 's') {
                e.preventDefault();
                router.push(`${base}/settings`);
                toast('Opening Settings...', { icon: '⚙️' });
            }

            // Ctrl/Cmd + Shift + H = Help Center
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'h') {
                e.preventDefault();
                router.push(`${base}/help`);
                toast('Opening Help Center...', { icon: '📖' });
            }

            // Ctrl/Cmd + B = Quick Billing
            if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === 'b') {
                e.preventDefault();
                router.push(`${base}/billing/quick`);
                toast('Opening Quick Billing...', { icon: '⚡' });
            }

            // Ctrl/Cmd + D = Dashboard
            if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === 'd') {
                e.preventDefault();
                router.push(`${base}/dashboard`);
                toast('Opening Dashboard...', { icon: '📊' });
            }

            // Ctrl/Cmd + R = Reports
            if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === 'r') {
                e.preventDefault();
                router.push(`${base}/reports`);
                toast('Opening Reports...', { icon: '📈' });
            }
        };

        const handleOpenShortcuts = () => {
            setIsOpen(true);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('open-shortcuts-guide', handleOpenShortcuts);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('open-shortcuts-guide', handleOpenShortcuts);
        };
    }, [router, base]);

    if (!isOpen) return null;

    const groups = [
        {
            title: '⚡ Navigation',
            shortcuts: [
                { keys: ['Ctrl', 'D'], desc: 'Open Dashboard' },
                { keys: ['Ctrl', 'B'], desc: 'Open Quick Billing' },
                { keys: ['Ctrl', 'R'], desc: 'Open Reports & Close Day' },
                { keys: ['Ctrl', 'Shift', 'I'], desc: 'Open Inventory' },
                { keys: ['Ctrl', 'Shift', 'P'], desc: 'Open Parties Directory' },
                { keys: ['Ctrl', 'Shift', 'S'], desc: 'Open Settings' },
                { keys: ['Ctrl', 'Shift', 'H'], desc: 'Open Help Center' },
            ]
        },
        {
            title: '✍️ Quick Billing Page',
            shortcuts: [
                { keys: ['F12'], desc: 'Save & Print Invoice' },
                { keys: ['Shift', 'Enter'], desc: 'Add new item row' },
                { keys: ['Esc'], desc: 'Close any modal / Unfocus fields' },
            ]
        },
        {
            title: '💡 General Actions',
            shortcuts: [
                { keys: ['?'], desc: 'Toggle Keyboard Shortcuts Guide' },
            ]
        }
    ];

    return (
        <div className="modal-overlay" style={{ zIndex: 11000 }} onClick={() => setIsOpen(false)}>
            <div className="modal-box" style={{ maxWidth: 520, padding: 0, overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div style={{ padding: '20px 24px', borderBottom: '1px solid #EDF2F7', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: '#EBF8FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Keyboard size={18} color="#3182CE" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: 16, fontWeight: 900, color: '#1A202C', margin: 0 }}>Keyboard Shortcuts</h3>
                            <p style={{ fontSize: 11, color: '#718096', margin: '2px 0 0' }}>Accelerate your workflow in Edibio</p>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} style={{ background: '#EDF2F7', border: 'none', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.15s' }}>
                        <X size={14} color="#4A5568" />
                    </button>
                </div>

                {/* Body */}
                <div className="modal-scroll-body" style={{ padding: '20px 24px', maxHeight: '60dvh' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {groups.map(g => (
                            <div key={g.title}>
                                <h4 style={{ fontSize: 12, fontWeight: 800, color: '#4A5568', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>{g.title}</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {g.shortcuts.map(s => (
                                        <div key={s.desc} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px dashed #EDF2F7' }}>
                                            <span style={{ fontSize: 13, color: '#4A5568', fontWeight: 500 }}>{s.desc}</span>
                                            <div style={{ display: 'flex', gap: 4 }}>
                                                {s.keys.map(k => (
                                                    <kbd key={k} style={{
                                                        background: '#F7FAFC', border: '1px solid #CBD5E0',
                                                        borderBottom: '2px solid #A0AEC0', borderRadius: 6,
                                                        padding: '2px 8px', fontSize: 11, fontWeight: 800,
                                                        color: '#2D3748', fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace',
                                                        boxShadow: '0 1px 1px rgba(0,0,0,0.05)'
                                                    }}>{k}</kbd>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div style={{ padding: '16px 24px', borderTop: '1px solid #EDF2F7', background: '#FAFBFF', display: 'flex', gap: 12, justifyContent: 'space-between' }}>
                    <button
                        onClick={() => { setIsOpen(false); window.dispatchEvent(new Event('start-edibio-tutorial')); }}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, border: 'none', background: '#E8F5E9', color: '#2E7D32', padding: '8px 16px', borderRadius: 10, cursor: 'pointer', fontSize: 12, fontWeight: 700 }}
                    >
                        <Play size={13} /> Interactive Tour
                    </button>
                    <button
                        onClick={() => { setIsOpen(false); router.push(`${base}/help`); }}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid #E2E8F0', background: 'white', color: '#4A5568', padding: '8px 16px', borderRadius: 10, cursor: 'pointer', fontSize: 12, fontWeight: 700 }}
                    >
                        <BookOpen size={13} /> Help Center
                    </button>
                </div>
            </div>
        </div>
    );
}
