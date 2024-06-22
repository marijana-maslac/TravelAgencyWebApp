import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, travelListingId } = body;

    const newReservation = await prisma.reservation.create({
      data: {
        userId,
        travelListingId,
      },
    });
    return NextResponse.json(newReservation, { status: 201 });
  } catch (error) {
    console.error("Server error: ", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;
    const reservation = await prisma.reservation.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json(reservation, { status: 200 });
  } catch (error) {
    console.error("Server error: ", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

interface Props {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: Props) {
  const reservationId = parseInt(params.id, 10);
  if (isNaN(reservationId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const reservations = await prisma.reservation.findUnique({
      where: { id: reservationId },
    });

    if (!reservations) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(reservations, { status: 200 });
  } catch (error) {
    console.error("Server error: ", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
