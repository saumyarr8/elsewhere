import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const project = await prisma.project.findUnique({
    where: { slug: 'culture-of-diversity-1781925127308' }
  })
  if (!project) return;
  const data = typeof project.templateData === 'string' ? JSON.parse(project.templateData) : project.templateData;
  
  // Restore Sec 7
  data.sec7Headline = "THE RAINS ARE DIFFERENT NOW.";
  data.sec7Body1 = "Mungaru used to arrive on schedule. Now it's early, late, or sometimes barely comes. Prabhakar plants later than his father did, chooses seeds that handle dry spells, and watches clouds more carefully.";
  data.sec7Body2 = "Native seeds survive this better. Centuries of bad years bred resilience into them. Memories of drought and flood and pests are carried in their genes. They know how to wait, how to stretch, and how to make do.";

  // Set Sec 8
  data.sec8Headline = "PLANTING SEASON, RAJAMMA OPENS THE POTS.";
  data.sec8Body1 = "Decides what goes in based on what last season took out. More millets if the soil needs rest. More pulses if nitrogen is low. Depends on what the family needs to eat, what might sell, and what feels right.";
  data.sec8Body2 = "The seeds tell her what they need. When to plant, when to harvest, when to save the best for next year. Not instructions from an agriculture officer. Knowledge in her hands, in the soil, in seeds kept alive by women who understood what could be lost.";
  data.sec8Body3 = "Her daughters know where the pots are. Know which varieties their grandmother said matter most. Whether they'll ever plant these seeds themselves is unclear. Jobs in town pay better and demand less. But Rajamma keeps saving them anyway.";
  data.sec8Body4 = "The way seeds have always been saved. Against drought. Against forgetting. Against the possibility that what seems old-fashioned now might be the only thing that works later.";

  await prisma.project.update({
    where: { slug: 'culture-of-diversity-1781925127308' },
    data: { templateData: data }
  })
  console.log("Success updating sec7 and sec8 text!")
}
main()
