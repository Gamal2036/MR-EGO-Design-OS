export type RoadmapViewState = "loading" | "ready" | "error" | "empty";

export type AIRoadmapPhaseStatus = "locked" | "available" | "in-progress" | "completed";

export type AIRoadmapTaskType = "course" | "practice" | "reading" | "project" | "assessment";

export type AIRoadmapLearningPathStatus = "not-started" | "in-progress" | "completed";

export type AIRoadmapDifficulty = "beginner" | "intermediate" | "advanced" | "expert";

export type AIRoadmapRecommendationPriority = "high" | "medium" | "low";

export interface AIRoadmapPhase {
  id: string;
  title: string;
  description: string;
  status: AIRoadmapPhaseStatus;
  order: number;
  estimatedWeeks: number;
  skills: string[];
  milestones: string[];
}

export interface AIRoadmapTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  estimatedMinutes: number;
  type: AIRoadmapTaskType;
  href?: string;
}

export interface AIRoadmapDayPlan {
  date: string;
  focus: string;
  tasks: AIRoadmapTask[];
}

export interface AIRoadmapWeekPlan {
  weekNumber: number;
  label: string;
  focus: string;
  tasks: AIRoadmapTask[];
  completedTasks: number;
  totalTasks: number;
}

export interface AIRoadmapMonthlyGoal {
  id: string;
  month: string;
  title: string;
  description: string;
  progress: number;
  completed: boolean;
  milestones: string[];
}

export interface AIRoadmapLearningPath {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: AIRoadmapDifficulty;
  progress: number;
  estimatedHours: number;
  status: AIRoadmapLearningPathStatus;
  skills: string[];
  href?: string;
}

export interface AIRoadmapRecommendation {
  id: string;
  title: string;
  description: string;
  impact: string;
  priority: AIRoadmapRecommendationPriority;
  actionLabel: string;
  actionHref?: string;
}

export interface AICareerPath {
  id: string;
  title: string;
  description: string;
  targetRole: string;
  estimatedMonths: number;
  totalHours: number;
  difficulty: AIRoadmapDifficulty;
}

export interface AIRoadmapData {
  careerPath: AICareerPath;
  overallCompletion: number;
  estimatedFinishDate: string;
  currentStage: string;
  learningHoursRemaining: number;
  aiConfidence: number;
  phases: AIRoadmapPhase[];
  learningPath: AIRoadmapLearningPath[];
  dailyPlan: AIRoadmapDayPlan;
  weeklyPlan: AIRoadmapWeekPlan;
  monthlyGoals: AIRoadmapMonthlyGoal[];
  recommendations: AIRoadmapRecommendation[];
}

export interface AIRoadmapState {
  data: AIRoadmapData | null;
  viewState: RoadmapViewState;
  selectedCareerPathId: string | null;
  selectedPhaseId: string | null;
  lastUpdated: string | null;
}

export interface AIRoadmapStore extends AIRoadmapState {
  setViewState: (state: RoadmapViewState) => void;
  setData: (data: AIRoadmapData) => void;
  selectCareerPath: (id: string) => void;
  selectPhase: (id: string | null) => void;
  toggleTask: (taskId: string) => void;
  resetRoadmap: () => void;
}
