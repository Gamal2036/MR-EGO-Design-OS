import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  mode: "light" | "dark" | "system";
  isHighContrast: boolean;
  isReducedMotion: boolean;
  setMode: (mode: "light" | "dark" | "system") => void;
  setHighContrast: (value: boolean) => void;
  setReducedMotion: (value: boolean) => void;
  reset: () => void;
}

const initialState = {
  mode: "system" as const,
  isHighContrast: false,
  isReducedMotion: false,
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      ...initialState,
      setMode: (mode) => set({ mode }),
      setHighContrast: (isHighContrast) => set({ isHighContrast }),
      setReducedMotion: (isReducedMotion) => set({ isReducedMotion }),
      reset: () => set(initialState),
    }),
    {
      name: "mr-ego-theme",
    },
  ),
);
