"use client";

import { Briefcase, Lightbulb, AlertCircle } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { ProgressBar } from "@/components/feedback/progress-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { ExperienceAnalysis } from "@/types/cv-analysis";

export interface ExperienceCardProps extends HTMLAttributes<HTMLDivElement> {
  experience: ExperienceAnalysis;
}

const ExperienceCard = forwardRef<HTMLDivElement, ExperienceCardProps>(
  ({ className, experience, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("", className)}
        role="region"
        aria-label="Experience analysis"
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" aria-hidden="true" />
            <CardTitle>Experience Analysis</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <span className="text-caption text-tertiary">
                  Total Years
                </span>
                <p className="text-heading-4 font-semibold text-primary">
                  {experience.totalYears}
                </p>
              </div>
              <div>
                <span className="text-caption text-tertiary">
                  Relevance
                </span>
                <p className="text-heading-4 font-semibold text-primary">
                  {experience.relevanceScore}%
                </p>
              </div>
              <div>
                <span className="text-caption text-tertiary">
                  Achievements
                </span>
                <p className="text-heading-4 font-semibold text-primary">
                  {experience.achievementCount}
                </p>
              </div>
              <div>
                <span className="text-caption text-tertiary">
                  Bullet Quality
                </span>
                <p className="text-heading-4 font-semibold text-primary">
                  {experience.bulletQuality}%
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-label text-secondary">
                  Experience Score
                </span>
                <span
                  className={cn(
                    "text-label font-semibold",
                    experience.score >= 70
                      ? "text-success"
                      : experience.score >= 50
                        ? "text-warning"
                        : "text-danger"
                  )}
                >
                  {experience.score}%
                </span>
              </div>
              <ProgressBar
                value={experience.score}
                variant={
                  experience.score >= 70
                    ? "success"
                    : experience.score >= 50
                      ? "warning"
                      : "danger"
                }
                size="lg"
              />
            </div>

            {experience.gaps.length > 0 && (
              <div className="space-y-2">
                <h4 className="flex items-center gap-1.5 text-label font-medium text-danger">
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                  Gaps Identified
                </h4>
                <ul className="space-y-1">
                  {experience.gaps.map((gap, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-caption text-secondary"
                    >
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-danger" />
                      {gap}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="flex items-center gap-1.5 text-label font-medium text-ai">
                <Lightbulb className="h-4 w-4" aria-hidden="true" />
                Suggestions
              </h4>
              <ul className="space-y-1">
                {experience.suggestions.map((s, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-caption text-secondary"
                  >
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-ai" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);
ExperienceCard.displayName = "ExperienceCard";

export { ExperienceCard };
