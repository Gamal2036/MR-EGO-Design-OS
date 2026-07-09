"use client";

import { CheckCircle, Circle, Plus } from "lucide-react";
import { forwardRef, type HTMLAttributes } from "react";

import { Button, Card, CardHeader, CardTitle } from "@/components/foundation";
import { cn } from "@/lib/utils";
import type { InterviewChecklistItem } from "@/types/interview";

interface InterviewChecklistProps extends Omit<HTMLAttributes<HTMLDivElement>, "onToggle"> {
  items: InterviewChecklistItem[];
  onToggleItem?: (itemId: string) => void;
  onAdd?: () => void;
}

const InterviewChecklist = forwardRef<HTMLDivElement, InterviewChecklistProps>(
  ({ className, items, onToggleItem, onAdd, ...props }, ref) => {
    const doneCount = items.filter((i) => i.done).length;
    const total = items.length;
    const progress = total > 0 ? Math.round((doneCount / total) * 100) : 0;

    return (
      <Card ref={ref} className={cn("w-full", className)} {...props}>
        <CardHeader
          action={
            <Button
              variant="ghost"
              size="xs"
              leftIcon={<Plus className="h-3 w-3" />}
              onClick={onAdd}
            >
              Add
            </Button>
          }
        >
          <CardTitle className="text-body font-medium">Preparation Checklist</CardTitle>
        </CardHeader>

        <div className="mb-3">
          <div className="flex items-center justify-between text-caption text-tertiary mb-1">
            <span>
              {doneCount}/{total} completed
            </span>
            <span className="font-medium text-secondary">{progress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-primary transition-all duration-normal"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          {items.map((item) => (
            <button
              key={item.id}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left transition-colors",
                "hover:bg-surface-1",
              )}
              onClick={() => onToggleItem?.(item.id)}
              aria-label={`${item.done ? "Uncheck" : "Check"}: ${item.title}`}
            >
              {item.done ? (
                <CheckCircle className="h-4 w-4 shrink-0 text-success" aria-hidden="true" />
              ) : (
                <Circle className="h-4 w-4 shrink-0 text-tertiary" aria-hidden="true" />
              )}
              <span
                className={cn(
                  "text-body-small",
                  item.done ? "text-tertiary line-through" : "text-primary",
                )}
              >
                {item.title}
              </span>
            </button>
          ))}
          {items.length === 0 && (
            <p className="text-body-small text-tertiary text-center py-4">
              No checklist items yet.
            </p>
          )}
        </div>
      </Card>
    );
  },
);
InterviewChecklist.displayName = "InterviewChecklist";

export { InterviewChecklist };
export type { InterviewChecklistProps };
