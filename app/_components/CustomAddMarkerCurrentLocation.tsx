import { Box } from "@chakra-ui/react";
import { Marker, Popup } from "react-leaflet";
import { createIconWithColor } from "../_utils/createIconWithColor";
import { LatLngExpression } from "leaflet";

function CustomAddMarkerCurrentLocation({
  mapPosition,
}: {
  mapPosition: LatLngExpression;
}) {
  return (
    <Marker position={mapPosition} icon={createIconWithColor("#e76377")}>
      <Popup>
        <Box>
          <div className="text-lg">Your&apos;s location</div>
        </Box>
      </Popup>
    </Marker>
  );
}

export default CustomAddMarkerCurrentLocation;
