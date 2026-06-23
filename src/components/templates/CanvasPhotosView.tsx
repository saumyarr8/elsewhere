'use client'

type Props = {
  imageIds: string[]
}

export default function CanvasPhotosView({ imageIds }: Props) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const filtered = imageIds.filter(Boolean)
  if (filtered.length === 0) return null

  return (
    <div style={{ padding: '40px 80px', background: '#fff' }}>
      {filtered.map((id, i) => {
        const url = cloudName
          ? `https://res.cloudinary.com/${cloudName}/image/upload/w_1200,h_800,c_fill,q_auto,f_auto/${id}`
          : ''
        return (
          <div
            key={`${id}-${i}`}
            style={{
              position: 'sticky',
              top: 40,
              zIndex: i,
              marginBottom: 40,
            }}
          >
            {url && (
              <img
                src={url}
                alt=""
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: 12,
                  boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
