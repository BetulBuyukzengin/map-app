import { MarkerType } from "./marker.types";

export interface StoreStateType {
    error: string | null;
    markers: MarkerType[];
    setError: (message: string) => void;
    addMarker: (marker: MarkerType) => void;
    currentLocation: [number, number] | null;
    setCurrentLocation: (lat: number, lng: number) => void;
    updateMarker: (update: Partial<MarkerType> & { id: string }) => void;
}
