const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

type Transform = {
  width?: number
  height?: number
  crop?: string
  quality?: string
  format?: string
  aspectRatio?: string
}

export function cloudinaryUrl(publicId: string, t: Transform = {}): string {
  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
    aspectRatio,
  } = t

  const parts: string[] = [`f_${format}`, `q_${quality}`]
  if (crop) parts.push(`c_${crop}`)
  if (width) parts.push(`w_${width}`)
  if (height) parts.push(`h_${height}`)
  if (aspectRatio) parts.push(`ar_${aspectRatio}`)

  return `https://res.cloudinary.com/${CLOUD}/image/upload/${parts.join(',')}/${publicId}`
}

export function cloudinaryBlur(publicId: string): string {
  return `https://res.cloudinary.com/${CLOUD}/image/upload/w_40,q_auto,f_auto,e_blur:400/${publicId}`
}
