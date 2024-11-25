import { useMap } from "react-leaflet";
import { PositionType } from "@interfaces/position.types";

export default function ChangeCenter({ position }: PositionType) {
    const map = useMap();
    map.setView(position);
    return null;
}
