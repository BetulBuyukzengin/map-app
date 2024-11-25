import { LatLngExpression } from "leaflet";
import { MarkerType } from "./marker.types";

export interface MapType {
    markers: MarkerType[];
    onOpen?: () => void;
    isRoute?: boolean;
    mapPosition: LatLngExpression;
    setAddress?: (position: string) => void;
    setMapPosition: (position: LatLngExpression) => void;
    userPositionIncluded?: ([number, number] | MarkerType | null)[];
    setClickPosition?: React.Dispatch<React.SetStateAction<L.LatLng | null>>;
    isAddLoc?: boolean | undefined;
}
