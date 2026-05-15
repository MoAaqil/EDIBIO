import type { Metadata, Viewport } from "next";
import "./globals.css";
import OfflineGuard from "@/components/OfflineGuard";
import TrialGuard from "@/components/TrialGuard";
import MongoSync from "@/components/MongoSync";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Edibio",
  description: "Complete billing, inventory and accounting software for Indian supermarkets. GST billing, stock management, party ledger, expense tracking.",
  keywords: ["billing software", "supermarket", "GST", "inventory", "India", "Edibio"],
  authors: [{ name: "Edibio" }],
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Edibio" },
  openGraph: {
    title: "Edibio",
    description: "Complete billing, inventory and accounting for Indian businesses",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#1A1A2E",
};

import SplashScreen from "@/components/SplashScreen";
import SystemNotifications from "@/components/SystemNotifications";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Outfit:wght@300;400;600;800&family=Courier+Prime:wght@400;700&display=swap" rel="stylesheet" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
                  if (isLocal) {
                    navigator.serviceWorker.getRegistrations().then(regs => {
                      for(let reg of regs) reg.unregister();
                    });
                  } else {
                    navigator.serviceWorker.register('/sw.js').catch(function(err) {});
                  }
                });
              }
              // Try to lock orientation to portrait for PWA/Mobile
              if (typeof window !== 'undefined' && window.screen && window.screen.orientation && window.screen.orientation.lock) {
                try {
                  window.screen.orientation.lock('portrait').catch(function(e) {});
                } catch(e) {}
              }
            `,
          }}
        />
      </head>
      <body>
        <ErrorBoundary>
          <SplashScreen>
            <OfflineGuard>
              <TrialGuard>
                {children}
                <MongoSync />
                <SystemNotifications />
                <ConfirmDialog />
              </TrialGuard>
            </OfflineGuard>
          </SplashScreen>
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: { background: '#1A1A2E', color: 'white', borderRadius: '12px', fontWeight: 600, fontSize: 13, padding: '12px 18px', boxShadow: '0 8px 32px rgba(0,0,0,0.25)' },
              success: { iconTheme: { primary: '#34A853', secondary: 'white' }, duration: 3000 },
              error: { iconTheme: { primary: '#EA4335', secondary: 'white' }, duration: 5000 },
            }}
          />
        </ErrorBoundary>
      </body>
    </html>
  );
}
