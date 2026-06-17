import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ProjectEditor from './ProjectEditor'
import Template1Editor from './Template1Editor'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const project = await prisma.project.findUnique({ where: { id }, select: { title: true } })
  return { title: project?.title ?? 'Edit Project' }
}

export default async function ProjectEditorPage({ params }: Props) {
  const { id } = await params

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      blocks: { orderBy: { order: 'asc' } },
      heroImage: true,
      ogImage: true,
    },
  })

  if (!project) notFound()

  if (project.template === 'TEMPLATE_1') {
    return <Template1Editor project={project} />
  }

  return <ProjectEditor project={project} />
}
