import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Watch Comparison'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const vsParts = slug.split('-vs-')
  const left = vsParts[0]?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Watch A'
  const right = vsParts[1]?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Watch B'

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
        <div style={{ display: 'flex', fontSize: 32, color: '#c8a55c', marginBottom: 40 }}>
          Patinax
        </div>

        {/* VS layout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 40, maxWidth: 1000 }}>
          {/* Left watch */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>
              {left}
            </div>
          </div>

          {/* VS */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
              borderRadius: 40,
              border: '2px solid #c8a55c',
              fontSize: 24,
              fontWeight: 700,
              color: '#c8a55c',
            }}
          >
            VS
          </div>

          {/* Right watch */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>
              {right}
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <div style={{ display: 'flex', fontSize: 22, color: '#888888', marginTop: 40 }}>
          Detailed Side-by-Side Comparison
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
