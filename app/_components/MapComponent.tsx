"use client";
import { Box, Button, Input, useDisclosure, VStack } from "@chakra-ui/react";
import L, { LatLngTuple } from "leaflet";
import { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { IoCloseSharp } from "react-icons/io5";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { v4 as uuidv4 } from "uuid";
import { useMapStore } from "../_store/useMapStore";
import { createIconWithColor } from "../_utils/createIconWithColor";
import CustomPopoverRoot from "./CustomPopoverRoot";

const FlyToLocation = ({ position }: { position: LatLngTuple }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 13); // Pan and zoom the map to the specified position
    }
  }, [map, position]);
  return null;
};

const MapComponent = () => {
  const [address, setAddress] = useState("");
  const [markerName, setMarkerName] = useState("");
  const [markerColor, setMarkerColor] = useState("#c98d8d");
  const [clickPosition, setClickPosition] = useState<L.LatLng | null>(null);
  const { open, onOpen, onClose } = useDisclosure();
  const popoverAnchorRef = useRef<HTMLDivElement>(null);

  const { setCurrentLocation, currentLocation, addMarker, markers, setError } =
    useMapStore();

  const [isClicked, setIsClicked] = useState(false);
  const [clickedMarkerId, setClickedMarkerId] = useState<number | null>(null); // Store clicked marker index

  const getCurrentPosition = () =>
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
        setCurrentLocation(latitude, longitude);
      },
      (error) => {
        setError(error.message);
      }
    );

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
      addMarker(newMarker);
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
          throw new Error(error);
        }
      },
    });
    return null;
  };

  return (
    <div className="w-full h-dvh relative">
      <MapContainer
        center={currentLocation || [51.505, -0.09]}
        zoom={13}
        className="w-full h-dvh"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {/* User's current location */}
        {currentLocation && (
          <>
            <FlyToLocation position={currentLocation} />

            <Marker position={currentLocation} icon={markerColor}>
              <Popup>Mevcut konumunuz</Popup>
            </Marker>
          </>
        )}

        {/* Dynamically added markers*/}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            icon={createIconWithColor(marker.color)}
          >
            <Popup>
              <Box>
                <div>{marker.markerName}</div>
                <div>{marker.address}</div>
              </Box>
            </Popup>
          </Marker>
        ))}

        <MapEvents />
      </MapContainer>
      <Button
        onClick={getCurrentPosition}
        className="bg-slate-600 text-slate-200 hover:text-slate-300 px-2 z-[1000] rounded-md right-5 bottom-5 absolute"
      >
        Get Current Position
      </Button>

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
                // colorScheme="blue"
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
export default MapComponent;
