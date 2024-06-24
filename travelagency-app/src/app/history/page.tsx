import ReservationList from "@/components/ReservationList";
import { getServerSession } from "next-auth";
import React from "react";
import options from "../api/auth/[...nextauth]/options";
import prisma from "../../../prisma/db";

const HistoryPage = async () => {
  const session = await getServerSession(options);
  const userEmail = session?.user.email;
  const user = await prisma.user.findFirst({
    where: { email: userEmail },
    select: { id: true },
  });
  const userID = user?.id || 1;
  console.log(userID);
  return (
    <div>
      <h1>History of My Trips</h1>
      <ReservationList userId={userID} />
    </div>
  );
};

export default HistoryPage;
