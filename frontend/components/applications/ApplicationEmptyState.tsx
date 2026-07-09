"use client";

import { Briefcase, Search, SlidersHorizontal } from "lucide-react";
import type { HTMLAttributes } from "react";

import { Button } from "@/components/foundation/button";

interface ApplicationEmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  hasFilters?: boolean;
  onResetFilters?: () => void;
}

export function ApplicationEmptyState({
  hasFilters = false,
  onResetFilters,
  className,
  ...props
}: ApplicationEmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 py-16 px-6 text-center ${className || ""}`}
      role="status"
      {...props}
    >
      <div className="rounded-full bg-surface-0 p-4 border border-border">
        {hasFilters ? (
          <SlidersHorizontal className="h-8 w-8 text-tertiary" aria-hidden="true" />
        ) : (
          <Briefcase className="h-8 w-8 text-tertiary" aria-hidden="true" />
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-heading-4 text-primary">
          {hasFilters ? "No matching applications" : "No applications yet"}
        </h3>
        <p className="text-body text-secondary max-w-sm">
          {hasFilters
            ? "Try adjusting your filters or search query to find what you're looking for."
            : "Start tracking your job applications here. Add your first application to begin."}
        </p>
      </div>
      {hasFilters && onResetFilters && (
        <Button variant="outline" size="sm" onClick={onResetFilters}>
          <Search className="h-4 w-4 mr-1.5" aria-hidden="true" />
          Reset Filters
        </Button>
      )}
    </div>
  );
}
