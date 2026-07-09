import type {
  CVAnalysisData,
  OverallScore,
  ATSAnalysis,
  SkillGap,
  ExperienceAnalysis,
  EducationAnalysis,
  KeywordAnalysis,
  Strength,
  Weakness,
  Recommendation,
  CareerSuggestion,
  ImprovementItem,
  TimelineEvent,
  MissingSkill,
  MarketReadiness,
} from "@/types/cv-analysis";

export const demoOverallScore: OverallScore = {
  overall: 72,
  ats: 65,
  readability: 78,
  skills: 70,
  experience: 80,
  education: 85,
  projects: 55,
  languages: 60,
  keywords: 58,
};

export const demoATS: ATSAnalysis = {
  score: 65,
  compatibility: "Moderate",
  keywordMatch: 58,
  formattingScore: 72,
  sectionCompleteness: 80,
  bulletOptimization: 60,
  missingKeywords: [
    "Kubernetes",
    "Terraform",
    "CI/CD Pipeline",
    "Microservices",
    "Docker",
    "GraphQL",
  ],
  matchedKeywords: [
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "PostgreSQL",
    "REST API",
    "AWS",
    "Git",
    "Agile",
    "JavaScript",
  ],
  suggestions: [
    "Add a professional summary section at the top",
    "Include quantifiable achievements in bullet points",
    "Optimize keyword density for ATS parsing",
    "Use standard section headings for better parsing",
    "Remove tables and complex formatting",
  ],
};

export const demoSkillGaps: SkillGap[] = [
  { skill: "Kubernetes", category: "DevOps", demandLevel: "high", currentLevel: "none", priority: "high" },
  { skill: "Docker", category: "DevOps", demandLevel: "high", currentLevel: "beginner", priority: "high" },
  { skill: "Machine Learning", category: "AI/ML", demandLevel: "high", currentLevel: "beginner", priority: "high" },
  { skill: "GraphQL", category: "API", demandLevel: "medium", currentLevel: "none", priority: "medium" },
  { skill: "Terraform", category: "DevOps", demandLevel: "medium", currentLevel: "none", priority: "medium" },
  { skill: "Redis", category: "Database", demandLevel: "medium", currentLevel: "intermediate", priority: "low" },
  { skill: "System Design", category: "Architecture", demandLevel: "high", currentLevel: "intermediate", priority: "medium" },
  { skill: "CI/CD", category: "DevOps", demandLevel: "high", currentLevel: "intermediate", priority: "medium" },
];

export const demoExperience: ExperienceAnalysis = {
  score: 80,
  totalYears: 6,
  relevanceScore: 75,
  achievementCount: 12,
  bulletQuality: 65,
  gaps: [
    "No achievements with measurable metrics",
    "Career progression not clearly articulated",
    "Gap between 2022-2023 not explained",
  ],
  suggestions: [
    "Add quantifiable results to each role",
    "Highlight leadership and mentoring experience",
    "Include relevant side projects and open source",
    "Add a brief explanation for career transitions",
  ],
};

export const demoEducation: EducationAnalysis = {
  score: 85,
  highestDegree: "Bachelor of Science in Computer Science",
  fieldRelevance: 90,
  suggestions: [
    "Consider adding relevant coursework",
    "Include GPA if above 3.5",
    "Add certifications below education section",
  ],
};

export const demoKeywords: KeywordAnalysis = {
  matched: [
    "React", "TypeScript", "Node.js", "Python", "PostgreSQL",
    "REST API", "AWS", "Git", "Agile", "JavaScript",
    "HTML", "CSS", "Redux", "Jest", "Next.js",
  ],
  missing: [
    "Kubernetes", "Terraform", "CI/CD", "Microservices",
    "Docker", "GraphQL", "Machine Learning", "System Design",
    "Leadership", "Mentoring",
  ],
  industryKeywords: [
    "AI/ML", "Cloud Native", "Microservices", "DevOps",
    "Agile", "Full Stack", "System Design", "API Design",
  ],
  suggestedKeywords: [
    "Kubernetes", "Docker", "Machine Learning", "GraphQL",
    "CI/CD Pipeline", "Microservices Architecture",
    "System Design", "Cloud Infrastructure",
  ],
};

export const demoStrengths: Strength[] = [
  { id: "str-1", category: "Technical", title: "Strong Frontend Foundation", description: "Deep expertise in React, TypeScript, and modern frontend architecture", icon: "Code2" },
  { id: "str-2", category: "Technical", title: "Full-Stack Capabilities", description: "Proven ability to work across the entire stack from database to UI", icon: "Layers" },
  { id: "str-3", category: "Experience", title: "Progressive Career Growth", description: "Clear trajectory from junior to senior roles over 6 years", icon: "TrendingUp" },
  { id: "str-4", category: "Education", title: "Strong Academic Background", description: "CS degree with high field relevance to target roles", icon: "GraduationCap" },
  { id: "str-5", category: "Skills", title: "Modern Tech Stack", description: "Experience with current industry-standard technologies", icon: "Zap" },
];

export const demoWeaknesses: Weakness[] = [
  { id: "wk-1", category: "DevOps", title: "Missing Cloud Native Skills", description: "No Kubernetes or Docker experience listed", severity: "high" },
  { id: "wk-2", category: "AI/ML", title: "No AI/ML Exposure", description: "Target roles require AI/ML familiarity", severity: "high" },
  { id: "wk-3", category: "Formatting", title: "Weak Achievement Metrics", description: "Only 30% of bullet points include measurable results", severity: "medium" },
  { id: "wk-4", category: "Content", title: "Missing Professional Summary", description: "No executive summary at the top of CV", severity: "medium" },
  { id: "wk-5", category: "Keywords", title: "Low ATS Keyword Density", description: "Missing key industry keywords for ATS parsing", severity: "high" },
  { id: "wk-6", category: "Structure", title: "Inconsistent Bullet Formatting", description: "Mixed use of tenses and inconsistent formatting", severity: "low" },
];

export const demoRecommendations: Recommendation[] = [
  { id: "rec-1", priority: "high", category: "DevOps", title: "Learn Kubernetes & Docker", description: "85% of target roles require containerization skills", impact: "high", effort: "hard" },
  { id: "rec-2", priority: "high", category: "AI/ML", title: "Complete Machine Learning Fundamentals", description: "AI/ML skills can increase match rate by 40%", impact: "high", effort: "medium" },
  { id: "rec-3", priority: "high", category: "Content", title: "Add Professional Summary", description: "Summarize your career in 3-4 impactful sentences", impact: "high", effort: "easy" },
  { id: "rec-4", priority: "medium", category: "Formatting", title: "Quantify Achievements", description: "Add metrics to 80%+ of bullet points", impact: "high", effort: "medium" },
  { id: "rec-5", priority: "medium", category: "Keywords", title: "Optimize ATS Keywords", description: "Add missing industry keywords strategically", impact: "medium", effort: "easy" },
  { id: "rec-6", priority: "medium", category: "Content", title: "Add Side Projects", description: "Showcase relevant personal projects", impact: "medium", effort: "medium" },
  { id: "rec-7", priority: "low", category: "Certification", title: "Get AWS Certified", description: "AWS certification boosts credibility by 25%", impact: "medium", effort: "hard" },
  { id: "rec-8", priority: "low", category: "Networking", title: "Build Portfolio Website", description: "Online portfolio increases recruiter engagement", impact: "low", effort: "easy" },
];

export const demoCareerSuggestions: CareerSuggestion[] = [
  { id: "cs-1", title: "Senior Full Stack Engineer", description: "Your profile aligns well with senior full stack roles at tech companies", relevance: 92, type: "role" },
  { id: "cs-2", title: "Cloud Solutions Architect", description: "With DevOps skills, you could transition to solutions architecture", relevance: 68, type: "role" },
  { id: "cs-3", title: "AWS Certified Solutions Architect", description: "Industry-recognized cloud certification", relevance: 85, type: "certification" },
  { id: "cs-4", title: "Machine Learning Specialization", description: "Stanford/DeepLearning.AI certification on Coursera", relevance: 78, type: "certification" },
  { id: "cs-5", title: "Transition to AI Engineering", description: "Your full-stack background is a strong foundation for AI engineering", relevance: 72, type: "industry" },
];

export const demoImprovements: ImprovementItem[] = [
  { id: "imp-1", title: "Add Professional Summary", description: "Write a compelling executive summary", category: "content", completed: false, priority: "high" },
  { id: "imp-2", title: "Quantify Work Achievements", description: "Add metrics to bullet points", category: "formatting", completed: false, priority: "high" },
  { id: "imp-3", title: "Add Kubernetes Skills", description: "Complete a Kubernetes course", category: "skills", completed: false, priority: "high" },
  { id: "imp-4", title: "Optimize ATS Keywords", description: "Add missing industry keywords", category: "keywords", completed: false, priority: "medium" },
  { id: "imp-5", title: "Add Side Projects Section", description: "Showcase GitHub projects", category: "content", completed: true, priority: "medium" },
  { id: "imp-6", title: "Standardize Bullet Formatting", description: "Use consistent tense and format", category: "formatting", completed: false, priority: "low" },
  { id: "imp-7", title: "Add Docker Proficiency", description: "Document Docker experience", category: "skills", completed: false, priority: "high" },
  { id: "imp-8", title: "Include Certifications", description: "Add relevant certifications", category: "content", completed: true, priority: "medium" },
];

export const demoTimeline: TimelineEvent[] = [
  { id: "tl-1", title: "Add Professional Summary", description: "Write and optimize executive summary", date: "Week 1", type: "improvement", completed: false },
  { id: "tl-2", title: "ATS Keyword Optimization", description: "Add missing keywords to experience section", date: "Week 1", type: "improvement", completed: false },
  { id: "tl-3", title: "Quantify All Achievements", description: "Add metrics to every bullet point", date: "Week 2", type: "improvement", completed: false },
  { id: "tl-4", title: "Docker Fundamentals Course", description: "Complete Docker certification", date: "Week 2", type: "milestone", completed: false },
  { id: "tl-5", title: "Kubernetes Basics", description: "Complete K8s introductory course", date: "Week 3", type: "improvement", completed: false },
  { id: "tl-6", title: "Machine Learning Foundamentals", description: "Start Stanford ML course", date: "Week 4", type: "milestone", completed: false },
  { id: "tl-7", title: "Review & Final Polish", description: "Final review and formatting pass", date: "Week 4", type: "suggestion", completed: false },
];

export const demoMissingSkills: MissingSkill[] = [
  { name: "Kubernetes", category: "DevOps", demandLevel: "high", relevanceToTarget: 85 },
  { name: "Docker", category: "DevOps", demandLevel: "high", relevanceToTarget: 82 },
  { name: "Terraform", category: "DevOps", demandLevel: "medium", relevanceToTarget: 65 },
  { name: "Machine Learning", category: "AI/ML", demandLevel: "high", relevanceToTarget: 78 },
  { name: "GraphQL", category: "API", demandLevel: "medium", relevanceToTarget: 60 },
  { name: "CI/CD Pipeline", category: "DevOps", demandLevel: "high", relevanceToTarget: 75 },
  { name: "Microservices Architecture", category: "Architecture", demandLevel: "medium", relevanceToTarget: 70 },
  { name: "System Design", category: "Architecture", demandLevel: "high", relevanceToTarget: 80 },
];

export const demoMarketReadiness: MarketReadiness = {
  level: "medium",
  score: 68,
  industryDemand: 82,
  roleFit: 71,
  salaryAlignment: 65,
  locationFit: 55,
};

export const demoTargetRoles: string[] = [
  "Senior Full Stack Engineer",
  "Lead Frontend Engineer",
  "Software Architect",
  "AI Engineering Specialist",
];

export const demoCertifications: string[] = [
  "AWS Certified Developer - Associate",
  "Google Professional Cloud Developer",
  "Meta Front-End Developer (Coursera)",
];

export const demoAnalysisData: CVAnalysisData = {
  overallScore: demoOverallScore,
  status: "average",
  riskLevel: "medium",
  marketReadiness: demoMarketReadiness,
  ats: demoATS,
  skillGaps: demoSkillGaps,
  experience: demoExperience,
  education: demoEducation,
  keywords: demoKeywords,
  strengths: demoStrengths,
  weaknesses: demoWeaknesses,
  recommendations: demoRecommendations,
  careerSuggestions: demoCareerSuggestions,
  improvements: demoImprovements,
  timeline: demoTimeline,
  missingSkills: demoMissingSkills,
  certifications: demoCertifications,
  targetRoles: demoTargetRoles,
  industryMatch: "Software Engineering / Full Stack Development",
  jobReadiness: 72,
  interviewReadiness: 65,
  careerLevel: "Senior (5-8 years)",
};

export const analysisStatusConfig = {
  excellent: { label: "Excellent", color: "text-success", bg: "bg-success/10", border: "border-success/30", ring: "stroke-success", score: 90 },
  good: { label: "Good", color: "text-ai", bg: "bg-ai/10", border: "border-ai/30", ring: "stroke-ai", score: 75 },
  average: { label: "Average", color: "text-warning", bg: "bg-warning/10", border: "border-warning/30", ring: "stroke-warning", score: 60 },
  "needs-improvement": { label: "Needs Improvement", color: "text-danger", bg: "bg-danger/10", border: "border-danger/30", ring: "stroke-danger", score: 40 },
  critical: { label: "Critical", color: "text-danger", bg: "bg-danger/20", border: "border-danger/50", ring: "stroke-danger", score: 20 },
} as const;

export const severityConfig = {
  high: { label: "High", variant: "danger" as const, color: "text-danger", bg: "bg-danger/10" },
  medium: { label: "Medium", variant: "warning" as const, color: "text-warning", bg: "bg-warning/10" },
  low: { label: "Low", variant: "info" as const, color: "text-info", bg: "bg-info/10" },
} as const;

export const riskConfig = {
  low: { label: "Low Risk", color: "text-success", bg: "bg-success/10", icon: "ShieldCheck" },
  medium: { label: "Medium Risk", color: "text-warning", bg: "bg-warning/10", icon: "AlertTriangle" },
  high: { label: "High Risk", color: "text-danger", bg: "bg-danger/10", icon: "AlertOctagon" },
} as const;
