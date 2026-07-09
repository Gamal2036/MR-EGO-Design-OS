"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Button } from "@/components/foundation/button";
import { Card, CardContent } from "@/components/foundation/card";
import { cn } from "@/lib/utils";

export interface RoadmapErrorStateProps extends HTMLAttributes<HTMLDivElement> {
  onRetry?: () => void;
}

const RoadmapErrorState = forwardRef<HTMLDivElement, RoadmapErrorStateProps>(
  ({ className, onRetry, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex min-h-[60vh] flex-1 items-center justify-center",
          className
        )}
        role="alert"
        aria-live="assertive"
        {...props}
      >
        <Card variant="danger" padding="xl" className="max-w-md text-center">
          <CardContent className="space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-danger/10 mx-auto">
              <AlertTriangle className="h-8 w-8 text-danger" aria-hidden="true" />
            </div>
            <div className="space-y-2">
              <h2 className="text-heading-3 text-primary font-semibold">
                Could not load roadmap
              </h2>
              <p className="text-body-small text-secondary">
                Something went wrong while generating your roadmap. Please try again.
              </p>
            </div>
            {onRetry && (
              <Button variant="primary" size="md" onClick={onRetry}>
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Try Again
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
);
RoadmapErrorState.displayName = "RoadmapErrorState";

export { RoadmapErrorState };
