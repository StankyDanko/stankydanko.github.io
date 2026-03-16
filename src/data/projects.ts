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
  { id: 'southernsky', title: 'SouthernSky',  description: 'Cloud platform & parent brand',    color: '#3fb950', url: 'https://southernsky.cloud' },
  { id: 'starcatcher', title: 'Star Catcher',  description: 'Web game — cosmic leap (WIP)',      color: '#06B6D4', url: 'https://stankydanko.github.io/star-catcher' },
  { id: 'video-fx',    title: 'video-fx',      description: 'Face tracking + cinematic effects', color: '#EC4899' },
  { id: 'local-ai',    title: 'Local AI Rig',  description: '69 models, RTX 3080 Ti, Ollama',    color: '#f59e0b' },
]
