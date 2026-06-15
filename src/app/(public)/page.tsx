import { prisma } from '@/lib/prisma'
import HomepageCanvas from '@/components/public/canvas/HomepageCanvas'

export const revalidate = 60

export default async function HomePage() {
  const items = await prisma.homepageCanvasItem.findMany({
    include: {
      image: true,
      project: { select: { id: true, title: true, slug: true, published: true } },
    },
    orderBy: { zIndex: 'asc' },
  }).catch(() => [])

  const published = items.filter((i: typeof items[number]) => !i.project || i.project.published)

  return <HomepageCanvas items={published} />
}
