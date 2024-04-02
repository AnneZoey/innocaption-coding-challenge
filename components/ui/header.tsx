import React from "react";
import Link from "next/link";
import NavLinks from "./navLinks";

const Header = () => {
  return (
    <header className="bg-slate-50 p-4 flex fixed z-50 top-0 w-full justify-between items-center">
      <Link href={"/"}>
        <h1 className="text-2xl font-bold hover:text-primary transition-colors">
          MOCKU
        </h1>
      </Link>
      <nav className="flex gap-4">
        <NavLinks />
      </nav>
    </header>
  );
};

export default Header;
