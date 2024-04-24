/*
  Warnings:

  - You are about to drop the column `destinationId` on the `TravelListing` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_travelListingId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_userId_fkey";

-- DropForeignKey
ALTER TABLE "TravelListing" DROP CONSTRAINT "TravelListing_destinationId_fkey";

-- AlterTable
ALTER TABLE "TravelDestination" ADD COLUMN     "listingId" INTEGER;

-- AlterTable
ALTER TABLE "TravelListing" DROP COLUMN "destinationId";
