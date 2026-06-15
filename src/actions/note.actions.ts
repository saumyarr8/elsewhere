'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { slugify } from '@/lib/utils/slugify'
import { z } from 'zod'

export type Note = {
  id: string
  title: string
  slug: string
  content: string
  readTime: string
  published: boolean
  createdAt: Date
  updatedAt: Date
}

async function requireAdmin() {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')
}

const NoteSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string(),
  readTime: z.string().min(1),
})

export async function createNote(_prevState: { error?: string } | undefined, formData: FormData) {
  await requireAdmin()

  const title = formData.get('title') as string
  if (!title?.trim()) return { error: 'Title is required.' }

  const rawSlug = (formData.get('slug') as string) || slugify(title)
  const slug = slugify(rawSlug)

  const existing = await (prisma as any).note.findUnique({ where: { slug } })
  if (existing) return { error: 'A note with this slug already exists.' }

  const note = await (prisma as any).note.create({
    data: {
      title: title.trim(),
      slug,
      content: '',
      readTime: '2 min read',
    },
  })

  revalidatePath('/admin/notes')
  redirect(`/admin/notes/${note.id}`)
}

export async function updateNote(id: string, data: {
  title?: string
  slug?: string
  content?: string
  readTime?: string
}) {
  await requireAdmin()

  if (data.slug) {
    data.slug = slugify(data.slug)
    const existing = await (prisma as any).note.findFirst({
      where: { slug: data.slug, NOT: { id } },
    })
    if (existing) return { error: 'Slug already in use.' }
  }

  await (prisma as any).note.update({
    where: { id },
    data,
  })

  revalidatePath('/admin/notes')
  revalidatePath(`/admin/notes/${id}`)
  revalidatePath('/gallery')
}

export async function publishNote(id: string) {
  await requireAdmin()
  const note = await (prisma as any).note.update({
    where: { id },
    data: { published: true },
  })
  revalidatePath('/gallery')
  revalidatePath(`/notes/${note.slug}`)
  revalidatePath('/admin/notes')
}

export async function unpublishNote(id: string) {
  await requireAdmin()
  const note = await (prisma as any).note.update({
    where: { id },
    data: { published: false },
  })
  revalidatePath('/gallery')
  revalidatePath(`/notes/${note.slug}`)
  revalidatePath('/admin/notes')
}

export async function deleteNote(id: string) {
  await requireAdmin()
  const note = await (prisma as any).note.findUnique({ where: { id } })
  if (!note) return

  await (prisma as any).note.delete({ where: { id } })
  revalidatePath('/gallery')
  revalidatePath(`/notes/${note.slug}`)
  revalidatePath('/admin/notes')
  redirect('/admin/notes')
}
