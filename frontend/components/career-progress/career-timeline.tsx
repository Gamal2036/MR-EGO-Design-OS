"use client";

import {
  Award,
  BookOpen,
  Flag,
  Target,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { timelineTypeConfig } from "@/data/career-progress";
import { cn } from "@/lib/utils";
import type { TimelineEvent } from "@/types/career-progress";

export interface CareerTimelineProps extends HTMLAttributes<HTMLDivElement> {
  events: TimelineEvent[];
}

const typeIcons: Record<string, LucideIcon> = {
  Flag,
  Target,
  Zap,
  BookOpen,
  Award,
};

const CareerTimeline = forwardRef<HTMLDivElement, CareerTimelineProps>(
  ({ className, events, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("h-full", className)}
        role="region"
        aria-label="Career progress timeline"
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-primary" aria-hidden="true" />
            <CardTitle>Progress Timeline</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div role="list" aria-label="Timeline events" className="space-y-0">
            {events.map((event, index) => {
              const config = timelineTypeConfig[event.type];
              const Icon = typeIcons[config.icon] || Flag;

              return (
                <div
                  key={event.id}
                  className="relative flex gap-4"
                  role="listitem"
                  aria-label={`${event.title}: ${event.completed ? "Completed" : "In progress"}`}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border-2",
                        event.completed
                          ? "border-success bg-success text-success-foreground"
                          : "border-border bg-surface-1 text-tertiary"
                      )}
                      aria-hidden="true"
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    {index < events.length - 1 && (
                      <div
                        className={cn(
                          "mt-2 h-full w-0.5 min-h-[1.5rem]",
                          event.completed ? "bg-success/50" : "bg-border"
                        )}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4
                        className={cn(
                          "text-label font-medium",
                          event.completed ? "text-primary" : "text-secondary"
                        )}
                      >
                        {event.title}
                      </h4>
                      <Badge
                        variant={event.completed ? "success" : "neutral"}
                        size="xs"
                      >
                        {event.completed ? "Done" : "Pending"}
                      </Badge>
                      <Badge variant="outline" size="xs" className={config.color}>
                        {config.label}
                      </Badge>
                    </div>
                    <p className="text-smallest text-tertiary mt-0.5">
                      {event.description}
                    </p>
                    <p className="text-caption text-tertiary mt-1">{event.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }
);
CareerTimeline.displayName = "CareerTimeline";

export { CareerTimeline };
