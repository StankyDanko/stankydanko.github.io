import { useState, useReducer, useEffect, useRef } from 'react'

// --- CONSTANTS ---

const DEMO_TEXT =
  "The cosmic microwave background radiation provides a snapshot of the universe when it was just 380000 years old revealing tiny temperature fluctuations that would eventually grow into galaxies and galaxy clusters " +
  "Neural networks process information through layers of interconnected nodes each applying weighted transformations to extract increasingly abstract features from raw input data " +
  "Ocean currents transport enormous quantities of thermal energy across the planet with the Gulf Stream alone carrying roughly 1.4 petawatts of heat northward through the Atlantic basin " +
  "Quantum entanglement allows particles to share correlated states across arbitrary distances with measurements on one particle instantaneously constraining the possible outcomes for its partner"

const WORDS = DEMO_TEXT.split(' ')

// Simplified finger map: character → finger name
const FINGER_FOR_CHAR: Record<string, string> = {}
const fingerAssignments: [string, string][] = [
  ['l-pinky', 'qaz1'],
  ['l-ring', 'wsx2'],
  ['l-middle', 'edc3'],
  ['l-index', 'rtfgvb45'],
  ['r-index', 'yuhjnm67'],
  ['r-middle', 'ik8'],
  ['r-ring', 'ol9'],
  ['r-pinky', 'p0'],
]
for (const [finger, chars] of fingerAssignments) {
  for (const ch of chars) {
    FINGER_FOR_CHAR[ch] = finger
    FINGER_FOR_CHAR[ch.toUpperCase()] = finger
  }
}
FINGER_FOR_CHAR[' '] = 'thumbs'

// Heat engine color ladder (simplified 4-step)
interface ThemeStep {
  min: number
  color: string
  bg: string
  glow: string
}

const HEAT_STEPS: ThemeStep[] = [
  { min: 0,   color: '#22d3ee', bg: 'bg-cyan-400',   glow: 'shadow-[0_0_8px_rgba(34,211,238,0.5)]' },
  { min: 80,  color: '#4ade80', bg: 'bg-green-400',   glow: 'shadow-[0_0_8px_rgba(74,222,128,0.5)]' },
  { min: 100, color: '#fbbf24', bg: 'bg-amber-400',   glow: 'shadow-[0_0_8px_rgba(251,191,36,0.5)]' },
  { min: 120, color: '#fb7185', bg: 'bg-rose-400',    glow: 'shadow-[0_0_8px_rgba(251,113,133,0.5)]' },
]

function getTheme(tpm: number): ThemeStep {
  for (let i = HEAT_STEPS.length - 1; i >= 0; i--) {
    if (tpm >= HEAT_STEPS[i].min) return HEAT_STEPS[i]
  }
  return HEAT_STEPS[0]
}

// --- STATE MANAGEMENT (useReducer for atomic updates) ---

interface DemoState {
  wordIndex: number
  charIndex: number
  activeFinger: string
  tpm: number
}

const INITIAL_STATE: DemoState = {
  wordIndex: 0,
  charIndex: 0,
  activeFinger: '',
  tpm: 45,
}

type DemoAction =
  | { type: 'ADVANCE_CHAR' }
  | { type: 'TICK_TPM' }
  | { type: 'RESET' }

function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case 'ADVANCE_CHAR': {
      const word = WORDS[state.wordIndex % WORDS.length]
      if (state.charIndex >= word.length) {
        return {
          ...state,
          wordIndex: state.wordIndex + 1,
          charIndex: 0,
          activeFinger: 'thumbs',
        }
      }
      const ch = word[state.charIndex]
      return {
        ...state,
        charIndex: state.charIndex + 1,
        activeFinger: FINGER_FOR_CHAR[ch.toLowerCase()] ?? 'r-index',
      }
    }
    case 'TICK_TPM': {
      if (state.tpm >= 130) return { ...state, tpm: 45 }
      const jitter = Math.floor(Math.random() * 4) + 1
      return { ...state, tpm: state.tpm + jitter }
    }
    case 'RESET':
      return INITIAL_STATE
    default:
      return state
  }
}

// --- FINGER COMPONENT ---

function DemoFinger({ active, h, rotate, theme }: {
  active: boolean
  h: string
  rotate?: string
  theme: ThemeStep
}) {
  return (
    <div
      className={`w-2 sm:w-2.5 rounded-full transition-all duration-150 ${h} ${rotate ?? ''} ${
        active
          ? `${theme.bg} ${theme.glow} opacity-100 scale-105`
          : 'bg-slate-800/40 opacity-50'
      }`}
    />
  )
}

// --- MAIN COMPONENT ---

export function ZenoTypeDemo() {
  const [state, dispatch] = useReducer(demoReducer, INITIAL_STATE)
  const [isVisible, setIsVisible] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const tpmRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const theme = getTheme(state.tpm)

  // Intersection Observer — only animate when visible
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Start/stop animation based on visibility
  useEffect(() => {
    if (!isVisible) {
      if (typingRef.current) clearInterval(typingRef.current)
      if (tpmRef.current) clearInterval(tpmRef.current)
      return
    }

    dispatch({ type: 'RESET' })

    typingRef.current = setInterval(() => {
      dispatch({ type: 'ADVANCE_CHAR' })
    }, 100)

    tpmRef.current = setInterval(() => {
      dispatch({ type: 'TICK_TPM' })
    }, 500)

    return () => {
      if (typingRef.current) clearInterval(typingRef.current)
      if (tpmRef.current) clearInterval(tpmRef.current)
    }
  }, [isVisible])

  // Compute visible words — ever-increasing wordIndex for seamless looping
  const currentAbsIdx = state.wordIndex
  const lookBehind = 12
  const lookAhead = 20
  const visibleWords: { word: string; absIdx: number }[] = []
  for (let i = currentAbsIdx - lookBehind; i < currentAbsIdx + lookAhead; i++) {
    if (i < 0) continue
    visibleWords.push({ word: WORDS[i % WORDS.length], absIdx: i })
  }

  return (
    <div
      ref={containerRef}
      role="presentation"
      aria-hidden="true"
      className="relative w-full aspect-video rounded-lg border border-slate-800 bg-[#090e17] overflow-hidden select-none"
    >
      {/* Neural thread label */}
      <div className="absolute top-3 left-3 z-10">
        <span
          className="text-[10px] sm:text-xs font-mono tracking-wider opacity-80"
          style={{ color: '#22d3ee' }}
        >
          {'>> quantum mechanics'}
        </span>
      </div>

      {/* TPM counter */}
      <div className="absolute top-3 right-3 z-10">
        <div
          className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-bold border border-white/10 bg-black/40"
          style={{ color: theme.color }}
        >
          {state.tpm} TPM
        </div>
      </div>

      {/* Typing area */}
      <div className="absolute inset-x-0 top-8 bottom-20 sm:bottom-24 px-4 sm:px-6 pt-4 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#090e17] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#090e17] to-transparent z-10 pointer-events-none" />

        <div className="flex flex-wrap gap-x-2 gap-y-1.5 text-sm sm:text-base font-mono leading-relaxed">
          {visibleWords.map(({ word, absIdx }) => {
            const isTyped = absIdx < currentAbsIdx
            const isActive = absIdx === currentAbsIdx
            const isUpcoming = absIdx > currentAbsIdx

            return (
              <span
                key={absIdx}
                className={`transition-colors duration-200 ${
                  isTyped
                    ? 'text-green-500/40'
                    : isActive
                      ? 'relative'
                      : 'text-slate-600'
                }`}
              >
                {isActive ? (
                  <>
                    <span style={{ color: theme.color }}>
                      {word.slice(0, state.charIndex)}
                    </span>
                    <span
                      className="border-b-2 transition-colors duration-300"
                      style={{
                        color: 'rgba(148,163,184,0.8)',
                        borderColor: theme.color,
                      }}
                    >
                      {word[state.charIndex] ?? ''}
                    </span>
                    <span className="text-slate-500">
                      {word.slice(state.charIndex + 1)}
                    </span>
                  </>
                ) : isUpcoming ? (
                  <span className="zenotype-shimmer">{word}</span>
                ) : (
                  word
                )}
              </span>
            )
          })}
        </div>
      </div>

      {/* AI shimmer CSS */}
      <style>{`
        @keyframes zenotype-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .zenotype-shimmer {
          background: linear-gradient(
            90deg,
            #475569 0%,
            #94a3b8 50%,
            #475569 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: zenotype-shimmer 3s ease-in-out infinite;
        }
      `}</style>

      {/* Finger overlay */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-6 sm:gap-10">
        <div className="flex items-end gap-0.5 sm:gap-1">
          <DemoFinger active={state.activeFinger === 'l-pinky'} h="h-5 sm:h-7" theme={theme} />
          <DemoFinger active={state.activeFinger === 'l-ring'} h="h-7 sm:h-10" theme={theme} />
          <DemoFinger active={state.activeFinger === 'l-middle'} h="h-8 sm:h-12" theme={theme} />
          <DemoFinger active={state.activeFinger === 'l-index'} h="h-7 sm:h-10" theme={theme} />
          <div className="ml-1 sm:ml-2 pb-1">
            <DemoFinger active={state.activeFinger === 'thumbs'} h="h-4 sm:h-6" rotate="-rotate-[35deg] origin-bottom-left" theme={theme} />
          </div>
        </div>

        <div className="flex items-end gap-0.5 sm:gap-1">
          <div className="mr-1 sm:mr-2 pb-1">
            <DemoFinger active={state.activeFinger === 'thumbs'} h="h-4 sm:h-6" rotate="rotate-[35deg] origin-bottom-right" theme={theme} />
          </div>
          <DemoFinger active={state.activeFinger === 'r-index'} h="h-7 sm:h-10" theme={theme} />
          <DemoFinger active={state.activeFinger === 'r-middle'} h="h-8 sm:h-12" theme={theme} />
          <DemoFinger active={state.activeFinger === 'r-ring'} h="h-7 sm:h-10" theme={theme} />
          <DemoFinger active={state.activeFinger === 'r-pinky'} h="h-5 sm:h-7" theme={theme} />
        </div>
      </div>
    </div>
  )
}
