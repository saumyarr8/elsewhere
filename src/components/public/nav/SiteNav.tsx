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
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 py-5 pointer-events-none">
        <Link
          href="/"
          className="pointer-events-auto hover:opacity-60 transition-opacity"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 16,
            fontWeight: 700,
            color: 'var(--color-ink)',
            letterSpacing: '-0.01em',
            textDecoration: 'none',
          }}
        >
          .elsewhere
        </Link>

        <div className="pointer-events-auto flex items-center gap-10">
          {label && (
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 16,
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--color-ink)',
              letterSpacing: '0.01em',
            }}>
              {label}
            </span>
          )}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 16,
              fontWeight: 500,
              textTransform: 'uppercase',
              color: 'var(--color-ink)',
              letterSpacing: '0.01em',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
          >
            {menuOpen ? 'Close' : 'Menu'}
            {!menuOpen && (
              <span style={{
                display: 'inline-block',
                width: 8,
                height: 8,
                border: '1px solid var(--color-ink)',
                flexShrink: 0,
              }} aria-hidden="true" />
            )}
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
            className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-8 bg-[var(--color-paper)]/90 backdrop-blur-2xl"
            id="site-menu"
          >
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'absolute',
                top: 20,
                right: 40,
                fontFamily: 'var(--font-sans)',
                fontSize: 16,
                fontWeight: 500,
                textTransform: 'uppercase',
                color: 'var(--color-ink-muted)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Close
            </button>

            <nav className="text-center space-y-4" aria-label="Main navigation">
              {NAV_ITEMS.map(({ href, label }) => (
                <div key={href}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="block hover:opacity-50 transition-opacity"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(2rem, 6vw, 5rem)',
                      fontWeight: 300,
                      color: 'var(--color-ink)',
                      textDecoration: 'none',
                    }}
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
