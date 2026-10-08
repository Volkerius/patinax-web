import { ImageResponse } from 'next/og'
import { toSlug } from '@/lib/slug'

export const runtime = 'edge'
export const alt = 'Watch Details'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ brand: string; model: string }> }) {
  const { brand: brandSlug, model: modelSlug } = await params
  const brand = decodeURIComponent(brandSlug).split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  const model = decodeURIComponent(modelSlug).split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
          fontFamily: 'serif',
        }}
      >
        {/* Gold border */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            right: 20,
            bottom: 20,
            border: '2px solid #c8a55c',
            borderRadius: 16,
            display: 'flex',
          }}
        />

        {/* Logo */}
        <div style={{ display: 'flex', fontSize: 32, color: '#c8a55c', marginBottom: 24 }}>
          Patinax
        </div>

        {/* Brand */}
        <div
          style={{
            fontSize: 28,
            color: '#c8a55c',
            textTransform: 'uppercase',
            letterSpacing: 6,
            marginBottom: 12,
          }}
        >
          {brand}
        </div>

        {/* Model */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#ffffff',
            textAlign: 'center',
            maxWidth: 900,
            lineHeight: 1.1,
          }}
        >
          {model}
        </div>

        {/* Subtitle */}
        <div style={{ display: 'flex', fontSize: 22, color: '#888888', marginTop: 24 }}>
          Specs, Price & Comparisons
        </div>
      </div>
    ),
    {
      ...size,
      headers: {
        // OG image is deterministic from slug — cache immutably for 1y at CDN
        'Cache-Control': 'public, immutable, max-age=31536000, s-maxage=31536000',
      },
    }
  )
}
