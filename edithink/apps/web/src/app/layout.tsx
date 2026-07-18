import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'EdiThink — Enterprise Video Conferencing',
    template: '%s | EdiThink',
  },
  description: 'World-class enterprise video conferencing platform. HD meetings, 4K screen sharing, AI transcripts, real-time chat, and collaborative whiteboard.',
  keywords: ['video conferencing', 'enterprise', 'meetings', 'screen sharing', 'collaboration', 'EdiThink'],
  authors: [{ name: 'EdiThink' }],
  creator: 'EdiThink',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://edithink.app',
    title: 'EdiThink — Enterprise Video Conferencing',
    description: 'World-class enterprise video conferencing. Start a meeting in seconds.',
    siteName: 'EdiThink',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EdiThink — Enterprise Video Conferencing',
    description: 'World-class enterprise video conferencing. Start a meeting in seconds.',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8FAFC' },
    { media: '(prefers-color-scheme: dark)', color: '#0B1220' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
