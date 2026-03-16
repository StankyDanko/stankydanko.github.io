# StankyDanko Brand Revival — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform stankydanko.github.io from a synthwave placeholder into a professional portfolio showcasing Naptime's Over album, OMNI, and ZenoType — with a persistent album player as the site soundtrack.

**Architecture:** Single-page React app refactored from a 635-line monolith into focused components (Nav, Hero, Headliners, Garden, About, AlbumPlayer) with shared data files and a custom `useAudioPlayer` hook managing HTML5 Audio state. No routing — smooth-scroll sections with a fixed nav and persistent bottom player bar.

**Tech Stack:** React 19.2, TypeScript 5.9, Vite 7.3, Tailwind CSS 3.4, Framer Motion 12.34, HTML5 Audio API

**Spec:** `docs/superpowers/specs/2026-03-16-stankydanko-brand-revival-design.md`

---

## Chunk 1: Foundation — Cleanup, Config, Assets, Data Layer

### Task 1: Cleanup — Remove stale files

**Files:**
- Delete: `src/App.tsx.bak`, `src/App.tsx.bak2`, `src/App.tsx.bak3`, `src/App.tsx.bak4`, `src/App.tsx.bak5`, `src/App.tsx.bak6`
- Delete: `public/danko.jpg.bak`, `public/stankydanko.jpg.bak`, `public/stankydanko.jpg`, `public/vite.svg`
- Delete: `src/App.css` (unused legacy styles)
- Delete: `src/assets/react.svg` (default Vite template asset)

- [ ] **Step 1: Remove backup and stale files**

```bash
cd ~/projects/StankyDanko
rm -f src/App.tsx.bak src/App.tsx.bak2 src/App.tsx.bak3 src/App.tsx.bak4 src/App.tsx.bak5 src/App.tsx.bak6
rm -f public/danko.jpg.bak public/stankydanko.jpg.bak public/stankydanko.jpg public/vite.svg
rm -f src/App.css src/assets/react.svg
```

- [ ] **Step 2: Fix duplicate import in main.tsx**

`src/main.tsx` imports `./index.css` twice (lines 3 and 5). Remove the duplicate.

```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 3: Verify build still passes**

```bash
npm run build
```
Expected: Build succeeds (App.tsx still exists as monolith, just cleaned up surrounding files)

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove stale backups, duplicates, and unused assets"
```

---

### Task 2: Update configuration files

**Files:**
- Modify: `tailwind.config.js` — replace stale colors with spec palette
- Modify: `index.html` — SEO meta tags, favicon, title
- Modify: `src/index.css` — add JetBrains Mono font import + base styles

- [ ] **Step 1: Update Tailwind config with brand colors**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0A0710',
          card: '#0d1117',
          green: '#4ADE80',
          purple: '#9333EA',
          cyan: '#06B6D4',
          orange: '#f47215',
          blue: '#58a6ff',
          pink: '#EC4899',
          amber: '#f59e0b',
          muted: '#8b949e',
          text: '#e6edf3',
          subtle: '#9ca3af',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(74, 222, 128, 0.15)',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Update index.html with SEO meta tags**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>StankyDanko — Code · Music · Chaos</title>
    <meta name="description" content="Builder of intelligence systems. Producer of heavy metal nursery rhymes. Grower of digital gardens." />
    <meta property="og:image" content="/images/danko-hero.jpg" />
    <meta property="og:title" content="StankyDanko" />
    <meta property="og:description" content="Code · Music · Chaos" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Update index.css with base dark theme styles**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-brand-dark text-brand-text font-mono antialiased;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: #9333EA #0A0710;
  }
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.js index.html src/index.css
git commit -m "chore: update brand colors, SEO meta, base styles"
```

---

### Task 3: Asset preparation — Audio conversion

**Files:**
- Create: `public/audio/` directory with 17 .mp3 files

- [ ] **Step 1: Create audio directory and convert .wav to .mp3**

```bash
cd ~/projects/StankyDanko
mkdir -p public/audio

# Convert all .wav files, skipping the _2 version of track 06
for f in ~/Downloads/Heavy\ Metal\ Nursery\ Rhymes/*.wav; do
  name=$(basename "$f" .wav)
  # Skip the alternate version
  if [ "$name" = "06-rock-a-bye-baby_2" ]; then
    echo "Skipping alternate: $name"
    continue
  fi
  echo "Converting: $name"
  ffmpeg -i "$f" -codec:a libmp3lame -b:a 192k -y "public/audio/${name}.mp3"
done
```

- [ ] **Step 2: Verify 17 mp3 files created**

```bash
ls -la public/audio/*.mp3 | wc -l  # Should be 17
du -sh public/audio/               # Should be ~70-80MB
```

- [ ] **Step 3: Commit audio files**

```bash
git add public/audio/
git commit -m "feat: add Naptime's Over album as mp3 (17 tracks, 192kbps)"
```

---

### Task 4: Asset preparation — Images and video

**Files:**
- Create: `public/images/album-cover.jpg`
- Create: `public/images/omni-og.png`
- Create: `public/images/danko-hero.jpg` (enhanced via Gemini Imagen)
- Create: `public/video/omni-promo.mp4`

- [ ] **Step 1: Create directories and copy static assets**

```bash
cd ~/projects/StankyDanko
mkdir -p public/images public/video

# Album cover
cp ~/Downloads/Heavy\ Metal\ Nursery\ Rhymes/00-NAPTIMES-OVER-album-cover.jpg public/images/album-cover.jpg

# OMNI OG image
cp ~/projects/OMNI/public/og-default.png public/images/omni-og.png

# Avatar — copy existing as baseline (enhance with Gemini Imagen separately)
cp public/danko.jpg public/images/danko-hero.jpg
```

- [ ] **Step 2: Convert OMNI promo video to web-compatible mp4**

```bash
ffmpeg -i ~/Downloads/OMNI-promo-FINAL-v2-iphone.m4v \
  -c:v libx264 -preset medium -crf 23 \
  -c:a aac -b:a 128k \
  -movflags +faststart \
  -y public/video/omni-promo.mp4
```

- [ ] **Step 3: Generate enhanced avatar via Gemini Imagen**

```bash
node ~/tools/ai-scripts/gemini-images.mjs --custom "Enhance this botanical cyberpunk character portrait for a web portfolio hero image. The character is a half-plant half-digital entity with glowing green circuit-trace veins, set against a dark background (#0A0710). Style: clean, iconic, high contrast neon green and purple accents on dark. Circular crop friendly. Professional but with edge." --reference ~/projects/StankyDanko/public/danko.jpg
```

Move the generated image to `public/images/danko-hero.jpg` (replacing the baseline copy).

> **Note:** If Gemini Imagen doesn't produce a satisfactory result, the existing danko.jpg works as a fallback. This step can be iterated on after the site is functional.

- [ ] **Step 4: Create leaf-circuit SVG logo**

Create `public/images/logo.svg` — a stylized leaf where the veins are circuit board traces. Neon green (#4ADE80) on transparent background. Also copy as `public/favicon.svg`.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <!-- Leaf outline -->
  <path d="M16 2C10 2 4 8 4 16c0 6 4 12 12 14 8-2 12-8 12-14C28 8 22 2 16 2z"
        stroke="#4ADE80" stroke-width="1.5" fill="#4ADE8015"/>
  <!-- Central vein (circuit trace) -->
  <line x1="16" y1="6" x2="16" y2="26" stroke="#4ADE80" stroke-width="1.5"/>
  <!-- Circuit branch veins -->
  <path d="M16 10 L10 14 M16 10 L22 14" stroke="#4ADE80" stroke-width="1" stroke-linecap="round"/>
  <path d="M16 16 L9 19 M16 16 L23 19" stroke="#4ADE80" stroke-width="1" stroke-linecap="round"/>
  <path d="M16 21 L11 23 M16 21 L21 23" stroke="#4ADE80" stroke-width="1" stroke-linecap="round"/>
  <!-- Circuit nodes (solder points) -->
  <circle cx="10" cy="14" r="1.2" fill="#4ADE80"/>
  <circle cx="22" cy="14" r="1.2" fill="#4ADE80"/>
  <circle cx="9" cy="19" r="1.2" fill="#4ADE80"/>
  <circle cx="23" cy="19" r="1.2" fill="#4ADE80"/>
  <circle cx="16" cy="6" r="1.5" fill="#4ADE80"/>
</svg>
```

```bash
# Copy logo as favicon
cp public/images/logo.svg public/favicon.svg
```

> **Note:** This is a starting SVG. Can be refined with more detailed circuit traces later. The key is having a functional SVG to unblock development.

- [ ] **Step 5: Verify all assets**

```bash
ls -la public/images/
ls -la public/video/
ls -la public/favicon.svg
```

Expected: album-cover.jpg, omni-og.png, danko-hero.jpg, logo.svg in images/; omni-promo.mp4 in video/; favicon.svg in public root.

- [ ] **Step 6: Commit**

```bash
git add public/images/ public/video/ public/favicon.svg
git commit -m "feat: add portfolio assets (album art, OMNI media, logo SVG, favicon)"
```

---

### Task 5: Data layer — Track manifest and project metadata

**Files:**
- Create: `src/data/tracks.ts`
- Create: `src/data/projects.ts`

- [ ] **Step 1: Create src/data/ directory**

```bash
mkdir -p ~/projects/StankyDanko/src/data
```

- [ ] **Step 2: Write track manifest**

`src/data/tracks.ts`:

```typescript
export interface Track {
  id: number
  title: string
  subgenre: string
  file: string
}

export const tracks: Track[] = [
  { id: 1,  title: 'Do Your Ears Hang Low',       subgenre: 'Thrash Metal',              file: '/audio/01-do-your-ears-hang-low.mp3' },
  { id: 2,  title: 'Ring Around the Rosie',       subgenre: 'Doom / Blackened Thrash',    file: '/audio/02-ring-around-the-rosie.mp3' },
  { id: 3,  title: 'Three Blind Mice',            subgenre: 'Speed Metal',                file: '/audio/03-three-blind-mice.mp3' },
  { id: 4,  title: 'Old MacDonald Had a Farm',    subgenre: 'Power Metal',                file: '/audio/04-old-macdonald.mp3' },
  { id: 5,  title: 'London Bridge Is Falling Down', subgenre: 'Groove / Industrial',      file: '/audio/05-london-bridge-is-falling.mp3' },
  { id: 6,  title: 'Rock-a-Bye Baby',             subgenre: 'Symphonic Metal',            file: '/audio/06-rock-a-bye-baby_1.mp3' },
  { id: 7,  title: 'Mary Had a Little Lamb',      subgenre: 'Death Metal',                file: '/audio/07-mary-had-a-little-lamb.mp3' },
  { id: 8,  title: 'Twinkle Twinkle Little Star', subgenre: 'Progressive Metal',          file: '/audio/08-twinkle-twinkle-little-star.mp3' },
  { id: 9,  title: 'Itsy Bitsy Spider',           subgenre: 'Melodic Metalcore',          file: '/audio/09-itsy-bitsy-spider.mp3' },
  { id: 10, title: 'Wheels on the Bus',           subgenre: 'Industrial Metal',           file: '/audio/10-wheels-on-the-bus.mp3' },
  { id: 11, title: 'Hot Cross Buns',              subgenre: 'Djent',                      file: '/audio/11-hot-cross-buns.mp3' },
  { id: 12, title: 'Humpty Dumpty',               subgenre: 'Progressive Ballad',         file: '/audio/12-humpty-dumpty.mp3' },
  { id: 13, title: 'Jack and Jill',               subgenre: 'Crossover Thrash',           file: '/audio/13-jack-and-jill.mp3' },
  { id: 14, title: 'The ABCs',                    subgenre: 'Alt-Metal / Cinematic Rock', file: '/audio/14-the-abcs.mp3' },
  { id: 15, title: 'This Little Piggy',           subgenre: 'Alt-Metal',                  file: '/audio/15-this-little-piggy.mp3' },
  { id: 16, title: 'Bah Bah Black Sheep',         subgenre: 'Stoner Doom',                file: '/audio/16-bah-bah-black-sheep.mp3' },
  { id: 17, title: 'Happy Birthday',              subgenre: 'Power Metal',                file: '/audio/17-happy-birthday.mp3' },
]
```

- [ ] **Step 3: Write project metadata**

`src/data/projects.ts`:

```typescript
export interface HeadlinerProject {
  id: string
  title: string
  subtitle: string
  description: string
  color: string
  tags: string[]
  links?: { label: string; url: string; primary?: boolean }[]
  media?: { type: 'image' | 'video'; src: string; alt: string }
}

export interface GardenProject {
  id: string
  title: string
  description: string
  color: string
  url?: string
}

export const headliners: HeadlinerProject[] = [
  {
    id: 'naptimes-over',
    title: "NAPTIME'S OVER",
    subtitle: 'Heavy Metal Nursery Rhymes — 17 Tracks',
    description: 'What happens when a sentient plant decides nursery rhymes need more distortion. 17 tracks of thrash, doom, power metal, and gothic fury — from "Do Your Ears Hang Low" to "Happy Birthday."',
    color: '#f47215',
    tags: ['ALBUM'],
    links: [{ label: 'Press Play', url: '#album', primary: true }],
  },
  {
    id: 'omni',
    title: 'OMNI',
    subtitle: 'Intelligence Operating System',
    description: 'Real-time global intelligence dashboard. 3D globe, satellite tracking, vessel monitoring, weather overlays, earthquake feeds — all fused into one command interface.',
    color: '#58a6ff',
    tags: ['LIVE', 'Next.js', 'CesiumJS'],
    links: [
      { label: 'LAUNCH OMNI →', url: 'https://omni.southernsky.cloud', primary: true },
      { label: 'GitHub', url: 'https://github.com/StankyDanko/OMNI' },
    ],
    media: { type: 'video', src: '/video/omni-promo.mp4', alt: 'OMNI intelligence dashboard demo' },
  },
  {
    id: 'zenotype',
    title: 'ZENOTYPE',
    subtitle: 'AI Typing Coach — The Cultural Uplink (v0.7)',
    description: 'Terminal-inspired typing coach powered by local AI. Real-time keystroke analytics, keyboard heatmaps, adaptive difficulty, gamified flow states. Ollama generates infinite practice text tuned to your weak spots.',
    color: '#9333EA',
    tags: ['AI', 'Ollama', 'React'],
  },
]

export const gardenProjects: GardenProject[] = [
  { id: 'southernsky', title: 'SouthernSky',    description: 'Cloud platform & parent brand',        color: '#3fb950', url: 'https://southernsky.cloud' },
  { id: 'starcatcher', title: 'Star Catcher',    description: 'Web game — cosmic leap (WIP)',          color: '#06B6D4', url: 'https://stankydanko.github.io/star-catcher' },
  { id: 'video-fx',    title: 'video-fx',        description: 'Face tracking + cinematic effects',     color: '#EC4899' },
  { id: 'local-ai',    title: 'Local AI Rig',    description: '69 models, RTX 3080 Ti, Ollama',        color: '#f59e0b' },
]
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 5: Commit**

```bash
git add src/data/
git commit -m "feat: add track manifest and project metadata"
```

---

## Chunk 2: Core Hooks and Component Shell

### Task 6: useAudioPlayer hook

**Files:**
- Create: `src/hooks/useAudioPlayer.ts`

This is the most complex piece of logic in the project. It manages a single HTML5 Audio element, track state, playback controls, and progress tracking.

- [ ] **Step 1: Create hooks directory**

```bash
mkdir -p ~/projects/StankyDanko/src/hooks
```

- [ ] **Step 2: Write useAudioPlayer hook**

`src/hooks/useAudioPlayer.ts`:

```typescript
import { useState, useRef, useEffect, useCallback } from 'react'
import { tracks, type Track } from '../data/tracks'

export interface AudioPlayerState {
  currentTrack: Track
  isPlaying: boolean
  currentTime: number
  duration: number
  trackIndex: number
}

export interface AudioPlayerControls {
  play: () => void
  pause: () => void
  togglePlay: () => void
  next: () => void
  previous: () => void
  seekTo: (time: number) => void
  playTrack: (index: number) => void
}

export function useAudioPlayer(): AudioPlayerState & AudioPlayerControls {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const isPlayingRef = useRef(false)
  const [trackIndex, setTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // Keep ref in sync with state
  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  // Initialize audio element once
  useEffect(() => {
    const audio = new Audio()
    audio.preload = 'metadata'
    audioRef.current = audio

    const onTimeUpdate = () => setCurrentTime(audio.currentTime)
    const onDurationChange = () => setDuration(audio.duration || 0)
    const onEnded = () => {
      // Auto-advance to next track
      setTrackIndex((prev) => {
        const next = prev + 1
        return next < tracks.length ? next : 0
      })
    }
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('durationchange', onDurationChange)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('durationchange', onDurationChange)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.pause()
      audio.src = ''
    }
  }, [])

  // Load track when index changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const wasPlaying = isPlayingRef.current
    audio.src = tracks[trackIndex].file
    audio.load()
    setCurrentTime(0)
    setDuration(0)

    if (wasPlaying) {
      audio.play().catch(() => {
        // Browser may block autoplay — user needs to interact first
        setIsPlaying(false)
      })
    }
  }, [trackIndex])

  const play = useCallback(() => {
    audioRef.current?.play().catch(() => setIsPlaying(false))
  }, [])

  const pause = useCallback(() => {
    audioRef.current?.pause()
  }, [])

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }, [isPlaying, play, pause])

  const next = useCallback(() => {
    setTrackIndex((prev) => (prev + 1) % tracks.length)
  }, [])

  const previous = useCallback(() => {
    const audio = audioRef.current
    // If more than 3 seconds in, restart current track
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0
      return
    }
    setTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length)
  }, [])

  const seekTo = useCallback((time: number) => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = time
      setCurrentTime(time)
    }
  }, [])

  const playTrack = useCallback((index: number) => {
    if (index >= 0 && index < tracks.length) {
      setTrackIndex(index)
      const audio = audioRef.current
      if (audio) {
        const onCanPlay = () => {
          audio.play().catch(() => setIsPlaying(false))
          audio.removeEventListener('canplay', onCanPlay)
        }
        audio.addEventListener('canplay', onCanPlay)
      }
    }
  }, [])

  return {
    currentTrack: tracks[trackIndex],
    isPlaying,
    currentTime,
    duration,
    trackIndex,
    play,
    pause,
    togglePlay,
    next,
    previous,
    seekTo,
    playTrack,
  }
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/hooks/useAudioPlayer.ts
git commit -m "feat: add useAudioPlayer hook with HTML5 Audio controls"
```

---

### Task 7: useScrollSpy hook

**Files:**
- Create: `src/hooks/useScrollSpy.ts`

- [ ] **Step 1: Write useScrollSpy hook**

`src/hooks/useScrollSpy.ts`:

```typescript
import { useState, useEffect } from 'react'

export function useScrollSpy(sectionIds: string[], offset = 100): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    const handleScroll = () => {
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i])
        if (el && el.getBoundingClientRect().top <= offset) {
          setActiveId(sectionIds[i])
          return
        }
      }
      setActiveId(sectionIds[0] ?? '')
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds, offset])

  return activeId
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/useScrollSpy.ts
git commit -m "feat: add useScrollSpy hook for nav active state"
```

---

### Task 8: Nav component

**Files:**
- Create: `src/components/Nav.tsx`

- [ ] **Step 1: Create components directory**

```bash
mkdir -p ~/projects/StankyDanko/src/components/Headliners
```

- [ ] **Step 2: Write Nav component**

`src/components/Nav.tsx`:

```tsx
import { useState, useEffect } from 'react'
import { useScrollSpy } from '../hooks/useScrollSpy'

const sections = ['headliners', 'naptimes-over', 'about']

const navLinks = [
  { label: 'PROJECTS', target: 'headliners' },
  { label: 'ALBUM', target: 'naptimes-over' },
  { label: 'ABOUT', target: 'about' },
  { label: 'CONNECT', target: 'about' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const activeSection = useScrollSpy(sections)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-brand-dark/95 backdrop-blur-sm border-b border-brand-green/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2.5 group">
          <img src="/images/logo.svg" alt="StankyDanko leaf-circuit logo" className="w-7 h-7" />
          <span className="text-brand-green font-bold text-sm tracking-wide">STANKYDANKO</span>
        </button>

        {/* Section Links */}
        <div className="hidden sm:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.target)}
              className={`text-xs tracking-wider transition-colors ${
                activeSection === link.target ? 'text-brand-green' : 'text-brand-subtle hover:text-brand-text'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          <a href="https://github.com/StankyDanko" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-brand-subtle hover:text-brand-text transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <a href="https://x.com/StankyDanko" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-brand-subtle hover:text-brand-text transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://youtube.com/@StankyDanko" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-brand-subtle hover:text-brand-text transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
        </div>
      </div>
    </nav>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "feat: add Nav component with scroll spy and social icons"
```

---

### Task 9: Hero component

**Files:**
- Create: `src/components/Hero.tsx`

- [ ] **Step 1: Write Hero component**

`src/components/Hero.tsx`:

```tsx
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center pt-16">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative text-center px-4">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-8"
        >
          <img
            src="/images/danko-hero.jpg"
            alt="StankyDanko — botanical cyberpunk character"
            className="w-40 h-40 sm:w-48 sm:h-48 rounded-full object-cover mx-auto shadow-glow ring-2 ring-brand-green/30"
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl sm:text-5xl font-bold text-brand-text tracking-tight mb-3"
        >
          STANKYDANKO
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-brand-purple text-sm tracking-[0.25em] mb-8"
        >
          CODE · MUSIC · CHAOS
        </motion.p>

        {/* Bio — 4 lines */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-brand-subtle text-base sm:text-lg leading-loose max-w-lg mx-auto"
        >
          <p>Builder of intelligence systems.</p>
          <p>Producer of heavy metal nursery rhymes.</p>
          <p>Grower of digital gardens.</p>
          <p className="text-brand-green/60">Misfits, dreamers, and coders welcome.</p>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: add Hero component with avatar, bio, and entrance animations"
```

---

### Task 10: HeadlinerCard component

**Files:**
- Create: `src/components/Headliners/HeadlinerCard.tsx`

- [ ] **Step 1: Write HeadlinerCard base component**

`src/components/Headliners/HeadlinerCard.tsx`:

```tsx
import { motion } from 'framer-motion'
import type { HeadlinerProject } from '../../data/projects'

interface Props {
  project: HeadlinerProject
  children?: React.ReactNode
}

export function HeadlinerCard({ project, children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="bg-brand-card rounded-lg p-5 sm:p-6 border"
      style={{ borderColor: `${project.color}33` }}
    >
      {/* Header: title + tags */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="text-xl font-bold" style={{ color: project.color }}>
            {project.title}
          </h3>
          <p className="text-xs text-brand-subtle mt-1">{project.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded"
              style={{
                backgroundColor: `${project.color}22`,
                color: project.color,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <p className="text-brand-muted text-sm leading-relaxed mb-4">
        {project.description}
      </p>

      {/* Slot for project-specific content (tracklist, media embed, etc.) */}
      {children}

      {/* Links */}
      {project.links && project.links.length > 0 && (
        <div className="flex flex-wrap gap-2.5 mt-4">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target={link.url.startsWith('http') ? '_blank' : undefined}
              rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`text-xs font-bold px-4 py-2 rounded transition-opacity hover:opacity-80 ${
                link.primary
                  ? 'text-brand-dark'
                  : 'bg-transparent border'
              }`}
              style={
                link.primary
                  ? { backgroundColor: project.color }
                  : { color: project.color, borderColor: `${project.color}44` }
              }
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Headliners/HeadlinerCard.tsx
git commit -m "feat: add HeadlinerCard component with accent colors and links"
```

---

## Chunk 3: Headliner Content Components

### Task 11: NaptimesOver card content

**Files:**
- Create: `src/components/Headliners/NaptimesOver.tsx`

- [ ] **Step 1: Write NaptimesOver content component**

This is the slot content rendered inside HeadlinerCard for the album. Shows album art, tracklist preview, and "Press Play" CTA that triggers the audio player.

`src/components/Headliners/NaptimesOver.tsx`:

```tsx
import { tracks } from '../../data/tracks'

interface Props {
  onPressPlay: () => void
}

export function NaptimesOverContent({ onPressPlay }: Props) {
  const previewTracks = tracks.slice(0, 3)

  return (
    <div className="flex gap-3 sm:gap-4 items-start">
      {/* Album art */}
      <img
        src="/images/album-cover.jpg"
        alt="Naptime's Over album cover"
        className="w-20 h-20 sm:w-24 sm:h-24 rounded object-cover flex-shrink-0 border border-white/5"
      />

      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-[#f47215] mb-1.5 tracking-wider">TRACKLIST PREVIEW</p>
        <div className="text-xs text-brand-muted leading-loose">
          {previewTracks.map((track) => (
            <div key={track.id} className="truncate">
              <span>{String(track.id).padStart(2, '0')}. {track.title}</span>
              {' '}
              <span className="text-brand-green/40">{track.subgenre.toLowerCase()}</span>
            </div>
          ))}
          <button
            onClick={onPressPlay}
            className="text-[#f47215]/60 hover:text-[#f47215] transition-colors mt-1 cursor-pointer"
          >
            ... {tracks.length - 3} more tracks — Press Play ▶
          </button>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Headliners/NaptimesOver.tsx
git commit -m "feat: add NaptimesOver content with album art and tracklist preview"
```

---

### Task 12: OmniCard content

**Files:**
- Create: `src/components/Headliners/OmniCard.tsx`

- [ ] **Step 1: Write Omni content component**

`src/components/Headliners/OmniCard.tsx`:

```tsx
export function OmniContent() {
  return (
    <div className="rounded-md overflow-hidden border border-white/5 bg-[#161b22]">
      <video
        src="/video/omni-promo.mp4"
        poster="/images/omni-og.png"
        controls
        preload="none"
        className="w-full aspect-video"
        aria-label="OMNI intelligence dashboard demo video"
      >
        {/* Fallback to poster image if video can't play */}
        <img src="/images/omni-og.png" alt="OMNI intelligence dashboard" className="w-full" />
      </video>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Headliners/OmniCard.tsx
git commit -m "feat: add OMNI content with promo video embed"
```

---

### Task 13: Garden component

**Files:**
- Create: `src/components/Garden.tsx`

- [ ] **Step 1: Write Garden component**

`src/components/Garden.tsx`:

```tsx
import { motion } from 'framer-motion'
import { gardenProjects } from '../data/projects'

export function Garden() {
  return (
    <section id="garden" className="px-4 sm:px-6 py-12 max-w-6xl mx-auto border-t border-white/[0.04]">
      <p className="text-[11px] tracking-[3px] text-brand-subtle mb-5">THE GARDEN</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {gardenProjects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-brand-card border border-white/[0.04] rounded-md p-4 hover:border-white/10 transition-colors"
              >
                <h4 className="text-sm font-bold" style={{ color: project.color }}>
                  {project.title}
                </h4>
                <p className="text-[10px] text-brand-muted mt-1">{project.description}</p>
              </a>
            ) : (
              <div className="bg-brand-card border border-white/[0.04] rounded-md p-4">
                <h4 className="text-sm font-bold" style={{ color: project.color }}>
                  {project.title}
                </h4>
                <p className="text-[10px] text-brand-muted mt-1">{project.description}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Garden.tsx
git commit -m "feat: add Garden component with 2x2 project grid"
```

---

### Task 14: About component

**Files:**
- Create: `src/components/About.tsx`

- [ ] **Step 1: Write About component**

`src/components/About.tsx`:

```tsx
import { motion } from 'framer-motion'

export function About() {
  return (
    <section id="about" className="px-4 sm:px-6 py-12 max-w-6xl mx-auto border-t border-white/[0.04]">
      <p className="text-[11px] tracking-[3px] text-brand-green mb-5">ABOUT</p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex gap-5 items-start"
      >
        <img
          src="/images/danko-hero.jpg"
          alt="StankyDanko"
          className="w-16 h-16 rounded-full object-cover flex-shrink-0 ring-1 ring-brand-green/20"
        />

        <div>
          <p className="text-sm text-brand-text leading-relaxed">
            Full-stack builder, music producer, and digital gardener. Everything I make lives at the intersection of code, creativity, and controlled chaos.
          </p>

          <div className="flex gap-4 mt-4">
            <a href="https://github.com/StankyDanko" target="_blank" rel="noopener noreferrer" className="text-brand-green text-xs hover:underline">
              GitHub
            </a>
            <a href="https://x.com/StankyDanko" target="_blank" rel="noopener noreferrer" className="text-brand-cyan text-xs hover:underline">
              Twitter/X
            </a>
            <a href="https://youtube.com/@StankyDanko" target="_blank" rel="noopener noreferrer" className="text-brand-pink text-xs hover:underline">
              YouTube
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/About.tsx
git commit -m "feat: add About component with bio and social links"
```

---

## Chunk 4: Album Player and App Shell

### Task 15: AlbumPlayer component

**Files:**
- Create: `src/components/AlbumPlayer.tsx`

The persistent bottom bar. Always visible, starts paused.

- [ ] **Step 1: Write AlbumPlayer component**

`src/components/AlbumPlayer.tsx`:

```tsx
import { useState } from 'react'
import type { AudioPlayerState, AudioPlayerControls } from '../hooks/useAudioPlayer'

type Props = AudioPlayerState & AudioPlayerControls

function formatTime(s: number): string {
  if (!s || !isFinite(s)) return '0:00'
  const mins = Math.floor(s / 60)
  const secs = Math.floor(s % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function AlbumPlayer(props: Props) {
  const { currentTrack, isPlaying, currentTime, duration, trackIndex, togglePlay, next, previous, seekTo } = props
  const [expanded, setExpanded] = useState(false)
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    seekTo(ratio * duration)
  }

  // Keyboard controls
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault()
      togglePlay()
    } else if (e.key === 'ArrowRight') {
      seekTo(Math.min(duration, currentTime + 5))
    } else if (e.key === 'ArrowLeft') {
      seekTo(Math.max(0, currentTime - 5))
    }
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-brand-card border-t border-[#f47215]/25"
      role="region"
      aria-label="Album player"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Mobile: compact bar (tap to expand) */}
      <div
        className={`sm:hidden flex items-center gap-3 px-4 py-2.5 ${expanded ? 'hidden' : ''}`}
        onClick={() => setExpanded(true)}
      >
        <img src="/images/album-cover.jpg" alt="Album art" className="w-10 h-10 rounded flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-brand-text truncate">{currentTrack.title}</p>
          <p className="text-[10px] text-[#f47215]">Naptime's Over — Track {String(trackIndex + 1).padStart(2, '0')}</p>
        </div>
        <button onClick={(e) => { e.stopPropagation(); togglePlay() }} className="w-10 h-10 flex items-center justify-center" aria-label={isPlaying ? 'Pause' : 'Play'}>
          <div className="w-8 h-8 rounded-full bg-[#f47215] flex items-center justify-center text-brand-dark text-sm">
            {isPlaying ? '⏸' : '▶'}
          </div>
        </button>
      </div>

      {/* Mobile: expanded view */}
      {expanded && (
        <div className="sm:hidden px-4 py-3">
          <button onClick={() => setExpanded(false)} className="text-brand-subtle text-xs mb-2">▼ Collapse</button>
          <div className="flex items-center gap-3 mb-3">
            <img src="/images/album-cover.jpg" alt="Album art" className="w-12 h-12 rounded flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-brand-text truncate">{currentTrack.title}</p>
              <p className="text-[10px] text-[#f47215]">Naptime's Over — Track {String(trackIndex + 1).padStart(2, '0')}</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 mb-3">
            <button onClick={previous} className="text-brand-subtle text-lg w-11 h-11 flex items-center justify-center" aria-label="Previous track">⏮</button>
            <button onClick={togglePlay} className="w-12 h-12 rounded-full bg-[#f47215] flex items-center justify-center text-brand-dark text-lg" aria-label={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button onClick={next} className="text-brand-subtle text-lg w-11 h-11 flex items-center justify-center" aria-label="Next track">⏭</button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-brand-subtle w-10 text-right">{formatTime(currentTime)}</span>
            <div className="flex-1 h-1 bg-[#21262d] rounded cursor-pointer" onClick={handleSeek}>
              <div className="h-full bg-[#f47215] rounded transition-[width] duration-100" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-[10px] text-brand-subtle w-10">{formatTime(duration)}</span>
          </div>
        </div>
      )}

      {/* Desktop: full bar */}
      <div className="hidden sm:flex items-center gap-4 px-4 sm:px-6 py-2.5 max-w-6xl mx-auto">
        <img src="/images/album-cover.jpg" alt="Album art" className="w-10 h-10 rounded flex-shrink-0" />

        <div className="w-48 min-w-0">
          <p className="text-xs text-brand-text truncate">{currentTrack.title}</p>
          <p className="text-[10px] text-[#f47215]">Naptime's Over — Track {String(trackIndex + 1).padStart(2, '0')}</p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={previous} className="text-brand-subtle hover:text-brand-text transition-colors w-8 h-8 flex items-center justify-center" aria-label="Previous track">⏮</button>
          <button onClick={togglePlay} className="w-8 h-8 rounded-full bg-[#f47215] flex items-center justify-center text-brand-dark text-sm hover:opacity-90 transition-opacity" aria-label={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button onClick={next} className="text-brand-subtle hover:text-brand-text transition-colors w-8 h-8 flex items-center justify-center" aria-label="Next track">⏭</button>
        </div>

        <div className="flex-1 flex items-center gap-2">
          <span className="text-[10px] text-brand-subtle w-10 text-right">{formatTime(currentTime)}</span>
          <div className="flex-1 h-1 bg-[#21262d] rounded cursor-pointer group" onClick={handleSeek} role="slider" aria-label="Seek" aria-valuenow={Math.round(currentTime)} aria-valuemin={0} aria-valuemax={Math.round(duration)}>
            <div className="h-full bg-[#f47215] rounded transition-[width] duration-100 group-hover:bg-[#f4721599]" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-[10px] text-brand-subtle w-10">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/AlbumPlayer.tsx
git commit -m "feat: add AlbumPlayer with mobile collapse, seek, keyboard controls"
```

---

### Task 16: Rewrite App.tsx as layout shell

**Files:**
- Rewrite: `src/App.tsx` — replace 635-line monolith with clean composition

- [ ] **Step 1: Replace App.tsx with component composition**

`src/App.tsx`:

```tsx
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { HeadlinerCard } from './components/Headliners/HeadlinerCard'
import { NaptimesOverContent } from './components/Headliners/NaptimesOver'
import { OmniContent } from './components/Headliners/OmniCard'
import { Garden } from './components/Garden'
import { About } from './components/About'
import { AlbumPlayer } from './components/AlbumPlayer'
import { useAudioPlayer } from './hooks/useAudioPlayer'
import { headliners } from './data/projects'

export default function App() {
  const player = useAudioPlayer()

  const naptimesOver = headliners[0]
  const omni = headliners[1]
  const zenotype = headliners[2]

  return (
    <div className="min-h-screen pb-16">
      <Nav />
      <Hero />

      {/* Headliners */}
      <section id="headliners" className="px-4 sm:px-6 py-12 max-w-6xl mx-auto space-y-4 border-t border-white/[0.04]">
        <p className="text-[11px] tracking-[3px] text-brand-green mb-5">HEADLINERS</p>

        <div id="naptimes-over">
          <HeadlinerCard project={naptimesOver}>
            <NaptimesOverContent onPressPlay={() => player.playTrack(0)} />
          </HeadlinerCard>
        </div>

        <HeadlinerCard project={omni}>
          <OmniContent />
        </HeadlinerCard>

        <HeadlinerCard project={zenotype} />
      </section>

      <Garden />
      <About />
      <AlbumPlayer {...player} />
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: Clean build, no errors. All components imported and composed.

- [ ] **Step 3: Run dev server and visual check**

```bash
npm run dev
```

Open http://localhost:5173 in browser. Verify:
- Nav visible at top with logo, links, social icons
- Hero section with avatar, heading, subtitle, 4-line bio
- Headliners: Naptime's Over (orange), OMNI (blue), ZenoType (purple) cards
- Garden: 2×2 grid of supporting projects
- About section with avatar and social links
- Album player fixed at bottom, shows Track 01, starts paused
- Click play → audio plays
- Navigate tracks with prev/next
- Progress bar updates and is seekable
- Scroll animations trigger on viewport entry

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "feat: rewrite App.tsx as component shell — full portfolio redesign"
```

---

## Chunk 5: Polish and Deploy

### Task 17: Responsive and visual polish

**Files:**
- Modify: various components as needed for responsive tweaks

- [ ] **Step 1: Test responsive breakpoints**

Open dev tools and test at:
- 375px (iPhone SE)
- 390px (iPhone 14)
- 768px (iPad)
- 1024px (laptop)
- 1440px (desktop)

Fix any overflow, truncation, or layout issues found.

- [ ] **Step 2: Add prefers-reduced-motion support**

In `src/components/Hero.tsx`, `src/components/Garden.tsx`, and `src/components/About.tsx`, ensure Framer Motion respects reduced motion. Add to `src/App.tsx` (or a shared config):

The Framer Motion `motion` components already respect `prefers-reduced-motion` when using `initial`/`animate` — they disable animations automatically. Verify this works by enabling reduced motion in your OS/browser settings and confirming no animations play.

- [ ] **Step 3: Clean up old danko.jpg from public root**

The original `public/danko.jpg` is no longer referenced (hero uses `public/images/danko-hero.jpg`). Keep it for now as a fallback — it won't be deployed unless referenced.

- [ ] **Step 4: Run final build and lint**

```bash
npm run lint
npm run build
```

Fix any lint errors or TypeScript issues.

- [ ] **Step 5: Commit all polish changes**

```bash
git add -A
git commit -m "chore: responsive polish and final build verification"
```

---

### Task 18: Final verification and deploy

- [ ] **Step 1: Preview production build locally**

```bash
npm run preview
```

Open http://localhost:4173 and do a full walkthrough:
- All sections render correctly
- Album player works (play, pause, next, previous, seek)
- Audio files load and play
- Video plays in OMNI card
- All links work (GitHub, X, YouTube, OMNI, SouthernSky, Star Catcher)
- Nav scroll-spy highlights correct section
- Mobile layout works (responsive)
- No console errors

- [ ] **Step 2: Push to main (triggers GitHub Actions deploy)**

```bash
git push origin main
```

- [ ] **Step 3: Verify live site**

Wait for GitHub Actions to complete (~2 min), then check https://stankydanko.github.io:
- All sections render
- Audio plays
- Video plays
- Links work
- Mobile responsive

---

## Summary

| Chunk | Tasks | What it delivers |
|-------|-------|-----------------|
| 1: Foundation | Tasks 1-5 | Clean repo, updated config, all assets, data layer |
| 2: Core Hooks + Components | Tasks 6-10 | Audio player hook, scroll spy, Nav, Hero, HeadlinerCard |
| 3: Content Components | Tasks 11-14 | Naptime's Over, OMNI, Garden, About |
| 4: Player + App Shell | Tasks 15-16 | Persistent album player, App.tsx rewrite |
| 5: Polish + Deploy | Tasks 17-18 | Responsive fixes, build verification, live deploy |

**Total: 18 tasks across 5 chunks. Each task is a focused commit.**
