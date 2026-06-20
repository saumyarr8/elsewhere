'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { updateProject, publishProject, unpublishProject } from '@/actions/project.actions'
import MediaPicker from '@/components/admin/media/MediaPicker'
import type { Project, MediaAsset } from '@prisma/client'
import Template2Layout, { Template2Data } from '@/components/templates/Template2Layout'

type FullProject = Project & { heroImage: MediaAsset | null; ogImage: MediaAsset | null }

const inputCls = 'w-full border-b border-gray-200 py-1.5 text-sm bg-transparent focus:outline-none focus:border-black transition-colors placeholder:text-gray-300'
const textareaCls = `${inputCls} resize-none border border-gray-200 p-2 rounded h-24 border-b`

type SectionDef = {
  label: string
  desc: string
  images: { key: keyof Template2Data; label: string; dims: string }[]
  fields: { key: keyof Template2Data; label: string; rows?: number; isQuote?: boolean }[]
}

const SECTIONS: SectionDef[] = [
  {
    label: 'Section 01',
    desc: 'Image left, text right',
    images: [{ key: 'sec1Image', label: 'Image — left (579×475)', dims: '579 × 475' }],
    fields: [
      { key: 'sec1Headline', label: 'Headline', rows: 2 },
      { key: 'sec1Quote',    label: 'Quote',    rows: 3, isQuote: true },
      { key: 'sec1Body1',    label: 'Body — left column',  rows: 4 },
      { key: 'sec1Body2',    label: 'Body — right column', rows: 4 },
      { key: 'sec1Body3',    label: 'Body — footer line',  rows: 2 },
      { key: 'sec1Quote2',   label: 'Quote 2', rows: 3, isQuote: true },
    ],
  },
  {
    label: 'Section 02',
    desc: 'Image right, text left',
    images: [
      { key: 'sec2Image1', label: 'Image 1', dims: '' },
      { key: 'sec2Image2', label: 'Image 2', dims: '' },
      { key: 'sec2Image3', label: 'Image 3', dims: '' },
      { key: 'sec2Image4', label: 'Image 4', dims: '' }
    ],
    fields: [
      { key: 'sec2Headline', label: 'Headline', rows: 2 },
      { key: 'sec2Body1',    label: 'Body — left column',  rows: 4 },
      { key: 'sec2Body2',    label: 'Body — right column', rows: 4 },
      { key: 'sec2Body3',    label: 'Body — before quote', rows: 2 },
      { key: 'sec2Quote',    label: 'Quote',    rows: 4, isQuote: true },
      { key: 'sec2Body4',    label: 'Body — after quote',  rows: 3 },
    ],
  },
  {
    label: 'Section 03',
    desc: 'Wide image, text right',
    images: [{ key: 'sec3Image', label: 'Image — wide (1062×575)', dims: '1062 × 575' }],
    fields: [
      { key: 'sec3Headline', label: 'Headline', rows: 2 },
      { key: 'sec3Body1',    label: 'Body 1', rows: 4 },
      { key: 'sec3Body2',    label: 'Body 2', rows: 4 },
      { key: 'sec3Body3',    label: 'Body 3', rows: 4 },
      { key: 'sec3Quote',    label: 'Quote', rows: 4, isQuote: true },
    ],
  },
  {
    label: 'Section 04',
    desc: 'Image left, quotes',
    images: [{ key: 'sec4Image', label: 'Image — left (575×620)', dims: '575 × 620' }],
    fields: [
      { key: 'sec4Headline', label: 'Headline', rows: 2 },
      { key: 'sec4Quote',    label: 'Quote 1', rows: 3, isQuote: true },
      { key: 'sec4Body1',    label: 'Body 1',  rows: 4 },
      { key: 'sec4Body2',    label: 'Body 2', rows: 4 },
      { key: 'sec4Body3',    label: 'Body 3', rows: 4 },
      { key: 'sec4Body4',    label: 'Body 4', rows: 4 },
    ],
  },
  {
    label: 'Section 05',
    desc: 'Large image right, text left',
    images: [
      { key: 'sec5Image', label: 'Image — large right (748×554)', dims: '748 × 554' },
      { key: 'sec5Image2', label: 'Image 2', dims: '' }
    ],
    fields: [
      { key: 'sec5Headline', label: 'Headline', rows: 2 },
      { key: 'sec5Body1',    label: 'Body — intro', rows: 2 },
      { key: 'sec5Quote',    label: 'Quote', rows: 4, isQuote: true },
      { key: 'sec5Body2',    label: 'Body — left column',  rows: 4 },
      { key: 'sec5Body3',    label: 'Body — right column', rows: 4 },
    ],
  },
  {
    label: 'Section 06',
    desc: 'Image left, text right',
    images: [
      { key: 'sec6Image', label: 'Image 1', dims: '' },
      { key: 'sec6Image2', label: 'Image 2', dims: '' }
    ],
    fields: [
      { key: 'sec6Headline', label: 'Headline', rows: 2 },
      { key: 'sec6Body1',    label: 'Body 1', rows: 2 },
      { key: 'sec6Body2',    label: 'Body 2', rows: 2 },
    ],
  },
  {
    label: 'Section 07',
    desc: 'Columns + conclusion',
    images: [{ key: 'sec7Image', label: 'Image', dims: '' }],
    fields: [
      { key: 'sec7Headline', label: 'Headline', rows: 2 },
      { key: 'sec7Body1',   label: 'Body 1',  rows: 4 },
      { key: 'sec7Body2',   label: 'Body 2', rows: 4 },
    ],
  },
  {
    label: 'Section 08',
    desc: 'Image left, text right',
    images: [{ key: 'sec8Image', label: 'Image', dims: '' }],
    fields: [
      { key: 'sec8Headline', label: 'Headline', rows: 2 },
      { key: 'sec8Body1',   label: 'Body 1',  rows: 4 },
      { key: 'sec8Body2',   label: 'Body 2', rows: 4 },
      { key: 'sec8Body3',   label: 'Body 3',  rows: 4 },
      { key: 'sec8Body4',   label: 'Body 4', rows: 4 },
    ],
  },
]

function SectionAccordion({
  sec, isOpen, data, onToggle, onImagePick, onFieldChange,
}: {
  sec: SectionDef
  isOpen: boolean
  data: Partial<Template2Data>
  onToggle: () => void
  onImagePick: (key: keyof Template2Data) => void
  onFieldChange: (key: keyof Template2Data, value: string) => void
}) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const filled = sec.images.filter(i => data[i.key]).length
    + sec.fields.filter(f => data[f.key]).length
  const total = sec.images.length + sec.fields.length

  return (
    <div className="border-b border-gray-100">
      <button
        className="w-full flex items-center justify-between py-3 text-left group"
        onClick={onToggle}
      >
        <div className="min-w-0">
          <span className="text-xs font-medium uppercase tracking-widest text-black">{sec.label}</span>
          <span className="ml-2 text-[10px] text-gray-400 truncate">{sec.desc}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          <span className="text-[10px] text-gray-400">{filled}/{total}</span>
          <span className="text-gray-400 text-xs">{isOpen ? '▲' : '▼'}</span>
        </div>
      </button>

      {isOpen && (
        <div className="pb-4 space-y-4">
          {sec.images.map(img => {
            const id = data[img.key] as string | undefined
            const url = id && cloudName ? `https://res.cloudinary.com/${cloudName}/image/upload/w_240,q_auto,f_auto/${id}` : ''
            return (
              <div key={String(img.key)} className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-gray-400">{img.label}</label>
                <button
                  onClick={() => onImagePick(img.key)}
                  className="w-full relative group overflow-hidden border border-dashed border-gray-200 hover:border-gray-400 transition-colors bg-gray-50"
                  style={{ aspectRatio: '16/9' }}
                >
                  {url ? (
                    <>
                      <img src={url} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs transition-opacity">
                        Change Image
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-1">
                      <span className="text-lg">+</span>
                      <span className="text-[10px]">Add image</span>
                    </div>
                  )}
                </button>
              </div>
            )
          })}

          {sec.fields.map(f => (
            <div key={String(f.key)} className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest text-gray-400">
                {f.isQuote ? '❝ ' : ''}{f.label}
              </label>
              <textarea
                value={(data[f.key] as string) ?? ''}
                onChange={e => onFieldChange(f.key, e.target.value)}
                className={textareaCls}
                rows={f.rows ?? 3}
                placeholder={f.isQuote ? 'Quote text...' : 'Body text...'}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function initialVisibleCount(d: Partial<Template2Data>): number {
  for (let i = SECTIONS.length - 1; i >= 0; i--) {
    const sec = SECTIONS[i]
    const hasData = sec.images.some(img => d[img.key]) || sec.fields.some(f => d[f.key])
    if (hasData) return i + 1
  }
  return 0
}

export default function Template2Editor({ project }: { project: FullProject }) {
  const [title, setTitle] = useState(project.title)
  const [slug, setSlug] = useState(project.slug)
  const [data, setData] = useState<Partial<Template2Data>>(() =>
    typeof project.templateData === 'string'
      ? JSON.parse(project.templateData)
      : (project.templateData as Partial<Template2Data>) ?? {}
  )

  const [visibleCount, setVisibleCount] = useState(() => initialVisibleCount(
    typeof project.templateData === 'string'
      ? JSON.parse(project.templateData)
      : (project.templateData as Partial<Template2Data>) ?? {}
  ))
  const [openSection, setOpenSection] = useState<string | null>('meta')
  const [pickerTarget, setPickerTarget] = useState<keyof Template2Data | null>(null)
  const [saving, startSave] = useTransition()
  const [publishing, startPublish] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

  function setField<K extends keyof Template2Data>(key: K, value: Template2Data[K]) {
    setData(d => ({ ...d, [key]: value }))
  }

  function handleSave() {
    startSave(async () => {
      const res = await updateProject(project.id, { title, slug, templateData: data })
      if (res?.error) setError(res.error)
      else { setError(null); setSaved(true); setTimeout(() => setSaved(false), 2000) }
    })
  }

  function handlePublishToggle() {
    startPublish(async () => {
      if (project.published) await unpublishProject(project.id)
      else await publishProject(project.id)
    })
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white">

      {/* ─── LEFT PANEL ───────────────────────────────────────────────────────── */}
      <aside className="w-80 flex-shrink-0 border-r border-gray-100 overflow-y-auto flex flex-col">

        {/* Top bar */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 z-10">
          <div className="flex items-center gap-3 mb-3">
            <Link href="/admin/projects" className="text-xs text-gray-400 hover:text-black transition-colors">
              ← Projects
            </Link>
            <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full ${
              project.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
            }`}>
              {project.published ? 'Published' : 'Draft'}
            </span>
          </div>

          {error && <p className="text-[11px] text-red-600 bg-red-50 px-2 py-1 rounded mb-2">{error}</p>}
          {saved && <p className="text-[11px] text-green-600 bg-green-50 px-2 py-1 rounded mb-2">Saved ✓</p>}

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-2 bg-black text-white text-[10px] uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-40"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button
              onClick={handlePublishToggle}
              disabled={publishing}
              className={`flex-1 py-2 text-[10px] uppercase tracking-widest border transition-colors disabled:opacity-40 ${
                project.published
                  ? 'border-gray-300 text-gray-600 hover:border-black hover:text-black'
                  : 'border-green-500 text-green-600 hover:bg-green-50'
              }`}
            >
              {publishing ? '…' : project.published ? 'Unpublish' : 'Publish'}
            </button>
          </div>
          {project.published && (
            <Link
              href={`/${project.slug}`}
              target="_blank"
              className="mt-2 block text-center text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
            >
              View live ↗
            </Link>
          )}
        </div>

        {/* Form body */}
        <div className="flex-1 px-5 py-4 overflow-y-auto">

          {/* ── Project metadata ── */}
          <div className="border-b border-gray-100">
            <button
              className="w-full flex items-center justify-between py-3 text-left"
              onClick={() => setOpenSection(openSection === 'meta' ? null : 'meta')}
            >
              <span className="text-xs font-medium uppercase tracking-widest text-black">Project Info</span>
              <span className="text-gray-400 text-xs">{openSection === 'meta' ? '▲' : '▼'}</span>
            </button>

            {openSection === 'meta' && (
              <div className="pb-4 space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400">Project Title (internal)</label>
                  <input value={title} onChange={e => setTitle(e.target.value)} className={inputCls} placeholder="My Project" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400">URL Slug</label>
                  <input value={slug} onChange={e => setSlug(e.target.value)} className={`${inputCls} font-mono text-xs`} placeholder="my-project" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400">Title — light part</label>
                  <input value={data.titleLight ?? ''} onChange={e => setField('titleLight', e.target.value)} className={inputCls} placeholder="The Culture in " />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400">Title — bold part</label>
                  <input value={data.titleBold ?? ''} onChange={e => setField('titleBold', e.target.value)} className={inputCls} placeholder="a Blade of Grass" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400">Location</label>
                  <input value={data.location ?? ''} onChange={e => setField('location', e.target.value)} className={inputCls} placeholder="Nilgiri Plateau, Tamil Nadu" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400">GPS Coordinates</label>
                  <input value={data.coordinates ?? ''} onChange={e => setField('coordinates', e.target.value)} className={inputCls} placeholder="11.4064 * N, 76.6932 * E" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400">Camera</label>
                  <input value={data.camera ?? ''} onChange={e => setField('camera', e.target.value)} className={inputCls} placeholder="Camera model" />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400">Hero Image (1352×671)</label>
                  <button
                    onClick={() => setPickerTarget('heroImage')}
                    className="w-full relative group overflow-hidden border border-dashed border-gray-200 hover:border-gray-400 transition-colors bg-gray-50"
                    style={{ aspectRatio: '2/1' }}
                  >
                    {data.heroImage ? (
                      <>
                        <img src={`https://res.cloudinary.com/${cloudName}/image/upload/w_280,q_auto,f_auto/${data.heroImage}`} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs transition-opacity">Change Image</div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-1">
                        <span className="text-lg">+</span>
                        <span className="text-[10px]">Add hero image</span>
                      </div>
                    )}
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400">Next Project — Link text</label>
                  <input value={data.nextProjectTitle ?? ''} onChange={e => setField('nextProjectTitle', e.target.value)} className={inputCls} placeholder="Next project title" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400">Next Project — Slug</label>
                  <input value={data.nextProjectSlug ?? ''} onChange={e => setField('nextProjectSlug', e.target.value)} className={`${inputCls} font-mono text-xs`} placeholder="next-project-slug" />
                </div>
              </div>
            )}
          </div>

          {/* ── Content sections ── */}
          {SECTIONS.slice(0, visibleCount).map((sec, si) => (
            <SectionAccordion
              key={si}
              sec={sec}
              isOpen={openSection === `section-${si}`}
              data={data}
              onToggle={() => setOpenSection(openSection === `section-${si}` ? null : `section-${si}`)}
              onImagePick={key => setPickerTarget(key)}
              onFieldChange={(key, value) => setField(key, value as Template2Data[typeof key])}
            />
          ))}

          {/* Add Section button */}
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
                {visibleCount < SECTIONS.length && (
                  <span className="ml-2 text-gray-400 normal-case tracking-normal">
                    — {SECTIONS[visibleCount].desc}
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ─── RIGHT PANEL: Live Preview ────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="bg-white shadow-xl min-h-screen">
          <Template2Layout
            data={data}
            isEditing
            onImageSelect={key => setPickerTarget(key as keyof Template2Data)}
          />
        </div>
      </main>

      {/* ─── Media Picker ─────────────────────────────────────────────────────── */}
      {pickerTarget && (
        <MediaPicker
          onSelect={asset => {
            setField(pickerTarget, asset.cloudinaryId as Template2Data[typeof pickerTarget])
            setPickerTarget(null)
          }}
          onClose={() => setPickerTarget(null)}
        />
      )}
    </div>
  )
}
