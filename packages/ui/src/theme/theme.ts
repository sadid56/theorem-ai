import { createTheme } from "@mui/material";

export const tokens = {
  // Surfaces & Backgrounds
  bgCanvas: "#101413",
  bgPanel: "#191c1b",
  bgInput: "#0d100f",
  bgElevated: "#232726",
  bgSubtle: "#2d3130",
  bgOverlay: "rgba(0, 0, 0, 0.75)",
  bgBackdrop: "rgba(0, 0, 0, 0.65)",
  bgBlack: "#000000",

  // Borders
  borderDefault: "rgba(255, 255, 255, 0.08)",
  borderSubtle: "rgba(255, 255, 255, 0.05)",
  borderElevated: "rgba(255, 255, 255, 0.14)",
  borderHover: "rgba(255, 255, 255, 0.22)",
  borderActive: "#80cbc4",
  borderDisabled: "rgba(255, 255, 255, 0.05)",

  // Primary / Brand
  primary: "#80cbc4", // M3 Teal
  primaryHover: "#a7ffeb",
  primaryLight: "#a7ffeb",
  primarySubtle: "rgba(128, 203, 196, 0.16)",
  primaryDisabled: "rgba(128, 203, 196, 0.25)",
  primaryBorder: "rgba(128, 203, 196, 0.35)",

  // Typography Colors
  textPrimary: "#e0e3e1",
  textSecondary: "#bfc9c7",
  textMuted: "#899391",
  textDisabled: "rgba(255, 255, 255, 0.35)",
  textWhite: "#ffffff",

  // Status: Success
  success: "#a5d6a7",
  successText: "#34d399",
  successSubtle: "rgba(165, 214, 167, 0.15)",
  successBorder: "rgba(52, 211, 153, 0.30)",

  // Status: Warning
  warning: "#fbbf24",
  warningHover: "#f59e0b",
  warningSubtle: "rgba(245, 158, 11, 0.15)",
  warningBorder: "rgba(245, 158, 11, 0.35)",

  // Status: Error / Danger
  error: "#ffb4ab",
  errorSubtle: "rgba(255, 180, 171, 0.15)",
  danger: "#ffb4ab",
  dangerHover: "#ff897d",
  dangerSubtle: "rgba(255, 180, 171, 0.12)",
  dangerBorder: "rgba(255, 180, 171, 0.30)",

  // Shadows
  shadowSm: "0 2px 8px rgba(0, 0, 0, 0.2)",
  shadowMd: "0 4px 14px rgba(0, 0, 0, 0.3)",
  shadowLg: "0 10px 30px rgba(0, 0, 0, 0.6)",
  shadowElevated: "0 12px 36px rgba(0, 0, 0, 0.8)",
  shadowPopover: "0 22px 50px rgba(0, 0, 0, 0.92)",
  shadowDrawerRight: "-20px 0 50px rgba(0, 0, 0, 0.9)",
  shadowDrawerLeft: "20px 0 50px rgba(0, 0, 0, 0.9)",
  shadowPrimary: "0 4px 14px rgba(128, 203, 196, 0.25)",
  shadowPrimaryHover: "0 6px 20px rgba(128, 203, 196, 0.45)",

  // Border Radii
  radiusSm: 6,
  radiusMd: 8,
  radiusLg: 10,
  radiusXl: 14,
  radiusPill: 9999,
};

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: tokens.primary,
      light: tokens.primaryLight,
      dark: tokens.primaryHover,
    },
    secondary: {
      main: tokens.textSecondary,
    },
    background: {
      default: tokens.bgCanvas,
      paper: tokens.bgPanel,
    },
    text: {
      primary: tokens.textPrimary,
      secondary: tokens.textSecondary,
    },
    divider: tokens.borderDefault,
    success: {
      main: tokens.success,
    },
    error: {
      main: tokens.error,
    },
  },
  typography: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h5: { fontWeight: 700, letterSpacing: "-0.02em" },
    h6: { fontWeight: 600, letterSpacing: "-0.01em" },
    subtitle1: { fontWeight: 600, letterSpacing: "-0.01em" },
    subtitle2: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: {
    borderRadius: tokens.radiusMd,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: tokens.bgCanvas,
          color: tokens.textPrimary,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none !important",
          backgroundColor: tokens.bgPanel,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: "none !important",
          backgroundColor: tokens.bgPanel,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none !important",
          backgroundColor: tokens.bgPanel,
          border: `1px solid ${tokens.borderDefault}`,
          borderRadius: tokens.radiusLg,
          boxShadow: tokens.shadowMd,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          backgroundImage: "none !important",
          backgroundColor: `${tokens.bgElevated} !important`,
          border: `1px solid ${tokens.borderElevated} !important`,
          boxShadow: `${tokens.shadowPopover}, 0 0 0 1px ${tokens.borderDefault} !important`,
          borderRadius: `${tokens.radiusLg}px !important`,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: `${tokens.bgElevated} !important`,
          backgroundImage: "none !important",
          border: `1px solid ${tokens.borderElevated} !important`,
          boxShadow: `${tokens.shadowPopover}, 0 0 0 1px ${tokens.borderDefault} !important`,
          borderRadius: `${tokens.radiusLg}px !important`,
          marginTop: "6px",
        },
        list: {
          padding: "6px",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "0.85rem",
          borderRadius: tokens.radiusSm,
          margin: "2px 4px",
          color: tokens.textPrimary,
          "&:hover": {
            backgroundColor: tokens.bgSubtle,
          },
          "&.Mui-selected": {
            backgroundColor: `${tokens.primarySubtle} !important`,
            color: `${tokens.primaryLight} !important`,
            fontWeight: 600,
            border: `1px solid ${tokens.primarySubtle}`,
            "&:hover": {
              backgroundColor: `${tokens.primaryDisabled} !important`,
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radiusMd,
          textTransform: "none",
          fontWeight: 600,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radiusSm,
          fontWeight: 500,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: tokens.bgInput,
          borderRadius: tokens.radiusMd,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: tokens.borderDefault,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: tokens.borderHover,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: tokens.primary,
          },
        },
      },
    },
  },
});
