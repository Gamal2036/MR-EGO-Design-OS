"use client";

import { Calendar, CheckSquare, Pin } from "lucide-react";
import { forwardRef, type HTMLAttributes } from "react";

import { TaskPriorityBadge } from "./task-priority";
import { TaskProgress } from "./task-progress";

import { Badge } from "@/components/foundation";
import { cn } from "@/lib/utils";
import { useTasksStore } from "@/stores/task-store";

const statusLabel: Record<string, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
  archived: "Archived",
};

const statusVariant: Record<string, "neutral" | "warning" | "success"> = {
  todo: "neutral",
  in_progress: "warning",
  done: "success",
};

const categoryLabel: Record<string, string> = {
  career: "Career",
  learning: "Learning",
  application: "Application",
  interview: "Interview",
  document: "Document",
  custom: "Custom",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

interface TaskListProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  onSelect?: (id: string) => void;
  onTogglePin?: (id: string) => void;
}

const TaskList = forwardRef<HTMLDivElement, TaskListProps>(
  ({ className, onSelect, ...props }, ref) => {
    const getFilteredTasks = useTasksStore((s) => s.getFilteredTasks);
    const tasks = getFilteredTasks();

    const activeTasks = tasks.filter((t: { status: string }) => t.status !== "archived");

    if (activeTasks.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-surface-2 p-4">
            <CheckSquare className="h-6 w-6 text-tertiary" aria-hidden="true" />
          </div>
          <h3 className="mt-4 text-heading-4 text-primary">No tasks found</h3>
          <p className="mt-1 text-body text-secondary">
            Try adjusting your filters or create a new task.
          </p>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("space-y-1", className)}
        role="list"
        aria-label="Task list"
        {...props}
      >
        <div className="hidden grid-cols-12 gap-3 rounded-lg bg-surface-1 px-4 py-2 text-caption text-tertiary md:grid">
          <div className="col-span-4">Task</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Priority</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-1">Deadline</div>
          <div className="col-span-1">Progress</div>
        </div>

        {activeTasks.map((task) => (
          <div
            key={task.id}
            className={cn(
              "grid grid-cols-1 gap-2 rounded-lg border border-border bg-background p-4 transition-colors md:grid-cols-12 md:items-center md:gap-3 md:px-4 md:py-3",
              "hover:bg-accent/30 cursor-pointer",
            )}
            role="listitem"
            tabIndex={0}
            onClick={() => onSelect?.(task.id)}
            onKeyDown={(e) => { if (e.key === "Enter") { onSelect?.(task.id); } }}
            aria-label={task.title}
          >
            <div className="col-span-4 flex items-center gap-2">
              {task.pinned && <Pin className="h-3.5 w-3.5 shrink-0 text-primary" aria-label="Pinned" />}
              <span className="truncate text-body-small font-medium text-primary">{task.title}</span>
            </div>
            <div className="col-span-2">
              <Badge variant={statusVariant[task.status]} size="sm">
                {statusLabel[task.status]}
              </Badge>
            </div>
            <div className="col-span-2">
              <TaskPriorityBadge priority={task.priority} />
            </div>
            <div className="col-span-2">
              <span className="text-caption text-secondary">{categoryLabel[task.category]}</span>
            </div>
            <div className="col-span-1 flex items-center gap-1 text-caption text-tertiary">
              <Calendar className="h-3 w-3" aria-hidden="true" />
              {formatDate(task.deadline)}
            </div>
            <div className="col-span-1">
              <TaskProgress value={task.progress} size="sm" />
            </div>
          </div>
        ))}
      </div>
    );
  },
);
TaskList.displayName = "TaskList";

export { TaskList };
export type { TaskListProps };
