"use client";

import { X } from "lucide-react";

import { GoalMilestones } from "./goal-milestones";
import { GoalProgress } from "./goal-progress";
import { GoalTimeline } from "./goal-timeline";
import {
  formatDate,
  getPriorityColor,
  getRiskColor,
  getStatusColor,
  getTrendIcon,
  goalPriorityLabels,
  goalStatusLabels,
  goalTypeIcons,
  goalTypeLabels,
} from "./goal-utils";

import { Badge } from "@/components/foundation/badge";
import { Button } from "@/components/foundation/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { SmartGoal } from "@/types/smart-goal";

export interface GoalDetailsProps {
  goal: SmartGoal;
  className?: string;
  onClose?: () => void;
  onToggleMilestone?: (milestoneId: string) => void;
  onToggleTask?: (taskId: string) => void;
  onEdit?: (goal: SmartGoal) => void;
  onArchive?: (id: string) => void;
}

export function GoalDetails({
  goal,
  className,
  onClose,
  onToggleMilestone,
  onToggleTask,
  onEdit,
  onArchive,
}: GoalDetailsProps) {
  const Icon = goalTypeIcons[goal.type];
  const completedMilestones = goal.milestones.filter((m) => m.status === "completed").length;
  const completedTasks = goal.tasks.filter((t) => t.status === "done").length;

  return (
    <Card className={cn("h-full overflow-hidden", className)}>
      <CardHeader
        action={
          onClose && (
            <Button variant="ghost" size="xs" onClick={onClose} aria-label="Close details">
              <X className="h-4 w-4" />
            </Button>
          )
        }
      >
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <CardTitle>{goal.title}</CardTitle>
            <CardDescription className="mt-1">{goalTypeLabels[goal.type]} · {goal.category}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-body-small text-secondary">{goal.description}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge variant="outline" size="xs" className={getStatusColor(goal.status)}>
            {goalStatusLabels[goal.status]}
          </Badge>
          <Badge variant="outline" size="xs" className={getPriorityColor(goal.priority)}>
            {goalPriorityLabels[goal.priority]}
          </Badge>
          <Badge variant="outline" size="xs">
            {goal.difficulty}
          </Badge>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center justify-center rounded-xl border border-border bg-surface-0 p-6">
            <GoalProgress progress={goal.progress} size="lg" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-body-small">
              <span className="text-secondary">Current stage</span>
              <span className="font-medium text-primary">{goal.currentStage}</span>
            </div>
            <div className="flex justify-between text-body-small">
              <span className="text-secondary">Deadline</span>
              <span className="font-medium text-primary">{formatDate(goal.deadline)}</span>
            </div>
            <div className="flex justify-between text-body-small">
              <span className="text-secondary">Estimated completion</span>
              <span className="font-medium text-primary">{formatDate(goal.estimatedCompletion)}</span>
            </div>
            <div className="flex justify-between text-body-small">
              <span className="text-secondary">Milestones</span>
              <span className="font-medium text-primary">{completedMilestones}/{goal.milestones.length}</span>
            </div>
            <div className="flex justify-between text-body-small">
              <span className="text-secondary">Tasks</span>
              <span className="font-medium text-primary">{completedTasks}/{goal.tasks.length}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <MetricItem label="Motivation" value={goal.motivationScore} trend={goal.prediction.motivationTrend} />
          <MetricItem label="Consistency" value={goal.consistencyScore} trend={goal.prediction.productivityTrend} />
          <MetricItem label="AI Confidence" value={goal.aiConfidence} />
        </div>

        <div className="mt-6 rounded-xl border border-border bg-surface-0 p-4">
          <p className="text-body-small font-medium text-primary">AI Prediction</p>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <p className="text-caption text-secondary">
              Chance of success: <span className="font-medium text-primary">{goal.prediction.chanceOfSuccess}%</span>
            </p>
            <p className="text-caption text-secondary">
              Risk level: <span className={cn("font-medium", getRiskColor(goal.prediction.riskLevel))}>{goal.prediction.riskLevel}</span>
            </p>
            <p className="text-caption text-secondary">
              Estimated finish: <span className="font-medium text-primary">{formatDate(goal.prediction.estimatedFinishDate)}</span>
            </p>
            {goal.prediction.delayWarning && (
              <p className="text-caption text-danger">{goal.prediction.delayWarning}</p>
            )}
          </div>
        </div>

        {goal.nextRecommendation && (
          <div className="mt-4 rounded-xl border border-ai/20 bg-ai/5 p-4">
            <p className="text-body-small font-medium text-ai">Next Recommendation</p>
            <p className="text-caption text-secondary">{goal.nextRecommendation}</p>
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <GoalTimeline milestones={goal.milestones} onToggle={onToggleMilestone} />
          <GoalMilestones
            milestones={goal.milestones}
            tasks={goal.tasks}
            onToggleMilestone={onToggleMilestone}
            onToggleTask={onToggleTask}
          />
        </div>

        <div className="mt-6 flex items-center gap-2">
          {onEdit && (
            <Button variant="outline" onClick={() => onEdit(goal)}>
              Edit Goal
            </Button>
          )}
          {onArchive && (
            <Button variant="outline-danger" onClick={() => onArchive(goal.id)}>
              Archive
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function MetricItem({
  label,
  value,
  trend,
}: {
  label: string;
  value: number;
  trend?: "up" | "down" | "stable";
}) {
  return (
    <div className="rounded-lg border border-border bg-surface-0 p-3 text-center">
      <p className="text-caption text-tertiary">{label}</p>
      <p className="mt-1 text-heading-3 text-primary font-semibold">
        {value}
        {trend && <span className="ml-1 text-body-small text-secondary">{getTrendIcon(trend)}</span>}
      </p>
    </div>
  );
}
