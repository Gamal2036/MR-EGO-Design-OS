import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  demoCareerMappings,
  demoLearningRecommendations,
  demoServices,
  demoSettings,
  demoSummary,
  demoTimeline,
} from "@/data/skills";
import type {
  CareerMapping,
  LearningRecommendation,
  Skill,
  SkillCategoryType,
  SkillFilterState,
  SkillLevel,
  SkillStatus,
  SkillStoreState,
  SkillTimelineEntry,
  Priority,
} from "@/types/skills";

export const INITIAL_FILTERS: SkillFilterState = {
  category: "all",
  difficulty: "all",
  priority: "all",
  status: "all",
  search: "",
};

export const useSkillStore = create<SkillStoreState>()(
  persist(
    (set, get) => ({
      skills: demoServices,
      recommendations: demoLearningRecommendations,
      careerMappings: demoCareerMappings,
      timeline: demoTimeline,
      summary: demoSummary,
      careerReadiness: {
        currentRole: demoSettings.currentRole,
        targetRole: demoSettings.targetRole,
        readiness: demoSettings.readiness,
        nextMilestone: demoSettings.nextMilestone,
        estimatedTime: demoSettings.estimatedTime,
      },
      overallScore: demoSettings.overallScore,
      filters: { ...INITIAL_FILTERS },
      viewState: "ready",

      setViewState: (state) => set({ viewState: state }),

      setFilter: (filter) =>
        set((state) => ({
          filters: { ...state.filters, ...filter },
        })),

      resetFilters: () => set({ filters: { ...INITIAL_FILTERS } }),

      updateSkill: (id, updates) =>
        set((state) => ({
          skills: state.skills.map((s) =>
            s.id === id ? { ...s, ...updates } : s
          ),
        })),

      addSkill: (skill) =>
        set((state) => ({
          skills: [...state.skills, skill],
        })),

      removeSkill: (id) =>
        set((state) => ({
          skills: state.skills.filter((s) => s.id !== id),
        })),

      resetSkills: () =>
        set({
          skills: demoServices,
          recommendations: demoLearningRecommendations,
          careerMappings: demoCareerMappings,
          timeline: demoTimeline,
          summary: demoSummary,
          careerReadiness: {
            currentRole: demoSettings.currentRole,
            targetRole: demoSettings.targetRole,
            readiness: demoSettings.readiness,
            nextMilestone: demoSettings.nextMilestone,
            estimatedTime: demoSettings.estimatedTime,
          },
          overallScore: demoSettings.overallScore,
          filters: { ...INITIAL_FILTERS },
        }),

      getFilteredSkills: () => {
        const { skills, filters } = get();
        return skills.filter((skill) => {
          if (filters.category !== "all" && skill.category !== filters.category) return false;
          if (filters.difficulty !== "all" && skill.currentLevel !== filters.difficulty) return false;
          if (filters.priority !== "all" && skill.priority !== filters.priority) return false;
          if (filters.status !== "all" && skill.status !== filters.status) return false;
          if (filters.search && !skill.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
          return true;
        });
      },

      getSkillsByCategory: (category) => {
        return get().skills.filter((s) => s.category === category);
      },

      getCompletedSkills: () => {
        return get().skills.filter((s) => s.status === "completed");
      },

      getInProgressSkills: () => {
        return get().skills.filter((s) => s.status === "in-progress");
      },

      getCareerReadyRoles: () => {
        return get().careerMappings.filter((c) => c.ready);
      },

      getNotReadyRoles: () => {
        return get().careerMappings.filter((c) => !c.ready);
      },
    }),
    {
      name: "mr-ego-skills",
      partialize: (state) => ({
        skills: state.skills,
        recommendations: state.recommendations,
        careerMappings: state.careerMappings,
        timeline: state.timeline,
        summary: state.summary,
        careerReadiness: state.careerReadiness,
        overallScore: state.overallScore,
        filters: state.filters,
      }),
    }
  )
);
