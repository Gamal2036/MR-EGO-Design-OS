"use client";

import { type HTMLAttributes, forwardRef } from "react";

import { ProgressBar } from "@/components/feedback/progress-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { OverallScore } from "@/types/cv-analysis";

export interface AnalysisProgressProps
  extends HTMLAttributes<HTMLDivElement> {
  overallScore: OverallScore;
}

const sections: { key: keyof OverallScore; label: string }[] = [
  { key: "ats", label: "ATS Score" },
  { key: "readability", label: "Readability" },
  { key: "skills", label: "Skills" },
  { key: "experience", label: "Experience" },
  { key: "education", label: "Education" },
  { key: "projects", label: "Projects" },
  { key: "languages", label: "Languages" },
  { key: "keywords", label: "Keywords" },
];

function getScoreVariant(
  score: number
): "success" | "warning" | "danger" | "info" | "ai" {
  if (score >= 80) return "success";
  if (score >= 60) return "ai";
  if (score >= 40) return "warning";
  return "danger";
}

const AnalysisProgress = forwardRef<HTMLDivElement, AnalysisProgressProps>(
  ({ className, overallScore, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("", className)}
        role="region"
        aria-label="Score breakdown"
        {...props}
      >
        <CardHeader>
          <CardTitle>Score Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sections.map(({ key, label }) => {
              const score = overallScore[key];
              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-caption text-secondary">
                      {label}
                    </span>
                    <span
                      className={cn(
                        "text-caption font-medium",
                        score >= 70
                          ? "text-success"
                          : score >= 50
                            ? "text-warning"
                            : "text-danger"
                      )}
                    >
                      {score}%
                    </span>
                  </div>
                  <ProgressBar
                    value={score}
                    variant={getScoreVariant(score)}
                    size="md"
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }
);
AnalysisProgress.displayName = "AnalysisProgress";

export { AnalysisProgress };
