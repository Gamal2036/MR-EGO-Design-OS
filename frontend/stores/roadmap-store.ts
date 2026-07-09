import { create } from "zustand";
import { persist } from "zustand/middleware";

import { demoAIRoadmapData, demoCareerPaths } from "@/data/roadmaps";
import type {
  AIRoadmapData,
  AIRoadmapStore,
  RoadmapViewState,
} from "@/types/roadmap";

const INITIAL_STATE = {
  data: null as AIRoadmapData | null,
  viewState: "loading" as RoadmapViewState,
  selectedCareerPathId: demoCareerPaths[0]?.id ?? null,
  selectedPhaseId: null as string | null,
  lastUpdated: null as string | null,
};

function computeOverallCompletion(phases: AIRoadmapData["phases"]): number {
  if (phases.length === 0) return 0;
  const weights: Record<string, number> = {
    locked: 0,
    available: 0.15,
    "in-progress": 0.55,
    completed: 1,
  };
  const total = phases.reduce(
    (sum, phase) => sum + (weights[phase.status] ?? 0),
    0
  );
  return Math.round((total / phases.length) * 100);
}

export const useRoadmapStore = create<AIRoadmapStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      setViewState: (viewState) => set({ viewState }),

      setData: (data) =>
        set({
          data: {
            ...data,
            overallCompletion: computeOverallCompletion(data.phases),
          },
          viewState: "ready",
          lastUpdated: new Date().toISOString(),
        }),

      selectCareerPath: (id) => {
        const path = demoCareerPaths.find((p) => p.id === id);
        if (!path) return;

        const baseData = get().data ?? demoAIRoadmapData;
        const updatedData: AIRoadmapData = {
          ...baseData,
          careerPath: path,
          learningHoursRemaining: Math.round(path.totalHours * 0.58),
        };

        set({
          selectedCareerPathId: id,
          data: {
            ...updatedData,
            overallCompletion: computeOverallCompletion(updatedData.phases),
          },
          lastUpdated: new Date().toISOString(),
        });
      },

      selectPhase: (id) => set({ selectedPhaseId: id }),

      toggleTask: (taskId) => {
        const data = get().data;
        if (!data) return;

        const toggleInList = (tasks: AIRoadmapData["dailyPlan"]["tasks"]) =>
          tasks.map((task) =>
            task.id === taskId
              ? { ...task, completed: !task.completed }
              : task
          );

        const updatedDailyTasks = toggleInList(data.dailyPlan.tasks);
        const updatedWeeklyTasks = toggleInList(data.weeklyPlan.tasks);

        const dailyCompleted = updatedDailyTasks.filter((t) => t.completed).length;
        const weeklyCompleted = updatedWeeklyTasks.filter((t) => t.completed).length;

        set({
          data: {
            ...data,
            dailyPlan: { ...data.dailyPlan, tasks: updatedDailyTasks },
            weeklyPlan: {
              ...data.weeklyPlan,
              tasks: updatedWeeklyTasks,
              completedTasks: weeklyCompleted,
              totalTasks: updatedWeeklyTasks.length,
            },
            learningHoursRemaining: Math.max(
              0,
              data.learningHoursRemaining - 1
            ),
          },
          lastUpdated: new Date().toISOString(),
        });
      },

      resetRoadmap: () =>
        set({
          ...INITIAL_STATE,
          data: demoAIRoadmapData,
          viewState: "ready",
          lastUpdated: new Date().toISOString(),
        }),
    }),
    {
      name: "mr-ego-ai-roadmap",
      partialize: (state) => ({
        data: state.data,
        selectedCareerPathId: state.selectedCareerPathId,
        selectedPhaseId: state.selectedPhaseId,
        lastUpdated: state.lastUpdated,
      }),
    }
  )
);
