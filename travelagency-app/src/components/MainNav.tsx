import React from "react";
import Link from "next/link";

const MainNav = () => {
  return (
    <div className="nav-links">
      <div className="nav-links-gap">
        <Link href="/">Home</Link>
      </div>
      <div className="nav-links-gap">
        <Link href="/travel">Travel</Link>
        <Link href="/about">About</Link>
        <Link href="/search">Search</Link>
        <Link href="/users">Users</Link>
        <Link href="/">Logout</Link>
      </div>
    </div>
  );
};

export default MainNav;
