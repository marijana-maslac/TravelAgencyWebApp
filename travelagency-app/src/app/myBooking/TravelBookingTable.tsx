"use client";
import React, { useState } from "react";
import { Reservation, TravelListing, ReservationStatus } from "@prisma/client";

interface Props {
  reservations: (Reservation & { travelListing: TravelListing })[];
}

const TravelBookingTable: React.FC<Props> = ({ reservations }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFutureDate = (date: Date) => {
    const today = new Date();
    return date > today;
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    reservationId: number,
    tripName: string
  ) => {
    e.preventDefault();

    const selectedReservation = reservations.find(
      (reservation) => reservation.id === reservationId
    );

    if (!selectedReservation) {
      console.error("Selected reservation not found");
      return;
    }

    if (
      selectedReservation.status !== ReservationStatus.PENDING &&
      selectedReservation.status !== ReservationStatus.CONFIRMED
    ) {
      alert(
        "Cancellation request is only allowed for Pending or Confirmed status."
      );
      return;
    }

    if (!isFutureDate(new Date(selectedReservation.travelListing.date))) {
      alert("Cancellation request is only allowed for future trips.");
      return;
    }

    const subject = "Cancellation Request for Reservation";
    const body = `Dear Admin,

I would like to request cancellation for the following reservation:

Trip: ${selectedReservation.travelListing.name}
Date: ${new Date(selectedReservation.travelListing.date).toLocaleDateString(
      "en-UK"
    )}

Reservation ID: ${selectedReservation.id}

Details:
Name: ${formData.name}
Email: ${formData.email}
Message:
${formData.message}

Please process my cancellation request at your earliest convenience.

Thank you,
${formData.name}`;

    const mailtoLink = `mailto:marijana.maslac98@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div>
      <h2 className="reservation-heading">Reservation Information</h2>
      <table className="reservation-table">
        <thead>
          <tr>
            <th>Trip</th>
            <th>Date</th>
            <th>Return Date</th>
            <th>Category</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.travelListing.name}</td>
              <td>
                {new Date(reservation.travelListing.date).toLocaleDateString(
                  "en-UK"
                )}
              </td>
              <td>
                {new Date(reservation.travelListing.endDate).toLocaleDateString(
                  "en-UK"
                )}
              </td>
              <td>{reservation.travelListing.category}</td>
              <td>{reservation.travelListing.price} €</td>
              <td>{reservation.status}</td>
              <td>
                {(reservation.status === ReservationStatus.PENDING ||
                  reservation.status === ReservationStatus.CONFIRMED) &&
                isFutureDate(new Date(reservation.travelListing.date)) ? (
                  <form
                    onSubmit={(e) =>
                      handleSubmit(
                        e,
                        reservation.id,
                        reservation.travelListing.name
                      )
                    }
                  >
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <br />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <br />
                    <textarea
                      name="message"
                      placeholder="Message to Admin"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                    <br />
                    <button type="submit">Request Cancellation</button>
                  </form>
                ) : (
                  <span>
                    {reservation.status === ReservationStatus.CANCELLED ||
                    !isFutureDate(new Date(reservation.travelListing.date))
                      ? "Cancellation not available"
                      : "Pending or Confirmed status and future trip required"}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TravelBookingTable;
