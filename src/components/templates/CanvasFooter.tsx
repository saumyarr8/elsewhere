'use client'

type Props = {
  footerY: number
  markOffset: number
  canvasWidth: number
  nextProjectSlug?: string
}

export default function CanvasFooter({ footerY, markOffset, canvasWidth, nextProjectSlug }: Props) {
  return (
    <>
      {nextProjectSlug ? (
        <a
          href={`/${nextProjectSlug}`}
          style={{
            position: 'absolute', left: 0, top: footerY, width: canvasWidth,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24,
            textDecoration: 'none',
          }}
        >
          <span style={{ fontFamily: 'var(--font-sans, Montserrat)', fontWeight: 700, fontSize: 16, color: '#ccc', textTransform: 'uppercase' }}>
            Take me elsewhere
          </span>
          <span style={{ fontFamily: 'var(--font-sans, Montserrat)', fontWeight: 700, fontSize: 16, color: '#ccc', textTransform: 'uppercase' }}>
            Next project
          </span>
          <span style={{ color: '#1c1c1c', fontSize: 10 }}>▶</span>
        </a>
      ) : (
        <div style={{
          position: 'absolute', left: 0, top: footerY, width: canvasWidth,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontFamily: 'var(--font-sans, Montserrat)', fontWeight: 700, fontSize: 16, color: '#ccc', textTransform: 'uppercase' }}>
            Take me elsewhere
          </span>
        </div>
      )}

      <img
        src="/t1-wordmark.svg"
        alt=".elsewhere"
        style={{ position: 'absolute', left: 0, top: footerY + markOffset, width: canvasWidth, height: 242, display: 'block' }}
      />

      <div style={{
        position: 'absolute', left: 88, top: footerY + markOffset + 290, width: canvasWidth - 176,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
          <img src="/t1-instagram.svg" alt="Instagram" width={20} height={20} style={{ display: 'block' }} />
          <img src="/t1-twitter.svg" alt="X / Twitter" width={20} height={20} style={{ display: 'block' }} />
        </div>
        <span style={{ fontFamily: 'var(--font-sans, Montserrat)', fontWeight: 400, fontSize: 16, color: '#000' }}>
          @Copywrite
        </span>
      </div>
    </>
  )
}
