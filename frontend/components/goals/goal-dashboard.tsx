"use client";

import {
  CalendarClock,
  CheckCircle2,
  Flame,
  Gauge,
  Lightbulb,
  Rocket,
  Target,
  Trophy,
  Zap,
} from "lucide-react";

import { GoalProgress } from "./goal-progress";
import { formatRelativeDate, goalTypeIcons, goalTypeLabels } from "./goal-utils";

import { MetricCard } from "@/components/dashboard";
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
import type { SmartGoalDashboardData } from "@/types/smart-goal";

export interface GoalDashboardProps {
  data: SmartGoalDashboardData;
  className?: string;
  onSelectGoal?: (id: string) => void;
  onSelectTask?: (goalId: string, taskId: string) => void;
}

export function GoalDashboard({ data, className, onSelectGoal, onSelectTask }: GoalDashboardProps) {
  const { currentGoal, todaysMission, weeklyProgress, completionRate, upcomingDeadlines, achievements, goalStreak, productivityScore, aiRecommendation } = data;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {currentGoal && (
          <Card className="sm:col-span-2 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5 text-primary" aria-hidden="true" />
                Current Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {(() => {
                    const Icon = goalTypeIcons[currentGoal.type];
                    return <Icon className="h-6 w-6" aria-hidden="true" />;
                  })()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-heading-4 text-primary font-semibold">{currentGoal.title}</p>
                  <p className="text-body-small text-secondary">{currentGoal.currentStage}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Badge variant="outline" size="xs">
                      {goalTypeLabels[currentGoal.type]}
                    </Badge>
                    <Badge variant={currentGoal.riskScore >= 50 ? "danger" : "success"} size="xs">
                      {currentGoal.riskScore >= 50 ? "At Risk" : "On Track"}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <GoalProgress progress={currentGoal.progress} variant="bar" label="Progress" />
                  </div>
                  <Button
                    className="mt-4"
                    size="sm"
                    variant="outline"
                    onClick={() => onSelectGoal?.(currentGoal.id)}
                  >
                    View Goal
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-warning" aria-hidden="true" />
              Today&apos;s Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todaysMission ? (
              <div className="space-y-3">
                <p className="text-body-small font-medium text-primary">{todaysMission.title}</p>
                <p className="text-caption text-secondary">{todaysMission.description}</p>
                {todaysMission.goalId && (
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() => onSelectTask?.(todaysMission.goalId, todaysMission.id)}
                  >
                    Start Task
                  </Button>
                )}
              </div>
            ) : (
              <p className="text-body-small text-tertiary">No mission assigned for today.</p>
            )}
          </CardContent>
        </Card>

        <MetricCard
          icon={<Trophy className="h-5 w-5" />}
          value={`${completionRate}%`}
          label="Completion Rate"
          description="Across all goals"
          variant="success"
        />

        <MetricCard
          icon={<Gauge className="h-5 w-5" />}
          value={productivityScore}
          label="Productivity Score"
          description="Based on consistency"
          variant="ai"
        />

        <MetricCard
          icon={<CheckCircle2 className="h-5 w-5" />}
          value={`${weeklyProgress}%`}
          label="Weekly Progress"
          description="Tasks completed this week"
          variant="info"
          trend={{ direction: "up", value: "+6%" }}
        />

        <MetricCard
          icon={<Flame className="h-5 w-5" />}
          value={goalStreak}
          label="Goal Streak"
          description="Days in a row"
          variant="warning"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-info" aria-hidden="true" />
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingDeadlines.length === 0 ? (
              <p className="text-body-small text-tertiary">No upcoming deadlines.</p>
            ) : (
              <ul className="space-y-2" role="list">
                {upcomingDeadlines.map((goal) => (
                  <li
                    key={goal.id}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-body-small font-medium text-primary">{goal.title}</p>
                      <p className="text-caption text-tertiary">{goalTypeLabels[goal.type]}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-caption font-medium text-secondary">{formatRelativeDate(goal.deadline)}</p>
                      <p className="text-caption text-tertiary">{goal.progress}%</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-success" aria-hidden="true" />
              Latest Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            {achievements.length === 0 ? (
              <p className="text-body-small text-tertiary">No achievements yet.</p>
            ) : (
              <ul className="space-y-2" role="list">
                {achievements.slice(0, 4).map((achievement) => (
                  <li
                    key={achievement.id}
                    className="flex items-center gap-3 rounded-lg border border-border p-3"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-warning/10 text-warning">
                      <Trophy className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-body-small font-medium text-primary">{achievement.title}</p>
                      <p className="text-caption text-tertiary">{achievement.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      {aiRecommendation && (
        <Card variant="ai">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-ai">
              <Lightbulb className="h-5 w-5" aria-hidden="true" />
              AI Recommendation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-secondary">{aiRecommendation.description}</CardDescription>
            {aiRecommendation.actionHref && (
              <Button className="mt-4" size="sm" variant="primary">
                {aiRecommendation.actionLabel}
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
