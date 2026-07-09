"use client";

import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface TaskProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  size?: "sm" | "md";
}

const TaskProgress = forwardRef<HTMLDivElement, TaskProgressProps>(
  ({ className, value, size = "sm", ...props }, ref) => {
    const clamped = Math.min(100, Math.max(0, value));

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${clamped}% complete`}
        {...props}
      >
        <div
          className={cn(
            "flex-1 rounded-full bg-surface-2 overflow-hidden",
            size === "sm" ? "h-1.5" : "h-2",
          )}
        >
          <div
            className={cn(
              "h-full rounded-full transition-all duration-normal",
              clamped === 100
                ? "bg-success"
                : clamped > 0
                  ? "bg-primary"
                  : "bg-transparent",
            )}
            style={{ width: `${clamped}%` }}
          />
        </div>
        <span
          className={cn(
            "tabular-nums text-tertiary",
            size === "sm" ? "text-smallest" : "text-caption",
          )}
        >
          {clamped}%
        </span>
      </div>
    );
  },
);
TaskProgress.displayName = "TaskProgress";

export { TaskProgress };
export type { TaskProgressProps };
