"use client";

import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

const NotificationLoadingState = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-3 p-4", className)}
        role="status"
        aria-label="Loading notifications"
        {...props}
      >
        <div className="flex items-center gap-4 animate-pulse">
          <div className="h-10 w-10 rounded-full bg-surface-2" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded bg-surface-2" />
            <div className="h-3 w-1/2 rounded bg-surface-2" />
          </div>
        </div>
        <div className="flex items-center gap-4 animate-pulse">
          <div className="h-10 w-10 rounded-full bg-surface-2" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-2/3 rounded bg-surface-2" />
            <div className="h-3 w-1/2 rounded bg-surface-2" />
          </div>
        </div>
        <div className="flex items-center gap-4 animate-pulse">
          <div className="h-10 w-10 rounded-full bg-surface-2" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded bg-surface-2" />
            <div className="h-3 w-1/3 rounded bg-surface-2" />
          </div>
        </div>
        <div className="flex items-center gap-4 animate-pulse">
          <div className="h-10 w-10 rounded-full bg-surface-2" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/2 rounded bg-surface-2" />
            <div className="h-3 w-2/3 rounded bg-surface-2" />
          </div>
        </div>
        <span className="sr-only">Loading notifications...</span>
      </div>
    );
  },
);
NotificationLoadingState.displayName = "NotificationLoadingState";

export { NotificationLoadingState };
