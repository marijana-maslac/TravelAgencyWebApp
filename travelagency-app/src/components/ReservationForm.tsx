"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TravelListing, User } from "@prisma/client";
import axios from "axios";

interface Props {
  trip: TravelListing;
}

const ReservationForm = ({ trip }: Props) => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/reservation", {
        userId: 2,
        travelListingId: trip.id,
      });
      router.push("/reservations");
      router.refresh();
    } catch (error: any) {
      console.error("Submission error: ", error);
      setError(error.response?.data?.message || "Unknown Error ");
    } finally {
    }
  };

  return (
    <div>
      <h1>Reservation Form</h1>
      <p>Trip: {trip.name}</p>
      <p>Price: {trip.price}</p>
      <p>Departure: {trip.date.toLocaleDateString("en-UK")}</p>
      <p>Return: {trip.endDate.toLocaleDateString("en-UK")}</p>
      <form onSubmit={handleSubmit}>
        <button type="submit">Make Reservation</button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default ReservationForm;
