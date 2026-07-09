"use client";

import { forwardRef, type HTMLAttributes } from "react";

import { TaskCard } from "./task-card";

import { cn } from "@/lib/utils";
import type { Task, TaskStatus } from "@/types/task";

const statusTitle: Record<TaskStatus, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
  archived: "Archived",
};

const statusColor: Record<TaskStatus, string> = {
  todo: "bg-neutral-400",
  in_progress: "bg-warning",
  done: "bg-success",
  archived: "bg-tertiary",
};

interface TaskColumnProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  status: TaskStatus;
  tasks: Task[];
  onSelect?: (id: string) => void;
  onTogglePin?: (id: string) => void;
}

const TaskColumn = forwardRef<HTMLDivElement, TaskColumnProps>(
  ({ className, status, tasks, onSelect, onTogglePin, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex w-[280px] shrink-0 flex-col rounded-xl border border-border bg-surface-1 lg:w-auto",
          className,
        )}
        role="region"
        aria-label={`${statusTitle[status]} column`}
        {...props}
      >
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className={cn("h-2 w-2 rounded-full", statusColor[status])} aria-hidden="true" />
          <h3 className="text-label font-semibold text-primary">{statusTitle[status]}</h3>
          <span className="ml-auto rounded-full bg-surface-2 px-2 py-0.5 text-caption text-tertiary">
            {tasks.length}
          </span>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-3">
          {tasks.length === 0 ? (
            <p className="py-8 text-center text-caption text-tertiary">
              No tasks
            </p>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onSelect={onSelect}
                onTogglePin={onTogglePin}
              />
            ))
          )}
        </div>
      </div>
    );
  },
);
TaskColumn.displayName = "TaskColumn";

export { TaskColumn };
export type { TaskColumnProps };
