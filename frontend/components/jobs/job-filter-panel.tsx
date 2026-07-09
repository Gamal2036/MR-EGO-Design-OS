"use client";

import { RotateCcw, X } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Button } from "@/components/foundation/button";
import { Panel, PanelBody, PanelHeader } from "@/components/foundation/panel";
import {
  JOB_CATEGORIES,
  JOB_CONTRACT_TYPES,
  JOB_EXPERIENCE_LEVELS,
  JOB_LOCATION_TYPES,
} from "@/data/jobs";
import { cn } from "@/lib/utils";
import { useJobSearchStore } from "@/stores/job-search-store";

interface JobFilterPanelProps extends HTMLAttributes<HTMLDivElement> {
  mobile?: boolean;
  onClose?: () => void;
}

const JobFilterPanel = forwardRef<HTMLDivElement, JobFilterPanelProps>(
  ({ className, mobile = false, onClose, ...props }, ref) => {
    const filters = useJobSearchStore((s) => s.filters);
    const setFilters = useJobSearchStore((s) => s.setFilters);
    const resetFilters = useJobSearchStore((s) => s.resetFilters);

    const toggleArrayFilter = (key: "locationTypes" | "categories" | "contractTypes" | "experienceLevels", value: string) => {
      const current = filters[key];
      const next = current.includes(value)
        ? current.filter((v: string) => v !== value)
        : [...current, value];
      setFilters({ [key]: next });
    };

    const hasActiveFilters =
      filters.locationTypes.length > 0 ||
      filters.categories.length > 0 ||
      filters.contractTypes.length > 0 ||
      filters.experienceLevels.length > 0 ||
      filters.matchScoreMin > 0 ||
      filters.savedOnly;

    const FilterSection = ({
      label,
      children,
    }: {
      label: string;
      children: React.ReactNode;
    }) => (
      <div className="space-y-2">
        <p className="text-caption font-medium text-secondary uppercase tracking-wider">
          {label}
        </p>
        {children}
      </div>
    );

    const ChipButton = ({
      active,
      onClick,
      children,
    }: {
      active: boolean;
      onClick: () => void;
      children: React.ReactNode;
    }) => (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "inline-flex items-center rounded-lg border px-3 py-1.5 text-caption font-medium transition-all duration-fast",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          active
            ? "border-primary/30 bg-primary/10 text-primary"
            : "border-border bg-surface-0 text-secondary hover:border-hover hover:text-primary"
        )}
        aria-pressed={active}
      >
        {children}
      </button>
    );

    const content = (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-label font-semibold text-primary">Filters</h3>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="xs"
                onClick={resetFilters}
                leftIcon={<RotateCcw className="h-3 w-3" />}
                className="text-caption text-tertiary hover:text-primary"
              >
                Reset
              </Button>
            )}
            {mobile && onClose && (
              <Button
                variant="ghost"
                size="xs"
                onClick={onClose}
                className="h-7 w-7 p-0"
                aria-label="Close filters"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <FilterSection label="Location Type">
          <div className="flex flex-wrap gap-1.5">
            {JOB_LOCATION_TYPES.map((lt) => (
              <ChipButton
                key={lt.value}
                active={filters.locationTypes.includes(lt.value)}
                onClick={() => toggleArrayFilter("locationTypes", lt.value)}
              >
                {lt.label}
              </ChipButton>
            ))}
          </div>
        </FilterSection>

        <FilterSection label="Category">
          <div className="flex flex-wrap gap-1.5">
            {JOB_CATEGORIES.slice(0, 8).map((cat) => (
              <ChipButton
                key={cat}
                active={filters.categories.includes(cat)}
                onClick={() => toggleArrayFilter("categories", cat)}
              >
                {cat}
              </ChipButton>
            ))}
          </div>
        </FilterSection>

        <FilterSection label="Contract Type">
          <div className="flex flex-wrap gap-1.5">
            {JOB_CONTRACT_TYPES.map((ct) => (
              <ChipButton
                key={ct.value}
                active={filters.contractTypes.includes(ct.value)}
                onClick={() => toggleArrayFilter("contractTypes", ct.value)}
              >
                {ct.label}
              </ChipButton>
            ))}
          </div>
        </FilterSection>

        <FilterSection label="Experience Level">
          <div className="flex flex-wrap gap-1.5">
            {JOB_EXPERIENCE_LEVELS.map((el) => (
              <ChipButton
                key={el.value}
                active={filters.experienceLevels.includes(el.value)}
                onClick={() => toggleArrayFilter("experienceLevels", el.value)}
              >
                {el.label}
              </ChipButton>
            ))}
          </div>
        </FilterSection>

        <FilterSection label="Match Score">
          <div className="space-y-2">
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={filters.matchScoreMin}
              onChange={(e) => setFilters({ matchScoreMin: Number(e.target.value) })}
              className="w-full accent-primary"
              aria-label="Minimum match score"
            />
            <div className="flex items-center justify-between text-caption text-tertiary">
              <span>Min: {filters.matchScoreMin}%</span>
              <span>Max: {filters.matchScoreMax}%</span>
            </div>
          </div>
        </FilterSection>

        <div className="flex items-center gap-2">
          <button
            type="button"
            role="switch"
            aria-checked={filters.savedOnly}
            onClick={() => setFilters({ savedOnly: !filters.savedOnly })}
            className={cn(
              "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-normal",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              filters.savedOnly ? "bg-primary" : "bg-surface-2"
            )}
            aria-label="Show saved jobs only"
          >
            <span
              className={cn(
                "pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-normal",
                filters.savedOnly ? "translate-x-4" : "translate-x-0"
              )}
            />
          </button>
          <span className="text-caption text-secondary">Saved jobs only</span>
        </div>
      </div>
    );

    if (mobile) {
      return (
        <div
          ref={ref}
          className={cn("space-y-4", className)}
          role="dialog"
          aria-label="Job filters"
          {...props}
        >
          {content}
        </div>
      );
    }

    return (
      <Panel
        ref={ref}
        variant="default"
        padding="md"
        className={cn("", className)}
        {...props}
      >
        <PanelHeader>Filters</PanelHeader>
        <PanelBody>{content}</PanelBody>
      </Panel>
    );
  }
);
JobFilterPanel.displayName = "JobFilterPanel";

export { JobFilterPanel };
export type { JobFilterPanelProps };
