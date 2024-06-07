import React from "react";
import Link from "next/link";
import { TravelListing } from "@prisma/client";
import "@/styles/travel.css";

interface Props {
  trips: TravelListing[];
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
            <th className="travel-highlight">Price</th>
            <th className="travel-highlight">Date</th>
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
                  <td className="travel-text">{trip.price}€</td>
                  <td className="travel-text">{trip.date.toLocaleString()}</td>
                  <td>
                    <Link
                      className="travel-highlight"
                      href={`/travel/${trip.id}`}
                    >
                      Show More
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
