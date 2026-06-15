import type { ContentBlock } from '@/generated/prisma/client'
import type { BlockPayload } from '@/lib/types/blocks'
import IntroBlock from './blocks/IntroBlock'
import RichTextBlock from './blocks/RichTextBlock'
import FullWidthImageBlock from './blocks/FullWidthImageBlock'
import ImageTextBlock from './blocks/ImageTextBlock'
import PortraitImageBlock from './blocks/PortraitImageBlock'
import LandscapeImageBlock from './blocks/LandscapeImageBlock'
import GalleryBlock from './blocks/GalleryBlock'
import QuoteBlock from './blocks/QuoteBlock'
import DividerBlock from './blocks/DividerBlock'
import SpacerBlock from './blocks/SpacerBlock'

type Props = {
  block: ContentBlock & { payload: BlockPayload }
}

export default function BlockRenderer({ block }: Props) {
  const { payload } = block
  switch (payload.type) {
    case 'INTRO':           return <IntroBlock payload={payload} />
    case 'RICH_TEXT':       return <RichTextBlock payload={payload} />
    case 'FULL_WIDTH_IMAGE':return <FullWidthImageBlock payload={payload} />
    case 'IMAGE_TEXT':      return <ImageTextBlock payload={payload} />
    case 'PORTRAIT_IMAGE':  return <PortraitImageBlock payload={payload} />
    case 'LANDSCAPE_IMAGE': return <LandscapeImageBlock payload={payload} />
    case 'GALLERY':         return <GalleryBlock payload={payload} />
    case 'QUOTE':           return <QuoteBlock payload={payload} />
    case 'DIVIDER':         return <DividerBlock />
    case 'SPACER':          return <SpacerBlock payload={payload} />
    default:                return null
  }
}
