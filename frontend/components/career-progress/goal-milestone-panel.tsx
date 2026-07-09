"use client";

import { Flag, Target, Trophy } from "lucide-react";
import { useMemo, useState } from "react";
import { type HTMLAttributes, forwardRef } from "react";

import { GoalCard } from "./goal-card";

import { Badge } from "@/components/foundation/badge";
import { Button } from "@/components/foundation/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { milestoneStatusConfig } from "@/data/career-progress";
import { cn } from "@/lib/utils";
import type { Goal, GoalType, Milestone } from "@/types/career-progress";

export interface GoalMilestonePanelProps extends HTMLAttributes<HTMLDivElement> {
  goals: Goal[];
  milestones: Milestone[];
  weeklySummary: { completed: number; total: number };
  monthlySummary: { completed: number; total: number };
  onToggleGoal?: (id: string) => void;
  onToggleMilestone?: (id: string) => void;
  selectedGoalId?: string | null;
  onSelectGoal?: (id: string | null) => void;
}

type Tab = "goals" | "milestones";

const GoalMilestonePanel = forwardRef<HTMLDivElement, GoalMilestonePanelProps>(
  (
    {
      className,
      goals,
      milestones,
      weeklySummary,
      monthlySummary,
      onToggleGoal,
      onToggleMilestone,
      selectedGoalId,
      onSelectGoal,
      ...props
    },
    ref
  ) => {
    const [activeTab, setActiveTab] = useState<Tab>("goals");
    const [goalFilter, setGoalFilter] = useState<GoalType | "all">("all");

    const filteredGoals = useMemo(() => {
      if (goalFilter === "all") return goals;
      return goals.filter((g) => g.type === goalFilter);
    }, [goals, goalFilter]);

    const completedMilestones = useMemo(
      () => milestones.filter((m) => m.status === "completed").length,
      [milestones]
    );

    const upcomingMilestones = useMemo(
      () => milestones.filter((m) => m.status !== "completed" && m.status !== "locked"),
      [milestones]
    );

    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("h-full", className)}
        role="region"
        aria-label="Goals and milestones"
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-success" aria-hidden="true" />
            <CardTitle>Goals & Milestones</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div
            className="grid grid-cols-2 gap-3"
            role="tablist"
            aria-label="Goals and milestones tabs"
          >
            <Button
              type="button"
              variant={activeTab === "goals" ? "primary" : "outline"}
              size="sm"
              onClick={() => setActiveTab("goals")}
              role="tab"
              aria-selected={activeTab === "goals"}
            >
              Goals
            </Button>
            <Button
              type="button"
              variant={activeTab === "milestones" ? "primary" : "outline"}
              size="sm"
              onClick={() => setActiveTab("milestones")}
              role="tab"
              aria-selected={activeTab === "milestones"}
            >
              Milestones
            </Button>
          </div>

          {activeTab === "goals" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {(["all", "daily", "weekly", "monthly"] as const).map((filter) => (
                  <Button
                    key={filter}
                    type="button"
                    variant={goalFilter === filter ? "secondary" : "ghost"}
                    size="xs"
                    onClick={() => setGoalFilter(filter)}
                  >
                    {filter === "all"
                      ? "All"
                      : filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </Button>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-3">
                {filteredGoals.map((goal) => (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    selected={selectedGoalId === goal.id}
                    onToggle={() => onToggleGoal?.(goal.id)}
                    onSelect={() => onSelectGoal?.(goal.id)}
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 rounded-xl border border-border bg-surface-0 p-3">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-warning" aria-hidden="true" />
                  <div>
                    <p className="text-caption text-tertiary">Weekly</p>
                    <p className="text-label font-semibold text-primary">
                      {weeklySummary.completed}/{weeklySummary.total}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Flag className="h-4 w-4 text-ai" aria-hidden="true" />
                  <div>
                    <p className="text-caption text-tertiary">Monthly</p>
                    <p className="text-label font-semibold text-primary">
                      {monthlySummary.completed}/{monthlySummary.total}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "milestones" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-body-small text-secondary">
                  {completedMilestones} of {milestones.length} completed
                </span>
              </div>

              <div className="space-y-3">
                {milestones.map((milestone) => {
                  const config = milestoneStatusConfig[milestone.status];
                  return (
                    <button
                      key={milestone.id}
                      type="button"
                      onClick={() => onToggleMilestone?.(milestone.id)}
                      className={cn(
                        "w-full rounded-xl border bg-card p-4 text-left transition-colors hover:border-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        milestone.status === "completed"
                          ? "border-success/30 bg-success/5"
                          : "border-border"
                      )}
                      aria-label={`${milestone.title}: ${config.label}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <h4
                            className={cn(
                              "text-label font-medium",
                              milestone.status === "completed"
                                ? "text-success line-through"
                                : "text-primary"
                            )}
                          >
                            {milestone.title}
                          </h4>
                          <p className="text-smallest text-tertiary mt-0.5">
                            {milestone.description}
                          </p>
                          {milestone.date && (
                            <p className="text-caption text-tertiary mt-1">
                              {milestone.date}
                            </p>
                          )}
                        </div>
                        <Badge variant={config.variant} size="xs">
                          {config.label}
                        </Badge>
                      </div>
                    </button>
                  );
                })}
              </div>

              {upcomingMilestones.length > 0 && (
                <div className="rounded-xl border border-border bg-surface-0 p-3">
                  <p className="text-caption text-tertiary mb-2">
                    Upcoming milestones
                  </p>
                  <ul className="space-y-1">
                    {upcomingMilestones.slice(0, 3).map((m) => (
                      <li key={m.id} className="text-body-small text-secondary">
                        {m.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
);
GoalMilestonePanel.displayName = "GoalMilestonePanel";

export { GoalMilestonePanel };
