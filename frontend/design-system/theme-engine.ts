import type { ThemeEngine } from "@/types/theme";

function getCssVar(name: string): string {
  if (typeof document === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export function createThemeEngine(): ThemeEngine {
  return {
    getToken(tokenPath: string): string {
      const varName = tokenPath.startsWith("--") ? tokenPath : `--${tokenPath}`;
      return getCssVar(varName);
    },

    resolve(cssVar: string): string {
      const resolved = cssVar.replace(/var\(--([^)]+)\)/g, (_match, name) => {
        return getCssVar(`--${name}`) || cssVar;
      });
      return resolved;
    },

    isDark(): boolean {
      return document.documentElement.classList.contains("dark");
    },

    isHighContrast(): boolean {
      return document.documentElement.classList.contains("high-contrast");
    },

    isReducedMotion(): boolean {
      return (
        document.documentElement.classList.contains("reduced-motion") ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    },
  };
}

export const themeEngine = createThemeEngine();
