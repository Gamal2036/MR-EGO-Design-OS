"use client";

import { useCallback, useEffect, useState } from "react";

import { CalendarLayout } from "@/components/calendar";
import {
  DashboardErrorState,
  DashboardLoadingState,
} from "@/components/dashboard";
import { demoCalendarEvents } from "@/data/calendar";
import { useCalendarStore } from "@/stores/calendar-store";

type PageState = "loading" | "ready" | "error";

export default function CalendarPage() {
  const [pageState, setPageState] = useState<PageState>("loading");

  const setEvents = useCalendarStore((s) => s.setEvents);
  const setViewState = useCalendarStore((s) => s.setViewState);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEvents(demoCalendarEvents);
      setViewState("ready");
      setPageState("ready");
    }, 400);
    return () => clearTimeout(timer);
  }, [setEvents, setViewState]);

  const handleRetry = useCallback(() => {
    setPageState("loading");
    setTimeout(() => {
      setEvents(demoCalendarEvents);
      setViewState("ready");
      setPageState("ready");
    }, 1000);
  }, [setEvents, setViewState]);

  if (pageState === "loading") {
    return <DashboardLoadingState />;
  }

  if (pageState === "error") {
    return <DashboardErrorState onRetry={handleRetry} />;
  }

  return <CalendarLayout />;
}
