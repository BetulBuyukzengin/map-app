"use client";
import Link from "next/link";
import { FaMapMarkedAlt } from "react-icons/fa";

function Logo() {
  return (
    <Link
      href="/"
      className="flex flex-col md:flex-row items-center gap-4 z-10
     
      text-stone-100 "
    >
      <FaMapMarkedAlt className="size-28 lg:size-11" />
      <span className="text-3xl font-serif">Map App</span>
    </Link>
  );
}

export default Logo;
