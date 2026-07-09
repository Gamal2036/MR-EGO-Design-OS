"use client";

import { AlertCircle, ArrowRight, Lightbulb, TrendingUp, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { Button } from "@/components/foundation/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/foundation/card";
import { coachPriorityConfig } from "@/data/coach";
import { cn } from "@/lib/utils";
import type { CoachInsight } from "@/types/coach";

export interface CoachInsightsProps extends HTMLAttributes<HTMLDivElement> {
  insights: CoachInsight[];
  selectedInsightId?: string | null;
  onSelectInsight?: (id: string | null) => void;
}

const categoryIcons: Record<string, LucideIcon> = {
  "Skill Gap": TrendingUp,
  "Interview Prep": AlertCircle,
  CV: Lightbulb,
  Applications: Lightbulb,
};

const CoachInsights = forwardRef<HTMLDivElement, CoachInsightsProps>(
  ({ className, insights, selectedInsightId, onSelectInsight, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("h-full", className)}
        role="region"
        aria-label="AI career insights"
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-ai" aria-hidden="true" />
            <CardTitle>AI Insights</CardTitle>
          </div>
          <CardDescription>
            Data-driven observations about your career readiness.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3" role="list" aria-label="Insights">
            {insights.map((insight) => {
              const Icon = categoryIcons[insight.category] || Lightbulb;
              const priority = coachPriorityConfig[insight.priority];
              const isSelected = selectedInsightId === insight.id;

              return (
                <div
                  key={insight.id}
                  role="listitem"
                  className={cn(
                    "rounded-xl border p-4 transition-colors",
                    isSelected
                      ? "border-ai bg-ai/5"
                      : "border-border bg-card hover:border-hover"
                  )}
                  onClick={() => onSelectInsight?.(isSelected ? null : insight.id)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                        priority.variant === "danger"
                          ? "bg-danger/10"
                          : priority.variant === "warning"
                          ? "bg-warning/10"
                          : "bg-ai/10"
                      )}
                      aria-hidden="true"
                    >
                      <Icon
                        className={cn(
                          "h-4 w-4",
                          priority.variant === "danger"
                            ? "text-danger"
                            : priority.variant === "warning"
                            ? "text-warning"
                            : "text-ai"
                        )}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-label font-medium text-primary">
                          {insight.title}
                        </h4>
                        <Badge variant={priority.variant} size="xs">
                          {priority.label}
                        </Badge>
                      </div>
                      <CardDescription className="mt-1">{insight.reason}</CardDescription>
                      <p className="text-caption text-success mt-2">
                        Impact: {insight.estimatedImpact}
                      </p>
                      {insight.actionHref && (
                        <Button
                          asChild
                          variant="link"
                          size="sm"
                          className="mt-2 h-auto p-0"
                        >
                          <Link href={insight.actionHref}>
                            {insight.actionLabel}
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }
);
CoachInsights.displayName = "CoachInsights";

export { CoachInsights };
