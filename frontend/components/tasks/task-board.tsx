"use client";

import { forwardRef, type HTMLAttributes } from "react";

import { TaskColumn } from "./task-column";
import { TaskEmpty } from "./task-empty";

import { cn } from "@/lib/utils";
import { useTasksStore } from "@/stores/task-store";
import type { TaskStatus } from "@/types/task";

const statuses: TaskStatus[] = ["todo", "in_progress", "done"];

interface TaskBoardProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  onSelect?: (id: string) => void;
  onTogglePin?: (id: string) => void;
  onOpenForm?: () => void;
}

const TaskBoard = forwardRef<HTMLDivElement, TaskBoardProps>(
  ({ className, onSelect, onTogglePin, onOpenForm, ...props }, ref) => {
    const tasks = useTasksStore((s) => s.tasks);
    const getTasksByStatus = useTasksStore((s) => s.getTasksByStatus);

    const activeTasks = tasks.filter((t) => t.status !== "archived");

    if (activeTasks.length === 0) {
      return (
        <TaskEmpty
          type="board"
          onAction={onOpenForm}
          className={className}
        />
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-4 overflow-x-auto pb-4",
          "lg:grid lg:grid-cols-3 lg:overflow-x-visible",
          className,
        )}
        role="region"
        aria-label="Kanban board"
        {...props}
      >
        {statuses.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={getTasksByStatus(status)}
            onSelect={onSelect}
            onTogglePin={onTogglePin}
          />
        ))}
      </div>
    );
  },
);
TaskBoard.displayName = "TaskBoard";

export { TaskBoard };
export type { TaskBoardProps };
