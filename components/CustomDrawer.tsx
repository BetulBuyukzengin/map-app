import { MdMenu } from "react-icons/md";
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
} from "@components/ui/drawer";
import { Button } from "@components/ui/button";
import { CustomDrawerType } from "@interfaces/customDrawer.types";

export const CustomDrawer: React.FC<CustomDrawerType> = ({
    children,
    handleUpdateMarker,
    isEdit,
    isHeader,
}) => {
    return (
        <DrawerRoot placement={`${isEdit ? "end" : "start"}`}>
            <DrawerBackdrop />
            <DrawerTrigger asChild className={`${isHeader ? "lg:hidden" : ""}`}>
                <Button
                    variant="outline"
                    size="md"
                    className={`${
                        isHeader ? "text-slate-50" : "text-slate-900"
                    }`}
                >
                    {isEdit ? "Edit" : <MdMenu className="size-10" />}
                </Button>
            </DrawerTrigger>
            <DrawerContent
                className={`${
                    isHeader ? "bg-slate-600 text-slate-50" : "text-slate-600"
                } `}
            >
                {isEdit && (
                    <DrawerHeader>
                        <DrawerTitle>Edit Location</DrawerTitle>
                    </DrawerHeader>
                )}
                <DrawerBody>{children}</DrawerBody>
                {isEdit && (
                    <DrawerFooter>
                        <DrawerActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerActionTrigger>
                        <Button onClick={handleUpdateMarker}>Save</Button>
                    </DrawerFooter>
                )}
                <DrawerCloseTrigger />
            </DrawerContent>
        </DrawerRoot>
    );
};
