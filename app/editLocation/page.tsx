import MarkersTable from "../_components/MarkersTable";

export const metadata = {
  title: "Edit Location",
};

function EditLocation() {
  return (
    <div className="flex w-full justify-center items-center h-dvh p-8">
      <MarkersTable isEdit isList={false} />
    </div>
  );
}

export default EditLocation;
