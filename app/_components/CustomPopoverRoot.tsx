import {
  Box,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  PopoverRoot,
} from "@chakra-ui/react";
import { RefObject } from "react";

interface CustomPopoverRootProps {
  children: React.ReactNode;
  ref: RefObject<HTMLDivElement>;
  open: boolean;
}

function CustomPopoverRoot({ children, ref, open }: CustomPopoverRootProps) {
  return (
    <PopoverRoot open={open}>
      <PopoverTrigger>
        <Box ref={ref} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>{children}</PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
}

export default CustomPopoverRoot;
