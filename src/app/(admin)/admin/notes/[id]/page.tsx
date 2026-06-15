import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import NoteEditor from './NoteEditor'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const note = await (prisma as any).note.findUnique({ where: { id }, select: { title: true } })
  return { title: note?.title ?? 'Edit Note' }
}

export default async function NoteEditorPage({ params }: Props) {
  const { id } = await params

  const note = await (prisma as any).note.findUnique({
    where: { id },
  })

  if (!note) notFound()

  return <NoteEditor note={note} />
}
