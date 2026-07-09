"use client";

import { useEffect } from "react";
import { type ThemeProviderProps } from "next-themes";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useThemeStore } from "@/stores/theme-store";

function ThemeApplier() {
  const { resolvedTheme } = useTheme();
  const isHighContrast = useThemeStore((state) => state.isHighContrast);
  const isReducedMotion = useThemeStore((state) => state.isReducedMotion);

  useEffect(() => {
    const root = document.documentElement;

    if (isHighContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }

    if (isReducedMotion) {
      root.classList.add("reduced-motion");
    } else {
      root.classList.remove("reduced-motion");
    }
  }, [isHighContrast, isReducedMotion]);

  return null;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <ThemeApplier />
      {children}
    </NextThemesProvider>
  );
}
