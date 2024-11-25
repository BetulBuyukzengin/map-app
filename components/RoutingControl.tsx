"use client";
import { useEffect } from "react";
import { useMapEvents } from "react-leaflet";
import { UserPositionIncludedType } from "@interfaces/userPositionIncluded.types";
import { MarkerPositionsType } from "@interfaces/markerPositions.types";

export const RoutingControl = ({
    routeWaypoints,
}: {
    routeWaypoints: UserPositionIncludedType;
}) => {
    const map = useMapEvents({});
    const markerPositions: MarkerPositionsType = routeWaypoints
        .map(mar => {
            if (mar === null) return null;
            if (Array.isArray(mar)) return mar as MarkerPositionsType;
            return mar.position ? (mar.position as MarkerPositionsType) : null;
        })
        .filter((position): position is [number, number] => position !== null);

    useEffect(() => {
        if (markerPositions.length >= 2) {
            const loadIcon = async () => {
                const L = await import("leaflet");
                L.Routing.control({
                    plan: L.routing.plan(
                        markerPositions.map(point => L.latLng(point)),
                        {
                            createMarker: () => false,
                        }
                    ),
                    waypoints: markerPositions.map(point => L.latLng(point)),
                    routeWhileDragging: true,
                }).addTo(map);
            };
            loadIcon();
        }
    }, [markerPositions, map]);
    return null;
};
