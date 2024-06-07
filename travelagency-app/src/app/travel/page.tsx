import React from "react";
import prisma from "../../../prisma/db";
import DataTable from "./DataTable";

const Travel = async () => {
  const travel = await prisma.travelListing.findMany();
  return (
    <div>
      <DataTable trips={travel} />
    </div>
  );
};

export default Travel;
