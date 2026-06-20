import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const project = await prisma.project.findUnique({
    where: { slug: 'culture-of-diversity-1781925127308' }
  })
  if (!project) return;
  const data = typeof project.templateData === 'string' ? JSON.parse(project.templateData) : project.templateData;
  
  data.sec5Headline = "PRABHAKAR MAKES GROUNDNUT OIL AT HOME.";
  data.sec5Body1 = "Doesn't just sell raw nuts. Processing them himself means more money and less dependence on middlemen who pay almost nothing.";
  data.sec5Body2 = "Rajamma's daughters come back sometimes during planting. Learn which seed is which, when things go in the ground, and how to tell good seed from bad. They live in town, but their mother teaches them anyway.";
  data.sec5Body3 = "His children don't farm. Got educated, moved to cities, and want office jobs. Labour in the fields — that's hard work nobody chooses anymore. The knowledge stays with people like Prabhakar and Rajamma, getting older, wondering who takes over.";

  await prisma.project.update({
    where: { slug: 'culture-of-diversity-1781925127308' },
    data: { templateData: data }
  })
  console.log("Success!")
}
main()
