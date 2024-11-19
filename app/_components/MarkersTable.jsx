"use client";
import { Button, Table } from "@chakra-ui/react";
import { createIconWithColor } from "../_utils/createIconWithColor";
import Link from "next/link";
import CustomPopoverRoot from "./CustomPopoverRoot";
import { useState } from "react";
import { TiArrowRightThick } from "react-icons/ti";
import { CustomDrawer } from "./CustomDrawer";
import { useMapStore } from "../_store/useMapStore";

const MarkersTable = ({ isEdit, isList, setOpen, open }) => {
  const { markers } = useMapStore();
  const [openPopoverIndex, setOpenPopoverIndex] = useState(null);

  const handlePopoverToggle = (index) => {
    setOpenPopoverIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  if (!markers || markers.length === 0)
    return <div>Herhangi bir konum eklenmemiş</div>;

  return (
    <Table.Root size="sm" showColumnBorder className="w-[75%]">
      <Table.Header>
        {isList && (
          <Table.Row>
            <Table.ColumnHeader>Location Name</Table.ColumnHeader>
            <Table.ColumnHeader>Marker Icon</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">{""}</Table.ColumnHeader>
          </Table.Row>
        )}
        {isEdit && (
          <Table.Row>
            <Table.ColumnHeader>Location Name</Table.ColumnHeader>
            <Table.ColumnHeader>Location Address</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">{""}</Table.ColumnHeader>
          </Table.Row>
        )}
      </Table.Header>
      <Table.Body>
        {markers.map((marker, index) => (
          <Table.Row key={marker.id}>
            {isList && (
              <>
                <Table.Cell>{marker.markerName}</Table.Cell>
                <Table.Cell className="flex">
                  <Button onClick={() => handlePopoverToggle(index)}>
                    <img
                      src={createIconWithColor(marker.color).options.iconUrl}
                      alt="Marker Icon"
                      width={45}
                      height={45}
                    />
                  </Button>
                  {openPopoverIndex === index && (
                    <CustomPopoverRoot open setOpen>
                      <div>
                        lat:{marker.position[0]} & lng: {marker.position[1]}
                      </div>
                    </CustomPopoverRoot>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Link href="/editLocation">
                    <Button size="xs">
                      <TiArrowRightThick />
                    </Button>
                  </Link>
                </Table.Cell>
              </>
            )}
            {isEdit && (
              <>
                <Table.Cell>{marker.markerName}</Table.Cell>
                <Table.Cell>{marker.address}</Table.Cell>
                <Table.Cell className="flex flex-col">
                  <CustomDrawer markerId={marker.id} />
                </Table.Cell>
              </>
            )}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default MarkersTable;
