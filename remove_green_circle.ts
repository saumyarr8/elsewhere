import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const p = await prisma.project.findUnique({ where: { slug: 'neeruganti-final-1781890236782' } });
  if (!p) return;

  const data = p.templateData as any;
  delete data.heroImage;

  await prisma.project.update({
    where: { slug: 'neeruganti-final-1781890236782' },
    data: { templateData: data }
  });
  console.log("Hero image set to null to remove green circle!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
