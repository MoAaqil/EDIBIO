import type { NextConfig } from "next";

const nextConfig: any = {
  // API routes require server rendering — do NOT export statically.
  // For Capacitor APK builds, run: NEXT_PUBLIC_APK_BUILD=true npm run build
  output: process.env.NEXT_PUBLIC_APK_BUILD === 'true' ? 'export' : undefined,

  images: { unoptimized: true },
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
