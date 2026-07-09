"use client";

import { type HTMLAttributes, forwardRef } from "react";

import { NotificationItem } from "./notification-item";

import { cn } from "@/lib/utils";
import { useNotificationsStore } from "@/stores/notifications-store";
import type { Notification } from "@/types/notifications";

interface NotificationGroupProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  notifications: Notification[];
}

const NotificationGroup = forwardRef<HTMLDivElement, NotificationGroupProps>(
  ({ className, label, notifications, ...props }, ref) => {
    const selectedId = useNotificationsStore((s) => s.selectedNotificationId);

    if (notifications.length === 0) return null;

    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        <h3 className="text-caption font-semibold text-tertiary uppercase tracking-wider px-1">
          {label}
        </h3>
        <div className="space-y-2" role="list" aria-label={`${label} notifications`}>
          {notifications.map((notification) => (
            <div key={notification.id} role="listitem">
              <NotificationItem
                notification={notification}
                isSelected={selectedId === notification.id}
              />
            </div>
          ))}
        </div>
      </div>
    );
  },
);
NotificationGroup.displayName = "NotificationGroup";

export { NotificationGroup };
export type { NotificationGroupProps };
