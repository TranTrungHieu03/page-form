/*
  Warnings:

  - You are about to drop the column `visit` on the `Form` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Form" DROP COLUMN "visit",
ADD COLUMN     "visits" INTEGER NOT NULL DEFAULT 0;
