import { Input, Stack } from "@chakra-ui/react";
import { CustomDrawer } from "./CustomDrawer";
import { HexColorPicker } from "react-colorful";
import { useEffect, useRef, useState } from "react";
import { Marker as MarkerType, useMapStore } from "../_store/useMapStore";

interface MarkerIdType {
  markerId: string | number;
}

function EditDrawerContent({ markerId }: MarkerIdType) {
  const [selectedMarker, setSelectedMarker] = useState<MarkerType | null>(null);
  const { markers, updateMarker } = useMapStore();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const marker = markers.find((m: MarkerType) => m.id === markerId) || null;
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
    <CustomDrawer
      /* @ts-expect-error unnecessary error*/
      ref={ref}
      handleUpdateMarker={handleUpdateMarker}
      isEdit
      isHeader={false}
    >
      <Stack mt="5">
        <Input
          placeholder="Position Name"
          value={selectedMarker.markerName || ""}
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
          value={selectedMarker.address || ""}
          onChange={(e) =>
            setSelectedMarker({
              ...selectedMarker,
              address: e.target.value,
            })
          }
        />
        <HexColorPicker
          color={selectedMarker?.color || "#000000"}
          onChange={(color) => setSelectedMarker({ ...selectedMarker, color })}
        />
      </Stack>
    </CustomDrawer>
  );
}

export default EditDrawerContent;
