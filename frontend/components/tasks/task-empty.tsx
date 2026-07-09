"use client";

import { ClipboardList, Filter, Columns } from "lucide-react";
import { forwardRef, type HTMLAttributes } from "react";

import { Button } from "@/components/foundation";
import { cn } from "@/lib/utils";

interface TaskEmptyProps extends HTMLAttributes<HTMLDivElement> {
  type: "tasks" | "filtered" | "board";
  onAction?: () => void;
}

const config = {
  tasks: {
    icon: ClipboardList,
    title: "No tasks yet",
    description: "Get started by creating your first task to track your progress.",
    actionLabel: "Create Task",
  },
  filtered: {
    icon: Filter,
    title: "No matching tasks",
    description: "Try adjusting your filters or search to find what you're looking for.",
    actionLabel: "Clear Filters",
  },
  board: {
    icon: Columns,
    title: "Empty board",
    description: "Your kanban board is empty. Add tasks to get started.",
    actionLabel: "Create Task",
  },
};

const TaskEmpty = forwardRef<HTMLDivElement, TaskEmptyProps>(
  ({ className, type, onAction, ...props }, ref) => {
    const { icon: Icon, title, description, actionLabel } = config[type];

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center py-16 px-6 text-center",
          className,
        )}
        role="status"
        {...props}
      >
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-surface-2">
          <Icon className="h-6 w-6 text-tertiary" aria-hidden="true" />
        </div>
        <h3 className="mb-1 text-heading-4 text-primary">{title}</h3>
        <p className="mb-6 max-w-xs text-body text-secondary">{description}</p>
        {onAction && (
          <Button variant="primary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </div>
    );
  },
);
TaskEmpty.displayName = "TaskEmpty";

export { TaskEmpty };
export type { TaskEmptyProps };
