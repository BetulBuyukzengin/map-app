import {
  Box,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  PopoverRoot,
} from "@chakra-ui/react";

function CustomPopoverRoot({
  children,
  popoverAnchorRef,
  open,
  positionRight,
  setOpen,
}) {
  return (
    <PopoverRoot
      open={open}
      // positioning={{
      //   offset: { crossAxis: 20, mainAxis: 10 },
      //   placement: "right",
      // }}
    >
      <PopoverTrigger>
        <Box ref={popoverAnchorRef} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>{children}</PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
}

export default CustomPopoverRoot;
