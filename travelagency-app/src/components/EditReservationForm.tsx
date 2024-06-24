"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";

type ReservationFormData = {
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
};

interface TravelListing {
  date: string;
}

interface Reservation {
  id: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  travelListing: TravelListing;
}

interface EditReservationFormProps {
  reservationId: number;
}

const EditReservationForm: React.FC<EditReservationFormProps> = ({
  reservationId,
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<Reservation | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(false); // Initialize with false

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ReservationFormData>();

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await axios.get(`/api/reservation/${reservationId}`);
        const reservation: Reservation = response.data;

        setInitialData(reservation);
        setValue("status", reservation.status);

        const tripDate = reservation.travelListing.date
          ? new Date(reservation.travelListing.date)
          : null;
        const currentDate = new Date();

        setIsDisabled(tripDate != null && tripDate <= currentDate); // Update isDisabled state based on the trip date comparison
      } catch (error) {
        console.error("Error fetching reservation: ", error);
      }
    };

    fetchReservation();
  }, [reservationId, setValue]);

  const onSubmit = async (values: ReservationFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      await axios.patch(`/api/reservation/${reservationId}`, {
        status: values.status,
      });
      router.push(`/reservations`);
      router.refresh();
    } catch (error: any) {
      console.error("Submission error: ", error);
      setServerError(
        error.response?.data?.message || "An unknown error occurred."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!initialData) {
    return <div>Loading...</div>;
  }

  const { status } = initialData;

  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <label className="form-label">Status</label>
        <select
          className="form-select"
          {...register("status")}
          defaultValue={initialData.status}
          disabled={isDisabled} // Directly use isDisabled state here
        >
          <option value="PENDING" disabled={status !== "PENDING"}>
            PENDING
          </option>
          <option value="CONFIRMED" disabled={status === "CONFIRMED"}>
            CONFIRMED
          </option>
          <option value="CANCELLED" disabled={status === "CANCELLED"}>
            CANCELLED
          </option>
        </select>
        {errors.status && <div className="error-message">Select Status</div>}

        <button
          className="form-button"
          type="submit"
          disabled={isSubmitting || isDisabled} // Directly use isDisabled state here
        >
          {isSubmitting ? "Submitting..." : "Update Status"}
        </button>
        {serverError && <div className="error-message">{serverError}</div>}
        {isDisabled && (
          <div className="error-message">
            Cannot change status because trip date is in the past or today.
          </div>
        )}
      </form>
    </div>
  );
};

export default EditReservationForm;
