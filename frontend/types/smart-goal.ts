export type SmartGoalViewState = "loading" | "ready" | "error" | "empty";

export type SmartGoalViewMode = "grid" | "list" | "board" | "dashboard";

export type SmartGoalType =
  | "career"
  | "learning"
  | "certification"
  | "job_search"
  | "language"
  | "interview"
  | "salary"
  | "personal"
  | "custom";

export type SmartGoalStatus =
  | "not_started"
  | "planning"
  | "in_progress"
  | "paused"
  | "completed"
  | "archived"
  | "cancelled";

export type SmartGoalPriority = "low" | "medium" | "high" | "critical";

export type SmartGoalDifficulty = "beginner" | "intermediate" | "advanced" | "expert";

export type SmartMilestoneStatus = "not_started" | "in_progress" | "completed" | "skipped";

export type SmartObjectivePeriod = "daily" | "weekly" | "monthly";

export type SmartTaskStatus = "todo" | "in_progress" | "done" | "skipped";

export type SmartTaskPriority = "low" | "medium" | "high" | "critical";

export type SmartRecommendationType =
  | "consistency"
  | "milestone"
  | "practice"
  | "networking"
  | "certification"
  | "application"
  | "cv"
  | "language"
  | "roadmap"
  | "general";

export type SmartRiskLevel = "low" | "medium" | "high" | "critical";

export type SmartTrendDirection = "up" | "down" | "stable";

export interface SmartGoalMilestone {
  id: string;
  goalId: string;
  title: string;
  description: string;
  status: SmartMilestoneStatus;
  order: number;
  dueDate?: string;
  completedAt?: string;
  weight: number;
}

export interface SmartGoalSubGoal {
  id: string;
  goalId: string;
  title: string;
  description: string;
  completed: boolean;
  order: number;
}

export interface SmartGoalTask {
  id: string;
  goalId: string;
  milestoneId?: string;
  title: string;
  description: string;
  status: SmartTaskStatus;
  priority: SmartTaskPriority;
  dueDate?: string;
  completedAt?: string;
  estimatedMinutes: number;
  order: number;
}

export interface SmartGoalObjective {
  id: string;
  goalId: string;
  period: SmartObjectivePeriod;
  title: string;
  description: string;
  completed: boolean;
  targetDate: string;
}

export interface SmartGoalDependency {
  id: string;
  goalId: string;
  dependsOnGoalId: string;
  type: "blocks" | "enables" | "relates_to";
}

export interface SmartGoalCompletionCondition {
  id: string;
  goalId: string;
  description: string;
  required: boolean;
  satisfied: boolean;
}

export interface SmartGoalAIRecommendation {
  id: string;
  goalId?: string;
  type: SmartRecommendationType;
  title: string;
  description: string;
  actionLabel: string;
  actionHref?: string;
  priority: SmartGoalPriority;
  dismissed: boolean;
  createdAt: string;
}

export interface SmartGoalTemplate {
  id: string;
  title: string;
  description: string;
  type: SmartGoalType;
  category: string;
  difficulty: SmartGoalDifficulty;
  estimatedDurationWeeks: number;
  defaultPriority: SmartGoalPriority;
  milestones: Pick<SmartGoalMilestone, "title" | "description" | "weight" | "order">[];
  tags: string[];
}

export interface SmartGoalActivity {
  id: string;
  goalId: string;
  type: "progress_update" | "milestone_complete" | "task_complete" | "note" | "ai_recommendation";
  title: string;
  description: string;
  timestamp: string;
  value?: number;
}

export interface SmartGoalAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
  goalId?: string;
}

export interface SmartGoalPrediction {
  chanceOfSuccess: number;
  estimatedFinishDate: string;
  riskLevel: SmartRiskLevel;
  delayWarning: string | null;
  motivationTrend: SmartTrendDirection;
  productivityTrend: SmartTrendDirection;
}

export interface SmartGoal {
  id: string;
  title: string;
  description: string;
  type: SmartGoalType;
  category: string;
  priority: SmartGoalPriority;
  difficulty: SmartGoalDifficulty;
  estimatedDurationWeeks: number;
  deadline: string;
  progress: number;
  currentStage: string;
  estimatedCompletion: string;
  motivationScore: number;
  consistencyScore: number;
  riskScore: number;
  aiConfidence: number;
  nextRecommendation: string;
  status: SmartGoalStatus;
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  completedAt?: string;
  milestones: SmartGoalMilestone[];
  subGoals: SmartGoalSubGoal[];
  tasks: SmartGoalTask[];
  dailyObjectives: SmartGoalObjective[];
  weeklyObjectives: SmartGoalObjective[];
  monthlyObjectives: SmartGoalObjective[];
  dependencies: SmartGoalDependency[];
  completionConditions: SmartGoalCompletionCondition[];
  tags: string[];
  prediction: SmartGoalPrediction;
}

export interface SmartGoalFilters {
  status: SmartGoalStatus | "all";
  type: SmartGoalType | "all";
  priority: SmartGoalPriority | "all";
  search: string;
  onlyActive: boolean;
}

export type SmartGoalSortBy =
  | "deadline"
  | "priority"
  | "progress"
  | "created"
  | "title"
  | "updated";

export interface SmartGoalSort {
  by: SmartGoalSortBy;
  direction: "asc" | "desc";
}

export interface SmartGoalStats {
  total: number;
  active: number;
  completed: number;
  atRisk: number;
  averageProgress: number;
  totalMilestones: number;
  completedMilestones: number;
  totalTasks: number;
  completedTasks: number;
  currentStreak: number;
  longestStreak: number;
  productivityScore: number;
  averageMotivation: number;
  averageConsistency: number;
}

export interface SmartGoalDashboardData {
  currentGoal: SmartGoal | null;
  todaysMission: SmartGoalTask | null;
  weeklyProgress: number;
  completionRate: number;
  upcomingDeadlines: SmartGoal[];
  achievements: SmartGoalAchievement[];
  goalStreak: number;
  productivityScore: number;
  aiRecommendation: SmartGoalAIRecommendation | null;
}

export interface SmartGoalHeatmapDay {
  date: string;
  value: number;
}

export interface SmartGoalState {
  goals: SmartGoal[];
  viewState: SmartGoalViewState;
  viewMode: SmartGoalViewMode;
  selectedGoalId: string | null;
  filters: SmartGoalFilters;
  sort: SmartGoalSort;
  isFormOpen: boolean;
  editingGoalId: string | null;
  selectedTemplateId: string | null;
  lastUpdated: string | null;
}

export interface SmartGoalStore extends SmartGoalState {
  setViewState: (state: SmartGoalViewState) => void;
  setViewMode: (mode: SmartGoalViewMode) => void;
  setGoals: (goals: SmartGoal[]) => void;
  selectGoal: (id: string | null) => void;
  setFilter: (filters: Partial<SmartGoalFilters>) => void;
  resetFilters: () => void;
  setSort: (sort: Partial<SmartGoalSort>) => void;
  openForm: (goalId?: string) => void;
  closeForm: () => void;
  selectTemplate: (id: string | null) => void;
  addGoal: (goal: SmartGoal) => void;
  updateGoal: (id: string, updates: Partial<SmartGoal>) => void;
  deleteGoal: (id: string) => void;
  duplicateGoal: (id: string) => void;
  archiveGoal: (id: string) => void;
  toggleMilestone: (goalId: string, milestoneId: string) => void;
  toggleSubGoal: (goalId: string, subGoalId: string) => void;
  toggleTask: (goalId: string, taskId: string) => void;
  addRecommendation: (recommendation: SmartGoalAIRecommendation) => void;
  dismissRecommendation: (id: string) => void;
  applyTemplate: (templateId: string, overrides?: Partial<SmartGoal>) => SmartGoal;
  getGoalById: (id: string) => SmartGoal | undefined;
  getFilteredGoals: () => SmartGoal[];
  getSortedGoals: () => SmartGoal[];
  getStats: () => SmartGoalStats;
  getDashboardData: () => SmartGoalDashboardData;
  getRecommendations: () => SmartGoalAIRecommendation[];
  getUpcomingDeadlines: (limit?: number) => SmartGoal[];
  getHeatmapData: () => SmartGoalHeatmapDay[];
  recalculateProgress: (goalId: string) => void;
  updatePrediction: (goalId: string) => void;
}
