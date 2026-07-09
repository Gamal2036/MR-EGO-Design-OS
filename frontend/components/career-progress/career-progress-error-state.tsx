"use client";

import { type HTMLAttributes, forwardRef } from "react";

import { ErrorState } from "@/components/feedback/error-state";
import { cn } from "@/lib/utils";

export interface CareerProgressErrorStateProps extends HTMLAttributes<HTMLDivElement> {
  onRetry?: () => void;
}

const CareerProgressErrorState = forwardRef<HTMLDivElement, CareerProgressErrorStateProps>(
  ({ className, onRetry, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("min-h-0 flex-1 flex items-center justify-center", className)}
        role="alert"
        {...props}
      >
        <ErrorState
          title="Could not load career progress"
          message="We ran into a problem while loading your progress. Please try again."
          onRetry={onRetry}
          retryLabel="Retry"
        />
      </div>
    );
  }
);
CareerProgressErrorState.displayName = "CareerProgressErrorState";

export { CareerProgressErrorState };
