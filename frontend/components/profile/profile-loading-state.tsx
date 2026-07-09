"use client";

import { type HTMLAttributes, forwardRef } from "react";

import { LoadingState } from "@/components/feedback/loading-state";
import { cn } from "@/lib/utils";

interface ProfileLoadingStateProps extends HTMLAttributes<HTMLDivElement> {
  message?: string;
}

const ProfileLoadingState = forwardRef<HTMLDivElement, ProfileLoadingStateProps>(
  ({ className, message = "Loading your profile...", ...props }, ref) => {
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
ProfileLoadingState.displayName = "ProfileLoadingState";

export { ProfileLoadingState };
export type { ProfileLoadingStateProps };
