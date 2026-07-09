"use client";

import { ArrowDownAZ, ArrowUpAZ, Calendar, Search, SlidersHorizontal } from "lucide-react";

import { goalPriorityLabels, goalStatusLabels, goalTypeLabels } from "./goal-utils";

import { Input } from "@/components/forms/input";
import { Button } from "@/components/foundation/button";
import { cn } from "@/lib/utils";
import type { SmartGoalFilters, SmartGoalSort, SmartGoalSortBy } from "@/types/smart-goal";

export interface GoalsFiltersProps {
  filters: SmartGoalFilters;
  sort: SmartGoalSort;
  className?: string;
  onFilterChange: (filters: Partial<SmartGoalFilters>) => void;
  onSortChange: (sort: Partial<SmartGoalSort>) => void;
  onReset: () => void;
}

const sortLabels: Record<SmartGoalSortBy, string> = {
  deadline: "Deadline",
  priority: "Priority",
  progress: "Progress",
  created: "Created",
  title: "Title",
  updated: "Updated",
};

export function GoalsFilters({
  filters,
  sort,
  className,
  onFilterChange,
  onSortChange,
  onReset,
}: GoalsFiltersProps) {
  const hasActiveFilters =
    filters.status !== "all" ||
    filters.type !== "all" ||
    filters.priority !== "all" ||
    filters.search !== "" ||
    filters.onlyActive;

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tertiary" aria-hidden="true" />
          <Input
            type="search"
            placeholder="Search goals..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="pl-9"
            aria-label="Search goals"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ status: e.target.value as SmartGoalFilters["status"] })}
            className="h-9 rounded-lg border border-border bg-surface-0 px-3 text-caption text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Filter by status"
          >
            <option value="all">All statuses</option>
            {Object.entries(goalStatusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <select
            value={filters.type}
            onChange={(e) => onFilterChange({ type: e.target.value as SmartGoalFilters["type"] })}
            className="h-9 rounded-lg border border-border bg-surface-0 px-3 text-caption text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Filter by type"
          >
            <option value="all">All types</option>
            {Object.entries(goalTypeLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <select
            value={filters.priority}
            onChange={(e) => onFilterChange({ priority: e.target.value as SmartGoalFilters["priority"] })}
            className="h-9 rounded-lg border border-border bg-surface-0 px-3 text-caption text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Filter by priority"
          >
            <option value="all">All priorities</option>
            {Object.entries(goalPriorityLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-2 text-caption text-secondary">
          <input
            type="checkbox"
            checked={filters.onlyActive}
            onChange={(e) => onFilterChange({ onlyActive: e.target.checked })}
            className="h-4 w-4 rounded border-border text-primary focus:ring-ring"
          />
          Only active goals
        </label>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg border border-border bg-surface-1 p-1">
            <Calendar className="ml-2 h-4 w-4 text-tertiary" aria-hidden="true" />
            <select
              value={sort.by}
              onChange={(e) => onSortChange({ by: e.target.value as SmartGoalSortBy })}
              className="bg-transparent px-2 py-1 text-caption text-primary focus-visible:outline-none"
              aria-label="Sort by"
            >
              {Object.entries(sortLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => onSortChange({ direction: sort.direction === "asc" ? "desc" : "asc" })}
              className="rounded p-1 text-tertiary hover:text-secondary"
              aria-label={sort.direction === "asc" ? "Sort descending" : "Sort ascending"}
            >
              {sort.direction === "asc" ? <ArrowUpAZ className="h-4 w-4" /> : <ArrowDownAZ className="h-4 w-4" />}
            </button>
          </div>
          {hasActiveFilters && (
            <Button variant="ghost" size="xs" onClick={onReset} leftIcon={<SlidersHorizontal className="h-4 w-4" />}>
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
