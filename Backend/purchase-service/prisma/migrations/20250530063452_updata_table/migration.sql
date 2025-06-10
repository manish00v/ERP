/*
  Warnings:

  - You are about to drop the column `City` on the `sourcing_teams` table. All the data in the column will be lost.
  - You are about to drop the column `Region` on the `sourcing_teams` table. All the data in the column will be lost.
  - You are about to drop the column `StreetAddress` on the `sourcing_teams` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sourcing_teams" DROP COLUMN "City",
DROP COLUMN "Region",
DROP COLUMN "StreetAddress";

-- CreateTable
CREATE TABLE "RelatedParty" (
    "id" TEXT NOT NULL,
    "OrderingParty" VARCHAR(20) NOT NULL,
    "ReceivingParty" VARCHAR(20) NOT NULL,
    "InvoicingParty" VARCHAR(20) NOT NULL,
    "PayingParty" VARCHAR(20) NOT NULL,
    "GroupOrganisation" VARCHAR(20) NOT NULL,
    "SalesPersonId" VARCHAR(4) NOT NULL,
    "SourcingTeamId" VARCHAR(4) NOT NULL,
    "ContactPersonId" VARCHAR(4) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RelatedParty_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RelatedParty_SalesPersonId_key" ON "RelatedParty"("SalesPersonId");

-- CreateIndex
CREATE UNIQUE INDEX "RelatedParty_SourcingTeamId_key" ON "RelatedParty"("SourcingTeamId");

-- CreateIndex
CREATE UNIQUE INDEX "RelatedParty_ContactPersonId_key" ON "RelatedParty"("ContactPersonId");
