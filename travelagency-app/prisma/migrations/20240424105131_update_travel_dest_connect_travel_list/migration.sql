/*
  Warnings:

  - You are about to drop the column `listingId` on the `TravelDestination` table. All the data in the column will be lost.
  - Added the required column `destinationId` to the `TravelListing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TravelDestination" DROP COLUMN "listingId";

-- AlterTable
ALTER TABLE "TravelListing" ADD COLUMN     "destinationId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TravelListing" ADD CONSTRAINT "TravelListing_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "TravelDestination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_travelListingId_fkey" FOREIGN KEY ("travelListingId") REFERENCES "TravelListing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
