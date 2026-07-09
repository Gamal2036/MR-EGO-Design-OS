"use client";

import {
  Calendar,
  Send,
  Eye,
  MessageSquare,
  Code,
  Award,
  XCircle,
  CheckCircle2,
  FileEdit,
} from "lucide-react";
import type { HTMLAttributes } from "react";

import type { TimelineEvent } from "@/types/application-tracker";

interface ApplicationTimelineProps extends HTMLAttributes<HTMLDivElement> {
  events: TimelineEvent[];
}

const EVENT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  applied: Send,
  viewed: Eye,
  interview: Calendar,
  "technical-test": Code,
  offer: Award,
  rejected: XCircle,
  accepted: CheckCircle2,
  note: MessageSquare,
  other: FileEdit,
};

const EVENT_COLORS: Record<string, string> = {
  applied: "bg-primary text-primary-foreground",
  viewed: "bg-info text-info-foreground",
  interview: "bg-ai text-ai-foreground",
  "technical-test": "bg-warning text-warning-foreground",
  offer: "bg-success text-success-foreground",
  rejected: "bg-danger text-danger-foreground",
  accepted: "bg-success text-success-foreground",
  note: "bg-neutral-400 text-neutral-900",
  other: "bg-neutral-500 text-neutral-100",
};

export function ApplicationTimeline({ events, className, ...props }: ApplicationTimelineProps) {
  if (events.length === 0) {
    return (
      <div className={`py-6 text-center ${className || ""}`} {...props}>
        <p className="text-caption text-tertiary">No events recorded yet</p>
      </div>
    );
  }

  const sorted = [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className={`space-y-0 ${className || ""}`} role="list" aria-label="Application Timeline" {...props}>
      {sorted.map((event, idx) => {
        const Icon = EVENT_ICONS[event.type] || FileEdit;

        return (
          <div key={event.id} className="relative flex gap-4 pb-6 last:pb-0" role="listitem">
            {idx < sorted.length - 1 && (
              <div className="absolute left-[15px] top-8 h-full w-px bg-border" aria-hidden="true" />
            )}
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                EVENT_COLORS[event.type] || "bg-neutral-100 dark:bg-neutral-800"
              }`}
              aria-hidden="true"
            >
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5 pt-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-label text-primary">{event.title}</h4>
                <span className="shrink-0 text-smallest text-tertiary">{event.date}</span>
              </div>
              {event.description && (
                <p className="text-caption text-secondary">{event.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
