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
