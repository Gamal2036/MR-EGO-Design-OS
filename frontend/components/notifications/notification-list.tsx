"use client";

import { type HTMLAttributes, forwardRef, useMemo } from "react";

import { NotificationEmptyState } from "./notification-empty-state";
import { NotificationGroup } from "./notification-group";

import { cn } from "@/lib/utils";
import { useNotificationsStore } from "@/stores/notifications-store";
import type { Notification } from "@/types/notifications";

interface NotificationListProps extends HTMLAttributes<HTMLDivElement> {
  onResetFilters?: () => void;
}

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

function groupNotifications(notifications: Notification[]): Record<"today" | "yesterday" | "this_week" | "older", Notification[]> {
  const groups: Record<"today" | "yesterday" | "this_week" | "older", Notification[]> = {
    today: [],
    yesterday: [],
    this_week: [],
    older: [],
  };

  for (const n of notifications) {
    const group = getDateGroup(n.timestamp);
    groups[group].push(n);
  }

  return groups;
}

const groupLabels: Record<"today" | "yesterday" | "this_week" | "older", string> = {
  today: "Today",
  yesterday: "Yesterday",
  this_week: "This Week",
  older: "Older",
};

const NotificationList = forwardRef<HTMLDivElement, NotificationListProps>(
  ({ className, onResetFilters, ...props }, ref) => {
    const getFilteredNotifications = useNotificationsStore((s) => s.getFilteredNotifications);

    const filtered = useMemo(() => getFilteredNotifications(), [getFilteredNotifications]);
    const groups = useMemo(() => groupNotifications(filtered), [filtered]);

    const hasNotifications = Object.values(groups).some((g) => g.length > 0);

    if (!hasNotifications) {
      const hasFilters = useNotificationsStore.getState().filters;
      const isFiltered =
        hasFilters.categories.length > 0 ||
        hasFilters.priorities.length > 0 ||
        hasFilters.status !== "all" ||
        hasFilters.dateRange !== "all" ||
        hasFilters.search !== "";

      return (
        <div ref={ref} className={cn("", className)} {...props}>
          <NotificationEmptyState
            variant={isFiltered ? "no-results" : "all-clear"}
            onResetFilters={onResetFilters}
          />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("space-y-5", className)}
        role="region"
        aria-label="Notifications list"
        {...props}
      >
        {(Object.entries(groups) as [keyof typeof groupLabels, Notification[]][]).map(([key, notifs]) => (
          <NotificationGroup
            key={key}
            label={groupLabels[key]}
            notifications={notifs}
          />
        ))}
      </div>
    );
  },
);
NotificationList.displayName = "NotificationList";

export { NotificationList };
export type { NotificationListProps };
