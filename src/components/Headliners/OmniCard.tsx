export function OmniContent() {
  return (
    <div className="rounded-md overflow-hidden border border-white/5 bg-[#161b22]">
      <video
        src="/video/omni-promo.mp4"
        poster="/images/omni-og.png"
        controls
        preload="none"
        className="w-full aspect-video"
        aria-label="OMNI intelligence dashboard demo video"
      >
        <img src="/images/omni-og.png" alt="OMNI intelligence dashboard" className="w-full" />
      </video>
    </div>
  )
}
