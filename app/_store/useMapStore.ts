import { create, StateCreator } from "zustand";
import { MarkerType } from "@interfaces/marker.types";
import { StoreStateType } from "@interfaces/storeState.types";
import { persist, createJSONStorage } from "zustand/middleware";

export const useMapStore = create<StoreStateType>()(
    persist(
        set => ({
            error: null,
            currentLocation: null,
            setError: message => set({ error: message }),
            setCurrentLocation: (lat, lng) =>
                set({
                    currentLocation: [lat, lng],
                }),
            markers: [],
            addMarker: (marker: MarkerType) => {
                set(state => ({
                    markers: [...state.markers, marker],
                }));
            },
            updateMarker: ({
                id,
                position,
                color,
                markerName,
            }: Partial<MarkerType> & { id: string }) => {
                set(state => ({
                    markers: state.markers.map(marker => {
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
        }),
        {
            name: "map-app",
            storage: createJSONStorage(() => localStorage),
            partialize: state => ({
                markers: state.markers,
            }),
        }
    )
) as StateCreator<StoreStateType, [], [["zustand/persist", unknown]]>;
