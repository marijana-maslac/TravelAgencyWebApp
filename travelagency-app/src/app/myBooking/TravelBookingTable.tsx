import React from "react";
import Link from "next/link";
import { Reservation, TravelListing } from "@prisma/client";

interface Props {
  reservations: (Reservation & { travelListing: TravelListing })[];
}

const TravelBookingTable: React.FC<Props> = ({ reservations }) => {
  return (
    <div>
      <h2 className="reservation-heading">Reservation Information</h2>
      <table className="reservation-table">
        <thead>
          <tr>
            <th>Trip</th> <th>Created At</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.travelListing.name}</td>{" "}
              <td>
                {new Date(reservation.createdAt).toLocaleDateString("en-UK")}
              </td>{" "}
              <td>{reservation.status}</td>
              <td>
                <Link href={`/reservations/edit/${reservation.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TravelBookingTable;
