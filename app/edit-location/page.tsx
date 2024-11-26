"use client";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";

function EditLocation() {
    const MarkersTable = React.useMemo(
        () =>
            dynamic(() => import("@components/MarkersTable"), {
                ssr: false,
            }),
        []
    );

    useEffect(() => {
        document.title = "Edit Location";
    }, []);

    return (
        <div className="flex w-full justify-center items-center h-dvh p-8">
            <MarkersTable isEdit />
        </div>
    );
}

export default EditLocation;
