"use client";

import {
  BookOpen,
  Clock,
  Award,
  BookMarked,
  TrendingUp,
  Flame,
} from "lucide-react";

import { Card } from "@/components/foundation";
import type { LearningStats as LearningStatsType } from "@/types/learning";

interface LearningStatsProps {
  stats: LearningStatsType;
}

export function LearningStats({ stats }: LearningStatsProps) {
  const items = [
    {
      label: "In Progress",
      value: stats.inProgressCourses,
      icon: BookOpen,
      color: "text-info bg-info/10",
    },
    {
      label: "Completed",
      value: stats.completedCourses,
      icon: Award,
      color: "text-success bg-success/10",
    },
    {
      label: "Total Hours",
      value: stats.totalHours,
      icon: Clock,
      color: "text-primary bg-primary/10",
      suffix: "h",
    },
    {
      label: "Streak",
      value: stats.currentStreak,
      icon: Flame,
      color: "text-warning bg-warning/10",
      suffix: "days",
    },
    {
      label: "Bookmarks",
      value: stats.bookmarkedCount,
      icon: BookMarked,
      color: "text-ai bg-ai/10",
    },
    {
      label: "Certificates",
      value: stats.certificatesEarned,
      icon: TrendingUp,
      color: "text-cyan bg-cyan/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.label} padding="sm" className="flex flex-col items-center justify-center text-center">
            <div className={`mb-2 flex h-9 w-9 items-center justify-center rounded-lg ${item.color}`}>
              <Icon className="h-4 w-4" aria-hidden="true" />
            </div>
            <p className="text-heading-4 font-bold text-primary">
              {item.value}
              {item.suffix && <span className="text-caption text-tertiary ml-0.5">{item.suffix}</span>}
            </p>
            <p className="text-caption text-tertiary mt-0.5">{item.label}</p>
          </Card>
        );
      })}
    </div>
  );
}
