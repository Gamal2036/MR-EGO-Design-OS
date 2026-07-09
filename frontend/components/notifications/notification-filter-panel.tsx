"use client";

import { RotateCcw, Search, X } from "lucide-react";
import {
  type HTMLAttributes,
  forwardRef,
  useCallback,
  useState,
} from "react";

import { Button } from "@/components/foundation/button";
import { cn } from "@/lib/utils";
import { useNotificationsStore } from "@/stores/notifications-store";
import type { NotificationCategory, NotificationPriority } from "@/types/notifications";

const categoryOptions: { value: NotificationCategory; label: string }[] = [
  { value: "ai_recommendation", label: "AI Recommendations" },
  { value: "job_match", label: "Job Matches" },
  { value: "application", label: "Applications" },
  { value: "cv_analysis", label: "CV Analysis" },
  { value: "document", label: "Documents" },
  { value: "career_progress", label: "Career Progress" },
  { value: "system", label: "System" },
  { value: "security", label: "Security" },
  { value: "reminder", label: "Reminders" },
  { value: "achievement", label: "Achievements" },
];

const priorityOptions: { value: NotificationPriority; label: string }[] = [
  { value: "urgent", label: "Urgent" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const statusOptions = [
  { value: "all" as const, label: "All" },
  { value: "unread" as const, label: "Unread" },
  { value: "read" as const, label: "Read" },
];

const dateOptions = [
  { value: "all" as const, label: "All Time" },
  { value: "today" as const, label: "Today" },
  { value: "week" as const, label: "This Week" },
  { value: "month" as const, label: "This Month" },
];

interface NotificationFilterPanelProps extends HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

const NotificationFilterPanel = forwardRef<HTMLDivElement, NotificationFilterPanelProps>(
  ({ className, onClose, ...props }, ref) => {
    const filters = useNotificationsStore((s) => s.filters);
    const setFilter = useNotificationsStore((s) => s.setFilter);
    const resetFilters = useNotificationsStore((s) => s.resetFilters);
    const [searchInput, setSearchInput] = useState(filters.search);

    const handleSearch = useCallback(
      (value: string) => {
        setSearchInput(value);
        setFilter({ search: value });
      },
      [setFilter],
    );

    const toggleCategory = useCallback(
      (category: NotificationCategory) => {
        const current = filters.categories;
        const next = current.includes(category)
          ? current.filter((c: NotificationCategory) => c !== category)
          : [...current, category];
        setFilter({ categories: next });
      },
      [filters.categories, setFilter],
    );

    const togglePriority = useCallback(
      (priority: NotificationPriority) => {
        const current = filters.priorities;
        const next = current.includes(priority)
          ? current.filter((p: NotificationPriority) => p !== priority)
          : [...current, priority];
        setFilter({ priorities: next });
      },
      [filters.priorities, setFilter],
    );

    const hasActiveFilters =
      filters.categories.length > 0 ||
      filters.priorities.length > 0 ||
      filters.status !== "all" ||
      filters.dateRange !== "all" ||
      filters.search !== "";

    return (
      <div
        ref={ref}
        className={cn("space-y-4", className)}
        role="region"
        aria-label="Notification filters"
        {...props}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-body-small font-semibold text-primary">Filters</h3>
          <div className="flex items-center gap-1">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="xs"
                onClick={resetFilters}
                leftIcon={<RotateCcw className="h-3 w-3" />}
              >
                Reset
              </Button>
            )}
            {onClose && (
              <Button
                variant="ghost"
                size="xs"
                onClick={onClose}
                leftIcon={<X className="h-3 w-3" />}
                className="lg:hidden"
              >
                Close
              </Button>
            )}
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tertiary" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface-0 pl-9 pr-3 py-2 text-body-small text-primary placeholder:text-tertiary transition-colors focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
            aria-label="Search notifications"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => handleSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-tertiary hover:text-secondary"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <FilterSection label="Status">
          <div className="flex flex-wrap gap-1">
            {statusOptions.map((opt) => (
              <FilterChip
                key={opt.value}
                label={opt.label}
                active={filters.status === opt.value}
                onClick={() => setFilter({ status: opt.value })}
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection label="Date Range">
          <div className="flex flex-wrap gap-1">
            {dateOptions.map((opt) => (
              <FilterChip
                key={opt.value}
                label={opt.label}
                active={filters.dateRange === opt.value}
                onClick={() => setFilter({ dateRange: opt.value })}
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection label="Category">
          <div className="flex flex-wrap gap-1">
            {categoryOptions.map((opt) => (
              <FilterChip
                key={opt.value}
                label={opt.label}
                active={filters.categories.includes(opt.value)}
                onClick={() => toggleCategory(opt.value)}
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection label="Priority">
          <div className="flex flex-wrap gap-1">
            {priorityOptions.map((opt) => (
              <FilterChip
                key={opt.value}
                label={opt.label}
                active={filters.priorities.includes(opt.value)}
                onClick={() => togglePriority(opt.value)}
              />
            ))}
          </div>
        </FilterSection>
      </div>
    );
  },
);
NotificationFilterPanel.displayName = "NotificationFilterPanel";

function FilterSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <span className="text-caption font-medium text-secondary">{label}</span>
      {children}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-2.5 py-1 text-smallest font-medium transition-all duration-fast",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active
          ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30"
          : "bg-surface-1 text-tertiary border border-border hover:border-hover hover:text-secondary",
      )}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

export { NotificationFilterPanel };
export type { NotificationFilterPanelProps };
