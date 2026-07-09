"use client";

import { Check, ChevronRight, Circle, Clock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { SmartGoalMilestone, SmartGoalTask } from "@/types/smart-goal";

export interface GoalMilestonesProps {
  milestones: SmartGoalMilestone[];
  tasks: SmartGoalTask[];
  className?: string;
  onToggleMilestone?: (milestoneId: string) => void;
  onToggleTask?: (taskId: string) => void;
}

export function GoalMilestones({
  milestones,
  tasks,
  className,
  onToggleMilestone,
  onToggleTask,
}: GoalMilestonesProps) {
  const sortedMilestones = [...milestones].sort((a, b) => a.order - b.order);

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <CardTitle>Milestones & Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedMilestones.map((milestone) => {
            const milestoneTasks = tasks.filter((t) => t.milestoneId === milestone.id).sort((a, b) => a.order - b.order);
            const completedTasks = milestoneTasks.filter((t) => t.status === "done").length;
            const isCompleted = milestone.status === "completed";

            return (
              <div
                key={milestone.id}
                className={cn(
                  "rounded-lg border p-4 transition-colors",
                  isCompleted ? "border-success/30 bg-success/5" : "border-border bg-surface-0"
                )}
              >
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => onToggleMilestone?.(milestone.id)}
                    className={cn(
                      "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                      isCompleted
                        ? "border-success bg-success text-success-foreground"
                        : "border-border bg-surface-0 text-tertiary hover:border-primary hover:text-primary"
                    )}
                    aria-label={isCompleted ? `Mark ${milestone.title} incomplete` : `Mark ${milestone.title} complete`}
                  >
                    {isCompleted ? <Check className="h-4 w-4" /> : <Circle className="h-3 w-3" />}
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p
                        className={cn(
                          "text-body-small font-medium",
                          isCompleted ? "text-success line-through" : "text-primary"
                        )}
                      >
                        {milestone.title}
                      </p>
                      {milestone.status === "in_progress" && (
                        <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                      )}
                    </div>
                    <p className="text-caption text-secondary">{milestone.description}</p>
                    <p className="mt-1 text-caption text-tertiary">
                      {completedTasks}/{milestoneTasks.length} tasks
                    </p>

                    {milestoneTasks.length > 0 && (
                      <ul className="mt-3 space-y-2" role="list">
                        {milestoneTasks.map((task) => (
                          <li key={task.id} className="flex items-start gap-2">
                            <button
                              type="button"
                              onClick={() => onToggleTask?.(task.id)}
                              className={cn(
                                "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                                task.status === "done"
                                  ? "border-success bg-success text-success-foreground"
                                  : "border-border bg-surface-0 hover:border-primary"
                              )}
                              aria-label={task.status === "done" ? `Mark ${task.title} incomplete` : `Mark ${task.title} complete`}
                            >
                              {task.status === "done" && <Check className="h-3 w-3" />}
                            </button>
                            <span
                              className={cn(
                                "text-caption",
                                task.status === "done" ? "text-tertiary line-through" : "text-secondary"
                              )}
                            >
                              {task.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-tertiary" aria-hidden="true" />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
