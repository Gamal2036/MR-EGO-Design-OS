import { create } from "zustand";
import {
  demoInterviews,
  demoQuestions,
  demoPracticeSessions,
  demoInterviewStats,
} from "@/data/interviews";
import type {
  Interview,
  InterviewFilters,
  InterviewNote,
  InterviewStats,
  InterviewStore,
  PracticeSession,
  Question,
} from "@/types/interview";

const defaultFilters: InterviewFilters = {
  status: "all",
  type: "all",
  search: "",
  favorites: false,
};

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function isToday(dateStr: string): boolean {
  const d = new Date(dateStr);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

function isThisWeek(dateStr: string): boolean {
  const d = new Date(dateStr);
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);
  return d >= startOfWeek && d < endOfWeek;
}

function isPast(dateStr: string): boolean {
  return new Date(dateStr) < new Date();
}

export const useInterviewStore = create<InterviewStore>()((set, get) => ({
  interviews: [],
  questions: [],
  practiceSessions: [],
  viewMode: "dashboard",
  viewState: "loading",
  selectedInterviewId: null,
  selectedQuestionId: null,
  filters: { ...defaultFilters },
  isFormOpen: false,
  editingInterviewId: null,
  stats: { ...demoInterviewStats },

  setViewState: (viewState) => set({ viewState }),

  setInterviews: (interviews) => set({ interviews }),

  setQuestions: (questions) => set({ questions }),

  setPracticeSessions: (practiceSessions) => set({ practiceSessions }),

  setViewMode: (viewMode) => set({ viewMode }),

  selectInterview: (selectedInterviewId) => set({ selectedInterviewId }),

  selectQuestion: (selectedQuestionId) => set({ selectedQuestionId }),

  setFilter: (filterUpdate) =>
    set((state) => ({
      filters: { ...state.filters, ...filterUpdate },
    })),

  resetFilters: () => set({ filters: { ...defaultFilters } }),

  openForm: (interviewId) =>
    set({ isFormOpen: true, editingInterviewId: interviewId ?? null }),

  closeForm: () => set({ isFormOpen: false, editingInterviewId: null }),

  addInterview: (interview) =>
    set((state) => ({
      interviews: [
        {
          ...interview,
          id: interview.id || generateId("int"),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        ...state.interviews,
      ],
    })),

  updateInterview: (id, updates) =>
    set((state) => ({
      interviews: state.interviews.map((i) =>
        i.id === id
          ? { ...i, ...updates, updatedAt: new Date().toISOString() }
          : i,
      ),
    })),

  deleteInterview: (id) =>
    set((state) => ({
      interviews: state.interviews.filter((i) => i.id !== id),
    })),

  archiveInterview: (id) =>
    set((state) => ({
      interviews: state.interviews.map((i) =>
        i.id === id
          ? {
              ...i,
              isArchived: true,
              status: "archived" as const,
              updatedAt: new Date().toISOString(),
            }
          : i,
      ),
    })),

  toggleFavorite: (id) =>
    set((state) => ({
      interviews: state.interviews.map((i) =>
        i.id === id
          ? { ...i, isFavorite: !i.isFavorite, updatedAt: new Date().toISOString() }
          : i,
      ),
    })),

  toggleChecklistItem: (interviewId, itemId) =>
    set((state) => ({
      interviews: state.interviews.map((i) => {
        if (i.id !== interviewId) return i;
        const checklist = i.checklist.map((cl) =>
          cl.id === itemId ? { ...cl, done: !cl.done } : cl,
        );
        const doneCount = checklist.filter((cl) => cl.done).length;
        const preparationProgress =
          checklist.length > 0
            ? Math.round((doneCount / checklist.length) * 100)
            : i.preparationProgress;
        return { ...i, checklist, preparationProgress, updatedAt: new Date().toISOString() };
      }),
    })),

  addNote: (interviewId, note) =>
    set((state) => ({
      interviews: state.interviews.map((i) => {
        if (i.id !== interviewId) return i;
        return {
          ...i,
          notes: [
            { ...note, id: note.id || generateId("n") },
            ...i.notes,
          ],
          updatedAt: new Date().toISOString(),
        };
      }),
    })),

  addQuestion: (question) =>
    set((state) => ({
      questions: [
        {
          ...question,
          id: question.id || generateId("q"),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        ...state.questions,
      ],
    })),

  updateQuestion: (id, updates) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id
          ? { ...q, ...updates, updatedAt: new Date().toISOString() }
          : q,
      ),
    })),

  deleteQuestion: (id) =>
    set((state) => ({
      questions: state.questions.filter((q) => q.id !== id),
    })),

  toggleQuestionFavorite: (id) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id ? { ...q, isFavorite: !q.isFavorite, updatedAt: new Date().toISOString() } : q,
      ),
    })),

  startPracticeSession: (session) =>
    set((state) => ({
      practiceSessions: [
        {
          ...session,
          id: session.id || generateId("ps"),
          startedAt: new Date().toISOString(),
          status: "in_progress" as const,
        },
        ...state.practiceSessions,
      ],
    })),

  completePracticeSession: (id, score) =>
    set((state) => ({
      practiceSessions: state.practiceSessions.map((ps) =>
        ps.id === id
          ? {
              ...ps,
              status: "completed" as const,
              score,
              completedAt: new Date().toISOString(),
            }
          : ps,
      ),
    })),

  getFilteredInterviews: () => {
    const { interviews, filters } = get();
    return interviews
      .filter((i) => !i.isArchived)
      .filter((i) => {
        if (filters.status !== "all" && i.status !== filters.status) return false;
        if (filters.type !== "all" && i.type !== filters.type) return false;
        if (filters.favorites && !i.isFavorite) return false;
        if (filters.search) {
          const q = filters.search.toLowerCase();
          return (
            i.title.toLowerCase().includes(q) ||
            i.company.name.toLowerCase().includes(q) ||
            i.role.toLowerCase().includes(q)
          );
        }
        return true;
      });
  },

  getInterviewById: (id) => {
    return get().interviews.find((i) => i.id === id);
  },

  getSummary: () => {
    const { interviews } = get();
    const active = interviews.filter((i) => !i.isArchived);
    return {
      total: active.length,
      upcoming: active.filter((i) => i.status === "upcoming").length,
      completed: active.filter((i) => i.status === "completed").length,
      cancelled: active.filter((i) => i.status === "cancelled").length,
      archived: interviews.filter((i) => i.isArchived).length,
      favorites: active.filter((i) => i.isFavorite).length,
      thisWeek: active.filter((i) => isThisWeek(i.date)).length,
    };
  },

  getUpcomingInterviews: () => {
    return get().interviews.filter(
      (i) => i.status === "upcoming" && !isPast(i.date),
    );
  },

  getPastInterviews: () => {
    return get().interviews.filter(
      (i) => i.status === "completed" || (i.status === "upcoming" && isPast(i.date)),
    );
  },

  getFavoriteInterviews: () => {
    return get().interviews.filter((i) => i.isFavorite && !i.isArchived);
  },

  getQuestionsByCategory: (category) => {
    return get().questions.filter((q) => q.category === category);
  },

  getStats: () => {
    return get().stats;
  },
}));
