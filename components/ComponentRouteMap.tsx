"use client";
import Map from "./Map";
import "leaflet-routing-machine";
import dynamic from "next/dynamic";
import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import { useMapStore } from "@store/useMapStore";
import { defaultCoords } from "@constants/constants";
import { useCurrentPosition } from "@utils/useCurrentPosition";
import GetCurrentPositionButton from "./GetCurrentPositionButton";
import { UserPositionIncludedType } from "@interfaces/userPositionIncluded.types";

const MapContainerWithNoSSR = dynamic(
    () => import("react-leaflet").then(mod => mod.MapContainer),
    { ssr: false }
);

const MapComponent = () => {
    const { markers, currentLocation } = useMapStore();
    const { getCurrentPosition } = useCurrentPosition();
    const [mapPosition, setMapPosition] =
        useState<LatLngExpression>(defaultCoords);

    useEffect(() => {
        if (currentLocation) setMapPosition(currentLocation);
        else setMapPosition(defaultCoords);
    }, [currentLocation]);

    const userPositionIncluded: UserPositionIncludedType = [
        currentLocation,
        ...markers,
    ];

    return (
        <div className="w-full h-dvh relative">
            <MapContainerWithNoSSR
                center={mapPosition as LatLngExpression | undefined}
                zoom={13}
                zoomControl={false}
                className="w-full h-dvh"
            >
                <Map
                    mapPosition={mapPosition}
                    markers={markers}
                    setMapPosition={setMapPosition}
                    isRoute
                    userPositionIncluded={userPositionIncluded}
                />
            </MapContainerWithNoSSR>
            <GetCurrentPositionButton getCurrentPosition={getCurrentPosition} />
        </div>
    );
};

export default MapComponent;
