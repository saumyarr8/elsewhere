import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import SiteNav from '@/components/public/nav/SiteNav'
import GalleryClient from '@/components/public/gallery/GalleryClient'
import { getNextProject } from '@/lib/utils/next-project'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Gallery',
  alternates: { canonical: '/gallery' },
}

export default async function GalleryPage() {
  const images = await prisma.galleryImage
    .findMany({
      where: { published: true },
      include: { image: true },
      orderBy: { order: 'asc' },
    })
    .catch(() => [])

  const notes = await prisma.note
    .findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    })
    .catch(() => [])

  const categories = Array.from(
    new Set(images.map((i) => i.category).filter((c): c is string => Boolean(c)))
  )

  const nextProject = await getNextProject()

  return (
    <>
      <SiteNav />
      <GalleryClient items={images} categories={categories} notes={notes} nextProject={nextProject} />
    </>
  )
}
