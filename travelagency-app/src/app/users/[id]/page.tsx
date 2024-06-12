import React from "react";
import prisma from "../../../../prisma/db";
import UserDetail from "./userDetail";

interface Props {
  params: { id: string };
}

const UserDetailPage = async ({ params }: Props) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return <p>User not found</p>;
  }

  return <UserDetail user={user} />;
};

export default UserDetailPage;
