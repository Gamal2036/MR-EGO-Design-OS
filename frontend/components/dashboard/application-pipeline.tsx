"use client";

import { type HTMLAttributes, forwardRef } from "react";

import type { ApplicationStage } from "@/data/dashboard";
import { cn } from "@/lib/utils";

interface ApplicationPipelineProps extends HTMLAttributes<HTMLDivElement> {
  stages: ApplicationStage[];
  total?: number;
}

const stageColors: Record<string, string> = {
  prepared: "bg-neutral-300 dark:bg-neutral-600",
  sent: "bg-info",
  waiting: "bg-warning",
  interview: "bg-ai",
  accepted: "bg-success",
  rejected: "bg-danger",
};

const ApplicationPipeline = forwardRef<HTMLDivElement, ApplicationPipelineProps>(
  ({ className, stages, total, ...props }, ref) => {
    const maxCount = Math.max(...stages.map((s) => s.count), 1);

    return (
      <section
        ref={ref}
        className={cn("", className)}
        role="region"
        aria-label="Application Pipeline"
        {...props}
      >
        <h2 className="text-heading-4 text-primary mb-4">Application Pipeline</h2>
        <div className="space-y-3">
          {stages.map((stage) => {
            const percentage = (stage.count / maxCount) * 100;
            return (
              <div key={stage.stage} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-body-small text-secondary">
                    {stage.label}
                  </span>
                  <span className="text-caption font-medium text-primary">
                    {stage.count}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-normal",
                      stageColors[stage.stage] || "bg-neutral-400"
                    )}
                    style={{ width: `${percentage}%` }}
                    role="progressbar"
                    aria-valuenow={stage.count}
                    aria-valuemin={0}
                    aria-valuemax={maxCount}
                    aria-label={`${stage.label}: ${stage.count}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
        {total !== undefined && (
          <p className="text-caption text-tertiary mt-3">
            {total} total applications
          </p>
        )}
      </section>
    );
  }
);
ApplicationPipeline.displayName = "ApplicationPipeline";

export { ApplicationPipeline };
export type { ApplicationPipelineProps };
