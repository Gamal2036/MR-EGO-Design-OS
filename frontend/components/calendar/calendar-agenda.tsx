"use client";

import { useCallback, useMemo } from "react";

import { CalendarEvent as CalendarEventComponent } from "./calendar-event";

import { useCalendarStore } from "@/stores/calendar-store";
import type { CalendarEvent } from "@/types/calendar";

function groupEventsByDate(events: CalendarEvent[]): Map<string, CalendarEvent[]> {
  const groups = new Map<string, CalendarEvent[]>();
  const sorted = [...events].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );
  for (const event of sorted) {
    const dateKey = event.start.split("T")[0] ?? "";
    const existing = groups.get(dateKey);
    if (!existing) {
      groups.set(dateKey, [event]);
    } else {
      existing.push(event);
    }
  }
  return groups;
}

function CalendarAgenda() {
  const events = useCalendarStore((s) => s.events);
  const selectEvent = useCalendarStore((s) => s.selectEvent);
  const openEventForm = useCalendarStore((s) => s.openEventForm);

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const groupedEvents = useMemo(() => groupEventsByDate(events), [events]);

  const sortedDates = useMemo(
    () => Array.from(groupedEvents.keys()).sort(),
    [groupedEvents]
  );

  const handleEventClick = useCallback(
    (id: string) => {
      selectEvent(id);
      openEventForm(id);
    },
    [selectEvent, openEventForm]
  );

  if (sortedDates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="rounded-full bg-surface-2 p-4">
          <span className="text-heading-3 text-tertiary">📅</span>
        </div>
        <h3 className="mt-4 text-heading-5 text-secondary">No events found</h3>
        <p className="mt-1 text-body-small text-tertiary">
          Create an event to get started with your calendar.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6" role="list" aria-label="Agenda view">
      {sortedDates.map((dateStr) => {
        const dateObj = new Date(dateStr + "T00:00:00");
        const isToday = dateStr === todayStr;
        const dayEvents = groupedEvents.get(dateStr) ?? [];

        return (
          <div key={dateStr} role="group" aria-label={dateObj.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}>
            <div className="sticky top-0 z-10 bg-background py-2">
              <div className="flex items-center gap-2">
                <h3 className="text-heading-5 text-primary font-semibold">
                  {dateObj.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                </h3>
                {isToday && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-caption text-primary">
                    Today
                  </span>
                )}
                <span className="ml-auto text-caption text-tertiary">
                  {dayEvents.length} event{dayEvents.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="mt-1 h-px bg-border" />
            </div>

            <div className="mt-3 space-y-2">
              {dayEvents.map((event) => (
                <CalendarEventComponent
                  key={event.id}
                  event={event}
                  variant="agenda"
                  onClick={handleEventClick}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { CalendarAgenda };
