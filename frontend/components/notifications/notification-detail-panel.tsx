"use client";

import {
  ArrowUpRight,
  Calendar,
  ExternalLink,
  FileText,
  X,
} from "lucide-react";
import Link from "next/link";
import { type HTMLAttributes, forwardRef } from "react";

import { NotificationCategoryBadge } from "./notification-category-badge";
import { NotificationPriorityBadge } from "./notification-priority-badge";

import { Button } from "@/components/foundation/button";
import { Panel, PanelBody, PanelHeader } from "@/components/foundation/panel";
import { cn } from "@/lib/utils";
import { useNotificationsStore } from "@/stores/notifications-store";
import type { Notification } from "@/types/notifications";

interface NotificationDetailPanelProps extends HTMLAttributes<HTMLDivElement> {
  notification: Notification;
  onClose?: () => void;
}

const NotificationDetailPanel = forwardRef<HTMLDivElement, NotificationDetailPanelProps>(
  ({ className, notification, onClose, ...props }, ref) => {
    const markAsRead = useNotificationsStore((s) => s.markAsRead);

    const formattedDate = new Date(notification.timestamp).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <Panel
        ref={ref}
        variant="glass"
        padding="none"
        className={cn("flex flex-col h-full", className)}
        role="region"
        aria-label="Notification details"
        {...props}
      >
        <PanelHeader className="px-5 py-4 shrink-0">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-heading-4 text-primary font-semibold">Details</h2>
            {onClose && (
              <Button
                variant="ghost"
                size="xs"
                onClick={onClose}
                leftIcon={<X className="h-4 w-4" />}
                aria-label="Close detail panel"
              >
                Close
              </Button>
            )}
          </div>
        </PanelHeader>

        <PanelBody className="flex-1 overflow-y-auto scrollbar-thin px-5 py-4 space-y-5">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-heading-4 text-primary font-semibold flex-1">
                {notification.title}
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <NotificationCategoryBadge category={notification.category} />
              <NotificationPriorityBadge priority={notification.priority} />
              {notification.status === "unread" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/10 px-2.5 py-1 text-smallest font-medium text-cyan-500 border border-cyan-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" aria-hidden="true" />
                  Unread
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 text-caption text-tertiary">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{formattedDate}</span>
          </div>

          <div className="rounded-lg bg-surface-1 border border-border p-4">
            <p className="text-body text-secondary leading-relaxed whitespace-pre-wrap">
              {notification.description}
            </p>
          </div>

          {notification.metadata && Object.keys(notification.metadata).length > 0 && (
            <div className="space-y-2">
              <h4 className="text-caption font-semibold text-secondary uppercase tracking-wider">
                Details
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(notification.metadata).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex flex-col gap-0.5 rounded-lg bg-surface-0 border border-border px-3 py-2"
                  >
                    <span className="text-smallest text-tertiary capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <span className="text-caption font-medium text-primary">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2 pt-2">
            {notification.module && (
              <div className="flex items-center gap-2 text-caption text-tertiary">
                <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Module: {notification.module}</span>
              </div>
            )}
            {notification.moduleHref && (
              <Button
                variant="outline"
                size="sm"
                asChild
                leftIcon={<ExternalLink className="h-4 w-4" />}
              >
                <Link href={notification.moduleHref}>
                  Open {notification.module ?? "Module"}
                </Link>
              </Button>
            )}
            {notification.actionLabel && notification.actionHref && (
              <Button
                variant="primary"
                size="sm"
                asChild
                leftIcon={<ArrowUpRight className="h-4 w-4" />}
              >
                <Link href={notification.actionHref}>
                  {notification.actionLabel}
                </Link>
              </Button>
            )}
          </div>

          <div className="flex gap-2 pt-2 border-t border-border">
            {notification.status === "unread" && (
              <Button
                variant="ghost"
                size="xs"
                onClick={() => markAsRead(notification.id)}
              >
                Mark as Read
              </Button>
            )}
          </div>
        </PanelBody>
      </Panel>
    );
  },
);
NotificationDetailPanel.displayName = "NotificationDetailPanel";

export { NotificationDetailPanel };
export type { NotificationDetailPanelProps };
