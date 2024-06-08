import React from "react";
import prisma from "../../../../prisma/db";
import TripDetail from "./tripDetail";

interface Props {
  params: { id: string };
}

const ViewTravel = async ({ params }: Props) => {
  const trip = await prisma.travelListing.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!trip) {
    return <p>Trip not found </p>;
  }
  return <TripDetail trip={trip} />;
};

export default ViewTravel;
