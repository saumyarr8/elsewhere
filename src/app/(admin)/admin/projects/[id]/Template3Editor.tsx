'use client'

import TemplateEditor from '@/components/admin/template-editor/TemplateEditor'
import Template3Layout from '@/components/templates/Template3Layout'
import type { Pattern } from '@/components/admin/template-editor/shared'
import type { Project, MediaAsset } from '@prisma/client'

type FullProject = Project & { heroImage: MediaAsset | null; ogImage: MediaAsset | null }

const PATTERNS: Pattern[] = [
  {
    desc: 'Image left, text right',
    images: [{ field: 'image1', label: 'Image — left (648×416)' }],
    texts: [
      { field: 'headline', label: 'Headline', multiline: false },
      { field: 'body1', label: 'Body — intro line', multiline: true },
      { field: 'quote', label: 'Quote 1', multiline: true },
      { field: 'body2', label: 'Body — between quotes', multiline: true },
      { field: 'quote2', label: 'Quote 2', multiline: true },
      { field: 'body3', label: 'Body — closing', multiline: true },
    ],
  },
  {
    desc: 'Images only (no text)',
    images: [
      { field: 'image1', label: 'Tall portrait (695×492)' },
      { field: 'image2', label: 'Smaller portrait (487×575)' },
      { field: 'image3', label: 'Small right (193×354)' },
    ],
    texts: [],
  },
  {
    desc: 'Landscape image, text left',
    images: [
      { field: 'image1', label: 'Small right (193×354)' },
      { field: 'image2', label: 'Landscape (684×520)' },
    ],
    texts: [
      { field: 'headline', label: 'Headline', multiline: false },
      { field: 'body1', label: 'Body 1', multiline: true },
      { field: 'body2', label: 'Body 2', multiline: true },
      { field: 'quote', label: 'Quote', multiline: true },
      { field: 'body3', label: 'Body 3 — closing', multiline: true },
    ],
  },
  {
    desc: 'Portraits, soil text',
    images: [
      { field: 'image1', label: 'Tall portrait left (499×616)' },
      { field: 'image2', label: 'Portrait right (685×589)' },
    ],
    texts: [
      { field: 'headline', label: 'Headline', multiline: false },
      { field: 'body1', label: 'Body 1 — left column', multiline: true },
      { field: 'body2', label: 'Body 2 — right column', multiline: true },
      { field: 'body3', label: 'Body 3', multiline: true },
      { field: 'quote', label: 'Quote', multiline: true },
    ],
  },
  {
    desc: 'Two headlines + image',
    images: [{ field: 'image1', label: 'Landscape (469×334)' }],
    texts: [
      { field: 'headline', label: 'Headline 1', multiline: false },
      { field: 'body1', label: 'Body 1 — right column', multiline: true },
      { field: 'headline2', label: 'Headline 2', multiline: false },
      { field: 'body2', label: 'Body 2 — right column', multiline: true },
      { field: 'body3', label: 'Body 3 — below image left', multiline: true },
      { field: 'body4', label: 'Body 4 — below image right', multiline: true },
    ],
  },
  {
    desc: 'Portrait + wide body',
    images: [
      { field: 'image1', label: 'Portrait right (293×456)' },
      { field: 'image2', label: 'Small strip (469×178)' },
    ],
    texts: [
      { field: 'headline', label: 'Headline', multiline: false },
      { field: 'body1', label: 'Body 1 — right column', multiline: true },
      { field: 'body2', label: 'Body 2 — wide', multiline: true },
    ],
  },
  {
    desc: 'Rains / climate text',
    images: [
      { field: 'image1', label: 'Small portrait (293×262)' },
      { field: 'image2', label: 'Large landscape (688×589)' },
    ],
    texts: [
      { field: 'headline', label: 'Headline', multiline: false },
      { field: 'body1', label: 'Body 1 — left column', multiline: true },
      { field: 'body2', label: 'Body 2 — right column', multiline: true },
      { field: 'body3', label: 'Body 3 — left column', multiline: true },
      { field: 'body4', label: 'Body 4 — right column', multiline: true },
      { field: 'body5', label: 'Body 5 — below image left', multiline: true },
      { field: 'body6', label: 'Body 6 — below image right', multiline: true },
    ],
  },
  {
    desc: 'Closing text',
    images: [],
    texts: [
      { field: 'headline', label: 'Headline', multiline: false },
      { field: 'body1', label: 'Body 1 — left column', multiline: true },
      { field: 'body2', label: 'Body 2 — right column', multiline: true },
      { field: 'body3', label: 'Body 3 — left column', multiline: true },
      { field: 'body4', label: 'Body 4 — right column', multiline: true },
    ],
  },
]

export default function Template3Editor({ project }: { project: FullProject }) {
  return <TemplateEditor project={project} patterns={PATTERNS} Layout={Template3Layout} />
}
