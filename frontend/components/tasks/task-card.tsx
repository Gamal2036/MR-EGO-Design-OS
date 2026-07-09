"use client";

import { Calendar, CheckSquare, Pin, PinOff } from "lucide-react";
import { forwardRef, type HTMLAttributes } from "react";

import { TaskPriorityBadge } from "./task-priority";
import { TaskProgress } from "./task-progress";

import { Badge, Card, IconButton } from "@/components/foundation";
import { cn } from "@/lib/utils";
import type { Task } from "@/types/task";

const categoryLabel: Record<string, string> = {
  career: "Career",
  learning: "Learning",
  application: "Application",
  interview: "Interview",
  document: "Document",
  custom: "Custom",
};

const badgeVariant: Record<string, "primary" | "info" | "success" | "warning" | "neutral" | "ai"> = {
  career: "primary",
  learning: "info",
  application: "success",
  interview: "warning",
  document: "neutral",
  custom: "ai",
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function isOverdue(dateStr: string): boolean {
  return new Date(dateStr) < new Date();
}

interface TaskCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  task: Task;
  onSelect?: (id: string) => void;
  onTogglePin?: (id: string) => void;
}

const TaskCard = forwardRef<HTMLDivElement, TaskCardProps>(
  ({ className, task, onSelect, onTogglePin, ...props }, ref) => {
    const doneSubtasks = task.subtasks.filter((s) => s.done).length;

    return (
      <Card
        ref={ref}
        variant="interactive"
        padding="sm"
        className={cn("group", className)}
        role="article"
        aria-label={task.title}
        tabIndex={0}
        onClick={() => onSelect?.(task.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect?.(task.id);
          }
        }}
        {...props}
      >
        <div className="flex items-start justify-between gap-2">
          <Badge variant={badgeVariant[task.category]} size="sm">
            {categoryLabel[task.category]}
          </Badge>
          <IconButton
            icon={task.pinned ? PinOff : Pin}
            label={task.pinned ? "Unpin task" : "Pin task"}
            variant="ghost"
            size="xs"
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin?.(task.id);
            }}
          />
        </div>

        <h4 className="mt-2 text-body font-medium text-primary line-clamp-2 group-hover:text-accent-foreground">
          {task.title}
        </h4>

        <p className="mt-1 line-clamp-2 text-caption text-tertiary">
          {task.description}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <TaskPriorityBadge priority={task.priority} />
          <span
            className={cn(
              "inline-flex items-center gap-1 text-caption",
              isOverdue(task.deadline)
                ? "text-danger"
                : "text-tertiary",
            )}
          >
            <Calendar className="h-3 w-3" aria-hidden="true" />
            {formatDate(task.deadline)}
          </span>
        </div>

        {task.subtasks.length > 0 && (
          <div className="mt-2 flex items-center gap-1 text-caption text-tertiary">
            <CheckSquare className="h-3 w-3" aria-hidden="true" />
            <span>
              {doneSubtasks}/{task.subtasks.length}
            </span>
          </div>
        )}

        <TaskProgress value={task.progress} size="sm" />
      </Card>
    );
  },
);
TaskCard.displayName = "TaskCard";

export { TaskCard };
export type { TaskCardProps };
