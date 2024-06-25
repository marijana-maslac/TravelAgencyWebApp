"use client";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DeleteButton = ({ userId }: { userId: number }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteUser = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/myprofile/${userId}`);
      router.push("/myProfile");
      signOut();
    } catch (error) {
      setIsDeleting(false);
      setError("Failed to delete user.");
    }
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      deleteUser();
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
