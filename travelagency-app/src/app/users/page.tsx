import React from "react";
import UserDataTable from "./UserDataTable";
import prisma from "../../../prisma/db";
import Link from "next/link";
import { getServerSession } from "next-auth";
import options from "../api/auth/[...nextauth]/options";

const Users = async () => {
  const session = await getServerSession(options);
  if (session?.user.role !== "ADMIN") {
    return <p>Admin access required</p>;
  }

  const users = await prisma.user.findMany();

  return (
    <div>
      <Link className="link-button" href="/users/addUser">
        New User
      </Link>
      <UserDataTable users={users} />
    </div>
  );
};

export default Users;
