"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

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

interface ReservationFormProps {
  trip: TravelListing;
}

const ReservationPage: React.FC<ReservationFormProps> = ({ trip }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") || "";
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/reservation", {
        userId: parseInt(userId, 10),
        travelListingId: trip.id,
      });
      router.push("/reservations");
      router.refresh();
    } catch (error: any) {
      console.error("Submission error: ", error);
      setError(error.response?.data?.message || "Unknown Error");
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

export default ReservationPage;
