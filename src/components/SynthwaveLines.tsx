/**
 * Lightweight CSS-animated horizontal synthwave lines.
 * Used as subtle background decoration between major sections.
 * No canvas — pure SVG + CSS for minimal performance cost.
 */

interface Props {
  /** Number of horizontal lines */
  lines?: number
  /** Base opacity (0-1) */
  opacity?: number
  /** Primary color */
  color?: 'green' | 'purple' | 'cyan'
  /** Height of the line field */
  height?: string
  /** Add a subtle perspective grid effect */
  grid?: boolean
}

const colorMap = {
  green:  { r: 74, g: 222, b: 128 },
  purple: { r: 147, g: 51, b: 234 },
  cyan:   { r: 6, g: 182, b: 212 },
}

export function SynthwaveLines({ lines = 5, opacity = 0.06, color = 'green', height = '100%', grid = false }: Props) {
  const c = colorMap[color]
  const lineEls = []

  for (let i = 0; i < lines; i++) {
    const y = ((i + 1) / (lines + 1)) * 100
    // Alternate opacity for depth
    const lineOpacity = opacity * (0.4 + 0.6 * ((i % 2 === 0) ? 1 : 0.5))

    lineEls.push(
      <div
        key={i}
        className="absolute left-0 right-0"
        style={{
          top: `${y}%`,
          height: '1px',
          background: `linear-gradient(90deg, transparent 0%, rgba(${c.r},${c.g},${c.b},${lineOpacity}) 15%, rgba(${c.r},${c.g},${c.b},${lineOpacity * 1.5}) 50%, rgba(${c.r},${c.g},${c.b},${lineOpacity}) 85%, transparent 100%)`,
        }}
      />
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ height }}>
      {lineEls}
      {grid && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(${c.r},${c.g},${c.b},${opacity * 0.3}) 1px, transparent 1px),
              linear-gradient(90deg, rgba(${c.r},${c.g},${c.b},${opacity * 0.3}) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.5) 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.5) 70%, transparent 100%)',
          }}
        />
      )}
    </div>
  )
}
