"use client";

import { Award, Flame, Heart, MessageSquare, Zap } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { ProgressBar } from "@/components/feedback/progress-bar";
import { Badge } from "@/components/foundation/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { CoachAchievement, CoachMotivation } from "@/types/coach";

export interface MotivationCardProps extends HTMLAttributes<HTMLDivElement> {
  motivation: CoachMotivation;
}

const achievementIcons: Record<string, typeof Flame> = {
  Flame,
  Zap,
  Send: Award,
  MessageSquare,
};

function AchievementItem({ achievement }: { achievement: CoachAchievement }) {
  const Icon = achievementIcons[achievement.icon] || Award;

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border p-3",
        achievement.earned
          ? "border-success/30 bg-success/5"
          : "border-border bg-surface-0"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          achievement.earned ? "bg-success/10" : "bg-neutral-100 dark:bg-neutral-800"
        )}
        aria-hidden="true"
      >
        <Icon
          className={cn("h-4 w-4", achievement.earned ? "text-success" : "text-tertiary")}
        aria-hidden="true"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "text-label font-medium truncate",
            achievement.earned ? "text-primary" : "text-tertiary"
          )}
        >
          {achievement.title}
        </p>
        <p className="text-caption text-secondary truncate">{achievement.description}</p>
      </div>
      {achievement.earned && achievement.earnedDate && (
        <Badge variant="success" size="xs">
          {achievement.earnedDate}
        </Badge>
      )}
    </div>
  );
}

const MotivationCard = forwardRef<HTMLDivElement, MotivationCardProps>(
  ({ className, motivation, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("h-full", className)}
        role="region"
        aria-label="Motivation and streaks"
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-warning" aria-hidden="true" />
            <CardTitle>Motivation</CardTitle>
          </div>
          <CardDescription>Keep your momentum going.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-surface-0 p-3 text-center">
              <p className="text-heading-2 font-bold text-warning">
                {motivation.currentStreak}
              </p>
              <p className="text-caption text-secondary">Day Streak</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-0 p-3 text-center">
              <p className="text-heading-2 font-bold text-ai">
                {motivation.estimatedSuccess}%
              </p>
              <p className="text-caption text-secondary">Success Estimate</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3 text-caption">
              <span className="text-secondary">Progress to {motivation.nextMilestone}</span>
              <span className="text-ai font-medium">
                {motivation.currentStreak}/10 days
              </span>
            </div>
            <ProgressBar value={motivation.currentStreak} max={10} variant="warning" size="md" animated />
          </div>

          <div className="rounded-xl border border-warning/30 bg-warning/5 p-4">
            <div className="flex items-start gap-2">
              <Heart
                className="h-4 w-4 text-warning shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <p className="text-body-small text-secondary">{motivation.encouragingMessage}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-label font-medium text-primary">Achievements</p>
            <div className="space-y-2">
              {motivation.achievements.map((achievement) => (
                <AchievementItem key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);
MotivationCard.displayName = "MotivationCard";

export { MotivationCard };
