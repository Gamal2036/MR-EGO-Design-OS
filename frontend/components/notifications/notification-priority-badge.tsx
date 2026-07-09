"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, ArrowDown, ArrowUp, ChevronsUp } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";
import type { NotificationPriority } from "@/types/notifications";

const priorityBadgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-smallest font-medium",
  {
    variants: {
      priority: {
        urgent: "bg-danger/10 text-danger border border-danger/20",
        high: "bg-warning/10 text-warning border border-warning/20",
        medium: "bg-info/10 text-info border border-info/20",
        low: "bg-neutral-100 text-neutral-600 border border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700",
      },
    },
    defaultVariants: {
      priority: "medium",
    },
  },
);

const priorityIcons: Record<NotificationPriority, typeof ChevronsUp> = {
  urgent: ChevronsUp,
  high: ArrowUp,
  medium: AlertCircle,
  low: ArrowDown,
};

const priorityLabels: Record<NotificationPriority, string> = {
  urgent: "Urgent",
  high: "High",
  medium: "Medium",
  low: "Low",
};

interface NotificationPriorityBadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof priorityBadgeVariants> {
  priority: NotificationPriority;
}

const NotificationPriorityBadge = forwardRef<HTMLSpanElement, NotificationPriorityBadgeProps>(
  ({ className, priority, ...props }, ref) => {
    const Icon = priorityIcons[priority];
    return (
      <span
        ref={ref}
        className={cn(priorityBadgeVariants({ priority, className }))}
        role="status"
        {...props}
      >
        <Icon className="h-3 w-3" aria-hidden="true" />
        <span>{priorityLabels[priority]}</span>
      </span>
    );
  },
);
NotificationPriorityBadge.displayName = "NotificationPriorityBadge";

export { NotificationPriorityBadge };
export type { NotificationPriorityBadgeProps };
