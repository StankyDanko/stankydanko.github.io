import { motion } from 'framer-motion'

export function About() {
  return (
    <section id="about" className="px-4 sm:px-6 py-12 max-w-6xl mx-auto border-t border-white/[0.04]">
      <p className="text-[11px] tracking-[3px] text-brand-green mb-5">ABOUT</p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex gap-5 items-start"
      >
        <img
          src="/images/danko-hero.jpg"
          alt="StankyDanko"
          className="w-16 h-16 rounded-full object-cover flex-shrink-0 ring-1 ring-brand-green/20"
        />

        <div>
          <p className="text-sm text-brand-text leading-relaxed">
            Full-stack builder, music producer, and digital gardener. Everything I make lives at the intersection of code, creativity, and controlled chaos.
          </p>

          <div className="flex gap-4 mt-4">
            <a href="https://github.com/StankyDanko" target="_blank" rel="noopener noreferrer" className="text-brand-green text-xs hover:underline">
              GitHub
            </a>
            <a href="https://x.com/StankyDanko" target="_blank" rel="noopener noreferrer" className="text-brand-cyan text-xs hover:underline">
              Twitter/X
            </a>
            <a href="https://youtube.com/@StankyDanko" target="_blank" rel="noopener noreferrer" className="text-brand-pink text-xs hover:underline">
              YouTube
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
