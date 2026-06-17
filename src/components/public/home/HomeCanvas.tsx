'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const W = 1512
const H = 900
const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

// 11 photo slots — positions computed from the source design (1393×691 grid at left:14, top:135)
// Slots 6-10 intentionally extend past 1512px (overflow:hidden clips them to peek from right edge)
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

export type HomeProject = {
  slug: string
  title: string
  heroImageId: string | null
}

export default function HomeCanvas({ projects }: { projects: HomeProject[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / W)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

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
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 16, fontWeight: 600, textTransform: 'uppercase', color: '#1c1c1c', margin: 0 }}>
            filter
          </p>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            {['Culture', 'Adventure'].map(tag => (
              <div key={tag} style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <img alt="remove" style={{ width: 7.8, height: 7.8 }} src="/icons/filter-close.svg" />
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 16, fontWeight: 400, textTransform: 'uppercase', color: '#1c1c1c', margin: 0 }}>
                  {tag}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Photo slots ── */}
        {SLOTS.map((slot, i) => {
          const project = projects[i]
          const imgId = project?.heroImageId
          const url = imgId && CLOUD
            ? `https://res.cloudinary.com/${CLOUD}/image/upload/w_${slot.w * 2},h_${slot.h * 2},c_fill,q_auto,f_auto/${imgId}`
            : null

          const slotStyle: React.CSSProperties = {
            position: 'absolute', left: slot.l, top: slot.t,
            width: slot.w, height: slot.h,
            overflow: 'hidden',
            background: 'transparent',
            display: 'block',
            textDecoration: 'none',
          }

          const content = url ? (
            <img
              src={url}
              alt={project.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%' }} />
          )

          if (!project) return null

          return (
            <Link key={i} href={`/${project.slug}`} style={slotStyle}>
              {content}
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
            fontFamily: 'Montserrat, sans-serif',
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
