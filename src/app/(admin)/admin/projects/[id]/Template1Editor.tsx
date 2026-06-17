'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { updateProject, publishProject, unpublishProject } from '@/actions/project.actions'
import MediaPicker from '@/components/admin/media/MediaPicker'
import type { Project, MediaAsset } from '@/generated/prisma/client'
import Template1Layout, { Template1Data, T1Section, hasContent } from '@/components/templates/Template1Layout'

type FullProject = Project & { heroImage: MediaAsset | null; ogImage: MediaAsset | null }

// ─── Pattern metadata (cycles every 11) ──────────────────────────────────────

const PATTERNS: {
  desc: string
  images: { field: 'image1' | 'image2' | 'image3'; label: string }[]
  texts: { field: keyof T1Section; label: string; multiline: boolean }[]
}[] = [
  {
    desc: 'Large landscape + 2-column text',
    images: [{ field: 'image1', label: 'Main image (691×520)' }],
    texts: [
      { field: 'caption1', label: 'Image caption / subject name', multiline: false },
      { field: 'headline', label: 'Headline (bold, uppercase)', multiline: false },
      { field: 'body1', label: 'Body text — left column', multiline: true },
      { field: 'body2', label: 'Body text — right column', multiline: true },
    ],
  },
  {
    desc: 'Landscape strip + small portrait + text',
    images: [
      { field: 'image1', label: 'Landscape strip (469×311)' },
      { field: 'image2', label: 'Small portrait (193×354)' },
    ],
    texts: [
      { field: 'caption1', label: 'Caption — landscape', multiline: false },
      { field: 'caption2', label: 'Caption — portrait', multiline: false },
      { field: 'headline', label: 'Headline', multiline: false },
      { field: 'body1', label: 'Body text', multiline: true },
    ],
  },
  {
    desc: 'Tall portrait + small portrait + large landscape',
    images: [
      { field: 'image1', label: 'Tall portrait — left (494×575)' },
      { field: 'image2', label: 'Small portrait — right (193×354)' },
      { field: 'image3', label: 'Large landscape — lower right (684×520)' },
    ],
    texts: [
      { field: 'caption1', label: 'Caption — tall portrait', multiline: false },
      { field: 'caption2', label: 'Caption — small portrait', multiline: false },
      { field: 'caption3', label: 'Caption — large landscape', multiline: false },
      { field: 'headline', label: 'Headline', multiline: false },
      { field: 'body1', label: 'Body text — left column', multiline: true },
      { field: 'body2', label: 'Body text — right column', multiline: true },
    ],
  },
  {
    desc: 'Portrait + headline + 2-column body',
    images: [{ field: 'image1', label: 'Portrait — left (499×554)' }],
    texts: [
      { field: 'caption1', label: 'Image caption', multiline: false },
      { field: 'headline', label: 'Headline', multiline: false },
      { field: 'body1', label: 'Body text — left column', multiline: true },
      { field: 'body2', label: 'Body text — right column', multiline: true },
    ],
  },
  {
    desc: 'Tall portrait + small portrait + side text',
    images: [
      { field: 'image1', label: 'Tall portrait — left (478×575)' },
      { field: 'image2', label: 'Small portrait — right (193×354)' },
    ],
    texts: [
      { field: 'caption1', label: 'Caption — tall portrait', multiline: false },
      { field: 'caption2', label: 'Caption — small portrait', multiline: false },
      { field: 'body1', label: 'Body text (far right)', multiline: true },
    ],
  },
  {
    desc: 'Large landscape right + headline + 2-column body left',
    images: [{ field: 'image1', label: 'Large landscape — right (694×589)' }],
    texts: [
      { field: 'caption1', label: 'Image caption', multiline: false },
      { field: 'headline', label: 'Headline', multiline: false },
      { field: 'body1', label: 'Body text — left column', multiline: true },
      { field: 'body2', label: 'Body text — right column', multiline: true },
    ],
  },
  {
    desc: '2 landscape strips + tall portrait + text',
    images: [
      { field: 'image1', label: 'Top landscape strip — left (469×334)' },
      { field: 'image2', label: 'Tall portrait — far right (293×456)' },
      { field: 'image3', label: 'Bottom landscape strip — left (469×178)' },
    ],
    texts: [
      { field: 'caption1', label: 'Caption — top strip', multiline: false },
      { field: 'caption2', label: 'Caption — tall portrait', multiline: false },
      { field: 'caption3', label: 'Caption — bottom strip', multiline: false },
      { field: 'headline', label: 'Headline', multiline: false },
      { field: 'body1', label: 'Body text — top', multiline: true },
      { field: 'body2', label: 'Body text — bottom', multiline: true },
    ],
  },
  {
    desc: 'Small portrait right + headline + 3 body blocks',
    images: [{ field: 'image1', label: 'Small portrait — far right (293×262)' }],
    texts: [
      { field: 'caption1', label: 'Image caption', multiline: false },
      { field: 'headline', label: 'Headline', multiline: false },
      { field: 'body1', label: 'Body text — left column', multiline: true },
      { field: 'body2', label: 'Body text — right column', multiline: true },
      { field: 'body3', label: 'Body text — full width below', multiline: true },
    ],
  },
  {
    desc: 'Large landscape + text panel (headline + 3 blocks)',
    images: [{ field: 'image1', label: 'Large landscape — left (688×589)' }],
    texts: [
      { field: 'caption1', label: 'Image caption', multiline: false },
      { field: 'headline', label: 'Headline', multiline: false },
      { field: 'body1', label: 'Body text — left column', multiline: true },
      { field: 'body2', label: 'Body text — right column', multiline: true },
      { field: 'body3', label: 'Body text — below', multiline: true },
    ],
  },
  {
    desc: 'Portrait + text panel (headline + 3 blocks)',
    images: [{ field: 'image1', label: 'Portrait — left (484×575)' }],
    texts: [
      { field: 'caption1', label: 'Image caption', multiline: false },
      { field: 'headline', label: 'Headline', multiline: false },
      { field: 'body1', label: 'Body text — left column', multiline: true },
      { field: 'body2', label: 'Body text — right column', multiline: true },
      { field: 'body3', label: 'Body text — below', multiline: true },
    ],
  },
  {
    desc: 'Narrow portrait + headline + 2-column text',
    images: [{ field: 'image1', label: 'Narrow portrait — center (227×487)' }],
    texts: [
      { field: 'caption1', label: 'Image caption', multiline: false },
      { field: 'headline', label: 'Headline', multiline: false },
      { field: 'body1', label: 'Body text — left column', multiline: true },
      { field: 'body2', label: 'Body text — right column', multiline: true },
      { field: 'body3', label: 'Body text — below', multiline: true },
    ],
  },
]

// Normalize legacy s01-s11 data into sections array
function normalizeData(raw: Record<string, unknown>): Partial<Template1Data> {
  if (raw.sections) return raw as Partial<Template1Data>
  const legacy = ['s01','s02','s03','s04','s05','s06','s07','s08','s09','s10','s11']
  const sections = legacy
    .map(k => raw[k] as T1Section | undefined)
    .filter((s): s is T1Section => !!s && hasContent(s))
  const { s01, s02, s03, s04, s05, s06, s07, s08, s09, s10, s11, ...rest } = raw as Record<string, unknown>
  void s01; void s02; void s03; void s04; void s05; void s06
  void s07; void s08; void s09; void s10; void s11
  return { ...(rest as Partial<Template1Data>), sections }
}

// ─── SectionAccordion (top-level to keep stable identity across renders) ─────

const inputCls = 'w-full border-b border-gray-200 py-1.5 text-sm bg-transparent focus:outline-none focus:border-black transition-colors placeholder:text-gray-300'
const textareaCls = `${inputCls} resize-none border border-gray-200 p-2 rounded h-24 border-b`

function SectionAccordion({
  index, isOpen, sData, onToggle, onImagePick, onFieldChange, onRemove,
}: {
  index: number
  isOpen: boolean
  sData: Partial<T1Section>
  onToggle: () => void
  onImagePick: (field: string) => void
  onFieldChange: (field: string, value: string) => void
  onRemove: () => void
}) {
  const pat = PATTERNS[index % 11]
  const filled = pat.images.filter(i => sData[i.field]).length
    + pat.texts.filter(t => sData[t.field as keyof T1Section]).length
  const total = pat.images.length + pat.texts.length
  const num = String(index + 1).padStart(2, '0')
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

  return (
    <div className="border-b border-gray-100">
      <button
        className="w-full flex items-center justify-between py-3 text-left group"
        onClick={onToggle}
      >
        <div className="min-w-0">
          <span className="text-xs font-medium uppercase tracking-widest text-black">Section {num}</span>
          <span className="ml-2 text-[10px] text-gray-400 truncate">{pat.desc}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          <span className="text-[10px] text-gray-400">{filled}/{total}</span>
          <span className="text-gray-400 text-xs">{isOpen ? '▲' : '▼'}</span>
        </div>
      </button>

      {isOpen && (
        <div className="pb-4 space-y-4">
          {pat.images.map(img => {
            const id = sData[img.field]
            const url = id && cloudName ? `https://res.cloudinary.com/${cloudName}/image/upload/w_240,q_auto,f_auto/${id}` : ''
            return (
              <div key={img.field} className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-gray-400">{img.label}</label>
                <button
                  onClick={() => onImagePick(img.field)}
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

          {pat.texts.map(txt => (
            <div key={txt.field} className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest text-gray-400">{txt.label}</label>
              {txt.multiline ? (
                <textarea
                  value={(sData[txt.field as keyof T1Section] as string) || ''}
                  onChange={e => onFieldChange(txt.field, e.target.value)}
                  className={textareaCls}
                  rows={4}
                />
              ) : (
                <input
                  type="text"
                  value={(sData[txt.field as keyof T1Section] as string) || ''}
                  onChange={e => onFieldChange(txt.field, e.target.value)}
                  className={inputCls}
                />
              )}
            </div>
          ))}

          <button
            onClick={onRemove}
            className="text-[10px] text-red-400 hover:text-red-600 uppercase tracking-widest transition-colors"
          >
            Remove section
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Template1Editor({ project }: { project: FullProject }) {
  const [title, setTitle] = useState(project.title)
  const [slug, setSlug] = useState(project.slug)
  const [templateData, setTemplateData] = useState<Partial<Template1Data>>(() => {
    const raw = project.templateData
      ? (typeof project.templateData === 'string'
          ? JSON.parse(project.templateData)
          : (project.templateData as Record<string, unknown>))
      : {}
    return normalizeData(raw)
  })

  const [openSection, setOpenSection] = useState<string | null>('meta')
  const [pickerTarget, setPickerTarget] = useState<string | null>(null)
  const [saving, startSave] = useTransition()
  const [publishing, startPublish] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  const sections = templateData.sections ?? []

  function setSection(index: number, field: string, value: string) {
    setTemplateData(prev => {
      const secs = [...(prev.sections ?? [])]
      secs[index] = { ...(secs[index] ?? {}), [field]: value }
      return { ...prev, sections: secs }
    })
  }

  function addSection() {
    setTemplateData(prev => ({
      ...prev,
      sections: [...(prev.sections ?? []), {}],
    }))
    setOpenSection(`section-${sections.length}`)
  }

  function removeSection(index: number) {
    setTemplateData(prev => {
      const secs = [...(prev.sections ?? [])]
      secs.splice(index, 1)
      return { ...prev, sections: secs }
    })
    setOpenSection(null)
  }

  function setMeta(field: keyof Template1Data, value: string) {
    setTemplateData(prev => ({ ...prev, [field]: value }))
  }

  function handleSave() {
    startSave(async () => {
      const res = await updateProject(project.id, { title, slug, templateData })
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

  function openPicker(sectionKey: string, field: string) {
    setPickerTarget(`${sectionKey}.${field}`)
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
                  <label className="text-[10px] uppercase tracking-widest text-gray-400">Title</label>
                  <input value={(templateData.titleBold as string) || ''} onChange={e => setMeta('titleBold', e.target.value)} className={inputCls} placeholder="Neeruganti, Keepers of Tanks" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400">Location</label>
                  <input value={(templateData.location as string) || ''} onChange={e => setMeta('location', e.target.value)} className={inputCls} placeholder="Village, State" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400">GPS Coordinates</label>
                  <input value={(templateData.coordinates as string) || ''} onChange={e => setMeta('coordinates', e.target.value)} className={inputCls} placeholder="12.97°N, 77.59°E" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400">Camera</label>
                  <input value={(templateData.camera as string) || ''} onChange={e => setMeta('camera', e.target.value)} className={inputCls} placeholder="iPhone 17 Pro Max" />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400">Hero Image (1352×671)</label>
                  <button
                    onClick={() => openPicker('hero', 'heroImage')}
                    className="w-full relative group overflow-hidden border border-dashed border-gray-200 hover:border-gray-400 transition-colors bg-gray-50"
                    style={{ aspectRatio: '2/1' }}
                  >
                    {templateData.heroImage ? (
                      <>
                        <img src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_280,q_auto,f_auto/${templateData.heroImage}`} alt="" className="w-full h-full object-cover" />
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
                  <input value={(templateData.nextProjectTitle as string) || ''} onChange={e => setMeta('nextProjectTitle', e.target.value)} className={inputCls} placeholder="Next project title" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400">Next Project — Slug</label>
                  <input value={(templateData.nextProjectSlug as string) || ''} onChange={e => setMeta('nextProjectSlug', e.target.value)} className={`${inputCls} font-mono text-xs`} placeholder="next-project-slug" />
                </div>
              </div>
            )}
          </div>

          {/* ── Content sections ── */}
          {sections.map((_, i) => (
            <SectionAccordion
              key={i}
              index={i}
              isOpen={openSection === `section-${i}`}
              sData={sections[i] ?? {}}
              onToggle={() => setOpenSection(openSection === `section-${i}` ? null : `section-${i}`)}
              onImagePick={field => openPicker(String(i), field)}
              onFieldChange={(field, value) => setSection(i, field, value)}
              onRemove={() => removeSection(i)}
            />
          ))}

          {/* Add Section button */}
          <div className="pt-4 pb-6">
            <button
              onClick={addSection}
              className="w-full py-3 border border-dashed border-gray-300 text-[10px] uppercase tracking-widest text-gray-500 hover:border-black hover:text-black transition-colors"
            >
              + Add Section {String(sections.length + 1).padStart(2, '0')}
              {sections.length > 0 && (
                <span className="ml-2 text-gray-400 normal-case tracking-normal">
                  — {PATTERNS[sections.length % 11].desc}
                </span>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* ─── RIGHT PANEL: Live Preview ────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="bg-white shadow-xl min-h-screen">
          <Template1Layout
            data={templateData}
            isEditing
            onImageSelect={(sk, field) => openPicker(sk, field)}
          />
        </div>
      </main>

      {/* ─── Media Picker ─────────────────────────────────────────────────────── */}
      {pickerTarget && (
        <MediaPicker
          onSelect={asset => {
            if (!pickerTarget) return
            const [sk, field] = pickerTarget.split('.')
            if (sk === 'hero') {
              setMeta('heroImage', asset.cloudinaryId)
            } else {
              setSection(parseInt(sk, 10), field, asset.cloudinaryId)
            }
            setPickerTarget(null)
          }}
          onClose={() => setPickerTarget(null)}
        />
      )}
    </div>
  )
}
