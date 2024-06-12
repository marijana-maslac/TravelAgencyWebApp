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

export async function PUT(request: NextRequest, { params }: Props) {
  const tripId = parseInt(params.id, 10);
  if (isNaN(tripId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const body = await request.json();
  const { name, description, price, date, endDate, category } = body;

  try {
    const updatedTrip = await prisma.travelListing.update({
      where: { id: tripId },
      data: {
        name,
        description,
        price,
        date: new Date(date),
        endDate: new Date(endDate),
        category,
      },
    });

    return NextResponse.json(updatedTrip, { status: 200 });
  } catch (error) {
    console.error("Server error: ", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest, { params }: Props) {
  const tripId = parseInt(params.id, 10);
  if (isNaN(tripId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const trip = await prisma.travelListing.findUnique({
      where: { id: tripId },
    });

    if (!trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    return NextResponse.json(trip, { status: 200 });
  } catch (error) {
    console.error("Server error: ", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
