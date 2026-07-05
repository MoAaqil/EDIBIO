'use client';
import { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; errorInfo: string; }

export default class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false, error: null, errorInfo: '' };

    static getDerivedStateFromError(error: Error): Partial<State> {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: any) {
        this.setState({ errorInfo: info?.componentStack || '' });
        console.error('[ErrorBoundary] Caught:', error, info);
    }

    render() {
        if (!this.state.hasError) return this.props.children;

        const msg = this.state.error?.message || 'Unknown error';
        const isDataError = msg.includes('undefined') || msg.includes('null') || msg.includes('Cannot read');

        return (
            <div style={{
                minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg,#FFF5F5 0%,#FED7D7 100%)', padding: 24,
            }}>
                <div style={{
                    background: 'white', borderRadius: 24, padding: '48px 40px', maxWidth: 480, width: '100%',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.1)', textAlign: 'center',
                }}>
                    <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#FEF2F2', border: '8px solid #FFF5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                        <AlertTriangle size={32} color="#DC2626" />
                    </div>
                    <h2 style={{ fontWeight: 900, fontSize: 22, color: '#1A1A2E', marginBottom: 8 }}>
                        Oops, something crashed
                    </h2>
                    <p style={{ color: '#718096', fontSize: 14, lineHeight: 1.6, marginBottom: 8 }}>
                        {isDataError
                            ? "A page tried to load data that wasn't ready yet. This usually fixes itself on reload."
                            : 'An unexpected error occurred. Your data is safe — this is just a display issue.'}
                    </p>
                    <div style={{ background: '#F8F9FA', borderRadius: 10, padding: '10px 14px', marginBottom: 28, textAlign: 'left' }}>
                        <code style={{ fontSize: 11, color: '#718096', wordBreak: 'break-word' }}>{msg.slice(0, 120)}</code>
                    </div>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 10 }}>
                        <button
                            onClick={() => window.location.reload()}
                            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: '#4285F4', color: 'white', border: 'none', borderRadius: 12, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}
                        >
                            <RefreshCw size={16} /> Try Again
                        </button>
                        <button
                            onClick={() => { window.location.href = '/companies'; }}
                            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: '#F1F5F9', color: '#1A1A2E', border: 'none', borderRadius: 12, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}
                        >
                            <Home size={16} /> Go Home
                        </button>
                    </div>
                    <p style={{ fontSize: 11, color: '#A0AEC0', marginTop: 20 }}>Your data is stored safely in your browser and the cloud.</p>
                </div>
            </div>
        );
    }
}
