"use client";

import { ArrowDown } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { FunnelStage } from "@/types/analytics";

interface ApplicationFunnelChartProps {
  stages: FunnelStage[];
}

export function ApplicationFunnelChart({ stages }: ApplicationFunnelChartProps) {
  const max = Math.max(...stages.map((s) => s.count), 1);

  return (
    <Card variant="default" padding="md" role="region" aria-label="Application funnel">
      <CardHeader>
        <CardTitle>Application Funnel</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {stages.map((stage, index) => {
            const width = `${(stage.count / max) * 100}%`;
            const isLast = index === stages.length - 1;
            return (
              <div key={stage.id}>
                <div className="flex items-center justify-between text-caption mb-1.5">
                  <span className="font-medium text-secondary">{stage.label}</span>
                  <span className="text-primary font-semibold">{stage.count}</span>
                </div>
                <div className="h-10 rounded-lg bg-surface-2 overflow-hidden">
                  <div
                    className="h-full flex items-center px-3 transition-all duration-slow ease-out-custom"
                    style={{ width, backgroundColor: stage.color }}
                  >
                    <span className={cn("text-caption font-semibold", stage.count > max * 0.15 ? "text-white" : "opacity-0")}>
                      {Math.round((stage.count / max) * 100)}%
                    </span>
                  </div>
                </div>
                {!isLast && stage.dropOff !== undefined && stage.dropOff > 0 && (
                  <div className="flex justify-center py-1">
                    <div className="flex items-center gap-1 text-caption text-tertiary">
                      <ArrowDown className="h-3 w-3" aria-hidden="true" />
                      <span>{stage.dropOff}% drop-off</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
