export type CanvasItem = {
  id: string
  projectId: string | null
  imageId: string
  xPercent: number
  yPercent: number
  widthPercent: number
  heightPercent: number
  rotation: number
  zIndex: number
  image: {
    cloudinaryId: string
    width: number
    height: number
    altText: string | null
  }
  project: {
    id: string
    title: string
    slug: string
  } | null
}
