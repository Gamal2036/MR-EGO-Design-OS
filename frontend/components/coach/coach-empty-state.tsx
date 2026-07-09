"use client";

import { Brain, Sparkles } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Button } from "@/components/foundation/button";
import { Card, CardContent } from "@/components/foundation/card";
import { cn } from "@/lib/utils";

export interface CoachEmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  onStart?: () => void;
}

const CoachEmptyState = forwardRef<HTMLDivElement, CoachEmptyStateProps>(
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
              <Brain className="h-8 w-8 text-ai" aria-hidden="true" />
            </div>
            <div className="space-y-2">
              <h2 className="text-heading-3 text-primary font-semibold">
                No coaching data yet
              </h2>
              <p className="text-body-small text-secondary">
                Set your target role and complete a quick assessment to get personalized AI coaching.
              </p>
            </div>
            {onStart && (
              <Button variant="primary" size="md" onClick={onStart}>
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Start Coaching
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
);
CoachEmptyState.displayName = "CoachEmptyState";

export { CoachEmptyState };
