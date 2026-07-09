"use client";

import {
  AlertTriangle,
  CalendarCheck,
  CheckCircle2,
  Flame,
  Gauge,
  Layers,
  Target,
  TrendingUp,
} from "lucide-react";

import { MetricCard } from "@/components/dashboard";
import type { SmartGoalStats } from "@/types/smart-goal";

export interface GoalStatsProps {
  stats: SmartGoalStats;
}

export function GoalStats({ stats }: GoalStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        icon={<Target className="h-5 w-5" />}
        value={stats.total}
        label="Total Goals"
        description={`${stats.active} active, ${stats.completed} completed`}
        variant="default"
      />
      <MetricCard
        icon={<TrendingUp className="h-5 w-5" />}
        value={`${stats.averageProgress}%`}
        label="Average Progress"
        description="Across active goals"
        variant="info"
        trend={{ direction: "up", value: "+4%" }}
      />
      <MetricCard
        icon={<AlertTriangle className="h-5 w-5" />}
        value={stats.atRisk}
        label="At Risk"
        description="Need attention soon"
        variant={stats.atRisk > 0 ? "warning" : "success"}
      />
      <MetricCard
        icon={<Gauge className="h-5 w-5" />}
        value={stats.productivityScore}
        label="Productivity Score"
        description="Based on consistency"
        variant="ai"
      />
      <MetricCard
        icon={<CheckCircle2 className="h-5 w-5" />}
        value={`${stats.completedMilestones}/${stats.totalMilestones}`}
        label="Milestones"
        description="Completed milestones"
        variant="success"
      />
      <MetricCard
        icon={<Layers className="h-5 w-5" />}
        value={`${stats.completedTasks}/${stats.totalTasks}`}
        label="Tasks"
        description="Completed tasks"
        variant="default"
      />
      <MetricCard
        icon={<Flame className="h-5 w-5" />}
        value={stats.currentStreak}
        label="Goal Streak"
        description={`Longest: ${stats.longestStreak}`}
        variant="warning"
      />
      <MetricCard
        icon={<CalendarCheck className="h-5 w-5" />}
        value={`${stats.averageMotivation}`}
        label="Motivation Score"
        description="Out of 100"
        variant="info"
      />
    </div>
  );
}
