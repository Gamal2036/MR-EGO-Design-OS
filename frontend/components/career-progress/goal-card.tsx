"use client";

import { Check, Circle, Clock, type LucideIcon } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { ProgressBar } from "@/components/feedback/progress-bar";
import { Badge } from "@/components/foundation/badge";
import { Card, CardContent } from "@/components/foundation/card";
import { goalStatusConfig, goalTypeConfig } from "@/data/career-progress";
import { cn } from "@/lib/utils";
import type { Goal } from "@/types/career-progress";

export interface GoalCardProps extends HTMLAttributes<HTMLDivElement> {
  goal: Goal;
  selected?: boolean;
  onToggle?: () => void;
  onSelect?: () => void;
}

const statusIcons: Record<string, LucideIcon> = {
  pending: Circle,
  "in-progress": Clock,
  completed: Check,
  skipped: Circle,
};

const GoalCard = forwardRef<HTMLDivElement, GoalCardProps>(
  (
    { className, goal, selected = false, onToggle, onSelect, ...props },
    ref
  ) => {
    const typeConfig = goalTypeConfig[goal.type];
    const statusConfig = goalStatusConfig[goal.status];
    const StatusIcon = statusIcons[goal.status] || Circle;

    return (
      <Card
        ref={ref}
        variant={selected ? "ai" : "default"}
        padding="sm"
        className={cn(
          "transition-colors",
          selected && "border-ai/50 shadow-ai-card",
          className
        )}
        role="listitem"
        aria-label={goal.title}
        {...props}
      >
        <CardContent className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={onToggle}
                className={cn(
                  "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  goal.status === "completed"
                    ? "border-success bg-success text-success-foreground"
                    : "border-border bg-surface-0 text-tertiary hover:border-primary"
                )}
                aria-label={
                  goal.status === "completed"
                    ? `Mark ${goal.title} as not done`
                    : `Mark ${goal.title} as done`
                }
                aria-pressed={goal.status === "completed"}
              >
                <StatusIcon className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <div>
                <h4
                  className={cn(
                    "text-label font-medium",
                    goal.status === "completed"
                      ? "text-tertiary line-through"
                      : "text-primary"
                  )}
                >
                  {goal.title}
                </h4>
                <p className="text-smallest text-tertiary mt-0.5">
                  {goal.description}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <Badge variant={statusConfig.variant} size="xs">
                {statusConfig.label}
              </Badge>
              <Badge variant="outline" size="xs" className={typeConfig.color}>
                {typeConfig.label}
              </Badge>
            </div>
          </div>

          <div className="space-y-1">
            <ProgressBar
              value={goal.progress}
              variant={
                goal.progress >= 80
                  ? "success"
                  : goal.progress >= 50
                  ? "ai"
                  : "warning"
              }
              size="sm"
              showLabel
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-caption text-tertiary">Due {goal.dueDate}</span>
            {goal.actionHref ? (
              <button
                type="button"
                onClick={onSelect}
                className="text-caption font-medium text-link hover:text-link-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              >
                View action
              </button>
            ) : (
              <span className="text-caption text-tertiary">No action</span>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);
GoalCard.displayName = "GoalCard";

export { GoalCard };
