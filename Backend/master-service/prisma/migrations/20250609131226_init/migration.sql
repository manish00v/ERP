/*
  Warnings:

  - You are about to drop the column `inventoryBayId` on the `factory_units` table. All the data in the column will be lost.
  - You are about to drop the column `inventoryUnitId` on the `factory_units` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "factory_units" DROP COLUMN "inventoryBayId",
DROP COLUMN "inventoryUnitId",
ADD COLUMN     "InventoryBayId" VARCHAR(4),
ADD COLUMN     "InventoryUnitId" VARCHAR(4);
