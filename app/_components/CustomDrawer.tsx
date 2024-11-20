"use client";

import { ReactNode } from "react";
import { Button } from "../../components/ui/button";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { MdMenu } from "react-icons/md";

interface CustomDrawerType {
  handleUpdateMarker: () => void;
  children: ReactNode;
  ref: HTMLInputElement;
  isEdit: boolean;
  isHeader: boolean;
}

export const CustomDrawer: React.FC<CustomDrawerType> = (
  { children, handleUpdateMarker, isEdit, isHeader },
  ref
) => {
  return (
    <DrawerRoot
      initialFocusEl={() => ref.current}
      placement={`${isEdit ? "end" : "start"}`}
    >
      <DrawerBackdrop />
      <DrawerTrigger asChild className={`${isHeader ? "lg:hidden" : ""}`}>
        <Button
          variant="outline"
          size="md"
          className={`${isHeader ? "text-slate-50" : "text-slate-900"}`}
        >
          {isEdit ? "Edit" : <MdMenu className="size-10" />}
        </Button>
      </DrawerTrigger>
      <DrawerContent
        className={`${isHeader ? "bg-slate-600" : ""} text-slate-50`}
      >
        <DrawerHeader>
          <DrawerTitle>{isEdit ? "Edit Location" : ""}</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
        {isEdit ? (
          <DrawerFooter>
            <DrawerActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerActionTrigger>
            <Button onClick={handleUpdateMarker}>Save</Button>
          </DrawerFooter>
        ) : null}
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};
