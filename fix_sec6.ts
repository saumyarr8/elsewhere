import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const project = await prisma.project.findUnique({
    where: { slug: 'culture-of-diversity-1781925127308' }
  })
  if (!project) return;
  const data = typeof project.templateData === 'string' ? JSON.parse(project.templateData) : project.templateData;
  
  data.sec6Body2 = "Prabhakar's acre is stubborn. Twenty crops are still rotating. Insects and birds and microbes all find what they need in different plants. Soil builds itself back up from what dies and decomposes. One acre holding an ecosystem most farmland lost decades ago.";

  await prisma.project.update({
    where: { slug: 'culture-of-diversity-1781925127308' },
    data: { templateData: data }
  })
  console.log("Success updating sec6Body2!")
}
main()
