import { useMapEvents } from "react-leaflet";
import { MapEventsType } from "@interfaces/mapEvents.types";
export const MapEvents = ({
    setClickPosition = () => {},
    setAddress = () => {},
    onOpen = () => {},
}: MapEventsType) => {
    const handleMapClick = (e: L.LeafletMouseEvent) => {
        setClickPosition(e.latlng);
        onOpen();
    };
    useMapEvents({
        click: async event => {
            const { lat, lng } = event.latlng;
            handleMapClick(event);
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${Number(
                        lat
                    )}&lon=${Number(lng)}`
                );
                if (!response.ok) {
                    throw new Error("API call failed");
                }
                const data = await response.json();
                setAddress(data?.display_name);
            } catch (error) {
                throw error;
            }
        },
    });
    return null;
};
