import { create } from "zustand";

import {
  demoAIRecommendations,
  demoCertificates,
  demoCourses,
  demoDailyGoals,
  demoLearningNotes,
  demoLearningStats,
  demoLearningSummary,
  demoPracticeLabs,
  demoRoadmaps,
} from "@/data/learning";
import type {
  Course,
  LearningFilters,
  LearningNote,
  LearningStore,
  LearningViewMode,
  LearningViewState,
  Roadmap,
} from "@/types/learning";

const defaultFilters: LearningFilters = {
  category: "all",
  difficulty: "all",
  status: "all",
  search: "",
  bookmarked: false,
};

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export const useLearningStore = create<LearningStore>()((set, get) => ({
  courses: [],
  roadmaps: [],
  dailyGoals: [],
  learningNotes: [],
  certificates: [],
  practiceLabs: [],
  aiRecommendations: [],
  viewMode: "dashboard",
  viewState: "loading",
  selectedCourseId: null,
  selectedRoadmapId: null,
  filters: { ...defaultFilters },
  stats: { ...demoLearningStats },
  summary: { ...demoLearningSummary },
  searchQuery: "",

  setViewState: (viewState) => set({ viewState }),

  setViewMode: (viewMode) => set({ viewMode }),

  setCourses: (courses) => set({ courses }),

  setRoadmaps: (roadmaps) => set({ roadmaps }),

  setDailyGoals: (dailyGoals) => set({ dailyGoals }),

  setLearningNotes: (learningNotes) => set({ learningNotes }),

  setCertificates: (certificates) => set({ certificates }),

  setPracticeLabs: (practiceLabs) => set({ practiceLabs }),

  setAIRecommendations: (aiRecommendations) => set({ aiRecommendations }),

  selectCourse: (selectedCourseId) => set({ selectedCourseId }),

  selectRoadmap: (selectedRoadmapId) => set({ selectedRoadmapId }),

  setFilter: (filterUpdate) =>
    set((state) => ({
      filters: { ...state.filters, ...filterUpdate },
    })),

  resetFilters: () => set({ filters: { ...defaultFilters } }),

  toggleBookmark: (courseId) =>
    set((state) => ({
      courses: state.courses.map((c) =>
        c.id === courseId ? { ...c, isBookmarked: !c.isBookmarked } : c,
      ),
      stats: {
        ...state.stats,
        bookmarkedCount: state.courses.filter((c) =>
          c.id === courseId ? !c.isBookmarked : c.isBookmarked,
        ).length,
      },
    })),

  toggleFavorite: (courseId) =>
    set((state) => ({
      courses: state.courses.map((c) =>
        c.id === courseId ? { ...c, isFavorite: !c.isFavorite } : c,
      ),
    })),

  toggleGoalCompleted: (goalId) =>
    set((state) => ({
      dailyGoals: state.dailyGoals.map((g) =>
        g.id === goalId ? { ...g, completed: !g.completed } : g,
      ),
    })),

  toggleRoadmapBookmark: (roadmapId) =>
    set((state) => ({
      roadmaps: state.roadmaps.map((r) =>
        r.id === roadmapId ? { ...r, isBookmarked: !r.isBookmarked } : r,
      ),
    })),

  toggleLabBookmark: (labId) =>
    set((state) => ({
      practiceLabs: state.practiceLabs.map((l) =>
        l.id === labId ? { ...l, isBookmarked: !l.isBookmarked } : l,
      ),
    })),

  toggleLabCompleted: (labId) =>
    set((state) => ({
      practiceLabs: state.practiceLabs.map((l) =>
        l.id === labId ? { ...l, isCompleted: !l.isCompleted } : l,
      ),
    })),

  addNote: (note) =>
    set((state) => ({
      learningNotes: [
        {
          ...note,
          id: note.id || generateId("note"),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        ...state.learningNotes,
      ],
    })),

  updateNote: (id, updates) =>
    set((state) => ({
      learningNotes: state.learningNotes.map((n) =>
        n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n,
      ),
    })),

  deleteNote: (id) =>
    set((state) => ({
      learningNotes: state.learningNotes.filter((n) => n.id !== id),
    })),

  updateCourseProgress: (courseId, progress, lessonId) =>
    set((state) => ({
      courses: state.courses.map((c) => {
        if (c.id !== courseId) return c;
        const updatedModules = c.modules.map((mod) => ({
          ...mod,
          lessons: mod.lessons.map((lsn) =>
            lsn.id === lessonId ? { ...lsn, completed: true, isLocked: false } : lsn,
          ),
          progress: Math.min(
            100,
            Math.round(
              (mod.lessons.filter((l) => l.id === lessonId || l.completed).length /
                mod.lessons.length) *
                100,
            ),
          ),
        }));
        const totalProgress = Math.min(
          100,
          Math.round(
            (updatedModules.reduce((sum, m) => sum + m.progress, 0) / updatedModules.length) * 100,
          ) / 100,
        );
        return {
          ...c,
          progress: totalProgress,
          status: totalProgress >= 100 ? "completed" : "in-progress",
          modules: updatedModules,
        };
      }),
    })),

  setSearchQuery: (searchQuery) => set({ searchQuery }),

  getFilteredCourses: () => {
    const { courses, filters, searchQuery } = get();
    return courses.filter((course) => {
      if (filters.category !== "all" && course.category !== filters.category) return false;
      if (filters.difficulty !== "all" && course.difficulty !== filters.difficulty) return false;
      if (filters.status !== "all" && course.status !== filters.status) return false;
      if (filters.bookmarked && !course.isBookmarked) return false;
      const query = (filters.search || searchQuery).toLowerCase();
      if (query && !course.title.toLowerCase().includes(query) && !course.tags.some((t) => t.toLowerCase().includes(query))) {
        return false;
      }
      return true;
    });
  },

  getCourseById: (id) => get().courses.find((c) => c.id === id),

  getRoadmapById: (id) => get().roadmaps.find((r) => r.id === id),

  getBookmarkedCourses: () => get().courses.filter((c) => c.isBookmarked),

  getCompletedCourses: () => get().courses.filter((c) => c.status === "completed"),

  getInProgressCourses: () => get().courses.filter((c) => c.status === "in-progress"),

  getCoursesByCategory: (category) =>
    get().courses.filter((c) => c.category === category),

  getRecommendedCourses: () => get().courses.filter((c) => c.isRecommended),
}));
