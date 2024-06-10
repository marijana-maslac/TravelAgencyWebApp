import React from "react";
import prisma from "../../../../prisma/db";
import UserForm from "@/components/UserForm";

interface Props {
  params: { id: string };
}
const EditUser = async ({ params }: Props) => {
  const user = await prisma?.user.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!user) {
    return <p>User not found</p>;
  }
  user.password = "";
  return <UserForm />;
};

export default EditUser;
