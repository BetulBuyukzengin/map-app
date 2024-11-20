import { useMapStore } from "../_store/useMapStore";

export const useCurrentPosition = () => {
  const { setCurrentLocation, setError } = useMapStore();

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation(latitude, longitude);
      },
      (error) => {
        setError(error.message);
      }
    );
  };

  return { getCurrentPosition };
};
