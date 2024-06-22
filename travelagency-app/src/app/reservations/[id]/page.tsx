import React from "react";
import prisma from "../../../../prisma/db";
import ReservationForm from "@/components/ReservationForm";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";

interface Props {
  params: { id: string };
}

const ViewTravel = async ({ params }: Props) => {
  const session = await getServerSession(options);
  if (!session || !session.user) {
    return <p>Session not found or user not logged in</p>;
  }
  if (session?.user.role !== "USER") {
    return <p>Must be a user to make a reservation</p>;
  }

  const trip = await prisma.travelListing.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!trip) {
    return <p>Trip not found</p>;
  }

  return <ReservationForm trip={trip} />;
};

export default ViewTravel;
