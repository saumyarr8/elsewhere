import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import SiteNav from '@/components/public/nav/SiteNav'
import SiteFooter from '@/components/public/SiteFooter'
import ProjectHero from '@/components/public/project/ProjectHero'
import BlockRenderer from '@/components/public/project/BlockRenderer'
import type { BlockPayload } from '@/lib/types/blocks'

export const revalidate = 300

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  let project = null;
  try {
    project = await prisma.project.findUnique({
      where: { slug, published: true },
      include: { ogImage: true },
    })
  } catch (error) {
    return { title: 'Preview Mode (No DB)' }
  }
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
  let project = null;
  try {
    project = await prisma.project.findUnique({
      where: { slug, published: true },
      include: {
        blocks: { orderBy: { order: 'asc' } },
        heroImage: true,
      },
    })
  } catch (error) {
    console.log("Using local fallback for project page...");
    // Fallback so it doesn't crash locally
    project = {
      id: 'mock-id',
      slug,
      title: slug.split('-').join(' ').toUpperCase(),
      description: 'Local Preview Mode - Database not connected. The real content will show when deployed.',
      published: true,
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      seoTitle: null,
      seoDescription: null,
      heroImageId: null,
      ogImageId: null,
      template: 'TEMPLATE_1',
      theme: 'LIGHT',
      password: null,
      blocks: [],
      heroImage: null,
      ogImage: null
    } as any;
  }

  if (!project) notFound()

  if (project.template === 'TEMPLATE_1') {
    const Template1 = (await import('@/components/templates/Template1')).default
    return (
      <>
        <SiteNav />
        <div className="pt-24">
          <Template1 project={project} />
        </div>
      </>
    )
  }

  if (project.template === 'TEMPLATE_2') {
    const Template2 = (await import('@/components/templates/Template2')).default
    return (
      <>
        <SiteNav />
        <Template2 project={project} />
      </>
    )
  }

  if (project.template === 'TEMPLATE_3') {
    const Template3 = (await import('@/components/templates/Template3')).default
    return (
      <>
        <SiteNav />
        <Template3 project={project} />
      </>
    )
  }

  const blocks = project.blocks.map((b) => ({
    ...b,
    payload: { type: b.type, ...(b.payload as object) } as BlockPayload,
  }))

  return (
    <>
    <SiteNav />
    <article>
      <ProjectHero project={project} />
      <div className="max-w-screen-xl mx-auto">
        {blocks.map((block) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      </div>
    </article>
    <SiteFooter />
    </>
  )
}
