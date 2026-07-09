export type CareerProgressViewState = "loading" | "ready" | "error" | "empty" | "offline";

export type GoalType = "daily" | "weekly" | "monthly";

export type GoalStatus = "pending" | "in-progress" | "completed" | "skipped";

export type MilestoneStatus = "locked" | "available" | "in-progress" | "completed";

export type RoadmapPhase =
  | "beginner"
  | "application-ready"
  | "interview-ready"
  | "first-job"
  | "growth";

export type SkillCategory = "technical" | "soft" | "language" | "tool";

export type SkillLevel = "none" | "beginner" | "intermediate" | "advanced" | "expert";

export type LearningItemType = "course" | "lab" | "certificate" | "practice";

export type LearningItemStatus = "not-started" | "in-progress" | "completed";

export type BadgeTier = "bronze" | "silver" | "gold" | "platinum";

export type RecommendationType =
  | "next-best-action"
  | "skill-gap"
  | "learning"
  | "job-readiness"
  | "cv-improvement";

export interface CareerScore {
  overall: number;
  jobReadiness: number;
  cvReadiness: number;
  skillReadiness: number;
  applicationReadiness: number;
}

export interface ReadinessScores extends CareerScore {}

export interface RoadmapStep {
  id: string;
  phase: RoadmapPhase;
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
  locked: boolean;
  milestones: string[];
}

export interface Goal {
  id: string;
  type: GoalType;
  title: string;
  description: string;
  status: GoalStatus;
  progress: number;
  dueDate: string;
  actionHref?: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  status: MilestoneStatus;
  date?: string;
  category: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  targetLevel: SkillLevel;
  progress: number;
  priority: "high" | "medium" | "low";
  isMissing?: boolean;
}

export interface LearningItem {
  id: string;
  type: LearningItemType;
  title: string;
  provider: string;
  status: LearningItemStatus;
  progress: number;
  duration: string;
  dueDate?: string;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  tier: BadgeTier;
  earned: boolean;
  earnedDate?: string;
  progress: number;
}

export interface CareerRecommendation {
  id: string;
  type: RecommendationType;
  title: string;
  description: string;
  actionLabel: string;
  actionHref?: string;
  priority: "high" | "medium" | "low";
  impact: string;
}

export interface NextBestAction {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  actionHref?: string;
  category: string;
  confidence: number;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "milestone" | "goal" | "skill" | "learning" | "achievement";
  completed: boolean;
}

export interface CareerProgressData {
  targetRole: string;
  careerScore: CareerScore;
  roadmap: RoadmapStep[];
  goals: Goal[];
  milestones: Milestone[];
  skills: Skill[];
  learningItems: LearningItem[];
  badges: AchievementBadge[];
  recommendations: CareerRecommendation[];
  nextBestAction: NextBestAction;
  timeline: TimelineEvent[];
  weeklyGoalSummary: {
    completed: number;
    total: number;
  };
  monthlyGoalSummary: {
    completed: number;
    total: number;
  };
}

export interface CareerProgressState {
  data: CareerProgressData | null;
  viewState: CareerProgressViewState;
  selectedGoalId: string | null;
  selectedSkillCategory: SkillCategory | "all";
  selectedLearningType: LearningItemType | "all";
  lastUpdated: string | null;
}

export interface CareerProgressStore extends CareerProgressState {
  setViewState: (state: CareerProgressViewState) => void;
  setData: (data: CareerProgressData) => void;
  toggleGoalStatus: (id: string) => void;
  toggleMilestoneStatus: (id: string) => void;
  selectGoal: (id: string | null) => void;
  setSkillCategoryFilter: (category: SkillCategory | "all") => void;
  setLearningTypeFilter: (type: LearningItemType | "all") => void;
  resetProgress: () => void;
}
