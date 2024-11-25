"use client";
import L from "leaflet";
import { useEffect } from "react";
import { useMapEvents } from "react-leaflet";
import { UserPositionIncludedType } from "@interfaces/userPositionIncluded.types";

export const RoutingControl = ({
    routeWaypoints,
}: {
    routeWaypoints: UserPositionIncludedType;
}) => {
    const map = useMapEvents({});
    const markerPositions = routeWaypoints.map(mar =>
        mar === null || Array.isArray(mar) ? mar : mar.position
    );

    useEffect(() => {
        if (markerPositions.length >= 2) {
            const routingControl = L.Routing.control({
                plan: L.routing.plan(markerPositions as any, {
                    createMarker: function (index, marker) {
                        return false;
                    },
                }),
                waypoints: markerPositions
                    .filter(point => point !== null && point !== undefined)
                    .map(point => L.latLng(point?.[0], point?.[1])),
                routeWhileDragging: true,
            }).addTo(map);
        }
    }, [markerPositions, map]);

    return null;
};
