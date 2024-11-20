import { LatLngExpression } from "leaflet";
import { useMap } from "react-leaflet";

export default function ChangeCenter({
  position,
}: {
  position: LatLngExpression;
}) {
  const map = useMap();
  map.setView(position);
  return null;
}
