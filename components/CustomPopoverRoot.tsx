import {
  Box,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@chakra-ui/react";
import { CustomPopoverRootPropsType } from "@interfaces/customPopoverRootProps.types";

function CustomPopoverRoot({ children, open }: CustomPopoverRootPropsType) {
  return (
    <PopoverRoot open={open}>
      <PopoverTrigger>
        <Box />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>{children}</PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
}

export default CustomPopoverRoot;
