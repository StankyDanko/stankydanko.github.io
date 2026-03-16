import { useEffect, useRef } from 'react'

/**
 * Footer animation: synthwave wave grid with floating organic spore nodes.
 * Mirrors the hero energy at the bottom of the page.
 */

interface Color { r: number; g: number; b: number }

const greens: Color[] = [
  { r: 74, g: 222, b: 128 },
  { r: 52, g: 211, b: 153 },
  { r: 34, g: 197, b: 94 },
]
const purples: Color[] = [
  { r: 147, g: 51, b: 234 },
  { r: 168, g: 85, b: 247 },
]

interface FooterSpore {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  color: Color
  pulse: number
  pulseSpeed: number
  opacity: number
}

export default function FooterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0, H = 0, animId: number
    let time = 0

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect()
      W = canvas!.width = rect.width
      H = canvas!.height = rect.height
    }
    resize()
    window.addEventListener('resize', resize)

    // ── Synthwave wave lines ────────────────────────────────────

    interface WaveLine {
      baseY: number
      amplitude: number
      frequency: number
      phase: number
      speed: number
      color: Color
      opacity: number
      width: number
    }

    const waves: WaveLine[] = []
    for (let i = 0; i < 8; i++) {
      const t = i / 7
      const color = i < 3 ? greens[i % greens.length]
        : i < 6 ? purples[i % purples.length]
        : greens[0]

      waves.push({
        baseY: H * 0.3 + t * H * 0.55,
        amplitude: 6 + t * 18,
        frequency: 0.004 + t * 0.002,
        phase: i * 0.8,
        speed: 0.01 + t * 0.005,
        color,
        opacity: 0.04 + t * 0.08,
        width: 0.6 + t * 0.8,
      })
    }

    // ── Organic spore nodes ─────────────────────────────────────

    const spores: FooterSpore[] = []
    for (let i = 0; i < 18; i++) {
      const color = Math.random() < 0.6
        ? greens[Math.floor(Math.random() * greens.length)]
        : purples[Math.floor(Math.random() * purples.length)]

      spores.push({
        x: Math.random() * 2000, // will be clamped to W
        y: Math.random() * 500,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.1,
        r: 1 + Math.random() * 2,
        color,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.015,
        opacity: 0.15 + Math.random() * 0.25,
      })
    }

    // ── Draw ────────────────────────────────────────────────────

    function draw() {
      ctx!.clearRect(0, 0, W, H)
      time += 0.016

      // ── Synthwave grid lines (horizontal) ─────────────────────

      for (const w of waves) {
        w.phase += w.speed

        ctx!.beginPath()
        for (let x = 0; x <= W; x += 3) {
          const y = w.baseY + Math.sin(x * w.frequency + w.phase) * w.amplitude
          if (x === 0) ctx!.moveTo(x, y)
          else ctx!.lineTo(x, y)
        }

        const c = w.color
        // Gradient that fades at edges
        const grad = ctx!.createLinearGradient(0, 0, W, 0)
        grad.addColorStop(0, `rgba(${c.r},${c.g},${c.b},0)`)
        grad.addColorStop(0.1, `rgba(${c.r},${c.g},${c.b},${w.opacity})`)
        grad.addColorStop(0.5, `rgba(${c.r},${c.g},${c.b},${w.opacity * 1.4})`)
        grad.addColorStop(0.9, `rgba(${c.r},${c.g},${c.b},${w.opacity})`)
        grad.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`)

        ctx!.strokeStyle = grad
        ctx!.lineWidth = w.width
        ctx!.stroke()
      }

      // ── Vertical grid lines (perspective-ish) ─────────────────

      const vertCount = 12
      for (let i = 0; i <= vertCount; i++) {
        const x = (i / vertCount) * W
        const alpha = 0.02 + 0.02 * Math.sin(time * 0.5 + i * 0.3)

        ctx!.beginPath()
        ctx!.moveTo(x, H * 0.3)
        ctx!.lineTo(x, H)
        ctx!.strokeStyle = `rgba(74, 222, 128, ${alpha})`
        ctx!.lineWidth = 0.5
        ctx!.stroke()
      }

      // ── Spore nodes ───────────────────────────────────────────

      for (const s of spores) {
        s.x += s.vx
        s.y += s.vy
        s.pulse += s.pulseSpeed

        // Soft boundary bounce
        if (s.x < 0 || s.x > W) s.vx *= -1
        if (s.y < 0 || s.y > H) s.vy *= -1

        const pulseMod = 0.6 + 0.4 * Math.sin(s.pulse)
        const alpha = s.opacity * pulseMod
        const c = s.color

        // Glow
        const glowR = s.r * 6
        const glow = ctx!.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowR)
        glow.addColorStop(0, `rgba(${c.r},${c.g},${c.b},${alpha * 0.2})`)
        glow.addColorStop(0.4, `rgba(${c.r},${c.g},${c.b},${alpha * 0.06})`)
        glow.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`)
        ctx!.beginPath()
        ctx!.arc(s.x, s.y, glowR, 0, Math.PI * 2)
        ctx!.fillStyle = glow
        ctx!.fill()

        // Core
        ctx!.beginPath()
        ctx!.arc(s.x, s.y, s.r * pulseMod, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${Math.min(255, c.r + 50)},${Math.min(255, c.g + 40)},${Math.min(255, c.b + 30)},${alpha})`
        ctx!.fill()
      }

      // ── Connections between nearby spores ──────────────────────

      for (let i = 0; i < spores.length; i++) {
        for (let j = i + 1; j < spores.length; j++) {
          const a = spores[i], b = spores[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 120) {
            const strength = 1 - (dist / 120)
            const alpha = strength * 0.12
            const mc = a.color

            ctx!.beginPath()
            ctx!.moveTo(a.x, a.y)
            ctx!.lineTo(b.x, b.y)
            ctx!.strokeStyle = `rgba(${mc.r},${mc.g},${mc.b},${alpha})`
            ctx!.lineWidth = 0.4 + strength * 0.6
            ctx!.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.7 }}
    />
  )
}
