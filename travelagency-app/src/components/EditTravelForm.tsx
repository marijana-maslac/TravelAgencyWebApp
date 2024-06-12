"use client";
import { travelSchema } from "@/validation/travelSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "@/styles/form.css";
import axios from "axios";
import { useRouter } from "next/navigation";

type TravelFormData = z.infer<typeof travelSchema>;

interface EditTravelFormProps {
  tripId: number;
}

const EditTravelForm = ({ tripId }: EditTravelFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<TravelFormData | null>(null);

  const categories = [
    "Europe",
    "Asia",
    "Africa",
    "NorthAmerica",
    "SouthAmerica",
    "Australia",
  ];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TravelFormData>({
    resolver: zodResolver(travelSchema),
  });

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await axios.get(`/api/travel/${tripId}`);
        const trip = response.data;

        setInitialData(trip);
        setValue("name", trip.name);
        setValue("description", trip.description);
        setValue("category", trip.category);
        setValue("price", trip.price);
        setValue("date", trip.date.split("T")[0]);
        setValue("endDate", trip.endDate.split("T")[0]);
      } catch (error) {
        console.error("Error fetching trip: ", error);
      }
    };

    fetchTrip();
  }, [tripId, setValue]);

  const onSubmit = async (values: TravelFormData) => {
    setIsSubmitting(true);
    setServerError(null);
    try {
      await axios.put(`/api/travel/${tripId}`, values);
      router.push(`/travel/${tripId}`);
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
        <label className="form-label">Name</label>
        <input
          className="form-input"
          {...register("name")}
          type="text"
          placeholder="Destination.."
        />
        {errors.name && (
          <div className="error-message">Enter name for new destination</div>
        )}
        <label className="form-label">Description</label>
        <input
          className="form-input"
          {...register("description")}
          type="text"
          placeholder="Description.."
        />
        {errors.description && (
          <div className="error-message">Enter description</div>
        )}
        <label className="form-label">Category</label>
        <select className="form-select" {...register("category")}>
          <option value="">Select a category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <div className="error-message">Select a category</div>
        )}

        <label className="form-label">Price</label>
        <input
          className="form-input"
          {...register("price")}
          placeholder="Price in €"
        />
        {errors.price && <div className="error-message">Enter price</div>}
        <label className="form-label">Date</label>
        <input className="form-input" {...register("date")} type="date" />
        {errors.date && <div className="error-message">Enter date</div>}
        <label className="form-label">End Date</label>
        <input className="form-input" {...register("endDate")} type="date" />
        {errors.endDate && <div className="error-message">Enter end date</div>}

        <button className="form-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        {serverError && <div className="error-message">{serverError}</div>}
      </form>
    </div>
  );
};

export default EditTravelForm;
