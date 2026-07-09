export type InterviewStatus = "upcoming" | "completed" | "cancelled" | "archived";

export type InterviewType =
  | "behavioral"
  | "technical"
  | "hr"
  | "culture"
  | "leadership"
  | "problem_solving"
  | "career"
  | "salary";

export type InterviewFormat = "onsite" | "remote" | "phone" | "video";

export type QuestionCategory =
  | "behavioral"
  | "technical"
  | "hr"
  | "culture"
  | "leadership"
  | "problem_solving"
  | "career"
  | "salary";

export type QuestionDifficulty = "easy" | "medium" | "hard";

export type PracticeSessionStatus = "not_started" | "in_progress" | "completed" | "paused";

export type InterviewViewState = "loading" | "ready" | "error" | "empty";

export type InterviewViewMode = "dashboard" | "list" | "calendar";

export interface InterviewCompany {
  name: string;
  logo?: string;
  industry: string;
  size: string;
  website?: string;
  description?: string;
}

export interface InterviewChecklistItem {
  id: string;
  title: string;
  done: boolean;
  category?: string;
}

export interface InterviewNote {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface InterviewResource {
  id: string;
  title: string;
  url?: string;
  type: "link" | "document" | "video" | "article";
}

export interface Interview {
  id: string;
  title: string;
  company: InterviewCompany;
  role: string;
  type: InterviewType;
  format: InterviewFormat;
  location: string;
  date: string;
  time?: string;
  duration?: number;
  status: InterviewStatus;
  isFavorite: boolean;
  isArchived: boolean;
  checklist: InterviewChecklistItem[];
  notes: InterviewNote[];
  resources: InterviewResource[];
  preparationProgress: number;
  interviewer?: string;
  salary?: string;
  reminder?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: string;
  text: string;
  category: QuestionCategory;
  difficulty: QuestionDifficulty;
  answerNotes: string;
  isFavorite: boolean;
  tags: string[];
  companyId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PracticeSession {
  id: string;
  title: string;
  type: InterviewType;
  status: PracticeSessionStatus;
  duration: number;
  questionsAnswered: number;
  totalQuestions: number;
  score?: number;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
}

export interface InterviewFilters {
  status: InterviewStatus | "all";
  type: InterviewType | "all";
  search: string;
  favorites: boolean;
}

export interface InterviewSummary {
  total: number;
  upcoming: number;
  completed: number;
  cancelled: number;
  archived: number;
  favorites: number;
  thisWeek: number;
}

export interface InterviewStats {
  preparationScore: number;
  confidenceLevel: number;
  totalInterviews: number;
  completedInterviews: number;
  averageScore: number;
  weakAreas: string[];
  strongAreas: string[];
  suggestedLearning: string[];
}

export interface InterviewState {
  interviews: Interview[];
  questions: Question[];
  practiceSessions: PracticeSession[];
  viewMode: InterviewViewMode;
  viewState: InterviewViewState;
  selectedInterviewId: string | null;
  selectedQuestionId: string | null;
  filters: InterviewFilters;
  isFormOpen: boolean;
  editingInterviewId: string | null;
  stats: InterviewStats;
}

export interface InterviewStore extends InterviewState {
  setViewState: (state: InterviewViewState) => void;
  setInterviews: (interviews: Interview[]) => void;
  setQuestions: (questions: Question[]) => void;
  setPracticeSessions: (sessions: PracticeSession[]) => void;
  setViewMode: (mode: InterviewViewMode) => void;
  selectInterview: (id: string | null) => void;
  selectQuestion: (id: string | null) => void;
  setFilter: (filters: Partial<InterviewFilters>) => void;
  resetFilters: () => void;
  openForm: (interviewId?: string) => void;
  closeForm: () => void;
  addInterview: (interview: Interview) => void;
  updateInterview: (id: string, updates: Partial<Interview>) => void;
  deleteInterview: (id: string) => void;
  archiveInterview: (id: string) => void;
  toggleFavorite: (id: string) => void;
  toggleChecklistItem: (interviewId: string, itemId: string) => void;
  addNote: (interviewId: string, note: InterviewNote) => void;
  addQuestion: (question: Question) => void;
  updateQuestion: (id: string, updates: Partial<Question>) => void;
  deleteQuestion: (id: string) => void;
  toggleQuestionFavorite: (id: string) => void;
  startPracticeSession: (session: PracticeSession) => void;
  completePracticeSession: (id: string, score: number) => void;
  getFilteredInterviews: () => Interview[];
  getInterviewById: (id: string) => Interview | undefined;
  getSummary: () => InterviewSummary;
  getUpcomingInterviews: () => Interview[];
  getPastInterviews: () => Interview[];
  getFavoriteInterviews: () => Interview[];
  getQuestionsByCategory: (category: QuestionCategory) => Question[];
  getStats: () => InterviewStats;
}
