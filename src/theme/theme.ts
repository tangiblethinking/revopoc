import { createTheme, type Shadows } from "@mui/material/styles";

export interface NeutralScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
  main: string;
  light: string;
  dark: string;
  contrastText: string;
}

declare module "@mui/material/styles" {
  interface Palette {
    neutral: NeutralScale;
    shadow: string;
  }
  interface PaletteOptions {
    neutral?: Partial<NeutralScale>;
    shadow?: string;
  }
  interface TypeBackground {
    level1: string;
    level2: string;
    level3: string;
  }
}

const fontFamily = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif';

const shadows = [
  "none",
  "0px 1px 2px var(--mui-palette-shadow)",
  "0px 1px 5px var(--mui-palette-shadow)",
  "0px 1px 8px var(--mui-palette-shadow)",
  "0px 1px 10px var(--mui-palette-shadow)",
  "0px 1px 14px var(--mui-palette-shadow)",
  "0px 1px 18px var(--mui-palette-shadow)",
  "0px 2px 16px var(--mui-palette-shadow)",
  "0px 3px 14px var(--mui-palette-shadow)",
  "0px 3px 16px var(--mui-palette-shadow)",
  "0px 4px 18px var(--mui-palette-shadow)",
  "0px 4px 20px var(--mui-palette-shadow)",
  "0px 5px 22px var(--mui-palette-shadow)",
  "0px 5px 24px var(--mui-palette-shadow)",
  "0px 5px 26px var(--mui-palette-shadow)",
  "0px 6px 28px var(--mui-palette-shadow)",
  "0px 6px 30px var(--mui-palette-shadow)",
  "0px 6px 32px var(--mui-palette-shadow)",
  "0px 7px 34px var(--mui-palette-shadow)",
  "0px 7px 36px var(--mui-palette-shadow)",
  "0px 8px 38px var(--mui-palette-shadow)",
  "0px 8px 40px var(--mui-palette-shadow)",
  "0px 8px 42px var(--mui-palette-shadow)",
  "0px 9px 44px var(--mui-palette-shadow)",
  "0px 9px 46px var(--mui-palette-shadow)",
] as Shadows;

const lightNeutral: NeutralScale = {
  50: "#f5f6f8",
  100: "#eef1f5",
  200: "#e6e9ee",
  300: "#d2d7de",
  400: "#aab2bd",
  500: "#8a93a2",
  600: "#5a6473",
  700: "#424b59",
  800: "#2a323e",
  900: "#1a2230",
  950: "#0f1520",
  main: "#8a93a2",
  light: "#aab2bd",
  dark: "#5a6473",
  contrastText: "#fff",
};

const darkNeutral: NeutralScale = {
  50: "#fbfcfe",
  100: "#f0f4f8",
  200: "#dde7ee",
  300: "#cdd7e1",
  400: "#9fa6ad",
  500: "#636b74",
  600: "#555e68",
  700: "#32383e",
  800: "#202427",
  900: "#121517",
  950: "#090a0b",
  main: "#636b74",
  light: "#9fa6ad",
  dark: "#32383e",
  contrastText: "#fff",
};

export const theme = createTheme({
  cssVariables: { colorSchemeSelector: "class" },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#3a6ea5", light: "#6492bd", dark: "#305d8c", contrastText: "#fff" },
        secondary: { main: "#32383e", light: "#555e68", dark: "#202427", contrastText: "#fff" },
        error: { main: "#a8473f", contrastText: "#fff" },
        warning: { main: "#9a6b1f", contrastText: "#fff" },
        success: { main: "#2f7d5b", contrastText: "#fff" },
        info: { main: "#4a7aa9", contrastText: "#fff" },
        neutral: lightNeutral,
        shadow: "rgba(0, 0, 0, 0.08)",
        background: {
          default: "#f5f6f8",
          paper: "#ffffff",
          level1: "#f5f6f8",
          level2: "#eef1f5",
          level3: "#e6e9ee",
        },
        text: { primary: "#1a2230", secondary: "#5a6473" },
        divider: "#e6e9ee",
      },
    },
    dark: {
      palette: {
        primary: { main: "#6492bd", light: "#8fb0d0", dark: "#4a7cab", contrastText: "#fff" },
        secondary: { main: "#dde7ee", light: "#f0f4f8", dark: "#cdd7e1", contrastText: "#000" },
        error: { main: "#ba564b", contrastText: "#fff" },
        warning: { main: "#b1842f", contrastText: "#fff" },
        success: { main: "#4f9573", contrastText: "#fff" },
        info: { main: "#6491bd", contrastText: "#fff" },
        neutral: darkNeutral,
        shadow: "rgba(0, 0, 0, 0.5)",
        background: {
          default: "#090a0b",
          paper: "#121517",
          level1: "#202427",
          level2: "#32383e",
          level3: "#555e68",
        },
        text: { primary: "#f0f4f8", secondary: "#9fa6ad" },
        divider: "#32383e",
      },
    },
  },
  shape: { borderRadius: 8 },
  spacing: 8,
  shadows,
  typography: {
    fontFamily,
    h1: { fontWeight: 500, fontSize: "3.5rem", lineHeight: 1.2 },
    h2: { fontWeight: 500, fontSize: "3rem", lineHeight: 1.2 },
    h3: { fontWeight: 500, fontSize: "2.25rem", lineHeight: 1.2 },
    h4: { fontWeight: 500, fontSize: "2rem", lineHeight: 1.2 },
    h5: { fontWeight: 500, fontSize: "1.5rem", lineHeight: 1.2 },
    h6: { fontWeight: 500, fontSize: "1.125rem", lineHeight: 1.2 },
    subtitle1: { fontWeight: 500, fontSize: "1rem", lineHeight: 1.57 },
    subtitle2: { fontWeight: 500, fontSize: "0.875rem", lineHeight: 1.57 },
    body1: { fontWeight: 400, fontSize: "1rem", lineHeight: 1.5 },
    body2: { fontWeight: 400, fontSize: "0.875rem", lineHeight: 1.57 },
    button: { textTransform: "none", fontWeight: 500, fontSize: "0.875rem", lineHeight: 1.75 },
    caption: { fontWeight: 400, fontSize: "0.75rem", lineHeight: 1.66 },
  },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
    MuiCssBaseline: {
      styleOverrides: {
        ":root, .light, .dark": {
          "--NavChrome-950": "#0f1d30",
          "--NavChrome-900": "#13243a",
          "--NavChrome-800": "#18304e",
          "--NavChrome-300": "#97b3d3",
          "--NavChrome-lightChannel": "94 135 179",
          "--SideNav-width": "252px",
          "--SideNav-zIndex": "1100",
          "--MainNav-height": "62px",
          "--mui-custom-rankTier": "top",
        },
        html: {
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
        body: {
          fontVariantNumeric: "tabular-nums",
        },
      },
    },
  },
});
