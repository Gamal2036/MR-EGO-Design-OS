"use client";

import { GraduationCap, Lightbulb } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { ProgressBar } from "@/components/feedback/progress-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { EducationAnalysis } from "@/types/cv-analysis";

export interface EducationCardProps extends HTMLAttributes<HTMLDivElement> {
  education: EducationAnalysis;
}

const EducationCard = forwardRef<HTMLDivElement, EducationCardProps>(
  ({ className, education, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("", className)}
        role="region"
        aria-label="Education analysis"
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <GraduationCap
              className="h-5 w-5 text-primary"
              aria-hidden="true"
            />
            <CardTitle>Education Analysis</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            <div className="rounded-lg border border-border bg-surface-0 p-4">
              <span className="text-caption text-tertiary">
                Highest Degree
              </span>
              <p className="text-label font-medium text-primary mt-0.5">
                {education.highestDegree}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-label text-secondary">
                  Education Score
                </span>
                <span
                  className={cn(
                    "text-label font-semibold",
                    education.score >= 70
                      ? "text-success"
                      : education.score >= 50
                        ? "text-warning"
                        : "text-danger"
                  )}
                >
                  {education.score}%
                </span>
              </div>
              <ProgressBar
                value={education.score}
                variant={
                  education.score >= 70
                    ? "success"
                    : education.score >= 50
                      ? "warning"
                      : "danger"
                }
                size="lg"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-label text-secondary">
                  Field Relevance
                </span>
                <span className="text-label font-semibold text-success">
                  {education.fieldRelevance}%
                </span>
              </div>
              <ProgressBar
                value={education.fieldRelevance}
                variant="success"
                size="lg"
              />
            </div>

            <div className="space-y-2">
              <h4 className="flex items-center gap-1.5 text-label font-medium text-ai">
                <Lightbulb className="h-4 w-4" aria-hidden="true" />
                Suggestions
              </h4>
              <ul className="space-y-1">
                {education.suggestions.map((s, i) => (
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
EducationCard.displayName = "EducationCard";

export { EducationCard };
