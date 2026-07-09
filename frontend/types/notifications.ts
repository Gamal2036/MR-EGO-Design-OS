export type NotificationCategory =
  | "ai_recommendation"
  | "job_match"
  | "application"
  | "cv_analysis"
  | "document"
  | "career_progress"
  | "system"
  | "security"
  | "reminder"
  | "achievement";

export type NotificationPriority = "urgent" | "high" | "medium" | "low";

export type NotificationStatus = "unread" | "read" | "archived";

export type NotificationViewState = "loading" | "ready" | "error" | "empty";

export interface Notification {
  id: string;
  title: string;
  description: string;
  category: NotificationCategory;
  priority: NotificationPriority;
  status: NotificationStatus;
  timestamp: string;
  module?: string;
  moduleHref?: string;
  actionLabel?: string;
  actionHref?: string;
  metadata?: Record<string, string>;
}

export interface NotificationFilters {
  categories: NotificationCategory[];
  priorities: NotificationPriority[];
  status: "all" | "unread" | "read";
  dateRange: "all" | "today" | "week" | "month";
  search: string;
  sourceModule: string;
}

export interface NotificationSummary {
  total: number;
  unread: number;
  urgent: number;
  today: number;
  thisWeek: number;
  aiSuggestions: number;
}

export interface NotificationsState {
  notifications: Notification[];
  viewState: NotificationViewState;
  selectedNotificationId: string | null;
  filters: NotificationFilters;
  archivedCount: number;
  mutedCategories: NotificationCategory[];
}

export interface NotificationsStore extends NotificationsState {
  setViewState: (state: NotificationViewState) => void;
  setNotifications: (notifications: Notification[]) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  archiveNotification: (id: string) => void;
  deleteNotification: (id: string) => void;
  selectNotification: (id: string | null) => void;
  setFilter: (filters: Partial<NotificationFilters>) => void;
  resetFilters: () => void;
  toggleMuteCategory: (category: NotificationCategory) => void;
  getSummary: () => NotificationSummary;
  getFilteredNotifications: () => Notification[];
  getNotificationById: (id: string) => Notification | undefined;
}
