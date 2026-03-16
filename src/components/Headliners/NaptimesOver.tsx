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
