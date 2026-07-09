"use client";

import {
  Star,
  StarOff,
  Video,
  Phone,
  Building2,
  ExternalLink,
  Plus,
  Trash2,
  Archive,
} from "lucide-react";
import { forwardRef, type HTMLAttributes, useState } from "react";

import { Badge, Button, IconButton } from "@/components/foundation";
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

const formatIcon: Record<string, typeof Video> = {
  video: Video,
  phone: Phone,
  onsite: Building2,
  remote: Video,
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
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

interface InterviewDetailsProps extends HTMLAttributes<HTMLDivElement> {
  interview: Interview;
  onClose?: () => void;
  onToggleFavorite?: (id: string) => void;
  onToggleChecklist?: (interviewId: string, itemId: string) => void;
  onDelete?: (id: string) => void;
  onArchive?: (id: string) => void;
  onAddNote?: (interviewId: string) => void;
}

const InterviewDetails = forwardRef<HTMLDivElement, InterviewDetailsProps>(
  (
    {
      className,
      interview,
      onClose,
      onToggleFavorite,
      onToggleChecklist,
      onDelete,
      onArchive,
      onAddNote,
      ...props
    },
    ref,
  ) => {
    const [activeTab, setActiveTab] = useState<"overview" | "checklist" | "notes" | "resources">(
      "overview",
    );
    const FormatIcon = formatIcon[interview.format] || Video;
    const doneCount = interview.checklist.filter((cl) => cl.done).length;

    return (
      <div
        ref={ref}
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4",
          className,
        )}
        role="dialog"
        aria-modal="true"
        aria-label={`Interview details: ${interview.title}`}
        {...props}
      >
        <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-border bg-background shadow-elevated">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div className="flex items-center gap-3">
              <Badge variant={typeBadgeVariant[interview.type]} size="sm">
                {typeLabel[interview.type]}
              </Badge>
              <h2 className="text-heading-4 text-primary font-semibold">
                {interview.title}
              </h2>
            </div>
            <div className="flex items-center gap-1">
              <IconButton
                icon={interview.isFavorite ? StarOff : Star}
                label={interview.isFavorite ? "Unfavorite" : "Favorite"}
                variant="ghost"
                size="sm"
                className={cn(interview.isFavorite && "text-warning")}
                onClick={() => onToggleFavorite?.(interview.id)}
              />
              <IconButton
                icon={Archive}
                label="Archive"
                variant="ghost"
                size="sm"
                onClick={() => onArchive?.(interview.id)}
              />
              <IconButton
                icon={Trash2}
                label="Delete"
                variant="ghost"
                size="sm"
                className="text-danger"
                onClick={() => onDelete?.(interview.id)}
              />
              <Button variant="ghost" size="xs" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>

          <div className="flex gap-1 border-b border-border px-6">
            {(["overview", "checklist", "notes", "resources"] as const).map((tab) => (
              <button
                key={tab}
                className={cn(
                  "px-3 py-2 text-caption font-medium capitalize transition-colors",
                  activeTab === tab
                    ? "text-primary border-b-2 border-primary"
                    : "text-tertiary hover:text-secondary",
                )}
                onClick={() => setActiveTab(tab)}
                aria-selected={activeTab === tab}
                role="tab"
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {activeTab === "overview" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-caption text-tertiary mb-1">Company</p>
                    <p className="text-body-small text-primary font-medium">{interview.company.name}</p>
                    <p className="text-caption text-tertiary">{interview.company.industry}</p>
                  </div>
                  <div>
                    <p className="text-caption text-tertiary mb-1">Role</p>
                    <p className="text-body-small text-primary font-medium">{interview.role}</p>
                  </div>
                  <div>
                    <p className="text-caption text-tertiary mb-1">Date & Time</p>
                    <p className="text-body-small text-primary font-medium">
                      {formatDate(interview.date)}
                    </p>
                    {interview.time && (
                      <p className="text-caption text-tertiary">
                        {formatTime(interview.time)}
                        {interview.duration && ` (${interview.duration} min)`}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-caption text-tertiary mb-1">Location</p>
                    <p className="text-body-small text-primary font-medium flex items-center gap-1.5">
                      <FormatIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      {interview.location}
                    </p>
                  </div>
                  {interview.interviewer && (
                    <div className="col-span-2">
                      <p className="text-caption text-tertiary mb-1">Interviewer</p>
                      <p className="text-body-small text-primary font-medium">{interview.interviewer}</p>
                    </div>
                  )}
                  {interview.salary && (
                    <div className="col-span-2">
                      <p className="text-caption text-tertiary mb-1">Salary Range</p>
                      <p className="text-body-small text-success font-medium">{interview.salary}</p>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-caption text-tertiary mb-1">Preparation Progress</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 overflow-hidden rounded-full bg-surface-2">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-normal"
                        style={{ width: `${interview.preparationProgress}%` }}
                        role="progressbar"
                        aria-valuenow={interview.preparationProgress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <span className="text-caption font-medium text-secondary">
                      {interview.preparationProgress}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "checklist" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-caption text-tertiary">
                    {doneCount}/{interview.checklist.length} completed
                  </p>
                  <Button variant="ghost" size="xs" leftIcon={<Plus className="h-3 w-3" />}>
                    Add Item
                  </Button>
                </div>
                {interview.checklist.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 rounded-lg border border-border bg-surface-1 p-3"
                  >
                    <input
                      type="checkbox"
                      checked={item.done}
                      onChange={() => onToggleChecklist?.(interview.id, item.id)}
                      className="h-4 w-4 rounded border-border"
                      aria-label={item.title}
                    />
                    <span
                      className={cn(
                        "text-body-small",
                        item.done ? "text-tertiary line-through" : "text-primary",
                      )}
                    >
                      {item.title}
                    </span>
                    {item.category && (
                      <Badge variant="neutral" size="xs" className="ml-auto">
                        {item.category}
                      </Badge>
                    )}
                  </div>
                ))}
                {interview.checklist.length === 0 && (
                  <p className="text-body-small text-tertiary text-center py-8">
                    No checklist items yet. Add one to get started.
                  </p>
                )}
              </div>
            )}

            {activeTab === "notes" && (
              <div className="space-y-3">
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="xs"
                    leftIcon={<Plus className="h-3 w-3" />}
                    onClick={() => onAddNote?.(interview.id)}
                  >
                    Add Note
                  </Button>
                </div>
                {interview.notes.map((note) => (
                  <div
                    key={note.id}
                    className="rounded-lg border border-border bg-surface-1 p-3"
                  >
                    <p className="text-body-small text-primary">{note.content}</p>
                    <p className="text-caption text-tertiary mt-2">
                      {new Date(note.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                ))}
                {interview.notes.length === 0 && (
                  <p className="text-body-small text-tertiary text-center py-8">
                    No notes yet. Add one to track your thoughts.
                  </p>
                )}
              </div>
            )}

            {activeTab === "resources" && (
              <div className="space-y-2">
                {interview.resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="flex items-center justify-between rounded-lg border border-border bg-surface-1 p-3"
                  >
                    <div>
                      <p className="text-body-small text-primary font-medium">{resource.title}</p>
                      <Badge variant="neutral" size="xs" className="mt-1">
                        {resource.type}
                      </Badge>
                    </div>
                    {resource.url && (
                      <IconButton
                        icon={ExternalLink}
                        label="Open link"
                        variant="ghost"
                        size="sm"
                      />
                    )}
                  </div>
                ))}
                {interview.resources.length === 0 && (
                  <p className="text-body-small text-tertiary text-center py-8">
                    No resources linked yet.
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="border-t border-border px-6 py-3">
            <div className="flex items-center justify-between">
              <span className="text-caption text-tertiary">
                Created {new Date(interview.createdAt).toLocaleDateString()}
              </span>
              <Button variant="primary" size="sm" onClick={onClose}>
                Done
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
InterviewDetails.displayName = "InterviewDetails";

export { InterviewDetails };
export type { InterviewDetailsProps };
