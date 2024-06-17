import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
    const category = searchParams.get("category") || "";
    const month = searchParams.get("month") || "";
    const year = searchParams.get("year") || "";

    const offset = (page - 1) * limit;

    let where: Prisma.TravelListingWhereInput = {};

    if (category) {
      where.category = {
        equals: category,
      };
    }

    if (year && month) {
      const parsedMonth = parseInt(month, 10);
      const parsedYear = parseInt(year, 10);
      if (
        !isNaN(parsedMonth) &&
        parsedMonth >= 1 &&
        parsedMonth <= 12 &&
        !isNaN(parsedYear)
      ) {
        const startDate = new Date(parsedYear, parsedMonth - 1, 1);
        const endDate = new Date(parsedYear, parsedMonth, 0);

        where.date = {
          gte: startDate,
          lte: endDate,
        };
      }
    } else if (month && !year) {
      const parsedMonth = parseInt(month, 10);
      if (!isNaN(parsedMonth) && parsedMonth >= 1 && parsedMonth <= 12) {
        // Postavljanje datuma za filtriranje samo po mjesecu
        const today = new Date();
        const startDate = new Date(today.getFullYear(), parsedMonth - 1, 1);
        const endDate = new Date(today.getFullYear(), parsedMonth, 0);

        where.date = {
          gte: startDate,
          lte: endDate,
        };
      }
    } else if (!month && year) {
      // Filtriranje samo po godini
      const parsedYear = parseInt(year, 10);
      if (!isNaN(parsedYear)) {
        const startDate = new Date(parsedYear, 0, 1); // 1. siječnja odabrane godine
        const endDate = new Date(parsedYear, 11, 31); // 31. prosinca odabrane godine

        where.date = {
          gte: startDate,
          lte: endDate,
        };
      }
    }

    // Ako nisu odabrani ni mjesec ni godina, prikaži sve putovanja od danas
    if (!month && !year) {
      where.date = {
        gte: new Date(), // Filtriraj putovanja koja su od danas
      };
    }

    const trips = await prisma.travelListing.findMany({
      where,
      skip: offset,
      take: limit,
    });

    const totalTrips = await prisma.travelListing.count({ where });

    return NextResponse.json({
      trips,
      totalTrips,
      page,
      totalPages: Math.ceil(totalTrips / limit),
    });
  } catch (error) {
    console.error("Server error: ", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
