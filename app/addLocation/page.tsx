"use client";
import "leaflet/dist/leaflet.css";
import AddLocationsMapComponent from "../_components/AddLocationsMapComponent";

const AddLocation = () => {
  //   useEffect(() => {
  //     document.title = "Add Location";
  //   }, []);

  return (
    <main className="relative">
      <AddLocationsMapComponent />
    </main>
  );
};

export default AddLocation;
