import { TravelDestination } from "@prisma/client";
import React from "react";

interface Props {
  trips: TravelDestination[];
}

const DataTable = ({ trips }: Props) => {
  //console.log(trips);
  return (
    <div>
      <h2>Travel Destinations</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {trips
            ? trips.map((trip) => (
                <tr key={trip.id} data-href="/">
                  <td>{trip.id}</td>
                  <td>{trip.name}</td>
                  <td>{trip.description}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
