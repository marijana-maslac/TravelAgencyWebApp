"use client";
import { travelSchema } from "@/validation/travelSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "@/styles/form.css";
import axios from "axios";
import { useRouter } from "next/navigation";

type TravelFormData = z.infer<typeof travelSchema>;

const TravelForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TravelFormData>({
    resolver: zodResolver(travelSchema),
  });

  const onSubmit = async (values: TravelFormData) => {
    setIsSubmitting(true);
    setServerError(null);
    try {
      await axios.post("/api/travel", values);
      router.push("/travel");
      reset();
    } catch (error: any) {
      console.error("Submission error: ", error);
      setServerError(
        error.response?.data?.message || "An unknown error occurred."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <button className="link-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        {serverError && <div className="error-message">{serverError}</div>}
      </form>
    </div>
  );
};
export default TravelForm;
