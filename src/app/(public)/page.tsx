import { prisma } from '@/lib/prisma'
import SiteNav from '@/components/public/nav/SiteNav'
import HomeCanvas from '@/components/public/home/HomeCanvas'
import type { HomeProject } from '@/components/public/home/HomeCanvas'

export const revalidate = 60

export default async function HomePage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    select: {
      slug: true,
      title: true,
      template: true,
      templateData: true,
      heroImage: { select: { cloudinaryId: true } },
    },
    orderBy: { publishedAt: 'asc' },
    take: 11,
  }).catch(() => [])

  const mapped: HomeProject[] = projects.map((p) => {
    let heroImageId: string | null = null

    if (p.template === 'TEMPLATE_1' && p.templateData) {
      const data = typeof p.templateData === 'string'
        ? JSON.parse(p.templateData)
        : p.templateData as Record<string, unknown>
      heroImageId = (data.heroImage as string | undefined) ?? null
    } else {
      heroImageId = p.heroImage?.cloudinaryId ?? null
    }

    return { slug: p.slug, title: p.title, heroImageId }
  })

  return (
    <>
      <SiteNav />
      <HomeCanvas projects={[]} />
    </>
  )
}
