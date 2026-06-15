'use client'

import { useState, useRef, useCallback, useTransition } from 'react'
import Image from 'next/image'
import { saveCanvasLayout } from '@/actions/canvas.actions'
import MediaPicker from '@/components/admin/media/MediaPicker'
import { cloudinaryUrl } from '@/lib/utils/cloudinary-url'
import type { MediaAsset } from '@/generated/prisma/client'
import type { CanvasItem } from '@/lib/types/canvas'

type EditorItem = CanvasItem & { _tempId?: string }

type Props = {
  initialItems: CanvasItem[]
  projects: { id: string; title: string; slug: string }[]
}

const CANVAS_RATIO = 900 / 1440

export default function CanvasEditor({ initialItems, projects }: Props) {
  const [items, setItems] = useState<EditorItem[]>(initialItems)
  const [selected, setSelected] = useState<string | null>(null)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [projectPickerId, setProjectPickerId] = useState<string | null>(null)
  const [saving, startSave] = useTransition()
  const containerRef = useRef<HTMLDivElement>(null)

  const dragState = useRef<{
    id: string
    mode: 'move' | 'resize'
    startX: number
    startY: number
    origX: number
    origY: number
    origW: number
    origH: number
  } | null>(null)

  const getContainerSize = useCallback(() => {
    const el = containerRef.current
    if (!el) return { w: 1440, h: 900 }
    return { w: el.offsetWidth, h: el.offsetWidth * CANVAS_RATIO }
  }, [])

  function onPointerDown(e: React.PointerEvent, id: string, mode: 'move' | 'resize') {
    e.preventDefault()
    e.stopPropagation()
    setSelected(id)
    const item = items.find((i) => i.id === id)!
    const { w, h } = getContainerSize()
    dragState.current = {
      id,
      mode,
      startX: e.clientX,
      startY: e.clientY,
      origX: (item.xPercent / 100) * w,
      origY: (item.yPercent / 100) * h,
      origW: (item.widthPercent / 100) * w,
      origH: (item.heightPercent / 100) * h,
    }
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragState.current) return
    const { id, mode, startX, startY, origX, origY, origW, origH } = dragState.current
    const { w, h } = getContainerSize()
    const dx = e.clientX - startX
    const dy = e.clientY - startY

    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item
        if (mode === 'move') {
          return {
            ...item,
            xPercent: Math.max(0, Math.min(95, ((origX + dx) / w) * 100)),
            yPercent: Math.max(0, Math.min(95, ((origY + dy) / h) * 100)),
          }
        } else {
          const newW = Math.max(5, ((origW + dx) / w) * 100)
          const newH = Math.max(5, ((origH + dy) / h) * 100)
          return { ...item, widthPercent: newW, heightPercent: newH }
        }
      })
    )
  }

  function onPointerUp() {
    dragState.current = null
  }

  function addImage(asset: MediaAsset) {
    const newItem: EditorItem = {
      id: `new-${Date.now()}`,
      projectId: null,
      imageId: asset.id,
      xPercent: 20,
      yPercent: 20,
      widthPercent: 20,
      heightPercent: 15,
      rotation: 0,
      zIndex: items.length,
      image: {
        cloudinaryId: asset.cloudinaryId,
        width: asset.width,
        height: asset.height,
        altText: asset.altText,
      },
      project: null,
    }
    setItems((prev) => [...prev, newItem])
    setSelected(newItem.id)
  }

  function updateSelected(updates: Partial<EditorItem>) {
    setItems((prev) => prev.map((i) => (i.id === selected ? { ...i, ...updates } : i)))
  }

  function deleteSelected() {
    setItems((prev) => prev.filter((i) => i.id !== selected))
    setSelected(null)
  }

  function handleSave() {
    startSave(async () => {
      await saveCanvasLayout(
        items.map((item) => ({
          projectId: item.projectId,
          imageId: item.imageId,
          xPercent: item.xPercent,
          yPercent: item.yPercent,
          widthPercent: item.widthPercent,
          heightPercent: item.heightPercent,
          rotation: item.rotation,
          zIndex: item.zIndex,
        }))
      )
    })
  }

  const sel = items.find((i) => i.id === selected)

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-[var(--color-border)] bg-white flex-shrink-0">
        <button
          onClick={() => setPickerOpen(true)}
          className="px-3 py-1.5 text-xs uppercase tracking-widest border border-[var(--color-border)] hover:border-[var(--color-ink)] transition-colors"
        >
          Add Image
        </button>

        {sel && (
          <>
            <div className="h-4 w-px bg-[var(--color-border)]" />
            <div className="flex items-center gap-2 text-xs">
              <label className="text-[var(--color-ink-muted)]">Rotation</label>
              <input
                type="range"
                min={-30}
                max={30}
                step={0.5}
                value={sel.rotation}
                onChange={(e) => updateSelected({ rotation: Number(e.target.value) })}
                className="w-24"
              />
              <span className="w-12 text-[var(--color-ink-muted)]">{sel.rotation.toFixed(1)}°</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => updateSelected({ zIndex: sel.zIndex - 1 })}
                className="px-2 py-1 text-xs border border-[var(--color-border)] hover:border-[var(--color-ink)] transition-colors"
                title="Send backward"
              >
                ↓z
              </button>
              <button
                onClick={() => updateSelected({ zIndex: sel.zIndex + 1 })}
                className="px-2 py-1 text-xs border border-[var(--color-border)] hover:border-[var(--color-ink)] transition-colors"
                title="Bring forward"
              >
                ↑z
              </button>
            </div>
            <button
              onClick={() => setProjectPickerId(sel.id)}
              className="px-3 py-1 text-xs border border-[var(--color-border)] hover:border-[var(--color-ink)] transition-colors"
            >
              {sel.project ? `→ ${sel.project.title}` : 'Link Project'}
            </button>
            <button onClick={deleteSelected} className="px-3 py-1 text-xs border border-[var(--color-accent)]/30 text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors">
              Remove
            </button>
          </>
        )}

        <div className="ml-auto flex items-center gap-3">
          <a href="/" target="_blank" className="text-xs text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors">
            Preview ↗
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-1.5 bg-[var(--color-ink)] text-[var(--color-paper)] text-xs uppercase tracking-widest hover:opacity-80 transition-opacity disabled:opacity-40"
          >
            {saving ? 'Saving…' : 'Save Layout'}
          </button>
        </div>
      </div>

      {/* Canvas area */}
      <div className="flex-1 overflow-auto bg-[var(--color-admin-bg)] p-8">
        <div
          ref={containerRef}
          className="relative mx-auto bg-white shadow-sm"
          style={{
            width: '100%',
            maxWidth: '1440px',
            paddingBottom: `${CANVAS_RATIO * 100}%`,
          }}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onClick={() => setSelected(null)}
        >
          <div className="absolute inset-0">
            {items
              .slice()
              .sort((a, b) => a.zIndex - b.zIndex)
              .map((item) => {
                const isSelected = item.id === selected
                return (
                  <div
                    key={item.id}
                    className={`absolute group ${isSelected ? 'ring-2 ring-[var(--color-ink)]' : ''}`}
                    style={{
                      left: `${item.xPercent}%`,
                      top: `${item.yPercent}%`,
                      width: `${item.widthPercent}%`,
                      height: `${item.heightPercent}%`,
                      transform: `rotate(${item.rotation}deg)`,
                      zIndex: item.zIndex,
                      cursor: 'move',
                    }}
                    onClick={(e) => { e.stopPropagation(); setSelected(item.id) }}
                    onPointerDown={(e) => onPointerDown(e, item.id, 'move')}
                  >
                    <Image
                      src={cloudinaryUrl(item.image.cloudinaryId, { width: 800, crop: 'fill' })}
                      alt={item.image.altText ?? ''}
                      fill
                      className="object-cover pointer-events-none select-none"
                      sizes="(max-width: 1440px) 30vw"
                      draggable={false}
                    />

                    {/* Resize handle */}
                    <div
                      className="absolute bottom-0 right-0 w-4 h-4 bg-[var(--color-ink)] opacity-0 group-hover:opacity-100 cursor-se-resize transition-opacity"
                      onPointerDown={(e) => { e.stopPropagation(); onPointerDown(e, item.id, 'resize') }}
                    />

                    {/* Project badge */}
                    {item.project && (
                      <div className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        {item.project.title}
                      </div>
                    )}
                  </div>
                )
              })}

            {items.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-sm text-[var(--color-ink-faint)]">
                Add images to build your canvas
              </div>
            )}
          </div>
        </div>
      </div>

      {pickerOpen && (
        <MediaPicker
          onSelect={(asset) => { addImage(asset); setPickerOpen(false) }}
          onClose={() => setPickerOpen(false)}
        />
      )}

      {projectPickerId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setProjectPickerId(null)}>
          <div className="bg-white w-80 p-5 rounded shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-sm font-medium mb-4">Link to Project</h3>
            <div className="space-y-1 max-h-64 overflow-y-auto">
              <button
                onClick={() => { updateSelected({ projectId: null, project: null }); setProjectPickerId(null) }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-[var(--color-admin-bg)] transition-colors text-[var(--color-ink-muted)]"
              >
                — No project
              </button>
              {projects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { updateSelected({ projectId: p.id, project: p }); setProjectPickerId(null) }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-[var(--color-admin-bg)] transition-colors"
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
