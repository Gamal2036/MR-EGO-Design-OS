"use client";

import {
  Calendar,
  Clock,
  Star,
  StarOff,
  Video,
  Phone,
  Building2,
} from "lucide-react";
import { forwardRef, type HTMLAttributes } from "react";

import { Badge, Card, IconButton } from "@/components/foundation";
import { cn } from "@/lib/utils";
import type { Interview } from "@/types/interview";

const typeLabel: Record<string, string> = {
  behavioral: "Behavioral",
  technical: "Technical",
  hr: "HR",
  culture: "Culture",
  leadership: "Leadership",
  problem_solving: "Problem Solving",
  career: "Career",
  salary: "Salary",
};

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

const statusBadgeVariant: Record<
  string,
  "primary" | "info" | "success" | "warning" | "danger" | "neutral"
> = {
  upcoming: "info",
  completed: "success",
  cancelled: "danger",
  archived: "neutral",
};

const formatIcon: Record<string, typeof Video> = {
  video: Video,
  phone: Phone,
  onsite: Building2,
  remote: Video,
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(time?: string): string {
  if (!time) return "";
  const parts = time.split(":");
  const h = parseInt(parts[0] ?? "0", 10);
  const m = parseInt(parts[1] ?? "0", 10);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

function daysUntil(dateStr: string): number {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = d.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

interface InterviewCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  interview: Interview;
  onSelect?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
}

const InterviewCard = forwardRef<HTMLDivElement, InterviewCardProps>(
  ({ className, interview, onSelect, onToggleFavorite, ...props }, ref) => {
    const FormatIcon = formatIcon[interview.format] || Video;
    const days = daysUntil(interview.date);

    return (
      <Card
        ref={ref}
        variant="interactive"
        padding="sm"
        className={cn("group", className)}
        role="article"
        aria-label={`${interview.title} at ${interview.company.name}`}
        tabIndex={0}
        onClick={() => onSelect?.(interview.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect?.(interview.id);
          }
        }}
        {...props}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge variant={typeBadgeVariant[interview.type]} size="sm">
              {typeLabel[interview.type]}
            </Badge>
            <Badge variant={statusBadgeVariant[interview.status]} size="sm">
              {interview.status}
            </Badge>
          </div>
          <IconButton
            icon={interview.isFavorite ? StarOff : Star}
            label={interview.isFavorite ? "Unfavorite" : "Favorite"}
            variant="ghost"
            size="xs"
            className={cn(
              interview.isFavorite && "text-warning",
            )}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.(interview.id);
            }}
          />
        </div>

        <h4 className="mt-2 text-body font-medium text-primary line-clamp-2 group-hover:text-accent-foreground">
          {interview.title}
        </h4>

        <p className="mt-1 text-caption text-secondary font-medium">
          {interview.company.name} &mdash; {interview.role}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-caption text-tertiary">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3 w-3" aria-hidden="true" />
            {formatDate(interview.date)}
            {interview.status === "upcoming" && days >= 0 && (
              <span className={cn(
                "ml-1 font-medium",
                days <= 1 ? "text-danger" : days <= 3 ? "text-warning" : "text-tertiary",
              )}>
                {days === 0 ? "Today" : days === 1 ? "Tomorrow" : `in ${days}d`}
              </span>
            )}
          </span>
          {interview.time && (
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {formatTime(interview.time)}
              {interview.duration && <span>({interview.duration}m)</span>}
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <FormatIcon className="h-3 w-3" aria-hidden="true" />
            {interview.location}
          </span>
        </div>

        <div className="mt-3">
          <div className="flex items-center justify-between text-caption text-tertiary">
            <span>Preparation</span>
            <span className="font-medium text-secondary">{interview.preparationProgress}%</span>
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-primary transition-all duration-normal"
              style={{ width: `${interview.preparationProgress}%` }}
              role="progressbar"
              aria-valuenow={interview.preparationProgress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Preparation progress: ${interview.preparationProgress}%`}
            />
          </div>
        </div>
      </Card>
    );
  },
);
InterviewCard.displayName = "InterviewCard";

export { InterviewCard };
export type { InterviewCardProps };
