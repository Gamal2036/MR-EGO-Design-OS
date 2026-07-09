export type AnalyticsPeriod = "7d" | "30d" | "90d" | "1y";

export type AnalyticsViewState = "loading" | "ready" | "error" | "empty";

export interface CareerOverviewMetric {
  id: string;
  label: string;
  value: number;
  max: number;
  unit: "%" | "pts";
  trend: Trend;
  description: string;
}

export interface Trend {
  direction: "up" | "down" | "flat";
  value: string;
  label?: string;
}

export interface TimeSeriesPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

export interface WeeklyActivityData {
  labels: string[];
  applications: number[];
  interviews: number[];
  aiInteractions: number[];
}

export interface MonthlyActivityData {
  labels: string[];
  jobsSaved: number[];
  jobsApplied: number[];
  cvsImproved: number[];
}

export interface FunnelStage {
  id: string;
  label: string;
  count: number;
  color: string;
  dropOff?: number;
}

export interface CVPerformanceMetric {
  label: string;
  score: number;
  max: number;
}

export interface SkillGrowthPoint {
  label: string;
  current: number;
  previous: number;
  target: number;
}

export interface LearningItemMetric {
  id: string;
  label: string;
  completed: number;
  total: number;
  color: string;
}

export interface AIUsageMetric {
  label: string;
  value: number;
  color: string;
}

export interface ProviderUsageMetric {
  label: string;
  value: number;
  color: string;
  tokens?: number;
}

export interface TopRecommendation {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  category: string;
  actionLabel: string;
}

export interface HeatmapDay {
  date: string;
  day: string;
  intensity: 0 | 1 | 2 | 3 | 4;
  count: number;
}

export interface HeatmapWeek {
  week: string;
  days: HeatmapDay[];
}

export interface AchievementBadge {
  id: string;
  label: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: string;
}

export interface RecentActivityItem {
  id: string;
  type: "ai" | "cv" | "job" | "application" | "learning" | "milestone";
  title: string;
  description: string;
  timestamp: string;
}

export interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: string;
  href?: string;
}

export interface AnalyticsDashboardData {
  period: AnalyticsPeriod;
  careerOverview: CareerOverviewMetric[];
  weeklyActivity: WeeklyActivityData;
  monthlyActivity: MonthlyActivityData;
  applicationFunnel: FunnelStage[];
  cvPerformance: CVPerformanceMetric[];
  skillGrowth: SkillGrowthPoint[];
  learningProgress: LearningItemMetric[];
  aiUsage: AIUsageMetric[];
  providerUsage: ProviderUsageMetric[];
  recommendations: TopRecommendation[];
  productivityHeatmap: HeatmapWeek[];
  achievements: AchievementBadge[];
  recentActivity: RecentActivityItem[];
  quickActions: QuickAction[];
}

export interface AnalyticsState {
  period: AnalyticsPeriod;
  viewState: AnalyticsViewState;
}

export interface AnalyticsStore extends AnalyticsState {
  setPeriod: (period: AnalyticsPeriod) => void;
  setViewState: (viewState: AnalyticsViewState) => void;
}
