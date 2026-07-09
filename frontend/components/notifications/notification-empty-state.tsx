"use client";

import { Bell, SearchX } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Button } from "@/components/foundation/button";
import { cn } from "@/lib/utils";

interface NotificationEmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "no-notifications" | "no-results" | "all-clear";
  onResetFilters?: () => void;
}

const variantConfig = {
  "no-notifications": {
    icon: Bell,
    title: "No notifications yet",
    description: "When you receive notifications, they will appear here.",
  },
  "no-results": {
    icon: SearchX,
    title: "No matching notifications",
    description: "Try adjusting your filters or search terms.",
  },
  "all-clear": {
    icon: Bell,
    title: "All caught up!",
    description: "You have no unread notifications. We will notify you when something new arrives.",
  },
};

const NotificationEmptyState = forwardRef<HTMLDivElement, NotificationEmptyStateProps>(
  ({ className, variant = "no-notifications", onResetFilters, ...props }, ref) => {
    const config = variantConfig[variant];
    const Icon = config.icon;

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center gap-4 py-16 px-6 text-center",
          className,
        )}
        role="status"
        {...props}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-1 border border-border">
          <Icon className="h-8 w-8 text-tertiary" aria-hidden="true" />
        </div>
        <div className="space-y-1">
          <h3 className="text-heading-4 text-primary">{config.title}</h3>
          <p className="text-body text-secondary max-w-sm">{config.description}</p>
        </div>
        {variant === "no-results" && onResetFilters && (
          <Button variant="outline" size="sm" onClick={onResetFilters}>
            Clear Filters
          </Button>
        )}
      </div>
    );
  },
);
NotificationEmptyState.displayName = "NotificationEmptyState";

export { NotificationEmptyState };
export type { NotificationEmptyStateProps };
