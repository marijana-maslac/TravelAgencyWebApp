import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "";
    const priceCategory = searchParams.get("priceCategory") || "";
    const month = searchParams.get("month") || "";
    const year = searchParams.get("year") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "8", 10);

    let where: Prisma.TravelListingWhereInput = {};

    if (category) {
      where.category = {
        equals: category,
      };
    }
    if (priceCategory) {
      where.priceCategory = {
        equals: priceCategory,
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
        const today = new Date();
        const startDate = new Date(today.getFullYear(), parsedMonth - 1, 1);
        const endDate = new Date(today.getFullYear(), parsedMonth, 0);

        where.date = {
          gte: startDate,
          lte: endDate,
        };
      }
    } else if (!month && year) {
      const parsedYear = parseInt(year, 10);
      if (!isNaN(parsedYear)) {
        const startDate = new Date(parsedYear, 0, 1);
        const endDate = new Date(parsedYear, 11, 31);

        where.date = {
          gte: startDate,
          lte: endDate,
        };
      }
    }

    if (!month && !year) {
      where.date = {
        gte: new Date(),
      };
    }

    const offset = (page - 1) * limit;

    const trips = await prisma.travelListing.findMany({
      where,
      skip: offset,
      take: limit,
    });

    const totalTripsCount = await prisma.travelListing.count({ where });

    const totalPages = Math.ceil(totalTripsCount / limit);

    return NextResponse.json({
      trips,
      totalPages,
    });
  } catch (error) {
    console.error("Server error: ", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
