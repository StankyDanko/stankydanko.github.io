import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { HeadlinerCard } from './components/Headliners/HeadlinerCard'
import { NaptimesOverContent } from './components/Headliners/NaptimesOver'
import { OmniContent } from './components/Headliners/OmniCard'
import { Garden } from './components/Garden'
import { About } from './components/About'
import { AlbumPlayer } from './components/AlbumPlayer'
import { SynthwaveLines } from './components/SynthwaveLines'
import FooterCanvas from './components/FooterCanvas'
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

      {/* Headliners — light synthwave lines behind */}
      <div className="relative">
        <SynthwaveLines lines={4} opacity={0.04} color="green" />
        <section id="headliners" className="relative px-4 sm:px-6 py-12 max-w-6xl mx-auto space-y-4 border-t border-white/[0.04]">
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
      </div>

      {/* Garden — subtle purple synthwave lines */}
      <div className="relative">
        <SynthwaveLines lines={3} opacity={0.03} color="purple" />
        <div className="relative">
          <Garden />
        </div>
      </div>

      {/* About + Footer — full-glory synthwave canvas with organic nodes */}
      <div className="relative min-h-[400px]">
        <FooterCanvas />
        <div className="relative z-[1]">
          <About />

          {/* Footer */}
          <footer className="px-4 sm:px-6 py-8 text-center">
            <p className="text-[10px] text-brand-muted tracking-widest">
              &copy; {new Date().getFullYear()} STANKYDANKO — Built with controlled chaos
            </p>
          </footer>
        </div>
      </div>

      <AlbumPlayer {...player} />
    </div>
  )
}
