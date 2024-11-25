import { Box } from "@chakra-ui/react";
import { CustomMarkerAddType } from "@interfaces/customMarkerAdd.types";
import { createIconWithColor } from "@utils/createIconWithColor";
import { Marker, Popup } from "react-leaflet";
import CustomPopupContent from "./CustomPopupContent";

function CustomMarkerAdd({ marker, isAddLoc }: CustomMarkerAddType) {
    return (
        <Marker
            position={marker.position}
            icon={createIconWithColor(marker.color)}
        >
            <Popup className="w-96">
                <CustomPopupContent>
                    {isAddLoc ? (
                        <>
                            <div>{marker.markerName}</div>
                            <div>{marker.address}</div>
                        </>
                    ) : (
                        <>
                            <span
                                className={`text-${marker.color} font-semibold text-center text-xl`}
                            >
                                {marker.markerName}
                            </span>

                            <span className="text-slate-600 text-base">
                                {`[${marker.position[0].toFixed(2)}] -
                    [${marker.position[1].toFixed(2)}]`}
                            </span>
                            <span className="text-slate-600 text-base">
                                {marker.address}
                            </span>
                        </>
                    )}
                </CustomPopupContent>
            </Popup>
        </Marker>
    );
}

export default CustomMarkerAdd;
