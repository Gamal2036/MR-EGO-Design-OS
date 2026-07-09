"use client";

import { Plus, Trash2, AlertCircle, Clock, ArrowUp } from "lucide-react";
import { useState, type HTMLAttributes, type FormEvent } from "react";

import type { ApplicationPriority, TaskItem } from "@/types/application-tracker";

interface ApplicationTaskChecklistProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'onToggle'> {
  tasks: TaskItem[];
  onToggle: (taskId: string) => void;
  onAdd: (text: string, priority: ApplicationPriority, dueDate?: string) => void;
  onDelete: (taskId: string) => void;
}

const PRIORITY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  high: AlertCircle,
  medium: ArrowUp,
  low: Clock,
};

const PRIORITY_COLORS: Record<string, string> = {
  high: "text-danger",
  medium: "text-warning",
  low: "text-tertiary",
};

export function ApplicationTaskChecklist({
  tasks,
  onToggle,
  onAdd,
  onDelete,
  className,
  ...props
}: ApplicationTaskChecklistProps) {
  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState<ApplicationPriority>("medium");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    onAdd(newTask.trim(), newPriority);
    setNewTask("");
    setNewPriority("medium");
    setShowForm(false);
  };

  const completed = tasks.filter((t) => t.completed).length;
  const total = tasks.length;

  return (
    <div className={`space-y-3 ${className || ""}`} {...props}>
      <div className="flex items-center justify-between">
        <h4 className="text-label text-primary">Tasks</h4>
        {total > 0 && (
          <span className="text-caption text-tertiary">
            {completed}/{total}
          </span>
        )}
      </div>

      {total > 0 && (
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
          <div
            className="h-full rounded-full bg-ai transition-all duration-normal"
            style={{ width: `${(completed / total) * 100}%` }}
            role="progressbar"
            aria-valuenow={completed}
            aria-valuemin={0}
            aria-valuemax={total}
            aria-label={`${completed} of ${total} tasks complete`}
          />
        </div>
      )}

      <div className="space-y-1" role="list" aria-label="Task list">
        {tasks.map((task) => {
          const PriorityIcon = PRIORITY_ICONS[task.priority] || Clock;
          return (
            <div
              key={task.id}
              className="flex items-start gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-surface-0 group"
              role="listitem"
            >
              <button
                type="button"
                onClick={() => onToggle(task.id)}
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                  task.completed
                    ? "border-success bg-success text-white"
                    : "border-border hover:border-primary"
                }`}
                aria-label={`Mark "${task.text}" as ${task.completed ? "incomplete" : "complete"}`}
                aria-checked={task.completed}
                role="checkbox"
              >
                {task.completed && (
                  <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <div className="flex-1 min-w-0">
                <span
                  className={`text-body-small transition-colors ${
                    task.completed ? "text-tertiary line-through" : "text-primary"
                  }`}
                >
                  {task.text}
                </span>
                {task.dueDate && (
                  <span className="ml-2 text-smallest text-tertiary">Due {task.dueDate}</span>
                )}
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <PriorityIcon className={`h-3.5 w-3.5 ${PRIORITY_COLORS[task.priority]}`} aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => onDelete(task.id)}
                  className="text-tertiary hover:text-danger transition-colors"
                  aria-label={`Delete task: ${task.text}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showForm ? (
        <form onSubmit={handleSubmit} className="space-y-2 rounded-lg border border-border bg-surface-0 p-3">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-body-small text-primary placeholder:text-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            autoFocus
            aria-label="New task description"
          />
          <div className="flex items-center justify-between">
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value as ApplicationPriority)}
              className="rounded-md border border-border bg-background px-2 py-1 text-caption text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Task priority"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-md px-3 py-1.5 text-caption text-secondary hover:text-primary transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newTask.trim()}
                className="rounded-md bg-primary px-3 py-1.5 text-caption text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border py-2.5 text-caption text-tertiary transition-colors hover:border-hover hover:text-secondary"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add Task
        </button>
      )}
    </div>
  );
}
