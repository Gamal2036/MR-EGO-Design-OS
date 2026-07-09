"use client";

import { UserPlus } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { EmptyState } from "@/components/feedback/empty-state";
import { Button } from "@/components/foundation/button";
import { cn } from "@/lib/utils";

interface ProfileEmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  onCreateProfile?: () => void;
}

const ProfileEmptyState = forwardRef<HTMLDivElement, ProfileEmptyStateProps>(
  ({ className, onCreateProfile, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("min-h-0 flex-1 flex items-center justify-center", className)}
        {...props}
      >
        <EmptyState
          icon={<UserPlus className="h-12 w-12" />}
          title="No Profile Yet"
          description="Create your profile to get started with personalized career features, job matching, and AI-powered insights."
          action={
            <Button
              variant="primary"
              size="lg"
              onClick={onCreateProfile}
              leftIcon={<UserPlus className="h-4 w-4" />}
            >
              Create Profile
            </Button>
          }
        />
      </div>
    );
  }
);
ProfileEmptyState.displayName = "ProfileEmptyState";

export { ProfileEmptyState };
export type { ProfileEmptyStateProps };
