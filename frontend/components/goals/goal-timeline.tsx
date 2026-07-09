"use client";

import { Check, Circle, Clock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { SmartGoalMilestone } from "@/types/smart-goal";

export interface GoalTimelineProps {
  milestones: SmartGoalMilestone[];
  className?: string;
  onToggle?: (milestoneId: string) => void;
}

export function GoalTimeline({ milestones, className, onToggle }: GoalTimelineProps) {
  const sorted = [...milestones].sort((a, b) => a.order - b.order);

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <CardTitle>Milestone Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="relative space-y-6 pl-4 before:absolute before:left-[19px] before:top-1 before:h-[calc(100%-8px)] before:w-0.5 before:bg-border" role="list">
          {sorted.map((milestone) => {
            const isCompleted = milestone.status === "completed";
            const isInProgress = milestone.status === "in_progress";
            const interactive = !!onToggle;

            return (
              <li key={milestone.id} className="relative pl-8">
                <button
                  type="button"
                  disabled={!interactive}
                  onClick={() => onToggle?.(milestone.id)}
                  className={cn(
                    "absolute left-0 top-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors",
                    isCompleted
                      ? "border-success bg-success text-success-foreground"
                      : isInProgress
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-surface-0 text-tertiary",
                    interactive && "hover:border-primary hover:text-primary cursor-pointer"
                  )}
                  aria-label={isCompleted ? `Mark ${milestone.title} as not completed` : `Mark ${milestone.title} as completed`}
                >
                  {isCompleted ? (
                    <Check className="h-3 w-3" aria-hidden="true" />
                  ) : isInProgress ? (
                    <Clock className="h-3 w-3" aria-hidden="true" />
                  ) : (
                    <Circle className="h-2 w-2" aria-hidden="true" />
                  )}
                </button>
                <div className="space-y-1">
                  <p
                    className={cn(
                      "text-body-small font-medium",
                      isCompleted ? "text-success line-through" : "text-primary"
                    )}
                  >
                    {milestone.title}
                  </p>
                  <p className="text-caption text-secondary">{milestone.description}</p>
                  {milestone.dueDate && (
                    <p className="text-caption text-tertiary">Due {new Date(milestone.dueDate).toLocaleDateString()}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
