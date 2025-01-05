/*
  Warnings:

  - Added the required column `DateTime` to the `Kalender` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Kalender" ADD COLUMN     "DateTime" TEXT NOT NULL;
