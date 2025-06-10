-- DropForeignKey
ALTER TABLE "business_units" DROP CONSTRAINT "business_units_businessEntityId_fkey";

-- AlterTable
ALTER TABLE "business_units" ALTER COLUMN "businessEntityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "business_units" ADD CONSTRAINT "business_units_businessEntityId_fkey" FOREIGN KEY ("businessEntityId") REFERENCES "business_entities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
