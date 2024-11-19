import { LatLng } from "leaflet";
import { create } from "zustand";

interface StoreState {
  currentLocation: [number, number] | null;
  setCurrentLocation: (lat: number, lng: number) => void;
  markers: {
    position: [number, number];
    address: string | null;
    color: string | null;
  }[];

  addMarker: ({
    id,
    position,
    address,
    color,
    markerName,
  }: {
    id: string;
    position: [number, number];
    // position: LatLng;
    address: string | null;
    color: string | null;
    markerName: string | null;
  }) => void;
  updateMarker: ({
    id,
    position,
    color,
    markerName,
  }: {
    id: string;
    position?: [number, number];
    color?: string | null;
    markerName?: string | null;
  }) => void;
  error: string | null;
  setError: (message: string) => void;
}

export const useMapStore = create<StoreState>((set) => ({
  currentLocation: null,
  error: null,
  setError: (message) => set({ error: message }),
  setCurrentLocation: (lat, lng) =>
    set({
      currentLocation: [lat, lng],
    }),
  markers: [],
  // addMarker: ({ position: { lat, lng }, markerName, color, address, id }) => {
  //   return set((state) => ({
  //     markers: [
  //       ...state.markers,
  //       { position: [lat, lng], address, color, markerName, id },
  //     ],
  //   }));
  // },
  addMarker: (marker) => {
    return set((state) => ({
      markers: [...state.markers, marker],
    }));
  },
  // updateMarker: ({ position: { lat, lng }, id, color, markerName }) => {
  //   set((state) => ({
  //     markers: state.markers.map((marker) => {
  //       if (marker.id === id) {
  //         return {
  //           ...marker,
  //           position: marker.position,
  //           color: color ?? marker.color,
  //           markerName: markerName ?? marker.markerName,
  //         };
  //       }
  //       return marker;
  //     }),
  //   }));
  // },
  updateMarker: ({ id, position, color, markerName }) => {
    set((state) => ({
      markers: state.markers.map((marker) => {
        if (marker.id === id) {
          return {
            ...marker,
            position: position || marker.position,
            color: color ?? marker.color,
            markerName: markerName ?? marker.markerName,
          };
        }
        return marker;
      }),
    }));
  },
}));
