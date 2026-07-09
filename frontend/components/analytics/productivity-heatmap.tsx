"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { HeatmapWeek } from "@/types/analytics";

interface ProductivityHeatmapProps {
  weeks: HeatmapWeek[];
}

const INTENSITY_CLASSES: Record<number, string> = {
  0: "bg-surface-2",
  1: "bg-cyan-900/40",
  2: "bg-cyan-700/60",
  3: "bg-cyan-500/70",
  4: "bg-cyan-400",
};

export function ProductivityHeatmap({ weeks }: ProductivityHeatmapProps) {
  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <Card variant="default" padding="md" role="region" aria-label="Productivity heatmap">
      <CardHeader>
        <CardTitle>Productivity Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          <div className="grid grid-cols-8 gap-1 mb-1">
            <span className="text-caption text-tertiary" />
            {dayLabels.map((day) => (
              <span key={day} className="text-center text-caption text-tertiary">
                {day.slice(0, 1)}
              </span>
            ))}
          </div>
          {weeks.map((week) => (
            <div key={week.week} className="grid grid-cols-8 gap-1">
              <span className="text-caption text-tertiary flex items-center">{week.week}</span>
              {week.days.map((day) => (
                <div
                  key={day.date}
                  className={cn(
                    "aspect-square rounded-md transition-transform duration-fast hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    INTENSITY_CLASSES[day.intensity]
                  )}
                  title={`${day.date}: ${day.count} activities`}
                  role="img"
                  aria-label={`${day.date}: ${day.count} activities`}
                  tabIndex={0}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-end gap-2 text-caption text-tertiary">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={cn("h-3 w-3 rounded-sm", INTENSITY_CLASSES[level])}
              aria-hidden="true"
            />
          ))}
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  );
}
