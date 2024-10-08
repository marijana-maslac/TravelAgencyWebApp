import { TravelListing } from "@prisma/client";
import React from "react";
import "@/styles/travel.css";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";
import prisma from "../../../../prisma/db";

interface Props {
  trip: TravelListing;
}

const TripDetail = async ({ trip }: Props) => {
  const session = await getServerSession(options);
  const userEmail = session?.user.email;

  const user = await prisma.user.findFirst({
    where: { email: userEmail },
    select: { id: true },
  });

  const userID = user?.id || 1;
  console.log(userID);

  return (
    <div className="card">
      <p className="cardHeader">{trip.name}</p>
      <p className="cardDescription">{trip.description}</p>
      <p className="cardPrice">Price: {trip.price} €</p>
      <p className="cardDate">
        Departure: {trip.date.toLocaleDateString("en-UK")}
      </p>
      <p className="cardDate">
        Return: {trip.endDate.toLocaleDateString("en-UK")}
      </p>
      <div className="button-style">
        {session?.user.role == "ADMIN" ? (
          <>
            <Link href={`/travel/edit/${trip.id}`} className="link-button">
              Edit
            </Link>
            <DeleteButton tripId={trip.id} />
          </>
        ) : null}
        {session?.user.role != "ADMIN" ? (
          <>
            <Link
              href={`/reservations/${trip.id}?userId=${userID}`}
              className="link-button"
            >
              Book a trip
            </Link>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default TripDetail;
