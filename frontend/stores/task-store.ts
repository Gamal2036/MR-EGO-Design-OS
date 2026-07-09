import { create } from "zustand";
import { demoTasks } from "@/data/tasks";
import type {
  Task,
  TaskCategory,
  TaskFilters,
  TaskPriority,
  TaskStatus,
  TaskSummary,
  TasksStore,
} from "@/types/task";

const defaultFilters: TaskFilters = {
  status: "all",
  priority: "all",
  category: "all",
  search: "",
  pinned: false,
  isAISuggested: false,
};

function generateId(): string {
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function isOverdue(task: Task): boolean {
  if (task.status === "done" || task.status === "archived") return false;
  return new Date(task.deadline) < new Date();
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

function isUpcoming(dateStr: string): boolean {
  const d = new Date(dateStr);
  const now = new Date();
  return d > now && !isToday(dateStr);
}

export const useTasksStore = create<TasksStore>()((set, get) => ({
  tasks: [],
  viewMode: "list",
  viewState: "loading",
  selectedTaskId: null,
  filters: { ...defaultFilters },
  isFormOpen: false,
  editingTaskId: null,

  setViewState: (viewState) => set({ viewState }),

  setTasks: (tasks) => set({ tasks }),

  setViewMode: (viewMode) => set({ viewMode }),

  selectTask: (selectedTaskId) => set({ selectedTaskId }),

  setFilter: (filterUpdate) =>
    set((state) => ({
      filters: { ...state.filters, ...filterUpdate },
    })),

  resetFilters: () => set({ filters: { ...defaultFilters } }),

  openForm: (taskId) =>
    set({ isFormOpen: true, editingTaskId: taskId ?? null }),

  closeForm: () => set({ isFormOpen: false, editingTaskId: null }),

  addTask: (task) =>
    set((state) => ({
      tasks: [
        {
          ...task,
          id: task.id || generateId(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        ...state.tasks,
      ],
    })),

  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t,
      ),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),

  duplicateTask: (id) =>
    set((state) => {
      const original = state.tasks.find((t) => t.id === id);
      if (!original) return state;
      const duplicate: Task = {
        ...original,
        id: generateId(),
        title: `${original.title} (Copy)`,
        status: "todo",
        progress: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        subtasks: original.subtasks.map((st) => ({ ...st, id: `st-${Date.now()}-${Math.random().toString(36).slice(2, 5)}` })),
      };
      return { tasks: [duplicate, ...state.tasks] };
    }),

  archiveTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, status: "archived" as const, updatedAt: new Date().toISOString() } : t,
      ),
    })),

  togglePin: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, pinned: !t.pinned, updatedAt: new Date().toISOString() } : t,
      ),
    })),

  toggleSubtask: (taskId, subtaskId) =>
    set((state) => ({
      tasks: state.tasks.map((t) => {
        if (t.id !== taskId) return t;
        const subtasks = t.subtasks.map((st) =>
          st.id === subtaskId ? { ...st, done: !st.done } : st,
        );
        const doneCount = subtasks.filter((st) => st.done).length;
        const progress = subtasks.length > 0 ? Math.round((doneCount / subtasks.length) * 100) : t.progress;
        return { ...t, subtasks, progress, updatedAt: new Date().toISOString() };
      }),
    })),

  getFilteredTasks: () => {
    const { tasks, filters } = get();
    return tasks
      .filter((t) => t.status !== "archived")
      .filter((t) => {
        if (filters.status !== "all" && t.status !== filters.status) return false;
        if (filters.priority !== "all" && t.priority !== filters.priority) return false;
        if (filters.category !== "all" && t.category !== filters.category) return false;
        if (filters.pinned && !t.pinned) return false;
        if (filters.isAISuggested && !t.isAISuggested) return false;
        if (filters.search) {
          const q = filters.search.toLowerCase();
          return (
            t.title.toLowerCase().includes(q) ||
            t.description.toLowerCase().includes(q) ||
            t.tags.some((tag) => tag.toLowerCase().includes(q))
          );
        }
        return true;
      });
  },

  getTaskById: (id) => {
    return get().tasks.find((t) => t.id === id);
  },

  getSummary: () => {
    const { tasks } = get();
    const active = tasks.filter((t) => t.status !== "archived");
    return {
      total: active.length,
      todo: active.filter((t) => t.status === "todo").length,
      inProgress: active.filter((t) => t.status === "in_progress").length,
      done: active.filter((t) => t.status === "done").length,
      overdue: active.filter(isOverdue).length,
      pinned: active.filter((t) => t.pinned).length,
      aiSuggested: active.filter((t) => t.isAISuggested).length,
    } satisfies TaskSummary;
  },

  getTasksByStatus: (status) => {
    return get().tasks.filter((t) => t.status === status);
  },

  getOverdueTasks: () => {
    return get().tasks.filter(isOverdue);
  },

  getTodayTasks: () => {
    return get().tasks.filter((t) => t.status !== "archived" && isToday(t.deadline));
  },

  getUpcomingTasks: () => {
    return get().tasks.filter((t) => t.status !== "archived" && isUpcoming(t.deadline));
  },
}));
