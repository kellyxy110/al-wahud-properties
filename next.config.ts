import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent MIME-type sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Block clickjacking — same-origin iframes only
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Stop leaking full referrer to third-party sites
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Enforce HTTPS for 1 year once deployed
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  // Disable invasive browser features
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=()',
  },
  // Content Security Policy
  // - default: self only
  // - scripts: self + unsafe-inline (needed for Next.js theme script in <head>)
  // - styles: self + unsafe-inline (Tailwind inline styles throughout)
  // - images: self + data: + Supabase + Unsplash
  // - frames: TikTok embed + Google Maps
  // - connect: Supabase only
  // - fonts: Google Fonts
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://abynlxbyoeqebattetdg.supabase.co https://images.unsplash.com",
      "frame-src https://www.tiktok.com https://www.google.com",
      "connect-src 'self' https://abynlxbyoeqebattetdg.supabase.co",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'abynlxbyoeqebattetdg.supabase.co' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.alwajudproperties.com' }],
        destination: 'https://alwajudproperties.com/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
