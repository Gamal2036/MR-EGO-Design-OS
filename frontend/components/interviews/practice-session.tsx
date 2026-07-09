"use client";

import {
  Play,
  Pause,
  CheckCircle,
  Clock,
  BarChart3,
} from "lucide-react";
import { forwardRef, type HTMLAttributes } from "react";

import { Badge, Button, Card } from "@/components/foundation";
import { cn } from "@/lib/utils";
import type { PracticeSession } from "@/types/interview";

const typeBadgeVariant: Record<
  string,
  "primary" | "info" | "success" | "warning" | "neutral" | "ai" | "danger"
> = {
  behavioral: "primary",
  technical: "info",
  hr: "success",
  culture: "ai",
  leadership: "warning",
  problem_solving: "danger",
  career: "neutral",
  salary: "success",
};

function formatDuration(minutes: number): string {
  if (minutes === 0) return "0m";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

interface PracticeSessionCardProps extends HTMLAttributes<HTMLDivElement> {
  session: PracticeSession;
  onStart?: (id: string) => void;
  onResume?: (id: string) => void;
}

const PracticeSessionCard = forwardRef<HTMLDivElement, PracticeSessionCardProps>(
  ({ className, session, onStart, onResume, ...props }, ref) => {
    const progress =
      session.totalQuestions > 0
        ? Math.round((session.questionsAnswered / session.totalQuestions) * 100)
        : 0;

    return (
      <Card
        ref={ref}
        variant="interactive"
        padding="sm"
        className={cn("group", className)}
        role="article"
        aria-label={`Practice session: ${session.title}`}
        {...props}
      >
        <div className="flex items-start justify-between gap-2">
          <Badge variant={typeBadgeVariant[session.type]} size="sm">
            {session.type}
          </Badge>
          <Badge
            variant={
              session.status === "completed"
                ? "success"
                : session.status === "in_progress"
                  ? "info"
                  : "neutral"
            }
            size="sm"
          >
            {session.status === "completed"
              ? "Completed"
              : session.status === "in_progress"
                ? "In Progress"
                : session.status === "paused"
                  ? "Paused"
                  : "Not Started"}
          </Badge>
        </div>

        <h4 className="mt-2 text-body font-medium text-primary line-clamp-1">
          {session.title}
        </h4>

        <div className="mt-2 flex flex-wrap items-center gap-3 text-caption text-tertiary">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {formatDuration(session.duration)}
          </span>
          <span>
            {session.questionsAnswered}/{session.totalQuestions} questions
          </span>
          {session.score !== undefined && (
            <span className="inline-flex items-center gap-1">
              <BarChart3 className="h-3 w-3" aria-hidden="true" />
              {session.score}%
            </span>
          )}
        </div>

        <div className="mt-2">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-normal",
                session.status === "completed" ? "bg-success" : "bg-primary",
              )}
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        <div className="mt-3">
          {session.status === "not_started" && (
            <Button
              variant="primary"
              size="xs"
              leftIcon={<Play className="h-3 w-3" />}
              onClick={() => onStart?.(session.id)}
            >
              Start Session
            </Button>
          )}
          {session.status === "paused" && (
            <Button
              variant="secondary"
              size="xs"
              leftIcon={<Play className="h-3 w-3" />}
              onClick={() => onResume?.(session.id)}
            >
              Resume
            </Button>
          )}
          {session.status === "completed" && (
            <div className="flex items-center gap-1 text-caption text-success">
              <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
              Completed
            </div>
          )}
          {session.status === "in_progress" && (
            <div className="flex items-center gap-1 text-caption text-info">
              <Pause className="h-3.5 w-3.5" aria-hidden="true" />
              In Progress
            </div>
          )}
        </div>
      </Card>
    );
  },
);
PracticeSessionCard.displayName = "PracticeSessionCard";

export { PracticeSessionCard };
export type { PracticeSessionCardProps };
