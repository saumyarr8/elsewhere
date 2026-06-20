'use client'

import { useState, useTransition, useCallback } from 'react'
import Link from 'next/link'
import { updateProject, publishProject, unpublishProject } from '@/actions/project.actions'
import MediaPicker from '@/components/admin/media/MediaPicker'
import Template4Layout, { type Template4Data } from '@/components/templates/Template4Layout'
import type { Project, MediaAsset } from '@prisma/client'

type FullProject = Project & { heroImage: MediaAsset | null; ogImage: MediaAsset | null }

type SectionDef = {
  label: string
  desc: string
  images: { key: keyof Template4Data; label: string; w: number; h: number }[]
  fields: { key: keyof Template4Data; label: string; multiline?: boolean }[]
}

const SECTIONS: SectionDef[] = [
  {
    label: 'Section 01',
    desc: 'Landscape image with headline & quotes',
    images: [{ key: 'sec1Image', label: 'Image (648×416)', w: 648, h: 416 }],
    fields: [
      { key: 'sec1Headline', label: 'Headline' },
      { key: 'sec1Body1', label: 'Body 1', multiline: true },
      { key: 'sec1Quote', label: 'Quote 1', multiline: true },
      { key: 'sec1Body2', label: 'Body 2', multiline: true },
      { key: 'sec1Quote2', label: 'Quote 2', multiline: true },
      { key: 'sec1Body3', label: 'Body 3', multiline: true },
    ],
  },
  {
    label: 'Section 02',
    desc: 'Three images with body text',
    images: [
      { key: 'sec2Image', label: 'Main image (695×492)', w: 695, h: 492 },
      { key: 'sec2ImageC', label: 'Right portrait (193×354)', w: 193, h: 354 },
      { key: 'sec2ImageB', label: 'Lower left (487×575)', w: 487, h: 575 },
      { key: 'sec3ImageSmall', label: 'Lower right (193×354)', w: 193, h: 354 },
    ],
    fields: [
      { key: 'sec2Headline', label: 'Headline' },
      { key: 'sec2Body1', label: 'Body 1', multiline: true },
      { key: 'sec2Body2', label: 'Body 2', multiline: true },
      { key: 'sec2Body3', label: 'Body 3', multiline: true },
    ],
  },
  {
    label: 'Section 03',
    desc: 'Landscape with quote',
    images: [
      { key: 'sec3Image', label: 'Image (684×520)', w: 684, h: 520 },
      { key: 'sec3ImageB', label: 'Second Image (400×300)', w: 400, h: 300 }
    ],
    fields: [
      { key: 'sec3Headline', label: 'Headline' },
      { key: 'sec3Body1', label: 'Body 1', multiline: true },
      { key: 'sec3Body2', label: 'Body 2', multiline: true },
      { key: 'sec3Quote', label: 'Quote', multiline: true },
      { key: 'sec3Body3', label: 'Body 3', multiline: true },
      { key: 'sec3Body4', label: 'Body 4', multiline: true },
      { key: 'sec3Body5', label: 'Body 5', multiline: true },
      { key: 'sec3Body6', label: 'Body 6', multiline: true },
    ],
  },
  {
    label: 'Section 04',
    desc: 'Two portraits with quote',
    images: [
      { key: 'sec4ImageTall', label: 'Left tall (499×616)', w: 499, h: 616 },
      { key: 'sec4Image', label: 'Lower right (685×589)', w: 685, h: 589 },
    ],
    fields: [
      { key: 'sec4Headline', label: 'Headline' },
      { key: 'sec4Body1', label: 'Body 1', multiline: true },
      { key: 'sec4Body2', label: 'Body 2', multiline: true },
      { key: 'sec4Body3', label: 'Body 3', multiline: true },
      { key: 'sec4Quote', label: 'Quote', multiline: true },
      { key: 'sec4Body4', label: 'Body 4', multiline: true },
    ],
  },
  {
    label: 'Section 05',
    desc: 'Headline + landscape + body',
    images: [{ key: 'sec5Image', label: 'Image (469×334)', w: 469, h: 334 }],
    fields: [
      { key: 'sec5Headline', label: 'Headline' },
      { key: 'sec5Body1', label: 'Body 1', multiline: true },
      { key: 'sec5Body2', label: 'Body 2', multiline: true },
      { key: 'sec5Body3', label: 'Body 3', multiline: true },
    ],
  },
  {
    label: 'Section 06',
    desc: 'Portrait + strip image',
    images: [
      { key: 'sec6Image', label: 'Portrait (293×456)', w: 293, h: 456 },
      { key: 'sec6ImageB', label: 'Landscape strip (469×178)', w: 469, h: 178 },
    ],
    fields: [
      { key: 'sec6Headline', label: 'Headline' },
      { key: 'sec6Body1', label: 'Body 1', multiline: true },
    ],
  },
  {
    label: 'Section 07',
    desc: 'Small portrait + wide landscape',
    images: [
      { key: 'sec7Image', label: 'Small portrait (293×262)', w: 293, h: 262 },
      { key: 'sec7ImageWide', label: 'Wide landscape (688×589)', w: 688, h: 589 },
    ],
    fields: [
      { key: 'sec7Headline', label: 'Headline' },
      { key: 'sec7Body1', label: 'Body 1', multiline: true },
      { key: 'sec7Body2', label: 'Body 2', multiline: true },
      { key: 'sec7Body3', label: 'Body 3', multiline: true },
    ],
  },
  {
    label: 'Section 08',
    desc: 'Closing text',
    images: [],
    fields: [
      { key: 'sec8Headline', label: 'Headline' },
      { key: 'sec8Body1', label: 'Body 1', multiline: true },
      { key: 'sec8Body2', label: 'Body 2', multiline: true },
      { key: 'sec8Body3', label: 'Body 3', multiline: true },
      { key: 'sec8Body4', label: 'Body 4', multiline: true },
    ],
  },
]

function initialVisibleCount(d: Partial<Template4Data>): number {
  for (let i = SECTIONS.length - 1; i >= 0; i--) {
    const sec = SECTIONS[i]
    const hasData =
      sec.images.some(img => d[img.key]) ||
      sec.fields.some(f => d[f.key])
    if (hasData) return i + 1
  }
  return 0
}

function fillCount(sec: SectionDef, d: Partial<Template4Data>): [number, number] {
  const total = sec.images.length + sec.fields.length
  const filled = sec.images.filter(img => d[img.key]).length +
    sec.fields.filter(f => d[f.key]).length
  return [filled, total]
}

export default function Template4Editor({ project }: { project: FullProject }) {
  const raw = (project.templateData as Partial<Template4Data> | null) ?? {}
  const [data, setData] = useState<Partial<Template4Data>>(raw)
  const [title, setTitle] = useState(project.title ?? '')
  const [slug, setSlug] = useState(project.slug ?? '')
  const [openSection, setOpenSection] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(() => initialVisibleCount(raw))
  const [mediaKey, setMediaKey] = useState<keyof Template4Data | null>(null)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saving, startSave] = useTransition()
  const [publishing, startPublish] = useTransition()

  const set = useCallback((key: keyof Template4Data, val: string) => {
    setSaved(false)
    setData(d => ({ ...d, [key]: val }))
  }, [])

  const handleSave = () => {
    startSave(async () => {
      const res = await updateProject(project.id, { title, slug, templateData: data })
      if (res?.error) setError(res.error)
      else { setError(null); setSaved(true); setTimeout(() => setSaved(false), 2000) }
    })
  }

  const handlePublish = () => {
    startPublish(async () => {
      if (project.published) await unpublishProject(project.id)
      else await publishProject(project.id)
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ── TOP BAR */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100 px-6 py-3 flex items-center gap-4">
        <Link href="/admin/projects" className="text-[11px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
          ← Projects
        </Link>
        <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
          Template 4
        </span>
        <div className="flex-1" />
        {error && <span className="text-[11px] text-red-500 truncate max-w-xs">{error}</span>}
        {saved && !error && <span className="text-[11px] text-green-600">Saved</span>}
        <button
          onClick={handleSave}
          disabled={saving || publishing}
          className="px-4 py-1.5 text-[11px] uppercase tracking-widest bg-black text-white hover:bg-gray-800 disabled:opacity-40 transition-colors"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button
          onClick={handlePublish}
          disabled={saving || publishing}
          className={`px-4 py-1.5 text-[11px] uppercase tracking-widest border transition-colors disabled:opacity-40 ${
            project.published
              ? 'border-black bg-white text-black hover:bg-gray-50'
              : 'border-black bg-black text-white hover:bg-gray-800'
          }`}
        >
          {project.published ? 'Unpublish' : 'Publish'}
        </button>
        {project.published && slug && (
          <Link
            href={`/${slug}`}
            target="_blank"
            className="text-[11px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
          >
            View live ↗
          </Link>
        )}
      </div>

      <div className="flex">
        {/* ── LEFT PANEL */}
        <div className="w-80 flex-shrink-0 border-r border-gray-100 min-h-[calc(100vh-49px)] overflow-y-auto">
          <div className="p-6 space-y-6">

            {/* ── META */}
            <div className="border border-gray-100 rounded">
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-left"
                onClick={() => setOpenSection(s => s === 'meta' ? null : 'meta')}
              >
                <span className="text-[11px] uppercase tracking-widest font-medium">Project Info</span>
                <span className="text-gray-400 text-xs">{openSection === 'meta' ? '−' : '+'}</span>
              </button>
              {openSection === 'meta' && (
                <div className="px-4 pb-4 space-y-3 border-t border-gray-100">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Title</label>
                    <input
                      value={title}
                      onChange={e => { setSaved(false); setTitle(e.target.value) }}
                      className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-black"
                      placeholder="Project title"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Slug</label>
                    <input
                      value={slug}
                      onChange={e => { setSaved(false); setSlug(e.target.value) }}
                      className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-black"
                      placeholder="project-slug"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Canvas Title</label>
                    <input
                      value={data.titleBold ?? ''}
                      onChange={e => set('titleBold', e.target.value)}
                      className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-black"
                      placeholder="PROJECT TITLE"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Location</label>
                    <input
                      value={data.location ?? ''}
                      onChange={e => set('location', e.target.value)}
                      className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-black"
                      placeholder="City, Country"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Coordinates</label>
                    <input
                      value={data.coordinates ?? ''}
                      onChange={e => set('coordinates', e.target.value)}
                      className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-black"
                      placeholder="28.6139° N, 77.2088° E"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Camera</label>
                    <input
                      value={data.camera ?? ''}
                      onChange={e => set('camera', e.target.value)}
                      className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-black"
                      placeholder="Sony A7 IV"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Hero Image</label>
                    <button
                      onClick={() => setMediaKey('heroImage')}
                      className="w-full border border-dashed border-gray-300 py-2 text-[10px] uppercase tracking-widest text-gray-500 hover:border-black hover:text-black transition-colors"
                    >
                      {data.heroImage ? 'Change hero image' : '+ Hero image'}
                    </button>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Next Project</label>
                    <input
                      value={data.nextProjectTitle ?? ''}
                      onChange={e => set('nextProjectTitle', e.target.value)}
                      className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-black mb-2"
                      placeholder="Next project title"
                    />
                    <input
                      value={data.nextProjectSlug ?? ''}
                      onChange={e => set('nextProjectSlug', e.target.value)}
                      className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-black"
                      placeholder="next-project-slug"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* ── SECTIONS */}
            {SECTIONS.slice(0, visibleCount).map((sec, si) => {
              const isOpen = openSection === `section-${si}`
              const [filled, total] = fillCount(sec, data)
              return (
                <div key={si} className="border border-gray-100 rounded">
                  <button
                    className="w-full flex items-center justify-between px-4 py-3 text-left"
                    onClick={() => setOpenSection(s => s === `section-${si}` ? null : `section-${si}`)}
                  >
                    <div>
                      <span className="text-[11px] uppercase tracking-widest font-medium">{sec.label}</span>
                      <span className="ml-2 text-[10px] text-gray-400 normal-case tracking-normal">— {sec.desc}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400">{filled}/{total}</span>
                      <span className="text-gray-400 text-xs">{isOpen ? '−' : '+'}</span>
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 border-t border-gray-100 space-y-3 pt-3">
                      {sec.images.map(img => (
                        <div key={img.key}>
                          <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">{img.label}</label>
                          <button
                            onClick={() => setMediaKey(img.key)}
                            className="w-full border border-dashed border-gray-300 py-2 text-[10px] uppercase tracking-widest text-gray-500 hover:border-black hover:text-black transition-colors"
                          >
                            {data[img.key] ? 'Change image' : '+ Add image'}
                          </button>
                        </div>
                      ))}
                      {sec.fields.map(f => (
                        <div key={f.key}>
                          <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">{f.label}</label>
                          {f.multiline ? (
                            <textarea
                              rows={3}
                              value={(data[f.key] as string) ?? ''}
                              onChange={e => set(f.key, e.target.value)}
                              className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-black resize-none"
                              placeholder={f.label}
                            />
                          ) : (
                            <input
                              value={(data[f.key] as string) ?? ''}
                              onChange={e => set(f.key, e.target.value)}
                              className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-black"
                              placeholder={f.label}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}

            {/* ── ADD SECTION */}
            {visibleCount < SECTIONS.length && (
              <div className="pt-4 pb-6">
                <button
                  onClick={() => {
                    setOpenSection(`section-${visibleCount}`)
                    setVisibleCount(v => v + 1)
                  }}
                  className="w-full py-3 border border-dashed border-gray-300 text-[10px] uppercase tracking-widest text-gray-500 hover:border-black hover:text-black transition-colors"
                >
                  + Add Section {String(visibleCount + 1).padStart(2, '0')}
                  <span className="ml-2 text-gray-400 normal-case tracking-normal">
                    — {SECTIONS[visibleCount].desc}
                  </span>
                </button>
              </div>
            )}

          </div>
        </div>

        {/* ── CANVAS PREVIEW */}
        <div className="flex-1 bg-gray-50 overflow-auto p-6">
          <Template4Layout
            data={data}
            isEditing
            onImageSelect={key => setMediaKey(key as keyof Template4Data)}
          />
        </div>
      </div>

      {/* ── MEDIA PICKER */}
      {mediaKey && (
        <MediaPicker
          onSelect={asset => {
            set(mediaKey, asset.cloudinaryId)
            setMediaKey(null)
          }}
          onClose={() => setMediaKey(null)}
        />
      )}
    </div>
  )
}
