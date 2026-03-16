import { motion } from 'framer-motion'
import type { HeadlinerProject } from '../../data/projects'

interface Props {
  project: HeadlinerProject
  children?: React.ReactNode
}

export function HeadlinerCard({ project, children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="bg-brand-card rounded-lg p-5 sm:p-6 border"
      style={{ borderColor: `${project.color}33` }}
    >
      {/* Header: title + tags */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="text-xl font-bold" style={{ color: project.color }}>
            {project.title}
          </h3>
          <p className="text-xs text-brand-subtle mt-1">{project.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded"
              style={{
                backgroundColor: `${project.color}22`,
                color: project.color,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <p className="text-brand-muted text-sm leading-relaxed mb-4">
        {project.description}
      </p>

      {/* Slot for project-specific content */}
      {children}

      {/* Links */}
      {project.links && project.links.length > 0 && (
        <div className="flex flex-wrap gap-2.5 mt-4">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target={link.url.startsWith('http') ? '_blank' : undefined}
              rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`text-xs font-bold px-4 py-2 rounded transition-opacity hover:opacity-80 ${
                link.primary
                  ? 'text-brand-dark'
                  : 'bg-transparent border'
              }`}
              style={
                link.primary
                  ? { backgroundColor: project.color }
                  : { color: project.color, borderColor: `${project.color}44` }
              }
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </motion.div>
  )
}
