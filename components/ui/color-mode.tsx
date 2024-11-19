"use client";

import * as React from "react";
import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { LuSun } from "react-icons/lu";

export function ColorModeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useColorMode() {
  return {
    colorMode: "light",
    setColorMode: () => {},
    toggleColorMode: () => {},
  };
}

export function useColorModeValue<T>(light: T) {
  return light;
}

export function ColorModeIcon() {
  return <LuSun />;
}

// interface ColorModeButtonProps extends Omit<IconButtonProps, "aria-label"> {}
type ColorModeButtonProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeButton = React.forwardRef<
  HTMLButtonElement,
  ColorModeButtonProps
>(function ColorModeButton(props, ref) {
  return (
    <IconButton
      variant="ghost"
      aria-label="Color mode (Light only)"
      size="sm"
      ref={ref}
      {...props}
      css={{
        _icon: {
          width: "5",
          height: "5",
        },
      }}
    >
      <ColorModeIcon />
    </IconButton>
  );
});
