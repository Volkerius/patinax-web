/**
 * WatchIllustration — permanent SVG watch art (no image API available).
 * Renders a style-appropriate watch face based on brand character.
 */

type WatchStyle = 'diver' | 'dress' | 'sport' | 'pilot' | 'default'

function getStyle(brand: string, model: string): WatchStyle {
  const b = brand.toLowerCase()
  const m = model.toLowerCase()
  if (m.includes('submarin') || m.includes('seamaster') || m.includes('aqua terra') || m.includes('diver') || m.includes('black bay')) return 'diver'
  if (m.includes('nautilus') || m.includes('royal oak')) return 'sport'
  if (m.includes('datejust') || m.includes('calatrava') || m.includes('master')) return 'dress'
  if (m.includes('pilot') || m.includes('navigator') || m.includes('portugieser')) return 'pilot'
  if (b.includes('rolex') || b.includes('omega')) return 'diver'
  if (b.includes('patek') || b.includes('jaeger') || b.includes('cartier')) return 'dress'
  if (b.includes('audemars') || b.includes('richard mille')) return 'sport'
  return 'default'
}

const GOLD = 'rgba(201,168,76,'
const SILVER = 'rgba(200,200,210,'
const g = (a: number) => `${GOLD}${a})`
const s = (a: number) => `${SILVER}${a})`

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function DiverFace({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const indices = Array.from({ length: 12 }, (_, i) => i)
  return (
    <g>
      {/* Bezel ring */}
      <circle cx={cx} cy={cy} r={r * 1.14} fill="none" stroke={g(0.5)} strokeWidth={r * 0.06} />
      {/* Bezel minute pip at 12 */}
      <circle cx={cx} cy={cy - r * 1.11} r={r * 0.04} fill={g(0.9)} />
      {/* Dial */}
      <circle cx={cx} cy={cy} r={r} fill="rgba(8,14,22,0.95)" stroke={g(0.3)} strokeWidth={1} />
      {/* Hour markers */}
      {indices.map(i => {
        const a = i * 30
        const isCard = [12, 3, 6, 9].includes(i) || i === 0
        const inner = polarToXY(cx, cy, r * (isCard ? 0.68 : 0.74), a)
        const outer = polarToXY(cx, cy, r * 0.88, a)
        return isCard ? (
          <rect
            key={i}
            x={cx - r * 0.045}
            y={cy - r * 0.89}
            width={r * 0.09}
            height={r * 0.20}
            rx={r * 0.02}
            fill={g(0.9)}
            transform={`rotate(${a}, ${cx}, ${cy})`}
          />
        ) : (
          <line
            key={i}
            x1={inner.x} y1={inner.y}
            x2={outer.x} y2={outer.y}
            stroke={g(0.6)} strokeWidth={r * 0.045}
            strokeLinecap="round"
          />
        )
      })}
      {/* Hour hand */}
      <rect x={cx - r * 0.055} y={cy - r * 0.52} width={r * 0.11} height={r * 0.52} rx={r * 0.03}
        fill={g(0.95)} transform={`rotate(-35, ${cx}, ${cy})`} />
      {/* Minute hand */}
      <rect x={cx - r * 0.035} y={cy - r * 0.72} width={r * 0.07} height={r * 0.72} rx={r * 0.02}
        fill={s(0.85)} transform={`rotate(15, ${cx}, ${cy})`} />
      {/* Seconds hand */}
      <line x1={cx} y1={cy + r * 0.22} x2={cx} y2={cy - r * 0.78}
        stroke="rgba(220,60,50,0.9)" strokeWidth={r * 0.025} strokeLinecap="round"
        transform={`rotate(70, ${cx}, ${cy})`} />
      {/* Center cap */}
      <circle cx={cx} cy={cy} r={r * 0.06} fill={g(1)} />
      {/* Date window at 3 */}
      <rect x={cx + r * 0.58} y={cy - r * 0.09} width={r * 0.22} height={r * 0.18} rx={r * 0.025}
        fill="rgba(255,255,255,0.08)" stroke={g(0.3)} strokeWidth={0.5} />
    </g>
  )
}

function DressFace({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g>
      {/* Fluted bezel simulation */}
      {Array.from({ length: 36 }, (_, i) => {
        const a = i * 10
        const p1 = polarToXY(cx, cy, r * 1.08, a - 3)
        const p2 = polarToXY(cx, cy, r * 1.16, a - 3)
        const p3 = polarToXY(cx, cy, r * 1.16, a + 3)
        const p4 = polarToXY(cx, cy, r * 1.08, a + 3)
        return (
          <polygon key={i} points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`}
            fill={i % 2 === 0 ? g(0.35) : g(0.15)} />
        )
      })}
      <circle cx={cx} cy={cy} r={r * 1.08} fill="none" stroke={g(0.4)} strokeWidth={0.5} />
      {/* Dial — cream tone */}
      <circle cx={cx} cy={cy} r={r} fill="rgba(245,240,230,0.06)" stroke={g(0.25)} strokeWidth={0.8} />
      {/* Roman-style baton markers */}
      {Array.from({ length: 12 }, (_, i) => {
        const a = i * 30
        const p1 = polarToXY(cx, cy, r * 0.78, a)
        const p2 = polarToXY(cx, cy, r * 0.88, a)
        return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
          stroke={g(i % 3 === 0 ? 0.95 : 0.55)} strokeWidth={i % 3 === 0 ? r * 0.05 : r * 0.025} strokeLinecap="round" />
      })}
      {/* Leaf hands */}
      <ellipse cx={cx} cy={cy - r * 0.32} rx={r * 0.04} ry={r * 0.34} fill={g(0.9)}
        transform={`rotate(-40, ${cx}, ${cy})`} />
      <ellipse cx={cx} cy={cy - r * 0.42} rx={r * 0.025} ry={r * 0.44} fill={s(0.8)}
        transform={`rotate(20, ${cx}, ${cy})`} />
      <circle cx={cx} cy={cy} r={r * 0.045} fill={g(1)} />
    </g>
  )
}

function SportFace({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g>
      {/* Integrated bracelet top hint */}
      <rect x={cx - r * 0.52} y={cy - r * 1.18} width={r * 1.04} height={r * 0.2} rx={r * 0.04}
        fill={s(0.12)} stroke={s(0.25)} strokeWidth={0.5} />
      {/* Octagonal bezel */}
      {Array.from({ length: 8 }, (_, i) => {
        const a1 = i * 45 - 22.5
        const a2 = i * 45 + 22.5
        const p1 = polarToXY(cx, cy, r * 1.14, a1)
        const p2 = polarToXY(cx, cy, r * 1.14, a2)
        const p3 = polarToXY(cx, cy, r * 1.06, a2)
        const p4 = polarToXY(cx, cy, r * 1.06, a1)
        return <polygon key={i} points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`}
          fill={i % 2 === 0 ? s(0.25) : s(0.10)} stroke={s(0.35)} strokeWidth={0.5} />
      })}
      {/* Tapisserie dial pattern */}
      <circle cx={cx} cy={cy} r={r} fill="rgba(20,24,32,0.9)" stroke={s(0.3)} strokeWidth={0.8} />
      {Array.from({ length: 7 }, (_, row) =>
        Array.from({ length: 7 }, (_, col) => {
          const x = cx - r * 0.6 + col * r * 0.2
          const y = cy - r * 0.6 + row * r * 0.2
          const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2)
          if (dist > r * 0.85) return null
          return <rect key={`${row}-${col}`} x={x - r * 0.07} y={y - r * 0.07}
            width={r * 0.14} height={r * 0.14} rx={r * 0.01}
            fill="none" stroke={s(0.12)} strokeWidth={0.5} />
        })
      )}
      {/* Applied markers */}
      {Array.from({ length: 12 }, (_, i) => {
        const a = i * 30
        const p = polarToXY(cx, cy, r * 0.80, a)
        return <circle key={i} cx={p.x} cy={p.y} r={r * (i % 3 === 0 ? 0.055 : 0.03)}
          fill={s(i % 3 === 0 ? 0.9 : 0.5)} />
      })}
      {/* Baton hands */}
      <rect x={cx - r * 0.05} y={cy - r * 0.54} width={r * 0.1} height={r * 0.56} rx={r * 0.025}
        fill={s(0.9)} transform={`rotate(-40, ${cx}, ${cy})`} />
      <rect x={cx - r * 0.03} y={cy - r * 0.7} width={r * 0.06} height={r * 0.72} rx={r * 0.02}
        fill={s(0.75)} transform={`rotate(20, ${cx}, ${cy})`} />
      <circle cx={cx} cy={cy} r={r * 0.055} fill={s(1)} />
    </g>
  )
}

function PilotFace({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r * 1.06} fill="none" stroke={s(0.3)} strokeWidth={r * 0.04} />
      <circle cx={cx} cy={cy} r={r} fill="rgba(10,10,10,0.97)" stroke={s(0.2)} strokeWidth={0.8} />
      {/* Arabic numerals hint as lines */}
      {Array.from({ length: 12 }, (_, i) => {
        const a = i * 30
        const isMain = i % 3 === 0
        const p1 = polarToXY(cx, cy, r * (isMain ? 0.65 : 0.76), a)
        const p2 = polarToXY(cx, cy, r * 0.90, a)
        return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
          stroke={s(isMain ? 0.95 : 0.5)} strokeWidth={isMain ? r * 0.07 : r * 0.03} strokeLinecap="square" />
      })}
      {/* Sword hands */}
      <polygon points={`${cx},${cy - r * 0.62} ${cx - r * 0.06},${cy} ${cx + r * 0.06},${cy}`}
        fill={s(0.9)} transform={`rotate(-40, ${cx}, ${cy})`} />
      <polygon points={`${cx},${cy - r * 0.76} ${cx - r * 0.04},${cy} ${cx + r * 0.04},${cy}`}
        fill={s(0.75)} transform={`rotate(20, ${cx}, ${cy})`} />
      <circle cx={cx} cy={cy} r={r * 0.07} fill={s(0.9)} />
      <circle cx={cx} cy={cy} r={r * 0.03} fill="rgba(10,10,10,1)" />
    </g>
  )
}

interface WatchIllustrationProps {
  brand?: string
  model?: string
  className?: string
  size?: number
}

export function WatchIllustration({ brand = '', model = '', className = '', size = 160 }: WatchIllustrationProps) {
  const style = getStyle(brand, model)
  const cx = size / 2
  const cy = size / 2
  const caseR = size * 0.36       // case outer radius
  const dialR = size * 0.30       // dial radius
  const strapW = size * 0.22
  const strapR = size * 0.05

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={brand && model ? `${brand} ${model} illustration` : 'Watch illustration'}
      role="img"
    >
      {/* Top strap */}
      <rect
        x={cx - strapW / 2} y={0}
        width={strapW} height={cy - caseR + 2}
        rx={strapR}
        fill={g(0.10)} stroke={g(0.22)} strokeWidth={0.8}
      />
      {/* Strap buckle bar */}
      <line x1={cx - strapW / 2 + 4} y1={size * 0.08} x2={cx + strapW / 2 - 4} y2={size * 0.08}
        stroke={g(0.30)} strokeWidth={1.5} strokeLinecap="round" />

      {/* Case shadow */}
      <circle cx={cx + 1} cy={cy + 2} r={caseR} fill="rgba(0,0,0,0.4)" />

      {/* Case body */}
      <circle cx={cx} cy={cy} r={caseR}
        fill="url(#caseGrad)" stroke={g(0.45)} strokeWidth={1.2} />

      {/* Crown */}
      <rect
        x={cx + caseR - 1} y={cy - size * 0.04}
        width={size * 0.06} height={size * 0.08}
        rx={size * 0.02}
        fill={g(0.20)} stroke={g(0.38)} strokeWidth={0.8}
      />

      {/* Dial face based on style */}
      {style === 'diver'   && <DiverFace  cx={cx} cy={cy} r={dialR} />}
      {style === 'dress'   && <DressFace  cx={cx} cy={cy} r={dialR} />}
      {style === 'sport'   && <SportFace  cx={cx} cy={cy} r={dialR} />}
      {style === 'pilot'   && <PilotFace  cx={cx} cy={cy} r={dialR} />}
      {style === 'default' && <DiverFace  cx={cx} cy={cy} r={dialR} />}

      {/* Bottom strap */}
      <rect
        x={cx - strapW / 2} y={cy + caseR - 2}
        width={strapW} height={size - (cy + caseR - 2)}
        rx={strapR}
        fill={g(0.10)} stroke={g(0.22)} strokeWidth={0.8}
      />
      {/* Buckle holes */}
      {[0.72, 0.78, 0.84].map(t => (
        <circle key={t} cx={cx} cy={size * t} r={size * 0.012}
          fill="none" stroke={g(0.30)} strokeWidth={0.8} />
      ))}

      {/* Defs */}
      <defs>
        <radialGradient id="caseGrad" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor={s(0.35)} />
          <stop offset="60%" stopColor={s(0.12)} />
          <stop offset="100%" stopColor={s(0.05)} />
        </radialGradient>
      </defs>
    </svg>
  )
}

/** Back-compat alias used in ComparisonHeader */
export function WatchPlaceholder({ className = '' }: { className?: string }) {
  return <WatchIllustration className={className} />
}
