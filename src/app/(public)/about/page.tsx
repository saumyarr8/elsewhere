import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Me',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <article className="min-h-[calc(100vh-4rem)] px-6 md:px-10 py-28 md:py-36">
      <div className="mx-auto max-w-4xl space-y-12">
        <header className="space-y-6">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-ink-muted)]">
            About Me
          </p>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-light leading-none text-[var(--color-ink)]"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.04em' }}
          >
            Building image-led stories, one project at a time.
          </h1>
        </header>

        <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-12">
          <section className="space-y-4 text-base md:text-lg leading-relaxed text-[var(--color-ink-muted)] max-w-2xl">
            <p>
              This space holds my selected projects and gallery work, with a focus on
              visual composition, atmosphere, and clean presentation.
            </p>
            <p>
              I use it as a living portfolio, so the homepage surfaces current projects
              and the gallery collects supporting imagery and notes.
            </p>
          </section>

          <aside className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-paper-warm)]/70 p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-ink-faint)]">
              Navigate
            </p>
            <div className="mt-5 space-y-3">
              <Link
                href="/"
                className="block text-xl md:text-2xl text-[var(--color-ink)] hover:opacity-60 transition-opacity"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Projects
              </Link>
              <Link
                href="/gallery"
                className="block text-xl md:text-2xl text-[var(--color-ink)] hover:opacity-60 transition-opacity"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Gallery
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </article>
  )
}