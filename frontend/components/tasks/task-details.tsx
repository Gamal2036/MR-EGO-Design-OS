"use client";

import {
  Archive,
  Calendar,
  CheckSquare,
  Clock,
  Copy,
  Edit,
  Pin,
  PinOff,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import { forwardRef, type HTMLAttributes } from "react";

import { TaskPriorityBadge } from "./task-priority";
import { TaskProgress } from "./task-progress";

import { Checkbox } from "@/components/forms";
import { Badge, Button, IconButton } from "@/components/foundation";
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
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

interface TaskDetailsProps extends HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

const TaskDetails = forwardRef<HTMLDivElement, TaskDetailsProps>(
  ({ className, onClose, ...props }, ref) => {
    const selectedTaskId = useTasksStore((s) => s.selectedTaskId);
    const selectTask = useTasksStore((s) => s.selectTask);
    const getTaskById = useTasksStore((s) => s.getTaskById);
    const openForm = useTasksStore((s) => s.openForm);
    const deleteTask = useTasksStore((s) => s.deleteTask);
    const duplicateTask = useTasksStore((s) => s.duplicateTask);
    const archiveTask = useTasksStore((s) => s.archiveTask);
    const togglePin = useTasksStore((s) => s.togglePin);
    const toggleSubtask = useTasksStore((s) => s.toggleSubtask);

    const task = selectedTaskId ? getTaskById(selectedTaskId) : undefined;

    if (!task) return null;

    const handleClose = () => {
      selectTask(null);
      onClose?.();
    };

    return (
      <div
        ref={ref}
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full max-w-lg border-l border-border bg-background shadow-strong",
          "flex flex-col",
          className,
        )}
        role="dialog"
        aria-label={`Task: ${task.title}`}
        aria-modal="true"
        {...props}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-heading-4 text-primary font-semibold truncate">
            {task.title}
          </h2>
          <IconButton
            icon={X}
            label="Close details"
            variant="ghost"
            size="sm"
            onClick={handleClose}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <p className="text-body text-secondary">{task.description}</p>

          <div className="flex flex-wrap gap-3">
            <div className="space-y-1">
              <span className="text-caption text-tertiary">Status</span>
              <Badge variant={statusVariant[task.status]} size="sm">
                {statusLabel[task.status]}
              </Badge>
            </div>
            <div className="space-y-1">
              <span className="text-caption text-tertiary">Category</span>
              <Badge size="sm">{categoryLabel[task.category]}</Badge>
            </div>
            <div className="space-y-1">
              <span className="text-caption text-tertiary">Priority</span>
              <TaskPriorityBadge priority={task.priority} />
            </div>
          </div>

          <TaskProgress value={task.progress} size="md" />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="flex items-center gap-1 text-caption text-tertiary">
                <Calendar className="h-3 w-3" aria-hidden="true" />
                Deadline
              </span>
              <span className="text-body-small text-primary">{formatDate(task.deadline)}</span>
            </div>
            <div className="space-y-1">
              <span className="flex items-center gap-1 text-caption text-tertiary">
                <Clock className="h-3 w-3" aria-hidden="true" />
                Estimated
              </span>
              <span className="text-body-small text-primary">{formatTime(task.estimatedTime)}</span>
            </div>
          </div>

          {task.subtasks.length > 0 && (
            <div className="space-y-2">
              <span className="flex items-center gap-1 text-caption text-tertiary">
                <CheckSquare className="h-3 w-3" aria-hidden="true" />
                Subtasks ({task.subtasks.filter((s: { done: boolean }) => s.done).length}/{task.subtasks.length})
              </span>
              <div className="space-y-1">
                {task.subtasks.map((st: { id: string; title: string; done: boolean }) => (
                  <label
                    key={st.id}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent/50 cursor-pointer"
                  >
                    <Checkbox
                      checked={st.done}
                      onCheckedChange={() => toggleSubtask(task.id, st.id)}
                    />
                    <span className={cn("text-body-small", st.done && "line-through text-tertiary")}>
                      {st.title}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {task.tags.length > 0 && (
            <div className="space-y-2">
              <span className="flex items-center gap-1 text-caption text-tertiary">
                <Tag className="h-3 w-3" aria-hidden="true" />
                Tags
              </span>
              <div className="flex flex-wrap gap-1.5">
                {task.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-full bg-surface-2 px-2.5 py-0.5 text-caption text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {task.notes && (
            <div className="space-y-1">
              <span className="text-caption text-tertiary">Notes</span>
              <p className="rounded-lg bg-surface-1 p-3 text-body-small text-secondary">
                {task.notes}
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-border p-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Edit className="h-4 w-4" />}
              onClick={() => {
                openForm(task.id);
              }}
            >
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Copy className="h-4 w-4" />}
              onClick={() => duplicateTask(task.id)}
            >
              Duplicate
            </Button>
            <Button
              variant="ghost"
              size="sm"
              leftIcon={task.pinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
              onClick={() => togglePin(task.id)}
            >
              {task.pinned ? "Unpin" : "Pin"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<Archive className="h-4 w-4" />}
              onClick={() => {
                archiveTask(task.id);
                handleClose();
              }}
            >
              Archive
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              leftIcon={<Trash2 className="h-4 w-4" />}
              onClick={() => {
                deleteTask(task.id);
                handleClose();
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    );
  },
);
TaskDetails.displayName = "TaskDetails";

export { TaskDetails };
export type { TaskDetailsProps };
