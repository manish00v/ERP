/*
  Warnings:

  - A unique constraint covering the columns `[InventoryBayId]` on the table `inventory_bays` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "inventory_bays_InventoryBayId_key" ON "inventory_bays"("InventoryBayId");
