import React from "react";
import UserDataTable from "./UserDataTable";
import prisma from "../../../prisma/db";
import Link from "next/link";

const Users = async () => {
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
