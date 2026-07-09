"use client";

import {
  Calendar,
  Clock,
  Flag,
  MapPin,
  Sparkles,
  Target,
} from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { ProgressBar } from "@/components/feedback/progress-bar";
import { Badge } from "@/components/foundation/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";

export interface RoadmapProgressProps extends HTMLAttributes<HTMLDivElement> {
  overallCompletion: number;
  estimatedFinishDate: string;
  currentStage: string;
  targetCareer: string;
  learningHoursRemaining: number;
  aiConfidence: number;
}

const RoadmapProgress = forwardRef<HTMLDivElement, RoadmapProgressProps>(
  (
    {
      className,
      overallCompletion,
      estimatedFinishDate,
      currentStage,
      targetCareer,
      learningHoursRemaining,
      aiConfidence,
      ...props
    },
    ref
  ) => {
    const progressColor =
      overallCompletion >= 80
        ? "text-success"
        : overallCompletion >= 60
        ? "text-ai"
        : "text-warning";

    const progressVariant =
      overallCompletion >= 80
        ? "success"
        : overallCompletion >= 60
        ? "ai"
        : "warning";

    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("h-full", className)}
        role="region"
        aria-label="Roadmap progress overview"
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-ai" aria-hidden="true" />
            <CardTitle>Roadmap Progress</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-body-small text-secondary">
                Overall completion
              </span>
              <span
                className={cn(
                  "text-heading-3 font-bold",
                  progressColor
                )}
              >
                {overallCompletion}%
              </span>
            </div>
            <ProgressBar
              value={overallCompletion}
              variant={progressVariant}
              size="lg"
              animated
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-xl border border-border bg-surface-0 p-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ai/10"
                aria-hidden="true"
              >
                <Calendar className="h-4 w-4 text-ai" />
              </div>
              <div>
                <p className="text-caption text-tertiary">Estimated finish</p>
                <p className="text-label font-semibold text-primary">
                  {estimatedFinishDate}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-border bg-surface-0 p-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-info/10"
                aria-hidden="true"
              >
                <Flag className="h-4 w-4 text-info" />
              </div>
              <div>
                <p className="text-caption text-tertiary">Current stage</p>
                <p className="text-label font-semibold text-primary line-clamp-1">
                  {currentStage}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-border bg-surface-0 p-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success/10"
                aria-hidden="true"
              >
                <MapPin className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-caption text-tertiary">Target career</p>
                <p className="text-label font-semibold text-primary line-clamp-1">
                  {targetCareer}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-border bg-surface-0 p-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-warning/10"
                aria-hidden="true"
              >
                <Clock className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="text-caption text-tertiary">Hours remaining</p>
                <p className="text-label font-semibold text-primary">
                  {learningHoursRemaining}h
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-ai/30 bg-ai/5 p-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-ai" aria-hidden="true" />
              <span className="text-caption text-ai font-semibold uppercase tracking-wider">
                AI Confidence
              </span>
              <Badge variant="ai" size="xs">
                {aiConfidence}%
              </Badge>
            </div>
            <p className="text-body-small text-secondary mt-1">
              This roadmap is based on your profile, target role, and current market demand.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
);
RoadmapProgress.displayName = "RoadmapProgress";

export { RoadmapProgress };
