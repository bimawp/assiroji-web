/*
  Warnings:

  - You are about to drop the column `DateTime` on the `Kalender` table. All the data in the column will be lost.
  - Added the required column `date` to the `Kalender` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Kalender" DROP COLUMN "DateTime",
ADD COLUMN     "date" TEXT NOT NULL;
