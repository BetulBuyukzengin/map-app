"use client";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";

function RouteCreate() {
    const ComponentRouteMap = React.useMemo(
        () =>
            dynamic(() => import("@components/ComponentRouteMap"), {
                loading: () => <p> loading</p>,
                ssr: false,
            }),
        []
    );

    useEffect(() => {
        document.title = "Route Create";
    }, []);

    return (
        <main className="relative ">
            <ComponentRouteMap />
        </main>
    );
}

export default RouteCreate;
