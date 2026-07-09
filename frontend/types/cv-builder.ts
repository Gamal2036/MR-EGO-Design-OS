export type CVSectionId =
  | "personal-info"
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "languages"
  | "projects"
  | "certifications";

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  linkedIn: string;
  website: string;
  github: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  highlights: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  achievements: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  category: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: "native" | "fluent" | "advanced" | "intermediate" | "basic";
}

export interface Project {
  id: string;
  name: string;
  role: string;
  description: string;
  technologies: string[];
  url: string;
  startDate: string;
  endDate: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
  description: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  projects: Project[];
  certifications: Certification[];
}

export type CVAISuggestionType =
  | "improve-summary"
  | "rewrite-bullet"
  | "detect-skills"
  | "match-job"
  | "general";

export interface CVAISuggestion {
  id: string;
  type: CVAISuggestionType;
  title: string;
  description: string;
  section?: CVSectionId;
  confidence: number;
}

export interface CVTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
}

export interface CVBuilderState {
  cvData: CVData;
  activeSection: CVSectionId;
  previewVisible: boolean;
  aiPanelVisible: boolean;
  selectedTemplate: string;
  suggestions: CVAISuggestion[];
  isDirty: boolean;
  lastSaved: string | null;
}

export const INITIAL_CV_DATA: CVData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    title: "",
    linkedIn: "",
    website: "",
    github: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  languages: [],
  projects: [],
  certifications: [],
};

export const CV_TEMPLATES: CVTemplate[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean, contemporary design with accent headers",
    preview: "Modern",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional layout with serif-inspired spacing",
    preview: "Classic",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Minimalist design focused on content",
    preview: "Minimal",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Corporate-ready layout with structured sections",
    preview: "Professional",
  },
];

export const CV_SECTION_LABELS: Record<CVSectionId, string> = {
  "personal-info": "Personal Info",
  summary: "Professional Summary",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  languages: "Languages",
  projects: "Projects",
  certifications: "Certifications",
};

export const CV_SECTION_ICONS: Record<CVSectionId, string> = {
  "personal-info": "User",
  summary: "FileText",
  experience: "Briefcase",
  education: "GraduationCap",
  skills: "Wrench",
  languages: "Globe",
  projects: "FolderGit2",
  certifications: "Award",
};
