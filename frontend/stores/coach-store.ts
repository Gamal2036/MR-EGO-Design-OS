import { create } from "zustand";
import { persist } from "zustand/middleware";

import { demoCoachData } from "@/data/coach";
import type {
  CoachData,
  CoachStore,
  CoachTimeframe,
  CoachViewState,
} from "@/types/coach";

const INITIAL_STATE = {
  data: null as CoachData | null,
  viewState: "loading" as CoachViewState,
  selectedTimeframe: "all" as CoachTimeframe | "all",
  selectedInsightId: null as string | null,
  selectedDecisionId: null as string | null,
  completedActionIds: [] as string[],
  lastUpdated: null as string | null,
};

export const useCoachStore = create<CoachStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      setViewState: (state) => set({ viewState: state }),

      setData: (data) =>
        set({
          data,
          viewState: "ready",
          lastUpdated: new Date().toISOString(),
        }),

      selectTimeframe: (timeframe) => set({ selectedTimeframe: timeframe }),

      selectInsight: (id) => set({ selectedInsightId: id }),

      selectDecision: (id) => set({ selectedDecisionId: id }),

      toggleActionCompleted: (id) => {
        const completedActionIds = get().completedActionIds;
        const isCompleted = completedActionIds.includes(id);
        const nextCompleted = isCompleted
          ? completedActionIds.filter((actionId) => actionId !== id)
          : [...completedActionIds, id];

        set({
          completedActionIds: nextCompleted,
          lastUpdated: new Date().toISOString(),
        });
      },

      markAllDailyComplete: () => {
        const data = get().data;
        if (!data) return;

        const dailyIds = data.actionPlan.daily.map((action) => action.id);
        set({
          completedActionIds: [
            ...new Set([...get().completedActionIds, ...dailyIds]),
          ],
          lastUpdated: new Date().toISOString(),
        });
      },

      resetCoach: () =>
        set({
          ...INITIAL_STATE,
          data: demoCoachData,
          viewState: "ready",
          lastUpdated: new Date().toISOString(),
        }),
    }),
    {
      name: "mr-ego-ai-career-coach",
      partialize: (state) => ({
        data: state.data,
        selectedTimeframe: state.selectedTimeframe,
        selectedInsightId: state.selectedInsightId,
        selectedDecisionId: state.selectedDecisionId,
        completedActionIds: state.completedActionIds,
        lastUpdated: state.lastUpdated,
      }),
    }
  )
);
