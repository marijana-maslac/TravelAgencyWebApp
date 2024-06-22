import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";

const MainNav = async () => {
  const session = await getServerSession(options);
  console.log(session);

  return (
    <div className="main-container">
      <div className="logo-container">
        <Link href="/">
          <img src="/images/logo.png" alt="Logo" className="logo" />
        </Link>
      </div>
      <nav className="navbar">
        <Link href="/">HOME</Link>
        <Link href="/travel">TRAVEL</Link>
        <Link href="/about">ABOUT</Link>
        <Link href="/users">USERS</Link>
        <Link href="/reservations">RESERVATIONS</Link>
      </nav>
      <div className="nav-button">
        {session ? (
          <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
        ) : (
          <Link href="/api/auth/signin">Login</Link>
        )}
      </div>
    </div>
  );
};

export default MainNav;
