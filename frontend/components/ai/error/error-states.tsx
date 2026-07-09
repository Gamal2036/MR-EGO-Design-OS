"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Button } from "@/components/foundation/button";
import { cn } from "@/lib/utils";

interface AIErrorStateProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const AIErrorState = forwardRef<HTMLDivElement, AIErrorStateProps>(
  (
    {
      className,
      title = "Something went wrong",
      message = "An unexpected error occurred.",
      onRetry,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center gap-4 py-12 px-4",
          className,
        )}
        role="alert"
        {...props}
      >
        <div className="rounded-full bg-danger/10 p-4">
          <AlertCircle className="h-8 w-8 text-danger" aria-hidden="true" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="text-heading-4 text-primary">{title}</h3>
          <p className="text-body text-secondary max-w-sm">{message}</p>
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
  },
);
AIErrorState.displayName = "AIErrorState";

export function OfflineError({ onRetry }: { onRetry?: () => void }) {
  return (
    <AIErrorState
      title="You are offline"
      message="Check your internet connection and try again."
      onRetry={onRetry}
      className="animate-fade-in"
    />
  );
}

export function ProviderError({ onRetry }: { onRetry?: () => void }) {
  return (
    <AIErrorState
      title="AI provider unavailable"
      message="The AI service is currently unavailable. Please check your provider configuration."
      onRetry={onRetry}
    />
  );
}

export function NetworkError({ onRetry }: { onRetry?: () => void }) {
  return (
    <AIErrorState
      title="Network error"
      message="Failed to communicate with the server. Please try again."
      onRetry={onRetry}
    />
  );
}

export { AIErrorState };
