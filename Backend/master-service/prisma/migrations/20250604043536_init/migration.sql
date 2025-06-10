-- AlterTable
ALTER TABLE "factory_units" ADD COLUMN     "deliveryLocationCode" VARCHAR(4);

-- AddForeignKey
ALTER TABLE "factory_units" ADD CONSTRAINT "factory_units_deliveryLocationCode_fkey" FOREIGN KEY ("deliveryLocationCode") REFERENCES "delivery_locations"("deliveryLocationCode") ON DELETE SET NULL ON UPDATE CASCADE;
