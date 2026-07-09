"use client";

import {
  ArrowRight,
  BookOpen,
  Briefcase,
  FileText,
  Lightbulb,
  MessageSquare,
  Sparkles,
  Target,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { Button } from "@/components/foundation/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/foundation/card";
import { roadmapRecommendationPriorityConfig } from "@/data/roadmaps";
import { cn } from "@/lib/utils";
import type { AIRoadmapRecommendation } from "@/types/roadmap";

export interface RoadmapRecommendationProps
  extends HTMLAttributes<HTMLDivElement> {
  recommendations: AIRoadmapRecommendation[];
}

const actionIcons: Record<string, LucideIcon> = {
  "/dashboard/learning": BookOpen,
  "/dashboard/interviews": MessageSquare,
  "/dashboard/cv-builder": FileText,
  "/dashboard/jobs": Briefcase,
  "/dashboard/coach": Sparkles,
};

const priorityOrder: Record<string, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

const RoadmapRecommendation = forwardRef<
  HTMLDivElement,
  RoadmapRecommendationProps
>(({ className, recommendations, ...props }, ref) => {
  const sorted = [...recommendations].sort(
    (a, b) => (priorityOrder[a.priority] ?? 1) - (priorityOrder[b.priority] ?? 1)
  );

  return (
    <Card
      ref={ref}
      variant="default"
      padding="lg"
      className={cn("h-full", className)}
      role="region"
      aria-label="AI roadmap recommendations"
      {...props}
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-ai" aria-hidden="true" />
          <CardTitle>AI Recommendations</CardTitle>
        </div>
        <CardDescription>
          Personalized next steps based on your progress.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="grid grid-cols-1 gap-3"
          role="list"
          aria-label="Roadmap recommendations"
        >
          {sorted.map((recommendation) => {
            const priorityConfig =
              roadmapRecommendationPriorityConfig[recommendation.priority] ??
              roadmapRecommendationPriorityConfig.medium;
            const ActionIcon = recommendation.actionHref
              ? actionIcons[recommendation.actionHref] ?? ArrowRight
              : ArrowRight;

            return (
              <div
                key={recommendation.id}
                className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-hover"
                role="listitem"
                aria-label={recommendation.title}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ai/10"
                    aria-hidden="true"
                  >
                    <Sparkles className="h-4 w-4 text-ai" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-label font-medium text-primary">
                        {recommendation.title}
                      </h4>
                      <Badge
                        variant={priorityConfig.variant}
                        size="xs"
                      >
                        {priorityConfig.label}
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
                          <ActionIcon
                            className="h-4 w-4"
                            aria-hidden="true"
                          />
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
                        <Target className="h-4 w-4" aria-hidden="true" />
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
});
RoadmapRecommendation.displayName = "RoadmapRecommendation";

export { RoadmapRecommendation };
