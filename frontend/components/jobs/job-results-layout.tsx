"use client";

import { LayoutGrid, LayoutList, Sparkles } from "lucide-react";
import { forwardRef, useCallback, useMemo } from "react";

import { Button } from "@/components/foundation/button";
import { JobCompareBar } from "@/components/jobs/job-compare-bar";
import { JobDetailPanel } from "@/components/jobs/job-detail-panel";
import { JobEmptyState } from "@/components/jobs/job-empty-state";
import { JobErrorState } from "@/components/jobs/job-error-state";
import { JobInsightPanel } from "@/components/jobs/job-insight-panel";
import { JobLoadingState } from "@/components/jobs/job-loading-state";
import { JobRecommendationCard } from "@/components/jobs/job-recommendation-card";
import { JobResultCard } from "@/components/jobs/job-result-card";
import { SavedJobsPanel } from "@/components/jobs/saved-jobs-panel";
import { cn } from "@/lib/utils";
import { useJobSearchStore } from "@/stores/job-search-store";

const JobResultsLayout = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const filteredJobs = useJobSearchStore((s) => s.filteredJobs);
    const jobs = useJobSearchStore((s) => s.jobs);
    const selectedJob = useJobSearchStore((s) => s.selectedJob);
    const savedJobIds = useJobSearchStore((s) => s.savedJobIds);
    const comparedJobIds = useJobSearchStore((s) => s.comparedJobIds);
    const viewMode = useJobSearchStore((s) => s.viewMode);
    const state = useJobSearchStore((s) => s.state);
    const detailPanelOpen = useJobSearchStore((s) => s.detailPanelOpen);

    const selectJob = useJobSearchStore((s) => s.selectJob);
    const toggleSaveJob = useJobSearchStore((s) => s.toggleSaveJob);
    const toggleCompareJob = useJobSearchStore((s) => s.toggleCompareJob);
    const clearCompared = useJobSearchStore((s) => s.clearCompared);
    const setViewMode = useJobSearchStore((s) => s.setViewMode);
    const setDetailPanelOpen = useJobSearchStore((s) => s.setDetailPanelOpen);
    const resetFilters = useJobSearchStore((s) => s.resetFilters);
    const performSearch = useJobSearchStore((s) => s.performSearch);
    const searchQuery = useJobSearchStore((s) => s.searchQuery);

    const savedJobs = useMemo(
      () => jobs.filter((j) => savedJobIds.includes(j.id)),
      [jobs, savedJobIds]
    );

    const comparedJobs = useMemo(
      () => jobs.filter((j) => comparedJobIds.includes(j.id)),
      [jobs, comparedJobIds]
    );

    const recommendedJobs = useMemo(
      () => filteredJobs.filter((j) => j.matchScore >= 75).slice(0, 3),
      [filteredJobs]
    );

    const handleSelectJob = useCallback(
      (job: (typeof jobs)[0]) => {
        selectJob(job);
        setDetailPanelOpen(true);
      },
      [selectJob, setDetailPanelOpen]
    );

    const handleSaveJob = useCallback(
      (jobId: string) => {
        toggleSaveJob(jobId);
      },
      [toggleSaveJob]
    );

    const handleCompareJob = useCallback(
      (jobId: string) => {
        toggleCompareJob(jobId);
      },
      [toggleCompareJob]
    );

    const handleCloseDetail = useCallback(() => {
      setDetailPanelOpen(false);
      selectJob(null);
    }, [setDetailPanelOpen, selectJob]);

    return (
      <div
        ref={ref}
        className={cn("flex flex-1 w-full", className)}
        {...props}
      >
        <div
          className={cn(
            "flex-1 min-w-0 transition-all duration-normal",
            detailPanelOpen && "lg:w-1/2 xl:w-3/5"
          )}
        >
          <div className="space-y-4">
            {recommendedJobs.length > 0 && (
              <section aria-label="Recommended jobs">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-ai" aria-hidden="true" />
                  <h2 className="text-label font-semibold text-primary">AI Recommended</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {recommendedJobs.map((job) => (
                    <JobRecommendationCard
                      key={job.id}
                      job={job}
                      onSelect={handleSelectJob}
                    />
                  ))}
                </div>
              </section>
            )}

            <div className="flex items-center justify-between">
              <p className="text-caption text-secondary">
                {state === "results"
                  ? `${filteredJobs.length} job${filteredJobs.length !== 1 ? "s" : ""} found`
                  : " "}
              </p>
              <div className="flex items-center gap-1 rounded-lg border border-border bg-surface-0 p-0.5">
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="xs"
                  className="h-7 w-7 p-0"
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                  aria-pressed={viewMode === "list"}
                >
                  <LayoutList className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="xs"
                  className="h-7 w-7 p-0"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                  aria-pressed={viewMode === "grid"}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            {state === "searching" && <JobLoadingState count={3} />}

            {state === "error" && (
              <JobErrorState onRetry={() => performSearch()} />
            )}

            {state === "empty" && (
              <JobEmptyState
                type="empty"
                onStartSearch={() => performSearch()}
              />
            )}

            {state === "no-results" && (
              <JobEmptyState
                type="no-results"
                searchQuery={searchQuery}
                onResetFilters={resetFilters}
              />
            )}

            {state === "results" && (
              <div
                className={cn(
                  "gap-3",
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : "space-y-3"
                )}
              >
                {filteredJobs.map((job) => (
                  <JobResultCard
                    key={job.id}
                    job={job}
                    isSaved={savedJobIds.includes(job.id)}
                    isCompared={comparedJobIds.includes(job.id)}
                    viewMode={viewMode}
                    onSelect={handleSelectJob}
                    onSave={handleSaveJob}
                    onCompare={handleCompareJob}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div
          className={cn(
            "hidden lg:block w-80 xl:w-96 shrink-0 ml-4 space-y-4",
            detailPanelOpen ? "hidden xl:hidden" : ""
          )}
        >
          <SavedJobsPanel
            savedJobs={savedJobs}
            onSelect={handleSelectJob}
            onRemove={handleSaveJob}
          />
          <JobInsightPanel job={selectedJob} />
        </div>

        {detailPanelOpen && selectedJob && (
          <div
            className={cn(
              "hidden lg:block w-96 xl:w-[480px] shrink-0 ml-4",
              "border-l border-border"
            )}
          >
            <JobDetailPanel
              job={selectedJob}
              isSaved={savedJobIds.includes(selectedJob.id)}
              onClose={handleCloseDetail}
              onSave={handleSaveJob}
            />
          </div>
        )}

        {/* Mobile detail panel (full screen) */}
        {detailPanelOpen && selectedJob && (
          <div className="fixed inset-0 z-modal bg-background lg:hidden">
            <JobDetailPanel
              job={selectedJob}
              isSaved={savedJobIds.includes(selectedJob.id)}
              onClose={handleCloseDetail}
              onSave={handleSaveJob}
              fullScreen
            />
          </div>
        )}

        <JobCompareBar
          comparedJobs={comparedJobs}
          onRemove={(id) => toggleCompareJob(id)}
          onClear={clearCompared}
        />
      </div>
    );
  }
);
JobResultsLayout.displayName = "JobResultsLayout";

export { JobResultsLayout };
