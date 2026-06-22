'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import Link from 'next/link'

const W = 1512
const H = 900
const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

const SLOTS = [
  { l: 69,   t: 160, w: 236, h: 114 },
  { l: 69,   t: 426, w: 226, h: 231 },
  { l: 381,  t: 595, w: 150, h: 231 },
  { l: 507,  t: 325, w: 118, h: 171 },
  { l: 768,  t: 145, w: 353, h: 191 },
  { l: 957,  t: 496, w: 186, h: 254 },
  { l: 1344, t: 284, w: 316, h: 180 },
  { l: 1432, t: 623, w: 273, h: 151 },
  { l: 1826, t: 194, w: 158, h: 314 },
  { l: 2040, t: 552, w: 302, h: 206 },
  { l: 2258, t: 141, w: 217, h: 210 },
]

const CATEGORIES = ['CULTURE', 'ADVENTURE'] as const
type Category = typeof CATEGORIES[number]

export type HomeProject = {
  slug: string
  title: string
  heroImageId: string | null
  category?: Category | null
}

export default function HomeCanvas({ projects }: { projects: HomeProject[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [filterOpen, setFilterOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<Set<Category>>(new Set())

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / W)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  function toggleFilter(cat: Category) {
    setActiveFilters(prev => {
      const next = new Set(prev)
      if (next.has(cat)) next.delete(cat)
      else next.add(cat)
      return next
    })
  }

  const filtered = useMemo(() => {
    if (activeFilters.size === 0) return projects
    return projects.filter(p => p.category && activeFilters.has(p.category))
  }, [projects, activeFilters])

  const font = 'Montserrat, sans-serif'

  return (
    <div
      ref={wrapperRef}
      style={{ width: '100%', height: H * scale, overflow: 'hidden', position: 'relative' }}
    >
      <div style={{
        width: W, height: H,
        position: 'relative',
        transformOrigin: 'top left',
        transform: `scale(${scale})`,
        background: '#fff',
        overflow: 'hidden',
      }}>

        {/* ── Filter bar ── */}
        <div style={{ position: 'absolute', left: 80, top: 115, display: 'flex', alignItems: 'center', gap: 48 }}>
          <p
            onClick={() => setFilterOpen(v => !v)}
            style={{
              fontFamily: font, fontSize: 16, textTransform: 'uppercase', margin: 0,
              cursor: 'pointer',
              fontWeight: filterOpen ? 700 : 400,
              color: filterOpen ? '#1c1c1c' : '#ccc',
              transition: 'color 0.2s, font-weight 0.2s',
            }}
          >
            filter
          </p>

          {filterOpen && (
            <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
              {CATEGORIES.map(cat => {
                const isActive = activeFilters.has(cat)
                return (
                  <p
                    key={cat}
                    onClick={() => toggleFilter(cat)}
                    style={{
                      fontFamily: font, fontSize: 16, textTransform: 'uppercase', margin: 0,
                      cursor: 'pointer',
                      fontWeight: isActive ? 700 : 400,
                      color: isActive ? '#1c1c1c' : '#ccc',
                      transition: 'color 0.2s, font-weight 0.2s',
                    }}
                  >
                    {cat}
                  </p>
                )
              })}
            </div>
          )}
        </div>

        {/* ── Photo slots ── */}
        {SLOTS.map((slot, i) => {
          const project = filtered[i]
          if (!project) return null

          const imgId = project.heroImageId
          const url = imgId && CLOUD
            ? `https://res.cloudinary.com/${CLOUD}/image/upload/w_${slot.w * 2},h_${slot.h * 2},c_fill,q_auto,f_auto/${imgId}`
            : null

          return (
            <Link
              key={i}
              href={`/${project.slug}`}
              style={{
                position: 'absolute', left: slot.l, top: slot.t,
                width: slot.w, height: slot.h,
                overflow: 'hidden', background: 'transparent',
                display: 'block', textDecoration: 'none',
              }}
            >
              {url ? (
                <img
                  src={url}
                  alt={project.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              ) : (
                <div style={{ width: '100%', height: '100%' }} />
              )}
            </Link>
          )
        })}

        {/* ── Take me elsewhere CTA ── */}
        <Link
          href="/about"
          style={{
            position: 'absolute',
            left: '50%',
            top: 796,
            transform: 'translateX(-50%)',
            fontFamily: font,
            fontSize: 16,
            fontWeight: 700,
            textTransform: 'uppercase',
            color: '#ccc',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Take me elsewhere
        </Link>

      </div>
    </div>
  )
}
