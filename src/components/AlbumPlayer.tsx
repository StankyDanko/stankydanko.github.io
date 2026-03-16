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
      {/* Mobile: compact bar */}
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

      {/* Mobile: expanded */}
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
