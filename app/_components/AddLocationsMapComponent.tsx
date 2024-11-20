"use client";
import { Box, Button, Input, useDisclosure, VStack } from "@chakra-ui/react";
import L, { LatLngExpression } from "leaflet";
import { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { IoCloseSharp } from "react-icons/io5";
import {
  // MapContainer,
  TileLayer,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import { v4 as uuidv4 } from "uuid";
import { defaultCoords } from "../_constants/constants";
import { Marker as MarkerType, useMapStore } from "../_store/useMapStore";
import { useCurrentPosition } from "../_utils/useCurrentPosition";
import ChangeCenter from "./ChangeCenter";
import CustomAddMarkerCurrentLocation from "./CustomAddMarkerCurrentLocation";
import CustomMarkerAdd from "./CustomMarkerAdd";
import CustomPopoverRoot from "./CustomPopoverRoot";
import GetCurrentPositionButton from "./GetCurrentPositionButton";
import dynamic from "next/dynamic";

const MapContainerWithNoSSR = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false } // Sunucu tarafında render edilmesin
);

const AddLocationsMapComponent = () => {
  const [address, setAddress] = useState("");
  const [markerName, setMarkerName] = useState("");
  const [markerColor, setMarkerColor] = useState("#c98d8d");
  const [clickPosition, setClickPosition] = useState<L.LatLng | null>(null);
  const { open, onOpen, onClose } = useDisclosure();
  const popoverAnchorRef = useRef<HTMLDivElement>(null);
  const [mapPosition, setMapPosition] =
    useState<LatLngExpression>(defaultCoords);
  const { currentLocation, addMarker, markers } = useMapStore();
  const { getCurrentPosition } = useCurrentPosition();

  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (currentLocation) setMapPosition(currentLocation);
    else setMapPosition(defaultCoords);
  }, [currentLocation]);

  useEffect(() => {
    const storedMarkers = localStorage.getItem("markers");
    if (storedMarkers) {
      useMapStore.setState({ markers: JSON.parse(storedMarkers) });
    }
  }, []);

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    setClickPosition(e.latlng);
    onOpen();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (clickPosition && markerName) {
      const newMarker = {
        id: uuidv4(),
        position: [clickPosition.lat, clickPosition.lng],
        address,
        markerName,
        color: markerColor,
      };
      addMarker(newMarker as MarkerType);
      setMarkerName("");
      setMarkerColor("#c98d8d");

      // update store
      const updatedMarkers = [...markers, newMarker];
      localStorage.setItem("markers", JSON.stringify(updatedMarkers));
      onClose();
    }
  };

  // Handling the map click event
  const MapEvents = () => {
    useMapEvents({
      click: async (event) => {
        const { lat, lng } = event.latlng;
        handleMapClick(event);
        try {
          // Reverse geocoding api call with fetch
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${Number(
              lat
            )}&lon=${Number(lng)}`
          );
          console.log(isClicked);
          if (!response.ok) {
            throw new Error("API call failed");
          }
          const data = await response.json();
          setIsClicked(true);

          setAddress(data?.display_name);
        } catch (error) {
          throw error;
        }
      },
    });
    return null;
  };

  return (
    <div className="w-full h-dvh relative">
      <MapContainerWithNoSSR
        center={mapPosition}
        zoomControl={false}
        zoom={13}
        className="w-full h-dvh"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {/* add marker to user's current location  */}
        {currentLocation && (
          <CustomAddMarkerCurrentLocation mapPosition={mapPosition} />
        )}

        {/* Dynamically added markers*/}
        {markers.map((marker, index) => (
          <CustomMarkerAdd
            key={index}
            marker={marker}
            isAddLocPopupContent
            isRoutePopupContent={false}
          />
        ))}

        <MapEvents />
        <ZoomControl position="bottomright" />
        <ChangeCenter position={mapPosition} />
      </MapContainerWithNoSSR>
      <GetCurrentPositionButton getCurrentPosition={getCurrentPosition} />

      <Box ref={popoverAnchorRef} position="absolute" left={50} top={50}>
        <CustomPopoverRoot open={open} ref={popoverAnchorRef}>
          <form onSubmit={handleSubmit}>
            <VStack className="">
              <Button
                onClick={onClose}
                colorScheme="blue"
                className="border-none self-end"
              >
                <IoCloseSharp />
              </Button>
              <Input
                placeholder="Marker name"
                value={markerName}
                variant="outline"
                onChange={(e) => setMarkerName(e.target.value)}
                className="border-slate-600 focus-visible:border-slate-600"
              />
              <HexColorPicker
                color={markerColor}
                onChange={setMarkerColor}
                className="mt-4 mb-4"
              />
              <Button
                type="submit"
                className="bg-slate-600 text-slate-200 hover:text-slate-300 px-5 py-2"
              >
                Add Marker
              </Button>
            </VStack>
          </form>
        </CustomPopoverRoot>
      </Box>
    </div>
  );
};
export default AddLocationsMapComponent;
