export type TaskStatus = "todo" | "in_progress" | "done" | "archived";

export type TaskPriority = "urgent" | "high" | "medium" | "low";

export type TaskCategory =
  | "career"
  | "learning"
  | "application"
  | "interview"
  | "document"
  | "custom";

export type TaskViewMode = "list" | "board";

export type TaskViewState = "loading" | "ready" | "error" | "empty";

export interface Subtask {
  id: string;
  title: string;
  done: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  progress: number;
  deadline: string;
  estimatedTime: number;
  actualTime: number;
  pinned: boolean;
  isAISuggested: boolean;
  tags: string[];
  notes: string;
  subtasks: Subtask[];
  reminder: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFilters {
  status: TaskStatus | "all";
  priority: TaskPriority | "all";
  category: TaskCategory | "all";
  search: string;
  pinned: boolean;
  isAISuggested: boolean;
}

export interface TaskSummary {
  total: number;
  todo: number;
  inProgress: number;
  done: number;
  overdue: number;
  pinned: number;
  aiSuggested: number;
}

export interface TasksState {
  tasks: Task[];
  viewMode: TaskViewMode;
  viewState: TaskViewState;
  selectedTaskId: string | null;
  filters: TaskFilters;
  isFormOpen: boolean;
  editingTaskId: string | null;
}

export interface TasksStore extends TasksState {
  setViewState: (state: TaskViewState) => void;
  setTasks: (tasks: Task[]) => void;
  setViewMode: (mode: TaskViewMode) => void;
  selectTask: (id: string | null) => void;
  setFilter: (filters: Partial<TaskFilters>) => void;
  resetFilters: () => void;
  openForm: (taskId?: string) => void;
  closeForm: () => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  duplicateTask: (id: string) => void;
  archiveTask: (id: string) => void;
  togglePin: (id: string) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
  getFilteredTasks: () => Task[];
  getTaskById: (id: string) => Task | undefined;
  getSummary: () => TaskSummary;
  getTasksByStatus: (status: TaskStatus) => Task[];
  getOverdueTasks: () => Task[];
  getTodayTasks: () => Task[];
  getUpcomingTasks: () => Task[];
}
