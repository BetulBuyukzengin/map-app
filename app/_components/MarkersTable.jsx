"use client";
import { Table } from "@chakra-ui/react";
import { useMapStore } from "../_store/useMapStore";

const MarkersTable = () => {
  //   const { markers } = useMapStore();
  const markers = JSON.parse(localStorage.getItem("markers"));
  console.log(markers);
  return (
    <Table.Root size="sm" showColumnBorder className="w-[75%]">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Location Name</Table.ColumnHeader>
          <Table.ColumnHeader>Location Adderss</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Color</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {markers.map((marker) => (
          <Table.Row key={marker.id}>
            <Table.Cell>{marker.markerName}</Table.Cell>
            <Table.Cell>{marker.address}</Table.Cell>
            <Table.Cell>{marker.color}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default MarkersTable;
