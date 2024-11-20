"use client";
import MarkersTable from "../_components/MarkersTable";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";
function ListLocations() {
  useEffect(() => {
    document.title = "List Locations";
  }, []);

  return (
    <div className="flex flex-col w-full justify-center items-center h-dvh gap-5 p-8">
      <Link href="/routeCreate">
        <Button className="bg-slate-800 text-slate-200 px-4">Show Route</Button>
      </Link>
      <MarkersTable isList isEdit={false} />
    </div>
  );
}

export default ListLocations;
