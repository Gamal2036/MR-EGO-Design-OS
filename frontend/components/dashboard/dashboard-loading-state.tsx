"use client";

import { type HTMLAttributes, forwardRef } from "react";

import { LoadingState } from "@/components/feedback/loading-state";

interface DashboardLoadingStateProps extends HTMLAttributes<HTMLDivElement> {
  message?: string;
}

const DashboardLoadingState = forwardRef<HTMLDivElement, DashboardLoadingStateProps>(
  ({ className, message = "Loading your dashboard...", ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        <LoadingState message={message} />
      </div>
    );
  }
);
DashboardLoadingState.displayName = "DashboardLoadingState";

export { DashboardLoadingState };
export type { DashboardLoadingStateProps };
