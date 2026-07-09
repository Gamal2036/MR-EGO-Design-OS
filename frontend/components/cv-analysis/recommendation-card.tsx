"use client";

import { Lightbulb, ArrowRight, Zap, Clock, Target } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { Button } from "@/components/foundation/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { Recommendation, SeverityLevel } from "@/types/cv-analysis";

export interface RecommendationCardProps
  extends HTMLAttributes<HTMLDivElement> {
  recommendations: Recommendation[];
}

const priorityStyles: Record<
  SeverityLevel,
  { variant: "danger" | "warning" | "info"; label: string }
> = {
  high: { variant: "danger", label: "High Priority" },
  medium: { variant: "warning", label: "Medium Priority" },
  low: { variant: "info", label: "Low Priority" },
};

const impactConfig = {
  high: { icon: Zap, color: "text-success" },
  medium: { icon: Target, color: "text-warning" },
  low: { icon: Clock, color: "text-tertiary" },
} as const;

const effortConfig = {
  easy: { label: "Easy", variant: "success" as const },
  medium: { label: "Medium", variant: "warning" as const },
  hard: { label: "Hard", variant: "danger" as const },
} as const;

const RecommendationCard = forwardRef<
  HTMLDivElement,
  RecommendationCardProps
>(({ className, recommendations, ...props }, ref) => {
  return (
    <Card
      ref={ref}
      variant="default"
      padding="lg"
      className={cn("", className)}
      role="region"
      aria-label="Recommendations"
      {...props}
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" aria-hidden="true" />
          <CardTitle>Recommendations</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recommendations.map((rec) => {
            const priority = priorityStyles[rec.priority];
            const impact = impactConfig[rec.impact];
            const effort = effortConfig[rec.effort];
            const ImpactIcon = impact.icon;

            return (
              <div
                key={rec.id}
                className="rounded-lg border border-border bg-surface-0 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-label font-medium text-primary">
                        {rec.title}
                      </span>
                      <Badge
                        variant={priority.variant}
                        size="xs"
                      >
                        {priority.label}
                      </Badge>
                    </div>
                    <p className="text-caption text-secondary">
                      {rec.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <ImpactIcon
                          className={cn("h-3.5 w-3.5", impact.color)}
                          aria-hidden="true"
                        />
                        <span
                          className={cn(
                            "text-smallest font-medium",
                            impact.color
                          )}
                        >
                          {rec.impact.charAt(0).toUpperCase() +
                            rec.impact.slice(1)}{" "}
                          Impact
                        </span>
                      </div>
                      <Badge variant={effort.variant} size="xs">
                        {effort.label}
                      </Badge>
                      <span className="text-smallest text-tertiary">
                        {rec.category}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="xs">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
});
RecommendationCard.displayName = "RecommendationCard";

export { RecommendationCard };
