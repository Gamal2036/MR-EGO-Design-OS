"use client";

import { Check, Circle, GitBranch, type LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { SmartGoal } from "@/types/smart-goal";

export interface GoalTreeProps {
  goals: SmartGoal[];
  className?: string;
  onSelect?: (id: string) => void;
}

const typeIcons: Record<string, LucideIcon> = {
  career: GitBranch,
};

export function GoalTree({ goals, className, onSelect }: GoalTreeProps) {
  const rootGoals = goals.filter((g) => g.dependencies.length === 0 || g.dependencies.every((d) => d.type === "enables"));

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <CardTitle>Goal Tree</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3" role="tree">
          {rootGoals.map((goal) => (
            <TreeNode key={goal.id} goal={goal} goals={goals} depth={0} onSelect={onSelect} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

interface TreeNodeProps {
  goal: SmartGoal;
  goals: SmartGoal[];
  depth: number;
  onSelect?: (id: string) => void;
}

function TreeNode({ goal, goals, depth, onSelect }: TreeNodeProps) {
  const children = goals.filter((g) => g.dependencies.some((d) => d.dependsOnGoalId === goal.id));
  const isCompleted = goal.status === "completed";
  const Icon = typeIcons[goal.type] ?? GitBranch;

  return (
    <li role="treeitem" aria-expanded={children.length > 0} aria-selected={isCompleted}>
      <button
        type="button"
        onClick={() => onSelect?.(goal.id)}
        className={cn(
          "flex w-full items-center gap-2 rounded-lg border p-3 text-left transition-colors hover:bg-surface-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isCompleted ? "border-success/30 bg-success/5" : "border-border bg-surface-0"
        )}
        style={{ marginLeft: depth * 16 }}
      >
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
            isCompleted ? "bg-success text-success-foreground" : "bg-primary/10 text-primary"
          )}
        >
          {isCompleted ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
        </div>
        <div className="min-w-0 flex-1">
          <p className={cn("text-body-small font-medium", isCompleted && "text-success line-through")}>
            {goal.title}
          </p>
          <p className="text-caption text-tertiary">{goal.progress}% complete</p>
        </div>
        <Circle
          className={cn(
            "h-2.5 w-2.5 shrink-0",
            isCompleted ? "text-success" : "text-tertiary"
          )}
          aria-hidden="true"
        />
      </button>
      {children.length > 0 && (
        <ul className="mt-2 space-y-2" role="group">
          {children.map((child) => (
            <TreeNode key={child.id} goal={child} goals={goals} depth={depth + 1} onSelect={onSelect} />
          ))}
        </ul>
      )}
    </li>
  );
}
