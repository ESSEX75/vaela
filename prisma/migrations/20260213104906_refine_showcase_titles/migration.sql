/*
  Warnings:

  - You are about to drop the column `name` on the `ShowcaseCollection` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ShowcaseProduct` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Showcase" ADD COLUMN     "primaryTitle" VARCHAR(255),
ADD COLUMN     "productsTitle" VARCHAR(255),
ADD COLUMN     "secondaryTitle" VARCHAR(255);

-- AlterTable
ALTER TABLE "ShowcaseCollection" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "ShowcaseProduct" DROP COLUMN "name";
