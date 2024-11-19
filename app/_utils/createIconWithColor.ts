import L from "leaflet";

export const createIconWithColor = (color: string) => {
  const svgIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="45" height="45">
        <circle cx="12" cy="12" r="10" fill="${color}" />
      </svg>`;

  const iconUrl =
    "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svgIcon);

  return new L.Icon({
    iconUrl,
    iconSize: [45, 45],
    iconAnchor: [22, 45], // Adjusted for proper alignment
    popupAnchor: [0, -32],
  });
};
