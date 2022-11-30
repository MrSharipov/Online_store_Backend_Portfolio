/*
  Warnings:

  - You are about to drop the column `categoriesId` on the `Products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_categoriesId_fkey";

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "categoriesId";

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
