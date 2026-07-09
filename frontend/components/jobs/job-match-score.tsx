"use client";

import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

interface JobMatchScoreProps extends HTMLAttributes<HTMLDivElement> {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

function getScoreColor(score: number): string {
  if (score >= 90) return "text-success";
  if (score >= 75) return "text-cyan-400";
  if (score >= 60) return "text-warning";
  if (score >= 40) return "text-warning/70";
  return "text-tertiary";
}

function getScoreBg(score: number): string {
  if (score >= 90) return "bg-success/10 border-success/20";
  if (score >= 75) return "bg-cyan-500/10 border-cyan-500/20";
  if (score >= 60) return "bg-warning/10 border-warning/20";
  if (score >= 40) return "bg-warning/5 border-warning/10";
  return "bg-surface-1 border-border";
}

function getScoreRing(score: number): string {
  if (score >= 90) return "stroke-success";
  if (score >= 75) return "stroke-cyan-400";
  if (score >= 60) return "stroke-warning";
  if (score >= 40) return "stroke-warning/50";
  return "stroke-tertiary";
}

const JobMatchScore = forwardRef<HTMLDivElement, JobMatchScoreProps>(
  ({ className, score, size = "md", showLabel = true, ...props }, ref) => {
    const dimensions = size === "sm" ? 36 : size === "lg" ? 64 : 48;
    const strokeWidth = size === "sm" ? 2 : size === "lg" ? 3 : 2.5;
    const radius = (dimensions - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    const fontSize = size === "sm" ? "0.6rem" : size === "lg" ? "0.85rem" : "0.7rem";

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2",
          size === "lg" && "flex-col",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "relative inline-flex items-center justify-center rounded-full",
            getScoreBg(score)
          )}
          style={{ width: dimensions, height: dimensions }}
          role="meter"
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Match score: ${score}%`}
        >
          <svg
            width={dimensions}
            height={dimensions}
            className="absolute inset-0 -rotate-90"
            aria-hidden="true"
          >
            <circle
              cx={dimensions / 2}
              cy={dimensions / 2}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              className="text-border opacity-50"
            />
            <circle
              cx={dimensions / 2}
              cy={dimensions / 2}
              r={radius}
              fill="none"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              className={cn("transition-all duration-x-slow", getScoreRing(score))}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <span
            className={cn("font-semibold", getScoreColor(score))}
            style={{ fontSize }}
          >
            {score}%
          </span>
        </div>
        {showLabel && (
          <span
            className={cn(
              "font-medium",
              size === "sm" ? "text-smallest" : "text-caption",
              getScoreColor(score)
            )}
          >
            Match
          </span>
        )}
      </div>
    );
  }
);
JobMatchScore.displayName = "JobMatchScore";

export { JobMatchScore };
export type { JobMatchScoreProps };
