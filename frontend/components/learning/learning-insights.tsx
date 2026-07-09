"use client";

import {
  Target,
  Flame,
  TrendingUp,
  Calendar,
  Sparkles,
  Compass,
  BarChart3,
  Clock,
  CheckCircle2,
} from "lucide-react";

import { Card } from "@/components/foundation";
import { cn } from "@/lib/utils";
import type {
  DailyGoal,
  LearningStreak,
  MonthlyProgress,
  WeeklyProgress,
  AIRecommendation,
  LearningSummary,
} from "@/types/learning";

interface LearningInsightsProps {
  dailyGoals: DailyGoal[];
  streak: LearningStreak;
  weeklyProgress: WeeklyProgress;
  monthlyProgress: MonthlyProgress;
  summary: LearningSummary;
  aiRecommendations: AIRecommendation[];
}

export function LearningInsights({
  dailyGoals,
  streak,
  weeklyProgress,
  monthlyProgress,
  summary,
  aiRecommendations,
}: LearningInsightsProps) {
  return (
    <div className="flex flex-col">
      <div className="p-4 space-y-4">
        <h3 className="text-caption text-tertiary font-medium uppercase tracking-wider">
          Insights
        </h3>

        <Card padding="sm" className="space-y-2">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="text-body-small font-medium text-primary">Daily Goal</span>
          </div>
          {dailyGoals.length > 0 ? (
            <div className="space-y-2">
              {dailyGoals.slice(0, 2).map((goal) => (
                <div key={goal.id} className="flex items-center gap-2">
                  <CheckCircle2
                    className={cn(
                      "h-3.5 w-3.5 shrink-0",
                      goal.completed ? "text-success" : "text-tertiary",
                    )}
                    aria-hidden="true"
                  />
                  <span className={cn("text-caption", goal.completed ? "text-success line-through" : "text-secondary")}>
                    {goal.title}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-caption text-tertiary">No goals set for today</p>
          )}
        </Card>

        <Card padding="sm" className="space-y-2">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-warning" aria-hidden="true" />
            <span className="text-body-small font-medium text-primary">Learning Streak</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-heading-3 font-bold text-primary">{streak.current}</span>
            <span className="text-caption text-tertiary">days</span>
          </div>
          <p className="text-caption text-tertiary">
            Best: {streak.longest} days
          </p>
        </Card>

        <Card padding="sm" className="space-y-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-info" aria-hidden="true" />
            <span className="text-body-small font-medium text-primary">Weekly Progress</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-heading-3 font-bold text-primary">{weeklyProgress.completed}</span>
            <span className="text-caption text-tertiary">/ {weeklyProgress.total} items</span>
          </div>
          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-surface-3"
            role="progressbar"
            aria-valuenow={Math.round((weeklyProgress.completed / weeklyProgress.total) * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Weekly progress"
          >
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${(weeklyProgress.completed / weeklyProgress.total) * 100}%` }}
            />
          </div>
          <div className="flex items-center gap-1 text-caption text-tertiary">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {weeklyProgress.hoursSpent}h spent this week
          </div>
        </Card>

        <Card padding="sm" className="space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-success" aria-hidden="true" />
            <span className="text-body-small font-medium text-primary">Monthly Progress</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-heading-3 font-bold text-primary">{monthlyProgress.completed}</span>
            <span className="text-caption text-tertiary">/ {monthlyProgress.total} items</span>
          </div>
          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-surface-3"
            role="progressbar"
            aria-valuenow={Math.round((monthlyProgress.completed / monthlyProgress.total) * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Monthly progress"
          >
            <div
              className="h-full rounded-full bg-success transition-all duration-500"
              style={{ width: `${(monthlyProgress.completed / monthlyProgress.total) * 100}%` }}
            />
          </div>
          <div className="flex items-center gap-1 text-caption text-tertiary">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {monthlyProgress.hoursSpent}h this month &middot; {monthlyProgress.coursesCompleted} courses
          </div>
        </Card>

        {aiRecommendations.length > 0 && aiRecommendations[0] && (
          <Card padding="sm" className="space-y-2" variant="ai">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-ai" aria-hidden="true" />
              <span className="text-body-small font-medium text-primary">AI Suggestion</span>
            </div>
            <p className="text-caption text-secondary">{aiRecommendations[0].title}</p>
            <p className="text-caption text-tertiary">{aiRecommendations[0].reason}</p>
          </Card>
        )}

        {summary.nextLesson && (
          <Card padding="sm" className="space-y-2" variant="interactive">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-cyan" aria-hidden="true" />
              <span className="text-body-small font-medium text-primary">Next Lesson</span>
            </div>
            <p className="text-caption text-secondary">{summary.nextLesson.lessonTitle}</p>
            <p className="text-caption text-tertiary">{summary.nextLesson.courseTitle}</p>
          </Card>
        )}

        {summary.recommendedRoadmap && (
          <Card padding="sm" className="space-y-2" variant="interactive">
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-ai" aria-hidden="true" />
              <span className="text-body-small font-medium text-primary">Recommended Roadmap</span>
            </div>
            <p className="text-caption text-secondary">{summary.recommendedRoadmap}</p>
          </Card>
        )}
      </div>
    </div>
  );
}
