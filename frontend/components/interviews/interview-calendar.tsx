"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { forwardRef, type HTMLAttributes, useState } from "react";

import { IconButton } from "@/components/foundation";
import { cn } from "@/lib/utils";
import type { Interview } from "@/types/interview";

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const typeDotColor: Record<string, string> = {
  behavioral: "bg-primary",
  technical: "bg-info",
  hr: "bg-success",
  culture: "bg-ai",
  leadership: "bg-warning",
  problem_solving: "bg-danger",
  career: "bg-neutral-400",
  salary: "bg-success",
};

interface InterviewCalendarProps extends HTMLAttributes<HTMLDivElement> {
  interviews: Interview[];
  onDateClick?: (date: string) => void;
  onInterviewClick?: (id: string) => void;
}

const InterviewCalendar = forwardRef<HTMLDivElement, InterviewCalendarProps>(
  ({ className, interviews, onDateClick, onInterviewClick, ...props }, ref) => {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

    const prevMonth = () => {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    };

    const nextMonth = () => {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    };

    const interviewsByDate: Record<string, Interview[]> = {};
    interviews.forEach((interview) => {
      const dateKey = interview.date.split("T")[0] ?? "";
      if (!interviewsByDate[dateKey]) {
        interviewsByDate[dateKey] = [];
      }
      interviewsByDate[dateKey].push(interview);
    });

    const cells: React.ReactNode[] = [];

    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} className="h-20" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const dayInterviews = interviewsByDate[dateStr] || [];
      const isToday =
        day === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear();

      cells.push(
        <div
          key={day}
          className={cn(
            "h-20 rounded-lg border p-1 transition-colors",
            isToday
              ? "border-primary bg-primary/5"
              : "border-border hover:bg-surface-1",
          )}
          role="gridcell"
          aria-label={`${monthNames[currentMonth]} ${day}, ${currentYear}`}
        >
          <button
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full text-caption",
              isToday
                ? "bg-primary text-primary-foreground font-medium"
                : "text-primary hover:bg-surface-2",
            )}
            onClick={() => onDateClick?.(dateStr)}
          >
            {day}
          </button>
          <div className="mt-0.5 space-y-0.5">
            {dayInterviews.slice(0, 2).map((interview) => (
              <button
                key={interview.id}
                className={cn(
                  "flex w-full items-center gap-1 rounded px-1 py-0.5 text-left text-smallest transition-colors hover:bg-surface-2",
                )}
                onClick={() => onInterviewClick?.(interview.id)}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 shrink-0 rounded-full",
                    typeDotColor[interview.type] || "bg-neutral-400",
                  )}
                  aria-hidden="true"
                />
                <span className="truncate text-tertiary">
                  {interview.company.name}
                </span>
              </button>
            ))}
            {dayInterviews.length > 2 && (
              <span className="text-smallest text-tertiary pl-1">
                +{dayInterviews.length - 2}
              </span>
            )}
          </div>
        </div>,
      );
    }

    return (
      <div ref={ref} className={cn("rounded-xl border border-border bg-surface-1 p-4", className)} {...props}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-heading-4 text-primary font-medium">
            {monthNames[currentMonth]} {currentYear}
          </h3>
          <div className="flex items-center gap-1">
            <IconButton
              icon={ChevronLeft}
              label="Previous month"
              variant="ghost"
              size="xs"
              onClick={prevMonth}
            />
            <IconButton
              icon={ChevronRight}
              label="Next month"
              variant="ghost"
              size="xs"
              onClick={nextMonth}
            />
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center text-caption text-tertiary font-medium py-1"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1" role="grid">
          {cells}
        </div>
      </div>
    );
  },
);
InterviewCalendar.displayName = "InterviewCalendar";

export { InterviewCalendar };
export type { InterviewCalendarProps };
