"use client";

import { Calendar, Command, Sparkles } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps extends HTMLAttributes<HTMLElement> {
  userName?: string;
  careerGoal?: string;
  dateLabel?: string;
}

const DashboardHeader = forwardRef<HTMLElement, DashboardHeaderProps>(
  ({ className, userName = "Alex", careerGoal = "Senior AI Engineer", dateLabel, ...props }, ref) => {
    const today = dateLabel || new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return (
      <header
        ref={ref}
        className={cn("flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between", className)}
        {...props}
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-heading-2 text-primary">
              Welcome back, {userName}
            </h1>
            <Sparkles className="h-5 w-5 text-ai" aria-hidden="true" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="ai" size="sm">
              {careerGoal}
            </Badge>
            <span className="flex items-center gap-1 text-caption text-secondary">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              {today}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 rounded-lg border border-border bg-surface-0 px-3 py-2 text-caption text-tertiary">
            <Command className="h-3.5 w-3.5" aria-hidden="true" />
            <span>
              <kbd className="rounded bg-neutral-100 px-1 font-mono text-smallest dark:bg-neutral-800">
                ⌘K
              </kbd>{" "}
              Quick command
            </span>
          </div>
        </div>
      </header>
    );
  }
);
DashboardHeader.displayName = "DashboardHeader";

export { DashboardHeader };
export type { DashboardHeaderProps };
