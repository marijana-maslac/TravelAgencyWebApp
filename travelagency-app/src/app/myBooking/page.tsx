import React from "react";
import prisma from "../../../prisma/db";
import TravelBookingTable from "./TravelBookingTable";
import { getServerSession } from "next-auth";
import options from "../api/auth/[...nextauth]/options";

const MyBooking = async () => {
  const session = await getServerSession(options);
  const userEmail = session?.user.email;

  const user = await prisma.user.findFirst({
    where: { email: userEmail },
    select: { id: true, username: true, email: true, role: true },
  });

  if (!user) {
    return null;
  }

  const reservations = await prisma.reservation.findMany({
    where: { userId: user.id },
    include: { travelListing: true },
  });

  return (
    <div>
      <TravelBookingTable reservations={reservations} />
    </div>
  );
};

export default MyBooking;
