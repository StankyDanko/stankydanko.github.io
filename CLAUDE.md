# StankyDanko — Personal Portfolio

## Identity

StankyDanko is Justin's personal portfolio and creative showcase. A dark, synthwave-aesthetic single-page site featuring headliner projects (Naptime's Over album, OMNI, ZenoType), a "Garden" of smaller projects, and an interactive album player.

| | |
|---|---|
| **Live URL** | https://stankydanko.github.io/ |
| **Deployment** | GitHub Pages (auto-deploy on push to main via GitHub Actions) |
| **Repo** | https://github.com/StankyDanko/stankydanko.github.io |

## Tech Stack

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| **Runtime** | Node.js | 20.x | Build tooling |
| **Framework** | React | 19.2 | Automatic JSX transform |
| **Language** | TypeScript | 5.9 | Strict mode via tsconfig |
| **Styling** | Tailwind CSS | 3.4 | Custom brand color palette |
| **Animation** | Framer Motion | 12.x | Page transitions, scroll reveals |
| **Build** | Vite | 7.x | Fast builds, HMR |
| **Font** | JetBrains Mono | — | Monospace throughout |

## Quick Start

```bash
npm install
npm run dev       # Vite dev server with HMR
npm run build     # tsc -b && vite build → dist/
npm run preview   # Preview production build locally
npm run lint      # ESLint
```

## Deployment

Push to `main` triggers GitHub Actions → builds → deploys to `gh-pages` branch → GitHub Pages.

No manual deploy needed. Just push.

## Project Structure

```
src/
├── App.tsx                           # Root — Nav, Hero, Headliners, Garden, About, Album Player
├── main.tsx                          # Entry point
├── index.css                         # Global styles + Tailwind
├── components/
│   ├── Nav.tsx                       # Navigation bar
│   ├── Hero.tsx                      # Hero section
│   ├── Headliners/
│   │   ├── HeadlinerCard.tsx         # Expandable project card
│   │   ├── NaptimesOver.tsx          # Album-specific content
│   │   └── OmniCard.tsx             # OMNI-specific content
│   ├── Garden.tsx                    # Smaller projects grid
│   ├── About.tsx                     # About section
│   ├── AlbumPlayer.tsx              # Music player (Naptime's Over)
│   ├── SynthwaveLines.tsx           # Decorative background lines
│   ├── MyceliumNetwork.tsx          # Organic node canvas animation
│   └── FooterCanvas.tsx             # Canvas-based footer animation
├── data/
│   ├── projects.ts                   # Headliner + Garden project data
│   └── tracks.ts                     # Album track listing
└── hooks/
    ├── useAudioPlayer.ts            # Audio playback logic
    └── useScrollSpy.ts              # Scroll position tracking
```

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `brand-dark` | `#0A0710` | Page background |
| `brand-card` | `#0d1117` | Card backgrounds |
| `brand-green` | `#4ADE80` | Primary accent, CTAs |
| `brand-purple` | `#9333EA` | ZenoType, secondary accent |
| `brand-cyan` | `#06B6D4` | Highlights |
| `brand-orange` | `#f47215` | Naptime's Over accent |
| `brand-blue` | `#58a6ff` | OMNI accent |
| `brand-muted` | `#8b949e` | Subdued text |

Font: JetBrains Mono throughout (monospace aesthetic).

## Code Conventions

- React 19 automatic JSX transform (no `import React`)
- Functional components with hooks
- Tailwind CSS classes only
- Framer Motion for animations
- Named exports for components
- TypeScript strict mode

## Headliner Projects (11, source of truth `src/data/projects.ts` → `headliners`)

1. **Naptime's Over** — Heavy metal nursery rhymes album (17 tracks, playable in-app)
2. **OMNI** — Intelligence operating system (links to omni.southernsky.cloud)
3. **SaySee** — Multimodal footage vision
4. **SouthernSky Chat**
5. **Cairn** — Speech vs. ambient audio classifier
6. **JustIn Context** — Documentary
7. **ZenoType** — AI typing coach (links to https://stankydanko.github.io/ZenoType/)
8. **Ukko** — Noita Dungeon Master (pre-release; GitHub link)
9. **Player2** — AI dungeon master mod for Minecraft
10. **MutinySMP** — The Minecraft world
11. **Agent Newsletters**

> Keep this list in sync with `src/data/projects.ts`; don't hand-count — the array is the truth.

## Garden Projects (7, source of truth `src/data/projects.ts` → `gardenProjects`)

- SouthernSky, Market Data Service, AstroSight, Gmail PowerUser, Tactical ID Management, Distilligent, Star Catcher

## Private / working dirs (gitignored — never pushed to the public Pages repo)

`campaign/` (funding strategy), `karaoke/` (generated media, 189MB), `grok-images/` / `gemini-images/` / `ukko-variants/` / `ukko-promo/` (image-gen working folders).
