-- CreateTable
CREATE TABLE "_BusinessEntityToBusinessUnit" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BusinessEntityToBusinessUnit_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BusinessEntityToBusinessUnit_B_index" ON "_BusinessEntityToBusinessUnit"("B");

-- AddForeignKey
ALTER TABLE "_BusinessEntityToBusinessUnit" ADD CONSTRAINT "_BusinessEntityToBusinessUnit_A_fkey" FOREIGN KEY ("A") REFERENCES "business_entities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusinessEntityToBusinessUnit" ADD CONSTRAINT "_BusinessEntityToBusinessUnit_B_fkey" FOREIGN KEY ("B") REFERENCES "business_units"("id") ON DELETE CASCADE ON UPDATE CASCADE;
