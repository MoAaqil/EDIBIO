import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Edibio Suite — Admin Control Dashboard",
  description: "Unified admin panel to monitor and verify registrations on Edibio Billing App and EdiStore E-commerce.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
