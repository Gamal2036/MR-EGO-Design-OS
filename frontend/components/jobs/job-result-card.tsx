"use client";

import {
  Bookmark,
  BookmarkCheck,
  Building2,
  ChevronRight,
  Clock,
  GitCompare,
  MapPin,
} from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Button } from "@/components/foundation/button";
import { Card, CardContent } from "@/components/foundation/card";
import { Chip } from "@/components/foundation/chip";
import { JobMatchScore } from "@/components/jobs/job-match-score";
import { JobSkillMatch } from "@/components/jobs/job-skill-match";
import { JobStatusBadge, type JobStatusType } from "@/components/jobs/job-status-badge";
import { cn } from "@/lib/utils";
import type { Job } from "@/types/job-search";

interface JobResultCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  job: Job;
  isSaved: boolean;
  isCompared: boolean;
  viewMode?: "list" | "grid";
  onSelect: (job: Job) => void;
  onSave: (jobId: string) => void;
  onCompare: (jobId: string) => void;
}

function getJobStatus(job: Job): JobStatusType | null {
  if (job.isRecommended) return "recommended";
  return null;
}

function timeAgo(dateStr: string): string {
  return dateStr;
}

const JobResultCard = forwardRef<HTMLDivElement, JobResultCardProps>(
  (
    {
      className,
      job,
      isSaved,
      isCompared,
      viewMode = "list",
      onSelect,
      onSave,
      onCompare,
      ...props
    },
    ref
  ) => {
    const status = getJobStatus(job);
    const isGrid = viewMode === "grid";

    return (
      <Card
        ref={ref}
        variant="interactive"
        padding="md"
        className={cn(
          "group relative transition-all duration-normal",
          isGrid && "flex flex-col",
          className
        )}
        role="article"
        aria-label={`${job.title} at ${job.company}`}
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
        <CardContent className={cn(isGrid ? "flex flex-col h-full" : "")}>
          <div className={cn("flex items-start gap-4", isGrid && "flex-col")}>
            <div className={cn("flex-1 min-w-0", isGrid && "w-full")}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    {status && <JobStatusBadge status={status} />}
                    <h3 className="text-label font-semibold text-primary truncate">
                      {job.title}
                    </h3>
                  </div>
                  <p className="text-body-small text-secondary flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {job.company}
                  </p>
                </div>
                <div className={cn("shrink-0", isGrid && "hidden")}>
                  <JobMatchScore score={job.matchScore} size="md" />
                </div>
              </div>

              <div className={cn("flex flex-wrap items-center gap-2 mt-2 text-caption text-tertiary", isGrid && "flex-col items-start")}>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {job.location}
                </span>
                <span className="hidden sm:inline text-tertiary" aria-hidden="true">·</span>
                <span className="flex items-center gap-1 capitalize">
                  {job.contractType.replace("-", " ")}
                </span>
                <span className="hidden sm:inline text-tertiary" aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {timeAgo(job.postedDate)}
                </span>
              </div>

              {job.salaryLabel && (
                <p className="text-caption font-medium text-primary mt-1.5">
                  {job.salaryLabel}
                </p>
              )}

              <div className="flex flex-wrap gap-1.5 mt-2">
                {job.tags.slice(0, isGrid ? 2 : 4).map((tag) => (
                  <Chip key={tag} variant="neutral" size="sm">{tag}</Chip>
                ))}
                {job.tags.length > (isGrid ? 2 : 4) && (
                  <span className="text-smallest text-tertiary self-center">
                    +{job.tags.length - (isGrid ? 2 : 4)}
                  </span>
                )}
              </div>

              {!isGrid && (
                <div className="mt-3">
                  <JobSkillMatch
                    matchingSkills={job.matchingSkills}
                    missingSkills={job.missingSkills}
                    compact
                  />
                </div>
              )}
            </div>

            {isGrid && (
              <div className="flex justify-center w-full">
                <JobMatchScore score={job.matchScore} size="lg" />
              </div>
            )}
          </div>

          <div
            className={cn(
              "flex items-center gap-2 mt-4 pt-3 border-t border-border",
              isGrid && "mt-auto"
            )}
          >
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 w-8 p-0",
                isSaved && "text-primary"
              )}
              onClick={(e) => {
                e.stopPropagation();
                onSave(job.id);
              }}
              aria-label={isSaved ? "Remove from saved" : "Save job"}
            >
              {isSaved ? (
                <BookmarkCheck className="h-4 w-4" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 w-8 p-0",
                isCompared && "text-ai"
              )}
              onClick={(e) => {
                e.stopPropagation();
                onCompare(job.id);
              }}
              aria-label={isCompared ? "Remove from comparison" : "Add to comparison"}
              disabled={false}
            >
              <GitCompare className="h-4 w-4" />
            </Button>

            <div className="flex-1" />

            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-caption text-tertiary hover:text-primary"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(job);
              }}
              aria-label={`View details for ${job.title}`}
            >
              Details
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
);
JobResultCard.displayName = "JobResultCard";

export { JobResultCard };
export type { JobResultCardProps };
