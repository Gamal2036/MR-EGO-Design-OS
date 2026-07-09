"use client";

import { ArrowRight, Flag } from "lucide-react";
import Link from "next/link";
import { type HTMLAttributes, forwardRef } from "react";

import { ProgressBar } from "@/components/feedback/progress-bar";
import { Badge } from "@/components/foundation/badge";
import { Button } from "@/components/foundation/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/foundation/card";
import { coachPriorityConfig, getReadinessColor, getReadinessVariant } from "@/data/coach";
import { cn } from "@/lib/utils";
import type { CoachNextGoal } from "@/types/coach";

export interface NextStepsProps extends HTMLAttributes<HTMLDivElement> {
  goal: CoachNextGoal;
}

const NextSteps = forwardRef<HTMLDivElement, NextStepsProps>(
  ({ className, goal, ...props }, ref) => {
    const priority = coachPriorityConfig[goal.priority];
    const color = getReadinessColor(goal.progress);
    const variant = getReadinessVariant(goal.progress);

    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("h-full", className)}
        role="region"
        aria-label="Next goal"
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-ai" aria-hidden="true" />
            <CardTitle>Next Goal</CardTitle>
          </div>
          <CardDescription>Your immediate career milestone.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={priority.variant} size="xs">
              {priority.label} Priority
            </Badge>
            {goal.deadline && (
              <Badge variant="outline" size="xs">
                Due {goal.deadline}
              </Badge>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-label font-medium text-primary">{goal.title}</h3>
            <p className="text-body-small text-secondary">{goal.description}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-caption text-secondary">Progress</span>
              <span className={cn("text-heading-3 font-bold", color)}>{goal.progress}%</span>
            </div>
            <ProgressBar value={goal.progress} variant={variant} size="lg" animated />
          </div>

          {goal.actionHref ? (
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link href={goal.actionHref}>
                {goal.actionLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="w-full" disabled>
              {goal.actionLabel}
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }
);
NextSteps.displayName = "NextSteps";

export { NextSteps };
