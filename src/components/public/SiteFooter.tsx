import Link from 'next/link'

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
      <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.844l-5.36-6.61L4.6 22H1.34l8.04-9.19L1 2h7.07l4.84 6.04L18.244 2zm-1.2 18h1.9L7.04 4H5.02l11.024 16z" />
    </svg>
  )
}

export default function SiteFooter() {
  return (
    <footer className="pt-24 pb-10">
      <Link
        href="/"
        className="block text-center leading-[0.85] tracking-tight text-[var(--color-ink)] hover:opacity-60 transition-opacity"
        style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(4rem, 16vw, 14rem)' }}
      >
        .elsewhere
      </Link>

      <div className="flex items-center justify-between px-6 md:px-20 mt-8 pb-2">
        <div className="flex items-center gap-10 text-[var(--color-ink)]">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-60 transition-opacity">
            <InstagramIcon />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="hover:opacity-60 transition-opacity">
            <TwitterIcon />
          </a>
        </div>
        <p className="text-base text-[var(--color-ink)]">@Copyright</p>
      </div>
    </footer>
  )
}
