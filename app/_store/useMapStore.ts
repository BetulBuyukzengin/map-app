import { LatLng } from "leaflet";
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
// StoreState arayüzünü tanımlayın
interface StoreState {
  currentLocation: [number, number] | null;
  setCurrentLocation: (lat: number, lng: number) => void;
  markers: {
    position: [number, number];
    address: string | null;
    color: string | null;
  }[];
  addMarker: ({
    position,
    address,
    color,
    markerName,
  }: {
    position: LatLng;
    address: string | null;
    color: string | null;
    markerName: string | null;
  }) => void;
  error: string | null;
  setError: (message: string) => void;
}

export const useMapStore = create<StoreState>((set) => ({
  currentLocation: null,
  error: null,
  setError: (message) => set({ error: message }), // Hata mesajı için set fonksiyonu
  setCurrentLocation: (lat, lng) =>
    set({
      currentLocation: [lat, lng],
    }),
  markers: [],
  addMarker: ({ position: { lat, lng }, markerName, color, address }) => {
    console.log(markerName, lat, lng, color, address);
    return set((state) => ({
      markers: [
        ...state.markers,
        { position: [lat, lng], address, color, markerName, id: uuidv4() },
      ],
    }));
  },
}));
