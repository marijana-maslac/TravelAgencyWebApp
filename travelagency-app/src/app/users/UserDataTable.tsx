import React from "react";
import Link from "next/link";
import { User } from "@prisma/client";
import "@/styles/user.css";

interface Props {
  users: User[];
}

const UserDataTable = ({ users }: Props) => {
  return (
    <div>
      <h2 className="user-heading">User Information</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th className="user-text">Username</th>
            <th className="user-text">E-mail</th>
            <th className="user-text">Role</th>
            <th className="user-text">Registered At</th>
          </tr>
        </thead>
        <tbody>
          {users
            ? users.map((user) => (
                <tr key={user.id} data-href="/">
                  <td className="user-text">{user.username}</td>
                  <td className="user-text">{user.email}</td>
                  <td className="user-text">{user.role}</td>
                  <td className="user-text">
                    {new Date(user.createdAt).toLocaleString("en-UK")}
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default UserDataTable;
