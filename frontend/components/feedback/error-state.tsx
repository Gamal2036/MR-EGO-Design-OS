"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Button } from "../foundation/button";

import { cn } from "@/lib/utils";

interface ErrorStateProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

const ErrorState = forwardRef<HTMLDivElement, ErrorStateProps>(
  (
    {
      className,
      title = "Something went wrong",
      message = "An error occurred while loading this content.",
      onRetry,
      retryLabel = "Try Again",
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center gap-4 py-12 px-4",
          className
        )}
        role="alert"
        {...props}
      >
        <div className="rounded-full bg-danger/10 p-4">
          <AlertCircle className="h-8 w-8 text-danger" aria-hidden="true" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="text-heading-4 text-primary">{title}</h3>
          <p className="text-body text-secondary max-w-md">{message}</p>
        </div>
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            leftIcon={<RefreshCw className="h-4 w-4" />}
          >
            {retryLabel}
          </Button>
        )}
      </div>
    );
  }
);
ErrorState.displayName = "ErrorState";

export { ErrorState };
export type { ErrorStateProps };
