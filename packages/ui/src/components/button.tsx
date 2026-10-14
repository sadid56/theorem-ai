import React from "react";
import {
  Button as MuiButton,
  CircularProgress,
  type ButtonProps as MuiButtonProps,
} from "@mui/material";
import { tokens } from "../theme/theme";

export type ButtonVariant =
  "primary" | "secondary" | "outlined" | "ghost" | "danger";

export interface ButtonProps extends Omit<MuiButtonProps, "variant"> {
  variant?: ButtonVariant;
  loading?: boolean;
  loadingText?: React.ReactNode;
  component?: React.ElementType;
  download?: string;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  loading = false,
  loadingText,
  disabled = false,
  startIcon,
  endIcon,
  children,
  sx,
  size = "medium",
  ...rest
}) => {
  const isDisabled = disabled || loading;

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          bgcolor: tokens.primary,
          color: tokens.bgCanvas,
          border: "1px solid transparent",
          fontWeight: 700,
          boxShadow: tokens.shadowPrimary,
          "&:hover": {
            bgcolor: tokens.primaryHover,
            color: tokens.bgCanvas,
            boxShadow: tokens.shadowPrimaryHover,
          },
          "&.Mui-disabled": {
            bgcolor: tokens.primaryDisabled,
            color: tokens.textDisabled,
            boxShadow: "none",
          },
        };

      case "secondary":
      case "outlined":
        return {
          bgcolor: tokens.bgPanel,
          color: tokens.textPrimary,
          border: `1px solid ${tokens.borderDefault}`,
          boxShadow: tokens.shadowSm,
          fontWeight: 500,
          "&:hover": {
            bgcolor: tokens.bgSubtle,
            borderColor: tokens.primaryLight,
            color: tokens.textPrimary,
            boxShadow: tokens.shadowMd,
          },
          "&.Mui-disabled": {
            bgcolor: tokens.bgInput,
            color: tokens.textDisabled,
            borderColor: tokens.borderDisabled,
            boxShadow: "none",
          },
        };

      case "ghost":
        return {
          bgcolor: "transparent",
          color: tokens.textSecondary,
          border: "1px solid transparent",
          fontWeight: 500,
          boxShadow: "none",
          "&:hover": {
            bgcolor: tokens.bgSubtle,
            color: tokens.textPrimary,
          },
          "&.Mui-disabled": {
            color: tokens.textDisabled,
          },
        };

      case "danger":
        return {
          bgcolor: tokens.dangerSubtle,
          color: tokens.danger,
          border: `1px solid ${tokens.dangerBorder}`,
          fontWeight: 600,
          boxShadow: tokens.shadowSm,
          "&:hover": {
            bgcolor: tokens.errorSubtle,
            borderColor: tokens.error,
            color: tokens.textPrimary,
            boxShadow: tokens.shadowMd,
          },
          "&.Mui-disabled": {
            bgcolor: tokens.bgInput,
            borderColor: tokens.borderDisabled,
            color: tokens.textDisabled,
            boxShadow: "none",
          },
        };
    }
  };

  const spinnerSize = size === "small" ? 14 : size === "large" ? 20 : 16;

  return (
    <MuiButton
      disabled={isDisabled}
      size={size}
      startIcon={
        loading ? (
          <CircularProgress size={spinnerSize} color="inherit" />
        ) : (
          startIcon
        )
      }
      endIcon={loading ? undefined : endIcon}
      sx={{
        borderRadius: `${tokens.radiusMd}px`,
        textTransform: "none",
        fontSize:
          size === "small"
            ? "0.82rem"
            : size === "large"
              ? "0.98rem"
              : "0.88rem",
        py: size === "small" ? 0.6 : size === "large" ? 1.2 : 0.9,
        px: size === "small" ? 1.8 : size === "large" ? 3.2 : 2.4,
        transition: "all 0.18s ease-in-out",
        ...getVariantStyles(),
        ...sx,
      }}
      {...rest}
    >
      {loading && loadingText ? loadingText : children}
    </MuiButton>
  );
};
