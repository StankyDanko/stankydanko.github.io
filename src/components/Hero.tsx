import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center pt-16">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative text-center px-4">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-8"
        >
          <img
            src="/images/danko-hero.jpg"
            alt="StankyDanko — botanical cyberpunk character"
            className="w-40 h-40 sm:w-48 sm:h-48 rounded-full object-cover mx-auto shadow-glow ring-2 ring-brand-green/30"
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl sm:text-5xl font-bold text-brand-text tracking-tight mb-3"
        >
          STANKYDANKO
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-brand-purple text-sm tracking-[0.25em] mb-8"
        >
          CODE · MUSIC · CHAOS
        </motion.p>

        {/* Bio — 4 lines */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-brand-subtle text-base sm:text-lg leading-loose max-w-lg mx-auto"
        >
          <p>Builder of intelligence systems.</p>
          <p>Producer of heavy metal nursery rhymes.</p>
          <p>Grower of digital gardens.</p>
          <p className="text-brand-green/60">Misfits, dreamers, and coders welcome.</p>
        </motion.div>
      </div>
    </section>
  )
}
