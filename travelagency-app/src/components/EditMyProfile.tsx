"use client";
import { userSchema } from "@/validation/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "@/styles/form.css";
import axios from "axios";
import { useRouter } from "next/navigation";

type UserFormData = z.infer<typeof userSchema>;

interface EditUserFormProps {
  userId: number;
}

const EditMyProfile = ({ userId }: EditUserFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<UserFormData | null>(null);

  const role = ["USER", "ADMIN"];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        const user = response.data;

        setInitialData(user);
        setValue("username", user.username);
        setValue("email", user.email);
        setValue("role", user.role);
      } catch (error) {
        console.error("Error fetching user: ", error);
      }
    };

    fetchUser();
  }, [userId, setValue]);

  const onSubmit = async (values: UserFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    const updatedValues = { ...values };
    if (!updatedValues.password) {
      delete updatedValues.password;
    }

    // console.log("Form Values Submitted:", updatedValues);

    try {
      await axios.patch(`/api/users/${userId}`, updatedValues);
      router.push(`/myProfile`);
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
        <label className="form-label">Username</label>
        <input
          className="form-input"
          {...register("username")}
          type="text"
          placeholder="Destination.."
        />
        {errors.username && <div className="error-message">Enter username</div>}
        <label className="form-label">E-mail</label>
        <input
          className="form-input"
          {...register("email")}
          type="text"
          placeholder="E-mail.."
        />
        {errors.email && <div className="error-message">Enter E-mail</div>}
        <label className="form-label">Password</label>
        <input
          className="form-input"
          {...register("password")}
          type="password"
          placeholder="Password.."
        />
        {errors.password && <div className="error-message">Enter Password</div>}
        <label className="form-label">Role</label>
        <select className="form-select" {...register("role")}>
          <option value="">Select Role</option>
          {role.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </select>
        {errors.role && <div className="error-message">Select Role</div>}

        <button className="form-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        {serverError && <div className="error-message">{serverError}</div>}
      </form>
    </div>
  );
};

export default EditMyProfile;
