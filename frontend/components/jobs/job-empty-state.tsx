"use client";

import { Search, SearchX } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Button } from "@/components/foundation/button";
import { cn } from "@/lib/utils";

interface JobEmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  type: "empty" | "no-results";
  searchQuery?: string;
  onResetFilters?: () => void;
  onStartSearch?: () => void;
}

const JobEmptyState = forwardRef<HTMLDivElement, JobEmptyStateProps>(
  ({ className, type, searchQuery, onResetFilters, onStartSearch, ...props }, ref) => {
    const isNoResults = type === "no-results";

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center py-16 px-6 text-center",
          className
        )}
        {...props}
      >
        <div
          className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-1"
          aria-hidden="true"
        >
          {isNoResults ? (
            <SearchX className="h-8 w-8 text-tertiary" />
          ) : (
            <Search className="h-8 w-8 text-tertiary" />
          )}
        </div>

        <h3 className="text-heading-4 text-primary mb-2">
          {isNoResults ? "No matching jobs found" : "Start your job search"}
        </h3>

        <p className="text-body text-secondary max-w-md mb-6">
          {isNoResults
            ? `We couldn't find any jobs${searchQuery ? ` for "${searchQuery}"` : ""} matching your current filters. Try adjusting your search terms or filters.`
            : "Use the search bar above to find jobs that match your profile. You can filter by role, location, experience level, and more."}
        </p>

        <div className="flex gap-3">
          {isNoResults && onResetFilters && (
            <Button variant="outline" size="sm" onClick={onResetFilters}>
              Reset Filters
            </Button>
          )}
          {!isNoResults && onStartSearch && (
            <Button variant="primary" size="sm" onClick={onStartSearch}>
              Browse All Jobs
            </Button>
          )}
        </div>
      </div>
    );
  }
);
JobEmptyState.displayName = "JobEmptyState";

export { JobEmptyState };
export type { JobEmptyStateProps };
