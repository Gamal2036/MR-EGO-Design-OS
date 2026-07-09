"use client";

import { CalendarDays, CheckCircle2, Circle } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { TimelineEvent } from "@/types/cv-analysis";

export interface AnalysisTimelineProps
  extends HTMLAttributes<HTMLDivElement> {
  timeline: TimelineEvent[];
}

const typeConfig = {
  improvement: { color: "border-ai", dot: "bg-ai" },
  milestone: { color: "border-success", dot: "bg-success" },
  suggestion: { color: "border-warning", dot: "bg-warning" },
} as const;

const AnalysisTimeline = forwardRef<HTMLDivElement, AnalysisTimelineProps>(
  ({ className, timeline, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("", className)}
        role="region"
        aria-label="Improvement timeline"
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <CalendarDays
              className="h-5 w-5 text-primary"
              aria-hidden="true"
            />
            <CardTitle>Improvement Timeline</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-6">
              {timeline.map((event) => {
                const config = typeConfig[event.type];
                return (
                  <div key={event.id} className="relative pl-10">
                    <div
                      className={cn(
                        "absolute left-2.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-background",
                        config.dot
                      )}
                    >
                      {event.completed ? (
                        <CheckCircle2 className="h-3 w-3 text-white" />
                      ) : (
                        <Circle className="h-2 w-2 text-white" />
                      )}
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-label font-medium text-primary">
                          {event.title}
                        </p>
                        <p className="text-caption text-secondary mt-0.5">
                          {event.description}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "shrink-0 text-smallest font-medium",
                          event.completed
                            ? "text-success"
                            : "text-tertiary"
                        )}
                      >
                        {event.date}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);
AnalysisTimeline.displayName = "AnalysisTimeline";

export { AnalysisTimeline };
