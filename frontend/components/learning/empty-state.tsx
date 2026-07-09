"use client";

import { BookOpen } from "lucide-react";

import { Button } from "@/components/foundation";

interface LearningEmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function LearningEmptyState({
  title = "No content yet",
  description = "Start exploring courses and building your learning path.",
  actionLabel,
  onAction,
}: LearningEmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 text-center"
      role="status"
      aria-label={title}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-2">
        <BookOpen className="h-8 w-8 text-tertiary" aria-hidden="true" />
      </div>
      <h3 className="text-heading-4 text-primary font-semibold mb-1">{title}</h3>
      <p className="text-body-small text-tertiary max-w-sm mb-4">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
