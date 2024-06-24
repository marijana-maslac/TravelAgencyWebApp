"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface TravelListing {
  id: number;
  name: string;
  description: string | null;
  price: string;
  date: Date;
  endDate: Date;
  category: string;
  priceCategory: string;
}

interface User {
  id: number;
  username: string;
  email: string;
}

interface Reservation {
  id: number;
  userId: number;
  travelListingId: number;
  status: string;
  createdAt: Date;
  user: User;
  travelListing: TravelListing;
}

const ReservationList: React.FC<{ userId: number }> = ({ userId }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const response = await axios.get("/api/history");
        const data: Reservation[] = response.data;

        const filteredReservations = data.filter(
          (reservation) =>
            reservation.userId === userId &&
            reservation.status === "CONFIRMED" &&
            new Date(reservation.travelListing.date) <= new Date()
        );

        setReservations(filteredReservations);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    }

    fetchReservations();
  }, [userId]);

  return (
    <div>
      {reservations.length === 0 ? (
        <p>No confirmed past reservations found.</p>
      ) : (
        reservations.map((reservation) => (
          <div key={reservation.id}>
            <p>Reservation ID: {reservation.id}</p>
            <p></p>
            User: {reservation.user.username}
            <p>Email: {reservation.user.email}</p>
            <p>
              Trip: {reservation.travelListing.name} -{" "}
              {new Date(reservation.travelListing.date).toLocaleDateString()}
            </p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default ReservationList;
