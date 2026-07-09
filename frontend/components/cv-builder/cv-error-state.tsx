"use client";

import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/foundation/button";

interface CVErrorStateProps {
  onRetry?: () => void;
}

export function CVErrorState({ onRetry }: CVErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center" role="alert">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-danger/10 mb-4">
        <AlertTriangle className="h-7 w-7 text-danger" aria-hidden="true" />
      </div>
      <h2 className="text-heading-4 text-primary mb-2">Something went wrong</h2>
      <p className="text-body text-secondary max-w-sm mb-6">
        The CV Builder encountered an error. Please try again.
      </p>
      {onRetry && (
        <Button variant="primary" size="sm" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}
