"use client";
import {
  Box,
  Button,
  Input,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
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
import { useMapStore } from "../_store/useMapStore";

const FlyToLocation = ({ position }: { position: LatLngTuple }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 13); // Pan and zoom the map to the specified position
    }
  }, [map, position]);
  return null;
};

// Function to create dynamic icon based on color
const createIconWithColor = (color: string) => {
  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="45" height="45">
      <circle cx="12" cy="12" r="10" fill="${color}" />
    </svg>`;

  const iconUrl =
    "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svgIcon);

  return new L.Icon({
    iconUrl,
    iconSize: [45, 45],
    iconAnchor: [22, 45],
    popupAnchor: [0, -32],
  });
};

const MapComponent = () => {
  const [address, setAddress] = useState("");
  const [markerName, setMarkerName] = useState("");
  const [markerColor, setMarkerColor] = useState("#c98d8d");
  const [clickPosition, setClickPosition] = useState<L.LatLng | null>(null);
  const { open, onOpen, onClose } = useDisclosure();
  const popoverAnchorRef = useRef<HTMLDivElement>(null);

  const createIconWithColor = (color: string) => {
    const svgIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="45" height="45">
        <circle cx="12" cy="12" r="10" fill="${color}" />
      </svg>`;

    const iconUrl =
      "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svgIcon);

    return new L.Icon({
      iconUrl,
      iconSize: [45, 45],
      iconAnchor: [22, 45], // Adjusted for proper alignment
      popupAnchor: [0, -32],
    });
  };

  const customIcon = createIconWithColor(markerColor);
  const {
    setCurrentLocation,
    currentLocation,
    addMarker,
    markers,
    setError,
    error,
    id,
  } = useMapStore();

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
      addMarker({
        position: clickPosition,
        address,
        markerName,
        color: markerColor,
      });
      setMarkerName("");
      setMarkerColor("#c98d8d");

      // Used because zustand didn't update the situation immediately
      const updatedMarkers = [
        ...markers,
        { position: clickPosition, address, markerName, color: markerColor },
      ];
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
        } catch (error) {}
      },
    });
    return null;
  };

  // Update the color of the clicked marker
  const handleMarkerClick = (id: number) => {
    setClickedMarkerId(id);
  };

  return (
    <div className="w-full h-dvh relative">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <MapContainer
            center={currentLocation || [51.505, -0.09]} // Geçici bir merkez
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
                key={id}
                position={marker.position}
                icon={createIconWithColor(
                  clickedMarkerId === id ? markerColor : marker.color
                )} // Change color if clicked
                eventHandlers={{
                  click: () => handleMarkerClick(id), // Change color on click
                }}
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
            className="bg-stone-500 text-stone-200 px-2 z-[1000] rounded-md right-5 bottom-5 absolute"
          >
            Get Current Position
          </Button>

          <Box ref={popoverAnchorRef} position="absolute" left={50} top={50}>
            <PopoverRoot open={open}>
              <PopoverTrigger>
                <Box ref={popoverAnchorRef} />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverBody>
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
                      />
                      <HexColorPicker
                        color={markerColor}
                        onChange={setMarkerColor}
                      />
                      <Button type="submit" colorScheme="blue">
                        Add Marker
                      </Button>
                    </VStack>
                  </form>
                </PopoverBody>
              </PopoverContent>
            </PopoverRoot>
          </Box>
        </>
      )}
    </div>
  );
};

export default MapComponent;
