import type {
  AchievementBadge,
  AnalyticsDashboardData,
  AnalyticsPeriod,
  CareerOverviewMetric,
  FunnelStage,
  HeatmapWeek,
  LearningItemMetric,
  MonthlyActivityData,
  QuickAction,
  RecentActivityItem,
  SkillGrowthPoint,
  TopRecommendation,
  WeeklyActivityData,
} from "@/types/analytics";

export const ANALYTICS_PERIODS: { value: AnalyticsPeriod; label: string }[] = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "1y", label: "Last year" },
];

const careerOverview: CareerOverviewMetric[] = [
  {
    id: "career-score",
    label: "Career Score",
    value: 78,
    max: 100,
    unit: "%",
    trend: { direction: "up", value: "+6%", label: "vs last month" },
    description: "Overall career momentum",
  },
  {
    id: "job-readiness",
    label: "Job Readiness",
    value: 82,
    max: 100,
    unit: "%",
    trend: { direction: "up", value: "+4%", label: "vs last month" },
    description: "Match for target roles",
  },
  {
    id: "cv-score",
    label: "CV Score",
    value: 74,
    max: 100,
    unit: "%",
    trend: { direction: "up", value: "+8%", label: "vs last month" },
    description: "CV strength and ATS fit",
  },
  {
    id: "interview-score",
    label: "Interview Score",
    value: 68,
    max: 100,
    unit: "%",
    trend: { direction: "down", value: "-2%", label: "vs last month" },
    description: "Interview readiness",
  },
  {
    id: "skill-score",
    label: "Skill Score",
    value: 79,
    max: 100,
    unit: "%",
    trend: { direction: "up", value: "+5%", label: "vs last month" },
    description: "Skill coverage depth",
  },
];

const weeklyActivity: WeeklyActivityData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  applications: [2, 4, 1, 5, 3, 0, 2],
  interviews: [0, 1, 0, 2, 1, 0, 0],
  aiInteractions: [8, 12, 10, 15, 9, 4, 6],
};

const monthlyActivity: MonthlyActivityData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  jobsSaved: [14, 18, 22, 28, 34, 41],
  jobsApplied: [4, 6, 8, 12, 15, 19],
  cvsImproved: [1, 2, 3, 4, 5, 7],
};

const applicationFunnel: FunnelStage[] = [
  { id: "saved", label: "Saved", count: 128, color: "var(--color-primary-500)", dropOff: 0 },
  { id: "applied", label: "Applied", count: 64, color: "var(--color-info-500)", dropOff: 50 },
  { id: "viewed", label: "Viewed", count: 38, color: "var(--color-cyan-500)", dropOff: 41 },
  { id: "interview", label: "Interview", count: 18, color: "var(--color-ai-500)", dropOff: 53 },
  { id: "offer", label: "Offer", count: 5, color: "var(--color-warning-500)", dropOff: 72 },
  { id: "hired", label: "Hired", count: 2, color: "var(--color-success-500)", dropOff: 60 },
];

const cvPerformance = [
  { label: "ATS Parsing", score: 88, max: 100 },
  { label: "Keywords", score: 72, max: 100 },
  { label: "Impact", score: 65, max: 100 },
  { label: "Readability", score: 91, max: 100 },
  { label: "Formatting", score: 84, max: 100 },
  { label: "Completeness", score: 70, max: 100 },
];

const skillGrowth: SkillGrowthPoint[] = [
  { label: "System Design", current: 72, previous: 60, target: 85 },
  { label: "Python/ML", current: 84, previous: 78, target: 90 },
  { label: "Cloud (AWS)", current: 68, previous: 55, target: 80 },
  { label: "Leadership", current: 58, previous: 50, target: 75 },
  { label: "Communication", current: 76, previous: 70, target: 85 },
  { label: "Data Engineering", current: 64, previous: 52, target: 78 },
];

const learningProgress: LearningItemMetric[] = [
  { id: "courses", label: "Courses", completed: 4, total: 6, color: "var(--color-primary-500)" },
  { id: "labs", label: "Hands-on Labs", completed: 12, total: 20, color: "var(--color-cyan-500)" },
  { id: "certificates", label: "Certificates", completed: 1, total: 3, color: "var(--color-success-500)" },
  { id: "practice", label: "Practice Tasks", completed: 8, total: 12, color: "var(--color-ai-500)" },
];

const aiUsage = [
  { label: "CV Review", value: 42, color: "var(--color-cv-500)" },
  { label: "Job Search", value: 28, color: "var(--color-job-500)" },
  { label: "Interview Prep", value: 18, color: "var(--color-ai-500)" },
  { label: "Career Coach", value: 12, color: "var(--color-analytics-500)" },
];

const providerUsage = [
  { label: "Claude", value: 45, color: "var(--color-analytics-500)", tokens: 124000 },
  { label: "GPT-4o", value: 30, color: "var(--color-primary-500)", tokens: 83000 },
  { label: "Gemini", value: 15, color: "var(--color-cyan-500)", tokens: 41000 },
  { label: "Llama", value: 10, color: "var(--color-ai-500)", tokens: 27000 },
];

const recommendations: TopRecommendation[] = [
  {
    id: "rec-1",
    title: "Close the Kubernetes gap",
    description:
      "78% of your target roles list Kubernetes. Adding a hands-on lab this week could lift your skill score by 6%.",
    impact: "high",
    category: "Skills",
    actionLabel: "Start Lab",
  },
  {
    id: "rec-2",
    title: "Tailor your CV for AI Engineer roles",
    description:
      "Your CV score is 6 points below your target role average. Highlight recent AI projects to improve ATS match.",
    impact: "high",
    category: "CV",
    actionLabel: "Improve CV",
  },
  {
    id: "rec-3",
    title: "Schedule mock interviews",
    description:
      "Your interview score dipped 2%. Two 30-minute mock sessions this week can rebuild confidence.",
    impact: "medium",
    category: "Interviews",
    actionLabel: "Book Session",
  },
  {
    id: "rec-4",
    title: "Apply to 3 high-match jobs",
    description:
      "14 saved jobs have a match score above 80%. Applying this week keeps your funnel moving.",
    impact: "medium",
    category: "Applications",
    actionLabel: "View Jobs",
  },
];

const productivityHeatmap: HeatmapWeek[] = [
  {
    week: "W1",
    days: [
      { date: "Jul 1", day: "Mon", intensity: 2, count: 4 },
      { date: "Jul 2", day: "Tue", intensity: 3, count: 7 },
      { date: "Jul 3", day: "Wed", intensity: 1, count: 2 },
      { date: "Jul 4", day: "Thu", intensity: 4, count: 11 },
      { date: "Jul 5", day: "Fri", intensity: 3, count: 8 },
      { date: "Jul 6", day: "Sat", intensity: 0, count: 0 },
      { date: "Jul 7", day: "Sun", intensity: 1, count: 1 },
    ],
  },
  {
    week: "W2",
    days: [
      { date: "Jul 8", day: "Mon", intensity: 3, count: 9 },
      { date: "Jul 9", day: "Tue", intensity: 4, count: 12 },
      { date: "Jul 10", day: "Wed", intensity: 2, count: 5 },
      { date: "Jul 11", day: "Thu", intensity: 3, count: 7 },
      { date: "Jul 12", day: "Fri", intensity: 2, count: 4 },
      { date: "Jul 13", day: "Sat", intensity: 1, count: 2 },
      { date: "Jul 14", day: "Sun", intensity: 0, count: 0 },
    ],
  },
  {
    week: "W3",
    days: [
      { date: "Jul 15", day: "Mon", intensity: 1, count: 3 },
      { date: "Jul 16", day: "Tue", intensity: 2, count: 6 },
      { date: "Jul 17", day: "Wed", intensity: 3, count: 8 },
      { date: "Jul 18", day: "Thu", intensity: 4, count: 13 },
      { date: "Jul 19", day: "Fri", intensity: 3, count: 9 },
      { date: "Jul 20", day: "Sat", intensity: 2, count: 4 },
      { date: "Jul 21", day: "Sun", intensity: 1, count: 1 },
    ],
  },
  {
    week: "W4",
    days: [
      { date: "Jul 22", day: "Mon", intensity: 3, count: 8 },
      { date: "Jul 23", day: "Tue", intensity: 4, count: 10 },
      { date: "Jul 24", day: "Wed", intensity: 2, count: 5 },
      { date: "Jul 25", day: "Thu", intensity: 3, count: 7 },
      { date: "Jul 26", day: "Fri", intensity: 4, count: 11 },
      { date: "Jul 27", day: "Sat", intensity: 1, count: 2 },
      { date: "Jul 28", day: "Sun", intensity: 0, count: 0 },
    ],
  },
];

const achievements: AchievementBadge[] = [
  {
    id: "ach-1",
    label: "First Application",
    description: "Sent your first job application",
    icon: "Send",
    earned: true,
    earnedAt: "2 weeks ago",
  },
  {
    id: "ach-2",
    label: "CV Master",
    description: "Achieved CV score above 70",
    icon: "FileText",
    earned: true,
    earnedAt: "1 week ago",
  },
  {
    id: "ach-3",
    label: "AI Power User",
    description: "Used AI workspace 50 times",
    icon: "Brain",
    earned: true,
    earnedAt: "3 days ago",
  },
  {
    id: "ach-4",
    label: "Interview Ready",
    description: "Completed 5 mock interviews",
    icon: "Users",
    earned: false,
  },
  {
    id: "ach-5",
    label: "Skill Builder",
    description: "Completed 10 learning tasks",
    icon: "Zap",
    earned: false,
  },
  {
    id: "ach-6",
    label: "Offer Received",
    description: "Received a job offer",
    icon: "Trophy",
    earned: false,
  },
];

const recentActivity: RecentActivityItem[] = [
  {
    id: "act-1",
    type: "ai",
    title: "AI CV review completed",
    description: "Score improved from 66 to 74",
    timestamp: "2 hours ago",
  },
  {
    id: "act-2",
    type: "job",
    title: "Saved 3 high-match jobs",
    description: "Match scores between 82% and 94%",
    timestamp: "5 hours ago",
  },
  {
    id: "act-3",
    type: "application",
    title: "Applied to Senior AI Engineer",
    description: "Nexus Technologies — 94% match",
    timestamp: "1 day ago",
  },
  {
    id: "act-4",
    type: "learning",
    title: "Completed AWS Lambda lab",
    description: "Cloud skills improved by 4%",
    timestamp: "2 days ago",
  },
  {
    id: "act-5",
    type: "milestone",
    title: "Career score milestone",
    description: "Reached 78 — all-time high",
    timestamp: "3 days ago",
  },
];

const quickActions: QuickAction[] = [
  {
    id: "qa-1",
    label: "Export Report",
    description: "Download analytics PDF",
    icon: "Download",
  },
  {
    id: "qa-2",
    label: "Share Insights",
    description: "Send to mentor or coach",
    icon: "Share2",
  },
  {
    id: "qa-3",
    label: "Set Goals",
    description: "Update weekly targets",
    icon: "Target",
  },
  {
    id: "qa-4",
    label: "Refresh Data",
    description: "Pull latest metrics",
    icon: "RefreshCw",
  },
];

export const demoAnalyticsData: AnalyticsDashboardData = {
  period: "30d",
  careerOverview,
  weeklyActivity,
  monthlyActivity,
  applicationFunnel,
  cvPerformance,
  skillGrowth,
  learningProgress,
  aiUsage,
  providerUsage,
  recommendations,
  productivityHeatmap,
  achievements,
  recentActivity,
  quickActions,
};

export function getAnalyticsDataByPeriod(period: AnalyticsPeriod): AnalyticsDashboardData {
  const multiplier = period === "7d" ? 0.35 : period === "90d" ? 1.8 : period === "1y" ? 3.2 : 1;
  const adjustedCounts = (counts: number[]) => counts.map((c) => Math.max(0, Math.round(c * multiplier)));

  return {
    ...demoAnalyticsData,
    period,
    weeklyActivity: {
      ...demoAnalyticsData.weeklyActivity,
      applications: adjustedCounts(demoAnalyticsData.weeklyActivity.applications),
      interviews: adjustedCounts(demoAnalyticsData.weeklyActivity.interviews),
      aiInteractions: adjustedCounts(demoAnalyticsData.weeklyActivity.aiInteractions),
    },
    monthlyActivity: {
      ...demoAnalyticsData.monthlyActivity,
      jobsSaved: adjustedCounts(demoAnalyticsData.monthlyActivity.jobsSaved),
      jobsApplied: adjustedCounts(demoAnalyticsData.monthlyActivity.jobsApplied),
      cvsImproved: adjustedCounts(demoAnalyticsData.monthlyActivity.cvsImproved),
    },
  };
}
