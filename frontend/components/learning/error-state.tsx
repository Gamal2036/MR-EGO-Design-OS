"use client";

import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/foundation";

interface LearningErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function LearningErrorState({
  message = "Failed to load learning content. Please try again.",
  onRetry,
}: LearningErrorStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 text-center"
      role="alert"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-danger/10">
        <AlertTriangle className="h-8 w-8 text-danger" aria-hidden="true" />
      </div>
      <h3 className="text-heading-4 text-primary font-semibold mb-1">Something went wrong</h3>
      <p className="text-body-small text-tertiary max-w-sm mb-4">{message}</p>
      {onRetry && (
        <Button variant="primary" size="sm" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}
