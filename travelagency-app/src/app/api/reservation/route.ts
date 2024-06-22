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
