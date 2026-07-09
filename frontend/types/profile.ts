export type ProfileViewState = "loading" | "ready" | "error" | "empty";

export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export type LanguageLevel = "beginner" | "intermediate" | "advanced" | "native";

export type Availability = "immediately" | "2-weeks" | "1-month" | "3-months" | "not-searching";

export type WorkPreference = "remote" | "hybrid" | "on-site" | "flexible";

export type ContractType = "permanent" | "contract" | "freelance" | "internship" | "any";

export type CurrentLevel = "junior" | "mid" | "senior" | "lead" | "manager" | "executive" | "freelancer";

export type ToneType = "professional" | "creative" | "technical" | "executive" | "academic";

export interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
  endorsements?: number;
}

export interface Language {
  id: string;
  name: string;
  level: LanguageLevel;
  isNative?: boolean;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface ProfileDocument {
  id: string;
  name: string;
  type: string;
  lastUpdated: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  section: string;
  required: boolean;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
}

export interface CareerIdentity {
  targetRole: string;
  preferredIndustries: string[];
  currentLevel: CurrentLevel;
  availability: Availability;
  workPreference: WorkPreference;
  contractTypePreference: ContractType;
}

export interface ProfessionalSummary {
  bio: string;
  tone: ToneType;
}

export interface SkillsLanguages {
  technical: Skill[];
  soft: Skill[];
  languages: Language[];
}

export interface ExperienceSnapshot {
  recentRoles: Experience[];
  totalYears: number;
  projectsCount: number;
  certificationsCount: number;
}

export interface EducationCertifications {
  education: Education[];
  certifications: Certification[];
}

export interface ProfilePreferences {
  publicProfile: boolean;
  recruiterVisibility: boolean;
  dataSharing: boolean;
}

export interface ProfileData {
  personalInfo: PersonalInfo;
  careerIdentity: CareerIdentity;
  professionalSummary: ProfessionalSummary;
  skillsLanguages: SkillsLanguages;
  experienceSnapshot: ExperienceSnapshot;
  educationCertifications: EducationCertifications;
  documents: ProfileDocument[];
  preferences: ProfilePreferences;
  completionScore: number;
  completionChecklist: ChecklistItem[];
  lastUpdated: string;
}

export interface ProfileState {
  data: ProfileData | null;
  viewState: ProfileViewState;
  isEditing: boolean;
  isSaving: boolean;
  errorMessage: string | null;
}

export interface ProfileStore extends ProfileState {
  setViewState: (state: ProfileViewState) => void;
  setData: (data: ProfileData) => void;
  setEditing: (editing: boolean) => void;
  setSaving: (saving: boolean) => void;
  setErrorMessage: (message: string | null) => void;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateCareerIdentity: (identity: Partial<CareerIdentity>) => void;
  updateProfessionalSummary: (summary: Partial<ProfessionalSummary>) => void;
  updatePreferences: (prefs: Partial<ProfilePreferences>) => void;
  resetProfile: () => void;
}
