"use client";

import { Search, X } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";
import type { Priority, SkillCategoryType, SkillLevel, SkillStatus } from "@/types/skills";
import type { SkillFilterState } from "@/types/skills";

interface SkillFilterProps extends HTMLAttributes<HTMLDivElement> {
  filters: SkillFilterState;
  onFilterChange: (filter: Partial<SkillFilterState>) => void;
  onReset: () => void;
}

const categories: { value: SkillCategoryType | "all"; label: string }[] = [
  { value: "all", label: "All Categories" },
  { value: "networking", label: "Networking" },
  { value: "linux", label: "Linux" },
  { value: "windows", label: "Windows" },
  { value: "python", label: "Python" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "cloud", label: "Cloud" },
  { value: "docker", label: "Docker" },
  { value: "virtualization", label: "Virtualization" },
  { value: "git", label: "Git" },
  { value: "communication", label: "Communication" },
  { value: "problem-solving", label: "Problem Solving" },
  { value: "english", label: "English" },
  { value: "french", label: "French" },
];

const difficulties: { value: SkillLevel | "all"; label: string }[] = [
  { value: "all", label: "All Levels" },
  { value: "none", label: "None" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
];

const priorities: { value: Priority | "all"; label: string }[] = [
  { value: "all", label: "All Priorities" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const statuses: { value: SkillStatus | "all"; label: string }[] = [
  { value: "all", label: "All Status" },
  { value: "completed", label: "Completed" },
  { value: "in-progress", label: "In Progress" },
  { value: "not-started", label: "Not Started" },
];

function SelectFilter({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-caption font-medium text-tertiary">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 rounded-lg border border-border bg-surface-0 px-2.5 text-caption text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors duration-fast appearance-none cursor-pointer hover:border-primary/30"
        aria-label={label}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

const SkillFilter = forwardRef<HTMLDivElement, SkillFilterProps>(
  ({ className, filters, onFilterChange, onReset, ...props }, ref) => {
    const hasActiveFilters =
      filters.category !== "all" ||
      filters.difficulty !== "all" ||
      filters.priority !== "all" ||
      filters.status !== "all" ||
      filters.search !== "";

    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap items-end gap-3", className)}
        role="search"
        aria-label="Filter skills"
        {...props}
      >
        <div className="flex flex-col gap-1 min-w-[200px] flex-1">
          <label className="text-caption font-medium text-tertiary">Search</label>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-tertiary pointer-events-none" aria-hidden="true" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => onFilterChange({ search: e.target.value })}
              placeholder="Search skills..."
              className="h-8 w-full rounded-lg border border-border bg-surface-0 pl-7 pr-2.5 text-caption text-primary placeholder:text-tertiary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors duration-fast"
              aria-label="Search skills"
            />
          </div>
        </div>

        <SelectFilter
          label="Category"
          options={categories}
          value={filters.category}
          onChange={(v) => onFilterChange({ category: v as SkillCategoryType | "all" })}
        />

        <SelectFilter
          label="Level"
          options={difficulties}
          value={filters.difficulty}
          onChange={(v) => onFilterChange({ difficulty: v as SkillLevel | "all" })}
        />

        <SelectFilter
          label="Priority"
          options={priorities}
          value={filters.priority}
          onChange={(v) => onFilterChange({ priority: v as Priority | "all" })}
        />

        <SelectFilter
          label="Status"
          options={statuses}
          value={filters.status}
          onChange={(v) => onFilterChange({ status: v as SkillStatus | "all" })}
        />

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 h-8 px-2.5 rounded-lg border border-border text-caption text-tertiary hover:text-danger hover:border-danger/30 hover:bg-danger/5 transition-colors duration-fast"
            aria-label="Reset filters"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
            Reset
          </button>
        )}
      </div>
    );
  }
);
SkillFilter.displayName = "SkillFilter";

export { SkillFilter };
export type { SkillFilterProps };
