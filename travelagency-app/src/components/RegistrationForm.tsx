"use client";
import { userSchema } from "@/validation/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "@/styles/form.css";
import axios from "axios";
import { useRouter } from "next/navigation";

type UserFormData = z.infer<typeof userSchema>;

const RegistrationForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const roleOptions = ["USER", "ADMIN"];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (values: UserFormData) => {
    setIsSubmitting(true);
    setServerError(null);
    try {
      await axios.post("/api/registration", values);
      router.push("/");
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

  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <label className="form-label">Username</label>
        <input
          className="form-input"
          {...register("username")}
          type="text"
          placeholder="Username.."
        />
        {errors.username && (
          <div className="error-message">Enter a new username</div>
        )}
        <label className="form-label">E-mail</label>
        <input
          className="form-input"
          {...register("email")}
          type="text"
          placeholder="email.."
        />
        {errors.email && <div className="error-message">Enter e-mail</div>}
        <label className="form-label">Password</label>
        <input
          type="password"
          required
          className="form-input"
          {...register("password")}
          placeholder="Password"
        />
        {errors.password && <div className="error-message">Enter password</div>}
        <label className="form-label">Role</label>
        <select className="form-select" {...register("role")}>
          <option value="">Select a role</option>
          {roleOptions.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </select>
        {errors.role && (
          <div className="error-message">{errors.role.message}</div>
        )}

        <button className="form-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating account.." : "Create an account"}
        </button>
        {serverError && <div className="error-message">{serverError}</div>}
      </form>
    </div>
  );
};
export default RegistrationForm;
