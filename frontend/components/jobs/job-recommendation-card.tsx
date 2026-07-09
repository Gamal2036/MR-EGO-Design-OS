"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Button } from "@/components/foundation/button";
import { Card, CardContent } from "@/components/foundation/card";
import { JobMatchScore } from "@/components/jobs/job-match-score";
import { cn } from "@/lib/utils";
import type { Job } from "@/types/job-search";

interface JobRecommendationCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  job: Job;
  onSelect: (job: Job) => void;
}

const JobRecommendationCard = forwardRef<HTMLDivElement, JobRecommendationCardProps>(
  ({ className, job, onSelect, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="ai"
        padding="md"
        className={cn("group cursor-pointer transition-all duration-normal", className)}
        role="article"
        aria-label={`Recommended: ${job.title} at ${job.company}`}
        tabIndex={0}
        onClick={() => onSelect(job)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(job);
          }
        }}
        {...props}
      >
        <CardContent>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-ai" aria-hidden="true" />
              <span className="text-smallest font-semibold uppercase tracking-wider text-ai">
                AI Recommended
              </span>
            </div>
            <JobMatchScore score={job.matchScore} size="sm" showLabel={false} />
          </div>

          <h4 className="text-label font-semibold text-primary truncate mt-1">
            {job.title}
          </h4>
          <p className="text-body-small text-secondary">{job.company}</p>

          <p className="text-caption text-tertiary mt-1.5 line-clamp-2">
            {job.matchExplanation}
          </p>

          <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/50">
            <span className="text-caption font-medium text-primary">{job.salaryLabel}</span>
            <Button
              variant="ghost"
              size="xs"
              className="text-caption text-ai hover:text-ai"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(job);
              }}
              rightIcon={<ArrowRight className="h-3 w-3" />}
              aria-label={`View ${job.title}`}
            >
              View
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
);
JobRecommendationCard.displayName = "JobRecommendationCard";

export { JobRecommendationCard };
export type { JobRecommendationCardProps };
