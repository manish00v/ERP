/*
  Warnings:

  - You are about to drop the column `factoryEmail` on the `factory_units` table. All the data in the column will be lost.
  - You are about to drop the column `factoryPhone` on the `factory_units` table. All the data in the column will be lost.
  - You are about to drop the column `mobileNumber` on the `factory_units` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "factory_units" DROP CONSTRAINT "factory_units_businessEntityCode_fkey";

-- AlterTable
ALTER TABLE "factory_units" DROP COLUMN "factoryEmail",
DROP COLUMN "factoryPhone",
DROP COLUMN "mobileNumber",
ALTER COLUMN "businessEntityCode" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "factory_units" ADD CONSTRAINT "factory_units_businessEntityCode_fkey" FOREIGN KEY ("businessEntityCode") REFERENCES "business_entities"("businessEntityCode") ON DELETE SET NULL ON UPDATE CASCADE;
