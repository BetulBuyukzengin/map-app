import { ReactNode } from "react";

export interface CustomDrawerType {
    handleUpdateMarker?: () => void;
    children: ReactNode;
    isEdit?: boolean;
    isHeader?: boolean;
}
