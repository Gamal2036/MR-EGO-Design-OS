"use client";

import {
  Calendar,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  List,
} from "lucide-react";
import { useCallback } from "react";

import { Button } from "@/components/foundation/button";
import { TooltipWrapper } from "@/components/foundation/tooltip";
import { cn } from "@/lib/utils";
import type { CalendarViewMode } from "@/types/calendar";

interface CalendarToolbarProps {
  viewMode: CalendarViewMode;
  onViewModeChange: (mode: CalendarViewMode) => void;
  onToday: () => void;
  onPrev: () => void;
  onNext: () => void;
  dateLabel: string;
}

const viewOptions: { mode: CalendarViewMode; label: string; icon: typeof Calendar }[] = [
  { mode: "month", label: "Month", icon: Calendar },
  { mode: "week", label: "Week", icon: CalendarDays },
  { mode: "day", label: "Day", icon: Clock },
  { mode: "agenda", label: "Agenda", icon: List },
];

function CalendarToolbar({
  viewMode,
  onViewModeChange,
  onToday,
  onPrev,
  onNext,
  dateLabel,
}: CalendarToolbarProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, action: () => void) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        action();
      }
    },
    []
  );

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-3"
      role="toolbar"
      aria-label="Calendar toolbar"
    >
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onToday} aria-label="Go to today">
          Today
        </Button>
        <div className="flex items-center">
          <TooltipWrapper content="Previous">
            <button
              type="button"
              onClick={onPrev}
              onKeyDown={(e) => handleKeyDown(e, onPrev)}
              className="rounded-l-lg border border-border bg-surface-1 p-2 text-secondary hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
              aria-label="Previous"
              tabIndex={0}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
          </TooltipWrapper>
          <TooltipWrapper content="Next">
            <button
              type="button"
              onClick={onNext}
              onKeyDown={(e) => handleKeyDown(e, onNext)}
              className="-ml-px rounded-r-lg border border-border bg-surface-1 p-2 text-secondary hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
              aria-label="Next"
              tabIndex={0}
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </TooltipWrapper>
        </div>
        <h2
          className="ml-2 text-heading-5 text-primary font-semibold"
          aria-live="polite"
        >
          {dateLabel}
        </h2>
      </div>

      <div className="flex items-center rounded-lg border border-border bg-surface-1 p-0.5" role="tablist" aria-label="View mode">
        {viewOptions.map(({ mode, label, icon: Icon }) => (
          <button
            key={mode}
            type="button"
            onClick={() => onViewModeChange(mode)}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-label transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              viewMode === mode
                ? "bg-surface-2 text-primary shadow-soft"
                : "text-secondary hover:text-primary hover:bg-accent"
            )}
            role="tab"
            aria-selected={viewMode === mode}
            aria-label={`${label} view`}
            tabIndex={viewMode === mode ? 0 : -1}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export { CalendarToolbar };
export type { CalendarToolbarProps };
