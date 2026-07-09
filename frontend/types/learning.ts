export type LearningViewState = "loading" | "ready" | "error" | "empty";

export type LearningViewMode = "dashboard" | "courses" | "roadmaps" | "bookmarks" | "completed" | "certificates" | "labs" | "notes" | "ai-recommendations";

export type CourseCategory =
  | "frontend"
  | "backend"
  | "cybersecurity"
  | "networking"
  | "cloud"
  | "devops"
  | "ai"
  | "data"
  | "career"
  | "language"
  | "all";

export type CourseDifficulty = "beginner" | "intermediate" | "advanced" | "expert";

export type CourseStatus = "not-started" | "in-progress" | "completed";

export type LessonType = "video" | "reading" | "exercise" | "quiz" | "project";

export interface Instructor {
  name: string;
  avatar?: string;
  role: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: CourseCategory;
  difficulty: CourseDifficulty;
  status: CourseStatus;
  progress: number;
  estimatedTime: string;
  rating: number;
  ratingCount: number;
  enrolledCount: number;
  instructor: Instructor;
  isBookmarked: boolean;
  isFavorite: boolean;
  isRecommended: boolean;
  tags: string[];
  thumbnail?: string;
  modules: CourseModule[];
  resources: Resource[];
  prerequisites: string[];
  skills: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  progress: number;
  estimatedTime: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: LessonType;
  duration: string;
  completed: boolean;
  isLocked: boolean;
  quizCount?: number;
  exerciseCount?: number;
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: "link" | "document" | "video" | "article" | "code";
}

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  category: CourseCategory;
  difficulty: CourseDifficulty;
  steps: RoadmapStep[];
  progress: number;
  estimatedTime: string;
  isBookmarked: boolean;
  skills: string[];
  prerequisites: string[];
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  phase: string;
  completed: boolean;
  current: boolean;
  locked: boolean;
  courses: string[];
  resources: Resource[];
}

export interface DailyGoal {
  id: string;
  title: string;
  description: string;
  type: "course" | "practice" | "review" | "quiz";
  completed: boolean;
  estimatedTime: string;
  courseId?: string;
}

export interface LearningStreak {
  current: number;
  longest: number;
  lastActiveDate: string;
  thisWeek: boolean[];
}

export interface WeeklyProgress {
  completed: number;
  total: number;
  hoursSpent: number;
  dailyBreakdown: { day: string; completed: number; total: number }[];
}

export interface MonthlyProgress {
  completed: number;
  total: number;
  hoursSpent: number;
  coursesCompleted: number;
}

export interface LearningNote {
  id: string;
  title: string;
  content: string;
  courseId?: string;
  lessonId?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Certificate {
  id: string;
  title: string;
  courseId: string;
  issuedDate: string;
  expiryDate?: string;
  credentialUrl?: string;
  skills: string[];
}

export interface PracticeLab {
  id: string;
  title: string;
  description: string;
  category: CourseCategory;
  difficulty: CourseDifficulty;
  estimatedTime: string;
  isCompleted: boolean;
  isBookmarked: boolean;
  technologies: string[];
}

export interface LearningFilters {
  category: CourseCategory;
  difficulty: CourseDifficulty | "all";
  status: CourseStatus | "all";
  search: string;
  bookmarked: boolean;
}

export interface LearningStats {
  totalCourses: number;
  inProgressCourses: number;
  completedCourses: number;
  totalHours: number;
  currentStreak: number;
  longestStreak: number;
  certificatesEarned: number;
  bookmarkedCount: number;
}

export interface LearningSummary {
  dailyGoal: DailyGoal | null;
  streak: LearningStreak;
  weeklyProgress: WeeklyProgress;
  monthlyProgress: MonthlyProgress;
  nextLesson: { courseId: string; courseTitle: string; lessonId: string; lessonTitle: string } | null;
  recommendedRoadmap: string | null;
}

export interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  type: "course" | "roadmap" | "practice" | "skill";
  confidence: number;
  reason: string;
  courseId?: string;
}

export interface LearningState {
  courses: Course[];
  roadmaps: Roadmap[];
  dailyGoals: DailyGoal[];
  learningNotes: LearningNote[];
  certificates: Certificate[];
  practiceLabs: PracticeLab[];
  aiRecommendations: AIRecommendation[];
  viewMode: LearningViewMode;
  viewState: LearningViewState;
  selectedCourseId: string | null;
  selectedRoadmapId: string | null;
  filters: LearningFilters;
  stats: LearningStats;
  summary: LearningSummary;
  searchQuery: string;
}

export interface LearningStore extends LearningState {
  setViewState: (state: LearningViewState) => void;
  setViewMode: (mode: LearningViewMode) => void;
  setCourses: (courses: Course[]) => void;
  setRoadmaps: (roadmaps: Roadmap[]) => void;
  setDailyGoals: (goals: DailyGoal[]) => void;
  setLearningNotes: (notes: LearningNote[]) => void;
  setCertificates: (certificates: Certificate[]) => void;
  setPracticeLabs: (labs: PracticeLab[]) => void;
  setAIRecommendations: (recommendations: AIRecommendation[]) => void;
  selectCourse: (id: string | null) => void;
  selectRoadmap: (id: string | null) => void;
  setFilter: (filter: Partial<LearningFilters>) => void;
  resetFilters: () => void;
  toggleBookmark: (courseId: string) => void;
  toggleFavorite: (courseId: string) => void;
  toggleGoalCompleted: (goalId: string) => void;
  toggleRoadmapBookmark: (roadmapId: string) => void;
  toggleLabBookmark: (labId: string) => void;
  toggleLabCompleted: (labId: string) => void;
  addNote: (note: LearningNote) => void;
  updateNote: (id: string, updates: Partial<LearningNote>) => void;
  deleteNote: (id: string) => void;
  updateCourseProgress: (courseId: string, progress: number, lessonId?: string) => void;
  getFilteredCourses: () => Course[];
  getCourseById: (id: string) => Course | undefined;
  getRoadmapById: (id: string) => Roadmap | undefined;
  getBookmarkedCourses: () => Course[];
  getCompletedCourses: () => Course[];
  getInProgressCourses: () => Course[];
  getCoursesByCategory: (category: CourseCategory) => Course[];
  getRecommendedCourses: () => Course[];
  setSearchQuery: (query: string) => void;
}
