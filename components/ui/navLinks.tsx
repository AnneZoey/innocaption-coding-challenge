"use client";
import React from "react";
import Link from "next/link";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaMagnifyingGlass, FaCartShopping } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { name: "All Products", href: "/products", icon: FaMagnifyingGlass },
  { name: "Categories", href: "/categories", icon: BiSolidCategoryAlt },
  { name: "Cart", href: "/cart", icon: FaCartShopping },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "flex h-[48px] grow hover:underline items-center justify-center gap-2 font-medium hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 transition-colors duration-200 ease-in-out",
              pathname === link.href ? " text-blue-600" : "text-gray-600"
            )}
          >
            {LinkIcon && <LinkIcon className="w-6" />}
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
