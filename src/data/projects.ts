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
    id: 'saysee',
    title: 'SAYSEE',
    subtitle: 'Multimodal Understanding Engine',
    description: 'Say what you see. A video, audio, and image understanding engine that turns raw media into searchable meaning. Hierarchical frame sampling across five detail levels. Pluggable vision models. Whisper transcription. Vector search across everything you\'ve ever recorded. Watch folder daemon with cloud bridge — the machine indexes while you sleep.',
    color: '#10B981',
    tags: ['LIVE', 'Python', 'AI', 'Vector Search'],
    links: [
      { label: 'GitHub', url: 'https://github.com/StankyDanko/saysee', primary: true },
    ],
    media: { type: 'image', src: '/images/saysee-hero.png', alt: 'SaySee — eye and waveform visualization' },
  },
  {
    id: 'southernsky-chat',
    title: 'SOUTHERNSKY CHAT',
    subtitle: 'Private AI Platform — 90+ Agents',
    description: 'A private AI chat platform running 90+ specialized agents — from dream journaling to market analysis to recipe generation. Voice synthesis. Auto-generated newsletters. Zero cloud dependency for core inference. Your conversations stay yours.',
    color: '#3b82f6',
    tags: ['LIVE', 'AI', 'Private Cloud'],
    links: [
      { label: 'EXPLORE →', url: 'https://chat.southernsky.cloud', primary: true },
    ],
    media: { type: 'image', src: '/images/southernsky-chat-hero.png', alt: 'SouthernSky Chat — AI agent grid interface' },
  },
  {
    id: 'cairn',
    title: 'CAIRN',
    subtitle: 'Whisper for Ambient Sound',
    description: 'Takes raw audio and produces timestamped JSON sidecars of environmental sounds — rain, wind, birds, footsteps, machinery, silence. Three-layer architecture: fast local inference, open-vocabulary zero-shot classification, and AI enrichment. Born on a grounding walk through the Georgia woods. Makes 300GB of field recordings searchable by what they sound like.',
    color: '#8B5CF6',
    tags: ['PRE-ALPHA', 'Python', 'Audio AI'],
    links: [
      { label: 'GitHub', url: 'https://github.com/StankyDanko/cairn', primary: true },
    ],
    media: { type: 'image', src: '/images/cairn-hero.png', alt: 'Cairn — violet sound waves rippling through a dark forest' },
  },
  {
    id: 'justin-context',
    title: 'JUSTIN CONTEXT',
    subtitle: 'Interactive AI Documentary',
    description: 'You\'ve never seen a movie like this before. An interactive documentary where a conversational AI narrates the story, pulling real footage as evidence. The viewer sits with the agent and asks questions. Built on a personal archive of thousands of hours of video, audio, and text — indexed by custom tools, searched by meaning, presented as narrative.',
    color: '#f59e0b',
    tags: ['IN DEV', 'AI', 'Documentary'],
    links: [
      { label: 'JUSTINCONTEXT.IO →', url: 'https://justincontext.io', primary: true },
    ],
    media: { type: 'image', src: '/images/justin-context-hero.png', alt: 'JustIn Context — documentary film strips in amber light' },
  },
  {
    id: 'zenotype',
    title: 'ZENOTYPE',
    subtitle: 'AI Typing Coach (v0.8.0)',
    description: 'Terminal-inspired typing coach powered by local AI. Infinite educational text generated on any topic — real-time keystroke analytics, keyboard heatmaps, adaptive difficulty, gamified flow states, and Scripture mode.',
    color: '#9333EA',
    tags: ['LIVE', 'AI', 'Local AI', 'React'],
    links: [
      { label: 'LAUNCH ZENOTYPE →', url: 'https://stankydanko.github.io/ZenoType/', primary: true },
      { label: 'GitHub', url: 'https://github.com/StankyDanko/ZenoType' },
    ],
  },
]

export const gardenProjects: GardenProject[] = [
  { id: 'southernsky',  title: 'SouthernSky',          description: 'Cloud platform, customer portal & intelligent software suite', color: '#3fb950', url: 'https://southernsky.cloud' },
  { id: 'market-data',  title: 'Market Data Service',   description: 'Market sentiment API, newsletter engine & signal feed',        color: '#EF4444' },
  { id: 'starcatcher',  title: 'Star Catcher',          description: 'Web game — cosmic leap (WIP)',                                 color: '#06B6D4', url: 'https://stankydanko.github.io/star-catcher' },
  { id: 'video-fx',     title: 'video-fx',              description: 'Selective face recognition + privacy blurring pipeline',        color: '#EC4899' },
]
