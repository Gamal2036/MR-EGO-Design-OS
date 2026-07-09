"use client";

import {
  Activity,
  BarChart3,
  Clock,
  Gauge,
  MessageSquare,
  ThumbsUp,
  Zap,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { AssistantStats as AssistantStatsType } from "@/types/assistant";

interface AssistantStatsProps {
  stats: AssistantStatsType;
}

const statItems = [
  { key: "totalQueries", label: "Total Queries", icon: MessageSquare, color: "text-ai" },
  { key: "queriesToday", label: "Today", icon: Activity, color: "text-success" },
  { key: "avgResponseTime", label: "Avg Response", icon: Clock, color: "text-info", suffix: "s" },
  { key: "satisfactionRate", label: "Satisfaction", icon: ThumbsUp, color: "text-success", suffix: "%" },
  { key: "tokensUsed", label: "Total Tokens", icon: Zap, color: "text-warning" },
  { key: "tokensToday", label: "Tokens Today", icon: BarChart3, color: "text-primary" },
];

export function AssistantStats({ stats }: AssistantStatsProps) {
  if (!stats) return null;

  return (
    <Card variant="default" padding="sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-label font-medium">
          <Gauge className="h-4 w-4 text-ai" aria-hidden="true" />
          Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {statItems.map((item) => {
            const Icon = item.icon;
            const value = stats[item.key as keyof AssistantStatsType];
            const displayValue = typeof value === "number"
              ? value.toLocaleString() + (item.suffix ?? "")
              : String(value);

            return (
              <div
                key={item.key}
                className="rounded-lg bg-surface-2 p-2.5"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon className={cn("h-3.5 w-3.5", item.color)} aria-hidden="true" />
                  <span className="text-smallest text-tertiary">{item.label}</span>
                </div>
                <p className="text-label font-semibold text-primary">{displayValue}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
