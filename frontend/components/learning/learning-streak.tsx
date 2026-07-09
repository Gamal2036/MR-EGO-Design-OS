"use client";

import { Flame } from "lucide-react";

import { Card } from "@/components/foundation";
import { cn } from "@/lib/utils";
import type { LearningStreak as LearningStreakType } from "@/types/learning";

interface LearningStreakProps {
  streak: LearningStreakType;
}

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function LearningStreak({ streak }: LearningStreakProps) {
  return (
    <Card padding="md" className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-body font-semibold text-primary">Learning Streak</h3>
        <div className="flex items-center gap-1">
          <Flame className="h-4 w-4 text-warning" aria-hidden="true" />
          <span className="text-heading-4 font-bold text-primary">{streak.current}</span>
          <span className="text-caption text-tertiary">days</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-1" role="list" aria-label="Weekly activity">
        {streak.thisWeek.map((active, index) => (
          <div
            key={dayLabels[index]}
            className="flex flex-col items-center gap-1"
            role="listitem"
          >
            <div
              className={cn(
                "h-8 w-8 rounded-lg transition-colors flex items-center justify-center",
                active
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-3 text-tertiary",
              )}
              aria-label={`${dayLabels[index]}: ${active ? "Active" : "Inactive"}`}
            >
              {active && <Flame className="h-3 w-3" aria-hidden="true" />}
            </div>
            <span className="text-caption text-tertiary">{(dayLabels[index] || "").charAt(0)}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-caption text-tertiary">
        <span>Longest streak: {streak.longest} days</span>
      </div>
    </Card>
  );
}
