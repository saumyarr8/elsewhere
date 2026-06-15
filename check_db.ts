import { PrismaClient } from './src/generated/prisma/client'

const prisma = new PrismaClient()

async function main() {
  const images = await prisma.galleryImage.findMany({
    include: { image: true },
    orderBy: { order: 'asc' },
  })
  console.log('--- GALLERY IMAGES ---')
  console.log(JSON.stringify(images, null, 2))
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
