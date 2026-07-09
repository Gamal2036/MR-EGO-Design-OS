"use client";

import { Archive, CheckCheck, VolumeX, Trash2 } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Button } from "@/components/foundation/button";
import { cn } from "@/lib/utils";
import { useNotificationsStore } from "@/stores/notifications-store";

interface NotificationBulkActionsProps extends HTMLAttributes<HTMLDivElement> {
  onMarkAllRead?: () => void;
  onArchiveAll?: () => void;
  onMuteCategory?: () => void;
}

const NotificationBulkActions = forwardRef<HTMLDivElement, NotificationBulkActionsProps>(
  ({ className, onMarkAllRead, onArchiveAll, onMuteCategory, ...props }, ref) => {
    const markAllAsRead = useNotificationsStore((s) => s.markAllAsRead);
    const notifications = useNotificationsStore((s) => s.notifications);
    const unreadCount = notifications.filter((n) => n.status === "unread").length;

    const handleMarkAllRead = onMarkAllRead ?? markAllAsRead;

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap items-center gap-2 rounded-xl border border-border bg-surface-0 px-4 py-3",
          className,
        )}
        role="toolbar"
        aria-label="Bulk actions"
        {...props}
      >
        <span className="text-caption text-tertiary mr-2">
          {unreadCount > 0 ? `${unreadCount} unread` : "All read"}
        </span>
        <div className="flex flex-wrap items-center gap-1.5">
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="xs"
              onClick={handleMarkAllRead}
              leftIcon={<CheckCheck className="h-3.5 w-3.5" />}
            >
              Mark All Read
            </Button>
          )}
          {onArchiveAll && (
            <Button
              variant="ghost"
              size="xs"
              onClick={onArchiveAll}
              leftIcon={<Archive className="h-3.5 w-3.5" />}
            >
              Archive All
            </Button>
          )}
          {onMuteCategory && (
            <Button
              variant="ghost"
              size="xs"
              onClick={onMuteCategory}
              leftIcon={<VolumeX className="h-3.5 w-3.5" />}
            >
              Mute Category
            </Button>
          )}
          <Button
            variant="ghost"
            size="xs"
            disabled
            aria-disabled="true"
            leftIcon={<Trash2 className="h-3.5 w-3.5" />}
            title="Coming Soon"
          >
            Delete All
          </Button>
        </div>
      </div>
    );
  },
);
NotificationBulkActions.displayName = "NotificationBulkActions";

export { NotificationBulkActions };
export type { NotificationBulkActionsProps };
