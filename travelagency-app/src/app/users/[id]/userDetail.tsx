import { User } from "@prisma/client";
import React from "react";
import "@/styles/user.css";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

interface Props {
  user: User;
}

const UserDetail = ({ user }: Props) => {
  return (
    <div>
      <p>Username: {user.username}</p>
      <p>E-mail: {user.email}</p>
      <p>Password: {user.password}</p>
      <p>createdAt: {user.createdAt.toLocaleDateString("en-UK")}</p>
      <p>Role: {user.role}</p>
      <div className="button-style">
        <Link href={`/users/edit/${user.id}`} className="link-button">
          Edit
        </Link>
        <DeleteButton userId={user.id} />
      </div>
    </div>
  );
};

export default UserDetail;
