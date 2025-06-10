-- AlterTable
ALTER TABLE "business_entities" ADD COLUMN     "businessUnitCode" VARCHAR(4),
ADD COLUMN     "factoryUnitCode" VARCHAR(4),
ADD COLUMN     "salesChannelId" INTEGER;

-- AddForeignKey
ALTER TABLE "business_entities" ADD CONSTRAINT "business_entities_factoryUnitCode_fkey" FOREIGN KEY ("factoryUnitCode") REFERENCES "factory_units"("factoryUnitCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_entities" ADD CONSTRAINT "business_entities_businessUnitCode_fkey" FOREIGN KEY ("businessUnitCode") REFERENCES "business_units"("businessUnitCode") ON DELETE SET NULL ON UPDATE CASCADE;
