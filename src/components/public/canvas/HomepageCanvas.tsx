'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cloudinaryUrl } from '@/lib/utils/cloudinary-url'
import type { CanvasItem } from '@/lib/types/canvas'

type Props = {
  items: (CanvasItem & {
    image: { cloudinaryId: string; width: number; height: number; altText: string | null }
    project: { id: string; title: string; slug: string; published?: boolean } | null
  })[]
}

const CANVAS_RATIO = 900 / 1440

export default function HomepageCanvas({ items }: Props) {
  return (
    <>
      {/* Desktop: free-form canvas */}
      <div
        className="relative hidden md:block w-full overflow-hidden"
        style={{ paddingBottom: `${CANVAS_RATIO * 100}%` }}
        aria-label="Photography portfolio canvas"
      >
        <div className="absolute inset-0">
          {items
            .slice()
            .sort((a, b) => a.zIndex - b.zIndex)
            .map((item) => {
              const img = cloudinaryUrl(item.image.cloudinaryId, {
                width: Math.round((item.widthPercent / 100) * 1440 * 1.5),
                crop: 'fill',
              })

              const content = (
                <motion.div
                  className="absolute"
                  style={{
                    left: `${item.xPercent}%`,
                    top: `${item.yPercent}%`,
                    width: `${item.widthPercent}%`,
                    height: `${item.heightPercent}%`,
                    transform: `rotate(${item.rotation}deg)`,
                    zIndex: item.zIndex,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.25 } }}
                >
                  <Image
                    src={img}
                    alt={item.image.altText ?? item.project?.title ?? ''}
                    fill
                    className="object-cover"
                    sizes={`${Math.round(item.widthPercent * 1.5)}vw`}
                    loading="lazy"
                  />
                </motion.div>
              )

              return item.project ? (
                <Link key={item.id} href={`/${item.project.slug}`} className="block">
                  {content}
                </Link>
              ) : (
                <div key={item.id}>{content}</div>
              )
            })}

          {items.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-sm text-[var(--color-ink-faint)] tracking-widest uppercase">
                Coming soon
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile: vertical stack */}
      <div className="md:hidden px-4 py-8 space-y-6">
        {items
          .filter((i) => i.project)
          .map((item) => {
            const img = cloudinaryUrl(item.image.cloudinaryId, { width: 800, crop: 'fill' })
            return (
              <Link key={item.id} href={`/${item.project!.slug}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={img}
                    alt={item.image.altText ?? item.project!.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw"
                  />
                </div>
                <p className="mt-2 text-xs uppercase tracking-widest text-[var(--color-ink-muted)]">
                  {item.project!.title}
                </p>
              </Link>
            )
          })}
      </div>
    </>
  )
}
