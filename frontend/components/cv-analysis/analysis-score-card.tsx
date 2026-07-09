"use client";

import {
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  AlertOctagon,
  type LucideIcon,
} from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { analysisStatusConfig } from "@/data/cv-analysis";
import { cn } from "@/lib/utils";
import type { AnalysisStatus } from "@/types/cv-analysis";

export interface AnalysisScoreCardProps extends HTMLAttributes<HTMLDivElement> {
  overallScore: number;
  status: AnalysisStatus;
  riskLevel: "low" | "medium" | "high";
  jobReadiness: number;
  interviewReadiness: number;
  careerLevel: string;
}

const statusIcons: Record<AnalysisStatus, LucideIcon> = {
  excellent: TrendingUp,
  good: TrendingUp,
  average: AlertTriangle,
  "needs-improvement": AlertTriangle,
  critical: AlertTriangle,
};

function getScoreColor(score: number): string {
  if (score >= 80) return "text-success";
  if (score >= 60) return "text-ai";
  if (score >= 40) return "text-warning";
  return "text-danger";
}

function getScoreRingColor(score: number): string {
  if (score >= 80) return "stroke-success";
  if (score >= 60) return "stroke-ai";
  if (score >= 40) return "stroke-warning";
  return "stroke-danger";
}

const AnalysisScoreCard = forwardRef<HTMLDivElement, AnalysisScoreCardProps>(
  (
    {
      className,
      overallScore,
      status,
      riskLevel,
      jobReadiness,
      interviewReadiness,
      careerLevel,
      ...props
    },
    ref
  ) => {
    const statusConfig = analysisStatusConfig[status];
    const StatusIcon = statusIcons[status];
    const RiskIcon: LucideIcon = riskLevel === "low" ? ShieldCheck : riskLevel === "medium" ? ShieldAlert : AlertOctagon;
    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (overallScore / 100) * circumference;

    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("", className)}
        role="region"
        aria-label="Analysis score overview"
        {...props}
      >
        <CardHeader>
          <CardTitle>Analysis Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <div
                className="relative flex items-center justify-center"
                role="img"
                aria-label={`Overall score: ${overallScore} out of 100`}
              >
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
                      getScoreRingColor(overallScore)
                    )}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span
                    className={cn(
                      "text-heading-1 font-bold",
                      getScoreColor(overallScore)
                    )}
                  >
                    {overallScore}
                  </span>
                  <span className="text-caption text-tertiary">/ 100</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <StatusIcon
                  className={cn("h-4 w-4", statusConfig.color)}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    "text-label font-medium",
                    statusConfig.color
                  )}
                >
                  {statusConfig.label}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-border bg-surface-0 p-3">
                <span className="text-caption text-tertiary">
                  Job Readiness
                </span>
                <p
                  className={cn(
                    "text-heading-3 font-semibold",
                    getScoreColor(jobReadiness)
                  )}
                >
                  {jobReadiness}%
                </p>
              </div>
              <div className="rounded-lg border border-border bg-surface-0 p-3">
                <span className="text-caption text-tertiary">
                  Interview Ready
                </span>
                <p
                  className={cn(
                    "text-heading-3 font-semibold",
                    getScoreColor(interviewReadiness)
                  )}
                >
                  {interviewReadiness}%
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="neutral" size="sm">
                {careerLevel}
              </Badge>
              <div
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-smallest font-medium",
                  riskLevel === "low"
                    ? "bg-success/10 text-success"
                    : riskLevel === "medium"
                      ? "bg-warning/10 text-warning"
                      : "bg-danger/10 text-danger"
                )}
              >
                <RiskIcon className="h-3 w-3" aria-hidden="true" />
                {riskLevel === "low"
                  ? "Low Risk"
                  : riskLevel === "medium"
                    ? "Medium Risk"
                    : "High Risk"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);
AnalysisScoreCard.displayName = "AnalysisScoreCard";

export { AnalysisScoreCard };
