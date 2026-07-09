"use client";

import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import type { TaskPriority } from "@/types/task";

const priorityConfig: Record<TaskPriority, { label: string; dotClass: string }> =
  {
    urgent: { label: "Urgent", dotClass: "bg-danger" },
    high: { label: "High", dotClass: "bg-orange-500" },
    medium: { label: "Medium", dotClass: "bg-warning" },
    low: { label: "Low", dotClass: "bg-neutral-400" },
  };

interface TaskPriorityBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  priority: TaskPriority;
}

const TaskPriorityBadge = forwardRef<HTMLSpanElement, TaskPriorityBadgeProps>(
  ({ className, priority, ...props }, ref) => {
    const config = priorityConfig[priority];
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-caption font-medium",
          "bg-surface-2 text-secondary",
          className,
        )}
        role="status"
        aria-label={`Priority: ${config.label}`}
        {...props}
      >
        <span
          className={cn("h-2 w-2 rounded-full", config.dotClass)}
          aria-hidden="true"
        />
        <span>{config.label}</span>
      </span>
    );
  },
);
TaskPriorityBadge.displayName = "TaskPriorityBadge";

export { TaskPriorityBadge };
export type { TaskPriorityBadgeProps };
