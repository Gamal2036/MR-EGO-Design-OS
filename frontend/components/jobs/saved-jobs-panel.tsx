"use client";

import { BookmarkCheck, BookmarkX } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Button } from "@/components/foundation/button";
import { Panel, PanelBody, PanelHeader } from "@/components/foundation/panel";
import { JobMatchScore } from "@/components/jobs/job-match-score";
import { cn } from "@/lib/utils";
import type { Job } from "@/types/job-search";

interface SavedJobsPanelProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  savedJobs: Job[];
  onSelect: (job: Job) => void;
  onRemove: (jobId: string) => void;
}

const SavedJobsPanel = forwardRef<HTMLDivElement, SavedJobsPanelProps>(
  ({ className, savedJobs, onSelect, onRemove, ...props }, ref) => {
    return (
      <Panel
        ref={ref}
        variant="default"
        padding="md"
        className={cn("", className)}
        {...props}
      >
        <PanelHeader>
          <div className="flex items-center gap-2">
            <BookmarkCheck className="h-4 w-4 text-primary" aria-hidden="true" />
            <span>Saved Jobs</span>
            <span className="text-caption text-tertiary">({savedJobs.length})</span>
          </div>
        </PanelHeader>
        <PanelBody>
          {savedJobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div
                className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-surface-0"
                aria-hidden="true"
              >
                <BookmarkX className="h-6 w-6 text-tertiary" />
              </div>
              <p className="text-body text-secondary">No saved jobs yet</p>
              <p className="text-caption text-tertiary mt-1">
                Save jobs you&apos;re interested in to revisit them later
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {savedJobs.map((job) => (
                <div
                  key={job.id}
                  className="group flex items-center gap-3 rounded-lg border border-border bg-surface-0 p-3 transition-all duration-normal hover:border-hover hover:bg-surface-1 cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelect(job)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(job);
                    }
                  }}
                  aria-label={`View ${job.title} at ${job.company}`}
                >
                  <JobMatchScore score={job.matchScore} size="sm" showLabel={false} />
                  <div className="flex-1 min-w-0">
                    <p className="text-caption font-medium text-primary truncate">{job.title}</p>
                    <p className="text-smallest text-tertiary truncate">{job.company}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="xs"
                    className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(job.id);
                    }}
                    aria-label={`Remove ${job.title} from saved`}
                  >
                    <BookmarkX className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </PanelBody>
      </Panel>
    );
  }
);
SavedJobsPanel.displayName = "SavedJobsPanel";

export { SavedJobsPanel };
export type { SavedJobsPanelProps };
