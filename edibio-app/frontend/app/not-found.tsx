import Link from 'next/link';

export default function NotFound() {
    return (
        <div style={{
            minHeight: '100dvh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg,#F8FAFF 0%,#EEF2FF 100%)',
            padding: 24,
            fontFamily: 'Inter, -apple-system, sans-serif',
        }}>
            <div style={{ textAlign: 'center', maxWidth: 480, width: '100%' }}>
                {/* Big number */}
                <div style={{
                    fontSize: 'clamp(80px,20vw,140px)',
                    fontWeight: 900,
                    lineHeight: 1,
                    background: 'linear-gradient(135deg,#4285F4,#9333EA)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: 8,
                    letterSpacing: '-4px',
                }}>
                    404
                </div>

                {/* Illustration */}
                <div style={{ fontSize: 64, marginBottom: 20, filter: 'grayscale(0.2)' }}>🧾</div>

                <h1 style={{ fontSize: 24, fontWeight: 800, color: '#1A1A2E', marginBottom: 10 }}>
                    Page not found
                </h1>
                <p style={{ fontSize: 14, color: '#718096', lineHeight: 1.7, marginBottom: 32 }}>
                    This page doesn't exist or may have moved.
                    Your data is safe — just head back to the dashboard.
                </p>

                {/* CTAs */}
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link
                        href="/companies"
                        style={{
                            padding: '14px 28px',
                            background: 'linear-gradient(135deg,#4285F4,#1967D2)',
                            color: 'white',
                            borderRadius: 14,
                            fontWeight: 800,
                            fontSize: 14,
                            textDecoration: 'none',
                            boxShadow: '0 4px 16px rgba(66,133,244,0.35)',
                        }}
                    >
                        🏠 Go to Dashboard
                    </Link>
                    <Link
                        href="/login"
                        style={{
                            padding: '14px 28px',
                            background: 'white',
                            color: '#4285F4',
                            borderRadius: 14,
                            fontWeight: 700,
                            fontSize: 14,
                            textDecoration: 'none',
                            border: '2px solid #E8F0FE',
                        }}
                    >
                        Sign In
                    </Link>
                </div>

                {/* Branding */}
                <p style={{ marginTop: 40, fontSize: 12, color: '#CBD5E0' }}>
                    Edibio · Smart billing for Indian businesses
                </p>
            </div>
        </div>
    );
}
