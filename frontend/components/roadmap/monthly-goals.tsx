"use client";

import { Calendar, CheckCircle2, Flag, Target } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { ProgressBar } from "@/components/feedback/progress-bar";
import { Badge } from "@/components/foundation/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { AIRoadmapMonthlyGoal } from "@/types/roadmap";

export interface MonthlyGoalsProps extends HTMLAttributes<HTMLDivElement> {
  goals: AIRoadmapMonthlyGoal[];
}

const MonthlyGoals = forwardRef<HTMLDivElement, MonthlyGoalsProps>(
  ({ className, goals, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("h-full", className)}
        role="region"
        aria-label="Monthly goals"
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-ai" aria-hidden="true" />
            <CardTitle>Monthly Goals</CardTitle>
          </div>
          <CardDescription>
            Milestone targets to keep your roadmap on track.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="grid grid-cols-1 gap-4"
            role="list"
            aria-label="Monthly goals"
          >
            {goals.map((goal) => (
              <div
                key={goal.id}
                className={cn(
                  "rounded-xl border border-border bg-card p-4 transition-colors hover:border-hover",
                  goal.completed && "border-success/30 bg-success/5"
                )}
                role="listitem"
                aria-label={`${goal.title}: ${goal.completed ? "Completed" : "In progress"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                        goal.completed
                          ? "bg-success/10 text-success"
                          : "bg-ai/10 text-ai"
                      )}
                      aria-hidden="true"
                    >
                      {goal.completed ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <Target className="h-4 w-4" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4
                          className={cn(
                            "text-label font-semibold",
                            goal.completed
                              ? "text-tertiary line-through"
                              : "text-primary"
                          )}
                        >
                          {goal.title}
                        </h4>
                        {goal.completed && (
                          <Badge variant="success" size="xs">
                            Done
                          </Badge>
                        )}
                      </div>
                      <p
                        className={cn(
                          "text-caption mt-0.5",
                          goal.completed ? "text-tertiary" : "text-secondary"
                        )}
                      >
                        {goal.description}
                      </p>
                      <p className="text-caption text-tertiary mt-1">
                        {goal.month}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-caption text-tertiary">Progress</span>
                    <span className="text-caption font-medium text-primary">
                      {goal.progress}%
                    </span>
                  </div>
                  <ProgressBar
                    value={goal.progress}
                    variant={
                      goal.progress >= 80
                        ? "success"
                        : goal.progress >= 40
                        ? "ai"
                        : "warning"
                    }
                    size="sm"
                  />
                </div>

                <div className="mt-3">
                  <div className="flex items-center gap-2">
                    <Flag className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                    <span className="text-caption text-tertiary">
                      {goal.milestones.length} milestones
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
);
MonthlyGoals.displayName = "MonthlyGoals";

export { MonthlyGoals };
