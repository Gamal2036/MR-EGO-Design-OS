"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import type { HTMLAttributes } from "react";

import { Button } from "@/components/foundation/button";

interface ApplicationErrorStateProps extends HTMLAttributes<HTMLDivElement> {
  message?: string;
  onRetry?: () => void;
}

export function ApplicationErrorState({
  message = "Failed to load applications. Please try again.",
  onRetry,
  className,
  ...props
}: ApplicationErrorStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 py-16 ${className || ""}`}
      role="alert"
      {...props}
    >
      <div className="rounded-full bg-danger/10 p-4">
        <AlertCircle className="h-8 w-8 text-danger" aria-hidden="true" />
      </div>
      <div className="text-center space-y-1">
        <h3 className="text-heading-4 text-primary">Something went wrong</h3>
        <p className="text-body text-secondary max-w-md">{message}</p>
      </div>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
        >
          <RefreshCw className="h-4 w-4 mr-1.5" aria-hidden="true" />
          Try Again
        </Button>
      )}
    </div>
  );
}
