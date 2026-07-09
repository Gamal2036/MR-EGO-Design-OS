"use client";

import { LayoutPanelTop, ListChecks, Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import {
  DashboardErrorState,
  DashboardLoadingState,
} from "@/components/dashboard";
import { Button } from "@/components/foundation/button";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import {
  TaskBoard,
  TaskDetails,
  TaskEmpty,
  TaskFilters,
  TaskForm,
  TaskList,
  TaskSearch,
} from "@/components/tasks";
import { demoTasks } from "@/data/tasks";
import { cn } from "@/lib/utils";
import { useTasksStore } from "@/stores/task-store";

type PageState = "loading" | "ready" | "error";

export default function TasksPage() {
  const [pageState, setPageState] = useState<PageState>("loading");

  const viewMode = useTasksStore((s) => s.viewMode);
  const setViewMode = useTasksStore((s) => s.setViewMode);
  const setTasks = useTasksStore((s) => s.setTasks);
  const setViewState = useTasksStore((s) => s.setViewState);
  const selectedTaskId = useTasksStore((s) => s.selectedTaskId);
  const isFormOpen = useTasksStore((s) => s.isFormOpen);
  const openForm = useTasksStore((s) => s.openForm);
  const filters = useTasksStore((s) => s.filters);
  const setFilter = useTasksStore((s) => s.setFilter);
  const resetFilters = useTasksStore((s) => s.resetFilters);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTasks(demoTasks);
      setViewState("ready");
      setPageState("ready");
    }, 400);
    return () => clearTimeout(timer);
  }, [setTasks, setViewState]);

  const handleRetry = useCallback(() => {
    setPageState("loading");
    setTimeout(() => {
      setTasks(demoTasks);
      setViewState("ready");
      setPageState("ready");
    }, 1000);
  }, [setTasks, setViewState]);

  if (pageState === "loading") {
    return <DashboardLoadingState />;
  }

  if (pageState === "error") {
    return <DashboardErrorState onRetry={handleRetry} />;
  }

  const hasActiveFilters =
    filters.status !== "all" ||
    filters.priority !== "all" ||
    filters.category !== "all" ||
    filters.search !== "" ||
    filters.pinned ||
    filters.isAISuggested;

  return (
    <div className="flex h-full flex-col bg-background" role="main" aria-label="Tasks">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-1 flex-col px-5 py-6 md:px-7 md:py-8 lg:px-8 lg:py-10">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <Breadcrumb
              items={[
                { label: "Dashboard", href: "/dashboard" },
                { label: "Tasks" },
              ]}
            />
            <h1 className="text-heading-3 text-primary font-semibold">Tasks</h1>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="flex items-center rounded-lg border border-border bg-surface-1 p-1"
              role="group"
              aria-label="View mode"
            >
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-caption transition-colors",
                  viewMode === "list"
                    ? "bg-primary text-primary-foreground"
                    : "text-tertiary hover:text-secondary",
                )}
                aria-pressed={viewMode === "list"}
                aria-label="List view"
              >
                <ListChecks className="h-4 w-4" />
                <span className="hidden sm:inline">List</span>
              </button>
              <button
                onClick={() => setViewMode("board")}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-caption transition-colors",
                  viewMode === "board"
                    ? "bg-primary text-primary-foreground"
                    : "text-tertiary hover:text-secondary",
                )}
                aria-pressed={viewMode === "board"}
                aria-label="Board view"
              >
                <LayoutPanelTop className="h-4 w-4" />
                <span className="hidden sm:inline">Board</span>
              </button>
            </div>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={() => openForm()}
            >
              New Task
            </Button>
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1">
            <TaskSearch
              value={filters.search}
              onChange={(search) => setFilter({ search })}
            />
          </div>
          <div className="flex items-center gap-2">
            <TaskFilters />
            {hasActiveFilters && (
              <Button variant="ghost" size="xs" onClick={resetFilters}>
                Clear
              </Button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {viewMode === "board" ? <TaskBoard /> : <TaskList />}
          <TaskEmpty type="tasks" />
        </div>
      </div>

      {isFormOpen && <TaskForm />}
      {selectedTaskId && <TaskDetails />}
    </div>
  );
}
