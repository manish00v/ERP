/*
  Warnings:

  - You are about to drop the column `InventoryBayId` on the `factory_units` table. All the data in the column will be lost.
  - You are about to drop the column `InventoryUnitId` on the `factory_units` table. All the data in the column will be lost.
  - You are about to drop the column `SourcingTeamId` on the `factory_units` table. All the data in the column will be lost.
  - You are about to drop the column `SourcingUnitId` on the `factory_units` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "factory_units" DROP COLUMN "InventoryBayId",
DROP COLUMN "InventoryUnitId",
DROP COLUMN "SourcingTeamId",
DROP COLUMN "SourcingUnitId",
ADD COLUMN     "inventoryBayId" VARCHAR(4),
ADD COLUMN     "inventoryUnitId" VARCHAR(4),
ADD COLUMN     "sourcingTeamId" VARCHAR(4),
ADD COLUMN     "sourcingUnitId" VARCHAR(4);
