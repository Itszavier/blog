/** @format */

import { extendTheme, ThemeOverride } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

// Define color schemes
const colors = {
  light: {
    background: "#F7F7F7",
    primaryText: "#333333",
    secondaryText: "#555555",
    accent: "#1E88E5",
    buttonBackground: "#a19c9c",
    buttonText: "#333333",
    buttonBorder: "#CCCCCC",
    secondaryButtonBackground: "#D3D3D3",
    secondaryButtonText: "#555555",
    successButtonBackground: "#4CAF50",
    successButtonText: "#FFFFFF",
    dangerButtonBackground: "#F44336",
    dangerButtonText: "#FFFFFF",
    warningButtonBackground: "#FFC107",
    warningButtonText: "#333333",
    inputBackground: "#FFFFFF",
    inputText: "#333333",
    inputBorder: "#CCCCCC",
    headerFooterBackground: "#E0E0E0",
    headerFooterText: "#333333",
    cardBackground: "#FFFFFF",
    cardText: "#333333",
    cardBorder: "#CCCCCC",
    borderColor: "#CCCCCC",
  },
  dark: {
    background: "#121212",
    primaryText: "#D3D3D4",
    secondaryText: "#B0B0B0",
    accent: "#BB86FC",
    buttonBackground: "#1F1F1F",
    buttonText: "#FFFFFF",
    buttonBorder: "#272727",
    secondaryButtonBackground: "#333333",
    secondaryButtonText: "#B0B0B0",
    successButtonBackground: "#388E3C",
    successButtonText: "#FFFFFF",
    dangerButtonBackground: "#D32F2F",
    dangerButtonText: "#FFFFFF",
    warningButtonBackground: "#FBC02D",
    warningButtonText: "#000000",
    inputBackground: "#1F1F1F",
    inputText: "#FFFFFF",
    inputBorder: "#272727",
    headerFooterBackground: "#1F1F1F",
    headerFooterText: "#FFFFFF",
    cardBackground: "#1F1F1F",
    cardText: "#FFFFFF",
    cardBorder: "#272727",
    borderColor: "#272727",
  },
};

// Extend the Chakra UI theme
const theme: ThemeOverride = extendTheme({
  colors: {
    light: colors.light,
    dark: colors.dark,
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: colors.light.background,
        color: colors.light.primaryText,
      },
      a: {
        color: colors.dark.accent,
      },
      button: {
        bg: colors.light.buttonBackground,
        color: colors.light.primaryText,
        borderColor: colors.light.buttonBorder,
        "&.primary": {
          bg: colors.light.accent,
          color: "#FFFFFF",
        },
        "&.secondary": {
          bg: colors.light.secondaryButtonBackground,

          color: colors.light.secondaryButtonText,
        },
        "&.success": {
          bg: colors.light.successButtonBackground,
          color: colors.light.successButtonText,
        },
        "&.danger": {
          bg: colors.light.dangerButtonBackground,

          color: colors.light.dangerButtonText,
        },
        "&.warning": {
          bg: colors.light.warningButtonBackground,

          color: colors.light.warningButtonText,
        },
      },
    }),
  },
});

export default theme;
