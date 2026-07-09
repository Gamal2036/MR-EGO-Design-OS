"use client";

import { type HTMLAttributes, forwardRef } from "react";

import { ErrorState } from "@/components/feedback/error-state";

interface DashboardErrorStateProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const DashboardErrorState = forwardRef<HTMLDivElement, DashboardErrorStateProps>(
  ({ className, title, message, onRetry, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        <ErrorState
          title={title}
          message={message}
          onRetry={onRetry}
        />
      </div>
    );
  }
);
DashboardErrorState.displayName = "DashboardErrorState";

export { DashboardErrorState };
export type { DashboardErrorStateProps };
