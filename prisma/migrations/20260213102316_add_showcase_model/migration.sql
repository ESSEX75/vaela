-- CreateEnum
CREATE TYPE "ShowcaseType" AS ENUM ('PRIMARY', 'SECONDARY');

-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "description" TEXT,
ADD COLUMN     "image" TEXT;

-- CreateTable
CREATE TABLE "Showcase" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "collectionId" INTEGER NOT NULL,

    CONSTRAINT "Showcase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShowcaseCollection" (
    "id" SERIAL NOT NULL,
    "showcaseId" INTEGER NOT NULL,
    "collectionId" INTEGER NOT NULL,
    "type" "ShowcaseType" NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ShowcaseCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShowcaseProduct" (
    "id" SERIAL NOT NULL,
    "showcaseId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ShowcaseProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Showcase_collectionId_key" ON "Showcase"("collectionId");

-- CreateIndex
CREATE UNIQUE INDEX "ShowcaseCollection_showcaseId_collectionId_key" ON "ShowcaseCollection"("showcaseId", "collectionId");

-- CreateIndex
CREATE UNIQUE INDEX "ShowcaseProduct_showcaseId_productId_key" ON "ShowcaseProduct"("showcaseId", "productId");

-- AddForeignKey
ALTER TABLE "Showcase" ADD CONSTRAINT "Showcase_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowcaseCollection" ADD CONSTRAINT "ShowcaseCollection_showcaseId_fkey" FOREIGN KEY ("showcaseId") REFERENCES "Showcase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowcaseCollection" ADD CONSTRAINT "ShowcaseCollection_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowcaseProduct" ADD CONSTRAINT "ShowcaseProduct_showcaseId_fkey" FOREIGN KEY ("showcaseId") REFERENCES "Showcase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowcaseProduct" ADD CONSTRAINT "ShowcaseProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
