"use client";

import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

interface JobLoadingStateProps extends HTMLAttributes<HTMLDivElement> {
  count?: number;
}

const JobLoadingState = forwardRef<HTMLDivElement, JobLoadingStateProps>(
  ({ className, count = 3, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-3", className)}
        role="status"
        aria-live="polite"
        {...props}
      >
        <span className="sr-only">Loading job results...</span>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-xl border border-border bg-surface-1 p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="h-5 w-48 rounded bg-surface-2" />
                <div className="h-4 w-32 rounded bg-surface-2" />
                <div className="flex gap-2">
                  <div className="h-3 w-20 rounded bg-surface-2" />
                  <div className="h-3 w-24 rounded bg-surface-2" />
                  <div className="h-3 w-16 rounded bg-surface-2" />
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-surface-2" />
            </div>
          </div>
        ))}
      </div>
    );
  }
);
JobLoadingState.displayName = "JobLoadingState";

export { JobLoadingState };
export type { JobLoadingStateProps };
