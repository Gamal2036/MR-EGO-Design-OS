"use client";

import { CalendarDays, CheckCircle2, Circle, Clock } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/foundation/card";
import { roadmapTaskTypeConfig } from "@/data/roadmaps";
import { cn } from "@/lib/utils";
import type { AIRoadmapDayPlan, AIRoadmapTask } from "@/types/roadmap";

export interface DailyPlanProps extends HTMLAttributes<HTMLDivElement> {
  plan: AIRoadmapDayPlan;
  onToggleTask?: (taskId: string) => void;
}

const DailyPlan = forwardRef<HTMLDivElement, DailyPlanProps>(
  ({ className, plan, onToggleTask, ...props }, ref) => {
    const completedCount = plan.tasks.filter((t) => t.completed).length;
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
        aria-label="Daily plan"
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-ai" aria-hidden="true" />
            <CardTitle>Daily Plan</CardTitle>
          </div>
          <CardDescription>
            Focus for {plan.date}: {plan.focus}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="ai" size="xs">
              {completedCount}/{plan.tasks.length} done
            </Badge>
            <Badge variant="neutral" size="xs">
              <Clock className="h-3 w-3 mr-1" aria-hidden="true" />
              {totalMinutes} min
            </Badge>
          </div>

          <div
            className="grid grid-cols-1 gap-2"
            role="list"
            aria-label="Daily tasks"
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
DailyPlan.displayName = "DailyPlan";

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

export { DailyPlan };
