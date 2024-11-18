import { Input, Stack, Textarea } from "@chakra-ui/react";
import { Button } from "../../components/ui/button";
import { Field } from "../../components/ui/field";
import {
  PopoverArrow,
  PopoverBody,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "../../components/ui/popover";

export const CustomPopover = (popoverPosition) => {
  return (
    <PopoverRoot open={!!popoverPosition}>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Stack gap="4">
            <Field label="Width">
              <Input placeholder="40px" />
            </Field>
            <Field label="Height">
              <Input placeholder="32px" />
            </Field>
            <Field label="Comments">
              <Textarea placeholder="Start typing..." />
            </Field>
          </Stack>
        </PopoverBody>
        <PopoverCloseTrigger />
      </PopoverContent>
    </PopoverRoot>
  );
};
