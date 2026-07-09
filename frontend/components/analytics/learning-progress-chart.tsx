"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { LearningItemMetric } from "@/types/analytics";

interface LearningProgressChartProps {
  items: LearningItemMetric[];
}

export function LearningProgressChart({ items }: LearningProgressChartProps) {
  return (
    <Card variant="default" padding="md" role="region" aria-label="Learning progress">
      <CardHeader>
        <CardTitle>Learning Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {items.map((item) => {
          const percentage = Math.round((item.completed / Math.max(item.total, 1)) * 100);
          return (
            <div key={item.id}>
              <div className="flex items-center justify-between text-caption mb-1.5">
                <span className="font-medium text-secondary">{item.label}</span>
                <span className="text-primary font-semibold">
                  {item.completed}/{item.total}
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-surface-2 overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-slow ease-out-custom")}
                  style={{ width: `${percentage}%`, backgroundColor: item.color }}
                  role="progressbar"
                  aria-valuenow={item.completed}
                  aria-valuemin={0}
                  aria-valuemax={item.total}
                  aria-label={`${item.label} progress`}
                />
              </div>
              <p className="text-caption text-tertiary mt-1">{percentage}% complete</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
