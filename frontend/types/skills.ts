export type SkillCategoryType =
  | "networking"
  | "linux"
  | "windows"
  | "python"
  | "cybersecurity"
  | "cloud"
  | "docker"
  | "virtualization"
  | "git"
  | "communication"
  | "problem-solving"
  | "english"
  | "french";

export type SkillLevel = "none" | "beginner" | "intermediate" | "advanced" | "expert";

export type Priority = "high" | "medium" | "low";

export type SkillStatus = "completed" | "in-progress" | "not-started";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategoryType;
  icon: string;
  currentLevel: SkillLevel;
  currentValue: number;
  targetLevel: SkillLevel;
  targetValue: number;
  progress: number;
  confidence: number;
  priority: Priority;
  status: SkillStatus;
  description: string;
}

export interface LearningRecommendation {
  id: string;
  skillId: string;
  course: string;
  practiceLab: string;
  miniProject: string;
  estimatedHours: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  aiReason: string;
}

export interface CareerMapping {
  id: string;
  role: string;
  ready: boolean;
  confidence: number;
  missingSkills: string[];
  estimatedLearningTime: string;
  description: string;
}

export interface SkillTimelineEntry {
  month: string;
  value: number;
  skills: string[];
}

export interface AssessmentSummary {
  strongestSkill: string;
  strongestValue: number;
  weakestSkill: string;
  weakestValue: number;
  fastestGrowing: string;
  fastestGrowth: number;
  needsAttention: string;
  needsAttentionValue: number;
  recommendedFocus: string;
}

export interface CareerReadiness {
  currentRole: string;
  targetRole: string;
  readiness: number;
  nextMilestone: string;
  estimatedTime: string;
}

export interface SkillFilterState {
  category: SkillCategoryType | "all";
  difficulty: SkillLevel | "all";
  priority: Priority | "all";
  status: SkillStatus | "all";
  search: string;
}

export interface SkillStoreState {
  skills: Skill[];
  recommendations: LearningRecommendation[];
  careerMappings: CareerMapping[];
  timeline: SkillTimelineEntry[];
  summary: AssessmentSummary;
  careerReadiness: CareerReadiness;
  overallScore: number;
  filters: SkillFilterState;
  viewState: "loading" | "ready" | "error";

  setViewState: (state: "loading" | "ready" | "error") => void;
  setFilter: (filter: Partial<SkillFilterState>) => void;
  resetFilters: () => void;
  updateSkill: (id: string, updates: Partial<Skill>) => void;
  addSkill: (skill: Skill) => void;
  removeSkill: (id: string) => void;
  resetSkills: () => void;
  getFilteredSkills: () => Skill[];
  getSkillsByCategory: (category: SkillCategoryType) => Skill[];
  getCompletedSkills: () => Skill[];
  getInProgressSkills: () => Skill[];
  getCareerReadyRoles: () => CareerMapping[];
  getNotReadyRoles: () => CareerMapping[];
}
