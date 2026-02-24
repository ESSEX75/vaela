/*
  Warnings:

  - The values [MEN,WOMEN] on the enum `CollectionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CollectionType_new" AS ENUM ('men', 'women', 'kids', 'home', 'beauty');
ALTER TABLE "Collection" ALTER COLUMN "types" TYPE "CollectionType_new"[] USING ("types"::text::"CollectionType_new"[]);
ALTER TABLE "Product" ALTER COLUMN "types" TYPE "CollectionType_new"[] USING ("types"::text::"CollectionType_new"[]);
ALTER TYPE "CollectionType" RENAME TO "CollectionType_old";
ALTER TYPE "CollectionType_new" RENAME TO "CollectionType";
DROP TYPE "public"."CollectionType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "colors" SET DEFAULT ARRAY[]::"ProductColor"[],
ALTER COLUMN "sizes" SET DEFAULT ARRAY[]::"ProductSize"[];
