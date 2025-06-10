/*
  Warnings:

  - You are about to drop the column `businessUnitCode` on the `business_entities` table. All the data in the column will be lost.
  - You are about to drop the column `factoryUnitCode` on the `business_entities` table. All the data in the column will be lost.
  - You are about to drop the column `salesChannelId` on the `business_entities` table. All the data in the column will be lost.
  - You are about to drop the column `businessEntityId` on the `business_units` table. All the data in the column will be lost.
  - You are about to drop the column `factoryUnitId` on the `business_units` table. All the data in the column will be lost.
  - You are about to drop the column `salesOfficeId` on the `business_units` table. All the data in the column will be lost.
  - You are about to alter the column `salesChannelId` on the `business_units` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `VarChar(4)`.

*/
-- DropForeignKey
ALTER TABLE "business_entities" DROP CONSTRAINT "business_entities_businessUnitCode_fkey";

-- DropForeignKey
ALTER TABLE "business_entities" DROP CONSTRAINT "business_entities_factoryUnitCode_fkey";

-- DropForeignKey
ALTER TABLE "business_units" DROP CONSTRAINT "business_units_businessEntityId_fkey";

-- DropForeignKey
ALTER TABLE "business_units" DROP CONSTRAINT "business_units_factoryUnitId_fkey";

-- DropForeignKey
ALTER TABLE "business_units" DROP CONSTRAINT "business_units_salesChannelId_fkey";

-- DropForeignKey
ALTER TABLE "business_units" DROP CONSTRAINT "business_units_salesOfficeId_fkey";

-- AlterTable
ALTER TABLE "business_entities" DROP COLUMN "businessUnitCode",
DROP COLUMN "factoryUnitCode",
DROP COLUMN "salesChannelId";

-- AlterTable
ALTER TABLE "business_units" DROP COLUMN "businessEntityId",
DROP COLUMN "factoryUnitId",
DROP COLUMN "salesOfficeId",
ADD COLUMN     "businessEntityCode" VARCHAR(4),
ADD COLUMN     "factoryUnitCode" VARCHAR(4),
ADD COLUMN     "salesOfficeCode" VARCHAR(4),
ALTER COLUMN "salesChannelId" SET DATA TYPE VARCHAR(4);

-- AddForeignKey
ALTER TABLE "business_units" ADD CONSTRAINT "business_units_businessEntityCode_fkey" FOREIGN KEY ("businessEntityCode") REFERENCES "business_entities"("businessEntityCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_units" ADD CONSTRAINT "business_units_factoryUnitCode_fkey" FOREIGN KEY ("factoryUnitCode") REFERENCES "factory_units"("factoryUnitCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_units" ADD CONSTRAINT "business_units_salesChannelId_fkey" FOREIGN KEY ("salesChannelId") REFERENCES "sales_channels"("salesChannelId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_units" ADD CONSTRAINT "business_units_salesOfficeCode_fkey" FOREIGN KEY ("salesOfficeCode") REFERENCES "sales_offices"("salesOfficeCode") ON DELETE SET NULL ON UPDATE CASCADE;
