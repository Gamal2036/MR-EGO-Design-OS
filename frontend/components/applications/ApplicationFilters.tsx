"use client";

import { RotateCcw } from "lucide-react";
import type { HTMLAttributes } from "react";

import type { ApplicationFilters as FiltersType, ApplicationPriority } from "@/types/application-tracker";
import { APPLICATION_STATUSES } from "@/types/application-tracker";

interface ApplicationFiltersProps extends HTMLAttributes<HTMLDivElement> {
  filters: FiltersType;
  onFilterChange: (filters: Partial<FiltersType>) => void;
  onReset: () => void;
}

export function ApplicationFilters({
  filters,
  onFilterChange,
  onReset,
  className,
  ...props
}: ApplicationFiltersProps) {
  const hasActiveFilters =
    filters.status.length > 0 ||
    filters.priority.length > 0 ||
    filters.dateRange !== "all" ||
    filters.matchScoreMin > 0;

  return (
    <div className={`space-y-4 ${className || ""}`} role="region" aria-label="Application Filters" {...props}>
      <div className="flex items-center justify-between">
        <h3 className="text-label text-primary font-medium">Filters</h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 text-caption text-info hover:text-info/80 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Reset
          </button>
        )}
      </div>

      <fieldset>
        <legend className="text-caption text-secondary mb-2">Status</legend>
        <div className="flex flex-wrap gap-1.5">
          {APPLICATION_STATUSES.map((s) => {
            const isActive = filters.status.includes(s.status);
            return (
              <button
                key={s.status}
                type="button"
                onClick={() => {
                  const next = isActive
                    ? filters.status.filter((st) => st !== s.status)
                    : [...filters.status, s.status];
                  onFilterChange({ status: next });
                }}
                className={`rounded-full px-3 py-1 text-caption border transition-colors ${
                  isActive
                    ? "bg-primary/10 border-primary/30 text-primary"
                    : "border-border text-secondary hover:text-primary hover:border-hover"
                }`}
                aria-pressed={isActive}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-caption text-secondary mb-2">Priority</legend>
        <div className="flex gap-1.5">
          {(["high", "medium", "low"] as ApplicationPriority[]).map((p) => {
            const isActive = filters.priority.includes(p);
            return (
              <button
                key={p}
                type="button"
                onClick={() => {
                  const next = isActive
                    ? filters.priority.filter((pr) => pr !== p)
                    : [...filters.priority, p];
                  onFilterChange({ priority: next });
                }}
                className={`rounded-full px-3 py-1 text-caption border transition-colors ${
                  isActive
                    ? "bg-primary/10 border-primary/30 text-primary"
                    : "border-border text-secondary hover:text-primary hover:border-hover"
                }`}
                aria-pressed={isActive}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-caption text-secondary mb-2">Date Range</legend>
        <div className="flex gap-1.5">
          {[
            { value: "all" as const, label: "All Time" },
            { value: "week" as const, label: "This Week" },
            { value: "month" as const, label: "This Month" },
            { value: "quarter" as const, label: "This Quarter" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onFilterChange({ dateRange: opt.value })}
              className={`rounded-full px-3 py-1 text-caption border transition-colors ${
                filters.dateRange === opt.value
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "border-border text-secondary hover:text-primary hover:border-hover"
              }`}
              aria-pressed={filters.dateRange === opt.value}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-caption text-secondary mb-2">
          Min Match Score: {filters.matchScoreMin}%
        </legend>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={filters.matchScoreMin}
          onChange={(e) => onFilterChange({ matchScoreMin: parseInt(e.target.value) })}
          className="w-full accent-primary"
          aria-label="Minimum match score"
        />
      </fieldset>
    </div>
  );
}
