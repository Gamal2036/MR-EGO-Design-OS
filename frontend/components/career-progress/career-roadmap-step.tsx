"use client";

import { Check, Lock } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { roadmapPhaseConfig } from "@/data/career-progress";
import { cn } from "@/lib/utils";
import type { RoadmapStep } from "@/types/career-progress";

export interface CareerRoadmapStepProps extends HTMLAttributes<HTMLDivElement> {
  step: RoadmapStep;
  isLast?: boolean;
}

const CareerRoadmapStep = forwardRef<HTMLDivElement, CareerRoadmapStepProps>(
  ({ className, step, isLast = false, ...props }, ref) => {
    const phaseConfig = roadmapPhaseConfig[step.phase];

    return (
      <div
        ref={ref}
        className={cn("relative flex gap-4", className)}
        role="listitem"
        aria-label={`${step.title}: ${step.completed ? "Completed" : step.current ? "Current" : step.locked ? "Locked" : "Available"}`}
        {...props}
      >
        <div className="flex flex-col items-center">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
              step.completed
                ? "border-success bg-success text-success-foreground"
                : step.current
                ? "border-ai bg-ai text-ai-foreground"
                : step.locked
                ? "border-border bg-surface-1 text-tertiary"
                : "border-info bg-surface-1 text-info"
            )}
            aria-hidden="true"
          >
            {step.completed ? (
              <Check className="h-5 w-5" />
            ) : step.locked ? (
              <Lock className="h-4 w-4" />
            ) : (
              <span className="text-label font-semibold">
                {step.title.charAt(0)}
              </span>
            )}
          </div>
          {!isLast && (
            <div
              className={cn(
                "mt-2 h-full w-0.5 min-h-[2rem]",
                step.completed ? "bg-success/50" : "bg-border"
              )}
              aria-hidden="true"
            />
          )}
        </div>

        <div className="flex-1 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={cn(
                "text-heading-4 font-semibold",
                step.locked ? "text-tertiary" : "text-primary"
              )}
            >
              {step.title}
            </h3>
            <Badge
              variant={
                step.completed
                  ? "success"
                  : step.current
                  ? "ai"
                  : step.locked
                  ? "neutral"
                  : "info"
              }
              size="xs"
            >
              {step.completed
                ? "Completed"
                : step.current
                ? "Current"
                : step.locked
                ? "Locked"
                : "Available"}
            </Badge>
            <Badge variant="outline" size="xs" className={phaseConfig.color}>
              {phaseConfig.label}
            </Badge>
          </div>
          <p
            className={cn(
              "text-body-small mt-1",
              step.locked ? "text-tertiary" : "text-secondary"
            )}
          >
            {step.description}
          </p>
        </div>
      </div>
    );
  }
);
CareerRoadmapStep.displayName = "CareerRoadmapStep";

export { CareerRoadmapStep };
