import { getCanvasItems } from '@/actions/canvas.actions'
import { prisma } from '@/lib/prisma'
import CanvasEditor from '@/components/admin/canvas-editor/CanvasEditor'
import type { CanvasItem } from '@/lib/types/canvas'

export const metadata = { title: 'Canvas Editor' }

export default async function CanvasPage() {
  const [rawItems, projects] = await Promise.all([
    getCanvasItems(),
    prisma.project.findMany({
      orderBy: { title: 'asc' },
      select: { id: true, title: true, slug: true },
    }),
  ])

  const items: CanvasItem[] = rawItems.map((item) => ({
    id: item.id,
    projectId: item.projectId,
    imageId: item.imageId,
    xPercent: item.xPercent,
    yPercent: item.yPercent,
    widthPercent: item.widthPercent,
    heightPercent: item.heightPercent,
    rotation: item.rotation,
    zIndex: item.zIndex,
    image: {
      cloudinaryId: item.image.cloudinaryId,
      width: item.image.width,
      height: item.image.height,
      altText: item.image.altText,
    },
    project: item.project,
  }))

  return (
    <div className="flex flex-col h-full">
      <div className="px-8 py-5 border-b border-[var(--color-border)] bg-white">
        <h1 className="text-xl font-medium" style={{ fontFamily: 'var(--font-heading)' }}>
          Homepage Canvas
        </h1>
        <p className="text-xs text-[var(--color-ink-muted)] mt-0.5">
          Drag images to position them. Resize via corner handle. Changes take effect on save.
        </p>
      </div>
      <div className="flex-1 overflow-hidden">
        <CanvasEditor initialItems={items} projects={projects} />
      </div>
    </div>
  )
}
