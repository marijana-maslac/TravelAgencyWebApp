/*
  Warnings:

  - You are about to drop the column `destinationId` on the `TravelListing` table. All the data in the column will be lost.
  - You are about to drop the `TravelDestination` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `TravelListing` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TravelListing" DROP CONSTRAINT "TravelListing_destinationId_fkey";

-- AlterTable
ALTER TABLE "TravelListing" DROP COLUMN "destinationId",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "TravelDestination";
