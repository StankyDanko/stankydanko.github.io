# StankyDanko

Personal portfolio and creative showcase. A dark, synthwave-aesthetic single-page site featuring headliner projects, a garden of smaller works, and an interactive album player.

**Live:** [stankydanko.github.io](https://stankydanko.github.io/)

## Features

- Headliner project cards (Naptime's Over, OMNI, ZenoType) with expandable details
- Garden grid of smaller projects (SouthernSky, Star Catcher, video-fx, Local AI Rig)
- In-app album player (17-track Naptime's Over)
- Canvas-based animations (mycelium network, synthwave lines, footer particles)
- Scroll-triggered reveals via Framer Motion
- JetBrains Mono monospace typography throughout

## Stack

React 19 + TypeScript + Vite 7 + Tailwind CSS 3.4 + Framer Motion 12.

## Setup

```bash
npm install
npm run dev       # Vite dev server with HMR
npm run build     # Production build → dist/
npm run preview   # Preview production build
```

## Deployment

Push to `main` triggers GitHub Actions → builds → deploys to `gh-pages` branch → live on GitHub Pages. No manual deploy needed.

## Design

Dark synthwave aesthetic with custom brand palette:

| Color | Hex | Usage |
|-------|-----|-------|
| Dark | `#0A0710` | Background |
| Green | `#4ADE80` | Primary accent |
| Purple | `#9333EA` | Secondary accent |
| Cyan | `#06B6D4` | Highlights |
| Orange | `#f47215` | Album accent |
| Blue | `#58a6ff` | OMNI accent |

## License

MIT
