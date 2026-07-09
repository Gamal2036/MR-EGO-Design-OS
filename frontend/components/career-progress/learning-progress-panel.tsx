"use client";

import {
  Award,
  BookOpen,
  Dumbbell,
  FlaskConical,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { useMemo } from "react";
import { type HTMLAttributes, forwardRef } from "react";

import { ProgressBar } from "@/components/feedback/progress-bar";
import { Badge } from "@/components/foundation/badge";
import { Button } from "@/components/foundation/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { learningStatusConfig, learningTypeConfig } from "@/data/career-progress";
import { cn } from "@/lib/utils";
import type { LearningItem, LearningItemType } from "@/types/career-progress";

export interface LearningProgressPanelProps extends HTMLAttributes<HTMLDivElement> {
  items: LearningItem[];
  selectedType?: LearningItemType | "all";
  onTypeChange?: (type: LearningItemType | "all") => void;
}

const typeIcons: Record<string, LucideIcon> = {
  BookOpen,
  FlaskConical,
  Award,
  Dumbbell,
};

const types: { value: LearningItemType | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "course", label: "Courses" },
  { value: "lab", label: "Labs" },
  { value: "certificate", label: "Certificates" },
  { value: "practice", label: "Practice" },
];

const LearningProgressPanel = forwardRef<HTMLDivElement, LearningProgressPanelProps>(
  (
    { className, items, selectedType = "all", onTypeChange, ...props },
    ref
  ) => {
    const filteredItems = useMemo(() => {
      if (selectedType === "all") return items;
      return items.filter((i) => i.type === selectedType);
    }, [items, selectedType]);

    const totalProgress = useMemo(() => {
      if (items.length === 0) return 0;
      return Math.round(items.reduce((sum, i) => sum + i.progress, 0) / items.length);
    }, [items]);

    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("h-full", className)}
        role="region"
        aria-label="Learning progress"
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-ai" aria-hidden="true" />
            <CardTitle>Learning Progress</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="rounded-xl border border-border bg-surface-0 p-4">
            <div className="flex items-center justify-between">
              <span className="text-body-small text-secondary">
                Overall learning progress
              </span>
              <span className="text-heading-4 font-semibold text-primary">
                {totalProgress}%
              </span>
            </div>
            <div className="mt-2">
              <ProgressBar value={totalProgress} variant="ai" size="md" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {types.map((type) => (
              <Button
                key={type.value}
                type="button"
                variant={selectedType === type.value ? "secondary" : "ghost"}
                size="xs"
                onClick={() => onTypeChange?.(type.value)}
              >
                {type.label}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3">
            {filteredItems.map((item) => {
              const typeConfig = learningTypeConfig[item.type];
              const statusConfig = learningStatusConfig[item.status];
              const Icon = typeIcons[typeConfig.icon] || BookOpen;

              return (
                <div
                  key={item.id}
                  className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-hover"
                  role="listitem"
                  aria-label={`${item.title}: ${statusConfig.label}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div
                        className={cn(
                          "rounded-lg p-2 shrink-0",
                          typeConfig.bg ?? "bg-surface-1",
                          typeConfig.color
                        )}
                        aria-hidden="true"
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-label font-medium text-primary truncate">
                          {item.title}
                        </h4>
                        <p className="text-smallest text-tertiary">
                          {item.provider} · {item.duration}
                        </p>
                      </div>
                    </div>
                    <Badge variant={statusConfig.variant} size="xs">
                      {statusConfig.label}
                    </Badge>
                  </div>
                  <div className="mt-3 space-y-1">
                    <ProgressBar
                      value={item.progress}
                      variant={
                        item.progress >= 80
                          ? "success"
                          : item.progress >= 40
                          ? "ai"
                          : "warning"
                      }
                      size="sm"
                      showLabel
                    />
                  </div>
                  {item.dueDate && (
                    <p className="text-caption text-tertiary mt-2">
                      Due {item.dueDate}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }
);
LearningProgressPanel.displayName = "LearningProgressPanel";

export { LearningProgressPanel };
