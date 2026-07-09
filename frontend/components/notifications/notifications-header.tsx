"use client";

import { CheckCheck, Settings, Bell } from "lucide-react";
import Link from "next/link";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { Button } from "@/components/foundation/button";
import { IconButton } from "@/components/foundation/icon-button";
import { cn } from "@/lib/utils";
import { useNotificationsStore } from "@/stores/notifications-store";

interface NotificationsHeaderProps extends HTMLAttributes<HTMLElement> {
  onMarkAllRead?: () => void;
}

const NotificationsHeader = forwardRef<HTMLElement, NotificationsHeaderProps>(
  ({ className, onMarkAllRead, ...props }, ref) => {
    const markAllAsRead = useNotificationsStore((s) => s.markAllAsRead);
    const getSummary = useNotificationsStore((s) => s.getSummary);
    const summary = getSummary();

    const handleMarkAll = onMarkAllRead ?? markAllAsRead;

    return (
      <header
        ref={ref}
        className={cn("flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", className)}
        {...props}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10">
            <Bell className="h-5 w-5 text-cyan-500" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-heading-2 text-primary font-bold">Notifications</h1>
              {summary.unread > 0 && (
                <Badge variant="danger" size="sm">
                  {summary.unread} new
                </Badge>
              )}
            </div>
            <p className="text-body-small text-secondary">
              Stay updated with your career activity
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {summary.unread > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAll}
              leftIcon={<CheckCheck className="h-4 w-4" />}
            >
              Mark All as Read
            </Button>
          )}
          <Link href="/dashboard/settings" aria-label="Notification settings">
            <IconButton
              icon={Settings}
              variant="ghost"
              size="sm"
              label="Notification settings"
            />
          </Link>
        </div>
      </header>
    );
  },
);
NotificationsHeader.displayName = "NotificationsHeader";

export { NotificationsHeader };
export type { NotificationsHeaderProps };
