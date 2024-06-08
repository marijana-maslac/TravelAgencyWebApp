import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/db";

interface Props {
  params: { id: string };
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const tripId = parseInt(params.id, 10);
  if (isNaN(tripId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const trip = await prisma.travelListing.findUnique({
    where: { id: tripId },
  });

  if (!trip) {
    return NextResponse.json({ error: "Trip not found" }, { status: 404 });
  }

  await prisma.travelListing.delete({
    where: { id: trip.id },
  });

  return NextResponse.json({ message: "Trip deleted." });
}
