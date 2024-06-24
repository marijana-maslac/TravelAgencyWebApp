"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ContactAdminPage: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const subject = "Cancellation Request for Reservation";
    const body = `Dear Admin,

I would like to request cancellation for the following reservation:

Reservation ID: 

Details:
Name: ${formData.name}
Email: ${formData.email}
Message:
${formData.message}

Please process my cancellation request at your earliest convenience.

Thank you,
${formData.name}`;

    const mailtoLink = `mailto:marijana.maslac98@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div>
      <h2>Contact Admin to Cancel Reservation</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Your Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Your Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Message to Admin:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactAdminPage;
