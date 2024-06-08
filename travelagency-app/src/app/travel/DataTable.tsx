import React from "react";
import Link from "next/link";
import { TravelListing } from "@prisma/client";
import "@/styles/travel.css";

interface Props {
  trips: TravelListing[];
}

const DataTable = ({ trips }: Props) => {
  return (
    <div>
      <h2 className="travel-heading">Travel Destinations</h2>
      <table className="travel-table">
        <thead></thead>
        <tbody>
          {trips
            ? trips.map((trip) => (
                <tr key={trip.id} data-href="/">
                  <td className="travel-text">{trip.name}</td>
                  <td className="travel-text">{trip.price}€</td>
                  <td className="travel-text">
                    {trip.date.toLocaleDateString()}
                  </td>
                  <td>
                    <Link className="travel-text" href={`/travel/${trip.id}`}>
                      Read More
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
