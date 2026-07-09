"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Button } from "@/components/foundation/button";
import { cn } from "@/lib/utils";

interface NotificationErrorStateProps extends HTMLAttributes<HTMLDivElement> {
  message?: string;
  onRetry?: () => void;
}

const NotificationErrorState = forwardRef<HTMLDivElement, NotificationErrorStateProps>(
  ({ className, message = "Failed to load notifications.", onRetry, ...props }, ref) => {
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
          <h3 className="text-heading-4 text-primary">Something went wrong</h3>
          <p className="text-body text-secondary max-w-md">{message}</p>
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
NotificationErrorState.displayName = "NotificationErrorState";

export { NotificationErrorState };
export type { NotificationErrorStateProps };
