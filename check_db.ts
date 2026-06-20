import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const projects = await prisma.project.findMany({
    select: { slug: true, title: true }
  })
  console.log(projects)
}
main()
