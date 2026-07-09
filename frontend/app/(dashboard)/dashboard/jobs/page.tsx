"use client";

import { useCallback, useEffect, useState } from "react";

import { JobFilterPanel } from "@/components/jobs/job-filter-panel";
import { JobQuickActions } from "@/components/jobs/job-quick-actions";
import { JobResultsLayout } from "@/components/jobs/job-results-layout";
import { JobSearchBar } from "@/components/jobs/job-search-bar";
import { JobSearchHeader } from "@/components/jobs/job-search-header";
import { useJobSearchStore } from "@/stores/job-search-store";

export default function JobsPage() {
  const loadJobs = useJobSearchStore((s) => s.loadJobs);
  const showFilters = useJobSearchStore((s) => s.showFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const handleCloseMobileFilters = useCallback(() => {
    setMobileFiltersOpen(false);
  }, []);

  return (
    <div className="min-h-0 flex-1">
      <div className="mx-auto w-full max-w-screen-2xl px-5 py-6 md:px-7 md:py-8 lg:px-8 lg:py-10">
        <div className="space-y-6">
          <JobSearchHeader />

          <div className="flex items-start gap-6">
            <div className="flex-1 min-w-0 space-y-4">
              <JobSearchBar />

              <div className="flex items-center gap-2">
                <JobQuickActions />
              </div>

              <div className="lg:hidden">
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                  className="flex items-center gap-2 text-caption text-secondary hover:text-primary transition-colors"
                  aria-expanded={mobileFiltersOpen}
                >
                  <span>Filters &amp; Saved Jobs</span>
                  <svg
                    className={clsx(
                      "h-4 w-4 transition-transform",
                      mobileFiltersOpen && "rotate-180"
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {mobileFiltersOpen && (
                  <div className="mt-4 space-y-4">
                    <JobFilterPanel mobile onClose={handleCloseMobileFilters} />
                  </div>
                )}
              </div>

              <JobResultsLayout />
            </div>

            {showFilters && (
              <div className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-24">
                <JobFilterPanel />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function clsx(...inputs: (string | false | null | undefined)[]) {
  return inputs.filter(Boolean).join(" ");
}
