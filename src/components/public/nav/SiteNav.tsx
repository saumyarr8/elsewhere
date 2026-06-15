'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const PAGE_LABELS: Record<string, string> = {
  '/': 'Projects',
  '/gallery': 'Gallery',
  '/about': 'About Me',
}

const NAV_ITEMS = [
  { href: '/', label: 'Projects' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About Me' },
]

export default function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const label = PAGE_LABELS[pathname]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 py-5 mix-blend-multiply pointer-events-none">
        <Link
          href="/"
          className="pointer-events-auto text-sm font-medium tracking-tight text-[var(--color-ink)] hover:opacity-60 transition-opacity"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          .elsewhere
        </Link>

        <div className="pointer-events-auto flex items-center gap-8">
          {label && (
            <span className="text-sm font-bold uppercase tracking-widest text-[var(--color-ink)]">
              {label}
            </span>
          )}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="text-xs uppercase tracking-widest text-[var(--color-ink)] hover:opacity-60 transition-opacity flex items-center gap-2"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
          >
            {menuOpen ? 'Close' : 'Menu'}
            <span className="inline-block w-3 h-px bg-[var(--color-ink)]" aria-hidden="true" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-8 bg-[var(--color-paper)]/72 backdrop-blur-2xl"
            id="site-menu"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-5 right-10 text-xs uppercase tracking-widest text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
            >
              Close
            </button>

            <nav className="text-center space-y-4" aria-label="Main navigation">
              {NAV_ITEMS.map(({ href, label }) => (
                <div key={href}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="block text-3xl md:text-5xl font-light text-[var(--color-ink)] hover:opacity-50 transition-opacity"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {label}
                  </Link>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
