import {
    defaultFillColor,
    defaultMarkerColor1,
    defaultMarkerColor2,
    defaultMarkerColor3,
    defaultMarkerColor4,
} from "@constants/constants";
import L from "leaflet";

export const createIconWithColor = (color: string | null) => {
    const svgIcon = `
    <svg viewBox="0 0 500 820" version="1.1" xmlns="http://www.w3.org/2000/svg" xml:space="preserve"
         style="fill-rule: evenodd; clip-rule: evenodd; stroke-linecap: round;">
      <defs>
        <linearGradient x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse"
                        gradientTransform="matrix(2.30025e-15,-37.566,37.566,2.30025e-15,416.455,540.999)" id="map-marker-38-f">
          <stop offset="0" stop-color="${color || defaultMarkerColor1}"/>
          <stop offset="1" stop-color="${color || defaultMarkerColor2}"/>
        </linearGradient>
        <linearGradient x1="0" y1="0" x2="1" y2="0"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="matrix(1.16666e-15,-19.053,19.053,1.16666e-15,414.482,522.486)"
                        id="map-marker-38-s">
          <stop offset="0" stop-color="${color || defaultMarkerColor3}"/>
          <stop offset="1" stop-color="${color || defaultMarkerColor4}"/>
        </linearGradient>
      </defs>
      <g transform="matrix(19.5417,0,0,19.5417,-7889.1,-9807.44)">
        <path fill="${defaultFillColor}" d="M421.2,515.5c0,2.6-2.1,4.7-4.7,4.7c-2.6,0-4.7-2.1-4.7-4.7c0-2.6,2.1-4.7,4.7-4.7 C419.1,510.8,421.2,512.9,421.2,515.5z"/>
        <path d="M416.544,503.612C409.971,503.612 404.5,509.303 404.5,515.478C404.5,518.256 406.064,521.786 407.194,524.224L416.5,542.096L425.762,524.224C426.892,521.786 428.5,518.433 428.5,515.478C428.5,509.303 423.117,503.612 416.544,503.612ZM416.544,510.767C419.128,510.784 421.223,512.889 421.223,515.477C421.223,518.065 419.128,520.14 416.544,520.156C413.96,520.139 411.865,518.066 411.865,515.477C411.865,512.889 413.96,510.784 416.544,510.767Z" 
              stroke-width="1.1px" fill="url(#map-marker-38-f)" stroke="url(#map-marker-38-s)"/>
      </g>
    </svg>`;

    const iconUrl =
        "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svgIcon);

    return new L.Icon({
        iconUrl,
        iconSize: [35, 60],
        iconAnchor: [22, 73],
        popupAnchor: [0, -60],
    });
};
