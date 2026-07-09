"use client";

import { Target } from "lucide-react";

import { Button } from "@/components/foundation/button";
import { cn } from "@/lib/utils";

export interface GoalEmptyProps {
  onCreate?: () => void;
  className?: string;
}

export function GoalEmpty({ onCreate, className }: GoalEmptyProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface-0 p-8 text-center",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Target className="h-8 w-8 text-primary" aria-hidden="true" />
      </div>
      <h3 className="text-heading-4 text-primary font-semibold">No goals yet</h3>
      <p className="mt-2 max-w-sm text-body-small text-secondary">
        Define your first SMART goal to start tracking progress, milestones, and AI recommendations.
      </p>
      {onCreate && (
        <Button className="mt-6" onClick={onCreate} leftIcon={<Target className="h-4 w-4" />}>
          Create Goal
        </Button>
      )}
    </div>
  );
}
