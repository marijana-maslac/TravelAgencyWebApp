import { travelSchema } from "@/validation/travelSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = travelSchema.safeParse(body);

    if (!validation.success) {
      console.error("Validation error: ", validation.error);
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const { name, description, price, date, category } = body;

    const formattedDate = new Date(date);

    const newTrip = await prisma.travelListing.create({
      data: {
        name,
        description,
        price,
        date: formattedDate,
        category,
      },
    });

    return NextResponse.json(newTrip, { status: 201 });
  } catch (error) {
    console.error("Server error: ", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
