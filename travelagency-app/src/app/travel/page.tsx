import React from "react";
import prisma from "../../../prisma/db";
import DataTable from "./DataTable";
import Link from "next/link";

const Travel = async () => {
  const travel = await prisma.travelListing.findMany();
  return (
    <div className="travel-container">
      <Link className="link-button" href="/travel/addTrip">
        New Trip
      </Link>
      <DataTable trips={travel} />
    </div>
  );
};

export default Travel;
