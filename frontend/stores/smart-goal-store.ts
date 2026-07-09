import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  demoSmartGoalAchievements,
  demoSmartGoalRecommendations,
  demoSmartGoals,
  demoSmartGoalTemplates,
} from "@/data/smart-goals";
import type {
  SmartGoal,
  SmartGoalAIRecommendation,
  SmartGoalDashboardData,
  SmartGoalFilters,
  SmartGoalHeatmapDay,
  SmartGoalPrediction,
  SmartGoalSort,
  SmartGoalStats,
  SmartGoalStatus,
  SmartGoalStore,
  SmartGoalViewState,
} from "@/types/smart-goal";

const defaultFilters: SmartGoalFilters = {
  status: "all",
  type: "all",
  priority: "all",
  search: "",
  onlyActive: false,
};

const defaultSort: SmartGoalSort = {
  by: "deadline",
  direction: "asc",
};

const INITIAL_STATE = {
  goals: [] as SmartGoal[],
  viewState: "loading" as SmartGoalViewState,
  viewMode: "dashboard" as const,
  selectedGoalId: null as string | null,
  filters: { ...defaultFilters },
  sort: { ...defaultSort },
  isFormOpen: false,
  editingGoalId: null as string | null,
  selectedTemplateId: null as string | null,
  lastUpdated: null as string | null,
};

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function isActiveGoal(goal: SmartGoal): boolean {
  return goal.status === "not_started" || goal.status === "planning" || goal.status === "in_progress" || goal.status === "paused";
}

function isCompletedGoal(goal: SmartGoal): boolean {
  return goal.status === "completed";
}

function isAtRiskGoal(goal: SmartGoal): boolean {
  if (isCompletedGoal(goal) || goal.status === "archived" || goal.status === "cancelled") return false;
  const daysToDeadline = Math.ceil((new Date(goal.deadline).getTime() - Date.now()) / 86400000);
  const behindSchedule = goal.progress < 50 && daysToDeadline < 14;
  const lowConsistency = goal.consistencyScore < 50;
  const highRisk = goal.riskScore >= 50;
  return behindSchedule || lowConsistency || highRisk;
}

function computeGoalProgress(goal: SmartGoal): number {
  const milestoneWeight = 0.6;
  const taskWeight = 0.3;
  const subGoalWeight = 0.1;

  const milestoneProgress =
    goal.milestones.length > 0
      ? goal.milestones.reduce((sum, m) => sum + (m.status === "completed" ? m.weight : m.status === "in_progress" ? m.weight * 0.5 : 0), 0) /
        goal.milestones.reduce((sum, m) => sum + m.weight, 0)
      : 0;

  const taskProgress =
    goal.tasks.length > 0
      ? goal.tasks.filter((t) => t.status === "done").length / goal.tasks.length
      : 0;

  const subGoalProgress =
    goal.subGoals.length > 0
      ? goal.subGoals.filter((sg) => sg.completed).length / goal.subGoals.length
      : 0;

  return Math.round(milestoneProgress * milestoneWeight * 100 + taskProgress * taskWeight * 100 + subGoalProgress * subGoalWeight * 100);
}

function computeEstimatedCompletion(goal: SmartGoal): string {
  const remaining = 100 - goal.progress;
  const velocity = Math.max(1, goal.consistencyScore / 7);
  const daysRemaining = Math.ceil(remaining / velocity);
  const date = new Date();
  date.setDate(date.getDate() + daysRemaining);
  return date.toISOString();
}

function computePrediction(goal: SmartGoal): SmartGoalPrediction {
  const chanceOfSuccess = Math.max(10, Math.min(99, goal.aiConfidence - goal.riskScore / 3 + goal.consistencyScore / 10));
  const riskLevel: SmartGoalPrediction["riskLevel"] =
    goal.riskScore >= 60 ? "critical" : goal.riskScore >= 40 ? "high" : goal.riskScore >= 20 ? "medium" : "low";
  const daysToDeadline = Math.ceil((new Date(goal.deadline).getTime() - Date.now()) / 86400000);
  const estimated = new Date(computeEstimatedCompletion(goal));
  const deadline = new Date(goal.deadline);
  const delayWarning = estimated > deadline ? `Estimated completion is ${Math.ceil((estimated.getTime() - deadline.getTime()) / 86400000)} days after deadline.` : null;

  return {
    chanceOfSuccess: Math.round(chanceOfSuccess),
    estimatedFinishDate: estimated.toISOString(),
    riskLevel,
    delayWarning,
    motivationTrend: goal.motivationScore > 75 ? "up" : goal.motivationScore < 55 ? "down" : "stable",
    productivityTrend: goal.consistencyScore > 70 ? "up" : goal.consistencyScore < 50 ? "down" : "stable",
  };
}

function recalculateGoal(goal: SmartGoal): SmartGoal {
  const progress = computeGoalProgress(goal);
  const completionConditions = goal.completionConditions.map((cc) => ({
    ...cc,
    satisfied: cc.description.toLowerCase().includes("all milestones") ? goal.milestones.every((m) => m.status === "completed") : cc.satisfied,
  }));
  const updated: SmartGoal = {
    ...goal,
    progress,
    completionConditions,
    prediction: computePrediction({ ...goal, progress }),
    estimatedCompletion: computeEstimatedCompletion({ ...goal, progress }),
    updatedAt: new Date().toISOString(),
  };

  if (progress === 100 && goal.status !== "completed") {
    updated.status = "completed";
    updated.completedAt = new Date().toISOString();
    updated.currentStage = "Completed";
  } else if (progress > 0 && goal.status === "not_started") {
    updated.status = "in_progress";
    updated.startedAt = updated.startedAt ?? new Date().toISOString();
  }

  return updated;
}

function sortGoals(goals: SmartGoal[], sort: SmartGoalSort): SmartGoal[] {
  const priorityOrder = { low: 1, medium: 2, high: 3, critical: 4 };
  return [...goals].sort((a, b) => {
    let comparison = 0;
    switch (sort.by) {
      case "deadline":
        comparison = new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        break;
      case "priority":
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
        break;
      case "progress":
        comparison = a.progress - b.progress;
        break;
      case "created":
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      case "updated":
        comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        break;
      case "title":
        comparison = a.title.localeCompare(b.title);
        break;
    }
    return sort.direction === "asc" ? comparison : -comparison;
  });
}

export const useSmartGoalStore = create<SmartGoalStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      setViewState: (viewState) => set({ viewState }),

      setViewMode: (viewMode) => set({ viewMode }),

      setGoals: (goals) => set({ goals, lastUpdated: new Date().toISOString() }),

      selectGoal: (selectedGoalId) => set({ selectedGoalId }),

      setFilter: (filterUpdate) =>
        set((state) => ({
          filters: { ...state.filters, ...filterUpdate },
        })),

      resetFilters: () => set({ filters: { ...defaultFilters } }),

      setSort: (sortUpdate) =>
        set((state) => ({
          sort: { ...state.sort, ...sortUpdate },
        })),

      openForm: (goalId) =>
        set({ isFormOpen: true, editingGoalId: goalId ?? null }),

      closeForm: () =>
        set({ isFormOpen: false, editingGoalId: null, selectedTemplateId: null }),

      selectTemplate: (id) => set({ selectedTemplateId: id }),

      addGoal: (goal) =>
        set((state) => ({
          goals: [recalculateGoal({ ...goal, id: goal.id || generateId("goal") }), ...state.goals],
          lastUpdated: new Date().toISOString(),
        })),

      updateGoal: (id, updates) =>
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === id ? recalculateGoal({ ...g, ...updates, updatedAt: new Date().toISOString() }) : g
          ),
          lastUpdated: new Date().toISOString(),
        })),

      deleteGoal: (id) =>
        set((state) => ({
          goals: state.goals.filter((g) => g.id !== id),
          selectedGoalId: state.selectedGoalId === id ? null : state.selectedGoalId,
          lastUpdated: new Date().toISOString(),
        })),

      duplicateGoal: (id) =>
        set((state) => {
          const original = state.goals.find((g) => g.id === id);
          if (!original) return state;
          const duplicate: SmartGoal = {
            ...original,
            id: generateId("goal"),
            title: `${original.title} (Copy)`,
            status: "not_started",
            progress: 0,
            completedAt: undefined,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            milestones: original.milestones.map((m) => ({
              ...m,
              id: generateId("m"),
              status: "not_started",
              completedAt: undefined,
            })),
            subGoals: original.subGoals.map((sg) => ({
              ...sg,
              id: generateId("sg"),
              completed: false,
            })),
            tasks: original.tasks.map((t) => ({
              ...t,
              id: generateId("t"),
              status: "todo",
              completedAt: undefined,
            })),
          };
          return { goals: [recalculateGoal(duplicate), ...state.goals] };
        }),

      archiveGoal: (id) =>
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === id ? { ...g, status: "archived" as const, updatedAt: new Date().toISOString() } : g
          ),
          lastUpdated: new Date().toISOString(),
        })),

      toggleMilestone: (goalId, milestoneId) =>
        set((state) => ({
          goals: state.goals.map((g) => {
            if (g.id !== goalId) return g;
            const milestones = g.milestones.map((m) =>
              m.id === milestoneId
                ? {
                    ...m,
                    status: (m.status === "completed" ? "not_started" : "completed") as SmartGoal["milestones"][number]["status"],
                    completedAt: m.status === "completed" ? undefined : new Date().toISOString(),
                  }
                : m
            );
            return recalculateGoal({ ...g, milestones });
          }),
          lastUpdated: new Date().toISOString(),
        })),

      toggleSubGoal: (goalId, subGoalId) =>
        set((state) => ({
          goals: state.goals.map((g) => {
            if (g.id !== goalId) return g;
            const subGoals = g.subGoals.map((sg) =>
              sg.id === subGoalId ? { ...sg, completed: !sg.completed } : sg
            );
            return recalculateGoal({ ...g, subGoals });
          }),
          lastUpdated: new Date().toISOString(),
        })),

      toggleTask: (goalId, taskId) =>
        set((state) => ({
          goals: state.goals.map((g) => {
            if (g.id !== goalId) return g;
            const tasks = g.tasks.map((t) =>
              t.id === taskId
                ? {
                    ...t,
                    status: (t.status === "done" ? "todo" : "done") as SmartGoal["tasks"][number]["status"],
                    completedAt: t.status === "done" ? undefined : new Date().toISOString(),
                  }
                : t
            );
            return recalculateGoal({ ...g, tasks });
          }),
          lastUpdated: new Date().toISOString(),
        })),

      addRecommendation: (recommendation) =>
        set((state) => ({
          goals: state.goals,
          lastUpdated: new Date().toISOString(),
        })),

      dismissRecommendation: (id) =>
        set((state) => ({
          goals: state.goals,
          lastUpdated: new Date().toISOString(),
        })),

      applyTemplate: (templateId, overrides = {}) => {
        const template = demoSmartGoalTemplates.find((t) => t.id === templateId);
        if (!template) throw new Error(`Template not found: ${templateId}`);

        const now = new Date().toISOString();
        const goalId = generateId("goal");
        const deadline = new Date();
        deadline.setDate(deadline.getDate() + template.estimatedDurationWeeks * 7);

        const goal: SmartGoal = {
          id: goalId,
          title: template.title,
          description: template.description,
          type: template.type,
          category: template.category,
          priority: overrides.priority ?? template.defaultPriority,
          difficulty: template.difficulty,
          estimatedDurationWeeks: template.estimatedDurationWeeks,
          deadline: overrides.deadline ?? deadline.toISOString(),
          progress: 0,
          currentStage: "Planning",
          estimatedCompletion: deadline.toISOString(),
          motivationScore: 70,
          consistencyScore: 50,
          riskScore: 30,
          aiConfidence: 75,
          nextRecommendation: "Start with the first milestone",
          status: "planning",
          createdAt: now,
          updatedAt: now,
          milestones: template.milestones.map((m) => ({
            ...m,
            id: generateId("m"),
            goalId,
            status: "not_started",
          })),
          subGoals: [],
          tasks: [],
          dailyObjectives: [],
          weeklyObjectives: [],
          monthlyObjectives: [],
          dependencies: [],
          completionConditions: [],
          tags: template.tags,
          prediction: {
            chanceOfSuccess: 75,
            estimatedFinishDate: deadline.toISOString(),
            riskLevel: "low",
            delayWarning: null,
            motivationTrend: "stable",
            productivityTrend: "stable",
          },
          ...overrides,
        };

        goal.completionConditions = [
          { id: generateId("cc"), goalId, description: "All milestones completed", required: true, satisfied: false },
          { id: generateId("cc"), goalId, description: "Goal deadline reached", required: false, satisfied: false },
        ];

        set((state) => ({
          goals: [recalculateGoal(goal), ...state.goals],
          lastUpdated: now,
        }));

        return goal;
      },

      getGoalById: (id) => {
        return get().goals.find((g) => g.id === id);
      },

      getFilteredGoals: () => {
        const { goals, filters } = get();
        return goals.filter((g) => {
          if (filters.status !== "all" && g.status !== filters.status) return false;
          if (filters.type !== "all" && g.type !== filters.type) return false;
          if (filters.priority !== "all" && g.priority !== filters.priority) return false;
          if (filters.onlyActive && !isActiveGoal(g)) return false;
          if (filters.search) {
            const q = filters.search.toLowerCase();
            return (
              g.title.toLowerCase().includes(q) ||
              g.description.toLowerCase().includes(q) ||
              g.tags.some((tag) => tag.toLowerCase().includes(q))
            );
          }
          return true;
        });
      },

      getSortedGoals: () => {
        const filtered = get().getFilteredGoals();
        return sortGoals(filtered, get().sort);
      },

      getStats: () => {
        const { goals } = get();
        const active = goals.filter(isActiveGoal);
        const totalMilestones = goals.reduce((sum, g) => sum + g.milestones.length, 0);
        const completedMilestones = goals.reduce((sum, g) => sum + g.milestones.filter((m) => m.status === "completed").length, 0);
        const totalTasks = goals.reduce((sum, g) => sum + g.tasks.length, 0);
        const completedTasks = goals.reduce((sum, g) => sum + g.tasks.filter((t) => t.status === "done").length, 0);

        return {
          total: goals.length,
          active: active.length,
          completed: goals.filter(isCompletedGoal).length,
          atRisk: active.filter(isAtRiskGoal).length,
          averageProgress: active.length > 0 ? Math.round(active.reduce((sum, g) => sum + g.progress, 0) / active.length) : 0,
          totalMilestones,
          completedMilestones,
          totalTasks,
          completedTasks,
          currentStreak: 5,
          longestStreak: 12,
          productivityScore: active.length > 0 ? Math.round(active.reduce((sum, g) => sum + g.consistencyScore, 0) / active.length) : 0,
          averageMotivation: active.length > 0 ? Math.round(active.reduce((sum, g) => sum + g.motivationScore, 0) / active.length) : 0,
          averageConsistency: active.length > 0 ? Math.round(active.reduce((sum, g) => sum + g.consistencyScore, 0) / active.length) : 0,
        } satisfies SmartGoalStats;
      },

      getDashboardData: () => {
        const { goals } = get();
        const active = goals.filter(isActiveGoal);
        const currentGoal =
          active.find((g) => g.status === "in_progress") ?? active[0] ?? null;
        const todaysMission =
          currentGoal?.tasks.find((t) => t.status !== "done") ??
          goals.flatMap((g) => g.tasks).find((t) => t.status !== "done") ??
          null;
        const upcomingDeadlines = sortGoals(
          active.filter((g) => new Date(g.deadline) >= new Date()),
          { by: "deadline", direction: "asc" }
        ).slice(0, 5);
        const completedTasks = goals.reduce((sum, g) => sum + g.tasks.filter((t) => t.status === "done").length, 0);
        const totalTasks = goals.reduce((sum, g) => sum + g.tasks.length, 0);
        const weeklyProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        const completionRate = goals.length > 0 ? Math.round((goals.filter(isCompletedGoal).length / goals.length) * 100) : 0;
        const recommendations = get().getRecommendations();

        return {
          currentGoal,
          todaysMission,
          weeklyProgress,
          completionRate,
          upcomingDeadlines,
          achievements: demoSmartGoalAchievements,
          goalStreak: 5,
          productivityScore: active.length > 0 ? Math.round(active.reduce((sum, g) => sum + g.consistencyScore, 0) / active.length) : 0,
          aiRecommendation: recommendations[0] ?? null,
        } satisfies SmartGoalDashboardData;
      },

      getRecommendations: () => {
        return demoSmartGoalRecommendations.filter((r) => !r.dismissed);
      },

      getUpcomingDeadlines: (limit = 5) => {
        const { goals } = get();
        return sortGoals(
          goals.filter((g) => !isCompletedGoal(g) && g.status !== "archived" && g.status !== "cancelled"),
          { by: "deadline", direction: "asc" }
        ).slice(0, limit);
      },

      getHeatmapData: () => {
        const days: SmartGoalHeatmapDay[] = [];
        const today = new Date();
        for (let i = 89; i >= 0; i--) {
          const d = new Date(today);
          d.setDate(d.getDate() - i);
          const dateParts = d.toISOString().split("T");
          const dateStr = dateParts[0] ?? d.toISOString();
          const value = Math.floor(Math.random() * 5);
          days.push({ date: dateStr, value });
        }
        return days;
      },

      recalculateProgress: (goalId) => {
        set((state) => ({
          goals: state.goals.map((g) => (g.id === goalId ? recalculateGoal(g) : g)),
          lastUpdated: new Date().toISOString(),
        }));
      },

      updatePrediction: (goalId) => {
        set((state) => ({
          goals: state.goals.map((g) => (g.id === goalId ? recalculateGoal(g) : g)),
          lastUpdated: new Date().toISOString(),
        }));
      },
    }),
    {
      name: "mr-ego-smart-goals",
      partialize: (state) => ({
        goals: state.goals,
        viewMode: state.viewMode,
        filters: state.filters,
        sort: state.sort,
        lastUpdated: state.lastUpdated,
      }),
    }
  )
);
