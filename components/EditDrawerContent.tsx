import { Input, Stack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { CustomDrawer } from "./CustomDrawer";
import { MarkerIdType } from "@interfaces/markerId.types";
import { MarkerType } from "@interfaces/marker.types";
import { useMapStore } from "@store/useMapStore";
import { defaultColorPickerColor } from "@constants/constants";

function EditDrawerContent({ markerId }: MarkerIdType) {
    const [selectedMarker, setSelectedMarker] = useState<MarkerType | null>(
        null
    );
    const { markers, updateMarker } = useMapStore();
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const marker =
            markers.find((m: MarkerType) => m.id === markerId) || null;
        setSelectedMarker(marker);
    }, [markerId, markers]);

    const handleUpdateMarker = () => {
        if (selectedMarker) {
            updateMarker(selectedMarker);
        }
    };
    if (!selectedMarker) return null;

    return (
        <CustomDrawer handleUpdateMarker={handleUpdateMarker} isEdit>
            <Stack mt="5">
                <Input
                    placeholder="Position Name"
                    value={selectedMarker.markerName || ""}
                    onChange={e =>
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
                    onChange={e =>
                        setSelectedMarker({
                            ...selectedMarker,
                            address: e.target.value,
                        })
                    }
                />
                <HexColorPicker
                    color={selectedMarker?.color || defaultColorPickerColor}
                    onChange={color =>
                        setSelectedMarker({ ...selectedMarker, color })
                    }
                />
            </Stack>
        </CustomDrawer>
    );
}

export default EditDrawerContent;
