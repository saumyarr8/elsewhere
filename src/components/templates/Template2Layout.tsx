'use client'

import React, { useEffect, useRef, useState } from 'react'

// ─── Data type ────────────────────────────────────────────────────────────────

export type Template2Data = {
  titleLight?: string
  titleBold?: string
  location?: string
  coordinates?: string
  camera?: string
  heroImage?: string     // 1352 × 671
  sec1Image?: string     // 579 × 475  — section 1 left
  sec2Image?: string     // 588 × 492  — section 2 right
  sec3Image?: string     // 1062 × 575 — section 3 wide
  sec4Image?: string     // 575 × 620  — section 4 left
  sec5Image?: string     // 748 × 554  — section 5 large
  sec6Image?: string     // 705 × 589  — section 6 left
  sec7Image?: string     // 587 × 392  — section 7 right
  // Section 1 text
  sec1Headline?: string
  sec1Quote?: string
  sec1Body1?: string
  sec1Body2?: string
  sec1Body3?: string
  sec1Quote2?: string
  // Section 2 text
  sec2Headline?: string
  sec2Body1?: string
  sec2Body2?: string
  sec2Body3?: string
  sec2Quote?: string
  sec2Body4?: string
  // Section 3 text
  sec3Headline?: string
  sec3Body1?: string
  sec3Body2?: string
  sec3Body3?: string
  sec3Body4?: string
  sec3Body5?: string
  // Section 4 text
  sec4Headline?: string
  sec4Quote?: string
  sec4Body1?: string
  sec4Body2?: string
  sec4Quote2?: string
  // Section 5 text
  sec5Headline?: string
  sec5Body1?: string
  sec5Quote?: string
  sec5Body2?: string
  sec5Body3?: string
  // Section 6 text
  sec6Headline?: string
  sec6Body1?: string
  sec6Quote?: string
  // Section 7 text
  sec7Col1?: string
  sec7Col2?: string
  sec7Col3?: string
  sec7Headline?: string
  sec7Body1?: string
  sec7Body2?: string
  sec7Body3?: string
  sec7Body4?: string
  sec7Body5?: string
  nextProjectTitle?: string
  nextProjectSlug?: string
}

export function hasContent(d: Partial<Template2Data>): boolean {
  return !!(d.heroImage || d.sec1Image || d.sec2Image)
}

// ─── Canvas constants (W=1512, H=7446) ───────────────────────────────────────

const W = 1512
const H = 7446

const SECTION_STARTS = [1009, 1559, 2294, 3196, 4313, 5061, 5984]

const FOOTER_Y = 7042
const F_NAV    = 0
const F_MARK   = 200
const F_SOC    = 442

// ─── Component ────────────────────────────────────────────────────────────────

export default function Template2Layout({
  data,
  isEditing = false,
  onImageSelect,
}: {
  data: Partial<Template2Data>
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
    data.sec2Headline?.slice(0, 50) || 'Section 02',
    data.sec3Headline?.slice(0, 50) || 'Section 03',
    data.sec4Headline?.slice(0, 50) || 'Section 04',
    data.sec5Headline?.slice(0, 50) || 'Section 05',
    data.sec6Headline?.slice(0, 50) || 'Section 06',
    data.sec7Headline?.slice(0, 50) || 'Section 07',
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

  function Quote({ children, l, t, w = 395 }: { children?: string; l: number; t: number; w?: number }) {
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
            fontFamily: 'var(--font-serif, DM Sans)', fontSize: 40,
            color: '#000', textTransform: 'uppercase', lineHeight: 1.15, whiteSpace: 'nowrap',
          }}>
            {(data.titleLight || data.titleBold) ? (
              <>
                <span style={{ fontWeight: 400 }}>{data.titleLight || ''}</span>
                <span style={{ fontWeight: 700 }}>{data.titleBold || ''}</span>
              </>
            ) : (
              <span style={{ fontWeight: 700, color: '#ccc' }}>Project Title</span>
            )}
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
          <ImgBox id={data.sec1Image} sk="sec1Image" l={260} t={1009} w={579} h={475} />
          <SecNum n="01" l={1359} t={1009} />
          <H2 l={871} t={1045} w={488}>{data.sec1Headline}</H2>
          <P l={871} t={1115} w={488}>{data.sec1Body1}</P>
          <Quote l={871} t={1155} w={520}>{data.sec1Quote}</Quote>
          <P l={871} t={1265} w={488}>{data.sec1Body2}</P>
          <Quote l={871} t={1305} w={520}>{data.sec1Quote2}</Quote>
          <P l={871} t={1425} w={255}>{data.sec1Body3}</P>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              SECTION 2 — image right, text left
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <ImgBox id={data.sec2Image} sk="sec2Image" l={841} t={1559} w={588} h={492} />
          <SecNum n="02" l={746} t={1635} />
          <H2 l={354} t={1671} w={380}>{data.sec2Headline}</H2>
          <P l={354} t={1756} w={220}>{data.sec2Body1}</P>
          <P l={596} t={1756} w={220}>{data.sec2Body2}</P>
          <P l={352} t={2055} w={227}>{data.sec2Body3}</P>
          <Quote l={352} t={2088} w={220}>{data.sec2Quote}</Quote>
          <P l={597} t={2055} w={220}>{data.sec2Body4}</P>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              SECTION 3 — wide image, text right
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <ImgBox id={data.sec3Image} sk="sec3Image" l={249} t={2294} w={1062} h={575} />
          <SecNum n="03" l={1279} t={2888} />
          <H2 l={855} t={2934} w={380}>{data.sec3Headline}</H2>
          <P l={855} t={3009} w={220}>{data.sec3Body1}</P>
          <P l={1095} t={3009} w={220}>{data.sec3Body2}</P>
          <P l={1095} t={3189} w={220}>{data.sec3Body3}</P>
          <P l={855} t={3223} w={220}>{data.sec3Body4}</P>
          <P l={1095} t={3321} w={220}>{data.sec3Body5}</P>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              SECTION 4 — image left, text blocks
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <ImgBox id={data.sec4Image} sk="sec4Image" l={249} t={3196} w={575} h={620} />
          <SecNum n="04" l={1286} t={3560} />
          <H2 l={855} t={3601} w={448}>{data.sec4Headline}</H2>
          <Quote l={858} t={3761} w={518}>{data.sec4Quote}</Quote>
          <P l={858} t={3897} w={255}>{data.sec4Body1}</P>
          <P l={1138} t={3897} w={220}>{data.sec4Body2}</P>
          <Quote l={858} t={4016} w={220}>{data.sec4Quote2}</Quote>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              SECTION 5 — large image right, text left
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <ImgBox id={data.sec5Image} sk="sec5Image" l={679} t={4313} w={748} h={554} />
          <SecNum n="05" l={325} t={4454} />
          <H2 l={247} t={4504} w={395} size={32}>{data.sec5Headline}</H2>
          <P l={247} t={4672} w={395}>{data.sec5Body1}</P>
          <Quote l={247} t={4705} w={395}>{data.sec5Quote}</Quote>
          <P l={247} t={4894} w={220}>{data.sec5Body2}</P>
          <P l={490} t={4894} w={220}>{data.sec5Body3}</P>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              SECTION 6 — image left, text right
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <ImgBox id={data.sec6Image} sk="sec6Image" l={255} t={5061} w={705} h={589} />
          <SecNum n="06" l={1075} t={5274} />
          <H2 l={982} t={5320} w={418} size={32}>{data.sec6Headline}</H2>
          <P l={982} t={5490} w={418}>{data.sec6Body1}</P>
          <Quote l={982} t={5530} w={418}>{data.sec6Quote}</Quote>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              SECTION 7 — three text columns, then image + conclusion
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <P l={255} t={5676} w={214}>{data.sec7Col1}</P>
          <P l={500} t={5676} w={213}>{data.sec7Col2}</P>
          <P l={741} t={5676} w={220}>{data.sec7Col3}</P>

          <SecNum n="07" l={769} t={5984} />
          <ImgBox id={data.sec7Image} sk="sec7Image" l={833} t={6109} w={587} h={392} />
          <H2 l={260} t={6033} w={509} size={32}>{data.sec7Headline}</H2>
          <P l={260} t={6106} w={255}>{data.sec7Body1}</P>
          <P l={546} t={6106} w={255}>{data.sec7Body2}</P>
          <P l={260} t={6249} w={255}>{data.sec7Body3}</P>
          <P l={546} t={6324} w={255}>{data.sec7Body4}</P>
          <P l={255} t={6456} w={255}>{data.sec7Body5}</P>

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

      {/* ━━ SIDEBAR (public mode only) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
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
