"use client";
import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";
import Link from "next/link";

const Travel = () => {
  const [trips, setTrips] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTrips = async (page: number) => {
    const response = await fetch(`/api/travel?page=${page}&limit=8`);
    const data = await response.json();
    setTrips(data.trips);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchTrips(currentPage);
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="travel-container">
      <Link className="link-button" href="/travel/addTrip">
        New Trip
      </Link>
      <DataTable trips={trips} />
      <div className="btn-buttons">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Travel;
