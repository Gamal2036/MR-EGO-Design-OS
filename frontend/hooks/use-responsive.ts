"use client";

import { useMemo } from "react";
import type { Breakpoint, ResponsiveContext } from "@/types/breakpoints";
import { BREAKPOINTS } from "@/config/breakpoints";
import { useMediaQuery } from "./use-media-query";

function getBreakpoint(width: number): Breakpoint {
  if (width >= BREAKPOINTS["2xl"].min) return "2xl";
  if (width >= BREAKPOINTS.xl.min) return "xl";
  if (width >= BREAKPOINTS.lg.min) return "lg";
  if (width >= BREAKPOINTS.md.min) return "md";
  return "sm";
}

function getDeviceType(breakpoint: Breakpoint): ResponsiveContext["deviceType"] {
  switch (breakpoint) {
    case "sm": return "mobile";
    case "md": return "tablet";
    case "lg": return "laptop";
    case "xl": return "desktop";
    case "2xl": return "ultrawide";
  }
}

export function useResponsive(): ResponsiveContext {
  const width = useMediaQuery("(min-width: 0px)") ? window?.innerWidth ?? 0 : 0;
  const isTouchDevice = useMediaQuery("(pointer: coarse)");
  const isReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isLandscape = useMediaQuery("(orientation: landscape)");

  return useMemo(() => {
    const breakpoint = getBreakpoint(width);
    const deviceType = getDeviceType(breakpoint);

    return {
      breakpoint,
      deviceType,
      isMobile: deviceType === "mobile",
      isTablet: deviceType === "tablet",
      isDesktop: deviceType === "laptop" || deviceType === "desktop",
      isUltrawide: deviceType === "ultrawide",
      orientation: isLandscape ? "landscape" : "portrait",
      isTouchDevice,
      isReducedMotion,
    };
  }, [width, isTouchDevice, isReducedMotion, isLandscape]);
}

export function useBreakpoint(breakpoint: Breakpoint): boolean {
  const config = BREAKPOINTS[breakpoint];
  const query = config.max !== null
    ? `(min-width: ${config.min}px) and (max-width: ${config.max}px)`
    : `(min-width: ${config.min}px)`;

  return useMediaQuery(query);
}

export function useIsMobile(): boolean {
  return useBreakpoint("sm");
}

export function useIsTablet(): boolean {
  return useBreakpoint("md");
}

export function useIsDesktop(): boolean {
  return !useIsMobile() && !useIsTablet();
}

export { useMediaQuery };
