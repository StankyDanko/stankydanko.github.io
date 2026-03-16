import { useEffect, useRef } from 'react'

// ── Color palettes ──────────────────────────────────────────────

interface Color { r: number; g: number; b: number }

const greenPalette: Color[] = [
  { r: 74, g: 222, b: 128 },   // brand-green
  { r: 52, g: 211, b: 153 },   // emerald
  { r: 34, g: 197, b: 94 },    // deeper green
  { r: 110, g: 231, b: 183 },  // light mint
]

const purplePalette: Color[] = [
  { r: 147, g: 51, b: 234 },   // brand-purple
  { r: 168, g: 85, b: 247 },   // lighter purple
  { r: 124, g: 58, b: 237 },   // violet
  { r: 192, g: 132, b: 252 },  // soft lavender
]

const cyanPalette: Color[] = [
  { r: 6, g: 182, b: 212 },    // brand-cyan
  { r: 34, g: 211, b: 238 },   // light cyan
]

function pickGreen(): Color { return greenPalette[Math.floor(Math.random() * greenPalette.length)] }
function pickPurple(): Color { return purplePalette[Math.floor(Math.random() * purplePalette.length)] }
function pickCyan(): Color { return cyanPalette[Math.floor(Math.random() * cyanPalette.length)] }

function pickSporeColor(): Color {
  const r = Math.random()
  if (r < 0.55) return pickGreen()
  if (r < 0.85) return pickPurple()
  return pickCyan()
}

// ── Simplex-ish noise for organic movement ──────────────────────

function createNoise() {
  const perm = new Uint8Array(512)
  const p = new Uint8Array(256)
  for (let i = 0; i < 256; i++) p[i] = i
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]]
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255]

  function fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10) }
  function lerp(a: number, b: number, t: number) { return a + t * (b - a) }
  function grad(hash: number, x: number, y: number) {
    const h = hash & 3
    const u = h < 2 ? x : y
    const v = h < 2 ? y : x
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v)
  }

  return function noise2D(x: number, y: number): number {
    const xi = Math.floor(x) & 255
    const yi = Math.floor(y) & 255
    const xf = x - Math.floor(x)
    const yf = y - Math.floor(y)
    const u = fade(xf)
    const v = fade(yf)
    const aa = perm[perm[xi] + yi]
    const ab = perm[perm[xi] + yi + 1]
    const ba = perm[perm[xi + 1] + yi]
    const bb = perm[perm[xi + 1] + yi + 1]
    return lerp(
      lerp(grad(aa, xf, yf), grad(ba, xf - 1, yf), u),
      lerp(grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1), u),
      v
    )
  }
}

// ── Spore particle ──────────────────────────────────────────────

interface Spore {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  baseR: number
  opacity: number
  color: Color
  coreColor: Color
  connDist: number
  glowMult: number
  pulse: number
  pulseSpeed: number
  noiseOffX: number
  noiseOffY: number
  trail: { x: number; y: number }[]
  isGrowthNode: boolean
  layer: number
}

// ── Circuit trace (element A) ───────────────────────────────────

interface CircuitSegment {
  points: { x: number; y: number }[]
  opacity: number
  growProgress: number
  growSpeed: number
  color: Color
  width: number
  nodeRadius: number
  pulsePhase: number
}

// ── Waveform tendril (element C) ────────────────────────────────

interface WaveTendril {
  baseY: number
  amplitude: number
  frequency: number
  phase: number
  phaseSpeed: number
  color: Color
  opacity: number
  width: number
  xStart: number
  xEnd: number
  branchPoints: number[]
}

// ── Layer config ────────────────────────────────────────────────

const TRAIL_LEN = 8

const layers = [
  { count: 30, speed: 0.06, size: 0.6, opacity: 0.12, connDist: 100, glowMult: 5, depth: 0 },
  { count: 45, speed: 0.14, size: 1.1, opacity: 0.25, connDist: 130, glowMult: 4, depth: 1 },
  { count: 35, speed: 0.22, size: 1.6, opacity: 0.40, connDist: 155, glowMult: 4, depth: 2 },
  { count: 22, speed: 0.12, size: 2.2, opacity: 0.55, connDist: 180, glowMult: 3, depth: 3 },
]

// ── Main component ──────────────────────────────────────────────

export default function MyceliumNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0, H = 0, animId: number
    const noise = createNoise()
    let time = 0

    function resize() {
      W = canvas!.width = window.innerWidth
      H = canvas!.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // ── Create spores ───────────────────────────────────────────

    const allLayers: Spore[][] = []
    const growthNodeSlots = new Set<string>()

    // 3 growth nodes spread across layers 1-3
    for (let i = 1; i <= 3; i++) {
      growthNodeSlots.add(`${i}-${Math.floor(Math.random() * layers[i].count)}`)
    }

    for (let li = 0; li < layers.length; li++) {
      const cfg = layers[li]
      const group: Spore[] = []

      for (let i = 0; i < cfg.count; i++) {
        const isGrowth = growthNodeSlots.has(`${li}-${i}`)
        const color = isGrowth ? pickGreen() : pickSporeColor()
        const coreColor = {
          r: Math.min(255, color.r + 60),
          g: Math.min(255, color.g + 50),
          b: Math.min(255, color.b + 40),
        }
        const x = Math.random() * W
        const y = Math.random() * H
        const trail: { x: number; y: number }[] = []
        for (let t = 0; t < TRAIL_LEN; t++) trail.push({ x, y })

        const angle = Math.random() * Math.PI * 2
        const speed = cfg.speed + Math.random() * cfg.speed * 0.5

        group.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: isGrowth ? cfg.size * 3.5 : cfg.size * (0.7 + Math.random() * 0.6),
          baseR: cfg.size,
          opacity: isGrowth ? 0.85 : cfg.opacity,
          color, coreColor,
          connDist: cfg.connDist,
          glowMult: cfg.glowMult,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: isGrowth ? 0.03 : 0.012 + Math.random() * 0.008,
          noiseOffX: Math.random() * 1000,
          noiseOffY: Math.random() * 1000,
          trail,
          isGrowthNode: isGrowth,
          layer: li,
        })
      }
      allLayers.push(group)
    }

    // ── Create circuit traces (A) ───────────────────────────────
    // These grow from center area like veins from the logo

    function createCircuitTraces(): CircuitSegment[] {
      const traces: CircuitSegment[] = []
      const cx = W / 2, cy = H * 0.38 // center near hero area

      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 + (Math.random() - 0.5) * 0.4
        const length = 80 + Math.random() * 160
        const segments = 3 + Math.floor(Math.random() * 3)
        const points: { x: number; y: number }[] = [{ x: cx, y: cy }]

        let curAngle = angle
        let curX = cx, curY = cy

        for (let s = 0; s < segments; s++) {
          const segLen = length / segments
          // Circuit traces go straight then turn 90°
          curX += Math.cos(curAngle) * segLen
          curY += Math.sin(curAngle) * segLen
          points.push({ x: curX, y: curY })
          // 90° turn with slight randomness
          curAngle += (Math.random() > 0.5 ? 1 : -1) * (Math.PI / 2) + (Math.random() - 0.5) * 0.3
        }

        traces.push({
          points,
          opacity: 0.15 + Math.random() * 0.2,
          growProgress: 0,
          growSpeed: 0.003 + Math.random() * 0.004,
          color: pickGreen(),
          width: 1 + Math.random() * 0.8,
          nodeRadius: 1.5 + Math.random() * 1.5,
          pulsePhase: Math.random() * Math.PI * 2,
        })
      }
      return traces
    }

    let circuits = createCircuitTraces()

    // ── Create waveform tendrils (C) ────────────────────────────
    // Audio waveforms along the bottom that morph organically

    const tendrils: WaveTendril[] = []
    const tendrilColors = [pickGreen(), pickGreen(), pickCyan(), pickPurple(), pickGreen(), pickPurple(), pickCyan()]
    for (let i = 0; i < 7; i++) {
      const branchPts: number[] = []
      const numBranches = 2 + Math.floor(Math.random() * 4)
      for (let b = 0; b < numBranches; b++) {
        branchPts.push(0.1 + Math.random() * 0.8)
      }

      tendrils.push({
        baseY: H - 20 - i * 14,
        amplitude: 12 + Math.random() * 22,
        frequency: 0.002 + Math.random() * 0.005,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.006 + Math.random() * 0.008,
        color: tendrilColors[i],
        opacity: 0.06 + i * 0.035,
        width: 0.8 + Math.random() * 1.0,
        xStart: 0,
        xEnd: W,
        branchPoints: branchPts,
      })
    }

    // ── Draw loop ───────────────────────────────────────────────

    function draw() {
      ctx!.clearRect(0, 0, W, H)
      time += 0.016

      // ── Update & draw waveform tendrils (C) ───────────────────

      for (const t of tendrils) {
        t.phase += t.phaseSpeed
        t.xEnd = W // handle resize

        ctx!.beginPath()
        const step = 3
        let prevX = t.xStart
        let prevY = t.baseY + Math.sin(t.phase) * t.amplitude

        ctx!.moveTo(prevX, prevY)

        for (let x = t.xStart + step; x <= t.xEnd; x += step) {
          const nx = x * 0.01 + time * 0.5
          const noiseVal = noise(nx, t.phase * 0.1)
          const wave = Math.sin(x * t.frequency + t.phase) * t.amplitude
          const organic = noiseVal * t.amplitude * 0.6
          const y = t.baseY + wave + organic

          ctx!.lineTo(x, y)
          prevX = x
          prevY = y
        }

        const c = t.color
        ctx!.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${t.opacity})`
        ctx!.lineWidth = t.width
        ctx!.stroke()

        // Draw branch tendrils at branch points
        for (const bp of t.branchPoints) {
          const bx = t.xStart + (t.xEnd - t.xStart) * bp
          const bWave = Math.sin(bx * t.frequency + t.phase) * t.amplitude
          const bNoise = noise(bx * 0.01 + time * 0.5, t.phase * 0.1) * t.amplitude * 0.6
          const by = t.baseY + bWave + bNoise

          // Short branch growing upward
          const branchLen = 20 + Math.sin(time * 1.5 + bp * 10) * 10
          const branchAngle = -Math.PI / 2 + Math.sin(time * 0.8 + bp * 7) * 0.4

          ctx!.beginPath()
          ctx!.moveTo(bx, by)
          ctx!.quadraticCurveTo(
            bx + Math.cos(branchAngle) * branchLen * 0.6,
            by + Math.sin(branchAngle) * branchLen * 0.6 - 5,
            bx + Math.cos(branchAngle) * branchLen,
            by + Math.sin(branchAngle) * branchLen
          )
          ctx!.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${t.opacity * 0.6})`
          ctx!.lineWidth = t.width * 0.6
          ctx!.stroke()
        }
      }

      // ── Update spores ─────────────────────────────────────────

      for (const group of allLayers) {
        for (const s of group) {
          // Organic movement via noise field
          const nx = noise(s.noiseOffX + time * 0.3, s.noiseOffY) * 0.15
          const ny = noise(s.noiseOffX, s.noiseOffY + time * 0.3) * 0.15
          s.vx += nx
          s.vy += ny

          // Dampen to prevent runaway velocity
          const speed = Math.sqrt(s.vx * s.vx + s.vy * s.vy)
          const maxSpeed = layers[s.layer].speed * 2.5
          if (speed > maxSpeed) {
            s.vx = (s.vx / speed) * maxSpeed
            s.vy = (s.vy / speed) * maxSpeed
          }

          s.x += s.vx
          s.y += s.vy
          s.pulse += s.pulseSpeed

          // Trail
          s.trail.pop()
          s.trail.unshift({ x: s.x, y: s.y })

          // Wrap at edges with margin
          if (s.x < -40) s.x = W + 40
          if (s.x > W + 40) s.x = -40
          if (s.y < -40) s.y = H + 40
          if (s.y > H + 40) s.y = -40
        }
      }

      // ── Draw connections (mycelium threads) ───────────────────

      for (const group of allLayers) {
        for (let i = 0; i < group.length; i++) {
          for (let j = i + 1; j < group.length; j++) {
            const a = group[i], b = group[j]
            const dx = a.x - b.x, dy = a.y - b.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist < a.connDist) {
              const t = dist / a.connDist
              const strength = 1 - t * t * (3 - 2 * t) // Hermite smoothstep
              const hasGrowth = a.isGrowthNode || b.isGrowthNode
              const alpha = strength * a.opacity * (hasGrowth ? 1.5 : 0.7)

              // Organic curved connections — slight bezier bend
              const midX = (a.x + b.x) / 2 + (Math.sin(time + i) * 4)
              const midY = (a.y + b.y) / 2 + (Math.cos(time + j) * 4)

              const mc = hasGrowth
                ? { r: 74, g: 222, b: 128 }
                : { r: (a.color.r + b.color.r) / 2, g: (a.color.g + b.color.g) / 2, b: (a.color.b + b.color.b) / 2 }

              ctx!.beginPath()
              ctx!.moveTo(a.x, a.y)
              ctx!.quadraticCurveTo(midX, midY, b.x, b.y)
              ctx!.strokeStyle = `rgba(${mc.r}, ${mc.g}, ${mc.b}, ${alpha})`
              ctx!.lineWidth = hasGrowth ? 1.0 + strength * 1.5 : 0.3 + strength * 0.7
              ctx!.stroke()
            }
          }
        }
      }

      // Cross-layer connections
      for (let g = 0; g < allLayers.length - 1; g++) {
        const g1 = allLayers[g], g2 = allLayers[g + 1]
        for (const a of g1) {
          for (const b of g2) {
            const dx = a.x - b.x, dy = a.y - b.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const crossDist = Math.min(a.connDist, b.connDist) * 0.6

            if (dist < crossDist) {
              const t = dist / crossDist
              const strength = 1 - t * t * (3 - 2 * t)
              const hasGrowth = a.isGrowthNode || b.isGrowthNode
              const alpha = strength * Math.min(a.opacity, b.opacity) * (hasGrowth ? 1.0 : 0.4)
              const mc = hasGrowth ? greenPalette[0] : purplePalette[0]

              ctx!.beginPath()
              ctx!.moveTo(a.x, a.y)
              ctx!.lineTo(b.x, b.y)
              ctx!.strokeStyle = `rgba(${mc.r}, ${mc.g}, ${mc.b}, ${alpha})`
              ctx!.lineWidth = hasGrowth ? 0.8 + strength : 0.3 + strength * 0.4
              ctx!.stroke()
            }
          }
        }
      }

      // ── Draw spore nodes ──────────────────────────────────────

      for (const group of allLayers) {
        for (const s of group) {
          const c = s.color, cc = s.coreColor

          if (s.isGrowthNode) {
            // Growth nodes: large pulsing glow with organic throb
            const throb = 0.5 + 0.5 * Math.abs(Math.sin(s.pulse))
            const alpha = Math.min(1, s.opacity * throb * 2)
            const drawR = s.r * (1 + 0.25 * Math.sin(s.pulse * 1.5))

            // Trail
            for (let t = 1; t < s.trail.length; t++) {
              const ta = alpha * (1 - t / s.trail.length) * 0.4
              ctx!.beginPath()
              ctx!.moveTo(s.trail[t - 1].x, s.trail[t - 1].y)
              ctx!.lineTo(s.trail[t].x, s.trail[t].y)
              ctx!.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${ta})`
              ctx!.lineWidth = drawR * 0.6 * (1 - t / s.trail.length)
              ctx!.stroke()
            }

            // Outer glow
            const glowR = drawR * 10
            const glow = ctx!.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowR)
            glow.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha * 0.3})`)
            glow.addColorStop(0.15, `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha * 0.12})`)
            glow.addColorStop(0.4, `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha * 0.04})`)
            glow.addColorStop(1, `rgba(${c.r}, ${c.g}, ${c.b}, 0)`)
            ctx!.beginPath()
            ctx!.arc(s.x, s.y, glowR, 0, Math.PI * 2)
            ctx!.fillStyle = glow
            ctx!.fill()

            // Core
            ctx!.beginPath()
            ctx!.arc(s.x, s.y, drawR, 0, Math.PI * 2)
            ctx!.fillStyle = `rgba(${cc.r}, ${cc.g}, ${cc.b}, ${alpha})`
            ctx!.fill()
          } else {
            // Regular spores
            const pulseMod = 0.7 + 0.3 * Math.sin(s.pulse)
            const alpha = s.opacity * pulseMod

            // Trail
            for (let t = 1; t < s.trail.length; t++) {
              const ta = alpha * (1 - t / s.trail.length) * 0.25
              ctx!.beginPath()
              ctx!.moveTo(s.trail[t - 1].x, s.trail[t - 1].y)
              ctx!.lineTo(s.trail[t].x, s.trail[t].y)
              ctx!.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${ta})`
              ctx!.lineWidth = s.r * 0.5 * (1 - t / s.trail.length)
              ctx!.stroke()
            }

            // Glow
            const glowR = s.r * s.glowMult
            const glow = ctx!.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowR)
            glow.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha * 0.1})`)
            glow.addColorStop(0.3, `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha * 0.05})`)
            glow.addColorStop(0.6, `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha * 0.015})`)
            glow.addColorStop(1, `rgba(${c.r}, ${c.g}, ${c.b}, 0)`)
            ctx!.beginPath()
            ctx!.arc(s.x, s.y, glowR, 0, Math.PI * 2)
            ctx!.fillStyle = glow
            ctx!.fill()

            // Core
            ctx!.beginPath()
            ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2)
            ctx!.fillStyle = `rgba(${cc.r}, ${cc.g}, ${cc.b}, ${alpha})`
            ctx!.fill()
          }
        }
      }

      // ── Draw circuit traces (A) ───────────────────────────────

      for (const seg of circuits) {
        seg.pulsePhase += 0.02
        if (seg.growProgress < 1) {
          seg.growProgress = Math.min(1, seg.growProgress + seg.growSpeed)
        }

        const totalPoints = seg.points.length
        const visibleCount = Math.floor(seg.growProgress * (totalPoints - 1))
        const partialT = (seg.growProgress * (totalPoints - 1)) - visibleCount

        const pulseAlpha = seg.opacity * (0.6 + 0.4 * Math.sin(seg.pulsePhase))
        const c = seg.color

        // Draw grown segments
        for (let i = 0; i < visibleCount && i < totalPoints - 1; i++) {
          const p1 = seg.points[i]
          const p2 = i === visibleCount - 1 && visibleCount < totalPoints - 1
            ? {
                x: seg.points[i].x + (seg.points[i + 1].x - seg.points[i].x) * partialT,
                y: seg.points[i].y + (seg.points[i + 1].y - seg.points[i].y) * partialT,
              }
            : seg.points[i + 1]

          // Trace line
          ctx!.beginPath()
          ctx!.moveTo(p1.x, p1.y)
          ctx!.lineTo(p2.x, p2.y)
          ctx!.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${pulseAlpha})`
          ctx!.lineWidth = seg.width
          ctx!.stroke()

          // Node at junction
          ctx!.beginPath()
          ctx!.arc(p1.x, p1.y, seg.nodeRadius, 0, Math.PI * 2)
          ctx!.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${pulseAlpha * 1.2})`
          ctx!.fill()
        }

        // Regrow when complete
        if (seg.growProgress >= 1) {
          seg.growProgress = 0
          seg.growSpeed = 0.003 + Math.random() * 0.004
          // Regenerate path from center
          const cx = W / 2, cy = H * 0.38
          let curAngle = Math.random() * Math.PI * 2
          let curX = cx, curY = cy
          seg.points = [{ x: cx, y: cy }]
          const segments = 3 + Math.floor(Math.random() * 3)
          const length = 80 + Math.random() * 160
          for (let s = 0; s < segments; s++) {
            const segLen = length / segments
            curX += Math.cos(curAngle) * segLen
            curY += Math.sin(curAngle) * segLen
            seg.points.push({ x: curX, y: curY })
            curAngle += (Math.random() > 0.5 ? 1 : -1) * (Math.PI / 2) + (Math.random() - 0.5) * 0.3
          }
          seg.color = pickGreen()
          seg.opacity = 0.15 + Math.random() * 0.2
        }
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    // Handle resize for circuit traces
    const onResize = () => {
      resize()
      circuits = createCircuitTraces()
      for (const t of tendrils) {
        t.baseY = H - 20 - tendrils.indexOf(t) * 14
      }
    }
    window.removeEventListener('resize', resize) // remove the simple one
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full"
      style={{ zIndex: 0, opacity: 0.5 }}
    />
  )
}
