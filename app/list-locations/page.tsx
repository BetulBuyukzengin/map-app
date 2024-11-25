"use client";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";
import MarkersTable from "@components/MarkersTable";
function ListLocations() {
    useEffect(() => {
        document.title = "List Locations";
    }, []);

    return (
        <div className="flex flex-col w-full justify-center items-center h-dvh gap-5 p-8">
            <Link href="/route-create">
                <Button className="bg-slate-800 text-slate-200 px-4">
                    Show Route
                </Button>
            </Link>
            <MarkersTable isList />
        </div>
    );
}

export default ListLocations;
