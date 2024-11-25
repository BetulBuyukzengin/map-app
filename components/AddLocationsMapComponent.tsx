"use client";
import Map from "./Map";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";
import { useRef, useState } from "react";
import L, { LatLngExpression } from "leaflet";
import { IoCloseSharp } from "react-icons/io5";
import { HexColorPicker } from "react-colorful";
import { useMapStore } from "@store/useMapStore";
import CustomPopoverRoot from "./CustomPopoverRoot";
import { MarkerType } from "@interfaces/marker.types";
import { useCurrentPosition } from "@utils/useCurrentPosition";
import GetCurrentPositionButton from "./GetCurrentPositionButton";
import { defaultColor, defaultCoords } from "@constants/constants";
import { Box, Button, Input, useDisclosure, VStack } from "@chakra-ui/react";

const MapContainerWithNoSSR = dynamic(
    () => import("react-leaflet").then(mod => mod.MapContainer),
    { ssr: false }
);

const AddLocationsMapComponent = () => {
    const [address, setAddress] = useState("");
    const [markerName, setMarkerName] = useState("");
    const [markerColor, setMarkerColor] = useState(defaultColor);
    const [clickPosition, setClickPosition] = useState<L.LatLng | null>(null);
    const { open, onClose, onOpen } = useDisclosure();
    const popoverAnchorRef = useRef<HTMLDivElement>(null);
    const [mapPosition, setMapPosition] =
        useState<LatLngExpression>(defaultCoords);
    const { addMarker, markers } = useMapStore();
    const { getCurrentPosition } = useCurrentPosition();

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
            setMarkerColor(defaultColor);
            onClose();
        }
    };
    return (
        <div className="w-full h-dvh relative">
            <MapContainerWithNoSSR
                center={mapPosition}
                zoomControl={false}
                zoom={13}
                className="w-full h-dvh"
            >
                <Map
                    mapPosition={mapPosition}
                    markers={markers}
                    setClickPosition={setClickPosition}
                    setAddress={setAddress}
                    setMapPosition={setMapPosition}
                    onOpen={onOpen}
                    isAddLoc
                />
            </MapContainerWithNoSSR>
            <GetCurrentPositionButton getCurrentPosition={getCurrentPosition} />
            <Box ref={popoverAnchorRef} position="absolute" left={50} top={50}>
                <CustomPopoverRoot open={open}>
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
                                onChange={e => setMarkerName(e.target.value)}
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
