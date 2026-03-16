import { useState, useEffect } from 'react'
import { useScrollSpy } from '../hooks/useScrollSpy'

const sections = ['headliners', 'naptimes-over', 'about']

const navLinks = [
  { label: 'PROJECTS', target: 'headliners' },
  { label: 'ALBUM', target: 'naptimes-over' },
  { label: 'ABOUT', target: 'about' },
  { label: 'CONNECT', target: 'about' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const activeSection = useScrollSpy(sections)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-brand-dark/95 backdrop-blur-sm border-b border-brand-green/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2.5 group">
          <img src="/images/logo.svg" alt="StankyDanko leaf-circuit logo" className="w-7 h-7" />
          <span className="text-brand-green font-bold text-sm tracking-wide">STANKYDANKO</span>
        </button>

        {/* Section Links */}
        <div className="hidden sm:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.target)}
              className={`text-xs tracking-wider transition-colors ${
                activeSection === link.target ? 'text-brand-green' : 'text-brand-subtle hover:text-brand-text'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          <a href="https://github.com/StankyDanko" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-brand-subtle hover:text-brand-text transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <a href="https://x.com/StankyDanko" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-brand-subtle hover:text-brand-text transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://youtube.com/@StankyDanko" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-brand-subtle hover:text-brand-text transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
        </div>
      </div>
    </nav>
  )
}
