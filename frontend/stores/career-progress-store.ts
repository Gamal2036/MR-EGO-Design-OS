import { create } from "zustand";
import { persist } from "zustand/middleware";

import { demoCareerProgressData } from "@/data/career-progress";
import type {
  CareerProgressData,
  CareerProgressStore,
  CareerProgressViewState,
  LearningItemType,
  MilestoneStatus,
  SkillCategory,
} from "@/types/career-progress";

const INITIAL_STATE = {
  data: null as CareerProgressData | null,
  viewState: "loading" as CareerProgressViewState,
  selectedGoalId: null as string | null,
  selectedSkillCategory: "all" as SkillCategory | "all",
  selectedLearningType: "all" as LearningItemType | "all",
  lastUpdated: null as string | null,
};

export const useCareerProgressStore = create<CareerProgressStore>()(
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

      toggleGoalStatus: (id) => {
        const data = get().data;
        if (!data) return;

        set({
          data: {
            ...data,
            goals: data.goals.map((goal) => {
              if (goal.id !== id) return goal;
              const nextStatus =
                goal.status === "completed" ? "pending" : "completed";
              return {
                ...goal,
                status: nextStatus,
                progress: nextStatus === "completed" ? 100 : goal.progress,
              };
            }),
          },
          lastUpdated: new Date().toISOString(),
        });
      },

      toggleMilestoneStatus: (id) => {
        const data = get().data;
        if (!data) return;

        set({
          data: {
            ...data,
            milestones: data.milestones.map((milestone) => {
              if (milestone.id !== id) return milestone;
              const order: Record<string, number> = {
                locked: 0,
                available: 1,
                "in-progress": 2,
                completed: 3,
              };
              const statuses: MilestoneStatus[] = [
                "locked",
                "available",
                "in-progress",
                "completed",
              ];
              const currentIndex = order[milestone.status] ?? 0;
              const nextIndex = (currentIndex + 1) % statuses.length;
              const nextStatus = statuses[nextIndex] ?? "locked";
              return {
                ...milestone,
                status: nextStatus,
              };
            }),
          },
          lastUpdated: new Date().toISOString(),
        });
      },

      selectGoal: (id) => set({ selectedGoalId: id }),

      setSkillCategoryFilter: (category) =>
        set({ selectedSkillCategory: category }),

      setLearningTypeFilter: (type) => set({ selectedLearningType: type }),

      resetProgress: () =>
        set({
          ...INITIAL_STATE,
          data: demoCareerProgressData,
          viewState: "ready",
          lastUpdated: new Date().toISOString(),
        }),
    }),
    {
      name: "mr-ego-career-progress",
      partialize: (state) => ({
        data: state.data,
        selectedGoalId: state.selectedGoalId,
        selectedSkillCategory: state.selectedSkillCategory,
        selectedLearningType: state.selectedLearningType,
        lastUpdated: state.lastUpdated,
      }),
    }
  )
);
