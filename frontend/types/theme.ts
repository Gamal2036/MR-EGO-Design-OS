export type ThemeMode = "light" | "dark" | "system";

export type HighContrastMode = "none" | "light" | "dark";

export interface ThemeConfig {
  mode: ThemeMode;
  highContrast: HighContrastMode;
  isReducedMotion: boolean;
  isHighContrast: boolean;
}

export interface ThemeContextValue {
  theme: ThemeConfig;
  setTheme: (theme: Partial<ThemeConfig>) => void;
  toggleMode: () => void;
  isDark: boolean;
  resolvedTheme: "light" | "dark";
}

export interface ThemeEngine {
  getToken: (tokenPath: string) => string;
  resolve: (cssVar: string) => string;
  isDark: () => boolean;
  isHighContrast: () => boolean;
  isReducedMotion: () => boolean;
}
