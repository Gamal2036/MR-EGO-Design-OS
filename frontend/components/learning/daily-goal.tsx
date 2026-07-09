"use client";

import { CheckCircle2, Circle } from "lucide-react";

import { Card } from "@/components/foundation";
import { cn } from "@/lib/utils";
import type { DailyGoal } from "@/types/learning";

interface DailyGoalProps {
  goals: DailyGoal[];
  onToggleGoal?: (id: string) => void;
}

export function DailyGoalCard({ goals, onToggleGoal }: DailyGoalProps) {
  const completedCount = goals.filter((g) => g.completed).length;

  return (
    <Card padding="md" className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-body font-semibold text-primary">Daily Goals</h3>
        <span className="text-caption text-tertiary">
          {completedCount}/{goals.length} done
        </span>
      </div>

      <div
        className="h-1 w-full overflow-hidden rounded-full bg-surface-3"
        role="progressbar"
        aria-valuenow={Math.round((completedCount / goals.length) * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${Math.round((completedCount / goals.length) * 100)}% of daily goals complete`}
      >
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${(completedCount / goals.length) * 100}%` }}
        />
      </div>

      <div className="space-y-2" role="list" aria-label="Daily goals list">
        {goals.map((goal) => {
          return (
            <button
              key={goal.id}
              type="button"
              className={cn(
                "flex w-full items-center gap-3 rounded-lg p-2.5 text-left transition-colors",
                goal.completed
                  ? "bg-success/5"
                  : "bg-surface-2 hover:bg-surface-3",
              )}
              onClick={() => onToggleGoal?.(goal.id)}
              aria-label={`${goal.title} - ${goal.completed ? "Completed" : "Not completed"}`}
            >
              {goal.completed ? (
                <CheckCircle2 className="h-4 w-4 text-success shrink-0" aria-hidden="true" />
              ) : (
                <Circle className="h-4 w-4 text-tertiary shrink-0" aria-hidden="true" />
              )}
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "text-body-small font-medium truncate",
                    goal.completed ? "text-success line-through" : "text-primary",
                  )}
                >
                  {goal.title}
                </p>
                <p className="text-caption text-tertiary truncate mt-0.5">
                  {goal.description}
                </p>
              </div>
              <span className="text-caption text-tertiary shrink-0">{goal.estimatedTime}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
