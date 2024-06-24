import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/db";

export async function GET(request: NextRequest) {
  try {
    const reservations = await prisma.reservation.findMany({
      include: {
        user: true,
        travelListing: true,
      },
    });
    return NextResponse.json(reservations, { status: 200 });
  } catch (error) {
    console.error("Error fetching reservations.", { status: 500 });
    return NextResponse.json(
      { message: "Error occured while fetching reservations" },
      { status: 500 }
    );
  }
}
