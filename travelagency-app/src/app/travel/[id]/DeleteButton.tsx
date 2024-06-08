"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DeleteButton = ({ tripId }: { tripId: number }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteTrip = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/travel/${tripId}`);
      router.push("/travel");
      router.refresh();
    } catch (error) {
      setIsDeleting(false);
      setError("Failed to delete trip.");
    }
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this trip?"
    );
    if (confirmed) {
      deleteTrip();
    }
  };

  return (
    <div>
      <button
        className="link-button"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        Delete
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default DeleteButton;
