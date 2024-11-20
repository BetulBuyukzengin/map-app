"use client";
import L, { LatLngExpression, LatLngTuple } from "leaflet";
import "leaflet-routing-machine";
import { useEffect, useState } from "react";
import { TileLayer, useMapEvents, ZoomControl } from "react-leaflet";
import { defaultCoords } from "../_constants/constants";
import { useMapStore } from "../_store/useMapStore";
import { useCurrentPosition } from "../_utils/useCurrentPosition";
import ChangeCenter from "./ChangeCenter";
import CustomAddMarkerCurrentLocation from "./CustomAddMarkerCurrentLocation";
import CustomMarkerAdd from "./CustomMarkerAdd";
import GetCurrentPositionButton from "./GetCurrentPositionButton";
import dynamic from "next/dynamic";

const MapContainerWithNoSSR = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const RoutingControl = ({
  routeWaypoints,
}: {
  routeWaypoints: LatLngTuple[];
}) => {
  const map = useMapEvents({});

  useEffect(() => {
    if (routeWaypoints.length >= 2) {
      const routingControl = L.Routing.control({
        waypoints: routeWaypoints.map((point) =>
          L.latLng(point?.[0], point?.[1])
        ),
        routeWhileDragging: true,
      }).addTo(map);

      return () => {
        routingControl.remove();
      };
    }
  }, [routeWaypoints, map]);

  return null;
};
type UserPositionIncludedType = Array<[number, number]>;

const MapComponent = () => {
  const { markers, currentLocation } = useMapStore();
  const { getCurrentPosition } = useCurrentPosition();

  const [mapPosition, setMapPosition] =
    useState<LatLngExpression>(defaultCoords);

  useEffect(() => {
    if (currentLocation) setMapPosition(currentLocation);
    else setMapPosition(defaultCoords);
  }, [currentLocation]);

  const markerPositions = markers.map((mar) => mar.position);
  const userPositionIncluded = [currentLocation, ...markerPositions];

  return (
    <div className="w-full h-dvh relative">
      <MapContainerWithNoSSR
        center={mapPosition as LatLngExpression | undefined}
        zoom={13}
        zoomControl={false}
        className="w-full h-dvh"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {/* Route */}
        <RoutingControl
          routeWaypoints={userPositionIncluded as UserPositionIncludedType}
        />
        {/* Add marker*/}
        {markers.map((marker, index) => (
          <CustomMarkerAdd
            isRoutePopupContent
            key={index}
            marker={marker}
            isAddLocPopupContent={false}
          />
        ))}
        {/* add marker to user's current location  */}
        {currentLocation && (
          <CustomAddMarkerCurrentLocation mapPosition={mapPosition} />
        )}
        <ZoomControl position="bottomright" />
        <ChangeCenter position={mapPosition} />
      </MapContainerWithNoSSR>
      <GetCurrentPositionButton getCurrentPosition={getCurrentPosition} />
    </div>
  );
};

export default MapComponent;
