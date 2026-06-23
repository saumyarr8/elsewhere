'use client'

type Props = {
  imageIds: string[]
}

export default function CanvasPhotosView({ imageIds }: Props) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const filtered = imageIds.filter(Boolean)
  if (filtered.length === 0) return null

  return (
    <div style={{ background: '#fff' }}>
      {filtered.map((id, i) => {
        const url = cloudName
          ? `https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_auto/${id}`
          : ''
        return (
          <div
            key={`${id}-${i}`}
            style={{
              position: 'sticky',
              top: 0,
              zIndex: i,
              background: '#fff',
            }}
          >
            {url && (
              <img
                src={url}
                alt=""
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
