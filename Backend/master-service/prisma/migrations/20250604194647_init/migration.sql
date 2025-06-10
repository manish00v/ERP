-- AlterTable
ALTER TABLE "factory_units" ADD COLUMN     "InventoryBayId" VARCHAR(4),
ADD COLUMN     "InventoryUnitId" VARCHAR(4),
ADD COLUMN     "SourcingTeamId" VARCHAR(4),
ADD COLUMN     "SourcingUnitId" VARCHAR(4);
