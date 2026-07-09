"use client";

import { useCallback, useMemo } from "react";

import { CalendarEvent } from "./calendar-event";

import { cn } from "@/lib/utils";
import { useCalendarStore } from "@/stores/calendar-store";

const HOURS = Array.from({ length: 17 }, (_, i) => i + 6);

function getEventPosition(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  const startMinutes = s.getHours() * 60 + s.getMinutes();
  const endMinutes = e.getHours() * 60 + e.getMinutes();
  const dayStart = 6 * 60;
  const totalMinutes = 16 * 60;
  const top = ((startMinutes - dayStart) / totalMinutes) * 100;
  const height = Math.max(((endMinutes - startMinutes) / totalMinutes) * 100, 1.5);
  return { top: `${top}%`, height: `${height}%` };
}

function CalendarDay() {
  const currentDate = useCalendarStore((s) => s.currentDate);
  const setSelectedDate = useCalendarStore((s) => s.setSelectedDate);
  const selectEvent = useCalendarStore((s) => s.selectEvent);
  const openEventForm = useCalendarStore((s) => s.openEventForm);
  const getEventsForDate = useCalendarStore((s) => s.getEventsForDate);

  const current = useMemo(() => new Date(currentDate), [currentDate]);
  const dateStr = useMemo(
    () => `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}-${String(current.getDate()).padStart(2, "0")}`,
    [current]
  );

  const events = useMemo(() => getEventsForDate(dateStr), [dateStr, getEventsForDate]);

  const todayStr = useMemo(() => {
    const t = new Date();
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
  }, []);
  const isToday = dateStr === todayStr;

  const dayLabel = useMemo(
    () =>
      current.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    [current]
  );

  const handleEventClick = useCallback(
    (id: string) => {
      selectEvent(id);
      openEventForm(id);
    },
    [selectEvent, openEventForm]
  );

  const handleTimeSlotClick = useCallback(
    (_hour: number) => {
      setSelectedDate(dateStr);
      openEventForm();
    },
    [dateStr, setSelectedDate, openEventForm]
  );

  return (
    <div className="flex flex-col" role="region" aria-label={`Day view: ${dayLabel}`}>
      <div className="sticky top-0 z-10 border-b border-border bg-background py-3">
        <h3 className="text-heading-5 text-primary font-semibold">{dayLabel}</h3>
        {isToday && (
          <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-caption text-primary">
            Today
          </span>
        )}
      </div>

      <div className="relative" role="list" aria-label="Time slots">
        {HOURS.map((hour) => {
          const slotsEvents = events.filter((e) => {
            const start = new Date(e.start);
            return start.getHours() === hour;
          });

          return (
            <button
              key={hour}
              type="button"
              onClick={() => handleTimeSlotClick(hour)}
              className={cn(
                "group relative flex border-b border-border/50 transition-colors",
                "hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
              )}
              style={{ minHeight: "4rem" }}
              aria-label={`${hour === 0 ? 12 : hour > 12 ? hour - 12 : hour} ${hour >= 12 ? "PM" : "AM"} - Click to add event`}
              tabIndex={0}
            >
              <div className="sticky left-0 flex w-16 shrink-0 items-start justify-end pr-2 pt-0">
                <span className="-mt-2 text-caption text-tertiary">
                  {hour === 0 ? 12 : hour > 12 ? hour - 12 : hour}
                  {hour >= 12 ? "p" : "a"}
                </span>
              </div>

              <div className="relative flex-1">
                {slotsEvents.map((event) => {
                  const pos = getEventPosition(event.start, event.end);
                  return (
                    <div
                      key={event.id}
                      className="absolute left-2 right-2 z-10"
                      style={{ top: pos.top, height: pos.height }}
                    >
                      <CalendarEvent
                        event={event}
                        variant="day"
                        onClick={handleEventClick}
                      />
                    </div>
                  );
                })}
              </div>
            </button>
          );
        })}

        <div className="flex border-b border-border/50" style={{ minHeight: "4rem" }}>
          <div className="flex w-16 shrink-0 items-start justify-end pr-2 pt-0">
            <span className="-mt-2 text-caption text-tertiary">10p</span>
          </div>
          <button
            type="button"
            onClick={() => handleTimeSlotClick(22)}
            className="flex-1 hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
            aria-label="10 PM - Click to add event"
            tabIndex={0}
          />
        </div>
      </div>
    </div>
  );
}

export { CalendarDay };
