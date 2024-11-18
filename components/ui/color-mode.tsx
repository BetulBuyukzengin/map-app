// "use client";

// import type { IconButtonProps } from "@chakra-ui/react";
// import { ClientOnly, IconButton, Skeleton } from "@chakra-ui/react";
// import { ThemeProvider, useTheme } from "next-themes";
// import type { ThemeProviderProps } from "next-themes";
// import * as React from "react";
// import { LuMoon, LuSun } from "react-icons/lu";

// export interface ColorModeProviderProps extends ThemeProviderProps {}

// export function ColorModeProvider(props: ColorModeProviderProps) {
//   return (
//     <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
//   );
// }

// export function useColorMode() {
//   const { resolvedTheme, setTheme } = useTheme();
//   const toggleColorMode = () => {
//     setTheme(resolvedTheme === "light" ? "dark" : "light");
//   };
//   return {
//     colorMode: resolvedTheme,
//     setColorMode: setTheme,
//     toggleColorMode,
//   };
// }

// export function useColorModeValue<T>(light: T, dark: T) {
//   const { colorMode } = useColorMode();
//   return colorMode === "light" ? light : dark;
// }

// export function ColorModeIcon() {
//   const { colorMode } = useColorMode();
//   return colorMode === "light" ? <LuSun /> : <LuMoon />;
// }

// interface ColorModeButtonProps extends Omit<IconButtonProps, "aria-label"> {}

// export const ColorModeButton = React.forwardRef<
//   HTMLButtonElement,
//   ColorModeButtonProps
// >(function ColorModeButton(props, ref) {
//   const { toggleColorMode } = useColorMode();
//   return (
//     <ClientOnly fallback={<Skeleton boxSize="8" />}>
//       <IconButton
//         onClick={toggleColorMode}
//         variant="ghost"
//         aria-label="Toggle color mode"
//         size="sm"
//         ref={ref}
//         {...props}
//         css={{
//           _icon: {
//             width: "5",
//             height: "5",
//           },
//         }}
//       >
//         <ColorModeIcon />
//       </IconButton>
//     </ClientOnly>
//   );
// });
"use client";

import * as React from "react";
import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { LuSun } from "react-icons/lu";

// Basitleştirilmiş ColorModeProvider
export function ColorModeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

// Basitleştirilmiş useColorMode hook'u
export function useColorMode() {
  return {
    colorMode: "light",
    setColorMode: () => {},
    toggleColorMode: () => {},
  };
}

// Basitleştirilmiş useColorModeValue hook'u
export function useColorModeValue<T>(light: T, _dark: T) {
  return light;
}

// Basitleştirilmiş ColorModeIcon
export function ColorModeIcon() {
  return <LuSun />;
}

// Basitleştirilmiş ColorModeButton
interface ColorModeButtonProps extends Omit<IconButtonProps, "aria-label"> {}

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
