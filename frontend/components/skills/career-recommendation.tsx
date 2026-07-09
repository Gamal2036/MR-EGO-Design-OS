"use client";

import { Briefcase, Clock, ShieldAlert } from "lucide-react";
import { type HTMLAttributes, forwardRef, useMemo } from "react";

import { Badge } from "@/components/foundation/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { CareerMapping } from "@/types/skills";

interface CareerRecommendationCardProps extends HTMLAttributes<HTMLDivElement> {
  mapping: CareerMapping;
}

const CareerRecommendationCard = forwardRef<HTMLDivElement, CareerRecommendationCardProps>(
  ({ className, mapping, ...props }, ref) => {
    const { role, ready, confidence, missingSkills, estimatedLearningTime, description } = mapping;

    return (
      <Card
        ref={ref}
        variant={ready ? "success" : "default"}
        padding="md"
        className={cn(
          "group transition-all duration-normal hover:shadow-medium",
          !ready && "hover:border-primary/20",
          className
        )}
        role="article"
        aria-label={`Career recommendation: ${role}`}
        {...props}
      >
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <Briefcase className={cn("h-4 w-4 shrink-0", ready ? "text-success" : "text-primary")} aria-hidden="true" />
              <h4 className="text-body font-medium text-primary truncate">{role}</h4>
            </div>
            <Badge variant={ready ? "success" : "neutral"} size="xs" className="shrink-0">
              {ready ? "Ready" : "Not Ready"}
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-caption text-tertiary">Confidence:</span>
              <span className={cn("text-label font-semibold", confidence >= 70 ? "text-success" : confidence >= 50 ? "text-warning" : "text-danger")}>
                {confidence}%
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-tertiary" aria-hidden="true" />
              <span className="text-caption text-tertiary">{estimatedLearningTime}</span>
            </div>
          </div>

          {!ready && missingSkills.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-caption font-medium text-warning">
                <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Missing Skills</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {missingSkills.map((skill) => (
                  <Badge key={skill} variant="outline" size="xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <p className="text-caption text-secondary leading-relaxed">{description}</p>
        </div>
      </Card>
    );
  }
);
CareerRecommendationCard.displayName = "CareerRecommendationCard";

interface CareerRecommendationGridProps extends HTMLAttributes<HTMLDivElement> {
  careerMappings: CareerMapping[];
}

const CareerRecommendationGrid = forwardRef<HTMLDivElement, CareerRecommendationGridProps>(
  ({ className, careerMappings, ...props }, ref) => {
    const readyRoles = useMemo(() => careerMappings.filter((c) => c.ready), [careerMappings]);
    const notReadyRoles = useMemo(() => careerMappings.filter((c) => !c.ready), [careerMappings]);

    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("", className)}
        role="region"
        aria-label="Career Recommendations"
        {...props}
      >
        <CardHeader>
          <CardTitle>Career Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {readyRoles.length > 0 && (
            <div>
              <h4 className="text-body font-medium text-success mb-2 flex items-center gap-2">
                <Briefcase className="h-4 w-4" aria-hidden="true" />
                You are ready for
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {readyRoles.map((m) => (
                  <CareerRecommendationCard key={m.id} mapping={m} />
                ))}
              </div>
            </div>
          )}

          {notReadyRoles.length > 0 && (
            <div>
              <h4 className="text-body font-medium text-tertiary mb-2 flex items-center gap-2">
                <ShieldAlert className="h-4 w-4" aria-hidden="true" />
                Not Ready Yet
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {notReadyRoles.map((m) => (
                  <CareerRecommendationCard key={m.id} mapping={m} />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
);
CareerRecommendationGrid.displayName = "CareerRecommendationGrid";

export { CareerRecommendationCard, CareerRecommendationGrid };
export type { CareerRecommendationCardProps, CareerRecommendationGridProps };
