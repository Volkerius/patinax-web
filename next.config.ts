import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Bypass Vercel Image Optimization (1,000/mo free cap was hit with 1,059 watches).
    // Supabase Storage already serves via CloudFlare CDN, so there's no meaningful
    // performance loss from skipping Vercel's on-the-fly transform.
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.thewatchapi.com' },
      { protocol: 'https', hostname: 'images.patinax.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'commons.wikimedia.org' },
      { protocol: 'https', hostname: 'prsbjvgnxbrtrxtrncqt.supabase.co' },
    ],
  },
  experimental: {},
  redirects: async () => [
    // Vercel handles www → non-www at domain level (primary: patinax.com).
    // Only handle removed routes here so existing indexed URLs don't return 404.
    { source: '/auth', destination: '/', permanent: true },
    { source: '/auth/:path*', destination: '/', permanent: true },
    { source: '/profile', destination: '/', permanent: true },
    { source: '/profile/:path*', destination: '/', permanent: true },
  ],
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        // Permissions-Policy: lock down browser feature APIs we don't use.
        // Reduces attack surface and signals security posture.
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
        },
      ],
    },
    {
      source: '/compare/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, s-maxage=86400, stale-while-revalidate=604800',
        },
        // Vercel-specific: tells the edge cache to hold for 1d / SWR 7d,
        // independent of the browser-facing Cache-Control above.
        {
          key: 'Vercel-CDN-Cache-Control',
          value: 'public, s-maxage=86400, stale-while-revalidate=604800',
        },
        {
          key: 'CDN-Cache-Control',
          value: 'public, s-maxage=86400, stale-while-revalidate=604800',
        },
      ],
    },
    {
      source: '/watch/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, s-maxage=86400, stale-while-revalidate=604800',
        },
        // Vercel-specific: tells the edge cache to hold for 1d / SWR 7d,
        // independent of the browser-facing Cache-Control above.
        {
          key: 'Vercel-CDN-Cache-Control',
          value: 'public, s-maxage=86400, stale-while-revalidate=604800',
        },
        {
          key: 'CDN-Cache-Control',
          value: 'public, s-maxage=86400, stale-while-revalidate=604800',
        },
      ],
    },
    {
      source: '/brand/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, s-maxage=86400, stale-while-revalidate=604800',
        },
        // Vercel-specific: tells the edge cache to hold for 1d / SWR 7d,
        // independent of the browser-facing Cache-Control above.
        {
          key: 'Vercel-CDN-Cache-Control',
          value: 'public, s-maxage=86400, stale-while-revalidate=604800',
        },
        {
          key: 'CDN-Cache-Control',
          value: 'public, s-maxage=86400, stale-while-revalidate=604800',
        },
      ],
    },
    {
      source: '/style/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, s-maxage=86400, stale-while-revalidate=604800',
        },
        // Vercel-specific: tells the edge cache to hold for 1d / SWR 7d,
        // independent of the browser-facing Cache-Control above.
        {
          key: 'Vercel-CDN-Cache-Control',
          value: 'public, s-maxage=86400, stale-while-revalidate=604800',
        },
        {
          key: 'CDN-Cache-Control',
          value: 'public, s-maxage=86400, stale-while-revalidate=604800',
        },
      ],
    },
    {
      source: '/tier/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, s-maxage=86400, stale-while-revalidate=604800',
        },
        // Vercel-specific: tells the edge cache to hold for 1d / SWR 7d,
        // independent of the browser-facing Cache-Control above.
        {
          key: 'Vercel-CDN-Cache-Control',
          value: 'public, s-maxage=86400, stale-while-revalidate=604800',
        },
        {
          key: 'CDN-Cache-Control',
          value: 'public, s-maxage=86400, stale-while-revalidate=604800',
        },
      ],
    },
    {
      source: '/top/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, s-maxage=86400, stale-while-revalidate=604800',
        },
        // Vercel-specific: tells the edge cache to hold for 1d / SWR 7d,
        // independent of the browser-facing Cache-Control above.
        {
          key: 'Vercel-CDN-Cache-Control',
          value: 'public, s-maxage=86400, stale-while-revalidate=604800',
        },
        {
          key: 'CDN-Cache-Control',
          value: 'public, s-maxage=86400, stale-while-revalidate=604800',
        },
      ],
    },
    {
      source: '/versus/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, s-maxage=86400, stale-while-revalidate=604800',
        },
        // Vercel-specific: tells the edge cache to hold for 1d / SWR 7d,
        // independent of the browser-facing Cache-Control above.
        {
          key: 'Vercel-CDN-Cache-Control',
          value: 'public, s-maxage=86400, stale-while-revalidate=604800',
        },
        {
          key: 'CDN-Cache-Control',
          value: 'public, s-maxage=86400, stale-while-revalidate=604800',
        },
      ],
    },
    {
      source: '/search',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      ],
    },
  ],
}

export default nextConfig
