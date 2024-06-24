import RegistrationForm from "@/components/RegistrationForm";
import dynamic from "next/dynamic";
import React from "react";

const UserForm = dynamic(() => import("@/components/UserForm"), {
  ssr: false,
});
const Registration = () => {
  return <RegistrationForm />;
};

export default Registration;
