"use client";

import { Check } from "lucide-react";

import { goalTypeIcons, goalTypeLabels } from "./goal-utils";

import { Button } from "@/components/foundation/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { SmartGoalTemplate } from "@/types/smart-goal";

export interface GoalTemplateSelectorProps {
  templates: SmartGoalTemplate[];
  selectedId?: string | null;
  className?: string;
  onSelect?: (id: string) => void;
  onApply?: (id: string) => void;
}

export function GoalTemplateSelector({
  templates,
  selectedId,
  className,
  onSelect,
  onApply,
}: GoalTemplateSelectorProps) {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <CardTitle>Goal Templates</CardTitle>
        <CardDescription>Start faster with AI-curated goal templates.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[360px] overflow-y-auto pr-2">
          <ul className="space-y-2" role="list">
            {templates.map((template) => {
              const Icon = goalTypeIcons[template.type];
              const isSelected = selectedId === template.id;
              return (
                <li key={template.id}>
                  <button
                    type="button"
                    onClick={() => onSelect?.(template.id)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border bg-surface-0 hover:bg-surface-1"
                    )}
                    aria-pressed={isSelected}
                  >
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                        isSelected ? "bg-primary text-primary-foreground" : "bg-surface-2 text-secondary"
                      )}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-body-small font-medium text-primary">{template.title}</p>
                      <p className="text-caption text-tertiary">{goalTypeLabels[template.type]} · {template.estimatedDurationWeeks} weeks</p>
                      <p className="mt-1 text-caption text-secondary">{template.description}</p>
                    </div>
                    {isSelected && (
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="h-4 w-4" aria-hidden="true" />
                      </div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        {selectedId && onApply && (
          <Button className="mt-4 w-full" onClick={() => onApply(selectedId)}>
            Use Template
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
