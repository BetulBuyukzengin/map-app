"use client";
import { Button, Table } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { TiArrowRightThick } from "react-icons/ti";
import { useMapStore } from "../_store/useMapStore";
import { createIconWithColor } from "../_utils/createIconWithColor";
import CustomPopoverRoot from "./CustomPopoverRoot";
import EditDrawerContent from "./EditDrawerContent";

const MarkersTable = ({ isEdit, isList }) => {
  const { markers } = useMapStore();
  const [openPopoverIndex, setOpenPopoverIndex] = useState(null);

  const handlePopoverToggle = (index) => {
    setOpenPopoverIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  if (!markers || markers.length === 0)
    return (
      <div className="text-slate-600 font-semibold lg:text-lg">
        No location added ...
      </div>
    );

  return (
    <Table.ScrollArea
      borderWidth="1px"
      rounded="md"
      height="55%"
      maxHeight="55%"
      width="98%"
      className="bg-slate-50"
    >
      <Table.Root size="sm" showColumnBorder className="bg-slate-50">
        <Table.Header>
          {isList && (
            <Table.Row className="text-slate-600 text-lg lg:text-3xl font-semibold">
              <Table.ColumnHeader>Location Name</Table.ColumnHeader>
              <Table.ColumnHeader>Marker Icon</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">{""}</Table.ColumnHeader>
            </Table.Row>
          )}
          {isEdit && (
            <Table.Row className="text-slate-600 text-lg lg:text-3xl font-semibold">
              <Table.ColumnHeader>Location Name</Table.ColumnHeader>
              <Table.ColumnHeader>Location Address</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">{""}</Table.ColumnHeader>
            </Table.Row>
          )}
        </Table.Header>
        <Table.Body className="bg-slate-50">
          {markers.map((marker, index) => (
            <Table.Row key={marker.id}>
              {isList && (
                <>
                  <Table.Cell className="lg:text-lg text-slate-900">
                    {marker.markerName}
                  </Table.Cell>
                  <Table.Cell className="flex">
                    <Button onClick={() => handlePopoverToggle(index)}>
                      <img
                        src={createIconWithColor(marker.color).options.iconUrl}
                        alt="Marker Icon"
                        width={25}
                        height={25}
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
                      <Button size="md">
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
                    <EditDrawerContent markerId={marker.id} />
                  </Table.Cell>
                </>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};

export default MarkersTable;
