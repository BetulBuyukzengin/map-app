import { Box } from "@chakra-ui/react";
import { Marker, Popup } from "react-leaflet";
import { createIconWithColor } from "../_utils/createIconWithColor";
import { Marker as MarkerType } from "../_store/useMapStore";

function CustomMarkerAdd({
  marker,
  isRoutePopupContent,
  isAddLocPopupContent,
}: {
  marker: MarkerType;
  isRoutePopupContent: boolean;
  isAddLocPopupContent: boolean;
}) {
  return (
    <Marker
      //   key={index}
      position={marker.position}
      icon={createIconWithColor(marker.color)}
    >
      <Popup className="w-96">
        {isAddLocPopupContent ? (
          <Box>
            <div>{marker.markerName}</div>
            <div>{marker.address}</div>
          </Box>
        ) : null}
        {isRoutePopupContent ? (
          <Box className="grid grid-cols-1 gap-4">
            <span
              className={`text-${marker.color} font-semibold text-center text-xl`}
            >
              {marker.markerName}
            </span>

            <span className="text-slate-600 text-base">
              {`[${marker.position[0].toFixed(2)}] -
                    [${marker.position[1].toFixed(2)}]`}
            </span>
            <span className="text-slate-600 text-base">{marker.address}</span>
          </Box>
        ) : null}
      </Popup>
    </Marker>
  );
}

export default CustomMarkerAdd;
