import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const currentDate = new Date();

  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        status: "CONFIRMED",
        travelListing: {
          date: {
            lte: currentDate,
          },
        },
      },
      include: {
        user: true,
        travelListing: true,
      },
    });

    return NextResponse.json(reservations);
  } catch (error) {
    console.error("Error fetching confirmed past reservations:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
