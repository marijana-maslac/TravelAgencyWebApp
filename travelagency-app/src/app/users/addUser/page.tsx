import dynamic from "next/dynamic";
import React from "react";

const UserForm = dynamic(() => import("@/components/UserForm"), {
  ssr: false,
});
const AddUser = () => {
  return <UserForm />;
};

export default AddUser;
