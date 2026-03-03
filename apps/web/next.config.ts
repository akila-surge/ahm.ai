import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Transpile @sears/* packages so Next.js webpack/Turbopack processes their TS source
  transpilePackages: ['@sears/contracts'],

  // Harden production responses
  poweredByHeader: false,

  // Enable React strict mode to surface potential issues early
  reactStrictMode: true,

  // Logging (Next.js 15+) — reduce noise in development
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // Custom response headers for all routes
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
