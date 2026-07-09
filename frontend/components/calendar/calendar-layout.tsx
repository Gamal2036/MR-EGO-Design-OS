"use client";

import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { CalendarAgenda } from "./calendar-agenda";
import { CalendarDay } from "./calendar-day";
import { CalendarMonth } from "./calendar-month";
import { CalendarSidebar } from "./calendar-sidebar";
import { CalendarToolbar } from "./calendar-toolbar";
import { CalendarWeek } from "./calendar-week";

import { IconButton } from "@/components/foundation/icon-button";
import { useCalendarStore } from "@/stores/calendar-store";
import type { CalendarViewMode } from "@/types/calendar";

function getDateLabel(date: Date, viewMode: CalendarViewMode): string {
  switch (viewMode) {
    case "month":
      return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    case "week": {
      const start = new Date(date);
      start.setDate(start.getDate() - start.getDay());
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      if (start.getMonth() === end.getMonth()) {
        return `${start.toLocaleDateString("en-US", { month: "long" })} ${start.getDate()} - ${end.getDate()}, ${start.getFullYear()}`;
      }
      return `${start.toLocaleDateString("en-US", { month: "short" })} ${start.getDate()} - ${end.toLocaleDateString("en-US", { month: "short" })} ${end.getDate()}, ${end.getFullYear()}`;
    }
    case "day":
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    case "agenda":
      return `Agenda`;
    default:
      return "";
  }
}

function CalendarLayout() {
  const viewMode = useCalendarStore((s) => s.viewMode);
  const setViewMode = useCalendarStore((s) => s.setViewMode);
  const currentDate = useCalendarStore((s) => s.currentDate);
  const setCurrentDate = useCalendarStore((s) => s.setCurrentDate);
  const setSelectedDate = useCalendarStore((s) => s.setSelectedDate);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const current = new Date(currentDate);
  const dateLabel = getDateLabel(current, viewMode);

  const handleToday = useCallback(() => {
    const now = new Date();
    setCurrentDate(now.toISOString());
    setSelectedDate(
      `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`
    );
  }, [setCurrentDate, setSelectedDate]);

  const handlePrev = useCallback(() => {
    const d = new Date(currentDate);
    switch (viewMode) {
      case "month":
        d.setMonth(d.getMonth() - 1);
        break;
      case "week":
        d.setDate(d.getDate() - 7);
        break;
      case "day":
        d.setDate(d.getDate() - 1);
        break;
      case "agenda":
        d.setMonth(d.getMonth() - 1);
        break;
    }
    setCurrentDate(d.toISOString());
  }, [currentDate, viewMode, setCurrentDate]);

  const handleNext = useCallback(() => {
    const d = new Date(currentDate);
    switch (viewMode) {
      case "month":
        d.setMonth(d.getMonth() + 1);
        break;
      case "week":
        d.setDate(d.getDate() + 7);
        break;
      case "day":
        d.setDate(d.getDate() + 1);
        break;
      case "agenda":
        d.setMonth(d.getMonth() + 1);
        break;
    }
    setCurrentDate(d.toISOString());
  }, [currentDate, viewMode, setCurrentDate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "1":
            e.preventDefault();
            setViewMode("month");
            break;
          case "2":
            e.preventDefault();
            setViewMode("week");
            break;
          case "3":
            e.preventDefault();
            setViewMode("day");
            break;
          case "4":
            e.preventDefault();
            setViewMode("agenda");
            break;
          case "t":
          case "T":
            e.preventDefault();
            handleToday();
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setViewMode, handleToday]);

  return (
    <div className="flex h-full flex-col" role="application" aria-label="Calendar">
      <div className="flex items-center justify-between border-b border-border bg-background px-4 py-3">
        <CalendarToolbar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onToday={handleToday}
          onPrev={handlePrev}
          onNext={handleNext}
          dateLabel={dateLabel}
        />

        <IconButton
          icon={sidebarOpen ? X : Menu}
          label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen((v) => !v)}
          className="lg:hidden"
        />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-background p-4" role="main">
          {viewMode === "month" && <CalendarMonth />}
          {viewMode === "week" && <CalendarWeek />}
          {viewMode === "day" && <CalendarDay />}
          {viewMode === "agenda" && <CalendarAgenda />}
        </main>

        <CalendarSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>
    </div>
  );
}

export { CalendarLayout };
