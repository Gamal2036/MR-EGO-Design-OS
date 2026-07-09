"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

import { Button } from "@/components/foundation/button";

interface SettingsErrorStateProps {
  onRetry?: () => void;
}

export function SettingsErrorState({ onRetry }: SettingsErrorStateProps) {
  return (
    <div
      className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4"
      role="alert"
    >
      <div className="rounded-full bg-danger/10 p-4">
        <AlertCircle className="h-8 w-8 text-danger" aria-hidden="true" />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-heading-4 text-primary">Failed to load settings</h3>
        <p className="text-body text-secondary max-w-md">
          An error occurred while loading your settings. Please try again.
        </p>
      </div>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          leftIcon={<RefreshCw className="h-4 w-4" />}
        >
          Try Again
        </Button>
      )}
    </div>
  );
}
