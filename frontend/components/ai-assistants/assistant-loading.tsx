"use client";

import { LoadingState } from "@/components/feedback/loading-state";

export function AssistantLoading() {
  return (
    <LoadingState
      message="Loading AI assistants..."
    />
  );
}
