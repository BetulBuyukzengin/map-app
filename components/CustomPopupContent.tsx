import { Box } from "@chakra-ui/react";
import { CustomPopupContentType } from "@interfaces/customPopupContent.types";

const CustomPopupContent: React.FC<CustomPopupContentType> = ({ children }) => {
    return (
        <Box className="grid grid-cols-1 gap-4 text-center w-full">
            {children}
        </Box>
    );
};

export default CustomPopupContent;
