import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'EdiStore — Online Marketplace',
  description: 'Shop from your favorite local supermarket, clothing, grocery, and electronic stores online. Fast delivery and secure payments.',
  keywords: ['shopping', 'ecommerce', 'supermarket', 'online store', 'grocery', 'fashion', 'EdiStore', 'Edibio'],
  authors: [{ name: 'Edibio Technologies' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'EdiStore',
  },
  openGraph: {
    title: 'EdiStore — Online Marketplace',
    description: 'Shop from your favorite local stores online.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#4f46e5',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body>
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#0f172a',
              color: 'white',
              borderRadius: '12px',
              fontWeight: 500,
              fontSize: '14px',
              padding: '12px 18px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: 'white',
              },
              duration: 3000,
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: 'white',
              },
              duration: 4000,
            },
          }}
        />
      </body>
    </html>
  );
}
