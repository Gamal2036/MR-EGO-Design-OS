"use client";

import { FilterX, Pin, PinOff } from "lucide-react";
import { forwardRef, type HTMLAttributes } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/forms";
import { Button, IconButton } from "@/components/foundation";
import { cn } from "@/lib/utils";
import { useTasksStore } from "@/stores/task-store";
import type { TaskCategory, TaskPriority, TaskStatus } from "@/types/task";

const statusOptions: { value: string; label: string }[] = [
  { value: "all", label: "All Statuses" },
  { value: "todo", label: "To Do" },
  { value: "in_progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

const priorityOptions: { value: string; label: string }[] = [
  { value: "all", label: "All Priorities" },
  { value: "urgent", label: "Urgent" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const categoryOptions: { value: string; label: string }[] = [
  { value: "all", label: "All Categories" },
  { value: "career", label: "Career" },
  { value: "learning", label: "Learning" },
  { value: "application", label: "Application" },
  { value: "interview", label: "Interview" },
  { value: "document", label: "Document" },
  { value: "custom", label: "Custom" },
];

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface TaskFiltersProps extends HTMLAttributes<HTMLDivElement> {}

const TaskFilters = forwardRef<HTMLDivElement, TaskFiltersProps>(
  ({ className, ...props }, ref) => {
    const filters = useTasksStore((s) => s.filters);
    const setFilter = useTasksStore((s) => s.setFilter);
    const resetFilters = useTasksStore((s) => s.resetFilters);

    const hasActiveFilters =
      filters.status !== "all" ||
      filters.priority !== "all" ||
      filters.category !== "all" ||
      filters.pinned ||
      filters.isAISuggested;

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        role="toolbar"
        aria-label="Task filters"
        {...props}
      >
        <Select
          value={filters.status}
          onValueChange={(value: string) => setFilter({ status: value as TaskStatus | "all" })}
        >
          <SelectTrigger className="w-[130px]" aria-label="Filter by status">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.priority}
          onValueChange={(value: string) => setFilter({ priority: value as TaskPriority | "all" })}
        >
          <SelectTrigger className="w-[130px]" aria-label="Filter by priority">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            {priorityOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.category}
          onValueChange={(value: string) => setFilter({ category: value as TaskCategory | "all" })}
        >
          <SelectTrigger className="w-[130px]" aria-label="Filter by category">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <IconButton
          icon={filters.pinned ? PinOff : Pin}
          label={filters.pinned ? "Show all tasks" : "Show pinned only"}
          variant={filters.pinned ? "primary" : "ghost"}
          size="sm"
          onClick={() => setFilter({ pinned: !filters.pinned })}
          aria-pressed={filters.pinned}
        />

        {hasActiveFilters && (
          <Button variant="ghost" size="xs" onClick={resetFilters}>
            <FilterX className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  },
);
TaskFilters.displayName = "TaskFilters";

export { TaskFilters };
export type { TaskFiltersProps };
