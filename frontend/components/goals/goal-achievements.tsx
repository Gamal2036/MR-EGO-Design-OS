"use client";

import { Award, Flame, Flag, Sparkles, Target, Trophy, type LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { SmartGoalAchievement } from "@/types/smart-goal";

export interface GoalAchievementsProps {
  achievements: SmartGoalAchievement[];
  className?: string;
}

const achievementIcons: Record<string, LucideIcon> = {
  flag: Flag,
  flame: Flame,
  trophy: Trophy,
  target: Target,
  sparkles: Sparkles,
  award: Award,
};

export function GoalAchievements({ achievements, className }: GoalAchievementsProps) {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        {achievements.length === 0 ? (
          <p className="text-body-small text-tertiary">No achievements yet. Keep working on your goals!</p>
        ) : (
          <ul className="space-y-3" role="list">
            {achievements.map((achievement) => {
              const Icon = achievementIcons[achievement.icon] ?? Award;
              return (
                <li
                  key={achievement.id}
                  className="flex items-start gap-3 rounded-lg border border-border bg-surface-0 p-3 transition-colors hover:bg-surface-1"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-warning/10 text-warning">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-body-small font-medium text-primary">{achievement.title}</p>
                    <p className="text-caption text-tertiary">{achievement.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
