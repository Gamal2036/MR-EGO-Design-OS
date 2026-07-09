"use client";

import { LayoutGrid, List, Plus } from "lucide-react";
import type { HTMLAttributes } from "react";

import type { ApplicationViewMode } from "@/types/application-tracker";

interface ApplicationTrackerHeaderProps extends HTMLAttributes<HTMLElement> {
  viewMode: ApplicationViewMode;
  onViewModeChange: (mode: ApplicationViewMode) => void;
  totalApplications: number;
  onNewApplication?: () => void;
}

export function ApplicationTrackerHeader({
  viewMode,
  onViewModeChange,
  totalApplications,
  onNewApplication,
  className,
  ...props
}: ApplicationTrackerHeaderProps) {
  return (
    <header
      className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${className || ""}`}
      {...props}
    >
      <div className="space-y-1">
        <h1 className="text-heading-2 text-primary">Applications</h1>
        <p className="text-body text-secondary">
          {totalApplications} application{totalApplications !== 1 ? "s" : ""} tracked
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div
          className="flex items-center rounded-lg border border-border bg-surface-0 p-1"
          role="radiogroup"
          aria-label="View mode"
        >
          <button
            type="button"
            onClick={() => onViewModeChange("pipeline")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-caption transition-colors ${
              viewMode === "pipeline"
                ? "bg-primary text-primary-foreground"
                : "text-secondary hover:text-primary"
            }`}
            role="radio"
            aria-checked={viewMode === "pipeline"}
            aria-label="Pipeline view"
          >
            <LayoutGrid className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Pipeline</span>
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("list")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-caption transition-colors ${
              viewMode === "list"
                ? "bg-primary text-primary-foreground"
                : "text-secondary hover:text-primary"
            }`}
            role="radio"
            aria-checked={viewMode === "list"}
            aria-label="List view"
          >
            <List className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">List</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onNewApplication}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-label text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Add new application"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">New Application</span>
        </button>
      </div>
    </header>
  );
}
