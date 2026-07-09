export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  locationType: "remote" | "hybrid" | "on-site";
  category: string;
  subcategory?: string;
  contractType: "full-time" | "part-time" | "contract" | "freelance" | "internship";
  experienceLevel: "entry" | "mid" | "senior" | "lead" | "executive";
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  salaryPeriod?: "yearly" | "monthly" | "hourly";
  salaryLabel?: string;
  postedDate: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  tags: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  matchScore: number;
  matchExplanation: string;
  matchingSkills: string[];
  missingSkills: string[];
  isSaved: boolean;
  isRecommended: boolean;
  applicationUrl?: string;
}

export type ViewMode = "list" | "grid";

export interface JobSearchFilter {
  query: string;
  company: string;
  location: string;
  locationTypes: string[];
  categories: string[];
  contractTypes: string[];
  experienceLevels: string[];
  salaryMin: number | null;
  salaryMax: number | null;
  languages: string[];
  matchScoreMin: number;
  matchScoreMax: number;
  savedOnly: boolean;
  datePosted: string;
}

export type SearchState =
  | "idle"
  | "searching"
  | "results"
  | "empty"
  | "no-results"
  | "error"
  | "offline";

export interface JobSearchStore {
  jobs: Job[];
  filteredJobs: Job[];
  selectedJob: Job | null;
  savedJobIds: string[];
  comparedJobIds: string[];
  searchQuery: string;
  filters: JobSearchFilter;
  viewMode: ViewMode;
  state: SearchState;
  errorMessage: string | null;
  showFilters: boolean;
  detailPanelOpen: boolean;
  savedJobsOpen: boolean;

  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<JobSearchFilter>) => void;
  resetFilters: () => void;
  setViewMode: (mode: ViewMode) => void;
  selectJob: (job: Job | null) => void;
  toggleSaveJob: (jobId: string) => void;
  toggleCompareJob: (jobId: string) => void;
  clearCompared: () => void;
  performSearch: () => void;
  setShowFilters: (show: boolean) => void;
  setDetailPanelOpen: (open: boolean) => void;
  setSavedJobsOpen: (open: boolean) => void;
  loadJobs: () => void;
}
