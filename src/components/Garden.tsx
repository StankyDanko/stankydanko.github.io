import { motion } from 'framer-motion'
import { gardenProjects } from '../data/projects'

export function Garden() {
  return (
    <section id="garden" className="px-4 sm:px-6 py-12 max-w-6xl mx-auto border-t border-white/[0.04]">
      <p className="text-[11px] tracking-[3px] text-brand-subtle mb-5">THE GARDEN</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {gardenProjects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-brand-card border border-white/[0.04] rounded-md p-4 hover:border-white/10 transition-colors"
              >
                <h4 className="text-sm font-bold" style={{ color: project.color }}>
                  {project.title}
                </h4>
                <p className="text-[10px] text-brand-muted mt-1">{project.description}</p>
              </a>
            ) : (
              <div className="bg-brand-card border border-white/[0.04] rounded-md p-4">
                <h4 className="text-sm font-bold" style={{ color: project.color }}>
                  {project.title}
                </h4>
                <p className="text-[10px] text-brand-muted mt-1">{project.description}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
