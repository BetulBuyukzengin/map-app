import { useEffect } from "react";
import { MapEvents } from "./MapEvents";
import ChangeCenter from "./ChangeCenter";
import CustomMarkerAdd from "./CustomMarkerAdd";
import { RoutingControl } from "./RoutingControl";
import { MapType } from "@interfaces/map.types";
import { useMapStore } from "@store/useMapStore";
import { TileLayer, ZoomControl } from "react-leaflet";
import { defaultCoords } from "@constants/constants";
import CustomAddMarkerCurrentLocation from "./CustomAddMarkerCurrentLocation";
import { UserPositionIncludedType } from "@interfaces/userPositionIncluded.types";

function Map({
    markers,
    setClickPosition,
    mapPosition,
    setMapPosition,
    setAddress,
    onOpen,
    isRoute,
    userPositionIncluded,
    isAddLoc,
}: MapType) {
    const { currentLocation } = useMapStore();

    useEffect(() => {
        if (currentLocation) setMapPosition(currentLocation);
        else setMapPosition(defaultCoords);
    }, [currentLocation, setMapPosition]);

    return (
        <>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            {currentLocation && (
                <CustomAddMarkerCurrentLocation position={mapPosition} />
            )}
            {markers.map((marker, index) => (
                <CustomMarkerAdd
                    key={index}
                    marker={marker}
                    isAddLoc={isAddLoc}
                />
            ))}
            {isRoute ? (
                <RoutingControl
                    routeWaypoints={
                        userPositionIncluded as UserPositionIncludedType
                    }
                />
            ) : (
                <MapEvents
                    setClickPosition={setClickPosition}
                    setAddress={setAddress}
                    onOpen={onOpen}
                />
            )}

            <ZoomControl position="bottomright" />
            <ChangeCenter position={mapPosition} />
        </>
    );
}

export default Map;
