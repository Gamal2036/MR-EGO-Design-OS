export type AnalysisState = "loading" | "ready" | "error";
export type AnalysisStatus =
  | "excellent"
  | "good"
  | "average"
  | "needs-improvement"
  | "critical";

export type SeverityLevel = "high" | "medium" | "low";

export type AnalysisSection =
  | "overview"
  | "ats"
  | "skills"
  | "experience"
  | "education"
  | "projects"
  | "languages"
  | "keywords"
  | "recommendations"
  | "history";

export interface OverallScore {
  overall: number;
  ats: number;
  readability: number;
  skills: number;
  experience: number;
  education: number;
  projects: number;
  languages: number;
  keywords: number;
}

export interface ATSAnalysis {
  score: number;
  compatibility: string;
  keywordMatch: number;
  formattingScore: number;
  sectionCompleteness: number;
  bulletOptimization: number;
  missingKeywords: string[];
  matchedKeywords: string[];
  suggestions: string[];
}

export interface SkillGap {
  skill: string;
  category: string;
  demandLevel: "high" | "medium" | "low";
  currentLevel: "expert" | "advanced" | "intermediate" | "beginner" | "none";
  priority: SeverityLevel;
}

export interface ExperienceAnalysis {
  score: number;
  totalYears: number;
  relevanceScore: number;
  achievementCount: number;
  bulletQuality: number;
  gaps: string[];
  suggestions: string[];
}

export interface EducationAnalysis {
  score: number;
  highestDegree: string;
  fieldRelevance: number;
  suggestions: string[];
}

export interface KeywordAnalysis {
  matched: string[];
  missing: string[];
  industryKeywords: string[];
  suggestedKeywords: string[];
}

export interface Strength {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: string;
}

export interface Weakness {
  id: string;
  category: string;
  title: string;
  description: string;
  severity: SeverityLevel;
}

export interface Recommendation {
  id: string;
  priority: SeverityLevel;
  category: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  effort: "easy" | "medium" | "hard";
}

export interface CareerSuggestion {
  id: string;
  title: string;
  description: string;
  relevance: number;
  type: "role" | "certification" | "skill" | "industry";
}

export interface ImprovementItem {
  id: string;
  title: string;
  description: string;
  category: string;
  completed: boolean;
  priority: SeverityLevel;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "improvement" | "milestone" | "suggestion";
  completed: boolean;
}

export interface MissingSkill {
  name: string;
  category: string;
  demandLevel: "high" | "medium" | "low";
  relevanceToTarget: number;
}

export interface MarketReadiness {
  level: "low" | "medium" | "high" | "very-high";
  score: number;
  industryDemand: number;
  roleFit: number;
  salaryAlignment: number;
  locationFit: number;
}

export interface CVAnalysisData {
  overallScore: OverallScore;
  status: AnalysisStatus;
  riskLevel: "low" | "medium" | "high";
  marketReadiness: MarketReadiness;
  ats: ATSAnalysis;
  skillGaps: SkillGap[];
  experience: ExperienceAnalysis;
  education: EducationAnalysis;
  keywords: KeywordAnalysis;
  strengths: Strength[];
  weaknesses: Weakness[];
  recommendations: Recommendation[];
  careerSuggestions: CareerSuggestion[];
  improvements: ImprovementItem[];
  timeline: TimelineEvent[];
  missingSkills: MissingSkill[];
  certifications: string[];
  targetRoles: string[];
  industryMatch: string;
  jobReadiness: number;
  interviewReadiness: number;
  careerLevel: string;
}

export interface CVAnalysisState {
  analysisData: CVAnalysisData | null;
  activeSection: AnalysisSection;
  isAnalyzing: boolean;
  lastAnalyzed: string | null;
}
