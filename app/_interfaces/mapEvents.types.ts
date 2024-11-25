export interface MapEventsType {
    onOpen?: () => void;
    setAddress?: (position: string) => void;
    setClickPosition?: React.Dispatch<React.SetStateAction<L.LatLng | null>>;
}
