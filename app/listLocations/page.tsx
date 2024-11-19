"use client";
import { useState } from "react";
import MarkersTable from "../_components/MarkersTable";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
function ListLocations() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col w-full justify-center items-center h-dvh gap-5">
      <Link href="/routeCreate">
        <Button className="bg-slate-800 text-slate-200 px-4">Show Route</Button>
      </Link>
      <MarkersTable isList open={open} setOpen={setOpen} />
    </div>
  );
}

export default ListLocations;
