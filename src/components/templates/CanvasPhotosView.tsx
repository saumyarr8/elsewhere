'use client'

import SiteFooter from '@/components/public/SiteFooter'

type Props = {
  imageIds: string[]
  nextProject?: { slug: string; title: string } | null
}

export default function CanvasPhotosView({ imageIds, nextProject }: Props) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const filtered = imageIds.filter(Boolean)
  if (filtered.length === 0) return null

  return (
    <>
      <div style={{ padding: '20px 120px 60px' }}>
        {filtered.map((id, i) => {
          const url = cloudName
            ? `https://res.cloudinary.com/${cloudName}/image/upload/w_1000,h_660,c_fill,q_auto,f_auto/${id}`
            : ''
          return (
            <div
              key={`${id}-${i}`}
              style={{
                position: 'sticky',
                top: 40,
                zIndex: i,
                marginBottom: 30,
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
                    borderRadius: 16,
                    boxShadow: '0 8px 30px rgba(0,0,0,0.18)',
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
      <SiteFooter nextProject={nextProject} />
    </>
  )
}
