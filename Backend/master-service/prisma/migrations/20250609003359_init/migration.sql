/*
  Warnings:

  - You are about to drop the `_BusinessEntityToBusinessUnit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BusinessEntityToBusinessUnit" DROP CONSTRAINT "_BusinessEntityToBusinessUnit_A_fkey";

-- DropForeignKey
ALTER TABLE "_BusinessEntityToBusinessUnit" DROP CONSTRAINT "_BusinessEntityToBusinessUnit_B_fkey";

-- AlterTable
ALTER TABLE "business_units" ADD COLUMN     "businessEntityCode" VARCHAR(4);

-- DropTable
DROP TABLE "_BusinessEntityToBusinessUnit";

-- AddForeignKey
ALTER TABLE "business_units" ADD CONSTRAINT "business_units_businessEntityCode_fkey" FOREIGN KEY ("businessEntityCode") REFERENCES "business_entities"("businessEntityCode") ON DELETE SET NULL ON UPDATE CASCADE;
