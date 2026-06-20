import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const project = await prisma.project.findUnique({
    where: { slug: 'culture-of-diversity-1781925127308' }
  })
  if (!project) return;
  const data = typeof project.templateData === 'string' ? JSON.parse(project.templateData) : project.templateData;
  
  data.sec6Headline = "THE RAINS ARE DIFFERENT NOW.";
  data.sec6Body1 = "Mungaru used to arrive on schedule. Now it's early, late, or sometimes barely comes. Prabhakar plants later than his father did, chooses seeds that handle dry spells, and watches clouds more carefully.";
  data.sec6Quote = "Native seeds survive this better. Centuries of bad years bred resilience into them. Memories of drought and flood and pests are carried in their genes. They know how to wait, how to stretch, and how to make do.";

  data.sec7Col1 = "The government wants monoculture. Markets want single crops in bulk. Chemical fertilisers, pesticides, everything designed for production at scale. The diversity creates problems for that system. So diversity disappears.";
  data.sec7Col2 = "Prabhakar's acre is stubborn. Twenty crops are still rotating. Insects and birds and microbes all find what they need in different plants. Soil builds itself back up from what dies and decomposes. One acre holding an ecosystem most farmland lost decades ago.";
  data.sec7Col3 = "Decides what goes in based on what last season took out. More millets if the soil needs rest. More pulses if nitrogen is low. Depends on what the family needs to eat, what might sell, and what feels right.";
  
  data.sec7Headline = "PLANTING SEASON, RAJAMMA OPENS THE POTS.";
  data.sec7Body1 = "The way seeds have always been saved. Against drought. Against forgetting. Against the possibility that what seems old-fashioned now might be the only thing that works later.";
  data.sec7Body2 = "The seeds tell her what they need. When to plant, when to harvest, when to save the best for next year. Not instructions from an agriculture officer. Knowledge in her hands, in the soil, in seeds kept alive by women who understood what could be lost.";
  data.sec7Body3 = "Her daughters know where the pots are. Know which varieties their grandmother said matter most. Whether they'll ever plant these seeds themselves is unclear. Jobs in town pay better and demand less. But Rajamma keeps saving them anyway.";
  data.sec7Body4 = "";
  data.sec7Body5 = "";

  await prisma.project.update({
    where: { slug: 'culture-of-diversity-1781925127308' },
    data: { templateData: data }
  })
  console.log("Success!")
}
main()
