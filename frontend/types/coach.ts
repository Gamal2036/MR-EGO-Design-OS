export type CoachViewState = "loading" | "ready" | "error" | "empty" | "offline";

export type CoachPriority = "high" | "medium" | "low";

export type CoachTimeframe = "daily" | "weekly" | "monthly" | "long-term";

export type CoachDecisionAnswer = "yes" | "no" | "maybe";

export type CoachDifficulty = "easy" | "medium" | "hard";

export type CoachImpact = "high" | "medium" | "low";

export interface CoachInsight {
  id: string;
  title: string;
  priority: CoachPriority;
  reason: string;
  estimatedImpact: string;
  category: string;
  actionLabel?: string;
  actionHref?: string;
}

export interface CoachActionItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  timeframe: CoachTimeframe;
  priority: CoachPriority;
  estimatedMinutes?: number;
  actionLabel?: string;
  actionHref?: string;
}

export interface CoachActionPlan {
  daily: CoachActionItem[];
  weekly: CoachActionItem[];
  monthly: CoachActionItem[];
  longTerm: CoachActionItem[];
}

export interface CoachRecommendation {
  id: string;
  title: string;
  description: string;
  reason: string;
  priority: CoachPriority;
  impact: string;
  actionLabel?: string;
  actionHref?: string;
}

export interface CoachSkillGap {
  skill: string;
  currentLevel: number;
  targetLevel: number;
  priority: CoachPriority;
  reason: string;
}

export interface CoachCareerReadiness {
  targetRole: string;
  readinessScore: number;
  skillGaps: CoachSkillGap[];
  estimatedReadinessAfterActions: number;
  summary: string;
}

export interface CoachNextGoal {
  id: string;
  title: string;
  description: string;
  priority: CoachPriority;
  deadline?: string;
  progress: number;
  actionLabel?: string;
  actionHref?: string;
}

export interface CoachStep {
  id: string;
  title: string;
  description: string;
  priority: CoachPriority;
  completed: boolean;
  order: number;
}

export interface CoachAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

export interface CoachMotivation {
  currentStreak: number;
  longestStreak: number;
  nextMilestone: string;
  estimatedSuccess: number;
  achievements: CoachAchievement[];
  encouragingMessage: string;
}

export interface CoachDecision {
  id: string;
  question: string;
  answer: CoachDecisionAnswer;
  reason: string;
  estimatedValue: string;
  difficulty: CoachDifficulty;
  careerImpact: CoachImpact;
  confidence: number;
}

export interface CoachAdvice {
  id: string;
  title: string;
  message: string;
  category: string;
  priority: CoachPriority;
  actionLabel?: string;
  actionHref?: string;
}

export interface CoachProgressSnapshot {
  overallReadiness: number;
  profileCompletion: number;
  skillReadiness: number;
  cvReadiness: number;
  applicationReadiness: number;
  interviewReadiness: number;
  targetRole: string;
}

export interface CoachSummary {
  headline: string;
  subheadline: string;
  keyWins: string[];
  focusAreas: string[];
}

export interface CoachData {
  targetRole: string;
  summary: CoachSummary;
  todayAdvice: CoachAdvice;
  readiness: CoachCareerReadiness;
  insights: CoachInsight[];
  actionPlan: CoachActionPlan;
  nextGoal: CoachNextGoal;
  motivation: CoachMotivation;
  decisions: CoachDecision[];
  recommendations: CoachRecommendation[];
  progress: CoachProgressSnapshot;
}

export interface CoachState {
  data: CoachData | null;
  viewState: CoachViewState;
  selectedTimeframe: CoachTimeframe | "all";
  selectedInsightId: string | null;
  selectedDecisionId: string | null;
  completedActionIds: string[];
  lastUpdated: string | null;
}

export interface CoachStore extends CoachState {
  setViewState: (state: CoachViewState) => void;
  setData: (data: CoachData) => void;
  selectTimeframe: (timeframe: CoachTimeframe | "all") => void;
  selectInsight: (id: string | null) => void;
  selectDecision: (id: string | null) => void;
  toggleActionCompleted: (id: string) => void;
  markAllDailyComplete: () => void;
  resetCoach: () => void;
}
