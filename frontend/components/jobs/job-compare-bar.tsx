"use client";

import { X, BarChart3 } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Button } from "@/components/foundation/button";
import { JobMatchScore } from "@/components/jobs/job-match-score";
import { cn } from "@/lib/utils";
import type { Job } from "@/types/job-search";

interface JobCompareBarProps extends HTMLAttributes<HTMLDivElement> {
  comparedJobs: Job[];
  onRemove: (jobId: string) => void;
  onClear: () => void;
}

const JobCompareBar = forwardRef<HTMLDivElement, JobCompareBarProps>(
  ({ className, comparedJobs, onRemove, onClear, ...props }, ref) => {
    if (comparedJobs.length === 0) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-sticky border-t border-border bg-surface-1/95 backdrop-blur-md shadow-strong",
          "lg:left-16",
          className
        )}
        role="region"
        aria-label="Job comparison bar"
        {...props}
      >
        <div className="mx-auto flex max-w-screen-2xl items-center gap-4 px-5 py-3">
          <div className="flex items-center gap-2 shrink-0">
            <BarChart3 className="h-4 w-4 text-ai" aria-hidden="true" />
            <span className="text-caption font-medium text-primary">
              Compare ({comparedJobs.length}/3)
            </span>
          </div>

          <div className="flex items-center gap-2 flex-1 overflow-x-auto">
            {comparedJobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center gap-2 shrink-0 rounded-lg border border-border bg-surface-0 px-3 py-1.5"
              >
                <JobMatchScore score={job.matchScore} size="sm" showLabel={false} />
                <div className="min-w-0 max-w-[160px]">
                  <p className="text-smallest font-medium text-primary truncate">{job.title}</p>
                  <p className="text-smallest text-tertiary truncate">{job.company}</p>
                </div>
                <Button
                  variant="ghost"
                  size="xs"
                  className="h-5 w-5 p-0 ml-1 text-tertiary hover:text-primary"
                  onClick={() => onRemove(job.id)}
                  aria-label={`Remove ${job.title} from comparison`}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={onClear} className="text-caption">
              Clear All
            </Button>
            <Button variant="primary" size="sm" className="text-caption" disabled>
              Compare
              <span className="text-caption opacity-70 ml-1">(Soon)</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }
);
JobCompareBar.displayName = "JobCompareBar";

export { JobCompareBar };
export type { JobCompareBarProps };
