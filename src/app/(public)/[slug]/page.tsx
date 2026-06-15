import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ProjectHero from '@/components/public/project/ProjectHero'
import BlockRenderer from '@/components/public/project/BlockRenderer'
import type { BlockPayload } from '@/lib/types/blocks'

export const revalidate = 300

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await prisma.project.findUnique({
    where: { slug, published: true },
    include: { ogImage: true },
  })
  if (!project) return {}

  const title = project.seoTitle || project.title
  const description = project.seoDescription || project.description || ''
  const ogImage = project.ogImage
    ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_1200,h_630,c_fill,f_jpg/${project.ogImage.cloudinaryId}`
    : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
    },
    twitter: { card: 'summary_large_image', title, description, ...(ogImage && { images: [ogImage] }) },
    alternates: { canonical: `/${slug}` },
  }
}

export async function generateStaticParams() {
  try {
    const projects = await prisma.project.findMany({
      where: { published: true },
      select: { slug: true },
    })
    return projects.map((p: { slug: string }) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await prisma.project.findUnique({
    where: { slug, published: true },
    include: {
      blocks: { orderBy: { order: 'asc' } },
      heroImage: true,
    },
  })

  if (!project) notFound()

  const blocks = project.blocks.map((b) => ({
    ...b,
    payload: { type: b.type, ...(b.payload as object) } as BlockPayload,
  }))

  return (
    <article>
      <ProjectHero project={project} />
      <div className="max-w-screen-xl mx-auto">
        {blocks.map((block) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      </div>
      <footer className="py-24 text-center">
        <a
          href="/"
          className="text-4xl md:text-6xl tracking-tight text-[var(--color-ink)] hover:opacity-60 transition-opacity"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          .elsewhere
        </a>
      </footer>
    </article>
  )
}
