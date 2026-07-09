"use client";

import { CalendarRange, CheckCircle2, Circle, Clock } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { ProgressBar } from "@/components/feedback/progress-bar";
import { Badge } from "@/components/foundation/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/foundation/card";
import { roadmapTaskTypeConfig } from "@/data/roadmaps";
import { cn } from "@/lib/utils";
import type { AIRoadmapTask, AIRoadmapWeekPlan } from "@/types/roadmap";

export interface WeeklyPlanProps extends HTMLAttributes<HTMLDivElement> {
  plan: AIRoadmapWeekPlan;
  onToggleTask?: (taskId: string) => void;
}

const WeeklyPlan = forwardRef<HTMLDivElement, WeeklyPlanProps>(
  ({ className, plan, onToggleTask, ...props }, ref) => {
    const progress =
      plan.totalTasks === 0
        ? 0
        : Math.round((plan.completedTasks / plan.totalTasks) * 100);
    const totalMinutes = plan.tasks.reduce(
      (sum, task) => sum + task.estimatedMinutes,
      0
    );

    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("h-full", className)}
        role="region"
        aria-label="Weekly plan"
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <CalendarRange className="h-5 w-5 text-ai" aria-hidden="true" />
            <CardTitle>Weekly Plan</CardTitle>
          </div>
          <CardDescription>
            {plan.label} · Focus: {plan.focus}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-xl border border-border bg-surface-0 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-body-small text-secondary">
                Week progress
              </span>
              <span className="text-caption text-tertiary">
                {plan.completedTasks}/{plan.totalTasks} tasks
              </span>
            </div>
            <ProgressBar
              value={progress}
              variant={progress >= 80 ? "success" : progress >= 40 ? "ai" : "warning"}
              size="md"
            />
            <div className="flex items-center gap-2 text-caption text-tertiary">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {totalMinutes} min planned
            </div>
          </div>

          <div
            className="grid grid-cols-1 gap-2"
            role="list"
            aria-label="Weekly tasks"
          >
            {plan.tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={() => onToggleTask?.(task.id)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
);
WeeklyPlan.displayName = "WeeklyPlan";

interface TaskItemProps {
  task: AIRoadmapTask;
  onToggle: () => void;
}

function TaskItem({ task, onToggle }: TaskItemProps) {
  const config = roadmapTaskTypeConfig[task.type];

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border border-border bg-card p-3 transition-colors",
        task.completed && "bg-success/5 border-success/30"
      )}
      role="listitem"
      aria-label={`${task.title}: ${task.completed ? "Completed" : "Pending"}`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="mt-0.5 shrink-0 text-foreground hover:text-ai focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        aria-label={task.completed ? "Mark as pending" : "Mark as complete"}
      >
        {task.completed ? (
          <CheckCircle2
            className="h-5 w-5 text-success"
            aria-hidden="true"
          />
        ) : (
          <Circle className="h-5 w-5 text-tertiary" aria-hidden="true" />
        )}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h4
            className={cn(
              "text-label font-medium",
              task.completed ? "text-tertiary line-through" : "text-primary"
            )}
          >
            {task.title}
          </h4>
          <Badge variant="outline" size="xs" className={config.color}>
            {config.label}
          </Badge>
        </div>
        <p
          className={cn(
            "text-caption mt-0.5",
            task.completed ? "text-tertiary" : "text-secondary"
          )}
        >
          {task.description}
        </p>
        <p className="text-caption text-tertiary mt-1">
          {task.estimatedMinutes} min
        </p>
      </div>
    </div>
  );
}

export { WeeklyPlan };
