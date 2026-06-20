import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const project = await prisma.project.findUnique({
    where: { slug: 'culture-of-diversity-1781925127308' }
  })
  if (!project) return;
  const data = typeof project.templateData === 'string' ? JSON.parse(project.templateData) : project.templateData;
  console.log("sec6Body1:", !!data.sec6Body1);
  console.log("sec6Body2:", !!data.sec6Body2);
  console.log("sec6Quote:", !!data.sec6Quote);
}
main()
