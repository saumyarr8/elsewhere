'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import type { Prisma } from '@/generated/prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

async function requireAdmin() {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')
}

const ItemSchema = z.object({
  id: z.string().optional(),
  projectId: z.string().nullable().optional(),
  imageId: z.string().min(1),
  xPercent: z.number(),
  yPercent: z.number(),
  widthPercent: z.number().positive(),
  heightPercent: z.number().positive(),
  rotation: z.number().default(0),
  zIndex: z.number().int().default(0),
})

export type CanvasItemInput = z.infer<typeof ItemSchema>

export async function saveCanvasLayout(items: CanvasItemInput[]) {
  await requireAdmin()

  await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    await tx.homepageCanvasItem.deleteMany()
    for (const item of items) {
      await tx.homepageCanvasItem.create({
        data: {
          projectId: item.projectId ?? null,
          imageId: item.imageId,
          xPercent: item.xPercent,
          yPercent: item.yPercent,
          widthPercent: item.widthPercent,
          heightPercent: item.heightPercent,
          rotation: item.rotation ?? 0,
          zIndex: item.zIndex ?? 0,
        },
      })
    }
  })

  revalidatePath('/')
}

export async function getCanvasItems() {
  await requireAdmin()

  return prisma.homepageCanvasItem.findMany({
    include: {
      image: true,
      project: { select: { id: true, title: true, slug: true } },
    },
    orderBy: { zIndex: 'asc' },
  })
}
