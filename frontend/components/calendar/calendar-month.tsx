"use client";

import { useCallback, useMemo } from "react";

import { CalendarEvent } from "./calendar-event";

import { cn } from "@/lib/utils";
import { useCalendarStore } from "@/stores/calendar-store";
import type { CalendarDay } from "@/types/calendar";

const DAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getMonthDays(year: number, month: number): CalendarDay[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const days: CalendarDay[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const d = new Date(year, month - 1, day);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    days.push({
      date: dateStr,
      events: [],
      isCurrentMonth: false,
      isToday: dateStr === todayStr,
      isPast: d < new Date(todayStr),
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month, day);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    days.push({
      date: dateStr,
      events: [],
      isCurrentMonth: true,
      isToday: dateStr === todayStr,
      isPast: d < new Date(todayStr),
    });
  }

  return days;
}

function CalendarMonth() {
  const currentDate = useCalendarStore((s) => s.currentDate);
  const selectedDate = useCalendarStore((s) => s.selectedDate);
  const setSelectedDate = useCalendarStore((s) => s.setSelectedDate);
  const selectEvent = useCalendarStore((s) => s.selectEvent);
  const openEventForm = useCalendarStore((s) => s.openEventForm);
  const getEventsForDate = useCalendarStore((s) => s.getEventsForDate);

  const current = new Date(currentDate);
  const year = current.getFullYear();
  const month = current.getMonth();

  const days = useMemo(() => getMonthDays(year, month), [year, month]);

  const handleDateClick = useCallback(
    (dateStr: string) => {
      setSelectedDate(dateStr);
    },
    [setSelectedDate]
  );

  const handleEventClick = useCallback(
    (id: string) => {
      selectEvent(id);
      openEventForm(id);
    },
    [selectEvent, openEventForm]
  );

  const weeks = useMemo(() => {
    const result: CalendarDay[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      result.push(days.slice(i, i + 7));
    }
    return result;
  }, [days]);

  return (
    <div role="grid" aria-label="Month view">
      <div className="grid grid-cols-7 border-b border-border" role="row">
        {DAY_HEADERS.map((header) => (
          <div
            key={header}
            className="py-2 text-center text-caption font-medium text-tertiary"
            role="columnheader"
            aria-label={header}
          >
            <span className="hidden sm:inline">{header}</span>
            <span className="sm:hidden">{header[0]}</span>
          </div>
        ))}
      </div>

      {weeks.map((week, wi) => (
        <div key={wi} className="grid grid-cols-7 border-b border-border/50" role="row">
          {week.map((day) => {
            const dayEvents = getEventsForDate(day.date);
            const isSelected = selectedDate === day.date;

            return (
              <div
                key={day.date}
                className={cn(
                  "min-h-[100px] border-r border-border/50 p-1.5 transition-colors last:border-r-0",
                  "hover:bg-accent/20",
                  !day.isCurrentMonth && "bg-surface-1/50",
                  isSelected && "bg-accent/30 ring-1 ring-inset ring-primary",
                )}
                role="gridcell"
                aria-label={new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              >
                <button
                  type="button"
                  onClick={() => handleDateClick(day.date)}
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full text-caption transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    day.isToday
                      ? "bg-primary text-primary-foreground"
                      : day.isCurrentMonth
                        ? "text-primary hover:bg-accent"
                        : "text-tertiary",
                  )}
                  aria-label={new Date(day.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                  aria-current={day.isToday ? "date" : undefined}
                  tabIndex={0}
                >
                  {new Date(day.date).getDate()}
                </button>

                <div className="mt-1 space-y-0.5">
                  {dayEvents.slice(0, 3).map((event) => (
                    <CalendarEvent
                      key={event.id}
                      event={event}
                      variant="month"
                      onClick={handleEventClick}
                    />
                  ))}
                  {dayEvents.length > 3 && (
                    <span className="block px-1.5 text-caption text-tertiary">
                      +{dayEvents.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export { CalendarMonth };
