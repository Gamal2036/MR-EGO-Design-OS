"use client";

import { FileText, Briefcase, Users, Zap, Target } from "lucide-react";

import { ProgressRing } from "@/components/analytics/charts/progress-ring";
import { TrendIndicator } from "@/components/analytics/charts/trend-indicator";
import { Badge } from "@/components/foundation/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { CareerOverviewMetric } from "@/types/analytics";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "career-score": Target,
  "job-readiness": Briefcase,
  "cv-score": FileText,
  "interview-score": Users,
  "skill-score": Zap,
};

const COLOR_MAP: Record<string, string> = {
  "career-score": "var(--color-analytics-500)",
  "job-readiness": "var(--color-job-500)",
  "cv-score": "var(--color-cv-500)",
  "interview-score": "var(--color-ai-500)",
  "skill-score": "var(--color-cyan-500)",
};

interface AnalyticsOverviewCardsProps {
  metrics: CareerOverviewMetric[];
}

export function AnalyticsOverviewCards({ metrics }: AnalyticsOverviewCardsProps) {
  return (
    <section aria-label="Career overview" className="space-y-4">
      <h2 className="sr-only">Career Overview</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {metrics.map((metric) => {
          const Icon = ICONS[metric.id] ?? Target;
          const color = COLOR_MAP[metric.id] ?? "var(--color-primary-500)";
          return (
            <Card
              key={metric.id}
              variant="default"
              padding="md"
              className="group relative overflow-hidden"
              role="region"
              aria-label={metric.label}
            >
              <div
                className="absolute inset-x-0 top-0 h-1 opacity-60"
                style={{ backgroundColor: color }}
              />
              <CardHeader
                action={
                  <Badge variant={metric.value >= 80 ? "success" : metric.value >= 60 ? "warning" : "danger"}>
                    {metric.value >= 80 ? "Strong" : metric.value >= 60 ? "Good" : "Focus"}
                  </Badge>
                }
              >
                <CardTitle className="flex items-center gap-2 text-body font-medium text-secondary">
                  <span
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${color}15`, color }}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {metric.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className={cn("text-heading-1 font-bold", metric.value >= 80 ? "text-success" : "text-primary")}>
                      {metric.value}
                      <span className="text-body-small text-tertiary ml-1">{metric.unit}</span>
                    </p>
                    <p className="text-caption text-tertiary mt-1">{metric.description}</p>
                    <div className="mt-3">
                      <TrendIndicator direction={metric.trend.direction} value={metric.trend.value} label={metric.trend.label} />
                    </div>
                  </div>
                  <ProgressRing
                    value={metric.value}
                    max={metric.max}
                    size={72}
                    strokeWidth={6}
                    color={color}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
