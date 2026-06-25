'use client'

import { useState, useRef, useEffect } from 'react'

const W = 1512
const H = 4930

const mont: React.CSSProperties = { fontFamily: 'Montserrat, sans-serif' }
const dm: React.CSSProperties = { fontFamily: "'DM Sans', sans-serif", fontVariationSettings: "'opsz' 14" }

export default function AboutCanvas() {
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
    <div ref={wrapperRef} style={{ width: '100%', height: H * scale, position: 'relative' }}>
      <div style={{
        width: W, height: H,
        position: 'relative',
        transformOrigin: 'top left',
        transform: `scale(${scale})`,
        background: '#fff',
        overflow: 'hidden',
      }}>

        {/* ── Name heading ── */}
        <p style={{ position: 'absolute', left: 80, top: 87, fontSize: 75.891, color: '#000', textTransform: 'uppercase', whiteSpace: 'nowrap', lineHeight: 'normal', margin: 0, ...mont }}>
          <span style={{ fontWeight: 700 }}>Arjun </span>
          <span style={{ fontWeight: 400 }}>Swaminathan</span>
        </p>

        {/* ── Intro paragraph ── */}
        <p style={{ position: 'absolute', left: 984, top: 220, width: 448, color: '#505050', fontSize: 16, fontWeight: 400, textAlign: 'left', lineHeight: '1.6', margin: 0, ...mont }}>
          I work at the intersection of movement, culture, and human experience. Slowly, staying long enough for a place to reveal itself.
        </p>

        {/* ── Large portrait ── */}
        <div style={{ position: 'absolute', height: 675, left: 80, top: 315, width: 589, overflow: 'hidden' }}>
          <img alt="Arjun portrait" style={{ position: 'absolute', inset: 0, maxWidth: 'none', objectFit: 'cover', width: '100%', height: '100%' }} src="/images/arjun-portrait.png" />
        </div>

        {/* ── Bio text 1 ── */}
        <p style={{ position: 'absolute', left: 750, top: 480, width: 380, color: '#505050', fontSize: 16, fontWeight: 400, textAlign: 'left', lineHeight: '1.6', margin: 0, ...mont }}>
          {`For over fifteen years, I've used photography, film, sound, and writing to follow people whose lives are closely tied to land, craft, and the quiet rituals that hold things together. People in India's hinterlands, and beyond — those whose knowledge lives in hands, in engines, in the dust of a road, in the weave of a fabric.`}
        </p>

        {/* ── Moto photo ── */}
        <div style={{ position: 'absolute', height: 326, left: 1216, top: 315, width: 216, overflow: 'hidden' }}>
          <img alt="" style={{ position: 'absolute', inset: 0, maxWidth: 'none', objectFit: 'cover', width: '100%', height: '100%' }} src="/images/arjun-moto.png" />
        </div>



        {/* ── Arjun sitting image ── */}
        <div style={{ position: 'absolute', height: 579, left: 80, top: 1150, width: 453, overflow: 'hidden' }}>
          <img alt="" style={{ position: 'absolute', inset: 0, maxWidth: 'none', objectFit: 'cover', width: '100%', height: '100%' }} src="/images/arjun-sitting.png" />
        </div>

        {/* ── Bio text 2 ── */}
        <p style={{ position: 'absolute', left: 613, top: 1350, width: 285, color: '#505050', fontSize: 16, fontWeight: 400, textAlign: 'left', lineHeight: '1.6', margin: 0, ...mont }}>
          {`I find myself drawn to stories of risk, repair, and survival. The kind that rarely travel far from where they were made. Stories that live in local governance, in biodiversity, in the oral traditions passed between generations in languages that don't always have a written form. Everywhere I go, I am humbled by the trust placed in me — to listen carefully enough, and to carry what I hear without breaking it.`}
        </p>

        {/* ── River scene image ── */}
        <div style={{ position: 'absolute', height: 249, left: 984, top: 1150, width: 448, overflow: 'hidden' }}>
          <img alt="" style={{ position: 'absolute', inset: 0, maxWidth: 'none', objectFit: 'cover', width: '100%', height: '100%' }} src="/images/river-scene.png" />
        </div>

        {/* ── Quote block ── */}
        <div style={{ position: 'absolute', left: 533, top: 1850, width: 899, display: 'flex', flexDirection: 'column', gap: 35 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ height: 28.372, width: 32.616, flexShrink: 0 }}>
              <img alt="" style={{ display: 'block', width: '100%', height: '100%' }} src="/icons/open-quote.svg" />
            </div>
            <p style={{ fontWeight: 500, fontStyle: 'italic', fontSize: 32, color: '#000', textTransform: 'uppercase', lineHeight: '1.3', margin: 0, ...dm }}>
              {`My heart rests somewhere between a slab of cold stone and a hot cup of tea, listening to a story of how one spell of hard rain changed the course of three generations, or how a root, a leaf, and a mushroom once saved a man's life.`}
            </p>
          </div>
          <p style={{ fontWeight: 400, fontSize: 16, color: '#505050', lineHeight: 'normal', margin: 0, ...mont }}>
            That, to me, is home.
          </p>
        </div>

        {/* ── Elsewhere section ── */}
        <div style={{ position: 'absolute', left: 80, top: 2150, width: 373, color: '#505050', fontSize: 16 }}>
          <p style={{ fontWeight: 700, lineHeight: 'normal', margin: 0, marginBottom: 12, ...mont }}>Elsewhere</p>
          <p style={{ fontWeight: 400, lineHeight: 1.6, textAlign: 'left', margin: 0, ...mont }}>
            Elsewhere sits at the intersection of culture, movement, and human experience. It began as a question: what happens when you stay in a place long enough for it to stop performing for you?
          </p>
          <br />
          <p style={{ fontWeight: 400, lineHeight: 1.6, textAlign: 'left', margin: 0, ...mont }}>
            What you find there — in the margins, in the repetition, in the things people reach for without thinking — is where the real stories live.
          </p>
        </div>

        {/* ── Malnad days wide image ── */}
        <div style={{ position: 'absolute', height: 518, left: 533, top: 2150, width: 899, overflow: 'hidden' }}>
          <img alt="Malnad days" style={{ position: 'absolute', height: '103.41%', left: '-1.81%', maxWidth: 'none', top: 0, width: '101.81%' }} src="/images/malnad-days.png" />
        </div>

        {/* ── Consulting Section (Image + Text) ── */}
        <div style={{ position: 'absolute', height: 320, left: 80, top: 2750, width: 450, overflow: 'hidden' }}>
          <img alt="Taste of Konkan" style={{ position: 'absolute', inset: 0, maxWidth: 'none', objectFit: 'cover', width: '100%', height: '100%' }} src="/images/taste-of-konkan.png" />
        </div>

        <div style={{ position: 'absolute', left: 580, top: 2750, width: 550, color: '#505050', fontSize: 16, lineHeight: 1.6, ...mont }}>
          <p style={{ fontWeight: 700, lineHeight: 'normal', margin: 0, marginBottom: 12, color: '#000' }}>Consulting</p>
          <p style={{ fontWeight: 400, textAlign: 'left', margin: 0 }}>
            Cultural intelligence and narrative strategy for organizations navigating complex terrain. We help foundations, corporations, and institutions tell stories that respect nuance, honor context, and resist simplification.
          </p>
          <br />
          <p style={{ fontWeight: 400, textAlign: 'left', margin: 0 }}>
            This includes: cultural research, narrative development, brand storytelling that's rooted in place and practice, and strategic guidance for organizations working across cultures or entering new markets.
          </p>
        </div>

        {/* ── Shaped by Time Section (Text + Portrait) ── */}
        <div style={{ position: 'absolute', left: 580, top: 3200, width: 520, color: '#505050', fontSize: 16, lineHeight: 1.6, ...mont }}>
          <p style={{ fontWeight: 400, textAlign: 'left', margin: 0 }}>
            Shaped by time on the ground — through travel, observation, and making. Working across film, photography, writing, and sound. The work that comes out of it is not designed to explain or persuade. It is made to remain present as the world shifts around it.
          </p>
          <br />
          <p style={{ fontWeight: 400, textAlign: 'left', margin: 0 }}>
            Elsewhere works with organisations and individuals who understand what that means.
          </p>
        </div>

        <div style={{ position: 'absolute', height: 420, left: 1150, top: 3050, width: 280, overflow: 'hidden' }}>
          <img alt="Elderly Woman" style={{ position: 'absolute', inset: 0, maxWidth: 'none', objectFit: 'cover', width: '100%', height: '100%' }} src="/images/elderly-woman.png" />
        </div>



        {/* ── Contact CTA ── */}
        <div style={{ position: 'absolute', left: 80, top: 3600, display: 'flex', flexDirection: 'column', gap: 40 }}>
          <p style={{ fontWeight: 500, fontSize: 28, color: '#000', width: 796, margin: 0, lineHeight: 1.4, ...dm }}>
            If something here has slowed you down, if you recognise the kind of work this is and it resonates with you- write to us.
          </p>
          <div style={{ display: 'flex', gap: 71, alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11, width: 70 }}>
              <p style={{ fontWeight: 400, fontSize: 14, color: '#505050', textTransform: 'uppercase', margin: 0, ...mont }}>Based in</p>
              <p style={{ fontWeight: 500, fontSize: 22, color: '#000', margin: 0, ...dm }}>India</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              <p style={{ fontWeight: 400, fontSize: 14, color: '#505050', textTransform: 'uppercase', margin: 0, ...mont }}>Email</p>
              <a href="mailto:arjun@elsewhere.ink" style={{ fontWeight: 500, fontSize: 22, color: '#000', textDecoration: 'underline', whiteSpace: 'nowrap', display: 'block', ...dm }}>
                arjun@elsewhere.ink
              </a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              <p style={{ fontWeight: 400, fontSize: 14, color: '#505050', textTransform: 'uppercase', margin: 0, ...mont }}>Response time</p>
              <p style={{ fontWeight: 500, fontSize: 22, color: '#000', whiteSpace: 'nowrap', margin: 0, ...dm }}>Unhurried. Within a few days.</p>
            </div>
          </div>
        </div>

        {/* ── Photo + Contact form ── */}
        <div style={{ position: 'absolute', left: 80, top: 3850, display: 'flex', gap: 118, alignItems: 'flex-start' }}>
          <div style={{ height: 565, width: 469, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
            <img alt="" style={{ position: 'absolute', inset: 0, maxWidth: 'none', objectFit: 'cover', width: '100%', height: '100%' }} src="/images/neeruganti-landscape.png" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 47, alignItems: 'flex-end', width: 765 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 93, width: '100%' }}>
              <p style={{ fontWeight: 500, fontStyle: 'italic', fontSize: 32, color: '#000', textTransform: 'uppercase', width: 571, lineHeight: 'normal', margin: 0, ...dm }}>
                Tell us what you&apos;re working on and why it matters to you.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 50, width: '100%' }}>
                <div style={{ display: 'flex', gap: 24, alignItems: 'center', width: '100%' }}>
                  <FormField label="your name" placeholder="How shall we address you" style={{ width: 370 }} />
                  <FormField label="your email" placeholder="Where we can write back" style={{ width: 371 }} />
                </div>
                <FormField label="organisation or project" placeholder="Optional - what you're part of" style={{ width: '100%' }} />
                <FormField label="your message" placeholder="What you're working on and why it matters to you. No brief message is necessary just the thing itself" style={{ width: '100%' }} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <p style={{ fontWeight: 700, fontSize: 16, color: '#ccc', textTransform: 'uppercase', margin: 0, ...mont }}>send</p>
              <img alt="" style={{ width: 4, height: 7 }} src="/icons/send-arrow.svg" />
            </div>
          </div>
        </div>

        {/* ── .elsewhere footer wordmark ── */}
        <div style={{ position: 'absolute', left: 0, top: 4550, width: W, display: 'flex', flexDirection: 'column', gap: 64, alignItems: 'center', paddingBottom: 52 }}>
          <div style={{ height: 241.71, position: 'relative', flexShrink: 0, width: '100%' }}>
            <div style={{ position: 'absolute', height: 179.461, left: 1337.16, top: 62.25, width: 174.839 }}>
              <img alt="" style={{ display: 'block', position: 'absolute', inset: 0, maxWidth: 'none', width: '100%', height: '100%' }} src="/footer/e.svg" />
            </div>
            <div style={{ position: 'absolute', height: 172.176, left: 1221.26, top: 64.56, width: 109.597 }}>
              <img alt="" style={{ display: 'block', position: 'absolute', inset: 0, maxWidth: 'none', width: '100%', height: '100%' }} src="/footer/r.svg" />
            </div>
            <div style={{ position: 'absolute', height: 179.461, left: 1028.37, top: 62.25, width: 174.839 }}>
              <img alt="" style={{ display: 'block', position: 'absolute', inset: 0, maxWidth: 'none', width: '100%', height: '100%' }} src="/footer/e.svg" />
            </div>
            <div style={{ position: 'absolute', height: 236.742, left: 847.15, top: 0, width: 164.23 }}>
              <img alt="" style={{ display: 'block', position: 'absolute', inset: 0, maxWidth: 'none', width: '100%', height: '100%' }} src="/footer/h.svg" />
            </div>
            <div style={{ position: 'absolute', height: 169.527, left: 574.25, top: 67.22, width: 260.251 }}>
              <img alt="" style={{ display: 'block', position: 'absolute', inset: 0, maxWidth: 'none', width: '100%', height: '100%' }} src="/footer/w.svg" />
            </div>
            <div style={{ position: 'absolute', height: 179.461, left: 415.05, top: 61.59, width: 151.648 }}>
              <img alt="" style={{ display: 'block', position: 'absolute', inset: 0, maxWidth: 'none', width: '100%', height: '100%' }} src="/footer/e-mid.svg" />
            </div>
            <div style={{ position: 'absolute', height: 179.461, left: 262.06, top: 61.92, width: 135.092 }}>
              <img alt="" style={{ display: 'block', position: 'absolute', inset: 0, maxWidth: 'none', width: '100%', height: '100%' }} src="/footer/s.svg" />
            </div>
            <div style={{ position: 'absolute', height: 236.742, left: 217.07, top: 0, width: 20.529 }}>
              <img alt="" style={{ display: 'block', position: 'absolute', inset: 0, maxWidth: 'none', width: '100%', height: '100%' }} src="/footer/l.svg" />
            </div>
            <div style={{ position: 'absolute', height: 179.461, left: 38.99, top: 61.59, width: 151.648 }}>
              <img alt="" style={{ display: 'block', position: 'absolute', inset: 0, maxWidth: 'none', width: '100%', height: '100%' }} src="/footer/e-left.svg" />
            </div>
            <div style={{ position: 'absolute', height: 28.806, left: 0, top: 207.94, width: 25.164 }}>
              <img alt="" style={{ display: 'block', position: 'absolute', inset: 0, maxWidth: 'none', width: '100%', height: '100%' }} src="/footer/period.svg" />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, width: 1344 }}>
            <div style={{ display: 'flex', gap: 40, alignItems: 'center', flexShrink: 0 }}>
              <div style={{ position: 'relative', flexShrink: 0, width: 20, height: 20 }}>
                <img alt="Instagram" style={{ display: 'block', position: 'absolute', inset: 0, maxWidth: 'none', width: '100%', height: '100%' }} src="/icons/instagram.svg" />
              </div>
              <div style={{ position: 'relative', flexShrink: 0, width: 20, height: 20 }}>
                <img alt="Twitter / X" style={{ display: 'block', position: 'absolute', inset: 0, maxWidth: 'none', width: '100%', height: '100%' }} src="/icons/twitter.svg" />
              </div>
            </div>
            <p style={{ lineHeight: 'normal', flexShrink: 0, fontSize: 16, color: '#000', whiteSpace: 'nowrap', fontWeight: 400, margin: 0, ...mont }}>
              @Copywrite
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

function FormField({ label, placeholder, style }: { label: string; placeholder: string; style?: React.CSSProperties }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, ...style }}>
      <p style={{ fontSize: 14, color: '#585858', textTransform: 'uppercase', fontWeight: 400, margin: 0, ...mont }}>{label}</p>
      <div style={{ borderBottom: '1px solid #585858', display: 'flex', alignItems: 'center', paddingRight: 8, paddingTop: 12, paddingBottom: 12 }}>
        <p style={{ fontSize: 14, color: '#cdcdcd', fontStyle: 'italic', fontWeight: 300, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', ...mont }}>{placeholder}</p>
      </div>
    </div>
  )
}
