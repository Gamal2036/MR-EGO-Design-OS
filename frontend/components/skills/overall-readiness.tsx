"use client";

import { TrendingUp } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";

interface OverallReadinessProps extends HTMLAttributes<HTMLDivElement> {
  score: number;
}

function getScoreColor(score: number): string {
  if (score >= 80) return "text-success";
  if (score >= 60) return "text-ai";
  if (score >= 40) return "text-warning";
  return "text-danger";
}

function getRingColor(score: number): string {
  if (score >= 80) return "stroke-success";
  if (score >= 60) return "stroke-ai";
  if (score >= 40) return "stroke-warning";
  return "stroke-danger";
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Strong";
  if (score >= 40) return "Developing";
  return "Needs Work";
}

const OverallReadiness = forwardRef<HTMLDivElement, OverallReadinessProps>(
  ({ className, score, ...props }, ref) => {
    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (score / 100) * circumference;

    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("", className)}
        role="region"
        aria-label={`Overall Readiness: ${score}%`}
        {...props}
      >
        <CardHeader>
          <CardTitle>Overall Readiness</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-3">
            <div className="relative flex items-center justify-center" role="img" aria-label={`Overall readiness score: ${score} out of 100`}>
              <svg
                width="140"
                height="140"
                viewBox="0 0 128 128"
                className="-rotate-90"
                aria-hidden="true"
              >
                <circle
                  cx="64"
                  cy="64"
                  r="54"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-neutral-200 dark:text-neutral-700"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="54"
                  fill="none"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className={cn(
                    "transition-all duration-xx-slow ease-out-custom",
                    getRingColor(score)
                  )}
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span
                  className={cn(
                    "text-display font-bold",
                    getScoreColor(score)
                  )}
                >
                  {score}
                </span>
                <span className="text-caption text-tertiary">/ 100</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className={cn("h-4 w-4", getScoreColor(score))} aria-hidden="true" />
              <span className={cn("text-label font-medium", getScoreColor(score))}>
                {getScoreLabel(score)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);
OverallReadiness.displayName = "OverallReadiness";

export { OverallReadiness };
export type { OverallReadinessProps };
