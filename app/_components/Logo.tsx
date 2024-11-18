"use client";
import Link from "next/link";
import { FaMapMarkedAlt } from "react-icons/fa";

function Logo() {
  return (
    <Link
      href="/"
      className="flex flex-col md:flex-row items-center gap-4 z-10"
    >
      <FaMapMarkedAlt className="size-11" />
      <span className="text-xl font-serif text-primary-100">Map App</span>
    </Link>
  );
}

export default Logo;
