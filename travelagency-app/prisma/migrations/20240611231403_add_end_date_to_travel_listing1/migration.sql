/*
  Warnings:

  - Made the column `endDate` on table `TravelListing` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TravelListing" ALTER COLUMN "endDate" SET NOT NULL;
