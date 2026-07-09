"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { SmartGoalHeatmapDay } from "@/types/smart-goal";

export interface GoalCalendarProps {
  data: SmartGoalHeatmapDay[];
  className?: string;
  title?: string;
}

const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];

export function GoalCalendar({ data, className, title = "Activity Heatmap" }: GoalCalendarProps) {
  const today = new Date();
  const weeks: SmartGoalHeatmapDay[][] = [];

  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[320px]">
            <div className="grid grid-cols-8 gap-1">
              <div className="col-span-1" />
              {dayLabels.map((label, index) => (
                <div key={index} className="text-center text-caption text-tertiary">
                  {label}
                </div>
              ))}
            </div>
            <div className="mt-1 grid grid-cols-8 gap-1">
              {weeks.slice(-12).map((week, weekIndex) => (
                <div key={weekIndex} className="contents">
                  <div className="flex items-center justify-center text-caption text-tertiary">
                    {weekIndex % 4 === 0 ? new Date(week[0]?.date ?? "").toLocaleString("default", { month: "short" }) : ""}
                  </div>
                  {week.map((day, dayIndex) => {
                    const date = new Date(day.date);
                    const isToday =
                      date.getDate() === today.getDate() &&
                      date.getMonth() === today.getMonth() &&
                      date.getFullYear() === today.getFullYear();

                    return (
                      <div
                        key={dayIndex}
                        className={cn(
                          "aspect-square rounded-sm transition-colors",
                          day.value === 0 && "bg-surface-2",
                          day.value === 1 && "bg-primary/20",
                          day.value === 2 && "bg-primary/40",
                          day.value === 3 && "bg-primary/60",
                          day.value >= 4 && "bg-primary",
                          isToday && "ring-2 ring-warning"
                        )}
                        title={`${date.toLocaleDateString()}: activity ${day.value}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-end gap-2">
              <span className="text-caption text-tertiary">Less</span>
              {[0, 1, 2, 3, 4].map((value) => (
                <div
                  key={value}
                  className={cn(
                    "h-3 w-3 rounded-sm",
                    value === 0 && "bg-surface-2",
                    value === 1 && "bg-primary/20",
                    value === 2 && "bg-primary/40",
                    value === 3 && "bg-primary/60",
                    value >= 4 && "bg-primary"
                  )}
                />
              ))}
              <span className="text-caption text-tertiary">More</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
