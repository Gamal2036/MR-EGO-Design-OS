"use client";

import { formatRelativeDate, goalTypeIcons, goalTypeLabels } from "./goal-utils";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { SmartGoal } from "@/types/smart-goal";

export interface GoalDeadlinesProps {
  goals: SmartGoal[];
  className?: string;
  onSelect?: (id: string) => void;
}

export function GoalDeadlines({ goals, className, onSelect }: GoalDeadlinesProps) {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
      </CardHeader>
      <CardContent>
        {goals.length === 0 ? (
          <p className="text-body-small text-tertiary">No upcoming deadlines.</p>
        ) : (
          <ul className="space-y-3" role="list">
            {goals.map((goal) => {
              const Icon = goalTypeIcons[goal.type];
              return (
                <li key={goal.id}>
                  <button
                    type="button"
                    onClick={() => onSelect?.(goal.id)}
                    className="flex w-full items-center gap-3 rounded-lg border border-border bg-surface-0 p-3 text-left transition-colors hover:bg-surface-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-body-small font-medium text-primary">{goal.title}</p>
                      <p className="text-caption text-tertiary">{goalTypeLabels[goal.type]}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-caption font-medium text-secondary">{formatRelativeDate(goal.deadline)}</p>
                      <p className="text-caption text-tertiary">{goal.progress}%</p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
