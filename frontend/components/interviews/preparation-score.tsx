"use client";

import { Target, Brain } from "lucide-react";
import { forwardRef, type HTMLAttributes } from "react";

import { Card, CardHeader, CardTitle } from "@/components/foundation";
import { cn } from "@/lib/utils";

interface PreparationScoreProps extends HTMLAttributes<HTMLDivElement> {
  score: number;
  confidenceLevel: number;
  averageScore: number;
}

const PreparationScore = forwardRef<HTMLDivElement, PreparationScoreProps>(
  ({ className, score, confidenceLevel, averageScore, ...props }, ref) => {
    function getScoreColor(s: number): string {
      if (s >= 80) return "text-success";
      if (s >= 60) return "text-warning";
      return "text-danger";
    }

    function getScoreRingColor(s: number): string {
      if (s >= 80) return "stroke-success";
      if (s >= 60) return "stroke-warning";
      return "stroke-danger";
    }

    const circumference = 2 * Math.PI * 45;
    const scoreOffset = circumference - (score / 100) * circumference;

    return (
      <Card ref={ref} className={cn("w-full", className)} {...props}>
        <CardHeader>
          <CardTitle className="text-body font-medium">Preparation Score</CardTitle>
        </CardHeader>

        <div className="flex items-center justify-center">
          <div className="relative">
            <svg
              width="120"
              height="120"
              viewBox="0 0 100 100"
              className="transform -rotate-90"
              aria-hidden="true"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                className="stroke-surface-2"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                className={cn("transition-all duration-slow", getScoreRingColor(score))}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={scoreOffset}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={cn("text-heading-2 font-bold", getScoreColor(score))}>
                {score}
              </span>
              <span className="text-caption text-tertiary">/ 100</span>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-caption text-tertiary">
              <Brain className="h-3.5 w-3.5" aria-hidden="true" />
              Confidence Level
            </span>
            <span className={cn("text-caption font-medium", getScoreColor(confidenceLevel))}>
              {confidenceLevel}%
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
            <div
              className={cn("h-full rounded-full transition-all duration-normal", getScoreRingColor(confidenceLevel).replace("stroke-", "bg-"))}
              style={{ width: `${confidenceLevel}%` }}
              role="progressbar"
              aria-valuenow={confidenceLevel}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Confidence level: ${confidenceLevel}%`}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-caption text-tertiary">
              <Target className="h-3.5 w-3.5" aria-hidden="true" />
              Average Score
            </span>
            <span className={cn("text-caption font-medium", getScoreColor(averageScore))}>
              {averageScore}%
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
            <div
              className={cn("h-full rounded-full transition-all duration-normal", getScoreRingColor(averageScore).replace("stroke-", "bg-"))}
              style={{ width: `${averageScore}%` }}
              role="progressbar"
              aria-valuenow={averageScore}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Average score: ${averageScore}%`}
            />
          </div>
        </div>
      </Card>
    );
  },
);
PreparationScore.displayName = "PreparationScore";

export { PreparationScore };
export type { PreparationScoreProps };
