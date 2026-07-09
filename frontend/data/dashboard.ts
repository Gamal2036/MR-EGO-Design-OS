export interface DashboardMetrics {
  careerScore: number;
  cvReadiness: number;
  jobMatches: number;
  applications: number;
  interviews: number;
  profileCompletion: number;
}

export interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  confidence: number;
  category: string;
}

export interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: string;
  href: string;
}

export interface JobMatch {
  id: string;
  title: string;
  company: string;
  location: string;
  matchScore: number;
  category: string;
  salary: string;
  postedDate: string;
}

export interface ApplicationStage {
  stage: string;
  count: number;
  label: string;
}

export interface ActivityItem {
  id: string;
  type: "ai" | "cv" | "job" | "application" | "suggestion";
  title: string;
  description: string;
  timestamp: string;
}

export interface InsightItem {
  id: string;
  type: "missing" | "skill-gap" | "suggestion" | "opportunity";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

export const demoMetrics: DashboardMetrics = {
  careerScore: 78,
  cvReadiness: 72,
  jobMatches: 14,
  applications: 5,
  interviews: 2,
  profileCompletion: 65,
};

export const demoAIRecommendation: AIRecommendation = {
  id: "rec-1",
  title: "Update your CV for Senior AI Engineer roles",
  description:
    "Based on your profile and current market trends, updating your CV to highlight recent AI/ML projects could increase your match rate by 35%. Your current CV emphasises backend work, but your recent experience aligns more with AI engineering roles.",
  actionLabel: "Improve CV with AI",
  confidence: 0.92,
  category: "cv",
};

export const demoQuickActions: QuickAction[] = [
  {
    id: "qa-1",
    label: "Upload CV",
    description: "Upload a new version of your CV",
    icon: "Upload",
    href: "/cv/list",
  },
  {
    id: "qa-2",
    label: "Find Jobs",
    description: "Search for matching job opportunities",
    icon: "Search",
    href: "/dashboard/jobs",
  },
  {
    id: "qa-3",
    label: "Improve CV",
    description: "Get AI-powered CV improvement suggestions",
    icon: "FileText",
    href: "/cv/analysis",
  },
  {
    id: "qa-4",
    label: "AI Coach",
    description: "Chat with your AI career coach",
    icon: "Brain",
    href: "/dashboard/coach",
  },
  {
    id: "qa-5",
    label: "Track Applications",
    description: "Monitor your job application progress",
    icon: "Briefcase",
    href: "/dashboard/jobs",
  },
  {
    id: "qa-6",
    label: "Documents Center",
    description: "Manage all your career documents",
    icon: "FolderOpen",
    href: "/dashboard/documents",
  },
  {
    id: "qa-7",
    label: "Career Progress",
    description: "Track your growth and next best actions",
    icon: "Route",
    href: "/dashboard/career-progress",
  },
  {
    id: "qa-8",
    label: "Analytics",
    description: "View career performance insights",
    icon: "BarChart3",
    href: "/dashboard/analytics",
  },
  {
    id: "qa-9",
    label: "Tasks",
    description: "Manage your tasks and to-do list",
    icon: "CheckSquare",
    href: "/dashboard/tasks",
  },
  {
    id: "qa-10",
    label: "Calendar",
    description: "View your schedule and events",
    icon: "Calendar",
    href: "/dashboard/calendar",
  },
  {
    id: "qa-11",
    label: "Skill Assessment",
    description: "Assess your skills and identify gaps",
    icon: "Activity",
    href: "/dashboard/skills",
  },
];

export const demoJobMatches: JobMatch[] = [
  {
    id: "job-1",
    title: "Senior AI Engineer",
    company: "Nexus Technologies",
    location: "San Francisco, CA (Remote)",
    matchScore: 94,
    category: "Artificial Intelligence",
    salary: "$180k - $220k",
    postedDate: "2 days ago",
  },
  {
    id: "job-2",
    title: "Machine Learning Lead",
    company: "Quantum Dynamics",
    location: "New York, NY (Hybrid)",
    matchScore: 87,
    category: "Machine Learning",
    salary: "$195k - $240k",
    postedDate: "1 week ago",
  },
  {
    id: "job-3",
    title: "AI Solutions Architect",
    company: "CloudCore Systems",
    location: "Austin, TX (Remote)",
    matchScore: 82,
    category: "Architecture",
    salary: "$170k - $210k",
    postedDate: "3 days ago",
  },
  {
    id: "job-4",
    title: "NLP Research Engineer",
    company: "Lingua AI",
    location: "Boston, MA (On-site)",
    matchScore: 76,
    category: "Natural Language Processing",
    salary: "$160k - $200k",
    postedDate: "5 days ago",
  },
  {
    id: "job-5",
    title: "Computer Vision Engineer",
    company: "Visionary Labs",
    location: "Seattle, WA (Remote)",
    matchScore: 71,
    category: "Computer Vision",
    salary: "$155k - $195k",
    postedDate: "1 day ago",
  },
];

export const demoApplicationPipeline: ApplicationStage[] = [
  { stage: "prepared", count: 3, label: "Prepared" },
  { stage: "sent", count: 5, label: "Sent" },
  { stage: "waiting", count: 4, label: "Waiting" },
  { stage: "interview", count: 2, label: "Interview" },
  { stage: "accepted", count: 0, label: "Accepted" },
  { stage: "rejected", count: 1, label: "Rejected" },
];

export const demoActivity: ActivityItem[] = [
  {
    id: "act-1",
    type: "ai",
    title: "AI suggested CV improvements",
    description: "Added 3 new skill recommendations based on target roles",
    timestamp: "2 hours ago",
  },
  {
    id: "act-2",
    type: "job",
    title: "Saved job: Senior AI Engineer",
    description: "Nexus Technologies - 94% match score",
    timestamp: "5 hours ago",
  },
  {
    id: "act-3",
    type: "application",
    title: "Application status updated",
    description: "Machine Learning Lead at Quantum Dynamics moved to Interview",
    timestamp: "1 day ago",
  },
  {
    id: "act-4",
    type: "cv",
    title: "CV version 3.2 uploaded",
    description: "Updated experience section with recent AI project",
    timestamp: "2 days ago",
  },
  {
    id: "act-5",
    type: "ai",
    title: "Career path analysis completed",
    description: "AI identified 3 new career growth opportunities",
    timestamp: "3 days ago",
  },
  {
    id: "act-6",
    type: "suggestion",
    title: "Profile strength increased",
    description: "Added certification details improved profile to 65%",
    timestamp: "4 days ago",
  },
];

export const demoInsights: InsightItem[] = [
  {
    id: "ins-1",
    type: "missing",
    title: "Missing LinkedIn profile link",
    description: "Adding your LinkedIn profile can increase recruiter discovery by 40%",
    priority: "high",
  },
  {
    id: "ins-2",
    type: "skill-gap",
    title: "Skill gap: Kubernetes",
    description: "85% of your target roles require Kubernetes experience",
    priority: "high",
  },
  {
    id: "ins-3",
    type: "missing",
    title: "Missing portfolio URL",
    description: "Showcase your best work with a portfolio link",
    priority: "medium",
  },
  {
    id: "ins-4",
    type: "suggestion",
    title: "Complete AI/ML certification",
    description: "Relevant certifications can boost your profile strength by 15%",
    priority: "medium",
  },
  {
    id: "ins-5",
    type: "opportunity",
    title: "Growing demand for AI Engineers",
    description: "AI Engineer roles have grown 47% in your area this quarter",
    priority: "low",
  },
];
