import React from "react";
import Link from "next/link";
import { TravelDestination } from "@prisma/client";
import "@/styles/travel.css";

interface Props {
  trips: TravelDestination[];
}

const DataTable = ({ trips }: Props) => {
  return (
    <div className="travel-container">
      <h2 className="travel-heading">Travel Destinations</h2>
      <table className="travel-table">
        <thead>
          <tr>
            <th className="travel-highlight">ID</th>
            <th className="travel-highlight">Name</th>
            <th className="travel-highlight">Description</th>
            <th className="travel-highlight">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trips
            ? trips.map((trip) => (
                <tr key={trip.id} data-href="/">
                  <td className="travel-text">{trip.id}</td>
                  <td className="travel-text">{trip.name}</td>
                  <td className="travel-text">{trip.description}</td>
                  <td>
                    <Link
                      className="travel-highlight"
                      href={`/travel/${trip.id}`}
                    >
                      Show Listings
                    </Link>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
