/*
  Warnings:

  - You are about to drop the `inventory_bays` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `inventory_units` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "inventory_bays" DROP CONSTRAINT "inventory_bays_inventoryUnitId_fkey";

-- DropTable
DROP TABLE "inventory_bays";

-- DropTable
DROP TABLE "inventory_units";

-- CreateTable
CREATE TABLE "Inventory_units" (
    "id" TEXT NOT NULL,
    "InventoryUnitId" VARCHAR(4) NOT NULL,
    "InventoryUnitName" VARCHAR(30) NOT NULL,
    "InventoryControl" VARCHAR(30) NOT NULL,
    "StreetAddress" VARCHAR(50) NOT NULL,
    "City" VARCHAR(30) NOT NULL,
    "Region" VARCHAR(20) NOT NULL,
    "Country" VARCHAR(30) NOT NULL,
    "PinCode" VARCHAR(6) NOT NULL,
    "factoryUnitCode" VARCHAR(4),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventory_units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory_bays" (
    "id" TEXT NOT NULL,
    "InventoryBayId" VARCHAR(4) NOT NULL,
    "InventoryBayName" VARCHAR(30) NOT NULL,
    "StockingType" VARCHAR(20) NOT NULL,
    "StreetAddress" VARCHAR(50) NOT NULL,
    "City" VARCHAR(30) NOT NULL,
    "Region" VARCHAR(20) NOT NULL,
    "Country" VARCHAR(30) NOT NULL,
    "PinCode" VARCHAR(6) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "InventoryUnitId" VARCHAR(4),

    CONSTRAINT "Inventory_bays_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_units_InventoryUnitId_key" ON "Inventory_units"("InventoryUnitId");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_bays_InventoryBayId_key" ON "Inventory_bays"("InventoryBayId");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_bays_InventoryBayId_InventoryUnitId_key" ON "Inventory_bays"("InventoryBayId", "InventoryUnitId");

-- AddForeignKey
ALTER TABLE "Inventory_bays" ADD CONSTRAINT "Inventory_bays_InventoryUnitId_fkey" FOREIGN KEY ("InventoryUnitId") REFERENCES "Inventory_units"("InventoryUnitId") ON DELETE SET NULL ON UPDATE CASCADE;
