"use client";

import { Input, Stack } from "@chakra-ui/react";
import { Button } from "../../components/ui/button";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerRoot,
} from "../../components/ui/drawer";
import { useRef, useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { useMapStore } from "../_store/useMapStore";

export const CustomDrawer = ({ markerId }) => {
  const { markers, updateMarker } = useMapStore();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const marker = markers.find((m) => m.id === markerId);
    setSelectedMarker(marker);
  }, [markerId, markers]);

  const handleUpdateMarker = () => {
    if (selectedMarker) {
      updateMarker(selectedMarker);

      // update local storage
      const updatedMarkers = markers.map((marker) =>
        marker.id === selectedMarker.id ? selectedMarker : marker
      );
      localStorage.setItem("markers", JSON.stringify(updatedMarkers));
    }
  };

  if (!selectedMarker) return null;

  return (
    <DrawerRoot initialFocusEl={() => ref.current}>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button variant="outline" size="md">
          Edit
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit Location</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <Stack mt="5">
            <Input
              placeholder="Position Name"
              value={selectedMarker.markerName}
              onChange={(e) =>
                setSelectedMarker({
                  ...selectedMarker,
                  markerName: e.target.value,
                })
              }
            />
            <Input
              ref={ref}
              placeholder="Position Address"
              value={selectedMarker.address}
              onChange={(e) =>
                setSelectedMarker({
                  ...selectedMarker,
                  address: e.target.value,
                })
              }
            />
            <HexColorPicker
              color={selectedMarker.color}
              onChange={(color) =>
                setSelectedMarker({ ...selectedMarker, color })
              }
            />
          </Stack>
        </DrawerBody>
        <DrawerFooter>
          <DrawerActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerActionTrigger>
          <Button onClick={handleUpdateMarker}>Save</Button>
        </DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};
