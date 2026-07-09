"use client";

import { Archive, Check, Eye, Trash2 } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { IconButton } from "@/components/foundation/icon-button";
import { cn } from "@/lib/utils";
import type { Notification } from "@/types/notifications";

interface NotificationQuickActionsProps extends HTMLAttributes<HTMLDivElement> {
  notification: Notification;
  onMarkRead?: (id: string) => void;
  onArchive?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const NotificationQuickActions = forwardRef<HTMLDivElement, NotificationQuickActionsProps>(
  ({ className, notification, onMarkRead, onArchive, onDelete, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-0.5", className)}
        onClick={(e) => e.stopPropagation()}
        role="toolbar"
        aria-label="Notification actions"
        {...props}
      >
        {notification.status === "unread" && onMarkRead && (
          <IconButton
            icon={Check}
            variant="ghost"
            size="xs"
            label="Mark as read"
            onClick={() => onMarkRead(notification.id)}
            className="text-tertiary hover:text-success"
          />
        )}
        {notification.status === "read" && (
          <IconButton
            icon={Eye}
            variant="ghost"
            size="xs"
            label="Viewed"
            className="text-success cursor-default"
            disabled
            aria-disabled="true"
          />
        )}
        {onArchive && (
          <IconButton
            icon={Archive}
            variant="ghost"
            size="xs"
            label="Archive"
            onClick={() => onArchive(notification.id)}
            className="text-tertiary hover:text-primary"
          />
        )}
        {onDelete && (
          <IconButton
            icon={Trash2}
            variant="ghost"
            size="xs"
            label="Delete"
            onClick={() => onDelete(notification.id)}
            className="text-tertiary hover:text-danger"
          />
        )}
      </div>
    );
  },
);
NotificationQuickActions.displayName = "NotificationQuickActions";

export { NotificationQuickActions };
export type { NotificationQuickActionsProps };
