"use client";

import { useCallback, useMemo } from "react";

import { CalendarEvent } from "./calendar-event";

import { cn } from "@/lib/utils";
import { useCalendarStore } from "@/stores/calendar-store";

const HOURS = Array.from({ length: 15 }, (_, i) => i + 7);
const DAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getStartOfWeek(date: Date): Date {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  d.setHours(0, 0, 0, 0);
  return d;
}

function getWeekDays(date: Date): Date[] {
  const start = getStartOfWeek(date);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    return d;
  });
}

function getEventPosition(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  const startMinutes = s.getHours() * 60 + s.getMinutes();
  const endMinutes = e.getHours() * 60 + e.getMinutes();
  const dayStart = 7 * 60;
  const totalMinutes = 14 * 60;
  const top = ((startMinutes - dayStart) / totalMinutes) * 100;
  const height = Math.max(((endMinutes - startMinutes) / totalMinutes) * 100, 2);
  return { top: `${top}%`, height: `${height}%` };
}

function CalendarWeek() {
  const currentDate = useCalendarStore((s) => s.currentDate);
  const selectEvent = useCalendarStore((s) => s.selectEvent);
  const openEventForm = useCalendarStore((s) => s.openEventForm);
  const getEventsForDate = useCalendarStore((s) => s.getEventsForDate);

  const weekDays = useMemo(() => getWeekDays(new Date(currentDate)), [currentDate]);
  const today = new Date();

  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const handleEventClick = useCallback(
    (id: string) => {
      selectEvent(id);
      openEventForm(id);
    },
    [selectEvent, openEventForm]
  );

  return (
    <div className="flex flex-col" role="region" aria-label="Week view">
      <div className="grid grid-cols-[4rem_repeat(7,1fr)] border-b border-border" role="row">
        <div className="p-2" />
        {weekDays.map((day) => {
          const dateStr = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;
          const isToday = dateStr === todayStr;
          return (
            <div
              key={dateStr}
              className={cn(
                "p-2 text-center",
                isToday && "bg-primary/5"
              )}
              role="columnheader"
              aria-label={day.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            >
              <div className="text-caption text-tertiary">{DAY_HEADERS[day.getDay()]}</div>
              <div
                className={cn(
                  "mx-auto mt-1 flex h-7 w-7 items-center justify-center rounded-full text-body font-medium",
                  isToday && "bg-primary text-primary-foreground"
                )}
              >
                {day.getDate()}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto">
        {HOURS.map((hour) => (
          <div
            key={hour}
            className="grid grid-cols-[4rem_repeat(7,1fr)] border-b border-border/50"
            style={{ minHeight: "3.5rem" }}
          >
            <div className="flex items-start justify-end pr-2 pt-0">
              <span className="-mt-2 text-caption text-tertiary">
                {hour === 0 ? 12 : hour > 12 ? hour - 12 : hour}
                {hour >= 12 ? "p" : "a"}
              </span>
            </div>
            {weekDays.map((day) => {
              const dateStr = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;
              const dayEvents = getEventsForDate(dateStr);
              const hourEvents = dayEvents.filter((e) => {
                const start = new Date(e.start);
                return start.getHours() === hour;
              });

              return (
                <div
                  key={dateStr}
                  className="relative border-l border-border/50 p-0.5"
                >
                  {hourEvents.map((event) => (
                    <div
                      key={event.id}
                      className="absolute inset-x-0.5 z-10"
                      style={getEventPosition(event.start, event.end)}
                    >
                      <CalendarEvent
                        event={event}
                        variant="week"
                        onClick={handleEventClick}
                      />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export { CalendarWeek };
