"use client";

import { LayoutGrid, List } from "lucide-react";

import { GoalCard } from "./goal-card";
import { GoalEmpty } from "./goal-empty";

import { cn } from "@/lib/utils";
import type { SmartGoal } from "@/types/smart-goal";

export interface GoalsListProps {
  goals: SmartGoal[];
  viewMode: "grid" | "list";
  className?: string;
  onSelect?: (goal: SmartGoal) => void;
  onEdit?: (goal: SmartGoal) => void;
  onViewModeChange?: (mode: "grid" | "list") => void;
  onCreate?: () => void;
}

export function GoalsList({
  goals,
  viewMode,
  className,
  onSelect,
  onEdit,
  onViewModeChange,
  onCreate,
}: GoalsListProps) {
  if (goals.length === 0) {
    return <GoalEmpty onCreate={onCreate} className={className} />;
  }

  return (
    <div className={cn("space-y-4", className)}>
      {onViewModeChange && (
        <div
          className="flex items-center justify-end gap-1 rounded-lg border border-border bg-surface-1 p-1"
          role="group"
          aria-label="View mode"
        >
          <button
            type="button"
            onClick={() => onViewModeChange("grid")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-caption transition-colors",
              viewMode === "grid"
                ? "bg-primary text-primary-foreground"
                : "text-tertiary hover:text-secondary"
            )}
            aria-pressed={viewMode === "grid"}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("list")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-caption transition-colors",
              viewMode === "list"
                ? "bg-primary text-primary-foreground"
                : "text-tertiary hover:text-secondary"
            )}
            aria-pressed={viewMode === "list"}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      )}

      <div
        className={cn(
          "grid gap-4",
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        )}
        role="list"
      >
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            viewMode={viewMode}
            onClick={onSelect}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}
