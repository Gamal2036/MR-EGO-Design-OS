"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { AnalyticsPeriod, AnalyticsViewState } from "@/types/analytics";

interface AnalyticsStoreState {
  period: AnalyticsPeriod;
  viewState: AnalyticsViewState;
}

interface AnalyticsStoreActions {
  setPeriod: (period: AnalyticsPeriod) => void;
  setViewState: (viewState: AnalyticsViewState) => void;
  resetAnalytics: () => void;
}

const INITIAL_STATE: AnalyticsStoreState = {
  period: "30d",
  viewState: "loading",
};

export const useAnalyticsStore = create<AnalyticsStoreState & AnalyticsStoreActions>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,
      setPeriod: (period) => set({ period }),
      setViewState: (viewState) => set({ viewState }),
      resetAnalytics: () => set(INITIAL_STATE),
    }),
    {
      name: "mr-ego-analytics",
      partialize: (state) => ({ period: state.period }),
    }
  )
);
