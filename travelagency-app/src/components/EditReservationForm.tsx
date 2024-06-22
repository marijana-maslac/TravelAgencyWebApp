"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

type ReservationFormData = {
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
};

interface EditReservationFormProps {
  reservationId: number;
}

const EditReservationForm = ({ reservationId }: EditReservationFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<ReservationFormData | null>(
    null
  );

  const statusOptions = ["PENDING", "CONFIRMED", "CANCELLED"];

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
        const reservation = response.data;

        setInitialData({ status: reservation.status });
        setValue("status", reservation.status);
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

  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <label className="form-label">Status</label>
        <select
          className="form-select"
          {...register("status")}
          defaultValue={initialData.status}
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        {errors.status && <div className="error-message">Select Status</div>}

        <button className="form-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Update Status"}
        </button>
        {serverError && <div className="error-message">{serverError}</div>}
      </form>
    </div>
  );
};

export default EditReservationForm;
