"use client";

import { Calendar, ChevronRight, MoreHorizontal, Target } from "lucide-react";

import { GoalProgress } from "./goal-progress";
import { formatRelativeDate, getPriorityColor, getStatusColor, goalPriorityLabels, goalStatusLabels, goalTypeIcons, goalTypeLabels } from "./goal-utils";

import { Badge } from "@/components/foundation/badge";
import { Button } from "@/components/foundation/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { SmartGoal } from "@/types/smart-goal";

export interface GoalCardProps {
  goal: SmartGoal;
  viewMode?: "grid" | "list";
  className?: string;
  onClick?: (goal: SmartGoal) => void;
  onEdit?: (goal: SmartGoal) => void;
}

export function GoalCard({
  goal,
  viewMode = "grid",
  className,
  onClick,
  onEdit,
}: GoalCardProps) {
  const Icon = goalTypeIcons[goal.type];
  const isList = viewMode === "list";

  return (
    <Card
      variant="interactive"
      className={cn("group", className)}
      onClick={() => onClick?.(goal)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.(goal);
        }
      }}
      aria-label={`${goal.title}, ${goal.progress}% complete`}
    >
      <CardHeader
        action={
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="xs"
              className="opacity-0 group-hover:opacity-100 focus:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(goal);
              }}
              aria-label={`Edit ${goal.title}`}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        }
      >
        <div className={cn("flex items-start gap-3", isList && "sm:flex-row")}>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <CardTitle className="text-body font-semibold">{goal.title}</CardTitle>
            <p className="mt-0.5 text-caption text-tertiary">{goalTypeLabels[goal.type]} · {goal.category}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="line-clamp-2 text-body-small text-secondary">{goal.description}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge variant="outline" size="xs" className={getStatusColor(goal.status)}>
            {goalStatusLabels[goal.status]}
          </Badge>
          <Badge variant="outline" size="xs" className={getPriorityColor(goal.priority)}>
            {goalPriorityLabels[goal.priority]}
          </Badge>
          {goal.riskScore >= 50 && (
            <Badge variant="danger" size="xs">
              At Risk
            </Badge>
          )}
        </div>

        <div className={cn("mt-4", isList && "sm:hidden")}>
          <GoalProgress progress={goal.progress} variant="bar" label="Progress" />
        </div>
      </CardContent>

      <CardFooter className={cn("justify-between", isList && "sm:hidden")}>
        <div className="flex items-center gap-1.5 text-caption text-tertiary">
          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{formatRelativeDate(goal.deadline)}</span>
        </div>
        <div className="flex items-center gap-1.5 text-caption text-secondary">
          <Target className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{goal.milestones.filter((m) => m.status === "completed").length}/{goal.milestones.length} milestones</span>
        </div>
      </CardFooter>

      {isList && (
        <div className="hidden items-center gap-6 px-5 pb-5 sm:flex">
          <GoalProgress progress={goal.progress} size="sm" />
          <div className="flex-1">
            <GoalProgress progress={goal.progress} variant="bar" />
          </div>
          <ChevronRight className="h-5 w-5 text-tertiary" aria-hidden="true" />
        </div>
      )}
    </Card>
  );
}
