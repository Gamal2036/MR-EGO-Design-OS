"use client";

import { Compass } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { EmptyState } from "@/components/feedback/empty-state";
import { Button } from "@/components/foundation/button";
import { cn } from "@/lib/utils";

export interface CareerProgressEmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  onStart?: () => void;
}

const CareerProgressEmptyState = forwardRef<HTMLDivElement, CareerProgressEmptyStateProps>(
  ({ className, onStart, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("min-h-0 flex-1", className)} {...props}>
        <EmptyState
          icon={<Compass className="h-12 w-12 text-primary" />}
          title="Your career journey starts here"
          description="Set your target role, build your CV, and let MR:EGO guide your next best actions."
          action={
            <Button onClick={onStart} variant="primary" size="lg">
              Start Career Progress
            </Button>
          }
        />
      </div>
    );
  }
);
CareerProgressEmptyState.displayName = "CareerProgressEmptyState";

export { CareerProgressEmptyState };
