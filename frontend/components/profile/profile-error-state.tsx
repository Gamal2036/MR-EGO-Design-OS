"use client";

import { type HTMLAttributes, forwardRef } from "react";

import { ErrorState } from "@/components/feedback/error-state";
import { cn } from "@/lib/utils";

interface ProfileErrorStateProps extends HTMLAttributes<HTMLDivElement> {
  onRetry?: () => void;
}

const ProfileErrorState = forwardRef<HTMLDivElement, ProfileErrorStateProps>(
  ({ className, onRetry, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("min-h-0 flex-1 flex items-center justify-center", className)}
        aria-live="assertive"
        {...props}
      >
        <ErrorState
          title="Failed to load profile"
          message="We could not load your profile data. Please try again."
          onRetry={onRetry}
          retryLabel="Retry"
        />
      </div>
    );
  }
);
ProfileErrorState.displayName = "ProfileErrorState";

export { ProfileErrorState };
export type { ProfileErrorStateProps };
