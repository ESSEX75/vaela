/*
  Warnings:

  - You are about to drop the column `description` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `types` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `types` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `primaryTitle` on the `Showcase` table. All the data in the column will be lost.
  - You are about to drop the column `secondaryTitle` on the `Showcase` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "description",
DROP COLUMN "image",
DROP COLUMN "level",
DROP COLUMN "types";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "types",
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Showcase" DROP COLUMN "primaryTitle",
DROP COLUMN "secondaryTitle",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" VARCHAR(255);

-- AlterTable
ALTER TABLE "ShowcaseCollection" ADD COLUMN     "image" TEXT,
ADD COLUMN     "title" VARCHAR(255);

-- DropEnum
DROP TYPE "CollectionType";

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
