import { Box } from "@chakra-ui/react";
import { Marker, Popup } from "react-leaflet";
import { PositionType } from "@interfaces/position.types";
import { createIconWithColor } from "@utils/createIconWithColor";
import { defaultColor } from "@constants/constants";

function CustomAddMarkerCurrentLocation({ position }: PositionType) {
    return (
        <Marker position={position} icon={createIconWithColor(defaultColor)}>
            <Popup>
                <Box>
                    <div className="text-lg">Your&apos;s location</div>
                </Box>
            </Popup>
        </Marker>
    );
}

export default CustomAddMarkerCurrentLocation;
