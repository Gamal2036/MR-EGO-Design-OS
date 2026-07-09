"use client";

import { type HTMLAttributes, forwardRef } from "react";

import { LoadingState } from "@/components/feedback/loading-state";
import { cn } from "@/lib/utils";

export interface CareerProgressLoadingStateProps extends HTMLAttributes<HTMLDivElement> {
  message?: string;
}

const CareerProgressLoadingState = forwardRef<HTMLDivElement, CareerProgressLoadingStateProps>(
  ({ className, message = "Loading your career progress...", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("min-h-0 flex-1 flex items-center justify-center", className)}
        role="status"
        aria-live="polite"
        {...props}
      >
        <LoadingState size="lg" message={message} />
      </div>
    );
  }
);
CareerProgressLoadingState.displayName = "CareerProgressLoadingState";

export { CareerProgressLoadingState };
