import { prisma } from '../src/lib/prisma'
import { cloudinary } from '../src/lib/cloudinary'
import fs from 'fs'
import path from 'path'



// Paths to our MCP outputs
const metadataFile = 'C:\\Users\\Saumya Ranjan\\.gemini\\antigravity-ide\\brain\\1293f225-d05b-4a80-a4ca-ae51f946136f\\.system_generated\\steps\\79\\output.txt'
const contextFile = 'C:\\Users\\Saumya Ranjan\\.gemini\\antigravity-ide\\brain\\1293f225-d05b-4a80-a4ca-ae51f946136f\\.system_generated\\steps\\14\\output.txt'

async function uploadAndCreateMedia(localFilename: string, altText?: string) {
  const filePath = path.join(process.cwd(), 'public', localFilename)
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`)
    return null
  }
  console.log(`Uploading ${localFilename}...`)
  
  const res = await cloudinary.uploader.upload(filePath, { folder: 'elsewhere/figma' })
  
  return prisma.mediaAsset.create({
    data: {
      cloudinaryId: res.public_id,
      cloudinaryUrl: res.secure_url,
      format: res.format,
      width: res.width,
      height: res.height,
      bytes: res.bytes,
      altText: altText || localFilename
    }
  })
}

async function main() {
  console.log('Starting ingestion...')
  
  // 1. Read the image mappings from the context file
  const contextContent = fs.readFileSync(contextFile, 'utf-8')
  const imageMapping: Record<string, string> = {}
  
  const imgRegex = /const img(Frame\d+) = ".*\/([a-z0-9]+\.(png|svg))";/g
  let match
  while ((match = imgRegex.exec(contextContent)) !== null) {
    const frameName = match[1].replace('imgFrame', 'Frame ') // e.g. "Frame 156"
    const filename = match[2]
    imageMapping[frameName] = filename
  }
  
  // 2. Read the metadata XML
  const metaContent = fs.readFileSync(metadataFile, 'utf-8')
  
  const elements: any[] = []
  
  // Parse texts
  const textRegex = /<text [^>]*name="([^"]+)"[^>]*x="([0-9.]+)"[^>]*y="([0-9.]+)"[^>]*\/>/g
  while ((match = textRegex.exec(metaContent)) !== null) {
    const text = match[1]
    const x = parseFloat(match[2])
    const y = parseFloat(match[3])
    // ignore very small texts or menu items
    if (y > 1000 && !text.match(/^[0-9]{2}$/) && !text.includes('Section:')) {
      elements.push({ type: 'text', x, y, content: text })
    }
    if (text.match(/^[0-9]{2}$/)) {
      elements.push({ type: 'watermark', x, y, content: text })
    }
  }

  // Parse images
  const frameRegex = /<frame [^>]*name="(Frame \d+)"[^>]*x="([0-9.]+)"[^>]*y="([0-9.]+)"[^>]*width="([0-9.]+)"/g
  while ((match = frameRegex.exec(metaContent)) !== null) {
    const frameName = match[1]
    const x = parseFloat(match[2])
    const y = parseFloat(match[3])
    const width = parseFloat(match[4])
    
    if (imageMapping[frameName] && y > 1000) {
      elements.push({ 
        type: 'image', 
        x, y, 
        frameName, 
        filename: imageMapping[frameName],
        isPortrait: width < 600
      })
    }
  }

  // Sort vertically
  elements.sort((a, b) => a.y - b.y)

  // 3. Create the Project
  const heroImageName = imageMapping['Frame 156']
  let heroAsset = null
  if (heroImageName) {
    heroAsset = await uploadAndCreateMedia(heroImageName, 'Hero')
  }

  const project = await prisma.project.create({
    data: {
      title: 'Neeruganti, Keepers of Tanks',
      slug: 'neeruganti-' + Date.now(),
      description: 'The tank was sealed years ago...',
      template: 'CUSTOM',
      heroImageId: heroAsset?.id,
      published: true,
      publishedAt: new Date(),
    }
  })

  // Group elements into blocks
  // Since we want visual parity, we map sequences to ImageText or generic RichText
  const blocks = []
  
  let currentBlock: any = null
  let pendingWatermark: string | undefined = undefined

  const getAlign = (x: number) => {
    if (x < 400) return 'left'
    if (x > 900) return 'right'
    return 'center'
  }
  
  for (const el of elements) {
    if (el.type === 'watermark') {
      pendingWatermark = el.content
      continue
    }
    
    if (el.type === 'image') {
      const asset = await uploadAndCreateMedia(el.filename, el.frameName)
      if (!asset) continue
      
      currentBlock = {
        type: el.isPortrait ? 'PORTRAIT_IMAGE' : 'LANDSCAPE_IMAGE',
        payload: {
          image: { cloudinaryId: asset.cloudinaryId, width: asset.width, height: asset.height },
          caption: '',
          layoutOptions: { align: getAlign(el.x), watermark: pendingWatermark }
        }
      }
      blocks.push(currentBlock)
      pendingWatermark = undefined
    } else if (el.type === 'text') {
      if (currentBlock && (currentBlock.type === 'PORTRAIT_IMAGE' || currentBlock.type === 'LANDSCAPE_IMAGE') && !currentBlock.payload.caption && Math.abs(el.y - currentBlock.payload.layoutOptions?.y) < 200) {
        currentBlock.payload.caption = el.content
      } else {
        blocks.push({
          type: 'RICH_TEXT',
          payload: {
            html: `<p>${el.content}</p>`,
            layoutOptions: { align: getAlign(el.x), watermark: pendingWatermark }
          }
        })
        pendingWatermark = undefined
      }
    }
  }

  // Insert blocks
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]
    await prisma.contentBlock.create({
      data: {
        projectId: project.id,
        type: block.type as any,
        order: i,
        payload: block.payload as any,
      }
    })
  }

  console.log(`Ingestion complete! Project URL: http://localhost:3000/${project.slug}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
