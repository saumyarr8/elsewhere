'use client'

import TemplateEditor from '@/components/admin/template-editor/TemplateEditor'
import Template2Layout from '@/components/templates/Template2Layout'
import type { Pattern } from '@/components/admin/template-editor/shared'
import type { Project, MediaAsset } from '@prisma/client'

type FullProject = Project & { heroImage: MediaAsset | null; ogImage: MediaAsset | null }

const PATTERNS: Pattern[] = [
  {
    desc: 'Image left, text right',
    images: [{ field: 'image1', label: 'Image — left (648×416)' }],
    texts: [
      { field: 'headline', label: 'Headline', multiline: false },
      { field: 'quote', label: 'Quote', multiline: true },
      { field: 'body1', label: 'Body — left column', multiline: true },
      { field: 'body2', label: 'Body — right column', multiline: true },
      { field: 'body3', label: 'Body — footer line', multiline: true },
      { field: 'quote2', label: 'Quote 2', multiline: true },
    ],
  },
  {
    desc: 'Images + text columns',
    images: [
      { field: 'image1', label: 'Main image (695×492)' },
      { field: 'image2', label: 'Lower left (487×575)' },
      { field: 'image3', label: 'Right portrait (193×354)' },
      { field: 'image4', label: 'Lower right (193×354)' },
    ],
    texts: [
      { field: 'headline', label: 'Headline', multiline: false },
      { field: 'body1', label: 'Body 1', multiline: true },
      { field: 'body2', label: 'Body 2', multiline: true },
      { field: 'body3', label: 'Body 3', multiline: true },
    ],
  },
  {
    desc: 'Wide image, text left',
    images: [{ field: 'image1', label: 'Image — wide (684×520)' }],
    texts: [
      { field: 'headline', label: 'Headline', multiline: false },
      { field: 'body1', label: 'Body 1', multiline: true },
      { field: 'body2', label: 'Body 2', multiline: true },
      { field: 'quote', label: 'Quote', multiline: true },
      { field: 'body3', label: 'Body 3', multiline: true },
    ],
  },
  {
    desc: 'Image left, quotes',
    images: [{ field: 'image1', label: 'Image — left (499×616)' }],
    texts: [
      { field: 'headline', label: 'Headline', multiline: false },
      { field: 'quote', label: 'Quote', multiline: true },
      { field: 'body1', label: 'Body 1', multiline: true },
      { field: 'body2', label: 'Body 2', multiline: true },
      { field: 'body3', label: 'Body 3', multiline: true },
      { field: 'body4', label: 'Body 4', multiline: true },
    ],
  },
  {
    desc: 'Large image right, text left',
    images: [
      { field: 'image1', label: 'Image — large right (685×589)' },
      { field: 'image2', label: 'Image 2 — lower left (469×334)' },
    ],
    texts: [
      { field: 'headline', label: 'Headline', multiline: false },
      { field: 'body1', label: 'Body 1', multiline: true },
      { field: 'body2', label: 'Body 2', multiline: true },
      { field: 'body3', label: 'Body 3', multiline: true },
    ],
  },
  {
    desc: 'Portrait + strip image',
    images: [
      { field: 'image1', label: 'Portrait (293×456)' },
      { field: 'image2', label: 'Small portrait (293×262)' },
    ],
    texts: [
      { field: 'headline', label: 'Headline', multiline: false },
      { field: 'body1', label: 'Body 1', multiline: true },
      { field: 'body2', label: 'Body 2', multiline: true },
    ],
  },
  {
    desc: 'Landscape strip + headline',
    images: [{ field: 'image1', label: 'Landscape strip (469×178)' }],
    texts: [
      { field: 'headline', label: 'Headline', multiline: false },
      { field: 'body1', label: 'Body 1', multiline: true },
      { field: 'body2', label: 'Body 2', multiline: true },
    ],
  },
  {
    desc: 'Large landscape + 4 body blocks',
    images: [{ field: 'image1', label: 'Landscape — left (688×589)' }],
    texts: [
      { field: 'headline', label: 'Headline', multiline: false },
      { field: 'body1', label: 'Body 1', multiline: true },
      { field: 'body2', label: 'Body 2', multiline: true },
      { field: 'body3', label: 'Body 3', multiline: true },
      { field: 'body4', label: 'Body 4', multiline: true },
    ],
  },
]

export default function Template2Editor({ project }: { project: FullProject }) {
  return <TemplateEditor project={project} patterns={PATTERNS} Layout={Template2Layout} showTitleLight />
}
