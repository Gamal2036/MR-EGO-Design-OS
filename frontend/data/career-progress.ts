import type {
  AchievementBadge,
  CareerProgressData,
  CareerRecommendation,
  Goal,
  LearningItem,
  Milestone,
  NextBestAction,
  RoadmapStep,
  Skill,
  TimelineEvent,
} from "@/types/career-progress";

export const demoCareerScore = {
  overall: 78,
  jobReadiness: 72,
  cvReadiness: 85,
  skillReadiness: 68,
  applicationReadiness: 80,
};

export const demoRoadmap: RoadmapStep[] = [
  {
    id: "rs-1",
    phase: "beginner",
    title: "Beginner",
    description: "Build your foundation with a complete profile and first CV.",
    completed: true,
    current: false,
    locked: false,
    milestones: ["ml-1", "ml-2", "ml-3"],
  },
  {
    id: "rs-2",
    phase: "application-ready",
    title: "Ready for Applications",
    description: "CV is polished, target role is clear, job search is active.",
    completed: true,
    current: false,
    locked: false,
    milestones: ["ml-4", "ml-5"],
  },
  {
    id: "rs-3",
    phase: "interview-ready",
    title: "Interview Ready",
    description: "Skills align with role requirements and applications are tracked.",
    completed: false,
    current: true,
    locked: false,
    milestones: ["ml-6", "ml-7"],
  },
  {
    id: "rs-4",
    phase: "first-job",
    title: "First Job",
    description: "Receive and evaluate your first offer in the target field.",
    completed: false,
    current: false,
    locked: true,
    milestones: ["ml-8"],
  },
  {
    id: "rs-5",
    phase: "growth",
    title: "Growth Phase",
    description: "Continuous learning, networking, and career advancement.",
    completed: false,
    current: false,
    locked: true,
    milestones: ["ml-9", "ml-10"],
  },
];

export const demoGoals: Goal[] = [
  {
    id: "goal-1",
    type: "daily",
    title: "Review 3 job postings",
    description: "Spend 15 minutes reviewing roles that match your target.",
    status: "completed",
    progress: 100,
    dueDate: "Today",
    actionHref: "/dashboard/jobs",
  },
  {
    id: "goal-2",
    type: "daily",
    title: "Update CV summary",
    description: "Refine your professional summary with recent achievements.",
    status: "in-progress",
    progress: 40,
    dueDate: "Today",
    actionHref: "/dashboard/cv-builder",
  },
  {
    id: "goal-3",
    type: "weekly",
    title: "Apply to 5 relevant roles",
    description: "Submit tailored applications to positions above 75% match.",
    status: "in-progress",
    progress: 60,
    dueDate: "This week",
    actionHref: "/dashboard/jobs",
  },
  {
    id: "goal-4",
    type: "weekly",
    title: "Complete Kubernetes fundamentals",
    description: "Finish the first module of your containerization course.",
    status: "pending",
    progress: 0,
    dueDate: "This week",
  },
  {
    id: "goal-5",
    type: "monthly",
    title: "Reach 80% skill readiness",
    description: "Close priority skill gaps identified in CV analysis.",
    status: "in-progress",
    progress: 68,
    dueDate: "This month",
    actionHref: "/dashboard/cv-analysis",
  },
  {
    id: "goal-6",
    type: "monthly",
    title: "Track 10 applications",
    description: "Maintain consistent application tracking in MR:EGO.",
    status: "in-progress",
    progress: 50,
    dueDate: "This month",
    actionHref: "/dashboard/applications",
  },
];

export const demoMilestones: Milestone[] = [
  {
    id: "ml-1",
    title: "Profile created",
    description: "Set up your MR:EGO profile.",
    status: "completed",
    date: "Jan 15",
    category: "Foundation",
  },
  {
    id: "ml-2",
    title: "First CV draft",
    description: "Created your initial CV in the builder.",
    status: "completed",
    date: "Jan 20",
    category: "CV",
  },
  {
    id: "ml-3",
    title: "Target role defined",
    description: "Selected Senior AI Engineer as your target.",
    status: "completed",
    date: "Jan 22",
    category: "Strategy",
  },
  {
    id: "ml-4",
    title: "CV analyzed by AI",
    description: "Completed first AI CV analysis.",
    status: "completed",
    date: "Feb 1",
    category: "CV",
  },
  {
    id: "ml-5",
    title: "First job saved",
    description: "Saved a role to your shortlist.",
    status: "completed",
    date: "Feb 3",
    category: "Jobs",
  },
  {
    id: "ml-6",
    title: "First application sent",
    description: "Tracked your first application.",
    status: "in-progress",
    category: "Applications",
  },
  {
    id: "ml-7",
    title: "Skill gap plan created",
    description: "Built a learning plan for missing skills.",
    status: "available",
    category: "Skills",
  },
  {
    id: "ml-8",
    title: "First interview completed",
    description: "Completed a live interview for a target role.",
    status: "locked",
    category: "Interviews",
  },
  {
    id: "ml-9",
    title: "First offer received",
    description: "Received a formal job offer.",
    status: "locked",
    category: "Offers",
  },
  {
    id: "ml-10",
    title: "Promotion or role transition",
    description: "Advanced to your next career milestone.",
    status: "locked",
    category: "Growth",
  },
];

export const demoSkills: Skill[] = [
  { id: "sk-1", name: "React", category: "technical", level: "expert", targetLevel: "expert", progress: 95, priority: "high" },
  { id: "sk-2", name: "TypeScript", category: "technical", level: "advanced", targetLevel: "expert", progress: 82, priority: "high" },
  { id: "sk-3", name: "Node.js", category: "technical", level: "advanced", targetLevel: "advanced", progress: 78, priority: "medium" },
  { id: "sk-4", name: "Kubernetes", category: "technical", level: "beginner", targetLevel: "intermediate", progress: 25, priority: "high", isMissing: true },
  { id: "sk-5", name: "Docker", category: "technical", level: "beginner", targetLevel: "intermediate", progress: 30, priority: "high", isMissing: true },
  { id: "sk-6", name: "Machine Learning", category: "technical", level: "beginner", targetLevel: "intermediate", progress: 20, priority: "high", isMissing: true },
  { id: "sk-7", name: "System Design", category: "technical", level: "intermediate", targetLevel: "advanced", progress: 55, priority: "medium" },
  { id: "sk-8", name: "Communication", category: "soft", level: "advanced", targetLevel: "expert", progress: 80, priority: "medium" },
  { id: "sk-9", name: "Leadership", category: "soft", level: "intermediate", targetLevel: "advanced", progress: 60, priority: "medium" },
  { id: "sk-10", name: "Problem Solving", category: "soft", level: "advanced", targetLevel: "expert", progress: 85, priority: "high" },
  { id: "sk-11", name: "English", category: "language", level: "advanced", targetLevel: "expert", progress: 88, priority: "high" },
  { id: "sk-12", name: "German", category: "language", level: "beginner", targetLevel: "intermediate", progress: 15, priority: "low" },
];

export const demoLearningItems: LearningItem[] = [
  {
    id: "li-1",
    type: "course",
    title: "Kubernetes for Developers",
    provider: "Cloud Academy",
    status: "in-progress",
    progress: 35,
    duration: "12h",
    dueDate: "Feb 28",
  },
  {
    id: "li-2",
    type: "lab",
    title: "Docker Containers Lab",
    provider: "DevOps Sandbox",
    status: "not-started",
    progress: 0,
    duration: "3h",
    dueDate: "Mar 5",
  },
  {
    id: "li-3",
    type: "certificate",
    title: "AWS Certified Developer",
    provider: "AWS Training",
    status: "in-progress",
    progress: 20,
    duration: "40h",
    dueDate: "Apr 15",
  },
  {
    id: "li-4",
    type: "practice",
    title: "System Design Mock Interviews",
    provider: "Pramp",
    status: "not-started",
    progress: 0,
    duration: "2h",
    dueDate: "Mar 10",
  },
  {
    id: "li-5",
    type: "course",
    title: "Machine Learning Specialization",
    provider: "Coursera",
    status: "not-started",
    progress: 0,
    duration: "60h",
    dueDate: "May 1",
  },
];

export const demoBadges: AchievementBadge[] = [
  {
    id: "bdg-1",
    title: "CV Builder Started",
    description: "Created your first CV draft.",
    icon: "FileText",
    tier: "bronze",
    earned: true,
    earnedDate: "Jan 20",
    progress: 100,
  },
  {
    id: "bdg-2",
    title: "CV Analyzed",
    description: "Ran AI analysis on your CV.",
    icon: "BarChart3",
    tier: "silver",
    earned: true,
    earnedDate: "Feb 1",
    progress: 100,
  },
  {
    id: "bdg-3",
    title: "First Job Saved",
    description: "Saved a job to your shortlist.",
    icon: "Briefcase",
    tier: "bronze",
    earned: true,
    earnedDate: "Feb 3",
    progress: 100,
  },
  {
    id: "bdg-4",
    title: "First Application Tracked",
    description: "Added an application to the tracker.",
    icon: "Send",
    tier: "silver",
    earned: false,
    progress: 60,
  },
  {
    id: "bdg-5",
    title: "Documents Organized",
    description: "Uploaded and organized career documents.",
    icon: "FolderOpen",
    tier: "gold",
    earned: false,
    progress: 30,
  },
];

export const demoNextBestAction: NextBestAction = {
  id: "nba-1",
  title: "Apply to Senior AI Engineer at Nexus Technologies",
  description:
    "Your profile matches this role at 94%. Completing the application today would advance your interview-ready milestone.",
  actionLabel: "View Job",
  actionHref: "/dashboard/jobs",
  category: "Applications",
  confidence: 0.94,
};

export const demoRecommendations: CareerRecommendation[] = [
  {
    id: "rec-1",
    type: "next-best-action",
    title: "Apply to your top job match",
    description: "Nexus Technologies — 94% match. Tailor your CV and apply today.",
    actionLabel: "View Job",
    actionHref: "/dashboard/jobs",
    priority: "high",
    impact: "+12% application readiness",
  },
  {
    id: "rec-2",
    type: "skill-gap",
    title: "Close Kubernetes gap",
    description: "85% of target roles list Kubernetes. Finish your course this week.",
    actionLabel: "Continue Learning",
    priority: "high",
    impact: "+8% skill readiness",
  },
  {
    id: "rec-3",
    type: "learning",
    title: "Start Docker Containers Lab",
    description: "Hands-on practice will reinforce your course progress.",
    actionLabel: "Start Lab",
    priority: "medium",
    impact: "+5% skill readiness",
  },
  {
    id: "rec-4",
    type: "job-readiness",
    title: "Add 2 more applications",
    description: "You are on track for 5 applications this week. Add 2 more.",
    actionLabel: "Find Jobs",
    actionHref: "/dashboard/jobs",
    priority: "medium",
    impact: "+6% application readiness",
  },
  {
    id: "rec-5",
    type: "cv-improvement",
    title: "Quantify your latest project",
    description: "Add measurable outcomes to your most recent role.",
    actionLabel: "Edit CV",
    actionHref: "/dashboard/cv-builder",
    priority: "medium",
    impact: "+4% CV readiness",
  },
  {
    id: "rec-6",
    type: "next-best-action",
    title: "Talk to your AI Career Coach",
    description: "Get a personalized weekly plan and daily focus based on your progress.",
    actionLabel: "Open Coach",
    actionHref: "/dashboard/coach",
    priority: "medium",
    impact: "Personalized plan",
  },
];

export const demoTimeline: TimelineEvent[] = [
  {
    id: "te-1",
    title: "CV Builder Started",
    description: "Created your first CV draft",
    date: "Jan 20",
    type: "milestone",
    completed: true,
  },
  {
    id: "te-2",
    title: "CV Analyzed",
    description: "AI identified key improvement areas",
    date: "Feb 1",
    type: "achievement",
    completed: true,
  },
  {
    id: "te-3",
    title: "First Job Saved",
    description: "Senior AI Engineer at Nexus Technologies",
    date: "Feb 3",
    type: "goal",
    completed: true,
  },
  {
    id: "te-4",
    title: "Kubernetes Course Started",
    description: "35% complete",
    date: "Feb 10",
    type: "learning",
    completed: false,
  },
  {
    id: "te-5",
    title: "Skill Gap Plan Created",
    description: "Priority skills mapped to learning items",
    date: "Feb 12",
    type: "milestone",
    completed: false,
  },
];

export const demoCareerProgressData: CareerProgressData = {
  targetRole: "Senior AI Engineer",
  careerScore: demoCareerScore,
  roadmap: demoRoadmap,
  goals: demoGoals,
  milestones: demoMilestones,
  skills: demoSkills,
  learningItems: demoLearningItems,
  badges: demoBadges,
  recommendations: demoRecommendations,
  nextBestAction: demoNextBestAction,
  timeline: demoTimeline,
  weeklyGoalSummary: { completed: 1, total: 2 },
  monthlyGoalSummary: { completed: 0, total: 2 },
};

export const goalTypeConfig = {
  daily: { label: "Daily", color: "text-info" as const },
  weekly: { label: "Weekly", color: "text-warning" as const },
  monthly: { label: "Monthly", color: "text-ai" as const },
};

export const goalStatusConfig = {
  pending: { label: "Pending", variant: "neutral" as const },
  "in-progress": { label: "In Progress", variant: "warning" as const },
  completed: { label: "Done", variant: "success" as const },
  skipped: { label: "Skipped", variant: "neutral" as const },
};

export const milestoneStatusConfig = {
  locked: { label: "Locked", variant: "neutral" as const, icon: "Lock" },
  available: { label: "Available", variant: "info" as const, icon: "Circle" },
  "in-progress": { label: "In Progress", variant: "warning" as const, icon: "Loader2" },
  completed: { label: "Completed", variant: "success" as const, icon: "CheckCircle2" },
};

export const roadmapPhaseConfig = {
  beginner: { label: "Beginner", color: "text-success" as const },
  "application-ready": { label: "Application Ready", color: "text-info" as const },
  "interview-ready": { label: "Interview Ready", color: "text-ai" as const },
  "first-job": { label: "First Job", color: "text-warning" as const },
  growth: { label: "Growth", color: "text-primary" as const },
};

export const skillCategoryConfig = {
  technical: { label: "Technical", color: "text-ai" as const, bg: "bg-ai/10" },
  soft: { label: "Soft Skills", color: "text-success" as const, bg: "bg-success/10" },
  language: { label: "Languages", color: "text-info" as const, bg: "bg-info/10" },
  tool: { label: "Tools", color: "text-warning" as const, bg: "bg-warning/10" },
};

export const skillLevelConfig = {
  none: { label: "None", progress: 0 },
  beginner: { label: "Beginner", progress: 25 },
  intermediate: { label: "Intermediate", progress: 50 },
  advanced: { label: "Advanced", progress: 75 },
  expert: { label: "Expert", progress: 100 },
};

export const learningTypeConfig = {
  course: { label: "Course", icon: "BookOpen", color: "text-ai" as const, bg: "bg-ai/10" },
  lab: { label: "Lab", icon: "FlaskConical", color: "text-success" as const, bg: "bg-success/10" },
  certificate: { label: "Certificate", icon: "Award", color: "text-warning" as const, bg: "bg-warning/10" },
  practice: { label: "Practice", icon: "Dumbbell", color: "text-info" as const, bg: "bg-info/10" },
};

export const learningStatusConfig = {
  "not-started": { label: "Not Started", variant: "neutral" as const },
  "in-progress": { label: "In Progress", variant: "warning" as const },
  completed: { label: "Completed", variant: "success" as const },
};

export const badgeTierConfig = {
  bronze: { label: "Bronze", color: "text-warning" as const, bg: "bg-warning/10" },
  silver: { label: "Silver", color: "text-secondary" as const, bg: "bg-secondary/10" },
  gold: { label: "Gold", color: "text-ai" as const, bg: "bg-ai/10" },
  platinum: { label: "Platinum", color: "text-success" as const, bg: "bg-success/10" },
};

export const recommendationTypeConfig = {
  "next-best-action": { label: "Next Best Action", color: "text-success" as const, icon: "Target" },
  "skill-gap": { label: "Skill Gap", color: "text-danger" as const, icon: "Zap" },
  learning: { label: "Learning", color: "text-info" as const, icon: "BookOpen" },
  "job-readiness": { label: "Job Readiness", color: "text-ai" as const, icon: "Briefcase" },
  "cv-improvement": { label: "CV Improvement", color: "text-cv" as const, icon: "FileText" },
};

export const timelineTypeConfig = {
  milestone: { label: "Milestone", color: "text-ai" as const, icon: "Flag" },
  goal: { label: "Goal", color: "text-success" as const, icon: "Target" },
  skill: { label: "Skill", color: "text-warning" as const, icon: "Zap" },
  learning: { label: "Learning", color: "text-info" as const, icon: "BookOpen" },
  achievement: { label: "Achievement", color: "text-primary" as const, icon: "Award" },
};

export function getScoreColor(score: number): string {
  if (score >= 80) return "text-success";
  if (score >= 60) return "text-ai";
  if (score >= 40) return "text-warning";
  return "text-danger";
}

export function getScoreRingColor(score: number): string {
  if (score >= 80) return "stroke-success";
  if (score >= 60) return "stroke-ai";
  if (score >= 40) return "stroke-warning";
  return "stroke-danger";
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Strong";
  if (score >= 40) return "Developing";
  return "Needs Work";
}

export { type CareerProgressData, type CareerRecommendation, type NextBestAction };
