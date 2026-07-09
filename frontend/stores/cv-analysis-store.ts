import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CVAnalysisState, AnalysisSection } from "@/types/cv-analysis";

interface CVAnalysisStore extends CVAnalysisState {
  setActiveSection: (section: AnalysisSection) => void;
  startAnalysis: () => void;
  completeAnalysis: () => void;
  toggleImprovement: (id: string) => void;
  resetAnalysis: () => void;
}

export const useCVAnalysisStore = create<CVAnalysisStore>()(
  persist(
    (set, get) => ({
      analysisData: null,
      activeSection: "overview",
      isAnalyzing: false,
      lastAnalyzed: null,

      setActiveSection: (section) => set({ activeSection: section }),

      startAnalysis: () => set({ isAnalyzing: true }),

      completeAnalysis: () =>
        set({
          isAnalyzing: false,
          lastAnalyzed: new Date().toISOString(),
        }),

      toggleImprovement: (id) => {
        const data = get().analysisData;
        if (!data) return;
        set({
          analysisData: {
            ...data,
            improvements: data.improvements.map((i) =>
              i.id === id ? { ...i, completed: !i.completed } : i
            ),
          },
        });
      },

      resetAnalysis: () =>
        set({
          analysisData: null,
          activeSection: "overview",
          isAnalyzing: false,
          lastAnalyzed: null,
        }),
    }),
    {
      name: "mr-ego-cv-analysis",
      partialize: (state) => ({
        analysisData: state.analysisData,
        activeSection: state.activeSection,
        lastAnalyzed: state.lastAnalyzed,
      }),
    }
  )
);
