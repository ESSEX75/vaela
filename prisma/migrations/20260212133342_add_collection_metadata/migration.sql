-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "isRoot" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "metaDescription" TEXT,
ADD COLUMN     "metaTitle" VARCHAR(255),
ADD COLUMN     "order" INTEGER;
