"use client";

import { LayoutDashboard } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { EmptyState } from "@/components/feedback/empty-state";
import { Button } from "@/components/foundation/button";

interface DashboardEmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  onStart?: () => void;
}

const DashboardEmptyState = forwardRef<HTMLDivElement, DashboardEmptyStateProps>(
  ({ className, onStart, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        <EmptyState
          icon={<LayoutDashboard className="h-12 w-12" />}
          title="Welcome to your Dashboard"
          description="Complete your profile and upload your CV to get personalized career insights, job matches, and AI-powered recommendations."
          action={
            <Button onClick={onStart} size="lg">
              Get Started
            </Button>
          }
        />
      </div>
    );
  }
);
DashboardEmptyState.displayName = "DashboardEmptyState";

export { DashboardEmptyState };
export type { DashboardEmptyStateProps };
