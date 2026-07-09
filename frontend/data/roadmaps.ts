import type {
  AICareerPath,
  AIRoadmapData,
  AIRoadmapDayPlan,
  AIRoadmapLearningPath,
  AIRoadmapMonthlyGoal,
  AIRoadmapPhase,
  AIRoadmapRecommendation,
  AIRoadmapWeekPlan,
} from "@/types/roadmap";

const today = new Date();

function addMonths(date: Date, months: number): string {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export const demoCareerPaths: AICareerPath[] = [
  {
    id: "cp-ai-engineer",
    title: "Senior AI Engineer",
    description: "Master machine learning, MLOps, and system design for senior AI engineering roles.",
    targetRole: "Senior AI Engineer",
    estimatedMonths: 9,
    totalHours: 320,
    difficulty: "advanced",
  },
  {
    id: "cp-frontend-lead",
    title: "Frontend Lead",
    description: "Advance from senior frontend engineer to technical lead with architecture and mentorship skills.",
    targetRole: "Frontend Engineering Lead",
    estimatedMonths: 6,
    totalHours: 220,
    difficulty: "intermediate",
  },
  {
    id: "cp-devops-architect",
    title: "DevOps Architect",
    description: "Build expertise in cloud infrastructure, platform engineering, and SRE practices.",
    targetRole: "DevOps Architect",
    estimatedMonths: 8,
    totalHours: 280,
    difficulty: "advanced",
  },
  {
    id: "cp-security-engineer",
    title: "Security Engineer",
    description: "Transition into application security with hands-on offensive and defensive skills.",
    targetRole: "Security Engineer",
    estimatedMonths: 10,
    totalHours: 350,
    difficulty: "intermediate",
  },
];

const demoPhases: AIRoadmapPhase[] = [
  {
    id: "phase-1",
    title: "Foundation",
    description: "Strengthen core computer science, programming, and math fundamentals required for the role.",
    status: "completed",
    order: 1,
    estimatedWeeks: 6,
    skills: ["Python", "Linear Algebra", "Statistics", "Data Structures"],
    milestones: ["Complete Python refresher", "Pass algorithms assessment"],
  },
  {
    id: "phase-2",
    title: "Machine Learning Core",
    description: "Master supervised and unsupervised learning, model evaluation, and feature engineering.",
    status: "completed",
    order: 2,
    estimatedWeeks: 8,
    skills: ["Scikit-Learn", "Model Evaluation", "Feature Engineering", "Pandas"],
    milestones: ["Build end-to-end classification project", "Complete ML specialization"],
  },
  {
    id: "phase-3",
    title: "Deep Learning & AI Systems",
    description: "Dive into neural networks, transformers, and production AI system design.",
    status: "in-progress",
    order: 3,
    estimatedWeeks: 10,
    skills: ["PyTorch", "Transformers", "LLMs", "System Design"],
    milestones: ["Fine-tune a transformer model", "Design AI API architecture"],
  },
  {
    id: "phase-4",
    title: "MLOps & Production",
    description: "Deploy, monitor, and scale ML models with CI/CD, observability, and governance.",
    status: "available",
    order: 4,
    estimatedWeeks: 8,
    skills: ["Docker", "Kubernetes", "CI/CD", "Model Monitoring"],
    milestones: ["Deploy model to production", "Set up monitoring dashboard"],
  },
  {
    id: "phase-5",
    title: "Leadership & Specialization",
    description: "Develop cross-functional communication, mentorship, and domain expertise.",
    status: "locked",
    order: 5,
    estimatedWeeks: 6,
    skills: ["Communication", "Mentoring", "Strategy", "Stakeholder Management"],
    milestones: ["Lead a technical design review", "Mentor a junior engineer"],
  },
];

const demoLearningPath: AIRoadmapLearningPath[] = [
  {
    id: "lp-1",
    title: "Machine Learning Specialization",
    description: "Foundational ML algorithms and practical applications.",
    category: "ai",
    difficulty: "intermediate",
    progress: 100,
    estimatedHours: 80,
    status: "completed",
    skills: ["ML Algorithms", "Model Evaluation", "Pandas"],
    href: "/dashboard/learning",
  },
  {
    id: "lp-2",
    title: "Deep Learning with PyTorch",
    description: "Neural networks, CNNs, RNNs, and transformer architectures.",
    category: "ai",
    difficulty: "advanced",
    progress: 45,
    estimatedHours: 60,
    status: "in-progress",
    skills: ["PyTorch", "Neural Networks", "Transformers"],
    href: "/dashboard/learning",
  },
  {
    id: "lp-3",
    title: "MLOps on AWS",
    description: "Deploy and monitor ML models at scale.",
    category: "devops",
    difficulty: "advanced",
    progress: 0,
    estimatedHours: 50,
    status: "not-started",
    skills: ["Docker", "Kubernetes", "CI/CD"],
    href: "/dashboard/learning",
  },
  {
    id: "lp-4",
    title: "System Design for AI",
    description: "Design scalable AI systems and APIs.",
    category: "backend",
    difficulty: "advanced",
    progress: 0,
    estimatedHours: 40,
    status: "not-started",
    skills: ["System Design", "API Design", "Scalability"],
    href: "/dashboard/learning",
  },
  {
    id: "lp-5",
    title: "Technical Communication",
    description: "Present complex AI concepts to non-technical stakeholders.",
    category: "career",
    difficulty: "intermediate",
    progress: 20,
    estimatedHours: 20,
    status: "in-progress",
    skills: ["Communication", "Presentation", "Stakeholder Management"],
    href: "/dashboard/learning",
  },
];

const demoDailyTasks = [
  {
    id: "dt-1",
    title: "Watch transformer architecture lecture",
    description: "Module 3, Lesson 2: Attention mechanisms in depth.",
    completed: false,
    estimatedMinutes: 45,
    type: "course" as const,
    href: "/dashboard/learning",
  },
  {
    id: "dt-2",
    title: "Implement multi-head attention",
    description: "Build a minimal attention block from scratch in PyTorch.",
    completed: false,
    estimatedMinutes: 60,
    type: "practice" as const,
  },
  {
    id: "dt-3",
    title: "Review CV for AI roles",
    description: "Update projects section with latest ML experiments.",
    completed: true,
    estimatedMinutes: 20,
    type: "reading" as const,
    href: "/dashboard/cv-builder",
  },
  {
    id: "dt-4",
    title: "System design mock interview",
    description: "Practice designing a recommendation system.",
    completed: false,
    estimatedMinutes: 45,
    type: "assessment" as const,
    href: "/dashboard/interviews",
  },
];

const demoDailyPlan: AIRoadmapDayPlan = {
  date: today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  }),
  focus: "Transformers & Attention",
  tasks: demoDailyTasks,
};

const demoWeeklyTasks = [
  {
    id: "wt-1",
    title: "Complete transformer module",
    description: "Finish all lessons and quizzes for module 3.",
    completed: false,
    estimatedMinutes: 240,
    type: "course" as const,
    href: "/dashboard/learning",
  },
  {
    id: "wt-2",
    title: "Build sentiment classifier",
    description: "Fine-tune a pretrained model on a custom dataset.",
    completed: false,
    estimatedMinutes: 300,
    type: "project" as const,
  },
  {
    id: "wt-3",
    title: "Study system design case",
    description: "Read and annotate a production AI serving architecture.",
    completed: true,
    estimatedMinutes: 90,
    type: "reading" as const,
  },
  {
    id: "wt-4",
    title: "Practice coding interview",
    description: "Complete 3 medium difficulty algorithm problems.",
    completed: false,
    estimatedMinutes: 120,
    type: "practice" as const,
  },
];

const demoWeeklyPlan: AIRoadmapWeekPlan = {
  weekNumber: 14,
  label: "Week 14 of 38",
  focus: "Transformers and Fine-Tuning",
  tasks: demoWeeklyTasks,
  completedTasks: 1,
  totalTasks: demoWeeklyTasks.length,
};

const demoMonthlyGoals: AIRoadmapMonthlyGoal[] = [
  {
    id: "mg-1",
    month: addMonths(today, 0),
    title: "Complete Deep Learning module",
    description: "Finish the PyTorch deep learning course and pass the capstone.",
    progress: 45,
    completed: false,
    milestones: ["Finish CNN lessons", "Submit capstone project"],
  },
  {
    id: "mg-2",
    month: addMonths(today, 1),
    title: "Deploy first model",
    description: "Containerize and deploy a sentiment analysis model with a REST API.",
    progress: 10,
    completed: false,
    milestones: ["Build API", "Write Dockerfile", "Deploy to cloud"],
  },
  {
    id: "mg-3",
    month: addMonths(today, 2),
    title: "Finish MLOps fundamentals",
    description: "Set up CI/CD for model training and serving pipelines.",
    progress: 0,
    completed: false,
    milestones: ["CI/CD pipeline", "Model registry setup"],
  },
];

const demoRecommendations: AIRoadmapRecommendation[] = [
  {
    id: "rec-1",
    title: "Focus on transformer fine-tuning",
    description: "Your current phase depends on mastering attention and fine-tuning. Dedicate extra hours here this week.",
    impact: "+12% phase completion",
    priority: "high",
    actionLabel: "Continue Learning",
    actionHref: "/dashboard/learning",
  },
  {
    id: "rec-2",
    title: "Schedule a system design mock",
    description: "Senior AI Engineer interviews heavily test distributed system design for model serving.",
    impact: "+8% interview readiness",
    priority: "high",
    actionLabel: "Book Interview",
    actionHref: "/dashboard/interviews",
  },
  {
    id: "rec-3",
    title: "Update CV with latest project",
    description: "Add the sentiment classifier project to your CV once complete.",
    impact: "+5% CV readiness",
    priority: "medium",
    actionLabel: "Edit CV",
    actionHref: "/dashboard/cv-builder",
  },
  {
    id: "rec-4",
    title: "Explore AI Assistant guidance",
    description: "Ask the AI Career Coach for personalized weekly planning.",
    impact: "Personalized plan",
    priority: "low",
    actionLabel: "Open AI Coach",
    actionHref: "/dashboard/coach",
  },
];

export const demoAIRoadmapData: AIRoadmapData = {
  careerPath: demoCareerPaths[0]!,
  overallCompletion: 42,
  estimatedFinishDate: addMonths(today, 7),
  currentStage: "Deep Learning & AI Systems",
  learningHoursRemaining: 186,
  aiConfidence: 88,
  phases: demoPhases,
  learningPath: demoLearningPath,
  dailyPlan: demoDailyPlan,
  weeklyPlan: demoWeeklyPlan,
  monthlyGoals: demoMonthlyGoals,
  recommendations: demoRecommendations,
};

export const roadmapPhaseStatusConfig = {
  locked: { label: "Locked", variant: "neutral" as const, color: "text-tertiary" as const },
  available: { label: "Available", variant: "info" as const, color: "text-info" as const },
  "in-progress": { label: "In Progress", variant: "ai" as const, color: "text-ai" as const },
  completed: { label: "Completed", variant: "success" as const, color: "text-success" as const },
};

export const roadmapTaskTypeConfig = {
  course: { label: "Course", color: "text-ai" as const, bg: "bg-ai/10" as const, icon: "BookOpen" },
  practice: { label: "Practice", color: "text-info" as const, bg: "bg-info/10" as const, icon: "Dumbbell" },
  reading: { label: "Reading", color: "text-secondary" as const, bg: "bg-secondary/10" as const, icon: "BookOpen" },
  project: { label: "Project", color: "text-warning" as const, bg: "bg-warning/10" as const, icon: "FolderOpen" },
  assessment: { label: "Assessment", color: "text-danger" as const, bg: "bg-danger/10" as const, icon: "ClipboardCheck" },
};

export const roadmapLearningPathStatusConfig = {
  "not-started": { label: "Not Started", variant: "neutral" as const },
  "in-progress": { label: "In Progress", variant: "warning" as const },
  completed: { label: "Completed", variant: "success" as const },
};

export const roadmapDifficultyConfig = {
  beginner: { label: "Beginner", color: "text-success" as const },
  intermediate: { label: "Intermediate", color: "text-info" as const },
  advanced: { label: "Advanced", color: "text-warning" as const },
  expert: { label: "Expert", color: "text-danger" as const },
};

export const roadmapRecommendationPriorityConfig = {
  high: { label: "High", variant: "danger" as const },
  medium: { label: "Medium", variant: "warning" as const },
  low: { label: "Low", variant: "neutral" as const },
};
