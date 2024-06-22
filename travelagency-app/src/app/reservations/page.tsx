import React from "react";
import prisma from "../../../prisma/db";
import ReservationTable from "./ReservationTable";

const Reservations = async () => {
  const reservations = await prisma.reservation.findMany();

  return (
    <div>
      <ReservationTable reservations={reservations} />
    </div>
  );
};

export default Reservations;
