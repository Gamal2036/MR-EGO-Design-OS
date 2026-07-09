import type { Breakpoint, BreakpointConfig, DeviceType } from "@/types/breakpoints";

export const BREAKPOINTS: Record<Breakpoint, { min: number; max: number | null }> = {
  sm: { min: 0, max: 767 },
  md: { min: 768, max: 1023 },
  lg: { min: 1024, max: 1279 },
  xl: { min: 1280, max: 1599 },
  "2xl": { min: 1600, max: null },
} as const;

export const BREAKPOINT_CONFIGS: BreakpointConfig[] = [
  {
    name: "sm",
    minWidth: 0,
    maxWidth: 767,
    deviceType: "mobile",
    columns: 4,
    gutter: 16,
    containerMaxWidth: "100%",
  },
  {
    name: "md",
    minWidth: 768,
    maxWidth: 1023,
    deviceType: "tablet",
    columns: 8,
    gutter: 24,
    containerMaxWidth: "720px",
  },
  {
    name: "lg",
    minWidth: 1024,
    maxWidth: 1279,
    deviceType: "laptop",
    columns: 12,
    gutter: 32,
    containerMaxWidth: "960px",
  },
  {
    name: "xl",
    minWidth: 1280,
    maxWidth: 1599,
    deviceType: "desktop",
    columns: 12,
    gutter: 32,
    containerMaxWidth: "1140px",
  },
  {
    name: "2xl",
    minWidth: 1600,
    maxWidth: null,
    deviceType: "ultrawide",
    columns: 12,
    gutter: 40,
    containerMaxWidth: "1440px",
  },
] as const;

export const DEVICE_BREAKPOINT_MAP: Record<DeviceType, { min: number; max: number | null }> = {
  mobile: { min: 0, max: 767 },
  tablet: { min: 768, max: 1023 },
  laptop: { min: 1024, max: 1279 },
  desktop: { min: 1280, max: 1599 },
  ultrawide: { min: 1600, max: null },
};
