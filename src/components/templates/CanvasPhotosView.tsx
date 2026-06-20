'use client'

type Props = {
  imageIds: string[]
  canvasWidth: number
  startY: number
}

export default function CanvasPhotosView({ imageIds, canvasWidth, startY }: Props) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const padding = 80
  const imgWidth = canvasWidth - padding * 2
  const gap = 40

  const filtered = imageIds.filter(Boolean)
  if (filtered.length === 0) return null

  return (
    <>
      {filtered.map((id, i) => {
        const url = cloudName
          ? `https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_auto/${id}`
          : ''
        const y = startY + i * (imgWidth * 0.65 + gap)
        return (
          <div
            key={`${id}-${i}`}
            style={{
              position: 'absolute',
              left: padding,
              top: y,
              width: imgWidth,
              height: imgWidth * 0.65,
              overflow: 'hidden',
            }}
          >
            {url && (
              <img
                src={url}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            )}
          </div>
        )
      })}
    </>
  )
}

export function photosViewHeight(imageCount: number, canvasWidth: number): number {
  if (imageCount === 0) return 0
  const padding = 80
  const imgWidth = canvasWidth - padding * 2
  const gap = 40
  return imageCount * (imgWidth * 0.65 + gap)
}
