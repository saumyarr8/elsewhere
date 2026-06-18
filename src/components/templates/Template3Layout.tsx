'use client'

import React, { useEffect, useRef, useState } from 'react'

// ─── Data type ────────────────────────────────────────────────────────────────

export type Template3Data = {
  titleBold?: string
  location?: string
  coordinates?: string
  camera?: string
  heroImage?: string      // 1352 × 671
  sec1Image?: string      // 648 × 416  — section 1 left
  sec2Image?: string      // 695 × 492  — section 2 tall portrait
  sec2ImageB?: string     // 487 × 575  — section 2 smaller portrait
  sec2ImageC?: string     // 193 × 354  — section 2 small right
  sec3ImageSmall?: string // 193 × 354  — section 3 small right
  sec3Image?: string      // 684 × 520  — section 3 landscape
  sec4ImageTall?: string  // 499 × 616  — section 4 tall portrait left
  sec4Image?: string      // 685 × 589  — section 4 portrait right
  sec5Image?: string      // 469 × 334  — section 5 landscape left
  sec6Image?: string      // 293 × 456  — section 6 portrait right
  sec6ImageB?: string     // 469 × 178  — section 6 small strip
  sec7Image?: string      // 293 × 262  — section 7 small portrait right
  sec7ImageWide?: string  // 688 × 589  — section 7 large landscape left
  // Section 1 text
  sec1Headline?: string
  sec1Body1?: string
  sec1Quote?: string
  sec1Body2?: string
  sec1Quote2?: string
  sec1Body3?: string
  // Section 2: image-only, no text fields
  // Section 3 text
  sec3Headline?: string
  sec3Body1?: string
  sec3Body2?: string
  sec3Quote?: string
  sec3Body3?: string
  // Section 4 text
  sec4Headline?: string
  sec4Body1?: string
  sec4Body2?: string
  sec4Body3?: string
  sec4Quote?: string
  // Section 5 text
  sec5Headline?: string
  sec5Body1?: string
  sec5Headline2?: string
  sec5Body2?: string
  sec5Body3?: string
  sec5Body4?: string
  // Section 6 text
  sec6Headline?: string
  sec6Body1?: string
  sec6Body2?: string
  // Section 7 text
  sec7Headline?: string
  sec7Body1?: string
  sec7Body2?: string
  sec7Body3?: string
  sec7Body4?: string
  sec7Body5?: string
  sec7Body6?: string
  // Section 8 text
  sec8Headline?: string
  sec8Body1?: string
  sec8Body2?: string
  sec8Body3?: string
  sec8Body4?: string
  nextProjectTitle?: string
  nextProjectSlug?: string
}

export function hasContent(d: Partial<Template3Data>): boolean {
  return !!(d.heroImage || d.sec1Image || d.sec2Image)
}

// ─── Canvas constants (W=1512, H=7176) ───────────────────────────────────────

const W = 1512
const H = 7176

const SECTION_STARTS = [1009, 1568, 2773, 3387, 4042, 4687, 5341, 5965]

const FOOTER_Y = 6805
const F_NAV    = 0
const F_MARK   = 200
const F_SOC    = 442

// ─── Component ────────────────────────────────────────────────────────────────

export default function Template3Layout({
  data,
  isEditing = false,
  onImageSelect,
}: {
  data: Partial<Template3Data>
  isEditing?: boolean
  onImageSelect?: (key: string) => void
}) {
  const [scale, setScale] = useState(1)
  const [activeIdx, setActiveIdx] = useState(0)
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [sidebarHovered, setSidebarHovered] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const SECTION_HEADINGS = [
    data.sec1Headline?.slice(0, 50) || 'Section 01',
    'Section 02',
    data.sec3Headline?.slice(0, 50) || 'Section 03',
    data.sec4Headline?.slice(0, 50) || 'Section 04',
    data.sec5Headline?.slice(0, 50) || 'Section 05',
    data.sec6Headline?.slice(0, 50) || 'Section 06',
    data.sec7Headline?.slice(0, 50) || 'Section 07',
    data.sec8Headline?.slice(0, 50) || 'Section 08',
  ]

  useEffect(() => {
    const update = () => {
      const el = wrapperRef.current
      if (!el) return
      setScale((el.parentElement?.clientWidth ?? window.innerWidth) / W)
    }
    update()
    const ro = new ResizeObserver(update)
    if (wrapperRef.current) ro.observe(wrapperRef.current)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (isEditing) return
    const onScroll = () => {
      const el = wrapperRef.current
      if (!el) return
      const canvasTop = el.getBoundingClientRect().top
      const pivotY = (window.innerHeight * 0.4 - canvasTop) / scale
      setSidebarVisible(pivotY >= SECTION_STARTS[0] && pivotY <= FOOTER_Y)
      let active = 0
      for (let i = 0; i < SECTION_STARTS.length; i++) {
        if (SECTION_STARTS[i] <= pivotY) active = i
      }
      setActiveIdx(active)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [scale, isEditing])

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const imgUrl = (id?: string) =>
    id && cloudName ? `https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_auto/${id}` : ''

  function ImgBox({ id, sk, l, t, w, h, cap }: {
    id?: string; sk: string; l: number; t: number; w: number; h: number; cap?: string
  }) {
    const url = imgUrl(id)
    return (
      <>
        <div
          style={{
            position: 'absolute', left: l, top: t, width: w, height: h,
            overflow: 'hidden', background: id ? undefined : '#e8e8e8',
            cursor: isEditing ? 'pointer' : undefined,
          }}
          onClick={isEditing ? () => onImageSelect?.(sk) : undefined}
        >
          {url && <img src={url} alt={cap || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
          {isEditing && (
            <div
              style={{
                position: 'absolute', inset: 0,
                background: url ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, color: '#888', fontFamily: 'var(--font-sans, Montserrat)',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.35)')}
              onMouseLeave={e => (e.currentTarget.style.background = url ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.08)')}
            >
              {url ? <span style={{ color: '#fff', fontSize: 11 }}>Change</span> : <span>+ Image</span>}
            </div>
          )}
        </div>
        {cap && (
          <div style={{
            position: 'absolute', left: l + 31, top: t + h + 4,
            fontFamily: 'var(--font-sans, Montserrat)', fontWeight: 800,
            fontSize: 14, color: '#1c1c1c', textTransform: 'uppercase',
          }}>{cap}</div>
        )}
      </>
    )
  }

  function SecNum({ n, l, t }: { n: string; l: number; t: number }) {
    return (
      <div style={{
        position: 'absolute', left: l, top: t,
        fontFamily: 'var(--font-serif, DM Sans)', fontWeight: 400, fontSize: 28,
        color: '#ccc', textTransform: 'uppercase', lineHeight: 'normal',
      }}>{n}</div>
    )
  }

  function H2({ children, l, t, w = 421, size = 22 }: { children?: string; l: number; t: number; w?: number; size?: number }) {
    if (!children) return null
    return (
      <div style={{
        position: 'absolute', left: l, top: t, width: w,
        fontFamily: 'var(--font-serif, DM Sans)', fontWeight: 500, fontSize: size,
        color: '#1c1c1c', textTransform: 'uppercase', lineHeight: 'normal',
      }}>{children}</div>
    )
  }

  function P({ children, l, t, w = 220, size = 14 }: { children?: string; l: number; t: number; w?: number; size?: number }) {
    if (!children) return null
    return (
      <div style={{
        position: 'absolute', left: l, top: t, width: w,
        fontFamily: 'var(--font-sans, Montserrat)', fontWeight: 400, fontSize: size,
        color: '#505050', textAlign: 'justify', lineHeight: 'normal',
        whiteSpace: 'pre-wrap', overflowWrap: 'break-word',
      }}>{children}</div>
    )
  }

  function Quote({ children, l, t, w = 220 }: { children?: string; l: number; t: number; w?: number }) {
    if (!children) return null
    return (
      <div style={{ position: 'absolute', left: l, top: t, width: w }}>
        <svg width="30" height="26" viewBox="0 0 29.773 25.235" style={{ display: 'block', marginBottom: 8 }}>
          <path d="M0 25.235h12.95L19.427 0H6.477L0 25.235zm16.824 0H29.773L29.773 0H16.824L16.824 25.235z" fill="#1c1c1c" />
        </svg>
        <div style={{
          fontFamily: 'var(--font-sans, Montserrat)', fontWeight: 400, fontSize: 14,
          color: '#505050', lineHeight: 'normal', textAlign: 'justify',
        }}>{children}</div>
      </div>
    )
  }

  return (
    <>
      <div
        ref={wrapperRef}
        style={{ width: '100%', height: H * scale, position: 'relative', overflow: 'hidden' }}
      >
        <div style={{
          width: W, height: H, position: 'relative', background: '#fff',
          transform: `scale(${scale})`, transformOrigin: 'top left',
          fontFamily: 'var(--font-sans, Montserrat)',
        }}>

          {/* ━━ TITLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div style={{
            position: 'absolute', left: 80, top: 139,
            fontFamily: 'var(--font-serif, DM Sans)', fontWeight: 700, fontSize: 40,
            color: '#000', textTransform: 'uppercase', lineHeight: 1.15, whiteSpace: 'nowrap',
          }}>
            {data.titleBold || 'Project Title'}
          </div>

          {/* ━━ HERO IMAGE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <ImgBox id={data.heroImage} sk="heroImage" l={80} t={197} w={1352} h={671} />

          {/* ━━ METADATA BAR ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div style={{
            position: 'absolute', left: 80, top: 879, width: 795,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            fontFamily: 'var(--font-sans, Montserrat)', fontWeight: 400, fontSize: 16,
          }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <span style={{ color: '#ccc' }}>Location:</span>
              <span style={{ color: '#000' }}>{data.location || ''}</span>
            </div>
            <span style={{ color: '#ccc' }}>{data.coordinates || ''}</span>
            <div style={{ display: 'flex', gap: 11 }}>
              <span style={{ color: '#ccc' }}>Camera -</span>
              <span style={{ color: '#000' }}>{data.camera || ''}</span>
            </div>
          </div>

          {/* ━━ SECONDARY NAV ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div style={{
            position: 'absolute', left: 0, top: 921, width: W,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, height: 75,
          }}>
            <span style={{ fontFamily: 'var(--font-sans, Montserrat)', fontWeight: 800, fontSize: 14, textTransform: 'uppercase', color: '#ccc' }}>Photos</span>
            <div style={{ height: 31, width: 1, background: '#1c1c1c' }} />
            <span style={{ fontFamily: 'var(--font-sans, Montserrat)', fontWeight: 800, fontSize: 14, textTransform: 'uppercase', color: '#1c1c1c' }}>Story</span>
          </div>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              SECTION 1 — image left, text right
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <ImgBox id={data.sec1Image} sk="sec1Image" l={260} t={1009} w={648} h={416} />
          <SecNum n="01" l={1338} t={1009} />
          <H2 l={932} t={1050} w={432}>{data.sec1Headline}</H2>
          <P l={932} t={1116} w={220}>{data.sec1Body1}</P>
          <Quote l={932} t={1150} w={432}>{data.sec1Quote}</Quote>
          <P l={932} t={1264} w={220}>{data.sec1Body2}</P>
          <Quote l={932} t={1298} w={432}>{data.sec1Quote2}</Quote>
          <P l={932} t={1425} w={220}>{data.sec1Body3}</P>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              SECTION 2 — multiple portraits (image-only)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <SecNum n="02" l={1150} t={1632} />
          <ImgBox id={data.sec2Image} sk="sec2Image" l={254} t={1568} w={695} h={492} />
          <ImgBox id={data.sec2ImageC} sk="sec2ImageC" l={1240} t={1962} w={193} h={354} />
          <ImgBox id={data.sec2ImageB} sk="sec2ImageB" l={254} t={2107} w={487} h={575} />
          <ImgBox id={data.sec3ImageSmall} sk="sec3ImageSmall" l={995} t={2328} w={193} h={354} />

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              SECTION 3 — landscape image, text left
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <ImgBox id={data.sec3Image} sk="sec3Image" l={748} t={2773} w={684} h={520} />
          <SecNum n="03" l={686} t={2885} />
          <H2 l={255} t={2940} w={448}>{data.sec3Headline}</H2>
          <P l={255} t={3060} w={220}>{data.sec3Body1}</P>
          <P l={255} t={3111} w={432}>{data.sec3Body2}</P>
          <Quote l={255} t={3150} w={432}>{data.sec3Quote}</Quote>
          <P l={476} t={3264} w={220}>{data.sec3Body3}</P>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              SECTION 4 — portraits, text
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <ImgBox id={data.sec4ImageTall} sk="sec4ImageTall" l={248} t={3387} w={499} h={616} />
          <SecNum n="04" l={1187} t={3438} />
          <H2 l={766} t={3438} w={308}>{data.sec4Headline}</H2>
          <P l={766} t={3513} w={220}>{data.sec4Body1}</P>
          <P l={1017} t={3513} w={220}>{data.sec4Body2}</P>
          <ImgBox id={data.sec4Image} sk="sec4Image" l={748} t={4042} w={685} h={589} />
          <P l={766} t={3723} w={220}>{data.sec4Body3}</P>
          <Quote l={766} t={3800} w={458}>{data.sec4Quote}</Quote>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              SECTION 5 — text + image
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <SecNum n="05" l={682} t={4264} />
          <H2 l={260} t={4299} w={347}>{data.sec5Headline}</H2>
          <P l={963} t={4300} w={220}>{data.sec5Body1}</P>
          <H2 l={963} t={4440} w={215}>{data.sec5Headline2}</H2>
          <P l={963} t={4527} w={220}>{data.sec5Body2}</P>
          <ImgBox id={data.sec5Image} sk="sec5Image" l={260} t={4687} w={469} h={334} />
          <P l={260} t={5069} w={220}>{data.sec5Body3}</P>
          <P l={260} t={5169} w={220}>{data.sec5Body4}</P>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              SECTION 6 — portraits + text
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <SecNum n="06" l={1075} t={5063} />
          <ImgBox id={data.sec6Image} sk="sec6Image" l={1139} t={5063} w={293} h={456} />
          <H2 l={260} t={5063} w={220}>{data.sec6Headline}</H2>
          <P l={889} t={5063} w={220}>{data.sec6Body1}</P>
          <ImgBox id={data.sec6ImageB} sk="sec6ImageB" l={260} t={5341} w={469} h={178} />
          <P l={260} t={5169} w={600}>{data.sec6Body2}</P>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              SECTION 7 — portraits + text
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <SecNum n="07" l={692} t={5535} />
          <ImgBox id={data.sec7Image} sk="sec7Image" l={1139} t={5616} w={293} h={262} />
          <H2 l={261} t={5574} w={467}>{data.sec7Headline}</H2>
          <P l={260} t={5640} w={220}>{data.sec7Body1}</P>
          <P l={519} t={5640} w={220}>{data.sec7Body2}</P>
          <P l={260} t={5810} w={220}>{data.sec7Body3}</P>
          <P l={815} t={5810} w={220}>{data.sec7Body4}</P>
          <ImgBox id={data.sec7ImageWide} sk="sec7ImageWide" l={261} t={5965} w={688} h={589} />
          <P l={260} t={6594} w={220}>{data.sec7Body5}</P>
          <P l={519} t={6594} w={220}>{data.sec7Body6}</P>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              SECTION 8 — text + conclusion
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <SecNum n="08" l={1394} t={6115} />
          <H2 l={963} t={6158} w={421}>{data.sec8Headline}</H2>
          <P l={963} t={6243} w={220}>{data.sec8Body1}</P>
          <P l={1210} t={6243} w={220}>{data.sec8Body2}</P>
          <P l={963} t={6445} w={220}>{data.sec8Body3}</P>
          <P l={1210} t={6445} w={220}>{data.sec8Body4}</P>

          {/* ━━ FOOTER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {data.nextProjectTitle && (
            <div style={{
              position: 'absolute', left: 663, top: FOOTER_Y + F_NAV, width: 769,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontFamily: 'var(--font-sans, Montserrat)', fontWeight: 700, fontSize: 16, color: '#ccc', textTransform: 'uppercase' }}>
                Take me elsewhere
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontFamily: 'var(--font-sans, Montserrat)', fontWeight: 700, fontSize: 16, color: '#ccc', textTransform: 'uppercase' }}>
                  {data.nextProjectTitle}
                </span>
                <span style={{ color: '#1c1c1c', fontSize: 10 }}>▶</span>
              </div>
            </div>
          )}

          <img
            src="/t1-wordmark.svg"
            alt=".elsewhere"
            style={{ position: 'absolute', left: 0, top: FOOTER_Y + F_MARK, width: W, height: 242, display: 'block' }}
          />

          <div style={{
            position: 'absolute', left: 88, top: FOOTER_Y + F_SOC, width: 1344,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
              <img src="/t1-instagram.svg" alt="Instagram" width={20} height={20} style={{ display: 'block' }} />
              <img src="/t1-twitter.svg" alt="X / Twitter" width={20} height={20} style={{ display: 'block' }} />
            </div>
            <span style={{ fontFamily: 'var(--font-sans, Montserrat)', fontWeight: 400, fontSize: 16, color: '#000' }}>@Copyright</span>
          </div>

        </div>
      </div>

      {/* ━━ SIDEBAR ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {!isEditing && sidebarVisible && (
        <>
          {sidebarHovered && (
            <div style={{
              position: 'fixed', inset: 0,
              backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
              zIndex: 19, pointerEvents: 'none',
            }} />
          )}
          <div
            onMouseEnter={() => setSidebarHovered(true)}
            onMouseLeave={() => { setSidebarHovered(false); setHoveredIdx(null) }}
            style={{
              position: 'fixed', left: Math.max(12, 80 * scale), top: '50%',
              transform: 'translateY(-50%)', zIndex: 20,
              display: 'flex', flexDirection: 'column', gap: Math.max(10, 24 * scale),
              pointerEvents: 'auto',
            }}
          >
            {SECTION_STARTS.map((_, i) => {
              const isHovered = hoveredIdx === i
              const isActive = i === activeIdx
              const fs = Math.max(9, 12 * scale)
              return (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{ cursor: 'default' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {isHovered && (
                      <div style={{ width: fs * 0.75, height: fs * 0.75, background: '#1c1c1c', flexShrink: 0 }} />
                    )}
                    <span style={{
                      fontFamily: 'var(--font-sans, Montserrat)',
                      fontSize: isHovered ? Math.max(10, 14 * scale) : fs,
                      textTransform: 'uppercase', lineHeight: 'normal',
                      fontWeight: isHovered || isActive ? 600 : 400,
                      color: isHovered || isActive ? '#1c1c1c' : '#ccc',
                      whiteSpace: 'nowrap',
                      transition: 'color 0.2s, font-size 0.2s, font-weight 0.2s',
                    }}>
                      Section: {String(i + 1).padStart(2, '0')}
                    </span>
                    {isHovered && (
                      <span style={{
                        fontFamily: 'var(--font-sans, Montserrat)',
                        fontSize: Math.max(8, 11 * scale), fontWeight: 400,
                        color: '#505050', lineHeight: 'normal',
                        maxWidth: 300 * scale, overflow: 'hidden',
                        textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginLeft: 8,
                      }}>
                        {SECTION_HEADINGS[i]}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </>
  )
}
