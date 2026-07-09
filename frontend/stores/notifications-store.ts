import { create } from "zustand";

import { demoNotifications } from "@/data/notifications";
import type {
  Notification,
  NotificationCategory,
  NotificationFilters,
  NotificationSummary,
  NotificationsStore,
} from "@/types/notifications";

const defaultFilters: NotificationFilters = {
  categories: [],
  priorities: [],
  status: "all",
  dateRange: "all",
  search: "",
  sourceModule: "",
};

function getDateGroup(timestamp: string): "today" | "yesterday" | "this_week" | "older" {
  const now = Date.now();
  const date = new Date(timestamp).getTime();
  const diff = now - date;
  const MS_DAY = 86400000;

  if (diff < MS_DAY) return "today";
  if (diff < 2 * MS_DAY) return "yesterday";
  if (diff < 7 * MS_DAY) return "this_week";
  return "older";
}

function matchesDateRange(timestamp: string, range: string): boolean {
  if (range === "all") return true;
  const group = getDateGroup(timestamp);
  if (range === "today") return group === "today";
  if (range === "week") return group === "today" || group === "yesterday" || group === "this_week";
  if (range === "month") return true;
  return true;
}

function matchesSearch(notification: Notification, search: string): boolean {
  if (!search.trim()) return true;
  const q = search.toLowerCase();
  return (
    notification.title.toLowerCase().includes(q) ||
    notification.description.toLowerCase().includes(q) ||
    (notification.module?.toLowerCase().includes(q) ?? false)
  );
}

export const useNotificationsStore = create<NotificationsStore>()((set, get) => ({
  notifications: [],
  viewState: "loading",
  selectedNotificationId: null,
  filters: { ...defaultFilters },
  archivedCount: 0,
  mutedCategories: [],

  setViewState: (viewState) => set({ viewState }),

  setNotifications: (notifications) => set({ notifications }),

  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, status: "read" as const } : n,
      ),
    })),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.status === "unread" ? { ...n, status: "read" as const } : n,
      ),
    })),

  archiveNotification: (id) =>
    set((state) => {
      const archived = state.notifications.filter((n) => n.id === id);
      return {
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, status: "archived" as const } : n,
        ),
        archivedCount: state.archivedCount + (archived.length > 0 ? 1 : 0),
      };
    }),

  deleteNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  selectNotification: (selectedNotificationId) => set({ selectedNotificationId }),

  setFilter: (filterUpdate) =>
    set((state) => ({
      filters: { ...state.filters, ...filterUpdate },
    })),

  resetFilters: () => set({ filters: { ...defaultFilters } }),

  toggleMuteCategory: (category) =>
    set((state) => {
      const muted = state.mutedCategories.includes(category)
        ? state.mutedCategories.filter((c) => c !== category)
        : [...state.mutedCategories, category];
      return { mutedCategories: muted };
    }),

  getSummary: () => {
    const { notifications } = get();
    const active = notifications.filter((n) => n.status !== "archived");
    return {
      total: active.length,
      unread: active.filter((n) => n.status === "unread").length,
      urgent: active.filter((n) => n.priority === "urgent").length,
      today: active.filter((n) => getDateGroup(n.timestamp) === "today").length,
      thisWeek: active.filter(
        (n) =>
          getDateGroup(n.timestamp) === "today" ||
          getDateGroup(n.timestamp) === "yesterday" ||
          getDateGroup(n.timestamp) === "this_week",
      ).length,
      aiSuggestions: active.filter((n) => n.category === "ai_recommendation").length,
    } satisfies NotificationSummary;
  },

  getFilteredNotifications: () => {
    const { notifications, filters, mutedCategories } = get();
    return notifications
      .filter((n) => n.status !== "archived")
      .filter((n) => !mutedCategories.includes(n.category as NotificationCategory))
      .filter((n) => {
        if (filters.categories.length > 0 && !filters.categories.includes(n.category as NotificationCategory)) return false;
        if (filters.priorities.length > 0 && !filters.priorities.includes(n.priority)) return false;
        if (filters.status === "unread" && n.status !== "unread") return false;
        if (filters.status === "read" && n.status !== "read") return false;
        if (!matchesDateRange(n.timestamp, filters.dateRange)) return false;
        if (filters.sourceModule && n.module !== filters.sourceModule) return false;
        if (!matchesSearch(n, filters.search)) return false;
        return true;
      });
  },

  getNotificationById: (id) => {
    return get().notifications.find((n) => n.id === id);
  },
}));
