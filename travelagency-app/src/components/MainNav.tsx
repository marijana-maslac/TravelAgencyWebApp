import React from "react";
import Link from "next/link";

const MainNav = () => {
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
        <Link href="/search">SEARCH</Link>
        <Link href="/">LOGOUT</Link>
      </nav>
    </div>
  );
};

export default MainNav;
