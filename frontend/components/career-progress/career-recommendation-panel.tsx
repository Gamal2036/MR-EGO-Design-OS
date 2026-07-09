"use client";

import {
  ArrowRight,
  BookOpen,
  Briefcase,
  FileText,
  Lightbulb,
  Target,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { Button } from "@/components/foundation/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/foundation/card";
import { recommendationTypeConfig } from "@/data/career-progress";
import { cn } from "@/lib/utils";
import type { CareerRecommendation } from "@/types/career-progress";

export interface CareerRecommendationPanelProps extends HTMLAttributes<HTMLDivElement> {
  recommendations: CareerRecommendation[];
}

const typeIcons: Record<string, LucideIcon> = {
  Target,
  Zap,
  BookOpen,
  Briefcase,
  FileText,
  Lightbulb,
};

const typeBgMap: Record<string, string> = {
  success: "bg-success/10",
  danger: "bg-danger/10",
  info: "bg-info/10",
  ai: "bg-ai/10",
  cv: "bg-cv/10",
};

const priorityOrder: Record<string, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

function getPriorityRank(priority: string): number {
  return priorityOrder[priority] ?? 1;
}

const CareerRecommendationPanel = forwardRef<HTMLDivElement, CareerRecommendationPanelProps>(
  ({ className, recommendations, ...props }, ref) => {
    const sorted = [...recommendations].sort(
      (a, b) => getPriorityRank(a.priority) - getPriorityRank(b.priority)
    );

    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("h-full", className)}
        role="region"
        aria-label="AI career recommendations"
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-ai" aria-hidden="true" />
            <CardTitle>AI Recommendations</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className="grid grid-cols-1 gap-3"
            role="list"
            aria-label="Career recommendations"
          >
            {sorted.map((recommendation) => {
              const config = recommendationTypeConfig[recommendation.type];
              const Icon = typeIcons[config.icon] || Lightbulb;

              return (
                <div
                  key={recommendation.id}
                  className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-hover"
                  role="listitem"
                  aria-label={recommendation.title}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                        typeBgMap[config.color.replace("text-", "")] || "bg-surface-1",
                        config.color
                      )}
                      aria-hidden="true"
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-label font-medium text-primary">
                          {recommendation.title}
                        </h4>
                        <Badge
                          variant={
                            recommendation.priority === "high"
                              ? "danger"
                              : recommendation.priority === "medium"
                              ? "warning"
                              : "neutral"
                          }
                          size="xs"
                        >
                          {recommendation.priority}
                        </Badge>
                      </div>
                      <CardDescription className="mt-1">
                        {recommendation.description}
                      </CardDescription>
                      <p className="text-caption text-success mt-2">
                        Impact: {recommendation.impact}
                      </p>
                      {recommendation.actionHref ? (
                        <Button
                          asChild
                          variant="link"
                          size="sm"
                          className="mt-2 h-auto p-0"
                        >
                          <Link href={recommendation.actionHref}>
                            {recommendation.actionLabel}
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </Link>
                        </Button>
                      ) : (
                        <Button
                          variant="link"
                          size="sm"
                          className="mt-2 h-auto p-0"
                          disabled
                        >
                          {recommendation.actionLabel}
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
CareerRecommendationPanel.displayName = "CareerRecommendationPanel";

export { CareerRecommendationPanel };
