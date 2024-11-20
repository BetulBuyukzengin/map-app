import ComponentRouteMap from "../_components/ComponentRouteMap";
import "leaflet/dist/leaflet.css";

export const metadata = {
  title: "Route Create",
};

function RouteCreate() {
  return (
    <main className="relative ">
      <ComponentRouteMap />
    </main>
  );
}

export default RouteCreate;
