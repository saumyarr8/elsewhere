import Link from 'next/link'

type Props = {
  nextProject?: { slug: string; title: string } | null
}

export default function SiteFooter({ nextProject }: Props) {
  return (
    <footer className="pt-24 pb-10">
      {nextProject && (
        <div className="flex items-center justify-between px-6 md:px-20 mb-16">
          <span style={{ fontFamily: 'var(--font-sans, Montserrat)', fontWeight: 700, fontSize: 16, color: '#ccc', textTransform: 'uppercase' }}>
            Take me elsewhere
          </span>
          <Link
            href={`/${nextProject.slug}`}
            className="flex items-center gap-1.5 hover:opacity-60 transition-opacity"
          >
            <span style={{ fontFamily: 'var(--font-sans, Montserrat)', fontWeight: 700, fontSize: 16, color: '#ccc', textTransform: 'uppercase' }}>
              Next project
            </span>
            <span style={{ color: '#1c1c1c', fontSize: 10 }}>▶</span>
          </Link>
        </div>
      )}

      <img
        src="/t1-wordmark.svg"
        alt=".elsewhere"
        className="w-full block"
      />

      <div className="flex items-center justify-between px-6 md:px-20 mt-16">
        <div className="flex items-center gap-10 text-[var(--color-ink)]">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-60 transition-opacity">
            <img src="/t1-instagram.svg" alt="Instagram" width={20} height={20} className="block" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="hover:opacity-60 transition-opacity">
            <img src="/t1-twitter.svg" alt="X / Twitter" width={20} height={20} className="block" />
          </a>
        </div>
        <p className="text-base text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-sans, Montserrat)' }}>@Copywrite</p>
      </div>
    </footer>
  )
}
