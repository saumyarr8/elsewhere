import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  try {
    const project = await prisma.project.findUnique({
      where: { slug: 'culture-of-diversity-1781925127308' }
    })
    if (!project) return;
    const data = typeof project.templateData === 'string' ? JSON.parse(project.templateData) : project.templateData;
    
    data.sec4Headline = "THE SOIL NEEDS AS MUCH ATTENTION AS THE SEEDS.";
    data.sec4Body1 = "Prabhakar rotates constantly. Early crops get pulled, chopped, and mixed back in as manure for what comes next. He makes compost from jaggery, plant scraps, and animal waste. Has to work it into the soil fast before sun and air steal its value. Fields get prepared ahead of time so there's no delay.";
    data.sec4Body2 = "The compost feeds organisms that burrow deep, fixing nitrogen and loosening compacted earth. Srinivas knows soil.";
    data.sec4Body3 = "He says land rich in organic matter holds moisture. Chemical fertilisers do the opposite. Salt content hardens everything.";
    data.sec4Quote = "This is why wooden tools don't work anymore and farmers need steel ploughs.";
    data.sec4Body4 = "Akkadi Saalu doesn't mine groundwater. It takes what the monsoons bring. Farmers here have tracked rain patterns for generations. They know when it usually comes, how much, and what to plant.";

    await prisma.project.update({
      where: { slug: 'culture-of-diversity-1781925127308' },
      data: { templateData: data }
    })
    console.log("Success!")
  } catch (e) {
    console.error(e)
  }
}
main()
