"use client";

import { Clock, Code, FlaskConical, GraduationCap } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { LearningRecommendation } from "@/types/skills";

interface LearningRecommendationCardProps extends HTMLAttributes<HTMLDivElement> {
  recommendation: LearningRecommendation;
}

const difficultyColor: Record<string, "info" | "warning" | "danger"> = {
  beginner: "info",
  intermediate: "warning",
  advanced: "danger",
};

const LearningRecommendationCard = forwardRef<HTMLDivElement, LearningRecommendationCardProps>(
  ({ className, recommendation, ...props }, ref) => {
    const { course, practiceLab, miniProject, estimatedHours, difficulty, aiReason } = recommendation;

    return (
      <Card
        ref={ref}
        variant="default"
        padding="md"
        className={cn("group transition-all duration-normal hover:shadow-medium hover:border-primary/20", className)}
        role="article"
        aria-label={`Learning recommendation: ${course}`}
        {...props}
      >
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <GraduationCap className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <h4 className="text-body font-medium text-primary truncate">{course}</h4>
            </div>
            <Badge variant={difficultyColor[difficulty] || "info"} size="xs" className="shrink-0 capitalize">
              {difficulty}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center gap-2 text-caption text-secondary">
              <FlaskConical className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{practiceLab}</span>
            </div>
            <div className="flex items-center gap-2 text-caption text-secondary">
              <Code className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{miniProject}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-caption text-tertiary">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{estimatedHours}h</span>
            </div>
          </div>

          <div className="rounded-lg bg-surface-0 px-3 py-2 text-caption text-secondary italic border border-border">
            <span className="font-medium not-italic text-primary">AI: </span>
            {aiReason}
          </div>
        </div>
      </Card>
    );
  }
);
LearningRecommendationCard.displayName = "LearningRecommendationCard";

interface LearningRecommendationGridProps extends HTMLAttributes<HTMLDivElement> {
  recommendations: LearningRecommendation[];
}

const LearningRecommendationGrid = forwardRef<HTMLDivElement, LearningRecommendationGridProps>(
  ({ className, recommendations, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("", className)}
        role="region"
        aria-label="Learning Recommendations"
        {...props}
      >
        <CardHeader>
          <CardTitle>Learning Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3">
            {recommendations.map((rec) => (
              <LearningRecommendationCard key={rec.id} recommendation={rec} />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
);
LearningRecommendationGrid.displayName = "LearningRecommendationGrid";

export { LearningRecommendationCard, LearningRecommendationGrid };
export type { LearningRecommendationCardProps, LearningRecommendationGridProps };
