"use client";

import { ArrowRight, CheckCircle2, Circle, Clock } from "lucide-react";
import Link from "next/link";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { Button } from "@/components/foundation/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/foundation/card";
import { coachPriorityConfig, coachTimeframeConfig } from "@/data/coach";
import { cn } from "@/lib/utils";
import type { CoachActionItem, CoachActionPlan, CoachTimeframe } from "@/types/coach";

export interface ActionPlanProps extends HTMLAttributes<HTMLDivElement> {
  actionPlan: CoachActionPlan;
  selectedTimeframe: CoachTimeframe | "all";
  completedActionIds: string[];
  onToggleAction: (id: string) => void;
  onMarkAllDailyComplete: () => void;
  onSelectTimeframe: (timeframe: CoachTimeframe | "all") => void;
}

const timeframeTabs: Array<{ value: CoachTimeframe | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "daily", label: "Today" },
  { value: "weekly", label: "Week" },
  { value: "monthly", label: "Month" },
  { value: "long-term", label: "Long Term" },
];

const timeframeToPlanKey: Record<CoachTimeframe, keyof CoachActionPlan> = {
  daily: "daily",
  weekly: "weekly",
  monthly: "monthly",
  "long-term": "longTerm",
};

function getFilteredActions(
  plan: CoachActionPlan,
  timeframe: CoachTimeframe | "all"
): CoachActionItem[] {
  if (timeframe === "all") {
    return [...plan.daily, ...plan.weekly, ...plan.monthly, ...plan.longTerm];
  }
  return plan[timeframeToPlanKey[timeframe]];
}

const ActionPlan = forwardRef<HTMLDivElement, ActionPlanProps>(
  (
    {
      className,
      actionPlan,
      selectedTimeframe,
      completedActionIds,
      onToggleAction,
      onMarkAllDailyComplete,
      onSelectTimeframe,
      ...props
    },
    ref
  ) => {
    const filtered = getFilteredActions(actionPlan, selectedTimeframe);
    const completedCount = filtered.filter((a) =>
      completedActionIds.includes(a.id)
    ).length;
    const totalCount = filtered.length;

    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("h-full", className)}
        role="region"
        aria-label="Action plan"
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-ai" aria-hidden="true" />
            <CardTitle>Action Plan</CardTitle>
          </div>
          <CardDescription>
            Prioritized actions tailored to your career goals.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {timeframeTabs.map((tab) => (
              <Button
                key={tab.value}
                variant={selectedTimeframe === tab.value ? "primary" : "outline"}
                size="sm"
                onClick={() => onSelectTimeframe(tab.value)}
              >
                {tab.label}
              </Button>
            ))}
            {selectedTimeframe === "daily" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMarkAllDailyComplete}
              >
                Mark all done
              </Button>
            )}
          </div>

          <p className="text-caption text-secondary">
            {completedCount} of {totalCount} actions completed
          </p>

          <div className="space-y-3" role="list" aria-label="Action items">
            {filtered.map((action) => {
              const isCompleted = completedActionIds.includes(action.id);
              const priority = coachPriorityConfig[action.priority];
              const timeframe = coachTimeframeConfig[action.timeframe];

              return (
                <div
                  key={action.id}
                  role="listitem"
                  className={cn(
                    "rounded-xl border p-4 transition-colors",
                    isCompleted
                      ? "border-success/30 bg-success/5"
                      : "border-border bg-card hover:border-hover"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => onToggleAction(action.id)}
                      className="mt-0.5 shrink-0"
                      aria-label={
                        isCompleted ? "Mark action incomplete" : "Mark action complete"
                      }
                    >
                      {isCompleted ? (
                        <CheckCircle2
                          className="h-5 w-5 text-success"
                          aria-hidden="true"
                        />
                      ) : (
                        <Circle
                          className="h-5 w-5 text-tertiary"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4
                          className={cn(
                            "text-label font-medium",
                            isCompleted ? "text-tertiary line-through" : "text-primary"
                          )}
                        >
                          {action.title}
                        </h4>
                        <Badge variant={priority.variant} size="xs">
                          {priority.label}
                        </Badge>
                        <Badge variant="outline" size="xs" className={timeframe.color}>
                          {timeframe.label}
                        </Badge>
                      </div>
                      <p
                        className={cn(
                          "text-body-small mt-1",
                          isCompleted ? "text-tertiary" : "text-secondary"
                        )}
                      >
                        {action.description}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-caption text-tertiary">
                        {action.estimatedMinutes && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                            {action.estimatedMinutes} min
                          </span>
                        )}
                        {action.actionHref && !isCompleted && (
                          <Button
                            asChild
                            variant="link"
                            size="sm"
                            className="h-auto p-0"
                          >
                            <Link href={action.actionHref}>
                              {action.actionLabel || "Start"}
                              <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }
);
ActionPlan.displayName = "ActionPlan";

export { ActionPlan };
