import React from "react";
import Link from "next/link";
import { Reservation } from "@prisma/client";
import DeleteButton from "./[id]/DeleteButton";

interface Props {
  reservations: Reservation[];
}

const ReservationDataTable: React.FC<Props> = ({ reservations }) => {
  return (
    <div>
      <h2 className="reservation-heading">Reservation Information</h2>
      <table className="reservation-table">
        <thead>
          <tr>
            <th>Reservation ID </th>
            <th className="reservation-text">User ID</th>
            <th className="reservation-text">Travel Listing ID</th>
            <th className="reservation-text">Status</th>
            <th className="reservation-text">Created At</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td className="reservation-text">{reservation.id}</td>
              <td className="reservation-text">{reservation.userId}</td>
              <td className="reservation-text">
                {reservation.travelListingId}
              </td>
              <td className="reservation-text">{reservation.status}</td>
              <td className="reservation-text">
                {new Date(reservation.createdAt).toLocaleDateString("en-UK")}
              </td>
              <td>
                <Link
                  className="reservation-text"
                  href={`/reservations/edit/${reservation.id}`}
                >
                  Edit
                </Link>
              </td>
              <td>
                <DeleteButton reservationId={reservation.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationDataTable;
