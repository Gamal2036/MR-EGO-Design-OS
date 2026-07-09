"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useMemo } from "react";

import { cn } from "@/lib/utils";
import { useCalendarStore } from "@/stores/calendar-store";

const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function getMonthGrid(year: number, month: number): (number | null)[][] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weeks: (number | null)[][] = [];
  let week: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    week.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) {
      week.push(null);
    }
    weeks.push(week);
  }
  return weeks;
}

function MiniCalendar() {
  const currentDate = useCalendarStore((s) => s.currentDate);
  const selectedDate = useCalendarStore((s) => s.selectedDate);
  const setCurrentDate = useCalendarStore((s) => s.setCurrentDate);
  const setSelectedDate = useCalendarStore((s) => s.setSelectedDate);

  const current = new Date(currentDate);
  const year = current.getFullYear();
  const month = current.getMonth();
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const weeks = useMemo(() => getMonthGrid(year, month), [year, month]);

  const monthLabel = current.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const handlePrev = useCallback(() => {
    const d = new Date(year, month - 1, 1);
    setCurrentDate(d.toISOString());
  }, [year, month, setCurrentDate]);

  const handleNext = useCallback(() => {
    const d = new Date(year, month + 1, 1);
    setCurrentDate(d.toISOString());
  }, [year, month, setCurrentDate]);

  const handleDateClick = useCallback(
    (day: number) => {
      const d = new Date(year, month, day);
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      setSelectedDate(dateStr);
      setCurrentDate(d.toISOString());
    },
    [year, month, setSelectedDate, setCurrentDate]
  );

  return (
    <div className="w-full" role="group" aria-label="Mini calendar">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={handlePrev}
          className="rounded-lg p-1 text-secondary hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Previous month"
          tabIndex={0}
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <span className="text-label font-medium text-primary" aria-live="polite">
          {monthLabel}
        </span>
        <button
          type="button"
          onClick={handleNext}
          className="rounded-lg p-1 text-secondary hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Next month"
          tabIndex={0}
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-px" role="grid" aria-label="Calendar days">
        {DAY_NAMES.map((name) => (
          <div
            key={name}
            className="py-1 text-center text-caption text-tertiary"
            role="columnheader"
            aria-label={name}
          >
            {name}
          </div>
        ))}
        {weeks.map((week, wi) =>
          week.map((day, di) => {
            if (day === null) {
              return <div key={`empty-${wi}-${di}`} className="p-1" />;
            }
            const dateObj = new Date(year, month, day);
            const dateStr = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")}`;
            const isToday = dateStr === todayStr;
            const isSelected = selectedDate === dateStr;

            return (
              <button
                key={`${wi}-${di}`}
                type="button"
                onClick={() => handleDateClick(day)}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-caption transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isToday && !isSelected && "border border-primary text-primary",
                  isSelected && "bg-primary text-primary-foreground",
                  !isToday && !isSelected && "text-secondary hover:bg-accent hover:text-primary"
                )}
                aria-label={dateObj.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
                aria-pressed={isSelected || undefined}
                aria-current={isToday ? "date" : undefined}
                tabIndex={0}
              >
                {day}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

export { MiniCalendar };
