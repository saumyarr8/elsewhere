import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const project = await prisma.project.findUnique({
    where: { slug: 'culture-of-diversity-1781925127308' }
  })
  if (!project) return;
  const data = typeof project.templateData === 'string' ? JSON.parse(project.templateData) : project.templateData;
  
  // Clean up old fields
  delete data.sec6Quote;
  delete data.sec7Col1;
  delete data.sec7Col2;
  delete data.sec7Col3;
  delete data.sec7Body3;
  delete data.sec7Body4;
  delete data.sec7Body5;

  data.sec6Headline = "MOST FARMERS GAVE UP ON THIS.";
  data.sec6Body1 = "The government wants monoculture. Markets want single crops in bulk. Chemical fertilisers, pesticides, everything designed for production at scale. The diversity creates problems for that system. So diversity disappears.";
  data.sec6Body2 = "Prabhakar's acre is stubborn. Twenty crops are still rotating. Insects and birds and microbes all find what they need in different plants. Soil builds itself back up from what dies and decomposes. One acre holding an ecosystem most farmland lost decades ago.";

  data.sec7Headline = "THE RAINS ARE DIFFERENT NOW.";
  data.sec7Body1 = "Mungaru used to arrive on schedule. Now it's early, late, or sometimes barely comes. Prabhakar plants later than his father did, chooses seeds that handle dry spells, and watches clouds more carefully.";
  data.sec7Body2 = "Native seeds survive this better. Centuries of bad years bred resilience into them. Memories of drought and flood and pests are carried in their genes. They know how to wait, how to stretch, and how to make do.";

  await prisma.project.update({
    where: { slug: 'culture-of-diversity-1781925127308' },
    data: { templateData: data }
  })
  console.log("Success updating 6 and 7!")
}
main()
