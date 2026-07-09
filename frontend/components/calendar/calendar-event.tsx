"use client";

import { Clock, MapPin } from "lucide-react";
import { type ButtonHTMLAttributes, forwardRef } from "react";

import { Chip } from "@/components/foundation/chip";
import { cn } from "@/lib/utils";
import type { CalendarEvent } from "@/types/calendar";

const categoryConfig: Record<
  CalendarEvent["category"],
  { variant: "primary" | "success" | "warning" | "danger" | "info" | "ai" | "neutral"; label: string }
> = {
  task: { variant: "primary", label: "Task" },
  interview: { variant: "info", label: "Interview" },
  application_deadline: { variant: "danger", label: "Deadline" },
  learning: { variant: "success", label: "Learning" },
  career_goal: { variant: "warning", label: "Goal" },
  meeting: { variant: "ai", label: "Meeting" },
  custom: { variant: "neutral", label: "Custom" },
};

const categoryBarColors: Record<CalendarEvent["category"], string> = {
  task: "bg-primary",
  interview: "bg-info",
  application_deadline: "bg-danger",
  learning: "bg-success",
  career_goal: "bg-warning",
  meeting: "bg-ai",
  custom: "bg-neutral-400 dark:bg-neutral-500",
};

interface CalendarEventProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  event: CalendarEvent;
  onClick?: (id: string) => void;
  variant?: "month" | "week" | "day" | "agenda";
}

const CalendarEventComponent = forwardRef<HTMLButtonElement, CalendarEventProps>(
  ({ event, onClick, variant = "month", className, ...props }, ref) => {
    const startTime = new Date(event.start);
    const endTime = new Date(event.end);
    const timeStr = `${startTime.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} - ${endTime.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
    const catConfig = categoryConfig[event.category];

    const handleClick = () => {
      onClick?.(event.id);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    };

    if (variant === "month") {
      return (
        <button
          ref={ref}
          type="button"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={cn(
            "group flex w-full items-center gap-1.5 rounded px-1.5 py-0.5 text-left text-caption transition-colors",
            "hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            event.completed && "opacity-50 line-through",
            className
          )}
          aria-label={`${event.title}, ${timeStr}`}
          tabIndex={0}
          {...props}
        >
          <span
            className={cn("h-2 w-2 shrink-0 rounded-full", categoryBarColors[event.category])}
            aria-hidden="true"
          />
          <span className="truncate text-secondary group-hover:text-primary">{event.title}</span>
        </button>
      );
    }

    if (variant === "agenda") {
      return (
        <button
          ref={ref}
          type="button"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={cn(
            "flex w-full items-start gap-3 rounded-lg border border-border bg-surface-1 p-3 text-left transition-colors",
            "hover:border-primary/30 hover:bg-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            event.completed && "opacity-50 line-through",
            className
          )}
          aria-label={`${event.title}, ${timeStr}`}
          tabIndex={0}
          {...props}
        >
          <div className={cn("mt-1 h-2 w-2 shrink-0 rounded-full", categoryBarColors[event.category])} aria-hidden="true" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-body-small font-medium text-primary">{event.title}</span>
              {event.completed && <span className="text-caption text-success">Completed</span>}
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-caption text-tertiary">
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" aria-hidden="true" />
                {timeStr}
              </span>
              {event.location && (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3" aria-hidden="true" />
                  {event.location}
                </span>
              )}
            </div>
            {event.description && (
              <p className="mt-1 line-clamp-2 text-caption text-tertiary">{event.description}</p>
            )}
          </div>
          <Chip variant={catConfig.variant} size="sm" className="shrink-0">
            {catConfig.label}
          </Chip>
        </button>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "group flex w-full flex-col gap-0.5 rounded-lg border-l-[3px] bg-surface-1 px-2 py-1.5 text-left transition-colors",
          "hover:bg-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          event.completed && "opacity-50 line-through",
          className
        )}
        style={{ borderLeftColor: `var(--${categoryConfig[event.category].variant})` }}
        aria-label={`${event.title}, ${timeStr}`}
        tabIndex={0}
        {...props}
      >
        <span className="text-label font-medium text-primary truncate group-hover:text-accent-foreground">
          {event.title}
        </span>
        <span className="text-caption text-tertiary">
          {timeStr}
        </span>
        {event.location && (
          <span className="inline-flex items-center gap-1 text-caption text-tertiary">
            <MapPin className="h-3 w-3" aria-hidden="true" />
            {event.location}
          </span>
        )}
      </button>
    );
  }
);
CalendarEventComponent.displayName = "CalendarEvent";

export { CalendarEventComponent as CalendarEvent, categoryConfig, categoryBarColors };
export type { CalendarEventProps };
