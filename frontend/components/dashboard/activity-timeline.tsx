"use client";

import {
  Brain,
  FileText,
  Briefcase,
  Send,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import type { ActivityItem } from "@/data/dashboard";
import { cn } from "@/lib/utils";

const activityIcons: Record<string, LucideIcon> = {
  ai: Brain,
  cv: FileText,
  job: Briefcase,
  application: Send,
  suggestion: Lightbulb,
};

const activityColors: Record<string, string> = {
  ai: "bg-ai/10 text-ai border-ai/20",
  cv: "bg-primary/10 text-primary border-primary/20",
  job: "bg-info/10 text-info border-info/20",
  application: "bg-warning/10 text-warning border-warning/20",
  suggestion: "bg-success/10 text-success border-success/20",
};

interface ActivityTimelineProps extends HTMLAttributes<HTMLDivElement> {
  activities: ActivityItem[];
}

const ActivityTimeline = forwardRef<HTMLDivElement, ActivityTimelineProps>(
  ({ className, activities, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("", className)}
        role="region"
        aria-label="Recent Activity"
        {...props}
      >
        <h2 className="text-heading-4 text-primary mb-4">Recent Activity</h2>
        <div className="relative">
          <div
            className="absolute left-[19px] top-2 bottom-2 w-px bg-border"
            aria-hidden="true"
          />
          <ul className="space-y-0">
            {activities.map((activity) => {
              const Icon = activityIcons[activity.type] || Lightbulb;
              return (
                <li key={activity.id} className="relative flex gap-4 pb-5 last:pb-0">
                  <div
                    className={cn(
                      "relative z-10 flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full border",
                      activityColors[activity.type] || "bg-neutral-100 text-neutral-500 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700"
                    )}
                    aria-hidden="true"
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0 pt-1.5">
                    <p className="text-label font-medium text-primary">
                      {activity.title}
                    </p>
                    <p className="text-caption text-secondary mt-0.5">
                      {activity.description}
                    </p>
                    <p className="text-smallest text-tertiary mt-1">
                      {activity.timestamp}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    );
  }
);
ActivityTimeline.displayName = "ActivityTimeline";

export { ActivityTimeline };
export type { ActivityTimelineProps };
