'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { getNavProjects } from '@/actions/nav.actions'

const PAGE_LABELS: Record<string, string> = {
  '/gallery': 'Gallery',
  '/about': 'About Me',
}

export default function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [stories, setStories] = useState<{slug: string, title: string}[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  const label = PAGE_LABELS[pathname]

  useEffect(() => {
    getNavProjects()
      .then(data => {
        setStories(data || [])
        setIsLoading(false)
      })
      .catch(err => {
        console.error("Error fetching projects:", err)
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 py-5 pointer-events-none">
        <Link
          href="/"
          className="pointer-events-auto hover:opacity-60 transition-opacity"
        >
          <img src="/t1-wordmark.svg" alt=".elsewhere" style={{ height: 18, width: 'auto', display: 'block' }} />
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
              fontWeight: menuOpen ? 700 : 500,
              textTransform: 'uppercase',
              color: 'var(--color-ink)',
              letterSpacing: '0.01em',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'font-weight 0.2s',
            }}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
          >
            Menu
            <span style={{
              display: 'inline-block',
              width: 8,
              height: 8,
              border: '1px solid var(--color-ink)',
              background: menuOpen ? 'var(--color-ink)' : 'transparent',
              flexShrink: 0,
              transition: 'background 0.2s',
            }} aria-hidden="true" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 backdrop-blur-xl"
            id="site-menu"
            onClick={() => setMenuOpen(false)}
          >
            <div
              className="absolute right-0 top-0 pt-20 pr-10 md:pr-20 pl-10 pb-10 max-w-md w-full h-full overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 14,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--color-ink)',
                  letterSpacing: '0.05em',
                  margin: 0,
                }}>Stories</h2>

                <div className="flex gap-6 text-[11px] text-[var(--color-ink-muted)] uppercase tracking-[0.1em] font-sans font-medium items-center">
                  <span className="cursor-pointer hover:opacity-70 transition-opacity">Open Rolls</span>
                  <Link href="/about" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity no-underline text-current">
                    The Author <span className="w-1.5 h-1.5 bg-current"></span>
                  </Link>
                </div>
              </div>

              <nav className="flex flex-col space-y-3">
                {isLoading ? (
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '18px', color: 'var(--color-ink-muted)' }}>
                    Loading stories...
                  </p>
                ) : stories.length === 0 ? (
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '18px', color: 'var(--color-ink-muted)' }}>
                    No stories found.
                  </p>
                ) : (
                  stories.map((story) => (
                    <Link
                      key={story.slug}
                      href={`/${story.slug}`}
                      onClick={() => setMenuOpen(false)}
                      className="hover:opacity-50 transition-opacity group flex items-center gap-3"
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '18px',
                        color: 'var(--color-ink-muted)',
                        textDecoration: 'none',
                        fontWeight: 400,
                      }}
                    >
                      <span className="w-2 h-2 border border-current flex-shrink-0 group-hover:bg-current transition-colors"></span>
                      <span className="truncate">{story.title}</span>
                    </Link>
                  ))
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
