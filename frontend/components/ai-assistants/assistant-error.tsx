"use client";

import { ErrorState } from "@/components/feedback/error-state";

interface AssistantErrorProps {
  message?: string;
  onRetry?: () => void;
}

export function AssistantError({
  message = "Failed to load AI assistants. Please try again.",
  onRetry,
}: AssistantErrorProps) {
  return (
    <ErrorState
      title="Error loading assistants"
      message={message}
      onRetry={onRetry}
    />
  );
}
