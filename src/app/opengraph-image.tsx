import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Solar Installers TX - Find Verified Solar Companies in Texas'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a8a 50%, #1e3a5f 100%)',
          padding: '60px 80px',
        }}
      >
        {/* Logo/Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              background: '#f97316',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '20px',
            }}
          >
            <span style={{ fontSize: '36px' }}>☀️</span>
          </div>
          <span
            style={{
              fontSize: '32px',
              fontWeight: 700,
              color: 'white',
            }}
          >
            Solar Installers TX
          </span>
        </div>

        {/* Main Title */}
        <div
          style={{
            fontSize: '56px',
            fontWeight: 800,
            color: 'white',
            lineHeight: 1.2,
            marginBottom: '24px',
            maxWidth: '900px',
          }}
        >
          Find Verified Solar Companies in Texas
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '24px',
            color: 'rgba(255,255,255,0.9)',
            marginBottom: '40px',
          }}
        >
          100-Point Safety Scoring • NABCEP Certified • Free Quotes
        </div>

        {/* Trust badges */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.15)',
              padding: '12px 24px',
              borderRadius: '8px',
            }}
          >
            <span style={{ fontSize: '20px', color: '#22c55e', marginRight: '8px' }}>✓</span>
            <span style={{ color: 'white', fontSize: '18px' }}>500+ Installers</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.15)',
              padding: '12px 24px',
              borderRadius: '8px',
            }}
          >
            <span style={{ fontSize: '20px', color: '#22c55e', marginRight: '8px' }}>✓</span>
            <span style={{ color: 'white', fontSize: '18px' }}>30% Tax Credit</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.15)',
              padding: '12px 24px',
              borderRadius: '8px',
            }}
          >
            <span style={{ fontSize: '20px', color: '#22c55e', marginRight: '8px' }}>✓</span>
            <span style={{ color: 'white', fontSize: '18px' }}>Free Quotes</span>
          </div>
        </div>

        {/* Website URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '60px',
            fontSize: '20px',
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          solarinstallerstx.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
