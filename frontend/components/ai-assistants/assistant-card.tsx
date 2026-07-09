"use client";

import {
  Heart,
  Pin,
  Clock,
} from "lucide-react";
import { forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { Assistant } from "@/types/assistant";

const statusColors: Record<string, string> = {
  online: "bg-success",
  offline: "bg-neutral-400",
  busy: "bg-warning",
  away: "bg-info",
};

const categoryLabels: Record<string, string> = {
  career: "Career",
  cv: "CV",
  jobs: "Jobs",
  interview: "Interview",
  learning: "Learning",
  skills: "Skills",
  salary: "Salary",
  recruiter: "Recruiter",
  documents: "Documents",
  writing: "Writing",
  general: "General",
};

interface AssistantCardProps {
  assistant: Assistant;
  active?: boolean;
  onSelect?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  onTogglePinned?: (id: string) => void;
  className?: string;
}

const AssistantCard = forwardRef<HTMLDivElement, AssistantCardProps>(
  (
    {
      className,
      assistant,
      active = false,
      onSelect,
      onToggleFavorite: _onToggleFavorite,
      onTogglePinned: _onTogglePinned,
    },
    ref,
  ) => {
    return (
      <Card
        ref={ref}
        variant={active ? "interactive" : "default"}
        padding="sm"
        className={cn(
          "cursor-pointer transition-all duration-normal",
          active && "ring-1 ring-ai/50 border-ai/30 bg-ai/5",
          className,
        )}
        onClick={() => onSelect?.(assistant.id)}
        role="button"
        tabIndex={0}
        aria-current={active ? "true" : undefined}
        aria-label={`${assistant.name} assistant, ${assistant.status}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect?.(assistant.id);
          }
        }}
      >
        <CardHeader className="mb-2">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ai/10 text-ai text-label font-semibold">
                {assistant.initials}
              </div>
              <span
                className={cn(
                  "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card",
                  statusColors[assistant.status],
                )}
                aria-label={assistant.status}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <CardTitle className="text-body-small font-semibold truncate">
                  {assistant.name}
                </CardTitle>
                {assistant.favorite && (
                  <Heart className="h-3 w-3 shrink-0 fill-danger text-danger" aria-hidden="true" />
                )}
                {assistant.pinned && (
                  <Pin className="h-3 w-3 shrink-0 text-ai" aria-hidden="true" />
                )}
              </div>
              <CardDescription className="text-caption text-tertiary truncate mt-0.5">
                {assistant.provider} · {assistant.model}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-caption text-secondary line-clamp-2">
            {assistant.description}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="ai" size="xs">
              {categoryLabels[assistant.category]}
            </Badge>
            <span className="flex items-center gap-1 text-smallest text-tertiary">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {assistant.lastActivity}
            </span>
          </div>
        </CardContent>
      </Card>
    );
  },
);
AssistantCard.displayName = "AssistantCard";

export { AssistantCard, categoryLabels, statusColors };
export type { AssistantCardProps };
