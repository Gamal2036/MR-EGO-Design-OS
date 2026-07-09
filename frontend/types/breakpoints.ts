export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export type DeviceType = "mobile" | "tablet" | "laptop" | "desktop" | "ultrawide";

export interface BreakpointConfig {
  name: Breakpoint;
  minWidth: number;
  maxWidth: number | null;
  deviceType: DeviceType;
  columns: number;
  gutter: number;
  containerMaxWidth: string;
}

export interface ResponsiveContext {
  breakpoint: Breakpoint;
  deviceType: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isUltrawide: boolean;
  orientation: "portrait" | "landscape";
  isTouchDevice: boolean;
  isReducedMotion: boolean;
}
