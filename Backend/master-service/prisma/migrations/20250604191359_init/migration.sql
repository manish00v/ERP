/*
  Warnings:

  - You are about to drop the column `businessEntityCode` on the `business_units` table. All the data in the column will be lost.
  - You are about to drop the column `factoryUnitCode` on the `business_units` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "business_units" DROP CONSTRAINT "business_units_businessEntityCode_fkey";

-- DropForeignKey
ALTER TABLE "business_units" DROP CONSTRAINT "business_units_factoryUnitCode_fkey";

-- AlterTable
ALTER TABLE "business_units" DROP COLUMN "businessEntityCode",
DROP COLUMN "factoryUnitCode";
