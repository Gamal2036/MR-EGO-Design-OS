"use client";

import { AlertCircle, TrendingUp, Lightbulb, Target, type LucideIcon } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { Card, CardContent } from "@/components/foundation/card";
import type { InsightItem } from "@/data/dashboard";
import { cn } from "@/lib/utils";

const insightIcons: Record<string, LucideIcon> = {
  missing: AlertCircle,
  "skill-gap": TrendingUp,
  suggestion: Lightbulb,
  opportunity: Target,
};

const insightColors: Record<string, string> = {
  missing: "text-danger",
  "skill-gap": "text-warning",
  suggestion: "text-ai",
  opportunity: "text-success",
};

const insightBgColors: Record<string, string> = {
  missing: "bg-danger/10",
  "skill-gap": "bg-warning/10",
  suggestion: "bg-ai/10",
  opportunity: "bg-success/10",
};

const priorityBadge: Record<string, { variant: "danger" | "warning" | "info"; label: string }> = {
  high: { variant: "danger", label: "High" },
  medium: { variant: "warning", label: "Medium" },
  low: { variant: "info", label: "Low" },
};

interface InsightPanelProps extends HTMLAttributes<HTMLDivElement> {
  insights: InsightItem[];
  title?: string;
}

const InsightPanel = forwardRef<HTMLDivElement, InsightPanelProps>(
  ({ className, insights, title = "Improvements & Insights", ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("", className)}
        role="region"
        aria-label={title}
        {...props}
      >
        <h2 className="text-heading-4 text-primary mb-4">{title}</h2>
        <div className="space-y-3">
          {insights.map((insight) => {
            const Icon = insightIcons[insight.type] || Lightbulb;
            const priorityInfo = priorityBadge[insight.priority] ?? { variant: "info" as const, label: "Info" };
            return (
              <Card key={insight.id} variant="default" padding="md">
                <CardContent>
                  <div className="flex gap-3">
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                        insightBgColors[insight.type] || "bg-neutral-100 dark:bg-neutral-800"
                      )}
                      aria-hidden="true"
                    >
                      <Icon
                        className={cn(
                          "h-4.5 w-4.5",
                          insightColors[insight.type] || "text-neutral-500"
                        )}
                      />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-label font-medium text-primary">
                          {insight.title}
                        </p>
                        <Badge variant={priorityInfo.variant} size="xs">
                          {priorityInfo.label}
                        </Badge>
                      </div>
                      <p className="text-caption text-secondary">
                        {insight.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    );
  }
);
InsightPanel.displayName = "InsightPanel";

export { InsightPanel };
export type { InsightPanelProps };
