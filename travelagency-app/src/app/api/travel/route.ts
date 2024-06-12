import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, description, price, date, endDate, category } = body;

    const formattedDate = new Date(date);
    const formattedEndDate = new Date(endDate);

    const newTrip = await prisma.travelListing.create({
      data: {
        name,
        description,
        price,
        date: formattedDate,
        endDate: formattedEndDate,
        category,
      },
    });

    return NextResponse.json(newTrip, { status: 201 });
  } catch (error) {
    console.error("Server error: ", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "5");

    const offset = (page - 1) * limit;

    const trips = await prisma.travelListing.findMany({
      skip: offset,
      take: limit,
    });

    const totalTrips = await prisma.travelListing.count();

    return NextResponse.json({
      trips,
      totalTrips,
      page,
      totalPages: Math.ceil(totalTrips / limit),
    });
  } catch (error) {
    console.error("Server error: ", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
