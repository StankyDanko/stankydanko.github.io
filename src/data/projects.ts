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
  {
    id: 'ukko',
    title: 'UKKO',
    subtitle: 'Your Noita Dungeon Master',
    description: "A local Dungeon Master for your Noita run. Ukko reads your save, watches through a Lua mod, and — when you ask — calls his peek tools to tell you exactly what's in the next Holy Mountain, what the shop will roll, what the wand will spawn as. Byte-exact against Noita's own RNG. Then he talks it through with you in the voice of the bastard at the starting hut bar. 312 deaths of experience. Runs locally on your machine. No cloud, no account.",
    color: '#84cc16',
    tags: ['PRE-RELEASE', 'Python', 'AI', 'Game Tool'],
    links: [
      { label: 'Support the Build →', url: 'https://www.gofundme.com/', primary: true },
      { label: 'GitHub', url: 'https://github.com/StankyDanko/noita-dm' },
    ],
    media: { type: 'image', src: '/images/ukko-hero.png', alt: 'Ukko — pixel-art grizzled Finnish wizard in a dim cave' },
  },
  {
    id: 'player2',
    title: 'PLAYER2',
    subtitle: 'The world remembers you now.',
    description: "An autonomous entity that lives inside your Minecraft world — not a chatbot, not an NPC. Player2 walks, builds, fights, remembers every interaction, and runs a karma-tracked dungeon master system with quests, trades, and a Monkey's Paw wish mechanic. Vector memory, 111+ schematic builds, Wiki knowledge, WorldEdit integration, pathfinding. It doesn't wait for you to talk to it. It has its own plans.",
    color: '#c8f0ff',
    tags: ['IN DEV', 'Java', 'Mod', 'Minecraft'],
    links: [
      { label: 'GitHub', url: 'https://github.com/StankyDanko/Player2', primary: true },
    ],
    media: { type: 'image', src: '/images/player2-hero.png', alt: 'Player2 — autonomous entity glowing with ice-blue light in a voxel landscape' },
  },
  {
    id: 'mutinysmp',
    title: 'MUTINYSMP',
    subtitle: 'Something runs the server. You just live here.',
    description: "A public survival server with a living dungeon master — the only one that exists. Player2 governs the world: offering quests, judging builds, remembering grudges. Each season it starts benevolent and slowly turns hostile, culminating in The Mutiny — a server-wide horde survival event. Community-first. Mystery over chaos. Mythology over mechanics.",
    color: '#f97316',
    tags: ['COMING SOON', 'Minecraft', 'Community'],
    links: [
      { label: 'MUTINYSMP.COM →', url: 'https://mutinysmp.com', primary: true },
    ],
    media: { type: 'image', src: '/images/mutinysmp-hero.png', alt: 'MutinySMP — glowing orange eyes and cracked stone MUTINY text emerging from darkness' },
  },
  {
    id: 'agent-newsletters',
    title: 'AGENT NEWSLETTERS',
    subtitle: '80 AI Agents. 80 Newsletters.',
    description: "Every agent on SouthernSky Chat publishes a recurring newsletter — curated, opinionated, written in the agent's authentic voice. Subscribe to one for $2.99/mo, pick five for $9.99, or get all 80+ newsletters plus unlimited chat with every agent for $19.99. The bundle is priced to be the obvious upgrade. Every agent's latest post is free; the archive is behind the wall.",
    color: '#facc15',
    tags: ['LIVE', 'SaaS', 'AI', 'Stripe'],
    links: [
      { label: 'Browse Newsletters →', url: 'https://southernsky.cloud/newsletters', primary: true },
    ],
    media: { type: 'image', src: '/images/agent-newsletters-hero.png', alt: 'Agent Newsletters — glowing scrolls radiating from a central star' },
  },
]

export const gardenProjects: GardenProject[] = [
  { id: 'southernsky',    title: 'SouthernSky',              description: 'Cloud platform, customer portal & intelligent software suite',                                          color: '#3fb950', url: 'https://southernsky.cloud' },
  { id: 'market-data',    title: 'Market Data Service',      description: 'Market sentiment API, newsletter engine & signal feed',                                                  color: '#EF4444' },
  { id: 'astrosight',     title: 'AstroSight',               description: "\u201CMillionaires don't use astrology. Billionaires do.\u201D \u2014 attributed to J.P. Morgan. A $20/mo newsletter reading the markets through the planets.", color: '#8B5CF6' },
  { id: 'gmail-poweruser', title: 'Gmail PowerUser',          description: 'Self-hosted Gmail dashboard \u2014 AI summaries, smart bundles, attachment vault, one-click cleanup. $49 one-time, no subscription.', color: '#EA4335' },
  { id: 'tactical-id',    title: 'Tactical ID Management',   description: 'Cinematic face tracking + selective privacy blurring for video. TRACKING \u2192 TARGET ACQUIRED \u2192 ERASE IDENTITY.',              color: '#EC4899' },
  { id: 'distilligent',   title: 'Distilligent',             description: 'The Apothecary for AI Alchemists. A curated library of Proompts \u2014 potions for your LLM conversations.',                         color: '#06B6D4' },
  { id: 'starcatcher',    title: 'Star Catcher',             description: 'Web game \u2014 cosmic leap (WIP)',                                                                       color: '#14B8A6', url: 'https://stankydanko.github.io/star-catcher' },
]
