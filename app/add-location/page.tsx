"use client";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";

function AddLocation() {
    const AddLocationsMapComponent = React.useMemo(
        () =>
            dynamic(() => import("@components/AddLocationsMapComponent"), {
                ssr: false,
            }),
        []
    );

    useEffect(() => {
        document.title = "Add Location";
    }, []);

    return (
        <main className="relative">
            <AddLocationsMapComponent />
        </main>
    );
}

export default AddLocation;
