"use client";

import { NotificationCategoryBadge } from "./notification-category-badge";
import { NotificationPriorityBadge } from "./notification-priority-badge";
import { NotificationQuickActions } from "./notification-quick-actions";

import { cn } from "@/lib/utils";
import { useNotificationsStore } from "@/stores/notifications-store";
import type { Notification } from "@/types/notifications";

interface NotificationItemProps {
  notification: Notification;
  isSelected: boolean;
}

function formatRelativeTime(timestamp: string): string {
  const now = Date.now();
  const date = new Date(timestamp).getTime();
  const diff = now - date;
  const MS_HOUR = 3600000;
  const MS_DAY = 86400000;

  if (diff < MS_HOUR) {
    const mins = Math.floor(diff / 60000);
    return `${mins}m ago`;
  }
  if (diff < MS_DAY) {
    const hours = Math.floor(diff / MS_HOUR);
    return `${hours}h ago`;
  }
  if (diff < 7 * MS_DAY) {
    const days = Math.floor(diff / MS_DAY);
    return `${days}d ago`;
  }
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function NotificationItem({ notification, isSelected }: NotificationItemProps) {
  const markAsRead = useNotificationsStore((s) => s.markAsRead);
  const archiveNotification = useNotificationsStore((s) => s.archiveNotification);
  const deleteNotification = useNotificationsStore((s) => s.deleteNotification);
  const selectNotification = useNotificationsStore((s) => s.selectNotification);

  return (
    <button
      type="button"
      onClick={() => {
        if (notification.status === "unread") {
          markAsRead(notification.id);
        }
        selectNotification(notification.id);
      }}
      className={cn(
        "group relative flex w-full flex-col gap-2 rounded-xl border px-4 py-3 text-left transition-all duration-fast",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        notification.status === "unread"
          ? "border-primary/20 bg-primary/[0.03] hover:bg-primary/[0.06]"
          : "border-border bg-surface-0 hover:bg-surface-1",
        isSelected && "ring-2 ring-cyan-500/40 border-cyan-500/30 dark:ring-cyan-400/30 dark:border-cyan-400/20",
      )}
      aria-current={isSelected ? "true" : undefined}
      aria-label={`${notification.status === "unread" ? "Unread" : "Read"} notification: ${notification.title}`}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "mt-1 h-2 w-2 shrink-0 rounded-full",
            notification.status === "unread" ? "bg-cyan-500" : "bg-transparent",
          )}
          aria-hidden="true"
        />
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <span
              className={cn(
                "text-body-small font-medium line-clamp-1",
                notification.status === "unread" ? "text-primary" : "text-secondary",
              )}
            >
              {notification.title}
            </span>
            <span className="shrink-0 text-smallest text-tertiary whitespace-nowrap">
              {formatRelativeTime(notification.timestamp)}
            </span>
          </div>
          <p className="text-caption text-tertiary line-clamp-2 leading-relaxed">
            {notification.description}
          </p>
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <NotificationCategoryBadge category={notification.category} />
            <NotificationPriorityBadge priority={notification.priority} />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-fast">
        <NotificationQuickActions
          notification={notification}
          onMarkRead={markAsRead}
          onArchive={archiveNotification}
          onDelete={deleteNotification}
        />
      </div>
    </button>
  );
}
