export type ApplicationStatus =
  | "draft"
  | "prepared"
  | "applied"
  | "viewed"
  | "interview"
  | "technical-test"
  | "offer"
  | "accepted"
  | "rejected"
  | "archived";

export type ApplicationPriority = "high" | "medium" | "low";

export interface ApplicationNote {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface TimelineEvent {
  id: string;
  type: "applied" | "viewed" | "interview" | "technical-test" | "offer" | "rejected" | "accepted" | "note" | "other";
  title: string;
  description?: string;
  date: string;
}

export interface TaskItem {
  id: string;
  text: string;
  completed: boolean;
  priority: ApplicationPriority;
  dueDate?: string;
}

export interface ApplicationDocument {
  id: string;
  name: string;
  type: "cv" | "cover-letter" | "portfolio" | "certification" | "other";
  uploadedAt: string;
}

export interface Application {
  id: string;
  company: string;
  companyLogo?: string;
  role: string;
  location: string;
  locationType: "remote" | "hybrid" | "on-site";
  status: ApplicationStatus;
  priority: ApplicationPriority;
  matchScore: number;
  salaryLabel?: string;
  appliedDate: string;
  lastUpdated: string;
  nextAction?: string;
  nextActionDate?: string;
  notes: ApplicationNote[];
  timeline: TimelineEvent[];
  tasks: TaskItem[];
  documents: ApplicationDocument[];
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  jobUrl?: string;
  aiRecommendation?: string;
  aiInsights?: string[];
}

export interface PipelineStage {
  status: ApplicationStatus;
  label: string;
  count: number;
  applications: Application[];
}

export type ApplicationViewMode = "pipeline" | "list";
export type ApplicationState = "loading" | "ready" | "error" | "empty";

export interface ApplicationFilters {
  status: ApplicationStatus[];
  priority: ApplicationPriority[];
  searchQuery: string;
  dateRange: "all" | "week" | "month" | "quarter";
  matchScoreMin: number;
}

export interface ApplicationTrackerStore {
  applications: Application[];
  filteredApplications: Application[];
  selectedApplication: Application | null;
  filters: ApplicationFilters;
  viewMode: ApplicationViewMode;
  state: ApplicationState;
  errorMessage: string | null;
  detailPanelOpen: boolean;

  selectApplication: (app: Application | null) => void;
  setFilters: (filters: Partial<ApplicationFilters>) => void;
  resetFilters: () => void;
  setViewMode: (mode: ApplicationViewMode) => void;
  updateStatus: (appId: string, status: ApplicationStatus) => void;
  addNote: (appId: string, content: string) => void;
  updateNote: (appId: string, noteId: string, content: string) => void;
  deleteNote: (appId: string, noteId: string) => void;
  toggleTask: (appId: string, taskId: string) => void;
  addTask: (appId: string, text: string, priority: ApplicationPriority, dueDate?: string) => void;
  deleteTask: (appId: string, taskId: string) => void;
  performFilter: () => void;
  loadApplications: () => void;
  setDetailPanelOpen: (open: boolean) => void;
}

export const APPLICATION_PRIORITY_CONFIG: Record<ApplicationPriority, { label: string; color: string }> = {
  high: { label: "High", color: "danger" },
  medium: { label: "Medium", color: "warning" },
  low: { label: "Low", color: "neutral" },
};

export const APPLICATION_STATUSES: { status: ApplicationStatus; label: string }[] = [
  { status: "draft", label: "Draft" },
  { status: "prepared", label: "Prepared" },
  { status: "applied", label: "Applied" },
  { status: "viewed", label: "Viewed" },
  { status: "interview", label: "Interview" },
  { status: "technical-test", label: "Technical Test" },
  { status: "offer", label: "Offer" },
  { status: "accepted", label: "Accepted" },
  { status: "rejected", label: "Rejected" },
  { status: "archived", label: "Archived" },
];

export const INITIAL_APPLICATION_FILTERS: ApplicationFilters = {
  status: [],
  priority: [],
  searchQuery: "",
  dateRange: "all",
  matchScoreMin: 0,
};
