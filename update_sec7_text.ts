import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const project = await prisma.project.findUnique({
    where: { slug: 'culture-of-diversity-1781925127308' }
  })
  if (!project) return;
  const data = typeof project.templateData === 'string' ? JSON.parse(project.templateData) : project.templateData;
  
  data.sec7Headline = "PLANTING SEASON, RAJAMMA OPENS THE POTS.";
  data.sec7Body1 = "The way seeds have always been saved. Against drought. Against forgetting. Against the possibility that what seems old-fashioned now might be the only thing that works later.";
  data.sec7Body2 = "The seeds tell her what they need. When to plant, when to harvest, when to save the best for next year. Not instructions from an agriculture officer. Knowledge in her hands, in the soil, in seeds kept alive by women who understood what could be lost.";

  await prisma.project.update({
    where: { slug: 'culture-of-diversity-1781925127308' },
    data: { templateData: data }
  })
  console.log("Success updating sec7 text!")
}
main()
