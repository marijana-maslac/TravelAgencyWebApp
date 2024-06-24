import React from "react";
import prisma from "../../../../prisma/db";
import ReservationForm from "@/components/ReservationForm";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";

interface Props {
  params: { id: string };
}

const ViewTravel = async ({ params }: Props) => {
  const session = await getServerSession(options);
  if (!session || !session.user) {
    return (
      <div>
        <h2>Only users can book a trip.</h2>
        <h3>
          Click <Link href="/api/auth/signin">here</Link> to sign in. <br></br>
          If you don't have an account, click
          <Link href="/users/addUser"> here</Link> to create an account.
        </h3>
      </div>
    );
  }
  if (session?.user.role !== "USER") {
    return <p>Must be a user to make a reservation</p>;
  }
  if (!session || !session.user) {
    return {};
  }
  const trip = await prisma.travelListing.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!trip) {
    return <p>Trip not found</p>;
  }
  if (session?.user.role == "USER") {
    return <p>You made a reservation</p>;
  }
  return <ReservationForm trip={trip} />;
};

export default ViewTravel;
