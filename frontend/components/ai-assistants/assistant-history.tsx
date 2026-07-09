"use client";

import { Clock, Heart, MessageSquare } from "lucide-react";

import { cn } from "@/lib/utils";
import type { AssistantHistoryItem } from "@/types/assistant";

interface AssistantHistoryProps {
  history: AssistantHistoryItem[];
  compact?: boolean;
}

export function AssistantHistory({ history, compact = false }: AssistantHistoryProps) {
  if (history.length === 0) return null;

  return (
    <div className={cn("space-y-2", !compact && "space-y-3")}>
      {history.map((item) => (
        <div
          key={item.id}
          className="rounded-lg border border-border bg-surface-1 p-3 transition-colors hover:border-ai/30"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2 min-w-0 flex-1">
              <MessageSquare className="h-4 w-4 text-tertiary mt-0.5 shrink-0" aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-caption font-medium text-primary line-clamp-2">{item.query}</p>
                {!compact && (
                  <p className="text-smallest text-secondary mt-1 line-clamp-2">{item.response}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {item.favorite && (
                <Heart className="h-3.5 w-3.5 fill-danger text-danger" aria-hidden="true" />
              )}
              <span className="flex items-center gap-1 text-smallest text-tertiary">
                <Clock className="h-3 w-3" aria-hidden="true" />
                {new Date(item.timestamp).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
