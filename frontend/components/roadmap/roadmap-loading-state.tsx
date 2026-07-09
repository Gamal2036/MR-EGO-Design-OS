"use client";

import { Loader2, Map } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Card, CardContent } from "@/components/foundation/card";
import { cn } from "@/lib/utils";

export interface RoadmapLoadingStateProps extends HTMLAttributes<HTMLDivElement> {
  message?: string;
}

const RoadmapLoadingState = forwardRef<HTMLDivElement, RoadmapLoadingStateProps>(
  ({ className, message = "Generating your AI roadmap...", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex min-h-[60vh] flex-1 items-center justify-center",
          className
        )}
        role="status"
        aria-live="polite"
        aria-busy="true"
        {...props}
      >
        <Card variant="default" padding="xl" className="max-w-md text-center">
          <CardContent className="space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ai/10 mx-auto">
              <Map className="h-8 w-8 text-ai" aria-hidden="true" />
            </div>
            <div className="space-y-2">
              <h2 className="text-heading-3 text-primary font-semibold">
                {message}
              </h2>
              <p className="text-body-small text-secondary">
                Analyzing your skills, goals, and target career to build a personalized learning plan.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-caption text-ai">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              <span>AI is working</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
);
RoadmapLoadingState.displayName = "RoadmapLoadingState";

export { RoadmapLoadingState };
