-- CreateEnum
CREATE TYPE "ProjectCategory" AS ENUM ('CULTURE', 'ADVENTURE');

-- AlterTable
ALTER TABLE "Project"
ADD COLUMN "category" "ProjectCategory" NOT NULL DEFAULT 'CULTURE';
