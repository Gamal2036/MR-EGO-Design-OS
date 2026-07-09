"use client";

import { Calendar, Plus, Search, Sparkles, X } from "lucide-react";
import { useMemo, useState } from "react";

import { MiniCalendar } from "./mini-calendar";

import { Badge } from "@/components/foundation/badge";
import { Button } from "@/components/foundation/button";
import { Card, CardDescription, CardTitle } from "@/components/foundation/card";
import { Divider } from "@/components/foundation/divider";
import { IconButton } from "@/components/foundation/icon-button";
import { cn } from "@/lib/utils";
import { useCalendarStore } from "@/stores/calendar-store";

const categoryBadgeVariant: Record<
  string,
  "primary" | "success" | "warning" | "danger" | "info" | "ai" | "neutral"
> = {
  task: "primary",
  interview: "info",
  application_deadline: "danger",
  learning: "success",
  career_goal: "warning",
  meeting: "ai",
  custom: "neutral",
};

interface CalendarSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

function CalendarSidebar({ isOpen = true, onClose }: CalendarSidebarProps) {
  const openEventForm = useCalendarStore((s) => s.openEventForm);
  const getUpcomingEvents = useCalendarStore((s) => s.getUpcomingEvents);
  const getTodayEvents = useCalendarStore((s) => s.getTodayEvents);
  const [searchQuery, setSearchQuery] = useState("");

  const upcomingEvents = useMemo(() => getUpcomingEvents(5), [getUpcomingEvents]);
  const todayEvents = useMemo(() => getTodayEvents(), [getTodayEvents]);

  return (
    <aside
      className={cn(
        "w-80 shrink-0 border-l border-border bg-background transition-all duration-normal",
        "hidden lg:block",
        isOpen ? "lg:block" : "lg:hidden",
      )}
      aria-label="Calendar sidebar"
    >
      <div className="flex h-full flex-col overflow-y-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-heading-5 text-primary font-semibold">Calendar</h2>
          <IconButton
            icon={X}
            label="Close sidebar"
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden"
          />
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tertiary" aria-hidden="true" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events..."
            className="flex h-input-sm w-full rounded-lg border border-input bg-background pl-9 pr-3 text-body ring-offset-background transition-all placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Search events"
          />
        </div>

        <MiniCalendar />

        <Divider className="my-4" />

        {todayEvents.length > 0 && (
          <div className="mb-4">
            <h3 className="mb-2 flex items-center gap-1.5 text-label font-semibold text-primary">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              Today
              <Badge variant="primary" size="sm" className="ml-auto">
                {todayEvents.length}
              </Badge>
            </h3>
            <div className="space-y-1.5">
              {todayEvents.map((event) => (
                <div
                  key={event.id}
                  className="rounded-lg border border-border bg-surface-1 p-2.5"
                >
                  <div className="flex items-center gap-2">
                    <span className={cn("h-2 w-2 shrink-0 rounded-full", categoryBadgeVariant[event.category] ? `bg-${categoryBadgeVariant[event.category]}` : "bg-primary")} aria-hidden="true" />
                    <span className="truncate text-body-small font-medium text-primary">
                      {event.title}
                    </span>
                  </div>
                  <p className="mt-0.5 text-caption text-tertiary">
                    {new Date(event.start).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-4">
          <h3 className="mb-2 text-label font-semibold text-primary">Upcoming</h3>
          <div className="space-y-1.5">
            {upcomingEvents.length === 0 ? (
              <p className="text-caption text-tertiary">No upcoming events</p>
            ) : (
              upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="rounded-lg border border-border bg-surface-1 p-2.5"
                >
                  <div className="flex items-center gap-2">
                    <span className={cn("h-2 w-2 shrink-0 rounded-full", categoryBadgeVariant[event.category] ? `bg-${categoryBadgeVariant[event.category]}` : "bg-primary")} aria-hidden="true" />
                    <span className="truncate text-body-small font-medium text-primary">
                      {event.title}
                    </span>
                  </div>
                  <p className="mt-0.5 text-caption text-tertiary">
                    {new Date(event.start).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    {new Date(event.start).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <Divider className="my-4" />

        <Card variant="ai" padding="sm" className="mb-4">
          <CardTitle className="flex items-center gap-1.5 text-label">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            AI Suggestions
          </CardTitle>
          <CardDescription className="text-caption">
            Schedule interview prep sessions for your upcoming interviews this week.
          </CardDescription>
        </Card>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={() => openEventForm()}
          className="mt-auto"
        >
          Quick Create
        </Button>
      </div>
    </aside>
  );
}

export { CalendarSidebar };
export type { CalendarSidebarProps };
