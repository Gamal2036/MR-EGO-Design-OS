"use client";

import { Compass, Sparkles } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Button } from "@/components/foundation/button";
import { Card, CardContent } from "@/components/foundation/card";
import { cn } from "@/lib/utils";

export interface RoadmapEmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  onStart?: () => void;
}

const RoadmapEmptyState = forwardRef<HTMLDivElement, RoadmapEmptyStateProps>(
  ({ className, onStart, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex min-h-[60vh] flex-1 items-center justify-center",
          className
        )}
        role="status"
        aria-live="polite"
        {...props}
      >
        <Card variant="default" padding="xl" className="max-w-md text-center">
          <CardContent className="space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ai/10 mx-auto">
              <Compass className="h-8 w-8 text-ai" aria-hidden="true" />
            </div>
            <div className="space-y-2">
              <h2 className="text-heading-3 text-primary font-semibold">
                No roadmap yet
              </h2>
              <p className="text-body-small text-secondary">
                Tell us your target career and current skills to generate a personalized AI roadmap.
              </p>
            </div>
            {onStart && (
              <Button variant="primary" size="md" onClick={onStart}>
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Generate Roadmap
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
);
RoadmapEmptyState.displayName = "RoadmapEmptyState";

export { RoadmapEmptyState };
