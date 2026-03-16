# StankyDanko Portfolio — Brand Revival Design Spec

**Date:** 2026-03-16
**Status:** Approved
**URL:** stankydanko.github.io

## 1. Brand Identity

### Positioning
StankyDanko is a creative alias — not a character narrating the site, but a memorable brand attached to real projects. The voice DNA (from the Ollama Modelfile: whimsy + grit + soul + fire + rebellion) comes through in copywriting, not lore. The audience is self-selecting: misfits, dreamers, coders, collaborators, and employers who appreciate authenticity.

### Visual Direction: Evolved Cyberpunk
- Dark backgrounds (#0A0710 primary, #0d1117 cards)
- Neon accents: green (#4ADE80), purple (#9333EA), cyan (#06B6D4)
- Per-project accent colors: orange (#f47215) Naptime's Over, blue (#58a6ff) OMNI, purple (#9333EA) ZenoType
- Monospace typography (JetBrains Mono or system monospace)
- Subtle effects only — no scanlines, no glitch animations, no visual noise. Personality lives in the work and the words.

### Brand Marks
- **Hero image:** Enhanced avatar generated via Gemini Imagen — refined version of the botanical cyberpunk character (danko.jpg), optimized for web (circular crop, ~200px display)
- **Nav logo + favicon:** Leaf-circuit SVG — a stylized leaf where the veins are circuit board traces, neon green on dark. SVG format for scalability and potential hover animation (veins light up).

## 2. Page Structure

Single-page React app with smooth-scroll sections. No routing needed — all content on one page.

### 2.1 Navigation (Fixed)
- Left: Leaf-circuit logo + "STANKYDANKO" text
- Center/Right: Section links — PROJECTS (`#headliners`), ALBUM (`#album` → starts player), ABOUT (`#about`), CONNECT (`#about` social links)
- Far right: Social icons — GitHub (https://github.com/StankyDanko), X, YouTube
- Behavior: transparent on top, solid dark background on scroll

### 2.2 Hero Section
- Large circular avatar image (enhanced danko character)
- "STANKYDANKO" heading
- "CODE · MUSIC · CHAOS" subtitle in purple, letter-spaced
- 4-line bio, each on its own line:
  ```
  Builder of intelligence systems.
  Producer of heavy metal nursery rhymes.
  Grower of digital gardens.
  Misfits, dreamers, and coders welcome.  (in subtle green)
  ```

### 2.3 Headliners Section
Three full-width showcase cards, each with its own accent color border and tags.

**Card 1 — Naptime's Over (orange #f47215)**
- Title + "Heavy Metal Nursery Rhymes — 17 Tracks" subtitle (17 produced tracks; track 06 has two versions — use `_1` as the album version)
- Album description copy
- Album art thumbnail + track listing preview (first 3 tracks with subgenre tags)
- CTA: "Press Play" (scrolls to player / starts playback)

**Card 2 — OMNI (blue #58a6ff)**
- Title + "Intelligence Operating System" subtitle
- Description of the platform
- Media embed: OG image or promo video (OMNI-promo-FINAL-v2-iphone.m4v)
- Tags: LIVE, Next.js, CesiumJS
- CTAs: "LAUNCH OMNI →" (links to omni.southernsky.cloud) + "GitHub"

**Card 3 — ZenoType (purple #9333EA)**
- Title + "AI Typing Coach — The Cultural Uplink (v0.7)" subtitle
- Description of features (keystroke analytics, keyboard heatmaps, Ollama integration)
- Tags: AI, Ollama, React
- Screenshots when available (placeholder for now)

### 2.4 The Garden (Supporting Projects)
2×2 responsive grid of compact cards:

| Project | Color | Description |
|---------|-------|-------------|
| SouthernSky | #3fb950 | Cloud platform & parent brand |
| Star Catcher | #06B6D4 | Web game — cosmic leap (WIP) |
| video-fx | #EC4899 | Face tracking + cinematic effects |
| Local AI Rig | #f59e0b | 69 models, RTX 3080 Ti, Ollama |

Each card: project name, one-line description, link if applicable.

### 2.5 About Section
- Avatar (smaller, circular)
- Short bio paragraph: "Full-stack builder, music producer, and digital gardener. Everything I make lives at the intersection of code, creativity, and controlled chaos."
- Social links row: GitHub (StankyDanko), Twitter/X, YouTube

### 2.6 Persistent Album Player (Bottom Bar)
Fixed to bottom of viewport, always visible (starts paused). Dark background (#0d1117) with orange (#f47215) accent border-top.

**Layout (left to right):**
- Album art thumbnail (40×40px)
- Track name + "Naptime's Over — Track NN"
- Previous / Play-Pause / Next controls
- Progress bar (click-to-seek)
- Current time / Total time

**Behavior:**
- Player is always visible at bottom, starts paused on page load (no autoplay)
- First play interaction starts Track 01
- Continues playing across scroll — user browses the portfolio with the album as soundtrack
- Track advances automatically to next
- Mobile: collapsed state shows album art + track name + play/pause only; tap to expand full controls. All touch targets minimum 44×44px.

**Accessibility:**
- ARIA labels on all player controls (play, pause, next, previous, seek)
- Keyboard: Space = play/pause, arrow keys = seek ±5s
- `prefers-reduced-motion`: disable Framer Motion animations, use instant transitions

## 3. Audio Pipeline

### Source files
18 .wav files in `~/Downloads/Heavy Metal Nursery Rhymes/` (17 tracks; track 06 has two versions — use `06-rock-a-bye-baby_1.wav`, skip `_2`)

### Conversion
Convert all .wav → .mp3 (192kbps CBR) using ffmpeg. Store in `public/audio/` directory.

```bash
for f in ~/Downloads/Heavy\ Metal\ Nursery\ Rhymes/*.wav; do
  name=$(basename "$f" .wav)
  ffmpeg -i "$f" -codec:a libmp3lame -b:a 192k "public/audio/${name}.mp3"
done
```

### Loading strategy
- Do NOT preload all tracks
- Load on demand: preload metadata only, fetch audio data when user hits play or when next track is 1 track away
- Use HTML5 Audio API (no heavy libraries needed)

### Track manifest
JSON array in source code with track metadata:
```typescript
interface Track {
  id: number
  title: string
  subgenre: string
  file: string  // relative path to mp3
  duration?: number
}
```

## 4. Asset Preparation

| Asset | Source | Action | Destination |
|-------|--------|--------|-------------|
| Album cover | `~/Downloads/Heavy Metal Nursery Rhymes/00-NAPTIMES-OVER-album-cover.jpg` | Copy, optimize | `public/images/album-cover.jpg` |
| OMNI OG image | `~/projects/OMNI/public/og-default.png` | Copy | `public/images/omni-og.png` |
| OMNI promo video | `~/Downloads/OMNI-promo-FINAL-v2-iphone.m4v` | Convert to .mp4 (web-compatible) | `public/video/omni-promo.mp4` |
| Avatar | `~/projects/StankyDanko/public/danko.jpg` | Generate enhanced version via Gemini Imagen | `public/images/danko-hero.jpg` |
| Leaf-circuit logo | N/A | Create SVG | `public/images/logo.svg` + `public/favicon.svg` |
| Audio tracks | `~/Downloads/Heavy Metal Nursery Rhymes/*.wav` | Convert to .mp3 192kbps | `public/audio/*.mp3` |

## 5. Tech Stack

**Keep existing:**
- React 19.2.0
- TypeScript 5.9
- Vite 7.3.1
- Tailwind CSS 3.4
- Framer Motion 12.34 (currently unused — activate for scroll animations)

**Add:**
- None — existing stack is sufficient

**Update:**
- `tailwind.config.js` — replace stale `stankyGreen: '#10B981'` and `dankPurple: '#6D28D9'` with spec palette colors (#4ADE80, #9333EA, #06B6D4, #f47215, #58a6ff)

**Remove:**
- 6 × App.tsx.bak files (cleanup)
- `public/danko.jpg.bak` + `public/stankydanko.jpg.bak`
- Duplicate stankydanko.jpg (keep danko.jpg)
- Default vite.svg

## 6. Code Architecture

Current: everything in a single 600-line App.tsx. Refactor into:

```
src/
  components/
    Nav.tsx
    Hero.tsx
    Headliners/
      HeadlinerCard.tsx
      NaptimesOver.tsx
      OmniCard.tsx
      ZenoTypeCard.tsx
    Garden.tsx
    About.tsx
    AlbumPlayer.tsx
  data/
    tracks.ts         # Track manifest
    projects.ts       # Project metadata
  hooks/
    useAudioPlayer.ts # Audio playback state + controls
    useScrollSpy.ts   # Active section tracking for nav
  App.tsx             # Layout shell + section composition
  main.tsx
  index.css
```

## 7. SEO & Meta

```html
<title>StankyDanko — Code · Music · Chaos</title>
<meta name="description" content="Builder of intelligence systems. Producer of heavy metal nursery rhymes. Grower of digital gardens.">
<meta property="og:image" content="/images/danko-hero.jpg">
<meta property="og:title" content="StankyDanko">
<meta property="og:description" content="Code · Music · Chaos">
<meta name="twitter:card" content="summary_large_image">
```

## 8. Deployment

**Repo:** `StankyDanko/stankydanko.github.io` — this is a GitHub Pages user site, so `base: '/'` in `vite.config.ts` is correct. No path prefix needed.

Existing GitHub Actions workflow (`.github/workflows/deploy.yml`) handles:
- Push to `main` → build → deploy to `gh-pages` branch
- No changes needed to deployment pipeline

**Note:** Audio files (~70-80MB total as .mp3 at 192kbps) will be committed to the repo. GitHub Pages has a 1GB limit — well within bounds. Verify actual size after conversion. If the repo grows beyond comfort, audio can be moved to a CDN later.

## 9. Scope Boundaries

**In scope:**
- Full page redesign with all sections described above
- Persistent album player with all 17 produced tracks
- Asset preparation (image optimization, audio conversion, video conversion)
- Avatar enhancement via Gemini Imagen
- Leaf-circuit SVG logo creation
- Code refactoring from monolith to components
- SEO meta tags

**Out of scope (future work):**
- Blog / "Spores" section (can add later)
- Interactive terminal (remove — was a gimmick)
- Email signup form (remove unless connected to a real backend)
- Backend / CMS integration
- Analytics / tracking
- New content for ZenoType screenshots (can add when available)
- Finishing Star Catcher game
