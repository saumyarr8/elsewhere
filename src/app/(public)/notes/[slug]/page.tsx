import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 300

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const note = await (prisma as any).note.findUnique({
    where: { slug, published: true },
  })
  if (!note) return {}
  return {
    title: note.title,
    alternates: { canonical: `/notes/${slug}` },
  }
}

export async function generateStaticParams() {
  try {
    const notes = await (prisma as any).note.findMany({
      where: { published: true },
      select: { slug: true },
    })
    return notes.map((n: { slug: string }) => ({ slug: n.slug }))
  } catch {
    return []
  }
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params
  const note = await (prisma as any).note.findUnique({
    where: { slug, published: true },
  })

  if (!note) notFound()

  return (
    <article className="max-w-2xl mx-auto px-6 py-24 md:py-36">
      <div className="mb-12">
        <Link href="/gallery" className="text-xs uppercase tracking-widest text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors">
          ← Back to Gallery
        </Link>
      </div>

      <header className="mb-12 space-y-4">
        <div className="flex items-center gap-1.5">
          <span className="font-sans text-xs uppercase tracking-widest text-[var(--color-ink-muted)]">Notes |</span>
          <span className="font-sans text-xs uppercase tracking-widest text-[#848484]">{note.readTime}</span>
        </div>
        <h1 
          className="text-4xl md:text-5xl font-light leading-tight tracking-tight uppercase"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {note.title}
        </h1>
        <div className="text-xs text-[var(--color-ink-muted)] pt-2 border-b border-[var(--color-border)] pb-4">
          Published {new Date(note.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </header>

      <div 
        className="prose prose-neutral max-w-none font-sans text-base leading-relaxed text-[var(--color-ink)] space-y-6"
        dangerouslySetInnerHTML={{ __html: note.content }}
      />

      <footer className="py-24 text-center mt-20 border-t border-[var(--color-border)]">
        <Link
          href="/gallery"
          className="text-4xl md:text-6xl tracking-tight text-[var(--color-ink)] hover:opacity-60 transition-opacity"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          .elsewhere
        </Link>
      </footer>
    </article>
  )
}
