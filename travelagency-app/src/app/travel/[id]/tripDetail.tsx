import { TravelListing } from "@prisma/client";
import React from "react";
import "@/styles/travel.css";
import Link from "next/link";

interface Props {
  trip: TravelListing;
}

const TripDetail = ({ trip }: Props) => {
  return (
    <div className="card">
      <p className="cardHeader">{trip.name}</p>
      <p className="cardDescription">{trip.description}</p>
      <p className="cardPrice">{trip.price} €</p>
      <p className="cardDate">{trip.date.toLocaleDateString()}</p>
      <div className="button-style">
        <Link href={`/travel/edit/${trip.id}`} className="link-button">
          Edit
        </Link>
        <Link href={`/travel/delete/${trip.id}`} className="link-button">
          Delete
        </Link>
      </div>
    </div>
  );
};

export default TripDetail;
