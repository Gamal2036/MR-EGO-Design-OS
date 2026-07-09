import type {
  CoachAchievement,
  CoachActionItem,
  CoachActionPlan,
  CoachAdvice,
  CoachCareerReadiness,
  CoachData,
  CoachDecision,
  CoachInsight,
  CoachMotivation,
  CoachNextGoal,
  CoachProgressSnapshot,
  CoachRecommendation,
  CoachSkillGap,
  CoachStep,
  CoachSummary,
} from "@/types/coach";

export const targetRole = "Senior AI Engineer";

export const demoCoachSummary: CoachSummary = {
  headline: "You are 68% ready for your target role",
  subheadline:
    "Focus this week on closing the Kubernetes gap and scheduling a system design mock interview. Your profile momentum is strong.",
  keyWins: [
    "Completed PyTorch deep learning specialization",
    "CV readiness increased to 85%",
    "Tracked 5 applications this week",
  ],
  focusAreas: [
    "Close Kubernetes skill gap",
    "Schedule system design mock",
    "Apply to 2 more senior AI roles",
  ],
};

export const demoTodayAdvice: CoachAdvice = {
  id: "advice-1",
  title: "Prioritize MLOps fundamentals today",
  message:
    "Your roadmap shows strong progress in deep learning, but hiring managers for Senior AI Engineer roles consistently ask about model deployment. Dedicate 45 minutes to containerizing a small model today.",
  category: "Daily Focus",
  priority: "high",
  actionLabel: "Start Docker Lab",
  actionHref: "/dashboard/learning",
};

export const demoSkillGaps: CoachSkillGap[] = [
  {
    skill: "Kubernetes",
    currentLevel: 25,
    targetLevel: 70,
    priority: "high",
    reason: "85% of target roles list Kubernetes or container orchestration.",
  },
  {
    skill: "System Design for AI",
    currentLevel: 55,
    targetLevel: 80,
    priority: "high",
    reason: "Senior roles require architecture decisions for model serving.",
  },
  {
    skill: "MLOps / CI-CD",
    currentLevel: 30,
    targetLevel: 65,
    priority: "medium",
    reason: "Production ML pipelines are a differentiator at senior level.",
  },
  {
    skill: "Stakeholder Communication",
    currentLevel: 70,
    targetLevel: 85,
    priority: "medium",
    reason: "Leadership interviews evaluate cross-functional influence.",
  },
];

export const demoCareerReadiness: CoachCareerReadiness = {
  targetRole,
  readinessScore: 68,
  skillGaps: demoSkillGaps,
  estimatedReadinessAfterActions: 79,
  summary:
    "You have a solid AI/ML foundation. Closing the two high-priority skill gaps will push you into the interview-ready zone within 3-4 weeks.",
};

export const demoInsights: CoachInsight[] = [
  {
    id: "insight-1",
    title: "Kubernetes is your biggest blocker",
    priority: "high",
    reason:
      "Most target roles require production deployment experience. Your current level is beginner.",
    estimatedImpact: "+8% readiness",
    category: "Skill Gap",
    actionLabel: "Continue Learning",
    actionHref: "/dashboard/learning",
  },
  {
    id: "insight-2",
    title: "System design interviews need attention",
    priority: "high",
    reason:
      "Senior AI Engineer loops include distributed model serving design. You have not practiced this yet.",
    estimatedImpact: "+7% interview readiness",
    category: "Interview Prep",
    actionLabel: "Book Mock",
    actionHref: "/dashboard/interviews",
  },
  {
    id: "insight-3",
    title: "Your CV is competitive for AI roles",
    priority: "medium",
    reason:
      "CV readiness is at 85%. Highlighting the new transformer project could push it higher.",
    estimatedImpact: "+4% CV readiness",
    category: "CV",
    actionLabel: "Edit CV",
    actionHref: "/dashboard/cv-builder",
  },
  {
    id: "insight-4",
    title: "Apply momentum is slowing",
    priority: "medium",
    reason:
      "You applied to 5 roles this week but saved 14. Converting saves to applications improves pipeline velocity.",
    estimatedImpact: "+6% application readiness",
    category: "Applications",
    actionLabel: "View Jobs",
    actionHref: "/dashboard/jobs",
  },
];

export const demoActionItems: CoachActionItem[] = [
  {
    id: "action-1",
    title: "Complete Docker Containers Lab",
    description: "Containerize a PyTorch sentiment classifier and push to a registry.",
    completed: false,
    timeframe: "daily",
    priority: "high",
    estimatedMinutes: 45,
    actionHref: "/dashboard/learning",
  },
  {
    id: "action-2",
    title: "Review 3 Senior AI Engineer job descriptions",
    description: "Identify common Kubernetes and system design requirements.",
    completed: true,
    timeframe: "daily",
    priority: "medium",
    estimatedMinutes: 20,
    actionHref: "/dashboard/jobs",
  },
  {
    id: "action-3",
    title: "Watch Kubernetes pod scheduling lecture",
    description: "Module 2, Lesson 4 of the MLOps on AWS path.",
    completed: false,
    timeframe: "weekly",
    priority: "high",
    estimatedMinutes: 60,
    actionHref: "/dashboard/learning",
  },
  {
    id: "action-4",
    title: "Schedule system design mock interview",
    description: "Focus on recommendation system serving architecture.",
    completed: false,
    timeframe: "weekly",
    priority: "high",
    estimatedMinutes: 90,
    actionHref: "/dashboard/interviews",
  },
  {
    id: "action-5",
    title: "Apply to 2 saved roles",
    description: "Prioritize roles above 85% match with remote options.",
    completed: false,
    timeframe: "weekly",
    priority: "medium",
    estimatedMinutes: 60,
    actionHref: "/dashboard/jobs",
  },
  {
    id: "action-6",
    title: "Finish MLOps fundamentals module",
    description: "Complete CI/CD for model training and serving pipelines.",
    completed: false,
    timeframe: "monthly",
    priority: "high",
    estimatedMinutes: 480,
    actionHref: "/dashboard/learning",
  },
  {
    id: "action-7",
    title: "Add transformer project to CV",
    description: "Quantify impact with latency and accuracy metrics.",
    completed: false,
    timeframe: "monthly",
    priority: "medium",
    estimatedMinutes: 90,
    actionHref: "/dashboard/cv-builder",
  },
  {
    id: "action-8",
    title: "Build a public AI portfolio",
    description: "Publish two end-to-end projects with write-ups and code.",
    completed: false,
    timeframe: "long-term",
    priority: "medium",
    estimatedMinutes: 1200,
  },
];

export const demoActionPlan: CoachActionPlan = {
  daily: demoActionItems.filter((a) => a.timeframe === "daily"),
  weekly: demoActionItems.filter((a) => a.timeframe === "weekly"),
  monthly: demoActionItems.filter((a) => a.timeframe === "monthly"),
  longTerm: demoActionItems.filter((a) => a.timeframe === "long-term"),
};

export const demoNextGoal: CoachNextGoal = {
  id: "goal-1",
  title: "Reach interview-ready status",
  description:
    "Achieve 80% overall readiness and complete at least one system design mock interview.",
  priority: "high",
  deadline: "Mar 31",
  progress: 68,
  actionLabel: "View Roadmap",
  actionHref: "/dashboard/roadmap",
};

export const demoAchievements: CoachAchievement[] = [
  {
    id: "ach-1",
    title: "7-Day Streak",
    description: "Completed a career action every day for 7 days.",
    icon: "Flame",
    earned: true,
    earnedDate: "Today",
  },
  {
    id: "ach-2",
    title: "Skill Builder",
    description: "Closed 3 skill gaps identified by the AI coach.",
    icon: "Zap",
    earned: true,
    earnedDate: "Feb 12",
  },
  {
    id: "ach-3",
    title: "Application Sprinter",
    description: "Applied to 5 roles in one week.",
    icon: "Send",
    earned: false,
  },
  {
    id: "ach-4",
    title: "Mock Interview Pro",
    description: "Completed 5 mock interviews.",
    icon: "MessageSquare",
    earned: false,
  },
];

export const demoMotivation: CoachMotivation = {
  currentStreak: 7,
  longestStreak: 12,
  nextMilestone: "10-day streak",
  estimatedSuccess: 84,
  achievements: demoAchievements,
  encouragingMessage:
    "You are consistently taking action. Keep this rhythm for 3 more days to unlock your longest streak and a meaningful readiness boost.",
};

export const demoDecisions: CoachDecision[] = [
  {
    id: "decision-1",
    question: "Should you prioritize Kubernetes over deep learning this week?",
    answer: "yes",
    reason:
      "Your deep learning foundation is strong. Kubernetes is the highest-impact gap for target roles.",
    estimatedValue: "+8% skill readiness",
    difficulty: "medium",
    careerImpact: "high",
    confidence: 0.91,
  },
  {
    id: "decision-2",
    question: "Should you apply to roles outside your top 3 locations?",
    answer: "maybe",
    reason:
      "Expanding location increases opportunities by 34%, but only if the role is above 80% match.",
    estimatedValue: "+5% pipeline velocity",
    difficulty: "easy",
    careerImpact: "medium",
    confidence: 0.72,
  },
  {
    id: "decision-3",
    question: "Should you delay applications until your CV reaches 90%?",
    answer: "no",
    reason:
      "Your CV is already competitive at 85%. Waiting risks missing active requisitions.",
    estimatedValue: "Avoid opportunity cost",
    difficulty: "easy",
    careerImpact: "medium",
    confidence: 0.86,
  },
];

export const demoRecommendations: CoachRecommendation[] = [
  {
    id: "rec-1",
    title: "Focus on transformer fine-tuning",
    description:
      "Your current phase depends on mastering attention and fine-tuning. Dedicate extra hours here this week.",
    reason: "Directly maps to Senior AI Engineer technical screens.",
    priority: "high",
    impact: "+12% phase completion",
    actionLabel: "Continue Learning",
    actionHref: "/dashboard/learning",
  },
  {
    id: "rec-2",
    title: "Schedule a system design mock",
    description:
      "Senior AI Engineer interviews heavily test distributed system design for model serving.",
    reason: "Interview readiness is your lowest score at 68%.",
    priority: "high",
    impact: "+8% interview readiness",
    actionLabel: "Book Interview",
    actionHref: "/dashboard/interviews",
  },
  {
    id: "rec-3",
    title: "Update CV with latest project",
    description:
      "Add the sentiment classifier project to your CV once complete.",
    reason: "Quantified project impact increases recruiter response rate.",
    priority: "medium",
    impact: "+5% CV readiness",
    actionLabel: "Edit CV",
    actionHref: "/dashboard/cv-builder",
  },
  {
    id: "rec-4",
    title: "Ask the AI Career Coach for weekly planning",
    description:
      "Get a personalized plan that balances learning, applications, and interview prep.",
    reason: "Your weekly action mix could be optimized for faster progress.",
    priority: "low",
    impact: "Personalized plan",
    actionLabel: "Open AI Coach",
    actionHref: "/dashboard/coach",
  },
];

export const demoSteps: CoachStep[] = [
  {
    id: "step-1",
    title: "Complete skill assessment",
    description: "Validate current level across target-role skills.",
    priority: "high",
    completed: true,
    order: 1,
  },
  {
    id: "step-2",
    title: "Close high-priority skill gaps",
    description: "Focus on Kubernetes and system design first.",
    priority: "high",
    completed: false,
    order: 2,
  },
  {
    id: "step-3",
    title: "Complete 3 mock interviews",
    description: "Include technical, system design, and behavioral rounds.",
    priority: "high",
    completed: false,
    order: 3,
  },
  {
    id: "step-4",
    title: "Apply to 10 target roles",
    description: "Maintain a pipeline of active applications.",
    priority: "medium",
    completed: false,
    order: 4,
  },
];

export const demoProgressSnapshot: CoachProgressSnapshot = {
  overallReadiness: 68,
  profileCompletion: 65,
  skillReadiness: 72,
  cvReadiness: 85,
  applicationReadiness: 58,
  interviewReadiness: 68,
  targetRole,
};

export const demoCoachData: CoachData = {
  targetRole,
  summary: demoCoachSummary,
  todayAdvice: demoTodayAdvice,
  readiness: demoCareerReadiness,
  insights: demoInsights,
  actionPlan: demoActionPlan,
  nextGoal: demoNextGoal,
  motivation: demoMotivation,
  decisions: demoDecisions,
  recommendations: demoRecommendations,
  progress: demoProgressSnapshot,
};

export const coachPriorityConfig = {
  high: { label: "High", variant: "danger" as const, color: "text-danger" as const },
  medium: { label: "Medium", variant: "warning" as const, color: "text-warning" as const },
  low: { label: "Low", variant: "neutral" as const, color: "text-tertiary" as const },
};

export const coachTimeframeConfig = {
  daily: { label: "Today", color: "text-info" as const },
  weekly: { label: "This Week", color: "text-ai" as const },
  monthly: { label: "This Month", color: "text-warning" as const },
  "long-term": { label: "Long Term", color: "text-success" as const },
};

export const coachDecisionAnswerConfig = {
  yes: { label: "Yes", color: "text-success" as const, bg: "bg-success/10" as const },
  no: { label: "No", color: "text-danger" as const, bg: "bg-danger/10" as const },
  maybe: { label: "Maybe", color: "text-warning" as const, bg: "bg-warning/10" as const },
};

export const coachDifficultyConfig = {
  easy: { label: "Easy", color: "text-success" as const },
  medium: { label: "Medium", color: "text-warning" as const },
  hard: { label: "Hard", color: "text-danger" as const },
};

export const coachImpactConfig = {
  high: { label: "High Impact", color: "text-danger" as const },
  medium: { label: "Medium Impact", color: "text-warning" as const },
  low: { label: "Low Impact", color: "text-tertiary" as const },
};

export function getReadinessColor(score: number): string {
  if (score >= 80) return "text-success";
  if (score >= 60) return "text-ai";
  if (score >= 40) return "text-warning";
  return "text-danger";
}

export function getReadinessVariant(
  score: number
): "success" | "ai" | "warning" | "danger" {
  if (score >= 80) return "success";
  if (score >= 60) return "ai";
  if (score >= 40) return "warning";
  return "danger";
}

export type {
  CoachAchievement,
  CoachActionItem,
  CoachActionPlan,
  CoachAdvice,
  CoachCareerReadiness,
  CoachData,
  CoachDecision,
  CoachInsight,
  CoachMotivation,
  CoachNextGoal,
  CoachProgressSnapshot,
  CoachRecommendation,
  CoachSkillGap,
  CoachStep,
  CoachSummary,
};
