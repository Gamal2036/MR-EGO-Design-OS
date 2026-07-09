"use client";

import { CheckSquare, Square } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { severityConfig } from "@/data/cv-analysis";
import { cn } from "@/lib/utils";
import type { ImprovementItem } from "@/types/cv-analysis";

export interface ImprovementChecklistProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onToggle"> {
  improvements: ImprovementItem[];
  onToggle?: (id: string) => void;
}

const ImprovementChecklist = forwardRef<
  HTMLDivElement,
  ImprovementChecklistProps
>(({ className, improvements, onToggle, ...props }, ref) => {
  const completed = improvements.filter((i) => i.completed).length;
  const total = improvements.length;

  return (
    <Card
      ref={ref}
      variant="default"
      padding="lg"
      className={cn("", className)}
      role="region"
      aria-label="Improvement checklist"
      {...props}
    >
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <CardTitle>Improvement Checklist</CardTitle>
          <span className="text-caption text-tertiary">
            {completed}/{total}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {improvements.map((item) => {
            const severity = severityConfig[item.priority];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onToggle?.(item.id)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors duration-fast",
                  "hover:bg-surface-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                  item.completed && "opacity-60"
                )}
                aria-checked={item.completed}
                role="checkbox"
              >
                <div className="mt-0.5 shrink-0">
                  {item.completed ? (
                    <CheckSquare
                      className="h-4 w-4 text-success"
                      aria-hidden="true"
                    />
                  ) : (
                    <Square
                      className="h-4 w-4 text-tertiary"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "text-label font-medium",
                        item.completed
                          ? "text-tertiary line-through"
                          : "text-primary"
                      )}
                    >
                      {item.title}
                    </span>
                    <Badge variant={severity.variant} size="xs">
                      {severity.label}
                    </Badge>
                  </div>
                  <p
                    className={cn(
                      "text-caption mt-0.5",
                      item.completed ? "text-tertiary" : "text-secondary"
                    )}
                  >
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
});
ImprovementChecklist.displayName = "ImprovementChecklist";

export { ImprovementChecklist };
