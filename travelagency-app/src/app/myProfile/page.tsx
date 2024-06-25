import React from "react";
import { getServerSession } from "next-auth";
import options from "../api/auth/[...nextauth]/options";
import prisma from "../../../prisma/db";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

const MyProfilePage = async () => {
  const session = await getServerSession(options);
  if (!session) {
    return <Link href={"/"}> Return to home page</Link>;
  }
  const userEmail = session?.user.email;
  const user = await prisma.user.findFirst({
    where: { email: userEmail },
    select: { id: true, username: true, email: true, role: true },
  });

  console.log(user?.id);
  return (
    <div>
      <h2>My Profile</h2>
      <p>ID: {user?.id}</p>
      <p>Username: {user?.username}</p>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
      <Link href={`/myProfile/edit/${user?.id}`}>Edit Profile</Link>
      <DeleteButton userId={user!.id} />
    </div>
  );
};

export default MyProfilePage;
