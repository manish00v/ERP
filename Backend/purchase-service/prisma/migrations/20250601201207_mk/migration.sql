/*
  Warnings:

  - A unique constraint covering the columns `[SourcingUnitId]` on the table `sourcing_units` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "sourcing_units_SourcingUnitId_key" ON "sourcing_units"("SourcingUnitId");
